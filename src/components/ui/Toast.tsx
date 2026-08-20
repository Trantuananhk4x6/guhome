'use client'

import dynamic from 'next/dynamic'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

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
}

const ToastContext = createContext<ToastApi | null>(null)

/**
 * The portal — and with it framer-motion — is a separate lazy chunk, fetched the
 * first time a toast is raised. This provider sits in the root layout, so a
 * static import would put framer-motion in the shared client bundle of every
 * public page, which ARCHITECTURE §8 forbids.
 */
const ToastViewport = dynamic(() => import('./ToastViewport'), { ssr: false })

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
   * to play the exit animation of the last item.
   */
  const [armed, setArmed] = useState(false)
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach((timer) => clearTimeout(timer))
      pending.clear()
    }
  }, [])

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, tone = 'default', duration = 5000 }: ToastOptions) => {
      counter += 1
      const id = `toast-${counter}`
      setArmed(true)
      setItems((current) => [...current, { id, title, description, tone, duration }])
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        )
      }
      return id
    },
    [dismiss],
  )

  const api = useMemo<ToastApi>(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={api}>
      {children}
      {armed ? <ToastViewport items={items} onDismiss={dismiss} /> : null}
    </ToastContext.Provider>
  )
}
