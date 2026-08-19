'use client'

import Image from 'next/image'

import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

import { MEDIA_KIND_LABELS } from './types'

const RASTER = new Set(['image', 'depth', 'texture'])

export interface MediaThumbProps {
  media: MediaRef | null
  /** Derivative width to request. */
  width?: number
  sizes?: string
  /** Object fit — `contain` for depth maps and models, `cover` for the grid. */
  fit?: 'cover' | 'contain'
  className?: string
  priority?: boolean
}

/**
 * A media tile that fills its (positioned) parent. Non-raster kinds fall back to
 * a matte with the kind written on it — never a broken image.
 */
export function MediaThumb({
  media,
  width = 400,
  sizes = '(max-width: 768px) 50vw, 20vw',
  fit = 'cover',
  className,
  priority = false,
}: MediaThumbProps) {
  if (!media || !RASTER.has(media.kind)) {
    return (
      <div
        className={cn(
          'flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-alt text-muted',
          className,
        )}
      >
        <span aria-hidden="true" className="font-display text-3xl leading-none text-ink/30">
          {media ? '◇' : '—'}
        </span>
        <span className="u-label">{media ? MEDIA_KIND_LABELS[media.kind] : 'Trống'}</span>
      </div>
    )
  }

  const src = mediaUrl(media, width)

  return (
    <Image
      src={src}
      alt={media.alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      className={cn(fit === 'cover' ? 'object-cover' : 'object-contain', className)}
      {...(media.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: media.blurDataURL } : {})}
    />
  )
}
