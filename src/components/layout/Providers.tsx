'use client'

import { useRef, type ReactNode } from 'react'

import { ScrollProvider } from '@/animations/scroll'
import { ToastProvider } from '@/components/ui/Toast'
import { useMotionStore } from '@/lib/motion'
import type { MotionConfig } from '@/types/content'

export interface ProvidersProps {
  /** The persisted `MotionConfig` from `getThemeSettings()`. */
  motion: MotionConfig
  children: ReactNode
}

/**
 * The only client boundary in the root layout.
 *
 * It seeds the motion store with the database config on the very first render —
 * before `ScrollProvider`'s layout effect re-publishes it — so anything reading
 * `motionEnabled()` during that first pass already sees the admin's settings.
 * `setConfig` is a no-op when the config is unchanged, and reduced-motion
 * detection stays where it belongs, inside `ScrollProvider`.
 */
export function Providers({ motion, children }: ProvidersProps) {
  const seeded = useRef(false)
  if (!seeded.current) {
    // Safe during render: no store subscriber has mounted yet at this point.
    seeded.current = true
    useMotionStore.getState().setConfig(motion)
  }

  return (
    <ScrollProvider motion={motion}>
      <ToastProvider>{children}</ToastProvider>
    </ScrollProvider>
  )
}
