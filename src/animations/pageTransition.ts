'use client'

/**
 * Page-transition curtain.
 *
 * A single espresso panel wipes up over the outgoing page, the route is swapped
 * while the screen is covered, then the panel retracts upward off the new one.
 * Total runtime is clamped to the 0.8–1.2s brief by `curtainDuration()`.
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
  /** run while fully covered: swap the route content and reset scroll here */
  onCovered: () => void
  /** run after the panel has retracted */
  onDone?: () => void
}

/**
 * Builds the cover → swap → reveal timeline. Call inside a `gsap.context()` so
 * an interrupted navigation reverts cleanly.
 */
export function curtainTimeline(args: CurtainArgs): gsap.core.Timeline {
  const { panel, mark, onCovered, onDone } = args
  const { cover, reveal } = curtainDuration()

  // A beat of full black before the swap; taken out of the reveal half so the
  // clamped total still holds.
  const hold = Math.min(0.08, reveal * 0.15)
  const retract = reveal - hold

  const tl = gsap.timeline({
    defaults: { ease: EASE.inOut },
    onComplete: onDone,
  })

  tl.set(panel, {
    autoAlpha: 1,
    scaleY: 0,
    transformOrigin: '50% 100%',
    pointerEvents: 'auto',
    willChange: 'transform',
  })

  tl.to(panel, { scaleY: 1, duration: cover })

  if (mark) {
    tl.fromTo(
      mark,
      { autoAlpha: 0, scaleX: 0 },
      { autoAlpha: 1, scaleX: 1, duration: cover * 0.7, ease: EASE.expo },
      cover * 0.35,
    )
  }

  tl.addLabel('covered', cover)
  tl.call(onCovered, undefined, 'covered')

  const out = `covered+=${hold}`
  if (mark) {
    tl.to(mark, { autoAlpha: 0, duration: retract * 0.4, ease: EASE.out }, out)
  }
  tl.set(panel, { transformOrigin: '50% 0%' }, out)
  tl.to(panel, { scaleY: 0, duration: retract }, out)
  tl.set(panel, { autoAlpha: 0, pointerEvents: 'none', clearProps: 'willChange' })

  return tl
}

export { PageTransition } from '@/components/animation/PageTransition'
