'use server'

/**
 * Homepage composition — which of the eight sections run, in what order, with
 * what copy. The payload is the full stack; the action reconciles it against
 * `homepage_sections` (upsert by `key`) so a partial save can never orphan a
 * section.
 */

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import { auditLogs, homepageSections } from '@/server/db/schema'
import {
  STOPS_MAX,
  STOP_CAPTION_MAX,
  STOP_LABEL_MAX,
  type ActionResult,
} from '@/components/admin/site/contracts'

/* -------------------------------- validation ------------------------------- */

const sectionKey = z.enum([
  'HERO',
  'FEATURED_PROJECTS',
  'STUDIO',
  'SERVICES',
  'IMMERSIVE_PROJECT',
  'PHILOSOPHY',
  'JOURNAL',
  'CTA',
])

/**
 * One immersive stop. This is the only part of `content` with a shape the
 * server insists on, because the homepage renders it directly: a stop with no
 * picture would pin the scroll on an empty frame.
 */
const stopSchema = z.object({
  id: z.string().min(1).max(64),
  label: z.string().max(STOP_LABEL_MAX, `Nhãn điểm dừng tối đa ${STOP_LABEL_MAX} ký tự.`),
  caption: z.string().max(STOP_CAPTION_MAX, `Chú thích tối đa ${STOP_CAPTION_MAX} ký tự.`).optional(),
  mediaId: z.string().min(1, 'Điểm dừng chưa chọn ảnh.').max(128),
})

/** `content` is section-shaped free-form JSON; only its envelope is validated. */
const contentSchema = z.looseObject({
  stops: z.array(stopSchema).max(STOPS_MAX, `Tối đa ${STOPS_MAX} điểm dừng.`).optional(),
  heroMediaId: z.string().trim().max(64).optional(),
})

const sectionSchema = z.object({
  key: sectionKey,
  enabled: z.boolean(),
  order: z.number().int().min(0).max(64),
  content: contentSchema,
})

const payloadSchema = z.object({
  sections: z.array(sectionSchema).min(1, 'Không có mục nào để lưu.').max(32),
})

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const path = issue.path.map((part) => String(part)).join('.')
    if (!(path in out)) out[path] = issue.message
  }
  return out
}

/**
 * A CTA href written by the editor must be internal or absolute-https — the same
 * rule the navigation editor enforces, applied to whichever alias carries it.
 */
const HREF_KEYS: readonly string[] = ['ctaHref', 'href']

function badHrefIn(content: Record<string, unknown>): string | null {
  const candidates: string[] = []
  for (const key of HREF_KEYS) {
    const value = content[key]
    if (typeof value === 'string' && value.trim().length > 0) candidates.push(value.trim())
  }
  const cta = content['cta']
  if (cta && typeof cta === 'object' && !Array.isArray(cta)) {
    const href = (cta as Record<string, unknown>)['href']
    if (typeof href === 'string' && href.trim().length > 0) candidates.push(href.trim())
  }
  for (const href of candidates) {
    if (href.startsWith('/')) continue
    if (href.startsWith('https://') && href.length > 'https://'.length) continue
    return href
  }
  return null
}

/* --------------------------------- action ---------------------------------- */

export async function saveHomepage(input: unknown): Promise<ActionResult> {
  const session = await requireUser()

  const parsed = payloadSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Dữ liệu chưa hợp lệ.',
      fieldErrors: fieldErrorsFrom(parsed.error),
    }
  }

  const { sections } = parsed.data

  const seen = new Set<string>()
  const fieldErrors: Record<string, string> = {}
  for (const [index, section] of sections.entries()) {
    if (seen.has(section.key)) {
      fieldErrors[`sections.${index}.key`] = 'Mục bị lặp lại.'
    }
    seen.add(section.key)

    const bad = badHrefIn(section.content)
    if (bad !== null) {
      fieldErrors[`sections.${index}.ctaHref`] =
        "Đường dẫn phải bắt đầu bằng '/' hoặc 'https://'."
    }
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: 'Một vài mục chưa hợp lệ.', fieldErrors }
  }

  try {
    // Re-index from the submitted order so gaps introduced by drag never persist.
    for (const [index, section] of sections.entries()) {
      await db
        .insert(homepageSections)
        .values({
          key: section.key,
          enabled: section.enabled,
          order: index,
          content: section.content,
          settings: {},
        })
        .onConflictDoUpdate({
          target: homepageSections.key,
          set: { enabled: section.enabled, order: index, content: section.content },
        })
    }

    revalidatePath('/')

    try {
      await db.insert(auditLogs).values({
        userId: session.userId,
        action: 'homepage.save',
        entityType: 'homepage_sections',
        meta: {
          order: sections.map((section) => section.key),
          disabled: sections.filter((section) => !section.enabled).map((section) => section.key),
        },
      })
    } catch (error) {
      console.error('[actions/homepage] audit write failed', error)
    }

    return { ok: true }
  } catch (error) {
    console.error('[actions/homepage] saveHomepage failed', error)
    return { ok: false, error: 'Không lưu được trang chủ. Vui lòng thử lại.' }
  }
}
