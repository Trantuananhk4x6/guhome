'use client'

import Image from 'next/image'
import { useProgress } from '@react-three/drei'
import { useEffect, useRef, useState, type JSX } from 'react'
import { gsap, registerGsap } from '@/animations/gsap'
import type { MediaRef } from '@/types/content'
import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'

export interface ThreeLoaderProps {
  /** Shown blurred behind the label — the room you are about to walk into. */
  image?: MediaRef | null
  label?: string
  className?: string
  onDone?: () => void
}

/** How long we wait for a loader to register before deciding nothing will. */
const IDLE_GRACE_MS = 700

/**
 * The scene curtain. Blurred still of the project, one editorial label, one
 * hairline that fills with progress — then a slow GSAP crossfade out. No
 * spinners: the studio does not spin.
 */
export function ThreeLoader({ image, label = 'PREPARING SPACE', className, onDone }: ThreeLoaderProps): JSX.Element | null {
  const { active, progress, errors } = useProgress()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const fillRef = useRef<HTMLDivElement | null>(null)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    registerGsap()
  }, [])

  // Hairline fill — eased so a jumpy loader still reads as a smooth draw.
  useEffect(() => {
    const fill = fillRef.current
    if (!fill) return
    const tween = gsap.to(fill, {
      scaleX: Math.max(0.02, Math.min(1, progress / 100)),
      duration: 0.7,
      ease: 'power2.out',
      overwrite: true,
    })
    return () => {
      tween.kill()
    }
  }, [progress])

  // Curtain out, once, when the loaders are quiet.
  useEffect(() => {
    if (doneRef.current) return
    const settled = !active && (progress >= 100 || errors.length > 0)
    const idle = !active && progress === 0

    const finish = (): void => {
      if (doneRef.current) return
      doneRef.current = true
      const root = rootRef.current
      if (!root) {
        setHidden(true)
        onDoneRef.current?.()
        return
      }
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.95,
        ease: 'power2.inOut',
        delay: 0.12,
        onComplete: () => {
          setHidden(true)
          onDoneRef.current?.()
        },
      })
    }

    if (settled) {
      const timer = window.setTimeout(finish, 180)
      return () => window.clearTimeout(timer)
    }
    if (idle) {
      const timer = window.setTimeout(finish, IDLE_GRACE_MS)
      return () => window.clearTimeout(timer)
    }
    return
  }, [active, progress, errors.length])

  if (hidden) return null

  const src = image ? mediaUrl(image, 1200) : ''
  const shown = Math.round(Math.min(100, Math.max(0, progress)))

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 z-20 overflow-hidden bg-espresso', className)}
      data-three-loader=""
    >
      {src && (
        <div className="absolute inset-0 scale-110 opacity-45 blur-2xl">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            {...(image?.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL } : {})}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-espresso/55" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-[var(--spacing-gutter)] pb-[calc(var(--spacing-gutter)*1.2)]">
        <div className="flex items-baseline justify-between gap-8">
          <span className="u-label text-canvas/80">{label}</span>
          <span className="u-label tabular-nums text-canvas/45">{String(shown).padStart(3, '0')}</span>
        </div>
        <div className="relative h-px w-full bg-canvas/15">
          <div
            ref={fillRef}
            className="absolute inset-y-0 left-0 w-full origin-left bg-accent-soft"
            style={{ transform: 'scaleX(0.02)' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ThreeLoader
