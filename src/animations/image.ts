'use client'

/**
 * Image behaviour: the clip-and-settle reveal, and scroll parallax.
 *
 * Both hooks take the *wrapper*, not the `<img>` — the wrapper is clipped while
 * the media inside it scales or drifts, which is what gives the photography its
 * sense of depth without ever showing an edge.
 */

import type { RefObject } from 'react'
import type { RevealVariant } from '@/types/content'
import { motionFlag, useMotionStore } from '@/lib/motion'
import { DISTANCE, DURATION, EASE, SCROLL, SCROLL_REVEAL_DISABLED, delayOf, dist, dur } from './config'
import { gsap, registerGsap } from './gsap'
import { markReady, mediaTarget, revealFromVars, revealToVars, useIsoLayoutEffect } from './internal'

export interface ImageRevealOptions {
  variant?: RevealVariant
  /** seconds */
  delay?: number
  start?: string
  once?: boolean
  /** seconds */
  duration?: number
  /** overscale of the inner media at the start of the reveal (1 = none) */
  scaleFrom?: number
}

export function useImageReveal(ref: RefObject<HTMLElement | null>, opts: ImageRevealOptions = {}): void {
  const {
    variant = 'revealClip',
    delay = 0,
    start = SCROLL.start,
    once = SCROLL.once,
    duration,
    scaleFrom = 1.12,
  } = opts

  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    registerGsap()

    const media = mediaTarget(el)

    // Must return ahead of the `gsap.set` overscale below — otherwise the media
    // stays parked at 1.12 with no timeline left to scale it back down.
    if (SCROLL_REVEAL_DISABLED || !motionFlag(config, systemReduced, 'imageReveal')) {
      markReady(el, media)
      return
    }

    const ctx = gsap.context(() => {
      // Intensity 0 keeps the fade but drops the movement, so `scaleFrom`
      // collapses to 1 alongside every distance.
      const overscale = 1 + (scaleFrom - 1) * (dist(100) / 100)

      gsap.set(el, revealFromVars(variant))
      if (media !== el) gsap.set(media, { scale: overscale, transformOrigin: '50% 50%' })
      markReady(el, media)

      const tl = gsap.timeline({
        defaults: { ease: variant === 'revealClip' ? EASE.expo : EASE.strong },
        delay: delayOf(delay),
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: SCROLL.toggleActions,
        },
      })

      tl.to(el, {
        ...revealToVars(variant),
        duration: dur(duration ?? DURATION.slow),
      })

      if (media !== el) {
        tl.to(
          media,
          {
            scale: 1,
            duration: dur((duration ?? DURATION.slow) * 1.25),
            ease: EASE.strong,
            clearProps: 'transform',
          },
          0,
        )
      }
    }, el)

    return () => {
      ctx.revert()
      markReady(el, media)
    }
  }, [ref, variant, delay, start, once, duration, scaleFrom, config, systemReduced])
}

/**
 * Hard ceiling on the drift, as a fraction of the frame's own measured size.
 * The tween runs from `+travel/2` to `-travel/2`, so 0.2 is the ±10% the brief
 * asks for — the bound every `ProjectFigure` overscan is cut to match.
 */
const MAX_TRAVEL_RATIO = 0.2

export interface ParallaxOptions {
  /** multiplier on the 140px baseline travel; 0.5 is subtle, 2 is dramatic */
  strength?: number
  /** move horizontally instead of vertically */
  axis?: 'y' | 'x'
  /** scrub smoothing in seconds; `true` locks 1:1 to the scrollbar */
  scrub?: boolean | number
}

/**
 * Drifts the media inside `ref` against the scroll. The wrapper needs
 * `overflow: hidden` and the media should be overscaled (the `Parallax`
 * component does both) or the drift will expose an edge.
 *
 * Travel is the smaller of the pixel budget and ±10% of the frame — a fixed
 * pixel budget is a different effect at every size (140px is 13% of a 1080px
 * frame and 66% of a 211px one), and past the overscan a caller provides the
 * matte shows through inside the frame.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, opts: ParallaxOptions = {}): void {
  const { strength = 1, axis = 'y', scrub = true } = opts

  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    registerGsap()

    const media = mediaTarget(el)

    if (SCROLL_REVEAL_DISABLED || !motionFlag(config, systemReduced, 'parallax')) {
      markReady(el, media)
      return
    }

    const budget = dist(DISTANCE.parallax * strength)
    markReady(el, media)
    if (budget === 0) return

    /**
     * Function-based so `invalidateOnRefresh` re-measures on resize instead of
     * freezing the first layout's numbers — the same element is 534px tall on a
     * desktop and 211px on a phone, and only the measurement knows which.
     * A zero measurement means the frame has no layout box yet; fall back to the
     * budget and let the next refresh clamp it properly.
     */
    const travel = (): number => {
      const size = axis === 'y' ? el.offsetHeight : el.offsetWidth
      return size > 0 ? Math.min(budget, size * MAX_TRAVEL_RATIO) : budget
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { [axis]: () => travel() / 2 },
        {
          [axis]: () => -travel() / 2,
          ease: EASE.none,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
            invalidateOnRefresh: true,
          },
        },
      )
    }, el)

    return () => {
      ctx.revert()
      markReady(el, media)
    }
  }, [ref, strength, axis, scrub, config, systemReduced])
}
