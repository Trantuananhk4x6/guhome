'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LithophoneStone {
  id: string
  name: string
  fundFreq: number
  origin: string
  weightKg: number
  lengthCm: number
  resonanceTime: string
  lore: string
}

const LITHOPHONE_STONES: LithophoneStone[] = [
  {
    id: 'stone-1',
    name: 'Thanh Trầm Nhất (A3)',
    fundFreq: 220.0,
    origin: 'Huyền nham Đắk Kar, Đắk Nông',
    weightKg: 28.4,
    lengthCm: 118,
    resonanceTime: '4.8s ngân rung tự nhiên',
    lore: 'Âm vực trầm đục như tiếng sấm đầu mùa vọng qua thung lũng đá bazan cổ triệu năm.',
  },
  {
    id: 'stone-2',
    name: 'Thanh Nhị Cung (B3)',
    fundFreq: 246.94,
    origin: 'Khánh Sơn, Khánh Hòa (Mỏ đá Tiền Sử)',
    weightKg: 24.1,
    lengthCm: 104,
    resonanceTime: '4.5s ngân rung tự nhiên',
    lore: 'Âm sắc đặc quánh, ghè đẽo thủ công gọt bỏ tạp chất silicat để lộ lõi đá đặc.',
  },
  {
    id: 'stone-3',
    name: 'Thanh Tam Giác (C#4)',
    fundFreq: 277.18,
    origin: 'Miệng núi lửa Chư Đăng Ya, Gia Lai',
    weightKg: 21.6,
    lengthCm: 96,
    resonanceTime: '4.2s ngân rung tự nhiên',
    lore: 'Đá bọt xốp bề mặt nhưng lõi rắn 6.5 Mohs, cho tiếng gõ vừa đanh vừa sâu.',
  },
  {
    id: 'stone-4',
    name: 'Thanh Tứ Chủy (E4)',
    fundFreq: 329.63,
    origin: 'Suối Đắk Pri, Đắk Lắk',
    weightKg: 18.2,
    lengthCm: 88,
    resonanceTime: '3.9s ngân rung tự nhiên',
    lore: 'Bào mòn qua ngàn năm dòng nước xiết, cho tần số dao động đồng pha hiếm có.',
  },
  {
    id: 'stone-5',
    name: 'Thanh Ngũ Vũ (F#4)',
    fundFreq: 369.99,
    origin: 'Cao nguyên M’Nông',
    weightKg: 16.5,
    lengthCm: 82,
    resonanceTime: '3.7s ngân rung tự nhiên',
    lore: 'Thanh âm chuyển tiếp mang linh hồn cồng chiêng vào không gian nội thất đương đại.',
  },
  {
    id: 'stone-6',
    name: 'Thanh Lục Bản (A4 - Chuẩn 440Hz)',
    fundFreq: 440.0,
    origin: 'Huyền thạch Khánh Sơn',
    weightKg: 14.2,
    lengthCm: 76,
    resonanceTime: '3.5s ngân rung tự nhiên',
    lore: 'Thanh âm trung tâm của bộ đàn đá, điểm định âm hòa sắc cho toàn bộ thính phòng.',
  },
  {
    id: 'stone-7',
    name: 'Thanh Thất Cung (B4)',
    fundFreq: 493.88,
    origin: 'Chân dãy Chư Yang Sin',
    weightKg: 12.8,
    lengthCm: 71,
    resonanceTime: '3.3s ngân rung tự nhiên',
    lore: 'Âm thanh trong suốt như tiếng suối ngầm len lỏi qua mạch đá bazan dưới lòng đất.',
  },
  {
    id: 'stone-8',
    name: 'Thanh Bát Giác (C#5)',
    fundFreq: 554.37,
    origin: 'Bình nguyên đá Krông Nô',
    weightKg: 11.0,
    lengthCm: 65,
    resonanceTime: '3.1s ngân rung tự nhiên',
    lore: 'Thanh đá mỏng dẹp hình lưỡi rìu cổ, âm vang thanh thoát ngân nga.',
  },
  {
    id: 'stone-9',
    name: 'Thanh Cửu Chủy (E5)',
    fundFreq: 659.25,
    origin: 'Thác Liêng Nung, Đắk Nông',
    weightKg: 9.4,
    lengthCm: 59,
    resonanceTime: '2.8s ngân rung tự nhiên',
    lore: 'Mỗi cú gõ bằng dùi gỗ ổi rừng giải phóng luồng sóng âm trong vắt.',
  },
  {
    id: 'stone-10',
    name: 'Thanh Thập Vũ (F#5)',
    fundFreq: 739.99,
    origin: 'Rừng nguyên sinh Yok Đôn',
    weightKg: 8.2,
    lengthCm: 54,
    resonanceTime: '2.6s ngân rung tự nhiên',
    lore: 'Âm vực cao vút gợi nhắc hình bóng cánh chim phí liệng trên vòm lá đại ngàn.',
  },
  {
    id: 'stone-11',
    name: 'Thanh Thập Nhất (A5)',
    fundFreq: 880.0,
    origin: 'Vách đá thác Dray Nur',
    weightKg: 7.1,
    lengthCm: 48,
    resonanceTime: '2.4s ngân rung tự nhiên',
    lore: 'Cộng hưởng hài bậc cao ngân lanh lảnh, kích thích hệ thần kinh thư giãn sâu.',
  },
  {
    id: 'stone-12',
    name: 'Thanh Tiêu Cực (C#6)',
    fundFreq: 1108.73,
    origin: 'Đỉnh Ngọc Linh Kon Tum',
    weightKg: 5.8,
    lengthCm: 42,
    resonanceTime: '2.2s ngân rung tự nhiên',
    lore: 'Thanh đá nhỏ nhất nhưng mang năng lượng vi tinh thể thạch anh tự nhiên cực mạnh.',
  },
]

type CaveLightMode = 'lua-trai-2000k' | 'hoang-hon-2200k' | 'trang-ngan-2400k'

const LIGHTING_MODES: Record<CaveLightMode, { label: string; kelvin: string; lux: string; desc: string; bgTone: string }> = {
  'lua-trai-2000k': {
    label: 'Ánh Lửa Đại Ngàn',
    kelvin: '2000K Ấm Nồng',
    lux: '35 Lux huyền bí',
    desc: 'Ánh hắt chân tường màu hổ phách mô phỏng ngọn lửa củi Pơ-mu sưởi ấm khối đá bazan trong hang sâu.',
    bgTone: 'from-amber-950/40 via-stone-950 to-neutral-950',
  },
  'hoang-hon-2200k': {
    label: 'Hoàng Hôn Chư Đăng Ya',
    kelvin: '2200K Chiều Tà',
    lux: '45 Lux ấm áp',
    desc: 'Tái hiện vạt nắng vàng muộn rọi qua khe thông gió vách đá rãnh QRD tiêu âm, gợi xúc cảm lắng đọng.',
    bgTone: 'from-orange-950/30 via-stone-950 to-neutral-950',
  },
  'trang-ngan-2400k': {
    label: 'Ánh Trăng Rừng Ea H’leo',
    kelvin: '2400K Dịu Mát',
    lux: '25 Lux tĩnh mịch',
    desc: 'Ánh trăng non lọc qua vòm kính thiên văn, soi rọi lớp nỉ len cừu bọc bệ đỡ thanh đàn đá.',
    bgTone: 'from-stone-900/40 via-neutral-950 to-black',
  },
}

interface MelodyPiece {
  id: string
  title: string
  region: string
  notes: { stoneIndex: number; duration: number }[]
  description: string
}

const TRADITIONAL_MELODIES: MelodyPiece[] = [
  {
    id: 'am-vang-rung-gia',
    title: 'Âm Vang Rừng Già',
    region: 'Sử thi Đam San - Cao nguyên Đắk Lắk',
    description: 'Chuỗi nốt ngũ cung huyền bí gợi nhịp thở đất trời, nhịp gõ trầm bổng dẫn dắt tâm trí vào thiền định tĩnh lặng.',
    notes: [
      { stoneIndex: 0, duration: 0.5 },
      { stoneIndex: 3, duration: 0.4 },
      { stoneIndex: 5, duration: 0.6 },
      { stoneIndex: 4, duration: 0.4 },
      { stoneIndex: 7, duration: 0.5 },
      { stoneIndex: 5, duration: 0.7 },
      { stoneIndex: 2, duration: 0.5 },
      { stoneIndex: 0, duration: 1.0 },
    ],
  },
  {
    id: 'suoi-dem-trang-ngan',
    title: 'Suối Rừng Đêm Trăng',
    region: 'Dân ca Ba Na - Gia Lai',
    description: 'Tiết tấu nhặt khoan mô phỏng dòng suối róc rách luồn qua kẽ đá bazan dưới ánh trăng vằng vặc mờ ảo.',
    notes: [
      { stoneIndex: 3, duration: 0.35 },
      { stoneIndex: 5, duration: 0.35 },
      { stoneIndex: 6, duration: 0.4 },
      { stoneIndex: 8, duration: 0.45 },
      { stoneIndex: 10, duration: 0.5 },
      { stoneIndex: 8, duration: 0.4 },
      { stoneIndex: 6, duration: 0.4 },
      { stoneIndex: 3, duration: 0.8 },
    ],
  },
  {
    id: 'khanh-son-huyen-thoai',
    title: 'Khánh Sơn Huyền Thoại',
    region: 'Khánh Sơn - Cái nôi Đàn Đá Tiền Sử',
    description: 'Hòa tấu mở rộng từ các thanh đá trầm 220Hz đến cao độ 880Hz, tôn vinh kỹ nghệ ghè đẽo đá 3.000 năm trước.',
    notes: [
      { stoneIndex: 0, duration: 0.4 },
      { stoneIndex: 2, duration: 0.4 },
      { stoneIndex: 5, duration: 0.5 },
      { stoneIndex: 7, duration: 0.4 },
      { stoneIndex: 9, duration: 0.5 },
      { stoneIndex: 11, duration: 0.7 },
      { stoneIndex: 9, duration: 0.4 },
      { stoneIndex: 5, duration: 0.6 },
      { stoneIndex: 0, duration: 1.2 },
    ],
  },
]

export function SaigonAcousticLithophoneSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [activeStoneId, setActiveStoneId] = useState<string>(LITHOPHONE_STONES[0]!.id)
  const [playingStoneId, setPlayingStoneId] = useState<string | null>(null)
  const [lighting, setLighting] = useState<CaveLightMode>('lua-trai-2000k')
  const [isPlayingMelody, setIsPlayingMelody] = useState(false)
  const [selectedMelodyId, setSelectedMelodyId] = useState<string>(TRADITIONAL_MELODIES[0]!.id)
  const [bookingDone, setBookingDone] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const melodyTimeouts = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      melodyTimeouts.current.forEach((t) => clearTimeout(t))
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

  // Synthesize realistic lithophone acoustic physics:
  // Solid basalt free-free bar vibrates with high inharmonic ratios (1.0, 2.756, 5.404)
  function strikeStone(stone: LithophoneStone) {
    const ctx = getAudioContext()
    if (!ctx) return

    setPlayingStoneId(stone.id)
    setTimeout(() => {
      setPlayingStoneId((curr) => (curr === stone.id ? null : curr))
    }, 400)

    const now = ctx.currentTime

    // 1. Initial wooden mallet strike impact (Transient noise burst)
    const bufferSize = ctx.sampleRate * 0.03
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.006))
    }
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.setValueAtTime(stone.fundFreq * 1.5, now)
    noiseFilter.Q.setValueAtTime(4.0, now)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.35, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noiseSource.start(now)

    // 2. Fundamental resonant mode (Basalt pure tone with subtle pitch sag)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(stone.fundFreq * 1.015, now)
    osc1.frequency.exponentialRampToValueAtTime(stone.fundFreq, now + 0.05)

    gain1.gain.setValueAtTime(0.5, now)
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 3.0)

    // 3. Second inharmonic vibrational bar mode (ratio ~2.756)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(stone.fundFreq * 2.756, now)

    gain2.gain.setValueAtTime(0.22, now)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now)
    osc2.stop(now + 1.3)

    // 4. Third bar overtone (ratio ~5.404) for crystalline clink
    const osc3 = ctx.createOscillator()
    const gain3 = ctx.createGain()
    osc3.type = 'sine'
    osc3.frequency.setValueAtTime(stone.fundFreq * 5.404, now)

    gain3.gain.setValueAtTime(0.12, now)
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)

    osc3.connect(gain3)
    gain3.connect(ctx.destination)
    osc3.start(now)
    osc3.stop(now + 0.6)
  }

  function playMelody(piece: MelodyPiece) {
    const ctx = getAudioContext()
    if (!ctx) return

    melodyTimeouts.current.forEach((t) => clearTimeout(t))
    melodyTimeouts.current = []
    setIsPlayingMelody(true)
    setSelectedMelodyId(piece.id)

    let accumulatedTime = 0
    piece.notes.forEach((note) => {
      const timeout = setTimeout(() => {
        const stone = LITHOPHONE_STONES[note.stoneIndex]
        if (stone) {
          strikeStone(stone)
          setActiveStoneId(stone.id)
        }
      }, accumulatedTime * 1000)
      melodyTimeouts.current.push(timeout)
      accumulatedTime += note.duration
    })

    const endTimeout = setTimeout(() => {
      setIsPlayingMelody(false)
    }, accumulatedTime * 1000 + 400)
    melodyTimeouts.current.push(endTimeout)
  }

  function stopMelody() {
    melodyTimeouts.current.forEach((t) => clearTimeout(t))
    melodyTimeouts.current = []
    setIsPlayingMelody(false)
  }

  const currentStone: LithophoneStone = LITHOPHONE_STONES.find((s) => s.id === activeStoneId) ?? LITHOPHONE_STONES[0]!

  return (
    <section
      aria-label="Phòng Hòa Âm Đàn Đá Tây Nguyên GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-neutral-950 py-16 lg:py-24 text-stone-100 transition-colors duration-700',
        className
      )}
    >
      {/* Background Lighting Atmosphere */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-b opacity-40 transition-all duration-1000',
          LIGHTING_MODES[lighting].bgTone
        )}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800/80 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-amber-300">
                Acoustic Sanctuary · Đàn Đá Bazan Tây Nguyên
              </span>
              <span className="text-xs font-mono text-stone-400">RT60: 0.40s · Tiền Sử 3.000 Năm</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Phòng Hòa Âm Đàn Đá Tiền Sử
              <span className="block font-sans text-lg font-normal text-amber-200/80 sm:text-xl mt-1">
                Huyền Thoại Bazan Núi Lửa & Tiêu Âm Tự Nhiên QRD
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Không gian thính phòng tĩnh tâm bài trí bộ 12 thanh huyền nham bazan tự nhiên vùng Khánh Sơn & Đắk Nông. 
            Vách phòng xẻ rãnh đá núi lửa triệt tiêu sóng đứng, đưa âm thanh triệu năm của đất trời Tây Nguyên vào nếp sống Quiet Luxury.
          </p>
        </div>

        {/* Ambient Lighting & Chamber Setup Bar */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 border border-stone-800/80 bg-stone-900/60 p-4 rounded-2xl backdrop-blur-md">
          {(Object.keys(LIGHTING_MODES) as CaveLightMode[]).map((modeKey) => {
            const mode = LIGHTING_MODES[modeKey]
            const active = lighting === modeKey
            return (
              <button
                key={modeKey}
                onClick={() => setLighting(modeKey)}
                aria-pressed={active}
                className={cn(
                  'flex flex-col text-left p-3.5 rounded-xl border transition-all duration-300 min-h-[44px]',
                  active
                    ? 'border-amber-500/70 bg-stone-800/90 shadow-lg shadow-amber-950/30'
                    : 'border-transparent bg-stone-900/40 hover:border-stone-700/60 hover:bg-stone-800/40'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-medium text-stone-200">{mode.label}</span>
                  <span className="font-mono text-xs text-amber-400/90">{mode.kelvin}</span>
                </div>
                <span className="mt-1 text-[11px] text-stone-400 font-mono">{mode.lux}</span>
                <p className="mt-2 text-xs leading-relaxed text-stone-300/80 line-clamp-2">{mode.desc}</p>
              </button>
            )
          })}
        </div>

        {/* Main Interactive Stage: 12 Lithophone Slabs */}
        <div className="mt-10 rounded-3xl border border-stone-800/90 bg-stone-950/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800/60">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Tương tác: Chạm thanh đá bazan để gõ dùi gỗ
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Vật lý âm học tự nhiên: Thanh dài tạo âm trầm ngân lâu, thanh ngắn phát âm cao lanh lảnh.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isPlayingMelody ? (
                <button
                  onClick={stopMelody}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 font-mono text-xs font-medium text-stone-950 transition hover:bg-amber-500"
                >
                  <span className="h-2 w-2 rounded-full bg-stone-950 animate-ping" />
                  Dừng biểu diễn
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {TRADITIONAL_MELODIES.map((melody) => (
                    <button
                      key={melody.id}
                      onClick={() => playMelody(melody)}
                      className={cn(
                        'min-h-[44px] rounded-xl border px-3 py-1.5 font-serif text-xs transition-all',
                        selectedMelodyId === melody.id
                          ? 'border-amber-500/80 bg-amber-950/40 text-amber-300'
                          : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700'
                      )}
                    >
                      ▶ {melody.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Slabs Array Visualization */}
          <div className="mt-8 flex justify-center items-end gap-1.5 sm:gap-2.5 overflow-x-auto pb-4 pt-2">
            {LITHOPHONE_STONES.map((stone, idx) => {
              const isSelected = activeStoneId === stone.id
              const isPlucking = playingStoneId === stone.id
              // Height scales proportionally from 118cm (highest) to 42cm (shortest)
              const heightPercent = 40 + (stone.lengthCm / 118) * 60

              return (
                <button
                  key={stone.id}
                  onClick={() => {
                    setActiveStoneId(stone.id)
                    strikeStone(stone)
                  }}
                  aria-label={`Gõ ${stone.name} tần số ${stone.fundFreq}Hz`}
                  className={cn(
                    'group relative flex min-h-[220px] w-12 sm:w-16 flex-col items-center justify-between rounded-2xl border transition-all duration-300',
                    isSelected
                      ? 'border-amber-400 bg-gradient-to-t from-stone-900 via-stone-800 to-amber-950/60 shadow-xl shadow-amber-900/30'
                      : 'border-stone-800 bg-stone-900/60 hover:border-stone-600 hover:bg-stone-800/50',
                    isPlucking && 'scale-95 border-amber-300 ring-2 ring-amber-400/50'
                  )}
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Top Note Indicator */}
                  <span className="mt-3 font-mono text-[10px] font-semibold text-stone-300 group-hover:text-amber-300">
                    {stone.fundFreq.toFixed(0)}Hz
                  </span>

                  {/* Textured Basalt Slab Body */}
                  <div className="relative my-2 w-full flex-1 flex flex-col items-center justify-center px-1">
                    {/* Chiseled Texture Marks */}
                    <div className="space-y-2 opacity-30 group-hover:opacity-60 transition-opacity">
                      <div className="h-0.5 w-6 rounded-full bg-stone-400" />
                      <div className="h-0.5 w-8 rounded-full bg-stone-500" />
                      <div className="h-0.5 w-5 rounded-full bg-stone-400" />
                    </div>

                    {isPlucking && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 rounded-xl bg-amber-400/20 pointer-events-none"
                      />
                    )}
                  </div>

                  {/* Bottom Index Label */}
                  <div className="mb-3 flex flex-col items-center">
                    <span className="font-serif text-[11px] font-medium text-amber-200/90">
                      #{idx + 1}
                    </span>
                    <span className="text-[9px] font-mono text-stone-400">
                      {stone.lengthCm}cm
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Stone Detailed Geological & Acoustic Breakdown */}
          <div className="mt-8 rounded-2xl border border-stone-800/80 bg-stone-900/80 p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <h3 className="font-serif text-xl text-stone-100">{currentStone.name}</h3>
                </div>
                <p className="mt-1 font-mono text-xs text-amber-300/80">{currentStone.origin}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-300">
                <span className="rounded-lg border border-stone-700 bg-stone-800/80 px-2.5 py-1">
                  Trọng lượng: <strong className="text-stone-100">{currentStone.weightKg} kg</strong>
                </span>
                <span className="rounded-lg border border-stone-700 bg-stone-800/80 px-2.5 py-1">
                  Chiều dài: <strong className="text-stone-100">{currentStone.lengthCm} cm</strong>
                </span>
                <span className="rounded-lg border border-stone-700 bg-stone-800/80 px-2.5 py-1 text-amber-300">
                  {currentStone.resonanceTime}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-stone-300 font-light border-t border-stone-800/60 pt-4">
              {currentStone.lore}
            </p>
          </div>
        </div>

        {/* Acoustic Engineering & Architectural Features */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              01 · Vách Bazan Tiêu Âm QRD
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Rãnh Xẻ Tiêu Tán Tự Nhiên</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Mỗi phiến đá ốp tường được xẻ rãnh so le 40mm x 80mm theo chuỗi toán học QRD (Quadratic Residue Diffuser), 
              triệt tiêu triệt để tiếng vang dội và giữ nguyên độ trong trẻo của từng nốt gõ.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              02 · Bệ Kê Triệt Rung Độc Bản
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Nỉ Len Cừu & Dầm Gỗ Nghiến</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Khung đỡ đàn đá đóng mộng ngàm gỗ Nghiến cổ thụ, lót 3 lớp nỉ len cừu tự nhiên 12mm tại các điểm nút dao động (nodal points), 
              cho phép thanh đá dao động tự do không bị truyền vi rung xuống sàn.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              03 · Hòa Khí Hậu Sài Gòn
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Cân Bằng Độ Ẩm 60% Tự Nhiên</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Đá bazan xốp núi lửa có khả năng hấp thụ hơi ẩm dư thừa trong mùa mưa Nam Bộ và nhả ẩm vi lượng trong mùa khô, 
              duy trì phòng nghe luôn mát mẻ và thanh lọc ion âm tự nhiên.
            </p>
          </div>
        </div>

        {/* Private Acoustic Chamber Booking Form */}
        <div className="mt-14 rounded-3xl border border-amber-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                GuHomes Private Consultation
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Kiến Tạo Thính Phòng Đàn Đá Tại Gia
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Mỗi bộ đàn đá Tây Nguyên là một tác phẩm tiền sử độc bản mang năng lượng nguyên sơ của núi rừng. 
                GuHomes trực tiếp khảo sát kích thước biệt thự, thiết kế vách bazan tiêu âm chuẩn xác và may đo bệ đỡ thủ công tại xưởng mộc Thạnh Xuân.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Đá Bazan Tây Nguyên tuyển chọn</span>
                <span>✓ Kiểm định phổ tần số âm học</span>
                <span>✓ Thi công tiêu âm chuẩn NC-18</span>
              </div>
            </div>

            <div>
              {bookingDone ? (
                <div className="rounded-2xl border border-amber-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu thính phòng</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Kỹ sư trưởng âm học GuHomes sẽ liên hệ trực tiếp trong vòng 24 giờ làm việc để tư vấn giải pháp đo đạc âm học không gian.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setBookingDone(true)
                  }}
                  className="space-y-4 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-md"
                >
                  <div>
                    <label htmlFor={`${formId}-name`} className="block font-mono text-xs text-stone-300">
                      Họ tên gia chủ *
                    </label>
                    <input
                      id={`${formId}-name`}
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-area`} className="block font-mono text-xs text-stone-300">
                      Diện tích dự kiến & Khu vực (Biệt thự / Căn hộ)
                    </label>
                    <input
                      id={`${formId}-area`}
                      type="text"
                      placeholder="VD: 45m² · Thảo Điền, TP. Thủ Đức"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Đăng ký tư vấn thính phòng Đàn Đá
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
