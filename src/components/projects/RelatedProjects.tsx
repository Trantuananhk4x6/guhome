'use client'

/**
 * The rail that closes a project page.
 *
 * It is a native scroll box, on every screen size. There is no pin and no
 * GSAP tween: the wheel goes straight down the page and out into the footer,
 * exactly as it does over every other section. The horizontal axis is browsed
 * on purpose instead — the two step buttons beside the heading, arrow keys once
 * the strip has focus, a held mouse drag, or a trackpad swipe. All of that
 * lives in `useRelatedRail`.
 *
 * WHY THE PIN WENT. `useHorizontalScroll` pinned this section and scrubbed the
 * track for as far as it overflowed — about 1,700px of pin-spacer on a desktop
 * viewport. Reaching the footer therefore meant turning the wheel across the
 * entire run of sibling projects first, with the page frozen underneath. That
 * is the complaint this component existed to cause.
 *
 * The one remaining condition is arithmetic, not preference: a rail whose track
 * is narrower than the viewport is a strip that cannot move, and two or three
 * siblings on a wide screen are exactly that. That case renders the plain grid
 * instead — see `travelPx`. Motion settings no longer enter into it, because a
 * native scroll box is not motion.
 */

import { useEffect, useSyncExternalStore } from 'react'

import { registerGsap, ScrollTrigger } from '@/animations/gsap'
import { HorizontalScroll } from '@/components/animation'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { DISPLAY_SM } from './composition'
import { ProjectCard } from './ProjectCard'
import { ProjectGrid } from './ProjectGrid'
import { RailSteps, useRelatedRail } from './RelatedRail'

export interface RelatedProjectsProps {
  projects: readonly ProjectSummary[]
  heading?: string
  className?: string
}

/** One measure for every card, so the track advances in even steps. */
const CARD = 'w-[clamp(20rem,32vw,44rem)] shrink-0'
const CARD_SIZES = '(min-width: 2200px) 44rem, (min-width: 1024px) 32vw, 78vw'

/* ------------------------------ track geometry ----------------------------- */
/* Every number here is read straight off the markup below. Change one there and
   change it here, or the grid/rail choice is made on stale arithmetic.        */

/** `clamp(20rem,32vw,44rem)`. A viewport-proportional card is what keeps the
 *  track overflowing on an ultrawide monitor: a fixed 34rem card left six
 *  siblings 240px short at 3440px and actually *narrower* than the viewport at
 *  3840px, so the rail silently became a grid on exactly the screens it looks
 *  best on. 32vw caps at 44rem so a card never outgrows a comfortable reading
 *  measure. */
const CARD_MAX_PX = 704
const CARD_MIN_PX = 320
const CARD_VW = 0.32
/** `gap-10` */
const GAP_PX = 40
/** `--spacing-gutter: clamp(1.25rem, 4vw, 4.5rem)` — one on each side of the track. */
const GUTTER_MIN_PX = 20
const GUTTER_MAX_PX = 72
const GUTTER_VW = 0.04
/** Below this much overflow the strip is a wobble, not a rail — render the grid. */
const MIN_TRAVEL_PX = 320

/** How far the track will overflow the viewport, one render before it exists. */
function travelPx(count: number, viewport: number): number {
  const card = Math.min(Math.max(viewport * CARD_VW, CARD_MIN_PX), CARD_MAX_PX)
  const gutter = Math.min(GUTTER_MAX_PX, Math.max(GUTTER_MIN_PX, viewport * GUTTER_VW))
  const track = count * card + Math.max(0, count - 1) * GAP_PX + 2 * gutter
  return Math.max(0, track - viewport)
}

function subscribeToViewport(onChange: () => void): () => void {
  window.addEventListener('resize', onChange)
  return () => window.removeEventListener('resize', onChange)
}

/** `true` when the track really will overflow far enough to be worth a rail. */
function useTrackTravels(count: number): boolean {
  return useSyncExternalStore(
    subscribeToViewport,
    () => travelPx(count, window.innerWidth) >= MIN_TRAVEL_PX,
    // No viewport on the server, so guess the *static* variant every time and
    // let the first client commit upgrade to the rail once it can measure.
    // grid → rail is the one direction where the swap looks deliberate.
    () => false,
  )
}

export function RelatedProjects({ projects, heading, className }: RelatedProjectsProps) {
  const title = heading ?? 'Những không gian khác'
  const rail = useTrackTravels(projects.length)
  const controls = useRelatedRail(title, rail)

  // Dropping the pin took roughly a screen of pin-spacer out of the document,
  // and the same happens again when the grid upgrades to the rail. Every
  // trigger below this section is measured against a page height that no longer
  // holds, so hand GSAP the new one.
  useEffect(() => {
    registerGsap()
    ScrollTrigger.refresh()
  }, [rail])

  if (projects.length === 0) return null

  return (
    <section className={cn('w-full', className)}>
      {/*
        Composed here rather than through `SectionHeading`: that component
        stacks eyebrow → title → action, which on a 1472px measure leaves the
        link floating alone in a 900px void beside a two-line heading. Heading
        in six columns, actions in the last four, one baseline.
      */}
      <div className="u-gutter mx-auto mb-[clamp(2.5rem,6vh,4rem)] grid w-full max-w-[110rem] grid-cols-12 items-end gap-x-8 gap-y-6">
        <div className="col-span-12 lg:col-span-6">
          <Label as="p" rule>
            Selected works
          </Label>
          <h2 className={cn(DISPLAY_SM, 'text-ink mt-5 max-w-[16ch]')}>{title}</h2>
        </div>

        {/* The steps sit with the index link rather than over the cards: an
            overlay control would cover the photograph it steps past, and on a
            phone it would sit under the thumb that is already swiping. */}
        <div className="col-span-12 flex items-center justify-between gap-6 lg:col-span-5 lg:col-start-8 lg:justify-end lg:gap-10">
          <Button href="/projects" variant="underline" withArrow>
            Toàn bộ dự án
          </Button>
          {rail ? <RailSteps controls={controls} /> : null}
        </div>
      </div>

      {rail ? (
        <HorizontalScroll
          scrollerRef={controls.scrollerRef}
          {...controls.railProps}
          // `py-6` keeps the card shadow inside the scroll box, so the strip
          // never grows a stray vertical scrollbar.
          trackClassName="items-start gap-10 px-(--spacing-gutter) py-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={CARD}
              sizes={CARD_SIZES}
              width={1200}
            />
          ))}
        </HorizontalScroll>
      ) : (
        <div className="u-gutter mx-auto w-full max-w-[110rem]">
          <ProjectGrid projects={projects} columns={3} />
        </div>
      )}
    </section>
  )
}
