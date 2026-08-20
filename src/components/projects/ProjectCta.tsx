'use client'

/**
 * The closing invitation on a project page. Espresso band, one oversized line of
 * Cormorant, one underline call to action — the same register as the homepage
 * footer, never louder.
 */

import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

import { DISPLAY_LG } from './composition'

export interface ProjectCtaProps {
  heading?: string
  body?: string
  buttonLabel?: string
  href?: string
  className?: string
}

export function ProjectCta({
  heading = 'Bắt đầu không gian của bạn',
  body = 'Chúng tôi nhận một số lượng dự án giới hạn mỗi năm, để mỗi công trình đều được theo sát từ bản vẽ đầu tiên đến mét vuông cuối cùng.',
  buttonLabel = 'Trò chuyện cùng studio',
  href = '/contact',
  className,
}: ProjectCtaProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useTextReveal(headingRef, { by: 'line' })
  useReveal(bodyRef, { variant: 'revealUp', delay: 0.3, stagger: 0.08 })

  return (
    <section className={cn('bg-espresso py-[var(--spacing-section)]', className)}>
      <div className="u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-6">
          <h2 ref={headingRef} data-reveal className={cn(DISPLAY_LG, 'text-canvas max-w-[13ch]')}>
            {heading}
          </h2>
        </div>

        <div ref={bodyRef} data-reveal className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8">
          {body ? (
            <p data-reveal data-reveal-item className="text-canvas/70 max-w-[46ch] text-[1.0625rem] leading-[1.75]">
              {body}
            </p>
          ) : null}
          <div data-reveal data-reveal-item>
            <Button href={href} variant="ghost" tone="light" size="lg" withArrow>
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
