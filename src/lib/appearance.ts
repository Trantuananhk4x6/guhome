/**
 * Light / dark / auto — which palette a visitor gets, and whether they choose.
 *
 * The site already stores ONE palette on the theme row and writes it out as CSS
 * custom properties. Supporting two means the stylesheet has to carry both and
 * let a selector decide, rather than the server picking one and baking it in,
 * because `prefers-color-scheme` is only knowable in the browser.
 *
 * So the cascade below is the whole feature:
 *
 *   :root                                    the light palette, always
 *   :root[data-theme="dark"]                 the dark one, when asked for
 *   @media (prefers-color-scheme: dark)      the dark one, when the OS asks
 *     :root:not([data-theme="light"])
 *
 * `mode` decides which of those blocks the server emits:
 *   'light'  only the first — one palette
 *   'dark'   the first two, with the dark block also applied unconditionally
 *   'auto'   all three — the machine decides
 *
 * The visitor no longer decides anything: the public switch is gone and the
 * admin's `mode` is the only input. What remains of the old feature is the
 * cleanup in `themeBootScript`, which throws away a choice made back when the
 * switch existed — see the note there.
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
  /**
   * Dead, and kept only so a theme row written before the public switch was
   * removed still parses and still saves. Always `false`; nothing reads it.
   */
  readonly allowVisitorChoice: false
}

export const DEFAULT_APPEARANCE: AppearanceConfig = {
  mode: 'auto',
  lightPreset: 'limestone',
  darkPreset: 'amber-night',
  allowVisitorChoice: false,
}

/**
 * Where a visitor's choice used to survive a reload. Nothing writes it any
 * more — the boot script only deletes it.
 */
export const THEME_STORAGE_KEY = 'guhomes-theme'

export const APPEARANCE_MODES: readonly { value: AppearanceMode; label: string; note: string }[] = [
  { value: 'auto', label: 'Tự động', note: 'Theo thiết lập sáng/tối trên máy của khách.' },
  { value: 'light', label: 'Luôn sáng', note: 'Một bảng màu duy nhất, kể cả khi máy khách đang để tối.' },
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
    // Forced, not read: a row saved while the public switch still existed may
    // carry `true`, and honouring it would put the switch back.
    allowVisitorChoice: false,
  }
}

export interface ResolvedAppearance {
  readonly config: AppearanceConfig
  readonly light: ThemeColors
  readonly dark: ThemeColors
  /** Never true any more: the public switch was removed. */
  readonly switchable: false
  /**
   * Emit both palettes into the stylesheet.
   *
   * Needed only when either side can be reached at runtime, which now means
   * `auto` alone. A fixed mode carries one palette and nothing else, which is
   * the cheapest stylesheet and the right shape for a site that wants one look.
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
    switchable: false,
    // 'auto' needs both palettes to follow the OS, and 'dark' needs both because
    // `dualThemeStyleSheet` writes the dark side as an override block keyed on
    // `[data-theme="dark"]` — the attribute the root layout sets for this mode.
    // Narrow this to `=== 'auto'` and "Luôn tối" emits light variables under a
    // dark attribute: light canvas behind everything styled `[data-ground=dark]`.
    // Only 'light' is genuinely one palette.
    bothPalettes: config.mode !== 'light',
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
 * Still blocking even though nobody chooses a theme any more: on `auto` the
 * answer comes from `prefers-color-scheme`, which the server cannot know, so
 * without this a visitor on a dark machine gets one frame of light. It reads one
 * media query, touches nothing else, and costs less than the reflow it prevents.
 *
 * It also DELETES the old stored choice. Until the switch was removed this
 * script preferred localStorage over the admin's setting, so anyone who ever
 * pressed the toggle would be pinned to that palette for good and the admin's
 * `mode` would silently do nothing on their machine. Removing the key on every
 * load is the only way that state ever goes away — the key is gone from the rest
 * of the codebase and this line can be dropped once the visitors have.
 *
 * It also sets `color-scheme` so form controls, scrollbars and the caret follow
 * the theme; CSS alone cannot reach those.
 */
export function themeBootScript(mode: AppearanceMode): string {
  return `(function(){try{
var m=${JSON.stringify(mode)};
try{localStorage.removeItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}
var t = m==='auto' ? (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light') : m;
var r=document.documentElement;
r.setAttribute('data-theme',t);
r.setAttribute('data-ground',t==='dark'?'dark':'light');
r.style.colorScheme=t;
}catch(e){}})();`
}
