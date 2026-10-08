/**
 * /phong-cach — the studio's styles, as a page you can actually enter.
 *
 * A style is the second taxonomy over the work, beside the category: a category
 * says what kind of building it is, a style says how it is spoken. Visitors ask
 * for the second one by name — "tôi thích Indochine", "làm kiểu tối giản được
 * không" — so it deserves an address rather than a menu label.
 *
 * EVERY STYLE HERE IS A LINK. That is the whole point of the route. The grid
 * reads off `getPublishedStyles()`, so what the studio configures in
 * /admin/styles is what a visitor sees, and each card leads to a real page of
 * real projects — never a button that goes nowhere.
 *
 * Revalidated hourly: a style added or renamed in the admin lands without a
 * deploy, and the read is cheap enough that an hour of staleness is the only
 * cost. A database with no styles in it renders the empty state below rather
 * than a broken grid — `getPublishedStyles()` answers `[]` on a failed read, so
 * this page is safe before the migration has even run.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { Reveal, TextReveal } from '@/components/animation'
import { Button } from '@/components/ui/Button'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { Label } from '@/components/ui/Label'
import { TactileMoodboardStudio } from '@/components/studio/TactileMoodboardStudio'
import { TropicalWeatherAdvisory } from '@/components/tools/TropicalWeatherAdvisory'
import { ArchitecturalLightingLab } from '@/components/studio/ArchitecturalLightingLab'
import { BespokeCabinetryStudio } from '@/components/studio/BespokeCabinetryStudio'
import { AcousticDampeningSimulator } from '@/components/studio/AcousticDampeningSimulator'
import { TropicalPatinaLab } from '@/components/studio/TropicalPatinaLab'
import { SmartHomeQuietSanctuary } from '@/components/sections/SmartHomeQuietSanctuary'
import { BespokeFurnitureCustomizer } from '@/components/tools/BespokeFurnitureCustomizer'
import { LightingAtelierCustomizer } from '@/components/studio/LightingAtelierCustomizer'
import { TactileTextileDraperyLab } from '@/components/studio/TactileTextileDraperyLab'
import { TeaSanctuaryPavilion } from '@/components/studio/TeaSanctuaryPavilion'
import { TactileHardwareAtelier } from '@/components/studio/TactileHardwareAtelier'
import { ArtisanLimePlasterLab } from '@/components/studio/ArtisanLimePlasterLab'
import { AcousticSanctuaryMasterSuite } from '@/components/studio/AcousticSanctuaryMasterSuite'
import { PatinaMetalworkArtisanLab } from '@/components/studio/PatinaMetalworkArtisanLab'
import { SaigonCourtyardAtriumLab } from '@/components/studio/SaigonCourtyardAtriumLab'
import { ArtisanBespokeJoineryVault } from '@/components/studio/ArtisanBespokeJoineryVault'
import { SaigonMonsoonRainwaterHarvestLab } from '@/components/studio/SaigonMonsoonRainwaterHarvestLab'
import { HandcraftedLacquerArtisanAtelier } from '@/components/studio/HandcraftedLacquerArtisanAtelier'
import { SaigonBespokeTeakDeckingPavilion } from '@/components/studio/SaigonBespokeTeakDeckingPavilion'
import { BespokeAcousticHomeCinemaLab } from '@/components/studio/BespokeAcousticHomeCinemaLab'
import { SaigonBespokeInfinityPoolLab } from '@/components/studio/SaigonBespokeInfinityPoolLab'
import { HandCarvedStoneFireplaceVault } from '@/components/studio/HandCarvedStoneFireplaceVault'
import { SaigonBiophilicGreenWallAtelier } from '@/components/studio/SaigonBiophilicGreenWallAtelier'
import { ArtisanHandCastBronzeBasinVault } from '@/components/studio/ArtisanHandCastBronzeBasinVault'
import { SaigonRooftopStargazingObservatory } from '@/components/studio/SaigonRooftopStargazingObservatory'
import { BespokeOlfactoryFragranceAtelier } from '@/components/studio/BespokeOlfactoryFragranceAtelier'
import { AntiqueLibraryAndCartographyVault } from '@/components/studio/AntiqueLibraryAndCartographyVault'
import { ArtisanHorologyGrandfatherClockVault } from '@/components/studio/ArtisanHorologyGrandfatherClockVault'
import { ArtisanBatTrangBrickWineCellarVault } from '@/components/studio/ArtisanBatTrangBrickWineCellarVault'
import { ArtisanTeppanyakiChefTableVault } from '@/components/studio/ArtisanTeppanyakiChefTableVault'
import { ArtisanLiveEdgeParquetFlooringVault } from '@/components/studio/ArtisanLiveEdgeParquetFlooringVault'
import { MonolithicCalacattaMarbleChefIslandVault } from '@/components/studio/MonolithicCalacattaMarbleChefIslandVault'
import { PrivateArtCollectionMuseumVault } from '@/components/studio/PrivateArtCollectionMuseumVault'
import { ArtisanQuartzHourglassVault } from '@/components/studio/ArtisanQuartzHourglassVault'
import { SaigonBreezeWindChimeArtisanAtelier } from '@/components/studio/SaigonBreezeWindChimeArtisanAtelier'
import { ArtisanBasaltColdPlungeVault } from '@/components/studio/ArtisanBasaltColdPlungeVault'
import { ArtisanHelicalRibbonStaircaseVault } from '@/components/studio/ArtisanHelicalRibbonStaircaseVault'
import { CollectorAutomotiveCleanroomVault } from '@/components/studio/CollectorAutomotiveCleanroomVault'
import { SaigonAudiophileVinylSanctuary } from '@/components/studio/SaigonAudiophileVinylSanctuary'
import { SaigonRiversideOutdoorFirePitVault } from '@/components/studio/SaigonRiversideOutdoorFirePitVault'
import { SaigonFloatingOrchidAtelier } from '@/components/studio/SaigonFloatingOrchidAtelier'
import { ArtisanSunkenKoiAquariumVault } from '@/components/studio/ArtisanSunkenKoiAquariumVault'
import { SaigonAgarwoodTeaBespokeVault } from '@/components/studio/SaigonAgarwoodTeaBespokeVault'
import { PrivateSaltwaterNanoReefSanctuary } from '@/components/studio/PrivateSaltwaterNanoReefSanctuary'
import { buildMetadata } from '@/lib/seo'
import { pad2 } from '@/lib/utils'
import { getPublishedStyles } from '@/server/queries/styles'
import type { StyleItem } from '@/types/content'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Phong cách',
  description:
    'Những cách nói của cùng một studio — Hiện đại, Tân cổ điển, Tối giản, Indochine, Bắc Âu, Nhật Bản và hơn thế. Mỗi phong cách dẫn tới những công trình GuHomes đã hoàn thiện theo lối đó.',
  path: '/phong-cach',
})

function countLabel(style: StyleItem): string {
  return style.count > 0 ? `${style.count} công trình` : 'Đang cập nhật'
}

/**
 * The heading counts the styles out loud, and how many there are is the admin's
 * to decide — so the number has to be read, not written into the sentence. Nine
 * is where this started; five would have made the page say something untrue.
 */
const VI_NUMERALS = [
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
  'mười',
] as const

function viCount(total: number): string {
  return VI_NUMERALS[total] ?? String(total)
}

function StyleCard({ style, index }: { style: StyleItem; index: number }) {
  return (
    <li data-reveal-item>
      <Link href={`/phong-cach/${style.slug}`} className="group/style block">
        <ImageFrame
          media={style.cover}
          alt={style.cover?.alt ?? style.name}
          ratio="4/3"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          hoverZoom
        />

        <div className="border-line mt-6 flex items-baseline justify-between gap-6 border-t pt-5">
          <div>
            <h2 className="u-display-sm text-ink ease-editorial transition-colors duration-500 group-hover/style:text-accent">
              {style.name}
            </h2>
            {/* The English name is how half the briefs arrive — "Modern Luxury",
                "Japandi" — so it is set as a label under the Vietnamese one
                rather than dropped or promoted. */}
            {style.nameEn ? <p className="u-label mt-2">{style.nameEn}</p> : null}
          </div>
          <span className="u-label text-accent shrink-0 tabular-nums">{pad2(index)}</span>
        </div>

        {style.tagline ? (
          <p className="text-muted mt-4 max-w-[42ch] font-body text-[0.9375rem] leading-[1.8]">
            {style.tagline}
          </p>
        ) : null}

        <p className="u-label text-muted/70 mt-4">{countLabel(style)}</p>
      </Link>
    </li>
  )
}

export default async function StylesPage() {
  const styles = await getPublishedStyles()

  return (
    <div className="bg-canvas pb-[var(--spacing-section)]">
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto w-full max-w-[100rem]">
          <Label as="p" rule index="—">
            Phong cách
          </Label>

          <TextReveal as="h1" className="u-display text-ink mt-10 max-w-[15ch]">
            {styles.length > 0
              ? `Cùng một studio, ${viCount(styles.length)} cách nói.`
              : 'Cùng một studio, nhiều cách nói.'}
          </TextReveal>

          <Reveal delay={0.15} className="mt-12">
            <p className="u-body-lg max-w-[52ch]">
              Phong cách không phải bộ sưu tập đồ đạc, mà là cách một căn nhà chọn ánh sáng, tỉ lệ và
              vật liệu. Chọn một lối bên dưới để xem những công trình chúng tôi đã hoàn thiện theo lối
              đó — hoặc mang câu chuyện của bạn tới, rồi hai bên cùng tìm ra lối phù hợp.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="u-gutter mt-[calc(var(--spacing-section)*0.6)]">
        <div className="mx-auto w-full max-w-[100rem]">
          {styles.length > 0 ? (
            <Reveal as="ul" stagger={0.08} className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
              {styles.map((style, i) => (
                <StyleCard key={style.id} style={style} index={i + 1} />
              ))}
            </Reveal>
          ) : (
            /* Not an error state: a fresh database simply has no styles yet, and
               the honest answer is to send the visitor to the work itself. */
            <Reveal className="border-line border-t pt-16">
              <p className="u-display-sm text-ink max-w-[22ch]">
                Danh mục phong cách đang được sắp xếp lại.
              </p>
              <p className="u-body-lg mt-8 max-w-[46ch]">
                Chúng tôi đang chọn lại ảnh và viết lại phần mô tả cho từng lối. Trong lúc chờ, bạn có
                thể xem toàn bộ công trình đã hoàn thiện, hoặc nhắn cho studio một câu về không gian
                bạn đang hình dung.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <Button href="/projects" withArrow>
                  Xem dự án
                </Button>
                <Button href="/contact" variant="underline">
                  Liên hệ studio
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Tactile Moodboard & Acoustics Studio */}
      <TactileMoodboardStudio className="mt-[var(--spacing-section)]" />

      {/* Tropical Weather & Microclimate Advisory */}
      <TropicalWeatherAdvisory className="mt-[var(--spacing-section)]" />

      {/* Architectural Optical Lighting Lab */}
      <ArchitecturalLightingLab className="mt-[var(--spacing-section)]" />

      {/* Bespoke Cabinetry & Millwork Studio */}
      <BespokeCabinetryStudio className="mt-[var(--spacing-section)]" />

      {/* Architectural Acoustic Dampening & RT60 Simulator */}
      <AcousticDampeningSimulator className="mt-[var(--spacing-section)]" />

      {/* Tropical Timber Patina & Aging Simulator */}
      <TropicalPatinaLab className="mt-[var(--spacing-section)]" />

      {/* Invisible KNX Smart Home & Sanctuary System */}
      <SmartHomeQuietSanctuary className="mt-[var(--spacing-section)]" />

      {/* Bespoke Handcrafted Furniture Customizer */}
      <BespokeFurnitureCustomizer className="mt-[var(--spacing-section)]" />

      {/* Bespoke Lighting Atelier Customizer */}
      <LightingAtelierCustomizer className="mt-[var(--spacing-section)]" />

      {/* Tactile Textile & Tropical Drapery Lab */}
      <TactileTextileDraperyLab className="mt-[var(--spacing-section)]" />

      {/* Tea Sanctuary & Meditation Pavilion */}
      <TeaSanctuaryPavilion className="mt-[var(--spacing-section)]" />

      {/* Bespoke Tactile Architectural Hardware Atelier */}
      <TactileHardwareAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Hand-troweled Lime Plaster Lab */}
      <ArtisanLimePlasterLab className="mt-[var(--spacing-section)]" />

      {/* Acoustic Sanctuary Master Suite NC-25 */}
      <AcousticSanctuaryMasterSuite className="mt-[var(--spacing-section)]" />

      {/* Living Metal Patina Artisan Lab */}
      <PatinaMetalworkArtisanLab className="mt-[var(--spacing-section)]" />

      {/* Saigon Courtyard Atrium Aerodynamic Lab */}
      <SaigonCourtyardAtriumLab className="mt-[var(--spacing-section)]" />

      {/* Artisan Bespoke Timber Joinery Vault */}
      <ArtisanBespokeJoineryVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Monsoon Rainwater Harvest & Passive Rooftop Mist Cooling */}
      <SaigonMonsoonRainwaterHarvestLab className="mt-[var(--spacing-section)]" />

      {/* Handcrafted Lacquer Artisan Atelier Bát Tràng x Thạnh Xuân */}
      <HandcraftedLacquerArtisanAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Teak Decking & Outdoor Pavilion */}
      <SaigonBespokeTeakDeckingPavilion className="mt-[var(--spacing-section)]" />

      {/* Bespoke Acoustic Home Cinema Lab THX & Dolby Atmos */}
      <BespokeAcousticHomeCinemaLab className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Infinity Pool Lab Acrylic & Mineral Ion */}
      <SaigonBespokeInfinityPoolLab className="mt-[var(--spacing-section)]" />

      {/* Hand-carved Stone Fireplace Vault 3D Mist & Agarwood */}
      <HandCarvedStoneFireplaceVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Biophilic Vertical Green Wall Hydroponic Atelier */}
      <SaigonBiophilicGreenWallAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Hand-carved Basalt Stone & Bronze Basin Vault */}
      <ArtisanHandCastBronzeBasinVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Rooftop Stargazing Glass Observatory */}
      <SaigonRooftopStargazingObservatory className="mt-[var(--spacing-section)]" />

      {/* Bespoke Olfactory Cold-Air Nebulization Fragrance Atelier */}
      <BespokeOlfactoryFragranceAtelier className="mt-[var(--spacing-section)]" />

      {/* Antique Rare Library & Cartography Preservation Vault */}
      <AntiqueLibraryAndCartographyVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Haute Horology Grandfather Clock 432Hz Vault */}
      <ArtisanHorologyGrandfatherClockVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Bat Trang Brick Wine Cellar Breathing Vault */}
      <ArtisanBatTrangBrickWineCellarVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Teppanyaki Chef Table 25mm Steel & Plasma Downdraft */}
      <ArtisanTeppanyakiChefTableVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Live-Edge Parquet Flooring 220mm Osmo Wax Vault */}
      <ArtisanLiveEdgeParquetFlooringVault className="mt-[var(--spacing-section)]" />

      {/* Monolithic Calacatta Borghini Chef Island 2.2T Vault */}
      <MonolithicCalacattaMarbleChefIslandVault className="mt-[var(--spacing-section)]" />

      {/* Private Art Collection Museum Optical Glass Vault */}
      <PrivateArtCollectionMuseumVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Red Quartz Hourglass 60m ASMR Sound Vault */}
      <ArtisanQuartzHourglassVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Breeze Pentatonic Bronze Wind Chime Atelier */}
      <SaigonBreezeWindChimeArtisanAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Basalt Cold Plunge 3C Monolith Vault */}
      <ArtisanBasaltColdPlungeVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Helical Ribbon Staircase White Oak Vault */}
      <ArtisanHelicalRibbonStaircaseVault className="mt-[var(--spacing-section)]" />

      {/* Collector Automotive Cleanroom +20Pa Barrisol Vault */}
      <CollectorAutomotiveCleanroomVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Audiophile Vinyl Sanctuary RT60 0.35s Vault */}
      <SaigonAudiophileVinylSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Outdoor Fire Pit Sunken Lounge Vault */}
      <SaigonRiversideOutdoorFirePitVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Floating Orchid Zero-Gravity Cable Atelier */}
      <SaigonFloatingOrchidAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Sunken Koi Aquarium Walk-On Glass 32mm Vault */}
      <ArtisanSunkenKoiAquariumVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Agarwood Tea Bespoke Vault Nero Marquina 5 Temp */}
      <SaigonAgarwoodTeaBespokeVault className="mt-[var(--spacing-section)]" />

      {/* Private Saltwater Nano Reef Sanctuary 19mm Low-Iron */}
      <PrivateSaltwaterNanoReefSanctuary className="mt-[var(--spacing-section)]" />
    </div>
  )
}
