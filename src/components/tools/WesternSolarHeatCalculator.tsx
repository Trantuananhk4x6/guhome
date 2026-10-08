'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type ProjectTypology = 'penthouse' | 'townhouse' | 'condo'
export type ElevationFloor = 'low' | 'mid' | 'high'

interface TypologyOption {
  id: ProjectTypology
  name: string
  subtitle: string
  defaultGlassArea: number
  exposureFactor: number
}

interface ElevationOption {
  id: ElevationFloor
  name: string
  floors: string
  solarRadiationFactor: number
  windDescription: string
}

const TYPOLOGY_OPTIONS: TypologyOption[] = [
  {
    id: 'penthouse',
    name: 'Penthouse & Duplex Sông Sài Gòn',
    subtitle: 'Vách kính cao tầng hướng Tây khúc sông cong',
    defaultGlassArea: 48,
    exposureFactor: 1.25,
  },
  {
    id: 'townhouse',
    name: 'Nhà Phố Mặt Tiền Hướng Tây',
    subtitle: 'Mặt đứng bê tông & ban công đón nắng xế chiều',
    defaultGlassArea: 28,
    exposureFactor: 1.15,
  },
  {
    id: 'condo',
    name: 'Căn Hộ Chung Cư Tiêu Chuẩn',
    subtitle: 'Cửa kính logia và phòng ngủ Master đón nắng chiều',
    defaultGlassArea: 20,
    exposureFactor: 1.0,
  },
]

const ELEVATION_OPTIONS: ElevationOption[] = [
  {
    id: 'low',
    name: 'Tầng Thấp (Tầng 1 – 10)',
    floors: 'Được che chắn một phần bởi cây xanh & bóng râm đô thị',
    solarRadiationFactor: 0.88,
    windDescription: 'Gió đối lưu mặt đất chậm, nhiệt nhả từ mặt đường bê tông.',
  },
  {
    id: 'mid',
    name: 'Tầng Trung (Tầng 11 – 25)',
    floors: 'Bức xạ nhiệt trực diện góc nghiêng 45° lúc 15:00',
    solarRadiationFactor: 1.05,
    windDescription: 'Gió tầng trung ổn định, phản xạ mặt kính tòa nhà đối diện.',
  },
  {
    id: 'high',
    name: 'Tầng Cao & Áp Mái (Tầng 26 – 45+)',
    floors: 'Bức xạ cực đại kèm nhiệt độ mặt kính lên tới 48°C',
    solarRadiationFactor: 1.22,
    windDescription: 'Gió lộng cực mạnh, không có bất kỳ vật cản bóng râm nào.',
  },
]

const DEFAULT_TYPOLOGY = TYPOLOGY_OPTIONS[0] as TypologyOption
const DEFAULT_ELEVATION = ELEVATION_OPTIONS[2] as ElevationOption

export function WesternSolarHeatCalculator({ className }: { className?: string }) {
  const glassAreaSliderId = useId()
  const [typology, setTypology] = useState<ProjectTypology>('penthouse')
  const [glassArea, setGlassArea] = useState<number>(45)
  const [elevation, setElevation] = useState<ElevationFloor>('high')

  const currentTypology: TypologyOption = TYPOLOGY_OPTIONS.find((t) => t.id === typology) ?? DEFAULT_TYPOLOGY
  const currentElevation: ElevationOption = ELEVATION_OPTIONS.find((e) => e.id === elevation) ?? DEFAULT_ELEVATION

  // Thermodynamic Calculation Engine
  const baseOuterGlassTemp = 44 + (currentElevation.solarRadiationFactor - 1) * 15
  const outerGlassTemp = Math.min(48.5, Math.max(43.0, Number(baseOuterGlassTemp.toFixed(1))))

  // Without treatment
  const untreatedRoomTemp = Number(
    (34.2 + (glassArea / 50) * 1.6 * currentElevation.solarRadiationFactor).toFixed(1)
  )

  // With GuHomes 3-layer passive climate solution (45-degree Walnut Louvers + Ceramic Filter + Italian Calce lime plaster)
  const treatedRoomTemp = Number((26.3 + (glassArea / 80) * 0.5).toFixed(1))
  const tempReduction = Number((untreatedRoomTemp - treatedRoomTemp).toFixed(1))

  // Energy savings (HVAC electric bill reduction)
  const monthlyHvacSavingKwh = Math.round(glassArea * 28 * currentElevation.solarRadiationFactor)
  const monthlyCostSavingVnd = monthlyHvacSavingKwh * 3200 // ~3200 VND/kWh high tier
  const formattedSavingVnd = new Intl.NumberFormat('vi-VN').format(monthlyCostSavingVnd)

  return (
    <section className={cn('relative bg-[#0F1413] text-[#F3F1EC] py-16 sm:py-24 border-y border-white/10 overflow-hidden', className)}>
      {/* Background Solar Radiation Heat Map Ambient Light */}
      <div className="pointer-events-none absolute -top-32 right-10 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-amber-600/20 via-orange-700/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 left-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-900/20 via-teal-900/10 to-transparent blur-[140px]" />

      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <span>Năng Lượng &amp; Vi Khí Hậu Hướng Tây</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-3 tracking-tight">
              Bộ Tính Toán Bức Xạ Nhiệt Vách Kính
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[62ch] mt-3 font-light leading-relaxed">
              Ánh nắng chiều hướng Tây tại TP.HCM có thể nung nóng mặt kính lên tới 48°C, làm phòng khách nóng bức như lò sấy và hủy hoại thớ gỗ tự nhiên. Hãy khám phá hiệu quả hạ nhiệt của giải pháp vi khí hậu GuHomes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 block text-[10px]">HẠ NHIỆT ĐỘ PHÒNG</span>
              <span className="text-emerald-400 text-base font-semibold">Giảm -{tempReduction}°C</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 block text-[10px]">TIẾT KIỆM ĐIỆN LẠNH</span>
              <span className="text-accent text-base font-semibold">42% – 52% KWh</span>
            </div>
          </div>
        </div>

        {/* Interactive Calculator Body */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Input (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 1. Typology Selector */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-md">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-3">
                01 · Loại Hình Công Trình
              </span>
              <div className="flex flex-col gap-2.5">
                {TYPOLOGY_OPTIONS.map((item) => {
                  const isSelected = typology === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setTypology(item.id)
                        setGlassArea(item.defaultGlassArea)
                      }}
                      className={cn(
                        'flex flex-col p-3.5 rounded-xl border text-left transition-all',
                        isSelected
                          ? 'border-accent bg-accent/15 text-white shadow-md'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
                      )}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-[11px] font-mono text-white/50 mt-1">{item.subtitle}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Glass Area Slider */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={glassAreaSliderId} className="text-xs font-mono text-accent uppercase tracking-wider">
                  02 · Diện Tích Vách Kính Hướng Tây
                </label>
                <span className="font-mono text-base font-semibold text-white">{glassArea} m²</span>
              </div>
              <p className="text-xs text-white/60 mb-5 font-light">
                Tổng diện tích các mảng kính kịch trần tiếp xúc trực diện nắng Tây từ 14:00 đến 17:30.
              </p>

              <input
                id={glassAreaSliderId}
                type="range"
                min="15"
                max="80"
                step="1"
                value={glassArea}
                onChange={(e) => setGlassArea(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-white/20 appearance-none cursor-pointer accent-accent"
              />

              <div className="flex justify-between text-[11px] font-mono text-white/40 mt-2">
                <span>15 m² (Cửa Logia)</span>
                <span>45 m² (Vách góc Penthouse)</span>
                <span>80 m² (Panorama 2 tầng)</span>
              </div>
            </div>

            {/* 3. Elevation Selector */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-md">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-3">
                03 · Cao Độ Tầng
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ELEVATION_OPTIONS.map((item) => {
                  const isSelected = elevation === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setElevation(item.id)}
                      className={cn(
                        'p-3 rounded-xl border text-center transition-all',
                        isSelected
                          ? 'border-accent bg-accent/20 text-white shadow-sm'
                          : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                      )}
                    >
                      <span className="text-xs font-medium block">{item.name.split('(')[0]}</span>
                      <span className="text-[10px] font-mono text-accent block mt-1">
                        {item.id === 'high' ? 'Gió lộng cực đại' : item.id === 'mid' ? 'Nắng rọi trực tiếp' : 'Bóng râm'}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="text-[11px] text-white/50 font-light mt-3 leading-relaxed">
                {currentElevation.windDescription}
              </p>
            </div>
          </div>

          {/* Real-time Thermodynamic Results (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Main Comparative Chamber Box */}
            <div className="rounded-3xl border border-white/15 bg-[#171D1B] p-6 sm:p-9 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-wider">
                    Phân Tích Nhiệt Lúc 15:00 Chiều Sài Gòn
                  </span>
                  <h3 className="font-serif text-2xl font-light text-white mt-1">
                    So Sánh Biên Độ Nhiệt Trước &amp; Sau Giải Pháp
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-amber-400 block">NHIỆT KÍNH NGOÀI TRỜI</span>
                  <span className="font-mono text-xl sm:text-2xl font-semibold text-amber-400">{outerGlassTemp}°C</span>
                </div>
              </div>

              {/* Temperature Duel Gauge */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Before: Untreated Glass Box */}
                <div className="p-6 rounded-2xl border border-red-500/30 bg-red-950/20 text-red-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-red-500/20">
                      <span className="text-xs font-mono uppercase tracking-wider text-red-300">
                        Chưa Xử Lý (Kính trần)
                      </span>
                      <span className="text-xs font-mono text-red-400">⚠️ Bức xạ cao</span>
                    </div>
                    <div className="my-5">
                      <span className="text-4xl sm:text-5xl font-mono font-light text-red-400 block">
                        {untreatedRoomTemp}°C
                      </span>
                      <span className="text-xs text-red-200/80 mt-1 block">
                        Nhiệt độ phòng khách đo tại sofa
                      </span>
                    </div>
                    <ul className="text-xs space-y-1.5 text-red-200/70 border-t border-red-500/20 pt-3">
                      <li>• Máy lạnh điều hòa phải chạy 100% công suất liên tục.</li>
                      <li>• Gỗ óc chó bị bốc hơi ẩm nhanh, tăng nguy cơ nứt chân chim.</li>
                      <li>• Chói mắt gay gắt, buộc phải kéo kín rèm làm mất view nhìn.</li>
                    </ul>
                  </div>
                </div>

                {/* After: GuHomes 3-Layer Solution */}
                <div className="p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/25 text-emerald-100 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                        Giải Pháp 3 Lớp GuHomes
                      </span>
                      <span className="text-xs font-mono text-emerald-300 font-semibold">✓ Khí hậu lý tưởng</span>
                    </div>
                    <div className="my-5">
                      <span className="text-4xl sm:text-5xl font-mono font-light text-emerald-300 block">
                        {treatedRoomTemp}°C
                      </span>
                      <span className="text-xs text-emerald-200/80 mt-1 block">
                        Giảm ngay -{tempReduction}°C mát rượi tự nhiên
                      </span>
                    </div>
                    <ul className="text-xs space-y-1.5 text-emerald-200/80 border-t border-emerald-500/30 pt-3">
                      <li>• Lam trần gỗ óc chó xoay 45° triệt tiêu tia nắng xiên.</li>
                      <li>• Phim cách nhiệt Ceramic cắt 99% tia tử ngoại hồng ngoại.</li>
                      <li>• Tường vôi khoáng Calce Ý hấp thụ nhiệt năng ban ngày.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Economic Savings & Wood Preservation Banner */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <span className="text-[11px] font-mono text-accent uppercase block">
                    Tiết kiệm chi phí điện điều hòa:
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-mono text-xl sm:text-2xl font-semibold text-white">
                      ~ {formattedSavingVnd} đ
                    </span>
                    <span className="text-xs text-white/60">/ tháng</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50 block mt-1">
                    Giảm ~{monthlyHvacSavingKwh} kWh điện năng làm mát mỗi tháng
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase block">
                    Bảo toàn tuổi thọ đồ gỗ mộc:
                  </span>
                  <p className="text-xs text-white/80 font-light mt-1.5 leading-relaxed">
                    Độ ẩm sợi gỗ (EMC) được giữ nguyên ở mức 10%–12%, các mối mộng âm dương không bị co ngót xộc xệch theo năm tháng.
                  </p>
                </div>
              </div>
            </div>

            {/* Testo Laser Survey CTA Bar */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg text-white font-medium">
                  Đăng Ký Khảo Sát Bức Xạ Thực Địa Miễn Phí
                </h4>
                <p className="text-xs text-white/70 font-light mt-1 max-w-[50ch]">
                  KTS GuHomes sẽ mang máy quét nhiệt hồng ngoại Testo đến tận căn hộ của bạn để đo đạc chính xác biểu đồ nhiệt từng vị trí vách kính.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent/90 transition-all shrink-0 shadow-lg"
              >
                <span>Hẹn Đo Nhiệt Thực Tế</span>
                <ArrowUpRightIcon className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
