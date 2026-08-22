'use client'

import Image from 'next/image'
import { useProgress } from '@react-three/drei'
import { useEffect, useRef, useState, type JSX } from 'react'
import { gsap, registerGsap } from '@/animations/gsap'
import type { MediaRef } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import { BrandMark } from '@/components/ui/BrandMark'
import { clamp, cn } from '@/lib/utils'

export interface ThreeLoaderProps {
  /** Shown blurred behind the label — the room you are about to walk into. */
  image?: MediaRef | null
  /**
   * `SceneConfig.id`. A scene that has already been through the curtain in this
   * document does not get a second one — see {@link prepared}.
   */
  sceneId?: string
  label?: string
  className?: string
  onDone?: () => void
}

/**
 * Scenes already prepared in this document.
 *
 * Module scope on purpose: warmth is a property of the browsing session, not of
 * any React tree, and every route inside the app shares this module. A scene
 * that remounts — fullscreen toggled, the block re-keyed, the visitor coming
 * back to a project they have already opened — has its textures in drei's
 * loader cache and its geometry already uploaded. There is nothing to prepare,
 * so there is no curtain: the entry is read during the first render, before
 * anything paints, and the component returns `null` without ever appearing.
 */
const prepared = new Set<string>()

/** How long we wait for a loader to register before deciding nothing will. */
const IDLE_GRACE_MS = 700

/**
 * Debounce on "the loaders went quiet". `Preload all` and the environment map
 * register after the textures do, so an exit on the very first quiet frame can
 * be interrupted by a second wave.
 */
const SETTLE_MS = 140

/**
 * Settle inside this and the assets were plainly already in the browser's
 * cache — nothing was fetched, the hairline went 000→100 before the visitor
 * could read the label. Requirement 48 asks for the preloader to be *skipped*
 * in that case; a fresh document cannot know it is warm until the loaders
 * report, so the closest honest thing is to leave the moment they do.
 */
const CACHED_MS = 520

/** Requirement 48's ceiling: the curtain's whole life fits inside this. */
const MAX_VISIBLE_MS = 2000

/** The cached exit: one short dissolve, no hold. */
const QUICK_FADE_S = 0.3

/** The editorial exit — a beat, then a slow crossfade. */
const EXIT_DELAY_S = 0.1
const EXIT_MIN_S = 0.34
const EXIT_MAX_S = 0.85

/**
 * How the curtain leaves, given how long it has already been on screen.
 *
 * The old exit was fixed at `0.12 + 0.95`, which put a hard floor of ~1.25s on
 * top of however long the loading itself took — so a warm reload whose loaders
 * were quiet in 185ms still sat under espresso for well over a second, and a
 * cold load blew straight past requirement 48's two-second ceiling. Scaling the
 * exit to the wait fixes both ends: an instant load leaves instantly, and a slow
 * one spends what is left of the budget rather than a fixed second on top of it.
 *
 * The 0.8s floor holds by construction — the editorial branch cannot be entered
 * before `CACHED_MS`, so its shortest life is 520 + 100 + 340 = 960ms — and the
 * quick branch is the branch requirement 48 wants skipped outright.
 */
export function exitSchedule(elapsedMs: number): { delay: number; duration: number } {
  if (elapsedMs < CACHED_MS) return { delay: 0, duration: QUICK_FADE_S }
  const budget = (MAX_VISIBLE_MS - elapsedMs) / 1000 - EXIT_DELAY_S
  return { delay: EXIT_DELAY_S, duration: clamp(budget, EXIT_MIN_S, EXIT_MAX_S) }
}

/**
 * The scene curtain. Blurred still of the project, one editorial label, one
 * hairline that fills with progress — then a slow GSAP crossfade out. No
 * spinners: the studio does not spin.
 *
 * And no curtain at all over a room that is already standing.
 */
export function ThreeLoader({
  image,
  sceneId,
  label = 'PREPARING SPACE',
  className,
  onDone,
}: ThreeLoaderProps): JSX.Element | null {
  const { active, progress, errors } = useProgress()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const fillRef = useRef<HTMLDivElement | null>(null)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)
  /**
   * Decided during the first render rather than in an effect: an effect would
   * paint one espresso frame before it could hide itself, which on a warm scene
   * is a black flash across an image that is already on screen.
   */
  const [hidden, setHidden] = useState(() => sceneId !== undefined && prepared.has(sceneId))
  const [mountedAt] = useState(() => performance.now())

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  /**
   * The skip. `hidden` was already true when the component first rendered, so
   * nothing has painted and there is nothing to fade — all that is left is to
   * tell the scene it may show itself. Declared above the curtain effect so
   * `doneRef` is set before that effect can arm a timer for a curtain that is
   * not on screen.
   */
  useEffect(() => {
    if (!hidden || doneRef.current) return
    doneRef.current = true
    onDoneRef.current?.()
  }, [hidden])

  useEffect(() => {
    if (hidden) return
    registerGsap()
  }, [hidden])

  // Hairline fill — eased so a jumpy loader still reads as a smooth draw.
  useEffect(() => {
    const fill = fillRef.current
    if (!fill) return
    const tween = gsap.to(fill, {
      scaleX: Math.max(0.02, Math.min(1, progress / 100)),
      duration: 0.7,
      ease: 'power2.out',
      overwrite: true,
    })
    return () => {
      tween.kill()
    }
  }, [progress])

  // Curtain out, once, when the loaders are quiet.
  useEffect(() => {
    if (hidden || doneRef.current) return
    const settled = !active && (progress >= 100 || errors.length > 0)
    const idle = !active && progress === 0
    if (!settled && !idle) return

    const finish = (): void => {
      if (doneRef.current) return
      doneRef.current = true
      // Only a real settle proves the assets are in hand; the idle branch is
      // "nothing ever registered", which is not the same claim.
      if (settled && sceneId !== undefined) prepared.add(sceneId)

      const root = rootRef.current
      if (!root) {
        setHidden(true)
        onDoneRef.current?.()
        return
      }

      const { delay, duration } = exitSchedule(performance.now() - mountedAt)
      // The hairline is still mid-draw on its own 0.7s ease when a cached scene
      // settles; land it rather than fade it out at sixty per cent.
      const fill = fillRef.current
      if (fill) {
        gsap.to(fill, { scaleX: 1, duration: Math.min(0.24, duration), ease: 'power2.out', overwrite: true })
      }
      gsap.to(root, {
        autoAlpha: 0,
        duration,
        ease: 'power2.inOut',
        delay,
        onComplete: () => {
          setHidden(true)
          onDoneRef.current?.()
        },
      })
    }

    const timer = window.setTimeout(finish, settled ? SETTLE_MS : IDLE_GRACE_MS)
    return () => window.clearTimeout(timer)
  }, [hidden, active, progress, errors.length, sceneId, mountedAt])

  if (hidden) return null

  const src = image ? mediaUrl(image, 1200) : ''
  const shown = Math.round(Math.min(100, Math.max(0, progress)))

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 z-20 overflow-hidden bg-espresso', className)}
      data-three-loader=""
    >
      {src && (
        <div className="absolute inset-0 scale-110 opacity-45 blur-2xl">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            {...(image?.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL } : {})}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-espresso/55" />

      {/* Centred on the blurred room the visitor is about to walk into. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <BrandMark waiting onDark className="h-16 w-16 md:h-20 md:w-20" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-[var(--spacing-gutter)] pb-[calc(var(--spacing-gutter)*1.2)]">
        <div className="flex items-baseline justify-between gap-8">
          <span className="u-label text-canvas/80">{label}</span>
          <span className="u-label tabular-nums text-canvas/45">{String(shown).padStart(3, '0')}</span>
        </div>
        <div className="relative h-px w-full bg-canvas/15">
          <div
            ref={fillRef}
            className="absolute inset-y-0 left-0 w-full origin-left bg-accent-soft"
            style={{ transform: 'scaleX(0.02)' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ThreeLoader
