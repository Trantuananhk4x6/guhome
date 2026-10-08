'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz jade chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface BrushStandSpec {
  id: string
  name: string
  height: string
  width: string
  hookCount: number
  jadeType: string
  goldFiligreePattern: string
  baseWood: string
  application: string
}

const BRUSH_STAND_SPECS: readonly BrushStandSpec[] = [
  {
    id: 'cuu-long-cung-dinh-360',
    name: 'Cửu Long Cung Đình (Cao 360mm · 9 Móc Treo)',
    height: '360 mm',
    width: '260 mm',
    hookCount: 9,
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Myanmar Thấu Quang 95%',
    goldFiligreePattern: 'Mây Phượng Triều Lý nẹp sợi vàng 24K 0.15mm',
    baseWood: 'Gỗ Mun Hoa Khánh Hòa Bách Niên Bào Mộng Cổ',
    application: 'Treo toàn bộ bộ sưu tập bút lông đại khoa, ngự bút trong đại thư phòng đại trạch.',
  },
  {
    id: 'that-tinh-thien-thu-300',
    name: 'Thất Tinh Thiền Thư (Cao 300mm · 7 Móc Treo)',
    height: '300 mm',
    width: '210 mm',
    hookCount: 7,
    jadeType: 'Ngọc Bích Xanh Lý Sơn Thủy Thấu Sáng',
    goldFiligreePattern: 'Cánh Sen Tây Hồ Triều Lý sợi vàng 0.15mm',
    baseWood: 'Gỗ Trắc Đỏ Nam Bộ Bách Niên Khảm Xà Cừ',
    application: 'Treo bút lông thỏ và lông cừu chép kinh thư, thi phẩm thiền định riêng tư.',
  },
  {
    id: 'ngu-phuc-tra-that-240',
    name: 'Ngũ Phúc Trà Thất (Cao 240mm · 5 Móc Treo)',
    height: '240 mm',
    width: '160 mm',
    hookCount: 5,
    jadeType: 'Bạch Ngọc Băng Chủng Mịn Như Mỡ Cừu',
    goldFiligreePattern: 'Vân Mây Cuộn Triều Lê nẹp vàng 24K thủ công',
    baseWood: 'Hoàng Đàn Tuyết Lạng Sơn Lưu Hương Ngàn Năm',
    application: 'Treo các loại tiểu bút lông viết tiểu khải trên bàn trà đạo nhỏ gọn thanh nhã.',
  },
]

interface HangingBrush {
  id: string
  name: string
  bristle: string
  handle: string
  isHung: boolean
}

const INITIAL_HANGING_BRUSHES: readonly HangingBrush[] = [
  {
    id: 'but-long-soi-dai-tu',
    name: 'Bút Lông Sói Đại Tự',
    bristle: 'Lông sói tuyết đàn hồi cao',
    handle: 'Gỗ Trắc đỏ nẹp vàng 24K',
    isHung: true,
  },
  {
    id: 'but-long-tho-ngu-but',
    name: 'Bút Lông Thỏ Ngự Bút',
    bristle: 'Lông thỏ tía mùa thu',
    handle: 'Ngọc bích thấu quang',
    isHung: true,
  },
  {
    id: 'but-long-cuu-thien-thu',
    name: 'Bút Lông Cừu Thiền Thư',
    bristle: 'Lông cừu non ngậm mực',
    handle: 'Gỗ Mun hoa Khánh Hòa',
    isHung: true,
  },
  {
    id: 'but-long-chon-tinh-xao',
    name: 'Bút Lông Chồn Tinh Xảo',
    bristle: 'Lông chồn đuôi đỏ phương Bắc',
    handle: 'Sừng trâu cổ khảm xà cừ',
    isHung: false,
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushStandBarStudio() {
  const [selectedStand, setSelectedStand] = useState<BrushStandSpec>(BRUSH_STAND_SPECS[0]!)
  const [brushes, setBrushes] = useState<HangingBrush[]>(INITIAL_HANGING_BRUSHES as HangingBrush[])
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

  const handleSelectStand = (item: BrushStandSpec) => {
    setSelectedStand(item)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
  }

  const toggleBrushHang = (id: string) => {
    setBrushes((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isHung: !b.isHung } : b))
    )
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
  }

  const hungCount = brushes.filter((b) => b.isHung).length

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
            Atelier Giá Treo Bút Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b8a898] sm:text-base">
            Bảo vật nâng niu những ngọn bút lông ngự dụng, đẽo gọt từ cột Ngọc Bích Phỉ Thúy Type A thấu quang 95%,
            các móc treo uốn từ sợi vàng ròng 24K filigree mây phượng triều Lý 0.15mm và tọa lạc trên bệ Mun hoa Khánh Hòa,
            giúp giữ cho ngọn bút luôn thẳng tắp và trường tồn qua năm tháng.
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
          {/* Left Column: Visual Brush Stand Showcase & Interactive Stage */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-[#443022] bg-[#150e0a]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d1f16] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4a853]">Tạo Tác Kim Hoàn & Thạch Nghệ</span>
                  <h3 className="font-serif text-xl font-medium text-[#f5efe6] sm:text-2xl">
                    {selectedStand.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#5c402d] bg-[#22160e] px-3 py-1.5 text-xs text-[#d4a853]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#10b981]" />
                  <span>Ngọc Bích Thấu Quang 95%</span>
                </div>
              </div>

              {/* Graphic Stage with Macro Zoom */}
              <div className="relative my-8 flex h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-[#382618] bg-gradient-to-b from-[#1c130b] to-[#0c0805] p-6 text-center">
                {/* Visual Representation of Jade Stand & Hanging Brushes */}
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {/* Top Bar with Gold Hooks */}
                  <div className="relative z-10 flex h-6 w-56 items-center justify-around rounded-sm border-2 border-[#d4a853] bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#064e3b] shadow-md px-2">
                    <span className="text-[9px] uppercase tracking-widest text-[#d4a853] font-serif font-bold">24K FILIGREE</span>
                    <span className="text-[9px] text-[#a7f3d0] font-mono">{selectedStand.height}</span>
                  </div>

                  {/* Hanging Brushes Container */}
                  <div className="relative z-20 flex w-48 justify-around pt-1">
                    {brushes.map((b) => (
                      <div key={b.id} className="flex flex-col items-center">
                        <AnimatePresence>
                          {b.isHung && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              transition={{ duration: 0.3 }}
                              className="flex flex-col items-center"
                            >
                              <div className="h-2 w-0.5 bg-[#d4a853]" />
                              <div className="h-12 w-2 rounded-t-sm border border-[#5a3820] bg-gradient-to-b from-[#3a2012] to-[#201209]" />
                              <div className="h-5 w-2.5 rounded-b-full bg-gradient-to-b from-[#333333] to-[#111111]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Jade Pillar */}
                  <div className="relative z-0 -mt-20 h-28 w-6 rounded-sm border border-[#d4a853]/70 bg-gradient-to-b from-[#047857]/90 via-[#065f46] to-[#047857]/90 shadow-inner" />

                  {/* Wooden Base */}
                  <div className="relative z-10 -mt-1 h-5 w-44 rounded-md border-t border-[#654321] bg-gradient-to-r from-[#2b1810] via-[#3a2016] to-[#20120b] shadow-md flex items-center justify-center">
                    <span className="text-[9px] text-[#a8927d] uppercase tracking-wider">{selectedStand.baseWood}</span>
                  </div>
                </motion.div>

                {/* Status Indicator */}
                <div className="relative z-10 mt-6 text-xs text-[#b8a898]">
                  Trạng thái giá treo: <strong className="text-[#f5efe6]">Đang Treo {hungCount} / {selectedStand.hookCount} Bút Lông Cung Đình</strong>
                </div>
              </div>

              {/* Controls: Zoom & Hanging Brushes Actions */}
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

                <div className="text-xs text-[#a8927d]">
                  Bấm bút bên phải để treo / nhấc bút khỏi giá
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#2d1f16] pt-6 text-center">
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Chiều Cao</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">{selectedStand.height}</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Chất Ngọc</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#10b981]">Type A 95%</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Móc Treo Vàng</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#d4a853]">24K Filigree 0.15mm</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Đế Mộc</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">Mun Hoa / Trắc Đỏ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stand Specs & Brush Hanging Toggles */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Stand Selector */}
            <div className="rounded-2xl border border-[#443022] bg-[#150e0a]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <h3 className="font-serif text-lg font-medium text-[#f5efe6] uppercase tracking-wider">
                Quy Cách Giá Treo Bút Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#a8927d]">
                Chọn quy cách giá treo phù hợp với kích thước án thư và số lượng bút lông ngự dụng.
              </p>

              <div className="mt-5 space-y-3">
                {BRUSH_STAND_SPECS.map((spec) => {
                  const isSelected = spec.id === selectedStand.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleSelectStand(spec)}
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
                        Số móc treo: <strong className="text-[#f5efe6]">{spec.hookCount} móc vàng 24K</strong>
                      </div>
                      <div className="mt-1 text-[11px] text-[#8a7663]">
                        Ứng dụng: {spec.application}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Hanging Brush Collection Toggles */}
              <div className="mt-8 border-t border-[#2d1f16] pt-6">
                <h4 className="font-serif text-sm font-medium uppercase tracking-wider text-[#d4a853]">
                  Danh Sách Bút Lông Cung Đình
                </h4>
                <div className="mt-3 space-y-2">
                  {brushes.map((brush) => (
                    <button
                      key={brush.id}
                      onClick={() => toggleBrushHang(brush.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors flex items-center justify-between ${
                        brush.isHung
                          ? 'border-[#d4a853] bg-[#22160e]'
                          : 'border-[#332216] bg-[#110b07] hover:border-[#4d3524]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-medium text-[#f5efe6]">{brush.name}</div>
                        <div className="mt-0.5 text-[10px] text-[#a8927d]">{brush.bristle}</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${brush.isHung ? 'bg-[#d4a853]/20 text-[#d4a853]' : 'bg-[#221a14] text-[#8a7663]'}`}>
                        {brush.isHung ? 'Đang Treo' : 'Đã Nhấc Ra'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Artisan Note */}
              <div className="mt-6 rounded-xl border border-[#523d2e]/40 bg-[#1e140d]/60 p-4 text-xs leading-relaxed text-[#b8a898]">
                <strong className="text-[#d4a853]">Chứng thư nghệ nhân GuHomes:</strong> Cột trụ ngọc Bích Phỉ Thúy được
                tiện thủ công nguyên khối và nẹp các móc treo vàng ròng 24K filigree 0.15mm uốn lượn tinh xảo tại xưởng may đo Thạnh Xuân 1.200m²,
                giúp ngọn bút lông luôn rủ thẳng tự nhiên, không bao giờ bị cong tòe ngọn bút.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
