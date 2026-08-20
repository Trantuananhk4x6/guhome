'use client'

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'

import { SectionImage } from './SectionImage'
import { DISPLAY_LG, SCRIM_B, SCRIM_T } from './composition'
import { sectionCta, sectionLines, sectionOptionalText, sectionText } from './content'
import type { HomeSectionProps } from './types'

/**
 * The close, and the second bookend — the mirror of the hero. The photograph
 * keeps its upper two-thirds clear and every word sits in the lower third, so
 * the reader's last screen is a room and the last thing they read is an address.
 *
 * The espresso footer follows immediately: a flat panel here read as two
 * identical black bands stacked, which is why this is a picture, framed in the
 * page's three steps rather than washed out to ground.
 */
export function CtaSection({ section, data }: HomeSectionProps) {
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

  const image = data.closingImage

  return (
    <section
      data-home-section="CTA"
      className="relative isolate flex min-h-[70svh] flex-col justify-end overflow-hidden bg-espresso text-canvas lg:min-h-[80svh]"
    >
      {image ? (
        <div className="absolute inset-0" aria-hidden="true">
          <SectionImage media={image} alt="" sizes="100vw" width={2400} />
          {/* Three steps, as everywhere else on the page: a flat hold, then a
              shallow gradient at each end. `/86` erased the picture entirely. */}
          <div className="absolute inset-0 bg-espresso/55" />
          <div className="absolute inset-x-0 top-0 h-[24%]" style={SCRIM_T} />
          <div className="absolute inset-x-0 bottom-0 h-[58%]" style={SCRIM_B} />
        </div>
      ) : null}

      <div className="u-gutter relative pt-[clamp(8rem,24vh,16rem)] pb-[clamp(3.5rem,9vh,6rem)]">
        <div className="grid grid-cols-12 items-end gap-x-8 gap-y-10 border-t border-canvas/15 pt-10">
          <div className="col-span-12 lg:col-span-7">
            <Label tone="light" rule>
              {eyebrow}
            </Label>
            <h2 ref={headingRef} data-reveal className={cn(DISPLAY_LG, 'mt-8 max-w-[13ch] text-canvas')}>
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div
            ref={footRef}
            data-reveal
            className="col-span-12 flex flex-col items-start gap-6 self-end lg:col-span-5 lg:col-start-8"
          >
            <p data-reveal-item className="u-body-lg max-w-[42ch] text-canvas/70">
              {body}
            </p>
            {email ? (
              <a
                data-reveal-item
                href={`mailto:${email}`}
                className="u-label text-canvas/85 underline-offset-8 transition-colors duration-500 ease-editorial hover:text-accent-soft"
              >
                {email}
              </a>
            ) : null}
            <span data-reveal-item>
              <Button href={cta.href} variant="ghost" tone="light" size="lg" withArrow>
                {cta.label}
              </Button>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
