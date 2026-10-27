import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import '@/styles/globals.css'
import '@/styles/neon.css'

import { PageTransition } from '@/components/animation/PageTransition'
import { Providers } from '@/components/layout/Providers'
import { siteUrl } from '@/lib/env'
import { resolveAppearance, themeBootScript } from '@/lib/appearance'
import { DEFAULT_THEME, THEME_STYLE_ID, dualThemeStyleSheet } from '@/lib/theme'
import { getAppearance, getThemeSettings } from '@/server/queries/site'

const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@400;500&family=Lora:wght@400;500&family=Manrope:wght@400;500&family=Playfair+Display:wght@400;500;600&family=Source+Serif+4:wght@400;600&display=swap'

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await getThemeSettings()
  const description =
    'GuHomes là studio kiến trúc nội thất tại TP. Hồ Chí Minh - thiết kế căn hộ, nhà phố, biệt thự và không gian thương mại với vật liệu thật, ánh sáng và tỉ lệ.'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${brand.companyName} · ${brand.tagline}`,
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
      title: `${brand.companyName} · ${brand.tagline}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.companyName} · ${brand.tagline}`,
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
      data-theme={appearance.mode === 'dark' ? 'dark' : 'light'}
      data-ground={appearance.mode === 'dark' ? 'dark' : 'light'}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
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
