'use client'

import { useEffect, useRef, useState } from 'react'

import { gsap, registerGsap } from '@/animations/gsap'
import { useMotionFlag, useReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

const STATES = ['default', 'view', 'drag', 'project'] as const
export type CursorState = (typeof STATES)[number]

const LABELS: Record<CursorState, string> = {
  default: '',
  view: 'XEM',
  drag: 'KÉO',
  project: 'DỰ ÁN',
}

/**
 * Each state is a different silhouette, not just a different diameter:
 * a bare dot, a round plate for "view", a wide pill for the horizontal
 * "drag" gesture, and a larger double ring for a project link.
 */
const RING: Record<CursorState, string> = {
  default: 'h-6 w-6 border-accent/60',
  view: 'h-[4.5rem] w-[4.5rem] border-accent/70 bg-accent/10',
  drag: 'h-12 w-28 border-accent/70 bg-accent/[0.07]',
  project: 'h-24 w-24 border-accent/90 bg-accent/15',
}

const INTERACTIVE = 'a[href],button,[role="button"],input,select,textarea,summary'

function readState(target: EventTarget | null): { state: CursorState; hot: boolean } {
  if (!(target instanceof Element)) return { state: 'default', hot: false }
  const marked = target.closest('[data-cursor]')
  const hot = target.closest(INTERACTIVE) !== null
  if (!marked) return { state: 'default', hot }
  const raw = marked.getAttribute('data-cursor')
  const state = STATES.find((candidate) => candidate === raw)
  return { state: state ?? 'view', hot }
}

/**
 * Desktop-only cursor companion: a hairline accent ring that changes shape and
 * can carry a short label. Never rendered on touch devices or under reduced
 * motion, and the native cursor is left visible on purpose.
 *
 * Any element can drive it: `data-cursor="view" | "drag" | "project"`.
 *
 * Motion permission is read through the reactive store hooks — a snapshot taken
 * in an effect would be captured before `ScrollProvider` (an ancestor) has
 * published the OS `prefers-reduced-motion` value, and never re-read.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const [fine, setFine] = useState(false)
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState<CursorState>('default')
  const [hot, setHot] = useState(false)

  // Arms the OS media query and mirrors it into the store even if this ever
  // renders outside `ScrollProvider`; `useMotionFlag` then reacts to it.
  useReducedMotion()
  const motionOn = useMotionFlag('enabled')
  const enabled = fine && motionOn

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = (): void => setFine(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!enabled) return
    registerGsap()
    const ring = ringRef.current
    if (!ring) return

    const moveX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const moveY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    // pointermove fires many times per frame on a high-poll mouse — the tween is
    // driven imperatively and React state only changes on an actual transition.
    let shown = false
    let currentState: CursorState = 'default'
    let currentHot = false

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX)
      moveY(event.clientY)
      if (shown) return
      shown = true
      setVisible(true)
    }
    const onOver = (event: PointerEvent) => {
      const next = readState(event.target)
      if (next.state !== currentState) {
        currentState = next.state
        setState(next.state)
      }
      if (next.hot !== currentHot) {
        currentHot = next.hot
        setHot(next.hot)
      }
    }
    const onLeave = () => {
      if (!shown) return
      shown = false
      setVisible(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      gsap.killTweensOf(ring)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] h-0 w-0 will-change-transform"
    >
      <div
        className={cn(
          'absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full border border-accent/70',
          'transition-[width,height,opacity,background-color,border-color] duration-500 ease-editorial',
          RING[state],
          state === 'default' && hot && 'h-10 w-10 bg-accent/5',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        {state === 'drag' ? <span className="h-px w-3 bg-accent/55" /> : null}
        <span className="u-label text-[0.5rem] leading-none text-accent">{LABELS[state]}</span>
        {state === 'drag' ? <span className="h-px w-3 bg-accent/55" /> : null}
        {state === 'project' ? (
          <span className="pointer-events-none absolute inset-[0.375rem] rounded-full border border-accent/25" />
        ) : null}
      </div>
    </div>
  )
}
