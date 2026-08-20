/**
 * Anonymous analytics collector.
 *
 * Privacy contract (requirement 82 / brief §56): the raw IP and the user agent
 * never leave this function. The IP is folded into a SHA-256 digest together
 * with the caller's random per-tab session id, and only a truncated form of that
 * digest is stored — enough to count unique sessions, useless for identifying
 * anyone. No IP, no user agent, no referrer, no cookie, no name or email is
 * persisted, and an explicit `DNT: 1` is honoured server-side as well as in the
 * browser.
 *
 * Input contract: the request body is capped before it is parsed, and every
 * field — including every key of the free-form `meta` bag — is bounded by the
 * zod schema below. `sanitiseMeta()` is the second layer: it drops anything that
 * is not a small scalar.
 *
 * Always answers 204 on success; the client fires and forgets.
 */

import { createHash } from 'node:crypto'

import { NextResponse } from 'next/server'
import { z } from 'zod'

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

/**
 * The only entity vocabulary the collector will store. An unrecognised value is
 * dropped to `null` rather than rejected: a novel caller still gets its event
 * counted, but no free-form string reaches the `entity_type` column.
 */
const ENTITY_TYPES: readonly string[] = ['project', 'article', 'scene', 'service', 'material', 'category', 'page']

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const META_MAX_KEYS = 12
const META_MAX_KEY_CHARS = 32
const META_MAX_CHARS = 1_024

/** A beacon is a few hundred bytes; anything larger is not one of ours. */
const MAX_BODY_BYTES = 4_096

const bodySchema = z.strictObject({
  type: z.enum(EVENT_TYPES),
  sessionId: z.string().min(1).max(128),
  entityType: z.string().min(1).max(META_MAX_KEY_CHARS).optional(),
  /** Usually a UUID; anything else is kept as `meta.ref` so the insert stays valid. */
  entityId: z.string().min(1).max(128).optional(),
  /** Bounded here so an oversized bag is refused, then filtered by `sanitiseMeta`. */
  meta: z
    .record(z.string().min(1).max(META_MAX_KEY_CHARS), z.unknown())
    .refine((value) => Object.keys(value).length <= META_MAX_KEYS, `meta tối đa ${META_MAX_KEYS} khoá.`)
    .optional(),
})

/** Small, flat, and free of anything that looks like free-form personal data. */
function sanitiseMeta(meta: Record<string, unknown> | undefined): Record<string, unknown> | null {
  if (!meta) return null

  const out: Record<string, unknown> = {}
  let keys = 0
  for (const [key, value] of Object.entries(meta)) {
    if (keys >= META_MAX_KEYS) break
    if (key.length > META_MAX_KEY_CHARS) continue
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

/** The browser already checks this; a proxy or a scripted client might not. */
function trackingRefused(request: Request): boolean {
  return request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1'
}

/**
 * SHA-256 of `sessionId | sha256(ip)`, truncated to 128 bits. One-way: neither
 * the IP nor the session id can be recovered, and without the (random, never
 * stored) session id an IP cannot even be confirmed by guessing.
 */
function sessionDigest(sessionId: string, ip: string): string {
  const ipHash = createHash('sha256').update(ip).digest('hex')
  return createHash('sha256').update(`${sessionId}|${ipHash}`).digest('base64url').slice(0, 22)
}

export async function POST(request: Request): Promise<NextResponse> {
  if (trackingRefused(request)) return new NextResponse(null, { status: 204 })

  const declared = Number.parseInt(request.headers.get('content-length') ?? '', 10)
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 })
  }

  let raw: unknown
  try {
    const text = await request.text()
    if (text.length > MAX_BODY_BYTES) return new NextResponse(null, { status: 413 })
    raw = JSON.parse(text) as unknown
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const parsed = bodySchema.safeParse(raw)
  if (!parsed.success) return new NextResponse(null, { status: 400 })

  const { type, sessionId } = parsed.data
  const entityType =
    parsed.data.entityType && ENTITY_TYPES.includes(parsed.data.entityType) ? parsed.data.entityType : undefined

  const sessionHash = sessionDigest(sessionId, clientIp(request))

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
