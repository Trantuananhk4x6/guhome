/**
 * `GET /api/recon/jobs/[id]` — one job's status, progress and result.
 *
 * The panel in `/admin/3d-assets` polls the `fetchReconJobs` server action for
 * the whole table; this endpoint exists for anything that follows a single job
 * — a run kicked off from a script, a second browser tab, a smoke test after
 * `npm run jobs:worker`.
 *
 * Next 16: route handler params are a Promise (docs/ARCHITECTURE.md §10).
 */
import { NextResponse } from 'next/server'

import { getJob } from '@/server/recon/jobs'

import { jsonError, requireApiSession, toJobDto, uuidSchema } from '../../_shared'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const auth = await requireApiSession()
  if ('response' in auth) return auth.response

  const { id } = await params
  const parsed = uuidSchema.safeParse(id)
  if (!parsed.success) return jsonError('ID job không hợp lệ.', 400)

  try {
    const job = await getJob(parsed.data)
    if (!job) return jsonError('Không tìm thấy job.', 404)
    return NextResponse.json({ ok: true, id: job.id, job: toJobDto(job) })
  } catch (error) {
    console.error('[api/recon/jobs/:id] read failed', error)
    return jsonError('Không đọc được job.', 500)
  }
}
