/**
 * GuHomes — image→3D job worker.
 *
 *   npm run jobs:worker
 *   npx tsx scripts/jobs-worker.ts [--once] [--limit=<n>] [--job=<id>]
 *                                  [--interval=<ms>] [--concurrency=<n>]
 *
 * Polls `recon_jobs` for queued work, claims it, and runs it through
 * `runJob()`. This process (or the explicit `POST /api/recon/jobs/[id]/run`)
 * is the *only* place a reconstruction happens — docs/ARCHITECTURE.md §6.8
 * forbids doing it during page render.
 *
 * Why polling: Neon's HTTP driver has no `LISTEN/NOTIFY` and no interactive
 * transactions, so the concurrency primitive is the compare-and-set claim in
 * `src/server/recon/jobs.ts` — `UPDATE ... WHERE id = ? AND status = 'queued'`
 * returns a row only to the process that won. Two workers, or a worker and the
 * run route, can therefore share a queue safely.
 *
 * Crash safety runs in both directions. A job that throws is recorded on its
 * own row by `runJob` and the loop continues; a *worker* that dies mid-job
 * leaves the row `running`, and the stale sweep below reclaims it once it is
 * older than `STALE_RUNNING_MS` (10 minutes).
 */
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { config as loadEnv } from 'dotenv'

// Type-only: erased at build time, so it does not pull the module (and with it
// `src/server/db`) in before dotenv has populated process.env.
import type { ReconJobRecord } from '../src/server/recon/jobs'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(SCRIPT_DIR, '..')

loadEnv({ path: join(REPO_ROOT, '.env.local'), quiet: true })

// `createLocalDriver` resolves STORAGE_LOCAL_ROOT (`./public/media`) against
// `process.cwd()`, and so does `resolveSourceImage` when it looks for a
// derivative. A worker started by a supervisor from some other directory would
// otherwise write artefacts into a `public/media` tree that nothing serves.
process.chdir(REPO_ROOT)

/* ---------------------------------- cli ----------------------------------- */

interface Options {
  once: boolean
  limit: number | null
  job: string | null
  intervalMs: number
  concurrency: number
}

const DEFAULT_INTERVAL_MS = 3_000
const MIN_INTERVAL_MS = 250
/** sharp plus a five-face GLB export peaks at a few hundred MB; one at a time. */
const DEFAULT_CONCURRENCY = 1
const MAX_CONCURRENCY = 8
/** Look for abandoned `running` rows at most this often. */
const STALE_SWEEP_MS = 60_000

function positiveInt(value: string): number | null {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

function envInt(name: string): number | null {
  const raw = process.env[name]
  return raw === undefined ? null : positiveInt(raw)
}

function parseArgs(argv: readonly string[]): Options {
  const options: Options = {
    once: false,
    limit: null,
    job: null,
    intervalMs: envInt('RECON_POLL_MS') ?? DEFAULT_INTERVAL_MS,
    concurrency: envInt('RECON_CONCURRENCY') ?? DEFAULT_CONCURRENCY,
  }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === undefined || !arg.startsWith('--')) continue

    if (arg === '--once') {
      options.once = true
      continue
    }
    if (arg === '--help' || arg === '-h') {
      printUsage()
      process.exit(0)
    }

    const eq = arg.indexOf('=')
    const name = eq === -1 ? arg : arg.slice(0, eq)
    const inline = eq === -1 ? null : arg.slice(eq + 1)
    const next = argv[i + 1]
    const value = inline ?? (next !== undefined && !next.startsWith('--') ? next : null)
    if (value === null) continue
    if (inline === null) i++

    switch (name) {
      case '--job':
        options.job = value.trim()
        break
      case '--limit': {
        const n = positiveInt(value)
        if (n !== null) options.limit = n
        break
      }
      case '--interval': {
        const n = positiveInt(value)
        if (n !== null) options.intervalMs = Math.max(MIN_INTERVAL_MS, n)
        break
      }
      case '--concurrency': {
        const n = positiveInt(value)
        if (n !== null) options.concurrency = Math.min(n, MAX_CONCURRENCY)
        break
      }
      default:
        break
    }
  }

  return options
}

function printUsage(): void {
  console.log(
    [
      'Usage: tsx scripts/jobs-worker.ts [options]',
      '',
      '  --once                drain the queue, then exit (for cron / CI)',
      '  --limit=<n>           stop after running n jobs',
      '  --job=<uuid>          run exactly this job, then exit (forces a re-run)',
      '  --interval=<ms>       idle poll interval (default 3000, env RECON_POLL_MS)',
      '  --concurrency=<n>     jobs in flight (default 1, env RECON_CONCURRENCY)',
      '',
      'Signals: SIGINT / SIGTERM finish the in-flight job then exit 0.',
      '         A second signal exits immediately; the stale sweep recovers the row.',
    ].join('\n'),
  )
}

/* -------------------------------- logging --------------------------------- */

type Level = 'info' | 'warn' | 'error'

function stamp(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 23)
}

function log(level: Level, message: string, detail?: Record<string, unknown>): void {
  const parts = [stamp(), level.toUpperCase().padEnd(5), message]
  if (detail) {
    const pairs = Object.entries(detail)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${typeof value === 'string' ? value : JSON.stringify(value)}`)
    if (pairs.length > 0) parts.push(pairs.join(' '))
  }
  const line = parts.join('  ')
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}

function errorText(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

/* --------------------------- shutdown / sleeping --------------------------- */

let stopping = false
const sleepers = new Set<() => void>()

function wakeAll(): void {
  for (const wake of [...sleepers]) wake()
}

/** Sleep that a shutdown signal can cut short. */
function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const finish = (): void => {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
      sleepers.delete(finish)
      resolve()
    }
    timer = setTimeout(finish, ms)
    sleepers.add(finish)
  })
}

function installSignalHandlers(): void {
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
      if (stopping) {
        log('warn', `${signal} lần hai — thoát ngay, job đang chạy sẽ được thu hồi sau 10 phút`)
        process.exit(130)
      }
      stopping = true
      log('info', `${signal} — dừng nhận job mới, chờ job hiện tại xong`)
      wakeAll()
    })
  }

  // A stray rejection must log, not take the loop down with it. Node's default
  // for an unhandled rejection is to abort the process, which would strand a
  // whole queue over one library's fire-and-forget promise.
  process.on('unhandledRejection', (reason: unknown) => {
    log('error', 'unhandled rejection', { reason: errorText(reason) })
  })

  // An uncaught exception is a bug, not a job failure: the process state is no
  // longer trustworthy, so exit and let the stale sweep recover the row rather
  // than pretending the loop is still healthy.
  process.on('uncaughtException', (error: unknown) => {
    log('error', 'uncaught exception — thoát', { error: errorText(error) })
    process.exit(1)
  })
}

/* ------------------------------- bootstrap -------------------------------- */

const options = parseArgs(process.argv.slice(2))

if (!process.env.DATABASE_URL) {
  log('error', 'DATABASE_URL chưa được đặt — sao chép .env.example sang .env.local rồi điền vào')
  process.exit(1)
}

// `src/server/db/index.ts` reads DATABASE_URL at module load, so every server
// module is imported *after* dotenv has run. Same pattern as scripts/seed.ts.
const { serverEnv } = await import('../src/lib/env')
const {
  claimJob,
  claimNextQueuedJob,
  countPendingJobs,
  getJob,
  isStaleRunning,
  listJobs,
  STALE_RUNNING_MS,
} = await import('../src/server/recon/jobs')
const { runJobDetailed } = await import('../src/server/recon/run')

/* --------------------------------- claiming -------------------------------- */

let lastSweepAt = 0

/**
 * Oldest queued job, or an abandoned `running` row past the stale window.
 * `claimNextQueuedJob` only looks at `queued`, so without this sweep a job
 * orphaned by a killed worker would sit in `running` forever.
 *
 * The `STALE_SWEEP_MS` throttle exists to keep an *idle* worker from scanning
 * `running` on every poll — it must never cap how many abandoned rows a single
 * invocation can recover. So the clock is armed only on a sweep that found
 * nothing: a reclaimed row leaves `lastSweepAt` untouched and the very next
 * lane iteration sweeps again, which is what lets `--once` actually drain the
 * queue it just counted. Under `--once` there is no idle polling at all, so the
 * throttle is skipped outright.
 */
async function claimNext(): Promise<ReconJobRecord | null> {
  const queued = await claimNextQueuedJob()
  if (queued) return queued

  const now = Date.now()
  if (!options.once && now - lastSweepAt < STALE_SWEEP_MS) return null

  const running = await listJobs({ status: ['running'], limit: 50 })
  for (const job of running) {
    if (!isStaleRunning(job, now)) continue
    const reclaimed = await claimJob(job.id, ['running'])
    if (reclaimed) {
      log('warn', 'thu hồi job treo', { job: job.id, staleAfterMs: STALE_RUNNING_MS })
      return reclaimed
    }
  }

  // Nothing left to recover: only now may the idle throttle arm.
  lastSweepAt = now
  return null
}

/* ---------------------------------- lanes ---------------------------------- */

interface Counters {
  reserved: number
  completed: number
  failed: number
  skipped: number
}

const counters: Counters = { reserved: 0, completed: 0, failed: 0, skipped: 0 }

/**
 * Run one job and log its terminal state. Never throws: a failing job must not
 * take the loop down with it — `runJobDetailed` already wrote the reason to the
 * row, so the worker only has to say so out loud and move on.
 */
async function runOne(job: ReconJobRecord, forced = false): Promise<void> {
  log('info', 'bắt đầu', { job: job.id, mode: job.mode, provider: job.provider, source: job.sourceMediaId })

  try {
    // `claimed: true` — `claimNext()` already made this process the owner, so
    // the runner must not try to claim it a second time. `--job` is the
    // exception: it is an explicit re-run of a row in any state.
    const outcome = await runJobDetailed(job.id, forced ? { force: true } : { claimed: true })
    switch (outcome.status) {
      case 'completed':
        counters.completed++
        log('info', 'xong', {
          job: job.id,
          ms: outcome.durationMs,
          provider: outcome.result.metrics?.provider,
          confidence: outcome.result.metrics?.confidence,
        })
        break
      case 'failed':
        counters.failed++
        log('error', 'thất bại', { job: job.id, ms: outcome.durationMs, error: outcome.error })
        break
      case 'skipped':
        counters.skipped++
        log('warn', 'bỏ qua', { job: job.id, reason: outcome.reason })
        break
    }
  } catch (error) {
    // Only reachable if the database went away mid-job; the row is recovered by
    // the stale sweep. Never fatal.
    counters.failed++
    log('error', 'lỗi ngoài dự kiến khi chạy job', { job: job.id, error: errorText(error) })
  }
}

/** One independent claim-and-run lane. The CAS handles the race between them. */
async function lane(): Promise<void> {
  while (!stopping) {
    if (options.limit !== null && counters.reserved >= options.limit) return

    counters.reserved++
    let job: ReconJobRecord | null = null
    try {
      job = await claimNext()
    } catch (error) {
      counters.reserved--
      log('error', 'không truy vấn được hàng đợi', { error: errorText(error) })
      if (options.once) return
      await sleep(options.intervalMs)
      continue
    }

    if (!job) {
      counters.reserved--
      if (options.once) return
      await sleep(options.intervalMs)
      continue
    }

    await runOne(job)
  }
}

/* ---------------------------------- main ----------------------------------- */

/** `recon_jobs.id` is a Postgres `uuid`; anything else is a driver error, not a miss. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** `--job=<id>`: run one named job, whatever state its row is in, then exit. */
async function runNamedJob(jobId: string): Promise<void> {
  if (!UUID.test(jobId)) {
    log('error', '--job phải là một UUID', { job: jobId })
    process.exitCode = 1
    return
  }

  let job: ReconJobRecord | null
  try {
    job = await getJob(jobId)
  } catch (error) {
    log('error', 'không đọc được job', { job: jobId, error: errorText(error) })
    process.exitCode = 1
    return
  }
  if (!job) {
    log('error', 'không tìm thấy job', { job: jobId })
    process.exitCode = 1
    return
  }

  // An explicit id is an operator decision, so `force` skips the claim: a row
  // left `running` by yesterday's crash, or one already `failed`, still runs.
  await runOne(job, true)
  if (counters.failed > 0) process.exitCode = 1
}

async function main(): Promise<void> {
  const env = serverEnv()

  log('info', 'GuHomes — jobs worker', {
    mode: options.job ? 'single' : options.once ? 'once' : 'loop',
    intervalMs: options.once || options.job ? undefined : options.intervalMs,
    concurrency: options.job ? 1 : options.concurrency,
    limit: options.limit ?? undefined,
    depthProvider: env.DEPTH_PROVIDER,
    storage: env.STORAGE_DRIVER,
  })

  installSignalHandlers()
  const started = Date.now()

  const summary = (): Record<string, unknown> => ({
    ms: Date.now() - started,
    completed: counters.completed,
    failed: counters.failed,
    skipped: counters.skipped,
  })

  if (options.job) {
    await runNamedJob(options.job)
    log('info', 'kết thúc', summary())
    return
  }

  try {
    const pending = await countPendingJobs()
    log('info', `${pending} job đang chờ`)
    if (pending === 0 && options.once) {
      log('info', 'hàng đợi rỗng — thoát')
      return
    }
  } catch (error) {
    log('error', 'không kết nối được cơ sở dữ liệu', { error: errorText(error) })
    process.exitCode = 1
    return
  }

  const lanes = Array.from({ length: Math.max(1, options.concurrency) }, () => lane())
  await Promise.all(lanes)

  log('info', 'kết thúc', summary())
}

try {
  await main()
} catch (error) {
  // Only an init-level failure lands here: an individual job never throws out
  // of `lane()`. Non-zero so a supervisor restarts the process.
  log('error', 'worker dừng vì lỗi khởi tạo', { error: errorText(error) })
  process.exitCode = 1
}
