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
import { resolveAppearance, themeBootScript } from '@/lib/appearance'
import { DEFAULT_THEME, THEME_STYLE_ID, dualThemeStyleSheet } from '@/lib/theme'
import { getAppearance, getThemeSettings } from '@/server/queries/site'

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
  const [theme, appearance] = await Promise.all([
    getThemeSettings().catch(() => DEFAULT_THEME),
    getAppearance().catch(() => null),
  ])
  const resolved = appearance ? resolveAppearance(appearance, theme.colors) : null
  const mode = appearance?.mode ?? 'light'
  // `light dark` tells the browser the page supports both, so it picks the right
  // form-control and scrollbar rendering itself instead of guessing from one
  // themeColor. The two themeColor entries let the mobile address bar follow.
  return {
    width: 'device-width',
    initialScale: 1,
    colorScheme: mode === 'auto' ? 'light dark' : mode,
    themeColor: resolved
      ? [
          { media: '(prefers-color-scheme: light)', color: resolved.light.canvas },
          { media: '(prefers-color-scheme: dark)', color: resolved.dark.canvas },
        ]
      : theme.colors.canvas,
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Both request-cached, and both fall back to a working default internally.
  const [theme, appearance] = await Promise.all([getThemeSettings(), getAppearance()])
  const resolved = resolveAppearance(appearance, theme.colors)

  /*
    On `auto` the server does not choose the palette — it ships both and lets a
    selector decide, because `prefers-color-scheme` is only knowable in the
    browser. On a fixed mode it ships one and the question never arises.

    `suppressHydrationWarning` on <html> is required and not a shortcut: the boot
    script below writes `data-theme` and `data-ground` before React hydrates, so
    the attributes React finds are legitimately not the ones it rendered.
  */
  return (
    <html
      lang="vi"
      className={FONT_VARIABLES}
      data-theme={appearance.mode === 'dark' ? 'dark' : 'light'}
      data-ground={appearance.mode === 'dark' ? 'dark' : 'light'}
      suppressHydrationWarning
    >
      <head>
        {/*
          Blocking, and deliberately so: on `auto` the palette comes from the
          machine's `prefers-color-scheme`, which the server cannot know, so
          without this a visitor on a dark machine gets one frame of light. One
          media query, and it costs less than the reflow it prevents.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript(appearance.mode) }} />
      </head>
      <body className="bg-canvas font-body text-ink">
        {/* Admin-editable palettes. `:root:root` outranks the stylesheet defaults. */}
        <style
          id={THEME_STYLE_ID}
          href="guhomes-theme"
          precedence="high"
          dangerouslySetInnerHTML={{
            __html: dualThemeStyleSheet({
              theme,
              light: resolved.light,
              dark: resolved.dark,
              bothPalettes: resolved.bothPalettes,
              followSystem: appearance.mode === 'auto',
              darkByDefault: appearance.mode === 'dark',
            }),
          }}
        />
        <Providers motion={theme.motion}>
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  )
}
