'use client'

/**
 * The library grid. A hairline lattice (`gap-px` over a line-coloured surface)
 * rather than cards: square corners, no shadows, no radii.
 *
 * Every tile is a real button — click opens the drawer, or toggles selection
 * while selection mode is on (⌘/Ctrl-click always toggles).
 */

import type { MouseEvent } from 'react'

import { cn } from '@/lib/utils'

import { MediaThumb } from './MediaThumb'
import { fileNameOf, formatBytes } from './format'
import { MEDIA_KIND_LABELS, type MediaItem } from './types'

export interface MediaGridProps {
  items: readonly MediaItem[]
  activeId: string | null
  selection: ReadonlySet<string>
  selecting: boolean
  onOpen: (item: MediaItem) => void
  onToggle: (id: string) => void
}

export function MediaGrid({ items, activeId, selection, selecting, onOpen, onToggle }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 border border-line bg-surface/40 py-24 text-center">
        <span className="u-label">Không có tệp nào</span>
        <p className="max-w-[36ch] text-[0.875rem] leading-relaxed text-muted">
          Thả tệp vào trang này để tải lên, hoặc nới lỏng bộ lọc.
        </p>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
      {items.map((item) => {
        const selected = selection.has(item.id)
        const active = activeId === item.id

        function handleClick(event: MouseEvent<HTMLButtonElement>): void {
          if (selecting || event.metaKey || event.ctrlKey) onToggle(item.id)
          else onOpen(item)
        }

        return (
          <li key={item.id} className="relative bg-canvas">
            <button
              type="button"
              onClick={handleClick}
              aria-pressed={selecting ? selected : undefined}
              className={cn(
                'group relative block w-full text-left transition-colors duration-500 ease-editorial',
                active && 'outline outline-1 -outline-offset-1 outline-ink',
                selected && 'outline outline-1 -outline-offset-1 outline-accent',
              )}
            >
              <span className="relative block aspect-square w-full overflow-hidden bg-surface-alt">
                <MediaThumb media={item} width={400} sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 16vw" />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 bg-espresso/0 transition-colors duration-500 ease-editorial',
                    'group-hover:bg-espresso/10',
                    selected && 'bg-espresso/15',
                  )}
                />
              </span>

              {selecting ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute left-3 top-3 flex h-5 w-5 items-center justify-center border text-[0.625rem]',
                    selected ? 'border-accent bg-accent text-canvas' : 'border-canvas/70 bg-espresso/20 text-transparent',
                  )}
                >
                  ✓
                </span>
              ) : null}

              {item.kind !== 'image' ? (
                <span className="u-label absolute right-3 top-3 bg-canvas px-2 py-1 text-ink">
                  {MEDIA_KIND_LABELS[item.kind]}
                </span>
              ) : null}

              {!item.alt ? (
                <span
                  aria-label="Thiếu alt"
                  title="Thiếu alt"
                  className="absolute bottom-14 right-3 h-1.5 w-1.5 bg-accent"
                />
              ) : null}

              <span className="flex flex-col gap-1 border-t border-line px-3 py-3">
                <span className="truncate text-[0.75rem] leading-tight text-ink">
                  {item.alt?.trim() || fileNameOf(item.storageKey)}
                </span>
                <span className="u-label text-[0.5625rem]">
                  {item.width && item.height ? `${item.width}×${item.height}` : MEDIA_KIND_LABELS[item.kind]} ·{' '}
                  {formatBytes(item.bytes)}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
