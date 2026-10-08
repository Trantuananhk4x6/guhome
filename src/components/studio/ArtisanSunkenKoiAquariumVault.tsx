'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

export function ArtisanSunkenKoiAquariumVault({ className }: { className?: string } = {}) {
  const [rippleActive, setRippleActive] = useState<boolean>(false)
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 })
  const [nightLighting, setNightLighting] = useState<boolean>(false)
  const [loadTested, setLoadTested] = useState<boolean>(false)

  const handleStepOnWater = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setRipplePos({ x, y })
    setRippleActive(true)
    setTimeout(() => setRippleActive(false), 1200)
  }

  const triggerLoadTest = () => {
    setLoadTested(true)
    setTimeout(() => setLoadTested(false), 2000)
  }

  return (
    <section
      aria-label="Bể Cá Koi Thủy Sinh Âm Sàn Kính Cường Lực"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background aquatic ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 h-96 w-96 rounded-full bg-cyan-950/20 blur-[130px]" />
        <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-stone-800/30 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/50 px-3.5 py-1 text-xs tracking-widest text-cyan-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Nghệ Thuật Thủy Sinh Âm Sàn Dinh Thự
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bể Cá Koi Âm Sàn Kính Siêu Trong 32mm
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Lối đi chính đại sảnh đặt trên bể cá Koi 12m³ lót cuội sông Đồng Nai. Mặt kính 3 lớp SentryGlas dày 32mm chịu tải 800 kg/m², 
            kết hợp hệ lọc trống Drum Filter siêu tĩnh dưới 18 dBA mang lại cảm giác thanh thản bước đi trên mặt nước tĩnh lặng.
          </p>
        </div>

        {/* Interactive Walking on Water Deck */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Interactive Glass Floor Simulation */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-medium">
                      Trải Nghiệm Bước Đi Trên Mặt Nước
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      Mặt Kính Low-Iron Dán Phim SentryGlas
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNightLighting(!nightLighting)}
                      className={cn(
                        'px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border',
                        nightLighting
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                      )}
                    >
                      {nightLighting ? 'Đèn Đáy Hồ 3000K: Bật' : 'Đèn Ban Ngày Tự Nhiên'}
                    </button>
                  </div>
                </div>

                {/* Glass Pond Canvas with Ripple Simulator */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleStepOnWater}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setRippleActive(true)
                      setTimeout(() => setRippleActive(false), 1200)
                    }
                  }}
                  className={cn(
                    'mt-6 relative h-60 sm:h-72 rounded-xl border border-stone-800 overflow-hidden flex flex-col justify-between p-6 cursor-pointer transition-all duration-700 select-none',
                    nightLighting
                      ? 'bg-gradient-to-b from-stone-950 via-cyan-950/40 to-stone-900 shadow-inner'
                      : 'bg-gradient-to-b from-slate-900 via-stone-950 to-black shadow-inner'
                  )}
                >
                  {/* Subtle Koi Fish Movement Graphic */}
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-40">
                    <div className="w-16 h-8 rounded-full border border-orange-500/60 bg-gradient-to-r from-orange-500/40 to-white/40 transform rotate-12 blur-[1px] animate-pulse" />
                    <div className="w-20 h-9 rounded-full border border-red-500/60 bg-gradient-to-r from-red-600/40 via-white/40 to-stone-900 transform -rotate-45 blur-[1px] animate-bounce" />
                    <div className="w-14 h-7 rounded-full border border-white/60 bg-gradient-to-r from-white/30 to-orange-400/30 transform rotate-45 blur-[1px]" />
                  </div>

                  {/* Water Ripple on Click */}
                  {rippleActive && (
                    <div
                      className="absolute rounded-full border-2 border-cyan-300/80 animate-ping pointer-events-none"
                      style={{
                        left: `${ripplePos.x}%`,
                        top: `${ripplePos.y}%`,
                        width: '80px',
                        height: '80px',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  )}

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-xs font-mono text-cyan-300 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                      Chạm Vào Sàn Để Cảm Nhận Bước Đi Trên Mặt Nước
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        triggerLoadTest()
                      }}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-mono transition-all border',
                        loadTested
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
                          : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
                      )}
                    >
                      {loadTested ? 'Tải Trọng 800 kg/m²: Tuyệt Đối Ổn Định' : 'Thử Nghiệm Tải Trọng Kính'}
                    </button>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-xs text-stone-400 font-mono block">Kết Cấu Sàn:</span>
                      <span className="font-serif text-stone-100 text-base sm:text-lg">
                        Kính Siêu Trong 10mm + 1.52mm SentryGlas + 10mm + SentryGlas + 10mm
                      </span>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-stone-500 block font-mono">Lớp chống trượt</span>
                      <span className="text-emerald-400 font-mono font-medium">Nano R11 Khô & Ướt</span>
                    </div>
                  </div>
                </div>

                {/* 3 Parameter Cards */}
                <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Dung Tích Hồ Âm</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-cyan-400">
                      12.000 Lít
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Sâu 1.4m chuẩn cá Koi</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Độ Ồn Hệ Lọc Drum</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-emerald-400">
                      17.5 dBA
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Hoàn toàn không tiếng róc rách</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Đá Lót Đáy Hồ</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-amber-300">
                      Cuội Sông Đồng Nai
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Cân bằng vi sinh tự nhiên</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Water Chemistry Dashboard */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Chỉ Số Thủy Sinh Thời Gian Thực
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    Nước Chuẩn Nhật Bản
                  </span>
                </div>

                <div className="my-5 space-y-3.5 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Độ Kiềm pH:</span>
                      <span className="text-cyan-400 font-mono font-medium">7.2 (Ổn định tuyệt hảo)</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Đá cuội tự nhiên giải phóng khoáng nhẹ, giữ vảy cá Koi luôn ánh bóng rực rỡ.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Oxy Hòa Tan Dissolved O₂:</span>
                      <span className="text-emerald-400 font-mono font-medium">7.8 mg/L (Giàu dưỡng khí)</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Sục khí vi bọt Micro-bubble ngầm dưới đáy hồ tạo dòng chảy êm dịu cho cá bơi lội.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Nhiệt Độ Nước Hồ Âm Sàn:</span>
                      <span className="text-amber-300 font-mono font-medium">25.5°C (Mát mẻ tự nhiên)</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Hạ âm sàn giúp nước hồ được lòng đất điều hòa nhiệt độ, mát hơn ngoài trời từ 3°C - 5°C.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Bảo trì sinh học:</span>
                <span className="font-mono text-stone-200">GuHomes Aquarium Concierge 3 tháng/lần</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950 p-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span>Điểm nhấn phong thủy tài lộc đỉnh cao cho đại sảnh dinh thự & biệt thự sân vườn</span>
          </div>
          <Link
            href="/du-toan-chi-phi"
            className="inline-flex items-center gap-1.5 font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            Dự toán chi phí thi công bể cá Koi âm sàn kính cường lực
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
