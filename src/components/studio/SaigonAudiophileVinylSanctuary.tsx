'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type AcousticMode = 'vinyl-master' | 'live-orchestra' | 'vocal-acoustic' | 'late-night'

interface AcousticSetting {
  id: AcousticMode
  label: string
  sublabel: string
  rt60: string
  eqTarget: string
  description: string
}

const ACOUSTIC_MODES: AcousticSetting[] = [
  {
    id: 'vinyl-master',
    label: 'Vinyl Master Hi-End',
    sublabel: 'Đáp ứng trung thực 20Hz - 20kHz',
    rt60: '0.35s',
    eqTarget: 'Phẳng ±0.8 dB',
    description: 'Tái tạo trọn vẹn chất âm analog ấm áp, dải trung ngọt ngào và âm hình sân khấu sâu rộng chuẩn mastering.',
  },
  {
    id: 'live-orchestra',
    label: 'Giao Hưởng Nhà Hát',
    sublabel: 'Tán âm mở rộng không gian 3D',
    rt60: '0.42s',
    eqTarget: 'Mở rộng dải động Dynamic Range',
    description: 'Khuếch đại độ ngân của đàn dây và kèn đồng, đưa người nghe vào vị trí hàng ghế trung tâm thính phòng Carnegie Hall.',
  },
  {
    id: 'vocal-acoustic',
    label: 'Vocal Jazz & Acoustic',
    sublabel: 'Tiêu âm cận trường siêu nét',
    rt60: '0.28s',
    eqTarget: 'Nhấn nhẹ dải trung cao 2kHz - 5kHz',
    description: 'Tập trung giọng hát ca sĩ rõ từng hơi thở và tiếng búng dây guitar gỗ mộc không một vệt vang vọng tạp âm.',
  },
  {
    id: 'late-night',
    label: 'Thẩm Âm Đêm Muộn',
    sublabel: 'Âm lượng thấp vẫn đủ chi tiết',
    rt60: '0.30s',
    eqTarget: 'Loudness Bù Tần Số Thấp Fletcher-Munson',
    description: 'Thưởng thức nhạc lúc 01:00 sáng với âm lượng dưới 55 dBA nhưng dải trầm 40Hz vẫn dày dặn và êm ru.',
  },
]

export function SaigonAudiophileVinylSanctuary({ className }: { className?: string } = {}) {
  const [activeMode, setActiveMode] = useState<AcousticMode>('vinyl-master')
  const [magLevDamping, setMagLevDamping] = useState<number>(95) // 80% to 100%
  const [subwooferCutoff, setSubwooferCutoff] = useState<number>(60) // 40Hz to 80Hz

  const currentSetting = ACOUSTIC_MODES.find((m) => m.id === activeMode) ?? ACOUSTIC_MODES[0]!

  return (
    <section
      aria-label="Phòng Thư Viện Âm Thanh Đĩa Than Hi-End"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background acoustic wave ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-amber-600/10 blur-[130px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-stone-700/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Âm Học Thính Phòng Chuẩn Quốc Tế
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Phòng Thẩm Âm Đĩa Than Hi-End RT60 = 0.35s
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Mâm đĩa than đệm từ trường lơ lửng trên bệ đá phiến 800kg triệt tiêu rung chấn micro-vibration. 
            Vách tán âm 3D gỗ óc chó FAS kết hợp sợi len cừu tự nhiên, mang lại không gian tĩnh lặng tuyệt đối để thưởng thức từng thớ âm analog nguyên bản.
          </p>
        </div>

        {/* Interactive Audiophile Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Frequency Visualizer & Mode Switcher */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Chế Độ Xử Lý Âm Học Không Gian
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentSetting.label}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs font-mono text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    RT60 Mục Tiêu: {currentSetting.rt60}
                  </div>
                </div>

                {/* 4 Mode Buttons */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ACOUSTIC_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveMode(mode.id)}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all',
                        activeMode === mode.id
                          ? 'border-amber-500/50 bg-amber-950/30 text-amber-200'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <span className="block text-xs font-medium text-stone-200 truncate">
                        {mode.label}
                      </span>
                      <span className="block text-[11px] font-mono text-amber-400/80 mt-1">
                        {mode.rt60}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Frequency Response Real-time Wave Graphic */}
                <div className="mt-6 relative h-48 sm:h-56 rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 to-stone-900 overflow-hidden flex flex-col justify-between p-5">
                  {/* EQ Curve SVG */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <svg className="w-full h-full max-w-xl px-4" viewBox="0 0 500 200" fill="none">
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#44403c" strokeDasharray="4 4" />
                      <path
                        d="M 10 100 Q 80 98, 140 100 T 260 100 T 380 99 T 490 100"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                      {/* Acoustic diffusion bars */}
                      {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((x, i) => (
                        <rect
                          key={x}
                          x={x}
                          y={80 + (i % 3) * 8}
                          width="6"
                          height={40 - (i % 3) * 12}
                          fill="#78716c"
                          rx="3"
                          opacity="0.3"
                        />
                      ))}
                    </svg>
                  </div>

                  <div className="relative z-10 flex items-start justify-between text-xs font-mono text-stone-400">
                    <span>ĐÁP ỨNG TẦN SỐ: 20Hz — 20.000Hz</span>
                    <span className="text-amber-300 font-semibold">{currentSetting.eqTarget}</span>
                  </div>

                  <div className="relative z-10">
                    <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                      {currentSetting.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-800/80">
                    <span>20Hz (Sub-bass)</span>
                    <span>1kHz (Vocal Mid)</span>
                    <span>20kHz (Ultra-air)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Mag-Lev Turntable & Power Specs */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Mâm Đĩa Than Đệm Từ Trường
                  </span>
                  <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    Magnetic Levitation
                  </span>
                </div>

                <div className="my-5 space-y-4">
                  {/* Slider: Mag-Lev Damping */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-stone-400">Mức triệt tiêu rung chấn vi mô:</span>
                      <span className="font-mono text-amber-300 font-semibold">{magLevDamping}%</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="100"
                      value={magLevDamping}
                      onChange={(e) => setMagLevDamping(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <span className="text-[10px] text-stone-500 font-mono block mt-1">
                      Bệ đá phiến 800kg triệt rung chấn sàn từ xe cộ đường phố
                    </span>
                  </div>

                  {/* Slider: Subwoofer Crossover */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-stone-400">Tần số cắt Subwoofer trầm:</span>
                      <span className="font-mono text-amber-300 font-semibold">{subwooferCutoff} Hz</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="80"
                      value={subwooferCutoff}
                      onChange={(e) => setSubwooferCutoff(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <span className="text-[10px] text-stone-500 font-mono block mt-1">
                      Xử lý bẫy trầm Bass Trap góc phòng triệt tiêu sóng dội
                    </span>
                  </div>

                  {/* Power & Material specs */}
                  <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Nguồn điện sạch:</span>
                      <span className="text-emerald-400 font-mono">Biến áp cách ly Toroidal 5kVA</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Dây dẫn tín hiệu:</span>
                      <span className="text-amber-300 font-mono">Đồng OFC 99.9999% mạ bạc</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Vỏ vách phòng:</span>
                      <span className="text-stone-200 font-mono">Gỗ Óc Chó FAS + Nỉ Len Cừu</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Cách âm tiêu chuẩn:</span>
                <span className="font-mono text-stone-200">STC 65 (Không lọt tiếng ra ngoài)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950 p-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Khao khát sở hữu một không gian thẩm âm analog đẳng cấp cho dinh thự</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-medium text-amber-300 hover:text-amber-200 transition-colors"
          >
            Đăng ký khảo sát hiện trạng & đo đạc âm học căn hộ / biệt thự
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
