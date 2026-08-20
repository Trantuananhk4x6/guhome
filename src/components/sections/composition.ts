/**
 * The homepage's compositional vocabulary — one place, so eight sections read as
 * one hand.
 *
 * ONE SCALE, ONE DEFINITION. These three steps used to be restated here as
 * Tailwind arbitrary values because `src/styles/globals.css` was frozen and did
 * not yet carry them. It now does — `.u-display-lg`, `.u-display`,
 * `.u-display-sm`, byte-for-byte the same clamps, `var(--display-scale)`
 * multiplier included — and /studio already reads them. Two copies of one scale
 * means tuning either one silently fails to move the other, so these constants
 * are now the class names. The tailwind-merge hazard documented here (a
 * `leading-[...]` written before `text-[...]` is dropped by `cn`) disappears
 * with them: a plain class carries neither utility.
 *
 * `.u-figure` — the one step the score adds — has since landed in `globals.css`
 * too, so it is referenced the same way rather than restated here.
 *
 * THE SCALE, at 1600 / at 390:
 *   DISPLAY_LG  112 / 42   opening and closing statements only (Hero h1, Cta h2)
 *   DISPLAY      70 / 30   a section's loudest line, set beside content
 *   DISPLAY_SM   44 / 22   project, service, article and section-header titles
 *   FIGURE       56 / 32   a number in the studio ledger, not a heading
 * 112 / 70 / 44 is a real scale (1.60, 1.59); 112 / 52 with nothing between is
 * what made every heading either a title card or a caption.
 */

import type { CSSProperties } from 'react'

/* ------------------------------- type scale ------------------------------- */

// The class already sets family and weight; these are for the spans that carry a
// display step without being a heading, and for `text-wrap: balance`, which the
// class deliberately leaves to the caller.
const DISPLAY_BASE = 'font-display font-medium text-balance'

/** The page's bookends. Permitted in exactly two elements site-wide. */
export const DISPLAY_LG = `u-display-lg ${DISPLAY_BASE}`

/** A section statement that has to share its band with a photograph. */
export const DISPLAY = `u-display ${DISPLAY_BASE}`

/** Titles inside a band: projects, services, articles, section headers. */
export const DISPLAY_SM = `u-display-sm ${DISPLAY_BASE}`

/**
 * A figure in the studio ledger — a number, not a heading. 56px at 1600 against
 * a 44px section heading is 1.27: the evidence outweighs the label introducing
 * it without becoming a fourth display step. At the old 2.75rem cap it resolved
 * to exactly 44px, so the ledger's numbers weighed the same as its own heading
 * and the densest section on the page had no internal hierarchy.
 */
export const FIGURE = 'u-figure'

/* --------------------------------- rhythm --------------------------------- */

/**
 * `--spacing-section` is 14vh, tuned for sections that each held one idea; every
 * section now holds two or three. 11vh = 110px per edge at 1000, sixteen edges
 * across eight sections, ~480px recovered with nothing deleted.
 */
export const SECTION_Y = 'py-[clamp(4.5rem,11vh,9rem)]'
export const SECTION_T = 'pt-[clamp(4.5rem,11vh,9rem)]'
export const SECTION_B = 'pb-[clamp(4.5rem,11vh,9rem)]'

/**
 * The gap BETWEEN bands inside one section. It must always read as smaller than
 * a section break — today's ad-hoc clamps range 40px…176px and one of them is
 * larger than the break it sits inside.
 */
export const BAND_T = 'mt-[clamp(3rem,7vh,5.5rem)]'
export const BAND_GAP = 'gap-[clamp(3rem,7vh,5.5rem)]'

/* --------------------------------- bleeds --------------------------------- */

/** Leave the gutter without leaving the grid. */
export const BLEED_R = 'mr-[calc(var(--spacing-gutter)*-1)]'
export const BLEED_L = 'ml-[calc(var(--spacing-gutter)*-1)]'
export const BLEED_X = 'mx-[calc(var(--spacing-gutter)*-1)]'
/** Bleeds only once the band is actually side-by-side; stacked, it would skew. */
export const BLEED_R_LG = 'lg:mr-[calc(var(--spacing-gutter)*-1)]'

/** Padding that matches the page gutter — for type set inside a bled frame. */
export const GUTTER_P = 'p-[var(--spacing-gutter)]'

/* --------------------------------- scrims --------------------------------- */

/**
 * One recipe for every piece of type over a photograph. Two shallow gradients at
 * the ends of a frame hold copy without flattening the picture the way a full
 * panel does. Contrast floor for a label on either: `text-canvas/70`.
 */
export const SCRIM_T: CSSProperties = {
  background:
    'linear-gradient(to bottom, color-mix(in srgb, var(--c-espresso) 52%, transparent) 0%, transparent 100%)',
}

export const SCRIM_B: CSSProperties = {
  background:
    'linear-gradient(to top, color-mix(in srgb, var(--c-espresso) 62%, transparent) 0%, color-mix(in srgb, var(--c-espresso) 24%, transparent) 45%, transparent 100%)',
}

/** The soft image shadow, repeated on every inset frame. */
export const FRAME_SHADOW = 'shadow-[0_50px_90px_-70px_rgba(28,27,24,0.7)]'
