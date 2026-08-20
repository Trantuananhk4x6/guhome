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

import { BAND_T, DISPLAY_SM, SECTION_T } from './composition'
import { sectionLines, sectionText } from './content'
import type { HomeSectionProps } from './types'

/**
 * One entry: a title, a date, an excerpt, hanging off a rule. No frame, ever —
 * covers belong on /journal. Keeping this typographic is also what stops the
 * section growing by 350px the day someone uploads an article image.
 *
 * The rule belongs to the ROW, not to the entry: three separate hairlines rhymed
 * too closely with the five row rules in SERVICES directly above, and one
 * continuous rule with three columns hanging off it is the ninety-degree
 * rotation this section claims to be. At one column that rotation is meaningless
 * and the rule reverts to the entry, or the first article would carry the only
 * line and the other two would float.
 */
function JournalEntry({ article, index }: { article: ArticleSummary; index: number }) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useTextReveal(titleRef, { by: 'line', delay: 0.1 })
  useReveal(metaRef, { variant: 'revealUp', delay: 0.15, stagger: 0.06 })

  const date = formatDate(article.publishedAt)
  const minutes = article.readingMinutes ? `${article.readingMinutes} phút đọc` : null

  return (
    <article className="border-line max-md:border-t">
      <Link
        href={`/journal/${article.slug}`}
        className="group flex flex-col gap-5 pt-6 outline-offset-8 md:pt-8"
        aria-label={`Đọc bài viết ${article.title}`}
      >
        <h3
          ref={titleRef}
          data-reveal
          className={cn(
            DISPLAY_SM,
            'text-ink transition-colors duration-500 ease-editorial group-hover:text-accent group-focus-visible:text-accent',
          )}
        >
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
    // `bg-surface`, because SERVICES above has moved to canvas: the measure
    // narrowing by 112px and the ground changing then say the same thing at the
    // same moment — the argument is ending. And the bottom padding is cut from
    // 110px to 50px: the CTA's own 240px of photograph does the separating, and
    // 110px of oat on top of it was a third of a viewport of nothing across the
    // page's last ground change. Not `pb-0` as scored — StudioIntro can land a
    // hairline flush on the next section's photograph, but this section's last
    // mark is a text baseline, and a label jammed against an espresso edge is
    // the defect it would be fixing. 50px also lands nearer the 0.68 target.
    <section
      data-home-section="JOURNAL"
      className={cn('u-gutter bg-surface pb-[clamp(2rem,5vh,3.5rem)]', SECTION_T)}
    >
      <div className="mx-auto w-full max-w-[110rem] lg:px-14">
        {/*
          A RAIL, NOT A BLOCK. This header and SERVICES' emitted the byte-identical
          container `grid grid-cols-12 items-end gap-x-8 gap-y-8` — two sections
          with the same header markup is the template tell in its purest form. The
          two now differ in every dimension that reads: SERVICES has a bottom rule,
          a 70px heading and left weight; this has a top rule, a 44px heading,
          `items-start`, and its eyebrow pulled out of the heading column into its
          own two columns so nothing sits above the heading at all.
        */}
        <div
          ref={headingRef}
          data-reveal
          className="grid grid-cols-12 items-start gap-x-8 gap-y-6 border-t border-line pt-6"
        >
          <Label className="col-span-12 lg:col-span-2">{eyebrow}</Label>

          <h2 className={cn(DISPLAY_SM, 'col-span-12 text-ink lg:col-span-5 lg:col-start-3')}>
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          {lead.length > 0 ? (
            <p className="u-body-lg col-span-12 max-w-[46ch] lg:col-span-3 lg:col-start-8">{lead}</p>
          ) : null}

          <div className="col-span-12 lg:col-span-2 lg:col-start-11 lg:justify-self-end">
            <Button href="/journal" variant="underline" withArrow>
              Tất cả bài viết
            </Button>
          </div>
        </div>

        <div
          className={cn(
            'grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3 md:gap-y-0 md:border-t md:border-line',
            BAND_T,
          )}
        >
          {articles.map((article, index) => (
            <JournalEntry key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
