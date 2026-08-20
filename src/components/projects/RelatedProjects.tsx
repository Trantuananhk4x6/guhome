'use client'

/**
 * The rail that closes a project page — now actually a rail.
 *
 * Desktop, motion on: `HorizontalScroll` pins the section and scrubs the track
 * sideways for exactly as far as it overflows (`useHorizontalScroll`). Below
 * 1024px the very same markup is an ordinary swipeable strip — the hook's
 * `HORIZONTAL_QUERY` never matches there, and the section is `overflow-x-auto`.
 *
 * Motion off — the admin switch, or the OS asking for reduced motion — the hook
 * declines to build the pin *and* the section is `lg:overflow-hidden`, which
 * would clip a `w-max` track on a desktop viewport with no way to scroll it. So
 * that case falls back to the plain grid instead of an unreachable rail. This
 * complements the hook rather than fighting it: nothing here re-enables motion
 * the hook has already refused.
 *
 * The third condition is arithmetic, not preference: a pinned rail whose track is
 * narrower than the viewport pins the page and then moves nothing. A project with
 * only two or three siblings is exactly that case on a wide screen, so the track
 * is measured against the viewport before the rail is mounted — see `travelPx`.
 */

import { useSyncExternalStore } from 'react'

import { HorizontalScroll } from '@/components/animation'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { useMotionFlag, useMotionStore } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { DISPLAY_SM } from './composition'
import { ProjectCard } from './ProjectCard'
import { ProjectGrid } from './ProjectGrid'

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
   change it here, or the rail will pin on viewports it cannot travel across.   */

/** `clamp(20rem,32vw,44rem)`. A viewport-proportional card is what keeps the
 *  track overflowing on an ultrawide monitor: a fixed 34rem card left six
 *  siblings 240px short of the pin threshold at 3440px and actually *narrower*
 *  than the viewport at 3840px, so the rail silently became a grid on exactly
 *  the screens it looks best on. 32vw caps at 44rem so a card never outgrows a
 *  comfortable reading measure. The rail only runs at ≥1024px
 *  (`HORIZONTAL_QUERY`), where 32vw ≥ 20rem, so the lower clamp is a floor for
 *  the SSR pass rather than a width anyone sees. */
const CARD_MAX_PX = 704
const CARD_MIN_PX = 320
const CARD_VW = 0.32
/** `gap-10` */
const GAP_PX = 40
/** `--spacing-gutter: clamp(1.25rem, 4vw, 4.5rem)` — one on each side of the track. */
const GUTTER_MIN_PX = 20
const GUTTER_MAX_PX = 72
const GUTTER_VW = 0.04
/** Scroll handed to the rail past the end of the track, so the last card clears
 *  the right gutter instead of finishing flush against the viewport edge. */
const END_PADDING_PX = GUTTER_MAX_PX
/** Below this much travel the pin is a stutter, not a rail — render the grid. */
const MIN_TRAVEL_PX = 320

/**
 * `useHorizontalScroll`'s own travel formula — `track.scrollWidth -
 * window.innerWidth + endPadding` — evaluated one render before the track exists.
 */
function travelPx(count: number, viewport: number): number {
  const card = Math.min(Math.max(viewport * CARD_VW, CARD_MIN_PX), CARD_MAX_PX)
  const gutter = Math.min(GUTTER_MAX_PX, Math.max(GUTTER_MIN_PX, viewport * GUTTER_VW))
  const track = count * card + Math.max(0, count - 1) * GAP_PX + 2 * gutter
  return Math.max(0, track - viewport + END_PADDING_PX)
}

function subscribeToViewport(onChange: () => void): () => void {
  window.addEventListener('resize', onChange)
  return () => window.removeEventListener('resize', onChange)
}

/** `true` when the track really will overflow far enough to be worth pinning. */
function useTrackTravels(count: number): boolean {
  return useSyncExternalStore(
    subscribeToViewport,
    () => travelPx(count, window.innerWidth) >= MIN_TRAVEL_PX,
    // No viewport on the server, so guess the *static* variant every time and
    // let the first client commit upgrade to the rail once it can measure.
    // Guessing the rail instead would make the wide-screen path render a pinned
    // 100vh section and then tear it back out, which reads as a broken page;
    // grid → rail is the one direction where the swap looks deliberate.
    () => false,
  )
}

export function RelatedProjects({ projects, heading, className }: RelatedProjectsProps) {
  // Exactly the two conditions `useHorizontalScroll` builds the rail under:
  // `motionFlag(config, reduced, 'enabled')` at its line 52, and the
  // `(prefers-reduced-motion: no-preference)` half of `HORIZONTAL_QUERY`. Mirroring
  // both means the rail markup is only ever mounted when the hook will animate it.
  const motionOn = useMotionFlag('enabled')
  const systemReduced = useMotionStore((state) => state.reduced)
  // …plus the one thing the hook cannot decide for itself: whether pinning buys
  // any movement. Three siblings on a 1920px screen come to 1856px of track.
  const travels = useTrackTravels(projects.length)
  const rail = motionOn && !systemReduced && travels

  if (projects.length === 0) return null

  const title = heading ?? 'Những không gian khác'

  return (
    <section className={cn('w-full', className)}>
      {/*
        Composed here rather than through `SectionHeading`: that component
        stacks eyebrow → title → action, which on a 1472px measure leaves the
        link floating alone in a 900px void beside a two-line heading. Heading
        in five columns, action in the last two, one baseline.
      */}
      <div className="u-gutter mx-auto mb-[clamp(2.5rem,6vh,4rem)] grid w-full max-w-[110rem] grid-cols-12 items-end gap-x-8 gap-y-6">
        <div className="col-span-12 lg:col-span-6">
          <Label as="p" rule>
            Selected works
          </Label>
          <h2 className={cn(DISPLAY_SM, 'text-ink mt-5 max-w-[16ch]')}>{title}</h2>
        </div>

        <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:justify-self-end">
          <Button href="/projects" variant="underline" withArrow>
            Toàn bộ dự án
          </Button>
        </div>
      </div>

      {rail ? (
        <HorizontalScroll
          aria-label={title}
          // The track ends flush with the viewport edge otherwise: the rail stops
          // when `scrollWidth` runs out, leaving the last card hard against the
          // right side with none of the gutter the first card opens with.
          endPadding={END_PADDING_PX}
          // `py-6` keeps the card shadow inside the scroll box, so an
          // `overflow-x-auto` strip never grows a stray vertical scrollbar.
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
