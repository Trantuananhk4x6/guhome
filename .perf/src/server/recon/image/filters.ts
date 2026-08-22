/**
 * Small, dependency-free image filters over `Field` (float, single channel).
 *
 * Everything is O(n) or O(n·k) with tiny constants: the pipeline runs on a
 * 384px working copy, so a full multi-cue pass is a few milliseconds.
 */
import type { Field } from './raw'

export function createField(width: number, height: number, fill = 0): Field {
  const data = new Float32Array(width * height)
  if (fill !== 0) data.fill(fill)
  return { data, width, height }
}

export function cloneField(field: Field): Field {
  return { data: Float32Array.from(field.data), width: field.width, height: field.height }
}

export function clamp01(value: number): number {
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

export function sampleAt(field: Field, x: number, y: number): number {
  const cx = x < 0 ? 0 : x >= field.width ? field.width - 1 : x
  const cy = y < 0 ? 0 : y >= field.height ? field.height - 1 : y
  return field.data[cy * field.width + cx] ?? 0
}

/**
 * Separable moving-average blur with edge clamping. `radius` is in pixels;
 * three passes approximate a gaussian closely enough for a depth prior.
 */
export function boxBlur(field: Field, radius: number): Field {
  const r = Math.max(0, Math.round(radius))
  if (r === 0) return cloneField(field)

  const { width, height } = field
  const horizontal = new Float32Array(width * height)
  const out = new Float32Array(width * height)

  for (let y = 0; y < height; y++) {
    const row = y * width
    let sum = 0
    let count = 0
    for (let x = -r; x <= r; x++) {
      if (x >= 0 && x < width) {
        sum += field.data[row + x] ?? 0
        count++
      }
    }
    for (let x = 0; x < width; x++) {
      horizontal[row + x] = count > 0 ? sum / count : 0
      const outgoing = x - r
      const incoming = x + r + 1
      if (outgoing >= 0) {
        sum -= field.data[row + outgoing] ?? 0
        count--
      }
      if (incoming < width) {
        sum += field.data[row + incoming] ?? 0
        count++
      }
    }
  }

  for (let x = 0; x < width; x++) {
    let sum = 0
    let count = 0
    for (let y = -r; y <= r; y++) {
      if (y >= 0 && y < height) {
        sum += horizontal[y * width + x] ?? 0
        count++
      }
    }
    for (let y = 0; y < height; y++) {
      out[y * width + x] = count > 0 ? sum / count : 0
      const outgoing = y - r
      const incoming = y + r + 1
      if (outgoing >= 0) {
        sum -= horizontal[outgoing * width + x] ?? 0
        count--
      }
      if (incoming < height) {
        sum += horizontal[incoming * width + x] ?? 0
        count++
      }
    }
  }

  return { data: out, width, height }
}

/** Three box passes ≈ a gaussian of the given sigma. */
export function smooth(field: Field, sigma: number): Field {
  if (sigma <= 0.3) return cloneField(field)
  const radius = Math.max(1, Math.round(sigma * 1.2))
  return boxBlur(boxBlur(boxBlur(field, radius), radius), radius)
}

/** Sobel gradient magnitude, edge-clamped. Values are unnormalised. */
export function gradientMagnitude(field: Field): Field {
  const { width, height } = field
  const out = new Float32Array(width * height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tl = sampleAt(field, x - 1, y - 1)
      const tc = sampleAt(field, x, y - 1)
      const tr = sampleAt(field, x + 1, y - 1)
      const ml = sampleAt(field, x - 1, y)
      const mr = sampleAt(field, x + 1, y)
      const bl = sampleAt(field, x - 1, y + 1)
      const bc = sampleAt(field, x, y + 1)
      const br = sampleAt(field, x + 1, y + 1)
      const gx = tr + 2 * mr + br - (tl + 2 * ml + bl)
      const gy = bl + 2 * bc + br - (tl + 2 * tc + tr)
      out[y * width + x] = Math.hypot(gx, gy)
    }
  }
  return { data: out, width, height }
}

/** Separate horizontal / vertical edge energy — the basis of horizon finding. */
export function directionalEnergy(field: Field): { horizontal: Field; vertical: Field } {
  const { width, height } = field
  const horizontal = new Float32Array(width * height)
  const vertical = new Float32Array(width * height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tl = sampleAt(field, x - 1, y - 1)
      const tc = sampleAt(field, x, y - 1)
      const tr = sampleAt(field, x + 1, y - 1)
      const ml = sampleAt(field, x - 1, y)
      const mr = sampleAt(field, x + 1, y)
      const bl = sampleAt(field, x - 1, y + 1)
      const bc = sampleAt(field, x, y + 1)
      const br = sampleAt(field, x + 1, y + 1)
      const gx = Math.abs(tr + 2 * mr + br - (tl + 2 * ml + bl))
      const gy = Math.abs(bl + 2 * bc + br - (tl + 2 * tc + tr))
      const index = y * width + x
      // A horizontal *line* has a strong vertical derivative and vice versa.
      horizontal[index] = Math.max(0, gy - gx)
      vertical[index] = Math.max(0, gx - gy)
    }
  }
  return {
    horizontal: { data: horizontal, width, height },
    vertical: { data: vertical, width, height },
  }
}

/** Square median filter, `radius` 1 (3×3) or 2 (5×5). Kills salt-and-pepper. */
export function medianFilter(field: Field, radius: number): Field {
  const r = Math.max(1, Math.min(3, Math.round(radius)))
  const { width, height } = field
  const out = new Float32Array(width * height)
  const window = new Float32Array((2 * r + 1) * (2 * r + 1))

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let n = 0
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          window[n++] = sampleAt(field, x + dx, y + dy)
        }
      }
      // Insertion sort: n is at most 49 and the window is nearly sorted between
      // neighbouring pixels, so this beats allocating and calling Array#sort.
      for (let i = 1; i < n; i++) {
        const value = window[i] ?? 0
        let j = i - 1
        while (j >= 0 && (window[j] ?? 0) > value) {
          window[j + 1] = window[j] ?? 0
          j--
        }
        window[j + 1] = value
      }
      out[y * width + x] = window[(n - 1) >> 1] ?? 0
    }
  }
  return { data: out, width, height }
}

export interface FieldStats {
  min: number
  max: number
  mean: number
  p05: number
  p50: number
  p95: number
  /** p95 − p05: how much usable depth range the estimate actually carries. */
  spread: number
  /** 32-bucket histogram over [min, max], normalised so the values sum to 1. */
  histogram: number[]
}

const HISTOGRAM_BINS = 32
const PERCENTILE_BINS = 1024

export function fieldStats(field: Field): FieldStats {
  const { data } = field
  if (data.length === 0) {
    return { min: 0, max: 0, mean: 0, p05: 0, p50: 0, p95: 0, spread: 0, histogram: [] }
  }

  let min = Infinity
  let max = -Infinity
  let sum = 0
  for (let i = 0; i < data.length; i++) {
    const value = data[i] ?? 0
    if (value < min) min = value
    if (value > max) max = value
    sum += value
  }
  const range = max - min
  const mean = sum / data.length

  const fine = new Uint32Array(PERCENTILE_BINS)
  const coarse = new Uint32Array(HISTOGRAM_BINS)
  for (let i = 0; i < data.length; i++) {
    const t = range > 0 ? ((data[i] ?? 0) - min) / range : 0
    const fineIndex = Math.min(PERCENTILE_BINS - 1, Math.max(0, Math.floor(t * PERCENTILE_BINS)))
    const coarseIndex = Math.min(HISTOGRAM_BINS - 1, Math.max(0, Math.floor(t * HISTOGRAM_BINS)))
    fine[fineIndex] = (fine[fineIndex] ?? 0) + 1
    coarse[coarseIndex] = (coarse[coarseIndex] ?? 0) + 1
  }

  const quantile = (q: number): number => {
    const target = q * data.length
    let seen = 0
    for (let i = 0; i < PERCENTILE_BINS; i++) {
      seen += fine[i] ?? 0
      if (seen >= target) return min + ((i + 0.5) / PERCENTILE_BINS) * range
    }
    return max
  }

  const p05 = quantile(0.05)
  const p50 = quantile(0.5)
  const p95 = quantile(0.95)

  return {
    min,
    max,
    mean,
    p05,
    p50,
    p95,
    spread: Math.max(0, p95 - p05),
    histogram: Array.from(coarse, (count) => count / data.length),
  }
}

/** Stretch [low, high] (percentile-clipped) to [0, 1]. Returns a new field. */
export function normaliseField(field: Field, lowQuantile = 0.02, highQuantile = 0.98): Field {
  const stats = fieldStats(field)
  const range = stats.max - stats.min
  if (range <= 1e-6) return createField(field.width, field.height, 0.5)

  // Re-derive the clip points at the requested quantiles from the same data.
  const sorted = Float32Array.from(field.data).sort()
  const at = (q: number): number => sorted[Math.min(sorted.length - 1, Math.max(0, Math.round(q * (sorted.length - 1))))] ?? 0
  const low = at(lowQuantile)
  const high = at(highQuantile)
  const span = high - low

  const out = new Float32Array(field.data.length)
  if (span <= 1e-6) {
    out.fill(0.5)
    return { data: out, width: field.width, height: field.height }
  }
  for (let i = 0; i < out.length; i++) {
    out[i] = clamp01(((field.data[i] ?? 0) - low) / span)
  }
  return { data: out, width: field.width, height: field.height }
}

/** Bilinear resample to an arbitrary size. */
export function resampleField(field: Field, outWidth: number, outHeight: number): Field {
  const out = new Float32Array(outWidth * outHeight)
  const sx = field.width / outWidth
  const sy = field.height / outHeight

  for (let y = 0; y < outHeight; y++) {
    const fy = Math.min(field.height - 1, Math.max(0, (y + 0.5) * sy - 0.5))
    const y0 = Math.floor(fy)
    const y1 = Math.min(field.height - 1, y0 + 1)
    const wy = fy - y0
    for (let x = 0; x < outWidth; x++) {
      const fx = Math.min(field.width - 1, Math.max(0, (x + 0.5) * sx - 0.5))
      const x0 = Math.floor(fx)
      const x1 = Math.min(field.width - 1, x0 + 1)
      const wx = fx - x0
      const a = field.data[y0 * field.width + x0] ?? 0
      const b = field.data[y0 * field.width + x1] ?? 0
      const c = field.data[y1 * field.width + x0] ?? 0
      const d = field.data[y1 * field.width + x1] ?? 0
      out[y * outWidth + x] = a * (1 - wx) * (1 - wy) + b * wx * (1 - wy) + c * (1 - wx) * wy + d * wx * wy
    }
  }
  return { data: out, width: outWidth, height: outHeight }
}

/** Row sums, normalised by width — the profile the horizon estimator reads. */
export function rowProfile(field: Field): Float32Array {
  const out = new Float32Array(field.height)
  for (let y = 0; y < field.height; y++) {
    let sum = 0
    for (let x = 0; x < field.width; x++) sum += field.data[y * field.width + x] ?? 0
    out[y] = sum / field.width
  }
  return out
}

/** Column sums, normalised by height. */
export function columnProfile(field: Field): Float32Array {
  const out = new Float32Array(field.width)
  for (let x = 0; x < field.width; x++) {
    let sum = 0
    for (let y = 0; y < field.height; y++) sum += field.data[y * field.width + x] ?? 0
    out[x] = sum / field.height
  }
  return out
}

/** In-place 1-D moving average over a profile. */
export function smoothProfile(profile: Float32Array, radius: number): Float32Array {
  const r = Math.max(1, Math.round(radius))
  const out = new Float32Array(profile.length)
  for (let i = 0; i < profile.length; i++) {
    let sum = 0
    let count = 0
    for (let k = -r; k <= r; k++) {
      const index = i + k
      if (index < 0 || index >= profile.length) continue
      sum += profile[index] ?? 0
      count++
    }
    out[i] = count > 0 ? sum / count : 0
  }
  return out
}
