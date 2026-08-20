'use client'

/**
 * One project, one card. Two shapes:
 *   `grid`  — used by the related rail and any two-up listing
 *   `index` — the editorial row on /projects: oversized image, index number,
 *             title / location / year stacked beside it
 *
 * Hover: the image eases 1 → 1.05 while the overlay metadata lifts in
 * (opacity 0 → 1, y 20 → 0). A plain left-click hands the frame to
 * `useProjectTransition()` so the card expands to fullscreen before the route
 * actually changes; modified clicks fall through to the browser.
 */

import Link from 'next/link'
import { useRef } from 'react'
import type { MouseEvent } from 'react'

import { useProjectTransition } from '@/animations/projects'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { cn, formatArea, pad2 } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { ProjectFigure } from './ProjectFigure'

export type ProjectCardVariant = 'grid' | 'index'

export interface ProjectCardProps {
  project: ProjectSummary
  /** 1-based editorial index — rendered as `01`. */
  index?: number
  variant?: ProjectCardVariant
  /** `index` variant only: which side the image sits on. */
  align?: 'left' | 'right'
  aspect?: string
  sizes?: string
  width?: number
  priority?: boolean
  className?: string
}

function metaLine(project: ProjectSummary): string {
  const parts = [project.location, formatArea(project.area), project.year ? String(project.year) : null]
  return parts.filter((part): part is string => Boolean(part)).join(' · ')
}

export function ProjectCard({
  project,
  index,
  variant = 'grid',
  align = 'left',
  aspect,
  sizes,
  width,
  priority = false,
  className,
}: ProjectCardProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const { openProject } = useProjectTransition()
  const href = `/projects/${project.slug}`
  const isIndex = variant === 'index'

  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const el = frameRef.current
    if (!el) return
    event.preventDefault()
    openProject(el, href)
  }

  const overlay = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-5 items-end justify-between gap-6 p-6 opacity-0 transition-[opacity,transform] duration-700 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:p-8"
    >
      <span className="u-label text-canvas/80">{project.categoryName ?? 'Dự án'}</span>
      <span className="u-label flex items-center gap-2 text-canvas">
        Xem dự án
        <ArrowUpRightIcon className="text-[1.2em]" />
      </span>
    </span>
  )

  const scrim = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-700 ease-editorial group-hover:bg-espresso/25 group-focus-visible:bg-espresso/25"
    />
  )

  return (
    <article
      className={cn(isIndex && 'grid items-center gap-8 md:grid-cols-12 md:gap-12', className)}
    >
      <Link
        href={href}
        onClick={handleClick}
        aria-label={`${project.title}${project.location ? ` — ${project.location}` : ''}`}
        // Read by `CustomCursor` — it resolves the *innermost* `[data-cursor]`
        // ancestor, so the figure inside must stay unmarked or it would win.
        data-cursor="project"
        className={cn(
          'group block focus-visible:outline-offset-8',
          isIndex && 'md:col-span-8',
          isIndex && align === 'right' && 'md:order-2 md:col-start-5',
        )}
      >
        <div ref={frameRef} className="relative">
          <ProjectFigure
            media={project.cover}
            alt={project.cover?.alt ?? `${project.title} — ${project.location ?? 'AN ATELIER'}`}
            aspect={aspect ?? (isIndex ? '16 / 10' : '4 / 5')}
            sizes={sizes ?? (isIndex ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 45vw, 100vw')}
            width={width ?? (isIndex ? 1600 : 1200)}
            priority={priority}
            reveal="revealClip"
            parallax={isIndex}
            parallaxStrength={0.3}
            imageClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-105 group-focus-visible:scale-105"
            overlay={
              <>
                {scrim}
                {overlay}
              </>
            }
          />
        </div>
      </Link>

      <div
        className={cn(
          'flex flex-col gap-4',
          isIndex && 'md:col-span-4',
          isIndex && align === 'right' && 'md:order-1 md:col-start-1 md:row-start-1',
        )}
      >
        {index !== undefined ? (
          <span className="u-label flex items-center gap-3 text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Index {pad2(index)}
          </span>
        ) : null}

        <h3 className={cn(isIndex ? 'u-display-sm' : 'font-display text-3xl leading-[1.05] font-light md:text-4xl')}>
          <Link href={href} onClick={handleClick} className="transition-colors duration-500 hover:text-accent">
            {project.title}
          </Link>
        </h3>

        {project.subtitle ? <p className="text-muted text-sm leading-relaxed">{project.subtitle}</p> : null}

        <p className="u-label">{metaLine(project)}</p>

        {isIndex && project.summary ? (
          <p className="text-muted max-w-[38ch] text-sm leading-relaxed">{project.summary}</p>
        ) : null}
      </div>
    </article>
  )
}
