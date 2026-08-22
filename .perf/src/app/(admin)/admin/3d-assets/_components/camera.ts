'use client'

/**
 * Reads the live preview camera out of the running R3F root.
 *
 * `InteriorScene`'s contract (docs/ARCHITECTURE.md §6.4) has no camera-out
 * callback, so "chụp vị trí hiện tại" reaches the camera the only stable way
 * there is: `_roots`, the map `@react-three/fiber` keys by canvas element. The
 * module is imported lazily inside the handler, so nothing here pulls three or
 * R3F into the admin bundle up front.
 *
 * Everything is narrowed from `unknown` — a version bump that reshapes the store
 * degrades to "không đọc được camera", never to a crash.
 */

import type { Vec3 } from '@/types/content'

export interface CameraSnapshot {
  position: Vec3
  target: Vec3
  fov: number | null
}

interface Vector3Like {
  x: number
  y: number
  z: number
}

function field(value: unknown, key: string): unknown {
  if (!value || typeof value !== 'object') return undefined
  return (value as Record<string, unknown>)[key]
}

function isVector3Like(value: unknown): value is Vector3Like {
  const x = field(value, 'x')
  const y = field(value, 'y')
  const z = field(value, 'z')
  return typeof x === 'number' && typeof y === 'number' && typeof z === 'number'
}

function toVec3(value: Vector3Like): Vec3 {
  return [Number(value.x.toFixed(3)), Number(value.y.toFixed(3)), Number(value.z.toFixed(3))]
}

/**
 * Forward axis from the camera's world matrix (column-major, `-Z` local).
 * Avoids importing three just to build a Vector3.
 */
function forwardOf(camera: unknown): Vec3 | null {
  const elements = field(field(camera, 'matrixWorld'), 'elements')
  if (!Array.isArray(elements) || elements.length < 12) return null
  const values = elements as readonly unknown[]
  const x = values[8]
  const y = values[9]
  const z = values[10]
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') return null
  const length = Math.hypot(x, y, z) || 1
  return [-x / length, -y / length, -z / length]
}

/**
 * The preview camera's current transform, or `null` when no WebGL root is
 * mounted inside `container` (fallback image, disabled motion, still loading).
 */
export async function readPreviewCamera(container: HTMLElement | null): Promise<CameraSnapshot | null> {
  const canvas = container?.querySelector('canvas') ?? null
  if (!canvas) return null

  let state: unknown
  try {
    const fiber = await import('@react-three/fiber')
    const root = fiber._roots.get(canvas)
    state = root?.store.getState()
  } catch (error) {
    console.error('[3d-assets] could not reach the preview root', error)
    return null
  }
  if (!state) return null

  const camera = field(state, 'camera')
  const position = field(camera, 'position')
  if (!isVector3Like(position)) return null

  const rawFov = field(camera, 'fov')
  const fov = typeof rawFov === 'number' ? Number(rawFov.toFixed(2)) : null

  const controlsTarget = field(field(state, 'controls'), 'target')
  if (isVector3Like(controlsTarget)) {
    return { position: toVec3(position), target: toVec3(controlsTarget), fov }
  }

  const forward = forwardOf(camera)
  const distance = 4
  const target: Vec3 = forward
    ? [
        Number((position.x + forward[0] * distance).toFixed(3)),
        Number((position.y + forward[1] * distance).toFixed(3)),
        Number((position.z + forward[2] * distance).toFixed(3)),
      ]
    : [0, position.y, 0]

  return { position: toVec3(position), target, fov }
}
