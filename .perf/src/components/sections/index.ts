/**
 * Homepage section registry.
 *
 * `src/app/(site)/page.tsx` reads `getHomepageSections()` and renders whatever
 * the database lists, in the database's order, through `SECTION_COMPONENTS` —
 * so reordering or disabling a band in the admin never needs a code change.
 */

import type { ComponentType } from 'react'

import type { HomepageSectionKey } from '@/types/content'

import { CtaSection } from './CtaSection'
import { FeaturedProjects } from './FeaturedProjects'
import { Hero3D } from './Hero3D'
import { ImmersiveProject } from './ImmersiveProject'
import { Journal } from './Journal'
import { Philosophy } from './Philosophy'
import { Services } from './Services'
import { StudioIntro } from './StudioIntro'
import type { HomeSectionProps } from './types'

export { CtaSection, FeaturedProjects, Hero3D, ImmersiveProject, Journal, Philosophy, Services, StudioIntro }
export { SectionImage } from './SectionImage'
export * from './content'
export * from './types'

/** Every homepage key has a component — the map is exhaustive by construction. */
export const SECTION_COMPONENTS: Record<HomepageSectionKey, ComponentType<HomeSectionProps>> = {
  HERO: Hero3D,
  FEATURED_PROJECTS: FeaturedProjects,
  STUDIO: StudioIntro,
  SERVICES: Services,
  IMMERSIVE_PROJECT: ImmersiveProject,
  PHILOSOPHY: Philosophy,
  JOURNAL: Journal,
  CTA: CtaSection,
}
