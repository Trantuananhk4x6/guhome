'use client'

/**
 * Prose inside a project story — and the block that most often looked like a
 * template, because it always did the same thing: a 62-character column hard
 * against the left gutter with roughly 900px of empty canvas beside it, four
 * times down a page.
 *
 * Two compositions now, chosen by what the block actually holds:
 *
 *   HEADED   the heading sits *beside* the prose in a four-column rail, with
 *            an accent hairline above it. Heading and body across one band,
 *            which is what fills the measure instead of stacking two blocks.
 *   PLAIN    a single centred measure, and nothing else in the band. The
 *            seeded stories put one paragraph in each of these, so the
 *            composition that suits them is a held reading break rather than a
 *            column pinned to one edge — and centring it is the only time this
 *            page centres anything, which is what marks it as a pause.
 *
 * `occurrence` shifts the plain measure a column left or right of centre on
 * alternate blocks, so two paragraphs separated by a photograph never land on
 * exactly the same axis.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { cn } from '@/lib/utils'

import { DISPLAY_SM } from './composition'

export interface ProjectTextProps {
  heading?: string
  body: string
  align?: 'left' | 'center'
  width?: 'narrow' | 'wide'
  /** 0-based position among the TEXT blocks of this story. */
  occurrence?: number
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
  className,
}: ProjectTextProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useTextReveal(headingRef, { by: 'line' })
  useReveal(bodyRef, { variant: 'revealUp', delay: heading ? 0.25 : 0, stagger: 0.08 })

  const paragraphs = toParagraphs(body)
  if (paragraphs.length === 0 && !heading) return null

  const prose = (
    <div ref={bodyRef} data-reveal className="flex flex-col gap-6">
      {paragraphs.map((paragraph, i) => (
        <p key={i} data-reveal data-reveal-item className="text-ink/85 text-[1.0625rem] leading-[1.75]">
          {paragraph}
        </p>
      ))}
    </div>
  )

  if (heading) {
    return (
      <section
        className={cn('u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12 gap-x-8 gap-y-8', className)}
      >
        <div className="border-line col-span-12 border-t pt-7 lg:col-span-4">
          <h2 ref={headingRef} data-reveal className={cn(DISPLAY_SM, 'text-ink max-w-[14ch]')}>
            {heading}
          </h2>
        </div>

        <div className={cn('col-span-12 max-w-[62ch] lg:col-span-6 lg:col-start-6 lg:pt-7')}>{prose}</div>
      </section>
    )
  }

  // The hairline is what turns the space either side of a single measure into a
  // margin instead of a hole: the band is visibly the full width, and the type
  // is visibly placed inside it. The measure then swings left of centre and
  // right of centre on alternate blocks, so two paragraphs a page apart never
  // sit on the same axis.
  const swung =
    occurrence % 2 === 1 ? 'lg:col-span-6 lg:col-start-6' : 'lg:col-span-6 lg:col-start-3'

  return (
    // The small top pad is load-bearing: a TEXT block often follows a
    // full-bleed espresso band, and a hairline drawn flush against that band's
    // edge disappears into it.
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem] pt-[clamp(1.5rem,4vh,3rem)]', className)}>
      <div className="border-line grid grid-cols-12 border-t pt-8 lg:pt-11">
        <div
          className={cn(
            'col-span-12',
            width === 'narrow' ? swung : 'lg:col-span-8 lg:col-start-3',
            align === 'center' && 'text-center',
          )}
        >
          {prose}
        </div>
      </div>
    </section>
  )
}
