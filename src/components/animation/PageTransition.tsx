'use client'

/**
 * Wraps the routed content and covers the screen while the new route arrives on
 * it, then lifts the cover away.
 *
 * It does **not** try to hold the outgoing page on screen. In the App Router a
 * layout's `children` is a stable element whose contents the router swaps
 * internally — parking it in state hands back the very same element, so it
 * renders whatever route the router currently holds. The component this replaced
 * did exactly that and, because the cover was tweened in over half a second,
 * the reader watched the destination appear, get wiped over, and come back.
 * Covering synchronously in the layout effect that runs between the route commit
 * and the paint is what actually works: the destination is never painted bare,
 * and the only motion is the reveal — which lands on top of the incoming page's
 * own entrance animations rather than fighting them.
 *
 * Wrap `{children}` of the root layout with this. Disabled — and completely
 * inert — when `MotionConfig.pageTransition` is false or motion is reduced.
 */

import { useRef } from 'react'
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

  /**
   * The route this component has already reacted to. Seeded with the mount
   * pathname so a first load is never curtained, and touched only from inside
   * the effect below — never during render.
   */
  const handledPathRef = useRef(pathname)

  useIsoLayoutEffect(() => {
    // `enabled` is in the dependency list because the curtain must not outlive
    // a motion setting being switched off mid-flight, but a change to it is not
    // a navigation — only a new pathname is.
    if (handledPathRef.current === pathname) return
    handledPathRef.current = pathname

    // Always consume, even on the paths that skip the curtain: a flag left
    // standing would swallow the *next* navigation's curtain instead of this
    // one's. (A project card expansion or a View Transition sets it, because it
    // is already covering the screen for this navigation itself.)
    const suppressed = consumeCurtainSuppression()

    registerGsap()

    // Both of these have to happen before the paint, in this order: reset the
    // scroll so the incoming page is measured at the top, then re-measure. The
    // new page's own hooks have already created their ScrollTriggers by now —
    // React runs children's layout effects before the parent's.
    scrollToTop()
    ScrollTrigger.refresh()

    const panel = panelRef.current
    if (!enabled || !panel || suppressed) return

    const ctx = gsap.context(() => {
      curtainTimeline({ panel, mark: markRef.current })
    }, panel)

    return () => {
      // Reverting an interrupted curtain returns the panel to hidden, so a
      // navigation that lands mid-reveal can never strand the reader behind it.
      ctx.revert()
    }
  }, [pathname, enabled])

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
      {children}
    </>
  )
}
