import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/seo'

/**
 * Everything public is crawlable. The admin surface and the API (analytics,
 * recon) are not — they carry no indexable content, and the analytics endpoint
 * should never be hit by a crawler.
 */
export default function robots(): MetadataRoute.Robots {
  let host: string | undefined
  try {
    host = new URL(absoluteUrl('/')).host
  } catch {
    host = undefined
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host,
  }
}
