'use client'

/**
 * The animated half of `Dialog`, kept in its own module so framer-motion stays
 * out of the shared client bundle: `Dialog` pulls this in through
 * `next/dynamic({ ssr: false })` the first time it is opened.
 *
 * `@/components/ui` re-exports `Dialog`, so a single static framer-motion import
 * here would follow any barrel consumer — including a homepage section — into
 * the first-load JS (ARCHITECTURE §8).
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { RefObject } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

import type { DialogProps, DialogSize } from './Dialog'
import { CloseIcon } from './icons'
import { Label } from './Label'

const SIZES: Record<DialogSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
}

export interface DialogSurfaceProps extends DialogProps {
  /** Stable id from `useId()`, used for the aria relationships. */
  uid: string
  /** Owned by `Dialog` — its focus trap reads the panel from here. */
  panelRef: RefObject<HTMLDivElement | null>
}

export default function DialogSurface({
  open,
  onClose,
  title,
  eyebrow,
  description,
  label,
  size = 'md',
  dismissible = true,
  className,
  children,
  footer,
  uid,
  panelRef,
}: DialogSurfaceProps) {
  const reduced = useReducedMotion()

  if (typeof document === 'undefined') return null

  const duration = reduced ? 0 : 0.4

  return createPortal(
    <AnimatePresence>
      {open ? (
        // `data-ui-overlay` keeps this layer out of the inert sweep that
        // `useModalLock` runs over the rest of the document.
        <div
          data-ui-overlay="dialog"
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        >
          <motion.div
            aria-hidden="true"
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
            // Never leave the dialog unnamed: without a visible title it falls
            // back to the caller's `label`, then to a plain Vietnamese noun.
            aria-label={title ? undefined : (label ?? 'Hộp thoại')}
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
