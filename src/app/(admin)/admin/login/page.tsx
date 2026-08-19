import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { ADMIN_HOME_PATH, LOGIN_PATH, getSession } from '@/server/auth'

import { LoginForm } from './_components/LoginForm'

export const metadata: Metadata = { title: 'Đăng nhập' }
export const dynamic = 'force-dynamic'

type SearchParams = Record<string, string | string[] | undefined>

/** Same rule as the sign-in action: internal admin paths only. */
function safeNext(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (!value || !value.startsWith('/') || value.startsWith('//')) return ADMIN_HOME_PATH
  if (!value.startsWith('/admin')) return ADMIN_HOME_PATH
  if (value === LOGIN_PATH || value.startsWith(`${LOGIN_PATH}?`)) return ADMIN_HOME_PATH
  return value
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const next = safeNext(params['next'])

  // Signed in already — never show the form (and never inside the admin shell).
  const session = await getSession()
  if (session) redirect(next)

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Link href="/" className="font-display text-[2rem] font-light leading-none tracking-[-0.02em]">
            AN ATELIER
          </Link>
          <p className="u-label mt-3 text-accent">Studio CMS</p>
        </div>

        <div className="border border-line bg-surface px-6 py-8">
          <h1 className="mb-1 font-display text-[1.5rem] font-light leading-tight">Đăng nhập</h1>
          <p className="mb-7 font-body text-[0.75rem] leading-5 text-muted">
            Khu vực quản trị nội dung. Chỉ dành cho thành viên studio.
          </p>

          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center font-body text-[0.75rem] leading-5 text-muted">
          Quên mật khẩu? Liên hệ quản trị viên để được cấp lại.
        </p>
      </div>
    </main>
  )
}
