'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BaroquePiece {
  id: string
  title: string
  composer: string
  era: string
  tempoBpm: number
  description: string
  notes: { freq: number; duration: number }[]
}

const BAROQUE_PIECES: BaroquePiece[] = [
  {
    id: 'bach-prelude-c',
    title: 'The Well-Tempered Clavier, Book 1: Prelude in C Major (BWV 846)',
    composer: 'Johann Sebastian Bach',
    era: 'Baroque Đức (1722)',
    tempoBpm: 108,
    description: 'Dải hợp âm rải bất hủ lan tỏa qua vòm tán âm parabol, âm sắc lông quạ gảy dây đồng thau mang độ trong suốt vô song.',
    notes: [
      { freq: 261.63, duration: 0.28 },
      { freq: 329.63, duration: 0.28 },
      { freq: 392.00, duration: 0.28 },
      { freq: 523.25, duration: 0.28 },
      { freq: 659.25, duration: 0.28 },
      { freq: 392.00, duration: 0.28 },
      { freq: 523.25, duration: 0.28 },
      { freq: 659.25, duration: 0.28 },
      { freq: 261.63, duration: 0.28 },
      { freq: 329.63, duration: 0.28 },
      { freq: 392.00, duration: 0.28 },
      { freq: 523.25, duration: 0.28 },
      { freq: 659.25, duration: 0.28 },
      { freq: 392.00, duration: 0.28 },
      { freq: 523.25, duration: 0.28 },
      { freq: 659.25, duration: 0.56 },
    ],
  },
  {
    id: 'rameau-sauvages',
    title: 'Nouvelles Suites: Les Sauvages',
    composer: 'Jean-Philippe Rameau',
    era: 'Baroque Pháp (1727)',
    tempoBpm: 120,
    description: 'Nhịp điệu dồn dập đầy sức sống của triều đình Versailles, kết hợp âm bass dội sâu từ tầng phím Lower Manual 8\' + 4\'.',
    notes: [
      { freq: 440.00, duration: 0.35 },
      { freq: 440.00, duration: 0.18 },
      { freq: 493.88, duration: 0.18 },
      { freq: 523.25, duration: 0.35 },
      { freq: 440.00, duration: 0.35 },
      { freq: 587.33, duration: 0.35 },
      { freq: 523.25, duration: 0.18 },
      { freq: 493.88, duration: 0.18 },
      { freq: 440.00, duration: 0.54 },
      { freq: 392.00, duration: 0.35 },
      { freq: 440.00, duration: 0.70 },
    ],
  },
  {
    id: 'vivaldi-spring',
    title: 'The Four Seasons: Spring (La Primavera - Allegro)',
    composer: 'Antonio Vivaldi',
    era: 'Baroque Ý (1723)',
    tempoBpm: 112,
    description: 'Giai điệu rực rỡ hoan ca đón mừng mùa xuân, tiếng gảy dây kim loại thánh thót như giọt sương mai trên cành lộc non.',
    notes: [
      { freq: 659.25, duration: 0.4 },
      { freq: 659.25, duration: 0.2 },
      { freq: 659.25, duration: 0.2 },
      { freq: 622.25, duration: 0.2 },
      { freq: 659.25, duration: 0.4 },
      { freq: 587.33, duration: 0.4 },
      { freq: 523.25, duration: 0.8 },
      { freq: 659.25, duration: 0.4 },
      { freq: 587.33, duration: 0.2 },
      { freq: 523.25, duration: 0.2 },
      { freq: 493.88, duration: 0.4 },
      { freq: 523.25, duration: 0.8 },
    ],
  },
]

type LightingPreset = 'versailles' | 'saigon-morning' | 'royal-nocturne'

interface LightingTheme {
  id: LightingPreset
  name: string
  kelvin: number
  description: string
  bgGradient: string
  accentColor: string
}

const LIGHTING_THEMES: Record<LightingPreset, LightingTheme> = {
  versailles: {
    id: 'versailles',
    name: 'Nến Cung Điện Versailles',
    kelvin: 2200,
    description: 'Ánh nến lung linh 2200K phản chiếu mạ vàng lá 24K trên thân đàn Clavecin, tái hiện vũ hội quý tộc Pháp.',
    bgGradient: 'from-amber-950/40 via-stone-900 to-black',
    accentColor: '#d4af37',
  },
  'saigon-morning': {
    id: 'saigon-morning',
    name: 'Ban Mai Sài Gòn',
    kelvin: 3500,
    description: 'Nắng sớm lọc qua rèm lụa tơ tằm, nhiệt độ màu 3500K chiếu rọi vân gỗ Hồ Đào (Walnut) tự nhiên.',
    bgGradient: 'from-stone-900 via-neutral-900 to-black',
    accentColor: '#e0c097',
  },
  'royal-nocturne': {
    id: 'royal-nocturne',
    name: 'Dạ Khúc Hoàng Gia',
    kelvin: 1800,
    description: 'Ánh sáng mờ ảo 1800K tập trung duy nhất vào bàn phím 2 tầng mun đen viền ngà, tĩnh lặng tuyệt đối.',
    bgGradient: 'from-stone-950 via-zinc-950 to-black',
    accentColor: '#c5a059',
  },
}

interface KeyboardNote {
  note: string
  freq: number
  isSharp: boolean
  label: string
}

const KEYBOARD_NOTES: KeyboardNote[] = [
  { note: 'C4', freq: 261.63, isSharp: false, label: 'C' },
  { note: 'C#4', freq: 277.18, isSharp: true, label: 'C#' },
  { note: 'D4', freq: 293.66, isSharp: false, label: 'D' },
  { note: 'D#4', freq: 311.13, isSharp: true, label: 'D#' },
  { note: 'E4', freq: 329.63, isSharp: false, label: 'E' },
  { note: 'F4', freq: 349.23, isSharp: false, label: 'F' },
  { note: 'F#4', freq: 369.99, isSharp: true, label: 'F#' },
  { note: 'G4', freq: 392.00, isSharp: false, label: 'G' },
  { note: 'G#4', freq: 415.30, isSharp: true, label: 'G#' },
  { note: 'A4', freq: 440.00, isSharp: false, label: 'A' },
  { note: 'A#4', freq: 466.16, isSharp: true, label: 'A#' },
  { note: 'B4', freq: 493.88, isSharp: false, label: 'B' },
  { note: 'C5', freq: 523.25, isSharp: false, label: 'C5' },
  { note: 'C#5', freq: 554.37, isSharp: true, label: 'C#5' },
  { note: 'D5', freq: 587.33, isSharp: false, label: 'D5' },
  { note: 'D#5', freq: 622.25, isSharp: true, label: 'D#5' },
  { note: 'E5', freq: 659.25, isSharp: false, label: 'E5' },
]

export function SaigonAcousticHarpsichordSanctuarySalon({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPieceId, setSelectedPieceId] = useState<string>(BAROQUE_PIECES[0]!.id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeManual, setActiveManual] = useState<'upper' | 'lower'>('lower')
  const [luteStopEnabled, setLuteStopEnabled] = useState(false)
  const [lighting, setLighting] = useState<LightingPreset>('versailles')
  const [activeNoteName, setActiveNoteName] = useState<string | null>(null)
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

  // Synthesize Harpsichord plucked string timbre using Web Audio API
  function playHarpsichordTone(freq: number, duration: number = 0.8) {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const masterGain = ctx.createGain()
    masterGain.connect(ctx.destination)

    // Primary fundamental oscillator (triangle/saw blend)
    const osc1 = ctx.createOscillator()
    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(freq, now)

    // Higher harmonic oscillator (representing crisp feather quill attack)
    const osc2 = ctx.createOscillator()
    osc2.type = 'triangle'
    // If lower manual and lute stop is NOT on, add 4' octave stop
    const octaveMult = activeManual === 'lower' && !luteStopEnabled ? 2 : 1
    osc2.frequency.setValueAtTime(freq * octaveMult, now)

    // Lowpass filter to simulate wood soundboard resonance and lute stop damping
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    if (luteStopEnabled) {
      // Lute stop (damped felt)
      filter.frequency.setValueAtTime(1200, now)
    } else if (activeManual === 'upper') {
      // Upper 8' solo
      filter.frequency.setValueAtTime(3800, now)
    } else {
      // Lower 8' + 4' full ensemble
      filter.frequency.setValueAtTime(5200, now)
    }

    const noteGain = ctx.createGain()
    // Harpsichord sharp pluck attack (~3ms) and exponential decay
    noteGain.gain.setValueAtTime(0.0001, now)
    noteGain.gain.linearRampToValueAtTime(0.28, now + 0.004)
    // Plucked string decay curve
    const decayDuration = luteStopEnabled ? 0.35 : duration
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + decayDuration)

    // Key release mechanism click simulation
    const clickBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.015), ctx.sampleRate)
    const clickData = clickBuffer.getChannelData(0)
    for (let i = 0; i < clickBuffer.length; i++) {
      clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.003))
    }
    const clickSource = ctx.createBufferSource()
    clickSource.buffer = clickBuffer
    const clickGain = ctx.createGain()
    clickGain.gain.setValueAtTime(0.04, now)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(noteGain)
    noteGain.connect(masterGain)

    clickSource.connect(clickGain)
    clickGain.connect(masterGain)

    osc1.start(now)
    osc2.start(now)
    clickSource.start(now)

    osc1.stop(now + decayDuration + 0.05)
    osc2.stop(now + decayDuration + 0.05)
  }

  function handleKeyClick(note: KeyboardNote) {
    setActiveNoteName(note.note)
    playHarpsichordTone(note.freq, 0.7)
    setTimeout(() => {
      setActiveNoteName(null)
    }, 400)
  }

  function playBaroquePiece(piece: BaroquePiece) {
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []

    setIsPlaying(true)
    let accumTime = 0

    piece.notes.forEach((item, idx) => {
      const t = setTimeout(() => {
        playHarpsichordTone(item.freq, item.duration)
        if (idx === piece.notes.length - 1) {
          setIsPlaying(false)
        }
      }, accumTime * 1000)
      pieceTimeouts.current.push(t)
      accumTime += item.duration
    })
  }

  function stopBaroquePiece() {
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []
    setIsPlaying(false)
  }

  const selectedPiece = BAROQUE_PIECES.find((p) => p.id === selectedPieceId) ?? BAROQUE_PIECES[0]!
  const currentTheme = LIGHTING_THEMES[lighting]

  return (
    <section
      aria-labelledby="harpsichord-sanctuary-heading"
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 md:p-12 text-stone-200 shadow-2xl transition-colors duration-700',
        className
      )}
    >
      {/* Background Ambience Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 transition-all duration-700',
          currentTheme.bgGradient
        )}
      />

      {/* Acoustic Parabolic Radial Texture */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: currentTheme.accentColor }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            <span>Baroque Clavecin Chamber · RT60 = 0.34s · Val di Fiemme Spruce</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                id="harpsichord-sanctuary-heading"
                className="text-2xl md:text-4xl font-serif font-light tracking-tight text-stone-100"
              >
                Thính Phòng Đàn Clavecin Baroque & Vòm Tán Âm Hồ Đào
              </h2>
              <p className="mt-2 text-sm md:text-base text-stone-400 max-w-2xl font-light leading-relaxed">
                Đại sảnh âm hưởng hoàng gia thời Phục Hưng tôn vinh cây đàn Clavecin 2 tầng bàn phím thủ công phong cách Pháp TK 18. Soundboard gỗ Vân Sam Val di Fiemme hòa nhịp cùng vách tán âm Hồ Đào (Walnut) parabol, bảo chứng chuẩn vi khí hậu 50% RH chống cong vênh nhiệt đới Sài Gòn.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                RT60: <strong className="text-amber-400">0.34 giây</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Vi khí hậu: <strong className="text-amber-400">50% RH · 22.5°C</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Phím: <strong className="text-amber-400">Gỗ Mun & Viền Ngà</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Clavecin Keyboard & Stops (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Manual Controls & Register Stops */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                  Bộ Chuyển Tầng Bàn Phím (Dual Manuals)
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveManual('upper')}
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center font-medium',
                      activeManual === 'upper'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-stone-800/60 text-stone-400 hover:text-stone-200 border border-stone-700/50'
                    )}
                  >
                    Upper Manual (8&apos; Solo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveManual('lower')}
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center font-medium',
                      activeManual === 'lower'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-stone-800/60 text-stone-400 hover:text-stone-200 border border-stone-700/50'
                    )}
                  >
                    Lower Manual (8&apos; + 4&apos; Full)
                  </button>
                </div>
              </div>

              {/* Lute Stop Damper Toggle */}
              <div className="flex items-center justify-between text-xs text-stone-300">
                <div>
                  <span className="font-medium text-stone-200">Cần Gạt Giảm Âm Nỉ (Lute Stop / Peau de Buffle)</span>
                  <p className="text-[11px] text-stone-500">Kẹp đệm nỉ cừu áp sát dây đàn tạo âm sắc mộc mạc như đàn Lute cổ điển</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLuteStopEnabled(!luteStopEnabled)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-medium transition-all min-h-[44px] flex items-center gap-2',
                    luteStopEnabled
                      ? 'bg-amber-600 text-stone-950 font-semibold'
                      : 'bg-stone-800 text-stone-400 border border-stone-700 hover:text-stone-200'
                  )}
                >
                  <span className={cn('h-2 w-2 rounded-full', luteStopEnabled ? 'bg-black' : 'bg-stone-500')} />
                  {luteStopEnabled ? 'Đang bật Lute Stop' : 'Tắt'}
                </button>
              </div>
            </div>

            {/* Interactive Harpsichord Keyboard Visual */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">
                  Phím đàn: <strong className="text-amber-400">{activeManual === 'upper' ? 'Tầng Trên (8\')' : 'Tầng Dưới (8\' + 4\')'}</strong>
                </span>
                <span className="text-stone-500">Chạm hoặc click phím để nghe âm thanh gảy móng lông quạ</span>
              </div>

              {/* Reverse Harpsichord Keybed (Natural keys dark ebony, accidentals bone/ivory) */}
              <div className="relative flex justify-center overflow-x-auto pb-2 pt-1 select-none">
                <div className="relative flex bg-stone-950 p-3 rounded-xl border border-stone-800 shadow-inner">
                  {KEYBOARD_NOTES.map((k) => {
                    const isSharp = k.isSharp
                    const isActive = activeNoteName === k.note
                    if (isSharp) {
                      return (
                        <button
                          key={k.note}
                          type="button"
                          onClick={() => handleKeyClick(k)}
                          title={`Phím ${k.note} (${k.freq}Hz)`}
                          aria-label={`Phím Clavecin ${k.note}`}
                          className={cn(
                            'absolute z-20 h-24 w-6 -ml-3 rounded-b-md transition-all border border-amber-300/40 shadow-md flex flex-col justify-end items-center pb-2 min-h-[44px]',
                            isActive
                              ? 'bg-amber-300 text-stone-950 translate-y-1'
                              : 'bg-stone-200 hover:bg-amber-100 text-stone-800'
                          )}
                          style={{
                            left: `${(KEYBOARD_NOTES.filter((n, idx) => idx < KEYBOARD_NOTES.indexOf(k) && !n.isSharp).length) * 36 + 28}px`,
                          }}
                        >
                          <span className="text-[9px] font-mono font-bold">{k.label}</span>
                        </button>
                      )
                    }

                    return (
                      <button
                        key={k.note}
                        type="button"
                        onClick={() => handleKeyClick(k)}
                        title={`Phím ${k.note} (${k.freq}Hz)`}
                        aria-label={`Phím Clavecin ${k.note}`}
                        className={cn(
                          'relative z-10 h-36 w-9 rounded-b-lg border-r border-b border-l border-stone-800 transition-all flex flex-col justify-end items-center pb-2 min-h-[44px]',
                          isActive
                            ? 'bg-amber-600 text-stone-950 translate-y-1 shadow-lg'
                            : 'bg-stone-900 hover:bg-stone-800 text-stone-400'
                        )}
                      >
                        <span className="text-[10px] font-mono font-medium">{k.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Baroque Repertoire Player */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                  Tuyển Tập Kiệt Tác Baroque Mẫu
                </span>
                <span className="text-xs text-amber-400/90 font-mono">{selectedPiece.era}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {BAROQUE_PIECES.map((piece) => {
                  const isCur = piece.id === selectedPieceId
                  return (
                    <button
                      key={piece.id}
                      type="button"
                      onClick={() => {
                        setSelectedPieceId(piece.id)
                        if (isPlaying) {
                          playBaroquePiece(piece)
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
                      onClick={stopBaroquePiece}
                      className="px-5 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium transition-all min-h-[44px] shadow"
                    >
                      Tạm dừng bản nhạc
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => playBaroquePiece(selectedPiece)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-all min-h-[44px] shadow"
                    >
                      Khởi tấu kiệt tác ({selectedPiece.composer.split(' ').slice(-1)[0]})
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
                Kịch Bản Chiếu Sáng Thính Phòng (Chroma & CCT)
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(LIGHTING_THEMES) as LightingPreset[]).map((key) => {
                  const th = LIGHTING_THEMES[key]
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
                Vật Liệu Cổ Điển & Kỹ Thuật Vi Khí Hậu Sài Gòn
              </span>

              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Bảng cộng hưởng Vân Sam Val di Fiemme:</strong> Tuyển lựa cùng dòng gỗ chế tác vĩ cầm Stradivarius, thớ gỗ thẳng tắp dày 2.4mm phản hồi tức thì với dao động dải tần 120Hz – 8.000Hz.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Vòm tán âm Parabol gỗ Hồ Đào (Walnut):</strong> Uốn cong nhiệt nhiều lớp định hình sóng âm lan tỏa hình nón, kiểm soát triệt để hiện tượng hồi âm dội gắt (flutter echo).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Móng gảy lông quạ tự nhiên (Raven Quills):</strong> Tạo âm kích giòn giã đặc thù của nhạc cụ hoàng cung, bền bỉ qua hàng triệu chu kỳ dao động gảy dây đồng.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Buồng cân bằng ẩm ngầm 50% RH:</strong> Hệ thống cảm biến màng silica gel thông minh khử ẩm mùa mưa dầm và tạo ẩm vi lượng mùa khô Sài Gòn, giữ soundboard không nứt tách.
                  </span>
                </li>
              </ul>
            </div>

            {/* Booking & Consultation Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  Đăng Ký Trải Nghiệm Thính Phòng Âm Nhạc Cổ Điển
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Thưởng thức trực tiếp cây đàn Clavecin trong không gian tán âm mẫu tại Xưởng mộc 1.200m² Thạnh Xuân, Q.12 hoặc tư vấn lắp đặt cho tư gia.
                </p>
              </div>

              {bookingSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã ghi nhận lịch hẹn của Quý khách. KTS Trưởng sẽ liên hệ trong vòng 4 giờ làm việc để chuẩn bị đón tiếp.
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
                        placeholder="Nguyễn Hoàng Nam"
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
                        placeholder="0912 xxx xxx"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-sanctuary-scale`} className="block text-[11px] text-stone-400 mb-1">
                      Mục đích không gian
                    </label>
                    <select
                      id={`${formId}-sanctuary-scale`}
                      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 focus:border-amber-400 focus:outline-none min-h-[44px]"
                    >
                      <option value="listening-salon">Thính phòng thưởng nhạc Baroque tư gia (25m² - 50m²)</option>
                      <option value="living-centerpiece">Salon đại sảnh biệt thự kết hợp nhạc cụ Clavecin</option>
                      <option value="recording-studio">Phòng thu âm hi-fi chuẩn acoustics RT60 0.34s</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Gửi Yêu Cầu Tư Vấn & Đặt Lịch Thử Âm Học</span>
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
