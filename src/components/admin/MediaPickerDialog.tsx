'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { listProjectMedia } from '@/server/actions/projects'
import type { MediaKind, MediaRef } from '@/types/content'

import { SearchIcon } from './AdminIcons'
import { adminButtonClass } from './AdminShell'
import { Dialog } from './Dialog'
import { adminControlClass } from './FormRow'
import { MediaThumb } from './MediaThumb'

export type MediaPickerScope = 'project' | 'library'

export interface MediaPickerDialogProps {
  open: boolean
  onClose: () => void
  /** Receives the rows the editor picked, in click order. */
  onSelect: (items: MediaRef[]) => void
  /** Restrict the list to one media kind (`image`, `glb`, `hdri`…). */
  kind?: MediaKind
  multiple?: boolean
  /** Scopes the list to one project's attached media. */
  projectId?: string | null
  /** Initial scope. Falls back to `project` when a `projectId` is given. */
  scope?: MediaPickerScope
  /** Ids already used by the field — marked, but still selectable. */
  selectedIds?: readonly string[]
  title?: string
  description?: ReactNode
  emptyHint?: ReactNode
}

/**
 * The one media chooser in the CMS. It loads its own rows through
 * `listProjectMedia`, so a caller only says *what* it wants (kind, project,
 * single or multiple) and gets `MediaRef`s back.
 */
export function MediaPickerDialog({
  open,
  onClose,
  onSelect,
  kind,
  multiple = false,
  projectId = null,
  scope: initialScope,
  selectedIds,
  title = 'Chọn media',
  description,
  emptyHint,
}: MediaPickerDialogProps) {
  const [scope, setScope] = useState<MediaPickerScope>(initialScope ?? (projectId ? 'project' : 'library'))
  const [search, setSearch] = useState('')
  const [applied, setApplied] = useState('')
  const [items, setItems] = useState<MediaRef[]>([])
  const [picked, setPicked] = useState<MediaRef[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setPicked([])
  }, [open])

  useEffect(() => {
    if (!open) return
    let cancelled = false

    setLoading(true)
    setError(null)

    listProjectMedia({ projectId, scope, search: applied, kind })
      .then((result) => {
        if (cancelled) return
        if (result.ok) {
          setItems(result.data.items)
        } else {
          setItems([])
          setError(result.error)
        }
      })
      .catch(() => {
        if (!cancelled) setError('Không tải được danh sách media.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [open, scope, applied, projectId, kind])

  function toggle(item: MediaRef): void {
    setPicked((current) => {
      const exists = current.some((entry) => entry.id === item.id)
      if (!multiple) return exists ? [] : [item]
      return exists ? current.filter((entry) => entry.id !== item.id) : [...current, item]
    })
  }

  const scopeSwitch = projectId ? (
    <div className="flex items-center gap-1">
      {(['project', 'library'] as const).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setScope(value)}
          aria-pressed={scope === value}
          className={cn(
            'u-label border px-3 py-2 text-[0.5625rem] transition-colors duration-200',
            scope === value
              ? 'border-ink bg-ink text-canvas'
              : 'border-line text-muted hover:border-ink hover:text-ink',
          )}
        >
          {value === 'project' ? 'Của dự án' : 'Toàn thư viện'}
        </button>
      ))}
    </div>
  ) : null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      width="xl"
      footer={
        <>
          <span className="u-label mr-auto text-muted">
            {multiple ? `${picked.length} đã chọn` : picked.length > 0 ? 'Đã chọn 1' : 'Chưa chọn'}
          </span>
          <button type="button" onClick={onClose} className={adminButtonClass('ghost')}>
            Huỷ
          </button>
          <button
            type="button"
            disabled={picked.length === 0}
            onClick={() => {
              onSelect(picked)
              onClose()
            }}
            className={adminButtonClass('solid')}
          >
            Chọn
          </button>
        </>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-muted" />
          <input
            type="search"
            value={search}
            placeholder="Tìm theo alt, chú thích, thư mục hoặc tên tệp…"
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                setApplied(search.trim())
              }
            }}
            className={adminControlClass(false, 'pl-9')}
          />
        </div>
        <button
          type="button"
          onClick={() => setApplied(search.trim())}
          className={adminButtonClass('outline')}
        >
          Tìm
        </button>
        {scopeSwitch}
      </div>

      {error ? (
        <p role="alert" className="mb-4 border border-accent px-3 py-2 font-body text-[0.75rem] text-accent">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="u-label py-12 text-center text-muted">Đang tải…</p>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-line px-6 py-12 text-center">
          <p className="u-label text-ink">Không có media</p>
          <p className="mx-auto mt-2 max-w-md font-body text-[0.8125rem] leading-6 text-muted">
            {emptyHint ?? 'Tải ảnh lên ở mục Media, hoặc đổi phạm vi tìm kiếm.'}
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => {
            const position = picked.findIndex((entry) => entry.id === item.id)
            const active = position >= 0
            const used = selectedIds?.includes(item.id) ?? false
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item)}
                  aria-pressed={active}
                  className={cn(
                    'group relative block w-full border p-1 text-left transition-colors duration-200',
                    active ? 'border-accent' : 'border-line hover:border-ink',
                  )}
                >
                  <span className="block aspect-[4/3] w-full overflow-hidden bg-surface-alt">
                    <MediaThumb media={item} size="fill" className="border-0" />
                  </span>
                  <span className="mt-1.5 block truncate font-body text-[0.6875rem] leading-4 text-muted">
                    {item.alt ?? item.caption ?? item.url}
                  </span>
                  {active ? (
                    <span className="u-label absolute right-2 top-2 flex h-5 min-w-5 items-center justify-center bg-accent px-1 text-[0.5625rem] text-canvas">
                      {multiple ? position + 1 : '✓'}
                    </span>
                  ) : used ? (
                    <span className="u-label absolute right-2 top-2 border border-line bg-canvas px-1 py-0.5 text-[0.5rem] text-muted">
                      Đã dùng
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </Dialog>
  )
}
