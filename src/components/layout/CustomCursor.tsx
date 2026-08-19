'use client'

import { useEffect, useRef, useState } from 'react'

import { gsap, registerGsap } from '@/animations/gsap'
import { motionEnabled } from '@/lib/motion'
import { cn } from '@/lib/utils'

const STATES = ['default', 'view', 'drag', 'project'] as const
export type CursorState = (typeof STATES)[number]

const LABELS: Record<CursorState, string> = {
  default: '',
  view: 'XEM',
  drag: 'KÉO',
  project: 'DỰ ÁN',
}

const RING: Record<CursorState, string> = {
  default: 'h-6 w-6',
  view: 'h-20 w-20 bg-accent/10',
  drag: 'h-20 w-20 bg-accent/10',
  project: 'h-24 w-24 bg-accent/15',
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
 * Desktop-only cursor companion: a hairline accent ring that grows and can
 * carry a short label. Never rendered on touch devices or under reduced
 * motion, and the native cursor is left visible on purpose.
 *
 * Any element can drive it: `data-cursor="view" | "drag" | "project"`.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState<CursorState>('default')
  const [hot, setHot] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(fine.matches && motionEnabled('enabled'))
    update()
    fine.addEventListener('change', update)
    return () => fine.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    registerGsap()
    const ring = ringRef.current
    if (!ring) return

    const moveX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const moveY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX)
      moveY(event.clientY)
      setVisible(true)
    }
    const onOver = (event: PointerEvent) => {
      const next = readState(event.target)
      setState(next.state)
      setHot(next.hot)
    }
    const onLeave = () => setVisible(false)

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
          'absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/70',
          'transition-[width,height,opacity,background-color] duration-500 ease-editorial',
          RING[state],
          state === 'default' && hot && 'h-10 w-10 bg-accent/5',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="u-label text-[0.5rem] leading-none text-accent">{LABELS[state]}</span>
      </div>
    </div>
  )
}
