'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

import { CloseIcon } from '@/components/ui/icons'

export type DialogWidth = 'sm' | 'md' | 'lg' | 'xl'

const WIDTHS: Record<DialogWidth, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
}

export interface DialogProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  width?: DialogWidth
  /** Sticky action row at the bottom of the panel. */
  footer?: ReactNode
  /** Set false for destructive flows where a stray click must not dismiss. */
  closeOnBackdrop?: boolean
  className?: string
  bodyClassName?: string
  children: ReactNode
}

/**
 * Modal shell: portalled to `document.body`, Escape to dismiss, focus moved to
 * the panel and restored on close, background scroll locked while open.
 * Square corners, hairline border — no glass, no shadow.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  width = 'md',
  footer,
  closeOnBackdrop = true,
  className,
  bodyClassName,
  children,
}: DialogProps) {
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    const frame = window.requestAnimationFrame(() => {
      panelRef.current?.focus()
    })

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      restoreRef.current?.focus()
    }
  }, [open, onClose])

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
        className="fixed inset-0 bg-espresso/50"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        tabIndex={-1}
        className={cn(
          'relative my-auto flex w-full flex-col border border-line bg-canvas focus:outline-none',
          WIDTHS[width],
          className,
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 className="font-display text-[1.375rem] font-light leading-tight">{title}</h2>
            {description ? (
              <p className="mt-1 font-body text-[0.75rem] leading-5 text-muted">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="-mr-1 -mt-1 border border-transparent p-2 text-muted transition-colors duration-200 hover:border-line hover:text-ink"
          >
            <CloseIcon className="text-base" />
          </button>
        </header>

        <div className={cn('min-h-0 flex-1 overflow-y-auto px-5 py-5', bodyClassName)}>{children}</div>

        {footer ? (
          <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-line px-5 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
