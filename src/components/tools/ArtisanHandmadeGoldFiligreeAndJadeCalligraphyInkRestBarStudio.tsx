'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz jade chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface InkRestSpec {
  id: string
  name: string
  length: string
  width: string
  height: string
  jadeType: string
  goldFiligreePattern: string
  baseWood: string
  application: string
}

const INK_REST_SPECS: readonly InkRestSpec[] = [
  {
    id: 'dai-ban-cung-dinh-200',
    name: 'Đại Bản Cung Đình (200x38x18mm)',
    length: '200 mm',
    width: '38 mm',
    height: '18 mm',
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Myanmar Thấu Quang 95%',
    goldFiligreePattern: 'Thần Quy & Hà Đồ viền sợi vàng 24K 0.15mm',
    baseWood: 'Gỗ Mun Hoa Khánh Hòa Bách Niên Bào Mộng Cổ',
    application: 'Kê đỡ thỏi mực Tùng Yên đại khoa trong các phiên viết hoành phi, khánh vàng đại trạch.',
  },
  {
    id: 'trung-ban-thien-thu-160',
    name: 'Trung Bản Thiền Thư (160x32x16mm)',
    length: '160 mm',
    width: '32 mm',
    height: '16 mm',
    jadeType: 'Ngọc Bích Xanh Lý Sơn Thủy Thấu Sáng',
    goldFiligreePattern: 'Hoa Sen Tây Hồ Triều Lý sợi vàng 0.15mm',
    baseWood: 'Gỗ Trắc Đỏ Bách Niên Khảm Xà Cừ Ngũ Sắc',
    application: 'Bảo quản thỏi mực ngự dụng trong thư phòng thiền định, viết thi phẩm và thư từ riêng tư.',
  },
  {
    id: 'nha-ban-tra-that-120',
    name: 'Nhã Bản Trà Thất (120x26x14mm)',
    length: '120 mm',
    width: '26 mm',
    height: '14 mm',
    jadeType: 'Bạch Ngọc Băng Chủng Mịn Như Mỡ Cừu',
    goldFiligreePattern: 'Vân Mây Cuộn Triều Lê nẹp vàng 24K thủ công',
    baseWood: 'Hoàng Đàn Tuyết Lạng Sơn Lưu Hương Ngàn Năm',
    application: 'Đặt thỏi mực chu sa son đỏ trên bàn trà đạo, chấm son điểm duyệt thi thư tao nhã.',
  },
]

interface AntiqueInkStick {
  id: string
  title: string
  era: string
  mineralComposition: string
  colorHue: string
  fragrance: string
}

const ANTIQUE_INK_STICKS: readonly AntiqueInkStick[] = [
  {
    id: 'muc-tung-yen-rong-vang',
    title: 'Thỏi Mực Tùng Yên Khắc Rồng Vàng',
    era: 'Triều Nguyễn Thế Kỷ 19 Phục Dựng',
    mineralComposition: 'Khói bồ hóng thông già ngàn năm quyện xạ hương tự nhiên và cao da trâu',
    colorHue: 'Sắc đen huyền sâu thẳm, óng ánh ánh xanh tím quý phái',
    fragrance: 'Hương trầm tùng bách thơm mát tĩnh tâm',
  },
  {
    id: 'muc-chu-sa-hoang-gia',
    title: 'Thỏi Mực Chu Sa Hoàng Gia Son Đỏ',
    era: 'Bảo Vật Ngự Bút Châu Bản',
    mineralComposition: 'Khoáng thạch chu sa thiên nhiên tán nhuyễn phối mật ong rừng và bột ngọc trai',
    colorHue: 'Sắc đỏ son chu sa tươi tắn, không phai màu qua hàng trăm năm',
    fragrance: 'Thảo mộc thanh khiết giải trừ uế khí',
  },
  {
    id: 'muc-dau-yen-hac-kim',
    title: 'Thỏi Mực Dầu Yên Hắc Kim Thượng Hạng',
    era: 'Thủ Công Phường Gốm Cổ Thăng Long',
    mineralComposition: 'Bồ hóng dầu trẩu tinh luyện kết tinh cùng keo hươu truyền thống',
    colorHue: 'Màu đen kịt bóng bẩy như đá hắc diệu thạch',
    fragrance: 'Hương nhài tây dịu nhẹ vương vấn giấy xuyến chỉ',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyInkRestBarStudio() {
  const [selectedRest, setSelectedRest] = useState<InkRestSpec>(INK_REST_SPECS[0]!)
  const [selectedInk, setSelectedInk] = useState<AntiqueInkStick>(ANTIQUE_INK_STICKS[0]!)
  const [isInkPlaced, setIsInkPlaced] = useState<boolean>(true)
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
      // Audio playback silently ignored if blocked by autoplay policy
    }
  }

  const handleSelectRest = (item: InkRestSpec) => {
    setSelectedRest(item)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
  }

  const handleSelectInk = (ink: AntiqueInkStick) => {
    setSelectedInk(ink)
    setIsInkPlaced(true)
    playJadeChime(HARMONIC_1056HZ, HARMONIC_528HZ * 1.5)
  }

  const toggleInkPlacement = () => {
    setIsInkPlaced(!isInkPlaced)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
  }

  return (
    <section className="relative overflow-hidden bg-[#0c0a08] py-20 text-[#eae4dd] border-t border-[#33251c]">
      {/* Background Accent Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.06),transparent_70%)]" />
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.04),transparent_70%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#d4a853]">
            Văn Phòng Tứ Bảo Cao Cấp · Chế Tác Thủ Công GuHomes
          </div>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-[#f7f3ee] sm:text-4xl lg:text-5xl">
            Atelier Thanh Kê Thỏi Mực Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b8a898] sm:text-base">
            Bảo vật nâng đỡ thỏi mực cổ truyền, đẽo gọt từ phiến Ngọc Bích Phỉ Thúy Type A mài phẳng tuyệt đối thấu quang 95%,
            viền nẹp sợi vàng ròng 24K filigree uốn tay tinh xảo và tọa lạc trên bệ Mun hoa Khánh Hòa bào mộng ngàn năm.
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
          {/* Left Column: Visual Ink Rest Showcase & Interactive Rest Simulation */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-[#443022] bg-[#150e0a]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d1f16] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4a853]">Tạo Tác Kim Hoàn & Thạch Nghệ</span>
                  <h3 className="font-serif text-xl font-medium text-[#f5efe6] sm:text-2xl">
                    {selectedRest.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#5c402d] bg-[#22160e] px-3 py-1.5 text-xs text-[#d4a853]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#10b981]" />
                  <span>Ngọc Bích Thấu Quang 95%</span>
                </div>
              </div>

              {/* Graphic Stage with Macro Zoom */}
              <div className="relative my-8 flex h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-[#382618] bg-gradient-to-b from-[#1c130b] to-[#0c0805] p-6 text-center">
                {/* Visual Representation of Jade Bar & Ink Stick */}
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {/* Antique Ink Stick resting on the bar */}
                  <AnimatePresence>
                    {isInkPlaced && (
                      <motion.div
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-20 -mb-2 flex h-8 w-44 items-center justify-center rounded-sm border border-[#554433] bg-gradient-to-r from-[#1f1a17] via-[#2a241f] to-[#120f0e] shadow-lg"
                      >
                        <span className="font-serif text-[11px] tracking-wider text-[#d4a853]">
                          {selectedInk.title}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Jade Ink Rest Bar Body */}
                  <div className="relative z-10 flex h-10 w-56 items-center justify-between rounded-md border-2 border-[#d4a853]/80 bg-gradient-to-r from-[#064e3b]/80 via-[#047857]/90 to-[#064e3b]/80 px-3 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                    <span className="text-[10px] uppercase tracking-widest text-[#d4a853] font-serif font-bold">24K FILIGREE</span>
                    <span className="text-[10px] text-[#a7f3d0] font-mono">{selectedRest.length}</span>
                  </div>

                  {/* Wood Base Base Support */}
                  <div className="relative z-0 -mt-1 h-5 w-60 rounded-b-md border-t border-[#654321] bg-gradient-to-r from-[#2b1810] via-[#3a2016] to-[#20120b] shadow-inner flex items-center justify-center">
                    <span className="text-[9px] text-[#a8927d] uppercase tracking-wider">{selectedRest.baseWood}</span>
                  </div>
                </motion.div>

                {/* Status Indicator */}
                <div className="relative z-10 mt-6 text-xs text-[#b8a898]">
                  Trạng thái kê mực: <strong className="text-[#f5efe6]">{isInkPlaced ? 'Đang Đặt Thỏi Mực Cổ Khô Ráo' : 'Thanh Kê Sẵn Sàng (Trống)'}</strong>
                </div>
              </div>

              {/* Controls: Zoom & Place Ink */}
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
                  onClick={toggleInkPlacement}
                  className="rounded-lg border border-[#d4a853] bg-[#22160e] px-4 py-2 text-xs font-medium text-[#d4a853] transition-colors hover:bg-[#d4a853]/15"
                >
                  {isInkPlaced ? 'Nhấc Thỏi Mực Khỏi Thanh Kê' : 'Đặt Thỏi Mực Cổ Lên Thanh Kê'}
                </button>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#2d1f16] pt-6 text-center">
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Kích Thước</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">{selectedRest.length}</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Chất Ngọc</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#10b981]">Type A 95%</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Nẹp Chỉ Vàng</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#d4a853]">24K Filigree 0.15mm</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Đế Mộc</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">Mun Hoa / Trắc Đỏ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Rest Sizes & Antique Ink Selector */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Ink Rest Selector */}
            <div className="rounded-2xl border border-[#443022] bg-[#150e0a]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <h3 className="font-serif text-lg font-medium text-[#f5efe6] uppercase tracking-wider">
                Quy Cách Thanh Kê Thỏi Mực
              </h3>
              <p className="mt-1 text-xs text-[#a8927d]">
                Lựa chọn quy cách thanh kê phù hợp với kích thước án thư và quy mô thi phẩm.
              </p>

              <div className="mt-5 space-y-3">
                {INK_REST_SPECS.map((spec) => {
                  const isSelected = spec.id === selectedRest.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleSelectRest(spec)}
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
                        Họa tiết: <strong className="text-[#f5efe6]">{spec.goldFiligreePattern}</strong>
                      </div>
                      <div className="mt-1 text-[11px] text-[#8a7663]">
                        Ứng dụng: {spec.application}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Antique Ink Stick Collection Picker */}
              <div className="mt-8 border-t border-[#2d1f16] pt-6">
                <h4 className="font-serif text-sm font-medium uppercase tracking-wider text-[#d4a853]">
                  Thỏi Mực Cổ Ngự Dụng Tương Thích
                </h4>
                <div className="mt-3 space-y-2">
                  {ANTIQUE_INK_STICKS.map((ink) => {
                    const isSelected = ink.id === selectedInk.id
                    return (
                      <button
                        key={ink.id}
                        onClick={() => handleSelectInk(ink)}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          isSelected
                            ? 'border-[#d4a853] bg-[#22160e]'
                            : 'border-[#332216] bg-[#110b07] hover:border-[#4d3524]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-[#f5efe6]">
                          <span>{ink.title}</span>
                          <span className="text-[10px] text-[#d4a853]">{ink.era}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-[#a8927d]">{ink.mineralComposition}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Artisan Note */}
              <div className="mt-6 rounded-xl border border-[#523d2e]/40 bg-[#1e140d]/60 p-4 text-xs leading-relaxed text-[#b8a898]">
                <strong className="text-[#d4a853]">Chứng thư nghệ nhân GuHomes:</strong> Toàn bộ quy trình gọt giũa khối
                ngọc Bích Phỉ Thúy và kéo sợi vàng ròng 24K filigree 0.15mm được thực hiện thủ công tại xưởng may đo Thạnh Xuân 1.200m²,
                bảo đảm tuyệt đối 100% không bám dính mực và giữ trọn sắc bóng gương của ngọc qua nhiều thế hệ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
