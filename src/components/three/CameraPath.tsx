'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, type JSX, type MutableRefObject } from 'react'
import { Vector3 } from 'three'
import type { CameraWaypoint } from '@/types/content'
import { clamp01, createCameraPath, createPose, damp, pingPong } from '@/lib/three/camera-path'
import { portraitFovScale } from '@/lib/three/scene-settings'

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
  autoExplore?: boolean
  /** `SceneConfig.animationSpeed`; 1 ≈ a 26 s pass in each direction. */
  speed?: number
  enabled?: boolean
  /** Higher = tighter tracking. ~2.6 is a slow architectural dolly. */
  lambda?: number
}

const BASE_PERIOD_SECONDS = 26

/**
 * Drives the default camera along the authored path every frame by mutating
 * the three.js objects directly — no state, no re-renders, nothing that could
 * make React think per frame. The exponential damping is what turns a jumpy
 * scroll position into a dolly that glides and settles.
 */
export function CameraPath({
  waypoints,
  progressRef,
  fov,
  sensitivity = 1,
  autoExplore = false,
  speed = 1,
  enabled = true,
  lambda = 2.6,
}: CameraPathProps): JSX.Element | null {
  const invalidate = useThree((state) => state.invalidate)
  const path = useMemo(() => createCameraPath(waypoints, { defaultFov: fov }), [waypoints, fov])
  const pose = useRef(createPose(fov))
  const lookAt = useRef(new Vector3())
  const smoothed = useRef(-1)
  const elapsed = useRef(0)

  useFrame((state, delta) => {
    const camera = state.camera
    const step = Math.min(delta, 0.1)

    let goal: number
    if (autoExplore) {
      elapsed.current += step * Math.max(0.05, speed)
      goal = pingPong(elapsed.current, BASE_PERIOD_SECONDS)
    } else {
      const raw = progressRef ? progressRef.current : 0
      goal = clamp01(raw * (sensitivity > 0 ? sensitivity : 1))
    }

    const first = smoothed.current < 0
    const next = first || !enabled ? goal : damp(smoothed.current, goal, lambda, step)
    const moved = first || Math.abs(next - smoothed.current) > 1e-5
    smoothed.current = next
    if (!moved) return

    path.sampleInto(next, pose.current)

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

    // Keeps `frameloop="demand"` scenes rendering while the dolly is settling.
    invalidate()
  })

  return null
}

export default CameraPath
