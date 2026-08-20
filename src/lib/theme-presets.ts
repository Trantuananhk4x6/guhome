/**
 * Named palettes the admin can switch between.
 *
 * The theme system already writes every colour as a runtime CSS custom property
 * (`themeToCssVars` → the `<style>` tag in the root layout), so a preset is just
 * a set of nine values: no rebuild, no per-component branching, and a palette
 * that lands on the whole site at once.
 *
 * On the neon presets specifically. The original brief ruled neon out, and it was
 * right to, for the reason it gave: neon used as *decoration* is the visual
 * signature of a gaming site. The client has since asked for it, so these do
 * neon the only way an architecture studio can — as **light**. Every accent here
 * is a colour that a real luminaire actually emits: sodium amber, cold cathode
 * cyan, the pink of a bar sign. It appears as a hairline, an index number or a
 * glow falling off an edge, never as a fill. That is why the dark grounds are
 * warm near-blacks rather than pure black: a photograph sitting on #000 looks
 * cut out, while a photograph on a charcoal that shares its temperature reads as
 * a lit room at night, which is what the studio's own commercial work — the
 * restaurants, the spas, the tea rooms — actually looks like after dark.
 */

import type { ThemeColors } from '@/types/content'

export interface ThemePreset {
  readonly id: string
  /** Shown in the admin picker. */
  readonly name: string
  /** One line on when to reach for it. */
  readonly note: string
  /** `true` when the ground is dark, so on-dark treatments switch on. */
  readonly dark: boolean
  readonly colors: ThemeColors
}

/**
 * The studio default: limestone, oat and ink with a bronze-clay accent.
 * Matches the values baked into `globals.css` so a fresh database looks right.
 */
export const LIMESTONE: ThemePreset = {
  id: 'limestone',
  name: 'Đá vôi',
  note: 'Bản gốc — nền sáng ấm, chữ mực, điểm nhấn đồng đất. Ảnh ban ngày lên đẹp nhất.',
  dark: false,
  colors: {
    canvas: '#F4F1EA',
    surface: '#EAE5DA',
    surfaceAlt: '#DCD5C7',
    ink: '#1C1B18',
    muted: '#78736A',
    line: '#D7D0C2',
    espresso: '#131210',
    accent: '#A07753',
    accentSoft: '#C7A57C',
  },
}

/**
 * Sodium amber on warm charcoal — the colour of cove lighting and of the brass
 * in the studio's own joinery, so warm photography sits in it without fighting.
 */
export const AMBER_NIGHT: ThemePreset = {
  id: 'amber-night',
  name: 'Đêm hổ phách',
  note: 'Nền than ấm, đèn hắt màu hổ phách. Hợp nhất với ảnh gỗ óc chó và đồng thau.',
  dark: true,
  colors: {
    canvas: '#0C0B0A',
    surface: '#15130F',
    surfaceAlt: '#1E1B15',
    ink: '#F6F1E6',
    muted: '#9A9082',
    line: '#2C2820',
    espresso: '#060504',
    accent: '#FFB347',
    accentSoft: '#FFD9A0',
  },
}

/**
 * Cold cathode cyan on blue-black. The sharpest of the three, and the one that
 * reads most immediately as "neon"; it also contrasts hardest against the warm
 * photography, so the accent has to stay a hairline or it starts to fight.
 */
export const CYAN_NIGHT: ThemePreset = {
  id: 'cyan-night',
  name: 'Đêm lam ngọc',
  note: 'Nền xanh đen, đèn cathode lạnh. Sắc nét nhất — nhớ giữ điểm nhấn thật mảnh.',
  dark: true,
  colors: {
    canvas: '#08090C',
    surface: '#0F1116',
    surfaceAlt: '#161922',
    ink: '#ECF1F2',
    muted: '#7F8894',
    line: '#1E222C',
    espresso: '#040508',
    accent: '#3DF0D8',
    accentSoft: '#9BF7EA',
  },
}

/**
 * Bar-sign magenta over ink. The nightlife register — built for the restaurant,
 * spa and shop work rather than for residential.
 */
export const MAGENTA_NIGHT: ThemePreset = {
  id: 'magenta-night',
  name: 'Đêm hồng sen',
  note: 'Cho nhóm thương mại — nhà hàng, bar, cửa hàng. Nồng hơn, ít trung tính hơn.',
  dark: true,
  colors: {
    canvas: '#0A0709',
    surface: '#130E12',
    surfaceAlt: '#1C141B',
    ink: '#F5EDF1',
    muted: '#94838D',
    line: '#2A1F27',
    espresso: '#050304',
    accent: '#FF4D8D',
    accentSoft: '#FFA3C4',
  },
}

export const THEME_PRESETS: readonly ThemePreset[] = [
  LIMESTONE,
  AMBER_NIGHT,
  CYAN_NIGHT,
  MAGENTA_NIGHT,
]

export function presetById(id: string): ThemePreset | null {
  return THEME_PRESETS.find((preset) => preset.id === id) ?? null
}

/**
 * Which preset a stored palette corresponds to, matched on the ground colour
 * alone — an editor who has tuned an accent by hand should still see their
 * preset selected rather than the picker silently reading "custom".
 */
export function presetForColors(colors: ThemeColors): ThemePreset | null {
  const canvas = colors.canvas.trim().toLowerCase()
  return THEME_PRESETS.find((preset) => preset.colors.canvas.toLowerCase() === canvas) ?? null
}

/**
 * A dark ground needs more than swapped colours: hairlines have to carry light
 * rather than absorb it, and an accent that is a pigment in daylight is a
 * *source* at night. These are emitted alongside the palette so the glow only
 * exists where the ground can support it.
 */
export function isDarkGround(colors: ThemeColors): boolean {
  const hex = colors.canvas.replace('#', '')
  if (hex.length < 6) return false
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  if (!Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) return false
  // Rec. 601 luma is close enough for a light/dark decision and avoids a
  // gamma-correct conversion for a boolean.
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.4
}
