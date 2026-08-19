'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { adminButtonClass } from './AdminShell'

export interface SaveBarProps {
  /** Enables the reset control and shows the "unsaved" marker. */
  dirty: boolean
  /** In-flight save. `pending` is accepted as an alias. */
  saving?: boolean
  pending?: boolean
  /** Transient success / status line. */
  message?: string | null
  error?: string | null
  onSave: () => void
  saveLabel?: string
  /** Omit to hide the discard control. */
  onReset?: () => void
  resetLabel?: string
  /** Omit to hide the secondary "save & view" button. */
  onSaveAndView?: () => void
  saveAndViewLabel?: string
  /** Extra controls rendered on the left, e.g. a delete button. */
  children?: ReactNode
  className?: string
}

/**
 * Sticky action bar for editor screens. Saving is always explicit — the CMS
 * never autosaves, so this bar is the single place a save can start.
 */
export function SaveBar({
  dirty,
  saving,
  pending,
  message,
  error,
  onSave,
  saveLabel = 'Lưu',
  onReset,
  resetLabel = 'Hoàn tác',
  onSaveAndView,
  saveAndViewLabel = 'Lưu & xem',
  children,
  className,
}: SaveBarProps) {
  const busy = Boolean(saving || pending)

  return (
    <div
      className={cn(
        'sticky bottom-0 z-20 -mx-5 mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line bg-canvas px-5 py-3 lg:-mx-8 lg:px-8',
        className,
      )}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
        {children}
        {error ? (
          <p role="alert" className="font-body text-[0.75rem] leading-5 text-accent">
            {error}
          </p>
        ) : message ? (
          <p aria-live="polite" className="font-body text-[0.75rem] leading-5 text-muted">
            {message}
          </p>
        ) : (
          <p aria-live="polite" className="u-label text-muted">
            {busy ? 'Đang lưu…' : dirty ? 'Có thay đổi chưa lưu' : 'Đã đồng bộ'}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            disabled={busy || !dirty}
            className={adminButtonClass('ghost')}
          >
            {resetLabel}
          </button>
        ) : null}
        {onSaveAndView ? (
          <button
            type="button"
            onClick={onSaveAndView}
            disabled={busy}
            className={adminButtonClass('outline')}
          >
            {saveAndViewLabel}
          </button>
        ) : null}
        <button type="button" onClick={onSave} disabled={busy} className={adminButtonClass('solid')}>
          {busy ? 'Đang lưu…' : saveLabel}
        </button>
      </div>
    </div>
  )
}
