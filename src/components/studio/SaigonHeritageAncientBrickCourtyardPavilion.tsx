'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type BrickEra = 'era-1880' | 'era-1920' | 'breezeblock'

interface BrickSpecification {
  id: BrickEra
  name: string
  period: string
  composition: string
  colorHue: string
  coolingDelta: string
  porosity: string
  description: string
  bgAccent: string
}

const BRICK_CATALOGUE: Record<BrickEra, BrickSpecification> = {
  'era-1880': {
    id: 'era-1880',
    name: 'Gạch Đất Nung Sài Gòn 1880',
    period: 'Thời kỳ Bến Nghé - Rạch Bến Nghé sơ khởi',
    composition: 'Đất sét đỏ phù sa sông Sài Gòn nung lò củi đước 10 ngày',
    colorHue: 'Đỏ gạch son mộc mạc ánh nâu trầm',
    coolingDelta: '-3.8°C Giảm bức xạ nhiệt',
    porosity: 'Độ xốp mao dẫn 16.5% giữ ẩm vượt trội',
    description: 'Từng viên gạch được sưu tầm từ các công trình nhà rường cổ ven sông Sài Gòn. Cấu trúc mao quản tự nhiên hút ẩm và giải phóng hơi mát khi trời nắng.',
    bgAccent: 'from-amber-800/30 to-rose-950/10',
  },
  'era-1920': {
    id: 'era-1920',
    name: 'Gạch Vôi Cát Hoàng Thổ Thập Niên 1920',
    period: 'Giao thoa kiến trúc Đông Dương & Chợ Quán xưa',
    composition: 'Vôi hàu Cần Giờ nghiền mịn trộn cát hạt thô và đất vàng',
    colorHue: 'Vàng hoàng thổ ấm áp rêu phong',
    coolingDelta: '-3.5°C Cách nhiệt đối lưu',
    porosity: 'Độ xốp 14.2% thở tự nhiên cùng thời tiết',
    description: 'Gạch viên lớn đúc khuôn gỗ thủ công thời Pháp thuộc. Bề mặt nhám mộc lưu giữ lớp vôi mịn cổ kính, không sinh rêu trơn trượt trên lối đi đình trà.',
    bgAccent: 'from-amber-700/25 to-yellow-950/10',
  },
  breezeblock: {
    id: 'breezeblock',
    name: 'Gạch Bông Gió Men Cổ Nam Bộ',
    period: 'Hoa văn hình học lưu thông khí hậu nhiệt đới',
    composition: 'Gốm đất nung tráng men ngọc lam tro trấu nung 1.180°C',
    colorHue: 'Sắc men rêu ngọc cổ bản thanh nhã',
    coolingDelta: '-4.2°C Đón gió xuyên phòng',
    porosity: 'Diện tích mở 45% thông gió đa hướng',
    description: 'Hệ lam bông gió xếp so le chắn nắng xiên hướng Tây mà vẫn đón trọn làn gió mát từ sông rạch, tạo nên bóng đổ hoa văn tuyệt mỹ khi chiều buông.',
    bgAccent: 'from-emerald-800/25 to-teal-950/10',
  },
}

export function SaigonHeritageAncientBrickCourtyardPavilion({ className }: { className?: string }) {
  const formId = useId()
  const [selectedEra, setSelectedEra] = useState<BrickEra>('era-1880')
  const [isPlayingRain, setIsPlayingRain] = useState(false)
  const [consultSuccess, setConsultSuccess] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const rainIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (rainIntervalRef.current) clearInterval(rainIntervalRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }

  // Simulate rain trickling from copper gutter onto river pebbles
  function playCopperEavesDrop() {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // 1. Metallic copper lip ting (higher harmonic 2800Hz)
    const copperOsc = ctx.createOscillator()
    const copperGain = ctx.createGain()
    copperOsc.type = 'triangle'
    copperOsc.frequency.setValueAtTime(2600 + Math.random() * 400, now)

    copperGain.gain.setValueAtTime(0.0001, now)
    copperGain.gain.linearRampToValueAtTime(0.06, now + 0.002)
    copperGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    copperOsc.connect(copperGain)
    copperGain.connect(ctx.destination)
    copperOsc.start(now)
    copperOsc.stop(now + 0.15)

    // 2. Soft wet pebble splash (noise burst with bandpass filter)
    const splashOsc = ctx.createOscillator()
    const splashGain = ctx.createGain()
    splashOsc.type = 'sine'
    const splashFreq = 450 + Math.random() * 300
    splashOsc.frequency.setValueAtTime(splashFreq, now)
    splashOsc.frequency.exponentialRampToValueAtTime(splashFreq * 0.7, now + 0.1)

    splashGain.gain.setValueAtTime(0.0001, now)
    splashGain.gain.linearRampToValueAtTime(0.18, now + 0.005)
    splashGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25)

    splashOsc.connect(splashGain)
    splashGain.connect(ctx.destination)
    splashOsc.start(now)
    splashOsc.stop(now + 0.3)
  }

  function toggleRainAmbience() {
    if (isPlayingRain) {
      if (rainIntervalRef.current) {
        clearInterval(rainIntervalRef.current)
        rainIntervalRef.current = null
      }
      setIsPlayingRain(false)
    } else {
      setIsPlayingRain(true)
      playCopperEavesDrop()
      rainIntervalRef.current = setInterval(() => {
        playCopperEavesDrop()
      }, 350 + Math.random() * 500)
    }
  }

  const currentBrick = BRICK_CATALOGUE[selectedEra]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Đình Trà Gạch Cổ Bến Nghé & Máng Đồng Patina GuHomes"
    >
      {/* Background Ambience Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-1000',
          currentBrick.bgAccent
        )}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-emerald-700/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/70 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 shadow-sm shadow-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
              Saigon Heritage Courtyard · Gạch Cổ Bến Nghé 1880 - 1920
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>Mạch Vôi Hàu Tự Nhiên</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Máng Xối Đồng Đỏ Patina</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Hạ Nhiệt -3.5°C Thụ Động</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl md:text-5xl">
              Đình Trà Gạch Cổ Bến Nghé
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Phục Dựng Gạch Cổ Trăm Năm, Vữa Vôi Hàu Thoát Ẩm & Máng Đồng Rỉ Ten Xanh
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Không gian trà đạo sân vườn kết tinh từ trầm tích kiến trúc Sài Gòn xưa. Toàn bộ nền đình và trụ cột
              được xếp từ gạch cổ thế kỷ 19 tháo dỡ từ những công trình Bến Nghé - Chợ Quán, kết dính bằng mạch vữa vôi hàu
              cát sông mịn thoát ẩm tự nhiên. Nước mưa từ mái ngói âm dương được thu gom qua máng đồng đỏ gò tay rỉ ten
              xanh tự nhiên, róc rách chảy xuống hồ sỏi suối nuôi cá koi bản địa.
            </p>
          </div>

          {/* Rain Sound Trigger */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-stone-800 bg-black/50 p-5 backdrop-blur-md lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Âm thanh giọt ranh mái đình
              </span>
              <h4 className="mt-1 font-serif text-sm text-stone-200">
                Mưa Rơi Máng Đồng Xuống Sỏi Suối
              </h4>
              <p className="mt-1 text-xs text-stone-400">
                Lắng nghe tiếng giọt mưa tí tách gõ vào máng đồng đỏ patina và rơi trên sỏi cuội tự nhiên.
              </p>
            </div>
            <button
              onClick={toggleRainAmbience}
              className={cn(
                'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all',
                isPlayingRain
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingRain ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-stone-950 animate-ping" />
                  Đang Róc Rách Tiếng Mưa... (Dừng)
                </>
              ) : (
                'Bật Tiếng Mưa Giọt Ranh Máng Đồng'
              )}
            </button>
          </div>
        </div>

        {/* Brick Selection Tabs & Texture Specs */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/60 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Di sản vật liệu đất nung phương Nam
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Ba Chất Cảm Gạch Cổ Bến Nghé - Chợ Quán
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(BRICK_CATALOGUE) as BrickEra[]).map((key) => {
                const item = BRICK_CATALOGUE[key]
                const isActive = selectedEra === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedEra(key)}
                    className={cn(
                      'min-h-[44px] rounded-lg px-3.5 py-2 text-xs font-medium transition-all',
                      isActive
                        ? 'bg-amber-600 text-stone-950 font-semibold shadow-xs'
                        : 'bg-stone-800/60 text-stone-300 hover:text-stone-100 hover:bg-stone-800'
                    )}
                  >
                    {item.name.split(' ')[1]} {item.name.split(' ')[2] || ''}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected Brick Details */}
          <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <span className="font-mono text-xs text-amber-400 block">{currentBrick.period}</span>
              <h4 className="mt-2 font-serif text-2xl text-stone-100">{currentBrick.name}</h4>
              <p className="mt-1 font-mono text-xs text-stone-400">{currentBrick.colorHue}</p>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">{currentBrick.description}</p>
              <div className="mt-4 rounded-xl border border-stone-800 bg-black/40 p-3">
                <span className="font-mono text-[11px] text-stone-400 block">Thành phần & quy cách chế tác:</span>
                <span className="text-xs text-amber-200/90 font-medium">{currentBrick.composition}</span>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-5">
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Khả Năng Hạ Nhiệt Vi Khí Hậu</span>
                <span className="mt-1 text-2xl font-light font-serif text-emerald-400">{currentBrick.coolingDelta}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Không dùng máy lạnh ngoài trời</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Độ Xốp Mao Dẫn Tự Nhiên</span>
                <span className="mt-1 text-2xl font-light font-serif text-amber-300">{currentBrick.porosity}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Không đọng nước trơn trượt</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Vận Tốc Gió Đối Lưu</span>
                <span className="mt-1 text-2xl font-light font-serif text-cyan-300">1.2 - 1.8 m/s</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Hút gió sông mát rượi</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Lớp Vữa Vôi Hàu Tự Nhiên</span>
                <span className="mt-1 text-2xl font-light font-serif text-stone-200">100% Không Xi Măng</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Thân thiện môi trường tuyệt đối</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Craft Traditions */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">I</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Gạch Cổ Phục Chế Tỉ Mỉ Từng Viên</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Gạch thu gom từ các công trình cổ được cạo sạch lớp vữa cũ bằng tay, ngâm nước khử muối khoáng
              và phơi gió tự nhiên 30 ngày trước khi được đưa vào lắp dựng đình trà.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">II</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Mạch Vữa Vôi Hàu Cát Mịn Nam Bộ</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Thay thế xi măng công nghiệp bằng hợp chất vôi hàu nung vỏ sò, mật mía và cát hạt thô.
              Mạch vữa dẻo dai thích ứng với sự co giãn nhiệt độ ngày đêm của khí hậu Sài Gòn, chống nứt toác.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">III</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Máng Đồng Xối Rỉ Ten Xanh Patina</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Tấm đồng đỏ 99% gò tay vuốt mép cuốn lá sen dẫn nước mưa mềm mại.
              Lớp patina oxit đồng tự nhiên sinh ra theo năm tháng bảo vệ kim loại không bao giờ rỉ thủng.
            </p>
          </div>
        </div>

        {/* Pavilion Consultation Form */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-gradient-to-r from-amber-950/30 via-stone-900 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Khởi tạo không gian trà đạo sân vườn
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Tư Vấn Kiến Tạo Đình Trà Gạch Cổ Cho Biệt Thự & Dinh Thự
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                KTS GuHomes lập quy hoạch sân vườn cảnh quan, hướng gió và hồ nước phong thủy hài hòa
                với lối sống thưởng trà thanh tịnh của gia đình gia chủ.
              </p>
            </div>

            <div className="lg:col-span-5">
              {consultSuccess ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-emerald-200">
                    Đã nhận yêu cầu tư vấn đình trà gạch cổ
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    KTS Trưởng chuyên trách cảnh quan GuHomes sẽ liên hệ gửi bản vẽ mẫu phối cảnh.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setConsultSuccess(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-pavilion`} className="sr-only">
                    Số điện thoại và diện tích sân vườn
                  </label>
                  <input
                    id={`${formId}-pavilion`}
                    type="text"
                    required
                    placeholder="Số điện thoại / Diện tích sân vườn..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký Tư Vấn Đình Trà</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
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
