import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import '@/styles/globals.css'

import { PageTransition } from '@/components/animation/PageTransition'
import { Providers } from '@/components/layout/Providers'
import { siteUrl } from '@/lib/env'
import { DEFAULT_THEME, THEME_STYLE_ID, themeStyleSheet } from '@/lib/theme'
import { getThemeSettings } from '@/server/queries/site'

/**
 * next/font only accepts literal arguments, so the variable names are repeated
 * here verbatim — they must match FONT_VAR_DISPLAY / FONT_VAR_BODY in
 * `@/lib/theme`, which is what `--f-display` / `--f-body` resolve to.
 */
const displayFont = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--font-cormorant-garamond',
})

const bodyFont = Inter({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-inter',
})

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await getThemeSettings()
  const description =
    'AN ATELIER là studio kiến trúc nội thất tại TP. Hồ Chí Minh — thiết kế căn hộ, nhà phố, biệt thự và không gian thương mại với vật liệu thật, ánh sáng và tỉ lệ.'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${brand.companyName} — ${brand.tagline}`,
      template: `%s · ${brand.companyName}`,
    },
    description,
    applicationName: brand.companyName,
    authors: [{ name: brand.companyName }],
    creator: brand.companyName,
    publisher: brand.companyName,
    formatDetection: { telephone: false, address: false, email: false },
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: siteUrl,
      siteName: brand.companyName,
      title: `${brand.companyName} — ${brand.tagline}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.companyName} — ${brand.tagline}`,
      description,
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: DEFAULT_THEME.colors.canvas,
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  // `getThemeSettings()` is request-cached and falls back to DEFAULT_THEME itself.
  const theme = await getThemeSettings()

  return (
    <html lang="vi" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-canvas font-body text-ink">
        {/* Admin-editable palette. `:root:root` outranks the stylesheet defaults. */}
        <style
          id={THEME_STYLE_ID}
          href="an-atelier-theme"
          precedence="high"
          dangerouslySetInnerHTML={{ __html: themeStyleSheet(theme) }}
        />
        <Providers motion={theme.motion}>
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  )
}
