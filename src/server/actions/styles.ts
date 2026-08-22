'use server'

/**
 * Style server actions — the write path behind the admin style screens and the
 * style picker on the project editor.
 *
 * House rules, applied by every action in this file (they are the ones
 * `actions/projects` follows):
 *   1. `requireUser()` first, always.
 *   2. Zod-validated input; failures come back as `{ ok: false, fieldErrors }`,
 *      never as thrown errors the UI has to guess about.
 *   3. An `audit_logs` row per mutation, written inside its own try/catch so a
 *      failed log can never undo a successful write.
 *   4. `revalidatePath` for every public route the change can be seen on.
 */

import { asc, eq, inArray, sql, type SQL } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { slugify } from '@/lib/utils'
import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import { auditLogs, projectStyles, projects, styles } from '@/server/db/schema'

import type { ActionResult } from './projects'

export interface StyleSaveResult {
  id: string
  slug: string
}

/* --------------------------------- helpers --------------------------------- */

const UUID_PATTERN = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

const idSchema = z
  .string()
  .trim()
  .refine((value) => UUID_PATTERN.test(value), 'Mã không hợp lệ.')

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

function invalid(
  issues: readonly IssueLike[],
  message = 'Dữ liệu chưa hợp lệ.',
): ActionResult<never> {
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
      entityType: 'style',
      entityId: entry.entityId ?? null,
      meta: entry.meta ?? null,
    })
  } catch (error) {
    console.error('[actions/styles] audit write failed', error)
  }
}

/** Public surfaces a style change is visible on, plus the admin list. */
function revalidateStyle(...slugs: readonly (string | null | undefined)[]): void {
  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/phong-cach')
  for (const slug of slugs) {
    if (slug) revalidatePath(`/phong-cach/${slug}`)
  }
  revalidatePath('/admin/styles')
}

/**
 * First free slug of the form `base`, `base-2`, `base-3`…
 *
 * `styles_slug_key` is unique, so a collision would otherwise surface as a raw
 * Postgres error in the admin — the editor gets a suffixed slug instead.
 */
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base) || 'phong-cach'
  let candidate = root
  for (let attempt = 2; attempt <= 60; attempt++) {
    const rows = await db
      .select({ id: styles.id })
      .from(styles)
      .where(eq(styles.slug, candidate))
      .limit(1)
    const clash = rows[0]
    if (!clash || clash.id === excludeId) return candidate
    candidate = `${root}-${attempt}`
  }
  return `${root}-${Date.now().toString(36)}`
}

/* ------------------------------- input schema ------------------------------ */

const trimmed = (max: number) => z.string().trim().max(max)

const styleFormSchema = z.object({
  name: z.string().trim().min(2, 'Tên phong cách cần ít nhất 2 ký tự.').max(120, 'Tên quá dài.'),
  slug: trimmed(90).default(''),
  nameEn: trimmed(120).default(''),
  tagline: trimmed(200).default(''),
  description: trimmed(4000).default(''),
  coverMediaId: z.string().trim().max(64).nullable().default(null),
  seoTitle: trimmed(160).default(''),
  seoDescription: trimmed(320).default(''),
  order: z.number().int().min(0).max(9999).default(0),
  enabled: z.boolean().default(true),
})

export type StyleFormInput = z.input<typeof styleFormSchema>

/* --------------------------------- create ---------------------------------- */

export async function createStyle(input: StyleFormInput): Promise<ActionResult<StyleSaveResult>> {
  const session = await requireUser()

  const parsed = styleFormSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const value = parsed.data

  const slug = await uniqueSlug(value.slug.length > 0 ? value.slug : value.name)
  const now = new Date()

  try {
    const inserted = await db
      .insert(styles)
      .values({
        slug,
        name: value.name,
        nameEn: emptyToNull(value.nameEn),
        tagline: emptyToNull(value.tagline),
        description: emptyToNull(value.description),
        coverMediaId: emptyToNull(value.coverMediaId),
        seo: {
          title: emptyToNull(value.seoTitle) ?? undefined,
          description: emptyToNull(value.seoDescription) ?? undefined,
        },
        order: value.order,
        enabled: value.enabled,
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: styles.id, slug: styles.slug })

    const row = inserted[0]
    if (!row) return failure('Không tạo được phong cách.')

    await writeAudit({
      userId: session.userId,
      action: 'style.create',
      entityId: row.id,
      meta: { slug: row.slug, name: value.name },
    })

    revalidateStyle(row.slug)
    return { ok: true, data: { id: row.id, slug: row.slug } }
  } catch (error) {
    console.error('[actions/styles] createStyle failed', error)
    return failure('Không tạo được phong cách. Vui lòng thử lại.')
  }
}

/* --------------------------------- update ---------------------------------- */

export async function updateStyle(
  input: StyleFormInput & { id: string },
): Promise<ActionResult<StyleSaveResult>> {
  const session = await requireUser()

  const idParsed = idSchema.safeParse(input.id)
  if (!idParsed.success) return invalid(idParsed.error.issues)

  const parsed = styleFormSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const value = parsed.data

  const existingRows = await db
    .select({ id: styles.id, slug: styles.slug })
    .from(styles)
    .where(eq(styles.id, idParsed.data))
    .limit(1)
  const existing = existingRows[0]
  if (!existing) return failure('Phong cách không tồn tại.')

  const slug = await uniqueSlug(value.slug.length > 0 ? value.slug : value.name, existing.id)

  try {
    const updated = await db
      .update(styles)
      .set({
        slug,
        name: value.name,
        nameEn: emptyToNull(value.nameEn),
        tagline: emptyToNull(value.tagline),
        description: emptyToNull(value.description),
        coverMediaId: emptyToNull(value.coverMediaId),
        seo: {
          title: emptyToNull(value.seoTitle) ?? undefined,
          description: emptyToNull(value.seoDescription) ?? undefined,
        },
        order: value.order,
        enabled: value.enabled,
        updatedAt: new Date(),
      })
      .where(eq(styles.id, existing.id))
      .returning({ id: styles.id, slug: styles.slug })

    const row = updated[0]
    if (!row) return failure('Không lưu được phong cách.')

    await writeAudit({
      userId: session.userId,
      action: 'style.update',
      entityId: row.id,
      meta: { slug: row.slug, name: value.name, previousSlug: existing.slug },
    })

    revalidateStyle(row.slug, existing.slug)
    revalidatePath(`/admin/styles/${row.id}`)
    return { ok: true, data: { id: row.id, slug: row.slug } }
  } catch (error) {
    console.error('[actions/styles] updateStyle failed', error)
    return failure('Không lưu được phong cách. Vui lòng thử lại.')
  }
}

/* --------------------------------- delete ---------------------------------- */

export async function deleteStyle(input: { id: string }): Promise<ActionResult<{ id: string }>> {
  const session = await requireUser()

  const parsed = idSchema.safeParse(input.id)
  if (!parsed.success) return invalid(parsed.error.issues)

  const rows = await db
    .select({ id: styles.id, slug: styles.slug, name: styles.name })
    .from(styles)
    .where(eq(styles.id, parsed.data))
    .limit(1)
  const existing = rows[0]
  if (!existing) return failure('Phong cách không tồn tại.')

  try {
    // The join rows cascade from the schema, so the projects keep their other
    // styles and lose only this one.
    await db.delete(styles).where(eq(styles.id, existing.id))
  } catch (error) {
    console.error('[actions/styles] deleteStyle failed', error)
    return failure('Không xoá được phong cách. Vui lòng thử lại.')
  }

  await writeAudit({
    userId: session.userId,
    action: 'style.delete',
    entityId: existing.id,
    meta: { slug: existing.slug, name: existing.name },
  })

  revalidateStyle(existing.slug)
  return { ok: true, data: { id: existing.id } }
}

/* -------------------------------- reorder ---------------------------------- */

const reorderSchema = z.object({ ids: z.array(idSchema).max(200) })

/**
 * Reorders the whole list in one statement: a CASE expression assigns each id
 * its index, so there is no window where the band is half-sorted.
 */
export async function reorderStyles(input: {
  ids: string[]
}): Promise<ActionResult<{ count: number }>> {
  const session = await requireUser()

  const parsed = reorderSchema.safeParse(input)
  if (!parsed.success) return invalid(parsed.error.issues)
  const { ids } = parsed.data

  if (ids.length === 0) return { ok: true, data: { count: 0 } }

  const chunks: SQL[] = [sql`(case`]
  ids.forEach((id, index) => {
    chunks.push(sql`when ${styles.id} = ${id}::uuid then ${sql.raw(String(index))}`)
  })
  chunks.push(sql`else ${styles.order} end)`)

  try {
    await db
      .update(styles)
      .set({ order: sql.join(chunks, sql` `), updatedAt: new Date() })
      .where(inArray(styles.id, ids))
  } catch (error) {
    console.error('[actions/styles] reorderStyles failed', error)
    return failure('Không sắp xếp được danh sách. Vui lòng thử lại.')
  }

  await writeAudit({
    userId: session.userId,
    action: 'style.reorder',
    meta: { count: ids.length },
  })

  revalidateStyle()
  return { ok: true, data: { count: ids.length } }
}

/* ---------------------------- project attachment --------------------------- */

const setProjectStylesSchema = z.object({
  projectId: idSchema,
  styleIds: z.array(idSchema).max(24, 'Tối đa 24 phong cách cho một dự án.'),
})

/**
 * Replaces a project's styles wholesale — the picker sends the list it wants,
 * not a diff.
 *
 * Delete-then-insert rather than a merge: the pair table carries nothing but the
 * order, so there is no per-row state a rewrite could lose, and the incoming
 * array order is exactly what should be stored.
 */
export async function setProjectStyles(
  projectId: string,
  styleIds: string[],
): Promise<ActionResult<{ count: number }>> {
  const session = await requireUser()

  const parsed = setProjectStylesSchema.safeParse({ projectId, styleIds })
  if (!parsed.success) return invalid(parsed.error.issues)
  const value = parsed.data

  const projectRows = await db
    .select({ id: projects.id, slug: projects.slug })
    .from(projects)
    .where(eq(projects.id, value.projectId))
    .limit(1)
  const project = projectRows[0]
  if (!project) return failure('Dự án không tồn tại.')

  // Duplicates in the payload would violate `project_styles_pair_key`; keeping
  // the first occurrence preserves the order the editor dragged them into.
  const wanted: string[] = []
  for (const styleId of value.styleIds) {
    if (!wanted.includes(styleId)) wanted.push(styleId)
  }

  if (wanted.length > 0) {
    const known = await db
      .select({ id: styles.id })
      .from(styles)
      .where(inArray(styles.id, wanted))
    if (known.length !== wanted.length) return failure('Có phong cách không còn tồn tại.')
  }

  try {
    await db.delete(projectStyles).where(eq(projectStyles.projectId, project.id))
    if (wanted.length > 0) {
      await db.insert(projectStyles).values(
        wanted.map((styleId, index) => ({
          projectId: project.id,
          styleId,
          order: index,
        })),
      )
    }
  } catch (error) {
    console.error('[actions/styles] setProjectStyles failed', error)
    return failure('Không lưu được phong cách của dự án. Vui lòng thử lại.')
  }

  await writeAudit({
    userId: session.userId,
    action: 'style.set_for_project',
    entityId: project.id,
    meta: { projectSlug: project.slug, styleIds: wanted },
  })

  revalidateStyle()
  revalidatePath(`/projects/${project.slug}`)
  revalidatePath(`/admin/projects/${project.id}`)
  return { ok: true, data: { count: wanted.length } }
}

/**
 * The style ids attached to a project, in join order — the initial value of the
 * picker. A read, but it lives here so the editor imports one module.
 */
export async function readProjectStyleIds(projectId: string): Promise<ActionResult<string[]>> {
  await requireUser()

  const parsed = idSchema.safeParse(projectId)
  if (!parsed.success) return invalid(parsed.error.issues)

  try {
    const rows = await db
      .select({ styleId: projectStyles.styleId })
      .from(projectStyles)
      .where(eq(projectStyles.projectId, parsed.data))
      .orderBy(asc(projectStyles.order))
    return { ok: true, data: rows.map((row) => row.styleId) }
  } catch (error) {
    console.error('[actions/styles] readProjectStyleIds failed', error)
    return failure('Không đọc được phong cách của dự án.')
  }
}
