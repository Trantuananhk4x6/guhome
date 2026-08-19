/**
 * Project queries. Server-only module — never import from a client component.
 *
 * Contract: docs/ARCHITECTURE.md §6.5. Everything returned is a plain,
 * serialisable object shaped by `@/types/content` — never a raw row.
 */

import { and, asc, desc, eq, inArray, ne, notInArray, sql, type SQL } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '@/server/db'
import {
  categories,
  projectBlocks,
  projectMedia,
  projects,
  type ProjectBlockRow,
  type ProjectRow,
} from '@/server/db/schema'
import type { ProjectBlock, ProjectDetail, ProjectSummary, SceneMode } from '@/types/content'

import { getMediaMap } from './media'
import { getSceneForProject, getSceneModesByProject } from './scenes'

export interface ProjectListOptions {
  limit?: number
  categorySlug?: string
  featured?: boolean
}

interface ProjectJoinRow {
  project: ProjectRow
  categorySlug: string | null
  categoryName: string | null
}

const projectSelection = {
  project: projects,
  categorySlug: categories.slug,
  categoryName: categories.name,
}

/**
 * Public visibility: published, and not scheduled for the future.
 *
 * A NULL `publishedAt` counts as "live now" on purpose — the column exists to
 * support scheduling, and a published row that simply never got a timestamp
 * should not silently disappear from the site.
 */
function publishedFilter(): SQL {
  return sql`${projects.status} = 'published' and (${projects.publishedAt} is null or ${projects.publishedAt} <= now())`
}

/** Newest first, tolerating rows that never received a publish timestamp. */
function publishedOrder(): SQL {
  return desc(sql`coalesce(${projects.publishedAt}, ${projects.createdAt})`)
}

async function toSummaries(rows: readonly ProjectJoinRow[]): Promise<ProjectSummary[]> {
  if (rows.length === 0) return []

  const [mediaMap, sceneModes] = await Promise.all([
    getMediaMap(rows.map((row) => row.project.coverMediaId)),
    getSceneModesByProject(rows.map((row) => row.project.id)),
  ])

  return rows.map((row) => {
    const project = row.project
    const coverId = project.coverMediaId
    const mode: SceneMode = sceneModes.get(project.id) ?? 'NONE'

    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      summary: project.summary,
      location: project.location,
      area: project.area,
      year: project.year,
      style: project.style,
      featured: project.featured,
      categorySlug: row.categorySlug,
      categoryName: row.categoryName,
      cover: coverId ? (mediaMap.get(coverId) ?? null) : null,
      sceneMode: mode,
    }
  })
}

/* --------------------------------- listing --------------------------------- */

const loadPublishedProjects = cache(
  async (limit: number, categorySlug: string, featured: 'any' | 'yes' | 'no'): Promise<ProjectSummary[]> => {
    const filters: SQL[] = [publishedFilter()]
    if (categorySlug.length > 0) filters.push(eq(categories.slug, categorySlug))
    if (featured !== 'any') filters.push(eq(projects.featured, featured === 'yes'))

    const query = db
      .select(projectSelection)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(and(...filters))
      .orderBy(asc(projects.order), publishedOrder(), asc(projects.title))

    const rows = limit > 0 ? await query.limit(limit) : await query
    return toSummaries(rows)
  },
)

export function getPublishedProjects(options: ProjectListOptions = {}): Promise<ProjectSummary[]> {
  const featured = options.featured === undefined ? 'any' : options.featured ? 'yes' : 'no'
  return loadPublishedProjects(options.limit ?? 0, options.categorySlug ?? '', featured)
}

export const getAllProjectSlugs = cache(async (): Promise<string[]> => {
  const rows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(publishedFilter())
    .orderBy(asc(projects.order))
  return rows.map((row) => row.slug)
})

/* ---------------------------------- detail --------------------------------- */

function toProjectBlock(row: ProjectBlockRow): ProjectBlock {
  const block = {
    id: row.id,
    type: row.type,
    order: row.order,
    enabled: row.enabled,
    data: row.data,
  }
  // `data` is untyped jsonb; the admin block editor is what guarantees it matches
  // the variant named by `type`. Renderers should still treat fields defensively.
  return block as unknown as ProjectBlock
}

async function toDetail(row: ProjectJoinRow): Promise<ProjectDetail> {
  const project = row.project

  const [summaries, galleryRows, blockRows, scene] = await Promise.all([
    toSummaries([row]),
    db
      .select({ mediaId: projectMedia.mediaId, order: projectMedia.order })
      .from(projectMedia)
      .where(
        and(
          eq(projectMedia.projectId, project.id),
          // before/after pairs belong to their block, not to the gallery.
          notInArray(projectMedia.role, ['before', 'after']),
        ),
      )
      .orderBy(asc(projectMedia.order)),
    db
      .select()
      .from(projectBlocks)
      .where(eq(projectBlocks.projectId, project.id))
      .orderBy(asc(projectBlocks.order)),
    getSceneForProject(project.id),
  ])

  const summary = summaries[0]
  if (!summary) throw new Error(`Failed to map project ${project.slug}`)

  const orderedIds: string[] = []
  const seen = new Set<string>()
  for (const galleryRow of galleryRows) {
    if (seen.has(galleryRow.mediaId)) continue
    seen.add(galleryRow.mediaId)
    orderedIds.push(galleryRow.mediaId)
  }

  const galleryMedia = await getMediaMap(orderedIds)
  const gallery = orderedIds
    .map((id) => galleryMedia.get(id))
    .filter((ref): ref is NonNullable<typeof ref> => ref !== undefined)

  return {
    ...summary,
    client: project.client,
    duration: project.duration,
    services: project.services,
    description: project.description,
    status: project.status,
    publishedAt: project.publishedAt,
    gallery,
    blocks: blockRows.map(toProjectBlock),
    scene,
    seo: project.seo ?? null,
  }
}

export const getProjectBySlug = cache(async (slug: string): Promise<ProjectDetail | null> => {
  const rows = await db
    .select(projectSelection)
    .from(projects)
    .leftJoin(categories, eq(projects.categoryId, categories.id))
    .where(and(eq(projects.slug, slug), publishedFilter()))
    .limit(1)

  const row = rows[0]
  return row ? toDetail(row) : null
})

/**
 * Same shape as `getProjectBySlug`, but ignores publish status — for the admin
 * editor and draft previews only. Never call this from a public page.
 */
export const getProjectByIdUnfiltered = cache(async (id: string): Promise<ProjectDetail | null> => {
  const rows = await db
    .select(projectSelection)
    .from(projects)
    .leftJoin(categories, eq(projects.categoryId, categories.id))
    .where(eq(projects.id, id))
    .limit(1)

  const row = rows[0]
  return row ? toDetail(row) : null
})

/* --------------------------------- related --------------------------------- */

export const getRelatedProjects = cache(
  async (projectId: string, limit = 3): Promise<ProjectSummary[]> => {
    if (limit <= 0) return []

    const currentRows = await db
      .select({ categoryId: projects.categoryId })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1)
    const categoryId = currentRows[0]?.categoryId ?? null

    const orderBy: SQL[] = []
    if (categoryId) {
      // Same category first, then everything else.
      orderBy.push(sql`case when ${projects.categoryId} = ${categoryId} then 0 else 1 end`)
    }
    orderBy.push(desc(projects.featured), publishedOrder())

    const rows = await db
      .select(projectSelection)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(and(publishedFilter(), ne(projects.id, projectId)))
      .orderBy(...orderBy)
      .limit(limit)

    return toSummaries(rows)
  },
)

/** Ids of projects referenced by a RELATED block, resolved in the given order. */
export async function getProjectsByIds(ids: readonly string[]): Promise<ProjectSummary[]> {
  const wanted = ids.filter((id) => id.length > 0)
  if (wanted.length === 0) return []

  const rows = await db
    .select(projectSelection)
    .from(projects)
    .leftJoin(categories, eq(projects.categoryId, categories.id))
    .where(and(publishedFilter(), inArray(projects.id, wanted)))

  const summaries = await toSummaries(rows)
  const byId = new Map(summaries.map((summary) => [summary.id, summary]))
  return wanted
    .map((id) => byId.get(id))
    .filter((summary): summary is ProjectSummary => summary !== undefined)
}
