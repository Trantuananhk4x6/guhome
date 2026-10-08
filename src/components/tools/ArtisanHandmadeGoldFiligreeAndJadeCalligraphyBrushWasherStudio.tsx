'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz jade chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface BrushWasherSpec {
  id: string
  name: string
  diameter: string
  depth: string
  capacity: string
  jadeType: string
  goldFiligreePattern: string
  baseWood: string
  application: string
}

const BRUSH_WASHER_SPECS: readonly BrushWasherSpec[] = [
  {
    id: 'dai-bon-cung-dinh-180',
    name: 'Đại Bồn Cung Đình (Ø180mm x Sâu 75mm)',
    diameter: '180 mm',
    depth: '75 mm',
    capacity: '650 ml Nước Suối Khoáng Đỉnh Tây Côn Lĩnh',
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Myanmar Thấu Quang 95%',
    goldFiligreePattern: 'Lưỡng Long Chầu Nguyệt sợi vàng 24K 0.15mm',
    baseWood: 'Gỗ Mun Hoa Khánh Hòa Bách Niên Bào Mộng Cổ',
    application: 'Thanh tẩy bút lông sói đại khoa dùng trong viết hoành phi, khánh vàng đại trạch.',
  },
  {
    id: 'trung-bon-thien-thu-140',
    name: 'Trung Bồn Thiền Thư (Ø140mm x Sâu 60mm)',
    diameter: '140 mm',
    depth: '60 mm',
    capacity: '420 ml Nước Giếng Ngọc Cố Đô Thanh Khiết',
    jadeType: 'Ngọc Bích Xanh Lý Sơn Thủy Thấu Sáng',
    goldFiligreePattern: 'Hoa Sen Tây Hồ Triều Lý nẹp sợi vàng 0.15mm',
    baseWood: 'Gỗ Trắc Đỏ Nam Bộ Bách Niên Khảm Xà Cừ',
    application: 'Rửa sạch bút lông thỏ ngự dụng sau các phiên chép kinh thư, thi phẩm thiền định.',
  },
  {
    id: 'tieu-bon-tra-that-105',
    name: 'Tiểu Bồn Trà Thất (Ø105mm x Sâu 45mm)',
    diameter: '105 mm',
    depth: '45 mm',
    capacity: '220 ml Nước Sương Mai Đọng Lá Sen',
    jadeType: 'Bạch Ngọc Băng Chủng Mịn Như Mỡ Cừu',
    goldFiligreePattern: 'Vân Mây Cuộn Triều Lê nẹp vàng 24K thủ công',
    baseWood: 'Hoàng Đàn Tuyết Lạng Sơn Lưu Hương Ngàn Năm',
    application: 'Dùng bên bàn trà đạo nhỏ, thanh tẩy bút lông cừu viết tiểu khải tao nhã.',
  },
]

interface AntiqueCalligraphyBrush {
  id: string
  name: string
  bristleType: string
  handleMaterial: string
  usage: string
}

const ANTIQUE_BRUSHES: readonly AntiqueCalligraphyBrush[] = [
  {
    id: 'but-long-soi-dai-khoa',
    name: 'Bút Lông Sói Đại Khoa Triều Nguyễn',
    bristleType: 'Lông sói tuyết phương Bắc đàn hồi cực cao',
    handleMaterial: 'Gỗ Trắc đỏ nẹp đốt trúc vàng 24K',
    usage: 'Viết đại tự, trung tự với lực ấn bút mạnh mẽ, nét mực sắc sảo',
  },
  {
    id: 'but-long-tho-ngu-but',
    name: 'Bút Lông Thỏ Ngự Bút Châu Bản',
    bristleType: 'Lông thỏ tía mùa thu mềm mại và tụ đỉnh nhọn',
    handleMaterial: 'Ngọc bích thấu quang phối sừng trâu cổ',
    usage: 'Chép châu bản ngự phê, thi văn tiểu khải nét chữ thanh mảnh',
  },
  {
    id: 'but-long-cuu-thien-thu',
    name: 'Bút Lông Cừu Thiền Thư Dưỡng Tính',
    bristleType: 'Lông cừu non ngậm mực dồi dào, nét bút tròn trịa',
    handleMaterial: 'Gỗ Mun hoa Khánh Hòa khảm xà cừ',
    usage: 'Viết thư pháp thiền, nét thảo thư phóng khoáng bay bổng',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushWasherStudio() {
  const [selectedWasher, setSelectedWasher] = useState<BrushWasherSpec>(BRUSH_WASHER_SPECS[0]!)
  const [selectedBrush, setSelectedBrush] = useState<AntiqueCalligraphyBrush>(ANTIQUE_BRUSHES[0]!)
  const [isWashing, setIsWashing] = useState<boolean>(false)
  const [washCount, setWashCount] = useState<number>(0)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
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

      // Harmonic overtone
      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.0001, now)
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.05)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.2)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)
      osc2.start(now)
      osc2.stop(now + 2.25)
    } catch {
      // Audio playback silently ignored if blocked by browser policy
    }
  }

  const handleSelectWasher = (item: BrushWasherSpec) => {
    setSelectedWasher(item)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
  }

  const handleSelectBrush = (brush: AntiqueCalligraphyBrush) => {
    setSelectedBrush(brush)
    playJadeChime(HARMONIC_1056HZ, HARMONIC_528HZ * 1.5)
  }

  const handleWashBrush = () => {
    setIsWashing(true)
    setWashCount((prev) => prev + 1)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
    setTimeout(() => {
      setIsWashing(false)
    }, 1800)
  }

  return (
    <section className="relative overflow-hidden bg-[#0c0a08] py-20 text-[#eae4dd] border-t border-[#33251c]">
      {/* Background Accent Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.06),transparent_70%)]" />
      <div className="pointer-events-none absolute -top-24 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.05),transparent_70%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#d4a853]">
            Văn Phòng Tứ Bảo Cao Cấp · Chế Tác Thủ Công GuHomes
          </div>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-[#f7f3ee] sm:text-4xl lg:text-5xl">
            Atelier Bồn Rửa Bút Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b8a898] sm:text-base">
            Kiệt tác bút tẩy cung đình mài thủ công từ phiến Ngọc Bích Phỉ Thúy Type A thấu quang 95%, viền miệng nẹp sợi vàng
            ròng 24K filigree rồng sen sóng nước 0.15mm và tọa lạc trên bệ Mun hoa Khánh Hòa, giữ cho ngọn bút ngàn năm luôn tụ đỉnh tinh anh.
          </p>

          {/* Sound Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                const nextState = !soundEnabled
                setSoundEnabled(nextState)
                if (nextState) playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#523d2e] bg-[#1a120c] px-4 py-2 text-xs text-[#d4a853] transition-colors hover:border-[#d4a853]"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#d4a853]" />
                  <span>Âm Ba Khánh Ngọc Bích 528Hz & 1056Hz Đang Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#8a7663]" />
                  <span>Bật Âm Ba Khánh Ngọc Bích & Chuông Vàng (528Hz - 1056Hz)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Visual Brush Washer Showcase & Interactive Wash Simulation */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-[#443022] bg-[#150e0a]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d1f16] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4a853]">Tạo Tác Kim Hoàn & Thạch Nghệ</span>
                  <h3 className="font-serif text-xl font-medium text-[#f5efe6] sm:text-2xl">
                    {selectedWasher.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#5c402d] bg-[#22160e] px-3 py-1.5 text-xs text-[#d4a853]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#10b981]" />
                  <span>Ngọc Bích Thấu Quang 95%</span>
                </div>
              </div>

              {/* Graphic Stage with Macro Zoom */}
              <div className="relative my-8 flex h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-[#382618] bg-gradient-to-b from-[#1c130b] to-[#0c0805] p-6 text-center">
                {/* Visual Representation of Jade Bowl & Brush */}
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {/* Antique Calligraphy Brush dipped into water */}
                  <motion.div
                    animate={
                      isWashing
                        ? { y: [0, 18, 0, 14, 0], rotate: [0, -6, 6, -3, 0] }
                        : { y: 0, rotate: 0 }
                    }
                    transition={{ duration: 1.6, ease: 'easeInOut' }}
                    className="relative z-20 -mb-4 flex flex-col items-center"
                  >
                    {/* Brush Shaft */}
                    <div className="h-16 w-3 rounded-t-sm border border-[#6b4226] bg-gradient-to-b from-[#4a2e1b] to-[#2d1b0f]" />
                    {/* Brush Bristle Tip */}
                    <div className="h-6 w-4 rounded-b-full bg-gradient-to-b from-[#333333] to-[#111111] shadow-md" />
                  </motion.div>

                  {/* Water ink dispersion effect when washing */}
                  {isWashing && (
                    <motion.div
                      initial={{ scale: 0.2, opacity: 0.9 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute z-15 h-12 w-12 rounded-full bg-[#111111]/70 blur-sm"
                    />
                  )}

                  {/* Jade Brush Washer Bowl Body */}
                  <div className="relative z-10 flex h-24 w-48 flex-col items-center justify-center rounded-b-full border-4 border-[#d4a853] bg-gradient-to-b from-[#047857]/80 via-[#065f46]/90 to-[#022c22] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <span className="text-[10px] uppercase tracking-widest text-[#d4a853] font-serif font-bold">24K FILIGREE</span>
                    <span className="text-[10px] text-[#a7f3d0] font-mono">{selectedWasher.diameter}</span>
                  </div>

                  {/* Wooden Base */}
                  <div className="relative z-0 -mt-1 h-5 w-40 rounded-b-md border-t border-[#654321] bg-gradient-to-r from-[#2b1810] via-[#3a2016] to-[#20120b] shadow-inner flex items-center justify-center">
                    <span className="text-[9px] text-[#a8927d] uppercase tracking-wider">{selectedWasher.baseWood}</span>
                  </div>
                </motion.div>

                {/* Status Indicator */}
                <div className="relative z-10 mt-6 text-xs text-[#b8a898]">
                  Trạng thái thanh tẩy bút: <strong className="text-[#f5efe6]">{isWashing ? 'Đang Nhúng Rửa Bút Lông Trong Suối Khoáng...' : `Sẵn Sàng (Đã Rửa ${washCount} Lần)`}</strong>
                </div>
              </div>

              {/* Controls: Zoom & Wash Brush Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#2d1f16] pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#a8927d]">Macro Zoom Soi Vân Ngọc:</span>
                  {[1, 2, 4].map((zoom) => (
                    <button
                      key={zoom}
                      onClick={() => {
                        setZoomLevel(zoom)
                        playJadeChime(HARMONIC_528HZ * (zoom * 0.5), HARMONIC_1056HZ)
                      }}
                      className={`rounded px-3 py-1 text-xs font-semibold transition-colors ${
                        zoomLevel === zoom
                          ? 'bg-[#d4a853] text-[#1a120c]'
                          : 'border border-[#443022] bg-[#1a120c] text-[#a8927d] hover:border-[#d4a853]'
                      }`}
                    >
                      {zoom}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleWashBrush}
                  disabled={isWashing}
                  className="rounded-lg border border-[#d4a853] bg-[#22160e] px-4 py-2 text-xs font-medium text-[#d4a853] transition-colors hover:bg-[#d4a853]/15 disabled:opacity-50"
                >
                  {isWashing ? 'Đang Rửa Sạch Lông Bút...' : 'Nhúng Rửa Bút Lông Cổ'}
                </button>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#2d1f16] pt-6 text-center">
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Đường Kính</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">{selectedWasher.diameter}</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Chất Ngọc</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#10b981]">Type A 95%</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Nẹp Miệng Vàng</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#d4a853]">24K Filigree 0.15mm</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Đế Mộc</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">Mun Hoa / Trắc Đỏ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Washer Sizes & Antique Brush Selector */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Washer Selector */}
            <div className="rounded-2xl border border-[#443022] bg-[#150e0a]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <h3 className="font-serif text-lg font-medium text-[#f5efe6] uppercase tracking-wider">
                Quy Cách Bồn Rửa Bút Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#a8927d]">
                Chọn quy cách bồn rửa bút phù hợp với kích thước án thư và loại bút lông ngự dụng.
              </p>

              <div className="mt-5 space-y-3">
                {BRUSH_WASHER_SPECS.map((spec) => {
                  const isSelected = spec.id === selectedWasher.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleSelectWasher(spec)}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-[#d4a853] bg-[#291b11] shadow-[0_0_15px_rgba(212,168,83,0.15)]'
                          : 'border-[#332216] bg-[#1a120c] hover:border-[#523d2e]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-[#f5efe6]">{spec.name}</span>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#d4a853]" />}
                      </div>
                      <div className="mt-1 text-xs text-[#10b981]">{spec.jadeType}</div>
                      <div className="mt-1 text-[11px] text-[#b8a898]">
                        Dung tích: <strong className="text-[#f5efe6]">{spec.capacity}</strong>
                      </div>
                      <div className="mt-1 text-[11px] text-[#8a7663]">
                        Ứng dụng: {spec.application}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Antique Calligraphy Brush Collection Picker */}
              <div className="mt-8 border-t border-[#2d1f16] pt-6">
                <h4 className="font-serif text-sm font-medium uppercase tracking-wider text-[#d4a853]">
                  Bút Lông Cổ Ngự Dụng Tương Thích
                </h4>
                <div className="mt-3 space-y-2">
                  {ANTIQUE_BRUSHES.map((brush) => {
                    const isSelected = brush.id === selectedBrush.id
                    return (
                      <button
                        key={brush.id}
                        onClick={() => handleSelectBrush(brush)}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          isSelected
                            ? 'border-[#d4a853] bg-[#22160e]'
                            : 'border-[#332216] bg-[#110b07] hover:border-[#4d3524]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-[#f5efe6]">
                          <span>{brush.name}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-[#a8927d]">{brush.bristleType}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Artisan Note */}
              <div className="mt-6 rounded-xl border border-[#523d2e]/40 bg-[#1e140d]/60 p-4 text-xs leading-relaxed text-[#b8a898]">
                <strong className="text-[#d4a853]">Chứng thư nghệ nhân GuHomes:</strong> Lòng bồn ngọc Bích Phỉ Thúy được
                mài bóng gương tuyệt đối, giúp rửa sạch hoàn toàn mực đọng sâu trong chân lông bút mà không làm gãy rụng sợi lông,
                được chế tác thủ công độc bản tại xưởng may đo Thạnh Xuân 1.200m².
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
