'use client'

import { useSyncExternalStore } from 'react'

const subscribe = (): (() => void) => () => undefined
const getSnapshot = (): boolean => true
const getServerSnapshot = (): boolean => false

/**
 * `false` on the server and through the hydration pass, `true` afterwards.
 *
 * The one safe gate for `createPortal(…, document.body)`: it keeps the server
 * markup and the first client render identical, so the portal appears in a
 * later commit instead of tripping a hydration mismatch. It is a store read,
 * not a `setState` in an effect — nothing re-renders twice on mount.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
