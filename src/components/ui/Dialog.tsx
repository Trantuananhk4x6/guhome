'use client'

import dynamic from 'next/dynamic'
import { useId, useRef, useState, type ReactNode } from 'react'

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

  if (!armed) return null

  return <DialogSurface {...props} uid={uid} panelRef={panelRef} />
}
