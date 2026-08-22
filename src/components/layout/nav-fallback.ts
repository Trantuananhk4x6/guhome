import type { NavItem } from '@/types/content'

/**
 * Used when `getNavigation()` returns nothing (fresh database, seed not run).
 * The admin navigation editor is the source of truth once rows exist.
 *
 * `/phong-cach` sits directly after `/projects` because it is the second way
 * into the same work — a visitor who arrives asking for "Indochine" rather than
 * for "căn hộ" needs a door, and a route with no menu entry is a route nobody
 * finds. It is a fallback, not a fixture: once navigation rows exist the admin
 * editor decides, and the row must be added there too.
 */
export const FALLBACK_HEADER_NAV: NavItem[] = [
  { id: 'fallback-home', label: 'Trang chủ', href: '/', order: 0 },
  { id: 'fallback-projects', label: 'Dự án', href: '/projects', order: 1 },
  { id: 'fallback-styles', label: 'Phong cách', href: '/phong-cach', order: 2 },
  { id: 'fallback-studio', label: 'Studio', href: '/studio', order: 3 },
  { id: 'fallback-services', label: 'Dịch vụ', href: '/services', order: 4 },
  { id: 'fallback-journal', label: 'Bài viết', href: '/journal', order: 5 },
  { id: 'fallback-contact', label: 'Liên hệ', href: '/contact', order: 6 },
]

export const FALLBACK_FOOTER_NAV: NavItem[] = [
  { id: 'fallback-f-home', label: 'Trang chủ', href: '/', order: 0 },
  { id: 'fallback-f-projects', label: 'Dự án', href: '/projects', order: 1 },
  { id: 'fallback-f-styles', label: 'Phong cách', href: '/phong-cach', order: 2 },
  { id: 'fallback-f-studio', label: 'Studio', href: '/studio', order: 3 },
  { id: 'fallback-f-services', label: 'Dịch vụ', href: '/services', order: 4 },
  { id: 'fallback-f-journal', label: 'Bài viết', href: '/journal', order: 5 },
  { id: 'fallback-f-contact', label: 'Liên hệ', href: '/contact', order: 6 },
]

export function withFallbackNav(items: NavItem[], fallback: NavItem[]): NavItem[] {
  return items.length > 0 ? items : fallback
}

/* --------------------------------- roles ---------------------------------- */

/**
 * Six navigation rows are not six equal destinations, and rendering them at one
 * size is what makes a menu read as a template. `groupNav` sorts the rows the
 * admin editor produced into the three jobs they actually do, so the header,
 * the mobile sheet and the footer can weight them the same way:
 *
 * - `home` — the way back. Belongs on the wordmark, not in the list.
 * - `lead` — `/projects`. The reason anyone opens the menu at all.
 * - `rest` — the reading destinations, in the order the editor set.
 * - `contact` — the conversion. Gets its own block, never a row in a list.
 *
 * Matching is by path, so renaming a row in the admin editor keeps its weight;
 * deleting or re-pointing one degrades to `rest` instead of disappearing.
 */
export interface NavRoles {
  home: NavItem | null
  lead: NavItem | null
  rest: NavItem[]
  contact: NavItem | null
}

export const HOME_HREF = '/'
export const LEAD_HREF = '/projects'
export const CONTACT_HREF = '/contact'

/** `/projects/` and `/projects?x=1` are the same destination as `/projects`. */
function navPath(href: string): string {
  const head = href.split('?')[0] ?? href
  const path = head.split('#')[0] ?? head
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
}

export function groupNav(items: NavItem[]): NavRoles {
  let home: NavItem | null = null
  let lead: NavItem | null = null
  let contact: NavItem | null = null
  const rest: NavItem[] = []

  for (const item of items) {
    const path = navPath(item.href)
    if (home === null && path === HOME_HREF) home = item
    else if (lead === null && path === LEAD_HREF) lead = item
    else if (contact === null && path === CONTACT_HREF) contact = item
    else rest.push(item)
  }

  // A nav without `/projects` still needs a head item, otherwise the sheet opens
  // on three identical small rows and the hierarchy collapses.
  if (lead === null) lead = rest.shift() ?? null

  return { home, lead, rest, contact }
}

/** True when the row is the real `/projects` entry, not a stand-in promoted above. */
export function isLeadProjects(item: NavItem | null): boolean {
  return item !== null && navPath(item.href) === LEAD_HREF
}
