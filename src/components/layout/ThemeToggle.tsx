'use client'

/**
 * The visitor's light / dark switch.
 *
 * Three states, not two: light, dark, and following the machine. A two-state
 * toggle silently traps anyone who has set their OS to switch at sunset — once
 * they touch it they can never hand the decision back. "Theo máy" is a real
 * choice and it deserves a real position.
 *
 * The switch owns exactly one thing: an attribute on `<html>` and a line in
 * localStorage. Every colour on the site is already a custom property keyed off
 * that attribute, so nothing re-renders and no context has to exist — which is
 * also why the inline boot script in `<head>` can set the theme before React is
 * anywhere near the page, and there is no flash.
 */

import { useCallback, useEffect, useSyncExternalStore } from 'react'

import { THEME_ATTR, THEME_STORAGE_KEY, type AppearanceMode } from '@/lib/appearance'
import { cn } from '@/lib/utils'

type Choice = 'light' | 'dark' | 'system'

const ORDER: readonly Choice[] = ['light', 'dark', 'system']

const LABEL: Record<Choice, string> = {
  light: 'Sáng',
  dark: 'Tối',
  system: 'Theo máy',
}

/** 14px marks, drawn rather than typed — an emoji sun renders differently on every OS. */
function Glyph({ choice }: { choice: Choice }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round' } as const
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="shrink-0">
      {choice === 'light' ? (
        <>
          <circle cx="8" cy="8" r="3.1" {...common} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="8"
              y1="1.6"
              x2="8"
              y2="3.1"
              transform={`rotate(${deg} 8 8)`}
              {...common}
            />
          ))}
        </>
      ) : choice === 'dark' ? (
        <path d="M12.6 9.9A5.2 5.2 0 0 1 6.1 3.4a5.4 5.4 0 1 0 6.5 6.5Z" {...common} />
      ) : (
        <>
          <rect x="1.9" y="3.2" width="12.2" height="8.2" rx="1" {...common} />
          <line x1="5.6" y1="13.4" x2="10.4" y2="13.4" {...common} />
        </>
      )}
    </svg>
  )
}

/** Fired on this tab after a write, because `storage` only reaches other tabs. */
const CHOICE_EVENT = 'guhomes:theme'

/**
 * The EXPLICIT choice only — `null` means the visitor has never picked, which is
 * different from having picked "follow the machine". The component turns null
 * into a segment using the admin's default, so an admin who set "luôn tối" sees
 * Tối lit rather than Theo máy.
 *
 * Cached because `getSnapshot` must be referentially stable: returning a fresh
 * value each call re-renders forever.
 */
let snapshot: 'light' | 'dark' | null = null
let snapshotRaw: string | null = null
let primed = false

function readStoredChoice(): 'light' | 'dark' | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    raw = null
  }
  if (!primed || raw !== snapshotRaw) {
    primed = true
    snapshotRaw = raw
    snapshot = raw === 'dark' || raw === 'light' ? raw : null
  }
  return snapshot
}

const serverSnapshot = (): null => null
const alwaysTrue = (): boolean => true
const alwaysFalse = (): boolean => false

function subscribeToChoice(onChange: () => void): () => void {
  window.addEventListener('storage', onChange)
  window.addEventListener(CHOICE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(CHOICE_EVENT, onChange)
  }
}

function apply(choice: Choice): void {
  const root = document.documentElement
  const dark =
    choice === 'dark' ||
    (choice === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  root.setAttribute(THEME_ATTR, dark ? 'dark' : 'light')
  // `data-ground` is what neon.css keys its light layer off, so the two must move
  // together or a night palette would arrive without its glow.
  root.setAttribute('data-ground', dark ? 'dark' : 'light')
  root.style.colorScheme = dark ? 'dark' : 'light'
  try {
    if (choice === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, choice)
  } catch {
    // Private mode, or storage disabled. The choice still applies to this page;
    // it simply will not survive a reload, which is better than throwing.
  }
}

export interface ThemeToggleProps {
  /** The admin's default, used when the visitor has never chosen. */
  mode: AppearanceMode
  className?: string
}

export function ThemeToggle({ mode, className }: ThemeToggleProps) {
  /**
   * The stored choice is a client-only value the server cannot know, which is
   * exactly what `useSyncExternalStore` is for: it lets the server snapshot be
   * `null` — lighting no segment — without a hydration mismatch, and without the
   * extra paint that reading it in an effect would cost. `subscribe` also picks
   * up a change made in another tab.
   */
  // Server render lights nothing: it cannot know the visitor's stored choice, and
  // guessing would flash the wrong segment for a frame.
  const mounted = useSyncExternalStore(subscribeToChoice, alwaysTrue, alwaysFalse)
  const stored = useSyncExternalStore(subscribeToChoice, readStoredChoice, serverSnapshot)
  // No explicit choice yet: the lit segment is whatever the admin set as the
  // default. `auto` is the machine, and the other two are themselves.
  const choice: Choice | null =
    stored ?? (mounted ? (mode === 'auto' ? 'system' : mode) : null)

  // Following the machine means following it as it changes, not just at load.
  useEffect(() => {
    if (choice !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = (): void => apply('system')
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [choice])

  const pick = useCallback((next: Choice): void => {
    apply(next)
    // `apply` writes storage; tell this tab, since `storage` only fires in others.
    window.dispatchEvent(new Event(CHOICE_EVENT))
  }, [])

  return (
    <div
      role="radiogroup"
      aria-label="Nền sáng hoặc tối"
      className={cn('border-line inline-flex items-center border', className)}
    >
      {ORDER.map((option) => {
        const active = choice === option
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            // Title as well as the label, because at this size the label is
            // hidden below `sm` and the glyph alone is not self-explanatory.
            title={LABEL[option]}
            onClick={() => pick(option)}
            className={cn(
              'u-label inline-flex items-center gap-2 px-3 py-2 text-[0.625rem] transition-colors duration-300',
              'focus-visible:outline-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1',
              active ? 'text-accent' : 'text-muted hover:text-ink',
            )}
          >
            <Glyph choice={option} />
            <span className="hidden sm:inline">{LABEL[option]}</span>
          </button>
        )
      })}
    </div>
  )
}
