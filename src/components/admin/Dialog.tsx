'use client'

import { useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

import { CloseIcon } from '@/components/ui/icons'
import { useModalLock } from '@/components/ui/modal'
import { useHydrated } from '@/components/ui/useHydrated'

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
 * Modal shell: portalled to `document.body`, Escape to dismiss, focus trapped
 * in the panel and restored on close, the rest of the document made inert and
 * its scrolling (Lenis included) held while open — all of it in `useModalLock`,
 * shared with the public kit so the two cannot drift.
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
  const uid = useId()
  const panelRef = useRef<HTMLDivElement | null>(null)
  // `false` on the server and through hydration — the portal target only exists
  // after that, and a matching first render is what keeps hydration quiet.
  const hydrated = useHydrated()

  useModalLock({ open, onClose, panelRef })

  if (!hydrated || !open) return null

  return createPortal(
    // `data-ui-overlay` keeps this layer out of the inert sweep the lock runs
    // over the rest of the document.
    //
    // `data-lenis-prevent` is what makes a mouse wheel work in here at all.
    // Lenis owns scrolling on every route (admin included) and calls
    // `preventDefault()` on every wheel it sees — while running *and* while
    // stopped, which is exactly the state `useModalLock` puts it in. Lenis skips
    // an event whose composed path crosses this attribute, so marking the
    // outermost layer hands the wheel back to this overlay and to every scroller
    // nested inside it (the panel body included).
    <div
      data-ui-overlay="dialog"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
    >
      <div
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
        className="fixed inset-0 bg-espresso/50"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        aria-describedby={description ? `${uid}-description` : undefined}
        tabIndex={-1}
        className={cn(
          'relative my-auto flex w-full flex-col border border-line bg-canvas focus:outline-none',
          // Capped to the viewport minus the overlay's own padding, so header and
          // footer stay pinned and only the body between them scrolls. Without
          // this the panel grows to its content — a 180-row media list pushed the
          // footer, and with it the primary action, thousands of pixels below the
          // fold.
          'max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)]',
          WIDTHS[width],
          className,
        )}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 id={`${uid}-title`} className="font-display text-[1.375rem] font-normal leading-tight">
              {title}
            </h2>
            {description ? (
              <p id={`${uid}-description`} className="mt-1 font-body text-[0.75rem] leading-5 text-muted">
                {description}
              </p>
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
          <footer className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-line px-5 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
