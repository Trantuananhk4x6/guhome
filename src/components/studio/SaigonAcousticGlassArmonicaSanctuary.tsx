'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassBowl {
  id: string
  note: string
  freq: number
  octave: number
  colorPrism: string
  diameterMm: number
}

// Representative selection of 14 crystal bowls spanning 3 octaves (F3 to F6)
const GLASS_BOWLS: GlassBowl[] = [
  { id: 'b-f3', note: 'Fa 3 (F3)', freq: 174.61, octave: 3, colorPrism: '#ef4444', diameterMm: 240 },
  { id: 'b-a3', note: 'La 3 (A3)', freq: 220.0, octave: 3, colorPrism: '#f97316', diameterMm: 220 },
  { id: 'b-c4', note: 'Đô 4 (C4)', freq: 261.63, octave: 4, colorPrism: '#f59e0b', diameterMm: 200 },
  { id: 'b-d4', note: 'Rê 4 (D4)', freq: 293.66, octave: 4, colorPrism: '#eab308', diameterMm: 185 },
  { id: 'b-e4', note: 'Mi 4 (E4)', freq: 329.63, octave: 4, colorPrism: '#84cc16', diameterMm: 170 },
  { id: 'b-f4', note: 'Fa 4 (F4)', freq: 349.23, octave: 4, colorPrism: '#10b981', diameterMm: 160 },
  { id: 'b-g4', note: 'Sol 4 (G4)', freq: 392.0, octave: 4, colorPrism: '#06b6d4', diameterMm: 145 },
  { id: 'b-a4', note: 'La 4 (A4)', freq: 440.0, octave: 4, colorPrism: '#3b82f6', diameterMm: 135 },
  { id: 'b-b4', note: 'Si 4 (B4)', freq: 493.88, octave: 4, colorPrism: '#6366f1', diameterMm: 125 },
  { id: 'b-c5', note: 'Đô 5 (C5)', freq: 523.25, octave: 5, colorPrism: '#8b5cf6', diameterMm: 115 },
  { id: 'b-e5', note: 'Mi 5 (E5)', freq: 659.25, octave: 5, colorPrism: '#a855f7', diameterMm: 100 },
  { id: 'b-g5', note: 'Sol 5 (G5)', freq: 783.99, octave: 5, colorPrism: '#d946ef', diameterMm: 90 },
  { id: 'b-c6', note: 'Đô 6 (C6)', freq: 1046.5, octave: 6, colorPrism: '#ec4899', diameterMm: 75 },
  { id: 'b-f6', note: 'Fa 6 (F6)', freq: 1396.91, octave: 6, colorPrism: '#f43f5e', diameterMm: 60 },
]

interface ArmonicaPiece {
  id: string
  title: string
  composer: string
  year: string
  description: string
  notes: { bowlIndex: number; duration: number }[]
}

const CLASSICAL_PIECES: ArmonicaPiece[] = [
  {
    id: 'mozart-k356',
    title: 'Adagio in C major for Glass Harmonica',
    composer: 'W. A. Mozart (K. 356 / 617a)',
    year: '1791',
    description: 'Bản kiệt tác bất hủ được Mozart sáng tác cho nghệ sĩ khiếm thị Marianne Kirchgessner, giai điệu thần tiên tựa tiếng thở của thiên hà.',
    notes: [
      { bowlIndex: 2, duration: 0.5 },
      { bowlIndex: 4, duration: 0.5 },
      { bowlIndex: 6, duration: 0.6 },
      { bowlIndex: 9, duration: 0.8 },
      { bowlIndex: 7, duration: 0.5 },
      { bowlIndex: 4, duration: 0.5 },
      { bowlIndex: 2, duration: 1.0 },
    ],
  },
  {
    id: 'saint-saens-aquarium',
    title: 'Le Carnaval des Animaux: Aquarium',
    composer: 'Camille Saint-Saëns',
    year: '1886',
    description: 'Âm sắc lóng lánh mô tả ánh sáng xuyên qua làn nước trong vắt của đàn cá pha lê bơi lượn trong thủy cung.',
    notes: [
      { bowlIndex: 12, duration: 0.35 },
      { bowlIndex: 10, duration: 0.35 },
      { bowlIndex: 9, duration: 0.4 },
      { bowlIndex: 6, duration: 0.4 },
      { bowlIndex: 4, duration: 0.45 },
      { bowlIndex: 2, duration: 0.6 },
      { bowlIndex: 0, duration: 1.2 },
    ],
  },
  {
    id: 'beethoven-melodram',
    title: 'Melodram in D minor',
    composer: 'Ludwig van Beethoven (Leonore Prohaska)',
    year: '1815',
    description: 'Khoảnh khắc tĩnh lặng siêu thực giữa chiến trường, tiếng đĩa pha lê xoay ngân vang như an ủi linh hồn người chiến sĩ.',
    notes: [
      { bowlIndex: 3, duration: 0.6 },
      { bowlIndex: 5, duration: 0.5 },
      { bowlIndex: 7, duration: 0.5 },
      { bowlIndex: 9, duration: 0.7 },
      { bowlIndex: 5, duration: 0.5 },
      { bowlIndex: 3, duration: 1.1 },
    ],
  },
]

export function SaigonAcousticGlassArmonicaSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [activeBowlId, setActiveBowlId] = useState<string>(GLASS_BOWLS[2]!.id)
  const [isPlayingNote, setIsPlayingNote] = useState<string | null>(null)
  const [isRotating, setIsRotating] = useState(true)
  const [rotationSpeedRpm, setRotationSpeedRpm] = useState(60) // 40 - 90 RPM
  const [isPlayingPiece, setIsPlayingPiece] = useState(false)
  const [selectedPieceId, setSelectedPieceId] = useState<string>(CLASSICAL_PIECES[0]!.id)
  const [bookingSuccess, setBookingSuccess] = useState(false)

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

  // Synthesize pure crystal glass friction resonance:
  // Pure sine wave + subtle filtered friction noise + slow exponential decay
  function rubGlassBowl(bowl: GlassBowl) {
    const ctx = getAudioContext()
    if (!ctx) return

    setIsPlayingNote(bowl.id)
    setTimeout(() => {
      setIsPlayingNote((curr) => (curr === bowl.id ? null : curr))
    }, 500)

    const now = ctx.currentTime

    // 1. Wet finger friction excitation (Subtle bandpass noise)
    const bufferSize = ctx.sampleRate * 0.05
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015))
    }
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.setValueAtTime(bowl.freq * 2, now)
    noiseFilter.Q.setValueAtTime(8.0, now)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.08, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noiseSource.start(now)

    // 2. Fundamental crystal bowl sine tone with subtle vibrato
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()

    // LFO for subtle finger contact wobble (4.5 Hz)
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(4.5, now)
    lfoGain.gain.setValueAtTime(bowl.freq * 0.003, now)
    lfo.connect(osc1.frequency)
    lfo.start(now)
    lfo.stop(now + 3.5)

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(bowl.freq, now)

    gain1.gain.setValueAtTime(0.4, now)
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.2)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 3.4)

    // 3. Ultra-clean octave harmonic shimmer (2x freq)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(bowl.freq * 2.0, now)

    gain2.gain.setValueAtTime(0.08, now)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.8)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now)
    osc2.stop(now + 2.0)
  }

  function playPiece(piece: ArmonicaPiece) {
    const ctx = getAudioContext()
    if (!ctx) return

    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []
    setIsPlayingPiece(true)
    setSelectedPieceId(piece.id)

    let accumulatedTime = 0
    piece.notes.forEach((note) => {
      const timeout = setTimeout(() => {
        const bowl = GLASS_BOWLS[note.bowlIndex]
        if (bowl) {
          rubGlassBowl(bowl)
          setActiveBowlId(bowl.id)
        }
      }, accumulatedTime * 1000)
      pieceTimeouts.current.push(timeout)
      accumulatedTime += note.duration
    })

    const endTimeout = setTimeout(() => {
      setIsPlayingPiece(false)
    }, accumulatedTime * 1000 + 400)
    pieceTimeouts.current.push(endTimeout)
  }

  function stopPiece() {
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []
    setIsPlayingPiece(false)
  }

  const activeBowl: GlassBowl = GLASS_BOWLS.find((b) => b.id === activeBowlId) ?? GLASS_BOWLS[2]!

  return (
    <section
      aria-label="Phòng Hòa Âm Đàn Kính Pha Lê Glass Armonica GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Prism Dispersion Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-indigo-300">
                Acoustic Sanctuary · Benjamin Franklin 1761
              </span>
              <span className="text-xs font-mono text-stone-400">RT60: 0.29s · Vòm Gỗ Dâu Rừng Parabol</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Phòng Hòa Âm Đàn Kính Pha Lê
              <span className="block font-sans text-lg font-normal text-indigo-300/80 sm:text-xl mt-1">
                Glass Armonica Huyền Diệu & Triệt Tiêu Chói Gắt Cao Tần
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Không gian thính phòng thính âm chuyên sâu tôn vinh nhạc cụ ma mị nhất thế kỷ 18. 
            37 bát đĩa pha lê thạch anh xoay đồng trục nhúng nước khoáng, hòa nhịp cùng vòm trần cong gỗ Dâu rừng tự nhiên 
            mang lại sóng âm êm dịu chạm đến tầng sâu tiềm thức.
          </p>
        </div>

        {/* Technical Specification Bar */}
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-indigo-400 uppercase tracking-wider">Số lượng bát đĩa</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">37 Bát Pha Lê</div>
            <p className="mt-1 text-xs text-stone-400">Thạch anh tinh khiết định âm theo kích cỡ</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-indigo-400 uppercase tracking-wider">Vòm trần âm học</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Gỗ Dâu Rừng</div>
            <p className="mt-1 text-xs text-stone-400">Độ cong Parabol triệt tiêu sóng chói cao tần</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-indigo-400 uppercase tracking-wider">Thời gian ngân vang</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">RT60: 0.29s</div>
            <p className="mt-1 text-xs text-stone-400">Chuẩn mực phòng thính âm thính phòng châu Âu</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-indigo-400 uppercase tracking-wider">Hệ truyền động trục</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Vòng Bi Gốm</div>
            <p className="mt-1 text-xs text-stone-400">Êm ái tuyệt đối &lt;8 dBA không rung chấn</p>
          </div>
        </div>

        {/* Interactive Rotating Armonica Spindle */}
        <div className="mt-10 rounded-3xl border border-stone-800 bg-stone-950/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800/60">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">
                Tương tác: Chạm tay ướt lên vành đĩa pha lê đang xoay
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Vật lý ma sát học: Tay ướt miết nhẹ lên mép bát tạo dao động điều hòa cộng hưởng hình sin thuần khiết.
              </p>
            </div>

            {/* Classical Repertoire Player */}
            <div className="flex items-center gap-3">
              {isPlayingPiece ? (
                <button
                  onClick={stopPiece}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-mono text-xs font-medium text-white transition hover:bg-indigo-500"
                >
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  Dừng hòa âm
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {CLASSICAL_PIECES.map((piece) => (
                    <button
                      key={piece.id}
                      onClick={() => playPiece(piece)}
                      className={cn(
                        'min-h-[44px] rounded-xl border px-3 py-1.5 font-serif text-xs transition-all',
                        selectedPieceId === piece.id
                          ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                          : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700'
                      )}
                    >
                      ▶ {piece.title.split(':')[0]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Central Rotating Spindle Rack with Concentric Glass Bowls */}
          <div className="mt-8 relative overflow-hidden rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900/80 via-neutral-950 to-stone-900/80 p-6">
            {/* Horizontal Steel Axis Graphic */}
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-stone-700 via-stone-400 to-stone-700 -translate-y-1/2 pointer-events-none opacity-40 shadow-sm" />

            <div className="relative flex justify-center items-center gap-1.5 sm:gap-3 overflow-x-auto py-8">
              {GLASS_BOWLS.map((bowl, idx) => {
                const isSelected = activeBowlId === bowl.id
                const isPlucking = isPlayingNote === bowl.id

                return (
                  <button
                    key={bowl.id}
                    onClick={() => {
                      setActiveBowlId(bowl.id)
                      rubGlassBowl(bowl)
                    }}
                    aria-label={`Miết bát pha lê ${bowl.note} tần số ${bowl.freq}Hz`}
                    className={cn(
                      'group relative flex flex-col items-center justify-between rounded-full border transition-all duration-300 min-h-[44px] flex-shrink-0',
                      isSelected
                        ? 'border-indigo-400 bg-indigo-950/50 shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/50'
                        : 'border-stone-700 bg-stone-900/60 hover:border-indigo-500/60 hover:bg-stone-800/80',
                      isPlucking && 'scale-105 border-white ring-4 ring-indigo-400/80'
                    )}
                    style={{
                      height: `${Math.max(64, (bowl.diameterMm / 240) * 180)}px`,
                      width: `${Math.max(44, (bowl.diameterMm / 240) * 110)}px`,
                    }}
                  >
                    {/* Top Note Display */}
                    <span className="mt-2 font-mono text-[9px] text-stone-300 group-hover:text-white">
                      {bowl.note.split(' ')[0]}
                    </span>

                    {/* Rotating Glass Rim Graphic with Prismatic Edge */}
                    <div className="relative my-auto flex items-center justify-center">
                      <motion.div
                        animate={{
                          rotate: isRotating ? 360 : 0,
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 60 / rotationSpeedRpm,
                          ease: 'linear',
                        }}
                        className="rounded-full border border-dashed border-indigo-400/40 p-2"
                      >
                        <div
                          className="h-3 w-3 rounded-full shadow-inner"
                          style={{ backgroundColor: bowl.colorPrism }}
                        />
                      </motion.div>

                      {isPlucking && (
                        <motion.div
                          initial={{ scale: 0.6, opacity: 1 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          transition={{ duration: 0.7 }}
                          className="absolute inset-0 rounded-full border border-indigo-300 pointer-events-none"
                        />
                      )}
                    </div>

                    {/* Bottom Diameter Indicator */}
                    <span className="mb-2 font-mono text-[8px] text-stone-400">
                      Ø{bowl.diameterMm}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Rotation Control Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800/80 pt-4 text-xs font-mono text-stone-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className="rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 text-stone-200 hover:border-indigo-400 transition min-h-[36px]"
                >
                  {isRotating ? '⏸ Tạm dừng trục xoay' : '▶ Khởi động trục xoay'}
                </button>
                <span>Tốc độ: <strong className="text-indigo-300">{rotationSpeedRpm} RPM</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <span>Điều chỉnh vòng quay:</span>
                {[45, 60, 75, 90].map((rpm) => (
                  <button
                    key={rpm}
                    onClick={() => setRotationSpeedRpm(rpm)}
                    className={cn(
                      'rounded px-2 py-0.5 text-xs transition',
                      rotationSpeedRpm === rpm
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'border border-stone-700 text-stone-400 hover:text-stone-200'
                    )}
                  >
                    {rpm}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Bowl Acoustic & Physical Breakdown */}
          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900/80 p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  <h3 className="font-serif text-xl text-stone-100">{activeBowl.note}</h3>
                </div>
                <p className="mt-1 font-mono text-xs text-indigo-300/80">
                  Tần số dao động tự nhiên: {activeBowl.freq} Hz · Quãng tám {activeBowl.octave}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-300">
                <span className="rounded-lg border border-stone-700 bg-stone-800 px-2.5 py-1">
                  Đường kính vành: <strong className="text-stone-100">{activeBowl.diameterMm} mm</strong>
                </span>
                <span className="rounded-lg border border-stone-700 bg-stone-800 px-2.5 py-1">
                  Độ dày thành kính: <strong className="text-stone-100">1.8 mm</strong>
                </span>
                <span className="rounded-lg border border-stone-700 bg-stone-800 px-2.5 py-1 text-indigo-300">
                  Pha lê thạch anh SiO2 99.8%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Architectural & Acoustic Virtues */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-400">
              01 · Vòm Gỗ Dâu Rừng Sấy Chậm
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Triệt Tiêu Âm Chói Cao Tần</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Gỗ Dâu rừng (Morus macroura) có cấu trúc thớ sợi tơ đặc biệt, hấp thụ hoàn toàn dải tần số chói gắt trên 4.000Hz, 
              chỉ phản hồi dải âm thanh ngọt ngào mượt mà nhất của pha lê đến tai người nghe.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-400">
              02 · Máng Nước Khoáng Tự Nhiên
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Giữ Ẩm Vành Bát Liên Tục</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Máng trượt bằng đồng đỏ chìm dưới đáy cụm bát cung cấp vi lượng nước khoáng ion kiềm nhẹ, 
              giữ cho ngón tay nghệ sĩ luôn lướt êm ái trên pha lê mà không sinh ra tiếng rít ma sát khô.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-400">
              03 · Sàn Giảm Chấn Sylomer 3 Lớp
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Cách Ly Tuyệt Đối Tiếng Phố Thị</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Thính phòng được thi công theo nguyên lý "hộp trong hộp" (Room-in-Room) với sàn nổi Sylomer Áo, 
              ngăn toàn bộ rung động xe cộ ngoài đường phố Sài Gòn ảnh hưởng đến độ tĩnh lặng của không gian.
            </p>
          </div>
        </div>

        {/* Private Consultation & Acoustic Vault Order */}
        <div className="mt-14 rounded-3xl border border-indigo-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-indigo-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-indigo-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                GuHomes Acoustic Armonica Salon
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Kiến Tạo Thính Phòng Đàn Kính Tại Biệt Thự
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Một không gian thính phòng thính âm riêng tư cho các gia chủ yêu chuộng sự huyền bí và thanh tao tuyệt đối. 
                GuHomes đo đạc mô phỏng 3D trường âm, thi công vòm trần gỗ Dâu rừng và chế tác giá đỡ đàn kính bespoke.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Pha lê thạch anh nhập khẩu Đức</span>
                <span>✓ Kiểm chuẩn RT60 &lt; 0.3s</span>
                <span>✓ May đo theo nếp thưởng trà thiền vị</span>
              </div>
            </div>

            <div>
              {bookingSuccess ? (
                <div className="rounded-2xl border border-indigo-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu thính phòng Đàn Kính</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    KTS trưởng âm học GuHomes sẽ liên hệ để xếp lịch trải nghiệm trực tiếp tại phòng hòa âm studio Thạnh Xuân.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setBookingSuccess(true)
                  }}
                  className="space-y-4 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-md"
                >
                  <div>
                    <label htmlFor={`${formId}-client`} className="block font-mono text-xs text-stone-300">
                      Họ tên gia chủ *
                    </label>
                    <input
                      id={`${formId}-client`}
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-tel`} className="block font-mono text-xs text-stone-300">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      id={`${formId}-tel`}
                      required
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-loc`} className="block font-mono text-xs text-stone-300">
                      Khu vực công trình (Biệt thự / Penthouse)
                    </label>
                    <input
                      id={`${formId}-loc`}
                      type="text"
                      placeholder="VD: Biệt thự Saroma Sala Thủ Thiêm"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Đăng ký tư vấn thính phòng Đàn Kính Pha Lê
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
