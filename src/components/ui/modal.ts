'use client'

/**
 * The behaviour half of every modal in the app (ARCHITECTURE §9).
 *
 * Both dialogs — the editorial one in this kit and the denser CMS one — share
 * this hook so they cannot drift apart on the things a screen-reader or
 * keyboard user actually depends on: a focus trap, focus restored to whatever
 * opened the dialog, Escape, an inert background, and a scroll lock that also
 * pauses Lenis (which owns scrolling on every route — `Providers` sits in the
 * root layout, admin included).
 */

import { useEffect, useRef, type RefObject } from 'react'

import { useLenis } from '@/animations/scroll'

/** Everything the browser will hand keyboard focus to. */
export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/** Focusable descendants of `root`, in tab order, skipping hidden branches. */
export function focusableWithin(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (node) => node.getClientRects().length > 0 && node.closest('[inert]') === null,
  )
}

/**
 * Takes the page behind the modal out of the tab order and the accessibility
 * tree. Overlay layers mark themselves with `data-ui-overlay` so the toast
 * live region keeps announcing while a dialog is open.
 */
function deactivateBackground(): () => void {
  const touched: Element[] = []
  for (const node of Array.from(document.body.children)) {
    if (node instanceof HTMLElement && node.dataset.uiOverlay !== undefined) continue
    if (node.tagName === 'NEXTJS-PORTAL') continue
    if (node.hasAttribute('inert')) continue
    node.setAttribute('inert', '')
    touched.push(node)
  }
  return () => {
    for (const node of touched) node.removeAttribute('inert')
  }
}

export interface ModalLockOptions {
  open: boolean
  onClose: () => void
  /** The `role="dialog"` element. May arrive a frame or two late (lazy chunk). */
  panelRef: RefObject<HTMLElement | null>
}

export function useModalLock({ open, onClose, panelRef }: ModalLockOptions): void {
  const lenis = useLenis()

  // Callers pass `onClose={() => setOpen(false)}` inline, so its identity
  // changes on every parent render. Keeping it in a ref is what stops the lock
  // from re-arming — and stealing focus back to the panel — mid-typing.
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    lenis?.stop()

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const nodes = focusableWithin(panel)
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (!first || !last) {
        event.preventDefault()
        panel.focus({ preventScroll: true })
        return
      }

      const active = document.activeElement
      if (active !== null && active !== panel && !panel.contains(active)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)

    // The editorial surface is a lazy chunk, so on a first open the panel is
    // still a network round-trip away. Poll a bounded number of frames for it
    // rather than assuming it is mounted.
    let releaseBackground: (() => void) | null = null
    let panelNode: HTMLElement | null = null
    let frame = 0
    let attempts = 0
    const activate = (): void => {
      const panel = panelRef.current
      if (!panel) {
        attempts += 1
        if (attempts > 90) return
        frame = window.requestAnimationFrame(activate)
        return
      }
      panelNode = panel
      panel.removeAttribute('inert')
      releaseBackground = deactivateBackground()
      // Focusing the labelled panel (rather than its first control) is what
      // makes a screen reader read the dialog's name and description on open.
      if (!panel.contains(document.activeElement)) panel.focus({ preventScroll: true })
    }
    frame = window.requestAnimationFrame(activate)

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown, true)
      releaseBackground?.()
      // A dialog with an exit transition is still on screen for a beat after
      // `open` flips: inert keeps it out of reach while it fades.
      panelNode?.setAttribute('inert', '')
      document.body.style.overflow = overflow
      lenis?.start()
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [open, panelRef, lenis])
}
