'use client'

import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type JSX } from 'react'
import { PerspectiveCamera as PerspectiveCameraImpl, Vector3 } from 'three'
import type { SceneConfig } from '@/types/content'
import { resolveWaypoints } from '@/lib/three/camera-path'
import { portraitFovScale, resolveSceneSettings, waypointsFor } from '@/lib/three/scene-settings'

export interface SceneCameraProps {
  config: SceneConfig
  mode: 'scroll' | 'orbit'
  /** Slow turntable while the visitor is idle (orbit mode only). */
  autoRotate?: boolean
}

/**
 * The camera rig: one perspective camera placed on the first waypoint, plus —
 * in explore mode — orbit controls with limits tight enough that the visitor
 * can never end up outside the room or nose-down in the floor.
 */
export function SceneCamera({ config, mode, autoRotate = false }: SceneCameraProps): JSX.Element {
  const cameraRef = useRef<PerspectiveCameraImpl | null>(null)
  const aspect = useThree((state) => state.viewport.aspect)
  const settings = useMemo(() => resolveSceneSettings(config.settings), [config.settings])

  const start = useMemo(() => {
    const points = resolveWaypoints(waypointsFor(config), config.fov)
    const first = points[0]
    const position = first?.position ?? ([0, 1.6, 6] as const)
    const target = first?.target ?? ([0, 1.4, 0] as const)
    const fov = first?.fov ?? config.fov ?? 45
    const distance = Math.hypot(position[0] - target[0], position[1] - target[1], position[2] - target[2]) || 4
    return { position, target, fov, distance }
  }, [config])

  // Orbit limits derived from the authored framing, so every project gets a
  // sane envelope without the editor having to think about radians.
  const limits = useMemo(() => {
    const dir = new Vector3(
      start.position[0] - start.target[0],
      start.position[1] - start.target[1],
      start.position[2] - start.target[2],
    )
    const spherical = { polar: Math.acos(Math.min(1, Math.max(-1, dir.y / (dir.length() || 1)))) }
    const azimuth = Math.atan2(dir.x, dir.z)
    return {
      minDistance: Math.max(0.45, start.distance * 0.4),
      maxDistance: Math.min(Math.max(start.distance * 1.7, 2.2), settings.roomDepth * 2.2 + 6),
      minPolarAngle: Math.max(Math.PI * 0.16, spherical.polar - 0.34),
      maxPolarAngle: Math.min(Math.PI * 0.62, spherical.polar + 0.3),
      minAzimuthAngle: azimuth - 0.8,
      maxAzimuthAngle: azimuth + 0.8,
    }
  }, [start, settings.roomDepth])

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
        <OrbitControls
          makeDefault
          target={[start.target[0], start.target[1], start.target[2]]}
          enableDamping
          dampingFactor={0.055}
          enablePan={false}
          regress
          rotateSpeed={0.42}
          zoomSpeed={0.5}
          autoRotate={autoRotate}
          autoRotateSpeed={0.28}
          minDistance={limits.minDistance}
          maxDistance={limits.maxDistance}
          minPolarAngle={limits.minPolarAngle}
          maxPolarAngle={limits.maxPolarAngle}
          minAzimuthAngle={limits.minAzimuthAngle}
          maxAzimuthAngle={limits.maxAzimuthAngle}
        />
      )}
    </>
  )
}

export default SceneCamera
