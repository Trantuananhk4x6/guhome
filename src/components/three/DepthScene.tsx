'use client'

import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type JSX } from 'react'
import {
  Color,
  Matrix4,
  PerspectiveCamera as PerspectiveCameraImpl,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  type Group,
  type Mesh,
} from 'three'
import type { MediaRef, SceneSettings } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import type { QualityProfile } from '@/lib/three/capability'
import { asOrbitControls, asOrbitEnvelope } from '@/lib/three/controls'
import { coverageOf, createExtent, envelopeCoverage, scaleForExtent } from '@/lib/three/coverage'
import { buildReliefField, conditionDepthField, meanColour, type ReliefField } from '@/lib/three/depth-field'
import { releaseTextures } from '@/lib/three/loaders'
import { RELIEF_EDGE, resolveSceneSettings, textureAspect } from '@/lib/three/scene-settings'

export interface DepthSceneProps {
  image: MediaRef
  depth: MediaRef | null
  settings: SceneSettings | null | undefined
  quality: QualityProfile
  /** Extra coverage beyond the frustum so the plane's edge never enters frame. */
  overscan?: number
}

/**
 * Ceiling on the relief plane, as a multiple of what the *live* framing needs.
 *
 * Covering the entire orbit envelope is not free: the photograph is mapped onto
 * the plane, so every unit of extra coverage is a unit of crop at rest. Past
 * about this much the visitor arrives at a heavily magnified centre detail of a
 * room they were meant to see whole, which is a worse failure than the one being
 * fixed. Beyond the ceiling the matte takes over — see `MATTE_MARGIN`.
 */
const MAX_ENVELOPE_COVER = 1.62

/** How far past the worst case the matte reaches. It is one flat colour: cheap. */
const MATTE_MARGIN = 1.7

/** …and how far past the relief it reaches when the envelope is open-ended. */
const MATTE_FALLBACK = 6

/**
 * Gap between the matte and the relief, as a fraction of the relief's size. The
 * relief displaces to ±½ × `reliefDepth` (≤ 0.07) in plane units, so anything
 * past that clears it; the rest is margin for the pointer tilt.
 */
const MATTE_SETBACK = 0.12

/** The matte when the photograph cannot be read back — warm, mid, never black. */
const MATTE_NEUTRAL: [number, number, number] = [0.42, 0.4, 0.37]

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
    // has a cliff at every occlusion boundary, and this is what finds it.
    float gradient = max( abs( right - left ), abs( up - down ) );

    // Relief eases off across the cliff, so the surface arrives at the far side
    // already flat instead of stretching a triangle over the step. The band it
    // leaves behind is flat and correctly textured — which is the whole degrade:
    // a photograph loses its parallax there, it does not lose its pixels.
    float carry = 1.0 - smoothstep( uEdgeSoft, uEdgeCut, gradient );

    // …and off again at the plane's rim, so the outermost ring stays exactly
    // where the coverage maths assumes it is.
    vec2 rim = smoothstep( vec2( 0.0 ), vec2( 0.04 ), uv ) * smoothstep( vec2( 0.0 ), vec2( 0.04 ), 1.0 - uv );
    float border = rim.x * rim.y;

    float offset = ( depth - 0.5 ) * uAmplitude * carry * border;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position + vec3( 0.0, 0.0, offset ), 1.0 );
  }
`

/**
 * No discard.
 *
 * There used to be one — `if ( vEdge > uEdgeCut ) discard;` — and it deleted
 * exactly the wrong fragments. `carry` above is `1 - smoothstep( soft, cut, g )`,
 * so displacement is already *identically zero* by the time the gradient reaches
 * `uEdgeCut`: past the cut the surface is flat, sitting on the plane, carrying
 * its texel unstretched. Those were the fragments being thrown away. The band
 * that actually stretches is the taper between `soft` and `cut`, where `carry`
 * is falling — and that band survived the test untouched. The result was a hole
 * punched through the good side of every cliff with the stretched side left in
 * frame, i.e. the opposite of the job.
 *
 * Inverting the test to `vEdge > uEdgeSoft && vEdge < uEdgeCut` was the other
 * candidate and it is worse than doing nothing: the taper band is a closed ring
 * around every steep feature, so discarding it perforates the relief with a
 * halo of holes and each hole shows the matte through the middle of the picture.
 * Once the taper has done its work there is nothing left worth deleting, so the
 * cut is gone and `uEdgeCut` survives only as the far end of the taper.
 */
const RELIEF_FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;

  varying vec2 vUv;

  void main() {
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
  const relief = useMemo<{ field: ReliefField; measured: boolean } | null>(() => {
    if (hasMeasured) {
      const field = conditionDepthField(measured.image)
      if (field) return { field, measured: true }
      // The map exists but could not be read. Falling through to the inferred
      // swell is right, and so is dropping to the inferred amplitude with it —
      // the trust travels with the field, not with the request.
    }
    const inferred = buildReliefField(source.image)
    return inferred ? { field: inferred, measured: false } : null
  }, [hasMeasured, measured, source])

  useEffect(() => {
    return () => {
      relief?.field.texture.dispose()
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
  const amplitude = resolved.reliefDepth * (relief?.measured ? 1 : 0.85)
  const edge = relief?.measured ? RELIEF_EDGE.measured : RELIEF_EDGE.inferred

  const imageAspect = textureAspect(source, image.width && image.height ? image.width / image.height : 1.5)

  /**
   * Segment count follows the relief, not the setting. There is nothing for a
   * 330-segment plane to resolve in a 128 px field; the extra 100k triangles
   * would only cost frames.
   */
  const segments = useMemo(() => {
    const cap = Math.min(resolved.planeSegments, quality.planeSegments)
    const y = relief ? Math.round(relief.field.height * 1.5) : cap
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
        uRelief: { value: relief?.field.texture ?? null },
        uTexel: {
          value: new Vector2(relief ? 1 / relief.field.width : 0, relief ? 1 / relief.field.height : 0),
        },
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

  /**
   * The matte the relief is backed with: the photograph's own mean colour, so
   * that anything the plane fails to cover degrades to a flat continuation of
   * the picture instead of to the clear colour. `InteriorScene` calls
   * `setClearAlpha(0)`, so "uncovered" means the espresso page behind the
   * canvas — a hole, and holes read as a broken build. A matte reads as a mount.
   */
  const matteColour = useMemo(() => {
    const mean = meanColour(source.image) ?? MATTE_NEUTRAL
    return new Color().setRGB(mean[0], mean[1], mean[2], SRGBColorSpace)
  }, [source])

  const groupRef = useRef<Group | null>(null)
  const meshRef = useRef<Mesh | null>(null)
  const matteRef = useRef<Mesh | null>(null)
  const coverRef = useRef(0)
  const matteCoverRef = useRef(0)
  const toLocalRef = useRef(new Matrix4())
  const extentRef = useRef(createExtent())
  /** Signature of the orbit envelope the fixed sizes below were solved for. */
  const envelopeKeyRef = useRef('')
  const envelopeCoverRef = useRef(0)
  const envelopeBoundedRef = useRef(true)

  // Re-measure from scratch whenever the camera or the canvas changes; without
  // this the sizing below would hold on to the widest framing an earlier camera
  // needed and crop the photograph for the rest of the session.
  useEffect(() => {
    coverRef.current = 0
    matteCoverRef.current = 0
    envelopeKeyRef.current = ''
  }, [camera, size.width, size.height])

  /**
   * Coverage — how big the plane has to be so its rim stays out of frame.
   *
   * The old maths intersected the camera's view *axis* with `z = 0` and took
   * `tan(fov / 2) × distance`, which is the right answer only when that axis is
   * the plane's normal. `mode="orbit"` exists precisely so the visitor can
   * break that assumption: one drag rakes the view, the frustum meets the plane
   * in a trapezium running away from the camera, and the formula understated it
   * badly enough that all four corners of the relief came into shot.
   * {@link coverageOf} makes no such assumption — it intersects the four
   * frustum corner rays with the plane, in the plane's own frame.
   *
   * Orbit is then sized **once**, against the worst pose its envelope allows,
   * rather than ratcheting per frame: a plane that grows mid-drag magnifies the
   * photograph while the visitor is moving, which is a second defect wearing the
   * first one's clothes. Scroll keeps the ratchet — there is no envelope there,
   * only an authored path, and its widest framing is its first frame.
   */
  useFrame((state) => {
    const mesh = meshRef.current
    const parent = mesh?.parent
    if (!mesh || !parent) return
    const cam = state.camera
    if (!(cam instanceof PerspectiveCameraImpl)) return

    // The relief group is translated and tipped by the pointer parallax, so the
    // plane's rim is not where world space says it is. Measure in its frame.
    parent.updateWorldMatrix(true, false)
    toLocalRef.current.copy(parent.matrixWorld).invert()

    const extent = extentRef.current
    // The rim is tapered flat by the shader, so the relief itself never costs
    // coverage. The pointer parallax does: it slides the whole group between the
    // frame this was solved on and the frame it is drawn on.
    const slack = strength * 0.4

    coverageOf(cam, toLocalRef.current, extent)
    extent.x += slack
    extent.y += slack
    const live = extent.bounded ? scaleForExtent(extent, imageAspect) * overscan : 0

    const controls = asOrbitControls(state.controls)
    const envelope = asOrbitEnvelope(state.controls)

    // An unbounded live pose — the horizon is in shot — has no finite answer, so
    // fall back on the size already held and let the matte do the rest.
    const held = Math.max(live, coverRef.current)
    let relief = live
    let matte = held * MATTE_FALLBACK

    if (controls && envelope) {
      const key = `${envelope.maxDistance.toFixed(3)}:${envelope.minPolarAngle.toFixed(3)}:${envelope.maxPolarAngle.toFixed(3)}:${envelope.minAzimuthAngle.toFixed(3)}:${envelope.maxAzimuthAngle.toFixed(3)}:${cam.fov.toFixed(2)}:${cam.aspect.toFixed(3)}`
      if (key !== envelopeKeyRef.current) {
        envelopeCoverage(cam, controls.target, envelope, toLocalRef.current, extent)
        extent.x += slack
        extent.y += slack
        envelopeKeyRef.current = key
        envelopeBoundedRef.current = extent.bounded
        envelopeCoverRef.current = scaleForExtent(extent, imageAspect) * overscan
      }
      const worst = envelopeCoverRef.current
      // Cover the envelope, but not at any price — see `MAX_ENVELOPE_COVER`.
      const ceiling = live > 0 ? live * MAX_ENVELOPE_COVER : worst
      relief = Math.max(live, Math.min(worst, ceiling))
      matte = envelopeBoundedRef.current
        ? Math.max(worst, relief) * MATTE_MARGIN
        : Math.max(held, relief) * MATTE_FALLBACK
    }

    let changed = false
    if (relief > coverRef.current * 1.002) {
      coverRef.current = relief
      mesh.scale.setScalar(relief)
      changed = true
    }
    const backing = matteRef.current
    if (backing && matte > matteCoverRef.current * 1.002) {
      matteCoverRef.current = matte
      backing.scale.setScalar(matte)
      changed = true
    }
    if (changed) {
      // Clear of the relief's own displacement, which is ±½ × `reliefDepth`.
      if (backing) backing.position.z = -coverRef.current * MATTE_SETBACK
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
      {/* Drawn first and never writing depth, so the relief always wins where
          the two overlap and the matte only ever shows past the relief's rim. */}
      <mesh ref={matteRef} renderOrder={-1} receiveShadow={false} castShadow={false}>
        <planeGeometry args={[imageAspect, 1]} />
        <meshBasicMaterial color={matteColour} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef} receiveShadow={false} castShadow={false}>
        <planeGeometry args={[imageAspect, 1, segments.x, segments.y]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

export default DepthScene
