'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface FlooringPattern {
  id: string
  nameVi: string
  angleVi: string
  historicalContextVi: string
  tactileFeelVi: string
  recommendedSpaceVi: string
}

const FLOORING_PATTERNS: FlooringPattern[] = [
  {
    id: 'chevron-45',
    nameVi: 'Lát Xương Cá Pháp Chevron 45°',
    angleVi: 'Góc Cắt Vát 45° Chuẩn Xác Mộng Âm Dương',
    historicalContextVi: 'Kiến trúc cung điện Versailles thế kỷ 17, tạo cảm giác không gian dài rộng bất tận hướng về ban công ngắm sông Sài Gòn.',
    tactileFeelVi: 'Đường vân gỗ hội tụ dẫn dắt bước chân êm ái, phủ dầu sáp Osmo nhung mịn.',
    recommendedSpaceVi: 'Đại sảnh, phòng khách thông tầng & hành lang triển lãm nghệ thuật',
  },
  {
    id: 'herringbone-90',
    nameVi: 'Lát Xương Cá Vuông Góc Herringbone 90°',
    angleVi: 'Khóa Khớp 90° Truyền Thống Đan Cài',
    historicalContextVi: 'Kiến trúc Indochine thuộc địa kinh điển, phân tán ứng suất co ngót của gỗ đều theo 2 trục trực giao, triệt tiêu 100% tiếng cọt kẹt.',
    tactileFeelVi: 'Vững chãi, đầm chân, thớ gỗ dập nổi tự nhiên massage lòng bàn chân trần.',
    recommendedSpaceVi: 'Thư phòng, phòng ngủ master suite & phòng thưởng trà thiền vị',
  },
  {
    id: 'random-plank',
    nameVi: 'Lát Ván Thẳng Bản Rộng 220mm (Random Plank)',
    angleVi: 'Ván Gỗ Dài Tự Nhiên 1.8m – 2.4m',
    historicalContextVi: 'Tôn vinh trọn vẹn dải vân gỗ cuộn xoáy hoang dã của cây gỗ cổ thụ, giữ nguyên rìa mộc sống động phóng khoáng.',
    tactileFeelVi: 'Cảm giác chân thực như bước đi trên thân cây gỗ đại thụ giữa đại ngàn nhiệt đới.',
    recommendedSpaceVi: 'Penthouse mở liên hoàn, phòng sinh hoạt gia đình đa thế hệ',
  },
]

export function ArtisanLiveEdgeParquetFlooringVault({ className }: { className?: string } = {}) {
  const [activePatternId, setActivePatternId] = useState<string>('chevron-45')
  const [selectedWood, setSelectedWood] = useState<'go-do' | 'walnut-fas'>('walnut-fas')
  const [barefootSurfaceTest, setBarefootSurfaceTest] = useState<'wood' | 'tile'>('wood')

  const activePattern = FLOORING_PATTERNS.find((p) => p.id === activePatternId) ?? FLOORING_PATTERNS[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0a08] py-24 text-[#e8ded5] border-t border-[#231a12]', className)}>
      {/* Warm Golden Walnut & Honey Woodgrain Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,143,72,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4a3420] bg-[#1a1209] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d98f48]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d98f48] animate-ping" />
            Nghệ Thuật Sàn Gỗ Tự Nhiên May Đo · Artisan Parquet Flooring
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf7f2]">
            Sàn Gỗ Mộng Âm Dương Bản Rộng 220mm Phủ Dầu Sáp Osmo
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b4a292]">
            Nói không với sàn công nghiệp dán keo mau phồng rộp trước độ ẩm nồm nhiệt đới Sài Gòn, GuHomes tuyển chọn ván gỗ Walnut Bắc Mỹ FAS và Gõ Đỏ nguyên khối <span className="text-[#d98f48] font-medium">bản rộng 220mm, dày 20mm</span> sấy chân không đạt ẩm độ cân bằng EMC 9.8%. Ghép mộng âm dương không đinh sắt, hoàn thiện bằng dầu sáp hữu cơ Osmo Polyx-Oil Đức cho thớ gỗ thở tự nhiên và ấm áp dưới chân trần.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 3 Heritage Parquet Patterns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#382618] bg-[#140e08]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#291b10] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d98f48]">
                    Bộ Sưu Tập 3 Kiểu Lát Sàn Di Sản
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf7f2]">
                    Kết Cấu Khóa Mộng Triệt Tiêu Tiếng Kêu
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#24150a] px-3.5 py-1 text-xs font-mono text-[#e5a86a]">
                  <span>Độ ẩm EMC: 9.8% (Không phồng rộp)</span>
                </div>
              </div>

              {/* Pattern Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                {FLOORING_PATTERNS.map((pattern) => {
                  const isSelected = pattern.id === activePatternId
                  return (
                    <button
                      key={pattern.id}
                      type="button"
                      onClick={() => setActivePatternId(pattern.id)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#d98f48] bg-[#24150a] text-white shadow-[0_0_15px_rgba(217,143,72,0.18)]'
                          : 'border-[#26170d] bg-[#100804] text-[#9c8676] hover:border-[#3d2415] hover:text-[#e8ded5]'
                      )}
                    >
                      <div>
                        <span className="block text-sm font-medium font-serif text-[#fbf7f2]">
                          {pattern.nameVi}
                        </span>
                        <span className="block text-xs text-[#a08876] italic mt-0.5">
                          {pattern.angleVi}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#d98f48] hidden sm:inline">
                        Chiêm ngưỡng →
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Pattern Card */}
              <div className="mt-6 rounded-xl border border-[#382618] bg-[#191008] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#d98f48] uppercase">{activePattern.angleVi}</span>
                  <span className="rounded-full bg-[#29170a] px-2.5 py-0.5 text-[#e5a86a]">
                    Bản Rộng 220mm × Dày 20mm
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#fbf7f2]">
                  {activePattern.nameVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#baa494]">
                  {activePattern.historicalContextVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#291b10] text-xs">
                  <div className="rounded-lg bg-[#100804] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6452]">Cảm Giác Tiếp Xúc Bàn Chân</span>
                    <span className="mt-1 block font-medium text-[#f0e6dc]">{activePattern.tactileFeelVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#100804] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6452]">Không Gian Đề Xuất</span>
                    <span className="mt-1 block font-medium text-[#d98f48]">{activePattern.recommendedSpaceVi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Barefoot Tactile Temperature Simulator & Timber Species */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#382618] bg-[#140e08]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#291b10] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d98f48]">
                  Thử Nghiệm Xúc Giác Chân Trần
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf7f2]">
                  Gỗ Sáp Osmo vs Gạch Men Lạnh Buốt
                </h3>
              </div>

              {/* Surface Switcher */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBarefootSurfaceTest('wood')}
                  className={cn(
                    'p-3.5 rounded-xl border text-center transition-all',
                    barefootSurfaceTest === 'wood'
                      ? 'border-[#d98f48] bg-[#29170a] text-white shadow-[0_0_12px_rgba(217,143,72,0.2)]'
                      : 'border-[#26170d] bg-[#100804] text-[#8c7464]'
                  )}
                >
                  <span className="block text-xs font-mono uppercase text-[#d98f48]">Sàn Gỗ Tự Nhiên</span>
                  <span className="block text-sm font-serif font-bold mt-1 text-[#fbf7f2]">26.8°C Ấm Chân</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBarefootSurfaceTest('tile')}
                  className={cn(
                    'p-3.5 rounded-xl border text-center transition-all',
                    barefootSurfaceTest === 'tile'
                      ? 'border-[#38bdf8] bg-[#0c1c2e] text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                      : 'border-[#26170d] bg-[#100804] text-[#8c7464]'
                  )}
                >
                  <span className="block text-xs font-mono uppercase text-[#38bdf8]">Gạch Men Công Nghiệp</span>
                  <span className="block text-sm font-serif font-bold mt-1 text-[#94a3b8]">20.5°C Lạnh Ngắt</span>
                </button>
              </div>

              {/* Comparison Details */}
              <div className="mt-4 rounded-xl border border-[#382618] bg-[#191008] p-4 text-xs space-y-2">
                {barefootSurfaceTest === 'wood' ? (
                  <>
                    <span className="font-mono text-[10px] text-[#d98f48] uppercase block">
                      Ưu Thế Sức Khỏe Khi Đi Chân Trần Trên Gỗ Mộc:
                    </span>
                    <p className="text-[#bfa998] leading-relaxed">
                      Lớp dầu sáp Osmo Polyx-Oil chiết xuất từ dầu hướng dương, dầu đậu nành và sáp carnauba tự nhiên thẩm thấu sâu vào mạch gỗ mà không bít kín lỗ thở. Nhiệt dung riêng cao giữ ấm lòng bàn chân, ngăn hàn khí xâm nhập cơ thể vào ban đêm và sáng sớm.
                    </p>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-[10px] text-[#38bdf8] uppercase block">
                      Hạn Chế Của Gạch Men & Sàn Đá Vào Mùa Mưa:
                    </span>
                    <p className="text-[#94a3b8] leading-relaxed">
                      Gạch men dẫn nhiệt nhanh khiến cơ thể bị hút nhiệt tức thì khi tiếp xúc chân trần. Bề mặt phủ men bóng gây trơn trượt khi nồm ẩm đọng sương, không tạo được độ đàn hồi giảm chấn cho khớp xương khi đi lại.
                    </p>
                  </>
                )}
              </div>

              {/* Timber Species Toggle */}
              <div className="mt-4 pt-3 border-t border-[#291b10] space-y-2">
                <span className="font-mono text-[10px] text-[#d98f48] uppercase block">
                  Tuyển Chọn Chủng Loại Gỗ Cổ Thụ:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedWood('walnut-fas')}
                    className={cn(
                      'p-2.5 rounded-lg border text-left transition-all',
                      selectedWood === 'walnut-fas'
                        ? 'border-[#d98f48] bg-[#24150a] text-white'
                        : 'border-[#26170d] bg-[#100804] text-[#8c7464]'
                    )}
                  >
                    <span className="font-bold block">Gỗ Óc Chó FAS</span>
                    <span className="text-[10px] text-[#9c8472] block">Bắc Mỹ vân cuộn sóng</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedWood('go-do')}
                    className={cn(
                      'p-2.5 rounded-lg border text-left transition-all',
                      selectedWood === 'go-do'
                        ? 'border-[#d98f48] bg-[#24150a] text-white'
                        : 'border-[#26170d] bg-[#100804] text-[#8c7464]'
                    )}
                  >
                    <span className="font-bold block">Gỗ Gõ Đỏ</span>
                    <span className="text-[10px] text-[#9c8472] block">Vân hổ đanh thép</span>
                  </button>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#291b10]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#d98f48] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#0c0a08] hover:bg-[#e89f55] transition-all shadow-[0_4px_20px_rgba(217,143,72,0.25)]"
                >
                  <span>Nhận mẫu ván gỗ mẫu trực tiếp tại tư gia</span>
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
