/**
 * Shared tail of every depth provider: clean up, resize, quantise, encode.
 * Keeping it here means the heuristic and the hosted model publish byte-for-byte
 * comparable artefacts (same convention, same bit depth, same smoothing).
 */
import { clamp01, fieldStats, medianFilter, normaliseField, resampleField, smooth } from '../image/filters'
import type { Field } from '../image/raw'
import { encodeGray16Png } from './png16'
import type { DepthMap, DepthProviderName } from './types'

/** Keep the top 12 bits of every 16-bit sample — see the quantisation note below. */
const SIGNIFICANT_BIT_MASK = 0xfff0

export interface FinaliseOptions {
  provider: DepthProviderName
  model: string
  confidence: number
  /** Longest side of the published PNG. */
  maxSide: number
  /** Skip the median pass for maps that already come out of a real model. */
  median?: boolean
}

export function finaliseDepth(nearField: Field, options: FinaliseOptions): DepthMap {
  const normalised = normaliseField(nearField, 0.02, 0.98)
  const cleaned = options.median === false ? normalised : medianFilter(normalised, 1)
  const stats = fieldStats(cleaned)

  const ratio = options.maxSide / Math.max(cleaned.width, cleaned.height)
  const targetWidth = Math.max(8, Math.round(cleaned.width * ratio))
  const targetHeight = Math.max(8, Math.round(cleaned.height * ratio))

  // Upsampling a 384px field to 1024px would show the working grid, so the
  // resample is followed by a light smooth — the map is a low-frequency signal
  // by nature and displacement reads better without stair-stepping.
  const resized = smooth(resampleField(cleaned, targetWidth, targetHeight), targetWidth / 220)

  // 12 significant bits inside the 16-bit container: four times finer than any
  // browser will decode, and it drops the published PNG from ~620 KB to ~180 KB
  // because the noisy low byte no longer defeats deflate.
  const pixels = new Uint16Array(resized.data.length)
  for (let i = 0; i < pixels.length; i++) {
    pixels[i] = Math.round(clamp01(resized.data[i] ?? 0) * 65535) & SIGNIFICANT_BIT_MASK
  }

  return {
    png: encodeGray16Png(pixels, resized.width, resized.height),
    width: resized.width,
    height: resized.height,
    provider: options.provider,
    model: options.model,
    confidence: Math.max(0, Math.min(1, options.confidence)),
    stats,
    field: cleaned,
  }
}
