/**
 * Admin-side project reads. Server-only.
 *
 * `@/server/queries/projects` is the *public* surface — it only ever returns
 * published work and never carries `categoryId` or `order`. The CMS index needs
 * drafts, the archive, and the raw columns the filter bar sorts on, so it reads
 * the table directly here (the same split `articles/queries.ts` makes).
 *
 * Every function swallows its own errors: an unseeded or unreachable database
 * must render an empty list, never a 500 on the whole admin.
 */

import { and, asc, eq, ilike, or, sql, type SQL } from 'drizzle-orm'

import type { StyleOption } from '@/components/admin/project/contracts'
import { db } from '@/server/db'
import { categories, projects } from '@/server/db/schema'
import { getMediaMap } from '@/server/queries/media'
import { getPublishedStyles, getStyleIdsForProject } from '@/server/queries/styles'
import type { MediaRef, PublishStatus } from '@/types/content'

export interface AdminProjectRow {
  id: string
  slug: string
  title: string
  subtitle: string | null
  status: PublishStatus
  featured: boolean
  order: number
  year: number | null
  location: string | null
  area: string | null
  categoryId: string | null
  categoryName: string | null
  categorySlug: string | null
  cover: MediaRef | null
  publishedAt: Date | null
  updatedAt: Date
}

export type AdminProjectSort = 'updated' | 'order' | 'title' | 'year'

export const ADMIN_PROJECT_SORTS: readonly AdminProjectSort[] = ['updated', 'order', 'title', 'year']

export interface AdminProjectQuery {
  status?: PublishStatus | 'all'
  /** Category is addressed by slug so a filtered list stays linkable. */
  categorySlug?: string
  featured?: boolean
  search?: string
  sort?: AdminProjectSort
  limit?: number
  offset?: number
}

/* --------------------------------- filters --------------------------------- */

function filters(query: AdminProjectQuery): SQL | undefined {
  const parts: SQL[] = []

  if (query.status && query.status !== 'all') parts.push(eq(projects.status, query.status))

  const category = query.categorySlug?.trim()
  if (category && category.length > 0) parts.push(eq(categories.slug, category))

  if (typeof query.featured === 'boolean') parts.push(eq(projects.featured, query.featured))

  const term = query.search?.trim()
  if (term && term.length > 0) {
    const like = `%${term}%`
    const match = or(
      ilike(projects.title, like),
      ilike(projects.slug, like),
      ilike(projects.subtitle, like),
      ilike(projects.location, like),
    )
    if (match) parts.push(match)
  }

  if (parts.length === 0) return undefined
  return parts.length === 1 ? parts[0] : and(...parts)
}

/** Ordering the editor picked, always tie-broken by title so paging is stable. */
function ordering(sort: AdminProjectSort | undefined): SQL[] {
  switch (sort) {
    case 'order':
      return [sql`${projects.order} asc`, sql`${projects.title} asc`]
    case 'title':
      return [sql`${projects.title} asc`]
    case 'year':
      return [sql`${projects.year} desc nulls last`, sql`${projects.title} asc`]
    default:
      return [sql`${projects.updatedAt} desc`, sql`${projects.title} asc`]
  }
}

/* ---------------------------------- reads ---------------------------------- */

export async function listAdminProjects(query: AdminProjectQuery = {}): Promise<AdminProjectRow[]> {
  try {
    const rows = await db
      .select({
        id: projects.id,
        slug: projects.slug,
        title: projects.title,
        subtitle: projects.subtitle,
        status: projects.status,
        featured: projects.featured,
        order: projects.order,
        year: projects.year,
        location: projects.location,
        area: projects.area,
        categoryId: projects.categoryId,
        categoryName: categories.name,
        categorySlug: categories.slug,
        coverMediaId: projects.coverMediaId,
        publishedAt: projects.publishedAt,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(filters(query))
      .orderBy(...ordering(query.sort))
      .limit(query.limit ?? 50)
      .offset(query.offset ?? 0)

    // Covers resolve through the shared media loader so the admin and the public
    // site agree on what a `MediaRef` is (and share the request cache).
    const coverMap = await getMediaMap(rows.map((row) => row.coverMediaId))

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle,
      status: row.status,
      featured: row.featured,
      order: row.order,
      year: row.year,
      location: row.location,
      area: row.area,
      categoryId: row.categoryId,
      categoryName: row.categoryName,
      categorySlug: row.categorySlug,
      cover: row.coverMediaId ? (coverMap.get(row.coverMediaId) ?? null) : null,
      publishedAt: row.publishedAt,
      updatedAt: row.updatedAt,
    }))
  } catch (error) {
    console.error('[admin/projects] listAdminProjects failed', error)
    return []
  }
}

/** Total matching the *whole* filter set — the number pagination is built on. */
export async function countAdminProjects(query: AdminProjectQuery = {}): Promise<number> {
  try {
    const rows = await db
      .select({ value: sql<number>`count(*)::int` })
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(filters(query))
    return rows[0]?.value ?? 0
  } catch (error) {
    console.error('[admin/projects] countAdminProjects failed', error)
    return 0
  }
}

export type AdminProjectCounts = Record<PublishStatus | 'all', number>

/**
 * Tab counts. Every filter *except* status is honoured, so the numbers describe
 * what each tab would actually show from where the editor is standing.
 */
export async function countAdminProjectsByStatus(
  query: Omit<AdminProjectQuery, 'status' | 'limit' | 'offset' | 'sort'> = {},
): Promise<AdminProjectCounts> {
  const empty: AdminProjectCounts = { all: 0, draft: 0, published: 0, archived: 0 }
  try {
    const rows = await db
      .select({ status: projects.status, value: sql<number>`count(*)::int` })
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(filters({ ...query, status: 'all' }))
      .groupBy(projects.status)

    const out: AdminProjectCounts = { ...empty }
    for (const row of rows) {
      out[row.status] = row.value
      out.all += row.value
    }
    return out
  } catch (error) {
    console.error('[admin/projects] countAdminProjectsByStatus failed', error)
    return empty
  }
}

export interface ProjectCategoryOption {
  id: string
  slug: string
  name: string
  projectCount: number
}

/** Project taxonomy for the filter bar and the create form. */
export async function listProjectCategories(): Promise<ProjectCategoryOption[]> {
  try {
    const rows = await db
      .select({
        id: categories.id,
        slug: categories.slug,
        name: categories.name,
        projectCount: sql<number>`count(${projects.id})::int`,
      })
      .from(categories)
      .leftJoin(projects, eq(projects.categoryId, categories.id))
      .where(eq(categories.kind, 'project'))
      .groupBy(categories.id, categories.slug, categories.name, categories.order)
      .orderBy(asc(categories.order), asc(categories.name))
    return rows
  } catch (error) {
    console.error('[admin/projects] listProjectCategories failed', error)
    return []
  }
}

/* ---------------------------------- styles --------------------------------- */

/**
 * The style taxonomy a project can be filed under, for the picker on the editor.
 *
 * Read through `@/server/queries/styles` rather than off the table: that module
 * already resolves covers and swallows its own errors, and going around it would
 * be a second opinion on what an enabled style is.
 */
export async function listStyleOptions(): Promise<StyleOption[]> {
  const items = await getPublishedStyles()
  return items.map((item) => ({ id: item.id, slug: item.slug, name: item.name, nameEn: item.nameEn }))
}

/**
 * Styles already attached to a project, in join order — the initial value the
 * editor hands to the picker so it does not have to fetch them from the client.
 */
export async function listProjectStyleIds(projectId: string): Promise<string[]> {
  try {
    return await getStyleIdsForProject(projectId)
  } catch (error) {
    console.error('[admin/projects] listProjectStyleIds failed', error)
    return []
  }
}

export type { StyleOption }
