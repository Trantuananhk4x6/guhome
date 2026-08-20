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
 */

import { HorizontalScroll } from '@/components/animation'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useMotionFlag, useMotionStore } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { ProjectCard } from './ProjectCard'
import { ProjectGrid } from './ProjectGrid'

export interface RelatedProjectsProps {
  projects: readonly ProjectSummary[]
  heading?: string
  className?: string
}

/** One measure for every card, so the track advances in even steps. */
const CARD = 'w-[min(78vw,34rem)] shrink-0'
const CARD_SIZES = '(min-width: 1024px) 34rem, 78vw'

export function RelatedProjects({ projects, heading, className }: RelatedProjectsProps) {
  // Exactly the two conditions `useHorizontalScroll` builds the rail under:
  // `motionFlag(config, reduced, 'enabled')` at its line 52, and the
  // `(prefers-reduced-motion: no-preference)` half of `HORIZONTAL_QUERY`. Mirroring
  // both means the rail markup is only ever mounted when the hook will animate it.
  const motionOn = useMotionFlag('enabled')
  const systemReduced = useMotionStore((state) => state.reduced)
  const rail = motionOn && !systemReduced

  if (projects.length === 0) return null

  const title = heading ?? 'Những không gian khác'

  return (
    <section className={cn('w-full', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem]">
        <SectionHeading
          eyebrow="Selected works"
          title={title}
          size="sm"
          action={
            <Button href="/projects" variant="underline" withArrow>
              Toàn bộ dự án
            </Button>
          }
          className="mb-16"
        />
      </div>

      {rail ? (
        <HorizontalScroll
          aria-label={title}
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
