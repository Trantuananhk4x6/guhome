/**
 * Site-chrome queries: theme, homepage composition, navigation, services,
 * materials. Server-only module — never import from a client component.
 *
 * Contract: docs/ARCHITECTURE.md §6.5.
 *
 * These run on every request, including the very first one against a database
 * that has been migrated but not seeded. Each read therefore falls back to a
 * sensible default rather than throwing, so the site always renders.
 */

import { and, asc, desc, eq } from 'drizzle-orm'
import { cache } from 'react'

import { DEFAULT_APPEARANCE, readAppearance, type AppearanceConfig } from '@/lib/appearance'
import { DEFAULT_THEME } from '@/lib/theme'
import { db } from '@/server/db'
import {
  homepageSections,
  materials,
  navigation,
  services,
  themeSettings,
  type NavigationRow,
} from '@/server/db/schema'
import type {
  HomepageSection,
  HomepageSectionKey,
  MaterialItem,
  NavItem,
  ServiceItem,
  ThemeSettings,
} from '@/types/content'

import { getMediaMap } from './media'

export type NavLocation = 'header' | 'footer'

async function safeRead<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run()
  } catch (error) {
    console.error(`[queries/site] ${label} failed — falling back to defaults`, error)
    return fallback
  }
}

/* ---------------------------------- theme ---------------------------------- */

/**
 * The singleton theme row, merged over `DEFAULT_THEME` key by key so a partially
 * filled row (or a palette written before a new token existed) can never leave
 * the site with an undefined colour.
 */
/**
 * Which palette a visitor gets, and whether they may switch.
 *
 * A separate reader rather than a field on `ThemeSettings`, because that type
 * lives in the frozen `@/types/content` and this is not part of a palette — it
 * decides BETWEEN palettes.
 */
export const getAppearance = cache(async (): Promise<AppearanceConfig> => {
  return safeRead(
    'getAppearance',
    async () => {
      const rows = await db
        .select({ appearance: themeSettings.appearance })
        .from(themeSettings)
        .orderBy(desc(themeSettings.updatedAt))
        .limit(1)
      return readAppearance(rows[0]?.appearance)
    },
    DEFAULT_APPEARANCE,
  )
})

export const getThemeSettings = cache(async (): Promise<ThemeSettings> => {
  return safeRead(
    'getThemeSettings',
    async () => {
      const rows = await db
        .select()
        .from(themeSettings)
        .orderBy(desc(themeSettings.updatedAt))
        .limit(1)

      const row = rows[0]
      if (!row) return DEFAULT_THEME

      return {
        colors: { ...DEFAULT_THEME.colors, ...row.colors },
        typography: { ...DEFAULT_THEME.typography, ...row.typography },
        motion: { ...DEFAULT_THEME.motion, ...row.motion },
        brand: { ...DEFAULT_THEME.brand, ...row.brand },
      }
    },
    DEFAULT_THEME,
  )
})

/* -------------------------------- homepage --------------------------------- */

const HOMEPAGE_ORDER: readonly HomepageSectionKey[] = [
  'HERO',
  'FEATURED_PROJECTS',
  'STUDIO',
  'SERVICES',
  'IMMERSIVE_PROJECT',
  'PHILOSOPHY',
  'JOURNAL',
  'CTA',
]

function defaultHomepageSections(): HomepageSection[] {
  return HOMEPAGE_ORDER.map((key, index) => ({
    id: `default-${key.toLowerCase()}`,
    key,
    enabled: true,
    order: index,
    content: {},
    settings: {},
  }))
}

/** Ordered homepage composition. An unseeded database yields the full default stack. */
export const getHomepageSections = cache(async (): Promise<HomepageSection[]> => {
  return safeRead(
    'getHomepageSections',
    async () => {
      const rows = await db.select().from(homepageSections).orderBy(asc(homepageSections.order))
      if (rows.length === 0) return defaultHomepageSections()

      return rows.map((row) => ({
        id: row.id,
        key: row.key,
        enabled: row.enabled,
        order: row.order,
        content: row.content,
        settings: row.settings,
      }))
    },
    defaultHomepageSections(),
  )
})

/* ------------------------------- navigation -------------------------------- */

const DEFAULT_NAV: readonly { label: string; href: string }[] = [
  { label: 'Dự án', href: '/projects' },
  { label: 'Studio', href: '/studio' },
  { label: 'Dịch vụ', href: '/services' },
  { label: 'Nhật ký', href: '/journal' },
  { label: 'Liên hệ', href: '/contact' },
]

function defaultNavigation(location: NavLocation): NavItem[] {
  return DEFAULT_NAV.map((item, index) => ({
    id: `default-${location}-${index}`,
    label: item.label,
    href: item.href,
    order: index,
  }))
}

function nestNavigation(rows: readonly NavigationRow[]): NavItem[] {
  const byId = new Map<string, NavItem>()
  for (const row of rows) {
    byId.set(row.id, { id: row.id, label: row.label, href: row.href, order: row.order })
  }

  const roots: NavItem[] = []
  for (const row of rows) {
    const item = byId.get(row.id)
    if (!item) continue

    const parent = row.parentId ? byId.get(row.parentId) : undefined
    if (parent && parent !== item) {
      parent.children = [...(parent.children ?? []), item]
    } else {
      roots.push(item)
    }
  }

  const byOrder = (a: NavItem, b: NavItem): number => a.order - b.order
  for (const item of byId.values()) {
    if (item.children) item.children.sort(byOrder)
  }
  return roots.sort(byOrder)
}

export const getNavigation = cache(async (location: NavLocation): Promise<NavItem[]> => {
  return safeRead(
    `getNavigation(${location})`,
    async () => {
      const rows = await db
        .select()
        .from(navigation)
        .where(and(eq(navigation.location, location), eq(navigation.enabled, true)))
        .orderBy(asc(navigation.order))

      if (rows.length === 0) return defaultNavigation(location)
      return nestNavigation(rows)
    },
    defaultNavigation(location),
  )
})

/* ---------------------------- services & materials -------------------------- */

export const getServices = cache(async (): Promise<ServiceItem[]> => {
  return safeRead(
    'getServices',
    async () => {
      const rows = await db
        .select()
        .from(services)
        .where(eq(services.enabled, true))
        .orderBy(asc(services.order), asc(services.title))
      if (rows.length === 0) return []

      const mediaMap = await getMediaMap(rows.map((row) => row.coverMediaId))
      return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        indexLabel: row.indexLabel,
        title: row.title,
        summary: row.summary,
        description: row.description,
        cover: row.coverMediaId ? (mediaMap.get(row.coverMediaId) ?? null) : null,
        order: row.order,
      }))
    },
    [],
  )
})

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceItem | null> => {
  const all = await getServices()
  return all.find((service) => service.slug === slug) ?? null
})

export const getMaterials = cache(async (): Promise<MaterialItem[]> => {
  return safeRead(
    'getMaterials',
    async () => {
      const rows = await db
        .select()
        .from(materials)
        .where(eq(materials.enabled, true))
        .orderBy(asc(materials.order), asc(materials.name))
      if (rows.length === 0) return []

      const mediaMap = await getMediaMap(rows.map((row) => row.mediaId))
      return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        description: row.description,
        media: row.mediaId ? (mediaMap.get(row.mediaId) ?? null) : null,
        order: row.order,
      }))
    },
    [],
  )
})

/** Materials referenced by a MATERIALS block, in the order the block lists them. */
export async function getMaterialsByIds(ids: readonly string[]): Promise<MaterialItem[]> {
  if (ids.length === 0) return []
  const all = await getMaterials()
  const byId = new Map(all.map((item) => [item.id, item]))
  return ids
    .map((id) => byId.get(id))
    .filter((item): item is MaterialItem => item !== undefined)
}
