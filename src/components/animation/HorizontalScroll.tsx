'use client'

/**
 * A horizontally scrollable strip — plain, native, and the same on every screen.
 *
 * This used to pin the section and scrub the track sideways with GSAP
 * (`useHorizontalScroll`). That made the wheel drive the rail instead of the
 * page: the footer was unreachable until the whole run had gone by. The pin is
 * gone. The section is now an `overflow-x-auto` box, so the wheel scrolls the
 * document straight past it and the horizontal axis is browsed on purpose —
 * see `useRelatedRail` for the step buttons, keyboard and drag that go with it.
 *
 * The caller owns the interaction: pass `scrollerRef` and spread whatever
 * handlers it needs onto the section through `...rest`.
 *
 * ```tsx
 * <HorizontalScroll scrollerRef={ref} trackClassName="gap-8 px-(--spacing-gutter)" {...railProps}>
 *   {projects.map(p => <ProjectCard key={p.id} project={p} />)}
 * </HorizontalScroll>
 * ```
 */

import type { ComponentPropsWithoutRef, JSX, ReactNode, Ref } from 'react'
import { cn } from '@/lib/utils'

export interface HorizontalScrollProps extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  children: ReactNode
  trackClassName?: string
  /** The scroll box itself — the element whose `scrollLeft` the caller drives. */
  scrollerRef?: Ref<HTMLElement>
}

export function HorizontalScroll(props: HorizontalScrollProps): JSX.Element {
  const { children, className, trackClassName, scrollerRef, ...rest } = props

  return (
    <section
      ref={scrollerRef}
      data-horizontal-section=""
      className={cn(
        // No `lg:overflow-hidden`: the track is `w-max`, so hiding the overflow
        // on desktop clips every card past the fold with no way to reach them.
        // `overscroll-x-contain` keeps the end of the run from turning into a
        // browser back-gesture; the vertical axis stays with the page.
        'relative overflow-x-auto overflow-y-hidden overscroll-x-contain',
        // The strip is driven by buttons, keys and drag, so the scrollbar is
        // one more horizontal line across an editorial layout for no gain.
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
      {...rest}
    >
      <div data-horizontal-track="" className={cn('flex w-max flex-nowrap', trackClassName)}>
        {children}
      </div>
    </section>
  )
}
