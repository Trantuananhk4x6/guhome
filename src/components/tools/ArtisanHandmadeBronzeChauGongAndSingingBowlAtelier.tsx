'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SacredInstrument {
  id: string
  name: string
  fundFreq: number
  solfeggioMeaning: string
  diameterCm: number
  weightKg: number
  hammerStrikes: string
  sevenMetalsRatio: string
  lore: string
}

const SACRED_INSTRUMENTS: SacredInstrument[] = [
  {
    id: 'singing-bowl-528',
    name: 'Chuông Xoay Thất Bảo 528Hz · Tái Tạo Tế Bào',
    fundFreq: 528.0,
    solfeggioMeaning: 'Tần số Tình Yêu & Phục Hồi Sinh Lực (Solfeggio MI)',
    diameterCm: 22,
    weightKg: 2.8,
    hammerStrikes: '18.000 nhát búa thủ công',
    sevenMetalsRatio: 'Vàng 1.5% · Bạc 3.5% · Đồng đỏ 72% · Thiếc 18% · Sắt, Kẽm, Chì 5%',
    lore: 'Được gò rèn qua 49 ngày đêm tĩnh tâm, khi miết chày dạ cừu quanh vành chuông phát ra sóng âm 528Hz cộng hưởng cùng phân tử nước trong tế bào con người.',
  },
  {
    id: 'singing-bowl-432',
    name: 'Chuông Xoay Thiền Định 432Hz · Hòa Hợp Vũ Trụ',
    fundFreq: 432.0,
    solfeggioMeaning: 'Tần số Tự Nhiên & An Định Hệ Thần Kinh',
    diameterCm: 28,
    weightKg: 4.5,
    hammerStrikes: '24.000 nhát búa thủ công',
    sevenMetalsRatio: 'Vàng 2.0% · Bạc 4.0% · Đồng đỏ 70% · Thiếc 20% · Khoáng vi lượng 4%',
    lore: 'Âm thanh trầm ấm đưa não bộ về trạng thái sóng Alpha và Theta chỉ sau 3 phút lắng nghe, xua tan hoàn toàn cảm giác căng thẳng nơi phố thị.',
  },
  {
    id: 'chau-gong-85cm',
    name: 'Đại Chiêng Châu Bản Đồng Đỏ 85cm · Trấn Sảnh',
    fundFreq: 110.0,
    solfeggioMeaning: 'Âm Rền Trầm Hùng Trấn Trạch An Gia',
    diameterCm: 85,
    weightKg: 28.0,
    hammerStrikes: '55.000 nhát búa từ tâm ra vành',
    sevenMetalsRatio: 'Đồng đỏ cổ truyền 80% · Thiếc 18% · Vàng, Bạc, Sắt 2%',
    lore: 'Tâm chiêng tôi đen giữ độ dẻo dai, vành chiêng mài sáng lộ sắc vàng thau rực rỡ; khi dộng dùi da tạo ra luồng sóng âm trầm rền chấn động toàn bộ không gian.',
  },
]

export function ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedInstId, setSelectedInstId] = useState<string>(SACRED_INSTRUMENTS[0]!.id)
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [isRimRubbing, setIsRimRubbing] = useState(false)
  const [customMantra, setCustomMantra] = useState('')
  const [orderSent, setOrderSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const continuousOscRef = useRef<OscillatorNode | null>(null)
  const continuousGainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      stopContinuousSound()
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

  // Strike Bell Once (Impulsive Ding with Rich Overtones)
  function strikeInstrument(inst: SacredInstrument) {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    setIsPlayingSound(true)
    setTimeout(() => setIsPlayingSound(false), 800)

    // Fundamental Mode
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(inst.fundFreq, now)

    gain1.gain.setValueAtTime(0.45, now)
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 4.5)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 4.6)

    // 2nd Harmonic (Octave ~2.01 with subtle detune)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(inst.fundFreq * 2.008, now)

    gain2.gain.setValueAtTime(0.2, now)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 3.0)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now)
    osc2.stop(now + 3.1)

    // 3rd Inharmonic Sing (ratio ~2.76)
    const osc3 = ctx.createOscillator()
    const gain3 = ctx.createGain()
    osc3.type = 'sine'
    osc3.frequency.setValueAtTime(inst.fundFreq * 2.76, now)

    gain3.gain.setValueAtTime(0.12, now)
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

    osc3.connect(gain3)
    gain3.connect(ctx.destination)
    osc3.start(now)
    osc3.stop(now + 2.1)
  }

  // Continuous Rim Rubbing Drone Synth (Theta wave induction)
  function startContinuousSound(inst: SacredInstrument) {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    stopContinuousSound()
    setIsRimRubbing(true)

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Subtle LFO for circular hand motion (0.8 Hz)
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(0.8, now)
    lfoGain.gain.setValueAtTime(0.08, now)
    lfo.connect(gain.gain)
    lfo.start(now)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(inst.fundFreq, now)

    gain.gain.setValueAtTime(0.01, now)
    gain.gain.linearRampToValueAtTime(0.35, now + 1.2)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)

    continuousOscRef.current = osc
    continuousGainRef.current = gain
  }

  function stopContinuousSound() {
    if (continuousGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime
      continuousGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.6)
      setTimeout(() => {
        if (continuousOscRef.current) {
          try {
            continuousOscRef.current.stop()
            continuousOscRef.current.disconnect()
          } catch (_) {}
          continuousOscRef.current = null
        }
        continuousGainRef.current = null
      }, 700)
    }
    setIsRimRubbing(false)
  }

  const activeInst: SacredInstrument = SACRED_INSTRUMENTS.find((i) => i.id === selectedInstId) ?? SACRED_INSTRUMENTS[0]!

  return (
    <section
      aria-label="Xưởng Chuông Xoay Thất Bảo & Chiêng Châu Bản GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Sacred Sound Wave Halo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(245,158,11,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-amber-300">
                Atelier Thất Bảo · GU-SINGINGBOWL-2026-X
              </span>
              <span className="text-xs font-mono text-stone-400">Tần Số Chuẩn 528Hz · 7 Kim Loại Quý</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Xưởng Chuông Xoay Thất Bảo &amp; Chiêng Châu Bản
              <span className="block font-sans text-lg font-normal text-amber-300/80 sm:text-xl mt-1">
                Tần Số Chữa Lành 528Hz &amp; Gò Rèn Thủ Công 18.000 Nhát Búa
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Đúc thủ công từ hợp kim thất bảo gồm Vàng, Bạc, Đồng đỏ, Thiếc, Sắt, Kẽm và Chì theo tỷ lệ hoàng kim. 
            Từng vành chuông được nghệ nhân gò búa chuẩn âm 528Hz, phát ra sóng âm rung động kích hoạt sóng não Theta thư giãn sâu.
          </p>
        </div>

        {/* 3 Instrument Selectors */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {SACRED_INSTRUMENTS.map((inst) => {
            const isSelected = selectedInstId === inst.id
            return (
              <button
                key={inst.id}
                onClick={() => {
                  stopContinuousSound()
                  setSelectedInstId(inst.id)
                }}
                className={cn(
                  'flex flex-col text-left p-5 rounded-2xl border transition-all duration-300 min-h-[44px]',
                  isSelected
                    ? 'border-amber-400 bg-stone-900 shadow-xl shadow-amber-950/40 ring-1 ring-amber-400/40'
                    : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-800/40'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-medium text-stone-100">{inst.name.split('·')[0]}</span>
                  <span className="font-mono text-xs font-semibold text-amber-400">{inst.fundFreq} Hz</span>
                </div>
                <span className="mt-1 text-xs font-serif text-amber-300/80">{inst.solfeggioMeaning}</span>
                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>Đường kính: Ø{inst.diameterCm}cm</span>
                  <span>{inst.weightKg} kg</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Interactive Sound Bowl Stage & Harmonic Spectrum Visualizer */}
        <div className="mt-10 rounded-3xl border border-stone-800 bg-stone-950/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800/60">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Tương tác: Gõ chuông hoặc xoay chày dạ cừu quanh vành
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Trải nghiệm sóng hài Solfeggio 528Hz ngân vang thực tế qua Web Audio API.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => strikeInstrument(activeInst)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 font-mono text-xs font-medium text-stone-950 transition hover:bg-amber-500"
              >
                🔔 Gõ một tiếng chuông
              </button>

              {!isRimRubbing ? (
                <button
                  onClick={() => startContinuousSound(activeInst)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-500/80 bg-amber-950/40 px-4 py-2 font-mono text-xs font-medium text-amber-300 transition hover:bg-amber-900/50"
                >
                  🌀 Xoay chày ngân vang liên tục
                </button>
              ) : (
                <button
                  onClick={stopContinuousSound}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-red-500/80 bg-red-950/40 px-4 py-2 font-mono text-xs font-medium text-red-300 transition hover:bg-red-900/50"
                >
                  ⏹ Dừng xoay chuông
                </button>
              )}
            </div>
          </div>

          {/* Central Visual: Singing Bowl Graphic & Harmonic Ripple Rings */}
          <div className="mt-8 relative h-72 sm:h-80 rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex flex-col items-center justify-center overflow-hidden">
            {/* Pulsing Resonance Ripples */}
            {(isPlayingSound || isRimRubbing) && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: isRimRubbing ? 1.5 : 2.5, ease: 'easeOut' }}
                  className="absolute h-48 w-48 rounded-full border-2 border-amber-400/60 pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: isRimRubbing ? 1.5 : 2.5, delay: 0.5, ease: 'easeOut' }}
                  className="absolute h-48 w-48 rounded-full border border-amber-300/40 pointer-events-none"
                />
              </>
            )}

            {/* Bronze Singing Bowl Body */}
            <div className="relative flex flex-col items-center justify-center">
              <div
                className={cn(
                  'relative h-36 w-52 sm:h-44 sm:w-64 rounded-b-[6rem] border-4 border-amber-600/70 bg-gradient-to-b from-amber-700/80 via-amber-800/90 to-yellow-950 shadow-2xl transition-all duration-300 flex flex-col items-center justify-center p-4',
                  (isPlayingSound || isRimRubbing) && 'ring-4 ring-amber-400/50 shadow-amber-500/30'
                )}
              >
                {/* Hammer strike dimples texture */}
                <div className="text-center">
                  <span className="font-mono text-2xl font-bold text-amber-200 block">
                    {activeInst.fundFreq} Hz
                  </span>
                  <span className="font-serif text-[11px] text-amber-300/90 tracking-widest uppercase block mt-1">
                    {activeInst.name.split('·')[0]}
                  </span>
                </div>
              </div>

              {/* Wooden Mallet Graphic when rubbing */}
              {isRimRubbing && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  className="absolute -top-6 h-16 w-3 rounded-full bg-amber-900 border border-amber-500 shadow-md origin-bottom pointer-events-none"
                />
              )}
            </div>

            {/* Live Frequency Display */}
            <div className="mt-4 flex items-center gap-4 text-xs font-mono text-stone-300">
              <span className="rounded bg-stone-900 border border-stone-700 px-3 py-1">
                Sóng hài F0: <strong className="text-amber-400">{activeInst.fundFreq} Hz</strong>
              </span>
              <span className="rounded bg-stone-900 border border-stone-700 px-3 py-1">
                Sóng hài F1: <strong className="text-amber-400">{(activeInst.fundFreq * 2).toFixed(1)} Hz</strong>
              </span>
              <span className="rounded bg-stone-900 border border-stone-700 px-3 py-1">
                Sóng hài F2: <strong className="text-amber-400">{(activeInst.fundFreq * 2.76).toFixed(1)} Hz</strong>
              </span>
            </div>
          </div>

          {/* Instrument Lore & Material Formula */}
          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900/80 p-5 sm:p-6 backdrop-blur-sm">
            <h3 className="font-serif text-xl text-stone-100">{activeInst.name}</h3>
            <p className="mt-1 font-mono text-xs text-amber-400">{activeInst.sevenMetalsRatio}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light border-t border-stone-800/80 pt-3">
              {activeInst.lore}
            </p>
          </div>
        </div>

        {/* 3 Craft Pillars */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              01 · Hợp Kim Thất Bảo Quý Tộc
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">7 Kim Loại Tượng Trưng 7 Luân Xa</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Vàng (Mặt Trời), Bạc (Mặt Trăng), Đồng (Kim Tinh), Sắt (Hỏa Tinh), Thiếc (Mộc Tinh), Chì (Thổ Tinh), Kẽm (Thủy Tinh) 
              hòa quyện trong lò nung than củi 1.150°C tạo nên cấu trúc phân tử vi pha cực kỳ bền bỉ.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              02 · Gò Búa Rèn Tay Chuẩn Tần Số
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Cân Chỉnh Bằng Đồng Hồ Cơ Học</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Mỗi nhát búa làm thay đổi độ dày thành chuông ở mức micron. Nghệ nhân vừa gò vừa thử âm cho đến khi 
              tần số dao động tự do trùng khớp tuyệt đối với 528Hz sai số dưới 0.1Hz.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              03 · Chày Dạ Cừu & Gối Đệm Lụa
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Phụ Kiện Thiền Thư May Đo</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Đi kèm mỗi chuông xoay là chày gỗ bọc da cừu tự nhiên và gối đệm gấm lụa Bảo Lộc thêu họa tiết Mạn-đà-la, 
              giữ chuông đứng vững vàng mà không bị triệt tiêu năng lượng rung động.
            </p>
          </div>
        </div>

        {/* Custom Order Box */}
        <div className="mt-14 rounded-3xl border border-amber-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                GuHomes Sacred Sound Atelier
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Đặt Chế Tác Chuông Xoay Khắc Mật Ngữ
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Gia chủ có thể yêu cầu nghệ nhân thiền môn khắc mật ngữ bình an hoặc tên tự của gia tộc lên thành chuông 
                trong ngày xuất xưởng lành, khai quang năng lượng an lành cho tư gia.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Kiểm định tần số âm học 528Hz</span>
                <span>✓ Khắc chữ Phạn / Hán / Quốc ngữ theo ý</span>
                <span>✓ Đầy đủ chày dạ cừu & gối lụa gấm</span>
              </div>
            </div>

            <div>
              {orderSent ? (
                <div className="rounded-2xl border border-amber-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu đúc chuông xoay</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Nghệ nhân xưởng đồng GuHomes sẽ liên hệ để xác nhận kích cỡ chuông và câu chữ mật ngữ cần khắc.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-4 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-md"
                >
                  <div>
                    <label htmlFor={`${formId}-owner`} className="block font-mono text-xs text-stone-300">
                      Họ tên gia chủ *
                    </label>
                    <input
                      id={`${formId}-owner`}
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
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
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-mantra`} className="block font-mono text-xs text-stone-300">
                      Mật ngữ / Tên tự khắc trên vành chuông
                    </label>
                    <input
                      id={`${formId}-mantra`}
                      type="text"
                      value={customMantra}
                      onChange={(e) => setCustomMantra(e.target.value)}
                      placeholder="VD: Om Mani Padme Hum hoặc An Lạc Cư"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Yêu cầu chế tác chuông xoay thất bảo 528Hz
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
