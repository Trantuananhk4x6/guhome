'use client'

/**
 * Frame that drifts its contents against the scroll.
 *
 * The inner layer is inset by exactly half the maximum travel on each side, so
 * the frame never exposes an edge no matter how short the element is — no
 * overscale, no cropping surprises.
 *
 * ```tsx
 * <Parallax className="aspect-[4/5]" strength={0.8}>
 *   <Image src={…} alt={…} fill className="object-cover" />
 * </Parallax>
 * ```
 */

import { useRef } from 'react'
import type { CSSProperties, JSX, ReactNode } from 'react'
import { DISTANCE } from '@/animations/config'
import { useParallax } from '@/animations/image'
import { cn } from '@/lib/utils'

export interface ParallaxProps {
  children: ReactNode
  /** multiplier on the 140px baseline travel */
  strength?: number
  axis?: 'y' | 'x'
  /** seconds of scrub catch-up; `true` locks to the scrollbar */
  scrub?: boolean | number
  className?: string
  innerClassName?: string
  style?: CSSProperties
}

export function Parallax(props: ParallaxProps): JSX.Element {
  const { children, strength = 1, axis = 'y', scrub = true, className, innerClassName, style } = props

  const ref = useRef<HTMLDivElement>(null)
  useParallax(ref, { strength, axis, scrub })

  // Worst-case travel is ±(DISTANCE.parallax * strength) / 2; the intensity dial
  // can only shrink it, so this bleed is always enough.
  const bleed = Math.ceil((DISTANCE.parallax * Math.abs(strength)) / 2) + 2
  const inset: CSSProperties =
    axis === 'y'
      ? { top: -bleed, bottom: -bleed, left: 0, right: 0 }
      : { top: 0, bottom: 0, left: -bleed, right: -bleed }

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)} style={style}>
      <div
        data-reveal-media=""
        className={cn('absolute', innerClassName)}
        style={{ ...inset, willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  )
}
