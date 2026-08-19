'use client'

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'

import { sectionCta, sectionLines, sectionOptionalText, sectionText } from './content'
import type { HomeSectionProps } from './types'

/** The closing invitation. Espresso ground, oversized type, one link out. */
export function CtaSection({ section }: HomeSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const footRef = useRef<HTMLDivElement>(null)

  useTextReveal(headingRef, { by: 'line' })
  useReveal(footRef, { variant: 'revealUp', delay: 0.2, stagger: 0.08 })

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Contact')
  const headingLines = sectionLines(content, 'heading', 'Kể cho chúng tôi\nvề ngôi nhà của bạn.')
  const body = sectionText(
    content,
    'body',
    'Một cuộc trò chuyện đầu tiên thường bắt đầu bằng mặt bằng, ngân sách và cách bạn muốn sống trong đó.',
  )
  const cta = sectionCta(content, { label: 'Liên hệ', href: '/contact' })
  const email = sectionOptionalText(content, 'email')

  return (
    <section data-home-section="CTA" className="bg-espresso text-canvas">
      <div className="u-gutter flex flex-col gap-12 py-[clamp(6rem,20vh,13rem)]">
        <Label tone="light" rule>
          {eyebrow}
        </Label>

        <h2 ref={headingRef} data-reveal className="u-display max-w-[15ch] text-canvas">
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div
          ref={footRef}
          data-reveal
          className="flex flex-col gap-10 border-t border-canvas/15 pt-10 md:flex-row md:items-end md:justify-between md:gap-16"
        >
          <div data-reveal-item className="flex max-w-[44ch] flex-col items-start gap-5">
            <p className="u-body-lg text-canvas/60">{body}</p>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="u-label text-canvas/80 underline-offset-8 transition-colors duration-500 ease-editorial hover:text-accent-soft"
              >
                {email}
              </a>
            ) : null}
          </div>

          <div data-reveal-item className="shrink-0">
            <Button href={cta.href} variant="ghost" tone="light" size="lg" withArrow>
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
