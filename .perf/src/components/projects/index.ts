/**
 * Project components barrel.
 *
 * `ProjectBlocks` is deliberately **not** re-exported here: it is an async server
 * component that reaches into `@/server/queries/*`, and a client component
 * importing this barrel would drag the database layer into its bundle. Import it
 * by its own path (`@/components/projects/ProjectBlocks`) from a server file.
 */

export { BeforeAfter } from './BeforeAfter'
export type { BeforeAfterProps } from './BeforeAfter'

export { CategoryFilter } from './CategoryFilter'
export type { CategoryFilterProps, CategoryOption } from './CategoryFilter'

export { IndexPager } from './IndexPager'
export type { IndexPagerProps } from './IndexPager'

export { Project3D } from './Project3D'
export type { Project3DProps } from './Project3D'

export { ProjectAnalytics } from './ProjectAnalytics'
export type { ProjectAnalyticsProps } from './ProjectAnalytics'

export { ProjectCard } from './ProjectCard'
export type { ProjectCardProps, ProjectCardSize, ProjectCardVariant } from './ProjectCard'

export { ProjectCta } from './ProjectCta'
export type { ProjectCtaProps } from './ProjectCta'

export { ProjectFigure } from './ProjectFigure'
export type { FigureCursor, ProjectFigureProps } from './ProjectFigure'

export { ProjectGallery } from './ProjectGallery'
export type { GalleryColumns, ProjectGalleryProps } from './ProjectGallery'

export { ProjectGrid } from './ProjectGrid'
export type { ProjectGridProps } from './ProjectGrid'

export { ProjectHero } from './ProjectHero'
export type { ProjectHeroProps } from './ProjectHero'

export { ProjectImage } from './ProjectImage'
export type { ProjectImageProps, ProjectImageWidth } from './ProjectImage'

export { ProjectIndex } from './ProjectIndex'
export type { ProjectIndexProps } from './ProjectIndex'

export { ProjectLead } from './ProjectLead'
export type { ProjectLeadProps } from './ProjectLead'

export { ProjectInfo } from './ProjectInfo'
export type { ProjectInfoProps } from './ProjectInfo'

export { ProjectMasonry } from './ProjectMasonry'
export type { MasonryColumns, ProjectMasonryProps } from './ProjectMasonry'

export { ProjectMaterials } from './ProjectMaterials'
export type { ProjectMaterialsProps } from './ProjectMaterials'

export { ProjectQuote } from './ProjectQuote'
export type { ProjectQuoteProps } from './ProjectQuote'

export { ProjectText, toParagraphs } from './ProjectText'
export type { ProjectTextProps } from './ProjectText'

export { ProjectVideo } from './ProjectVideo'
export type { ProjectVideoProps } from './ProjectVideo'

export { RelatedProjects } from './RelatedProjects'
export type { RelatedProjectsProps } from './RelatedProjects'
