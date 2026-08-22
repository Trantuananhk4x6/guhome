import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/seo'
import { getAllArticleSlugs } from '@/server/queries/articles'
import { getAllProjectSlugs } from '@/server/queries/projects'

/** Regenerated hourly; content edits in the admin surface within the hour. */
export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

const STATIC_ROUTES: ReadonlyArray<{
  path: string
  priority: number
  changeFrequency: NonNullable<Entry['changeFrequency']>
}> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/studio', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/journal', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
]

/**
 * A sitemap must never be the reason a deploy fails: if the database is
 * unreachable the static routes still ship.
 */
async function safeSlugs(label: string, read: () => Promise<string[]>): Promise<string[]> {
  try {
    return await read()
  } catch (error) {
    console.error(`[sitemap] ${label} failed — omitting those entries`, error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const [projectSlugs, articleSlugs] = await Promise.all([
    safeSlugs('getAllProjectSlugs', getAllProjectSlugs),
    safeSlugs('getAllArticleSlugs', getAllArticleSlugs),
  ])

  const staticEntries: Entry[] = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const projectEntries: Entry[] = projectSlugs.map((slug) => ({
    url: absoluteUrl(`/projects/${slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const articleEntries: Entry[] = articleSlugs.map((slug) => ({
    url: absoluteUrl(`/journal/${slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticEntries, ...projectEntries, ...articleEntries]
}
