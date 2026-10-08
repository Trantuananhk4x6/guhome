'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
function WavesIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}

function SparklesIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  )
}

function Volume2Icon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function VolumeXIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function ShieldIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

function CompassIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

// Web Audio synthesizer for 432Hz Solfeggio Meditation Bell & River Waves soundscape
class MeditationAudioEngine {
  private ctx: AudioContext | null = null
  private bellOsc: OscillatorNode | null = null
  private bellGain: GainNode | null = null
  private waveGain: GainNode | null = null
  private isMuted: boolean = false

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (muted && this.bellGain && this.ctx) {
      this.bellGain.gain.setValueAtTime(0, this.ctx.currentTime)
    }
  }

  public strikeSingingBowl(freq = 432) {
    if (this.isMuted) return
    this.initCtx()
    if (!this.ctx) return

    const now = this.ctx.currentTime

    // Fundamental Tibetan Singing Bowl (432Hz)
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    // Harmonic overtone
    const overtone = this.ctx.createOscillator()
    const overGain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    overtone.type = 'sine'
    overtone.frequency.setValueAtTime(freq * 2.76, now) // Metallic overtone

    gain.gain.setValueAtTime(0.5, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5)

    overGain.gain.setValueAtTime(0.18, now)
    overGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    overtone.connect(overGain)
    overGain.connect(this.ctx.destination)

    osc.start(now)
    overtone.start(now)
    osc.stop(now + 5.6)
    overtone.stop(now + 3.3)
  }

  public playWaterLap() {
    if (this.isMuted) return
    this.initCtx()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const bufferSize = this.ctx.sampleRate * 1.5
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(450, now)
    filter.frequency.exponentialRampToValueAtTime(180, now + 1.2)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(0.01, now)
    gain.gain.linearRampToValueAtTime(0.25, now + 0.4)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)

    noise.start(now)
    noise.stop(now + 1.5)
  }
}

interface DockFeature {
  id: string
  title: string
  subtitle: string
  specs: string
  details: string
}

const DOCK_FEATURES: DockFeature[] = [
  {
    id: 'hydraulic-float',
    title: 'Hệ Phao Nổi Composite Tổ Ong Sợi Bazan',
    subtitle: 'Tải trọng chịu lực 12 tấn ngầm dưới mặt nước',
    specs: 'Độ nổi an toàn 400%, biên độ nâng hạ triều ±1.8m',
    details: 'Thiết kế cấu trúc tổ ong bọc sợi đá bazan chống thẩm thấu nước sông nhiễm phèn mặn, kết hợp trục neo trượt thủy lực bằng thép không gỉ Duplex 2205.',
  },
  {
    id: 'teak-decking',
    title: 'Sàn Nan Gỗ Teak Miệt Vườn Sấy Chân Không',
    subtitle: 'Dày 35mm rãnh âm dương mộng chìm giấu vít',
    specs: 'Độ ẩm thớ gỗ 11% EMC, dầu thực vật Osmo Anti-Slip',
    details: 'Gỗ Teak (giá tỵ) rừng già kháng ẩm 100%, không co ngót cong vênh trước nắng gắt và triều dâng. Dầu phủ tự nhiên không trơn trượt khi sương sớm đọng.',
  },
  {
    id: 'pomu-pavilion',
    title: 'Bục Thiền Gỗ Pơ Mu Xá Xị Kháng Muỗi',
    subtitle: 'Tinh dầu thơm tự nhiên xua đuổi côn trùng sông nước',
    specs: 'Khổ ván lớn 400mm, mộc sáp ong tự nhiên',
    details: 'Chất gỗ Pơ mu xá xị thơm dịu, phát tán hương thơm an thần giúp gia chủ tĩnh tâm sâu khi tọa thiền đón bình minh hoặc hoàng hôn bến sông.',
  },
  {
    id: 'subtle-lighting',
    title: 'Lan Can Đồng Thau Mộc & Ánh Sáng 2200K',
    subtitle: 'Hệ chiếu sáng gián tiếp mặt nước không lóa mắt',
    specs: 'Cắt gọt CNC đồng thau 15mm, LED IP68 2200K Amber',
    details: 'Đèn hắt tia viền âm dưới mặt sàn soi rõ gợn sóng triều dâng nhưng không thu hút côn trùng nhiệt đới, bảo đảm sự tĩnh mịch tuyệt đối.',
  },
]

export function SaigonCanalSideFloatingTeakMeditationDock({ className = '' }: { className?: string }) {
  const [tideLevel, setTideLevel] = useState<number>(0.8) // meters from baseline (-1.8m to +1.8m)
  const [isMuted, setIsMuted] = useState(false)
  const [isTibetanActive, setIsTibetanActive] = useState(false)
  const [activeFeatureId, setActiveFeatureId] = useState<string>('teak-decking')

  const audioEngineRef = useRef<MeditationAudioEngine | null>(null)

  useEffect(() => {
    audioEngineRef.current = new MeditationAudioEngine()
  }, [])

  const handleMuteToggle = () => {
    const nextState = !isMuted
    setIsMuted(nextState)
    if (audioEngineRef.current) {
      audioEngineRef.current.setMuted(nextState)
    }
  }

  const strikeBell = useCallback(() => {
    setIsTibetanActive(true)
    if (audioEngineRef.current) {
      audioEngineRef.current.strikeSingingBowl(432)
      audioEngineRef.current.playWaterLap()
    }
    setTimeout(() => {
      setIsTibetanActive(false)
    }, 1200)
  }, [])

  const activeFeature: DockFeature = DOCK_FEATURES.find((f) => f.id === activeFeatureId) ?? DOCK_FEATURES[0]!

  return (
    <section className={`relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 p-6 text-stone-200 md:p-10 ${className}`}>
      {/* Background aquatic ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-950/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-950/20 blur-3xl" />

      {/* Header Monogram & Subtitle */}
      <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Kiến Trúc Mặt Nước Vi Khí Hậu · Biệt Thự Thảo Điền & SwanBay
          </div>
          <h3 className="mt-1 font-serif text-2xl text-stone-100 md:text-3xl">
            Bến Thiền Nổi Gỗ Teak Miệt Vườn Tự Thích Ứng Triều Dâng
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-stone-400">
            Sàn nổi 48m² vươn mặt nước sông Sài Gòn với cơ chế neo trượt thủy lực cân bằng biên độ triều cường ±1.8m, bục thiền Pơ mu xá xị tỏa vi hương và chuông xoay 432Hz.
          </p>
        </div>

        {/* Sound & Meditation Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={strikeBell}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              isTibetanActive
                ? 'border-amber-400 bg-amber-500/30 text-amber-200 scale-105 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                : 'border-emerald-600/50 bg-emerald-950/30 text-emerald-300 hover:border-emerald-500'
            }`}
          >
            <SparklesIcon className="h-4 w-4 text-emerald-400" />
            Thỉnh Chuông Xoay 432Hz
          </button>

          <button
            onClick={handleMuteToggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-900 text-stone-400 hover:border-stone-600"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeXIcon className="h-4 w-4" /> : <Volume2Icon className="h-4 w-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 grid gap-8 lg:grid-cols-12">
        {/* Left: Interactive Water Tide & Dock Elevation Simulator */}
        <div className="flex flex-col justify-between rounded-xl border border-stone-800/80 bg-stone-900/40 p-6 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <span className="flex items-center gap-2 text-xs font-mono text-stone-300 uppercase">
              <WavesIcon className="h-4 w-4 text-cyan-400" />
              Mô Phỏng Thủy Triều Sông Sài Gòn
            </span>
            <span className="rounded bg-stone-800 px-2 py-0.5 text-xs font-mono text-emerald-400">
              Mực nước: {tideLevel >= 0 ? `+${tideLevel.toFixed(1)}m` : `${tideLevel.toFixed(1)}m`}
            </span>
          </div>

          {/* Visual Cross-Section of Dock & River Column */}
          <div className="relative my-6 h-64 overflow-hidden rounded-lg border border-stone-800 bg-stone-950">
            {/* Sky / Air Zone */}
            <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-stone-950 via-stone-900/60 to-transparent" />

            {/* Vertical Guide Neo Piles (Trục neo trượt thép Duplex) */}
            <div className="absolute top-4 left-1/4 bottom-0 w-3 rounded-full bg-stone-700/80 border border-stone-600" />
            <div className="absolute top-4 right-1/4 bottom-0 w-3 rounded-full bg-stone-700/80 border border-stone-600" />

            {/* Dynamic Water Layer */}
            <motion.div
              animate={{
                top: `${50 - tideLevel * 18}%`,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              className="absolute inset-x-0 bottom-0 bg-linear-to-b from-cyan-900/60 via-emerald-950/80 to-stone-950 border-t border-cyan-500/40"
            >
              <div className="absolute top-1 inset-x-0 flex justify-around opacity-40">
                <span className="h-1 w-12 rounded-full bg-cyan-300/40 animate-pulse" />
                <span className="h-1 w-16 rounded-full bg-cyan-300/30 animate-pulse delay-75" />
                <span className="h-1 w-10 rounded-full bg-cyan-300/50 animate-pulse delay-150" />
              </div>
            </motion.div>

            {/* Floating Teak Dock & Meditation Pavilion */}
            <motion.div
              animate={{
                top: `${42 - tideLevel * 18}%`,
              }}
              transition={{ type: 'spring', damping: 22, stiffness: 130 }}
              className="absolute inset-x-12 z-20 flex flex-col items-center"
            >
              {/* Meditation Seat & Brass Railing */}
              <div className="flex h-12 w-32 items-center justify-center rounded-t-md border-t-2 border-amber-600/70 bg-amber-950/80 px-3 shadow-lg">
                <span className="text-[10px] font-mono font-medium text-amber-200">Bục Pơ Mu Thiền 432Hz</span>
              </div>

              {/* Main Teak Decking Layer */}
              <div className="h-4 w-full rounded-xs bg-linear-to-r from-amber-800 via-amber-700 to-amber-800 border-y border-amber-500/40 shadow-md">
                {/* Deck Planks Pattern */}
                <div className="flex h-full w-full justify-between px-2 opacity-50">
                  {Array.from({ length: 14 }).map((_, idx) => (
                    <div key={idx} className="h-full w-px bg-stone-950" />
                  ))}
                </div>
              </div>

              {/* Underwater Basalt Composite Floatation Tank */}
              <div className="h-10 w-11/12 rounded-b-xl border border-emerald-500/30 bg-stone-900/90 shadow-inner">
                <div className="flex h-full items-center justify-center text-[9px] font-mono text-cyan-300/80">
                  Phao tổ ong bazan (Chịu tải 12T)
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tide Level Slider Controls */}
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Triều ròng (-1.8m)</span>
              <span className="text-emerald-400">Điều chỉnh mực nước triều</span>
              <span>Triều cường (+1.8m)</span>
            </div>
            <input
              type="range"
              min="-1.8"
              max="1.8"
              step="0.1"
              value={tideLevel}
              onChange={(e) => setTideLevel(parseFloat(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-emerald-500"
            />
            <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Mực nước rạch lúc 05:00</span>
              <span>Bến nổi tự cân bằng không ngập sàn</span>
              <span>Đỉnh triều lúc 18:30</span>
            </div>
          </div>
        </div>

        {/* Right: Structural Engineering Specifications & Features */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-wider text-stone-400 uppercase">Hệ Thống Kỹ Thuật Độc Bản</span>

            <div className="space-y-2.5">
              {DOCK_FEATURES.map((feat) => {
                const isSelected = activeFeatureId === feat.id
                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveFeatureId(feat.id)}
                    className={`w-full text-left rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? 'border-emerald-500/60 bg-emerald-950/20 shadow-md'
                        : 'border-stone-800/80 bg-stone-900/30 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-medium text-stone-200">{feat.title}</h4>
                      <span className={`text-[10px] font-mono rounded px-1.5 py-0.5 ${isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'text-stone-500'}`}>
                        {feat.specs}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400">{feat.subtitle}</p>
                  </button>
                )
              })}
            </div>

            {/* In-depth Feature Detail Callout */}
            <div className="rounded-xl border border-stone-800/60 bg-stone-900/50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <ShieldIcon className="h-4 w-4" />
                Giải Pháp Thi Công Tại Xưởng Thạnh Xuân
              </div>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                {activeFeature.details}
              </p>
            </div>
          </div>

          {/* Microclimate Advisory Footer */}
          <div className="mt-4 flex items-center gap-3 border-t border-stone-800 pt-3 text-[11px] text-stone-500">
            <CompassIcon className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Thích ứng hoàn toàn với nắng hướng Tây và dòng chảy bùn phù sa sông Sài Gòn, tuổi thọ kết cấu trên 30 năm.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
