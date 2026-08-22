/**
 * Session issuing / verification. Server-only module (imports `node:crypto`,
 * `next/headers` and the database) — never import from a client component.
 *
 * A session is a signed JWT (jose, HS256) stored in the httpOnly `an_session`
 * cookie, *plus* a `sessions` row keyed by the SHA-256 of the token. The row is
 * what makes sessions revocable: deleting it invalidates a token that has not
 * expired yet.
 */

import { createHash, randomUUID } from 'node:crypto'

import { and, eq, gt, lt } from 'drizzle-orm'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import { serverEnv } from '@/lib/env'
import { db } from '@/server/db'
import { sessions, users } from '@/server/db/schema'
import type { UserRole } from '@/types/content'

import {
  JWT_ALG,
  JWT_AUDIENCE,
  JWT_ISSUER,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  parseSessionPayload,
  type SessionPayload,
} from './constants'

export type { SessionPayload }

let cachedKey: Uint8Array | null = null

function secretKey(): Uint8Array {
  cachedKey ??= new TextEncoder().encode(serverEnv().AUTH_SECRET)
  return cachedKey
}

/** SHA-256 hex digest — used for token lookup keys and for IP pseudonymisation. */
export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/* --------------------------------- tokens ---------------------------------- */

export interface IssuedSession {
  token: string
  expiresAt: Date
}

async function signSessionToken(payload: SessionPayload, expiresAt: Date): Promise<string> {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: JWT_ALG })
    .setSubject(payload.userId)
    .setJti(randomUUID())
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(secretKey())
}

/** Verify signature + claims. Returns `null` for anything untrusted or expired. */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: [JWT_ALG],
    })
    return parseSessionPayload(payload)
  } catch {
    return null
  }
}

/* --------------------------------- cookies --------------------------------- */

export async function readSessionCookie(): Promise<string | null> {
  const store = await cookies()
  return store.get(SESSION_COOKIE)?.value ?? null
}

async function writeSessionCookie(token: string, expiresAt: Date): Promise<void> {
  const store = await cookies()
  store.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  })
}

async function clearSessionCookie(): Promise<void> {
  const store = await cookies()
  store.set({
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}

/* --------------------------------- records --------------------------------- */

export interface SessionRecord extends SessionPayload {
  sessionId: string
  expiresAt: Date
}

/**
 * Resolve a raw token to a live session: the JWT must verify **and** the
 * matching `sessions` row must still exist, be unexpired, and belong to an
 * active user. Identity (email/role) is read back from `users` so that role
 * changes and deactivations take effect immediately, without re-login.
 */
export async function resolveSession(token: string): Promise<SessionRecord | null> {
  const payload = await verifySessionToken(token)
  if (!payload) return null

  const rows = await db
    .select({
      sessionId: sessions.id,
      expiresAt: sessions.expiresAt,
      userId: users.id,
      email: users.email,
      role: users.role,
      active: users.active,
    })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(and(eq(sessions.tokenHash, sha256(token)), gt(sessions.expiresAt, new Date())))
    .limit(1)

  const row = rows[0]
  if (!row) return null
  if (!row.active) return null
  // The row is authoritative; a token minted for a different user is rejected.
  if (row.userId !== payload.userId) return null

  const role: UserRole = row.role
  return {
    sessionId: row.sessionId,
    userId: row.userId,
    email: row.email,
    role,
    expiresAt: row.expiresAt,
  }
}

export interface SessionMeta {
  userAgent?: string | null
  ipHash?: string | null
}

/** Mint a token, persist the revocation row, and set the cookie. */
export async function createSession(payload: SessionPayload, meta: SessionMeta = {}): Promise<IssuedSession> {
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000)
  const token = await signSessionToken(payload, expiresAt)

  await db.insert(sessions).values({
    userId: payload.userId,
    tokenHash: sha256(token),
    expiresAt,
    userAgent: meta.userAgent ?? null,
    ipHash: meta.ipHash ?? null,
  })

  await writeSessionCookie(token, expiresAt)
  return { token, expiresAt }
}

/** Revoke the current session (row + cookie). Safe to call when signed out. */
export async function destroySession(): Promise<void> {
  const token = await readSessionCookie()
  if (token) {
    await db.delete(sessions).where(eq(sessions.tokenHash, sha256(token)))
  }
  await clearSessionCookie()
}

/** Revoke every session belonging to a user (password change, deactivation). */
export async function revokeUserSessions(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId))
}

/** Housekeeping — dropped rows are already unusable, this just keeps the table small. */
export async function purgeExpiredSessions(): Promise<void> {
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()))
}
