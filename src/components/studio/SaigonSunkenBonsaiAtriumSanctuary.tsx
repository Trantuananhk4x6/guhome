'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type AtriumWindMode = 'gentle-breeze' | 'river-draft' | 'monsoon-flow'

interface WindModeConfig {
  id: AtriumWindMode
  name: string
  subtitle: string
  windSpeedMps: number
  tempDropC: number
  humidityPct: number
  soundFrequency: number
  description: string
}

const WIND_MODES: Record<AtriumWindMode, WindModeConfig> = {
  'gentle-breeze': {
    id: 'gentle-breeze',
    name: 'Gió Thoảng Ban Mai',
    subtitle: '0.8 m/s · Vi Khí Hậu Dịu Nhẹ',
    windSpeedMps: 0.8,
    tempDropC: 4.2,
    humidityPct: 62,
    soundFrequency: 380,
    description: 'Làn gió nhẹ nhàng luồn qua 14m giếng trời theo hiệu ứng ống khói tự nhiên, mang theo hơi sương mát lành rọi qua tán lá tùng.',
  },
  'river-draft': {
    id: 'river-draft',
    name: 'Gió Sông Sài Gòn Đối Lưu',
    subtitle: '1.6 m/s · Cân Bằng Chuẩn Mực',
    windSpeedMps: 1.6,
    tempDropC: 5.5,
    humidityPct: 68,
    soundFrequency: 520,
    description: 'Luồng gió đối lưu mát rượi từ sông Sài Gòn hút qua khe thông tầng, hạ nhiệt đại sảnh 5.5°C và đẩy toàn bộ khí nóng lên đỉnh mái kính.',
  },
  'monsoon-flow': {
    id: 'monsoon-flow',
    name: 'Gió Mát Mùa Mưa Nhiệt Đới',
    subtitle: '2.4 m/s · Tươi Mát Thung Lũng',
    windSpeedMps: 2.4,
    tempDropC: 6.2,
    humidityPct: 75,
    soundFrequency: 720,
    description: 'Tốc độ lưu thông tối đa kết hợp màng phun sương nano biến giếng trời thành một vi khí hậu thung lũng ẩm mát tự nhiên.',
  },
}

export function SaigonSunkenBonsaiAtriumSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedWind, setSelectedWind] = useState<AtriumWindMode>('river-draft')
  const [isNanoMistActive, setIsNanoMistActive] = useState(true)
  const [zoomLevel, setZoomLevel] = useState<1 | 4 | 16>(16)
  const [isSoundRunning, setIsSoundRunning] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const windSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const windGainRef = useRef<GainNode | null>(null)
  const windFilterRef = useRef<BiquadFilterNode | null>(null)

  useEffect(() => {
    return () => {
      stopAtriumSound()
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

  // Synthesize gentle breeze rustling through Podocarpus needles & micro water droplets
  function startAtriumSound(mode: AtriumWindMode = selectedWind) {
    const ctx = getAudioContext()
    if (!ctx) return
    stopAtriumSound()

    const now = ctx.currentTime
    const duration = 6.0
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Pink noise base for organic rustling and micro mist hiss
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03
      b6 = white * 0.115926
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(WIND_MODES[mode].soundFrequency, now)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.gain.exponentialRampToValueAtTime(0.18, now + 0.8)

    source.connect(filter)
    filter.connect(masterGain)
    masterGain.connect(ctx.destination)

    source.start(now)
    windSourceRef.current = source
    windGainRef.current = masterGain
    windFilterRef.current = filter
    setIsSoundRunning(true)
  }

  function stopAtriumSound() {
    if (windGainRef.current && audioCtxRef.current) {
      try {
        const now = audioCtxRef.current.currentTime
        windGainRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)
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
    }, 350)
  }

  function handleWindChange(mode: AtriumWindMode) {
    setSelectedWind(mode)
    if (isSoundRunning && windFilterRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime
      windFilterRef.current.frequency.setTargetAtTime(WIND_MODES[mode].soundFrequency, now, 0.2)
    }
  }

  const curWind = WIND_MODES[selectedWind]

  return (
    <section
      aria-labelledby="bonsai-atrium-sanctuary-heading"
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 md:p-12 text-stone-200 shadow-2xl',
        className
      )}
    >
      {/* Background Ambience Green & Blue Radial Gradient */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-emerald-950/40 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-cyan-950/30 opacity-40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-emerald-300 uppercase">
            <span>14m Stack-Effect Atrium · 150-Year Podocarpus Bonsai · Nano Mist Cooling</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                id="bonsai-atrium-sanctuary-heading"
                className="text-2xl md:text-4xl font-serif font-light tracking-tight text-stone-100"
              >
                Sân Trong Giếng Trời Thông Tầng 14m & Cây Tùng La Hán Cổ Thụ
              </h2>
              <p className="mt-2 text-sm md:text-base text-stone-400 max-w-2xl font-light leading-relaxed">
                Cây di sản trầm tích giữa tâm biệt thự. Cây tùng La Hán 150 năm tuổi thế &ldquo;Trực Quân Tử&rdquo; tọa ngự trên bệ đá trầm tích tự nhiên giữa giếng trời 14m đón gió sông Sài Gòn. Màng phun sương nano hạ nhiệt 5.5°C tạo vi khí hậu thung lũng nguyên sơ tĩnh lặng &lt; 18 dBA.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Cổ mộc: <strong className="text-emerald-400">Tùng La Hán 150 Năm</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Hạ nhiệt: <strong className="text-cyan-400">-{curWind.tempDropC}°C Tự Nhiên</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Chiều cao: <strong className="text-amber-400">14m Thông Tầng</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Master Interactive Canvas & Wind Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 14m Atrium Vertical Tower Canvas & Microscopic Bonsai View (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Atrium Section Simulation */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/80 p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800/80 text-xs">
                <span className="font-mono text-emerald-300 uppercase tracking-wider">
                  Mặt Cắt Giếng Trời 14m: {curWind.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400">Kính soi tùng:</span>
                  <div className="inline-flex rounded-lg border border-stone-700 bg-stone-950 p-0.5">
                    {([1, 4, 16] as const).map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => setZoomLevel(z)}
                        className={cn(
                          'px-2.5 py-1 text-[11px] rounded-md transition-all min-h-[36px] min-w-[36px] font-mono',
                          zoomLevel === z
                            ? 'bg-emerald-600 text-stone-950 font-bold'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {z}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 14m Vertical Tower Canvas */}
              <div className="relative mt-4 h-80 sm:h-96 w-full rounded-xl overflow-hidden border border-stone-700/80 bg-gradient-to-b from-[#142328] via-[#10191c] to-[#0c1214] flex flex-col justify-between p-5 shadow-inner">
                {/* Top Skylight Exhaust (Thoát nhiệt hiệu ứng ống khói) */}
                <div className="relative z-10 flex items-center justify-between border-b border-cyan-800/40 pb-2 bg-stone-950/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-stone-300">Đỉnh Mái Kính Thoát Khí Nóng (14m)</span>
                  </div>
                  <span className="font-mono text-cyan-300 font-semibold">{curWind.windSpeedMps} m/s</span>
                </div>

                {/* Animated Updraft Airflow Arrows Simulation */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 30px, rgba(34, 211, 238, 0.4) 31px, transparent 32px)`,
                    animation: 'pulse 2s infinite ease-in-out',
                  }}
                />

                {/* Center Podocarpus Bonsai Tree Showcase */}
                <div
                  className="relative z-10 my-auto flex flex-col items-center justify-center transition-all duration-500"
                  style={{
                    transform: `scale(${zoomLevel === 1 ? 1 : zoomLevel === 4 ? 1.15 : 1.3})`,
                  }}
                >
                  {/* Bonsai Canopy Visual */}
                  <div className="relative flex items-center justify-center">
                    {/* Foliage Clouds */}
                    <div className="h-24 w-44 rounded-full bg-emerald-800/80 border border-emerald-500/50 shadow-2xl flex items-center justify-center text-center p-2">
                      <span className="text-[10px] font-serif text-emerald-100 drop-shadow">
                        Tùng La Hán 150 Năm Tuổi · Trực Quân Tử
                      </span>
                    </div>
                    {/* Nano Mist Spray Cloud */}
                    {isNanoMistActive && (
                      <div className="pointer-events-none absolute -inset-6 rounded-full bg-cyan-400/10 blur-xl animate-pulse" />
                    )}
                  </div>

                  {/* Weathered Tree Trunk */}
                  <div className="h-16 w-5 bg-gradient-to-b from-[#3a271d] via-[#241710] to-[#1a110b] rounded border-r border-[#4d3427] shadow" />

                  {/* Sedimentary Natural Rock Base (Bệ đá trầm tích) */}
                  <div className="h-8 w-52 rounded-xl bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 border border-stone-600 shadow-2xl flex items-center justify-between px-3 text-[9px] font-mono text-stone-300">
                    <span>Bệ Đá Trầm Tích Tự Nhiên</span>
                    <span className="text-emerald-400">Rêu Nhung</span>
                  </div>
                </div>

                {/* Bottom Intake Vent & Water Collection */}
                <div className="relative z-10 flex items-center justify-between border-t border-emerald-800/40 pt-2 bg-stone-950/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs">
                  <span className="text-stone-300">Cửa Đón Gió Sông Tầng Trệt</span>
                  <span className="font-mono text-emerald-300">Nhiệt độ đáy: 28.5°C (-{curWind.tempDropC}°C)</span>
                </div>
              </div>

              {/* Soundscape & Mist Control Bar */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNanoMistActive(!isNanoMistActive)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[44px] flex items-center gap-2',
                      isNanoMistActive
                        ? 'bg-cyan-600 text-stone-950 font-semibold'
                        : 'bg-stone-800 text-stone-400 border border-stone-700'
                    )}
                  >
                    <span className={cn('h-2 w-2 rounded-full', isNanoMistActive ? 'bg-black' : 'bg-stone-500')} />
                    {isNanoMistActive ? 'Đang Phun Sương Nano' : 'Bật Phun Sương'}
                  </button>
                  <span className="text-xs text-stone-300">Độ ồn âm học: &lt; 18 dBA</span>
                </div>

                <div>
                  {isSoundRunning ? (
                    <button
                      type="button"
                      onClick={stopAtriumSound}
                      className="px-4 py-2 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium transition-all min-h-[44px] shadow"
                    >
                      Dừng tiếng gió reo
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startAtriumSound(selectedWind)}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-semibold transition-all min-h-[44px] shadow"
                    >
                      Lắng nghe tiếng gió tán tùng
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 3 Wind Modes Selector */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Chế Độ Luồng Gió Đối Lưu Giếng Trời (Stack Effect)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(Object.keys(WIND_MODES) as AtriumWindMode[]).map((mode) => {
                  const m = WIND_MODES[mode]
                  const isCur = selectedWind === mode
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleWindChange(mode)}
                      className={cn(
                        'text-left p-3.5 rounded-xl border text-xs transition-all min-h-[44px] flex flex-col justify-between',
                        isCur
                          ? 'border-emerald-500/70 bg-emerald-500/10 text-stone-100 shadow-md'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <div>
                        <div className="font-serif font-medium text-stone-200">{m.name}</div>
                        <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">{m.subtitle}</div>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-2 font-light leading-relaxed">{m.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Microclimate Dashboard & Botanical Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Microclimate Measurement Dashboard */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Chỉ Số Vi Khí Hậu Giếng Trời 14m Sài Gòn
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-[11px] text-stone-500">Hạ nhiệt tự nhiên</div>
                  <div className="text-base font-serif text-cyan-400 mt-1">-{curWind.tempDropC}°C</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Từ 34°C xuống {34 - curWind.tempDropC}°C</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-[11px] text-stone-500">Vận tốc luồng gió</div>
                  <div className="text-base font-serif text-emerald-400 mt-1">{curWind.windSpeedMps} m/s</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Ống khói đối lưu không quạt</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-[11px] text-stone-500">Độ ẩm cân bằng</div>
                  <div className="text-base font-serif text-amber-300 mt-1">{curWind.humidityPct}% RH</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Phun sương hạt mịn 5 micron</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-[11px] text-stone-500">Độ ồn âm học</div>
                  <div className="text-base font-serif text-teal-300 mt-1">&lt; 18 dBA</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Êm hơn tiếng thì thầm</div>
                </div>
              </div>
            </div>

            {/* Botanical Care & Irrigation Engineering */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Kỹ Nghệ Dưỡng Cây Cổ Thụ & Đá Tự Nhiên
              </span>

              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Cây Tùng La Hán 150 năm thế Trực Quân Tử:</strong> Dáng vươn thẳng hiên ngang, tán lá xếp tầng như mây tầng đón nắng mái kính cường lực Low-E chống tia UV.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Bệ đá trầm tích tự nhiên 4.5 tấn:</strong> Đục đẽo nguyên khối giữ lại hốc rêu tự nhiên, triệt tiêu tải trọng truyền rung vào dầm móng biệt thự.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Tưới nhỏ giọt thẩm thấu ngược:</strong> Cảm biến độ ẩm đất tự động điều tiết vi lượng nước tưới rễ, chống úng ngập và duy trì tuổi thọ cây hàng trăm năm.
                  </span>
                </li>
              </ul>
            </div>

            {/* Consultation Booking Form */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-emerald-200">
                  Tư Vấn Thiết Kế Giếng Trời Thông Tầng & Cây Cổ Thụ
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Đội ngũ KTS Kết cấu và Nghệ nhân Sinh cảnh GuHomes trực tiếp đo đạc luồng gió và tải trọng móng tư gia.
                </p>
              </div>

              {orderSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã tiếp nhận yêu cầu khảo sát giếng trời. KTS Sinh cảnh sẽ liên hệ trong vòng 4 giờ.
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
                        placeholder="Nguyễn Thành Vinh"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-emerald-400 focus:outline-none min-h-[44px]"
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
                        placeholder="0917 xxx xxx"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-emerald-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-atrium-height`} className="block text-[11px] text-stone-400 mb-1">
                      Chiều cao thông tầng & Thế đất
                    </label>
                    <select
                      id={`${formId}-atrium-height`}
                      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 focus:border-emerald-400 focus:outline-none min-h-[44px]"
                    >
                      <option value="14m-villa">Giếng trời thông 4 tầng (12m - 15m) Biệt thự</option>
                      <option value="9m-townhouse">Giếng trời nhà phố 3 tầng (8m - 10m)</option>
                      <option value="penthouse-skylight">Mái kính thông tầng Penthouse Thủ Thiêm</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Yêu Cầu Khảo Sát Khí Động Học & Cây Di Sản</span>
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
