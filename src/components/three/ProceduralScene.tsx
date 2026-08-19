'use client'

import { useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, type JSX } from 'react'
import { BackSide, SRGBColorSpace, type Texture } from 'three'
import type { MediaRef, SceneSettings } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import type { QualityProfile } from '@/lib/three/capability'
import { releaseTextures } from '@/lib/three/loaders'
import { coverFit, createFadeTexture, resolveSceneSettings, textureAspect } from '@/lib/three/scene-settings'

export interface ProceduralSceneProps {
  image: MediaRef
  settings: SceneSettings | null | undefined
  quality: QualityProfile
}

/**
 * `PROCEDURAL_3D` — a room box built from the scene settings with the source
 * photograph projected onto the far wall and washed softly across floor,
 * ceiling and side walls. The camera can dolly all the way in: the projection
 * fades with distance from the far wall, so the perspective never fights the
 * geometry the way a single flat billboard would.
 */
export function ProceduralScene({ image, settings, quality }: ProceduralSceneProps): JSX.Element {
  const resolved = useMemo(() => resolveSceneSettings(settings), [settings])
  const gl = useThree((state) => state.gl)
  const url = mediaUrl(image, quality.textureWidth)
  const texture = useTexture(url)

  const { roomWidth: W, roomHeight: H, roomDepth: D } = resolved
  const imageAspect = textureAspect(texture, image.width && image.height ? image.width / image.height : 1.5)

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = Math.min(quality.maxAnisotropy, gl.capabilities.getMaxAnisotropy())
    texture.needsUpdate = true
  }, [texture, gl, quality.maxAnisotropy])

  /**
   * One clone per surface: clones share the GPU upload with the source (so we
   * must never dispose them individually) but carry their own crop.
   */
  const maps = useMemo(() => {
    const make = (surfaceAspect: number): Texture => {
      const clone = texture.clone()
      clone.colorSpace = SRGBColorSpace
      clone.needsUpdate = true
      return coverFit(clone, surfaceAspect, imageAspect)
    }
    return {
      wall: make(W / H),
      floor: make(W / D),
      ceiling: make(W / D),
      side: make(D / H),
    }
  }, [texture, imageAspect, W, H, D])

  /**
   * Alpha ramps that dissolve each projection as it travels away from the far
   * wall. Directions follow the UV frames of the rotated planes:
   * floor +Y → −Z, ceiling +Y → +Z, left wall +X → −Z, right wall +X → +Z.
   */
  const fades = useMemo(
    () => ({
      floor: createFadeTexture('up', 256, 0.7),
      ceiling: createFadeTexture('down', 256, 0.55),
      left: createFadeTexture('right', 256, 0.62),
      right: createFadeTexture('left', 256, 0.62),
    }),
    [],
  )

  useEffect(() => {
    return () => {
      for (const fade of Object.values(fades)) fade.dispose()
    }
  }, [fades])

  useEffect(() => {
    return () => {
      releaseTextures([url], [texture])
    }
  }, [url, texture])

  const shell = resolved.background ?? '#cfc7b7'

  return (
    <group>
      {/* Room shell — the surfaces that catch light and shadow. */}
      <mesh position={[0, H / 2, 0]} receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color={shell} roughness={0.94} metalness={0} side={BackSide} />
      </mesh>

      {/* The photograph itself, on the far wall. */}
      <mesh position={[0, H / 2, -D / 2 + 0.012]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial
          map={maps.wall}
          emissiveMap={maps.wall}
          emissive="#ffffff"
          emissiveIntensity={0.58}
          roughness={1}
          metalness={0}
          envMapIntensity={0.3}
        />
      </mesh>

      {/* Floor wash. */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshBasicMaterial
          map={maps.floor}
          alphaMap={fades.floor}
          transparent
          opacity={0.42}
          depthWrite={false}
          toneMapped
        />
      </mesh>

      {/* Ceiling wash — lighter, so the eye keeps going forward. */}
      <mesh position={[0, H - 0.008, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshBasicMaterial
          map={maps.ceiling}
          alphaMap={fades.ceiling}
          transparent
          opacity={0.2}
          depthWrite={false}
          toneMapped
        />
      </mesh>

      {/* Side walls. */}
      <mesh position={[-W / 2 + 0.01, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshBasicMaterial
          map={maps.side}
          alphaMap={fades.left}
          transparent
          opacity={0.3}
          depthWrite={false}
          toneMapped
        />
      </mesh>
      <mesh position={[W / 2 - 0.01, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshBasicMaterial
          map={maps.side}
          alphaMap={fades.right}
          transparent
          opacity={0.3}
          depthWrite={false}
          toneMapped
        />
      </mesh>
    </group>
  )
}

export default ProceduralScene
