'use server'

/**
 * Settings mutations that have no home among the five shared action files:
 * the site-wide SEO defaults and the signed-in user's own password.
 *
 * Contact-inbox transitions live in `@/server/actions/contacts`.
 */

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { z } from 'zod'

import { hashPassword, requireAdmin, revokeUserSessions, verifyPassword } from '@/server/auth'
// Not re-exported by `@/server/auth` (§6.6 publishes only the login surface).
// Imported directly on purpose — see `changeOwnPassword` below for why the
// re-issue must not go through `signIn()`.
import { createSession, sha256 } from '@/server/auth/session'
import { db } from '@/server/db'
import { auditLogs, revisions, users } from '@/server/db/schema'
import type { ActionResult } from '@/components/admin/site/contracts'
import type { UserRole } from '@/types/content'

import { SITE_SETTINGS_ENTITY, SITE_SETTINGS_ID } from './site-settings'

/* -------------------------------- validation ------------------------------- */

const seoSchema = z.object({
  titleTemplate: z
    .string()
    .trim()
    .min(1, 'Chưa nhập mẫu tiêu đề.')
    .max(120)
    .refine((value) => value.includes('%s'), "Mẫu tiêu đề phải chứa '%s' — chỗ đặt tiêu đề trang."),
  defaultTitle: z.string().trim().min(1, 'Chưa nhập tiêu đề mặc định.').max(120),
  description: z.string().trim().min(1, 'Chưa nhập mô tả mặc định.').max(320),
  ogImageId: z
    .string()
    .trim()
    .nullable()
    .transform((value) => (value === null || value.length === 0 ? null : value)),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Nhập mật khẩu hiện tại.'),
    newPassword: z
      .string()
      .min(10, 'Mật khẩu mới cần ít nhất 10 ký tự.')
      .max(200)
      .refine((value) => /[a-z]/i.test(value), 'Mật khẩu cần ít nhất một chữ cái.')
      .refine((value) => /[0-9]/.test(value), 'Mật khẩu cần ít nhất một chữ số.'),
    confirmPassword: z.string().min(1, 'Nhập lại mật khẩu mới.'),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: 'Hai mật khẩu chưa khớp.',
    path: ['confirmPassword'],
  })
  .refine((value) => value.newPassword !== value.currentPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu hiện tại.',
    path: ['newPassword'],
  })

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
  entityType: string,
  entityId: string | null,
  meta: Record<string, unknown>,
): Promise<void> {
  try {
    await db.insert(auditLogs).values({ userId, action, entityType, entityId, meta })
  } catch (error) {
    console.error('[settings/actions] audit write failed', error)
  }
}

/* --------------------------------- actions --------------------------------- */

/** Persist the SEO defaults document. Appends a new `revisions` row. */
export async function saveSeoDefaults(input: unknown): Promise<ActionResult> {
  const session = await requireAdmin()

  const parsed = seoSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: 'Một vài trường chưa hợp lệ.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }

  const seo = parsed.data

  try {
    await db.insert(revisions).values({
      entityType: SITE_SETTINGS_ENTITY,
      entityId: SITE_SETTINGS_ID,
      note: 'SEO mặc định',
      createdBy: session.userId,
      data: {
        titleTemplate: seo.titleTemplate,
        defaultTitle: seo.defaultTitle,
        description: seo.description,
        ogImageId: seo.ogImageId,
      },
    })

    await audit(session.userId, 'settings.seo.save', SITE_SETTINGS_ENTITY, SITE_SETTINGS_ID, {
      titleTemplate: seo.titleTemplate,
    })

    // Metadata is produced in the root layout, so every route is affected.
    revalidatePath('/', 'layout')
    revalidatePath('/admin/settings')

    return { ok: true }
  } catch (error) {
    console.error('[settings/actions] saveSeoDefaults failed', error)
    return { ok: false, error: 'Không lưu được thiết lập SEO. Vui lòng thử lại.' }
  }
}

/**
 * Change the signed-in user's own password.
 *
 * The current password is verified first, then every session for the account is
 * revoked (so a stolen cookie dies with the old password) and a fresh one is
 * issued for this browser via `createSession()`.
 *
 * Deliberately *not* `signIn()`: that helper runs the failed-login rate limiter
 * first, so an admin who had mistyped their password a few times in the last ten
 * minutes would have the re-issue refused — silently, since the result was
 * discarded — and be logged straight out by their own successful password
 * change. The credential check `signIn()` would repeat has already happened
 * above, and this is not a login attempt, so the limiter does not apply.
 */
export async function changeOwnPassword(input: unknown): Promise<ActionResult> {
  const session = await requireAdmin()

  const parsed = passwordSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: 'Chưa đổi được mật khẩu.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }

  const { currentPassword, newPassword } = parsed.data

  try {
    const rows = await db
      .select({ id: users.id, email: users.email, role: users.role, passwordHash: users.passwordHash })
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1)

    const user = rows[0]
    if (!user) return { ok: false, error: 'Không tìm thấy tài khoản.' }

    const currentOk = await verifyPassword(currentPassword, user.passwordHash)
    if (!currentOk) {
      await audit(session.userId, 'account.password_change_failed', 'user', session.userId, {
        reason: 'bad_current_password',
      })
      return {
        ok: false,
        error: 'Mật khẩu hiện tại không đúng.',
        fieldErrors: { currentPassword: 'Mật khẩu hiện tại không đúng.' },
      }
    }

    const hash = await hashPassword(newPassword)
    await db
      .update(users)
      .set({ passwordHash: hash, updatedAt: new Date() })
      .where(eq(users.id, user.id))

    await revokeUserSessions(user.id)

    // Re-issue this browser's session so the admin is not thrown out mid-edit.
    // A failure here leaves the account with no live session at all, so it is
    // reported rather than swallowed — the new password is already saved.
    try {
      const headerList = await headers()
      const forwarded = headerList.get('x-forwarded-for')?.split(',')[0]?.trim()
      const ip = forwarded && forwarded.length > 0 ? forwarded : (headerList.get('x-real-ip') ?? 'unknown')
      const role: UserRole = user.role
      await createSession(
        { userId: user.id, email: user.email, role },
        { userAgent: headerList.get('user-agent'), ipHash: sha256(ip) },
      )
    } catch (error) {
      console.error('[settings/actions] session re-issue after password change failed', error)
      await audit(session.userId, 'account.password_change', 'user', user.id, {
        email: user.email,
        sessionReissued: false,
      })
      return {
        ok: false,
        error: 'Đã đổi mật khẩu nhưng không cấp lại được phiên. Vui lòng đăng nhập lại bằng mật khẩu mới.',
      }
    }

    await audit(session.userId, 'account.password_change', 'user', user.id, { email: user.email })
    revalidatePath('/admin/settings')

    return { ok: true }
  } catch (error) {
    console.error('[settings/actions] changeOwnPassword failed', error)
    return { ok: false, error: 'Không đổi được mật khẩu. Vui lòng thử lại.' }
  }
}
