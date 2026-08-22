/**
 * The parts of scene configuration that need three.js itself.
 *
 * `scene-settings.ts` is imported by the light shell of `InteriorScene` — the
 * part that runs on every visit, decides whether a canvas is warranted at all
 * and renders the photograph when it is not. A single `import … from 'three'`
 * anywhere in that module graph pulls 861 KB of renderer onto the arrival path
 * for code that may never draw a frame, so the four tone-mapping constants and
 * the texture helpers live here instead. Nothing in this file is reachable
 * without a canvas.
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
import type { SceneSettings } from '@/types/content'

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
