'use client'

/**
 * A pulled quote on the oat band — the one place in a project story where the
 * type is allowed to be this loud.
 *
 * It used to be a stack inside an 80rem box: rule, quote, attribution, each on
 * its own line, with the right third of the band empty. The quote now takes
 * eight columns and the attribution sits beside it in the last three, sharing a
 * baseline, so the band is full and the two elements read as one line of
 * argument rather than as two stacked blocks.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { cn } from '@/lib/utils'

import { DISPLAY } from './composition'

export interface ProjectQuoteProps {
  quote: string
  attribution?: string
  className?: string
}

export function ProjectQuote({ quote, attribution, className }: ProjectQuoteProps) {
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const footRef = useRef<HTMLElement>(null)

  useTextReveal(quoteRef, { by: 'line' })
  useReveal(footRef, { variant: 'revealUp', delay: 0.35 })

  return (
    <section className={cn('bg-surface py-[var(--spacing-section)]', className)}>
      <figure className="u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12 items-end gap-x-8 gap-y-8">
        <blockquote
          ref={quoteRef}
          data-reveal
          className={cn(DISPLAY, 'text-ink col-span-12 max-w-[20ch] lg:col-span-8')}
        >
          {quote}
        </blockquote>

        {attribution ? (
          <figcaption
            ref={footRef}
            data-reveal
            className="col-span-12 flex flex-col gap-4 lg:col-span-3 lg:col-start-10"
          >
            <span aria-hidden="true" className="bg-accent h-px w-16" />
            <span className="u-label">{attribution}</span>
          </figcaption>
        ) : null}
      </figure>
    </section>
  )
}
