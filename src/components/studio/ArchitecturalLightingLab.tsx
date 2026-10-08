'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type CCTKelvin = 1800 | 2400 | 2700 | 3000 | 4000
export type CircadianHour = 'morning' | 'noon' | 'evening' | 'night'

interface CCTPreset {
  kelvin: CCTKelvin
  name: string
  subtitle: string
  glowHex: string
  bgHex: string
  idealFor: string
  biologicalEffect: string
  luxLevel: string
}

const CCT_PRESETS: Record<CCTKelvin, CCTPreset> = {
  1800: {
    kelvin: 1800,
    name: 'Candlelight Amber',
    subtitle: 'Ánh nến hổ phách hoàng hôn',
    glowHex: '#FF8A3D',
    bgHex: 'rgba(255, 138, 61, 0.15)',
    idealFor: 'Phòng ngủ Master, hầm rượu vang, bồn tắm thư giãn nửa đêm.',
    biologicalEffect: 'Triệt tiêu 99% ánh sáng xanh, kích thích tuyến tùng tiết melatonin tự nhiên cho giấc ngủ sâu.',
    luxLevel: '40 – 80 Lux',
  },
  2400: {
    kelvin: 2400,
    name: 'Warm Sunset Glow',
    subtitle: 'Hoàng hôn ấm áp bên sông',
    glowHex: '#FFAE66',
    bgHex: 'rgba(255, 174, 102, 0.16)',
    idealFor: 'Bàn ăn gia đình, góc đọc sách ngắm hoàng hôn, quầy bar đảo bếp.',
    biologicalEffect: 'Tạo cảm giác gắn kết gia đình, hạ nhịp tim và xoa dịu áp lực sau ngày làm việc tại trung tâm.',
    luxLevel: '100 – 150 Lux',
  },
  2700: {
    kelvin: 2700,
    name: 'Quiet Luxury Warm White',
    subtitle: 'Tiêu chuẩn vàng GuHomes',
    glowHex: '#FFD2A0',
    bgHex: 'rgba(255, 210, 160, 0.18)',
    idealFor: 'Phòng khách thông tầng, vách gỗ óc chó FAS, tường vôi Calce Ý và mặt đá Travertine.',
    biologicalEffect: 'Cân bằng hoàn hảo giữa thị giác thư thái và khả năng thưởng lãm sắc thái vân gỗ chân thực nhất.',
    luxLevel: '180 – 250 Lux',
  },
  3000: {
    kelvin: 3000,
    name: 'Soft Halogen White',
    subtitle: 'Ánh sáng thấu kính mềm',
    glowHex: '#FFE4C7',
    bgHex: 'rgba(255, 228, 199, 0.20)',
    idealFor: 'Bàn làm việc KTS, phòng trưng bày tác phẩm điêu khắc, khu vực chế biến ẩm thực.',
    biologicalEffect: 'Giúp tập trung thị giác cao mà không gây mỏi mắt hay phân tâm quang học.',
    luxLevel: '280 – 350 Lux',
  },
  4000: {
    kelvin: 4000,
    name: 'Neutral Gallery White',
    subtitle: 'Bảo tàng nghệ thuật đương đại',
    glowHex: '#F4F6FF',
    bgHex: 'rgba(244, 246, 255, 0.22)',
    idealFor: 'Góc thử đồ Walk-in closet, gương trang điểm chuyên nghiệp, kiểm định mẫu vật liệu.',
    biologicalEffect: 'Mô phỏng ánh sáng ban ngày tự nhiên hướng Bắc, đánh giá trung thực 100% màu sắc trang phục.',
    luxLevel: '400 – 500 Lux',
  },
}

const CIRCADIAN_MODES: { id: CircadianHour; time: string; label: string; cct: CCTKelvin; lux: string }[] = [
  { id: 'morning', time: '06:30 – 09:00', label: 'Bình Minh Đánh Thức', cct: 3000, lux: '250 Lux' },
  { id: 'noon', time: '11:30 – 14:00', label: 'Năng Lượng Ban Trưa', cct: 4000, lux: '450 Lux' },
  { id: 'evening', time: '17:30 – 20:30', label: 'Hoàng Hôn Đoàn Tụ', cct: 2400, lux: '160 Lux' },
  { id: 'night', time: '21:00 – 05:30', label: 'Nghỉ Ngơi Tĩnh Lặng', cct: 1800, lux: '50 Lux' },
]

export function ArchitecturalLightingLab({ className }: { className?: string }) {
  const [selectedCCT, setSelectedCCT] = useState<CCTKelvin>(2700)
  const [criMode, setCriMode] = useState<'cri80' | 'cri98'>('cri98')
  const [louverActive, setLouverActive] = useState<boolean>(true)
  const [activeCircadian, setActiveCircadian] = useState<CircadianHour | null>('evening')

  const current = CCT_PRESETS[selectedCCT]

  const handleCircadianSelect = (mode: { id: CircadianHour; cct: CCTKelvin }) => {
    setActiveCircadian(mode.id)
    setSelectedCCT(mode.cct)
  }

  return (
    <section className={cn('relative bg-[#0E1211] text-[#F3F1EC] py-16 sm:py-24 border-y border-white/10 overflow-hidden', className)}>
      {/* Dynamic ambient optical glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] rounded-full blur-[140px] opacity-40 transition-all duration-700 ease-out"
        style={{ backgroundColor: current.glowHex }}
      />

      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Architectural Optical Lab</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-3 tracking-tight">
              Phòng Thí Nghiệm Ánh Sáng Kiến Trúc
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[64ch] mt-3 font-light leading-relaxed">
              Trong triết lý Quiet Luxury, ánh sáng không dùng để phô trương nguồn đèn, mà là một chất liệu điêu khắc vô hình. Nó định hình chiều sâu xúc giác của gỗ óc chó, đá vôi và nuôi dưỡng nhịp sinh học của gia chủ.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 block text-[10px]">CHỈ SỐ HOÀN MÀU</span>
              <span className="text-accent text-sm font-semibold">CRI ≥ 98 (R9 &gt; 92)</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 block text-[10px]">HỆ SỐ CHỐNG CHÓI</span>
              <span className="text-emerald-400 text-sm font-semibold">UGR &lt; 16 (Zero-Glare)</span>
            </div>
          </div>
        </div>

        {/* Interactive Lab Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Lighting Simulator Chamber (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative rounded-3xl border border-white/15 bg-[#151918] p-6 sm:p-10 overflow-hidden shadow-2xl">
              {/* Ceiling Downlight Fixture Rendering */}
              <div className="flex justify-center mb-8">
                <div className="relative flex flex-col items-center">
                  <div className="w-24 h-3 bg-white/10 rounded-full border border-white/20 mb-1" />
                  <div
                    className={cn(
                      'relative w-16 h-12 rounded-b-2xl border border-white/30 flex items-center justify-center transition-all duration-500',
                      louverActive ? 'bg-black/90' : 'bg-white/20 shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                    )}
                  >
                    {louverActive ? (
                      <div className="grid grid-cols-4 gap-0.5 w-10 h-7 opacity-70">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="border border-white/30 rounded-xs bg-black" />
                        ))}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/80 blur-xs" />
                    )}

                    {/* Light Beam Projected Downwards */}
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] sm:w-[480px] h-[340px] pointer-events-none transition-all duration-700"
                      style={{
                        background: `conic-gradient(from 180deg at 50% 0%, ${current.glowHex}22 150deg, transparent 210deg)`,
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        opacity: louverActive ? 0.75 : 0.95,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/50 mt-2">
                    {louverActive ? 'Chóa sâu Honeycomb góc cắt 45° (UGR < 16)' : 'Đèn tán quang hở viền thông thường (UGR > 25)'}
                  </span>
                </div>
              </div>

              {/* Material Texture Inspection Box inside Chamber */}
              <div className="relative z-10 rounded-2xl border border-white/15 p-6 backdrop-blur-md transition-all duration-500" style={{ backgroundColor: current.bgHex }}>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: current.glowHex }} />
                    <span className="font-mono text-xs text-white uppercase tracking-wider">
                      Mô Phỏng Xúc Giác Vật Liệu Dưới {current.kelvin}K
                    </span>
                  </div>
                  <span className="text-xs font-mono text-accent">
                    {criMode === 'cri98' ? 'CRI 98 (Bridgelux Pro)' : 'CRI 80 (Thương Mại Thường)'}
                  </span>
                </div>

                {/* 3 Material Tiles side-by-side */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Walnut Tile */}
                  <div
                    className={cn(
                      'rounded-xl border p-4 transition-all duration-500',
                      criMode === 'cri98'
                        ? 'border-amber-700/60 bg-[#2C1D13] shadow-inner text-amber-100'
                        : 'border-white/10 bg-[#252525] text-stone-400 saturate-50'
                    )}
                  >
                    <span className="text-[11px] font-mono uppercase text-white/60 block">01 · Gỗ Óc Chó FAS</span>
                    <p className="font-serif text-sm mt-1 font-medium">Thớ Vân Chocolate</p>
                    <p className="text-[11px] mt-2 font-light leading-relaxed">
                      {criMode === 'cri98'
                        ? 'Sắc nâu đậm đà ánh sắc đỏ tía tự nhiên, vân núi cuộn sóng sắc nét.'
                        : 'Màu gỗ ngả xám đục, mất đi độ sâu của thớ dầu tự nhiên.'}
                    </p>
                  </div>

                  {/* Roman Travertine Tile */}
                  <div
                    className={cn(
                      'rounded-xl border p-4 transition-all duration-500',
                      criMode === 'cri98'
                        ? 'border-amber-300/40 bg-[#353028] shadow-inner text-amber-50'
                        : 'border-white/10 bg-[#222222] text-stone-400 saturate-50'
                    )}
                  >
                    <span className="text-[11px] font-mono uppercase text-white/60 block">02 · Đá Travertine</span>
                    <p className="font-serif text-sm mt-1 font-medium">Lỗ Khí Trầm Tích</p>
                    <p className="text-[11px] mt-2 font-light leading-relaxed">
                      {criMode === 'cri98'
                        ? 'Bóng đổ mềm trên từng vi lỗ xẻ thô, phản xạ ánh sáng vàng kem êm dịu.'
                        : 'Bề mặt đá nhợt nhạt như xi măng thường, mất đi tính chất khoáng thô.'}
                    </p>
                  </div>

                  {/* Brushed Brass Tile */}
                  <div
                    className={cn(
                      'rounded-xl border p-4 transition-all duration-500',
                      criMode === 'cri98'
                        ? 'border-yellow-500/50 bg-[#3A331A] shadow-inner text-yellow-100'
                        : 'border-white/10 bg-[#272727] text-stone-400 saturate-50'
                    )}
                  >
                    <span className="text-[11px] font-mono uppercase text-white/60 block">03 · Đồng Thau Xước</span>
                    <p className="font-serif text-sm mt-1 font-medium">Phản Chiếu Satin</p>
                    <p className="text-[11px] mt-2 font-light leading-relaxed">
                      {criMode === 'cri98'
                        ? 'Ánh kim ấm áp không lóe chói, lộ rõ đường xước tóc xơ dừa thủ công.'
                        : 'Màu kim loại đanh gắt, tạo cảm giác lạnh lẽo.'}
                    </p>
                  </div>
                </div>

                {/* Craft Insight Footnote */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-3 text-xs font-light text-white/70">
                  <span className="text-accent text-sm">✦</span>
                  <p>
                    <strong className="text-white font-medium">Khuyến nghị KTS Trưởng:</strong> {current.idealFor}
                  </p>
                </div>
              </div>
            </div>

            {/* Circadian Rhythm 24h Timeline Bar */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-accent uppercase tracking-wider">
                  Chu Trình Ánh Sáng Sinh Học (Circadian Lighting 24H)
                </span>
                <span className="text-[11px] font-mono text-white/50">Tự động chuyển đổi thông minh</span>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CIRCADIAN_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleCircadianSelect(mode)}
                    className={cn(
                      'p-3.5 rounded-xl border text-left transition-all',
                      activeCircadian === mode.id
                        ? 'border-accent bg-accent/15 text-white shadow-lg'
                        : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20'
                    )}
                  >
                    <span className="text-[10px] font-mono text-accent block">{mode.time}</span>
                    <p className="font-serif text-sm font-medium text-white mt-1">{mode.label}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-white/60">
                      <span>{mode.cct}K</span>
                      <span>{mode.lux}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Controls & Optical Engineering Specs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Color Temperature Selector */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-md">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                01 · Nhiệt Độ Màu Tương Quan (CCT)
              </span>
              <h3 className="font-serif text-2xl font-light text-white mt-2">
                {current.name} — {current.kelvin}K
              </h3>
              <p className="text-xs text-white/60 mt-1 font-light">{current.subtitle}</p>

              {/* Interactive Kelvin Preset Selector */}
              <div className="mt-6 flex flex-col gap-2.5">
                {([1800, 2400, 2700, 3000, 4000] as CCTKelvin[]).map((kelvin) => {
                  const preset = CCT_PRESETS[kelvin]
                  const isSelected = selectedCCT === kelvin

                  return (
                    <button
                      key={kelvin}
                      type="button"
                      onClick={() => {
                        setSelectedCCT(kelvin)
                        setActiveCircadian(null)
                      }}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all',
                        isSelected
                          ? 'border-accent bg-accent/20 text-white shadow-md'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/40 shadow-xs"
                          style={{ backgroundColor: preset.glowHex }}
                        />
                        <div>
                          <span className="text-xs font-medium block">{preset.name}</span>
                          <span className="text-[10px] font-mono text-white/50">{preset.idealFor.slice(0, 38)}...</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-accent">{kelvin}K</span>
                    </button>
                  )
                })}
              </div>

              {/* Biological Effect Explainer */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="text-[11px] font-mono text-white/50 uppercase block mb-1.5">Tác Động Nhịp Sinh Học:</span>
                <p className="text-xs font-light text-white/80 leading-relaxed">
                  {current.biologicalEffect}
                </p>
              </div>
            </div>

            {/* CRI & Glare Controls */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-md">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                02 · Chỉ Số Hoàn Màu & Chống Chói
              </span>

              {/* CRI Toggle Switch */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-white/80">Chỉ số hoàn màu (CRI):</span>
                  <span className="text-xs font-mono font-semibold text-accent">
                    {criMode === 'cri98' ? 'CRI ≥ 98 (Chuẩn GuHomes)' : 'CRI 80 (Đèn Chợ Phổ Thông)'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/40 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setCriMode('cri80')}
                    className={cn(
                      'py-2 rounded-lg text-xs font-mono transition-all',
                      criMode === 'cri80' ? 'bg-white/20 text-white font-medium shadow-sm' : 'text-white/50 hover:text-white'
                    )}
                  >
                    CRI 80 (Phổ thông)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCriMode('cri98')}
                    className={cn(
                      'py-2 rounded-lg text-xs font-mono transition-all',
                      criMode === 'cri98' ? 'bg-accent text-white font-semibold shadow-sm' : 'text-white/50 hover:text-white'
                    )}
                  >
                    CRI 98 (Architectural)
                  </button>
                </div>
              </div>

              {/* Glare Louver Toggle Switch */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-white/80">Chống chói góc cắt (UGR):</span>
                  <span className={cn('text-xs font-mono font-semibold', louverActive ? 'text-emerald-400' : 'text-amber-400')}>
                    {louverActive ? 'UGR < 16 (Lưới Tổ Ong)' : 'UGR > 25 (Chói Mắt Trực Tiếp)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLouverActive(!louverActive)}
                  className={cn(
                    'w-full py-2.5 px-4 rounded-xl border text-xs font-mono flex items-center justify-between transition-all',
                    louverActive
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                      : 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                  )}
                >
                  <span>Chế độ: {louverActive ? 'BẬT Chóa Honeycomb 45°' : 'TẮT Chóa (Ánh Sáng Thẳng)'}</span>
                  <span className="underline text-[11px]">{louverActive ? 'Nhấp để thử gỡ' : 'Nhấp để kích hoạt'}</span>
                </button>
                <p className="text-[11px] text-white/50 font-light mt-2.5 leading-relaxed">
                  Đèn không chói mắt cho phép gia chủ ngước nhìn trần nhà cao thoáng đãng mà không bị lóa thị giác, chỉ cảm nhận được vùng sáng nhẹ nhàng đọng lại trên mặt sàn và đồ nội thất.
                </p>
              </div>

              {/* VIP Lighting Consultation CTA */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <a
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 rounded-full bg-accent text-canvas text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent/90 transition-all shadow-md"
                >
                  <span>Đặt Lịch Thử Ánh Sáng Tại Studio</span>
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
