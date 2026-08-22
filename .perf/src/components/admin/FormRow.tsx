import type {
  InputHTMLAttributes,
  ReactNode,
  Ref,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'

/* --------------------------------- controls -------------------------------- */

/**
 * Admin controls are boxed, not underlined: the CMS is a tool, so density and
 * hit-area beat the editorial hairline of the public forms.
 */
export function adminControlClass(invalid?: boolean, className?: string): string {
  return cn(
    'w-full rounded-none border bg-canvas px-3 py-2 font-body text-[0.8125rem] leading-5 text-ink',
    'transition-colors duration-200 placeholder:text-muted/60',
    'focus:border-ink focus:outline-none focus:ring-0',
    'disabled:cursor-not-allowed disabled:bg-surface-alt disabled:opacity-60',
    invalid ? 'border-accent' : 'border-line',
    className,
  )
}

export interface AdminInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  invalid?: boolean
  ref?: Ref<HTMLInputElement>
}

export function AdminInput({ invalid, className, ref, ...rest }: AdminInputProps) {
  return (
    <input
      {...rest}
      ref={ref}
      aria-invalid={invalid || undefined}
      className={adminControlClass(invalid, className)}
    />
  )
}

export interface AdminTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'ref'> {
  invalid?: boolean
  ref?: Ref<HTMLTextAreaElement>
}

export function AdminTextarea({ invalid, className, rows = 4, ref, ...rest }: AdminTextareaProps) {
  return (
    <textarea
      {...rest}
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={adminControlClass(invalid, cn('resize-y leading-6', className))}
    />
  )
}

export interface AdminSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface AdminSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'ref' | 'children'> {
  invalid?: boolean
  options: readonly AdminSelectOption[]
  /** Rendered as the first, empty-valued option. */
  placeholder?: string
  ref?: Ref<HTMLSelectElement>
}

export function AdminSelect({ invalid, className, options, placeholder, ref, ...rest }: AdminSelectProps) {
  return (
    <select
      {...rest}
      ref={ref}
      aria-invalid={invalid || undefined}
      className={adminControlClass(invalid, cn('appearance-none bg-canvas pr-8', className))}
    >
      {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export interface AdminCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref' | 'type'> {
  label: ReactNode
  hint?: ReactNode
  ref?: Ref<HTMLInputElement>
}

/** Square checkbox + label, associated by wrapping. */
export function AdminCheckbox({ label, hint, className, ref, ...rest }: AdminCheckboxProps) {
  return (
    <label className={cn('flex cursor-pointer items-start gap-3 py-1', className)}>
      <input
        {...rest}
        ref={ref}
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-none border border-line bg-canvas transition-colors duration-200 checked:border-ink checked:bg-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
      <span className="min-w-0">
        <span className="block font-body text-[0.8125rem] leading-5 text-ink">{label}</span>
        {hint ? <span className="mt-0.5 block font-body text-[0.75rem] leading-5 text-muted">{hint}</span> : null}
      </span>
    </label>
  )
}

/* ----------------------------------- rows ---------------------------------- */

export interface FormRowProps {
  label: ReactNode
  hint?: ReactNode
  error?: string | null
  required?: boolean
  /** Renders a fieldset/legend instead of a label — for groups of controls. */
  group?: boolean
  className?: string
  children: ReactNode
}

/**
 * Label + control + hint/error. Association is by wrapping, so no `id` wiring is
 * needed and the row stays usable from server components.
 */
export function FormRow({ label, hint, error, required, group, className, children }: FormRowProps) {
  const head = (
    <span className="u-label mb-2 flex items-center gap-1.5 text-muted">
      {label}
      {required ? (
        <span aria-hidden="true" className="text-accent">
          *
        </span>
      ) : null}
    </span>
  )

  const foot = error ? (
    <span role="alert" className="mt-1.5 block font-body text-[0.75rem] leading-5 text-accent">
      {error}
    </span>
  ) : hint ? (
    <span className="mt-1.5 block font-body text-[0.75rem] leading-5 text-muted">{hint}</span>
  ) : null

  if (group) {
    return (
      <fieldset className={cn('min-w-0 border-0 p-0', className)}>
        <legend className="u-label mb-2 flex items-center gap-1.5 text-muted">
          {label}
          {required ? (
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          ) : null}
        </legend>
        {children}
        {foot}
      </fieldset>
    )
  }

  return (
    <label className={cn('block min-w-0', className)}>
      {head}
      {children}
      {foot}
    </label>
  )
}

export interface FormGridProps {
  cols?: 1 | 2 | 3
  className?: string
  children: ReactNode
}

export function FormGrid({ cols = 2, className, children }: FormGridProps) {
  return (
    <div
      className={cn(
        'grid gap-x-4 gap-y-5',
        cols === 1 ? 'grid-cols-1' : cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* -------------------------------- shorthand -------------------------------- */

export interface AdminFieldProps extends AdminInputProps {
  label: ReactNode
  hint?: ReactNode
  error?: string | null
  rowClassName?: string
}

/** `FormRow` + `AdminInput` in one call — the common case. */
export function AdminField({ label, hint, error, rowClassName, required, ...input }: AdminFieldProps) {
  return (
    <FormRow label={label} hint={hint} error={error} required={required} className={rowClassName}>
      <AdminInput {...input} required={required} invalid={Boolean(error)} />
    </FormRow>
  )
}

export interface AdminTextareaFieldProps extends AdminTextareaProps {
  label: ReactNode
  hint?: ReactNode
  error?: string | null
  rowClassName?: string
}

export function AdminTextareaField({
  label,
  hint,
  error,
  rowClassName,
  required,
  ...input
}: AdminTextareaFieldProps) {
  return (
    <FormRow label={label} hint={hint} error={error} required={required} className={rowClassName}>
      <AdminTextarea {...input} required={required} invalid={Boolean(error)} />
    </FormRow>
  )
}

export interface AdminSelectFieldProps extends AdminSelectProps {
  label: ReactNode
  hint?: ReactNode
  error?: string | null
  rowClassName?: string
}

export function AdminSelectField({
  label,
  hint,
  error,
  rowClassName,
  required,
  ...select
}: AdminSelectFieldProps) {
  return (
    <FormRow label={label} hint={hint} error={error} required={required} className={rowClassName}>
      <AdminSelect {...select} required={required} invalid={Boolean(error)} />
    </FormRow>
  )
}
