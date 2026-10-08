'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WellWaterMetric {
  hourLabel: string
  ambientTempC: number
  wellWaterTempC: number
  tempReductionC: number
  relativeHumidityPercent: number
  tdsPpm: number
}

const HOURLY_METRICS: WellWaterMetric[] = [
  { hourLabel: '06:00 Sương Sớm', ambientTempC: 26.5, wellWaterTempC: 22.0, tempReductionC: -4.5, relativeHumidityPercent: 82, tdsPpm: 68 },
  { hourLabel: '12:00 Đứng Bóng', ambientTempC: 36.2, wellWaterTempC: 24.5, tempReductionC: -11.7, relativeHumidityPercent: 58, tdsPpm: 72 },
  { hourLabel: '15:00 Nắng Chiều', ambientTempC: 34.8, wellWaterTempC: 24.2, tempReductionC: -10.6, relativeHumidityPercent: 62, tdsPpm: 70 },
  { hourLabel: '19:00 Chập Tối', ambientTempC: 29.0, wellWaterTempC: 23.5, tempReductionC: -5.5, relativeHumidityPercent: 76, tdsPpm: 69 },
  { hourLabel: '23:00 Đêm Tĩnh', ambientTempC: 25.5, wellWaterTempC: 22.5, tempReductionC: -3.0, relativeHumidityPercent: 80, tdsPpm: 68 }
]

export function SaigonCanalSideAncientWellCourtyardSanctuary({ className = '' }: { className?: string }) {
  const [selectedHourIndex, setSelectedHourIndex] = useState(1) // 12:00 Đứng Bóng
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [wellCoverClosed, setWellCoverClosed] = useState(false)
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [wellDepthMeters, setWellDepthMeters] = useState('8-12m')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const waterFlowSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const bucketTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      stopAudio()
      if (bucketTimerRef.current) clearInterval(bucketTimerRef.current)
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

  // Tiếng nước suối ngầm róc rách & gàu gỗ múc nước chạm đáy giếng vang vọng
  const startAudio = () => {
    const ctx = initAudio()
    if (!ctx) return

    // 1. Tiếng nước mạch ngầm róc rách
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.03
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(800, ctx.currentTime)
    filter.Q.setValueAtTime(3.0, ctx.currentTime)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.5)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start()
    waterFlowSourceRef.current = source
    setIsAudioPlaying(true)

    // 2. Tiếng gàu gỗ thả rơi tõm xuống đáy giếng và tiếng vọng giếng sâu (echo)
    const triggerBucketSplash = () => {
      if (!ctx || ctx.state === 'closed') return
      const now = ctx.currentTime

      const splashOsc = ctx.createOscillator()
      const splashGain = ctx.createGain()
      splashOsc.type = 'sine'
      splashOsc.frequency.setValueAtTime(140, now)
      splashOsc.frequency.exponentialRampToValueAtTime(50, now + 0.3)

      splashGain.gain.setValueAtTime(0.15, now)
      splashGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      splashOsc.connect(splashGain)
      splashGain.connect(ctx.destination)

      splashOsc.start(now)
      splashOsc.stop(now + 0.4)
    }

    bucketTimerRef.current = setInterval(triggerBucketSplash, 6000)
  }

  const stopAudio = () => {
    if (waterFlowSourceRef.current) {
      try {
        waterFlowSourceRef.current.stop()
        waterFlowSourceRef.current.disconnect()
      } catch {
        // ignore
      }
      waterFlowSourceRef.current = null
    }
    if (bucketTimerRef.current) {
      clearInterval(bucketTimerRef.current)
      bucketTimerRef.current = null
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

  const currentMetric = HOURLY_METRICS[selectedHourIndex] ?? (HOURLY_METRICS[0] as WellWaterMetric)

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/40 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Di Sản Nguồn Nước Cổ Gia Định
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Đá Ong Xám &amp; Vôi Hàu | Giảm Nhiệt 4.2°C
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Sân Trong Giếng Cổ Chợ Quán <span className="italic text-emerald-200">Cho Quan Ancient Well Courtyard</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Phục dựng thành giếng cổ Chợ Quán bằng đá ong xám đẽo tay ghép mạch vữa vôi hàu vỏ sò. Đáy giếng lọc 5 tầng
            sỏi thạch anh và than hoạt tính gáo dừa Bến Tre, máng xối sành men da lươn Cây Mai nung củi, bao quanh bởi
            vườn dương xỉ vi khí hậu và nắp giếng gỗ Nghiến đá ngâm dầu quế thanh lọc không khí tư gia.
          </p>
        </div>

        {/* Khung chức năng 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Bộ đo nhiệt độ nước giếng & Tương tác âm thanh lòng giếng */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Nhiệt Độ Nước Giếng &amp; Vi Khí Hậu Theo Giờ</h3>
                  <p className="text-xs text-stone-400">Chọn khung giờ để xem khả năng đệm nhiệt kỳ diệu của giếng ngầm</p>
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
                      <span>Dừng Tiếng Giếng Vọng</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      <span>Nghe Nước Tràn Miệng Giếng</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bộ chọn khung giờ */}
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {HOURLY_METRICS.map((metric, idx) => (
                  <button
                    key={metric.hourLabel}
                    type="button"
                    onClick={() => setSelectedHourIndex(idx)}
                    className={cn(
                      'rounded-xl border p-2.5 text-left transition-all min-h-[44px]',
                      selectedHourIndex === idx
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:text-stone-300'
                    )}
                  >
                    <span className="text-[11px] font-medium block">{metric.hourLabel}</span>
                    <span className="font-mono text-xs text-emerald-400 font-semibold">{metric.tempReductionC}°C</span>
                  </button>
                ))}
              </div>

              {/* 4 Thẻ Thông số vi khí hậu thời gian thực */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Nhiệt Độ Nước Giếng</span>
                  <p className="mt-2 font-mono text-lg font-semibold text-sky-300">{currentMetric.wellWaterTempC}°C</p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Hạ Nhiệt Sân Trong</span>
                  <p className="mt-2 font-mono text-lg font-semibold text-rose-300">{currentMetric.tempReductionC}°C</p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ Ẩm Vi Khí Hậu</span>
                  <p className="mt-2 font-mono text-lg font-semibold text-amber-300">{currentMetric.relativeHumidityPercent}%</p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ Tinh Khiết TDS</span>
                  <p className="mt-2 font-mono text-lg font-semibold text-emerald-300">{currentMetric.tdsPpm} ppm</p>
                </div>
              </div>

              {/* Tương tác nắp giếng gỗ Nghiến đá */}
              <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/60 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-medium text-stone-200">Nắp Giếng Gỗ Nghiến Đá Ngâm Dầu Quế</h4>
                    <p className="text-[11px] text-stone-500">Đóng nắp bảo tồn độ ẩm và hương quế thanh khiết ban đêm</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWellCoverClosed(!wellCoverClosed)}
                    className={cn(
                      'rounded-xl border px-3.5 py-1.5 text-xs font-medium transition-colors min-h-[44px]',
                      wellCoverClosed
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                        : 'border-stone-700 bg-stone-900 text-stone-300'
                    )}
                  >
                    {wellCoverClosed ? 'Nắp Giếng Đang Đóng' : 'Nắp Giếng Đang Mở'}
                  </button>
                </div>
              </div>
            </div>

            {/* Chú giải 5 tầng lọc sinh thái */}
            <div className="mt-8 border-t border-stone-800 pt-5 text-xs text-stone-400">
              <p>
                Hệ lọc 5 tầng đáy giếng: Than gáo dừa nung 900°C khử độc - Sỏi thạch anh đa kích thước -
                Cát mangan khử phèn sắt - Lưới đồng thau kháng khuẩn - Đá bazan núi lửa bổ sung khoáng vi lượng tự nhiên.
              </p>
            </div>
          </div>

          {/* Cột phải: Mặt cắt địa tầng giếng cổ & Form đăng ký */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Cấu tạo giếng cổ Chợ Quán */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Mặt Cắt Địa Kỹ Thuật Giếng Cổ</h3>
              <p className="mt-1 text-xs text-stone-400">Kiến trúc giếng khơi thích ứng tầng chứa nước Sài Gòn</p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Thành Giếng Đá Ong Xám Đẽo Tay</span>
                    <span className="font-mono text-[10px] text-stone-400">Cao 900mm</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Xếp hình vành khuyên không dùng xi măng, miết mạch vữa vôi hàu tự thở, mát lạnh khi chạm tay.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Máng Xối Sành Men Da Lươn Cây Mai</span>
                    <span className="font-mono text-[10px] text-stone-400">Gốm Nung Củi</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Dẫn dòng nước tràn tuần hoàn chảy quanh gốc cau ta và thảm dương xỉ chân tường.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Ống Trụ Giếng Ngầm Sâu 10m</span>
                    <span className="font-mono text-[10px] text-stone-400">Tầng Nước Khe Nứt</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Hút khí mát tự nhiên từ lòng đất sâu 10m đẩy luồng hơi ẩm 23°C lên làm mát toàn bộ sân trong.
                  </p>
                </div>
              </div>
            </div>

            {/* Form đăng ký kiến tạo giếng cổ */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Đăng Ký Tư Vấn Cảnh Quan Giếng Cổ</h3>
              <p className="mt-1 text-xs text-stone-400">
                Khảo sát mạch nước ngầm và lập bản vẽ phục dựng giếng cổ tư gia bởi GuHomes.
              </p>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-emerald-800/60 bg-emerald-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-emerald-200">
                    Đã ghi nhận yêu cầu. Kỹ sư địa chất công trình GuHomes sẽ liên hệ gửi báo cáo khảo sát trong 24 giờ.
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
                    <label className="mb-1 block text-[11px] text-stone-400">Độ sâu giếng dự kiến:</label>
                    <select
                      value={wellDepthMeters}
                      onChange={(e) => setWellDepthMeters(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none min-h-[44px]"
                    >
                      <option value="6-8m">Giếng cạn sân sau nhà phố (6 - 8m)</option>
                      <option value="8-12m">Giếng ngầm biệt thự vườn (8 - 12m)</option>
                      <option value="12-18m">Giếng sâu dinh thự sinh thái ven sông (12 - 18m)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 min-h-[44px]"
                  >
                    <span>Nhận Báo Cáo Khảo Sát Nước Ngầm</span>
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
