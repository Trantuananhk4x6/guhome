/**
 * Heuristic monocular depth — the default provider, no network required.
 *
 * ⚠ Be honest about what this is: it is **not** learned monocular depth. There
 * is no network, no scale, no metric meaning. It is a weighted combination of
 * three cues that correlate with depth in the kind of interior photography this
 * studio publishes, smoothed hard so it behaves well as a displacement map:
 *
 *  1. **Focus / local contrast** — gradient energy blurred over a large radius.
 *     Photographers shoot interiors at f/5.6–f/11 with the subject in focus, so
 *     detail density is a usable proxy for "close to the camera". It fails on a
 *     flat, sharply lit far wall (reads as far, correctly by luck) and on a
 *     blurred foreground plant (reads as far, incorrectly).
 *  2. **Luminance** — bright regions are usually windows, skylights and the lit
 *     end of a room, i.e. far. Weakest of the three, weighted accordingly, and
 *     the reason a photo with a bright near-field cushion loses some relief.
 *  3. **Vertical position prior** — the bottom of the frame is the floor at the
 *     photographer's feet (near); depth grows toward the horizon; above the
 *     horizon the ceiling comes back slightly (it is overhead, not far away).
 *     The horizon is estimated per image rather than assumed.
 *
 * The result is a plausible, stable relief that makes a 2.5D parallax scene
 * read like a room. For true geometry set `DEPTH_PROVIDER=replicate`.
 */
import { estimatePerspective } from '../image/analysis'
import { boxBlur, clamp01, createField, gradientMagnitude, normaliseField, smooth } from '../image/filters'
import { loadGrayField, type Field } from '../image/raw'
import { ANALYSIS_MAX_SIDE, DEPTH_MAX_SIDE } from '../types'
import { finaliseDepth } from './common'
import type { DepthMap, DepthProvider } from './types'

const WEIGHT_FOCUS = 0.34
const WEIGHT_LUMA = 0.2
const WEIGHT_PRIOR = 0.46

/** How much the very top of the frame comes back toward the camera. */
const CEILING_RISE = 0.22
/** Floor-level nearness at the horizon itself. */
const HORIZON_NEARNESS = 0.12

/**
 * Nearness implied by vertical position alone. `t` is 0 at the top of the frame
 * and 1 at the bottom; `horizon` is the estimated horizon in the same units.
 */
export function verticalPrior(t: number, horizon: number): number {
  if (t >= horizon) {
    const k = (t - horizon) / Math.max(1e-3, 1 - horizon)
    return HORIZON_NEARNESS + (1 - HORIZON_NEARNESS) * Math.pow(k, 1.35)
  }
  const k = (horizon - t) / Math.max(1e-3, horizon)
  return HORIZON_NEARNESS + CEILING_RISE * Math.pow(k, 2.2)
}

function priorField(width: number, height: number, horizon: number): Field {
  const field = createField(width, height)
  for (let y = 0; y < height; y++) {
    const value = verticalPrior((y + 0.5) / height, horizon)
    for (let x = 0; x < width; x++) field.data[y * width + x] = value
  }
  return field
}

export const heuristicDepthProvider: DepthProvider = {
  name: 'heuristic',

  async estimate(sourcePath: string, onProgress: (p: number) => void): Promise<DepthMap> {
    onProgress(0.05)
    const gray = await loadGrayField(sourcePath, ANALYSIS_MAX_SIDE)
    const { width, height } = gray
    onProgress(0.15)

    /* -------------------------- cue 1: focus energy ------------------------ */

    const edges = gradientMagnitude(smooth(gray, 0.8))
    // A large radius turns "edges" into "how busy is this region", which is the
    // signal we actually want: surfaces, not outlines.
    const focus = normaliseField(boxBlur(edges, Math.max(3, Math.round(width / 26))), 0.05, 0.97)
    onProgress(0.35)

    /* --------------------------- cue 2: luminance -------------------------- */

    const luma = normaliseField(smooth(gray, 1.4), 0.03, 0.97)
    onProgress(0.45)

    /* ------------------------ cue 3: vertical position --------------------- */

    const perspective = estimatePerspective(gray)
    const prior = priorField(width, height, perspective.y)
    onProgress(0.6)

    /* ------------------------------- combine ------------------------------- */

    const combined = createField(width, height)
    for (let i = 0; i < combined.data.length; i++) {
      const value =
        WEIGHT_FOCUS * (focus.data[i] ?? 0) +
        WEIGHT_LUMA * (1 - (luma.data[i] ?? 0)) +
        WEIGHT_PRIOR * (prior.data[i] ?? 0)
      combined.data[i] = clamp01(value)
    }
    onProgress(0.72)

    // Surfaces must stay flat: mix a heavily blurred copy back in so texture
    // (rugs, tiles, wood grain) does not become geometry.
    const wide = boxBlur(combined, Math.max(6, Math.round(width / 9)))
    const mid = boxBlur(combined, Math.max(2, Math.round(width / 40)))
    const merged = createField(width, height)
    for (let i = 0; i < merged.data.length; i++) {
      merged.data[i] = clamp01(0.22 * (combined.data[i] ?? 0) + 0.38 * (mid.data[i] ?? 0) + 0.4 * (wide.data[i] ?? 0))
    }
    onProgress(0.85)

    const map = finaliseDepth(merged, {
      provider: 'heuristic',
      model: 'heuristic-multicue-v1',
      maxSide: DEPTH_MAX_SIDE,
      confidence: 0,
    })
    onProgress(0.95)

    // Confidence: a map with real range and a confidently placed horizon is
    // worth more than a flat one. Capped well below a learned model's.
    const confidence = Math.max(
      0.18,
      Math.min(0.72, 0.3 + map.stats.spread * 0.45 + perspective.confidence * 0.18),
    )

    return { ...map, confidence }
  },
}
