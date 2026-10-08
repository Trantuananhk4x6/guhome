'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type CurvedApplicationId = 'acoustic-wave-wall' | 'curved-island' | 'pebble-table'

interface CurvedApplication {
  id: CurvedApplicationId
  title: string
  subtitle: string
  description: string
  defaultRadius: number
  acousticEffect: string
  ergonomicAdvantage: string
  woodCraftMethod: string
}

const CURVED_APPLICATIONS: CurvedApplication[] = [
  {
    id: 'acoustic-wave-wall',
    title: 'Vách Ngăn Lượn Sóng Tiêu Âm Phòng Khách',
    subtitle: 'Nét uốn mềm mại xóa bỏ góc chết bê tông thô cứng',
    description:
      'Hệ vách nan gỗ óc chó uốn lượn liên hoàn ngăn nhẹ giữa sảnh đón và phòng khách. Biên độ cong được tính toán để tán xạ sóng âm thanh, triệt tiêu hiện tượng dội tiếng trong căn hộ trần cao.',
    defaultRadius: 450,
    acousticEffect: 'Tán xạ sóng âm 3D, giảm tiếng dội ồn đô thị 45%',
    ergonomicAdvantage: 'Dẫn hướng luồng gió sông và ánh sáng lan tỏa mềm mại',
    woodCraftMethod: 'Ép khuôn định hình chân không 48 giờ liên tục',
  },
  {
    id: 'curved-island',
    title: 'Đảo Bếp Bo Góc Công Thái Học R150mm',
    subtitle: 'Bo tròn góc nhọn — Bảo vệ trẻ nhỏ & mở rộng lối đi',
    description:
      'Góc nhọn của bàn đảo bếp thường là điểm va chạm nguy hiểm với hông người lớn và trán trẻ nhỏ. GuHomes bo cong góc bán kính R150mm bằng kỹ thuật dán lạng veneer hút chân không liền mạch.',
    defaultRadius: 150,
    acousticEffect: 'Không cản luồng gió đối lưu từ ban công vào bếp',
    ergonomicAdvantage: 'Triệt tiêu 100% rủi ro chấn thương góc nhọn, đi lại thanh thoát',
    woodCraftMethod: 'Bào tay bo cạnh bằng bào gỗ thép gió Nhật Bản',
  },
  {
    id: 'pebble-table',
    title: 'Bàn Trà Mộc Hình Hạt Đậu Hữu Cơ',
    subtitle: 'Hình dáng tự nhiên của sỏi suối — Điêu khắc mộc độc bản',
    description:
      'Mặt bàn trà không tuân theo hình chữ nhật hay tròn đơn điệu mà mô phỏng viên sỏi suối tròn trịa. Chân bàn mộng gỗ giấu kín, các cạnh vát mỏng tạo cảm giác phiến gỗ trôi bồng bềnh.',
    defaultRadius: 300,
    acousticEffect: 'Tiêu tán phản xạ âm sàn gạch men hoặc đá',
    ergonomicAdvantage: 'Vừa vặn hoàn hảo với sofa chữ L hoặc sofa cong Quiet Luxury',
    woodCraftMethod: 'Mộng mang cá giấu âm + Dầu Osmo mịn như lụa',
  },
]

const DEFAULT_CURVED_APP = CURVED_APPLICATIONS[1] as CurvedApplication

export function CurvedWoodCraftLab({ className }: { className?: string }) {
  const radiusSliderId = useId()
  const [selectedApp, setSelectedApp] = useState<CurvedApplicationId>('curved-island')
  const [radius, setRadius] = useState<number>(150)

  const current: CurvedApplication = CURVED_APPLICATIONS.find((a) => a.id === selectedApp) ?? DEFAULT_CURVED_APP

  // Derived Mechanical & Acoustic Metrics
  const tensileStress = Math.round(18.5 - (radius / 600) * 11.2) // N/mm2
  const soundScatteringNrc = (0.55 + (radius / 600) * 0.22).toFixed(2)
  const safetyIndex = radius >= 200 ? 'Tuyệt Đối An Toàn (10/10)' : radius >= 120 ? 'Rất Cao (9/10)' : 'Tiêu Chuẩn (7.5/10)'

  return (
    <section className={cn('relative bg-[#0E1312] text-[#F3F1EC] py-16 sm:py-24 border-y border-white/10 overflow-hidden', className)}>
      {/* Background curvature glow */}
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[150px]" />

      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Nghệ Thuật Mộc Uốn Cong</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-3 tracking-tight">
              Phòng Thử Nghiệm Bào Tay Mộc Mặt Cong
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[64ch] mt-3 font-light leading-relaxed">
              Mặt cong hữu cơ là đỉnh cao của nghề mộc thủ công: nó đòi hỏi hiểu thấu từng thớ gỗ để uốn lượn mà không rạn nứt. Tại xưởng Thạnh Xuân, chúng tôi kết hợp ép lạnh chân không và lưỡi bào tay thép gió để tạo nên những đường cong lụa là.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 block text-[10px]">CÔNG NGHỆ ÉP NGUỘI</span>
              <span className="text-accent text-sm font-semibold">Titebond III (Mỹ)</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 block text-[10px]">ĐỘ CO GIÃN THỚ VENEER</span>
              <span className="text-emerald-400 text-sm font-semibold">0% Rạn Chân Chim</span>
            </div>
          </div>
        </div>

        {/* 3 Application Pills */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {CURVED_APPLICATIONS.map((item) => {
            const isSelected = item.id === selectedApp
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedApp(item.id)
                  setRadius(item.defaultRadius)
                }}
                className={cn(
                  'p-4 sm:p-5 rounded-2xl border text-left transition-all',
                  isSelected
                    ? 'border-accent bg-accent/15 text-white shadow-lg'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
                )}
              >
                <span className="text-[10px] font-mono text-accent block uppercase">ỨNG DỤNG MẶT CONG</span>
                <h3 className="font-serif text-base font-medium text-white mt-1">{item.title}</h3>
                <p className="text-xs text-white/50 font-light mt-1 line-clamp-1">{item.subtitle}</p>
              </button>
            )
          })}
        </div>

        {/* Interactive Lab Studio Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Dynamic Curvature Arc Canvas (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="relative rounded-3xl border border-white/15 bg-[#141A19] p-6 sm:p-9 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-accent uppercase tracking-wider">
                  Mô Phỏng Bán Kính Uốn Cong R = {radius}mm
                </span>
                <span className="text-xs font-mono text-white/60">
                  Thớ Gỗ Óc Chó FAS 0.6mm
                </span>
              </div>

              {/* Dynamic SVG Curvature Visualizer */}
              <div className="my-8 flex items-center justify-center">
                <svg viewBox="0 0 320 220" className="w-full h-56 text-accent" fill="none">
                  {/* Grid background */}
                  <line x1="20" y1="200" x2="300" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <line x1="20" y1="20" x2="20" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                  {/* Corner tangent lines */}
                  <line x1="40" y1="40" x2="40" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="180" x2="280" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Dynamic Arc representation */}
                  {/* We map radius 100-600 to arc control points */}
                  {(() => {
                    const normR = Math.max(30, Math.min(130, (radius / 600) * 130))
                    const startY = 180 - normR
                    const endX = 40 + normR
                    return (
                      <>
                        {/* Wood thickness band */}
                        <path
                          d={`M 40,40 L 40,${startY} Q 40,180 ${endX},180 L 280,180`}
                          stroke="#E5C17B"
                          strokeWidth="14"
                          strokeLinecap="round"
                          fill="none"
                        />
                        {/* Core flexible plywood lines */}
                        <path
                          d={`M 40,40 L 40,${startY} Q 40,180 ${endX},180 L 280,180`}
                          stroke="#8C6239"
                          strokeWidth="8"
                          fill="none"
                        />
                        {/* Outer natural veneer edge */}
                        <path
                          d={`M 33,40 L 33,${startY} Q 33,187 ${endX},187 L 280,187`}
                          stroke="#FFD2A0"
                          strokeWidth="2.5"
                          fill="none"
                        />
                        {/* Radius indicator circle and dimension line */}
                        <circle cx={40 + normR} cy={180 - normR} r="3" fill="#5EEAD4" />
                        <line x1={40 + normR} y1={180 - normR} x2="40" y2={180 - normR} stroke="#5EEAD4" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1={40 + normR} y1={180 - normR} x2={40 + normR} y2="180" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="2 2" />
                        <text x={45 + normR} y={175 - normR} fill="#5EEAD4" fontSize="10" fontFamily="monospace">
                          R = {radius}mm
                        </text>
                      </>
                    )
                  })()}
                </svg>
              </div>

              {/* Slider for Radius R */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={radiusSliderId} className="text-xs font-mono text-white/80">
                    Bán Kính Bo Cong (Radius R):
                  </label>
                  <span className="font-mono text-base font-semibold text-accent">{radius} mm</span>
                </div>
                <input
                  id={radiusSliderId}
                  type="range"
                  min="100"
                  max="600"
                  step="10"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-white/20 appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[11px] font-mono text-white/40 mt-2">
                  <span>R100mm (Bo mép hẹp)</span>
                  <span>R250mm (Đảo bếp ôm eo)</span>
                  <span>R600mm (Vách lượn sóng)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mechanical Diagnostics & Master Woodshop Insights (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* 3 Real-time Diagnostic Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="text-[10px] text-white/50 uppercase block">Ứng suất kéo thớ gỗ:</span>
                <span className="text-accent text-lg font-semibold block mt-1">{tensileStress} N/mm²</span>
                <span className="text-emerald-400 text-[10px] block mt-1">✓ Dưới ngưỡng tới hạn 24</span>
              </div>

              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="text-[10px] text-white/50 uppercase block">Hệ số tán xạ âm NRC:</span>
                <span className="text-accent text-lg font-semibold block mt-1">{soundScatteringNrc} NRC</span>
                <span className="text-white/60 text-[10px] block mt-1">Tiêu âm sóng hài</span>
              </div>

              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="text-[10px] text-white/50 uppercase block">Chỉ số an toàn va đập:</span>
                <span className="text-emerald-400 text-sm font-semibold block mt-1 leading-snug">{safetyIndex}</span>
                <span className="text-white/50 text-[10px] block mt-1">Chuẩn công thái học</span>
              </div>
            </div>

            {/* Application Deep Dive Card */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-md">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                Phân Tích Chi Tiết Ứng Dụng
              </span>
              <h3 className="font-serif text-2xl text-white font-light mt-1">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light mt-2 leading-relaxed">
                {current.description}
              </p>

              <div className="mt-5 space-y-2.5 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="text-accent text-sm">✦</span>
                  <p className="text-white/80">
                    <strong className="text-white font-medium">Lợi ích âm học:</strong> {current.acousticEffect}
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 text-sm">✦</span>
                  <p className="text-white/80">
                    <strong className="text-white font-medium">Công thái học:</strong> {current.ergonomicAdvantage}
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 text-sm">✦</span>
                  <p className="text-white/80">
                    <strong className="text-white font-medium">Bí quyết mộc:</strong> {current.woodCraftMethod}
                  </p>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <a
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 rounded-full bg-accent text-canvas text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent/90 transition-all shadow-md"
                >
                  <span>Đặt Hàng Chi Tiết Mộc Uốn Cong Thửa Riêng</span>
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
