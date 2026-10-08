'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio frequency for peaceful garden meditation
const FREQ_528HZ = 528

interface AgarwoodPavilionSpec {
  id: string
  name: string
  woodOrigin: string
  age: string
  coolingDelta: string
  relativeHumidity: string
  feature: string
  description: string
}

const AGARWOOD_PAVILION_SPECS: readonly AgarwoodPavilionSpec[] = [
  {
    id: 'tram-huong-khanh-hoa-110',
    name: 'Gỗ Dó Bầu Trầm Hương Khánh Hòa 110 Năm',
    woodOrigin: 'Vùng Rừng Núi Vạn Giã (Khánh Hòa)',
    age: '110 Năm Tuổi',
    coolingDelta: '-4.9°C So Với Ngoài Trời',
    relativeHumidity: 'Duy Trì 55% - 58% RH Tự Nhiên',
    feature: 'Cửa bản lề cối gỗ mộng nêm truyền thống không đinh ốc',
    description: 'Thớ gỗ ngậm tinh dầu trầm hương tự nhiên quý giá, lan tỏa hương thơm dịu ngọt thanh khiết xua tan mệt mỏi và cân bằng trường khí sinh học.',
  },
  {
    id: 'dau-gio-dai-thu-100',
    name: 'Gỗ Dầu Gió Đại Thụ Rừng Già Nam Bộ 100 Năm',
    woodOrigin: 'Rừng Nguyên Sinh Đông Nam Bộ Khai Thác Chọn Lọc',
    age: '100 Năm Tuổi',
    coolingDelta: '-4.7°C So Với Ngoài Trời',
    relativeHumidity: 'Cân Bằng 58% - 62% RH',
    feature: 'Bản lề cối gỗ mộng nêm xoay êm ái đón gió mát',
    description: 'Chất gỗ dầu cổ thụ đanh chắc, chịu đựng hoàn hảo khí hậu nắng mưa hai mùa của Sài Gòn, vân gỗ thẳng tắp toát lên vẻ trang nghiêm đĩnh đạc.',
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
    id: 'tung-la-han-khanh-hoa-128',
    name: 'Tùng La Hán Khánh Hòa Dáng Hoành Nghinh Thủy',
    scientificName: 'Podocarpus costalis 128Y',
    age: '128 Năm Tuổi',
    style: 'Hoành Nghinh Thủy Soi Bóng Hào Sen',
    origin: 'Vườn Ươm Cổ Truyền GuHomes Thạnh Xuân',
    description: 'Thân vươn ngang mặt nước 2.1m, bộ tán tầng lớp như mây bay che chở cho bàn trà thiền định dưới thủy đình.',
  },
  {
    id: 'sanh-co-thu-dong-nai-115',
    name: 'Sanh Cổ Thụ Đồng Nai Dáng Trực Đa Thân',
    scientificName: 'Ficus benjamina Ancient 115Y',
    age: '115 Năm Tuổi',
    style: 'Trực Đa Thân Cổ Kính Uy Nghi',
    origin: 'Bộ Sưu Tập Cổ Thụ Nam Bộ',
    description: 'Bộ rễ cổ thụ cuồn cuộn ôm trọn khối đá sa thạch Non Nước, tràn đầy sinh khí và năng lượng trường tồn.',
  },
]

export function SaigonCanalSideAncientHingedAgarwoodMoatPavilion() {
  const [activeSpec, setActiveSpec] = useState<AgarwoodPavilionSpec>(AGARWOOD_PAVILION_SPECS[0]!)
  const [activeBonsai, setActiveBonsai] = useState<BonsaiMasterpiece>(BONSAI_LIST[0]!)
  const [rotationAngle, setRotationAngle] = useState(75)
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

  const handleSpecChange = (spec: AgarwoodPavilionSpec) => {
    setActiveSpec(spec)
    playMeditationSound()
  }

  return (
    <section className="relative overflow-hidden bg-[#0c0d0d] py-20 text-[#e4e8e8] border-t border-[#222a2a]">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.05),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04),transparent_70%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#14b8a6]">
            Kiến Trúc Sinh Thái Vi Khí Hậu Sài Gòn · Thủy Đình GuHomes
          </div>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-[#f4f7f7] sm:text-4xl lg:text-5xl">
            Thủy Đình Trầm Hương Cổ Thụ, Cửa Cối & Hào Nước Sen Bách Diệp
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#a8b5b5] sm:text-base">
            Kiệt tác không gian trà thất ven kênh rạch Sài Gòn, dựng từ cột kèo gỗ Dó Bầu Trầm Hương 110 năm tuổi đầm ấm,
            cửa bản lề cối mộng nêm xoay êm ái, hào sen Bách Diệp tuần hoàn hạ nhiệt 4.9°C tự nhiên và đài xoay Bonsai 360° đón ánh dương.
          </p>

          {/* Sound Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={toggleSound}
              className="inline-flex items-center gap-2 rounded-full border border-[#2b3838] bg-[#131c1c] px-4 py-2 text-xs text-[#14b8a6] transition-colors hover:border-[#14b8a6]"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#14b8a6]" />
                  <span>Âm Ba Suối Thiền 528Hz Đang Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#758888]" />
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
            <div className="relative overflow-hidden rounded-2xl border border-[#2a3838] bg-[#121919]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1f2929] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#14b8a6]">Vi Khí Hậu & Phong Thủy Độc Bản</span>
                  <h3 className="font-serif text-xl font-medium text-[#edf3f3] sm:text-2xl">
                    Đài Thưởng Trà & Bệ Xoay Bonsai 360°
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#374c4c] bg-[#182323] px-3 py-1.5 text-xs text-[#14b8a6]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#14b8a6] animate-pulse" />
                  <span>Hạ Nhiệt Thực Tế: {activeSpec.coolingDelta}</span>
                </div>
              </div>

              {/* Graphic Visual Stage: Rotating Bonsai & Hinged Louvers */}
              <div className="relative my-8 flex h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-[#243333] bg-gradient-to-b from-[#142121] to-[#0a1010] p-6 text-center">
                {/* Simulated Water Ripples of Lotus Moat */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(20,184,166,0.08),transparent_70%)]" />

                {/* Rotating Bonsai Vessel */}
                <motion.div
                  animate={{ rotate: rotationAngle }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#14b8a6]/60 bg-gradient-to-br from-[#1b2d2d] via-[#101e1e] to-[#0a1212] shadow-[0_0_35px_rgba(20,184,166,0.2)]"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-2xl font-bold tracking-widest text-[#99f6e4]">BONSAI</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#14b8a6]">{activeBonsai.age}</span>
                  </div>
                  {/* Subtle 360 markers */}
                  <div className="absolute top-2 h-1.5 w-1.5 rounded-full bg-[#14b8a6]" />
                  <div className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-[#14b8a6]" />
                  <div className="absolute left-2 h-1.5 w-1.5 rounded-full bg-[#14b8a6]" />
                  <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-[#14b8a6]" />
                </motion.div>

                {/* Status Indicator */}
                <div className="relative z-10 mt-6">
                  <div className="text-xs uppercase tracking-widest text-[#7f9999]">Góc Xoay Đón Gió Kênh Rạch: {rotationAngle}°</div>
                  <div className="mt-1 font-serif text-sm font-medium text-[#edf3f3]">
                    {activeBonsai.name} ({doorOpen ? 'Cửa Cối Mở Thoáng Đón Gió' : 'Cửa Cối Khép Kín Giữ Tĩnh Lặng'})
                  </div>
                </div>
              </div>

              {/* Angle Slider & Door Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#a8b5b5]">
                  <span>Điều Chỉnh Góc Xoay Bonsai (0° - 360°):</span>
                  <span className="font-mono text-[#14b8a6]">{rotationAngle}°</span>
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
                  className="w-full cursor-pointer accent-[#14b8a6] h-1.5 rounded-lg bg-[#1f2929]"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      setRotationAngle((prev) => (prev + 90) % 360)
                      playMeditationSound()
                    }}
                    className="rounded-lg border border-[#374c4c] bg-[#131c1c] px-4 py-2 text-xs text-[#14b8a6] transition-colors hover:border-[#14b8a6]"
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
                        ? 'bg-[#14b8a6] text-[#0a1212] shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                        : 'border border-[#14b8a6] text-[#14b8a6] hover:bg-[#14b8a6]/10'
                    }`}
                  >
                    {doorOpen ? 'Đang Mở Cửa Cối (Bấm Để Khép)' : 'Khép Cửa Cối (Bấm Để Mở Thoáng)'}
                  </button>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#1f2929] pt-6 text-center">
                <div className="rounded-lg bg-[#131c1c] p-2.5">
                  <div className="text-[10px] text-[#758888] uppercase">Gỗ Cổ Thụ</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#edf3f3]">{activeSpec.age}</div>
                </div>
                <div className="rounded-lg bg-[#131c1c] p-2.5">
                  <div className="text-[10px] text-[#758888] uppercase">Hạ Nhiệt</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#14b8a6]">{activeSpec.coolingDelta}</div>
                </div>
                <div className="rounded-lg bg-[#131c1c] p-2.5">
                  <div className="text-[10px] text-[#758888] uppercase">Cửa Bản Lề</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#edf3f3]">Mộng Nêm Cối</div>
                </div>
                <div className="rounded-lg bg-[#131c1c] p-2.5">
                  <div className="text-[10px] text-[#758888] uppercase">Độ Ẩm Tự Nhiên</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#14b8a6]">55% - 58% RH</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Wood Spec Selector & Bonsai Masterpieces */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Wood Spec Selection */}
            <div className="rounded-2xl border border-[#2a3838] bg-[#121919]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <h3 className="font-serif text-lg font-medium text-[#edf3f3] uppercase tracking-wider">
                Vật Liệu Gỗ Trầm Hương Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#7f9999]">
                Chọn dòng danh mộc tích tụ tinh dầu thơm để khảo sát cơ chế điều hòa vi khí hậu.
              </p>

              <div className="mt-5 space-y-3">
                {AGARWOOD_PAVILION_SPECS.map((spec) => {
                  const isSelected = spec.id === activeSpec.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleSpecChange(spec)}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-[#14b8a6] bg-[#1a2c2c] shadow-[0_0_15px_rgba(20,184,166,0.15)]'
                          : 'border-[#223030] bg-[#131c1c] hover:border-[#384c4c]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-[#edf3f3]">{spec.name}</span>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#14b8a6]" />}
                      </div>
                      <div className="mt-1 text-xs text-[#14b8a6]">{spec.woodOrigin}</div>
                      <div className="mt-2 text-xs leading-relaxed text-[#7f9999]">{spec.description}</div>
                    </button>
                  )
                })}
              </div>

              {/* Bonsai Masterpieces Picker */}
              <div className="mt-8 border-t border-[#1f2929] pt-6">
                <h4 className="font-serif text-sm font-medium uppercase tracking-wider text-[#14b8a6]">
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
                            ? 'border-[#14b8a6] bg-[#192929]'
                            : 'border-[#223030] bg-[#0e1414] hover:border-[#334646]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-[#edf3f3]">
                          <span>{bonsai.name}</span>
                          <span className="text-[10px] text-[#14b8a6]">{bonsai.age}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-[#758888]">{bonsai.description}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#2b3a3a]/60 bg-[#142020]/60 p-4 text-xs leading-relaxed text-[#9eb5b5]">
                <strong className="text-[#14b8a6]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Kết cấu thủy đình gỗ
                Trầm Hương được bào mộng thủ công bằng tay, sấy khô vi mô giữ trọn tinh dầu tự nhiên và bảo hành kết cấu
                vĩnh viễn qua nhiều thế hệ gia chủ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
