'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type InlayMotif = 'vinh-quy' | 'lien-hoa' | 'tung-hac'
type VelvetColor = 'bordeaux' | 'emerald' | 'imperial-gold'

interface MotifDetail {
  id: InlayMotif
  name: string
  subname: string
  meaning: string
  shellType: string
  accentGradient: string
  motifArtDesc: string
}

const MOTIF_DETAILS: Record<InlayMotif, MotifDetail> = {
  'vinh-quy': {
    id: 'vinh-quy',
    name: 'Vinh Quy Bái Tổ',
    subname: 'Trạng Nguyên Cưỡi Ngựa Về Làng',
    meaning: 'Tượng trưng cho đỉnh cao đỗ đạt, lòng tri ân nguồn cội và gia phong hiển hách đời đời kế tục.',
    shellType: 'Ốc xà cừ đỏ Singapore loại 1 (độ dày 1.8mm, ánh đỏ lửa và xanh lông công)',
    accentGradient: 'from-amber-600 via-rose-700 to-amber-900',
    motifArtDesc: 'Đoàn rước kiệu quan trạng uy nghiêm dưới bóng đa đầu làng, từng vảy ngựa và tán lọng cẩn ốc sắc sảo từng nan nhỏ.',
  },
  'lien-hoa': {
    id: 'lien-hoa',
    name: 'Liên Hoa Cát Tường',
    subname: 'Hoa Sen Tịnh Khiết & Đôi Vịt Uyên Ương',
    meaning: 'Biểu trưng cho sự thuần khiết, gia đạo hòa hợp viên mãn, phúc lộc trường cửu và an lạc tâm hồn.',
    shellType: 'Ốc xà cừ vàng hổ phách phối vỏ trai cửu khổng phản quang ngũ sắc',
    accentGradient: 'from-pink-600 via-rose-800 to-stone-900',
    motifArtDesc: 'Cánh sen xếp lớp bung nở trên mặt hồ phẳng lặng, từng giọt sương đọng trên lá sen cẩn xà cừ trắng ngọc trai.',
  },
  'tung-hac': {
    id: 'tung-hac',
    name: 'Tùng Hạc Diên Niên',
    subname: 'Cổ Tùng Ngàn Năm & Chim Hạc Trường Thọ',
    meaning: 'Ý chí kiên cường bất khuất trước bão giông, trường thọ bất lão và cốt cách thanh cao của bậc quân tử.',
    shellType: 'Ốc xà cừ xanh ngọc bích phối xà cừ hồng phấn',
    accentGradient: 'from-emerald-700 via-teal-900 to-stone-950',
    motifArtDesc: 'Cây tùng cổ thụ vươn mình trên vách đá ngắm đàn hạc trắng sải cánh bay về miền đất phúc lành.',
  },
}

interface VelvetDetail {
  id: VelvetColor
  name: string
  origin: string
  hex: string
}

const VELVET_COLORS: Record<VelvetColor, VelvetDetail> = {
  bordeaux: {
    id: 'bordeaux',
    name: 'Đỏ Bordeaux Cung Đình',
    origin: 'Lụa Vạn Phúc nhuộm quả màng tang và vang đỏ',
    hex: '#6b1426',
  },
  emerald: {
    id: 'emerald',
    name: 'Xanh Ngọc Cẩm Thạch',
    origin: 'Nhung tơ tằm dệt tay sợi kép nhuộm chàm cổ',
    hex: '#114432',
  },
  'imperial-gold': {
    id: 'imperial-gold',
    name: 'Vàng Hoàng Gia Triều Nguyễn',
    origin: 'Tơ lụa nõn vàng óng tự nhiên đầm ấm',
    hex: '#8c6d23',
  },
}

export function ArtisanMotherOfPearlJewelryCasketAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedMotif, setSelectedMotif] = useState<InlayMotif>('vinh-quy')
  const [selectedVelvet, setSelectedVelvet] = useState<VelvetColor>('bordeaux')
  const [zoomLevel, setZoomLevel] = useState<1 | 4 | 16>(16)
  const [lightAngle, setLightAngle] = useState(45)

  // 3-digit brass mechanical combination lock
  const [dial1, setDial1] = useState(8)
  const [dial2, setDial2] = useState(6)
  const [dial3, setDial3] = useState(8)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [customSeal, setCustomSeal] = useState('')
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

  // Synthesize metallic brass mechanical dial tick
  function playDialClick() {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1400, now)
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.02)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.03)
  }

  // Synthesize heavy brass latch release clack
  function playLatchUnlockSound() {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Heavy mechanical thump
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(220, now)
    osc1.frequency.exponentialRampToValueAtTime(45, now + 0.08)

    const gain1 = ctx.createGain()
    gain1.gain.setValueAtTime(0.35, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

    // Metallic spring ping
    const osc2 = ctx.createOscillator()
    osc2.type = 'sawtooth'
    osc2.frequency.setValueAtTime(2800, now)
    osc2.frequency.exponentialRampToValueAtTime(800, now + 0.06)

    const gain2 = ctx.createGain()
    gain2.gain.setValueAtTime(0.15, now)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + 0.12)
    osc2.stop(now + 0.12)
  }

  function rotateDial(wheelIndex: 1 | 2 | 3) {
    playDialClick()
    if (wheelIndex === 1) {
      setDial1((prev) => {
        const next = (prev + 1) % 10
        checkUnlock(next, dial2, dial3)
        return next
      })
    } else if (wheelIndex === 2) {
      setDial2((prev) => {
        const next = (prev + 1) % 10
        checkUnlock(dial1, next, dial3)
        return next
      })
    } else {
      setDial3((prev) => {
        const next = (prev + 1) % 10
        checkUnlock(dial1, dial2, next)
        return next
      })
    }
  }

  function checkUnlock(d1: number, d2: number, d3: number) {
    if (d1 === 8 && d2 === 6 && d3 === 8) {
      setIsUnlocked(true)
      playLatchUnlockSound()
    } else {
      setIsUnlocked(false)
    }
  }

  function triggerMasterUnlock() {
    setDial1(8)
    setDial2(6)
    setDial3(8)
    setIsUnlocked(true)
    playLatchUnlockSound()
  }

  const curMotif = MOTIF_DETAILS[selectedMotif]
  const curVelvet = VELVET_COLORS[selectedVelvet]

  return (
    <section
      aria-label="Xưởng Chế Tác Hộp Trang Sức Gỗ Hoàng Đàn Khảm Ốc Xà Cừ Đỏ"
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
                Atelier Hoàng Đàn & Ốc Xà Cừ · GU-JEWEL-2026-X
              </span>
              <span className="text-xs font-mono text-stone-400">Ốc Đỏ Singapore · Khóa Cơ Mật Mã 3 Bánh Răng</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Hộp Trang Sức Gỗ Hoàng Đàn Khảm Ốc Xà Cừ Đỏ
              <span className="block font-sans text-lg font-normal text-amber-300/80 sm:text-xl mt-1">
                Quốc Mộc Tuyết Lạng Sơn, Cẩn Ốc Ngũ Sắc Chuyên Mỹ & Khóa Cơ Khắc Niên Hiệu
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Báu vật gia bảo lưu truyền qua nhiều thế hệ. Gỗ Hoàng Đàn tuyết tỏa hương thơm ngọt ngào vĩnh cửu kết hợp kỹ thuật xoi cẩn ốc xà cừ đỏ Singapore đỉnh cao, bảo tồn an toàn bộ trang sức quý bằng cơ cấu khóa mật mã cơ khí độc bản.
          </p>
        </div>

        {/* Master Interactive Section */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Visual Shimmer Inspection & Mechanical Lock (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Visual Box Surface with Iridescent Mother-of-Pearl */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800/80 text-xs">
                <span className="font-mono text-amber-300 uppercase tracking-wider">
                  Mặt Nắp Hộp: {curMotif.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400">Độ phóng đại:</span>
                  <div className="inline-flex rounded-lg border border-stone-700 bg-stone-950 p-0.5">
                    {([1, 4, 16] as const).map((z) => (
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

              {/* Box Lid Interactive Canvas */}
              <div className="relative mt-4 h-72 sm:h-80 w-full rounded-xl overflow-hidden border border-stone-800 bg-[#1a0f0a] flex items-center justify-center p-6 shadow-inner">
                {/* Wood Grain Simulation (Hoàng Đàn Lạng Sơn) */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, #2b170c 0px, #1d0f07 8px, #361f10 16px, #1d0f07 24px)`,
                  }}
                />

                {/* Iridescent Mother of Pearl Pattern */}
                <div
                  className={cn(
                    'relative z-10 w-full max-w-sm h-48 rounded-xl border border-amber-600/40 p-4 transition-all duration-500 flex flex-col justify-between shadow-2xl',
                    `bg-gradient-to-tr ${curMotif.accentGradient}`
                  )}
                  style={{
                    filter: `hue-rotate(${lightAngle}deg) saturate(${1.2 + zoomLevel * 0.05})`,
                    transform: `scale(${zoomLevel === 1 ? 0.95 : zoomLevel === 4 ? 1.05 : 1.15})`,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-amber-200/90 uppercase bg-black/40 px-2 py-0.5 rounded">
                      GU-JEWEL-2026-X
                    </span>
                    <span className="text-[10px] font-serif text-amber-200/80 italic">
                      Ốc Đỏ Singapore 7 Màu
                    </span>
                  </div>

                  <div className="text-center my-auto space-y-1">
                    <div className="font-serif text-lg sm:text-xl text-amber-100 tracking-wide drop-shadow-md">
                      {curMotif.name}
                    </div>
                    <p className="text-[11px] text-amber-200/90 font-light drop-shadow">
                      {curMotif.subname}
                    </p>
                  </div>

                  <div className="flex justify-between items-end text-[9px] text-amber-200/70 font-mono">
                    <span>Độ khít xoi rãnh: 0.1mm</span>
                    <span>Tuyết Hoàng Đàn Tự Nhiên</span>
                  </div>
                </div>

                {/* Light Angle Specular Shimmer */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay transition-all"
                  style={{
                    background: `linear-gradient(${lightAngle}deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Shimmer Light Angle Slider */}
              <div className="mt-4 space-y-1.5 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <div className="flex justify-between text-xs text-stone-300">
                  <label htmlFor={`${formId}-light-angle`}>Góc Chiếu Sáng Đổi Màu Ốc Xà Cừ (Shimmer Tilt)</label>
                  <span className="font-mono text-amber-400">{lightAngle}°</span>
                </div>
                <input
                  id={`${formId}-light-angle`}
                  type="range"
                  min="0"
                  max="360"
                  value={lightAngle}
                  onChange={(e) => setLightAngle(Number(e.target.value))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <p className="text-[10px] text-stone-500">
                  Kéo góc sáng để chiêm ngưỡng lớp tinh thể canxi cacbonat trong ốc xà cừ đỏ Singapore tán sắc từ đỏ hồng ngọc sang xanh lông công và vàng kim.
                </p>
              </div>
            </div>

            {/* 3-Digit Brass Mechanical Dial Lock Simulator */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                <div>
                  <h3 className="font-serif text-sm font-medium text-stone-200">
                    Cơ Cấu Khóa Mật Mã 3 Bánh Răng Đồng Cơ Khí
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Bánh răng đồng thau gia công vi cơ khí, xoay phát tiếng &ldquo;click&rdquo; kim loại êm ái. Mật mã mở: <strong className="text-amber-400 font-mono">8 - 6 - 8</strong> (Phát Lộc Phát).
                  </p>
                </div>
                <div className="shrink-0">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Đã Mở Khóa Nắp Hộp
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/50 text-rose-400 text-xs font-mono font-medium">
                      <span className="h-2 w-2 rounded-full bg-rose-400" /> Đang Khóa Cơ Học
                    </span>
                  )}
                </div>
              </div>

              {/* 3 Brass Wheel Dials */}
              <div className="flex justify-center items-center gap-4 py-2">
                {[
                  { val: dial1, idx: 1 as const, label: 'Hàng Trăm' },
                  { val: dial2, idx: 2 as const, label: 'Hàng Chục' },
                  { val: dial3, idx: 3 as const, label: 'Hàng Đơn Vị' },
                ].map((dial) => (
                  <div key={dial.idx} className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => rotateDial(dial.idx)}
                      title={`Bấm để xoay bánh răng ${dial.label}`}
                      aria-label={`Xoay bánh răng ${dial.label}`}
                      className="group relative h-20 w-16 rounded-xl border border-amber-500/50 bg-gradient-to-b from-amber-700 via-amber-900 to-amber-950 flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 min-h-[44px]"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-1 h-2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl" />
                      <span className="font-mono text-3xl font-bold text-amber-200 drop-shadow">
                        {dial.val}
                      </span>
                      <span className="text-[9px] font-sans text-amber-400/80 mt-1 uppercase">
                        Vặn số
                      </span>
                    </button>
                    <span className="text-[10px] text-stone-400 font-mono">{dial.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={triggerMasterUnlock}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-all min-h-[44px] shadow"
                >
                  Xoay Mã Mở Nhanh (8 - 6 - 8)
                </button>
                <span className="text-[11px] text-stone-400 italic">
                  Chế tác cơ khí mật mã độc quyền không sử dụng pin điện tử
                </span>
              </div>

              {/* Interior Reveal when Unlocked */}
              <AnimatePresence>
                {isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-xl border border-amber-500/40 p-4 space-y-3"
                    style={{ backgroundColor: curVelvet.hex }}
                  >
                    <div className="flex items-center justify-between text-xs text-white">
                      <strong className="font-serif text-sm">Nội Thất Khay Nhung Tơ Tằm Làng Vạn Phúc</strong>
                      <span className="text-[10px] font-mono opacity-80">{curVelvet.name}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-white/90">
                      <div className="p-2.5 rounded-lg bg-black/20 border border-white/20">
                        <div className="font-semibold">Ngăn Nhẫn Kim Cương</div>
                        <div className="opacity-70 mt-0.5">8 rãnh đệm nhung êm ái</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/20 border border-white/20">
                        <div className="font-semibold">Vòng Ngọc Cẩm Thạch</div>
                        <div className="opacity-70 mt-0.5">Khay gối nhung tròn</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/20 border border-white/20">
                        <div className="font-semibold">Dây Chuyền & Trâm Cài</div>
                        <div className="opacity-70 mt-0.5">Móc treo đồng mạ vàng 24K</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Customization Form & Craftsmanship Specifications (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Choose Motif Selection */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Tuyển Chọn Điển Tích Khảm Ốc Phong Thủy
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(MOTIF_DETAILS) as InlayMotif[]).map((motifKey) => {
                  const m = MOTIF_DETAILS[motifKey]
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
                        <div className="font-serif font-medium text-stone-200">{m.name}</div>
                        <div className="text-[11px] text-amber-400/90">{m.subname}</div>
                        <p className="text-[10px] text-stone-400 font-light">{m.meaning}</p>
                      </div>
                      <span className="text-stone-500 text-sm ml-2">→</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Choose Silk Velvet Interior Lining */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Màu Nhung Tơ Tằm Lót Khay Trang Sức (Vạn Phúc)
              </span>

              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(VELVET_COLORS) as VelvetColor[]).map((vKey) => {
                  const v = VELVET_COLORS[vKey]
                  const isCur = selectedVelvet === vKey
                  return (
                    <button
                      key={vKey}
                      type="button"
                      onClick={() => setSelectedVelvet(vKey)}
                      className={cn(
                        'p-3 rounded-xl border text-xs text-center transition-all min-h-[44px] flex flex-col items-center justify-between gap-2',
                        isCur
                          ? 'border-amber-400 bg-stone-900 text-stone-100'
                          : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-white/20 shadow"
                        style={{ backgroundColor: v.hex }}
                      />
                      <span className="text-[11px] font-medium leading-tight">{v.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Atelier Craftsmanship Specs */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Quy Trình Thủ Công 28 Ngày & Bảo Mật Cơ Khí
              </span>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>Gỗ Hoàng Đàn tuyết hữu cơ sấy tự nhiên 12 tháng, hàm lượng tinh dầu &gt; 6%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>Mài nhẵn 10 lớp nước bằng lá dong và bột đá nhung mịn trước khi cẩn ốc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>Bản lề cối đồng thau nguyên khối dập nổi triện hoa sen, mạ vàng 24K bảo hành 20 năm.</span>
                </li>
              </ul>
            </div>

            {/* Custom Bespoke Inscription & Order Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  Đặt May Đo Khắc Tên Chủ Nhân & Ấn Triện Mạ Vàng
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Nghệ nhân GuHomes khắc chìm tên chủ nhân hoặc ấn triện gia tộc mạ vàng quỳ dưới đáy hộp.
                </p>
              </div>

              {orderSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã ghi nhận yêu cầu chế tác hộp trang sức gia bảo. Nghệ nhân trưởng sẽ liên hệ gửi bản vẽ phác thảo ấn triện trong vòng 4 giờ.
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
                        Họ tên chủ sở hữu
                      </label>
                      <input
                        id={`${formId}-client-name`}
                        type="text"
                        required
                        placeholder="Trần Thu Hương"
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
                        placeholder="0903 xxx xxx"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-seal-text`} className="block text-[11px] text-stone-400 mb-1">
                      Nội dung khắc ấn triện gia tộc (Chữ Hán / Quốc ngữ)
                    </label>
                    <input
                      id={`${formId}-seal-text`}
                      type="text"
                      value={customSeal}
                      onChange={(e) => setCustomSeal(e.target.value)}
                      placeholder="Ví dụ: Trần Gia Chi Bảo · 2026"
                      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Gửi Yêu Cầu Chế Tác Hộp Trang Sức Gia Bảo</span>
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
