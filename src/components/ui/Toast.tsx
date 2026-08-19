'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

import { AlertIcon, CheckIcon, CloseIcon } from './icons'

export type ToastTone = 'default' | 'success' | 'error'

export interface ToastOptions {
  title: string
  description?: string
  tone?: ToastTone
  /** milliseconds; `0` keeps it until dismissed */
  duration?: number
}

interface ToastItem extends Required<Omit<ToastOptions, 'description'>> {
  id: string
  description?: string
}

export interface ToastApi {
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastApi | null>(null)

let counter = 0

export function useToast(): ToastApi {
  const api = useContext(ToastContext)
  if (!api) throw new Error('useToast() must be used inside <ToastProvider>')
  return api
}

/** Mounted once in `Providers`; every route can call `useToast()`. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const [mounted, setMounted] = useState(false)
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const reduced = useReducedMotion()

  useEffect(() => {
    setMounted(true)
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
      {mounted
        ? createPortal(
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
                        <p className="mt-1 font-body text-[0.75rem] leading-relaxed text-canvas/55">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => dismiss(item.id)}
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
        : null}
    </ToastContext.Provider>
  )
}
