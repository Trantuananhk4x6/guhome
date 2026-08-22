'use client'

/**
 * Wraps the routed content, covers the screen *before* the router leaves the
 * page the reader is looking at, and lifts the cover off the page that arrives.
 *
 * The order is the whole point. In the App Router a layout's `children` is a
 * stable element whose contents the router swaps internally, so this component
 * cannot hold the outgoing page on screen: by the time `usePathname()` reports
 * the new route React has already committed it — and on anything but a cached
 * navigation what it committed is the segment's `loading.tsx`. A curtain raised
 * there covers the loading state and lifts off it: the reader is shown the one
 * thing the curtain exists to hide, and the arrival it exists to stage happens
 * in the open. So the click is intercepted in the capture phase, the cover plays
 * first, and `router.push` runs from its `onComplete` — the same order
 * `useProjectTransition` uses one file over.
 *
 * The reveal still belongs to the arrival: it is armed in the layout effect that
 * runs between the route commit and the paint, and it waits — briefly, see
 * `curtainArrivalWait()` — for a `loading.tsx` to give way to the real page, so
 * that what it uncovers is the destination.
 *
 * Navigations that do not come through a link — back/forward, a programmatic
 * `router.push` — keep the old behaviour: cover synchronously on commit, then
 * reveal. Wrap `{children}` of the root layout with this. Disabled — and
 * completely inert — when `MotionConfig.pageTransition` is false or motion is
 * reduced.
 */

import { useCallback, useEffect, useRef } from 'react'
import type { JSX, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useMotionFlag } from '@/lib/motion'
import { gsap, ScrollTrigger, registerGsap } from '@/animations/gsap'
import { consumeCurtainSuppression, useIsoLayoutEffect } from '@/animations/internal'
import {
  CURTAIN_NAV_TIMEOUT_MS,
  CURTAIN_Z_INDEX,
  coverNow,
  coverTimeline,
  curtainNavTarget,
  curtainTimeline,
  destinationPending,
  hideCurtain,
  markWaiting,
  whenDestinationReady,
} from '@/animations/pageTransition'
import { scrollToTop } from '@/animations/scroll'

export function PageTransition(props: { children: ReactNode }): JSX.Element {
  const { children } = props
  const pathname = usePathname()
  const router = useRouter()
  /**
   * The curtain is a public-site gesture. It sits in the root layout, which wraps
   * the (admin) route group too, so without this every CMS navigation — and an
   * editor makes dozens in a session — paid 1.1s of animation to cross from a
   * list to a form. An editing tool should feel instant; the cinema belongs on
   * the side of the site a visitor sees once.
   */
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const enabled = useMotionFlag('pageTransition') && !isAdmin

  const panelRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)

  /**
   * The route this component has already reacted to. Seeded with the mount
   * pathname so a first load is never curtained, and touched only from inside
   * the effect below — never during render.
   */
  const handledPathRef = useRef(pathname)

  /** The cover played for a click, still owning the panel until the route lands. */
  const coverCtxRef = useRef<gsap.Context | null>(null)
  /** The reveal playing on the arrived page. */
  const revealCtxRef = useRef<gsap.Context | null>(null)
  /** True from "cover started" until the pushed route commits (or times out). */
  const coveringRef = useRef(false)
  /** Where that cover is going, so a cancelled cover can still get there. */
  const pendingHrefRef = useRef<string | null>(null)
  /** Safety valve for a push that never commits. */
  const navTimerRef = useRef<number | null>(null)
  /** The mark's breathing loop while a covered screen waits for a route. */
  const waitTweenRef = useRef<gsap.core.Tween | null>(null)

  /**
   * A covered screen with nothing moving on it reads as a hung page, and a
   * navigation can sit here for as long as the route takes. One loop spans both
   * halves of that wait — the push, and the arrival's own hold — so handing over
   * between them never restarts it.
   */
  const startWaiting = useCallback((): void => {
    if (waitTweenRef.current) return
    waitTweenRef.current = markWaiting(markRef.current)
  }, [])

  const stopWaiting = useCallback((): void => {
    waitTweenRef.current?.kill()
    waitTweenRef.current = null
  }, [])

  /**
   * Hands the panel back from the cover.
   *
   * `revert: false` is the handover to the reveal — killing the context without
   * reverting leaves the panel where the cover parked it, opaque, so the reveal
   * inherits a covered screen instead of a snap to hidden.
   */
  const releaseCover = useCallback((revert: boolean): void => {
    if (navTimerRef.current !== null) {
      window.clearTimeout(navTimerRef.current)
      navTimerRef.current = null
    }
    coveringRef.current = false
    pendingHrefRef.current = null

    const ctx = coverCtxRef.current
    coverCtxRef.current = null
    if (!ctx) return
    if (revert) ctx.revert()
    else ctx.kill()
  }, [])

  /* ------------------------- cover, then navigate ------------------------- */

  useEffect(() => {
    if (!enabled) return

    const onClick = (event: MouseEvent): void => {
      const panel = panelRef.current
      if (!panel) return

      const href = curtainNavTarget(event)
      if (href === null) return

      // `Link` navigates from its own `onClick`, which React dispatches when the
      // event bubbles back to the document — after this capture-phase listener.
      // Preventing the default is what makes it stand down (next/link returns
      // early on `defaultPrevented`), and stopping propagation is what keeps the
      // rest of the click chain on the far side of the cover: the mobile menu's
      // row handler would otherwise start sliding the sheet away while the
      // panel is still half drawn, which is the tear this exists to hide. The
      // sheet closes anyway when the route commits — `Header` derives that from
      // `usePathname()` — by which time it is behind an opaque screen.
      event.preventDefault()
      event.stopPropagation()

      // Already covering: swallow the click rather than stack a second cover on
      // top of the first (the panel is opaque over the whole page by now).
      if (coveringRef.current) return

      registerGsap()

      // A click during a reveal — or while one is still holding for a route that
      // has not finished arriving. Reverting rather than killing is what runs
      // that hold's canceller, so it cannot fire its own reveal onto the cover
      // about to be drawn. The styles it restores are overwritten by
      // `coverTimeline` in this same tick, before a frame is painted.
      revealCtxRef.current?.revert()
      revealCtxRef.current = null
      // The mark is about to be drawn in by the cover; a leftover breathing loop
      // from the navigation before it would fight that tween for the same
      // property.
      stopWaiting()

      coveringRef.current = true
      pendingHrefRef.current = href

      coverCtxRef.current = gsap.context(() => {
        coverTimeline({
          panel,
          mark: markRef.current,
          onDone: () => {
            router.push(href)
            startWaiting()
            navTimerRef.current = window.setTimeout(() => {
              // The push never committed. Lift the panel rather than strand the
              // reader behind it; the arrival, if it ever comes, is uncovered.
              if (!coveringRef.current) return
              const ctx = coverCtxRef.current
              coveringRef.current = false
              pendingHrefRef.current = null
              navTimerRef.current = null
              stopWaiting()
              if (ctx) ctx.add(() => curtainTimeline({ panel, mark: markRef.current, covered: true }))
              else hideCurtain(panel)
            }, CURTAIN_NAV_TIMEOUT_MS)
          },
        })
      }, panel)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [enabled, router, startWaiting, stopWaiting])

  /**
   * Motion switched off while a cover was in flight. Take the panel down, and
   * still go where the reader asked to go — the click was swallowed on the
   * promise that this component would deliver it.
   */
  useEffect(() => {
    if (enabled || !coveringRef.current) return
    const href = pendingHrefRef.current
    const panel = panelRef.current
    stopWaiting()
    releaseCover(true)
    if (panel) hideCurtain(panel)
    if (href !== null) router.push(href)
  }, [enabled, router, releaseCover, stopWaiting])

  /* ------------------------------ the arrival ----------------------------- */

  useIsoLayoutEffect(() => {
    // `enabled` is in the dependency list because the curtain must not outlive
    // a motion setting being switched off mid-flight, but a change to it is not
    // a navigation — only a new pathname is.
    if (handledPathRef.current === pathname) return
    handledPathRef.current = pathname

    // Always consume, even on the paths that skip the curtain: a flag left
    // standing would swallow the *next* navigation's curtain instead of this
    // one's. (A project card expansion or a View Transition sets it, because it
    // is already covering the screen for this navigation itself.)
    const suppressed = consumeCurtainSuppression()

    registerGsap()

    // Both of these have to happen before the paint, in this order: reset the
    // scroll so the incoming page is measured at the top, then re-measure. The
    // new page's own hooks have already created their ScrollTriggers by now —
    // React runs children's layout effects before the parent's.
    scrollToTop()
    ScrollTrigger.refresh()

    const panel = panelRef.current
    // Did this navigation start under our own cover? Read it before releasing.
    const covered = coveringRef.current
    releaseCover(false)

    if (!panel) return

    if (!enabled) {
      stopWaiting()
      if (covered) hideCurtain(panel)
      return
    }

    // Something else is already covering the screen for this navigation — unless
    // *we* are, in which case sitting out would strand the reader behind our own
    // panel.
    if (suppressed && !covered) {
      stopWaiting()
      return
    }

    const ctx = gsap.context(() => {
      // Nothing covered the screen for this navigation, so cover it now, in this
      // synchronous pass before the paint. It has to happen ahead of the wait
      // below: waiting with the destination on show is the very thing this
      // component exists to prevent.
      if (!covered) coverNow(panel, markRef.current)

      if (destinationPending()) startWaiting()

      return whenDestinationReady((waited) => {
        stopWaiting()
        if (waited) {
          // The page mounted after the commit this effect ran on: measure the
          // DOM that actually arrived, not the loading state it replaced.
          scrollToTop()
          ScrollTrigger.refresh()
        }
        // The hold beat is for a curtain that appeared out of nowhere. A cover
        // that was drawn, or a wait that was served, has already spent it.
        curtainTimeline({ panel, mark: markRef.current, covered: covered || waited })
      })
    }, panel)

    revealCtxRef.current = ctx

    return () => {
      // Reverting an interrupted curtain unwinds its tweens and cancels the
      // arrival wait; the explicit hide after it is what guarantees a navigation
      // that lands mid-transition can never strand the reader behind the panel,
      // whatever state the cover left the inline styles in.
      ctx.revert()
      if (revealCtxRef.current === ctx) revealCtxRef.current = null
      if (!coveringRef.current) {
        // Not mid-cover, so nothing is waiting on this panel any more.
        stopWaiting()
        hideCurtain(panel)
      }
    }
  }, [pathname, enabled, releaseCover, startWaiting, stopWaiting])

  useEffect(() => {
    return () => {
      stopWaiting()
      releaseCover(true)
    }
  }, [releaseCover, stopWaiting])

  return (
    <>
      <div
        ref={panelRef}
        data-page-curtain=""
        aria-hidden="true"
        className="fixed inset-0 flex items-center justify-center bg-espresso"
        style={{
          zIndex: CURTAIN_Z_INDEX,
          opacity: 0,
          transform: 'scaleY(0)',
          transformOrigin: '50% 100%',
          pointerEvents: 'none',
        }}
      >
        <span ref={markRef} className="block h-px w-24 bg-accent-soft" style={{ opacity: 0 }} />
      </div>
      {children}
    </>
  )
}
