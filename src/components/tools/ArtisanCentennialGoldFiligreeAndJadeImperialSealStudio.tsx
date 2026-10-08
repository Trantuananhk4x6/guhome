'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz jade chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface ImperialSealEdition {
  id: string
  name: string
  dimensions: string
  jadeType: string
  goldFiligreePattern: string
  sealInscription: string
  sealDescription: string
  weight: string
}

const IMPERIAL_SEAL_EDITIONS: readonly ImperialSealEdition[] = [
  {
    id: 'dai-trien-cuu-long-85',
    name: 'Đại Triện Cửu Long Ngự Bảo (85x85mm)',
    dimensions: '85 x 85 x 115 mm',
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Myanmar Thấu Quang 95%',
    goldFiligreePattern: 'Cửu Long Tranh Châu sợi vàng 24K đan kép 0.12mm',
    sealInscription: 'GUHOMES · BÁCH NIÊN TRUYỀN GIA BẢO',
    sealDescription: 'Khắc ngự ấn truyền gia thế hệ, dùng đóng ấn trên gia phả, hoành phi câu đối và văn tự bảo chứng di sản gia đình.',
    weight: '1.450 gram',
  },
  {
    id: 'trien-tu-quy-60',
    name: 'Triện Thư Pháp Tứ Quý Hưng Long (60x60mm)',
    dimensions: '60 x 60 x 95 mm',
    jadeType: 'Ngọc Bích Phỉ Thúy Xanh Lý Cố Đô Thượng Hạng',
    goldFiligreePattern: 'Họa tiết Tứ Quý Mai Lan Cúc Trúc nẹp vàng 24K',
    sealInscription: 'GUHOMES · THƯ PHÁP VƯƠNG TRIỀU',
    sealDescription: 'Ấn triện thư họa tao nhã, điểm dấu son chu sa trên các thi phẩm, bức thư họa đỉnh cao nơi bàn trà thất.',
    weight: '820 gram',
  },
  {
    id: 'trien-nhat-pham-45',
    name: 'Triện Lạc Khoản Nhất Phẩm Gia Phong (45x45mm)',
    dimensions: '45 x 45 x 75 mm',
    jadeType: 'Ngọc Bích Băng Chủng Tuyết Lãnh Thuần Khiết',
    goldFiligreePattern: 'Cánh Sen Triều Lý nẹp sợi vàng 24K tinh xảo',
    sealInscription: 'GUHOMES · GIA PHONG TRƯỜNG TỒN',
    sealDescription: 'Ấn lạc khoản nhỏ gọn tinh tế, đồng hành cùng gia chủ ký tặng thi phẩm và lưu dấu phong thái tao nhã.',
    weight: '460 gram',
  },
]

export function ArtisanCentennialGoldFiligreeAndJadeImperialSealStudio() {
  const [selectedEdition, setSelectedEdition] = useState<ImperialSealEdition>(IMPERIAL_SEAL_EDITIONS[0]!)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
  const [isStamping, setIsStamping] = useState<boolean>(false)
  const [hasStamped, setHasStamped] = useState<boolean>(false)
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
      gain1.gain.linearRampToValueAtTime(0.25, now + 0.03)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.0)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)
      osc1.start(now)
      osc1.stop(now + 3.05)

      // Harmonics
      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.0001, now)
      gain2.gain.linearRampToValueAtTime(0.14, now + 0.04)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.2)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)
      osc2.start(now)
      osc2.stop(now + 2.25)
    } catch {
      // Audio fallback
    }
  }

  const handleStampSeal = () => {
    setIsStamping(true)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
    setTimeout(() => {
      setIsStamping(false)
      setHasStamped(true)
    }, 450)
  }

  return (
    <section className="u-gutter my-[clamp(4.5rem,10vh,8rem)]">
      <div className="mx-auto w-full max-w-[110rem] rounded-2xl border border-line/80 bg-surface/90 p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-line/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[50rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Tác Phẩm Triện Ngọc Kỷ Niệm Sprint 100 Thế Kỷ · GuHomes Atelier 2026
            </div>
            <h2 className="u-display-sm mt-4 text-ink">
              Ấn Triện Thư Pháp Ngọc Bích Phỉ Thúy Nạm Vàng 24K Filigree
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Đỉnh cao nghệ thuật kim hoàn cung đình kết hợp ngọc học di sản: khối ngọc Bích Phỉ Thúy Type A thấu quang 95% được các nghệ nhân lão thành gọt đẽo tỷ lệ hoàng kim, bao bọc bởi đai vàng 24K kéo sợi filigree 0.12mm hình Cửu Long triều Nguyễn. Đáy ấn triện chạm khắc thủ công bằng lưỡi dao kim cương, lưu truyền gia phong và dấu ấn tôn quý cho nhiều thế hệ.
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
                  <span>Âm Vang Ngọc Khánh: Bật</span>
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
          {/* Left: Edition Selector & Specifications */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                01 / Phiên Bản Ấn Triện Truyền Gia Bảo
              </span>
              <span className="text-xs font-mono text-muted">Bảo chứng độc bản</span>
            </div>

            <p className="text-xs text-ink/70">
              Lựa chọn kích thước ấn triện ngọc bích để xem chi tiết kết cấu và văn tự triện thư tương ứng:
            </p>

            {/* Edition Cards */}
            <div className="grid gap-3">
              {IMPERIAL_SEAL_EDITIONS.map((edition) => {
                const isSelected = edition.id === selectedEdition.id
                return (
                  <button
                    key={edition.id}
                    type="button"
                    onClick={() => {
                      setSelectedEdition(edition)
                      setHasStamped(false)
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
                        {edition.name}
                      </span>
                      <span className="font-mono text-xs text-accent">
                        {edition.weight}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
                      {edition.sealDescription}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-muted">
                      <span>Kích thước: {edition.dimensions}</span>
                      <span>·</span>
                      <span className="text-accent">{edition.sealInscription}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Gemology & Gold Filigree Note */}
            <div className="rounded-lg border border-accent/30 bg-surface/70 p-4 text-xs leading-relaxed text-ink/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted uppercase">Chất Ngọc Bích:</span>
                <span className="font-medium text-ink">{selectedEdition.jadeType}</span>
              </div>
              <div className="flex items-center justify-between border-t border-line/40 pt-2">
                <span className="font-mono text-[10px] text-muted uppercase">Hoa Văn Filigree:</span>
                <span className="font-medium text-accent">{selectedEdition.goldFiligreePattern}</span>
              </div>
            </div>
          </div>

          {/* Right: Macro Zoom Viewer & Stamping Interactive Experience */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                02 / Thử Ấn Chu Sa & Kính Lúp Macro Soi Sợi Vàng
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

            {/* Visual Seal Preview & Dó Paper Surface */}
            <div className="relative h-60 rounded-xl border border-line/60 bg-[#f7f2e7] dark:bg-[#1a1815] flex flex-col items-center justify-center overflow-hidden p-6 shadow-inner">
              {/* Jade Seal Visualizer with Spring Motion */}
              <motion.div
                animate={isStamping ? { y: 28, scale: 0.95 } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ transform: `scale(${zoomLevel > 1 ? 1 + (zoomLevel - 1) * 0.25 : 1})` }}
                className="relative z-10 flex flex-col items-center cursor-pointer"
                onClick={handleStampSeal}
              >
                {/* Jade Knob / Dragon Top */}
                <div className="h-16 w-16 rounded-t-2xl bg-gradient-to-br from-emerald-600 via-emerald-800 to-teal-900 border-2 border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center">
                  <span className="text-[10px] font-mono text-emerald-100 text-center leading-tight">
                    Cửu Long<br />Ngọc Bích
                  </span>
                </div>
                {/* Gold Filigree Belt */}
                <div className="h-4 w-20 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 border border-amber-600 rounded-sm shadow-md flex items-center justify-center">
                  <span className="text-[8px] font-mono text-amber-950 font-bold tracking-widest">
                    VÀNG 24K FILIGREE
                  </span>
                </div>
                {/* Seal Base */}
                <div className="h-12 w-20 bg-gradient-to-b from-emerald-900 to-emerald-950 border-x border-b border-emerald-500/60 rounded-b-md flex items-center justify-center">
                  <span className="text-[9px] font-mono text-emerald-300">Mặt Triện Sơn Chu Sa</span>
                </div>
              </motion.div>

              {/* Dó Paper Stamped Vermilion Mark */}
              <div className="mt-3 min-h-[46px] flex items-center justify-center">
                <AnimatePresence>
                  {hasStamped && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                      className="px-5 py-2 rounded border-2 border-red-700 bg-red-600/10 shadow-[0_0_15px_rgba(220,38,38,0.25)] flex items-center gap-2"
                    >
                      <span className="font-serif text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-400">
                        [印] {selectedEdition.sealInscription}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Helper text */}
              <div className="absolute bottom-2 font-mono text-[10px] text-muted">
                {hasStamped ? 'Đã đóng dấu chu sa ngự bảo thành công.' : 'Bấm vào ấn ngọc hoặc nút bên dưới để đóng dấu triện.'}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleStampSeal}
              disabled={isStamping}
              className="min-h-[44px] w-full rounded-xl bg-accent text-canvas font-medium text-xs sm:text-sm shadow-md hover:bg-accent/90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isStamping ? 'Đang Đóng Dấu Triện Lên Giấy Dó...' : 'Đóng Dấu Triện Chu Sa Hoàng Gia (Ngân Tiếng Ngọc 528Hz & 1056Hz)'}</span>
            </button>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Độ Thấu Quang Ngọc:</span>
                <span className="font-medium text-ink">95% (Type A Tự Nhiên)</span>
              </div>
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Đường Kính Sợi Vàng:</span>
                <span className="font-medium text-ink">0.12 mm Kéo Sợi Thủ Công</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 flex flex-col gap-3 rounded-xl border border-line/50 bg-canvas/40 p-4 sm:flex-row sm:items-center sm:justify-between text-xs text-ink/70">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-emerald-500" />
            <span>Mỗi ấn triện chế tác thủ công độc bản kèm hộp gỗ Trắc Nam Bộ lót lụa tơ tằm Vạn Phúc.</span>
          </div>
          <div className="font-mono text-muted">
            Tư Vấn Trực Tiếp KTS Trưởng: <span className="text-ink font-semibold">0368 757 916</span>
          </div>
        </div>
      </div>
    </section>
  )
}
