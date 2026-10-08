'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type RoastingStep = 'diet-men' | 'vo-che' | 'sao-kho' | 'danh-moc'

interface RoastingPhase {
  id: RoastingStep
  stepNumber: string
  title: string
  targetTemp: number
  durationMin: number
  aromaNote: string
  artisanTechnique: string
  flameIntensity: string
  panGlow: string
}

const ROASTING_PHASES: Record<RoastingStep, RoastingPhase> = {
  'diet-men': {
    id: 'diet-men',
    stepNumber: 'Giai Đoạn 01',
    title: 'Diệt Men Búp Chè (Pan Fixation)',
    targetTemp: 280,
    durationMin: 7,
    aromaNote: 'Hương ngái xanh của lá tươi chuyển hóa thành nốt thơm cỏ ngọt đầu mùa',
    artisanTechnique: 'Đảo nhanh tay liên tục trên chảo gang đỏ lửa để ức chế enzyme polyphenol oxidase, giữ trọn sắc lục diệp ngọc.',
    flameIntensity: 'Than củi rực đỏ 100%',
    panGlow: 'from-rose-600/40 via-amber-800/30 to-stone-950',
  },
  'vo-che': {
    id: 'vo-che',
    stepNumber: 'Giai Đoạn 02',
    title: 'Vò Chè Gỗ Gõ Đỏ (Hand Rolling)',
    targetTemp: 32,
    durationMin: 15,
    aromaNote: 'Hương búp non thơm ngát tiết ra khi tinh dầu vỡ khỏi màng tế bào lá',
    artisanTechnique: 'Vò xoắn búp chè trên nong tre và bàn gỗ Gõ Đỏ bằng lực lòng bàn tay, cuộn chặt búp chè thành sợi thanh tú.',
    flameIntensity: 'Ủ than âm ỉ chờ lửa',
    panGlow: 'from-emerald-600/20 via-stone-900 to-stone-950',
  },
  'sao-kho': {
    id: 'sao-kho',
    stepNumber: 'Giai Đoạn 03',
    title: 'Sao Khô Lần Một (Gentle Drying)',
    targetTemp: 130,
    durationMin: 35,
    aromaNote: 'Hương thơm ngọt sâu đượm bắt đầu bốc lên cùng hơi nước bay bổng',
    artisanTechnique: 'Nhiệt than dịu nhẹ truyền qua đáy chảo gang 35mm giúp lá chè khô đều từ trong lõi ra ngoài, không bị cháy sém.',
    flameIntensity: 'Than hoa hồng đều 50%',
    panGlow: 'from-amber-600/30 via-stone-900 to-stone-950',
  },
  'danh-moc': {
    id: 'danh-moc',
    stepNumber: 'Giai Đoạn 04',
    title: 'Đánh Mốc Lấy Hương Cốm (Aroma Awakening)',
    targetTemp: 90,
    durationMin: 25,
    aromaNote: 'Hương cốm non ngào ngạt ngập tràn không gian, lớp tuyết trắng bạc phủ nhẹ búp chè',
    artisanTechnique: 'Động tác xoa chè lòng bàn tay điêu luyện tạo lớp phấn trắng tuyết mỏng dính trên cánh chè xoăn tít.',
    flameIntensity: 'Tro trấu giữ nhiệt âm 30%',
    panGlow: 'from-yellow-500/25 via-stone-900 to-stone-950',
  },
}

export function SaigonRiversideTeaRoastingAtelier({ className }: { className?: string }) {
  const componentId = useId()

  const [activePhase, setActivePhase] = useState<RoastingStep>('danh-moc')
  const [temperature, setTemperature] = useState<number>(90)
  const [isExhaustActive, setIsExhaustActive] = useState<boolean>(true)
  const [isPlayingRoastingAudio, setIsPlayingRoastingAudio] = useState<boolean>(false)
  const [isExperienceBooked, setIsExperienceBooked] = useState<boolean>(false)

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const crackleTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentPhase = ROASTING_PHASES[activePhase]

  const stopAudio = () => {
    if (crackleTimerRef.current) {
      clearInterval(crackleTimerRef.current)
      crackleTimerRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close()
      } catch {
        // Ignore
      }
      audioCtxRef.current = null
    }
    setIsPlayingRoastingAudio(false)
  }

  // Realistic charcoal crackle and soft tea leaf rustle sound synthesis
  const toggleRoastingAudio = () => {
    if (isPlayingRoastingAudio) {
      stopAudio()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx
      setIsPlayingRoastingAudio(true)

      // Continuous low ember hum
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(65, ctx.currentTime) // 65Hz warm charcoal combustion hum

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(140, ctx.currentTime)

      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.0)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      osc.start()

      // Random sparks & leaf rustling noises
      crackleTimerRef.current = setInterval(() => {
        if (!audioCtxRef.current) return
        const c = audioCtxRef.current

        // Short noise burst for crackling wood / sizzling tea leaf
        const buf = c.createBuffer(1, c.sampleRate * 0.08, c.sampleRate)
        const d = buf.getChannelData(0)
        for (let i = 0; i < d.length; i++) {
          d[i] = (Math.random() * 2 - 1) * 0.15
        }
        const src = c.createBufferSource()
        src.buffer = buf

        const band = c.createBiquadFilter()
        band.type = 'bandpass'
        band.frequency.setValueAtTime(1200 + Math.random() * 2400, c.currentTime)
        band.Q.setValueAtTime(6.0, c.currentTime)

        const g = c.createGain()
        g.gain.setValueAtTime(0.001, c.currentTime)
        g.gain.exponentialRampToValueAtTime(0.025, c.currentTime + 0.005)
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.07)

        src.connect(band)
        band.connect(g)
        g.connect(c.destination)
        src.start(c.currentTime)
        src.stop(c.currentTime + 0.08)
      }, 350)
    } catch {
      setIsPlayingRoastingAudio(false)
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
              Artisanal Tea Roasting • Cast Iron Pan &amp; Plasma Downdraft
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Xưởng Sao Chè Thủ Công Chảo Gang Đúc &amp; Hệ Hút Khói Âm Bàn Plasma
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Trải nghiệm nghệ thuật sao chè búp tươi bằng chảo gang đúc nguyên khối dày 35mm nung than củi ven sông Sài Gòn. Hệ thống hút khói âm bàn công nghệ plasma và màng than hoạt tính triệt tiêu 100% khói bụi mà vẫn giữ nguyên vẹn nốt hương cốm non thanh khiết, kết hợp bàn mộc Gõ Đỏ làm nơi thưởng trà đối thoại cùng KTS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=tea-roasting-atelier"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Đăng Ký Buổi Thưởng Trà Ven Sông
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Interactive Roasting Pan & Technical Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cast Iron Pan Visualization & Live Heat Simulation */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={cn(
                'relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 overflow-hidden bg-gradient-to-b transition-all duration-1000 flex flex-col justify-between p-6 sm:p-8',
                currentPhase.panGlow
              )}
            >
              {/* Top Meta Bar inside Roasting Stage */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Nhiệt Độ Chảo Gang</span>
                    <span className="text-xl font-mono font-medium text-amber-400">{temperature}°C</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Giai Đoạn</span>
                    <span className="text-xs font-mono text-stone-200">{currentPhase.title.split('(')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-block w-2.5 h-2.5 rounded-full',
                      isExhaustActive ? 'bg-emerald-400 animate-ping' : 'bg-stone-600'
                    )}
                  />
                  <span className="text-[11px] font-mono text-emerald-400">
                    {isExhaustActive ? 'Hút Khói Plasma ON' : 'Hút Khói OFF'}
                  </span>
                </div>
              </div>

              {/* Center Cast Iron Pan Visualization */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                {/* 35mm Cast Iron Pan Disk */}
                <div className="relative w-56 sm:w-72 h-36 sm:h-44 rounded-full border-8 border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 shadow-2xl flex items-center justify-center p-4">
                  {/* Subtle Heat Glow Overlay */}
                  <div
                    style={{
                      opacity: Math.min(1, Math.max(0.15, temperature / 300)),
                    }}
                    className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-600/30 via-rose-600/20 to-transparent animate-pulse"
                  />

                  {/* Tea Leaves Representation inside Pan */}
                  <div className="relative z-10 text-center space-y-1">
                    <span className="text-2xl sm:text-3xl block">🍃 🍵</span>
                    <span className="text-[10px] font-mono text-amber-300 block">
                      Gang Đúc 35mm • Than Củi Bồ Kết
                    </span>
                    <span className="text-[9px] font-mono text-stone-400">
                      Hương Cốm Bốc Lên: {Math.round((temperature / 280) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Simulated Airflow / Down-draft Smoke Particles */}
                {isExhaustActive && (
                  <div className="w-56 sm:w-72 flex justify-between px-6 pt-2 text-[9px] font-mono text-emerald-400">
                    <span>▼ Hút âm bàn -350 m³/h</span>
                    <span>Lọc than hoạt tính 99.8% ▼</span>
                  </div>
                )}
              </div>

              {/* Bottom Info Bar inside Roasting Stage */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">{currentPhase.stepNumber}</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentPhase.title}</h3>
                    <p className="text-xs text-stone-400">{currentPhase.aromaNote}</p>
                  </div>

                  <button
                    type="button"
                    onClick={toggleRoastingAudio}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all min-h-[44px]',
                      isPlayingRoastingAudio
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                        : 'border border-amber-500/50 text-amber-300 hover:bg-amber-500/10'
                    )}
                  >
                    {isPlayingRoastingAudio ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        Tắt Âm Lửa Than
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Nghe Than Củi &amp; Đảo Trà
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Phases Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.values(ROASTING_PHASES).map((phase) => {
                const isActive = phase.id === activePhase
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => {
                      setActivePhase(phase.id)
                      setTemperature(phase.targetTemp)
                    }}
                    className={cn(
                      'p-2.5 border text-left transition-all min-h-[44px]',
                      isActive
                        ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[10px] font-mono text-amber-400">{phase.stepNumber}</div>
                    <div className="text-xs font-medium text-stone-200 truncate mt-0.5">{phase.title.split('(')[0]}</div>
                    <div className="text-[10px] text-stone-500 mt-1">{phase.targetTemp}°C</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Temperature Fine-tuning, Plasma Downdraft Switch & Booking */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
              {/* Temperature Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-stone-300">Nhiệt Độ Bề Mặt Chảo Gang</span>
                  <span className="text-amber-400 font-bold">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="5"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  aria-label="Điều chỉnh nhiệt độ chảo gang sao chè"
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-none min-h-[44px]"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>30°C (Vò chè)</span>
                  <span>90°C (Lấy hương)</span>
                  <span>280°C (Diệt men)</span>
                </div>
              </div>

              {/* Exhaust Toggle */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Hút Khói Âm Bàn Công Nghệ Plasma
                  </h3>
                  <p className="text-[11px] text-stone-400 font-light mt-0.5">
                    Hút trực tiếp khói than dưới mép chảo gang, giữ không khí phòng trà trong lành 100%.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExhaustActive(!isExhaustActive)}
                  className={cn(
                    'px-4 py-2 font-mono text-xs uppercase transition-all whitespace-nowrap min-h-[44px]',
                    isExhaustActive
                      ? 'bg-emerald-500 text-stone-950 font-semibold'
                      : 'border border-stone-700 text-stone-400 hover:text-stone-200'
                  )}
                >
                  {isExhaustActive ? 'Đang Hút Plasma' : 'Bật Hút Khói'}
                </button>
              </div>

              {/* Artisan Note */}
              <div className="pt-4 border-t border-stone-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  Bí Quyết Nghệ Nhân: {currentPhase.title.split('(')[0]}
                </span>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {currentPhase.artisanTechnique}
                </p>
              </div>

              {/* Booking Experience */}
              <div className="pt-4 border-t border-stone-800">
                {isExperienceBooked ? (
                  <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Đã ghi nhận đăng ký buổi trải nghiệm sao chè thủ công cùng nghệ nhân GuHomes ven sông Sài Gòn. Chúng tôi sẽ liên hệ xếp lịch đón tiếp.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsExperienceBooked(true)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px]"
                  >
                    Đăng Ký Buổi Trải Nghiệm Sao Chè
                  </button>
                )}
              </div>
            </div>

            {/* Costing Link */}
            <div className="p-5 border border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Dự Toán Xưởng Trà Đạo Ven Sông
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Tích hợp chảo gang đúc 35mm &amp; hệ hút mùi plasma vào đảo bếp hoặc vọng lâu ngoài trời.
                </p>
              </div>
              <Link
                href="/du-toan-chi-phi"
                className="whitespace-nowrap px-4 py-2 border border-stone-700 text-stone-300 hover:border-amber-400 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Tính Dự Toán
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
