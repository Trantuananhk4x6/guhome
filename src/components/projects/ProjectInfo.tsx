'use client'

/**
 * The project's factual spine: a hairline metadata table and, beside it, the
 * services the studio carried. Numbers stay in Inter, names in Cormorant — the
 * same pairing the index pages use.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { cn, formatArea, pad2 } from '@/lib/utils'
import type { ProjectDetail } from '@/types/content'

export interface ProjectInfoProps {
  project: ProjectDetail
  showServices?: boolean
  /** Editorial note printed under the table. */
  note?: string
  className?: string
}

interface Row {
  label: string
  value: string
}

function rows(project: ProjectDetail): Row[] {
  const out: Row[] = []
  const push = (label: string, value: string | null): void => {
    if (value && value.trim().length > 0) out.push({ label, value })
  }

  push('Hạng mục', project.categoryName)
  push('Địa điểm', project.location)
  push('Diện tích', formatArea(project.area))
  push('Năm hoàn thành', project.year ? String(project.year) : null)
  push('Phong cách', project.style)
  push('Chủ đầu tư', project.client)
  push('Thời gian thi công', project.duration)

  return out
}

export function ProjectInfo({ project, showServices = true, note, className }: ProjectInfoProps) {
  const tableRef = useRef<HTMLDListElement>(null)
  const servicesRef = useRef<HTMLOListElement>(null)

  useReveal(tableRef, { variant: 'revealUp', stagger: 0.06 })
  useReveal(servicesRef, { variant: 'revealUp', delay: 0.2, stagger: 0.06 })

  const items = rows(project)
  const services = showServices ? project.services.filter((service) => service.trim().length > 0) : []

  if (items.length === 0 && services.length === 0) return null

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="u-label flex items-center gap-3">
            <span aria-hidden="true" className="bg-accent h-px w-8" />
            Thông tin
          </p>
        </div>

        <dl ref={tableRef} data-reveal className="flex flex-col lg:col-span-5">
          {items.map((row) => (
            <div
              key={row.label}
              data-reveal
              data-reveal-item
              className="border-line flex items-baseline justify-between gap-8 border-t py-5 last:border-b"
            >
              <dt className="u-label shrink-0">{row.label}</dt>
              <dd className="font-display text-ink text-right text-xl font-normal md:text-2xl">{row.value}</dd>
            </div>
          ))}
        </dl>

        {services.length > 0 ? (
          <div className="flex flex-col gap-6 lg:col-span-4">
            <p className="u-label">Dịch vụ</p>
            <ol ref={servicesRef} data-reveal className="flex flex-col gap-4">
              {services.map((service, i) => (
                <li
                  key={service}
                  data-reveal
                  data-reveal-item
                  className="border-line flex items-baseline gap-4 border-b pb-4"
                >
                  <span className="u-label text-accent shrink-0">{pad2(i + 1)}</span>
                  <span className="text-ink/85 text-[0.9375rem] leading-relaxed">{service}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>

      {note ? <p className="text-muted mt-12 max-w-[62ch] text-sm leading-relaxed">{note}</p> : null}
    </section>
  )
}
