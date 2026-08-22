/**
 * `POST /api/recon/jobs` — enqueue an image→3D reconstruction.
 * `GET  /api/recon/jobs` — list jobs (status / project filtered).
 *
 * Enqueue only. The reconstruction itself runs in `scripts/jobs-worker.ts` or
 * behind `POST /api/recon/jobs/[id]/run`, never inside this request: a
 * procedural room takes tens of seconds and page-render-time work is forbidden
 * by docs/ARCHITECTURE.md §6.8.
 *
 * Deliberately *not* importing `@/server/recon` here — this file only touches
 * job rows, and the barrel would drag sharp and the reconstructors into a
 * handler that never runs one.
 */
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { serverEnv } from '@/lib/env'
import { db } from '@/server/db'
import { media } from '@/server/db/schema'
import { createJob, listJobs } from '@/server/recon/jobs'
import { RUNNABLE_RECON_MODES } from '@/server/recon/types'
import type { ReconStatus } from '@/types/content'

import { firstIssue, jsonError, readJsonBody, requireApiSession, toJobDto, uuidSchema } from '../_shared'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RECON_STATUSES = ['queued', 'running', 'review', 'approved', 'failed'] as const satisfies readonly ReconStatus[]

/**
 * The admin's mode `<select>` offers `NATIVE_GLB` (it is a legitimate *scene*
 * mode), but there is nothing to derive from a photograph for it. Rejecting
 * here with a real message beats letting the job fail a minute later.
 */
const createSchema = z.object({
  sourceMediaId: uuidSchema,
  mode: z.enum(RUNNABLE_RECON_MODES, {
    error: 'Mô hình GLB được tải lên trực tiếp, không dựng từ ảnh. Chọn Depth 2.5D hoặc Procedural 3D.',
  }),
  projectId: uuidSchema.nullish(),
  sceneId: uuidSchema.nullish(),
})

const listSchema = z.object({
  status: z.array(z.enum(RECON_STATUSES)).optional(),
  projectId: uuidSchema.optional(),
  limit: z.coerce.number().int().min(1).max(200).optional(),
  offset: z.coerce.number().int().min(0).optional(),
})

export async function POST(request: Request): Promise<NextResponse> {
  const auth = await requireApiSession()
  if ('response' in auth) return auth.response

  const body = await readJsonBody(request)
  if (body === null) return jsonError('Body phải là JSON hợp lệ.', 400)

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    // `mode` carries the most useful message, so surface it ahead of the rest.
    const modeIssue = parsed.error.issues.find((issue) => issue.path[0] === 'mode')
    return jsonError(modeIssue?.message ?? firstIssue(parsed.error), 400)
  }
  const { sourceMediaId, mode, projectId, sceneId } = parsed.data

  // Pre-flight the source so the operator learns about a bad pick immediately
  // instead of watching a job crawl to `failed`. `resolveSourceImage` checks
  // this again at run time — the file may vanish between now and then.
  const rows = await db
    .select({ id: media.id, kind: media.kind })
    .from(media)
    .where(eq(media.id, sourceMediaId))
    .limit(1)
  const source = rows[0]
  if (!source) return jsonError('Không tìm thấy ảnh nguồn trong thư viện.', 404)
  if (source.kind !== 'image') {
    return jsonError(`Nguồn phải là ảnh (đang là “${source.kind}”).`, 400)
  }

  try {
    const job = await createJob({
      sourceMediaId,
      mode,
      projectId: projectId ?? null,
      sceneId: sceneId ?? null,
      // The depth provider in force when the job was queued, so a later env
      // change is visible as a difference between two rows.
      provider: serverEnv().DEPTH_PROVIDER,
      createdBy: auth.session.userId,
    })

    revalidatePath('/admin/3d-assets')
    return NextResponse.json({ ok: true, id: job.id, job: toJobDto(job) }, { status: 201 })
  } catch (error) {
    console.error('[api/recon/jobs] create failed', error)
    return jsonError('Không tạo được job dựng 3D.', 500)
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  const auth = await requireApiSession()
  if ('response' in auth) return auth.response

  const params = new URL(request.url).searchParams
  const statuses = params.getAll('status').flatMap((value) => value.split(',')).filter((value) => value.length > 0)

  const parsed = listSchema.safeParse({
    status: statuses.length > 0 ? statuses : undefined,
    projectId: params.get('projectId') ?? undefined,
    limit: params.get('limit') ?? undefined,
    offset: params.get('offset') ?? undefined,
  })
  if (!parsed.success) return jsonError(firstIssue(parsed.error), 400)

  try {
    const jobs = await listJobs({
      status: parsed.data.status,
      projectId: parsed.data.projectId,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
    })
    return NextResponse.json({ ok: true, jobs: jobs.map(toJobDto) })
  } catch (error) {
    console.error('[api/recon/jobs] list failed', error)
    return jsonError('Không đọc được danh sách job.', 500)
  }
}
