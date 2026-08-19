'use client'

import Image from 'next/image'
import { useRef, type ReactNode, type RefObject } from 'react'

import { useImageReveal } from '@/animations/image'
import { cn } from '@/lib/utils'
import type { MediaRef, RevealVariant } from '@/types/content'

export type ImageRatio = 'auto' | '1/1' | '3/4' | '4/5' | '2/3' | '4/3' | '3/2' | '16/9' | '21/9'

const RATIOS: Record<Exclude<ImageRatio, 'auto'>, string> = {
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  '4/5': 'aspect-[4/5]',
  '2/3': 'aspect-[2/3]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '16/9': 'aspect-video',
  '21/9': 'aspect-[21/9]',
}

export interface ImageFrameProps {
  media: MediaRef | null
  /** Overrides `media.alt`. Empty string marks the image decorative. */
  alt?: string
  ratio?: ImageRatio
  sizes?: string
  priority?: boolean
  quality?: number
  /** `true` uses `media.caption`; a node renders that instead. */
  caption?: ReactNode | boolean
  /**
   * Scroll reveal handled by the motion system. Omit for a static frame.
   * For parallax, wrap the frame in `<Parallax>` from `@/components/animation`.
   */
  reveal?: RevealVariant
  /** Oat matte behind the image — also the placeholder when `media` is null. */
  matte?: boolean
  objectFit?: 'cover' | 'contain'
  /** Slow scale on hover; pair with a `group` ancestor. */
  hoverZoom?: boolean
  className?: string
  imageClassName?: string
}

/** Binds the reveal hook without calling it conditionally in the parent. */
function RevealBinding({ target, variant }: { target: RefObject<HTMLElement | null>; variant: RevealVariant }) {
  useImageReveal(target, { variant })
  return null
}

/**
 * Every photograph on the site goes through here: next/image with the blur
 * placeholder from the media pipeline, an optional caption in `.u-label`,
 * and an optional scroll reveal.
 */
export function ImageFrame({
  media,
  alt,
  ratio = '4/3',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw',
  priority = false,
  quality,
  caption,
  reveal,
  matte = true,
  objectFit = 'cover',
  hoverZoom = false,
  className,
  imageClassName,
}: ImageFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const captionNode = caption === true ? media?.caption : caption === false ? null : caption
  const intrinsic = ratio === 'auto'

  const frame = (
    <div
      ref={frameRef}
      // `data-reveal` is the globals.css anti-flash hook; the motion hook
      // releases it via `data-reveal-ready` on every path, including disabled.
      data-reveal={reveal ? '' : undefined}
      className={cn(
        'relative overflow-hidden',
        matte && 'bg-surface-alt',
        !intrinsic && RATIOS[ratio],
        className,
      )}
    >
      {reveal ? <RevealBinding target={frameRef} variant={reveal} /> : null}

      {media ? (
        <Image
          src={media.url}
          alt={alt ?? media.alt ?? ''}
          {...(intrinsic
            ? { width: media.width ?? 1600, height: media.height ?? 1067 }
            : { fill: true })}
          sizes={sizes}
          priority={priority}
          quality={quality}
          placeholder={media.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={media.blurDataURL ?? undefined}
          className={cn(
            objectFit === 'cover' ? 'object-cover' : 'object-contain',
            intrinsic ? 'h-auto w-full' : 'h-full w-full',
            hoverZoom &&
              'transition-transform duration-[1200ms] ease-editorial will-change-transform group-hover:scale-[1.03]',
            imageClassName,
          )}
        />
      ) : (
        <div aria-hidden="true" className={cn('h-full w-full bg-surface-alt', intrinsic && 'aspect-[3/2]')} />
      )}
    </div>
  )

  if (!captionNode) return frame

  return (
    <figure className="flex flex-col gap-4">
      {frame}
      <figcaption className="u-label max-w-[46ch] normal-case tracking-[0.08em]">{captionNode}</figcaption>
    </figure>
  )
}
