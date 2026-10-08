'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BambooTube {
  id: number
  pitchName: string
  note: string
  freqHz: number
  lengthCm: number
  diameterMm: number
  resonanceHarmonics: number[]
}

const KLONG_PUT_TUBES: BambooTube[] = [
  { id: 1, pitchName: 'Ống 1 · Trầm Đại Ngàn', note: 'C3 (Đồ)', freqHz: 130.81, lengthCm: 180, diameterMm: 95, resonanceHarmonics: [130.81, 261.63, 392.43] },
  { id: 2, pitchName: 'Ống 2 · Rừng Sương', note: 'D3 (Rê)', freqHz: 146.83, lengthCm: 160, diameterMm: 90, resonanceHarmonics: [146.83, 293.66, 440.49] },
  { id: 3, pitchName: 'Ống 3 · Suối Reo', note: 'E3 (Mi)', freqHz: 164.81, lengthCm: 142, diameterMm: 85, resonanceHarmonics: [164.81, 329.63, 494.43] },
  { id: 4, pitchName: 'Ống 4 · Núi Đứng', note: 'G3 (Sol)', freqHz: 196.00, lengthCm: 118, diameterMm: 80, resonanceHarmonics: [196.00, 392.00, 588.00] },
  { id: 5, pitchName: 'Ống 5 · Trăng Rừng', note: 'A3 (La)', freqHz: 220.00, lengthCm: 104, diameterMm: 75, resonanceHarmonics: [220.00, 440.00, 660.00] },
  { id: 6, pitchName: 'Ống 6 · Gió Ngàn', note: 'C4 (Đố)', freqHz: 261.63, lengthCm: 88, diameterMm: 70, resonanceHarmonics: [261.63, 523.25, 784.89] },
  { id: 7, pitchName: 'Ống 7 · Tiếng Chim', note: 'D4 (Rế)', freqHz: 293.66, lengthCm: 76, diameterMm: 65, resonanceHarmonics: [293.66, 587.33, 880.98] },
]

export type BonfireLighting = 'moonlit-fog' | 'ember-hearth' | 'golden-dawn'

interface LightingScenario {
  id: BonfireLighting
  title: string
  cctKelvin: number
  ambientHex: string
  subtext: string
}

const LIGHTING_SCENARIOS: Record<BonfireLighting, LightingScenario> = {
  'moonlit-fog': {
    id: 'moonlit-fog',
    title: 'Sương Đêm Trăng Rừng',
    cctKelvin: 2200,
    ambientHex: 'from-[#1a2216] via-[#11160d] to-[#0a0d08]',
    subtext: 'Ánh trăng lạnh xuyên tán lá Sa Mộc, tôn lên vân tre lồ ô mộc mạc và tĩnh lặng thiền môn',
  },
  'ember-hearth': {
    id: 'ember-hearth',
    title: 'Đốm Than Lửa Trại',
    cctKelvin: 2400,
    ambientHex: 'from-[#2e1d14] via-[#170e0a] to-[#0c0805]',
    subtext: 'Hơi ấm từ than hồng củi gụ lan tỏa, tạo bóng đổ huyền bí trên vách tán âm vát góc hữu cơ',
  },
  'golden-dawn': {
    id: 'golden-dawn',
    title: 'Bình Minh Cao Nguyên',
    cctKelvin: 2800,
    ambientHex: 'from-[#2a2618] via-[#15130b] to-[#0a0905]',
    subtext: 'Tia nắng sớm rọi vào phòng hòa âm, làm bừng sáng màu vàng rơm tự nhiên của ống tre già',
  },
}

export function SaigonAcousticKlongPutSanctuaryPavilion({ className }: { className?: string }) {
  const formId = useId()
  const [selectedLighting, setSelectedLighting] = useState<BonfireLighting>('ember-hearth')
  const [activeTubeId, setActiveTubeId] = useState<number | null>(null)
  const [reverbDurationSec, setReverbDurationSec] = useState<number>(0.36)
  const [airClapIntensity, setAirClapIntensity] = useState<number>(75)
  const [isPlayingMelody, setIsPlayingMelody] = useState<boolean>(false)

  // Web Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null)
  const melodyTimeoutIdsRef = useRef<NodeJS.Timeout[]>([])

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

  useEffect(() => {
    return () => {
      melodyTimeoutIdsRef.current.forEach((t) => clearTimeout(t))
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Web Audio Synthesis for Klông Pút: Air puff impulse + resonant closed-pipe hollow acoustic
  const triggerTubeSound = (tube: BambooTube) => {
    const ctx = getAudioContext()
    if (!ctx) return

    setActiveTubeId(tube.id)
    setTimeout(() => {
      setActiveTubeId((prev) => (prev === tube.id ? null : prev))
    }, 450)

    const now = ctx.currentTime
    const gainFactor = airClapIntensity / 100

    // 1. Initial palm air compression "puff / whoosh" transient (bandpass white noise)
    const bufferSize = Math.floor(ctx.sampleRate * 0.08)
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02))
    }
    const noiseSrc = ctx.createBufferSource()
    noiseSrc.buffer = noiseBuffer

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.setValueAtTime(tube.freqHz * 2, now)
    noiseFilter.Q.setValueAtTime(3.5, now)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.18 * gainFactor, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

    noiseSrc.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noiseSrc.start(now)

    // 2. Fundamental hollow cylindrical bamboo resonance (sine + mild octave harmonic)
    const oscFundamental = ctx.createOscillator()
    const oscHarmonic = ctx.createOscillator()
    const bambooGain = ctx.createGain()

    oscFundamental.type = 'sine'
    oscFundamental.frequency.setValueAtTime(tube.freqHz, now)
    // subtle organic pitch glide on air compression entrance
    oscFundamental.frequency.exponentialRampToValueAtTime(tube.freqHz * 0.99, now + 0.03)
    oscFundamental.frequency.setValueAtTime(tube.freqHz, now + 0.06)

    oscHarmonic.type = 'sine'
    oscHarmonic.frequency.setValueAtTime(tube.freqHz * 3, now) // Odd harmonic for stopped cylinder

    const harmonicGain = ctx.createGain()
    harmonicGain.gain.setValueAtTime(0.12, now)
    oscHarmonic.connect(harmonicGain)

    bambooGain.gain.setValueAtTime(0.001, now)
    bambooGain.gain.linearRampToValueAtTime(0.28 * gainFactor, now + 0.025)
    bambooGain.gain.exponentialRampToValueAtTime(0.001, now + reverbDurationSec * 2.8)

    oscFundamental.connect(bambooGain)
    harmonicGain.connect(bambooGain)
    bambooGain.connect(ctx.destination)

    oscFundamental.start(now)
    oscHarmonic.start(now)
    oscFundamental.stop(now + reverbDurationSec * 3)
    oscHarmonic.stop(now + reverbDurationSec * 3)
  }

  // Play full traditional highland song motif
  const playTraditionalMotif = () => {
    if (isPlayingMelody) return
    setIsPlayingMelody(true)

    // Sequence: Gong call motif (1, 3, 4, 5, 4, 3, 1, 4, 6)
    const sequence = [
      { tubeId: 1, delay: 0 },
      { tubeId: 3, delay: 400 },
      { tubeId: 4, delay: 800 },
      { tubeId: 5, delay: 1200 },
      { tubeId: 4, delay: 1650 },
      { tubeId: 3, delay: 2000 },
      { tubeId: 1, delay: 2400 },
      { tubeId: 4, delay: 2900 },
      { tubeId: 6, delay: 3400 },
      { tubeId: 5, delay: 4000 },
      { tubeId: 1, delay: 4600 },
    ]

    sequence.forEach((item, index) => {
      const tid = setTimeout(() => {
        const target = KLONG_PUT_TUBES.find((t) => t.id === item.tubeId)
        if (target) triggerTubeSound(target)
        if (index === sequence.length - 1) {
          setIsPlayingMelody(false)
        }
      }, item.delay)
      melodyTimeoutIdsRef.current.push(tid)
    })
  }

  const currentLighting = LIGHTING_SCENARIOS[selectedLighting]

  return (
    <section className={cn('relative py-24 bg-[#0a0d08] text-[#f5f7f0] overflow-hidden border-t border-b border-[#232b1a]', className)}>
      {/* Background Ambient Mood Lighting Gradient */}
      <div className={cn('absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] transition-all duration-1000', currentLighting.ambientHex)} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#182212] border border-[#2f3f24] text-[#a4c988] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#a4c988] animate-pulse" />
            Âm Học Khí Động Học & Nhạc Cụ Tre Lồ Ô
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fbfdf7] tracking-tight leading-tight">
            Thính Phòng Đàn Klông Pút Tre Lồ Ô <br className="hidden sm:inline" />
            <span className="italic font-light text-[#c2d79b]">Tiếng Vỗ Khí Rừng Sâu & Vòm Sa Mộc RT60 0.36s</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a2b596] leading-relaxed">
            Tôn vinh cây đàn Klông Pút độc bản chế tác từ những ống tre lồ ô đại ngàn Tây Nguyên (dài từ 76cm đến 180cm). Âm thanh ngân vang không nhờ chạm tay mà phát khởi từ luồng áp suất khí của hai lòng bàn tay khum vỗ trước miệng ống. Hệ vách tán âm ốp gỗ Sa Mộc thơm ngát vát góc hữu cơ triệt tiêu hoàn toàn sóng đứng, lưu giữ độ vang thuần khiết.
          </p>
        </div>

        {/* Master Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 7 Bamboo Tubes Stage & Air Clapping Simulator (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#131b0f] to-[#0c1209] border border-[#27361e] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Top Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1f2b18]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a4c988]" />
                  <div>
                    <span className="text-xs font-mono text-[#8a9e7d] uppercase tracking-wider block">Vi Khí Hậu Bảo Tồn Tre</span>
                    <span className="text-sm font-semibold text-[#f5f7f0]">60% RH · 22.0°C (Chống Nứt Vỡ Vách Tre)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={playTraditionalMotif}
                    disabled={isPlayingMelody}
                    className={cn(
                      'min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 border flex items-center gap-2',
                      isPlayingMelody
                        ? 'bg-[#a4c988]/20 border-[#a4c988] text-[#f5f7f0]'
                        : 'bg-[#1b2515] border-[#304124] text-[#a4c988] hover:border-[#a4c988] hover:bg-[#23311c]'
                    )}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      {isPlayingMelody ? (
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      ) : (
                        <path d="M8 5v14l11-7z" />
                      )}
                    </svg>
                    {isPlayingMelody ? 'Đang Diễn Tấu Điệu Rừng' : 'Diễn Tấu Điệu Suối Ngàn'}
                  </button>
                </div>
              </div>

              {/* 7 Bamboo Tubes Visual Display & Click to Clap Air */}
              <div className="py-8">
                <div className="flex items-end justify-between gap-2 sm:gap-4 h-72 sm:h-80 px-2 sm:px-6 bg-[#080c06] rounded-xl border border-[#1b2615] relative overflow-hidden">
                  {/* Gentle Air Glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#a4c988] via-transparent to-transparent" />

                  {KLONG_PUT_TUBES.map((tube) => {
                    const isActive = activeTubeId === tube.id
                    // Height proportional to length
                    const heightPercent = (tube.lengthCm / 180) * 85 + 15
                    return (
                      <div key={tube.id} className="relative flex-1 flex flex-col items-center justify-end h-full group">
                        {/* Clapping Air Hand Visual Cue */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -15, scale: 0.8 }}
                              className="absolute top-2 z-20 text-[10px] font-mono text-[#a4c988] bg-[#1a2514] border border-[#a4c988] px-2 py-0.5 rounded shadow-lg whitespace-nowrap"
                            >
                              Vỗ Khí {tube.freqHz.toFixed(0)}Hz
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Interactive Tube Column */}
                        <button
                          type="button"
                          onClick={() => triggerTubeSound(tube)}
                          aria-label={`Vỗ khí ống tre ${tube.pitchName} nốt ${tube.note}`}
                          style={{ height: `${heightPercent}%` }}
                          className={cn(
                            'w-full max-w-[48px] rounded-t-lg transition-all duration-300 relative flex flex-col justify-between items-center py-2 group-hover:brightness-110 active:scale-95 border cursor-pointer',
                            isActive
                              ? 'bg-gradient-to-t from-[#5a7c3e] to-[#a4c988] border-[#c2e49c] shadow-[0_0_20px_rgba(164,201,136,0.4)]'
                              : 'bg-gradient-to-t from-[#202b17] via-[#2f3f22] to-[#435930] border-[#3e522c] hover:border-[#678847]'
                          )}
                        >
                          {/* Bamboo Joint Ring Lines */}
                          <div className="w-full h-1 bg-[#1a2313] opacity-60 rounded-full my-auto" />
                          <div className="w-full h-1 bg-[#1a2313] opacity-60 rounded-full my-auto" />

                          {/* Top Tube Aperture Hole */}
                          <div className={cn('w-4/5 h-2.5 rounded-full border mb-1 transition-colors', isActive ? 'bg-[#c2e49c] border-white' : 'bg-[#151c0e] border-[#4f6737]')} />

                          {/* Tube Label */}
                          <span className={cn('text-[10px] sm:text-xs font-mono font-bold block', isActive ? 'text-[#0a0f07]' : 'text-[#c2d79b]')}>
                            {tube.note.split(' ')[0]}
                          </span>
                        </button>

                        {/* Tube Subtext */}
                        <div className="mt-2 text-center">
                          <span className="text-[10px] font-mono text-[#788f6b] block">{tube.lengthCm}cm</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-3 text-center text-xs text-[#8a9e7d]">
                  Chạm hoặc click vào từng ống tre lồ ô để nghe tiếng vỗ luồng khí hai lòng bàn tay qua Web Audio API.
                </div>
              </div>

              {/* Technical Acoustic Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1f2b18]">
                <div className="p-3 rounded-xl bg-[#0d130a] border border-[#202b17]">
                  <span className="text-[10px] text-[#718664] uppercase font-mono block">Vật Liệu Ống</span>
                  <span className="text-sm font-semibold text-[#f5f7f0]">Tre Lồ Ô Già</span>
                  <span className="text-[10px] text-[#55694a] block mt-0.5">Rừng Gia Lai 5 năm tuổi</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0d130a] border border-[#202b17]">
                  <span className="text-[10px] text-[#718664] uppercase font-mono block">Thời Gian Vang</span>
                  <span className="text-sm font-mono font-bold text-[#a4c988]">RT60 = {reverbDurationSec}s</span>
                  <span className="text-[10px] text-[#55694a] block mt-0.5">Tiêu chuẩn thính phòng</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0d130a] border border-[#202b17]">
                  <span className="text-[10px] text-[#718664] uppercase font-mono block">Vách Tán Âm</span>
                  <span className="text-sm font-semibold text-[#f5f7f0]">Gỗ Sa Mộc</span>
                  <span className="text-[10px] text-[#55694a] block mt-0.5">Vát góc hữu cơ tán xạ</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0d130a] border border-[#202b17]">
                  <span className="text-[10px] text-[#718664] uppercase font-mono block">Thang Âm</span>
                  <span className="text-sm font-semibold text-[#c2d79b]">Điệu Cồng Chiêng</span>
                  <span className="text-[10px] text-[#55694a] block mt-0.5">7 ống tương ứng 7 nốt</span>
                </div>
              </div>
            </div>

            {/* Architectural Rationale */}
            <div className="p-6 rounded-2xl bg-[#0f150c] border border-[#222e19] text-sm text-[#95a88a] space-y-3">
              <h3 className="text-base font-serif text-[#fbfdf7] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#a4c988] rounded-full" />
                Âm Học Khí Nén & Nghệ Thuật Không Tiếp Xúc
              </h3>
              <p className="leading-relaxed">
                Đàn Klông Pút là nhạc cụ bộ hơi độc nhất vô nhị: âm thanh tạo nên từ cột không khí cộng hưởng bên trong lòng ống tre khi lòng bàn tay khép kín vỗ cách miệng ống 8 - 10cm. Sóng âm phát tán đa hướng với áp suất âm trầm ấm. Để giữ trọn vẹn dải tần 130Hz - 300Hz không bị dội âm hỗn loạn, GuHomes sử dụng gỗ Sa Mộc xẻ nan vát góc 37 độ trên trần và vách, đem lại độ phản xạ mịn màng tuyệt đối.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Acoustics & Lighting Scenario Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Lighting Scenarios */}
            <div className="rounded-2xl bg-[#131b0f] border border-[#27361e] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#8a9e7d]">
                Kịch Bản Ánh Sáng Thính Phòng (CRI 98)
              </h3>

              <div className="space-y-3">
                {(Object.keys(LIGHTING_SCENARIOS) as BonfireLighting[]).map((key) => {
                  const sc = LIGHTING_SCENARIOS[key]
                  const isSelected = selectedLighting === key
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setSelectedLighting(key)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#1e2a16] border-[#a4c988] shadow-[0_0_15px_rgba(164,201,136,0.18)]'
                          : 'bg-[#0c1208] border-[#1d2716] hover:border-[#2f3f24]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fbfdf7] font-semibold' : 'text-[#c6d7bd]')}>
                          {sc.title}
                        </span>
                        <span className="text-xs font-mono text-[#a4c988] font-bold">
                          {sc.cctKelvin}K
                        </span>
                      </div>
                      <p className="text-xs text-[#8fa284] mt-1.5 leading-relaxed">
                        {sc.subtext}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tuning Sliders */}
            <div className="rounded-2xl bg-[#131b0f] border border-[#27361e] p-6 shadow-xl space-y-5">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#8a9e7d]">
                Tinh Chỉnh Âm Học Thính Phòng
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#8a9e7d]">Lực Vỗ Khí Lòng Bàn Tay</span>
                    <span className="text-[#a4c988] font-bold">{airClapIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="5"
                    value={airClapIntensity}
                    onChange={(e) => setAirClapIntensity(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#1b2515] rounded-lg appearance-none cursor-pointer accent-[#a4c988]"
                    aria-label="Điều chỉnh lực vỗ khí"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#8a9e7d]">Thời Gian Ngân Vang Vòm Sa Mộc (RT60)</span>
                    <span className="text-[#a4c988] font-bold">{reverbDurationSec.toFixed(2)}s</span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="0.55"
                    step="0.01"
                    value={reverbDurationSec}
                    onChange={(e) => setReverbDurationSec(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#1b2515] rounded-lg appearance-none cursor-pointer accent-[#a4c988]"
                    aria-label="Điều chỉnh thời gian vang RT60"
                  />
                </div>
              </div>

              {/* Consultation Link */}
              <div className="pt-2">
                <a
                  href="/contact"
                  className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#a4c988] to-[#7f9f64] text-[#0b1007] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
                >
                  Tư Vấn Thiết Kế Thính Phòng Âm Nhạc Truyền Thống
                </a>
              </div>
            </div>

            {/* Atelier Craftsmanship Trust Badge */}
            <div className="p-4 rounded-2xl bg-[#0f150c] border border-[#222e19] text-xs text-[#8a9e7d] flex items-center justify-between">
              <div>
                <span className="text-[#fbfdf7] font-serif block">GuHomes Acoustic Sanctuary Lab</span>
                <span className="text-[11px] text-[#697d5e]">Xưởng Mộc Thạnh Xuân Q.12 · 1.200m²</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#a4c988] font-mono hover:underline min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
