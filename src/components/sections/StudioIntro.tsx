'use client'

import { useRef } from 'react'

import { useImageReveal } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'

import { SectionImage } from './SectionImage'
import { BAND_T, BLEED_R_LG, DISPLAY_SM, FIGURE, SCRIM_B, SECTION_T } from './composition'
import {
  sectionLines,
  sectionOptionalText,
  sectionParagraphs,
  sectionStats,
  sectionText,
  type SectionStat,
} from './content'
import type { HomeSectionProps } from './types'

const BODY_FALLBACK: readonly string[] = [
  'AN ATELIER là studio nội thất và kiến trúc tại TP. Hồ Chí Minh. Chúng tôi bắt đầu mỗi dự án bằng cách quan sát: hướng nắng buổi sáng, lối đi quen thuộc của gia chủ, chỗ ngồi mà ai cũng chọn khi có khách.',
  'Từ đó, không gian được dựng lên bằng vật liệu thật — gỗ óc chó, đá travertine, vữa khoáng, đồng thau xước — và bằng tỉ lệ vừa vặn với người sống trong đó. Chúng tôi tin một căn nhà tốt không cần lớn tiếng.',
]

const STAT_FALLBACK: readonly SectionStat[] = [
  { label: 'Năm thành lập', value: '2014' },
  { label: 'Dự án đã hoàn thiện', value: '120' },
  { label: 'Diện tích đã hoàn thiện', value: '48.000 m²' },
  { label: 'Giải thưởng & xuất bản', value: '11' },
]

/**
 * Attribution, with evidence — the first dense beat, and the hardest cut on the
 * page: three viewports of photography straight into one viewport of facts.
 *
 * Three live columns across the full width (heading rail, body copy, portrait
 * bleeding off the right edge) instead of a six-column block beside a five-column
 * picture, and the four figures set as one horizontal ledger instead of four
 * stacked rows that each put a two-digit number in a 1472px band.
 */
export function StudioIntro({ section, data }: HomeSectionProps) {
  const copyRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDListElement>(null)

  useReveal(copyRef, { variant: 'revealUp', stagger: 0.09 })
  useReveal(bodyRef, { variant: 'revealUp', stagger: 0.09, delay: 0.1 })
  useImageReveal(figureRef, { variant: 'revealClip' })
  useReveal(statsRef, { variant: 'revealUp', stagger: 0.07 })

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Studio')
  const headingLines = sectionLines(content, 'heading', 'Chúng tôi thiết kế cho\nnhịp sống thật.')
  const paragraphs = sectionParagraphs(content, 'body', BODY_FALLBACK)
  const cta = sectionText(content, 'ctaLabel', 'Về studio')
  // Admin copy wins; otherwise name the project the photograph actually shows,
  // and only claim it is the studio's own room when nothing else is known.
  const caption =
    sectionOptionalText(content, 'caption') ??
    data.studioImageCaption ??
    'Xưởng làm việc — Quận 2, TP. Hồ Chí Minh'

  const stats = sectionStats(content, 'stats', STAT_FALLBACK).map((stat) =>
    data.projectCount > 0 && stat.label.toLowerCase().includes('dự án')
      ? { ...stat, value: String(data.projectCount) }
      : stat,
  )

  const image = data.studioImage ?? data.featured[1]?.cover ?? data.featured[0]?.cover ?? null

  return (
    // `pb-0` is load-bearing: the ledger's closing hairline is meant to sit on
    // the top edge of PHILOSOPHY's photograph.
    <section data-home-section="STUDIO" className={cn('overflow-hidden bg-canvas pb-0', SECTION_T)}>
      {/* Four cells across three live columns. The portrait spans both rows and
          is sized `lg:h-full`, so it ends exactly where the copy ends — the
          320px of empty band that used to sit under the paragraphs cannot open.
          Stacked, the order reads heading, copy, action, photograph. */}
      <div className="u-gutter grid grid-cols-12 gap-x-8 gap-y-10">
        <div ref={copyRef} data-reveal className="col-span-12 lg:col-span-4 lg:row-start-1">
          <Label data-reveal-item rule>
            {eyebrow}
          </Label>

          <h2 data-reveal-item className={cn(DISPLAY_SM, 'mt-8 max-w-[12ch] text-ink')}>
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div
          ref={bodyRef}
          data-reveal
          className="col-span-12 flex max-w-[44ch] flex-col gap-6 lg:col-span-4 lg:col-start-5 lg:row-start-1"
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} data-reveal-item className="u-body-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Row two of the left column: the action sits on the portrait's bottom
            edge at desktop, and follows the copy on a phone. */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:self-end">
          <Button href="/studio" variant="underline" withArrow>
            {cta}
          </Button>
        </div>

        <figure
          className={cn(
            'relative col-span-12 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1',
            BLEED_R_LG,
          )}
        >
          <div
            ref={figureRef}
            className="relative isolate aspect-[4/5] w-full overflow-hidden bg-surface-alt lg:aspect-auto lg:h-full lg:min-h-[32rem]"
          >
            <SectionImage
              media={image}
              alt={caption}
              sizes="(min-width: 1024px) 34vw, 100vw"
              width={1200}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 hidden h-[38%] lg:block"
              style={SCRIM_B}
            />
          </div>
          {/* Inset over its own bottom-left corner at desktop; below the frame on
              a phone, where a scrim plate over a 350px photograph is unreadable. */}
          <figcaption className="u-label mt-4 block lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:p-[var(--spacing-gutter)] lg:text-canvas/75">
            {caption}
          </figcaption>
        </figure>
      </div>

      <div className={cn('u-gutter', BAND_T)}>
        <dl
          ref={statsRef}
          data-reveal
          className="grid grid-cols-2 border-t border-b border-line md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal-item
              className="border-line py-7 even:border-l even:pl-6 [&:nth-child(n+3)]:border-t md:border-l md:px-8 md:py-11 md:first:border-l-0 md:first:pl-0 md:even:pl-8 md:[&:nth-child(n+3)]:border-t-0"
            >
              <dt className="u-label">{stat.label}</dt>
              <dd className={cn(FIGURE, 'mt-3 text-ink')}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
