'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

interface MountainRestSpec {
  id: string
  name: string
  length: string
  height: string
  peakCount: number
  jadeType: string
  goldFiligreePattern: string
  baseWood: string
  application: string
}

const MOUNTAIN_REST_SPECS: readonly MountainRestSpec[] = [
  {
    id: 'gia-ke-but-ngu-hanh-phi-thuy-220',
    name: 'Kê Bút Ngũ Hành Sơn Ngọc Bích Phỉ Thúy Nẹp Vàng 24K',
    length: '220 mm',
    height: '68 mm',
    peakCount: 5,
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Sơn Thủy Đan Thanh',
    goldFiligreePattern: 'Họa Tiết Mây Cuộn Ngũ Phong nẹp vàng 24K sợi 0.18mm',
    baseWood: 'Gỗ Mun Hoa Khánh Hòa Bách Niên Bào Mộng Cổ',
    application: 'Kê gác các loại bút lông đại tự, trung tự trên bàn viết thư pháp và ký khế ước.',
  },
  {
    id: 'gia-ke-but-tam-son-bach-ngoc-180',
    name: 'Kê Bút Tam Sơn Bạch Ngọc Hòa Điền Nẹp Kim Hoàn 24K',
    length: '180 mm',
    height: '56 mm',
    peakCount: 3,
    jadeType: 'Bạch Ngọc Hòa Điền Cực Phẩm Mỡ Cừu Thấu Quang',
    goldFiligreePattern: 'Viền Sóng Nước Thủy Ba nẹp vàng 24K thủ công',
    baseWood: 'Gỗ Trắc Đỏ Nam Bộ Bách Niên Khảm Xà Cừ',
    application: 'Kê gác bút lông viết tiểu khải trên bàn trà thất thanh tao nhỏ gọn.',
  },
]

interface RestingBrush {
  id: string
  name: string
  material: string
  length: string
  isRested: boolean
}

const INITIAL_RESTING_BRUSHES: readonly RestingBrush[] = [
  {
    id: 'but-ngu-long-dai-tu',
    name: 'Ngự Bút Ngũ Long Đại Tự',
    material: 'Lông Sói Bắc Cực · Thân Trúc Tiêu Dao',
    length: '28 cm',
    isRested: true,
  },
  {
    id: 'but-phuong-hoang-trung-tu',
    name: 'Phượng Hoàng Trung Tự Bút',
    material: 'Lông Thỏ Mùa Thu · Thân Trắc Đỏ Nẹp Vàng',
    length: '24 cm',
    isRested: false,
  },
  {
    id: 'but-thien-thu-tieu-khai',
    name: 'Thiền Thư Tiểu Khải Bút',
    material: 'Lông Cừu Non · Thân Bạch Ngọc Thấu Quang',
    length: '20 cm',
    isRested: true,
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestBarStudio() {
  const [selectedRest, setSelectedRest] = useState<MountainRestSpec>(MOUNTAIN_REST_SPECS[0]!)
  const [brushes, setBrushes] = useState<RestingBrush[]>(INITIAL_RESTING_BRUSHES as RestingBrush[])
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

  const toggleBrushRest = (id: string) => {
    setBrushes((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextState = !b.isRested
          if (nextState) {
            playJadeChime(528, 1056)
          }
          return { ...b, isRested: nextState }
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
                Văn Phòng Ngũ Bảo & Thư Họa Hoàng Cung
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#f2fdf7] sm:text-4xl">
                Atelier Giá Kê Bút Ngũ Hành Sơn Ngọc Bích Nẹp Vàng 24K Filigree
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
            Kiệt tác giá kê bút tạc hình năm ngọn núi Ngũ Hành tương sinh từ khối Ngọc Bích Phỉ Thúy Type A / Bạch Ngọc nguyên khối dài 220mm,
            chân nẹp viền mây cuộn vàng 24K filigree sợi 0.18mm, ngự trên bệ gỗ Mun hoa bách niên bào mộng cổ của GuHomes.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Display & Interactive Macro View (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1b2b25] bg-[#101a16]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Spec Matrix Header */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#182822] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Chiều Dài Ngọc</div>
                <div className="mt-0.5 text-base font-semibold text-[#10b981] sm:text-lg">{selectedRest.length}</div>
              </div>
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Số Ngọn Núi</div>
                <div className="mt-0.5 text-base font-semibold text-[#34d399] sm:text-lg">{selectedRest.peakCount} Đỉnh Núi</div>
              </div>
              <div className="rounded-lg bg-[#15221d] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#6d8a7e]">Nẹp Vàng 24K</div>
                <div className="mt-0.5 text-base font-semibold text-[#fbbf24] sm:text-lg">Sợi 0.18mm</div>
              </div>
            </div>

            {/* Visual Canvas: Mountain Jade Rest & Brushes */}
            <div className="relative my-8 flex min-h-[340px] flex-col items-center justify-center rounded-xl border border-[#1a2c24] bg-gradient-to-b from-[#111e19] to-[#09100d] p-6 text-center">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Jade Mountain Peaks (5 Peaks Silhouette) */}
                <div className="relative flex items-end justify-center gap-1.5 px-4">
                  {/* Peak 1 */}
                  <div className="h-16 w-10 rounded-t-full border-t border-l border-[#10b981]/60 bg-gradient-to-b from-[#065f46] to-[#047857] shadow-lg" />
                  {/* Peak 2 */}
                  <div className="h-24 w-11 rounded-t-full border-t border-l border-[#10b981]/70 bg-gradient-to-b from-[#047857] to-[#065f46] shadow-lg" />
                  {/* Peak 3 (Main Peak) */}
                  <div className="h-32 w-14 rounded-t-full border-t border-[#34d399] bg-gradient-to-b from-[#059669] via-[#047857] to-[#064e3b] shadow-2xl relative">
                    <span className="absolute top-2 inset-x-0 text-[8px] text-[#a7f3d0] font-semibold">Chủ Sơn</span>
                  </div>
                  {/* Peak 4 */}
                  <div className="h-20 w-11 rounded-t-full border-t border-r border-[#10b981]/70 bg-gradient-to-b from-[#047857] to-[#065f46] shadow-lg" />
                  {/* Peak 5 */}
                  <div className="h-14 w-10 rounded-t-full border-t border-r border-[#10b981]/60 bg-gradient-to-b from-[#065f46] to-[#047857] shadow-lg" />
                </div>

                {/* Resting Brushes Overlay (Hovering / Resting) */}
                <div className="absolute top-10 inset-x-0 flex items-center justify-center pointer-events-none">
                  <div className="h-3 w-64 rounded-full border border-[#fbbf24] bg-gradient-to-r from-[#78350f] via-[#d97706] to-[#78350f] shadow-lg flex items-center justify-between px-3">
                    <span className="text-[7px] text-[#fef08a] uppercase tracking-wider">Đang Gác Bút Lông Cung Đình</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
                  </div>
                </div>

                {/* Gold Filigree Wave Trim Band */}
                <div className="h-3 w-64 rounded-sm border-y border-[#fbbf24] bg-[#92400e]/80 flex items-center justify-center text-[7px] text-[#fef08a] uppercase tracking-widest shadow-md">
                  Vân Mây Cuộn Ngũ Phong Vàng 24K Filigree
                </div>

                {/* Ancient Rosewood / Ebony Base */}
                <div className="mt-2 flex h-7 w-72 items-center justify-center rounded-xl border border-[#26372f] bg-[#170e06] text-[10px] text-[#fbbf24] shadow-lg">
                  {selectedRest.baseWood}
                </div>
              </motion.div>

              {/* Status Note */}
              <div className="mt-6 text-xs text-[#8ca399]">
                Trạng thái gác bút:{' '}
                <span className="text-[#10b981] font-medium">
                  {brushes.filter((b) => b.isRested).length} / {brushes.length} bút lông hoàng triều đang ngự trên đỉnh núi
                </span>
              </div>
            </div>

            {/* Interactive Control Controls */}
            <div className="space-y-4 border-t border-[#182822] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const allRested = brushes.every((b) => b.isRested)
                    setBrushes((prev) => prev.map((b) => ({ ...b, isRested: !allRested })))
                    playJadeChime(528, 1056)
                  }}
                  className="rounded-lg border border-[#10b981]/50 bg-[#10b981]/15 px-4 py-2 text-xs font-semibold text-[#a7f3d0] transition-all hover:bg-[#10b981]/25"
                >
                  {brushes.every((b) => b.isRested) ? 'Nhấc Toàn Bộ Bút Viết' : 'Gác Toàn Bộ Bút Lên Núi Ngọc'}
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
            {/* Rest Specification Selector */}
            <div className="rounded-2xl border border-[#1b2b25] bg-[#101a16]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
                Tuyển Chọn Kê Bút Sơn Thạch Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#6d8a7e]">
                Khối ngọc tự nhiên thấu quang chạm hình non bộ trùng điệp, chế tác mộng nêm bởi xưởng GuHomes Thạnh Xuân:
              </p>

              <div className="mt-4 space-y-3">
                {MOUNTAIN_REST_SPECS.map((spec) => {
                  const isSelected = selectedRest.id === spec.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        setSelectedRest(spec)
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
                        <span className="rounded bg-[#172b23] px-2 py-0.5 text-[#34d399]">{spec.length}</span>
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
                Bộ Sưu Tập Bút Lông Hoàng Cung
              </h3>
              <p className="mt-1 text-xs text-[#6d8a7e]">
                Nhấp để gác hoặc nhấc bút lông lên các đỉnh núi ngọc:
              </p>

              <div className="mt-4 space-y-3">
                {brushes.map((brush) => (
                  <button
                    key={brush.id}
                    onClick={() => toggleBrushRest(brush.id)}
                    className="flex w-full items-center justify-between rounded-xl border border-[#182822] bg-[#121e19] p-3 text-left transition-all hover:border-[#10b981]/50"
                  >
                    <div>
                      <div className="font-serif text-xs font-medium text-[#e4f0ec]">{brush.name}</div>
                      <div className="mt-0.5 text-[10px] text-[#6d8a7e]">{brush.material} · Dài {brush.length}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                          brush.isRested
                            ? 'bg-[#10b981]/20 text-[#a7f3d0] border border-[#10b981]/40'
                            : 'bg-[#1a2c24] text-[#6d8a7e]'
                        }`}
                      >
                        {brush.isRested ? 'Đang Gác Núi Ngọc' : 'Đang Nhấc Viết'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#214235] bg-[#10221b] p-4 text-xs leading-relaxed text-[#8ca399]">
                <strong className="text-[#10b981]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Giá kê bút Ngọc Bích
                được mài dũa độ cong vi sai khớp từng thân bút lông, tạo thế đứng vững chãi không lăn trượt và mang lại
                năng lượng phong thủy hưng vượng cho thư phòng của gia chủ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
