'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

interface SealBoxSpec {
  id: string
  name: string
  diameter: string
  height: string
  jadeType: string
  goldFiligreePattern: string
  pasteOrigin: string
  baseWood: string
  application: string
}

const SEAL_BOX_SPECS: readonly SealBoxSpec[] = [
  {
    id: 'hop-chu-sa-ngoc-bich-phi-thuy-108',
    name: 'Hộp Chu Sa Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree',
    diameter: '108 mm',
    height: '46 mm',
    jadeType: 'Ngọc Bích Phỉ Thúy Type A Sơn Thủy Thấu Quang',
    goldFiligreePattern: 'Viền Hoa Mẫu Đơn Hoàng Cung nẹp vàng 24K sợi 0.18mm',
    pasteOrigin: 'Bột chu sa khoáng tự nhiên ủ dầu thầu dầu bách thảo 10 năm',
    baseWood: 'Gỗ Mun Hoa Khánh Hòa Bách Niên Bào Mộng Cổ',
    application: 'Chấm ấn triện chữ ký trên văn tự khế ước, tranh thủy mặc và thi thư cao cấp.',
  },
  {
    id: 'hop-chu-sa-bach-ngoc-hoa-dien-98',
    name: 'Hộp Chu Sa Bạch Ngọc Hòa Điền Nẹp Kim Hoàn 24K',
    diameter: '98 mm',
    height: '42 mm',
    jadeType: 'Bạch Ngọc Hòa Điền Cực Phẩm Mịn Như Mỡ Cừu',
    goldFiligreePattern: 'Họa Tiết Mây Cuộn Ngũ Phúc nẹp vàng 24K thủ công',
    pasteOrigin: 'Bột thần sa Thần Nông pha dầu chu sa cung đình sắc đỏ son tươi',
    baseWood: 'Gỗ Trắc Đỏ Nam Bộ Bách Niên Khảm Xà Cừ',
    application: 'Đóng dấu son bảo ấn trên các văn bản ngự dụng, thi ca và họa phẩm ngàn năm.',
  },
]

interface RoyalSeal {
  id: string
  name: string
  material: string
  inscription: string
  isStamped: boolean
}

const INITIAL_SEALS: readonly RoyalSeal[] = [
  {
    id: 'an-ngoc-hoang-gia-khue-van',
    name: 'Ấn Ngọc Khuê Văn Các',
    material: 'Thạch Anh Tóc Vàng Khắc Nổi',
    inscription: 'Văn Khí Trường Tồn',
    isStamped: false,
  },
  {
    id: 'an-go-trac-tich-phuc',
    name: 'Ấn Trắc Tích Phúc Diên Niên',
    material: 'Gỗ Trắc Đỏ Khảm Ngà Voi Nhân Tạo',
    inscription: 'Gia Đạo Hưng Thịnh',
    isStamped: true,
  },
  {
    id: 'an-dong-hoang-trieu-an-dinh',
    name: 'Ấn Đồng Cung Đình An Định',
    material: 'Đồng Đỏ Tôi Luyện Khắc Triện Thư',
    inscription: 'Tĩnh Lặng Vĩnh Cửu',
    isStamped: false,
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealPasteBoxStudio() {
  const [selectedBox, setSelectedBox] = useState<SealBoxSpec>(SEAL_BOX_SPECS[0]!)
  const [seals, setSeals] = useState<RoyalSeal[]>(INITIAL_SEALS as RoyalSeal[])
  const [isOpenLid, setIsOpenLid] = useState<boolean>(true)
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

  const toggleStampSeal = (id: string) => {
    setSeals((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.isStamped
          if (nextState) {
            playJadeChime(528, 1056)
          }
          return { ...s, isStamped: nextState }
        }
        return s
      })
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#0d1311] py-20 text-[#e8f2ee]">
      {/* Jade & Vermilion Glow Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-15%,rgba(16,185,129,0.12),transparent)]" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-[#ef4444]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 border-b border-[#1f2e29] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#10b981]">
                Văn Phòng Ngũ Bảo & Nghệ Thuật Ấn Triện Hoàng Cung
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#f2fdf7] sm:text-4xl">
                Atelier Hộp Chu Sa Ấn Triện Ngọc Bích Nẹp Vàng 24K Filigree
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#234739] bg-[#12241d] px-4 py-2 text-xs tracking-wider text-[#a7f3d0] transition-colors hover:border-[#10b981] hover:bg-[#163027]"
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

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#93a89f] sm:text-base">
            Kiệt tác chứa son chu sa hoàng triều tiện rỗng từ khối Ngọc Bích Phỉ Thúy / Bạch Ngọc nguyên khối đường kính 108mm,
            viền ren vàng 24K filigree hoa mẫu đơn quý phái. Bên trong chứa bột chu sa tự nhiên nghiền mịn pha dầu thầu dầu ủ 10 năm,
            bảo tồn sắc đỏ son tươi vĩnh cửu qua hàng thế kỷ.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Display & Interactive Macro View (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1f2e29] bg-[#121c18]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Spec Matrix Header */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#1b2b24] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#182621] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#738f84]">Đường Kính Ngọc</div>
                <div className="mt-0.5 text-base font-semibold text-[#10b981] sm:text-lg">{selectedBox.diameter}</div>
              </div>
              <div className="rounded-lg bg-[#182621] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#738f84]">Nẹp Vàng 24K</div>
                <div className="mt-0.5 text-base font-semibold text-[#fbbf24] sm:text-lg">Sợi 0.18mm</div>
              </div>
              <div className="rounded-lg bg-[#182621] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#738f84]">Chất Liệu Chu Sa</div>
                <div className="mt-0.5 text-base font-semibold text-[#ef4444] sm:text-lg">Ủ Dầu 10 Năm</div>
              </div>
            </div>

            {/* Visual Canvas: Seal Paste Box & Royal Seals */}
            <div className="relative my-8 flex min-h-[340px] flex-col items-center justify-center rounded-xl border border-[#1e2f27] bg-gradient-to-b from-[#14221d] to-[#0a120e] p-6 text-center">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Jade Box Lid (Interactive Open/Close) */}
                <motion.div
                  animate={{
                    y: isOpenLid ? -45 : 0,
                    opacity: isOpenLid ? 0.85 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-14 w-44 items-center justify-center rounded-t-full border-2 border-[#10b981]/60 bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#064e3b] shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[#d1fae5]">Nắp Ngọc Nẹp Vàng 24K</span>
                    <span className="rounded bg-[#fbbf24]/20 px-1.5 py-0.5 text-[9px] text-[#fbbf24]">Filigree</span>
                  </div>
                </motion.div>

                {/* Vermilion Paste Basin (Red Mineral Interior) */}
                <div className="relative flex h-28 w-48 flex-col items-center justify-center rounded-b-3xl border-x-2 border-b-2 border-[#10b981]/60 bg-gradient-to-b from-[#991b1b] to-[#7f1d1d] shadow-[0_0_35px_rgba(239,68,68,0.25)]">
                  {/* Gold Filigree Band Rim */}
                  <div className="absolute inset-x-0 -top-1.5 flex h-3 items-center justify-center border-y border-[#fbbf24] bg-[#b45309]/80 text-[8px] text-[#fef08a] uppercase tracking-widest">
                    Viền Mẫu Đơn Hoàng Cung 24K
                  </div>

                  {/* Red Paste Texture */}
                  <div className="flex h-16 w-36 items-center justify-center rounded-full border border-[#ef4444]/60 bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#b91c1c] shadow-inner">
                    <span className="text-[10px] font-medium text-[#fee2e2]">Bột Chu Sa Tự Nhiên Đậm Đặc</span>
                  </div>
                </div>

                {/* Ancient Rosewood / Ebony Base */}
                <div className="mt-3 flex h-7 w-56 items-center justify-center rounded-xl border border-[#2b3a32] bg-[#1a0f07] text-[10px] text-[#fbbf24] shadow-lg">
                  {selectedBox.baseWood}
                </div>
              </motion.div>

              {/* Status Note */}
              <div className="mt-6 text-xs text-[#93a89f]">
                Trạng thái nắp:{' '}
                <span className={isOpenLid ? 'text-[#10b981] font-medium' : 'text-[#738f84]'}>
                  {isOpenLid ? 'Nắp ngọc mở sẵn sàng chấm ấn triện hoàng gia' : 'Nắp khép kín bảo quản tinh dầu chu sa'}
                </span>
              </div>
            </div>

            {/* Interactive Control Controls */}
            <div className="space-y-4 border-t border-[#1b2b24] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setIsOpenLid(!isOpenLid)
                    playJadeChime(528, 1056)
                  }}
                  className="rounded-lg border border-[#10b981]/50 bg-[#10b981]/15 px-4 py-2 text-xs font-semibold text-[#a7f3d0] transition-all hover:bg-[#10b981]/25"
                >
                  {isOpenLid ? 'Đóng Nắp Hộp Ngọc' : 'Mở Nắp Chấm Son Chu Sa'}
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#93a89f]">Kính Lúp Vi Mô:</span>
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
                            ? 'bg-[#10b981] text-[#0d1311] font-bold'
                            : 'bg-[#182621] text-[#93a89f] hover:bg-[#20332c]'
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

          {/* Configuration & Seals Interactive List (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Box Specification Selector */}
            <div className="rounded-2xl border border-[#1f2e29] bg-[#121c18]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
                Tuyển Chọn Hộp Son Chu Sa Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#738f84]">
                Khối ngọc tự nhiên thấu quang tiện rỗng tinh xảo, nẹp vàng 24K filigree bởi xưởng mộc GuHomes Thạnh Xuân:
              </p>

              <div className="mt-4 space-y-3">
                {SEAL_BOX_SPECS.map((spec) => {
                  const isSelected = selectedBox.id === spec.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        setSelectedBox(spec)
                        playJadeChime(528, 1056)
                      }}
                      className={`w-full text-left rounded-xl p-4 transition-all border ${
                        isSelected
                          ? 'border-[#10b981] bg-[#1b2b24] text-[#f2fdf7]'
                          : 'border-[#1b2b24] bg-[#15221c] text-[#93a89f] hover:border-[#23382f]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#e8f2ee]">{spec.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#10b981]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#93a89f]">{spec.application}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#1a2e26] px-2 py-0.5 text-[#34d399]">{spec.diameter}</span>
                        <span className="rounded bg-[#1a2e26] px-2 py-0.5 text-[#fbbf24]">{spec.goldFiligreePattern}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Interactive Royal Seals Stamp Collection */}
            <div className="rounded-2xl border border-[#1f2e29] bg-[#121c18]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
                Bộ Sưu Tập Bảo Ấn Khắc Nổi Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#738f84]">
                Nhấp để chấm son chu sa và đóng dấu triện bảo chứng tác phẩm:
              </p>

              <div className="mt-4 space-y-3">
                {seals.map((seal) => (
                  <button
                    key={seal.id}
                    onClick={() => toggleStampSeal(seal.id)}
                    className="flex w-full items-center justify-between rounded-xl border border-[#1b2b24] bg-[#15221c] p-3 text-left transition-all hover:border-[#10b981]/50"
                  >
                    <div>
                      <div className="font-serif text-xs font-medium text-[#e8f2ee]">{seal.name}</div>
                      <div className="mt-0.5 text-[10px] text-[#738f84]">{seal.material} · &quot;{seal.inscription}&quot;</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                          seal.isStamped
                            ? 'bg-[#ef4444]/20 text-[#fca5a5] border border-[#ef4444]/40'
                            : 'bg-[#1e2f27] text-[#738f84]'
                        }`}
                      >
                        {seal.isStamped ? 'Đã Đóng Dấu Đỏ' : 'Chưa Chấm Son'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#234739] bg-[#12241d] p-4 text-xs leading-relaxed text-[#93a89f]">
                <strong className="text-[#10b981]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Hộp chu sa ngọc bích được
                tiện rỗng nguyên khối bởi các nghệ nhân chế tác ngọc hàng đầu, ren xoắn khít bảo vệ tuyệt đối chu sa không bị khô dầu,
                tôn vinh trọn vẹn văn hóa thư phòng quý tộc Việt Nam.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
