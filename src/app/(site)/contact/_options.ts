/**
 * Shared option vocabulary for the contact form.
 *
 * Lives outside `src/server/actions/contact.ts` on purpose: a `'use server'`
 * module may only export async functions, and both the client form and the
 * server action need these lists.
 */

export interface ContactOption {
  value: string
  label: string
}

/** Mirrors the project taxonomy in `src/data/seed-types.ts`, plus an escape hatch. */
export const PROJECT_TYPES: readonly ContactOption[] = [
  { value: 'can-ho', label: 'Căn hộ' },
  { value: 'nha-pho', label: 'Nhà phố' },
  { value: 'biet-thu-resort', label: 'Biệt thự & Resort' },
  { value: 'thuong-mai', label: 'Thương mại' },
  { value: 'khong-gian', label: 'Không gian chuyên biệt' },
  { value: 'khac', label: 'Chưa rõ / khác' },
]

export const BUDGET_RANGES: readonly ContactOption[] = [
  { value: 'duoi-500', label: 'Dưới 500 triệu' },
  { value: '500-1000', label: '500 triệu – 1 tỷ' },
  { value: '1-2-ty', label: '1–2 tỷ' },
  { value: '2-5-ty', label: '2–5 tỷ' },
  { value: 'tren-5-ty', label: 'Trên 5 tỷ' },
  { value: 'chua-xac-dinh', label: 'Chưa xác định' },
]

export function optionValues(options: readonly ContactOption[]): string[] {
  return options.map((option) => option.value)
}

/** Human label stored in the database, so the admin inbox reads plainly. */
export function labelFor(options: readonly ContactOption[], value: string): string | null {
  return options.find((option) => option.value === value)?.label ?? null
}
