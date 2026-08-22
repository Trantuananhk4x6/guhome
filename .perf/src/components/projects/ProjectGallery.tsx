/**
 * A gallery of project photographs.
 *
 * At `columns: 2` — what every seeded story asks for — this is a composed
 * measure rather than a grid of equal plates. It used to be a six-step table of
 * spans and proportions cycled by index, which has two failures the review
 * caught. First, 76 of the 91 seeded galleries hold exactly six photographs, so
 * the table ran through once and every project's gallery composed identically.
 * Second, below `lg` the six proportions collapsed to two — `4/5, 4/5, 3/2,
 * 4/5, 3/2, 3/2`, with an adjacent repeat at the start and two at the end —
 * because only three of the six entries carried a mobile step at all.
 *
 * THE PHOTOGRAPHS CHOOSE. Every media row stores `width` and `height`, and a
 * gallery's shape mix is one of the few things that genuinely differs between
 * two projects: `tam-rem-be-tong` is six portraits at 0.74, `dia-son-bac-ha` is
 * six landscapes at 1.50, `mau-da-thuoc` runs 1.33, 1.94, 1.94, 2.29, 0.85,
 * 1.78. So the run is walked in order and each photograph is placed by what it
 * *is*:
 *
 *   PANORAMA (≥1.9) takes the full measure on its own — a band nothing shares.
 *   A PAIR of the remaining plates goes up two-up, with the taller of the two
 *     given fewer columns and one of them dropped so they share no edge.
 *   A LEFTOVER plate is held alone, inset or bleeding.
 *
 * Each shape has three variants and they cycle down the run, offset by the
 * project's composition phase — so two projects whose photographs happen to be
 * shaped alike still do not open on the same arrangement.
 *
 * MOBILE HAS ITS OWN SET. Every plate is full width below `lg`, so the only
 * thing left to compose is the proportion, and it is now derived per plate from
 * that plate's own photograph. `snapDistinct` then refuses the two steps the
 * previous two plates used, which is what stops a gallery of six near-identical
 * photographs printing one frame six times: six 0.74 portraits come out
 * `7/10, 4/5, 2/3, 7/10, 4/5, 2/3` instead of `4/5` six times.
 *
 * At `columns: 3` and `4` the editor has explicitly asked for a contact sheet,
 * which is a legitimate thing to ask for, so that path keeps its uniform grid —
 * but its plates read their own proportions too, instead of cycling a fixed
 * `3/4, 4/3, 1/1`.
 *
 * Each plate drifts inside its own frame at a slightly different rate, capped at
 * ±10% of the frame by the overscan in `ProjectFigure` — never more.
 */

import { cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

import { aspectAt, BLEED_R, mediaRatio, snapDistinct, type Proportion } from './composition'
import { ProjectFigure } from './ProjectFigure'

export type GalleryColumns = 2 | 3 | 4

export interface ProjectGalleryProps {
  items: readonly MediaRef[]
  columns?: GalleryColumns
  caption?: string
  /** 0-based position among the GALLERY blocks, so a second one starts elsewhere. */
  occurrence?: number
  /** The project's composition phase — which variant the run opens on. */
  phase?: number
  className?: string
}

/* ------------------------------- orientation ------------------------------- */

/** Below this a photograph is a portrait; at or above `PANO_FROM` it is a band. */
const TALL_BELOW = 0.95
const PANO_FROM = 1.9

type Orientation = 'tall' | 'flat' | 'pano'

function orientationOf(media: MediaRef): Orientation {
  const ratio = mediaRatio(media)
  if (ratio < TALL_BELOW) return 'tall'
  if (ratio >= PANO_FROM) return 'pano'
  return 'flat'
}

/* ------------------------------- proportions ------------------------------- */

const TALL_LG: readonly Proportion[] = ['2/3', '7/10', '4/5', '9/10']
const TALL_BASE: readonly Proportion[] = ['2/3', '7/10', '4/5']
const FLAT_LG: readonly Proportion[] = ['1/1', '5/4', '4/3', '3/2', '16/9']
const FLAT_BASE: readonly Proportion[] = ['1/1', '5/4', '4/3', '3/2']
const PANO_LG: readonly Proportion[] = ['2/1', '21/9', '5/2']
const PANO_BASE: readonly Proportion[] = ['5/4', '4/3', '3/2']

/** A plate inside the measure spends about an eighth of its height; a band more. */
const CROP_PLATE = 1.15
const CROP_PANO = 1.35

/* --------------------------------- shapes ---------------------------------- */

type PairCombo = 'tall-tall' | 'tall-flat' | 'flat-tall' | 'flat-flat'
type Shape = readonly [string, string]
type Variants<T> = readonly [T, T, T]

/**
 * THREE variants per combination, not two.
 *
 * Two was the first version and it is visibly short: a six-photograph gallery
 * of one orientation — `dia-son-bac-ha` is six landscapes at 1.50 — builds
 * three pair rows, and a two-step alternation gives the first and third the
 * same span pattern. Three steps means every row of a six-plate gallery has its
 * own arrangement, and the cycle only closes on the seventh.
 *
 * The drop is the other half of it: two plates that share a top edge read as a
 * template, two that share neither edge read as a spread.
 */
const PAIRS: Record<PairCombo, Variants<Shape>> = {
  'tall-tall': [
    ['lg:col-span-4 lg:col-start-1', 'lg:col-span-4 lg:col-start-8 lg:mt-24'],
    ['lg:col-span-4 lg:col-start-2 lg:mt-20', 'lg:col-span-5 lg:col-start-8'],
    ['lg:col-span-5 lg:col-start-1 lg:mt-10', 'lg:col-span-4 lg:col-start-7'],
  ],
  'tall-flat': [
    ['lg:col-span-4 lg:col-start-1', 'lg:col-span-7 lg:col-start-6 lg:mt-20'],
    ['lg:col-span-4 lg:col-start-2 lg:mt-16', 'lg:col-span-6 lg:col-start-7'],
    ['lg:col-span-4 lg:col-start-3 lg:mt-24', 'lg:col-span-5 lg:col-start-8'],
  ],
  'flat-tall': [
    ['lg:col-span-7 lg:col-start-1', 'lg:col-span-4 lg:col-start-9 lg:mt-24'],
    ['lg:col-span-6 lg:col-start-1 lg:mt-14', 'lg:col-span-4 lg:col-start-8'],
    ['lg:col-span-8 lg:col-start-1 lg:mt-10', 'lg:col-span-3 lg:col-start-10'],
  ],
  'flat-flat': [
    ['lg:col-span-6 lg:col-start-1', 'lg:col-span-5 lg:col-start-8 lg:mt-16'],
    ['lg:col-span-5 lg:col-start-2', 'lg:col-span-6 lg:col-start-7 lg:mt-24'],
    ['lg:col-span-5 lg:col-start-1 lg:mt-12', 'lg:col-span-6 lg:col-start-7'],
  ],
}

const SOLOS: Record<Orientation, Variants<string>> = {
  tall: [
    'lg:col-span-4 lg:col-start-5',
    cn('lg:col-span-5 lg:col-start-8', BLEED_R),
    'lg:col-span-4 lg:col-start-2',
  ],
  flat: [
    'lg:col-span-8 lg:col-start-3',
    cn('lg:col-span-7 lg:col-start-6', BLEED_R),
    'lg:col-span-6 lg:col-start-2',
  ],
  pano: ['lg:col-span-12', 'lg:col-span-10 lg:col-start-2', cn('lg:col-span-11 lg:col-start-2', BLEED_R)],
}

/** `step % 3`, narrowed so the tuples above index exactly. */
function variantOf(step: number): 0 | 1 | 2 {
  const at = ((step % 3) + 3) % 3
  return at === 1 ? 1 : at === 2 ? 2 : 0
}

/** Roughly what share of the viewport each role occupies once it is placed. */
const SIZES: Record<Orientation, string> = {
  tall: '(min-width: 1024px) 36vw, 100vw',
  flat: '(min-width: 1024px) 56vw, 100vw',
  pano: '(min-width: 1024px) 92vw, 100vw',
}

const REQUEST: Record<Orientation, number> = { tall: 1200, flat: 1600, pano: 2400 }

/** Five drift rates, cycled — all well inside the ±10% ceiling, and 5 is coprime with the 3-step variant cycle, so the two never line up. */
const STRENGTHS = [0.24, 0.34, 0.2, 0.3, 0.26] as const

/* --------------------------------- the plan -------------------------------- */

interface Plate {
  media: MediaRef
  span: string
  base: Proportion
  lg: Proportion
  sizes: string
  width: number
  strength: number
}

function pairCombo(a: Orientation, b: Orientation): PairCombo {
  if (a === 'tall' && b === 'tall') return 'tall-tall'
  if (a === 'tall') return 'tall-flat'
  if (b === 'tall') return 'flat-tall'
  return 'flat-flat'
}

function stepsFor(orientation: Orientation): {
  lg: readonly Proportion[]
  base: readonly Proportion[]
  crop: number
} {
  if (orientation === 'tall') return { lg: TALL_LG, base: TALL_BASE, crop: 1 }
  if (orientation === 'pano') return { lg: PANO_LG, base: PANO_BASE, crop: CROP_PANO }
  return { lg: FLAT_LG, base: FLAT_BASE, crop: CROP_PLATE }
}

/**
 * Walks the run once and returns a placed plate for every photograph.
 *
 * `recentBase` / `recentLg` hold the last two frames emitted at each
 * breakpoint; `snapDistinct` will not repeat either of them. The refusal is
 * one step on the ladder, never a shape the photograph is not, so a portrait
 * stays a portrait even when its two neighbours already took the nearest steps.
 */
function planGallery(items: readonly MediaRef[], phase: number): Plate[] {
  const plan: Plate[] = []
  const recentBase: Proportion[] = []
  const recentLg: Proportion[] = []
  let index = 0
  let step = phase

  const place = (media: MediaRef, span: string, orientation: Orientation): void => {
    const { lg, base, crop } = stepsFor(orientation)
    const ratio = mediaRatio(media)
    const lgStep = snapDistinct(ratio * crop, lg, recentLg)
    const baseStep = snapDistinct(ratio, base, recentBase)
    recentLg.push(lgStep)
    recentBase.push(baseStep)
    if (recentLg.length > 2) recentLg.shift()
    if (recentBase.length > 2) recentBase.shift()
    plan.push({
      media,
      span,
      base: baseStep,
      lg: lgStep,
      sizes: SIZES[orientation],
      width: REQUEST[orientation],
      strength: STRENGTHS[plan.length % STRENGTHS.length] ?? 0.26,
    })
  }

  while (index < items.length) {
    const first = items[index]
    if (!first) break
    const firstOrientation = orientationOf(first)
    const variant = variantOf(step)

    if (firstOrientation === 'pano') {
      place(first, SOLOS.pano[variant], 'pano')
      index += 1
      step += 1
      continue
    }

    const second = items[index + 1]
    const secondOrientation = second ? orientationOf(second) : null

    if (second && secondOrientation && secondOrientation !== 'pano') {
      const shape = PAIRS[pairCombo(firstOrientation, secondOrientation)][variant]
      place(first, shape[0], firstOrientation)
      place(second, shape[1], secondOrientation)
      index += 2
      step += 1
      continue
    }

    place(first, SOLOS[firstOrientation][variant], firstOrientation)
    index += 1
    step += 1
  }

  return plan
}

/* ------------------------------ contact sheet ------------------------------ */

const GRIDS: Record<GalleryColumns, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
}

const SHEET_SIZES: Record<GalleryColumns, string> = {
  2: '(min-width: 640px) 45vw, 100vw',
  3: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  4: '(min-width: 1024px) 23vw, 45vw',
}

const SHEET_WIDTH: Record<GalleryColumns, number> = { 2: 1600, 3: 1200, 4: 800 }

/** A contact sheet holds one column width, so only the proportion can vary. */
const SHEET_STEPS: readonly Proportion[] = ['2/3', '4/5', '1/1', '5/4', '4/3']

/* ------------------------------- the component ----------------------------- */

export function ProjectGallery({
  items,
  columns = 2,
  caption,
  occurrence = 0,
  phase = 0,
  className,
}: ProjectGalleryProps) {
  if (items.length === 0) return null

  if (columns === 2) {
    // A second gallery in the same story opens on the other variant.
    const plan = planGallery(items, phase + occurrence)

    return (
      <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 md:gap-y-[clamp(3rem,7vh,5.5rem)]">
          {plan.map((plate) => (
            <div key={plate.media.id} className={cn('col-span-12', plate.span)}>
              <ProjectFigure
                media={plate.media}
                sizes={plate.sizes}
                width={plate.width}
                reveal="revealClip"
                parallax
                parallaxStrength={plate.strength}
                cursor="view"
                caption={plate.media.caption ?? undefined}
                frameClassName={cn(aspectAt(plate.base, 'base'), aspectAt(plate.lg, 'lg'))}
              />
            </div>
          ))}
        </div>

        {caption ? <p className="u-label text-muted mt-8 max-w-[52ch]">{caption}</p> : null}
      </section>
    )
  }

  const recent: Proportion[] = []

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <div className={cn('grid grid-cols-1 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16', GRIDS[columns])}>
        {items.map((item, i) => {
          const step = snapDistinct(mediaRatio(item), SHEET_STEPS, recent)
          recent.push(step)
          if (recent.length > 2) recent.shift()
          return (
            <ProjectFigure
              key={item.id}
              media={item}
              sizes={SHEET_SIZES[columns]}
              width={SHEET_WIDTH[columns]}
              reveal="revealClip"
              parallax
              parallaxStrength={STRENGTHS[i % STRENGTHS.length] ?? 0.28}
              cursor="view"
              caption={item.caption ?? undefined}
              frameClassName={aspectAt(step, 'base')}
              className={cn(i % 2 === 1 && 'lg:mt-16')}
            />
          )
        })}
      </div>

      {caption ? <p className="u-label text-muted mt-8 max-w-[52ch]">{caption}</p> : null}
    </section>
  )
}
