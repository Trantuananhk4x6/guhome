'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type SilkType = 'lotus' | 'lanh-my-a' | 'van-phuc' | 'nam-cao'

interface SilkFabric {
  id: SilkType
  name: string
  origin: string
  rarity: string
  tactileFeel: string
  craftDescription: string
  colorHex: string
  accentBorder: string
  lightReflection: string
}

const SILK_FABRICS: Record<SilkType, SilkFabric> = {
  lotus: {
    id: 'lotus',
    name: 'Tơ Sen Đồng Tháp Mười (Lotus Silk)',
    origin: 'Huyện Tháp Mười, Đồng Tháp',
    rarity: 'Cực Hiếm • 15.000 cuống sen cho 1 mét vải',
    tactileFeel: 'Mát lành tinh khiết, nhẹ bẫng tựa làn mây, thoảng hương sen non dịu ngọt.',
    craftDescription: 'Nghệ nhân khéo léo dùng dao khứa quanh cuống sen vừa hái sớm, kéo từng sợi tơ mảnh se lại trên bàn tay ướt. Sợi tơ sen có cấu trúc rỗng thở tự nhiên, điều hòa thân nhiệt hoàn hảo trong vi khí hậu nhiệt đới Sài Gòn.',
    colorHex: 'bg-amber-100/90 text-stone-900',
    accentBorder: 'border-amber-300',
    lightReflection: 'from-amber-100/80 via-amber-200/40 to-stone-900',
  },
  'lanh-my-a': {
    id: 'lanh-my-a',
    name: 'Lãnh Mỹ A Mặc Nưa (Black Queen of Silk)',
    origin: 'Thị xã Tân Châu, An Giang',
    rarity: 'Bảo Vật Quốc Gia • Nhuộm mủ mặc nưa 100 lần',
    tactileFeel: 'Đanh chắc khi mới sờ, càng mặc càng mềm mượt, óng ả như da thú ngâm nước.',
    craftDescription: 'Dệt từ 100% sợi tơ tằm hảo hạng rồi nhúng vào nước mủ trái mặc nưa giã nhuyễn, phơi nắng rực rỡ và nện búa gỗ hàng ngàn lần. Mặt vải màu đen tuyền huyền bí, có khả năng chống thấm nước nhẹ và kháng khuẩn tuyệt đối.',
    colorHex: 'bg-stone-900 text-stone-100',
    accentBorder: 'border-stone-600',
    lightReflection: 'from-stone-800 via-stone-900 to-black',
  },
  'van-phuc': {
    id: 'van-phuc',
    name: 'Tơ Tằm Tự Nhiên Vạn Phúc (Ha Dong Silk)',
    origin: 'Làng lụa Vạn Phúc, Hà Đông (1.000 năm tuổi)',
    rarity: 'Thủ Công Cao Cấp • Họa tiết Vân & Song Hạc',
    tactileFeel: 'Mịn màng trơn láng, ấm áp khi gió mùa về và thông thoáng khi độ ẩm cao.',
    craftDescription: 'Lựa chọn từ những kén tằm vàng óng ả nhất mùa thu. Khung cửi gỗ dệt nên những hoa văn chìm tinh tế, phản chiếu ánh sáng hổ phách dưới hệ đèn rọi sợi 5000K CRI 99.',
    colorHex: 'bg-amber-200/70 text-stone-900',
    accentBorder: 'border-amber-400',
    lightReflection: 'from-amber-200/70 via-stone-200 to-stone-900',
  },
  'nam-cao': {
    id: 'nam-cao',
    name: 'Đũi Thô Tự Nhiên Nam Cao (Wabi-Sabi Tussah)',
    origin: 'Làng đũi Nam Cao, Kiến Xương, Thái Bình',
    rarity: 'Độc Bản Tự Nhiên • Sợi thô se tay 100%',
    tactileFeel: 'Gồ ghề xúc giác, mộc mạc nguyên sơ, càng giặt càng xốp mềm.',
    craftDescription: 'Dệt từ phần vỏ ngoài kén tằm không qua tẩy trắng công nghiệp. Những nốt sần tự nhiên trên bề mặt mang lại vẻ đẹp thô mộc sâu lắng, lý tưởng cho các bộ sofa bọc vải phong cách Wabi-Sabi và Zen Yên Tử.',
    colorHex: 'bg-stone-200 text-stone-900',
    accentBorder: 'border-stone-400',
    lightReflection: 'from-stone-300 via-stone-400 to-stone-900',
  },
}

export function SaigonArtisanBespokeLoomSilkPavilion({ className }: { className?: string }) {
  const componentId = useId()

  const [activeSilk, setActiveSilk] = useState<SilkType>('lotus')
  const [shuttlePosition, setShuttlePosition] = useState<number>(0)
  const [isWeavingActive, setIsWeavingActive] = useState<boolean>(false)
  const [targetUsage, setTargetUsage] = useState<'sofa' | 'drapery' | 'wallpanel'>('sofa')
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false)

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const weavingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentSilk = SILK_FABRICS[activeSilk]

  const stopWeaving = () => {
    if (weavingIntervalRef.current) {
      clearInterval(weavingIntervalRef.current)
      weavingIntervalRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close()
      } catch {
        // Ignore
      }
      audioCtxRef.current = null
    }
    setIsWeavingActive(false)
  }

  // Realistic wooden loom click sound synthesis (wood on wood tap + thread tension swish)
  const playLoomClick = (direction: 'left' | 'right') => {
    if (!audioCtxRef.current) return
    const ctx = audioCtxRef.current

    // Wooden shuttle tap (short resonant bandpass pulse)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(direction === 'left' ? 420 : 460, ctx.currentTime)

    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(direction === 'left' ? 880 : 960, ctx.currentTime)
    filter.Q.setValueAtTime(3.0, ctx.currentTime)

    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.09)
  }

  const toggleWeaving = () => {
    if (isWeavingActive) {
      stopWeaving()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx
      setIsWeavingActive(true)

      let pos = 0
      let dir: 'left' | 'right' = 'right'

      weavingIntervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return
        pos = dir === 'right' ? 100 : 0
        setShuttlePosition(pos)
        playLoomClick(dir)
        dir = dir === 'right' ? 'left' : 'right'
      }, 700)
    } catch {
      setIsWeavingActive(false)
    }
  }

  useEffect(() => {
    return () => {
      stopWeaving()
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
              Haute Soierie Artisanale • Bespoke Silk Loom Atelier
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Xưởng Khung Dệt Lụa Tơ Sen Thủ Công &amp; Lãnh Mỹ A Mặc Nưa Tân Châu
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Không gian lưu giữ và tái hiện kỹ nghệ dệt sợi truyền thống Việt Nam. Khung cửi may đo gỗ Gõ Đỏ nguyên khối đánh bóng sáp ong tự nhiên, nơi dệt những thước vải bọc nội thất và rèm cửa quý giá từ tơ sen Đồng Tháp Mười, lụa Lãnh Mỹ A nhuộm mủ mặc nưa, tơ tằm Vạn Phúc và đũi thô Nam Cao.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Dự Toán Vải Dệt May Đo
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Loom Simulation & Silk Swatches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Wooden Loom Simulation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 bg-stone-900/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Khung Cửi Gõ Đỏ</span>
                    <span className="text-xs font-mono font-medium text-amber-400">Rộng 1.8m • Gõ Đỏ Sáp Ong</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Nguồn Sợi</span>
                    <span className="text-xs font-mono text-stone-200">{currentSilk.name.split('(')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-block w-2.5 h-2.5 rounded-full',
                      isWeavingActive ? 'bg-amber-400 animate-ping' : 'bg-stone-600'
                    )}
                  />
                  <span className="text-[11px] font-mono text-amber-300">
                    {isWeavingActive ? 'Con Thoi Đang Lướt' : 'Khung Tĩnh'}
                  </span>
                </div>
              </div>

              {/* Center Loom Visualization */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                {/* Loom Warp Threads Background */}
                <div className="relative w-full max-w-lg h-44 border-y-2 border-stone-700 bg-stone-950/80 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Dense vertical warp threads */}
                  <div className="absolute inset-0 flex justify-between px-3 pointer-events-none opacity-40">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'w-px h-full',
                          i % 4 === 0 ? 'bg-amber-400' : 'bg-stone-500'
                        )}
                      />
                    ))}
                  </div>

                  {/* Horizontal woven fabric preview section */}
                  <div
                    className={cn(
                      'absolute left-0 right-0 top-1/4 bottom-1/4 transition-colors duration-700 opacity-80 border-y border-amber-500/40 bg-gradient-to-r',
                      currentSilk.lightReflection
                    )}
                  />

                  {/* Animated Flying Wooden Shuttle */}
                  <div
                    style={{
                      left: `${Math.max(4, Math.min(92, shuttlePosition))}%`,
                    }}
                    className="relative z-10 w-16 h-6 rounded-full bg-amber-800 border-2 border-amber-500 shadow-xl flex items-center justify-center transition-all duration-700"
                  >
                    <div className="w-10 h-1.5 bg-amber-200 rounded-full animate-pulse" />
                  </div>

                  {/* Reed Beater Bar */}
                  <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-stone-400 pt-2 border-t border-stone-800">
                    <span>Lược Dệt Khổ 1.8m • Mật Độ 120 Sợi/cm</span>
                    <span className="text-amber-400 font-mono">Chiếu Sáng 5000K CRI 99</span>
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar inside Loom Stage */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">{currentSilk.rarity}</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentSilk.name}</h3>
                    <p className="text-xs text-stone-400">{currentSilk.origin}</p>
                  </div>

                  <button
                    type="button"
                    onClick={toggleWeaving}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all min-h-[44px]',
                      isWeavingActive
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                        : 'border border-amber-500/50 text-amber-300 hover:bg-amber-500/10'
                    )}
                  >
                    {isWeavingActive ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        Dừng Dệt Lụa
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Chạy Thoi Dệt Thử
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-stone-300 font-light italic border-t border-stone-800/60 pt-2">
                  &ldquo;{currentSilk.tactileFeel}&rdquo;
                </p>
              </div>
            </div>

            {/* Silk Fabric Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.values(SILK_FABRICS).map((silk) => {
                const isActive = silk.id === activeSilk
                return (
                  <button
                    key={silk.id}
                    type="button"
                    onClick={() => setActiveSilk(silk.id)}
                    className={cn(
                      'p-3 border text-left transition-all min-h-[44px]',
                      isActive
                        ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[11px] font-mono text-amber-400 uppercase truncate">{silk.origin.split(',')[0]}</div>
                    <div className="text-xs font-medium text-stone-200 truncate mt-0.5">{silk.name.split('(')[0]}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Silk Swatch Details & Custom Bespoke Weaving Request */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  Đặc Trưng Kỹ Nghệ: {currentSilk.name.split('(')[0]}
                </span>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {currentSilk.craftDescription}
                </p>
              </div>

              {/* Application Selector */}
              <div className="space-y-3 pt-4 border-t border-stone-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                  1. Mục Đích Ứng Dụng Trong Không Gian
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sofa', name: 'Bọc Sofa & Ghế Bành', spec: 'Độ bền cọ xát 45.000 Martindale' },
                    { id: 'drapery', name: 'Rèm Cửa 2 Lớp', spec: 'Cản sáng mềm, rủ sóng tự nhiên' },
                    { id: 'wallpanel', name: 'Vách Ốp Tiêu Âm', spec: 'Bọc tấm sợi bông khoáng tiêu âm' },
                  ].map((item) => {
                    const isSelected = targetUsage === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTargetUsage(item.id as typeof targetUsage)}
                        className={cn(
                          'p-2.5 border text-left transition-all min-h-[44px]',
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                            : 'border-stone-800 hover:border-stone-700 bg-stone-950/40 text-stone-400'
                        )}
                      >
                        <div className="text-[11px] font-medium text-stone-200">{item.name}</div>
                        <div className="text-[9px] text-stone-500 mt-1">{item.spec}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Bespoke Specs */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  Quy Chuẩn May Đo &amp; Khổ Vải
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 border border-stone-800 bg-stone-950/50">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">Khổ Dệt Tiêu Chuẩn</span>
                    <span className="text-sm font-mono text-amber-300 font-medium">1.4m - 1.8m</span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Không can ghép đường may</span>
                  </div>

                  <div className="p-3 border border-stone-800 bg-stone-950/50">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">Thời Gian Hoàn Tất</span>
                    <span className="text-sm font-mono text-amber-300 font-medium">45 - 90 Ngày</span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Dệt tay theo cuộn độc bản</span>
                  </div>
                </div>
              </div>

              {/* Order Sample Button */}
              <div className="pt-4 border-t border-stone-800">
                {isOrderSubmitted ? (
                  <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Đã gửi yêu cầu gửi bộ Swatch mẫu vải {currentSilk.name.split('(')[0]}. KTS GuHomes sẽ liên hệ mang mẫu vải thật đến tư vấn tại công trình.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsOrderSubmitted(true)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px]"
                  >
                    Đăng Ký Nhận Hộp Swatch Mẫu Vải Thật
                  </button>
                )}
              </div>
            </div>

            {/* Studio Workshop Link */}
            <div className="p-5 border border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Trải Nghiệm Khung Cửi Tại Xưởng Q.12
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Mời bạn ghé xưởng mộc 1.200m² ngắm nhìn nghệ nhân dệt lụa và cảm nhận thớ vải thực tế.
                </p>
              </div>
              <Link
                href="/studio"
                className="whitespace-nowrap px-4 py-2 border border-stone-700 text-stone-300 hover:border-amber-400 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Thăm Xưởng Dệt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
