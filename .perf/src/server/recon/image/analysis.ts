/**
 * Perspective analysis for single interior photographs.
 *
 * This is a heuristic, not a calibrated vanishing-point solver: we do not fit
 * line segments or run RANSAC. We read two cheap signals that are reliable on
 * the kind of photography this studio shoots (one-point-ish interiors, camera
 * roughly level, lens roughly 24–35mm):
 *
 *  - the **horizon row** is where horizontal-line energy peaks — the floor/wall
 *    and ceiling/wall junctions and furniture tops all pile up there;
 *  - the **vanishing column** is the quietest column inside the horizon band —
 *    the far wall is the flattest, least textured part of the frame.
 *
 * Both are centre-weighted, and when neither peak is prominent we fall back to
 * the frame centre, which is where an architectural photographer puts the
 * vanishing point anyway.
 */
import { columnProfile, directionalEnergy, gradientMagnitude, rowProfile, smooth, smoothProfile } from './filters'
import type { Field } from './raw'

export interface PerspectiveEstimate {
  /** Vanishing point in normalised image coordinates, origin top-left. */
  x: number
  y: number
  /** 0..1 — how prominent the peaks were. Below 0.25 we used the fallback. */
  confidence: number
  method: 'gradient' | 'fallback'
}

const FALLBACK: PerspectiveEstimate = { x: 0.5, y: 0.46, confidence: 0.2, method: 'fallback' }

/** The vanishing point must stay well inside the frame or the room box degenerates. */
const MIN_Y = 0.3
const MAX_Y = 0.68
const MIN_X = 0.3
const MAX_X = 0.7

function centreWeight(t: number, mu: number, sigma: number): number {
  const d = (t - mu) / sigma
  return Math.exp(-0.5 * d * d)
}

function prominence(profile: Float32Array, index: number): number {
  if (profile.length === 0) return 0
  let sum = 0
  let max = 0
  for (let i = 0; i < profile.length; i++) {
    const value = profile[i] ?? 0
    sum += value
    if (value > max) max = value
  }
  const mean = sum / profile.length
  const peak = profile[index] ?? 0
  if (max <= 1e-9 || mean <= 1e-9) return 0
  return Math.max(0, Math.min(1, (peak - mean) / (max - mean + 1e-9)))
}

export function estimatePerspective(gray: Field): PerspectiveEstimate {
  if (gray.width < 16 || gray.height < 16) return FALLBACK

  const base = smooth(gray, 1.2)
  const { horizontal } = directionalEnergy(base)

  /* ------------------------------- horizon -------------------------------- */

  const rows = smoothProfile(rowProfile(horizontal), Math.max(2, Math.round(gray.height / 48)))
  let bestRow = -1
  let bestRowScore = -Infinity
  for (let y = 0; y < rows.length; y++) {
    const t = (y + 0.5) / rows.length
    if (t < MIN_Y || t > MAX_Y) continue
    const score = (rows[y] ?? 0) * centreWeight(t, 0.47, 0.16)
    if (score > bestRowScore) {
      bestRowScore = score
      bestRow = y
    }
  }
  if (bestRow < 0) return FALLBACK
  const horizonY = (bestRow + 0.5) / rows.length
  const horizonConfidence = prominence(rows, bestRow)

  /* ---------------------------- vanishing column --------------------------- */

  const bandRadius = Math.max(2, Math.round(gray.height * 0.12))
  const bandTop = Math.max(0, bestRow - bandRadius)
  const bandBottom = Math.min(gray.height - 1, bestRow + bandRadius)
  const bandHeight = bandBottom - bandTop + 1

  const bandField: Field = {
    data: gradientMagnitude(base).data.slice(bandTop * gray.width, (bandBottom + 1) * gray.width),
    width: gray.width,
    height: bandHeight,
  }
  const columns = smoothProfile(columnProfile(bandField), Math.max(3, Math.round(gray.width / 24)))

  let quietest = -1
  let quietestScore = Infinity
  for (let x = 0; x < columns.length; x++) {
    const t = (x + 0.5) / columns.length
    if (t < MIN_X || t > MAX_X) continue
    // Divide by the centre weight so off-centre columns must be much quieter
    // than the middle before they win.
    const score = (columns[x] ?? 0) / Math.max(0.25, centreWeight(t, 0.5, 0.28))
    if (score < quietestScore) {
      quietestScore = score
      quietest = x
    }
  }

  let vanishingX = 0.5
  let columnConfidence = 0
  if (quietest >= 0) {
    const inverted = Float32Array.from(columns, (value) => -value)
    columnConfidence = prominence(inverted, quietest)
    const raw = (quietest + 0.5) / columns.length
    // Pull firmly toward the centre: the dip is a weak cue on its own.
    vanishingX = 0.5 + (raw - 0.5) * 0.55
  }

  const confidence = Math.max(0, Math.min(1, horizonConfidence * 0.7 + columnConfidence * 0.3))
  if (confidence < 0.25) return { ...FALLBACK, confidence }

  return {
    x: Math.min(MAX_X, Math.max(MIN_X, vanishingX)),
    y: Math.min(MAX_Y, Math.max(MIN_Y, horizonY)),
    confidence,
    method: 'gradient',
  }
}
