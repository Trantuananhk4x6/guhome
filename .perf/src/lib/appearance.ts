/**
 * Light / dark / auto — which palette a visitor gets, and whether they choose.
 *
 * The site already stores ONE palette on the theme row and writes it out as CSS
 * custom properties. Supporting two means the stylesheet has to carry both and
 * let a selector decide, rather than the server picking one and baking it in:
 * a visitor's choice has to survive a page they have not requested yet, and
 * `prefers-color-scheme` is only knowable in the browser.
 *
 * So the cascade below is the whole feature:
 *
 *   :root                                    the light palette, always
 *   :root[data-theme="dark"]                 the dark one, when asked for
 *   @media (prefers-color-scheme: dark)      the dark one, when the OS asks and
 *     :root:not([data-theme="light"])        the visitor has not overridden
 *
 * The `:not()` is what makes an explicit choice beat the OS in both directions —
 * without it, a visitor on a dark-mode phone could never choose light.
 *
 * `mode` decides which of those three blocks the server emits:
 *   'light'  only the first — one palette, no switching
 *   'dark'   the first two, with the dark block also applied unconditionally
 *   'auto'   all three — the OS decides, the visitor can override
 */

import type { ThemeColors } from '@/types/content'

import { LIMESTONE, presetById, THEME_PRESETS } from './theme-presets'

export type AppearanceMode = 'light' | 'dark' | 'auto'

export interface AppearanceConfig {
  /** What a first-time visitor sees. */
  readonly mode: AppearanceMode
  /** Preset id used for the light palette. */
  readonly lightPreset: string
  /** Preset id used for the dark palette. */
  readonly darkPreset: string
  /** Whether the public site shows a switch at all. */
  readonly allowVisitorChoice: boolean
}

export const DEFAULT_APPEARANCE: AppearanceConfig = {
  mode: 'auto',
  lightPreset: 'limestone',
  darkPreset: 'amber-night',
  allowVisitorChoice: true,
}

/** Attribute the toggle writes on `<html>`; also read by `neon.css`. */
export const THEME_ATTR = 'data-theme'
/** Where a visitor's choice survives a reload. */
export const THEME_STORAGE_KEY = 'guhomes-theme'

export const APPEARANCE_MODES: readonly { value: AppearanceMode; label: string; note: string }[] = [
  { value: 'auto', label: 'Tự động', note: 'Theo thiết lập sáng/tối của máy khách. Khách vẫn đổi được.' },
  { value: 'light', label: 'Luôn sáng', note: 'Một bảng màu duy nhất, không có nút đổi.' },
  { value: 'dark', label: 'Luôn tối', note: 'Mở ra là nền tối, kể cả khi máy khách đang để sáng.' },
]

/** Narrow whatever the database returned; a bad row must never blank the site. */
export function readAppearance(value: unknown): AppearanceConfig {
  if (typeof value !== 'object' || value === null) return DEFAULT_APPEARANCE
  const raw = value as Partial<Record<keyof AppearanceConfig, unknown>>
  const mode =
    raw.mode === 'light' || raw.mode === 'dark' || raw.mode === 'auto' ? raw.mode : DEFAULT_APPEARANCE.mode
  const preset = (v: unknown, fallback: string): string =>
    typeof v === 'string' && presetById(v) !== null ? v : fallback
  return {
    mode,
    lightPreset: preset(raw.lightPreset, DEFAULT_APPEARANCE.lightPreset),
    darkPreset: preset(raw.darkPreset, DEFAULT_APPEARANCE.darkPreset),
    allowVisitorChoice:
      typeof raw.allowVisitorChoice === 'boolean'
        ? raw.allowVisitorChoice
        : DEFAULT_APPEARANCE.allowVisitorChoice,
  }
}

export interface ResolvedAppearance {
  readonly config: AppearanceConfig
  readonly light: ThemeColors
  readonly dark: ThemeColors
  /** Render the public switch. The admin's own gate, independent of `mode`. */
  readonly switchable: boolean
  /**
   * Emit both palettes into the stylesheet.
   *
   * Needed whenever either side can be reached at runtime — because the OS asks
   * for it (`auto`) or because the visitor may choose. A fixed mode with the
   * switch off carries one palette and nothing else, which is the cheapest
   * stylesheet and the right default for a site that wants one look.
   */
  readonly bothPalettes: boolean
}

/**
 * The two palettes the stylesheet will carry.
 *
 * `colors` on the theme row stays authoritative for whichever side the admin is
 * actively editing, so tuning a colour by hand in the theme editor still shows
 * up — the presets only supply the side they are not editing.
 */
export function resolveAppearance(config: AppearanceConfig, edited: ThemeColors): ResolvedAppearance {
  const lightPreset = presetById(config.lightPreset) ?? LIMESTONE
  const darkPreset = presetById(config.darkPreset) ?? THEME_PRESETS[1] ?? LIMESTONE
  // Whichever preset the hand-edited palette matches is the one it replaces.
  const editedIsDark = isDark(edited)
  return {
    config,
    light: editedIsDark ? lightPreset.colors : edited,
    dark: editedIsDark ? edited : darkPreset.colors,
    switchable: config.allowVisitorChoice,
    bothPalettes: config.mode === 'auto' || config.allowVisitorChoice,
  }
}

/** Rec. 601 luma — enough for a light/dark decision, and no gamma round-trip. */
export function isDark(colors: ThemeColors): boolean {
  const hex = colors.canvas.replace('#', '')
  if (hex.length < 6) return false
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  if (!Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) return false
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.4
}

/**
 * Runs before first paint, from a blocking inline script in `<head>`.
 *
 * Without it a visitor who chose dark gets one frame of light while React
 * hydrates — the flash every theme switcher is judged by. It reads only
 * localStorage and a media query, touches nothing else, and is small enough that
 * blocking on it costs less than the reflow it prevents.
 *
 * It also sets `color-scheme` so form controls, scrollbars and the caret follow
 * the theme; CSS alone cannot reach those.
 */
export function themeBootScript(mode: AppearanceMode): string {
  return `(function(){try{
var m=${JSON.stringify(mode)},k=${JSON.stringify(THEME_STORAGE_KEY)};
var s=null;try{s=localStorage.getItem(k)}catch(e){}
var t = s==='dark'||s==='light' ? s
      : m==='auto' ? (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')
      : m;
var r=document.documentElement;
r.setAttribute('data-theme',t);
r.setAttribute('data-ground',t==='dark'?'dark':'light');
r.style.colorScheme=t;
}catch(e){}})();`
}
