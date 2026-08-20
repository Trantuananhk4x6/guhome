'use client'

/**
 * EXPLORE SPACE — the orbit-mode 3D experience on a project page.
 *
 * Three controls, all of them hairline text: fullscreen, auto explore, reset.
 * Nothing here should read as a game HUD; the space is the interface.
 *
 * AUTO EXPLORE walks the scene's camera waypoints on a GSAP timeline that writes
 * into `progressRef` — never into React state, so the walk costs no renders.
 */

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'

import { gsap, registerGsap } from '@/animations/gsap'
import { useReveal } from '@/animations/reveal'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import type { MediaRef, SceneConfig } from '@/types/content'

/** Three / R3F stays out of the server bundle and out of every other route. */
const InteriorScene = dynamic(
  () => import('@/components/three/InteriorScene').then((m) => m.InteriorScene),
  { ssr: false },
)

/** Seconds spent travelling between two waypoints at animationSpeed = 1. */
const LEG_SECONDS = 4.5
/** Pause on arrival, so a waypoint reads as a composed view rather than a fly-by. */
const HOLD_SECONDS = 1.1

export interface Project3DProps {
  scene: SceneConfig | null
  /** Shown when WebGL is unavailable — usually the project cover. */
  fallbackImage?: MediaRef | null
  /** Small English label above the frame. */
  label?: string
  /** Text alternative for the canvas, required by the a11y contract. */
  description: string
  height?: 'screen' | 'tall'
  className?: string
}

interface FullscreenElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void> | void
}

interface FullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void> | void
  webkitFullscreenElement?: Element | null
}

/** Normalised 0..1 stops for the timeline, one per waypoint. */
function waypointStops(scene: SceneConfig): number[] {
  const points = scene.waypoints
  if (points.length < 2) return [0, 1]
  return points.map((point, i) => {
    const at = point.at
    if (typeof at === 'number' && Number.isFinite(at)) return Math.min(1, Math.max(0, at))
    return i / (points.length - 1)
  })
}

export function Project3D({
  scene,
  fallbackImage,
  label = 'Explore space',
  description,
  height = 'tall',
  className,
}: Project3DProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const openedRef = useRef(false)
  const interactedRef = useRef(false)

  const [autoExplore, setAutoExplore] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [sceneKey, setSceneKey] = useState(0)

  useReveal(sectionRef, { variant: 'revealUp' })

  const killTimeline = useCallback((): void => {
    timelineRef.current?.kill()
    timelineRef.current = null
  }, [])

  /* ------------------------------- auto explore ------------------------------ */

  useEffect(() => {
    if (!autoExplore || !scene) return
    registerGsap()

    const stops = waypointStops(scene)
    const speed = scene.animationSpeed > 0 ? scene.animationSpeed : 1
    const proxy = { value: progressRef.current }
    const write = (): void => {
      progressRef.current = proxy.value
    }

    const timeline = gsap.timeline({ repeat: -1, onUpdate: write })
    let previous = proxy.value

    for (const stop of stops) {
      const distance = Math.abs(stop - previous) || 0.001
      timeline
        .to(proxy, {
          value: stop,
          duration: (LEG_SECONDS * distance) / speed,
          ease: 'power1.inOut',
          onUpdate: write,
        })
        .to({}, { duration: HOLD_SECONDS / speed })
      previous = stop
    }

    // Close the loop back to the first stop so the repeat does not snap.
    timeline.to(proxy, {
      value: stops[0] ?? 0,
      duration: LEG_SECONDS / speed,
      ease: 'power1.inOut',
      onUpdate: write,
    })

    timelineRef.current = timeline
    return () => {
      timeline.kill()
      if (timelineRef.current === timeline) timelineRef.current = null
    }
  }, [autoExplore, scene])

  /* -------------------------------- fullscreen ------------------------------- */

  useEffect(() => {
    const onChange = (): void => {
      const doc = document as FullscreenDocument
      setIsFullscreen(Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement))
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = useCallback((): void => {
    const doc = document as FullscreenDocument
    const stage = stageRef.current as FullscreenElement | null
    if (!stage) return

    if (doc.fullscreenElement ?? doc.webkitFullscreenElement) {
      if (typeof doc.exitFullscreen === 'function') void Promise.resolve(doc.exitFullscreen()).catch(() => undefined)
      else if (doc.webkitExitFullscreen) void Promise.resolve(doc.webkitExitFullscreen()).catch(() => undefined)
      return
    }

    if (typeof stage.requestFullscreen === 'function') {
      void Promise.resolve(stage.requestFullscreen()).catch(() => undefined)
    } else if (stage.webkitRequestFullscreen) {
      void Promise.resolve(stage.webkitRequestFullscreen()).catch(() => undefined)
    }
  }, [])

  /* -------------------------------- analytics -------------------------------- */

  const sceneId = scene?.id
  const projectId = scene?.projectId ?? undefined

  const payload = useCallback(
    () => ({ entityType: 'scene', ...(sceneId ? { entityId: sceneId } : {}), meta: { projectId } }),
    [sceneId, projectId],
  )

  const handleReady = useCallback((): void => {
    if (openedRef.current) return
    openedRef.current = true
    trackEvent('THREE_OPEN', payload())
  }, [payload])

  const handleInteract = useCallback((): void => {
    if (interactedRef.current) return
    interactedRef.current = true
    trackEvent('THREE_INTERACT', payload())
  }, [payload])

  const handleAutoExplore = useCallback((): void => {
    setAutoExplore((current) => {
      const next = !current
      if (next) trackEvent('THREE_AUTO_EXPLORE', payload())
      return next
    })
  }, [payload])

  const handleReset = useCallback((): void => {
    killTimeline()
    setAutoExplore(false)
    progressRef.current = 0
    // Remounting is the only reliable way to put orbit controls back to their
    // authored starting frame.
    setSceneKey((key) => key + 1)
  }, [killTimeline])

  if (!scene || scene.mode === 'NONE') return null

  return (
    <section
      ref={sectionRef}
      data-reveal
      className={cn('bg-espresso py-[var(--spacing-section)]', className)}
    >
      <div className="u-gutter mx-auto flex w-full max-w-[110rem] flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="u-label text-canvas/60 flex items-center gap-3">
            <span aria-hidden="true" className="bg-accent h-px w-8" />
            {label}
          </p>
          <p className="text-canvas/45 max-w-[46ch] text-sm leading-relaxed">
            Kéo để xoay, cuộn để tiến lại gần. Chọn <span className="text-canvas/70">Tự động khám phá</span> để
            camera đi theo hành trình đã dựng sẵn.
          </p>
        </div>

        <div
          ref={stageRef}
          onPointerDown={handleInteract}
          onWheel={handleInteract}
          // The copy above says "kéo để xoay" — `CustomCursor` shows KÉO to match.
          data-cursor="drag"
          className={cn(
            'bg-espresso relative isolate w-full overflow-hidden',
            height === 'screen' ? 'h-[92svh]' : 'h-[72svh] min-h-[30rem]',
            isFullscreen && 'h-screen',
          )}
        >
          <div aria-hidden="true" className="absolute inset-0">
            <InteriorScene
              key={sceneKey}
              config={scene}
              progressRef={progressRef}
              mode="orbit"
              autoExplore={autoExplore}
              fallbackImage={fallbackImage ?? null}
              className="h-full w-full"
              onReady={handleReady}
            />
          </div>
          <p className="sr-only">{description}</p>
        </div>

        <div className="border-canvas/15 flex flex-wrap items-center gap-x-10 gap-y-4 border-t pt-6">
          <Button variant="underline" tone="light" onClick={handleAutoExplore} aria-pressed={autoExplore}>
            {autoExplore ? 'Dừng khám phá' : 'Tự động khám phá'}
          </Button>
          <Button variant="underline" tone="light" onClick={toggleFullscreen} aria-pressed={isFullscreen}>
            {isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
          </Button>
          <Button variant="underline" tone="light" onClick={handleReset}>
            Đặt lại góc nhìn
          </Button>
        </div>
      </div>
    </section>
  )
}
