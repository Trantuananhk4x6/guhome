'use client'

/**
 * Motion state — the single source of truth for "is this animation allowed to run".
 *
 * The store is filled from the DB-backed `ThemeSettings.motion` by `ScrollProvider`
 * (see `@/animations/scroll`), so the admin theme editor can dial motion down —
 * or off — site-wide without a rebuild.
 *
 * Two ways to read it, and the choice matters:
 *   - `useMotionFlag(flag)` / `useReducedMotion()` — **reactive**. Subscribe to the
 *     store, so a component re-renders when the config or the OS preference lands.
 *     This is what a component must use to decide whether to animate at all.
 *   - `motionEnabled(flag)` / `motionIntensity()` / `motionSpeed()` — **snapshots**.
 *     Plain functions, callable from inside `gsap.context()` callbacks and event
 *     handlers where a hook cannot go. They never re-render anything, so they must
 *     not gate mount-time behaviour (see the note on `motionEnabled`).
 */

import { useEffect, useLayoutEffect } from 'react'
import { create } from 'zustand'
import type { MotionConfig } from '@/types/content'

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server. Declared here
 * rather than imported from `@/animations/internal` because that module's
 * import chain leads back to this one.
 */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** Baseline used before the server config arrives, and by any consumer rendered outside `ScrollProvider`. */
export const DEFAULT_MOTION_CONFIG: MotionConfig = {
  enabled: true,
  reducedMotion: 'auto',
  scrollSmoothing: true,
  pageTransition: true,
  textReveal: true,
  imageReveal: true,
  parallax: true,
  threeDAnimation: true,
  cameraAnimation: true,
  intensity: 1,
  transitionSpeed: 1,
}

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** Reads the media query directly. Returns `false` during SSR. */
export function systemPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function configEquals(a: MotionConfig, b: MotionConfig): boolean {
  return (
    a.enabled === b.enabled &&
    a.reducedMotion === b.reducedMotion &&
    a.scrollSmoothing === b.scrollSmoothing &&
    a.pageTransition === b.pageTransition &&
    a.textReveal === b.textReveal &&
    a.imageReveal === b.imageReveal &&
    a.parallax === b.parallax &&
    a.threeDAnimation === b.threeDAnimation &&
    a.cameraAnimation === b.cameraAnimation &&
    a.intensity === b.intensity &&
    a.transitionSpeed === b.transitionSpeed
  )
}

interface MotionState {
  config: MotionConfig
  /** Raw `prefers-reduced-motion` from the OS. Combine with `config.reducedMotion` via `resolveReduced`. */
  reduced: boolean
  setConfig(c: MotionConfig): void
  setReduced(r: boolean): void
}

export const useMotionStore = create<MotionState>()((set, get) => ({
  config: DEFAULT_MOTION_CONFIG,
  reduced: false,
  setConfig: (config) => {
    if (!configEquals(get().config, config)) set({ config })
  },
  setReduced: (reduced) => {
    if (get().reduced !== reduced) set({ reduced })
  },
}))

/**
 * Combines the admin override (`config.reducedMotion`) with the OS preference.
 * `auto` follows the OS, `force` always reduces, `off` ignores the OS entirely.
 */
export function resolveReduced(config: MotionConfig, systemReduced: boolean): boolean {
  if (config.reducedMotion === 'force') return true
  if (config.reducedMotion === 'off') return false
  return systemReduced
}

/**
 * Pure form of `motionEnabled` — pass the config you already hold.
 * Hooks use this so the config is a real effect dependency instead of a hidden
 * read, which is what makes an admin change re-arm every animation on the page.
 */
export function motionFlag(config: MotionConfig, systemReduced: boolean, flag: keyof MotionConfig): boolean {
  if (!config.enabled) return false
  if (resolveReduced(config, systemReduced)) return false
  const value = config[flag]
  // Non-boolean members (`intensity`, `transitionSpeed`, `reducedMotion`) are not
  // switches; reaching here means motion is on, so report `true`.
  return typeof value === 'boolean' ? value : true
}

/**
 * `true` when the given motion feature may run right now.
 * Honours the global `enabled` switch and reduced motion before the flag itself.
 *
 * **This is a snapshot, not a subscription.** It reads the store once and never
 * re-renders anything when the answer changes. Use it only from imperative code
 * that runs at the moment of the decision — an event handler, a `gsap.context()`
 * callback, a pointer/scroll listener.
 *
 * Do **not** use it to gate mount-time behaviour. `reduced` cannot be read during
 * SSR, so it starts `false`; `ScrollProvider` publishes the OS preference and the
 * admin config in a layout effect, and a child's own effect runs *before* its
 * parent's. A component that snapshots `motionEnabled('enabled')` on mount
 * therefore reads the optimistic default and keeps the animation a
 * reduced-motion visitor opted out of. Use {@link useMotionFlag} (or
 * {@link useReducedMotion}) there: they subscribe, so a late publish re-renders
 * the consumer.
 */
export function motionEnabled(flag: keyof MotionConfig): boolean {
  const { config, reduced } = useMotionStore.getState()
  return motionFlag(config, reduced, flag)
}

/** Global 0..1 distance multiplier. Collapses to 0 when motion is off or reduced. */
export function motionIntensity(): number {
  const { config, reduced } = useMotionStore.getState()
  if (!config.enabled || resolveReduced(config, reduced)) return 0
  if (!Number.isFinite(config.intensity)) return 1
  return Math.min(2, Math.max(0, config.intensity))
}

/** Duration multiplier in seconds (1 = the tuned baseline). */
export function motionSpeed(): number {
  const { config } = useMotionStore.getState()
  if (!Number.isFinite(config.transitionSpeed) || config.transitionSpeed <= 0) return 1
  return Math.min(2, Math.max(0.4, config.transitionSpeed))
}

/* --------------------------------- hooks ---------------------------------- */

/**
 * Subscribes to `prefers-reduced-motion`, mirrors it into the store, and returns
 * the *resolved* value (admin override applied). Safe to call from many components —
 * the store de-dupes writes.
 *
 * This has to be a **layout** effect. `reduced` starts `false` (it cannot be read
 * during SSR), and every animation hook arms itself in a layout effect too. A
 * passive effect here publishes the OS preference only *after* the first paint,
 * so a visitor who asked for reduced motion would watch one frame of the reveal
 * they opted out of before it was reverted. Publishing in the layout phase makes
 * React flush the re-arm synchronously, before the browser paints. For everyone
 * else the write is `false === false` and the store drops it — no extra render.
 */
export function useReducedMotion(): boolean {
  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)

  useIsoLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(REDUCED_MOTION_QUERY)
    const apply = (): void => useMotionStore.getState().setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return resolveReduced(config, systemReduced)
}

/** Reactive counterpart of `motionEnabled` — re-renders when the config changes. */
export function useMotionFlag(flag: keyof MotionConfig): boolean {
  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)
  return motionFlag(config, systemReduced, flag)
}

/** The current `MotionConfig`. Stable identity until the admin changes it. */
export function useMotionConfig(): MotionConfig {
  return useMotionStore((s) => s.config)
}
