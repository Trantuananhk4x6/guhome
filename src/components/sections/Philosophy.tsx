'use client'

import { useRef } from 'react'

import { useParallax } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'

import { SectionImage } from './SectionImage'
import { sectionLines, sectionOptionalText, sectionText } from './content'
import type { HomeSectionProps } from './types'

/** A held breath between sections: one statement, one hairline, one material. */
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

  // A caption is one short line. The material note that used to be folded into
  // it ran two full-bleed lines of 11px uppercase — unreadable as a label, so it
  // is set below as body copy on a magazine measure.
  const captionOverride = sectionOptionalText(content, 'caption')
  const caption = captionOverride ?? material?.name ?? 'Chi tiết vật liệu'
  const captionNote = captionOverride ? null : (material?.description ?? null)
  const alt = captionNote ? `${caption} — ${captionNote}` : caption

  return (
    <section data-home-section="PHILOSOPHY" className="bg-surface py-[var(--spacing-section)]">
      <div className="u-gutter flex flex-col items-start gap-9">
        <Label rule>{eyebrow}</Label>

        <blockquote ref={statementRef} data-reveal className="u-display max-w-[18ch] text-ink">
          {statementLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>

        <div ref={noteRef} data-reveal className="flex w-full flex-col items-start gap-8">
          <span data-reveal-item className="block w-36">
            <Rule tone="accent" />
          </span>
          <p data-reveal-item className="u-body-lg max-w-[52ch]">
            {body}
          </p>
        </div>
      </div>

      <figure className="mt-[clamp(4rem,11vh,8rem)]">
        <div
          ref={frameRef}
          data-reveal
          className="relative isolate aspect-[16/9] w-full overflow-hidden bg-surface-alt md:aspect-[16/6]"
        >
          <span data-reveal-media className="absolute inset-x-0 top-[-8%] bottom-[-8%] block">
            <SectionImage media={image} alt={alt} sizes="100vw" width={2400} />
          </span>
        </div>
        <figcaption className="u-gutter mt-5 flex flex-col gap-3">
          <span className="u-label">{caption}</span>
          {captionNote ? (
            <p className="max-w-[58ch] font-body text-[0.9375rem] leading-relaxed text-muted">{captionNote}</p>
          ) : null}
        </figcaption>
      </figure>
    </section>
  )
}
