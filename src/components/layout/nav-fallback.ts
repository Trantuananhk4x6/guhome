import type { NavItem } from '@/types/content'

/**
 * Used when `getNavigation()` returns nothing (fresh database, seed not run).
 * The admin navigation editor is the source of truth once rows exist.
 */
export const FALLBACK_HEADER_NAV: NavItem[] = [
  { id: 'fallback-projects', label: 'Dự án', href: '/projects', order: 1 },
  { id: 'fallback-studio', label: 'Studio', href: '/studio', order: 2 },
  { id: 'fallback-services', label: 'Dịch vụ', href: '/services', order: 3 },
  { id: 'fallback-journal', label: 'Nhật ký', href: '/journal', order: 4 },
  { id: 'fallback-contact', label: 'Liên hệ', href: '/contact', order: 5 },
]

export const FALLBACK_FOOTER_NAV: NavItem[] = [
  { id: 'fallback-f-projects', label: 'Dự án', href: '/projects', order: 1 },
  { id: 'fallback-f-studio', label: 'Studio', href: '/studio', order: 2 },
  { id: 'fallback-f-services', label: 'Dịch vụ', href: '/services', order: 3 },
  { id: 'fallback-f-journal', label: 'Nhật ký', href: '/journal', order: 4 },
  { id: 'fallback-f-contact', label: 'Liên hệ', href: '/contact', order: 5 },
]

export function withFallbackNav(items: NavItem[], fallback: NavItem[]): NavItem[] {
  return items.length > 0 ? items : fallback
}
