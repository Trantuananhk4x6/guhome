'use server'

/**
 * Project server actions — the write path behind the admin project screens.
 *
 * House rules, applied by every action in this file:
 *   1. `requireUser()` first, always.
 *   2. Zod-validated input; failures come back as `{ ok: false, fieldErrors }`,
 *      never as thrown errors the UI has to guess about.
 *   3. Mutations write a `revisions` row (what was saved) and an `audit_logs`
 *      row (who did it), and neither may break the mutation if it fails.
 *   4. `revalidatePath` for every public route the change can be seen on.
 */

import { and, asc, desc, eq, ilike, inArray, or, sql, type SQL } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import type { StyleOption } from '@/components/admin/project/contracts'
import { toMediaRef } from '@/lib/media'
import { slugify } from '@/lib/utils'
import { setProjectStyles } from '@/server/actions/styles'
import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import {
  auditLogs,
  media,
  projectBlocks,
  projectMedia,
  projects,
  revisions,
  type ProjectRow,
} from '@/server/db/schema'
import { getPublishedStyles } from '@/server/queries/styles'
import type { MediaKind, MediaRef, ProjectBlockType, PublishStatus } from '@/types/content'

/* ------------------------------- result shape ------------------------------ */

export type ActionResult<T = null> =
  | { ok: true; data: T; error?: undefined; fieldErrors?: undefined }
  | { ok: false; error: string; fieldErrors?: Record<string, string>; data?: undefined }

export interface ProjectSaveResult {
  id: string
  slug: string
  status: PublishStatus
}

/* --------------------------------- helpers --------------------------------- */

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const UUID_PATTERN = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value)
}

/** jsonb columns are `Record<string, unknown>`; zod hands back precise shapes. */
function asJson(value: object): Record<string, unknown> {
  return value as Record<string, unknown>
}

interface IssueLike {
  path: readonly PropertyKey[]
  message: string
}

function fieldErrorsOf(issues: readonly IssueLike[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of issues) {
    const key = issue.path.map((part) => String(part)).join('.')
    const name = key.length > 0 ? key : '_'
    if (!(name in out)) out[name] = issue.message
  }
  return out
}

function invalid(issues: readonly IssueLike[], message = 'Dữ liệu chưa hợp lệ.'): ActionResult<never> {
  return { ok: false, error: message, fieldErrors: fieldErrorsOf(issues) }
}

function failure(message: string): ActionResult<never> {
  return { ok: false, error: message }
}

function emptyToNull(value: string | undefined | null): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

async function writeAudit(entry: {
  userId: string
  action: string
  entityId?: string | null
  meta?: Record<string, unknown>
}): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId: entry.userId,
      action: entry.action,
      entityType: 'project',
      entityId: entry.entityId ?? null,
      meta: entry.meta ?? null,
    })
  } catch (error) {
    console.error('[actions/projects] audit write failed', error)
  }
}

async function writeRevision(entry: {
  userId: string
  entityId: string
  entityType?: string
  data: Record<string, unknown>
  note: string
}): Promise<void> {
  try {
    await db.insert(revisions).values({
      entityType: entry.entityType ?? 'project',
      entityId: entry.entityId,
      data: entry.data,
      note: entry.note,
      createdBy: entry.userId,
    })
  } catch (error) {
    console.error('[actions/projects] revision write failed', error)
  }
}

/** Public surfaces a project change is visible on, plus the admin list. */
function revalidateProject(...slugs: readonly (string | null | undefined)[]): void {
  revalidatePath('/')
  revalidatePath('/projects')
  for (const slug of slugs) {
    if (slug) revalidatePath(`/projects/${slug}`)
  }
  revalidatePath('/admin')
  revalidatePath('/admin/projects')
}

/**
 * Writes the style taxonomy links for a project that has just been saved.
 *
 * The join table belongs to `actions/styles`, so this delegates rather than
 * touching `project_styles` itself — one place decides what a valid attachment
 * is. `undefined` means the form never loaded the attachments and must not be
 * allowed to clear them.
 */
async function attachStyles(projectId: string, styleIds: readonly string[] | undefined): Promise<string | null> {
  if (!styleIds) return null
  const result = await setProjectStyles(projectId, [...styleIds])
  if (result.ok) return null
  return result.error
}

/** First free slug of the form `base`, `base-2`, `base-3`… */
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base) || 'du-an'
  let candidate = root
  for (let attempt = 2; attempt <= 60; attempt++) {
    const rows = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.slug, candidate))
      .limit(1)
    const clash = rows[0]
    if (!clash || clash.id === excludeId) return candidate
    candidate = `${root}-${attempt}`
  }
  return `${root}-${Date.now().toString(36)}`
}

function projectSnapshot(row: ProjectRow): Record<string, unknown> {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    summary: row.summary,
    description: row.description,
    categoryId: row.categoryId,
    coverMediaId: row.coverMediaId,
    status: row.status,
    featured: row.featured,
    order: row.order,
    location: row.location,
    area: row.area,
    year: row.year,
    client: row.client,
    duration: row.duration,
    style: row.style,
    services: row.services,
    seo: row.seo ?? null,
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
  }
}

/* ------------------------------- input schemas ------------------------------ */

const trimmed = (max: number) => z.string().trim().max(max)

const projectFormSchema = z
  .object({
    title: z.string().trim().min(2, 'Tên dự án cần ít nhất 2 ký tự.').max(160, 'Tên dự án quá dài.'),
    slug: trimmed(90).default(''),
    subtitle: trimmed(200).default(''),
    summary: trimmed(1600).default(''),
    description: trimmed(24000).default(''),
    categoryId: trimmed(64).default(''),
    coverMediaId: z.string().trim().max(64).nullable().default(null),
    location: trimmed(160).default(''),
    area: trimmed(80).default(''),
    year: trimmed(8).default(''),
    client: trimmed(160).default(''),
    duration: trimmed(80).default(''),
    style: trimmed(120).default(''),
    services: z.array(z.string().trim().min(1).max(80)).max(24).default([]),
    // Left optional on purpose: a form that never loaded the attachments (the
    // create form, an older client) sends nothing and the join table is not
    // touched. An array — empty included — is taken as the whole truth.
    styleIds: z.array(z.string().trim().max(64)).max(24, 'Tối đa 24 phong cách cho một dự án.').optional(),
    featured: z.boolean().default(false),
    status: z.enum(['draft', 'published', 'archived']),
    seoTitle: trimmed(180).default(''),
    seoDescription: trimmed(320).default(''),
    order: z.number().int().min(0).max(9999).default(0),
  })
  .superRefine((value, ctx) => {
    if (value.slug.length > 0 && !SLUG_PATTERN.test(value.slug)) {
      ctx.addIssue({
        code: 'custom',
        path: ['slug'],
        message: 'Slug chỉ gồm chữ thường, số và dấu gạch ngang.',
      })
    }
    if (value.categoryId.length > 0 && !isUuid(value.categoryId)) {
      ctx.addIssue({ code: 'custom', path: ['categoryId'], message: 'Danh mục không hợp lệ.' })
    }
    if (value.coverMediaId && value.coverMediaId.length > 0 && !isUuid(value.coverMediaId)) {
      ctx.addIssue({ code: 'custom', path: ['coverMediaId'], message: 'Ảnh bìa không hợp lệ.' })
    }
    if (value.styleIds) {
      value.styleIds.forEach((styleId, index) => {
        if (!isUuid(styleId)) {
          ctx.addIssue({ code: 'custom', path: ['styleIds', index], message: 'Phong cách không hợp lệ.' })
        }
      })
    }
    if (value.year.length > 0) {
      const year = Number(value.year)
      if (!/^\d{4}$/.test(value.year) || year < 1900 || year > 2100) {
        ctx.addIssue({ code: 'custom', path: ['year'], message: 'Năm phải là 4 chữ số từ 1900 đến 2100.' })
      }
    }
  })

export type ProjectFormInput = z.input<typeof projectFormSchema>

const idSchema = z.string().trim().refine(isUuid, 'Mã không hợp lệ.')

/* -------------------------------- block input ------------------------------- */

const BLOCK_TYPES = [
  'HERO',
  'SCENE_3D',
  'IMAGE',
  'GALLERY',
  'MASONRY',
  'VIDEO',
  'TEXT',
  'QUOTE',
  'MATERIALS',
  'BEFORE_AFTER',
  'PROJECT_INFO',
  'RELATED',
  'CTA',
] as const

const nullableId = z
  .union([z.string().trim(), z.null(), z.undefined()])
  .transform((value) => (typeof value === 'string' && value.length > 0 ? value : null))

const idList = z.array(z.string().trim().min(1).max(64)).max(80).default([])
const optionalText = (max: number) => z.string().trim().max(max).optional()
const columnsSchema = z.union([z.literal(2), z.literal(3), z.literal(4)]).optional()
const revealSchema = z
  .enum(['revealUp', 'revealLeft', 'revealRight', 'revealScale', 'revealClip', 'revealParallax'])
  .optional()

/**
 * One schema per `ProjectBlockType`, mirroring the `ProjectBlock` union in
 * `@/types/content`. `data` is jsonb, so this is the only thing standing between
 * the editor and malformed block payloads on the public site.
 */
const BLOCK_DATA_SCHEMAS = {
  HERO: z.object({
    mediaId: nullableId,
    eyebrow: optionalText(120),
    title: optionalText(200),
    fullBleed: z.boolean().optional(),
  }),
  SCENE_3D: z.object({
    sceneId: nullableId,
    height: z.enum(['screen', 'tall']).optional(),
    label: optionalText(120),
  }),
  IMAGE: z.object({
    mediaId: nullableId,
    caption: optionalText(240),
    width: z.enum(['full', 'wide', 'narrow']).optional(),
    reveal: revealSchema,
  }),
  GALLERY: z.object({ mediaIds: idList, columns: columnsSchema, caption: optionalText(240) }),
  MASONRY: z.object({ mediaIds: idList, columns: columnsSchema }),
  VIDEO: z.object({
    mediaId: nullableId,
    poster: nullableId,
    loop: z.boolean().optional(),
    caption: optionalText(240),
  }),
  TEXT: z.object({
    heading: optionalText(200),
    body: z.string().trim().max(12000).default(''),
    align: z.enum(['left', 'center']).optional(),
    width: z.enum(['narrow', 'wide']).optional(),
  }),
  QUOTE: z.object({ quote: z.string().trim().max(1200).default(''), attribution: optionalText(160) }),
  MATERIALS: z.object({ materialIds: idList, heading: optionalText(200) }),
  BEFORE_AFTER: z.object({
    beforeMediaId: nullableId,
    afterMediaId: nullableId,
    label: optionalText(160),
  }),
  PROJECT_INFO: z.object({ showServices: z.boolean().optional(), note: optionalText(400) }),
  RELATED: z.object({ projectIds: idList, heading: optionalText(200) }),
  CTA: z.object({
    heading: optionalText(200),
    body: optionalText(600),
    buttonLabel: optionalText(80),
    href: optionalText(300),
  }),
}

const blockEnvelopeSchema = z.object({
  id: z.string().trim().max(64).optional(),
  type: z.enum(BLOCK_TYPES),
  enabled: z.boolean().default(true),
  data: z.unknown().optional(),
})

const saveBlocksSchema = z.object({
  projectId: idSchema,
  blocks: z.array(blockEnvelopeSchema).max(80, 'Tối đa 80 khối cho mỗi dự án.'),
})

function parseBlockData(
  type: ProjectBlockType,
  raw: unknown,
): { ok: true; data: Record<string, unknown> } | { ok: false; message: string } {
  const parsed = BLOCK_DATA_SCHEMAS[type].safeParse(raw ?? {})
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return {
      ok: false,
      message: first ? `${first.path.map(String).join('.')}: ${first.message}` : 'Dữ liệu khối không hợp lệ.',
    }
  }
  return { ok: true, data: asJson(parsed.data) }
}

/* --------------------------------- create ---------------------------------- */

export async function createProject(input: ProjectFormInput): Promise<ActionResult<ProjectSaveResult>> {
  const session = await requireUser()

  const parsed = projectFormSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const value = parsed.data

  const slug = await uniqueSlug(value.slug.length > 0 ? value.slug : value.title)
  const now = new Date()

  const inserted = await db
    .insert(projects)
    .values({
      slug,
      title: value.title,
      subtitle: emptyToNull(value.subtitle),
      summary: emptyToNull(value.summary),
      description: emptyToNull(value.description),
      categoryId: emptyToNull(value.categoryId),
      coverMediaId: emptyToNull(value.coverMediaId),
      status: value.status,
      featured: value.featured,
      order: value.order,
      location: emptyToNull(value.location),
      area: emptyToNull(value.area),
      year: value.year.length > 0 ? Number(value.year) : null,
      client: emptyToNull(value.client),
      duration: emptyToNull(value.duration),
      style: emptyToNull(value.style),
      services: value.services,
      seo: {
        title: emptyToNull(value.seoTitle) ?? undefined,
        description: emptyToNull(value.seoDescription) ?? undefined,
      },
      publishedAt: value.status === 'published' ? now : null,
      createdAt: now,
      updatedAt: now,
    })
    .returning()

  const row = inserted[0]
  if (!row) return failure('Không tạo được dự án.')

  const styleError = await attachStyles(row.id, value.styleIds)

  await writeRevision({
    userId: session.userId,
    entityId: row.id,
    data: projectSnapshot(row),
    note: 'Tạo dự án',
  })
  await writeAudit({
    userId: session.userId,
    action: 'project.create',
    entityId: row.id,
    meta: { slug: row.slug, title: row.title, status: row.status },
  })

  revalidateProject(row.slug)
  // The row is already in: report the attachment failure rather than the whole
  // save, so the editor retries the styles instead of creating a second project.
  if (styleError) return failure(`Đã tạo dự án nhưng chưa gán được phong cách. ${styleError}`)
  return { ok: true, data: { id: row.id, slug: row.slug, status: row.status } }
}

/* --------------------------------- update ---------------------------------- */

const updateProjectSchema = z.object({ id: idSchema })

export async function updateProject(
  input: ProjectFormInput & { id: string },
): Promise<ActionResult<ProjectSaveResult>> {
  const session = await requireUser()

  const idParsed = updateProjectSchema.safeParse({ id: input.id })
  if (!idParsed.success) return invalid(idParsed.error.issues)

  const parsed = projectFormSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const value = parsed.data

  const existingRows = await db.select().from(projects).where(eq(projects.id, idParsed.data.id)).limit(1)
  const existing = existingRows[0]
  if (!existing) return failure('Dự án không tồn tại.')

  const slug = await uniqueSlug(value.slug.length > 0 ? value.slug : value.title, existing.id)
  const now = new Date()
  // Publishing stamps a date once; unpublishing keeps it so re-publishing does
  // not reshuffle the public ordering.
  const publishedAt =
    value.status === 'published' ? (existing.publishedAt ?? now) : existing.publishedAt

  const updated = await db
    .update(projects)
    .set({
      slug,
      title: value.title,
      subtitle: emptyToNull(value.subtitle),
      summary: emptyToNull(value.summary),
      description: emptyToNull(value.description),
      categoryId: emptyToNull(value.categoryId),
      coverMediaId: emptyToNull(value.coverMediaId),
      status: value.status,
      featured: value.featured,
      order: value.order,
      location: emptyToNull(value.location),
      area: emptyToNull(value.area),
      year: value.year.length > 0 ? Number(value.year) : null,
      client: emptyToNull(value.client),
      duration: emptyToNull(value.duration),
      style: emptyToNull(value.style),
      services: value.services,
      seo: {
        title: emptyToNull(value.seoTitle) ?? undefined,
        description: emptyToNull(value.seoDescription) ?? undefined,
      },
      publishedAt,
      updatedAt: now,
    })
    .where(eq(projects.id, existing.id))
    .returning()

  const row = updated[0]
  if (!row) return failure('Không lưu được dự án.')

  const styleError = await attachStyles(row.id, value.styleIds)

  await writeRevision({
    userId: session.userId,
    entityId: row.id,
    data: projectSnapshot(row),
    note: 'Cập nhật dự án',
  })
  await writeAudit({
    userId: session.userId,
    action: 'project.update',
    entityId: row.id,
    meta: { slug: row.slug, title: row.title, status: row.status, previousSlug: existing.slug },
  })

  revalidateProject(row.slug, existing.slug)
  revalidatePath(`/admin/projects/${row.id}`)
  if (styleError) return failure(`Đã lưu dự án nhưng chưa gán được phong cách. ${styleError}`)
  return { ok: true, data: { id: row.id, slug: row.slug, status: row.status } }
}

/* --------------------------------- delete ---------------------------------- */

export async function deleteProject(input: { id: string }): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()

  const parsed = updateProjectSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)

  const rows = await db.select().from(projects).where(eq(projects.id, parsed.data.id)).limit(1)
  const existing = rows[0]
  if (!existing) return failure('Dự án không tồn tại.')

  // Blocks, media links and scenes cascade from the schema.
  await db.delete(projects).where(eq(projects.id, existing.id))

  await writeRevision({
    userId: session.userId,
    entityId: existing.id,
    data: projectSnapshot(existing),
    note: 'Xoá dự án',
  })
  await writeAudit({
    userId: session.userId,
    action: 'project.delete',
    entityId: existing.id,
    meta: { slug: existing.slug, title: existing.title },
  })

  revalidateProject(existing.slug)
  return { ok: true, data: { id: existing.id } }
}

/* -------------------------------- duplicate -------------------------------- */

export async function duplicateProject(input: { id: string }): Promise<ActionResult<ProjectSaveResult>> {
  const session = await requireUser()

  const parsed = updateProjectSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)

  const rows = await db.select().from(projects).where(eq(projects.id, parsed.data.id)).limit(1)
  const source = rows[0]
  if (!source) return failure('Dự án không tồn tại.')

  const slug = await uniqueSlug(`${source.slug}-ban-sao`)
  const now = new Date()

  const inserted = await db
    .insert(projects)
    .values({
      slug,
      title: `${source.title} (bản sao)`,
      subtitle: source.subtitle,
      summary: source.summary,
      description: source.description,
      categoryId: source.categoryId,
      coverMediaId: source.coverMediaId,
      // A copy is never live and never featured until an editor says so.
      status: 'draft',
      featured: false,
      order: source.order,
      location: source.location,
      area: source.area,
      year: source.year,
      client: source.client,
      duration: source.duration,
      style: source.style,
      services: source.services,
      seo: source.seo ?? null,
      publishedAt: null,
      createdAt: now,
      updatedAt: now,
    })
    .returning()

  const copy = inserted[0]
  if (!copy) return failure('Không nhân bản được dự án.')

  const [sourceBlocks, sourceMedia] = await Promise.all([
    db
      .select()
      .from(projectBlocks)
      .where(eq(projectBlocks.projectId, source.id))
      .orderBy(asc(projectBlocks.order)),
    db
      .select()
      .from(projectMedia)
      .where(eq(projectMedia.projectId, source.id))
      .orderBy(asc(projectMedia.order)),
  ])

  if (sourceBlocks.length > 0) {
    await db.insert(projectBlocks).values(
      sourceBlocks.map((block, index) => ({
        projectId: copy.id,
        type: block.type,
        order: index,
        enabled: block.enabled,
        data: block.data,
      })),
    )
  }

  if (sourceMedia.length > 0) {
    await db.insert(projectMedia).values(
      sourceMedia.map((link, index) => ({
        projectId: copy.id,
        mediaId: link.mediaId,
        role: link.role,
        order: link.order ?? index,
      })),
    )
  }

  await writeAudit({
    userId: session.userId,
    action: 'project.duplicate',
    entityId: copy.id,
    meta: { sourceId: source.id, sourceSlug: source.slug, slug: copy.slug },
  })

  revalidateProject(copy.slug)
  return { ok: true, data: { id: copy.id, slug: copy.slug, status: copy.status } }
}

/* ------------------------------ toggle featured ----------------------------- */

const toggleFeaturedSchema = z.object({ id: idSchema, featured: z.boolean() })

export async function toggleFeatured(input: {
  id: string
  featured: boolean
}): Promise<ActionResult<{ id: string; featured: boolean }>> {
  const session = await requireUser()

  const parsed = toggleFeaturedSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)

  const updated = await db
    .update(projects)
    .set({ featured: parsed.data.featured, updatedAt: new Date() })
    .where(eq(projects.id, parsed.data.id))
    .returning({ id: projects.id, slug: projects.slug, featured: projects.featured })

  const row = updated[0]
  if (!row) return failure('Dự án không tồn tại.')

  await writeAudit({
    userId: session.userId,
    action: 'project.toggle_featured',
    entityId: row.id,
    meta: { featured: row.featured, slug: row.slug },
  })

  revalidateProject(row.slug)
  return { ok: true, data: { id: row.id, featured: row.featured } }
}

/* -------------------------------- save blocks ------------------------------- */

export interface SaveBlocksInput {
  projectId: string
  blocks: {
    id?: string
    type: ProjectBlockType
    enabled?: boolean
    data?: unknown
  }[]
}

/**
 * Whole-array replace. Order is taken from the array position, never from a
 * client-supplied number, and the delete + insert run in one batch so a project
 * is never left with a half-written block list.
 */
export async function saveBlocks(input: SaveBlocksInput): Promise<ActionResult<{ count: number }>> {
  const session = await requireUser()

  const parsed = saveBlocksSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)

  const projectRows = await db
    .select({ id: projects.id, slug: projects.slug })
    .from(projects)
    .where(eq(projects.id, parsed.data.projectId))
    .limit(1)
  const project = projectRows[0]
  if (!project) return failure('Dự án không tồn tại.')

  const rows: {
    id?: string
    projectId: string
    type: ProjectBlockType
    order: number
    enabled: boolean
    data: Record<string, unknown>
  }[] = []

  for (const [index, block] of parsed.data.blocks.entries()) {
    const data = parseBlockData(block.type, block.data)
    if (!data.ok) {
      return {
        ok: false,
        error: `Khối ${index + 1} (${block.type}) chưa hợp lệ: ${data.message}`,
        fieldErrors: { [`blocks.${index}`]: data.message },
      }
    }
    rows.push({
      // Ids minted by the editor are kept so the client list stays stable.
      ...(block.id && isUuid(block.id) ? { id: block.id } : {}),
      projectId: project.id,
      type: block.type,
      order: index,
      enabled: block.enabled ?? true,
      data: data.data,
    })
  }

  const clear = db.delete(projectBlocks).where(eq(projectBlocks.projectId, project.id))
  if (rows.length > 0) {
    await db.batch([clear, db.insert(projectBlocks).values(rows)])
  } else {
    await clear
  }

  await db.update(projects).set({ updatedAt: new Date() }).where(eq(projects.id, project.id))

  await writeRevision({
    userId: session.userId,
    entityId: project.id,
    entityType: 'project_blocks',
    data: { blocks: rows.map(({ type, order, enabled, data }) => ({ type, order, enabled, data })) },
    note: 'Lưu bố cục khối',
  })
  await writeAudit({
    userId: session.userId,
    action: 'project.save_blocks',
    entityId: project.id,
    meta: { count: rows.length, slug: project.slug },
  })

  revalidateProject(project.slug)
  revalidatePath(`/admin/projects/${project.id}`)
  return { ok: true, data: { count: rows.length } }
}

/* ---------------------------------- media ---------------------------------- */

const MEDIA_ROLES = ['cover', 'hero', 'gallery', 'before', 'after'] as const
const roleSchema = z.enum(MEDIA_ROLES)

const listMediaSchema = z.object({
  projectId: z.string().trim().nullable().default(null),
  /** `project` = only rows attached to this project, `library` = everything. */
  scope: z.enum(['project', 'library']).default('project'),
  search: z.string().trim().max(120).default(''),
  kind: z.enum(['image', 'video', 'glb', 'hdri', 'texture', 'depth']).optional(),
  limit: z.number().int().min(1).max(300).default(180),
})

export interface ListProjectMediaInput {
  projectId: string | null
  scope?: 'project' | 'library'
  search?: string
  kind?: MediaKind
  limit?: number
}

/**
 * Rows for the media picker. Project scope resolves through `project_media` so
 * an editor sees this project's photographs first; library scope is the escape
 * hatch for covers, textures and GLB files that live outside the set.
 */
export async function listProjectMedia(
  input: ListProjectMediaInput,
): Promise<ActionResult<{ items: MediaRef[] }>> {
  await requireUser()

  const parsed = listMediaSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const { projectId, scope, search, kind, limit } = parsed.data

  const searchFilter: SQL | undefined =
    search.length > 0
      ? or(
          ilike(media.alt, `%${search}%`),
          ilike(media.caption, `%${search}%`),
          ilike(media.folder, `%${search}%`),
          ilike(media.storageKey, `%${search}%`),
        )
      : undefined
  const kindFilter: SQL | undefined = kind ? eq(media.kind, kind) : undefined

  if (scope === 'project' && projectId && isUuid(projectId)) {
    const filters: SQL[] = [eq(projectMedia.projectId, projectId)]
    if (searchFilter) filters.push(searchFilter)
    if (kindFilter) filters.push(kindFilter)

    const rows = await db
      .select({ media, order: projectMedia.order })
      .from(projectMedia)
      .innerJoin(media, eq(projectMedia.mediaId, media.id))
      .where(and(...filters))
      .orderBy(asc(projectMedia.order), asc(media.storageKey))
      .limit(limit)

    const seen = new Set<string>()
    const items: MediaRef[] = []
    for (const row of rows) {
      if (seen.has(row.media.id)) continue
      seen.add(row.media.id)
      items.push(toMediaRef(row.media))
    }
    return { ok: true, data: { items } }
  }

  const libraryFilters: SQL[] = []
  if (searchFilter) libraryFilters.push(searchFilter)
  if (kindFilter) libraryFilters.push(kindFilter)

  const rows = await db
    .select()
    .from(media)
    .where(libraryFilters.length > 0 ? and(...libraryFilters) : undefined)
    .orderBy(desc(media.createdAt), asc(media.storageKey))
    .limit(limit)

  return { ok: true, data: { items: rows.map(toMediaRef) } }
}

const attachSchema = z.object({
  projectId: idSchema,
  mediaIds: z.array(idSchema).min(1, 'Chưa chọn media.').max(80),
  role: roleSchema.default('gallery'),
})

export async function attachMedia(input: {
  projectId: string
  mediaIds: string[]
  role?: (typeof MEDIA_ROLES)[number]
}): Promise<ActionResult<{ attached: number }>> {
  const session = await requireUser()

  const parsed = attachSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const { projectId, mediaIds, role } = parsed.data

  const projectRows = await db
    .select({ id: projects.id, slug: projects.slug })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)
  const project = projectRows[0]
  if (!project) return failure('Dự án không tồn tại.')

  const maxRows = await db
    .select({ value: sql<number>`coalesce(max(${projectMedia.order}), -1)` })
    .from(projectMedia)
    .where(eq(projectMedia.projectId, projectId))
  const start = Number(maxRows[0]?.value ?? -1) + 1

  await db
    .insert(projectMedia)
    .values(
      mediaIds.map((mediaId, index) => ({
        projectId,
        mediaId,
        role,
        order: start + index,
      })),
    )
    .onConflictDoNothing()

  await writeAudit({
    userId: session.userId,
    action: 'project.attach_media',
    entityId: projectId,
    meta: { role, count: mediaIds.length },
  })

  revalidateProject(project.slug)
  return { ok: true, data: { attached: mediaIds.length } }
}

const detachSchema = z.object({
  projectId: idSchema,
  mediaId: idSchema,
  role: roleSchema.optional(),
})

export async function detachMedia(input: {
  projectId: string
  mediaId: string
  role?: (typeof MEDIA_ROLES)[number]
}): Promise<ActionResult<{ mediaId: string }>> {
  const session = await requireUser()

  const parsed = detachSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const { projectId, mediaId, role } = parsed.data

  const filters: SQL[] = [eq(projectMedia.projectId, projectId), eq(projectMedia.mediaId, mediaId)]
  if (role) filters.push(eq(projectMedia.role, role))

  await db.delete(projectMedia).where(and(...filters))

  const projectRows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)

  await writeAudit({
    userId: session.userId,
    action: 'project.detach_media',
    entityId: projectId,
    meta: { mediaId, role: role ?? null },
  })

  revalidateProject(projectRows[0]?.slug)
  return { ok: true, data: { mediaId } }
}

const reorderSchema = z.object({
  projectId: idSchema,
  mediaIds: z.array(idSchema).max(200),
})

/**
 * Reorders the gallery in one statement: a CASE expression assigns each id its
 * index, so there is no window where the order is half-applied.
 */
export async function reorderMedia(input: {
  projectId: string
  mediaIds: string[]
}): Promise<ActionResult<{ count: number }>> {
  const session = await requireUser()

  const parsed = reorderSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const { projectId, mediaIds } = parsed.data

  if (mediaIds.length === 0) return { ok: true, data: { count: 0 } }

  const chunks: SQL[] = [sql`(case`]
  mediaIds.forEach((mediaId, index) => {
    chunks.push(sql`when ${projectMedia.mediaId} = ${mediaId}::uuid then ${sql.raw(String(index))}`)
  })
  chunks.push(sql`else ${projectMedia.order} end)`)

  await db
    .update(projectMedia)
    .set({ order: sql.join(chunks, sql` `) })
    .where(and(eq(projectMedia.projectId, projectId), inArray(projectMedia.mediaId, mediaIds)))

  const projectRows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)

  await writeAudit({
    userId: session.userId,
    action: 'project.reorder_media',
    entityId: projectId,
    meta: { count: mediaIds.length },
  })

  revalidateProject(projectRows[0]?.slug)
  return { ok: true, data: { count: mediaIds.length } }
}

/* --------------------------------- styles ---------------------------------- */

/**
 * The style taxonomy for the picker on the project editor.
 *
 * A read, but exposed as an action: `@/server/queries/styles` is server-only and
 * the picker lives in a client component, so this is its only door. Disabled
 * styles are left out on purpose — an editor cannot attach a style that would
 * never show on the public site.
 */
export async function listProjectStyleOptions(): Promise<ActionResult<StyleOption[]>> {
  await requireUser()

  try {
    const items = await getPublishedStyles()
    return {
      ok: true,
      data: items.map((item) => ({ id: item.id, slug: item.slug, name: item.name, nameEn: item.nameEn })),
    }
  } catch (error) {
    console.error('[actions/projects] listProjectStyleOptions failed', error)
    return failure('Không đọc được danh sách phong cách.')
  }
}
