/**
 * The homepage's compositional vocabulary — one place, so eight sections read as
 * one hand.
 *
 * These belong in `src/styles/globals.css` as `.u-display-lg`, `.u-bleed-*` and
 * `.u-scrim-*`; that file is frozen for this workflow (ARCHITECTURE §0), so the
 * same values live here as Tailwind v4 arbitrary utilities and shared style
 * objects instead. Every display step keeps the `var(--display-scale)`
 * multiplier the admin type-scale control writes — drop it and that control
 * silently stops working.
 *
 * THE SCALE, at 1600 / at 390:
 *   DISPLAY_LG  112 / 42   opening and closing statements only (Hero h1, Cta h2)
 *   DISPLAY      70 / 30   a section's loudest line, set beside content
 *   DISPLAY_SM   44 / 22   project, service, article and section-header titles
 * 112 / 70 / 44 is a real scale (1.60, 1.59); 112 / 52 with nothing between is
 * what made every heading either a title card or a caption.
 */

import type { CSSProperties } from 'react'

/* ------------------------------- type scale ------------------------------- */

// `text-[...]` must precede `leading-[...]`: tailwind-merge treats a font-size
// utility as conflicting with `leading-*` (because `text-lg/7` carries one), so a
// leading written first is silently dropped by `cn`.
const DISPLAY_BASE = 'font-display font-medium text-balance'

/** The page's bookends. Permitted in exactly two elements site-wide. */
export const DISPLAY_LG = `${DISPLAY_BASE} text-[calc(clamp(2.625rem,7vw,8rem)*var(--display-scale))] leading-[1.02] tracking-[-0.024em]`

/** A section statement that has to share its band with a photograph. */
export const DISPLAY = `${DISPLAY_BASE} text-[calc(clamp(1.875rem,4.4vw,5rem)*var(--display-scale))] leading-[1.04] tracking-[-0.02em]`

/** Titles inside a band: projects, services, articles, section headers. */
export const DISPLAY_SM = `${DISPLAY_BASE} text-[calc(clamp(1.375rem,2.75vw,2.75rem)*var(--display-scale))] leading-[1.14] tracking-[-0.012em]`

/** A figure in the studio ledger — a number, not a heading. */
export const FIGURE = 'font-display font-light text-[clamp(1.75rem,3vw,2.75rem)] leading-none'

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
