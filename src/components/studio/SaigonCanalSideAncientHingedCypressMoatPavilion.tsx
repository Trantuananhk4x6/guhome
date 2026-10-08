'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio frequency for peaceful garden meditation
const FREQ_528HZ = 528

interface CypressPavilionSpec {
  id: string
  name: string
  woodOrigin: string
  age: string
  coolingDelta: string
  relativeHumidity: string
  feature: string
  description: string
}

const CYPRESS_PAVILION_SPECS: readonly CypressPavilionSpec[] = [
  {
    id: 'bach-xanh-moc-chau-135',
    name: 'Gỗ Bách Xanh Mộc Châu Đại Thụ 135 Năm',
    woodOrigin: 'Vách Núi Đá Vôi Mộc Châu Khai Thác Chọn Lọc',
    age: '135 Năm Tuổi',
    coolingDelta: '-5.2°C So Với Ngoài Trời',
    relativeHumidity: 'Duy Trì 50% - 54% RH Tự Nhiên',
    feature: 'Cửa bản lề cối gỗ mộng nêm chìm sâu ngậm tinh dầu thơm ngát',
    description: 'Thớ gỗ đanh mịn màu vàng xanh ánh ngọc quý phái, tỏa hương thơm thảo mộc the mát xua tan mệt mỏi và bảo tồn khí trường thanh tịnh ven kênh rạch Sài Gòn.',
  },
  {
    id: 'ngoc-am-ha-giang-125',
    name: 'Gỗ Ngọc Am Cổ Thụ Hà Giang 125 Năm',
    woodOrigin: 'Rừng Già Núi Đá Tây Côn Lĩnh',
    age: '125 Năm Tuổi',
    coolingDelta: '-5.0°C So Với Ngoài Trời',
    relativeHumidity: 'Cân Bằng 53% - 57% RH',
    feature: 'Bản lề cối gỗ mộng nêm xoay êm ái đón luồng gió đối lưu tự nhiên',
    description: 'Hàm lượng tinh dầu ngọc am dồi dào tự kết tinh tuyết sương lấp lánh, kháng mối mọt và xua tan ẩm nhiệt khắc nghiệt mùa mưa phương Nam.',
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
    id: 'thong-do-hoang-gia-150',
    name: 'Thông Đỏ Cổ Thụ Dáng Trực Đa Thân Nghinh Phong',
    scientificName: 'Taxus wallichiana Ancient 150Y',
    age: '150 Năm Tuổi',
    style: 'Trực Đa Thân Nghinh Phong Soi Hào Sen',
    origin: 'Vườn Ươm Cổ Truyền GuHomes Thạnh Xuân',
    description: 'Vỏ đỏ tía cổ kính cuộn tròn từng múi cơ bắp, cành lá kim xanh biếc vươn dài che chở cho bàn trà thiền định dưới thủy đình.',
  },
  {
    id: 'tra-phuc-kien-co-thu-130',
    name: 'Trà Phúc Kiến Cổ Thụ Dáng Bạt Phong Hồi Đầu',
    scientificName: 'Carmona microphylla 130Y',
    age: '130 Năm Tuổi',
    style: 'Bạt Phong Hồi Đầu Kiên Cường Bất Khuất',
    origin: 'Bộ Sưu Tập Cổ Thụ Nam Bộ',
    description: 'Bộ rễ cổ thụ nổi gân cuồn cuộn bám chặt khối đá sa thạch tự nhiên, hoa trắng li ti điểm xuyết vẻ đẹp thanh nhã kiêu kỳ.',
  },
]

export function SaigonCanalSideAncientHingedCypressMoatPavilion() {
  const [activeSpec, setActiveSpec] = useState<CypressPavilionSpec>(CYPRESS_PAVILION_SPECS[0]!)
  const [activeBonsai, setActiveBonsai] = useState<BonsaiMasterpiece>(BONSAI_LIST[0]!)
  const [rotationAngle, setRotationAngle] = useState(85)
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
    <section className="relative overflow-hidden bg-[#09110f] py-20 text-[#def0ea]">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#09110f] to-transparent opacity-80" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#1a2d26] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#34d399]">
                Kiến Trúc Thủy Đình Vi Khí Hậu Sài Gòn
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#f0fdf7] sm:text-4xl">
                Thủy Đình Gỗ Bách Xanh 135 Năm & Hào Sen Bách Diệp
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#1c3d31] bg-[#10241d] px-4 py-2 text-xs tracking-wider text-[#a7f3d0] transition-colors hover:border-[#10b981] hover:bg-[#153026]"
              aria-label={soundEnabled ? 'Tắt âm thanh thiền trà 528Hz' : 'Bật âm thanh thiền trà 528Hz'}
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#34d399]" />
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

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#94a39f] sm:text-base">
            Kiến trúc thủy đình ven sông dựng từ gỗ Bách Xanh Mộc Châu 135 năm tuổi ngậm tinh dầu thơm ngát tự nhiên,
            hệ cửa bản lề cối gỗ mộng nêm truyền thống không đinh kim loại kết hợp hào sen bách diệp giúp hạ nhiệt độ thực tế -5.2°C.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Simulation Display (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1a2d26] bg-[#0c1a15]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Top Stats Bar */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#182922] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#11241e] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Nhiệt Độ Hạ</div>
                <div className="mt-0.5 text-base font-semibold text-[#34d399] sm:text-lg">{activeSpec.coolingDelta}</div>
              </div>
              <div className="rounded-lg bg-[#11241e] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Ẩm Độ Tự Nhiên</div>
                <div className="mt-0.5 text-base font-semibold text-[#6ee7b7] sm:text-lg">{activeSpec.relativeHumidity}</div>
              </div>
              <div className="rounded-lg bg-[#11241e] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b]">Tuổi Gỗ Bách Xanh</div>
                <div className="mt-0.5 text-base font-semibold text-[#a7f3d0] sm:text-lg">{activeSpec.age}</div>
              </div>
            </div>

            {/* Visual Canvas: Water Moat & Pavilion Elevation */}
            <div className="relative my-8 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#162921] bg-gradient-to-b from-[#0e1d17] to-[#07110d] p-6 text-center">
              {/* Lotus Leaves & Water Ripple Ripples */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#059669]/20 to-transparent">
                <div className="absolute inset-x-0 bottom-3 flex justify-around opacity-40">
                  <div className="h-4 w-14 rounded-full border border-[#34d399]/40 bg-[#34d399]/10" />
                  <div className="h-5 w-18 rounded-full border border-[#34d399]/40 bg-[#34d399]/10" />
                  <div className="h-4 w-16 rounded-full border border-[#34d399]/40 bg-[#34d399]/10" />
                </div>
              </div>

              {/* Hinged Wooden Doors Animation */}
              <div className="relative z-10 flex items-center justify-center gap-6">
                {/* Left Door */}
                <motion.div
                  animate={{ rotateY: doorOpen ? -46 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-44 w-24 flex-col justify-between rounded border-2 border-[#34d399]/40 bg-gradient-to-b from-[#3a2c14] to-[#1e1709] p-2 shadow-2xl"
                  style={{ transformOrigin: 'left center' }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-[#d97706]/80">Cửa Cối Tả</div>
                  <div className="space-y-1">
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                  </div>
                  <div className="text-[9px] text-[#34d399]">Bách Xanh thơm ngát</div>
                </motion.div>

                {/* Central Tea Altar & Bonsai Platform */}
                <div className="relative flex flex-col items-center">
                  {/* Rotating Bonsai */}
                  <motion.div
                    animate={{ rotate: rotationAngle }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    className="flex h-28 w-28 items-center justify-center rounded-full border border-[#6ee7b7]/40 bg-[#10271f]/90 shadow-inner"
                  >
                    <div className="text-center">
                      <div className="text-xs font-serif text-[#a7f3d0]">{activeBonsai.name.split(' ')[0]}</div>
                      <div className="text-[9px] text-[#34d399]">{activeBonsai.age}</div>
                    </div>
                  </motion.div>

                  {/* Water Moat label */}
                  <div className="mt-3 rounded-full border border-[#059669]/40 bg-[#059669]/20 px-3 py-1 text-[10px] text-[#a7f3d0]">
                    Hào Sen Bách Diệp Hạ Nhiệt 5.2°C
                  </div>
                </div>

                {/* Right Door */}
                <motion.div
                  animate={{ rotateY: doorOpen ? 46 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-44 w-24 flex-col justify-between rounded border-2 border-[#34d399]/40 bg-gradient-to-b from-[#3a2c14] to-[#1e1709] p-2 shadow-2xl"
                  style={{ transformOrigin: 'right center' }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-[#d97706]/80">Cửa Cối Hữu</div>
                  <div className="space-y-1">
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                    <div className="h-0.5 w-full bg-[#78350f]/50" />
                  </div>
                  <div className="text-[9px] text-[#34d399]">Bách Xanh thơm ngát</div>
                </motion.div>
              </div>

              {/* Live Info Banner */}
              <div className="mt-6 text-xs text-[#94a39f]">
                Trạng thái: <span className="text-[#34d399]">{doorOpen ? 'Mở cửa cối đón trọn luồng gió mát mặt hồ' : 'Khép cửa chắn gió lộng đêm khuya'}</span>
              </div>
            </div>

            {/* Interactive Control Sliders & Buttons */}
            <div className="space-y-4 border-t border-[#182922] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setDoorOpen(!doorOpen)
                    playMeditationSound()
                  }}
                  className="rounded-lg border border-[#059669]/50 bg-[#059669]/15 px-4 py-2 text-xs font-medium text-[#a7f3d0] transition-all hover:bg-[#059669]/25"
                >
                  {doorOpen ? 'Đóng Bản Lề Cối Gỗ' : 'Mở Bung Cửa Cối Đón Gió'}
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#94a39f]">Xoay Bệ Bonsai 360°:</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotationAngle}
                    onChange={(e) => {
                      setRotationAngle(Number(e.target.value))
                    }}
                    className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-[#1a2d26] accent-[#34d399]"
                  />
                  <span className="w-8 text-right font-mono text-xs text-[#34d399]">{rotationAngle}°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration & Selection Panel (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Timber Specification Selection */}
            <div className="rounded-2xl border border-[#1a2d26] bg-[#0c1a15]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
                Vật Liệu Gỗ Bách Xanh Cổ Thụ & Ngọc Am
              </h3>
              <p className="mt-1 text-xs text-[#64748b]">
                Chọn chủng loại danh mộc quý hiếm được gia công mộng nêm thủ công tại xưởng GuHomes Thạnh Xuân:
              </p>

              <div className="mt-4 space-y-3">
                {CYPRESS_PAVILION_SPECS.map((spec) => {
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
                          ? 'border-[#10b981] bg-[#122b22] text-[#f0fdf7]'
                          : 'border-[#172c23] bg-[#0f211a] text-[#94a39f] hover:border-[#1a2d26]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#e2e8e4]">{spec.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#34d399]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#94a39f]">{spec.description}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#143226] px-2 py-0.5 text-[#34d399]">{spec.woodOrigin}</span>
                        <span className="rounded bg-[#143226] px-2 py-0.5 text-[#6ee7b7]">{spec.coolingDelta}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bonsai Collection Selection */}
            <div className="rounded-2xl border border-[#1a2d26] bg-[#0c1a15]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a7f3d0]">
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
                          ? 'border-[#10b981] bg-[#122b22] text-[#f0fdf7]'
                          : 'border-[#172c23] bg-[#0f211a] text-[#94a39f] hover:border-[#1a2d26]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-medium text-[#e2e8e4]">{bonsai.name}</span>
                        <span className="text-[10px] text-[#34d399]">{bonsai.age}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#64748b]">{bonsai.description}</p>
                    </button>
                  )
                })}
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#1a2d26] bg-[#10221a] p-4 text-xs leading-relaxed text-[#94a39f]">
                <strong className="text-[#34d399]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Kết cấu thủy đình gỗ Bách Xanh
                được mộng nêm thủ công không đinh ốc, hàm lượng tinh dầu tự nhiên kháng ẩm mốc và bảo vệ trọn vẹn sức khỏe gia chủ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
