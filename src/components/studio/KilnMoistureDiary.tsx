'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type WoodSpeciesId = 'walnut' | 'white-oak' | 'teak' | 'redwood'

interface WoodSpeciesSpec {
  id: WoodSpeciesId
  nameVi: string
  scientificName: string
  radialShrinkageCoeff: number // % per FSP
  tangentialShrinkageCoeff: number // % per FSP
  tOverRRatio: number // Tangential to Radial ratio (lower = more stable)
  jankaRating: string
  saigonStabilityNote: string
}

const WOOD_SPECIES: Record<WoodSpeciesId, WoodSpeciesSpec> = {
  walnut: {
    id: 'walnut',
    nameVi: 'Gỗ Óc Chó Bắc Mỹ (FAS American Walnut)',
    scientificName: 'Juglans nigra · Xuất xứ Appalachian',
    radialShrinkageCoeff: 5.5,
    tangentialShrinkageCoeff: 7.8,
    tOverRRatio: 1.4,
    jankaRating: '1,010 lbf',
    saigonStabilityNote:
      'Tỷ lệ T/R = 1.4 thuộc hàng ổn định nhất trong các dòng gỗ cứng cao cấp. Khả năng giữ phom phẳng xuất sắc khi làm mặt bàn lớn và hệ cánh tủ kịch trần.',
  },
  'white-oak': {
    id: 'white-oak',
    nameVi: 'Gỗ Sồi Trắng Châu Âu (European White Oak)',
    scientificName: 'Quercus robur · Rừng ôn đới Châu Âu',
    radialShrinkageCoeff: 5.6,
    tangentialShrinkageCoeff: 10.5,
    tOverRRatio: 1.88,
    jankaRating: '1,360 lbf',
    saigonStabilityNote:
      'Gỗ đanh chắc, vân tia tủy độc đáo. Do độ co ngót tiếp tuyến cao hơn, GuHomes bắt buộc phải xẻ tư (Rift-sawn) và chạy khe co giãn kỹ thuật 2.5mm.',
  },
  teak: {
    id: 'teak',
    nameVi: 'Gỗ Teak Miến Điện Tự Nhiên (Myanmar Teak)',
    scientificName: 'Tectona grandis · Rừng tự nhiên Đông Nam Á',
    radialShrinkageCoeff: 2.5,
    tangentialShrinkageCoeff: 5.8,
    tOverRRatio: 2.3,
    jankaRating: '1,070 lbf',
    saigonStabilityNote:
      'Hàm lượng tinh dầu silica tự nhiên cao giúp gỗ hầu như không bị ảnh hưởng bởi nồm ẩm Sài Gòn. Lý tưởng cho khu vực lavabo, phòng tắm master và ban công.',
  },
  redwood: {
    id: 'redwood',
    nameVi: 'Gỗ Gõ Đỏ Tuyển Chọn (Afzelia Redwood)',
    scientificName: 'Afzelia bipindensis · Châu Phi',
    radialShrinkageCoeff: 3.1,
    tangentialShrinkageCoeff: 4.6,
    tOverRRatio: 1.48,
    jankaRating: '1,810 lbf',
    saigonStabilityNote:
      'Khối lượng riêng nặng, chất gỗ trơ với thời tiết. Khó cong vênh nhưng cần sấy chân không dài ngày để triệt tiêu toàn bộ ứng suất thớ xoắn.',
  },
}

interface KilnPhase {
  phase: number
  title: string
  days: string
  tempC: number
  pressureMpa: number
  targetMcPercent: string
  actionVi: string
  technicalNote: string
}

const KILN_PHASES: KilnPhase[] = [
  {
    phase: 1,
    title: 'Ủ Ẩm & Ổn Định Ứng Suất Nội Tại',
    days: 'Ngày 01 – 03',
    tempC: 42,
    pressureMpa: -0.04,
    targetMcPercent: '28% – 30%',
    actionVi: 'Xông hơi nước bão hòa giải phóng ứng suất xơ gỗ bị nén sau khi xẻ phôi.',
    technicalNote: 'Tránh hiện tượng nứt đầu gỗ và nứt chân chim bề mặt khi bắt đầu gia nhiệt.',
  },
  {
    phase: 2,
    title: 'Gia Nhiệt Chân Không & Thoát Ẩm Mao Dẫn',
    days: 'Ngày 04 – 09',
    tempC: 45,
    pressureMpa: -0.08,
    targetMcPercent: '18% – 20%',
    actionVi: 'Hạ áp suất lò sấy xuống -0.08 MPa, điểm sôi của nước giảm xuống chỉ còn 45°C.',
    technicalNote: 'Nước tự do trong ống mao dẫn bốc hơi nhanh chóng mà không làm cháy thớ gỗ.',
  },
  {
    phase: 3,
    title: 'Rút Ẩm Tế Bào Sâu (Bound Water Extraction)',
    days: 'Ngày 10 – 16',
    tempC: 48,
    pressureMpa: -0.08,
    targetMcPercent: '12% – 14%',
    actionVi: 'Sáu đầu dò điện trở cắm sâu vào lõi gỗ liên tục đo đạc độ ẩm tế bào.',
    technicalNote: 'Đưa độ ẩm lõi và độ ẩm bề mặt tiệm cận nhau, sai số giữa các điểm đo <= 0.5%.',
  },
  {
    phase: 4,
    title: 'Dưỡng Gỗ Cân Bằng Vi Khí Hậu Sài Gòn (EMC Acclimation)',
    days: 'Ngày 17 – 21',
    tempC: 36,
    pressureMpa: 0,
    targetMcPercent: '10% – 12% (EMC Vàng)',
    actionVi: 'Mở cửa buồng sấy, để phôi gỗ nghỉ trong kho đệm xưởng Thạnh Xuân 1.200m².',
    technicalNote: 'Gỗ tự cân bằng độ ẩm bền vững với môi trường thực tế TP.HCM trước khi sang phân xưởng mộng mộc.',
  },
]

export function KilnMoistureDiary({ className }: { className?: string }) {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<WoodSpeciesId>('walnut')
  const [boardWidthMm, setBoardWidthMm] = useState<number>(900) // mm (table slab or cabinet)
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(3) // Phase 4 default

  const species = WOOD_SPECIES[selectedSpeciesId] ?? WOOD_SPECIES['walnut']
  const activePhase = KILN_PHASES[activePhaseIndex] ?? KILN_PHASES[0]!

  // Fiber Saturation Point (FSP) is approximately 30% MC
  // Moisture shift between dry season (11% MC) and rainy season peak (15% MC) -> deltaMC = 4%
  const deltaMc = 4 // %
  const fsp = 30 // %

  // Calculated dimensional movement in mm
  const radialExpansionMm = Math.round(
    (boardWidthMm * (species.radialShrinkageCoeff / 100) * (deltaMc / fsp)) * 10
  ) / 10

  const tangentialExpansionMm = Math.round(
    (boardWidthMm * (species.tangentialShrinkageCoeff / 100) * (deltaMc / fsp)) * 10
  ) / 10

  const uniqueId = useId()

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-canvas border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Kỹ Nghệ Xưởng Mộc Thạnh Xuân 1.200m² · GuHomes Moisture Engineering
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Vacuum Kiln EMC 10–12%
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Nhật Ký Sấy Chân Không &amp; Cân Bằng Độ Ẩm Mộc
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Gỗ tự nhiên nhập từ Bắc Mỹ có độ ẩm 6–8%, khi gặp độ ẩm 85% mùa mưa Sài Gòn sẽ nở phù làm kẹt cánh tủ và xé mặt bàn. Tại Thạnh Xuân, GuHomes sử dụng lò sấy chân không 21 ngày đưa gỗ về ngưỡng cân bằng EMC 10–12% thích ứng vĩnh cửu.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Đo kiểm điện trở Delmhorst Hoa Kỳ</span>
          </div>
        </div>

        {/* Species Selector */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(WOOD_SPECIES) as WoodSpeciesId[]).map((id) => {
            const sp = WOOD_SPECIES[id]
            const isSelected = selectedSpeciesId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedSpeciesId(id)}
                className={cn(
                  'p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-surface shadow-md ring-1 ring-accent/40'
                    : 'border-line bg-canvas hover:border-line-dark'
                )}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent">
                    Độ cứng: {sp.jankaRating}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-ink mt-1">
                    {sp.nameVi}
                  </h3>
                </div>
                <p className="text-[11px] text-muted font-mono mt-2 truncate">{sp.scientificName}</p>
              </button>
            )
          })}
        </div>

        {/* Main Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Shrinkage Calculator */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            {/* Calculator Inputs Card */}
            <div className="p-8 rounded-3xl bg-surface border border-line">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Bộ Tính Toán Giãn Nở Cơ Lý Học Gỗ Sài Gòn</span>
                <span className="text-accent font-semibold">Chênh lệch ẩm mùa: ΔMC = 4%</span>
              </div>

              <div className="mt-6 space-y-6">
                {/* Board Width Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-ink font-semibold">Chiều rộng phôi gỗ / mặt bàn:</span>
                    <span className="text-accent text-sm font-semibold">{boardWidthMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="1200"
                    step="50"
                    value={boardWidthMm}
                    onChange={(e) => setBoardWidthMm(parseInt(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted/60 mt-1">
                    <span>300 mm (Cánh hộc kéo)</span>
                    <span>600 mm (Cánh tủ áo)</span>
                    <span>900 mm (Mặt bàn ăn)</span>
                    <span>1200 mm (Đảo bếp nguyên tấm)</span>
                  </div>
                </div>

                {/* Species Mechanical Behavior Insight */}
                <div className="p-4 rounded-2xl bg-canvas border border-line text-xs font-mono text-muted leading-relaxed">
                  <span className="text-ink font-semibold">{species.nameVi}: </span>
                  <span>{species.saigonStabilityNote}</span>
                </div>
              </div>

              {/* Dynamic Expansion Metrics Box */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-line/60">
                <div className="p-4 rounded-2xl bg-canvas border border-line">
                  <p className="text-[11px] font-mono text-muted">Giãn nở tiếp tuyến</p>
                  <p className="text-2xl font-serif mt-1 font-light text-rose-600">
                    +{tangentialExpansionMm} mm
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Tangential (Nguy cơ cao)</p>
                </div>

                <div className="p-4 rounded-2xl bg-canvas border border-line">
                  <p className="text-[11px] font-mono text-muted">Giãn nở xuyên tâm</p>
                  <p className="text-2xl font-serif mt-1 font-light text-accent">
                    +{radialExpansionMm} mm
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Radial (Xẻ tư an toàn)</p>
                </div>

                <div className="p-4 rounded-2xl bg-canvas border border-line">
                  <p className="text-[11px] font-mono text-muted">Hệ số tỷ lệ T/R</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {species.tOverRRatio}
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">&lt; 1.5 = Rất ổn định</p>
                </div>

                <div className="p-4 rounded-2xl bg-canvas border border-line">
                  <p className="text-[11px] font-mono text-muted">Khe thở mộng GuHomes</p>
                  <p className="text-2xl font-serif mt-1 font-light text-accent">
                    2.5 mm
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Triệt tiêu nứt xé 100%</p>
                </div>
              </div>
            </div>

            {/* Visual Cross-Section Expansion Diagram */}
            <div className="p-8 rounded-3xl bg-surface border border-line relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Mô Phỏng Cấu Trúc Khung Mộng Âm Dương Có Khe Co Giãn</span>
                <span className="text-accent font-semibold">Floating Panel Joinery Standard</span>
              </div>

              {/* Graphic Representation */}
              <div className="mt-6 relative h-48 sm:h-52 w-full rounded-2xl bg-canvas border border-line p-6 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center text-[10px] font-mono text-muted border-b border-line/60 pb-2">
                  <span>Khung Gỗ Bao Ngoài (Solid Frame)</span>
                  <span className="text-accent font-semibold">Khe Thở Âm Giấu Kín 2.5mm</span>
                  <span>Ván Pano Nổi Tự Do (Floating Core)</span>
                </div>

                {/* Animated Structural View */}
                <div className="flex items-center justify-center gap-3 my-auto">
                  <div className="w-16 h-20 rounded-xl bg-espresso/80 border border-accent/40 flex items-center justify-center text-[10px] font-mono text-canvas text-center p-1">
                    Khung Cố Định
                  </div>

                  {/* Expansion Gap Indicator */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-mono text-accent">2.5mm</span>
                    <div className="w-2.5 h-16 bg-accent/20 border-x border-dashed border-accent flex items-center justify-center">
                      <span className="w-0.5 h-8 bg-accent animate-pulse" />
                    </div>
                    <span className="text-[8px] font-mono text-muted">Gap</span>
                  </div>

                  {/* Floating Panel that expands */}
                  <motion.div
                    key={selectedSpeciesId + boardWidthMm}
                    initial={{ width: 140 }}
                    animate={{ width: 140 + tangentialExpansionMm * 3 }}
                    transition={{ duration: 0.5 }}
                    className="h-20 rounded-xl bg-gradient-to-r from-accent/30 via-accent/20 to-accent/30 border border-accent flex items-center justify-center text-xs font-mono text-ink text-center p-2"
                  >
                    <div>
                      <p className="font-semibold">Ván Pano Gỗ {species.nameVi.split(' ')[2]}</p>
                      <p className="text-[10px] text-muted">Giãn nở an toàn trong rãnh mộng</p>
                    </div>
                  </motion.div>

                  {/* Expansion Gap Indicator */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-mono text-accent">2.5mm</span>
                    <div className="w-2.5 h-16 bg-accent/20 border-x border-dashed border-accent flex items-center justify-center">
                      <span className="w-0.5 h-8 bg-accent animate-pulse" />
                    </div>
                    <span className="text-[8px] font-mono text-muted">Gap</span>
                  </div>

                  <div className="w-16 h-20 rounded-xl bg-espresso/80 border border-accent/40 flex items-center justify-center text-[10px] font-mono text-canvas text-center p-1">
                    Khung Cố Định
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-muted/70 pt-2 border-t border-line/40">
                  <span>Không dùng đinh sắt cố định pano</span>
                  <span>Mộng gỗ tự do thở theo nhịp mùa mưa nắng Sài Gòn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 21-Day Vacuum Kiln Diary & Delmhorst Stamp */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* 4 Phases Kiln Tracker */}
            <div className="p-8 rounded-3xl bg-surface border border-line">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Quy Trình Sấy Chân Không 21 Ngày
              </span>
              <h3 className="font-serif text-2xl text-ink font-light mt-2">
                4 Pha Cân Bằng Độ Ẩm EMC
              </h3>

              <div className="mt-6 space-y-3">
                {KILN_PHASES.map((p, idx) => {
                  const isSelected = activePhaseIndex === idx
                  return (
                    <button
                      key={p.phase}
                      type="button"
                      onClick={() => setActivePhaseIndex(idx)}
                      className={cn(
                        'w-full p-4 rounded-2xl border text-left transition-all duration-300',
                        isSelected
                          ? 'border-accent bg-canvas shadow-sm ring-1 ring-accent/40'
                          : 'border-line/60 bg-surface hover:bg-canvas/50'
                      )}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-accent font-semibold">Pha 0{p.phase} · {p.days}</span>
                        <span className="text-muted">{p.targetMcPercent}</span>
                      </div>
                      <h4 className="font-serif text-sm font-medium text-ink mt-1">{p.title}</h4>
                      {isSelected && (
                        <div className="mt-2 pt-2 border-t border-line/60 text-xs font-mono space-y-1">
                          <p className="text-ink font-light leading-relaxed">{p.actionVi}</p>
                          <p className="text-accent text-[11px] font-light">Lưu ý: {p.technicalNote}</p>
                          <div className="flex gap-4 pt-1 text-[10px] text-muted">
                            <span>Nhiệt độ: {p.tempC}°C</span>
                            <span>Áp suất: {p.pressureMpa} MPa</span>
                          </div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Delmhorst US Moisture Meter Certificate Stamp */}
            <div className="p-6 rounded-3xl bg-canvas border border-line">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">
                  Chứng Thư Đo Kiểm Độ Ẩm Trước Khi Gia Công
                </span>
                <span className="text-xs font-mono text-accent">Delmhorst J-2000 USA</span>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-surface border border-line text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted">Đầu dò điện trở sâu:</span>
                  <span className="text-ink font-semibold">6 điểm đo xuyên tâm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Độ ẩm trung bình (EMC):</span>
                  <span className="text-accent font-semibold">11.2% (±0.4%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tiêu chuẩn nghiệm thu:</span>
                  <span className="text-ink">TCVN 1072:2018</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Kỹ thuật viên phê duyệt:</span>
                  <span className="text-accent">Xưởng trưởng Thạnh Xuân</span>
                </div>
              </div>
            </div>

            {/* Consultation Callout */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-espresso to-[#2B231D] text-canvas relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Tận Mắt Chứng Kiến
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-canvas mt-2">
                Trực tiếp cầm máy đo độ ẩm tại Xưởng Thạnh Xuân
              </h4>
              <p className="text-xs text-canvas/80 mt-3 font-light leading-relaxed">
                Chúng tôi trân trọng mời quý gia chủ ghé thăm xưởng sản xuất 1.200m² tại Quận 12 để trực tiếp kiểm tra từng khối gỗ óc chó trong lò sấy trước khi người thợ đặt nhát cưa đầu tiên.
              </p>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
                >
                  <span>Đặt lịch xe đón thăm xưởng gỗ</span>
                  <ArrowUpRightIcon className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
