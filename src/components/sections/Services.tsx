'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { ArrowRightIcon } from '@/components/ui/icons'
import { cn, pad2 } from '@/lib/utils'
import type { ServiceItem } from '@/types/content'

import { SectionImage } from './SectionImage'
import { BAND_T, DISPLAY, DISPLAY_SM, SECTION_Y } from './composition'
import { sectionLines, sectionText } from './content'
import type { HomeSectionProps } from './types'

/** Used only when the services table is still empty. */
const SERVICE_FALLBACK: readonly ServiceItem[] = [
  {
    id: 'fallback-noi-that',
    slug: 'thiet-ke-noi-that',
    indexLabel: '01',
    title: 'Thiết kế nội thất',
    summary: 'Concept, bản vẽ kỹ thuật, phối cảnh và hồ sơ thi công cho toàn bộ ngôi nhà.',
    description: null,
    cover: null,
    order: 0,
  },
  {
    id: 'fallback-kien-truc',
    slug: 'kien-truc-cai-tao',
    indexLabel: '02',
    title: 'Kiến trúc & cải tạo',
    summary: 'Tổ chức lại mặt bằng, ánh sáng tự nhiên và luồng di chuyển trước khi nghĩ tới đồ đạc.',
    description: null,
    cover: null,
    order: 1,
  },
  {
    id: 'fallback-anh-sang',
    slug: 'thiet-ke-anh-sang',
    indexLabel: '03',
    title: 'Thiết kế ánh sáng',
    summary: 'Lớp sáng nền, sáng chức năng và sáng điểm nhấn, tính theo từng giờ trong ngày.',
    description: null,
    cover: null,
    order: 2,
  },
  {
    id: 'fallback-do-dat-rieng',
    slug: 'noi-that-dat-rieng',
    indexLabel: '04',
    title: 'Nội thất đặt riêng',
    summary: 'Bàn, tủ và hệ kệ vẽ riêng theo tỉ lệ căn phòng, làm cùng xưởng mộc quen tay.',
    description: null,
    cover: null,
    order: 3,
  },
  {
    id: 'fallback-thi-cong',
    slug: 'giam-sat-thi-cong',
    indexLabel: '05',
    title: 'Giám sát & thi công',
    summary: 'Theo sát công trường, kiểm soát vật liệu và bàn giao đúng như bản vẽ đã duyệt.',
    description: null,
    cover: null,
    order: 4,
  },
]

/**
 * The offer, and the second dense beat — sold only after the work has been shown
 * and the studio credited.
 *
 * Each row is the /studio process row: ordinal, name, opinion, picture, arrow —
 * four registers of information related by one grid, using the whole 1472px. The
 * hover-only sticky preview that used to squeeze the list into seven columns is
 * gone; its photograph comes back as a per-row thumbnail every device gets.
 */
export function Services({ section, data }: HomeSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useReveal(headingRef, { variant: 'revealUp' })
  useReveal(listRef, { variant: 'revealUp', stagger: 0.07 })

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Services')
  const headingLines = sectionLines(content, 'heading', 'Từ bản vẽ đầu tiên\nđến chiếc ghế cuối cùng.')
  const lead = sectionText(content, 'body', '')

  const items = data.services.length > 0 ? data.services : SERVICE_FALLBACK

  return (
    // `bg-canvas`, not `bg-surface`: PHILOSOPHY directly above is oat, and two
    // oat grounds meeting means no visible boundary at all — only apparent at
    // 390, where PHILOSOPHY's ground actually shows behind its stacked caption.
    <section data-home-section="SERVICES" className={cn('u-gutter bg-canvas', SECTION_Y)}>
      {/*
        THE HOLE, AND WHY THIS SHAPE CLOSES IT. The heading used to span seven
        columns at 44px and the button jumped to column 11, so columns 8–10
        rendered nothing — this section carries no `body` in the database, and a
        26ch measure filled barely half of its own column. That left an unfilled
        rectangle in the middle of a band: the client's "lỗi khoảng trống".

        Three structural moves, none of them writing copy. The heading drops to
        six columns and rises to 70px, so it fills its own column instead of
        floating in it. The lead keeps columns 8–10 when an admin supplies one.
        And the band closes on a hairline, so with no lead the remaining space is
        an enclosed top-right corner — bounded by a rule below, the page edge
        right and a shared baseline — which is air at an edge rather than a hole
        in the middle. `items-end` puts the action on the heading's last
        baseline, so the band's bottom edge reads as one line.

        70.4 against the 44px service titles below is the 1.6 scale contrast the
        header was missing; at 44px it weighed exactly what its own list items
        weigh and did not read as a header at all.
      */}
      <div
        ref={headingRef}
        data-reveal
        className="grid grid-cols-12 items-end gap-x-8 gap-y-8 border-b border-line pb-8"
      >
        <div className="col-span-12 lg:col-span-7">
          <Label>{eyebrow}</Label>
          {/* No `max-w`: the seven-column cell IS the measure. Line breaks come
              from the database as explicit `\n`, so a `ch` cap is only ever an
              overflow guard — and a tight one (14ch ≈ 493px) would wrap the
              seeded lines into four ragged ones, rebuilding the under-filled
              column this shape deletes.

              SEVEN, NOT SIX. Measured at 1600: the seeded second line "là mười
              hai mét vuông." sets 688px of ink in the 720px a six-column cell
              gives it — 32px of slack, which at 70px display is about one
              Vietnamese glyph. The next character an admin types reflows the
              header to three lines and grows this section by 73px, and
              Vietnamese sets wider than Latin for the same character count, so
              the margin was always going to be spent. Seven columns is 845px:
              157px of headroom, ~4 more characters, and it also shortens the
              empty run to the right of the heading rather than lengthening it. */}
          <h2 className={cn(DISPLAY, 'mt-6 text-ink')}>
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {lead.length > 0 ? (
          <p className="u-body-lg col-span-12 max-w-[42ch] lg:col-span-3 lg:col-start-8">{lead}</p>
        ) : null}

        <div className="col-span-12 lg:col-span-2 lg:col-start-11 lg:justify-self-end">
          <Button href="/services" variant="underline" withArrow>
            Tất cả dịch vụ
          </Button>
        </div>
      </div>

      <ul ref={listRef} data-reveal className={cn('border-b border-line', BAND_T)}>
        {items.map((service, index) => {
          const cover =
            service.cover ?? data.featured[index % Math.max(1, data.featured.length)]?.cover ?? null

          return (
            <li key={service.id} data-reveal-item>
              <Link
                href={`/services#${service.slug}`}
                className="group grid grid-cols-12 items-start gap-x-8 gap-y-5 border-t border-line py-8 outline-offset-4"
              >
                {/* `lg:contents` dissolves this wrapper into the row once the
                    grid is wide enough to hold five cells. Below that, a 12-column
                    grid with 32px gutters has no width left for columns, so the
                    ordinal, the name and the arrow share one flex line instead. */}
                <span className="col-span-12 flex items-baseline gap-4 lg:contents">
                  <span className="u-label shrink-0 text-accent transition-transform duration-700 ease-editorial group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 lg:col-span-1 lg:row-start-1 lg:pt-1">
                    {service.indexLabel.length > 0 ? service.indexLabel : pad2(index + 1)}
                  </span>

                  <span
                    className={cn(
                      DISPLAY_SM,
                      'block flex-1 text-ink transition-transform duration-700 ease-editorial group-hover:translate-x-2 group-focus-visible:translate-x-2 lg:col-span-4 lg:col-start-2 lg:row-start-1',
                    )}
                  >
                    {service.title}
                  </span>

                  <ArrowRightIcon className="shrink-0 text-lg text-muted transition-all duration-700 ease-editorial group-hover:translate-x-1.5 group-hover:text-accent group-focus-visible:translate-x-1.5 group-focus-visible:text-accent lg:col-span-1 lg:col-start-12 lg:row-start-1 lg:mt-2 lg:justify-self-end" />
                </span>

                {service.summary ? (
                  <span className="col-span-12 block max-w-[46ch] font-body text-[1rem] leading-[1.85] text-ink/85 line-clamp-2 lg:col-span-4 lg:col-start-6 lg:row-start-1">
                    {service.summary}
                  </span>
                ) : null}

                {/* Desktop only. At 390 the thumbnail is a full-width 2/1 band,
                    175px per row and 875px across five — this was the longest
                    section on the phone by a wide margin. A five-register row is
                    right at 1600; a pure typographic index is right at 390. That
                    is designing at both sizes instead of scaling between them. */}
                <span className="relative col-span-12 hidden aspect-[2/1] overflow-hidden bg-surface-alt lg:col-span-2 lg:col-start-10 lg:row-start-1 lg:block lg:aspect-[3/2]">
                  <span className="absolute inset-0 block transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.04] group-focus-visible:scale-[1.04]">
                    <SectionImage
                      media={cover}
                      alt={service.title}
                      sizes="(min-width: 1024px) 14vw, 100vw"
                      width={800}
                    />
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
