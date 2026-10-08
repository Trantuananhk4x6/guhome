'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NostalgicPiece {
  id: string
  title: string
  composer: string
  instrumentation: string
  tempoBpm: number
  description: string
  notes: { freq: number; duration: number }[]
}

const NOSTALGIC_PIECES: NostalgicPiece[] = [
  {
    id: 'valse-amelie',
    title: "La Valse d'Amélie",
    composer: 'Yann Tiersen',
    instrumentation: 'Accordion Castelfidardo & Hộp Nhạc 72 Nốt',
    tempoBpm: 104,
    description: 'Bản valse Paris hoài niệm mang nhịp thở nhấp nhô của hộp gió da cừu, hòa quyện chuông bạc tí tách như hạt mưa mùa thu trên mái ngói Montmartre.',
    notes: [
      { freq: 440.00, duration: 0.35 },
      { freq: 493.88, duration: 0.35 },
      { freq: 523.25, duration: 0.35 },
      { freq: 587.33, duration: 0.35 },
      { freq: 659.25, duration: 0.70 },
      { freq: 523.25, duration: 0.35 },
      { freq: 440.00, duration: 0.70 },
      { freq: 392.00, duration: 0.35 },
      { freq: 440.00, duration: 0.70 },
    ],
  },
  {
    id: 'libertango',
    title: 'Libertango',
    composer: 'Astor Piazzolla',
    instrumentation: 'Bandoneon & Accordion Solo',
    tempoBpm: 128,
    description: 'Âm sắc Tango rực lửa và sắc lẹm, lưỡi gà đồng phosphor rung động với lực nén mạnh mẽ lan tỏa qua hệ nan gỗ Óc Chó tán âm.',
    notes: [
      { freq: 440.00, duration: 0.25 },
      { freq: 493.88, duration: 0.25 },
      { freq: 523.25, duration: 0.25 },
      { freq: 493.88, duration: 0.25 },
      { freq: 440.00, duration: 0.25 },
      { freq: 392.00, duration: 0.25 },
      { freq: 440.00, duration: 0.50 },
      { freq: 523.25, duration: 0.25 },
      { freq: 587.33, duration: 0.50 },
    ],
  },
  {
    id: 'canon-in-d',
    title: 'Canon in D Major (Sainte-Croix Music Box)',
    composer: 'Johann Pachelbel',
    instrumentation: 'Hộp Nhạc Cơ Khí Thụy Sĩ Reuge 72 Nốt',
    tempoBpm: 88,
    description: 'Âm thanh tinh khiết từng chiếc gai thép gảy răng lược âm học, vang lên thanh thoát tĩnh mịch tuyệt đối.',
    notes: [
      { freq: 587.33, duration: 0.4 },
      { freq: 523.25, duration: 0.4 },
      { freq: 493.88, duration: 0.4 },
      { freq: 440.00, duration: 0.4 },
      { freq: 392.00, duration: 0.4 },
      { freq: 349.23, duration: 0.4 },
      { freq: 392.00, duration: 0.4 },
      { freq: 440.00, duration: 0.8 },
    ],
  },
]

type ParisLightingMode = 'cafe-flore' | 'montmartre-rain' | 'seine-moonlight'

interface ParisLightingTheme {
  id: ParisLightingMode
  name: string
  kelvin: number
  description: string
  bgGradient: string
  accentColor: string
}

const PARIS_LIGHTING_THEMES: Record<ParisLightingMode, ParisLightingTheme> = {
  'cafe-flore': {
    id: 'cafe-flore',
    name: 'Café de Flore Hoàng Hôn',
    kelvin: 2700,
    description: 'Ánh đèn vàng mật ong 2700K bên góc phố Paris, ấm áp sưởi ấm bề mặt gỗ Óc Chó tự nhiên.',
    bgGradient: 'from-amber-950/40 via-stone-900 to-black',
    accentColor: '#d4af37',
  },
  'montmartre-rain': {
    id: 'montmartre-rain',
    name: 'Mưa Đêm Montmartre',
    kelvin: 2200,
    description: 'Ánh nến lung linh 2200K soi bóng qua cửa kính mờ sương, tĩnh mịch và sâu lắng.',
    bgGradient: 'from-orange-950/40 via-stone-900 to-black',
    accentColor: '#ea580c',
  },
  'seine-moonlight': {
    id: 'seine-moonlight',
    name: 'Ánh Trăng Sông Seine',
    kelvin: 3200,
    description: 'Ánh trăng bàng bạc 3200K chiếu rọi các phím đàn xà cừ và trống gai cơ khí mạ vàng Thụy Sĩ.',
    bgGradient: 'from-slate-900 via-stone-950 to-black',
    accentColor: '#94a3b8',
  },
}

export function SaigonAcousticAccordionAndMusicBoxSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPieceId, setSelectedPieceId] = useState<string>(NOSTALGIC_PIECES[0]!.id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lighting, setLighting] = useState<ParisLightingMode>('cafe-flore')
  const [bellowsExpansion, setBellowsExpansion] = useState(65) // 0 - 100%
  const [musicBoxWind, setMusicBoxWind] = useState(80) // 0 - 100%
  const [bookingSent, setBookingSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const pieceTimeouts = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      pieceTimeouts.current.forEach((t) => clearTimeout(t))
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

  // Synthesize Reedy Accordion Free-Reed or Music Box Tone
  function playAcousticTone(freq: number, duration: number = 0.6, isMusicBox: boolean = false) {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const masterGain = ctx.createGain()
    masterGain.connect(ctx.destination)

    if (isMusicBox) {
      // High chime-like sine with natural pure bell decay
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq * 2, now) // 1 octave higher for music box comb

      const noteGain = ctx.createGain()
      noteGain.gain.setValueAtTime(0.001, now)
      noteGain.gain.linearRampToValueAtTime(0.3, now + 0.003)
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.4)

      osc.connect(noteGain)
      noteGain.connect(masterGain)

      osc.start(now)
      osc.stop(now + duration + 0.45)
    } else {
      // Rich Accordion reed tone: blend of sawtooth and square with slight vibrato
      const osc1 = ctx.createOscillator()
      osc1.type = 'sawtooth'
      osc1.frequency.setValueAtTime(freq, now)

      const osc2 = ctx.createOscillator()
      osc2.type = 'square'
      osc2.frequency.setValueAtTime(freq * 1.002, now) // Subtle detuning for musette chorus effect

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(3200 * (bellowsExpansion / 100 + 0.3), now)

      const noteGain = ctx.createGain()
      noteGain.gain.setValueAtTime(0.001, now)
      noteGain.gain.linearRampToValueAtTime(0.25, now + 0.03) // Bellows swell
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      osc1.connect(filter)
      osc2.connect(filter)
      filter.connect(noteGain)
      noteGain.connect(masterGain)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + duration + 0.05)
      osc2.stop(now + duration + 0.05)
    }
  }

  // Winding up mechanical music box spring ratchet sound
  function handleWindMusicBox() {
    setMusicBoxWind((prev) => Math.min(prev + 20, 100))
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Quick ratchet mechanical click
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1800, now)
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.04)
  }

  function playPiece(piece: NostalgicPiece) {
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []

    setIsPlaying(true)
    let accumTime = 0
    const isBox = piece.id === 'canon-in-d'

    piece.notes.forEach((item, idx) => {
      const t = setTimeout(() => {
        playAcousticTone(item.freq, item.duration, isBox)
        if (idx === piece.notes.length - 1) {
          setIsPlaying(false)
        }
      }, accumTime * 1000)
      pieceTimeouts.current.push(t)
      accumTime += item.duration
    })
  }

  function stopPiece() {
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []
    setIsPlaying(false)
  }

  const selectedPiece = NOSTALGIC_PIECES.find((p) => p.id === selectedPieceId) ?? NOSTALGIC_PIECES[0]!
  const currentTheme = PARIS_LIGHTING_THEMES[lighting]

  return (
    <section
      aria-labelledby="accordion-sanctuary-heading"
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 md:p-12 text-stone-200 shadow-2xl transition-colors duration-700',
        className
      )}
    >
      {/* Background Ambience Sky Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 transition-all duration-700',
          currentTheme.bgGradient
        )}
      />

      {/* Radial Glow Halo */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: currentTheme.accentColor }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            <span>Castelfidardo Accordion & Sainte-Croix Music Box · RT60 = 0.35s · American Walnut</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                id="accordion-sanctuary-heading"
                className="text-2xl md:text-4xl font-serif font-light tracking-tight text-stone-100"
              >
                Phòng Hòa Âm Đàn Accordion & Hộp Nhạc Cơ Khí Thụy Sĩ
              </h2>
              <p className="mt-2 text-sm md:text-base text-stone-400 max-w-2xl font-light leading-relaxed">
                Nhịp thở cơ khí và giai điệu hoài niệm. Đại thính phòng tôn vinh cây đàn Accordion chế tác thủ công Castelfidardo (Ý) với hộp gió da cừu tự nhiên và hộp nhạc 72 nốt Sainte-Croix (Thụy Sĩ). Vách tán âm gỗ Óc Chó (American Walnut) đạt RT60 = 0.35s, kết hợp tủ vi khí hậu 50% RH &amp; 21°C bảo tồn lớp keo hữu cơ truyền thống.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                RT60 Âm Học: <strong className="text-amber-400">0.35 giây</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Vi khí hậu: <strong className="text-amber-400">50% RH · 21.0°C</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Xuất xứ: <strong className="text-amber-400">Ý &amp; Thụy Sĩ</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Bellows & Repertoire Player (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Accordion Bellows Simulation */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-800">
                <span className="font-mono text-amber-300 uppercase tracking-wider">
                  Hộp Gió Da Cừu & Lưỡi Gà Đồng Phosphor
                </span>
                <span className="text-stone-400">
                  Độ giãn hộp gió: <strong className="text-amber-300 font-mono">{bellowsExpansion}%</strong>
                </span>
              </div>

              {/* Bellows Visual Canvas */}
              <div className="relative h-44 w-full rounded-xl bg-[#140e0a] border border-stone-800 p-4 flex items-center justify-between overflow-hidden shadow-inner">
                {/* Left Treble Keyboard End */}
                <div className="h-full w-14 rounded-lg bg-gradient-to-r from-stone-900 to-stone-800 border border-amber-600/40 p-2 flex flex-col justify-between items-center z-10 shadow-lg">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-[9px] font-mono text-amber-200/80 -rotate-90">TREBLE</span>
                  <div className="space-y-1 w-full">
                    <div className="h-1 bg-white/60 rounded" />
                    <div className="h-1 bg-white/60 rounded" />
                    <div className="h-1 bg-black rounded" />
                  </div>
                </div>

                {/* Animated Accordion Bellows Pleats */}
                <div className="flex-1 flex justify-center items-center h-full px-2 overflow-hidden">
                  <div
                    className="flex h-32 items-center justify-between transition-all duration-300"
                    style={{ width: `${Math.max(bellowsExpansion, 35)}%` }}
                  >
                    {[...Array(14)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-full w-2 border-r border-amber-500/40 transition-all',
                          i % 2 === 0
                            ? 'bg-gradient-to-b from-red-950 via-stone-900 to-red-950'
                            : 'bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900'
                        )}
                        style={{
                          transform: `scaleX(${bellowsExpansion / 100})`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Bass Buttons End */}
                <div className="h-full w-14 rounded-lg bg-gradient-to-l from-stone-900 to-stone-800 border border-amber-600/40 p-2 flex flex-col justify-between items-center z-10 shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-amber-200/60" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-amber-200/80 rotate-90">BASS</span>
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                </div>
              </div>

              {/* Bellows Air Pressure Slider */}
              <div className="space-y-1.5 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <div className="flex justify-between text-xs text-stone-300">
                  <label htmlFor={`${formId}-bellows`}>Điều Chỉnh Độ Nén Khí Hộp Gió (Air Pressure)</label>
                  <span className="font-mono text-amber-400">{bellowsExpansion}%</span>
                </div>
                <input
                  id={`${formId}-bellows`}
                  type="range"
                  min="20"
                  max="100"
                  value={bellowsExpansion}
                  onChange={(e) => setBellowsExpansion(Number(e.target.value))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Music Box Wind-up Mechanism */}
              <div className="flex items-center justify-between bg-stone-950/80 p-3 rounded-xl border border-stone-800 text-xs">
                <div>
                  <strong className="text-stone-200">Hộp Nhạc Cơ Khí Reuge 72 Nốt Thụy Sĩ</strong>
                  <p className="text-[11px] text-stone-400">Dây cót cơ khí: {musicBoxWind}% năng lượng lưu trữ</p>
                </div>
                <button
                  type="button"
                  onClick={handleWindMusicBox}
                  className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-medium transition-all min-h-[44px]"
                >
                  Lên Dây Cót Cơ Khí
                </button>
              </div>
            </div>

            {/* Nostalgic Pieces Player */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                  Tuyển Tập Kiệt Tác Hoài Niệm
                </span>
                <span className="text-xs text-amber-400 font-mono">{selectedPiece.instrumentation}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {NOSTALGIC_PIECES.map((piece) => {
                  const isCur = piece.id === selectedPieceId
                  return (
                    <button
                      key={piece.id}
                      type="button"
                      onClick={() => {
                        setSelectedPieceId(piece.id)
                        if (isPlaying) {
                          playPiece(piece)
                        }
                      }}
                      className={cn(
                        'text-left p-3 rounded-xl border text-xs transition-all min-h-[44px] flex flex-col justify-between',
                        isCur
                          ? 'border-amber-500/60 bg-amber-500/10 text-stone-100 shadow'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <span className="font-serif font-medium line-clamp-1 text-stone-200">{piece.title}</span>
                      <span className="text-[11px] text-stone-500 mt-1">{piece.composer}</span>
                    </button>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-stone-400 leading-relaxed font-light">{selectedPiece.description}</p>
                <div className="flex gap-2 shrink-0">
                  {isPlaying ? (
                    <button
                      type="button"
                      onClick={stopPiece}
                      className="px-5 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium transition-all min-h-[44px] shadow"
                    >
                      Tạm dừng bản nhạc
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => playPiece(selectedPiece)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-all min-h-[44px] shadow"
                    >
                      Khởi tấu giai điệu ({selectedPiece.title.split(' ')[0]})
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lighting Scenarios & Acoustic Engineering (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Lighting Scenarios Panel */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Kịch Bản Chiếu Sáng Dạ Khúc Paris Cổ Điển
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(PARIS_LIGHTING_THEMES) as ParisLightingMode[]).map((key) => {
                  const th = PARIS_LIGHTING_THEMES[key]
                  const isCur = lighting === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setLighting(key)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border text-xs transition-all min-h-[44px] flex items-center justify-between',
                        isCur
                          ? 'border-amber-500/70 bg-stone-900 text-stone-100 shadow-md'
                          : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:bg-stone-900/50'
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: th.accentColor }}
                          />
                          <strong className="font-medium text-stone-200">{th.name}</strong>
                          <span className="text-[10px] font-mono text-amber-400/90">{th.kelvin}K</span>
                        </div>
                        <p className="text-[11px] text-stone-400 font-light">{th.description}</p>
                      </div>
                      <span className="text-stone-500 text-sm ml-2">→</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Acoustic Engineering & Woodcraft Specifications */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Vật Liệu Âm Học & Tủ Kính Vi Khí Hậu
              </span>

              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Vòm tán âm gỗ Óc Chó (American Walnut):</strong> Rãnh âm học chữ V sâu 15mm triệt tiêu tạp âm tần số trung và cộng hưởng trầm ấm cho tiếng gió đàn.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Lưỡi gà đồng phosphor Castelfidardo:</strong> Gia công tay thủ công tại thủ phủ đàn Accordion nước Ý, cho độ nhạy áp lực hơi thở vô song.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Tủ kính vi khí hậu 50% RH &amp; 21°C:</strong> Cân bằng ẩm điện tử ngầm ngăn khô giòn lớp da cừu và chảy keo hữu cơ trong khí hậu nhiệt đới Sài Gòn.
                  </span>
                </li>
              </ul>
            </div>

            {/* Booking Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  Đăng Ký Tư Vấn Thính Phòng Accordion & Hộp Nhạc
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Khảo sát thiết kế salon âm nhạc hoài niệm chuẩn âm học RT60 0.35s cho biệt thự và penthouse.
                </p>
              </div>

              {bookingSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã ghi nhận lịch hẹn của Quý khách. Chuyên gia âm học sẽ liên hệ trong vòng 4 giờ làm việc.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setBookingSent(true)
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
                        placeholder="Đặng Hoàng Long"
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
                        placeholder="0908 xxx xxx"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-room-scale`} className="block text-[11px] text-stone-400 mb-1">
                      Mục đích không gian
                    </label>
                    <select
                      id={`${formId}-room-scale`}
                      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 focus:border-amber-400 focus:outline-none min-h-[44px]"
                    >
                      <option value="listening-salon">Salon thưởng nhạc Accordion & Hộp nhạc (25m² - 45m²)</option>
                      <option value="living-center">Đại sảnh trưng bày nhạc cụ cổ điển kết hợp tủ vi khí hậu</option>
                      <option value="recording-studio">Phòng thu âm chuyên biệt nhạc cụ khí cơ khí</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Gửi Yêu Cầu Thiết Kế Thính Phòng Hoài Niệm</span>
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
