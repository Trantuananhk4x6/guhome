/**
 * `/admin/articles` — the journal index.
 *
 * Every filter lives in the URL so any view is linkable: `?status=`, `?q=`,
 * `?page=`. `ArticleList` owns the four status tabs and the search box and
 * pushes those params itself; this page owns the extra `scheduled` view, the
 * paging window, and the `Date` → ISO mapping the client rows declare.
 */

import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Pagination } from '@/components/admin/Pagination'
import { ArticleList, type ArticleListRow } from '@/components/admin/site/ArticleList'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { Button } from '@/components/ui/Button'
import { requireUser } from '@/server/auth'
import type { PublishStatus } from '@/types/content'

import { countAdminArticles, listAdminArticles, type AdminArticleQuery, type AdminArticleRow } from './queries'

export const metadata: Metadata = { title: 'Bài viết' }
export const dynamic = 'force-dynamic'

/** `listAdminArticles` takes a limit but no offset — paging runs over this window. */
const FETCH_LIMIT = 240
const PAGE_SIZE = 20

type SearchParams = Record<string, string | string[] | undefined>

/** `scheduled` is a subset of `published`, not a column value. */
type ListView = PublishStatus | 'all' | 'scheduled'

function single(params: SearchParams, key: string): string {
  const value = params[key]
  if (Array.isArray(value)) return value[0]?.trim() ?? ''
  return value?.trim() ?? ''
}

function readView(raw: string): ListView {
  if (raw === 'draft' || raw === 'published' || raw === 'archived' || raw === 'scheduled') return raw
  return 'all'
}

function readPage(raw: string): number {
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed > 1 ? parsed : 1
}

/** Published with a future timestamp: visible in the CMS, hidden on the site. */
function isScheduled(row: AdminArticleRow): boolean {
  if (row.status !== 'published') return false
  const stamp = row.publishedAt ?? row.scheduledAt
  if (!stamp) return false
  return stamp.getTime() > Date.now()
}

function viewHref(view: ListView, search: string): string {
  const query = new URLSearchParams()
  if (view !== 'all') query.set('status', view)
  if (search.length > 0) query.set('q', search)
  const qs = query.toString()
  return qs.length > 0 ? `/admin/articles?${qs}` : '/admin/articles'
}

/** `Date` columns become ISO strings — that is what `ArticleListRow` declares. */
function toListRow(row: AdminArticleRow): ArticleListRow {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    excerpt: row.excerpt,
    tags: row.tags,
    readingMinutes: row.readingMinutes,
    scheduledAt: row.scheduledAt?.toISOString() ?? null,
    publishedAt: row.publishedAt?.toISOString() ?? null,
    updatedAt: row.updatedAt.toISOString(),
    authorName: row.authorName,
  }
}

export default async function AdminArticlesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await requireUser()

  const params = await searchParams
  const view = readView(single(params, 'status'))
  const search = single(params, 'q')

  const query: AdminArticleQuery = {
    status: view === 'scheduled' ? 'published' : view,
    limit: FETCH_LIMIT,
  }
  if (search.length > 0) query.search = search

  const [rows, counts] = await Promise.all([listAdminArticles(query), countAdminArticles()])

  /**
   * The schedule is a timestamp comparison, so it cannot come out of
   * `countAdminArticles` — but it does not need a read of its own either.
   * `all`, `published` and `scheduled` all fetch the published window already,
   * so the number is derived from `rows`. The draft and archived windows hold
   * no published row to count, so the toggle stays reachable but goes bare
   * rather than paying for a second pass over every article document.
   */
  const countsScheduled = view === 'all' || view === 'published' || view === 'scheduled'
  const scheduledCount = countsScheduled ? rows.filter(isScheduled).length : null

  const filtered = view === 'scheduled' ? rows.filter(isScheduled) : rows
  const total = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(readPage(single(params, 'page')), pageCount)
  const start = (page - 1) * PAGE_SIZE
  const pageRows = filtered.slice(start, start + PAGE_SIZE).map(toListRow)

  const truncated = rows.length >= FETCH_LIMIT

  return (
    <div className="flex flex-col gap-10 pb-24">
      <AdminPageHeader
        eyebrow="Journal"
        title="Bài viết"
        description="Toàn bộ nhật ký của studio, kể cả bản nháp và bài đã hẹn giờ. Bộ lọc và từ khoá nằm trong đường dẫn nên mọi khung nhìn đều chia sẻ được."
        actions={
          <>
            {scheduledCount === null || scheduledCount > 0 || view === 'scheduled' ? (
              <Button
                href={view === 'scheduled' ? viewHref('published', search) : viewHref('scheduled', search)}
                variant={view === 'scheduled' ? 'solid' : 'ghost'}
                size="sm"
              >
                {scheduledCount === null ? 'Hẹn giờ' : `Hẹn giờ · ${scheduledCount}`}
              </Button>
            ) : null}
            <Button href="/admin/articles/new" variant="solid" size="sm">
              Bài viết mới
            </Button>
          </>
        }
      />

      {view === 'scheduled' ? (
        <p className="u-label text-accent">Chỉ hiện bài đã đăng có thời điểm nằm ở tương lai</p>
      ) : null}

      <Suspense fallback={<p className="u-label py-16 text-center text-muted">Đang tải danh sách…</p>}>
        <ArticleList
          rows={pageRows}
          counts={counts}
          status={view === 'scheduled' ? 'published' : view}
          search={search}
        />
      </Suspense>

      {truncated ? (
        <p className="u-label text-muted">
          Chỉ nạp {FETCH_LIMIT} bài gần nhất — dùng ô tìm kiếm để thu hẹp danh sách.
        </p>
      ) : null}

      <Pagination
        page={page}
        pageCount={pageCount}
        basePath="/admin/articles"
        params={{
          status: view === 'all' ? undefined : view,
          q: search.length > 0 ? search : undefined,
        }}
        total={total}
        className="border-t border-line"
      />
    </div>
  )
}
