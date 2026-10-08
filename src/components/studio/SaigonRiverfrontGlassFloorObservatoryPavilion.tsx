'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface TidePhase {
  id: string
  name: string
  tideLevelMeters: number
  waterCurrentSpeed: string
  sunRadiation: string
  ambientTempC: number
  description: string
}

const TIDE_PHASES: readonly TidePhase[] = [
  {
    id: 'tide-high',
    name: 'Triều Cường Rằm Sông Sài Gòn (Nước Lớn)',
    tideLevelMeters: 1.68,
    waterCurrentSpeed: '1.4 m/s',
    sunRadiation: '620 W/m²',
    ambientTempC: 31.5,
    description: 'Nước dâng sát mép đáy dầm console kính 38mm, dòng chảy cuộn sóng phù sa mát rượi, giảm nhiệt bức xạ cho toàn bộ sàn quan sát.',
  },
  {
    id: 'tide-mid',
    name: 'Triều Êm Hoàng Hôn Bán Đảo (Nước Ròng)',
    tideLevelMeters: 0.95,
    waterCurrentSpeed: '0.8 m/s',
    sunRadiation: '480 W/m²',
    ambientTempC: 28.2,
    description: 'Mặt nước phẳng lặng như gương phản chiếu vệt hoàng hôn rực rỡ, gió sông Tây Nam thổi luồn qua hệ lam nhôm Anode champagne.',
  },
  {
    id: 'tide-night',
    name: 'Thanh Âm Tĩnh Lặng Ban Đêm (Nước Đứng)',
    tideLevelMeters: 0.42,
    waterCurrentSpeed: '0.3 m/s',
    sunRadiation: '0 W/m²',
    ambientTempC: 24.8,
    description: 'Dòng sông tĩnh mịch soi bóng ánh đèn đô thị bờ bên kia, chuông gió đồng 432Hz ngân nga thanh khiết theo từng đợt gió ngọn rặng dừa nước.',
  },
]

interface EngineeringSpec {
  title: string
  spec: string
  performance: string
  craftsmanship: string
}

const ENGINEERING_SPECS: readonly EngineeringSpec[] = [
  {
    title: 'Sàn Kính Low-E Thủy Cung 3 Lớp 38mm',
    spec: '3 lớp kính siêu trong Low-E ghép màng SentryGlas (12mm + 1.52PVB + 12mm + 1.52PVB + 10mm)',
    performance: 'Chịu tải trọng động 500kg/m², chống tia cực tím UV 99.8%, độ trong suốt hiển thị 91%',
    craftsmanship: 'Gia công cạnh mài bóng vi kim cương tại nhà máy chuyên dụng, đệm mút EPDM kín nước tuyệt đối',
  },
  {
    title: 'Kết Cấu Vươn Console Chịu Lực 4.5m',
    spec: 'Khung dầm thép hình chữ I đúc cường độ cao liên kết móng cọc khoan nhồi bờ sông Thảo Điền',
    performance: 'Độ võng an toàn L/800 dưới tải trọng gió bão cấp 12, sơn phủ Epoxy 4 lớp kháng mặn phù sa',
    craftsmanship: 'Bọc ngoài bằng tấm ốp composite ốp gỗ Teak Myanmar 28mm chịu nước ngâm sương',
  },
  {
    title: 'Hệ Lam Nhôm Anode Champagne Tản Nhiệt Hướng Tây',
    spec: 'Hợp kim nhôm hàng không 6063-T6 xử lý mạ Anodized màu sâm-panh mờ hạt cát mịn',
    performance: 'Tản nhiệt bức xạ hướng Tây 85%, góc xoay cơ học 0 - 90 độ điều tiết luồng gió sông tự nhiên',
    craftsmanship: 'Khớp xoay trục bi inox 316 chống kẹt rỉ trong môi trường sương ẩm bờ sông Thạnh Xuân',
  },
]

export function SaigonRiverfrontGlassFloorObservatoryPavilion({ className }: { className?: string }) {
  const [selectedTideId, setSelectedTideId] = useState<string>('tide-high')
  const [louverAngle, setLouverAngle] = useState<number>(45)
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)
  const [waterClarity, setWaterClarity] = useState<number>(88)

  const audioContextRef = useRef<AudioContext | null>(null)
  const waveGainRef = useRef<GainNode | null>(null)
  const chimeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const { openQuoteModal } = useQuickQuote()

  const currentTide = TIDE_PHASES.find((t) => t.id === selectedTideId) ?? TIDE_PHASES[0]!

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const stopAudio = () => {
    if (chimeTimerRef.current) {
      clearInterval(chimeTimerRef.current)
      chimeTimerRef.current = null
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }
    setIsAudioActive(false)
  }

  const playChimeTone = (freq: number) => {
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return
      const ctx = audioContextRef.current
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 2.6)
    } catch {
      // Audio fallback
    }
  }

  const toggleSoundscape = () => {
    if (isAudioActive) {
      stopAudio()
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        audioContextRef.current = ctx

        if (ctx.state === 'suspended') {
          ctx.resume()
        }

        // Generate River Wave Sound (Modulated Lowpass White Noise)
        const bufferSize = ctx.sampleRate * 2
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1
        }

        const whiteNoise = ctx.createBufferSource()
        whiteNoise.buffer = buffer
        whiteNoise.loop = true

        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(320, ctx.currentTime)

        // LFO for wave swelling
        const lfo = ctx.createOscillator()
        lfo.type = 'sine'
        lfo.frequency.setValueAtTime(0.22, ctx.currentTime) // Wave cycle ~4.5s

        const lfoGain = ctx.createGain()
        lfoGain.gain.setValueAtTime(140, ctx.currentTime)

        lfo.connect(filter.frequency)

        const gainNode = ctx.createGain()
        gainNode.gain.setValueAtTime(0.12, ctx.currentTime)
        waveGainRef.current = gainNode

        whiteNoise.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)

        whiteNoise.start()
        lfo.start()

        // Occasional 432Hz / 864Hz Wind Chime strikes
        chimeTimerRef.current = setInterval(() => {
          const notes = [432, 540, 648, 864]
          const randomNote = notes[Math.floor(Math.random() * notes.length)] ?? 432
          playChimeTone(randomNote)
        }, 4000)

        setIsAudioActive(true)
      } catch {
        // audio fail
      }
    }
  }

  // Calculated effective interior temp under louvers
  const heatReductionPercent = Math.round(louverAngle * 0.94)
  const indoorTempC = (currentTide.ambientTempC - (heatReductionPercent / 100) * 5.5).toFixed(1)

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-b from-stone-950 via-teal-950/20 to-black p-6 sm:p-10 text-stone-100 shadow-2xl',
        className
      )}
      aria-label="Đài Quan Sát Kính Sàn Thủy Cung Nổi Sông Sài Gòn"
    >
      {/* Background Lighting & River Reflection Glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-teal-500/20">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              Kiến Trúc Thủy Tĩnh & Vi Khí Hậu Mặt Nước
            </span>
            <span className="text-xs text-stone-400">Vươn Console 4.5m Bờ Sông Thảo Điền</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
            Đài Quan Sát Kính Nổi <span className="font-serif italic text-teal-200">Sông Sài Gòn</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Không gian thiền trà và ngắm cảnh vươn console 4.5m trên mặt nước với sàn kính Low-E 3 lớp dày 38mm, hệ lam nhôm Anode champagne cản 85% bức xạ mặt trời hướng Tây.
          </p>
        </div>

        {/* Microclimate Live Indicator */}
        <div className="flex items-center gap-3 bg-stone-900/80 border border-teal-900/40 rounded-2xl px-4 py-3 backdrop-blur-md">
          <div className="text-right">
            <div className="text-xs text-stone-400 font-mono">NHIỆT ĐỘ KHÔNG GIAN</div>
            <div className="text-base font-semibold text-teal-300">{indoorTempC}°C</div>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div className="text-right">
            <div className="text-xs text-stone-400 font-mono">MỨC TRIỀU SÔNG</div>
            <div className="text-base font-semibold text-cyan-400">+{currentTide.tideLevelMeters}m</div>
          </div>
        </div>
      </div>

      {/* Main Interactive Workspace */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Glass Floor Simulation & Louver Control (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-teal-900/50 bg-stone-900/40 p-6 backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-400" />
                <span className="text-xs uppercase tracking-wider text-stone-300 font-mono">
                  Mô Phỏng Thị Giác Sàn Kính Thủy Cung & Lam Nắng
                </span>
              </div>
              <span className="text-xs text-teal-300/80 font-mono">Low-E SentryGlas 38mm</span>
            </div>

            {/* Glass Visualizer Deck */}
            <div className="relative overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-b from-teal-950/40 via-cyan-950/60 to-black p-8 text-center shadow-inner">
              {/* Louver Shadow Overlays */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(${louverAngle}deg, #000, #000 12px, transparent 12px, transparent 28px)`,
                }}
              />

              {/* Water Surface Wave Simulation */}
              <div className="relative z-10 py-10">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-teal-400/40 bg-teal-500/10 shadow-lg shadow-teal-500/10 backdrop-blur-md">
                  <div className="text-center">
                    <div className="text-2xl font-serif text-teal-200">+{currentTide.tideLevelMeters}m</div>
                    <div className="text-[10px] text-teal-300 font-mono">Mực Nước Sông</div>
                  </div>
                </div>
                <div className="mt-4 text-xs font-mono text-stone-300">
                  VẬN TỐC DÒNG CHẢY: <span className="text-cyan-300 font-semibold">{currentTide.waterCurrentSpeed}</span> · CẢN BỨC XẠ HƯỚNG TÂY: <span className="text-teal-300 font-semibold">{heatReductionPercent}%</span>
                </div>
              </div>

              {/* Console Structure Indicator */}
              <div className="relative z-10 mt-4 flex items-center justify-between border-t border-teal-500/20 pt-3 text-[11px] text-stone-400 font-mono">
                <span>Console Vươn Ra Bờ Kè: 4.50 mét</span>
                <span className="text-teal-400">Tải Trọng Sàn: 500 kg/m²</span>
              </div>
            </div>

            {/* Interactive Slider: Champagne Louver Rotation */}
            <div className="mt-6 p-4 rounded-xl bg-stone-950/60 border border-stone-800">
              <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
                <span className="font-mono">GÓC XOAY LAM NHÔM ANODE CHAMPAGNE:</span>
                <span className="text-teal-300 font-mono font-semibold">{louverAngle}° (Cản {heatReductionPercent}% Bức Xạ)</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={louverAngle}
                onChange={(e) => setLouverAngle(parseInt(e.target.value, 10))}
                className="w-full accent-teal-400 bg-stone-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>0° (Mở Đón Gió Tối Đa)</span>
                <span>45° (Cân Bằng Gió & Ánh Sáng)</span>
                <span>90° (Cản Nắng Gắt Hướng Tây 85%)</span>
              </div>
            </div>
          </div>

          {/* Soundscape Ambient Trigger */}
          <div className="mt-6 pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-400">
              Web Audio: Tiếng nước triều sông Sài Gòn & Chuông gió đồng 432Hz
            </div>
            <button
              onClick={toggleSoundscape}
              className={cn(
                'w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm',
                isAudioActive
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-teal-500 hover:bg-teal-400 text-stone-950'
              )}
            >
              {isAudioActive ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                  Tắt Soundscape Sóng Nước
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-950" />
                  Mở Soundscape Thủy Triều 432Hz
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Tide Phases & Engineering Detail (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Tide Cycle Selection */}
          <div className="rounded-2xl border border-teal-900/50 bg-stone-900/40 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-white">Chu Kỳ Thủy Triều Sài Gòn</h3>
              <span className="text-xs text-teal-300 font-mono">Bán Đảo Thảo Điền</span>
            </div>

            <div className="space-y-3">
              {TIDE_PHASES.map((phase) => (
                <div
                  key={phase.id}
                  onClick={() => setSelectedTideId(phase.id)}
                  className={cn(
                    'p-3.5 rounded-xl border transition-all cursor-pointer',
                    selectedTideId === phase.id
                      ? 'border-teal-500/60 bg-teal-500/10 shadow-sm'
                      : 'border-stone-800/80 bg-stone-950/40 hover:border-stone-700'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-100">{phase.name}</span>
                    <span className="text-xs font-mono text-teal-300">+{phase.tideLevelMeters}m</span>
                  </div>
                  <p className="mt-1 text-xs text-stone-400 leading-normal">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Specifications */}
          <div className="rounded-2xl border border-teal-900/50 bg-stone-900/40 p-6 backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-wider text-teal-300 font-mono mb-4">
              Giải Pháp Kết Cấu & Vật Liệu Bền Vững Bờ Sông
            </h3>
            <div className="space-y-3.5">
              {ENGINEERING_SPECS.map((spec, idx) => (
                <div key={idx} className="border-b border-stone-800/60 pb-3 last:border-b-0 last:pb-0">
                  <div className="text-xs font-medium text-stone-200">{spec.title}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">{spec.performance}</div>
                  <div className="text-[10px] text-teal-400/80 mt-1 font-mono">{spec.craftsmanship}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Call to Action */}
      <div className="relative z-10 mt-10 pt-6 border-t border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-400 text-center sm:text-left">
          Độc quyền thiết kế thi công ven sông TP. Hồ Chí Minh · Hotline KTS Trưởng: 0368 757 916
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openQuoteModal('Đài Quan Sát Kính Sàn Thủy Cung Bờ Sông')}
            className="inline-flex items-center gap-2 rounded-full bg-teal-500 hover:bg-teal-400 text-stone-950 px-5 py-2.5 text-xs font-semibold tracking-wide transition-all shadow-md"
          >
            Nhận Dự Toán Đài Quan Sát Mặt Nước
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-stone-200 px-4 py-2.5 text-xs font-medium transition-all"
          >
            Liên Hệ GuHomes
          </Link>
        </div>
      </div>
    </section>
  )
}
