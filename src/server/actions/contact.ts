'use server'

/**
 * Contact enquiry submission — the one write path open to the public.
 *
 * Validates with zod, stores a salted SHA-256 hash of the caller IP (never the
 * IP itself), inserts a `contact_requests` row and records a `CONTACT_SUBMIT`
 * analytics event. Returns a typed `{ ok, fieldErrors }` state for
 * `useActionState` — it never throws at the client.
 */

import { createHash } from 'node:crypto'

import { headers } from 'next/headers'
import { z } from 'zod'

import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  labelFor,
  optionValues,
} from '@/app/(site)/contact/_options'
import { serverEnv } from '@/lib/env'
import { db } from '@/server/db'
import { analyticsEvents, contactRequests } from '@/server/db/schema'

export type ContactField = 'name' | 'email' | 'phone' | 'projectType' | 'budget' | 'message'

export type ContactFieldErrors = Partial<Record<ContactField, string>>

export type ContactFormState = {
  /** `true` only after a row has been written. */
  ok: boolean
  fieldErrors: ContactFieldErrors
  /** Shown above the form: validation summary or an unexpected failure. */
  formError?: string
  /** Echoed back so the client can keep what was typed after a failed attempt. */
  values?: Partial<Record<ContactField, string>>
}

const CONTACT_FIELDS: readonly ContactField[] = [
  'name',
  'email',
  'phone',
  'projectType',
  'budget',
  'message',
]

function isContactField(value: string): value is ContactField {
  return (CONTACT_FIELDS as readonly string[]).includes(value)
}

/* -------------------------------- validation ------------------------------- */

const PHONE_RE = /^[0-9+()][0-9+()\s.-]{7,23}$/

const PROJECT_TYPE_VALUES = optionValues(PROJECT_TYPES)
const BUDGET_VALUES = optionValues(BUDGET_RANGES)

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Vui lòng cho chúng tôi biết tên của bạn.')
    .max(120, 'Tên quá dài.'),
  email: z
    .string()
    .trim()
    .min(1, 'Vui lòng để lại email để chúng tôi hồi âm.')
    .max(200, 'Email quá dài.')
    .email('Email chưa đúng định dạng.'),
  phone: z
    .string()
    .trim()
    .max(24, 'Số điện thoại quá dài.')
    .refine((value) => value.length === 0 || PHONE_RE.test(value), 'Số điện thoại chưa hợp lệ.'),
  projectType: z
    .string()
    .trim()
    .refine((value) => PROJECT_TYPE_VALUES.includes(value), 'Vui lòng chọn loại công trình.'),
  budget: z
    .string()
    .trim()
    .refine(
      (value) => value.length === 0 || BUDGET_VALUES.includes(value),
      'Vui lòng chọn một khoảng ngân sách.',
    ),
  message: z
    .string()
    .trim()
    .min(20, 'Kể thêm một chút về không gian của bạn — ít nhất 20 ký tự.')
    .max(4000, 'Lời nhắn quá dài, vui lòng rút gọn dưới 4000 ký tự.'),
})

/* --------------------------------- helpers --------------------------------- */

function readField(formData: FormData, name: string): string {
  const value = formData.get(name)
  return typeof value === 'string' ? value : ''
}

/**
 * Salted, truncated SHA-256 of the caller IP. Enough to spot a flood of
 * duplicates, useless for identifying a person.
 */
async function hashClientIp(): Promise<string | null> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')
  const candidate = forwarded?.split(',')[0] ?? headerList.get('x-real-ip') ?? ''
  const ip = candidate.trim()
  if (ip.length === 0) return null

  const salt = serverEnv().AUTH_SECRET
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
}

async function referrerPath(): Promise<string | null> {
  const headerList = await headers()
  const referer = headerList.get('referer')
  if (!referer) return null
  try {
    return new URL(referer).pathname
  } catch {
    return null
  }
}

/* ---------------------------------- action --------------------------------- */

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: readField(formData, 'name'),
    email: readField(formData, 'email'),
    phone: readField(formData, 'phone'),
    projectType: readField(formData, 'projectType'),
    budget: readField(formData, 'budget'),
    message: readField(formData, 'message'),
  }

  // Honeypot: bots fill every input they find. Answer as if nothing happened.
  if (readField(formData, 'company').trim().length > 0) {
    return { ok: true, fieldErrors: {} }
  }

  const parsed = contactSchema.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key !== 'string' || !isContactField(key)) continue
      if (fieldErrors[key] === undefined) fieldErrors[key] = issue.message
    }
    return {
      ok: false,
      fieldErrors,
      formError: 'Vui lòng kiểm tra lại những mục được đánh dấu.',
      values: raw,
    }
  }

  const data = parsed.data

  try {
    const ipHash = await hashClientIp()
    const source = (await referrerPath()) ?? '/contact'

    const inserted = await db
      .insert(contactRequests)
      .values({
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone.length > 0 ? data.phone : null,
        projectType: labelFor(PROJECT_TYPES, data.projectType),
        budget: data.budget.length > 0 ? labelFor(BUDGET_RANGES, data.budget) : null,
        message: data.message,
        source,
        ipHash,
      })
      .returning({ id: contactRequests.id })

    const requestId = inserted[0]?.id ?? null

    // Analytics is observability, never a reason to fail an enquiry.
    try {
      await db.insert(analyticsEvents).values({
        type: 'CONTACT_SUBMIT',
        entityType: 'contact_request',
        entityId: requestId,
        sessionHash: ipHash,
        meta: {
          projectType: data.projectType,
          budget: data.budget.length > 0 ? data.budget : null,
          source,
        },
      })
    } catch (error) {
      console.error('[actions/contact] analytics write failed', error)
    }

    return { ok: true, fieldErrors: {} }
  } catch (error) {
    console.error('[actions/contact] submission failed', error)
    return {
      ok: false,
      fieldErrors: {},
      formError:
        'Không gửi được lời nhắn. Bạn thử lại sau ít phút, hoặc viết thẳng cho chúng tôi qua email.',
      values: raw,
    }
  }
}
