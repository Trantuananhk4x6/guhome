'use server'

/**
 * Media library mutations.
 *
 * Every action is authenticated (`requireUser()`), validated with zod and
 * revalidates the surfaces that can show the media. Deletion is deliberately
 * conservative: a row that is still referenced by a project cover, a project
 * block, a scene, an article, a service, a material or a reconstruction job is
 * refused with a message that names the referrer.
 */

import { eq, inArray, or, sql, type SQL } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { MEDIA_WIDTHS } from '@/lib/media'
import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import {
  articles,
  auditLogs,
  materials,
  media,
  projectBlocks,
  projectMedia,
  projects,
  reconJobs,
  scenes,
  services,
  themeSettings,
  type MediaRow,
} from '@/server/db/schema'
import { storage } from '@/server/storage'

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const id = z.string().regex(UUID, 'ID không hợp lệ.')

const HAS_EXTENSION = /\.[a-z0-9]{2,5}$/i

function fail(error: string): ActionResult<never> {
  return { ok: false, error }
}

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Dữ liệu không hợp lệ.'
}

/** Best-effort audit trail; never blocks the mutation it observes. */
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
      entityType: 'media',
      entityId,
      meta: meta ?? null,
    })
  } catch (error) {
    console.error('[actions/media] audit write failed', error)
  }
}

function label(row: Pick<MediaRow, 'alt' | 'storageKey'>): string {
  const alt = row.alt?.trim()
  return alt && alt.length > 0 ? alt : row.storageKey
}

/* ------------------------------ storage keys ------------------------------ */

/**
 * Every object the pipeline could have written for this row. Images live as a
 * derivative set (`<key>-<width>.webp`); everything else is a single file whose
 * key already carries its extension.
 */
function derivativeKeys(row: Pick<MediaRow, 'storageKey' | 'kind'>): string[] {
  const key = row.storageKey.trim()
  if (key.length === 0) return []
  if (HAS_EXTENSION.test(key)) return [key]
  const rasterKinds = new Set(['image', 'depth', 'texture'])
  if (!rasterKinds.has(row.kind)) return [key]
  return MEDIA_WIDTHS.map((width) => `${key}-${width}.webp`)
}

async function removeObjects(rows: readonly MediaRow[]): Promise<void> {
  const driver = storage()
  for (const row of rows) {
    for (const key of derivativeKeys(row)) {
      try {
        await driver.delete(key)
      } catch (error) {
        // A missing or unwritable object must not strand the database row.
        console.error(`[actions/media] could not delete ${key}`, error)
      }
    }
  }
}

/* ------------------------------- references ------------------------------- */

function addHit(map: Map<string, string[]>, mediaId: string, reason: string): void {
  const existing = map.get(mediaId)
  if (existing) {
    if (!existing.includes(reason)) existing.push(reason)
    return
  }
  map.set(mediaId, [reason])
}

function quoted(value: string | null): string {
  return value && value.length > 0 ? `“${value}”` : 'không tên'
}

/**
 * Which of `ids` are still in use, and by what. One map entry per referenced
 * media id; unreferenced ids are simply absent.
 */
async function findReferences(ids: readonly string[]): Promise<Map<string, string[]>> {
  const hits = new Map<string, string[]>()
  const list = Array.from(new Set(ids))
  if (list.length === 0) return hits

  const [covers, gallery, sceneRows, articleRows, serviceRows, materialRows, jobRows] = await Promise.all([
    db
      .select({ mediaId: projects.coverMediaId, title: projects.title })
      .from(projects)
      .where(inArray(projects.coverMediaId, list)),
    db
      .select({ mediaId: projectMedia.mediaId, title: projects.title })
      .from(projectMedia)
      .innerJoin(projects, eq(projectMedia.projectId, projects.id))
      .where(inArray(projectMedia.mediaId, list)),
    db
      .select({
        model: scenes.modelMediaId,
        source: scenes.sourceMediaId,
        depth: scenes.depthMediaId,
        name: scenes.name,
        title: projects.title,
      })
      .from(scenes)
      .leftJoin(projects, eq(scenes.projectId, projects.id))
      .where(
        or(
          inArray(scenes.modelMediaId, list),
          inArray(scenes.sourceMediaId, list),
          inArray(scenes.depthMediaId, list),
        ),
      ),
    db
      .select({ mediaId: articles.coverMediaId, title: articles.title })
      .from(articles)
      .where(inArray(articles.coverMediaId, list)),
    db
      .select({ mediaId: services.coverMediaId, title: services.title })
      .from(services)
      .where(inArray(services.coverMediaId, list)),
    db
      .select({ mediaId: materials.mediaId, name: materials.name })
      .from(materials)
      .where(inArray(materials.mediaId, list)),
    db
      .select({ mediaId: reconJobs.sourceMediaId, status: reconJobs.status })
      .from(reconJobs)
      .where(inArray(reconJobs.sourceMediaId, list)),
  ])

  for (const row of covers) {
    if (row.mediaId) addHit(hits, row.mediaId, `ảnh bìa dự án ${quoted(row.title)}`)
  }
  for (const row of gallery) {
    addHit(hits, row.mediaId, `thư viện dự án ${quoted(row.title)}`)
  }
  for (const row of sceneRows) {
    const owner = row.title ?? row.name
    for (const value of [row.model, row.source, row.depth]) {
      if (value && list.includes(value)) addHit(hits, value, `cảnh 3D của ${quoted(owner)}`)
    }
  }
  for (const row of articleRows) {
    if (row.mediaId) addHit(hits, row.mediaId, `bài viết ${quoted(row.title)}`)
  }
  for (const row of serviceRows) {
    if (row.mediaId) addHit(hits, row.mediaId, `dịch vụ ${quoted(row.title)}`)
  }
  for (const row of materialRows) {
    if (row.mediaId) addHit(hits, row.mediaId, `vật liệu ${quoted(row.name)}`)
  }
  for (const row of jobRows) {
    addHit(hits, row.mediaId, `job dựng 3D (${row.status})`)
  }

  // JSONB references: project blocks and the brand logo / favicon.
  const likeBlocks: SQL[] = list.map((value) => sql`${projectBlocks.data}::text like ${`%${value}%`}`)
  const blockRows = await db
    .select({ data: projectBlocks.data, type: projectBlocks.type, title: projects.title })
    .from(projectBlocks)
    .innerJoin(projects, eq(projectBlocks.projectId, projects.id))
    .where(or(...likeBlocks))

  for (const row of blockRows) {
    const serialised = JSON.stringify(row.data)
    for (const value of list) {
      if (serialised.includes(value)) addHit(hits, value, `khối ${row.type} của dự án ${quoted(row.title)}`)
    }
  }

  const likeBrand: SQL[] = list.map((value) => sql`${themeSettings.brand}::text like ${`%${value}%`}`)
  const brandRows = await db
    .select({ brand: themeSettings.brand })
    .from(themeSettings)
    .where(or(...likeBrand))

  for (const row of brandRows) {
    const serialised = JSON.stringify(row.brand)
    for (const value of list) {
      if (serialised.includes(value)) addHit(hits, value, 'nhận diện thương hiệu (logo / favicon)')
    }
  }

  return hits
}

function referenceMessage(row: MediaRow, reasons: readonly string[]): string {
  const shown = reasons.slice(0, 3).join(', ')
  const rest = reasons.length > 3 ? ` và ${reasons.length - 3} nơi khác` : ''
  return `Không thể xoá ${quoted(label(row))} — đang được dùng ở ${shown}${rest}. Gỡ liên kết trước rồi thử lại.`
}

/* --------------------------------- update --------------------------------- */

const updateMediaSchema = z.object({
  id,
  alt: z.string().max(240, 'Alt tối đa 240 ký tự.').nullable().optional(),
  caption: z.string().max(400, 'Chú thích tối đa 400 ký tự.').nullable().optional(),
})

export type UpdateMediaInput = z.input<typeof updateMediaSchema>

function trimmed(value: string | null | undefined): string | null | undefined {
  if (value === undefined) return undefined
  if (value === null) return null
  const clean = value.trim()
  return clean.length === 0 ? null : clean
}

/** Edit the editorial fields of one media row. */
export async function updateMedia(input: UpdateMediaInput): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()
  const parsed = updateMediaSchema.safeParse(input)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const patch: { alt?: string | null; caption?: string | null } = {}
  const alt = trimmed(parsed.data.alt)
  const caption = trimmed(parsed.data.caption)
  if (alt !== undefined) patch.alt = alt
  if (caption !== undefined) patch.caption = caption
  if (Object.keys(patch).length === 0) return { ok: true, data: { id: parsed.data.id } }

  const updated = await db
    .update(media)
    .set(patch)
    .where(eq(media.id, parsed.data.id))
    .returning({ id: media.id })

  if (!updated[0]) return fail('Không tìm thấy tệp này trong thư viện.')

  await audit(session.userId, 'media.update', parsed.data.id, patch)
  revalidatePath('/admin/media')
  return { ok: true, data: { id: parsed.data.id } }
}

/* --------------------------------- delete --------------------------------- */

export interface BulkDeleteReport {
  deleted: string[]
  blocked: { id: string; label: string; reason: string }[]
}

async function removeMany(ids: readonly string[], userId: string): Promise<BulkDeleteReport> {
  const rows = await db.select().from(media).where(inArray(media.id, Array.from(new Set(ids))))
  if (rows.length === 0) return { deleted: [], blocked: [] }

  const references = await findReferences(rows.map((row) => row.id))

  const removable: MediaRow[] = []
  const blocked: BulkDeleteReport['blocked'] = []

  for (const row of rows) {
    const reasons = references.get(row.id)
    if (reasons && reasons.length > 0) {
      blocked.push({ id: row.id, label: label(row), reason: referenceMessage(row, reasons) })
    } else {
      removable.push(row)
    }
  }

  if (removable.length > 0) {
    await removeObjects(removable)
    await db.delete(media).where(
      inArray(
        media.id,
        removable.map((row) => row.id),
      ),
    )
    await audit(userId, 'media.delete', removable[0]?.id ?? null, {
      count: removable.length,
      keys: removable.map((row) => row.storageKey),
    })
    revalidatePath('/admin/media')
    revalidatePath('/admin/3d-assets')
  }

  return { deleted: removable.map((row) => row.id), blocked }
}

/** Delete one media row and every derivative it owns. */
export async function deleteMedia(mediaId: string): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()
  const parsed = id.safeParse(mediaId)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const report = await removeMany([parsed.data], session.userId)
  const blocked = report.blocked[0]
  if (blocked) return fail(blocked.reason)
  if (report.deleted.length === 0) return fail('Không tìm thấy tệp này trong thư viện.')

  return { ok: true, data: { id: parsed.data } }
}

const bulkSchema = z.object({
  ids: z.array(id).min(1, 'Chưa chọn tệp nào.').max(200, 'Mỗi lần xoá tối đa 200 tệp.'),
})

/** Delete many rows at once; referenced rows are reported, not removed. */
export async function bulkDelete(ids: readonly string[]): Promise<ActionResult<BulkDeleteReport>> {
  const session = await requireUser()
  const parsed = bulkSchema.safeParse({ ids })
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const report = await removeMany(parsed.data.ids, session.userId)
  return { ok: true, data: report }
}

/* ------------------------------ project cover ----------------------------- */

const coverSchema = z.object({ projectId: id, mediaId: id })

export type SetProjectCoverInput = z.input<typeof coverSchema>

/** Point a project's cover at this media row. */
export async function setProjectCover(input: SetProjectCoverInput): Promise<ActionResult<{ slug: string }>> {
  const session = await requireUser()
  const parsed = coverSchema.safeParse(input)
  if (!parsed.success) return fail(firstIssue(parsed.error))

  const mediaRows = await db
    .select({ id: media.id, kind: media.kind })
    .from(media)
    .where(eq(media.id, parsed.data.mediaId))
    .limit(1)
  const mediaRow = mediaRows[0]
  if (!mediaRow) return fail('Không tìm thấy tệp này trong thư viện.')
  if (mediaRow.kind !== 'image') return fail('Ảnh bìa phải là một tấm ảnh.')

  const updated = await db
    .update(projects)
    .set({ coverMediaId: parsed.data.mediaId, updatedAt: new Date() })
    .where(eq(projects.id, parsed.data.projectId))
    .returning({ slug: projects.slug, title: projects.title })

  const project = updated[0]
  if (!project) return fail('Không tìm thấy dự án.')

  await audit(session.userId, 'media.set_cover', parsed.data.mediaId, {
    projectId: parsed.data.projectId,
    slug: project.slug,
  })

  revalidatePath('/admin/media')
  revalidatePath(`/admin/projects/${parsed.data.projectId}`)
  revalidatePath('/projects')
  revalidatePath(`/projects/${project.slug}`)
  revalidatePath('/')

  return { ok: true, data: { slug: project.slug } }
}
