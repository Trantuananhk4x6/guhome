'use client'

/**
 * The body of /projects.
 *
 * It used to be one row shape repeated 105 times — oversized image left,
 * metadata right, 822px of pitch, forever. Identical repetition is precisely
 * what reads as machine-made, and it also made the index 88 viewports long
 * while leaving half of every band empty.
 *
 * The run is now phrased. Four treatments, chosen band by band from the
 * projects themselves, so the rhythm is data-driven and never names one:
 *
 *   PAIR   two projects, asymmetric — a 7-column landscape against a
 *          4-column portrait dropped 96px so they share no edge.   (medium)
 *   BLEED  one project at 100vw, 21:8, caption set into the picture. (sparse)
 *   LIST   three to six projects as index rows — ordinal, name, one line of
 *          subtitle, location · area · year, a 93px thumbnail, arrow. (dense)
 *   SOLO   one project, centred, 16:10, caption beneath.        (the exhale)
 *
 * No two adjacent bands share a density, a grid or an image proportion, and the
 * loudest beat (610px for one project) is roughly five times the quietest
 * (~126px per project in a list row).
 *
 * THE PHRASING IS NOT A SCORE ANY MORE. It used to be eight beats written out
 * and cycled — `pair bleed list solo pair list bleed list` — and although the
 * *sizes* staggered (19 projects a cycle against 8 bands), the sequence of
 * treatments is the score, and a loop of eight repeats five and a half times
 * across 104 projects. It is chosen band by band now, out of whatever is still
 * legal after the previous band, resolved by a number read off the projects
 * standing at the cursor. `indexScore.ts` holds it, alone and pure, so the
 * sequence it produces for the real catalogue can be printed and measured
 * without a browser. On today's 104 it draws 45 bands with no two neighbours
 * sharing a treatment, no two quiet bands adjacent, and no period at all.
 *
 * THE GAP IS PART OF THE SCORE. Every band used to be 70px from its neighbour.
 * The full-bleed plate is the only treatment that leaves the gutter, so its two
 * edges take the section step (110px at a 1000px viewport) and every other join
 * keeps the band step — half the joins each way, which is what makes either of
 * them legible as a choice.
 */

import Link from 'next/link'
import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { cn, formatArea, pad2 } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { BAND, BAND_GAP, DISPLAY_SM, SCRIM_B, SECTION_GAP } from './composition'
import { phraseIndex, type Band } from './indexScore'
import { ProjectCard } from './ProjectCard'
import { ProjectFigure } from './ProjectFigure'

export interface ProjectIndexProps {
  projects: readonly ProjectSummary[]
  /** Editorial number printed against `projects[0]`. The lead plate is 01. */
  startIndex?: number
  className?: string
}

/**
 * The step between two bands, decided by the pair rather than by a constant.
 *
 * Three of the four treatments sit inside the gutter and read as plates on one
 * measure; the full bleed is the only one that leaves it. A 70px gap between a
 * band that stops at the gutter and a photograph that runs to the glass reads
 * as a collision, so that one join — and only that one — takes the section
 * step. Applying it to the quiet band as well was the first thing I tried and
 * it put three quarters of the index's joins on the larger step, at which point
 * the larger step is the default and the smaller one is the exception, which is
 * the opposite of a rhythm.
 */
function gapBetween(previous: Band, band: Band): string {
  return previous.kind === 'bleed' || band.kind === 'bleed' ? SECTION_GAP : BAND_GAP
}

function metaLine(project: ProjectSummary): string {
  return [project.location, formatArea(project.area), project.year ? String(project.year) : null]
    .filter((part): part is string => Boolean(part))
    .join(' · ')
}

function coverAlt(project: ProjectSummary): string {
  return project.cover?.alt ?? `${project.title} — ${project.location ?? 'AN ATELIER'}`
}

/* ---------------------------------- pair ---------------------------------- */

/**
 * The 96px drop on the portrait is the whole composition: two plates that share
 * a top edge read as a template, two that share neither edge read as a spread.
 */
function PairBand({ items, from }: { items: ProjectSummary[]; from: number }) {
  const wide = items[0]
  const tall = items[1]
  if (!wide) return null

  return (
    <div className={cn(BAND, 'grid grid-cols-12 gap-x-8 gap-y-14')}>
      <div data-reveal-item className="col-span-12 lg:col-span-7">
        <ProjectCard
          project={wide}
          index={from}
          size="md"
          aspect="3 / 2"
          sizes="(min-width: 1024px) 57vw, 100vw"
          width={1600}
        />
      </div>

      {tall ? (
        <div data-reveal-item className="col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-24">
          <ProjectCard
            project={tall}
            index={from + 1}
            size="md"
            aspect="4 / 5"
            sizes="(min-width: 1024px) 30vw, 100vw"
            width={1200}
          />
        </div>
      ) : null}
    </div>
  )
}

/* --------------------------------- bleed ---------------------------------- */

/**
 * The only band that runs edge to edge. Its caption sits *on* the photograph at
 * `md` and up — one of the page's deliberate collisions — and drops below it on
 * a phone, where a scrim plate over a 350px-wide picture would eat the picture.
 */
function BleedBand({ items, from }: { items: ProjectSummary[]; from: number }) {
  const project = items[0]
  if (!project) return null
  const meta = metaLine(project)

  return (
    // The index runs full-bleed already, so this band simply declines the
    // gutter every other band takes rather than escaping one with a negative
    // margin — which is what put 40px of horizontal overflow on a phone.
    <div className="w-full">
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="project"
        aria-label={`${project.title}${project.location ? ` — ${project.location}` : ''}`}
        className="group block focus-visible:outline-offset-4"
      >
        <ProjectFigure
          media={project.cover}
          alt={coverAlt(project)}
          sizes="100vw"
          width={2400}
          reveal="revealClip"
          parallax
          parallaxStrength={0.25}
          shadow={false}
          frameClassName="aspect-[3/2] md:aspect-[21/8]"
          imageClassName="transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.03]"
          overlay={
            <>
              {/* Doubled, not deepened: interiors are photographed bright, and a
                  single pass of the shared recipe left canvas type sitting on a
                  sunlit bamboo wall. Two passes reach ~86% espresso at the very
                  bottom edge and still fade out by mid-frame. */}
              <span
                aria-hidden="true"
                style={SCRIM_B}
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[52%] md:block"
              />
              <span
                aria-hidden="true"
                style={SCRIM_B}
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[52%] md:block"
              />
              <div className="u-gutter pointer-events-none absolute inset-x-0 bottom-0 hidden pb-10 md:block lg:pb-14">
                <span className="u-label text-accent-soft flex items-center gap-3">
                  <span aria-hidden="true" className="bg-accent-soft h-px w-8 shrink-0" />
                  {pad2(from)}
                </span>
                <p className={cn(DISPLAY_SM, 'text-canvas mt-3 max-w-[18ch]')}>{project.title}</p>
                {/* The subtitle usually names the district too, so printing both
                    reads as a stutter — the record line alone is the caption. */}
                <p className="u-label text-canvas/75 mt-3">{meta || project.subtitle}</p>
              </div>
            </>
          }
        />

        <div className="u-gutter mt-5 flex flex-col gap-2.5 md:hidden">
          <span className="u-label text-accent">{pad2(from)}</span>
          <p className={cn(DISPLAY_SM, 'text-ink')}>{project.title}</p>
          {project.subtitle ? (
            <p className="text-muted text-sm leading-relaxed">{project.subtitle}</p>
          ) : null}
          {meta ? <p className="u-label">{meta}</p> : null}
        </div>
      </Link>
    </div>
  )
}

/* ---------------------------------- list ---------------------------------- */

/**
 * Four registers of information in one horizontal band — ordinal, name,
 * opinion, place — plus the photograph, small enough that the row stays a row.
 * This is the /studio process-row register, which is the densest, best-composed
 * thing on the site and the one the whole index was missing.
 */
function IndexRow({ project, index }: { project: ProjectSummary; index: number }) {
  const meta = metaLine(project)

  return (
    <li data-reveal-item className="border-line border-t last:border-b">
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="project"
        aria-label={`${project.title}${project.location ? ` — ${project.location}` : ''}`}
        className="group grid grid-cols-12 items-center gap-x-4 gap-y-1 py-5 focus-visible:outline-offset-4 md:gap-x-8 md:py-7"
      >
        <span className="u-label text-accent col-span-9 md:ease-editorial md:col-span-1 md:transition-transform md:duration-700 md:group-hover:-translate-y-1.5">
          {pad2(index)}
        </span>

        <h3
          className={cn(
            DISPLAY_SM,
            'text-ink group-hover:text-accent col-span-9 transition-colors duration-500 md:col-span-4',
          )}
        >
          {project.title}
        </h3>

        <p className="text-muted col-span-9 truncate text-sm leading-relaxed md:col-span-3">
          {project.subtitle ?? project.categoryName ?? ''}
        </p>

        <p className="u-label col-span-9 md:col-span-2">{meta}</p>

        <div className="col-span-3 col-start-10 row-span-4 row-start-1 self-center md:col-span-1 md:col-start-11 md:row-auto">
          <ProjectFigure
            media={project.cover}
            alt=""
            aspect="4 / 3"
            sizes="(min-width: 768px) 8vw, 22vw"
            width={400}
            reveal="revealClip"
            // The house image shadow is tuned for a 600px plate; under a 93px
            // thumbnail it is a 60px blur pooling below the row rule.
            shadow={false}
            imageClassName="ease-editorial transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </div>

        <span className="text-muted group-hover:text-accent ease-editorial col-span-1 col-start-12 hidden justify-self-end transition-[color,transform] duration-700 group-hover:translate-x-1.5 md:block">
          <ArrowUpRightIcon className="text-[1.15rem]" />
        </span>
      </Link>
    </li>
  )
}

function ListBand({ items, from }: { items: ProjectSummary[]; from: number }) {
  if (items.length === 0) return null
  return (
    <div className={BAND}>
      <ul>
        {items.map((project, i) => (
          <IndexRow key={project.id} project={project} index={from + i} />
        ))}
      </ul>
    </div>
  )
}

/* ---------------------------------- solo ---------------------------------- */

/** The exhale: the only centred plate on the page, and the only 16:10 frame. */
function SoloBand({ items, from }: { items: ProjectSummary[]; from: number }) {
  const project = items[0]
  if (!project) return null

  return (
    <div className={cn(BAND, 'grid grid-cols-12')}>
      <div className="col-span-12 lg:col-span-6 lg:col-start-4">
        <ProjectCard
          project={project}
          index={from}
          size="md"
          showSummary
          aspect="16 / 10"
          sizes="(min-width: 1024px) 46vw, 100vw"
          width={1600}
          captionClassName="lg:items-center lg:text-center"
        />
      </div>
    </div>
  )
}

/* --------------------------------- runner --------------------------------- */

function BandFrame({ band }: { band: Band }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { variant: 'revealUp', stagger: 0.08 })

  return (
    <div ref={ref} data-reveal data-band={band.kind}>
      {band.kind === 'pair' ? <PairBand items={band.items} from={band.from} /> : null}
      {band.kind === 'bleed' ? <BleedBand items={band.items} from={band.from} /> : null}
      {band.kind === 'list' ? <ListBand items={band.items} from={band.from} /> : null}
      {band.kind === 'solo' ? <SoloBand items={band.items} from={band.from} /> : null}
    </div>
  )
}

export function ProjectIndex({ projects, startIndex = 1, className }: ProjectIndexProps) {
  if (projects.length === 0) return null
  const bands = phraseIndex(projects, startIndex)

  return (
    <div className={cn('flex flex-col', className)}>
      {bands.map((band, i) => {
        const previous = bands[i - 1]
        return (
          <div
            key={band.items[0]?.id ?? `band-${i}`}
            className={previous ? gapBetween(previous, band) : undefined}
          >
            <BandFrame band={band} />
          </div>
        )
      })}
    </div>
  )
}
