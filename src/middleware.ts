/**
 * Edge middleware — first gate in front of `/admin/*`.
 *
 * It only checks that a *well-formed, unexpired, correctly signed* session
 * cookie is present, which is cheap and Edge-safe. Revocation (the `sessions`
 * row) and role checks live in `requireUser()` / `requireAdmin()`, because the
 * Edge runtime has neither `node:crypto` nor the database driver.
 *
 * Consequence, on purpose: a revoked-but-unexpired token passes this gate and is
 * rejected one layer deeper. Never redirect *away* from the login page here —
 * that would loop for exactly that case.
 */

import { jwtVerify } from 'jose'
import { NextResponse, type NextRequest } from 'next/server'

import {
  JWT_ALG,
  JWT_AUDIENCE,
  JWT_ISSUER,
  LOGIN_PATH,
  NEXT_PARAM,
  SESSION_COOKIE,
  parseSessionPayload,
} from '@/server/auth/constants'

let cachedKey: Uint8Array | null = null

function secretKey(): Uint8Array | null {
  if (cachedKey) return cachedKey
  const secret = process.env.AUTH_SECRET
  if (!secret) return null
  cachedKey = new TextEncoder().encode(secret)
  return cachedKey
}

async function hasValidToken(token: string): Promise<boolean> {
  const key = secretKey()
  if (!key) return false
  try {
    const { payload } = await jwtVerify(token, key, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: [JWT_ALG],
    })
    return parseSessionPayload(payload) !== null
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl

  // The login page itself must stay reachable.
  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (token && (await hasValidToken(token))) {
    return NextResponse.next()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = LOGIN_PATH
  loginUrl.search = ''
  loginUrl.searchParams.set(NEXT_PARAM, `${pathname}${search}`)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*'],
}
