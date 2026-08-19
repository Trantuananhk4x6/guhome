'use client'

/**
 * Small controls shared by the site-administration editors.
 * Square corners, hairline rules, no shadows — the public design language,
 * scaled down for dense forms.
 */

import { useId, useState, type ReactNode } from 'react'

import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import type { ThemeColors } from '@/types/content'

import type { ThemeColorToken } from './contracts'

/* ---------------------------------- shell ---------------------------------- */

export interface AdminPanelProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  className?: string
  children: ReactNode
}

/** A bordered block of related controls. */
export function AdminPanel({ eyebrow, title, description, actions, className, children }: AdminPanelProps) {
  return (
    <section className={cn('border border-line bg-canvas', className)}>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-2">
          {eyebrow ? <Label rule>{eyebrow}</Label> : null}
          <h2 className="u-display-sm text-ink">{title}</h2>
          {description ? <p className="max-w-[62ch] text-[0.8125rem] leading-relaxed text-muted">{description}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </header>
      <div className="px-6 py-7 sm:px-8">{children}</div>
    </section>
  )
}

/** A labelled group inside a panel — one step below `AdminPanel`. */
export function SubPanel({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Label>{title}</Label>
        {note ? <p className="text-[0.75rem] leading-relaxed text-muted">{note}</p> : null}
      </div>
      {children}
    </div>
  )
}

/* --------------------------------- colours --------------------------------- */

const HEX_INPUT = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

/** Native colour well + a hex field, labelled with the token and its role. */
export function ColorField({
  token,
  value,
  onChange,
  error,
}: {
  token: ThemeColorToken
  value: string
  onChange: (next: string) => void
  error?: string | null
}) {
  const id = useId()
  const [text, setText] = useState(value)

  // Keep the text field in step when the value changes from outside (reset).
  const [seen, setSeen] = useState(value)
  if (seen !== value) {
    setSeen(value)
    setText(value)
  }

  const commit = (next: string): void => {
    setText(next)
    const trimmed = next.trim()
    if (HEX_INPUT.test(trimmed)) onChange(trimmed.toLowerCase())
  }

  const swatch = HEX_INPUT.test(value) ? value : '#000000'

  return (
    <div className="flex items-start gap-4 border-b border-line py-4 last:border-b-0">
      <label
        htmlFor={id}
        className="relative mt-0.5 h-12 w-12 shrink-0 cursor-pointer border border-line"
        style={{ backgroundColor: swatch }}
      >
        <input
          id={id}
          type="color"
          value={swatch}
          onChange={(event) => commit(event.target.value)}
          className="h-full w-full cursor-pointer opacity-0"
          aria-label={`${token.label} — chọn màu`}
        />
      </label>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="u-label text-ink">{token.label}</span>
        <span className="text-[0.75rem] leading-relaxed text-muted">{token.role}</span>
        <code className="text-[0.6875rem] tracking-[0.08em] text-muted/70">{token.cssVar}</code>
        {error ? <span className="text-[0.75rem] text-accent">{error}</span> : null}
      </div>

      <div className="w-32 shrink-0">
        <Input
          value={text}
          onChange={(event) => commit(event.target.value)}
          onBlur={() => setText(value)}
          spellCheck={false}
          inputMode="text"
          aria-label={`${token.label} — mã hex`}
          invalid={Boolean(error)}
          className="py-2 text-[0.8125rem] uppercase"
        />
      </div>
    </div>
  )
}

/** Convenience wrapper: a whole `ThemeColors` object edited token by token. */
export function ColorTokenList({
  tokens,
  colors,
  onChange,
  fieldErrors,
}: {
  tokens: readonly ThemeColorToken[]
  colors: ThemeColors
  onChange: (key: keyof ThemeColors, next: string) => void
  fieldErrors?: Record<string, string>
}) {
  return (
    <div className="flex flex-col">
      {tokens.map((token) => (
        <ColorField
          key={token.key}
          token={token}
          value={colors[token.key]}
          onChange={(next) => onChange(token.key, next)}
          error={fieldErrors?.[`colors.${token.key}`] ?? null}
        />
      ))}
    </div>
  )
}

/* --------------------------------- sliders --------------------------------- */

export function SliderField({
  label,
  note,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string
  note?: string
  value: number
  min: number
  max: number
  step: number
  onChange: (next: number) => void
  format?: (value: number) => string
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2 border-b border-line py-4 last:border-b-0">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="u-label text-ink">
          {label}
        </label>
        <span className="font-body text-[0.8125rem] tabular-nums text-accent">
          {format ? format(value) : value.toFixed(2)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-px w-full cursor-pointer appearance-none bg-line accent-[var(--c-accent)]"
      />
      {note ? <p className="text-[0.75rem] leading-relaxed text-muted">{note}</p> : null}
    </div>
  )
}

/* --------------------------------- toggles --------------------------------- */

export function ToggleRow({
  label,
  note,
  checked,
  onChange,
  disabled,
}: {
  label: string
  note?: string
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
}) {
  const id = useId()
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-6 border-b border-line py-4 last:border-b-0',
        disabled && 'opacity-40',
      )}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="u-label text-ink">
          {label}
        </label>
        {note ? <p className="text-[0.75rem] leading-relaxed text-muted">{note}</p> : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-5 w-10 shrink-0 border transition-colors duration-300 ease-editorial',
          checked ? 'border-accent bg-accent' : 'border-line bg-surface',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-all duration-300 ease-editorial',
            checked ? 'left-[calc(100%-1rem)] bg-canvas' : 'left-0.5 bg-muted',
          )}
        />
      </button>
    </div>
  )
}

/* ---------------------------------- tags ----------------------------------- */

export function TagsField({
  value,
  onChange,
  placeholder = 'Thêm thẻ rồi nhấn Enter',
  max = 12,
}: {
  value: readonly string[]
  onChange: (next: string[]) => void
  placeholder?: string
  max?: number
}) {
  const [text, setText] = useState('')

  const add = (): void => {
    const tag = text.trim()
    if (tag.length === 0) return
    if (value.length >= max) return
    if (value.some((existing) => existing.toLowerCase() === tag.toLowerCase())) {
      setText('')
      return
    }
    onChange([...value, tag])
    setText('')
  }

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <li key={`${tag}-${index}`} className="flex items-center gap-2 border border-line px-3 py-1.5">
              <span className="font-body text-[0.75rem] text-ink">{tag}</span>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="text-[0.75rem] leading-none text-muted transition-colors hover:text-accent"
                aria-label={`Xoá thẻ ${tag}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <Input
        value={text}
        placeholder={placeholder}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault()
            add()
          } else if (event.key === 'Backspace' && text.length === 0 && value.length > 0) {
            onChange(value.slice(0, -1))
          }
        }}
        onBlur={add}
      />
    </div>
  )
}

/* --------------------------------- statuses -------------------------------- */

export type PillTone = 'neutral' | 'accent' | 'ink' | 'muted'

const PILL_TONES: Record<PillTone, string> = {
  neutral: 'border-line text-muted',
  accent: 'border-accent text-accent',
  ink: 'border-ink bg-ink text-canvas',
  muted: 'border-line bg-surface text-muted',
}

export function StatusPill({ tone = 'neutral', children }: { tone?: PillTone; children: ReactNode }) {
  return (
    <span className={cn('u-label inline-flex items-center border px-2.5 py-1 leading-none', PILL_TONES[tone])}>
      {children}
    </span>
  )
}

/* --------------------------------- messages -------------------------------- */

/** Inline outcome line used under forms that do not own a SaveBar. */
export function ActionMessage({ error, message }: { error?: string | null; message?: string | null }) {
  if (error) {
    return (
      <p role="alert" className="border-l border-accent pl-3 font-body text-[0.8125rem] leading-relaxed text-accent">
        {error}
      </p>
    )
  }
  if (message) {
    return (
      <p role="status" className="border-l border-line pl-3 font-body text-[0.8125rem] leading-relaxed text-muted">
        {message}
      </p>
    )
  }
  return null
}
