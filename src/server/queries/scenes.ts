/**
 * Scene queries. Server-only module — never import from a client component.
 *
 * Contract: docs/ARCHITECTURE.md §6.5. A `SceneConfig` is fully resolved: the
 * model / source / depth media are real `MediaRef`s, so `InteriorScene` can be
 * handed the object with no further lookups.
 */

import { asc, eq, inArray } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '@/server/db'
import { scenes, type SceneRow } from '@/server/db/schema'
import type { MediaRef, SceneConfig, SceneMode } from '@/types/content'

import { getMediaMap } from './media'

function toSceneConfig(row: SceneRow, mediaMap: Map<string, MediaRef>): SceneConfig {
  const ref = (id: string | null): MediaRef | null => (id ? (mediaMap.get(id) ?? null) : null)

  return {
    id: row.id,
    projectId: row.projectId,
    mode: row.mode,
    model: ref(row.modelMediaId),
    sourceImage: ref(row.sourceMediaId),
    depthMap: ref(row.depthMediaId),
    envPreset: row.envPreset,
    envIntensity: row.envIntensity,
    exposure: row.exposure,
    fov: row.fov,
    shadows: row.shadows,
    autoExplore: row.autoExplore,
    animationSpeed: row.animationSpeed,
    scrollSensitivity: row.scrollSensitivity,
    waypoints: row.waypoints ?? [],
    settings: row.settings ?? {},
  }
}

async function hydrate(row: SceneRow): Promise<SceneConfig> {
  const mediaMap = await getMediaMap([row.modelMediaId, row.sourceMediaId, row.depthMediaId])
  return toSceneConfig(row, mediaMap)
}

export const getSceneById = cache(async (id: string): Promise<SceneConfig | null> => {
  const rows = await db.select().from(scenes).where(eq(scenes.id, id)).limit(1)
  const row = rows[0]
  return row ? hydrate(row) : null
})

/** The project's scene — the oldest row wins when several exist. */
export const getSceneForProject = cache(async (projectId: string): Promise<SceneConfig | null> => {
  const rows = await db
    .select()
    .from(scenes)
    .where(eq(scenes.projectId, projectId))
    .orderBy(asc(scenes.createdAt))
    .limit(1)
  const row = rows[0]
  return row ? hydrate(row) : null
})

const loadSceneModes = cache(async (key: string): Promise<Map<string, SceneMode>> => {
  const modes = new Map<string, SceneMode>()
  if (key.length === 0) return modes

  const projectIds = key.split(',')
  const rows = await db
    .select({ projectId: scenes.projectId, mode: scenes.mode })
    .from(scenes)
    .where(inArray(scenes.projectId, projectIds))
    .orderBy(asc(scenes.createdAt))

  for (const row of rows) {
    if (!row.projectId) continue
    // First row per project wins, matching getSceneForProject().
    if (!modes.has(row.projectId)) modes.set(row.projectId, row.mode)
  }
  return modes
})

/**
 * Scene mode per project, for list views that must know whether a project has an
 * immersive scene without loading the whole config. Projects without a scene are
 * simply absent from the map (callers fall back to `'NONE'`).
 */
export function getSceneModesByProject(projectIds: readonly string[]): Promise<Map<string, SceneMode>> {
  const unique = Array.from(new Set(projectIds.filter((id) => id.length > 0))).sort()
  return loadSceneModes(unique.join(','))
}

/** Every scene attached to a project, ordered — used by the admin 3D asset list. */
export const getScenesForProject = cache(async (projectId: string): Promise<SceneConfig[]> => {
  const rows = await db
    .select()
    .from(scenes)
    .where(eq(scenes.projectId, projectId))
    .orderBy(asc(scenes.createdAt))
  if (rows.length === 0) return []

  const mediaMap = await getMediaMap(
    rows.flatMap((row) => [row.modelMediaId, row.sourceMediaId, row.depthMediaId]),
  )
  return rows.map((row) => toSceneConfig(row, mediaMap))
})
