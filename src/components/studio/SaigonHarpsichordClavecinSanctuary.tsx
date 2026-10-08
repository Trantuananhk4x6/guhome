'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type KeyboardManual = 'lower' | 'upper' | 'coupled'
type BaroqueLighting = 'candlelight' | 'recital' | 'midnight'

interface BaroqueLightingPreset {
  id: BaroqueLighting
  name: string
  colorTemp: string
  cri: string
  lux: string
  description: string
  ambientClass: string
}

const LIGHTING_PRESETS: Record<BaroqueLighting, BaroqueLightingPreset> = {
  candlelight: {
    id: 'candlelight',
    name: 'Ánh Nến Baroque Cổ Điển (2200K)',
    colorTemp: '2200K Ánh Nến Sáp Ong',
    cri: 'CRI 99 / R9 > 98',
    lux: '35 Lux dịu êm huyền bí',
    description: 'Tái hiện vầng sáng lung linh từ những chân nến đồng thau thế kỷ 18, phản chiếu ánh vàng lá 24K trên thân đàn Clavecin.',
    ambientClass: 'from-amber-600/20 via-neutral-900 to-black',
  },
  recital: {
    id: 'recital',
    name: 'Tập Trung Hòa Tấu Phòng Trà (3000K)',
    colorTemp: '3000K Ấm Áp Tinh Tuyển',
    cri: 'CRI 98 / UGR < 6',
    lux: '180 Lux rọi điểm 2 tầng phím',
    description: 'Góc chiếu hẹp 15° tập trung vào phím đàn gỗ Mun cẩn xương bò và đôi tay nghệ sĩ, triệt tiêu mọi phản chiếu chói trên lớp sơn ta.',
    ambientClass: 'from-yellow-700/25 via-stone-900 to-black',
  },
  midnight: {
    id: 'midnight',
    name: 'Độc Tấu Nửa Đêm Tĩnh Lặng (1900K)',
    colorTemp: '1900K Than Hồng Lắng Đọng',
    cri: 'CRI 96 / Không ánh sáng xanh',
    lux: '20 Lux ánh sáng hắt chân tường',
    description: 'Ánh sáng hắt chân nan gỗ Hương vân, để lại đàn Clavecin như một tác phẩm điêu khắc trầm mặc trong đêm sâu Sài Gòn.',
    ambientClass: 'from-orange-800/15 via-zinc-900 to-black',
  },
}

interface HarpsichordPiece {
  id: string
  title: string
  composer: string
  notes: { note: number; duration: number }[] // note MIDI pitch approx
  desc: string
}

// Convert MIDI pitch to Hz
function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

const HARPSICHORD_PIECES: HarpsichordPiece[] = [
  {
    id: 'bach-cminor',
    title: 'Prelude in C Minor, BWV 847',
    composer: 'J.S. Bach (1722)',
    desc: 'Những nốt gẩy arpeggio liên thanh dồn dập, thử thách độ nảy cơ học của miếng gảy quills trên phím gỗ Mun.',
    notes: [
      { note: 48, duration: 0.14 },
      { note: 60, duration: 0.14 },
      { note: 63, duration: 0.14 },
      { note: 62, duration: 0.14 },
      { note: 63, duration: 0.14 },
      { note: 60, duration: 0.14 },
      { note: 63, duration: 0.14 },
      { note: 60, duration: 0.14 },
      { note: 48, duration: 0.14 },
      { note: 60, duration: 0.14 },
      { note: 63, duration: 0.14 },
      { note: 62, duration: 0.14 },
      { note: 63, duration: 0.14 },
      { note: 60, duration: 0.14 },
      { note: 63, duration: 0.14 },
      { note: 60, duration: 0.14 },
    ],
  },
  {
    id: 'rameau-sauvages',
    title: 'Les Sauvages',
    composer: 'Jean-Philippe Rameau (1727)',
    desc: 'Giai điệu rộn ràng, dứt khoát kết hợp âm sắc 8-foot rền vang cùng thanh 4-foot trong trẻo như pha lê.',
    notes: [
      { note: 67, duration: 0.18 },
      { note: 67, duration: 0.18 },
      { note: 67, duration: 0.18 },
      { note: 63, duration: 0.26 },
      { note: 65, duration: 0.18 },
      { note: 67, duration: 0.26 },
      { note: 65, duration: 0.18 },
      { note: 63, duration: 0.18 },
      { note: 62, duration: 0.28 },
      { note: 60, duration: 0.35 },
    ],
  },
  {
    id: 'couperin-barricades',
    title: 'Les Barricades Mystérieuses',
    composer: 'François Couperin (1717)',
    desc: 'Lối viết style luthé đan xen các bè trầm bổng, phô diễn trọn vẹn độ cộng hưởng của vòm gỗ Dổi sơn then.',
    notes: [
      { note: 55, duration: 0.22 },
      { note: 58, duration: 0.22 },
      { note: 62, duration: 0.22 },
      { note: 67, duration: 0.32 },
      { note: 58, duration: 0.22 },
      { note: 62, duration: 0.22 },
      { note: 65, duration: 0.32 },
      { note: 57, duration: 0.22 },
      { note: 60, duration: 0.22 },
      { note: 63, duration: 0.38 },
    ],
  },
]

interface KeyItem {
  midi: number
  name: string
  isBlack: boolean
}

const INTERACTIVE_KEYS: KeyItem[] = [
  { midi: 60, name: 'C4', isBlack: false },
  { midi: 61, name: 'C#4', isBlack: true },
  { midi: 62, name: 'D4', isBlack: false },
  { midi: 63, name: 'D#4', isBlack: true },
  { midi: 64, name: 'E4', isBlack: false },
  { midi: 65, name: 'F4', isBlack: false },
  { midi: 66, name: 'F#4', isBlack: true },
  { midi: 67, name: 'G4', isBlack: false },
  { midi: 68, name: 'G#4', isBlack: true },
  { midi: 69, name: 'A4', isBlack: false },
  { midi: 70, name: 'A#4', isBlack: true },
  { midi: 71, name: 'B4', isBlack: false },
  { midi: 72, name: 'C5', isBlack: false },
]

export function SaigonHarpsichordClavecinSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedManual, setSelectedManual] = useState<KeyboardManual>('lower')
  const [lighting, setLighting] = useState<BaroqueLighting>('candlelight')
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [activeMidi, setActiveMidi] = useState<number | null>(null)
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success'>('idle')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const playbackTimeoutRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      playbackTimeoutRef.current.forEach((t) => clearTimeout(t))
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }

  // Synthesize harpsichord plucking sound:
  // Sharp attack, high harmonic content, rapid decay, subtle release
  function pluckNote(midi: number, manual: KeyboardManual = selectedManual, duration = 0.8) {
    const ctx = getAudioContext()
    if (!ctx) return

    setActiveMidi(midi)
    setTimeout(() => {
      setActiveMidi((curr) => (curr === midi ? null : curr))
    }, 250)

    const now = ctx.currentTime
    const baseFreq = midiToFreq(midi)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.connect(ctx.destination)

    // Manual configurations:
    // Lower manual: 8' (sawtooth/pulse) + 4' (octave high) -> rich, bold
    // Upper manual: 8' Lute stop (dampened, muted triangle/sine with fast decay)
    // Coupled: Lower + Upper combined
    const frequencies: { freq: number; gain: number; type: OscillatorType }[] = []

    if (manual === 'lower') {
      frequencies.push({ freq: baseFreq, gain: 0.45, type: 'sawtooth' })
      frequencies.push({ freq: baseFreq * 2, gain: 0.25, type: 'sawtooth' })
      frequencies.push({ freq: baseFreq * 3, gain: 0.12, type: 'triangle' })
    } else if (manual === 'upper') {
      // Lute stop: gentle, dampened, warm
      frequencies.push({ freq: baseFreq, gain: 0.4, type: 'triangle' })
      frequencies.push({ freq: baseFreq * 2, gain: 0.1, type: 'sine' })
    } else {
      // Coupled
      frequencies.push({ freq: baseFreq, gain: 0.5, type: 'sawtooth' })
      frequencies.push({ freq: baseFreq * 2, gain: 0.35, type: 'sawtooth' })
      frequencies.push({ freq: baseFreq * 4, gain: 0.15, type: 'triangle' })
    }

    // Highpass & lowpass to shape the wooden resonance of Harpsichord body
    const filter = ctx.createBiquadFilter()
    filter.type = manual === 'upper' ? 'lowpass' : 'bandpass'
    filter.frequency.setValueAtTime(manual === 'upper' ? 1800 : 2600, now)
    filter.Q.setValueAtTime(1.5, now)
    filter.connect(masterGain)

    frequencies.forEach(({ freq, gain, type }) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, now)

      // Sharp plucking attack: 0 to peak in 4ms
      oscGain.gain.setValueAtTime(0.0001, now)
      oscGain.gain.linearRampToValueAtTime(gain, now + 0.004)
      // Plucked decay
      const decayTime = manual === 'upper' ? duration * 0.5 : duration
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime)

      osc.connect(oscGain)
      oscGain.connect(filter)

      osc.start(now)
      osc.stop(now + decayTime + 0.05)
    })

    // Master envelope
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.004)
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.05)
  }

  function playPiece(piece: HarpsichordPiece) {
    if (isPlaying === piece.id) {
      playbackTimeoutRef.current.forEach((t) => clearTimeout(t))
      playbackTimeoutRef.current = []
      setIsPlaying(null)
      return
    }

    playbackTimeoutRef.current.forEach((t) => clearTimeout(t))
    playbackTimeoutRef.current = []
    setIsPlaying(piece.id)

    let accumulatedTime = 0
    piece.notes.forEach((item, index) => {
      const t = setTimeout(() => {
        pluckNote(item.note, selectedManual, item.duration * 2.2)
        if (index === piece.notes.length - 1) {
          setTimeout(() => setIsPlaying(null), 500)
        }
      }, accumulatedTime * 1000)

      playbackTimeoutRef.current.push(t)
      accumulatedTime += item.duration
    })
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-amber-900/30 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Phòng Hòa Tấu Đàn Clavecin Baroque Sơn Ta GuHomes"
    >
      {/* Background Ambience Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 transition-all duration-1000',
          LIGHTING_PRESETS[lighting].ambientClass
        )}
      />
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-800/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-800/25 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 shadow-sm shadow-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400/90 uppercase">
              Saigon Acoustic Atelier · Heritage Sound Chamber
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>RT60: 0.32s</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>NC-18 (&lt; 22 dBA)</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>22°C · 58% RH</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-amber-50 sm:text-4xl md:text-5xl">
              Phòng Hòa Tấu Đàn Clavecin Baroque
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Vỏ Gỗ Dổi Sơn Ta Then Thếp Vàng 24K & Sàn Tiêu Âm Sylomer Triệt Rung
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Không gian hòa tấu thính phòng được kiến tạo riêng cho cây đàn Harpsichord (Clavecin) hai tầng phím.
              Vỏ đàn do nghệ nhân làng mộc Chàng Sơn đóng mộng gỗ Dổi cổ thụ, phủ 12 lớp sơn then cẩn vỏ trứng và
              dát vàng lá hoàng gia. Toàn bộ vách tường sử dụng nan gỗ Hương vân uốn parabol phân tán âm thanh, kết hợp
              sàn nổi cách âm Sylomer ba lớp ngăn chấn động nền đô thị Sài Gòn.
            </p>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex flex-col gap-2 rounded-2xl border border-amber-900/40 bg-black/40 p-4 backdrop-blur-md lg:col-span-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
              Kịch bản ánh sáng phòng hòa tấu
            </span>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {(Object.keys(LIGHTING_PRESETS) as BaroqueLighting[]).map((key) => {
                const item = LIGHTING_PRESETS[key]
                const isActive = lighting === key
                return (
                  <button
                    key={key}
                    onClick={() => setLighting(key)}
                    className={cn(
                      'min-h-[44px] rounded-lg px-2 py-2 text-center text-xs font-medium transition-all',
                      isActive
                        ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 shadow-xs'
                        : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-transparent'
                    )}
                  >
                    {item.name.split(' ')[2]}
                  </button>
                )
              })}
            </div>
            <p className="mt-1 text-[11px] text-stone-400 line-clamp-2">
              {LIGHTING_PRESETS[lighting].description}
            </p>
          </div>
        </div>

        {/* Interactive Keyboard & Manual Switcher */}
        <div className="mt-12 rounded-2xl border border-amber-900/40 bg-black/60 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <h3 className="font-serif text-lg text-amber-100">
                Thử Nghiệm Âm Sắc Miếng Gảy Clavecin Quills
              </h3>
              <p className="text-xs text-stone-400">
                Chạm vào các phím hoặc chọn tầng bàn phím để lắng nghe cơ chế gảy dây kim loại của đàn Clavecin
              </p>
            </div>

            {/* Manual Switcher */}
            <div className="flex items-center rounded-xl border border-stone-800 bg-neutral-900 p-1">
              <button
                onClick={() => setSelectedManual('lower')}
                className={cn(
                  'min-h-[44px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  selectedManual === 'lower'
                    ? 'bg-amber-600 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                )}
              >
                Tầng Dưới (8&apos; + 4&apos; Đầy Đủ)
              </button>
              <button
                onClick={() => setSelectedManual('upper')}
                className={cn(
                  'min-h-[44px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  selectedManual === 'upper'
                    ? 'bg-amber-600 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                )}
              >
                Tầng Trên (Lute Stop Âm Êm)
              </button>
              <button
                onClick={() => setSelectedManual('coupled')}
                className={cn(
                  'min-h-[44px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  selectedManual === 'coupled'
                    ? 'bg-amber-600 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                )}
              >
                Hợp Âm Liên Tầng (Coupled)
              </button>
            </div>
          </div>

          {/* Interactive Keyboard Keys */}
          <div className="relative mx-auto mt-6 flex max-w-2xl select-none justify-center overflow-x-auto pb-4 pt-2">
            <div className="relative flex">
              {INTERACTIVE_KEYS.map((k) => {
                if (k.isBlack) return null
                const isPressed = activeMidi === k.midi
                // Find potential black key right after
                const blackKey = INTERACTIVE_KEYS.find(
                  (bk) => bk.isBlack && bk.midi === k.midi + 1
                )
                const isBlackPressed = blackKey && activeMidi === blackKey.midi

                return (
                  <div key={k.midi} className="relative">
                    {/* White Key */}
                    <button
                      onClick={() => pluckNote(k.midi)}
                      aria-label={`Phím Clavecin ${k.name}`}
                      className={cn(
                        'relative flex h-36 w-11 flex-col justify-end rounded-b-md border border-stone-800 pb-2 text-center transition-all duration-75',
                        isPressed
                          ? 'bg-amber-300 text-stone-950 shadow-inner translate-y-1'
                          : 'bg-stone-200 text-stone-800 hover:bg-stone-100'
                      )}
                    >
                      <span className="font-mono text-[10px] font-semibold">{k.name}</span>
                    </button>

                    {/* Black Key */}
                    {blackKey && (
                      <button
                        onClick={() => pluckNote(blackKey.midi)}
                        aria-label={`Phím Clavecin thăng ${blackKey.name}`}
                        className={cn(
                          'absolute -right-3 top-0 z-20 flex h-24 w-6 flex-col justify-end rounded-b-sm border border-black pb-1.5 text-center transition-all duration-75',
                          isBlackPressed
                            ? 'bg-amber-500 text-black translate-y-0.5'
                            : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                        )}
                      >
                        <span className="font-mono text-[8px]">{blackKey.name.replace('4', '')}</span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Preset Baroque Compositions */}
          <div className="mt-6 border-t border-stone-800/80 pt-5">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
              Trích đoạn kiệt tác Baroque chọn lọc:
            </span>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {HARPSICHORD_PIECES.map((piece) => {
                const active = isPlaying === piece.id
                return (
                  <div
                    key={piece.id}
                    className="flex flex-col justify-between rounded-xl border border-stone-800 bg-neutral-900/70 p-4 transition-colors hover:border-amber-700/50"
                  >
                    <div>
                      <h4 className="font-serif text-sm font-medium text-stone-100">{piece.title}</h4>
                      <p className="text-xs text-amber-400/90">{piece.composer}</p>
                      <p className="mt-2 text-xs leading-relaxed text-stone-400">{piece.desc}</p>
                    </div>
                    <button
                      onClick={() => playPiece(piece)}
                      className={cn(
                        'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors',
                        active
                          ? 'bg-amber-500 text-stone-950 font-semibold'
                          : 'bg-stone-800 text-stone-200 hover:bg-amber-700/60'
                      )}
                    >
                      {active ? (
                        <>
                          <span className="h-2 w-2 rounded-full bg-stone-950 animate-ping" />
                          Đang Diễn Tấu...
                        </>
                      ) : (
                        'Phát Hòa Tấu'
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Acoustic Engineering & Craftsmanship Specs */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">01</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Vỏ Gỗ Dổi Sơn Ta Then & Cẩn Trứng</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Gỗ Dổi núi rừng Tây Bắc phơi sấy 5 năm chống co ngót; phủ 12 lớp sơn then truyền thống Phú Thọ,
              mài nước bằng than củi xoan tạo độ bóng sâu gương, cẩn vỏ trứng gà tạo họa tiết hoa sen cổ và
              viền vàng lá 24K rực rỡ.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">02</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Sàn Sylomer Ba Lớp Cách Ly Chấn Động</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Công nghệ đệm lò xo polyurethane vi tế bào Sylomer (Áo) triệt tiêu hoàn toàn rung chấn từ đường phố
              và thang máy đô thị. Hệ số tiêu âm RT60 đạt chuẩn 0.32s giữ tiếng đàn ngân vang mà không hề nhòe âm.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">03</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Vi Khí Hậu Dưỡng Nhạc Cụ Quý Tộc</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Hệ thống điều hòa lọc khí âm trần siêu êm duy trì nhiệt độ 22°C (±0.5°C) và độ ẩm 58% RH ổn định suốt 365 ngày.
              Đảm bảo hàng trăm dây kim loại đồng thau và chốt giữ dây không bị rỉ sét hay sai lệch cao độ.
            </p>
          </div>
        </div>

        {/* Private Consultation & Acoustic Audition Booking */}
        <div className="mt-12 rounded-2xl border border-amber-800/40 bg-gradient-to-r from-amber-950/40 via-stone-900/80 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                May Đo Âm Học Dành Cho Nhà Sưu Tầm
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Thiết Kế Không Gian Hòa Tấu Riêng Cho Dinh Thự
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Đội ngũ kỹ sư âm học và nghệ nhân mộc thủ công GuHomes khảo sát hiện trạng biệt thự, lập mô phỏng
                phân rã âm thanh 3D EASE và bàn giao không gian hoàn thiện kèm chứng thư âm học chuẩn quốc tế.
              </p>
            </div>

            <div className="lg:col-span-5">
              {bookingStatus === 'success' ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-900/30 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-amber-200">
                    Đã ghi nhận yêu cầu khảo sát âm học
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    Kỹ sư trưởng âm học GuHomes sẽ liên hệ trực tiếp trong 2 giờ làm việc.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setBookingStatus('success')
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-contact`} className="sr-only">
                    Số điện thoại hoặc Email
                  </label>
                  <input
                    id={`${formId}-contact`}
                    type="text"
                    required
                    placeholder="Số điện thoại / Hotline gia chủ..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký Khảo Sát Phòng Hòa Tấu</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
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
