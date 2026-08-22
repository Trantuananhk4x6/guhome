/**
 * Shared props for every homepage section.
 *
 * The page (`src/app/(site)/page.tsx`) fetches once, hands the same `HomeData`
 * object to every section and renders them through `SECTION_COMPONENTS`, so the
 * admin can reorder or disable a section without a code change.
 */

import type {
  ArticleSummary,
  HomepageSection,
  ImmersiveStop,
  MaterialItem,
  MediaRef,
  ProjectSummary,
  SceneConfig,
  ServiceItem,
} from '@/types/content'

/** A project plus everything the 3D system needs to stage it. */
export interface HomeSceneSlot {
  project: ProjectSummary | null
  scene: SceneConfig | null
  /** Ordered stills, used for the degraded (no-WebGL / small screen) sequence. */
  gallery: MediaRef[]
  /**
   * Stops the admin authored for this band, media already resolved. Empty means
   * nothing is authored and the band falls back to `gallery`.
   */
  stops: ImmersiveStop[]
  /**
   * A picture the editor chose for this slot, outranking whatever the project
   * heuristic would have found. `null` leaves the old behaviour alone.
   */
  authoredImage: MediaRef | null
}

export interface HomeData {
  /** Featured project behind the hero. */
  hero: HomeSceneSlot
  /** The pinned, scroll-driven project. */
  immersive: HomeSceneSlot
  featured: ProjectSummary[]
  services: ServiceItem[]
  articles: ArticleSummary[]
  materials: MaterialItem[]
  studioImage: MediaRef | null
  /**
   * Where `studioImage` came from, so the studio band can caption it honestly
   * instead of calling a borrowed project photograph "our workshop".
   */
  studioImageCaption: string | null
  philosophyImage: MediaRef | null
  /** A photograph held back from every other band, for the closing invitation. */
  closingImage: MediaRef | null
  /** Published projects in the library — feeds the studio stat rows. */
  projectCount: number
}

export interface HomeSectionProps {
  section: HomepageSection
  data: HomeData
}

/** Empty payload — lets the page render even when the database is unreachable. */
export const EMPTY_HOME_DATA: HomeData = {
  hero: { project: null, scene: null, gallery: [], stops: [], authoredImage: null },
  immersive: { project: null, scene: null, gallery: [], stops: [], authoredImage: null },
  featured: [],
  services: [],
  articles: [],
  materials: [],
  studioImage: null,
  studioImageCaption: null,
  philosophyImage: null,
  closingImage: null,
  projectCount: 0,
}
