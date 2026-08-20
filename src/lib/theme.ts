/**
 * Theme source of truth — ARCHITECTURE §6.7.
 *
 * `DEFAULT_THEME` mirrors the palette declared in §2 and the fallback values
 * baked into `src/styles/globals.css`. The admin theme editor persists a
 * `ThemeSettings` row; `src/app/layout.tsx` reads it and injects
 * `themeToCssVars()` into a `<style>` tag so colour/typography changes apply
 * site-wide without a rebuild.
 *
 * Everything emitted here is sanitised: the values originate from the database
 * and land inside a stylesheet, so anything that is not a plain colour / font
 * name / number is discarded in favour of the default.
 */

import type { BrandConfig, MotionConfig, ThemeColors, ThemeSettings, ThemeTypography } from '@/types/content'

/* ------------------------------- font wiring ------------------------------- */

/**
 * CSS variables emitted by `next/font/google` in `src/app/layout.tsx`.
 * next/font only accepts literal arguments, so the layout repeats these strings
 * verbatim — keep the two in sync.
 */
export const FONT_VAR_DISPLAY = '--font-playfair-display'
export const FONT_VAR_BODY = '--font-be-vietnam-pro'

export interface FontChoice {
  /** Family name as stored on the theme row. */
  readonly name: string
  /** The `variable` next/font emits for it in `src/app/layout.tsx`. */
  readonly cssVar: string
  readonly role: 'display' | 'body'
  /** One line for the theme editor, in Vietnamese. */
  readonly note: string
}

/**
 * The families bundled through next/font, and the only ones the theme editor
 * offers. Every one carries a Vietnamese subset — a family without it drops out
 * of the face mid-word on Vietnamese text and mangles the diacritics, which is
 * why Instrument Serif and DM Serif Display are not here despite the brief
 * naming them. Anything else stored on the theme row falls back to a system
 * stack rather than silently rendering wrong.
 */
export const FONT_LIBRARY: readonly FontChoice[] = [
  {
    name: 'Playfair Display',
    cssVar: FONT_VAR_DISPLAY,
    role: 'display',
    note: 'Mặc định — nét dày rõ, tương phản cao, đọc tốt ở khổ lớn.',
  },
  {
    name: 'Lora',
    cssVar: '--font-lora',
    role: 'display',
    note: 'Ấm và mềm hơn, thân chữ đều, hợp bài viết dài.',
  },
  {
    name: 'Source Serif 4',
    cssVar: '--font-source-serif-4',
    role: 'display',
    note: 'Trung tính, hiện đại, ít trang trí.',
  },
  {
    name: 'Cormorant Garamond',
    cssVar: '--font-cormorant-garamond',
    role: 'display',
    note: 'Rất thanh mảnh — đẹp ở khổ rất lớn, mờ ở khổ nhỏ.',
  },
  {
    name: 'Be Vietnam Pro',
    cssVar: FONT_VAR_BODY,
    role: 'body',
    note: 'Mặc định — thiết kế riêng cho tiếng Việt, dấu rõ và cân.',
  },
  { name: 'Inter', cssVar: '--font-inter', role: 'body', note: 'Trung tính, quen thuộc, chữ số đều.' },
  { name: 'Manrope', cssVar: '--font-manrope', role: 'body', note: 'Hình học, hơi tròn, nhẹ nhàng.' },
]

/** Families the theme editor may offer for a given slot. */
export function fontsForRole(role: FontChoice['role']): readonly FontChoice[] {
  return FONT_LIBRARY.filter((font) => font.role === role)
}

/** id of the injected `<style>` element, so the admin preview can hot-swap it. */
export const THEME_STYLE_ID = 'an-theme-vars'

/* --------------------------------- defaults -------------------------------- */

export const DEFAULT_COLORS: ThemeColors = {
  canvas: '#F4F1EA',
  surface: '#EAE5DA',
  surfaceAlt: '#DCD5C7',
  ink: '#1C1B18',
  muted: '#78736A',
  line: '#D7D0C2',
  espresso: '#131210',
  accent: '#A07753',
  accentSoft: '#C7A57C',
}

export const DEFAULT_TYPOGRAPHY: ThemeTypography = {
  displayFont: 'Playfair Display',
  bodyFont: 'Be Vietnam Pro',
  displayScale: 1,
  bodyScale: 1,
  tracking: 1,
}

export const DEFAULT_MOTION: MotionConfig = {
  enabled: true,
  reducedMotion: 'auto',
  scrollSmoothing: true,
  pageTransition: true,
  textReveal: true,
  imageReveal: true,
  parallax: true,
  threeDAnimation: true,
  cameraAnimation: true,
  intensity: 1,
  transitionSpeed: 1,
}

export const DEFAULT_BRAND: BrandConfig = {
  companyName: 'GUHOMES',
  shortName: 'GU',
  tagline: 'Nội thất và kiến trúc cho khí hậu Sài Gòn',
  logoMediaId: null,
  faviconMediaId: null,
  email: 'studio@guhomes.vn',
  phone: '+84 28 3822 1975',
  address: 'Quận 7, TP. Hồ Chí Minh',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/guhomes.vn' },
    { label: 'Behance', href: 'https://www.behance.net/guhomes' },
    { label: 'Pinterest', href: 'https://www.pinterest.com/guhomes' },
    { label: 'Facebook', href: 'https://www.facebook.com/guhomes.vn' },
  ],
}

export const DEFAULT_THEME: ThemeSettings = {
  colors: DEFAULT_COLORS,
  typography: DEFAULT_TYPOGRAPHY,
  motion: DEFAULT_MOTION,
  brand: DEFAULT_BRAND,
}

/* -------------------------------- sanitisers ------------------------------- */

const HEX_RE = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const FUNC_COLOR_RE = /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([0-9a-z%.,/+\-\s]*\)$/i
const NAMED_COLOR_RE = /^[a-z]{3,24}$/i
const FONT_NAME_RE = /^[\w\s'.-]{1,48}$/

function cssColor(value: string | undefined, fallback: string): string {
  const raw = typeof value === 'string' ? value.trim() : ''
  if (HEX_RE.test(raw)) return raw.toLowerCase()
  if (FUNC_COLOR_RE.test(raw) || NAMED_COLOR_RE.test(raw)) return raw
  return fallback.toLowerCase()
}

function cssNumber(value: number | undefined, min: number, max: number, fallback: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback
  return Math.min(Math.max(value, min), max)
}

/** Trims trailing zeroes so the emitted stylesheet stays readable. */
function num(value: number): string {
  return String(Number(value.toFixed(4)))
}

/**
 * A font family reference for `--f-display` / `--f-body`.
 * Bundled fonts resolve to their next/font variable (with the plain family name
 * as an in-var fallback so the custom property is never invalid at computed
 * value time); anything else is emitted as a quoted family name.
 */
function cssFontStack(value: string | undefined, fallback: string): string {
  const raw = typeof value === 'string' ? value.trim() : ''
  const name = FONT_NAME_RE.test(raw) ? raw : fallback
  const bundled = FONT_LIBRARY.find((f) => f.name.toLowerCase() === name.toLowerCase())
  if (bundled) return `var(${bundled.cssVar}, '${bundled.name}')`
  return `'${name.replace(/'/g, '')}'`
}

/* ------------------------------- css emission ------------------------------ */

/**
 * ARCHITECTURE §6.7 — `"--c-canvas:#f4f1ea;..."`.
 * Returns declarations only (no selector); the caller wraps them in a rule.
 */
export function themeToCssVars(t: ThemeSettings): string {
  const colors = t.colors ?? DEFAULT_COLORS
  const type = t.typography ?? DEFAULT_TYPOGRAPHY
  const motion = t.motion ?? DEFAULT_MOTION

  const tracking = cssNumber(type.tracking, 0.25, 3, DEFAULT_TYPOGRAPHY.tracking)
  const still = !motion.enabled || motion.reducedMotion === 'force'
  const intensity = still ? 0 : cssNumber(motion.intensity, 0, 1, DEFAULT_MOTION.intensity)
  const speed = still ? 0.01 : cssNumber(motion.transitionSpeed, 0.1, 4, DEFAULT_MOTION.transitionSpeed)

  return [
    `--c-canvas:${cssColor(colors.canvas, DEFAULT_COLORS.canvas)}`,
    `--c-surface:${cssColor(colors.surface, DEFAULT_COLORS.surface)}`,
    `--c-surface-alt:${cssColor(colors.surfaceAlt, DEFAULT_COLORS.surfaceAlt)}`,
    `--c-ink:${cssColor(colors.ink, DEFAULT_COLORS.ink)}`,
    `--c-muted:${cssColor(colors.muted, DEFAULT_COLORS.muted)}`,
    `--c-line:${cssColor(colors.line, DEFAULT_COLORS.line)}`,
    `--c-espresso:${cssColor(colors.espresso, DEFAULT_COLORS.espresso)}`,
    `--c-accent:${cssColor(colors.accent, DEFAULT_COLORS.accent)}`,
    `--c-accent-soft:${cssColor(colors.accentSoft, DEFAULT_COLORS.accentSoft)}`,
    `--f-display:${cssFontStack(type.displayFont, DEFAULT_TYPOGRAPHY.displayFont)}`,
    `--f-body:${cssFontStack(type.bodyFont, DEFAULT_TYPOGRAPHY.bodyFont)}`,
    `--display-scale:${num(cssNumber(type.displayScale, 0.6, 2, DEFAULT_TYPOGRAPHY.displayScale))}`,
    `--body-scale:${num(cssNumber(type.bodyScale, 0.75, 1.5, DEFAULT_TYPOGRAPHY.bodyScale))}`,
    `--tracking-label:${num(0.18 * tracking)}em`,
    `--tracking-display:${num(-0.02 * tracking)}em`,
    `--motion-intensity:${num(intensity)}`,
    `--motion-duration:${num(speed)}s`,
  ].join(';')
}

/**
 * The full rule injected by the root layout. `:root:root` outranks both the
 * Tailwind `@theme` block and the `:root` fallbacks in globals.css, so the
 * stylesheet order at runtime does not matter.
 */
export function themeStyleSheet(t: ThemeSettings): string {
  return `:root:root{${themeToCssVars(t)}}`
}
