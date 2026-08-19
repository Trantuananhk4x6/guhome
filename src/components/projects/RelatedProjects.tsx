/**
 * The rail that closes a project page: three neighbouring works, same category
 * first. Rendered from server-resolved summaries — the grid itself is the client
 * piece, because the cards own the expansion transition.
 */

import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { ProjectGrid } from './ProjectGrid'

export interface RelatedProjectsProps {
  projects: readonly ProjectSummary[]
  heading?: string
  className?: string
}

export function RelatedProjects({ projects, heading, className }: RelatedProjectsProps) {
  if (projects.length === 0) return null

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <SectionHeading
        eyebrow="Selected works"
        title={heading ?? 'Những không gian khác'}
        size="sm"
        action={
          <Button href="/projects" variant="underline" withArrow>
            Toàn bộ dự án
          </Button>
        }
        className="mb-16"
      />
      <ProjectGrid projects={projects} columns={3} />
    </section>
  )
}
