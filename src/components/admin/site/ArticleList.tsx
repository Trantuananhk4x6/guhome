'use client'

/**
 * `/admin/articles` — the journal index: status filter, search, and the quick
 * status moves that do not need the full editor.
 *
 * Filtering runs on the server through the URL so a filtered list is linkable.
 */

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { DataTable, type DataTableColumn } from '@/components/admin/DataTable'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatDate } from '@/lib/utils'
import { setArticleStatus } from '@/server/actions/articles'
import type { PublishStatus } from '@/types/content'

import { ARTICLE_STATUS_LABELS } from './contracts'
import { ActionMessage, StatusPill, type PillTone } from './Fields'
import { useActionRunner } from './useEditorState'

export interface ArticleListRow {
  id: string
  title: string
  slug: string
  status: PublishStatus
  excerpt: string | null
  tags: string[]
  readingMinutes: number | null
  scheduledAt: string | null
  publishedAt: string | null
  updatedAt: string
  authorName: string | null
}

export interface ArticleListProps {
  rows: ArticleListRow[]
  counts: Record<PublishStatus | 'all', number>
  status: PublishStatus | 'all'
  search: string
}

const FILTERS: readonly (PublishStatus | 'all')[] = ['all', 'draft', 'published', 'archived']

const FILTER_LABELS: Record<PublishStatus | 'all', string> = {
  all: 'Tất cả',
  ...ARTICLE_STATUS_LABELS,
}

const STATUS_TONE: Record<PublishStatus, PillTone> = {
  draft: 'accent',
  published: 'ink',
  archived: 'muted',
}

/** Published with a future timestamp — visible in the admin, hidden on the site. */
function isScheduled(row: ArticleListRow): boolean {
  if (row.status !== 'published') return false
  if (!row.publishedAt) return false
  return new Date(row.publishedAt).getTime() > Date.now()
}

export function ArticleList({ rows, counts, status, search }: ArticleListProps) {
  const router = useRouter()
  const params = useSearchParams()
  const runner = useActionRunner()
  const [term, setTerm] = useState(search)

  const navigate = (next: { status?: string; q?: string }): void => {
    const query = new URLSearchParams(params.toString())
    const nextStatus = next.status ?? status
    const nextTerm = next.q ?? term

    if (nextStatus === 'all') query.delete('status')
    else query.set('status', nextStatus)

    if (nextTerm.trim().length === 0) query.delete('q')
    else query.set('q', nextTerm.trim())

    const qs = query.toString()
    router.push(qs.length > 0 ? `/admin/articles?${qs}` : '/admin/articles')
  }

  const move = (row: ArticleListRow, next: PublishStatus): void => {
    runner.run(() => setArticleStatus({ id: row.id, status: next, scheduledAt: null }), {
      success: `"${row.title}" → ${ARTICLE_STATUS_LABELS[next].toLowerCase()}.`,
      onSuccess: () => router.refresh(),
    })
  }

  const columns: DataTableColumn<ArticleListRow>[] = [
    {
      key: 'title',
      header: 'Bài viết',
      cell: (row) => (
        <div className="flex min-w-0 flex-col gap-1">
          <Link
            href={`/admin/articles/${row.id}`}
            className="font-display text-xl leading-tight text-ink transition-colors hover:text-accent"
          >
            {row.title}
          </Link>
          <span className="font-body text-[0.75rem] text-muted">/journal/{row.slug}</span>
          {row.excerpt ? (
            <span className="mt-1 max-w-[56ch] font-body text-[0.8125rem] leading-relaxed text-muted">
              {row.excerpt.length > 110 ? `${row.excerpt.slice(0, 110)}…` : row.excerpt}
            </span>
          ) : null}
        </div>
      ),
    },
    {
      key: 'tags',
      header: 'Thẻ',
      className: 'w-48',
      cell: (row) =>
        row.tags.length > 0 ? (
          <span className="font-body text-[0.75rem] leading-relaxed text-muted">{row.tags.join(' · ')}</span>
        ) : (
          <span className="font-body text-[0.75rem] text-muted/60">—</span>
        ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      className: 'w-40',
      cell: (row) => (
        <div className="flex flex-col items-start gap-2">
          <StatusPill tone={STATUS_TONE[row.status]}>{ARTICLE_STATUS_LABELS[row.status]}</StatusPill>
          {isScheduled(row) ? (
            <span className="font-body text-[0.75rem] text-accent">Hẹn {formatDate(row.publishedAt)}</span>
          ) : null}
        </div>
      ),
    },
    {
      key: 'dates',
      header: 'Cập nhật',
      className: 'w-32 whitespace-nowrap',
      cell: (row) => (
        <div className="flex flex-col gap-1">
          <span className="font-body text-[0.8125rem] tabular-nums text-ink">{formatDate(row.updatedAt)}</span>
          {row.readingMinutes ? (
            <span className="font-body text-[0.75rem] text-muted">{row.readingMinutes} phút đọc</span>
          ) : null}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Thao tác',
      className: 'w-56',
      cell: (row) => (
        <div className="flex flex-wrap items-center gap-3">
          <Button href={`/admin/articles/${row.id}`} variant="underline" size="sm">
            Sửa
          </Button>
          {row.status !== 'published' ? (
            <Button type="button" variant="underline" size="sm" disabled={runner.pending} onClick={() => move(row, 'published')}>
              Đăng
            </Button>
          ) : (
            <Button type="button" variant="underline" size="sm" disabled={runner.pending} onClick={() => move(row, 'draft')}>
              Về nháp
            </Button>
          )}
          {row.status !== 'archived' ? (
            <Button type="button" variant="underline" size="sm" disabled={runner.pending} onClick={() => move(row, 'archived')}>
              Lưu trữ
            </Button>
          ) : null}
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <nav className="flex flex-wrap items-center gap-5" aria-label="Lọc theo trạng thái">
          {FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => navigate({ status: value })}
              aria-current={status === value ? 'true' : undefined}
              className={
                status === value
                  ? 'u-label border-b border-accent pb-1 text-ink'
                  : 'u-label border-b border-transparent pb-1 transition-colors hover:text-ink'
              }
            >
              {FILTER_LABELS[value]} <span className="text-accent">{counts[value]}</span>
            </button>
          ))}
        </nav>

        <form
          className="flex w-full max-w-sm items-end gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            navigate({ q: term })
          }}
        >
          <div className="flex-1">
            <Input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Tìm theo tiêu đề, slug hoặc tóm tắt"
              aria-label="Tìm bài viết"
            />
          </div>
          <Button type="submit" variant="ghost" size="sm">
            Tìm
          </Button>
        </form>
      </div>

      <ActionMessage error={runner.error} message={runner.message} />

      <DataTable
        columns={columns}
        rows={rows}
        getKey={(row) => row.id}
        empty={
          <p className="px-5 py-16 text-center font-body text-[0.875rem] text-muted">
            {search.length > 0 ? 'Không có bài viết nào khớp với từ khoá.' : 'Chưa có bài viết nào.'}
          </p>
        }
      />
    </div>
  )
}
