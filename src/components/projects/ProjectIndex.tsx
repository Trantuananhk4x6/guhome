'use client'

/**
 * The /projects index. An editorial run of alternating rows — oversized image on
 * one side, index number and metadata on the other — each revealing on its own
 * ScrollTrigger so a long list animates as the reader arrives at it, not all at
 * once when the container crosses the line.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { cn } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { ProjectCard } from './ProjectCard'

export interface ProjectIndexProps {
  projects: readonly ProjectSummary[]
  className?: string
}

function IndexRow({
  project,
  index,
  align,
  priority,
}: {
  project: ProjectSummary
  index: number
  align: 'left' | 'right'
  priority: boolean
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  useReveal(rowRef, { variant: 'revealUp', stagger: 0.08 })

  return (
    <div ref={rowRef} data-reveal className="border-line border-t pt-10 md:pt-16">
      <ProjectCard
        project={project}
        index={index}
        variant="index"
        align={align}
        priority={priority}
      />
    </div>
  )
}

export function ProjectIndex({ projects, className }: ProjectIndexProps) {
  if (projects.length === 0) return null

  return (
    <div className={cn('flex flex-col gap-24 md:gap-40', className)}>
      {projects.map((project, i) => (
        <IndexRow
          key={project.id}
          project={project}
          index={i + 1}
          align={i % 2 === 0 ? 'left' : 'right'}
          priority={i === 0}
        />
      ))}
    </div>
  )
}
