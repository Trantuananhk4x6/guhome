import type { Metadata } from 'next'
import type { ReactNode } from 'react'

/**
 * Route-group layout for the CMS.
 *
 * It deliberately holds no auth: `/admin/login` lives inside this group and has
 * to render for signed-out visitors. The session guard and the authed chrome sit
 * one level down, in `(admin)/admin/layout.tsx`.
 *
 * The admin is a tool, not the website: 13px Inter, canvas ground, no display
 * serif except the wordmark.
 */
export const metadata: Metadata = {
  title: { default: 'CMS · GuHomes', template: '%s · CMS GuHomes' },
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminGroupLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-canvas font-body text-[0.8125rem] leading-5 text-ink">{children}</div>
}
