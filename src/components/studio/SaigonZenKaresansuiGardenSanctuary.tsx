'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type SandPattern = 'song-bien' | 'vong-xoay' | 'may-nuoc' | 'thang-hang'
export type MeditationMoment = 'binh-minh' | 'trua-tinh' | 'trang-dem'

interface SandPatternConfig {
  id: SandPattern
  name: string
  subname: string
  symbolism: string
  patternSvgD: string
  canvasPatternType: 'concentric' | 'spiral' | 'waves' | 'linear'
  description: string
}

const SAND_PATTERNS: Record<SandPattern, SandPatternConfig> = {
  'song-bien': {
    id: 'song-bien',
    name: 'Sóng Biển Lặng',
    subname: 'Seigaiha · Đại Dương Bình Yên',
    symbolism: 'Dải sóng nhấp nhô tuần hoàn bất tận của biển cả tĩnh lặng, đưa tâm thức về trạng thái an nhiên vô vi.',
    patternSvgD: 'M 0 20 Q 25 5 50 20 T 100 20 T 150 20 T 200 20',
    canvasPatternType: 'waves',
    description: 'Đường cào cát uốn lượn hình cánh cung đồng tâm quanh 7 khối đá bazan Đắk Nông, mô phỏng mặt nước phẳng lặng đón gió sớm.',
  },
  'vong-xoay': {
    id: 'vong-xoay',
    name: 'Vòng Xoáy Tĩnh Tâm',
    subname: 'Kanso Enso · Xoáy Tròn Vô Cùng',
    symbolism: 'Vòng xoáy viên dung không khởi đầu không kết thúc, triệt tiêu tạp niệm để hướng vào nội tâm sâu thẳm.',
    patternSvgD: 'M 100 100 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0',
    canvasPatternType: 'spiral',
    description: 'Đường vân xoắn ốc lan tỏa từ khối đá thiền trung tâm, kích thích sóng não alpha đạt trạng thái thiền định sâu.',
  },
  'may-nuoc': {
    id: 'may-nuoc',
    name: 'Mây Nước Giao Hòa',
    subname: 'Unkei · Mây Bay Sông Chảy',
    symbolism: 'Sự uyển chuyển buông xả như áng mây trôi và dòng suối nguồn tự nhiên luân chuyển không ngừng nghỉ.',
    patternSvgD: 'M 0 30 Q 30 10 60 30 T 120 30 T 180 30',
    canvasPatternType: 'concentric',
    description: 'Vân cát mềm mại cuộn trôi qua các bãi rêu xanh, xóa mờ ranh giới giữa tự nhiên nguyên sơ và kiến trúc đương đại.',
  },
  'thang-hang': {
    id: 'thang-hang',
    name: 'Thẳng Hàng Định Tâm',
    subname: 'Chokusen · Nhất Tâm Bất Loạn',
    symbolism: 'Đường thẳng kỷ luật và sự định tâm kiên định của thiền sinh trước mọi biến thiên thử thách của ngoại giới.',
    patternSvgD: 'M 0 15 L 200 15 M 0 30 L 200 30 M 0 45 L 200 45',
    canvasPatternType: 'linear',
    description: 'Những luống cát thẳng tắp kẻ song song tột cùng chính xác bằng cào gỗ sồi già, phản chiếu trật tự tuyệt đối của vũ trụ.',
  },
}

interface MomentTheme {
  id: MeditationMoment
  name: string
  subname: string
  kelvin: number
  skyGradient: string
  glowColor: string
  stoneShadow: string
}

const MEDITATION_MOMENTS: Record<MeditationMoment, MomentTheme> = {
  'binh-minh': {
    id: 'binh-minh',
    name: 'Bình Minh Tĩnh Mịch',
    subname: '05:30 · Nắng Sớm Xuyên Rèm',
    kelvin: 3200,
    skyGradient: 'from-amber-950/40 via-stone-900 to-black',
    glowColor: '#f59e0b',
    stoneShadow: 'rgba(245, 158, 11, 0.15)',
  },
  'trua-tinh': {
    id: 'trua-tinh',
    name: 'Trưa Tĩnh Lặng',
    subname: '12:00 · Bóng Nắng Đứng Bóng',
    kelvin: 4000,
    skyGradient: 'from-stone-900 via-neutral-900 to-black',
    glowColor: '#e0c097',
    stoneShadow: 'rgba(224, 192, 151, 0.12)',
  },
  'trang-dem': {
    id: 'trang-dem',
    name: 'Trăng Đêm Tịch Diệu',
    subname: '21:00 · Đèn Đá Ánh Vàng 2400K',
    kelvin: 2400,
    skyGradient: 'from-indigo-950/40 via-stone-950 to-black',
    glowColor: '#d4af37',
    stoneShadow: 'rgba(212, 175, 55, 0.2)',
  },
}

export function SaigonZenKaresansuiGardenSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPattern, setSelectedPattern] = useState<SandPattern>('song-bien')
  const [selectedMoment, setSelectedMoment] = useState<MeditationMoment>('trang-dem')
  const [isSoundRunning, setIsSoundRunning] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const bellOscRef = useRef<OscillatorNode | null>(null)
  const bellGainRef = useRef<GainNode | null>(null)
  const windSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const windGainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      stopZenSound()
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Synthesize Tibetan singing bowl resonance (528Hz Love / DNA repair frequency)
  function strikeZenBowl() {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Fundamental 528 Hz
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(528, now)

    // First overtone 1452 Hz
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(1452, now)

    // Subtle warm drone 264 Hz
    const osc3 = ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.setValueAtTime(264, now)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.03)
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8)

    osc1.connect(masterGain)
    osc2.connect(masterGain)
    osc3.connect(masterGain)
    masterGain.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc3.start(now)

    osc1.stop(now + 5.0)
    osc2.stop(now + 5.0)
    osc3.stop(now + 5.0)
  }

  // Bamboo breeze background rustle
  function startZenSound() {
    const ctx = getAudioContext()
    if (!ctx) return
    stopZenSound()

    strikeZenBowl()

    const now = ctx.currentTime
    const duration = 6.0
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Soft pink noise filtered for breeze through bamboo leaves
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.02
      b6 = white * 0.115926
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(420, now)
    filter.Q.setValueAtTime(2.0, now)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.gain.exponentialRampToValueAtTime(0.12, now + 1.2)

    source.connect(filter)
    filter.connect(masterGain)
    masterGain.connect(ctx.destination)

    source.start(now)
    windSourceRef.current = source
    windGainRef.current = masterGain
    setIsSoundRunning(true)
  }

  function stopZenSound() {
    if (windGainRef.current && audioCtxRef.current) {
      try {
        const now = audioCtxRef.current.currentTime
        windGainRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.4)
      } catch {
        // Safe ignore
      }
    }
    setTimeout(() => {
      if (windSourceRef.current) {
        try {
          windSourceRef.current.stop()
          windSourceRef.current.disconnect()
        } catch {
          // Safe ignore
        }
        windSourceRef.current = null
      }
      setIsSoundRunning(false)
    }, 450)
  }

  const curPattern = SAND_PATTERNS[selectedPattern]
  const curMoment = MEDITATION_MOMENTS[selectedMoment]

  // 7 Basalt monolith coordinate anchors (simulating Zen stone cluster composition 3-2-2)
  const BASALT_STONES = [
    { id: 1, x: 28, y: 35, size: 'w-16 h-14', name: 'Đá Chủ (Chủ Sơn)' },
    { id: 2, x: 23, y: 48, size: 'w-10 h-8', name: 'Đá Thị Giả' },
    { id: 3, x: 38, y: 42, size: 'w-12 h-10', name: 'Đá Khách' },
    { id: 4, x: 65, y: 60, size: 'w-14 h-12', name: 'Đá Thác Trầm' },
    { id: 5, x: 75, y: 55, size: 'w-9 h-7', name: 'Đá Trụ Duyên' },
    { id: 6, x: 80, y: 25, size: 'w-11 h-9', name: 'Đá Quan Âm' },
    { id: 7, x: 50, y: 75, size: 'w-8 h-7', name: 'Đá Đảo Phù Vân' },
  ]

  return (
    <section
      aria-labelledby="karesansui-garden-sanctuary-heading"
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 md:p-12 text-stone-200 shadow-2xl transition-colors duration-700',
        className
      )}
    >
      {/* Background Ambience Sky Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-700',
          curMoment.skyGradient
        )}
      />

      {/* Stone Lantern Ambient Glow */}
      <div
        className="pointer-events-none absolute -bottom-24 -right-12 h-80 w-80 rounded-full opacity-25 blur-3xl transition-all duration-700"
        style={{ backgroundColor: curMoment.glowColor }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            <span>Indoor Zen Karesansui · Heated Subfloor &lt; 50% RH · 7 Dak Nong Basalts</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                id="karesansui-garden-sanctuary-heading"
                className="text-2xl md:text-4xl font-serif font-light tracking-tight text-stone-100"
              >
                Vườn Thiền Khô Karesansui Trong Nhà & Sưởi Cát Thạch Anh
              </h2>
              <p className="mt-2 text-sm md:text-base text-stone-400 max-w-2xl font-light leading-relaxed">
                Tĩnh lặng vô thường giữa lòng Sài Gòn sôi động. Tổ hợp 7 khối đá bazan Đắk Nông nguyên khối phủ rêu nhung tự nhiên trên thảm cát thạch anh trắng mịn. Hệ cáp sưởi nhiệt sàn ngầm duy trì độ ẩm &lt; 50% triệt tiêu nồm ẩm mùa mưa dầm Nam Bộ, tỏa ánh sáng đèn đá thủ công 2400K êm dịu.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Đá thiền: <strong className="text-amber-400">7 Khối Bazan Đắk Nông</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Sưởi nhiệt ngầm: <strong className="text-amber-400">&lt; 50% RH Chống Ẩm</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Đèn đá: <strong className="text-amber-400">2400K Tĩnh Lặng</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Master Interactive Canvas & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Karesansui Zen Sand Bed (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Sand Garden Bed Simulation */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800/80 text-xs">
                <span className="font-mono text-amber-300 uppercase tracking-wider">
                  Vân Cào Cát: {curPattern.name}
                </span>
                <span className="text-stone-400">
                  Thời khắc: <strong className="text-stone-200">{curMoment.name} ({curMoment.kelvin}K)</strong>
                </span>
              </div>

              {/* Sand Canvas with 7 Monolithic Basalts */}
              <div
                className="relative mt-4 h-80 sm:h-96 w-full rounded-xl overflow-hidden border border-stone-700/80 transition-all duration-700 p-4 select-none"
                style={{
                  backgroundColor: '#e6ded3', // Natural quartz sand tone
                  backgroundImage:
                    selectedPattern === 'song-bien'
                      ? `radial-gradient(ellipse at 30% 40%, rgba(0,0,0,0.12) 0%, transparent 60%), repeating-radial-gradient(circle at 30% 40%, #e6ded3 0px, #e6ded3 8px, #d7cdbe 10px, #e6ded3 12px)`
                      : selectedPattern === 'vong-xoay'
                      ? `repeating-radial-gradient(circle at 50% 50%, #e6ded3 0px, #e6ded3 12px, #cec2b0 14px, #e6ded3 18px)`
                      : selectedPattern === 'may-nuoc'
                      ? `repeating-linear-gradient(45deg, #e6ded3 0px, #e6ded3 14px, #cec2b0 16px, #e6ded3 20px)`
                      : `repeating-linear-gradient(90deg, #e6ded3 0px, #e6ded3 10px, #d5cabd 12px, #e6ded3 16px)`,
                }}
              >
                {/* Lighting and Texture Shade Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply transition-all duration-700"
                  style={{
                    backgroundColor:
                      selectedMoment === 'trang-dem'
                        ? '#1b2230'
                        : selectedMoment === 'binh-minh'
                        ? '#2b1b11'
                        : '#141414',
                  }}
                />

                {/* 7 Basalt Monolith Clusters */}
                {BASALT_STONES.map((stone) => (
                  <div
                    key={stone.id}
                    title={stone.name}
                    className={cn(
                      'absolute rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-black border border-stone-700/60 shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer',
                      stone.size
                    )}
                    style={{
                      left: `${stone.x}%`,
                      top: `${stone.y}%`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 15px 25px -5px ${curMoment.stoneShadow}, 0 8px 10px -6px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {/* Natural Moss Top Accent */}
                    <div className="h-2 w-3 rounded-full bg-emerald-700/60 blur-[1px] -mt-2 -ml-2" />
                    <span className="text-[8px] font-mono text-stone-400 opacity-60">#{stone.id}</span>
                  </div>
                ))}

                {/* Handcrafted Stone Lantern (Đèn đá góc sân) */}
                <div
                  className="absolute bottom-4 right-4 h-12 w-10 rounded-lg bg-stone-800 border border-stone-600 shadow-xl flex flex-col items-center justify-center p-1"
                  style={{
                    boxShadow: `0 0 20px 4px ${curMoment.glowColor}55`,
                  }}
                >
                  <div className="h-2 w-2 rounded-full bg-amber-300 animate-pulse shadow-md" />
                  <span className="text-[7px] text-amber-200/90 font-mono mt-0.5">Đèn Đá</span>
                </div>

                {/* Subfloor Heating Microclimate Indicator */}
                <div className="absolute top-3 left-3 bg-stone-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-stone-700/60 text-[10px] text-stone-300 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Sưởi sàn ngầm: 26.5°C · 48% RH</span>
                </div>
              </div>

              {/* Sound & Meditation Control Bar */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <div className="text-xs text-stone-300">
                  <strong className="text-stone-100">Âm thanh chuông xoay 528Hz & gió trúc:</strong>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={strikeZenBowl}
                    className="px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-all min-h-[44px]"
                  >
                    Gõ Chuông Xoay 528Hz
                  </button>
                  {isSoundRunning ? (
                    <button
                      type="button"
                      onClick={stopZenSound}
                      className="px-4 py-2 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium transition-all min-h-[44px] shadow"
                    >
                      Dừng gió trúc
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startZenSound}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-all min-h-[44px] shadow"
                    >
                      Khởi động âm thanh thiền
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 4 Sand Pattern Selection Buttons */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                4 Dáng Vân Cào Cát Thiền Định Karesansui
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(SAND_PATTERNS) as SandPattern[]).map((pKey) => {
                  const pat = SAND_PATTERNS[pKey]
                  const isCur = selectedPattern === pKey
                  return (
                    <button
                      key={pKey}
                      type="button"
                      onClick={() => setSelectedPattern(pKey)}
                      className={cn(
                        'text-left p-3.5 rounded-xl border text-xs transition-all min-h-[44px] flex flex-col justify-between',
                        isCur
                          ? 'border-amber-500/70 bg-amber-500/10 text-stone-100 shadow-md'
                          : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <div>
                        <div className="font-serif font-medium text-stone-200">{pat.name}</div>
                        <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">{pat.subname}</div>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-2 font-light leading-relaxed">{pat.symbolism}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Moments & Subfloor Engineering & Booking (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 3 Meditation Moments */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                3 Thời Khắc Ánh Sáng Thiền Định Trong Ngày
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(MEDITATION_MOMENTS) as MeditationMoment[]).map((mKey) => {
                  const mom = MEDITATION_MOMENTS[mKey]
                  const isCur = selectedMoment === mKey
                  return (
                    <button
                      key={mKey}
                      type="button"
                      onClick={() => setSelectedMoment(mKey)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border text-xs transition-all min-h-[44px] flex items-center justify-between',
                        isCur
                          ? 'border-amber-500/70 bg-stone-900 text-stone-100 shadow-md'
                          : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:bg-stone-900/50'
                      )}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: mom.glowColor }}
                          />
                          <strong className="font-medium text-stone-200">{mom.name}</strong>
                          <span className="text-[10px] font-mono text-amber-400/90">{mom.kelvin}K</span>
                        </div>
                        <p className="text-[11px] text-stone-400 font-light">{mom.subname}</p>
                      </div>
                      <span className="text-stone-500 text-sm ml-2">→</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Subfloor Climate Engineering Specifications */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Vật Liệu Tự Nhiên & Công Nghệ Sưởi Sàn Chống Nồm
              </span>

              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Bazan Đắk Nông triệu năm:</strong> Tuyển chọn 7 khối đá núi lửa có dáng đứng tự nhiên, phủ rêu nhung bán khô giữ trọn sắc xám đen nguyên thủy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Cát thạch anh Quảng Bình:</strong> Độ mịn 0.6mm - 1.2mm, rửa sạch bụi đất 8 lần, chống bám dính khi cào và phản chiếu ánh sáng tản đều.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Cáp sưởi ngầm Teflon chống ẩm:</strong> Tự động kích hoạt khi cảm biến phát hiện độ ẩm môi trường &gt; 65% RH, giữ cát luôn khô thoáng không nấm mốc.
                  </span>
                </li>
              </ul>
            </div>

            {/* Custom Sizing & Consultation Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  Tư Vấn Thiết Kế Vườn Thiền Karesansui Tư Gia
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Khảo sát mặt bằng giếng trời, sảnh đệm hoặc ban công penthouse để kiến tạo không gian thiền định đo ni đóng giày.
                </p>
              </div>

              {orderSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã tiếp nhận yêu cầu khảo sát vườn thiền Karesansui. KTS Cảnh quan & Thiền học sẽ liên hệ Quý khách trong vòng 4 giờ.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label htmlFor={`${formId}-client-name`} className="block text-[11px] text-stone-400 mb-1">
                        Họ tên gia chủ
                      </label>
                      <input
                        id={`${formId}-client-name`}
                        type="text"
                        required
                        placeholder="Lê Trọng Nghĩa"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-client-phone`} className="block text-[11px] text-stone-400 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        id={`${formId}-client-phone`}
                        type="tel"
                        required
                        placeholder="0918 xxx xxx"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-garden-area`} className="block text-[11px] text-stone-400 mb-1">
                      Diện tích & Vị trí dự kiến
                    </label>
                    <select
                      id={`${formId}-garden-area`}
                      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 focus:border-amber-400 focus:outline-none min-h-[44px]"
                    >
                      <option value="atrium-small">Giếng trời trung tâm biệt thự (12m² - 20m²)</option>
                      <option value="living-center">Tâm điểm đại sảnh đón khách (20m² - 35m²)</option>
                      <option value="penthouse-balcony">Ban công vườn khô Penthouse Thủ Thiêm (35m² - 60m²)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Gửi Yêu Cầu Thiết Kế Vườn Thiền Karesansui</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
