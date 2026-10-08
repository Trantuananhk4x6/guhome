'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz jade chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface WaterDropperSize {
  id: string
  name: string
  length: string
  width: string
  height: string
  capacity: string
  jadeSource: string
  goldFiligreePattern: string
  application: string
}

const WATER_DROPPER_SIZES: readonly WaterDropperSize[] = [
  {
    id: 'dai-trieu-lo-95',
    name: 'Cỡ Đại Triệu Lộ (95x65mm)',
    length: '95 mm',
    width: '65 mm',
    height: '52 mm',
    capacity: '150 ml Nước Suối Khoáng Đỉnh Tây Côn Lĩnh',
    jadeSource: 'Ngọc Bích Phỉ Thúy Type A Myanmar Thấu Quang 95%',
    goldFiligreePattern: 'Lưỡng Long Chầu Nguyệt sợi vàng 0.15mm',
    application: 'Dùng mài mực thỏi ngự dụng trên nghiên đá Đoan Khê đại khoa hoành phi câu đối.',
  },
  {
    id: 'trung-trieu-lo-75',
    name: 'Cỡ Trung Triệu Lộ (75x52mm)',
    length: '75 mm',
    width: '52 mm',
    height: '42 mm',
    capacity: '90 ml Nước Sương Mai Đọng Lá Sen',
    jadeSource: 'Ngọc Bích Phỉ Thúy Xanh Lý Cố Đô',
    goldFiligreePattern: 'Họa tiết Thủy Ba & Mây Cuộn Triều Lê',
    application: 'Nhỏ nước tinh tế mài mực viết thi phẩm và thư từ thường nhật trên bàn gỗ Cẩm Lai.',
  },
  {
    id: 'tieu-trieu-lo-55',
    name: 'Cỡ Tiểu Triệu Lộ (55x40mm)',
    length: '55 mm',
    width: '40 mm',
    height: '32 mm',
    capacity: '45 ml Nước Giếng Ngọc Cổ Truyền',
    jadeSource: 'Ngọc Bích Băng Chủng Mịn Màng',
    goldFiligreePattern: 'Cánh Sen Triều Lý nẹp vàng 24K',
    application: 'Nhỏ từng giọt sương vi mô bên khay trà đạo thu nhỏ tao nhã.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperStudio() {
  const [selectedSize, setSelectedSize] = useState<WaterDropperSize>(WATER_DROPPER_SIZES[0]!)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
  const [isDropping, setIsDropping] = useState<boolean>(false)
  const [dropCount, setDropCount] = useState<number>(0)
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

  const handleDropWater = () => {
    setIsDropping(true)
    setDropCount((prev) => prev + 1)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
    setTimeout(() => setIsDropping(false), 500)
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
              Nghiên Nhỏ Nước Thư Họa Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Tác phẩm thủy trích cung đình chế tác từ ngọc Bích Phỉ Thúy Type A Myanmar thấu quang 95% mài gọt hình giọt sương hoa sen tao nhã, vòi rót nước nẹp dải sợi vàng 24K filigree rồng Lý 0.15mm uốn lượn ôm trọn sườn ngọc. Đặt vững chãi trên đế gỗ Cẩm Lai Nam Bộ lót nỉ nhung thượng hạng, điều tiết lưu lượng giọt nước vi mô để mài thỏi mực tàu nguyên chất đạt độ sánh mịn hoàn hảo.
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
                01 / Quy Cách Kích Thước Nghiên Nhỏ Nước
              </span>
              <span className="text-xs font-mono text-muted">Chạm khắc tinh xảo</span>
            </div>

            <p className="text-xs text-ink/70">
              Chọn kích thước nghiên nhỏ nước (Thủy Trích) để xem dung tích và công năng mài mực thư pháp:
            </p>

            {/* Size Cards */}
            <div className="grid gap-3">
              {WATER_DROPPER_SIZES.map((size) => {
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
                        {size.capacity.split(' ')[0]} {size.capacity.split(' ')[1]}
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

          {/* Right: Macro Zoom Viewer & Interactive Water Dropping */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                02 / Thử Nhỏ Nước Mài Mực & Kính Lúp Macro Soi Sợi Vàng
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

            {/* Visual Jade Dropper Preview */}
            <div className="relative h-60 rounded-xl border border-line/60 bg-gradient-to-b from-espresso/20 via-surface/60 to-surface/30 flex flex-col items-center justify-center overflow-hidden p-6">
              {/* Jade Dropper Visualizer with Zoom Effect */}
              <div
                style={{ transform: `scale(${zoomLevel > 1 ? 1 + (zoomLevel - 1) * 0.25 : 1})` }}
                className="relative flex flex-col items-center transition-transform duration-300 cursor-pointer"
                onClick={handleDropWater}
              >
                {/* Jade Dropper Body Shape */}
                <div className="relative h-20 w-24 rounded-full bg-gradient-to-br from-emerald-500/80 via-emerald-700/90 to-emerald-950 border-2 border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center">
                  {/* Spout in gold filigree */}
                  <div className="absolute -top-3 h-5 w-4 rounded-t-full bg-gradient-to-b from-amber-300 to-amber-500 border border-amber-600 shadow-sm" />
                  <span className="text-[10px] font-mono text-emerald-100 font-bold">Thủy Trích</span>
                </div>

                {/* Gold Filigree Belt */}
                <div className="h-3 w-28 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 border border-amber-600 rounded-xs shadow-md -mt-1 flex items-center justify-center">
                  <span className="text-[7px] font-mono text-amber-950 font-bold tracking-widest">
                    VÀNG 24K FILIGREE 0.15MM
                  </span>
                </div>

                {/* Rosewood Stand */}
                <div className="h-5 w-32 bg-amber-950/90 border border-amber-900/60 rounded-b-md shadow-lg flex items-center justify-center">
                  <span className="text-[8px] font-mono text-amber-300/80">Đế Cẩm Lai Nam Bộ</span>
                </div>

                {/* Animated Dropping Water Droplet */}
                <AnimatePresence>
                  {isDropping && (
                    <motion.div
                      key="water-drop"
                      initial={{ opacity: 1, y: 15, scale: 0.6 }}
                      animate={{ opacity: [1, 0.9, 0], y: 55, scale: [0.6, 1.1, 1.4] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeIn' }}
                      className="absolute bottom-0 h-3.5 w-2 rounded-full bg-cyan-300/80 border border-white shadow-[0_0_8px_rgba(34,211,238,0.8)] pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Inkstone Droplet Counter */}
              <div className="absolute bottom-2 font-mono text-[10px] text-muted flex items-center gap-2">
                <span>Số giọt nước đã nhỏ vào nghiên:</span>
                <span className="text-accent font-semibold">{dropCount} giọt</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleDropWater}
              disabled={isDropping}
              className="min-h-[44px] w-full rounded-xl bg-accent text-canvas font-medium text-xs sm:text-sm shadow-md hover:bg-accent/90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isDropping ? 'Đang Nhỏ Giọt Nước Vào Nghiên...' : 'Nhỏ Giọt Nước Mài Mực (Âm Vang 528Hz & 1056Hz)'}</span>
            </button>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Độ Thấu Quang Ngọc:</span>
                <span className="font-medium text-ink">95% (Type A Tự Nhiên)</span>
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
