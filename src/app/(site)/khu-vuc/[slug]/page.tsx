import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { buildBreadcrumbJsonLd, buildMetadata, jsonLdScript } from '@/lib/seo'
import { SAIGON_DISTRICTS } from '@/data/saigonDistricts'
import { ArrowLeftIcon, ArrowUpRightIcon } from '@/components/ui/icons'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return Object.keys(SAIGON_DISTRICTS).map((slug) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const hub = SAIGON_DISTRICTS[slug]
  if (!hub) return buildMetadata({ title: 'Không tìm thấy khu vực', path: `/khu-vuc/${slug}`, noIndex: true })

  return buildMetadata({
    title: `Kiến Trúc & Nội Thất ${hub.name} · GuHomes`,
    description: `Giải pháp thiết kế thi công nội thất thích ứng vi khí hậu tại ${hub.name}. Phân tích hướng nắng, độ ẩm sông và xử lý vật liệu gỗ óc chó, đá Travertine cho căn hộ, duplex, biệt thự.`,
    path: `/khu-vuc/${hub.slug}`,
    type: 'article',
  })
}

export default async function SaigonDistrictDetailPage({ params }: PageProps) {
  const { slug } = await params
  const hub = SAIGON_DISTRICTS[slug]
  if (!hub) notFound()

  const breadcrumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khu vực bất động sản', path: '/khu-vuc' },
    { name: hub.name, path: `/khu-vuc/${hub.slug}` },
  ]

  const jsonLd = [
    buildBreadcrumbJsonLd(breadcrumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: hub.name,
      description: hub.heroDescription,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: hub.geoCoordinates.latitude,
        longitude: hub.geoCoordinates.longitude,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: hub.address.street,
        addressLocality: hub.address.district,
        addressRegion: hub.address.city,
        addressCountry: 'VN',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: hub.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]

  return (
    <div className="bg-canvas min-h-screen pb-[var(--spacing-section)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <div className="u-gutter mx-auto w-full max-w-[110rem] pt-[clamp(6.5rem,16vh,11rem)]">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-line pb-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-mono text-muted">
              <li><Link href="/" className="hover:text-ink transition-colors">Trang chủ</Link></li>
              <li><span>/</span></li>
              <li><Link href="/khu-vuc" className="hover:text-ink transition-colors">Khu vực TP.HCM</Link></li>
              <li><span>/</span></li>
              <li className="text-accent font-medium">{hub.name}</li>
            </ol>
          </nav>

          <Link
            href="/khu-vuc"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-ink transition-colors"
          >
            <ArrowLeftIcon className="text-sm" />
            <span>Tất cả khu vực</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mt-10 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8">
            <span className="u-label text-accent uppercase tracking-widest">{hub.badge}</span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ink mt-4 tracking-tight">
              {hub.name}
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-ink/80 font-light mt-4 italic leading-relaxed">
              "{hub.subHeading}"
            </p>
            <p className="u-body-lg text-muted max-w-[56ch] mt-6 leading-relaxed">
              {hub.heroDescription}
            </p>
          </div>

          {/* Quick Real Estate & Location Dossier Card */}
          <div className="col-span-12 lg:col-span-4 bg-surface border border-line rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-mono uppercase tracking-widest text-accent pb-3 border-b border-line/60">
              Hồ Sơ Địa Lý Vệ Tinh
            </p>
            <div className="mt-4 space-y-3 text-xs font-mono text-muted">
              <div>
                <span className="text-ink/60">ĐỊA CHỈ:</span>
                <p className="text-ink mt-0.5">{hub.address.street}, {hub.address.ward}, {hub.address.district}</p>
              </div>
              <div>
                <span className="text-ink/60">TỌA ĐỘ GPS:</span>
                <p className="text-accent mt-0.5">{hub.geoCoordinates.latitude}° N, {hub.geoCoordinates.longitude}° E</p>
              </div>
              <div className="pt-2 border-t border-line/60">
                <span className="text-ink/60">DỰ ÁN TIÊU BIỂU:</span>
                <ul className="text-ink/90 mt-1 space-y-1">
                  {hub.prominentProjects.map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Microclimate Specs Diagnostic Table */}
        <div className="mt-14 bg-[#101413] text-[#F3F1EC] rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #4FD1C5 1px, transparent 1px), linear-gradient(to bottom, #4FD1C5 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Bảng Chẩn Đoán Vi Khí Hậu Sài Gòn
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-light mt-2">
              Các Chỉ Số Ảnh Hưởng Trực Tiếp Đến Tuổi Thọ Nội Thất
            </h2>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-xs font-mono text-white/50">ĐỘ ẨM KHÔNG KHÍ</span>
                <p className="font-serif text-2xl text-accent mt-1">{hub.microclimateSpecs.averageHumidity}</p>
                <p className="text-[11px] text-white/60 mt-1">Cần khe co ngót gỗ tự nhiên</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-xs font-mono text-white/50">BỨC XẠ MẶT TRỜI</span>
                <p className="font-serif text-2xl text-white mt-1">{hub.microclimateSpecs.solarRadiation}</p>
                <p className="text-[11px] text-white/60 mt-1">Yêu cầu lớp cản nhiệt</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-xs font-mono text-white/50">VẬN TỐC GIÓ SÔNG</span>
                <p className="font-serif text-2xl text-accent mt-1">{hub.microclimateSpecs.windSpeed}</p>
                <p className="text-[11px] text-white/60 mt-1">Khí động học tầng cao</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-xs font-mono text-white/50">CỰ LY MẶT SÔNG</span>
                <p className="font-serif text-2xl text-white mt-1">{hub.microclimateSpecs.riverProximity}</p>
                <p className="text-[11px] text-white/60 mt-1">Hơi ẩm và vi lượng muối</p>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Challenges & Solutions */}
        <div className="mt-14">
          <span className="u-label text-accent uppercase tracking-widest">
            Thách Thức &amp; Giải Pháp Cụ Thể
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-light mt-3">
            Kỹ Thuật Xử Lý Không Gian Của GuHomes Tại {hub.name}
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {hub.architecturalChallenges.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-surface p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-accent">
                    <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span>BÀI TOÁN KIẾN TRÚC</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal mt-4">
                    {item.title}
                  </h3>

                  <div className="mt-4 p-4 rounded-xl bg-canvas border border-line/60">
                    <p className="text-xs font-mono text-red-500/80 uppercase font-semibold">Vấn đề hiện trạng:</p>
                    <p className="text-xs text-muted mt-1 leading-relaxed">{item.problem}</p>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/30">
                    <p className="text-xs font-mono text-accent uppercase font-semibold">Giải pháp may đo GuHomes:</p>
                    <p className="text-xs text-ink/90 mt-1 leading-relaxed font-medium">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Palette Tailored for District */}
        <div className="mt-16 bg-surface border border-line rounded-2xl p-8 sm:p-12">
          <span className="u-label text-accent uppercase tracking-widest">Bảng Vật Liệu Đề Xuất</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-light mt-2">
            Vật Liệu Cốt Lõi Tương Thích Với Vi Khí Hậu {hub.name}
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {hub.materialPalette.map((mat) => (
              <div key={mat.name} className="p-6 rounded-xl bg-canvas border border-line/80">
                <span className="text-[11px] font-mono text-muted uppercase">Xuất xứ: {mat.origin}</span>
                <h4 className="font-serif text-lg text-ink font-medium mt-1">{mat.name}</h4>
                <p className="text-xs text-muted mt-3 leading-relaxed">
                  <span className="font-semibold text-ink/70">Ứng dụng:</span> {mat.application}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Entity FAQs */}
        <div className="mt-16">
          <span className="u-label text-accent uppercase tracking-widest">Câu Hỏi Thường Gặp (FAQs)</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-light mt-2">
            Hỏi Đáp Về Thiết Kế Thi Công Tại {hub.name}
          </h2>

          <div className="mt-6 space-y-4">
            {hub.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-line bg-surface p-6 transition-all [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between text-base font-serif font-medium text-ink group-open:text-accent">
                  <span>{faq.question}</span>
                  <span className="text-lg font-mono transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm text-muted font-light leading-relaxed border-t border-line/60 pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center border-t border-line pt-12">
          <h3 className="font-serif text-2xl sm:text-3xl text-ink font-light">
            Khảo Sát Mặt Bằng Cùng KTS Trưởng GuHomes Tại {hub.name}
          </h3>
          <p className="text-sm text-muted max-w-[50ch] mx-auto mt-3">
            Chúng tôi luôn lắng nghe câu chuyện về nếp sống của bạn để đưa ra phương án đúng Gu nhất.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
            >
              <span>Dự toán chi phí may đo</span>
              <ArrowUpRightIcon className="text-sm" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line text-ink text-xs font-mono tracking-wider hover:border-ink transition-colors"
            >
              <span>Gửi yêu cầu tư vấn</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
