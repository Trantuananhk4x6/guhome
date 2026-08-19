import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

import { CubeIcon, ImageIcon } from './AdminIcons'

export type MediaThumbSize = 'xs' | 'sm' | 'md' | 'lg' | 'fill'

const SIZES: Record<MediaThumbSize, string> = {
  xs: 'h-8 w-12',
  sm: 'h-12 w-16',
  md: 'h-16 w-24',
  lg: 'h-24 w-36',
  fill: 'h-full w-full',
}

const REQUEST_WIDTH: Record<MediaThumbSize, number> = {
  xs: 400,
  sm: 400,
  md: 400,
  lg: 800,
  fill: 800,
}

export interface MediaThumbProps {
  media: MediaRef | null
  size?: MediaThumbSize
  className?: string
  /** Overrides `media.alt`. Thumbnails inside a labelled row are decorative. */
  alt?: string
}

/**
 * Square media tile for tables, pickers and block previews. Uses a plain `<img>`
 * on purpose: admin thumbnails are tiny, already-derived webp files and must not
 * queue work through the image optimiser.
 */
export function MediaThumb({ media, size = 'sm', className, alt }: MediaThumbProps) {
  const box = cn(
    'flex shrink-0 items-center justify-center overflow-hidden border border-line bg-surface-alt',
    SIZES[size],
    className,
  )

  if (!media) {
    return (
      <span className={box} aria-hidden="true">
        <ImageIcon className="text-base text-muted/60" />
      </span>
    )
  }

  if (media.kind !== 'image') {
    return (
      <span className={cn(box, 'flex-col gap-1')} aria-hidden="true">
        <CubeIcon className="text-base text-muted" />
        <span className="u-label text-[0.5rem] text-muted">{media.kind}</span>
      </span>
    )
  }

  return (
    <span className={box}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mediaUrl(media, REQUEST_WIDTH[size])}
        alt={alt ?? media.alt ?? ''}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </span>
  )
}
