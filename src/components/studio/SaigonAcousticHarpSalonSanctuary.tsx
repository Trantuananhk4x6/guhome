'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type HarpLighting = 'nocturne' | 'recital' | 'aurora'
type PedalPosition = 'flat' | 'natural' | 'sharp'

interface HarpLightingPreset {
  id: HarpLighting
  name: string
  colorTemp: string
  cri: string
  lux: string
  description: string
  ambientClass: string
}

const LIGHTING_PRESETS: Record<HarpLighting, HarpLightingPreset> = {
  nocturne: {
    id: 'nocturne',
    name: 'Dạ Khúc Huyền Ảo (2200K)',
    colorTemp: '2200K Vàng Ấm Trầm Mặc',
    cri: 'CRI 99 / R9 > 97',
    lux: '40 Lux dịu êm huyền diệu',
    description: 'Vầng sáng vàng ấm buông rủ từ đỉnh vòm elip gỗ Thích, bao bọc 47 dây đàn hạc vàng óng ả trong không gian tĩnh mịch.',
    ambientClass: 'from-amber-600/20 via-neutral-900 to-black',
  },
  recital: {
    id: 'recital',
    name: 'Hòa Tấu Thính Phòng (3000K)',
    colorTemp: '3000K Ánh Dương Tinh Khiết',
    cri: 'CRI 98 / UGR < 8',
    lux: '220 Lux rọi điểm trụ đàn',
    description: 'Góc rọi hẹp 20° tôn vinh trụ đàn mạ vàng 24K và thùng cộng hưởng gỗ Vân Sam Val di Fiemme, triệt tiêu mọi chói mắt cho nghệ sĩ.',
    ambientClass: 'from-yellow-700/20 via-stone-900 to-black',
  },
  aurora: {
    id: 'aurora',
    name: 'Rạng Đông Ban Mai (4000K)',
    colorTemp: '4000K Thanh Lương Tự Nhiên',
    cri: 'CRI 97 / Phổ ánh sáng mặt trời',
    lux: '350 Lux khuếch tán vòm trần',
    description: 'Mô phỏng ánh ban mai tràn qua giếng trời Sài Gòn, khơi gợi cảm hứng luyện tập những khúc biến tấu tinh tế buổi sáng.',
    ambientClass: 'from-cyan-900/20 via-stone-900 to-black',
  },
}

// 7 Harp Pedals: Left Foot (D, C, B), Right Foot (E, F, G, A)
interface HarpPedal {
  id: string
  note: string
  foot: 'left' | 'right'
}

const HARP_PEDALS: HarpPedal[] = [
  { id: 'D', note: 'D', foot: 'left' },
  { id: 'C', note: 'C', foot: 'left' },
  { id: 'B', note: 'B', foot: 'left' },
  { id: 'E', note: 'E', foot: 'right' },
  { id: 'F', note: 'F', foot: 'right' },
  { id: 'G', note: 'G', foot: 'right' },
  { id: 'A', note: 'A', foot: 'right' },
]

interface HarpComposition {
  id: string
  title: string
  composer: string
  notes: { midi: number; duration: number }[]
  story: string
}

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

const HARP_PIECES: HarpComposition[] = [
  {
    id: 'debussy-arabesque',
    title: 'Première Arabesque',
    composer: 'Claude Debussy (1891)',
    story: 'Dòng thác nốt nhạc tuôn trào lấp lánh như làn nước sông Sài Gòn dưới nắng hoàng hôn, phô diễn trọn vẹn dải ngân vang của dây ruột cừu.',
    notes: [
      { midi: 64, duration: 0.18 },
      { midi: 68, duration: 0.18 },
      { midi: 71, duration: 0.18 },
      { midi: 76, duration: 0.28 },
      { midi: 75, duration: 0.18 },
      { midi: 71, duration: 0.18 },
      { midi: 68, duration: 0.18 },
      { midi: 64, duration: 0.35 },
    ],
  },
  {
    id: 'clair-de-lune',
    title: 'Clair de Lune',
    composer: 'Claude Debussy (1905)',
    story: 'Khúc ánh trăng huyền hoặc với những hợp âm rải arpeggio êm đềm, tan biến vào vách tiêu âm lụa tơ tằm Bảo Lộc.',
    notes: [
      { midi: 65, duration: 0.35 },
      { midi: 68, duration: 0.35 },
      { midi: 72, duration: 0.35 },
      { midi: 77, duration: 0.55 },
      { midi: 75, duration: 0.35 },
      { midi: 72, duration: 0.45 },
    ],
  },
]

export function SaigonAcousticHarpSalonSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [lighting, setLighting] = useState<HarpLighting>('nocturne')
  const [pedalStates, setPedalStates] = useState<Record<string, PedalPosition>>({
    D: 'natural',
    C: 'natural',
    B: 'natural',
    E: 'natural',
    F: 'natural',
    G: 'natural',
    A: 'natural',
  })
  const [activeMidi, setActiveMidi] = useState<number | null>(null)
  const [playingPieceId, setPlayingPieceId] = useState<string | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
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

  // Synthesize acoustic Concert Harp string:
  // Warm round attack, bell-like crystalline harmonics, sustained pure decay
  function pluckHarpString(baseMidi: number, duration = 1.4) {
    const ctx = getAudioContext()
    if (!ctx) return

    setActiveMidi(baseMidi)
    setTimeout(() => {
      setActiveMidi((curr) => (curr === baseMidi ? null : curr))
    }, 300)

    const now = ctx.currentTime
    const freq = midiToFreq(baseMidi)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.connect(ctx.destination)

    // Fundamental (warm sine) + 2nd harmonic (octave) + 3rd harmonic (twinkle)
    const partials = [
      { f: freq, g: 0.5, type: 'sine' as OscillatorType },
      { f: freq * 2, g: 0.22, type: 'triangle' as OscillatorType },
      { f: freq * 3, g: 0.08, type: 'sine' as OscillatorType },
    ]

    // Lowpass filter modeling the Val di Fiemme spruce soundboard
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(Math.min(freq * 4, 3800), now)
    filter.Q.setValueAtTime(1.2, now)
    filter.connect(masterGain)

    partials.forEach(({ f, g, type }) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(f, now)

      // Harp plucking pluck attack (soft finger flesh release 8ms)
      oscGain.gain.setValueAtTime(0.0001, now)
      oscGain.gain.linearRampToValueAtTime(g, now + 0.008)
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc.connect(oscGain)
      oscGain.connect(filter)

      osc.start(now)
      osc.stop(now + duration + 0.05)
    })

    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.008)
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.05)
  }

  function playPiece(piece: HarpComposition) {
    if (playingPieceId === piece.id) {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []
      setPlayingPieceId(null)
      return
    }

    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    setPlayingPieceId(piece.id)

    let accumulatedTime = 0
    piece.notes.forEach((item, index) => {
      const t = setTimeout(() => {
        pluckHarpString(item.midi, item.duration * 3.0)
        if (index === piece.notes.length - 1) {
          setTimeout(() => setPlayingPieceId(null), 800)
        }
      }, accumulatedTime * 1000)

      timeoutsRef.current.push(t)
      accumulatedTime += item.duration
    })
  }

  function cyclePedal(pedalId: string) {
    setPedalStates((prev) => {
      const current = prev[pedalId] ?? 'natural'
      let next: PedalPosition = 'natural'
      if (current === 'flat') next = 'natural'
      else if (current === 'natural') next = 'sharp'
      else next = 'flat'
      return { ...prev, [pedalId]: next }
    })
  }

  // 12 key strings spanning middle octaves for interactive playing
  const STRINGS = [
    { midi: 60, name: 'C4', color: 'red' }, // Middle C red string
    { midi: 62, name: 'D4', color: 'white' },
    { midi: 64, name: 'E4', color: 'white' },
    { midi: 65, name: 'F4', color: 'blue' }, // F blue/black string
    { midi: 67, name: 'G4', color: 'white' },
    { midi: 69, name: 'A4', color: 'white' },
    { midi: 71, name: 'B4', color: 'white' },
    { midi: 72, name: 'C5', color: 'red' }, // C5 red
    { midi: 74, name: 'D5', color: 'white' },
    { midi: 76, name: 'E5', color: 'white' },
    { midi: 77, name: 'F5', color: 'blue' }, // F5 blue
    { midi: 79, name: 'G5', color: 'white' },
  ]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-amber-900/30 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Phòng Hòa Tấu Đàn Hạc Giao Hưởng Gỗ Thích GuHomes"
    >
      {/* Background Ambience Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition-all duration-1000',
          LIGHTING_PRESETS[lighting].ambientClass
        )}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-yellow-600/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-800/30 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-400 shadow-sm shadow-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
              Saigon Concert Hall · Lyon & Healy / Salvi Acoustic Chamber
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>RT60: 0.36s Hoàn Mỹ</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Trần Elip Gỗ Thích Tán Âm</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>47 Dây Ruột Cừu & Dây Thép</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-amber-50 sm:text-4xl md:text-5xl">
              Phòng Hòa Tấu Đàn Hạc Giao Hưởng
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Trần Vòm Elip Gỗ Thích Bắc Mỹ & Vách Lụa Tơ Tằm Bảo Lộc Triệt Sóng Đứng
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Không gian hòa nhạc thính phòng được thiết kế chuẩn mực cho cây Concert Grand Harp 47 dây.
              Hình học trần vòm elip cong toán học giải phóng hoàn toàn các sóng đứng cộng hưởng tần số thấp,
              kết hợp hệ vách tiêu âm bọc lụa tơ tằm dệt tay Bảo Lộc lót sợi khoáng basalt nguyên sinh.
              Bệ nâng đàn hạc kiểm soát chấn động đa hướng giữ cho từng nốt rung ngân của dây ruột cừu bay bổng
              trong trẻo và tròn đầy khắp không gian.
            </p>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex flex-col gap-2 rounded-2xl border border-amber-900/40 bg-black/40 p-4 backdrop-blur-md lg:col-span-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
              Kịch bản ánh sáng thính phòng
            </span>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {(Object.keys(LIGHTING_PRESETS) as HarpLighting[]).map((key) => {
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
                    {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                  </button>
                )
              })}
            </div>
            <p className="mt-1 text-[11px] text-stone-400 line-clamp-2">
              {LIGHTING_PRESETS[lighting].description}
            </p>
          </div>
        </div>

        {/* Interactive Harp Strings & Pedal Matrix */}
        <div className="mt-12 rounded-2xl border border-amber-900/40 bg-black/60 p-6 backdrop-blur-xl">
          <div className="border-b border-stone-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              Khám phá cung bậc đàn hạc giao hưởng
            </span>
            <h3 className="font-serif text-lg text-stone-100">
              Gảy Thử Dây Đàn Hạc (Dây Đỏ nốt C, Dây Lam nốt F)
            </h3>
            <p className="text-xs text-stone-400">
              Chạm hoặc click lên từng dây đàn để cảm nhận âm sắc ngân vang tinh khiết của hộp cộng hưởng gỗ Thích
            </p>
          </div>

          {/* Vertical Harp Strings Interactive Layout */}
          <div className="mt-8 flex justify-center gap-3 overflow-x-auto pb-6 pt-2">
            {STRINGS.map((str) => {
              const isPlucked = activeMidi === str.midi
              const isRed = str.color === 'red'
              const isBlue = str.color === 'blue'

              return (
                <button
                  key={str.midi}
                  onClick={() => pluckHarpString(str.midi)}
                  aria-label={`Dây đàn hạc ${str.name}`}
                  className={cn(
                    'group relative flex min-h-[44px] w-12 flex-col items-center justify-between rounded-xl border border-stone-800 bg-neutral-900/80 p-2 transition-all duration-200 hover:border-amber-500/50',
                    isPlucked && 'scale-105 border-amber-400 bg-amber-950/40'
                  )}
                >
                  <span className="font-mono text-[10px] text-stone-400">{str.name}</span>
                  {/* The string line visual */}
                  <div
                    className={cn(
                      'my-2 h-40 w-1 rounded-full transition-all duration-150 group-hover:scale-x-150',
                      isRed
                        ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                        : isBlue
                          ? 'bg-sky-500 shadow-sm shadow-sky-500/50'
                          : 'bg-stone-300 shadow-sm shadow-stone-200/50',
                      isPlucked && 'animate-pulse scale-x-200'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[9px] font-mono',
                      isRed ? 'text-rose-400' : isBlue ? 'text-sky-400' : 'text-stone-500'
                    )}
                  >
                    {isRed ? 'RED' : isBlue ? 'BLUE' : 'GUT'}
                  </span>
                </button>
              )
            })}
          </div>

          {/* 7 Pedals Control Matrix */}
          <div className="mt-6 border-t border-stone-800/80 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
                Sơ đồ 7 Bàn Đạp (Harp Double-Action Pedals):
              </span>
              <span className="text-[11px] text-stone-400">
                Chân trái: D - C - B | Chân phải: E - F - G - A (Nhấp để đổi nấc: ♭ giáng / ♮ bình / ♯ thăng)
              </span>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2">
              {HARP_PEDALS.map((p) => {
                const state = pedalStates[p.id] ?? 'natural'
                return (
                  <button
                    key={p.id}
                    onClick={() => cyclePedal(p.id)}
                    className={cn(
                      'flex min-h-[44px] flex-col items-center justify-center rounded-xl border p-2 text-center transition-all',
                      state === 'sharp'
                        ? 'border-amber-500 bg-amber-600/30 text-amber-200'
                        : state === 'flat'
                          ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                          : 'border-stone-800 bg-neutral-900 text-stone-300 hover:border-stone-700'
                    )}
                  >
                    <span className="font-serif text-sm font-semibold">{p.note}</span>
                    <span className="font-mono text-[10px] mt-0.5 font-bold">
                      {state === 'sharp' ? '♯ THĂNG' : state === 'flat' ? '♭ GIÁNG' : '♮ BÌNH'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Preset Repertoire Playback */}
          <div className="mt-6 border-t border-stone-800/80 pt-5">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
              Trích đoạn giao hưởng trữ tình cho đàn hạc:
            </span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {HARP_PIECES.map((piece) => {
                const active = playingPieceId === piece.id
                return (
                  <div
                    key={piece.id}
                    className="flex flex-col justify-between rounded-xl border border-stone-800 bg-neutral-900/60 p-4 transition-colors hover:border-amber-700/50"
                  >
                    <div>
                      <h4 className="font-serif text-sm font-medium text-stone-100">{piece.title}</h4>
                      <p className="text-xs text-amber-400/90">{piece.composer}</p>
                      <p className="mt-2 text-xs leading-relaxed text-stone-400">{piece.story}</p>
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
                          Đang Ngân Vang...
                        </>
                      ) : (
                        'Lắng Nghe Trích Đoạn'
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Acoustic Engineering Pillars */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">01</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Trần Vòm Elip Gỗ Thích Tán Âm Đa Chiều</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Gỗ Thích Bắc Mỹ sấy chân không 3 năm; trần elip cong vòm tán âm đồng đều khắp không gian,
              triệt tiêu hiện tượng dội âm flutter echo, mang lại độ trong trẻo tuyệt đối cho các dải âm cao vút.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">02</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Vách Lụa Tơ Tằm Bảo Lộc Tiêu Âm</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Lớp phủ bề mặt dệt từ tơ tằm nguyên chất xứ sương mù Bảo Lộc, lót bông khoáng đá bazan Basaltrock
              tỷ trọng 80kg/m³ hấp thụ hoàn hảo dải trung âm, giữ âm sắc ấm áp và sang trọng.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">03</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Bệ Nâng Đàn Hạc Khử Rung Đa Hướng</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Bệ đứng đàn hạc gia cố khung thép đúc kết hợp đệm cao su Sylomer giảm rung đa hướng,
              ngăn truyền sóng rung cơ học xuống sàn nhà và giữ chân đàn ổn định tuyệt đối khi đạp pedal.
            </p>
          </div>
        </div>

        {/* Private Consultation & Acoustic Audition */}
        <div className="mt-12 rounded-2xl border border-amber-800/40 bg-gradient-to-r from-amber-950/40 via-stone-900/80 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                May Đo Âm Học Giao Hưởng
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Thiết Kế Thính Phòng Đàn Hạc Riêng Cho Dinh Thự
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                GuHomes cung cấp giải pháp trọn gói từ tính toán mô phỏng âm học 3D ray-tracing, gia công trần vòm gỗ Thích
                tại xưởng mộc Thạnh Xuân đến căn chỉnh vi khí hậu bảo vệ đàn hạc quý giá.
              </p>
            </div>

            <div className="lg:col-span-5">
              {bookingSuccess ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-900/30 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-amber-200">
                    Đã ghi nhận yêu cầu tư vấn thính phòng đàn hạc
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    Kỹ sư trưởng âm học GuHomes sẽ liên hệ gửi tài liệu giải pháp chuyên sâu.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setBookingSuccess(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-harp-phone`} className="sr-only">
                    Số điện thoại gia chủ
                  </label>
                  <input
                    id={`${formId}-harp-phone`}
                    type="text"
                    required
                    placeholder="Số điện thoại / Diện tích phòng dự kiến..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký Tư Vấn Thính Phòng</span>
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
