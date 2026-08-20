'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { useParallax } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { Label } from '@/components/ui/Label'
import { ArrowRightIcon } from '@/components/ui/icons'
import { cn, formatArea, pad2 } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { SectionImage } from './SectionImage'
import {
  BAND_T,
  BLEED_R_LG,
  BLEED_X,
  DISPLAY,
  DISPLAY_SM,
  FRAME_SHADOW,
  SCRIM_B,
  SCRIM_T,
  SECTION_Y,
} from './composition'
import { sectionLines, sectionText } from './content'
import type { HomeSectionProps } from './types'

/** `Địa điểm · Diện tích · Năm` — one line, for the bands that only get one. */
function metaLine(project: ProjectSummary): string {
  return [project.location, formatArea(project.area), project.year ? String(project.year) : null]
    .filter((value): value is string => Boolean(value))
    .join(' · ')
}

function MetaCell({ term, value }: { term: string; value: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="u-label">{term}</dt>
      <dd className="font-body text-[0.9375rem] leading-snug text-ink">{value}</dd>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* BAND A — the section heading, project 01's dossier under it, and project     */
/* 01's photograph running off the right edge of the screen beside both. The    */
/* heading never gets a band of its own, and the left column runs as tall as    */
/* the picture, so the 45% of dead canvas that used to sit here is now content. */
/* -------------------------------------------------------------------------- */
function LeadBand({
  project,
  eyebrow,
  headingLines,
  lead,
}: {
  project: ProjectSummary
  eyebrow: string
  headingLines: string[]
  lead: string
}) {
  const headRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLDivElement>(null)

  useReveal(headRef, { variant: 'revealUp' })
  useReveal(metaRef, { variant: 'revealUp', stagger: 0.08 })
  // Clip the frame, drift the overscanned layer inside it — never both on one
  // element, or the two transforms fight.
  useReveal(figureRef, { variant: 'revealClip' })
  useParallax(figureRef, { strength: 0.45 })

  const href = `/projects/${project.slug}`

  return (
    // Three cells, not two: the photograph spans both rows of the left column and
    // is sized `lg:h-full` rather than by aspect ratio, so the picture and the
    // copy always end on the same line — there is no ratio at which a hole can
    // open between them. It also puts the photograph before the dossier once the
    // band stacks, instead of after 800px of type.
    <div className="group/lead grid grid-cols-12 gap-x-8 gap-y-10">
      <div ref={headRef} data-reveal className="col-span-12 lg:col-span-6 lg:row-start-1">
        <Label rule>{eyebrow}</Label>
        <h2 className={cn(DISPLAY, 'mt-8 max-w-[16ch] text-ink')}>
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        {lead.length > 0 ? <p className="u-body-lg mt-7 max-w-[46ch]">{lead}</p> : null}
      </div>

      {/* Same destination as the dossier below, so it is hidden from assistive
          tech and the tab order rather than duplicated into both. */}
      <Link
        href={href}
        aria-hidden="true"
        tabIndex={-1}
        className={cn(
          'col-span-12 block lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1',
          BLEED_R_LG,
        )}
      >
        <div
          ref={figureRef}
          data-reveal
          className={cn(
            'relative isolate aspect-[4/5] w-full overflow-hidden bg-surface-alt lg:aspect-auto lg:h-full lg:min-h-[34rem]',
            FRAME_SHADOW,
          )}
        >
          <div data-reveal-media className="absolute inset-x-0 top-[-8%] bottom-[-8%]">
            <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover/lead:scale-[1.05]">
              <SectionImage
                media={project.cover}
                alt={project.title}
                sizes="(min-width: 1024px) 42vw, 100vw"
                width={1600}
              />
            </div>
          </div>
          <div className="absolute inset-x-0 top-0 h-[30%]" style={SCRIM_T} />
          <span className="u-label absolute top-6 left-6 text-canvas/75">{pad2(1)}</span>
        </div>
      </Link>

      <Link
        href={href}
        className="col-span-12 block border-t border-line pt-8 outline-offset-8 lg:col-span-6 lg:row-start-2"
        aria-label={`Xem dự án ${project.title}`}
      >
          <div ref={metaRef} data-reveal>
            <Label data-reveal-item index={1}>
              {project.categoryName ?? 'Dự án'}
            </Label>

            <h3 data-reveal-item className={cn(DISPLAY_SM, 'mt-6 text-ink')}>
              {project.title}
            </h3>
            {project.subtitle ? (
              <p data-reveal-item className="u-label mt-3">
                {project.subtitle}
              </p>
            ) : null}
            {project.summary ? (
              <p data-reveal-item className="u-body-lg mt-6 line-clamp-3 max-w-[42ch]">
                {project.summary}
              </p>
            ) : null}

            {/* Four across, not 2x2: the column is 720px wide and a 2x2 leaves
                half of it empty — the hole the audit named, in miniature. */}
            <dl
              data-reveal-item
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-4"
            >
              <MetaCell term="Địa điểm" value={project.location} />
              <MetaCell term="Diện tích" value={formatArea(project.area)} />
              <MetaCell term="Năm" value={project.year ? String(project.year) : null} />
              <MetaCell term="Phong cách" value={project.style} />
            </dl>

            <span
              data-reveal-item
              className="u-label mt-8 inline-flex items-center gap-3 text-ink transition-transform duration-700 ease-editorial group-hover/lead:-translate-y-1"
            >
              Xem dự án
              <ArrowRightIcon className="text-base transition-transform duration-500 ease-editorial group-hover/lead:translate-x-1.5" />
            </span>
          </div>
      </Link>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* BAND B — projects 02 and 03 as an asymmetric pair. The offset is the         */
/* composition: they must never share a top edge or a bottom one.               */
/* -------------------------------------------------------------------------- */
function PairProject({
  project,
  index,
  variant,
}: {
  project: ProjectSummary
  index: number
  variant: 'wide' | 'tall'
}) {
  const figureRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useReveal(figureRef, { variant: 'revealClip' })
  useParallax(figureRef, { strength: 0.45 })
  useReveal(metaRef, { variant: 'revealUp', stagger: 0.08 })

  const wide = variant === 'wide'

  return (
    <article
      className={cn(
        'col-span-12',
        wide ? 'lg:col-span-7' : 'lg:col-span-4 lg:col-start-9 lg:mt-20',
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block outline-offset-8"
        aria-label={`Xem dự án ${project.title}`}
      >
        <div
          ref={figureRef}
          data-reveal
          className={cn(
            'relative isolate w-full overflow-hidden bg-surface-alt',
            FRAME_SHADOW,
            wide ? 'aspect-[3/2]' : 'aspect-[4/5]',
          )}
        >
          <div data-reveal-media className="absolute inset-x-0 top-[-8%] bottom-[-8%]">
            <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
              <SectionImage
                media={project.cover}
                alt={project.title}
                sizes={wide ? '(min-width: 1024px) 53vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
                width={1600}
              />
            </div>
          </div>
        </div>

        <div ref={metaRef} data-reveal className="mt-7">
          <Label data-reveal-item index={index}>
            {project.categoryName ?? 'Dự án'}
          </Label>
          <h3 data-reveal-item className={cn(DISPLAY_SM, 'mt-4 text-ink')}>
            {project.title}
          </h3>
          {project.subtitle ? (
            <p data-reveal-item className="u-body-lg mt-3 line-clamp-2 max-w-[44ch]">
              {project.subtitle}
            </p>
          ) : null}
          <p data-reveal-item className="u-label mt-5">
            {metaLine(project)}
          </p>
        </div>
      </Link>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* BAND C — project 04, the full 100vw, with its caption plate sitting on the   */
/* picture's bottom-left. At 390 the plate would eat the photograph, so it      */
/* drops below the frame onto canvas instead.                                   */
/* -------------------------------------------------------------------------- */
function BleedProject({ project, index }: { project: ProjectSummary; index: number }) {
  const figureRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLElement>(null)

  useReveal(figureRef, { variant: 'revealClip' })
  useParallax(figureRef, { strength: 0.45 })
  useReveal(captionRef, { variant: 'revealUp', stagger: 0.08 })

  return (
    <article className={BLEED_X}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block outline-offset-8"
        aria-label={`Xem dự án ${project.title}`}
      >
        <figure className="relative isolate">
          <div
            ref={figureRef}
            data-reveal
            className="relative isolate aspect-[3/2] w-full overflow-hidden bg-surface-alt lg:aspect-[21/8]"
          >
            <div data-reveal-media className="absolute inset-x-0 top-[-8%] bottom-[-8%]">
              <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
                <SectionImage media={project.cover} alt={project.title} sizes="100vw" width={2400} />
              </div>
            </div>
            {/* A caption plate over a bright interior needs the same three-step
                framing the hero uses, or canvas type on white walls falls under
                the contrast floor. */}
            <div aria-hidden="true" className="absolute inset-0 hidden bg-espresso/25 lg:block" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 hidden h-[50%] lg:block"
              style={SCRIM_B}
            />
          </div>

          <figcaption
            ref={captionRef}
            data-reveal
            className="u-gutter mt-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:p-[var(--spacing-gutter)]"
          >
            <Label data-reveal-item index={index} className="lg:text-canvas/70">
              {project.categoryName ?? 'Dự án'}
            </Label>
            <h3 data-reveal-item className={cn(DISPLAY_SM, 'mt-4 text-ink lg:text-canvas')}>
              {project.title}
            </h3>
            <p data-reveal-item className="u-label mt-3 lg:text-canvas/70">
              {metaLine(project)}
            </p>
          </figcaption>
        </figure>
      </Link>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* BAND D — project 05 as a single typographic line, then the section exit.     */
/* Five projects shrinking to one hairline row is the section winding down.     */
/* -------------------------------------------------------------------------- */
function IndexProject({ project, index }: { project: ProjectSummary; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid grid-cols-12 items-baseline gap-x-8 gap-y-3 border-t border-line py-8 outline-offset-4"
      aria-label={`Xem dự án ${project.title}`}
    >
      <span className="u-label col-span-2 text-accent transition-transform duration-700 ease-editorial group-hover:-translate-y-1.5 lg:col-span-1">
        {pad2(index)}
      </span>
      <h3
        className={cn(
          DISPLAY_SM,
          'col-span-10 text-ink transition-transform duration-700 ease-editorial group-hover:translate-x-2 lg:col-span-4 lg:col-start-2',
        )}
      >
        {project.title}
      </h3>
      {project.subtitle ? (
        <p className="u-body-lg col-span-12 truncate lg:col-span-3 lg:col-start-6">{project.subtitle}</p>
      ) : null}
      <p className="u-label col-span-10 lg:col-span-3 lg:col-start-9">{metaLine(project)}</p>
      <ArrowRightIcon className="col-span-2 justify-self-end text-lg text-muted transition-all duration-700 ease-editorial group-hover:translate-x-1.5 group-hover:text-accent lg:col-span-1 lg:col-start-12" />
    </Link>
  )
}

/**
 * Breadth: five projects, five different treatments, so scale itself carries the
 * editing. One large, two paired, one full-bleed, one typographic line — after
 * band two the reader still does not know what the next band will look like,
 * which is the opposite of the five identical rows this used to be.
 */
export function FeaturedProjects({ section, data }: HomeSectionProps) {
  const exitRef = useRef<HTMLDivElement>(null)
  useReveal(exitRef, { variant: 'revealUp' })

  const projects = data.featured
  const lead0 = projects[0]
  if (!lead0) return null

  const pair = [projects[1], projects[2]].filter((p): p is ProjectSummary => Boolean(p))
  const bleed = projects[3] ?? null
  const indexed = projects[4] ?? null

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Selected Works')
  const headingLines = sectionLines(content, 'heading', 'Những công trình\nchúng tôi chăm chút.')
  const lead = sectionText(content, 'body', '')

  const allLabel = data.projectCount > 0 ? `Tất cả ${data.projectCount} dự án` : 'Tất cả dự án'

  return (
    <section
      data-home-section="FEATURED_PROJECTS"
      className={cn('u-gutter overflow-hidden bg-canvas', SECTION_Y)}
    >
      <LeadBand project={lead0} eyebrow={eyebrow} headingLines={headingLines} lead={lead} />

      {pair.length > 0 ? (
        <div className={cn('grid grid-cols-12 items-start gap-x-8 gap-y-14', BAND_T)}>
          {pair.map((project, offset) => (
            <PairProject
              key={project.id}
              project={project}
              index={offset + 2}
              variant={offset === 0 ? 'wide' : 'tall'}
            />
          ))}
        </div>
      ) : null}

      {bleed ? (
        <div className={BAND_T}>
          <BleedProject project={bleed} index={4} />
        </div>
      ) : null}

      <div ref={exitRef} data-reveal className={cn('border-b border-line', BAND_T)}>
        {indexed ? <IndexProject project={indexed} index={5} /> : null}
        <Link
          href="/projects"
          className="group flex items-baseline justify-between gap-8 border-t border-line py-8 outline-offset-4"
        >
          <span className={cn(DISPLAY_SM, 'text-ink transition-transform duration-700 ease-editorial group-hover:translate-x-2')}>
            {allLabel}
          </span>
          <ArrowRightIcon className="shrink-0 text-lg text-muted transition-all duration-700 ease-editorial group-hover:translate-x-1.5 group-hover:text-accent" />
        </Link>
      </div>
    </section>
  )
}
