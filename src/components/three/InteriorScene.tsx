'use client'

import { AdaptiveDpr, Preload } from '@react-three/drei'
import { Canvas, useThree, type RootState } from '@react-three/fiber'
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type MutableRefObject,
} from 'react'
import type { ToneMapping } from 'three'
import type { MediaRef, SceneConfig } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import { motionFlag, useMotionStore, useReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { recommendedQuality, supportsWebGL, type QualityProfile } from '@/lib/three/capability'
import { resolveSceneSettings, resolveToneMapping, waypointsFor } from '@/lib/three/scene-settings'
import { CameraPath } from '@/components/three/CameraPath'
import { SceneBoundary } from '@/components/three/SceneBoundary'
import { SceneCamera } from '@/components/three/SceneCamera'
import { SceneEnvironment } from '@/components/three/SceneEnvironment'
import { SceneFallback } from '@/components/three/SceneFallback'
import { SceneLighting } from '@/components/three/SceneLighting'
import { ThreeLoader } from '@/components/three/ThreeLoader'

// Mode-specific scenes and post are code-split: a project that only uses
// DEPTH_2_5D never downloads the GLB or room-box paths.
const ModelViewer = lazy(() => import('@/components/three/ModelViewer'))
const DepthScene = lazy(() => import('@/components/three/DepthScene'))
const ProceduralScene = lazy(() => import('@/components/three/ProceduralScene'))
const SceneEffects = lazy(() => import('@/components/three/SceneEffects'))

export interface InteriorSceneProps {
  config: SceneConfig
  /** 0..1 scroll-driven camera progress, mutated outside React. */
  progressRef?: MutableRefObject<number>
  mode?: 'scroll' | 'orbit'
  autoExplore?: boolean
  fallbackImage?: MediaRef | null
  className?: string
  onReady?: () => void
}

type SceneKind =
  | { kind: 'model'; url: string }
  | { kind: 'depth'; image: MediaRef; depth: MediaRef | null }
  | { kind: 'room'; image: MediaRef }
  | { kind: 'none' }

function resolveKind(config: SceneConfig): SceneKind {
  const model = config.model && config.model.kind === 'glb' ? config.model : null
  switch (config.mode) {
    case 'NATIVE_GLB':
      return model ? { kind: 'model', url: mediaUrl(model) } : { kind: 'none' }
    case 'DEPTH_2_5D':
      return config.sourceImage
        ? { kind: 'depth', image: config.sourceImage, depth: config.depthMap }
        : { kind: 'none' }
    case 'PROCEDURAL_3D':
      // The recon pipeline exports a GLB for approved procedural rooms; when it
      // exists it is always better than rebuilding the box at runtime.
      if (model) return { kind: 'model', url: mediaUrl(model) }
      return config.sourceImage ? { kind: 'room', image: config.sourceImage } : { kind: 'none' }
    default:
      return { kind: 'none' }
  }
}

/** Keeps renderer-level settings in sync after the canvas has been created. */
function RendererSettings({ exposure, toneMapping }: { exposure: number; toneMapping: ToneMapping }): null {
  const gl = useThree((state) => state.gl)
  const invalidate = useThree((state) => state.invalidate)
  const frameloop = useThree((state) => state.frameloop)

  useEffect(() => {
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
 * The single entry point for every 3D moment on the site.
 *
 * Consumers should still import it through `next/dynamic({ ssr: false })` so
 * three.js stays out of the initial bundle; this component then decides — on
 * the client, after measuring the device — whether a canvas is warranted at
 * all. Until it is ready (and forever, on weak devices, without WebGL, or
 * under reduced motion) the visitor sees a full-bleed photograph instead.
 */
export function InteriorScene({
  config,
  progressRef,
  mode = 'scroll',
  autoExplore,
  fallbackImage,
  className,
  onReady,
}: InteriorSceneProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const onReadyRef = useRef(onReady)
  const [caps, setCaps] = useState<{ webgl: boolean; quality: QualityProfile } | null>(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [curtainDone, setCurtainDone] = useState(false)
  const [inView, setInView] = useState(false)

  // Reduced motion, the admin's motion switches and the OS preference all come
  // from the motion store — `useReducedMotion` also arms the media query so a
  // scene rendered outside `ScrollProvider` still honours the system setting.
  const motionConfig = useMotionStore((state) => state.config)
  const systemReduced = useMotionStore((state) => state.reduced)
  const reduced = useReducedMotion()
  const motionAllows3d = motionFlag(motionConfig, systemReduced, 'threeDAnimation')
  const motionAllowsCamera = motionFlag(motionConfig, systemReduced, 'cameraAnimation')

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  // Capability probing is client-only, so the server render always emits the
  // photograph — good for LCP, and nothing shifts when the canvas takes over.
  useEffect(() => {
    setCaps({ webgl: supportsWebGL(), quality: recommendedQuality() })
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting)
      },
      { rootMargin: '25% 0px', threshold: 0 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const settings = useMemo(() => resolveSceneSettings(config.settings), [config.settings])
  const waypoints = useMemo(() => waypointsFor(config), [config])
  const kind = useMemo(() => resolveKind(config), [config])
  const toneMapping = useMemo(() => resolveToneMapping(settings.toneMapping), [settings.toneMapping])

  const fallback = fallbackImage ?? config.sourceImage ?? null
  const quality = caps?.quality ?? null

  const canRender =
    caps !== null &&
    caps.webgl &&
    caps.quality.perf !== 'low' &&
    kind.kind !== 'none' &&
    motionAllows3d &&
    !reduced &&
    !failed

  const explore = autoExplore ?? config.autoExplore
  const dynamicLoop = mode === 'orbit' || explore || progressRef !== undefined
  const frameloop = !inView ? 'never' : dynamicLoop ? 'always' : 'demand'

  const handleCreated = useCallback(
    (state: RootState) => {
      state.gl.toneMapping = toneMapping
      state.gl.toneMappingExposure = config.exposure > 0 ? config.exposure : 1
      state.gl.setClearAlpha(0)
    },
    [toneMapping, config.exposure],
  )

  const handleMounted = useCallback(() => {
    setReady(true)
    onReadyRef.current?.()
  }, [])

  const handleError = useCallback(() => {
    setFailed(true)
    setReady(false)
    setCurtainDone(true)
  }, [])

  const handleCurtainDone = useCallback(() => {
    setCurtainDone(true)
  }, [])

  const description = config.sourceImage?.alt ?? fallback?.alt ?? null
  const showPhoto = !canRender || !ready

  return (
    <div
      ref={rootRef}
      className={cn('relative isolate h-full w-full overflow-hidden', className)}
      style={{ backgroundColor: settings.background ?? 'var(--c-espresso)' }}
      data-scene-mode={config.mode}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: showPhoto ? 1 : 0,
          transition: 'opacity 1.4s var(--ease-editorial)',
        }}
      >
        <SceneFallback image={fallback} parallax={!canRender} />
      </div>

      {canRender && quality && (
        <SceneBoundary fallback={null} onError={handleError} resetKey={config.id}>
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
              <RendererSettings exposure={config.exposure > 0 ? config.exposure : 1} toneMapping={toneMapping} />
              <SceneCamera config={config} mode={mode} autoRotate={mode === 'orbit' && explore} />
              {mode === 'scroll' && (
                <CameraPath
                  waypoints={waypoints}
                  progressRef={progressRef}
                  fov={config.fov > 1 ? config.fov : 45}
                  autoExplore={explore}
                  speed={config.animationSpeed}
                  enabled={motionAllowsCamera}
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
                <SceneEffects settings={config.settings} quality={quality} />
                <Preload all />
                <SceneReady onMounted={handleMounted} />
              </Suspense>

              {quality.perf !== 'high' && <AdaptiveDpr />}
            </Canvas>
          </div>
        </SceneBoundary>
      )}

      {/* The curtain owns its own exit tween, so it stays mounted until it says
          it is finished — unmounting on `ready` would cut the crossfade. */}
      {canRender && !curtainDone && <ThreeLoader image={fallback} onDone={handleCurtainDone} />}

      {description && <p className="sr-only">{description}</p>}
    </div>
  )
}

export default InteriorScene
