'use client'

/**
 * Thin wrapper around the shared `MediaPickerDialog` so the site editors have a
 * single labelled control for "pick one asset" and "pick several".
 *
 * Every media selection in this area goes through here — if the picker's props
 * ever change, this is the only file that has to follow.
 */

import Image from 'next/image'
import { useState } from 'react'

import { MediaPickerDialog } from '@/components/admin/MediaPickerDialog'
import { Button } from '@/components/ui/Button'
import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { MediaKind, MediaRef } from '@/types/content'

function Thumb({ media, className }: { media: MediaRef; className?: string }) {
  if (media.kind === 'image') {
    return (
      <div className={cn('relative aspect-4/3 w-28 shrink-0 overflow-hidden border border-line bg-surface', className)}>
        <Image
          src={mediaUrl(media, 400)}
          alt={media.alt ?? ''}
          fill
          sizes="112px"
          className="object-cover"
          unoptimized
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex aspect-4/3 w-28 shrink-0 items-center justify-center border border-line bg-surface px-2 text-center',
        className,
      )}
    >
      <span className="u-label text-muted">{media.kind}</span>
    </div>
  )
}

/* --------------------------------- single ---------------------------------- */

export interface MediaFieldProps {
  label: string
  hint?: string
  kind?: MediaKind
  value: MediaRef | null
  onChange: (next: MediaRef | null) => void
  error?: string | null
  /** Text on the choose button when nothing is selected. */
  chooseLabel?: string
}

export function MediaField({
  label,
  hint,
  kind = 'image',
  value,
  onChange,
  error,
  chooseLabel = 'Chọn tệp',
}: MediaFieldProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <span className="u-label text-ink">{label}</span>

      <div className="flex items-start gap-4">
        {value ? <Thumb media={value} /> : <div className="aspect-4/3 w-28 shrink-0 border border-dashed border-line" />}

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {value ? (
            <p className="truncate font-body text-[0.8125rem] text-ink">{value.alt ?? value.caption ?? value.url}</p>
          ) : (
            <p className="font-body text-[0.8125rem] text-muted">Chưa chọn tệp nào.</p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(true)}>
              {value ? 'Đổi tệp' : chooseLabel}
            </Button>
            {value ? (
              <Button type="button" variant="underline" size="sm" onClick={() => onChange(null)}>
                Bỏ chọn
              </Button>
            ) : null}
          </div>

          {hint ? <p className="text-[0.75rem] leading-relaxed text-muted">{hint}</p> : null}
          {error ? (
            <p role="alert" className="text-[0.75rem] leading-relaxed text-accent">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      <MediaPickerDialog
        open={open}
        kind={kind}
        onClose={() => setOpen(false)}
        onSelect={(items) => {
          const first = items[0]
          onChange(first ?? null)
          setOpen(false)
        }}
      />
    </div>
  )
}

/* -------------------------------- multiple --------------------------------- */

export interface MediaListFieldProps {
  label: string
  hint?: string
  kind?: MediaKind
  value: readonly MediaRef[]
  onChange: (next: MediaRef[]) => void
  max?: number
}

export function MediaListField({
  label,
  hint,
  kind = 'image',
  value,
  onChange,
  max = 24,
}: MediaListFieldProps) {
  const [open, setOpen] = useState(false)

  const addAll = (items: readonly MediaRef[]): void => {
    const seen = new Set(value.map((item) => item.id))
    const merged = [...value]
    for (const item of items) {
      if (seen.has(item.id)) continue
      if (merged.length >= max) break
      seen.add(item.id)
      merged.push(item)
    }
    onChange(merged)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="u-label text-ink">{label}</span>
        <span className="font-body text-[0.75rem] tabular-nums text-muted">
          {value.length}/{max}
        </span>
      </div>

      {value.length > 0 ? (
        <ul className="flex flex-wrap gap-3">
          {value.map((item, index) => (
            <li key={`${item.id}-${index}`} className="flex flex-col gap-2">
              <Thumb media={item} />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="u-label text-left text-muted transition-colors hover:text-accent"
              >
                Bỏ
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-body text-[0.8125rem] text-muted">Chưa có tệp nào.</p>
      )}

      <div>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(true)}>
          Thêm tệp
        </Button>
      </div>

      {hint ? <p className="text-[0.75rem] leading-relaxed text-muted">{hint}</p> : null}

      <MediaPickerDialog
        open={open}
        kind={kind}
        multiple
        onClose={() => setOpen(false)}
        onSelect={(items) => {
          addAll(items)
          setOpen(false)
        }}
      />
    </div>
  )
}
