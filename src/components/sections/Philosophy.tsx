'use client'

import { useRef } from 'react'

import { useParallax } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'

import { SectionImage } from './SectionImage'
import { DISPLAY, SCRIM_B, SCRIM_T } from './composition'
import { sectionLines, sectionOptionalText, sectionText } from './content'
import type { HomeSectionProps } from './types'

/**
 * The held breath — the shortest section on the site and the only one with no
 * grid above the fold: one photograph, edge to edge, with the statement set into
 * its lower-left corner and the material named in its upper-right.
 *
 * It holds the page's two dense beats (the studio ledger above, the service
 * index below) apart so they never read as two tables in a row, and the 0.7 : 2.9
 * ratio against FEATURED is the dynamic range the middle of this page was
 * missing.
 *
 * At 390 the overlay would eat the picture, so the composition inverts: the oat
 * ground returns and the type stacks below the frame — the same nodes, moved by
 * `lg:absolute`, never a second copy of the copy.
 */
export function Philosophy({ section, data }: HomeSectionProps) {
  const statementRef = useRef<HTMLQuoteElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useTextReveal(statementRef, { by: 'line' })
  useReveal(noteRef, { variant: 'revealUp', delay: 0.15, stagger: 0.08 })
  // Clip on the frame, drift on the overscanned layer inside it.
  useReveal(frameRef, { variant: 'revealClip' })
  useParallax(frameRef, { strength: 0.5 })

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Philosophy')
  const statementLines = sectionLines(content, 'heading', 'Ít vật liệu hơn,\nnhiều ánh sáng hơn.')
  const body = sectionText(
    content,
    'body',
    'Chúng tôi giữ bảng vật liệu ngắn và để ánh sáng làm phần còn lại. Một mặt đá honed, một tấm gỗ sồi lau dầu, một khoảng tường trống — đủ để căn phòng thay đổi theo giờ trong ngày mà không cần thêm gì.',
  )

  const material = data.materials[0] ?? null
  const image = data.philosophyImage ?? material?.media ?? data.featured[0]?.cover ?? null

  const captionOverride = sectionOptionalText(content, 'caption')
  const caption = captionOverride ?? material?.name ?? 'Chi tiết vật liệu'
  const captionNote = captionOverride ? null : (material?.description ?? null)
  const alt = captionNote ? `${caption} — ${captionNote}` : caption

  return (
    <section data-home-section="PHILOSOPHY" className="relative isolate overflow-hidden bg-surface">
      <figure className="relative isolate">
        <div
          ref={frameRef}
          data-reveal
          className="relative isolate aspect-[4/5] w-full overflow-hidden bg-surface-alt sm:aspect-[3/2] lg:aspect-[16/7] lg:min-h-[35rem]"
        >
          <span data-reveal-media className="absolute inset-x-0 top-[-8%] bottom-[-8%] block">
            <SectionImage media={image} alt={alt} sizes="100vw" width={2400} />
          </span>
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[30%]" style={SCRIM_T} />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 hidden h-[56%] lg:block"
            style={SCRIM_B}
          />

          {/* Top rail — the frame's upper edge carries the eyebrow and the
              material's name instead of being left as sky. */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-6 p-[var(--spacing-gutter)]">
            <Label tone="light" rule className="text-canvas/75">
              {eyebrow}
            </Label>
            <span className="u-label max-w-[45%] text-right text-canvas/75">{caption}</span>
          </div>
        </div>

        {/* One node, two positions: stacked under the picture on a phone,
            set into its lower corners from `lg` up. */}
        <figcaption
          ref={noteRef}
          data-reveal
          className="u-gutter grid grid-cols-12 items-end gap-x-8 gap-y-6 pt-9 pb-[clamp(3rem,8vh,5rem)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-[var(--spacing-gutter)]"
        >
          {/* `data-reveal`, never `data-reveal-item`: the line split owns this
              element, and letting the container's stagger grab it too would run
              two tweens on one node. */}
          <blockquote
            ref={statementRef}
            data-reveal
            className={cn(DISPLAY, 'col-span-12 max-w-[16ch] text-ink lg:col-span-5 lg:text-canvas')}
          >
            {statementLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </blockquote>

          <p
            data-reveal-item
            className="col-span-12 max-w-[46ch] font-body text-[0.9375rem] leading-[1.75] text-muted lg:col-span-5 lg:col-start-8 lg:ml-auto lg:max-w-[42ch] lg:text-right lg:text-canvas/75"
          >
            {body}
          </p>
        </figcaption>
      </figure>
    </section>
  )
}
