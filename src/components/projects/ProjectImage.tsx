/**
 * A single photograph inside a project story.
 *
 * THE FRAME IS THE PHOTOGRAPH'S, NOT THE VARIANT'S. `full` and `wide` used to
 * resolve to one shape — `lg:aspect-[2/1]` on both — which is not two variants,
 * it is one variant written twice. Worse, 2:1 was applied to whatever the
 * editor had picked: on `tam-rem-be-tong` frame 1 is a 1330×1900 portrait, and
 * a portrait in a 2:1 letterbox shows 35% of the picture and throws the rest
 * away. Every media row stores `width` and `height`; this file reads them.
 *
 * Each variant now declares two things and derives the rest:
 *
 *   WHICH STEPS of the shared proportion ladder it may use, and
 *   HOW MUCH CROP it is willing to spend (`CROP_*` below).
 *
 * `snapProportion(ratio * crop, steps)` picks the frame. A full-bleed band
 * spends 1.45 — about a third of the height — because a band is a deliberate
 * letterbox; a plate inside the measure spends 1.15, so ~87% of the picture
 * survives; a held plate spends nothing and keeps the picture's own shape.
 *
 * That alone makes the two IMAGE blocks on one page different (they are
 * different photographs) *and* makes the same block different across projects.
 * Fetched back off the eight slugs the review diffed, `wide` now resolves to
 * 4/5, 9/10, 4/3, 3/2 and 16/9, and `full` to 3/2, 2/1, 21/9 and three
 * espresso-ground portrait plates. No page's two IMAGE blocks agree.
 *
 * A PORTRAIT IS NOT A BAND. When a `full` block points at a portrait, running
 * it to the glass would mean cropping it to a strip — the opposite of what
 * full-bleed is for. The *ground* goes full-bleed instead: an espresso band
 * with the picture held inside the measure at its own proportion. The page is
 * still interrupted; the photograph is still a photograph.
 *
 * POSITION alternates with `occurrence` as before, offset by the project's
 * `phase`, so two projects whose stories both open with a wide plate do not
 * both open with it on the same side.
 *
 * CAPTIONS sit under their picture, in the picture's own column. The old
 * three-column caption rail is gone: nothing in the catalogue carries a
 * caption, so the rail only ever existed as a branch nobody could see, and a
 * caption belongs to its photograph rather than to the grid.
 */

import { cn } from '@/lib/utils'
import type { MediaRef, RevealVariant } from '@/types/content'

import {
  aspectAt,
  BLEED_L,
  BLEED_R,
  mediaRatio,
  SCRIM_B,
  snapProportion,
  type Proportion,
} from './composition'
import { ProjectFigure } from './ProjectFigure'

export type ProjectImageWidth = 'full' | 'wide' | 'narrow'

/* -------------------------------- families -------------------------------- */

/** Below this a photograph is a portrait and stops being a candidate for a band. */
const PORTRAIT_BELOW = 0.95
/** At or above this it is a landscape wide enough to hold the full measure. */
const LANDSCAPE_FROM = 1.32

/** What kind of object this photograph wants to be, read off its own proportion. */
export type ImageFamily = 'plate' | 'square' | 'band'

export function imageFamily(media: MediaRef | null | undefined): ImageFamily {
  const ratio = mediaRatio(media)
  if (ratio < PORTRAIT_BELOW) return 'plate'
  if (ratio < LANDSCAPE_FROM) return 'square'
  return 'band'
}

/**
 * True when a `full` block paints its own ground rather than running the
 * photograph to the glass. `ProjectBlocks` asks, because a block that carries
 * its own vertical padding must not also receive a wrapper gap.
 */
export function isGroundedImage(media: MediaRef | null | undefined, width: ProjectImageWidth): boolean {
  return width === 'full' && imageFamily(media) === 'plate'
}

/* ------------------------------- proportions ------------------------------- */

/** A full-bleed band: the only frames wide enough to survive running to the glass. */
const BAND_LG: readonly Proportion[] = ['3/2', '16/9', '2/1', '21/9', '5/2']
/** …and on a phone, where a 21:9 strip is 167px tall and shows nothing. */
const BAND_BASE: readonly Proportion[] = ['4/5', '1/1', '5/4', '4/3']

/** A portrait plate — the picture's own shape, one step either way. */
const PLATE_LG: readonly Proportion[] = ['2/3', '7/10', '4/5', '9/10']
const PLATE_BASE: readonly Proportion[] = ['2/3', '7/10', '4/5']

/** A square-ish photograph inside the measure. */
const SQUARE_LG: readonly Proportion[] = ['9/10', '1/1', '5/4', '4/3']

/** A landscape inside the measure — wide, but never a band's letterbox. */
const INSET_LG: readonly Proportion[] = ['4/3', '3/2', '16/9', '2/1']

/** What a stacked frame may become on a phone, whatever it is on a desktop. */
const INSET_BASE: readonly Proportion[] = ['4/5', '1/1', '5/4', '3/2']

/**
 * Crop appetite: the multiplier applied to the photograph's own ratio before
 * the frame is chosen. `ratio / crop` of the picture's height survives.
 */
const CROP_BAND = 1.45
const CROP_INSET = 1.15
const CROP_WHOLE = 1

/* -------------------------------- placement -------------------------------- */

/**
 * Where each family sits, and which way round. Every open column is on ONE side
 * of the picture and the picture leaves the gutter on the other, so the space
 * reads as a margin the plate was set against rather than as a column that
 * failed to fill — the dead rectangle this composition exists to avoid.
 */
interface Placement {
  span: string
  sizes: string
  width: number
}

/*
 * The asymmetry is an `lg` composition, because it depends on the bleed to make
 * the open columns read as a margin. Between 640 and 1023 there is no bleed —
 * the plate would simply be seven columns hard against one edge with five empty
 * ones beside it, which is the dead rectangle again. It is centred there
 * instead, and only takes a side once it can leave the gutter.
 */
const WIDE_PLATE: Record<'left' | 'right', Placement> = {
  left: {
    span: cn('col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-1', BLEED_L),
    sizes: '(min-width: 1024px) 38vw, (min-width: 640px) 66vw, 100vw',
    width: 1600,
  },
  right: {
    span: cn('col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9', BLEED_R),
    sizes: '(min-width: 1024px) 38vw, (min-width: 640px) 66vw, 100vw',
    width: 1600,
  },
}

const WIDE_SQUARE: Record<'left' | 'right', Placement> = {
  left: {
    span: cn('col-span-12 lg:col-span-8', BLEED_L),
    sizes: '(min-width: 1024px) 72vw, 100vw',
    width: 2400,
  },
  right: {
    span: cn('col-span-12 lg:col-span-8 lg:col-start-5', BLEED_R),
    sizes: '(min-width: 1024px) 72vw, 100vw',
    width: 2400,
  },
}

const WIDE_BAND: Record<'left' | 'right', Placement> = {
  // The full measure, inset in the gutter on both sides — nothing beside it, so
  // there is nothing to leave empty.
  left: {
    span: 'col-span-12',
    sizes: '(min-width: 1024px) 92vw, 100vw',
    width: 2400,
  },
  right: {
    span: cn('col-span-12 lg:col-span-9 lg:col-start-4', BLEED_R),
    sizes: '(min-width: 1024px) 76vw, 100vw',
    width: 2400,
  },
}

const PLACEMENT: Record<ImageFamily, Record<'left' | 'right', Placement>> = {
  plate: WIDE_PLATE,
  square: WIDE_SQUARE,
  band: WIDE_BAND,
}

/** The `full` plate, held inside the measure on its own ground. */
const GROUND_PLATE: Record<'left' | 'right', string> = {
  left: 'col-span-12 sm:col-span-6 sm:col-start-4 lg:col-span-4 lg:col-start-2',
  right: 'col-span-12 sm:col-span-6 sm:col-start-4 lg:col-span-4 lg:col-start-8',
}

/**
 * The `narrow` plate: the one composition on the page that is actually centred,
 * so each family takes an even span around the middle line — 4 columns from 5,
 * 6 from 4, 8 from 3. A 5-column span cannot centre on a 12-column grid, which
 * is how the square family used to sit half a column left of everything else.
 */
const HELD_PLATE: Record<ImageFamily, string> = {
  plate: 'col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-5',
  square: 'col-span-12 sm:col-span-10 sm:col-start-2 lg:col-span-6 lg:col-start-4',
  band: 'col-span-12 sm:col-span-10 sm:col-start-2 lg:col-span-8 lg:col-start-3',
}

const HELD_SIZES: Record<ImageFamily, string> = {
  plate: '(min-width: 1024px) 34vw, (min-width: 640px) 66vw, 100vw',
  square: '(min-width: 1024px) 50vw, (min-width: 640px) 82vw, 100vw',
  band: '(min-width: 1024px) 66vw, (min-width: 640px) 82vw, 100vw',
}

/** Steps permitted per family, per breakpoint, with the crop each may spend. */
function frameFor(
  family: ImageFamily,
  ratio: number,
  scale: 'held' | 'inset' | 'band',
): { base: Proportion; lg: Proportion } {
  if (scale === 'band') {
    return {
      base: snapProportion(ratio * 1.1, BAND_BASE),
      lg: snapProportion(ratio * CROP_BAND, BAND_LG),
    }
  }

  const crop = scale === 'held' ? CROP_WHOLE : CROP_INSET

  if (family === 'plate') {
    return {
      base: snapProportion(ratio * CROP_WHOLE, PLATE_BASE),
      lg: snapProportion(ratio * crop, PLATE_LG),
    }
  }

  if (family === 'square') {
    return {
      base: snapProportion(ratio * CROP_WHOLE, INSET_BASE),
      lg: snapProportion(ratio * crop, SQUARE_LG),
    }
  }

  return {
    base: snapProportion(ratio * CROP_WHOLE, INSET_BASE),
    lg: snapProportion(ratio * crop, INSET_LG),
  }
}

/* ------------------------------- the component ----------------------------- */

export interface ProjectImageProps {
  media: MediaRef | null
  caption?: string
  width?: ProjectImageWidth
  reveal?: RevealVariant
  /** Falls back to `media.alt`. */
  alt?: string
  /** 0-based position among the IMAGE blocks of this story. Drives the mirror. */
  occurrence?: number
  /** The project's composition phase — which side the *first* plate takes. */
  phase?: number
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
  phase = 0,
  priority = false,
  className,
}: ProjectImageProps) {
  const text = caption ?? media?.caption ?? null
  const side = (occurrence + phase) % 2 === 1 ? 'right' : 'left'
  const family = imageFamily(media)
  const ratio = mediaRatio(media)

  /* ------------------------------- full bleed ------------------------------ */

  if (width === 'full') {
    // A portrait keeps its shape; the ground is what runs to the glass.
    if (family === 'plate') {
      const frame = frameFor('plate', ratio, 'held')
      return (
        <section className={cn('bg-espresso w-full py-[clamp(3.5rem,9vh,7rem)]', className)}>
          <div className="u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12">
            <div className={GROUND_PLATE[side]}>
              <ProjectFigure
                media={media}
                alt={alt}
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 58vw, 100vw"
                width={1600}
                priority={priority}
                reveal={reveal}
                parallax
                parallaxStrength={0.18}
                shadow={false}
                frameClassName={cn(aspectAt(frame.base, 'base'), aspectAt(frame.lg, 'lg'))}
              />
              {text ? <p className="u-label text-canvas/75 mt-5 max-w-[46ch]">{text}</p> : null}
            </div>
          </div>
        </section>
      )
    }

    const frame = frameFor(family, ratio, 'band')
    return (
      <div className={cn('relative w-full', className)}>
        <ProjectFigure
          media={media}
          alt={alt}
          sizes="100vw"
          width={2400}
          priority={priority}
          reveal={reveal}
          parallax
          parallaxStrength={0.3}
          shadow={false}
          frameClassName={cn(aspectAt(frame.base, 'base'), aspectAt(frame.lg, 'lg'))}
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
    const frame = frameFor(family, ratio, 'held')
    return (
      <div className={cn('u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12', className)}>
        <div className={HELD_PLATE[family]}>
          <ProjectFigure
            media={media}
            alt={alt}
            sizes={HELD_SIZES[family]}
            width={1600}
            priority={priority}
            reveal={reveal}
            caption={text ?? undefined}
            frameClassName={cn(aspectAt(frame.base, 'base'), aspectAt(frame.lg, 'lg'))}
            className="lg:items-center lg:text-center"
          />
        </div>
      </div>
    )
  }

  /* ---------------------------------- wide --------------------------------- */

  const placement = PLACEMENT[family][side]
  const frame = frameFor(family, ratio, 'inset')

  return (
    <div className={cn('u-gutter mx-auto grid w-full max-w-[110rem] grid-cols-12', className)}>
      <div className={placement.span}>
        <ProjectFigure
          media={media}
          alt={alt}
          sizes={placement.sizes}
          width={placement.width}
          priority={priority}
          reveal={reveal}
          caption={text ?? undefined}
          frameClassName={cn(aspectAt(frame.base, 'base'), aspectAt(frame.lg, 'lg'))}
        />
      </div>
    </div>
  )
}
