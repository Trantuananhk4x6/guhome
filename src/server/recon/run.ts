/**
 * The job runner — docs/ARCHITECTURE.md §6.8.
 *
 * `runJob(jobId)` is the single place a reconstruction actually happens. It is
 * called from exactly two entry points, never from page rendering:
 *
 *   • `scripts/jobs-worker.ts`   — polls the queue, claims, runs
 *   • `POST /api/recon/jobs/[id]/run` — an explicit admin action, deferred to
 *     `after()` so the request does not hold the connection open for a minute
 *
 * Concurrency is handled by the compare-and-set claim in `./jobs`: whoever the
 * `UPDATE ... WHERE status = 'queued'` returns a row to owns the job. A caller
 * that has already won that race passes `{ claimed: true }` so the claim is not
 * attempted twice.
 *
 * `runJob` never throws. Every failure inside the run ends on `failJob`, because
 * a job row stuck in `running` is worse for the operator than a job row that
 * says why it stopped.
 */
import type { ReconResult } from '@/types/content'

import {
  claimJob,
  completeJob,
  failJob,
  getJob,
  isStaleRunning,
  markRunning,
  setProgress,
  type ReconJobRecord,
} from './jobs'
import { depth25dReconstructor } from './reconstructors/depth25d'
import { proceduralReconstructor } from './reconstructors/procedural'
import { resolveSourceImage, type ResolvedSource } from './store'
import { ReconError, errorMessage, isRunnableReconMode, type ReconMode, type Reconstructor } from './types'

/**
 * `setProgress` is one round-trip per call and a provider reports progress a
 * dozen times a pass, so writes are throttled. The admin panel polls every
 * 2500 ms, which this comfortably outpaces.
 */
const PROGRESS_INTERVAL_MS = 750

function notRunnable(mode: string): string {
  return `Chế độ ${mode} không dựng được từ ảnh — mô hình GLB được tải lên trực tiếp.`
}

const RECONSTRUCTORS: Record<ReconMode, Reconstructor | null> = {
  DEPTH_2_5D: depth25dReconstructor,
  PROCEDURAL_3D: proceduralReconstructor,
  // A native GLB is uploaded through the media library, never derived.
  NATIVE_GLB: null,
}

export function reconstructorFor(mode: ReconMode): Reconstructor {
  const reconstructor = RECONSTRUCTORS[mode]
  if (!reconstructor) throw new ReconError(notRunnable(mode), 'MODE_NOT_RUNNABLE')
  return reconstructor
}

/* -------------------------------- progress -------------------------------- */

interface ProgressSink {
  report(value: number): void
  /** Resolves once every queued write has landed. */
  settle(): Promise<void>
}

function createProgressSink(jobId: string): ProgressSink {
  let lastWriteAt = 0
  let lastValue = 0
  // Writes are chained rather than fired in parallel so they can never land out
  // of order and walk the progress bar backwards.
  let chain: Promise<void> = Promise.resolve()

  return {
    report(value: number): void {
      const next = value < 0 ? 0 : value > 1 ? 1 : value
      if (next <= lastValue) return
      const now = Date.now()
      if (next < 1 && now - lastWriteAt < PROGRESS_INTERVAL_MS) return
      lastWriteAt = now
      lastValue = next
      chain = chain.then(() => setProgress(jobId, next)).catch((error: unknown) => {
        // A dropped progress write is cosmetic; the terminal write is not.
        console.warn(`[recon] ${jobId} progress write failed — ${errorMessage(error)}`)
      })
    },
    settle(): Promise<void> {
      return chain
    },
  }
}

/* ---------------------------------- claim --------------------------------- */

/**
 * Win the job, or return null. `queued` is the normal path; a row left
 * `running` by a process that died is reclaimed once it is past
 * `STALE_RUNNING_MS`.
 */
async function claimForRun(jobId: string, force: boolean): Promise<ReconJobRecord | null> {
  if (force) return markRunning(jobId)

  const claimed = await claimJob(jobId, ['queued'])
  if (claimed) return claimed

  const existing = await getJob(jobId)
  if (!existing) return null
  if (isStaleRunning(existing)) return claimJob(jobId, ['running'])
  return null
}

/* ---------------------------------- run ----------------------------------- */

export interface RunJobOptions {
  /** The caller already won the CAS claim (the worker). Skips claiming. */
  claimed?: boolean
  /** Run regardless of the current status — the explicit `--job=<id>` path. */
  force?: boolean
}

export type RunOutcome =
  | { status: 'completed'; jobId: string; durationMs: number; result: ReconResult }
  | { status: 'failed'; jobId: string; durationMs: number; error: string }
  /** Someone else owns it, it is already finished, or the row is gone. */
  | { status: 'skipped'; jobId: string; durationMs: number; reason: string }

/**
 * Run a job and report what happened. `runJob` is the contract signature; this
 * is the same work with a return value, so the worker can log a terminal state
 * without a second round-trip.
 *
 * Rejects only if the database is unreachable while claiming — the worker wants
 * to hear about that loudly. Everything after the claim lands on the job row.
 */
export async function runJobDetailed(jobId: string, options: RunJobOptions = {}): Promise<RunOutcome> {
  const started = Date.now()
  const elapsed = (): number => Date.now() - started

  const job = options.claimed ? await getJob(jobId) : await claimForRun(jobId, options.force === true)
  if (!job) {
    return { status: 'skipped', jobId, durationMs: elapsed(), reason: 'Không claim được job (đã có người chạy?).' }
  }
  if (job.status !== 'running') {
    return { status: 'skipped', jobId, durationMs: elapsed(), reason: `Job đang ở trạng thái ${job.status}.` }
  }

  if (!isRunnableReconMode(job.mode)) {
    const message = notRunnable(job.mode)
    await failJob(jobId, message).catch(swallow(jobId))
    return { status: 'failed', jobId, durationMs: elapsed(), error: message }
  }

  const progress = createProgressSink(jobId)
  let source: ResolvedSource | null = null

  try {
    const reconstructor = reconstructorFor(job.mode)
    source = await resolveSourceImage(job.sourceMediaId)
    progress.report(0.01)

    const result = await reconstructor.run({
      sourcePath: source.path,
      jobId,
      onProgress: (value) => progress.report(value),
    })
    await progress.settle()

    // `durationMs` measures the whole job, not just the reconstructor: the
    // operator is waiting on source resolution and uploads too.
    const provider = result.metrics?.provider ?? job.provider
    const confidence = result.metrics?.confidence
    const stored: ReconResult = {
      ...result,
      metrics: {
        durationMs: elapsed(),
        provider,
        ...(typeof confidence === 'number' ? { confidence } : {}),
      },
    }

    await completeJob(jobId, stored, provider)
    return { status: 'completed', jobId, durationMs: elapsed(), result: stored }
  } catch (error) {
    const message = errorMessage(error)
    await progress.settle().catch(swallow(jobId))
    await failJob(jobId, message).catch(swallow(jobId))
    return { status: 'failed', jobId, durationMs: elapsed(), error: message }
  } finally {
    if (source?.cleanup) await source.cleanup().catch(swallow(jobId))
  }
}

function swallow(jobId: string): (error: unknown) => void {
  return (error: unknown) => {
    console.error(`[recon] ${jobId} cleanup/bookkeeping failed — ${errorMessage(error)}`)
  }
}

/**
 * docs/ARCHITECTURE.md §6.8. Never throws — safe to hand straight to `after()`
 * in a route handler, where a rejection would only surface in the server log.
 */
export async function runJob(jobId: string, options: RunJobOptions = {}): Promise<void> {
  try {
    const outcome = await runJobDetailed(jobId, options)
    if (outcome.status === 'failed') {
      console.error(`[recon] ${jobId} failed after ${outcome.durationMs}ms — ${outcome.error}`)
    }
  } catch (error) {
    console.error(`[recon] ${jobId} could not be started — ${errorMessage(error)}`)
  }
}
