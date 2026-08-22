'use client'

/**
 * The project's factual spine, on the oat band: the summary, a hairline
 * metadata table, and the services the studio carried — three live columns
 * across the full measure.
 *
 * The first column used to hold nothing but the word "Thông tin", which left a
 * 350px rail of empty canvas beside a table for the length of the block. It now
 * carries the project's own summary, which is written for exactly this job and
 * was otherwise never shown on the page it belongs to.
 *
 * This is also where the page changes register — the story ends, the record
 * begins — so it takes the oat ground and its own section padding.
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
  const leadRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDListElement>(null)
  const servicesRef = useRef<HTMLOListElement>(null)

  useReveal(leadRef, { variant: 'revealUp' })
  useReveal(tableRef, { variant: 'revealUp', delay: 0.1, stagger: 0.06 })
  useReveal(servicesRef, { variant: 'revealUp', delay: 0.2, stagger: 0.06 })

  const items = rows(project)
  const services = showServices ? project.services.filter((service) => service.trim().length > 0) : []

  if (items.length === 0 && services.length === 0) return null

  return (
    <section className={cn('bg-surface py-[var(--spacing-section)]', className)}>
      <div className="u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12 gap-x-8 gap-y-14">
        <div ref={leadRef} data-reveal className="col-span-12 lg:col-span-5">
          <p className="u-label flex items-center gap-3">
            <span aria-hidden="true" className="bg-accent h-px w-8" />
            Thông tin
          </p>

          {project.summary ? (
            <p className="text-ink/85 mt-7 max-w-[46ch] text-[1.0625rem] leading-[1.75]">{project.summary}</p>
          ) : null}

          {note ? <p className="text-muted mt-8 max-w-[52ch] text-sm leading-relaxed">{note}</p> : null}
        </div>

        <dl ref={tableRef} data-reveal className="col-span-12 flex flex-col lg:col-span-4 lg:col-start-6">
          {items.map((row) => (
            <div
              key={row.label}
              data-reveal
              data-reveal-item
              className="border-line flex items-baseline justify-between gap-8 border-t py-4 last:border-b"
            >
              <dt className="u-label shrink-0">{row.label}</dt>
              <dd className="text-ink font-display text-right text-lg font-normal md:text-xl">{row.value}</dd>
            </div>
          ))}
        </dl>

        {services.length > 0 ? (
          <div className="col-span-12 flex flex-col gap-5 lg:col-span-3 lg:col-start-10">
            <p className="u-label">Dịch vụ</p>
            <ol ref={servicesRef} data-reveal className="flex flex-col">
              {services.map((service, i) => (
                <li
                  key={service}
                  data-reveal
                  data-reveal-item
                  className="border-line flex items-baseline gap-4 border-t py-3.5 last:border-b"
                >
                  <span className="u-label text-accent shrink-0">{pad2(i + 1)}</span>
                  <span className="text-ink/85 text-[0.9375rem] leading-relaxed">{service}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  )
}
