/**
 * A single photograph inside a project story. Three measures — full bleed, wide
 * (inside the gutter) and narrow (a column-width plate) — and any of the reveal
 * variants, chosen per block by the editor.
 */

import { cn } from '@/lib/utils'
import type { MediaRef, RevealVariant } from '@/types/content'

import { ProjectFigure } from './ProjectFigure'

export type ProjectImageWidth = 'full' | 'wide' | 'narrow'

export interface ProjectImageProps {
  media: MediaRef | null
  caption?: string
  width?: ProjectImageWidth
  reveal?: RevealVariant
  /** Falls back to `media.alt`. */
  alt?: string
  priority?: boolean
  className?: string
}

const WRAPPERS: Record<ProjectImageWidth, string> = {
  full: 'w-full',
  wide: 'u-gutter mx-auto w-full max-w-[110rem]',
  narrow: 'u-gutter mx-auto w-full max-w-[64rem]',
}

const ASPECTS: Record<ProjectImageWidth, string> = {
  full: '16 / 9',
  wide: '3 / 2',
  narrow: '4 / 5',
}

const SIZES: Record<ProjectImageWidth, string> = {
  full: '100vw',
  wide: '(min-width: 1024px) 90vw, 100vw',
  narrow: '(min-width: 1024px) 55vw, 100vw',
}

const REQUEST_WIDTH: Record<ProjectImageWidth, number> = {
  full: 2400,
  wide: 2400,
  narrow: 1600,
}

export function ProjectImage({
  media,
  caption,
  width = 'wide',
  reveal = 'revealClip',
  alt,
  priority = false,
  className,
}: ProjectImageProps) {
  return (
    <div className={cn(WRAPPERS[width], className)}>
      <ProjectFigure
        media={media}
        alt={alt}
        aspect={ASPECTS[width]}
        sizes={SIZES[width]}
        width={REQUEST_WIDTH[width]}
        priority={priority}
        reveal={reveal}
        parallax={width === 'full'}
        parallaxStrength={0.3}
        caption={caption ?? media?.caption ?? undefined}
        shadow={width !== 'full'}
      />
    </div>
  )
}
