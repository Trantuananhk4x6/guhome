'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type SnuffMotif = 'hoa-cuc' | 'tung-hac' | 'long-an'

interface SnuffMotifDetail {
  id: SnuffMotif
  title: string
  subtitle: string
  meaning: string
  silverFiligreeDesc: string
  jadeiteSpec: string
  gradientTone: string
}

const SNUFF_MOTIFS: Record<SnuffMotif, SnuffMotifDetail> = {
  'hoa-cuc': {
    id: 'hoa-cuc',
    title: 'Cúc Đại Đóa Đồng Xâm',
    subtitle: 'Hoa Cúc Hoàng Gia & Chạm Lộng Bạc 999',
    meaning: 'Biểu trưng cho sự trường thọ, cao khiết và phong thái tĩnh tại ung dung của bậc vương giả.',
    silverFiligreeDesc: 'Sợi bạc ta 999 cán mỏng 0.2mm chạm thủng lộng hoa cúc cuộn cánh, bọc quanh thân sừng tự nhiên.',
    jadeiteSpec: 'Ngọc Bích Jadeite Myanmar loại A cắt cabochon bóng gương',
    gradientTone: 'from-amber-600/30 via-stone-800 to-stone-950',
  },
  'tung-hac': {
    id: 'tung-hac',
    title: 'Tùng Hạc Diên Niên',
    subtitle: 'Cổ Tùng Ngàn Năm & Chim Hạc Bất Tử',
    meaning: 'Khí tiết thanh cao, an nhiên trường cửu và tài lộc truyền đời cho gia tộc.',
    silverFiligreeDesc: 'Chạm khắc tỉ mỉ từng nan lông vũ chim hạc và lớp vỏ cây tùng già trên cốt bạc nguyên khối.',
    jadeiteSpec: 'Ngọc Phỉ Thúy Xanh Lý trong suốt thấu quang',
    gradientTone: 'from-emerald-700/30 via-stone-800 to-stone-950',
  },
  'long-an': {
    id: 'long-an',
    title: 'Long Vân Triều Phúc',
    subtitle: 'Rồng Cuộn Trong Mây & Triện Hoàng Cung',
    meaning: 'Uy quyền tột bậc, vượng khí phong thủy kích hoạt năng lượng Kỳ Nam tinh khiết.',
    silverFiligreeDesc: 'Rồng dập nổi vi cơ khí ngậm hạt ngọc trai, vảy rồng thếp vàng điểm xuyết.',
    jadeiteSpec: 'Ngọc Huyết Bích Hoàng Gia đỏ cam quý hiếm',
    gradientTone: 'from-rose-700/30 via-stone-800 to-stone-950',
  },
}

export function ArtisanPureSilverAgarwoodSnuffBottleAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedMotif, setSelectedMotif] = useState<SnuffMotif>('hoa-cuc')
  const [rotationDeg, setRotationDeg] = useState(45) // 0 - 360
  const [zoomLevel, setZoomLevel] = useState<1 | 5 | 20>(20)
  const [isSpoonUnscrewed, setIsSpoonUnscrewed] = useState(false)
  const [ownerSeal, setOwnerSeal] = useState('')
  const [orderSent, setOrderSent] = useState(false)

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
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Synthesize delicate micro-threaded 24K gold spoon unscrewing metallic click
  function playThreadClick() {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(2600, now)
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.02)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.03)
  }

  function toggleSpoon() {
    playThreadClick()
    setIsSpoonUnscrewed(!isSpoonUnscrewed)
  }

  const curMotif = SNUFF_MOTIFS[selectedMotif]

  return (
    <section
      aria-label="Xưởng Chế Tác Bình Hít Bột Trầm Kỳ Nam Bạc 999 Đồng Xâm"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(217,119,6,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-amber-300">
                Atelier Bạc Đồng Xâm · GU-SNUFF-2026-X
              </span>
              <span className="text-xs font-mono text-stone-400">Bạc Ta 999 · Sừng Tự Nhiên · Muỗng Mạ Vàng 24K</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Bình Hít Bột Trầm Kỳ Nam Bạc Chạm Lộng Đồng Xâm
              <span className="block font-sans text-lg font-normal text-amber-300/80 sm:text-xl mt-1">
                Kỹ Nghệ Chạm Lộng 0.2mm, Nắp Ngọc Bích Jadeite & Muỗng Tiện Ren Vi Cơ Khí
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Nghệ phẩm hương đạo hoàng cung lưu giữ bột Kỳ Nam tự nhiên đắt hơn vàng ròng. Thân bình sừng nguyên khối bọc bạc ta 999 chạm lộng tinh xảo, muỗng xúc mạ vàng 24K tiện ren kín khí chống thoát hương, hộp đựng gỗ Tử Đàn lót gấm tơ tằm.
          </p>
        </div>

        {/* Master Interactive Section */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: 360 Rotation & Microscopic View & Unscrewing Spoon (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Visual Canvas */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800/80 text-xs">
                <span className="font-mono text-amber-300 uppercase tracking-wider">
                  Chạm Lộng: {curMotif.title} ({rotationDeg}°)
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400">Độ phóng đại:</span>
                  <div className="inline-flex rounded-lg border border-stone-700 bg-stone-950 p-0.5">
                    {([1, 5, 20] as const).map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => setZoomLevel(z)}
                        className={cn(
                          'px-2.5 py-1 text-[11px] rounded-md transition-all min-h-[36px] min-w-[36px] font-mono',
                          zoomLevel === z
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {z}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Snuff Bottle Interactive 3D Simulation Canvas */}
              <div className="relative mt-4 h-72 sm:h-84 w-full rounded-xl overflow-hidden border border-stone-800 bg-[#0f0d0b] flex items-center justify-center p-6 shadow-inner">
                {/* 360 Ambient Specular Reflections */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen transition-all"
                  style={{
                    background: `linear-gradient(${rotationDeg}deg, transparent 20%, rgba(255,255,255,0.7) 50%, transparent 80%)`,
                  }}
                />

                {/* The Snuff Bottle Cylinder Shape */}
                <div
                  className="relative z-10 flex flex-col items-center transition-all duration-300 select-none"
                  style={{
                    transform: `scale(${zoomLevel === 1 ? 0.9 : zoomLevel === 5 ? 1.05 : 1.25})`,
                  }}
                >
                  {/* Top Jadeite Cap & Gold Spoon */}
                  <div className="relative flex flex-col items-center">
                    {/* Jadeite Cabochon Stone */}
                    <div className="h-6 w-9 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-700 border border-emerald-300 shadow-md flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    </div>

                    {/* Gold Threaded Collar */}
                    <div className="h-3 w-7 bg-amber-400 rounded-sm border border-amber-300 shadow flex items-center justify-center text-[7px] font-mono text-stone-900 font-bold">
                      24K GOLD
                    </div>

                    {/* Unscrewed Spoon Indicator */}
                    {isSpoonUnscrewed && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: -25 }}
                        className="absolute -top-7 flex flex-col items-center"
                      >
                        <div className="h-7 w-1 bg-amber-300 rounded-full shadow" />
                        <div className="h-2 w-2.5 rounded-b-full bg-amber-400" />
                        <span className="text-[8px] font-mono text-amber-300 bg-black/70 px-1 rounded mt-1">
                          Muỗng Xúc Bột Trầm
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Bottle Body (Horn core wrapped with pierced pure silver 999) */}
                  <div
                    className={cn(
                      'relative h-40 w-28 rounded-3xl border-2 border-stone-400 shadow-2xl p-3 flex flex-col justify-between items-center transition-all duration-300',
                      `bg-gradient-to-b ${curMotif.gradientTone}`
                    )}
                    style={{
                      boxShadow: `0 10px 30px rgba(255,255,255,0.1), inset 0 0 15px rgba(255,255,255,0.2)`,
                    }}
                  >
                    <span className="text-[8px] font-mono text-stone-300 bg-black/50 px-1.5 py-0.5 rounded">
                      BẠC TA 999
                    </span>

                    {/* Filigree Motif Center */}
                    <div className="text-center my-auto space-y-0.5">
                      <div className="font-serif text-sm font-semibold text-stone-100 drop-shadow">
                        {curMotif.title}
                      </div>
                      <p className="text-[9px] text-amber-200/90 drop-shadow">
                        {curMotif.subtitle}
                      </p>
                    </div>

                    <div className="flex justify-between w-full text-[7px] font-mono text-stone-400 border-t border-stone-600/40 pt-1">
                      <span>Cốt Sừng Thủy Ngưu</span>
                      <span>Đồng Xâm 0.2mm</span>
                    </div>
                  </div>

                  {/* Bottle Base */}
                  <div className="h-2 w-20 rounded-b-lg bg-stone-700 border border-stone-500 shadow" />
                </div>
              </div>

              {/* 360 Degree Rotation Slider */}
              <div className="mt-4 space-y-1.5 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <div className="flex justify-between text-xs text-stone-300">
                  <label htmlFor={`${formId}-rotation`}>Góc Xoay Chiêm Ngưỡng 360° (Reflective Shimmer)</label>
                  <span className="font-mono text-amber-400">{rotationDeg}°</span>
                </div>
                <input
                  id={`${formId}-rotation`}
                  type="range"
                  min="0"
                  max="360"
                  value={rotationDeg}
                  onChange={(e) => setRotationDeg(Number(e.target.value))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Micro-Threaded Spoon Unscrew Button */}
              <div className="mt-3 flex items-center justify-between bg-stone-950/80 p-3 rounded-xl border border-stone-800 text-xs">
                <div>
                  <strong className="text-stone-200">Muỗng Xúc Bột Trầm Mạ Vàng 24K Tiện Ren Kín Khí</strong>
                  <p className="text-[11px] text-stone-400">
                    {isSpoonUnscrewed ? 'Muỗng đã được mở rời để xúc bột Kỳ Nam' : 'Muỗng đang được vặn chặt kín khí'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleSpoon}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all min-h-[44px]',
                    isSpoonUnscrewed
                      ? 'bg-amber-500 text-stone-950 font-semibold'
                      : 'bg-stone-800 text-stone-300 hover:text-white border border-stone-700'
                  )}
                >
                  {isSpoonUnscrewed ? 'Vặn Đóng Ren Kín' : 'Vặn Mở Muỗng Xúc'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Form & Craftsmanship Specifications (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Choose Filigree Motif Selection */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Tuyển Chọn Điển Tích Chạm Lộng Hoàng Cung
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(SNUFF_MOTIFS) as SnuffMotif[]).map((motifKey) => {
                  const m = SNUFF_MOTIFS[motifKey]
                  const isCur = selectedMotif === motifKey
                  return (
                    <button
                      key={motifKey}
                      type="button"
                      onClick={() => setSelectedMotif(motifKey)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border text-xs transition-all min-h-[44px] flex items-center justify-between',
                        isCur
                          ? 'border-amber-500/70 bg-stone-900 text-stone-100 shadow-md'
                          : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:bg-stone-900/50'
                      )}
                    >
                      <div className="space-y-1">
                        <div className="font-serif font-medium text-stone-200">{m.title}</div>
                        <div className="text-[11px] text-amber-400/90">{m.subtitle}</div>
                        <p className="text-[10px] text-stone-400 font-light">{m.meaning}</p>
                      </div>
                      <span className="text-stone-500 text-sm ml-2">→</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Atelier Craftsmanship Specs */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Kỹ Nghệ Kim Hoàn Đồng Xâm & Ngọc Bích Tự Nhiên
              </span>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>
                    <strong className="text-stone-100">Bạc Ta 999 Chạm Lộng 0.2mm:</strong> Kỹ thuật đục thủng lộng thủ công của nghệ nhân làng nghề Đồng Xâm (Thái Bình), không dùng khuôn dập công nghiệp.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>
                    <strong className="text-stone-100">Cốt sừng tự nhiên nguyên khối:</strong> Kháng từ trường, cách nhiệt bảo toàn trọn vẹn hợp chất sesquiterpen quý giá trong Kỳ Nam.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>
                    <strong className="text-stone-100">Nắp ngọc Jadeite mài cabochon:</strong> Đệm gioăng silicone thực phẩm vô hình triệt tiêu 100% hiện tượng bay hơi tinh dầu.
                  </span>
                </li>
              </ul>
            </div>

            {/* Custom Bespoke Inscription & Order Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  Đặt May Đo Khắc Tên Chủ Nhân & Ấn Triện Hoàng Gia
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Nghệ nhân chạm bạc chạm chìm tên chủ nhân hoặc ấn triện gia tộc dưới đáy bình kèm chứng thư độc bản GU-SNUFF-2026-X.
                </p>
              </div>

              {orderSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã ghi nhận yêu cầu chế tác bình hít trầm Kỳ Nam. Nghệ nhân kim hoàn trưởng sẽ liên hệ gửi bản phác thảo chạm khắc trong vòng 4 giờ.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label htmlFor={`${formId}-client-name`} className="block text-[11px] text-stone-400 mb-1">
                        Họ tên gia chủ
                      </label>
                      <input
                        id={`${formId}-client-name`}
                        type="text"
                        required
                        placeholder="Trịnh Quốc Bảo"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-client-phone`} className="block text-[11px] text-stone-400 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        id={`${formId}-client-phone`}
                        type="tel"
                        required
                        placeholder="0915 xxx xxx"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-seal-text`} className="block text-[11px] text-stone-400 mb-1">
                      Nội dung khắc ấn triện đáy bình bạc
                    </label>
                    <input
                      id={`${formId}-seal-text`}
                      type="text"
                      value={ownerSeal}
                      onChange={(e) => setOwnerSeal(e.target.value)}
                      placeholder="Ví dụ: Trịnh Gia Bảo Tàng · Kỳ Nam Chi Bảo"
                      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Gửi Yêu Cầu Chế Tác Bình Trầm Độc Bản</span>
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
