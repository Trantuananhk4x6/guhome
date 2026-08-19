'use client'

/**
 * Before / after comparison.
 *
 * The handle position lives in a CSS custom property written straight onto the
 * DOM — dragging never touches React state, so a pointer move costs one style
 * write instead of a render. It is a real `role="slider"`: arrow keys nudge it,
 * Page keys jump, Home/End pin it to either edge.
 *
 * On first entry GSAP nudges the handle once, so the reader learns it is
 * draggable, and then it stays exactly where it was left.
 */

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'

import { gsap, ScrollTrigger, registerGsap } from '@/animations/gsap'
import { useReveal } from '@/animations/reveal'
import { mediaUrl } from '@/lib/media'
import { motionEnabled } from '@/lib/motion'
import { clamp, cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

export interface BeforeAfterProps {
  before: MediaRef | null
  after: MediaRef | null
  /** Editorial caption under the frame. */
  label?: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

const START = 50
const STEP = 2
const BIG_STEP = 10

export function BeforeAfter({
  before,
  after,
  label,
  beforeLabel = 'Trước',
  afterLabel = 'Sau',
  className,
}: BeforeAfterProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef(START)
  const touchedRef = useRef(false)

  useReveal(sectionRef, { variant: 'revealUp' })

  /** Single write path: CSS variable for the paint, aria-valuenow for the API. */
  const apply = (next: number): void => {
    const value = clamp(next, 0, 100)
    valueRef.current = value
    frameRef.current?.style.setProperty('--ba', `${value}%`)
    handleRef.current?.setAttribute('aria-valuenow', String(Math.round(value)))
  }

  // The one-off nudge. Once only, and never once the reader has taken over.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    apply(START)
    if (!motionEnabled('enabled')) return

    registerGsap()
    const proxy = { value: START }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: frame,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          if (touchedRef.current) return
          gsap
            .timeline({ defaults: { ease: 'power2.inOut' } })
            .to(proxy, {
              value: START + 14,
              duration: 0.65,
              onUpdate: () => {
                if (!touchedRef.current) apply(proxy.value)
              },
            })
            .to(proxy, {
              value: START,
              duration: 0.75,
              onUpdate: () => {
                if (!touchedRef.current) apply(proxy.value)
              },
            })
        },
      })
    }, frame)

    return () => ctx.revert()
    // `apply` closes over refs only — stable for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function positionFromClientX(clientX: number): number {
    const frame = frameRef.current
    if (!frame) return valueRef.current
    const rect = frame.getBoundingClientRect()
    if (rect.width === 0) return valueRef.current
    return ((clientX - rect.left) / rect.width) * 100
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>): void {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    touchedRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    apply(positionFromClientX(event.clientX))
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>): void {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    event.preventDefault()
    apply(positionFromClientX(event.clientX))
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>): void {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    const deltas: Record<string, number> = {
      ArrowLeft: -STEP,
      ArrowRight: STEP,
      ArrowDown: -STEP,
      ArrowUp: STEP,
      PageDown: -BIG_STEP,
      PageUp: BIG_STEP,
    }

    if (event.key === 'Home') {
      touchedRef.current = true
      apply(0)
      event.preventDefault()
      return
    }
    if (event.key === 'End') {
      touchedRef.current = true
      apply(100)
      event.preventDefault()
      return
    }

    const delta = deltas[event.key]
    if (delta === undefined) return
    touchedRef.current = true
    apply(valueRef.current + delta)
    event.preventDefault()
  }

  if (!before || !after) return null

  return (
    <section ref={sectionRef} data-reveal className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <figure className="flex flex-col gap-4">
        <div
          ref={frameRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ '--ba': `${START}%` } as CSSProperties}
          className="bg-surface-alt relative isolate aspect-[16/10] w-full touch-pan-y overflow-hidden select-none shadow-[0_24px_60px_-40px_rgba(28,27,24,0.55)]"
        >
          <Image
            src={mediaUrl(before, 2400)}
            alt={before.alt ?? 'Hiện trạng trước khi cải tạo'}
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-cover"
            {...(before.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: before.blurDataURL } : {})}
          />

          <div className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 var(--ba))' }}>
            <Image
              src={mediaUrl(after, 2400)}
              alt={after.alt ?? 'Không gian sau khi hoàn thiện'}
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover"
              {...(after.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: after.blurDataURL } : {})}
            />
          </div>

          <span className="u-label text-canvas absolute top-5 left-5 bg-espresso/60 px-3 py-1.5">{beforeLabel}</span>
          <span className="u-label text-canvas absolute top-5 right-5 bg-espresso/60 px-3 py-1.5">{afterLabel}</span>

          <div
            ref={handleRef}
            role="slider"
            tabIndex={0}
            aria-label="So sánh trước và sau"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={START}
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
            className="bg-canvas absolute inset-y-0 w-px cursor-ew-resize focus-visible:outline-offset-4"
            style={{ left: 'var(--ba)' }}
          >
            <span
              aria-hidden="true"
              className="border-canvas bg-espresso/40 absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border"
            >
              <span className="bg-canvas block h-3 w-px" />
              <span className="bg-canvas mx-1.5 block h-5 w-px" />
              <span className="bg-canvas block h-3 w-px" />
            </span>
          </div>
        </div>

        {label ? <figcaption className="u-label max-w-[52ch]">{label}</figcaption> : null}
      </figure>
    </section>
  )
}
