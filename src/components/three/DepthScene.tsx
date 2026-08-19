'use client'

import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type JSX } from 'react'
import { LinearFilter, NoColorSpace, SRGBColorSpace, type Group, type Mesh } from 'three'
import type { MediaRef, SceneSettings } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import type { QualityProfile } from '@/lib/three/capability'
import { releaseTextures } from '@/lib/three/loaders'
import { resolveSceneSettings, textureAspect } from '@/lib/three/scene-settings'

export interface DepthSceneProps {
  image: MediaRef
  depth: MediaRef | null
  settings: SceneSettings | null | undefined
  quality: QualityProfile
  /** Extra coverage beyond the frustum so the edges never enter frame. */
  overscan?: number
}

/**
 * `DEPTH_2_5D` — the photograph as relief. A finely segmented plane is
 * displaced by the depth map, lit almost entirely by its own emissive copy of
 * the photo (so the colours stay exactly as photographed) and given a slow
 * pointer parallax. With a heuristic depth map the trick to reading as real is
 * restraint: shallow displacement, small rotations, no snap.
 */
export function DepthScene({ image, depth, settings, quality, overscan = 1.18 }: DepthSceneProps): JSX.Element {
  const resolved = useMemo(() => resolveSceneSettings(settings), [settings])
  const gl = useThree((state) => state.gl)
  const viewport = useThree((state) => state.viewport)
  const invalidate = useThree((state) => state.invalidate)

  const mapUrl = mediaUrl(image, quality.textureWidth)
  // No depth map yet? The photo's own luminance is a passable stand-in — the
  // same heuristic the recon pipeline falls back to, at half the amplitude.
  const depthUrl = depth ? mediaUrl(depth, 1200) : mapUrl
  const hasDepth = depth !== null

  const textures = useTexture({ map: mapUrl, disp: depthUrl })
  const { map, disp } = textures

  useEffect(() => {
    map.colorSpace = SRGBColorSpace
    map.anisotropy = Math.min(quality.maxAnisotropy, gl.capabilities.getMaxAnisotropy())
    map.needsUpdate = true
    // Without a depth map the loader hands back the *same* texture instance for
    // both slots — retuning it as linear data would desaturate the photograph.
    if (disp !== map) {
      disp.colorSpace = NoColorSpace
      disp.minFilter = LinearFilter
      disp.magFilter = LinearFilter
      disp.generateMipmaps = false
      disp.needsUpdate = true
    }
  }, [map, disp, gl, quality.maxAnisotropy])

  useEffect(() => {
    return () => {
      releaseTextures([mapUrl, depthUrl], [map, disp])
    }
  }, [mapUrl, depthUrl, map, disp])

  const imageAspect = textureAspect(map, image.width && image.height ? image.width / image.height : 1.5)

  // Cover the frustum at the *widest* framing (the first waypoint), then let
  // the dolly crop into it.
  const plane = useMemo(() => {
    const height = Math.max(viewport.height, viewport.width / imageAspect) * overscan
    const segments = Math.min(resolved.planeSegments, quality.planeSegments)
    return {
      width: height * imageAspect,
      height,
      segX: Math.max(8, Math.round(segments * Math.min(2, Math.max(0.5, imageAspect)))),
      segY: Math.max(8, segments),
    }
  }, [viewport.height, viewport.width, imageAspect, overscan, resolved.planeSegments, quality.planeSegments])

  const displacement = resolved.displacementScale * (hasDepth ? 1 : 0.45)
  const strength = resolved.parallaxStrength

  const groupRef = useRef<Group | null>(null)
  const meshRef = useRef<Mesh | null>(null)

  // On a `demand` frameloop nothing would redraw while the pointer moves over
  // static geometry; one invalidate per move is enough to start the lerp, which
  // then keeps itself alive until it settles.
  useEffect(() => {
    if (strength <= 0) return
    const wake = (): void => invalidate()
    window.addEventListener('pointermove', wake, { passive: true })
    return () => window.removeEventListener('pointermove', wake)
  }, [strength, invalidate])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group || strength <= 0) return
    const step = 1 - Math.exp(-2.4 * Math.min(delta, 0.1))
    const targetY = state.pointer.x * strength * 0.34
    const targetX = -state.pointer.y * strength * 0.22
    const targetPX = state.pointer.x * strength * 0.28
    const targetPY = -state.pointer.y * strength * 0.18

    const dy = targetY - group.rotation.y
    const dx = targetX - group.rotation.x
    const dpx = targetPX - group.position.x
    const dpy = targetPY - group.position.y
    if (Math.abs(dy) < 1e-4 && Math.abs(dx) < 1e-4 && Math.abs(dpx) < 1e-4 && Math.abs(dpy) < 1e-4) return

    group.rotation.y += dy * step
    group.rotation.x += dx * step
    group.position.x += dpx * step
    group.position.y += dpy * step
    invalidate()
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} receiveShadow={false} castShadow={false}>
        <planeGeometry args={[plane.width, plane.height, plane.segX, plane.segY]} />
        <meshStandardMaterial
          map={map}
          displacementMap={disp}
          displacementScale={displacement}
          displacementBias={-displacement * 0.5}
          emissiveMap={map}
          emissive="#ffffff"
          emissiveIntensity={0.62}
          roughness={1}
          metalness={0}
          envMapIntensity={0.35}
          toneMapped
        />
      </mesh>
    </group>
  )
}

export default DepthScene
