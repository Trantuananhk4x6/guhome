/**
 * `/admin/projects` — the project index.
 *
 * Everything that shapes the list (status, category, featured, search, sort,
 * page) is read from `searchParams` and answered on the server, so a filtered
 * view is a plain URL an editor can bookmark or send to a colleague. Only the
 * two genuinely interactive bits — the featured switch and the row actions —
 * are client components.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable'
import { EmptyState } from '@/components/admin/EmptyState'
import { MediaThumb } from '@/components/admin/MediaThumb'
import { Pagination } from '@/components/admin/Pagination'
import { PublishStatusPill } from '@/components/admin/StatusPill'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { formatDate } from '@/lib/utils'
import { requireUser } from '@/server/auth'
import type { PublishStatus } from '@/types/content'

import { FeaturedToggle } from './_components/FeaturedToggle'
import { ProjectRowActions } from './_components/ProjectRowActions'
import { ProjectToolbar } from './_components/ProjectToolbar'
import {
  ADMIN_PROJECT_SORTS,
  countAdminProjects,
  countAdminProjectsByStatus,
  listAdminProjects,
  listProjectCategories,
  type AdminProjectRow,
  type AdminProjectSort,
} from './queries'

export const metadata: Metadata = { title: 'Dự án' }
export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20

type SearchParams = Record<string, string | string[] | undefined>

interface ProjectsPageProps {
  searchParams: Promise<SearchParams>
}

function single(params: SearchParams, key: string): string {
  const value = params[key]
  if (Array.isArray(value)) return value[0]?.trim() ?? ''
  return value?.trim() ?? ''
}

function readStatus(value: string): PublishStatus | 'all' {
  if (value === 'draft' || value === 'published' || value === 'archived') return value
  return 'all'
}

function readSort(value: string): AdminProjectSort {
  return ADMIN_PROJECT_SORTS.find((sort) => sort === value) ?? 'updated'
}

function readPage(value: string): number {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 1 ? parsed : 1
}

/** `'1'` featured only · `'0'` not featured · anything else means no filter. */
function readFeatured(value: string): boolean | undefined {
  if (value === '1') return true
  if (value === '0') return false
  return undefined
}

const EM_DASH = <span className="font-body text-[0.75rem] text-muted/60">—</span>

export default async function AdminProjectsPage({ searchParams }: ProjectsPageProps) {
  await requireUser()

  const params = await searchParams
  const status = readStatus(single(params, 'status'))
  const categorySlug = single(params, 'category')
  const featuredParam = single(params, 'featured')
  const featured = readFeatured(featuredParam)
  const search = single(params, 'q')
  const sort = readSort(single(params, 'sort'))

  const filter = { status, categorySlug, featured, search, sort }

  const [total, counts, categoryOptions] = await Promise.all([
    countAdminProjects(filter),
    countAdminProjectsByStatus({ categorySlug, featured, search }),
    listProjectCategories(),
  ])

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(readPage(single(params, 'page')), pageCount)

  const rows = await listAdminProjects({
    ...filter,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  })

  const filtering = search.length > 0 || categorySlug.length > 0 || featured !== undefined || status !== 'all'

  const columns: DataTableColumn<AdminProjectRow>[] = [
    {
      key: 'cover',
      header: 'Ảnh',
      width: '5.5rem',
      cell: (row) => <MediaThumb media={row.cover} size="sm" alt="" />,
    },
    {
      key: 'project',
      header: 'Dự án',
      cell: (row) => (
        <div className="flex min-w-0 flex-col gap-1">
          <Link
            href={`/admin/projects/${row.id}`}
            className="font-display text-xl leading-tight text-ink transition-colors duration-200 hover:text-accent"
          >
            {row.title}
          </Link>
          <span className="font-body text-[0.75rem] text-muted">/projects/{row.slug}</span>
          {row.subtitle ? (
            <span className="max-w-[48ch] font-body text-[0.8125rem] leading-relaxed text-muted">
              {row.subtitle}
            </span>
          ) : null}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Danh mục',
      width: '9rem',
      cell: (row) =>
        row.categoryName && row.categorySlug ? (
          <Link
            href={`/admin/projects?category=${row.categorySlug}`}
            className="font-body text-[0.8125rem] text-muted transition-colors duration-200 hover:text-ink"
          >
            {row.categoryName}
          </Link>
        ) : (
          EM_DASH
        ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      width: '8.5rem',
      cell: (row) => <PublishStatusPill status={row.status} />,
    },
    {
      key: 'featured',
      header: 'Nổi bật',
      width: '6rem',
      align: 'center',
      cell: (row) => (
        <div className="flex justify-center">
          <FeaturedToggle id={row.id} featured={row.featured} title={row.title} />
        </div>
      ),
    },
    {
      key: 'meta',
      header: 'Năm',
      width: '8rem',
      cell: (row) => (
        <div className="flex flex-col gap-1">
          <span className="font-body text-[0.8125rem] tabular-nums text-ink">{row.year ?? '—'}</span>
          {row.location ? (
            <span className="font-body text-[0.75rem] leading-4 text-muted">{row.location}</span>
          ) : null}
        </div>
      ),
    },
    {
      key: 'updated',
      header: 'Cập nhật',
      width: '7.5rem',
      cell: (row) => (
        <span className="font-body text-[0.8125rem] tabular-nums text-muted">{formatDate(row.updatedAt)}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Thao tác',
      width: '13rem',
      cell: (row) => (
        <ProjectRowActions id={row.id} title={row.title} slug={row.slug} status={row.status} />
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-10 pb-16">
      <AdminPageHeader
        eyebrow="Projects"
        title="Dự án"
        description="Toàn bộ hồ sơ công trình của studio — cả bản nháp lẫn bản đã xuất bản. Lọc, tìm và mở từng dự án để sửa nội dung, bố cục khối và thư viện ảnh."
        actions={
          <>
            <Link href="/admin/projects/new" className={adminButtonClass('solid')}>
              Dự án mới
            </Link>
            <Link href="/projects" className={adminButtonClass('outline')}>
              Xem trang dự án
            </Link>
          </>
        }
      />

      <div className="flex flex-col gap-6">
        <ProjectToolbar
          status={status}
          counts={counts}
          categories={categoryOptions}
          categorySlug={categorySlug}
          featured={featuredParam === '1' || featuredParam === '0' ? featuredParam : ''}
          search={search}
          sort={sort}
          total={total}
        />

        {rows.length === 0 ? (
          <EmptyState
            title={filtering ? 'Không có dự án nào khớp' : 'Chưa có dự án nào'}
            description={
              filtering
                ? 'Thử nới bộ lọc, đổi danh mục hoặc xoá từ khoá tìm kiếm.'
                : 'Bắt đầu bằng một hồ sơ công trình: đặt tên, chọn danh mục, rồi dựng bố cục trong trình soạn thảo.'
            }
            action={
              filtering ? (
                <Link href="/admin/projects" className={adminButtonClass('outline')}>
                  Xoá bộ lọc
                </Link>
              ) : (
                <Link href="/admin/projects/new" className={adminButtonClass('solid')}>
                  Tạo dự án đầu tiên
                </Link>
              )
            }
          />
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={rows}
              getKey={(row) => row.id}
              caption="Danh sách dự án"
              minWidth="72rem"
            />

            <Pagination
              page={page}
              pageCount={pageCount}
              basePath="/admin/projects"
              total={total}
              params={{
                status: status === 'all' ? undefined : status,
                category: categorySlug,
                featured: featuredParam === '1' || featuredParam === '0' ? featuredParam : undefined,
                q: search,
                sort: sort === 'updated' ? undefined : sort,
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
