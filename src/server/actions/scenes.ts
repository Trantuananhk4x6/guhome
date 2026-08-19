'use server'

/**
 * Scene + reconstruction-job mutations for `/admin/3d-assets`.
 *
 * The scene editor holds a whole `SceneConfig` in React state and posts it back
 * here in one go, so `updateScene` validates the entire shape rather than a
 * patch. Reads (`fetchScenes`, `fetchReconJobs`) live here too: the page calls
 * them during render, and the jobs panel calls `fetchReconJobs` on a poll while
 * anything is queued or running.
 */

import { and, asc, desc, eq, ilike, inArray, or, type SQL } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { toMediaRef } from '@/lib/media'
import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import {
  auditLogs,
  media,
  projects,
  reconJobs,
  scenes,
  type SceneRow,
} from '@/server/db/schema'
import { getMediaMap } from '@/server/queries/media'
import type { ReconJobItem, SceneListItem } from '@/components/admin/media/types'
import type { CameraWaypoint, MediaRef, ReconResult, SceneConfig, SceneMode } from '@/types/content'

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const id = z.string().regex(UUID, 'ID không hợp lệ.')

function fail(error: string): ActionResult<never> {
  return { ok: false, error }
}

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Dữ liệu không hợp lệ.'
}

async function audit(
  userId: string,
  action: string,
  entityId: string | null,
  meta?: Record<string, unknown>,
): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId,
      action,
      entityType: 'scene',
      entityId,
      meta: meta ?? null,
    })
  } catch (error) {
    console.error('[actions/scenes] audit write failed', error)
  }
}

/** Revalidate every surface a scene change can reach. */
async function revalidateScene(projectId: string | null): Promise<void> {
  revalidatePath('/admin/3d-assets')
  if (!projectId) return
  const rows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)
  const slug = rows[0]?.slug
  revalidatePath(`/admin/projects/${projectId}`)
  if (slug) revalidatePath(`/projects/${slug}`)
  revalidatePath('/projects')
  revalidatePath('/')
}

/* --------------------------------- schemas -------------------------------- */

const SCENE_MODES = ['NONE', 'IMAGE', 'DEPTH_2_5D', 'PROCEDURAL_3D', 'NATIVE_GLB'] as const

const coord = z.number().min(-1000, 'Toạ độ quá nhỏ.').max(1000, 'Toạ độ quá lớn.')
const vec3 = z.tuple([coord, coord, coord])

const waypointSchema = z.object({
  position: vec3,
  target: vec3,
  at: z.number().min(0).max(1).optional(),
  fov: z.number().min(10).max(120).optional(),
  ease: z.string().max(60).optional(),
  label: z.string().max(80).optional(),
})

const settingsSchema = z.object({
  displacementScale: z.number().min(0).max(20).optional(),
  planeSegments: z.number().int().min(8).max(512).optional(),
  parallaxStrength: z.number().min(0).max(5).optional(),
  roomWidth: z.number().min(0.5).max(80).optional(),
  roomHeight: z.number().min(0.5).max(40).optional(),
  roomDepth: z.number().min(0.5).max(80).optional(),
  wallTextureIds: z.array(id).max(12).optional(),
  modelScale: z.number().min(0.001).max(1000).optional(),
  modelPosition: vec3.optional(),
  modelRotation: vec3.optional(),
  bloom: z.number().min(0).max(3).optional(),
  vignette: z.number().min(0).max(2).optional(),
  toneMapping: z.enum(['ACESFilmic', 'AgX', 'Neutral', 'None']).optional(),
  background: z.string().max(60).optional(),
})

const createSceneSchema = z.object({
  projectId: id.nullable().optional(),
  name: z.string().max(120, 'Tên tối đa 120 ký tự.').nullable().optional(),
  mode: z.enum(SCENE_MODES).optional(),
  sourceMediaId: id.nullable().optional(),
})

const updateSceneSchema = z.object({
  id,
  projectId: id.nullable(),
  name: z.string().max(120, 'Tên tối đa 120 ký tự.').nullable(),
  mode: z.enum(SCENE_MODES),
  modelMediaId: id.nullable(),
  sourceMediaId: id.nullable(),
  depthMediaId: id.nullable(),
  envPreset: z.string().min(1, 'Chọn một preset môi trường.').max(40),
  envIntensity: z.number().min(0).max(8),
  exposure: z.number().min(0).max(4),
  fov: z.number().min(10, 'FOV tối thiểu 10°.').max(120, 'FOV tối đa 120°.'),
  shadows: z.boolean(),
  autoExplore: z.boolean(),
  animationSpeed: z.number().min(0).max(4),
  scrollSensitivity: z.number().min(0).max(4),
  waypoints: z.array(waypointSchema).max(24, 'Tối đa 24 waypoint.'),
  settings: settingsSchema,
})

export type CreateSceneInput = z.input<typeof createSceneSchema>
export type UpdateSceneInput = z.input<typeof updateSceneSchema>

/* ---------------------------------- reads --------------------------------- */

function toSceneConfig(row: SceneRow, mediaMap: Map<string, MediaRef>): SceneConfig {
  const ref = (value: string | null): MediaRef | null => (value ? (mediaMap.get(value) ?? null) : null)
  return {
    id: row.id,
    projectId: row.projectId,
    mode: row.mode,
    model: ref(row.modelMediaId),
    sourceImage: ref(row.sourceMediaId),
    depthMap: ref(row.depthMediaId),
    envPreset: row.envPreset,
    envIntensity: row.envIntensity,
    exposure: row.exposure,
    fov: row.fov,
    shadows: row.shadows,
    autoExplore: row.autoExplore,
    animationSpeed: row.animationSpeed,
    scrollSensitivity: row.scrollSensitivity,
    waypoints: row.waypoints ?? [],
    settings: row.settings ?? {},
  }
}

/** Every scene, newest project first — the left column of `/admin/3d-assets`. */
export async function fetchScenes(): Promise<SceneListItem[]> {
  await requireUser()

  const rows = await db
    .select({ scene: scenes, projectTitle: projects.title, projectSlug: projects.slug })
    .from(scenes)
    .leftJoin(projects, eq(scenes.projectId, projects.id))
    .orderBy(asc(projects.title), asc(scenes.createdAt))

  const mediaMap = await getMediaMap(
    rows.flatMap((row) => [row.scene.modelMediaId, row.scene.sourceMediaId, row.scene.depthMediaId]),
  )

  return rows.map((row) => ({
    config: toSceneConfig(row.scene, mediaMap),
    name: row.scene.name,
    projectTitle: row.projectTitle,
    projectSlug: row.projectSlug,
    updatedAt: row.scene.updatedAt,
  }))
}

/** The reconstruction queue, newest first. Polled by the jobs panel. */
export async function fetchReconJobs(limit = 60): Promise<ReconJobItem[]> {
  await requireUser()

  const rows = await db
    .select({ job: reconJobs, projectTitle: projects.title })
    .from(reconJobs)
    .leftJoin(projects, eq(reconJobs.projectId, projects.id))
    .orderBy(desc(reconJobs.createdAt))
    .limit(Math.min(Math.max(Math.trunc(limit), 1), 200))

  const mediaMap = await getMediaMap(
    rows.flatMap((row) => [
      row.job.sourceMediaId,
      row.job.result?.depthMediaId ?? null,
      row.job.result?.modelMediaId ?? null,
    ]),
  )

  return rows.map((row) => {
    const result = row.job.result ?? null
    const mode: Exclude<SceneMode, 'NONE' | 'IMAGE'> =
      row.job.mode === 'NONE' || row.job.mode === 'IMAGE' ? 'DEPTH_2_5D' : row.job.mode
    return {
      id: row.job.id,
      projectId: row.job.projectId,
      projectTitle: row.projectTitle,
      sceneId: row.job.sceneId,
      source: mediaMap.get(row.job.sourceMediaId) ?? null,
      mode,
      status: row.job.status,
      progress: row.job.progress,
      provider: row.job.provider,
      error: row.job.error,
      result,
      resultDepth: result?.depthMediaId ? (mediaMap.get(result.depthMediaId) ?? null) : null,
      resultModel: result?.modelMediaId ? (mediaMap.get(result.modelMediaId) ?? null) : null,
      createdAt: row.job.createdAt,
      startedAt: row.job.startedAt,
      finishedAt: row.job.finishedAt,
    }
  })
}

/* --------------------------------- create --------------------------------- */

export async function createScene(input: CreateSceneInput = {}): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()
  const parsed = createSceneSchema.safeParse(input)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const projectId = parsed.data.projectId ?? null
  if (projectId) {
    const owner = await db.select({ id: projects.id }).from(projects).where(eq(projects.id, projectId)).limit(1)
    if (!owner[0]) return fail('Không tìm thấy dự án.')
  }

  const inserted = await db
    .insert(scenes)
    .values({
      projectId,
      name: parsed.data.name?.trim() || null,
      mode: parsed.data.mode ?? 'NONE',
      sourceMediaId: parsed.data.sourceMediaId ?? null,
    })
    .returning({ id: scenes.id })

  const row = inserted[0]
  if (!row) return fail('Không tạo được cảnh 3D.')

  await audit(session.userId, 'scene.create', row.id, { projectId })
  await revalidateScene(projectId)
  return { ok: true, data: { id: row.id } }
}

/* --------------------------------- update --------------------------------- */

export async function updateScene(input: UpdateSceneInput): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()
  const parsed = updateSceneSchema.safeParse(input)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const value = parsed.data
  if (value.mode === 'NATIVE_GLB' && !value.modelMediaId) {
    return fail('Chế độ mô hình GLB cần một tệp .glb.')
  }
  if ((value.mode === 'DEPTH_2_5D' || value.mode === 'PROCEDURAL_3D' || value.mode === 'IMAGE') && !value.sourceMediaId) {
    return fail('Chế độ này cần một ảnh nguồn.')
  }

  const waypoints: CameraWaypoint[] = value.waypoints.map((point) => ({
    position: point.position,
    target: point.target,
    ...(point.at !== undefined ? { at: point.at } : {}),
    ...(point.fov !== undefined ? { fov: point.fov } : {}),
    ...(point.ease !== undefined && point.ease.length > 0 ? { ease: point.ease } : {}),
    ...(point.label !== undefined && point.label.length > 0 ? { label: point.label } : {}),
  }))

  const updated = await db
    .update(scenes)
    .set({
      projectId: value.projectId,
      name: value.name?.trim() || null,
      mode: value.mode,
      modelMediaId: value.modelMediaId,
      sourceMediaId: value.sourceMediaId,
      depthMediaId: value.depthMediaId,
      envPreset: value.envPreset,
      envIntensity: value.envIntensity,
      exposure: value.exposure,
      fov: value.fov,
      shadows: value.shadows,
      autoExplore: value.autoExplore,
      animationSpeed: value.animationSpeed,
      scrollSensitivity: value.scrollSensitivity,
      waypoints,
      settings: value.settings,
      updatedAt: new Date(),
    })
    .where(eq(scenes.id, value.id))
    .returning({ id: scenes.id, projectId: scenes.projectId })

  const row = updated[0]
  if (!row) return fail('Không tìm thấy cảnh 3D này.')

  await audit(session.userId, 'scene.update', row.id, { mode: value.mode })
  await revalidateScene(row.projectId)
  return { ok: true, data: { id: row.id } }
}

/* --------------------------------- delete --------------------------------- */

export async function deleteScene(sceneId: string): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()
  const parsed = id.safeParse(sceneId)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const deleted = await db
    .delete(scenes)
    .where(eq(scenes.id, parsed.data))
    .returning({ id: scenes.id, projectId: scenes.projectId })

  const row = deleted[0]
  if (!row) return fail('Không tìm thấy cảnh 3D này.')

  await audit(session.userId, 'scene.delete', row.id, null)
  await revalidateScene(row.projectId)
  return { ok: true, data: { id: row.id } }
}

/* ------------------------------ recon results ----------------------------- */

const applySchema = z.object({ jobId: id, sceneId: id.nullable().optional() })

export type ApplyReconResultInput = z.input<typeof applySchema>

/**
 * Fold a finished job's `ReconResult` into a scene and mark the job approved.
 * The target scene is the job's own scene, else the project's first scene, else
 * a new one created on the spot.
 */
export async function applyReconResult(
  input: ApplyReconResultInput,
): Promise<ActionResult<{ sceneId: string }>> {
  const session = await requireUser()
  const parsed = applySchema.safeParse(input)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const jobRows = await db.select().from(reconJobs).where(eq(reconJobs.id, parsed.data.jobId)).limit(1)
  const job = jobRows[0]
  if (!job) return fail('Không tìm thấy job.')

  const result: ReconResult | null = job.result ?? null
  if (!result) return fail('Job chưa có kết quả để áp dụng.')
  if (job.mode === 'NONE' || job.mode === 'IMAGE') return fail('Job này không tạo dữ liệu 3D.')

  const targetId = parsed.data.sceneId ?? job.sceneId ?? null
  let scene: SceneRow | undefined

  if (targetId) {
    const rows = await db.select().from(scenes).where(eq(scenes.id, targetId)).limit(1)
    scene = rows[0]
  }
  if (!scene && job.projectId) {
    const rows = await db
      .select()
      .from(scenes)
      .where(eq(scenes.projectId, job.projectId))
      .orderBy(asc(scenes.createdAt))
      .limit(1)
    scene = rows[0]
  }
  if (!scene) {
    const inserted = await db
      .insert(scenes)
      .values({ projectId: job.projectId, mode: job.mode, sourceMediaId: job.sourceMediaId })
      .returning()
    scene = inserted[0]
  }
  if (!scene) return fail('Không tạo được cảnh 3D để áp dụng kết quả.')

  const mergedSettings = { ...(scene.settings ?? {}), ...(result.suggestedSettings ?? {}) }
  const waypoints =
    result.suggestedWaypoints && result.suggestedWaypoints.length > 0
      ? result.suggestedWaypoints
      : (scene.waypoints ?? [])

  await db
    .update(scenes)
    .set({
      mode: job.mode,
      sourceMediaId: scene.sourceMediaId ?? job.sourceMediaId,
      depthMediaId: result.depthMediaId ?? scene.depthMediaId,
      modelMediaId: result.modelMediaId ?? scene.modelMediaId,
      settings: mergedSettings,
      waypoints,
      updatedAt: new Date(),
    })
    .where(eq(scenes.id, scene.id))

  await db
    .update(reconJobs)
    .set({ status: 'approved', sceneId: scene.id, progress: 1, error: null, finishedAt: job.finishedAt ?? new Date() })
    .where(eq(reconJobs.id, job.id))

  await audit(session.userId, 'scene.apply_recon', scene.id, { jobId: job.id, mode: job.mode })
  await revalidateScene(scene.projectId)
  return { ok: true, data: { sceneId: scene.id } }
}

/** Send a job back to the queue so the worker (or the run route) picks it up. */
export async function requeueReconJob(jobId: string): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()
  const parsed = id.safeParse(jobId)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const updated = await db
    .update(reconJobs)
    .set({ status: 'queued', progress: 0, error: null, startedAt: null, finishedAt: null })
    .where(eq(reconJobs.id, parsed.data))
    .returning({ id: reconJobs.id })

  if (!updated[0]) return fail('Không tìm thấy job.')
  await audit(session.userId, 'recon.requeue', parsed.data, null)
  revalidatePath('/admin/3d-assets')
  return { ok: true, data: { id: parsed.data } }
}

const rejectSchema = z.object({ jobId: id, reason: z.string().max(200).optional() })

export type RejectReconJobInput = z.input<typeof rejectSchema>

/** Refuse a result: the job is closed, the scene is left untouched. */
export async function rejectReconJob(input: RejectReconJobInput): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()
  const parsed = rejectSchema.safeParse(input)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const reason = parsed.data.reason?.trim()
  const updated = await db
    .update(reconJobs)
    .set({
      status: 'failed',
      error: reason && reason.length > 0 ? `Đã từ chối: ${reason}` : 'Đã từ chối kết quả.',
      finishedAt: new Date(),
    })
    .where(eq(reconJobs.id, parsed.data.jobId))
    .returning({ id: reconJobs.id })

  if (!updated[0]) return fail('Không tìm thấy job.')
  await audit(session.userId, 'recon.reject', parsed.data.jobId, { reason: reason ?? null })
  revalidatePath('/admin/3d-assets')
  return { ok: true, data: { id: parsed.data.jobId } }
}

/* --------------------------------- pickers -------------------------------- */

const optionsSchema = z.object({
  kinds: z.array(z.enum(['image', 'video', 'glb', 'hdri', 'texture', 'depth'])).min(1),
  search: z.string().max(120).optional(),
  limit: z.number().int().min(1).max(400).optional(),
})

export type MediaOptionsInput = z.input<typeof optionsSchema>

/**
 * Media candidates for the scene pickers. Kept here (rather than in the media
 * queries module) because the picker searches live, from the client.
 */
export async function fetchSceneMedia(input: MediaOptionsInput): Promise<MediaRef[]> {
  await requireUser()
  const parsed = optionsSchema.safeParse(input)
  if (!parsed.success) return []

  const term = parsed.data.search?.trim() ?? ''
  const limit = parsed.data.limit ?? 120

  const filters: SQL[] = [inArray(media.kind, parsed.data.kinds)]
  if (term.length > 0) {
    const like = `%${term}%`
    const match = or(
      ilike(media.alt, like),
      ilike(media.caption, like),
      ilike(media.folder, like),
      ilike(media.storageKey, like),
    )
    if (match) filters.push(match)
  }

  const rows = await db
    .select()
    .from(media)
    .where(and(...filters))
    .orderBy(desc(media.createdAt))
    .limit(limit)

  return rows.map(toMediaRef)
}
