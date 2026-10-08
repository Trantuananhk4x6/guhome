'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/Label'
import { ArrowRightIcon } from '@/components/ui/icons'
import { useLightbox } from '@/components/layout/LightboxModal'
import { QuickQuoteButton } from '@/components/layout/QuickQuoteTrigger'

interface StyleTab {
  id: string
  name: string
  subtitle: string
  quote: string
  description: string
  materials: string[]
  projectsHref: string
  featuredProjects: Array<{
    name: string
    location: string
    area: string
    imageUrl: string
    tag: string
  }>
}

const STYLE_TABS: StyleTab[] = [
  {
    id: 'wabi-sabi',
    name: 'Wabi Sabi',
    subtitle: 'Vẻ Đẹp Chân Phương & Tĩnh Lặng',
    quote: 'Tìm kiếm sự an yên giữa cuộc sống đô thị bằng những gì nguyên bản nhất.',
    description:
      'Wabi Sabi tại GuHomes là cuộc đối thoại giữa thô ráp và mềm mại. Chúng tôi dùng vôi vữa tự nhiên thở được, đá phiến giữ nguyên lỗ khí và gỗ lau dầu không màng bóng để căn nhà sống cùng thời gian.',
    materials: ['Vôi vữa tự nhiên', 'Đá Travertine thô', 'Gỗ mộc lau dầu', 'Vải lanh thô'],
    projectsHref: '/projects?style=wabi-sabi',
    featuredProjects: [
      {
        name: 'Duplex Wabi Sabi - Anh Khoa',
        location: 'Quận 2, TP. Hồ Chí Minh',
        area: '240 m²',
        imageUrl: '/media/anh-khoa/0-1200.webp',
        tag: 'Dự án thực tế',
      },
      {
        name: 'Căn Hộ Wabi Sabi 2PN',
        location: 'Bình Thạnh, TP. Hồ Chí Minh',
        area: '86 m²',
        imageUrl: '/media/anh-khoa/1-1200.webp',
        tag: 'Hoàn thiện 1:1',
      },
      {
        name: 'Không Gian Thư Giãn Wabi',
        location: 'Thảo Điền, TP. Thủ Đức',
        area: '135 m²',
        imageUrl: '/media/anh-khoa/2-1200.webp',
        tag: 'Gỗ & Vôi vữa',
      },
    ],
  },
  {
    id: 'modern-luxury',
    name: 'Modern Luxury',
    subtitle: 'Đẳng Cấp, Quyền Uy & Tinh Xảo',
    quote: 'Sự xa hoa thực sự không nằm ở phô trương, mà ở độ tỉ mỉ của từng khớp nối.',
    description:
      'Modern Luxury của GuHomes tôn vinh những vật liệu quý phái nhất: đá Calacatta ghép vân đối xứng liên tục, nẹp đồng thau xước tay và gỗ óc chó Bắc Mỹ thượng hạng kết hợp hệ chiếu sáng 4 lớp chuyên sâu.',
    materials: ['Marble Calacatta', 'Đồng thau xước tay', 'Gỗ óc chó Bắc Mỹ', 'Kính siêu trong'],
    projectsHref: '/projects?style=modern-luxury',
    featuredProjects: [
      {
        name: 'The Opera Metropole - Anh Vũ',
        location: 'Thủ Thiêm, TP. Thủ Đức',
        area: '185 m²',
        imageUrl: '/media/ben-kia-song/0-1200.webp',
        tag: 'Biểu tượng Thủ Thiêm',
      },
      {
        name: 'Penthouse The Global City',
        location: 'An Phú, TP. Thủ Đức',
        area: '320 m²',
        imageUrl: '/media/bong-go-sam/0-1200.webp',
        tag: 'Đá Marble Calacatta',
      },
      {
        name: 'Căn Hộ Luxury - Chị Quỳnh Anh',
        location: 'Quận 7, TP. Hồ Chí Minh',
        area: '142 m²',
        imageUrl: '/media/chi-quynh-anh/0-1200.webp',
        tag: 'Gỗ óc chó & Nẹp đồng',
      },
    ],
  },
  {
    id: 'minimalist',
    name: 'Tối Giản Tinh Tế',
    subtitle: 'Nhiều Ánh Sáng Hơn, Ít Đồ Đạc Hơn',
    quote: 'Mỗi chi tiết giữ lại đều phải có một lý do thuyết phục để tồn tại.',
    description:
      'Không gian tối giản mang lại sự thanh lọc tâm trí tuyệt đối. Hệ tủ kịch trần không tay nắm giấu kín toàn bộ công năng, nhường lại mặt sàn rộng thênh thang và luồng gió mát tự nhiên đối lưu.',
    materials: ['Sơn hiệu ứng bê tông', 'Hệ cánh tủ phẳng giấu nẹp', 'Thép đen mờ', 'Gỗ sồi sáng'],
    projectsHref: '/projects?category=can-ho',
    featuredProjects: [
      {
        name: 'Minimalist 3PN - Không Gian Thoáng',
        location: 'Bình Thạnh, TP. Hồ Chí Minh',
        area: '118 m²',
        imageUrl: '/media/an-huong-tram/0-1200.webp',
        tag: 'Mặt sàn tối đa',
      },
      {
        name: 'Căn Hộ Số 11 Mizuki',
        location: 'Bình Chánh, TP. Hồ Chí Minh',
        area: '92 m²',
        imageUrl: '/media/anh-kim-van-da/0-1200.webp',
        tag: 'Ánh sáng tự nhiên',
      },
      {
        name: 'Phòng Bếp Minimalist - Đảo Bếp 92cm',
        location: 'Quận 10, TP. Hồ Chí Minh',
        area: '76 m²',
        imageUrl: '/media/bep-ben-khom-truc/0-1200.webp',
        tag: 'Hệ tủ giấu công năng',
      },
    ],
  },
  {
    id: 'commercial',
    name: 'Thương Mại & Văn Phòng',
    subtitle: 'Định Vị Thương Hiệu & Trải Nghiệm Khách Hàng',
    quote: 'Không gian thương mại tốt phải bán được câu chuyện của doanh nghiệp trước cả sản phẩm.',
    description:
      'Thiết kế showroom, lounge rượu, spa cao cấp và văn phòng sáng tạo đòi hỏi tính nhận diện thương hiệu mạnh mẽ, phân luồng giao thông hợp lý và kích thích cảm xúc mua hàng hay năng suất làm việc.',
    materials: ['Hệ ánh sáng kịch bản', 'Vách kính reeded', 'Đá terrazzo', 'Kim loại mạ PVD'],
    projectsHref: '/projects?category=thuong-mai',
    featuredProjects: [
      {
        name: 'Showroom Rượu & Lounge Thượng Hạng',
        location: 'Quận 1, TP. Hồ Chí Minh',
        area: '210 m²',
        imageUrl: '/media/ben-kia-song/2-1200.webp',
        tag: 'Showroom Trưng Bày',
      },
      {
        name: 'Văn Phòng Sáng Tạo & Studio',
        location: 'Quận 3, TP. Hồ Chí Minh',
        area: '180 m²',
        imageUrl: '/media/bong-go-sam/2-1200.webp',
        tag: 'Không gian mở',
      },
      {
        name: 'Spa Trị Liệu Cao Cấp',
        location: 'Phú Nhuận, TP. Hồ Chí Minh',
        area: '160 m²',
        imageUrl: '/media/anh-khoa/3-1200.webp',
        tag: 'Vật liệu mộc an yên',
      },
    ],
  },
]

export function StyleExplorer() {
  const [activeTabId, setActiveTabId] = useState('wabi-sabi')
  const { openLightbox } = useLightbox()

  const activeTab: StyleTab = STYLE_TABS.find((t) => t.id === activeTabId) ?? STYLE_TABS[0]!

  const handleOpenImage = (idx: number) => {
    const images = activeTab.featuredProjects.map((p) => ({
      url: p.imageUrl,
      alt: p.name,
      caption: `${p.name} · ${p.location} (${p.area})`,
    }))
    openLightbox(images, idx, `${activeTab.name} - GuHomes`)
  }

  return (
    <section className="relative isolate overflow-hidden bg-espresso text-canvas py-20 lg:py-32 border-t border-accent/25">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/8 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="u-gutter relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12 border-b border-canvas/15">
          <div className="max-w-2xl">
            <Label tone="light" rule>
              Định hình Gu Sống
            </Label>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-canvas mt-4 leading-tight">
              Khám Phá Các Phong Cách Thiết Kế Biểu Tượng
            </h2>
            <p className="text-sm sm:text-base text-canvas/70 mt-4 leading-relaxed">
              Mỗi phong cách là một ngôn ngữ biểu đạt tính cách gia chủ. Dưới bàn tay kiến trúc sư GuHomes, từng bản vẽ đều được hiện thực hóa với tỉ lệ chuẩn xác 1:1 từ xưởng sản xuất trực tiếp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <QuickQuoteButton label="Nhận tư vấn phong cách" variant="gold" />
          </div>
        </div>

        {/* Style Tab Selectors (Antigravity Pill Bar) */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-6 scrollbar-none border-b border-canvas/10">
          {STYLE_TABS.map((tab) => {
            const isActive = tab.id === activeTabId
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-espresso font-semibold shadow-[0_4px_20px_rgba(197,168,128,0.35)]'
                    : 'text-canvas/70 hover:text-canvas hover:bg-canvas/5 border border-canvas/15'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStylePill"
                    className="absolute inset-0 bg-accent rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="pt-10 lg:pt-14 grid grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Left Dossier Column */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent-soft block mb-1">
                  Triết Lý Không Gian
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-canvas">
                  {activeTab.subtitle}
                </h3>
              </div>

              <blockquote className="p-4 rounded-xl bg-canvas/5 border-l-2 border-accent text-sm text-canvas/80 italic leading-relaxed">
                “{activeTab.quote}”
              </blockquote>

              <p className="text-sm text-canvas/70 leading-relaxed">
                {activeTab.description}
              </p>

              {/* Material tags */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-canvas/50 block mb-2.5">
                  Vật Liệu Cốt Lõi
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeTab.materials.map((mat) => (
                    <span
                      key={mat}
                      className="px-3 py-1.5 rounded-md bg-canvas/10 border border-canvas/15 text-xs text-canvas/85"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={activeTab.projectsHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent hover:text-espresso text-xs font-medium text-accent-soft transition-all duration-300 group"
                >
                  <span>Xem dự án {activeTab.name}</span>
                  <ArrowRightIcon className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <QuickQuoteButton
                  label="Dự toán phong cách này"
                  stylePreference={activeTab.id}
                  variant="underline"
                />
              </div>
            </div>

            {/* Right Showcase Gallery (Antigravity 3D Cards) */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {activeTab.featuredProjects.map((proj, idx) => (
                <div
                  key={proj.name}
                  onClick={() => handleOpenImage(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-canvas/15 bg-canvas/5 transition-all duration-500 hover:border-accent hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 flex flex-col"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso/50">
                    <Image
                      src={proj.imageUrl}
                      alt={proj.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      unoptimized={proj.imageUrl.endsWith('.svg')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top tag badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-canvas/20 text-[10px] font-mono text-canvas uppercase tracking-wider">
                      {proj.tag}
                    </div>

                    {/* Quick zoom icon */}
                    <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-accent/90 text-espresso flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-md">
                      <span className="text-xs font-bold">+</span>
                    </div>
                  </div>

                  {/* Project Info Footer */}
                  <div className="p-4 flex flex-col justify-between flex-1 bg-espresso/80">
                    <div>
                      <h4 className="font-display text-base text-canvas group-hover:text-accent-soft transition-colors line-clamp-1">
                        {proj.name}
                      </h4>
                      <p className="text-xs text-canvas/60 mt-1">{proj.location}</p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-canvas/10 flex items-center justify-between text-[11px] font-mono text-accent-soft">
                      <span>Diện tích</span>
                      <span className="font-medium text-canvas/90">{proj.area}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
