import type { ReactNode } from 'react'

import { AdminShell } from '@/components/admin/AdminShell'
import { getSession } from '@/server/auth'

/**
 * The authed CMS frame.
 *
 * `/admin/login` is a child of this segment, so the guard cannot simply call
 * `requireUser()` — that would redirect the login page to itself. Instead:
 *
 *   • no session  → render the page bare (only `/admin/login` can get here;
 *     `src/middleware.ts` bounces every other `/admin/*` path, and each page
 *     calls `requireUser()` itself as the second gate);
 *   • session     → wrap the page in the sidebar + top bar shell.
 *
 * A signed-in visitor who opens `/admin/login` is redirected by that page, so
 * the shell is never shown around the login form.
 */
export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session) return <>{children}</>

  return <AdminShell user={{ email: session.email, role: session.role }}>{children}</AdminShell>
}
