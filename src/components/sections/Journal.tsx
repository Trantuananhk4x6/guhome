'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { cn, formatDate } from '@/lib/utils'
import type { ArticleSummary } from '@/types/content'

import { BAND_T, DISPLAY_SM, SECTION_Y } from './composition'
import { sectionLines, sectionText } from './content'
import type { HomeSectionProps } from './types'

/**
 * One entry: a hairline, a title, a date, an excerpt. No frame, ever — covers
 * belong on /journal. Keeping this typographic is also what stops the section
 * growing by 350px the day someone uploads an article image.
 */
function JournalEntry({ article, index }: { article: ArticleSummary; index: number }) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useTextReveal(titleRef, { by: 'line', delay: 0.1 })
  useReveal(metaRef, { variant: 'revealUp', delay: 0.15, stagger: 0.06 })

  const date = formatDate(article.publishedAt)
  const minutes = article.readingMinutes ? `${article.readingMinutes} phút đọc` : null

  return (
    <article>
      <Link
        href={`/journal/${article.slug}`}
        className="group flex flex-col gap-5 outline-offset-8"
        aria-label={`Đọc bài viết ${article.title}`}
      >
        <span
          aria-hidden="true"
          className="block h-px w-full origin-left bg-line transition-colors duration-500 ease-editorial group-hover:bg-accent group-focus-visible:bg-accent"
        />

        <h3 ref={titleRef} data-reveal className={cn(DISPLAY_SM, 'text-ink')}>
          {article.title}
        </h3>

        <div ref={metaRef} data-reveal className="flex flex-col gap-4">
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

/**
 * The page's second index, rotated ninety degrees from the service list: that
 * one runs down, this one runs across, and the rhyme between them is what makes
 * both read as one editor's work.
 *
 * It also sits INSET where SERVICES ran to the gutter — the measure visibly
 * narrowing is how the reader feels the argument ending.
 */
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
    <section data-home-section="JOURNAL" className={cn('u-gutter bg-canvas', SECTION_Y)}>
      <div className="mx-auto w-full max-w-[110rem] lg:px-14">
        <div ref={headingRef} data-reveal className="grid grid-cols-12 items-end gap-x-8 gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <Label rule>{eyebrow}</Label>
            <h2 className={cn(DISPLAY_SM, 'mt-7 max-w-[16ch] text-ink')}>
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {lead.length > 0 ? (
            <p className="u-body-lg col-span-12 max-w-[46ch] lg:col-span-4 lg:col-start-7">{lead}</p>
          ) : null}

          <div className="col-span-12 lg:col-span-2 lg:col-start-11 lg:justify-self-end">
            <Button href="/journal" variant="underline" withArrow>
              Tất cả bài viết
            </Button>
          </div>
        </div>

        <div className={cn('grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3', BAND_T)}>
          {articles.map((article, index) => (
            <JournalEntry key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
