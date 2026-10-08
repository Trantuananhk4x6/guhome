'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type SunsetPhase = 'honey' | 'crimson' | 'twilight'

interface SunsetMoment {
  id: SunsetPhase
  time: string
  name: string
  skyDesc: string
  ambientTemp: number // Celsius before mist
  sunAngle: number // degrees above horizon
  skyGradient: string
  waterReflection: string
  riverColor: string
}

const SUNSET_MOMENTS: Record<SunsetPhase, SunsetMoment> = {
  honey: {
    id: 'honey',
    time: '17:00 Sài Gòn',
    name: 'Vàng Mật Ong (Honey Amber Horizon)',
    skyDesc: 'Nắng xiên góc 30° rọi qua tán cây bần ven sông, phủ lớp mật ngọt vàng óng lên mặt bàn trà Gõ Đỏ uốn lượn.',
    ambientTemp: 35,
    sunAngle: 30,
    skyGradient: 'from-amber-500/40 via-stone-900 to-stone-950',
    waterReflection: 'from-amber-400/40 to-amber-700/20',
    riverColor: 'text-amber-300',
  },
  crimson: {
    id: 'crimson',
    time: '17:40 Sài Gòn',
    name: 'Đỏ Rực Hướng Tây (Crimson Sunset Reverie)',
    skyDesc: 'Mặt trời chạm mép nước bán đảo Thanh Đa, bầu trời bùng lên dải đỏ thẫm rực rỡ, gió sông bắt đầu đổi chiều mát rượi.',
    ambientTemp: 32,
    sunAngle: 12,
    skyGradient: 'from-rose-600/40 via-amber-900/30 to-stone-950',
    waterReflection: 'from-rose-500/40 to-amber-800/20',
    riverColor: 'text-rose-300',
  },
  twilight: {
    id: 'twilight',
    time: '18:15 Sài Gòn',
    name: 'Tím Hoàng Hôn Thao Thức (Twilight Violet Glow)',
    skyDesc: 'Khoảnh khắc chạng vạng lắng đọng, ánh tím lam hòa quyện đèn hắt hổ phách 2200K phản chiếu những gợn sóng lăn tăn.',
    ambientTemp: 29,
    sunAngle: 0,
    skyGradient: 'from-indigo-900/40 via-purple-950/30 to-stone-950',
    waterReflection: 'from-purple-500/30 to-indigo-900/30',
    riverColor: 'text-purple-300',
  },
}

export function SaigonRiversideSunsetTeaObservatory({ className }: { className?: string }) {
  const componentId = useId()

  // State: Teak louver angle (0° = closed / full solar block, 45° = ventilation, 90° = open panorama)
  const [louverAngle, setLouverAngle] = useState<number>(45)
  const [sunsetPhase, setSunsetPhase] = useState<SunsetPhase>('crimson')
  const [isNanoMistActive, setIsNanoMistActive] = useState<boolean>(true)
  const [isPlayingRiverSounds, setIsPlayingRiverSounds] = useState<boolean>(false)
  const [selectedTea, setSelectedTea] = useState<'shantuyet' | 'oolong' | 'lotus'>('shantuyet')

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const noiseSourceRef = useRef<AudioNode | null>(null)
  const birdTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentMoment = SUNSET_MOMENTS[sunsetPhase]
  const effectiveTemp = isNanoMistActive ? currentMoment.ambientTemp - 8 : currentMoment.ambientTemp
  const effectiveHumidity = isNanoMistActive ? 72 : 54

  // Audio Stop
  const stopAudio = () => {
    if (birdTimerRef.current) {
      clearInterval(birdTimerRef.current)
      birdTimerRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close()
      } catch {
        // Ignore
      }
      audioCtxRef.current = null
    }
    setIsPlayingRiverSounds(false)
  }

  // Web Audio Wave Sound Synthesis (Brownian Noise through modulated lowpass filter)
  const toggleRiverSounds = () => {
    if (isPlayingRiverSounds) {
      stopAudio()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      // Generate 4s looping Brownian noise buffer for river waves
      const bufferSize = ctx.sampleRate * 4
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      let lastOut = 0.0

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        const val = (lastOut + 0.02 * white) / 1.02
        lastOut = val
        output[i] = val * 3.5 // Gain compensation
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      // Filter for gentle wave swell
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(320, ctx.currentTime)

      // LFO to modulate wave swell
      const lfo = ctx.createOscillator()
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime) // 5s wave cycle
      const lfoGain = ctx.createGain()
      lfoGain.gain.setValueAtTime(180, ctx.currentTime)
      lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)
      lfo.start()

      // Main Gain
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2)

      whiteNoise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      whiteNoise.start()
      noiseSourceRef.current = whiteNoise
      setIsPlayingRiverSounds(true)

      // Gentle river bird chirps periodically
      birdTimerRef.current = setInterval(() => {
        if (!audioCtxRef.current) return
        const c = audioCtxRef.current
        const birdOsc = c.createOscillator()
        const birdGain = c.createGain()
        birdOsc.type = 'sine'
        birdOsc.frequency.setValueAtTime(2400 + Math.random() * 600, c.currentTime)
        birdOsc.frequency.exponentialRampToValueAtTime(3200 + Math.random() * 400, c.currentTime + 0.08)

        birdGain.gain.setValueAtTime(0.0001, c.currentTime)
        birdGain.gain.exponentialRampToValueAtTime(0.025, c.currentTime + 0.02)
        birdGain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12)

        birdOsc.connect(birdGain)
        birdGain.connect(c.destination)
        birdOsc.start(c.currentTime)
        birdOsc.stop(c.currentTime + 0.14)
      }, 5500)
    } catch {
      setIsPlayingRiverSounds(false)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  return (
    <section
      aria-labelledby={`heading-${componentId}`}
      className={cn('u-gutter py-16 md:py-24 transition-colors duration-700 bg-stone-950 text-stone-100', className)}
    >
      <div className="mx-auto max-w-[110rem] space-y-12">
        {/* Header Block */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-stone-800/80 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono tracking-wider uppercase text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Riverside Microclimate Sanctuary • Sài Gòn River Waterfront
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Vọng Lâu Trà Đạo Ven Sông &amp; Hệ Lam Teak Miến Điện Xoay Cản Nắng Tây
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Kiến tạo nơi thưởng trà ngoài trời vươn ra mép nước sông Sài Gòn. Hệ lam gỗ Teak Miến Điện xoay linh hoạt 0° - 90° cản triệt để bức xạ nhiệt hướng Tây, kết hợp bàn trà gỗ Gõ Đỏ uốn lượn theo thế nước, béc phun sương nano hạ nhiệt tức thì 8°C và ánh sáng hổ phách 2200K giao thoa cùng ráng chiều hoàng hôn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=riverside-tea-observatory"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Khảo Sát Địa Điểm Ven Sông
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Riverside Sunset & Louver Simulation */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={cn(
                'relative aspect-[16/10] sm:aspect-[16/9] rounded-none border border-stone-800 overflow-hidden bg-gradient-to-b transition-all duration-1000 flex flex-col justify-between p-6 sm:p-8',
                currentMoment.skyGradient
              )}
            >
              {/* Top Bar: Live Sài Gòn River Microclimate Info */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/50 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Thời Khắc</span>
                    <span className="text-xs font-mono font-medium text-amber-400">{currentMoment.time}</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Nhiệt Độ Vọng Lâu</span>
                    <span className="text-sm font-mono font-medium text-emerald-400">
                      {effectiveTemp}°C {isNanoMistActive && <span className="text-[10px] text-amber-400">(-8°C Sương Nano)</span>}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Ẩm Gió Sông</span>
                    <span className="text-xs font-mono text-stone-200">{effectiveHumidity}% RH</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-block w-2.5 h-2.5 rounded-full',
                      isNanoMistActive ? 'bg-cyan-400 animate-ping' : 'bg-stone-600'
                    )}
                  />
                  <span className="text-[11px] font-mono text-cyan-300">
                    {isNanoMistActive ? 'Béc Nano 2µm ON' : 'Nano Mist OFF'}
                  </span>
                </div>
              </div>

              {/* Center Simulation: Louver Slats & River Waves Visualization */}
              <div className="relative my-auto flex flex-col items-center justify-center text-center py-4">
                {/* Visual of Teak Louvers with variable angle */}
                <div className="relative w-full max-w-md h-36 border border-stone-800/80 bg-stone-950/60 backdrop-blur-sm p-4 flex flex-col justify-around overflow-hidden shadow-2xl">
                  {/* Louver Slats rendered dynamically */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="relative flex items-center justify-between">
                      <span className="text-[9px] font-mono text-stone-500">Lam #{i + 1}</span>
                      <div
                        style={{
                          transform: `rotate(${louverAngle}deg)`,
                          transformOrigin: 'center center',
                        }}
                        className="w-3/4 h-2 rounded bg-amber-700/80 border border-amber-500/40 shadow-sm transition-transform duration-500"
                      />
                      <span className="text-[9px] font-mono text-amber-400">{louverAngle}°</span>
                    </div>
                  ))}

                  {/* Nano mist particle overlay if active */}
                  {isNanoMistActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-white/5 to-transparent pointer-events-none animate-pulse" />
                  )}
                </div>

                {/* Sài Gòn River Flow Simulation */}
                <div className="w-full max-w-md mt-4 border-t border-stone-800/80 pt-3 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1">
                    <span>Dòng Sông Sài Gòn • Thủy Triều Bán Nhật Triều</span>
                    <span className={currentMoment.riverColor}>{currentMoment.name.split('(')[0]}</span>
                  </div>
                  {/* Water Reflection Bar */}
                  <div className={cn('w-full h-3 rounded-full bg-gradient-to-r transition-all duration-700', currentMoment.waterReflection)} />
                </div>
              </div>

              {/* Bottom Bar inside Stage: Controls */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">Trạng Thái Không Gian</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentMoment.name}</h3>
                    <p className="text-xs text-stone-400">{currentMoment.skyDesc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={toggleRiverSounds}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all min-h-[44px]',
                      isPlayingRiverSounds
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                        : 'border border-amber-500/50 text-amber-300 hover:bg-amber-500/10'
                    )}
                  >
                    {isPlayingRiverSounds ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        Tắt Tiếng Sóng Sông
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Nghe Sóng Sông &amp; Chim Chiều
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sunset Timeline Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.values(SUNSET_MOMENTS).map((moment) => {
                const isActive = moment.id === sunsetPhase
                return (
                  <button
                    key={moment.id}
                    type="button"
                    onClick={() => setSunsetPhase(moment.id)}
                    className={cn(
                      'text-left p-3.5 border transition-all min-h-[44px]',
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[11px] font-mono text-amber-400 uppercase">{moment.time}</div>
                    <div className="text-xs font-medium text-stone-200 truncate mt-0.5">{moment.name.split('(')[0]}</div>
                    <div className="text-[10px] text-stone-500 mt-1">Góc nắng: {moment.sunAngle}°</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Teak Louver Angle Controls, Nano Mist Switch & Tea Pairing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
              {/* Louver Control */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-stone-300">Góc Xoay Lam Gỗ Teak Miến Điện</span>
                  <span className="text-amber-400 font-bold">{louverAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={louverAngle}
                  onChange={(e) => setLouverAngle(Number(e.target.value))}
                  aria-label="Điều chỉnh góc xoay lam gỗ Teak từ 0 đến 90 độ"
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-none min-h-[44px]"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>0° (Cản nắng Tây 100%)</span>
                  <span>45° (Hút gió đối lưu sông)</span>
                  <span>90° (Mở trọn tầm nhìn sông)</span>
                </div>
              </div>

              {/* Nano Mist Toggle */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                    Hệ Thống Phun Sương Nano Áp Suất Cao (70 Bar)
                  </h3>
                  <p className="text-[11px] text-stone-400 font-light mt-0.5">
                    Hạt sương siêu mịn 2 micron bay hơi tức thì, hạ nhiệt độ không khí 8°C mà không đọng ướt mặt gỗ Teak.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNanoMistActive(!isNanoMistActive)}
                  className={cn(
                    'px-4 py-2 font-mono text-xs uppercase transition-all whitespace-nowrap min-h-[44px]',
                    isNanoMistActive
                      ? 'bg-cyan-500 text-stone-950 font-semibold'
                      : 'border border-stone-700 text-stone-400 hover:text-stone-200'
                  )}
                >
                  {isNanoMistActive ? 'Đang Bật Nano (-8°C)' : 'Bật Sương Nano'}
                </button>
              </div>

              {/* Tea Pairing Selection */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  Danh Trà Khuyên Dùng Cho Buổi Hoàng Hôn
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'shantuyet', name: 'Trà Shan Tuyết Cổ Thụ', temp: '88°C', notes: 'Khói lam & Mật ong rừng' },
                    { id: 'oolong', name: 'Đông Phương Mỹ Nhân', temp: '92°C', notes: 'Hương quả chín & Vị thanh ngọt' },
                    { id: 'lotus', name: 'Trà Sen Tây Hồ Thượng Hạng', temp: '85°C', notes: 'Hương sen thanh khiết cao quý' },
                  ].map((tea) => {
                    const isSelected = selectedTea === tea.id
                    return (
                      <button
                        key={tea.id}
                        type="button"
                        onClick={() => setSelectedTea(tea.id as typeof selectedTea)}
                        className={cn(
                          'p-2.5 border text-left transition-all min-h-[44px]',
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10 text-stone-100'
                            : 'border-stone-800 hover:border-stone-700 text-stone-400 bg-stone-950/40'
                        )}
                      >
                        <div className="text-[11px] font-medium text-stone-200 truncate">{tea.name}</div>
                        <div className="text-[10px] font-mono text-amber-400 mt-0.5">{tea.temp}</div>
                        <div className="text-[9px] text-stone-500 truncate mt-0.5">{tea.notes}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Material & Craft Specifications */}
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-4 text-xs font-light text-stone-300">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Chi Tiết Cấu Kiện Vọng Lâu Ven Sông GuHomes
              </h3>

              <div className="border-b border-stone-800 pb-3">
                <span className="text-stone-200 font-medium block">1. Lam Gỗ Teak Miến Điện (Tectona Grandis)</span>
                <p className="mt-1 text-stone-400">
                  Hàm lượng tinh dầu tự nhiên dồi dào, kháng ẩm mặn sông Sài Gòn, không cong vênh dưới nắng Tây 40°C. Xoay bằng trục đồng thau nguyên khối CNC.
                </p>
              </div>

              <div className="border-b border-stone-800 pb-3">
                <span className="text-stone-200 font-medium block">2. Bàn Trà Gỗ Gõ Đỏ Liền Khối</span>
                <p className="mt-1 text-stone-400">
                  Bản rộng 1.1m dài 3.6m được đẽo cong mô phỏng thế uốn của dòng sông, xử lý dầu lau thực vật Osmo (Đức) giữ nguyên xúc giác gỗ mộc mạc.
                </p>
              </div>

              <div>
                <span className="text-stone-200 font-medium block">3. Hệ Chiếu Sáng Hổ Phách 2200K UGR &lt; 10</span>
                <p className="mt-1 text-stone-400">
                  Đèn rọi chân tường gián tiếp chống chói tuyệt đối, không thu hút côn trùng nước buổi tối, tạo cảm giác tĩnh tại tuyệt đối khi đêm về.
                </p>
              </div>
            </div>

            {/* Link CTA */}
            <div className="p-5 border border-amber-500/30 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Dự Toán Vọng Lâu Ven Sông
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Bóc tách chi tiết hệ kết cấu khung thép mạ kẽm bọc gỗ Teak &amp; hệ béc phun sương.
                </p>
              </div>
              <Link
                href="/du-toan-chi-phi"
                className="whitespace-nowrap px-4 py-2 border border-amber-500/60 text-amber-300 hover:bg-amber-500/20 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Tính Chi Phí Thi Công
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
