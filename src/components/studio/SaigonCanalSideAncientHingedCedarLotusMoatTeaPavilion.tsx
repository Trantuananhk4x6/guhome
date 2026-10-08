'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio frequency for peaceful garden meditation
const FREQ_528HZ = 528

interface CedarPavilionSpec {
  id: string
  name: string
  woodOrigin: string
  age: string
  coolingDelta: string
  relativeHumidity: string
  feature: string
  description: string
}

const CEDAR_PAVILION_SPECS: readonly CedarPavilionSpec[] = [
  {
    id: 'himalayan-cedar-105',
    name: 'Gỗ Tuyết Tùng Cổ Thụ Himalaya Bách Niên',
    woodOrigin: 'Rừng Già Cao Nguyên 2.800m Khai Thác Chọn Lọc',
    age: '105 Năm Tuổi',
    coolingDelta: '-4.7°C So Với Ngoài Trời',
    relativeHumidity: 'Cân Bằng 58% - 62% RH Nhờ Thớ Gỗ Tự Thở',
    feature: 'Cửa bản lề cối gỗ mộng nêm truyền thống, không đinh ốc',
    description: 'Thớ gỗ ngậm tinh dầu tuyết tùng thơm thanh mát tự nhiên, tỏa hương xua đuổi côn trùng và làm dịu nhẹ hệ thần kinh trong những trưa nắng gắt Sài Gòn.',
  },
  {
    id: 'hoang-dan-tuyet-lang-son-95',
    name: 'Hoàng Đàn Tuyết Lạng Sơn Hoàng Triều',
    woodOrigin: 'Vùng Núi Đá Vôi Hữu Lũng (Lạng Sơn)',
    age: '95 Năm Tuổi',
    coolingDelta: '-4.8°C So Với Ngoài Trời',
    relativeHumidity: 'Giữ Ổn Định 55% - 60% RH',
    feature: 'Mặt gỗ kết tinh lớp tuyết trắng óng ánh như sương mai',
    description: 'Đệ nhất danh mộc phong thủy cung đình, lớp tinh dầu tự kết tinh hoa tuyết mịn như nhung trên bề mặt, phát tán hương thơm quý phái vĩnh cửu.',
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
    id: 'tung-tuyet-himalaya-125',
    name: 'Tùng Tuyết Himalaya Dáng Huyền Thác Đổ',
    scientificName: 'Cedrus deodara Bonsai',
    age: '125 Năm Tuổi',
    style: 'Huyền Vũ Thác Đổ Xuống Hào Sen',
    origin: 'Vườn Ươm Cổ Truyền GuHomes Thạnh Xuân',
    description: 'Tán lá kim xanh bạc vươn dài 1.8m phủ bóng xuống mặt hào sen Bách Diệp, biểu trưng cho sự kiên cường và thanh cao của gia chủ.',
  },
  {
    id: 'sanh-co-thu-nam-bo-110',
    name: 'Sanh Cổ Thụ Nam Bộ Dáng Trực Quân Tử',
    scientificName: 'Ficus benjamina Ancient Bonsai',
    age: '110 Năm Tuổi',
    style: 'Trực Quân Tử Cổ Thụ Ngạo Nghễ',
    origin: 'Vùng Đất Phù Sa Kênh Rạch Củ Chi',
    description: 'Rễ buông chùm vững chãi như chân cột đình làng cổ, cành tán tầng lớp như mây lượn che mát cho bàn trà đạo phía dưới.',
  },
]

export function SaigonCanalSideAncientHingedCedarLotusMoatTeaPavilion() {
  const [activeSpec, setActiveSpec] = useState<CedarPavilionSpec>(CEDAR_PAVILION_SPECS[0]!)
  const [activeBonsai, setActiveBonsai] = useState<BonsaiMasterpiece>(BONSAI_LIST[0]!)
  const [rotationAngle, setRotationAngle] = useState(45)
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

  const handleSpecChange = (spec: CedarPavilionSpec) => {
    setActiveSpec(spec)
    playMeditationSound()
  }

  return (
    <section className="relative overflow-hidden bg-[#0c0d0c] py-20 text-[#e4e7e4] border-t border-[#232923]">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04),transparent_70%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#10b981]">
            Kiến Trúc Sinh Thái Vi Khí Hậu Sài Gòn · Thủy Đình GuHomes
          </div>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-[#f4f7f4] sm:text-4xl lg:text-5xl">
            Thủy Đình Gỗ Tuyết Tùng Cổ Thụ, Cửa Cối & Hào Nước Sen Bách Diệp
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#a8b3a8] sm:text-base">
            Kiệt tác không gian thưởng trà ven kênh rạch Sài Gòn, dựng từ cột kèo gỗ Tuyết Tùng cổ thụ 105 năm tuổi thơm ngát,
            cửa bản lề cối mộc xoay không tiếng động, hào sen Bách Diệp tuần hoàn hạ nhiệt 4.7°C tự nhiên và đài xoay Bonsai 360° đón ánh dương.
          </p>

          {/* Sound Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={toggleSound}
              className="inline-flex items-center gap-2 rounded-full border border-[#2d3a2d] bg-[#141a14] px-4 py-2 text-xs text-[#10b981] transition-colors hover:border-[#10b981]"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#10b981]" />
                  <span>Âm Ba Suối Thiền 528Hz Đang Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#758575]" />
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
            <div className="relative overflow-hidden rounded-2xl border border-[#2d382d] bg-[#121712]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202920] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#10b981]">Vi Khí Hậu & Phong Thủy Độc Bản</span>
                  <h3 className="font-serif text-xl font-medium text-[#edf2ed] sm:text-2xl">
                    Đài Thưởng Trà & Bệ Xoay Bonsai 360°
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#3b4c3b] bg-[#1a231a] px-3 py-1.5 text-xs text-[#10b981]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span>Hạ Nhiệt Thực Tế: {activeSpec.coolingDelta}</span>
                </div>
              </div>

              {/* Graphic Visual Stage: Rotating Bonsai & Hinged Louvers */}
              <div className="relative my-8 flex h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-[#273327] bg-gradient-to-b from-[#161f16] to-[#0a0e0a] p-6 text-center">
                {/* Simulated Water Ripples of Lotus Moat */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_70%)]" />

                {/* Rotating Bonsai Vessel */}
                <motion.div
                  animate={{ rotate: rotationAngle }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#10b981]/50 bg-gradient-to-br from-[#1b2b1b] via-[#101c10] to-[#0d140d] shadow-[0_0_35px_rgba(16,185,129,0.2)]"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-2xl font-bold tracking-widest text-[#a7f3d0]">BONSAI</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#10b981]">{activeBonsai.age}</span>
                  </div>
                  {/* Subtle 360 markers */}
                  <div className="absolute top-2 h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  <div className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  <div className="absolute left-2 h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                </motion.div>

                {/* Status Indicator */}
                <div className="relative z-10 mt-6">
                  <div className="text-xs uppercase tracking-widest text-[#829982]">Góc Xoay Đón Gió Kênh Rạch: {rotationAngle}°</div>
                  <div className="mt-1 font-serif text-sm font-medium text-[#edf2ed]">
                    {activeBonsai.name} ({doorOpen ? 'Cửa Cối Mở Thoáng Đón Gió' : 'Cửa Cối Khép Kín Giữ Tĩnh Lặng'})
                  </div>
                </div>
              </div>

              {/* Angle Slider & Door Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#a8b3a8]">
                  <span>Điều Chỉnh Góc Xoay Bonsai (0° - 360°):</span>
                  <span className="font-mono text-[#10b981]">{rotationAngle}°</span>
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
                  className="w-full cursor-pointer accent-[#10b981] h-1.5 rounded-lg bg-[#202920]"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      setRotationAngle((prev) => (prev + 90) % 360)
                      playMeditationSound()
                    }}
                    className="rounded-lg border border-[#3b4c3b] bg-[#141a14] px-4 py-2 text-xs text-[#10b981] transition-colors hover:border-[#10b981]"
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
                        ? 'bg-[#10b981] text-[#0a100a] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10'
                    }`}
                  >
                    {doorOpen ? 'Đang Mở Cửa Cối (Bấm Để Khép)' : 'Khép Cửa Cối (Bấm Để Mở Thoáng)'}
                  </button>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#202920] pt-6 text-center">
                <div className="rounded-lg bg-[#141a14] p-2.5">
                  <div className="text-[10px] text-[#758575] uppercase">Gỗ Cổ Thụ</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#edf2ed]">{activeSpec.age}</div>
                </div>
                <div className="rounded-lg bg-[#141a14] p-2.5">
                  <div className="text-[10px] text-[#758575] uppercase">Hạ Nhiệt</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#10b981]">{activeSpec.coolingDelta}</div>
                </div>
                <div className="rounded-lg bg-[#141a14] p-2.5">
                  <div className="text-[10px] text-[#758575] uppercase">Cửa Bản Lề</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#edf2ed]">Mộng Nêm Cổ</div>
                </div>
                <div className="rounded-lg bg-[#141a14] p-2.5">
                  <div className="text-[10px] text-[#758575] uppercase">Độ Ẩm Tự Nhiên</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#10b981]">58% - 62% RH</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Wood Spec Selector & Bonsai Masterpieces */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Wood Spec Selection */}
            <div className="rounded-2xl border border-[#2d382d] bg-[#121712]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <h3 className="font-serif text-lg font-medium text-[#edf2ed] uppercase tracking-wider">
                Vật Liệu Gỗ Cổ Thụ Cung Đình
              </h3>
              <p className="mt-1 text-xs text-[#829982]">
                Chọn dòng danh mộc tích tụ tinh dầu thơm để khảo sát cơ chế điều hòa vi khí hậu.
              </p>

              <div className="mt-5 space-y-3">
                {CEDAR_PAVILION_SPECS.map((spec) => {
                  const isSelected = spec.id === activeSpec.id
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleSpecChange(spec)}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-[#10b981] bg-[#1b2b1b] shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                          : 'border-[#232f23] bg-[#141a14] hover:border-[#384a38]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-[#edf2ed]">{spec.name}</span>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#10b981]" />}
                      </div>
                      <div className="mt-1 text-xs text-[#10b981]">{spec.woodOrigin}</div>
                      <div className="mt-2 text-xs leading-relaxed text-[#829982]">{spec.description}</div>
                    </button>
                  )
                })}
              </div>

              {/* Bonsai Masterpieces Picker */}
              <div className="mt-8 border-t border-[#202920] pt-6">
                <h4 className="font-serif text-sm font-medium uppercase tracking-wider text-[#10b981]">
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
                            ? 'border-[#10b981] bg-[#1a291a]'
                            : 'border-[#232f23] bg-[#0f140f] hover:border-[#334433]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-[#edf2ed]">
                          <span>{bonsai.name}</span>
                          <span className="text-[10px] text-[#10b981]">{bonsai.age}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-[#758575]">{bonsai.description}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#2d3a2d]/60 bg-[#151e15]/60 p-4 text-xs leading-relaxed text-[#9eb09e]">
                <strong className="text-[#10b981]">Tiêu chuẩn xưởng GuHomes Thạnh Xuân:</strong> Kết cấu thủy đình gỗ
                Tuyết Tùng được đục đẽo mộng nêm hoàn toàn không dùng đinh sắt, phơi ủ mộc tự nhiên 18 tháng để đạt độ ẩm thớ gỗ dưới 12%,
                bảo đảm không cong vênh hay mối mọt trước khí hậu nhiệt đới gió mùa Sài Gòn.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
