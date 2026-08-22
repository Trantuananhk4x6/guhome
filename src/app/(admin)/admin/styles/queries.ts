/**
 * Admin-side style reads. Server-only.
 *
 * `@/server/queries/styles` is the *public* surface: `getPublishedStyles()` hides
 * disabled rows and counts only published projects, which is right for the site
 * and wrong for an editor. `listStylesForAdmin()` gets closer but still returns a
 * `StyleItem`, and a `StyleItem` carries neither `enabled` nor the SEO pair the
 * form edits — so the list below reads the table directly, the same split
 * `projects/queries.ts` makes.
 *
 * Errors are swallowed: an unseeded or unreachable database must render an empty
 * list, never a 500 on the whole admin.
 */

import { asc, eq, sql } from 'drizzle-orm'

import { db } from '@/server/db'
import { projectStyles, styles } from '@/server/db/schema'
import { getMediaMap } from '@/server/queries/media'

import type { AdminStyleRow } from './_components/contracts'

export async function listAdminStyles(): Promise<AdminStyleRow[]> {
  try {
    const rows = await db
      .select({
        id: styles.id,
        slug: styles.slug,
        name: styles.name,
        nameEn: styles.nameEn,
        tagline: styles.tagline,
        description: styles.description,
        coverMediaId: styles.coverMediaId,
        seo: styles.seo,
        order: styles.order,
        enabled: styles.enabled,
        projectCount: sql<number>`count(${projectStyles.projectId})::int`,
      })
      .from(styles)
      .leftJoin(projectStyles, eq(projectStyles.styleId, styles.id))
      .groupBy(styles.id)
      .orderBy(asc(styles.order), asc(styles.name))

    // Covers resolve through the shared media loader so the admin and the public
    // site agree on what a `MediaRef` is (and share the request cache).
    const coverMap = await getMediaMap(rows.map((row) => row.coverMediaId))

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      nameEn: row.nameEn,
      tagline: row.tagline,
      description: row.description,
      cover: row.coverMediaId ? (coverMap.get(row.coverMediaId) ?? null) : null,
      seoTitle: row.seo?.title ?? '',
      seoDescription: row.seo?.description ?? '',
      order: row.order,
      enabled: row.enabled,
      projectCount: row.projectCount,
    }))
  } catch (error) {
    console.error('[admin/styles] listAdminStyles failed', error)
    return []
  }
}
