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

/**
 * Seconds between the beats of a band: the photograph, then the name, then the
 * account of it. Every other section on the page already arrives in that order
 * because its parts sit at different heights and each `useReveal` triggers on
 * its own top edge — but a band whose picture and heading share a grid row
 * shares a trigger line too, and fires them together. This is the delay that
 * puts the order back where geometry cannot.
 */
const BEAT = 0.14

/**
 * KEEP THE BAND'S OWN NUMBERS TRUE.
 *
 * The seeded eyebrow reads `Từ 76 đến 320 m²` — a measurement of the five
 * projects standing underneath it, typed once by an editor and then keyed to
 * nothing. The moment the band's membership changes it is a false statistic on
 * the front page: 76 m² is Trầm Tích Xám, and when that project moved to the
 * pinned band the range under this heading became 82–320 while the heading went
 * on saying 76.
 *
 * So the two numbers are recomputed from the projects actually drawn, and only
 * the numbers — the editor's wording, separator and unit are left exactly as
 * typed, and a label that is not a range (`Selected Works`) is passed through
 * untouched. Same contract as the STUDIO band, which overwrites its project
 * count from `data.projectCount` so the ledger cannot contradict the catalogue.
 */
const AREA_RANGE = /(\d+)(\s*(?:đến|–|—|-|to)\s*)(\d+)/

/** Leading integer of `118 m²`. `null` when the row has no usable figure. */
function areaValue(area: string | null): number | null {
  if (!area) return null
  const match = /\d+/.exec(area)
  if (!match) return null
  const value = Number.parseInt(match[0], 10)
  return Number.isFinite(value) ? value : null
}

function liveAreaRange(label: string, projects: readonly ProjectSummary[]): string {
  if (!AREA_RANGE.test(label)) return label
  const areas = projects
    .map((project) => areaValue(project.area))
    .filter((value): value is number => value !== null)
  // One figure cannot describe a range, and none cannot describe anything —
  // leave the editor's line alone rather than printing `0 đến 0`.
  if (areas.length < 2) return label
  const low = Math.min(...areas)
  const high = Math.max(...areas)
  if (low === high) return label
  return label.replace(AREA_RANGE, (_match, _from: string, join: string) => `${low}${join}${high}`)
}

/** `Địa điểm · Diện tích · Năm` — one line, for the bands that only get one. */
function metaLine(project: ProjectSummary): string {
  return [project.location, formatArea(project.area), project.year ? String(project.year) : null]
    .filter((value): value is string => Boolean(value))
    .join(' · ')
}

/**
 * `sm:contents` is what puts the four values on one baseline. Each pair is its
 * own flex column on a phone, but from `sm` up the wrapper dissolves and the dl
 * itself becomes a two-row grid flowing down each column, so every `dt` lands in
 * row one and every `dd` in row two.
 *
 * The alternative — four independent flex columns — misaligns the moment one
 * label wraps and the others do not, which is exactly what happened at 1024:
 * `PHONG CÁCH` took two lines while ĐỊA ĐIỂM, DIỆN TÍCH and NĂM took one, so
 * `Japandi` sat a line below `240 m²` and `2024` and the row lost its baseline.
 * A `min-height` would have fixed that instance and only that instance; a shared
 * row fixes every label, at every width, in every language.
 *
 * `self-end` on the label and `self-start` on the value keep a single-line label
 * hugging the value it introduces instead of floating at the top of a row some
 * other cell made two lines tall.
 */
function MetaCell({ term, value }: { term: string; value: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1.5 sm:contents">
      <dt className="u-label sm:self-end">{term}</dt>
      <dd className="font-body text-[0.9375rem] leading-snug text-ink sm:self-start">{value}</dd>
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

  // The photograph is beat one and it enters from the edge it occupies: columns
  // 8–12, bleeding off the right of the screen. The frame carries the entrance,
  // the overscanned layer inside it carries the drift — never both on one
  // element, or the two transforms fight.
  useReveal(figureRef, { variant: 'revealRight' })
  useParallax(figureRef, { strength: 0.45 })
  // …then the name, then the sentence under it. The head shares row 1 with the
  // picture, so without `delay` all three landed on the same frame.
  useReveal(headRef, { variant: 'revealUp', delay: BEAT, stagger: BEAT })
  useReveal(metaRef, { variant: 'revealUp', stagger: 0.08 })

  const href = `/projects/${project.slug}`

  return (
    // Three cells, not two: the photograph spans both rows of the left column and
    // is sized `lg:h-full` rather than by aspect ratio, so the picture and the
    // copy always end on the same line — there is no ratio at which a hole can
    // open between them. It also puts the photograph before the dossier once the
    // band stacks, instead of after 800px of type.
    <div className="group/lead grid grid-cols-12 gap-x-8 gap-y-10">
      {/* `data-reveal-item` on each child, so `useReveal` staggers the three
          rather than lifting the block as one slab. */}
      <div ref={headRef} data-reveal className="col-span-12 lg:col-span-6 lg:row-start-1">
        <Label data-reveal-item rule>
          {eyebrow}
        </Label>
        <h2 data-reveal-item className={cn(DISPLAY, 'mt-8 max-w-[16ch] text-ink')}>
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        {lead.length > 0 ? (
          <p data-reveal-item className="u-body-lg mt-7 max-w-[46ch]">
            {lead}
          </p>
        ) : null}
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
            {/* Two clamped lines, not three: under a title, a subtitle and above
                a four-cell `dl`, the third line is one register too many and it
                is the 32px that pushes this column past the photograph beside it. */}
            {project.summary ? (
              <p data-reveal-item className="u-body-lg mt-6 line-clamp-2 max-w-[42ch]">
                {project.summary}
              </p>
            ) : null}

            {/* Four across, not 2x2: the column is 720px wide and a 2x2 leaves
                half of it empty — the hole the audit named, in miniature. */}
            <dl
              data-reveal-item
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-flow-col sm:grid-cols-4 sm:grid-rows-[auto_auto] sm:gap-y-1.5"
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

  const wide = variant === 'wide'

  // The pair is the one place on the page where the composition alternates —
  // the wide plate holds columns 1–7, the tall one 9–12 — so each enters from
  // the side it occupies instead of both wiping upward in unison.
  useReveal(figureRef, { variant: wide ? 'revealLeft' : 'revealRight' })
  useParallax(figureRef, { strength: 0.45 })
  useReveal(metaRef, { variant: 'revealUp', delay: BEAT, stagger: 0.08 })

  return (
    // The offset IS the composition, but 80px of it made the row 892px tall to
    // hold a 789px item and left ~100px of unfilled canvas under the wide one's
    // meta block. 40px still breaks the shared top edge. `lg:` prefixed, so a
    // phone never inherits a skew that only reads in a side-by-side pair.
    <article
      className={cn(
        'col-span-12',
        wide ? 'lg:col-span-7' : 'lg:col-span-4 lg:col-start-9 lg:mt-10',
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
  const eyebrow = liveAreaRange(sectionText(content, 'label', 'Selected Works'), projects)
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

      {/* One rule pair, two rows of different weight. Project 05 keeps the full
          12-column index row; the affordance below it is a 56px label row, not a
          second 44px display row — the section was repeating its own last
          gesture at the exit, which is exactly the tell this rebuild deletes. */}
      <div ref={exitRef} data-reveal className={cn('border-b border-line', BAND_T)}>
        {indexed ? <IndexProject project={indexed} index={5} /> : null}
        <Link
          href="/projects"
          className="group flex items-center justify-end gap-4 border-t border-line py-5 outline-offset-4"
        >
          <span className="u-label text-ink transition-transform duration-700 ease-editorial group-hover:-translate-x-1 group-focus-visible:-translate-x-1">
            {allLabel}
          </span>
          <ArrowRightIcon className="shrink-0 text-base text-muted transition-all duration-700 ease-editorial group-hover:translate-x-1.5 group-hover:text-accent group-focus-visible:translate-x-1.5 group-focus-visible:text-accent" />
        </Link>
      </div>
    </section>
  )
}
