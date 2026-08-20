'use client'

import type { Ref, SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import { controlClasses, describedBy, useFieldControl, type ControlTone } from './Field'
import { ChevronDownIcon } from './icons'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'ref' | 'children'> {
  tone?: ControlTone
  invalid?: boolean
  options: SelectOption[]
  /** Rendered as a disabled, empty-valued first option. */
  placeholder?: string
  ref?: Ref<HTMLSelectElement>
}

export function Select({
  tone,
  invalid,
  className,
  ref,
  id,
  required,
  options,
  placeholder,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: SelectProps) {
  const field = useFieldControl()
  const resolvedTone = tone ?? field?.tone ?? 'ink'
  const isInvalid = invalid ?? field?.invalid ?? false

  return (
    <div className="relative">
      <select
        {...rest}
        ref={ref}
        id={id ?? field?.id}
        required={required ?? field?.required}
        aria-describedby={describedBy(ariaDescribedBy, field?.describedBy)}
        aria-invalid={isInvalid || undefined}
        className={controlClasses(resolvedTone, isInvalid, cn('appearance-none pr-8', className))}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className={cn(
          'pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-base',
          resolvedTone === 'light' ? 'text-canvas/50' : 'text-muted',
        )}
      />
    </div>
  )
}
