'use client'

/**
 * The three composite controls the block inspectors are built from: one media
 * slot, an ordered list of media, and an ordered list of picks from a fixed
 * option set (materials, related projects).
 *
 * All three are id-first — the draft stores ids, never whole `MediaRef`s — and
 * hand resolved rows back up through `onResolved` so the editor's media index
 * grows as the user picks. Reordering everywhere is `DragList`, so every list is
 * operable from the keyboard through the drag handle.
 */

import { useState } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { PlusIcon, TrashIcon } from '@/components/admin/AdminIcons'
import { DragList } from '@/components/admin/DragList'
import { FormRow } from '@/components/admin/FormRow'
import { MediaPickerDialog } from '@/components/admin/MediaPickerDialog'
import { MediaThumb } from '@/components/admin/MediaThumb'
import { cn, pad2 } from '@/lib/utils'
import type { MediaKind, MediaRef } from '@/types/content'

/* --------------------------------- helpers --------------------------------- */

export type MediaIndex = Readonly<Record<string, MediaRef>>

export function mediaName(id: string | null, index: MediaIndex): string {
  if (!id) return '—'
  const ref = index[id]
  if (!ref) return 'Tệp không còn trong thư viện'
  return ref.alt ?? ref.caption ?? ref.url.split('/').pop() ?? ref.id
}

function refOf(id: string | null, index: MediaIndex): MediaRef | null {
  return id ? (index[id] ?? null) : null
}

/* -------------------------------- media slot ------------------------------- */

export interface MediaSlotProps {
  label: string
  hint?: string
  /** The media id held by the block, or null. */
  value: string | null
  index: MediaIndex
  onChange: (next: string | null) => void
  onResolved: (items: readonly MediaRef[]) => void
  projectId: string
  kind?: MediaKind
  error?: string | null
  /** Shown in place of a filename when nothing is picked. */
  emptyLabel?: string
  dialogTitle?: string
}

export function MediaSlot({
  label,
  hint,
  value,
  index,
  onChange,
  onResolved,
  projectId,
  kind = 'image',
  error,
  emptyLabel = 'Chưa chọn tệp.',
  dialogTitle,
}: MediaSlotProps) {
  const [open, setOpen] = useState(false)
  const ref = refOf(value, index)

  return (
    <FormRow label={label} hint={hint} error={error} group>
      <div className="flex items-start gap-4 border border-line bg-surface/40 p-3">
        {ref ? (
          <MediaThumb media={ref} size="md" />
        ) : (
          <span aria-hidden="true" className="h-16 w-24 shrink-0 border border-dashed border-line" />
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <p className={cn('truncate font-body text-[0.8125rem] leading-5', value ? 'text-ink' : 'text-muted')}>
            {value ? mediaName(value, index) : emptyLabel}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setOpen(true)} className={adminButtonClass('outline')}>
              {value ? 'Đổi tệp' : 'Chọn tệp'}
            </button>
            {value ? (
              <button type="button" onClick={() => onChange(null)} className={adminButtonClass('ghost')}>
                Bỏ chọn
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <MediaPickerDialog
        open={open}
        kind={kind}
        projectId={projectId}
        selectedIds={value ? [value] : undefined}
        title={dialogTitle ?? label}
        onClose={() => setOpen(false)}
        onSelect={(items) => {
          const first = items[0]
          if (first) {
            onResolved(items)
            onChange(first.id)
          }
          setOpen(false)
        }}
      />
    </FormRow>
  )
}

/* ------------------------------ media slot list ----------------------------- */

export interface MediaSlotListProps {
  label: string
  hint?: string
  value: readonly string[]
  index: MediaIndex
  onChange: (next: string[]) => void
  onResolved: (items: readonly MediaRef[]) => void
  projectId: string
  kind?: MediaKind
  max?: number
  error?: string | null
}

export function MediaSlotList({
  label,
  hint,
  value,
  index,
  onChange,
  onResolved,
  projectId,
  kind = 'image',
  max = 80,
  error,
}: MediaSlotListProps) {
  const [open, setOpen] = useState(false)

  const add = (items: readonly MediaRef[]): void => {
    const seen = new Set(value)
    const next = [...value]
    for (const item of items) {
      if (seen.has(item.id) || next.length >= max) continue
      seen.add(item.id)
      next.push(item.id)
    }
    onResolved(items)
    onChange(next)
  }

  return (
    <FormRow label={label} hint={hint} error={error} group>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <span className="u-label text-muted">
          {value.length}/{max} tệp
        </span>
        <button type="button" onClick={() => setOpen(true)} className={adminButtonClass('outline')}>
          <PlusIcon className="text-sm" />
          Thêm tệp
        </button>
      </div>

      <DragList
        items={value}
        label={label}
        getKey={(id, position) => `${id}-${position}`}
        onReorder={(next) => onChange(next)}
        empty={
          <p className="border border-dashed border-line px-4 py-8 text-center font-body text-[0.8125rem] text-muted">
            Chưa có tệp nào. Khối này sẽ không hiện trên trang.
          </p>
        }
        renderItem={(id, position, context) => (
          <div className="flex items-center gap-3 border border-line bg-canvas p-2">
            {context.handle}
            <span className="u-label w-6 shrink-0 text-accent">{pad2(position + 1)}</span>
            <MediaThumb media={refOf(id, index)} size="xs" />
            <span className="min-w-0 flex-1 truncate font-body text-[0.75rem] leading-5 text-muted">
              {mediaName(id, index)}
            </span>
            <button
              type="button"
              aria-label={`Bỏ tệp ${position + 1}`}
              onClick={() => onChange(value.filter((_, i) => i !== position))}
              className="border border-transparent p-1.5 text-muted transition-colors duration-200 hover:border-line hover:text-accent"
            >
              <TrashIcon className="text-sm" />
            </button>
          </div>
        )}
      />

      <MediaPickerDialog
        open={open}
        kind={kind}
        multiple
        projectId={projectId}
        selectedIds={value}
        title={label}
        onClose={() => setOpen(false)}
        onSelect={(items) => {
          add(items)
          setOpen(false)
        }}
      />
    </FormRow>
  )
}

/* ------------------------------ option picking ----------------------------- */

export interface PickOption {
  value: string
  label: string
  note?: string
}

export interface OptionPickListProps {
  label: string
  hint?: string
  value: readonly string[]
  options: readonly PickOption[]
  onChange: (next: string[]) => void
  max?: number
  addLabel?: string
  emptyLabel?: string
  /** Copy shown when the option list itself is empty. */
  noOptionsLabel?: string
}

/** Ordered multi-pick: a select to add, a `DragList` to order, ✕ to remove. */
export function OptionPickList({
  label,
  hint,
  value,
  options,
  onChange,
  max = 12,
  addLabel = 'Thêm',
  emptyLabel = 'Chưa chọn mục nào.',
  noOptionsLabel = 'Chưa có mục nào để chọn.',
}: OptionPickListProps) {
  const [draft, setDraft] = useState('')

  const byValue = new Map(options.map((option) => [option.value, option]))
  const available = options.filter((option) => !value.includes(option.value))
  const full = value.length >= max

  const add = (): void => {
    if (draft.length === 0 || full || value.includes(draft)) return
    onChange([...value, draft])
    setDraft('')
  }

  return (
    <FormRow label={label} hint={hint} group>
      {options.length === 0 ? (
        <p className="border border-dashed border-line px-4 py-6 text-center font-body text-[0.8125rem] text-muted">
          {noOptionsLabel}
        </p>
      ) : (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <select
            value={draft}
            aria-label={addLabel}
            disabled={full || available.length === 0}
            onChange={(event) => setDraft(event.target.value)}
            className="min-w-0 flex-1 rounded-none border border-line bg-canvas px-3 py-2 font-body text-[0.8125rem] leading-5 text-ink transition-colors duration-200 focus:border-ink focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-alt disabled:opacity-60"
          >
            <option value="">{available.length === 0 ? 'Đã chọn hết' : '— Chọn —'}</option>
            {available.map((option) => (
              <option key={option.value} value={option.value}>
                {option.note ? `${option.label} · ${option.note}` : option.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={add}
            disabled={draft.length === 0 || full}
            className={adminButtonClass('outline')}
          >
            <PlusIcon className="text-sm" />
            {addLabel}
          </button>
        </div>
      )}

      <DragList
        items={value}
        label={label}
        getKey={(id, position) => `${id}-${position}`}
        onReorder={(next) => onChange(next)}
        empty={
          <p className="border border-dashed border-line px-4 py-6 text-center font-body text-[0.8125rem] text-muted">
            {emptyLabel}
          </p>
        }
        renderItem={(id, position, context) => {
          const option = byValue.get(id)
          return (
            <div className="flex items-center gap-3 border border-line bg-canvas px-2 py-2">
              {context.handle}
              <span className="u-label w-6 shrink-0 text-accent">{pad2(position + 1)}</span>
              <span className="min-w-0 flex-1 truncate font-body text-[0.8125rem] leading-5 text-ink">
                {option?.label ?? 'Mục không còn tồn tại'}
              </span>
              {option?.note ? <span className="u-label shrink-0 text-muted">{option.note}</span> : null}
              <button
                type="button"
                aria-label={`Bỏ ${option?.label ?? 'mục'}`}
                onClick={() => onChange(value.filter((_, i) => i !== position))}
                className="border border-transparent p-1.5 text-muted transition-colors duration-200 hover:border-line hover:text-accent"
              >
                <TrashIcon className="text-sm" />
              </button>
            </div>
          )
        }}
      />
    </FormRow>
  )
}
