'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type SilverMotif = 'dragon-clouds' | 'phoenix-peony' | 'lotus-pond'

interface TeapotMotif {
  id: SilverMotif
  name: string
  silverPurity: string
  chasingHours: number
  weightGrams: number
  charcoalSource: string
  description: string
  tactileDetail: string
}

const MOTIFS: Record<SilverMotif, TeapotMotif> = {
  'dragon-clouds': {
    id: 'dragon-clouds',
    name: 'Long Vân Triều Nguyệt (Rồng Vờn Mây)',
    silverPurity: 'Bạc ta 99.99% dát gò liền khối không hàn chì',
    chasingHours: 180,
    weightGrams: 580,
    charcoalSource: 'Than trúc Bát Tràng hoạt tính khử mùi tuyệt đối',
    description: 'Nghệ nhân Đồng Xâm dùng ve đục tay chạm nổi hàng ngàn vảy rồng sống động; mắt rồng điểm xuyết đá mã não đỏ; thân ấm tròn trịa tụ khí sinh tài.',
    tactileDetail: 'Độ nổi 2.5mm nổi khối 3D rõ nét, cảm giác mát lạnh dịu khi chạm tay vào thân ấm.',
  },
  'phoenix-peony': {
    id: 'phoenix-peony',
    name: 'Phụng Hoàng Mẫu Đơn Cát Tường',
    silverPurity: 'Bạc ta 99.99% dát búa nguội gia truyền',
    chasingHours: 160,
    weightGrams: 520,
    charcoalSource: 'Than vỏ gáo dừa Bến Tre ủ tro kín',
    description: 'Cặp phụng hoàng uốn lượn bên đóa mẫu đơn khai hoa phú quý. Đường nét chạm lộng chạm thúc mềm mại như dải lụa bay trong gió sớm.',
    tactileDetail: 'Vân lông vũ li ti mịn mượt, quai ấm bọc mây rừng cổ thụ êm ái cách nhiệt hoàn toàn.',
  },
  'lotus-pond': {
    id: 'lotus-pond',
    name: 'Liên Trì Tịnh Độ (Hoa Sen Đồng Tháp)',
    silverPurity: 'Bạc ta 99.99% tráng gương nội lòng ấm',
    chasingHours: 140,
    weightGrams: 490,
    charcoalSource: 'Than củi nhãn Hưng Yên cháy đượm',
    description: 'Hoa sen nở thanh tịnh giữa hồ nước phẳng lặng, nắp ấm nụ sen búp duyên dáng làm tay nắm, lỗ lọc tổ ong 108 lỗ rót dòng trà chảy thẳng không ngắt giọt.',
    tactileDetail: 'Cánh sen chạm vát gợn nhẹ, độ bóng mờ satin chống bám vân tay tinh tế.',
  },
}

export function ArtisanImperialSilverChasedTeapotAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedMotif, setSelectedMotif] = useState<SilverMotif>('dragon-clouds')
  const [zoomLevel, setZoomLevel] = useState<number>(1) // 1x, 4x, 8x, 16x
  const [waterTemp, setWaterTemp] = useState<number>(88) // 75C - 98C
  const [steepVolume, setSteepVolume] = useState<number>(350) // ml
  const [isPlayingBoil, setIsPlayingBoil] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const boilIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (boilIntervalRef.current) clearInterval(boilIntervalRef.current)
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

  // Synthesize soft crab-eyes water boil & delicate pure silver bell chime
  function playCrabEyesBoil() {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // 1. Silver chime ding (super pure high pitch 3800Hz)
    const silverOsc = ctx.createOscillator()
    const silverGain = ctx.createGain()
    silverOsc.type = 'sine'
    silverOsc.frequency.setValueAtTime(3600, now)

    silverGain.gain.setValueAtTime(0.0001, now)
    silverGain.gain.linearRampToValueAtTime(0.08, now + 0.003)
    silverGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)

    silverOsc.connect(silverGain)
    silverGain.connect(ctx.destination)
    silverOsc.start(now)
    silverOsc.stop(now + 0.7)

    // 2. Soft bubbling water simmer
    const bubbleOsc = ctx.createOscillator()
    const bubbleGain = ctx.createGain()
    bubbleOsc.type = 'triangle'
    const bubbleFreq = 280 + Math.random() * 120
    bubbleOsc.frequency.setValueAtTime(bubbleFreq, now)
    bubbleOsc.frequency.linearRampToValueAtTime(bubbleFreq + 80, now + 0.05)

    bubbleGain.gain.setValueAtTime(0.0001, now)
    bubbleGain.gain.linearRampToValueAtTime(0.12, now + 0.01)
    bubbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)

    bubbleOsc.connect(bubbleGain)
    bubbleGain.connect(ctx.destination)
    bubbleOsc.start(now)
    bubbleOsc.stop(now + 0.22)
  }

  function toggleBoilSound() {
    if (isPlayingBoil) {
      if (boilIntervalRef.current) {
        clearInterval(boilIntervalRef.current)
        boilIntervalRef.current = null
      }
      setIsPlayingBoil(false)
    } else {
      setIsPlayingBoil(true)
      playCrabEyesBoil()
      boilIntervalRef.current = setInterval(() => {
        playCrabEyesBoil()
      }, 400 + Math.random() * 300)
    }
  }

  // Calculate micro Ag+ ion concentration (ppb) and water softness benefits
  const agIonConcentration = ((waterTemp - 70) * 0.45 + (steepVolume / 350) * 8).toFixed(1)
  const waterAlkalinityPh = (7.2 + (waterTemp - 75) * 0.012).toFixed(2)

  const activeMotif = MOTIFS[selectedMotif]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Xưởng Ấm Trà Bạc Chạm Lộng Đồng Xâm & Bếp Than Trúc GuHomes"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-stone-800/20 via-neutral-950 to-amber-950/20 opacity-70" />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-slate-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-slate-200 shadow-sm shadow-slate-100">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-slate-300 uppercase">
              Imperial Tea Atelier · GU-TEAPOT-2026-X
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>Bạc Ta 99.99% Gò Liền Khối</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Chạm Lộng Đồng Xâm</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Bếp Than Trúc Bát Tràng</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl md:text-5xl">
              Ấm Trà Bạc Chạm Lộng Đồng Xâm
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Bạc Ta 9999 Dát Búa Nguội, Quai Mây Rừng & Bếp Than Trúc Sôi Tăm Mắt Cua
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Nghệ thuật trà đạo cung đình đỉnh cao giao hòa cùng bàn tay vàng của các nghệ nhân kim hoàn làng Đồng Xâm.
              Từng chiếc ấm được gò tay liền khối từ thỏi bạc ta tinh khiết 99.99%, hoàn toàn không dùng mối hàn chì hay
              kim loại lạ. Nước đun trong ấm bạc giải phóng ion Ag+ vi lượng khử khuẩn và làm mềm nước, giúp từng búp trà
              cổ thụ bung tỏa hương hoa tự nhiên ngọt hậu không một gợn chát gắt.
            </p>
          </div>

          {/* Water Simmer Sound Trigger */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-stone-800 bg-neutral-900/60 p-5 backdrop-blur-md lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Thưởng thức tiếng sôi tăm
              </span>
              <h4 className="mt-1 font-serif text-sm text-stone-200">
                Nước Sôi Tăm Mắt Cua & Keng Bạc
              </h4>
              <p className="mt-1 text-xs text-stone-400">
                Lắng nghe tiếng nước sôi êm dịu trên bếp than trúc và âm thanh trong vắt khi nắp bạc đậy khẽ.
              </p>
            </div>
            <button
              onClick={toggleBoilSound}
              className={cn(
                'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all',
                isPlayingBoil
                  ? 'bg-slate-200 text-stone-950 shadow-md shadow-slate-100/20'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingBoil ? 'Đang Lăn Tăn Nước Sôi... (Dừng)' : 'Nghe Tiếng Nước Sôi Ấm Bạc'}
            </button>
          </div>
        </div>

        {/* 16x Magnifier Inspection & Motif Selection */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/70 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Kiểm định kỹ nghệ kim hoàn hoàng gia
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Bộ Ba Hoa Văn Chạm Lộng Cổ Điển
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(MOTIFS) as SilverMotif[]).map((key) => {
                const item = MOTIFS[key]
                const isActive = selectedMotif === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedMotif(key)}
                    className={cn(
                      'min-h-[44px] rounded-lg px-3.5 py-2 text-xs font-medium transition-all',
                      isActive
                        ? 'bg-slate-200 text-stone-950 font-bold shadow-xs'
                        : 'bg-stone-800/70 text-stone-300 hover:text-stone-100 hover:bg-stone-800'
                    )}
                  >
                    {item.name.split('(')[0]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive Magnifier View */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-black/60 p-8 text-center overflow-hidden">
                {/* Visual Silver Teapot Model */}
                <div
                  className="relative flex h-52 w-full max-w-sm items-center justify-center transition-transform duration-500"
                  style={{ transform: `scale(${1 + (zoomLevel - 1) * 0.08})` }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Woven Rattan Handle */}
                    <div className="absolute -top-12 h-14 w-28 rounded-t-full border-4 border-amber-800/80 bg-transparent flex justify-center">
                      <span className="font-mono text-[8px] text-amber-400 -mt-2 bg-stone-950 px-1 rounded-sm">
                        MÂY RỪNG CÁCH NHIỆT
                      </span>
                    </div>

                    {/* Teapot Body (Chased Silver Sphere) */}
                    <div className="relative h-36 w-44 rounded-full border-2 border-slate-300 bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-300 shadow-2xl flex flex-col items-center justify-center p-3 overflow-hidden">
                      {/* Chased texture overlay */}
                      <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-600 via-stone-400 to-stone-900 pointer-events-none" />
                      <div className="z-10 text-center">
                        <span className="font-serif text-[11px] font-medium text-stone-900 tracking-wider">
                          ĐỒNG XÂM 9999
                        </span>
                        <p className="font-mono text-[9px] text-stone-800 mt-0.5">
                          {activeMotif.weightGrams}g BẠC TA
                        </p>
                      </div>
                      <div className="absolute bottom-2 font-mono text-[8px] text-stone-700 uppercase">
                        {zoomLevel}X KÍNH SOI
                      </div>
                    </div>

                    {/* Spout */}
                    <div className="absolute -right-7 top-10 h-10 w-10 rounded-tr-3xl border-t-4 border-r-4 border-slate-300 transform -rotate-12" />
                  </div>
                </div>

                {/* Zoom Level Switcher */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-stone-400 mr-2">Kính soi kim hoàn:</span>
                  {[1, 4, 8, 16].map((zoom) => (
                    <button
                      key={zoom}
                      onClick={() => setZoomLevel(zoom)}
                      className={cn(
                        'min-h-[36px] rounded-md px-3 text-xs font-mono transition-colors',
                        zoomLevel === zoom
                          ? 'bg-slate-200 text-stone-950 font-bold'
                          : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      {zoom}X
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Motif Specs */}
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Quy chuẩn chế tác kim hoàn
              </span>
              <h4 className="mt-2 font-serif text-2xl text-stone-100">{activeMotif.name}</h4>
              <p className="mt-3 text-xs leading-relaxed text-stone-300">{activeMotif.description}</p>

              <div className="mt-5 space-y-2.5 rounded-xl border border-stone-800 bg-black/40 p-4">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Độ tinh khiết phôi bạc:</span>
                  <span className="font-mono font-medium text-slate-200">{activeMotif.silverPurity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Thời gian ve đục tay:</span>
                  <span className="font-mono font-medium text-amber-300">{activeMotif.chasingHours} Giờ Công Phù Sa</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Trọng lượng bạc nguyên khối:</span>
                  <span className="font-mono font-medium text-slate-200">{activeMotif.weightGrams} Gram</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Chất đốt bếp than gốm:</span>
                  <span className="text-stone-300 text-right max-w-[200px]">{activeMotif.charcoalSource}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ag+ Water Softness & Alkalinity Calculator */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/60 p-6 md:p-8">
          <div className="border-b border-stone-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              Hóa học vi lượng pha trà
            </span>
            <h3 className="font-serif text-xl text-stone-100">
              Máy Tính Ion Bạc Ag+ & Độ Mềm Ngọt Của Nước Trà
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Kiểm tra nồng độ ion bạc tự nhiên giải phóng theo nhiệt độ và thể tích nước pha.
            </p>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300">Nhiệt độ nước đun sôi:</span>
                  <span className="text-amber-400 font-semibold">{waterTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="98"
                  step="1"
                  value={waterTemp}
                  onChange={(e) => setWaterTemp(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>75°C (Trà xanh dịu)</span>
                  <span>88°C (Shan Tuyết Cổ Thụ)</span>
                  <span>98°C (Phổ Nhĩ lâu năm)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300">Thể tích ấm nước:</span>
                  <span className="text-amber-400 font-semibold">{steepVolume} ml</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="600"
                  step="25"
                  value={steepVolume}
                  onChange={(e) => setSteepVolume(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>200ml (Độc ẩm)</span>
                  <span>350ml (Đối ẩm song đàm)</span>
                  <span>600ml (Quần ẩm trà hữu)</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Nồng Độ Ion Bạc Ag+ Tự Nhiên</span>
                <span className="mt-1 text-2xl font-light font-serif text-slate-200">{agIonConcentration} ppb</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Kháng khuẩn 99.9% tự nhiên</span>
              </div>

              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Độ Kiềm Nhẹ Dịu Ngọt</span>
                <span className="mt-1 text-2xl font-light font-serif text-amber-300">pH {waterAlkalinityPh}</span>
                <span className="text-[10px] text-cyan-400 block mt-1">Triệt tiêu vị đắng chát gắt</span>
              </div>

              <div className="rounded-xl border border-stone-800 bg-black/50 p-4 sm:col-span-2">
                <span className="font-mono text-[11px] text-stone-400 block">Cảm Quan Hương Vị Nước Trà</span>
                <p className="mt-1 text-xs text-stone-300">
                  Nước qua ấm bạc có sức căng bề mặt thấp hơn nước thường 8%, nước trôi qua cổ họng êm mượt
                  như lụa và làm đọng lại dư vị ngọt thanh sâu trong vòm họng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Hallmark Inscription Form */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-gradient-to-r from-amber-950/40 via-stone-900 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Khắc triện gia bảo độc bản
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Đặt May Đo Ấm Bạc Khắc Tên Gia Chủ & Niên Hiệu
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Nghệ nhân GuHomes nhận khắc chữ Hán cổ, gia huy hoặc chữ ký số độc bản dưới đáy ấm bạc,
                tặng kèm khay trà gỗ Mun cẩn xà cừ và bếp than trúc Bát Tràng trọn bộ.
              </p>
            </div>

            <div className="lg:col-span-5">
              {orderSent ? (
                <div className="rounded-xl border border-slate-400/40 bg-slate-900/40 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-slate-200">
                    Đã ghi nhận yêu cầu đặt chế tác ấm bạc
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    Nghệ nhân trưởng kim hoàn GuHomes sẽ liên hệ để xác nhận bản thảo triện khắc.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-teapot-phone`} className="sr-only">
                    Số điện thoại gia chủ
                  </label>
                  <input
                    id={`${formId}-teapot-phone`}
                    type="text"
                    required
                    placeholder="Họ tên & Số điện thoại gia chủ..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký May Đo Ấm Bạc Gia Bảo</span>
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
