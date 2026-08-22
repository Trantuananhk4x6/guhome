'use client'

import { AdaptiveDpr, Preload } from '@react-three/drei'
import { Canvas, useThree, type RootState } from '@react-three/fiber'
import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, type JSX, type MutableRefObject } from 'react'
import type { ToneMapping } from 'three'
import type { MediaRef, SceneConfig } from '@/types/content'
import type { QualityProfile } from '@/lib/three/capability'
import { resolveToneMapping } from '@/lib/three/gl-settings'
import type { SceneKind } from '@/lib/three/scene-kind'
import { resolveSceneSettings, waypointsFor } from '@/lib/three/scene-settings'
import { CameraPath } from '@/components/three/CameraPath'
import { SceneCamera } from '@/components/three/SceneCamera'
import { SceneEnvironment } from '@/components/three/SceneEnvironment'
import { SceneLighting } from '@/components/three/SceneLighting'
import { ThreeLoader } from '@/components/three/ThreeLoader'

// Mode-specific scenes and post are code-split: a project that only uses
// DEPTH_2_5D never downloads the GLB or room-box paths.
const ModelViewer = lazy(() => import('@/components/three/ModelViewer'))
const DepthScene = lazy(() => import('@/components/three/DepthScene'))
const ProceduralScene = lazy(() => import('@/components/three/ProceduralScene'))
const SceneEffects = lazy(() => import('@/components/three/SceneEffects'))

/** How long a lost WebGL context has to come back before we return to the photo. */
const CONTEXT_RESTORE_GRACE_MS = 1200

export interface SceneCanvasProps {
  config: SceneConfig
  kind: Exclude<SceneKind, { kind: 'none' }>
  quality: QualityProfile
  progressRef?: MutableRefObject<number>
  mode: 'scroll' | 'orbit'
  /** Waypoints own the camera — decided by the shell, which holds the a11y flags. */
  pathDriven: boolean
  frameloop: 'always' | 'demand' | 'never'
  /**
   * The scene graph has mounted and the first frame is drawn — the shell's
   * `onMounted` handshake, handed back so the crossfade off the photograph
   * lives on the element it fades.
   */
  ready: boolean
  /** The visitor grabbed the canvas mid-walk; the shell ends the walk. */
  onHandoff: () => void
  /** The suspended scene graph has mounted and the first frame is scheduled. */
  onMounted: () => void
  onLost: () => void
  /** The curtain only earns its place over an empty frame — see `InteriorScene`. */
  curtain: boolean
  curtainImage?: MediaRef | null
  onCurtainDone: () => void
}

/** Keeps renderer-level settings in sync after the canvas has been created. */
function RendererSettings({ exposure, toneMapping }: { exposure: number; toneMapping: ToneMapping }): null {
  const gl = useThree((state) => state.gl)
  const invalidate = useThree((state) => state.invalidate)
  const frameloop = useThree((state) => state.frameloop)

  useEffect(() => {
    // react-hooks/immutability wants the mutation moved into the hook that
    // constructs the value. That hook is R3F's own <Canvas>, which we do not
    // own — tone mapping is renderer state and there is no declarative route to
    // it. This is the imperative escape hatch the rule cannot model, not a
    // missed refactor.
    // eslint-disable-next-line react-hooks/immutability
    gl.toneMapping = toneMapping
    gl.toneMappingExposure = exposure
    invalidate()
  }, [gl, exposure, toneMapping, invalidate])

  // Waking from `never` (scrolled back into view) does not schedule a frame by
  // itself — without this a demand-driven scene would come back blank.
  useEffect(() => {
    if (frameloop !== 'never') invalidate()
  }, [frameloop, invalidate])

  return null
}

/** Fires once the suspended scene graph has actually mounted. */
function SceneReady({ onMounted }: { onMounted: () => void }): null {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    onMounted()
    invalidate()
  }, [onMounted, invalidate])
  return null
}

/**
 * Everything that needs three.js.
 *
 * This module is the 1.2 MB — three, R3F, drei, and through `SceneEffects`
 * postprocessing. It is reached only through the `lazy()` import in
 * `InteriorScene`, which arms that import behind proximity and idle time rather
 * than on mount. Nothing here may be imported back into the shell as a value:
 * one such import and the deferral is undone.
 */
export function SceneCanvas({
  config,
  kind,
  quality,
  progressRef,
  mode,
  pathDriven,
  frameloop,
  ready,
  onHandoff,
  onMounted,
  onLost,
  curtain,
  curtainImage,
  onCurtainDone,
}: SceneCanvasProps): JSX.Element {
  const contextTimer = useRef<number | null>(null)
  const onLostRef = useRef(onLost)

  const settings = useMemo(() => resolveSceneSettings(config.settings), [config.settings])
  const waypoints = useMemo(() => waypointsFor(config), [config])
  const toneMapping = useMemo(() => resolveToneMapping(settings.toneMapping), [settings.toneMapping])
  const exposure = config.exposure > 0 ? config.exposure : 1

  useEffect(() => {
    onLostRef.current = onLost
  }, [onLost])

  useEffect(() => {
    return () => {
      if (contextTimer.current !== null) {
        window.clearTimeout(contextTimer.current)
        contextTimer.current = null
      }
    }
  }, [])

  // A lost context is not a React throw, so the boundary above never sees it —
  // without this the canvas would simply go black over a photograph that has
  // already faded out. Browsers usually hand the context back, so give them a
  // moment before conceding and returning to the still.
  const handleCreated = useCallback(
    (state: RootState) => {
      state.gl.toneMapping = toneMapping
      state.gl.toneMappingExposure = exposure
      state.gl.setClearAlpha(0)

      const canvas = state.gl.domElement
      canvas.addEventListener('webglcontextlost', () => {
        if (contextTimer.current !== null) return
        contextTimer.current = window.setTimeout(() => {
          contextTimer.current = null
          onLostRef.current()
        }, CONTEXT_RESTORE_GRACE_MS)
      })
      canvas.addEventListener('webglcontextrestored', () => {
        if (contextTimer.current === null) return
        window.clearTimeout(contextTimer.current)
        contextTimer.current = null
      })
    },
    [toneMapping, exposure],
  )

  /*
    Post is `lazy()`, so mounting it *is* the 175 KB download. `SceneEffects`
    used to make this decision inside itself and return null — after the chunk
    had already arrived. These are its own conditions, hoisted to the one place
    where answering them still saves the request.
  */
  const wantsEffects =
    quality.postprocessing &&
    quality.perf !== 'low' &&
    (settings.bloom > 0.001 || settings.vignette > 0.001 || (!quality.antialias && quality.perf === 'high'))

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.6s var(--ease-editorial)' }}
      >
        <Canvas
          dpr={quality.dpr}
          frameloop={frameloop}
          shadows={config.shadows && quality.perf !== 'low' ? 'soft' : false}
          performance={{ min: 0.4 }}
          gl={{
            alpha: true,
            antialias: quality.antialias,
            stencil: false,
            depth: true,
            preserveDrawingBuffer: false,
            powerPreference: quality.perf === 'high' ? 'high-performance' : 'default',
          }}
          onCreated={handleCreated}
          eventPrefix="client"
        >
          <RendererSettings exposure={exposure} toneMapping={toneMapping} />
          <SceneCamera config={config} mode={mode} pathDriven={pathDriven} />
          {pathDriven && (
            <CameraPath
              waypoints={waypoints}
              progressRef={progressRef}
              fov={config.fov > 1 ? config.fov : 45}
              /* Orbit mode has no scroll to follow, so AUTO EXPLORE runs the
                 authored schedule itself — legs, holds and all. */
              driver={mode === 'orbit' ? 'tour' : 'progress'}
              speed={config.animationSpeed}
              blendSeconds={mode === 'orbit' ? 1.4 : 0}
              yieldOnPointer={mode === 'orbit'}
              onYield={onHandoff}
            />
          )}

          <SceneEnvironment config={config} quality={quality} />
          <SceneLighting config={config} quality={quality} />

          <Suspense fallback={null}>
            {kind.kind === 'model' && (
              <ModelViewer url={kind.url} settings={config.settings} shadows={config.shadows} />
            )}
            {kind.kind === 'depth' && (
              <DepthScene image={kind.image} depth={kind.depth} settings={config.settings} quality={quality} />
            )}
            {kind.kind === 'room' && (
              <ProceduralScene image={kind.image} settings={config.settings} quality={quality} />
            )}
            {wantsEffects && <SceneEffects settings={config.settings} quality={quality} />}
            <Preload all />
            <SceneReady onMounted={onMounted} />
          </Suspense>

          {quality.perf !== 'high' && <AdaptiveDpr />}
        </Canvas>
      </div>

      {/* The curtain owns its own exit tween, so it stays mounted until it says
          it is finished — unmounting on `ready` would cut the crossfade. It also
          owns the decision not to appear at all: `sceneId` is how it recognises
          a scene this document has already prepared, and skips. */}
      {curtain && <ThreeLoader image={curtainImage} sceneId={config.id} onDone={onCurtainDone} />}
    </>
  )
}

export default SceneCanvas
