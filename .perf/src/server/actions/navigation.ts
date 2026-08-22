'use server'

/**
 * Header and footer menus. The editor always submits both lists in full, so the
 * action reconciles: rows missing from the payload are deleted, known ids are
 * updated in place (keeping their uuid), and `new-…` placeholders are inserted.
 */

import { eq, inArray } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import { auditLogs, navigation } from '@/server/db/schema'
import type { ActionResult } from '@/components/admin/site/contracts'

/* -------------------------------- validation ------------------------------- */

const UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

const hrefSchema = z
  .string()
  .trim()
  .min(1, 'Chưa nhập đường dẫn.')
  .max(300)
  .refine(
    (value) => value.startsWith('/') || (value.startsWith('https://') && value.length > 8),
    "Đường dẫn phải bắt đầu bằng '/' hoặc 'https://'.",
  )

const itemSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().min(1, 'Chưa nhập nhãn.').max(60),
  href: hrefSchema,
  enabled: z.boolean(),
})

const payloadSchema = z.object({
  header: z.array(itemSchema).max(24, 'Tối đa 24 mục.'),
  footer: z.array(itemSchema).max(24, 'Tối đa 24 mục.'),
})

type NavPayloadItem = z.infer<typeof itemSchema>
type NavLocation = 'header' | 'footer'

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const path = issue.path.map((part) => String(part)).join('.')
    if (!(path in out)) out[path] = issue.message
  }
  return out
}

/* ------------------------------- reconciliation ----------------------------- */

async function syncLocation(location: NavLocation, items: readonly NavPayloadItem[]): Promise<void> {
  const existing = await db
    .select({ id: navigation.id })
    .from(navigation)
    .where(eq(navigation.location, location))

  const keptIds = new Set(items.map((item) => item.id).filter((id) => UUID.test(id)))
  const removed = existing.map((row) => row.id).filter((id) => !keptIds.has(id))

  if (removed.length > 0) {
    await db.delete(navigation).where(inArray(navigation.id, removed))
  }

  const existingIds = new Set(existing.map((row) => row.id))

  for (const [index, item] of items.entries()) {
    const values = {
      location,
      label: item.label,
      href: item.href,
      order: index,
      enabled: item.enabled,
      parentId: null,
    }

    if (UUID.test(item.id) && existingIds.has(item.id)) {
      await db.update(navigation).set(values).where(eq(navigation.id, item.id))
    } else {
      await db.insert(navigation).values(values)
    }
  }
}

/* --------------------------------- action ---------------------------------- */

export async function saveNavigation(input: unknown): Promise<ActionResult> {
  const session = await requireUser()

  const parsed = payloadSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Một vài mục chưa hợp lệ.',
      fieldErrors: fieldErrorsFrom(parsed.error),
    }
  }

  const { header, footer } = parsed.data

  try {
    await syncLocation('header', header)
    await syncLocation('footer', footer)

    // The menus live in the shared chrome, so every route is affected.
    revalidatePath('/', 'layout')

    try {
      await db.insert(auditLogs).values({
        userId: session.userId,
        action: 'navigation.save',
        entityType: 'navigation',
        meta: {
          header: header.map((item) => item.label),
          footer: footer.map((item) => item.label),
        },
      })
    } catch (error) {
      console.error('[actions/navigation] audit write failed', error)
    }

    return { ok: true }
  } catch (error) {
    console.error('[actions/navigation] saveNavigation failed', error)
    return { ok: false, error: 'Không lưu được menu. Vui lòng thử lại.' }
  }
}
