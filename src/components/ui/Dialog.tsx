'use client'

import dynamic from 'next/dynamic'
import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react'

import { useModalLock } from './modal'

export type DialogSize = 'sm' | 'md' | 'lg'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  /** Small `.u-label` eyebrow above the title. */
  eyebrow?: string
  description?: string
  /** Accessible name for a dialog with no visible `title`. */
  label?: string
  size?: DialogSize
  /** Clicking the backdrop closes the dialog. */
  dismissible?: boolean
  className?: string
  children?: ReactNode
  footer?: ReactNode
}

/**
 * The animated surface — and with it framer-motion (ARCHITECTURE §2: modals are
 * the one place it is allowed) — is a lazy chunk fetched on first open, so the
 * `@/components/ui` barrel never drags it into a page's first-load JS.
 */
const DialogSurface = dynamic(() => import('./DialogSurface'), { ssr: false })

/**
 * Modal surface. Focus trap, scroll lock, inert background and Escape live in
 * `useModalLock`; the markup and its transitions live in `DialogSurface`.
 */
export function Dialog(props: DialogProps) {
  const { open, onClose } = props
  const uid = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  /**
   * Latches on the first open and stays on, so the surface survives long enough
   * to play its exit transition. Adjusted during render rather than from an
   * effect: React re-runs this component immediately, before anything is
   * committed, so the dialog still mounts in the pass that opened it.
   */
  const [armed, setArmed] = useState(open)
  if (open && !armed) setArmed(true)

  useModalLock({ open, onClose, panelRef })
  useLenisPrevent({ open, panelRef })

  if (!armed) return null

  return <DialogSurface {...props} uid={uid} panelRef={panelRef} />
}

/**
 * Hands the mouse wheel back to the dialog.
 *
 * Lenis owns scrolling on every route and calls `preventDefault()` on every
 * wheel event it sees — while running *and* while stopped, which is the state
 * `useModalLock` leaves it in. It skips an event only when the composed path
 * crosses `data-lenis-prevent`, so the panel (which is the scroller here, capped
 * at `max-h-[85vh]`) has to carry the attribute or a long dialog cannot be
 * scrolled by wheel at all.
 *
 * Set from here rather than written into the markup because the surface is a
 * lazy `next/dynamic` chunk: `Dialog` owns the ref, and on a first open the
 * panel is still a network round-trip away, so this polls for it the way
 * `useModalLock` polls for the same node.
 */
function useLenisPrevent({
  open,
  panelRef,
}: {
  open: boolean
  panelRef: RefObject<HTMLDivElement | null>
}): void {
  useEffect(() => {
    if (!open) return

    let frame = 0
    let attempts = 0
    let marked: HTMLElement | null = null

    const attach = (): void => {
      const panel = panelRef.current
      if (!panel) {
        attempts += 1
        if (attempts > 90) return
        frame = window.requestAnimationFrame(attach)
        return
      }
      // The overlay when it is there — one attribute then covers the panel and
      // anything else that layer may hold — otherwise the panel itself.
      const target = panel.closest<HTMLElement>('[data-ui-overlay="dialog"]') ?? panel
      if (target.hasAttribute('data-lenis-prevent')) return
      target.setAttribute('data-lenis-prevent', '')
      marked = target
    }
    frame = window.requestAnimationFrame(attach)

    return () => {
      window.cancelAnimationFrame(frame)
      marked?.removeAttribute('data-lenis-prevent')
    }
  }, [open, panelRef])
}
