'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

function PlayIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function PauseIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function MusicIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

// Tone sound generator using Web Audio API (0 bytes external MP3)
class DjembeAudioEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false

  constructor() {
    // Lazy init on first user interaction
  }

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
  }

  // Strike type: Bass (low 65Hz boom), Tone (round 280Hz mid), Slap (sharp 1200Hz crack)
  public playStrike(type: 'bass' | 'tone' | 'slap', intensity: number = 1.0) {
    if (this.isMuted) return
    this.initCtx()
    if (!this.ctx) return

    const now = this.ctx.currentTime

    if (type === 'bass') {
      // Deep sub-bass cavity resonance of Mun sọc & Trắc đỏ
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(85, now)
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.35)

      gain.gain.setValueAtTime(0.85 * intensity, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.56)
    } else if (type === 'tone') {
      // Warm open tone from mountain goatskin membrane
      const osc = this.ctx.createOscillator()
      const filter = this.ctx.createBiquadFilter()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.22)

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(280, now)
      filter.Q.setValueAtTime(3.5, now)

      gain.gain.setValueAtTime(0.7 * intensity, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.4)
    } else {
      // Sharp dry slap: high-frequency goatskin rim strike
      const osc = this.ctx.createOscillator()
      const noiseBuffer = this.createNoiseBuffer()
      const noise = this.ctx.createBufferSource()
      const filter = this.ctx.createBiquadFilter()
      const gain = this.ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(1150, now)
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.08)

      filter.type = 'highpass'
      filter.frequency.setValueAtTime(950, now)

      if (noiseBuffer) {
        noise.buffer = noiseBuffer
        const noiseGain = this.ctx.createGain()
        noiseGain.gain.setValueAtTime(0.6 * intensity, now)
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
        noise.connect(filter)
        filter.connect(noiseGain)
        noiseGain.connect(this.ctx.destination)
        noise.start(now)
        noise.stop(now + 0.13)
      }

      gain.gain.setValueAtTime(0.75 * intensity, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.16)
    }
  }

  private createNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null
    const bufferSize = this.ctx.sampleRate * 0.15
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    return buffer
  }
}

interface RhythmPreset {
  id: string
  name: string
  subtitle: string
  bpm: number
  description: string
  sequence: Array<{ strike: 'bass' | 'tone' | 'slap'; time: number; intensity: number }>
}

const RHYTHMS: RhythmPreset[] = [
  {
    id: 'thuy-trieu',
    name: 'Nhịp Thủy Triều Thủ Thiêm',
    subtitle: 'Nốt trầm sâu 65Hz đối thoại cùng sóng nước bán đảo',
    bpm: 96,
    description: 'Tiết tấu nhịp nhàng khoan thai lấy cảm hứng từ tiếng vỗ sóng của rạch Cá Trê vào mạn thuyền lúc rạng đông.',
    sequence: [
      { strike: 'bass', time: 0, intensity: 1.0 },
      { strike: 'tone', time: 0.25, intensity: 0.7 },
      { strike: 'slap', time: 0.5, intensity: 0.85 },
      { strike: 'tone', time: 0.75, intensity: 0.6 },
      { strike: 'bass', time: 1.0, intensity: 0.9 },
      { strike: 'slap', time: 1.25, intensity: 0.95 },
      { strike: 'tone', time: 1.5, intensity: 0.75 },
      { strike: 'slap', time: 1.75, intensity: 0.7 },
    ],
  },
  {
    id: 'mua-rao',
    name: 'Vũ Điệu Mưa Rào Thảo Điền',
    subtitle: 'Âm thanh ròn rã trên thềm lá chuối hoa nhiệt đới',
    bpm: 112,
    description: 'Nhịp điệu dồn dập rực rỡ mô phỏng hạt mưa nhiệt đới rơi trên mái ngói Chợ Lớn và tán cây xanh sân trong.',
    sequence: [
      { strike: 'slap', time: 0, intensity: 1.0 },
      { strike: 'slap', time: 0.15, intensity: 0.7 },
      { strike: 'tone', time: 0.35, intensity: 0.8 },
      { strike: 'bass', time: 0.6, intensity: 0.95 },
      { strike: 'slap', time: 0.85, intensity: 0.9 },
      { strike: 'tone', time: 1.1, intensity: 0.75 },
      { strike: 'slap', time: 1.35, intensity: 0.85 },
      { strike: 'bass', time: 1.6, intensity: 1.0 },
    ],
  },
  {
    id: 'bach-dang',
    name: 'Dạ Khúc Bến Bạch Đằng',
    subtitle: 'Âm sắc ấm áp ru êm không gian salon thượng lưu',
    bpm: 82,
    description: 'Khoảng lặng thư thái sau giờ làm việc: nốt bass tròn đầy nâng đỡ dải âm trung mộc mạc của màng da dê núi.',
    sequence: [
      { strike: 'bass', time: 0, intensity: 1.0 },
      { strike: 'tone', time: 0.5, intensity: 0.8 },
      { strike: 'tone', time: 0.75, intensity: 0.65 },
      { strike: 'bass', time: 1.2, intensity: 0.9 },
      { strike: 'slap', time: 1.6, intensity: 0.7 },
      { strike: 'tone', time: 2.0, intensity: 0.8 },
    ],
  },
]

export function SaigonAcousticDjembeSanctuarySalon({ className = '' }: { className?: string }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlayingRhythm, setIsPlayingRhythm] = useState(false)
  const [activeRhythmId, setActiveRhythmId] = useState<string>('thuy-trieu')
  const [activeStrike, setActiveStrike] = useState<'bass' | 'tone' | 'slap' | null>(null)
  const [activeTab, setActiveTab] = useState<'acoustic' | 'timber' | 'chamber'>('acoustic')

  const audioEngineRef = useRef<DjembeAudioEngine | null>(null)
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    audioEngineRef.current = new DjembeAudioEngine()
    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current)
    }
  }, [])

  const handleMuteToggle = () => {
    const nextState = !isMuted
    setIsMuted(nextState)
    if (audioEngineRef.current) {
      audioEngineRef.current.setMuted(nextState)
    }
  }

  const triggerStrike = useCallback((type: 'bass' | 'tone' | 'slap', intensity = 1.0) => {
    setActiveStrike(type)
    if (audioEngineRef.current) {
      audioEngineRef.current.playStrike(type, intensity)
    }
    setTimeout(() => {
      setActiveStrike((curr) => (curr === type ? null : curr))
    }, 180)
  }, [])

  const playSequence = useCallback(
    (preset: RhythmPreset) => {
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current)
      }

      const totalDuration = 60 / preset.bpm * 4 * 1000 // 4 beats loop in ms

      preset.sequence.forEach((step) => {
        const delay = step.time * (60 / preset.bpm) * 1000
        setTimeout(() => {
          if (!isMuted && isPlayingRhythm) {
            triggerStrike(step.strike, step.intensity)
          }
        }, delay)
      })

      loopTimeoutRef.current = setTimeout(() => {
        if (isPlayingRhythm) {
          playSequence(preset)
        }
      }, totalDuration)
    },
    [isMuted, isPlayingRhythm, triggerStrike]
  )

  useEffect(() => {
    if (isPlayingRhythm) {
      const preset = RHYTHMS.find((r) => r.id === activeRhythmId) ?? RHYTHMS[0]
      if (preset) {
        playSequence(preset)
      }
    } else {
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current)
      }
    }
    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current)
    }
  }, [isPlayingRhythm, activeRhythmId, playSequence])

  const toggleRhythmPlay = (id: string) => {
    if (activeRhythmId === id && isPlayingRhythm) {
      setIsPlayingRhythm(false)
    } else {
      setActiveRhythmId(id)
      setIsPlayingRhythm(true)
    }
  }

  return (
    <section className={`relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 p-6 text-stone-200 md:p-10 ${className}`}>
      {/* Subtle radial architectural lighting */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-900/10 blur-3xl" />

      {/* Header Monogram & Brand Badge */}
      <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Nghệ Thuật Âm Học & Bộ Gõ · Xưởng Mộc Thạnh Xuân
          </div>
          <h3 className="mt-1 font-serif text-2xl text-stone-100 md:text-3xl">
            Thính Phòng Trống Djembe Gỗ Trắc Đỏ Nam Bộ
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-stone-400">
            Cặp trống Djembe tiện mộc nguyên khối bọc da dê núi Ninh Bình sấy mộc, tích hợp vòm tán âm parabol 12 nan mun sọc và tiêu âm dải tần bass 65Hz.
          </p>
        </div>

        {/* Global Sound Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleMuteToggle}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              isMuted
                ? 'border-stone-700 bg-stone-900 text-stone-400 hover:border-stone-600'
                : 'border-amber-600/60 bg-amber-950/40 text-amber-300 hover:border-amber-500'
            }`}
          >
            {isMuted ? <VolumeXIcon className="h-4 w-4 text-stone-400" /> : <Volume2Icon className="h-4 w-4 text-amber-400" />}
            {isMuted ? 'Bật âm thanh' : 'Mô phỏng âm học'}
          </button>
        </div>
      </div>

      {/* Interactive Drum Membrane & Striking Area */}
      <div className="relative z-10 grid gap-8 lg:grid-cols-12">
        {/* Left: 3D Djembe Head Interactive Canvas */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-stone-800/80 bg-stone-900/50 p-6 lg:col-span-6">
          <div className="text-center">
            <span className="text-xs font-mono tracking-wider text-stone-400 uppercase">Tương tác xúc giác mặt trống</span>
            <p className="text-xs text-stone-500">Chạm hoặc click vào các vùng âm khác nhau để thử nghiệm âm sắc</p>
          </div>

          {/* Djembe Head Visual & Hitboxes */}
          <div className="relative my-8 flex h-64 w-64 items-center justify-center rounded-full border-4 border-amber-950/80 bg-linear-to-b from-stone-800 to-amber-950 shadow-2xl transition-transform duration-200">
            {/* Wooden Rim (Gỗ Trắc đỏ nguyên khối) */}
            <div className="absolute inset-0 rounded-full border-8 border-stone-900/90 ring-1 ring-amber-700/40" />

            {/* Tension Ropes Indicator (Dây thừng Kevlar mộng chìm) */}
            <div className="absolute inset-1 rounded-full border border-dashed border-amber-600/30 opacity-60" />

            {/* Goatskin Texture Overlay */}
            <div className="absolute inset-4 rounded-full bg-linear-to-tr from-amber-100/10 via-amber-200/5 to-transparent" />

            {/* Strike Zone 1: Slap Rim Zone */}
            <button
              onClick={() => triggerStrike('slap')}
              className={`group absolute inset-3 flex items-start justify-center rounded-full pt-2 transition-all ${
                activeStrike === 'slap' ? 'bg-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'hover:bg-amber-500/10'
              }`}
            >
              <span className="rounded-full bg-stone-900/80 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300 backdrop-blur-xs transition group-hover:scale-105">
                SLAP (1200Hz - Rìa)
              </span>
            </button>

            {/* Strike Zone 2: Tone Mid Zone */}
            <button
              onClick={() => triggerStrike('tone')}
              className={`group absolute inset-12 flex items-start justify-center rounded-full pt-3 transition-all ${
                activeStrike === 'tone' ? 'bg-amber-600/30 shadow-[0_0_25px_rgba(217,119,6,0.5)]' : 'hover:bg-amber-600/10'
              }`}
            >
              <span className="rounded-full bg-stone-900/80 px-2.5 py-0.5 text-[10px] font-semibold text-amber-200 backdrop-blur-xs transition group-hover:scale-105">
                TONE (280Hz - Thân)
              </span>
            </button>

            {/* Strike Zone 3: Bass Center Core */}
            <button
              onClick={() => triggerStrike('bass')}
              className={`group absolute inset-20 flex items-center justify-center rounded-full transition-all ${
                activeStrike === 'bass' ? 'scale-105 bg-amber-700/40 shadow-[0_0_35px_rgba(180,83,9,0.7)]' : 'hover:bg-amber-700/20'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="rounded-full bg-amber-950/90 px-3 py-1 text-[11px] font-bold text-amber-400 border border-amber-600/40 shadow-xs">
                  BASS (65Hz - Tâm)
                </span>
                <span className="mt-1 text-[9px] font-mono text-stone-400">Trầm sâu</span>
              </div>
            </button>
          </div>

          {/* Realtime Strike Feedback */}
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${activeStrike === 'bass' ? 'bg-amber-500 scale-125' : 'bg-stone-700'}`} />
              Bass Sub
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${activeStrike === 'tone' ? 'bg-amber-500 scale-125' : 'bg-stone-700'}`} />
              Mid Tone
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${activeStrike === 'slap' ? 'bg-amber-500 scale-125' : 'bg-stone-700'}`} />
              High Slap
            </span>
          </div>
        </div>

        {/* Right: Rhythms Presets & Acoustic Specifications */}
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="flex items-center gap-2 text-xs font-bold text-stone-300 uppercase">
                <MusicIcon className="h-4 w-4 text-amber-500" />
                Tiết Tấu Gõ Afro-Latin Sài Gòn
              </span>
              <span className="text-[11px] font-mono text-stone-500">3 Tổ hợp nhịp điệu</span>
            </div>

            <div className="mt-4 space-y-3">
              {RHYTHMS.map((rhythm) => {
                const isActive = activeRhythmId === rhythm.id && isPlayingRhythm
                return (
                  <div
                    key={rhythm.id}
                    className={`rounded-xl border p-4 transition-all ${
                      isActive
                        ? 'border-amber-500/60 bg-amber-950/20 shadow-lg shadow-amber-950/20'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-sm font-semibold text-stone-200">{rhythm.name}</h4>
                          <span className="rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-mono text-amber-400">
                            {rhythm.bpm} BPM
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-amber-400/90">{rhythm.subtitle}</p>
                        <p className="mt-1 text-xs text-stone-400">{rhythm.description}</p>
                      </div>

                      <button
                        onClick={() => toggleRhythmPlay(rhythm.id)}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isActive
                            ? 'border-amber-500 bg-amber-500 text-stone-950 shadow-md'
                            : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-amber-600 hover:text-amber-400'
                        }`}
                      >
                        {isActive ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4 ml-0.5" />}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Tabs for In-depth Craft Specs */}
          <div className="mt-6 border-t border-stone-800 pt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('acoustic')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeTab === 'acoustic' ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Cấu Trúc Âm Học RT60
              </button>
              <button
                onClick={() => setActiveTab('timber')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeTab === 'timber' ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Gỗ Trắc Đỏ & Da Dê
              </button>
              <button
                onClick={() => setActiveTab('chamber')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeTab === 'chamber' ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Quy Chuẩn Thạnh Xuân
              </button>
            </div>

            <div className="mt-3 rounded-lg border border-stone-800/60 bg-stone-900/30 p-3 text-xs text-stone-400">
              {activeTab === 'acoustic' && (
                <p>
                  <strong className="text-stone-200">Âm học tiêu âm dải trầm:</strong> Vòm parabol 12 nan mun sọc kết hợp buồng bẫy âm góc Fibonacci triệt tiêu hoàn toàn hiện tượng cộng hưởng tần số thấp 65Hz - 120Hz, bảo đảm thời gian dội âm RT60 duy trì ở mức hoàn hảo 0.28 giây.
                </p>
              )}
              {activeTab === 'timber' && (
                <p>
                  <strong className="text-stone-200">Vật liệu nguyên khối:</strong> Thân trống tiện từ gốc Trắc đỏ Nam Bộ hơn 60 năm tuổi, sấy chân không 35 ngày hạ ẩm độ về 10% EMC. Mặt trống da dê núi Ninh Bình thuộc mộc giữ lông rìa, căng sợi Kevlar chịu tải trọng 850kg.
                </p>
              )}
              {activeTab === 'chamber' && (
                <p>
                  <strong className="text-stone-200">Gia công độc bản:</strong> Thực hiện trọn gói tại xưởng mộc Thạnh Xuân 1.200m², bề mặt lau dầu hữu cơ Osmo 3 lớp không mùi bay hơi VOC, khóa bản quyền thẩm mỹ kiến trúc GuHomes.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
