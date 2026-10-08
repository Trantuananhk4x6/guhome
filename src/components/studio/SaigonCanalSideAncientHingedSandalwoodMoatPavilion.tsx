'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio frequency for peaceful garden meditation
const FREQ_528HZ = 528

interface SandalwoodPavilionSpec {
  id: string
  name: string
  woodOrigin: string
  age: string
  coolingDelta: string
  relativeHumidity: string
  feature: string
  description: string
}

const SANDALWOOD_PAVILION_SPECS: readonly SandalwoodPavilionSpec[] = [
  {
    id: 'hoang-dan-tuyet-lang-son-125',
    name: 'Gỗ Hoàng Đàn Tuyết Lạng Sơn 125 Năm',
    woodOrigin: 'Vùng Rừng Núi Đá Vôi Hữu Lũng (Lạng Sơn)',
    age: '125 Năm Tuổi',
    coolingDelta: '-5.0°C So Với Ngoài Trời',
    relativeHumidity: 'Duy Trì 52% - 56% RH Tự Nhiên',
    feature: 'Cửa bản lề cối gỗ mộng nêm tuyết phủ tự nhiên không đinh ốc',
    description: 'Tinh dầu gỗ tự kết tinh thành những sợi tuyết trắng lấp lánh như sương mai, hương thơm quý phái bậc nhất giúp thư giãn tinh thần và xua tan khí ẩm nhiệt đới.',
  },
  {
    id: 'dan-huong-do-co-thu-115',
    name: 'Gỗ Đàn Hương Đỏ Cổ Thụ 115 Năm',
    woodOrigin: 'Rừng Già Cao Nguyên Trung Bộ Khai Thác Chọn Lọc',
    age: '115 Năm Tuổi',
    coolingDelta: '-4.8°C So Với Ngoài Trời',
    relativeHumidity: 'Cân Bằng 55% - 59% RH',
    feature: 'Bản lề cối gỗ mộng nêm xoay êm ái đón luồng gió mát ven sông',
    description: 'Chất gỗ đanh chắc màu đỏ tía trầm ấm, thớ gỗ mịn màng như lụa tỏa hương thơm ngát dịu ngọt trường tồn cùng năm tháng.',
  },
]

interface BonsaiMasterpiece {
  id: string
  name: string
  scientificName: string
  age: string
  style: string
  origin: string
  description: string
}

const BONSAI_LIST: readonly BonsaiMasterpiece[] = [
  {
    id: 'duyen-tung-thac-do-140',
    name: 'Duyên Tùng Cổ Thụ Dáng Thác Đổ Soi Hào Sen',
    scientificName: 'Juniperus chinensis 140Y',
    age: '140 Năm Tuổi',
    style: 'Thác Đổ Hùng Vĩ Soi Bóng Hào Sen',
    origin: 'Vườn Ươm Cổ Truyền GuHomes Thạnh Xuân',
    description: 'Thân vươn dài 2.4m uốn lượn như rồng hạ thủy, bộ lá xanh biếc quanh năm phủ bóng mát rượi lên bàn trà đạo thủy đình.',
  },
  {
    id: 'thong-den-nhat-ban-130',
    name: 'Thông Đen Cổ Thụ Dáng Huyền Nghinh Phong',
    scientificName: 'Pinus thunbergii Ancient 130Y',
    age: '130 Năm Tuổi',
    style: 'Huyền Nghinh Phong Vững Chãi Trước Sóng Gió',
    origin: 'Bộ Sưu Tập Cổ Thụ Nam Bộ',
    description: 'Vỏ sần sùi xếp lớp như vảy rồng, cành nhánh bay bổng thanh thoát tạo nên bức tranh thủy mặc sống động giữa lòng Sài Gòn.',
  },
]

export function SaigonCanalSideAncientHingedSandalwoodMoatPavilion() {
  const [activeSpec, setActiveSpec] = useState<SandalwoodPavilionSpec>(SANDALWOOD_PAVILION_SPECS[0]!)
  const [activeBonsai, setActiveBonsai] = useState<BonsaiMasterpiece>(BONSAI_LIST[0]!)
  const [rotationAngle, setRotationAngle] = useState(90)
  const [doorOpen, setDoorOpen] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close()
      }
    }
  }, [])

  const playMeditationSound = () => {
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

      const osc = audioCtxRef.current.createOscillator()
      const gain = audioCtxRef.current.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(FREQ_528HZ, now)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2)

      osc.connect(gain)
      gain.connect(audioCtxRef.current.destination)

      osc.start(now)
      osc.stop(now + 3.2)
    } catch {
      // AudioContext fallback
    }
  }

  const toggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    if (nextState) {
      setTimeout(() => {
        playMeditationSound()
      }, 50)
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#0a1111] py-20 text-[#e0efef]">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(13,148,136,0.14),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a1111] to-transparent opacity-80" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#1b2b2b] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#0d9488]/40 bg-[#0d9488]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#2dd4bf]">
                Tuyệt Tác Kiến Trúc Thủy Đình Vi Khí Hậu Sài Gòn
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#f0fdfa] sm:text-4xl">
                Thủy Đình Hoàng Đàn Tuyết 125 Năm & Hào Sen Bách Diệp
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#1f3b3b] bg-[#0f1f1f] px-4 py-2 text-xs tracking-wider text-[#99f6e4] transition-colors hover:border-[#0d9488] hover:bg-[#132929]"
              aria-label={soundEnabled ? 'Tắt âm thanh thiền trà 528Hz' : 'Bật âm thanh thiền trà 528Hz'}
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#2dd4bf]" />
                  <span>Âm Thanh 528Hz Đang Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#64748b]" />
                  <span>Bật Chuông Thiền 528Hz</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#94a3b8] sm:text-base">
            Kiến trúc thủy đình ven sông dựng từ gỗ Hoàng Đàn Tuyết Lạng Sơn 125 năm tuổi tự kết tinh sợi tuyết thơm ngát,
            hệ cửa bản lề cối gỗ mộng nêm truyền thống không đinh kim loại kết hợp hào nước sen bách diệp giúp hạ nhiệt độ thực tế -5.0°C.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Simulation Display (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1b2b2b] bg-[#0e1818]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Top Stats Bar */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#182626] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#122020] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Nhiệt Độ Hạ</div>
                <div className="mt-0.5 text-base font-semibold text-[#2dd4bf] sm:text-lg">{activeSpec.coolingDelta}</div>
              </div>
              <div className="rounded-lg bg-[#122020] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Ẩm Độ Tự Nhiên</div>
                <div className="mt-0.5 text-base font-semibold text-[#5eead4] sm:text-lg">{activeSpec.relativeHumidity}</div>
              </div>
              <div className="rounded-lg bg-[#122020] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Tuổi Gỗ Hoàng Đàn</div>
                <div className="mt-0.5 text-base font-semibold text-[#99f6e4] sm:text-lg">{activeSpec.age}</div>
              </div>
            </div>

            {/* Visual Canvas: Water Moat & Pavilion Elevation */}
            <div className="relative my-8 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#162626] bg-gradient-to-b from-[#0f1b1b] to-[#081010] p-6 text-center">
              {/* Lotus Leaves & Water Ripple Ripples */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d9488]/20 to-transparent">
                <div className="absolute inset-x-0 bottom-3 flex justify-around opacity-40">
                  <div className="h-4 w-14 rounded-full border border-[#2dd4bf]/40 bg-[#2dd4bf]/10" />
                  <div className="h-5 w-18 rounded-full border border-[#2dd4bf]/40 bg-[#2dd4bf]/10" />
                  <div className="h-4 w-16 rounded-full border border-[#2dd4bf]/40 bg-[#2dd4bf]/10" />
                </div>
              </div>

              {/* Hinged Wooden Doors Animation */}
              <div className="relative z-10 flex items-center justify-center gap-6">
                {/* Left Door */}
                <motion.div
                  animate={{ rotateY: doorOpen ? -50 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-44 w-24 flex-col justify-between rounded border-2 border-[#2dd4bf]/40 bg-gradient-to-b from-[#38200f] to-[#1c0f07] p-2 shadow-2xl"
                  style={{ transformOrigin: 'left center' }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-[#d97706]/80">Cửa Cối Tả</div>
                  <div className="space-y-1">
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                  </div>
                  <div className="text-[9px] text-[#2dd4bf]">Tuyết phủ vi mô</div>
                </motion.div>

                {/* Central Tea Altar & Bonsai Platform */}
                <div className="relative flex flex-col items-center">
                  {/* Rotating Bonsai */}
                  <motion.div
                    animate={{ rotate: rotationAngle }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    className="flex h-28 w-28 items-center justify-center rounded-full border border-[#5eead4]/40 bg-[#112424]/90 shadow-inner"
                  >
                    <div className="text-center">
                      <div className="text-xs font-serif text-[#99f6e4]">{activeBonsai.name.split(' ')[0]}</div>
                      <div className="text-[9px] text-[#2dd4bf]">{activeBonsai.age}</div>
                    </div>
                  </motion.div>

                  {/* Water Moat label */}
                  <div className="mt-3 rounded-full border border-[#0d9488]/40 bg-[#0d9488]/20 px-3 py-1 text-[10px] text-[#99f6e4]">
                    Hào Sen Bách Diệp Hạ Nhiệt 5.0°C
                  </div>
                </div>

                {/* Right Door */}
                <motion.div
                  animate={{ rotateY: doorOpen ? 50 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-44 w-24 flex-col justify-between rounded border-2 border-[#2dd4bf]/40 bg-gradient-to-b from-[#38200f] to-[#1c0f07] p-2 shadow-2xl"
                  style={{ transformOrigin: 'right center' }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-[#d97706]/80">Cửa Cối Hữu</div>
                  <div className="space-y-1">
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                  </div>
                  <div className="text-[9px] text-[#2dd4bf]">Tuyết phủ vi mô</div>
                </motion.div>
              </div>

              {/* Live Info Banner */}
              <div className="mt-6 text-xs text-[#94a3b8]">
                Trạng thái: <span className="text-[#2dd4bf]">{doorOpen ? 'Mở cửa cối đón trọn luồng gió mát mặt hồ' : 'Khép cửa chắn gió lộng đêm khuya'}</span>
              </div>
            </div>

            {/* Interactive Control Sliders & Buttons */}
            <div className="space-y-4 border-t border-[#182626] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setDoorOpen(!doorOpen)
                    playMeditationSound()
                  }}
                  className="rounded-lg border border-[#0d9488]/50 bg-[#0d9488]/15 px-4 py-2 text-xs font-medium text-[#99f6e4] transition-all hover:bg-[#0d9488]/25"
                >
                  {doorOpen ? 'Đóng Bản Lề Cối Gỗ' : 'Mở Bung Cửa Cối Đón Gió'}
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#94a3b8]">Xoay Bệ Bonsai 360°:</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotationAngle}
                    onChange={(e) => {
                      setRotationAngle(Number(e.target.value))
                    }}
                    className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-[#1b2b2b] accent-[#2dd4bf]"
                  />
                  <span className="w-8 text-right font-mono text-xs text-[#2dd4bf]">{rotationAngle}°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration & Selection Panel (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Timber Specification Selection */}
            <div className="rounded-2xl border border-[#1b2b2b] bg-[#0e1818]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#99f6e4]">
                Vật Liệu Gỗ Hoàng Đàn & Đàn Hương Cổ Thụ
              </h3>
              <p className="mt-1 text-xs text-[#64748b]">
                Chọn chủng loại danh mộc quý hiếm được gia công mộng nêm thủ công tại xưởng GuHomes Thạnh Xuân:
              </p>

              <div className="mt-4 space-y-3">
                {SANDALWOOD_PAVILION_SPECS.map((spec) => {
                  const isSelected = activeSpec.id === spec.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        setActiveSpec(spec)
                        playMeditationSound()
                      }}
                      className={`w-full text-left rounded-xl p-4 transition-all border ${
                        isSelected
                          ? 'border-[#0d9488] bg-[#122626] text-[#f0fdfa]'
                          : 'border-[#162626] bg-[#0f1b1b] text-[#94a3b8] hover:border-[#1b2b2b]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#e2e8f0]">{spec.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#2dd4bf]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#94a3b8]">{spec.description}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#132c2c] px-2 py-0.5 text-[#2dd4bf]">{spec.woodOrigin}</span>
                        <span className="rounded bg-[#132c2c] px-2 py-0.5 text-[#5eead4]">{spec.coolingDelta}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bonsai Collection Selection */}
            <div className="rounded-2xl border border-[#1b2b2b] bg-[#0e1818]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#99f6e4]">
                Tác Phẩm Bonsai Dáng Thác Đổ
              </h3>
              <div className="mt-4 space-y-3">
                {BONSAI_LIST.map((bonsai) => {
                  const isSelected = activeBonsai.id === bonsai.id
                  return (
                    <button
                      key={bonsai.id}
                      onClick={() => {
                        setActiveBonsai(bonsai)
                        playMeditationSound()
                      }}
                      className={`w-full text-left rounded-xl p-3 transition-all border ${
                        isSelected
                          ? 'border-[#0d9488] bg-[#122626] text-[#f0fdfa]'
                          : 'border-[#162626] bg-[#0f1b1b] text-[#94a3b8] hover:border-[#1b2b2b]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-medium text-[#e2e8f0]">{bonsai.name}</span>
                        <span className="text-[10px] text-[#2dd4bf]">{bonsai.age}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#64748b]">{bonsai.description}</p>
                    </button>
                  )
                })}
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#1b2b2b] bg-[#101e1e] p-4 text-xs leading-relaxed text-[#94a3b8]">
                <strong className="text-[#2dd4bf]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Kết cấu thủy đình gỗ Hoàng Đàn
                được mộng nêm thủ công không đinh ốc, chịu ngâm nước tuyệt đối và bảo hành kết cấu vĩnh viễn qua các thế hệ gia chủ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
