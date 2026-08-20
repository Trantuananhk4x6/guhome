'use client'

/**
 * Convenience barrel. Deep imports (`@/animations/reveal`) are equally valid and
 * keep client bundles tighter — prefer them in leaf components.
 */

export { gsap, ScrollTrigger, SplitText, registerGsap, isGsapRegistered } from './gsap'

export {
  BREAKPOINTS,
  DESKTOP_QUERY,
  DISTANCE,
  DURATION,
  EASE,
  HORIZONTAL_QUERY,
  SCROLL,
  STAGGER,
  curtainDuration,
  delayOf,
  dist,
  dur,
  isAtLeast,
  isBelow,
  mediaQueryAtLeast,
  mediaQueryBelow,
  scrollDefaults,
  viewportWidth,
} from './config'
export type { Breakpoint, DistanceToken, DurationToken, EaseToken, StaggerToken } from './config'

export { ScrollProvider, getLenis, scrollToTop, useLenis, useScrollProgress } from './scroll'
export { useReveal, useRevealGroup, killAllScrollTriggers } from './reveal'
export type { RevealOptions } from './reveal'
export { useTextReveal } from './text'
export type { TextRevealOptions } from './text'
export { useImageReveal, useParallax } from './image'
export type { ImageRevealOptions, ParallaxOptions } from './image'
export { useCameraScroll } from './camera'
export type { CameraScrollArgs } from './camera'
export {
  PROJECT_VIEW_TRANSITION_NAME,
  TRANSITION_MEDIA_ATTR,
  useHorizontalScroll,
  useProjectTransition,
} from './projects'
export type { HorizontalScrollOptions } from './projects'
export {
  CURTAIN_ATTR,
  CURTAIN_HIDDEN,
  CURTAIN_NAV_TIMEOUT_MS,
  CURTAIN_OPT_OUT_ATTR,
  CURTAIN_Z_INDEX,
  PageTransition,
  coverNow,
  coverTimeline,
  curtainArrivalWait,
  curtainNavTarget,
  curtainTimeline,
  destinationPending,
  hideCurtain,
  markWaiting,
  suppressNextCurtain,
  whenDestinationReady,
} from './pageTransition'
export type { CoverArgs, CurtainArgs } from './pageTransition'
