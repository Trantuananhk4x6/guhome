'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type TimeOfDay = 'morning' | 'noon' | 'sunset' | 'night'

interface TimeSetting {
  id: TimeOfDay
  time: string
  label: string
  sunAngle: number
  causticOffset: { x: number; y: number }
  lightDescription: string
  colorTheme: string
  floorCausticStyle: string
}

const TIME_SETTINGS: Record<TimeOfDay, TimeSetting> = {
  morning: {
    id: 'morning',
    time: '08:30',
    label: 'Nắng Sớm Rực Rỡ (Xiên 45°)',
    sunAngle: 45,
    causticOffset: { x: -28, y: 15 },
    lightDescription: 'Tia nắng ban mai rọi nghiêng qua vòm kính, phủ bóng đổ màu ngọc lục bảo và hổ phách rực rỡ lên tường sảnh thông tầng.',
    colorTheme: 'from-amber-500/30 via-emerald-500/20 to-teal-500/30',
    floorCausticStyle: 'radial-gradient(ellipse 65% 55% at 35% 65%, rgba(245,158,11,0.35), rgba(16,185,129,0.25), transparent 75%)',
  },
  noon: {
    id: 'noon',
    time: '12:00',
    label: 'Ban Trưa Đỉnh Điểm (Vuông Góc 90°)',
    sunAngle: 90,
    causticOffset: { x: 0, y: 0 },
    lightDescription: 'Ánh dương hội tụ thẳng đứng qua tâm vòm sen nở, biến sàn đá cẩm thạch Calacatta thành bức tranh vạn hoa muôn màu sắc bén.',
    colorTheme: 'from-blue-500/30 via-purple-500/25 to-amber-500/35',
    floorCausticStyle: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(59,130,246,0.35), rgba(217,119,6,0.3), rgba(236,72,153,0.25), transparent 75%)',
  },
  sunset: {
    id: 'sunset',
    time: '17:15',
    label: 'Hoàng Hôn Vàng Hổ Phách (Xiên 135°)',
    sunAngle: 135,
    causticOffset: { x: 30, y: -10 },
    lightDescription: 'Nắng chiều phương Nam nhuốm đỏ ráng chiều, ánh sáng ruby và mật ong ấm áp lan tỏa khắp cầu thang xoắn và sảnh master.',
    colorTheme: 'from-rose-600/35 via-amber-600/30 to-orange-500/30',
    floorCausticStyle: 'radial-gradient(ellipse 70% 60% at 65% 45%, rgba(225,29,72,0.35), rgba(234,88,12,0.3), transparent 75%)',
  },
  night: {
    id: 'night',
    time: '21:00',
    label: 'Đêm Trăng Huyền Bí (Backlit 3000K)',
    sunAngle: 0,
    causticOffset: { x: 0, y: 0 },
    lightDescription: 'Hệ thống LED âm vòm gián tiếp tái tạo ánh trăng rằm tĩnh tại, giữ trọn vẹn vẻ trang nghiêm tĩnh mịch của kiến trúc dinh thự.',
    colorTheme: 'from-indigo-900/30 via-sky-900/25 to-amber-900/20',
    floorCausticStyle: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.2), rgba(245,158,11,0.1), transparent 70%)',
  },
}

interface DetailTexture {
  id: string
  name: string
  origin: string
  description: string
  spec: string
}

const DETAIL_TEXTURES: DetailTexture[] = [
  {
    id: 'lead-came',
    name: 'Nẹp Chì &amp; Đồng Thau Hàn Vảy Rùa',
    origin: 'Kỹ nghệ phục chế nhà thờ Đức Bà thế kỷ 19',
    description: 'Từng dải nẹp chì dẻo uốn cong theo viền cánh hoa sen, mối nối hàn thiếc vảy rùa thủ công chịu áp lực gió bão cấp 12.',
    spec: 'Hợp kim Chì-Thiếc 60/40 • Độ dày 4.5mm',
  },
  {
    id: 'saint-just',
    name: 'Thủy Tinh Thổi Miệng Saint-Just (Pháp)',
    origin: 'Xưởng thủy tinh hoàng gia Saint-Just từ năm 1826',
    description: 'Chứa bọt khí li ti và vân gợn tự nhiên sinh ra từ ống thổi mồm nghệ nhân, tạo độ khúc xạ ánh sáng huyền ảo độc bản không tấm nào trùng lặp.',
    spec: 'Độ dày 3.2mm • Khúc xạ n = 1.52 • Đạt chuẩn bảo tồn Louvre',
  },
  {
    id: 'low-e-shield',
    name: 'Kính Bảo Vệ Low-E Kép Cách Nhiệt 100%',
    origin: 'Hệ vỏ che thời tiết ngoài trời GuHomes SolarShield',
    description: 'Lớp kính hộp 2 lớp cường lực 8mm+12A+8mm phủ men cản nhiệt Low-E, ngăn 99.5% tia cực tím bảo vệ tranh và đồ gỗ nội thất bên dưới.',
    spec: 'Cách âm 42 dB • Hệ số SHGC 0.28 • Chống mưa đá',
  },
]

export function SaigonStainedGlassAtriumDomeSanctuary({ className }: { className?: string } = {}) {
  const [activeTime, setActiveTime] = useState<TimeOfDay>('morning')
  const [activeTextureId, setActiveTextureId] = useState<string>('saint-just')
  const [domeRotation, setDomeRotation] = useState<number>(0)

  const headingId = useId()
  const currentTimeSetting = TIME_SETTINGS[activeTime]
  const activeTexture = DETAIL_TEXTURES.find((t) => t.id === activeTextureId) ?? DETAIL_TEXTURES[0]!

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Dynamic Stained Glass Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-all duration-1000">
        <div
          className={cn(
            'absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full blur-[170px] bg-gradient-to-br transition-all duration-1000',
            currentTimeSetting.colorTheme
          )}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.06),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Nghệ Thuật Kính Màu Đỉnh Cao &amp; Giếng Trời 12 Mét
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Vòm Kính Màu Giếng Trời Art Nouveau &amp; Thủy Tinh Saint-Just
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Kiệt tác vòm kính màu đường kính 4.8 mét đỉnh giếng trời thông tầng biệt thự, ghép thủ công từ hơn 1.200 mảnh thủy tinh thổi miệng Saint-Just (Pháp) và Bohemia (Tiệp Khắc). 
            Họa tiết hoa sen Đông Dương và tán lá cọ nhiệt đới vươn lên đón nắng, phản chiếu bóng caustics rực rỡ biến thiên theo chu kỳ mặt trời Sài Gòn.
          </p>
        </div>

        {/* Interactive Atrium Visualizer Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: 4.8m Dome Simulation & Marble Floor Caustics */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Thời Khắc &amp; Góc Khúc Xạ Mặt Trời
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentTimeSetting.time} — {currentTimeSetting.label}
                    </h3>
                  </div>

                  {/* Vault Specs Badge */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-amber-400">Ø 4.80 m</span>
                    <span>|</span>
                    <span className="font-mono text-emerald-400">1.200 Mảnh Kính</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">Low-E 99% UV</span>
                  </div>
                </div>

                {/* Stained Glass Dome Mandala Visualizer */}
                <div className="relative mt-6 h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-stone-800 bg-stone-950 p-6 flex flex-col justify-between">
                  {/* Background Simulated Marble Floor with Sun Caustics */}
                  <div
                    className="absolute inset-0 transition-all duration-1000 opacity-80"
                    style={{
                      background: currentTimeSetting.floorCausticStyle,
                      transform: `translate(${currentTimeSetting.causticOffset.x}px, ${currentTimeSetting.causticOffset.y}px)`,
                    }}
                  />

                  {/* SVG Art Nouveau Stained Glass Rosette Dome Pattern */}
                  <div className="relative z-10 flex h-full items-center justify-center">
                    <svg
                      className="h-64 w-64 sm:h-72 sm:w-72 transition-transform duration-700 drop-shadow-[0_0_35px_rgba(245,158,11,0.3)]"
                      viewBox="0 0 400 400"
                      style={{ transform: `rotate(${domeRotation}deg)` }}
                    >
                      {/* Outer Brass Compression Ring */}
                      <circle cx="200" cy="200" r="190" fill="none" stroke="#d97706" strokeWidth="6" />
                      <circle cx="200" cy="200" r="184" fill="none" stroke="#78350f" strokeWidth="2" />

                      {/* 12 Outer Lotus Petals */}
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = i * 30
                        return (
                          <g key={i} transform={`rotate(${angle} 200 200)`}>
                            <path
                              d="M200,20 C220,70 235,120 200,150 C165,120 180,70 200,20 Z"
                              fill={
                                activeTime === 'sunset'
                                  ? i % 2 === 0 ? '#b91c1c' : '#ea580c'
                                  : activeTime === 'noon'
                                  ? i % 3 === 0 ? '#0284c7' : i % 3 === 1 ? '#d97706' : '#7c3aed'
                                  : activeTime === 'morning'
                                  ? i % 2 === 0 ? '#059669' : '#d97706'
                                  : '#312e81'
                              }
                              fillOpacity={activeTime === 'night' ? '0.45' : '0.75'}
                              stroke="#44403c"
                              strokeWidth="2.5"
                            />
                            {/* Palm frond veins */}
                            <line x1="200" y1="20" x2="200" y2="150" stroke="#1c1917" strokeWidth="1.5" />
                          </g>
                        )
                      })}

                      {/* Mid Ring Geometric Glass Facets */}
                      <circle cx="200" cy="200" r="115" fill="none" stroke="#57534e" strokeWidth="3" />
                      {Array.from({ length: 16 }).map((_, i) => {
                        const angle = i * 22.5
                        return (
                          <g key={i} transform={`rotate(${angle} 200 200)`}>
                            <polygon
                              points="200,115 215,85 200,60 185,85"
                              fill={
                                activeTime === 'sunset'
                                  ? '#fbbf24'
                                  : activeTime === 'noon'
                                  ? '#38bdf8'
                                  : activeTime === 'morning'
                                  ? '#34d399'
                                  : '#6366f1'
                              }
                              fillOpacity="0.8"
                              stroke="#292524"
                              strokeWidth="2"
                            />
                          </g>
                        )
                      })}

                      {/* Inner Lotus Core (Sunburst Center) */}
                      <circle cx="200" cy="200" r="45" fill="#f59e0b" fillOpacity="0.9" stroke="#78350f" strokeWidth="3" />
                      <circle cx="200" cy="200" r="20" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                      
                      {/* Sun ray filigree */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <line
                          key={i}
                          x1="200"
                          y1="160"
                          x2="200"
                          y2="175"
                          stroke="#78350f"
                          strokeWidth="2"
                          transform={`rotate(${i * 45} 200 200)`}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Bottom description banner */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-md">
                      <span className="font-serif text-amber-300">{currentTimeSetting.lightDescription}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-stone-400">Góc Chiếu: </span>
                      <span className="font-mono text-sm font-bold text-amber-400">{currentTimeSetting.sunAngle}°</span>
                    </div>
                  </div>
                </div>

                {/* Sun Position / Time of Day Buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {(Object.keys(TIME_SETTINGS) as TimeOfDay[]).map((timeKey) => {
                    const setting = TIME_SETTINGS[timeKey]
                    const isSelected = activeTime === timeKey
                    return (
                      <button
                        key={timeKey}
                        type="button"
                        onClick={() => setActiveTime(timeKey)}
                        className={cn(
                          'flex-1 min-w-[120px] rounded-lg border px-3 py-2 text-left transition-all',
                          isSelected
                            ? 'border-amber-400 bg-amber-950/60 text-amber-200 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-stone-200'
                        )}
                      >
                        <div className="font-mono text-xs text-amber-400 font-semibold">{setting.time}</div>
                        <div className="font-serif text-xs truncate mt-0.5">{setting.label.split('(')[0]}</div>
                      </button>
                    )
                  })}
                </div>

                {/* Manual Dome Rotation Slider */}
                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Góc Quay Tinh Chỉnh Khúc Xạ:</span>
                  <div className="flex items-center gap-3 w-1/2">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={domeRotation}
                      onChange={(e) => setDomeRotation(Number(e.target.value))}
                      aria-label="Xoay góc vòm kính màu Art Nouveau"
                      className="w-full accent-amber-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                    />
                    <span className="font-mono text-amber-400 min-w-[3ch]">{domeRotation}°</span>
                  </div>
                </div>
              </div>

              {/* Architectural Light Note */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-xs text-stone-300 leading-relaxed">
                <span className="font-serif text-amber-300 font-medium">Hiệu Ứng Caustics Tự Nhiên: </span>
                Khi ánh nắng chiếu qua các mảnh kính cong thổi miệng, các vệt sáng tập trung (caustic rays) tạo nên hiệu ứng thị giác như làn nước lấp lánh chảy trên nền đá cẩm thạch Calacatta, làm bừng sáng toàn bộ không gian thông tầng 12 mét.
              </div>
            </div>

            {/* Right 5 cols: Hand-blown Glass Craft & Technical Specifications */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Glass Textures & Structural Details Selector */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Cấu Trúc Vật Liệu Kính Màu Di Sản
                </h4>
                <div className="mt-3 space-y-3">
                  {DETAIL_TEXTURES.map((texture) => {
                    const isSelected = texture.id === activeTextureId
                    return (
                      <button
                        key={texture.id}
                        type="button"
                        onClick={() => setActiveTextureId(texture.id)}
                        className={cn(
                          'w-full text-left rounded-xl border p-3.5 transition-all duration-300',
                          isSelected
                            ? 'border-amber-500 bg-gradient-to-r from-amber-950/60 via-stone-900 to-stone-900 text-stone-100 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="font-serif font-medium text-stone-200 text-sm"
                            dangerouslySetInnerHTML={{ __html: texture.name }}
                          />
                          <span className="font-mono text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                            Chi Tiết
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                          {texture.description}
                        </p>
                        <div className="mt-2 text-[10px] font-mono text-emerald-400">
                          {texture.spec}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Engineering Norms Box */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                      Chỉ Số Kỹ Thuật Vòm Giếng Trời
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">Tiêu Chuẩn Châu Âu</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Đường Kính Vòm</span>
                    <div className="mt-1 font-mono text-lg text-amber-300 font-semibold">4.80 m</div>
                    <span className="text-[9px] text-stone-500">Khẩu độ lớn nhất</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Số Lượng Mảnh Kính</span>
                    <div className="mt-1 font-mono text-lg text-emerald-400 font-semibold">1.240 Mảnh</div>
                    <span className="text-[9px] text-stone-500">Ghép chì thủ công</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Khả Năng Chống UV</span>
                    <div className="mt-1 font-mono text-lg text-cyan-400 font-semibold">99.5%</div>
                    <span className="text-[9px] text-stone-500">Màng PVB chống phai</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Độ Cao Giếng Trời</span>
                    <div className="mt-1 font-mono text-lg text-purple-300 font-semibold">12.0 m</div>
                    <span className="text-[9px] text-stone-500">Thông tầng master</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-relaxed">
                  Thiết kế được gia cố khung sườn thép không gỉ SUS316 và vòng đệm cao su EPDM chuyên dụng cho thời tiết nhiệt đới gió mùa Sài Gòn, chống thấm dột tuyệt đối 100%.
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=stained-glass-atrium-dome"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-800 to-amber-600 px-5 py-3 text-xs sm:text-sm font-medium text-amber-100 hover:from-amber-700 hover:to-amber-500 transition-all shadow-lg shadow-amber-950/50"
                >
                  <span>Tư Vấn Thiết Kế Vòm Kính Giếng Trời</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-amber-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Bản vẽ phối cảnh 3D &amp; mô phỏng đổ bóng nắng thực tế theo tọa độ khu đất.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
