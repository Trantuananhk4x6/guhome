'use client'

/**
 * The controls that make a *native* horizontal rail usable with a mouse.
 *
 * The related-projects rail used to be a pinned GSAP tween: the wheel drove the
 * track sideways and the page underneath only resumed once the last card had
 * gone by. That is scroll hijacking — a visitor who wants the footer has to
 * cross seventeen hundred pixels of rail to reach it. So the rail is now an
 * ordinary `overflow-x-auto` box: the wheel goes straight down the page, past
 * it, and the horizontal axis is browsed deliberately instead — two step
 * buttons, arrow keys, a mouse drag, or a trackpad swipe.
 *
 * Everything here drives one element's `scrollLeft`. No transforms, no
 * ScrollTrigger, and deliberately no `data-lenis-prevent`: capturing the wheel
 * over the rail would rebuild exactly the trapped feeling this replaced.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent, PointerEvent, RefObject } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons'
import { useMotionStore } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Pixels of pointer travel that turn a click into a drag. Below this a shaky
 *  hand on a real click would swallow the navigation the card exists for. */
const DRAG_SLOP = 5
/** `scrollLeft` is fractional on zoomed/HiDPI displays, so an exact comparison
 *  against 0 or the maximum never reports an end. */
const EDGE_EPSILON = 1

/** Props the rail element must carry — spread onto the scroll box as-is. */
export interface RailHandlers {
  tabIndex: number
  role: 'region'
  'aria-label': string
  onScroll: () => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  onPointerDown: (event: PointerEvent<HTMLElement>) => void
  onPointerMove: (event: PointerEvent<HTMLElement>) => void
  onPointerUp: (event: PointerEvent<HTMLElement>) => void
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void
  onClickCapture: (event: MouseEvent<HTMLElement>) => void
}

export interface RailControls {
  /** Attach to the scroll box itself, not to the track inside it. */
  scrollerRef: RefObject<HTMLElement | null>
  railProps: RailHandlers
  /** `false` while the track fits — the step buttons have nowhere to go. */
  overflows: boolean
  canPrev: boolean
  canNext: boolean
  scrollByCard: (direction: 1 | -1) => void
}

interface DragState {
  pointerId: number
  startX: number
  startLeft: number
}

/**
 * One card plus one gap, measured off the live DOM. The card width is
 * `clamp(20rem,32vw,44rem)` and the gap is a Tailwind class, so both are
 * viewport- and theme-dependent — reading them back is the only way a step
 * lands a card flush instead of somewhere mid-photograph.
 */
function stepDistance(scroller: HTMLElement): number {
  const track = scroller.firstElementChild
  const card = track?.firstElementChild
  if (!(card instanceof HTMLElement)) return scroller.clientWidth * 0.8

  const gap = track instanceof HTMLElement ? Number.parseFloat(getComputedStyle(track).columnGap) : 0
  return card.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 0)
}

/**
 * `mounted` is what the caller knows and this hook cannot see: whether the rail
 * branch is the one being rendered. The first client commit is always the grid
 * — `useTrackTravels` has no viewport to measure during hydration — so the
 * measuring effect below would otherwise run once against a null scroller and
 * never again, leaving `overflows` false and the step buttons off the page
 * until the visitor happened to drag the strip by hand.
 */
export function useRelatedRail(label: string, mounted: boolean): RailControls {
  const scrollerRef = useRef<HTMLElement | null>(null)
  const [overflows, setOverflows] = useState(false)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // A visitor who asked for reduced motion gets the same jump, without the
  // half-second slide across it.
  const reduced = useMotionStore((state) => state.reduced)

  const frameRef = useRef<number | null>(null)
  const dragRef = useRef<DragState | null>(null)
  // Raised by a drag and read one tick later by the capture-phase click guard:
  // `ProjectCard` preventDefaults every left click and navigates, so without
  // this a drag that ends over a card would open that project.
  const draggedRef = useRef(false)

  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setOverflows(max > EDGE_EPSILON)
    setCanPrev(el.scrollLeft > EDGE_EPSILON)
    setCanNext(el.scrollLeft < max - EDGE_EPSILON)
  }, [])

  /** Scroll fires per frame at 60–120Hz; the four setStates behind it must not. */
  const queueSync = useCallback(() => {
    if (frameRef.current !== null) return
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      sync()
    })
  }, [sync])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    sync()

    // Both boxes matter: the scroller when the window resizes, the track when a
    // card image finally settles and the run gets longer.
    const observer = new ResizeObserver(queueSync)
    observer.observe(el)
    const track = el.firstElementChild
    if (track instanceof HTMLElement) observer.observe(track)

    return () => {
      observer.disconnect()
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [sync, queueSync, mounted])

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const el = scrollerRef.current
      if (!el) return
      el.scrollBy({ left: direction * stepDistance(el), behavior: reduced ? 'auto' : 'smooth' })
    },
    [reduced],
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      // Otherwise the browser scrolls the box by a few pixels as well as us.
      event.preventDefault()
      scrollByCard(event.key === 'ArrowLeft' ? -1 : 1)
    },
    [scrollByCard],
  )

  const endDrag = useCallback((event: PointerEvent<HTMLElement>) => {
    const drag = dragRef.current
    const el = scrollerRef.current
    if (!drag || !el || event.pointerId !== drag.pointerId) return

    dragRef.current = null
    if (el.hasPointerCapture(drag.pointerId)) el.releasePointerCapture(drag.pointerId)
    el.style.removeProperty('scroll-behavior')
    el.style.removeProperty('cursor')

    // The click generated by this same gesture is still to come; drop the flag
    // only once it has been through the capture-phase guard below.
    window.setTimeout(() => {
      draggedRef.current = false
    }, 0)
  }, [])

  const railProps: RailHandlers = {
    tabIndex: 0,
    role: 'region',
    'aria-label': label,
    onScroll: queueSync,
    onKeyDown,
    onPointerDown: (event) => {
      // Touch and pen already pan this box natively; taking the pointer would
      // only make that worse.
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      const el = scrollerRef.current
      if (!el) return

      dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startLeft: el.scrollLeft }
      draggedRef.current = false
      el.setPointerCapture(event.pointerId)
      // A smooth scroll-behavior would animate towards every per-frame write
      // and the track would lag behind the cursor.
      el.style.scrollBehavior = 'auto'
      el.style.cursor = 'grabbing'
    },
    onPointerMove: (event) => {
      const drag = dragRef.current
      const el = scrollerRef.current
      if (!drag || !el || event.pointerId !== drag.pointerId) return

      const dx = event.clientX - drag.startX
      if (Math.abs(dx) > DRAG_SLOP) draggedRef.current = true
      el.scrollLeft = drag.startLeft - dx
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture: (event) => {
      if (!draggedRef.current) return
      event.preventDefault()
      event.stopPropagation()
    },
  }

  return { scrollerRef, railProps, overflows, canPrev, canNext, scrollByCard }
}

export interface RailStepsProps {
  controls: RailControls
  className?: string
}

/** The pair of step buttons, sized to sit on the heading's baseline row. */
export function RailSteps({ controls, className }: RailStepsProps) {
  const { overflows, canPrev, canNext, scrollByCard } = controls
  // Nothing to step through: the track fits, or it has not been measured yet.
  if (!overflows) return null

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Step label="Xem các dự án trước đó" disabled={!canPrev} onClick={() => scrollByCard(-1)} side="prev" />
      <Step label="Xem các dự án tiếp theo" disabled={!canNext} onClick={() => scrollByCard(1)} side="next" />
    </div>
  )
}

function Step({
  label,
  disabled,
  onClick,
  side,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  side: 'prev' | 'next'
}) {
  const Icon = side === 'prev' ? ArrowLeftIcon : ArrowRightIcon

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'border-line text-ink flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500',
        disabled ? 'text-muted/30 cursor-default' : 'hover:border-accent hover:text-accent',
      )}
    >
      <Icon className="text-lg" />
    </button>
  )
}
