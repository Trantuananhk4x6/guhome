'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type OnyxWaterFlowSpeed = 'giot-suong' | 'man-to-lua' | 'suoi-nguon'

interface FlowModeConfig {
  id: OnyxWaterFlowSpeed
  title: string
  subtitle: string
  flowRateLpm: number // Liters per minute
  acousticDba: number
  filterCutoff: number
  gainLevel: number
  pm25ReductionPct: number
  coolingDegC: number
  humidityBoostPct: number
  description: string
}

const FLOW_MODES: Record<OnyxWaterFlowSpeed, FlowModeConfig> = {
  'giot-suong': {
    id: 'giot-suong',
    title: 'Giọt Sương Chảy Chậm',
    subtitle: 'Drizzle Veil · Tĩnh Lặng Trầm Mặc',
    flowRateLpm: 3.5,
    acousticDba: 14.2,
    filterCutoff: 450,
    gainLevel: 0.12,
    pm25ReductionPct: 65,
    coolingDegC: 2.2,
    humidityBoostPct: 8,
    description: 'Từng giọt nước nhỏ lăn chậm rãi trên vân đá ngọc Onyx, tạo nên nhịp điệu tĩnh lặng thiền định.',
  },
  'man-to-lua': {
    id: 'man-to-lua',
    title: 'Màn Nước Tơ Lụa',
    subtitle: 'Silk Cascade · Cân Bằng Chuẩn Mực',
    flowRateLpm: 8.0,
    acousticDba: 16.8,
    filterCutoff: 750,
    gainLevel: 0.22,
    pm25ReductionPct: 88,
    coolingDegC: 3.5,
    humidityBoostPct: 14,
    description: 'Màng nước mỏng phủ đều 100% diện tích mặt đá ngọc, ánh sáng LED 2700K hắt xuyên tạo hiệu ứng lấp lánh như dát vàng lỏng.',
  },
  'suoi-nguon': {
    id: 'suoi-nguon',
    title: 'Suối Nguồn Sôi Động',
    subtitle: 'Vibrant Spring · Tái Tạo Sinh Khí',
    flowRateLpm: 15.0,
    acousticDba: 17.9,
    filterCutoff: 1100,
    gainLevel: 0.32,
    pm25ReductionPct: 92,
    coolingDegC: 4.2,
    humidityBoostPct: 20,
    description: 'Dòng chảy cuộn trào tuần hoàn qua bể ngọc, phát tán ion âm thanh lọc bụi mịn tối đa cho đại sảnh biệt thự.',
  },
}

export function SaigonTranslucentOnyxWaterfallSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedFlow, setSelectedFlow] = useState<OnyxWaterFlowSpeed>('man-to-lua')
  const [brightnessPct, setBrightnessPct] = useState(85)
  const [cctKelvin, setCctKelvin] = useState(2700)
  const [isAudioRunning, setIsAudioRunning] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const waterNoiseSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const waterGainRef = useRef<GainNode | null>(null)
  const waterFilterRef = useRef<BiquadFilterNode | null>(null)

  useEffect(() => {
    return () => {
      stopWaterSound()
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

  function startWaterSound(mode: OnyxWaterFlowSpeed = selectedFlow) {
    const ctx = getAudioContext()
    if (!ctx) return
    stopWaterSound()

    const now = ctx.currentTime
    const duration = 5.0
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Pink noise base for organic flowing water over stone
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06
      b6 = white * 0.115926
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(FLOW_MODES[mode].filterCutoff, now)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.gain.exponentialRampToValueAtTime(FLOW_MODES[mode].gainLevel, now + 0.6)

    source.connect(filter)
    filter.connect(masterGain)
    masterGain.connect(ctx.destination)

    source.start(now)
    waterNoiseSourceRef.current = source
    waterGainRef.current = masterGain
    waterFilterRef.current = filter
    setIsAudioRunning(true)
  }

  function stopWaterSound() {
    if (waterGainRef.current && audioCtxRef.current) {
      try {
        const now = audioCtxRef.current.currentTime
        waterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)
      } catch {
        // Safe ignore
      }
    }
    setTimeout(() => {
      if (waterNoiseSourceRef.current) {
        try {
          waterNoiseSourceRef.current.stop()
          waterNoiseSourceRef.current.disconnect()
        } catch {
          // Safe ignore
        }
        waterNoiseSourceRef.current = null
      }
      setIsAudioRunning(false)
    }, 350)
  }

  function handleFlowChange(mode: OnyxWaterFlowSpeed) {
    setSelectedFlow(mode)
    if (isAudioRunning && waterFilterRef.current && waterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime
      waterFilterRef.current.frequency.setTargetAtTime(FLOW_MODES[mode].filterCutoff, now, 0.2)
      waterGainRef.current.gain.setTargetAtTime(FLOW_MODES[mode].gainLevel, now, 0.2)
    }
  }

  const curConfig = FLOW_MODES[selectedFlow]

  // Calculate RGB tint based on CCT (2200K warm candle to 3500K bright onyx amber)
  const cctProgress = (cctKelvin - 2200) / (3500 - 2200)
  const glowR = Math.round(255)
  const glowG = Math.round(180 + cctProgress * 35)
  const glowB = Math.round(70 + cctProgress * 80)
  const glowAlpha = (brightnessPct / 100) * 0.85

  return (
    <section
      aria-labelledby="onyx-waterfall-sanctuary-heading"
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 md:p-12 text-stone-200 shadow-2xl',
        className
      )}
    >
      {/* Background Ambience Ambient Lighting */}
      <div
        className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full opacity-30 blur-3xl transition-all duration-500"
        style={{
          backgroundColor: `rgba(${glowR}, ${glowG}, ${glowB}, ${glowAlpha * 0.4})`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            <span>Natural Iranian Onyx · LED Backlit Matrix CRI 98 · Ultra Quiet &lt; 18 dBA</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                id="onyx-waterfall-sanctuary-heading"
                className="text-2xl md:text-4xl font-serif font-light tracking-tight text-stone-100"
              >
                Vách Thác Nước Đá Ngọc Onyx Vàng Mật Ong Xuyên Sáng
              </h2>
              <p className="mt-2 text-sm md:text-base text-stone-400 max-w-2xl font-light leading-relaxed">
                Kiệt tác phiến đá ngọc Onyx tự nhiên 2.8m x 1.6m x 30mm nhập khẩu nguyên khối từ Iran. Hệ thống LED ma trận đồng nhất 2700K CRI 98 hắt xuyên cấu trúc tinh thể ngọc, màng nước mỏng tuần hoàn liên tục hạ nhiệt 3.5°C và thanh lọc 88% bụi mịn cho không gian sống Quiet Luxury tại Sài Gòn.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Kích thước: <strong className="text-amber-400">2.8m × 1.6m × 30mm</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Độ ồn âm học: <strong className="text-amber-400">&lt; 18 dBA</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Xuất xứ: <strong className="text-amber-400">Ngọc Onyx Iran</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Master Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Onyx Slab Simulation with Backlit & Water Veil (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Translucent Onyx Slab Visual Canvas */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/80 p-4 shadow-2xl">
              <div
                className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden border border-stone-700/80 transition-all duration-700 flex flex-col justify-between p-6 shadow-inner"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(${glowR}, ${glowG}, ${glowB}, ${glowAlpha}) 0%, rgba(${Math.round(glowR * 0.5)}, ${Math.round(glowG * 0.4)}, 20, ${glowAlpha * 0.8}) 70%, #15100a 100%)`,
                }}
              >
                {/* Onyx Vein Texture Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(255,255,255,0.08) 26px, rgba(0,0,0,0.15) 50px), radial-gradient(circle at 70% 30%, rgba(255,240,200,0.3) 0%, transparent 60%)`,
                  }}
                />

                {/* Animated Flowing Water Sheen Simulation */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen animate-pulse"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)`,
                    backgroundSize: '100% 200%',
                    animationDuration: selectedFlow === 'giot-suong' ? '6s' : selectedFlow === 'man-to-lua' ? '3s' : '1.5s',
                  }}
                />

                {/* Top Stainless Steel Spillway Nozzle */}
                <div className="relative z-10 flex items-center justify-between border-b border-stone-700/60 pb-2 bg-stone-950/40 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-stone-300">Khe Tràn Inox 316 Laser 0.5mm</span>
                  </div>
                  <span className="font-mono text-amber-300 font-semibold">{curConfig.flowRateLpm} L/phút</span>
                </div>

                {/* Center Translucent Crystal Info */}
                <div className="relative z-10 my-auto text-center space-y-1">
                  <div className="inline-block rounded-full bg-stone-950/60 backdrop-blur-md border border-amber-500/40 px-4 py-1 text-xs text-amber-200 font-serif">
                    Phiến Ngọc Tự Nhiên Khai Thác Đỉnh Núi Khorasan (Iran)
                  </div>
                  <p className="text-[11px] text-stone-300 drop-shadow">
                    Độ xuyên quang 48% · Vân hổ phách uốn lượn phong thủy Thủy sinh Mộc
                  </p>
                </div>

                {/* Bottom Sump with Pebbles and Basin */}
                <div className="relative z-10 flex items-center justify-between border-t border-stone-700/60 pt-2 bg-stone-950/40 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs">
                  <span className="text-stone-300">Bể Thu Âm Sàn Triệt Tiêu Vi Chấn</span>
                  <span className="font-mono text-stone-400">Độ ồn: {curConfig.acousticDba} dBA</span>
                </div>
              </div>

              {/* Soundscape Control Overlay */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <div className="text-xs text-stone-300">
                  <strong className="text-stone-100">Âm thanh nước róc rách:</strong> {curConfig.subtitle}
                </div>
                <div>
                  {isAudioRunning ? (
                    <button
                      type="button"
                      onClick={stopWaterSound}
                      className="px-4 py-2 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium transition-all min-h-[44px] shadow"
                    >
                      Dừng âm thanh nước
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startWaterSound(selectedFlow)}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-all min-h-[44px] shadow flex items-center gap-2"
                    >
                      <span>Lắng nghe tiếng nước chảy &lt; 18 dBA</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 3 Flow Speed Modes Selector */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Chế Độ Dòng Chảy Nước Tuần Hoàn
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(Object.keys(FLOW_MODES) as OnyxWaterFlowSpeed[]).map((mode) => {
                  const m = FLOW_MODES[mode]
                  const isCur = selectedFlow === mode
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleFlowChange(mode)}
                      className={cn(
                        'text-left p-3.5 rounded-xl border text-xs transition-all min-h-[44px] flex flex-col justify-between',
                        isCur
                          ? 'border-amber-500/70 bg-amber-500/10 text-stone-100 shadow-md'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <div>
                        <div className="font-serif font-medium text-stone-200">{m.title}</div>
                        <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">{m.flowRateLpm} L/phút</div>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-2 font-light leading-relaxed">{m.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: LED Lighting Sliders & Microclimate Dashboard (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* LED Matrix Dimming & Color Temp Panel */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                  Điều Khiển Quang Phổ LED Xuyên Sáng
                </span>
                <span className="text-xs font-mono text-amber-400">CRI 98</span>
              </div>

              {/* Brightness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label htmlFor={`${formId}-brightness`} className="text-stone-300">
                    Độ Sáng Quang Thông (Brightness)
                  </label>
                  <span className="font-mono text-amber-300 font-medium">{brightnessPct}%</span>
                </div>
                <input
                  id={`${formId}-brightness`}
                  type="range"
                  min="10"
                  max="100"
                  value={brightnessPct}
                  onChange={(e) => setBrightnessPct(Number(e.target.value))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Color Temperature Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label htmlFor={`${formId}-cct`} className="text-stone-300">
                    Nhiệt Độ Màu (CCT)
                  </label>
                  <span className="font-mono text-amber-300 font-medium">{cctKelvin}K</span>
                </div>
                <input
                  id={`${formId}-cct`}
                  type="range"
                  min="2200"
                  max="3500"
                  step="50"
                  value={cctKelvin}
                  onChange={(e) => setCctKelvin(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>2200K (Nến ấm)</span>
                  <span>2700K (Tiêu chuẩn)</span>
                  <span>3500K (Ngọc sáng)</span>
                </div>
              </div>
            </div>

            {/* Microclimate Measurement Dashboard */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Chỉ Số Vi Khí Hậu & Lọc Không Khí Nhiệt Đới
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-[11px] text-stone-500">Bụi mịn PM2.5</div>
                  <div className="text-base font-serif text-emerald-400 mt-1">Giảm {curConfig.pm25ReductionPct}%</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Từ 48 xuống 6 µg/m³</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-[11px] text-stone-500">Giảm nhiệt đại sảnh</div>
                  <div className="text-base font-serif text-cyan-400 mt-1">-{curConfig.coolingDegC}°C</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Bay hơi làm mát tự nhiên</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-[11px] text-stone-500">Cân bằng độ ẩm</div>
                  <div className="text-base font-serif text-amber-300 mt-1">+{curConfig.humidityBoostPct}% RH</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Ổn định mức 55-60%</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-[11px] text-stone-500">Mật độ Ion âm</div>
                  <div className="text-base font-serif text-teal-300 mt-1">72.000 /cm³</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Kích thích tái tạo tế bào</div>
                </div>
              </div>
            </div>

            {/* Custom Sizing & Consultation Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  May Đo & Báo Giá Vách Đá Ngọc Onyx Xuyên Sáng
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Đội ngũ nghệ nhân GuHomes trực tiếp khảo sát kết cấu tải trọng tường, đường cấp thoát nước âm và thi công lắp ráp trọn gói.
                </p>
              </div>

              {orderSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã tiếp nhận yêu cầu may đo vách đá Onyx. Chuyên gia vật liệu đá tự nhiên sẽ liên hệ tư vấn mẫu vân thực tế trong 4 giờ.
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
                        placeholder="Vũ Minh Tuấn"
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
                        placeholder="0988 xxx xxx"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-stone-origin`} className="block text-[11px] text-stone-400 mb-1">
                      Chủng loại đá & Kích thước dự kiến
                    </label>
                    <select
                      id={`${formId}-stone-origin`}
                      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 focus:border-amber-400 focus:outline-none min-h-[44px]"
                    >
                      <option value="iran-honey">Đá Ngọc Onyx Vàng Mật Ong Iran (2.8m × 1.6m)</option>
                      <option value="italy-emerald">Đá Ngọc Onyx Xanh Lục Bảo Ý (3.0m × 1.8m)</option>
                      <option value="pakistan-white">Đá Ngọc Bạch Ngọc Onyx Tuyết Pakistan (2.4m × 1.4m)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Yêu Cầu Bóc Tách Dự Toán & Xem Mẫu Đá Khổ Lớn</span>
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
