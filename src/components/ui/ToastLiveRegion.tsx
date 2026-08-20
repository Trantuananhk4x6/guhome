'use client'

/**
 * The screen-reader half of the toast stack.
 *
 * Kept apart from `ToastViewport` for two reasons: it must be in the document
 * *before* the first toast is raised (a live region inserted at the same moment
 * as its content is usually not announced), and it must stay out of the lazy
 * framer-motion chunk so mounting it in the root layout costs nothing.
 *
 * It portals to `document.body` and marks itself `data-ui-overlay`, so a toast
 * raised while a dialog is open is still announced — `useModalLock` makes the
 * rest of the document inert, but skips the overlay layer.
 */

import { createPortal } from 'react-dom'

import type { ToastItem, ToastTone } from './Toast'
import { useHydrated } from './useHydrated'

/** Tone carried as words, not colour alone (ARCHITECTURE §9). */
const TONE_PREFIX: Record<ToastTone, string> = {
  default: '',
  success: 'Thành công: ',
  error: 'Lỗi: ',
}

function announcement(item: ToastItem): string {
  const body = item.description ? `${item.title}. ${item.description}` : item.title
  return `${TONE_PREFIX[item.tone]}${body}`
}

export function ToastLiveRegion({ items }: { items: readonly ToastItem[] }) {
  const hydrated = useHydrated()
  if (!hydrated) return null

  const polite = items.filter((item) => item.tone !== 'error')
  const urgent = items.filter((item) => item.tone === 'error')

  return createPortal(
    <div data-ui-overlay="toast-live" className="sr-only">
      <div role="status" aria-live="polite" aria-atomic="false">
        {polite.map((item) => (
          <p key={item.id}>{announcement(item)}</p>
        ))}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="false">
        {urgent.map((item) => (
          <p key={item.id}>{announcement(item)}</p>
        ))}
      </div>
    </div>,
    document.body,
  )
}
