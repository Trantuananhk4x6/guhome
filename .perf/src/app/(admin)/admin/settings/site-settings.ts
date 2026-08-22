/**
 * Site-wide SEO defaults. Server-only module — never import from a client
 * component.
 *
 * `src/server/db/schema.ts` is frozen for this build and carries no
 * `site_settings` table, so the document is stored as an append-only entry in
 * `revisions` (`entity_type = 'site_settings'`, a fixed sentinel `entity_id`).
 * The newest row wins; older rows are the edit history for free.
 *
 * TODO (schema owner): promote this to a real `site_settings` table — the read
 * below is then a single-row select and this module keeps the same API.
 */

import { and, desc, eq, ne, type SQL } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '@/server/db'
import { revisions } from '@/server/db/schema'
import { DEFAULT_SEO, type SeoDefaults } from '@/components/admin/site/contracts'

/**
 * The pseudo-entity type these rows are filed under.
 *
 * `revisions` is otherwise an audit trail of *real* entities — a project, an
 * article — so this value is a deliberate squatter: it exists only because the
 * schema is frozen and has nowhere else to put a singleton settings document.
 * Every `revisions` row carrying it is site settings, never content.
 *
 * Consequence, and the reason this is a single exported constant rather than a
 * string literal at each call site: any query that lists revisions as *edit
 * history* must exclude it, or the SEO document shows up as a phantom entry in
 * a project's or article's history. Use `notSiteSettings()` below for that —
 * do not re-type the string.
 */
export const SITE_SETTINGS_ENTITY = 'site_settings'

/** Stable, reserved id — never collides with a real entity uuid. */
export const SITE_SETTINGS_ID = '00000000-0000-4000-8000-000000000001'

/**
 * Drop the settings pseudo-entity from a revision-history query:
 * `.where(and(eq(revisions.entityId, projectId), notSiteSettings()))`.
 *
 * No admin screen lists revision history yet, so this currently has no call
 * site — it exists so the first one that does cannot get it wrong.
 */
export function notSiteSettings(): SQL {
  return ne(revisions.entityType, SITE_SETTINGS_ENTITY)
}

function readString(source: Record<string, unknown>, key: string, fallback: string): string {
  const value = source[key]
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

function parse(data: Record<string, unknown>): SeoDefaults {
  const ogImageId = data['ogImageId']
  return {
    titleTemplate: readString(data, 'titleTemplate', DEFAULT_SEO.titleTemplate),
    defaultTitle: readString(data, 'defaultTitle', DEFAULT_SEO.defaultTitle),
    description: readString(data, 'description', DEFAULT_SEO.description),
    ogImageId: typeof ogImageId === 'string' && ogImageId.length > 0 ? ogImageId : null,
  }
}

/**
 * The stored SEO defaults, merged over `DEFAULT_SEO`.
 * Falls back to the defaults rather than throwing, so the admin always renders.
 */
export const getSiteSeoDefaults = cache(async (): Promise<SeoDefaults> => {
  try {
    const rows = await db
      .select({ data: revisions.data })
      .from(revisions)
      .where(and(eq(revisions.entityType, SITE_SETTINGS_ENTITY), eq(revisions.entityId, SITE_SETTINGS_ID)))
      .orderBy(desc(revisions.createdAt))
      .limit(1)

    const row = rows[0]
    if (!row) return DEFAULT_SEO
    return parse(row.data)
  } catch (error) {
    console.error('[settings] getSiteSeoDefaults failed — using defaults', error)
    return DEFAULT_SEO
  }
})
