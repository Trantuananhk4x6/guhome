'use client'

/**
 * Prose inside a project story. A narrow measure by default (≈62 characters),
 * an optional display heading that reveals line by line, and paragraphs that
 * lift in behind it.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { cn } from '@/lib/utils'

export interface ProjectTextProps {
  heading?: string
  body: string
  align?: 'left' | 'center'
  width?: 'narrow' | 'wide'
  className?: string
}

/** Blank-line separated paragraphs; a single newline is a soft wrap, not a break. */
export function toParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter((part) => part.length > 0)
}

export function ProjectText({ heading, body, align = 'left', width = 'narrow', className }: ProjectTextProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useTextReveal(headingRef, { by: 'line' })
  useReveal(bodyRef, { variant: 'revealUp', delay: heading ? 0.25 : 0, stagger: 0.08 })

  const paragraphs = toParagraphs(body)
  if (paragraphs.length === 0 && !heading) return null

  return (
    <section className={cn('u-gutter mx-auto w-full', className)}>
      <div
        className={cn(
          'flex flex-col gap-8',
          width === 'narrow' ? 'max-w-[62ch]' : 'max-w-[84ch]',
          align === 'center' && 'mx-auto items-center text-center',
        )}
      >
        {heading ? (
          <h2 ref={headingRef} data-reveal className="u-display-sm text-ink max-w-[20ch]">
            {heading}
          </h2>
        ) : null}

        <div ref={bodyRef} data-reveal className="flex flex-col gap-6">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              data-reveal
              data-reveal-item
              className="text-ink/85 text-[1.0625rem] leading-[1.75]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
