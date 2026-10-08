'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TraditionalPiece {
  id: string
  title: string
  genre: string
  instrument: string
  tempoBpm: number
  description: string
  notes: { freq: number; duration: number }[]
}

const TRADITIONAL_PIECES: TraditionalPiece[] = [
  {
    id: 'luu-thuy-kim-tien',
    title: 'Lưu Thủy Kim Tiền',
    genre: 'Nhã Nhạc & Tài Tử Cố Đô',
    instrument: 'Đàn Tranh 19 Dây & Tỳ Bà',
    tempoBpm: 96,
    description: 'Âm điệu róc rách như dòng suối vàng lấp lánh, tiếng gảy móng đồi mồi nảy hạt giòn tan trên mặt gỗ Ngô Đồng Huế.',
    notes: [
      { freq: 293.66, duration: 0.3 }, // D4 (Hò)
      { freq: 329.63, duration: 0.3 }, // E4 (Xự)
      { freq: 392.00, duration: 0.3 }, // G4 (Xang)
      { freq: 440.00, duration: 0.3 }, // A4 (Xê)
      { freq: 493.88, duration: 0.3 }, // B4 (Cống)
      { freq: 587.33, duration: 0.4 }, // D5 (Hò cao)
      { freq: 493.88, duration: 0.3 },
      { freq: 440.00, duration: 0.3 },
      { freq: 392.00, duration: 0.3 },
      { freq: 329.63, duration: 0.3 },
      { freq: 293.66, duration: 0.6 },
    ],
  },
  {
    id: 'da-co-hoai-lang',
    title: 'Dạ Cổ Hoài Lang',
    genre: 'Đờn Ca Tài Tử Nam Bộ (Cao Văn Lầu)',
    instrument: 'Đàn Tranh Dây Tơ Ngũ Cung',
    tempoBpm: 68,
    description: 'Khúc ca vọng cổ hoài niệm thiết tha lúc đêm về, từng nốt rung ngân rung động tâm khảm giữa đại thính phòng tán âm RT60 0.35s.',
    notes: [
      { freq: 392.00, duration: 0.5 },
      { freq: 329.63, duration: 0.4 },
      { freq: 293.66, duration: 0.6 },
      { freq: 329.63, duration: 0.3 },
      { freq: 392.00, duration: 0.5 },
      { freq: 440.00, duration: 0.6 },
      { freq: 493.88, duration: 0.8 },
      { freq: 440.00, duration: 0.4 },
      { freq: 392.00, duration: 0.8 },
    ],
  },
  {
    id: 'thap-dien-mai-phuc',
    title: 'Thập Diện Mai Phục (Ambush from Ten Sides)',
    genre: 'Tỳ Bà Cổ Điển Vũ Khúc',
    instrument: 'Đàn Tỳ Bà Cổ Vàng',
    tempoBpm: 130,
    description: 'Nhịp điệu dồn dập hùng tráng tái hiện khí thế trận mạc, kỹ thuật vê ngón và đập thùng đàn Ngô Đồng vang dội uy nghi.',
    notes: [
      { freq: 440.00, duration: 0.2 },
      { freq: 440.00, duration: 0.2 },
      { freq: 493.88, duration: 0.2 },
      { freq: 523.25, duration: 0.2 },
      { freq: 587.33, duration: 0.3 },
      { freq: 587.33, duration: 0.2 },
      { freq: 659.25, duration: 0.2 },
      { freq: 587.33, duration: 0.2 },
      { freq: 493.88, duration: 0.3 },
      { freq: 440.00, duration: 0.6 },
    ],
  },
]

type LuteLightingMode = 'moonlight' | 'riverside-sunset' | 'hue-court'

interface LuteLightingTheme {
  id: LuteLightingMode
  name: string
  kelvin: number
  description: string
  bgGradient: string
  accentColor: string
}

const LUTE_LIGHTING_THEMES: Record<LuteLightingMode, LuteLightingTheme> = {
  moonlight: {
    id: 'moonlight',
    name: 'Đèn Lồng Trăng Rằm',
    kelvin: 2700,
    description: 'Ánh trăng rằm tháng Tám hòa nhịp cùng ánh đèn lồng giấy dó 2700K tạo nên không gian tao nhã tao khang.',
    bgGradient: 'from-amber-950/40 via-stone-900 to-black',
    accentColor: '#f59e0b',
  },
  'riverside-sunset': {
    id: 'riverside-sunset',
    name: 'Chiều Tà Ven Sông',
    kelvin: 2200,
    description: 'Ráng chiều hoàng hôn Sài Gòn rọi qua nan tre tán âm, nhiệt độ màu 2200K ấm áp nhuộm đỏ thớ gỗ Dáng Hương.',
    bgGradient: 'from-orange-950/40 via-stone-900 to-black',
    accentColor: '#ea580c',
  },
  'hue-court': {
    id: 'hue-court',
    name: 'Dạ Khúc Cố Đô',
    kelvin: 1900,
    description: 'Ánh nến cung đình cổ kính 1900K tập trung chiếu rọi bầu đàn Tỳ Bà cẩn xà cừ ngọc trai, tĩnh mịch lắng sâu.',
    bgGradient: 'from-stone-950 via-zinc-950 to-black',
    accentColor: '#d4af37',
  },
}

interface PentatonicString {
  id: number
  solfege: string
  toneName: string
  freq: number
  octave: number
}

// 19 strings of Dan Tranh (covering roughly 3.5 octaves in Pentatonic scale)
const DAN_TRANH_STRINGS: PentatonicString[] = [
  { id: 1, solfege: 'Hò', toneName: 'D3', freq: 146.83, octave: 3 },
  { id: 2, solfege: 'Xự', toneName: 'E3', freq: 164.81, octave: 3 },
  { id: 3, solfege: 'Xang', toneName: 'G3', freq: 196.00, octave: 3 },
  { id: 4, solfege: 'Xê', toneName: 'A3', freq: 220.00, octave: 3 },
  { id: 5, solfege: 'Cống', toneName: 'B3', freq: 246.94, octave: 3 },
  { id: 6, solfege: 'Hò', toneName: 'D4', freq: 293.66, octave: 4 },
  { id: 7, solfege: 'Xự', toneName: 'E4', freq: 329.63, octave: 4 },
  { id: 8, solfege: 'Xang', toneName: 'G4', freq: 392.00, octave: 4 },
  { id: 9, solfege: 'Xê', toneName: 'A4', freq: 440.00, octave: 4 },
  { id: 10, solfege: 'Cống', toneName: 'B4', freq: 493.88, octave: 4 },
  { id: 11, solfege: 'Hò', toneName: 'D5', freq: 587.33, octave: 5 },
  { id: 12, solfege: 'Xự', toneName: 'E5', freq: 659.25, octave: 5 },
  { id: 13, solfege: 'Xang', toneName: 'G5', freq: 783.99, octave: 5 },
  { id: 14, solfege: 'Xê', toneName: 'A5', freq: 880.00, octave: 5 },
  { id: 15, solfege: 'Cống', toneName: 'B5', freq: 987.77, octave: 5 },
  { id: 16, solfege: 'Hò', toneName: 'D6', freq: 1174.66, octave: 6 },
  { id: 17, solfege: 'Xự', toneName: 'E6', freq: 1318.51, octave: 6 },
  { id: 18, solfege: 'Xang', toneName: 'G6', freq: 1567.98, octave: 6 },
  { id: 19, solfege: 'Xê', toneName: 'A6', freq: 1760.00, octave: 6 },
]

export function SaigonAcousticTraditionalLuteSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPieceId, setSelectedPieceId] = useState<string>(TRADITIONAL_PIECES[0]!.id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lighting, setLighting] = useState<LuteLightingMode>('moonlight')
  const [activeStringId, setActiveStringId] = useState<number | null>(null)
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

  // Synthesize Traditional Vietnamese Silk/Zither plucked string timbre
  function playSilkStringTone(freq: number, duration: number = 0.9) {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const masterGain = ctx.createGain()
    masterGain.connect(ctx.destination)

    // Fundamental plucked tone (triangle with gentle warm harmonics)
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, now)

    // Pitch bend / micro-vibrato (nhấn rung đặc trưng đàn Tranh)
    const vibrato = ctx.createOscillator()
    vibrato.type = 'sine'
    vibrato.frequency.setValueAtTime(5.5, now) // 5.5 Hz vibrato
    const vibratoGain = ctx.createGain()
    vibratoGain.gain.setValueAtTime(freq * 0.015, now) // ~1.5% pitch variation
    vibrato.connect(vibratoGain)
    vibratoGain.connect(osc.frequency)

    // Resonant soundboard filter (Ngo Dong wood chamber resonance)
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(Math.min(freq * 1.8, 3200), now)
    filter.Q.setValueAtTime(3.2, now)

    // Sharp plectrum attack & long singing decay
    const noteGain = ctx.createGain()
    noteGain.gain.setValueAtTime(0.0001, now)
    noteGain.gain.linearRampToValueAtTime(0.32, now + 0.005)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc.connect(filter)
    filter.connect(noteGain)
    noteGain.connect(masterGain)

    vibrato.start(now)
    osc.start(now)

    vibrato.stop(now + duration + 0.05)
    osc.stop(now + duration + 0.05)
  }

  function handleStringPluck(s: PentatonicString) {
    setActiveStringId(s.id)
    playSilkStringTone(s.freq, 1.2)
    setTimeout(() => {
      setActiveStringId(null)
    }, 450)
  }

  function playPiece(piece: TraditionalPiece) {
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []

    setIsPlaying(true)
    let accumTime = 0

    piece.notes.forEach((item, idx) => {
      const t = setTimeout(() => {
        playSilkStringTone(item.freq, item.duration)
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

  const selectedPiece = TRADITIONAL_PIECES.find((p) => p.id === selectedPieceId) ?? TRADITIONAL_PIECES[0]!
  const currentTheme = LUTE_LIGHTING_THEMES[lighting]

  return (
    <section
      aria-labelledby="traditional-lute-sanctuary-heading"
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

      {/* Acoustic Radial Halo */}
      <div
        className="pointer-events-none absolute -top-40 -left-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: currentTheme.accentColor }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            <span>Traditional Vietnamese Lute Salon · RT60 = 0.35s · Hue Paulownia Wood</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                id="traditional-lute-sanctuary-heading"
                className="text-2xl md:text-4xl font-serif font-light tracking-tight text-stone-100"
              >
                Phòng Thính Âm Đàn Tỳ Bà & Đàn Tranh 19 Dây Gỗ Ngô Đồng
              </h2>
              <p className="mt-2 text-sm md:text-base text-stone-400 max-w-2xl font-light leading-relaxed">
                Tơ trúc dân tộc tỏa sáng trong không gian đương đại. Đại thính phòng tôn vinh đàn Tỳ Bà và đàn Tranh 19 dây với mặt gỗ Ngô Đồng xứ Huế phơi 10 năm. Vách tán âm nan tre kết hợp gỗ Dáng Hương cong mềm mại cho RT60 = 0.35s nảy hạt giòn tan, kèm tủ vi khí hậu 55% RH bảo tồn độ căng dây tơ lụa.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                RT60 Âm Học: <strong className="text-amber-400">0.35 giây</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Gỗ chế tác: <strong className="text-amber-400">Ngô Đồng Xứ Huế</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Bảo quản: <strong className="text-amber-400">55% RH Ổn Định</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 19-String Dan Tranh & Piece Player (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual 19-String Dan Tranh Zither Bed */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-800">
                <span className="font-mono text-amber-300 uppercase tracking-wider">
                  Bảng Dây Đàn Tranh Ngũ Cung (19 Phím Dây)
                </span>
                <span className="text-stone-400">Chạm hoặc click dây đàn để nghe nốt rung ngân</span>
              </div>

              {/* 19 Horizontal Pluckable Strings with Wooden Bridges (Con Nhạn) */}
              <div className="relative overflow-x-auto p-4 rounded-xl bg-[#26150c] border border-amber-950/60 shadow-inner select-none">
                {/* Wood Soundboard Grain */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #3d2113 0px, #2a160d 4px, #4a2817 8px)',
                  }}
                />

                <div className="relative flex flex-col gap-1.5 min-w-[500px]">
                  {DAN_TRANH_STRINGS.map((str) => {
                    const isPlucked = activeStringId === str.id
                    return (
                      <button
                        key={str.id}
                        type="button"
                        onClick={() => handleStringPluck(str)}
                        title={`Dây #${str.id}: ${str.solfege} (${str.toneName} - ${str.freq}Hz)`}
                        aria-label={`Gảy dây đàn ${str.solfege} ${str.toneName}`}
                        className={cn(
                          'group relative flex items-center justify-between h-7 px-3 rounded transition-all min-h-[36px]',
                          isPlucked
                            ? 'bg-amber-600/30'
                            : 'hover:bg-amber-950/40'
                        )}
                      >
                        {/* Solfege Name Tag */}
                        <div className="flex items-center gap-2 z-10">
                          <span
                            className={cn(
                              'text-[10px] font-bold font-mono px-1.5 py-0.5 rounded',
                              isPlucked ? 'bg-amber-400 text-stone-950' : 'bg-black/40 text-amber-200/90'
                            )}
                          >
                            {str.solfege}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400">{str.toneName}</span>
                        </div>

                        {/* Pluckable String Line Visual */}
                        <div className="relative flex-1 mx-3 flex items-center">
                          {/* The String Wire */}
                          <div
                            className={cn(
                              'w-full transition-all duration-100',
                              isPlucked
                                ? 'h-0.5 bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.8)]'
                                : 'h-[1px] bg-amber-200/60 group-hover:bg-amber-100'
                            )}
                          />

                          {/* Movable Wooden Bridge (Con Nhạn gỗ Cẩm Lai) */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-3.5 w-1.5 rounded-sm bg-amber-800 border border-amber-600 shadow"
                            style={{
                              left: `${15 + (str.id * 3.8)}%`,
                            }}
                          />
                        </div>

                        {/* Frequency Tag */}
                        <span className="text-[9px] font-mono text-stone-500 z-10">{str.freq}Hz</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Traditional Repertoire Player */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                  Trích Đoạn Âm Nhạc Cổ Truyền Mẫu
                </span>
                <span className="text-xs text-amber-400 font-mono">{selectedPiece.genre}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {TRADITIONAL_PIECES.map((piece) => {
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
                      <span className="text-[11px] text-stone-500 mt-1">{piece.instrument}</span>
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
                      Tạm dừng khúc nhạc
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => playPiece(selectedPiece)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-all min-h-[44px] shadow"
                    >
                      Hòa tấu trích đoạn ({selectedPiece.title.split(' ')[0]})
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
                Kịch Bản Chiếu Sáng Thính Phòng Dân Tộc
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(LUTE_LIGHTING_THEMES) as LuteLightingMode[]).map((key) => {
                  const th = LUTE_LIGHTING_THEMES[key]
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
                Vật Liệu Cổ Truyền & Âm Học Vi Khí Hậu
              </span>

              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Gỗ Ngô Đồng xứ Huế phơi 10 năm:</strong> Tỷ trọng xốp nhẹ và cấu trúc khoang dẫn đặc biệt giúp phản hồi dải tần cao của móng đồi mồi sáng trong không bị gắt chói.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Vách tán âm nan tre & gỗ Dáng Hương:</strong> Nan tre già hun khói kết hợp xương gỗ hương uốn cong, tạo tán âm đa hướng phân tán đều dải tần số 250Hz - 4000Hz.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Tủ vi khí hậu bảo quản dây tơ 55% RH:</strong> Hệ thống kiểm soát độ ẩm và nhiệt độ tự động chống chùng dây tơ tằm trong mùa mưa ẩm Sài Gòn.
                  </span>
                </li>
              </ul>
            </div>

            {/* Consultation Booking Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  Đăng Ký Tư Vấn Thính Phòng Nhạc Cổ Truyền
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Trải nghiệm không gian âm học mẫu tại Xưởng GuHomes Thạnh Xuân, Q.12 hoặc tư vấn lắp đặt cho tư gia.
                </p>
              </div>

              {bookingSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã ghi nhận lịch hẹn của Quý khách. KTS Âm học truyền thống sẽ liên hệ trong 4 giờ làm việc.
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
                        placeholder="Nguyễn Văn An"
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
                        placeholder="0919 xxx xxx"
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
                      <option value="tea-chamber">Phòng trà thưởng nhạc cổ truyền (20m² - 35m²)</option>
                      <option value="private-salon">Đại sảnh hòa tấu thính phòng dân tộc (35m² - 60m²)</option>
                      <option value="recording-studio">Phòng thu âm nhạc cụ cổ truyền chuyên nghiệp</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Gửi Yêu Cầu Thiết Kế Thính Phòng Dân Tộc</span>
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
