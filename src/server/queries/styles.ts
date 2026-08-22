/**
 * Style queries — the second taxonomy over projects, beside categories.
 * Server-only module — never import from a client component.
 *
 * Contract: docs/ARCHITECTURE.md §6.5. Everything returned is a plain,
 * serialisable `StyleItem`, never a raw row.
 *
 * Deliberately does NOT import from `./projects`: that module reaches back here
 * to decorate a project list with its styles, and two modules that import each
 * other are a cycle. The published-visibility predicate is therefore restated
 * below rather than shared — five lines of SQL against a runtime hazard.
 */

import { asc, count, eq, inArray, sql, type SQL } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '@/server/db'
import { projectStyles, projects, styles, type StyleRow } from '@/server/db/schema'
import type { StyleItem } from '@/types/content'

import { getMediaMap } from './media'

/**
 * Reads here run on every request, including the first one against a database
 * migrated but not seeded. A style band that cannot load should leave the page
 * without a band, not without a page.
 */
async function safeRead<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run()
  } catch (error) {
    console.error(`[queries/styles] ${label} failed — falling back to defaults`, error)
    return fallback
  }
}

/** Mirror of `queries/projects.publishedFilter()` — see the note at the top. */
function publishedProjectFilter(): SQL {
  return sql`${projects.status} = 'published' and (${projects.publishedAt} is null or ${projects.publishedAt} <= now())`
}

function toStyleItem(
  row: StyleRow,
  covers: ReadonlyMap<string, NonNullable<StyleItem['cover']>>,
  counts: ReadonlyMap<string, number>,
): StyleItem {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameEn: row.nameEn,
    tagline: row.tagline,
    description: row.description,
    cover: row.coverMediaId ? (covers.get(row.coverMediaId) ?? null) : null,
    order: row.order,
    count: counts.get(row.id) ?? 0,
  }
}

/**
 * How many published projects wear each style, in one grouped statement.
 *
 * `onlyPublished: false` is what the admin list wants: a style attached to three
 * drafts reads as unused otherwise, and "unused" is the cue to delete it.
 */
async function readCounts(onlyPublished: boolean): Promise<Map<string, number>> {
  const rows = await db
    .select({ styleId: projectStyles.styleId, value: count() })
    .from(projectStyles)
    .innerJoin(projects, eq(projectStyles.projectId, projects.id))
    .where(onlyPublished ? publishedProjectFilter() : undefined)
    .groupBy(projectStyles.styleId)

  return new Map(rows.map((row) => [row.styleId, row.value]))
}

async function decorate(rows: readonly StyleRow[], onlyPublished: boolean): Promise<StyleItem[]> {
  if (rows.length === 0) return []

  const [covers, counts] = await Promise.all([
    getMediaMap(rows.map((row) => row.coverMediaId)),
    readCounts(onlyPublished),
  ])

  return rows.map((row) => toStyleItem(row, covers, counts))
}

/* --------------------------------- public ---------------------------------- */

/** Enabled styles in author order, each carrying its published-project count. */
export const getPublishedStyles = cache(async (): Promise<StyleItem[]> => {
  return safeRead(
    'getPublishedStyles',
    async () => {
      const rows = await db
        .select()
        .from(styles)
        .where(eq(styles.enabled, true))
        .orderBy(asc(styles.order), asc(styles.name))
      return decorate(rows, true)
    },
    [],
  )
})

/**
 * One enabled style by slug. Resolved off the cached run rather than its own
 * statement — the page that asks for a style has almost always already listed
 * them, and the counts must agree between the two.
 */
export const getStyleBySlug = cache(async (slug: string): Promise<StyleItem | null> => {
  const all = await getPublishedStyles()
  return all.find((style) => style.slug === slug) ?? null
})

/**
 * The styles worn by each of the given projects, keyed by project id.
 *
 * One statement for the whole grid: the pairs come back in a single `in (…)`
 * read and are matched against the already-cached style run, so a page of
 * twenty projects costs one extra round trip rather than twenty. Projects with
 * no style are simply absent from the map.
 *
 * `cache()` memoises on argument identity, so the id list is flattened to a
 * stable key first — the same trick `queries/media` uses.
 */
const loadStylesForProjects = cache(async (key: string): Promise<Map<string, StyleItem[]>> => {
  const empty = new Map<string, StyleItem[]>()
  if (key.length === 0) return empty

  return safeRead(
    'getStylesForProjects',
    async () => {
      const ids = key.split(',')
      const [pairs, all] = await Promise.all([
        db
          .select({
            projectId: projectStyles.projectId,
            styleId: projectStyles.styleId,
            order: projectStyles.order,
          })
          .from(projectStyles)
          .where(inArray(projectStyles.projectId, ids))
          .orderBy(asc(projectStyles.order)),
        getPublishedStyles(),
      ])

      const byId = new Map(all.map((style) => [style.id, style]))
      const out = new Map<string, StyleItem[]>()
      for (const pair of pairs) {
        const style = byId.get(pair.styleId)
        // Absent means disabled — a hidden style must not surface on a card.
        if (!style) continue
        const bucket = out.get(pair.projectId)
        if (bucket) bucket.push(style)
        else out.set(pair.projectId, [style])
      }
      return out
    },
    empty,
  )
})

export function getStylesForProjects(
  projectIds: readonly string[],
): Promise<Map<string, StyleItem[]>> {
  const unique = new Set<string>()
  for (const id of projectIds) {
    if (id.length > 0) unique.add(id)
  }
  return loadStylesForProjects(Array.from(unique).sort().join(','))
}

/* ---------------------------------- admin ---------------------------------- */

/**
 * Every style, disabled ones included, with a usage count over projects of any
 * status. Admin screens only — never call this from a public page.
 */
export const listStylesForAdmin = cache(async (): Promise<StyleItem[]> => {
  return safeRead(
    'listStylesForAdmin',
    async () => {
      const rows = await db.select().from(styles).orderBy(asc(styles.order), asc(styles.name))
      return decorate(rows, false)
    },
    [],
  )
})

/** The style ids attached to one project, in join order — for the admin editor. */
export const getStyleIdsForProject = cache(async (projectId: string): Promise<string[]> => {
  return safeRead(
    'getStyleIdsForProject',
    async () => {
      const rows = await db
        .select({ styleId: projectStyles.styleId })
        .from(projectStyles)
        .where(eq(projectStyles.projectId, projectId))
        .orderBy(asc(projectStyles.order))
      return rows.map((row) => row.styleId)
    },
    [],
  )
})
