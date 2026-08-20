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
 * there is no rail to fill, so it collapses to a single scrollable line of
 * labels: 40px instead of 210px, which is what keeps a photograph inside the
 * first mobile screen.
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
    <li className="shrink-0 lg:border-line lg:shrink lg:border-t lg:last:border-b">
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group/filter u-label relative flex items-center gap-4 pb-2 whitespace-nowrap transition-colors duration-500 ease-editorial',
          'lg:w-full lg:justify-between lg:py-3.5 lg:whitespace-normal',
          isActive ? 'text-ink' : 'text-muted hover:text-ink',
        )}
      >
        <span className="lg:pr-4">{name}</span>

        {count === undefined ? null : (
          <span
            className={cn(
              'hidden tabular-nums transition-colors duration-500 lg:inline',
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
          'flex flex-nowrap items-end gap-x-7 overflow-x-auto pb-1',
          // The strip is a filter, not a scroll region: a visible bar under six
          // words reads as a control. The clipped last item is the affordance.
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'lg:flex-col lg:items-stretch lg:gap-x-0 lg:overflow-visible lg:pb-0',
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
