import Link from 'next/link'

import { cn } from '@/lib/utils'

export interface PaginationProps {
  /** 1-based. */
  page: number
  pageCount: number
  /** Path the links point at, e.g. `/admin/projects`. */
  basePath: string
  /** Extra query params carried across pages (search, filters). */
  params?: Readonly<Record<string, string | undefined>>
  /** Query key used for the page number. */
  pageParam?: string
  total?: number
  className?: string
}

function buildHref(
  basePath: string,
  params: Readonly<Record<string, string | undefined>>,
  pageParam: string,
  page: number,
): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' && value.length > 0) search.set(key, value)
  }
  if (page > 1) search.set(pageParam, String(page))
  const query = search.toString()
  return query.length > 0 ? `${basePath}?${query}` : basePath
}

/** Windowed page numbers with ellipsis markers (`null`). */
function pageWindow(page: number, pageCount: number): (number | null)[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const out: (number | null)[] = [1]
  const from = Math.max(2, page - 1)
  const to = Math.min(pageCount - 1, page + 1)
  if (from > 2) out.push(null)
  for (let i = from; i <= to; i++) out.push(i)
  if (to < pageCount - 1) out.push(null)
  out.push(pageCount)
  return out
}

/** Link-based pagination — works without JavaScript, state lives in the URL. */
export function Pagination({
  page,
  pageCount,
  basePath,
  params = {},
  pageParam = 'page',
  total,
  className,
}: PaginationProps) {
  if (pageCount <= 1) {
    return total !== undefined ? (
      <p className={cn('u-label py-4 text-muted', className)}>{total} mục</p>
    ) : null
  }

  const current = Math.min(Math.max(page, 1), pageCount)
  const items = pageWindow(current, pageCount)

  const linkClass = (active: boolean) =>
    cn(
      'u-label inline-flex h-8 min-w-8 items-center justify-center border px-2 text-[0.5625rem] transition-colors duration-200',
      active ? 'border-ink bg-ink text-canvas' : 'border-line text-muted hover:border-ink hover:text-ink',
    )

  return (
    <nav
      aria-label="Phân trang"
      className={cn('flex flex-wrap items-center justify-between gap-4 py-4', className)}
    >
      <p className="u-label text-muted">
        Trang {current} / {pageCount}
        {total !== undefined ? ` · ${total} mục` : ''}
      </p>

      <div className="flex items-center gap-1">
        {current > 1 ? (
          <Link href={buildHref(basePath, params, pageParam, current - 1)} className={linkClass(false)}>
            Trước
          </Link>
        ) : (
          <span className={cn(linkClass(false), 'pointer-events-none opacity-40')}>Trước</span>
        )}

        {items.map((item, index) =>
          item === null ? (
            <span key={`gap-${index}`} className="u-label px-1 text-muted">
              …
            </span>
          ) : (
            <Link
              key={item}
              href={buildHref(basePath, params, pageParam, item)}
              aria-current={item === current ? 'page' : undefined}
              className={linkClass(item === current)}
            >
              {item}
            </Link>
          ),
        )}

        {current < pageCount ? (
          <Link href={buildHref(basePath, params, pageParam, current + 1)} className={linkClass(false)}>
            Sau
          </Link>
        ) : (
          <span className={cn(linkClass(false), 'pointer-events-none opacity-40')}>Sau</span>
        )}
      </div>
    </nav>
  )
}
