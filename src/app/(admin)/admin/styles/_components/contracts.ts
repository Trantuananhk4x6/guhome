/**
 * Shared vocabulary for `/admin/styles`.
 *
 * No React, no `next/*`, no server imports — the page (server) and the editor
 * (client) both read from here, the same split `admin/project/contracts.ts`
 * makes.
 */

import type { MediaRef } from '@/types/content'

/** One row of the `styles` table as the admin list needs it. */
export interface AdminStyleRow {
  id: string
  slug: string
  name: string
  nameEn: string | null
  tagline: string | null
  description: string | null
  cover: MediaRef | null
  seoTitle: string
  seoDescription: string
  order: number
  enabled: boolean
  /** Projects wearing this style, in every publish state. */
  projectCount: number
}

/**
 * The editable half of a row — field for field what `StyleFormInput` takes.
 * Optional columns are normalised to `''` so every control stays *controlled*.
 */
export interface StyleDraft {
  name: string
  slug: string
  nameEn: string
  tagline: string
  description: string
  coverMediaId: string | null
  seoTitle: string
  seoDescription: string
  enabled: boolean
}

export function emptyStyleDraft(): StyleDraft {
  return {
    name: '',
    slug: '',
    nameEn: '',
    tagline: '',
    description: '',
    coverMediaId: null,
    seoTitle: '',
    seoDescription: '',
    enabled: true,
  }
}

export function toStyleDraft(row: AdminStyleRow): StyleDraft {
  return {
    name: row.name,
    slug: row.slug,
    nameEn: row.nameEn ?? '',
    tagline: row.tagline ?? '',
    description: row.description ?? '',
    coverMediaId: row.cover?.id ?? null,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    enabled: row.enabled,
  }
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * What the form can catch before a round trip. The action validates the same
 * rules again — this only spares the editor a failed save.
 */
export function styleDraftErrors(draft: StyleDraft): Record<string, string> {
  const errors: Record<string, string> = {}
  if (draft.name.trim().length < 2) errors['name'] = 'Tên phong cách cần ít nhất 2 ký tự.'
  if (draft.name.trim().length > 120) errors['name'] = 'Tên quá dài.'
  const slug = draft.slug.trim()
  if (slug.length > 0 && !SLUG_PATTERN.test(slug)) {
    errors['slug'] = 'Slug chỉ gồm chữ thường, số và dấu gạch ngang.'
  }
  return errors
}
