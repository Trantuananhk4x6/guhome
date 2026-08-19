'use client'

/**
 * An image inside a square-cornered frame that clip-reveals on scroll, with an
 * optional parallax layer. Uses the motion contract in ARCHITECTURE §6.3 —
 * never three.js.
 */

import Image from 'next/image'
import { useRef, type ReactNode } from 'react'

import { useImageReveal, useParallax } from '@/animations/image'
import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { MediaRef, RevealVariant } from '@/types/content'

export interface ImageFrameProps {
  media: MediaRef | null
  /** Defaults to `media.alt`. Pass `''` for a purely decorative image. */
  alt?: string
  /** Tailwind aspect utility — the frame keeps its shape before the image loads. */
  ratio?: string
  sizes?: string
  /** Derivative width to request from the media pipeline. */
  width?: number
  priority?: boolean
  caption?: ReactNode
  variant?: RevealVariant
  parallax?: boolean
  /** 0..1, only read when `parallax` is on. */
  strength?: number
  className?: string
}

interface PictureProps {
  media: MediaRef | null
  alt?: string
  sizes: string
  width: number
  priority: boolean
}

function Picture({ media, alt, sizes, width, priority }: PictureProps) {
  if (!media) return <div aria-hidden="true" className="absolute inset-0 bg-surface-alt" />

  const blur = media.blurDataURL

  return (
    <Image
      src={mediaUrl(media, width)}
      alt={alt ?? media.alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
      {...(blur ? { placeholder: 'blur' as const, blurDataURL: blur } : {})}
    />
  )
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="u-label mt-4 flex items-center gap-3">{children}</figcaption>
}

function RevealFrame(props: ImageFrameProps) {
  const {
    media,
    alt,
    ratio = 'aspect-[4/5]',
    sizes = '100vw',
    width = 1600,
    priority = false,
    caption,
    variant = 'revealClip',
    className,
  } = props

  const frameRef = useRef<HTMLDivElement>(null)
  useImageReveal(frameRef, { variant })

  return (
    <figure className={className}>
      <div ref={frameRef} data-reveal className={cn('relative overflow-hidden bg-surface-alt', ratio)}>
        <Picture media={media} alt={alt} sizes={sizes} width={width} priority={priority} />
      </div>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}

function ParallaxFrame(props: ImageFrameProps) {
  const {
    media,
    alt,
    ratio = 'aspect-[4/5]',
    sizes = '100vw',
    width = 1600,
    priority = false,
    caption,
    variant = 'revealClip',
    strength = 0.5,
    className,
  } = props

  const frameRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  useImageReveal(frameRef, { variant })
  useParallax(layerRef, { strength })

  return (
    <figure className={className}>
      <div ref={frameRef} data-reveal className={cn('relative overflow-hidden bg-surface-alt', ratio)}>
        {/*
          Taller than the frame so the parallax travel never exposes an edge.
          `data-reveal-media` makes this layer the target of the frame's reveal,
          which leaves the <img> itself free for the parallax drift — the two
          hooks then never write to the same transform.
        */}
        <div ref={layerRef} data-reveal-media className="absolute inset-x-0 -top-[9%] h-[118%]">
          <Picture media={media} alt={alt} sizes={sizes} width={width} priority={priority} />
        </div>
      </div>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}

export function ImageFrame(props: ImageFrameProps) {
  return props.parallax ? <ParallaxFrame {...props} /> : <RevealFrame {...props} />
}
