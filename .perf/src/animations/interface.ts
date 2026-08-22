'use client'

/**
 * Interface micro-motion — the small moves, as opposed to the entrance reveals
 * in `reveal.ts` and the scroll cinema in `camera.ts`.
 *
 * The house rule for everything here: a micro-interaction earns its place by
 * telling the reader something they did not already know — that a control is
 * live, that a figure is a quantity, that a rule is a boundary being drawn. A
 * move that only decorates is noise, and on a site whose subject is calm
 * architecture, noise is expensive. So each hook below is small, fast, and
 * silent when nothing is happening.
 *
 * Every one of them:
 *   - no-ops when motion is off or the OS asks for reduced motion,
 *   - scopes its tweens to a `gsap.context()` and reverts on unmount,
 *   - writes to the DOM directly and never sets React state per frame,
 *   - reads its durations, eases and distances from `config.ts`, so the whole
 *     site still moves as one hand.
 */

import { useRef } from 'react'
import type { RefObject } from 'react'

import { motionFlag, useMotionStore } from '@/lib/motion'

import { DISTANCE, DURATION, EASE, SCROLL, STAGGER, dist, dur } from './config'
import { gsap, registerGsap } from './gsap'
import { useIsoLayoutEffect } from './internal'

/** Pointer devices only. A magnetic control is meaningless without a cursor. */
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/* ------------------------------- magnetic pull ----------------------------- */

export interface MagneticOptions {
  /** Fraction of the pointer's offset the element follows. Keep it small. */
  strength?: number
  /** Pointer distance, in px beyond the element's box, that still attracts. */
  radius?: number
}

/**
 * The element leans a few pixels toward the cursor while the cursor is near it.
 *
 * This is the one effect on the site that exists purely to make a control feel
 * alive, so it is held to the tightest budget: 0.18 of the offset, capped, and
 * only on the primary call to action. Applied to every button it becomes a tic;
 * applied to one, it reads as that button being the important one.
 *
 * `quickTo` keeps this to two interpolated setters rather than a tween per
 * pointermove, which matters because pointermove fires at the display's refresh
 * rate.
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>, opts: MagneticOptions = {}): void {
  const { strength = 0.18, radius = 90 } = opts
  const reduced = useMotionStore((state) => state.reduced)
  const config = useMotionStore((state) => state.config)
  const allowed = motionFlag(config, reduced, 'enabled')

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || !allowed) return
    if (!window.matchMedia(FINE_POINTER).matches) return

    registerGsap()
    const ctx = gsap.context(() => {
      const settle = { duration: dur(DURATION.fast), ease: EASE.strong }
      const moveX = gsap.quickTo(el, 'x', settle)
      const moveY = gsap.quickTo(el, 'y', settle)

      const onMove = (event: PointerEvent): void => {
        const box = el.getBoundingClientRect()
        const cx = box.left + box.width / 2
        const cy = box.top + box.height / 2
        const dx = event.clientX - cx
        const dy = event.clientY - cy
        // Outside the halo the element sits still rather than easing back from
        // some fraction of the way — a control that drifts is worse than one
        // that does nothing.
        const near =
          Math.abs(dx) < box.width / 2 + radius && Math.abs(dy) < box.height / 2 + radius
        moveX(near ? dx * strength : 0)
        moveY(near ? dy * strength : 0)
      }

      const onLeave = (): void => {
        moveX(0)
        moveY(0)
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      el.addEventListener('pointerleave', onLeave)
      // A keyboard user never fires pointermove; make sure focus never inherits
      // a stale offset from a mouse that passed by earlier.
      el.addEventListener('focus', onLeave)

      return () => {
        window.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
        el.removeEventListener('focus', onLeave)
      }
    }, el)

    return () => ctx.revert()
  }, [ref, allowed, strength, radius])
}

/* --------------------------------- rule draw ------------------------------- */

/**
 * A hairline draws itself from one end as it enters view.
 *
 * This is the most architectural move available to a website: a rule is a
 * boundary, and a boundary that arrives by being drawn reads as something being
 * measured out rather than something appearing. The site is full of hairlines
 * already — section heads, table rows, the footer — so this costs no new markup.
 *
 * `scaleX` on a 1px element is free: it never touches layout and never repaints
 * anything but the line itself.
 */
export function useRuleDraw(
  ref: RefObject<HTMLElement | null>,
  opts: {
    /** `false` leaves the element untouched — the hook must be callable
     *  unconditionally from a component that only sometimes wants the draw. */
    enabled?: boolean
    origin?: 'left' | 'right' | 'center'
    delay?: number
    start?: string
  } = {},
): void {
  const { enabled = true, origin = 'left', delay = 0, start = SCROLL.start } = opts
  const reduced = useMotionStore((state) => state.reduced)
  const config = useMotionStore((state) => state.config)
  const allowed = motionFlag(config, reduced, 'imageReveal')

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    if (!allowed) {
      // Motion off: the rule is simply there. Never leave it at scaleX(0).
      gsap.set(el, { clearProps: 'transform' })
      return
    }

    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: origin === 'center' ? '50% 50%' : `${origin} 50%` },
        {
          scaleX: 1,
          duration: dur(DURATION.slow),
          ease: EASE.expo,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [ref, enabled, allowed, origin, delay, start])
}

/* --------------------------------- count up -------------------------------- */

export interface CountUpOptions {
  /** Digits after the decimal separator. */
  decimals?: number
  /** Rendered before the number, e.g. `'+'`. */
  prefix?: string
  /** Rendered after it, e.g. `' m²'`. */
  suffix?: string
  duration?: number
  start?: string
}

/**
 * A figure counts from zero to its value as it enters view.
 *
 * Worth doing only where the number is genuinely a QUANTITY — an area, a count
 * of projects, a span of years. Counting up a year ("2021") is a category error
 * that most sites make: a year is a name, not an amount, and watching it tick
 * through 1300 is nonsense. So this hook takes the value as a number and the
 * caller decides; it will not guess.
 *
 * Formatted with `vi-VN` grouping so 48000 reads as 48.000, and written straight
 * to `textContent` — no React state, one paint per frame of the tween.
 */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  value: number,
  opts: CountUpOptions = {},
): void {
  const { decimals = 0, prefix = '', suffix = '', duration, start = SCROLL.start } = opts
  const reduced = useMotionStore((state) => state.reduced)
  const config = useMotionStore((state) => state.config)
  const allowed = motionFlag(config, reduced, 'textReveal')

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || !Number.isFinite(value)) return

    const format = (n: number): string =>
      `${prefix}${n.toLocaleString('vi-VN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`

    if (!allowed) {
      el.textContent = format(value)
      return
    }

    registerGsap()
    const ctx = gsap.context(() => {
      const counter = { n: 0 }
      gsap.to(counter, {
        n: value,
        duration: duration ?? dur(DURATION.slow),
        ease: EASE.strong,
        // Snapping to the rendered precision stops the tween emitting values the
        // formatter would round to the same string — a third of the paints do
        // nothing visible otherwise.
        snap: { n: decimals > 0 ? 1 / 10 ** decimals : 1 },
        onUpdate: () => {
          el.textContent = format(counter.n)
        },
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [ref, value, decimals, prefix, suffix, duration, start, allowed])
}

/* ------------------------------- letter lift ------------------------------- */

/**
 * Each letter of a label lifts in turn on hover, then settles.
 *
 * Reserved for the wordmark. Split text is a real cost — one span per glyph, and
 * the split has to be undone on unmount or the DOM is left rewritten — so it is
 * worth paying once, on the one piece of type that is a logo rather than a
 * sentence. Anywhere else, `translate` the whole word.
 *
 * The original text is restored on cleanup, and the spans are marked
 * `aria-hidden` under a preserved label so a screen reader still hears one word
 * rather than eight letters.
 */
export function useLetterLift(
  ref: RefObject<HTMLElement | null>,
  opts: { rise?: number } = {},
): void {
  const { rise = DISTANCE.xs } = opts
  const reduced = useMotionStore((state) => state.reduced)
  const config = useMotionStore((state) => state.config)
  const allowed = motionFlag(config, reduced, 'textReveal')

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || !allowed) return
    if (!window.matchMedia(FINE_POINTER).matches) return

    const original = el.textContent ?? ''
    if (original.trim().length === 0) return

    registerGsap()

    // One word for assistive technology, glyphs for the eye.
    el.setAttribute('aria-label', original)
    el.textContent = ''
    const glyphs: HTMLSpanElement[] = []
    for (const char of original) {
      const span = document.createElement('span')
      span.textContent = char
      span.setAttribute('aria-hidden', 'true')
      // Inline-block so transform applies; a space still needs to occupy width.
      span.style.display = 'inline-block'
      if (char === ' ') span.style.width = '0.32em'
      el.appendChild(span)
      glyphs.push(span)
    }

    const ctx = gsap.context(() => {
      const play = (): void => {
        gsap.to(glyphs, {
          y: -dist(rise),
          duration: dur(DURATION.micro),
          ease: EASE.out,
          stagger: STAGGER.tight,
          overwrite: true,
          yoyo: true,
          repeat: 1,
        })
      }
      el.addEventListener('pointerenter', play)
      return () => el.removeEventListener('pointerenter', play)
    }, el)

    return () => {
      ctx.revert()
      // Put the DOM back exactly as it was found.
      el.textContent = original
      el.removeAttribute('aria-label')
    }
  }, [ref, allowed, rise])
}

/* ------------------------------ scroll velocity ---------------------------- */

/**
 * Publishes scroll speed as a CSS custom property on `<html>`: `--scroll-skew`,
 * in degrees, clamped and signed by direction.
 *
 * Nothing here animates anything — it hands a value to CSS, so a component opts
 * in with one declaration (`transform: skewY(var(--scroll-skew))`) and opts out
 * by not reading it. That keeps a whole-page effect out of every component's
 * JavaScript, and means the effect costs one writer no matter how many elements
 * respond to it.
 *
 * Used sparingly: a slight skew on large imagery while the reader is moving fast
 * reads as momentum. On text it reads as a broken screen.
 */
export function useScrollVelocity(opts: { max?: number } = {}): void {
  const { max = 2.4 } = opts
  const reduced = useMotionStore((state) => state.reduced)
  const config = useMotionStore((state) => state.config)
  const allowed = motionFlag(config, reduced, 'parallax')
  const raf = useRef<number | null>(null)

  useIsoLayoutEffect(() => {
    const root = document.documentElement
    if (!allowed) {
      root.style.setProperty('--scroll-skew', '0deg')
      return
    }

    registerGsap()
    let last = window.scrollY
    let current = 0

    const tick = (): void => {
      const now = window.scrollY
      // Velocity in px/frame, mapped into degrees and eased toward zero so the
      // value returns to rest rather than snapping when scrolling stops.
      const target = gsap.utils.clamp(-max, max, (now - last) * 0.06)
      current += (target - current) * 0.12
      root.style.setProperty('--scroll-skew', `${current.toFixed(3)}deg`)
      last = now
      raf.current = window.requestAnimationFrame(tick)
    }
    raf.current = window.requestAnimationFrame(tick)

    return () => {
      if (raf.current !== null) window.cancelAnimationFrame(raf.current)
      root.style.setProperty('--scroll-skew', '0deg')
    }
  }, [allowed, max])
}

