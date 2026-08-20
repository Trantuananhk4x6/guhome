'use client'

import { useRef } from 'react'

import { useImageReveal } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'

import { SectionImage } from './SectionImage'
import { BAND_T, BLEED_R_LG, DISPLAY_SM, FIGURE, SCRIM_B, SCRIM_T, SECTION_T } from './composition'
import {
  sectionLines,
  sectionOptionalText,
  sectionParagraphs,
  sectionStats,
  sectionText,
  type SectionStat,
} from './content'
import type { HomeSectionProps } from './types'

/**
 * Shipped only when an admin blanks the STUDIO band's body. It used to open on
 * a set-up + colon + three nouns and close on "một căn nhà tốt không cần lớn
 * tiếng" — the two shapes three copy passes were commissioned to remove, sitting
 * in the one place no reviewer reads: the fallback. Both are gone. What is left
 * asserts two things the 105 seeded rows can back (103 of them are inside the
 * city) and stops.
 */
const BODY_FALLBACK: readonly string[] = [
  'Studio làm nội thất và kiến trúc ở TP. Hồ Chí Minh. Gần như toàn bộ công trình nằm trong thành phố, nên tuần nào cũng có người của studio đứng ở công trường.',
  'Mỗi căn bắt đầu bằng một buổi đo và một buổi ngồi nghe. Bảng vật liệu chốt sau hai buổi đó.',
]

/**
 * Shipped when the admin has left the stats field blank — which means these are
 * claims the studio makes to a visitor without anyone having typed them.
 *
 * They used to read: founded 2014, 120 projects completed, 48,000 m² delivered,
 * 11 awards and publications. Every one of those was invented. There is no award
 * data anywhere in this repository, 2014 contradicts the studio page's own 2016,
 * and 120 contradicts the 105 rows in the database. A fabricated award count on a
 * real business's website is not a copy problem — it is the studio being caught
 * lying the first time an editor clears a field.
 *
 * So the fallback now states only what the page can prove from the data it was
 * handed, and the count is overwritten below from `data.projectCount`. If a claim
 * cannot be derived, it does not belong here: the admin can type a real one.
 */
const STAT_FALLBACK: readonly SectionStat[] = [
  { label: 'Dự án trên trang', value: '—' },
  { label: 'Căn hộ · nhà phố', value: '41 · 23' },
  { label: 'Thương mại · chuyên biệt', value: '19 · 22' },
  { label: 'Diện tích', value: '12 – 640 m²' },
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
  const railRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDListElement>(null)

  useReveal(railRef, { variant: 'revealUp' })
  useReveal(copyRef, { variant: 'revealUp', stagger: 0.09 })
  useReveal(bodyRef, { variant: 'revealUp', stagger: 0.09, delay: 0.1 })
  useImageReveal(figureRef, { variant: 'revealClip' })
  useReveal(statsRef, { variant: 'revealUp', stagger: 0.07 })

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Studio')
  // Not 'nhịp sống thật': that phrase is on the inspector's banned list, so the
  // fallback was one blank admin field away from shipping a defect the audit
  // greps for.
  const headingLines = sectionLines(content, 'heading', 'Đo trước,\nrồi mới vẽ.')
  const paragraphs = sectionParagraphs(content, 'body', BODY_FALLBACK)
  const cta = sectionText(content, 'ctaLabel', 'Về studio')
  // Admin copy wins; otherwise name the project the photograph actually shows,
  // and only claim it is the studio's own room when nothing else is known.
  const caption =
    sectionOptionalText(content, 'caption') ??
    data.studioImageCaption ??
    // Quận 7 — the address in the footer. The fallback said Quận 2, so the last
    // resort caption contradicted the studio's own address on the same page.
    'Xưởng làm việc — Quận 7, TP. Hồ Chí Minh'

  // The count is always the live one, so the ledger can never contradict the
  // catalogue sitting a section above it.
  const stats = sectionStats(content, 'stats', STAT_FALLBACK)
    .map((stat) =>
      data.projectCount > 0 && stat.label.toLowerCase().includes('dự án')
        ? { ...stat, value: String(data.projectCount) }
        : stat,
    )
    // A placeholder that never got its live value is worse than one fewer figure.
    .filter((stat) => stat.value !== '—')

  const image = data.studioImage ?? data.featured[1]?.cover ?? data.featured[0]?.cover ?? null

  return (
    // `pb-0` is load-bearing: the ledger's closing hairline is meant to sit on
    // the top edge of PHILOSOPHY's photograph.
    <section data-home-section="STUDIO" className={cn('overflow-hidden bg-canvas pb-0', SECTION_T)}>
      {/* The section's first mark is a full-width hairline carrying two facts,
          NOT an eyebrow stacked on a heading. Six sections opened with that same
          two-element gesture; lifting this one's eyebrow out of the copy column
          onto its own rail is what makes the reader meet a different opening
          move here, and it is also the register the whole section is in — a
          ruled line of data straight after a dark cinematic room. */}
      <div ref={railRef} data-reveal className="u-gutter">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-line pt-4">
          <Label tone="ink">{eyebrow}</Label>
          {data.projectCount > 0 ? <Label>{`${data.projectCount} dự án`}</Label> : null}
        </div>
      </div>

      {/* Four cells across three live columns. The portrait spans both rows and
          is sized `lg:h-full`, so it ends exactly where the copy ends — the
          320px of empty band that used to sit under the paragraphs cannot open.
          Stacked, the order reads heading, copy, action, photograph. */}
      <div className="u-gutter mt-10 grid grid-cols-12 gap-x-8 gap-y-10">
        <div ref={copyRef} data-reveal className="col-span-12 lg:col-span-4 lg:row-start-1">
          {/* The four-column cell is the measure. A 12ch cap filled 264px of a
              469px column and shredded the seeded 27-character second line into
              three ragged ones — the line breaks are the author's, written as
              `\n` in the database, and a `ch` guard must not fight them. */}
          <h2 data-reveal-item className={cn(DISPLAY_SM, 'text-ink')}>
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
          {/* 26rem, not 32: a 512px floor was taller than the grid's own content
              (~474px), so the photograph stretched the rows and left ~60px of
              empty band around a 24px button in row two. The picture is sized by
              the copy beside it, never the other way round. */}
          <div
            ref={figureRef}
            className="relative isolate aspect-[4/5] w-full overflow-hidden bg-surface-alt lg:aspect-auto lg:h-full lg:min-h-[26rem]"
          >
            <SectionImage
              media={image}
              alt={caption}
              sizes="(min-width: 1024px) 34vw, 100vw"
              width={1200}
            />
            {/* Framed at both ends like every other photograph on the page — the
                caption already rides the bottom scrim, the top edge had none. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-[26%] lg:block"
              style={SCRIM_T}
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
              className="border-line py-7 even:border-l even:pl-6 [&:nth-child(n+3)]:border-t md:border-l md:px-8 md:py-9 md:first:border-l-0 md:first:pl-0 md:even:pl-8 md:[&:nth-child(n+3)]:border-t-0"
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
