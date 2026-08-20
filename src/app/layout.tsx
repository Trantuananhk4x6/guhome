import type { Metadata, Viewport } from 'next'
import {
  Be_Vietnam_Pro,
  Cormorant_Garamond,
  Inter,
  Lora,
  Manrope,
  Playfair_Display,
  Source_Serif_4,
} from 'next/font/google'
import type { ReactNode } from 'react'

import '@/styles/globals.css'
import '@/styles/neon.css'

import { PageTransition } from '@/components/animation/PageTransition'
import { Providers } from '@/components/layout/Providers'
import { siteUrl } from '@/lib/env'
import { DEFAULT_THEME, THEME_STYLE_ID, themeStyleSheet } from '@/lib/theme'
import { isDarkGround } from '@/lib/theme-presets'
import { getThemeSettings } from '@/server/queries/site'

/**
 * The type library the theme editor can choose from.
 *
 * next/font only accepts literal arguments, so every family is spelled out here
 * and the `variable` names are repeated verbatim in FONT_LIBRARY in
 * `@/lib/theme` — that is what `--f-display` / `--f-body` resolve to.
 *
 * Every family below carries the `vietnamese` subset. That is not a nicety:
 * Instrument Serif and DM Serif Display, both named in the original brief, ship
 * no Vietnamese range at all, so Vietnamese text in them falls back mid-sentence
 * and the diacritics break. They are deliberately absent.
 *
 * next/font takes literal arguments only, so the subset list is repeated in full
 * for every family rather than shared.
 *
 * Only the two defaults are preloaded. The rest still emit their @font-face, so
 * switching the theme picks them up immediately, but a visitor never downloads a
 * face the site is not using.
 */
const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-playfair-display',
})

const bodyFont = Be_Vietnam_Pro({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-be-vietnam-pro',
})

const lora = Lora({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
  variable: '--font-lora',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-source-serif-4',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['300', '400', '500'],
  display: 'swap',
  preload: false,
  variable: '--font-cormorant-garamond',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
  variable: '--font-manrope',
})

const FONT_VARIABLES = [playfair, bodyFont, lora, sourceSerif, cormorant, inter, manrope]
  .map((font) => font.variable)
  .join(' ')

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await getThemeSettings()
  const description =
    'GuHomes là studio kiến trúc nội thất tại TP. Hồ Chí Minh — thiết kế căn hộ, nhà phố, biệt thự và không gian thương mại với vật liệu thật, ánh sáng và tỉ lệ.'

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

/**
 * Derived from the stored palette rather than fixed, so the mobile address bar
 * and the browser's own form controls follow the theme. A hardcoded
 * `colorScheme: 'light'` under a night ground gives you a white URL bar above a
 * near-black page and light-styled native controls on top of it.
 */
export async function generateViewport(): Promise<Viewport> {
  const theme = await getThemeSettings().catch(() => DEFAULT_THEME)
  const dark = isDarkGround(theme.colors)
  return {
    width: 'device-width',
    initialScale: 1,
    colorScheme: dark ? 'dark' : 'light',
    themeColor: theme.colors.canvas,
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  // `getThemeSettings()` is request-cached and falls back to DEFAULT_THEME itself.
  const theme = await getThemeSettings()
  // Decided on the server from the stored palette, so the night treatment is in
  // the first paint rather than arriving after hydration. `neon.css` keys every
  // rule off this, which is what keeps the daylight theme free of the light layer.
  const ground = isDarkGround(theme.colors) ? 'dark' : 'light'

  return (
    <html lang="vi" className={FONT_VARIABLES} data-ground={ground}>
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
