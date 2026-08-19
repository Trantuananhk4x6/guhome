'use client'

import type { ReactNode } from 'react'

import { adminButtonClass } from './AdminShell'
import { Dialog } from './Dialog'

export interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  /** `danger` paints the confirm button in accent — use for deletions. */
  tone?: 'default' | 'danger'
  pending?: boolean
  onConfirm: () => void
  onCancel: () => void
}

/** Yes/no gate for destructive actions. Never dismisses on a backdrop click. */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Huỷ',
  tone = 'default',
  pending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={pending ? () => undefined : onCancel}
      title={title}
      width="sm"
      closeOnBackdrop={false}
      footer={
        <>
          <button type="button" onClick={onCancel} disabled={pending} className={adminButtonClass('ghost')}>
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className={adminButtonClass(tone === 'danger' ? 'danger' : 'solid')}
          >
            {pending ? 'Đang xử lý…' : confirmLabel}
          </button>
        </>
      }
    >
      {description ? (
        <div className="font-body text-[0.8125rem] leading-6 text-muted">{description}</div>
      ) : null}
    </Dialog>
  )
}
