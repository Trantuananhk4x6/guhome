'use client'

import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type JSX } from 'react'
import { PerspectiveCamera as PerspectiveCameraImpl, Vector3 } from 'three'
import type { SceneConfig, Vec3 } from '@/types/content'
import { FALLBACK_WAYPOINT, resolveWaypoints, type ResolvedWaypoint } from '@/lib/three/camera-path'
import { asOrbitControls } from '@/lib/three/controls'
import { portraitFovScale, resolveSceneSettings, usesFlatRelief, waypointsFor } from '@/lib/three/scene-settings'

export interface SceneCameraProps {
  config: SceneConfig
  mode: 'scroll' | 'orbit'
  /**
   * True while `CameraPath` owns the camera. The controls stay mounted — drei
   * publishes `state.controls`, which the admin's "chụp vị trí camera" reads,
   * and keeping them live is what lets the visitor's first gesture take the
   * camera back mid-walk — but the pan limiter stands down, because the
   * authored path is allowed to leave the visitor's pan envelope.
   */
  pathDriven?: boolean
}

/* ------------------------------ orbit envelope ----------------------------- */

interface OrbitLimits {
  minDistance: number
  maxDistance: number
  minPolarAngle: number
  maxPolarAngle: number
  minAzimuthAngle: number
  maxAzimuthAngle: number
}

const TWO_PI = Math.PI * 2

/**
 * How much freedom a *flat relief* gets, on top of whatever its authored path
 * already uses.
 *
 * A plane cannot be orbited like a room, for two independent reasons that both
 * bite at the same angle. It stops reading as a space and starts reading as a
 * print on a wall — the whole point of `DEPTH_2_5D` is that the visitor never
 * quite works out it is looking at a photograph — and the plane has to be large
 * enough to cover every frustum the envelope permits, which for an oblique view
 * means a trapezium running away from the camera. Measured against the seeded
 * scenes, the room-shaped envelope (±48° of azimuth, out to 1.7× the authored
 * standoff) demands a relief **16.6×** the width of the resting framing; since
 * the photograph is mapped onto that plane, paying it would leave the visitor
 * looking at 5% of the picture. These are the angles where both problems stay
 * small: the relief only has to be ~1.3× oversized, and the rake never gets far
 * enough to keystone the image.
 */
const FLAT_RELIEF = {
  /** Extra azimuth each way, in radians (≈12°). */
  azimuth: 0.21,
  /** Extra polar each way (≈8°). Vertical rake gives a plane away sooner. */
  polar: 0.14,
  /** Dolly-out ceiling, as a multiple of the furthest authored standoff. */
  dollyOut: 1.06,
  /** Dolly-in floor, likewise — "cuộn để tiến lại gần" is the promised move. */
  dollyIn: 0.46,
} as const

/** Shortest signed angle in (−π, π] — keeps azimuth ranges from wrapping. */
function wrapPi(angle: number): number {
  const wrapped = (((angle + Math.PI) % TWO_PI) + TWO_PI) % TWO_PI
  return wrapped - Math.PI
}

/**
 * Orbit limits derived from the framing the editor authored, so every project
 * gets a sane envelope without anyone having to think in radians.
 *
 * The envelope covers **every** waypoint, not just the first: the auto-explore
 * walk ends wherever it ends, and the moment the visitor grabs the controls
 * `update()` clamps the live pose. A window sized to waypoint 0 alone would
 * yank the camera on handover.
 */
function orbitEnvelope(points: readonly ResolvedWaypoint[], roomDepth: number, flat: boolean): OrbitLimits {
  const head = points[0] ?? FALLBACK_WAYPOINT
  const base = Math.atan2(head.position[0] - head.target[0], head.position[2] - head.target[2])

  let nearest = Number.POSITIVE_INFINITY
  let furthest = 0
  let lowPolar = Number.POSITIVE_INFINITY
  let highPolar = Number.NEGATIVE_INFINITY
  let lowAzimuth = Number.POSITIVE_INFINITY
  let highAzimuth = Number.NEGATIVE_INFINITY

  for (const point of points) {
    const dx = point.position[0] - point.target[0]
    const dy = point.position[1] - point.target[1]
    const dz = point.position[2] - point.target[2]
    const length = Math.hypot(dx, dy, dz) || 1
    const polar = Math.acos(Math.min(1, Math.max(-1, dy / length)))
    const azimuth = base + wrapPi(Math.atan2(dx, dz) - base)
    nearest = Math.min(nearest, length)
    furthest = Math.max(furthest, length)
    lowPolar = Math.min(lowPolar, polar)
    highPolar = Math.max(highPolar, polar)
    lowAzimuth = Math.min(lowAzimuth, azimuth)
    highAzimuth = Math.max(highAzimuth, azimuth)
  }

  if (!Number.isFinite(nearest) || furthest <= 0) {
    nearest = 4
    furthest = 4
  }
  if (!Number.isFinite(lowPolar) || !Number.isFinite(highPolar)) {
    lowPolar = Math.PI / 2
    highPolar = Math.PI / 2
  }
  if (!Number.isFinite(lowAzimuth) || !Number.isFinite(highAzimuth)) {
    lowAzimuth = base
    highAzimuth = base
  }

  if (flat) {
    // Centred on the authored spread rather than added to both ends of it, so a
    // path that already sweeps does not compound its own sweep into the cage.
    const midPolar = (lowPolar + highPolar) / 2
    const midAzimuth = (lowAzimuth + highAzimuth) / 2
    return {
      minDistance: Math.min(nearest, Math.max(0.5, furthest * FLAT_RELIEF.dollyIn)),
      maxDistance: furthest * FLAT_RELIEF.dollyOut,
      minPolarAngle: Math.max(0.04, Math.min(lowPolar, midPolar - FLAT_RELIEF.polar)),
      maxPolarAngle: Math.min(Math.PI - 0.04, Math.max(highPolar, midPolar + FLAT_RELIEF.polar)),
      minAzimuthAngle: Math.min(lowAzimuth, midAzimuth - FLAT_RELIEF.azimuth),
      maxAzimuthAngle: Math.max(highAzimuth, midAzimuth + FLAT_RELIEF.azimuth),
    }
  }

  // Room depth caps how far out the visitor may dolly, but never below the
  // furthest authored waypoint — the path must always stay inside its own cage.
  const ceiling = Math.max(furthest * 1.08, Math.min(Math.max(furthest * 1.7, 2.2), roomDepth * 2.2 + 6))

  return {
    minDistance: Math.min(nearest, Math.max(0.45, nearest * 0.55)),
    maxDistance: ceiling,
    minPolarAngle: Math.max(0.04, Math.min(lowPolar, Math.max(Math.PI * 0.14, lowPolar - 0.3))),
    maxPolarAngle: Math.min(Math.PI - 0.04, Math.max(highPolar, Math.min(Math.PI * 0.66, highPolar + 0.28))),
    minAzimuthAngle: lowAzimuth - 0.8,
    maxAzimuthAngle: highAzimuth + 0.8,
  }
}

/* ------------------------------- limited pan ------------------------------- */

/** How firmly an out-of-bounds pan is drawn back — a rubber band, not a wall. */
const PAN_RETURN_LAMBDA = 4.5

/** Signed distance back into `[-limit, limit]`, or 0 when already inside. */
function overflow(value: number, limit: number): number {
  if (value > limit) return limit - value
  if (value < -limit) return -limit - value
  return 0
}

interface PanLimiterProps {
  /** Half-extents of the allowed target box, in metres, per world axis. */
  limits: Vec3
  active: boolean
}

/**
 * CONTROLLED PAN. `OrbitControls` has no pan bounds of its own, so the pivot is
 * eased back into a small box around the framing the visitor inherited: they can
 * shift the view to look along a wall, but never walk the pivot out of the room.
 *
 * The camera takes the same correction as the target — which is exactly what
 * `pan()` does internally — so the orbit distance and both angles survive
 * untouched. Runs at −0.5, i.e. after `controls.update()` (−1) has applied this
 * frame's pan and before the path driver (0) has its say.
 */
function PanLimiter({ limits, active }: PanLimiterProps): null {
  const invalidate = useThree((state) => state.invalidate)
  const correction = useRef(new Vector3())
  const anchor = useRef(new Vector3())
  const armed = useRef(false)

  // Re-anchor whenever the room changes shape under us.
  useEffect(() => {
    armed.current = false
  }, [limits])

  useFrame((state, delta) => {
    if (!active) {
      // The path driver moves the pivot far beyond any pan box; re-anchor on the
      // frame control comes back so the handover never yanks the view.
      armed.current = false
      return
    }
    const controls = asOrbitControls(state.controls)
    if (!controls || !controls.enabled) return
    if (!armed.current) {
      armed.current = true
      anchor.current.copy(controls.target)
      return
    }

    correction.current.set(
      overflow(controls.target.x - anchor.current.x, limits[0]),
      overflow(controls.target.y - anchor.current.y, limits[1]),
      overflow(controls.target.z - anchor.current.z, limits[2]),
    )
    if (correction.current.lengthSq() < 1e-8) return

    correction.current.multiplyScalar(1 - Math.exp(-PAN_RETURN_LAMBDA * Math.min(Math.max(delta, 0), 0.1)))
    controls.target.add(correction.current)
    state.camera.position.add(correction.current)
    invalidate()
  }, -0.5)

  return null
}

/* --------------------------------- camera --------------------------------- */

/**
 * The camera rig: one perspective camera placed on the first waypoint, plus —
 * in explore mode — orbit controls with limits tight enough that the visitor
 * can never end up outside the room or nose-down in the floor.
 *
 * There is no turntable. A constant-speed spin around the authored target is
 * the one camera idiom the brief rules out; the composed walk lives in
 * `CameraPath`.
 */
export function SceneCamera({ config, mode, pathDriven = false }: SceneCameraProps): JSX.Element {
  const cameraRef = useRef<PerspectiveCameraImpl | null>(null)
  const aspect = useThree((state) => state.viewport.aspect)
  const settings = useMemo(() => resolveSceneSettings(config.settings), [config.settings])

  const points = useMemo(() => resolveWaypoints(waypointsFor(config), config.fov), [config])

  const start = useMemo(() => {
    const first = points[0] ?? FALLBACK_WAYPOINT
    return { position: first.position, target: first.target, fov: first.fov }
  }, [points])

  const flat = useMemo(() => usesFlatRelief(config), [config])
  const limits = useMemo(() => orbitEnvelope(points, settings.roomDepth, flat), [points, settings.roomDepth, flat])

  // A pan is a nudge, not a relocation: a fifth of the room across, a sixth of
  // it deep, and barely any vertically — heads do not float in an interior.
  const panLimits = useMemo<Vec3>(
    () => [
      Math.min(1.2, Math.max(0.25, settings.roomWidth * 0.2)),
      Math.min(0.5, Math.max(0.12, settings.roomHeight * 0.14)),
      Math.min(1.2, Math.max(0.25, settings.roomDepth * 0.18)),
    ],
    [settings.roomWidth, settings.roomHeight, settings.roomDepth],
  )

  const fov = start.fov * portraitFovScale(aspect)

  // Point the camera at the authored target once; from here the path driver or
  // the orbit controls own the orientation.
  useEffect(() => {
    const camera = cameraRef.current
    if (!camera) return
    camera.position.set(start.position[0], start.position[1], start.position[2])
    camera.lookAt(start.target[0], start.target[1], start.target[2])
    camera.updateProjectionMatrix()
  }, [start])

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={fov}
        near={0.08}
        far={Math.max(120, settings.roomDepth * 12)}
        position={[start.position[0], start.position[1], start.position[2]]}
      />
      {mode === 'orbit' && (
        <>
          {/* `regress` is deliberately absent. A path-driven camera moves every
              frame, so `controls.update()` fires `change` every frame, and with
              regress on that would pin the adaptive DPR to its floor for the
              whole walkthrough — softening the one shot that has to look sharp. */}
          <OrbitControls
            makeDefault
            target={[start.target[0], start.target[1], start.target[2]]}
            enableDamping
            dampingFactor={0.055}
            enablePan
            screenSpacePanning={false}
            panSpeed={0.45}
            rotateSpeed={0.42}
            zoomSpeed={0.5}
            minDistance={limits.minDistance}
            maxDistance={limits.maxDistance}
            minPolarAngle={limits.minPolarAngle}
            maxPolarAngle={limits.maxPolarAngle}
            minAzimuthAngle={limits.minAzimuthAngle}
            maxAzimuthAngle={limits.maxAzimuthAngle}
          />
          <PanLimiter limits={panLimits} active={!pathDriven} />
        </>
      )}
    </>
  )
}

export default SceneCamera
