'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type RiverWindPatternId = 'south-southeast' | 'southwest-monsoon' | 'northeast-dry'

interface WindPattern {
  id: RiverWindPatternId
  nameVi: string
  directionLabel: string
  outdoorVelocityMs: number
  humidityAvg: number
  seasonVi: string
  characterVi: string
  sensoryDescription: string
}

const RIVER_WIND_PATTERNS: Record<RiverWindPatternId, WindPattern> = {
  'south-southeast': {
    id: 'south-southeast',
    nameVi: 'Gió Nam & Đông Nam Sông Sài Gòn',
    directionLabel: 'Gió Sông & Gió Biển Cần Giờ (135° – 180°)',
    outdoorVelocityMs: 3.8,
    humidityAvg: 76,
    seasonVi: 'Quanh năm (Mạnh nhất từ tháng 3 đến tháng 9)',
    characterVi: 'Mát mẻ, mang hơi nước sông nước trong lành và độ ẩm cân bằng tự nhiên.',
    sensoryDescription:
      'Gió sông thổi đều đặn từ cửa ngõ Cần Giờ dọc sông Sài Gòn qua bán đảo Thủ Thiêm và Thảo Điền. Luồng gió giàu ion âm mang lại cảm giác dịu mát sảng khoái ngay khi bước vào căn hộ.',
  },
  'southwest-monsoon': {
    id: 'southwest-monsoon',
    nameVi: 'Gió Mùa Tây Nam Mùa Mưa',
    directionLabel: 'Gió Đối Lưu Vịnh Thái Lan (225°)',
    outdoorVelocityMs: 5.2,
    humidityAvg: 88,
    seasonVi: 'Mùa mưa (Tháng 5 đến tháng 11)',
    characterVi: 'Vận tốc mạnh, đối lưu nhiệt áp suất thấp, hạ nhiệt nhanh sau cơn mưa chiều.',
    sensoryDescription:
      'Những cơn mưa rào Sài Gòn đi kèm luồng gió mát đối lưu mạnh mẽ. Khéo léo điều chỉnh góc lam gió giúp hút trọn khí mát sau mưa mà không để giọt nước tạt vào sàn gỗ.',
  },
  'northeast-dry': {
    id: 'northeast-dry',
    nameVi: 'Gió Chướng Đông Bắc Mùa Khô',
    directionLabel: 'Gió Lục Địa Hanh Khô (45°)',
    outdoorVelocityMs: 2.8,
    humidityAvg: 62,
    seasonVi: 'Mùa khô (Tháng 12 đến tháng 2 năm sau)',
    characterVi: 'Se lạnh vào sáng sớm và đêm, độ ẩm thấp, thông thoáng sảng khoái.',
    sensoryDescription:
      'Đặc trưng tuyệt mỹ của mùa cuối năm tại Sài Gòn. Ban đêm nhiệt độ hạ xuống 22°C–24°C, mở thông gió đối lưu hoàn toàn thay thế máy lạnh, giúp tiết kiệm 100% điện năng.',
  },
}

export function RiverBreezeAerodynamicsLab({ className }: { className?: string }) {
  const [selectedWindId, setSelectedWindId] = useState<RiverWindPatternId>('south-southeast')
  const [balconyAperture, setBalconyAperture] = useState<number>(70) // 0% - 100%
  const [louverAngle, setLouverAngle] = useState<number>(45) // 0° - 90°
  const [rearExhaustOpen, setRearExhaustOpen] = useState<number>(100) // 0%, 30%, 100%

  const pattern = RIVER_WIND_PATTERNS[selectedWindId] ?? RIVER_WIND_PATTERNS['south-southeast']

  // Aerodynamics calculations based on Bernoulli's principle & Venturi effect
  // Flow is proportional to opening area and pressure gradient between front and rear
  const apertureFactor = balconyAperture / 100
  const louverFactor = Math.sin((louverAngle * Math.PI) / 180) // max at 90°, moderate at 45°
  const exhaustFactor = rearExhaustOpen / 100

  // If rear is closed, wind stagnates (dead air pocket); if open, cross-ventilation engages
  const indoorVelocity = Math.round(
    pattern.outdoorVelocityMs * apertureFactor * (0.2 + 0.5 * louverFactor) * (0.3 + 0.7 * exhaustFactor) * 10
  ) / 10

  // Air Changes per Hour (ACH)
  const ach = Math.round((1.2 + indoorVelocity * 4.2) * 10) / 10

  // Sensory cooling delta (°C)
  const sensoryCooling = Math.round((indoorVelocity * 1.6) * 10) / 10

  // Bedroom CO2 level (ppm) - Base 1150 ppm (closed room), drops down to 480 ppm with fresh air
  const co2Ppm = Math.max(460, Math.round(1150 - ach * 95))

  const uniqueId = useId()

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Khí Động Học Nhà Ở Ven Sông · GuHomes Aerodynamics Lab
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Bernoulli &amp; Venturi Cooling
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Mô Phỏng Gió Sông Sài Gòn &amp; Làm Mát Tự Nhiên
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Các căn hộ ven sông đón luồng gió đối lưu tự nhiên vô giá. Bằng việc bố trí mặt bằng xuyên phòng kết hợp vách lam xoay 45° và ô thoát gió hậu, GuHomes giúp căn hộ tự hạ nhiệt tới -3.8°C mà không cần phụ thuộc điều hòa 24/7.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Mô phỏng khí động học thời gian thực</span>
          </div>
        </div>

        {/* 3 Wind Directions Selector */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {(Object.keys(RIVER_WIND_PATTERNS) as RiverWindPatternId[]).map((wId) => {
            const w = RIVER_WIND_PATTERNS[wId]
            const isSelected = selectedWindId === wId
            return (
              <button
                key={wId}
                type="button"
                onClick={() => setSelectedWindId(wId)}
                className={cn(
                  'p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-canvas shadow-md ring-1 ring-accent/40'
                    : 'border-line bg-surface hover:bg-canvas/60 hover:border-line-dark'
                )}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-accent">
                    <span>{w.directionLabel}</span>
                    <span className="font-semibold">{w.outdoorVelocityMs} m/s</span>
                  </div>
                  <h3 className="font-serif text-base font-medium text-ink mt-1.5">{w.nameVi}</h3>
                </div>
                <p className="text-xs text-muted mt-2 font-light leading-relaxed">{w.characterVi}</p>
                <div className="mt-4 pt-3 border-t border-line/60 text-[11px] font-mono text-muted/80">
                  <span>{w.seasonVi}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Aerodynamics Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Aperture Sliders & Flow Simulation */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            {/* Aerodynamics Controls Card */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Tham Số Điều Tiết Khí Động Học Căn Hộ</span>
                <span className="text-accent">Thay đổi góc mở để tối ưu đối lưu</span>
              </div>

              <div className="mt-6 space-y-6">
                {/* Balcony Glass Opening */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-ink font-semibold">1. Độ mở cửa kính lùa ban công chính:</span>
                    <span className="text-accent text-sm font-semibold">{balconyAperture}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={balconyAperture}
                    onChange={(e) => setBalconyAperture(parseInt(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted/60 mt-1">
                    <span>0% (Đóng kín)</span>
                    <span>50% (Mở một cánh)</span>
                    <span>100% (Mở thông thủy trọn vẹn)</span>
                  </div>
                </div>

                {/* Wooden Louver Pivot Angle */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-ink font-semibold">2. Góc xoay vách lam gỗ tự nhiên (Pivot Louver):</span>
                    <span className="text-accent text-sm font-semibold">{louverAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={louverAngle}
                    onChange={(e) => setLouverAngle(parseInt(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted/60 mt-1">
                    <span>0° (Khép kín chắn nắng)</span>
                    <span>45° (Góc đón gió tối ưu)</span>
                    <span>90° (Mở thẳng 100%)</span>
                  </div>
                </div>

                {/* Rear Logia Exhaust Opening */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-ink font-semibold">3. Ô thoát gió logia sau (Rear Exhaust Aperture):</span>
                    <span className="text-accent text-sm font-semibold">
                      {rearExhaustOpen === 0 ? 'Đóng (0%)' : rearExhaustOpen === 30 ? 'Hé mở (30%)' : 'Mở trọn (100%)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 0, label: 'Đóng kín (0%)' },
                      { val: 30, label: 'Hé mở (30%)' },
                      { val: 100, label: 'Mở trọn (100%)' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setRearExhaustOpen(opt.val)}
                        className={cn(
                          'py-2 px-3 rounded-xl text-xs font-mono border transition-all',
                          rearExhaustOpen === opt.val
                            ? 'bg-accent text-canvas border-accent font-semibold shadow-sm'
                            : 'bg-surface border-line text-muted hover:text-ink'
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Calculation Gauges */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-line/60">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Vận tốc gió trong phòng</p>
                  <p className="text-2xl font-serif mt-1 font-light text-accent">
                    {indoorVelocity.toFixed(1)} m/s
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Hiệu ứng Venturi</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Tỷ lệ đổi khí tươi (ACH)</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {ach.toFixed(1)} <span className="text-xs">lần/giờ</span>
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Air Changes/Hr</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Nhiệt độ cảm nhận giảm</p>
                  <p className="text-2xl font-serif mt-1 font-light text-accent">
                    -{sensoryCooling.toFixed(1)}°C
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Không tốn điện</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Nồng độ CO2 phòng ngủ</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {co2Ppm} <span className="text-xs">ppm</span>
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Chuẩn thở sâu (&lt;600)</p>
                </div>
              </div>
            </div>

            {/* Visual Cross-Section Floor Plan Streamline Canvas */}
            <div className="p-8 rounded-3xl bg-canvas border border-line relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Mặt Bằng Khí Động Học &amp; Dòng Hạt Gió (Wind Streamlines)</span>
                <span className={indoorVelocity > 0.8 ? 'text-accent font-semibold' : 'text-amber-600'}>
                  {indoorVelocity > 0.8 ? 'Đối lưu xuyên phòng thông suốt' : 'Tù đọng khí (Cần mở ô thoát gió)'}
                </span>
              </div>

              {/* Graphic SVG Floor Plan Wind Vector Flow */}
              <div className="mt-6 relative h-56 sm:h-64 w-full rounded-2xl bg-[#141210] border border-line p-6 flex flex-col justify-between overflow-hidden">
                {/* Labels Header */}
                <div className="flex justify-between items-center text-[10px] font-mono text-white/60 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span>Cửa Ban Công Hướng Sông ({balconyAperture}%)</span>
                  </div>
                  <div>Vách Lam Gỗ Xoay ({louverAngle}°)</div>
                  <div className="flex items-center gap-1.5">
                    <span>Ô Thoát Gió Hậu ({rearExhaustOpen}%)</span>
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                </div>

                {/* SVG Animated Wind Streamlines */}
                <svg
                  viewBox="0 0 600 160"
                  className="w-full h-full my-auto overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`streamline-grad-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--color-accent, #B88E44)" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="var(--color-accent, #B88E44)" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Wind Lines */}
                  {[30, 60, 90, 120].map((yOffset, i) => (
                    <motion.path
                      key={yOffset}
                      d={`M 0 ${yOffset} C 150 ${yOffset - 15 * Math.sin(i)}, 300 ${
                        yOffset + 20 * Math.cos(i)
                      }, 450 ${yOffset - 10}, 600 ${yOffset}`}
                      fill="none"
                      stroke={`url(#streamline-grad-${uniqueId})`}
                      strokeWidth={Math.max(1, indoorVelocity * 1.5)}
                      strokeDasharray={indoorVelocity > 0 ? '8 4' : '2 6'}
                      animate={{
                        strokeDashoffset: indoorVelocity > 0 ? [0, -48] : 0,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: Math.max(0.6, 3.5 - indoorVelocity),
                        ease: 'linear',
                      }}
                      opacity={indoorVelocity > 0.2 ? 0.85 : 0.2}
                    />
                  ))}

                  {/* Louver Blades In Floor Plan */}
                  <g transform="translate(300, 40)">
                    <rect x="-4" y="0" width="8" height="80" rx="2" fill="#8B6F47" />
                    <line
                      x1="0"
                      y1="20"
                      x2={25 * Math.cos((louverAngle * Math.PI) / 180)}
                      y2={20 + 25 * Math.sin((louverAngle * Math.PI) / 180)}
                      stroke="var(--color-accent)"
                      strokeWidth="3"
                    />
                    <line
                      x1="0"
                      y1="50"
                      x2={25 * Math.cos((louverAngle * Math.PI) / 180)}
                      y2={50 + 25 * Math.sin((louverAngle * Math.PI) / 180)}
                      stroke="var(--color-accent)"
                      strokeWidth="3"
                    />
                  </g>
                </svg>

                {/* Footer Insight */}
                <div className="flex justify-between items-center text-[10px] font-mono text-white/50 pt-2 border-t border-white/10">
                  <span>Vận tốc ngoài trời: {pattern.outdoorVelocityMs} m/s</span>
                  <span>Lưu lượng gió phòng: {indoorVelocity.toFixed(1)} m/s (Cảm giác mát -{sensoryCooling}°C)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Solutions & Case Study */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* Architectural Solutions Matrix */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Giải Pháp Bố Trí Mặt Bằng GuHomes
              </span>
              <h3 className="font-serif text-2xl text-ink font-light mt-2">
                Nghệ Thuật Mượn Gió Tự Nhiên
              </h3>

              <div className="mt-6 space-y-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <span className="text-accent">01. Mặt Bằng Xuyên Phòng (Flow-Through)</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    Tránh tuyệt đối thiết kế chia vách kín tạo túi khí tù đọng (dead air pocket). Phòng khách, phòng ăn và bếp được kết nối liên hoàn thành một hành lang đón gió rộng mở.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <span className="text-accent">02. Vách Lam Gỗ Xoay Pivot 360°</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    Hệ lam gỗ sồi hoặc óc chó tự nhiên xoay linh hoạt từ 0° đến 90°. Ban ngày xoay 45° để chắn bức xạ nắng xế chiều đồng thời hứng trọn gió sông luồn vào phòng ngủ.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <span className="text-accent">03. Cửa Lùa Không Ray Âm Sàn (Flush Threshold)</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    Mặt sàn trong nhà và ban công bằng phẳng tuyệt đối, rãnh thoát nước mưa âm giấu kín, cho phép mở rộng 100% diện tích đón gió sông mà không gây vấp ngã.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <span className="text-accent">04. Khí Tươi Tự Nhiên &amp; Giấc Ngủ Sâu</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    Nồng độ CO2 phòng ngủ duy trì dưới 500 ppm giúp não bộ hấp thụ đủ oxy suốt đêm, loại bỏ hoàn toàn cảm giác nhức đầu hay khô cổ họng khi ngủ dậy.
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Callout */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-espresso to-[#2B231D] text-canvas relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Khảo Sát Thực Địa
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-canvas mt-2">
                Đo đạc luồng gió thực tế bằng máy Testo Đức
              </h4>
              <p className="text-xs text-canvas/80 mt-3 font-light leading-relaxed">
                KTS GuHomes sẽ mang máy đo vận tốc và áp suất gió trực tiếp đến căn hộ ven sông của bạn để vẽ biểu đồ khí động học riêng trước khi lên phương án bố trí nội thất.
              </p>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
                >
                  <span>Đăng ký đo đạc khí động học căn hộ</span>
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
