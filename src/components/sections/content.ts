/**
 * Readers for the `content` JSON an admin edits per homepage section.
 *
 * Everything is defensive: the column is `Record<string, unknown>` and may be
 * `{}` on a fresh database, so each reader narrows the value and falls back to
 * the editorial copy shipped with the section.
 */

import type { HomepageSection } from '@/types/content'

export type SectionContent = HomepageSection['content']

function trimmed(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const text = value.trim()
  return text.length > 0 ? text : null
}

/** A single string value, or `fallback`. */
export function sectionText(content: SectionContent, key: string, fallback: string): string {
  return trimmed(content[key]) ?? fallback
}

/** A string value, or `null` when the admin left it empty. */
export function sectionOptionalText(content: SectionContent, key: string): string | null {
  return trimmed(content[key])
}

/**
 * A heading split into display lines on `\n` — the seed stores
 * `'Không gian\nmang tính cách.'` and every line is revealed separately.
 */
export function sectionLines(content: SectionContent, key: string, fallback: string): string[] {
  const lines = sectionText(content, key, fallback)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
  return lines.length > 0 ? lines : [fallback]
}

/** Body copy: an array of paragraphs, or one string split on blank lines. */
export function sectionParagraphs(
  content: SectionContent,
  key: string,
  fallback: readonly string[],
): string[] {
  const value = content[key]

  if (Array.isArray(value)) {
    const items = value.map(trimmed).filter((item): item is string => item !== null)
    if (items.length > 0) return items
  }

  const text = trimmed(value)
  if (text) {
    const paragraphs = text
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0)
    if (paragraphs.length > 0) return paragraphs
  }

  return [...fallback]
}

/** A list of short strings (immersive stage captions, tag rows). */
export function sectionList(content: SectionContent, key: string, fallback: readonly string[]): string[] {
  const value = content[key]
  if (Array.isArray(value)) {
    const items = value.map(trimmed).filter((item): item is string => item !== null)
    if (items.length > 0) return items
  }
  return [...fallback]
}

export interface SectionLink {
  label: string
  href: string
}

/** `{ cta: { label, href } }` shape. */
export function sectionLink(content: SectionContent, key: string, fallback: SectionLink): SectionLink {
  const value = content[key]
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>
    return {
      label: trimmed(record.label) ?? fallback.label,
      href: trimmed(record.href) ?? fallback.href,
    }
  }
  return fallback
}

/**
 * The section's call to action, accepting either the nested `cta` object or the
 * flat `buttonLabel` / `href` pair the seed writes for the CTA band.
 */
export function sectionCta(content: SectionContent, fallback: SectionLink): SectionLink {
  const nested = sectionLink(content, 'cta', { label: '', href: '' })
  return {
    label: nested.label || sectionText(content, 'buttonLabel', fallback.label),
    href: nested.href || sectionText(content, 'href', fallback.href),
  }
}

export interface SectionStat {
  label: string
  value: string
}

/** `{ stats: [{ label, value }] }` — the studio figures. */
export function sectionStats(
  content: SectionContent,
  key: string,
  fallback: readonly SectionStat[],
): SectionStat[] {
  const value = content[key]
  if (Array.isArray(value)) {
    const stats: SectionStat[] = []
    for (const entry of value) {
      if (typeof entry !== 'object' || entry === null) continue
      const record = entry as Record<string, unknown>
      const label = trimmed(record.label)
      const raw = record.value
      const statValue = typeof raw === 'number' ? String(raw) : trimmed(raw)
      if (label && statValue) stats.push({ label, value: statValue })
    }
    if (stats.length > 0) return stats
  }
  return [...fallback]
}

/** One authored stop of the immersive band, before its media id is resolved. */
export interface SectionStop {
  id: string
  label: string
  caption: string | null
  mediaId: string
}

/**
 * `{ stops: [{ id, label, caption?, mediaId }] }` — the immersive band's stops.
 *
 * A stop without a photograph is not a stop: the band shows one frame per stop,
 * so an entry missing `mediaId` is dropped rather than rendered as a blank
 * panel. The empty array is meaningful — it means "nothing authored yet", and
 * the band falls back to the project's gallery.
 */
export function sectionStops(content: SectionContent, key: string): SectionStop[] {
  const value = content[key]
  if (!Array.isArray(value)) return []

  const stops: SectionStop[] = []
  for (const entry of value) {
    if (typeof entry !== 'object' || entry === null) continue
    const record = entry as Record<string, unknown>
    const mediaId = trimmed(record.mediaId)
    if (!mediaId) continue
    stops.push({
      // The media id is a serviceable React key when the admin never wrote one.
      id: trimmed(record.id) ?? mediaId,
      label: trimmed(record.label) ?? '',
      caption: trimmed(record.caption),
      mediaId,
    })
  }
  return stops
}
