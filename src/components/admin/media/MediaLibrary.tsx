'use client'

/**
 * `/admin/media` — the media library shell.
 *
 * Filters live in the URL so a filtered view is linkable and the server does the
 * paging; everything interactive (selection, drawer, upload queue) is local
 * state. Dropping files anywhere on the page uploads them.
 */

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { bulkDelete } from '@/server/actions/media'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Spinner } from '@/components/ui/Spinner'

import { MediaDetails } from './MediaDetails'
import { MediaGrid } from './MediaGrid'
import { formatBytes, shortFolder } from './format'
import { MEDIA_KINDS, MEDIA_KIND_LABELS, type MediaItem, type ProjectOption } from './types'
import { useUploads } from './useUploads'

export interface MediaLibraryFilters {
  folder: string
  kind: string
  q: string
  take: number
}

export interface MediaLibraryProps {
  items: readonly MediaItem[]
  total: number
  folders: readonly string[]
  projects: readonly ProjectOption[]
  filters: MediaLibraryFilters
}

const PAGE_STEP = 120

export function MediaLibrary({ items, total, folders, projects, filters }: MediaLibraryProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const [rows, setRows] = useState<MediaItem[]>([...items])
  const [seed, setSeed] = useState(items)
  if (seed !== items) {
    setSeed(items)
    setRows([...items])
  }

  const [query, setQuery] = useState(filters.q)
  const [querySeed, setQuerySeed] = useState(filters.q)
  if (querySeed !== filters.q) {
    setQuerySeed(filters.q)
    setQuery(filters.q)
  }

  const [activeId, setActiveId] = useState<string | null>(null)
  const [selection, setSelection] = useState<ReadonlySet<string>>(new Set())
  const [selecting, setSelecting] = useState(false)
  const [confirmingBulk, setConfirmingBulk] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [uploadFolder, setUploadFolder] = useState(filters.folder)

  const dragDepth = useRef(0)
  const active = rows.find((row) => row.id === activeId) ?? null

  /* ------------------------------- url filters ------------------------------ */

  const apply = useCallback(
    (changes: Record<string, string | null>, keepTake = false): void => {
      const next: Record<string, string | null> = {
        folder: filters.folder || null,
        kind: filters.kind || null,
        q: filters.q || null,
        take: keepTake && filters.take !== PAGE_STEP ? String(filters.take) : null,
        ...changes,
      }

      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(next)) {
        if (value) params.set(key, value)
      }

      const search = params.toString()
      startTransition(() => {
        router.replace(search ? `/admin/media?${search}` : '/admin/media', { scroll: false })
      })
    },
    [filters.folder, filters.kind, filters.q, filters.take, router],
  )

  useEffect(() => {
    if (query === filters.q) return
    const timer = setTimeout(() => apply({ q: query || null }), 300)
    return () => clearTimeout(timer)
  }, [query, filters.q, apply])

  /* --------------------------------- uploads -------------------------------- */

  const uploads = useUploads({
    folder: uploadFolder || null,
    onUploaded: (item) => {
      setRows((current) => [item, ...current.filter((row) => row.id !== item.id)])
    },
    onSettled: () => {
      startTransition(() => router.refresh())
    },
  })

  const uploadFiles = useCallback(
    (list: FileList | null): void => {
      if (!list || list.length === 0) return
      uploads.upload(Array.from(list))
    },
    [uploads],
  )

  useEffect(() => {
    function hasFiles(event: DragEvent): boolean {
      return Array.from(event.dataTransfer?.types ?? []).includes('Files')
    }
    function onEnter(event: DragEvent): void {
      if (!hasFiles(event)) return
      event.preventDefault()
      dragDepth.current += 1
      setDragging(true)
    }
    function onOver(event: DragEvent): void {
      if (!hasFiles(event)) return
      event.preventDefault()
    }
    function onLeave(): void {
      dragDepth.current = Math.max(0, dragDepth.current - 1)
      if (dragDepth.current === 0) setDragging(false)
    }
    function onDrop(event: DragEvent): void {
      if (!hasFiles(event)) return
      event.preventDefault()
      dragDepth.current = 0
      setDragging(false)
      uploadFiles(event.dataTransfer?.files ?? null)
    }

    window.addEventListener('dragenter', onEnter)
    window.addEventListener('dragover', onOver)
    window.addEventListener('dragleave', onLeave)
    window.addEventListener('drop', onDrop)
    return () => {
      window.removeEventListener('dragenter', onEnter)
      window.removeEventListener('dragover', onOver)
      window.removeEventListener('dragleave', onLeave)
      window.removeEventListener('drop', onDrop)
    }
  }, [uploadFiles])

  /* -------------------------------- selection ------------------------------- */

  const toggle = useCallback((id: string): void => {
    setSelecting(true)
    setSelection((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  function clearSelection(): void {
    setSelection(new Set())
    setConfirmingBulk(false)
  }

  function selectAll(): void {
    setSelection(new Set(rows.map((row) => row.id)))
  }

  function removeSelected(): void {
    const ids = Array.from(selection)
    if (ids.length === 0) return
    setNotice(null)
    startTransition(async () => {
      const result = await bulkDelete(ids)
      if (!result.ok) {
        setNotice(result.error)
        setConfirmingBulk(false)
        return
      }
      const deleted = new Set(result.data.deleted)
      setRows((current) => current.filter((row) => !deleted.has(row.id)))
      setSelection(new Set())
      setConfirmingBulk(false)
      if (activeId && deleted.has(activeId)) setActiveId(null)

      const blocked = result.data.blocked
      setNotice(
        blocked.length === 0
          ? `Đã xoá ${deleted.size} tệp.`
          : `Đã xoá ${deleted.size} tệp. ${blocked.length} tệp bị giữ lại — ${blocked[0]?.reason ?? ''}`,
      )
      router.refresh()
    })
  }

  /* --------------------------------- drawer --------------------------------- */

  useEffect(() => {
    if (!activeId) return
    function onKey(event: KeyboardEvent): void {
      if (event.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  const totalBytes = rows.reduce((sum, row) => sum + (row.bytes ?? 0), 0)
  const canLoadMore = rows.length < total

  return (
    <div className="relative flex flex-col gap-10 pb-24">
      <header className="flex flex-col gap-6 border-b border-line pb-8">
        <span className="u-label">MEDIA LIBRARY</span>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h1 className="u-display-sm text-ink">Thư viện</h1>
          <p className="u-label">
            {total} tệp · {rows.length} đang hiển thị · {formatBytes(totalBytes)}
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-6" aria-label="Bộ lọc và tải lên">
        <div className="grid gap-6 border-b border-line pb-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <div className="flex flex-col gap-3">
            <span className="u-label">Tìm kiếm</span>
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Alt, chú thích, tên tệp…"
              aria-label="Tìm trong thư viện"
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="u-label">Thư mục</span>
            <Select
              aria-label="Lọc theo thư mục"
              value={filters.folder}
              onChange={(event) => apply({ folder: event.target.value || null })}
              options={[
                { value: '', label: 'Tất cả thư mục' },
                ...folders.map((folder) => ({ value: folder, label: shortFolder(folder) })),
              ]}
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="u-label">Loại</span>
            <Select
              aria-label="Lọc theo loại tệp"
              value={filters.kind}
              onChange={(event) => apply({ kind: event.target.value || null })}
              options={[
                { value: '', label: 'Tất cả loại' },
                ...MEDIA_KINDS.map((kind) => ({ value: kind, label: MEDIA_KIND_LABELS[kind] })),
              ]}
            />
          </div>

          <div className="flex items-center gap-4 pb-1">
            <label className="u-label cursor-pointer border border-line px-4 py-3 text-ink transition-colors duration-500 ease-editorial hover:border-ink">
              Tải tệp lên
              <input
                type="file"
                multiple
                className="sr-only"
                onChange={(event) => {
                  uploadFiles(event.target.files)
                  event.target.value = ''
                }}
              />
            </label>
            <Button
              variant={selecting ? 'solid' : 'ghost'}
              size="sm"
              onClick={() => {
                setSelecting((value) => !value)
                if (selecting) clearSelection()
              }}
            >
              {selecting ? 'Xong' : 'Chọn'}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-3">
            <span className="u-label">Thư mục đích khi tải lên</span>
            <input
              type="text"
              value={uploadFolder}
              onChange={(event) => setUploadFolder(event.target.value)}
              placeholder="chung"
              className="w-48 border-0 border-b border-line bg-transparent py-1 font-body text-[0.8125rem] text-ink focus:border-ink"
            />
          </label>
          {pending ? (
            <span className="u-label flex items-center gap-2 text-muted">
              <Spinner size="xs" /> Đang cập nhật
            </span>
          ) : null}
          {notice ? <p className="text-[0.8125rem] leading-relaxed text-accent">{notice}</p> : null}
        </div>
      </section>

      <MediaGrid
        items={rows}
        activeId={activeId}
        selection={selection}
        selecting={selecting}
        onOpen={(item) => setActiveId(item.id)}
        onToggle={toggle}
      />

      {canLoadMore ? (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            loading={pending}
            onClick={() => apply({ take: String(filters.take + PAGE_STEP) }, true)}
          >
            Tải thêm {Math.min(PAGE_STEP, total - rows.length)} tệp
          </Button>
        </div>
      ) : null}

      {/* ------------------------------ bulk actions ----------------------------- */}
      {selection.size > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 backdrop-blur-[1px]">
          <div className="flex flex-wrap items-center justify-between gap-6 px-6 py-4 md:px-10">
            <span className="u-label text-ink">{selection.size} tệp đã chọn</span>
            <div className="flex items-center gap-4">
              <Button variant="underline" size="sm" onClick={selectAll}>
                Chọn tất cả ({rows.length})
              </Button>
              <Button variant="underline" size="sm" onClick={clearSelection}>
                Bỏ chọn
              </Button>
              {confirmingBulk ? (
                <Button variant="solid" tone="accent" size="sm" loading={pending} onClick={removeSelected}>
                  Xác nhận xoá {selection.size}
                </Button>
              ) : (
                <Button variant="ghost" tone="accent" size="sm" onClick={() => setConfirmingBulk(true)}>
                  Xoá
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* ------------------------------ upload queue ----------------------------- */}
      {uploads.tasks.length > 0 ? (
        <aside className="fixed bottom-6 left-6 z-40 w-80 border border-line bg-canvas">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="u-label">{uploads.busy ? 'Đang tải lên' : 'Tải lên'}</span>
            <button type="button" className="u-label text-muted hover:text-ink" onClick={uploads.clearFinished}>
              Dọn
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {uploads.tasks.map((task) => (
              <li key={task.id} className="border-b border-line px-4 py-3 last:border-b-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[0.75rem] text-ink">{task.name}</span>
                  <span className="u-label shrink-0 text-[0.5625rem]">
                    {task.state === 'error'
                      ? 'Lỗi'
                      : task.state === 'done'
                        ? 'Xong'
                        : `${Math.round(task.progress * 100)}%`}
                  </span>
                </div>
                <div className="mt-2 h-px w-full bg-line">
                  <div
                    className={cn('h-px', task.state === 'error' ? 'bg-accent' : 'bg-ink')}
                    style={{ width: `${Math.round((task.state === 'done' ? 1 : task.progress) * 100)}%` }}
                  />
                </div>
                {task.error ? <p className="mt-2 text-[0.6875rem] leading-relaxed text-accent">{task.error}</p> : null}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {/* -------------------------------- drop zone ------------------------------ */}
      {dragging ? (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-canvas/85">
          <div className="flex flex-col items-center gap-4 border border-accent px-24 py-16">
            <span className="u-label text-accent">DROP TO UPLOAD</span>
            <p className="font-display text-4xl leading-none text-ink">Thả tệp vào đây</p>
          </div>
        </div>
      ) : null}

      {/* --------------------------------- drawer -------------------------------- */}
      {active ? (
        <>
          <button
            type="button"
            aria-label="Đóng bảng chi tiết"
            className="fixed inset-0 z-30 cursor-default bg-espresso/20"
            onClick={() => setActiveId(null)}
          />
          <aside className="fixed inset-y-0 right-0 z-40 w-[min(30rem,100%)] border-l border-line">
            <MediaDetails
              key={active.id}
              item={active}
              projects={projects}
              onClose={() => setActiveId(null)}
              onSaved={(updated) =>
                setRows((current) => current.map((row) => (row.id === updated.id ? updated : row)))
              }
              onDeleted={(id) => {
                setRows((current) => current.filter((row) => row.id !== id))
                setActiveId(null)
                router.refresh()
              }}
            />
          </aside>
        </>
      ) : null}
    </div>
  )
}
