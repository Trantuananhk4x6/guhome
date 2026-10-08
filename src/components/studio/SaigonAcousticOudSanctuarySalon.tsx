'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MaqamPiece {
  id: string
  title: string
  maqamScale: string
  tempoBpm: number
  description: string
  notes: { freq: number; duration: number }[]
}

const MAQAM_PIECES: MaqamPiece[] = [
  {
    id: 'maqam-rast',
    title: 'Taqsim in Maqam Rast (Khúc Biến Tấu Rast)',
    maqamScale: 'Maqam Rast · Nửa Cung Vi Mô (Quarter-Tone)',
    tempoBpm: 76,
    description: 'Âm sắc huyền bí với nốt E nửa giáng (E-half-flat) đặc trưng âm nhạc Ả Rập, dội vang trầm ấm qua vách tán âm Arabesque gỗ Hoàng Đàn.',
    notes: [
      { freq: 220.00, duration: 0.5 }, // A3
      { freq: 247.50, duration: 0.4 }, // B3
      { freq: 261.63, duration: 0.5 }, // C4
      { freq: 293.66, duration: 0.6 }, // D4
      { freq: 320.00, duration: 0.6 }, // E-half-flat 4
      { freq: 349.23, duration: 0.5 }, // F4
      { freq: 392.00, duration: 0.8 }, // G4
      { freq: 320.00, duration: 0.5 },
      { freq: 293.66, duration: 0.8 },
    ],
  },
  {
    id: 'maqam-bayati',
    title: 'Bayati Longa (Vũ Khúc Bayati)',
    maqamScale: 'Maqam Bayati · Nhịp Điệu Sa Mạc',
    tempoBpm: 116,
    description: 'Giai điệu lả lướt đầy đam mê, kỹ thuật vê móng gảy lông đại bàng trên 5 cặp dây tơ đồng lan tỏa khắp thính phòng RT60 0.35s.',
    notes: [
      { freq: 293.66, duration: 0.25 },
      { freq: 310.00, duration: 0.25 }, // E-half-flat
      { freq: 349.23, duration: 0.25 },
      { freq: 392.00, duration: 0.35 },
      { freq: 349.23, duration: 0.25 },
      { freq: 310.00, duration: 0.25 },
      { freq: 293.66, duration: 0.50 },
      { freq: 261.63, duration: 0.25 },
      { freq: 293.66, duration: 0.60 },
    ],
  },
  {
    id: 'maqam-hijaz',
    title: 'Samai Hijaz (Dạ Khúc Hijaz)',
    maqamScale: 'Maqam Hijaz · Huyền Thoại Nghìn Lẻ Một Đêm',
    tempoBpm: 84,
    description: 'Quãng hai tăng (Augmented second) đầy ma mị khơi gợi không gian cung điện Granada và sa mạc rực nắng trăng khuya.',
    notes: [
      { freq: 293.66, duration: 0.4 },
      { freq: 311.13, duration: 0.3 }, // Eb4
      { freq: 369.99, duration: 0.5 }, // F#4
      { freq: 392.00, duration: 0.6 }, // G4
      { freq: 369.99, duration: 0.4 },
      { freq: 311.13, duration: 0.4 },
      { freq: 293.66, duration: 0.8 },
    ],
  },
]

type DesertLightingMode = 'arabian-candle' | 'damascus-sunset' | 'desert-moon'

interface DesertLightingTheme {
  id: DesertLightingMode
  name: string
  kelvin: number
  description: string
  bgGradient: string
  accentColor: string
}

const DESERT_LIGHTING_THEMES: Record<DesertLightingMode, DesertLightingTheme> = {
  'arabian-candle': {
    id: 'arabian-candle',
    name: 'Nến Cung Điện Ả Rập',
    kelvin: 2200,
    description: 'Ánh nến lung linh 2200K phản chiếu qua các ô vách tán âm Arabesque đục mộng âm dương không đinh.',
    bgGradient: 'from-amber-950/40 via-stone-900 to-black',
    accentColor: '#d4af37',
  },
  'damascus-sunset': {
    id: 'damascus-sunset',
    name: 'Hoàng Hôn Cố Đô Damascus',
    kelvin: 2400,
    description: 'Ánh ráng chiều 2400K ấm áp nhuộm vàng thớ gỗ Hoàng Đàn Tuyết Lạng Sơn thơm ngát.',
    bgGradient: 'from-orange-950/40 via-stone-900 to-black',
    accentColor: '#f59e0b',
  },
  'desert-moon': {
    id: 'desert-moon',
    name: 'Trăng Sáng Sa Mạc Sahara',
    kelvin: 2800,
    description: 'Ánh trăng huyền ảo 2800K tập trung chiếu rọi bầu đàn Oud cẩn xà cừ và cần đàn không phím (fretless).',
    bgGradient: 'from-stone-900 via-zinc-950 to-black',
    accentColor: '#e2e8f0',
  },
}

interface OudStringCourse {
  courseId: number
  name: string
  tuning: string
  freq: number
  isDouble: boolean
}

const OUD_STRINGS: OudStringCourse[] = [
  { courseId: 1, name: 'Dây Kerdan (High C)', tuning: 'C5', freq: 523.25, isDouble: true },
  { courseId: 2, name: 'Dây Nawa (G)', tuning: 'G4', freq: 392.00, isDouble: true },
  { courseId: 3, name: 'Dây Duka (D)', tuning: 'D4', freq: 293.66, isDouble: true },
  { courseId: 4, name: 'Dây Ashiran (A)', tuning: 'A3', freq: 220.00, isDouble: true },
  { courseId: 5, name: 'Dây Yakah (E)', tuning: 'E3', freq: 164.81, isDouble: true },
  { courseId: 6, name: 'Dây Qarar (Low C/D Bass)', tuning: 'C3', freq: 130.81, isDouble: false },
]

export function SaigonAcousticOudSanctuarySalon({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPieceId, setSelectedPieceId] = useState<string>(MAQAM_PIECES[0]!.id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lighting, setLighting] = useState<DesertLightingMode>('damascus-sunset')
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null)
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

  // Synthesize Arabic Oud fretless deep lute tone with plectrum attack & wooden bowl resonance
  function playOudTone(freq: number, duration: number = 0.8) {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const masterGain = ctx.createGain()
    masterGain.connect(ctx.destination)

    // Fundamental plucked wave (warm triangle)
    const osc1 = ctx.createOscillator()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(freq, now)

    // Secondary sub-harmonic for deep bowl resonance (bầu đàn gỗ Tuyết Tùng)
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(freq * 0.5, now)

    // Wood body cavity bandpass filter
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(Math.min(freq * 1.5, 2400), now)
    filter.Q.setValueAtTime(2.8, now)

    const noteGain = ctx.createGain()
    // Sharp eagle feather quill pluck (~2ms) and long resonant decay
    noteGain.gain.setValueAtTime(0.0001, now)
    noteGain.gain.linearRampToValueAtTime(0.35, now + 0.004)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(noteGain)
    noteGain.connect(masterGain)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + duration + 0.05)
    osc2.stop(now + duration + 0.05)
  }

  function handlePluckCourse(course: OudStringCourse) {
    setActiveCourseId(course.courseId)
    playOudTone(course.freq, 0.9)
    setTimeout(() => {
      setActiveCourseId(null)
    }, 400)
  }

  function playPiece(piece: MaqamPiece) {
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []

    setIsPlaying(true)
    let accumTime = 0

    piece.notes.forEach((item, idx) => {
      const t = setTimeout(() => {
        playOudTone(item.freq, item.duration)
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

  const selectedPiece = MAQAM_PIECES.find((p) => p.id === selectedPieceId) ?? MAQAM_PIECES[0]!
  const currentTheme = DESERT_LIGHTING_THEMES[lighting]

  return (
    <section
      aria-labelledby="oud-sanctuary-heading"
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 md:p-12 text-stone-200 shadow-2xl transition-colors duration-700',
        className
      )}
    >
      {/* Background Ambience Desert Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 transition-all duration-700',
          currentTheme.bgGradient
        )}
      />

      {/* Acoustic Radial Halo */}
      <div
        className="pointer-events-none absolute -top-40 -right-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: currentTheme.accentColor }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            <span>Royal Oud Salon · Arabesque QRD Diffusers · Lang Son Cedarwood</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2
                id="oud-sanctuary-heading"
                className="text-2xl md:text-4xl font-serif font-light tracking-tight text-stone-100"
              >
                Phòng Hòa Âm Đàn Oud Hoàng Đàn & Vòm Tán Âm Arabesque
              </h2>
              <p className="mt-2 text-sm md:text-base text-stone-400 max-w-2xl font-light leading-relaxed">
                Giai điệu sa mạc và hương gỗ quý tộc. Đại thính phòng tôn vinh cây đàn Oud hoàng gia chế tác từ gỗ Hoàng Đàn Tuyết Lạng Sơn và Tuyết Tùng Lebanon thơm ngát. Hệ vách tán âm hoa văn Arabesque đục mộng âm dương không đinh kim loại đạt RT60 = 0.35s, kết hợp tủ vi khí hậu 48% RH &amp; 21.5°C chống biến dạng cần đàn không phím.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                RT60 Âm Học: <strong className="text-amber-400">0.35 giây</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Vật liệu vòm: <strong className="text-amber-400">Hoàng Đàn Tuyết & Cẩm Lai</strong>
              </span>
              <span className="rounded-lg bg-stone-900/80 border border-stone-800 px-3 py-1.5 text-stone-300">
                Vi khí hậu: <strong className="text-amber-400">48% RH · 21.5°C</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Oud Strings & Maqam Player (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual 11-String Oud Instrument Simulator */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-800">
                <span className="font-mono text-amber-300 uppercase tracking-wider">
                  Bảng Dây Đàn Oud Ả Rập (6 Hàng Dây - 11 Dây Tơ Đồng)
                </span>
                <span className="text-stone-400">Chạm dây để gảy móng rùa nghe âm Maqam</span>
              </div>

              {/* Oud Fretless Fingerboard Canvas */}
              <div className="relative overflow-x-auto p-4 rounded-xl bg-[#24150c] border border-amber-950/60 shadow-inner select-none">
                {/* Cedar Wood Grain Texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #3d2113 0px, #2a160d 10px, #4a2817 20px)',
                  }}
                />

                <div className="relative flex flex-col gap-2 min-w-[480px]">
                  {OUD_STRINGS.map((str) => {
                    const isPlucked = activeCourseId === str.courseId
                    return (
                      <button
                        key={str.courseId}
                        type="button"
                        onClick={() => handlePluckCourse(str)}
                        title={`Hàng dây #${str.courseId}: ${str.name} (${str.tuning} - ${str.freq}Hz)`}
                        aria-label={`Gảy hàng dây ${str.name}`}
                        className={cn(
                          'group relative flex items-center justify-between h-8 px-3 rounded transition-all min-h-[40px]',
                          isPlucked
                            ? 'bg-amber-600/30'
                            : 'hover:bg-amber-950/40'
                        )}
                      >
                        {/* Course Name Tag */}
                        <div className="flex items-center gap-2 z-10">
                          <span
                            className={cn(
                              'text-[10px] font-bold font-mono px-2 py-0.5 rounded',
                              isPlucked ? 'bg-amber-400 text-stone-950' : 'bg-black/50 text-amber-200'
                            )}
                          >
                            #{str.courseId}
                          </span>
                          <span className="text-[11px] font-serif text-stone-300 font-medium">
                            {str.name} ({str.tuning})
                          </span>
                        </div>

                        {/* Pluckable String Visual (Dual line for double courses) */}
                        <div className="relative flex-1 mx-4 flex flex-col justify-center gap-0.5">
                          <div
                            className={cn(
                              'w-full transition-all duration-100',
                              isPlucked
                                ? 'h-0.5 bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.8)]'
                                : 'h-[1px] bg-amber-200/60 group-hover:bg-amber-100'
                            )}
                          />
                          {str.isDouble && (
                            <div
                              className={cn(
                                'w-full transition-all duration-100',
                                isPlucked
                                  ? 'h-0.5 bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.8)]'
                                  : 'h-[1px] bg-amber-200/60 group-hover:bg-amber-100'
                              )}
                            />
                          )}
                        </div>

                        {/* Frequency Tag */}
                        <span className="text-[10px] font-mono text-stone-400 z-10">{str.freq}Hz</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Maqam Pieces Player */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                  Tuyển Tập Khúc Thức Maqam Sa Mạc Mẫu
                </span>
                <span className="text-xs text-amber-400 font-mono">{selectedPiece.maqamScale}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {MAQAM_PIECES.map((piece) => {
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
                      <span className="text-[11px] text-stone-500 mt-1">{piece.maqamScale.split('·')[0]}</span>
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
                      Khởi tấu Maqam ({selectedPiece.title.split(' ')[0]})
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
                Kịch Bản Chiếu Sáng Huyền Bí Sa Mạc
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(DESERT_LIGHTING_THEMES) as DesertLightingMode[]).map((key) => {
                  const th = DESERT_LIGHTING_THEMES[key]
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
                Vật Liệu Âm Học Hoàng Đàn & Tuyết Tùng
              </span>

              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Bầu đàn Hoàng Đàn & Tuyết Tùng Lebanon:</strong> Cấu tạo 21 nan gỗ uốn nhiệt ghép chuẩn xác không đinh, tỏa hương thơm trầm ấm vĩnh cửu.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Vách tán âm Arabesque không đinh:</strong> Hoa văn hình học hồi giáo ghép mộng gỗ Cẩm Lai, triệt tiêu hồi âm dội gắt ở dải tần số 300Hz - 3500Hz.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-100">Tủ vi khí hậu bảo tồn 48% RH &amp; 21.5°C:</strong> Cân bằng ẩm thông minh ngăn nứt bầu đàn và chùng dây tơ tằm trong khí hậu ẩm Sài Gòn.
                  </span>
                </li>
              </ul>
            </div>

            {/* Consultation Booking Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  Đăng Ký Tư Vấn Thính Phòng Đàn Oud Tư Gia
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Khảo sát thiết kế salon âm nhạc Trung Đông &amp; Địa Trung Hải chuẩn âm học RT60 0.35s cho tư gia.
                </p>
              </div>

              {bookingSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã ghi nhận lịch hẹn của Quý khách. KTS Âm học sẽ liên hệ trong vòng 4 giờ làm việc.
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
                        placeholder="Vũ Đình Trọng"
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
                        placeholder="0914 xxx xxx"
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
                      <option value="oud-salon">Salon thưởng nhạc Đàn Oud & Lute (30m² - 50m²)</option>
                      <option value="living-center">Phòng trà phong cách Ả Rập & Điêu khắc gỗ Hoàng Đàn</option>
                      <option value="recording-studio">Phòng thu âm hi-fi chuẩn acoustics RT60 0.35s</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Gửi Yêu Cầu Thiết Kế Thính Phòng Đàn Oud</span>
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
