import type { Metadata } from 'next'
import Link from 'next/link'
import { buildBreadcrumbJsonLd, buildMetadata, jsonLdScript } from '@/lib/seo'
import { DISTRICT_LIST } from '@/data/saigonDistricts'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { ProjectSpatialMap } from '@/components/projects/ProjectSpatialMap'
import { TropicalWeatherAdvisory } from '@/components/tools/TropicalWeatherAdvisory'
import { WesternSolarHeatCalculator } from '@/components/tools/WesternSolarHeatCalculator'
import { TropicalFengShuiCompass } from '@/components/tools/TropicalFengShuiCompass'
import { TropicalHvacAirflowSimulator } from '@/components/tools/TropicalHvacAirflowSimulator'
import { RiverBreezeAerodynamicsLab } from '@/components/studio/RiverBreezeAerodynamicsLab'
import { NaturalStoneQuarryAtlas } from '@/components/studio/NaturalStoneQuarryAtlas'
import { EstateRenovationDiagnostic } from '@/components/tools/EstateRenovationDiagnostic'
import { TropicalBonsaiEcologyLab } from '@/components/studio/TropicalBonsaiEcologyLab'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Bất Động Sản & Kiến Trúc Vi Khí Hậu Sài Gòn · GuHomes',
    description:
      'Giải pháp thiết kế và thi công nội thất may đo theo đặc thù vi khí hậu cho 4 trung tâm bất động sản hạng sang TP.HCM: Thủ Thiêm, Thảo Điền, Phú Mỹ Hưng và Ba Son Quận 1.',
    path: '/khu-vuc',
    type: 'website',
  })
}

export default function SaigonDistrictsPage() {
  const breadcrumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khu vực bất động sản', path: '/khu-vuc' },
  ]

  const jsonLd = [
    buildBreadcrumbJsonLd(breadcrumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Kiến Trúc & Bất Động Sản Cao Cấp Sài Gòn',
      description: 'Tổng hợp phân tích vi khí hậu và giải pháp nội thất may đo GuHomes cho các khu đô thị biểu tượng TP.HCM.',
      url: 'https://guhomes.vn/khu-vuc',
    },
  ]

  return (
    <div className="bg-canvas min-h-screen pb-[var(--spacing-section)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      {/* Header Masthead */}
      <div className="u-gutter mx-auto w-full max-w-[110rem] pt-[clamp(6.5rem,16vh,11rem)]">
        <div className="grid grid-cols-12 gap-8 items-end border-b border-line pb-12">
          <div className="col-span-12 lg:col-span-8">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs font-mono text-muted">
                <li><Link href="/" className="hover:text-ink transition-colors">Trang chủ</Link></li>
                <li><span>/</span></li>
                <li className="text-accent font-medium">Khu vực TP. Hồ Chí Minh</li>
              </ol>
            </nav>

            <span className="u-label text-accent uppercase tracking-widest">
              Tâm Điểm Bất Động Sản &amp; Vi Khí Hậu Sài Gòn
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ink mt-4 tracking-tight">
              Mỗi Khúc Sông, Một Thách Thức Kiến Trúc
            </h1>
            <p className="u-body-lg text-muted max-w-[56ch] mt-5 leading-relaxed">
              Từ nắng xế chiều phản xạ mặt nước tại Thủ Thiêm, độ ẩm 85% của bán đảo Thảo Điền, đến gió biển Cần Giờ tại Phú Mỹ Hưng. GuHomes kiến tạo giải pháp nội thất Quiet Luxury may đo riêng cho từng vị thế địa lý.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end gap-3 text-xs font-mono text-muted">
            <p>4 KHU ĐÔ THỊ BIỂU TƯỢNG TP.HCM</p>
            <p>100% CÔNG TRÌNH KHẢO SÁT HƯỚNG NẮNG &amp; GIÓ</p>
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 text-accent hover:text-ink font-semibold transition-colors mt-2"
            >
              <span>Dự toán chi phí theo khu vực</span>
              <ArrowUpRightIcon className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Interactive Saigon Spatial Map */}
        <div className="mt-14">
          <ProjectSpatialMap className="rounded-3xl border border-line" />
        </div>

        {/* 4 Districts Grid Showcase */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {DISTRICT_LIST.map((hub, index) => (
            <article
              key={hub.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-8 sm:p-10 transition-all duration-500 hover:border-accent hover:shadow-2xl hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-line/60">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider">{hub.badge}</span>
                  <span className="text-xs font-mono text-muted/60">0{index + 1} / 04</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-light mt-6 group-hover:text-accent transition-colors">
                  <Link href={`/khu-vuc/${hub.slug}`}>
                    {hub.name}
                  </Link>
                </h2>

                <p className="text-sm font-light text-muted mt-2 leading-relaxed">
                  {hub.subHeading}
                </p>

                <p className="text-xs text-muted/80 mt-4 line-clamp-3 leading-relaxed">
                  {hub.heroDescription}
                </p>

                {/* Microclimate Highlight Pills */}
                <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-canvas border border-line text-muted">
                    💧 {hub.microclimateSpecs.averageHumidity}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-canvas border border-line text-muted">
                    🌬️ {hub.microclimateSpecs.windSpeed}
                  </span>
                </div>

                {/* Key Projects in Area */}
                <div className="mt-6 pt-5 border-t border-line/50">
                  <p className="text-[11px] font-mono text-muted uppercase tracking-wider mb-2">Dự án tiêu biểu:</p>
                  <ul className="text-xs text-ink/80 space-y-1">
                    {hub.prominentProjects.slice(0, 3).map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        <span className="truncate">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4 border-t border-line/40 flex items-center justify-between">
                <span className="text-xs font-mono text-muted group-hover:text-ink transition-colors">
                  Khám phá giải pháp vi khí hậu
                </span>
                <Link
                  href={`/khu-vuc/${hub.slug}`}
                  className="w-10 h-10 rounded-full border border-line group-hover:border-accent group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label={`Xem giải pháp cho ${hub.name}`}
                >
                  <ArrowUpRightIcon className="text-base" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Tropical Weather & Microclimate Advisory */}
        <div className="mt-16">
          <TropicalWeatherAdvisory className="rounded-3xl border border-line" />
        </div>

        {/* Western Solar Heat Radiation Calculator */}
        <div className="mt-16">
          <WesternSolarHeatCalculator className="rounded-3xl border border-line" />
        </div>

        {/* Tropical Feng Shui & Microclimate Compass */}
        <div className="mt-16">
          <TropicalFengShuiCompass className="rounded-3xl border border-line" />
        </div>

        {/* Tropical HVAC & Dew Point Condensation Safety Simulator */}
        <div className="mt-16">
          <TropicalHvacAirflowSimulator className="rounded-3xl border border-line" />
        </div>

        {/* Saigon River Breeze & Aerodynamics Cooling Lab */}
        <div className="mt-16">
          <RiverBreezeAerodynamicsLab className="rounded-3xl border border-line" />
        </div>

        {/* Natural Stone Quarry & Bookmatch Atlas */}
        <div className="mt-16">
          <NaturalStoneQuarryAtlas className="rounded-3xl border border-line" />
        </div>

        {/* Estate Renovation Diagnostic & Cost Estimator */}
        <div className="mt-16">
          <EstateRenovationDiagnostic className="rounded-3xl border border-line" />
        </div>

        {/* Biophilic Tropical Bonsai & Ecology Lab */}
        <div className="mt-16">
          <TropicalBonsaiEcologyLab className="rounded-3xl border border-line" />
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-espresso to-[#2B231D] text-canvas p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-[64ch]">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
              Đồng Hành Cùng Gia Chủ Sài Gòn
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-canvas mt-3">
              Bạn đang chuẩn bị nhận bàn giao căn hộ hoặc biệt thự?
            </h3>
            <p className="text-sm text-canvas/80 mt-3 font-light leading-relaxed">
              Các KTS Trưởng của GuHomes sẵn sàng đến trực tiếp công trình đo đạc hướng gió, biên độ nhiệt thực tế và phác thảo phương án công năng Quiet Luxury tối ưu nhất.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
              >
                <span>Đăng ký khảo sát thực địa miễn phí</span>
                <ArrowUpRightIcon className="text-sm" />
              </Link>
              <a
                href="tel:0368757916"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-canvas/30 text-canvas text-xs font-mono tracking-wider hover:bg-canvas/10 transition-colors"
              >
                <span>Hotline: 0368 757 916</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
