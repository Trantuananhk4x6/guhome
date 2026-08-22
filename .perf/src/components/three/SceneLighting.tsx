'use client'

import { ContactShadows } from '@react-three/drei'
import { useEffect, useMemo, useRef, type JSX } from 'react'
import type { DirectionalLight } from 'three'
import type { SceneConfig } from '@/types/content'
import type { QualityProfile } from '@/lib/three/capability'
import { resolveSceneSettings, usesFlatRelief } from '@/lib/three/scene-settings'

export interface SceneLightingProps {
  config: SceneConfig
  quality: QualityProfile
  /** World height of the ground plane the contact shadow lands on. */
  floorY?: number
  /** Overrides the shadow extent; defaults to the room footprint. */
  radius?: number
}

/**
 * Soft architectural three-point lighting: a warm key standing in for a window,
 * a cool fill off the opposite wall, a bronze rim to separate objects from the
 * background — plus a contact shadow so nothing floats. Shadow work scales
 * with the device profile and switches off entirely on weak hardware.
 */
export function SceneLighting({ config, quality, floorY = 0, radius }: SceneLightingProps): JSX.Element | null {
  const settings = useMemo(() => resolveSceneSettings(config.settings), [config.settings])

  /**
   * A relief is a photograph: it is drawn unlit so the photographed light
   * survives exactly, which leaves nothing here for a light to do. The contact
   * shadow was worse than useless — its catcher plane sits at y = 0, edge-on
   * through the middle of the relief, and it laid a grey band across the frame.
   */
  const lit = !usesFlatRelief(config)

  const shadows = lit && config.shadows && quality.perf !== 'low'
  const extent = radius ?? Math.max(settings.roomWidth, settings.roomDepth) * 0.75 + 2
  const keyRef = useRef<DirectionalLight | null>(null)

  // Shadow camera tuning lives in an effect: typing every `shadow-camera-*`
  // dashed prop is noisier than setting the object once.
  useEffect(() => {
    const light = keyRef.current
    if (!light || !shadows) return
    light.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize)
    light.shadow.bias = -0.00045
    light.shadow.normalBias = 0.028
    light.shadow.radius = 2.4
    const camera = light.shadow.camera
    camera.near = 0.4
    camera.far = extent * 4 + 12
    camera.left = -extent
    camera.right = extent
    camera.top = extent
    camera.bottom = -extent
    camera.updateProjectionMatrix()
    light.shadow.needsUpdate = true
  }, [shadows, quality.shadowMapSize, extent])

  if (!lit) return null

  return (
    <>
      <ambientLight intensity={0.26} color="#f4f1ea" />
      <hemisphereLight args={['#efe9dc', '#6e6659', 0.55]} />

      {/* Key — the window. */}
      <directionalLight
        ref={keyRef}
        castShadow={shadows}
        position={[extent * 0.7, extent * 0.95, extent * 0.55]}
        intensity={2.15}
        color="#fff4e4"
      />
      {/* Fill — daylight bouncing back off the far wall. */}
      <directionalLight position={[-extent * 0.8, extent * 0.45, extent * 0.6]} intensity={0.48} color="#e4eaf2" />
      {/* Rim — bronze-clay, the one warm edge. */}
      <directionalLight position={[-extent * 0.25, extent * 0.5, -extent]} intensity={0.85} color="#c7a57c" />

      {shadows && (
        <ContactShadows
          position={[0, floorY + 0.002, 0]}
          scale={extent * 2.4}
          resolution={quality.contactShadowResolution}
          blur={2.9}
          opacity={0.42}
          far={Math.max(3, settings.roomHeight)}
          color="#131210"
          frames={1}
          smooth
        />
      )}
    </>
  )
}

export default SceneLighting
