/**
 * Admin-side navigation read. Server-only.
 *
 * `getNavigation()` in `@/server/queries/site` deliberately hides disabled rows
 * and nests children, which is right for the public chrome and wrong for an
 * editor — this read returns every row, flat, in stored order.
 */

import { asc, eq } from 'drizzle-orm'

import { db } from '@/server/db'
import { navigation } from '@/server/db/schema'
import type { NavDraftItem, NavLocation } from '@/components/admin/site/contracts'

export async function listNavigation(location: NavLocation): Promise<NavDraftItem[]> {
  try {
    const rows = await db
      .select({
        id: navigation.id,
        label: navigation.label,
        href: navigation.href,
        enabled: navigation.enabled,
      })
      .from(navigation)
      .where(eq(navigation.location, location))
      .orderBy(asc(navigation.order), asc(navigation.label))

    return rows.map((row) => ({ id: row.id, label: row.label, href: row.href, enabled: row.enabled }))
  } catch (error) {
    console.error(`[admin/navigation] listNavigation(${location}) failed`, error)
    return []
  }
}
