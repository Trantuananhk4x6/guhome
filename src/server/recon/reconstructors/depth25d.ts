/**
 * `DEPTH_2_5D` — publish a depth map and the scene settings that make it read
 * as a room rather than as a wobbling photograph.
 *
 * The heavy lifting is the depth provider's (`../depth`); this module's job is
 * the part a provider cannot do: turn the *statistics* of the map into numbers
 * `DepthScene` can use. The published map is always percentile-normalised to
 * 0..1, so `stats.spread` (p95 − p05) is exactly "how much of that range the
 * photograph actually occupies". A map whose histogram piles up on one flat
 * wall has a small spread and needs a larger displacement multiplier to show
 * any relief; a map with continuous gradation needs less. Dividing a target
 * relief by the spread keeps the *apparent* depth constant across photographs,
 * which is what an operator expects when they queue ten images in a row.
 *
 * Nothing here writes job rows — `../run` owns the job lifecycle.
 */
import type { CameraWaypoint, ReconResult, SceneSettings } from '@/types/content'

import { estimateDepth, type DepthMap } from '../depth'
import { storeReconMedia } from '../store'
import { reconKey, type ReconInput, type Reconstructor } from '../types'

/**
 * World-space relief we aim for on the displaced plane. `DepthScene` defaults
 * `displacementScale` to 0.55 against a map that uses most of its range, so
 * 0.5 lands a well-exposed interior almost exactly on the studio default.
 */
const TARGET_RELIEF = 0.5
const MIN_DISPLACEMENT = 0.35
const MAX_DISPLACEMENT = 1.6
/** Below this the spread is noise, not signal — do not divide by it. */
const MIN_USABLE_SPREAD = 0.18

const MIN_SEGMENTS = 96
const MAX_SEGMENTS = 240
/** Roughly one segment per 3.2 published pixels on the map's short side. */
const PIXELS_PER_SEGMENT = 3.2

/** Furthest the dolly may travel from the opening framing, in world units. */
const DOLLY_TRAVEL = 1.85
/** `DepthScene`'s plane sits at z = 0; the studio default opens at z = 4.2. */
const DOLLY_START_Z = 4.2

const EASE_MAIN = 'power2.inOut'
const EASE_SETTLE = 'power3.out'

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

function round(value: number, places = 3): number {
  const factor = 10 ** places
  return Math.round(value * factor) / factor
}

/** Displacement, tessellation and pointer parallax implied by the map itself. */
export function settingsForDepthMap(map: DepthMap): SceneSettings {
  const spread = clamp(map.stats.spread, 0, 1)
  const usable = Math.max(MIN_USABLE_SPREAD, spread)

  const displacementScale = clamp(TARGET_RELIEF / usable, MIN_DISPLACEMENT, MAX_DISPLACEMENT)

  const shortSide = Math.min(map.width, map.height)
  const segments = Math.round(shortSide / PIXELS_PER_SEGMENT / 8) * 8
  const planeSegments = clamp(segments, MIN_SEGMENTS, MAX_SEGMENTS)

  // Parallax follows the relief, then is discounted by how much we trust the
  // estimate: a heuristic map that swings the plane hard reads as a bug.
  const trust = 0.6 + 0.4 * clamp(map.confidence, 0, 1)
  const parallaxStrength = clamp((0.08 + 0.1 * spread) * trust, 0.06, 0.28)

  return {
    displacementScale: round(displacementScale),
    planeSegments,
    parallaxStrength: round(parallaxStrength),
  }
}

/**
 * A shallow dolly toward the plane. No `fov` is set: the scene's own field of
 * view is the operator's choice and `resolveWaypoints` already falls back to
 * it, so suggesting one here would silently overwrite their framing.
 */
export function waypointsForDepthMap(map: DepthMap): CameraWaypoint[] {
  const spread = clamp(map.stats.spread, 0, 1)
  // A flat map cannot survive being pushed into; a deep one invites it.
  const push = 0.55 + 0.45 * spread
  const endZ = DOLLY_START_Z - DOLLY_TRAVEL * push
  const midZ = (DOLLY_START_Z + endZ) / 2

  return [
    { position: [0, 0, round(DOLLY_START_Z)], target: [0, 0, 0], at: 0, ease: EASE_MAIN, label: 'Mở khung' },
    {
      position: [0.22, 0.05, round(midZ)],
      target: [0.02, 0, 0],
      at: 0.55,
      ease: EASE_MAIN,
      label: 'Tiến vào',
    },
    {
      position: [-0.16, -0.04, round(endZ)],
      target: [-0.02, 0, 0],
      at: 1,
      ease: EASE_SETTLE,
      label: 'Cận cảnh',
    },
  ]
}

export const depth25dReconstructor: Reconstructor = {
  mode: 'DEPTH_2_5D',

  async run({ sourcePath, jobId, onProgress }: ReconInput): Promise<ReconResult> {
    const started = Date.now()
    onProgress(0.02)

    // The provider reports 0.05 → 0.95 of its own work; fold that into the
    // 0.04 → 0.86 band so storing the artefact still moves the bar.
    const map = await estimateDepth(sourcePath, (p) => onProgress(0.04 + clamp(p, 0, 1) * 0.82))
    onProgress(0.88)

    const row = await storeReconMedia({
      key: reconKey(jobId, 'depth.png'),
      body: map.png,
      kind: 'depth',
      width: map.width,
      height: map.height,
      alt: 'Bản đồ độ sâu dựng tự động',
      caption: `Độ sâu nghịch đảo (trắng = gần) — ${map.model}`,
    })
    onProgress(0.96)

    return {
      depthMediaId: row.id,
      suggestedSettings: settingsForDepthMap(map),
      suggestedWaypoints: waypointsForDepthMap(map),
      metrics: {
        durationMs: Date.now() - started,
        provider: map.model,
        confidence: round(map.confidence),
      },
    }
  },
}
