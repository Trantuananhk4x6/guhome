/**
 * Motion vocabulary. Every duration, ease, stagger and distance in the site comes
 * from here so the whole page reads as one hand.
 *
 * Two global dials, both admin-editable via `MotionConfig`:
 *   - `dist()`  scales every travel distance by `intensity` (0 = fades only, no travel)
 *   - `dur()`   scales every duration by `transitionSpeed`
 */

import { motionIntensity, motionSpeed } from '@/lib/motion'

/* -------------------------------- durations -------------------------------- */

export const DURATION = {
  /** hover marks, cursor, small state flips */
  micro: 0.24,
  /** buttons, labels, short fades */
  fast: 0.45,
  /** the default: most reveals */
  base: 0.75,
  /** hero copy, large images */
  slow: 1.05,
  /** full-bleed cinematic moves */
  epic: 1.4,
  /** page-transition curtain, covering half */
  curtainIn: 0.5,
  /** page-transition curtain, uncovering half */
  curtainOut: 0.6,
  /** card → fullscreen project expansion */
  expand: 0.78,
} as const

export type DurationToken = keyof typeof DURATION

/* ---------------------------------- eases ---------------------------------- */

export const EASE = {
  /** power2.out — the workhorse: short travel, quick settle */
  out: 'power2.out',
  /** power3.out — longer travel, editorial deceleration */
  strong: 'power3.out',
  /** power4.inOut — symmetric, for curtains and pinned moves */
  inOut: 'power4.inOut',
  /** expo.out — arrivals that must feel weightless (text lines, image clips) */
  expo: 'expo.out',
  /** linear — anything scrubbed by scroll */
  none: 'none',
} as const

export type EaseToken = keyof typeof EASE

/* --------------------------------- stagger --------------------------------- */

export const STAGGER = {
  tight: 0.035,
  base: 0.07,
  loose: 0.12,
  /** between split text lines */
  lines: 0.085,
  /** between split text words */
  words: 0.022,
  /** grid / gallery items */
  grid: 0.055,
} as const

export type StaggerToken = keyof typeof STAGGER

/* -------------------------------- distances -------------------------------- */

/** Unscaled pixel travel. Always pass through `dist()` before handing to GSAP. */
export const DISTANCE = {
  xs: 12,
  sm: 24,
  md: 48,
  lg: 72,
  xl: 110,
  /** full travel of a parallax layer across the viewport */
  parallax: 140,
} as const

export type DistanceToken = keyof typeof DISTANCE

/* --------------------------------- scroll ---------------------------------- */

export const SCROLL = {
  /** an element starts revealing when its top passes this line */
  start: 'top 82%',
  end: 'bottom 15%',
  toggleActions: 'play none none none',
  /** scrub smoothing (seconds of catch-up) for continuous effects */
  scrub: 1,
  once: true,
  /** debounce before a manual ScrollTrigger.refresh() after resize */
  refreshDebounce: 180,
} as const

/**
 * Master kill-switch for the scroll-driven entrance effects — `useReveal` (both
 * its entrance and `revealParallax` flavours), `useTextReveal`, `useImageReveal`
 * and `useParallax`.
 *
 * On at the project owner's request: every one of those hooks builds a
 * ScrollTrigger per element, and on content-heavy pages the accumulated
 * scrub/refresh work is what makes the scroll stutter. Flip this back to `false`
 * and the whole vocabulary returns — the hooks still run, still mark their
 * elements ready, and still carry their markup attributes, so nothing else has
 * to change.
 *
 * Deliberately NOT covering Lenis smooth scroll, hover motion, page transitions
 * or the scroll-driven 3D camera — those stay live.
 */
export const SCROLL_REVEAL_DISABLED = true

export interface ScrollTriggerish {
  trigger: Element
  start?: string
  end?: string
  once?: boolean
  toggleActions?: string
  scrub?: boolean | number
  invalidateOnRefresh?: boolean
}

/** Reveal-flavoured ScrollTrigger vars with the studio defaults pre-filled. */
export function scrollDefaults(
  trigger: Element,
  overrides: Partial<Omit<ScrollTriggerish, 'trigger'>> = {},
): ScrollTriggerish {
  return {
    trigger,
    start: SCROLL.start,
    once: SCROLL.once,
    toggleActions: SCROLL.toggleActions,
    ...overrides,
  }
}

/* ------------------------------- breakpoints ------------------------------- */

export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1760,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

/** 0 during SSR — callers must treat 0 as "unknown, assume mobile". */
export function viewportWidth(): number {
  if (typeof window === 'undefined') return 0
  return window.innerWidth
}

export function isAtLeast(bp: Breakpoint): boolean {
  const w = viewportWidth()
  return w > 0 && w >= BREAKPOINTS[bp]
}

export function isBelow(bp: Breakpoint): boolean {
  const w = viewportWidth()
  return w > 0 && w < BREAKPOINTS[bp]
}

export function mediaQueryAtLeast(bp: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[bp]}px)`
}

export function mediaQueryBelow(bp: Breakpoint): string {
  return `(max-width: ${BREAKPOINTS[bp] - 0.02}px)`
}

/** Desktop-only effects (pinning, horizontal scroll) live behind this. */
export const DESKTOP_QUERY = mediaQueryAtLeast('lg')
export const NO_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: no-preference)'
/** Horizontal project rail: desktop, and only when the OS allows motion. */
export const HORIZONTAL_QUERY = `${DESKTOP_QUERY} and ${NO_REDUCED_MOTION_QUERY}`

/* ------------------------------- global dials ------------------------------ */

/**
 * Scales a travel distance by the admin intensity dial.
 * At `intensity: 0` this returns 0 — animations become pure opacity/clip fades
 * rather than disappearing, which keeps timing and staggers intact.
 */
export function dist(px: number): number {
  return px * motionIntensity()
}

/** Scales a duration (seconds) by the admin transition-speed dial. */
export function dur(seconds: number): number {
  return seconds * motionSpeed()
}

/** Same scaling as `dur`, named for readability at call sites. */
export function delayOf(seconds: number): number {
  return seconds * motionSpeed()
}

/** Total budget for the page-transition curtain, clamped to the 0.8–1.2s brief. */
export function curtainDuration(): { cover: number; reveal: number; total: number } {
  const raw = (DURATION.curtainIn + DURATION.curtainOut) * motionSpeed()
  const total = Math.min(1.2, Math.max(0.8, raw))
  const ratio = DURATION.curtainIn / (DURATION.curtainIn + DURATION.curtainOut)
  const cover = total * ratio
  return { cover, reveal: total - cover, total }
}
