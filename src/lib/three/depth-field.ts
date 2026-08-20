/**
 * Relief fields for `DEPTH_2_5D`.
 *
 * A displaced plane tears wherever its displacement map has a step: the
 * triangles that bridge the step cannot disappear, they can only stretch. The
 * only reliable cure is to never hand the plane a step in the first place, so
 * every field this module returns is built at a deliberately tiny resolution
 * (≈128 px on the long side) and blurred several times on the way out. At that
 * resolution one texel spans dozens of screen pixels, the steepest possible
 * gradient across a plane segment is bounded, and the relief reads as a slow
 * swell rather than as cut-out layers.
 *
 * There are two entry points:
 *
 * - {@link buildReliefField} — no depth map available. It does **not** pretend
 *   to recover geometry; it builds a plausible interior swell out of cues that
 *   are smooth by construction (a vertical prior, a radial prior, image
 *   luminance, local detail density). The vertical prior deliberately matches
 *   `src/server/recon/depth/heuristic.ts` so the look does not jump when a
 *   project is later reprocessed. Re-implemented rather than imported: that
 *   module is server-only.
 * - {@link conditionDepthField} — a real depth map exists. Same downsample and
 *   smoothing pipeline, gentler blur, no priors: the measurement is trusted,
 *   it is only being made safe to displace with.
 *
 * Both are client-only — they need a 2D canvas.
 */

import { CanvasTexture, ClampToEdgeWrapping, LinearFilter, NoColorSpace } from 'three'

/** Long side of the sampled field when the relief is inferred from the photo. */
const INFERRED_RESOLUTION = 128
/** Long side when a real depth map is doing the work — it earns more detail. */
const MEASURED_RESOLUTION = 224

/** Cue weights. They sum to 1; the two priors carry most of the shape. */
const WEIGHT_VERTICAL = 0.42
const WEIGHT_RADIAL = 0.24
const WEIGHT_LUMA = 0.2
const WEIGHT_DETAIL = 0.14

/** How much the very top of the frame comes back toward the camera. */
const CEILING_RISE = 0.22
/** Floor-level nearness at the horizon itself. */
const HORIZON_NEARNESS = 0.12

export interface ReliefField {
  texture: CanvasTexture
  width: number
  height: number
}

/* --------------------------------- fields --------------------------------- */

interface Field {
  width: number
  height: number
  data: Float32Array
}

function createField(width: number, height: number): Field {
  return { width, height, data: new Float32Array(width * height) }
}

function at(field: Field, x: number, y: number): number {
  const cx = x < 0 ? 0 : x >= field.width ? field.width - 1 : x
  const cy = y < 0 ? 0 : y >= field.height ? field.height - 1 : y
  return field.data[cy * field.width + cx] ?? 0
}

/** Separable box blur with edge clamping. `radius` is in texels. */
function boxBlur(field: Field, radius: number): Field {
  if (radius < 1) return field
  const { width, height } = field
  const span = radius * 2 + 1
  const horizontal = createField(width, height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0
      for (let k = -radius; k <= radius; k++) sum += at(field, x + k, y)
      horizontal.data[y * width + x] = sum / span
    }
  }
  const vertical = createField(width, height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0
      for (let k = -radius; k <= radius; k++) sum += at(horizontal, x, y + k)
      vertical.data[y * width + x] = sum / span
    }
  }
  return vertical
}

/**
 * Rescales a field so that the given percentiles land on 0 and 1. Percentiles
 * rather than min/max: one blown highlight should not flatten everything else.
 */
function normalise(field: Field, low = 0.02, high = 0.98): Field {
  const sorted = Float32Array.from(field.data).sort()
  const lastIndex = sorted.length - 1
  if (lastIndex < 1) return field
  const min = sorted[Math.round(low * lastIndex)] ?? 0
  const max = sorted[Math.round(high * lastIndex)] ?? 1
  const range = max - min
  if (!(range > 1e-5)) {
    field.data.fill(0.5)
    return field
  }
  for (let i = 0; i < field.data.length; i++) {
    const value = ((field.data[i] ?? min) - min) / range
    field.data[i] = value < 0 ? 0 : value > 1 ? 1 : value
  }
  return field
}

/* ---------------------------------- cues ---------------------------------- */

/**
 * Nearness implied by vertical position alone. `t` is 0 at the top of the frame
 * and 1 at the bottom; `horizon` is the estimated horizon in the same units.
 * Mirrors `verticalPrior` in the server-side heuristic provider.
 */
export function verticalPrior(t: number, horizon: number): number {
  if (t >= horizon) {
    const k = (t - horizon) / Math.max(1e-3, 1 - horizon)
    return HORIZON_NEARNESS + (1 - HORIZON_NEARNESS) * Math.pow(k, 1.35)
  }
  const k = (horizon - t) / Math.max(1e-3, horizon)
  return HORIZON_NEARNESS + CEILING_RISE * Math.pow(k, 2.2)
}

/**
 * Where the room turns away from the camera, guessed from the row that carries
 * the most contrast — in an interior that is usually the far wall meeting the
 * furniture line. Clamped hard: a wrong horizon should tilt the swell slightly,
 * never invert it.
 */
function estimateHorizon(luma: Field): number {
  const { width, height } = luma
  let weighted = 0
  let total = 0
  for (let y = 1; y < height - 1; y++) {
    let energy = 0
    for (let x = 1; x < width - 1; x++) {
      const dx = at(luma, x + 1, y) - at(luma, x - 1, y)
      const dy = at(luma, x, y + 1) - at(luma, x, y - 1)
      energy += Math.abs(dx) + Math.abs(dy)
    }
    const t = (y + 0.5) / height
    weighted += energy * t
    total += energy
  }
  if (!(total > 1e-6)) return 0.46
  const centre = weighted / total
  return Math.min(0.62, Math.max(0.34, centre))
}

/**
 * Standing in a room, the surfaces at the edge of your vision are the ones
 * beside you and the middle of the frame is the far wall. A smooth radial ramp
 * is a crude statement of that and, unlike anything derived from pixels, it can
 * never introduce an edge.
 */
function radialPrior(x: number, y: number, width: number, height: number): number {
  const u = (x + 0.5) / width - 0.5
  const v = (y + 0.5) / height - 0.5
  const r = Math.min(1, Math.hypot(u * 2, v * 2) / Math.SQRT2)
  return r * r * (3 - 2 * r)
}

/* -------------------------------- sampling -------------------------------- */

/**
 * `Texture.image` is untyped, so the source is taken as `unknown` and proved
 * drawable here rather than asserted at every call site.
 */
function intrinsicSize(image: unknown): { width: number; height: number } | null {
  if (typeof image !== 'object' || image === null) return null
  const source = image as { naturalWidth?: unknown; naturalHeight?: unknown; width?: unknown; height?: unknown }
  const width = typeof source.naturalWidth === 'number' ? source.naturalWidth : source.width
  const height = typeof source.naturalHeight === 'number' ? source.naturalHeight : source.height
  if (typeof width !== 'number' || typeof height !== 'number') return null
  if (!(width > 0) || !(height > 0)) return null
  return { width, height }
}

/** Draws `image` into a small offscreen canvas and reads it back as luminance. */
function sampleLuminance(image: unknown, longSide: number): Field | null {
  const size = intrinsicSize(image)
  if (!size) return null
  const aspect = size.width / size.height
  const width = Math.max(8, Math.round(aspect >= 1 ? longSide : longSide * aspect))
  const height = Math.max(8, Math.round(aspect >= 1 ? longSide / aspect : longSide))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  try {
    ctx.drawImage(image as CanvasImageSource, 0, 0, width, height)
  } catch {
    // Not actually drawable, or still decoding. No relief, just the photograph.
    return null
  }

  let pixels: Uint8ClampedArray
  try {
    pixels = ctx.getImageData(0, 0, width, height).data
  } catch {
    // Tainted canvas — a cross-origin photo. Nothing to infer from.
    return null
  }

  const field = createField(width, height)
  for (let i = 0, p = 0; i < field.data.length; i++, p += 4) {
    const r = pixels[p] ?? 0
    const g = pixels[p + 1] ?? 0
    const b = pixels[p + 2] ?? 0
    field.data[i] = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  }
  return field
}

/* --------------------------------- output --------------------------------- */

/** Packs a 0..1 field into a greyscale `CanvasTexture` ready for a vertex fetch. */
function toTexture(field: Field): ReliefField {
  const { width, height } = field
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const image = ctx.createImageData(width, height)
    for (let i = 0, p = 0; i < field.data.length; i++, p += 4) {
      const value = Math.round((field.data[i] ?? 0.5) * 255)
      image.data[p] = value
      image.data[p + 1] = value
      image.data[p + 2] = value
      image.data[p + 3] = 255
    }
    ctx.putImageData(image, 0, 0)
  }
  const texture = new CanvasTexture(canvas)
  // Data, not colour: no sRGB decode, no mipmaps, and clamped so the taps the
  // vertex shader makes just outside the field return the border value.
  texture.colorSpace = NoColorSpace
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.generateMipmaps = false
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping
  texture.needsUpdate = true
  return { texture, width, height }
}

/**
 * A relief inferred from the photograph itself, for scenes with no depth map.
 *
 * Returns `null` when the image cannot be read (not decoded yet, or tainted);
 * callers should treat that as "no relief" and show the flat photograph, which
 * is a perfectly good outcome.
 */
export function buildReliefField(image: unknown, resolution = INFERRED_RESOLUTION): ReliefField | null {
  const luma = sampleLuminance(image, resolution)
  if (!luma) return null
  const { width, height } = luma

  const base = boxBlur(luma, 1)
  const wide = boxBlur(base, Math.max(2, Math.round(width / 12)))
  const horizon = estimateHorizon(base)

  // Detail density: how far the local tone strays from the wide average. Busy
  // regions are usually near the camera; flat regions are walls and sky.
  const detail = createField(width, height)
  for (let i = 0; i < detail.data.length; i++) {
    detail.data[i] = Math.min(1, Math.abs((base.data[i] ?? 0) - (wide.data[i] ?? 0)) * 4)
  }
  const detailSpread = normalise(boxBlur(detail, Math.max(2, Math.round(width / 18))))

  const combined = createField(width, height)
  for (let y = 0; y < height; y++) {
    const vertical = verticalPrior((y + 0.5) / height, horizon)
    for (let x = 0; x < width; x++) {
      const i = y * width + x
      combined.data[i] =
        WEIGHT_VERTICAL * vertical +
        WEIGHT_RADIAL * radialPrior(x, y, width, height) +
        WEIGHT_LUMA * (1 - (wide.data[i] ?? 0)) +
        WEIGHT_DETAIL * (detailSpread.data[i] ?? 0)
    }
  }

  // Two more wide passes. By here nothing in the field can change faster than
  // the blur radius allows, which is what keeps the mesh whole.
  const smoothed = boxBlur(boxBlur(combined, Math.max(2, Math.round(width / 20))), Math.max(1, Math.round(width / 40)))
  return toTexture(normalise(smoothed, 0.03, 0.97))
}

/**
 * A measured depth map, downsampled and smoothed until it is safe to displace
 * with. `strength` (0..1) mixes between a flat field and the measurement, so a
 * low-confidence map can be trusted less without a separate code path.
 */
export function conditionDepthField(image: unknown, strength = 1, resolution = MEASURED_RESOLUTION): ReliefField | null {
  const luma = sampleLuminance(image, resolution)
  if (!luma) return null
  const width = luma.width
  const smoothed = boxBlur(normalise(luma, 0.01, 0.99), Math.max(1, Math.round(width / 90)))
  const mix = Math.min(1, Math.max(0, strength))
  for (let i = 0; i < smoothed.data.length; i++) {
    smoothed.data[i] = 0.5 + ((smoothed.data[i] ?? 0.5) - 0.5) * mix
  }
  return toTexture(smoothed)
}
