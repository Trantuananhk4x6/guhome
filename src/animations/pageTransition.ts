'use client'

/**
 * Page-transition curtain.
 *
 * A single espresso panel that is drawn **before** the router is asked to
 * navigate, holds while the destination assembles behind it, and then lifts off
 * — uncovering from the top down so the reader meets the new heading first.
 *
 * Cover-before-navigate is the only sequence the App Router allows. A layout's
 * `children` is a stable element whose contents the router swaps internally, so
 * a layout component cannot hold the outgoing page on screen: by the time
 * `usePathname()` reports the new route React has already committed it — and
 * what it committed is usually the segment's `loading.tsx`, not the page. A
 * curtain raised at *that* moment covers the loading state and then lifts off
 * it, so the reader is shown the one thing the curtain exists to hide and the
 * real arrival happens in the open. `PageTransition` therefore intercepts the
 * click, plays `coverTimeline()` and calls `router.push` from its `onComplete`,
 * exactly the order `useProjectTransition` uses for the card morph.
 *
 * The two animated halves together stay inside the 0.8–1.2s brief via
 * `curtainDuration()`. Between them sits however long the route takes to
 * arrive, which is the network's business and not the curtain's — but the panel
 * will not sit on a `loading.tsx` for longer than `curtainArrivalWait()` before
 * lifting anyway, because an opaque screen is a worse loading state than the one
 * the route wrote for itself.
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

/**
 * Must outrank everything the curtain is supposed to wipe over: header z-50,
 * scroll progress z-60, mobile menu z-95. It stays *below* Dialog (z-100) and
 * Toast (z-120), which are modal surfaces a navigation should not paint over.
 */
export const CURTAIN_Z_INDEX = 96
export const CURTAIN_ATTR = 'data-page-curtain'

/**
 * Opt-out marker. A left-click on any link inside `[data-no-curtain]` navigates
 * without the curtain — for surfaces that stage their own transition, or that
 * must not be covered at all.
 */
export const CURTAIN_OPT_OUT_ATTR = 'data-no-curtain'

/**
 * The card link `useProjectTransition` takes over (`ProjectCard` stamps it for
 * `CustomCursor`). Its click already expands the frame to fullscreen and pushes
 * itself, so the curtain must not intercept it — and the title link beside it in
 * the same `<article>` runs the very same handler, hence the href match rather
 * than a plain `matches()`.
 */
const PROJECT_MORPH_SELECTOR = 'a[data-cursor="project"]'

/**
 * How long a covered panel will wait for a route's own loading state to give way
 * to the real page before lifting anyway: the length of the transition itself.
 * That is enough to absorb a destination which is a beat behind its shell, and
 * short enough that the curtain never becomes a stall of its own — past it, the
 * route's `loading.tsx` is the better thing to be looking at, and it scales with
 * the admin speed dial like every other duration here.
 */
export function curtainArrivalWait(): number {
  return curtainDuration().total * 1000
}

/**
 * How long after `router.push` the panel waits for the route to commit at all.
 * A push that is dropped — a transition React abandons, a route that redirects
 * to itself — must never leave the reader behind an opaque screen.
 *
 * Deliberately far outside any real navigation: this is the "that push is never
 * landing" bound, not a patience bound. Lifting the panel early would put the
 * reader back on the page they just left and let the destination arrive in the
 * open afterwards, which is the exact failure this component was rewritten to
 * end. A route that takes seconds is better spent behind a covered screen with
 * the mark breathing on it.
 */
export const CURTAIN_NAV_TIMEOUT_MS = 8000

/** The panel's resting state — the same values the component renders inline. */
export const CURTAIN_HIDDEN: gsap.TweenVars = {
  autoAlpha: 0,
  scaleY: 0,
  transformOrigin: '50% 100%',
  pointerEvents: 'none',
  clearProps: 'willChange',
}

/** Puts the panel back to its resting state now, killing nothing. */
export function hideCurtain(panel: HTMLElement): void {
  gsap.set(panel, CURTAIN_HIDDEN)
}

/**
 * Covers the screen this instant, for a navigation that arrived without a cover
 * of its own — back/forward, or a programmatic `router.push`.
 *
 * Synchronous on purpose: called from the layout effect that runs between the
 * route commit and the paint, it is the only thing standing between the reader
 * and a bare destination, so it must not wait for anything — not a ticker tick,
 * and not the arrival gate below.
 */
export function coverNow(panel: HTMLElement, mark?: HTMLElement | null): void {
  gsap.set(panel, {
    autoAlpha: 1,
    scaleY: 1,
    transformOrigin: '50% 100%',
    pointerEvents: 'auto',
    willChange: 'transform',
  })
  if (mark) gsap.set(mark, { autoAlpha: 0, scaleX: 0 })
}

export interface CoverArgs {
  /** the full-screen espresso panel */
  panel: HTMLElement
  /** optional hairline / mark that breathes while the screen is covered */
  mark?: HTMLElement | null
  /** run once the panel has fully covered the screen — push the route here */
  onDone?: () => void
}

export interface CurtainArgs extends CoverArgs {
  /**
   * `true` when `coverTimeline()` has already drawn the panel for this
   * navigation, so the reveal skips the hold beat instead of spending it twice.
   */
  covered?: boolean
}

/**
 * Draws the panel across the screen, top edge first, and calls `onDone` on the
 * frame it is fully opaque.
 *
 * Call it from the click handler, **before** `router.push` — that is the whole
 * point. `onDone` is where the navigation belongs.
 */
export function coverTimeline(args: CoverArgs): gsap.core.Timeline {
  const { panel, mark, onDone } = args
  const { cover } = curtainDuration()

  gsap.set(panel, {
    autoAlpha: 1,
    scaleY: 0,
    // Top-anchored on the way in, bottom-anchored on the way out (below), so
    // the two halves read as one continuous downward wipe rather than a panel
    // that bounces back the way it came.
    transformOrigin: '50% 0%',
    // Opaque from the first frame: a second click during the cover would start
    // a navigation the curtain is no longer staging.
    pointerEvents: 'auto',
    willChange: 'transform',
  })

  const tl = gsap.timeline({ defaults: { ease: EASE.inOut }, onComplete: onDone })
  tl.to(panel, { scaleY: 1, duration: cover }, 0)

  if (mark) {
    tl.fromTo(
      mark,
      { autoAlpha: 0, scaleX: 0 },
      { autoAlpha: 1, scaleX: 1, duration: cover * 0.7, ease: EASE.expo },
      cover * 0.3,
    )
  }

  return tl
}

/**
 * Retracts the panel off the arrived page.
 *
 * Call it inside a `gsap.context()` **from a layout effect** — when nothing has
 * covered the screen yet (a back/forward navigation, say) the cover is a
 * synchronous `gsap.set` that only does its job if it lands before the browser
 * paints.
 */
export function curtainTimeline(args: CurtainArgs): gsap.core.Timeline {
  const { panel, mark, onDone, covered = false } = args
  const { cover, reveal } = curtainDuration()

  // A beat of full black before the panel lifts, so the cut reads as deliberate
  // rather than as a dropped frame. `coverTimeline` has already spent that beat
  // drawing itself, and spending it twice would push the pair past the brief.
  const hold = covered ? 0 : cover * 0.5

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
    if (!covered) {
      tl.fromTo(mark, { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: hold, ease: EASE.expo }, 0)
    }
    tl.to(mark, { autoAlpha: 0, duration: reveal * 0.35, ease: EASE.out }, hold)
  }

  tl.to(panel, { scaleY: 0, duration: reveal }, hold)
  tl.set(panel, { autoAlpha: 0, pointerEvents: 'none', clearProps: 'willChange' })

  return tl
}

/**
 * Keeps the mark breathing while the panel holds on a route that has not
 * finished arriving. Returns the tween so the caller can kill it the moment the
 * reveal takes the mark back.
 */
export function markWaiting(mark: HTMLElement | null | undefined): gsap.core.Tween | null {
  if (!mark) return null
  return gsap.fromTo(
    mark,
    { autoAlpha: 1, scaleX: 1 },
    { autoAlpha: 0.28, duration: 0.7, ease: EASE.inOut, repeat: -1, yoyo: true },
  )
}

/* ------------------------------ arrival gate ------------------------------- */

/**
 * `true` while the committed route is still showing its `loading.tsx` rather
 * than the page itself.
 *
 * A segment's loading file renders a polite status region inside the `<main>`
 * landmark (§9), and a page that has already rendered its heading has arrived
 * even if it carries a status region of its own — so the heading wins the test.
 */
export function destinationPending(): boolean {
  if (typeof document === 'undefined') return false
  const main = document.querySelector('main')
  if (!main) return false
  if (main.querySelector('h1')) return false
  return main.querySelector('[role="status"][aria-live="polite"]') !== null
}

/**
 * Runs `cb` once the committed route has replaced its loading state with the
 * real page — immediately, and synchronously, when it already has.
 *
 * `waited` tells the caller whether it had to hold, so it can re-measure against
 * the DOM that actually mounted. Returns a canceller; after `waitMs` the panel
 * lifts regardless, because a curtain that outstays the brief has stopped being
 * a transition and become a stall.
 */
export function whenDestinationReady(
  cb: (waited: boolean) => void,
  waitMs = curtainArrivalWait(),
): () => void {
  if (!destinationPending()) {
    cb(false)
    return () => undefined
  }

  let done = false
  let timer = 0

  const settle = (run: boolean): void => {
    if (done) return
    done = true
    observer.disconnect()
    window.clearTimeout(timer)
    if (run) cb(true)
  }

  const observer = new MutationObserver(() => {
    if (!destinationPending()) settle(true)
  })

  timer = window.setTimeout(() => settle(true), waitMs)
  observer.observe(document.body, { childList: true, subtree: true })

  return () => settle(false)
}

/* ---------------------------- click interception --------------------------- */

function claimedByProjectMorph(anchor: HTMLAnchorElement): boolean {
  const own = anchor.matches(PROJECT_MORPH_SELECTOR) ? anchor : null
  const card = anchor.closest('article')
  const morph = own ?? card?.querySelector<HTMLAnchorElement>(PROJECT_MORPH_SELECTOR) ?? null
  return morph !== null && morph.href === anchor.href
}

/**
 * The in-app destination a plain left-click would take, or `null` when this
 * click is not the curtain's to stage: a modified or non-primary click, a
 * download, a new tab, another origin, a hash on the page we are already on, a
 * project card the morph owns, or anything under `[data-no-curtain]`.
 *
 * Same-pathname navigations are excluded deliberately — the reveal is driven by
 * `usePathname()`, so a curtain drawn for one could never be lifted.
 */
export function curtainNavTarget(event: MouseEvent): string | null {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  if (typeof window === 'undefined') return null

  const target = event.target
  if (!(target instanceof Element)) return null

  const anchor = target.closest('a[href]')
  if (!(anchor instanceof HTMLAnchorElement)) return null
  if (anchor.hasAttribute('download')) return null
  if (anchor.target !== '' && anchor.target !== '_self') return null
  if (/\bexternal\b/i.test(anchor.rel)) return null
  if (anchor.closest(`[${CURTAIN_OPT_OUT_ATTR}]`) !== null) return null
  if (claimedByProjectMorph(anchor)) return null

  let url: URL
  try {
    url = new URL(anchor.href, window.location.href)
  } catch {
    return null
  }

  if (url.origin !== window.location.origin) return null
  if (url.pathname === window.location.pathname) return null

  return `${url.pathname}${url.search}${url.hash}`
}

export { PageTransition } from '@/components/animation/PageTransition'
