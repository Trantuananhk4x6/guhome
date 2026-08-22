'use client'

import dynamic from 'next/dynamic'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

import { ToastLiveRegion } from './ToastLiveRegion'

export type ToastTone = 'default' | 'success' | 'error'

export interface ToastOptions {
  title: string
  description?: string
  tone?: ToastTone
  /** milliseconds; `0` keeps it until dismissed */
  duration?: number
}

export interface ToastItem extends Required<Omit<ToastOptions, 'description'>> {
  id: string
  description?: string
}

export interface ToastApi {
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
  /** Holds every auto-dismiss timer — the stack is hovered or keyboard-focused. */
  pause: () => void
  resume: () => void
}

const ToastContext = createContext<ToastApi | null>(null)

/**
 * The portal — and with it framer-motion — is a separate lazy chunk, fetched the
 * first time a toast is raised. This provider sits in the root layout, so a
 * static import would put framer-motion in the shared client bundle of every
 * public page, which ARCHITECTURE §8 forbids.
 */
const ToastViewport = dynamic(() => import('./ToastViewport'), { ssr: false })

interface PendingToast {
  handle: ReturnType<typeof setTimeout> | null
  /** Milliseconds still owed when the timer is running or paused. */
  remaining: number
  startedAt: number
}

let counter = 0

export function useToast(): ToastApi {
  const api = useContext(ToastContext)
  if (!api) throw new Error('useToast() must be used inside <ToastProvider>')
  return api
}

/** Mounted once in `Providers`; every route can call `useToast()`. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  /**
   * Flips on the first toast and stays on, so the viewport survives long enough
   * to play the exit animation of the last item. Set from `toast()` — an event,
   * never an effect.
   */
  const [armed, setArmed] = useState(false)
  const timers = useRef(new Map<string, PendingToast>())

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach((entry) => {
        if (entry.handle) clearTimeout(entry.handle)
      })
      pending.clear()
    }
  }, [])

  const dismiss = useCallback((id: string) => {
    const entry = timers.current.get(id)
    if (entry?.handle) clearTimeout(entry.handle)
    timers.current.delete(id)
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const start = useCallback(
    (id: string, remaining: number) => {
      timers.current.set(id, {
        handle: setTimeout(() => dismiss(id), remaining),
        remaining,
        startedAt: Date.now(),
      })
    },
    [dismiss],
  )

  const toast = useCallback(
    ({ title, description, tone = 'default', duration = 5000 }: ToastOptions) => {
      counter += 1
      const id = `toast-${counter}`
      setArmed(true)
      setItems((current) => [...current, { id, title, description, tone, duration }])
      if (duration > 0) start(id, duration)
      return id
    },
    [start],
  )

  /**
   * WCAG 2.2.1: a five-second toast is not enough time to reach its dismiss
   * button by keyboard, so pointing at or focusing the stack holds the clock.
   */
  const pause = useCallback(() => {
    const now = Date.now()
    timers.current.forEach((entry, id) => {
      if (!entry.handle) return
      clearTimeout(entry.handle)
      timers.current.set(id, {
        handle: null,
        remaining: Math.max(0, entry.remaining - (now - entry.startedAt)),
        startedAt: now,
      })
    })
  }, [])

  const resume = useCallback(() => {
    timers.current.forEach((entry, id) => {
      if (entry.handle) return
      start(id, Math.max(600, entry.remaining))
    })
  }, [start])

  const api = useMemo<ToastApi>(() => ({ toast, dismiss, pause, resume }), [toast, dismiss, pause, resume])

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Always mounted, so the live region exists in the document long before
          the first toast lands in it — a region inserted together with its
          content is routinely missed by screen readers. */}
      <ToastLiveRegion items={items} />
      {armed ? (
        <ToastViewport items={items} onDismiss={dismiss} onPause={pause} onResume={resume} />
      ) : null}
    </ToastContext.Provider>
  )
}
