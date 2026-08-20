/**
 * The project surfaces' compositional vocabulary.
 *
 * ONE TYPE SCALE, ONE DEFINITION. This file used to restate the display scale
 * as Tailwind arbitrary values — 86 / 70 / 44 / 34 at 1600 — because
 * `globals.css` did not yet carry the steps. It now does, and
 * `@/components/sections/composition` already reads them, so the four constants
 * here had drifted into a second scale that nothing could tune in one place:
 * the project hero was 86px while every other page opener was 112px. They are
 * re-exported from the shared module instead. The scrims were a second verbatim
 * copy of the same two gradients and are re-exported for the same reason.
 *
 * THE STEPS, at 1600 / at 390:
 *   DISPLAY_LG  112 / 42   the page's bookends — project hero h1, closing CTA h2
 *   DISPLAY      70 / 30   a band's loudest line: pulled quote, index masthead
 *   DISPLAY_SM   44 / 22   titles inside a band — cards, block headings, rows
 *
 * PROPORTIONS. Everything that frames a photograph on these surfaces picks its
 * frame from one ladder of twelve steps, and picks it by measuring the
 * photograph — `media.width` and `media.height` are stored on every row. A
 * variant declares which steps it is allowed to use and how much crop it is
 * willing to spend; `snapProportion` does the rest. That is the whole mechanism
 * behind two IMAGE blocks on one page no longer resolving to the same 2:1
 * letterbox, and it needs no new data and no per-project authoring.
 *
 * WHY A LADDER AND NOT A COMPUTED RATIO. Tailwind only emits classes it can
 * read in the source, so `aspect-[${ratio}]` built at runtime produces no CSS
 * at all. Twelve named steps, written out, are both compilable and a proportion
 * system — the pictures on a page relate to each other instead of each landing
 * on its own arbitrary decimal.
 */

import type { MediaRef, ProjectDetail } from '@/types/content'

/* -------------------------------- type ----------------------------------- */

export { DISPLAY, DISPLAY_LG, DISPLAY_SM } from '@/components/sections/composition'

/* -------------------------------- scrims ---------------------------------- */

export { SCRIM_B, SCRIM_T } from '@/components/sections/composition'

/* -------------------------------- rhythm ---------------------------------- */

/**
 * The gap between two bands *inside* one section. Shared with the homepage, so
 * a band break measures the same on every surface of the site.
 */
export { BAND_T as BAND_GAP } from '@/components/sections/composition'

/**
 * The larger of the two inter-band steps — the page changing register rather
 * than continuing one. The homepage spends this as *padding* on a section
 * (`SECTION_T` / `SECTION_B`); the project index stacks sibling bands with no
 * ground of their own, so it needs the same measure as a margin.
 */
export const SECTION_GAP = 'mt-[clamp(4.5rem,11vh,9rem)]'

/* -------------------------------- measure --------------------------------- */

/** An image leaving the gutter for the viewport edge from inside a 12-col child. */
export { BLEED_R_LG as BLEED_R } from '@/components/sections/composition'
export const BLEED_L = 'lg:ml-[calc(var(--spacing-gutter)*-1)]'

/** The measure every project surface centres on. */
export const MEASURE = 'mx-auto w-full max-w-[110rem]'
export const BAND = `u-gutter ${MEASURE}`

/* ------------------------------ proportions ------------------------------- */

/**
 * The frame ladder. Twelve steps from a tall portrait to a panorama, spaced
 * roughly evenly in log space so "the next step up" is a comparable move
 * anywhere on it.
 */
export type Proportion =
  | '2/3'
  | '7/10'
  | '4/5'
  | '9/10'
  | '1/1'
  | '5/4'
  | '4/3'
  | '3/2'
  | '16/9'
  | '2/1'
  | '21/9'
  | '5/2'

export const PROPORTION: Record<Proportion, number> = {
  '2/3': 2 / 3,
  '7/10': 0.7,
  '4/5': 0.8,
  '9/10': 0.9,
  '1/1': 1,
  '5/4': 1.25,
  '4/3': 4 / 3,
  '3/2': 1.5,
  '16/9': 16 / 9,
  '2/1': 2,
  '21/9': 21 / 9,
  '5/2': 2.5,
}

/*
 * Written out per breakpoint rather than composed with a template literal:
 * Tailwind scans this file as text, and a class it cannot read is a class it
 * does not emit.
 */
const ASPECT_BASE: Record<Proportion, string> = {
  '2/3': 'aspect-[2/3]',
  '7/10': 'aspect-[7/10]',
  '4/5': 'aspect-[4/5]',
  '9/10': 'aspect-[9/10]',
  '1/1': 'aspect-[1/1]',
  '5/4': 'aspect-[5/4]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '16/9': 'aspect-[16/9]',
  '2/1': 'aspect-[2/1]',
  '21/9': 'aspect-[21/9]',
  '5/2': 'aspect-[5/2]',
}

const ASPECT_MD: Record<Proportion, string> = {
  '2/3': 'md:aspect-[2/3]',
  '7/10': 'md:aspect-[7/10]',
  '4/5': 'md:aspect-[4/5]',
  '9/10': 'md:aspect-[9/10]',
  '1/1': 'md:aspect-[1/1]',
  '5/4': 'md:aspect-[5/4]',
  '4/3': 'md:aspect-[4/3]',
  '3/2': 'md:aspect-[3/2]',
  '16/9': 'md:aspect-[16/9]',
  '2/1': 'md:aspect-[2/1]',
  '21/9': 'md:aspect-[21/9]',
  '5/2': 'md:aspect-[5/2]',
}

const ASPECT_LG: Record<Proportion, string> = {
  '2/3': 'lg:aspect-[2/3]',
  '7/10': 'lg:aspect-[7/10]',
  '4/5': 'lg:aspect-[4/5]',
  '9/10': 'lg:aspect-[9/10]',
  '1/1': 'lg:aspect-[1/1]',
  '5/4': 'lg:aspect-[5/4]',
  '4/3': 'lg:aspect-[4/3]',
  '3/2': 'lg:aspect-[3/2]',
  '16/9': 'lg:aspect-[16/9]',
  '2/1': 'lg:aspect-[2/1]',
  '21/9': 'lg:aspect-[21/9]',
  '5/2': 'lg:aspect-[5/2]',
}

export type Breakpoint = 'base' | 'md' | 'lg'

export function aspectAt(proportion: Proportion, at: Breakpoint): string {
  if (at === 'md') return ASPECT_MD[proportion]
  if (at === 'lg') return ASPECT_LG[proportion]
  return ASPECT_BASE[proportion]
}

/** A photograph's own proportion. The fallback is only reached by rows with no stored size. */
export function mediaRatio(media: MediaRef | null | undefined, fallback = 4 / 3): number {
  const width = media?.width
  const height = media?.height
  if (!width || !height || width <= 0 || height <= 0) return fallback
  return width / height
}

/** Log distance, so 1:2 sits as far from 1:1 as 2:1 does. */
function distance(proportion: Proportion, target: number): number {
  return Math.abs(Math.log(PROPORTION[proportion] / target))
}

/**
 * The step of the ladder closest to `target`, out of the steps this surface
 * permits. `target` is normally the photograph's own ratio multiplied by a
 * crop appetite: 1.0 shows the picture whole, 1.45 spends about a third of its
 * height to make a band of it.
 */
export function snapProportion(target: number, choices: readonly Proportion[]): Proportion {
  let best: Proportion = '3/2'
  let bestGap = Number.POSITIVE_INFINITY
  for (const choice of choices) {
    const gap = distance(choice, target)
    if (gap < bestGap) {
      bestGap = gap
      best = choice
    }
  }
  return best
}

/**
 * The closest permitted step that is not one of `avoid` — the rule that keeps a
 * gallery of thirty near-identical photographs from printing the same frame six
 * times in a row. It never invents a shape: it takes the *next* nearest, which
 * on this ladder is one step away.
 */
export function snapDistinct(
  target: number,
  choices: readonly Proportion[],
  avoid: readonly Proportion[],
): Proportion {
  const ranked = [...choices].sort((a, b) => distance(a, target) - distance(b, target))
  const free = ranked.find((choice) => !avoid.includes(choice))
  return free ?? ranked[0] ?? snapProportion(target, choices)
}

/* ----------------------------- composition key ----------------------------- */

/**
 * A number that describes what a project actually holds.
 *
 * The block *sequence* comes from the database and is the same on every seeded
 * project, so the difference between two pages has to come from the difference
 * between two projects. Most of it does, directly: an IMAGE block frames its
 * own photograph, a gallery lays out its own photographs. But a handful of
 * choices — which side the first plate takes, which axis the prose swings to —
 * have no proportion to read, and picking them by block index alone is what
 * produced 105 pages with the same three text treatments in the same order.
 *
 * This is the tiebreaker for those, and every term in it is a fact stored
 * against the project: how many photographs it carries, how many of them are
 * landscape, how many services the studio ran, the year, whether a scene was
 * reconstructed. Two projects with the same tally compose alike, which is
 * correct — they *are* alike — and project 106 gets its phase the moment it has
 * a gallery, with nothing to author and no slug named anywhere.
 */
export function compositionKey(project: ProjectDetail): number {
  let key = project.gallery.length * 31 + project.services.length * 7 + (project.year ?? 0)
  if (project.scene && project.scene.mode !== 'NONE') key += 11
  for (const media of project.gallery) {
    if (!media.width || !media.height) continue
    key += media.width > media.height ? 3 : 5
  }
  return key
}

/**
 * A 32-bit avalanche (murmur3's finalizer). It is here because the obvious
 * version is wrong in a way that is invisible until you count: a single
 * multiply by an odd constant leaves the low bit of the product equal to the
 * low bit of the input, so `mixed % 2` for two different salts returned the
 * same answer — or its exact complement — on all 105 projects. Four phase
 * combinations out of a possible thirty-two, which is a template with extra
 * steps. Every output bit has to depend on every input bit for `% 2` and `% 4`
 * to be independent draws.
 */
function avalanche(value: number): number {
  let h = value >>> 0
  h ^= h >>> 16
  h = Math.imul(h, 0x85ebca6b)
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35)
  h ^= h >>> 16
  return h >>> 0
}

/**
 * One phase of the key, per surface. `salt` keeps two surfaces from moving
 * together — without it every project that started its images on the left would
 * also start its prose on the left, which is a second template.
 */
export function phaseOf(key: number, salt: number, count: number): number {
  if (count <= 1) return 0
  return avalanche((key >>> 0) + Math.imul(salt, 0x9e3779b1)) % count
}
