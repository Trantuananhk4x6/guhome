import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { mediaUrl } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { getPublishedProjects } from '@/server/queries/projects'
import { getThemeSettings } from '@/server/queries/site'
import type { ProjectSummary } from '@/types/content'

import { ContactForm } from './_components/ContactForm'
import { Reveal, TextReveal } from './_components/motion'
import { OpenSocialModalButton, SocialTrigger } from '@/components/layout/SocialTrigger'
import { VipBookingCalendar } from '@/components/consultation/VipBookingCalendar'
import { VipConciergePortal } from '@/components/consultation/VipConciergePortal'
import { ClientChroniclesSection } from '@/components/sections/ClientChroniclesSection'
import { DigitalHandoverVault } from '@/components/services/DigitalHandoverVault'
import { ContractorComparisonMatrix } from '@/components/sections/ContractorComparisonMatrix'
import { KeyHandoverRitualVault } from '@/components/sections/KeyHandoverRitualVault'
import { EstateRenovationDiagnostic } from '@/components/tools/EstateRenovationDiagnostic'
import { CashflowMilestoneScheduler } from '@/components/tools/CashflowMilestoneScheduler'
import { BespokeTimberCareVault } from '@/components/tools/BespokeTimberCareVault'
import { LeadArchitectPrivateSession } from '@/components/consultation/LeadArchitectPrivateSession'
import { DigitalTwinEstateAudit } from '@/components/tools/DigitalTwinEstateAudit'
import { ArtisanCraftsmanPassport } from '@/components/tools/ArtisanCraftsmanPassport'
import { ConciergeWhiteGloveMovingAudit } from '@/components/tools/ConciergeWhiteGloveMovingAudit'
import { PrivateFamilyArchiveVault } from '@/components/tools/PrivateFamilyArchiveVault'
import { ArtisanHandmadeRugStudio } from '@/components/tools/ArtisanHandmadeRugStudio'
import { PrivateYachtBerthAndHelipadConcierge } from '@/components/tools/PrivateYachtBerthAndHelipadConcierge'
import { MasterArchitecturalDossierArchive } from '@/components/tools/MasterArchitecturalDossierArchive'
import { PrivateEstateDigitalButlerPortal } from '@/components/tools/PrivateEstateDigitalButlerPortal'
import { ArtisanShanTuyetTeaSanctuary } from '@/components/tools/ArtisanShanTuyetTeaSanctuary'
import { ArtisanHinokiVolcanicSaunaSanctuary } from '@/components/tools/ArtisanHinokiVolcanicSaunaSanctuary'
import { RiversideDawnZenYogaPavilion } from '@/components/tools/RiversideDawnZenYogaPavilion'
import { RiversideCigarLoungeAndHumidorSanctuary } from '@/components/tools/RiversideCigarLoungeAndHumidorSanctuary'
import { PrivateFamilySanctuaryPanicRoom } from '@/components/tools/PrivateFamilySanctuaryPanicRoom'
import { ArtisanBotanicalCurtainAtelier } from '@/components/tools/ArtisanBotanicalCurtainAtelier'
import { PrivateHimalayanSaltCaveWellnessVault } from '@/components/tools/PrivateHimalayanSaltCaveWellnessVault'
import { ArtisanMarbleSundialGardenVault } from '@/components/tools/ArtisanMarbleSundialGardenVault'
import { ArtisanDamascusSteelChefKnifeAtelier } from '@/components/tools/ArtisanDamascusSteelChefKnifeAtelier'
import { ArtisanRiverPebbleAcupressureWalkway } from '@/components/tools/ArtisanRiverPebbleAcupressureWalkway'
import { SaigonMangroveBoutiqueEcologyLab } from '@/components/tools/SaigonMangroveBoutiqueEcologyLab'
import { PrivateWhiskyLibraryAndCaskVault } from '@/components/tools/PrivateWhiskyLibraryAndCaskVault'
import { ArtisanIndoorMedicinalHerbGardenAtelier } from '@/components/tools/ArtisanIndoorMedicinalHerbGardenAtelier'
import { ArtisanBronzeBonsaiWaterFeatureAtelier } from '@/components/tools/ArtisanBronzeBonsaiWaterFeatureAtelier'
import { ArtisanJapaneseTatamiChashitsuTeaAtelier } from '@/components/tools/ArtisanJapaneseTatamiChashitsuTeaAtelier'
import { ArtisanGoldLeafCalligraphyCabinetryAtelier } from '@/components/tools/ArtisanGoldLeafCalligraphyCabinetryAtelier'
import { ArtisanBronzeIncenseBurnerAtelier } from '@/components/tools/ArtisanBronzeIncenseBurnerAtelier'
import { ArtisanHandmadeTerracottaPlanterAtelier } from '@/components/tools/ArtisanHandmadeTerracottaPlanterAtelier'
import { ArtisanGoldLeafTeaCanisterAtelier } from '@/components/tools/ArtisanGoldLeafTeaCanisterAtelier'
import { ArtisanBespokeSilverCutleryVault } from '@/components/tools/ArtisanBespokeSilverCutleryVault'
import { ArtisanBronzeWindGongSanctuaryAtelier } from '@/components/tools/ArtisanBronzeWindGongSanctuaryAtelier'
import { ArtisanBronzeIncenseSealSanctuary } from '@/components/tools/ArtisanBronzeIncenseSealSanctuary'
import { ArtisanBronzeIncenseFurnaceVault } from '@/components/tools/ArtisanBronzeIncenseFurnaceVault'
import { ArtisanHandmadeDamascusCleaverCulinaryAtelier } from '@/components/tools/ArtisanHandmadeDamascusCleaverCulinaryAtelier'
import { ArtisanImperialSilverChasedTeapotAtelier } from '@/components/tools/ArtisanImperialSilverChasedTeapotAtelier'
import { ArtisanGoldFiligreeJewelryAndCasketAtelier } from '@/components/tools/ArtisanGoldFiligreeJewelryAndCasketAtelier'
import { ArtisanHandmadeHornAndTortoiseshellCombAtelier } from '@/components/tools/ArtisanHandmadeHornAndTortoiseshellCombAtelier'
import { ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier } from '@/components/tools/ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier'
import { ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier } from '@/components/tools/ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier'
import { ArtisanHandmadeCloisonneEnamelTeaSetAtelier } from '@/components/tools/ArtisanHandmadeCloisonneEnamelTeaSetAtelier'
import { ArtisanMotherOfPearlJewelryCasketAtelier } from '@/components/tools/ArtisanMotherOfPearlJewelryCasketAtelier'
import { ArtisanRattanCoreLacquerTeaCaddyAtelier } from '@/components/tools/ArtisanRattanCoreLacquerTeaCaddyAtelier'
import { ArtisanPureSilverAgarwoodSnuffBottleAtelier } from '@/components/tools/ArtisanPureSilverAgarwoodSnuffBottleAtelier'

export const metadata: Metadata = buildMetadata({
  title: 'Liên hệ',
  description:
    'Thư nào gửi tới GuHomes cũng được đọc, dài hay ngắn. Có diện tích căn nhà và tháng bạn cần dọn vào thì hồi âm nói được điều gì đó cụ thể ngay từ lần đầu. Chúng tôi trả lời trong vòng 24 giờ làm việc.',
  path: '/contact',
})

interface DetailProps {
  label: string
  children: ReactNode
}

function Detail({ label, children }: DetailProps) {
  return (
    <div className="grid gap-3 border-t border-line py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
      <Label>{label}</Label>
      <div className="font-body text-[0.9375rem] leading-relaxed text-ink">{children}</div>
    </div>
  )
}

/**
 * THE ONE PHOTOGRAPH ON THIS PAGE.
 *
 * /contact was the only public route carrying no picture of the work at all —
 * 2,607px on desktop whose three `<img>` elements were the header logo, its
 * duplicate and the footer logo. On a site whose whole argument is 1,485 of the
 * studio's own photographs, the page where a visitor decides to write showed
 * none of them.
 *
 * No slug is named here. The band takes the first project the studio itself
 * ordered to the front of its featured list whose cover is a wide frame big
 * enough to fill a band — so it follows the admin's own ordering and needs no
 * editing when the catalogue changes. It is captioned with the project it
 * belongs to and links there, the way the STUDIO band captions its borrowed
 * photograph: this is a photograph *of a project*, and it must never be
 * mistaken for a photograph of the office.
 */
const BAND_MIN_WIDTH = 1600
const BAND_MIN_RATIO = 1.2

/**
 * The page's own question is "căn nhà của bạn đang ở tình trạng nào?", so the
 * frame that answers it should be somewhere a person lives. Seven of the eight
 * featured projects are; without this the band opened on a Japanese pedicure
 * spa directly under that sentence. Same taxonomy the form's own PROJECT_TYPES
 * select already uses, and an unknown slug simply falls through to the next
 * preference rather than emptying the band.
 */
const HOME_CATEGORIES: ReadonlySet<string> = new Set(['can-ho', 'nha-pho', 'biet-thu-resort'])

function fillsABand(project: ProjectSummary): boolean {
  const cover = project.cover
  if (!cover?.width || !cover.height) return false
  return cover.width >= BAND_MIN_WIDTH && cover.width / cover.height >= BAND_MIN_RATIO
}

function bandProject(projects: readonly ProjectSummary[]): ProjectSummary | null {
  const withCover = projects.filter((project) => project.cover !== null)
  const homes = withCover.filter(
    (project) => project.categorySlug !== null && HOME_CATEGORIES.has(project.categorySlug),
  )
  return homes.find(fillsABand) ?? homes[0] ?? withCover.find(fillsABand) ?? withCover[0] ?? null
}

export default async function ContactPage() {
  const [theme, featured] = await Promise.all([
    getThemeSettings(),
    // One unreachable table must not blank the page a client writes from.
    getPublishedProjects({ featured: true, limit: 8 }).catch((error: unknown) => {
      console.error('[contact] project query failed — the band will be omitted', error)
      return [] as ProjectSummary[]
    }),
  ])
  const { brand } = theme

  const showcase = bandProject(featured)
  const showcaseCover = showcase?.cover ?? null
  // A frame chosen from the photograph rather than assumed: the featured covers
  // run from 0.75 to 1.59, and a portrait dropped into a 3:2 band loses its top
  // and bottom.
  const showcasePortrait =
    showcaseCover?.width && showcaseCover.height
      ? showcaseCover.width / showcaseCover.height < 1
      : false
  const telHref = `tel:${brand.phone.replace(/[^\d+]/g, '')}`

  // The address is one editable string in the theme, but it reads as two lines:
  // the street, then the ward and city. Split on the first comma so the card
  // keeps that rhythm without the admin having to type markup.
  const commaAt = brand.address.indexOf(',')
  const addressStreet = commaAt > 0 ? brand.address.slice(0, commaAt).trim() : brand.address
  const addressArea = commaAt > 0 ? brand.address.slice(commaAt + 1).trim() : ''
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`

  return (
    <div className="pb-[var(--spacing-section)]">
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto w-full max-w-[100rem]">
          <Label rule index="—">
            Liên hệ
          </Label>

          <TextReveal as="h1" className="u-display mt-10 max-w-[15ch] text-ink">
            Căn nhà của bạn đang ở tình trạng nào?
          </TextReveal>

          <Reveal delay={0.15} className="mt-12 max-w-[54ch]">
            <p className="u-body-lg">
              Thư nào gửi tới cũng được đọc, dài hay ngắn. Nhưng nếu trong đó có diện tích căn nhà
              và tháng bạn cần dọn vào, hồi âm của chúng tôi sẽ nói được điều gì đó cụ thể ngay từ
              lần đầu. Thiếu hai con số ấy cũng không sao. Chỉ là khi đó chúng tôi hỏi nhiều hơn
              trả lời.
            </p>
          </Reveal>
        </div>
      </section>

      {showcase && showcaseCover ? (
        <section className="u-gutter mt-[calc(var(--spacing-section)*0.55)]">
          <div className="mx-auto grid w-full max-w-[100rem] items-end gap-10 lg:grid-cols-12 lg:gap-x-8">
            <Reveal variant="revealClip" className="lg:col-span-7 lg:col-start-1">
              <div
                className={
                  showcasePortrait
                    ? 'relative aspect-[4/5] w-full overflow-hidden bg-surface-alt'
                    : 'relative aspect-[4/3] w-full overflow-hidden bg-surface-alt sm:aspect-[3/2]'
                }
              >
                <Image
                  src={mediaUrl(showcaseCover, 1600)}
                  alt={showcaseCover.alt ?? showcase.title}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                  {...(showcaseCover.blurDataURL
                    ? { placeholder: 'blur' as const, blurDataURL: showcaseCover.blurDataURL }
                    : {})}
                />
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
              {/* Named, not implied. The caption says which project this is and
                  links to it, so the frame is never read as the studio's room. */}
              <Label rule>Công trình</Label>
              <p className="mt-7 font-display text-[1.5rem] leading-[1.38] font-normal text-ink sm:text-[1.75rem]">
                {showcase.title}
              </p>
              {showcase.subtitle ? (
                <p className="u-label mt-4 text-muted">{showcase.subtitle}</p>
              ) : null}
              {showcase.location ? (
                <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-muted">
                  {showcase.location}
                </p>
              ) : null}
              <Link
                href={`/projects/${showcase.slug}`}
                className="group u-label mt-7 inline-flex items-center gap-3 text-ink transition-colors duration-500 ease-editorial hover:text-accent"
              >
                Xem công trình này
                <ArrowUpRightIcon className="text-base transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="u-gutter mt-[calc(var(--spacing-section)*0.6)]">
        <div className="mx-auto grid w-full max-w-[100rem] gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <Reveal variant="revealUp">
              <Label rule>Studio</Label>

              {/*
                The address and the phone are the two things a visitor who has
                decided actually goes looking for, so they leave the label/value
                list and take a card of their own: an accent edge, the oat
                surface, and the street set in the display face. Square corners
                and a hairline keep it inside the design language.
              */}
              <address className="mt-8 border border-line border-t-2 border-t-accent bg-surface px-6 py-8 not-italic sm:px-8 sm:py-9">
                <Label>Địa chỉ studio</Label>
                <p className="mt-4 font-display text-[1.75rem] leading-[1.38] font-normal text-ink sm:text-[2.125rem]">
                  {addressStreet}
                  {addressArea ? (
                    <>
                      <br />
                      <span className="text-muted">{addressArea}</span>
                    </>
                  ) : null}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <a
                    href={telHref}
                    className="font-display text-[1.375rem] leading-none font-normal text-ink transition-colors duration-500 ease-editorial hover:text-accent sm:text-[1.625rem]"
                  >
                    {brand.phone}
                  </a>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="u-label text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-500 ease-editorial hover:decoration-accent"
                  >
                    Chỉ đường →
                  </a>
                </div>

                <p className="mt-6 font-body text-[0.9375rem] leading-relaxed text-muted">
                  Ghé thì báo trước một hôm. Cái bàn dài giữa studio gần như lúc nào cũng đang bày
                  mẫu của công trình đang chạy, nên phải dọn bớt mới có chỗ cho bạn ngồi.
                </p>
              </address>

              <div className="mt-8">
                <Detail label="Email">
                  <a
                    href={`mailto:${brand.email}`}
                    className="underline decoration-line underline-offset-4 transition-colors duration-500 ease-editorial hover:decoration-accent"
                  >
                    {brand.email}
                  </a>
                </Detail>

                {/* The number itself now lives in the card above; repeating it here
                    would give the same page two competing places to tap. */}
                <Detail label="Giờ làm việc">
                  <p>Thứ Hai – thứ Sáu, 9:00–18:00. Thứ Bảy theo hẹn.</p>
                  <p className="mt-2 text-muted">Ngoài giờ đó thì nhắn tin nhanh hơn gọi.</p>
                </Detail>

                <Detail label="Phản hồi">
                  <p>Trong vòng 24 giờ làm việc.</p>
                  <p className="mt-2 text-muted">
                    Buổi gặp đầu kéo dài chừng một tiếng và không tính phí. Gặp ngay tại công
                    trình thì hơn hẳn, vì có đứng trong phòng, thấy cái dầm chạy ngang trần và cửa
                    mở về hướng nào, chúng tôi mới nói được điều gì có ích.
                  </p>
                </Detail>

                {brand.social.length > 0 ? (
                  <Detail label="Theo dõi">
                    <div className="flex flex-col gap-3">
                      <ul className="flex flex-wrap gap-x-8 gap-y-3">
                        {brand.social.map((item) => (
                          <li key={item.href}>
                            <SocialTrigger
                              label={item.label}
                              href={item.href}
                              className="u-label text-ink transition-colors duration-500 ease-editorial hover:text-accent"
                            />
                          </li>
                        ))}
                      </ul>
                      <div className="pt-1">
                        <OpenSocialModalButton className="text-accent hover:text-ink text-[0.8125rem]" />
                      </div>
                    </div>
                  </Detail>
                ) : null}
              </div>
              <Rule />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <Label rule tone="accent">
                Viết cho studio
              </Label>
              <div className="mt-10">
                <ContactForm email={brand.email} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VIP Concierge Access Portal & Digital VIP Card */}
      <VipConciergePortal className="mt-[var(--spacing-section)]" />

      {/* VIP 1-1 Consultation Booking with Lead Architect */}
      <VipBookingCalendar className="mt-[var(--spacing-section)]" />

      {/* Real-life Client Chronicles & Testimonials */}
      <ClientChroniclesSection className="mt-[var(--spacing-section)]" />

      {/* Contractor Capability & Truth Comparison Matrix */}
      <ContractorComparisonMatrix className="mt-[var(--spacing-section)]" />

      {/* Digital Handover & Warranty Vault */}
      <DigitalHandoverVault className="mt-[var(--spacing-section)]" />

      {/* Handover Ceremony & Key Handover Ritual Vault */}
      <KeyHandoverRitualVault className="mt-[var(--spacing-section)]" />

      {/* Estate Renovation Diagnostic & Cost Estimator */}
      <EstateRenovationDiagnostic className="mt-[var(--spacing-section)]" />

      {/* Cashflow Milestones & 6-Stage Verification Scheduler */}
      <CashflowMilestoneScheduler className="mt-[var(--spacing-section)]" />

      {/* Bespoke Timber Care & White-Glove VIP Maintenance Vault */}
      <BespokeTimberCareVault className="mt-[var(--spacing-section)]" />

      {/* 1-on-1 Lead Architect Private Session */}
      <LeadArchitectPrivateSession className="mt-[var(--spacing-section)]" />

      {/* Digital Twin Estate Audit 3D LiDAR */}
      <DigitalTwinEstateAudit className="mt-[var(--spacing-section)]" />

      {/* Artisan Craftsman Passport NFC Provenance */}
      <ArtisanCraftsmanPassport className="mt-[var(--spacing-section)]" />

      {/* Concierge White-Glove Moving & Installation Audit */}
      <ConciergeWhiteGloveMovingAudit className="mt-[var(--spacing-section)]" />

      {/* Private Family Archive Vault 1000C Fireproof */}
      <PrivateFamilyArchiveVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Lotus Silk & Wool Rug Studio */}
      <ArtisanHandmadeRugStudio className="mt-[var(--spacing-section)]" />

      {/* Private Yacht Berth & Sky Helipad Concierge */}
      <PrivateYachtBerthAndHelipadConcierge className="mt-[var(--spacing-section)]" />

      {/* Master Architectural Dossier Archive A3 Leather Folio */}
      <MasterArchitecturalDossierArchive className="mt-[var(--spacing-section)]" />

      {/* Private Estate Digital Butler Local Edge Portal */}
      <PrivateEstateDigitalButlerPortal className="mt-[var(--spacing-section)]" />

      {/* Artisan Shan Tuyet Tea Sanctuary & Zisha Pottery Pavilion */}
      <ArtisanShanTuyetTeaSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Hinoki Volcanic Stone Bio-Sauna Sanctuary */}
      <ArtisanHinokiVolcanicSaunaSanctuary className="mt-[var(--spacing-section)]" />

      {/* Riverside Dawn Zen Yoga & 528Hz Singing Bowl Pavilion */}
      <RiversideDawnZenYogaPavilion className="mt-[var(--spacing-section)]" />

      {/* Riverside Cigar Lounge Negative-Pressure & Humidor */}
      <RiversideCigarLoungeAndHumidorSanctuary className="mt-[var(--spacing-section)]" />

      {/* Private Family Sanctuary Panic Room 72h CBRN */}
      <PrivateFamilySanctuaryPanicRoom className="mt-[var(--spacing-section)]" />

      {/* Artisan Botanical Silk Curtain Atelier 6m Somfy */}
      <ArtisanBotanicalCurtainAtelier className="mt-[var(--spacing-section)]" />

      {/* Private Himalayan Salt Cave Halotherapy Wellness Vault */}
      <PrivateHimalayanSaltCaveWellnessVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Marble Sundial Yen Bai 10.7769N Garden Vault */}
      <ArtisanMarbleSundialGardenVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Damascus Steel Chef Knife 128 Layers Atelier */}
      <ArtisanDamascusSteelChefKnifeAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan River Pebble Acupressure Infrared Walkway */}
      <ArtisanRiverPebbleAcupressureWalkway className="mt-[var(--spacing-section)]" />

      {/* Saigon Mangrove Boutique Ecology Atrium Tidal Lab */}
      <SaigonMangroveBoutiqueEcologyLab className="mt-[var(--spacing-section)]" />

      {/* Private Whisky Library American Oak Cask Vault */}
      <PrivateWhiskyLibraryAndCaskVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Indoor Medicinal Herb Garden Bat Trang Atelier */}
      <ArtisanIndoorMedicinalHerbGardenAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Bonsai Water Feature Waterfall Atelier */}
      <ArtisanBronzeBonsaiWaterFeatureAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Japanese Tatami Chashitsu Dinh Yen Tea Atelier */}
      <ArtisanJapaneseTatamiChashitsuTeaAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Gold Leaf Calligraphy Cabinetry Atelier */}
      <ArtisanGoldLeafCalligraphyCabinetryAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Incense Burner Atelier */}
      <ArtisanBronzeIncenseBurnerAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Terracotta Planter Atelier */}
      <ArtisanHandmadeTerracottaPlanterAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Gold Leaf Tea Canister Atelier */}
      <ArtisanGoldLeafTeaCanisterAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Bespoke Silver Cutlery Vault */}
      <ArtisanBespokeSilverCutleryVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Wind Gong Sanctuary Atelier */}
      <ArtisanBronzeWindGongSanctuaryAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Incense Seal Sanctuary */}
      <ArtisanBronzeIncenseSealSanctuary className="mt-[var(--spacing-section)]" />

      {/* Artisan Bronze Incense Furnace Vault */}
      <ArtisanBronzeIncenseFurnaceVault className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Damascus Cleaver Culinary Atelier */}
      <ArtisanHandmadeDamascusCleaverCulinaryAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Imperial Silver Chased Teapot Atelier */}
      <ArtisanImperialSilverChasedTeapotAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Gold Filigree Jewelry And Casket Atelier */}
      <ArtisanGoldFiligreeJewelryAndCasketAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Horn And Tortoiseshell Comb Atelier */}
      <ArtisanHandmadeHornAndTortoiseshellCombAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Lacquer And Silver Inlay Brush Set Atelier */}
      <ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Bronze Chau Gong And Singing Bowl Atelier */}
      <ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Handmade Cloisonne Enamel Tea Set Atelier */}
      <ArtisanHandmadeCloisonneEnamelTeaSetAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Mother Of Pearl Jewelry Casket Atelier */}
      <ArtisanMotherOfPearlJewelryCasketAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Rattan Core Lacquer Tea Caddy Atelier */}
      <ArtisanRattanCoreLacquerTeaCaddyAtelier className="mt-[var(--spacing-section)]" />

      {/* Artisan Pure Silver Agarwood Snuff Bottle Atelier */}
      <ArtisanPureSilverAgarwoodSnuffBottleAtelier className="mt-[var(--spacing-section)]" />
    </div>
  )
}
