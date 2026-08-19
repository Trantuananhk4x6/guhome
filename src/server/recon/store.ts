/**
 * Where a job's input comes from and where its artefacts go.
 *
 * Artefacts are written through the configured `StorageDriver` (local disk in
 * development, S3 behind env) and registered in `media` so the admin library,
 * the scene editor and `getSceneById()` can all reference them by id.
 */
import { constants } from 'node:fs'
import { access, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { eq } from 'drizzle-orm'

import { serverEnv } from '@/lib/env'
import { db } from '@/server/db'
import { media, type MediaRow } from '@/server/db/schema'
import { contentTypeFor, storage } from '@/server/storage'
import type { MediaKind } from '@/types/content'

import { ReconError } from './types'

const DERIVATIVE_WIDTHS = [2400, 1600, 1200, 800, 400] as const

export interface ResolvedSource {
  row: MediaRow
  /** Absolute path to a file sharp can open. */
  path: string
  /** Set when the file was downloaded into a temp directory. */
  cleanup?: () => Promise<void>
}

async function exists(candidate: string): Promise<boolean> {
  try {
    await access(candidate, constants.R_OK)
    return true
  } catch {
    return false
  }
}

function localCandidates(row: MediaRow): string[] {
  const root = path.resolve(process.cwd(), serverEnv().STORAGE_LOCAL_ROOT)
  const out: string[] = []

  const url = row.url.trim()
  if (url.startsWith('/media/')) out.push(path.join(root, url.slice('/media/'.length)))
  if (url.startsWith('/') && !url.startsWith('/media/')) out.push(path.join(process.cwd(), 'public', url.slice(1)))

  // `media.storage_key` is `<slug>/<index>` for pipeline images: the widest
  // derivative that exists on disk is the best source for reconstruction.
  const key = row.storageKey.trim()
  if (key.length > 0 && !/\.[a-z0-9]{2,5}$/i.test(key)) {
    for (const width of DERIVATIVE_WIDTHS) out.push(path.join(root, `${key}-${width}.webp`))
  } else if (key.length > 0) {
    out.push(path.join(root, key))
  }

  return out
}

/**
 * Resolve the media row behind a job to a readable file. Order of preference:
 * the untouched original on the photo drive, then the widest published
 * derivative, then a download for remote (S3) storage.
 */
export async function resolveSourceImage(mediaId: string): Promise<ResolvedSource> {
  const rows = await db.select().from(media).where(eq(media.id, mediaId)).limit(1)
  const row = rows[0]
  if (!row) throw new ReconError(`Không tìm thấy ảnh nguồn (media ${mediaId}).`, 'SOURCE_NOT_FOUND')
  if (row.kind !== 'image') {
    throw new ReconError(`Media ${mediaId} không phải ảnh (kind=${row.kind}).`, 'SOURCE_NOT_IMAGE')
  }

  const original = row.sourcePath?.trim()
  if (original && original.length > 0 && (await exists(original))) {
    return { row, path: original }
  }

  for (const candidate of localCandidates(row)) {
    if (await exists(candidate)) return { row, path: candidate }
  }

  const url = row.url.trim()
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const response = await fetch(url)
    if (!response.ok) {
      throw new ReconError(`Không tải được ảnh nguồn từ ${url} (${response.status}).`, 'SOURCE_DOWNLOAD_FAILED')
    }
    const directory = await mkdtemp(path.join(tmpdir(), 'an-recon-'))
    const file = path.join(directory, 'source')
    await writeFile(file, Buffer.from(await response.arrayBuffer()))
    return { row, path: file, cleanup: () => rm(directory, { recursive: true, force: true }) }
  }

  throw new ReconError(
    `Không tìm thấy tệp ảnh cho media ${mediaId}. Chạy \`npm run media:build\` hoặc kiểm tra STORAGE_LOCAL_ROOT.`,
    'SOURCE_UNREADABLE',
  )
}

export interface StoreMediaInput {
  /** Storage key including extension, e.g. `recon/<jobId>/depth.png`. */
  key: string
  body: Buffer
  kind: MediaKind
  width?: number | null
  height?: number | null
  alt?: string | null
  caption?: string | null
  folder?: string | null
  mime?: string
}

/** Write one artefact and upsert its `media` row (idempotent across re-runs). */
export async function storeReconMedia(input: StoreMediaInput): Promise<MediaRow> {
  const mime = input.mime ?? contentTypeFor(input.key)
  const { url } = await storage().put(input.key, input.body, mime)

  const values = {
    kind: input.kind,
    storageKey: input.key,
    url,
    width: input.width ?? null,
    height: input.height ?? null,
    bytes: input.body.length,
    mime,
    alt: input.alt ?? null,
    caption: input.caption ?? null,
    folder: input.folder ?? 'recon',
  }

  const rows = await db
    .insert(media)
    .values(values)
    .onConflictDoUpdate({
      target: media.storageKey,
      set: {
        url: values.url,
        kind: values.kind,
        width: values.width,
        height: values.height,
        bytes: values.bytes,
        mime: values.mime,
        alt: values.alt,
        caption: values.caption,
        folder: values.folder,
      },
    })
    .returning()

  const row = rows[0]
  if (!row) throw new ReconError(`Không ghi được media cho ${input.key}.`, 'MEDIA_WRITE_FAILED')
  return row
}
