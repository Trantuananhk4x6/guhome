import type { ReactNode } from 'react'

import { CustomCursor } from '@/components/layout/CustomCursor'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { FALLBACK_FOOTER_NAV, FALLBACK_HEADER_NAV, withFallbackNav } from '@/components/layout/nav-fallback'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { mediaUrl } from '@/lib/media'
import { getMediaMap } from '@/server/queries/media'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { getAppearance, getNavigation, getThemeSettings } from '@/server/queries/site'

/** Public shell: scroll rule, cursor, header, main landmark, espresso footer. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  // Every query here degrades to defaults internally, so the shell always renders.
  const [theme, headerNav, footerNav, appearance] = await Promise.all([
    getThemeSettings(),
    getNavigation('header'),
    getNavigation('footer'),
    getAppearance(),
  ])

  // `logoMediaId` is an id on the theme row; resolve it here so the header stays
  // a client component that receives a plain string. Falls back to setting the
  // name in type when no logo is configured.
  const logoMedia = theme.brand.logoMediaId
    ? ((await getMediaMap([theme.brand.logoMediaId])).get(theme.brand.logoMediaId) ?? null)
    : null
  const logo = logoMedia ? mediaUrl(logoMedia, 512) : null

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

      <Header nav={withFallbackNav(headerNav, FALLBACK_HEADER_NAV)} brand={theme.brand} logo={logo} />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer
        nav={withFallbackNav(footerNav, FALLBACK_FOOTER_NAV)}
        brand={theme.brand}
        logo={logo}
        /*
          The switch lives in the footer, not the masthead. A theme control is a
          preference, not a destination: putting it in the nav makes a visitor
          weigh it against `Dự án` every time they look up. The footer is where
          people already go for the things a site lets them change.
        */
        themeToggle={
          appearance.allowVisitorChoice ? <ThemeToggle mode={appearance.mode} /> : null
        }
      />
    </div>
  )
}
