/**
 * Project queries. Server-only module — never import from a client component.
 *
 * Contract: docs/ARCHITECTURE.md §6.5. Everything returned is a plain,
 * serialisable object shaped by `@/types/content` — never a raw row.
 */

import { and, asc, desc, eq, inArray, ne, notInArray, sql, type SQL } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { toMediaRef } from '@/lib/media'
import { db } from '@/server/db'
import {
  categories,
  media,
  projectBlocks,
  projectMedia,
  projectStyles,
  projects,
  styles,
  type MediaRow,
  type ProjectBlockRow,
  type ProjectRow,
} from '@/server/db/schema'
import type {
  ProjectBlock,
  ProjectDetail,
  ProjectSummary,
  SceneMode,
  StyleItem,
} from '@/types/content'

import { getMediaMap } from './media'
import { getSceneForProject, getSceneModesByProject, readAllSceneModes } from './scenes'
import { getStaticProjectDetail, getStaticPublishedProjects } from './static-fallback'
import { getStylesForProjects } from './styles'

export interface ProjectListOptions {
  limit?: number
  categorySlug?: string
  /** Second taxonomy: `styles.slug`, as `/projects?style=…` sends it. */
  styleSlug?: string
  featured?: boolean
}

/**
 * The fields every `ProjectSummary` is built from, whether they arrived as a
 * whole `ProjectRow` (detail, related) or as the ten columns the listing asks
 * for. Structural, so a full row satisfies it without a cast.
 */
interface ProjectSummaryFields {
  id: string
  slug: string
  title: string
  subtitle: string | null
  summary: string | null
  location: string | null
  area: string | null
  year: number | null
  style: string | null
  featured: boolean
}

interface ProjectJoinRow {
  project: ProjectRow
  categorySlug: string | null
  categoryName: string | null
  cover: MediaRow | null
}

/**
 * The whole project row, its category, and its cover photograph.
 *
 * The cover used to be resolved afterwards, by collecting `coverMediaId` off
 * every row and handing the list to `getMediaMap()`. That is one query rather
 * than a loop — but it is a query that cannot be *issued* until the project
 * query has answered, and on `neon-http` every statement is its own HTTPS
 * request: measured at 244 ms for the projects and a further 489 ms for the
 * covers, strictly one after the other. `cover_media_id` is a plain nullable FK
 * to one row, so the join fans nothing out and the second hop disappears.
 */
const projectSelection = {
  project: projects,
  categorySlug: categories.slug,
  categoryName: categories.name,
  cover: media,
}

/**
 * The listing's narrower selection: the ten summary columns instead of the
 * whole row.
 *
 * `select projects.*` across the published run carries ~95 KB of `description`,
 * ~17 KB of `seo` and the `services` array over the wire on every request —
 * none of which a `ProjectSummary` contains, and all of which is read by the
 * detail route from its own single-row query.
 */
const summarySelection = {
  id: projects.id,
  slug: projects.slug,
  title: projects.title,
  subtitle: projects.subtitle,
  summary: projects.summary,
  location: projects.location,
  area: projects.area,
  year: projects.year,
  style: projects.style,
  featured: projects.featured,
  categorySlug: categories.slug,
  categoryName: categories.name,
  cover: media,
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

/**
 * "Wears this style", as a subquery rather than a join.
 *
 * `project_styles` is many-to-many, so joining it into the listing would return
 * a project once per style it wears — duplicated cards, a wrong `limit`, and a
 * `getPublishedIndex` that no longer holds one row per project. `exists` filters
 * without touching the shape of the result.
 */
function styleFilter(styleSlug: string): SQL {
  return sql`exists (
    select 1 from ${projectStyles}
    join ${styles} on ${styles.id} = ${projectStyles.styleId}
    where ${projectStyles.projectId} = ${projects.id}
      and ${styles.slug} = ${styleSlug}
      and ${styles.enabled} = true
  )`
}

/** Pure: everything it needs is already in hand. */
function toSummary(
  fields: ProjectSummaryFields,
  categorySlug: string | null,
  categoryName: string | null,
  cover: MediaRow | null,
  sceneModes: ReadonlyMap<string, SceneMode>,
): ProjectSummary {
  return {
    id: fields.id,
    slug: fields.slug,
    title: fields.title,
    subtitle: fields.subtitle,
    summary: fields.summary,
    location: fields.location,
    area: fields.area,
    year: fields.year,
    style: fields.style,
    featured: fields.featured,
    categorySlug,
    categoryName,
    cover: cover ? toMediaRef(cover) : null,
    sceneMode: sceneModes.get(fields.id) ?? 'NONE',
  }
}

async function toSummaries(rows: readonly ProjectJoinRow[]): Promise<ProjectSummary[]> {
  if (rows.length === 0) return []

  const sceneModes = await getSceneModesByProject(rows.map((row) => row.project.id))
  return rows.map((row) =>
    toSummary(row.project, row.categorySlug, row.categoryName, row.cover, sceneModes),
  )
}

/* --------------------------------- listing --------------------------------- */

/**
 * Invalidation handle for the listing. `revalidateTag(PROJECTS_TAG)` from a
 * project or media mutation drops it immediately; without that call the window
 * below is the bound.
 */
export const PROJECTS_TAG = 'projects'

/**
 * How long a listing may be reused across requests.
 *
 * The site already promises exactly this on the same data — `/` ships
 * `revalidate = 300` and `/projects/[slug]` ships `revalidate = 3600` — so this
 * is the freshest of the three, not a new concession.
 */
const PROJECTS_TTL_SECONDS = 300

/**
 * One statement for the run, one for the scene modes, issued together.
 *
 * Was three statements in two waves — projects, then covers alongside scene
 * modes — and on `neon-http` every statement is its own HTTPS request, so the
 * second wave could not even be *sent* until the first had answered. The covers
 * now ride along on the project query's join (`cover_media_id` is a nullable FK
 * to one row, so it fans nothing out) and the scene modes no longer need the
 * project ids in order to be asked for, which collapses the two waves into one.
 *
 * Ten interleaved samples against the live database, to control for a noisy
 * link: 3 requests / 2 waves / 328 KB, median 990 ms → 2 requests / 1 wave /
 * 151 KB, median 491 ms (min 248 ms). Half the payload is the narrower
 * selection above; half the latency is the wave that stopped existing.
 */
async function readPublishedProjects(
  limit: number,
  categorySlug: string,
  featured: 'any' | 'yes' | 'no',
  styleSlug = '',
): Promise<ProjectSummary[]> {
  try {
    const filters: SQL[] = [publishedFilter()]
    if (categorySlug.length > 0) filters.push(eq(categories.slug, categorySlug))
    if (featured !== 'any') filters.push(eq(projects.featured, featured === 'yes'))
    if (styleSlug.length > 0) filters.push(styleFilter(styleSlug))

    const query = db
      .select(summarySelection)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .leftJoin(media, eq(projects.coverMediaId, media.id))
      .where(and(...filters))
      .orderBy(asc(projects.order), publishedOrder(), asc(projects.title))

    const [rows, sceneModes] = await Promise.all([
      limit > 0 ? query.limit(limit) : query,
      readAllSceneModes(),
    ])

    if (rows && rows.length > 0) {
      return rows.map((row) => toSummary(row, row.categorySlug, row.categoryName, row.cover, sceneModes))
    }
  } catch {
    console.warn('[projects] db query unavailable, using static content fallback')
  }

  return getStaticPublishedProjects({
    limit: limit > 0 ? limit : undefined,
    categorySlug: categorySlug.length > 0 ? categorySlug : undefined,
    featured: featured === 'any' ? undefined : featured === 'yes',
    styleSlug: styleSlug.length > 0 ? styleSlug : undefined,
  })
}

/** Per-request memo. Every caller but `/projects` wants exactly this. */
const loadPublishedProjects = cache(readPublishedProjects)

export function getPublishedProjects(options: ProjectListOptions = {}): Promise<ProjectSummary[]> {
  const featured = options.featured === undefined ? 'any' : options.featured ? 'yes' : 'no'
  return loadPublishedProjects(
    options.limit ?? 0,
    options.categorySlug ?? '',
    featured,
    options.styleSlug ?? '',
  )
}

/**
 * The whole published run, cached ACROSS requests — for `/projects`, and only
 * for `/projects`.
 */
export const getPublishedIndex = cache(
  unstable_cache(async (): Promise<ProjectSummary[]> => readPublishedProjects(0, '', 'any'), ['published-index'], {
    revalidate: PROJECTS_TTL_SECONDS,
    tags: [PROJECTS_TAG],
  }),
)

export const getAllProjectSlugs = cache(async (): Promise<string[]> => {
  try {
    const rows = await db
      .select({ slug: projects.slug })
      .from(projects)
      .where(publishedFilter())
      .orderBy(asc(projects.order))
    if (rows && rows.length > 0) {
      return rows.map((row) => row.slug)
    }
  } catch {
    console.warn('[projects] db slug query failed, using static fallback')
  }

  return getStaticPublishedProjects().map((p) => p.slug)
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
  try {
    const rows = await db
      .select(projectSelection)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .leftJoin(media, eq(projects.coverMediaId, media.id))
      .where(and(eq(projects.slug, slug), publishedFilter()))
      .limit(1)

    const row = rows[0]
    if (row) {
      return await toDetail(row)
    }
  } catch {
    console.warn(`[projects] db query failed for slug "${slug}", using static fallback`)
  }

  return getStaticProjectDetail(slug)
})

/**
 * Same shape as `getProjectBySlug`, but ignores publish status — for the admin
 * editor and draft previews only. Never call this from a public page.
 */
export const getProjectByIdUnfiltered = cache(async (id: string): Promise<ProjectDetail | null> => {
  try {
    const rows = await db
      .select(projectSelection)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .leftJoin(media, eq(projects.coverMediaId, media.id))
      .where(eq(projects.id, id))
      .limit(1)

    const row = rows[0]
    if (row) return await toDetail(row)
  } catch {
    console.warn(`[projects] getProjectByIdUnfiltered failed for "${id}", trying static fallback`)
  }
  return getStaticProjectDetail(id)
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
      .leftJoin(media, eq(projects.coverMediaId, media.id))
      .where(and(publishedFilter(), ne(projects.id, projectId)))
      .orderBy(...orderBy)
      .limit(limit)

    return toSummaries(rows)
  },
)

/* ---------------------------------- styles --------------------------------- */

/**
 * The styles worn by each project of a list, keyed by project id.
 *
 * A second statement on purpose. `project_styles` is many-to-many, so folding it
 * into the listing's join would multiply the rows — see `styleFilter()` — and a
 * `ProjectSummary` has no `styles` field to receive them anyway. One grouped
 * read for the whole page, and the grid looks each card's styles up by id.
 */
export function getStylesForProjectList(
  summaries: readonly ProjectSummary[],
): Promise<Map<string, StyleItem[]>> {
  return getStylesForProjects(summaries.map((summary) => summary.id))
}

/** The styles of one project, in author order — for the detail page. */
export async function getProjectStyles(projectId: string): Promise<StyleItem[]> {
  const map = await getStylesForProjects([projectId])
  return map.get(projectId) ?? []
}

/** Ids of projects referenced by a RELATED block, resolved in the given order. */
export async function getProjectsByIds(ids: readonly string[]): Promise<ProjectSummary[]> {
  const wanted = ids.filter((id) => id.length > 0)
  if (wanted.length === 0) return []

  const rows = await db
    .select(projectSelection)
    .from(projects)
    .leftJoin(categories, eq(projects.categoryId, categories.id))
    .leftJoin(media, eq(projects.coverMediaId, media.id))
    .where(and(publishedFilter(), inArray(projects.id, wanted)))

  const summaries = await toSummaries(rows)
  const byId = new Map(summaries.map((summary) => [summary.id, summary]))
  return wanted
    .map((id) => byId.get(id))
    .filter((summary): summary is ProjectSummary => summary !== undefined)
}
