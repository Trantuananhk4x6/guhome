import type { MetadataRoute } from 'next'

import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

/**
 * Web app manifest.
 *
 * It carried no icons at all, so an installed shortcut fell back to a screenshot
 * of the page. The mark is declared at both sizes an installer looks for, and
 * `purpose: 'maskable'` is deliberately absent: the mark is a thin outline with
 * no safe-area padding, and a maskable icon gets cropped to a circle on Android —
 * which would cut the roof off.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    id: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'vi-VN',
    dir: 'ltr',
    categories: ['design', 'lifestyle', 'business'],
    icons: [
      { src: '/brand/guhomes-mark-256.png', sizes: '256x256', type: 'image/png' },
      { src: '/brand/guhomes-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#0C0B0A',
    background_color: '#0C0B0A',
  }
}
