'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type PlungeTempMode = '8c' | '11c' | '14c'

interface TempConfig {
  tempC: number
  tempF: number
  label: string
  sublabel: string
  benefits: string
  recommendedDuration: string
  colorAccent: string
}

const PLUNGE_TEMP_MODES: Record<PlungeTempMode, TempConfig> = {
  '8c': {
    tempC: 8,
    tempF: 46.4,
    label: 'Thử Thách Băng Giá',
    sublabel: 'Kích Hoạt Tế Bào Mỡ Nâu (Brown Adipose Tissue)',
    benefits: 'Phóng thích hormone Noradrenaline tăng 530%, tăng cường hệ miễn dịch và tôi luyện ý chí kiên định.',
    recommendedDuration: '1 - 2 phút',
    colorAccent: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20',
  },
  '11c': {
    tempC: 11,
    tempF: 51.8,
    label: 'Tối Ưu Phục Hồi',
    sublabel: 'Chuẩn Liệu Pháp Wim Hof & Thể Thao Đỉnh Cao',
    benefits: 'Co thắt mạch máu sâu, tống khứ axit lactic, xẹp viêm khớp tức thì và đưa nhịp tim về trạng thái an lạc.',
    recommendedDuration: '2 - 3 phút',
    colorAccent: 'text-teal-400 border-teal-500/40 bg-teal-950/20',
  },
  '14c': {
    tempC: 14,
    tempF: 57.2,
    label: 'Thư Giãn Nhiệt Đới',
    sublabel: 'Thích Ứng Khí Hậu Sài Gòn Nắng Nóng 36°C',
    benefits: 'Hạ nhiệt cơ thể dịu êm, cân bằng hệ thần kinh đối giao cảm, mang lại giấc ngủ sâu không mộng mị.',
    recommendedDuration: '3 - 5 phút',
    colorAccent: 'text-amber-400 border-amber-500/40 bg-amber-950/20',
  },
}

export function ArtisanSaigonMonolithicBasaltOutdoorPlungePool({ className }: { className?: string }) {
  const formId = useId()
  const [selectedTemp, setSelectedTemp] = useState<PlungeTempMode>('11c')
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(120) // default 2 minutes
  const [targetDuration, setTargetDuration] = useState(120)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)
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

  // Chime sound when plunge session starts/finishes or breathing cycle ticks
  function playSingingBowlChime(freq = 528) {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    gain.gain.setValueAtTime(0.25, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 3.2)
  }

  function startTimer(duration = targetDuration) {
    playSingingBowlChime(432)
    setTimerSeconds(duration)
    setIsTimerRunning(true)

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)

    // Breathing guide cycle: 4s inhale, 2s hold, 4s exhale = 10s cycle
    let breathTime = 0
    breathIntervalRef.current = setInterval(() => {
      breathTime = (breathTime + 1) % 10
      if (breathTime < 4) {
        setBreathPhase('inhale')
      } else if (breathTime < 6) {
        setBreathPhase('hold')
      } else {
        setBreathPhase('exhale')
      }
    }, 1000)

    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current as NodeJS.Timeout)
          clearInterval(breathIntervalRef.current as NodeJS.Timeout)
          setIsTimerRunning(false)
          playSingingBowlChime(528)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function stopTimer() {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)
    setIsTimerRunning(false)
  }

  const currentConfig = PLUNGE_TEMP_MODES[selectedTemp]
  const minutes = Math.floor(timerSeconds / 60)
  const seconds = timerSeconds % 60

  return (
    <section
      aria-label="Bể Ngâm Lạnh Trụ Đá Bazan Nguyên Khối GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Background ambient water glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.12),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-teal-300">
                Outdoor Wellness · Cột Đá Bazan Gia Lai
              </span>
              <span className="text-xs font-mono text-stone-400">1.200kg Nguyên Khối · Làm Lạnh Inverter 8°C</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Bể Ngâm Lạnh Bazan Núi Lửa
              <span className="block font-sans text-lg font-normal text-teal-300/80 sm:text-xl mt-1">
                Trầm Mình Vào Lòng Đá Triệu Năm & Thủy Liệu Pháp Wim Hof
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Khoét rỗng từ một cột đá bazan lục lăng nguyên khối 1.200kg tại Gia Lai. Lòng bể mài nhẵn mịn bóng mờ êm ái như lụa, 
            vỏ ngoài giữ nguyên phong hóa rêu phong cổ thụ cùng vòi xả tre hun khói tự nhiên hòa quyện sân vườn nhiệt đới.
          </p>
        </div>

        {/* Geological Craftsmanship Highlights */}
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-teal-400 uppercase tracking-wider">Khối lượng đá</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">1.200 kg</div>
            <p className="mt-1 text-xs text-stone-400">Trụ lục lăng bazan tự nhiên Gia Lai</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-teal-400 uppercase tracking-wider">Làm lạnh Inverter</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">8°C - 14°C</div>
            <p className="mt-1 text-xs text-stone-400">Block máy nén biến tần êm ái &lt;38dB</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-teal-400 uppercase tracking-wider">Khử khuẩn nước</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Ozone & UV-C</div>
            <p className="mt-1 text-xs text-stone-400">Tinh khiết 99.9% không hóa chất clo</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-teal-400 uppercase tracking-wider">Vòi cấp nước</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Ống Tre Hun Khói</div>
            <p className="mt-1 text-xs text-stone-400">Lòng ống tráng đồng thau, xả tràn róc rách</p>
          </div>
        </div>

        {/* Main Interactive Stage: Temperature Control & Wim Hof Timer */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left Column: Temperature Modes & Visual Model (7 cols) */}
          <div className="rounded-3xl border border-stone-800 bg-stone-900/80 p-6 sm:p-8 backdrop-blur-xl lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-teal-400">
                  Chọn cấp độ nhiệt ngâm lạnh
                </span>
                <span className="font-mono text-xs text-stone-400">
                  Nhiệt độ hiện tại: <strong className="text-cyan-300 font-semibold">{currentConfig.tempC}°C</strong>
                </span>
              </div>

              {/* Mode Selector Buttons */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {(Object.keys(PLUNGE_TEMP_MODES) as PlungeTempMode[]).map((modeKey) => {
                  const cfg = PLUNGE_TEMP_MODES[modeKey]
                  const active = selectedTemp === modeKey
                  return (
                    <button
                      key={modeKey}
                      onClick={() => {
                        setSelectedTemp(modeKey)
                        playSingingBowlChime(cfg.tempC * 40)
                      }}
                      className={cn(
                        'flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 min-h-[44px]',
                        active
                          ? 'border-cyan-400 bg-stone-800 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                          : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-800/40'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-medium text-stone-100">{cfg.tempC}°C</span>
                        <span className="font-mono text-[10px] text-stone-400">{cfg.tempF}°F</span>
                      </div>
                      <span className="mt-2 font-serif text-xs font-medium text-cyan-300">{cfg.label}</span>
                      <span className="mt-1 text-[11px] text-stone-400 font-mono">{cfg.recommendedDuration}</span>
                    </button>
                  )
                })}
              </div>

              {/* Selected Mode Detailed Medical & Wellness Benefits */}
              <div className="mt-6 rounded-2xl border border-stone-800/80 bg-stone-950/70 p-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-serif text-sm font-medium text-stone-200">{currentConfig.sublabel}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone-300 font-light">
                  {currentConfig.benefits}
                </p>
              </div>
            </div>

            {/* Visual Basalt Monolith Cutaway Representation */}
            <div className="mt-8 rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />

              <div className="relative mx-auto max-w-sm">
                {/* Bamboo Water Spout */}
                <div className="flex justify-center items-center gap-2 mb-2">
                  <span className="h-1.5 w-16 rounded-full bg-amber-800" />
                  <span className="h-6 w-0.5 bg-cyan-400/80 animate-pulse" />
                </div>

                {/* Hexagonal Basalt Column Graphic */}
                <div className="relative mx-auto h-44 w-44 rounded-[2rem] border-2 border-stone-700 bg-stone-800/90 shadow-2xl p-3 flex flex-col items-center justify-center">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-[10px] font-mono text-teal-300">
                    Lòng bể 650mm x 1100mm
                  </div>

                  {/* Water Body with ripple */}
                  <div className="relative h-28 w-28 rounded-full border border-cyan-500/50 bg-gradient-to-b from-cyan-950/60 to-cyan-900/40 flex flex-col items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-cyan-400/10 rounded-full"
                    />
                    <span className="font-mono text-xl font-bold text-cyan-200">{currentConfig.tempC}°C</span>
                    <span className="font-mono text-[9px] text-cyan-400/80">O3: 0.04 ppm</span>
                  </div>

                  <span className="mt-2 text-[10px] font-mono text-stone-400">Vỏ rêu bazan phong hóa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Wim Hof Breathing & Immersion Timer (5 cols) */}
          <div className="rounded-3xl border border-stone-800 bg-stone-900/80 p-6 sm:p-8 backdrop-blur-xl lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-teal-400">
                  Liệu pháp thở & Đồng hồ ngâm
                </span>
                <span className="font-mono text-xs text-stone-400">Wim Hof Method</span>
              </div>

              {/* Target Duration Preset Selector */}
              <div className="mt-5 flex gap-2">
                {[60, 120, 180, 300].map((dur) => (
                  <button
                    key={dur}
                    disabled={isTimerRunning}
                    onClick={() => {
                      setTargetDuration(dur)
                      setTimerSeconds(dur)
                    }}
                    className={cn(
                      'flex-1 rounded-xl border py-2 text-center font-mono text-xs transition min-h-[44px]',
                      targetDuration === dur
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                        : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                    )}
                  >
                    {dur / 60}p
                  </button>
                ))}
              </div>

              {/* Central Countdown Timer & Breathing Guidance Circle */}
              <div className="mt-8 flex flex-col items-center justify-center">
                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-2 border-stone-800 bg-stone-950/90 shadow-2xl">
                  {/* Outer Breathing Pulsing Ring */}
                  {isTimerRunning && (
                    <motion.div
                      animate={{
                        scale: breathPhase === 'inhale' ? 1.15 : breathPhase === 'hold' ? 1.15 : 1.0,
                        borderColor:
                          breathPhase === 'inhale'
                            ? 'rgba(45, 212, 191, 0.6)'
                            : breathPhase === 'hold'
                            ? 'rgba(251, 191, 36, 0.6)'
                            : 'rgba(56, 189, 248, 0.6)',
                      }}
                      transition={{ duration: breathPhase === 'hold' ? 0.2 : 4, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full border-2 pointer-events-none"
                    />
                  )}

                  <div className="flex flex-col items-center text-center">
                    <span className="font-mono text-4xl font-light text-stone-100 sm:text-5xl">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>

                    {isTimerRunning ? (
                      <span className="mt-2 rounded-full border border-teal-500/40 bg-teal-950/60 px-3 py-0.5 text-xs font-mono font-medium text-teal-300 uppercase tracking-widest">
                        {breathPhase === 'inhale' && 'Hít sâu qua mũi'}
                        {breathPhase === 'hold' && 'Giữ hơi tĩnh lặng'}
                        {breathPhase === 'exhale' && 'Thở chậm qua miệng'}
                      </span>
                    ) : (
                      <span className="mt-2 text-xs font-mono text-stone-400">Sẵn sàng trầm mình</span>
                    )}
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="mt-6 flex w-full gap-3">
                  {!isTimerRunning ? (
                    <button
                      onClick={() => startTimer()}
                      className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition hover:brightness-110 active:scale-[0.99]"
                    >
                      Bắt đầu ngâm lạnh
                    </button>
                  ) : (
                    <button
                      onClick={stopTimer}
                      className="w-full min-h-[44px] rounded-xl border border-red-500/50 bg-red-950/30 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-red-300 transition hover:bg-red-900/40 active:scale-[0.99]"
                    >
                      Kết thúc liệu trình
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quality Water Parameters Telemetry */}
            <div className="mt-6 border-t border-stone-800/80 pt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-2">
                <span className="text-[10px] font-mono text-stone-400 block">Ozone O3</span>
                <strong className="text-xs font-mono text-teal-300">0.04 ppm</strong>
              </div>
              <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-2">
                <span className="text-[10px] font-mono text-stone-400 block">UV-C 254nm</span>
                <strong className="text-xs font-mono text-teal-300">100% Khử khuẩn</strong>
              </div>
              <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-2">
                <span className="text-[10px] font-mono text-stone-400 block">Độ trong TDS</span>
                <strong className="text-xs font-mono text-teal-300">&lt; 35 ppm</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Structural & Microclimate Engineering Specifications */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400">
              01 · Kết Cấu Chịu Tải Sân Vườn
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Dầm Đỡ Phân Bổ Tải Trọng 2.0 Tấn</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Tổng khối lượng 1.200kg đá bazan cộng 600 lít nước được nâng đỡ bởi hệ dầm thép không gỉ 304 chìm dưới nền cỏ, 
              triệt tiêu hiện tượng sụt lún sân thượng và ban công biệt thự ven sông Sài Gòn.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400">
              02 · Kháng Nhiệt Bức Xạ Nắng Gắt
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Bazan Núi Lửa Cách Nhiệt Tự Nhiên</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Độ dày thành đá từ 120mm đến 180mm giúp giữ nhiệt cực tốt. Ngay cả giữa trưa nắng 38°C tại TP.HCM, 
              máy làm lạnh Inverter chỉ cần duy trì công suất tối thiểu 280W để giữ nước luôn ở 10°C mát lạnh.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400">
              03 · Vòi Tre Hun Khói Thảo Mộc
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Tiếng Nước Xả Tự Nhiên Giảm Căng Thẳng</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Ống tre đực già ngâm bùn hun khói xả dòng nước mát tuần hoàn róc rách. 
              Âm thanh dòng nước tự nhiên đạt chuẩn dải tần số hồng (Pink Noise), xua tan ồn ào phố thị bên ngoài tường rào.
            </p>
          </div>
        </div>

        {/* Custom Order & Installation Form */}
        <div className="mt-14 rounded-3xl border border-teal-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-teal-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal-300">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                GuHomes Monolith Workshop
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Đặt May Đo Khối Đá Bazan Tại Mỏ Gia Lai
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Mỗi bể ngâm lạnh là một cột đá bazan nguyên vẹn hàng triệu năm tuổi được các nghệ nhân GuHomes trực tiếp lựa chọn hình dáng lục lăng tại mỏ, 
                đục rỗng thủ công và căn chỉnh hệ thống làm lạnh âm sàn đồng bộ với cảnh quan vi khí hậu biệt thự.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Lựa chọn dáng đá tự nhiên tại mỏ</span>
                <span>✓ Thử tải trọng kết cấu sàn 100%</span>
                <span>✓ Bảo hành hệ lạnh Inverter 5 năm</span>
              </div>
            </div>

            <div>
              {bookingSuccess ? (
                <div className="rounded-2xl border border-teal-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/20 text-teal-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu bể ngâm bazan</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Kỹ sư cảnh quan GuHomes sẽ liên hệ để khảo sát mặt bằng sân vườn và cung cấp hình ảnh các khối đá nguyên khối sẵn có trong 24 giờ.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setBookingSuccess(true)
                  }}
                  className="space-y-4 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-md"
                >
                  <div>
                    <label htmlFor={`${formId}-client`} className="block font-mono text-xs text-stone-300">
                      Họ tên gia chủ *
                    </label>
                    <input
                      id={`${formId}-client`}
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-contact`} className="block font-mono text-xs text-stone-300">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      id={`${formId}-contact`}
                      required
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-space`} className="block font-mono text-xs text-stone-300">
                      Vị trí dự kiến lắp đặt (Sân vườn / Sân thượng penthouse / Hiên nhà)
                    </label>
                    <input
                      id={`${formId}-space`}
                      type="text"
                      placeholder="VD: Sân vườn biệt thự Thảo Điền (35m²)"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Yêu cầu tuyển chọn khối đá bazan tại mỏ
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
