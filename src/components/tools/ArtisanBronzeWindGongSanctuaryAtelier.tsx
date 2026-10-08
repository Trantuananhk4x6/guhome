'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type GongDiameter = '60cm' | '80cm' | '100cm'

interface GongSpec {
  id: GongDiameter
  diameter: string
  weightKg: number
  sustainSeconds: number
  primaryTone: string
  recommendedSpace: string
  standDescription: string
}

const GONG_SPECS: Record<GongDiameter, GongSpec> = {
  '60cm': {
    id: '60cm',
    diameter: 'Ø60cm (Tiểu Chiêng)',
    weightKg: 18,
    sustainSeconds: 45,
    primaryTone: '432 Hz Chuẩn Xác (A4 = 432Hz)',
    recommendedSpace: 'Phòng thiền định gia đình, phòng trà đạo, master suite',
    standDescription: 'Giá treo gỗ Cẩm Lai nguyên khối cao 1.35m, dây xơ dừa bện tay 4 tao',
  },
  '80cm': {
    id: '80cm',
    diameter: 'Ø80cm (Trung Chiêng Đại Ngàn)',
    weightKg: 35,
    sustainSeconds: 70,
    primaryTone: '432 Hz Trầm Sâu & Bội Âm Đa Tầng',
    recommendedSpace: 'Phòng khách biệt thự, sảnh atrium thông tầng, thư viện gia đình',
    standDescription: 'Khung vòng cung gỗ Cẩm Lai vân hoa cao 1.65m gia cố mộng đồng thau',
  },
  '100cm': {
    id: '100cm',
    diameter: 'Ø100cm (Đại Chiêng Vũ Trụ)',
    weightKg: 62,
    sustainSeconds: 95,
    primaryTone: '432 Hz Siêu Trầm Rung Chuyển Không Gian',
    recommendedSpace: 'Đại sảnh dinh thự, khuôn viên sân trong, hồ cá Koi phong thủy',
    standDescription: 'Trụ Cẩm Lai đôi uốn lượn cao 1.95m, xích đồng đúc nguyên bản chịu lực 300kg',
  },
}

type GongMotif = 'dong-son' | 'tay-nguyen-sun' | 'zen-circle'

interface MotifDetail {
  id: GongMotif
  name: string
  symbolism: string
  craft: string
}

const MOTIFS: Record<GongMotif, MotifDetail> = {
  'dong-son': {
    id: 'dong-son',
    name: 'Họa Tiết Mặt Trời & Chim Lạc Đông Sơn',
    symbolism: 'Hội tụ vượng khí, ánh dương soi sáng tài lộc và sự trường thịnh của gia tộc.',
    craft: 'Chạm khắc chìm bằng đục thép tay trên mặt đồng đỏ mắt cua dày 8mm.',
  },
  'tay-nguyen-sun': {
    id: 'tay-nguyen-sun',
    name: 'Vòng Nhật Nguyệt Đại Ngàn Tây Nguyên',
    symbolism: 'Kết nối linh khí đất trời, thanh tẩy năng lượng tiêu cực, mang lại bình an.',
    craft: 'Gò nổi thủ công bằng búa đồng theo bí quyết nghệ nhân người Jrai.',
  },
  'zen-circle': {
    id: 'zen-circle',
    name: 'Vòng Tròn Zen Enso Vô Cực',
    symbolism: 'Sự viên mãn, buông bỏ vướng bận, tĩnh lặng tuyệt đối trong tâm trí.',
    craft: 'Bề mặt để mộc vết búa gõ nguyên bản, phớt lớp sáp ong bảo vệ bề mặt đồng.',
  },
}

export function ArtisanBronzeWindGongSanctuaryAtelier({ className }: { className?: string }) {
  const componentId = useId()

  const [activeSize, setActiveSize] = useState<GongDiameter>('80cm')
  const [activeMotif, setActiveMotif] = useState<GongMotif>('tay-nguyen-sun')
  const [isStriking, setIsStriking] = useState<boolean>(false)
  const [activeBrainwave, setActiveBrainwave] = useState<'theta' | 'alpha' | 'delta'>('theta')
  const [isConsultSubmitted, setIsConsultSubmitted] = useState<boolean>(false)

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const strikeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentSpec = GONG_SPECS[activeSize]
  const currentMotif = MOTIFS[activeMotif]

  // Play realistic 432 Hz healing bronze gong chime with multiple harmonics and long sustain
  const strikeGong = () => {
    try {
      setIsStriking(true)
      if (strikeTimerRef.current) clearTimeout(strikeTimerRef.current)

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = audioCtxRef.current || new AudioCtx()
      audioCtxRef.current = ctx

      const fundamentalFreq = 432 // Healing frequency A = 432Hz (subharmonic 216 / 108)

      // Harmonics of bronze bell/gong
      const harmonics = [
        { freq: fundamentalFreq * 0.5, gain: 0.2, decay: 7.0 }, // 216 Hz warm body
        { freq: fundamentalFreq, gain: 0.35, decay: 6.5 }, // 432 Hz fundamental
        { freq: fundamentalFreq * 1.52, gain: 0.18, decay: 5.0 }, // inharmonic 656 Hz
        { freq: fundamentalFreq * 2.01, gain: 0.12, decay: 4.0 }, // octave overtone 868 Hz
        { freq: fundamentalFreq * 2.76, gain: 0.08, decay: 3.0 }, // high shimmer
      ]

      harmonics.forEach(({ freq, gain: level, decay }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle pitch tremolo simulating metallic beating
        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.setValueAtTime(1.8, ctx.currentTime) // 1.8 Hz subtle gong pulsation
        lfoGain.gain.setValueAtTime(freq * 0.005, ctx.currentTime)
        lfo.connect(osc.frequency)
        lfo.start()

        // Soft deer-leather mallet strike envelope
        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(level, ctx.currentTime + 0.06) // soft mallet strike
        gain.gain.exponentialRampToValueAtTime(level * 0.6, ctx.currentTime + 1.2)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decay) // long sustain

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + decay)
      })

      strikeTimerRef.current = setTimeout(() => {
        setIsStriking(false)
      }, 5000)
    } catch {
      setIsStriking(false)
    }
  }

  useEffect(() => {
    return () => {
      if (strikeTimerRef.current) clearTimeout(strikeTimerRef.current)
      if (audioCtxRef.current) {
        try {
          void audioCtxRef.current.close()
        } catch {
          // Ignore
        }
      }
    }
  }, [])

  return (
    <section
      aria-labelledby={`heading-${componentId}`}
      className={cn('u-gutter py-16 md:py-24 transition-colors duration-700 bg-stone-950 text-stone-100', className)}
    >
      <div className="mx-auto max-w-[110rem] space-y-12">
        {/* Header Block */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-stone-800/80 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono tracking-wider uppercase text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Bio-Resonance Bronze Gong • 432 Hz Healing Soundscape
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Chiêng Đồng Năng Lượng 432Hz &amp; Giá Treo Gỗ Cẩm Lai Tây Nguyên
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Tác phẩm chiêng đồng đúc thủ công từ hợp kim đồng mắt cua và thiếc vàng theo bí truyền cổ xưa của đồng bào Tây Nguyên. Cân chỉnh âm học chuẩn tần số 432Hz kích hoạt trạng thái sóng não Theta (4-8 Hz) đưa tâm trí vào giấc ngủ sâu và thiền định. Giá treo may đo gỗ Cẩm Lai vân hoa kết hợp dây xơ dừa bện tay truyền đời.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=bronze-gong-432hz"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Thỉnh Chiêng Đồng Phong Thủy
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Interactive Gong Striker & Brainwave Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Gong Visual & Sound Strike */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 bg-stone-900/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Tần Số Chữa Lành</span>
                    <span className="text-sm font-mono font-medium text-amber-400">432.0 Hz Harmonic</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Ngân Vang</span>
                    <span className="text-xs font-mono text-emerald-400">{currentSpec.sustainSeconds}s Ngân Dài</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-block w-2.5 h-2.5 rounded-full',
                      isStriking ? 'bg-amber-400 animate-ping' : 'bg-stone-600'
                    )}
                  />
                  <span className="text-[11px] font-mono text-amber-300">
                    {isStriking ? 'Sóng Âm 432Hz Đang Rung' : 'Chiêng Tĩnh'}
                  </span>
                </div>
              </div>

              {/* Center Gong Visual Stage */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                {/* Wooden Cam Lai Stand Arch */}
                <div className="relative w-64 sm:w-80 h-44 sm:h-52 border-t-4 border-x-2 border-amber-800/70 rounded-t-full bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 shadow-2xl">
                  {/* Gong Body Disk */}
                  <div
                    onClick={strikeGong}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        strikeGong()
                      }
                    }}
                    className={cn(
                      'relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-amber-600/80 shadow-2xl cursor-pointer flex flex-col items-center justify-center transition-all duration-500 bg-gradient-to-tr from-amber-900 via-stone-800 to-amber-700',
                      isStriking ? 'scale-105 ring-8 ring-amber-400/20 shadow-amber-500/30' : 'hover:scale-102'
                    )}
                  >
                    {/* Concentric Hammer Marks Pattern */}
                    <div className="absolute inset-2 rounded-full border border-amber-500/30 pointer-events-none" />
                    <div className="absolute inset-5 rounded-full border border-amber-500/20 pointer-events-none" />
                    <div className="absolute inset-9 rounded-full border border-amber-500/30 pointer-events-none" />

                    {/* Central Boss (Núm chiêng gồ lên) */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/80 border-2 border-amber-300 shadow-inner flex items-center justify-center">
                      <span className="text-[9px] font-mono text-stone-950 font-bold">432Hz</span>
                    </div>

                    <span className="text-[9px] font-mono text-amber-200 mt-1 uppercase tracking-widest">
                      {activeSize}
                    </span>
                  </div>

                  {/* Sound Wave Ripple Effect when struck */}
                  {isStriking && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 rounded-full border border-amber-400/30 animate-ping" />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Info Bar inside Stage */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">Tác Phẩm Chiêng Đồng</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentSpec.diameter} • {currentMotif.name}</h3>
                    <p className="text-xs text-stone-400">{currentSpec.standDescription}</p>
                  </div>

                  <button
                    type="button"
                    onClick={strikeGong}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold transition-all min-h-[44px]"
                  >
                    <span>🔔</span>
                    Gõ Thử Chiêng Bằng Dùi Da Hươu
                  </button>
                </div>
                <p className="text-xs text-stone-300 font-light italic border-t border-stone-800/60 pt-2">
                  &ldquo;{currentMotif.symbolism}&rdquo;
                </p>
              </div>
            </div>

            {/* Size & Motif Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.values(GONG_SPECS).map((spec) => {
                const isActive = spec.id === activeSize
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setActiveSize(spec.id)}
                    className={cn(
                      'p-3.5 border text-left transition-all min-h-[44px]',
                      isActive
                        ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[11px] font-mono text-amber-400">{spec.diameter}</div>
                    <div className="text-xs font-medium text-stone-200 mt-0.5">{spec.weightKg} kg Đồng Mắt Cua</div>
                    <div className="text-[10px] text-stone-500 mt-1">Ngân vang {spec.sustainSeconds}s</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Brainwave Resonance Analysis & Custom Specification */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
              {/* Brainwave Resonance Selector */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  Tác Động Sinh Học Sóng Não Khi Thưởng Âm 432Hz
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'theta', name: 'Sóng Theta (4-8 Hz)', desc: 'Thiền sâu, tái tạo tế bào & mở rộng trực giác' },
                    { id: 'alpha', name: 'Sóng Alpha (8-12 Hz)', desc: 'Thư giãn tĩnh tại, giảm cortisol gây stress' },
                    { id: 'delta', name: 'Sóng Delta (0.5-4 Hz)', desc: 'Giấc ngủ sâu không mộng mị, phục hồi sinh lực' },
                  ].map((wave) => {
                    const isSelected = activeBrainwave === wave.id
                    return (
                      <button
                        key={wave.id}
                        type="button"
                        onClick={() => setActiveBrainwave(wave.id as typeof activeBrainwave)}
                        className={cn(
                          'p-2.5 border text-left transition-all min-h-[44px]',
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                            : 'border-stone-800 hover:border-stone-700 bg-stone-950/40 text-stone-400'
                        )}
                      >
                        <div className="text-[11px] font-medium text-stone-200">{wave.name}</div>
                        <div className="text-[9px] text-stone-500 mt-1">{wave.desc}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Motif Selection */}
              <div className="space-y-3 pt-4 border-t border-stone-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                  Hoa Văn Phong Thủy Chạm Khắc
                </span>
                <div className="space-y-2">
                  {Object.values(MOTIFS).map((motif) => {
                    const isSelected = motif.id === activeMotif
                    return (
                      <button
                        key={motif.id}
                        type="button"
                        onClick={() => setActiveMotif(motif.id)}
                        className={cn(
                          'w-full text-left p-3 border transition-all min-h-[44px]',
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10'
                            : 'border-stone-800 hover:border-stone-700 bg-stone-950/40'
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-stone-100">{motif.name}</span>
                          <span className="text-[10px] font-mono text-amber-400">Độc Bản</span>
                        </div>
                        <p className="text-[11px] text-stone-400 font-light mt-1">{motif.craft}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Consultation Booking */}
              <div className="pt-4 border-t border-stone-800">
                {isConsultSubmitted ? (
                  <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Đã ghi nhận yêu cầu thỉnh chiêng {currentSpec.diameter} hoa văn {currentMotif.name}. Nghệ nhân đúc đồng Tây Nguyên sẽ liên hệ gửi video nghe thử âm thanh chiêng thực tế.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsConsultSubmitted(true)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px]"
                  >
                    Đăng Ký Thỉnh Chiêng &amp; Xem Mẫu Tại Showroom
                  </button>
                )}
              </div>
            </div>

            {/* Living Space Link */}
            <div className="p-5 border border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Bố Trí Chiêng Trong Không Gian Sống
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Định vị hướng đặt chiêng hợp phong thủy và chuẩn tiêu âm tránh cộng hưởng dội.
                </p>
              </div>
              <Link
                href="/du-toan-chi-phi"
                className="whitespace-nowrap px-4 py-2 border border-stone-700 text-stone-300 hover:border-amber-400 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Dự Toán Trưng Bày
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
