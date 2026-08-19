'use client'

/**
 * Entrance reveals for any element. Give the element `data-reveal` in markup and
 * the CSS anti-flash rule keeps it hidden until this hook takes over; mark
 * children `data-reveal-item` to stagger them instead of the container.
 */

import { useRef } from 'react'
import type { RefObject } from 'react'
import type { RevealVariant } from '@/types/content'
import { motionFlag, useMotionStore } from '@/lib/motion'
import { DISTANCE, DURATION, EASE, SCROLL, STAGGER, delayOf, dist, dur } from './config'
import { gsap, ScrollTrigger, registerGsap } from './gsap'
import { markReady, revealFromVars, revealTargets, revealToVars, useIsoLayoutEffect } from './internal'

export interface RevealOptions {
  variant?: RevealVariant
  /** seconds, before the tween starts */
  delay?: number
  /** seconds between `[data-reveal-item]` children */
  stagger?: number
  /** ScrollTrigger start, defaults to `top 82%` */
  start?: string
  /** replay every time it re-enters (default: reveal once) */
  once?: boolean
  /** raw px travel before the intensity dial is applied */
  distance?: number
  /** seconds */
  duration?: number
}

export function useReveal(ref: RefObject<HTMLElement | null>, opts: RevealOptions = {}): void {
  const {
    variant = 'revealUp',
    delay = 0,
    stagger,
    start = SCROLL.start,
    once = SCROLL.once,
    distance,
    duration,
  } = opts

  // Re-arm when the admin changes motion settings or the OS preference flips.
  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    registerGsap()

    const targets = revealTargets(el)

    if (!motionFlag(config, systemReduced, 'enabled')) {
      markReady(el, ...targets)
      return
    }

    const ctx = gsap.context(() => {
      if (variant === 'revealParallax') {
        const travel = dist(distance ?? DISTANCE.parallax)
        markReady(el, ...targets)
        if (travel === 0) return
        gsap.fromTo(
          targets,
          { y: travel / 2 },
          {
            y: -travel / 2,
            ease: EASE.none,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
        return
      }

      gsap.set(targets, revealFromVars(variant, distance))
      // Only now is it safe for CSS to stop hiding the element.
      markReady(el, ...targets)

      gsap.to(targets, {
        ...revealToVars(variant),
        duration: dur(duration ?? DURATION.slow),
        delay: delayOf(delay),
        ease: variant === 'revealClip' ? EASE.expo : EASE.strong,
        stagger: targets.length > 1 ? delayOf(stagger ?? STAGGER.base) : 0,
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: SCROLL.toggleActions,
        },
      })
    }, el)

    return () => {
      ctx.revert()
      // revert() restores the pre-animation inline styles; keep the element
      // visible so an unmount/remount never flashes blank.
      markReady(el, ...targets)
    }
  }, [ref, variant, delay, stagger, start, once, distance, duration, config, systemReduced])
}

/**
 * Reveals a list of sibling nodes registered imperatively — useful for grids whose
 * children mount over time. Returns the collector to hand to each child's `ref`.
 */
export function useRevealGroup(opts: RevealOptions = {}): {
  containerRef: RefObject<HTMLDivElement | null>
} {
  const containerRef = useRef<HTMLDivElement>(null)
  useReveal(containerRef, { stagger: STAGGER.grid, ...opts })
  return { containerRef }
}

/** Kills every ScrollTrigger on the page. Escape hatch for hard route resets. */
export function killAllScrollTriggers(): void {
  if (typeof window === 'undefined') return
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
