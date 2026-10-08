'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface LacquerLayer {
  step: string
  nameVi: string
  materialVi: string
  curingVi: string
  depthMetricVi: string
  descriptionVi: string
  accentColor: string
}

const LACQUER_LAYERS: LacquerLayer[] = [
  {
    step: '01',
    nameVi: 'Bó Hom & Bồi Vải Xô Cốt Gỗ',
    materialVi: 'Vải xô sợi tự nhiên + Đất phù sa mịn sông Hồng trộn Sơn Ta sống',
    curingVi: 'Ủ buồng ẩm 85% RH trong 7 ngày',
    depthMetricVi: 'Gia cố triệt tiêu 100% co nứt thớ gỗ',
    descriptionVi:
      'Gỗ gõ đỏ hoặc óc chó xưởng Thạnh Xuân được miết đất phù sa luyện sơn ta rồi dán chặt lớp vải xô. Lớp đệm này co giãn độc lập, ngăn cốt gỗ không làm nứt lớp sơn nghệ thuật bên trên dù trải qua mùa khô hanh hay nồm ẩm.',
    accentColor: '#8c7b64',
  },
  {
    step: '02',
    nameVi: 'Sơn Then Đen Tuyền Đáy Hồ',
    materialVi: 'Nhựa cây sơn Phú Thọ luyện chín trong chảo gang đặc biệt',
    curingVi: 'Quét 5 lớp mỏng, ủ buồng tối 14 ngày',
    depthMetricVi: 'Độ đen tuyền hấp thụ ánh sáng sâu thẳm',
    descriptionVi:
      'Sơn then tạo phông nền đen mun sâu thẳm như đáy hồ đêm. Nhựa sơn ta không bao giờ khô bằng bay hơi dung môi mà khô nhờ phản ứng oxy hóa enzym trong buồng ủ ẩm nhiệt đới khép kín.',
    accentColor: '#1a1918',
  },
  {
    step: '03',
    nameVi: 'Thếp Vàng Quỳ 24K & Cẩn Vỏ Trứng Bát Tràng',
    materialVi: 'Lá vàng 24K Kiêu Kỵ đập mỏng 0.1 micron + Vỏ trứng nướng thủ công',
    curingVi: 'Nghệ nhân dùng nhíp tre thếp từng lá vàng',
    depthMetricVi: 'Khúc xạ ánh sáng hoàng hôn đa hướng',
    descriptionVi:
      'Từng mảnh vàng quỳ 24K mỏng như cánh ve được đặt êm ái lên lớp sơn cầm. Mảnh vỏ trứng vịt nướng tạo vân nứt rạn Wabi-Sabi tinh tế, mang dấu ấn độc bản không một tác phẩm nào trùng lặp.',
    accentColor: '#d4af37',
  },
  {
    step: '04',
    nameVi: 'Sơn Cánh Gián Phủ Hổ Phách Đa Tầng',
    materialVi: 'Nhựa sơn ta luyện với dầu trẩu tạo màng hổ phách trong suốt',
    curingVi: 'Phủ 6 lớp chồng lớp, ủ 28 ngày',
    depthMetricVi: 'Tạo hiệu ứng quang học 3D nổi khối',
    descriptionVi:
      'Lớp sơn màu cánh gián vàng nâu óng ả phủ trùm lên lớp vàng và vỏ trứng. Ánh sáng xuyên qua lớp hổ phách trong vắt, chạm vào lá vàng rồi phản xạ ngược lại, tạo chiều sâu thị giác hun hút như nhìn qua mặt nước.',
    accentColor: '#b87333',
  },
  {
    step: '05',
    nameVi: 'Mài Nước Than Củi Xoan & Đánh Bóng Lòng Bàn Tay',
    materialVi: 'Than củi cây xoan ngâm nước mềm + Bột chu sa & tóc mai',
    curingVi: 'Mài nước thủ công 120 giờ ròng rã',
    depthMetricVi: 'Độ bóng ấm Satin Quiet Luxury vĩnh cửu',
    descriptionVi:
      'Nghệ nhân dùng than củi xoan mài từng micromet dưới dòng nước chảy nhẹ để hé lộ dần từng tầng vàng quỳ. Cuối cùng, dùng chính lòng bàn tay thoa bột chu sa đánh bóng mộc — bề mặt ấm áp, chạm tay không để lại dấu vân tay.',
    accentColor: '#e0a96d',
  },
]

export function HandcraftedLacquerArtisanAtelier({ className }: { className?: string } = {}) {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(2) // Default at Gold leaf layer
  const [viewMode, setViewMode] = useState<'traditional' | 'industrial'>('traditional')

  const currentLayer = LACQUER_LAYERS[activeLayerIndex] ?? LACQUER_LAYERS[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#0e0c0a] py-24 text-[#f0eae1] border-t border-[#231b14]', className)}>
      {/* Golden Warmth Radial Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3d2f1f] bg-[#1a140d] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Di Sản Sơn Mài Bản Địa Bát Tràng x Thạnh Xuân · Heritage Lacquer Atelier
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f9f5ef]">
            Nghệ Thuật Sơn Ta Đất Việt &amp; 18 Tầng Chiều Sâu Quang Học
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b5a896]">
            Từ chối lớp phủ hóa chất công nghiệp vô hồn, GuHomes bắt tay cùng các nghệ nhân lão thành đưa nhựa cây Sơn Ta Phú Thọ, vàng quỳ Kiêu Kỵ và vỏ trứng nướng vào không gian sống Quiet Luxury. 90 ngày tôi luyện qua 18 lượt quét, ủ ẩm và mài nước thủ công để tạo nên bề mặt trầm mặc lay động cảm xúc.
          </p>
        </div>

        {/* 2-Column Core Architecture */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 18-Layer Interactive Anatomy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#2b2216] bg-[#14100c]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#261d13] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                    Giải Phẫu Cắt Lớp Kỹ Thuật
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f9f5ef]">
                    5 Tầng Cốt Lõi Tạo Chiều Sâu Hun Hút
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#3a2d1d] bg-[#1d160f] px-3 py-1 text-xs font-mono text-[#d4af37]">
                  <span>Chu kỳ chế tác: 90 Ngày</span>
                </div>
              </div>

              {/* Layer Selection Chips */}
              <div className="mt-6 flex flex-col gap-2.5">
                {LACQUER_LAYERS.map((layer, idx) => {
                  const isSelected = idx === activeLayerIndex
                  return (
                    <button
                      key={layer.step}
                      type="button"
                      onClick={() => setActiveLayerIndex(idx)}
                      className={cn(
                        'flex items-center justify-between p-3.5 rounded-xl border text-left transition-all min-h-[52px]',
                        isSelected
                          ? 'border-[#d4af37] bg-[#241a0e] text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                          : 'border-[#261d13] bg-[#100d09] text-[#9c8e7c] hover:border-[#3d2f1f] hover:text-[#e4d7c6]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-bold"
                          style={{
                            backgroundColor: layer.accentColor,
                            color: idx === 1 ? '#d4af37' : '#0c0c0a',
                          }}
                        >
                          {layer.step}
                        </span>
                        <div>
                          <span className="block text-xs sm:text-sm font-medium">
                            {layer.nameVi}
                          </span>
                          <span className="block text-[11px] text-[#827464] line-clamp-1">
                            {layer.materialVi}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#d4af37]/80 hidden sm:inline">
                        {layer.depthMetricVi.split(' ')[0]} {layer.depthMetricVi.split(' ')[1]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Layer Deep Dive */}
              <div className="mt-6 rounded-xl border border-[#332517] bg-[#1a140d] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                    TẦNG {currentLayer.step} · CHI TIẾT KỸ NGHỆ
                  </span>
                  <span className="rounded-full bg-[#271d12] px-2.5 py-0.5 font-mono text-[10px] text-[#d4af37]">
                    {currentLayer.curingVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f9f5ef]">
                  {currentLayer.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#c2b4a3]">
                  {currentLayer.descriptionVi}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#261d13]">
                  <div className="rounded-lg bg-[#110e0a] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6d5d]">Vật Liệu Cội Nguồn</span>
                    <span className="mt-1 block text-xs font-medium text-[#e4d7c6]">
                      {currentLayer.materialVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#110e0a] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6d5d]">Hiệu Quả Quang Học</span>
                    <span className="mt-1 block text-xs font-medium text-[#d4af37]">
                      {currentLayer.depthMetricVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Depth of Field & Optical Comparison */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#2b2216] bg-[#14100c]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#261d13] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                    Trắc Nghiệm Chiều Sâu Thị Giác
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f9f5ef]">
                    Sơn Ta GuHomes vs Sơn Công Nghiệp
                  </h3>
                </div>
              </div>

              {/* Mode Toggle Switch */}
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-[#0c0a08] p-1.5 border border-[#261d13]">
                <button
                  type="button"
                  onClick={() => setViewMode('traditional')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    viewMode === 'traditional'
                      ? 'bg-[#d4af37] text-[#120e09] font-bold shadow-md'
                      : 'text-[#8c7b64] hover:text-[#d4af37]'
                  )}
                >
                  Sơn Mài Ta GuHomes (18 Lớp)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('industrial')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    viewMode === 'industrial'
                      ? 'bg-red-800 text-white font-bold shadow-md'
                      : 'text-[#8c7b64] hover:text-white'
                  )}
                >
                  Sơn Phun PU Công Nghiệp
                </button>
              </div>

              {/* Simulated Visual Representation */}
              <div className="mt-6 overflow-hidden rounded-xl border border-[#2d2216] relative aspect-[16/10] flex items-center justify-center p-6 text-center">
                {viewMode === 'traditional' ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c1308] via-[#2d1f0d] to-[#0d0905] flex flex-col items-center justify-center p-6">
                    {/* Simulated Floating Gold Specks */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(212,175,55,0.25),transparent_50%)]" />
                    <div className="relative z-10 space-y-2">
                      <span className="inline-block rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 px-3 py-1 font-mono text-[11px] text-[#f4efe6]">
                        ✨ Chiều Sâu Khúc Xạ 3D Tự Nhiên
                      </span>
                      <h5 className="font-serif text-lg text-[#f4efe6]">
                        Ánh Vàng Quỳ 24K Chìm Dưới Lớp Cánh Gián
                      </h5>
                      <p className="text-xs text-[#d8c8b4] max-w-[34ch] mx-auto leading-relaxed">
                        Càng ngắm càng thấy các tầng vỏ trứng và lá vàng lơ lửng như sao trời dưới mặt hồ. Càng lau chùi bề mặt càng bóng nhuận đầm ấm.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-[#222222] flex flex-col items-center justify-center p-6">
                    <div className="relative z-10 space-y-2">
                      <span className="inline-block rounded-full bg-red-900/40 border border-red-700/50 px-3 py-1 font-mono text-[11px] text-red-300">
                        ⚠️ Màng Nhựa Hóa Chất Phẳng Lì
                      </span>
                      <h5 className="font-serif text-lg text-neutral-200">
                        Chói Gắt Bề Mặt · Không Có Độ Sâu
                      </h5>
                      <p className="text-xs text-neutral-400 max-w-[34ch] mx-auto leading-relaxed">
                        Bị bít kín bởi dung môi hữu cơ. Dễ trầy xước, ố vàng khi tiếp xúc tia UV mặt trời Sài Gòn, mùi hóa chất formaldehyde khó chịu.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bespoke Furniture Applications */}
              <div className="mt-6 space-y-2 text-xs">
                <span className="font-mono text-[10px] text-[#d4af37] uppercase block">
                  Ứng Dụng May Đo Độc Bản Trong Tư Gia GuHomes:
                </span>
                <div className="rounded-lg bg-[#110e0a] p-3 space-y-1.5 border border-[#231a10]">
                  <div className="flex justify-between items-center text-[#d8c8b4]">
                    <span className="font-medium">Tủ Console Sảnh Penthouse The Metropole</span>
                    <span className="font-mono text-[10px] text-[#d4af37]">Thếp Vàng 24K</span>
                  </div>
                  <div className="flex justify-between items-center text-[#d8c8b4]">
                    <span className="font-medium">Mặt Bàn Trà Cẩn Vỏ Trứng Thảo Điền</span>
                    <span className="font-mono text-[10px] text-[#d4af37]">Vỏ Trứng Rạn Wabi</span>
                  </div>
                  <div className="flex justify-between items-center text-[#d8c8b4]">
                    <span className="font-medium">Vách Ngăn Nghệ Thuật Sóng Nước Ba Son</span>
                    <span className="font-mono text-[10px] text-[#d4af37]">Bạc Lá Kiêu Kỵ</span>
                  </div>
                </div>
              </div>

              {/* CTA Customization */}
              <div className="mt-6 pt-4 border-t border-[#261d13]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#14100c] hover:bg-[#e4be4a] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
                >
                  <span>Dự toán nội thất điểm xuyết sơn mài thủ công</span>
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
