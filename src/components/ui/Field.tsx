'use client'

import { createContext, useContext, useId, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type ControlTone = 'ink' | 'light'

export interface FieldContextValue {
  id: string
  describedBy: string | undefined
  invalid: boolean
  required: boolean
  tone: ControlTone
}

const FieldContext = createContext<FieldContextValue | null>(null)

/** Read by Input / Textarea / Select so they inherit id + aria wiring. */
export function useFieldControl(): FieldContextValue | null {
  return useContext(FieldContext)
}

export interface FieldProps {
  label: ReactNode
  hint?: ReactNode
  error?: string | null
  required?: boolean
  tone?: ControlTone
  className?: string
  children: ReactNode
}

/**
 * Label + control + hint/error. Wrap exactly one control; the control picks up
 * `id`, `aria-describedby`, `aria-invalid` and `required` from context.
 */
export function Field({ label, hint, error, required = false, tone = 'ink', className, children }: FieldProps) {
  const uid = useId()
  const id = `${uid}-control`
  const messageId = error ? `${uid}-error` : hint ? `${uid}-hint` : undefined

  return (
    <FieldContext.Provider value={{ id, describedBy: messageId, invalid: Boolean(error), required, tone }}>
      <div className={cn('flex flex-col gap-3', className)}>
        <label htmlFor={id} className={cn('u-label flex items-center gap-2', tone === 'light' && 'text-canvas/60')}>
          {label}
          {required ? (
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          ) : null}
        </label>

        {children}

        {error ? (
          <p id={messageId} role="alert" className="font-body text-[0.75rem] leading-relaxed text-accent">
            {error}
          </p>
        ) : hint ? (
          <p
            id={messageId}
            className={cn('font-body text-[0.75rem] leading-relaxed text-muted', tone === 'light' && 'text-canvas/45')}
          >
            {hint}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  )
}

/** Shared control chrome: square, borderless except a hairline underline. */
export function controlClasses(tone: ControlTone, invalid: boolean, className?: string): string {
  return cn(
    'w-full rounded-none border-0 border-b bg-transparent px-0 py-3 font-body text-[0.9375rem] leading-normal transition-colors duration-500 ease-editorial',
    'disabled:cursor-not-allowed disabled:opacity-40',
    tone === 'light'
      ? 'border-canvas/25 text-canvas placeholder:text-canvas/35 focus:border-canvas'
      : 'border-line text-ink placeholder:text-muted/70 focus:border-ink',
    invalid && 'border-accent focus:border-accent',
    className,
  )
}
