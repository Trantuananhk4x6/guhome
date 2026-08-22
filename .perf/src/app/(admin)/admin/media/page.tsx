/**
 * `/admin/media` — server half of the media library.
 *
 * Filters and paging live in the URL, so the list is fetched here and the client
 * shell only owns interaction state.
 */

import { asc } from 'drizzle-orm'
import type { Metadata } from 'next'

import { MediaLibrary } from '@/components/admin/media/MediaLibrary'
import { MEDIA_KINDS, type ProjectOption } from '@/components/admin/media/types'
import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import { projects } from '@/server/db/schema'
import { countMedia, listMedia, listMediaFolders, type MediaListOptions } from '@/server/queries/media'
import type { MediaKind } from '@/types/content'

export const metadata: Metadata = {
  title: 'Thư viện · GuHomes',
}

export const dynamic = 'force-dynamic'

const DEFAULT_TAKE = 120
const MAX_TAKE = 1200

type SearchParams = Record<string, string | string[] | undefined>

function single(params: SearchParams, key: string): string {
  const value = params[key]
  if (Array.isArray(value)) return value[0]?.trim() ?? ''
  return value?.trim() ?? ''
}

function readKind(params: SearchParams): MediaKind | '' {
  const raw = single(params, 'kind')
  return MEDIA_KINDS.find((kind) => kind === raw) ?? ''
}

function readTake(params: SearchParams): number {
  const parsed = Number.parseInt(single(params, 'take'), 10)
  if (!Number.isFinite(parsed)) return DEFAULT_TAKE
  return Math.min(Math.max(parsed, 24), MAX_TAKE)
}

export default async function AdminMediaPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await requireUser()

  const params = await searchParams
  const folder = single(params, 'folder')
  const kind = readKind(params)
  const q = single(params, 'q')
  const take = readTake(params)

  const filterOptions: MediaListOptions = {}
  if (folder) filterOptions.folder = folder
  if (kind) filterOptions.kind = kind
  if (q) filterOptions.search = q

  const [items, total, folders, projectRows] = await Promise.all([
    listMedia({ ...filterOptions, limit: take }),
    countMedia(filterOptions),
    listMediaFolders(),
    db
      .select({ id: projects.id, title: projects.title, slug: projects.slug, status: projects.status })
      .from(projects)
      .orderBy(asc(projects.title)),
  ])

  const projectOptions: ProjectOption[] = projectRows

  return (
    <MediaLibrary
      items={items}
      total={total}
      folders={folders}
      projects={projectOptions}
      filters={{ folder, kind, q, take }}
    />
  )
}
