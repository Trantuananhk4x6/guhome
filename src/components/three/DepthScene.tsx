'use client'

import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type JSX } from 'react'
import {
  PerspectiveCamera as PerspectiveCameraImpl,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
  type Group,
  type Mesh,
} from 'three'
import type { MediaRef, SceneSettings } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import type { QualityProfile } from '@/lib/three/capability'
import { buildReliefField, conditionDepthField, type ReliefField } from '@/lib/three/depth-field'
import { releaseTextures } from '@/lib/three/loaders'
import { DEPTH_FRAME, RELIEF_EDGE, resolveSceneSettings, textureAspect } from '@/lib/three/scene-settings'

export interface DepthSceneProps {
  image: MediaRef
  depth: MediaRef | null
  settings: SceneSettings | null | undefined
  quality: QualityProfile
  /** Extra coverage beyond the frustum so the plane's edge never enters frame. */
  overscan?: number
}

/**
 * The photograph is the whole point, so it is drawn *unlit*: the fragment
 * shader returns the sampled texel and nothing else. The previous material
 * stacked `map` and `emissiveMap` on the same photo, lit the result with the
 * scene's three-point rig and pushed it through ACES — the photo added to a lit
 * copy of itself, which is why a warm hinoki interior arrived as grey concrete.
 *
 * `<colorspace_fragment>` is included so three encodes for whatever it is
 * rendering into (the canvas directly, or the post-processing composer's linear
 * buffer). Tone mapping is left switched off at the material — the photograph
 * has already been graded; running a finished sRGB image through a film curve
 * only lifts its blacks and drains its colour.
 */
const RELIEF_VERTEX = /* glsl */ `
  uniform sampler2D uRelief;
  uniform vec2 uTexel;
  uniform float uAmplitude;
  uniform float uEdgeSoft;
  uniform float uEdgeCut;

  varying vec2 vUv;
  varying float vEdge;

  void main() {
    vUv = uv;

    float centre = texture2D( uRelief, uv ).r;
    float left   = texture2D( uRelief, uv + vec2( -uTexel.x, 0.0 ) ).r;
    float right  = texture2D( uRelief, uv + vec2(  uTexel.x, 0.0 ) ).r;
    float down   = texture2D( uRelief, uv + vec2( 0.0, -uTexel.y ) ).r;
    float up     = texture2D( uRelief, uv + vec2( 0.0,  uTexel.y ) ).r;

    // Averaging the neighbourhood costs four fetches and removes the last of
    // the single-texel steps the CPU blur left behind.
    float depth = ( centre * 2.0 + left + right + down + up ) / 6.0;

    // Steepness of the field here, in field units per texel. A real depth map
    // has a cliff at every occlusion boundary; this is what carries it to the
    // fragment stage so those triangles can be dropped rather than stretched.
    float gradient = max( abs( right - left ), abs( up - down ) );
    vEdge = gradient;

    // Relief eases off before the cliff, so the surface arrives at a dropped
    // band already flat instead of ending mid-stretch.
    float carry = 1.0 - smoothstep( uEdgeSoft, uEdgeCut, gradient );

    // …and off again at the plane's rim, so the outermost ring stays exactly
    // where the coverage maths assumes it is.
    vec2 rim = smoothstep( vec2( 0.0 ), vec2( 0.04 ), uv ) * smoothstep( vec2( 0.0 ), vec2( 0.04 ), 1.0 - uv );
    float border = rim.x * rim.y;

    float offset = ( depth - 0.5 ) * uAmplitude * carry * border;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position + vec3( 0.0, 0.0, offset ), 1.0 );
  }
`

const RELIEF_FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uEdgeCut;

  varying vec2 vUv;
  varying float vEdge;

  void main() {
    if ( vEdge > uEdgeCut ) discard;
    gl_FragColor = texture2D( uMap, vUv );
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

/**
 * `DEPTH_2_5D` — the photograph as relief.
 *
 * The honest description of what this is: a plane carrying the photograph,
 * nudged by a *very* shallow, heavily smoothed depth field, moving slightly
 * against a slow dolly. It is not a reconstruction of the room, and it is built
 * so that it cannot be mistaken for one — the amplitude is capped at 14% of the
 * plane's height (see `reliefDepthFor`) and the field is authored at 128 px
 * (see `@/lib/three/depth-field`) precisely so that the relief can never
 * resolve into visible layers. What the visitor should read is a photograph
 * with a little air in it.
 */
export function DepthScene({ image, depth, settings, quality, overscan = 1.08 }: DepthSceneProps): JSX.Element {
  const resolved = useMemo(() => resolveSceneSettings(settings), [settings])
  const gl = useThree((state) => state.gl)
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const invalidate = useThree((state) => state.invalidate)

  const mapUrl = mediaUrl(image, quality.textureWidth)
  // No depth map? Ask for the photo twice — the loader hands back one instance —
  // and infer the relief from it below.
  const hasMeasured = depth !== null
  const depthUrl = depth ? mediaUrl(depth, 1200) : mapUrl

  const { photo: source, measured } = useTexture({ photo: mapUrl, measured: depthUrl })

  const maxAnisotropy = Math.min(quality.maxAnisotropy, gl.capabilities.getMaxAnisotropy())

  /**
   * A configured copy rather than the loader's instance: the loader owns that
   * one and hands the same object to every consumer of the URL, and mutating it
   * from here is exactly the aliasing hazard `react-hooks/immutability` warns
   * about. The clone shares the GPU upload, so it costs nothing.
   */
  const photo = useMemo(() => {
    const texture = source.clone()
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = maxAnisotropy
    texture.needsUpdate = true
    return texture
  }, [source, maxAnisotropy])

  /**
   * The relief itself. With a measured depth map this is that map, downsampled
   * and smoothed until it is safe to displace with; without one it is inferred
   * from the photograph, at an amplitude low enough that being wrong about the
   * geometry costs nothing.
   */
  const relief: ReliefField | null = useMemo(() => {
    const measuredImage = measured.image as CanvasImageSource | undefined
    if (hasMeasured && measuredImage) return conditionDepthField(measuredImage)
    const photoImage = source.image as CanvasImageSource | undefined
    return photoImage ? buildReliefField(photoImage) : null
  }, [hasMeasured, measured, source])

  useEffect(() => {
    return () => {
      relief?.texture.dispose()
    }
  }, [relief])

  useEffect(() => {
    return () => {
      photo.dispose()
    }
  }, [photo])

  useEffect(() => {
    return () => {
      releaseTextures([mapUrl, depthUrl], [source, measured])
    }
  }, [mapUrl, depthUrl, source, measured])

  // An inferred relief is a plausible swell rather than a measurement, so it
  // keeps a little in reserve — but only a little. Set much lower than this and
  // the parallax stops being felt at all, which is a flat photograph with extra
  // steps; the relief has to be worth the canvas or it should not be there.
  const amplitude = resolved.reliefDepth * (hasMeasured ? 1 : 0.85) * 6 /* DEBUG */
  const edge = { soft: 0.03, cut: 0.05 } /* DEBUG */

  const imageAspect = textureAspect(source, image.width && image.height ? image.width / image.height : 1.5)

  /**
   * Segment count follows the relief, not the setting. There is nothing for a
   * 330-segment plane to resolve in a 128 px field; the extra 100k triangles
   * would only cost frames.
   */
  const segments = useMemo(() => {
    const cap = Math.min(resolved.planeSegments, quality.planeSegments)
    const y = relief ? Math.round(relief.height * 1.5) : cap
    const segY = Math.max(12, Math.min(cap, y))
    return { x: Math.max(12, Math.round(segY * imageAspect)), y: segY }
  }, [relief, resolved.planeSegments, quality.planeSegments, imageAspect])

  /**
   * A unit-height plane. World size comes from `mesh.scale`, measured against
   * the live camera below, so the composition does not depend on a viewport
   * value captured at mount.
   */
  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uMap: { value: photo },
        uRelief: { value: relief?.texture ?? null },
        uTexel: { value: new Vector2(relief ? 1 / relief.width : 0, relief ? 1 / relief.height : 0) },
        uAmplitude: { value: relief ? amplitude : 0 },
        uEdgeSoft: { value: edge.soft },
        uEdgeCut: { value: edge.cut },
      },
      vertexShader: RELIEF_VERTEX,
      fragmentShader: RELIEF_FRAGMENT,
      toneMapped: false,
    })
  }, [photo, relief, amplitude, edge])

  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  const strength = resolved.parallaxStrength

  const groupRef = useRef<Group | null>(null)
  const meshRef = useRef<Mesh | null>(null)
  const coverRef = useRef(0)
  const rayRef = useRef(new Vector3())

  // Re-measure from scratch whenever the camera or the canvas changes; without
  // this the ratchet below would hold on to the widest framing an earlier
  // camera needed and crop the photograph for the rest of the session.
  useEffect(() => {
    coverRef.current = 0
  }, [camera, size.width, size.height])

  /**
   * Coverage. The plane grows to whatever the current camera can see of the
   * z = 0 plane and never shrinks, so the first (widest) waypoint sets the
   * composition and the dolly crops into it — which is the whole point of the
   * move. Measured rather than assumed: an editor can author any framing and
   * the relief still fills the frame, which is what the black band along the
   * top of the old hero was.
   */
  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const cam = state.camera
    if (!(cam instanceof PerspectiveCameraImpl)) return

    const direction = cam.getWorldDirection(rayRef.current)
    if (direction.z > -1e-3) return // looking away from (or along) the relief
    const travel = -cam.position.z / direction.z
    if (!(travel > 0)) return

    // Where the view axis crosses the relief, and how far away that is.
    const centreX = cam.position.x + direction.x * travel
    const centreY = cam.position.y + direction.y * travel
    const distance = Math.hypot(cam.position.x - centreX, cam.position.y - centreY, cam.position.z)

    const halfHeight = Math.tan((cam.fov * Math.PI) / 360) * distance
    const halfWidth = halfHeight * (state.size.width / Math.max(1, state.size.height))

    // The rim is tapered flat by the shader, so the relief itself never costs
    // coverage. The pointer parallax does: it slides the whole group, and tips
    // it far enough that the far rim loses a couple of percent of its angle.
    const slack = strength * 0.4
    const needHeight = 2 * (halfHeight + Math.abs(centreY) + slack) * overscan
    const needWidth = 2 * (halfWidth + Math.abs(centreX) + slack) * overscan
    const need = Math.max(needHeight, needWidth / imageAspect)

    if (need > coverRef.current * 1.002) {
      coverRef.current = need
      mesh.scale.setScalar(need)
      state.invalidate()
    }
  })

  // On a `demand` frameloop nothing would redraw while the pointer moves over
  // static geometry; one invalidate per move is enough to start the lerp, which
  // then keeps itself alive until it settles.
  useEffect(() => {
    if (strength <= 0) return
    const wake = (): void => invalidate()
    window.addEventListener('pointermove', wake, { passive: true })
    return () => window.removeEventListener('pointermove', wake)
  }, [strength, invalidate])

  /**
   * Pointer parallax. Mostly translation — sliding the relief past the camera
   * separates near from far without keystoning the photograph — plus a couple
   * of degrees of rotation, which is what stops a shallow relief from reading
   * as a picture on a wall. Both are small on purpose.
   */
  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group || strength <= 0) return
    const step = 1 - Math.exp(-2.4 * Math.min(delta, 0.1))
    const targetY = state.pointer.x * strength * 0.16
    const targetX = -state.pointer.y * strength * 0.1
    const targetPX = state.pointer.x * strength * 0.34
    const targetPY = -state.pointer.y * strength * 0.2

    const dy = targetY - group.rotation.y
    const dx = targetX - group.rotation.x
    const dpx = targetPX - group.position.x
    const dpy = targetPY - group.position.y
    if (Math.abs(dy) < 1e-4 && Math.abs(dx) < 1e-4 && Math.abs(dpx) < 1e-4 && Math.abs(dpy) < 1e-4) return

    group.rotation.y += dy * step
    group.rotation.x += dx * step
    group.position.x += dpx * step
    group.position.y += dpy * step
    state.invalidate()
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} receiveShadow={false} castShadow={false}>
        <planeGeometry args={[imageAspect, 1, segments.x, segments.y]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

export default DepthScene
