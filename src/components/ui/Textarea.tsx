'use client'

import type { Ref, TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import { controlClasses, useFieldControl, type ControlTone } from './Field'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'ref'> {
  tone?: ControlTone
  invalid?: boolean
  ref?: Ref<HTMLTextAreaElement>
}

export function Textarea({
  tone,
  invalid,
  className,
  ref,
  id,
  required,
  rows = 4,
  'aria-describedby': describedBy,
  ...rest
}: TextareaProps) {
  const field = useFieldControl()
  const resolvedTone = tone ?? field?.tone ?? 'ink'
  const isInvalid = invalid ?? field?.invalid ?? false

  return (
    <textarea
      {...rest}
      ref={ref}
      rows={rows}
      id={id ?? field?.id}
      required={required ?? field?.required}
      aria-describedby={describedBy ?? field?.describedBy}
      aria-invalid={isInvalid || undefined}
      className={controlClasses(resolvedTone, isInvalid, cn('min-h-32 resize-y', className))}
    />
  )
}
