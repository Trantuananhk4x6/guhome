'use client'

/**
 * Bridge between scroll and the three.js camera.
 *
 * The scene reads `progress.current` inside its own frame loop, so this hook
 * writes a plain number into a ref — never React state. A scrubbed proxy tween
 * adds the inertia that makes a camera move feel filmed rather than dragged.
 */

import type { MutableRefObject, RefObject } from 'react'
import { motionFlag, useMotionStore } from '@/lib/motion'
import { EASE } from './config'
import { gsap, registerGsap } from './gsap'
import { useIsoLayoutEffect } from './internal'

export interface CameraScrollArgs {
  sectionRef: RefObject<HTMLElement | null>
  progress: MutableRefObject<number>
  /** >1 reaches the last waypoint before the section ends, <1 stretches it out */
  sensitivity?: number
  /** seconds of scrub catch-up; 0 locks the camera to the scrollbar */
  smoothing?: number
  /** where the section starts driving the camera */
  start?: string
  end?: string
}

export function useCameraScroll(args: CameraScrollArgs): void {
  const { sectionRef, progress, sensitivity = 1, smoothing = 0.6, start = 'top top', end = 'bottom bottom' } = args

  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)

  useIsoLayoutEffect(() => {
    const el = sectionRef.current
    if (!el) return
    registerGsap()

    if (!motionFlag(config, systemReduced, 'cameraAnimation')) {
      // Park the camera on its first waypoint and leave it there.
      progress.current = 0
      return
    }

    const ctx = gsap.context(() => {
      const proxy = { value: 0 }
      const write = (): void => {
        const scaled = proxy.value * sensitivity
        progress.current = scaled < 0 ? 0 : scaled > 1 ? 1 : scaled
      }

      gsap.to(proxy, {
        value: 1,
        ease: EASE.none,
        onUpdate: write,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: smoothing,
          invalidateOnRefresh: true,
          onRefresh: write,
        },
      })
    }, el)

    return () => {
      ctx.revert()
      progress.current = 0
    }
  }, [sectionRef, progress, sensitivity, smoothing, start, end, config, systemReduced])
}
