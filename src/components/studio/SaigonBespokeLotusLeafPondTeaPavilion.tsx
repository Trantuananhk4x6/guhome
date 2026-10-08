'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MicroclimateSpec {
  pondAreaM2: number
  lotusCoveragePercent: number
  waterEvaporationLitersPerDay: number
  tempReductionCelsius: number
  windChillCelsius: number
}

export function SaigonBespokeLotusLeafPondTeaPavilion({ className = '' }: { className?: string }) {
  const [pondArea, setPondArea] = useState<number>(45) // m²
  const [lotusCoverage, setLotusCoverage] = useState<number>(65) // %
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [bambooBlindOpen, setBambooBlindOpen] = useState(false)
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [estateType, setEstateType] = useState('Biet-thu-ven-song')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const waterSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const splashTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      stopAudio()
      if (splashTimerRef.current) clearInterval(splashTimerRef.current)
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

  // Âm thanh nước hồ vỗ mạn sàn Kiền Kiền & cá quẫy đuôi
  const startAudio = () => {
    const ctx = initAudio()
    if (!ctx) return

    // Nước vỗ mạn bập bềnh
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.025
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(450, ctx.currentTime)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.6)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start()
    waterSourceRef.current = source
    setIsAudioPlaying(true)

    // Hiệu ứng cá quẫy nước ngẫu nhiên mỗi 4-7 giây
    const triggerFishSplash = () => {
      if (!ctx || ctx.state === 'closed') return
      const now = ctx.currentTime
      const splashOsc = ctx.createOscillator()
      const splashGain = ctx.createGain()

      splashOsc.type = 'sine'
      splashOsc.frequency.setValueAtTime(220, now)
      splashOsc.frequency.exponentialRampToValueAtTime(70, now + 0.25)

      splashGain.gain.setValueAtTime(0.08, now)
      splashGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)

      splashOsc.connect(splashGain)
      splashGain.connect(ctx.destination)

      splashOsc.start(now)
      splashOsc.stop(now + 0.35)
    }

    splashTimerRef.current = setInterval(triggerFishSplash, 5000)
  }

  const stopAudio = () => {
    if (waterSourceRef.current) {
      try {
        waterSourceRef.current.stop()
        waterSourceRef.current.disconnect()
      } catch {
        // ignore
      }
      waterSourceRef.current = null
    }
    if (splashTimerRef.current) {
      clearInterval(splashTimerRef.current)
      splashTimerRef.current = null
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

  // Tính toán chỉ số vi khí hậu
  const evaporationRate = (pondArea * 4.8).toFixed(0) // lít nước bốc hơi/ngày
  const tempReduction = (2.2 + (pondArea / 100) * 2.3 + (lotusCoverage / 100) * 1.5).toFixed(1)
  const radiationBlocked = (lotusCoverage * 0.9).toFixed(0)

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/40 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Thủy Mộc Vi Khí Hậu Nam Bộ
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Gỗ Kiền Kiền &amp; Đá Ong Xám | Hạ Nhiệt 4.5°C
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Vọng Trà Hồ Sen Đồng Tháp <span className="italic text-emerald-200">Lotus Pond Tea Pavilion</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Kiến trúc thủy tạ nổi giữa hồ sen Bách Diệp Đồng Tháp Mười. Sàn gỗ Kiền Kiền ngâm nước trường tồn,
            chân rầm đá ong xám Đồng Nai tạo khoang lọc sinh học, mái ngói âm dương vuốt cong đón làn gió mát từ mặt nước
            và rèm trúc đan tay cản 85% bức xạ mặt trời gay gắt phương Tây.
          </p>
        </div>

        {/* Khối chức năng 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Bộ tính toán bốc hơi nhiệt & Tương tác âm thanh hồ sen */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Mô Phỏng Vi Khí Hậu Mặt Nước Hồ Sen</h3>
                  <p className="text-xs text-stone-400">Điều chỉnh diện tích hồ sen để tính toán mức giảm nhiệt thực tế</p>
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
                      <span>Dừng Tiếng Nước Vỗ</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      <span>Nghe Nước Vỗ &amp; Cá Quẫy</span>
                    </>
                  )}
                </button>
              </div>

              {/* 2 Thanh Trượt Điều Chỉnh Quy Mô */}
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300">Diện tích mặt nước hồ sen:</span>
                    <span className="font-mono text-emerald-300 font-semibold">{pondArea} m²</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={pondArea}
                    onChange={(e) => setPondArea(parseInt(e.target.value))}
                    className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                    <span>20 m² (Hồ hiên nhà)</span>
                    <span>60 m² (Vườn biệt thự)</span>
                    <span>150 m² (Quần thể dinh thự ven sông)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300">Độ phủ tán lá sen Bách Diệp chắn nắng:</span>
                    <span className="font-mono text-emerald-300 font-semibold">{lotusCoverage}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={lotusCoverage}
                    onChange={(e) => setLotusCoverage(parseInt(e.target.value))}
                    className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                    <span>30% (Thoáng mặt nước)</span>
                    <span>65% (Tỷ lệ vàng thủy mộc)</span>
                    <span>90% (Rừng sen rậm bóng)</span>
                  </div>
                </div>
              </div>

              {/* 4 Thẻ Chỉ Số Đo Đạc */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Giảm Nhiệt Vọng Trà</span>
                  <p className="mt-2 font-mono text-lg font-semibold text-rose-300">-{tempReduction}°C</p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Lượng Nước Bốc Hơi</span>
                  <p className="mt-2 font-mono text-lg font-semibold text-sky-300">{evaporationRate} L/ngày</p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Chắn Bức Xạ Mặt Trời</span>
                  <p className="mt-2 font-mono text-lg font-semibold text-amber-300">{radiationBlocked}%</p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Chống Mối Mọt Gỗ</span>
                  <p className="mt-2 font-mono text-lg font-semibold text-emerald-300">100% Tự Nhiên</p>
                </div>
              </div>

              {/* Rèm Trúc Che Nắng Tương Tác */}
              <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/60 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-medium text-stone-200">Rèm Trúc Đan Tay Chắn Nắng Hướng Tây</h4>
                    <p className="text-[11px] text-stone-500">Kéo hạ rèm để cản thêm 85% bức xạ nhiệt chiều</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBambooBlindOpen(!bambooBlindOpen)}
                    className={cn(
                      'rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors min-h-[44px]',
                      bambooBlindOpen
                        ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                        : 'border-stone-700 bg-stone-900 text-stone-300'
                    )}
                  >
                    {bambooBlindOpen ? 'Đang Hạ Rèm Trúc' : 'Đang Cuộn Rèm'}
                  </button>
                </div>
              </div>
            </div>

            {/* Thông số kỹ thuật vật liệu */}
            <div className="mt-8 border-t border-stone-800 pt-5 text-xs text-stone-400">
              <p>
                Sàn gỗ Kiền Kiền (Hopea pierrei) ngâm nước ngọt Sài Gòn tự tiết tinh dầu kháng nấm mốc,
                chân cột kê trên khối đá ong xám Đồng Nai đục tay lỗ rỗng thoát khí bốc hơi.
              </p>
            </div>
          </div>

          {/* Cột phải: Quy chuẩn kiến trúc & Form đăng ký */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Cấu trúc vọng trà thủy tạ */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Kết Cấu Vọng Trà Thủy Tạ Nổi</h3>
              <p className="mt-1 text-xs text-stone-400">Giải pháp chịu ngập nước và vi khí hậu đặc thù Tây Nam Bộ</p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Sàn Gỗ Kiền Kiền Chịu Nước</span>
                    <span className="font-mono text-[10px] text-stone-400">Dày 40mm</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Xẻ rãnh thoát nước 4mm, êm mát dưới bàn chân trần, không trơn trượt rong rêu sau 10 năm ngâm nước.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Móng Đá Ong Xám Đồng Nai</span>
                    <span className="font-mono text-[10px] text-stone-400">Khối Đục Tay</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Hệ lỗ rỗng tổ ong giúp vi sinh vật có lợi trú ngụ, giữ nguồn nước hồ sen trong mát tự nhiên.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                    <span>Mái Ngói Âm Dương Đất Sét Nung</span>
                    <span className="font-mono text-[10px] text-stone-400">Ngói Mũi Hài Cổ</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                    Nung lò củi 1.100°C, lớp đệm không khí giữa âm dương giúp hạ nhiệt mái nhà đến 6°C dưới nắng đứng bóng.
                  </p>
                </div>
              </div>
            </div>

            {/* Form đăng ký may đo vọng trà */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Đăng Ký Tư Vấn Vọng Trà Hồ Nước</h3>
              <p className="mt-1 text-xs text-stone-400">
                Khảo sát địa chất thủy văn và thiết kế vọng trà hồ sen may đo bởi KTS GuHomes.
              </p>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-emerald-800/60 bg-emerald-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-emerald-200">
                    Đã tiếp nhận yêu cầu. Kỹ sư cảnh quan GuHomes sẽ liên hệ gửi bản vẽ vi khí hậu trong 24 giờ.
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
                    <label className="mb-1 block text-[11px] text-stone-400">Khu đất dự kiến xây dựng:</label>
                    <select
                      value={estateType}
                      onChange={(e) => setEstateType(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none min-h-[44px]"
                    >
                      <option value="Biet-thu-ven-song">Biệt thự ven sông Sài Gòn / Đồng Nai</option>
                      <option value="Nha-vuon-sinh-thai">Nhà vườn sinh thái Củ Chi / Long An</option>
                      <option value="Penthouse-san-vuon">Penthouse sân vườn trên cao</option>
                      <option value="Khu-nghi-duong-tu-gia">Khu nghỉ dưỡng tư gia biệt lập</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 min-h-[44px]"
                  >
                    <span>Nhận Bản Vẽ Phân Tích Thủy Văn</span>
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
