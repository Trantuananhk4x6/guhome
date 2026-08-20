'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'

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

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * The animated surface — and with it framer-motion (ARCHITECTURE §2: modals are
 * the one place it is allowed) — is a lazy chunk fetched on first open, so the
 * `@/components/ui` barrel never drags it into a page's first-load JS.
 */
const DialogSurface = dynamic(() => import('./DialogSurface'), { ssr: false })

/**
 * Modal surface. Focus trap, scroll lock and Escape handling live here; the
 * markup and its transitions live in `DialogSurface`.
 */
export function Dialog(props: DialogProps) {
  const { open, onClose } = props
  const uid = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  /** Flips on the first open and stays on, so the exit animation can play. */
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (open) setArmed(true)
  }, [open])

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

    // The surface arrives asynchronously on the very first open, so poll a few
    // frames for the panel rather than assuming it is already mounted.
    let frame = 0
    let attempts = 0
    const focusPanel = (): void => {
      const panel = panelRef.current
      if (!panel) {
        attempts += 1
        if (attempts > 60) return
        frame = window.requestAnimationFrame(focusPanel)
        return
      }
      const target = panel.querySelector<HTMLElement>(FOCUSABLE)
      ;(target ?? panel).focus()
    }
    frame = window.requestAnimationFrame(focusPanel)

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown, true)
      document.body.style.overflow = overflow
      restoreRef.current?.focus()
    }
  }, [open, handleKeyDown])

  if (!armed) return null

  return <DialogSurface {...props} uid={uid} panelRef={panelRef} />
}
