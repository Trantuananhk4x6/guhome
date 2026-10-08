'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type LightingScenario = 'premiere' | 'concert' | 'vintage'

interface CinemaChannel {
  channel: string
  speakers: string
  role: string
}

const CINEMA_CHANNELS: CinemaChannel[] = [
  { channel: '9 Vòm Nằm Ngang', speakers: 'L/C/R + Wide + Side + Rear Surround', role: 'Định vị âm trường 360° chính xác đến từng bước chân' },
  { channel: '4 Siêu Trầm Subwoofer', speakers: '4x 15-inch Sealed Dual-Opposed', role: 'Dải trầm 16Hz rung chuyển ghế ngồi không gây ù rền sàn nhà' },
  { channel: '6 Loa Trần Atmos', speakers: '6x Coaxial Vòm Trần Hướng Nghiêng 15°', role: 'Tái hiện tiếng mưa rơi, tiếng trực thăng gầm rú từ tầng không' },
]

export function SaigonCalocedrusHomeCinemaSanctuary({ className }: { className?: string } = {}) {
  const [activeScenario, setActiveScenario] = useState<LightingScenario>('premiere')
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [noiseLeakTesting, setNoiseLeakTesting] = useState<boolean>(false)

  // Safe Web Audio API Spatial Sound Chime
  const handlePlaySpatialSurround = () => {
    if (typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const now = ctx.currentTime

      // Cinematic Sub Rumble (Low frequency oscillator)
      const subOsc = ctx.createOscillator()
      const subGain = ctx.createGain()
      subOsc.type = 'sine'
      subOsc.frequency.setValueAtTime(45, now)
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 1.8)
      subGain.gain.setValueAtTime(0.01, now)
      subGain.gain.linearRampToValueAtTime(0.3, now + 0.3)
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2)
      subOsc.connect(subGain)
      subGain.connect(ctx.destination)
      subOsc.start(now)
      subOsc.stop(now + 2.3)

      // High Shimmer Atmos Harmonic
      const highOsc = ctx.createOscillator()
      const highGain = ctx.createGain()
      highOsc.type = 'triangle'
      highOsc.frequency.setValueAtTime(528, now)
      highOsc.frequency.exponentialRampToValueAtTime(880, now + 1.2)
      highGain.gain.setValueAtTime(0.01, now)
      highGain.gain.linearRampToValueAtTime(0.15, now + 0.5)
      highGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5)
      highOsc.connect(highGain)
      highGain.connect(ctx.destination)
      highOsc.start(now + 0.2)
      highOsc.stop(now + 2.6)

      setIsPlayingAudio(true)
      setTimeout(() => {
        setIsPlayingAudio(false)
      }, 2600)
    } catch {
      // Graceful fallback if audio context blocked
      setIsPlayingAudio(true)
      setTimeout(() => setIsPlayingAudio(false), 1500)
    }
  }

  const handleTestNoiseIsolation = () => {
    setNoiseLeakTesting(true)
    setTimeout(() => {
      setNoiseLeakTesting(false)
    }, 3000)
  }

  return (
    <section
      aria-label="Phòng Chiếu Phim Tư Gia Gỗ Bách Xanh Chuẩn Dolby Atmos 9.4.6"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient cinema glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-900/15 blur-[150px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-rose-950/20 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(180,83,9,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Kiến Trúc Rạp Phim Dinh Thự
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Phòng Chiếu Phim Gỗ Bách Xanh & Dolby Atmos 9.4.6
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Điện ảnh đa giác quan giao hòa cùng hương thơm thanh tịnh của rừng nguyên sinh Mộc Châu. 
            Màn chiếu cong ALR 200 inch cản sáng 92%, cấu hình âm học 9.4.6 kênh kiểm soát dội âm RT60 = 0.28s, 
            và hệ vách cách âm đa tầng đạt chỉ số STC 65 bảo vệ tuyệt đối sự tĩnh lặng của phòng ngủ master.
          </p>
        </div>

        {/* Interactive Cinema Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Curved ALR Screen & Acoustic Wall Visualizer */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Màn Chiếu Quang Học ALR 200-inch 8K HDR
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {activeScenario === 'premiere' && 'Kịch Bản: Cinema Premiere (Độ Tối Tuyệt Đối)'}
                      {activeScenario === 'concert' && 'Kịch Bản: Acoustic Concert (Hổ Phách Thính Phòng)'}
                      {activeScenario === 'vintage' && 'Kịch Bản: Vintage Noir (Hoài Niệm Phim Nhựa 35mm)'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/80 px-3 py-1 text-xs text-stone-300">
                    <span className="text-amber-400 font-mono">RT60: 0.28s</span>
                    <span>|</span>
                    <span className="text-emerald-400 font-semibold font-mono">STC 65</span>
                  </div>
                </div>

                {/* Curved Screen Simulation Container */}
                <div className={cn(
                  'relative mt-6 h-60 sm:h-72 w-full overflow-hidden rounded-xl border transition-all duration-700 flex flex-col justify-between p-5',
                  activeScenario === 'premiere' && 'border-stone-800 bg-black shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]',
                  activeScenario === 'concert' && 'border-amber-900/60 bg-gradient-to-b from-stone-950 via-amber-950/30 to-black shadow-[0_0_40px_rgba(217,119,6,0.15)]',
                  activeScenario === 'vintage' && 'border-stone-700/60 bg-gradient-to-b from-stone-900 via-stone-950 to-black shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                )}>
                  {/* Top info badge inside simulation */}
                  <div className="flex items-center justify-between z-10 text-xs">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-800 px-2.5 py-1 text-amber-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                      Loa Vách Ẩn Vải Nỉ Tiêu Âm Micro-Perforated
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Tỷ lệ khung hình: 2.39:1 Cinemascope
                    </span>
                  </div>

                  {/* Cinema Curved Screen Frame Articulation */}
                  <div className="relative my-auto flex flex-col items-center justify-center z-10">
                    <div className={cn(
                      'relative w-11/12 h-32 sm:h-36 rounded-2xl border-2 transition-all duration-700 flex flex-col items-center justify-center overflow-hidden',
                      activeScenario === 'premiere' && 'border-stone-700 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 shadow-2xl',
                      activeScenario === 'concert' && 'border-amber-500/80 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 shadow-[0_0_50px_rgba(245,158,11,0.25)]',
                      activeScenario === 'vintage' && 'border-stone-500/70 bg-gradient-to-r from-stone-800 via-stone-700/80 to-stone-800'
                    )}>
                      {/* Cinema projector light beam */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
                      
                      <div className="relative text-center px-4">
                        <div className="font-serif text-base sm:text-lg text-amber-200 tracking-wider">
                          GUHOMES MASTER CINEMA PRIVATE VAULT
                        </div>
                        <p className="mt-1 text-[11px] text-stone-300 font-light">
                          Hệ Vách Tiêu Âm Bách Xanh Mộc Châu • Dolby Atmos 9.4.6 Kênh Riêng Biệt
                        </p>
                      </div>

                      {/* Screen audio wave animation when audio playing */}
                      {isPlayingAudio && (
                        <div className="absolute bottom-2 flex items-center gap-1.5">
                          <span className="h-3 w-1 bg-amber-400 animate-[pulse_0.4s_infinite]" />
                          <span className="h-5 w-1 bg-amber-300 animate-[pulse_0.6s_infinite]" />
                          <span className="h-2 w-1 bg-amber-500 animate-[pulse_0.3s_infinite]" />
                          <span className="h-6 w-1 bg-amber-200 animate-[pulse_0.5s_infinite]" />
                          <span className="h-4 w-1 bg-amber-400 animate-[pulse_0.7s_infinite]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom bar of screen container */}
                  <div className="flex items-center justify-between z-10 text-[11px] font-mono text-stone-400">
                    <span>Ghế Recliner Nhung Lụa Motor trượt &lt; 12 dBA</span>
                    <span>Tỏa Hương Tinh Dầu Bách Xanh 24/7</span>
                  </div>
                </div>

                {/* Scenario Selector Pills */}
                <div className="mt-6">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Chọn Kịch Bản Chiếu Sáng & Không Gian:
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setActiveScenario('premiere')}
                      className={cn(
                        'rounded-xl border p-3 text-left transition-all',
                        activeScenario === 'premiere'
                          ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm shadow-amber-900/30'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">Cinema Premiere</div>
                      <div className="mt-0.5 text-[10px] text-stone-400">Tối đen 0.001 Lux chuẩn THX</div>
                    </button>
                    <button
                      onClick={() => setActiveScenario('concert')}
                      className={cn(
                        'rounded-xl border p-3 text-left transition-all',
                        activeScenario === 'concert'
                          ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm shadow-amber-900/30'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">Acoustic Concert</div>
                      <div className="mt-0.5 text-[10px] text-stone-400">Hổ phách ấm 20% thính phòng</div>
                    </button>
                    <button
                      onClick={() => setActiveScenario('vintage')}
                      className={cn(
                        'rounded-xl border p-3 text-left transition-all',
                        activeScenario === 'vintage'
                          ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm shadow-amber-900/30'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">Vintage Noir</div>
                      <div className="mt-0.5 text-[10px] text-stone-400">Hoài niệm phim nhựa 35mm</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sound & Soundproof interactive test controls */}
              <div className="mt-6 pt-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePlaySpatialSurround}
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/20 px-4 py-2.5 text-xs font-medium text-amber-300 hover:bg-amber-500/30 transition-colors shadow-sm"
                >
                  <span>{isPlayingAudio ? 'Đang phát trường âm Atmos...' : 'Trải Nghiệm Âm Thanh Vòm Atmos 9.4.6'}</span>
                  <span className="rounded bg-stone-950 px-1.5 py-0.5 font-mono text-[10px] text-amber-400">
                    528Hz + 30Hz Sub
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleTestNoiseIsolation}
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-800/80 px-4 py-2.5 text-xs font-medium text-stone-300 hover:bg-stone-800 transition-colors"
                >
                  <span>Kiểm tra Cách Âm STC 65 Phòng Ngủ</span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    105 dB → 28 dBA
                  </span>
                </button>
              </div>

              {noiseLeakTesting && (
                <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-2.5 text-center text-xs text-emerald-300 font-mono">
                  ✓ Độ cách âm STC 65 hoàn hảo: Âm lượng phim hành động 105 dB tại rạp truyền sang phòng ngủ chỉ còn 28 dBA (tĩnh lặng tuyệt đối).
                </div>
              )}
            </div>

            {/* Right 5 cols: Technical Specs & Wood Aroma Features */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/60 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                  Cấu Trúc Hệ Âm Thanh 9.4.6
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Phân bố 19 kênh loa riêng biệt tạo nên vòm âm thanh hình cầu chân thực:
                </p>

                {/* Channels breakdown */}
                <div className="mt-4 space-y-2.5">
                  {CINEMA_CHANNELS.map((ch, idx) => (
                    <div key={idx} className="rounded-xl border border-stone-800/90 bg-stone-950/50 p-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-200">
                        <span>{ch.channel}</span>
                        <span className="font-mono text-[11px] text-amber-400">{ch.speakers}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-stone-400 font-light leading-relaxed">
                        {ch.role}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Calocedrus wood aroma feature */}
                <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Hệ Vách Tiêu Âm Gỗ Bách Xanh Mộc Châu Tự Nhiên
                  </div>
                  <p className="mt-1.5 text-xs text-stone-300 font-light leading-relaxed">
                    Hàm lượng tinh dầu bách xanh tự nhiên chứa monoterpene quý giá giúp an thần, 
                    hạ huyết áp và thanh lọc vi khí hậu phòng kín. Gỗ xẻ rãnh nan tiêu âm toán học Schroeder Diffuser triệt tiêu hoàn toàn hiện tượng dội âm flutter echo.
                  </p>
                </div>
              </div>

              {/* Consultation Link & Hotline */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-light">
                    May đo rạp phim dinh thự trọn gói:
                  </span>
                  <Link
                    href="/du-toan-chi-phi"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                  >
                    <span>Bóc tách âm học</span>
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-300">
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">01 / MÀN CHIẾU CONG QUANG HỌC</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Cản Sáng ALR 92%</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Mặt màn chiếu cong theo độ cầu mắt người, phủ lớp vi hạt quang học triệt tiêu ánh sáng tán xạ xung quanh, đem lại độ sâu màu đen tuyệt đối như rạp chiếu phim IMAX thương mại.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">02 / CÁCH ÂM VĨNH CỬU STC 65</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Box-In-A-Box Tách Rời Sàn</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Kết cấu phòng lồng trong phòng với hệ lò xo giảm chấn âm học Thụy Sĩ. Âm bass 16Hz không truyền qua dầm bê tông hay sang phòng ngủ người lớn tuổi và trẻ nhỏ kế bên.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">03 / TRỊ LIỆU KHỨU GIÁC & CƠ THỂ</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Gỗ Bách Xanh & Nhung Lụa</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Sự kết hợp giữa ghế ngả thư giãn công thái học êm ái và hương thơm thanh khiết của gỗ Bách Xanh tạo nên một liệu trình phục hồi thể chất và tinh thần sau một ngày làm việc căng thẳng.
            </p>
          </div>
        </div>

        {/* Studio visit link */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Trải nghiệm phòng chiếu mẫu thử nghiệm âm học tại{' '}
            <span className="font-medium text-stone-200">GuHomes Studio & Woodshop (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Đặt lịch trải nghiệm âm học</span>
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
