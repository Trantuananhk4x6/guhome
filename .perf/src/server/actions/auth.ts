'use server'

/**
 * Authentication server actions — the only bridge between the login screen and
 * `@/server/auth`. Everything here is thin on purpose: rate limiting, hashing,
 * session issuing and audit logging all live in the auth module.
 *
 * Contract: docs/ARCHITECTURE.md §6.6.
 */

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { ADMIN_HOME_PATH, LOGIN_PATH, signIn, signOut } from '@/server/auth'

export interface SignInState {
  /** Generic on purpose — never disclose which half of the pair was wrong. */
  error?: string
  /** Echoed back so the form keeps the address after a failed attempt. */
  email?: string
}

const signInSchema = z.object({
  email: z.string().trim().min(1, 'Vui lòng nhập email.').max(254),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu.').max(200),
  next: z.string().optional(),
})

/**
 * Only same-origin admin paths may be used as a post-login destination, so a
 * crafted `?next=` cannot bounce the user to another site.
 */
function safeNextPath(value: string | undefined): string {
  if (!value) return ADMIN_HOME_PATH
  if (!value.startsWith('/') || value.startsWith('//')) return ADMIN_HOME_PATH
  if (!value.startsWith('/admin')) return ADMIN_HOME_PATH
  if (value === LOGIN_PATH || value.startsWith(`${LOGIN_PATH}?`)) return ADMIN_HOME_PATH
  return value
}

/** `useActionState` handler for the login form. */
export async function signInAction(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    next: formData.get('next') ?? undefined,
  })

  if (!parsed.success) {
    const email = formData.get('email')
    return {
      error: parsed.error.issues[0]?.message ?? 'Thông tin đăng nhập không hợp lệ.',
      email: typeof email === 'string' ? email : undefined,
    }
  }

  const result = await signIn(parsed.data.email, parsed.data.password)
  if (!result.ok) {
    return { error: result.error ?? 'Email hoặc mật khẩu không đúng.', email: parsed.data.email }
  }

  // `redirect` throws — it must be the last statement and must not be caught.
  redirect(safeNextPath(parsed.data.next))
}

/** Form action for the sign-out button in the admin top bar. */
export async function signOutAction(): Promise<void> {
  await signOut()
  redirect(LOGIN_PATH)
}
