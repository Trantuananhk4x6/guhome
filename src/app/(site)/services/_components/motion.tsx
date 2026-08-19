'use client'

/**
 * Client wrappers for /services — reveals and a clip-revealing image frame, so
 * the page itself stays a server component. Contract: ARCHITECTURE §6.3.
 */

import Image from 'next/image'
import { useRef, type ReactNode } from 'react'

import { useImageReveal } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { MediaRef, RevealVariant } from '@/types/content'

export interface RevealProps {
  variant?: RevealVariant
  delay?: number
  stagger?: number
  className?: string
  children: ReactNode
}

export function Reveal({ variant = 'revealUp', delay = 0, stagger, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { variant, delay, stagger })

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  )
}

export interface TextRevealProps {
  as?: 'h1' | 'h2' | 'p' | 'div'
  by?: 'line' | 'word'
  delay?: number
  className?: string
  id?: string
  children: ReactNode
}

export function TextReveal({
  as: Tag = 'h2',
  by = 'line',
  delay = 0,
  className,
  id,
  children,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  useTextReveal(ref, { by, delay })

  const setRef = (node: HTMLElement | null): void => {
    ref.current = node
  }

  return (
    <Tag id={id} ref={setRef} data-reveal className={className}>
      {children}
    </Tag>
  )
}

export interface ImageFrameProps {
  media: MediaRef | null
  alt?: string
  /** Tailwind aspect utility — the frame holds its shape before the image loads. */
  ratio?: string
  sizes?: string
  width?: number
  priority?: boolean
  caption?: ReactNode
  variant?: RevealVariant
  className?: string
}

export function ImageFrame({
  media,
  alt,
  ratio = 'aspect-[4/5]',
  sizes = '100vw',
  width = 1600,
  priority = false,
  caption,
  variant = 'revealClip',
  className,
}: ImageFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  useImageReveal(frameRef, { variant })

  const blur = media?.blurDataURL

  return (
    <figure className={className}>
      <div ref={frameRef} data-reveal className={cn('relative overflow-hidden bg-surface-alt', ratio)}>
        {media ? (
          <Image
            src={mediaUrl(media, width)}
            alt={alt ?? media.alt ?? ''}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            {...(blur ? { placeholder: 'blur' as const, blurDataURL: blur } : {})}
          />
        ) : null}
      </div>
      {caption ? <figcaption className="u-label mt-4 flex items-center gap-3">{caption}</figcaption> : null}
    </figure>
  )
}
