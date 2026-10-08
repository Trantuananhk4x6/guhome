'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SitarSympatheticString {
  id: string
  noteName: string
  freq: number
  gauge: string
}

// 13 dây bồi âm Tarab (Sympathetic strings) của đàn Sitar
const SYMPATHETIC_STRINGS: SitarSympatheticString[] = [
  { id: 'tarab_1', noteName: 'C4 (Sa)', freq: 261.63, gauge: '0.22mm Thép Thụy Sĩ' },
  { id: 'tarab_2', noteName: 'D4 (Re)', freq: 293.66, gauge: '0.22mm Thép Thụy Sĩ' },
  { id: 'tarab_3', noteName: 'E4 (Ga)', freq: 329.63, gauge: '0.22mm Thép Thụy Sĩ' },
  { id: 'tarab_4', noteName: 'F4 (Ma)', freq: 349.23, gauge: '0.22mm Thép Thụy Sĩ' },
  { id: 'tarab_5', noteName: 'G4 (Pa)', freq: 392.00, gauge: '0.20mm Thép Thụy Sĩ' },
  { id: 'tarab_6', noteName: 'A4 (Dha)', freq: 440.00, gauge: '0.20mm Thép Thụy Sĩ' },
  { id: 'tarab_7', noteName: 'B4 (Ni)', freq: 493.88, gauge: '0.20mm Thép Thụy Sĩ' },
  { id: 'tarab_8', noteName: 'C5 (Sa\')', freq: 523.25, gauge: '0.18mm Thép Thụy Sĩ' },
  { id: 'tarab_9', noteName: 'D5 (Re\')', freq: 587.33, gauge: '0.18mm Thép Thụy Sĩ' },
  { id: 'tarab_10', noteName: 'E5 (Ga\')', freq: 659.25, gauge: '0.18mm Thép Thụy Sĩ' },
  { id: 'tarab_11', noteName: 'F#5 (Tivra Ma\')', freq: 739.99, gauge: '0.16mm Thép Thụy Sĩ' },
  { id: 'tarab_12', noteName: 'G5 (Pa\')', freq: 783.99, gauge: '0.16mm Thép Thụy Sĩ' },
  { id: 'tarab_13', noteName: 'A5 (Dha\')', freq: 880.00, gauge: '0.16mm Thép Thụy Sĩ' }
]

const RAGA_PERFORMANCES = [
  {
    id: 'raga_bhairav',
    name: 'Raga Bhairav (Bình Minh Tĩnh Lặng)',
    mood: 'Thanh lọc tâm trí lúc rạng đông',
    notes: [
      { freq: 261.63, duration: 0.6 }, // Sa
      { freq: 277.18, duration: 0.8 }, // Komal Re (rung)
      { freq: 329.63, duration: 0.6 }, // Ga
      { freq: 349.23, duration: 0.7 }, // Ma
      { freq: 392.00, duration: 0.8 }, // Pa
      { freq: 415.30, duration: 0.9 }, // Komal Dha
      { freq: 493.88, duration: 0.6 }, // Ni
      { freq: 523.25, duration: 1.2 }  // Sa'
    ]
  },
  {
    id: 'raga_yaman',
    name: 'Raga Yaman (Hoàng Hôn Ấm Áp)',
    mood: 'Bình an, trầm mặc khi ráng chiều buông',
    notes: [
      { freq: 493.88, duration: 0.5 }, // Ni
      { freq: 329.63, duration: 0.6 }, // Ga
      { freq: 739.99, duration: 0.7 }, // Tivra Ma
      { freq: 440.00, duration: 0.6 }, // Dha
      { freq: 493.88, duration: 0.6 }, // Ni
      { freq: 523.25, duration: 1.1 }  // Sa'
    ]
  }
]

const MEDITATION_LIGHTS = [
  { id: 'amber_2200k', name: 'Đèn Dầu Đồng Thau 2200K', lux: '35 Lux', desc: 'Ánh sáng lung linh phản chiếu bầu đàn Kaddu và thảm len Kashmir' },
  { id: 'warm_2700k', name: 'Thiền Định Hoàng Hôn 2700K', lux: '60 Lux', desc: 'Sắc vàng mật dịu nhẹ nâng đỡ dải sóng não Theta & Alpha' },
  { id: 'zen_3200k', name: 'Trăng Sáng Đồi Cao 3200K', lux: '85 Lux', desc: 'Độ sáng hoàn hảo cho buổi đàm thoại thiền vị và thưởng thức trà' }
]

export function SaigonAcousticSitarSanctuarySalon({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeRagaIndex, setActiveRagaIndex] = useState(0)
  const [activeStringIndex, setActiveStringIndex] = useState<number | null>(null)
  const [selectedLighting, setSelectedLighting] = useState(0)
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

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

  // Âm sắc đàn Sitar: Cầu ngựa Jawari cong phẳng tạo hiệu ứng rè hài âm (buzzing buzz / jivari effect)
  const playSitarNote = (freq: number, duration = 0.8) => {
    const ctx = initAudio()
    if (!ctx) return

    const now = ctx.currentTime

    // Tạo chùm 3 oscillator mô phỏng âm rè đặc trưng Jawari
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(freq, now)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq * 2.01, now) // hài âm lệch nhẹ

    filter.type = 'peaking'
    filter.frequency.setValueAtTime(freq * 3, now)
    filter.Q.setValueAtTime(6.0, now)
    filter.gain.setValueAtTime(8, now) // kích dải tần rè Jawari

    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.2, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + duration)
    osc2.stop(now + duration)
  }

  const triggerStringPluck = (index: number) => {
    const str = SYMPATHETIC_STRINGS[index]
    if (!str) return

    setActiveStringIndex(index)
    playSitarNote(str.freq, 0.9)

    setTimeout(() => {
      setActiveStringIndex(null)
    }, 350)
  }

  const toggleRagaPlay = () => {
    if (isPlaying) {
      timeoutsRef.current.forEach(t => clearTimeout(t))
      timeoutsRef.current = []
      setIsPlaying(false)
      return
    }

    const raga = RAGA_PERFORMANCES[activeRagaIndex]
    if (!raga) return

    setIsPlaying(true)
    let accum = 0

    raga.notes.forEach((note, idx) => {
      const timeout = setTimeout(() => {
        playSitarNote(note.freq, note.duration)
        if (idx === raga.notes.length - 1) {
          setTimeout(() => {
            setIsPlaying(false)
          }, note.duration * 1000)
        }
      }, accum * 1000)
      timeoutsRef.current.push(timeout)
      accum += note.duration + 0.08
    })
  }

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName || !consultPhone) return
    setSubmitted(true)
  }

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Âm Hưởng Raga Phương Đông
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              RT60 = 0.33 Giây | Gỗ Cẩm Lai &amp; Vòm Fermat
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Phòng Thính Âm Đàn Sitar <span className="italic text-amber-200">Sitar Sanctuary Salon</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Không gian thiền định thưởng thức đàn Sitar 20 dây cổ điển. Thùng cộng hưởng bằng quả bầu khô Kaddu ngâm
            tinh dầu đàn hương, cần đàn gỗ Cẩm Lai đỏ vân mây, vòm trần Fermat tán âm đa diện triệt giao thoa dải tần
            180Hz - 4.500Hz, kết hợp thảm dệt tay lông cừu Kashmir giảm chấn sàn âm thanh.
          </p>
        </div>

        {/* Khung chức năng 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: 13 Dây bồi âm Tarab & Nghe Raga */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">13 Dây Bồi Âm Cộng Hưởng Tarab</h3>
                  <p className="text-xs text-stone-400">Gảy nhẹ từng dây để cảm nhận âm sắc rè Jawari ngân vang kéo dài</p>
                </div>

                <button
                  type="button"
                  onClick={toggleRagaPlay}
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
                      <span>Dừng Tấu Raga</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      <span>Nghe Khúc Raga Mẫu</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bộ chọn Raga */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-400">Khúc nhạc Raga:</span>
                {RAGA_PERFORMANCES.map((raga, idx) => (
                  <button
                    key={raga.id}
                    type="button"
                    onClick={() => {
                      setActiveRagaIndex(idx)
                      if (isPlaying) {
                        timeoutsRef.current.forEach(t => clearTimeout(t))
                        setIsPlaying(false)
                      }
                    }}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs transition-colors min-h-[44px]',
                      activeRagaIndex === idx
                        ? 'border border-amber-600 bg-amber-950/60 text-amber-200'
                        : 'border border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
                    )}
                  >
                    {raga.name}
                  </button>
                ))}
              </div>

              {/* Mô phỏng giàn dây Tarab */}
              <div className="relative mt-8 rounded-xl border border-stone-800/80 bg-stone-950/90 p-4 sm:p-6">
                <div className="space-y-2.5">
                  {SYMPATHETIC_STRINGS.map((str, index) => {
                    const isPlucked = activeStringIndex === index
                    return (
                      <div
                        key={str.id}
                        onClick={() => triggerStringPluck(index)}
                        className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5 transition-colors hover:border-amber-600/40 hover:bg-stone-900 min-h-[44px]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-amber-300 w-16">{str.noteName}</span>
                          <span className="text-[10px] text-stone-500 font-mono hidden sm:inline">{str.gauge}</span>
                        </div>

                        {/* Thanh dây rung */}
                        <div className="relative flex-1 h-3 flex items-center px-2">
                          <motion.div
                            animate={isPlucked ? { scaleY: [1, 2.5, 0.8, 1] } : {}}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              'h-[1.5px] w-full rounded-full transition-colors',
                              isPlucked ? 'bg-amber-300 shadow-md shadow-amber-400/80' : 'bg-stone-600 group-hover:bg-amber-400/60'
                            )}
                          />
                        </div>

                        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 group-hover:text-amber-300">
                          {Math.round(str.freq)} Hz
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Thông số kỹ thuật âm học */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6 sm:grid-cols-4">
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ Vang RT60</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">0.33 giây</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Vòm Tán Âm</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">Fermat Elip</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Cầu Jawari</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">Gỗ Mun Đen</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Triệt Giao Thoa</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">0.18 - 4.5 kHz</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Ánh sáng thiền định & Form tư vấn salon */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Kịch bản ánh sáng */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Ánh Sáng Thiền Định Phương Đông</h3>
              <p className="text-xs text-stone-400 mt-1">Cân bằng thị giác hòa quyện cùng tần số rung dây Sitar</p>

              <div className="mt-4 space-y-3">
                {MEDITATION_LIGHTS.map((sc, i) => (
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
                      <span className="font-mono text-xs text-amber-400">{sc.lux}</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400 leading-relaxed">{sc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quy chuẩn gỗ Cẩm Lai & Quả bầu Kaddu */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Vật Liệu Cổ Khí Quý Hiếm</h3>
              <ul className="mt-4 space-y-2.5 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Cần đàn gỗ Cẩm Lai Kon Tum:</strong> Mật độ gỗ cao, không cong vênh dưới độ ẩm nhiệt đới, tạo điểm tựa nốt vuốt Meend mềm mại.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Thùng quả bầu khô Kaddu:</strong> Ngâm tinh dầu đàn hương 12 tháng, giữ độ ấm sâu thẳm cho buồng vang âm sắc.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Vòm Fermat tiêu âm:</strong> Triệt tiêu toàn bộ điểm giao thoa sóng âm gây ù tai trong không gian kín.
                  </span>
                </li>
              </ul>
            </div>

            {/* Form đăng ký khảo sát salon */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Tư Vấn Thính Phòng Thiền Âm Tư Gia</h3>
              <p className="mt-1 text-xs text-stone-400">
                Được thiết kế riêng bởi KTS Trưởng GuHomes kết hợp chuyên gia âm học vi khí hậu.
              </p>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-amber-800/60 bg-amber-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-amber-200">
                    Đã ghi nhận yêu cầu khảo sát salon Sitar. KTS GuHomes sẽ liên hệ trong 24 giờ làm việc.
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
