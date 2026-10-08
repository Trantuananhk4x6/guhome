'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface BongosRhythm {
  id: string
  name: string
  tempoBpm: number
  description: string
  timeSignature: string
  machoFrequency: number
  hembraFrequency: number
}

const RHYTHMS: readonly BongosRhythm[] = [
  {
    id: 'martillo-river',
    name: 'Martillo Nhịp Gió Sông Sài Gòn',
    tempoBpm: 124,
    description: 'Tiết tấu nhịp gõ ngón tay chuẩn mực Afro-Cuban, nhịp 1 Macho đanh gọn kết hợp nhịp 4 Hembra trầm sâu như nhịp nước triều bến Bạch Đằng.',
    timeSignature: '4/4 Martillo Clave',
    machoFrequency: 450,
    hembraFrequency: 220,
  },
  {
    id: 'guaguanco-sunset',
    name: 'Guaguancó Hoàng Hôn Bán Đảo',
    tempoBpm: 136,
    description: 'Vũ khúc đa tiết tấu rộn rã, tiếng gõ Slap sắc sảo va đập trên vòm tán âm nan gỗ Cẩm Lai dải tần 2.800Hz không gắt gỏng.',
    timeSignature: '6/8 Rumba Poly',
    machoFrequency: 480,
    hembraFrequency: 210,
  },
  {
    id: 'bolero-night',
    name: 'Bolero Lắng Đọng Đêm Thảo Điền',
    tempoBpm: 92,
    description: 'Nhịp gõ khẽ buông lơi, kỹ thuật vuốt ngón trên da dê núi Ninh Bình sấy mộc tỏa chất âm mộc mạc thư thái giữa phòng khách Quiet Luxury.',
    timeSignature: '4/4 Ballad Slow',
    machoFrequency: 420,
    hembraFrequency: 200,
  },
]

interface AcousticMaterial {
  name: string
  origin: string
  acousticRole: string
  finishing: string
}

const ACOUSTIC_MATERIALS: readonly AcousticMaterial[] = [
  {
    name: 'Cặp Trống Bongos Gỗ Muồng Đen & Da Dê Núi',
    origin: 'Thân phôi Muồng đen Nam Bộ lõi đặc, mặt trống bọc da dê núi Ninh Bình thuộc thảo mộc',
    acousticRole: 'Âm vực kép cân bằng: Macho 7" đanh sắc tần số cao, Hembra 8.5" dội âm trầm ấm lan tỏa',
    finishing: 'Vành đai niềng đồng thau hun khói thủ công, lau dầu lanh bảo tồn sớ gỗ muồng ánh kim',
  },
  {
    name: 'Vòm Nan Gỗ Cẩm Lai Tán Âm Dải Trung Cao',
    origin: 'Kho gỗ tuyển lựa xưởng Thạnh Xuân 1.200m², sấy chân không độ ẩm cân bằng 10.5%',
    acousticRole: 'Tán âm dải tần 2.500Hz - 4.000Hz, triệt tiêu phản xạ flutter echo giữa hai vách song song',
    finishing: 'Biên dạng nan xẻ rãnh góc nghiêng 37.5 độ, hoàn thiện dầu sáp carnauba tự nhiên',
  },
  {
    name: 'Soundboard Gỗ Hoàng Đàn Tuyết Lạng Sơn 15mm',
    origin: 'Phôi gỗ Hoàng Đàn tuyết cổ thụ ngậm tinh dầu trầm đặc trưng',
    acousticRole: 'Cộng hưởng âm học ấm áp tự nhiên, thời gian dư vang đạt chuẩn kiểm thính RT60 = 0.29s',
    finishing: 'Xử lý mộng chốt gỗ tự nhiên, tỏa vi hương thanh khiết kiểm soát vi khí hậu phòng nghe',
  },
]

export function SaigonAcousticBongosSanctuarySalon({ className }: { className?: string }) {
  const [selectedRhythm, setSelectedRhythm] = useState<string>('martillo-river')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [humidityRH, setHumidityRH] = useState<number>(52.0)
  const [strikeMode, setStrikeMode] = useState<'martillo' | 'slap' | 'opentone'>('martillo')
  const [beatActive, setBeatActive] = useState<number>(0)

  const audioContextRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { openQuoteModal } = useQuickQuote()

  const currentRhythm = RHYTHMS.find((r) => r.id === selectedRhythm) ?? RHYTHMS[0]!

  useEffect(() => {
    return () => {
      stopRhythm()
    }
  }, [selectedRhythm])

  const stopRhythm = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }
    setIsPlaying(false)
    setBeatActive(0)
  }

  const playBongoHit = (type: 'macho' | 'hembra', technique: 'martillo' | 'slap' | 'opentone') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioCtx()
      }
      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const now = ctx.currentTime
      const baseFreq = type === 'macho' ? currentRhythm.machoFrequency : currentRhythm.hembraFrequency

      // Primary Membrane Osc
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // Bandpass acoustic resonance filter
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'

      let decayTime = 0.15
      let pitchMod = 1.0

      if (technique === 'slap') {
        osc.type = 'triangle'
        filter.frequency.setValueAtTime(baseFreq * 2.2, now)
        filter.Q.setValueAtTime(6.0, now)
        decayTime = 0.08
        pitchMod = 1.5
      } else if (technique === 'opentone') {
        osc.type = 'sine'
        filter.frequency.setValueAtTime(baseFreq * 1.1, now)
        filter.Q.setValueAtTime(3.5, now)
        decayTime = 0.28
        pitchMod = 1.0
      } else {
        // martillo
        osc.type = 'triangle'
        filter.frequency.setValueAtTime(baseFreq * 1.6, now)
        filter.Q.setValueAtTime(4.5, now)
        decayTime = 0.14
        pitchMod = 1.2
      }

      osc.frequency.setValueAtTime(baseFreq * pitchMod, now)
      osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.04)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.28, now + 0.005)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime)

      // Wood resonance subtle noise click
      const bufferSize = ctx.sampleRate * 0.015
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'highpass'
      noiseFilter.frequency.setValueAtTime(2400, now)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.12, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015)

      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      noise.start(now)
      osc.stop(now + decayTime + 0.05)
      noise.stop(now + 0.02)
    } catch {
      // AudioContext fallback
    }
  }

  const toggleRhythmSequence = () => {
    if (isPlaying) {
      stopRhythm()
    } else {
      setIsPlaying(true)
      let step = 0
      const intervalMs = Math.round((60 / currentRhythm.tempoBpm / 2) * 1000)

      timerRef.current = setInterval(() => {
        setBeatActive(step % 8)
        // Martillo pattern on 8 eighth notes:
        // step 0: Macho Martillo
        // step 1: Macho Fingertip
        // step 2: Macho Slap
        // step 3: Macho Fingertip
        // step 4: Macho Martillo
        // step 5: Macho Fingertip
        // step 6: Hembra Open Tone (Low accent)
        // step 7: Macho Fingertip
        if (step % 8 === 6) {
          playBongoHit('hembra', 'opentone')
        } else if (step % 8 === 2) {
          playBongoHit('macho', 'slap')
        } else if (step % 8 === 0 || step % 8 === 4) {
          playBongoHit('macho', strikeMode)
        } else {
          playBongoHit('macho', 'martillo')
        }
        step++
      }, intervalMs)
    }
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-stone-950 via-stone-900 to-black p-6 sm:p-10 text-stone-100 shadow-2xl',
        className
      )}
      aria-label="Thính Phòng Bongos Gỗ Muồng Đen & Âm Học Vi Khí Hậu"
    >
      {/* Background Subtle Gradient & Wood Texture Glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow-600/10 blur-3xl" />

      {/* Header Badge & Title */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Kiến Trúc Âm Học & Vi Khí Hậu Sài Gòn
            </span>
            <span className="text-xs text-stone-400">Xưởng Thạnh Xuân 1.200m²</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
            Thính Phòng Bongos <span className="font-serif italic text-amber-200">Gỗ Muồng Đen</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Không gian kiểm âm chuẩn mực với cặp trống Bongos Nam Bộ da dê núi sấy mộc, vòm nan Cẩm Lai tán âm dải trung cao và trần soundboard Hoàng Đàn tuyết đạt chuẩn RT60 = 0.29 giây.
          </p>
        </div>

        {/* Realtime Microclimate Monitor */}
        <div className="flex items-center gap-3 bg-stone-900/80 border border-stone-800 rounded-2xl px-4 py-3 backdrop-blur-md">
          <div className="text-right">
            <div className="text-xs text-stone-400 font-mono">ĐỘ ẨM PHÒNG NGHE</div>
            <div className="text-base font-semibold text-amber-400">{humidityRH.toFixed(1)}% RH</div>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div className="text-right">
            <div className="text-xs text-stone-400 font-mono">THỜI GIAN VANG</div>
            <div className="text-base font-semibold text-emerald-400">0.29s (RT60)</div>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Visual Instrument & Strike Pads (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-xs uppercase tracking-wider text-stone-300 font-mono">
                  Mô Phỏng Trực Tiếp Thao Tác Gõ Bongos
                </span>
              </div>
              <span className="text-xs text-amber-300/80 font-mono">Web Audio API 24-bit 48kHz</span>
            </div>

            {/* Visualizer Step Indicator */}
            <div className="grid grid-cols-8 gap-1.5 mb-6">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div
                  key={step}
                  className={cn(
                    'h-2.5 rounded-sm transition-all duration-100',
                    isPlaying && beatActive === step
                      ? step === 6
                        ? 'bg-amber-400 shadow-md shadow-amber-400/50 scale-y-125'
                        : 'bg-amber-300/90 shadow-sm shadow-amber-300/30'
                      : 'bg-stone-800'
                  )}
                />
              ))}
            </div>

            {/* Dual Drum Head Interactive Pads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
              {/* Macho Drum (High, 7 Inch) */}
              <div
                onClick={() => playBongoHit('macho', strikeMode)}
                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-amber-500/30 bg-stone-950/70 hover:border-amber-400 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-amber-500/10 active:scale-95 select-none"
              >
                <div className="absolute top-3 left-3 text-[10px] font-mono text-amber-300/80 bg-stone-900/90 px-2 py-0.5 rounded">
                  MACHO · 7 INCH
                </div>
                <div className="relative my-4 flex h-36 w-36 items-center justify-center rounded-full border-4 border-amber-600/40 bg-gradient-to-br from-stone-900 via-amber-950/30 to-stone-950 p-3 shadow-inner group-hover:border-amber-400 transition-colors">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-amber-400/30 bg-stone-900 text-center">
                    <div>
                      <div className="text-lg font-serif text-amber-200">{currentRhythm.machoFrequency}Hz</div>
                      <div className="text-[10px] text-stone-400">Da Dê Ninh Bình</div>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-stone-300 font-medium group-hover:text-amber-300">
                  Nhấp để gõ trống Macho (Âm cao)
                </span>
              </div>

              {/* Hembra Drum (Low, 8.5 Inch) */}
              <div
                onClick={() => playBongoHit('hembra', strikeMode)}
                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-yellow-600/30 bg-stone-950/70 hover:border-yellow-400 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-yellow-500/10 active:scale-95 select-none"
              >
                <div className="absolute top-3 left-3 text-[10px] font-mono text-yellow-300/80 bg-stone-900/90 px-2 py-0.5 rounded">
                  HEMBRA · 8.5 INCH
                </div>
                <div className="relative my-4 flex h-40 w-40 items-center justify-center rounded-full border-4 border-yellow-700/40 bg-gradient-to-br from-stone-900 via-stone-950 to-black p-3 shadow-inner group-hover:border-yellow-400 transition-colors">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-yellow-500/30 bg-stone-900 text-center">
                    <div>
                      <div className="text-xl font-serif text-yellow-100">{currentRhythm.hembraFrequency}Hz</div>
                      <div className="text-[10px] text-stone-400">Gỗ Muồng Đen</div>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-stone-300 font-medium group-hover:text-yellow-200">
                  Nhấp để gõ trống Hembra (Âm trầm)
                </span>
              </div>
            </div>

            {/* Strike Technique Selector */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800">
              <span className="text-xs text-stone-400 font-mono">KỸ THUẬT GÕ THỦ CÔNG:</span>
              <div className="flex items-center gap-2">
                {(['martillo', 'slap', 'opentone'] as const).map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setStrikeMode(tech)}
                    className={cn(
                      'px-3 py-1 text-xs rounded-lg transition-colors font-medium',
                      strikeMode === tech
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white'
                    )}
                  >
                    {tech === 'martillo' ? 'Martillo (Mũi Ngón)' : tech === 'slap' ? 'Slap (Chặt Đanh)' : 'Open Tone (Mở Vang)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Microclimate Adjuster Slider */}
          <div className="mt-6 pt-4 border-t border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span>ĐIỀU TIẾT VI KHÍ HẬU PHÒNG NGHE (50% - 60% RH)</span>
              <span className="text-amber-300 font-mono">{humidityRH.toFixed(1)}% RH</span>
            </div>
            <input
              type="range"
              min="48"
              max="65"
              step="0.5"
              value={humidityRH}
              onChange={(e) => setHumidityRH(parseFloat(e.target.value))}
              className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500 mt-1">
              <span>48% (Khô hanh máy lạnh)</span>
              <span>52% (Lý tưởng da dê Ninh Bình)</span>
              <span>65% (Nồm ẩm Sài Gòn mùa mưa)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Rhythm Selector & Acoustic Specs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Rhythm Tracks */}
          <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-white">Tiết Tấu Hòa Âm Sài Gòn</h3>
              <span className="text-xs text-amber-300/80 font-mono">{currentRhythm.timeSignature}</span>
            </div>

            <div className="space-y-3">
              {RHYTHMS.map((rhythm) => (
                <div
                  key={rhythm.id}
                  onClick={() => {
                    setSelectedRhythm(rhythm.id)
                    if (isPlaying) {
                      stopRhythm()
                    }
                  }}
                  className={cn(
                    'p-3.5 rounded-xl border transition-all cursor-pointer',
                    selectedRhythm === rhythm.id
                      ? 'border-amber-500/60 bg-amber-500/10 shadow-sm'
                      : 'border-stone-800/80 bg-stone-950/40 hover:border-stone-700'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-100">{rhythm.name}</span>
                    <span className="text-xs font-mono text-amber-400">{rhythm.tempoBpm} BPM</span>
                  </div>
                  <p className="mt-1 text-xs text-stone-400 leading-normal">{rhythm.description}</p>
                </div>
              ))}
            </div>

            {/* Play Rhythm Loop Button */}
            <button
              onClick={toggleRhythmSequence}
              className={cn(
                'mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all shadow-md',
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
              )}
            >
              {isPlaying ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  Dừng Chu Trình Tiết Tấu
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-stone-950" />
                  Khởi Động Hòa Âm Tự Động ({currentRhythm.tempoBpm} BPM)
                </>
              )}
            </button>
          </div>

          {/* Acoustic Spec Cards */}
          <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-4">
              Vật Liệu Âm Học & Hoàn Thiện Thạnh Xuân
            </h3>
            <div className="space-y-3.5">
              {ACOUSTIC_MATERIALS.map((mat, idx) => (
                <div key={idx} className="border-b border-stone-800/60 pb-3 last:border-b-0 last:pb-0">
                  <div className="text-xs font-medium text-stone-200">{mat.name}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">{mat.acousticRole}</div>
                  <div className="text-[10px] text-amber-400/80 mt-1 font-mono">{mat.origin}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Call to Action */}
      <div className="relative z-10 mt-10 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-400 text-center sm:text-left">
          Trần 12 công trình/năm · Đo đạc âm học RT60 & vi khí hậu tận nơi tại TP. Hồ Chí Minh
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openQuoteModal('Thính Phòng Âm Học Bongos Gỗ Muồng Đen')}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2.5 text-xs font-semibold tracking-wide transition-all shadow-md"
          >
            Nhận Dự Toán Thính Phòng Âm Học
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-stone-200 px-4 py-2.5 text-xs font-medium transition-all"
          >
            Hotline: 0368 757 916
          </Link>
        </div>
      </div>
    </section>
  )
}
