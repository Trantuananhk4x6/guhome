/**
 * A single photograph inside a project story.
 *
 * The editor chooses the measure — full bleed, wide, narrow — but the *position*
 * alternates with the block's occurrence, because two IMAGE blocks in one story
 * that compose identically are the clearest possible tell that nobody composed
 * them. The first wide plate is anchored to the left gutter with a margin on its
 * right; the second is pushed right and runs off the edge of the screen with the
 * margin on its left. Same component, same data, opposite weight.
 *
 * The caption column is only reserved when there is a caption. Nothing in the
 * catalogue carries one today, so a layout that always held three columns for it
 * would hold three empty columns on every project page on the site.
 */

import { cn } from '@/lib/utils'
import type { MediaRef, RevealVariant } from '@/types/content'

import { BLEED_R, SCRIM_B } from './composition'
import { ProjectFigure } from './ProjectFigure'

export type ProjectImageWidth = 'full' | 'wide' | 'narrow'

export interface ProjectImageProps {
  media: MediaRef | null
  caption?: string
  width?: ProjectImageWidth
  reveal?: RevealVariant
  /** Falls back to `media.alt`. */
  alt?: string
  /** 0-based position among the IMAGE blocks of this story. Drives the mirror. */
  occurrence?: number
  priority?: boolean
  className?: string
}

export function ProjectImage({
  media,
  caption,
  width = 'wide',
  reveal = 'revealClip',
  alt,
  occurrence = 0,
  priority = false,
  className,
}: ProjectImageProps) {
  const text = caption ?? media?.caption ?? null
  const mirrored = occurrence % 2 === 1

  /* ------------------------------- full bleed ------------------------------ */

  if (width === 'full') {
    return (
      <div className={cn('relative w-full', className)}>
        <ProjectFigure
          media={media}
          alt={alt}
          sizes="100vw"
          width={2400}
          reveal={reveal}
          parallax
          parallaxStrength={0.3}
          shadow={false}
          // 21:9 is 686px at 1600 where 16:9 was 900 — a full-bleed interruption
          // should stop the page, not become a second hero.
          frameClassName={cn('aspect-[4/3]', mirrored ? 'md:aspect-[2/1]' : 'md:aspect-[21/9]')}
          overlay={
            text ? (
              <>
                <span
                  aria-hidden="true"
                  style={SCRIM_B}
                  className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[42%] md:block"
                />
                <p className="u-gutter u-label text-canvas/75 pointer-events-none absolute inset-x-0 bottom-8 hidden max-w-[46ch] md:block">
                  {text}
                </p>
              </>
            ) : null
          }
        />
        {text ? <p className="u-gutter u-label mt-4 max-w-[46ch] md:hidden">{text}</p> : null}
      </div>
    )
  }

  /* --------------------------------- narrow -------------------------------- */

  if (width === 'narrow') {
    return (
      <div className={cn('u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12', className)}>
        <div className="col-span-12 lg:col-span-5 lg:col-start-4">
          <ProjectFigure
            media={media}
            alt={alt}
            aspect="4 / 5"
            sizes="(min-width: 1024px) 38vw, 100vw"
            width={1600}
            priority={priority}
            reveal={reveal}
            caption={text ?? undefined}
            className="lg:items-center lg:text-center"
          />
        </div>
      </div>
    )
  }

  /* ---------------------------------- wide --------------------------------- */

  // Even: the full measure, inset in the gutter on both sides — nothing beside
  // it, so there is nothing to leave empty. Odd: pushed three columns right and
  // run off the edge of the screen, so the space on its left reads as a margin
  // the picture was placed against rather than a column that failed to fill.
  // A plate that starts at the gutter and stops short of it does the second
  // thing while looking like the first, which is the dead rectangle to avoid.
  const figureSpan = mirrored
    ? cn('col-span-12', text ? 'lg:col-span-8 lg:col-start-5' : 'lg:col-span-9 lg:col-start-4', BLEED_R)
    : cn('col-span-12', text ? 'lg:col-span-9' : 'lg:col-span-12')

  return (
    <div
      className={cn(
        'u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12 items-end gap-x-8 gap-y-6',
        className,
      )}
    >
      <div className={figureSpan}>
        <ProjectFigure
          media={media}
          alt={alt}
          sizes={mirrored ? '(min-width: 1024px) 72vw, 100vw' : '(min-width: 1024px) 92vw, 100vw'}
          width={2400}
          priority={priority}
          reveal={reveal}
          frameClassName={cn('aspect-[3/2]', mirrored ? 'lg:aspect-[16/9]' : 'lg:aspect-[2/1]')}
        />
      </div>

      {text ? (
        <p
          className={cn(
            'u-label col-span-12 max-w-[34ch] lg:col-span-3',
            mirrored ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-10',
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  )
}
