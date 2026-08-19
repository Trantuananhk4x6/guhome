'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

import { useReveal } from '@/animations/reveal'
import { Label } from '@/components/ui/Label'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRightIcon } from '@/components/ui/icons'
import { cn, pad2 } from '@/lib/utils'
import type { MediaRef, ServiceItem } from '@/types/content'

import { SectionImage } from './SectionImage'
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

/** Numbered editorial rows; hover or keyboard focus cross-fades the preview. */
export function Services({ section, data }: HomeSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useReveal(headingRef, { variant: 'revealUp' })
  useReveal(listRef, { variant: 'revealUp', stagger: 0.07 })

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Services')
  const headingLines = sectionLines(content, 'heading', 'Từ bản vẽ đầu tiên\nđến chiếc ghế cuối cùng.')

  const items = data.services.length > 0 ? data.services : SERVICE_FALLBACK
  const previews: (MediaRef | null)[] = items.map(
    (service, index) => service.cover ?? data.featured[index % Math.max(1, data.featured.length)]?.cover ?? null,
  )

  return (
    <section data-home-section="SERVICES" className="u-gutter bg-canvas py-[var(--spacing-section)]">
      <div ref={headingRef} data-reveal>
        <SectionHeading
          eyebrow={eyebrow}
          title={headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        />
      </div>

      <div className="mt-[clamp(3.5rem,9vh,7rem)] grid grid-cols-12 gap-x-8 gap-y-12">
        <ul ref={listRef} data-reveal className="col-span-12 border-t border-line lg:col-span-7">
          {items.map((service, index) => (
            <li key={service.id} data-reveal-item className="border-b border-line">
              <Link
                href={`/services#${service.slug}`}
                className="group flex items-start gap-6 py-8 outline-offset-4 sm:gap-10"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span
                  className={cn(
                    'u-label w-8 shrink-0 pt-1 text-accent transition-transform duration-700 ease-editorial',
                    'group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5',
                  )}
                >
                  {service.indexLabel.length > 0 ? service.indexLabel : pad2(index + 1)}
                </span>

                <span className="flex flex-1 flex-col gap-3 transition-transform duration-700 ease-editorial group-hover:translate-x-2 group-focus-visible:translate-x-2">
                  <span className="u-display-sm block text-ink">{service.title}</span>
                  {service.summary ? (
                    <span className="u-body-lg block max-w-[46ch]">{service.summary}</span>
                  ) : null}
                </span>

                <ArrowRightIcon className="mt-2 shrink-0 text-lg text-muted transition-all duration-700 ease-editorial group-hover:translate-x-1.5 group-hover:text-accent group-focus-visible:translate-x-1.5 group-focus-visible:text-accent" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="col-span-12 hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-[clamp(5rem,12vh,9rem)]">
            <div
              aria-hidden="true"
              className="relative aspect-[4/5] w-full overflow-hidden bg-surface-alt shadow-[0_50px_90px_-70px_rgba(28,27,24,0.7)]"
            >
              {items.map((service, index) => (
                <span
                  key={service.id}
                  className={cn(
                    'absolute inset-0 block transition-opacity duration-[900ms] ease-editorial',
                    index === active ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <SectionImage
                    media={previews[index] ?? null}
                    alt={service.title}
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    width={1200}
                  />
                </span>
              ))}
            </div>
            <Label className="mt-4">{items[active]?.title ?? ''}</Label>
          </div>
        </div>
      </div>
    </section>
  )
}
