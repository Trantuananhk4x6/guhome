'use client'

/**
 * The animated half of the toast stack, kept in its own module on purpose.
 *
 * `ToastProvider` pulls it in through `next/dynamic({ ssr: false })`, so
 * framer-motion lands in a lazy chunk that is only fetched the first time a
 * toast is raised — never in the shared client bundle of the public pages
 * (ARCHITECTURE §8: no framer-motion on the homepage).
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

import { AlertIcon, CheckIcon, CloseIcon } from './icons'
import type { ToastItem } from './Toast'

export interface ToastViewportProps {
  items: readonly ToastItem[]
  onDismiss: (id: string) => void
}

export default function ToastViewport({ items, onDismiss }: ToastViewportProps) {
  const reduced = useReducedMotion()

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-6 right-6 z-[120] flex w-[min(22rem,calc(100vw-3rem))] flex-col gap-3"
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 8 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-start gap-3 rounded-none border border-espresso/20 bg-espresso px-5 py-4 text-canvas"
          >
            {item.tone !== 'default' ? (
              <span
                aria-hidden="true"
                className={cn('mt-0.5 text-base', item.tone === 'error' ? 'text-accent-soft' : 'text-accent')}
              >
                {item.tone === 'error' ? <AlertIcon /> : <CheckIcon />}
              </span>
            ) : null}
            <div className="flex-1">
              <p className="font-body text-[0.8125rem] font-medium leading-snug">{item.title}</p>
              {item.description ? (
                <p className="mt-1 font-body text-[0.75rem] leading-relaxed text-canvas/55">{item.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(item.id)}
              className="mt-0.5 text-canvas/45 transition-colors duration-300 hover:text-canvas"
            >
              <CloseIcon className="text-sm" />
              <span className="sr-only">Đóng thông báo</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}
