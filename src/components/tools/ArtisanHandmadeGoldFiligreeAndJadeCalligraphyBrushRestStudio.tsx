'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz jade chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface BrushRestSize {
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

const BRUSH_REST_SIZES: readonly BrushRestSize[] = [
  {
    id: 'dai-son-24',
    name: 'Cỡ Đại Sơn Ngũ Nhạc (24cm)',
    length: '240 mm',
    width: '36 mm',
    height: '42 mm',
    slots: '5 Rãnh Gác Ngự Bút (Đại Khôi)',
    jadeSource: 'Ngọc Bích Phỉ Thúy Type A Myanmar Thấu Quang 93%',
    goldFiligreePattern: 'Lưỡng Long Chầu Nguyệt sợi vàng 0.15mm',
    application: 'Gác 5 ngự bút lông sói và lông cừu cổ thụ đại khoa hoành phi câu đối.',
  },
  {
    id: 'trung-son-17',
    name: 'Cỡ Trung Sơn Tam Đảo (17cm)',
    length: '170 mm',
    width: '32 mm',
    height: '36 mm',
    slots: '3 Rãnh Gác Thư Bút (Trung Khôi)',
    jadeSource: 'Ngọc Bích Phỉ Thúy Xanh Lý Cố Đô',
    goldFiligreePattern: 'Họa tiết Thủy Ba & Mây Cuộn Triều Lê',
    application: 'Gác 3 bút lông thỏ viết thi phẩm và thư từ thường nhật trên bàn gỗ Cẩm Lai.',
  },
  {
    id: 'tieu-son-11',
    name: 'Cỡ Tiểu Sơn Độc Đỉnh (11cm)',
    length: '110 mm',
    width: '28 mm',
    height: '28 mm',
    slots: '1 Rãnh Gác Tiểu Bút (Tiểu Khôi)',
    jadeSource: 'Ngọc Bích Băng Chủng Mịn Màng',
    goldFiligreePattern: 'Cánh Sen Triều Lý nẹp vàng 24K',
    application: 'Gác bút tỉa ngự bút tinh tế bên khay trà đạo thu nhỏ.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestStudio() {
  const [selectedSize, setSelectedSize] = useState<BrushRestSize>(BRUSH_REST_SIZES[0]!)
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
      gain1.gain.linearRampToValueAtTime(0.22, now + 0.03)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)
      osc1.start(now)
      osc1.stop(now + 2.85)

      // Jade harmonic tone
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

  const handlePlaceBrush = () => {
    setPlacedBrush(true)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
    setTimeout(() => setPlacedBrush(false), 800)
  }

  return (
    <section className="u-gutter my-[clamp(4.5rem,10vh,8rem)]">
      <div className="mx-auto w-full max-w-[110rem] rounded-2xl border border-line/80 bg-surface/90 p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-line/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[48rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Tác Phẩm Thư Phòng Hoàng Gia · GuHomes Atelier 2026
            </div>
            <h2 className="u-display-sm mt-4 text-ink">
              Gác Bút Thư Pháp Ngọc Bích Phỉ Thúy & Vàng 24K Filigree Hoàng Triều
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Được chế tác từ khối ngọc Bích Phỉ Thúy Type A Myanmar dày 26mm đẽo tạo hình 5 đỉnh núi Ngũ Hành Sơn thấu quang ngọc 93%. Khung viền nẹp sợi vàng 24K filigree rồng Lý 0.15mm uốn thủ công, đế nỉ nhung lót gỗ Cẩm Lai Nam Bộ chống trầy xước mặt bàn làm việc.
            </p>
          </div>

          {/* Sound Toggle */}
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
                01 / Chọn Quy Cách Gác Bút Thư Phòng
              </span>
              <span className="text-xs font-mono text-muted">Văn Phòng Tứ Bảo</span>
            </div>

            {/* Sizes */}
            <div className="flex flex-col gap-3">
              {BRUSH_REST_SIZES.map((sz) => {
                const isCur = sz.id === selectedSize.id
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => {
                      setSelectedSize(sz)
                      playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
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
                        {sz.slots}
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
              <div className="text-xs font-mono text-muted">Phẩm cấp ngọc bích:</div>
              <div className="mt-1 text-xs font-medium text-ink">
                {selectedSize.jadeSource}
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
              <span className="text-xs font-mono text-muted">Ngọc Phỉ Thúy Type A</span>
            </div>

            {/* Macro Stage Canvas */}
            <div className="relative rounded-xl border border-line/60 bg-espresso/10 p-6 flex flex-col items-center justify-center overflow-hidden min-h-[220px]">
              {/* Jade Brush Rest Mountain Representation */}
              <motion.div
                animate={{
                  scale: zoomLevel === 1 ? 1 : zoomLevel === 2 ? 1.3 : zoomLevel === 3 ? 1.7 : 2.1,
                  y: placedBrush ? 6 : 0,
                }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className="relative h-16 w-60 rounded-t-xl border-2 border-emerald-400/60 bg-gradient-to-r from-emerald-100/90 via-emerald-300/80 to-emerald-50/95 shadow-2xl flex items-center justify-around px-3"
              >
                {/* 5 Peaks Simulation */}
                <div className="h-10 w-6 rounded-t-md bg-emerald-500/40 border border-emerald-400/80" />
                <div className="h-14 w-6 rounded-t-md bg-emerald-600/40 border border-emerald-400/80" />
                <div className="h-12 w-6 rounded-t-md bg-emerald-500/40 border border-emerald-400/80" />
                <div className="h-8 w-6 rounded-t-md bg-emerald-400/40 border border-emerald-400/80" />
                <div className="h-6 w-6 rounded-t-md bg-emerald-300/40 border border-emerald-400/80" />

                {/* Filigree Wire Simulation */}
                <div className="absolute inset-x-2 bottom-1 h-2 rounded-xs border-t border-dashed border-amber-600/80" />
                <div className="absolute bottom-0 inset-x-0 h-1 rounded-b-md bg-amber-950/80" />
              </motion.div>

              {placedBrush && (
                <span className="absolute bottom-2 text-xs font-mono text-accent animate-pulse">
                  *Đã gác bút lông êm ái trên rãnh ngọc Phỉ Thúy*
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
                      playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
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
              onClick={handlePlaceBrush}
              className="min-h-[44px] w-full rounded-full border border-accent bg-accent/15 hover:bg-accent hover:text-canvas text-ink font-display text-xs font-medium tracking-wide transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Thử Gác Bút Lông Lên Rãnh Ngọc</span>
              <span className="font-mono text-[10px] text-accent-soft">(Phát Âm Ngọc 528Hz)</span>
            </button>

            {/* Craftsmanship Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Chất liệu ngọc:</span>
                <span className="font-semibold text-ink mt-0.5 block truncate">Phỉ Thúy Type A Tự Nhiên</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Độ thấu quang:</span>
                <span className="font-semibold text-accent mt-0.5 block">93% Ánh Sáng Xuyên Thấu</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Khung nẹp vàng:</span>
                <span className="font-semibold text-ink mt-0.5 block">Vàng 24K Sợi 0.15mm</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Đế lót chống trầy:</span>
                <span className="font-semibold text-ink mt-0.5 block">Gỗ Cẩm Lai & Nỉ Nhung</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line/60 pt-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            <span>Mỗi tác phẩm gác bút ngự chế khắc triện số hóa độc bản, đi kèm hộp gấm nhung hoàng gia.</span>
          </div>
          <div className="font-mono text-ink/75">
            Xưởng may đo Thạnh Xuân: <span className="font-bold text-accent">0368 757 916</span> · GuHomes
          </div>
        </div>
      </div>
    </section>
  )
}
