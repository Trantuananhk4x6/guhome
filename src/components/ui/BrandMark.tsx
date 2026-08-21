import Image from 'next/image'

import { cn } from '@/lib/utils'

/**
 * The house mark, for the moments a page has nothing else to show.
 *
 * Points at the static file rather than the admin-configured `logoMediaId` on
 * purpose. Both places this renders — the route loading state and the 3D
 * curtain — exist precisely because something is not ready yet, so adding a
 * database round-trip to fetch the logo would make the loading screen the
 * slowest thing on the page. The wordmark version is not used here either: at
 * this size and against a photograph, the mark alone reads faster.
 *
 * If the studio ever replaces its logo through the admin, this file has to be
 * replaced too. That is the cost of not querying, and it is the right trade for
 * a surface whose whole job is to appear instantly.
 */
export interface BrandMarkProps {
  /** Tailwind size classes, e.g. `h-10 w-10`. */
  className?: string
  /**
   * Breathe while waiting. Off by default: a mark that pulses when nothing is
   * actually pending reads as a stuck page rather than a working one.
   */
  waiting?: boolean
  /** On a dark ground the navy half of the mark disappears; lift it. */
  onDark?: boolean
}

export function BrandMark({ className, waiting = false, onDark = false }: BrandMarkProps) {
  return (
    <Image
      src="/brand/guhomes-mark-256.png"
      alt=""
      aria-hidden
      width={256}
      height={256}
      priority
      className={cn(
        'select-none',
        // The mark is navy and gold. Navy on espresso is nearly invisible, so on
        // a dark ground it gets a slight lift rather than a different asset —
        // one file, and no second thing to keep in sync when the logo changes.
        onDark && 'brightness-[1.35] contrast-[0.92]',
        waiting && 'motion-safe:animate-[brand-breathe_2.4s_ease-in-out_infinite]',
        className,
      )}
    />
  )
}
