'use client'

import type { InputHTMLAttributes, Ref } from 'react'

import { controlClasses, describedBy, useFieldControl, type ControlTone } from './Field'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  tone?: ControlTone
  invalid?: boolean
  ref?: Ref<HTMLInputElement>
}

export function Input({
  tone,
  invalid,
  className,
  ref,
  id,
  required,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: InputProps) {
  const field = useFieldControl()
  const resolvedTone = tone ?? field?.tone ?? 'ink'
  const isInvalid = invalid ?? field?.invalid ?? false

  return (
    <input
      {...rest}
      ref={ref}
      id={id ?? field?.id}
      required={required ?? field?.required}
      aria-describedby={describedBy(ariaDescribedBy, field?.describedBy)}
      aria-invalid={isInvalid || undefined}
      className={controlClasses(resolvedTone, isInvalid, className)}
    />
  )
}
