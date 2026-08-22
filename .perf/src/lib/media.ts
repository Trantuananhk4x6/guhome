/**
 * Media URL helpers — pure, isomorphic. Safe to import from client components:
 * every import here is type-only and therefore erased at build time.
 *
 * Derivatives produced by `scripts/build-media.ts` live at
 *   public/media/<projectSlug>/<index>-<width>.webp
 * so a public URL is `/media/<projectSlug>/<index>-<width>.webp`, and
 * `media.storageKey` / `media.url` hold the base `<projectSlug>/<index>`
 * (no width, no extension).
 *
 * `mediaUrl()` is deliberately forgiving about a `url` that already carries a
 * `-<width>.webp` tail: that shape is written by older seeds (see
 * `docs/audit/audit-stack-db.md` item 10) and, taken literally, would pin every
 * consumer to a single derivative and empty out `mediaSrcSet()`. The tail is
 * stripped back to the base before the requested width is applied.
 */
import type { MediaRow } from '@/server/db/schema'
import type { MediaKind, MediaRef } from '@/types/content'

const WIDTHS = [400, 800, 1200, 1600, 2400] as const

/** Every derivative width the pipeline can emit, ascending. */
export const MEDIA_WIDTHS: readonly number[] = WIDTHS

/** Neutral limestone tile written by the media build; used when a ref is missing. */
export const MEDIA_PLACEHOLDER = '/media/placeholder.svg'

const SMALLEST: number = WIDTHS[0]
const LARGEST: number = WIDTHS[WIDTHS.length - 1] ?? WIDTHS[0]
const DEFAULT_REQUEST = 1600

/**
 * Kinds the raster pipeline emits a webp derivative set for. `POST /api/upload`
 * files a depth map or a texture under its own kind while still running it
 * through the derivative pipeline, so those two resolve exactly like an image.
 * A recon-produced depth PNG carries a real extension and is passed through
 * untouched by the `isConcreteFile` check below.
 */
const DERIVATIVE_KINDS: readonly MediaKind[] = ['image', 'depth', 'texture']

/** A URL that already points at a concrete file (has an extension on its last segment). */
const FILE_EXTENSION = /\.[a-z0-9]{2,5}$/i

/** `-1600.webp` and friends — a derivative suffix, not part of the base key. */
const DERIVATIVE_SUFFIX = new RegExp(`-(?:${WIDTHS.join('|')})\\.webp$`, 'i')

function isConcreteFile(url: string): boolean {
  const clean = url.split('?')[0] ?? url
  const segments = clean.split('/')
  const last = segments[segments.length - 1] ?? ''
  return FILE_EXTENSION.test(last)
}

/** Strip a trailing slash and any `-<width>.webp` derivative suffix. */
function baseOf(url: string): string {
  const stem = url.endsWith('/') ? url.slice(0, -1) : url
  return stem.replace(DERIVATIVE_SUFFIX, '')
}

/**
 * Widths that actually exist on disk for an image of `intrinsic` px wide.
 * The build never upscales, so it only emits widths <= the source width
 * (with the smallest width as a floor for very small sources).
 */
function availableWidths(intrinsic: number | null): readonly number[] {
  if (!intrinsic || intrinsic <= 0) return WIDTHS
  const fits = WIDTHS.filter((w) => w <= intrinsic)
  return fits.length > 0 ? fits : [SMALLEST]
}

/** Closest emitted width >= `requested`, falling back to the largest available. */
export function pickMediaWidth(requested: number | undefined, intrinsic: number | null = null): number {
  const pool = availableWidths(intrinsic)
  const target = requested && requested > 0 ? requested : DEFAULT_REQUEST
  const up = pool.find((w) => w >= target)
  if (up !== undefined) return up
  return pool[pool.length - 1] ?? LARGEST
}

/**
 * The derivative base for a ref, or `null` when the ref is not a raster row or
 * points at a concrete file that is not one of our derivatives.
 */
function derivativeBase(m: MediaRef): string | null {
  if (!DERIVATIVE_KINDS.includes(m.kind)) return null
  const base = m.url.trim()
  if (base.length === 0) return null
  const stem = baseOf(base)
  // Unchanged *and* already a file: something like `recon/<job>/depth.png`.
  if (stem === base && isConcreteFile(base)) return null
  return stem
}

/**
 * Public URL for a media ref at (at least) `width` px.
 * Non-raster kinds and refs that already carry a file extension are returned untouched.
 */
export function mediaUrl(m: MediaRef | null, width?: number): string {
  if (!m) return MEDIA_PLACEHOLDER
  const base = m.url.trim()
  if (base.length === 0) return MEDIA_PLACEHOLDER
  const stem = derivativeBase(m)
  if (stem === null) return base
  return `${stem}-${pickMediaWidth(width, m.width)}.webp`
}

/** `srcSet` string for every derivative that exists for this ref. */
export function mediaSrcSet(m: MediaRef | null): string {
  if (!m) return ''
  const stem = derivativeBase(m)
  if (stem === null) return ''
  return availableWidths(m.width)
    .map((w) => `${stem}-${w}.webp ${w}w`)
    .join(', ')
}

/** DB row -> serialisable ref handed to client components. */
export function toMediaRef(row: MediaRow): MediaRef {
  return {
    id: row.id,
    kind: row.kind,
    url: row.url,
    width: row.width,
    height: row.height,
    alt: row.alt,
    caption: row.caption,
    blurDataURL: row.blurDataUrl,
  }
}
