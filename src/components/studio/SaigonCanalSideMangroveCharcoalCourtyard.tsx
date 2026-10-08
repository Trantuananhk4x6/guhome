'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface PurificationMode {
  id: string
  name: string
  humidityAbsorption: string
  radonAbsorption: string
  negativeIons: string
  tempReduction: string
  charcoalStatus: string
  waterFlow: string
}

const PURIFICATION_MODES: PurificationMode[] = [
  {
    id: 'monsoon_rain',
    name: 'Mùa Mưa Nhiệt Đới (Tháng 5 - 11)',
    humidityAbsorption: '98.5%',
    radonAbsorption: '-85%',
    negativeIons: '4.800 ions/cm³',
    tempReduction: '-3.8°C',
    charcoalStatus: 'Hút ẩm vi mao quản & triệt mốc tường',
    waterFlow: 'Thác tràn rãnh ngầm 12 lít/phút'
  },
  {
    id: 'dry_heat',
    name: 'Mùa Khô Nắng Gắt (Tháng 12 - 4)',
    humidityAbsorption: 'Tỏa ẩm cân bằng 58%',
    radonAbsorption: '-92%',
    negativeIons: '6.200 ions/cm³',
    tempReduction: '-4.6°C',
    charcoalStatus: 'Hạ nhiệt bức xạ bê tông đô thị',
    waterFlow: 'Màn nước mỏng hạ nhiệt gió đối lưu'
  },
  {
    id: 'deep_zen',
    name: 'Thiền Định Đêm Rằm Tĩnh Lặng',
    humidityAbsorption: 'Cân bằng lý tưởng 55%',
    radonAbsorption: '-94%',
    negativeIons: '7.500 ions/cm³',
    tempReduction: '-4.2°C',
    charcoalStatus: 'Lọc 99.8% bụi mịn PM2.5 & khử mùi hữu cơ',
    waterFlow: 'Suối cuội chảy róc rách âm lượng 32dB'
  }
]

export function SaigonCanalSideMangroveCharcoalCourtyard({ className = '' }: { className?: string }) {
  const [activeModeIndex, setActiveModeIndex] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [airflowVelocity, setAirflowVelocity] = useState(1.2) // m/s
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [consultArea, setConsultArea] = useState('25-40m²')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const waterSourceRef = useRef<AudioBufferSourceNode | null>(null)

  useEffect(() => {
    return () => {
      stopAudio()
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

  const startAudio = () => {
    const ctx = initAudio()
    if (!ctx) return

    const bufferSize = ctx.sampleRate * 2
    // Pink noise buffer
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      noiseData[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04
      b6 = white * 0.115926
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer
    noiseSource.loop = true

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(380, ctx.currentTime)
    bandpass.Q.setValueAtTime(1.5, ctx.currentTime)

    // Water trickling buffer
    const waterBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const waterData = waterBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      waterData[i] = (Math.random() * 2 - 1) * 0.02
    }
    const waterSource = ctx.createBufferSource()
    waterSource.buffer = waterBuffer
    waterSource.loop = true

    const waterFilter = ctx.createBiquadFilter()
    waterFilter.type = 'lowpass'
    waterFilter.frequency.setValueAtTime(1200, ctx.currentTime)

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime)
    masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.5)

    noiseSource.connect(bandpass)
    bandpass.connect(masterGain)

    waterSource.connect(waterFilter)
    waterFilter.connect(masterGain)

    masterGain.connect(ctx.destination)

    noiseSource.start()
    waterSource.start()

    noiseSourceRef.current = noiseSource
    waterSourceRef.current = waterSource
    gainNodeRef.current = masterGain
    setIsAudioPlaying(true)
  }

  const stopAudio = () => {
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop()
        noiseSourceRef.current.disconnect()
      } catch {
        // ignore
      }
      noiseSourceRef.current = null
    }
    if (waterSourceRef.current) {
      try {
        waterSourceRef.current.stop()
        waterSourceRef.current.disconnect()
      } catch {
        // ignore
      }
      waterSourceRef.current = null
    }
    setIsAudioPlaying(false)
  }

  const toggleAudio = () => {
    if (isAudioPlaying) {
      stopAudio()
    } else {
      startAudio()
    }
  }

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName || !consultPhone) return
    setSubmitted(true)
  }

  const currentMode: PurificationMode = PURIFICATION_MODES[activeModeIndex] ?? (PURIFICATION_MODES[0] as PurificationMode)

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/40 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Vi Khí Hậu Sinh Thái Rừng Ngập Mặn
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Than Đước Cần Giờ 1.000°C | Giảm Nhiệt 3.8°C
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Sân Trong Than Đước Cần Giờ <span className="italic text-emerald-200">Mangrove Charcoal Courtyard</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Giải pháp vi khí hậu bản địa khai thác than đước rừng ngập mặn Cần Giờ nung yếm khí nhiệt độ cao 1.000°C.
            Cấu trúc vi mao quản hàng tỷ lỗ xốp hấp thụ hơi ẩm nồm Nam Sài Gòn, triệt tiêu sóng điện từ nhân tạo,
            kết hợp suối đá ngầm tạo nồng độ ion âm tương đương rừng nguyên sinh Cúc Phương.
          </p>
        </div>

        {/* Khối chức năng 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Bộ chỉ số thanh lọc & tương tác âm thanh vi khí hậu */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              {/* Header Mode Selector & Audio Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Chỉ Số Vi Khí Hậu Chu Kỳ Năm</h3>
                  <p className="text-xs text-stone-400">Chọn chế độ khí hậu để quan sát cơ chế hấp phụ của than đước</p>
                </div>

                <button
                  type="button"
                  onClick={toggleAudio}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all min-h-[44px] min-w-[44px]',
                    isAudioPlaying
                      ? 'border border-emerald-500 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-500/10'
                      : 'border border-stone-700 bg-stone-800 text-stone-200 hover:border-emerald-600/50 hover:bg-stone-700'
                  )}
                >
                  {isAudioPlaying ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Tắt Âm Thanh Suối</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      <span>Nghe Gió Luồn Than &amp; Suối</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mode Buttons */}
              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {PURIFICATION_MODES.map((mode, idx) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveModeIndex(idx)}
                    className={cn(
                      'rounded-xl border p-3 text-left transition-all min-h-[44px]',
                      activeModeIndex === idx
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100 shadow-sm'
                        : 'border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                    )}
                  >
                    <p className="text-xs font-medium">{mode.name}</p>
                    <p className="mt-1 font-mono text-[11px] text-emerald-400">{mode.tempReduction}</p>
                  </button>
                ))}
              </div>

              {/* 4 Cards Thông số thời gian thực */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Hiệu Suất Hút Ẩm</span>
                  <p className="mt-2 font-mono text-base font-semibold text-sky-300 sm:text-lg">
                    {currentMode.humidityAbsorption}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Khử Bức Xạ EM</span>
                  <p className="mt-2 font-mono text-base font-semibold text-emerald-300 sm:text-lg">
                    {currentMode.radonAbsorption}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Ion Âm Khởi Tạo</span>
                  <p className="mt-2 font-mono text-base font-semibold text-amber-300 sm:text-lg">
                    {currentMode.negativeIons}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Hạ Nhiệt Sân Trong</span>
                  <p className="mt-2 font-mono text-base font-semibold text-rose-300 sm:text-lg">
                    {currentMode.tempReduction}
                  </p>
                </div>
              </div>

              {/* Tùy chỉnh vận tốc gió tự nhiên */}
              <div className="mt-8 rounded-xl border border-stone-800/80 bg-stone-950/60 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300">Vận tốc thông gió đối lưu tự nhiên:</span>
                  <span className="font-mono text-emerald-300">{airflowVelocity.toFixed(1)} m/s (Gió đầm dịu)</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={airflowVelocity}
                  onChange={(e) => setAirflowVelocity(parseFloat(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-emerald-500"
                />
                <div className="mt-2 flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>0.5 m/s (Gió tĩnh)</span>
                  <span>1.2 m/s (Chuẩn vi khí hậu GuHomes)</span>
                  <span>3.0 m/s (Gió lộng ven sông)</span>
                </div>
              </div>
            </div>

            {/* Chú giải vật liệu than đước */}
            <div className="mt-8 border-t border-stone-800 pt-5">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Trạng thái vật liệu:</span>
                <span className="font-medium text-stone-200">{currentMode.charcoalStatus}</span>
              </div>
              <p className="mt-1 text-[11px] text-stone-500">
                Tuổi thọ than nung ém khói: 15-20 năm không cần thay thế, tự tái sinh khi đón nắng sớm phương Đông.
              </p>
            </div>
          </div>

          {/* Cột phải: Quy cách cấu tạo & Form tư vấn sân trong */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Cấu tạo 4 lớp sàn sân trong */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Mặt Cắt Cấu Tạo Sân Trong Than Đước</h3>
              <p className="mt-1 text-xs text-stone-400">Bốn lớp lọc địa kỹ thuật chống đọng úng và kích hoạt đối lưu nhiệt</p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Lớp 1: Khối Than Đước Cần Giờ 80-120mm</span>
                    <span className="font-mono text-[10px] text-stone-400">Dày 120mm</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Xếp khít so le, mặt phẳng êm chân, hấp thụ bức xạ mặt trời trực tiếp và triệt tiêu tiếng vang dội.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Lớp 2: Rãnh Nước Suối Cuội Ngầm</span>
                    <span className="font-mono text-[10px] text-stone-400">Dày 80mm</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Dòng chảy tuần hoàn qua đá cuội suối La Ngà, khuếch tán hơi mát lạnh lên chân tường gạch mộc.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Lớp 3: Cát Thạch Anh Lọc Đa Tầng</span>
                    <span className="font-mono text-[10px] text-stone-400">Dày 60mm</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Ngăn bùn đất vi sinh, giữ dòng suối luôn trong vắt không sinh rong rêu hay ấu trùng muỗi.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Lớp 4: Màng Thoát Nước Ngầm HDPE &amp; Bàng Vuông</span>
                    <span className="font-mono text-[10px] text-stone-400">Dày 20mm</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Tán lá bàng vuông che bóng 65%, thoát nước triệt để khi Sài Gòn mưa rào vũ lượng 120mm/giờ.
                  </p>
                </div>
              </div>
            </div>

            {/* Form đăng ký kiến tạo sân trong */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Đăng Ký Khảo Sát Vi Khí Hậu Sân Trong</h3>
              <p className="mt-1 text-xs text-stone-400">
                Đo đạc hướng gió, hướng nắng và lập phương án sân trong than đước may đo bởi GuHomes.
              </p>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-emerald-800/60 bg-emerald-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-emerald-200">
                    Đã tiếp nhận yêu cầu. Kỹ sư vi khí hậu GuHomes sẽ gửi bản tính toán nhiệt lượng trong 24 giờ.
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
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại / Zalo"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-stone-400">Diện tích sân trong dự kiến:</label>
                    <select
                      value={consultArea}
                      onChange={(e) => setConsultArea(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none min-h-[44px]"
                    >
                      <option value="15-25m²">Sân giếng trời nhà phố (15 - 25m²)</option>
                      <option value="25-40m²">Sân vườn thông tầng biệt thự (25 - 40m²)</option>
                      <option value="40-70m²">Vườn thiền rooftop penthouse (40 - 70m²)</option>
                      <option value=">70m²">Khu sinh thái biệt thự vườn ven sông (&gt; 70m²)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 min-h-[44px]"
                  >
                    <span>Nhận Phương Án Vi Khí Hậu Chi Tiết</span>
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
