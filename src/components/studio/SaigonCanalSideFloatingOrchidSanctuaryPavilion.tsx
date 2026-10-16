'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface OrchidSpecies {
  id: string
  name: string
  scientificName: string
  lightRequirement: string
  humidityIdeal: string
  bloomingSeason: string
  fragranceProfile: string
  substrate: string
}

const RARE_ORCHIDS: readonly OrchidSpecies[] = [
  {
    id: 'hoang-thao-ken',
    name: 'Hoàng Thảo Kèn Rừng Nam Bộ',
    scientificName: 'Dendrobium lituiflorum',
    lightRequirement: '40% ánh sáng khuếch tán qua lam Teak xoay góc',
    humidityIdeal: '70% - 78% RH quanh năm',
    bloomingSeason: 'Tháng 2 đến tháng 4 (Cuối mùa khô Sài Gòn)',
    fragranceProfile: 'Hương trầm thoang thoảng dịu ngọt lúc bình minh',
    substrate: 'Gỗ Lũa Sao Cát ngâm sông kết hợp dớn cọng rừng tự nhiên',
  },
  {
    id: 'phi-diep-dot-bien',
    name: 'Phi Điệp Đột Biến 5 Cánh Trắng',
    scientificName: 'Dendrobium anosmum var. alba',
    lightRequirement: '35% ánh sáng dịu, tuyệt đối tránh nắng gắt hướng Tây',
    humidityIdeal: '75% - 85% RH với luồng gió đối lưu liên tục',
    bloomingSeason: 'Tháng 5 đến tháng 7 (Đầu mùa mưa)',
    fragranceProfile: 'Thơm ngát nồng nàn thanh khiết lúc chập tối',
    substrate: 'Vỏ thông New Zealand xử lý nhiệt kết hợp than củi đước Cần Giờ',
  },
  {
    id: 'ngoc-diem-dai-chau',
    name: 'Ngọc Điểm Đai Châu Rừng Sộp',
    scientificName: 'Rhynchostylis gigantea',
    lightRequirement: '50% ánh sáng tự nhiên qua mành tre hun khói',
    humidityIdeal: '65% - 75% RH chịu hạn tốt',
    bloomingSeason: 'Dịp Tết Nguyên Đán (Tháng 12 - Tháng 1 âm lịch)',
    fragranceProfile: 'Hương thơm quý phái lan tỏa cả gian thủy đình',
    substrate: 'Gốc gỗ Nhãn cổ thụ ghép mộng đồng thau không rỉ sét',
  },
]

export function SaigonCanalSideFloatingOrchidSanctuaryPavilion({ className }: { className?: string }) {
  const [selectedOrchid, setSelectedOrchid] = useState<string>('hoang-thao-ken')
  const [mistActive, setMistActive] = useState<boolean>(false)
  const [humidityLevel, setHumidityLevel] = useState<number>(75)
  const [sunShadeAngle, setSunShadeAngle] = useState<number>(45)

  const audioContextRef = useRef<AudioContext | null>(null)
  const noiseSourceRef = useRef<AudioNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const { openQuoteModal } = useQuickQuote()

  const currentOrchid = RARE_ORCHIDS.find((o) => o.id === selectedOrchid) ?? RARE_ORCHIDS[0]!

  useEffect(() => {
    return () => {
      stopWaterSound()
    }
  }, [])

  const stopWaterSound = () => {
    if (noiseSourceRef.current) {
      try {
        // Disconnect node
        noiseSourceRef.current.disconnect()
      } catch {
        // ignore
      }
      noiseSourceRef.current = null
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect()
      gainNodeRef.current = null
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }
    setMistActive(false)
  }

  // Bật âm thanh sương siêu âm & sóng nước sông qua Web Audio API
  const toggleMistSound = () => {
    if (mistActive) {
      stopWaterSound()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      // Tạo Pink Noise giả lập tiếng sương mù siêu âm và tiếng sóng nước vỗ mạn thuyền
      const bufferSize = ctx.sampleRate * 2
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
        b6 = white * 0.115926
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      // Filter dải thấp mô phỏng tiếng nước vỗ bến và sương mù mịn
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(650, ctx.currentTime)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.5)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start()
      noiseSourceRef.current = noise
      gainNodeRef.current = gain
      setMistActive(true)
    } catch {
      setMistActive(false)
    }
  }

  return (
    <section
      id="floating-orchid-pavilion"
      className={cn('u-gutter py-[clamp(4.5rem,10vh,8rem)] bg-surface/50 border-t border-line/60 relative isolate overflow-hidden', className)}
    >
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-line">
          <div className="flex flex-col gap-3 max-w-[75ch]">
            <Label rule tone="accent">
              Công Trình Sinh Thái Mặt Nước Độc Bản
            </Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-normal text-ink leading-[1.2]">
              Thủy Đình Vườn Lan Rừng Treo & Sàn Teak Nổi Sông Sài Gòn.
            </h2>
            <p className="font-body text-[1rem] text-ink/75 leading-relaxed mt-1">
              Kiến trúc bán nguyệt nổi tự do trên mặt sông, trang bị hệ phao chìm ổn định 95% chống chao đảo sóng tàu. Hệ vi khí hậu tích hợp phun sương siêu âm hạ 5.2°C và bảo dưỡng vườn phong lan quý hiếm của gia chủ.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-center justify-center rounded-xl bg-canvas border border-line p-3 min-w-[110px] shadow-xs">
              <span className="font-mono text-[11px] uppercase text-muted">Hạ nhiệt tự nhiên</span>
              <span className="font-display text-lg font-medium text-accent">-5.2°C</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-canvas border border-line p-3 min-w-[110px] shadow-xs">
              <span className="font-mono text-[11px] uppercase text-muted">Chống lật phao</span>
              <span className="font-display text-lg font-medium text-ink">95% ổn định</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left 7 Cols: Image & Interactive Waterfront Scene */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl group">
              <Image
                src="/media/an-huong-tram/1-1600.webp"
                alt="Thủy đình treo vườn lan rừng nổi trên mặt nước sông Sài Gòn GuHomes"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent" />

              {/* Mist Overlay Animation */}
              {mistActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.45, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute inset-0 bg-gradient-to-t from-canvas/40 via-transparent to-transparent backdrop-blur-[1px] pointer-events-none"
                />
              )}

              {/* Overlaid Information */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1 text-canvas">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent-soft">
                    Độc bản ven sông · Thảo Điền / Bán Đảo Thanh Đa
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-canvas">
                    Vườn Lan Treo Thủy Đình Khí Động Học
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMistSound}
                    className={cn(
                      'min-h-[44px] px-5 py-2.5 rounded-full font-mono text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer shadow-lg',
                      mistActive
                        ? 'bg-accent text-espresso hover:bg-accent-soft active:scale-95 animate-pulse'
                        : 'bg-espresso/90 text-canvas border border-accent/40 hover:bg-espresso active:scale-95',
                    )}
                  >
                    <span className={cn('h-2 w-2 rounded-full', mistActive ? 'bg-espresso' : 'bg-accent')} />
                    <span>{mistActive ? 'Dừng Phun Sương Sông' : 'Kích Hoạt Phun Sương & Sóng Nước'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Species Selector Bar */}
            <div className="p-5 rounded-xl border border-line bg-canvas flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Danh Mục Lan Rừng Bảo Tồn Tại Thủy Đình:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {RARE_ORCHIDS.map((orchid) => {
                  const isActive = orchid.id === selectedOrchid
                  return (
                    <button
                      key={orchid.id}
                      type="button"
                      onClick={() => setSelectedOrchid(orchid.id)}
                      className={cn(
                        'flex flex-col text-left p-3 rounded-lg border transition-all cursor-pointer min-h-[50px]',
                        isActive
                          ? 'border-accent bg-surface shadow-xs'
                          : 'border-line/70 bg-surface/30 hover:border-accent/40 text-muted',
                      )}
                    >
                      <span className="font-body text-xs font-semibold text-ink">{orchid.name}</span>
                      <span className="text-[11px] font-mono italic text-accent mt-0.5">{orchid.scientificName}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Technical Pavilion Specifications */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <span>● THỦY ĐÌNH KHÔNG GIAN NGHỈ DƯỠNG NỔI</span>
                <span>·</span>
                <span>36 m² MẶT NƯỚC</span>
              </div>
              <h4 className="font-display text-2xl text-ink">
                Hệ Vi Khí Hậu Mặt Nước Sông Sài Gòn
              </h4>
              <p className="font-body text-xs sm:text-sm text-ink/75 leading-relaxed">
                Mặt nước sông tạo ra độ ẩm bốc hơi tự nhiên, nhưng nắng hướng Tây phản chiếu mặt gương nước có thể đốt cháy búp non của phong lan. Hệ lam Teak tự động xoay góc cản 60% nhiệt bức xạ trong khi vẫn bảo tồn 100% tầm nhìn view sông.
              </p>
            </div>

            {/* Microclimate Sliders Control */}
            <div className="p-5 rounded-xl border border-line bg-canvas shadow-xs flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted uppercase">Độ Ẩm Vi Khí Hậu Vườn Lan:</span>
                  <span className="font-mono text-sm font-semibold text-accent">{humidityLevel}% RH</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="90"
                  value={humidityLevel}
                  onChange={(e) => setHumidityLevel(parseInt(e.target.value, 10))}
                  className="w-full accent-accent h-1.5 bg-line rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-line/60">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted uppercase">Góc Nghiêng Lam Chắn Nắng:</span>
                  <span className="font-mono text-sm font-semibold text-ink">{sunShadeAngle}° Khuếch Tán</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="75"
                  value={sunShadeAngle}
                  onChange={(e) => setSunShadeAngle(parseInt(e.target.value, 10))}
                  className="w-full accent-ink h-1.5 bg-line rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Selected Orchid Details Card */}
            <div className="p-5 rounded-xl border border-accent/30 bg-espresso text-canvas flex flex-col gap-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-soft">
                  Hồ Sơ Giống Lan: {currentOrchid.name}
                </span>
                <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div>
                  <span className="text-canvas/60">Yêu cầu ánh sáng: </span>
                  <span className="font-medium text-canvas/90">{currentOrchid.lightRequirement}</span>
                </div>
                <div>
                  <span className="text-canvas/60">Độ ẩm tối ưu: </span>
                  <span className="font-medium text-accent">{currentOrchid.humidityIdeal}</span>
                </div>
                <div>
                  <span className="text-canvas/60">Mùa trổ hoa: </span>
                  <span className="font-medium text-canvas/90">{currentOrchid.bloomingSeason}</span>
                </div>
                <div>
                  <span className="text-canvas/60">Hương thơm: </span>
                  <span className="font-medium text-accent-soft">{currentOrchid.fragranceProfile}</span>
                </div>
                <div>
                  <span className="text-canvas/60">Giá thể nuôi cấy: </span>
                  <span className="text-canvas/80">{currentOrchid.substrate}</span>
                </div>
              </div>
            </div>

            {/* CTA Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => openQuoteModal('wabi-sabi')}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-full bg-espresso hover:bg-ink text-canvas font-medium text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-md cursor-pointer border border-accent/40"
              >
                <span>Dự Toán Thủy Đình Mặt Nước</span>
                <ArrowUpRightIcon className="text-base text-accent" />
              </button>

              <Link
                href="/du-toan-chi-phi"
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full border border-line hover:border-accent hover:bg-canvas text-ink text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Bóc Tách Mộng Gỗ Teak</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
