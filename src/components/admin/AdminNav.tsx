'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export interface AdminNavItem {
  href: string
  label: string
  /** English editorial label shown under the Vietnamese one in the sidebar. */
  hint?: string
  /** Match only the exact path (used by the dashboard root). */
  exact?: boolean
}

/**
 * The one nav definition for the whole CMS. Other admin areas are added here,
 * never re-declared, so the sidebar stays in one place.
 */
export const ADMIN_NAV: readonly AdminNavItem[] = [
  { href: '/admin', label: 'Dashboard', hint: 'Overview', exact: true },
  { href: '/admin/projects', label: 'Dự án', hint: 'Projects' },
  { href: '/admin/styles', label: 'Phong cách', hint: 'Styles' },
  { href: '/admin/articles', label: 'Bài viết', hint: 'Journal' },
  { href: '/admin/media', label: 'Media', hint: 'Library' },
  { href: '/admin/3d-assets', label: '3D Assets', hint: 'Scenes' },
  { href: '/admin/theme', label: 'Giao diện', hint: 'Theme' },
  { href: '/admin/homepage', label: 'Trang chủ', hint: 'Homepage' },
  { href: '/admin/navigation', label: 'Điều hướng', hint: 'Navigation' },
  { href: '/admin/settings', label: 'Cài đặt', hint: 'Settings' },
]

export function isNavItemActive(item: AdminNavItem, pathname: string): boolean {
  if (item.exact) return pathname === item.href
  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

export interface AdminNavProps {
  orientation?: 'vertical' | 'horizontal'
  items?: readonly AdminNavItem[]
  className?: string
}

/** Sidebar (vertical) / mobile strip (horizontal) navigation with active state. */
export function AdminNav({ orientation = 'vertical', items = ADMIN_NAV, className }: AdminNavProps) {
  const pathname = usePathname() ?? ''

  if (orientation === 'horizontal') {
    return (
      <nav aria-label="Quản trị" className={cn('flex gap-1 overflow-x-auto', className)}>
        {items.map((item) => {
          const active = isNavItemActive(item, pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'u-label shrink-0 whitespace-nowrap border px-3 py-2 transition-colors duration-200',
                active
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line text-muted hover:border-ink hover:text-ink',
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    )
  }

  return (
    <nav aria-label="Quản trị" className={cn('flex flex-col', className)}>
      {items.map((item) => {
        const active = isNavItemActive(item, pathname)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group relative flex items-baseline justify-between gap-3 border-b border-line/60 px-5 py-3 transition-colors duration-200',
              active ? 'bg-canvas text-ink' : 'text-muted hover:bg-canvas/60 hover:text-ink',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-y-0 left-0 w-px transition-colors duration-200',
                active ? 'bg-accent' : 'bg-transparent',
              )}
            />
            <span className="font-body text-[0.8125rem] font-medium leading-5">{item.label}</span>
            {item.hint ? (
              <span
                className={cn(
                  'u-label text-[0.5625rem] transition-opacity duration-200',
                  active ? 'text-accent' : 'text-muted/60 group-hover:text-muted',
                )}
              >
                {item.hint}
              </span>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}
