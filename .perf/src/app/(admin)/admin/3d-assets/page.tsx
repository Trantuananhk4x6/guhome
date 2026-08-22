/**
 * `/admin/3d-assets` — server half of the 3D asset manager.
 *
 * `SceneManager` draws its own masthead (eyebrow, `<h1>`, tab nav), so this page
 * returns it bare: no wrapper div, no `AdminPageHeader`, no second `<h1>`. Same
 * shape as `/admin/media`.
 *
 * three / R3F never reach this module. `SceneManager` → `SceneEditor` →
 * `ScenePreview` is the only path to the 3D system, and `ScenePreview` pulls
 * `InteriorScene` through `next/dynamic({ ssr: false })` (ARCHITECTURE §8), so
 * the server bundle stops at the client boundary.
 *
 * `Date` fields on `SceneListItem` / `ReconJobItem` cross the boundary as-is —
 * Next serialises them, and `formatTimestamp` on the client expects a `Date`.
 */

import { asc } from 'drizzle-orm'
import type { Metadata } from 'next'

import type { ProjectOption } from '@/components/admin/media/types'
import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import { projects } from '@/server/db/schema'
import { fetchReconJobs, fetchScenes } from '@/server/actions/scenes'

import { SceneManager } from './_components/SceneManager'

export const metadata: Metadata = { title: 'Không gian ba chiều' }

export const dynamic = 'force-dynamic'

export default async function AdminSceneAssetsPage() {
  await requireUser()

  const [scenes, jobs, projectRows] = await Promise.all([
    fetchScenes(),
    fetchReconJobs(),
    db
      .select({ id: projects.id, title: projects.title, slug: projects.slug, status: projects.status })
      .from(projects)
      .orderBy(asc(projects.title)),
  ])

  const projectOptions: ProjectOption[] = projectRows

  return <SceneManager scenes={scenes} jobs={jobs} projects={projectOptions} />
}
