/**
 * The filter strip above the project index.
 *
 * Deliberately a *server* component: every control is either a link or a field
 * inside a plain GET form, so the whole filter state lives in the URL, survives
 * a reload, can be bookmarked, and keeps working without JavaScript. No
 * `useSearchParams`, therefore no Suspense boundary needed.
 */

import Link from 'next/link'

import { AdminInput, AdminSelect, type AdminSelectOption } from '@/components/admin/FormRow'
import { adminButtonClass } from '@/components/admin/AdminShell'
import { publishStatusLabel } from '@/components/admin/StatusPill'
import { Toolbar, ToolbarCount, ToolbarGroup } from '@/components/admin/Toolbar'
import { cn } from '@/lib/utils'
import type { PublishStatus } from '@/types/content'

import type { AdminProjectCounts, AdminProjectSort, ProjectCategoryOption } from '../queries'

const BASE_PATH = '/admin/projects'

const STATUS_TABS: readonly (PublishStatus | 'all')[] = ['all', 'published', 'draft', 'archived']

const SORT_OPTIONS: readonly AdminSelectOption[] = [
  { value: 'updated', label: 'Mới cập nhật' },
  { value: 'order', label: 'Thứ tự thủ công' },
  { value: 'title', label: 'Tên A → Z' },
  { value: 'year', label: 'Năm gần nhất' },
]

const FEATURED_OPTIONS: readonly AdminSelectOption[] = [
  { value: '', label: 'Mọi dự án' },
  { value: '1', label: 'Đang nổi bật' },
  { value: '0', label: 'Chưa nổi bật' },
]

function tabLabel(value: PublishStatus | 'all'): string {
  return value === 'all' ? 'Tất cả' : publishStatusLabel(value)
}

function buildHref(params: Readonly<Record<string, string | undefined>>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' && value.length > 0) search.set(key, value)
  }
  const query = search.toString()
  return query.length > 0 ? `${BASE_PATH}?${query}` : BASE_PATH
}

export interface ProjectToolbarProps {
  status: PublishStatus | 'all'
  counts: AdminProjectCounts
  categories: readonly ProjectCategoryOption[]
  categorySlug: string
  /** `''` all · `'1'` featured only · `'0'` not featured. */
  featured: string
  search: string
  sort: AdminProjectSort
  total: number
}

export function ProjectToolbar({
  status,
  counts,
  categories,
  categorySlug,
  featured,
  search,
  sort,
  total,
}: ProjectToolbarProps) {
  // Filters carried across a tab change — paging is intentionally dropped.
  const carried = {
    category: categorySlug,
    featured,
    q: search,
    sort: sort === 'updated' ? undefined : sort,
  }

  const categoryOptions: AdminSelectOption[] = categories.map((category) => ({
    value: category.slug,
    label: category.projectCount > 0 ? `${category.name} (${category.projectCount})` : category.name,
  }))

  return (
    <div className="flex flex-col gap-4">
      <Toolbar>
        <nav aria-label="Lọc theo trạng thái" className="flex flex-wrap items-center gap-5">
          {STATUS_TABS.map((value) => {
            const active = value === status
            return (
              <Link
                key={value}
                href={buildHref({ ...carried, status: value === 'all' ? undefined : value })}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'u-label border-b pb-1 transition-colors duration-200',
                  active ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink',
                )}
              >
                {tabLabel(value)} <span className="text-accent tabular-nums">{counts[value]}</span>
              </Link>
            )
          })}
        </nav>

        <form method="get" action={BASE_PATH} className="flex flex-wrap items-end gap-2">
          {status === 'all' ? null : <input type="hidden" name="status" value={status} />}

          <label className="min-w-0">
            <span className="sr-only">Tìm dự án</span>
            <AdminInput
              type="search"
              name="q"
              defaultValue={search}
              placeholder="Tìm theo tên, slug, khu vực"
              className="w-56"
            />
          </label>

          <label className="min-w-0">
            <span className="sr-only">Danh mục</span>
            <AdminSelect
              name="category"
              defaultValue={categorySlug}
              placeholder="Mọi danh mục"
              options={categoryOptions}
              className="w-44"
            />
          </label>

          <label className="min-w-0">
            <span className="sr-only">Nổi bật</span>
            <AdminSelect name="featured" defaultValue={featured} options={FEATURED_OPTIONS} className="w-36" />
          </label>

          <label className="min-w-0">
            <span className="sr-only">Sắp xếp</span>
            <AdminSelect name="sort" defaultValue={sort} options={SORT_OPTIONS} className="w-40" />
          </label>

          <button type="submit" className={adminButtonClass('outline')}>
            Lọc
          </button>
        </form>
      </Toolbar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ToolbarCount>
          {total} dự án{search.length > 0 ? ` · từ khoá “${search}”` : ''}
        </ToolbarCount>

        {search.length > 0 || categorySlug.length > 0 || featured.length > 0 || sort !== 'updated' ? (
          <ToolbarGroup>
            <Link
              href={buildHref({ status: status === 'all' ? undefined : status })}
              className="u-label text-muted transition-colors duration-200 hover:text-ink"
            >
              Xoá bộ lọc
            </Link>
          </ToolbarGroup>
        ) : null}
      </div>
    </div>
  )
}
