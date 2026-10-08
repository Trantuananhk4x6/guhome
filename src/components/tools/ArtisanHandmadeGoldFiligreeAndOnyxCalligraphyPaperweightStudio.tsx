'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface PaperweightSize {
  id: string
  name: string
  length: string
  width: string
  height: string
  weight: string
  paperType: string
  goldFiligreePattern: string
  application: string
}

const PAPERWEIGHT_SIZES: readonly PaperweightSize[] = [
  {
    id: 'dai-thu-26',
    name: 'Cỡ Đại Thư Hoàng Triều (26cm)',
    length: '260 mm',
    width: '38 mm',
    height: '28 mm',
    weight: '820 g',
    paperType: 'Giấy Xuyến Chỉ Cổ Động Đại Khổ, Hoành Phi',
    goldFiligreePattern: 'Lưỡng Long Chầu Nhật sợi vàng 0.15mm',
    application: 'Chặn giấy hoành phi, câu đối đại tự, tác phẩm thư họa cỡ lớn trên bàn viết gỗ mun.',
  },
  {
    id: 'trung-thu-19',
    name: 'Cỡ Trung Thư Danh Sĩ (19cm)',
    length: '190 mm',
    width: '34 mm',
    height: '24 mm',
    weight: '560 g',
    paperType: 'Giấy Dó Thủ Công Bắc Ninh Tứ Quý Khổ Vừa',
    goldFiligreePattern: 'Họa tiết Thủy Ba & Mây Cuộn Triều Lê',
    application: 'Chặn thi tập, văn bản thi pháp, trường thư ghi chép thường nhật của gia chủ.',
  },
  {
    id: 'tieu-thu-13',
    name: 'Cỡ Tiểu Thư Thi Họa (13cm)',
    length: '130 mm',
    width: '28 mm',
    height: '20 mm',
    weight: '360 g',
    paperType: 'Giấy Lụa Ngự Dụng, Thi Phẩm Bỏ Túi',
    goldFiligreePattern: 'Liên Hoa Triều Lý nạm vàng 24K',
    application: 'Chặn thư họa tinh vi, ấn phẩm văn chương ngự bút để bàn trà đạo.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndOnyxCalligraphyPaperweightStudio() {
  const [selectedSize, setSelectedSize] = useState<PaperweightSize>(PAPERWEIGHT_SIZES[0]!)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
  const [placedOnDesk, setPlacedOnDesk] = useState<boolean>(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close()
      }
    }
  }, [])

  const playStoneChime = (f1: number, f2: number) => {
    if (!soundEnabled) return
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioCtx()
      }
      if (audioCtxRef.current.state === 'suspended') {
        void audioCtxRef.current.resume()
      }

      const now = audioCtxRef.current.currentTime

      // Fundamental tone
      const osc1 = audioCtxRef.current.createOscillator()
      const gain1 = audioCtxRef.current.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(f1, now)

      gain1.gain.setValueAtTime(0.0001, now)
      gain1.gain.linearRampToValueAtTime(0.22, now + 0.03)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)
      osc1.start(now)
      osc1.stop(now + 2.85)

      // Harmonic chime
      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.0001, now)
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.02)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.2)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)
      osc2.start(now)
      osc2.stop(now + 2.25)
    } catch {
      // Audio fallback
    }
  }

  const handlePlaceDesk = () => {
    setPlacedOnDesk(true)
    playStoneChime(HARMONIC_528HZ, HARMONIC_1056HZ)
    setTimeout(() => setPlacedOnDesk(false), 800)
  }

  return (
    <section className="u-gutter my-[clamp(4.5rem,10vh,8rem)]">
      <div className="mx-auto w-full max-w-[110rem] rounded-2xl border border-line/80 bg-surface/90 p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-line/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[48rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Tác Phẩm Thư Phòng Ngự Chế · GuHomes Atelier 2026
            </div>
            <h2 className="u-display-sm mt-4 text-ink">
              Chặn Giấy Thư Pháp Đá Onyx Cổ Vân Tuyết & Vàng 24K Filigree
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Được chế tác từ khối đá Onyx Cổ Vân Tuyết Ninh Bình dày 28mm mài vát tay 12 cạnh kim cương với độ thấu quang ngọc 91%. Khung viền nẹp sợi vàng 24K filigree 0.15mm uốn hoa văn rồng triều Lý thủ công, đế nỉ nhung lót gỗ Sưa đỏ Bắc Bộ chống trầy xước giấy xuyến chỉ và mặt bàn làm việc.
            </p>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const nextState = !soundEnabled
                setSoundEnabled(nextState)
                if (nextState) playStoneChime(HARMONIC_528HZ, HARMONIC_1056HZ)
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-accent/40 bg-canvas/80 px-4 py-2 text-xs font-mono text-ink transition-all hover:border-accent hover:bg-accent/10 active:scale-95 cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-accent" />
                  <span>Âm Ngọc 528Hz: Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-muted" />
                  <span>Âm Ngọc 528Hz: Tắt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Workspace */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left: Size Selector & Technical Specs */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                01 / Chọn Quy Cách Chặn Giấy Thư Phòng
              </span>
              <span className="text-xs font-mono text-muted">Văn Phòng Tứ Bảo</span>
            </div>

            {/* Sizes */}
            <div className="flex flex-col gap-3">
              {PAPERWEIGHT_SIZES.map((sz) => {
                const isCur = sz.id === selectedSize.id
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => {
                      setSelectedSize(sz)
                      playStoneChime(HARMONIC_528HZ, HARMONIC_1056HZ)
                    }}
                    className={`min-h-[44px] flex flex-col p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isCur
                        ? 'border-accent bg-accent/15 shadow-[0_0_16px_rgba(197,168,128,0.25)]'
                        : 'border-line/60 bg-surface/50 hover:border-accent/40 hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-ink">
                        {sz.name}
                      </span>
                      <span className="font-mono text-xs text-accent">
                        {sz.weight}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted font-mono">
                      <span>Kích thước: {sz.length} x {sz.width} x {sz.height}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/75">
                      {sz.application}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Paper Compatibility Card */}
            <div className="rounded-xl border border-accent/30 bg-surface/80 p-4">
              <div className="text-xs font-mono text-muted">Tương thích mặt giấy:</div>
              <div className="mt-1 text-xs font-medium text-ink">
                {selectedSize.paperType}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line/40 pt-2 text-xs font-mono">
                <span className="text-muted">Họa tiết filigree:</span>
                <span className="text-accent font-semibold">{selectedSize.goldFiligreePattern}</span>
              </div>
            </div>
          </div>

          {/* Right: Macro View & Interaction */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                02 / Kính Hiển Vi Macro & Trải Nghiệm Xúc Giác
              </span>
              <span className="text-xs font-mono text-muted">Onyx Vân Tuyết Ninh Bình</span>
            </div>

            {/* Macro Stage Canvas */}
            <div className="relative rounded-xl border border-line/60 bg-espresso/10 p-6 flex flex-col items-center justify-center overflow-hidden min-h-[220px]">
              {/* Onyx Slab Representation */}
              <motion.div
                animate={{
                  scale: zoomLevel === 1 ? 1 : zoomLevel === 2 ? 1.3 : zoomLevel === 3 ? 1.7 : 2.1,
                  y: placedOnDesk ? 8 : 0,
                }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className="relative h-14 w-64 rounded-md border-2 border-amber-300/60 bg-gradient-to-r from-amber-100/90 via-emerald-100/80 to-amber-50/95 shadow-2xl flex items-center justify-center"
              >
                {/* Filigree Wire Simulation */}
                <div className="absolute inset-x-2 inset-y-1 rounded-xs border border-dashed border-amber-600/70" />
                <div className="text-center font-serif text-[11px] text-stone-800 tracking-wider font-semibold">
                  Onyx Vân Tuyết · Vàng 24K Filigree
                </div>
                <div className="absolute bottom-0 inset-x-0 h-1 rounded-b-md bg-rose-950/80" />
              </motion.div>

              {placedOnDesk && (
                <span className="absolute bottom-2 text-xs font-mono text-accent animate-pulse">
                  *Đã hạ thanh chặn giấy êm ái trên mặt bàn gỗ Mun*
                </span>
              )}
            </div>

            {/* Macro Controls */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted font-mono">Độ phóng đại vi sợi vàng:</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setZoomLevel(lvl)
                      playStoneChime(HARMONIC_528HZ, HARMONIC_1056HZ)
                    }}
                    className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                      zoomLevel === lvl
                        ? 'border-accent bg-accent text-canvas font-bold shadow-sm'
                        : 'border-line/60 bg-surface/50 text-ink hover:border-accent/40'
                    }`}
                  >
                    {lvl}x
                  </button>
                ))}
              </div>
            </div>

            {/* Test Action Button */}
            <button
              type="button"
              onClick={handlePlaceDesk}
              className="min-h-[44px] w-full rounded-full border border-accent bg-accent/15 hover:bg-accent hover:text-canvas text-ink font-display text-xs font-medium tracking-wide transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Thử Hạ Thanh Chặn Giấy Lên Bàn Viết</span>
              <span className="font-mono text-[10px] text-accent-soft">(Phát Âm Ngọc 528Hz)</span>
            </button>

            {/* Craftsmanship Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Khối đá quý:</span>
                <span className="font-semibold text-ink mt-0.5 block truncate">Onyx Vân Tuyết Tự Nhiên</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Độ thấu quang:</span>
                <span className="font-semibold text-accent mt-0.5 block">91% Ánh Sáng Xuyên Thấu</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Khung nẹp vàng:</span>
                <span className="font-semibold text-ink mt-0.5 block">Vàng 24K Sợi 0.15mm</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Đế lót chống trầy:</span>
                <span className="font-semibold text-ink mt-0.5 block">Gỗ Sưa Đỏ & Nỉ Nhung</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line/60 pt-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            <span>Mỗi tác phẩm đánh số thứ tự gia bảo, đi kèm chứng chỉ đá quý tự nhiên và giám định vàng 24K.</span>
          </div>
          <div className="font-mono text-ink/75">
            Xưởng may đo Thạnh Xuân: <span className="font-bold text-accent">0368 757 916</span> · GuHomes
          </div>
        </div>
      </div>
    </section>
  )
}
