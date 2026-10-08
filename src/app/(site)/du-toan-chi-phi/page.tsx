import type { Metadata } from 'next'
import Link from 'next/link'
import { SpatialBudgetCalculator } from '@/components/sections/SpatialBudgetCalculator'
import { TactileMaterialLab } from '@/components/sections/TactileMaterialLab'
import { TenEngineeringNormsSection } from '@/components/sections/TenEngineeringNormsSection'
import { WesternSolarHeatCalculator } from '@/components/tools/WesternSolarHeatCalculator'
import { DigitalHandoverVault } from '@/components/services/DigitalHandoverVault'
import { BespokeCabinetryStudio } from '@/components/studio/BespokeCabinetryStudio'
import { ContractorComparisonMatrix } from '@/components/sections/ContractorComparisonMatrix'
import { TropicalFengShuiCompass } from '@/components/tools/TropicalFengShuiCompass'
import { TropicalHvacAirflowSimulator } from '@/components/tools/TropicalHvacAirflowSimulator'
import { SmartHomeQuietSanctuary } from '@/components/sections/SmartHomeQuietSanctuary'
import { KilnMoistureDiary } from '@/components/studio/KilnMoistureDiary'
import { BespokeFurnitureCustomizer } from '@/components/tools/BespokeFurnitureCustomizer'
import { VipConciergePortal } from '@/components/consultation/VipConciergePortal'
import { LightingAtelierCustomizer } from '@/components/studio/LightingAtelierCustomizer'
import { KeyHandoverRitualVault } from '@/components/sections/KeyHandoverRitualVault'
import { SubfloorAcousticMoistureShield } from '@/components/studio/SubfloorAcousticMoistureShield'
import { EstateRenovationDiagnostic } from '@/components/tools/EstateRenovationDiagnostic'
import { ChefIslandPlumbingVault } from '@/components/studio/ChefIslandPlumbingVault'
import { CashflowMilestoneScheduler } from '@/components/tools/CashflowMilestoneScheduler'
import { BespokeTimberCareVault } from '@/components/tools/BespokeTimberCareVault'
import { SommelierWineCigarVault } from '@/components/studio/SommelierWineCigarVault'
import { LeadArchitectPrivateSession } from '@/components/consultation/LeadArchitectPrivateSession'
import { PatinaMetalworkArtisanLab } from '@/components/studio/PatinaMetalworkArtisanLab'
import { DigitalTwinEstateAudit } from '@/components/tools/DigitalTwinEstateAudit'
import { BespokeWalkInWardrobeVault } from '@/components/studio/BespokeWalkInWardrobeVault'
import { ArtisanCraftsmanPassport } from '@/components/tools/ArtisanCraftsmanPassport'
import { ConciergeWhiteGloveMovingAudit } from '@/components/tools/ConciergeWhiteGloveMovingAudit'
import { HandcraftedLacquerArtisanAtelier } from '@/components/studio/HandcraftedLacquerArtisanAtelier'
import { PrivateFamilyArchiveVault } from '@/components/tools/PrivateFamilyArchiveVault'
import { BespokeAcousticHomeCinemaLab } from '@/components/studio/BespokeAcousticHomeCinemaLab'
import { ArtisanHandmadeRugStudio } from '@/components/tools/ArtisanHandmadeRugStudio'
import { HandCarvedStoneFireplaceVault } from '@/components/studio/HandCarvedStoneFireplaceVault'
import { PrivateYachtBerthAndHelipadConcierge } from '@/components/tools/PrivateYachtBerthAndHelipadConcierge'
import { ArtisanHandCastBronzeBasinVault } from '@/components/studio/ArtisanHandCastBronzeBasinVault'
import { MasterArchitecturalDossierArchive } from '@/components/tools/MasterArchitecturalDossierArchive'
import { BespokeOlfactoryFragranceAtelier } from '@/components/studio/BespokeOlfactoryFragranceAtelier'
import { PrivateEstateDigitalButlerPortal } from '@/components/tools/PrivateEstateDigitalButlerPortal'
import { ArtisanHorologyGrandfatherClockVault } from '@/components/studio/ArtisanHorologyGrandfatherClockVault'
import { ArtisanShanTuyetTeaSanctuary } from '@/components/tools/ArtisanShanTuyetTeaSanctuary'
import { ArtisanTeppanyakiChefTableVault } from '@/components/studio/ArtisanTeppanyakiChefTableVault'
import { ArtisanHinokiVolcanicSaunaSanctuary } from '@/components/tools/ArtisanHinokiVolcanicSaunaSanctuary'
import { MonolithicCalacattaMarbleChefIslandVault } from '@/components/studio/MonolithicCalacattaMarbleChefIslandVault'
import { RiversideDawnZenYogaPavilion } from '@/components/tools/RiversideDawnZenYogaPavilion'
import { ArtisanQuartzHourglassVault } from '@/components/studio/ArtisanQuartzHourglassVault'
import { RiversideCigarLoungeAndHumidorSanctuary } from '@/components/tools/RiversideCigarLoungeAndHumidorSanctuary'
import { ArtisanBasaltColdPlungeVault } from '@/components/studio/ArtisanBasaltColdPlungeVault'
import { PrivateFamilySanctuaryPanicRoom } from '@/components/tools/PrivateFamilySanctuaryPanicRoom'
import { CollectorAutomotiveCleanroomVault } from '@/components/studio/CollectorAutomotiveCleanroomVault'
import { ArtisanBotanicalCurtainAtelier } from '@/components/tools/ArtisanBotanicalCurtainAtelier'
import { SaigonRiversideOutdoorFirePitVault } from '@/components/studio/SaigonRiversideOutdoorFirePitVault'
import { PrivateHimalayanSaltCaveWellnessVault } from '@/components/tools/PrivateHimalayanSaltCaveWellnessVault'
import { ArtisanSunkenKoiAquariumVault } from '@/components/studio/ArtisanSunkenKoiAquariumVault'
import { ArtisanMarbleSundialGardenVault } from '@/components/tools/ArtisanMarbleSundialGardenVault'
import { PrivateSaltwaterNanoReefSanctuary } from '@/components/studio/PrivateSaltwaterNanoReefSanctuary'
import { ArtisanDamascusSteelChefKnifeAtelier } from '@/components/tools/ArtisanDamascusSteelChefKnifeAtelier'
import { ArtisanMotherOfPearlChessPavilion } from '@/components/studio/ArtisanMotherOfPearlChessPavilion'
import { ArtisanRiverPebbleAcupressureWalkway } from '@/components/tools/ArtisanRiverPebbleAcupressureWalkway'
import { HorologyTimepieceAndCigarVault } from '@/components/studio/HorologyTimepieceAndCigarVault'
import { SaigonMangroveBoutiqueEcologyLab } from '@/components/tools/SaigonMangroveBoutiqueEcologyLab'
import { ArtisanBaccaratCrystalChandelierAtelier } from '@/components/studio/ArtisanBaccaratCrystalChandelierAtelier'
import { PrivateWhiskyLibraryAndCaskVault } from '@/components/tools/PrivateWhiskyLibraryAndCaskVault'
import { ArtisanHinokiHydrotherapyOnsenVault } from '@/components/studio/ArtisanHinokiHydrotherapyOnsenVault'
import { ArtisanIndoorMedicinalHerbGardenAtelier } from '@/components/tools/ArtisanIndoorMedicinalHerbGardenAtelier'
import { SaigonAcousticPianoGrandSalon } from '@/components/studio/SaigonAcousticPianoGrandSalon'
import { ArtisanBronzeBonsaiWaterFeatureAtelier } from '@/components/tools/ArtisanBronzeBonsaiWaterFeatureAtelier'
import { SaigonArtisanLacquerwareGallerySanctuary } from '@/components/studio/SaigonArtisanLacquerwareGallerySanctuary'
import { ArtisanJapaneseTatamiChashitsuTeaAtelier } from '@/components/tools/ArtisanJapaneseTatamiChashitsuTeaAtelier'
import { SaigonRainwaterCascadeAtriumSanctuary } from '@/components/studio/SaigonRainwaterCascadeAtriumSanctuary'
import { ArtisanGoldLeafCalligraphyCabinetryAtelier } from '@/components/tools/ArtisanGoldLeafCalligraphyCabinetryAtelier'
import { SaigonFloatingInfinityDaybedPavilion } from '@/components/studio/SaigonFloatingInfinityDaybedPavilion'
import { ArtisanBronzeIncenseBurnerAtelier } from '@/components/tools/ArtisanBronzeIncenseBurnerAtelier'
import { SaigonBespokeAudiophileTurntableVault } from '@/components/studio/SaigonBespokeAudiophileTurntableVault'
import { ArtisanHandmadeTerracottaPlanterAtelier } from '@/components/tools/ArtisanHandmadeTerracottaPlanterAtelier'
import { SaigonAcousticHarpSanctuarySalon } from '@/components/studio/SaigonAcousticHarpSanctuarySalon'
import { ArtisanGoldLeafTeaCanisterAtelier } from '@/components/tools/ArtisanGoldLeafTeaCanisterAtelier'
import { SaigonRiversideSunsetTeaObservatory } from '@/components/studio/SaigonRiversideSunsetTeaObservatory'
import { ArtisanBespokeSilverCutleryVault } from '@/components/tools/ArtisanBespokeSilverCutleryVault'
import { SaigonArtisanBespokeLoomSilkPavilion } from '@/components/studio/SaigonArtisanBespokeLoomSilkPavilion'
import { ArtisanBronzeWindGongSanctuaryAtelier } from '@/components/tools/ArtisanBronzeWindGongSanctuaryAtelier'
import { SaigonRiversideTeaRoastingAtelier } from '@/components/studio/SaigonRiversideTeaRoastingAtelier'
import { ArtisanBronzeIncenseSealSanctuary } from '@/components/tools/ArtisanBronzeIncenseSealSanctuary'
import { SaigonRiversideHerbalSteamPavilion } from '@/components/studio/SaigonRiversideHerbalSteamPavilion'
import { ArtisanBronzeIncenseFurnaceVault } from '@/components/tools/ArtisanBronzeIncenseFurnaceVault'
import { ArtisanGiaDinhCeramicKilnCourtyardSanctuary } from '@/components/studio/ArtisanGiaDinhCeramicKilnCourtyardSanctuary'
import { ArtisanHandmadeDamascusCleaverCulinaryAtelier } from '@/components/tools/ArtisanHandmadeDamascusCleaverCulinaryAtelier'
import { SaigonHeritageAncientBrickCourtyardPavilion } from '@/components/studio/SaigonHeritageAncientBrickCourtyardPavilion'
import { ArtisanImperialSilverChasedTeapotAtelier } from '@/components/tools/ArtisanImperialSilverChasedTeapotAtelier'
import { Label } from '@/components/ui/Label'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Dự Toán Chi Phí Nội Thất',
  description:
    'Công cụ bóc tách dự toán nội thất từng mét vuông căn hộ, nhà phố và biệt thự tại TP. Hồ Chí Minh. Tính toán minh bạch, bóc tách theo phòng và không phát sinh chi phí từ xưởng mộc GuHomes.',
  path: '/du-toan-chi-phi',
})

export default function DuToanChiPhiPage() {
  return (
    <div className="pb-[var(--spacing-section)]">
      {/* Page Header Banner */}
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)] pb-12 bg-surface border-b border-line/60">
        <div className="mx-auto w-full max-w-[110rem]">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-ink">Dự toán chi phí</span>
          </nav>

          <Label rule index="01" tone="accent">
            Dự toán minh bạch
          </Label>

          <h1 className="u-display mt-8 max-w-[20ch] text-ink">
            Biết trước chi phí, an tâm tạo tác tổ ấm.
          </h1>

          <p className="u-body-lg mt-6 max-w-[56ch] text-muted">
            Tại GuHomes, chúng tôi tin rằng một không gian đẹp bắt đầu từ sự trung thực tài chính. Bảng tính dưới đây giúp bạn bóc tách khối lượng thi công thực tế cho từng phòng, từ cốt thô vi khí hậu đến nội thất may đo tại xưởng mộc gia truyền.
          </p>
        </div>
      </section>

      {/* Main Interactive Spatial Budget Calculator */}
      <SpatialBudgetCalculator />

      {/* Bespoke Millwork & Cabinetry Studio */}
      <BespokeCabinetryStudio className="mt-[var(--spacing-section)]" />

      {/* Material Exploration */}
      <div className="mt-[var(--spacing-section)]">
        <TactileMaterialLab />
      </div>

      {/* 10 Engineering Norms Manifesto */}
      <TenEngineeringNormsSection className="mt-[var(--spacing-section)]" />

      {/* Contractor Capability & Truth Comparison Matrix */}
      <ContractorComparisonMatrix className="mt-[var(--spacing-section)]" />

      {/* Western Solar Heat Radiation Calculator */}
      <WesternSolarHeatCalculator className="mt-[var(--spacing-section)]" />

      {/* Tropical Feng Shui & Microclimate Compass */}
      <TropicalFengShuiCompass className="mt-[var(--spacing-section)]" />

      {/* Tropical HVAC & Anti-Condensation VRV Simulator */}
      <TropicalHvacAirflowSimulator className="mt-[var(--spacing-section)]" />

      {/* Invisible KNX Smart Home Sanctuary */}
      <SmartHomeQuietSanctuary className="mt-[var(--spacing-section)]" />

      {/* Vacuum Kiln & Wood Moisture Balancing Diary */}
      <KilnMoistureDiary className="mt-[var(--spacing-section)]" />

      {/* Bespoke Handcrafted Furniture Customizer */}
      <BespokeFurnitureCustomizer className="mt-[var(--spacing-section)]" />

      {/* Digital Handover & Warranty Vault */}
      <DigitalHandoverVault className="mt-[var(--spacing-section)]" />

      {/* VIP Concierge Access Portal & Digital VIP Card */}
      <VipConciergePortal className="mt-[var(--spacing-section)]" />

      {/* Bespoke Handcrafted Lighting Atelier Customizer */}
      <LightingAtelierCustomizer className="mt-[var(--spacing-section)]" />

      {/* Handover Ritual & Digital Warranty Vault */}
      <KeyHandoverRitualVault className="mt-[var(--spacing-section)]" />

      {/* Subfloor Acoustic & Moisture Shield System */}
      <SubfloorAcousticMoistureShield className="mt-[var(--spacing-section)]" />

      {/* Estate Renovation Diagnostic & Cost Estimator */}
      <EstateRenovationDiagnostic className="mt-[var(--spacing-section)]" />

      {/* Chef Island Monolithic Stone & MEP Plumbing Vault */}
      <ChefIslandPlumbingVault className="mt-[var(--spacing-section)]" />

      {/* Cashflow Milestones & 6-Stage Verification Scheduler */}
      <CashflowMilestoneScheduler className="mt-[var(--spacing-section)]" />

      {/* Bespoke Timber Care & White-Glove VIP Maintenance Vault */}
      <BespokeTimberCareVault className="mt-[var(--spacing-section)]" />

      {/* Sommelier Wine & Cigar Microclimate Vault */}
      <SommelierWineCigarVault className="mt-[var(--spacing-section)]" />

      {/* 1-on-1 Lead Architect Private Session */}
      <LeadArchitectPrivateSession className="mt-[var(--spacing-section)]" />

      {/* Living Metal Patina Artisan Lab */}
      <PatinaMetalworkArtisanLab className="mt-[var(--spacing-section)]" />

      {/* Digital Twin Estate Audit 3D LiDAR */}
      <DigitalTwinEstateAudit className="mt-[var(--spacing-section)]" />

      {/* Bespoke Walk-in Wardrobe Vault Agarwood */}
      <BespokeWalkInWardrobeVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Craftsman Passport NFC Provenance */}
      <ArtisanCraftsmanPassport className="mt-[var(--spacing-section)]" />

      {/* Concierge White-Glove Moving & Installation Audit */}
      <ConciergeWhiteGloveMovingAudit className="mt-[var(--spacing-section)]" />

      {/* Handcrafted Lacquer Artisan Atelier Bát Tràng x Thạnh Xuân */}
      <HandcraftedLacquerArtisanAtelier className="mt-[var(--spacing-section)]" />

      {/* Private Family Archive Vault 1000C Fireproof */}
      <PrivateFamilyArchiveVault className="mt-[var(--spacing-section)]" />

      {/* Bespoke Acoustic Home Cinema Lab THX & Dolby Atmos */}
      <BespokeAcousticHomeCinemaLab className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Lotus Silk & Wool Rug Studio */}
      <ArtisanHandmadeRugStudio className="mt-[var(--spacing-section)]" />

      {/* Hand-carved Stone Fireplace Vault 3D Mist & Agarwood */}
      <HandCarvedStoneFireplaceVault className="mt-[var(--spacing-section)]" />

      {/* Private Yacht Berth & Sky Helipad Concierge */}
      <PrivateYachtBerthAndHelipadConcierge className="mt-[var(--spacing-section)]" />

      {/* Artisan Hand-carved Basalt Stone & Bronze Basin Vault */}
      <ArtisanHandCastBronzeBasinVault className="mt-[var(--spacing-section)]" />

      {/* Master Architectural Dossier Archive A3 Leather Folio */}
      <MasterArchitecturalDossierArchive className="mt-[var(--spacing-section)]" />

      {/* Bespoke Olfactory Cold-Air Nebulization Fragrance Atelier */}
      <BespokeOlfactoryFragranceAtelier className="mt-[var(--spacing-section)]" />

      {/* Private Estate Digital Butler Local Edge Portal */}
      <PrivateEstateDigitalButlerPortal className="mt-[var(--spacing-section)]" />

      {/* Artisan Haute Horology Grandfather Clock 432Hz Vault */}
      <ArtisanHorologyGrandfatherClockVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Shan Tuyet Tea Sanctuary & Zisha Pottery Pavilion */}
      <ArtisanShanTuyetTeaSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Teppanyaki Chef Table 25mm Steel & Plasma Downdraft */}
      <ArtisanTeppanyakiChefTableVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Hinoki Volcanic Stone Bio-Sauna Sanctuary */}
      <ArtisanHinokiVolcanicSaunaSanctuary className="mt-[var(--spacing-section)]" />

      {/* Monolithic Calacatta Borghini Chef Island 2.2T Vault */}
      <MonolithicCalacattaMarbleChefIslandVault className="mt-[var(--spacing-section)]" />

      {/* Riverside Dawn Zen Yoga & 528Hz Singing Bowl Pavilion */}
      <RiversideDawnZenYogaPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Red Quartz Hourglass 60m ASMR Sound Vault */}
      <ArtisanQuartzHourglassVault className="mt-[var(--spacing-section)]" />

      {/* Riverside Cigar Lounge Negative-Pressure & Humidor */}
      <RiversideCigarLoungeAndHumidorSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Basalt Cold Plunge 3C Monolith Vault */}
      <ArtisanBasaltColdPlungeVault className="mt-[var(--spacing-section)]" />

      {/* Private Family Sanctuary Panic Room 72h CBRN */}
      <PrivateFamilySanctuaryPanicRoom className="mt-[var(--spacing-section)]" />

      {/* Collector Automotive Cleanroom +20Pa Barrisol Vault */}
      <CollectorAutomotiveCleanroomVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Botanical Silk Curtain Atelier 6m Somfy */}
      <ArtisanBotanicalCurtainAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Outdoor Fire Pit Sunken Lounge Vault */}
      <SaigonRiversideOutdoorFirePitVault className="mt-[var(--spacing-section)]" />

      {/* Private Himalayan Salt Cave Halotherapy Wellness Vault */}
      <PrivateHimalayanSaltCaveWellnessVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Sunken Koi Aquarium Walk-On Glass 32mm Vault */}
      <ArtisanSunkenKoiAquariumVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Marble Sundial Yen Bai 10.7769N Garden Vault */}
      <ArtisanMarbleSundialGardenVault className="mt-[var(--spacing-section)]" />

      {/* Private Saltwater Nano Reef Sanctuary 19mm Low-Iron */}
      <PrivateSaltwaterNanoReefSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Damascus Steel Chef Knife 128 Layers Atelier */}
      <ArtisanDamascusSteelChefKnifeAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Mother of Pearl Mun Wood Chess Pavilion */}
      <ArtisanMotherOfPearlChessPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan River Pebble Acupressure Infrared Walkway */}
      <ArtisanRiverPebbleAcupressureWalkway className="mt-[var(--spacing-section)]" />

      {/* Horology Timepiece Tourbillon & Cigar Spanish Cedar Vault */}
      <HorologyTimepieceAndCigarVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Mangrove Boutique Ecology Atrium Tidal Lab */}
      <SaigonMangroveBoutiqueEcologyLab className="mt-[var(--spacing-section)]" />

      {/* Artisan Baccarat Crystal Chandelier Winch Atelier */}
      <ArtisanBaccaratCrystalChandelierAtelier className="mt-[var(--spacing-section)]" />

      {/* Private Whisky Library American Oak Cask Vault */}
      <PrivateWhiskyLibraryAndCaskVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Hinoki Hydrotherapy Onsen 250y Vault */}
      <ArtisanHinokiHydrotherapyOnsenVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Indoor Medicinal Herb Garden Bat Trang Atelier */}
      <ArtisanIndoorMedicinalHerbGardenAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Piano Grand Salon Steinway Mun Wood */}
      <SaigonAcousticPianoGrandSalon className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Bonsai Water Feature Waterfall Atelier */}
      <ArtisanBronzeBonsaiWaterFeatureAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Artisan Lacquerware Gallery 18 Steps Sanctuary */}
      <SaigonArtisanLacquerwareGallerySanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Japanese Tatami Chashitsu Dinh Yen Tea Atelier */}
      <ArtisanJapaneseTatamiChashitsuTeaAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Rainwater Cascade Atrium Kusari Toi Sanctuary */}
      <SaigonRainwaterCascadeAtriumSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Gold Leaf Calligraphy Cabinetry Atelier */}
      <ArtisanGoldLeafCalligraphyCabinetryAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Floating Infinity Daybed 600kg Pavilion */}
      <SaigonFloatingInfinityDaybedPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Incense Burner Atelier */}
      <ArtisanBronzeIncenseBurnerAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Audiophile Turntable Basalt Vault */}
      <SaigonBespokeAudiophileTurntableVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Terracotta Planter Atelier */}
      <ArtisanHandmadeTerracottaPlanterAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Harp Sanctuary Salon */}
      <SaigonAcousticHarpSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Artisan Gold Leaf Tea Canister Atelier */}
      <ArtisanGoldLeafTeaCanisterAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Sunset Tea Observatory */}
      <SaigonRiversideSunsetTeaObservatory className="mt-[var(--spacing-section)]" />

      {/* Artisan Bespoke Silver Cutlery Vault */}
      <ArtisanBespokeSilverCutleryVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Artisan Bespoke Loom Silk Pavilion */}
      <SaigonArtisanBespokeLoomSilkPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Wind Gong Sanctuary Atelier */}
      <ArtisanBronzeWindGongSanctuaryAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Tea Roasting Atelier */}
      <SaigonRiversideTeaRoastingAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Incense Seal Sanctuary */}
      <ArtisanBronzeIncenseSealSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Herbal Steam Pavilion */}
      <SaigonRiversideHerbalSteamPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Incense Furnace Vault */}
      <ArtisanBronzeIncenseFurnaceVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Gia Dinh Ceramic Kiln Courtyard Sanctuary */}
      <ArtisanGiaDinhCeramicKilnCourtyardSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Damascus Cleaver Culinary Atelier */}
      <ArtisanHandmadeDamascusCleaverCulinaryAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Heritage Ancient Brick Courtyard Pavilion */}
      <SaigonHeritageAncientBrickCourtyardPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Imperial Silver Chased Teapot Atelier */}
      <ArtisanImperialSilverChasedTeapotAtelier className="mt-[var(--spacing-section)]" />
    </div>
  )
}
