'use server'

/**
 * Contact inbox — the admin side of `contact_requests`.
 *
 * Only the workflow status moves here (new → contacted → archived, and back);
 * the message body itself is never edited, so the record stays a faithful copy
 * of what the visitor sent.
 */

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { requireAdmin } from '@/server/auth'
import { db } from '@/server/db'
import { auditLogs, contactRequests } from '@/server/db/schema'
import { CONTACT_STATUS_FLOW, type ActionResult, type ContactStatus } from '@/components/admin/site/contracts'

const INBOX_PATH = '/admin/settings'

const statusSchema = z.enum(['new', 'contacted', 'archived'])

const changeSchema = z.object({
  id: z.string().uuid('Yêu cầu không hợp lệ.'),
  status: statusSchema,
})

const idSchema = z.object({ id: z.string().uuid('Yêu cầu không hợp lệ.') })

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const path = issue.path.map((part) => String(part)).join('.')
    if (!(path in out)) out[path] = issue.message
  }
  return out
}

async function audit(
  userId: string,
  action: string,
  entityId: string,
  meta: Record<string, unknown>,
): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId,
      action,
      entityType: 'contact_request',
      entityId,
      meta,
    })
  } catch (error) {
    console.error('[actions/contacts] audit write failed', error)
  }
}

/** Move a request along the inbox workflow. Illegal jumps are refused. */
export async function setContactStatus(input: unknown): Promise<ActionResult> {
  const session = await requireAdmin()

  const parsed = changeSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: 'Yêu cầu không hợp lệ.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }

  const { id, status } = parsed.data

  try {
    const rows = await db
      .select({ id: contactRequests.id, status: contactRequests.status, email: contactRequests.email })
      .from(contactRequests)
      .where(eq(contactRequests.id, id))
      .limit(1)

    const row = rows[0]
    if (!row) return { ok: false, error: 'Liên hệ không tồn tại.' }

    const from: ContactStatus = row.status
    if (from === status) return { ok: true }

    const allowed = CONTACT_STATUS_FLOW[from]
    if (!allowed.includes(status)) {
      return { ok: false, error: 'Không thể chuyển sang trạng thái này.' }
    }

    await db.update(contactRequests).set({ status }).where(eq(contactRequests.id, id))
    await audit(session.userId, 'contact.status', id, { from, to: status, email: row.email })

    revalidatePath(INBOX_PATH)
    return { ok: true }
  } catch (error) {
    console.error('[actions/contacts] setContactStatus failed', error)
    return { ok: false, error: 'Không cập nhật được trạng thái. Vui lòng thử lại.' }
  }
}

/** Permanent removal — used for spam. Archiving is the normal end state. */
export async function deleteContactRequest(input: unknown): Promise<ActionResult> {
  const session = await requireAdmin()

  const parsed = idSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: 'Yêu cầu không hợp lệ.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }

  try {
    const rows = await db
      .select({ id: contactRequests.id, email: contactRequests.email, name: contactRequests.name })
      .from(contactRequests)
      .where(eq(contactRequests.id, parsed.data.id))
      .limit(1)

    const row = rows[0]
    if (!row) return { ok: false, error: 'Liên hệ không tồn tại.' }

    await db.delete(contactRequests).where(eq(contactRequests.id, row.id))
    await audit(session.userId, 'contact.delete', row.id, { email: row.email, name: row.name })

    revalidatePath(INBOX_PATH)
    return { ok: true }
  } catch (error) {
    console.error('[actions/contacts] deleteContactRequest failed', error)
    return { ok: false, error: 'Không xoá được liên hệ. Vui lòng thử lại.' }
  }
}
