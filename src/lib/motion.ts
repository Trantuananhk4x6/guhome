'use client'

/**
 * Motion state — the single source of truth for "is this animation allowed to run".
 *
 * The store is filled from the DB-backed `ThemeSettings.motion` by `ScrollProvider`
 * (see `@/animations/scroll`), so the admin theme editor can dial motion down —
 * or off — site-wide without a rebuild. `motionEnabled()` is deliberately a plain
 * function (not a hook) so it can be called from inside `gsap.context()` callbacks
 * and event handlers.
 */

import { useEffect } from 'react'
import { create } from 'zustand'
import type { MotionConfig } from '@/types/content'

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
 */
export function useReducedMotion(): boolean {
  const config = useMotionStore((s) => s.config)
  const systemReduced = useMotionStore((s) => s.reduced)

  useEffect(() => {
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
