'use client'

/**
 * A listbox the site can actually style.
 *
 * A native `<select>` can be styled shut and not open: the popup is drawn by the
 * operating system, so its font, its row height and its selection highlight are
 * Windows' or macOS', never the studio's. On a page built out of hairlines and
 * one bronze accent, a stock blue highlight is the single most out-of-place thing
 * on screen — which is exactly what the client pointed at.
 *
 * So this is a button plus a listbox, and it re-implements what the native
 * control gave away for free. That is the real cost of styling a select, and it
 * is paid here once rather than in every form:
 *
 *   - roving focus with Up/Down/Home/End, Enter and Space to commit
 *   - Escape to close and return focus, Tab to close and move on
 *   - type-ahead: typing "nha" jumps to "Nhà phố", buffer clears after a second
 *   - `aria-activedescendant`, so a screen reader hears the option under the
 *     cursor without focus ever leaving the button
 *   - a real `<input type="hidden">`, so it posts inside a plain form exactly as
 *     a select would, and `required` still participates in validation
 *   - closes on outside pointerdown; NOT on scroll, because the list is
 *     positioned inside the field and travels with it
 *
 * It is NOT a portal. The list is absolutely positioned inside the field, which
 * keeps it inside the form's stacking and scroll context — the alternative is a
 * portal plus a position observer, and this control never appears inside a
 * clipped container on this site.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { Ref } from 'react'

import { cn } from '@/lib/utils'

import { describedBy, useFieldControl, type ControlTone } from './Field'
import { ChevronDownIcon } from './icons'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (event: { target: { name: string; value: string } }) => void
  tone?: ControlTone
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  options: SelectOption[]
  /** Shown while nothing is chosen. Not selectable — it is not a value. */
  placeholder?: string
  id?: string
  className?: string
  'aria-describedby'?: string
  ref?: Ref<HTMLButtonElement>
}

/** Type-ahead buffer lifetime. Long enough to type a word, short enough to reset. */
const TYPE_AHEAD_MS = 900

export function Select({
  name,
  value: controlled,
  defaultValue,
  onChange,
  tone,
  invalid,
  required,
  disabled,
  options,
  placeholder,
  id,
  className,
  'aria-describedby': ariaDescribedBy,
  ref,
}: SelectProps) {
  const field = useFieldControl()
  const resolvedTone = tone ?? field?.tone ?? 'ink'
  const isInvalid = invalid ?? field?.invalid ?? false
  const isRequired = required ?? field?.required
  const controlId = id ?? field?.id
  const listId = useId()

  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '')
  const current = controlled ?? uncontrolled
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const typed = useRef({ buffer: '', at: 0 })

  const selectedIndex = options.findIndex((o) => o.value === current)
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined

  const commit = useCallback(
    (index: number) => {
      const option = options[index]
      if (!option || option.disabled) return
      if (controlled === undefined) setUncontrolled(option.value)
      onChange?.({ target: { name: name ?? '', value: option.value } })
      setOpen(false)
      buttonRef.current?.focus()
    },
    [options, controlled, onChange, name],
  )

  const openAt = useCallback(() => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0)
    setOpen(true)
  }, [selectedIndex])

  // Outside pointerdown dismisses. Scroll deliberately does NOT: the list is
  // positioned `absolute` inside the field, so it travels with the control and
  // never needs re-anchoring. I had a scroll-to-close listener here, copied from
  // the portal version of this pattern, and it made the keyboard unusable —
  // Arrow keys scroll the page, which closed the list on the first press, so
  // Enter always committed whatever was highlighted when it opened.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Keep the active row in view without scrolling the page behind it.
  useEffect(() => {
    if (!open) return
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const step = (from: number, delta: number): number => {
    let next = from
    for (let i = 0; i < options.length; i += 1) {
      next = (next + delta + options.length) % options.length
      if (!options[next]?.disabled) return next
    }
    return from
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    const key = event.key
    if (!open) {
      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
        event.preventDefault()
        openAt()
      }
      return
    }
    if (key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      return
    }
    if (key === 'Tab') {
      setOpen(false)
      return
    }
    if (key === 'Enter' || key === ' ') {
      event.preventDefault()
      commit(active)
      return
    }
    if (key === 'ArrowDown') {
      event.preventDefault()
      setActive((a) => step(a, 1))
      return
    }
    if (key === 'ArrowUp') {
      event.preventDefault()
      setActive((a) => step(a, -1))
      return
    }
    if (key === 'Home') {
      event.preventDefault()
      setActive(step(options.length - 1, 1))
      return
    }
    if (key === 'End') {
      event.preventDefault()
      setActive(step(0, -1))
      return
    }
    // Type-ahead. Vietnamese labels are matched case-insensitively on their raw
    // form — a reader typing "nha" is typing what they see, diacritics and all.
    if (key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const now = Date.now()
      typed.current.buffer = now - typed.current.at > TYPE_AHEAD_MS ? key : typed.current.buffer + key
      typed.current.at = now
      const needle = typed.current.buffer.toLowerCase()
      const hit = options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(needle))
      if (hit >= 0) setActive(hit)
    }
  }

  const light = resolvedTone === 'light'

  return (
    <div ref={rootRef} className="relative">
      {/* Posts like a select would, so the form action needs no special case. */}
      <input type="hidden" name={name} value={current} />

      <button
        ref={(node) => {
          buttonRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        type="button"
        id={controlId}
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-required={isRequired || undefined}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy(ariaDescribedBy, field?.describedBy)}
        onClick={() => (open ? setOpen(false) : openAt())}
        onKeyDown={onKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-3 rounded-none border px-4 py-3 text-left font-body text-[0.9375rem] leading-normal transition-colors duration-300 ease-editorial',
          'disabled:cursor-not-allowed disabled:opacity-40',
          light
            ? 'border-canvas/25 bg-canvas/5 text-canvas hover:border-canvas/50 focus-visible:border-canvas'
            : 'border-line bg-surface/40 text-ink hover:border-muted focus-visible:border-ink',
          !selected && (light ? 'text-canvas/45' : 'text-muted/80'),
          isInvalid && 'border-accent',
          open && 'border-accent',
          className,
        )}
      >
        <span className="truncate">{selected?.label ?? placeholder ?? '—'}</span>
        <ChevronDownIcon
          className={cn(
            'shrink-0 text-base transition-transform duration-300',
            open && 'rotate-180',
            light ? 'text-canvas/50' : 'text-muted',
          )}
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={placeholder}
          // `data-lenis-prevent`: Lenis preventDefaults every wheel on the
          // document, so a nested scroller it does not know about is inert.
          data-lenis-prevent
          className={cn(
            'absolute left-0 right-0 top-[calc(100%-1px)] z-30 max-h-64 overflow-y-auto rounded-none border shadow-[0_18px_40px_-24px_rgb(0_0_0/0.45)]',
            light ? 'border-canvas/25 bg-espresso' : 'border-ink bg-canvas',
          )}
        >
          {options.map((option, index) => {
            const isSelected = option.value === current
            const isActive = index === active
            return (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                data-active={isActive}
                // pointerdown, not click: the document-level dismiss listener
                // also runs on pointerdown, and click would fire after it.
                onPointerDown={(event) => {
                  event.preventDefault()
                  commit(index)
                }}
                onPointerEnter={() => setActive(index)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 font-body text-[0.9375rem] transition-colors duration-150',
                  option.disabled && 'cursor-not-allowed opacity-40',
                  light ? 'text-canvas' : 'text-ink',
                  // The active row is marked by ground, the selected one by the
                  // accent rule at its left edge — so keyboard position and
                  // committed value never look like the same thing.
                  isActive && (light ? 'bg-canvas/10' : 'bg-surface'),
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected ? <span aria-hidden className="bg-accent h-1.5 w-1.5 shrink-0" /> : null}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
