/**
 * `POST /api/upload` — the admin media uploader.
 *
 * One file per request (the library posts each file separately so a single bad
 * upload never poisons the batch). Images go through the same sharp pipeline as
 * `scripts/build-media.ts`: the `MEDIA_WIDTHS` derivative set as webp plus a
 * 24px blur placeholder, written through `storage()`. Everything else is stored
 * verbatim under its own extension.
 *
 * Response: `{ ok: true, media: MediaItem }` or `{ ok: false, error }`.
 */

import { createHash } from 'node:crypto'

import { NextResponse } from 'next/server'
import sharp from 'sharp'

import { MEDIA_WIDTHS, toMediaRef } from '@/lib/media'
import { slugify } from '@/lib/utils'
import { getSession } from '@/server/auth'
import { db } from '@/server/db'
import { media } from '@/server/db/schema'
import { contentTypeFor, storage } from '@/server/storage'
import type { MediaItem } from '@/components/admin/media/types'
import type { MediaKind } from '@/types/content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* --------------------------------- limits --------------------------------- */

const MB = 1024 * 1024

type UploadGroup = 'image' | 'video' | 'model' | 'hdri'

interface GroupSpec {
  kind: MediaKind
  maxBytes: number
  /** Raster files are re-encoded into the derivative set; the rest are stored as-is. */
  raster: boolean
  mimes: readonly string[]
}

const GROUPS: Record<UploadGroup, GroupSpec> = {
  image: {
    kind: 'image',
    maxBytes: 12 * MB,
    raster: true,
    mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/tiff'],
  },
  video: {
    kind: 'video',
    maxBytes: 200 * MB,
    raster: false,
    mimes: ['video/mp4', 'video/webm', 'video/quicktime'],
  },
  model: {
    kind: 'glb',
    maxBytes: 80 * MB,
    raster: false,
    mimes: ['model/gltf-binary', 'model/gltf+json'],
  },
  hdri: {
    kind: 'hdri',
    maxBytes: 60 * MB,
    raster: false,
    mimes: ['image/vnd.radiance', 'image/x-exr', 'image/aces'],
  },
}

/** Extension decides the group — browsers send `application/octet-stream` for glb/hdr. */
const EXTENSION_GROUPS: Record<string, UploadGroup> = {
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  webp: 'image',
  avif: 'image',
  tif: 'image',
  tiff: 'image',
  mp4: 'video',
  webm: 'video',
  mov: 'video',
  m4v: 'video',
  glb: 'model',
  gltf: 'model',
  hdr: 'hdri',
  exr: 'hdri',
}

const GENERIC_MIMES = new Set(['', 'application/octet-stream', 'binary/octet-stream'])

/** Kinds an image upload may be filed under (a depth map is still a webp). */
const IMAGE_KIND_OVERRIDES: readonly MediaKind[] = ['image', 'depth', 'texture']

/* --------------------------------- pipeline -------------------------------- */

const WEBP_QUALITY = 82
const WEBP_EFFORT = 4
const BLUR_WIDTH = 24

function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase()
}

function baseNameOf(name: string): string {
  const clean = name.replace(/\\/g, '/').split('/').pop() ?? name
  const dot = clean.lastIndexOf('.')
  return dot === -1 ? clean : clean.slice(0, dot)
}

/** Derivative widths that exist for a source this wide — never upscaled. */
function targetWidths(sourceWidth: number): number[] {
  const fits = MEDIA_WIDTHS.filter((width) => width <= sourceWidth)
  if (fits.length > 0) return [...fits]
  const smallest = MEDIA_WIDTHS[0]
  return [smallest ?? 400]
}

/** EXIF orientations 5–8 swap the axes; `.rotate()` bakes that in. */
function orientedSize(width: number, height: number, orientation: number | undefined): [number, number] {
  return orientation !== undefined && orientation >= 5 ? [height, width] : [width, height]
}

function jsonError(error: string, status: number): NextResponse {
  return NextResponse.json({ ok: false, error }, { status })
}

function formatMb(bytes: number): string {
  return `${Math.round(bytes / MB)}MB`
}

function readString(form: FormData, key: string): string | null {
  const value = form.get(key)
  if (typeof value !== 'string') return null
  const clean = value.trim()
  return clean.length === 0 ? null : clean
}

/* ---------------------------------- route --------------------------------- */

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession()
  if (!session) return jsonError('Bạn cần đăng nhập để tải tệp lên.', 401)

  const declared = Number.parseInt(request.headers.get('content-length') ?? '', 10)
  if (Number.isFinite(declared) && declared > 200 * MB + MB) {
    return jsonError('Tệp vượt quá 200MB.', 413)
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return jsonError('Không đọc được dữ liệu tải lên.', 400)
  }

  const file = form.get('file')
  if (!(file instanceof File)) return jsonError('Thiếu tệp cần tải lên.', 400)
  if (file.size === 0) return jsonError('Tệp rỗng.', 400)

  const extension = extensionOf(file.name)
  const group = EXTENSION_GROUPS[extension]
  if (!group) {
    return jsonError(
      `Định dạng .${extension || '?'} không được hỗ trợ. Chấp nhận ảnh (jpg, png, webp, avif, tif), video (mp4, webm, mov), mô hình (glb, gltf) và HDRI (hdr, exr).`,
      415,
    )
  }

  const spec = GROUPS[group]
  const mime = file.type.toLowerCase()
  if (!GENERIC_MIMES.has(mime) && !spec.mimes.includes(mime)) {
    return jsonError(`Kiểu tệp ${mime} không khớp với phần mở rộng .${extension}.`, 415)
  }
  if (file.size > spec.maxBytes) {
    return jsonError(`Tệp ${formatMb(file.size)} vượt giới hạn ${formatMb(spec.maxBytes)} cho loại này.`, 413)
  }

  const requestedKind = readString(form, 'kind')
  let kind: MediaKind = spec.kind
  if (requestedKind && requestedKind !== spec.kind) {
    const override = IMAGE_KIND_OVERRIDES.find((value) => value === requestedKind)
    if (!spec.raster || !override) return jsonError(`Không thể lưu tệp này dưới dạng “${requestedKind}”.`, 400)
    kind = override
  }

  const folder = readString(form, 'folder')
  const alt = readString(form, 'alt')
  const caption = readString(form, 'caption')

  const buffer = Buffer.from(await file.arrayBuffer())
  const checksum = createHash('sha1').update(buffer).digest('hex')
  const prefix = `uploads/${slugify(folder ?? '') || 'chung'}`
  const stem = slugify(baseNameOf(file.name)) || 'tep'
  const base = `${prefix}/${stem}-${checksum.slice(0, 8)}`

  const driver = storage()

  let url: string
  let width: number | null = null
  let height: number | null = null
  let bytes = buffer.byteLength
  let blurDataUrl: string | null = null
  let storedMime = mime.length > 0 ? mime : contentTypeFor(`x.${extension}`)
  let storageKey: string

  try {
    if (spec.raster) {
      const pipeline = sharp(buffer, { failOn: 'none' }).rotate()
      const meta = await pipeline.metadata()
      if (!meta.width || !meta.height) return jsonError('Không đọc được kích thước ảnh.', 400)

      const [sourceWidth, sourceHeight] = orientedSize(meta.width, meta.height, meta.orientation)
      width = sourceWidth
      height = sourceHeight

      let largest = 0
      for (const target of targetWidths(sourceWidth)) {
        const derivative = await pipeline
          .clone()
          .resize({ width: target, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
          .toBuffer()
        await driver.put(`${base}-${target}.webp`, derivative, 'image/webp')
        largest = Math.max(largest, derivative.byteLength)
      }

      const blur = await pipeline
        .clone()
        .resize({ width: BLUR_WIDTH })
        .blur(1)
        .webp({ quality: 45, effort: WEBP_EFFORT })
        .toBuffer()

      bytes = largest
      blurDataUrl = `data:image/webp;base64,${blur.toString('base64')}`
      storedMime = 'image/webp'
      // No extension: `mediaUrl()` appends `-<width>.webp` per docs/ARCHITECTURE.md §6.1.
      storageKey = base
      url = driver.url(base)
    } else {
      storageKey = `${base}.${extension}`
      storedMime = contentTypeFor(storageKey)
      const written = await driver.put(storageKey, buffer, storedMime)
      url = written.url
    }
  } catch (error) {
    console.error('[api/upload] processing failed', error)
    return jsonError('Xử lý tệp thất bại. Kiểm tra lại tệp nguồn rồi thử lại.', 500)
  }

  try {
    const inserted = await db
      .insert(media)
      .values({
        kind,
        storageKey,
        url,
        width,
        height,
        bytes,
        mime: storedMime,
        blurDataUrl,
        alt,
        caption,
        folder,
        sourcePath: file.name,
        checksum,
      })
      .onConflictDoUpdate({
        target: media.storageKey,
        set: {
          kind,
          url,
          width,
          height,
          bytes,
          mime: storedMime,
          blurDataUrl,
          ...(alt ? { alt } : {}),
          ...(caption ? { caption } : {}),
          ...(folder ? { folder } : {}),
          checksum,
        },
      })
      .returning()

    const row = inserted[0]
    if (!row) return jsonError('Không lưu được tệp vào thư viện.', 500)

    const item: MediaItem = {
      ...toMediaRef(row),
      storageKey: row.storageKey,
      folder: row.folder,
      mime: row.mime,
      bytes: row.bytes,
      createdAt: row.createdAt,
    }

    return NextResponse.json({ ok: true, media: item }, { status: 201 })
  } catch (error) {
    console.error('[api/upload] database write failed', error)
    return jsonError('Không lưu được tệp vào thư viện.', 500)
  }
}
