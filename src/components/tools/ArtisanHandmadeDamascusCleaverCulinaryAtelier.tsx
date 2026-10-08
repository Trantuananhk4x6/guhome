'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type CleaverFinish = 'dragon-twist' | 'rain-drop' | 'feather-wave'

interface CleaverPattern {
  id: CleaverFinish
  name: string
  layers: number
  steelCore: string
  etchingAcid: string
  description: string
  tactileFeel: string
}

const PATTERNS: Record<CleaverFinish, CleaverPattern> = {
  'dragon-twist': {
    id: 'dragon-twist',
    name: 'Vân Thép Damascus Long Cuộn (Dragon Twist)',
    layers: 256,
    steelCore: 'Lõi thép VG-10 tôi chân không 61 HRC',
    etchingAcid: 'Axit cà phê lên men & chanh rừng Tây Bắc',
    description: 'Từng dải thép rèn xoắn ngược chiều đan xen tạo hiệu ứng sóng cuộn như rồng uốn lượn, chống bám dính thực phẩm khi chặt.',
    tactileFeel: 'Gợn vân tế vi khi miết ngón tay, sống dao vát bo tròn êm ái',
  },
  'rain-drop': {
    id: 'rain-drop',
    name: 'Vân Mưa Rào Mùa Hạ (Raindrop Pattern)',
    layers: 192,
    steelCore: 'Thép gió không rỉ Bohler M390 62 HRC',
    etchingAcid: 'Axit hữu cơ táo mèo tự nhiên',
    description: 'Hàng ngàn vết lõm tròn đồng tâm tượng trưng cho giọt mưa nhiệt đới rơi trên mặt nước hồ, độ đàn hồi dẻo dai chống mẻ vi thể.',
    tactileFeel: 'Mịn màng như lụa, độ bóng sâu tương phản đen bạc',
  },
  'feather-wave': {
    id: 'feather-wave',
    name: 'Vân Lông Vũ Khổng Tước (Feather Wave)',
    layers: 320,
    steelCore: 'Hợp kim thép carbon cao cấp 1095 & 15N20',
    etchingAcid: 'Ủ dịch trà cổ thụ Shan Tuyết nồng độ cao',
    description: 'Đường vân tẽ nhánh mềm mại như lông cánh đại bàng, tôi luyện qua 18 lần trui rèn đập búa tay trong lò than củi dẻo.',
    tactileFeel: 'Sắc lạnh uy nghi, bền bỉ qua nhiều thế hệ ẩm thực gia đình',
  },
}

export function ArtisanHandmadeDamascusCleaverCulinaryAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPattern, setSelectedPattern] = useState<CleaverFinish>('dragon-twist')
  const [viewAngle, setViewAngle] = useState<number>(0)
  const [knifeWeight, setKnifeWeight] = useState<number>(750) // grams
  const [boardThickness, setBoardThickness] = useState<number>(100) // mm
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [customInquirySuccess, setCustomInquirySuccess] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
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

  // Play high crisp steel chime & deep rock-hard wood chop sound
  function playCleaverStrike() {
    const ctx = getAudioContext()
    if (!ctx) return

    setIsPlayingAudio(true)
    setTimeout(() => setIsPlayingAudio(false), 500)

    const now = ctx.currentTime

    // 1. High frequency metallic ring (VG-10 steel ping 3500Hz)
    const steelOsc = ctx.createOscillator()
    const steelGain = ctx.createGain()
    steelOsc.type = 'triangle'
    steelOsc.frequency.setValueAtTime(3200, now)
    steelOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.3)

    steelGain.gain.setValueAtTime(0.0001, now)
    steelGain.gain.linearRampToValueAtTime(0.3, now + 0.002)
    steelGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)

    steelOsc.connect(steelGain)
    steelGain.connect(ctx.destination)
    steelOsc.start(now)
    steelOsc.stop(now + 0.4)

    // 2. Deep solid Nghiến ironwood thud (120Hz down to 50Hz)
    const woodOsc = ctx.createOscillator()
    const woodGain = ctx.createGain()
    woodOsc.type = 'sine'
    woodOsc.frequency.setValueAtTime(140, now)
    woodOsc.frequency.exponentialRampToValueAtTime(45, now + 0.25)

    woodGain.gain.setValueAtTime(0.0001, now)
    woodGain.gain.linearRampToValueAtTime(0.45, now + 0.005)
    woodGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)

    woodOsc.connect(woodGain)
    woodGain.connect(ctx.destination)
    woodOsc.start(now)
    woodOsc.stop(now + 0.35)
  }

  // Calculate kinetic impact energy (Joules) based on weight & stroke
  const chopImpactJoules = ((knifeWeight / 1000) * 9.8 * 0.45 + (knifeWeight / 1000) * 12.5).toFixed(1)
  // Calculate acoustic absorption of the thick Nghien wood block
  const acousticDampeningDb = Math.min(28, Math.round(14 + (boardThickness - 70) * 0.28))

  const activePattern = PATTERNS[selectedPattern]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Xưởng Dao Chặt Damascus & Thớt Nghiến Lạng Sơn GuHomes"
    >
      {/* Subtle Background Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-950/20 via-neutral-950 to-stone-900/40 opacity-70" />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-stone-700/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 shadow-sm shadow-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
              Bespoke Culinary Arsenal · GU-CLEAVER-2026-X
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>256 Lớp Thép Rèn Búa Tay</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Thớt Nghiến Đá Lạng Sơn</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Chuôi Mun Sừng Khâu Đồng</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl md:text-5xl">
              Xưởng Dao Chặt Damascus & Thớt Nghiến
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Trọng Đao Rèn Thủ Công 256 Lớp & Thớt Cổ Thụ Đai Đồng Tán Tay
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Chiếc dao chặt nhà bếp đỉnh cao sinh ra từ lửa đỏ và thép quý, nơi nghệ thuật luyện kim giao hòa với
              văn hóa ẩm thực gia đình Việt. Thân dao được thợ rèn danh gia tôi luyện 256 lớp thép Damascus hoa văn cuộn
              sóng, góc mài lưỡi vồng convex 22° chặt ngọt mọi loại xương ống mà không mẻ lưỡi.
              Đồng hành cùng dao là thớt gỗ Nghiến đá ngàn năm tuổi từ rừng núi Lạng Sơn, hấp sấy hút chân không ngâm
              dầu hạt lanh tinh khiết và nẹp đai đồng đúc nguyên khối chống nứt toác trọn đời.
            </p>
          </div>

          {/* Interactive Cleaver Ping Sound */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-stone-800 bg-neutral-900/60 p-5 backdrop-blur-md lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Thử nghiệm va chạm kim khí
              </span>
              <h4 className="mt-1 font-serif text-sm text-stone-200">
                Tiếng Kêu Đanh Chắc Lưỡi Thép VG-10
              </h4>
              <p className="mt-1 text-xs text-stone-400">
                Lắng nghe tiếng đanh thép 61 HRC va vào mặt thớt gỗ Nghiến đá không để lại mùn gỗ.
              </p>
            </div>
            <button
              onClick={playCleaverStrike}
              className={cn(
                'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all',
                isPlayingAudio
                  ? 'bg-amber-400 text-stone-950 scale-95 shadow-lg shadow-amber-400/30'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingAudio ? 'Âm Vang Thép & Gỗ Đanh Chắc...' : 'Gõ Thử Lưỡi Dao Lên Thớt Nghiến'}
            </button>
          </div>
        </div>

        {/* 360 Degree Viewer & Pattern Selector */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/70 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Chiêm ngưỡng cấu trúc thép Damascus
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Bộ Ba Hoa Văn Thép Rèn Nghệ Thuật
              </h3>
            </div>
            {/* Pattern switch buttons */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PATTERNS) as CleaverFinish[]).map((key) => {
                const pat = PATTERNS[key]
                const isActive = selectedPattern === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPattern(key)}
                    className={cn(
                      'min-h-[44px] rounded-lg px-3.5 py-2 text-xs font-medium transition-all',
                      isActive
                        ? 'bg-amber-600 text-stone-950 font-semibold shadow-xs'
                        : 'bg-stone-800/70 text-stone-300 hover:text-stone-100 hover:bg-stone-800'
                    )}
                  >
                    {pat.name.split('(')[0]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive Cleaver Visualizer & Angle Controls */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800/80 bg-black/60 p-8 text-center">
                {/* Simulated 3D Graphic representation of the Damascus Cleaver */}
                <div
                  className="relative flex h-52 w-full max-w-md items-center justify-center transition-transform duration-500"
                  style={{ transform: `rotate(${viewAngle * 0.1}deg)` }}
                >
                  <div className="relative flex items-center">
                    {/* Mun Wood Handle */}
                    <div className="h-10 w-24 rounded-l-xl bg-gradient-to-r from-stone-950 via-zinc-900 to-stone-950 border border-amber-900/40 shadow-inner flex items-center justify-between px-2">
                      <span className="h-full w-2 bg-amber-600/40 rounded-xs" />
                      <span className="font-mono text-[9px] text-stone-500 rotate-90">GU·MUN</span>
                      <span className="h-full w-3 bg-amber-500 rounded-xs shadow-xs" />
                    </div>

                    {/* Damascus Cleaver Blade */}
                    <div className="relative h-32 w-52 rounded-r-md border border-stone-600 bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900 shadow-2xl flex flex-col justify-between p-3 overflow-hidden">
                      {/* Damascus Pattern lines */}
                      <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-stone-400 to-transparent" />
                      <div className="flex justify-between items-start z-10">
                        <span className="font-mono text-[9px] text-amber-300/80 tracking-widest uppercase">
                          {activePattern.layers} LAYERS · VG10 CORE
                        </span>
                        <span className="font-serif text-[10px] text-stone-300 font-light">61 HRC</span>
                      </div>
                      <div className="z-10 text-center">
                        <span className="font-serif text-sm tracking-wider text-stone-200 font-light italic">
                          GuHomes Bespoke
                        </span>
                      </div>
                      <div className="flex justify-between items-end z-10 border-b border-amber-400/40 pb-0.5">
                        <span className="font-mono text-[8px] text-stone-400">CONVEX BEVEL 22°</span>
                        <span className="font-mono text-[8px] text-stone-400">LẠNG SƠN</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Angle Selector Tabs */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-stone-400 mr-2">Góc quan sát:</span>
                  {[0, 45, 90, 180].map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setViewAngle(angle)}
                      className={cn(
                        'min-h-[36px] rounded-md px-3 text-xs font-mono transition-colors',
                        viewAngle === angle
                          ? 'bg-amber-600 text-stone-950 font-bold'
                          : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      {angle}°
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pattern Specs */}
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Thông số phôi thép rèn độc bản
              </span>
              <h4 className="mt-2 font-serif text-2xl text-stone-100">{activePattern.name}</h4>
              <p className="mt-3 text-xs leading-relaxed text-stone-300">{activePattern.description}</p>

              <div className="mt-5 space-y-2.5 rounded-xl border border-stone-800 bg-black/40 p-4">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Số lớp thép gập rèn:</span>
                  <span className="font-mono font-medium text-amber-300">{activePattern.layers} Lớp Tinh Luyện</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Lõi chịu lực & độ cứng:</span>
                  <span className="font-mono font-medium text-stone-200">{activePattern.steelCore}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Dung môi axit làm hiện vân:</span>
                  <span className="text-stone-300 text-right max-w-[200px]">{activePattern.etchingAcid}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Cảm giác xúc giác cầm nắm:</span>
                  <span className="text-amber-200 text-right max-w-[200px]">{activePattern.tactileFeel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Impact & Thickness Physics Calculator */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/60 p-6 md:p-8">
          <div className="border-b border-stone-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              Vật lý học nhà bếp GuHomes
            </span>
            <h3 className="font-serif text-xl text-stone-100">
              Bộ Tính Toán Động Năng Chặt & Triệt Tiêu Chấn Động Thớt Nghiến
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Điều chỉnh trọng lượng dao và độ dày thớt Nghiến để tìm điểm cân bằng hoàn hảo cho lực tay gia chủ.
            </p>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300">Trọng lượng dao chặt:</span>
                  <span className="text-amber-400 font-semibold">{knifeWeight} Gram</span>
                </div>
                <input
                  type="range"
                  min="650"
                  max="900"
                  step="25"
                  value={knifeWeight}
                  onChange={(e) => setKnifeWeight(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>650g (Thanh thoát)</span>
                  <span>750g (Chuẩn mực)</span>
                  <span>900g (Đại đao)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300">Độ dày thớt gỗ Nghiến đá Lạng Sơn:</span>
                  <span className="text-amber-400 font-semibold">{boardThickness} mm</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="130"
                  step="5"
                  value={boardThickness}
                  onChange={(e) => setBoardThickness(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>70mm (Gọn gàng)</span>
                  <span>100mm (Đẳng cấp bếp trưởng)</span>
                  <span>130mm (Truyền đời)</span>
                </div>
              </div>
            </div>

            {/* Calculated Results */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Động Năng Nhát Chặt (Joules)</span>
                <span className="mt-1 text-2xl font-light font-serif text-amber-300">{chopImpactJoules} J</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Đứt ngọt xương bò/gà trong 1 nhát</span>
              </div>

              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Triệt Tiêu Rung Bàn Đảo Bếp</span>
                <span className="mt-1 text-2xl font-light font-serif text-cyan-300">-{acousticDampeningDb} dB</span>
                <span className="text-[10px] text-stone-400 block mt-1">Không làm nứt đá cẩm thạch Calacatta</span>
              </div>

              <div className="rounded-xl border border-stone-800 bg-black/50 p-4 sm:col-span-2">
                <span className="font-mono text-[11px] text-stone-400 block">Kháng Khuẩn & Kháng Mùi Tự Nhiên</span>
                <p className="mt-1 text-xs text-stone-300">
                  Thớ gỗ Nghiến đan chéo xoắn ốc được ngâm dầu hạt lanh không để lại rãnh dăm gỗ, ngăn 99.8% vi khuẩn
                  xâm nhập sau mỗi lần vệ sinh nước ấm.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bespoke Custom Engraving Order Form */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-gradient-to-r from-amber-950/40 via-stone-900 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                May đo độc bản gia huy
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Đặt Rèn Dao Chặt Damascus & Thớt Nghiến Khắc Tên Gia Chủ
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Mỗi bộ sản phẩm xuất xưởng từ xưởng mộc GuHomes Thạnh Xuân đều đi kèm bao da bò sáp Ý may tay,
                hộp gỗ Mun lót nhung và chứng thư vật liệu rèn độc bản cấp mã định danh bảo hành trọn đời.
              </p>
            </div>

            <div className="lg:col-span-5">
              {customInquirySuccess ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-900/30 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-amber-200">
                    Đã ghi nhận yêu cầu đặt rèn dao & thớt
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    Nghệ nhân GuHomes sẽ liên hệ để xác nhận nội dung khắc tên và hoa văn vân thép.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setCustomInquirySuccess(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-knife`} className="sr-only">
                    Số điện thoại và tên gia chủ
                  </label>
                  <input
                    id={`${formId}-knife`}
                    type="text"
                    required
                    placeholder="Họ tên & Số điện thoại gia chủ..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký Đặt Rèn Độc Bản</span>
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
