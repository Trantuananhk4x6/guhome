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
import { DEFAULT_EASE } from '@/lib/three/camera-path'

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

export interface ResolvedSceneSettings {
  displacementScale: number
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
  return {
    displacementScale: num(s.displacementScale, 0.55, 0, 4),
    planeSegments: Math.round(num(s.planeSegments, 160, 8, 512)),
    parallaxStrength: num(s.parallaxStrength, 0.12, 0, 1),
    roomWidth: num(s.roomWidth, 6.4, 1, 60),
    roomHeight: num(s.roomHeight, 3.1, 1, 30),
    roomDepth: num(s.roomDepth, 7.2, 1, 80),
    modelScale: num(s.modelScale, 1, 0.001, 1000),
    modelPosition: vec(s.modelPosition, ORIGIN),
    modelRotation: vec(s.modelRotation, ORIGIN),
    bloom: num(s.bloom, 0.28, 0, 3),
    vignette: num(s.vignette, 0.35, 0, 1),
    toneMapping: s.toneMapping ?? 'ACESFilmic',
    background: colour(s.background),
  }
}

/* -------------------------------- waypoints -------------------------------- */

/**
 * A slow dolly toward the far wall, used whenever a scene has no authored path.
 * Kept in one place so the camera rig, the path driver and the room geometry
 * all agree about where "inside the room" is.
 */
export function defaultWaypoints(config: SceneConfig): CameraWaypoint[] {
  const { roomDepth, roomHeight } = resolveSceneSettings(config.settings)
  const eye = Math.min(1.55, roomHeight * 0.5)
  const fov = config.fov > 1 ? config.fov : 45

  switch (config.mode) {
    case 'PROCEDURAL_3D':
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
    case 'DEPTH_2_5D':
      return [
        { position: [0, 0, 4.2], target: [0, 0, 0], fov, ease: DEFAULT_EASE },
        { position: [0.25, 0.06, 3.1], target: [0.02, 0, 0], fov: fov - 3, ease: DEFAULT_EASE },
        { position: [-0.18, -0.04, 2.35], target: [-0.02, 0, 0], fov: fov - 6, ease: 'power3.out' },
      ]
    default:
      return [
        { position: [3.4, 1.9, 4.6], target: [0, 0.9, 0], fov, ease: DEFAULT_EASE },
        { position: [0.6, 1.5, 3.4], target: [0, 0.85, 0], fov: fov - 4, ease: 'power3.out' },
      ]
  }
}

/** Authored waypoints when present, otherwise the studio default dolly. */
export function waypointsFor(config: SceneConfig): CameraWaypoint[] {
  return config.waypoints.length > 0 ? config.waypoints : defaultWaypoints(config)
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
