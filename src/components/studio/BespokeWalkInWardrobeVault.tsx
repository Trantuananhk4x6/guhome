'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type WardrobeCollection = 'watches' | 'leather-bags' | 'haute-couture'

interface WardrobeItem {
  id: WardrobeCollection
  titleVi: string
  subtitleVi: string
  optimalClimateVi: string
  dangerWithoutControlVi: string
  preservationSolutionVi: string
  woodLiningVi: string
  scentProfileVi: string
  icon: string
}

const WARDROBE_PRESETS: Record<WardrobeCollection, WardrobeItem> = {
  watches: {
    id: 'watches',
    titleVi: 'Bộ Sưu Tập Đồng Hồ Cơ Khí Phức Tạp (Horology Vault)',
    subtitleVi: 'Patek Philippe, Audemars Piguet, Rolex · Triệt Từ Trường & Rung Chấn',
    optimalClimateVi: '21°C - 23°C · Độ ẩm 45% - 50% RH · Từ trường 0 Gauss',
    dangerWithoutControlVi: 'Độ ẩm cao làm oxy hóa dầu bôi trơn bánh răng, từ trường từ thiết bị điện tử làm nhiễm từ dây tóc lò xo khiến đồng hồ chạy sai lệch hàng chục giây mỗi ngày.',
    preservationSolutionVi: 'Hộc xoay tự động bọc da lộn Alcantara Ý, vỏ thép khử từ Mu-Metal cản 100% sóng điện từ, động cơ bước Nhật Bản không rung cơ học.',
    woodLiningVi: 'Gỗ Mun sọc đen mờ kết hợp viền nẹp đồng thau mộc nguyên khối C360',
    scentProfileVi: 'Hương trầm tự nhiên thoang thoảng giúp khử mùi dầu máy kim loại',
    icon: '⌚',
  },
  'leather-bags': {
    id: 'leather-bags',
    titleVi: 'Bộ Sưu Tập Túi Da Exotic & Phụ Kiện Hàng Hiệu',
    subtitleVi: 'Hermès Birkin Da Cá Sấu Porosus, Chanel Da Cừu Lambskin',
    optimalClimateVi: '22°C - 24°C · Độ ẩm 50% - 55% RH · 0% Tia Cực Tím UV',
    dangerWithoutControlVi: 'Độ ẩm Sài Gòn vượt 80% khiến lớp da thuộc tự nhiên bị nấm mốc trắng ăn mòn, lớp keo viền bị chảy dính và kim loại mạ vàng bị xỉn màu.',
    preservationSolutionVi: 'Tủ áp suất dương nhẹ chặn đứng bụi mịn PM2.5, khay kệ lót nỉ nhung tự nhiên thoáng khí, đèn LED chỉ số hoàn màu CRI 98 không phát nhiệt.',
    woodLiningVi: 'Gỗ Tuyết Tùng Tây Ban Nha (Spanish Cedar) tự kháng mốc và hút ẩm dư thừa',
    scentProfileVi: 'Hương gỗ nồng ấm hòa quyện với mùi thơm tự nhiên của da thuộc cao cấp',
    icon: '👜',
  },
  'haute-couture': {
    id: 'haute-couture',
    titleVi: 'Trang Phục May Đo Veston & Tơ Tằm Bảo Lộc',
    subtitleVi: 'Savile Row Bespoke Suiting, Áo Dài Tơ Tằm Thêu Tay Tự Nhiên',
    optimalClimateVi: '22°C - 24°C · Độ ẩm 50% - 55% RH · Lưu thông khí vi mô',
    dangerWithoutControlVi: 'Sợi len lông cừu Cashmere và tơ tằm nguyên chất rất dễ bị nhộng cắn rách sợi và ố vàng khi tiếp xúc với độ ẩm nhiệt đới và hóa chất băng phiến.',
    preservationSolutionVi: 'Hoàn toàn không dùng băng phiến hóa chất. Tinh dầu Tuyết Tùng và Trầm Hương tự nhiên bảo vệ sợi vải nguyên vẹn, giữ nếp vải phẳng mượt quanh năm.',
    woodLiningVi: 'Gỗ Óc Chó Bắc Mỹ lau dầu hữu cơ thực vật Osmo kết hợp tay nắm mun sừng',
    scentProfileVi: 'Hương Trầm Hương Rừng Khánh Hòa vương trên từng thớ vải khi khoác lên người',
    icon: '👔',
  },
}

export function BespokeWalkInWardrobeVault({ className }: { className?: string } = {}) {
  const [activeCollection, setActiveCollection] = useState<WardrobeCollection>('watches')
  const [smartGlassOpaque, setSmartGlassOpaque] = useState(false)
  const [agarwoodDiffuserActive, setAgarwoodDiffuserActive] = useState(true)
  const [consultModalOpen, setConsultModalOpen] = useState(false)

  const current = WARDROBE_PRESETS[activeCollection]

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0a09] py-24 text-[#e8e4df] border-t border-[#1e1b18]', className)}>
      {/* Background ambient warmth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#b87333]/10 via-transparent to-transparent opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#33271c] bg-[#17110b] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Bảo Tồn Thời Trang & Vi Khí Hậu · Walk-in Wardrobe Sanctuary
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Phòng Thay Đồ Walk-In Closet Trầm Hương
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Độ ẩm 85% tại Sài Gòn là kẻ thù số một của túi da đắt giá, tơ tằm thiên nhiên và đồng hồ cơ khí. GuHomes kiến tạo buồng thay đồ vi khí hậu khép kín: chuẩn xác 50-55% RH, tự kháng khuẩn bằng gỗ Tuyết Tùng và ướp hương trầm tự nhiên.
          </p>
        </div>

        {/* Collection Selector Tabs */}
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(Object.keys(WARDROBE_PRESETS) as WardrobeCollection[]).map((key) => {
            const item = WARDROBE_PRESETS[key]
            const isActive = activeCollection === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCollection(key)}
                className={cn(
                  'rounded-xl border p-4 sm:p-5 text-left transition-all duration-300 min-h-[90px]',
                  isActive
                    ? 'border-[#d4af37] bg-[#1a140d] text-[#f4efe6] shadow-xl shadow-black/60'
                    : 'border-[#262017] bg-[#120e0a] text-[#8e8275] hover:border-[#3d3324] hover:bg-[#16120c]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-mono text-[10px] text-[#d4af37] uppercase">50-55% RH Chuẩn</span>
                </div>
                <h3 className="mt-2 text-sm sm:text-base font-medium line-clamp-1 group-hover:text-[#f4efe6]">
                  {item.titleVi.split(' (')[0]}
                </h3>
                <span className="mt-0.5 block text-xs text-[#706456] line-clamp-1">{item.subtitleVi.split(' · ')[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Interactive Wardrobe Vault Console */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch mb-16">
          {/* Left Column: Visual Cabinet & Smart Glass Interactive Simulator (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#2b2216] bg-[#130f0a] p-6 sm:p-8 shadow-2xl">
            <div>
              {/* Cabinet Display Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#382b1d] bg-gradient-to-br from-[#1c150e] to-[#0e0a06] p-6 shadow-2xl">
                {/* Smart Privacy Glass Layer */}
                <div
                  className={cn(
                    'absolute inset-0 transition-all duration-700 pointer-events-none',
                    smartGlassOpaque
                      ? 'bg-neutral-200/20 backdrop-blur-md opacity-95'
                      : 'bg-transparent opacity-0'
                  )}
                />

                {/* Wood Texture Accent */}
                <div
                  className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #d4af37 0px, transparent 1px, transparent 24px)',
                  }}
                />

                {/* Scent Diffuser Mist Particles */}
                {agarwoodDiffuserActive && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 border border-[#d4af37]/30 px-3 py-1 text-[11px] font-mono text-[#d4af37] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-ping" />
                    Trầm Hương Vi Hạt (Active)
                  </div>
                )}

                {/* Interior Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="rounded bg-black/70 border border-[#2d2216] px-2.5 py-1 font-mono text-xs text-[#d4af37] backdrop-blur-md">
                    KHOANG VI KHÍ HẬU: 52% RH · 22.5°C
                  </span>
                  <span className="rounded bg-black/70 border border-[#2d2216] px-2.5 py-1 font-mono text-[11px] text-[#f4efe6] backdrop-blur-md">
                    {smartGlassOpaque ? 'Kính Điện Mờ (Privacy Active)' : 'Kính Điện Trong Suốt'}
                  </span>
                </div>

                {/* Center Item Focus */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
                  <span className="text-4xl sm:text-5xl mb-3 drop-shadow-lg">{current.icon}</span>
                  <h4 className="font-serif text-lg sm:text-xl text-[#f4efe6] font-light max-w-md drop-shadow">
                    {current.titleVi}
                  </h4>
                  <p className="mt-1 text-xs text-[#c4b5a3] font-mono drop-shadow">
                    Lót Trong: {current.woodLiningVi.split(' · ')[0]}
                  </p>
                </div>

                {/* Bottom Scent Note */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/80 p-3 backdrop-blur-md border border-[#2b2216] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✨</span>
                    <span className="text-[#e8e4df]">{current.scentProfileVi}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Controls Bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#241c13] pt-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSmartGlassOpaque(!smartGlassOpaque)}
                    className={cn(
                      'rounded-lg border px-4 py-2.5 text-xs font-medium transition-all',
                      smartGlassOpaque
                        ? 'border-[#d4af37] bg-[#1f170e] text-[#f4efe6]'
                        : 'border-[#2e2316] bg-[#14100b] text-[#8e8072] hover:text-[#f4efe6]'
                    )}
                  >
                    {smartGlassOpaque ? 'Tắt Kính Mờ (Xem Nội Thất)' : 'Bật Kính Điện Mờ (Riêng Tư)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgarwoodDiffuserActive(!agarwoodDiffuserActive)}
                    className={cn(
                      'rounded-lg border px-4 py-2.5 text-xs font-medium transition-all',
                      agarwoodDiffuserActive
                        ? 'border-amber-500/50 bg-amber-950/30 text-amber-300'
                        : 'border-[#2e2316] bg-[#14100b] text-[#8e8072] hover:text-[#f4efe6]'
                    )}
                  >
                    {agarwoodDiffuserActive ? 'Xông Trầm (Đang Bật)' : 'Bật Xông Trầm Khánh Hòa'}
                  </button>
                </div>

                <span className="font-mono text-xs text-[#d4af37]">Zero Magnetism · Không Từ Trường</span>
              </div>
            </div>

            {/* Environmental Safety Gauge Bar */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-[#261d12] bg-[#16110a] p-3 text-center sm:p-4">
              <div>
                <span className="block font-mono text-[10px] text-[#706456] uppercase">ĐỘ ẨM LÝ TƯỞNG</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-sky-400">
                  50-55%
                </span>
                <span className="mt-0.5 block text-[10px] text-emerald-400">Không nấm mốc da</span>
              </div>
              <div className="border-x border-[#261d12]">
                <span className="block font-mono text-[10px] text-[#706456] uppercase">KHÁNG CÔN TRÙNG</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#d4af37]">
                  100%
                </span>
                <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Gỗ Tuyết Tùng tự nhiên</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#706456] uppercase">BĂNG PHIẾN HÓA HỌC</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-emerald-400">
                  0%
                </span>
                <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Không độc hại</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#2b2216] bg-[#130f0a] p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                  Tiêu Chuẩn Bảo Quản · Haute Horlogerie & Couture
                </span>
                <h3 className="mt-1 font-serif text-2xl text-[#f4efe6] font-light">
                  {current.titleVi}
                </h3>
                <p className="mt-1 text-xs text-[#8e8072]">{current.subtitleVi}</p>
              </div>

              {/* Danger vs Solution */}
              <div className="space-y-3">
                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs">
                  <strong className="text-red-400 block mb-1">Rủi Ro Khi Ở Khí Hậu Sài Gòn Thường:</strong>
                  <p className="text-[#c4b5b5] leading-relaxed">{current.dangerWithoutControlVi}</p>
                </div>

                <div className="rounded-xl border border-[#382b1d] bg-[#1a140d] p-4 text-xs">
                  <strong className="text-[#d4af37] block mb-1">Giải Pháp Kỹ Thuật GuHomes:</strong>
                  <p className="text-[#c4bcae] leading-relaxed">{current.preservationSolutionVi}</p>
                </div>
              </div>

              {/* Material specifications */}
              <div className="border-t border-[#241c13] pt-4 text-xs space-y-2 text-[#8e8072]">
                <div className="flex items-center justify-between">
                  <span>Gỗ ốp lòng tủ:</span>
                  <span className="text-[#f4efe6] font-medium text-right max-w-xs">{current.woodLiningVi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tầng hương đặc quyền:</span>
                  <span className="text-[#d4af37] font-medium text-right max-w-xs">{current.scentProfileVi}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#241c13] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setConsultModalOpen(true)}
                className="w-full sm:w-auto flex-1 rounded-lg bg-[#d4af37] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#e6c158] active:scale-[0.98]"
              >
                Tư Vấn May Đo Walk-In Closet
              </button>
              <a
                href="/studio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#382b1d] bg-[#18130c] px-4 py-3 text-xs font-medium text-[#e8e4df] transition-colors hover:border-[#4d3b28] hover:bg-[#1d170f]"
              >
                Khám Phá Xưởng Mộc
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-[#d4af37]" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal: Tư Vấn May Đo Walk-In Closet */}
        <AnimatePresence>
          {consultModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full rounded-2xl border border-[#382b1d] bg-[#14100b] p-6 sm:p-8 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#261d13]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs">
                      ✓
                    </span>
                    <h4 className="font-serif text-lg text-[#f4efe6]">May Đo Walk-In Closet</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConsultModalOpen(false)}
                    className="text-[#706456] hover:text-[#f4efe6] text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-xs text-[#a8a29e]">
                  <p>
                    KTS Trưởng GuHomes sẽ đến trực tiếp công trình để đo đạc và thiết kế giải pháp bảo tồn thời trang:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[#c4bcae]">
                    <li>Khảo sát hướng ánh sáng tự nhiên và luồng khí điều hòa chống nồm ẩm</li>
                    <li>Lên bản vẽ bóc tách từng hộc đựng đồng hồ cơ và túi da hàng hiệu</li>
                    <li>Lắp đặt hệ xông trầm hương và kính điện đổi màu thông minh</li>
                  </ul>
                  <div className="rounded border border-[#2e2316] bg-[#0c0a06] p-3 text-[11px] space-y-1 mt-3">
                    <p><strong className="text-[#e8e4df]">Hotline KTS Trưởng:</strong> 0368 757 916</p>
                    <p><strong className="text-[#e8e4df]">Xưởng chế tác gỗ:</strong> Thạnh Xuân, Q.12, TP.HCM</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultModalOpen(false)}
                    className="w-full rounded bg-[#d4af37] py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Xác Nhận Đặt Hẹn Khảo Sát
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
