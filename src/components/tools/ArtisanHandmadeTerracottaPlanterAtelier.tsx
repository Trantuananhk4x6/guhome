'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface PlanterModel {
  id: string
  name: string
  plantType: string
  dimensions: string
  capacity: string
  breathabilityRate: string
  firingTemp: string
  claySource: string
  description: string
}

const PLANTER_MODELS: PlanterModel[] = [
  {
    id: 'chau-tru-cao',
    name: 'Chậu Trụ Cao Khắc Sóng Sông Đồng Nai',
    plantType: 'Cây thế thân gỗ & Cọ cảnh cao tầng',
    dimensions: 'Đường kính 450mm • Chiều cao 750mm',
    capacity: '65 Lít đất trồng',
    breathabilityRate: 'Mao dẫn thở 94.5%',
    firingTemp: 'Nung củi gáo dừa 1.150°C',
    claySource: 'Phù sa cổ Cù lao Phố, sông Đồng Nai',
    description: 'Thân trụ cao vững chãi chịu gió logia penthouse, rãnh thoát nước đa tầng chống úng ngập rễ trong cơn mưa rào Sài Gòn.',
  },
  {
    id: 'chau-mieng-loe',
    name: 'Chậu Miệng Loe Bát Tràng Men Tro Phù Sa',
    plantType: 'Kiểng lá Aroid, Monstera Albo & Trầu Bà Lá Xẻ',
    dimensions: 'Đường kính 600mm • Chiều cao 480mm',
    capacity: '82 Lít đất trồng hữu cơ',
    breathabilityRate: 'Mao dẫn thở 96.8%',
    firingTemp: 'Nung lò củi rơm 1.180°C',
    claySource: 'Đất sét đỏ mịn phù sa bồi tích 40 năm',
    description: 'Miệng loe rộng cung cấp tối đa diện tích tiếp xúc không khí, thành chậu xốp giải nhiệt nhanh giữ bộ rễ Monstera luôn mát dịu.',
  },
  {
    id: 'chau-bau-tron',
    name: 'Chậu Bầu Tròn Thiền Định Men Đỏ Cam Cháy',
    plantType: 'Bonsai Tùng La Hán, Cần Thăng & Hoa Trà',
    dimensions: 'Đường kính 520mm • Chiều cao 320mm',
    capacity: '40 Lít đất trồng Akadama',
    breathabilityRate: 'Mao dẫn thở 92.0%',
    firingTemp: 'Lò bầu truyền thống 1.120°C',
    claySource: 'Phù sa trầm tích sông Đồng Nai & cát thạch anh',
    description: 'Dáng bầu tròn cân đối âm dương, lớp patin đỏ cam cháy biến thiên tự nhiên theo ngọn lửa củi đun không dùng hóa chất tráng men.',
  },
]

export function ArtisanHandmadeTerracottaPlanterAtelier({ className }: { className?: string } = {}) {
  const [selectedModelIndex, setSelectedModelIndex] = useState<number>(0)
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [waterPercolationTest, setWaterPercolationTest] = useState<boolean>(true)
  const [customSealName, setCustomSealName] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const headingId = useId()
  const currentModel = PLANTER_MODELS[selectedModelIndex] ?? PLANTER_MODELS[0]!

  const playChime = () => {
    if (typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.05, now + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.6)
    } catch {
      // AudioContext fallback
    }
  }

  const handleSelectModel = (idx: number) => {
    setSelectedModelIndex(idx)
    playChime()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    playChime()
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Terracotta Amber Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[520px] w-[520px] rounded-full bg-orange-950/25 blur-[180px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-950/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(234,88,12,0.06),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-950/40 px-3.5 py-1 text-xs tracking-widest text-orange-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Gốm Thở Đất Phù Sa • Sông Đồng Nai Nung Củi
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bộ Sưu Tập Chậu Gốm Đất Nung Đỏ Phù Sa
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Chế tác từ nguồn đất phù sa sông Đồng Nai giàu vi khoáng chất nung củi truyền thống 1.150°C. 
            Thành chậu sở hữu hàng triệu mao dẫn siêu nhỏ giúp rễ cây tự do hô hấp đối lưu oxy, chống thối rễ trong mùa mưa ẩm nhiệt đới Sài Gòn.
          </p>
        </div>

        {/* Interactive Terracotta Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: 360° Planter Visualizer & Soil Breathability Canvas */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-orange-400 font-mono font-medium">
                      Kiểu Dáng Chậu Đang Tương Tác
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentModel.name}
                    </h3>
                  </div>

                  {/* Firing & Material Specs */}
                  <div className="flex items-center gap-2 rounded-full border border-orange-500/40 bg-stone-950/90 px-3 py-1 text-xs text-stone-300 font-mono">
                    <span className="text-orange-400 font-semibold">{currentModel.breathabilityRate}</span>
                    <span>|</span>
                    <span className="text-amber-300">{currentModel.firingTemp}</span>
                  </div>
                </div>

                {/* Planter 360 Canvas */}
                <div className="relative mt-6 h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-orange-950/50 bg-[#120a06] p-6 flex flex-col justify-between shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]">
                  {/* Subtle Kiln Fired Glow */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(234,88,12,0.15),transparent_65%)]" />

                  {/* Top info badge */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-orange-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-orange-300">
                      {currentModel.dimensions}
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-emerald-300">
                      {currentModel.plantType}
                    </span>
                  </div>

                  {/* 360 Planter SVG Illustration */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <div
                      className="transition-transform duration-200"
                      style={{ transform: `rotateY(${rotationAngle}deg)` }}
                    >
                      <svg className="h-36 w-48 drop-shadow-[0_0_25px_rgba(234,88,12,0.3)]" viewBox="0 0 200 150" fill="none">
                        {/* Pot Saucer Tray */}
                        <ellipse cx="100" cy="135" rx="75" ry="10" fill="#431407" stroke="#7c2d12" strokeWidth="2" />
                        
                        {/* Terracotta Pot Body */}
                        <path
                          d="M50 35 L65 125 Q 100 135 135 125 L 150 35 Q 100 45 50 35 Z"
                          fill="#9a3412"
                          stroke="#ea580c"
                          strokeWidth="2"
                        />
                        
                        {/* Pot Rim Lip */}
                        <ellipse cx="100" cy="35" rx="55" ry="12" fill="#c2410c" stroke="#f97316" strokeWidth="2" />
                        <ellipse cx="100" cy="35" rx="46" ry="9" fill="#261005" stroke="#7c2d12" strokeWidth="1.5" />

                        {/* Hand-carved River Waves Texture */}
                        <path d="M68 65 Q 100 78 132 65" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        <path d="M72 85 Q 100 98 128 85" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        <path d="M78 105 Q 100 115 122 105" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

                        {/* Clan Seal Stamp on Center Body */}
                        <rect x="90" y="75" width="20" height="20" rx="3" fill="#7c2d12" stroke="#fdba74" strokeWidth="1" />
                        <text x="100" y="89" fill="#fed7aa" fontSize="10" textAnchor="middle" fontFamily="serif" fontWeight="bold">
                          GU
                        </text>
                      </svg>
                    </div>

                    {/* Oxygen Capillary Breathability Indicator */}
                    {waterPercolationTest && (
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-stone-950/80 px-3 py-1 text-[11px] font-mono text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Mao dẫn thoát hơi ẩm đối lưu tự nhiên: ĐANG HÔ HẤP
                      </div>
                    )}
                  </div>

                  {/* Bottom metrics on visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Đặc Tính Sinh Học:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5 leading-snug">
                        {currentModel.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Dung Tích Đất Trồng:</div>
                      <div className="text-xs font-serif text-orange-300 font-medium">
                        {currentModel.capacity}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Model Selector Pills */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {PLANTER_MODELS.map((model, idx) => {
                    const isSelected = selectedModelIndex === idx
                    return (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => handleSelectModel(idx)}
                        className={cn(
                          'flex-1 min-w-[140px] rounded-lg border px-3 py-2 text-left transition-all duration-200',
                          isSelected
                            ? 'border-orange-400/80 bg-orange-950/40 text-orange-100 shadow-[0_0_15px_rgba(234,88,12,0.2)]'
                            : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                        )}
                      >
                        <div className="text-[10px] font-mono text-orange-400/80">Kiểu dáng {idx + 1}/3</div>
                        <div className="font-serif text-xs font-medium text-stone-200 truncate mt-0.5">
                          {model.name}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 cols: 360 Rotation Slider, Permeability Test & Clan Seal Order */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* 360 Rotation Slider */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm text-stone-200 font-medium">
                    Góc Xoay Ngắm Chậu 360°
                  </h4>
                  <span className="font-mono text-xs text-orange-400">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(Number(e.target.value))}
                  className="mt-3 w-full accent-orange-500 cursor-pointer"
                />
                <div className="mt-2 flex justify-between text-[10px] font-mono text-stone-500">
                  <span>0° (Chính Diện)</span>
                  <span>180° (Mặt Sau)</span>
                  <span>360° (Tròn Vòng)</span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-300 font-serif">Mao Dẫn Thở Chống Thối Rễ:</span>
                  <button
                    type="button"
                    onClick={() => setWaterPercolationTest(!waterPercolationTest)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs font-mono transition-colors',
                      waterPercolationTest
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                        : 'bg-stone-800 text-stone-400 border border-stone-700'
                    )}
                  >
                    {waterPercolationTest ? 'ĐANG ĐỐI LƯU' : 'TẠM TẮT'}
                  </button>
                </div>
              </div>

              {/* Bespoke Clan Seal Stamp Order Form */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <h4 className="font-serif text-sm text-stone-200 font-medium">
                  Đặt Làm Chậu Đất Nung Khắc Ấn Triện Dòng Tộc
                </h4>
                <p className="mt-1 text-xs text-stone-400 font-light">
                  Nghệ nhân gốm nung củi sông Đồng Nai khắc chìm ấn triện riêng của gia chủ lên thân chậu trước khi nung lửa.
                </p>

                {isSubmitted ? (
                  <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-3.5 text-center text-xs text-emerald-200">
                    <span className="font-mono text-emerald-400 font-semibold block">ĐÃ GHI NHẬN HỒ SƠ MAY ĐO GỐM</span>
                    Mã bảo mật: <span className="font-mono font-bold">GU-PLANTER-2026-X</span>. Nghệ nhân sẽ liên hệ gửi bản vẽ mẫu triện trong 24 giờ.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                    <div>
                      <label htmlFor="seal-name" className="block text-[11px] font-mono text-stone-400 uppercase">
                        Tên Ấn Triện / Chữ Khắc Trên Thân Chậu:
                      </label>
                      <input
                        id="seal-name"
                        type="text"
                        required
                        value={customSealName}
                        onChange={(e) => setCustomSealName(e.target.value)}
                        placeholder="Ví dụ: An Gia, Phúc Lộc, Tĩnh Viên..."
                        className="mt-1 w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-stone-100 placeholder:text-stone-500 focus:border-orange-400 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md border border-orange-500/60 bg-gradient-to-r from-orange-700/50 to-orange-600/50 py-2 text-xs font-serif text-orange-100 hover:from-orange-600/60 hover:to-orange-500/60 transition-all shadow-md"
                    >
                      Xác Nhận Đặt Gốm Phù Sa Độc Bản
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Concierge CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900/90 py-3 text-xs font-serif text-stone-200 hover:border-orange-400 hover:text-orange-200 transition-colors"
                >
                  <span>Tư Vấn Thiết Kế Vườn Ban Công &amp; Logia Căn Hộ</span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
