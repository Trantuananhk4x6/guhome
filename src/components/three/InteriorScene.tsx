'use client'

import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type JSX,
  type MutableRefObject,
  type RefObject,
} from 'react'
import type { MediaRef, SceneConfig } from '@/types/content'
import { motionFlag, useMotionStore, useReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import {
  prefersLightweight,
  recommendedQuality,
  supportsWebGL,
  type QualityProfile,
} from '@/lib/three/capability'
import { resolveKind } from '@/lib/three/scene-kind'
import { resolveSceneSettings } from '@/lib/three/scene-settings'
import { SceneBoundary } from '@/components/three/SceneBoundary'
import { SceneFallback } from '@/components/three/SceneFallback'

/**
 * The renderer, and everything that needs it.
 *
 * `lazy()` rather than a static import is the whole point of this file: three,
 * R3F, drei and postprocessing come to ~1.2 MB, and this component's job is to
 * decide — from the device, the connection, the a11y settings and where the
 * section sits relative to the viewport — whether that download is warranted at
 * all, and if so, when. Until it resolves, and forever when it does not, the
 * visitor is looking at the photograph.
 */
const SceneCanvas = lazy(() => import('@/components/three/SceneCanvas'))

/**
 * How far outside the viewport a scene starts fetching, in viewport heights.
 *
 * Generous on purpose. Waiting for the section to *be* visible means the
 * visitor watches a still for as long as 1.2 MB takes, which on a phone is the
 * pop-in this whole mechanism exists to avoid. One and a half screens of
 * warning is roughly a second of unhurried scrolling — long enough to have the
 * canvas standing by the time the section arrives, short enough that the
 * EXPLORE SPACE block at the foot of a project page is never fetched by someone
 * who reads two paragraphs and leaves.
 */
const NEAR_MARGIN = '150% 0px'

/**
 * Ceiling on the wait for an idle moment once a section is near. `rIC` fires as
 * soon as the main thread is free, so this only ever binds while something else
 * is busy — a long GSAP setup, a decode — and then it is a promise that the
 * scene is not held hostage to a thread that never quiets down.
 */
const IDLE_TIMEOUT_MS = 1200

/** Safari has no `requestIdleCallback`; one frame past paint is close enough. */
const IDLE_FALLBACK_MS = 200

/**
 * How long a visitor has to sit perfectly still before we fetch the renderer
 * for them anyway.
 *
 * The hero's camera is driven by scroll. At progress zero it is parked on
 * waypoint one, looking at the same photograph `SceneFallback` is already
 * showing — the relief and the bloom are the whole difference, and they are a
 * difference you notice when the frame starts to move. Until the visitor
 * scrolls, or moves a pointer, or touches the glass, the 1.2 MB buys them a
 * subtler version of a picture they can already see.
 *
 * So the first sign of life wins, and this is only the backstop for the visitor
 * who genuinely does nothing: three seconds of complete stillness on a page
 * they are still looking at, and the scene comes anyway. It is a backstop, not
 * the normal path — anyone who reaches for the mouse beats it by seconds.
 */
const QUIET_DWELL_MS = 3000

/**
 * What counts as a sign of life. `scroll` is listed for completeness — Lenis
 * drives the page from `wheel` and `touchstart`, both of which are here — and
 * `pointermove` catches the visitor who has only reached for the mouse.
 */
const INTENT_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'pointermove', 'keydown', 'scroll'] as const

/**
 * How soon after mount a scene has to arm for the curtain to still be the right
 * answer.
 *
 * `ThreeLoader` exists to cover an *empty* frame: espresso, a blurred still and
 * a progress hairline, drawn over the top of everything. That was right when
 * the canvas began downloading on mount, because there was nothing else to look
 * at. It is wrong now on a cold arrival — the photograph is up, sharp,
 * full-bleed, and dropping a dimmed blurred copy of it over the top for half a
 * second in the name of "loading" is a worse frame than the one it covers.
 *
 * It is still right on a client-side navigation into a project page: the
 * document is already `complete`, so the idle callback fires within a few
 * milliseconds of mount, the module is very likely already in memory, and the
 * fallback photograph has not had time to decode. That is a genuinely empty
 * frame, and it is the case this window catches.
 */
const CURTAIN_WINDOW_MS = 300

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

/* ------------------------- client capability probe ------------------------- */

/**
 * WebGL support, device tier and connection, read once on the client.
 *
 * The server cannot know any of them, so the server render always emits the
 * photograph — which is the right thing for LCP anyway, and means nothing shifts
 * when the canvas takes over. `useSyncExternalStore` is the primitive React
 * ships for exactly this shape of value: it lets the server snapshot differ from
 * the client one without a hydration mismatch, and without the extra paint an
 * effect-then-setState would cost.
 *
 * The probe is memoised at module scope because `getSnapshot` must return a
 * referentially stable value — returning a fresh object each call re-renders
 * forever.
 */
type Capability = { webgl: boolean; quality: QualityProfile; lightweight: boolean }

let probed: Capability | null = null

function clientCapability(): Capability {
  probed ??= { webgl: supportsWebGL(), quality: recommendedQuality(), lightweight: prefersLightweight() }
  return probed
}

/** No subscription: capability does not change for the life of the document. */
function subscribeToNothing(): () => void {
  return () => {}
}

function useClientCapability(): Capability | null {
  return useSyncExternalStore(subscribeToNothing, clientCapability, () => null)
}

/* ------------------------------ the deferral ------------------------------ */

/**
 * `requestIdleCallback` is in lib.dom as a required member of `Window`, but
 * Safari only shipped it in 16.4 — so it is read through a structural type that
 * admits its absence rather than trusted and called.
 */
interface IdleScheduler {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

/**
 * When the renderer may start downloading.
 *
 * Two gates in series, and the order matters.
 *
 * **Proximity** first: an `IntersectionObserver` with {@link NEAR_MARGIN}, so a
 * section the visitor never reaches never costs them anything. This is what
 * makes the EXPLORE SPACE block at the foot of a project page free for the
 * majority who do not scroll that far, and it is why the observer is armed once
 * and disconnected on the first hit — intent, once shown, is not withdrawn.
 *
 * **Then the page has to be worth it**: the document's `load` event first, so
 * the scene is strictly behind every byte the visible page needs — the hero is
 * inside the viewport at mount, so proximity alone would fire on the first frame
 * and put 1.2 MB of renderer in a bandwidth race with the LCP photograph, which
 * is the cost we are here to remove. Then the first of a sign of life or
 * {@link QUIET_DWELL_MS}. For anything below the fold that second gate is free:
 * the observer only fired *because* the visitor scrolled, so `scrollY` is
 * already past zero and the wait is skipped.
 *
 * **Then quiet**: `requestIdleCallback`, so the fetch starts on a free main
 * thread rather than in the middle of hydration, a GSAP setup or the visitor's
 * own scroll.
 *
 * Returns the timestamp of the decision, or `null` while it is still pending.
 */
function useSceneIntent(rootRef: RefObject<HTMLElement | null>, enabled: boolean): number | null {
  const [armedAt, setArmedAt] = useState<number | null>(null)

  useEffect(() => {
    if (!enabled || armedAt !== null) return
    const root = rootRef.current
    if (!root) return

    const win: IdleScheduler = window
    let idleHandle: number | null = null
    let timer: number | null = null
    let cancelled = false

    const arm = (): void => {
      if (cancelled) return
      setArmedAt(performance.now())
    }

    const whenQuiet = (): void => {
      if (cancelled) return
      if (typeof win.requestIdleCallback === 'function') {
        idleHandle = win.requestIdleCallback(arm, { timeout: IDLE_TIMEOUT_MS })
      } else {
        timer = window.setTimeout(arm, IDLE_FALLBACK_MS)
      }
    }

    let dwell: number | null = null
    const releaseIntent = (): void => {
      if (dwell !== null) {
        window.clearTimeout(dwell)
        dwell = null
      }
      for (const type of INTENT_EVENTS) window.removeEventListener(type, onIntent)
    }

    function onIntent(): void {
      releaseIntent()
      whenQuiet()
    }

    const whenIntended = (): void => {
      if (cancelled) return
      // Below the fold the visitor has already scrolled to get here; the
      // observer firing at all is the sign of life.
      if (window.scrollY > 0) {
        whenQuiet()
        return
      }
      for (const type of INTENT_EVENTS) {
        window.addEventListener(type, onIntent, { passive: true, once: true })
      }
      dwell = window.setTimeout(onIntent, QUIET_DWELL_MS)
    }

    const whenLoaded = (): void => {
      if (cancelled) return
      if (document.readyState === 'complete') {
        whenIntended()
        return
      }
      window.addEventListener('load', whenIntended, { once: true })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        whenLoaded()
      },
      { rootMargin: NEAR_MARGIN, threshold: 0 },
    )
    observer.observe(root)

    return () => {
      cancelled = true
      observer.disconnect()
      window.removeEventListener('load', whenIntended)
      releaseIntent()
      if (idleHandle !== null) win.cancelIdleCallback?.(idleHandle)
      if (timer !== null) window.clearTimeout(timer)
    }
  }, [enabled, armedAt, rootRef])

  return armedAt
}

/**
 * The single entry point for every 3D moment on the site.
 *
 * Consumers still import it through `next/dynamic({ ssr: false })`, which keeps
 * it off the server — but what that import now pulls is only this shell: the
 * capability probe, the photograph, and the rules for when a renderer is worth
 * fetching. The renderer itself is behind {@link useSceneIntent}. Until it is
 * ready — and forever, on weak devices, on a data-saver connection, without
 * WebGL, or under reduced motion — the visitor sees a full-bleed photograph
 * instead, and the handover from one to the other is a crossfade the scene
 * cannot start until it has a frame to show.
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
  const caps = useClientCapability()
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [curtainDone, setCurtainDone] = useState(false)
  const [inView, setInView] = useState(false)
  const [mountedAt] = useState(() => (typeof performance === 'undefined' ? 0 : performance.now()))

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
  const kind = useMemo(() => resolveKind(config), [config])

  const fallback = fallbackImage ?? config.sourceImage ?? null
  const quality = caps?.quality ?? null
  const drawable = kind.kind === 'none' ? null : kind

  /**
   * Whether a canvas is warranted at all. Every clause here is also a decision
   * *not to download* — a device that answers no to any of them never fetches
   * the renderer, where before it fetched 1.2 MB and then rendered the
   * photograph anyway.
   */
  const canRender =
    caps !== null &&
    caps.webgl &&
    !caps.lightweight &&
    caps.quality.perf !== 'low' &&
    drawable !== null &&
    motionAllows3d &&
    !reduced &&
    !failed

  const armedAt = useSceneIntent(rootRef, canRender)
  const armed = armedAt !== null

  const explore = autoExplore ?? config.autoExplore

  // The visitor grabbing the canvas mid-walk ends the walk. One state change per
  // handover — not per frame — so the camera stays outside React's hands.
  const [handedOff, setHandedOff] = useState(false)
  // Resetting on a prop change belongs in render, not in an effect: an effect
  // paints one frame of the stale value first, which here means a re-entered
  // scene shows a handed-off camera for a frame before the walk resumes. This is
  // React's documented adjust-state-during-render form — the extra render is
  // discarded before the browser sees it.
  const walkKey = `${mode}:${String(explore)}:${config.id}`
  const [lastWalkKey, setLastWalkKey] = useState(walkKey)
  if (walkKey !== lastWalkKey) {
    setLastWalkKey(walkKey)
    setHandedOff(false)
  }
  const handleHandoff = useCallback(() => {
    setHandedOff(true)
  }, [])

  // Waypoints own the camera in scroll mode always, and in orbit mode for as
  // long as AUTO EXPLORE is on and the visitor has not taken over. Folding
  // `motionAllowsCamera` in here means that under reduced motion the path simply
  // never mounts and the orbit controls stay live — the correct a11y outcome.
  const pathDriven = motionAllowsCamera && (mode === 'scroll' || explore) && !handedOff
  /*
   * Only orbit gets a live loop, and this is the single biggest running cost on
   * the site.
   *
   * A scroll-driven hero used to render at 60fps for as long as it was on
   * screen, whether or not anything moved — which is most of the time a visitor
   * spends looking at it. On a laptop that is a continuous GPU load, with bloom
   * and a vignette on top, for a frame identical to the last one.
   *
   * It does not need to be. Every moving part of this scene already re-arms
   * `invalidate()` while it is animating and stops when it converges: the dolly
   * in CameraPath, the pointer parallax in DepthScene, the pan in SceneCamera.
   * The one gap was that scrolling changed the camera's progress silently —
   * closed by the scroll listener in CameraPath. So a still hero now costs
   * nothing and a moving one is indistinguishable from before.
   *
   * Orbit is the exception on purpose: its tour driver advances on elapsed time
   * and the controls' damping wants frames it never asks for.
   */
  const dynamicLoop = mode === 'orbit'
  const frameloop = !inView ? 'never' : dynamicLoop ? 'always' : 'demand'

  const handleError = useCallback(() => {
    setFailed(true)
    setReady(false)
    setCurtainDone(true)
  }, [])

  const handleMounted = useCallback(() => {
    setReady(true)
    onReadyRef.current?.()
  }, [])

  const handleCurtainDone = useCallback(() => {
    setCurtainDone(true)
  }, [])

  const description = config.sourceImage?.alt ?? fallback?.alt ?? null
  const showPhoto = !canRender || !ready
  // See CURTAIN_WINDOW_MS: the curtain covers an empty frame, never a photograph
  // the visitor has already been given time to look at.
  const showCurtain = armedAt !== null && armedAt - mountedAt < CURTAIN_WINDOW_MS && !curtainDone

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

      {canRender && armed && quality && drawable && (
        <SceneBoundary fallback={null} onError={handleError} resetKey={config.id}>
          {/* `fallback={null}` on both: while the renderer is in flight the
              photograph above is the fallback, and it is already on screen. */}
          <Suspense fallback={null}>
            <SceneCanvas
              config={config}
              kind={drawable}
              quality={quality}
              progressRef={progressRef}
              mode={mode}
              pathDriven={pathDriven}
              frameloop={frameloop}
              ready={ready}
              onHandoff={handleHandoff}
              onMounted={handleMounted}
              onLost={handleError}
              curtain={showCurtain}
              curtainImage={fallback}
              onCurtainDone={handleCurtainDone}
            />
          </Suspense>
        </SceneBoundary>
      )}

      {description && <p className="sr-only">{description}</p>}
    </div>
  )
}

export default InteriorScene
