'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type JSX, type MutableRefObject } from 'react'
import { Vector3 } from 'three'
import type { CameraWaypoint } from '@/types/content'
import {
  clamp01,
  createCameraPath,
  createPose,
  createTourClock,
  damp,
  easingByName,
} from '@/lib/three/camera-path'
import { asOrbitControls } from '@/lib/three/controls'
import { portraitFovScale } from '@/lib/three/scene-settings'

/**
 * Where the path parameter comes from.
 *
 * `progress` follows `progressRef` — the scroll system owns the journey.
 * `tour` runs the authored walkthrough on its own clock — AUTO EXPLORE.
 */
export type CameraPathDriver = 'progress' | 'tour'

export interface CameraPathProps {
  waypoints: CameraWaypoint[]
  /** 0..1, mutated by the scroll system. Never read through React state. */
  progressRef?: MutableRefObject<number>
  fov: number
  /**
   * Extra multiplier on `progressRef`. Leave at 1 when the value comes from
   * `useCameraScroll` — that hook already applies `SceneConfig.scrollSensitivity`
   * before it writes the ref, and applying it twice would clip the path short.
   */
  sensitivity?: number
  driver?: CameraPathDriver
  /** `SceneConfig.animationSpeed`, applied to the tour schedule. */
  speed?: number
  enabled?: boolean
  /** Higher = tighter tracking. Defaults per driver — see `DRIVER_LAMBDA`. */
  lambda?: number
  /**
   * Seconds spent easing from wherever the camera is onto the path. 0 snaps,
   * which is what scroll wants: the hero must track the scrollbar from frame 1.
   * Orbit-mode auto-explore blends, because the visitor may have orbited away
   * before switching it on and a cut would read as a glitch.
   */
  blendSeconds?: number
  /**
   * Hand the camera back the instant the visitor grabs the canvas. Only
   * meaningful where controls exist to hand it to, i.e. orbit mode.
   */
  yieldOnPointer?: boolean
  /** Fired once, when that handover happens. Never called per frame. */
  onYield?: () => void
}

/**
 * Scroll is a jumpy input, so it gets heavy smoothing — that damping is what
 * turns a scroll position into a dolly that glides and settles. The tour clock
 * is already smooth, so it gets only enough to round the corner coming out of a
 * hold; more would blur the holds into the legs and lose the composed stops.
 */
const DRIVER_LAMBDA: Record<CameraPathDriver, number> = { progress: 2.6, tour: 6.5 }

/** Deceleration curve for the blend onto the path — long tail, no bounce. */
const BLEND_EASE = easingByName('expo.out')

/**
 * Drives the default camera along the authored path every frame by mutating the
 * three.js objects directly — no state, no re-renders, nothing that could make
 * React think per frame.
 *
 * It writes the camera **unconditionally** while it is driving, even when the
 * parameter has not moved. Orbit controls run their own `update()` at priority
 * −1 and would otherwise quietly reclaim the camera during a waypoint hold and
 * clamp the authored pose back into the orbit envelope.
 */
export function CameraPath({
  waypoints,
  progressRef,
  fov,
  sensitivity = 1,
  driver = 'progress',
  speed = 1,
  enabled = true,
  lambda,
  blendSeconds = 0,
  yieldOnPointer = false,
  onYield,
}: CameraPathProps): JSX.Element | null {
  const invalidate = useThree((state) => state.invalidate)
  const gl = useThree((state) => state.gl)

  const path = useMemo(() => createCameraPath(waypoints, { defaultFov: fov }), [waypoints, fov])
  // The clock schedules the same resolved stops the sampler interpolates, so a
  // hold always lands exactly on a waypoint rather than near one.
  const clock = useMemo(() => createTourClock(path.waypoints, { speed }), [path, speed])
  const smoothing = lambda ?? DRIVER_LAMBDA[driver]

  const pose = useRef(createPose(fov))
  const lookAt = useRef(new Vector3())
  const fromPosition = useRef(new Vector3())
  const fromTarget = useRef(new Vector3())
  const fromFov = useRef(fov)
  const smoothed = useRef(-1)
  const elapsed = useRef(0)
  const blend = useRef(1)
  const acquired = useRef(false)
  const yielded = useRef(false)
  const onYieldRef = useRef(onYield)

  useEffect(() => {
    onYieldRef.current = onYield
  }, [onYield])

  // A new driving session — different path, different driver, re-enabled after
  // a pause: forget the old smoothing, start the walk at the top, and ease in
  // from wherever the camera happens to be standing.
  useEffect(() => {
    smoothed.current = -1
    elapsed.current = 0
    blend.current = blendSeconds > 0 ? 0 : 1
    acquired.current = false
    yielded.current = false
  }, [path, clock, driver, blendSeconds, enabled])

  // The visitor touching the canvas outranks the tour. Listening on the canvas
  // itself (rather than on the controls) means the handover happens even while
  // the controls are being ignored, and the same gesture that stops the walk is
  // the one that rotates the room.
  useEffect(() => {
    if (!enabled || !yieldOnPointer) return
    const element = gl.domElement
    const handOver = (): void => {
      if (yielded.current) return
      yielded.current = true
      onYieldRef.current?.()
      invalidate()
    }
    element.addEventListener('pointerdown', handOver, { passive: true })
    element.addEventListener('wheel', handOver, { passive: true })
    return () => {
      element.removeEventListener('pointerdown', handOver)
      element.removeEventListener('wheel', handOver)
    }
  }, [enabled, yieldOnPointer, gl, invalidate])

  /**
   * The scroll wake-up, and the reason the hero can render on demand.
   *
   * `progressRef` is a ref: writing to it changes nothing anybody is watching.
   * On a `demand` frameloop `useFrame` only runs when a frame has been asked
   * for, so scrolling would move the progress value silently and the camera
   * would sit still until something else happened to request a draw. One
   * invalidate per scroll event is enough — from there the `!settled` check at
   * the end of the frame keeps the loop alive by itself until the dolly stops.
   *
   * The tour driver is exempt: it advances on elapsed time, never settles while
   * it is running, and is given a live loop by the caller.
   */
  useEffect(() => {
    if (!enabled || driver === 'tour') return
    const wake = (): void => invalidate()
    window.addEventListener('scroll', wake, { passive: true })
    window.addEventListener('resize', wake, { passive: true })
    return () => {
      window.removeEventListener('scroll', wake)
      window.removeEventListener('resize', wake)
    }
  }, [enabled, driver, invalidate])

  useFrame((state, delta) => {
    if (!enabled || yielded.current) return
    const camera = state.camera
    const step = Math.min(Math.max(delta, 0), 0.1)

    if (!acquired.current) {
      acquired.current = true
      fromPosition.current.copy(camera.position)
      const held = asOrbitControls(state.controls)
      if (held) fromTarget.current.copy(held.target)
      else camera.getWorldDirection(fromTarget.current).multiplyScalar(3).add(camera.position)
      // Stored unscaled: the portrait widening is re-applied below, and blending
      // an already-widened angle would pop the lens on a phone.
      const widen = portraitFovScale(state.viewport.aspect) || 1
      fromFov.current =
        'isPerspectiveCamera' in camera && camera.isPerspectiveCamera ? camera.fov / widen : fov
    }

    let goal: number
    if (driver === 'tour') {
      elapsed.current += step
      goal = clock.progressAt(elapsed.current)
    } else {
      const raw = progressRef ? progressRef.current : 0
      goal = clamp01(raw * (sensitivity > 0 ? sensitivity : 1))
    }

    const previous = smoothed.current
    const first = previous < 0
    const next = first ? goal : damp(previous, goal, smoothing, step)
    smoothed.current = next

    path.sampleInto(next, pose.current)

    if (blend.current < 1 && blendSeconds > 0) {
      blend.current = clamp01(blend.current + step / blendSeconds)
      const k = BLEND_EASE(blend.current)
      const target = pose.current
      target.position[0] = fromPosition.current.x + (target.position[0] - fromPosition.current.x) * k
      target.position[1] = fromPosition.current.y + (target.position[1] - fromPosition.current.y) * k
      target.position[2] = fromPosition.current.z + (target.position[2] - fromPosition.current.z) * k
      target.target[0] = fromTarget.current.x + (target.target[0] - fromTarget.current.x) * k
      target.target[1] = fromTarget.current.y + (target.target[1] - fromTarget.current.y) * k
      target.target[2] = fromTarget.current.z + (target.target[2] - fromTarget.current.z) * k
      target.fov = fromFov.current + (target.fov - fromFov.current) * k
    }

    camera.position.set(pose.current.position[0], pose.current.position[1], pose.current.position[2])
    lookAt.current.set(pose.current.target[0], pose.current.target[1], pose.current.target[2])
    camera.lookAt(lookAt.current)

    if ('isPerspectiveCamera' in camera && camera.isPerspectiveCamera) {
      const wanted = pose.current.fov * portraitFovScale(state.viewport.aspect)
      if (Math.abs(camera.fov - wanted) > 0.01) {
        camera.fov = wanted
        camera.updateProjectionMatrix()
      }
    }

    // Keep the orbit pivot under the shot. When the visitor takes over, the room
    // swings around what the camera was framing instead of snapping back to the
    // first waypoint's target.
    const controls = asOrbitControls(state.controls)
    if (controls) controls.target.copy(lookAt.current)

    // Keeps `frameloop="demand"` scenes rendering while the dolly is settling.
    const settled = !first && blend.current >= 1 && Math.abs(next - previous) <= 1e-5
    if (!settled) invalidate()
  })

  return null
}

export default CameraPath
