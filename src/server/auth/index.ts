/**
 * Authentication entry point. Server-only module — import it from server
 * components, route handlers and server actions, never from a client component.
 *
 * Contract: docs/ARCHITECTURE.md §6.6
 */

import { eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

import { db } from '@/server/db'
import { auditLogs, users } from '@/server/db/schema'
import type { UserRole } from '@/types/content'

import { ADMIN_HOME_PATH, LOGIN_PATH, type SessionPayload } from './constants'
import { verifyPassword, verifyPasswordDecoy } from './password'
import {
  createSession,
  destroySession,
  purgeExpiredSessions,
  readSessionCookie,
  resolveSession,
  sha256,
} from './session'

export type Session = SessionPayload

export { hashPassword, verifyPassword } from './password'
export { revokeUserSessions } from './session'
export { ADMIN_HOME_PATH, LOGIN_PATH, NEXT_PARAM, SESSION_COOKIE } from './constants'

/**
 * Deliberately identical for "no such account", "wrong password" and "account
 * disabled" — the login form must never disclose which one it was.
 */
const GENERIC_ERROR = 'Email hoặc mật khẩu không đúng.'
/** Throttling is about the request rate, not the credentials, so it may differ. */
const THROTTLED_ERROR = 'Quá nhiều lần thử. Vui lòng đợi vài phút rồi thử lại.'

/* ------------------------------- rate limiting ------------------------------ */

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
/** Cheap safety valve so a spray attack cannot grow the map without bound. */
const RATE_LIMIT_MAX_KEYS = 5_000

type AttemptStore = Map<string, number[]>

// Survives dev hot-reloads; per-process only (single-region deployment).
const globalScope = globalThis as typeof globalThis & { __anAtelierLoginAttempts?: AttemptStore }
const loginAttempts: AttemptStore = (globalScope.__anAtelierLoginAttempts ??= new Map())

function recentAttempts(key: string, now: number): number[] {
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const kept = (loginAttempts.get(key) ?? []).filter((at) => at > cutoff)
  if (kept.length > 0) loginAttempts.set(key, kept)
  else loginAttempts.delete(key)
  return kept
}

function isRateLimited(key: string): boolean {
  return recentAttempts(key, Date.now()).length >= RATE_LIMIT_MAX
}

function recordFailedAttempt(key: string): void {
  const now = Date.now()
  const kept = recentAttempts(key, now)
  kept.push(now)
  loginAttempts.set(key, kept)

  if (loginAttempts.size > RATE_LIMIT_MAX_KEYS) {
    const cutoff = now - RATE_LIMIT_WINDOW_MS
    for (const [entryKey, stamps] of loginAttempts) {
      if (stamps.every((at) => at <= cutoff)) loginAttempts.delete(entryKey)
    }
  }
}

function clearAttempts(key: string): void {
  loginAttempts.delete(key)
}

/* --------------------------------- request --------------------------------- */

interface RequestMeta {
  ip: string
  ipHash: string
  userAgent: string | null
}

async function requestMeta(): Promise<RequestMeta> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded && forwarded.length > 0 ? forwarded : (headerList.get('x-real-ip') ?? 'unknown')
  return { ip, ipHash: sha256(ip), userAgent: headerList.get('user-agent') }
}

async function writeAudit(entry: {
  userId?: string | null
  action: string
  entityType?: string | null
  entityId?: string | null
  meta?: Record<string, unknown>
  ipHash?: string | null
}): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId: entry.userId ?? null,
      action: entry.action,
      entityType: entry.entityType ?? null,
      entityId: entry.entityId ?? null,
      meta: entry.meta ?? null,
      ipHash: entry.ipHash ?? null,
    })
  } catch (error) {
    // An audit write must never break the flow it observes.
    console.error('[auth] audit log write failed', error)
  }
}

/* --------------------------------- session --------------------------------- */

/**
 * The signed-in identity, or `null`. Verifies the JWT *and* the `sessions` row,
 * so revoked or expired sessions resolve to `null`.
 *
 * `cache()` keeps this to one database round-trip per request even when several
 * layouts and pages ask for it.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const token = await readSessionCookie()
  if (!token) return null

  try {
    const record = await resolveSession(token)
    if (!record) return null
    return { userId: record.userId, email: record.email, role: record.role }
  } catch (error) {
    console.error('[auth] session resolution failed', error)
    return null
  }
})

/** Require any signed-in user; redirects to the login page otherwise. */
export async function requireUser(): Promise<Session> {
  const session = await getSession()
  if (!session) redirect(LOGIN_PATH)
  return session
}

/** Require an admin; editors are bounced back to the admin dashboard. */
export async function requireAdmin(): Promise<Session> {
  const session = await requireUser()
  if (session.role !== 'admin') redirect(ADMIN_HOME_PATH)
  return session
}

/* ---------------------------------- sign in -------------------------------- */

export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase()
  if (normalizedEmail.length === 0 || password.length === 0) {
    return { ok: false, error: GENERIC_ERROR }
  }

  const meta = await requestMeta()
  const rateKey = `${normalizedEmail}|${meta.ip}`

  if (isRateLimited(rateKey)) {
    return { ok: false, error: THROTTLED_ERROR }
  }

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      active: users.active,
      passwordHash: users.passwordHash,
    })
    .from(users)
    .where(sql`lower(${users.email}) = ${normalizedEmail}`)
    .limit(1)

  const user = rows[0]

  if (!user) {
    await verifyPasswordDecoy(password)
    recordFailedAttempt(rateKey)
    await writeAudit({
      action: 'auth.sign_in_failed',
      meta: { email: normalizedEmail, reason: 'unknown_user' },
      ipHash: meta.ipHash,
    })
    return { ok: false, error: GENERIC_ERROR }
  }

  const passwordOk = await verifyPassword(password, user.passwordHash)
  if (!passwordOk) {
    recordFailedAttempt(rateKey)
    await writeAudit({
      userId: user.id,
      action: 'auth.sign_in_failed',
      meta: { email: normalizedEmail, reason: 'bad_password' },
      ipHash: meta.ipHash,
    })
    return { ok: false, error: GENERIC_ERROR }
  }

  if (!user.active) {
    recordFailedAttempt(rateKey)
    await writeAudit({
      userId: user.id,
      action: 'auth.sign_in_blocked',
      meta: { email: normalizedEmail, reason: 'inactive' },
      ipHash: meta.ipHash,
    })
    return { ok: false, error: GENERIC_ERROR }
  }

  const role: UserRole = user.role
  await createSession(
    { userId: user.id, email: user.email, role },
    { userAgent: meta.userAgent, ipHash: meta.ipHash },
  )

  await db
    .update(users)
    .set({ lastLoginAt: new Date(), updatedAt: new Date() })
    .where(eq(users.id, user.id))

  clearAttempts(rateKey)

  await writeAudit({
    userId: user.id,
    action: 'auth.sign_in',
    entityType: 'user',
    entityId: user.id,
    meta: { email: user.email, userAgent: meta.userAgent },
    ipHash: meta.ipHash,
  })

  try {
    await purgeExpiredSessions()
  } catch (error) {
    console.error('[auth] expired session purge failed', error)
  }

  return { ok: true }
}

/* --------------------------------- sign out -------------------------------- */

export async function signOut(): Promise<void> {
  const session = await getSession()
  await destroySession()

  if (session) {
    const meta = await requestMeta()
    await writeAudit({
      userId: session.userId,
      action: 'auth.sign_out',
      entityType: 'user',
      entityId: session.userId,
      ipHash: meta.ipHash,
    })
  }
}
