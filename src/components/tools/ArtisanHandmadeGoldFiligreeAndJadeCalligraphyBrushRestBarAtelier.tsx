'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz jade chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface BrushRestBarSize {
  id: string
  name: string
  length: string
  width: string
  height: string
  slots: string
  jadeSource: string
  goldFiligreePattern: string
  application: string
}

const BRUSH_REST_BAR_SIZES: readonly BrushRestBarSize[] = [
  {
    id: 'dai-son-32',
    name: 'Cỡ Đại Sơn Thất Nhạc (32cm)',
    length: '320 mm',
    width: '42 mm',
    height: '48 mm',
    slots: '7 Rãnh Gác Ngự Bút (Đại Khôi)',
    jadeSource: 'Ngọc Bích Phỉ Thúy Type A Myanmar Thấu Quang 94%',
    goldFiligreePattern: 'Lưỡng Long Chầu Nguyệt sợi vàng 0.15mm',
    application: 'Gác 7 ngự bút lông sói và lông cừu cổ thụ đại khoa hoành phi câu đối.',
  },
  {
    id: 'trung-son-24',
    name: 'Cỡ Trung Sơn Ngũ Nhạc (24cm)',
    length: '240 mm',
    width: '36 mm',
    height: '38 mm',
    slots: '5 Rãnh Gác Thư Bút (Trung Khôi)',
    jadeSource: 'Ngọc Bích Phỉ Thúy Xanh Lý Cố Đô',
    goldFiligreePattern: 'Họa tiết Thủy Ba & Mây Cuộn Triều Lê',
    application: 'Gác 5 bút lông thỏ viết thi phẩm và thư từ thường nhật trên bàn gỗ Mun sừng.',
  },
  {
    id: 'tieu-son-16',
    name: 'Cỡ Tiểu Sơn Tam Đảo (16cm)',
    length: '160 mm',
    width: '30 mm',
    height: '32 mm',
    slots: '3 Rãnh Gác Tiểu Bút (Tiểu Khôi)',
    jadeSource: 'Ngọc Bích Băng Chủng Mịn Màng',
    goldFiligreePattern: 'Cánh Sen Triều Lý nẹp vàng 24K',
    application: 'Gác 3 bút tỉa ngự bút tinh tế bên khay trà đạo thu nhỏ.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBarAtelier() {
  const [selectedSize, setSelectedSize] = useState<BrushRestBarSize>(BRUSH_REST_BAR_SIZES[0]!)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
  const [placedBrush, setPlacedBrush] = useState<boolean>(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close()
      }
    }
  }, [])

  const playJadeChime = (f1: number, f2: number) => {
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
      gain1.gain.linearRampToValueAtTime(0.24, now + 0.03)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)
      osc1.start(now)
      osc1.stop(now + 2.85)

      // Harmonics
      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.0001, now)
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.04)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)
      osc2.start(now)
      osc2.stop(now + 2.05)
    } catch {
      // Audio fallback
    }
  }

  const handlePlaceBrush = () => {
    setPlacedBrush((prev) => !prev)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
  }

  return (
    <section className="u-gutter my-[clamp(4.5rem,10vh,8rem)]">
      <div className="mx-auto w-full max-w-[110rem] rounded-2xl border border-line/80 bg-surface/90 p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-line/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[50rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Tác Phẩm Thư Họa Hoàng Gia · GuHomes Atelier 2026
            </div>
            <h2 className="u-display-sm mt-4 text-ink">
              Thanh Gác Bút Thư Họa Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree Dài 32cm
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Tác phẩm văn phòng tứ bảo chế tác từ ngọc Bích Phỉ Thúy Type A Myanmar dày 28mm đẽo 7 đỉnh núi nhấp nhô thấu quang 94%, nẹp dải sợi vàng 24K filigree rồng Lý 0.15mm uốn lượn ôm trọn sườn ngọc. Đặt vững chãi trên đế gỗ Mun sừng Khánh Hòa lót nỉ nhung thượng hạng, tạo điểm nhấn tôn quý tuyệt đối nơi thư phòng gia chủ.
            </p>
          </div>

          {/* Sound Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const nextState = !soundEnabled
                setSoundEnabled(nextState)
                if (nextState) playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-accent/40 bg-canvas/80 px-4 py-2 text-xs font-mono text-ink transition-all hover:border-accent hover:bg-accent/10 active:scale-95 cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-accent" />
                  <span>Âm Vang Ngọc: Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-muted" />
                  <span>Âm Vang Ngọc: Tắt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left: Size Selector & Specifications */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                01 / Quy Cách Kích Thước Gác Bút
              </span>
              <span className="text-xs font-mono text-muted">Chạm khắc tinh xảo</span>
            </div>

            <p className="text-xs text-ink/70">
              Chọn kích thước gác bút ngọc bích để hiển thị số rãnh gác bút và thông số chi tiết:
            </p>

            {/* Size Cards */}
            <div className="grid gap-3">
              {BRUSH_REST_BAR_SIZES.map((size) => {
                const isSelected = size.id === selectedSize.id
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size)
                      playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
                    }}
                    className={`min-h-[44px] flex flex-col p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-accent bg-accent/20 shadow-[0_0_20px_rgba(197,168,128,0.25)]'
                        : 'border-line/60 bg-surface/40 hover:border-accent/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-medium text-ink">
                        {size.name}
                      </span>
                      <span className="font-mono text-xs text-accent">
                        {size.slots}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
                      {size.application}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-muted">
                      <span>Dài {size.length}</span>
                      <span>·</span>
                      <span>Rộng {size.width}</span>
                      <span>·</span>
                      <span>Cao {size.height}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Gemology & Gold Filigree Note */}
            <div className="rounded-lg border border-accent/30 bg-surface/70 p-4 text-xs leading-relaxed text-ink/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted uppercase">Chất Ngọc Bích:</span>
                <span className="font-medium text-ink">{selectedSize.jadeSource}</span>
              </div>
              <div className="flex items-center justify-between border-t border-line/40 pt-2">
                <span className="font-mono text-[10px] text-muted uppercase">Hoa Văn Filigree:</span>
                <span className="font-medium text-accent">{selectedSize.goldFiligreePattern}</span>
              </div>
            </div>
          </div>

          {/* Right: Macro Zoom Viewer & Interactive Placement */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                02 / Thử Gác Bút Lông & Kính Lúp Macro Soi Sợi Vàng
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 4].map((zoom) => (
                  <button
                    key={zoom}
                    type="button"
                    onClick={() => {
                      setZoomLevel(zoom)
                      playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
                    }}
                    className={`min-h-[44px] px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                      zoomLevel === zoom
                        ? 'bg-accent text-canvas font-bold'
                        : 'bg-surface border border-line/60 text-ink/70 hover:border-accent'
                    }`}
                  >
                    {zoom}x
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Jade Brush Rest Preview */}
            <div className="relative h-60 rounded-xl border border-line/60 bg-gradient-to-b from-espresso/20 via-surface/60 to-surface/30 flex flex-col items-center justify-center overflow-hidden p-6">
              {/* Jade Rest Visualizer with Zoom Effect */}
              <div
                style={{ transform: `scale(${zoomLevel > 1 ? 1 + (zoomLevel - 1) * 0.25 : 1})` }}
                className="relative flex flex-col items-center transition-transform duration-300"
              >
                {/* Jade Mountain Silhouette */}
                <div className="flex items-end justify-center gap-1 h-20 px-4">
                  {[28, 42, 58, 72, 58, 42, 28].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}px` }}
                      className="w-5 rounded-t-lg bg-gradient-to-b from-emerald-500/80 via-emerald-700/90 to-emerald-950 border-t border-x border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.3)] relative"
                    >
                      {/* Gold Filigree Ridge Highlight */}
                      <div className="absolute top-0 inset-x-0 h-1 bg-amber-400/90 rounded-t-md" />
                    </div>
                  ))}
                </div>

                {/* Gold Filigree Base Belt */}
                <div className="h-3 w-56 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 border border-amber-600 rounded-xs shadow-md -mt-0.5 flex items-center justify-center">
                  <span className="text-[7px] font-mono text-amber-950 font-bold tracking-widest">
                    VÀNG 24K FILIGREE 0.15MM
                  </span>
                </div>

                {/* Mun Ebony Wood Pedestal */}
                <div className="h-5 w-64 bg-zinc-950 border border-zinc-800 rounded-b-md shadow-lg flex items-center justify-center">
                  <span className="text-[8px] font-mono text-zinc-400">Đế Gỗ Mun Sừng Khánh Hòa</span>
                </div>

                {/* Interactive Brush Resting on the Jade Mount */}
                <AnimatePresence>
                  {placedBrush && (
                    <motion.div
                      initial={{ opacity: 0, y: -25, rotate: -8 }}
                      animate={{ opacity: 1, y: -45, rotate: 6 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="absolute flex items-center pointer-events-none"
                    >
                      <div className="h-2 w-48 rounded-full bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 border border-amber-600/40 shadow-md" />
                      <div className="h-4 w-10 -ml-1 rounded-r-full bg-stone-100 border border-stone-300 shadow-sm" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Helper text */}
              <div className="absolute bottom-2 font-mono text-[10px] text-muted">
                {placedBrush ? 'Đã gác ngự bút lông sói lên đỉnh ngọc' : 'Bấm nút bên dưới để thử gác bút lên gác ngọc'}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handlePlaceBrush}
              className="min-h-[44px] w-full rounded-xl bg-accent text-canvas font-medium text-xs sm:text-sm shadow-md hover:bg-accent/90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{placedBrush ? 'Cất Bút Thư Họa Khỏi Gác Ngọc' : 'Thử Gác Ngự Bút Lên Gác Ngọc (Âm Vang 528Hz & 1056Hz)'}</span>
            </button>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Độ Thấu Quang Ngọc:</span>
                <span className="font-medium text-ink">94% (Type A Tự Nhiên)</span>
              </div>
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Đường Kính Sợi Vàng:</span>
                <span className="font-medium text-ink">0.15 mm Kéo Sợi Thủ Công</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 flex flex-col gap-3 rounded-xl border border-line/50 bg-canvas/40 p-4 sm:flex-row sm:items-center sm:justify-between text-xs text-ink/70">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-emerald-500" />
            <span>Chế tác thủ công độc bản kèm hộp lụa tơ tằm Vạn Phúc và chứng thư ngọc học hoàng gia.</span>
          </div>
          <div className="font-mono text-muted">
            Tư Vấn Trực Tiếp KTS Trưởng: <span className="text-ink font-semibold">0368 757 916</span>
          </div>
        </div>
      </div>
    </section>
  )
}
