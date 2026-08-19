'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

import { CloseIcon } from './icons'
import { Label } from './Label'

export type DialogSize = 'sm' | 'md' | 'lg'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  /** Small `.u-label` eyebrow above the title. */
  eyebrow?: string
  description?: string
  size?: DialogSize
  /** Clicking the backdrop closes the dialog. */
  dismissible?: boolean
  className?: string
  children?: ReactNode
  footer?: ReactNode
}

const SIZES: Record<DialogSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Modal surface — the one place framer-motion is allowed (ARCHITECTURE §2).
 * Never rendered on the homepage, so it stays out of that bundle.
 */
export function Dialog({
  open,
  onClose,
  title,
  eyebrow,
  description,
  size = 'md',
  dismissible = true,
  className,
  children,
  footer,
}: DialogProps) {
  const uid = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null,
      )
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (!first || !last) {
        event.preventDefault()
        panel.focus()
        return
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown, true)

    const frame = window.requestAnimationFrame(() => {
      const panel = panelRef.current
      if (!panel) return
      const target = panel.querySelector<HTMLElement>(FOCUSABLE)
      ;(target ?? panel).focus()
    })

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown, true)
      document.body.style.overflow = overflow
      restoreRef.current?.focus()
    }
  }, [open, handleKeyDown])

  if (!mounted) return null

  const duration = reduced ? 0 : 0.4

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            className="absolute inset-0 bg-espresso/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={dismissible ? onClose : undefined}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? `${uid}-title` : undefined}
            aria-describedby={description ? `${uid}-description` : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 16 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative max-h-[85vh] w-full overflow-y-auto rounded-none border border-line bg-canvas p-8 md:p-12',
              SIZES[size],
              className,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 top-6 inline-flex h-8 w-8 items-center justify-center text-muted transition-colors duration-300 hover:text-ink"
            >
              <CloseIcon className="text-lg" />
              <span className="sr-only">Đóng</span>
            </button>

            {eyebrow ? <Label className="mb-5">{eyebrow}</Label> : null}
            {title ? (
              <h2 id={`${uid}-title`} className="u-display-sm pr-10 text-ink">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p id={`${uid}-description`} className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                {description}
              </p>
            ) : null}
            {children ? <div className={cn(title || description ? 'mt-8' : null)}>{children}</div> : null}
            {footer ? <div className="mt-10 flex flex-wrap items-center gap-4">{footer}</div> : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
