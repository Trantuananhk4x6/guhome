'use client'

/**
 * Project-index motion: the pinned horizontal rail, and the card → fullscreen
 * expansion that carries you into a project page.
 */

import { useCallback, useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motionEnabled, motionFlag, useMotionStore } from '@/lib/motion'
import { DURATION, EASE, HORIZONTAL_QUERY, dur } from './config'
import { gsap, registerGsap } from './gsap'
import { suppressNextCurtain, useIsoLayoutEffect } from './internal'

/* --------------------------- horizontal project rail ----------------------- */

export interface HorizontalScrollOptions {
  /** seconds of scrub catch-up */
  scrub?: boolean | number
  /** extra scroll distance past the end of the track, in px */
  endPadding?: number
  /** pin the section while the rail moves (default true) */
  pin?: boolean
}

/**
 * Pins `sectionRef` and translates `trackRef` horizontally for exactly as much
 * scroll as the track overflows the viewport. Width is measured lazily through
 * function-based values with `invalidateOnRefresh`, so resizes and late-loading
 * images re-measure instead of drifting.
 *
 * Below 1024px — and whenever the OS asks for reduced motion — the rail is never
 * built, leaving the track as an ordinary horizontally scrollable strip.
 */
export function useHorizontalScroll(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  opts: HorizontalScrollOptions = {},
): void {
  const { scrub = 1, endPadding = 0, pin = true } = opts

  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)

  useIsoLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    registerGsap()

    if (!motionFlag(config, systemReduced, 'enabled')) return

    // matchMedia both gates the effect and rebuilds it when the viewport crosses
    // the breakpoint — no manual resize listener, no stale transforms.
    const mm = gsap.matchMedia()

    mm.add(HORIZONTAL_QUERY, () => {
      const travel = (): number => Math.max(0, track.scrollWidth - window.innerWidth + endPadding)

      const tween = gsap.to(track, {
        x: () => -travel(),
        ease: EASE.none,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${travel()}`,
          pin,
          anticipatePin: 1,
          scrub,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.kill()
        gsap.set(track, { clearProps: 'transform' })
      }
    })

    return () => {
      mm.revert()
    }
  }, [sectionRef, trackRef, scrub, endPadding, pin, config, systemReduced])
}

/* ------------------------- card → fullscreen transition -------------------- */

/** Put this on the element that should morph (usually the card's image). */
export const TRANSITION_MEDIA_ATTR = 'data-transition-media'
/** `view-transition-name` shared by the card media and the destination hero. */
export const PROJECT_VIEW_TRANSITION_NAME = 'an-project-media'

interface ViewTransitionLike {
  finished: Promise<void>
  ready: Promise<void>
}

interface DocumentWithViewTransition {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransitionLike
}

function espresso(): string {
  if (typeof window === 'undefined') return '#131210'
  const value = getComputedStyle(document.documentElement).getPropertyValue('--c-espresso').trim()
  return value.length > 0 ? value : '#131210'
}

/**
 * Returns `openProject(el, href)` — expands the card to fill the viewport and
 * then navigates. Uses the View Transition API where the browser has it (the
 * destination hero can carry the same `view-transition-name` for a true morph)
 * and falls back to a FLIP-style GSAP clone everywhere else.
 */
export function useProjectTransition(): { openProject(el: HTMLElement, href: string): void } {
  const router = useRouter()
  const pathname = usePathname()

  const nodesRef = useRef<HTMLElement[]>([])
  const namedRef = useRef<HTMLElement | null>(null)
  const resolveRef = useRef<(() => void) | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const runningRef = useRef(false)

  const cleanup = useCallback((animate: boolean) => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    resolveRef.current?.()
    resolveRef.current = null

    const named = namedRef.current
    if (named) {
      named.style.removeProperty('view-transition-name')
      namedRef.current = null
    }

    const nodes = nodesRef.current
    nodesRef.current = []
    if (nodes.length === 0) {
      runningRef.current = false
      return
    }

    const remove = (): void => {
      for (const node of nodes) node.remove()
      runningRef.current = false
    }

    if (!animate) {
      remove()
      return
    }
    gsap.to(nodes, { opacity: 0, duration: dur(DURATION.fast), ease: EASE.out, onComplete: remove })
  }, [])

  // The route committed: release the View Transition and dissolve the clone
  // over the freshly painted page.
  useEffect(() => {
    if (!runningRef.current) return
    cleanup(true)
  }, [pathname, cleanup])

  useEffect(() => () => cleanup(false), [cleanup])

  const openProject = useCallback(
    (el: HTMLElement, href: string): void => {
      if (runningRef.current) return

      if (!motionEnabled('pageTransition')) {
        router.push(href)
        return
      }

      registerGsap()
      runningRef.current = true
      // This expansion *is* the transition — the curtain must not double up.
      suppressNextCurtain()

      const media = el.querySelector<HTMLElement>(`[${TRANSITION_MEDIA_ATTR}], img, video`) ?? el
      const doc = document as unknown as DocumentWithViewTransition

      if (typeof doc.startViewTransition === 'function') {
        media.style.setProperty('view-transition-name', PROJECT_VIEW_TRANSITION_NAME)
        namedRef.current = media

        const transition = doc.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              resolveRef.current = resolve
              // Safety valve: never leave the document frozen if navigation stalls.
              timeoutRef.current = window.setTimeout(resolve, 1200)
              router.push(href)
            }),
        )

        void transition.finished
          .catch(() => undefined)
          .then(() => {
            runningRef.current = false
          })
        return
      }

      /* ------------------------- GSAP FLIP fallback ------------------------ */

      const rect = media.getBoundingClientRect()

      const backdrop = document.createElement('div')
      backdrop.setAttribute('aria-hidden', 'true')
      Object.assign(backdrop.style, {
        position: 'fixed',
        inset: '0',
        background: espresso(),
        opacity: '0',
        zIndex: '80',
        pointerEvents: 'none',
      })

      const clone = media.cloneNode(true) as HTMLElement
      clone.setAttribute('aria-hidden', 'true')
      clone.removeAttribute('id')
      Object.assign(clone.style, {
        position: 'fixed',
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        margin: '0',
        maxWidth: 'none',
        objectFit: 'cover',
        zIndex: '81',
        pointerEvents: 'none',
        willChange: 'top, left, width, height',
      })

      document.body.append(backdrop, clone)
      nodesRef.current = [backdrop, clone]

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href)
          // If the route never commits (same href, blocked navigation), take the
          // overlay down anyway rather than stranding the viewer behind it.
          timeoutRef.current = window.setTimeout(() => cleanup(true), 1500)
        },
      })

      tl.to(backdrop, { opacity: 1, duration: dur(DURATION.fast), ease: EASE.out }, 0).to(
        clone,
        {
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          duration: dur(DURATION.expand),
          ease: EASE.inOut,
        },
        0,
      )
    },
    [router, cleanup],
  )

  return { openProject }
}
