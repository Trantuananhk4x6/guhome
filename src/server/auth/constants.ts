/**
 * Auth constants shared by the Node runtime (`@/server/auth/*`) and the Edge
 * middleware (`src/middleware.ts`).
 *
 * IMPORTANT: this module must stay Edge-safe — no `node:*` imports, no database
 * imports, no `next/headers`. Only plain values and type-level imports.
 */

import type { JWTPayload } from 'jose'

import type { UserRole } from '@/types/content'

/** Name of the httpOnly session cookie. */
// Renamed with the brand. Any session issued under the old name is orphaned
// rather than accepted, so everyone signs in once more after this ships — which
// is the correct outcome anyway: the JWT issuer and audience changed too, so an
// old token would fail verification even if the cookie still reached us.
export const SESSION_COOKIE = 'gu_session'

/** Session lifetime — 7 days, in seconds. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

/** JWT signing algorithm (symmetric — AUTH_SECRET). */
export const JWT_ALG = 'HS256'

export const JWT_ISSUER = 'guhomes'
export const JWT_AUDIENCE = 'guhomes-admin'

/** Where unauthenticated visitors are sent. */
export const LOGIN_PATH = '/admin/login'

/** Admin landing page — used when an editor reaches an admin-only route. */
export const ADMIN_HOME_PATH = '/admin'

/** Query param carrying the originally requested path through the login flow. */
export const NEXT_PARAM = 'next'

/** The decoded, validated identity carried by a session JWT. */
export interface SessionPayload {
  userId: string
  email: string
  role: UserRole
}

/**
 * Narrow an untrusted JWT payload to a `SessionPayload`.
 * Returns `null` when the claims are missing or malformed.
 */
export function parseSessionPayload(payload: JWTPayload): SessionPayload | null {
  const sub = payload.sub
  const email = payload['email']
  const role = payload['role']

  if (typeof sub !== 'string' || sub.length === 0) return null
  if (typeof email !== 'string' || email.length === 0) return null
  if (role !== 'admin' && role !== 'editor') return null

  return { userId: sub, email, role }
}
