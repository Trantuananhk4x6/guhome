import Image from 'next/image'

import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

export interface SectionImageProps {
  media: MediaRef | null
  /** Used only when the media row carries no `alt` of its own. */
  alt?: string
  sizes: string
  className?: string
  priority?: boolean
  /** Derivative width to request from the media pipeline. */
  width?: number
}

/**
 * Every homepage image goes through here: a `fill` image inside a positioned,
 * square-cornered frame. Missing media degrades to a flat matte rather than a
 * broken file, so a half-seeded database never shows a torn layout.
 */
export function SectionImage({
  media,
  alt,
  sizes,
  className,
  priority = false,
  width = 1600,
}: SectionImageProps) {
  if (!media || media.kind !== 'image') {
    return <span aria-hidden="true" className={cn('absolute inset-0 block bg-surface-alt', className)} />
  }

  const blur = media.blurDataURL && media.blurDataURL.startsWith('data:') ? media.blurDataURL : null

  return (
    <Image
      src={mediaUrl(media, width)}
      alt={media.alt ?? alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', className)}
      {...(blur ? { placeholder: 'blur' as const, blurDataURL: blur } : {})}
    />
  )
}
