'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type JSX } from 'react'
import type { MediaRef } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import { useReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface SceneFallbackProps {
  image?: MediaRef | null
  /** Small editorial label rendered over the image, e.g. `KHÔNG GIAN`. */
  label?: string | null
  caption?: string | null
  className?: string
  /** Scroll parallax + reveal. Off when the fallback sits under a live canvas. */
  parallax?: boolean
  priority?: boolean
  sizes?: string
}

const PARALLAX_RANGE = 48

/**
 * The no-WebGL path. It is not an apology: a full-bleed photograph with a slow
 * parallax drift and a clip reveal, so a phone that cannot run the scene still
 * gets a composed, premium frame. Pure CSS transforms — no three.js, no GSAP,
 * nothing that could fail for the same reason WebGL did.
 */
export function SceneFallback({
  image,
  label,
  caption,
  className,
  parallax = true,
  priority = false,
  sizes = '100vw',
}: SceneFallbackProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const layerRef = useRef<HTMLDivElement | null>(null)
  const [entered, setEntered] = useState(false)

  // Reduced motion means the frame is simply *there* — no reveal to wait for.
  // Derived during render rather than pushed into state from the effect: the
  // store hook is SSR-safe, so the server keeps emitting the hidden state and
  // hydration stays quiet.
  const reduced = useReducedMotion()
  const revealed = entered || reduced

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    let frame = 0
    let visible = false

    const update = (): void => {
      frame = 0
      const layer = layerRef.current
      if (!layer || !visible) return
      const rect = root.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      // −1 (below the fold) … 1 (above it)
      const centred = (rect.top + rect.height / 2 - viewport / 2) / viewport
      const offset = Math.max(-1, Math.min(1, centred)) * PARALLAX_RANGE
      layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.08)`
    }

    const schedule = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting
          if (entry.isIntersecting) {
            setEntered(true)
            schedule()
          }
        }
      },
      { rootMargin: '10% 0px', threshold: 0 },
    )
    observer.observe(root)

    if (parallax) {
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      schedule()
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [parallax, reduced])

  const src = image ? mediaUrl(image, 1600) : ''
  const alt = image?.alt ?? caption ?? ''

  return (
    <div
      ref={rootRef}
      className={cn('relative h-full w-full overflow-hidden bg-surface-alt', className)}
      data-scene-fallback=""
    >
      <div
        ref={layerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0) scale(1.08)',
          clipPath: revealed ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 12% 0%)',
          opacity: revealed ? 1 : 0,
          transition:
            'clip-path 1.4s var(--ease-editorial), opacity 1.2s var(--ease-editorial)',
        }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            {...(image?.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL } : {})}
          />
        ) : (
          <div className="h-full w-full bg-surface-alt" />
        )}
      </div>

      {/* A whisper of depth so the still frame does not read flat next to the 3D one. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 42%, rgba(19,18,16,0) 40%, rgba(19,18,16,0.34) 100%)',
        }}
      />

      {(label || caption) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-[var(--spacing-gutter)]">
          {label && <span className="u-label text-canvas/70">{label}</span>}
          {caption && <span className="u-label text-canvas/70">{caption}</span>}
        </div>
      )}
    </div>
  )
}

export default SceneFallback
