/**
 * Narrowing for whatever camera controls the scene has published.
 *
 * R3F types `RootState.controls` as a bare `EventDispatcher | null`, so anything
 * that needs the orbit pivot — the path driver handing the camera back, the pan
 * limiter keeping the visitor inside the room — has to prove at runtime that it
 * is looking at orbit-like controls. Keeping the guard here stops every consumer
 * inventing its own cast.
 */

import { Vector3 } from 'three'

export interface OrbitLikeControls {
  enabled: boolean
  /** The pivot the camera orbits, and the point a pan translates. */
  target: Vector3
  update: () => void
}

/** The controls object if it behaves like `OrbitControls`, otherwise `null`. */
export function asOrbitControls(value: unknown): OrbitLikeControls | null {
  if (typeof value !== 'object' || value === null) return null
  const candidate = value as { enabled?: unknown; target?: unknown; update?: unknown }
  if (typeof candidate.enabled !== 'boolean') return null
  if (!(candidate.target instanceof Vector3)) return null
  if (typeof candidate.update !== 'function') return null
  return candidate as unknown as OrbitLikeControls
}
