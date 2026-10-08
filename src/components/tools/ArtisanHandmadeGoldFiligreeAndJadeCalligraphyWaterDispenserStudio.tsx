'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

interface WaterDispenserSpec {
  id: string
  name: string
  capacity: string
  height: string
  jadeType: string
  goldFiligreePattern: string
  baseWood: string
  application: string
}

const WATER_DISPENSER_SPECS: readonly WaterDispenserSpec[] = [
  {
    id: 'binh-thuy-nghien-phi-thuy-150',
    name: 'Bình Thủy Trích Ngọc Bích Phỉ Thúy Nẹp Vàng 24K',
    capacity: '150 ml Nước Suối Khoáng Tinh Khiết',
    height: '92 mm',
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Băng Chủng Thấu Quang',
    goldFiligreePattern: 'Họa Tiết Hoa Cúc Hoàng Triều nẹp vàng 24K sợi 0.18mm',
    baseWood: 'Gỗ Mun Hoa Khánh Hòa Bách Niên Bào Mộng Cổ',
    application: 'Rót từng giọt nước vi sai chuẩn xác lên nghiên đá Đoan Khê để mài mực Tùng Yên thượng hạng.',
  },
  {
    id: 'binh-thuy-trich-bach-ngoc-120',
    name: 'Bình Thủy Trích Bạch Ngọc Hòa Điền Nẹp Kim Hoàn 24K',
    capacity: '120 ml Nước Sương Mai Rừng Trúc',
    height: '84 mm',
    jadeType: 'Bạch Ngọc Hòa Điền Cực Phẩm Mịn Như Mỡ Cừu',
    goldFiligreePattern: 'Viền Mây Cuộn Ngũ Phúc nẹp vàng 24K thủ công',
    baseWood: 'Gỗ Trắc Đỏ Nam Bộ Bách Niên Khảm Xà Cừ',
    application: 'Điều tiết từng giọt nước lên nghiên mực khi viết thi pháp và sao chép kinh thư cung đình.',
  },
]

interface InkSlab {
  id: string
  name: string
  stoneOrigin: string
  dropCount: number
  wetnessPercentage: number
}

const INITIAL_INK_SLABS: readonly InkSlab[] = [
  {
    id: 'nghien-doan-khe-la-khe',
    name: 'Nghiên Đá Đoan Khê Lão Khê',
    stoneOrigin: 'Vùng Mỏ Đá Cổ Triệu Khánh',
    dropCount: 4,
    wetnessPercentage: 65,
  },
  {
    id: 'nghien-hap-khe-thanh-da',
    name: 'Nghiên Hấp Khê Thanh Thạch',
    stoneOrigin: 'Vùng Núi Rừng Hoàng Sơn',
    dropCount: 2,
    wetnessPercentage: 40,
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDispenserStudio() {
  const [selectedDispenser, setSelectedDispenser] = useState<WaterDispenserSpec>(WATER_DISPENSER_SPECS[0]!)
  const [slabs, setSlabs] = useState<InkSlab[]>(INITIAL_INK_SLABS as InkSlab[])
  const [activeSlabIndex, setActiveSlabIndex] = useState<number>(0)
  const [isPouring, setIsPouring] = useState<boolean>(false)
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

  const playWaterDropSound = (f1: number, f2: number) => {
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
      osc1.frequency.exponentialRampToValueAtTime(f1 * 1.5, now + 0.12)

      gain1.gain.setValueAtTime(0.001, now)
      gain1.gain.exponentialRampToValueAtTime(0.15, now + 0.02)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)

      osc1.start(now)
      osc1.stop(now + 0.6)

      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.001, now)
      gain2.gain.exponentialRampToValueAtTime(0.08, now + 0.03)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.8)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)

      osc2.start(now)
      osc2.stop(now + 1.8)
    } catch {
      // AudioContext fallback
    }
  }

  const toggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    if (nextState) {
      setTimeout(() => {
        playWaterDropSound(528, 1056)
      }, 50)
    }
  }

  const triggerPourDrop = () => {
    setIsPouring(true)
    playWaterDropSound(528, 1056)

    setSlabs((prev) =>
      prev.map((slab, idx) => {
        if (idx === activeSlabIndex) {
          const nextCount = slab.dropCount + 1
          const nextWetness = Math.min(100, slab.wetnessPercentage + 8)
          return { ...slab, dropCount: nextCount, wetnessPercentage: nextWetness }
        }
        return slab
      })
    )

    setTimeout(() => {
      setIsPouring(false)
    }, 700)
  }

  const currentSlab = slabs[activeSlabIndex]!

  return (
    <section className="relative overflow-hidden bg-[#0a1210] py-20 text-[#e4f2ed]">
      {/* Jade Water Droplet Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-15%,rgba(16,185,129,0.14),transparent)]" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-[#06b6d4]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 border-b border-[#1b2b25] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#10b981]">
                Văn Phòng Ngũ Bảo & Nghệ Thuật Mài Mực Thiền Tâm
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#f2fdf7] sm:text-4xl">
                Atelier Bình Thủy Trích Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#214235] bg-[#10221b] px-4 py-2 text-xs tracking-wider text-[#a7f3d0] transition-colors hover:border-[#10b981] hover:bg-[#152e24]"
              aria-label={soundEnabled ? 'Tắt tiếng giọt nước ngọc bích 528Hz + 1056Hz' : 'Bật tiếng giọt nước ngọc bích 528Hz + 1056Hz'}
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#10b981]" />
                  <span>Tiếng Giọt Nước 528Hz Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#6ee7b7]/60" />
                  <span>Bật Chuông Nước Thiền</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8ca399] sm:text-base">
            Kiệt tác bình thủy trích tiện rỗng nguyên khối từ Ngọc Bích Phỉ Thúy Type A thấu quang, nẹp chỉ hoa cúc vàng 24K filigree sợi 0.18mm.
            Hệ thống vòi vi sai cho phép người viết thư pháp rót chính xác từng giọt nước suối khoáng lên đài mài mực,
            tạo độ đậm nhạt hoàn hảo cho nét bút phượng múa rồng bay.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Display & Interactive Macro View (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1b2b25] bg-[#101a16]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Spec Matrix Header */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#182822] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Dung Tích Ngọc</div>
                <div className="mt-0.5 text-base font-semibold text-[#10b981] sm:text-lg">{selectedDispenser.capacity}</div>
              </div>
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Độ Ẩm Nghiên Đài</div>
                <div className="mt-0.5 text-base font-semibold text-[#06b6d4] sm:text-lg">{currentSlab.wetnessPercentage}% RH</div>
              </div>
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Số Giọt Đã Rót</div>
                <div className="mt-0.5 text-base font-semibold text-[#fbbf24] sm:text-lg">{currentSlab.dropCount} Giọt Ngọc</div>
              </div>
            </div>

            {/* Visual Canvas: Water Dispenser & Ink Slab */}
            <div className="relative my-8 flex min-h-[340px] flex-col items-center justify-center rounded-xl border border-[#1a2c24] bg-gradient-to-b from-[#111e19] to-[#09100d] p-6 text-center">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Water Droplet Falling Animation */}
                <AnimatePresence>
                  {isPouring && (
                    <motion.div
                      initial={{ opacity: 1, y: -20, scale: 0.6 }}
                      animate={{ opacity: [1, 0.8, 0], y: [0, 45, 75], scale: [1, 1.2, 1.6] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeIn' }}
                      className="pointer-events-none absolute top-28 z-30 h-4 w-4 rounded-full bg-gradient-to-b from-[#67e8f9] via-[#06b6d4] to-[#0891b2] shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                    />
                  )}
                </AnimatePresence>

                {/* Jade Water Vessel (Interactive Spout) */}
                <div className="relative flex flex-col items-center">
                  {/* Spout & Golden Rim */}
                  <div className="h-6 w-16 rounded-t-xl border-t-2 border-x-2 border-[#fbbf24] bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] flex items-center justify-center">
                    <span className="text-[8px] text-[#fef08a] uppercase">Vòi Rót Vi Sai</span>
                  </div>

                  {/* Main Jade Flask Body */}
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border-2 border-[#10b981]/60 bg-gradient-to-b from-[#065f46] via-[#047857] to-[#022c22] shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                    {/* Filigree Overlay Ring */}
                    <div className="pointer-events-none absolute inset-2 rounded-2xl border border-dashed border-[#fbbf24]/50 opacity-60" />

                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#a7f3d0]">Ngọc Bích Băng Chủng</div>
                      <div className="mt-1 font-mono text-xs font-semibold text-[#fef08a]">{selectedDispenser.height}</div>
                    </div>
                  </div>

                  {/* Ancient Wood Base */}
                  <div className="mt-2 flex h-6 w-44 items-center justify-center rounded-xl border border-[#2b3a32] bg-[#1a0f07] text-[9px] text-[#fbbf24] shadow-lg">
                    {selectedDispenser.baseWood}
                  </div>
                </div>

                {/* Ink Slab Platform (Receiving Droplets) */}
                <div className="mt-6 flex flex-col items-center">
                  <div className="relative flex h-14 w-60 items-center justify-center rounded-xl border border-[#374151] bg-gradient-to-r from-[#1f2937] via-[#111827] to-[#1f2937] shadow-inner">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#9ca3af]">{currentSlab.name}</span>
                      <span className="rounded bg-[#06b6d4]/20 px-2 py-0.5 text-[9px] text-[#67e8f9]">
                        Mặt Nghiên Đậm Mực ({currentSlab.wetnessPercentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Status Note */}
              <div className="mt-6 text-xs text-[#8ca399]">
                Trạng thái rót nước:{' '}
                <span className="text-[#10b981] font-medium">
                  {isPouring ? 'Đang rót một giọt nước suối ngọc lên đài nghiên...' : 'Sẵn sàng nhả giọt nước vi sai'}
                </span>
              </div>
            </div>

            {/* Interactive Control Controls */}
            <div className="space-y-4 border-t border-[#182822] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={triggerPourDrop}
                  disabled={isPouring}
                  className="rounded-lg border border-[#10b981]/50 bg-[#10b981]/15 px-5 py-2.5 text-xs font-semibold text-[#a7f3d0] transition-all hover:bg-[#10b981]/25 disabled:opacity-50"
                >
                  Rót 1 Giọt Nước Vi Sai Lên Nghiên
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#8ca399]">Kính Lúp Vi Mô:</span>
                  <div className="flex gap-1.5">
                    {[1, 1.25, 1.5].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => {
                          setZoomLevel(lvl)
                          playWaterDropSound(528, 1056)
                        }}
                        className={`rounded px-2.5 py-1 text-xs font-mono transition-all ${
                          zoomLevel === lvl
                            ? 'bg-[#10b981] text-[#0a1210] font-bold'
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

          {/* Configuration & Slabs Interactive List (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Dispenser Specification Selector */}
            <div className="rounded-2xl border border-[#1b2b25] bg-[#101a16]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
                Tuyển Chọn Bình Thủy Trích Hoàng Gia
              </h3>
              <p className="mt-1 text-xs text-[#6d8a7e]">
                Khối ngọc tự nhiên thấu quang tiện rỗng tinh xảo, nẹp vàng 24K filigree bởi xưởng mộc GuHomes Thạnh Xuân:
              </p>

              <div className="mt-4 space-y-3">
                {WATER_DISPENSER_SPECS.map((spec) => {
                  const isSelected = selectedDispenser.id === spec.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        setSelectedDispenser(spec)
                        playWaterDropSound(528, 1056)
                      }}
                      className={`w-full text-left rounded-xl p-4 transition-all border ${
                        isSelected
                          ? 'border-[#10b981] bg-[#182822] text-[#f2fdf7]'
                          : 'border-[#182822] bg-[#121e19] text-[#8ca399] hover:border-[#1f332a]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#e4f2ed]">{spec.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#10b981]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#8ca399]">{spec.application}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#172b23] px-2 py-0.5 text-[#34d399]">{spec.capacity}</span>
                        <span className="rounded bg-[#172b23] px-2 py-0.5 text-[#fbbf24]">{spec.goldFiligreePattern}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Interactive Ink Slabs Collection */}
            <div className="rounded-2xl border border-[#1b2b25] bg-[#101a16]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
                Nghiên Đài Mài Mực Tương Tác
              </h3>
              <p className="mt-1 text-xs text-[#6d8a7e]">
                Chọn nghiên đá cổ để trải nghiệm điều tiết lượng nước mài mực:
              </p>

              <div className="mt-4 space-y-3">
                {slabs.map((slab, idx) => (
                  <button
                    key={slab.id}
                    onClick={() => {
                      setActiveSlabIndex(idx)
                      playWaterDropSound(528, 1056)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                      idx === activeSlabIndex
                        ? 'border-[#10b981] bg-[#182822]'
                        : 'border-[#182822] bg-[#121e19] hover:border-[#10b981]/50'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-xs font-medium text-[#e4f2ed]">{slab.name}</div>
                      <div className="mt-0.5 text-[10px] text-[#6d8a7e]">{slab.stoneOrigin}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#06b6d4]/20 px-2.5 py-1 text-[10px] font-medium text-[#67e8f9] border border-[#06b6d4]/40">
                        {slab.dropCount} Giọt Nước
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#214235] bg-[#10221b] p-4 text-xs leading-relaxed text-[#8ca399]">
                <strong className="text-[#10b981]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Bình thủy trích ngọc bích
                được mài dũa độ chuẩn xác của vòi giọt vi sai, mang lại trải nghiệm thiền định thư thái đỉnh cao cho gia chủ
                khi mài mực thưởng trà trong không gian sống đậm chất Quiet Luxury.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
