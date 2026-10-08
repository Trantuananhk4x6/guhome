'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type WaterfallMode = 'suoi-nguon' | 'man-nuoc' | 'thac-do'

interface WaterfallFlowConfig {
  label: string
  sublabel: string
  flowRateLpm: number
  noiseDba: string
  negativeIonsCm3: string
  description: string
  waterVisualHeight: string
}

const FLOW_CONFIGS: Record<WaterfallMode, WaterfallFlowConfig> = {
  'suoi-nguon': {
    label: 'Suối Nguồn Tinh Khiết',
    sublabel: 'Dòng Chảy Róc Rách Siêu Tĩnh Lặng',
    flowRateLpm: 1.5,
    noiseDba: '< 12 dBA',
    negativeIonsCm3: '42.000 ions/cm³',
    description: 'Nước lọc qua màng thạch anh chảy róc rách nhẹ nhàng như mạch nước ngầm lộ thiên trong rừng sâu, tĩnh tại cho phòng ngủ và góc thiền trà.',
    waterVisualHeight: 'h-1.5 opacity-60',
  },
  'man-nuoc': {
    label: 'Màn Nước Tinh Thể',
    sublabel: 'Màng Nước Mỏng Bao Phủ 6 Mặt Lục Lăng',
    flowRateLpm: 3.8,
    noiseDba: '< 16 dBA',
    negativeIonsCm3: '68.000 ions/cm³',
    description: 'Dòng nước ôm sát các cạnh tinh thể lục lăng tự nhiên tạo thành lớp áo nước óng ánh, kích hoạt khúc xạ ánh sáng 4000K lung linh huyền ảo.',
    waterVisualHeight: 'h-3 opacity-80',
  },
  'thac-do': {
    label: 'Thác Đổ Năng Lượng',
    sublabel: 'Tuần Hoàn Thác Nước Tái Tạo Sinh Khí',
    flowRateLpm: 6.5,
    noiseDba: '< 20 dBA',
    negativeIonsCm3: '85.000 ions/cm³',
    description: 'Dòng chảy tràn mạnh mẽ cuốn theo hàng vạn hạt vi bọt khí, giải phóng mật độ ion âm cực đại giúp thanh lọc bụi mịn PM2.5 trong phòng khách biệt thự.',
    waterVisualHeight: 'h-5 opacity-95',
  },
}

export function ArtisanSaigonMonolithicQuartzCrystalWaterfallVault({ className }: { className?: string }) {
  const formId = useId()
  const [selectedFlow, setSelectedFlow] = useState<WaterfallMode>('man-nuoc')
  const [ledCrystalGlow, setLedCrystalGlow] = useState(true)
  const [isAudioRunning, setIsAudioRunning] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const waterNoiseSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const waterGainRef = useRef<GainNode | null>(null)

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

  // Realistic synthesized waterfall trickle through crystalline rock
  function startWaterSound(mode: WaterfallMode = selectedFlow) {
    const ctx = getAudioContext()
    if (!ctx) return
    stopWaterSound()

    const now = ctx.currentTime
    const duration = 5.0
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Pink noise base for natural flowing water
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

    // Lowpass filter for water depth
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(mode === 'suoi-nguon' ? 650 : mode === 'man-nuoc' ? 950 : 1400, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.01, now)
    gain.gain.linearRampToValueAtTime(mode === 'suoi-nguon' ? 0.15 : mode === 'man-nuoc' ? 0.25 : 0.38, now + 0.6)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start(now)

    waterNoiseSourceRef.current = source
    waterGainRef.current = gain
    setIsAudioRunning(true)
  }

  function stopWaterSound() {
    if (waterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime
      waterGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.3)
      setTimeout(() => {
        if (waterNoiseSourceRef.current) {
          try {
            waterNoiseSourceRef.current.stop()
            waterNoiseSourceRef.current.disconnect()
          } catch (_) {}
          waterNoiseSourceRef.current = null
        }
        waterGainRef.current = null
      }, 320)
    }
    setIsAudioRunning(false)
  }

  const currentFlow = FLOW_CONFIGS[selectedFlow]

  return (
    <section
      aria-label="Thác Nước Tinh Thể Thạch Anh Nguyên Khối GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Crystalline Cyan Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(6,182,212,0.1),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-cyan-300">
                Artisan Waterfall · Tinh Thể Thạch Anh 620kg
              </span>
              <span className="text-xs font-mono text-stone-400">Ion Âm: 85.000 ions/cm³ · Độ tĩnh âm &lt; 16 dBA</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Thác Nước Tinh Thể Thạch Anh
              <span className="block font-sans text-lg font-normal text-cyan-300/80 sm:text-xl mt-1">
                Khối Tinh Thể Đắk Nông 620kg & Màng Nước Lục Lăng Thanh Lọc Khí Hậu
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Khối tinh thể thạch anh trắng tự nhiên nguyên khối 620kg giữ nguyên đỉnh lục lăng sắc nét. 
            Màng nước khoáng tinh khiết chảy tràn phủ kín các mặt đá, giải phóng hàng vạn ion âm thanh lọc bụi mịn và điều hòa vi khí hậu mát lành.
          </p>
        </div>

        {/* Crystalline Ecological Specs Bar */}
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider">Khối lượng đá</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">620 kg</div>
            <p className="mt-1 text-xs text-stone-400">Thạch anh trắng tự nhiên mỏ Đắk Nông</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider">Mật độ Ion âm</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">85.000 /cm³</div>
            <p className="mt-1 text-xs text-stone-400">Tương đương rừng nguyên sinh sau cơn mưa</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider">Bồn thu nước sỏi</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Thạch Anh Hồng</div>
            <p className="mt-1 text-xs text-stone-400">Sỏi suối tự nhiên lọc vi khuẩn và ion hóa</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider">Đèn LED đáy quang phổ</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">4000K CRI 97</div>
            <p className="mt-1 text-xs text-stone-400">Chiếu thấu quang bừng sáng lõi tinh thể</p>
          </div>
        </div>

        {/* Interactive Waterfall Flow Controller & Monolith Crystal Cutaway */}
        <div className="mt-10 rounded-3xl border border-stone-800 bg-stone-950/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800/60">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Điều khiển chế độ dòng chảy &amp; Âm thanh nước reo
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Bơm tuần hoàn biến tần DC siêu êm &lt;16 dBA giấu kín dưới bệ đỡ đá granite tự nhiên.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLedCrystalGlow(!ledCrystalGlow)}
                className={cn(
                  'rounded-xl border px-3 py-2 font-mono text-xs transition min-h-[44px]',
                  ledCrystalGlow
                    ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 font-semibold'
                    : 'border-stone-700 bg-stone-900 text-stone-400 hover:text-stone-200'
                )}
              >
                {ledCrystalGlow ? '💡 Tắt LED quang phổ 4000K' : '💡 Bật LED quang phổ 4000K'}
              </button>

              {!isAudioRunning ? (
                <button
                  onClick={() => startWaterSound(selectedFlow)}
                  className="rounded-xl bg-cyan-600 px-4 py-2 font-mono text-xs font-medium text-stone-950 transition hover:bg-cyan-500 min-h-[44px]"
                >
                  💧 Nghe tiếng nước reo
                </button>
              ) : (
                <button
                  onClick={stopWaterSound}
                  className="rounded-xl border border-red-500/60 bg-red-950/40 px-4 py-2 font-mono text-xs font-medium text-red-300 transition hover:bg-red-900 min-h-[44px]"
                >
                  ⏹ Dừng âm thanh
                </button>
              )}
            </div>
          </div>

          {/* 3 Flow Presets */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(Object.keys(FLOW_CONFIGS) as WaterfallMode[]).map((modeKey) => {
              const cfg = FLOW_CONFIGS[modeKey]
              const isSelected = selectedFlow === modeKey
              return (
                <button
                  key={modeKey}
                  onClick={() => {
                    setSelectedFlow(modeKey)
                    if (isAudioRunning) {
                      startWaterSound(modeKey)
                    }
                  }}
                  className={cn(
                    'flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 min-h-[44px]',
                    isSelected
                      ? 'border-cyan-400 bg-stone-900 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                      : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-800/40'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-medium text-stone-100">{cfg.label}</span>
                    <span className="font-mono text-xs text-cyan-400">{cfg.flowRateLpm} L/phút</span>
                  </div>
                  <span className="mt-1 text-xs font-serif text-cyan-300/80">{cfg.sublabel}</span>
                  <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>Âm ồn: {cfg.noiseDba}</span>
                    <span className="text-cyan-300">{cfg.negativeIonsCm3}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Monolithic Quartz Graphic Display */}
          <div className="mt-8 relative h-72 sm:h-84 rounded-2xl border-2 border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 overflow-hidden flex items-center justify-center p-6">
            {/* LED Glow Underlighting */}
            <AnimatePresence>
              {ledCrystalGlow && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(6,182,212,0.25),transparent_65%)] pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Hexagonal Quartz Obelisk Silhouette */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Pointed Hexagonal Termination Top */}
              <div
                className={cn(
                  'w-0 h-0 border-l-[3.5rem] border-r-[3.5rem] border-b-[4rem] border-l-transparent border-r-transparent transition-all duration-700',
                  ledCrystalGlow
                    ? 'border-b-cyan-200/90 drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]'
                    : 'border-b-stone-600'
                )}
              />

              {/* Crystal Column Shaft */}
              <div
                className={cn(
                  'relative h-44 w-28 border-x-2 border-b-2 transition-all duration-700 flex flex-col items-center justify-between p-2',
                  ledCrystalGlow
                    ? 'border-cyan-400/80 bg-gradient-to-b from-cyan-100/30 via-cyan-400/20 to-cyan-900/40 shadow-inner'
                    : 'border-stone-700 bg-stone-800/60'
                )}
              >
                {/* Thin Water Film Flow Graphic */}
                <motion.div
                  animate={{ y: [0, 150] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="w-full h-1 bg-gradient-to-b from-transparent via-cyan-300 to-transparent opacity-80"
                />

                <span className="font-mono text-[9px] text-cyan-200 uppercase tracking-widest text-center">
                  Thạch Anh 620kg
                </span>

                <span className="font-mono text-[8px] text-stone-400">
                  {currentFlow.flowRateLpm} L/phút
                </span>
              </div>

              {/* Rose Quartz Pebble Basin Base */}
              <div className="h-5 w-48 rounded-full border border-stone-600 bg-rose-950/60 shadow-lg mt-1 flex items-center justify-center">
                <span className="font-mono text-[8px] text-rose-300">Sỏi suối thạch anh hồng</span>
              </div>
            </div>
          </div>

          {/* Description Lore */}
          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900/80 p-5 sm:p-6 backdrop-blur-sm">
            <h3 className="font-serif text-xl text-stone-100">{currentFlow.label}</h3>
            <p className="mt-1 font-mono text-xs text-cyan-400">{currentFlow.sublabel}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light border-t border-stone-800/80 pt-3">
              {currentFlow.description}
            </p>
          </div>
        </div>

        {/* 3 Engineering Pillars */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              01 · Bơm Tuần Hoàn Từ Tính Không Trục
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Độ Tĩnh Âm Chuẩn Dưới 12 dBA</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Động cơ bơm nam châm vĩnh cửu không chổi than, triệt tiêu ma sát cơ học, 
              cho phép tiếng nước róc rách tự nhiên ngân vang mà hoàn toàn không nghe thấy tiếng máy bơm.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              02 · Kháng Nhiệt & Chống Đọng Cặn
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Bề Mặt Silic Mài Bóng 10.000 Grit</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Mặt đá thạch anh được đánh bóng mịn màng như gương, kết hợp hệ lọc làm mềm nước ion canxi, 
              ngăn ngừa triệt để hiện tượng đóng vôi trắng khi bốc hơi dưới thời tiết nắng nóng Sài Gòn.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              03 · Chống Tràn Cảm Ứng Tự Động
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Cảm Biến Quang Học Tự Ngắt</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Hệ thống cấp nước tự động bù bay hơi và phao ngắt điện tử chống tràn đa tầng, 
              đảm bảo an toàn tuyệt đối khi đặt thác nước trong phòng khách lát sàn gỗ tự nhiên.
            </p>
          </div>
        </div>

        {/* Custom Order Box */}
        <div className="mt-14 rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-cyan-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                GuHomes Quartz Atelier
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Tuyển Chọn Khối Tinh Thể Thạch Anh Tự Gia
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Mỗi chóp tinh thể thạch anh tự nhiên là kết tinh địa chất hàng trăm triệu năm. 
                GuHomes trực tiếp khảo sát tải trọng sàn, lắp đặt hệ bơm lọc chìm và căn chỉnh góc chiếu sáng tôn vinh vượng khí cho gia đình.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Đá thạch anh tự nhiên 100% kiểm định</span>
                <span>✓ Lắp đặt trọn gói hệ thống cấp thoát ngầm</span>
                <span>✓ Bảo dưỡng tinh thể định kỳ 12 tháng</span>
              </div>
            </div>

            <div>
              {orderSent ? (
                <div className="rounded-2xl border border-cyan-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu thác thạch anh</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Kỹ sư cảnh quan GuHomes sẽ liên hệ để khảo sát mặt bằng và gửi hình ảnh các khối thạch anh tự nhiên tuyển chọn.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-4 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-md"
                >
                  <div>
                    <label htmlFor={`${formId}-owner`} className="block font-mono text-xs text-stone-300">
                      Họ tên gia chủ *
                    </label>
                    <input
                      id={`${formId}-owner`}
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-phone`} className="block font-mono text-xs text-stone-300">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      id={`${formId}-phone`}
                      required
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-place`} className="block font-mono text-xs text-stone-300">
                      Vị trí đặt thác nước (Đại sảnh / Phòng khách / Sân trong)
                    </label>
                    <input
                      id={`${formId}-place`}
                      type="text"
                      placeholder="VD: Đại sảnh thông tầng biệt thự Thảo Điền"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Yêu cầu tuyển chọn khối thạch anh tự nhiên
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
