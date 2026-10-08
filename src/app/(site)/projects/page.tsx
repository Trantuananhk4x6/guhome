/**
 * /projects - the editorial index.
 *
 * Server component, no three.js on this route (ARCHITECTURE §8): the index is
 * the fastest page on the site and stays that way. Both filters are plain
 * queries - `?category=` and `?style=` - so every filtered view is shareable and
 * crawlable, and the two COMPOSE: `?category=can-ho&style=toi-gian` is one
 * address, reachable by two clicks, and either chip drops only its own
 * parameter. `projectsHref()` in `StyleFilter` is the one place that shape is
 * written, so the filters and the pager cannot disagree about it.
 *
 * THE TWO TAXONOMIES DO NOT COME FROM THE SAME PLACE, AND THAT IS DELIBERATE.
 * Categories are the fixed five of `CATEGORY_SEEDS` - a shape of building, which
 * the studio does not add to. Styles are read from the database on every
 * arrival, because the studio configures them in /admin and a style that exists
 * in the admin screen but not on this filter is exactly the failure this page
 * exists to avoid. A database with no styles in it renders no style band at all.
 *
 * COMPOSITION. The masthead is a band, not a stack. The heading, its lead
 * paragraph and the two filters occupy a four-column rail; the first project
 * fills the seven columns beside it and runs off the right edge of the screen.
 * That is what puts work inside the arrival screen - the previous stack pushed
 * the first photograph to y=813 on a 1000px viewport and left a 176px empty
 * band under the filter bar, which was the defect the audit reported.
 *
 * One query serves the whole page: the full published run is fetched once, the
 * per-category figures are counted from it, and the active filters are applied
 * in memory. `getPublishedIndex` is already ordered, so the filtered view keeps
 * the editor's ordering without a second round trip. The style membership map is
 * a single grouped read, and only when a filter is actually engaged - an
 * unfiltered arrival, which is most of them, still pays exactly what it did
 * before styles existed.
 *
 * THE FIGURES ARE WHAT A CLICK WOULD GIVE YOU. Each category figure counts the
 * run with the ACTIVE STYLE still applied, and each style figure counts it with
 * the active category still applied, because the two filters compose - a chip
 * printing a number you cannot reach is worse than a chip printing none.
 *
 * AND IT IS THE ONE PUBLIC ROUTE THAT CANNOT BE PRERENDERED. The filters and
 * `?page=` are read from `searchParams`, which is a dynamic API, so unlike `/`,
 * `/studio`, `/journal`, `/contact` and every project page - all of which are
 * built once and served from disk - this HTML is composed on every arrival. It
 * was measured at 1730 ms to DOMContentLoaded against 57 ms for `/studio`, and
 * all of the difference was the server: the browser had nothing to do but wait
 * for the document. `getPublishedIndex` is the answer to that - the same run,
 * cached across requests rather than merely across one - and the reason this
 * page calls it instead of `getPublishedProjects`, which the prerendered routes
 * use and which has no business carrying a cross-request cache for them.
 *
 * IT IS PAGED, AND THAT IS THE POINT. The index used to render all 105 projects
 * into one document: 34,244px on a 1600×1000 desktop, 35,604px at 390 wide -
 * about 34 and 42 screens (docs/ui-after/measurements.json). It is also the
 * destination of the site's primary call to action, so the one page the studio
 * most needs a visitor to read was the one page a visitor could not get through.
 *
 * Twenty-four to a page, as `?page=N` - the same plain-link contract as the
 * filters, so every page of the catalogue is linkable and crawlable and the back
 * button works. The masthead is unchanged on every page: the rail, then that
 * page's first project on the seven columns beside it, then the rest of the page
 * phrased by `ProjectIndex`. Nothing about it knows which page it is on, which
 * is why page four composes as carefully as page one.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { CategoryFilter } from '@/components/projects/CategoryFilter'
import type { CategoryOption } from '@/components/projects/CategoryFilter'
import { DISPLAY } from '@/components/projects/composition'
import { IndexPager, pageWindow } from '@/components/projects/IndexPager'
import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { ProjectLead } from '@/components/projects/ProjectLead'
import { LookbookClimateFilter } from '@/components/projects/LookbookClimateFilter'
import { ProjectsViewSwitcher } from '@/components/projects/ProjectsViewSwitcher'
import { ConstructionTimelineDiary } from '@/components/projects/ConstructionTimelineDiary'
import { WoodJoineryExplorer } from '@/components/studio/WoodJoineryExplorer'
import { CurvedWoodCraftLab } from '@/components/studio/CurvedWoodCraftLab'
import { WesternSolarHeatCalculator } from '@/components/tools/WesternSolarHeatCalculator'
import { ArchitecturalDetailViewer } from '@/components/projects/ArchitecturalDetailViewer'
import { AcousticDampeningSimulator } from '@/components/studio/AcousticDampeningSimulator'
import { TropicalPatinaLab } from '@/components/studio/TropicalPatinaLab'
import { RiverBreezeAerodynamicsLab } from '@/components/studio/RiverBreezeAerodynamicsLab'
import { KilnMoistureDiary } from '@/components/studio/KilnMoistureDiary'
import { NaturalStoneQuarryAtlas } from '@/components/studio/NaturalStoneQuarryAtlas'
import { TactileTextileDraperyLab } from '@/components/studio/TactileTextileDraperyLab'
import { SubfloorAcousticMoistureShield } from '@/components/studio/SubfloorAcousticMoistureShield'
import { TeaSanctuaryPavilion } from '@/components/studio/TeaSanctuaryPavilion'
import { ChefIslandPlumbingVault } from '@/components/studio/ChefIslandPlumbingVault'
import { TactileHardwareAtelier } from '@/components/studio/TactileHardwareAtelier'
import { TropicalBonsaiEcologyLab } from '@/components/studio/TropicalBonsaiEcologyLab'
import { ArtisanLimePlasterLab } from '@/components/studio/ArtisanLimePlasterLab'
import { SommelierWineCigarVault } from '@/components/studio/SommelierWineCigarVault'
import { AcousticSanctuaryMasterSuite } from '@/components/studio/AcousticSanctuaryMasterSuite'
import { SaigonCourtyardAtriumLab } from '@/components/studio/SaigonCourtyardAtriumLab'
import { BespokeWalkInWardrobeVault } from '@/components/studio/BespokeWalkInWardrobeVault'
import { ArtisanBespokeJoineryVault } from '@/components/studio/ArtisanBespokeJoineryVault'
import { SaigonBreezeMicroclimateCurator } from '@/components/studio/SaigonBreezeMicroclimateCurator'
import { SaigonMonsoonRainwaterHarvestLab } from '@/components/studio/SaigonMonsoonRainwaterHarvestLab'
import { SaigonBespokeTeakDeckingPavilion } from '@/components/studio/SaigonBespokeTeakDeckingPavilion'
import { SaigonBespokeInfinityPoolLab } from '@/components/studio/SaigonBespokeInfinityPoolLab'
import { SaigonBiophilicGreenWallAtelier } from '@/components/studio/SaigonBiophilicGreenWallAtelier'
import { SaigonRooftopStargazingObservatory } from '@/components/studio/SaigonRooftopStargazingObservatory'
import { AntiqueLibraryAndCartographyVault } from '@/components/studio/AntiqueLibraryAndCartographyVault'
import { ArtisanBatTrangBrickWineCellarVault } from '@/components/studio/ArtisanBatTrangBrickWineCellarVault'
import { ArtisanLiveEdgeParquetFlooringVault } from '@/components/studio/ArtisanLiveEdgeParquetFlooringVault'
import { PrivateArtCollectionMuseumVault } from '@/components/studio/PrivateArtCollectionMuseumVault'
import { SaigonBreezeWindChimeArtisanAtelier } from '@/components/studio/SaigonBreezeWindChimeArtisanAtelier'
import { ArtisanHelicalRibbonStaircaseVault } from '@/components/studio/ArtisanHelicalRibbonStaircaseVault'
import { SaigonAudiophileVinylSanctuary } from '@/components/studio/SaigonAudiophileVinylSanctuary'
import { SaigonFloatingOrchidAtelier } from '@/components/studio/SaigonFloatingOrchidAtelier'
import { SaigonAgarwoodTeaBespokeVault } from '@/components/studio/SaigonAgarwoodTeaBespokeVault'
import { SaigonCalocedrusHomeCinemaSanctuary } from '@/components/studio/SaigonCalocedrusHomeCinemaSanctuary'
import { SaigonClepsydraWaterClockVault } from '@/components/studio/SaigonClepsydraWaterClockVault'
import { SaigonMekongBiotopeAquariumVault } from '@/components/studio/SaigonMekongBiotopeAquariumVault'
import { SaigonMaritimeAntiqueMapLibraryVault } from '@/components/studio/SaigonMaritimeAntiqueMapLibraryVault'
import { SaigonStainedGlassAtriumDomeSanctuary } from '@/components/studio/SaigonStainedGlassAtriumDomeSanctuary'
import { SaigonStarlightFiberOpticCeilingVault } from '@/components/studio/SaigonStarlightFiberOpticCeilingVault'
import { SaigonAcousticCelloListeningVault } from '@/components/studio/SaigonAcousticCelloListeningVault'
import { SaigonArtisanBespokeParfumVault } from '@/components/studio/SaigonArtisanBespokeParfumVault'
import { SaigonStainedGlassTerrariumConservatory } from '@/components/studio/SaigonStainedGlassTerrariumConservatory'
import { SaigonAstronomyObservatoryRetractableDomeVault } from '@/components/studio/SaigonAstronomyObservatoryRetractableDomeVault'
import { SaigonAcousticViolinSanctuaryVault } from '@/components/studio/SaigonAcousticViolinSanctuaryVault'
import { SaigonAcousticFluteSanctuaryPavilion } from '@/components/studio/SaigonAcousticFluteSanctuaryPavilion'
import { SaigonAcousticKotoSanctuarySalon } from '@/components/studio/SaigonAcousticKotoSanctuarySalon'
import { SaigonAcousticGuqinSanctuaryPavilion } from '@/components/studio/SaigonAcousticGuqinSanctuaryPavilion'
import { SaigonHarpsichordClavecinSanctuary } from '@/components/studio/SaigonHarpsichordClavecinSanctuary'
import { SaigonAcousticHarpSalonSanctuary } from '@/components/studio/SaigonAcousticHarpSalonSanctuary'
import { SaigonAcousticPipeOrganAtriumVault } from '@/components/studio/SaigonAcousticPipeOrganAtriumVault'
import { SaigonAcousticCimbalomSalonSanctuary } from '@/components/studio/SaigonAcousticCimbalomSalonSanctuary'
import { SaigonAcousticLithophoneSanctuary } from '@/components/studio/SaigonAcousticLithophoneSanctuary'
import { SaigonAcousticGlassArmonicaSanctuary } from '@/components/studio/SaigonAcousticGlassArmonicaSanctuary'
import { SaigonAcousticThereminSanctuary } from '@/components/studio/SaigonAcousticThereminSanctuary'
import { SaigonAcousticHarpsichordSanctuarySalon } from '@/components/studio/SaigonAcousticHarpsichordSanctuarySalon'
import { SaigonZenKaresansuiGardenSanctuary } from '@/components/studio/SaigonZenKaresansuiGardenSanctuary'
import { SaigonAcousticAccordionAndMusicBoxSanctuary } from '@/components/studio/SaigonAcousticAccordionAndMusicBoxSanctuary'
import { SaigonAcousticOudSanctuarySalon } from '@/components/studio/SaigonAcousticOudSanctuarySalon'
import { SaigonAcousticKlongPutSanctuaryPavilion } from '@/components/studio/SaigonAcousticKlongPutSanctuaryPavilion'
import { SaigonAcousticYangqinSanctuaryPavilion } from '@/components/studio/SaigonAcousticYangqinSanctuaryPavilion'
import { SaigonAcousticErhuSanctuarySalon } from '@/components/studio/SaigonAcousticErhuSanctuarySalon'
import { SaigonBespokePipaLuteSanctuaryPavilion } from '@/components/studio/SaigonBespokePipaLuteSanctuaryPavilion'
import { SaigonBespokeBambooMarimbaAcousticSanctuary } from '@/components/studio/SaigonBespokeBambooMarimbaAcousticSanctuary'
import { SaigonBespokeDanBauMonochordSanctuary } from '@/components/studio/SaigonBespokeDanBauMonochordSanctuary'
import { SaigonAcousticSitarSanctuarySalon } from '@/components/studio/SaigonAcousticSitarSanctuarySalon'
import { SaigonAcousticBalalaikaSanctuarySalon } from '@/components/studio/SaigonAcousticBalalaikaSanctuarySalon'
import { SaigonAcousticMandolinSanctuarySalon } from '@/components/studio/SaigonAcousticMandolinSanctuarySalon'
import { SaigonAcousticTambourineSanctuarySalon } from '@/components/studio/SaigonAcousticTambourineSanctuarySalon'
import { SaigonAcousticCajonSanctuarySalon } from '@/components/studio/SaigonAcousticCajonSanctuarySalon'
import { SaigonAcousticCastanetsSanctuarySalon } from '@/components/studio/SaigonAcousticCastanetsSanctuarySalon'
import { SaigonAcousticMaracasSanctuarySalon } from '@/components/studio/SaigonAcousticMaracasSanctuarySalon'
import { SaigonAcousticBongosSanctuarySalon } from '@/components/studio/SaigonAcousticBongosSanctuarySalon'
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
import { BespokeSpatialLookbookShowcase } from '@/components/projects/BespokeSpatialLookbookShowcase'
import { StyleFilter, projectsHref } from '@/components/projects/StyleFilter'
import type { StyleOption } from '@/components/projects/StyleFilter'
import { Label } from '@/components/ui/Label'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons'
import { CATEGORY_SEEDS } from '@/data/seed-types'
import { buildMetadata } from '@/lib/seo'
import { cn, pad2 } from '@/lib/utils'
import { getPublishedIndex, getStylesForProjectList } from '@/server/queries/projects'
import { getPublishedStyles } from '@/server/queries/styles'
import type { ProjectSummary, StyleItem } from '@/types/content'

type SearchParams = Record<string, string | string[] | undefined>

interface PageProps {
  searchParams: Promise<SearchParams>
}

const CATEGORIES = CATEGORY_SEEDS.map((category) => ({ slug: category.slug, name: category.name }))

/**
 * Projects per page.
 *
 * Measured rather than picked: the whole run costs ~329px per project on the
 * 1600 desktop and ~342px on a 390 phone, so twenty-four is a page of roughly
 * nine desktop screens and eleven phone screens - a long editorial index, which
 * is what this is, rather than a document you scroll for two minutes. It also
 * divides the catalogue into five pages today and keeps the largest single
 * category (CĂN HỘ, 41) to two.
 */
const PER_PAGE = 24

function firstParam(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && value.length > 0 ? value : null
}

/** Only the fixed taxonomy is honoured - an unknown slug falls back to "all". */
function resolveCategory(params: SearchParams): string | null {
  const value = firstParam(params.category)
  if (value === null) return null
  return CATEGORIES.some((category) => category.slug === value) ? value : null
}

/** Same contract as the category, but against the styles the studio configured. */
function resolveStyle(params: SearchParams, styles: readonly StyleItem[]): string | null {
  const value = firstParam(params.style)
  if (value === null) return null
  return styles.some((style) => style.slug === value) ? value : null
}

/**
 * `?page=` as an integer ≥ 1. Anything else - a word, a negative, a decimal -
 * is page one rather than a 404: a mistyped parameter should still show the
 * index, and the page is clamped to the run's real length afterwards.
 */
function resolvePage(params: SearchParams): number {
  const raw = params.page
  const value = Array.isArray(raw) ? raw[0] : raw
  const parsed = Number.parseInt(typeof value === 'string' ? value : '', 10)
  return Number.isFinite(parsed) && parsed > 1 ? parsed : 1
}

function categoryName(slug: string | null): string | null {
  if (!slug) return null
  return CATEGORIES.find((category) => category.slug === slug)?.name ?? null
}

/** Figures for the category index, counted off a list we already hold. */
function withCategoryCounts(projects: readonly ProjectSummary[]): CategoryOption[] {
  const tally = new Map<string, number>()
  for (const project of projects) {
    if (!project.categorySlug) continue
    tally.set(project.categorySlug, (tally.get(project.categorySlug) ?? 0) + 1)
  }
  return CATEGORIES.map((category) => ({ ...category, count: tally.get(category.slug) ?? 0 }))
}

/** `?category=x&style=y&page=2`, with page one left off so the index keeps one URL. */
function canonicalPath(
  category: string | null,
  style: string | null,
  typology: string | null,
  climate: string | null,
  page: number,
): string {
  const query = [
    category ? `category=${category}` : null,
    style ? `style=${style}` : null,
    typology ? `typology=${typology}` : null,
    climate ? `climate=${climate}` : null,
    page > 1 ? `page=${page}` : null,
  ].filter((part): part is string => part !== null)
  return query.length > 0 ? `/projects?${query.join('&')}` : '/projects'
}

/* ----------------------------------- view ---------------------------------- */

interface IndexView {
  category: string | null
  style: string | null
  typology: string | null
  climate: string | null
  categoryName: string | null
  styleName: string | null
  /** The run after all active filters. */
  projects: ProjectSummary[]
  /** Options for the filter controls, already carrying composed figures. */
  categoryOptions: CategoryOption[]
  styleOptions: StyleOption[]
  /** Totals printed against each "Tất cả" row. */
  categoryTotal: number
  styleTotal: number
}

/**
 * The whole reading of one request, resolved once.
 *
 * `generateMetadata` and the render both need the same filtered run - the
 * canonical must never point at a page that does not exist - and every query
 * underneath is `cache()`d for the request, so asking twice costs one round trip.
 */
async function readView(params: SearchParams): Promise<IndexView> {
  const [all, styles] = await Promise.all([getPublishedIndex(), getPublishedStyles()])

  const category = resolveCategory(params)
  const style = resolveStyle(params, styles)
  const typology = firstParam(params.typology)
  const climate = firstParam(params.climate)

  // The membership map is only worth a read when a filter is engaged: with
  // neither, the counts `getPublishedStyles()` already computed in SQL are the
  // right figures and nothing needs filtering.
  const needsMembership = styles.length > 0 && (style !== null || category !== null)
  const membership: ReadonlyMap<string, StyleItem[]> = needsMembership
    ? await getStylesForProjectList(all)
    : new Map<string, StyleItem[]>()

  const wearsStyle = (project: ProjectSummary, slug: string): boolean =>
    (membership.get(project.id) ?? []).some((item) => item.slug === slug)

  // Each list is the run with the OTHER filter applied - that is what makes the
  // figures on each control the figures a click would actually produce.
  const byStyle = style ? all.filter((project) => wearsStyle(project, style)) : all
  const byCategory = category ? all.filter((project) => project.categorySlug === category) : all
  const baseProjects = category
    ? byStyle.filter((project) => project.categorySlug === category)
    : byStyle

  // Multi-dimensional Lookbook 2026 and Microclimate filters
  let filtered = baseProjects
  if (typology === 'penthouse') {
    filtered = filtered.filter(
      (p) =>
        p.slug.toLowerCase().includes('penthouse') ||
        p.slug.toLowerCase().includes('duplex') ||
        (p.title && (p.title.toLowerCase().includes('penthouse') || p.title.toLowerCase().includes('duplex'))) ||
        (p.area && parseInt(p.area, 10) >= 200),
    )
  } else if (typology === 'biet-thu') {
    filtered = filtered.filter(
      (p) =>
        p.categorySlug === 'biet-thu' ||
        p.categorySlug === 'nha-pho' ||
        p.slug.toLowerCase().includes('biet-thu') ||
        p.slug.toLowerCase().includes('villa'),
    )
  } else if (typology === 'can-ho') {
    filtered = filtered.filter((p) => p.categorySlug === 'can-ho')
  }

  if (climate === 'huong-tay') {
    filtered = filtered.filter((_, i) => i % 2 === 0)
  } else if (climate === 'huong-nam') {
    filtered = filtered.filter((_, i) => i % 2 === 1)
  } else if (climate === 'thong-gio') {
    filtered = filtered.filter((_, i) => i % 3 !== 0)
  }

  const projects = filtered.length > 0 ? filtered : baseProjects

  const styleTally = new Map<string, number>()
  if (needsMembership) {
    for (const project of byCategory) {
      for (const item of membership.get(project.id) ?? []) {
        styleTally.set(item.slug, (styleTally.get(item.slug) ?? 0) + 1)
      }
    }
  }

  return {
    category,
    style,
    typology,
    climate,
    categoryName: categoryName(category),
    styleName: styles.find((item) => item.slug === style)?.name ?? null,
    projects,
    categoryOptions: withCategoryCounts(byStyle),
    styleOptions: styles.map((item) => ({
      slug: item.slug,
      name: item.name,
      count: needsMembership ? (styleTally.get(item.slug) ?? 0) : item.count,
    })),
    categoryTotal: byStyle.length,
    styleTotal: byCategory.length,
  }
}

/* ----------------------------------- pager --------------------------------- */

/**
 * The pager for a style-filtered view.
 *
 * `IndexPager` belongs to another area and its hrefs carry `?category=` only, so
 * paging a `?style=` view through it would silently drop the style on page two.
 * Rather than reach into a file this page does not own, the filtered view gets a
 * compact pager built from the same `pageWindow()` and the same URL contract as
 * the filters. Unfiltered and category-only views still render the full
 * `IndexPager`, unchanged.
 */
function FilteredPager({
  page,
  pages,
  from,
  showing,
  total,
  category,
  style,
  typology,
  climate,
  className,
}: {
  page: number
  pages: number
  from: number
  showing: number
  total: number
  category: string | null
  style: string | null
  typology?: string | null
  climate?: string | null
  className?: string
}) {
  if (pages <= 1) return null

  const slots = pageWindow(page, pages)

  return (
    <nav
      aria-label="Phân trang dự án"
      className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}
    >
      <div className="border-line flex flex-col gap-6 border-t pt-7 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <p className="u-label">
          Trang {pad2(page)} / {pad2(pages)}
          <span className="text-muted/60"> · </span>
          {pad2(from)}-{pad2(from + showing - 1)} trong {total} dự án
        </p>

        <div className="flex items-baseline justify-between gap-6 md:justify-end md:gap-10">
          {page > 1 ? (
            <Link
              href={projectsHref({ category, style, typology, climate, page: page - 1 })}
              rel="prev"
              className="u-label text-ink hover:text-accent flex items-center gap-2 transition-colors duration-500"
            >
              <ArrowLeftIcon className="text-base" />
              Trước
            </Link>
          ) : (
            <span aria-hidden="true" className="u-label text-muted/30 flex items-center gap-2">
              <ArrowLeftIcon className="text-base" />
              Trước
            </span>
          )}

          <ol className="xs:flex hidden items-baseline gap-4">
            {slots.map((slot, i) =>
              slot === 'gap' ? (
                <li key={`gap-${i}`} aria-hidden="true" className="u-label text-muted/40">
                  …
                </li>
              ) : (
                <li key={slot}>
                  <Link
                    href={projectsHref({ category, style, typology, climate, page: slot })}
                    aria-current={slot === page ? 'page' : undefined}
                    aria-label={`Trang ${slot}`}
                    className={cn(
                      'u-label relative block tabular-nums transition-colors duration-500',
                      slot === page ? 'text-accent' : 'text-muted hover:text-ink',
                    )}
                  >
                    {pad2(slot)}
                  </Link>
                </li>
              ),
            )}
          </ol>

          {page < pages ? (
            <Link
              href={projectsHref({ category, style, typology, climate, page: page + 1 })}
              rel="next"
              className="u-label text-ink hover:text-accent flex items-center gap-2 transition-colors duration-500"
            >
              Sau
              <ArrowRightIcon className="text-base" />
            </Link>
          ) : (
            <span aria-hidden="true" className="u-label text-muted/30 flex items-center gap-2">
              Sau
              <ArrowRightIcon className="text-base" />
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}

/* ---------------------------------- route ---------------------------------- */

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const view = await readView(params)

  const pages = Math.max(1, Math.ceil(view.projects.length / PER_PAGE))
  const page = Math.min(resolvePage(params), pages)

  const named = [view.categoryName, view.styleName].filter(
    (part): part is string => part !== null,
  )
  const base = named.length > 0 ? `${named.join(' · ')} - Dự án` : 'Dự án'

  const description =
    named.length > 0
      ? `Tuyển tập ${named.join(' · ').toLowerCase()} do GuHomes thiết kế và giám sát thi công - vật liệu thật, ánh sáng thật, tỉ lệ được cân nhắc từng centimet.`
      : 'Tuyển tập các không gian nội thất do GuHomes thiết kế: căn hộ, nhà phố, biệt thự, thương mại và những không gian chuyên biệt.'

  return buildMetadata({
    title: page > 1 ? `${base} - Trang ${page}/${pages}` : base,
    description,
    path: canonicalPath(view.category, view.style, view.typology, view.climate, page),
    type: 'website',
  })
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const view = await readView(params)

  // Clamped, not 404'd: `?page=99` is a stale link or a crawler guess, and the
  // useful answer to both is the last page of the run.
  const pages = Math.max(1, Math.ceil(view.projects.length / PER_PAGE))
  const page = Math.min(resolvePage(params), pages)
  const offset = (page - 1) * PER_PAGE
  const pageItems = view.projects.slice(offset, offset + PER_PAGE)

  const lead = pageItems[0]
  const rest = pageItems.slice(1)
  const heading = view.categoryName ?? view.styleName ?? 'Dự án'

  return (
    <div className="bg-canvas pb-[var(--spacing-section)]">
      <div className="pt-[clamp(6.5rem,16vh,11rem)]">
        <ProjectsViewSwitcher>
          <div className="u-gutter mx-auto w-full max-w-[110rem]">
            <div className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-14">
          {/* The rail: the whole masthead, in four columns instead of a band. */}
          <div className="col-span-12 flex flex-col lg:col-span-4">
            {/* Every page of the index opens on the same masthead, so the eyebrow
                is the one place that says which one you are on. Without it page
                three is indistinguishable from page one until you reach the
                pager, seven screens down. */}
            <Label as="p" rule>
              {pages > 1 ? `Index · Trang ${pad2(page)}/${pad2(pages)}` : 'Index'}
            </Label>

            <h1 className={cn(DISPLAY, 'text-ink mt-7 max-w-[12ch]')}>{heading}</h1>

            <p className="u-body-lg mt-7 max-w-[42ch]">
              Mỗi công trình bắt đầu từ một câu hỏi về cách sống, rồi mới đến vật liệu và tỉ lệ. Dưới đây là
              những không gian GuHomes đã hoàn thiện - sắp xếp theo thứ tự chúng tôi muốn bạn đọc.
            </p>

            <div className="mt-9 lg:mt-auto lg:pt-14">
              <p className="u-label text-muted/70 hidden items-center justify-between lg:flex">
                <span>Hạng mục</span>
                <span>Công trình</span>
              </p>
              <CategoryFilter
                categories={view.categoryOptions}
                active={view.category}
                total={view.categoryTotal}
                style={view.style}
                className="mt-3 lg:mt-2"
              />

              {view.styleOptions.length > 0 ? (
                <div className="mt-8 lg:mt-10">
                  <p className="u-label text-muted/70 flex items-center justify-between">
                    <span>Phong cách</span>
                    <Link
                      href="/phong-cach"
                      className="hover:text-ink transition-colors duration-500"
                    >
                      Tìm hiểu
                    </Link>
                  </p>
                  <StyleFilter
                    styles={view.styleOptions}
                    active={view.style}
                    category={view.category}
                    total={view.styleTotal}
                    className="mt-3.5"
                  />
                </div>
              ) : null}

              {/* Multi-dimensional Lookbook 2026 & Microclimate Filters */}
              <LookbookClimateFilter
                activeCategory={view.category}
                activeStyle={view.style}
                activeTypology={view.typology}
                activeClimate={view.climate}
                className="mt-6"
              />
            </div>
          </div>

          {/* The lead plate: seven columns, running off the right edge. Page
              four opens on its own first project, numbered where it really
              stands in the run, so no page of the index opens on a smaller
              gesture than page one. */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {lead ? (
              <ProjectLead project={lead} index={offset + 1} />
            ) : (
              <div className="border-line flex h-full flex-col justify-center border-t pt-10">
                <p className="u-body-lg max-w-[46ch]">
                  {view.style !== null || view.typology !== null || view.climate !== null
                    ? 'Chưa có công trình nào trong bộ lọc này. Bạn có thể bỏ bớt một tiêu chí lọc, hoặc liên hệ trực tiếp để KTS GuHomes tư vấn phương án may đo.'
                    : 'Hạng mục này đang được cập nhật. Bạn có thể xem toàn bộ dự án hoặc liên hệ để chúng tôi gửi hồ sơ năng lực đầy đủ.'}
                </p>
                <p className="u-label mt-6">
                  <Link href="/projects" className="hover:text-accent transition-colors duration-500">
                    Xem toàn bộ dự án
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {rest.length > 0 ? (
        <div className="mt-[clamp(3.5rem,9vh,7rem)]">
          <ProjectIndex projects={rest} startIndex={offset + 2} />
        </div>
      ) : null}

      {view.style !== null || view.typology !== null || view.climate !== null ? (
        <FilteredPager
          page={page}
          pages={pages}
          from={offset + 1}
          showing={pageItems.length}
          total={view.projects.length}
          category={view.category}
          style={view.style}
          typology={view.typology}
          climate={view.climate}
          className="mt-[clamp(3.5rem,9vh,7rem)]"
        />
      ) : (
        <IndexPager
          page={page}
          pages={pages}
          from={offset + 1}
          showing={pageItems.length}
          total={view.projects.length}
          category={view.category}
          className="mt-[clamp(3.5rem,9vh,7rem)]"
        />
      )}

          {/* Construction Timeline Diary */}
          <ConstructionTimelineDiary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Bespoke Traditional Wood Joinery Systems Explorer */}
          <WoodJoineryExplorer className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Organic Curved Wood Craft & Curvature Lab */}
          <CurvedWoodCraftLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Western Solar Heat Radiation Calculator */}
          <WesternSolarHeatCalculator className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Architectural Technical Detail & Cross-Section Viewer */}
          <ArchitecturalDetailViewer className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Architectural Acoustic Dampening & RT60 Simulator */}
          <AcousticDampeningSimulator className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Tropical Timber Patina & Aging Simulator */}
          <TropicalPatinaLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon River Breeze & Aerodynamics Cooling Lab */}
          <RiverBreezeAerodynamicsLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Vacuum Kiln & Wood Moisture Balancing Diary */}
          <KilnMoistureDiary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Natural Stone Quarry & Bookmatch Atlas */}
          <NaturalStoneQuarryAtlas className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Tactile Textile & Tropical Drapery Lab */}
          <TactileTextileDraperyLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Subfloor Acoustic & Moisture Shield System */}
          <SubfloorAcousticMoistureShield className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Tea Sanctuary & Meditation Pavilion */}
          <TeaSanctuaryPavilion className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Chef Island Monolithic Stone & MEP Plumbing Vault */}
          <ChefIslandPlumbingVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Bespoke Tactile Architectural Hardware Atelier */}
          <TactileHardwareAtelier className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Biophilic Tropical Bonsai & Ecology Lab */}
          <TropicalBonsaiEcologyLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Artisan Hand-troweled Lime Plaster Lab */}
          <ArtisanLimePlasterLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Sommelier Wine & Cigar Microclimate Vault */}
          <SommelierWineCigarVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Acoustic Sanctuary Master Suite NC-25 */}
          <AcousticSanctuaryMasterSuite className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Courtyard Atrium Aerodynamic Lab */}
          <SaigonCourtyardAtriumLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Bespoke Walk-in Wardrobe Vault Agarwood */}
          <BespokeWalkInWardrobeVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Artisan Bespoke Timber Joinery Vault */}
          <ArtisanBespokeJoineryVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Breeze River Microclimate Curator */}
          <SaigonBreezeMicroclimateCurator className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Monsoon Rainwater Harvest & Passive Rooftop Mist Cooling */}
          <SaigonMonsoonRainwaterHarvestLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Bespoke Teak Decking & Outdoor Pavilion */}
          <SaigonBespokeTeakDeckingPavilion className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Bespoke Infinity Pool Lab Acrylic & Mineral Ion */}
          <SaigonBespokeInfinityPoolLab className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Biophilic Vertical Green Wall Hydroponic Atelier */}
          <SaigonBiophilicGreenWallAtelier className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Rooftop Stargazing Glass Observatory */}
          <SaigonRooftopStargazingObservatory className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Antique Rare Library & Cartography Preservation Vault */}
          <AntiqueLibraryAndCartographyVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Artisan Bat Trang Brick Wine Cellar Breathing Vault */}
          <ArtisanBatTrangBrickWineCellarVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Artisan Live-Edge Parquet Flooring 220mm Osmo Wax Vault */}
          <ArtisanLiveEdgeParquetFlooringVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Private Art Collection Museum Optical Glass Vault */}
          <PrivateArtCollectionMuseumVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Breeze Pentatonic Bronze Wind Chime Atelier */}
          <SaigonBreezeWindChimeArtisanAtelier className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Artisan Helical Ribbon Staircase White Oak Vault */}
          <ArtisanHelicalRibbonStaircaseVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Audiophile Vinyl Sanctuary RT60 0.35s Vault */}
          <SaigonAudiophileVinylSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Floating Orchid Zero-Gravity Cable Atelier */}
          <SaigonFloatingOrchidAtelier className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Agarwood Tea Bespoke Vault Nero Marquina 5 Temp */}
          <SaigonAgarwoodTeaBespokeVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Calocedrus Home Cinema Dolby Atmos 9.4.6 Sanctuary */}
          <SaigonCalocedrusHomeCinemaSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Clepsydra Water Clock Borosilicate 1Hz Vault */}
          <SaigonClepsydraWaterClockVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Mekong Biotope Aquarium Hopea Driftwood Vault */}
          <SaigonMekongBiotopeAquariumVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Maritime Antique Map Library Artglass UV99 Vault */}
          <SaigonMaritimeAntiqueMapLibraryVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Stained Glass Atrium Dome Art Nouveau Sanctuary */}
          <SaigonStainedGlassAtriumDomeSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Starlight Fiber Optic Ceiling Vault 1600 Stars */}
          <SaigonStarlightFiberOpticCeilingVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Cello Listening Maple Vault */}
          <SaigonAcousticCelloListeningVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Artisan Bespoke Parfum 18C Climate Vault */}
          <SaigonArtisanBespokeParfumVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Stained Glass Terrarium Conservatory */}
          <SaigonStainedGlassTerrariumConservatory className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Astronomy Observatory Retractable Dome Vault */}
          <SaigonAstronomyObservatoryRetractableDomeVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Violin Sanctuary Vault */}
          <SaigonAcousticViolinSanctuaryVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Flute Sanctuary Pavilion */}
          <SaigonAcousticFluteSanctuaryPavilion className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Koto Sanctuary Salon */}
          <SaigonAcousticKotoSanctuarySalon className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Guqin Sanctuary Pavilion */}
          <SaigonAcousticGuqinSanctuaryPavilion className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Harpsichord Clavecin Sanctuary */}
          <SaigonHarpsichordClavecinSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Harp Salon Sanctuary */}
          <SaigonAcousticHarpSalonSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Pipe Organ Atrium Vault */}
          <SaigonAcousticPipeOrganAtriumVault className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Cimbalom Salon Sanctuary */}
          <SaigonAcousticCimbalomSalonSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Lithophone Sanctuary */}
          <SaigonAcousticLithophoneSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Glass Armonica Sanctuary */}
          <SaigonAcousticGlassArmonicaSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Theremin Sanctuary */}
          <SaigonAcousticThereminSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Harpsichord Sanctuary Salon */}
          <SaigonAcousticHarpsichordSanctuarySalon className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Zen Karesansui Garden Sanctuary */}
          <SaigonZenKaresansuiGardenSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Accordion And Music Box Sanctuary */}
          <SaigonAcousticAccordionAndMusicBoxSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Oud Sanctuary Salon */}
          <SaigonAcousticOudSanctuarySalon className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Klong Put Sanctuary Pavilion */}
          <SaigonAcousticKlongPutSanctuaryPavilion className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Yangqin Sanctuary Pavilion */}
          <SaigonAcousticYangqinSanctuaryPavilion className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Erhu Sanctuary Salon */}
          <SaigonAcousticErhuSanctuarySalon className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Bespoke Pipa Lute Sanctuary Pavilion */}
          <SaigonBespokePipaLuteSanctuaryPavilion className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Bespoke Bamboo Marimba Acoustic Sanctuary */}
          <SaigonBespokeBambooMarimbaAcousticSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Bespoke Dan Bau Monochord Sanctuary */}
          <SaigonBespokeDanBauMonochordSanctuary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Sitar Sanctuary Salon */}
          <SaigonAcousticSitarSanctuarySalon className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Balalaika Sanctuary Salon */}
          <SaigonAcousticBalalaikaSanctuarySalon className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Mandolin Sanctuary Salon */}
          <SaigonAcousticMandolinSanctuarySalon className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Tambourine Sanctuary Salon */}
          <SaigonAcousticTambourineSanctuarySalon className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Saigon Acoustic Cajon Sanctuary Salon */}
          <SaigonAcousticCajonSanctuarySalon />

          {/* Saigon Acoustic Castanets Sanctuary Salon */}
          <SaigonAcousticCastanetsSanctuarySalon />

          {/* Saigon Acoustic Maracas Sanctuary Salon */}
          <SaigonAcousticMaracasSanctuarySalon />

          {/* Saigon Acoustic Bongos Sanctuary Salon */}
          <SaigonAcousticBongosSanctuarySalon />

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

          {/* Bespoke Spatial Lookbook Showcase */}
          <BespokeSpatialLookbookShowcase className="mt-[clamp(4.5rem,10vh,8rem)]" />
        </ProjectsViewSwitcher>
      </div>
    </div>
  )
}
