'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Types and data
interface PipaString {
  id: 'string_1' | 'string_2' | 'string_3' | 'string_4'
  name: string
  note: string
  freq: number
  gauge: string
}

const PIPA_STRINGS: PipaString[] = [
  { id: 'string_1', name: 'Dây 1 (A3)', note: 'La trầm', freq: 220.0, gauge: '0.92mm Tơ tằm se 12 sợi' },
  { id: 'string_2', name: 'Dây 2 (D4)', note: 'Rê trung', freq: 293.66, gauge: '0.78mm Tơ tằm se 10 sợi' },
  { id: 'string_3', name: 'Dây 3 (E4)', note: 'Mi thanh', freq: 329.63, gauge: '0.65mm Tơ tằm se 8 sợi' },
  { id: 'string_4', name: 'Dây 4 (A4)', note: 'La cao', freq: 440.0, gauge: '0.52mm Tơ tằm se 6 sợi' }
]

const MELODIES = [
  {
    id: 'kim_tien',
    name: 'Kim Tiền (Kim Tiền Bản)',
    tempo: 'Khoan thai, thanh cao',
    notes: [
      { freq: 440, duration: 0.35, tremolo: true },
      { freq: 329.63, duration: 0.3, tremolo: false },
      { freq: 293.66, duration: 0.35, tremolo: true },
      { freq: 220, duration: 0.45, tremolo: false },
      { freq: 293.66, duration: 0.35, tremolo: false },
      { freq: 329.63, duration: 0.4, tremolo: true },
      { freq: 440, duration: 0.6, tremolo: true }
    ]
  },
  {
    id: 'binh_ban_sach',
    name: 'Bình Bán Sách (Cổ Khúc)',
    tempo: 'Tĩnh mịch, tao nhã',
    notes: [
      { freq: 220, duration: 0.4, tremolo: false },
      { freq: 293.66, duration: 0.35, tremolo: true },
      { freq: 329.63, duration: 0.35, tremolo: false },
      { freq: 440, duration: 0.5, tremolo: true },
      { freq: 329.63, duration: 0.35, tremolo: true },
      { freq: 293.66, duration: 0.4, tremolo: false },
      { freq: 220, duration: 0.7, tremolo: true }
    ]
  }
]

const LIGHTING_SCENARIOS = [
  { id: 'full_moon', name: 'Trăng Rằm Viên Mãn', kelvin: '2200K', lux: '45 Lux', desc: 'Ánh trăng vàng mật ong phản chiếu thớ gỗ Mun sọc và phím trúc' },
  { id: 'dusk_zen', name: 'Hoàng Hôn Sông Sài Gòn', kelvin: '2500K', lux: '60 Lux', desc: 'Ánh ráng chiều ấm áp kích hoạt sóng thư giãn Delta & Alpha' },
  { id: 'deep_night', name: 'Thiền Định Nửa Đêm', kelvin: '1800K', lux: '25 Lux', desc: 'Đèn hắt chân tường vi điểm tập trung tối đa xúc giác mộc' }
]

export function SaigonBespokePipaLuteSanctuaryPavilion({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeMelody, setActiveMelody] = useState(0)
  const [activeStringIndex, setActiveStringIndex] = useState<number | null>(null)
  const [selectedLighting, setSelectedLighting] = useState(0)
  const [fineTuning, setFineTuning] = useState<{ [key: string]: number }>({
    string_1: 0,
    string_2: 0,
    string_3: 0,
    string_4: 0
  })
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [consultSubmitted, setConsultSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t))
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
      }
    }
  }, [])

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Âm sắc Đàn Tỳ Bà với hài âm gỗ Mun hoa và dây tơ se
  const playPipaPluck = (freq: number, tremolo = false, duration = 0.6) => {
    const ctx = initAudio()
    if (!ctx) return

    const now = ctx.currentTime
    const oscCount = tremolo ? 4 : 2

    for (let i = 0; i < oscCount; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = i % 2 === 0 ? 'triangle' : 'sawtooth'
      const detune = tremolo ? (i * 4 - 6) : 0
      osc.frequency.setValueAtTime(freq + detune, now + (tremolo ? i * 0.08 : 0))

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(2400, now)
      filter.frequency.exponentialRampToValueAtTime(600, now + duration)

      const startOffset = tremolo ? i * 0.08 : 0
      const noteStart = now + startOffset

      gain.gain.setValueAtTime(0.0001, noteStart)
      gain.gain.linearRampToValueAtTime(0.18 / oscCount, noteStart + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(noteStart)
      osc.stop(noteStart + duration)
    }
  }

  const triggerStringPluck = (index: number) => {
    const stringInfo = PIPA_STRINGS[index]
    if (!stringInfo) return
    const centsOffset = fineTuning[stringInfo.id] || 0
    const tunedFreq = stringInfo.freq * Math.pow(2, centsOffset / 1200)

    setActiveStringIndex(index)
    playPipaPluck(tunedFreq, true, 0.8)

    setTimeout(() => {
      setActiveStringIndex(null)
    }, 400)
  }

  const toggleMelodyPlayback = () => {
    if (isPlaying) {
      timeoutsRef.current.forEach(t => clearTimeout(t))
      timeoutsRef.current = []
      setIsPlaying(false)
      return
    }

    const ctx = initAudio()
    if (!ctx) return

    const melody = MELODIES[activeMelody]
    if (!melody) return

    setIsPlaying(true)
    let accumulatedTime = 0

    melody.notes.forEach((note, idx) => {
      const timeout = setTimeout(() => {
        playPipaPluck(note.freq, note.tremolo, note.duration)
        if (idx === melody.notes.length - 1) {
          setIsPlaying(false)
        }
      }, accumulatedTime * 1000)
      timeoutsRef.current.push(timeout)
      accumulatedTime += note.duration + 0.08
    })
  }

  const handleTune = (stringId: string, val: number) => {
    setFineTuning(prev => ({ ...prev, [stringId]: val }))
  }

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName || !consultPhone) return
    setConsultSubmitted(true)
  }

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              Âm Học Kiến Trúc Cổ Điển Bản Địa
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              RT60 = 0.33 Giây | Mun Sọc &amp; Huỳnh Đường
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Thính Phòng Tỳ Bà Tứ Huyền <span className="italic text-amber-200">Saigon Pipa Pavilion</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Không gian hòa âm độc bản dành cho nghệ thuật Đàn Tỳ Bà 4 dây tơ se tay. Vòm trần paraboloid khử sóng đứng
            dải tần 800Hz - 4.000Hz, vách gỗ Mun sọc và gỗ Huỳnh Đường cổ thụ tạo độ phản hồi âm sắc trong suốt như ngọc,
            kết hợp hệ thống vi khí hậu 24°C và độ ẩm kiểm soát 52% chống cong vênh cần đàn.
          </p>
        </div>

        {/* Khối tương tác 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Đàn Tỳ Bà & Tương tác 4 dây */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Bốn Huyền Tơ Tằm Cổ Truyền</h3>
                  <p className="text-xs text-stone-400">Chạm vào từng dây để nghe tiếng gảy vê móng đồi mồi thực tế</p>
                </div>
                <button
                  type="button"
                  onClick={toggleMelodyPlayback}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all min-h-[44px] min-w-[44px]',
                    isPlaying
                      ? 'border border-amber-500 bg-amber-500/20 text-amber-200 shadow-lg shadow-amber-500/10'
                      : 'border border-stone-700 bg-stone-800 text-stone-200 hover:border-amber-600/50 hover:bg-stone-700'
                  )}
                >
                  {isPlaying ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>Dừng Tấu Khúc</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      <span>Nghe Tấu Khúc Mẫu</span>
                    </>
                  )}
                </button>
              </div>

              {/* Selector Cổ Khúc */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-400">Chọn cổ khúc:</span>
                {MELODIES.map((mel, idx) => (
                  <button
                    key={mel.id}
                    type="button"
                    onClick={() => {
                      setActiveMelody(idx)
                      if (isPlaying) {
                        timeoutsRef.current.forEach(t => clearTimeout(t))
                        setIsPlaying(false)
                      }
                    }}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs transition-colors min-h-[44px]',
                      activeMelody === idx
                        ? 'border border-amber-600 bg-amber-950/60 text-amber-200'
                        : 'border border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
                    )}
                  >
                    {mel.name}
                  </button>
                ))}
              </div>

              {/* Mô phỏng Cần đàn & Dây đàn Tỳ Bà */}
              <div className="relative mt-8 rounded-xl border border-stone-800/80 bg-stone-950/80 p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-stone-950/50 to-stone-950 pointer-events-none rounded-xl" />

                <div className="relative z-10 flex flex-col gap-6">
                  {PIPA_STRINGS.map((str, index) => {
                    const isPlucked = activeStringIndex === index
                    return (
                      <div key={str.id} className="group flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif font-medium text-stone-300">
                            {str.name} - <span className="text-amber-400">{str.note}</span>
                          </span>
                          <span className="text-stone-500 font-mono">{str.gauge}</span>
                        </div>

                        {/* Thanh dây tương tác */}
                        <div
                          onClick={() => triggerStringPluck(index)}
                          className="relative flex h-11 w-full cursor-pointer items-center rounded-lg border border-stone-800/70 bg-stone-900/50 px-3 transition-colors hover:border-amber-600/40 hover:bg-stone-900 min-h-[44px]"
                        >
                          {/* Sợi dây rung */}
                          <motion.div
                            animate={
                              isPlucked
                                ? { y: [-2, 2, -1, 1, 0], opacity: [1, 0.7, 1] }
                                : { y: 0, opacity: 0.9 }
                            }
                            transition={{ duration: 0.25 }}
                            className={cn(
                              'w-full rounded-full transition-all',
                              isPlucked ? 'bg-amber-300 shadow-md shadow-amber-400/50' : 'bg-stone-500 group-hover:bg-amber-400/70'
                            )}
                            style={{ height: `${index * 0.75 + 1.2}px` }}
                          />

                          {/* Nhãn click */}
                          <span className="absolute right-3 text-[10px] uppercase tracking-wider text-stone-500 group-hover:text-amber-300">
                            Gảy dây
                          </span>
                        </div>

                        {/* Chỉnh cao độ fine-tuning */}
                        <div className="flex items-center gap-3 px-1 text-[11px] text-stone-400">
                          <span className="text-stone-500">Hz:</span>
                          <span>Tinh chỉnh âm vực:</span>
                          <input
                            type="range"
                            min="-50"
                            max="50"
                            value={fineTuning[str.id] || 0}
                            onChange={(e) => handleTune(str.id, parseInt(e.target.value))}
                            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-lg bg-stone-800 accent-amber-500"
                          />
                          <span className="w-10 text-right font-mono text-stone-300">
                            {(fineTuning[str.id] || 0) > 0 ? `+${fineTuning[str.id]}` : fineTuning[str.id]}c
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Thông số kỹ thuật âm học */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6 sm:grid-cols-4">
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Thời gian vọng RT60</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">0.33 giây</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Vòm tán âm</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">Paraboloid</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ ẩm kiểm soát</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">52% ± 2%</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Triệt sóng đứng</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">0.8 - 4 kHz</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Ánh sáng trăng rằm & Form thẩm định tư gia */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Kịch bản ánh sáng */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <h3 className="text-base font-medium text-white font-serif">Kịch Bản Ánh Sáng Thính Phòng</h3>
              </div>

              <div className="mt-4 space-y-3">
                {LIGHTING_SCENARIOS.map((sc, i) => (
                  <div
                    key={sc.id}
                    onClick={() => setSelectedLighting(i)}
                    className={cn(
                      'cursor-pointer rounded-xl border p-3.5 transition-all min-h-[44px]',
                      selectedLighting === i
                        ? 'border-amber-500/80 bg-amber-950/30'
                        : 'border-stone-800/80 bg-stone-950/40 hover:border-stone-700'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-200">{sc.name}</span>
                      <span className="font-mono text-xs text-amber-400">
                        {sc.kelvin} | {sc.lux}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400 leading-relaxed">{sc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chi tiết gỗ Mun hoa & Huỳnh Đường */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <h3 className="text-base font-medium text-white font-serif">Vật Liệu Cổ Mộc Tinh Tuyển</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Gỗ Mun sọc Khánh Hòa:</strong> Mật độ 1.150kg/m³, độ đanh chắc tạo phản hồi tần số cao trong trẻo, triệt tiêu tạp âm bề mặt.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Gỗ Huỳnh Đường nguyên khối:</strong> Thớ dẻo thơm dịu, giảm chấn tự nhiên tại dải âm trầm 100Hz - 250Hz.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Phím trúc già vát âm học:</strong> 16 - 24 phím trúc già ngâm bùn sấy lò củi 9 tháng, không co ngót dưới nồm ẩm Sài Gòn.
                  </span>
                </li>
              </ul>
            </div>

            {/* Form đăng ký khảo sát thính phòng tư gia */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Tư Vấn Kiến Trúc Thính Phòng Tư Gia</h3>
              <p className="mt-1 text-xs text-stone-400">
                Khảo sát hiện trường âm học vi khí hậu bởi KTS Trưởng GuHomes. Giới hạn 12 dự án/năm.
              </p>

              {consultSubmitted ? (
                <div className="mt-5 rounded-xl border border-emerald-800/60 bg-emerald-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-emerald-200">
                    Đã ghi nhận yêu cầu khảo sát thính phòng. KTS GuHomes sẽ liên hệ trong 24 giờ làm việc.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="mt-4 space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên gia chủ"
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại / Zalo"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none min-h-[44px]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-400 min-h-[44px]"
                  >
                    <span>Yêu Cầu Khảo Sát Hiện Trường</span>
                  </button>
                  <p className="text-center text-[10px] text-stone-500">
                    Hotline: 0368 757 916 | Xưởng Thạnh Xuân 1.200m², Q.12
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
