'use client'

/**
 * The one place GSAP is configured. Import `gsap` / `ScrollTrigger` / `SplitText`
 * from here — never from the package directly — so plugins are guaranteed to be
 * registered exactly once and never during SSR.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DURATION, EASE, SCROLL } from './config'

let registered = false

/** Idempotent, client-only. Safe to call at the top of every effect. */
export function registerGsap(): void {
  if (registered) return
  if (typeof window === 'undefined') return
  registered = true

  gsap.registerPlugin(ScrollTrigger, SplitText)

  gsap.defaults({ ease: EASE.out, duration: DURATION.base })
  gsap.config({ nullTargetWarn: false, autoSleep: 60 })

  // Mobile browsers fire resize when the URL bar collapses; refreshing there
  // makes pinned sections jump.
  ScrollTrigger.config({ ignoreMobileResize: true })
  ScrollTrigger.defaults({ start: SCROLL.start, toggleActions: SCROLL.toggleActions })
}

export function isGsapRegistered(): boolean {
  return registered
}

export { gsap, ScrollTrigger, SplitText }
