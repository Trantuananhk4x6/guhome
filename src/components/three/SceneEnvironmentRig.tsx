'use client'

import { Environment, Lightformer } from '@react-three/drei'
import { Suspense, type JSX } from 'react'
import { BackSide } from 'three'
import type { SceneConfig } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import type { QualityProfile } from '@/lib/three/capability'
import { isEnvPreset } from '@/lib/three/scene-settings'
import { SceneBoundary } from '@/components/three/SceneBoundary'

export interface SceneEnvironmentRigProps {
  config: SceneConfig
  quality: QualityProfile
}

/**
 * A self-contained interior lighting environment: one tall soft window on the
 * left, a warm ceiling strip, a cool bounce from the opposite wall. Built from
 * lightformers, so it costs one baked cube render and — unlike drei's HDRI
 * presets — never touches the network.
 */
function StudioRig({ intensity, resolution }: { intensity: number; resolution: number }): JSX.Element {
  return (
    <Environment resolution={resolution} frames={1} environmentIntensity={intensity} background={false}>
      {/* Ambient shell: limestone above, oat below — the room's own bounce. */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#3a352d" side={BackSide} />
      </mesh>
      {/* Window wall. */}
      <Lightformer
        form="rect"
        intensity={5.5}
        color="#fdf6e8"
        position={[-6, 2.4, 1.5]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[6, 5, 1]}
      />
      {/* Ceiling wash. */}
      <Lightformer
        form="rect"
        intensity={2.1}
        color="#fff3e2"
        position={[0, 7, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[10, 8, 1]}
      />
      {/* Cool bounce, opposite the window. */}
      <Lightformer
        form="rect"
        intensity={1.15}
        color="#dfe6ef"
        position={[6.5, 1.6, -2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[5, 4, 1]}
      />
      {/* Bronze-clay accent grazing the floor. */}
      <Lightformer
        form="circle"
        intensity={0.85}
        color="#c7a57c"
        position={[1.5, -3, 3]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[5, 5, 1]}
      />
    </Environment>
  )
}

/**
 * Image-based lighting, for the scenes that are actually lit by it.
 *
 * Split out of `SceneEnvironment` because of what `Environment` drags in: drei's
 * HDRI machinery is RGBELoader, EXRLoader and the gainmap decoder, and a flat
 * relief is drawn unlit and never renders one. `SceneEnvironment` answers that
 * question before this module is imported, so a `DEPTH_2_5D` scene — every
 * scene in the catalogue today — never downloads any of it.
 *
 * An explicit HDRI wins, then a known drei preset, then the local rig. Both
 * remote paths are wrapped so a slow or blocked CDN degrades to the rig instead
 * of taking the canvas down.
 */
export function SceneEnvironmentRig({ config, quality }: SceneEnvironmentRigProps): JSX.Element {
  const intensity = config.envIntensity > 0 ? config.envIntensity : 1
  const hdriUrl = config.model && config.model.kind === 'hdri' ? mediaUrl(config.model) : null
  const preset = isEnvPreset(config.envPreset) ? config.envPreset : null

  const rig = <StudioRig intensity={intensity} resolution={quality.envResolution} />

  const remote = hdriUrl ? (
    <Environment
      files={hdriUrl}
      environmentIntensity={intensity}
      resolution={quality.envResolution}
      background={false}
    />
  ) : preset ? (
    <Environment
      preset={preset}
      environmentIntensity={intensity}
      resolution={quality.envResolution}
      background={false}
    />
  ) : null

  if (!remote) return rig

  return (
    <SceneBoundary fallback={rig} resetKey={hdriUrl ?? preset ?? 'rig'}>
      <Suspense fallback={rig}>{remote}</Suspense>
    </SceneBoundary>
  )
}

export default SceneEnvironmentRig
