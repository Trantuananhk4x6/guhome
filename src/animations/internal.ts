'use client'

/**
 * Shared internals for the animation hooks. Not part of the public contract —
 * consumers should import the hooks, not these.
 */

import { useEffect, useLayoutEffect } from 'react'
import type { RevealVariant } from '@/types/content'
import { DISTANCE, dist } from './config'

/** `useLayoutEffect` in the browser, `useEffect` on the server (no hydration warning). */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** Set by every hook once it has taken control, releasing the CSS anti-flash rule. */
export const READY_ATTR = 'data-reveal-ready'
/** Opt-in marker for children that should stagger inside a `useReveal` container. */
export const ITEM_SELECTOR = '[data-reveal-item]'
/** Media element inside a wrapper that should be scaled / parallaxed. */
export const MEDIA_SELECTOR = 'img, video, [data-reveal-media]'

/**
 * Releases `[data-reveal]:not([data-reveal-ready]) { opacity: 0 }` from globals.css.
 * Must be called on *every* path — including the disabled and error paths — or
 * content stays invisible.
 */
export function markReady(...elements: (Element | null | undefined)[]): void {
  for (const el of elements) {
    if (el) el.setAttribute(READY_ATTR, '')
  }
}

/* ---------------------------- curtain arbitration -------------------------- */

let curtainSuppressed = false

/**
 * Tells `PageTransition` to sit out the *next* route change — the project card
 * expansion (or a View Transition) is already covering the screen, and running
 * both reads as a stutter. Lives here rather than in `pageTransition.ts` so
 * `projects.ts` does not have to pull the curtain component into its bundle.
 */
export function suppressNextCurtain(): void {
  curtainSuppressed = true
}

/** Reads and clears the flag. */
export function consumeCurtainSuppression(): boolean {
  const value = curtainSuppressed
  curtainSuppressed = false
  return value
}

/** Children marked `data-reveal-item`, else the element itself. */
export function revealTargets(el: HTMLElement): HTMLElement[] {
  const items = el.querySelectorAll<HTMLElement>(ITEM_SELECTOR)
  return items.length > 0 ? Array.from(items) : [el]
}

/** The image/video inside a wrapper, or the wrapper itself when there is none. */
export function mediaTarget(el: HTMLElement): HTMLElement {
  return el.querySelector<HTMLElement>(MEDIA_SELECTOR) ?? el
}

/**
 * Runs `cb` once web fonts have settled — line splitting before that produces
 * the wrong line breaks. Falls back to a timeout so a failed font never blocks
 * content. Returns a canceller.
 */
export function whenFontsReady(cb: () => void, timeoutMs = 500): () => void {
  let done = false
  const run = (): void => {
    if (done) return
    done = true
    cb()
  }

  if (typeof document === 'undefined') return () => undefined

  const fonts: FontFaceSet | undefined = 'fonts' in document ? document.fonts : undefined
  if (!fonts || fonts.status === 'loaded') {
    run()
    return () => {
      done = true
    }
  }

  const timer = window.setTimeout(run, timeoutMs)
  void fonts.ready.then(run).catch(run)

  return () => {
    done = true
    window.clearTimeout(timer)
  }
}

/* ------------------------------ reveal variants ---------------------------- */

const HIDDEN_CLIP = 'inset(0% 0% 100% 0%)'
const SHOWN_CLIP = 'inset(0% 0% 0% 0%)'

/** Starting state for a variant. `distance` overrides the token in raw (unscaled) px. */
export function revealFromVars(variant: RevealVariant, distance?: number): gsap.TweenVars {
  const base = distance ?? DISTANCE.md
  const travel = dist(base)
  // How much of the nominal travel survived the intensity dial (1 = full, 0 = off).
  const ratio = base === 0 ? 0 : travel / base
  switch (variant) {
    case 'revealLeft':
      return { autoAlpha: 0, x: -travel, y: 0 }
    case 'revealRight':
      return { autoAlpha: 0, x: travel, y: 0 }
    case 'revealScale':
      return { autoAlpha: 0, scale: 1 - 0.05 * ratio, transformOrigin: '50% 50%' }
    case 'revealClip':
      return { autoAlpha: 1, clipPath: HIDDEN_CLIP, willChange: 'clip-path' }
    case 'revealParallax':
      return { autoAlpha: 1, y: 0 }
    case 'revealUp':
    default:
      return { autoAlpha: 0, y: travel }
  }
}

/** Resting state for a variant. */
export function revealToVars(variant: RevealVariant): gsap.TweenVars {
  switch (variant) {
    case 'revealLeft':
    case 'revealRight':
      return { autoAlpha: 1, x: 0 }
    case 'revealScale':
      return { autoAlpha: 1, scale: 1 }
    case 'revealClip':
      return { autoAlpha: 1, clipPath: SHOWN_CLIP, clearProps: 'willChange' }
    case 'revealParallax':
      return { autoAlpha: 1, y: 0 }
    case 'revealUp':
    default:
      return { autoAlpha: 1, y: 0 }
  }
}
