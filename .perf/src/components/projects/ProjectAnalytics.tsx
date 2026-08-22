'use client'

/**
 * Records one `PROJECT_VIEW` per project page. Renders nothing — it exists only
 * because the page itself is a server component and the beacon has to leave from
 * the browser. Anonymous by construction: see `@/lib/analytics`.
 */

import { useTrackView } from '@/lib/analytics'

export interface ProjectAnalyticsProps {
  projectId: string
  slug: string
}

export function ProjectAnalytics({ projectId, slug }: ProjectAnalyticsProps): null {
  useTrackView('PROJECT_VIEW', projectId, { entityType: 'project', meta: { slug } })
  return null
}
