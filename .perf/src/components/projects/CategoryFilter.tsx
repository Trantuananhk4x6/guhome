/**
 * Category filter for /projects. Plain links that write `?category=` into the
 * URL — no client JavaScript, so the filtered index is shareable, crawlable and
 * works before hydration.
 *
 * Two shapes from one markup, because the same control has two jobs at two
 * widths. At `lg` and up it is a **vertical index** in the masthead rail: name
 * on the left, project count on the right, a hairline between every pair. That
 * is the register the studio's process rows already use — several kinds of
 * information related by one grid — and it fills a 469px rail that was
 * previously a strip of six words with 400px of nothing under it. Below `lg`
 * there is no rail to fill, so it collapses to a band of labels rather than a
 * stack of rows: ~76px instead of 210px, which is what keeps a photograph
 * inside the first mobile screen.
 *
 * THE PHONE BAND WRAPS, IT DOES NOT SCROLL. It used to be one `overflow-x-auto`
 * line whose comment argued "the clipped last item is the affordance". Shot at
 * 390 (docs/ui-after/m-projects-00000.png) that reads as a broken layout, not as
 * an invitation: the strip ends `TẤT CẢ | CĂN HỘ | NHÀ PHỐ | BIỆT THỰ & I`, a
 * word bisected flush against the glass with no fade, no sliver of a next item
 * and no scrollbar — and two of the six categories, THƯƠNG MẠI and KHÔNG GIAN
 * CHUYÊN BIỆT, are off-screen with nothing at all to say they exist.
 *
 * A fade over the last 32px would have made the clipping deliberate without
 * making the two hidden categories reachable by anything but a guess. Wrapping
 * costs ~36px of height and shows the whole taxonomy, so the one control that
 * can shorten a 105-project index is fully legible on the device where the
 * index is longest. `whitespace-nowrap` stays on each label, so the band breaks
 * BETWEEN names and never inside one.
 *
 * The counts come with it. They were `hidden lg:inline`, which is backwards:
 * the figures are what tell a visitor that CĂN HỘ is 41 projects and BIỆT THỰ
 * is 3, and that is worth more on the phone — where the run is 42 screens —
 * than on the desktop where the whole index is a scroll away.
 */

import Link from 'next/link'

import { cn } from '@/lib/utils'

export interface CategoryOption {
  slug: string
  name: string
  /** Published projects in this category. Omitted = no figure printed. */
  count?: number
}

export interface CategoryFilterProps {
  categories: readonly CategoryOption[]
  /** `null` = the "Tất cả" pseudo-option. */
  active: string | null
  /** Total across every category, printed against "Tất cả". */
  total?: number
  className?: string
}

function Row({
  href,
  name,
  count,
  isActive,
}: {
  href: string | { pathname: string; query: Record<string, string> }
  name: string
  count: number | undefined
  isActive: boolean
}) {
  return (
    <li className="lg:border-line lg:border-t lg:last:border-b">
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group/filter u-label relative flex items-baseline gap-2 pb-2 whitespace-nowrap transition-colors duration-500 ease-editorial',
          'lg:w-full lg:items-center lg:justify-between lg:gap-4 lg:py-3.5 lg:whitespace-normal',
          isActive ? 'text-ink' : 'text-muted hover:text-ink',
        )}
      >
        <span className="lg:pr-4">{name}</span>

        {count === undefined ? null : (
          <span
            className={cn(
              'tabular-nums transition-colors duration-500',
              isActive ? 'text-accent' : 'text-muted/70',
            )}
          >
            {count}
          </span>
        )}

        {/* Mobile only: the strip has no hairlines to carry the active state. */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500 ease-editorial lg:hidden',
            isActive ? 'bg-accent scale-x-100' : 'bg-ink scale-x-0 group-hover/filter:scale-x-100',
          )}
        />
      </Link>
    </li>
  )
}

export function CategoryFilter({ categories, active, total, className }: CategoryFilterProps) {
  return (
    <nav aria-label="Lọc dự án theo hạng mục" className={className}>
      <ul
        className={cn(
          'flex flex-wrap items-baseline gap-x-6 gap-y-3 pb-1',
          'lg:flex-col lg:flex-nowrap lg:items-stretch lg:gap-x-0 lg:gap-y-0 lg:pb-0',
        )}
      >
        <Row href="/projects" name="Tất cả" count={total} isActive={active === null} />

        {categories.map((category) => (
          <Row
            key={category.slug}
            href={{ pathname: '/projects', query: { category: category.slug } }}
            name={category.name}
            count={category.count}
            isActive={active === category.slug}
          />
        ))}
      </ul>
    </nav>
  )
}
