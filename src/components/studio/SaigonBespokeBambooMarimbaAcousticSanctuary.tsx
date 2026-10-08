'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BambooTube {
  id: string
  noteName: string
  freq: number
  lengthCm: number
  scaleDegree: string
}

// Thang âm ngũ cung Tây Nguyên (16 ống nứa ngâm bùn)
const BAMBOO_TUBES: BambooTube[] = [
  { id: 'tube_1', noteName: 'C4 (Đô)', freq: 261.63, lengthCm: 68, scaleDegree: 'Hò' },
  { id: 'tube_2', noteName: 'D4 (Rê)', freq: 293.66, lengthCm: 62, scaleDegree: 'Xự' },
  { id: 'tube_3', noteName: 'E4 (Mi)', freq: 329.63, lengthCm: 56, scaleDegree: 'Xang' },
  { id: 'tube_4', noteName: 'G4 (Sol)', freq: 392.00, lengthCm: 48, scaleDegree: 'Xê' },
  { id: 'tube_5', noteName: 'A4 (La)', freq: 440.00, lengthCm: 42, scaleDegree: 'Cống' },
  { id: 'tube_6', noteName: 'C5 (Đô cao)', freq: 523.25, lengthCm: 36, scaleDegree: 'Phan' },
  { id: 'tube_7', noteName: 'D5 (Rê cao)', freq: 587.33, lengthCm: 32, scaleDegree: 'Liu' },
  { id: 'tube_8', noteName: 'E5 (Mi cao)', freq: 659.25, lengthCm: 29, scaleDegree: 'Ú' },
  { id: 'tube_9', noteName: 'G5 (Sol cao)', freq: 783.99, lengthCm: 24, scaleDegree: 'Xê cao' },
  { id: 'tube_10', noteName: 'A5 (La cao)', freq: 880.00, lengthCm: 21, scaleDegree: 'Cống cao' },
  { id: 'tube_11', noteName: 'C6 (Đô thánh thót)', freq: 1046.50, lengthCm: 18, scaleDegree: 'Phan cao' },
  { id: 'tube_12', noteName: 'D6 (Rê thánh thót)', freq: 1174.66, lengthCm: 16, scaleDegree: 'Liu cao' },
  { id: 'tube_13', noteName: 'E6 (Mi kim)', freq: 1318.51, lengthCm: 14, scaleDegree: 'Ú kim' },
  { id: 'tube_14', noteName: 'G6 (Sol kim)', freq: 1567.98, lengthCm: 12, scaleDegree: 'Xê ngọc' },
  { id: 'tube_15', noteName: 'A6 (La kim)', freq: 1760.00, lengthCm: 10.5, scaleDegree: 'Cống ngọc' },
  { id: 'tube_16', noteName: 'C7 (Đô đỉnh)', freq: 2093.00, lengthCm: 9, scaleDegree: 'Châu' }
]

const TRUNG_MELODIES = [
  {
    id: 'am_vang_tay_nguyen',
    name: 'Âm Vang Tây Nguyên (Rừng Chiều)',
    tempo: 'Rộn ràng, thôi thúc',
    notes: [
      { tubeIndex: 0, duration: 0.3 },
      { tubeIndex: 2, duration: 0.3 },
      { tubeIndex: 3, duration: 0.3 },
      { tubeIndex: 4, duration: 0.4 },
      { tubeIndex: 5, duration: 0.35 },
      { tubeIndex: 4, duration: 0.3 },
      { tubeIndex: 2, duration: 0.3 },
      { tubeIndex: 0, duration: 0.6 }
    ]
  },
  {
    id: 'dieu_mua_suoi_reo',
    name: 'Điệu Múa Suối Reo (Thác Bản)',
    tempo: 'Thanh thoát, róc rách',
    notes: [
      { tubeIndex: 5, duration: 0.25 },
      { tubeIndex: 7, duration: 0.25 },
      { tubeIndex: 8, duration: 0.3 },
      { tubeIndex: 10, duration: 0.35 },
      { tubeIndex: 8, duration: 0.25 },
      { tubeIndex: 7, duration: 0.25 },
      { tubeIndex: 5, duration: 0.25 },
      { tubeIndex: 3, duration: 0.5 }
    ]
  }
]

const SUNSET_SCENARIOS = [
  { id: 'twilight_2200k', name: 'Hoàng Hôn Đại Ngàn 2200K', lux: '35 Lux', desc: 'Ánh ráng đỏ buôn làng phản chiếu vòm nan tre uốn nhiệt' },
  { id: 'bonfire_2600k', name: 'Lửa Trại Đêm Trăng 2600K', lux: '55 Lux', desc: 'Ánh lửa ấm khơi dậy tiếng đàn T\'rưng rộn rã thính phòng' },
  { id: 'dawn_mist_3200k', name: 'Sương Sớm Thung Lũng 3200K', lux: '75 Lux', desc: 'Ánh sương trong mát kích hoạt đối lưu vi khí hậu 50% RH' }
]

export function SaigonBespokeBambooMarimbaAcousticSanctuary({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeMelodyIndex, setActiveMelodyIndex] = useState(0)
  const [activeTubeIndex, setActiveTubeIndex] = useState<number | null>(null)
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [tubeOffsets, setTubeOffsets] = useState<{ [key: string]: number }>({})
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

  // Âm sắc gõ ống nứa: Sine sóng chủ âm + hài âm thoáng và tiếng gõ mộc đầu dùi
  const playBambooStrike = (freq: number) => {
    const ctx = initAudio()
    if (!ctx) return

    const now = ctx.currentTime

    // 1. Tiếng gõ mộc (thump/attack)
    const clickOsc = ctx.createOscillator()
    const clickGain = ctx.createGain()
    clickOsc.type = 'triangle'
    clickOsc.frequency.setValueAtTime(freq * 1.5, now)
    clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.04)

    clickGain.gain.setValueAtTime(0.3, now)
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

    clickOsc.connect(clickGain)
    clickGain.connect(ctx.destination)

    clickOsc.start(now)
    clickOsc.stop(now + 0.05)

    // 2. Độ vang rỗng của ống nứa ngâm bùn (Resonant body)
    const bodyOsc = ctx.createOscillator()
    const bodyGain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    bodyOsc.type = 'sine'
    bodyOsc.frequency.setValueAtTime(freq, now)

    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(freq, now)
    filter.Q.setValueAtTime(8.0, now)

    bodyGain.gain.setValueAtTime(0.001, now)
    bodyGain.gain.linearRampToValueAtTime(0.25, now + 0.015)
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)

    bodyOsc.connect(filter)
    filter.connect(bodyGain)
    bodyGain.connect(ctx.destination)

    bodyOsc.start(now)
    bodyOsc.stop(now + 0.85)
  }

  const triggerTube = (index: number) => {
    const tube = BAMBOO_TUBES[index]
    if (!tube) return
    const offset = tubeOffsets[tube.id] || 0
    const tunedFreq = tube.freq * Math.pow(2, offset / 1200)

    setActiveTubeIndex(index)
    playBambooStrike(tunedFreq)

    setTimeout(() => {
      setActiveTubeIndex(null)
    }, 250)
  }

  const toggleMelody = () => {
    if (isPlaying) {
      timeoutsRef.current.forEach(t => clearTimeout(t))
      timeoutsRef.current = []
      setIsPlaying(false)
      return
    }

    const melody = TRUNG_MELODIES[activeMelodyIndex]
    if (!melody) return

    setIsPlaying(true)
    let accum = 0

    melody.notes.forEach((note, idx) => {
      const timeout = setTimeout(() => {
        triggerTube(note.tubeIndex)
        if (idx === melody.notes.length - 1) {
          setIsPlaying(false)
        }
      }, accum * 1000)
      timeoutsRef.current.push(timeout)
      accum += note.duration + 0.05
    })
  }

  const handleTune = (tubeId: string, val: number) => {
    setTubeOffsets(prev => ({ ...prev, [tubeId]: val }))
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
              Âm Học Đại Ngàn Tây Nguyên
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              RT60 = 0.31 Giây | Nan Tre Uốn Nhiệt &amp; Nứa Già
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Thính Phòng Hòa Tấu Đàn T&apos;rưng <span className="italic text-amber-200">Bamboo Marimba Sanctuary</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Không gian hòa âm độc bản tôn vinh âm sắc đàn T&apos;rưng và Klông-pút truyền thống. Hệ trần nan tre uốn nhiệt
            bán cầu khử sóng đứng dải tần 500Hz - 2.500Hz, khung đàn gỗ Căm Xe già thếp bạc và hệ tủ điều ẩm vi khí hậu
            50% RH giữ trọn độ đanh vang trong trẻo tựa dòng suối đầu nguồn.
          </p>
        </div>

        {/* Khung chức năng tương tác */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: 16 Ống nứa T'rưng tương tác */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Thang Âm 16 Ống Nứa Già</h3>
                  <p className="text-xs text-stone-400">Gõ vào từng phím nứa để cảm nhận âm sắc rỗng vang tự nhiên</p>
                </div>

                <button
                  type="button"
                  onClick={toggleMelody}
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
                      <span>Nghe Điệu Múa Mẫu</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bộ chọn điệu múa */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-400">Giai điệu mẫu:</span>
                {TRUNG_MELODIES.map((mel, idx) => (
                  <button
                    key={mel.id}
                    type="button"
                    onClick={() => {
                      setActiveMelodyIndex(idx)
                      if (isPlaying) {
                        timeoutsRef.current.forEach(t => clearTimeout(t))
                        setIsPlaying(false)
                      }
                    }}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs transition-colors min-h-[44px]',
                      activeMelodyIndex === idx
                        ? 'border border-amber-600 bg-amber-950/60 text-amber-200'
                        : 'border border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
                    )}
                  >
                    {mel.name}
                  </button>
                ))}
              </div>

              {/* Giàn đàn T'rưng 16 phím nứa */}
              <div className="relative mt-8 overflow-x-auto rounded-xl border border-stone-800/80 bg-stone-950/90 p-4 sm:p-6">
                <div className="flex items-end justify-between gap-1.5 sm:gap-2 min-w-[540px] pb-2">
                  {BAMBOO_TUBES.map((tube, index) => {
                    const isStruck = activeTubeIndex === index
                    const heightPercent = 40 + ((16 - index) / 16) * 55 // chiều cao giảm dần từ ống trầm đến ống bổng
                    return (
                      <div
                        key={tube.id}
                        onClick={() => triggerTube(index)}
                        className="group flex flex-1 cursor-pointer flex-col items-center gap-2"
                      >
                        {/* Nhãn nốt */}
                        <span className="text-[10px] font-mono text-stone-400 group-hover:text-amber-300">
                          {tube.scaleDegree}
                        </span>

                        {/* Thân ống nứa */}
                        <motion.div
                          animate={isStruck ? { scaleY: [1, 0.95, 1.03, 1], y: [0, 2, -2, 0] } : {}}
                          transition={{ duration: 0.2 }}
                          style={{ height: `${heightPercent * 2.2}px` }}
                          className={cn(
                            'relative w-full rounded-t-md rounded-b-sm border transition-all',
                            isStruck
                              ? 'border-amber-400 bg-gradient-to-t from-amber-600 via-amber-400 to-amber-200 shadow-lg shadow-amber-500/50'
                              : 'border-stone-800 bg-gradient-to-t from-amber-950/70 via-stone-800 to-stone-700 group-hover:border-amber-500/60'
                          )}
                        >
                          {/* Khấc nứa */}
                          <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-stone-950/60" />
                          <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-stone-950/60" />
                        </motion.div>

                        {/* Tần số */}
                        <span className="text-[9px] font-mono text-stone-500 group-hover:text-amber-400">
                          {Math.round(tube.freq)}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-3 text-center text-[11px] text-stone-500">
                  Thanh gõ gỗ căm xe bọc da cừu non mềm mại không làm xước vỏ nứa ngâm bùn
                </div>
              </div>

              {/* Tinh chỉnh cao độ phím đang chọn */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/60 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300">Tinh chỉnh cao độ ống nứa số 1 (Đô C4):</span>
                  <span className="font-mono text-amber-300">
                    {(tubeOffsets['tube_1'] || 0) > 0 ? `+${tubeOffsets['tube_1']}` : tubeOffsets['tube_1'] || 0} cents
                  </span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={tubeOffsets['tube_1'] || 0}
                  onChange={(e) => handleTune('tube_1', parseInt(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-amber-500"
                />
              </div>
            </div>

            {/* Chỉ số kỹ thuật âm học */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6 sm:grid-cols-4">
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ Vang RT60</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">0.31 giây</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Vòm Tiêu Âm</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">Nan Tre Uốn</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ Ẩm Vi Khí Hậu</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">50% RH</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Khử Sóng Đứng</span>
                <p className="mt-1 font-mono text-lg font-semibold text-amber-300">0.5 - 2.5 kHz</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Ánh sáng hoàng hôn & Form tư vấn phòng nhạc */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Kịch bản ánh sáng */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Ánh Sáng Đại Ngàn Hoàng Hôn</h3>
              <p className="text-xs text-stone-400 mt-1">Đổi gam màu ánh sáng để cộng hưởng cùng giai điệu T&apos;rưng</p>

              <div className="mt-4 space-y-3">
                {SUNSET_SCENARIOS.map((sc, i) => (
                  <div
                    key={sc.id}
                    onClick={() => setSelectedScenario(i)}
                    className={cn(
                      'cursor-pointer rounded-xl border p-3.5 transition-all min-h-[44px]',
                      selectedScenario === i
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

            {/* Chi tiết vật liệu nứa ngâm bùn */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Quy Chuẩn Chế Tác Bản Địa</h3>
              <ul className="mt-4 space-y-2.5 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Ống nứa già ngâm bùn 12 tháng:</strong> Triệt tiêu tinh bột chống mọt tự nhiên, phơi bóng râm sấy khô 6 tháng giúp lòng ống đanh cứng.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Khung Căm Xe thếp bạc:</strong> Giữ vững cấu trúc đàn không bị rung chấn cộng hưởng phá hỏng âm vực.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>Vòm trần nan tre uốn nhiệt:</strong> Tán âm đa hướng, triệt tiêu phản xạ gắt ở dải tần số trung cao.
                  </span>
                </li>
              </ul>
            </div>

            {/* Form đăng ký khảo sát phòng nhạc */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Khảo Sát Thính Phòng Nhạc Cụ Dân Tộc</h3>
              <p className="mt-1 text-xs text-stone-400">
                KTS Trưởng GuHomes trực tiếp đo đạc và kiến tạo không gian âm học cổ truyền chuẩn Quiet Luxury.
              </p>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-amber-800/60 bg-amber-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-amber-200">
                    Đã ghi nhận yêu cầu khảo sát phòng hòa tấu T&apos;rưng. GuHomes sẽ liên hệ trong 24 giờ làm việc.
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
                    <span>Yêu Cầu Đo Đạc Âm Học Hiện Trường</span>
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
