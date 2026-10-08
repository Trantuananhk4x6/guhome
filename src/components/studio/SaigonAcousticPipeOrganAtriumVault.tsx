'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type OrganStop = 'principal8' | 'flute4' | 'bourdon16' | 'celeste8'
type OrganLighting = 'cathedral' | 'midnight' | 'toccata'

interface LightingPreset {
  id: OrganLighting
  name: string
  colorTemp: string
  cri: string
  lux: string
  description: string
  ambientClass: string
}

const LIGHTING_PRESETS: Record<OrganLighting, LightingPreset> = {
  cathedral: {
    id: 'cathedral',
    name: 'Ánh Sáng Kính Màu Thánh Đường (2400K)',
    colorTemp: '2400K Hổ Phách Lung Linh',
    cri: 'CRI 99 / R9 > 97',
    lux: '55 Lux hắt vòm trần 9.6m',
    description: 'Ánh rọi xuyên qua vách kính nghệ thuật thủ công, nhuộm sắc vàng hổ phách lên 1.200 ống sáo thiếc-chì sáng bóng.',
    ambientClass: 'from-amber-600/25 via-stone-900 to-black',
  },
  midnight: {
    id: 'midnight',
    name: 'Thiền Định Tĩnh Lặng Nửa Đêm (1900K)',
    colorTemp: '1900K Vàng Đậm Trầm Mặc',
    cri: 'CRI 97 / Không ánh sáng xanh',
    lux: '25 Lux rọi bàn phím gỗ Dổi',
    description: 'Chỉ có bàn phím ba tầng và bàn đạp chân pedal tỏa sáng dịu êm, trả lại không gian cho dải trầm 16Hz rung động trực giác.',
    ambientClass: 'from-orange-800/20 via-zinc-900 to-black',
  },
  toccata: {
    id: 'toccata',
    name: 'Đại Hợp Xướng Toccata (3200K)',
    colorTemp: '3200K Rực Rỡ Uy Nghiêm',
    cri: 'CRI 98 / UGR < 6',
    lux: '300 Lux rọi toàn cảnh giàn ống',
    description: 'Góc chiếu rộng làm nổi bật toàn bộ mặt tiền dàn ống phong cầm cơ khí và vòm trần gỗ Dổi cong toán học.',
    ambientClass: 'from-yellow-600/20 via-neutral-900 to-black',
  },
}

interface StopInfo {
  id: OrganStop
  name: string
  pipeFoot: string
  timbre: string
  material: string
}

const ORGAN_STOPS: Record<OrganStop, StopInfo> = {
  principal8: {
    id: 'principal8',
    name: 'Principal 8&apos;',
    pipeFoot: '8 Foot (Âm nền chuẩn)',
    timbre: 'Âm sắc trang nghiêm, vang sáng đặc trưng của kim loại thiếc',
    material: 'Hợp kim thiếc-chì 70/30 đánh bóng tay',
  },
  flute4: {
    id: 'flute4',
    name: 'Flûte Harmonique 4&apos;',
    pipeFoot: '4 Foot (Quãng tám cao)',
    timbre: 'Trong trẻo, thanh tao như tiếng sáo chim ban mai',
    material: 'Gỗ Thông Tuyết phơi khô tự nhiên 5 năm',
  },
  bourdon16: {
    id: 'bourdon16',
    name: 'Bourdon 16&apos;',
    pipeFoot: '16 Foot (Hạ âm siêu trầm)',
    timbre: 'Âm trầm sâu lắng 16Hz rung động lồng ngực và sàn nhà',
    material: 'Gỗ Dổi núi rừng kết hợp đế đúc chì nguyên khối',
  },
  celeste8: {
    id: 'celeste8',
    name: 'Voix Céleste 8&apos;',
    pipeFoot: '8 Foot (Hiệu ứng nhấp nhô lượn sóng)',
    timbre: 'Huyền ảo, gợn sóng tinh tế đưa tâm trí vào cõi an nhiên',
    material: 'Ống sáo thuôn vuốt côn tạo độ trễ vi phân',
  },
}

interface OrganKey {
  midi: number
  name: string
  isBlack: boolean
}

const KEYS: OrganKey[] = [
  { midi: 50, name: 'D3', isBlack: false },
  { midi: 51, name: 'D#3', isBlack: true },
  { midi: 52, name: 'E3', isBlack: false },
  { midi: 53, name: 'F3', isBlack: false },
  { midi: 54, name: 'F#3', isBlack: true },
  { midi: 55, name: 'G3', isBlack: false },
  { midi: 56, name: 'G#3', isBlack: true },
  { midi: 57, name: 'A3', isBlack: false },
  { midi: 58, name: 'A#3', isBlack: true },
  { midi: 59, name: 'B3', isBlack: false },
  { midi: 60, name: 'C4', isBlack: false },
  { midi: 61, name: 'C#4', isBlack: true },
  { midi: 62, name: 'D4', isBlack: false },
]

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

export function SaigonAcousticPipeOrganAtriumVault({ className }: { className?: string }) {
  const formId = useId()
  const [activeStops, setActiveStops] = useState<Record<OrganStop, boolean>>({
    principal8: true,
    flute4: true,
    bourdon16: false,
    celeste8: false,
  })
  const [lighting, setLighting] = useState<OrganLighting>('cathedral')
  const [activeMidi, setActiveMidi] = useState<number | null>(null)
  const [windPressure, setWindPressure] = useState<number>(85) // mm Water column
  const [isPlayingToccata, setIsPlayingToccata] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const playTimeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      playTimeoutsRef.current.forEach((t) => clearTimeout(t))
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

  // Synthesize acoustic pipe organ with additive air pipe sound
  function playOrganNote(midi: number, duration = 1.2) {
    const ctx = getAudioContext()
    if (!ctx) return

    setActiveMidi(midi)
    setTimeout(() => {
      setActiveMidi((curr) => (curr === midi ? null : curr))
    }, 400)

    const now = ctx.currentTime
    const baseFreq = midiToFreq(midi)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.connect(ctx.destination)

    // Build stop harmonics
    const pipesToPlay: { freq: number; gain: number; type: OscillatorType }[] = []

    if (activeStops.principal8) {
      pipesToPlay.push({ freq: baseFreq, gain: 0.35, type: 'sawtooth' })
      pipesToPlay.push({ freq: baseFreq * 2, gain: 0.18, type: 'sine' })
      pipesToPlay.push({ freq: baseFreq * 3, gain: 0.08, type: 'triangle' })
    }
    if (activeStops.flute4) {
      pipesToPlay.push({ freq: baseFreq * 2, gain: 0.28, type: 'sine' })
      pipesToPlay.push({ freq: baseFreq * 4, gain: 0.12, type: 'sine' })
    }
    if (activeStops.bourdon16) {
      pipesToPlay.push({ freq: baseFreq * 0.5, gain: 0.5, type: 'triangle' })
      pipesToPlay.push({ freq: baseFreq, gain: 0.2, type: 'sine' })
    }
    if (activeStops.celeste8) {
      pipesToPlay.push({ freq: baseFreq * 1.004, gain: 0.25, type: 'sawtooth' })
      pipesToPlay.push({ freq: baseFreq * 0.996, gain: 0.25, type: 'sawtooth' })
    }

    // Default fallback if no stops active
    if (pipesToPlay.length === 0) {
      pipesToPlay.push({ freq: baseFreq, gain: 0.3, type: 'sawtooth' })
    }

    // Acoustic chamber resonance filter (9.6m Atrium vault)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2400 + (windPressure - 75) * 20, now)
    filter.Q.setValueAtTime(1.8, now)
    filter.connect(masterGain)

    pipesToPlay.forEach(({ freq, gain, type }) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, now)

      // Pipe wind onset attack (25ms breath)
      oscGain.gain.setValueAtTime(0.0001, now)
      oscGain.gain.linearRampToValueAtTime(gain, now + 0.025)
      // Pipe sustain & release
      oscGain.gain.setValueAtTime(gain, now + duration)
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.35)

      osc.connect(oscGain)
      oscGain.connect(filter)

      osc.start(now)
      osc.stop(now + duration + 0.4)
    })

    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.025)
    masterGain.gain.setValueAtTime(0.4, now + duration)
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.4)
  }

  // Famous Bach Toccata opening phrase in D Minor
  function playBachToccata() {
    if (isPlayingToccata) {
      playTimeoutsRef.current.forEach((t) => clearTimeout(t))
      playTimeoutsRef.current = []
      setIsPlayingToccata(false)
      return
    }

    playTimeoutsRef.current.forEach((t) => clearTimeout(t))
    playTimeoutsRef.current = []
    setIsPlayingToccata(true)

    const toccataNotes = [
      { midi: 62, dur: 0.25 }, // A4
      { midi: 60, dur: 0.25 }, // G4
      { midi: 62, dur: 0.9 },  // A4 hold
      { midi: 57, dur: 0.35 }, // D4
      { midi: 55, dur: 0.35 }, // C4
      { midi: 53, dur: 0.35 }, // Bb3
      { midi: 52, dur: 0.35 }, // A3
      { midi: 50, dur: 1.4 },  // D3 deep organ pedal
    ]

    let acc = 0
    toccataNotes.forEach((item, idx) => {
      const t = setTimeout(() => {
        playOrganNote(item.midi, item.dur)
        if (idx === toccataNotes.length - 1) {
          setTimeout(() => setIsPlayingToccata(false), 800)
        }
      }, acc * 1000)

      playTimeoutsRef.current.push(t)
      acc += item.dur + 0.08
    })
  }

  function toggleStop(stop: OrganStop) {
    setActiveStops((prev) => ({ ...prev, [stop]: !prev[stop] }))
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-amber-900/30 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Điện Thính Phòng Đại Phong Cầm Pipe Organ Atrium Vault GuHomes"
    >
      {/* Background Ambience */}
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
              Saigon Grand Atrium · 1.200 Pipe Organ Cathedral Sanctuary
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>Dải Tần 16Hz - 8.000Hz</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Vòm Trần Gỗ Dổi 9.6m</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>RT60: 0.55s Thiền Tịnh</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-amber-50 sm:text-4xl md:text-5xl">
              Điện Thính Phòng Đại Phong Cầm
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Hệ Thống 1.200 Ống Sáo Cơ Khí Thiếc-Chì & Vòm Trần Parabol Tiêu Âm Cao 9.6m
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Kiệt tác âm thanh vĩ đại bậc nhất được đưa vào lòng tư gia dinh thự.
              Giàn đại phong cầm cơ khí (Tracker Action Pipe Organ) gồm 1.200 ống sáo kim loại thiếc-chì 70/30
              và ống sáo gỗ Thông Tuyết, tái tạo trọn vẹn dải hạ âm 16Hz rung động trực giác.
              Không gian thông tầng cao 9.6m được bao bọc bởi vòm trần parabol gỗ Dổi tiêu âm khuếch tán sóng âm,
              kết hợp hệ thống quạt đệm khí nén áp suất ổn định cực êm dưới 12 dBA.
            </p>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex flex-col gap-2 rounded-2xl border border-amber-900/40 bg-black/40 p-4 backdrop-blur-md lg:col-span-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
              Kịch bản ánh sáng thính phòng
            </span>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {(Object.keys(LIGHTING_PRESETS) as OrganLighting[]).map((key) => {
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

        {/* Organ Stops & Interactive Keyboard */}
        <div className="mt-12 rounded-2xl border border-amber-900/40 bg-black/60 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Bộ đăng ký hơi đại phong cầm
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Chọn Dải Âm Sắc (Organ Stops) & Phím Đàn
              </h3>
            </div>

            {/* Bach Toccata Button */}
            <button
              onClick={playBachToccata}
              className={cn(
                'flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all',
                isPlayingToccata
                  ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-400/30'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingToccata ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-stone-950 animate-ping" />
                  Đang Hòa Tấu Toccata BWV 565... (Dừng)
                </>
              ) : (
                'Hòa Tấu Toccata in D Minor (Bach)'
              )}
            </button>
          </div>

          {/* 4 Organ Stops Switchers */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(ORGAN_STOPS) as OrganStop[]).map((stopKey) => {
              const stop = ORGAN_STOPS[stopKey]
              const isTurnedOn = activeStops[stopKey]
              return (
                <button
                  key={stopKey}
                  onClick={() => toggleStop(stopKey)}
                  className={cn(
                    'flex min-h-[44px] flex-col justify-between rounded-xl border p-4 text-left transition-all',
                    isTurnedOn
                      ? 'border-amber-500 bg-amber-600/20 text-stone-100 shadow-inner'
                      : 'border-stone-800 bg-neutral-900/70 text-stone-400 hover:border-stone-700'
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-serif text-base font-semibold text-amber-200" dangerouslySetInnerHTML={{ __html: stop.name }} />
                    <span
                      className={cn(
                        'h-3 w-3 rounded-full border',
                        isTurnedOn ? 'bg-amber-400 border-amber-300' : 'bg-stone-800 border-stone-600'
                      )}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-amber-400/90 mt-1">{stop.pipeFoot}</span>
                  <p className="mt-2 text-xs leading-relaxed text-stone-300 line-clamp-2">{stop.timbre}</p>
                </button>
              )
            })}
          </div>

          {/* Interactive Keyboard Keys */}
          <div className="relative mx-auto mt-8 flex max-w-2xl select-none justify-center overflow-x-auto pb-4 pt-2">
            <div className="relative flex">
              {KEYS.map((k) => {
                if (k.isBlack) return null
                const isPressed = activeMidi === k.midi
                const blackKey = KEYS.find((bk) => bk.isBlack && bk.midi === k.midi + 1)
                const isBlackPressed = blackKey && activeMidi === blackKey.midi

                return (
                  <div key={k.midi} className="relative">
                    {/* White Key */}
                    <button
                      onClick={() => playOrganNote(k.midi)}
                      aria-label={`Phím phong cầm ${k.name}`}
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
                        onClick={() => playOrganNote(blackKey.midi)}
                        aria-label={`Phím phong cầm thăng ${blackKey.name}`}
                        className={cn(
                          'absolute -right-3 top-0 z-20 flex h-24 w-6 flex-col justify-end rounded-b-sm border border-black pb-1.5 text-center transition-all duration-75',
                          isBlackPressed
                            ? 'bg-amber-500 text-black translate-y-0.5'
                            : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                        )}
                      >
                        <span className="font-mono text-[8px]">{blackKey.name.replace('3', '').replace('4', '')}</span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Wind Pressure Gauge */}
          <div className="mt-6 border-t border-stone-800/80 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
                  Áp suất luồng khí nén buồng gió (Windchest Pressure):
                </span>
                <p className="text-xs text-stone-400 mt-0.5">
                  Áp lực cột nước ổn định duy trì độ trong trẻo và tránh hiện tượng run giọng (unsteady wind)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="75"
                  max="110"
                  value={windPressure}
                  onChange={(e) => setWindPressure(Number(e.target.value))}
                  className="accent-amber-500 cursor-pointer w-32"
                />
                <span className="font-mono text-sm font-semibold text-amber-300 w-24 text-right">
                  {windPressure} mm H₂O
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Acoustic Engineering Foundations */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">01</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">1.200 Ống Sáo Thiếc-Chì & Gỗ Thông Tuyết</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Ống sáo đúc từ tỷ lệ vàng 70% thiếc và 30% chì cho âm sắc ấm rực rỡ; kết hợp ống sáo mộc gỗ Thông Tuyết
              tạo âm bass sâu lắng, kiểm soát rung động chính xác từng héc.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">02</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Vòm Trần Parabol Cao 9.6m Gỗ Dổi Tiêu Âm</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Hình học trần vòm cong parabol tán xạ đều sóng âm khắp không gian ba chiều, ngăn dội âm cục bộ,
              giữ thời gian vang RT60 thiền tịnh 0.55s cho âm thanh hòa quyện tự nhiên như thánh đường châu Âu.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/60 p-6 backdrop-blur-sm">
            <div className="text-amber-400 font-serif text-2xl font-light">03</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Đệm Khí Nén Siêu Tĩnh Dưới 12 dBA</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Máy thổi khí nén cách ly hoàn toàn trong phòng kỹ thuật chống ồn chuyên dụng, ống dẫn khí bọc cao su
              tiêu chấn cung cấp luồng gió êm ái tuyệt đối không phát ra bất kỳ tạp âm nào.
            </p>
          </div>
        </div>

        {/* Private Consultation & Acoustic Audition */}
        <div className="mt-12 rounded-2xl border border-amber-800/40 bg-gradient-to-r from-amber-950/40 via-stone-900/80 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                May Đo Âm Học Đại Phong Cầm
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Tư Vấn Thiết Kế Điện Thính Phòng Cho Biệt Thự & Lâu Đài
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                KTS Trưởng và các chuyên gia cơ khí đàn phong cầm GuHomes khảo sát kết cấu chịu lực tầng sàn,
                tính toán thể tích phòng và cung cấp giải pháp trọn gói từ bản vẽ đến lắp ráp 1.200 ống sáo.
              </p>
            </div>

            <div className="lg:col-span-5">
              {inquirySuccess ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-900/30 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-amber-200">
                    Đã ghi nhận yêu cầu tư vấn điện thính phòng
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    Kỹ sư trưởng âm học GuHomes sẽ liên hệ để xếp lịch khảo sát thực địa.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setInquirySuccess(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-organ`} className="sr-only">
                    Số điện thoại và chiều cao thông tầng
                  </label>
                  <input
                    id={`${formId}-organ`}
                    type="text"
                    required
                    placeholder="Số điện thoại / Chiều cao thông tầng dự kiến..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký Tư Vấn Đại Phong Cầm</span>
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
