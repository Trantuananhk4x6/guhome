'use client'

/**
 * A plain listing of project cards on the implied 12-column grid, revealed with
 * a stagger. Used by the related rail and anywhere a compact set of projects is
 * needed; `/projects` itself uses `ProjectIndex` for the editorial rows.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { cn } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { ProjectCard } from './ProjectCard'

export interface ProjectGridProps {
  projects: readonly ProjectSummary[]
  columns?: 2 | 3
  /** Offsets every second card downwards for the studio's asymmetric rhythm. */
  stagger?: boolean
  startIndex?: number
  showIndex?: boolean
  className?: string
}

const COLUMNS: Record<2 | 3, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
}

export function ProjectGrid({
  projects,
  columns = 3,
  stagger = false,
  startIndex = 1,
  showIndex = false,
  className,
}: ProjectGridProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  useReveal(rootRef, { variant: 'revealUp', stagger: 0.09 })

  if (projects.length === 0) return null

  return (
    <div
      ref={rootRef}
      data-reveal
      className={cn('grid grid-cols-1 gap-x-8 gap-y-16 md:gap-x-12', COLUMNS[columns], className)}
    >
      {projects.map((project, i) => (
        <div
          key={project.id}
          data-reveal
          data-reveal-item
          className={cn(stagger && i % 2 === 1 && 'lg:mt-24')}
        >
          <ProjectCard
            project={project}
            index={showIndex ? startIndex + i : undefined}
            sizes={
              columns === 3
                ? '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'
                : '(min-width: 640px) 45vw, 100vw'
            }
            width={columns === 3 ? 1200 : 1600}
          />
        </div>
      ))}
    </div>
  )
}
