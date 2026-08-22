/**
 * Admin-side reads for the project editor. Server-only — no `'use server'`,
 * these are plain functions the page awaits during render.
 *
 * `@/server/queries/projects` already returns the whole `ProjectDetail`
 * (unfiltered by publish status), but two columns the edit form needs are not
 * part of that public shape: `categoryId` and `order`. Everything here fills
 * that gap and gathers the option lists the block inspectors pick from.
 */

import { asc, eq, ne } from 'drizzle-orm'

import type {
  CategoryOption,
  MaterialOption,
  SceneOption,
  SiblingProjectOption,
} from '@/components/admin/project/contracts'
import { db } from '@/server/db'
import { categories, materials, projects, scenes } from '@/server/db/schema'
import { getMediaByIds } from '@/server/queries/media'
import type { MediaRef, ProjectDetail } from '@/types/content'

/* --------------------------------- project --------------------------------- */

/** The columns `ProjectDetail` does not carry, read straight off the row. */
export interface AdminProjectRow {
  categoryId: string | null
  order: number
  viewCount: number
  createdAt: Date
  updatedAt: Date
}

export async function getAdminProjectRow(id: string): Promise<AdminProjectRow | null> {
  try {
    const rows = await db
      .select({
        categoryId: projects.categoryId,
        order: projects.order,
        viewCount: projects.viewCount,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1)
    return rows[0] ?? null
  } catch (error) {
    console.error('[admin/projects] row read failed', error)
    return null
  }
}

/* --------------------------------- options --------------------------------- */

export type { CategoryOption, MaterialOption, SceneOption, SiblingProjectOption }

export async function listProjectCategories(): Promise<CategoryOption[]> {
  try {
    const rows = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories)
      .where(eq(categories.kind, 'project'))
      .orderBy(asc(categories.order), asc(categories.name))
    return rows
  } catch (error) {
    console.error('[admin/projects] categories read failed', error)
    return []
  }
}

export async function listMaterialOptions(): Promise<MaterialOption[]> {
  try {
    const rows = await db
      .select({ id: materials.id, name: materials.name, enabled: materials.enabled })
      .from(materials)
      .orderBy(asc(materials.order), asc(materials.name))
    return rows
  } catch (error) {
    console.error('[admin/projects] materials read failed', error)
    return []
  }
}

/** Every other project — the RELATED block may point at drafts on purpose. */
export async function listSiblingProjects(excludeId: string): Promise<SiblingProjectOption[]> {
  try {
    const rows = await db
      .select({ id: projects.id, title: projects.title, status: projects.status })
      .from(projects)
      .where(ne(projects.id, excludeId))
      .orderBy(asc(projects.title))
      .limit(300)
    return rows
  } catch (error) {
    console.error('[admin/projects] sibling projects read failed', error)
    return []
  }
}

/** Scenes the SCENE_3D inspector can point at, this project's ones first. */
export async function listSceneOptions(projectId: string): Promise<SceneOption[]> {
  try {
    const rows = await db
      .select({
        id: scenes.id,
        name: scenes.name,
        mode: scenes.mode,
        projectId: scenes.projectId,
        projectTitle: projects.title,
      })
      .from(scenes)
      .leftJoin(projects, eq(scenes.projectId, projects.id))
      .orderBy(asc(scenes.createdAt))
      .limit(300)

    const options: SceneOption[] = rows.map((row) => ({
      id: row.id,
      label: row.name ?? row.projectTitle ?? 'Cảnh chưa đặt tên',
      name: row.name,
      mode: row.mode,
      projectId: row.projectId,
      projectTitle: row.projectTitle,
    }))

    return options.sort((a, b) => {
      const mine = Number(b.projectId === projectId) - Number(a.projectId === projectId)
      return mine !== 0 ? mine : a.label.localeCompare(b.label, 'vi')
    })
  } catch (error) {
    console.error('[admin/projects] scenes read failed', error)
    return []
  }
}

/* ------------------------------- media index ------------------------------- */

function collectBlockMediaIds(project: ProjectDetail): string[] {
  const ids: string[] = []
  const push = (value: unknown): void => {
    if (typeof value === 'string' && value.trim().length > 0) ids.push(value)
  }

  for (const block of project.blocks) {
    switch (block.type) {
      case 'HERO':
      case 'IMAGE':
        push(block.data.mediaId)
        break
      case 'VIDEO':
        push(block.data.mediaId)
        push(block.data.poster)
        break
      case 'GALLERY':
      case 'MASONRY':
        if (Array.isArray(block.data.mediaIds)) block.data.mediaIds.forEach(push)
        break
      case 'BEFORE_AFTER':
        push(block.data.beforeMediaId)
        push(block.data.afterMediaId)
        break
      default:
        break
    }
  }

  return ids
}

/**
 * Every `MediaRef` the editor needs on first paint: the cover, the attached
 * gallery and anything the saved blocks already reference. New picks come back
 * from `MediaPickerDialog` already resolved, so the client only ever grows it.
 */
export async function getEditorMediaIndex(project: ProjectDetail): Promise<Record<string, MediaRef>> {
  const index: Record<string, MediaRef> = {}

  for (const item of project.gallery) index[item.id] = item
  if (project.cover) index[project.cover.id] = project.cover

  const missing = collectBlockMediaIds(project).filter((id) => !(id in index))
  if (missing.length === 0) return index

  try {
    const refs = await getMediaByIds([...new Set(missing)])
    for (const ref of refs) index[ref.id] = ref
  } catch (error) {
    console.error('[admin/projects] media index read failed', error)
  }

  return index
}
