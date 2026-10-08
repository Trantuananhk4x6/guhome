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
import { ArtisanSaigonRiverboatWoodCraftSanctuary } from '@/components/studio/ArtisanSaigonRiverboatWoodCraftSanctuary'
import { ArtisanGoldFiligreeJewelryAndCasketAtelier } from '@/components/tools/ArtisanGoldFiligreeJewelryAndCasketAtelier'
import { ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary } from '@/components/studio/ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary'
import { ArtisanHandmadeHornAndTortoiseshellCombAtelier } from '@/components/tools/ArtisanHandmadeHornAndTortoiseshellCombAtelier'
import { ArtisanSaigonMonolithicBasaltOutdoorPlungePool } from '@/components/studio/ArtisanSaigonMonolithicBasaltOutdoorPlungePool'
import { ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier } from '@/components/tools/ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier'
import { ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary } from '@/components/studio/ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary'
import { ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier } from '@/components/tools/ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier'
import { ArtisanSaigonMonolithicQuartzCrystalWaterfallVault } from '@/components/studio/ArtisanSaigonMonolithicQuartzCrystalWaterfallVault'
import { ArtisanHandmadeCloisonneEnamelTeaSetAtelier } from '@/components/tools/ArtisanHandmadeCloisonneEnamelTeaSetAtelier'
import { SaigonTranslucentOnyxWaterfallSanctuary } from '@/components/studio/SaigonTranslucentOnyxWaterfallSanctuary'
import { ArtisanMotherOfPearlJewelryCasketAtelier } from '@/components/tools/ArtisanMotherOfPearlJewelryCasketAtelier'
import { SaigonAcousticTraditionalLuteSanctuary } from '@/components/studio/SaigonAcousticTraditionalLuteSanctuary'
import { ArtisanRattanCoreLacquerTeaCaddyAtelier } from '@/components/tools/ArtisanRattanCoreLacquerTeaCaddyAtelier'
import { SaigonSunkenBonsaiAtriumSanctuary } from '@/components/studio/SaigonSunkenBonsaiAtriumSanctuary'
import { ArtisanPureSilverAgarwoodSnuffBottleAtelier } from '@/components/tools/ArtisanPureSilverAgarwoodSnuffBottleAtelier'
import { SaigonVolcanicSlateMineralPoolPavilion } from '@/components/studio/SaigonVolcanicSlateMineralPoolPavilion'
import { ArtisanDuanniZishaTeapotAtelier } from '@/components/tools/ArtisanDuanniZishaTeapotAtelier'
import { SaigonSkyJungleBiofilterConservatory } from '@/components/studio/SaigonSkyJungleBiofilterConservatory'
import { ArtisanRattanSilverWineSetVault } from '@/components/tools/ArtisanRattanSilverWineSetVault'
import { SaigonBioNaturalEcoPoolSanctuary } from '@/components/studio/SaigonBioNaturalEcoPoolSanctuary'
import { ArtisanHoangDanBrassInlayTeaTrayVault } from '@/components/tools/ArtisanHoangDanBrassInlayTeaTrayVault'
import { SaigonWildOrchidMicroclimatePavilion } from '@/components/studio/SaigonWildOrchidMicroclimatePavilion'
import { ArtisanBatTrangHoneyGlazeTeaBowlVault } from '@/components/tools/ArtisanBatTrangHoneyGlazeTeaBowlVault'
import { SaigonCanalSideMangroveCharcoalCourtyard } from '@/components/studio/SaigonCanalSideMangroveCharcoalCourtyard'
import { ArtisanSilverInlaidEbonyChopsticksAtelier } from '@/components/tools/ArtisanSilverInlaidEbonyChopsticksAtelier'
import { SaigonBespokeLotusLeafPondTeaPavilion } from '@/components/studio/SaigonBespokeLotusLeafPondTeaPavilion'
import { ArtisanSilverChasedArecaNutCasketAtelier } from '@/components/tools/ArtisanSilverChasedArecaNutCasketAtelier'
import { SaigonCanalSideAncientWellCourtyardSanctuary } from '@/components/studio/SaigonCanalSideAncientWellCourtyardSanctuary'
import { ArtisanHandmadeHornSnuffBottleVault } from '@/components/tools/ArtisanHandmadeHornSnuffBottleVault'
import { SaigonHeritageTerracottaTileCourtyardPavilion } from '@/components/studio/SaigonHeritageTerracottaTileCourtyardPavilion'
import { ArtisanHandmadeCloisonneIncenseBurnerVault } from '@/components/tools/ArtisanHandmadeCloisonneIncenseBurnerVault'
import { SaigonMonolithicBiotiteGraniteFireplaceLounge } from '@/components/studio/SaigonMonolithicBiotiteGraniteFireplaceLounge'
import { ArtisanGoldLeafLacquerTeaTrayAtelier } from '@/components/tools/ArtisanGoldLeafLacquerTeaTrayAtelier'
import { SaigonCanalSideGlassBottomKoiCourtyard } from '@/components/studio/SaigonCanalSideGlassBottomKoiCourtyard'
import { ArtisanHornMotherOfPearlJewelryChestAtelier } from '@/components/tools/ArtisanHornMotherOfPearlJewelryChestAtelier'
import { SaigonRiversideTerracedHerbalOrchardPavilion } from '@/components/studio/SaigonRiversideTerracedHerbalOrchardPavilion'
import { ArtisanImperialSilverAgarwoodTeaCaddyAtelier } from '@/components/tools/ArtisanImperialSilverAgarwoodTeaCaddyAtelier'
import { SaigonCanalSideFloatingBambooTeaPavilion } from '@/components/studio/SaigonCanalSideFloatingBambooTeaPavilion'
import { ArtisanGoldDamasceneEbonyTobaccoPipeAtelier } from '@/components/tools/ArtisanGoldDamasceneEbonyTobaccoPipeAtelier'
import { SaigonRiversideCantileveredBonsaiPavilion } from '@/components/studio/SaigonRiversideCantileveredBonsaiPavilion'
import { ArtisanMotherOfPearlInlaidEbonyChessboardAtelier } from '@/components/tools/ArtisanMotherOfPearlInlaidEbonyChessboardAtelier'
import { SaigonCanalSideFloatingOrchidSanctuaryPavilion } from '@/components/studio/SaigonCanalSideFloatingOrchidSanctuaryPavilion'
import { ArtisanGoldDamasceneEbonyGuanGongStatueAtelier } from '@/components/tools/ArtisanGoldDamasceneEbonyGuanGongStatueAtelier'
import { SaigonRiverfrontGlassFloorObservatoryPavilion } from '@/components/studio/SaigonRiverfrontGlassFloorObservatoryPavilion'
import { ArtisanSilverInlaidAgarwoodMaitreyaStatueAtelier } from '@/components/tools/ArtisanSilverInlaidAgarwoodMaitreyaStatueAtelier'
import { SaigonAcousticDjembeSanctuarySalon } from '@/components/studio/SaigonAcousticDjembeSanctuarySalon'
import { SaigonCanalSideFloatingTeakMeditationDock } from '@/components/studio/SaigonCanalSideFloatingTeakMeditationDock'
import { ArtisanGoldLeafDamasceneEbonyBodhidharmaStatueAtelier } from '@/components/tools/ArtisanGoldLeafDamasceneEbonyBodhidharmaStatueAtelier'
import { SaigonMonsoonRainChamberHydroAcousticPavilion } from '@/components/studio/SaigonMonsoonRainChamberHydroAcousticPavilion'
import { BespokeSmokedOakAromaCigarLoungeAndWhiskyVault } from '@/components/studio/BespokeSmokedOakAromaCigarLoungeAndWhiskyVault'
import { ImperialVietnameseMotherOfPearlRosewoodCabinetAtelier } from '@/components/tools/ImperialVietnameseMotherOfPearlRosewoodCabinetAtelier'
import { SaigonBreezeTeakwoodWindLouverCourtyardPavilion } from '@/components/studio/SaigonBreezeTeakwoodWindLouverCourtyardPavilion'
import { BespokeImperialAgarwoodAndGoldLeafIncenseShrineVault } from '@/components/studio/BespokeImperialAgarwoodAndGoldLeafIncenseShrineVault'
import { ArtisanHandmadeHornAndGoldInlaidGroomingChestAtelier } from '@/components/tools/ArtisanHandmadeHornAndGoldInlaidGroomingChestAtelier'
import { SaigonRiversideHydroponicAromaticHerbSanctuary } from '@/components/studio/SaigonRiversideHydroponicAromaticHerbSanctuary'
import { BespokePetrifiedWoodAndBrassWineBarTastingLounge } from '@/components/studio/BespokePetrifiedWoodAndBrassWineBarTastingLounge'
import { ArtisanVietnameseImperialSilkAndEbonyFoldingScreenAtelier } from '@/components/tools/ArtisanVietnameseImperialSilkAndEbonyFoldingScreenAtelier'
import { SaigonBreezeBambooWindChimeSanctuarySalon } from '@/components/studio/SaigonBreezeBambooWindChimeSanctuarySalon'
import { BespokeSmokedOakZenTeaHouseAndTatamiSanctuary } from '@/components/studio/BespokeSmokedOakZenTeaHouseAndTatamiSanctuary'
import { ArtisanSilverInlaidAgarwoodCalligraphyBrushVault } from '@/components/tools/ArtisanSilverInlaidAgarwoodCalligraphyBrushVault'
import { SaigonCanalSideFloatingLotusTeaPavilion } from '@/components/studio/SaigonCanalSideFloatingLotusTeaPavilion'
import { BespokeSmokedAgarwoodAndOnyxMeditationVault } from '@/components/studio/BespokeSmokedAgarwoodAndOnyxMeditationVault'
import { ArtisanHandmadeTortoiseshellAndGoldCalligraphyCaseAtelier } from '@/components/tools/ArtisanHandmadeTortoiseshellAndGoldCalligraphyCaseAtelier'
import { SaigonCanalSideAncientTeakwoodBonsaiMoatPavilion } from '@/components/studio/SaigonCanalSideAncientTeakwoodBonsaiMoatPavilion'
import { BespokeImperialAgarwoodAndBrassScentAltarVault } from '@/components/studio/BespokeImperialAgarwoodAndBrassScentAltarVault'
import { ArtisanHandmadeGoldFiligreeAndJadeSnuffBottleAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeSnuffBottleAtelier'
import { SaigonCanalSideAncientJackfruitWoodBonsaiSanctuary } from '@/components/studio/SaigonCanalSideAncientJackfruitWoodBonsaiSanctuary'
import { BespokeImperialKynamIncenseAltarAndBrassVault } from '@/components/studio/BespokeImperialKynamIncenseAltarAndBrassVault'
import { ArtisanHandmadeGoldLeafEbonyTeaBoxAtelier } from '@/components/tools/ArtisanHandmadeGoldLeafEbonyTeaBoxAtelier'
import { SaigonCanalSideAncientRosewoodBonsaiWaterFeatureSanctuary } from '@/components/studio/SaigonCanalSideAncientRosewoodBonsaiWaterFeatureSanctuary'
import { BespokeImperialKynamAndGoldLeafScentVault } from '@/components/studio/BespokeImperialKynamAndGoldLeafScentVault'
import { ArtisanHandmadeGoldLeafEbonyCalligraphyBrushAtelier } from '@/components/tools/ArtisanHandmadeGoldLeafEbonyCalligraphyBrushAtelier'
import { SaigonRiverfrontAncientDalbergiaTeaBonsaiPavilion } from '@/components/studio/SaigonRiverfrontAncientDalbergiaTeaBonsaiPavilion'
import { BespokeImperialKynamAndSilverFiligreeScentChamber } from '@/components/studio/BespokeImperialKynamAndSilverFiligreeScentChamber'
import { ArtisanHandmadeGoldFiligreeAndOnyxCalligraphyInkstoneAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndOnyxCalligraphyInkstoneAtelier'
import { SaigonCanalSideAncientSandalwoodTeaPavilion } from '@/components/studio/SaigonCanalSideAncientSandalwoodTeaPavilion'
import { BespokeImperialKynamAndGoldInlaidTeaChestVault } from '@/components/studio/BespokeImperialKynamAndGoldInlaidTeaChestVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperAtelier'
import { SaigonCanalSideAncientHingedTeakLouverTeaPavilion } from '@/components/studio/SaigonCanalSideAncientHingedTeakLouverTeaPavilion'
import { BespokeImperialKynamAndGoldLeafScentCasketVault } from '@/components/studio/BespokeImperialKynamAndGoldLeafScentCasketVault'
import { ArtisanHandmadeGoldFiligreeAndRosewoodCalligraphyRulerAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndRosewoodCalligraphyRulerAtelier'
import { SaigonCanalSideAncientRosewoodMoatTeaPavilion } from '@/components/studio/SaigonCanalSideAncientRosewoodMoatTeaPavilion'
import { BespokeImperialKynamAndSilverFiligreeIncenseVault } from '@/components/studio/BespokeImperialKynamAndSilverFiligreeIncenseVault'
import { ArtisanHandmadeGoldFiligreeAndEbonyCalligraphySealAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndEbonyCalligraphySealAtelier'
import { SaigonCanalSideAncientTeakwoodLotusPondTeaPavilion } from '@/components/studio/SaigonCanalSideAncientTeakwoodLotusPondTeaPavilion'
import { BespokeImperialKynamAndGoldInlaidIncenseChestVault } from '@/components/studio/BespokeImperialKynamAndGoldInlaidIncenseChestVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestAtelier'
import { SaigonCanalSideAncientCypressTeaBonsaiPavilion } from '@/components/studio/SaigonCanalSideAncientCypressTeaBonsaiPavilion'
import { BespokeImperialKynamAndSilverChasedIncenseVault } from '@/components/studio/BespokeImperialKynamAndSilverChasedIncenseVault'
import { ArtisanHandmadeGoldFiligreeAndRosewoodPaperweightBarAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndRosewoodPaperweightBarAtelier'
import { SaigonCanalSideAncientSandstoneLotusMoatPavilion } from '@/components/studio/SaigonCanalSideAncientSandstoneLotusMoatPavilion'
import { BespokeImperialKynamAndGoldRepousseTeaChestVault } from '@/components/studio/BespokeImperialKynamAndGoldRepousseTeaChestVault'
import { ArtisanHandmadeGoldFiligreeAndJadeWaterDropperStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeWaterDropperStudio'
import { SaigonCanalSideAncientHingedCedarTeaBonsaiPavilion } from '@/components/studio/SaigonCanalSideAncientHingedCedarTeaBonsaiPavilion'
import { BespokeImperialKynamAndSilverRepousseIncenseVault } from '@/components/studio/BespokeImperialKynamAndSilverRepousseIncenseVault'
import { ArtisanHandmadeGoldFiligreeAndRosewoodCalligraphyInkrestAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndRosewoodCalligraphyInkrestAtelier'
import { SaigonCanalSideAncientHingedRosewoodTeaBonsaiPavilion } from '@/components/studio/SaigonCanalSideAncientHingedRosewoodTeaBonsaiPavilion'
import { BespokeImperialKynamAndGoldFiligreeTeaCanisterVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeTeaCanisterVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyPaperweightBarAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyPaperweightBarAtelier'
import { SaigonCanalSideAncientHingedEbonyTeaBonsaiPavilion } from '@/components/studio/SaigonCanalSideAncientHingedEbonyTeaBonsaiPavilion'
import { BespokeImperialKynamAndGoldRepousseIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldRepousseIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndOnyxCalligraphyPaperweightStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndOnyxCalligraphyPaperweightStudio'
import { SaigonCanalSideAncientHingedAgarwoodTeaBonsaiPavilion } from '@/components/studio/SaigonCanalSideAncientHingedAgarwoodTeaBonsaiPavilion'
import { BespokeImperialKynamAndGoldFiligreeIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestStudio'
import { SaigonCanalSideCentennialTeakAndLotusMoatPavilion } from '@/components/studio/SaigonCanalSideCentennialTeakAndLotusMoatPavilion'
import { BespokeCentennialImperialKynamAndGoldRepousseVault } from '@/components/studio/BespokeCentennialImperialKynamAndGoldRepousseVault'
import { ArtisanCentennialGoldFiligreeAndJadeImperialSealStudio } from '@/components/tools/ArtisanCentennialGoldFiligreeAndJadeImperialSealStudio'
import { SaigonCanalSideAncientHingedRosewoodLotusMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedRosewoodLotusMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBarAtelier } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBarAtelier'
import { SaigonCanalSideAncientHingedAgarwoodLotusMoatTeaPavilion } from '@/components/studio/SaigonCanalSideAncientHingedAgarwoodLotusMoatTeaPavilion'
import { BespokeImperialKynamAndGoldFiligreePeacockIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreePeacockIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperStudio'
import { SaigonCanalSideAncientHingedEbonyLotusMoatTeaPavilion } from '@/components/studio/SaigonCanalSideAncientHingedEbonyLotusMoatTeaPavilion'
import { BespokeImperialKynamAndGoldFiligreeQilinIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeQilinIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyInkRestBarStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyInkRestBarStudio'
import { SaigonCanalSideAncientHingedCedarLotusMoatTeaPavilion } from '@/components/studio/SaigonCanalSideAncientHingedCedarLotusMoatTeaPavilion'
import { BespokeImperialKynamAndGoldFiligreeDragonIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeDragonIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushWasherStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushWasherStudio'
import { SaigonCanalSideAncientHingedRosewoodLotusMoatTeaPavilion } from '@/components/studio/SaigonCanalSideAncientHingedRosewoodLotusMoatTeaPavilion'
import { BespokeImperialKynamAndGoldFiligreeTurtleIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeTurtleIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyPaperweightBarStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyPaperweightBarStudio'
import { SaigonCanalSideAncientHingedAgarwoodMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedAgarwoodMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreePhoenixIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreePhoenixIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushStandBarStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushStandBarStudio'
import { SaigonCanalSideAncientHingedTeakMoatTeaPavilion } from '@/components/studio/SaigonCanalSideAncientHingedTeakMoatTeaPavilion'
import { BespokeImperialKynamAndGoldFiligreeHacIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeHacIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealPasteBoxStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealPasteBoxStudio'
import { SaigonCanalSideAncientHingedSandalwoodMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedSandalwoodMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeLionIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeLionIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBarStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBarStudio'
import { SaigonCanalSideAncientHingedCamphorMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedCamphorMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeCarpIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeCarpIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDispenserStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDispenserStudio'
import { StyleQuizSection } from '@/components/sections/StyleQuizSection'
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

      {/* Handcrafted Lacquer Artisan Studio Bát Tràng x Thạnh Xuân */}
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

      {/* Artisan Saigon Riverboat Wood Craft Sanctuary */}
      <ArtisanSaigonRiverboatWoodCraftSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Gold Filigree Jewelry And Casket Atelier */}
      <ArtisanGoldFiligreeJewelryAndCasketAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Monolithic Granite Water Feature Sanctuary */}
      <ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Horn And Tortoiseshell Comb Atelier */}
      <ArtisanHandmadeHornAndTortoiseshellCombAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Monolithic Basalt Outdoor Plunge Pool */}
      <ArtisanSaigonMonolithicBasaltOutdoorPlungePool className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Lacquer And Silver Inlay Brush Set Atelier */}
      <ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Monolithic Petrified Wood Tea Table Sanctuary */}
      <ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Bronze Chau Gong And Singing Bowl Atelier */}
      <ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Monolithic Quartz Crystal Waterfall Vault */}
      <ArtisanSaigonMonolithicQuartzCrystalWaterfallVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Cloisonne Enamel Tea Set Atelier */}
      <ArtisanHandmadeCloisonneEnamelTeaSetAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Translucent Onyx Waterfall Sanctuary */}
      <SaigonTranslucentOnyxWaterfallSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Mother Of Pearl Jewelry Casket Atelier */}
      <ArtisanMotherOfPearlJewelryCasketAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Traditional Lute Sanctuary */}
      <SaigonAcousticTraditionalLuteSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Rattan Core Lacquer Tea Caddy Atelier */}
      <ArtisanRattanCoreLacquerTeaCaddyAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Sunken Bonsai Atrium Sanctuary */}
      <SaigonSunkenBonsaiAtriumSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Pure Silver Agarwood Snuff Bottle Atelier */}
      <ArtisanPureSilverAgarwoodSnuffBottleAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Volcanic Slate Mineral Pool Pavilion */}
      <SaigonVolcanicSlateMineralPoolPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Duanni Zisha Teapot Atelier */}
      <ArtisanDuanniZishaTeapotAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Sky Jungle Biofilter Conservatory */}
      <SaigonSkyJungleBiofilterConservatory className="mt-[var(--spacing-section)]" />

      {/* Artisan Rattan Silver Wine Set Vault */}
      <ArtisanRattanSilverWineSetVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Bio-Natural Eco Pool Sanctuary */}
      <SaigonBioNaturalEcoPoolSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Hoang Dan Brass Inlay Tea Tray Vault */}
      <ArtisanHoangDanBrassInlayTeaTrayVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Wild Orchid Microclimate Pavilion */}
      <SaigonWildOrchidMicroclimatePavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Bat Trang Honey Glaze Tea Bowl Vault */}
      <ArtisanBatTrangHoneyGlazeTeaBowlVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Canal-Side Mangrove Charcoal Courtyard */}
      <SaigonCanalSideMangroveCharcoalCourtyard className="mt-[var(--spacing-section)]" />

      {/* Artisan Silver Inlaid Ebony Chopsticks Atelier */}
      <ArtisanSilverInlaidEbonyChopsticksAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Lotus Leaf Pond Tea Pavilion */}
      <SaigonBespokeLotusLeafPondTeaPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Silver Chased Areca Nut Casket Atelier */}
      <ArtisanSilverChasedArecaNutCasketAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Canal-Side Ancient Well Courtyard Sanctuary */}
      <SaigonCanalSideAncientWellCourtyardSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Horn Snuff Bottle Vault */}
      <ArtisanHandmadeHornSnuffBottleVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Heritage Terracotta Tile Courtyard Pavilion */}
      <SaigonHeritageTerracottaTileCourtyardPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Cloisonne Incense Burner Vault */}
      <ArtisanHandmadeCloisonneIncenseBurnerVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Monolithic Biotite Granite Fireplace Lounge */}
      <SaigonMonolithicBiotiteGraniteFireplaceLounge className="mt-[var(--spacing-section)]" />

      {/* Artisan Gold Leaf Lacquer Tea Tray Atelier */}
      <ArtisanGoldLeafLacquerTeaTrayAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Canal-Side Glass-Bottom Koi Courtyard */}
      <SaigonCanalSideGlassBottomKoiCourtyard className="mt-[var(--spacing-section)]" />

      {/* Artisan Horn Mother-of-Pearl Jewelry Chest Atelier */}
      <ArtisanHornMotherOfPearlJewelryChestAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Terraced Herbal Orchard Pavilion */}
      <SaigonRiversideTerracedHerbalOrchardPavilion className="mt-[var(--spacing-section)]" />

      {/* Artisan Imperial Silver Agarwood Tea Caddy Atelier */}
      <ArtisanImperialSilverAgarwoodTeaCaddyAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Canal-Side Floating Bamboo Tea Pavilion */}
      <SaigonCanalSideFloatingBambooTeaPavilion />

      {/* Artisan Gold Damascene Ebony Tobacco Pipe Atelier */}
      <ArtisanGoldDamasceneEbonyTobaccoPipeAtelier />

      {/* Saigon Riverside Cantilevered Bonsai Pavilion */}
      <SaigonRiversideCantileveredBonsaiPavilion />

      {/* Artisan Mother-Of-Pearl Inlaid Ebony Chessboard Atelier */}
      <ArtisanMotherOfPearlInlaidEbonyChessboardAtelier />

      {/* Saigon Canal Side Floating Orchid Sanctuary Pavilion */}
      <SaigonCanalSideFloatingOrchidSanctuaryPavilion />

      {/* Artisan Gold Damascene Ebony Guan Gong Statue Atelier */}
      <ArtisanGoldDamasceneEbonyGuanGongStatueAtelier />

      {/* Saigon Riverfront Glass Floor Observatory Pavilion */}
      <SaigonRiverfrontGlassFloorObservatoryPavilion />

      {/* Artisan Silver Inlaid Agarwood Maitreya Statue Atelier */}
      <ArtisanSilverInlaidAgarwoodMaitreyaStatueAtelier />

      {/* Saigon Acoustic Djembe Sanctuary Salon */}
      <SaigonAcousticDjembeSanctuarySalon />

      {/* Saigon Canal Side Floating Teak Meditation Dock */}
      <SaigonCanalSideFloatingTeakMeditationDock />

      {/* Artisan Gold Leaf Damascene Ebony Bodhidharma Statue */}
      <ArtisanGoldLeafDamasceneEbonyBodhidharmaStatueAtelier />

      {/* Saigon Monsoon Rain Chamber Hydro-Acoustic Pavilion */}
      <SaigonMonsoonRainChamberHydroAcousticPavilion />

      {/* Bespoke Smoked Oak Aroma Cigar Lounge & Whisky Vault */}
      <BespokeSmokedOakAromaCigarLoungeAndWhiskyVault />

      {/* Imperial Vietnamese Mother Of Pearl Rosewood Cabinet Atelier */}
      <ImperialVietnameseMotherOfPearlRosewoodCabinetAtelier />

      {/* Saigon Breeze Teakwood Wind Louver Courtyard Pavilion */}
      <SaigonBreezeTeakwoodWindLouverCourtyardPavilion />

      {/* Bespoke Imperial Agarwood & Gold Leaf Incense Shrine Vault */}
      <BespokeImperialAgarwoodAndGoldLeafIncenseShrineVault />

      {/* Artisan Handmade Horn & Gold-Inlaid Grooming Chest Atelier */}
      <ArtisanHandmadeHornAndGoldInlaidGroomingChestAtelier />

      {/* Saigon Riverside Hydroponic Aromatic Herb Sanctuary */}
      <SaigonRiversideHydroponicAromaticHerbSanctuary />

      {/* Bespoke Petrified Wood & Brass Wine Bar Tasting Lounge */}
      <BespokePetrifiedWoodAndBrassWineBarTastingLounge />

      {/* Artisan Vietnamese Imperial Silk & Ebony Folding Screen Atelier */}
      <ArtisanVietnameseImperialSilkAndEbonyFoldingScreenAtelier />

      {/* Saigon Breeze Bamboo Wind Chime Sanctuary Salon */}
      <SaigonBreezeBambooWindChimeSanctuarySalon />

      {/* Bespoke Smoked Oak Zen Tea House & Tatami Sanctuary */}
      <BespokeSmokedOakZenTeaHouseAndTatamiSanctuary />

      {/* Artisan Silver Inlaid Agarwood Calligraphy Brush Vault */}
      <ArtisanSilverInlaidAgarwoodCalligraphyBrushVault />

      {/* Saigon Canal Side Floating Lotus Tea Pavilion */}
      <SaigonCanalSideFloatingLotusTeaPavilion />

      {/* Bespoke Smoked Agarwood & Onyx Meditation Vault */}
      <BespokeSmokedAgarwoodAndOnyxMeditationVault />

      {/* Artisan Tortoiseshell & Gold Calligraphy Case Atelier */}
      <ArtisanHandmadeTortoiseshellAndGoldCalligraphyCaseAtelier />

      {/* Saigon Canal Side Ancient Teakwood Bonsai Moat Pavilion */}
      <SaigonCanalSideAncientTeakwoodBonsaiMoatPavilion />

      {/* Bespoke Imperial Agarwood & Brass Scent Altar Vault */}
      <BespokeImperialAgarwoodAndBrassScentAltarVault />

      {/* Artisan Gold Filigree & Jade Snuff Bottle Atelier */}
      <ArtisanHandmadeGoldFiligreeAndJadeSnuffBottleAtelier />

      {/* Saigon Canal Side Ancient Jackfruit Wood Bonsai Sanctuary */}
      <SaigonCanalSideAncientJackfruitWoodBonsaiSanctuary />

      {/* Bespoke Imperial Kynam Incense Altar & Brass Vault */}
      <BespokeImperialKynamIncenseAltarAndBrassVault />

      {/* Artisan Gold Leaf Ebony Tea Box Atelier */}
      <ArtisanHandmadeGoldLeafEbonyTeaBoxAtelier />

      {/* Saigon Canal Side Ancient Rosewood Bonsai Water Feature Sanctuary */}
      <SaigonCanalSideAncientRosewoodBonsaiWaterFeatureSanctuary />

      {/* Bespoke Imperial Kynam & Gold Leaf Scent Vault */}
      <BespokeImperialKynamAndGoldLeafScentVault />

      {/* Artisan Gold Leaf Ebony Calligraphy Brush Atelier */}
      <ArtisanHandmadeGoldLeafEbonyCalligraphyBrushAtelier />

      {/* Saigon Riverfront Ancient Dalbergia Tea Bonsai Pavilion */}
      <SaigonRiverfrontAncientDalbergiaTeaBonsaiPavilion />

      {/* Bespoke Imperial Kynam & Silver Filigree Scent Chamber */}
      <BespokeImperialKynamAndSilverFiligreeScentChamber />

      {/* Artisan Gold Filigree & Onyx Calligraphy Inkstone Atelier */}
      <ArtisanHandmadeGoldFiligreeAndOnyxCalligraphyInkstoneAtelier />

      {/* Saigon Canal Side Ancient Sandalwood Tea Pavilion */}
      <SaigonCanalSideAncientSandalwoodTeaPavilion />

      {/* Bespoke Imperial Kynam & Gold Inlaid Tea Chest Vault */}
      <BespokeImperialKynamAndGoldInlaidTeaChestVault />

      {/* Artisan Gold Filigree & Jade Water Dropper Atelier */}
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperAtelier />

      {/* Saigon Canal Side Ancient Hinged Teak Louver Tea Pavilion */}
      <SaigonCanalSideAncientHingedTeakLouverTeaPavilion />

      {/* Bespoke Imperial Kynam & Gold Leaf Scent Casket Vault */}
      <BespokeImperialKynamAndGoldLeafScentCasketVault />

      {/* Artisan Gold Filigree & Rosewood Ruler Atelier */}
      <ArtisanHandmadeGoldFiligreeAndRosewoodCalligraphyRulerAtelier />

      {/* Saigon Canal Side Ancient Rosewood Moat Tea Pavilion */}
      <SaigonCanalSideAncientRosewoodMoatTeaPavilion />

      {/* Bespoke Imperial Kynam & Silver Filigree Incense Vault */}
      <BespokeImperialKynamAndSilverFiligreeIncenseVault />

      {/* Artisan Gold Filigree & Ebony Calligraphy Seal Atelier */}
      <ArtisanHandmadeGoldFiligreeAndEbonyCalligraphySealAtelier />

      {/* Saigon Canal Side Ancient Teakwood Lotus Pond Pavilion */}
      <SaigonCanalSideAncientTeakwoodLotusPondTeaPavilion />

      {/* Bespoke Imperial Kynam & Gold Inlaid Incense Chest Vault */}
      <BespokeImperialKynamAndGoldInlaidIncenseChestVault />

      {/* Artisan Gold Filigree & Jade Brush Rest Atelier */}
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestAtelier />

      {/* Saigon Canal Side Ancient Cypress Tea Bonsai Pavilion */}
      <SaigonCanalSideAncientCypressTeaBonsaiPavilion />

      {/* Bespoke Imperial Kynam & Silver Chased Incense Vault */}
      <BespokeImperialKynamAndSilverChasedIncenseVault />

      {/* Artisan Gold Filigree & Rosewood Paperweight Bar Atelier */}
      <ArtisanHandmadeGoldFiligreeAndRosewoodPaperweightBarAtelier />

      {/* Saigon Canal Side Ancient Sandstone Lotus Moat Pavilion */}
      <SaigonCanalSideAncientSandstoneLotusMoatPavilion />

      {/* Bespoke Imperial Kynam & Gold Repousse Tea Chest Vault */}
      <BespokeImperialKynamAndGoldRepousseTeaChestVault />

      {/* Artisan Gold Filigree & Jade Water Dropper Studio */}
      <ArtisanHandmadeGoldFiligreeAndJadeWaterDropperStudio />

      {/* Saigon Canal Side Ancient Hinged Cedar Tea Bonsai Pavilion */}
      <SaigonCanalSideAncientHingedCedarTeaBonsaiPavilion />

      {/* Bespoke Imperial Kynam & Silver Repousse Incense Vault */}
      <BespokeImperialKynamAndSilverRepousseIncenseVault />

      {/* Artisan Gold Filigree & Rosewood Inkrest Atelier */}
      <ArtisanHandmadeGoldFiligreeAndRosewoodCalligraphyInkrestAtelier />

      {/* Saigon Canal Side Ancient Hinged Rosewood Tea Bonsai Pavilion */}
      <SaigonCanalSideAncientHingedRosewoodTeaBonsaiPavilion />

      {/* Bespoke Imperial Kynam & Gold Filigree Tea Canister Vault */}
      <BespokeImperialKynamAndGoldFiligreeTeaCanisterVault />

      {/* Artisan Gold Filigree & Jade Paperweight Bar Atelier */}
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyPaperweightBarAtelier />

      {/* Saigon Canal Side Ancient Hinged Ebony Tea Bonsai Pavilion */}
      <SaigonCanalSideAncientHingedEbonyTeaBonsaiPavilion />

      {/* Bespoke Imperial Kynam & Gold Repousse Incense Burner Vault */}
      <BespokeImperialKynamAndGoldRepousseIncenseBurnerVault />

      {/* Artisan Gold Filigree & Onyx Calligraphy Paperweight Studio */}
      <ArtisanHandmadeGoldFiligreeAndOnyxCalligraphyPaperweightStudio />

      {/* Saigon Canal Side Ancient Hinged Agarwood Tea Bonsai Pavilion */}
      <SaigonCanalSideAncientHingedAgarwoodTeaBonsaiPavilion />

      {/* Bespoke Imperial Kynam & Gold Filigree Incense Burner Vault */}
      <BespokeImperialKynamAndGoldFiligreeIncenseBurnerVault />

      {/* Artisan Gold Filigree & Jade Brush Rest Studio */}
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestStudio />

      {/* Centennial Sprint 100 Masterpieces */}
      <SaigonCanalSideCentennialTeakAndLotusMoatPavilion />
      <BespokeCentennialImperialKynamAndGoldRepousseVault />
      <ArtisanCentennialGoldFiligreeAndJadeImperialSealStudio />

      {/* Sprint 101 Masterpieces */}
      <SaigonCanalSideAncientHingedRosewoodLotusMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBarAtelier />

      {/* Sprint 102 Masterpieces */}
      <SaigonCanalSideAncientHingedAgarwoodLotusMoatTeaPavilion />
      <BespokeImperialKynamAndGoldFiligreePeacockIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperStudio />

      {/* Sprint 103 Masterpieces */}
      <SaigonCanalSideAncientHingedEbonyLotusMoatTeaPavilion />
      <BespokeImperialKynamAndGoldFiligreeQilinIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyInkRestBarStudio />

      {/* Sprint 104 Masterpieces */}
      <SaigonCanalSideAncientHingedCedarLotusMoatTeaPavilion />
      <BespokeImperialKynamAndGoldFiligreeDragonIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushWasherStudio />

      {/* Sprint 105 Masterpieces */}
      <SaigonCanalSideAncientHingedRosewoodLotusMoatTeaPavilion />
      <BespokeImperialKynamAndGoldFiligreeTurtleIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyPaperweightBarStudio />

      {/* Sprint 106 Masterpieces */}
      <SaigonCanalSideAncientHingedAgarwoodMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreePhoenixIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushStandBarStudio />

      {/* Sprint 107 Masterpieces */}
      <SaigonCanalSideAncientHingedTeakMoatTeaPavilion />
      <BespokeImperialKynamAndGoldFiligreeHacIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealPasteBoxStudio />

      {/* Sprint 108 Masterpieces */}
      <SaigonCanalSideAncientHingedSandalwoodMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeLionIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBarStudio />

      {/* Sprint 109 Masterpieces */}
      <SaigonCanalSideAncientHingedCamphorMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeCarpIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDispenserStudio />

      {/* Style Quiz: Tìm Phong Cách Của Bạn */}
      <StyleQuizSection className="mt-[var(--spacing-section)]" />
    </div>
  )
}
