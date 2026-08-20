'use client'

/**
 * Page-transition curtain.
 *
 * A single espresso panel that is **already covering the screen** when the
 * incoming route first paints, and then lifts off it, uncovering from the top
 * down so the reader meets the new heading first.
 *
 * Why there is no animated cover half: in the App Router a layout's `children`
 * is a stable element whose contents the router swaps internally, so a layout
 * component cannot hold the outgoing page on screen. By the time
 * `usePathname()` reports the new route, React is already committing that route.
 * A tweened cover would therefore wipe across a page the reader has just been
 * shown and then hand it back — the one thing a transition must never do. The
 * panel is instead set opaque synchronously, inside the layout effect that runs
 * between the commit and the paint, so the destination is never seen bare.
 *
 * Total runtime stays inside the 0.8–1.2s brief via `curtainDuration()`.
 *
 * The component itself lives in `@/components/animation/PageTransition` and is
 * re-exported here so consumers can follow the §6.3 contract
 * (`import { PageTransition } from '@/animations/pageTransition'`). The two
 * modules reference each other; ESM resolves this because both bindings are
 * hoisted function declarations.
 */

import { EASE, curtainDuration } from './config'
import { gsap } from './gsap'

/**
 * Skip the curtain for the next route change — for navigations that already
 * carry their own full-screen motion (see `useProjectTransition`).
 */
export { suppressNextCurtain } from './internal'

/** Sits above sticky UI, below nothing. */
export const CURTAIN_Z_INDEX = 90
export const CURTAIN_ATTR = 'data-page-curtain'

export interface CurtainArgs {
  /** the full-screen espresso panel */
  panel: HTMLElement
  /** optional hairline / mark that breathes while the screen is covered */
  mark?: HTMLElement | null
  /** run after the panel has retracted */
  onDone?: () => void
}

/**
 * Covers `panel` immediately, then builds the reveal timeline.
 *
 * Call it inside a `gsap.context()` **from a layout effect** — the cover is a
 * synchronous `gsap.set`, and it only does its job if it lands before the
 * browser paints. The context also makes an interrupted navigation revert the
 * panel to hidden instead of stranding the reader behind it.
 */
export function curtainTimeline(args: CurtainArgs): gsap.core.Timeline {
  const { panel, mark, onDone } = args
  const { cover, reveal } = curtainDuration()

  // A beat of full black before the panel lifts, so the cut reads as deliberate
  // rather than as a dropped frame.
  const hold = cover * 0.5

  // Synchronous, and deliberately not part of the timeline: a timeline renders
  // its first state on the next ticker tick, which is one frame too late.
  gsap.set(panel, {
    autoAlpha: 1,
    scaleY: 1,
    // Bottom-anchored: as scaleY falls to 0 the covered band shrinks downward,
    // so the top of the page — where the display heading sits — is uncovered
    // first, and the reader catches its own reveal in flight.
    transformOrigin: '50% 100%',
    pointerEvents: 'auto',
    willChange: 'transform',
  })

  const tl = gsap.timeline({
    defaults: { ease: EASE.inOut },
    onComplete: onDone,
  })

  if (mark) {
    tl.fromTo(mark, { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: hold, ease: EASE.expo }, 0)
    tl.to(mark, { autoAlpha: 0, duration: reveal * 0.35, ease: EASE.out }, hold)
  }

  tl.to(panel, { scaleY: 0, duration: reveal }, hold)
  tl.set(panel, { autoAlpha: 0, pointerEvents: 'none', clearProps: 'willChange' })

  return tl
}

export { PageTransition } from '@/components/animation/PageTransition'
