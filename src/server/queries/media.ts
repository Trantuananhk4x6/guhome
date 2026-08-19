/**
 * Media queries. Server-only module — never import from a client component.
 *
 * Every other query module resolves its `MediaRef`s through `getMediaMap()`, so
 * one page render fetches each media row at most once (React `cache()` keyed by
 * the sorted id list).
 */

import { and, asc, count, desc, eq, ilike, inArray, or, type SQL } from 'drizzle-orm'
import { cache } from 'react'

import { toMediaRef } from '@/lib/media'
import { db } from '@/server/db'
import { media } from '@/server/db/schema'
import type { MediaKind, MediaRef } from '@/types/content'

/** A media row as shown in the admin library — `MediaRef` plus bookkeeping. */
export interface MediaLibraryItem extends MediaRef {
  storageKey: string
  folder: string | null
  mime: string | null
  bytes: number | null
  createdAt: Date
}

export interface MediaListOptions {
  kind?: MediaKind
  folder?: string
  /** Matches alt, caption, folder or storage key. */
  search?: string
  limit?: number
  offset?: number
}

type MaybeId = string | null | undefined

function uniqueIds(ids: readonly MaybeId[]): string[] {
  const set = new Set<string>()
  for (const id of ids) {
    if (typeof id === 'string' && id.length > 0) set.add(id)
  }
  return Array.from(set).sort()
}

/**
 * `cache()` memoises on argument identity, so the id list is flattened to a
 * stable string key before it is handed over.
 */
const loadMediaMap = cache(async (key: string): Promise<Map<string, MediaRef>> => {
  if (key.length === 0) return new Map<string, MediaRef>()
  const ids = key.split(',')
  const rows = await db.select().from(media).where(inArray(media.id, ids))
  return new Map(rows.map((row) => [row.id, toMediaRef(row)]))
})

/** Resolve many ids at once. Accepts nullable ids for convenience. */
export function getMediaMap(ids: readonly MaybeId[]): Promise<Map<string, MediaRef>> {
  return loadMediaMap(uniqueIds(ids).join(','))
}

/** Resolve ids, preserving the requested order. Missing ids are dropped. */
export async function getMediaByIds(ids: readonly MaybeId[]): Promise<MediaRef[]> {
  const map = await getMediaMap(ids)
  const out: MediaRef[] = []
  for (const id of ids) {
    if (typeof id !== 'string') continue
    const ref = map.get(id)
    if (ref) out.push(ref)
  }
  return out
}

export const getMediaById = cache(async (id: string): Promise<MediaRef | null> => {
  const map = await getMediaMap([id])
  return map.get(id) ?? null
})

function mediaFilters(options: MediaListOptions): SQL | undefined {
  const filters: SQL[] = []
  if (options.kind) filters.push(eq(media.kind, options.kind))
  if (options.folder) filters.push(eq(media.folder, options.folder))

  const term = options.search?.trim()
  if (term) {
    const like = `%${term}%`
    const match = or(
      ilike(media.alt, like),
      ilike(media.caption, like),
      ilike(media.folder, like),
      ilike(media.storageKey, like),
    )
    if (match) filters.push(match)
  }

  if (filters.length === 0) return undefined
  return filters.length === 1 ? filters[0] : and(...filters)
}

const loadMediaLibrary = cache(async (key: string): Promise<MediaLibraryItem[]> => {
  const options = JSON.parse(key) as MediaListOptions
  const rows = await db
    .select()
    .from(media)
    .where(mediaFilters(options))
    .orderBy(desc(media.createdAt), asc(media.storageKey))
    .limit(options.limit ?? 200)
    .offset(options.offset ?? 0)

  return rows.map((row) => ({
    ...toMediaRef(row),
    storageKey: row.storageKey,
    folder: row.folder,
    mime: row.mime,
    bytes: row.bytes,
    createdAt: row.createdAt,
  }))
})

/** Paged media library listing for the admin. */
export function listMedia(options: MediaListOptions = {}): Promise<MediaLibraryItem[]> {
  return loadMediaLibrary(JSON.stringify(options))
}

const loadMediaCount = cache(async (key: string): Promise<number> => {
  const options = JSON.parse(key) as MediaListOptions
  const rows = await db.select({ value: count() }).from(media).where(mediaFilters(options))
  return rows[0]?.value ?? 0
})

export function countMedia(options: MediaListOptions = {}): Promise<number> {
  return loadMediaCount(JSON.stringify(options))
}

/** Distinct, non-empty folder names — the left-hand nav of the media library. */
export const listMediaFolders = cache(async (): Promise<string[]> => {
  const rows = await db
    .selectDistinct({ folder: media.folder })
    .from(media)
    .orderBy(asc(media.folder))
  return rows
    .map((row) => row.folder)
    .filter((folder): folder is string => typeof folder === 'string' && folder.length > 0)
})
