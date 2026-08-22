/**
 * Style filter for /projects — the second taxonomy, beside the category index.
 *
 * Plain links, exactly like `CategoryFilter`: `?style=` is written into the URL,
 * nothing here runs on the client, and every combination of the two filters is
 * a real address that can be shared, bookmarked and crawled. The two filters
 * COMPOSE — a link keeps whichever category is already active and only swaps its
 * own parameter — so `?category=can-ho&style=toi-gian` is reachable by two
 * clicks and reads as one sentence.
 *
 * A BAND, NOT A SECOND INDEX. The rail already carries the categories as a
 * vertical index with a hairline between every pair; repeating that shape under
 * it would make the masthead read as one long list of eleven equal things. The
 * styles are a wrapped band of labels with the figure in brackets — `TỐI GIẢN
 * (1)` — which is a different register at the same weight, so the rail says
 * "two ways to narrow this" instead of "one very long menu".
 *
 * The taxonomy comes from the database, never from a seed constant: the studio
 * configures its styles in /admin, and a style that exists in the admin screen
 * and not on the public filter is the defect this page exists to avoid.
 */

import Link from 'next/link'

import { cn } from '@/lib/utils'

export interface StyleOption {
  slug: string
  name: string
  /** Published projects wearing this style, within the current category. */
  count?: number
}

/** Everything the index's URL can carry. Page one drops `?page=` entirely. */
export interface ProjectsQuery {
  category?: string | null
  style?: string | null
  page?: number
}

/**
 * The one place the `/projects` URL contract is written. The page's pager and
 * both filters build their hrefs from here, so a parameter can never be dropped
 * by one control and kept by another.
 */
export function projectsHref(query: ProjectsQuery): {
  pathname: string
  query: Record<string, string>
} {
  const { category = null, style = null, page = 1 } = query
  const params: Record<string, string> = {}
  if (category) params.category = category
  if (style) params.style = style
  if (page > 1) params.page = String(page)
  return { pathname: '/projects', query: params }
}

function Chip({
  href,
  name,
  count,
  isActive,
}: {
  href: { pathname: string; query: Record<string, string> }
  name: string
  count: number | undefined
  isActive: boolean
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group/style u-label ease-editorial relative inline-flex items-baseline gap-1.5 pb-1.5 whitespace-nowrap transition-colors duration-500',
          isActive ? 'text-ink' : 'text-muted hover:text-ink',
        )}
      >
        <span>{name}</span>

        {count === undefined ? null : (
          <span
            className={cn(
              'tabular-nums transition-colors duration-500',
              isActive ? 'text-accent' : 'text-muted/70',
            )}
          >
            ({count})
          </span>
        )}

        <span
          aria-hidden="true"
          className={cn(
            'ease-editorial pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500',
            isActive ? 'bg-accent scale-x-100' : 'bg-ink scale-x-0 group-hover/style:scale-x-100',
          )}
        />
      </Link>
    </li>
  )
}

export interface StyleFilterProps {
  styles: readonly StyleOption[]
  /** `null` = every style, the "Tất cả" pseudo-option. */
  active: string | null
  /** Carried through every href so the two filters compose. */
  category?: string | null
  /** Total across the styles shown, printed against "Tất cả". */
  total?: number
  className?: string
}

export function StyleFilter({ styles, active, category = null, total, className }: StyleFilterProps) {
  // No styles configured yet: the studio has not filled the taxonomy in, and a
  // filter bar with one dead "Tất cả" chip is worse than no filter bar.
  if (styles.length === 0) return null

  return (
    <nav aria-label="Lọc dự án theo phong cách" className={className}>
      <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2.5">
        <Chip
          href={projectsHref({ category })}
          name="Tất cả"
          count={total}
          isActive={active === null}
        />

        {styles.map((style) => (
          <Chip
            key={style.slug}
            href={projectsHref({ category, style: style.slug })}
            name={style.name}
            count={style.count}
            isActive={active === style.slug}
          />
        ))}
      </ul>
    </nav>
  )
}
