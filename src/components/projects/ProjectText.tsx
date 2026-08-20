'use client'

/**
 * Prose inside a project story.
 *
 * Every seeded project runs three TEXT blocks — one headed, two plain — and
 * until now all 105 of them composed them in the same order: heading-in-a-rail,
 * then a measure right of centre, then one left of centre. The order was fine
 * and the *sequence* was the problem: a rule keyed only to the block's index
 * gives every project the same answer, because every project has the same
 * indices.
 *
 * So the index picks a position inside a phrase, and the project picks which
 * phrase. `phase` comes from `compositionKey` — the project's own tally of
 * photographs, services, year and scene — so it is data, it is stable, it names
 * no slug, and project 106 gets one for free.
 *
 * FOUR AXES, EIGHT READINGS. A single measure can sit left of centre, right of
 * centre, wide against the second column, or narrow in the eighth
 * (`PROSE_AXES`). Each phrase is a permutation of all four, so no axis repeats
 * inside one story, and eight of the twenty-four permutations are listed so
 * that two stories rarely run the same order. A seeded project prints three
 * TEXT blocks and the first of them carries a heading, so what a reader
 * actually sees is positions 1 and 2 — all eight phrases differ there, and the
 * odd-numbered ones also take the other headed composition, which makes eight
 * distinct readings of the same block sequence.
 *
 * THE RULE MOVES WITH THE AXIS. A measure at `inner` or `outer` is near the
 * middle of the band, and the full-width hairline above it is what turns the
 * space either side into a margin rather than a hole. A measure at `left` or
 * `right` is already anchored to one edge, so the hairline belongs to the
 * column — a band-wide rule there just draws a line to nowhere.
 *
 * TWO HEADED COMPOSITIONS, also by phase. `rail` sets the heading in four
 * columns under a band-wide hairline with the prose beside it; `facing` indents
 * the heading, marks it with a short accent rule, and drops the prose into the
 * last four columns under a rule of its own.
 *
 * LEDE is the block that follows the hero — wider column, one step up in size,
 * weighted left. It is the only body copy on the page above 17px, which is what
 * makes the paragraphs after it read as the record rather than as more of the
 * same voice.
 *
 * MEASURE. Every prose column is capped in `ch`, not in columns, so an axis
 * change never turns into a line-length change.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { cn } from '@/lib/utils'

import { DISPLAY_SM, PROSE_AXES, PROSE_BAND_RULE, proseAxis } from './composition'

export interface ProjectTextProps {
  heading?: string
  body: string
  align?: 'left' | 'center'
  width?: 'narrow' | 'wide'
  /** 0-based position among the TEXT blocks of this story. */
  occurrence?: number
  /** The project's composition phase — which phrase this story reads. */
  phase?: number
  /** This block opens the story — it is the first thing after the hero. */
  lede?: boolean
  className?: string
}

/** Blank-line separated paragraphs; a single newline is a soft wrap, not a break. */
export function toParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter((part) => part.length > 0)
}

export function ProjectText({
  heading,
  body,
  align = 'left',
  width = 'narrow',
  occurrence = 0,
  phase = 0,
  lede = false,
  className,
}: ProjectTextProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useTextReveal(headingRef, { by: 'line' })
  useReveal(bodyRef, { variant: 'revealUp', delay: heading ? 0.25 : 0, stagger: 0.08 })

  const paragraphs = toParagraphs(body)
  if (paragraphs.length === 0 && !heading) return null

  const prose = (
    <div ref={bodyRef} data-reveal className={cn('flex flex-col', lede ? 'gap-7' : 'gap-6')}>
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          data-reveal
          data-reveal-item
          className={cn(
            'text-ink/85',
            lede
              ? 'max-w-[56ch] text-[1.1875rem] leading-[1.7]'
              : 'max-w-[62ch] text-[1.0625rem] leading-[1.75]',
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  )

  /* --------------------------------- headed -------------------------------- */

  if (heading) {
    if (phase % 2 === 1) {
      return (
        <section
          className={cn(
            'u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12 gap-x-8 gap-y-10',
            className,
          )}
        >
          <div className="col-span-12 lg:col-span-5 lg:col-start-2">
            <span aria-hidden="true" className="bg-accent block h-px w-16" />
            <h2 ref={headingRef} data-reveal className={cn(DISPLAY_SM, 'text-ink mt-7 max-w-[16ch]')}>
              {heading}
            </h2>
          </div>

          <div className="border-line col-span-12 max-w-[62ch] border-t pt-8 lg:col-span-4 lg:col-start-8 lg:mt-16">
            {prose}
          </div>
        </section>
      )
    }

    return (
      <section
        className={cn('u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12 gap-x-8 gap-y-8', className)}
      >
        <div className="border-line col-span-12 border-t pt-7 lg:col-span-4">
          <h2 ref={headingRef} data-reveal className={cn(DISPLAY_SM, 'text-ink max-w-[14ch]')}>
            {heading}
          </h2>
        </div>

        <div className="col-span-12 max-w-[62ch] lg:col-span-6 lg:col-start-6 lg:pt-7">{prose}</div>
      </section>
    )
  }

  /* --------------------------------- plain --------------------------------- */

  // The lede keeps its own axis: it is the opening statement, and it is the one
  // block on the page whose position is decided by what it is rather than by
  // where it falls in a phrase.
  const axis = proseAxis(phase, occurrence)
  const column = lede ? 'lg:col-span-6 lg:col-start-2' : PROSE_AXES[axis]
  const bandRule = lede || PROSE_BAND_RULE[axis]

  return (
    // The small top pad is load-bearing: a TEXT block often follows a
    // full-bleed espresso band, and a hairline drawn flush against that band's
    // edge disappears into it.
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem] pt-[clamp(1.5rem,4vh,3rem)]', className)}>
      <div className={cn('grid grid-cols-12', bandRule && 'border-line border-t pt-8 lg:pt-11')}>
        <div
          className={cn(
            'col-span-12',
            width === 'narrow' ? column : 'lg:col-span-8 lg:col-start-3',
            !bandRule && 'border-line border-t pt-8 lg:pt-11',
            align === 'center' && 'text-center',
          )}
        >
          {prose}
        </div>
      </div>
    </section>
  )
}
