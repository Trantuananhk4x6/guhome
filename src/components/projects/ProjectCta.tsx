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
      <div className="u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 ref={headingRef} data-reveal className="u-display text-canvas max-w-[14ch]">
            {heading}
          </h2>
        </div>

        <div ref={bodyRef} data-reveal className="flex flex-col gap-10 lg:col-span-5 lg:pt-4">
          {body ? (
            <p data-reveal data-reveal-item className="text-canvas/60 max-w-[46ch] text-[1.0625rem] leading-[1.75]">
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
