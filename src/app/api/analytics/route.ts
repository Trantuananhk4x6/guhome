/**
 * Anonymous analytics collector.
 *
 * Privacy contract: the raw IP and the user agent never leave this function.
 * The IP is folded into a non-reversible hash together with the caller's random
 * per-tab session id, and only that hash is stored — enough to count unique
 * sessions, useless for identifying anyone. Nothing else about the request is
 * persisted.
 *
 * Always answers 204 on success; the client fires and forgets.
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'

import { hashString } from '@/lib/utils'
import { db } from '@/server/db'
import { analyticsEvents } from '@/server/db/schema'
import type { AnalyticsEventType } from '@/types/content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* -------------------------------- validation ------------------------------- */

const EVENT_TYPES = [
  'PROJECT_VIEW',
  'THREE_OPEN',
  'THREE_INTERACT',
  'THREE_AUTO_EXPLORE',
  'ARTICLE_VIEW',
  'CONTACT_CTA',
  'CONTACT_SUBMIT',
] as const satisfies readonly AnalyticsEventType[]

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const bodySchema = z.object({
  type: z.enum(EVENT_TYPES),
  sessionId: z.string().min(1).max(128),
  entityType: z.string().min(1).max(32).optional(),
  /** Usually a UUID; anything else is kept as `meta.ref` so the insert stays valid. */
  entityId: z.string().min(1).max(128).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
})

const META_MAX_KEYS = 12
const META_MAX_CHARS = 1_024

/** Small, flat, and free of anything that looks like free-form personal data. */
function sanitiseMeta(meta: Record<string, unknown> | undefined): Record<string, unknown> | null {
  if (!meta) return null

  const out: Record<string, unknown> = {}
  let keys = 0
  for (const [key, value] of Object.entries(meta)) {
    if (keys >= META_MAX_KEYS) break
    if (key.length > 32) continue
    if (typeof value === 'string') {
      if (value.length > 200) continue
      out[key] = value
    } else if (typeof value === 'number' && Number.isFinite(value)) {
      out[key] = value
    } else if (typeof value === 'boolean') {
      out[key] = value
    } else {
      continue
    }
    keys += 1
  }

  if (keys === 0) return null
  if (JSON.stringify(out).length > META_MAX_CHARS) return null
  return out
}

/* ------------------------------- rate limiting ------------------------------ */

const WINDOW_MS = 60_000
const MAX_EVENTS_PER_WINDOW = 60

interface Bucket {
  count: number
  resetAt: number
}

/**
 * Per-instance memory only. Serverless gives every instance its own map, which
 * is fine: this exists to blunt a runaway loop or a trivial flood, not to be an
 * authoritative quota.
 */
const buckets = new Map<string, Bucket>()

function overLimit(key: string, now: number): boolean {
  const current = buckets.get(key)

  if (!current || now >= current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    if (buckets.size > 5_000) {
      for (const [k, bucket] of buckets) {
        if (now >= bucket.resetAt) buckets.delete(k)
      }
    }
    return false
  }

  current.count += 1
  return current.count > MAX_EVENTS_PER_WINDOW
}

/* ---------------------------------- handler -------------------------------- */

/** First hop of `x-forwarded-for`, else `x-real-ip`. Used for hashing only. */
function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first && first.length > 0) return first
  }
  return request.headers.get('x-real-ip')?.trim() ?? ''
}

export async function POST(request: Request): Promise<NextResponse> {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const parsed = bodySchema.safeParse(raw)
  if (!parsed.success) return new NextResponse(null, { status: 400 })

  const { type, sessionId, entityType } = parsed.data

  // One-way: the IP is hashed, then mixed with the session id. Neither the IP
  // nor the session id is recoverable from what gets stored.
  const sessionHash = hashString(`${sessionId}|${hashString(clientIp(request))}`)

  const now = Date.now()
  if (overLimit(sessionHash, now)) return new NextResponse(null, { status: 429 })

  const candidate = parsed.data.entityId
  const entityId = candidate && UUID_RE.test(candidate) ? candidate : null
  const extraRef = candidate && !entityId ? { ref: candidate } : {}
  const meta = sanitiseMeta({ ...parsed.data.meta, ...extraRef })

  try {
    await db.insert(analyticsEvents).values({
      type,
      entityType: entityType ?? null,
      entityId,
      sessionHash,
      meta,
    })
  } catch (error) {
    // A collector outage must not surface in the browser.
    console.error('[api/analytics] insert failed', error)
  }

  return new NextResponse(null, { status: 204 })
}
