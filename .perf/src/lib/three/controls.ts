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
import type { OrbitEnvelope } from '@/lib/three/coverage'

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

function finite(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

/**
 * The pose window the live controls will allow, when they publish one.
 *
 * `SceneCamera` computes these limits from the authored waypoints and hands
 * them to drei's `<OrbitControls>`; reading them back off the published
 * instance is how the relief learns the worst framing it has to survive
 * without `DepthScene` needing the scene config. Returns `null` for controls
 * with an open-ended envelope — nothing finite can be sized against `Infinity`.
 */
export function asOrbitEnvelope(value: unknown): OrbitEnvelope | null {
  if (typeof value !== 'object' || value === null) return null
  const c = value as Record<string, unknown>
  const maxDistance = finite(c.maxDistance)
  const minPolarAngle = finite(c.minPolarAngle)
  const maxPolarAngle = finite(c.maxPolarAngle)
  const minAzimuthAngle = finite(c.minAzimuthAngle)
  const maxAzimuthAngle = finite(c.maxAzimuthAngle)
  if (maxDistance === null || !(maxDistance > 0)) return null
  if (minPolarAngle === null || maxPolarAngle === null) return null
  if (minAzimuthAngle === null || maxAzimuthAngle === null) return null
  return { maxDistance, minPolarAngle, maxPolarAngle, minAzimuthAngle, maxAzimuthAngle }
}
