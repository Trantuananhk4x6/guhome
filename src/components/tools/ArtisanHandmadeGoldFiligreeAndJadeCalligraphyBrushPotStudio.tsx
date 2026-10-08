'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

interface BrushPotSpec {
  id: string
  name: string
  height: string
  diameter: string
  facetCount: number
  jadeType: string
  goldFiligreePattern: string
  baseWood: string
  application: string
}

const BRUSH_POT_SPECS: readonly BrushPotSpec[] = [
  {
    id: 'ong-but-luc-giac-phi-thuy-168',
    name: 'Ống Cắm Bút Lục Giác Ngọc Bích Phỉ Thúy Nẹp Vàng 24K',
    height: '168 mm',
    diameter: '128 mm',
    facetCount: 6,
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Lão Khanh Thấu Quang',
    goldFiligreePattern: 'Lục Diện Tùng Cúc Trúc Mai & Long Phụng nẹp vàng 24K sợi 0.18mm',
    baseWood: 'Gỗ Mun Hoa Khánh Hòa Bách Niên Bào Mộng Cổ',
    application: 'Chứa bộ sưu tập ngự bút lông đại tự, trung tự trên bàn làm việc của các bậc tôn quý.',
  },
  {
    id: 'ong-but-bat-giac-bach-ngoc-156',
    name: 'Ống Cắm Bút Bát Giác Bạch Ngọc Hòa Điền Nẹp Kim Hoàn 24K',
    height: '156 mm',
    diameter: '118 mm',
    facetCount: 8,
    jadeType: 'Bạch Ngọc Hòa Điền Cực Phẩm Mỡ Cừu Thuần Khiết',
    goldFiligreePattern: 'Bát Quái Cát Tường nẹp vàng 24K thủ công',
    baseWood: 'Gỗ Trắc Đỏ Nam Bộ Bách Niên Khảm Xà Cừ',
    application: 'Bảo quản bút lông hoàng gia, biểu trưng cho sự trọn vẹn sung túc của gia chủ.',
  },
]

interface RoyalBrush {
  id: string
  name: string
  handleMaterial: string
  bristleType: string
  isInserted: boolean
}

const INITIAL_ROYAL_BRUSHES: readonly RoyalBrush[] = [
  {
    id: 'but-long-soi-luc-hop',
    name: 'Lục Hợp Ngự Bút',
    handleMaterial: 'Gỗ Mun Hoa Nẹp Vàng 24K',
    bristleType: 'Lông Sói Bắc Cực Đàn Hồi Cao',
    isInserted: true,
  },
  {
    id: 'but-bach-ngoc-phuong-hoang',
    name: 'Đan Phượng Chu Bút',
    handleMaterial: 'Bạch Ngọc Hòa Điền Khắc Mây',
    bristleType: 'Lông Thỏ Mùa Thu Thấm Hút Sâu',
    isInserted: true,
  },
  {
    id: 'but-trac-do-kim-long',
    name: 'Thần Long Thiền Bút',
    handleMaterial: 'Gỗ Trắc Đỏ Nam Bộ Khảm Vàng',
    bristleType: 'Lông Cừu Non Mềm Mại Như Lụa',
    isInserted: false,
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushPotStudio() {
  const [selectedPot, setSelectedPot] = useState<BrushPotSpec>(BRUSH_POT_SPECS[0]!)
  const [brushes, setBrushes] = useState<RoyalBrush[]>(INITIAL_ROYAL_BRUSHES as RoyalBrush[])
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

      const osc1 = audioCtxRef.current.createOscillator()
      const gain1 = audioCtxRef.current.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(f1, now)

      gain1.gain.setValueAtTime(0.001, now)
      gain1.gain.exponentialRampToValueAtTime(0.14, now + 0.03)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.5)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)

      osc1.start(now)
      osc1.stop(now + 2.5)

      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.001, now)
      gain2.gain.exponentialRampToValueAtTime(0.07, now + 0.02)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)

      osc2.start(now)
      osc2.stop(now + 2.0)
    } catch {
      // AudioContext fallback
    }
  }

  const toggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    if (nextState) {
      setTimeout(() => {
        playJadeChime(528, 1056)
      }, 50)
    }
  }

  const toggleBrushInsert = (id: string) => {
    setBrushes((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextState = !b.isInserted
          if (nextState) {
            playJadeChime(528, 1056)
          }
          return { ...b, isInserted: nextState }
        }
        return b
      })
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#0c1210] py-20 text-[#e4f0ec]">
      {/* Jade Glow Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-15%,rgba(16,185,129,0.12),transparent)]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#10b981]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 border-b border-[#1b2b25] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#10b981]">
                Văn Phòng Ngũ Bảo & Thư Phòng Hoàng Triều
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#f2fdf7] sm:text-4xl">
                Atelier Ống Cắm Bút Lục Giác Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#214235] bg-[#10221b] px-4 py-2 text-xs tracking-wider text-[#a7f3d0] transition-colors hover:border-[#10b981] hover:bg-[#152e24]"
              aria-label={soundEnabled ? 'Tắt âm thoa ngọc bích 528Hz + 1056Hz' : 'Bật âm thoa ngọc bích 528Hz + 1056Hz'}
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#10b981]" />
                  <span>Âm Thoa Ngọc Bích Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#6ee7b7]/60" />
                  <span>Bật Chuông Ngọc 528Hz</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8ca399] sm:text-base">
            Kiệt tác ống cắm bút tiện rỗng nguyên khối từ Ngọc Bích Phỉ Thúy Type A / Bạch Ngọc cao 168mm, sáu mặt vát giác chạm họa tiết
            Tùng Cúc Trúc Mai nẹp chỉ vàng 24K filigree sợi 0.18mm, tọa lạc vững chãi trên bệ gỗ Mun hoa bách niên của GuHomes.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Display & Interactive Macro View (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1b2b25] bg-[#101a16]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Spec Matrix Header */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#182822] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Chiều Cao Ngọc</div>
                <div className="mt-0.5 text-base font-semibold text-[#10b981] sm:text-lg">{selectedPot.height}</div>
              </div>
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Đường Kính Lòng</div>
                <div className="mt-0.5 text-base font-semibold text-[#34d399] sm:text-lg">{selectedPot.diameter}</div>
              </div>
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Số Mặt Vát Giác</div>
                <div className="mt-0.5 text-base font-semibold text-[#fbbf24] sm:text-lg">{selectedPot.facetCount} Mặt Vát</div>
              </div>
            </div>

            {/* Visual Canvas: Hexagonal Brush Pot & Brushes */}
            <div className="relative my-8 flex min-h-[340px] flex-col items-center justify-center rounded-xl border border-[#1a2c24] bg-gradient-to-b from-[#111e19] to-[#09100d] p-6 text-center">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Inserted Brushes Stems Emerging from Pot */}
                <div className="relative flex items-end justify-center gap-3 h-28 -mb-4 z-20">
                  {brushes.map((b, idx) => (
                    <motion.div
                      key={b.id}
                      animate={{
                        y: b.isInserted ? 0 : -45,
                        opacity: b.isInserted ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="flex flex-col items-center"
                    >
                      <div className="h-20 w-2.5 rounded-full border border-[#fbbf24] bg-gradient-to-b from-[#78350f] via-[#d97706] to-[#78350f] shadow-md" />
                      <div className="h-4 w-1.5 rounded-full bg-[#fef08a]" />
                    </motion.div>
                  ))}
                </div>

                {/* Main Hexagonal Jade Pot Body */}
                <div className="relative flex h-36 w-44 items-center justify-center rounded-2xl border-2 border-[#10b981]/70 bg-gradient-to-b from-[#065f46] via-[#047857] to-[#022c22] shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                  {/* Gold Filigree Vertical Facet Lines */}
                  <div className="pointer-events-none absolute inset-x-4 inset-y-2 flex justify-between border-x border-[#fbbf24]/50 opacity-80">
                    <div className="h-full w-px bg-[#fbbf24]/40" />
                    <div className="h-full w-px bg-[#fbbf24]/40" />
                  </div>

                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-wider text-[#a7f3d0]">Ngọc Bích Lục Giác</div>
                    <div className="mt-1 font-mono text-xs font-semibold text-[#fef08a]">Lục Hợp Đồng Xuân</div>
                    <div className="text-[9px] text-[#34d399] mt-0.5">Nẹp Vàng 24K Filigree</div>
                  </div>
                </div>

                {/* Ancient Rosewood / Ebony Base */}
                <div className="mt-2 flex h-7 w-52 items-center justify-center rounded-xl border border-[#26372f] bg-[#170e06] text-[10px] text-[#fbbf24] shadow-lg">
                  {selectedPot.baseWood}
                </div>
              </motion.div>

              {/* Status Note */}
              <div className="mt-6 text-xs text-[#8ca399]">
                Trạng thái cắm bút:{' '}
                <span className="text-[#10b981] font-medium">
                  {brushes.filter((b) => b.isInserted).length} / {brushes.length} bút lông hoàng triều đang ngự trong ống ngọc
                </span>
              </div>
            </div>

            {/* Interactive Control Controls */}
            <div className="space-y-4 border-t border-[#182822] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const allInserted = brushes.every((b) => b.isInserted)
                    setBrushes((prev) => prev.map((b) => ({ ...b, isInserted: !allInserted })))
                    playJadeChime(528, 1056)
                  }}
                  className="rounded-lg border border-[#10b981]/50 bg-[#10b981]/15 px-4 py-2 text-xs font-semibold text-[#a7f3d0] transition-all hover:bg-[#10b981]/25"
                >
                  {brushes.every((b) => b.isInserted) ? 'Nhấc Toàn Bộ Bút Viết' : 'Cắm Toàn Bộ Bút Vào Ống Ngọc'}
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#8ca399]">Kính Lúp Vi Mô:</span>
                  <div className="flex gap-1.5">
                    {[1, 1.25, 1.5].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => {
                          setZoomLevel(lvl)
                          playJadeChime(528, 1056)
                        }}
                        className={`rounded px-2.5 py-1 text-xs font-mono transition-all ${
                          zoomLevel === lvl
                            ? 'bg-[#10b981] text-[#0c1210] font-bold'
                            : 'bg-[#15221d] text-[#8ca399] hover:bg-[#1c2e26]'
                        }`}
                      >
                        {lvl}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration & Brushes Interactive List (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Pot Specification Selector */}
            <div className="rounded-2xl border border-[#1b2b25] bg-[#101a16]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
                Tuyển Chọn Ống Cắm Bút Hoàng Cung
              </h3>
              <p className="mt-1 text-xs text-[#6d8a7e]">
                Khối ngọc tự nhiên thấu quang tiện rỗng tinh xảo, nẹp vàng 24K filigree bởi xưởng mộc GuHomes Thạnh Xuân:
              </p>

              <div className="mt-4 space-y-3">
                {BRUSH_POT_SPECS.map((spec) => {
                  const isSelected = selectedPot.id === spec.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        setSelectedPot(spec)
                        playJadeChime(528, 1056)
                      }}
                      className={`w-full text-left rounded-xl p-4 transition-all border ${
                        isSelected
                          ? 'border-[#10b981] bg-[#182822] text-[#f2fdf7]'
                          : 'border-[#182822] bg-[#121e19] text-[#8ca399] hover:border-[#1f332a]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#e4f0ec]">{spec.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#10b981]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#8ca399]">{spec.application}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#172b23] px-2 py-0.5 text-[#34d399]">{spec.height}</span>
                        <span className="rounded bg-[#172b23] px-2 py-0.5 text-[#fbbf24]">{spec.goldFiligreePattern}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Interactive Royal Brushes Collection */}
            <div className="rounded-2xl border border-[#1b2b25] bg-[#101a16]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
                Bộ Sưu Tập Ngự Bút Hoàng Triều
              </h3>
              <p className="mt-1 text-xs text-[#6d8a7e]">
                Nhấp để cắm hoặc nhấc bút lông ra khỏi ống ngọc:
              </p>

              <div className="mt-4 space-y-3">
                {brushes.map((brush) => (
                  <button
                    key={brush.id}
                    onClick={() => toggleBrushInsert(brush.id)}
                    className="flex w-full items-center justify-between rounded-xl border border-[#182822] bg-[#121e19] p-3 text-left transition-all hover:border-[#10b981]/50"
                  >
                    <div>
                      <div className="font-serif text-xs font-medium text-[#e4f0ec]">{brush.name}</div>
                      <div className="mt-0.5 text-[10px] text-[#6d8a7e]">{brush.handleMaterial} · {brush.bristleType}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                          brush.isInserted
                            ? 'bg-[#10b981]/20 text-[#a7f3d0] border border-[#10b981]/40'
                            : 'bg-[#1a2c24] text-[#6d8a7e]'
                        }`}
                      >
                        {brush.isInserted ? 'Đang Trong Ống' : 'Đang Nhấc Ra'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#214235] bg-[#10221b] p-4 text-xs leading-relaxed text-[#8ca399]">
                <strong className="text-[#10b981]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Ống cắm bút Ngọc Bích
                được mài bóng thủ công toàn bộ bề mặt bên trong lẫn bên ngoài, chống trầy xước thân bút lông và
                đem lại vẻ sang trọng tĩnh lặng cho không gian thư phòng của các chủ nhân danh giá.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
