import type { MetadataRoute } from 'next'

import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

/**
 * Web app manifest. Theme colour is the limestone canvas, background the
 * espresso used by the splash and the footer (ARCHITECTURE §2).
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
    theme_color: '#F4F1EA',
    background_color: '#131210',
  }
}
