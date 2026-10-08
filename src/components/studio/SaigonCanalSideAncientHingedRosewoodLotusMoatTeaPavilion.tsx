'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio frequency for peaceful garden meditation
const FREQ_528HZ = 528

interface RosewoodPavilionSpec {
  id: string
  name: string
  woodOrigin: string
  age: string
  coolingDelta: string
  relativeHumidity: string
  feature: string
  description: string
}

const ROSEWOOD_PAVILION_SPECS: readonly RosewoodPavilionSpec[] = [
  {
    id: 'trac-do-den-nam-bo-115',
    name: 'Gỗ Trắc Đỏ Đen Nam Bộ Cổ Thụ 115 Năm',
    woodOrigin: 'Rừng Nguyên Sinh Tây Nguyên Khai Thác Chọn Lọc',
    age: '115 Năm Tuổi',
    coolingDelta: '-4.8°C So Với Ngoài Trời',
    relativeHumidity: 'Duy Trì 56% - 60% RH',
    feature: 'Cửa bản lề cối gỗ mộng nêm truyền thống không đinh ốc',
    description: 'Thớ gỗ Trắc đỏ đen đầm chắc tỷ trọng 1.15 g/cm³ chìm hoàn toàn trong nước, chịu đựng tuyệt đối hơi ẩm 80% ven kênh rạch Sài Gòn mà không co ngót cong vênh.',
  },
  {
    id: 'trac-day-tay-nguyen-105',
    name: 'Gỗ Trắc Dây Đại Ngàn Tây Nguyên 105 Năm',
    woodOrigin: 'Vùng Rừng Núi Kon Tum Đại Ngàn',
    age: '105 Năm Tuổi',
    coolingDelta: '-4.6°C So Với Ngoài Trời',
    relativeHumidity: 'Cân Bằng 58% - 62% RH',
    feature: 'Bản lề cối gỗ xoay êm ái đón gió đối lưu tự nhiên',
    description: 'Thớ gỗ ánh sắc tím đen huyền ảo, vân gỗ chìm nổi như sóng nước cuộn trào, tỏa ra năng lượng an tĩnh giúp gia chủ lắng đọng tâm hồn.',
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
    id: 'mai-chieu-thuy-nam-bo-120',
    name: 'Mai Chiếu Thủy Nam Bộ Dáng Bay Nghinh Phong',
    scientificName: 'Wrightia religiosa Ancient Bonsai',
    age: '120 Năm Tuổi',
    style: 'Nghinh Phong Vươn Ra Mặt Hào Sen',
    origin: 'Vườn Ươm Cổ Truyền GuHomes Thạnh Xuân',
    description: 'Thân xù xì bám rêu phong cổ kính, hoa trắng li ti rủ bóng xuống mặt hào sen tỏa hương thanh khiết ngào ngạt mỗi độ đêm về.',
  },
  {
    id: 'tung-la-han-nhat-ban-135',
    name: 'Tùng La Hán Bách Niên Dáng Thác Đổ',
    scientificName: 'Podocarpus macrophyllus 135Y',
    age: '135 Năm Tuổi',
    style: 'Huyền Vũ Thác Đổ Trấn Giữ Thủy Đình',
    origin: 'Bộ Sưu Tập Cây Cổ Hoàng Gia',
    description: 'Tán lá xanh mướt quanh năm tầng tầng lớp lớp, biểu tượng cho sự trường thọ vĩnh cửu và nền tảng gia đạo hưng thịnh vững bền.',
  },
]

export function SaigonCanalSideAncientHingedRosewoodLotusMoatTeaPavilion() {
  const [activeSpec, setActiveSpec] = useState<RosewoodPavilionSpec>(ROSEWOOD_PAVILION_SPECS[0]!)
  const [activeBonsai, setActiveBonsai] = useState<BonsaiMasterpiece>(BONSAI_LIST[0]!)
  const [rotationAngle, setRotationAngle] = useState(60)
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

      // 528Hz Solfeggio fundamental tone
      const osc1 = audioCtxRef.current.createOscillator()
      const gain1 = audioCtxRef.current.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(FREQ_528HZ, now)

      gain1.gain.setValueAtTime(0.0001, now)
      gain1.gain.linearRampToValueAtTime(0.2, now + 0.05)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 4.2)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)
      osc1.start(now)
      osc1.stop(now + 4.25)

      // Ambient stream water flow (Bandpassed white noise simulation)
      const bufferSize = audioCtxRef.current.sampleRate * 2.5
      const noiseBuffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.08
      }

      const whiteNoise = audioCtxRef.current.createBufferSource()
      whiteNoise.buffer = noiseBuffer

      const filter = audioCtxRef.current.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, now)
      filter.Q.setValueAtTime(3.0, now)

      const noiseGain = audioCtxRef.current.createGain()
      noiseGain.gain.setValueAtTime(0.0001, now)
      noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.1)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)

      whiteNoise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(audioCtxRef.current.destination)

      whiteNoise.start(now)
      whiteNoise.stop(now + 2.5)
    } catch {
      // Audio playback silently ignored if blocked by browser policy
    }
  }

  const toggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    if (nextState) playMeditationSound()
  }

  const handleBonsaiChange = (bonsai: BonsaiMasterpiece) => {
    setActiveBonsai(bonsai)
    playMeditationSound()
  }

  const handleSpecChange = (spec: RosewoodPavilionSpec) => {
    setActiveSpec(spec)
    playMeditationSound()
  }

  return (
    <section className="relative overflow-hidden bg-[#0d0908] py-20 text-[#ece4e0] border-t border-[#30201c]">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,83,0.06),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(180,83,9,0.05),transparent_70%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#d4a853]">
            Kiến Trúc Sinh Thái Vi Khí Hậu Sài Gòn · Thủy Đình GuHomes
          </div>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-[#f8f4f0] sm:text-4xl lg:text-5xl">
            Thủy Đình Gỗ Trắc Cổ Thụ, Cửa Cối & Hào Nước Sen Bách Diệp
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b5a69d] sm:text-base">
            Kiệt tác không gian thưởng trà ven kênh rạch Sài Gòn, dựng từ cột kèo gỗ Trắc đỏ đen cổ thụ 115 năm tuổi đầm chắc,
            cửa bản lề cối mộng nêm xoay êm ái, hào sen Bách Diệp tuần hoàn hạ nhiệt 4.8°C tự nhiên và đài xoay Bonsai 360° đón ánh dương.
          </p>

          {/* Sound Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={toggleSound}
              className="inline-flex items-center gap-2 rounded-full border border-[#523d2e] bg-[#1a120c] px-4 py-2 text-xs text-[#d4a853] transition-colors hover:border-[#d4a853]"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#d4a853]" />
                  <span>Âm Ba Suối Thiền 528Hz Đang Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#8a7663]" />
                  <span>Bật Âm Ba Suối Reo & Chuông Thiền 528Hz</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: 360 Bonsai Platform & Hinged Door Visualizer */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-[#443024] bg-[#18110d]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d1f18] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4a853]">Vi Khí Hậu & Phong Thủy Độc Bản</span>
                  <h3 className="font-serif text-xl font-medium text-[#f5eee8] sm:text-2xl">
                    Đài Thưởng Trà & Bệ Xoay Bonsai 360°
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#634832] bg-[#22160f] px-3 py-1.5 text-xs text-[#d4a853]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#d4a853] animate-pulse" />
                  <span>Hạ Nhiệt Thực Tế: {activeSpec.coolingDelta}</span>
                </div>
              </div>

              {/* Graphic Visual Stage: Rotating Bonsai & Hinged Louvers */}
              <div className="relative my-8 flex h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-[#3b281d] bg-gradient-to-b from-[#1f140e] to-[#0c0806] p-6 text-center">
                {/* Simulated Water Ripples of Lotus Moat */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,168,83,0.08),transparent_70%)]" />

                {/* Rotating Bonsai Vessel */}
                <motion.div
                  animate={{ rotate: rotationAngle }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#d4a853]/60 bg-gradient-to-br from-[#2d1b11] via-[#1a0f0a] to-[#0d0705] shadow-[0_0_35px_rgba(212,168,83,0.2)]"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-2xl font-bold tracking-widest text-[#f5d796]">BONSAI</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#d4a853]">{activeBonsai.age}</span>
                  </div>
                  {/* Subtle 360 markers */}
                  <div className="absolute top-2 h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
                  <div className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
                  <div className="absolute left-2 h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
                  <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
                </motion.div>

                {/* Status Indicator */}
                <div className="relative z-10 mt-6">
                  <div className="text-xs uppercase tracking-widest text-[#a8927d]">Góc Xoay Đón Gió Kênh Rạch: {rotationAngle}°</div>
                  <div className="mt-1 font-serif text-sm font-medium text-[#f5eee8]">
                    {activeBonsai.name} ({doorOpen ? 'Cửa Cối Mở Thoáng Đón Gió' : 'Cửa Cối Khép Kín Giữ Tĩnh Lặng'})
                  </div>
                </div>
              </div>

              {/* Angle Slider & Door Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#b8a898]">
                  <span>Điều Chỉnh Góc Xoay Bonsai (0° - 360°):</span>
                  <span className="font-mono text-[#d4a853]">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={rotationAngle}
                  onChange={(e) => {
                    setRotationAngle(Number(e.target.value))
                    playMeditationSound()
                  }}
                  className="w-full cursor-pointer accent-[#d4a853] h-1.5 rounded-lg bg-[#2d1f18]"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      setRotationAngle((prev) => (prev + 90) % 360)
                      playMeditationSound()
                    }}
                    className="rounded-lg border border-[#523d2e] bg-[#1a120c] px-4 py-2 text-xs text-[#d4a853] transition-colors hover:border-[#d4a853]"
                  >
                    Xoay Thêm +90° Theo Chiều Gió
                  </button>

                  <button
                    onClick={() => {
                      setDoorOpen(!doorOpen)
                      playMeditationSound()
                    }}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      doorOpen
                        ? 'bg-[#d4a853] text-[#1a120c] shadow-[0_0_20px_rgba(212,168,83,0.3)]'
                        : 'border border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853]/10'
                    }`}
                  >
                    {doorOpen ? 'Đang Mở Cửa Cối (Bấm Để Khép)' : 'Khép Cửa Cối (Bấm Để Mở Thoáng)'}
                  </button>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#2d1f18] pt-6 text-center">
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Gỗ Cổ Thụ</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#f5eee8]">{activeSpec.age}</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Hạ Nhiệt</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#d4a853]">{activeSpec.coolingDelta}</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Cửa Bản Lề</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#f5eee8]">Mộng Nêm Cối</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Độ Ẩm Tự Nhiên</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#d4a853]">56% - 60% RH</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Wood Spec Selector & Bonsai Masterpieces */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Wood Spec Selection */}
            <div className="rounded-2xl border border-[#443024] bg-[#18110d]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <h3 className="font-serif text-lg font-medium text-[#f5eee8] uppercase tracking-wider">
                Vật Liệu Gỗ Trắc Cổ Thụ Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#a8927d]">
                Chọn dòng danh mộc tích tụ linh khí để khảo sát cơ chế điều hòa vi khí hậu.
              </p>

              <div className="mt-5 space-y-3">
                {ROSEWOOD_PAVILION_SPECS.map((spec) => {
                  const isSelected = spec.id === activeSpec.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleSpecChange(spec)}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-[#d4a853] bg-[#291b12] shadow-[0_0_15px_rgba(212,168,83,0.15)]'
                          : 'border-[#332218] bg-[#1a120c] hover:border-[#523d2e]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-[#f5eee8]">{spec.name}</span>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#d4a853]" />}
                      </div>
                      <div className="mt-1 text-xs text-[#d4a853]">{spec.woodOrigin}</div>
                      <div className="mt-2 text-xs leading-relaxed text-[#a8927d]">{spec.description}</div>
                    </button>
                  )
                })}
              </div>

              {/* Bonsai Masterpieces Picker */}
              <div className="mt-8 border-t border-[#2d1f18] pt-6">
                <h4 className="font-serif text-sm font-medium uppercase tracking-wider text-[#d4a853]">
                  Tác Phẩm Bonsai Bách Niên
                </h4>
                <div className="mt-3 space-y-2">
                  {BONSAI_LIST.map((bonsai) => {
                    const isSelected = bonsai.id === activeBonsai.id
                    return (
                      <button
                        key={bonsai.id}
                        onClick={() => handleBonsaiChange(bonsai)}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          isSelected
                            ? 'border-[#d4a853] bg-[#241710]'
                            : 'border-[#332218] bg-[#120b08] hover:border-[#4d3524]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-[#f5eee8]">
                          <span>{bonsai.name}</span>
                          <span className="text-[10px] text-[#d4a853]">{bonsai.age}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-[#8a7663]">{bonsai.description}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#523d2e]/40 bg-[#1e140d]/60 p-4 text-xs leading-relaxed text-[#b8a898]">
                <strong className="text-[#d4a853]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Kết cấu thủy đình gỗ
                Trắc đỏ đen được xẻ mộng thủ công bằng tay, sấy khô vi mô giữ trọn thớ vân tự nhiên và bảo hành kết cấu
                vĩnh viễn qua nhiều thế hệ gia chủ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
