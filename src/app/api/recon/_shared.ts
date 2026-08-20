/**
 * Shared plumbing for `/api/recon/**`.
 *
 * Not a route: the App Router only treats `route.ts` as an endpoint, so this
 * module is just a library that happens to live next to the handlers.
 *
 * Two things every handler here needs.
 *
 * **Auth.** `src/middleware.ts` matches `/admin/:path*` only, so nothing guards
 * `/api/recon/**` for us. Each handler calls `getSession()` itself. It must not
 * call `requireUser()`: that issues `redirect('/admin/login')`, which reaches
 * the browser as a 307 with an HTML body, and the admin panel — which reads a
 * JSON `{ error }` envelope — would show a bare status code instead of a reason.
 *
 * **Envelope.** `ReconJobs.tsx` accepts an id at `id`, `job.id` or `data.id`,
 * and an error message at `error` or `message`. We answer `{ ok, id, job }` /
 * `{ ok: false, error }` so both halves of that contract are satisfied and the
 * response is always valid JSON, never a thrown stack.
 */
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getSession, type Session } from '@/server/auth'
import type { ReconJobRecord } from '@/server/recon/jobs'
import type { ReconResult, ReconStatus } from '@/types/content'

/**
 * Postgres `uuid` columns reject anything else, so validate before querying —
 * same pattern (and same message) as `src/server/actions/scenes.ts`.
 */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export const uuidSchema = z.string().regex(UUID, 'ID không hợp lệ.')

export function jsonError(error: string, status: number): NextResponse {
  return NextResponse.json({ ok: false, error }, { status })
}

/**
 * The signed-in user, or a ready-made 401. Returning the response rather than
 * throwing keeps every handler a straight line with no try/catch around auth.
 */
export async function requireApiSession(): Promise<{ session: Session } | { response: NextResponse }> {
  const session = await getSession()
  if (!session) return { response: jsonError('Bạn cần đăng nhập để dùng API dựng 3D.', 401) }
  return { session }
}

/** `await request.json()`, or null for a malformed / absent body. */
export async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    return null
  }
}

/** First zod issue, phrased for the operator. */
export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0]
  if (!issue) return 'Dữ liệu không hợp lệ.'
  const path = issue.path.join('.')
  return path.length > 0 ? `${path}: ${issue.message}` : issue.message
}

/* ---------------------------------- dto ----------------------------------- */

/**
 * A job over the wire. Dates become ISO strings explicitly rather than by
 * accident of `JSON.stringify`, so the shape is part of the contract and a
 * poller can rely on it.
 */
export interface ReconJobDto {
  id: string
  projectId: string | null
  sceneId: string | null
  sourceMediaId: string
  mode: string
  status: ReconStatus
  /** 0..1 */
  progress: number
  provider: string
  error: string | null
  result: ReconResult | null
  createdAt: string
  startedAt: string | null
  finishedAt: string | null
  /** Milliseconds from claim to now (or to completion). Null before it starts. */
  durationMs: number | null
}

export function toJobDto(job: ReconJobRecord): ReconJobDto {
  const startedAt = job.startedAt
  const end = job.finishedAt ?? new Date()
  return {
    id: job.id,
    projectId: job.projectId,
    sceneId: job.sceneId,
    sourceMediaId: job.sourceMediaId,
    mode: job.mode,
    status: job.status,
    progress: job.progress,
    provider: job.provider,
    error: job.error,
    result: job.result,
    createdAt: job.createdAt.toISOString(),
    startedAt: startedAt ? startedAt.toISOString() : null,
    finishedAt: job.finishedAt ? job.finishedAt.toISOString() : null,
    durationMs: startedAt ? end.getTime() - startedAt.getTime() : null,
  }
}
