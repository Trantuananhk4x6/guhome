'use client'

import { useRef } from 'react'

import { useImageReveal } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'

import { SectionImage } from './SectionImage'
import { sectionLines, sectionParagraphs, sectionStats, sectionText, type SectionStat } from './content'
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

/** Editorial two-column studio note: statement, body copy, portrait, figures. */
export function StudioIntro({ section, data }: HomeSectionProps) {
  const copyRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDListElement>(null)

  useReveal(copyRef, { variant: 'revealUp', stagger: 0.09 })
  useImageReveal(figureRef, { variant: 'revealClip' })
  useReveal(statsRef, { variant: 'revealUp', stagger: 0.07 })

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Studio')
  const headingLines = sectionLines(content, 'heading', 'Chúng tôi thiết kế cho\nnhịp sống thật.')
  const paragraphs = sectionParagraphs(content, 'body', BODY_FALLBACK)
  const cta = sectionText(content, 'ctaLabel', 'Về studio')
  const caption = sectionText(content, 'caption', 'Xưởng làm việc — Quận 2, TP. Hồ Chí Minh')

  const stats = sectionStats(content, 'stats', STAT_FALLBACK).map((stat) =>
    data.projectCount > 0 && stat.label.toLowerCase().includes('dự án')
      ? { ...stat, value: String(data.projectCount) }
      : stat,
  )

  const image = data.studioImage ?? data.featured[1]?.cover ?? data.featured[0]?.cover ?? null

  return (
    <section data-home-section="STUDIO" className="bg-surface py-[var(--spacing-section)]">
      <div className="u-gutter grid grid-cols-12 items-start gap-x-8 gap-y-16">
        <div ref={copyRef} data-reveal className="col-span-12 lg:row-start-1 lg:col-span-6">
          <Label data-reveal-item rule>
            {eyebrow}
          </Label>

          <h2 data-reveal-item className="u-display mt-9 max-w-[16ch] text-ink">
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div data-reveal-item className="mt-11 flex max-w-[46ch] flex-col gap-6">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="u-body-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div data-reveal-item className="mt-11">
            <Button href="/studio" variant="underline" withArrow>
              {cta}
            </Button>
          </div>
        </div>

        <figure className="col-span-12 lg:row-start-1 lg:col-span-5 lg:col-start-8">
          <div
            ref={figureRef}
            className="relative aspect-[3/4] w-full overflow-hidden bg-surface-alt shadow-[0_50px_90px_-70px_rgba(28,27,24,0.7)]"
          >
            <SectionImage
              media={image}
              alt="Không gian làm việc của AN ATELIER"
              sizes="(min-width: 1024px) 40vw, 100vw"
              width={1200}
            />
          </div>
          <figcaption className="u-label mt-4 block">{caption}</figcaption>
        </figure>
      </div>

      <div className="u-gutter mt-[clamp(4rem,10vh,8rem)]">
        <dl ref={statsRef} data-reveal className="border-t border-line">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal-item
              className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-line py-7"
            >
              <dt className="u-label col-span-12 sm:col-span-5 lg:col-span-4">{stat.label}</dt>
              <dd className="col-span-12 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none font-light text-ink sm:col-span-7 lg:col-span-8">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
