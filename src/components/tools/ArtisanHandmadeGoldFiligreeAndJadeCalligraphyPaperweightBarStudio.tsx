'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequencies: 528Hz base with 1056Hz jade chime harmonic
const HARMONIC_528HZ = 528
const HARMONIC_1056HZ = 1056

interface PaperweightBarSpec {
  id: string
  name: string
  length: string
  width: string
  height: string
  weight: string
  jadeType: string
  goldFiligreePattern: string
  baseWood: string
  application: string
}

const PAPERWEIGHT_BAR_SPECS: readonly PaperweightBarSpec[] = [
  {
    id: 'dai-ban-cung-dinh-280',
    name: 'Đại Bản Cung Đình (280x42x20mm)',
    length: '280 mm',
    width: '42 mm',
    height: '20 mm',
    weight: '680 g Trọng Lượng Đầm Chắc Tuyệt Đối',
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Myanmar Thấu Quang 95%',
    goldFiligreePattern: 'Lưỡng Long Chầu Nguyệt sợi vàng 24K 0.15mm',
    baseWood: 'Gỗ Mun Hoa Khánh Hòa Bách Niên Bào Mộng Cổ',
    application: 'Trấn giữ cuộn giấy xuyến chỉ đại khoa, hoành phi câu đối lớn trên bàn gỗ Cẩm Lai.',
  },
  {
    id: 'trung-ban-thien-thu-220',
    name: 'Trung Bản Thiền Thư (220x35x18mm)',
    length: '220 mm',
    width: '35 mm',
    height: '18 mm',
    weight: '490 g Cân Bằng Hoàn Hảo',
    jadeType: 'Ngọc Bích Xanh Lý Sơn Thủy Thấu Sáng',
    goldFiligreePattern: 'Hoa Sen Tây Hồ Triều Lý nẹp sợi vàng 0.15mm',
    baseWood: 'Gỗ Trắc Đỏ Nam Bộ Bách Niên Khảm Xà Cừ',
    application: 'Trấn giữ biểu lụa tơ tằm cổ, chép thi phẩm và kinh thư thiền định thư phòng.',
  },
  {
    id: 'nha-ban-tra-that-160',
    name: 'Nhã Bản Trà Thất (160x28x15mm)',
    length: '160 mm',
    width: '28 mm',
    height: '15 mm',
    weight: '320 g Thanh Nhã Gọn Gàng',
    jadeType: 'Bạch Ngọc Băng Chủng Mịn Như Mỡ Cừu',
    goldFiligreePattern: 'Vân Mây Cuộn Triều Lê nẹp vàng 24K thủ công',
    baseWood: 'Hoàng Đàn Tuyết Lạng Sơn Lưu Hương Ngàn Năm',
    application: 'Trấn giữ tập giấy dó thủ công trên bàn trà đạo, chấm duyệt thư từ tao nhã.',
  },
]

interface AntiqueCalligraphyPaper {
  id: string
  name: string
  origin: string
  characteristic: string
  suitableInk: string
}

const ANTIQUE_PAPERS: readonly AntiqueCalligraphyPaper[] = [
  {
    id: 'giay-xuyen-chi-sinh-tuyen',
    name: 'Giấy Xuyến Chỉ Sinh Tuyên Cung Đình',
    origin: 'Nghệ Nhân Làng Giấy Cổ Truyền',
    characteristic: 'Độ thấm hút mực nhạy bén, thể hiện trọn vẹn ngũ sắc của mực Tùng Yên',
    suitableInk: 'Thỏi Mực Tùng Yên Cổ & Dầu Yên Hắc Kim',
  },
  {
    id: 'bieu-lua-to-tam-hoang-triều',
    name: 'Biểu Lụa Tơ Tằm Dệt Tay Hoàng Triều',
    origin: 'Làng Lụa Vạn Phúc Dệt Khung Gỗ Cổ',
    characteristic: 'Bề mặt lụa tơ tằm óng ả, không phai màu qua hàng trăm năm',
    suitableInk: 'Mực Chu Sa Hoàng Gia & Mực Đen Đậm',
  },
  {
    id: 'giay-do-thu-cong-bach-nien',
    name: 'Giấy Dó Thủ Công Bách Niên Vỏ Cây Dó',
    origin: 'Vùng Đất Trung Du Bắc Bộ',
    characteristic: 'Sợi dó dẻo dai vĩnh cửu, chống mối mọt và ẩm mốc tự nhiên',
    suitableInk: 'Mực Tùng Bách Rừng Sâu',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyPaperweightBarStudio() {
  const [selectedBar, setSelectedBar] = useState<PaperweightBarSpec>(PAPERWEIGHT_BAR_SPECS[0]!)
  const [selectedPaper, setSelectedPaper] = useState<AntiqueCalligraphyPaper>(ANTIQUE_PAPERS[0]!)
  const [isPlaced, setIsPlaced] = useState<boolean>(true)
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

  const handleSelectBar = (item: PaperweightBarSpec) => {
    setSelectedBar(item)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
  }

  const handleSelectPaper = (paper: AntiqueCalligraphyPaper) => {
    setSelectedPaper(paper)
    playJadeChime(HARMONIC_1056HZ, HARMONIC_528HZ * 1.5)
  }

  const togglePlacement = () => {
    setIsPlaced(!isPlaced)
    playJadeChime(HARMONIC_528HZ, HARMONIC_1056HZ)
  }

  return (
    <section className="relative overflow-hidden bg-[#0c0a08] py-20 text-[#eae4dd] border-t border-[#33251c]">
      {/* Background Accent Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.06),transparent_70%)]" />
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.05),transparent_70%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#d4a853]">
            Văn Phòng Tứ Bảo Cao Cấp · Chế Tác Thủ Công GuHomes
          </div>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-[#f7f3ee] sm:text-4xl lg:text-5xl">
            Atelier Thước Trấn Giấy Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b8a898] sm:text-base">
            Kiệt tác trấn chỉ thư phòng đẽo gọt từ phiến Ngọc Bích Phỉ Thúy Type A thấu quang 95%, viền nẹp sợi vàng
            ròng 24K filigree rồng sen sóng nước 0.15mm và tọa lạc trên bệ Mun hoa Khánh Hòa, giữ cho trang giấy xuyến chỉ
            phẳng lặng tuyệt đối trước làn gió mát kênh rạch Sài Gòn.
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
          {/* Left Column: Visual Paperweight Bar Showcase & Interactive Stage */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-[#443022] bg-[#150e0a]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d1f16] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4a853]">Tạo Tác Kim Hoàn & Thạch Nghệ</span>
                  <h3 className="font-serif text-xl font-medium text-[#f5efe6] sm:text-2xl">
                    {selectedBar.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#5c402d] bg-[#22160e] px-3 py-1.5 text-xs text-[#d4a853]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#10b981]" />
                  <span>Ngọc Bích Thấu Quang 95%</span>
                </div>
              </div>

              {/* Graphic Stage with Macro Zoom */}
              <div className="relative my-8 flex h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-[#382618] bg-gradient-to-b from-[#1c130b] to-[#0c0805] p-6 text-center">
                {/* Visual Representation of Paper Sheet & Jade Bar */}
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {/* Paper Sheet background */}
                  <div className="relative z-0 h-28 w-72 rounded-sm border border-[#524433] bg-gradient-to-r from-[#e8decb] via-[#f2ece0] to-[#e8decb] shadow-md flex items-center justify-center">
                    <span className="font-serif text-[11px] tracking-wider text-[#63503d] italic">
                      {selectedPaper.name}
                    </span>
                  </div>

                  {/* Jade Paperweight Bar hovering / placed on the paper */}
                  <motion.div
                    animate={isPlaced ? { y: -20, opacity: 1 } : { y: -50, opacity: 0.85 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative z-10 -mt-8 flex flex-col items-center"
                  >
                    {/* Jade Bar Body */}
                    <div className="flex h-10 w-64 items-center justify-between rounded-md border-2 border-[#d4a853]/90 bg-gradient-to-r from-[#064e3b]/85 via-[#047857]/95 to-[#064e3b]/85 px-3 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                      <span className="text-[10px] uppercase tracking-widest text-[#d4a853] font-serif font-bold">24K FILIGREE</span>
                      <span className="text-[10px] text-[#a7f3d0] font-mono">{selectedBar.length}</span>
                    </div>

                    {/* Wood Base */}
                    <div className="h-4 w-68 rounded-b-md border-t border-[#654321] bg-gradient-to-r from-[#2b1810] via-[#3a2016] to-[#20120b] shadow-inner flex items-center justify-center">
                      <span className="text-[9px] text-[#a8927d] uppercase tracking-wider">{selectedBar.baseWood}</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Status Indicator */}
                <div className="relative z-10 mt-6 text-xs text-[#b8a898]">
                  Trạng thái trấn giấy: <strong className="text-[#f5efe6]">{isPlaced ? 'Đang Trấn Phẳng Giấy Xuyến Chỉ (Vững Vàng)' : 'Đã Nhấc Thước Lên (Chuẩn Bị Viết)'}</strong>
                </div>
              </div>

              {/* Controls: Zoom & Place Paperweight Action */}
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
                  onClick={togglePlacement}
                  className="rounded-lg border border-[#d4a853] bg-[#22160e] px-4 py-2 text-xs font-medium text-[#d4a853] transition-colors hover:bg-[#d4a853]/15"
                >
                  {isPlaced ? 'Nhấc Thước Trấn Khỏi Giấy' : 'Đặt Thước Trấn Phẳng Giấy'}
                </button>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#2d1f16] pt-6 text-center">
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Chiều Dài</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">{selectedBar.length}</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Chất Ngọc</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#10b981]">Type A 95%</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Nẹp Vàng</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#d4a853]">24K Filigree 0.15mm</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Khối Lượng</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">{selectedBar.weight.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bar Specs & Antique Paper Selector */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Bar Selector */}
            <div className="rounded-2xl border border-[#443022] bg-[#150e0a]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <h3 className="font-serif text-lg font-medium text-[#f5efe6] uppercase tracking-wider">
                Quy Cách Thước Trấn Giấy Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#a8927d]">
                Chọn quy cách thước trấn phù hợp với kích thước án thư và loại giấy thư họa.
              </p>

              <div className="mt-5 space-y-3">
                {PAPERWEIGHT_BAR_SPECS.map((spec) => {
                  const isSelected = spec.id === selectedBar.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleSelectBar(spec)}
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
                        Khối lượng: <strong className="text-[#f5efe6]">{spec.weight}</strong>
                      </div>
                      <div className="mt-1 text-[11px] text-[#8a7663]">
                        Ứng dụng: {spec.application}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Antique Paper Collection Picker */}
              <div className="mt-8 border-t border-[#2d1f16] pt-6">
                <h4 className="font-serif text-sm font-medium uppercase tracking-wider text-[#d4a853]">
                  Giấy Thư Họa Cổ Tương Thích
                </h4>
                <div className="mt-3 space-y-2">
                  {ANTIQUE_PAPERS.map((paper) => {
                    const isSelected = paper.id === selectedPaper.id
                    return (
                      <button
                        key={paper.id}
                        onClick={() => handleSelectPaper(paper)}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          isSelected
                            ? 'border-[#d4a853] bg-[#22160e]'
                            : 'border-[#332216] bg-[#110b07] hover:border-[#4d3524]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-[#f5efe6]">
                          <span>{paper.name}</span>
                          <span className="text-[10px] text-[#d4a853]">{paper.origin}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-[#a8927d]">{paper.characteristic}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Artisan Note */}
              <div className="mt-6 rounded-xl border border-[#523d2e]/40 bg-[#1e140d]/60 p-4 text-xs leading-relaxed text-[#b8a898]">
                <strong className="text-[#d4a853]">Chứng thư nghệ nhân GuHomes:</strong> Phiến Ngọc Bích Phỉ Thúy được
                mài phẳng vi sai với dung sai bề mặt dưới 0.02mm, bảo đảm không làm hằn nếp hay xước rách các cuộn giấy xuyến chỉ
                quý hiếm, được gia công mộng mộc tinh xảo tại xưởng may đo Thạnh Xuân 1.200m².
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
