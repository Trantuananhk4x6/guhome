'use client'

/**
 * Picks a media row for a scene slot (model / ảnh nguồn / bản đồ độ sâu).
 *
 * Candidates are fetched through the `fetchSceneMedia` server action so the
 * modal can search the whole library without shipping it to the client.
 */

import { useCallback, useEffect, useState, useTransition } from 'react'

import { MediaThumb } from '@/components/admin/media/MediaThumb'
import { fileNameOf } from '@/components/admin/media/format'
import { MEDIA_KIND_LABELS } from '@/components/admin/media/types'
import { cn } from '@/lib/utils'
import { fetchSceneMedia } from '@/server/actions/scenes'
import type { MediaKind, MediaRef } from '@/types/content'

export interface MediaPickerFieldProps {
  label: string
  value: MediaRef | null
  kinds: readonly MediaKind[]
  hint?: string
  disabled?: boolean
  onChange: (value: MediaRef | null) => void
}

export function MediaPickerField({ label, value, kinds, hint, disabled = false, onChange }: MediaPickerFieldProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MediaRef[]>([])
  const [pending, startTransition] = useTransition()

  const load = useCallback(
    (term: string): void => {
      startTransition(async () => {
        const rows = await fetchSceneMedia({ kinds: [...kinds], search: term, limit: 90 })
        setResults(rows)
      })
    },
    // `kinds` is a literal array at every call site; spread keeps it stable enough.
    [kinds],
  )

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => load(query), query.length === 0 ? 0 : 260)
    return () => clearTimeout(timer)
  }, [open, query, load])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent): void {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className={cn('flex flex-col gap-2', disabled && 'opacity-40')}>
      <span className="u-label text-[0.625rem]">{label}</span>

      <div className="flex items-stretch gap-3 border border-line bg-canvas p-2">
        <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-surface-alt">
          <MediaThumb media={value} width={400} sizes="5rem" fit="contain" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <span className="truncate text-[0.75rem] text-ink">
            {value ? (value.alt?.trim() || fileNameOf(value.url)) : 'Chưa chọn'}
          </span>
          <span className="u-label text-[0.5625rem]">
            {value ? `${MEDIA_KIND_LABELS[value.kind]} · ${value.width ?? '?'}×${value.height ?? '?'}` : '—'}
          </span>
        </div>
        <div className="flex shrink-0 flex-col justify-center gap-1">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen(true)}
            className="u-label border border-line px-3 py-1.5 text-ink transition-colors duration-500 ease-editorial hover:border-ink"
          >
            Chọn
          </button>
          {value ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => onChange(null)}
              className="u-label px-3 py-1 text-muted transition-colors duration-500 ease-editorial hover:text-accent"
            >
              Gỡ
            </button>
          ) : null}
        </div>
      </div>

      {hint ? <p className="text-[0.6875rem] leading-relaxed text-muted">{hint}</p> : null}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/40 p-6">
          <div className="flex max-h-[80vh] w-full max-w-5xl flex-col border border-line bg-canvas">
            <header className="flex items-center gap-6 border-b border-line px-6 py-4">
              <div className="flex flex-col gap-1">
                <span className="u-label">Chọn tệp</span>
                <p className="font-display text-xl leading-none text-ink">{label}</p>
              </div>
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm theo alt, thư mục, tên tệp…"
                aria-label="Tìm tệp"
                className="ml-auto w-72 border-0 border-b border-line bg-transparent py-2 font-body text-[0.8125rem] text-ink focus:border-ink"
              />
              <button type="button" className="u-label text-muted hover:text-ink" onClick={() => setOpen(false)}>
                Đóng
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              {pending && results.length === 0 ? (
                <p className="u-label py-16 text-center">Đang tải…</p>
              ) : results.length === 0 ? (
                <p className="u-label py-16 text-center">Không có tệp phù hợp</p>
              ) : (
                <ul className="grid grid-cols-3 gap-px bg-line sm:grid-cols-4 lg:grid-cols-6">
                  {results.map((item) => (
                    <li key={item.id} className="bg-canvas">
                      <button
                        type="button"
                        onClick={() => {
                          onChange(item)
                          setOpen(false)
                        }}
                        className={cn(
                          'group block w-full text-left',
                          value?.id === item.id && 'outline outline-1 -outline-offset-1 outline-accent',
                        )}
                      >
                        <span className="relative block aspect-square w-full overflow-hidden bg-surface-alt">
                          <MediaThumb media={item} width={400} sizes="12vw" />
                        </span>
                        <span className="block truncate border-t border-line px-2 py-2 text-[0.6875rem] text-ink">
                          {item.alt?.trim() || fileNameOf(item.url)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
