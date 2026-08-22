/**
 * The foot of /projects: which page of the catalogue you are on, and the way to
 * the next one.
 *
 * WHY THIS EXISTS. The index rendered all 105 published projects into one
 * document — 34,244px on a 1600×1000 desktop and 35,604px at 390 wide, about
 * 34 and 42 full screens (docs/ui-after/measurements.json). The homepage's
 * primary call to action points at that page. There was no pagination, no
 * load-more and no `page=` parameter, so a visitor who wanted project 80 had to
 * scroll continuously past seventy-nine others, and on a phone that is one card
 * per screen, a hundred and five times.
 *
 * Real URLs rather than a button. `/projects?page=3` is linkable, crawlable,
 * survives a back button and needs no JavaScript — the same reasoning that made
 * the category filter a set of plain links. Page one carries no parameter at
 * all, so the canonical index URL stays `/projects`.
 *
 * The window is `01 … 04 05 06 … 12`, never a run of every page: the catalogue
 * is data and it grows. At today's five pages the ellipses never appear, which
 * is the correct behaviour for five and still the correct behaviour at fifty.
 */

import Link from 'next/link'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons'
import { cn, pad2 } from '@/lib/utils'

export interface IndexPagerProps {
  /** 1-based, already clamped by the page. */
  page: number
  pages: number
  /** 1-based editorial number of the first project on this page. */
  from: number
  /** Projects on this page, for the record line. */
  showing: number
  /** Projects in the current view — the whole run, or one category's. */
  total: number
  /** Active category slug, carried through every href. */
  category: string | null
  className?: string
}

type Slot = number | 'gap'

/**
 * First, last, and the current page with a neighbour each side. Anything the
 * window skips collapses to one ellipsis, so the control is a fixed width
 * whether the catalogue holds five pages or fifty.
 */
export function pageWindow(page: number, pages: number): Slot[] {
  const wanted = new Set<number>([1, pages, page - 1, page, page + 1])
  const kept = [...wanted].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b)

  const slots: Slot[] = []
  let previous = 0
  for (const n of kept) {
    if (previous !== 0 && n - previous > 1) slots.push('gap')
    slots.push(n)
    previous = n
  }
  return slots
}

/** Page 1 drops the parameter entirely so the index keeps one canonical URL. */
function hrefFor(page: number, category: string | null) {
  const query: Record<string, string> = {}
  if (category) query.category = category
  if (page > 1) query.page = String(page)
  return { pathname: '/projects', query }
}

function Step({
  page,
  category,
  label,
  side,
}: {
  page: number | null
  category: string | null
  label: string
  side: 'prev' | 'next'
}) {
  const Icon = side === 'prev' ? ArrowLeftIcon : ArrowRightIcon

  // The disabled edge stays in the layout rather than disappearing: on page one
  // and on the last page the control would otherwise jump sideways by the width
  // of a word, which reads as the page reflowing rather than as an end of run.
  if (page === null) {
    return (
      <span aria-hidden="true" className="u-label text-muted/30 flex items-center gap-2">
        {side === 'prev' ? <Icon className="text-base" /> : null}
        {label}
        {side === 'next' ? <Icon className="text-base" /> : null}
      </span>
    )
  }

  return (
    <Link
      href={hrefFor(page, category)}
      rel={side === 'prev' ? 'prev' : 'next'}
      className="group/step u-label text-ink hover:text-accent flex items-center gap-2 transition-colors duration-500"
    >
      {side === 'prev' ? (
        <Icon className="ease-editorial text-base transition-transform duration-500 group-hover/step:-translate-x-1" />
      ) : null}
      {label}
      {side === 'next' ? (
        <Icon className="ease-editorial text-base transition-transform duration-500 group-hover/step:translate-x-1" />
      ) : null}
    </Link>
  )
}

export function IndexPager({ page, pages, from, showing, total, category, className }: IndexPagerProps) {
  if (pages <= 1) return null

  const slots = pageWindow(page, pages)

  return (
    <nav
      aria-label="Phân trang dự án"
      className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}
    >
      <div className="border-line flex flex-col gap-6 border-t pt-7 md:flex-row md:items-baseline md:justify-between md:gap-10">
        {/* The record line, in the register the index rows already use: where
            you are, and how much of the catalogue that is. */}
        <p className="u-label">
          Trang {pad2(page)} / {pad2(pages)}
          <span className="text-muted/60"> · </span>
          {pad2(from)}–{pad2(from + showing - 1)} trong {total} dự án
        </p>

        <div className="flex items-baseline justify-between gap-6 md:justify-end md:gap-10">
          <Step page={page > 1 ? page - 1 : null} category={category} label="Trước" side="prev" />

          {/* Hidden on the narrowest measure, where six numerals beside two
              words is more control than a phone needs: Trước / Sau plus the
              record line above already say where in the run you are. */}
          <ol className="hidden items-baseline gap-4 xs:flex">
            {slots.map((slot, i) =>
              slot === 'gap' ? (
                <li key={`gap-${i}`} aria-hidden="true" className="u-label text-muted/40">
                  …
                </li>
              ) : (
                <li key={slot}>
                  <Link
                    href={hrefFor(slot, category)}
                    aria-current={slot === page ? 'page' : undefined}
                    aria-label={`Trang ${slot}`}
                    className={cn(
                      'u-label relative block tabular-nums transition-colors duration-500',
                      slot === page ? 'text-accent' : 'text-muted hover:text-ink',
                    )}
                  >
                    {pad2(slot)}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'bg-accent absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-500 ease-editorial',
                        slot === page ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              ),
            )}
          </ol>

          <Step page={page < pages ? page + 1 : null} category={category} label="Sau" side="next" />
        </div>
      </div>
    </nav>
  )
}
