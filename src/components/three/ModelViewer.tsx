'use client'

import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type JSX } from 'react'
import { Box3, Mesh, Vector3, type Group, type Object3D } from 'three'
import type { SceneSettings, Vec3 } from '@/types/content'
import { DRACO_DECODER_PATH, gltfExtender, releaseGltf } from '@/lib/three/loaders'
import { resolveSceneSettings } from '@/lib/three/scene-settings'

export interface ModelFraming {
  size: Vec3
  center: Vec3
  /** Uniform scale applied to fit the model into `frameSize`. */
  fit: number
}

export interface ModelViewerProps {
  url: string
  settings: SceneSettings | null | undefined
  shadows?: boolean
  /** Largest dimension of the model after framing, in world units. */
  frameSize?: number
  /** Clear the GLB from drei's cache on unmount. Off if two views share it. */
  disposeOnUnmount?: boolean
  onFramed?: (framing: ModelFraming) => void
}

/**
 * `NATIVE_GLB` — a real model, centred on the origin with its base on the
 * floor plane so the contact shadow lands correctly, scaled into a predictable
 * envelope, then offset by whatever the editor set in the scene settings.
 */
export function ModelViewer({
  url,
  settings,
  shadows = true,
  frameSize = 3.6,
  disposeOnUnmount = true,
  onFramed,
}: ModelViewerProps): JSX.Element {
  const gl = useThree((state) => state.gl)
  const extendLoader = useMemo(() => gltfExtender(gl), [gl])
  const { scene } = useGLTF(url, DRACO_DECODER_PATH, true, extendLoader)
  const resolved = useMemo(() => resolveSceneSettings(settings), [settings])
  const rootRef = useRef<Group | null>(null)

  // A clone keeps geometry and materials shared with the cache while letting
  // this instance own its transforms.
  const model = useMemo(() => scene.clone(true), [scene])

  const framing = useMemo(() => {
    const box = new Box3().setFromObject(model)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)
    const largest = Math.max(size.x, size.y, size.z) || 1
    return {
      fit: frameSize / largest,
      offset: [-center.x, -box.min.y, -center.z] as [number, number, number],
      framing: {
        size: [size.x, size.y, size.z] as Vec3,
        center: [center.x, center.y, center.z] as Vec3,
        fit: frameSize / largest,
      },
    }
  }, [model, frameSize])

  useEffect(() => {
    model.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return
      child.castShadow = shadows
      child.receiveShadow = shadows
      child.frustumCulled = true
    })
  }, [model, shadows])

  useEffect(() => {
    onFramed?.(framing.framing)
  }, [framing, onFramed])

  useEffect(() => {
    if (!disposeOnUnmount) return
    return () => {
      releaseGltf(url)
    }
  }, [url, disposeOnUnmount])

  const [px, py, pz] = resolved.modelPosition
  const [rx, ry, rz] = resolved.modelRotation

  return (
    <group ref={rootRef} position={[px, py, pz]} rotation={[rx, ry, rz]} scale={resolved.modelScale}>
      <group scale={framing.fit}>
        <group position={framing.offset}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  )
}

export default ModelViewer
