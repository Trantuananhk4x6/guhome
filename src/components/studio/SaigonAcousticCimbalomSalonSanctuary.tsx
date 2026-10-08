'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type InstrumentMode = 'dan-day' | 'tam-thap-luc'
type SalonLighting = 'ca-tru' | 'tai-tu' | 'tinh-tam'

interface LightingPreset {
  id: SalonLighting
  name: string
  colorTemp: string
  cri: string
  lux: string
  description: string
  ambientClass: string
}

const LIGHTING_PRESETS: Record<SalonLighting, LightingPreset> = {
  'ca-tru': {
    id: 'ca-tru',
    name: 'Không Gian Ca Trù Thính Phòng (2200K)',
    colorTemp: '2200K Hổ Phách Cung Đình',
    cri: 'CRI 99 / R9 > 98',
    lux: '45 Lux dịu mắt thiền định',
    description: 'Ánh nến sáp ong rọi điểm lên manh chiếu hoa cạp điều, tôn vinh thớ gỗ Trắc bóng gương và thùng đàn Đáy dọc dài.',
    ambientClass: 'from-amber-700/25 via-stone-900 to-black',
  },
  'tai-tu': {
    id: 'tai-tu',
    name: 'Đờn Ca Tài Tử Nam Bộ (2500K)',
    colorTemp: '2500K Nắng Chiều Sông Nước',
    cri: 'CRI 98 / UGR < 6',
    lux: '120 Lux khuếch tán vòm trần',
    description: 'Gợi nhắc ánh hoàng hôn trên bến sông Tiền sông Hậu, tiếng đàn Tam Thập Lục róc rách như giọt mưa rơi trên mái lá.',
    ambientClass: 'from-orange-700/20 via-neutral-900 to-black',
  },
  'tinh-tam': {
    id: 'tinh-tam',
    name: 'Thiền Tịnh Khắc Đêm (2000K)',
    colorTemp: '2000K Trầm Mặc Lắng Đọng',
    cri: 'CRI 96 / Không ánh sáng xanh',
    lux: '25 Lux ánh sáng chân tường',
    description: 'Ánh hắt chân nan gỗ Dầu rái Fermat, để lại không gian lắng sâu tuyệt đối cho từng nốt ngân rung ngũ cung.',
    ambientClass: 'from-amber-900/20 via-zinc-950 to-black',
  },
}

interface Piece {
  id: string
  title: string
  tradition: string
  notes: { midi: number; duration: number }[]
  story: string
}

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

const REPERTOIRE: Piece[] = [
  {
    id: 'luu-thuy-kim-tien',
    title: 'Lưu Thủy Kim Tiền',
    tradition: 'Nhã nhạc & Cổ nhạc Nam Bộ',
    story: 'Giai điệu rộn ràng, uyển chuyển mô tả dòng nước chảy cuộn tràn tài lộc, phối hợp giữa tiếng gõ que tre thánh thót của Tam Thập Lục và âm trầm đàn Đáy.',
    notes: [
      { midi: 60, duration: 0.2 },
      { midi: 62, duration: 0.2 },
      { midi: 65, duration: 0.2 },
      { midi: 67, duration: 0.3 },
      { midi: 65, duration: 0.2 },
      { midi: 62, duration: 0.2 },
      { midi: 60, duration: 0.35 },
      { midi: 57, duration: 0.2 },
      { midi: 60, duration: 0.4 },
    ],
  },
  {
    id: 'da-co-hoai-lang',
    title: 'Dạ Cổ Hoài Lang (Cao Văn Lầu)',
    tradition: 'Đờn ca tài tử Nam Bộ',
    story: 'Khúc ca vọng cổ tha thiết trong đêm thanh vắng, từng ngón rung nhấn nhá đặc trưng của cần đàn Đáy dài 1.6m khơi gợi nỗi niềm hoài cổ khôn nguôi.',
    notes: [
      { midi: 57, duration: 0.4 },
      { midi: 60, duration: 0.3 },
      { midi: 62, duration: 0.5 },
      { midi: 65, duration: 0.4 },
      { midi: 62, duration: 0.3 },
      { midi: 60, duration: 0.6 },
    ],
  },
]

// 12 representative pitches for Tam Thap Luc strings
const ZITHER_STRINGS = [
  { midi: 55, pitch: 'Sol 3', noteName: 'Hò' },
  { midi: 57, pitch: 'La 3', noteName: 'Xự' },
  { midi: 60, pitch: 'Do 4', noteName: 'Xang' },
  { midi: 62, pitch: 'Re 4', noteName: 'Xê' },
  { midi: 64, pitch: 'Mi 4', noteName: 'Cống' },
  { midi: 67, pitch: 'Sol 4', noteName: 'Phan' },
  { midi: 69, pitch: 'La 4', noteName: 'Líu' },
  { midi: 72, pitch: 'Do 5', noteName: 'Ú' },
  { midi: 74, pitch: 'Re 5', noteName: 'Xê cao' },
  { midi: 76, pitch: 'Mi 5', noteName: 'Cống cao' },
  { midi: 79, pitch: 'Sol 5', noteName: 'Phan cao' },
  { midi: 81, pitch: 'La 5', noteName: 'Líu cao' },
]

export function SaigonAcousticCimbalomSalonSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [instrument, setInstrument] = useState<InstrumentMode>('tam-thap-luc')
  const [lighting, setLighting] = useState<SalonLighting>('ca-tru')
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

  // Synthesize either Dan Day (deep plucked silk/gut with vibrato) or Tam Thap Luc (struck brass string with bamboo mallet)
  function playNote(midi: number, mode = instrument, duration = 1.0) {
    const ctx = getAudioContext()
    if (!ctx) return

    setActiveMidi(midi)
    setTimeout(() => {
      setActiveMidi((curr) => (curr === midi ? null : curr))
    }, 280)

    const now = ctx.currentTime
    const freq = midiToFreq(midi)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.connect(ctx.destination)

    if (mode === 'tam-thap-luc') {
      // Struck hammered zither: crisp bamboo strike attack, metallic brass shimmer
      const strikeOsc = ctx.createOscillator()
      const strikeGain = ctx.createGain()
      strikeOsc.type = 'triangle'
      strikeOsc.frequency.setValueAtTime(freq, now)

      strikeGain.gain.setValueAtTime(0.0001, now)
      strikeGain.gain.linearRampToValueAtTime(0.4, now + 0.004)
      strikeGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      // Harmonics
      const harmOsc = ctx.createOscillator()
      const harmGain = ctx.createGain()
      harmOsc.type = 'sine'
      harmOsc.frequency.setValueAtTime(freq * 2, now)

      harmGain.gain.setValueAtTime(0.0001, now)
      harmGain.gain.linearRampToValueAtTime(0.18, now + 0.003)
      harmGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7)

      strikeOsc.connect(strikeGain)
      harmOsc.connect(harmGain)
      strikeGain.connect(masterGain)
      harmGain.connect(masterGain)

      strikeOsc.start(now)
      harmOsc.start(now)
      strikeOsc.stop(now + duration + 0.1)
      harmOsc.stop(now + duration + 0.1)

      masterGain.gain.linearRampToValueAtTime(0.35, now + 0.004)
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    } else {
      // Dan Day: deep, hollow, long neck silk string with pitch scoop & vibrato
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()
      osc.type = 'sawtooth'

      // Pitch scoop representing Dan Day sliding finger
      osc.frequency.setValueAtTime(freq * 0.96, now)
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.06)

      // Filter to simulate wooden body resonance
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, now)
      filter.Q.setValueAtTime(3.0, now)

      oscGain.gain.setValueAtTime(0.0001, now)
      oscGain.gain.linearRampToValueAtTime(0.45, now + 0.02)
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.3)

      osc.connect(oscGain)
      oscGain.connect(filter)
      filter.connect(masterGain)

      osc.start(now)
      osc.stop(now + duration * 1.3 + 0.1)

      masterGain.gain.linearRampToValueAtTime(0.4, now + 0.02)
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.3)
    }
  }

  function playPiece(piece: Piece) {
    if (playingPieceId === piece.id) {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []
      setPlayingPieceId(null)
      return
    }

    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
    setPlayingPieceId(piece.id)

    let acc = 0
    piece.notes.forEach((item, index) => {
      const t = setTimeout(() => {
        playNote(item.midi, instrument, item.duration * 2.0)
        if (index === piece.notes.length - 1) {
          setTimeout(() => setPlayingPieceId(null), 600)
        }
      }, acc * 1000)

      timeoutsRef.current.push(t)
      acc += item.duration
    })
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-amber-900/30 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Phòng Hòa Âm Đàn Đáy & Tam Thập Lục GuHomes"
    >
      {/* Background Ambience */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition-all duration-1000',
          LIGHTING_PRESETS[lighting].ambientClass
        )}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-orange-700/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-800/30 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 shadow-sm shadow-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
              Saigon Heritage Chamber · Nhã Nhạc & Ca Trù Atelier
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>RT60: 0.34s Hoàn Hảo</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Nan Fermat Gỗ Dầu Rái</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Thùng Đàn Gỗ Ngô Đồng & Trắc</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-amber-50 sm:text-4xl md:text-5xl">
              Phòng Hòa Âm Đàn Đáy & Tam Thập Lục
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Không Gian Thính Âm Cổ Truyền, Vách Gỗ Trắc Tiêu Âm & Manh Chiếu Dệt Tơ Cung Đình
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Nơi hội tụ tinh hoa âm nhạc thính phòng bác học cổ truyền Việt Nam ngay trong tư gia dinh thự.
              Cần đàn Đáy dài 1.6m dọc làm từ gỗ Trắc cẩn xà cừ kết hợp mặt bảng gỗ Ngô Đồng phát ra tiếng đàn
              trầm đục, luyến láy ngũ cung sâu thẳm; hòa quyện cùng tiếng que tre gõ trên 36 dây đồng của đàn Tam Thập Lục.
              Vách phòng ứng dụng nan gỗ Dầu rái xoắn Fermat hấp thụ sóng đứng trung cao, giữ thời gian vang RT60 = 0.34s
              cho từng tiếng phách, tiếng trống chầu vang rền thanh tịnh.
            </p>
          </div>

          {/* Lighting Selector */}
          <div className="flex flex-col gap-2 rounded-2xl border border-amber-900/40 bg-black/40 p-4 backdrop-blur-md lg:col-span-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
              Kịch bản ánh sáng thính phòng
            </span>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {(Object.keys(LIGHTING_PRESETS) as SalonLighting[]).map((key) => {
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

        {/* Interactive Instrument Switcher & 36 Strings */}
        <div className="mt-12 rounded-2xl border border-amber-900/40 bg-black/60 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Khám phá âm sắc tơ đồng
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Thử Nghiệm Tiếng Gõ Que Tre & Cần Rung Ngón
              </h3>
            </div>

            {/* Instrument Toggle */}
            <div className="flex items-center rounded-xl border border-stone-800 bg-neutral-900 p-1">
              <button
                onClick={() => setInstrument('tam-thap-luc')}
                className={cn(
                  'min-h-[44px] rounded-lg px-4 py-1.5 text-xs font-medium transition-colors',
                  instrument === 'tam-thap-luc'
                    ? 'bg-amber-600 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                )}
              >
                Đàn Tam Thập Lục (36 Dây)
              </button>
              <button
                onClick={() => setInstrument('dan-day')}
                className={cn(
                  'min-h-[44px] rounded-lg px-4 py-1.5 text-xs font-medium transition-colors',
                  instrument === 'dan-day'
                    ? 'bg-amber-600 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                )}
              >
                Đàn Đáy Ca Trù (Dây Tơ)
              </button>
            </div>
          </div>

          {/* Interactive Strings Board */}
          <div className="mt-8 flex justify-center gap-2 overflow-x-auto pb-6 pt-2">
            {ZITHER_STRINGS.map((str) => {
              const isPlucked = activeMidi === str.midi
              return (
                <button
                  key={str.midi}
                  onClick={() => playNote(str.midi)}
                  aria-label={`Dây cung ${str.pitch} (${str.noteName})`}
                  className={cn(
                    'group relative flex min-h-[44px] w-14 flex-col items-center justify-between rounded-xl border border-stone-800 bg-neutral-900/80 p-2 transition-all duration-200 hover:border-amber-500/50',
                    isPlucked && 'scale-105 border-amber-400 bg-amber-950/40'
                  )}
                >
                  <span className="font-mono text-[9px] text-stone-400 text-center leading-tight">
                    {str.pitch}
                  </span>
                  {/* Brass or Silk String Line */}
                  <div
                    className={cn(
                      'my-2 h-36 w-0.5 rounded-full transition-all duration-150 group-hover:scale-x-150',
                      instrument === 'tam-thap-luc'
                        ? 'bg-amber-400 shadow-sm shadow-amber-400/50'
                        : 'bg-stone-300 shadow-sm shadow-stone-300/50',
                      isPlucked && 'animate-pulse scale-x-200'
                    )}
                  />
                  <span className="text-[10px] font-serif text-amber-300/90 font-medium">
                    {str.noteName}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Repertoire Playback */}
          <div className="mt-6 border-t border-stone-800/80 pt-5">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
              Kiệt tác cổ nhạc Việt Nam chọn lọc:
            </span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {REPERTOIRE.map((piece) => {
                const active = playingPieceId === piece.id
                return (
                  <div
                    key={piece.id}
                    className="flex flex-col justify-between rounded-xl border border-stone-800 bg-neutral-900/60 p-4 transition-colors hover:border-amber-700/50"
                  >
                    <div>
                      <h4 className="font-serif text-sm font-medium text-stone-100">{piece.title}</h4>
                      <p className="text-xs text-amber-400/90">{piece.tradition}</p>
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
                          Đang Diễn Tấu...
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

        {/* 3 Acoustic Pillars */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">01</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Nan Tán Âm Fermat Gỗ Dầu Rái</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Bố trí góc nghiêng toán học theo đường xoắn ốc Fermat triệt tiêu sóng đứng tần số 500Hz - 4.000Hz,
              giúp tiếng gõ que tre trên đàn Tam Thập Lục không bị chói gắt mà ngân dài ấm áp.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">02</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Thùng Đàn Gỗ Ngô Đồng & Gỗ Trắc</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Đàn Đáy chế tác với mặt bảng gỗ Ngô Đồng nhẹ xốp tạo độ rung sâu trầm; vách thùng gỗ Trắc đặc chắc
              giữ âm không thoát ra ngoài, kiến tạo độ ngân vang đặc trưng chỉ có trong nghệ thuật Ca Trù.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">03</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Bệ Nghệ Sĩ Trải Chiếu Tơ Lụa Cung Đình</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Khu vực ngồi đờn nâng cao 15cm cách ly sàn nhà, trải chiếu cói dệt tay thêu viền lụa tơ tằm,
              vừa là điểm nhấn thẩm mỹ Quiet Luxury vừa là vật liệu hút âm tự nhiên dải trung trầm.
            </p>
          </div>
        </div>

        {/* Private Consultation Form */}
        <div className="mt-12 rounded-2xl border border-amber-800/40 bg-gradient-to-r from-amber-950/40 via-stone-900/80 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Không gian âm nhạc bác học dân tộc
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Tư Vấn Thiết Kế Thính Phòng Cổ Nhạc Riêng Cho Biệt Thự
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                KTS GuHomes lập phương án cách âm tiêu chuẩn phòng thu quốc tế, kết hợp bộ sưu tập nhạc cụ
                chế tác thủ công bởi các nghệ nhân lão thành cho gia đình gia chủ.
              </p>
            </div>

            <div className="lg:col-span-5">
              {bookingSuccess ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-900/30 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-amber-200">
                    Đã ghi nhận yêu cầu tư vấn thính phòng cổ nhạc
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    Kỹ sư trưởng âm học GuHomes sẽ liên hệ để trao đổi trực tiếp.
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
                  <label htmlFor={`${formId}-salon-phone`} className="sr-only">
                    Số điện thoại gia chủ
                  </label>
                  <input
                    id={`${formId}-salon-phone`}
                    type="text"
                    required
                    placeholder="Số điện thoại / Nhu cầu không gian..."
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
