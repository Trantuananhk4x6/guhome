/**
 * Scene configuration helpers — defaulting, validation and small texture maths
 * shared by the scene components. Pure except for `createFadeTexture`, which
 * needs a DOM canvas and is therefore client-only.
 */

import {
  ACESFilmicToneMapping,
  AgXToneMapping,
  CanvasTexture,
  ClampToEdgeWrapping,
  LinearFilter,
  NeutralToneMapping,
  NoToneMapping,
  type Texture,
  type ToneMapping,
} from 'three'
import type { CameraWaypoint, SceneConfig, SceneSettings, Vec3 } from '@/types/content'
import { DEFAULT_EASE, DEFAULT_FOV } from '@/lib/three/camera-path'

/* ------------------------------- environment ------------------------------ */

/** The HDRIs drei ships presets for. Anything else falls back to our own rig. */
export const ENV_PRESETS = [
  'apartment',
  'city',
  'dawn',
  'forest',
  'lobby',
  'night',
  'park',
  'studio',
  'sunset',
  'warehouse',
] as const

export type EnvPreset = (typeof ENV_PRESETS)[number]

export function isEnvPreset(value: string | null | undefined): value is EnvPreset {
  if (!value) return false
  return (ENV_PRESETS as readonly string[]).includes(value)
}

/* ------------------------------- tone mapping ------------------------------ */

const TONE_MAPPINGS: Record<NonNullable<SceneSettings['toneMapping']>, ToneMapping> = {
  ACESFilmic: ACESFilmicToneMapping,
  AgX: AgXToneMapping,
  Neutral: NeutralToneMapping,
  None: NoToneMapping,
}

export function resolveToneMapping(name: SceneSettings['toneMapping']): ToneMapping {
  if (!name) return ACESFilmicToneMapping
  return TONE_MAPPINGS[name] ?? ACESFilmicToneMapping
}

/* --------------------------------- defaults -------------------------------- */

/* ---------------------------------- relief --------------------------------- */

/**
 * The framing a flat relief is composed for, in world units. The relief is a
 * plane at the origin; these are the camera poses it is sized to cover, and
 * {@link normaliseDepthWaypoints} rescales every authored path into them.
 *
 * **The span.** This used to be `4.6 → 4.05`: a 12% push, 0.55 world units,
 * spread over 200vh of pinned scroll. Measured on the seeded photography that
 * moves a feature at the relief's near face 5.5px relative to one at its far
 * face across the entire walk — under a tenth of the frame, and below the
 * threshold at which anyone reads it as a dolly rather than as a still. It is
 * the wrong kind of cautious: it buys nothing and costs the whole shot.
 *
 * `5.0 → 3.6` is 28%, and it is where the caution actually belongs. The relief
 * is at most 14% of the plane's height deep, so the parallax it can offer is
 * fixed; the further the camera travels the more parallax the eye *expects*,
 * and past roughly a third of the standoff the expectation outruns the supply
 * and the move starts reading as a photograph being zoomed. Measured the same
 * way, this span moves that same pair of features 17.6px — felt, unmistakably a
 * dolly, and still short of the point where the flatness announces itself.
 *
 * **The angles.** `sweep` and `rise` are tangents, not distances: an off-axis
 * *angle* is what rakes the plane and what a lateral move has to be scaled by,
 * and it is the quantity that stays meaningful when an editor authors a path in
 * a room 12m deep and it has to be replayed against a plane 5m away. 0.10 is a
 * touch under 6° — enough that the frame visibly travels across the photograph,
 * not enough to keystone it into a print hanging on a wall.
 *
 * **The references** are the authored boldness that earns the whole envelope. A
 * path that pushes 45% of its own longest standoff, or holds 20° off-axis, gets
 * all of it; a timid path gets proportionally less and *stays timid*, which is
 * the half of "keep the authoring" the old normaliser dropped.
 */
export const DEPTH_FRAME = {
  /** Camera distance from the relief at the widest framing. */
  start: 5,
  /** …and at the closest. */
  end: 3.6,
  /** Tangent of the largest rake the camera may hold on the plane. */
  sweep: 0.1,
  /** …and vertically, where a flat relief gives itself away sooner. */
  rise: 0.05,
  /** Authored push, relative to the path's own longest standoff, for the full span. */
  pushReference: 0.45,
  /** Authored off-axis tangent for the full `sweep`. */
  sweepReference: 0.36,
  /** …and for the full `rise`. */
  riseReference: 0.26,
  /**
   * How much of the drift the aim follows. Swinging the camera round a fixed
   * point would rake the plane at the full angle and flatten it; letting the
   * target travel with the eye keeps the relief nearly square-on while the
   * frame still travels across it.
   */
  aim: 0.4,
} as const

/**
 * Physical relief depth, as a fraction of the plane's height, for a given
 * `displacementScale` setting.
 *
 * The setting is a 0–4 knob in the database and used to be fed straight to
 * `meshStandardMaterial.displacementScale` in world units, where the seeded
 * 1.15 meant *a third of the frame height* of displacement — far past what any
 * inferred depth field can carry. It is now read as a relative amount and
 * saturates: even 4 stays inside a range where the smoothed field cannot tear.
 */
export function reliefDepthFor(displacementScale: number): number {
  const s = Math.max(0, displacementScale)
  return 0.14 * (1 - Math.exp(-s * 0.9))
}

/**
 * Depth-gradient thresholds for the relief shader, in field units per texel.
 * Displacement fades out from `soft` and fragments are dropped past `cut`, so a
 * genuine depth discontinuity punches a hole instead of stretching a triangle
 * across it. Tune here — `SceneSettings` is frozen, so they are not per-scene.
 *
 * The two profiles are not interchangeable. A measured depth map has real
 * occlusion cliffs and wants a tight threshold. An inferred field is smooth by
 * construction — measured against the seeded photography its steepest central
 * difference is ≈0.07 per texel — so a tight threshold there would silently
 * flatten the one part of the swell that was doing any work. Its thresholds sit
 * well clear of that and only ever catch a pathological photograph.
 */
export const RELIEF_EDGE = {
  inferred: { soft: 0.14, cut: 0.22 },
  measured: { soft: 0.055, cut: 0.1 },
} as const

export interface ResolvedSceneSettings {
  displacementScale: number
  /** `displacementScale` as a fraction of the plane height — see `reliefDepthFor`. */
  reliefDepth: number
  planeSegments: number
  parallaxStrength: number
  roomWidth: number
  roomHeight: number
  roomDepth: number
  modelScale: number
  modelPosition: Vec3
  modelRotation: Vec3
  bloom: number
  vignette: number
  toneMapping: NonNullable<SceneSettings['toneMapping']>
  background: string | null
}

const ORIGIN: Vec3 = [0, 0, 0]

function num(value: number | undefined, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback
  return Math.min(Math.max(value, min), max)
}

function vec(value: Vec3 | undefined, fallback: Vec3): Vec3 {
  if (!value) return fallback
  const [x, y, z] = value
  if (![x, y, z].every((n) => typeof n === 'number' && Number.isFinite(n))) return fallback
  return value
}

/** A colour three and CSS will both accept; anything else is discarded. */
function colour(value: string | undefined): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length === 0) return null
  return /^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([^)]*\)|hsla?\([^)]*\))$/i.test(trimmed) ? trimmed : null
}

/** Everything a scene component needs, with sane studio defaults applied. */
export function resolveSceneSettings(settings: SceneSettings | null | undefined): ResolvedSceneSettings {
  const s = settings ?? {}
  const displacementScale = num(s.displacementScale, 0.9, 0, 4)
  return {
    displacementScale,
    reliefDepth: reliefDepthFor(displacementScale),
    planeSegments: Math.round(num(s.planeSegments, 192, 8, 512)),
    parallaxStrength: num(s.parallaxStrength, 0.3, 0, 1),
    roomWidth: num(s.roomWidth, 6.4, 1, 60),
    roomHeight: num(s.roomHeight, 3.1, 1, 30),
    roomDepth: num(s.roomDepth, 7.2, 1, 80),
    modelScale: num(s.modelScale, 1, 0.001, 1000),
    modelPosition: vec(s.modelPosition, ORIGIN),
    modelRotation: vec(s.modelRotation, ORIGIN),
    bloom: num(s.bloom, 0.12, 0, 3),
    vignette: num(s.vignette, 0.3, 0, 1),
    toneMapping: s.toneMapping ?? 'ACESFilmic',
    background: colour(s.background),
  }
}

/* -------------------------------- waypoints -------------------------------- */

/**
 * One pose in the flat-relief envelope, from the two quantities that describe
 * it: how far the eye stands off the plane, and the tangents of the angles it
 * holds off the plane's normal. The eye and its target both travel, split by
 * {@link DEPTH_FRAME.aim}, so `position − target` comes out at exactly
 * `distance` with exactly the requested rake.
 */
function flatWaypoint(distance: number, sweepTan: number, riseTan: number, fov: number): CameraWaypoint {
  const offsetX = sweepTan * distance
  const offsetY = riseTan * distance
  const depth = Math.sqrt(Math.max(1e-4, distance * distance - offsetX * offsetX - offsetY * offsetY))
  const carry = 1 - DEPTH_FRAME.aim
  const eyeX = carry > 1e-4 ? offsetX / carry : offsetX
  const eyeY = carry > 1e-4 ? offsetY / carry : offsetY
  return {
    position: [eyeX, eyeY, depth],
    target: [eyeX * DEPTH_FRAME.aim, eyeY * DEPTH_FRAME.aim, 0],
    fov,
  }
}

/**
 * A slow dolly toward the far wall, used whenever a scene has no authored path.
 * Kept in one place so the camera rig, the path driver and the room geometry
 * all agree about where "inside the room" is.
 *
 * Flat-relief scenes get their default authored **in** {@link DEPTH_FRAME}
 * rather than in room coordinates, so `waypointsFor` can hand it straight on
 * without a normalising pass that would only measure it against itself.
 */
export function defaultWaypoints(config: SceneConfig): CameraWaypoint[] {
  const { roomDepth, roomHeight } = resolveSceneSettings(config.settings)
  const eye = Math.min(1.55, roomHeight * 0.5)
  const fov = config.fov > 1 ? config.fov : DEFAULT_FOV

  if (usesFlatRelief(config)) {
    const { start, end, sweep, rise } = DEPTH_FRAME
    return [
      { ...flatWaypoint(start, 0, rise * 0.4, fov), ease: DEFAULT_EASE },
      { ...flatWaypoint((start + end) / 2, sweep * 0.55, rise * 0.1, fov), ease: DEFAULT_EASE },
      { ...flatWaypoint(end, -sweep, -rise * 0.5, fov), ease: 'power3.out' },
    ]
  }

  if (config.mode === 'PROCEDURAL_3D') {
    return [
      { position: [0, eye, roomDepth * 0.46], target: [0, eye * 0.95, -roomDepth * 0.5], fov, ease: DEFAULT_EASE },
      {
        position: [0.35, eye * 1.02, roomDepth * 0.02],
        target: [0, eye * 0.92, -roomDepth * 0.5],
        fov: fov - 4,
        ease: DEFAULT_EASE,
      },
      {
        position: [-0.2, eye * 0.98, -roomDepth * 0.28],
        target: [0.1, eye * 0.9, -roomDepth * 0.5],
        fov: fov - 8,
        ease: 'power3.out',
      },
    ]
  }

  return [
    { position: [3.4, 1.9, 4.6], target: [0, 0.9, 0], fov, ease: DEFAULT_EASE },
    { position: [0.6, 1.5, 3.4], target: [0, 0.85, 0], fov: fov - 4, ease: 'power3.out' },
  ]
}

/** An authored per-waypoint field of view, when the editor actually set one. */
function authoredFov(point: CameraWaypoint, fallback: number): number {
  return typeof point.fov === 'number' && Number.isFinite(point.fov) && point.fov > 1 ? point.fov : fallback
}

/**
 * Rescales an authored camera path into the flat framing a relief needs.
 *
 * A flat-relief scene is a plane at the origin, not a room: a path authored in
 * room coordinates (`position [0, 1.9, 7.4]`, `target [0, 1.4, 0]` — which is
 * what the seeded scenes carry) aims the camera a metre and a half above the
 * relief and dollies most of the way through it, so the frame fills with
 * whatever is behind the plane. It has to be rewritten. The question is how
 * much of the editor's work survives the rewrite.
 *
 * The previous answer was: the leg count, `at`, `ease` and `label`, and nothing
 * else. Position, target and per-waypoint `fov` were thrown away and replaced
 * with an index ramp — `start + (end − start) × index / last` — so every path
 * on the site described the same move regardless of what was authored, and
 * `usesFlatRelief` is true for `DEPTH_2_5D` *and* for every `PROCEDURAL_3D`
 * scene still waiting on a GLB, which is nearly all of them. The waypoint
 * editor in `/admin/3d-assets` was a control that did nothing.
 *
 * What survives now is everything that can survive without breaking the
 * framing, expressed in the quantities that are meaningful against a plane:
 *
 * - **Rhythm.** Each leg's distance comes from that waypoint's *own* authored
 *   standoff, ranked within the path's range, so a fast approach that then
 *   settles arrives as a fast approach that settles. Not from its index.
 * - **Direction and relative boldness.** Lateral and vertical moves are read as
 *   off-axis *angles* and rescaled by one gain shared across the path, so a
 *   sweep left stays a sweep left, one waypoint that leans twice as far as
 *   another still leans twice as far, and a path that barely leaves the axis
 *   stays on it instead of being stretched to the edge of the envelope.
 * - **Lens.** `fov` is carried through per waypoint whenever it is finite and
 *   greater than 1; a rack from 45° to 32° is the editor's shot, not noise.
 * - **Timing.** `at`, `ease` and `label`, as before.
 */
export function normaliseDepthWaypoints(waypoints: readonly CameraWaypoint[], fov: number): CameraWaypoint[] {
  if (waypoints.length === 0) return []

  // Every authored waypoint as the studio actually composed it: how far the eye
  // stood from what it was looking at, and how far off that axis it stood.
  const authored = waypoints.map((point) => {
    const dx = point.position[0] - point.target[0]
    const dy = point.position[1] - point.target[1]
    const dz = point.position[2] - point.target[2]
    const range = Math.hypot(dx, dy, dz)
    const safe = range > 1e-4 ? range : 1
    return { point, range, sweep: dx / safe, rise: dy / safe }
  })

  let nearest = Number.POSITIVE_INFINITY
  let furthest = 0
  let boldestSweep = 0
  let boldestRise = 0
  for (const entry of authored) {
    if (entry.range < nearest) nearest = entry.range
    if (entry.range > furthest) furthest = entry.range
    boldestSweep = Math.max(boldestSweep, Math.abs(entry.sweep))
    boldestRise = Math.max(boldestRise, Math.abs(entry.rise))
  }

  const { start, end, sweep, rise, pushReference, sweepReference, riseReference } = DEPTH_FRAME

  // How much of the envelope this path has earned. A path that pushes hard gets
  // all of it; one that barely moves keeps its own restraint.
  const pushed = furthest > 1e-4 ? (furthest - nearest) / furthest : 0
  const span = (start - end) * Math.min(1, pushed / pushReference)
  const spread = furthest - nearest

  // One gain per axis, shared by every waypoint, so relative magnitudes survive.
  const sweepGain = boldestSweep > 1e-4 ? (Math.min(1, boldestSweep / sweepReference) / boldestSweep) * sweep : 0
  const riseGain = boldestRise > 1e-4 ? (Math.min(1, boldestRise / riseReference) / boldestRise) * rise : 0

  return authored.map((entry) => {
    const ranked = spread > 1e-4 ? (furthest - entry.range) / spread : 0
    const next = flatWaypoint(
      start - span * ranked,
      entry.sweep * sweepGain,
      entry.rise * riseGain,
      authoredFov(entry.point, fov),
    )
    if (typeof entry.point.at === 'number') next.at = entry.point.at
    if (entry.point.ease) next.ease = entry.point.ease
    if (entry.point.label) next.label = entry.point.label
    return next
  })
}

/**
 * True when the scene will be drawn as a flat relief rather than as geometry:
 * every `DEPTH_2_5D` scene, and every `PROCEDURAL_3D` scene whose recon job has
 * not (yet) produced a GLB, since all such a scene has is one photograph.
 *
 * Three things key off this — the camera framing below, the lighting rig and
 * the environment probe — and they must agree, so the test lives here.
 */
export function usesFlatRelief(config: SceneConfig): boolean {
  if (config.mode === 'DEPTH_2_5D') return true
  if (config.mode !== 'PROCEDURAL_3D') return false
  return !(config.model !== null && config.model.kind === 'glb')
}

/** Authored waypoints when present, otherwise the studio default dolly. */
export function waypointsFor(config: SceneConfig): CameraWaypoint[] {
  // The default already speaks whichever dialect this mode needs.
  if (config.waypoints.length === 0) return defaultWaypoints(config)
  if (!usesFlatRelief(config)) return config.waypoints
  return normaliseDepthWaypoints(config.waypoints, config.fov > 1 ? config.fov : DEFAULT_FOV)
}

/**
 * Portrait viewports crop a horizontally-framed room. Widening the vertical
 * FOV as the canvas narrows keeps the composition the editor authored on a
 * desktop roughly intact on a phone.
 */
export function portraitFovScale(aspect: number): number {
  if (!Number.isFinite(aspect) || aspect <= 0) return 1
  if (aspect >= 1) return 1
  return Math.min(1.55, 1 + (1 - aspect) * 0.55)
}

/* --------------------------------- textures -------------------------------- */

interface Sized {
  width: number
  height: number
}

function readSize(image: unknown): Sized | null {
  if (typeof image !== 'object' || image === null) return null
  if (!('width' in image) || !('height' in image)) return null
  const { width, height } = image as { width: unknown; height: unknown }
  if (typeof width !== 'number' || typeof height !== 'number') return null
  if (width <= 0 || height <= 0) return null
  return { width, height }
}

/** Aspect ratio of a loaded texture, or `fallback` while it is still decoding. */
export function textureAspect(texture: Texture | null | undefined, fallback = 1.5): number {
  const size = readSize(texture?.image)
  return size ? size.width / size.height : fallback
}

/**
 * `background-size: cover` for a texture: crops the long axis, keeps the photo
 * centred and never squashes a room.
 */
export function coverFit(texture: Texture, surfaceAspect: number, imageAspect = textureAspect(texture)): Texture {
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping
  texture.center.set(0.5, 0.5)
  if (imageAspect > surfaceAspect) {
    const repeatX = surfaceAspect / imageAspect
    texture.repeat.set(repeatX, 1)
    texture.offset.set((1 - repeatX) / 2, 0)
  } else {
    const repeatY = imageAspect / surfaceAspect
    texture.repeat.set(1, repeatY)
    texture.offset.set(0, (1 - repeatY) / 2)
  }
  texture.needsUpdate = true
  return texture
}

export type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'radial'

/**
 * A one-channel gradient used as an `alphaMap`, so a photo projected onto the
 * floor or a side wall dissolves instead of ending on a hard line.
 * Client-only — needs a 2D canvas.
 */
export function createFadeTexture(direction: FadeDirection = 'up', size = 256, softness = 0.85): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    let gradient: CanvasGradient
    if (direction === 'radial') {
      gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(Math.min(0.95, softness), 'rgba(255,255,255,0.35)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
    } else {
      const coords: Record<Exclude<FadeDirection, 'radial'>, [number, number, number, number]> = {
        up: [0, size, 0, 0],
        down: [0, 0, 0, size],
        left: [size, 0, 0, 0],
        right: [0, 0, size, 0],
      }
      const [x0, y0, x1, y1] = coords[direction]
      gradient = ctx.createLinearGradient(x0, y0, x1, y1)
      gradient.addColorStop(0, 'rgba(255,255,255,0)')
      gradient.addColorStop(1 - Math.min(0.95, softness), 'rgba(255,255,255,0.6)')
      gradient.addColorStop(1, 'rgba(255,255,255,1)')
    }
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }
  const texture = new CanvasTexture(canvas)
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.generateMipmaps = false
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping
  texture.needsUpdate = true
  return texture
}
