'use client'

/**
 * Two small primitives shared by every editor in the site-administration area.
 *
 * `useEditorDraft` tracks a working copy against the last saved baseline so the
 * SaveBar knows whether anything is dirty. `useActionRunner` wraps a server
 * action call in a transition and surfaces `{ error, fieldErrors, message }`.
 */

import { useCallback, useMemo, useRef, useState, useTransition } from 'react'

import type { ActionResult } from './contracts'

/* --------------------------------- drafts ---------------------------------- */

export interface EditorDraft<T> {
  value: T
  set: (updater: T | ((current: T) => T)) => void
  /** True when the working copy differs from the last committed baseline. */
  dirty: boolean
  /** Throw away local edits. */
  reset: () => void
  /** Adopt the current (or given) value as the new baseline — call after a save. */
  commit: (next?: T) => void
}

/** Structural comparison; the drafts here are plain JSON-shaped objects. */
function sameShape(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function useEditorDraft<T>(initial: T): EditorDraft<T> {
  const [value, setValue] = useState<T>(initial)
  const [baseline, setBaseline] = useState<T>(initial)

  const set = useCallback((updater: T | ((current: T) => T)) => {
    setValue((current) => (typeof updater === 'function' ? (updater as (c: T) => T)(current) : updater))
  }, [])

  const reset = useCallback(() => {
    setValue(baseline)
  }, [baseline])

  const commit = useCallback((next?: T) => {
    setValue((current) => {
      const adopted = next ?? current
      setBaseline(adopted)
      return adopted
    })
  }, [])

  const dirty = useMemo(() => !sameShape(value, baseline), [value, baseline])

  return { value, set, dirty, reset, commit }
}

/* --------------------------------- actions --------------------------------- */

export interface ActionRunner {
  pending: boolean
  error: string | null
  message: string | null
  fieldErrors: Record<string, string>
  /** Runs `call` inside a transition and stores its outcome. */
  run: (
    call: () => Promise<ActionResult>,
    options?: { success?: string; onSuccess?: (result: ActionResult) => void },
  ) => void
  clear: () => void
}

const NO_FIELD_ERRORS: Record<string, string> = {}

export function useActionRunner(): ActionRunner {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>(NO_FIELD_ERRORS)
  const inFlight = useRef(false)

  const clear = useCallback(() => {
    setError(null)
    setMessage(null)
    setFieldErrors(NO_FIELD_ERRORS)
  }, [])

  const run = useCallback<ActionRunner['run']>((call, options) => {
    if (inFlight.current) return
    inFlight.current = true
    setError(null)
    setMessage(null)
    setFieldErrors(NO_FIELD_ERRORS)

    startTransition(async () => {
      try {
        const result = await call()
        if (result.ok) {
          setMessage(options?.success ?? 'Đã lưu.')
          options?.onSuccess?.(result)
        } else {
          setError(result.error ?? 'Có lỗi xảy ra.')
          setFieldErrors(result.fieldErrors ?? NO_FIELD_ERRORS)
        }
      } catch (cause) {
        console.error('[admin] action failed', cause)
        setError('Không kết nối được máy chủ. Vui lòng thử lại.')
      } finally {
        inFlight.current = false
      }
    })
  }, [])

  return { pending, error, message, fieldErrors, run, clear }
}
