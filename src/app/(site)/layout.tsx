import type { ReactNode } from 'react'

import { CustomCursor } from '@/components/layout/CustomCursor'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { FALLBACK_FOOTER_NAV, FALLBACK_HEADER_NAV, withFallbackNav } from '@/components/layout/nav-fallback'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { getNavigation, getThemeSettings } from '@/server/queries/site'

/** Public shell: scroll rule, cursor, header, main landmark, espresso footer. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  // Every query here degrades to defaults internally, so the shell always renders.
  const [theme, headerNav, footerNav] = await Promise.all([
    getThemeSettings(),
    getNavigation('header'),
    getNavigation('footer'),
  ])

  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <CustomCursor />

      <a
        href="#main"
        className="u-label sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-6 focus-visible:top-6 focus-visible:z-[300] focus-visible:bg-ink focus-visible:px-5 focus-visible:py-3 focus-visible:text-canvas"
      >
        Tới nội dung chính
      </a>

      <Header nav={withFallbackNav(headerNav, FALLBACK_HEADER_NAV)} brand={theme.brand} />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer nav={withFallbackNav(footerNav, FALLBACK_FOOTER_NAV)} brand={theme.brand} />
    </div>
  )
}
