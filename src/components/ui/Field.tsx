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

/**
 * Merges a caller's own `aria-describedby` with the field's hint/error id
 * instead of letting one silently replace the other.
 */
export function describedBy(own: string | undefined, field: string | undefined): string | undefined {
  const ids = [own, field].filter((id): id is string => typeof id === 'string' && id.length > 0)
  return ids.length > 0 ? ids.join(' ') : undefined
}

/** Shared control chrome: square, borderless except a hairline underline. */
/**
 * A bordered box, not an underline.
 *
 * The underline is the more editorial form and it is what this site used, but it
 * costs a form two things it cannot afford: a field has no hit area until you
 * find its 1px rule, and a row of underlines gives no sense of which controls
 * belong together. Boxed fields with a faint ground read as places to type, group
 * visually without needing more rules drawn around them, and put the focus state
 * on a shape rather than on a line the eye has to hunt for.
 *
 * Corners stay square: everything on this site does.
 */
export function controlClasses(tone: ControlTone, invalid: boolean, className?: string): string {
  return cn(
    'w-full rounded-none border px-4 py-3 font-body text-[0.9375rem] leading-normal transition-colors duration-300 ease-editorial',
    'disabled:cursor-not-allowed disabled:opacity-40',
    tone === 'light'
      ? 'border-canvas/25 bg-canvas/5 text-canvas placeholder:text-canvas/35 hover:border-canvas/50 focus:border-canvas focus:outline-none'
      : 'border-line bg-surface/40 text-ink placeholder:text-muted/70 hover:border-muted focus:border-ink focus:outline-none',
    invalid && 'border-accent focus:border-accent',
    className,
  )
}
