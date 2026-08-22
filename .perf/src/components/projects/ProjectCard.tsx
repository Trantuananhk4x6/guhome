'use client'

/**
 * One project, one plate: a photograph with its caption set beneath it.
 *
 * The old `index` variant — an oversized image on one side and a metadata
 * column on the other, repeated down /projects 105 times — is gone. Identical
 * repetition is the thing the index was being criticised for, and the fix is
 * not a better row, it is several different treatments; those now live in
 * `ProjectIndex`'s bands, all of which draw this one plate at different scales.
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

import { DISPLAY, DISPLAY_SM } from './composition'
import { ProjectFigure } from './ProjectFigure'

/** Retained so `variant="grid"` at existing call sites keeps type-checking. */
export type ProjectCardVariant = 'grid'

/**
 * Two steps, because the shared scale has two steps that fit a card title: 44px
 * inside a band and 70px when the card *is* the band. There used to be a third,
 * `sm`, on a 34px step this file kept privately; the step is gone and no call
 * site ever asked for it. Two variants that resolve to one size are not two
 * variants.
 */
export type ProjectCardSize = 'md' | 'lg'

export interface ProjectCardProps {
  project: ProjectSummary
  /** 1-based editorial index — rendered as `01`. */
  index?: number
  variant?: ProjectCardVariant
  /** Type step of the title. `lg` is for a band's lead plate, `md` for a plate inside one. */
  size?: ProjectCardSize
  /** Prints the 35–60 word summary under the meta line. */
  showSummary?: boolean
  aspect?: string
  sizes?: string
  width?: number
  priority?: boolean
  className?: string
  captionClassName?: string
}

const TITLE: Record<ProjectCardSize, string> = {
  md: DISPLAY_SM,
  lg: DISPLAY,
}

function metaLine(project: ProjectSummary): string {
  const parts = [project.location, formatArea(project.area), project.year ? String(project.year) : null]
  return parts.filter((part): part is string => Boolean(part)).join(' · ')
}

export function ProjectCard({
  project,
  index,
  size = 'md',
  showSummary = false,
  aspect,
  sizes,
  width,
  priority = false,
  className,
  captionClassName,
}: ProjectCardProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const { openProject } = useProjectTransition()
  const href = `/projects/${project.slug}`

  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const el = frameRef.current
    if (!el) return
    event.preventDefault()
    // Clicked from inside a project page — the related rail — the hero of the
    // page we are leaving already carries `an-project-media` (ProjectHero marks
    // it `data-hero-media`), and `openProject` is about to put that same name on
    // this card. Two elements with one `view-transition-name` is an error the
    // spec resolves by skipping the transition, which costs exactly the morph
    // the rail exists to show. Release the outgoing one; it unmounts anyway.
    // (A page renders one hero. Clearing every match keeps the count at one even
    // if an editor ever stacks two HERO blocks.)
    document
      .querySelectorAll<HTMLElement>('[data-hero-media]')
      .forEach((hero) => hero.style.removeProperty('view-transition-name'))
    openProject(el, href)
  }

  const overlay = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-5 items-end justify-between gap-6 p-6 opacity-0 transition-[opacity,transform] duration-700 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:p-8"
    >
      <span className="u-label text-canvas/80">{project.categoryName ?? 'Dự án'}</span>
      <span className="u-label text-canvas flex items-center gap-2">
        Xem dự án
        <ArrowUpRightIcon className="text-[1.2em]" />
      </span>
    </span>
  )

  const scrim = (
    <span
      aria-hidden="true"
      className="bg-espresso/0 group-hover:bg-espresso/25 group-focus-visible:bg-espresso/25 pointer-events-none absolute inset-0 transition-colors duration-700 ease-editorial"
    />
  )

  const meta = metaLine(project)

  return (
    <article className={cn('flex flex-col', className)}>
      <Link
        href={href}
        onClick={handleClick}
        aria-label={`${project.title}${project.location ? ` — ${project.location}` : ''}`}
        // Read by `CustomCursor` — it resolves the *innermost* `[data-cursor]`
        // ancestor, so the figure inside must stay unmarked or it would win.
        data-cursor="project"
        className="group block focus-visible:outline-offset-8"
      >
        <div ref={frameRef} className="relative">
          <ProjectFigure
            media={project.cover}
            alt={project.cover?.alt ?? `${project.title} — ${project.location ?? 'GuHomes'}`}
            aspect={aspect ?? '4 / 5'}
            sizes={sizes ?? '(min-width: 768px) 45vw, 100vw'}
            width={width ?? 1200}
            priority={priority}
            reveal="revealClip"
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

      <div className={cn('mt-5 flex flex-col gap-2.5', captionClassName)}>
        {index !== undefined ? (
          <span className="u-label text-accent flex items-center gap-3">
            <span aria-hidden="true" className="bg-accent h-px w-8 shrink-0" />
            {pad2(index)}
          </span>
        ) : null}

        <h3 className={cn(TITLE[size], 'text-ink')}>
          <Link
            href={href}
            onClick={handleClick}
            className="hover:text-accent transition-colors duration-500"
          >
            {project.title}
          </Link>
        </h3>

        {project.subtitle ? (
          <p className="text-muted max-w-[42ch] text-sm leading-relaxed">{project.subtitle}</p>
        ) : null}

        {meta ? <p className="u-label">{meta}</p> : null}

        {showSummary && project.summary ? (
          <p className="text-muted mt-2 line-clamp-3 max-w-[46ch] text-sm leading-relaxed">
            {project.summary}
          </p>
        ) : null}
      </div>
    </article>
  )
}
