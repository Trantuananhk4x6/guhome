'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ClassicalThereminPiece {
  id: string
  title: string
  composer: string
  tempoBpm: number
  description: string
  notes: { freq: number; duration: number }[]
}

const THEREMIN_PIECES: ClassicalThereminPiece[] = [
  {
    id: 'valse-sentimentale',
    title: 'Valse Sentimentale, Op. 51 No. 6',
    composer: 'Pyotr Ilyich Tchaikovsky',
    tempoBpm: 72,
    description: 'Bản valse u hoài với những bước luyến ngắt mượt mà đặc trưng của Theremin, tái hiện nỗi niềm lãng mạn phương Bắc trong không gian Quiet Luxury.',
    notes: [
      { freq: 440.0, duration: 0.6 },
      { freq: 523.25, duration: 0.5 },
      { freq: 659.25, duration: 0.7 },
      { freq: 587.33, duration: 0.5 },
      { freq: 523.25, duration: 0.6 },
      { freq: 493.88, duration: 0.5 },
      { freq: 440.0, duration: 1.2 },
    ],
  },
  {
    id: 'the-swan',
    title: 'Le Cygne (The Swan)',
    composer: 'Camille Saint-Saëns',
    tempoBpm: 60,
    description: 'Âm thanh tựa tiếng hát opera không lời bay lượn trên mặt hồ phẳng lặng, cao độ lướt êm ái không có bất kỳ phím bấm cơ học nào.',
    notes: [
      { freq: 587.33, duration: 0.8 },
      { freq: 659.25, duration: 0.4 },
      { freq: 587.33, duration: 0.6 },
      { freq: 493.88, duration: 0.6 },
      { freq: 440.0, duration: 0.5 },
      { freq: 392.0, duration: 0.8 },
      { freq: 293.66, duration: 1.4 },
    ],
  },
]

export function SaigonAcousticThereminSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [pitchHz, setPitchHz] = useState(440)
  const [volumeLevel, setVolumeLevel] = useState(0.4)
  const [isInteractivePlaying, setIsInteractivePlaying] = useState(false)
  const [isPlayingPiece, setIsPlayingPiece] = useState(false)
  const [selectedPieceId, setSelectedPieceId] = useState<string>(THEREMIN_PIECES[0]!.id)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const interactiveOscRef = useRef<OscillatorNode | null>(null)
  const interactiveGainRef = useRef<GainNode | null>(null)
  const pieceTimeouts = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      stopInteractiveTone()
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

  function startInteractiveTone() {
    const ctx = getAudioContext()
    if (!ctx) return
    stopInteractiveTone()

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Characteristic Theremin tone: rounded sine wave with subtle warm vibrato
    osc.type = 'sine'
    osc.frequency.setValueAtTime(pitchHz, now)

    // Vibrato LFO 5.5Hz
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(5.5, now)
    lfoGain.gain.setValueAtTime(pitchHz * 0.015, now)
    lfo.connect(osc.frequency)
    lfo.start(now)

    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(volumeLevel * 0.5, now + 0.1)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)

    interactiveOscRef.current = osc
    interactiveGainRef.current = gain
    setIsInteractivePlaying(true)
  }

  function updateInteractivePitch(newHz: number) {
    setPitchHz(newHz)
    if (interactiveOscRef.current && audioCtxRef.current) {
      interactiveOscRef.current.frequency.setTargetAtTime(newHz, audioCtxRef.current.currentTime, 0.05)
    }
  }

  function updateInteractiveVolume(newVol: number) {
    setVolumeLevel(newVol)
    if (interactiveGainRef.current && audioCtxRef.current) {
      interactiveGainRef.current.gain.setTargetAtTime(newVol * 0.5, audioCtxRef.current.currentTime, 0.05)
    }
  }

  function stopInteractiveTone() {
    if (interactiveGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime
      interactiveGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.15)
      setTimeout(() => {
        if (interactiveOscRef.current) {
          try {
            interactiveOscRef.current.stop()
            interactiveOscRef.current.disconnect()
          } catch (_) {}
          interactiveOscRef.current = null
        }
        interactiveGainRef.current = null
      }, 160)
    }
    setIsInteractivePlaying(false)
  }

  function playPiece(piece: ClassicalThereminPiece) {
    const ctx = getAudioContext()
    if (!ctx) return

    stopInteractiveTone()
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []
    setIsPlayingPiece(true)
    setSelectedPieceId(piece.id)

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'

    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(5.8, now)
    lfoGain.gain.setValueAtTime(4.0, now)
    lfo.connect(osc.frequency)
    lfo.start(now)

    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)

    let currentTime = 0
    piece.notes.forEach((note, index) => {
      const timeout = setTimeout(() => {
        if (audioCtxRef.current) {
          osc.frequency.setTargetAtTime(note.freq, audioCtxRef.current.currentTime, 0.08)
          setPitchHz(Math.round(note.freq))
        }
      }, currentTime * 1000)
      pieceTimeouts.current.push(timeout)
      currentTime += note.duration
    })

    const endTimeout = setTimeout(() => {
      if (audioCtxRef.current) {
        gain.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3)
      }
      setTimeout(() => {
        try {
          osc.stop()
          osc.disconnect()
        } catch (_) {}
        setIsPlayingPiece(false)
      }, 350)
    }, currentTime * 1000)
    pieceTimeouts.current.push(endTimeout)
  }

  function stopPiece() {
    pieceTimeouts.current.forEach((t) => clearTimeout(t))
    pieceTimeouts.current = []
    setIsPlayingPiece(false)
  }

  const activePiece: ClassicalThereminPiece = THEREMIN_PIECES.find((p) => p.id === selectedPieceId) ?? THEREMIN_PIECES[0]!

  return (
    <section
      aria-label="Phòng Hòa Âm Nhạc Cụ Điện Từ Theremin GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Electromagnetic Field Ambient Wave */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-purple-500/40 bg-purple-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-purple-300">
                Acoustic Sanctuary · Léon Theremin 1920
              </span>
              <span className="text-xs font-mono text-stone-400">RT60: 0.30s · Vòm Gỗ Bạch Dương Baltic</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Phòng Hòa Âm Điện Từ Theremin
              <span className="block font-sans text-lg font-normal text-purple-300/80 sm:text-xl mt-1">
                Thánh Đường Của Đôi Bàn Tay Không Chạm & Vòm Gỗ Baltic Uốn Hơi
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Nhạc cụ duy nhất trên thế giới được chơi mà người nghệ sĩ không chạm vào bất kỳ phím đàn nào. 
            Không gian thính phòng bọc gỗ Bạch Dương Baltic uốn hấp nhiệt triệt tiêu sóng chói, mang lại âm thanh luyến láy huyền ảo tựa tiếng hát thiên thần.
          </p>
        </div>

        {/* Acoustic Architectural Specs Bar */}
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-purple-400 uppercase tracking-wider">Hệ ăng-ten cảm ứng</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Đồng Thau Mạ Vàng</div>
            <p className="mt-1 text-xs text-stone-400">Ăng-ten đứng (Cao độ) & Ăng-ten vòng (Âm lượng)</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-purple-400 uppercase tracking-wider">Vòm trần âm học</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Bạch Dương Baltic</div>
            <p className="mt-1 text-xs text-stone-400">Ghép hình elip uốn cong triệt tiêu dội âm</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-purple-400 uppercase tracking-wider">Thời gian vang RT60</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">0.30 Giây</div>
            <p className="mt-1 text-xs text-stone-400">Tối ưu cho nhạc cụ điện tử trường điện từ</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-purple-400 uppercase tracking-wider">Khử rung sàn</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Lớp Đệm Sylomer</div>
            <p className="mt-1 text-xs text-stone-400">Cách ly hoàn toàn khỏi rung chấn phố xá</p>
          </div>
        </div>

        {/* Main Interactive Electromagnetic Theremin Stage */}
        <div className="mt-10 rounded-3xl border border-stone-800 bg-stone-950/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800/60">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
                Tương tác: Rê chuột hoặc kéo thanh trượt điều khiển trường điện từ
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Tay phải điều khiển tần số cao độ (150Hz - 1.200Hz), tay trái kiểm soát biên độ âm lượng.
              </p>
            </div>

            {/* Classical Pieces */}
            <div className="flex items-center gap-3">
              {isPlayingPiece ? (
                <button
                  onClick={stopPiece}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 font-mono text-xs font-medium text-white transition hover:bg-purple-500"
                >
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  Dừng biểu diễn
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {THEREMIN_PIECES.map((piece) => (
                    <button
                      key={piece.id}
                      onClick={() => playPiece(piece)}
                      className={cn(
                        'min-h-[44px] rounded-xl border px-3 py-1.5 font-serif text-xs transition-all',
                        selectedPieceId === piece.id
                          ? 'border-purple-500 bg-purple-950/60 text-purple-300'
                          : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700'
                      )}
                    >
                      ▶ {piece.title.split(',')[0]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Electromagnetic Virtual Antenna Simulator Area */}
          <div
            className="mt-8 relative h-72 sm:h-80 rounded-2xl border-2 border-stone-800 bg-gradient-to-b from-stone-950 via-neutral-900 to-stone-950 p-6 overflow-hidden flex flex-col justify-between"
            onMouseMove={(e) => {
              if (isInteractivePlaying) {
                const rect = e.currentTarget.getBoundingClientRect()
                const xFrac = (e.clientX - rect.left) / rect.width
                const yFrac = 1 - (e.clientY - rect.top) / rect.height
                const targetPitch = Math.round(180 + xFrac * 1000)
                const targetVol = Math.max(0.05, Math.min(1.0, yFrac))
                updateInteractivePitch(targetPitch)
                updateInteractiveVolume(targetVol)
              }
            }}
          >
            {/* Visual Antenna Graphic (Left: Volume Loop, Right: Pitch Rod) */}
            <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-12 opacity-30">
              {/* Left: Volume Loop Antenna */}
              <div className="flex flex-col items-center">
                <div className="h-16 w-24 rounded-full border-2 border-purple-400" />
                <div className="h-28 w-1 bg-amber-500" />
                <span className="mt-2 font-mono text-[9px] text-stone-400">Ăng-ten Âm Lượng</span>
              </div>

              {/* Right: Vertical Pitch Rod */}
              <div className="flex flex-col items-center">
                <div className="h-44 w-1.5 bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200 rounded-full shadow-lg shadow-amber-400/50" />
                <span className="mt-2 font-mono text-[9px] text-stone-400">Ăng-ten Cao Độ</span>
              </div>
            </div>

            {/* Electromagnetic Ripple Simulation */}
            {(isInteractivePlaying || isPlayingPiece) && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-44 w-44 rounded-full border border-purple-500/50 bg-purple-500/10"
                />
              </div>
            )}

            {/* Sine Wave Canvas / SVG Display */}
            <div className="relative z-10 mx-auto w-full max-w-lg">
              <svg viewBox="0 0 400 100" className="w-full h-24">
                <motion.path
                  d={`M 0,50 Q 50,${50 - volumeLevel * 40} 100,50 T 200,50 T 300,50 T 400,50`}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{
                    d: [
                      `M 0,50 Q 50,${50 - volumeLevel * 40} 100,50 T 200,50 T 300,50 T 400,50`,
                      `M 0,50 Q 50,${50 + volumeLevel * 40} 100,50 T 200,50 T 300,50 T 400,50`,
                      `M 0,50 Q 50,${50 - volumeLevel * 40} 100,50 T 200,50 T 300,50 T 400,50`,
                    ],
                  }}
                  transition={{ duration: 600 / pitchHz, repeat: Infinity, ease: 'linear' }}
                />
              </svg>
            </div>

            {/* Live Telemetry Display */}
            <div className="relative z-10 flex flex-wrap items-center justify-between border-t border-stone-800 pt-4 text-xs font-mono text-stone-400">
              <div className="flex items-center gap-4">
                <span>Tần số sóng: <strong className="text-purple-300 font-semibold">{pitchHz} Hz</strong></span>
                <span>Âm lượng: <strong className="text-purple-300 font-semibold">{Math.round(volumeLevel * 100)}%</strong></span>
              </div>

              {!isInteractivePlaying ? (
                <button
                  onClick={startInteractiveTone}
                  className="rounded-xl border border-purple-500/60 bg-purple-950/60 px-4 py-2 text-purple-300 hover:bg-purple-900 transition min-h-[44px]"
                >
                  ⚡ Kích hoạt chơi Theremin tự do
                </button>
              ) : (
                <button
                  onClick={stopInteractiveTone}
                  className="rounded-xl border border-red-500/60 bg-red-950/40 px-4 py-2 text-red-300 hover:bg-red-900 transition min-h-[44px]"
                >
                  ⏹ Tắt âm thanh
                </button>
              )}
            </div>
          </div>

          {/* Piece Lore & Historical Detail */}
          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900/80 p-5 sm:p-6 backdrop-blur-sm">
            <h3 className="font-serif text-xl text-stone-100">{activePiece.title}</h3>
            <p className="mt-1 font-mono text-xs text-purple-400">{activePiece.composer}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light border-t border-stone-800/80 pt-3">
              {activePiece.description}
            </p>
          </div>
        </div>

        {/* 3 Architectural & Acoustic Virtues */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-purple-400">
              01 · Gỗ Bạch Dương Baltic Uốn Cong
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Khuếch Tán Sóng Hài Hình Elip</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Gỗ Bạch Dương sinh trưởng chậm vùng hàn đới có mật độ thớ đồng nhất, được uốn cong liên tục theo hình học elip, 
              giúp sóng âm hình sin của Theremin lan tỏa đều khắp thính phòng mà không tạo điểm chết hay vùng dội chói.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-purple-400">
              02 · Lưới Chắn Điện Từ Trường Faraday
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Khử Nhiễu Sóng Wi-Fi & Di Động</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Thành tường được tích hợp lớp lưới đồng siêu mỏng hoạt động như lồng Faraday, 
              ngăn chặn triệt để các sóng vô tuyến và sóng điện thoại gây nhiễu loạn trường điện từ quanh ăng-ten đàn Theremin.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-purple-400">
              03 · Hòa Khí Hậu Sài Gòn
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Cân Bằng Điện Trở Trong Độ Ẩm 80%</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Mạch điện tử đèn chân không được nhiệt đới hóa bằng lớp phủ polymer nano cách điện, 
              đảm bảo độ nhạy của ăng-ten không bị trôi tần số ngay cả giữa những ngày mưa bão độ ẩm cao tại TP.HCM.
            </p>
          </div>
        </div>

        {/* Private Consultation Booking Form */}
        <div className="mt-14 rounded-3xl border border-purple-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-purple-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-purple-300">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                GuHomes Theremin Acoustic Salon
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Kiến Tạo Thính Phòng Theremin Tại Biệt Thự
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Dành cho các gia chủ yêu chuộng những trải nghiệm âm thanh tiên phong và nghệ thuật vị lai. 
                GuHomes trực tiếp thiết kế lồng chắn Faraday âm tường và chế tác bệ đỡ Theremin mộng ngàm gỗ tự nhiên độc bản.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Nhạc cụ Theremin chế tác thủ công</span>
                <span>✓ Triệt tiêu hoàn toàn sóng nhiễu vô tuyến</span>
                <span>✓ Vòm elip gỗ Bạch Dương may đo</span>
              </div>
            </div>

            <div>
              {bookingSuccess ? (
                <div className="rounded-2xl border border-purple-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu thính phòng Theremin</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Kỹ sư trưởng âm học GuHomes sẽ liên hệ để xếp lịch trải nghiệm nhạc cụ điện từ thực tế tại studio Thạnh Xuân.
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
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-phone`} className="block font-mono text-xs text-stone-300">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      id={`${formId}-phone`}
                      required
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-site`} className="block font-mono text-xs text-stone-300">
                      Khu vực dự kiến (Biệt thự / Penthouse / Căn hộ cao cấp)
                    </label>
                    <input
                      id={`${formId}-site`}
                      type="text"
                      placeholder="VD: Penthouse The River Thủ Thiêm (60m²)"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Đăng ký tư vấn thính phòng Theremin
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
