'use client'

/**
 * Pinned horizontal rail for the project index.
 *
 * Desktop: the section pins and the track slides left for exactly as far as it
 * overflows. Below 1024px the rail degrades to an ordinary swipeable strip —
 * same markup, no pinning, no transforms.
 *
 * ```tsx
 * <HorizontalScroll trackClassName="gap-8 px-(--spacing-gutter)">
 *   {projects.map(p => <ProjectCard key={p.id} project={p} />)}
 * </HorizontalScroll>
 * ```
 */

import { useRef } from 'react'
import type { JSX, ReactNode } from 'react'
import { useHorizontalScroll } from '@/animations/projects'
import { cn } from '@/lib/utils'

export interface HorizontalScrollProps {
  children: ReactNode
  className?: string
  trackClassName?: string
  /** extra scroll distance past the end of the track, in px */
  endPadding?: number
  /** seconds of scrub catch-up */
  scrub?: boolean | number
  'aria-label'?: string
}

export function HorizontalScroll(props: HorizontalScrollProps): JSX.Element {
  const { children, className, trackClassName, endPadding, scrub, 'aria-label': ariaLabel } = props

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  useHorizontalScroll(sectionRef, trackRef, { endPadding, scrub })

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      data-horizontal-section=""
      className={cn('relative overflow-x-auto lg:overflow-hidden', className)}
    >
      <div ref={trackRef} data-horizontal-track="" className={cn('flex w-max flex-nowrap', trackClassName)}>
        {children}
      </div>
    </section>
  )
}
