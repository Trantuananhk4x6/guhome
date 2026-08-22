/**
 * `POST /api/recon/jobs/[id]/run` — the explicit admin "Chạy" / "Thử lại".
 *
 * This is the second of the two sanctioned entry points in
 * docs/ARCHITECTURE.md §6.8 (the other being `scripts/jobs-worker.ts`). The
 * work is handed to `after()` rather than awaited: a procedural room takes tens
 * of seconds, which would blow past any platform request timeout, and the panel
 * already polls every 2500 ms so the operator sees progress either way. The
 * response is therefore 202 — accepted, not finished.
 *
 * `runJob` claims the row itself with the same compare-and-set the worker uses,
 * so pressing the button while a worker is draining the queue cannot run the
 * same job twice.
 *
 * Next 16: route handler params are a Promise (docs/ARCHITECTURE.md §10).
 */
import { NextResponse, after } from 'next/server'

import { getJob, isStaleRunning, type ReconJobRecord } from '@/server/recon/jobs'
import { runJob } from '@/server/recon/run'
import { isRunnableReconMode } from '@/server/recon/types'

import { jsonError, requireApiSession, toJobDto, uuidSchema } from '../../../_shared'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const auth = await requireApiSession()
  if ('response' in auth) return auth.response

  const { id } = await params
  const parsed = uuidSchema.safeParse(id)
  if (!parsed.success) return jsonError('ID job không hợp lệ.', 400)

  let job: ReconJobRecord | null
  try {
    job = await getJob(parsed.data)
  } catch (error) {
    console.error('[api/recon/jobs/:id/run] read failed', error)
    return jsonError('Không đọc được job.', 500)
  }
  if (!job) return jsonError('Không tìm thấy job.', 404)

  if (!isRunnableReconMode(job.mode)) {
    return jsonError('Mô hình GLB được tải lên trực tiếp, không dựng từ ảnh.', 400)
  }

  switch (job.status) {
    case 'queued':
      break
    case 'running':
      // A row abandoned by a killed process is fair game; a live one is not.
      if (!isStaleRunning(job)) return jsonError('Job đang chạy.', 409)
      break
    case 'review':
      return jsonError('Job đã có kết quả — duyệt hoặc từ chối trước khi chạy lại.', 409)
    case 'approved':
      return jsonError('Job đã được duyệt.', 409)
    case 'failed':
      return jsonError('Job đã dừng — bấm “Thử lại” để đưa lại vào hàng đợi.', 409)
  }

  after(() => runJob(job.id))

  return NextResponse.json({ ok: true, id: job.id, job: toJobDto(job) }, { status: 202 })
}
