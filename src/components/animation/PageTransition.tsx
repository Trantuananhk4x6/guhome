'use client'

/**
 * Wraps the routed content and holds the outgoing page on screen while an
 * espresso curtain wipes across it. The route swap happens under full cover, so
 * you never see a half-painted page.
 *
 * Wrap `{children}` of the `(site)` layout with this. Disabled — and completely
 * inert — when `MotionConfig.pageTransition` is false or motion is reduced.
 */

import { useRef, useState } from 'react'
import type { JSX, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useMotionFlag } from '@/lib/motion'
import { gsap, ScrollTrigger, registerGsap } from '@/animations/gsap'
import { consumeCurtainSuppression, useIsoLayoutEffect } from '@/animations/internal'
import { CURTAIN_Z_INDEX, curtainTimeline } from '@/animations/pageTransition'
import { scrollToTop } from '@/animations/scroll'

export function PageTransition(props: { children: ReactNode }): JSX.Element {
  const { children } = props
  const pathname = usePathname()
  const enabled = useMotionFlag('pageTransition')

  const panelRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)

  /** The route currently painted on screen — lags `pathname` while covered. */
  const shownPath = useRef(pathname)
  /** Latest children, read at swap time without re-arming the effect. */
  const pendingChildren = useRef<ReactNode>(children)
  pendingChildren.current = children
  /** Set at the swap so the next layout pass re-measures ScrollTriggers. */
  const needsRefresh = useRef(false)

  const [display, setDisplay] = useState<ReactNode>(children)

  // Same route, fresh content (search params, revalidation): pass it through
  // immediately — a render-phase update on our own state, no extra commit.
  if (shownPath.current === pathname && display !== children) {
    setDisplay(children)
  }

  useIsoLayoutEffect(() => {
    if (shownPath.current === pathname) return

    const swap = (): void => {
      shownPath.current = pathname
      needsRefresh.current = true
      scrollToTop()
      setDisplay(pendingChildren.current)
    }

    const panel = panelRef.current
    // A project card expansion (or a View Transition) is already covering the
    // screen for this navigation — swap underneath it instead of curtaining too.
    if (!enabled || !panel || consumeCurtainSuppression()) {
      swap()
      return
    }

    registerGsap()
    const ctx = gsap.context(() => {
      curtainTimeline({ panel, mark: markRef.current, onCovered: swap })
    }, panel)

    return () => {
      ctx.revert()
    }
  }, [pathname, enabled])

  useIsoLayoutEffect(() => {
    if (!needsRefresh.current) return
    needsRefresh.current = false
    registerGsap()
    ScrollTrigger.refresh()
  }, [display])

  return (
    <>
      <div
        ref={panelRef}
        data-page-curtain=""
        aria-hidden="true"
        className="fixed inset-0 flex items-center justify-center bg-espresso"
        style={{
          zIndex: CURTAIN_Z_INDEX,
          opacity: 0,
          transform: 'scaleY(0)',
          transformOrigin: '50% 100%',
          pointerEvents: 'none',
        }}
      >
        <span ref={markRef} className="block h-px w-24 bg-accent-soft" style={{ opacity: 0 }} />
      </div>
      {display}
    </>
  )
}
