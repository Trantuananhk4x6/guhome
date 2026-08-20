'use client'

/**
 * A pulled quote on the oat band — the one place in a project story where the
 * type is allowed to be this loud.
 *
 * TWO MEASURES, CHOSEN BY THE SENTENCE. The seeded quotes run from 34 to 196
 * characters, and one eight-column measure served all of them: a 34-character
 * line set across eight columns is a fragment floating in a band, while the
 * long ones need every one of those columns. So a quote under ~110 characters
 * takes six columns and is indented — held, not spread — and a longer one keeps
 * the full eight. The attribution answers from the opposite side either way, on
 * the same baseline, so the band is full and the two elements read as one line
 * of argument rather than as two stacked blocks.
 *
 * `phase` — the project's own tally, from `compositionKey` — decides which side
 * is which, so the quote block does not lean the same way on all 105 pages.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { cn } from '@/lib/utils'

import { DISPLAY } from './composition'

export interface ProjectQuoteProps {
  quote: string
  attribution?: string
  /** The project's composition phase — which side the quote leans to. */
  phase?: number
  className?: string
}

/** Above this many characters a quote fills its band rather than being held in it. */
const SPREADS_ABOVE = 110

interface QuoteShape {
  quote: string
  foot: string
  measure: string
}

const SHAPES: Record<'spread' | 'held', readonly [QuoteShape, QuoteShape]> = {
  spread: [
    { quote: 'lg:col-span-8', foot: 'lg:col-span-3 lg:col-start-10', measure: 'max-w-[24ch]' },
    {
      quote: 'lg:col-span-8 lg:col-start-5',
      foot: 'lg:col-span-3 lg:col-start-1 lg:row-start-1',
      measure: 'max-w-[24ch]',
    },
  ],
  held: [
    { quote: 'lg:col-span-6 lg:col-start-2', foot: 'lg:col-span-3 lg:col-start-9', measure: 'max-w-[18ch]' },
    {
      quote: 'lg:col-span-6 lg:col-start-6',
      foot: 'lg:col-span-3 lg:col-start-2 lg:row-start-1',
      measure: 'max-w-[18ch]',
    },
  ],
}

export function ProjectQuote({ quote, attribution, phase = 0, className }: ProjectQuoteProps) {
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const footRef = useRef<HTMLElement>(null)

  useTextReveal(quoteRef, { by: 'line' })
  useReveal(footRef, { variant: 'revealUp', delay: 0.35 })

  const shape = SHAPES[quote.length > SPREADS_ABOVE ? 'spread' : 'held'][phase % 2 === 1 ? 1 : 0]

  return (
    <section className={cn('bg-surface py-[var(--spacing-section)]', className)}>
      <figure className="u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12 items-end gap-x-8 gap-y-8">
        <blockquote
          ref={quoteRef}
          data-reveal
          className={cn(DISPLAY, 'text-ink col-span-12', shape.measure, shape.quote)}
        >
          {quote}
        </blockquote>

        {attribution ? (
          <figcaption
            ref={footRef}
            data-reveal
            className={cn('col-span-12 flex flex-col gap-4', shape.foot)}
          >
            <span aria-hidden="true" className="bg-accent h-px w-16" />
            <span className="u-label">{attribution}</span>
          </figcaption>
        ) : null}
      </figure>
    </section>
  )
}
