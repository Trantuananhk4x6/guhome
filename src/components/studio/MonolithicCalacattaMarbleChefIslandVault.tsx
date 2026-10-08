'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface ChefIslandFeature {
  id: string
  nameVi: string
  specVi: string
  craftsmanshipVi: string
  benefitVi: string
}

const ISLAND_FEATURES: ChefIslandFeature[] = [
  {
    id: 'invisible-induction',
    nameVi: 'Bếp Từ Tàng Hình Dưới Mặt Đá (Invisible Induction)',
    specVi: 'Cuộn cảm ứng đa điểm ẩn dưới phiến đá Calacatta 20mm',
    craftsmanshipVi: 'Không có mặt kính đen cắt rời phá vỡ vân đá. Đặt nồi chảo từ trực tiếp lên mặt đá tự nhiên để truyền nhiệt nấu chín thức ăn.',
    benefitVi: 'Bề mặt đá ngoài vòng từ giữ nguyên 24.5°C mát lạnh, lau dọn một đường phẳng lì 100%.',
  },
  {
    id: 'mitered-waterfall',
    nameVi: 'Ghép Mòi 45° Vân Nước Chảy Liên Hoàn (Waterfall Edge)',
    specVi: 'Xẻ mòi CNC 5 trục độ chính xác 0.1mm tại xưởng đá GuHomes',
    craftsmanshipVi: 'Vân mây vàng hổ phách và xám khói chạy liền mạch từ mặt bàn tràn xuống hai bên hông chân đảo như thác nước đổ.',
    benefitVi: 'Tạo cảm giác như một khối đá tự nhiên được mang nguyên vẹn từ mỏ Carrara nước Ý về căn bếp.',
  },
  {
    id: 'carved-stone-sink',
    nameVi: 'Chậu Rửa Đục Khối Rãnh Thoát Dốc 2% Triệt Đọng Nước',
    specVi: 'Đục nguyên khối đá cẩm thạch Calacatta Borghini',
    craftsmanshipVi: 'Lòng chậu được mài bo góc R15 vệ sinh cực dễ, đáy chậu xẻ rãnh xương cá dốc 2% đưa toàn bộ bọt nước thoát tức thì.',
    benefitVi: 'Không mối nối silicon ố mốc đen theo thời gian, chống ồn khi xả nước xối mạnh.',
  },
]

export function MonolithicCalacattaMarbleChefIslandVault({ className }: { className?: string } = {}) {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('invisible-induction')
  const [cookingActive, setCookingActive] = useState<boolean>(true)
  const [servoDrawerOpen, setServoDrawerOpen] = useState<boolean>(false)

  const activeFeature = ISLAND_FEATURES.find((f) => f.id === activeFeatureId) ?? ISLAND_FEATURES[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0c10] py-24 text-[#e2e8f0] border-t border-[#1a2332]', className)}>
      {/* Cool Calacatta Marble & Ice Cyan Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1e385c] bg-[#0c1a2e] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-ping" />
            Điêu Khắc Đá & Ẩn Giấu Công Nghệ · Monolithic Chef Island
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f8fafc]">
            Đảo Bếp Calacatta Borghini 2.2 Tấn Bếp Từ Tàng Hình
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#94a3b8]">
            Tác phẩm điêu khắc trung tâm phòng bếp với phiến đá cẩm thạch <span className="text-[#38bdf8] font-medium">Calacatta Borghini Ý nguyên khối dài 3.6m nặng 2.2 tấn</span>, ghép mòi 45° vân nước chảy liên hoàn. Công nghệ bếp từ cảm ứng giấu ngầm hoàn toàn dưới thớ đá tự nhiên, cho phép đun nấu trực tiếp mà bề mặt xung quanh vẫn mát lạnh, an toàn tuyệt đối.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Architectural Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e293b] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                    Công Nghệ Ẩn Giấu & Điêu Khắc Mitered 45°
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f8fafc]">
                    Calacatta Borghini Monolithic Marble
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#082f49] px-3.5 py-1 text-xs font-mono text-[#38bdf8]">
                  <span>Trọng lượng: 2.200 kg · Dài: 3.600 mm</span>
                </div>
              </div>

              {/* Feature Switchers */}
              <div className="mt-6 flex flex-col gap-3">
                {ISLAND_FEATURES.map((feat) => {
                  const isSelected = feat.id === activeFeatureId
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => setActiveFeatureId(feat.id)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#38bdf8] bg-[#0c233c] text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'border-[#1e293b] bg-[#0b1322] text-[#94a3b8] hover:border-[#334155] hover:text-[#e2e8f0]'
                      )}
                    >
                      <div>
                        <span className="block text-sm font-medium font-serif text-[#f8fafc]">
                          {feat.nameVi}
                        </span>
                        <span className="block text-xs text-[#64748b] italic mt-0.5">
                          {feat.specVi}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#38bdf8] hidden sm:inline">
                        Khám phá →
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Feature Detail */}
              <div className="mt-6 rounded-xl border border-[#334155] bg-[#111c30] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#38bdf8] uppercase">Quy Cách Kỹ Thuật</span>
                  <span className="rounded-full bg-[#1e293b] px-2.5 py-0.5 text-[#7dd3fc]">
                    {activeFeature.specVi}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#f8fafc]">
                  {activeFeature.nameVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#94a3b8]">
                  {activeFeature.craftsmanshipVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1e293b] text-xs">
                  <div className="rounded-lg bg-[#0b1322] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#64748b]">Lợi Ích Thực Dưỡng</span>
                    <span className="mt-1 block font-medium text-[#f1f5f9]">{activeFeature.benefitVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0b1322] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#64748b]">Nguồn Gốc Đá</span>
                    <span className="mt-1 block font-medium text-[#38bdf8]">Mỏ đá tự nhiên Carrara, Tuscany, Ý</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Invisible Induction Simulator & Servo-Drive Drawer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#1e293b] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                  Mô Phỏng Bếp Từ Tàng Hình
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f8fafc]">
                  Nấu Trên Đá Tự Nhiên Không Vết Đen
                </h3>
              </div>

              {/* Cooktop Toggle */}
              <div className="mt-5 rounded-xl border border-[#1e293b] bg-[#111c30] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#38bdf8] uppercase block">
                      Vùng Từ Cảm Ứng Dưới Phiến Đá Calacatta
                    </span>
                    <span className="text-xs text-[#94a3b8]">Đun sôi nước nồi inox đặt thẳng trên đá</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCookingActive(!cookingActive)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                      cookingActive
                        ? 'bg-[#38bdf8] text-[#090b0e] font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                        : 'border border-[#334155] bg-[#1e293b] text-[#64748b]'
                    )}
                  >
                    {cookingActive ? '🔥 BẾP TỪ: ĐANG NẤU 100°C' : '⏸ BẾP TỪ: TẮT'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e293b] text-[11px] font-mono">
                  <div>
                    <span className="text-[#64748b] block text-[10px]">ĐÁ NGOÀI VÙNG NẤU:</span>
                    <span className="text-[#38bdf8]">24.5°C (Chạm tay an toàn 100%)</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block text-[10px]">BỀ MẶT BẾP:</span>
                    <span className="text-[#f8fafc]">Một phiến đá phẳng hoàn toàn</span>
                  </div>
                </div>
              </div>

              {/* Blum Servo-Drive Electric Touch Drawer */}
              <div className="mt-4 rounded-xl border border-[#1e293b] bg-[#0b1322] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#38bdf8] uppercase block">
                      Ngăn Kéo Gia Vị Mở Điện Servo-Drive
                    </span>
                    <span className="text-xs text-[#94a3b8]">Chạm nhẹ đầu gối tự động trượt mở êm dịu</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setServoDrawerOpen(!servoDrawerOpen)}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-mono transition-all',
                      servoDrawerOpen
                        ? 'bg-[#38bdf8] text-[#090b0e] font-bold'
                        : 'border border-[#334155] text-[#64748b]'
                    )}
                  >
                    {servoDrawerOpen ? 'ĐÃ MỞ' : 'CHẠM ĐỂ MỞ'}
                  </button>
                </div>
                <p className="text-xs text-[#64748b] italic">
                  Ray trượt Blum Movento chịu tải 70kg, triệt tiêu tiếng va chạm khi đóng mở trong gian bếp sang trọng.
                </p>
              </div>

              {/* Consultation CTA */}
              <div className="mt-6 pt-4 border-t border-[#1e293b]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#38bdf8] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#090b0e] hover:bg-[#7dd3fc] transition-all shadow-[0_4px_20px_rgba(56,189,248,0.25)]"
                >
                  <span>Dự toán chế tác đảo bếp Calacatta độc bản</span>
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
