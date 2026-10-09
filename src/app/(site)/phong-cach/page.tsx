/**
 * /phong-cach - the studio's styles, as a page you can actually enter.
 *
 * A style is the second taxonomy over the work, beside the category: a category
 * says what kind of building it is, a style says how it is spoken. Visitors ask
 * for the second one by name - "tôi thích Indochine", "làm kiểu tối giản được
 * không" - so it deserves an address rather than a menu label.
 *
 * EVERY STYLE HERE IS A LINK. That is the whole point of the route. The grid
 * reads off `getPublishedStyles()`, so what the studio configures in
 * /admin/styles is what a visitor sees, and each card leads to a real page of
 * real projects - never a button that goes nowhere.
 *
 * Revalidated hourly: a style added or renamed in the admin lands without a
 * deploy, and the read is cheap enough that an hour of staleness is the only
 * cost. A database with no styles in it renders the empty state below rather
 * than a broken grid - `getPublishedStyles()` answers `[]` on a failed read, so
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
import { SaigonCalocedrusHomeCinemaSanctuary } from '@/components/studio/SaigonCalocedrusHomeCinemaSanctuary'
import { ArtisanMotherOfPearlChessPavilion } from '@/components/studio/ArtisanMotherOfPearlChessPavilion'
import { SaigonClepsydraWaterClockVault } from '@/components/studio/SaigonClepsydraWaterClockVault'
import { HorologyTimepieceAndCigarVault } from '@/components/studio/HorologyTimepieceAndCigarVault'
import { SaigonMekongBiotopeAquariumVault } from '@/components/studio/SaigonMekongBiotopeAquariumVault'
import { ArtisanBaccaratCrystalChandelierAtelier } from '@/components/studio/ArtisanBaccaratCrystalChandelierAtelier'
import { SaigonMaritimeAntiqueMapLibraryVault } from '@/components/studio/SaigonMaritimeAntiqueMapLibraryVault'
import { ArtisanHinokiHydrotherapyOnsenVault } from '@/components/studio/ArtisanHinokiHydrotherapyOnsenVault'
import { SaigonStainedGlassAtriumDomeSanctuary } from '@/components/studio/SaigonStainedGlassAtriumDomeSanctuary'
import { SaigonAcousticPianoGrandSalon } from '@/components/studio/SaigonAcousticPianoGrandSalon'
import { SaigonStarlightFiberOpticCeilingVault } from '@/components/studio/SaigonStarlightFiberOpticCeilingVault'
import { SaigonArtisanLacquerwareGallerySanctuary } from '@/components/studio/SaigonArtisanLacquerwareGallerySanctuary'
import { SaigonAcousticCelloListeningVault } from '@/components/studio/SaigonAcousticCelloListeningVault'
import { SaigonRainwaterCascadeAtriumSanctuary } from '@/components/studio/SaigonRainwaterCascadeAtriumSanctuary'
import { SaigonArtisanBespokeParfumVault } from '@/components/studio/SaigonArtisanBespokeParfumVault'
import { SaigonFloatingInfinityDaybedPavilion } from '@/components/studio/SaigonFloatingInfinityDaybedPavilion'
import { SaigonStainedGlassTerrariumConservatory } from '@/components/studio/SaigonStainedGlassTerrariumConservatory'
import { SaigonBespokeAudiophileTurntableVault } from '@/components/studio/SaigonBespokeAudiophileTurntableVault'
import { SaigonAstronomyObservatoryRetractableDomeVault } from '@/components/studio/SaigonAstronomyObservatoryRetractableDomeVault'
import { SaigonAcousticHarpSanctuarySalon } from '@/components/studio/SaigonAcousticHarpSanctuarySalon'
import { SaigonAcousticViolinSanctuaryVault } from '@/components/studio/SaigonAcousticViolinSanctuaryVault'
import { SaigonRiversideSunsetTeaObservatory } from '@/components/studio/SaigonRiversideSunsetTeaObservatory'
import { SaigonAcousticFluteSanctuaryPavilion } from '@/components/studio/SaigonAcousticFluteSanctuaryPavilion'
import { SaigonArtisanBespokeLoomSilkPavilion } from '@/components/studio/SaigonArtisanBespokeLoomSilkPavilion'
import { SaigonAcousticKotoSanctuarySalon } from '@/components/studio/SaigonAcousticKotoSanctuarySalon'
import { SaigonRiversideTeaRoastingAtelier } from '@/components/studio/SaigonRiversideTeaRoastingAtelier'
import { SaigonAcousticGuqinSanctuaryPavilion } from '@/components/studio/SaigonAcousticGuqinSanctuaryPavilion'
import { SaigonRiversideHerbalSteamPavilion } from '@/components/studio/SaigonRiversideHerbalSteamPavilion'
import { SaigonHarpsichordClavecinSanctuary } from '@/components/studio/SaigonHarpsichordClavecinSanctuary'
import { ArtisanGiaDinhCeramicKilnCourtyardSanctuary } from '@/components/studio/ArtisanGiaDinhCeramicKilnCourtyardSanctuary'
import { SaigonAcousticHarpSalonSanctuary } from '@/components/studio/SaigonAcousticHarpSalonSanctuary'
import { SaigonHeritageAncientBrickCourtyardPavilion } from '@/components/studio/SaigonHeritageAncientBrickCourtyardPavilion'
import { SaigonAcousticPipeOrganAtriumVault } from '@/components/studio/SaigonAcousticPipeOrganAtriumVault'
import { ArtisanSaigonRiverboatWoodCraftSanctuary } from '@/components/studio/ArtisanSaigonRiverboatWoodCraftSanctuary'
import { SaigonAcousticCimbalomSalonSanctuary } from '@/components/studio/SaigonAcousticCimbalomSalonSanctuary'
import { ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary } from '@/components/studio/ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary'
import { SaigonAcousticLithophoneSanctuary } from '@/components/studio/SaigonAcousticLithophoneSanctuary'
import { ArtisanSaigonMonolithicBasaltOutdoorPlungePool } from '@/components/studio/ArtisanSaigonMonolithicBasaltOutdoorPlungePool'
import { SaigonAcousticGlassArmonicaSanctuary } from '@/components/studio/SaigonAcousticGlassArmonicaSanctuary'
import { ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary } from '@/components/studio/ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary'
import { SaigonAcousticThereminSanctuary } from '@/components/studio/SaigonAcousticThereminSanctuary'
import { ArtisanSaigonMonolithicQuartzCrystalWaterfallVault } from '@/components/studio/ArtisanSaigonMonolithicQuartzCrystalWaterfallVault'
import { SaigonAcousticHarpsichordSanctuarySalon } from '@/components/studio/SaigonAcousticHarpsichordSanctuarySalon'
import { SaigonTranslucentOnyxWaterfallSanctuary } from '@/components/studio/SaigonTranslucentOnyxWaterfallSanctuary'
import { SaigonZenKaresansuiGardenSanctuary } from '@/components/studio/SaigonZenKaresansuiGardenSanctuary'
import { SaigonAcousticTraditionalLuteSanctuary } from '@/components/studio/SaigonAcousticTraditionalLuteSanctuary'
import { SaigonAcousticAccordionAndMusicBoxSanctuary } from '@/components/studio/SaigonAcousticAccordionAndMusicBoxSanctuary'
import { SaigonSunkenBonsaiAtriumSanctuary } from '@/components/studio/SaigonSunkenBonsaiAtriumSanctuary'
import { SaigonAcousticOudSanctuarySalon } from '@/components/studio/SaigonAcousticOudSanctuarySalon'
import { SaigonVolcanicSlateMineralPoolPavilion } from '@/components/studio/SaigonVolcanicSlateMineralPoolPavilion'
import { SaigonAcousticKlongPutSanctuaryPavilion } from '@/components/studio/SaigonAcousticKlongPutSanctuaryPavilion'
import { SaigonSkyJungleBiofilterConservatory } from '@/components/studio/SaigonSkyJungleBiofilterConservatory'
import { SaigonAcousticYangqinSanctuaryPavilion } from '@/components/studio/SaigonAcousticYangqinSanctuaryPavilion'
import { SaigonBioNaturalEcoPoolSanctuary } from '@/components/studio/SaigonBioNaturalEcoPoolSanctuary'
import { SaigonAcousticErhuSanctuarySalon } from '@/components/studio/SaigonAcousticErhuSanctuarySalon'
import { SaigonWildOrchidMicroclimatePavilion } from '@/components/studio/SaigonWildOrchidMicroclimatePavilion'
import { SaigonBespokePipaLuteSanctuaryPavilion } from '@/components/studio/SaigonBespokePipaLuteSanctuaryPavilion'
import { SaigonCanalSideMangroveCharcoalCourtyard } from '@/components/studio/SaigonCanalSideMangroveCharcoalCourtyard'
import { SaigonBespokeBambooMarimbaAcousticSanctuary } from '@/components/studio/SaigonBespokeBambooMarimbaAcousticSanctuary'
import { SaigonBespokeLotusLeafPondTeaPavilion } from '@/components/studio/SaigonBespokeLotusLeafPondTeaPavilion'
import { SaigonBespokeDanBauMonochordSanctuary } from '@/components/studio/SaigonBespokeDanBauMonochordSanctuary'
import { SaigonCanalSideAncientWellCourtyardSanctuary } from '@/components/studio/SaigonCanalSideAncientWellCourtyardSanctuary'
import { SaigonAcousticSitarSanctuarySalon } from '@/components/studio/SaigonAcousticSitarSanctuarySalon'
import { SaigonHeritageTerracottaTileCourtyardPavilion } from '@/components/studio/SaigonHeritageTerracottaTileCourtyardPavilion'
import { SaigonAcousticBalalaikaSanctuarySalon } from '@/components/studio/SaigonAcousticBalalaikaSanctuarySalon'
import { SaigonMonolithicBiotiteGraniteFireplaceLounge } from '@/components/studio/SaigonMonolithicBiotiteGraniteFireplaceLounge'
import { SaigonAcousticMandolinSanctuarySalon } from '@/components/studio/SaigonAcousticMandolinSanctuarySalon'
import { SaigonCanalSideGlassBottomKoiCourtyard } from '@/components/studio/SaigonCanalSideGlassBottomKoiCourtyard'
import { SaigonAcousticTambourineSanctuarySalon } from '@/components/studio/SaigonAcousticTambourineSanctuarySalon'
import { SaigonRiversideTerracedHerbalOrchardPavilion } from '@/components/studio/SaigonRiversideTerracedHerbalOrchardPavilion'
import { SaigonAcousticCajonSanctuarySalon } from '@/components/studio/SaigonAcousticCajonSanctuarySalon'
import { SaigonCanalSideFloatingBambooTeaPavilion } from '@/components/studio/SaigonCanalSideFloatingBambooTeaPavilion'
import { SaigonAcousticCastanetsSanctuarySalon } from '@/components/studio/SaigonAcousticCastanetsSanctuarySalon'
import { SaigonRiversideCantileveredBonsaiPavilion } from '@/components/studio/SaigonRiversideCantileveredBonsaiPavilion'
import { SaigonAcousticMaracasSanctuarySalon } from '@/components/studio/SaigonAcousticMaracasSanctuarySalon'
import { SaigonCanalSideFloatingOrchidSanctuaryPavilion } from '@/components/studio/SaigonCanalSideFloatingOrchidSanctuaryPavilion'
import { SaigonAcousticBongosSanctuarySalon } from '@/components/studio/SaigonAcousticBongosSanctuarySalon'
import { SaigonRiverfrontGlassFloorObservatoryPavilion } from '@/components/studio/SaigonRiverfrontGlassFloorObservatoryPavilion'
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
import { SaigonCanalSideAncientHingedCypressMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedCypressMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeTigerIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeTigerIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushPotStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushPotStudio'
import { SaigonCanalSideAncientHingedEbonyMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedEbonyMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeKirinIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeKirinIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyInkstoneStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyInkstoneStudio'
import { SaigonCanalSideAncientHingedMuongMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedMuongMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeDragonHorseIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeDragonHorseIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperPotStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperPotStudio'
import { SaigonCanalSideAncientHingedCamLaiMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedCamLaiMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeTurtleDragonIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeTurtleDragonIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealBoxStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealBoxStudio'
import { SaigonCanalSideAncientHingedHuongMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedHuongMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeWhiteTigerIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeWhiteTigerIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusStudio'
import { SaigonCanalSideAncientHingedPoMuMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedPoMuMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeXuanWuIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeXuanWuIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealPasteWellStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealPasteWellStudio'
import { SaigonCanalSideAncientHingedChuaMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedChuaMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeZhuQueIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeZhuQueIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestMountainStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestMountainStudio'
import { SaigonCanalSideAncientHingedSenMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedSenMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeQingLongIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeQingLongIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestGourdStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestGourdStudio'
import { SaigonCanalSideAncientHingedGaoMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedGaoMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeKirinLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeKirinLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBambooStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBambooStudio'
import { SaigonCanalSideAncientHingedGoiMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedGoiMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeTurtleCraneIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeTurtleCraneIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestCarpStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestCarpStudio'
import { SaigonCanalSideAncientHingedThongMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedThongMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeElephantLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeElephantLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestCicadaStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestCicadaStudio'
import { SaigonCanalSideAncientHingedNgocAmMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedNgocAmMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreePeacockLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreePeacockLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBatStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBatStudio'
import { SaigonCanalSideAncientHingedHoangDanMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedHoangDanMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeRoosterLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeRoosterLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestRuyiStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestRuyiStudio'
import { SaigonCanalSideAncientHingedHuyetLongMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedHuyetLongMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeHoundLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeHoundLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestFishStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestFishStudio'
import { SaigonCanalSideAncientHingedNgocNghienMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedNgocNghienMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeBoarLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeBoarLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusSeedStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusSeedStudio'
import { SaigonCanalSideAncientHingedLongNaoMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedLongNaoMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeDragonLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeDragonLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestPineCraneStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestPineCraneStudio'
import { SaigonCanalSideAncientHingedBachXanhMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedBachXanhMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeSnakeLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeSnakeLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestPeonyStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestPeonyStudio'
import { SaigonCanalSideAncientHingedMunSocMoatPavilion } from '@/components/studio/SaigonCanalSideAncientHingedMunSocMoatPavilion'
import { BespokeImperialKynamAndGoldFiligreeHorseLotusIncenseBurnerVault } from '@/components/studio/BespokeImperialKynamAndGoldFiligreeHorseLotusIncenseBurnerVault'
import { ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestOrchidStudio } from '@/components/tools/ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestOrchidStudio'
import { BespokeSpatialLookbookShowcase } from '@/components/projects/BespokeSpatialLookbookShowcase'
import { StyleQuizSection } from '@/components/sections/StyleQuizSection'
import { buildMetadata } from '@/lib/seo'
import { pad2 } from '@/lib/utils'
import { getPublishedStyles } from '@/server/queries/styles'
import type { StyleItem } from '@/types/content'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Phong cách',
  description:
    'Những cách nói của cùng một studio - Hiện đại, Tân cổ điển, Tối giản, Indochine, Bắc Âu, Nhật Bản và hơn thế. Mỗi phong cách dẫn tới những công trình GuHomes đã hoàn thiện theo lối đó.',
  path: '/phong-cach',
})

function countLabel(style: StyleItem): string {
  return style.count > 0 ? `${style.count} công trình` : 'Đang cập nhật'
}

/**
 * The heading counts the styles out loud, and how many there are is the admin's
 * to decide - so the number has to be read, not written into the sentence. Nine
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
            {/* The English name is how half the briefs arrive - "Modern Luxury",
                "Japandi" - so it is set as a label under the Vietnamese one
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
          <Label as="p" rule index="-">
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
              đó - hoặc mang câu chuyện của bạn tới, rồi hai bên cùng tìm ra lối phù hợp.
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

      {/* Handcrafted Lacquer Artisan Studio Bát Tràng x Thạnh Xuân */}
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

      {/* Saigon Calocedrus Home Cinema Dolby Atmos 9.4.6 Sanctuary */}
      <SaigonCalocedrusHomeCinemaSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Mother of Pearl Mun Wood Chess Pavilion */}
      <ArtisanMotherOfPearlChessPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Clepsydra Water Clock Borosilicate 1Hz Vault */}
      <SaigonClepsydraWaterClockVault className="mt-[var(--spacing-section)]" />

      {/* Horology Timepiece Tourbillon & Cigar Spanish Cedar Vault */}
      <HorologyTimepieceAndCigarVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Mekong Biotope Aquarium Hopea Driftwood Vault */}
      <SaigonMekongBiotopeAquariumVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Baccarat Crystal Chandelier Winch Atelier */}
      <ArtisanBaccaratCrystalChandelierAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Maritime Antique Map Library Artglass UV99 Vault */}
      <SaigonMaritimeAntiqueMapLibraryVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Hinoki Hydrotherapy Onsen 250y Vault */}
      <ArtisanHinokiHydrotherapyOnsenVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Stained Glass Atrium Dome Art Nouveau Sanctuary */}
      <SaigonStainedGlassAtriumDomeSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Piano Grand Salon Steinway Mun Wood */}
      <SaigonAcousticPianoGrandSalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Starlight Fiber Optic Ceiling Vault 1600 Stars */}
      <SaigonStarlightFiberOpticCeilingVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Artisan Lacquerware Gallery 18 Steps Sanctuary */}
      <SaigonArtisanLacquerwareGallerySanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Cello Listening Maple Vault */}
      <SaigonAcousticCelloListeningVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Rainwater Cascade Atrium Kusari Toi Sanctuary */}
      <SaigonRainwaterCascadeAtriumSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Artisan Bespoke Parfum Vault */}
      <SaigonArtisanBespokeParfumVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Floating Infinity Daybed Pavilion */}
      <SaigonFloatingInfinityDaybedPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Stained Glass Terrarium Conservatory */}
      <SaigonStainedGlassTerrariumConservatory className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Audiophile Turntable Basalt Vault */}
      <SaigonBespokeAudiophileTurntableVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Astronomy Observatory Retractable Dome Vault */}
      <SaigonAstronomyObservatoryRetractableDomeVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Harp Sanctuary Salon */}
      <SaigonAcousticHarpSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Violin Sanctuary Vault */}
      <SaigonAcousticViolinSanctuaryVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Sunset Tea Observatory */}
      <SaigonRiversideSunsetTeaObservatory className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Flute Sanctuary Pavilion */}
      <SaigonAcousticFluteSanctuaryPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Artisan Bespoke Loom Silk Pavilion */}
      <SaigonArtisanBespokeLoomSilkPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Koto Sanctuary Salon */}
      <SaigonAcousticKotoSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Tea Roasting Atelier */}
      <SaigonRiversideTeaRoastingAtelier className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Guqin Sanctuary Pavilion */}
      <SaigonAcousticGuqinSanctuaryPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Herbal Steam Pavilion */}
      <SaigonRiversideHerbalSteamPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Harpsichord Clavecin Sanctuary */}
      <SaigonHarpsichordClavecinSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Gia Dinh Ceramic Kiln Courtyard Sanctuary */}
      <ArtisanGiaDinhCeramicKilnCourtyardSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Harp Salon Sanctuary */}
      <SaigonAcousticHarpSalonSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Heritage Ancient Brick Courtyard Pavilion */}
      <SaigonHeritageAncientBrickCourtyardPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Pipe Organ Atrium Vault */}
      <SaigonAcousticPipeOrganAtriumVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Riverboat Wood Craft Sanctuary */}
      <ArtisanSaigonRiverboatWoodCraftSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Cimbalom Salon Sanctuary */}
      <SaigonAcousticCimbalomSalonSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Monolithic Granite Water Feature Sanctuary */}
      <ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Lithophone Sanctuary */}
      <SaigonAcousticLithophoneSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Monolithic Basalt Outdoor Plunge Pool */}
      <ArtisanSaigonMonolithicBasaltOutdoorPlungePool className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Glass Armonica Sanctuary */}
      <SaigonAcousticGlassArmonicaSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Monolithic Petrified Wood Tea Table Sanctuary */}
      <ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Theremin Sanctuary */}
      <SaigonAcousticThereminSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Saigon Monolithic Quartz Crystal Waterfall Vault */}
      <ArtisanSaigonMonolithicQuartzCrystalWaterfallVault className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Harpsichord Sanctuary Salon */}
      <SaigonAcousticHarpsichordSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Translucent Onyx Waterfall Sanctuary */}
      <SaigonTranslucentOnyxWaterfallSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Zen Karesansui Garden Sanctuary */}
      <SaigonZenKaresansuiGardenSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Traditional Lute Sanctuary */}
      <SaigonAcousticTraditionalLuteSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Accordion And Music Box Sanctuary */}
      <SaigonAcousticAccordionAndMusicBoxSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Sunken Bonsai Atrium Sanctuary */}
      <SaigonSunkenBonsaiAtriumSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Oud Sanctuary Salon */}
      <SaigonAcousticOudSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Volcanic Slate Mineral Pool Pavilion */}
      <SaigonVolcanicSlateMineralPoolPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Klong Put Sanctuary Pavilion */}
      <SaigonAcousticKlongPutSanctuaryPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Sky Jungle Biofilter Conservatory */}
      <SaigonSkyJungleBiofilterConservatory className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Yangqin Sanctuary Pavilion */}
      <SaigonAcousticYangqinSanctuaryPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Bio-Natural Eco Pool Sanctuary */}
      <SaigonBioNaturalEcoPoolSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Erhu Sanctuary Salon */}
      <SaigonAcousticErhuSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Wild Orchid Microclimate Pavilion */}
      <SaigonWildOrchidMicroclimatePavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Pipa Lute Sanctuary Pavilion */}
      <SaigonBespokePipaLuteSanctuaryPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Canal-Side Mangrove Charcoal Courtyard */}
      <SaigonCanalSideMangroveCharcoalCourtyard className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Bamboo Marimba Acoustic Sanctuary */}
      <SaigonBespokeBambooMarimbaAcousticSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Lotus Leaf Pond Tea Pavilion */}
      <SaigonBespokeLotusLeafPondTeaPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Bespoke Dan Bau Monochord Sanctuary */}
      <SaigonBespokeDanBauMonochordSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Canal-Side Ancient Well Courtyard Sanctuary */}
      <SaigonCanalSideAncientWellCourtyardSanctuary className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Sitar Sanctuary Salon */}
      <SaigonAcousticSitarSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Heritage Terracotta Tile Courtyard Pavilion */}
      <SaigonHeritageTerracottaTileCourtyardPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Balalaika Sanctuary Salon */}
      <SaigonAcousticBalalaikaSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Monolithic Biotite Granite Fireplace Lounge */}
      <SaigonMonolithicBiotiteGraniteFireplaceLounge className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Mandolin Sanctuary Salon */}
      <SaigonAcousticMandolinSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Canal-Side Glass-Bottom Koi Courtyard */}
      <SaigonCanalSideGlassBottomKoiCourtyard className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Tambourine Sanctuary Salon */}
      <SaigonAcousticTambourineSanctuarySalon className="mt-[var(--spacing-section)]" />

      {/* Saigon Riverside Terraced Herbal Orchard Pavilion */}
      <SaigonRiversideTerracedHerbalOrchardPavilion className="mt-[var(--spacing-section)]" />

      {/* Saigon Acoustic Cajon Sanctuary Salon */}
      <SaigonAcousticCajonSanctuarySalon />

      {/* Saigon Canal-Side Floating Bamboo Tea Pavilion */}
      <SaigonCanalSideFloatingBambooTeaPavilion />

      {/* Saigon Acoustic Castanets Sanctuary Salon */}
      <SaigonAcousticCastanetsSanctuarySalon />

      {/* Saigon Riverside Cantilevered Bonsai Pavilion */}
      <SaigonRiversideCantileveredBonsaiPavilion />

      {/* Saigon Acoustic Maracas Sanctuary Salon */}
      <SaigonAcousticMaracasSanctuarySalon />

      {/* Saigon Canal Side Floating Orchid Sanctuary Pavilion */}
      <SaigonCanalSideFloatingOrchidSanctuaryPavilion />

      {/* Saigon Acoustic Bongos Sanctuary Salon */}
      <SaigonAcousticBongosSanctuarySalon />

      {/* Saigon Riverfront Glass Floor Observatory Pavilion */}
      <SaigonRiverfrontGlassFloorObservatoryPavilion />

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

      {/* Sprint 110 Masterpieces */}
      <SaigonCanalSideAncientHingedCypressMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeTigerIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushPotStudio />

      {/* Sprint 111 Masterpieces */}
      <SaigonCanalSideAncientHingedEbonyMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeKirinIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyInkstoneStudio />

      {/* Sprint 112 Masterpieces */}
      <SaigonCanalSideAncientHingedMuongMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeDragonHorseIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperPotStudio />

      {/* Sprint 113 Masterpieces */}
      <SaigonCanalSideAncientHingedCamLaiMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeTurtleDragonIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealBoxStudio />

      {/* Sprint 114 Masterpieces */}
      <SaigonCanalSideAncientHingedHuongMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeWhiteTigerIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusStudio />

      {/* Sprint 115 Masterpieces */}
      <SaigonCanalSideAncientHingedPoMuMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeXuanWuIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealPasteWellStudio />

      {/* Sprint 116 Masterpieces */}
      <SaigonCanalSideAncientHingedChuaMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeZhuQueIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestMountainStudio />

      {/* Sprint 117 Masterpieces */}
      <SaigonCanalSideAncientHingedSenMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeQingLongIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestGourdStudio />

      {/* Sprint 118 Masterpieces */}
      <SaigonCanalSideAncientHingedGaoMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeKirinLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBambooStudio />

      {/* Sprint 119 Masterpieces */}
      <SaigonCanalSideAncientHingedGoiMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeTurtleCraneIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestCarpStudio />

      {/* Sprint 120 Masterpieces */}
      <SaigonCanalSideAncientHingedThongMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeElephantLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestCicadaStudio />

      {/* Sprint 121 Masterpieces */}
      <SaigonCanalSideAncientHingedNgocAmMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreePeacockLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBatStudio />

      {/* Sprint 122 Masterpieces */}
      <SaigonCanalSideAncientHingedHoangDanMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeRoosterLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestRuyiStudio />

      {/* Sprint 123 Masterpieces */}
      <SaigonCanalSideAncientHingedHuyetLongMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeHoundLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestFishStudio />

      {/* Sprint 124 Masterpieces */}
      <SaigonCanalSideAncientHingedNgocNghienMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeBoarLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusSeedStudio />

      {/* Sprint 125 Masterpieces */}
      <SaigonCanalSideAncientHingedLongNaoMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeDragonLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestPineCraneStudio />

      {/* Sprint 126 Masterpieces */}
      <SaigonCanalSideAncientHingedBachXanhMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeSnakeLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestPeonyStudio />

      {/* Sprint 127 Masterpieces */}
      <SaigonCanalSideAncientHingedMunSocMoatPavilion />
      <BespokeImperialKynamAndGoldFiligreeHorseLotusIncenseBurnerVault />
      <ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestOrchidStudio />

      {/* Style Quiz: Tìm Phong Cách Của Bạn */}
      <StyleQuizSection className="mt-[var(--spacing-section)]" />

      {/* Lookbook Không Gian Cao Cấp 2026 */}
      <BespokeSpatialLookbookShowcase className="mt-[var(--spacing-section)]" />
    </div>
  )
}
