'use client'

/**
 * EXPLORE SPACE — the orbit-mode 3D experience on a project page.
 *
 * COMPOSITION. The stage sits on the twelve-column grid with a rail of type
 * beside it: label and instruction at the top of columns 1–3, the scene's own
 * camera views and the three controls at the bottom of the same rail, and the
 * stage itself across columns 4–12, running off the right edge of the screen.
 *
 * It used to be a full-width picture floating in an espresso band with its type
 * laid over its own corners, which is the one composition on a project page
 * that answers to nothing around it — a dark rectangle between two limestone
 * ones. Beside a rail it reads as a plate that was placed, and the rail is
 * carrying real information rather than framing: the four authored views are
 * the same four stops "Tự động khám phá" walks, so the reader can see what the
 * walk is going to do before starting it.
 *
 * Three controls, all of them hairline text: auto explore, fullscreen, reset.
 * Nothing here should read as a game HUD; the space is the interface. In
 * fullscreen the rail is off-screen — the stage is the fullscreen element — so
 * that one case, and only that case, draws an exit control over the picture.
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
import { cn, pad2 } from '@/lib/utils'
import type { MediaRef, SceneConfig } from '@/types/content'

import { BLEED_R, SCRIM_B } from './composition'

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

/** The authored view names, in walk order. Empty when the scene names none. */
function waypointLabels(scene: SceneConfig): string[] {
  const named = scene.waypoints
    .map((point) => point.label?.trim() ?? '')
    .filter((label) => label.length > 0)
  return named.length >= 2 ? named : []
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

  const views = waypointLabels(scene)
  // A scene that names camera views is a reconstruction the reader can walk. A
  // scene that names none is `mode: IMAGE` — one photograph with a parallax
  // camera on it, which is 16 of the 27 scenes in the catalogue. Giving that the
  // same 780px of screen as a walkable room is the over-claim that makes a page
  // feel padded, and it is also what leaves the rail beside it holding two small
  // blocks 600px apart. One step down on both counts.
  const walkable = views.length > 0

  const stage = (
    <div
      ref={stageRef}
      onPointerDown={handleInteract}
      onWheel={handleInteract}
      // The copy in the rail says "kéo để xoay" — `CustomCursor` shows KÉO to match.
      data-cursor="drag"
      className={cn(
        'bg-espresso border-canvas/12 relative isolate w-full overflow-hidden border',
        // A portrait plate on a phone, a landscape one on a desktop where it is
        // nine columns wide and bleeding to the edge. 68svh against a 1160px
        // stage is roughly 1.7:1 — the widest frame on the page after the hero.
        !walkable
          ? 'h-[42svh] min-h-[16rem] lg:h-[56svh] lg:min-h-[22rem]'
          : height === 'screen'
            ? 'h-[56svh] min-h-[20rem] lg:h-[78svh] lg:min-h-[30rem]'
            : 'h-[52svh] min-h-[19rem] lg:h-[68svh] lg:min-h-[26rem]',
        isFullscreen && 'h-screen border-0 lg:h-screen',
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

      {/*
        The only type this frame ever carries, and only while the rail that
        normally holds it is off-screen. Esc leaves fullscreen too, but a control
        the reader can see is not optional. The scrim is doubled because the
        scene under it is one the reader is rotating: it has to hold against a
        white curtain at noon as well as against a dark corner, and two passes of
        the shared recipe reach ~86% at the very edge while leaving the middle of
        the frame — the part being explored — untouched.
      */}
      {isFullscreen ? (
        <>
          <span aria-hidden="true" style={SCRIM_B} className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%]" />
          <span aria-hidden="true" style={SCRIM_B} className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%]" />
          <div className="u-gutter absolute inset-x-0 bottom-0 pb-8">
            <Button variant="underline" tone="light" onClick={toggleFullscreen} aria-pressed>
              Thoát toàn màn hình
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )

  return (
    <section
      ref={sectionRef}
      data-reveal
      className={cn('bg-espresso py-[var(--spacing-section)]', className)}
    >
      {/*
        ROWS SIZED TO THEIR CONTENT. The stage spans both rows of the rail, and
        with two `auto` tracks the grid hands the stage's surplus height to each
        of them equally. For a scene that names no camera views — 16 of the 27
        in the catalogue — the rail then holds an 82px head in a 262px track and
        a ~100px control stack in another, with 378px of nothing between them.
        `auto 1fr` gives the head exactly its own height and the remainder to
        the second track, so the controls sit either on the stage's baseline
        (a walkable scene, where the view list fills the track above them) or
        directly under the head (everything else). Neither leaves a hole.
      */}
      <div className="u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12 gap-x-8 gap-y-9 lg:grid-rows-[auto_1fr]">
        {/* Rail, top: what this is and how it answers to a pointer. */}
        <div className="col-span-12 lg:col-span-3 lg:col-start-1 lg:row-start-1">
          <p className="u-label text-canvas/75 flex items-center gap-3">
            <span aria-hidden="true" className="bg-accent-soft h-px w-8 shrink-0" />
            {label}
          </p>
          <p className="text-canvas/70 mt-6 max-w-[30ch] text-sm leading-relaxed">
            Kéo để xoay, cuộn để tiến lại gần.
          </p>
        </div>

        {/* The stage: nine columns, off the right edge of the screen. */}
        <div className={cn('col-span-12 lg:col-span-9 lg:col-start-4 lg:row-span-2 lg:row-start-1', BLEED_R)}>
          {stage}
        </div>

        {/* Rail, foot: the walk, then the controls, both on the stage's baseline. */}
        <div
          className={cn(
            'col-span-12 flex flex-col gap-9 lg:col-span-3 lg:col-start-1 lg:row-start-2',
            walkable ? 'lg:self-end' : 'lg:self-start',
          )}
        >
          {views.length > 0 ? (
            <div>
              <p className="u-label text-canvas/60">Điểm nhìn</p>
              <ol className="mt-4 flex flex-col">
                {views.map((view, i) => (
                  <li
                    key={`${view}-${i}`}
                    className="border-canvas/15 flex items-baseline gap-4 border-t py-3 last:border-b"
                  >
                    <span className="u-label text-accent-soft shrink-0">{pad2(i + 1)}</span>
                    <span className="text-canvas/80 text-[0.9375rem] leading-snug">{view}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-9 gap-y-4 lg:flex-col lg:items-start lg:gap-y-5">
            <Button variant="underline" tone="light" onClick={handleAutoExplore} aria-pressed={autoExplore}>
              {autoExplore ? 'Dừng khám phá' : 'Tự động khám phá'}
            </Button>
            <Button variant="underline" tone="light" onClick={toggleFullscreen} aria-pressed={isFullscreen}>
              Toàn màn hình
            </Button>
            <Button variant="underline" tone="light" onClick={handleReset}>
              Đặt lại góc nhìn
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
