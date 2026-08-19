/**
 * Category filter for /projects. A row of hairline-underlined links that write
 * `?category=` into the URL — no client JavaScript, so the filtered index is
 * shareable, crawlable and works before hydration.
 */

import Link from 'next/link'

import { cn } from '@/lib/utils'

export interface CategoryOption {
  slug: string
  name: string
}

export interface CategoryFilterProps {
  categories: readonly CategoryOption[]
  /** `null` = the "Tất cả" pseudo-option. */
  active: string | null
  className?: string
}

function itemClasses(isActive: boolean): string {
  return cn(
    'u-label relative inline-flex items-center pb-2 transition-colors duration-500 ease-editorial',
    isActive ? 'text-ink' : 'text-muted hover:text-ink',
  )
}

function Underline({ isActive }: { isActive: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500 ease-editorial',
        isActive ? 'bg-accent scale-x-100' : 'bg-ink scale-x-0 group-hover/filter:scale-x-100',
      )}
    />
  )
}

export function CategoryFilter({ categories, active, className }: CategoryFilterProps) {
  return (
    <nav aria-label="Lọc dự án theo hạng mục" className={cn('flex flex-wrap items-end gap-x-8 gap-y-4', className)}>
      <Link
        href="/projects"
        aria-current={active === null ? 'page' : undefined}
        className={cn('group/filter', itemClasses(active === null))}
      >
        Tất cả
        <Underline isActive={active === null} />
      </Link>

      {categories.map((category) => {
        const isActive = active === category.slug
        return (
          <Link
            key={category.slug}
            href={{ pathname: '/projects', query: { category: category.slug } }}
            aria-current={isActive ? 'page' : undefined}
            className={cn('group/filter', itemClasses(isActive))}
          >
            {category.name}
            <Underline isActive={isActive} />
          </Link>
        )
      })}
    </nav>
  )
}
