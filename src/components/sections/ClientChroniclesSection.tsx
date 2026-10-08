'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type PropertyCategory = 'all' | 'penthouse-duplex' | 'villa-townhouse' | 'apartment'

export interface ClientStory {
  id: string
  clientName: string
  projectTitle: string
  propertyCategory: PropertyCategory
  location: string
  area: string
  yearHandover: string
  warrantyCardId: string
  quote: string
  keyHighlight: string
  architecturalSolution: string
  avatarText: string
  avatarBg: string
}

export const CLIENT_STORIES: ClientStory[] = [
  {
    id: 'opera-metropole',
    clientName: 'Anh Trần Hoàng & Chị Bích Trâm',
    projectTitle: 'Penthouse The Opera Residence',
    propertyCategory: 'penthouse-duplex',
    location: 'Bán Đảo Thủ Thiêm, TP. Thủ Đức',
    area: '380 m²',
    yearHandover: '2025',
    warrantyCardId: 'GU-WTY-2025-0814',
    quote:
      'Nắng chiều Tây trên tầng 28 với vách kính khổ lớn từng là nỗi ám ảnh lớn nhất của hai vợ chồng. GuHomes đã giải cứu căn penthouse bằng hệ lam trần gỗ óc chó xoay góc kết hợp vôi khoáng Calce Ý và đá Travertine hút nhiệt. Nhiệt độ phòng khách giảm ngay 3.5°C giữa trưa mà không cần hạ rèm tối om, vẫn trọn vẹn view nhìn pháo hoa Landmark 81.',
    keyHighlight: 'Giảm 3.5°C nhiệt độ phòng khách · Giữ trọn view panorama sông Sài Gòn',
    architecturalSolution: 'Lam trần gỗ óc chó FAS + vôi khoáng Calce Ý cản nhiệt mặt trời Tây.',
    avatarText: 'TH',
    avatarBg: 'bg-amber-900/60',
  },
  {
    id: 'chateau-phu-my-hung',
    clientName: 'Bác Phạm Quốc Hưng (Cựu Kỹ sư)',
    projectTitle: 'Biệt Thự Song Lập Château',
    propertyCategory: 'villa-townhouse',
    location: 'Khu Đô Thị Phú Mỹ Hưng, Quận 7',
    area: '420 m²',
    yearHandover: '2024',
    warrantyCardId: 'GU-WTY-2024-0392',
    quote:
      'Chơi và sưu tầm đồ gỗ hơn 30 năm, tôi rất sợ gỗ công nghiệp dán cạnh dễ bong rộp mép ở khí hậu nồm ẩm Sài Gòn. Khi đích thân xuống xưởng Thạnh Xuân xem bác thợ cả ghép từng mộng âm dương kín khít và ngửi mùi dầu Osmo thơm nhẹ không cay mắt, tôi hoàn toàn trao trọn niềm tin. Đến nay đã hơn một năm, mọi cánh cửa mở êm ru.',
    keyHighlight: '100% mộng ghép âm dương truyền thống · Dầu lau Osmo CHLB Đức 0% VOC',
    architecturalSolution: 'Gỗ óc chó & sồi sấy chân không đạt chuẩn EMC 10–12% thích ứng gió biển Nam Sài Gòn.',
    avatarText: 'QH',
    avatarBg: 'bg-stone-800',
  },
  {
    id: 'thao-dien-green',
    clientName: 'Gia đình Chị Lê Thục Uyên',
    projectTitle: 'Duplex Thảo Điền Green Ven Sông',
    propertyCategory: 'penthouse-duplex',
    location: 'Bán Đảo Thảo Điền, TP. Thủ Đức',
    area: '240 m²',
    yearHandover: '2025',
    warrantyCardId: 'GU-WTY-2025-1102',
    quote:
      'Mùa mưa triều cường Thảo Điền độ ẩm lên tới 88% cực kỳ ẩm mốc. GuHomes đã tư vấn cốt Plywood WBP chống ẩm ngâm nước 72h kết hợp chỉ nẹp gỗ Teak nguyên tấm. Trải qua 2 mùa mưa rào dài ngày, hệ tủ bếp và tủ áo âm tường vẫn khít khao, không một vết ố hay mùi ẩm mốc nào.',
    keyHighlight: 'Kháng ẩm 88% vi khí hậu Thảo Điền · Không lưu mùi ẩm mốc qua mùa mưa',
    architecturalSolution: 'Cốt Plywood WBP chống nước + nẹp Teak tự nhiên + vách ngăn thông thoáng.',
    avatarText: 'TU',
    avatarBg: 'bg-emerald-950',
  },
  {
    id: 'tam-rem-be-tong',
    clientName: 'Anh Đặng Minh Quân & Chị Mai Lan',
    projectTitle: 'Nhà Phố Ba Gian · Tấm Rèm Bê Tông',
    propertyCategory: 'villa-townhouse',
    location: 'Phường An Phú Đông, Quận 12',
    area: '280 m²',
    yearHandover: '2023',
    warrantyCardId: 'GU-WTY-2023-0177',
    quote:
      'Khu đất nhà ống 4x18m trước đây bức bí ngột ngạt, ban ngày vẫn phải bật đèn huỳnh quang và đóng kín cửa sổ vì bụi đường. KTS GuHomes mở giếng trời kép và mặt tiền lam bê tông lọc bụi, gió sông Vàm Thuật thổi luồn qua từng ngóc ngách. Con cái có khoảng sân đệm chơi đùa dưới bóng mát.',
    keyHighlight: 'Đón gió đối lưu tự nhiên 24/7 · Giảm 60% điện năng chiếu sáng ban ngày',
    architecturalSolution: 'Giếng trời thông tầng khí động học + lam bê tông đúc sẵn cản bụi mịn.',
    avatarText: 'MQ',
    avatarBg: 'bg-zinc-800',
  },
  {
    id: 'grand-marina-bason',
    clientName: 'Anh Ngô Kiến Huy & Chị Khánh Vy',
    projectTitle: 'Căn Hộ Dual Key Grand Marina Saigon',
    propertyCategory: 'apartment',
    location: 'Ba Son, Bến Nghé, Quận 1',
    area: '190 m²',
    yearHandover: '2026',
    warrantyCardId: 'GU-WTY-2026-0428',
    quote:
      'Chúng tôi ấn tượng nhất với tính kỷ luật và chuẩn xác về tiến độ. Đúng 72 ngày, không trễ một buổi sáng, hồ sơ nghiệm thu bóc tách chi tiết từng mét vuông và đội ngũ dọn vệ sinh tinh tươm như khách sạn 5 sao trước khi bàn giao chìa khóa. Một trải nghiệm làm nhà nhẹ nhõm ngoài mong đợi.',
    keyHighlight: 'Chuẩn xác tiến độ 72 ngày · Vệ sinh tinh tươm chìa khóa trao tay',
    architecturalSolution: 'Hệ module mộc dry-fit tại xưởng Thạnh Xuân, rút ngắn 40% thời gian lắp đặt hiện trường.',
    avatarText: 'KH',
    avatarBg: 'bg-cyan-950',
  },
]

export function ClientChroniclesSection({ className }: { className?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>('all')
  const [activeStoryId, setActiveStoryId] = useState<string>(CLIENT_STORIES[0]!.id)

  const filteredStories = CLIENT_STORIES.filter(
    (story) => selectedCategory === 'all' || story.propertyCategory === selectedCategory,
  )

  const activeStory =
    CLIENT_STORIES.find((s) => s.id === activeStoryId) ?? filteredStories[0] ?? CLIENT_STORIES[0]!

  return (
    <section className={cn('relative bg-surface text-ink py-16 sm:py-24 border-t border-line/60', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem]">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Biên Niên Sử Gia Chủ Sài Gòn</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-ink mt-3 tracking-tight">
              Người Thật, Việc Thật &amp; Giá Trị Trường Tồn
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-[62ch] mt-3 leading-relaxed">
              Mỗi căn nhà hoàn thiện là một lời chứng thực sống động cho triết lý &quot;Your Success, Our Focus&quot;. Dưới đây là những câu chuyện được gia chủ kể lại sau khi đã trải qua nhiều mùa mưa nắng Sài Gòn.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tất Cả (05)' },
              { id: 'penthouse-duplex', label: 'Penthouse & Duplex' },
              { id: 'villa-townhouse', label: 'Biệt Thự & Nhà Phố' },
              { id: 'apartment', label: 'Căn Hộ Cao Cấp' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id as PropertyCategory)
                  const firstMatch = CLIENT_STORIES.find(
                    (s) => cat.id === 'all' || s.propertyCategory === cat.id,
                  )
                  if (firstMatch) setActiveStoryId(firstMatch.id)
                }}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-mono transition-all',
                  selectedCategory === cat.id
                    ? 'bg-ink text-canvas font-medium shadow-xs'
                    : 'bg-canvas border border-line text-muted hover:text-ink',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div className="mt-12 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Stories Navigator List */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-3.5">
            {filteredStories.map((story) => {
              const isCurrent = story.id === activeStory.id
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setActiveStoryId(story.id)}
                  className={cn(
                    'p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4',
                    isCurrent
                      ? 'bg-canvas border-accent shadow-md scale-[1.01] ring-1 ring-accent'
                      : 'bg-canvas/50 border-line/70 hover:border-accent/50 hover:bg-canvas',
                  )}
                >
                  <div
                    className={cn(
                      'h-11 w-11 rounded-full flex items-center justify-center text-white text-xs font-mono font-bold shrink-0 shadow-xs',
                      story.avatarBg,
                    )}
                  >
                    {story.avatarText}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-base font-medium text-ink truncate">
                        {story.clientName}
                      </h4>
                      <span className="text-[10px] font-mono text-muted">{story.yearHandover}</span>
                    </div>
                    <p className="text-xs text-accent font-medium mt-0.5">{story.projectTitle}</p>
                    <p className="text-xs text-muted/70 truncate mt-1">{story.location} · {story.area}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Column: Deep Quote & Digitalized Warranty Certificate */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl border border-line bg-canvas p-7 sm:p-10 shadow-sm relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Project and Location */}
                    <div className="flex items-center justify-between pb-5 border-b border-line">
                      <div>
                        <span className="text-xs font-mono text-accent uppercase tracking-wider block">
                          Công trình hoàn thiện
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal mt-1">
                          {activeStory.projectTitle}
                        </h3>
                        <p className="text-xs text-muted font-mono mt-0.5">
                          {activeStory.location} · Quy mô: {activeStory.area}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono text-muted/60 block">Năm bàn giao</span>
                        <span className="font-display text-xl font-medium text-ink">
                          {activeStory.yearHandover}
                        </span>
                      </div>
                    </div>

                    {/* Full Testimonial Quote */}
                    <blockquote className="mt-6 font-serif text-base sm:text-lg text-ink/90 leading-relaxed italic">
                      &quot;{activeStory.quote}&quot;
                    </blockquote>

                    {/* Solution Highlights */}
                    <div className="mt-6 p-4 rounded-xl bg-surface border border-line/80 space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">✦ Điểm nhấn:</span>
                        <span className="text-ink font-medium leading-relaxed">{activeStory.keyHighlight}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-muted font-mono mt-0.5">⚙ Giải pháp KTS:</span>
                        <span className="text-muted leading-relaxed">{activeStory.architecturalSolution}</span>
                      </div>
                    </div>
                  </div>

                  {/* Digitalized Warranty Stamp Card */}
                  <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface/50 p-4 rounded-2xl border border-line">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0">
                        <CheckIcon className="text-lg" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-muted uppercase block">
                          Thẻ Bảo Hành Xưởng Mộc Thạnh Xuân:
                        </span>
                        <span className="font-mono text-xs font-bold text-accent">
                          {activeStory.warrantyCardId}
                        </span>
                        <p className="text-[11px] text-muted">
                          Bảo hành kết cấu mộc 05 năm · Đo độ ẩm miễn phí 6 tháng/lần
                        </p>
                      </div>
                    </div>

                    <a
                      href="https://zalo.me/0368757916"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-espresso text-canvas text-xs font-mono hover:bg-ink transition-colors shrink-0"
                    >
                      <span>Tra cứu bảo hành</span>
                      <ArrowUpRightIcon className="text-xs" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
