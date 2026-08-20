'use client'

/**
 * A pulled quote. Oversized Cormorant on the oat band, an accent hairline, and a
 * line-by-line reveal — the only place in a project story where the type is
 * allowed to be this loud.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { cn } from '@/lib/utils'

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
      <figure className="u-gutter mx-auto flex w-full max-w-[80rem] flex-col gap-10">
        <span aria-hidden="true" className="bg-accent h-px w-16" />

        <blockquote
          ref={quoteRef}
          data-reveal
          className="font-display text-ink max-w-[24ch] text-[clamp(1.75rem,4.2vw,3.75rem)] leading-[1.1] font-normal -tracking-[0.02em]"
        >
          {quote}
        </blockquote>

        {attribution ? (
          <figcaption ref={footRef} data-reveal className="u-label flex items-center gap-3">
            <span aria-hidden="true" className="bg-line h-px w-8" />
            {attribution}
          </figcaption>
        ) : null}
      </figure>
    </section>
  )
}
