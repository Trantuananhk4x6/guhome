'use client'

/**
 * Scroll spine of the site.
 *
 * `ScrollProvider` owns the **one and only** Lenis instance and marries it to
 * GSAP's ticker, so smooth scroll and every ScrollTrigger share a single clock.
 * It also pushes the DB-backed `MotionConfig` into the motion store, which is
 * what makes every hook downstream obey the admin settings.
 */

import { createContext, createElement, useContext, useEffect, useRef, useState } from 'react'
import type { JSX, MutableRefObject, ReactNode, RefObject } from 'react'
import Lenis from 'lenis'
import type { MotionConfig } from '@/types/content'
import { resolveReduced, useMotionStore, useReducedMotion } from '@/lib/motion'
import { SCROLL } from './config'
import { gsap, ScrollTrigger, registerGsap } from './gsap'
import { useIsoLayoutEffect } from './internal'

const LenisContext = createContext<Lenis | null>(null)

/**
 * Module-level handle to the live instance, for code that cannot use a hook
 * (page-transition scroll reset, project card expansion).
 */
let activeLenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return activeLenis
}

/** Jump to the top of the document, instantly and without fighting Lenis. */
export function scrollToTop(immediate = true): void {
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate, force: true })
    return
  }
  if (typeof window !== 'undefined') window.scrollTo(0, 0)
}

const LENIS_EASING = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function ScrollProvider(props: { children: ReactNode; motion: MotionConfig }): JSX.Element {
  const { children, motion } = props
  const setConfig = useMotionStore((s) => s.setConfig)

  // Subscribes the OS media query and mirrors it into the store.
  useReducedMotion()
  const systemReduced = useMotionStore((s) => s.reduced)
  const reduced = resolveReduced(motion, systemReduced)

  const [lenis, setLenis] = useState<Lenis | null>(null)

  // Publish the server config before anything animates. Hooks read `config` from
  // the store as an effect dependency, so they re-arm themselves when this lands.
  useIsoLayoutEffect(() => {
    setConfig(motion)
  }, [motion, setConfig])

  const smooth = motion.enabled && motion.scrollSmoothing && !reduced

  useIsoLayoutEffect(() => {
    registerGsap()
    if (!smooth) return

    const instance = new Lenis({
      duration: 1.05,
      easing: LENIS_EASING,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
      autoRaf: false,
      anchors: true,
      overscroll: true,
      // We drive reduced-motion ourselves; Lenis is simply never created for it.
      respectReducedMotion: false,
    })

    activeLenis = instance
    setLenis(instance)

    const onScroll = (): void => {
      ScrollTrigger.update()
    }
    instance.on('scroll', onScroll)

    const tick = (time: number): void => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.cancelAnimationFrame(raf)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      instance.off('scroll', onScroll)
      instance.destroy()
      if (activeLenis === instance) activeLenis = null
      setLenis(null)
    }
  }, [smooth])

  // Layout settles late: fonts swap, images decode, the viewport resizes.
  // ScrollTrigger measurements have to follow. Runs whether or not Lenis is on.
  useEffect(() => {
    registerGsap()
    if (typeof window === 'undefined') return

    let timer: number | undefined
    const refresh = (): void => {
      if (timer !== undefined) window.clearTimeout(timer)
      timer = window.setTimeout(() => ScrollTrigger.refresh(), SCROLL.refreshDebounce)
    }

    window.addEventListener('resize', refresh)
    window.addEventListener('orientationchange', refresh)

    const fonts: FontFaceSet | undefined = 'fonts' in document ? document.fonts : undefined
    fonts?.addEventListener('loadingdone', refresh)
    void fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined)

    return () => {
      if (timer !== undefined) window.clearTimeout(timer)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('orientationchange', refresh)
      fonts?.removeEventListener('loadingdone', refresh)
    }
  }, [])

  return createElement(LenisContext.Provider, { value: lenis }, children)
}

/** The live Lenis instance, or `null` when smooth scrolling is off. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

/**
 * 0..1 progress of `ref` travelling through the viewport, written straight into a
 * ref on every scroll tick. Never triggers a React render — read it inside rAF
 * (a three.js frame loop, a canvas, a cursor).
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): MutableRefObject<number> {
  const progress = useRef(0)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    registerGsap()

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          progress.current = self.progress
        },
        onRefresh: (self) => {
          progress.current = self.progress
        },
      })
    }, el)

    return () => {
      ctx.revert()
      progress.current = 0
    }
  }, [ref])

  return progress
}
