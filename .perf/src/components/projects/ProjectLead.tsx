'use client'

/**
 * The lead plate of /projects — the first project, set inside the masthead band
 * rather than beneath it.
 *
 * This is the fix for the defect the audit named: the index used to open with a
 * heading, a paragraph, a filter bar and then 176px of nothing, so the first
 * photograph began at y=813 on a 1000px screen and the arrival screen carried
 * no work at all. The heading now occupies a four-column rail and this plate
 * fills the eight columns beside it, running off the right edge of the screen.
 * Two columns of real content across the full measure, and a photograph inside
 * the first viewport at every width.
 */

import Link from 'next/link'
import { useRef } from 'react'
import type { MouseEvent } from 'react'

import { useProjectTransition } from '@/animations/projects'
import { useReveal } from '@/animations/reveal'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { cn, formatArea, pad2 } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { BLEED_R, DISPLAY_SM, SCRIM_T } from './composition'
import { ProjectFigure } from './ProjectFigure'

export interface ProjectLeadProps {
  project: ProjectSummary
  /** Editorial number over the frame's top-left corner. */
  index?: number
  className?: string
}

interface Fact {
  label: string
  value: string
}

function facts(project: ProjectSummary): Fact[] {
  const out: Fact[] = []
  if (project.location) out.push({ label: 'Địa điểm', value: project.location })
  const area = formatArea(project.area)
  if (area) out.push({ label: 'Diện tích', value: area })
  if (project.year) out.push({ label: 'Năm', value: String(project.year) })
  if (out.length < 3 && project.categoryName) out.push({ label: 'Hạng mục', value: project.categoryName })
  return out
}

export function ProjectLead({ project, index = 1, className }: ProjectLeadProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const footRef = useRef<HTMLDivElement>(null)
  const { openProject } = useProjectTransition()
  const href = `/projects/${project.slug}`

  useReveal(footRef, { variant: 'revealUp', delay: 0.15, stagger: 0.07 })

  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const el = frameRef.current
    if (!el) return
    event.preventDefault()
    document
      .querySelectorAll<HTMLElement>('[data-hero-media]')
      .forEach((hero) => hero.style.removeProperty('view-transition-name'))
    openProject(el, href)
  }

  const items = facts(project)

  return (
    <article className={cn('flex flex-col', className)}>
      <Link
        href={href}
        onClick={handleClick}
        aria-label={`${project.title}${project.location ? ` — ${project.location}` : ''}`}
        data-cursor="project"
        // Only the photograph leaves the gutter. The dossier under it stays on
        // the measure, which is what makes the bleed read as chosen rather than
        // as an element that overflowed.
        className={cn('group block focus-visible:outline-offset-8', BLEED_R)}
      >
        <div ref={frameRef} className="relative">
          <ProjectFigure
            media={project.cover}
            alt={project.cover?.alt ?? `${project.title} — ${project.location ?? 'GuHomes'}`}
            sizes="(min-width: 1024px) 58vw, 100vw"
            width={1600}
            priority
            reveal="revealClip"
            shadow={false}
            // 5:4 on a phone, not 4:5 — a portrait plate here pushes the title
            // and the whole dossier out of the arrival screen, which is the
            // defect this composition exists to fix.
            frameClassName="aspect-[5/4] sm:aspect-[3/2] lg:aspect-[16/9]"
            imageClassName="ease-editorial transition-transform duration-[900ms] group-hover:scale-105 group-focus-visible:scale-105"
            overlay={
              <>
                <span
                  aria-hidden="true"
                  style={SCRIM_T}
                  className="pointer-events-none absolute inset-x-0 top-0 h-[30%]"
                />
                {/* One of the page's deliberate collisions: the ordinal sits on
                    the corner of the picture rather than in a column beside it. */}
                <span className="u-label text-canvas/75 pointer-events-none absolute top-6 left-6 flex items-center gap-3 lg:top-8 lg:left-8">
                  <span aria-hidden="true" className="bg-accent-soft h-px w-8 shrink-0" />
                  {pad2(index)}
                </span>
              </>
            }
          />
        </div>
      </Link>

      <div
        ref={footRef}
        data-reveal
        className="border-line mt-6 flex flex-col gap-6 border-t pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
      >
        <div data-reveal-item className="max-w-[26ch]">
          <h2 className={cn(DISPLAY_SM, 'text-ink')}>
            <Link href={href} onClick={handleClick} className="hover:text-accent transition-colors duration-500">
              {project.title}
            </Link>
          </h2>
          {project.subtitle ? (
            <p className="text-muted mt-2 text-sm leading-relaxed">{project.subtitle}</p>
          ) : null}
        </div>

        {items.length > 0 ? (
          <dl data-reveal-item className="flex flex-wrap gap-x-10 gap-y-4">
            {items.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5">
                <dt className="u-label">{fact.label}</dt>
                <dd className="text-ink font-display text-lg leading-none font-normal">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <Link
          data-reveal-item
          href={href}
          onClick={handleClick}
          className="u-label text-ink hover:text-accent ease-editorial group/lead inline-flex shrink-0 items-center gap-2 self-start border-b border-current/25 pb-2 transition-colors duration-500 lg:self-auto"
        >
          Xem dự án
          <ArrowUpRightIcon className="ease-editorial text-[1.15em] transition-transform duration-500 group-hover/lead:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
