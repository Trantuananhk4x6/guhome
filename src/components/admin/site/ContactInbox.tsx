'use client'

/**
 * The contact inbox on `/admin/settings` — `contact_requests` with its
 * new → contacted → archived workflow, a search box and a mailto link per row.
 *
 * Filtering happens on the server through the URL, so a filtered inbox is
 * linkable and survives a refresh.
 */

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatDate } from '@/lib/utils'
import { deleteContactRequest, setContactStatus } from '@/server/actions/contacts'

import {
  CONTACT_STATUS_FLOW,
  CONTACT_STATUS_LABELS,
  type ContactStatus,
} from './contracts'
import { ActionMessage, StatusPill } from './Fields'
import { useActionRunner } from './useEditorState'

export interface ContactInboxRow {
  id: string
  name: string
  email: string
  phone: string | null
  projectType: string | null
  budget: string | null
  message: string | null
  status: ContactStatus
  source: string | null
  createdAt: string
}

export interface ContactInboxProps {
  rows: ContactInboxRow[]
  counts: Record<ContactStatus | 'all', number>
  status: ContactStatus | 'all'
  search: string
}

const FILTERS: readonly (ContactStatus | 'all')[] = ['all', 'new', 'contacted', 'archived']

const FILTER_LABELS: Record<ContactStatus | 'all', string> = {
  all: 'Tất cả',
  ...CONTACT_STATUS_LABELS,
}

const STATUS_TONE: Record<ContactStatus, 'accent' | 'ink' | 'muted'> = {
  new: 'accent',
  contacted: 'ink',
  archived: 'muted',
}

function mailtoHref(row: ContactInboxRow): string {
  const subject = encodeURIComponent(`AN ATELIER — phản hồi yêu cầu của ${row.name}`)
  const intro = `Chào ${row.name},\n\nCảm ơn bạn đã liên hệ với AN ATELIER.\n\n`
  return `mailto:${row.email}?subject=${subject}&body=${encodeURIComponent(intro)}`
}

export function ContactInbox({ rows, counts, status, search }: ContactInboxProps) {
  const router = useRouter()
  const params = useSearchParams()
  const runner = useActionRunner()

  const [term, setTerm] = useState(search)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<ContactInboxRow | null>(null)

  const navigate = (next: { status?: string; q?: string }): void => {
    const query = new URLSearchParams(params.toString())
    const nextStatus = next.status ?? status
    const nextTerm = next.q ?? term

    if (nextStatus === 'all') query.delete('status')
    else query.set('status', nextStatus)

    if (nextTerm.trim().length === 0) query.delete('q')
    else query.set('q', nextTerm.trim())

    const qs = query.toString()
    router.push(qs.length > 0 ? `/admin/settings?${qs}#inbox` : '/admin/settings#inbox')
  }

  const move = (row: ContactInboxRow, next: ContactStatus): void => {
    runner.run(() => setContactStatus({ id: row.id, status: next }), {
      success: `Đã chuyển "${row.name}" sang ${CONTACT_STATUS_LABELS[next].toLowerCase()}.`,
      onSuccess: () => router.refresh(),
    })
  }

  const columns: DataTableColumn<ContactInboxRow>[] = [
    {
      key: 'created',
      header: 'Ngày',
      className: 'w-28 whitespace-nowrap',
      cell: (row) => <span className="font-body text-[0.8125rem] tabular-nums text-muted">{formatDate(row.createdAt)}</span>,
    },
    {
      key: 'sender',
      header: 'Người gửi',
      cell: (row) => (
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-body text-[0.9375rem] text-ink">{row.name}</span>
          <a href={`mailto:${row.email}`} className="truncate font-body text-[0.8125rem] text-muted hover:text-accent">
            {row.email}
          </a>
          {row.phone ? <span className="font-body text-[0.75rem] text-muted">{row.phone}</span> : null}
          {row.message ? (
            <button
              type="button"
              onClick={() => setExpanded(expanded === row.id ? null : row.id)}
              aria-expanded={expanded === row.id}
              className="mt-1 max-w-[52ch] text-left font-body text-[0.8125rem] leading-relaxed text-muted transition-colors hover:text-ink"
            >
              {expanded === row.id ? row.message : `${row.message.slice(0, 90)}${row.message.length > 90 ? '…' : ''}`}
            </button>
          ) : null}
        </div>
      ),
    },
    {
      key: 'brief',
      header: 'Nhu cầu',
      className: 'w-44',
      cell: (row) => (
        <div className="flex flex-col gap-1">
          <span className="font-body text-[0.8125rem] text-ink">{row.projectType ?? '—'}</span>
          {row.budget ? <span className="font-body text-[0.75rem] text-muted">{row.budget}</span> : null}
          {row.source ? <span className="u-label text-muted/70">{row.source}</span> : null}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      className: 'w-32',
      cell: (row) => <StatusPill tone={STATUS_TONE[row.status]}>{CONTACT_STATUS_LABELS[row.status]}</StatusPill>,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      className: 'w-64',
      cell: (row) => (
        <div className="flex flex-wrap items-center gap-3">
          <Button href={mailtoHref(row)} variant="underline" size="sm">
            Trả lời
          </Button>
          {CONTACT_STATUS_FLOW[row.status].map((next) => (
            <Button
              key={next}
              type="button"
              variant="underline"
              size="sm"
              disabled={runner.pending}
              onClick={() => move(row, next)}
            >
              {CONTACT_STATUS_LABELS[next]}
            </Button>
          ))}
          <Button type="button" variant="underline" size="sm" onClick={() => setPendingDelete(row)}>
            Xoá
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
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
              placeholder="Tìm theo tên, email hoặc nội dung"
              aria-label="Tìm trong hộp thư"
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
          <p className="px-5 py-14 text-center font-body text-[0.875rem] text-muted">
            {search.length > 0 ? 'Không có liên hệ nào khớp với từ khoá.' : 'Hộp thư đang trống.'}
          </p>
        }
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Xoá liên hệ này?"
        description={
          pendingDelete
            ? `Yêu cầu của ${pendingDelete.name} (${pendingDelete.email}) sẽ bị xoá vĩnh viễn. Với thư hợp lệ, hãy dùng "Lưu trữ" thay vì xoá.`
            : ''
        }
        confirmLabel="Xoá vĩnh viễn"
        cancelLabel="Huỷ"
        tone="danger"
        onConfirm={() => {
          const target = pendingDelete
          setPendingDelete(null)
          if (!target) return
          runner.run(() => deleteContactRequest({ id: target.id }), {
            success: 'Đã xoá liên hệ.',
            onSuccess: () => router.refresh(),
          })
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}
