/**
 * `recon_jobs` persistence — the only module that writes job rows.
 *
 * Neon's HTTP driver has no interactive transactions, so claiming is done with
 * a compare-and-set: `UPDATE ... WHERE id = ? AND status = 'queued'` returns a
 * row only for the process that actually won the job. Two workers can run side
 * by side without stepping on each other.
 */
import { and, asc, desc, eq, inArray, lt, or, type SQL } from 'drizzle-orm'

import { db } from '@/server/db'
import { reconJobs, type ReconJobRow } from '@/server/db/schema'
import type { ReconJob, ReconResult, ReconStatus } from '@/types/content'

import { isReconMode, type ReconMode, type RunnableReconMode } from './types'

/** A job as the API and the worker see it — `ReconJob` plus its bookkeeping. */
export interface ReconJobRecord extends ReconJob {
  sceneId: string | null
  provider: string
  startedAt: Date | null
  createdBy: string | null
}

/**
 * A job whose `running` claim is older than this is considered abandoned (the
 * process died, or a serverless invocation was frozen) and can be re-run.
 */
export const STALE_RUNNING_MS = 10 * 60 * 1000

export function toJobRecord(row: ReconJobRow): ReconJobRecord {
  const mode: ReconMode = isReconMode(row.mode) ? row.mode : 'DEPTH_2_5D'
  return {
    id: row.id,
    projectId: row.projectId,
    sceneId: row.sceneId,
    sourceMediaId: row.sourceMediaId,
    mode,
    status: row.status,
    progress: row.progress,
    provider: row.provider,
    error: row.error,
    result: row.result ?? null,
    createdBy: row.createdBy,
    createdAt: row.createdAt,
    startedAt: row.startedAt,
    finishedAt: row.finishedAt,
  }
}

export function isStaleRunning(job: ReconJobRecord, now = Date.now()): boolean {
  if (job.status !== 'running') return false
  const startedAt = job.startedAt ?? job.createdAt
  return now - startedAt.getTime() > STALE_RUNNING_MS
}

export async function getJob(id: string): Promise<ReconJobRecord | null> {
  const rows = await db.select().from(reconJobs).where(eq(reconJobs.id, id)).limit(1)
  const row = rows[0]
  return row ? toJobRecord(row) : null
}

export interface ListJobsOptions {
  status?: readonly ReconStatus[]
  projectId?: string
  limit?: number
  offset?: number
}

export async function listJobs(options: ListJobsOptions = {}): Promise<ReconJobRecord[]> {
  const filters: SQL[] = []
  if (options.status && options.status.length > 0) filters.push(inArray(reconJobs.status, [...options.status]))
  if (options.projectId) filters.push(eq(reconJobs.projectId, options.projectId))

  const where = filters.length === 0 ? undefined : filters.length === 1 ? filters[0] : and(...filters)

  const rows = await db
    .select()
    .from(reconJobs)
    .where(where)
    .orderBy(desc(reconJobs.createdAt))
    .limit(Math.min(200, Math.max(1, options.limit ?? 50)))
    .offset(Math.max(0, options.offset ?? 0))

  return rows.map(toJobRecord)
}

export interface CreateJobInput {
  sourceMediaId: string
  mode: RunnableReconMode
  projectId?: string | null
  sceneId?: string | null
  provider: string
  createdBy?: string | null
}

export async function createJob(input: CreateJobInput): Promise<ReconJobRecord> {
  const rows = await db
    .insert(reconJobs)
    .values({
      sourceMediaId: input.sourceMediaId,
      mode: input.mode,
      projectId: input.projectId ?? null,
      sceneId: input.sceneId ?? null,
      provider: input.provider,
      createdBy: input.createdBy ?? null,
      status: 'queued',
      progress: 0,
    })
    .returning()

  const row = rows[0]
  if (!row) throw new Error('Không tạo được recon job')
  return toJobRecord(row)
}

/** Compare-and-set claim. Returns the claimed job, or null if someone else won. */
export async function claimJob(id: string, from: readonly ReconStatus[] = ['queued']): Promise<ReconJobRecord | null> {
  const rows = await db
    .update(reconJobs)
    .set({ status: 'running', startedAt: new Date(), finishedAt: null, progress: 0, error: null })
    .where(and(eq(reconJobs.id, id), inArray(reconJobs.status, [...from])))
    .returning()

  const row = rows[0]
  return row ? toJobRecord(row) : null
}

/**
 * Oldest queued job, claimed atomically. A lost race just retries — with a
 * handful of workers the loop settles immediately.
 */
export async function claimNextQueuedJob(attempts = 3): Promise<ReconJobRecord | null> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const rows = await db
      .select({ id: reconJobs.id })
      .from(reconJobs)
      .where(eq(reconJobs.status, 'queued'))
      .orderBy(asc(reconJobs.createdAt))
      .limit(1)

    const candidate = rows[0]
    if (!candidate) return null

    const claimed = await claimJob(candidate.id)
    if (claimed) return claimed
  }
  return null
}

/** Unconditional transition to `running` — used by `runJob` itself. */
export async function markRunning(id: string): Promise<ReconJobRecord | null> {
  const rows = await db
    .update(reconJobs)
    .set({ status: 'running', startedAt: new Date(), finishedAt: null, progress: 0, error: null })
    .where(eq(reconJobs.id, id))
    .returning()
  const row = rows[0]
  return row ? toJobRecord(row) : null
}

export async function setProgress(id: string, progress: number): Promise<void> {
  const clamped = Math.max(0, Math.min(1, progress))
  await db.update(reconJobs).set({ progress: clamped }).where(eq(reconJobs.id, id))
}

/**
 * Success always lands on `review`, never `approved`: a person looks at the
 * result in /admin/3d-assets and decides whether it goes on the site.
 */
export async function completeJob(id: string, result: ReconResult, provider: string): Promise<void> {
  await db
    .update(reconJobs)
    .set({ status: 'review', progress: 1, result, provider, error: null, finishedAt: new Date() })
    .where(eq(reconJobs.id, id))
}

export async function failJob(id: string, message: string): Promise<void> {
  await db
    .update(reconJobs)
    .set({ status: 'failed', error: message.slice(0, 2000), finishedAt: new Date() })
    .where(eq(reconJobs.id, id))
}

/** Jobs that are queued, or stuck in `running` past the stale window. */
export async function countPendingJobs(): Promise<number> {
  const cutoff = new Date(Date.now() - STALE_RUNNING_MS)
  const rows = await db
    .select({ id: reconJobs.id })
    .from(reconJobs)
    .where(
      or(
        eq(reconJobs.status, 'queued'),
        and(eq(reconJobs.status, 'running'), lt(reconJobs.startedAt, cutoff)),
      ),
    )
  return rows.length
}
