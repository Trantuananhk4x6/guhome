'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { useImageReveal } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { formatDate } from '@/lib/utils'
import type { ArticleSummary } from '@/types/content'

import { SectionImage } from './SectionImage'
import { sectionLines, sectionText } from './content'
import type { HomeSectionProps } from './types'

function JournalCard({ article, index }: { article: ArticleSummary; index: number }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useImageReveal(frameRef, { variant: 'revealClip' })
  useTextReveal(titleRef, { by: 'line', delay: 0.1 })
  useReveal(metaRef, { variant: 'revealUp', delay: 0.15, stagger: 0.06 })

  const date = formatDate(article.publishedAt)
  const minutes = article.readingMinutes ? `${article.readingMinutes} phút đọc` : null

  return (
    <article>
      <Link
        href={`/journal/${article.slug}`}
        className="group flex flex-col gap-7 outline-offset-8"
        aria-label={`Đọc bài viết ${article.title}`}
      >
        <div ref={frameRef} className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
            <SectionImage
              media={article.cover}
              alt={article.title}
              sizes="(min-width: 768px) 31vw, 100vw"
              width={1200}
            />
          </div>
        </div>

        <h3 ref={titleRef} data-reveal className="u-display-sm text-ink">
          {article.title}
        </h3>

        <div ref={metaRef} data-reveal className="flex flex-col gap-5">
          <Label data-reveal-item index={index + 1}>
            {[date, minutes].filter((value): value is string => Boolean(value)).join(' · ')}
          </Label>

          {article.excerpt ? (
            <p data-reveal-item className="u-body-lg line-clamp-3">
              {article.excerpt}
            </p>
          ) : null}

          <span data-reveal-item className="u-label inline-flex items-center gap-3 text-ink">
            Đọc tiếp
            <ArrowUpRightIcon className="text-base transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
          </span>
        </div>
      </Link>
    </article>
  )
}

/** The three most recent journal entries. */
export function Journal({ section, data }: HomeSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef, { variant: 'revealUp' })

  const articles = data.articles.slice(0, 3)
  if (articles.length === 0) return null

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Journal')
  const headingLines = sectionLines(content, 'heading', 'Ghi chép')
  const lead = sectionText(content, 'body', '')

  return (
    <section data-home-section="JOURNAL" className="u-gutter bg-canvas py-[var(--spacing-section)]">
      <div ref={headingRef} data-reveal>
        <SectionHeading
          eyebrow={eyebrow}
          size="sm"
          title={headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          lead={lead.length > 0 ? lead : undefined}
          action={
            <Button href="/journal" variant="underline" withArrow>
              Tất cả bài viết
            </Button>
          }
        />
      </div>

      <div className="mt-[clamp(3rem,8vh,6rem)] grid grid-cols-1 gap-x-8 gap-y-16 border-t border-line pt-[clamp(2.5rem,6vh,4.5rem)] md:grid-cols-3">
        {articles.map((article, index) => (
          <JournalCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  )
}
