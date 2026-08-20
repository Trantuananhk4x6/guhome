'use client'

/**
 * Wraps the routed content and holds the outgoing page on screen while an
 * espresso curtain wipes across it. The route swap happens under full cover, so
 * you never see a half-painted page.
 *
 * Wrap `{children}` of the `(site)` layout with this. Disabled — and completely
 * inert — when `MotionConfig.pageTransition` is false or motion is reduced.
 *
 * What is painted lives in state, not in a ref: the outgoing page has to survive
 * arbitrary re-renders while the curtain runs, and a render React discards must
 * never be able to leave the component displaying a tree that was never
 * committed. `shownPathRef` mirrors `shown.path` purely so the swap effect can
 * ask "is this a new route?" without taking the displayed route as a dependency —
 * that dependency would tear the running curtain down at the moment it succeeds.
 */

import { useRef, useState } from 'react'
import type { JSX, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useMotionFlag } from '@/lib/motion'
import { gsap, ScrollTrigger, registerGsap } from '@/animations/gsap'
import { consumeCurtainSuppression, useIsoLayoutEffect } from '@/animations/internal'
import { CURTAIN_Z_INDEX, curtainTimeline } from '@/animations/pageTransition'
import { scrollToTop } from '@/animations/scroll'

interface Shown {
  /** The route `node` belongs to. Lags `pathname` while the curtain covers. */
  path: string
  node: ReactNode
}

export function PageTransition(props: { children: ReactNode }): JSX.Element {
  const { children } = props
  const pathname = usePathname()
  const enabled = useMotionFlag('pageTransition')

  const panelRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)

  const [shown, setShown] = useState<Shown>(() => ({ path: pathname, node: children }))

  /**
   * Mirror of `shown.path`, written only from the swap. Refs are read and
   * written exclusively inside effects here, never during render.
   */
  const shownPathRef = useRef(pathname)
  /** Newest committed children, so the swap does not take `children` as a dep. */
  const pendingRef = useRef<ReactNode>(children)
  /** Set at the swap so the next layout pass re-measures ScrollTriggers. */
  const needsRefreshRef = useRef(false)

  // Same route, fresh content (search params, revalidation, streamed-in blocks):
  // pass it through immediately. A render-phase update on this component's own
  // state — React re-renders before committing, so nothing stale ever paints.
  // While the curtain is up, `shown.path` is the *outgoing* route, so this is
  // false and the frozen page is left alone.
  if (shown.path === pathname && shown.node !== children) {
    setShown({ path: pathname, node: children })
  }

  // Mirror the newest children *after* the commit. Doing this during render — as
  // this component used to — lets a render React throws away (a suspended
  // navigation, a replayed render) leave the swap holding a tree that was never
  // shown. Declared above the swap effect so it has already run when a
  // navigation lands in the same commit.
  useIsoLayoutEffect(() => {
    pendingRef.current = children
  })

  useIsoLayoutEffect(() => {
    // TEMP-AUDIT
    const w = window as unknown as { __PTLOG?: string[] }
    w.__PTLOG = w.__PTLOG ?? []
    w.__PTLOG.push(`effect path=${pathname} shown=${shownPathRef.current} enabled=${String(enabled)} panel=${String(!!panelRef.current)}`)
    if (shownPathRef.current === pathname) return

    const swap = (): void => {
      shownPathRef.current = pathname
      needsRefreshRef.current = true
      scrollToTop()
      // Read from the ref, not from a closure: the incoming route may have
      // streamed more content in during the half-second the curtain was up.
      setShown({ path: pathname, node: pendingRef.current })
    }

    const panel = panelRef.current
    // A project card expansion (or a View Transition) is already covering the
    // screen for this navigation — swap underneath it instead of curtaining too.
    const suppressed = consumeCurtainSuppression()
    w.__PTLOG.push(`branch enabled=${String(enabled)} panel=${String(!!panel)} suppressed=${String(suppressed)}`)
    if (!enabled || !panel || suppressed) {
      swap()
      return
    }

    registerGsap()
    const ctx = gsap.context(() => {
      const tl = curtainTimeline({ panel, mark: markRef.current, onCovered: swap })
      w.__PTLOG.push(`built dur=${tl.duration()} t=${gsap.ticker.time}`)
      tl.eventCallback('onComplete', () => w.__PTLOG?.push(`complete t=${gsap.ticker.time}`))
    }, panel)

    return () => {
      // Reverting an interrupted curtain leaves `shownPathRef` on the outgoing
      // route, so the navigation that interrupted it re-arms and still swaps.
      ctx.revert()
    }
  }, [pathname, enabled])

  useIsoLayoutEffect(() => {
    if (!needsRefreshRef.current) return
    needsRefreshRef.current = false
    registerGsap()
    // The new page is in the DOM and Lenis has already been reset to 0, so every
    // start/end measured here is measured against the layout the reader sees.
    ScrollTrigger.refresh()
  }, [shown])

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
      {shown.node}
    </>
  )
}
