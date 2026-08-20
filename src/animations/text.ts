'use client'

/**
 * Masked text reveals. Lines (or words) rise out of an overflow-hidden mask —
 * the one flourish the display type gets.
 *
 * Splitting waits for web fonts so line breaks are measured against the real
 * Cormorant metrics, and falls back to a plain fade if SplitText cannot run.
 */

import type { RefObject } from 'react'
import { motionFlag, useMotionStore } from '@/lib/motion'
import { DISTANCE, DURATION, EASE, SCROLL, STAGGER, delayOf, dur } from './config'
import { gsap, SplitText, registerGsap } from './gsap'
import { markReady, revealFromVars, revealToVars, useIsoLayoutEffect, whenFontsReady } from './internal'

export interface TextRevealOptions {
  /** split granularity — lines read editorial, words read kinetic */
  by?: 'line' | 'word'
  /** seconds */
  delay?: number
  /** seconds between pieces */
  stagger?: number
  start?: string
  once?: boolean
  /** seconds */
  duration?: number
}

export function useTextReveal(ref: RefObject<HTMLElement | null>, opts: TextRevealOptions = {}): void {
  const { by = 'line', delay = 0, stagger, start = SCROLL.start, once = SCROLL.once, duration } = opts

  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    registerGsap()

    if (!motionFlag(config, systemReduced, 'textReveal')) {
      markReady(el)
      return
    }

    let split: SplitText | null = null
    let ctx: gsap.Context | null = null

    const cancelFonts = whenFontsReady((fontsSettled) => {
      ctx = gsap.context(() => {
        let pieces: Element[] = []

        // Splitting against fallback metrics is worse than not splitting at all:
        // Cormorant swaps in afterwards, the copy re-flows inside line masks
        // that were measured for the wrong face, and the display heading clips.
        // If the fonts never settled, take the plain fade instead.
        if (fontsSettled) {
          try {
            split = new SplitText(el, {
              type: by === 'word' ? 'words' : 'lines,words',
              mask: by === 'word' ? 'words' : 'lines',
              linesClass: 'an-split-line',
              wordsClass: 'an-split-word',
              autoSplit: false,
              aria: 'auto',
            })
            pieces = by === 'word' ? Array.from(split.words) : Array.from(split.lines)
            if (by === 'line') {
              for (const line of split.lines) line.setAttribute('data-split-line', '')
            }
          } catch {
            // SplitText can bail on exotic markup — never let that hide the copy.
            split = null
            pieces = []
          }
        }

        const usedSplit = pieces.length > 0
        const targets: Element[] = usedSplit ? pieces : [el]

        if (usedSplit) {
          gsap.set(targets, { yPercent: 108 })
        } else {
          gsap.set(targets, revealFromVars('revealUp', DISTANCE.sm))
        }

        markReady(el)

        gsap.to(targets, {
          ...(usedSplit ? { yPercent: 0 } : revealToVars('revealUp')),
          duration: dur(duration ?? (by === 'word' ? DURATION.base : DURATION.slow)),
          delay: delayOf(delay),
          ease: EASE.expo,
          stagger: delayOf(stagger ?? (by === 'word' ? STAGGER.words : STAGGER.lines)),
          scrollTrigger: {
            trigger: el,
            start,
            once,
            toggleActions: SCROLL.toggleActions,
          },
        })
      }, el)
    })

    return () => {
      cancelFonts()
      ctx?.revert()
      // revert() restores the original innerHTML, so it must run after the tweens die.
      split?.revert()
      markReady(el)
    }
  }, [ref, by, delay, stagger, start, once, duration, config, systemReduced])
}
