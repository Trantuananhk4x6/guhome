import Link from 'next/link'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { signOutAction } from '@/server/actions/auth'
import type { UserRole } from '@/types/content'

import { AdminNav } from './AdminNav'
import { LogoutIcon } from './AdminIcons'

/* ---------------------------------- shell ---------------------------------- */

export interface AdminShellUser {
  email: string
  role: UserRole
}

export interface AdminShellProps {
  user: AdminShellUser
  children: ReactNode
}

const ROLE_LABEL: Record<UserRole, string> = {
  admin: 'Quản trị viên',
  editor: 'Biên tập viên',
}

/**
 * The authed CMS frame: fixed sidebar, top bar with identity + sign-out, and a
 * dense content column. Server component — it renders the sign-out server
 * action directly as a form, so the shell keeps working without JavaScript.
 */
export function AdminShell({ user, children }: AdminShellProps) {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      {/* Lenis runs on /admin too and preventDefaults every wheel event before a
          nested scroller sees it, so the CMS rail is unscrollable once it
          overflows. Marking the whole aside covers everything inside it — the
          attribute has to sit on a DOM element, not on <AdminNav>, which does not
          forward unknown props. */}
      <aside
        data-lenis-prevent
        className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-surface lg:flex"
      >
        <div className="border-b border-line px-5 py-5">
          <Link href="/admin" className="block">
            <span className="block font-display text-[1.375rem] font-normal leading-none tracking-[-0.02em]">
              GUHOMES
            </span>
            <span className="u-label mt-2 block text-[0.5625rem] text-accent">Studio CMS</span>
          </Link>
        </div>

        <AdminNav className="flex-1 overflow-y-auto py-1" />

        <div className="border-t border-line px-5 py-4">
          <Link
            href="/"
            className="u-label text-[0.5625rem] text-muted transition-colors duration-200 hover:text-ink"
          >
            Xem website →
          </Link>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-line bg-canvas px-5 lg:px-8">
          <Link href="/admin" className="font-display text-[1.125rem] font-normal leading-none lg:hidden">
            GUHOMES
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-right leading-tight sm:block">
              <span className="block font-body text-[0.75rem] text-ink">{user.email}</span>
              <span className="u-label block text-[0.5625rem] text-muted">{ROLE_LABEL[user.role]}</span>
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="u-label inline-flex items-center gap-2 border border-line px-3 py-2 text-[0.5625rem] text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                <LogoutIcon className="text-sm" />
                Đăng xuất
              </button>
            </form>
          </div>
        </header>

        <div className="border-b border-line px-5 py-3 lg:hidden">
          <AdminNav orientation="horizontal" />
        </div>

        <main className="px-5 py-8 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  )
}

/* -------------------------------- page header ------------------------------- */

export interface AdminPageHeaderProps {
  /** Small uppercase editorial label above the title. */
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  className?: string
}

export function AdminPageHeader({ eyebrow, title, description, actions, className }: AdminPageHeaderProps) {
  return (
    <div className={cn('mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4', className)}>
      <div className="min-w-0">
        {eyebrow ? <p className="u-label mb-3 text-accent">{eyebrow}</p> : null}
        <h1 className="font-display text-[2rem] font-normal leading-none tracking-[-0.02em] lg:text-[2.5rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl font-body text-[0.8125rem] leading-6 text-muted">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}

/* ----------------------------------- panel ---------------------------------- */

export interface PanelProps {
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  /** Removes the inner padding — use for tables that draw their own rows. */
  flush?: boolean
  className?: string
  bodyClassName?: string
  children?: ReactNode
}

/** A surface panel with a hairline border. The only container in the CMS. */
export function Panel({ title, description, actions, flush, className, bodyClassName, children }: PanelProps) {
  return (
    <section className={cn('border border-line bg-surface', className)}>
      {title || actions ? (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="min-w-0">
            {title ? <h2 className="u-label text-ink">{title}</h2> : null}
            {description ? (
              <p className="mt-1 font-body text-[0.75rem] leading-5 text-muted">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className={cn(flush ? '' : 'p-4', bodyClassName)}>{children}</div>
    </section>
  )
}

/* ---------------------------------- buttons --------------------------------- */

export type AdminButtonTone = 'solid' | 'outline' | 'ghost' | 'danger'

const BUTTON_TONES: Record<AdminButtonTone, string> = {
  solid: 'border-ink bg-ink text-canvas hover:bg-espresso',
  outline: 'border-line bg-canvas text-ink hover:border-ink',
  ghost: 'border-transparent bg-transparent text-muted hover:text-ink',
  danger: 'border-accent bg-transparent text-accent hover:bg-accent hover:text-canvas',
}

/** Shared chrome for every admin button and button-styled link. */
export function adminButtonClass(tone: AdminButtonTone = 'outline', className?: string): string {
  return cn(
    'u-label inline-flex select-none items-center justify-center gap-2 rounded-none border px-3 py-2 text-[0.5625rem] leading-none transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40',
    BUTTON_TONES[tone],
    className,
  )
}
