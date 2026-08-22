'use client'

/**
 * The image-to-3D queue.
 *
 * Job creation and execution belong to the recon pipeline's own routes
 * (`POST /api/recon/jobs`, `POST /api/recon/jobs/[id]/run`); this panel only
 * calls them, then polls `fetchReconJobs()` while anything is queued or running.
 * Approving a result folds it into the scene through `applyReconResult`.
 */

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { MediaThumb } from '@/components/admin/media/MediaThumb'
import { formatDuration, formatTimestamp, percent } from '@/components/admin/media/format'
import {
  RECON_MODES,
  RECON_STATUS_LABELS,
  SCENE_MODE_LABELS,
  type ProjectOption,
  type ReconJobItem,
} from '@/components/admin/media/types'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import {
  applyReconResult,
  fetchReconJobs,
  rejectReconJob,
  requeueReconJob,
} from '@/server/actions/scenes'
import type { MediaRef, ReconStatus, SceneMode } from '@/types/content'

import { MediaPickerField } from './MediaPickerField'
import { SelectRow } from './controls'

type ReconMode = Exclude<SceneMode, 'NONE' | 'IMAGE'>

const POLL_MS = 2500

/**
 * Modes a job can actually derive from a photograph.
 *
 * `RECON_MODES` also lists `NATIVE_GLB` because an existing job row may carry
 * it, but a GLB is uploaded, never reconstructed: the pipeline only runs
 * `DEPTH_2_5D` and `PROCEDURAL_3D`. Offering it in the create form would just
 * buy a rejected request, so it is filtered out here rather than in the shared
 * label map, which the table below still needs in full.
 */
const BUILDABLE_MODES: readonly ReconMode[] = RECON_MODES.filter((mode) => mode !== 'NATIVE_GLB')

const STATUS_TONES: Record<ReconStatus, string> = {
  queued: 'border-line text-muted',
  running: 'border-ink text-ink',
  review: 'border-accent text-accent',
  approved: 'border-line text-ink',
  failed: 'border-accent text-accent',
}

function field(value: unknown, key: string): unknown {
  if (!value || typeof value !== 'object') return undefined
  return (value as Record<string, unknown>)[key]
}

/** The routes belong to another module; accept any of the usual envelopes. */
function extractId(payload: unknown): string | null {
  for (const candidate of [
    field(payload, 'id'),
    field(field(payload, 'job'), 'id'),
    field(field(payload, 'data'), 'id'),
  ]) {
    if (typeof candidate === 'string' && candidate.length > 0) return candidate
  }
  return null
}

function extractError(payload: unknown): string | null {
  const value = field(payload, 'error') ?? field(payload, 'message')
  return typeof value === 'string' && value.length > 0 ? value : null
}

function durationOf(job: ReconJobItem): number | null {
  if (!job.startedAt) return null
  const end = job.finishedAt ? job.finishedAt.getTime() : Date.now()
  return end - job.startedAt.getTime()
}

export interface ReconJobsProps {
  jobs: readonly ReconJobItem[]
  projects: readonly ProjectOption[]
}

export function ReconJobs({ jobs, projects }: ReconJobsProps) {
  const router = useRouter()
  const [rows, setRows] = useState<ReconJobItem[]>([...jobs])
  const [seed, setSeed] = useState(jobs)
  if (seed !== jobs) {
    setSeed(jobs)
    setRows([...jobs])
  }

  const [source, setSource] = useState<MediaRef | null>(null)
  const [mode, setMode] = useState<ReconMode>('DEPTH_2_5D')
  const [projectId, setProjectId] = useState('')
  const [reviewId, setReviewId] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const busy = rows.some((job) => job.status === 'queued' || job.status === 'running')

  useEffect(() => {
    if (!busy) return
    let cancelled = false
    const timer = setInterval(() => {
      void (async () => {
        const next = await fetchReconJobs()
        if (!cancelled) setRows(next)
      })()
    }, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
    // Deliberately keyed on `busy` alone: every poll replaces `rows`, so listing
    // it here would tear the interval down and rebuild it on each tick.
  }, [busy])

  async function refresh(): Promise<void> {
    const next = await fetchReconJobs()
    setRows(next)
  }

  function createJob(): void {
    if (!source) {
      setNotice('Chọn một ảnh nguồn trước.')
      return
    }
    setNotice(null)
    startTransition(async () => {
      try {
        const response = await fetch('/api/recon/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sourceMediaId: source.id, mode, projectId: projectId || null }),
        })
        const payload: unknown = await response.json().catch(() => null)
        if (!response.ok) {
          setNotice(extractError(payload) ?? `Không tạo được job (${response.status}).`)
          return
        }
        const jobId = extractId(payload)
        if (jobId) {
          const run = await fetch(`/api/recon/jobs/${jobId}/run`, { method: 'POST' })
          if (!run.ok) setNotice(`Đã tạo job nhưng chưa chạy được (${run.status}). Bấm “Chạy” để thử lại.`)
        }
        setSource(null)
        await refresh()
      } catch (error) {
        console.error('[3d-assets] create job failed', error)
        setNotice('Không gọi được API dựng 3D.')
      }
    })
  }

  function runJob(jobId: string): void {
    setNotice(null)
    startTransition(async () => {
      try {
        const response = await fetch(`/api/recon/jobs/${jobId}/run`, { method: 'POST' })
        if (!response.ok) {
          const payload: unknown = await response.json().catch(() => null)
          setNotice(extractError(payload) ?? `Không chạy được job (${response.status}).`)
        }
        await refresh()
      } catch (error) {
        console.error('[3d-assets] run job failed', error)
        setNotice('Không gọi được API dựng 3D.')
      }
    })
  }

  function approve(jobId: string): void {
    setNotice(null)
    startTransition(async () => {
      const result = await applyReconResult({ jobId })
      if (!result.ok) {
        setNotice(result.error)
        return
      }
      setReviewId(null)
      await refresh()
      router.refresh()
    })
  }

  function reject(jobId: string): void {
    setNotice(null)
    startTransition(async () => {
      const result = await rejectReconJob({ jobId })
      if (!result.ok) setNotice(result.error)
      setReviewId(null)
      await refresh()
    })
  }

  function retry(jobId: string): void {
    setNotice(null)
    startTransition(async () => {
      const result = await requeueReconJob(jobId)
      if (!result.ok) {
        setNotice(result.error)
        return
      }
      setReviewId(null)
      runJob(jobId)
    })
  }

  const review = rows.find((job) => job.id === reviewId) ?? null

  return (
    <div className="flex flex-col gap-10">
      {/* -------------------------------- create ------------------------------- */}
      <section className="grid gap-6 border border-line p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
        <MediaPickerField
          label="Ảnh nguồn"
          value={source}
          kinds={['image']}
          hint="Một khung ảnh nội thất rõ chiều sâu cho kết quả tốt nhất."
          onChange={setSource}
        />
        <SelectRow
          label="Chế độ dựng"
          value={mode}
          options={BUILDABLE_MODES.map((value) => ({ value, label: SCENE_MODE_LABELS[value] }))}
          onChange={(value) => {
            const next = BUILDABLE_MODES.find((item) => item === value)
            if (next) setMode(next)
          }}
        />
        <SelectRow
          label="Dự án"
          value={projectId}
          options={[
            { value: '', label: 'Không gắn dự án' },
            ...projects.map((project) => ({ value: project.id, label: project.title })),
          ]}
          onChange={setProjectId}
        />
        <Button size="sm" loading={pending} onClick={createJob}>
          Tạo job
        </Button>
      </section>

      {notice ? <p className="text-[0.8125rem] leading-relaxed text-accent">{notice}</p> : null}

      {/* -------------------------------- review ------------------------------- */}
      {review ? (
        <section className="flex flex-col gap-6 border border-accent p-6">
          <header className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="u-label text-accent">CHỜ DUYỆT</span>
              <p className="font-display text-2xl leading-none text-ink">
                {review.projectTitle ?? 'Không gắn dự án'} · {SCENE_MODE_LABELS[review.mode]}
              </p>
            </div>
            <button type="button" className="u-label text-muted hover:text-ink" onClick={() => setReviewId(null)}>
              Đóng
            </button>
          </header>

          <div className="grid gap-px bg-line sm:grid-cols-2">
            <figure className="flex flex-col bg-canvas">
              <div className="relative aspect-4/3 w-full bg-surface-alt">
                <MediaThumb media={review.source} width={1200} sizes="40vw" fit="contain" />
              </div>
              <figcaption className="u-label border-t border-line px-4 py-3">Ảnh gốc</figcaption>
            </figure>
            <figure className="flex flex-col bg-canvas">
              <div className="relative aspect-4/3 w-full bg-surface-alt">
                <MediaThumb
                  media={review.resultDepth ?? review.resultModel}
                  width={1200}
                  sizes="40vw"
                  fit="contain"
                />
              </div>
              <figcaption className="u-label border-t border-line px-4 py-3">
                {review.resultDepth ? 'Bản đồ độ sâu' : review.resultModel ? 'Mô hình dựng' : 'Chưa có kết quả'}
              </figcaption>
            </figure>
          </div>

          {review.result?.metrics ? (
            <dl className="flex flex-wrap gap-x-10 gap-y-2">
              <div className="flex items-baseline gap-2">
                <dt className="u-label">Provider</dt>
                <dd className="text-[0.8125rem] text-ink">{review.result.metrics.provider}</dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="u-label">Thời lượng</dt>
                <dd className="text-[0.8125rem] text-ink">{formatDuration(review.result.metrics.durationMs)}</dd>
              </div>
              {review.result.metrics.confidence !== undefined ? (
                <div className="flex items-baseline gap-2">
                  <dt className="u-label">Độ tin cậy</dt>
                  <dd className="text-[0.8125rem] text-ink">{percent(review.result.metrics.confidence)}</dd>
                </div>
              ) : null}
              {review.result.suggestedWaypoints ? (
                <div className="flex items-baseline gap-2">
                  <dt className="u-label">Waypoint gợi ý</dt>
                  <dd className="text-[0.8125rem] text-ink">{review.result.suggestedWaypoints.length}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" loading={pending} onClick={() => approve(review.id)}>
              Duyệt & áp dụng
            </Button>
            <Button variant="ghost" size="sm" onClick={() => retry(review.id)}>
              Chạy lại
            </Button>
            <Button variant="ghost" tone="accent" size="sm" onClick={() => reject(review.id)}>
              Từ chối
            </Button>
          </div>
        </section>
      ) : null}

      {/* --------------------------------- table ------------------------------- */}
      {rows.length === 0 ? (
        <p className="border border-line bg-surface/40 px-6 py-16 text-center text-[0.875rem] text-muted">
          Chưa có job nào. Chọn một ảnh và tạo job đầu tiên.
        </p>
      ) : (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                {['Ảnh nguồn', 'Dự án', 'Chế độ', 'Trạng thái', 'Tiến trình', 'Tạo lúc', 'Thời lượng', ''].map(
                  (heading) => (
                    <th key={heading} scope="col" className="u-label px-4 py-3 font-medium">
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((job) => (
                <tr key={job.id} className="border-b border-line last:border-b-0 align-middle">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-16 overflow-hidden bg-surface-alt">
                      <MediaThumb media={job.source} width={400} sizes="4rem" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[0.8125rem] text-ink">{job.projectTitle ?? '—'}</td>
                  <td className="px-4 py-3 text-[0.8125rem] text-muted">{SCENE_MODE_LABELS[job.mode]}</td>
                  <td className="px-4 py-3">
                    <span className={cn('u-label border px-2 py-1', STATUS_TONES[job.status])}>
                      {RECON_STATUS_LABELS[job.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className="h-px w-16 bg-line">
                        <span
                          className="block h-px bg-ink"
                          style={{ width: `${Math.round(Math.min(Math.max(job.progress, 0), 1) * 100)}%` }}
                        />
                      </span>
                      <span className="font-mono text-[0.6875rem] text-muted tabular-nums">
                        {percent(job.progress)}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[0.75rem] text-muted">{formatTimestamp(job.createdAt)}</td>
                  <td className="px-4 py-3 font-mono text-[0.6875rem] text-muted tabular-nums">
                    {formatDuration(durationOf(job))}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {job.status === 'review' ? (
                        <button
                          type="button"
                          onClick={() => setReviewId(job.id)}
                          className="u-label text-accent hover:text-ink"
                        >
                          Xem kết quả
                        </button>
                      ) : null}
                      {job.status === 'queued' ? (
                        <button
                          type="button"
                          onClick={() => runJob(job.id)}
                          className="u-label text-ink hover:text-accent"
                        >
                          Chạy
                        </button>
                      ) : null}
                      {job.status === 'failed' ? (
                        <button
                          type="button"
                          onClick={() => retry(job.id)}
                          className="u-label text-ink hover:text-accent"
                        >
                          Thử lại
                        </button>
                      ) : null}
                    </div>
                    {job.error ? (
                      <p className="mt-1 max-w-64 text-right text-[0.6875rem] leading-relaxed text-accent">
                        {job.error}
                      </p>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
