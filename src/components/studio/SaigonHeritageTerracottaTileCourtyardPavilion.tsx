'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ThermalComparison {
  timeLabel: string
  outdoorTempC: number
  pavilionTempC: number
  tempDiffC: number
  solarRadiationWm2: number
  roofCoolingEffect: string
}

const THERMAL_DATA: ThermalComparison[] = [
  { timeLabel: '09:00 Nắng Sớm', outdoorTempC: 31.2, pavilionTempC: 27.0, tempDiffC: -4.2, solarRadiationWm2: 650, roofCoolingEffect: 'Gió đối lưu qua khe ngói âm dương' },
  { timeLabel: '12:00 Đứng Bóng', outdoorTempC: 37.5, pavilionTempC: 29.5, tempDiffC: -8.0, solarRadiationWm2: 980, roofCoolingEffect: 'Lớp đệm khí 4 tầng ngói chặn 92% nhiệt bức xạ' },
  { timeLabel: '14:30 Nắng Gắt', outdoorTempC: 36.8, pavilionTempC: 29.2, tempDiffC: -7.6, solarRadiationWm2: 890, roofCoolingEffect: 'Mái vuốt cong thoát nhiệt nhanh theo luồng gió sông' },
  { timeLabel: '17:00 Ráng Chiều', outdoorTempC: 32.0, pavilionTempC: 28.1, tempDiffC: -3.9, solarRadiationWm2: 420, roofCoolingEffect: 'Men xanh lý Cây Mai tản nhiệt mát mẻ đầu tối' }
]

export function SaigonHeritageTerracottaTileCourtyardPavilion({ className = '' }: { className?: string }) {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(1) // 12:00 Đứng bóng
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [teaServiceActive, setTeaServiceActive] = useState(false)
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [courtyardSize, setCourtyardSize] = useState('30-50m2')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const dropTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      stopAudio()
      if (dropTimerRef.current) clearInterval(dropTimerRef.current)
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

  // Âm thanh giọt mưa ranh từ máng xối đồng đỏ rơi tí tách vào ang gốm Cây Mai
  const startAudio = () => {
    const ctx = initAudio()
    if (!ctx) return

    setIsAudioPlaying(true)

    const triggerWaterDrop = () => {
      if (!ctx || ctx.state === 'closed') return
      const now = ctx.currentTime

      // 1. Tiếng giọt nước 'tí tách' (drip)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // Tần số nốt giọt nước gốm
      const baseFreq = 1200 + Math.random() * 400
      osc.type = 'sine'
      osc.frequency.setValueAtTime(baseFreq, now)
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.04)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.12, now + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)

      // 2. Độ vang ang sành Cây Mai (ceramic resonance)
      const bellOsc = ctx.createOscillator()
      const bellGain = ctx.createGain()
      bellOsc.type = 'triangle'
      bellOsc.frequency.setValueAtTime(480, now)

      bellGain.gain.setValueAtTime(0.001, now)
      bellGain.gain.linearRampToValueAtTime(0.03, now + 0.02)
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)

      osc.connect(gain)
      gain.connect(ctx.destination)

      bellOsc.connect(bellGain)
      bellGain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.18)

      bellOsc.start(now)
      bellOsc.stop(now + 0.65)
    }

    dropTimerRef.current = setInterval(triggerWaterDrop, 1800)
  }

  const stopAudio = () => {
    if (dropTimerRef.current) {
      clearInterval(dropTimerRef.current)
      dropTimerRef.current = null
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

  const currentThermal = THERMAL_DATA[selectedTimeIndex] ?? (THERMAL_DATA[0] as ThermalComparison)

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/40 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Kiến Trúc Vọng Lâu Chợ Lớn Xưa
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Ngói Âm Dương Men Xanh Lý | Giảm Nhiệt 3.8°C - 8.0°C
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Vọng Lâu Ngói Cổ Chợ Lớn <span className="italic text-emerald-200">Cho Lon Terracotta Pavilion</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Không gian đàm đạo thưởng trà phục dựng vọng lâu ngói âm dương Chợ Lớn men xanh lý cuối thế kỷ 19.
            Hệ cột gỗ Căm Xe tròn đẽo tay trên tảng đá xanh Bửu Long nguyên khối, máng xối đồng đỏ gò tay dẫn giọt ranh
            vào ang sành hoa sen Cây Mai nung củi, kiến tạo ốc đảo vi khí hậu mát lạnh thuần khiết giữa lòng Sài Gòn.
          </p>
        </div>

        {/* Khung chức năng 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: So sánh nhiệt độ vi khí hậu & Giọt ranh tí tách */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Hiệu Ứng Hạ Nhiệt 4 Tầng Ngói Âm Dương</h3>
                  <p className="text-xs text-stone-400">Chọn thời điểm trong ngày để kiểm chứng khả năng ngăn nhiệt bức xạ</p>
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
                      <span>Dừng Tiếng Nước Ranh</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      <span>Nghe Giọt Nước Ranh Tí Tách</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bộ chọn thời điểm */}
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {THERMAL_DATA.map((item, idx) => (
                  <button
                    key={item.timeLabel}
                    type="button"
                    onClick={() => setSelectedTimeIndex(idx)}
                    className={cn(
                      'rounded-xl border p-2.5 text-left transition-all min-h-[44px]',
                      selectedTimeIndex === idx
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:text-stone-300'
                    )}
                  >
                    <span className="text-[11px] font-medium block">{item.timeLabel}</span>
                    <span className="font-mono text-xs text-rose-300 font-semibold">{item.tempDiffC}°C Giảm Nhiệt</span>
                  </button>
                ))}
              </div>

              {/* Thẻ hiển thị tương quan nhiệt độ */}
              <div className="mt-8 rounded-xl border border-stone-800/80 bg-stone-950/80 p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="text-center sm:border-r sm:border-stone-800 pr-4">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400">Nhiệt Độ Ngoài Trời</span>
                    <p className="mt-2 font-mono text-2xl font-bold text-amber-400">{currentThermal.outdoorTempC}°C</p>
                    <span className="text-[10px] text-stone-500">Bức xạ: {currentThermal.solarRadiationWm2} W/m²</span>
                  </div>

                  <div className="text-center sm:border-r sm:border-stone-800 px-4">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400">Dưới Mái Vọng Lâu</span>
                    <p className="mt-2 font-mono text-2xl font-bold text-emerald-400">{currentThermal.pavilionTempC}°C</p>
                    <span className="text-[10px] text-stone-500">Mát đầm tự nhiên</span>
                  </div>

                  <div className="text-center pl-4">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400">Chênh Lệch Thực Tế</span>
                    <p className="mt-2 font-mono text-2xl font-bold text-rose-400">{currentThermal.tempDiffC}°C</p>
                    <span className="text-[10px] text-emerald-300 font-medium">Triệt 92% bức xạ</span>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-emerald-800/40 bg-emerald-950/20 p-3 text-xs text-emerald-200">
                  <strong>Cơ chế vi khí hậu:</strong> {currentThermal.roofCoolingEffect}
                </div>
              </div>

              {/* Tùy chỉnh khay trà sành phục vụ */}
              <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/60 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-medium text-stone-200">Trà Cụ Độc Ẩm Gốm Cây Mai Phục Dựng</h4>
                    <p className="text-[11px] text-stone-500">Bật chế độ bài trí bàn trà gỗ căm xe nguyên khối</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTeaServiceActive(!teaServiceActive)}
                    className={cn(
                      'rounded-xl border px-3.5 py-1.5 text-xs font-medium transition-colors min-h-[44px]',
                      teaServiceActive
                        ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                        : 'border-stone-700 bg-stone-900 text-stone-300'
                    )}
                  >
                    {teaServiceActive ? 'Đang Bày Trà Cụ' : 'Thu Gọn Bàn Trà'}
                  </button>
                </div>
              </div>
            </div>

            {/* Thông số kỹ thuật vật liệu */}
            <div className="mt-8 border-t border-stone-800 pt-5 text-xs text-stone-400">
              <p>
                Ngói âm dương men xanh lý Cây Mai nung củi nhiệt độ 1.150°C có khả năng chống thấm tuyệt đối,
                không giữ nhiệt bê tông, kết hợp máng xối đồng đỏ gò tay tạo tiếng ranh mưa dịu êm không vỡ nốt.
              </p>
            </div>
          </div>

          {/* Cột phải: Quy chuẩn mộc & Form tư vấn vọng lâu */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Cấu tạo 4 lớp mái & chân tảng */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Quy Cách Mộc &amp; Đá Cổ Gia Định</h3>
              <p className="mt-1 text-xs text-stone-400">Giải pháp chịu nắng mưa nhiệt đới 100 năm không xuống cấp</p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Ngói Âm Dương Men Xanh Lý</span>
                    <span className="font-mono text-[10px] text-stone-400">4 Tầng Xếp Đè</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Tạo lớp đệm không khí dày 80mm giữa các tầng ngói, triệt tiêu dẫn nhiệt xuống mặt sàn trà.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Hệ Cột Tròn Gỗ Căm Xe</span>
                    <span className="font-mono text-[10px] text-stone-400">Đường Kính 280mm</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Gỗ Căm Xe già đẽo tròn thủ công bằng rìu mộc truyền thống, quét dầu trẩu tự nhiên bảo vệ thớ gỗ.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Chân Tảng Đá Xanh Bửu Long</span>
                    <span className="font-mono text-[10px] text-stone-400">Đá Khối Tự Nhiên</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Cách ẩm hoàn toàn chân cột gỗ khỏi mặt đất, chống mối mọt và tạo thế đứng vững chãi ngàn năm.
                  </p>
                </div>
              </div>
            </div>

            {/* Form đăng ký may đo vọng lâu */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Đăng Ký Tư Vấn Vọng Lâu Sân Trong</h3>
              <p className="mt-1 text-xs text-stone-400">
                Khảo sát hướng nắng nhiệt và kiến tạo vọng lâu sân trong may đo bởi GuHomes.
              </p>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-emerald-800/60 bg-emerald-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-emerald-200">
                    Đã ghi nhận yêu cầu. KTS Trưởng GuHomes sẽ liên hệ gửi bản vẽ thiết kế vọng lâu trong 24 giờ.
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
                      value={courtyardSize}
                      onChange={(e) => setCourtyardSize(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none min-h-[44px]"
                    >
                      <option value="20-30m2">Sân giếng trời nhà phố (20 - 30m²)</option>
                      <option value="30-50m2">Sân trong biệt thự song lập (30 - 50m²)</option>
                      <option value="50-100m2">Vườn cảnh quan dinh thự đơn lập (50 - 100m²)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 min-h-[44px]"
                  >
                    <span>Nhận Bản Vẽ Phối Cảnh Vọng Lâu</span>
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
