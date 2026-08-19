'use client'

/**
 * The image primitive every project surface draws through.
 *
 * One frame, one reveal, one optional parallax drift — so a gallery, a hero and a
 * card all share the same optics: square corners, limestone matte while loading,
 * a soft shadow (the only shadow in the system) and a `.u-label` caption.
 *
 * Two internal frames rather than one conditional hook set: the parallax variant
 * animates the *frame* (entrance) and the *inner media wrapper* (drift) so GSAP
 * never writes two competing transforms onto one element.
 */

import Image from 'next/image'
import { useRef } from 'react'
import type { ReactNode } from 'react'

import { useImageReveal, useParallax } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { MediaRef, RevealVariant } from '@/types/content'

/** Vertical overscan of the inner wrapper, in %. Caps the drift at ±10%. */
const OVERSCAN = 12

export interface ProjectFigureProps {
  media: MediaRef | null
  /** Overrides `media.alt`. Pass `''` for a decorative image. */
  alt?: string
  /** CSS `aspect-ratio` for the frame, e.g. `'4 / 5'`. Omit to fill the parent. */
  aspect?: string
  sizes?: string
  /** Derivative width requested from the media pipeline. */
  width?: number
  priority?: boolean
  reveal?: RevealVariant
  /** Slow vertical drift of the image inside its frame. Never exceeds ±10%. */
  parallax?: boolean
  /** 0–1, scaled again by the global motion intensity dial. */
  parallaxStrength?: number
  caption?: ReactNode
  /** Sits on top of the image — hover cues, index numbers. */
  overlay?: ReactNode
  className?: string
  frameClassName?: string
  imageClassName?: string
  shadow?: boolean
}

interface FrameInnerProps {
  media: MediaRef | null
  alt: string
  sizes: string
  width: number
  priority: boolean
  imageClassName?: string
}

function FrameContents({ media, alt, sizes, width, priority, imageClassName }: FrameInnerProps) {
  if (!media) {
    return <span aria-hidden="true" className="absolute inset-0 bg-surface-alt" />
  }

  const blur = media.blurDataURL
  return (
    <Image
      src={mediaUrl(media, width)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', imageClassName)}
      {...(blur ? { placeholder: 'blur' as const, blurDataURL: blur } : {})}
    />
  )
}

type FrameProps = FrameInnerProps & {
  aspect?: string
  reveal: RevealVariant
  className?: string
  overlay?: ReactNode
  strength: number
}

/** Entrance reveal only — the hook animates the inner `[data-reveal-media]` wrapper. */
function StaticFrame({ aspect, reveal, className, overlay, strength: _strength, ...inner }: FrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  useImageReveal(frameRef, { variant: reveal })

  return (
    <div
      ref={frameRef}
      data-reveal
      className={cn('relative isolate overflow-hidden bg-surface-alt', className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <div data-reveal-media className="absolute inset-0">
        <FrameContents {...inner} />
      </div>
      {overlay}
    </div>
  )
}

/**
 * Entrance on the frame, drift on the inner wrapper. The wrapper is overscanned
 * by `OVERSCAN`% top and bottom so the frame edge never shows through.
 */
function ParallaxFrame({ aspect, reveal, className, overlay, strength, ...inner }: FrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  useReveal(frameRef, { variant: reveal })
  useParallax(frameRef, { strength })

  return (
    <div
      ref={frameRef}
      data-reveal
      className={cn('relative isolate overflow-hidden bg-surface-alt', className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <div
        data-reveal-media
        className="absolute inset-x-0"
        style={{ top: `-${OVERSCAN}%`, bottom: `-${OVERSCAN}%` }}
      >
        <FrameContents {...inner} />
      </div>
      {overlay}
    </div>
  )
}

export function ProjectFigure({
  media,
  alt,
  aspect,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  width = 1600,
  priority = false,
  reveal = 'revealClip',
  parallax = false,
  parallaxStrength = 0.35,
  caption,
  overlay,
  className,
  frameClassName,
  imageClassName,
  shadow = true,
}: ProjectFigureProps) {
  const resolvedAlt = alt ?? media?.alt ?? ''
  const frameClasses = cn(shadow && 'shadow-[0_24px_60px_-40px_rgba(28,27,24,0.55)]', frameClassName)

  const shared = {
    media,
    alt: resolvedAlt,
    sizes,
    width,
    priority,
    imageClassName,
    aspect,
    reveal,
    className: frameClasses,
    overlay,
    strength: parallaxStrength,
  }

  return (
    <figure className={cn('flex flex-col gap-3', className)}>
      {parallax ? <ParallaxFrame {...shared} /> : <StaticFrame {...shared} />}
      {caption ? <figcaption className="u-label max-w-[46ch]">{caption}</figcaption> : null}
    </figure>
  )
}
