'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface RhythmTrack {
  id: string
  name: string
  tempoBpm: number
  description: string
  timeSignature: string
  maracasFrequency: number
}

const RHYTHMS: readonly RhythmTrack[] = [
  {
    id: 'bossa-rio',
    name: 'Bossa Gió Sông Sài Gòn',
    tempoBpm: 128,
    description: 'Tiết tấu êm dịu mô phỏng nhịp nước triều sông Sài Gòn quyện tiếng lách cách ấm của hạt muồng trong bầu khô.',
    timeSignature: '4/4 Syncopated',
    maracasFrequency: 3600,
  },
  {
    id: 'chacha-sunset',
    name: 'Cha Cha Cha Hoàng Hôn Bán Đảo',
    tempoBpm: 120,
    description: 'Nhịp gõ giòn dứt khoát 1-2-3-cha-cha, cộng hưởng cùng soundboard Hoàng Đàn tuyết tạo chiều sâu không gian.',
    timeSignature: '4/4 Staccato',
    maracasFrequency: 3800,
  },
  {
    id: 'salsa-bachdang',
    name: 'Salsa Bến Bạch Đằng Đêm',
    tempoBpm: 180,
    description: 'Vũ điệu rộn ràng đầy nội lực, đẩy dải tần cao 4.200Hz va đập trên các phiến vòm nan gỗ Trắc đỏ đen tiêu tán âm.',
    timeSignature: '2/2 Clave 3:2',
    maracasFrequency: 4100,
  },
]

interface MaterialSpec {
  name: string
  origin: string
  role: string
  finish: string
}

const ACOUSTIC_MATERIALS: readonly MaterialSpec[] = [
  {
    name: 'Quả Lắc Maracas Bầu Khô Khảm Xà Cừ',
    origin: 'Quả bầu nậm già phơi khô 18 tháng vùng Hóc Môn, bọc màng da trăn gấm Nam Bộ',
    role: 'Tạo dải âm sắc lách cách tự nhiên, phản xạ tần số cao 3.200Hz - 4.500Hz không gắt gỏng',
    finish: 'Khảm ốc xà cừ ngũ sắc Thạnh Xuân, sơn ta 5 lớp bảo vệ hạt gỗ muồng bên trong',
  },
  {
    name: 'Vòm Nan Gỗ Trắc Đỏ Đen Nam Bộ',
    origin: 'Phôi gỗ Trắc lõi già tuyển lựa từ kho xưởng mộc Thạnh Xuân 1.200m²',
    role: 'Hệ tán âm rãnh Fibonacci góc vát 45 độ, triệt tiêu tiếng vang flutter echo',
    finish: 'Lau dầu sáp carnauba thực vật, giữ bề mặt vân tương phản đen đỏ tự nhiên',
  },
  {
    name: 'Soundboard Gỗ Hoàng Đàn Tuyết Lạng Sơn',
    origin: 'Gỗ lũa ngậm tuyết tinh dầu quý, xẻ tấm dày 15mm ghép mộng cánh bướm',
    role: 'Cộng hưởng dải trung trầm, tỏa hương thơm vi khí hậu thanh tao chống ẩm 51% RH',
    finish: 'Đánh bóng bằng lá chuối khô theo bí truyền thợ mộc ngự dụng',
  },
]

export function SaigonAcousticMaracasSanctuarySalon({ className }: { className?: string }) {
  const [selectedRhythm, setSelectedRhythm] = useState<string>('bossa-rio')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [humidityRH, setHumidityRH] = useState<number>(51.0)
  const [activeVisualizer, setActiveVisualizer] = useState<boolean>(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { openQuoteModal } = useQuickQuote()

  const currentRhythm = RHYTHMS.find((r) => r.id === selectedRhythm) ?? RHYTHMS[0]!

  useEffect(() => {
    return () => {
      stopRhythm()
    }
  }, [selectedRhythm])

  const stopRhythm = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }
    setIsPlaying(false)
    setActiveVisualizer(false)
  }

  // Phát một xung âm quả lắc Maracas sắc nét qua White Noise + Bandpass Filter
  const playMaracaHit = (ctx: AudioContext, gainFactor: number = 1.0) => {
    const bufferSize = ctx.sampleRate * 0.06 // 60ms cho tiếng lắc
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    // Filter bandpass mô phỏng tần số quả bầu khô
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(currentRhythm.maracasFrequency, ctx.currentTime)
    filter.Q.setValueAtTime(4.5, ctx.currentTime)

    // Bộ envelope âm lượng
    const gainNode = ctx.createGain()
    const now = ctx.currentTime
    gainNode.gain.setValueAtTime(0.001, now)
    gainNode.gain.linearRampToValueAtTime(0.08 * gainFactor, now + 0.005)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.055)

    noise.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    noise.start(now)
    noise.stop(now + 0.06)
  }

  const toggleRhythm = () => {
    if (isPlaying) {
      stopRhythm()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      const intervalMs = (60 / currentRhythm.tempoBpm) * 500 // nốt móc đơn (8th note)
      let beatCounter = 0

      // Chạy hạt gieo đều nhịp theo tiết tấu
      timerRef.current = setInterval(() => {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') return
        const isStrongBeat = beatCounter % 2 === 0
        const accent = isStrongBeat ? 1.2 : 0.7
        playMaracaHit(audioContextRef.current, accent)
        beatCounter = (beatCounter + 1) % 8
        setActiveVisualizer((prev) => !prev)
      }, intervalMs)

      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <section
      id="maracas-sanctuary-salon"
      className={cn('u-gutter py-[clamp(4.5rem,10vh,8rem)] bg-canvas border-t border-line/60 relative isolate overflow-hidden', className)}
    >
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-line">
          <div className="flex flex-col gap-3 max-w-[75ch]">
            <Label rule tone="accent">
              Kiến Trúc Âm Học Thính Phòng Độc Bản
            </Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-normal text-ink leading-[1.2]">
              Thính Phòng Hòa Âm Maracas Quả Bầu Khô & Vòm Gỗ Trắc Nam Bộ.
            </h2>
            <p className="font-body text-[1rem] text-ink/75 leading-relaxed mt-1">
              Sự kết hợp tinh tế giữa nhạc cụ gõ mộc bản địa Nam Bộ và kỹ thuật âm học phòng thu vi khí hậu nhiệt đới. Không gian được xưởng mộc Thạnh Xuân 1.200m² của GuHomes cân chỉnh thời gian vang RT60 đạt chuẩn 0.28 giây hoàn hảo.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-center justify-center rounded-xl bg-surface border border-line p-3 min-w-[100px]">
              <span className="font-mono text-[11px] uppercase text-muted">Thời gian vang</span>
              <span className="font-display text-lg font-medium text-accent">RT60 = 0.28s</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-surface border border-line p-3 min-w-[100px]">
              <span className="font-mono text-[11px] uppercase text-muted">Tĩnh âm thính phòng</span>
              <span className="font-display text-lg font-medium text-ink">&lt; 22 dBA</span>
            </div>
          </div>
        </div>

        {/* Main Content Showcase */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left 7 Cols: Image & Interactive Sonic Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl group">
              <Image
                src="/media/phong-thuy-nha-o/1-1600.webp"
                alt="Thính phòng âm học hòa âm Maracas gỗ Trắc đỏ đen GuHomes"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />

              {/* Sonic Pulse Animation Overlay */}
              {isPlaying && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: activeVisualizer ? [1, 1.15, 1] : [1.15, 1, 1.15],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-64 w-64 rounded-full border-2 border-accent/40 bg-accent/5 backdrop-blur-xs"
                  />
                  <motion.div
                    animate={{
                      scale: activeVisualizer ? [1.2, 1.4, 1.2] : [1.4, 1.2, 1.4],
                      opacity: [0.15, 0.35, 0.15],
                    }}
                    transition={{ duration: 0.35 }}
                    className="absolute h-80 w-80 rounded-full border border-accent/20"
                  />
                </div>
              )}

              {/* Overlaid Information */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1 text-canvas">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent-soft">
                    Không gian âm học số 078 · Biệt thự ven sông Sài Gòn
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-canvas">
                    Salon Âm Học Maracas & Đàn Dây Nam Bộ
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleRhythm}
                    className={cn(
                      'min-h-[44px] px-5 py-2.5 rounded-full font-mono text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer shadow-lg',
                      isPlaying
                        ? 'bg-accent text-espresso hover:bg-accent-soft active:scale-95 animate-pulse'
                        : 'bg-espresso/90 text-canvas border border-accent/40 hover:bg-espresso active:scale-95',
                    )}
                  >
                    <span className={cn('h-2 w-2 rounded-full', isPlaying ? 'bg-espresso' : 'bg-accent')} />
                    <span>{isPlaying ? 'Dừng Nhịp Quả Lắc' : 'Thử Âm Hạt Gieo Maracas'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Rhythm Selector Dock */}
            <div className="p-5 rounded-xl border border-line bg-surface/70 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Chọn Tiết Tấu Gõ Mộc Bản Địa:
                </span>
                <span className="font-mono text-xs text-accent">
                  Tần số hạt: {currentRhythm.maracasFrequency} Hz · {currentRhythm.timeSignature}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {RHYTHMS.map((rhythm) => {
                  const isActive = rhythm.id === selectedRhythm
                  return (
                    <button
                      key={rhythm.id}
                      type="button"
                      onClick={() => {
                        setSelectedRhythm(rhythm.id)
                        stopRhythm()
                      }}
                      className={cn(
                        'flex flex-col text-left p-3.5 rounded-lg border transition-all cursor-pointer min-h-[50px]',
                        isActive
                          ? 'border-accent bg-canvas shadow-xs'
                          : 'border-line/70 bg-canvas/40 hover:border-accent/40 text-muted',
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-body text-xs font-semibold text-ink">{rhythm.name}</span>
                        <span className="font-mono text-[10px] text-accent">{rhythm.tempoBpm} BPM</span>
                      </div>
                      <span className="text-[11px] text-muted line-clamp-2 mt-1 leading-tight">{rhythm.description}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Technical Acoustics Breakdown */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <span>● PHÂN KHÚC SALON THÍNH PHÒNG NỘI THẤT</span>
                <span>·</span>
                <span>48 m² RIÊNG BIỆT</span>
              </div>
              <h4 className="font-display text-2xl text-ink">
                Kiểm Soát Vi Khí Hậu & Sóng Âm Vòm
              </h4>
              <p className="font-body text-xs sm:text-sm text-ink/75 leading-relaxed">
                Độ ẩm không khí nhiệt đới Sài Gòn thường biến thiên 75-80% RH khiến màng quả lắc Maracas bằng da trăn dễ trùng và hạt muồng hút ẩm nặng hạt. GuHomes tích hợp buồng vi khí hậu giữ chuẩn 51.0% RH bằng gỗ Hoàng Đàn tuyết tự nhiên.
              </p>
            </div>

            {/* Microclimate Acoustic Humidity Slider */}
            <div className="p-4 rounded-xl border border-line bg-canvas shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Độ Ẩm Vi Khí Hậu Buồng Âm Thanh:
                </span>
                <span className="font-mono text-sm font-semibold text-accent">{humidityRH.toFixed(1)}% RH</span>
              </div>
              <input
                type="range"
                min="45"
                max="65"
                step="0.5"
                value={humidityRH}
                onChange={(e) => setHumidityRH(parseFloat(e.target.value))}
                className="w-full accent-accent h-1.5 bg-line rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-muted font-mono">
                <span>45% RH (Khô hanh)</span>
                <span className="text-accent font-medium">51% RH (Chuẩn hòa âm GuHomes)</span>
                <span>65% RH (Ẩm nhiệt đới)</span>
              </div>
            </div>

            {/* Acoustic Materials List */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Ba Tầng Vật Liệu Âm Học Bản Địa:
              </span>
              {ACOUSTIC_MATERIALS.map((mat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-line bg-surface/60 flex flex-col gap-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h5 className="font-body text-xs sm:text-sm font-semibold text-ink flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {mat.name}
                    </h5>
                    <span className="font-mono text-[10px] text-muted">0{idx + 1}</span>
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">
                    <strong className="text-accent font-medium">Vai trò: </strong>
                    {mat.role}
                  </p>
                  <p className="text-[11px] text-muted italic">
                    {mat.finish} · {mat.origin}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => openQuoteModal('modern-luxury')}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-full bg-espresso hover:bg-ink text-canvas font-medium text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-md cursor-pointer border border-accent/40"
              >
                <span>Tư Vấn Thính Phòng Riêng</span>
                <ArrowUpRightIcon className="text-base text-accent" />
              </button>

              <Link
                href="/studio"
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full border border-line hover:border-accent hover:bg-canvas text-ink text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Xem Studio Xưởng Thạnh Xuân</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
