'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

export function SaigonClepsydraWaterClockVault({ className }: { className?: string } = {}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'simulation' | 'schematic' | 'calibration'>('simulation')
  const [dripRate, setDripRate] = useState<number>(60) // 60 drips per minute = 1Hz

  // Safe Web Audio API: Water drop pop + Bronze bell resonance 1Hz
  const handlePlayClepsydraChime = () => {
    if (typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const now = ctx.currentTime

      // 1. Water Drop Pop Sound (Frequency downward glide)
      const dropOsc = ctx.createOscillator()
      const dropGain = ctx.createGain()
      dropOsc.type = 'sine'
      dropOsc.frequency.setValueAtTime(800, now)
      dropOsc.frequency.exponentialRampToValueAtTime(320, now + 0.08)
      dropGain.gain.setValueAtTime(0.2, now)
      dropGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
      dropOsc.connect(dropGain)
      dropGain.connect(ctx.destination)
      dropOsc.start(now)
      dropOsc.stop(now + 0.12)

      // 2. Antique Bronze Bell Chime (Pure tone with rich harmonic resonance)
      const bellOsc = ctx.createOscillator()
      const bellGain = ctx.createGain()
      bellOsc.type = 'sine'
      bellOsc.frequency.setValueAtTime(880, now + 0.09) // A5 note resonance
      bellGain.gain.setValueAtTime(0.001, now)
      bellGain.gain.linearRampToValueAtTime(0.25, now + 0.11)
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)
      bellOsc.connect(bellGain)
      bellGain.connect(ctx.destination)
      bellOsc.start(now + 0.09)
      bellOsc.stop(now + 2.5)

      setIsPlayingAudio(true)
      setTimeout(() => {
        setIsPlayingAudio(false)
      }, 2400)
    } catch {
      setIsPlayingAudio(true)
      setTimeout(() => setIsPlayingAudio(false), 1500)
    }
  }

  return (
    <section
      aria-label="Đồng Hồ Nước Thủy Lực Học Clepsydra"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/3 h-96 w-96 rounded-full bg-cyan-950/20 blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-amber-900/15 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(6,182,212,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs tracking-widest text-cyan-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Cỗ Máy Đo Thời Gian Cổ Đại &amp; Hiện Đại
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Đồng Hồ Nước Thủy Lực Học Clepsydra
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Dòng chảy thời gian hữu hình giữa đại sảnh thông tầng dinh thự. Thủy tinh Borosilicate quang học trong suốt, 
            phao cơ đối trọng đồng thau đúc cát, từng giọt nước tinh khiết nhỏ chuẩn xác chu kỳ 1 giây (1Hz) gõ vang chuông đồng 
            trên bệ đá phiến đen Thanh Hóa nguyên khối triệt tiêu hoàn toàn vi chấn đô thị.
          </p>
        </div>

        {/* Interactive Clepsydra Console */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Water Clock Visualizer & Graphic Diagram */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('simulation')}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                        activeTab === 'simulation'
                          ? 'bg-cyan-500 text-stone-950 font-semibold'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Mô Phỏng Trực Quan
                    </button>
                    <button
                      onClick={() => setActiveTab('schematic')}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                        activeTab === 'schematic'
                          ? 'bg-cyan-500 text-stone-950 font-semibold'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Bản Vẽ Thủy Lực 2D
                    </button>
                    <button
                      onClick={() => setActiveTab('calibration')}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                        activeTab === 'calibration'
                          ? 'bg-cyan-500 text-stone-950 font-semibold'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Hiệu Chuẩn Sai Số
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <span className="text-cyan-400">Tần số: 1.000 Hz</span>
                    <span>|</span>
                    <span className="text-emerald-400">&lt; 0.6s / 24h</span>
                  </div>
                </div>

                {/* Clepsydra Visual Container */}
                <div className="relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-black p-5 flex flex-col justify-between">
                  {/* Top badges */}
                  <div className="flex items-center justify-between z-10 text-xs">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-800 px-2.5 py-1 text-cyan-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      Bình Áp Suất Không Đổi Mariotte
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Nước Cất Khử Ion (Deionized Pure Water)
                    </span>
                  </div>

                  {/* Dynamic Graphic SVG Render */}
                  <div className="relative my-auto flex items-center justify-center z-10">
                    {activeTab === 'schematic' ? (
                      /* Schematic 2D Blueprint */
                      <svg viewBox="0 0 300 130" className="w-full max-w-sm h-32">
                        {/* Glass Flask Upper */}
                        <path d="M 120,10 L 180,10 L 165,45 L 165,65 L 135,65 L 135,45 Z" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                        <text x="150" y="25" fill="#a5f3fc" fontSize="7" textAnchor="middle">Mariotte Vessel</text>
                        {/* Nozzle Drip */}
                        <line x1="150" y1="65" x2="150" y2="80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                        {/* Rocker balance arm */}
                        <line x1="110" y1="88" x2="190" y2="88" stroke="#f59e0b" strokeWidth="2" />
                        <circle cx="150" cy="88" r="4" fill="#d97706" />
                        {/* Cup left and Hammer right */}
                        <rect x="100" y="85" width="16" height="12" fill="none" stroke="#f59e0b" />
                        <circle cx="195" cy="88" r="5" fill="#f59e0b" />
                        {/* Bronze Bell Bowl */}
                        <path d="M 190,105 Q 195,95 200,95 Q 205,95 210,105 Z" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="200" y="117" fill="#fbbf24" fontSize="7" textAnchor="middle">Bronze Bell</text>
                        {/* Slate Base */}
                        <rect x="80" y="122" width="140" height="6" fill="#44403c" stroke="#78716c" />
                      </svg>
                    ) : (
                      /* Simulation View */
                      <div className="relative flex flex-col items-center justify-center">
                        <div className="relative h-28 w-24 rounded-t-xl rounded-b-md border border-cyan-500/50 bg-cyan-950/20 backdrop-blur flex flex-col items-center justify-between p-2 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                          {/* Water level indicator */}
                          <div className="w-full h-8 rounded bg-gradient-to-t from-cyan-600/40 to-cyan-400/20 border-b border-cyan-400" />
                          {/* Falling drop animation */}
                          <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-bounce" />
                          <span className="text-[9px] font-mono text-cyan-300">1 GIỌT / GIÂY</span>
                        </div>
                        {/* Bronze Bell Stand */}
                        <div className="mt-2 flex items-center gap-4">
                          <div className="h-6 w-12 rounded-t-full border border-amber-500 bg-gradient-to-b from-amber-400 to-amber-700 shadow-md flex items-center justify-center text-[9px] text-stone-950 font-serif font-bold">
                            1Hz
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Feedback bar */}
                  <div className="flex items-center justify-between z-10 text-xs text-stone-400 font-mono">
                    <span>Đèn LED 2400K soi bọt khí khúc xạ thư thái</span>
                    {isPlayingAudio ? (
                      <span className="text-amber-400 font-medium animate-pulse">
                        ♫ Ngân vang chuông đồng 880Hz thanh tịnh
                      </span>
                    ) : (
                      <span>Nhấp nút bên dưới để nghe thanh âm giọt nước gõ chuông</span>
                    )}
                  </div>
                </div>

                {/* Interactive Controls */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <label htmlFor="clepsydra-drip-rate" className="text-xs uppercase tracking-wider text-stone-400 font-mono block">
                      Tần Số Nhỏ Giọt (Chuẩn 60 Giọt/Phút = 1Hz):
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        id="clepsydra-drip-rate"
                        type="range"
                        min={55}
                        max={65}
                        step={1}
                        value={dripRate}
                        onChange={(e) => setDripRate(Number(e.target.value))}
                        className="h-1.5 w-44 sm:w-56 appearance-none rounded-lg bg-stone-800 accent-cyan-500 cursor-pointer"
                      />
                      <span className="font-mono text-xs text-cyan-400 font-bold">{dripRate} bpm</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlayClepsydraChime}
                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-4 py-2.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/30 transition-colors shadow-sm"
                  >
                    <span>{isPlayingAudio ? 'Đang phát thanh âm Clepsydra...' : 'Nghe Thanh Âm Chuông Đồng 1Hz'}</span>
                    <span className="rounded bg-stone-950 px-1.5 py-0.5 font-mono text-[10px] text-cyan-400">
                      880Hz
                    </span>
                  </button>
                </div>
              </div>

              {/* Slate Base Specification */}
              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-4">
                  <div className="text-xs text-stone-300 font-light leading-relaxed">
                    <span className="font-semibold text-stone-100">Bệ đỡ đá phiến đen Thanh Hóa: </span>
                    Được gia công từ khối đá trầm tích nguyên tảng dày 180mm nặng 420kg, đặt trên 4 chân đệm cao su giảm chấn công nghiệp, 
                    triệt tiêu toàn bộ rung động từ bước chân và giao thông đường phố, giữ cho dòng chảy chất lỏng đạt sự tĩnh tại tuyệt đối.
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Technical Specs & Horology Integration */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-medium">
                  Nguyên Lý Cơ Học Thủy Lực Cổ Điển
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Sự chuẩn xác của một cỗ máy thời gian không dùng pin hay điện lưới:
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      01 / Bình Ổn Áp Mariotte Không Đổi
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Ống thông khí cắm sâu vào bình kín duy trì áp suất thủy tĩnh tại vòi phun luôn không đổi, 
                      giúp kích thước và tốc độ rơi từng giọt nước đạt độ đồng nhất 99.98% bất kể mực nước vơi đầy.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      02 / Búa Gõ Cân Bằng Đối Trọng Đồng Thau
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Khi chén đón giọt nước tích đủ 1.00 gram trọng lượng, đòn bẩy nghiêng giải phóng búa gõ chạm nhẹ vào vành chuông đồng, 
                      đồng thời xả sạch nước xuống bể tuần hoàn ngầm bên dưới.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      03 / Chuông Đồng Thanh Âm Thiền Định
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Đúc bằng hợp kim đồng thau 80/20 tôi luyện theo kỹ thuật chuông chùa cổ truyền Việt Nam, 
                      thanh âm ngân vang ấm dịu, nhắc nhở gia chủ về từng khoảnh khắc hiện tại quý giá.
                    </p>
                  </div>
                </div>

                {/* Anti-vibration note */}
                <div className="mt-4 rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-3.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    Hệ Tuần Hoàn Nước Vi Lưu Khép Kín
                  </div>
                  <p className="mt-1 text-[11px] text-stone-300 font-light leading-relaxed">
                    Bơm vi lưu siêu tĩnh dưới 8 dBA tuần hoàn nước ban đêm; nước cất bổ sung ion bạc khử khuẩn, 
                    hoàn toàn không đóng cặn vôi hay rêu tảo trong suốt 10 năm vận hành.
                  </p>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-light">
                    Thiết kế tác phẩm nghệ thuật đại sảnh:
                  </span>
                  <Link
                    href="/du-toan-chi-phi"
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    <span>Dự toán lắp đặt</span>
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio visit link */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Xem cỗ máy đồng hồ nước Clepsydra vận hành trực tiếp tại{' '}
            <span className="font-medium text-stone-200">GuHomes Atrium Showcase (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              <span>Đặt lịch chiêm ngưỡng tác phẩm</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <span className="text-stone-700">|</span>
            <a
              href="tel:0368757916"
              className="text-xs text-stone-300 hover:text-white font-mono transition-colors"
            >
              Hotline: 0368 757 916
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
