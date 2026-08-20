/**
 * Composition primitives for the project surfaces.
 *
 * Two things live here, and both exist because the alternative is worse.
 *
 * TYPE STEPS. `.u-display` is 112px at 1600 and `.u-display-sm` is 52px, with
 * nothing between them. A heading that large owns a whole band by itself, which
 * is exactly how /projects and /projects/[slug] ended up as a run of title cards
 * with the content pushed below the fold. These four steps give the project
 * surfaces a real ladder — 86 / 70 / 44 / 34 at 1600, ratios of ~1.23, 1.6, 1.3 —
 * so a heading can sit *beside* a photograph in a four-column rail instead of
 * spanning the screen above it. Every step keeps the `var(--display-scale)`
 * multiplier, so the admin type-scale control still drives them.
 *
 * SCRIMS. Type over a photograph needs one recipe, not five hand-tuned
 * gradients — five copies is how a site stops looking like one hand made it.
 * These are inline style objects rather than Tailwind arbitrary values because
 * `color-mix(in srgb, …)` inside a bracket class is unreadable and fragile.
 *
 * Contrast floor for any label on a scrim: `text-canvas/70`. Never lower.
 */

import type { CSSProperties } from 'react'

/* --------------------------------- type ---------------------------------- */

const DISPLAY_BASE = 'font-display font-medium'

/*
 * ORDER IS LOAD-BEARING: `text-[…]` MUST come before `leading-[…]`.
 *
 * `cn` runs tailwind-merge, whose conflict map lists `leading` as a group that
 * `font-size` overrides — Tailwind's own `text-lg` sets a line-height, so a
 * later `text-*` has to win. An arbitrary `text-[calc(…)]` is read as a
 * font-size, so with the leading written first every one of these classes lost
 * its line-height on the way to the DOM. I checked the served HTML: the project
 * hero shipped as `font-display font-medium tracking-[-0.022em] text-[calc(…)]`
 * with no `leading-` at all, on every project page and on /projects.
 *
 * `h1`–`h4` were quietly covering for it at the 1.06 base rule, so the damage
 * was invisible on most headings and loud on the two display elements that are
 * not headings: the pulled quote is a `blockquote` and the caption over the
 * index's full-bleed plate is a `p`, and both inherited body's 1.6 — a 70px
 * quote setting on 112px lines instead of 75px ones.
 */

/** 86px at 1600, 36px at 390 — a project page's own name, once per page. */
export const DISPLAY_XL = `${DISPLAY_BASE} text-[calc(clamp(2.25rem,5.4vw,6rem)*var(--display-scale))] leading-[1.04] tracking-[-0.022em]`

/** 70px at 1600, 30px at 390 — page h1, pulled quotes, section statements. */
export const DISPLAY = `${DISPLAY_BASE} text-[calc(clamp(1.875rem,4.4vw,5rem)*var(--display-scale))] leading-[1.06] tracking-[-0.02em]`

/** 44px at 1600, 22px at 390 — project titles, block headings. */
export const DISPLAY_SM = `${DISPLAY_BASE} text-[calc(clamp(1.375rem,2.75vw,2.75rem)*var(--display-scale))] leading-[1.14] tracking-[-0.014em]`

/** 34px at 1600, 18px at 390 — the dense index row, where a title holds one line. */
export const DISPLAY_XS = `${DISPLAY_BASE} text-[calc(clamp(1.125rem,2.1vw,2.125rem)*var(--display-scale))] leading-[1.16] tracking-[-0.01em]`

/* -------------------------------- rhythm ---------------------------------- */

/**
 * The gap between two bands *inside* one section. It must always read as
 * smaller than a section break, which the ad-hoc clamps it replaces did not:
 * one of them was 176px against a 140px section edge.
 */
export const BAND_GAP = 'mt-[clamp(3rem,7vh,5.5rem)]'

/** Same measure as a spacing token, for grids that need it as a gap. */
export const BAND_GAP_Y = 'gap-y-[clamp(3rem,7vh,5.5rem)]'

/**
 * The larger of the two inter-band steps — the page changing register rather
 * than continuing one. `/projects` uses it either side of its full-bleed and
 * its single centred plate, which is what stops thirteen identical 70px gaps
 * from flattening a 105-project index into one texture.
 */
export const SECTION_GAP = 'mt-[clamp(4.5rem,11vh,9rem)]'

/** An image leaving the gutter for the viewport edge from inside a 12-col child. */
export const BLEED_R = 'lg:mr-[calc(var(--spacing-gutter)*-1)]'
export const BLEED_L = 'lg:ml-[calc(var(--spacing-gutter)*-1)]'
export const BLEED_X = 'mx-[calc(var(--spacing-gutter)*-1)]'

/** The measure every project surface centres on. */
export const MEASURE = 'mx-auto w-full max-w-[110rem]'
export const BAND = `u-gutter ${MEASURE}`

/* -------------------------------- scrims ---------------------------------- */

const ESPRESSO = 'var(--c-espresso)'

/** Bottom-up hold for type anchored to the foot of a frame. */
export const SCRIM_B: CSSProperties = {
  backgroundImage: `linear-gradient(to top, color-mix(in srgb, ${ESPRESSO} 62%, transparent) 0%, color-mix(in srgb, ${ESPRESSO} 24%, transparent) 45%, transparent 100%)`,
}

/** Top-down hold for an eyebrow or an index number in a frame's corner. */
export const SCRIM_T: CSSProperties = {
  backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${ESPRESSO} 52%, transparent) 0%, transparent 100%)`,
}
