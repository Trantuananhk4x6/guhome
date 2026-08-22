'use client'

/**
 * Numeric controls for the scene editor.
 *
 * Every control is a slider *and* a number field over the same value: drag for
 * feel, type for precision. Values are clamped on the way out so the editor can
 * never post something the server schema will reject.
 */

import type { ReactNode } from 'react'

import { clamp, cn } from '@/lib/utils'
import type { Vec3 } from '@/types/content'

/* --------------------------------- group ---------------------------------- */

export interface ControlGroupProps {
  title: string
  hint?: string
  onReset?: () => void
  children: ReactNode
  className?: string
}

export function ControlGroup({ title, hint, onReset, children, className }: ControlGroupProps) {
  return (
    <section className={cn('border-b border-line py-7', className)}>
      <header className="mb-5 flex items-baseline justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="u-label text-ink">{title}</h3>
          {hint ? <p className="text-[0.75rem] leading-relaxed text-muted">{hint}</p> : null}
        </div>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="u-label shrink-0 border-b border-line pb-0.5 text-muted transition-colors duration-500 ease-editorial hover:border-ink hover:text-ink"
          >
            Đặt lại
          </button>
        ) : null}
      </header>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  )
}

/* ------------------------------ number slider ------------------------------ */

export interface NumberSliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  hint?: string
  disabled?: boolean
  onChange: (value: number) => void
}

function round(value: number, step: number): number {
  const decimals = step >= 1 ? 0 : Math.min(4, Math.ceil(-Math.log10(step)))
  return Number(value.toFixed(decimals))
}

export function NumberSlider({
  label,
  value,
  min,
  max,
  step = 0.01,
  suffix,
  hint,
  disabled = false,
  onChange,
}: NumberSliderProps) {
  function commit(next: number): void {
    if (!Number.isFinite(next)) return
    onChange(round(clamp(next, min, max), step))
  }

  return (
    <div className={cn('flex flex-col gap-2', disabled && 'opacity-40')}>
      <div className="flex items-baseline justify-between gap-4">
        <label className="u-label text-[0.625rem]">{label}</label>
        <span className="flex items-baseline gap-1">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(event) => commit(Number(event.target.value))}
            aria-label={label}
            className="w-20 border-0 border-b border-line bg-transparent py-0.5 text-right font-mono text-[0.75rem] text-ink tabular-nums focus:border-ink"
          />
          {suffix ? <span className="text-[0.6875rem] text-muted">{suffix}</span> : null}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        onChange={(event) => commit(Number(event.target.value))}
        className="h-1 w-full cursor-ew-resize appearance-none bg-line accent-accent"
      />
      {hint ? <p className="text-[0.6875rem] leading-relaxed text-muted">{hint}</p> : null}
    </div>
  )
}

/* --------------------------------- toggle ---------------------------------- */

export function ToggleRow({
  label,
  value,
  hint,
  onChange,
}: {
  label: string
  value: boolean
  hint?: string
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-6">
      <span className="flex flex-col gap-1">
        <span className="u-label text-[0.625rem]">{label}</span>
        {hint ? <span className="text-[0.6875rem] leading-relaxed text-muted">{hint}</span> : null}
      </span>
      <span
        className={cn(
          'relative h-5 w-10 shrink-0 border transition-colors duration-500 ease-editorial',
          value ? 'border-accent bg-accent' : 'border-line bg-canvas',
        )}
      >
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-0.5 h-3.5 w-3.5 transition-transform duration-500 ease-editorial',
            value ? 'translate-x-[1.375rem] bg-canvas' : 'translate-x-0.5 bg-line',
          )}
        />
      </span>
    </label>
  )
}

/* -------------------------------- vec3 field ------------------------------- */

const AXES = ['X', 'Y', 'Z'] as const

export interface Vec3FieldProps {
  label: string
  value: Vec3
  step?: number
  min?: number
  max?: number
  hint?: string
  onChange: (value: Vec3) => void
}

export function Vec3Field({ label, value, step = 0.1, min = -1000, max = 1000, hint, onChange }: Vec3FieldProps) {
  function commit(index: number, raw: number): void {
    if (!Number.isFinite(raw)) return
    const next: [number, number, number] = [value[0], value[1], value[2]]
    next[index] = Number(clamp(raw, min, max).toFixed(3))
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="u-label text-[0.625rem]">{label}</span>
      <div className="grid grid-cols-3 gap-3">
        {AXES.map((axis, index) => (
          <label key={axis} className="flex items-baseline gap-2 border-b border-line pb-1">
            <span className="font-mono text-[0.625rem] text-accent">{axis}</span>
            <input
              type="number"
              step={step}
              value={value[index] ?? 0}
              aria-label={`${label} ${axis}`}
              onChange={(event) => commit(index, Number(event.target.value))}
              className="w-full border-0 bg-transparent py-0.5 text-right font-mono text-[0.75rem] text-ink tabular-nums focus:outline-none"
            />
          </label>
        ))}
      </div>
      {hint ? <p className="text-[0.6875rem] leading-relaxed text-muted">{hint}</p> : null}
    </div>
  )
}

/* --------------------------------- select ---------------------------------- */

export function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="u-label text-[0.625rem]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-none border-0 border-b border-line bg-transparent py-2 font-body text-[0.8125rem] text-ink focus:border-ink"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
