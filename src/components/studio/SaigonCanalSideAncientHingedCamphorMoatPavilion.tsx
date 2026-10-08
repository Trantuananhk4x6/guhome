'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio frequency for peaceful garden meditation
const FREQ_528HZ = 528

interface CamphorPavilionSpec {
  id: string
  name: string
  woodOrigin: string
  age: string
  coolingDelta: string
  relativeHumidity: string
  feature: string
  description: string
}

const CAMPHOR_PAVILION_SPECS: readonly CamphorPavilionSpec[] = [
  {
    id: 'long-nao-co-thu-130',
    name: 'Gỗ Long Não Cổ Thụ Rừng Già 130 Năm',
    woodOrigin: 'Vùng Núi Rừng Tây Bắc Khai Thác Chọn Lọc',
    age: '130 Năm Tuổi',
    coolingDelta: '-5.1°C So Với Ngoài Trời',
    relativeHumidity: 'Duy Trì 51% - 55% RH Tự Nhiên',
    feature: 'Cửa bản lề cối gỗ mộng nêm tinh dầu tỏa hương xua đuổi côn trùng',
    description: 'Hàm lượng tinh dầu long não tự nhiên đậm đặc giúp thanh lọc không khí, chống nấm mốc nồm ẩm tuyệt đối và lan tỏa hương thơm the mát sảng khoái.',
  },
  {
    id: 'po-mu-gia-lai-120',
    name: 'Gỗ Pơ Mu Đại Thụ Gia Lai 120 Năm',
    woodOrigin: 'Rừng Nguyên Sinh Tây Nguyên Khai Thác Chọn Lọc',
    age: '120 Năm Tuổi',
    coolingDelta: '-4.9°C So Với Ngoài Trời',
    relativeHumidity: 'Cân Bằng 54% - 58% RH',
    feature: 'Bản lề cối gỗ mộng nêm xoay êm ái đón trọn gió mát bờ kênh',
    description: 'Chất gỗ đanh chắc vân xoắn ánh vàng rực rỡ, kháng mối mọt vĩnh viễn và tạo cảm giác ấm cúng thư thái cho không gian trà thất thượng lưu.',
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
    id: 'nguyet-que-co-thu-145',
    name: 'Nguyệt Quế Cổ Thụ Dáng Trực Quân Tử Nghinh Thủy',
    scientificName: 'Murraya paniculata Ancient 145Y',
    age: '145 Năm Tuổi',
    style: 'Trực Quân Tử Nghinh Thủy Soi Hào Sen',
    origin: 'Vườn Ươm Cổ Truyền GuHomes Thạnh Xuân',
    description: 'Thân gân guốc xoắn ốc uyển chuyển, hoa nở trắng muốt từng chùm tỏa hương thơm ngát dịu dàng xao xuyến mặt nước hồ sen bách diệp.',
  },
  {
    id: 'kim-quyt-co-thu-135',
    name: 'Kim Quýt Cổ Thụ Dáng Hoành Soi Bóng Nước',
    scientificName: 'Triphasia trifolia 135Y',
    age: '135 Năm Tuổi',
    style: 'Hoành Soi Bóng Nước Trầm Mặc Thanh Nhã',
    origin: 'Bộ Sưu Tập Cổ Thụ Nam Bộ',
    description: 'Cành nhánh giằng co phong trần ôm sát bờ đá sa thạch, trĩu quả đỏ son mọng nước tượng trưng cho tài lộc hưng thịnh dài lâu.',
  },
]

export function SaigonCanalSideAncientHingedCamphorMoatPavilion() {
  const [activeSpec, setActiveSpec] = useState<CamphorPavilionSpec>(CAMPHOR_PAVILION_SPECS[0]!)
  const [activeBonsai, setActiveBonsai] = useState<BonsaiMasterpiece>(BONSAI_LIST[0]!)
  const [rotationAngle, setRotationAngle] = useState(80)
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
    <section className="relative overflow-hidden bg-[#091212] py-20 text-[#def0f0]">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(20,184,166,0.14),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#091212] to-transparent opacity-80" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#1c2e2e] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#14b8a6]/40 bg-[#14b8a6]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#2dd4bf]">
                Kiến Trúc Thủy Đình Vi Khí Hậu Sài Gòn
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#f0fdfa] sm:text-4xl">
                Thủy Đình Gỗ Long Não 130 Năm & Hào Sen Bách Diệp
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#1d3d3d] bg-[#102424] px-4 py-2 text-xs tracking-wider text-[#99f6e4] transition-colors hover:border-[#14b8a6] hover:bg-[#153030]"
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
            Kiệt tác không gian trà thất ven kênh rạch Sài Gòn, dựng từ cột kèo gỗ Long Não 130 năm tuổi ngậm tinh dầu thơm ngát xua muỗi tự nhiên,
            kết hợp hệ cửa bản lề cối gỗ mộng nêm truyền thống không đinh kim loại và hào nước sen bách diệp giúp hạ nhiệt độ thực tế -5.1°C.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Simulation Display (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1c2e2e] bg-[#0c1a1a]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Top Stats Bar */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#182929] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#112424] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Nhiệt Độ Hạ</div>
                <div className="mt-0.5 text-base font-semibold text-[#2dd4bf] sm:text-lg">{activeSpec.coolingDelta}</div>
              </div>
              <div className="rounded-lg bg-[#112424] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Ẩm Độ Tự Nhiên</div>
                <div className="mt-0.5 text-base font-semibold text-[#5eead4] sm:text-lg">{activeSpec.relativeHumidity}</div>
              </div>
              <div className="rounded-lg bg-[#112424] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Tuổi Gỗ Long Não</div>
                <div className="mt-0.5 text-base font-semibold text-[#99f6e4] sm:text-lg">{activeSpec.age}</div>
              </div>
            </div>

            {/* Visual Canvas: Water Moat & Pavilion Elevation */}
            <div className="relative my-8 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#162929] bg-gradient-to-b from-[#0e1d1d] to-[#071111] p-6 text-center">
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
                  animate={{ rotateY: doorOpen ? -48 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-44 w-24 flex-col justify-between rounded border-2 border-[#2dd4bf]/40 bg-gradient-to-b from-[#3d2716] to-[#211309] p-2 shadow-2xl"
                  style={{ transformOrigin: 'left center' }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-[#d97706]/80">Cửa Cối Tả</div>
                  <div className="space-y-1">
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                  </div>
                  <div className="text-[9px] text-[#2dd4bf]">Kháng ẩm tự nhiên</div>
                </motion.div>

                {/* Central Tea Altar & Bonsai Platform */}
                <div className="relative flex flex-col items-center">
                  {/* Rotating Bonsai */}
                  <motion.div
                    animate={{ rotate: rotationAngle }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    className="flex h-28 w-28 items-center justify-center rounded-full border border-[#5eead4]/40 bg-[#102727]/90 shadow-inner"
                  >
                    <div className="text-center">
                      <div className="text-xs font-serif text-[#99f6e4]">{activeBonsai.name.split(' ')[0]}</div>
                      <div className="text-[9px] text-[#2dd4bf]">{activeBonsai.age}</div>
                    </div>
                  </motion.div>

                  {/* Water Moat label */}
                  <div className="mt-3 rounded-full border border-[#0d9488]/40 bg-[#0d9488]/20 px-3 py-1 text-[10px] text-[#99f6e4]">
                    Hào Sen Bách Diệp Hạ Nhiệt 5.1°C
                  </div>
                </div>

                {/* Right Door */}
                <motion.div
                  animate={{ rotateY: doorOpen ? 48 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-44 w-24 flex-col justify-between rounded border-2 border-[#2dd4bf]/40 bg-gradient-to-b from-[#3d2716] to-[#211309] p-2 shadow-2xl"
                  style={{ transformOrigin: 'right center' }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-[#d97706]/80">Cửa Cối Hữu</div>
                  <div className="space-y-1">
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                  </div>
                  <div className="text-[9px] text-[#2dd4bf]">Kháng ẩm tự nhiên</div>
                </motion.div>
              </div>

              {/* Live Info Banner */}
              <div className="mt-6 text-xs text-[#94a3b8]">
                Trạng thái: <span className="text-[#2dd4bf]">{doorOpen ? 'Mở cửa cối đón trọn luồng gió mát mặt hồ' : 'Khép cửa chắn gió lộng đêm khuya'}</span>
              </div>
            </div>

            {/* Interactive Control Sliders & Buttons */}
            <div className="space-y-4 border-t border-[#182929] pt-4">
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
                    className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-[#1c2e2e] accent-[#2dd4bf]"
                  />
                  <span className="w-8 text-right font-mono text-xs text-[#2dd4bf]">{rotationAngle}°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration & Selection Panel (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Timber Specification Selection */}
            <div className="rounded-2xl border border-[#1c2e2e] bg-[#0c1a1a]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#99f6e4]">
                Vật Liệu Gỗ Long Não Cổ Thụ & Pơ Mu
              </h3>
              <p className="mt-1 text-xs text-[#64748b]">
                Chọn chủng loại danh mộc quý hiếm được gia công mộng nêm thủ công tại xưởng GuHomes Thạnh Xuân:
              </p>

              <div className="mt-4 space-y-3">
                {CAMPHOR_PAVILION_SPECS.map((spec) => {
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
                          ? 'border-[#0d9488] bg-[#122b2b] text-[#f0fdfa]'
                          : 'border-[#172c2c] bg-[#0f2121] text-[#94a3b8] hover:border-[#1c2e2e]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#e2e8f0]">{spec.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#2dd4bf]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#94a3b8]">{spec.description}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#143232] px-2 py-0.5 text-[#2dd4bf]">{spec.woodOrigin}</span>
                        <span className="rounded bg-[#143232] px-2 py-0.5 text-[#5eead4]">{spec.coolingDelta}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bonsai Collection Selection */}
            <div className="rounded-2xl border border-[#1c2e2e] bg-[#0c1a1a]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#99f6e4]">
                Tác Phẩm Bonsai Thủy Đình
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
                          ? 'border-[#0d9488] bg-[#122b2b] text-[#f0fdfa]'
                          : 'border-[#172c2c] bg-[#0f2121] text-[#94a3b8] hover:border-[#1c2e2e]'
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
              <div className="mt-6 rounded-xl border border-[#1c2e2e] bg-[#102222] p-4 text-xs leading-relaxed text-[#94a3b8]">
                <strong className="text-[#2dd4bf]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Kết cấu thủy đình gỗ Long Não
                được mộng nêm thủ công không đinh ốc, hàm lượng tinh dầu tự nhiên kháng ẩm mốc và bảo vệ trọn vẹn sức khỏe gia chủ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
