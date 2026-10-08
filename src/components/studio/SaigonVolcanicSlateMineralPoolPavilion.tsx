'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type PoolThermalMode = 'relax' | 'balneo' | 'deep-recovery'

interface ThermalPreset {
  id: PoolThermalMode
  title: string
  subtitle: string
  tempC: number
  mineralPpm: number
  magnesiumPpm: number
  potassiumPpm: number
  sodiumPpm: number
  infraredWavelengthUm: number
  acousticDba: number
  description: string
}

const THERMAL_PRESETS: Record<PoolThermalMode, ThermalPreset> = {
  relax: {
    id: 'relax',
    title: 'Thư Giãn Dưỡng Tâm',
    subtitle: 'Gentle Calming · 32°C Làn Nước Dịu Êm',
    tempC: 32,
    mineralPpm: 1400,
    magnesiumPpm: 420,
    potassiumPpm: 210,
    sodiumPpm: 770,
    infraredWavelengthUm: 8.5,
    acousticDba: 16.4,
    description: 'Nhiệt độ vừa vặn với thân nhiệt thư giãn nhẹ nhàng, nồng độ muối hồng Himalaya nhẹ giúp dưỡng ẩm biểu bì da và xoa dịu áp lực hệ thần kinh sau ngày dài.',
  },
  balneo: {
    id: 'balneo',
    title: 'Thủy Liệu Núi Lửa',
    subtitle: 'Balneotherapy · 34°C Bức Xạ Hồng Ngoại',
    tempC: 34,
    mineralPpm: 2200,
    magnesiumPpm: 680,
    potassiumPpm: 340,
    sodiumPpm: 1180,
    infraredWavelengthUm: 9.8,
    acousticDba: 18.2,
    description: 'Nhiệt độ hoàng kim 34°C kích hoạt năng lượng đá phiến dung nham Đắk Nông phát bức xạ hồng ngoại xa, hỗ trợ lưu thông vi tuần hoàn máu và đào thải độc tố tự nhiên qua nang lông.',
  },
  'deep-recovery': {
    id: 'deep-recovery',
    title: 'Phục Hồi Cơ Sâu',
    subtitle: 'Deep Thermal Recovery · 37°C Suối Khoáng Nhiệt Đới',
    tempC: 37,
    mineralPpm: 3100,
    magnesiumPpm: 950,
    potassiumPpm: 480,
    sodiumPpm: 1670,
    infraredWavelengthUm: 11.2,
    acousticDba: 19.5,
    description: 'Nước ấm tiệm cận nhiệt độ lõi cơ thể hòa quyện hàm lượng Magie và Kali đậm đặc, thẩm thấu làm mềm các thớ cơ xơ cứng, tái tạo khớp xương cho gia chủ thể thao và doanh nhân.',
  },
}

export function SaigonVolcanicSlateMineralPoolPavilion({ className }: { className?: string }) {
  const formId = useId()
  const [selectedMode, setSelectedMode] = useState<PoolThermalMode>('balneo')
  const [currentTemp, setCurrentTemp] = useState<number>(34)
  const [currentMineralPpm, setCurrentMineralPpm] = useState<number>(2200)
  const [nanoBubbleIntensity, setNanoBubbleIntensity] = useState<number>(65)
  const [isAudioRunning, setIsAudioRunning] = useState<boolean>(false)

  // Survey Modal & Form state
  const [isSurveyOpen, setIsSurveyOpen] = useState(false)
  const [surveyPoolArea, setSurveyPoolArea] = useState('24')
  const [surveyLocation, setSurveyLocation] = useState('penthouse')
  const [surveyWaterType, setSurveyWaterType] = useState('himalaya-volcanic')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientNotes, setClientNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Web Audio Nodes refs
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const lfoSourceRef = useRef<OscillatorNode | null>(null)
  const isPlayingRef = useRef(false)

  const preset = THERMAL_PRESETS[selectedMode]

  // Synchronize custom sliders with presets
  const handleSelectPreset = (mode: PoolThermalMode) => {
    setSelectedMode(mode)
    const target = THERMAL_PRESETS[mode]
    setCurrentTemp(target.tempC)
    setCurrentMineralPpm(target.mineralPpm)
  }

  // Audio synthesis: Natural subterranean mineral spring & gentle rhythmic surge
  const startSpringAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }

      const ctx = audioCtxRef.current

      // Master Gain
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime)
      masterGain.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 1.2)
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Create 5-second looping pink noise buffer for mineral water flow
      const bufferSize = ctx.sampleRate * 5
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.07
        b6 = white * 0.115926
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      // Cascade lowpass filter simulating water mass over volcanic slate
      const lowpassFilter = ctx.createBiquadFilter()
      lowpassFilter.type = 'lowpass'
      lowpassFilter.frequency.setValueAtTime(620, ctx.currentTime)
      lowpassFilter.Q.setValueAtTime(2.2, ctx.currentTime)

      // Bandpass filter for bubbling mineral springs
      const bandpassFilter = ctx.createBiquadFilter()
      bandpassFilter.type = 'bandpass'
      bandpassFilter.frequency.setValueAtTime(320, ctx.currentTime)
      bandpassFilter.Q.setValueAtTime(3.8, ctx.currentTime)

      // LFO for rhythmic slow wave surging (0.12 Hz ~ 8.3s cycle)
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.type = 'sine'
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime)
      lfoGain.gain.setValueAtTime(0.08, ctx.currentTime)
      lfo.connect(lfoGain.gain)
      lfo.start()
      lfoSourceRef.current = lfo

      whiteNoise.connect(lowpassFilter)
      whiteNoise.connect(bandpassFilter)
      lowpassFilter.connect(masterGain)
      bandpassFilter.connect(masterGain)

      whiteNoise.start()
      noiseSourceRef.current = whiteNoise
      isPlayingRef.current = true
      setIsAudioRunning(true)
    } catch (e) {
      console.error('Failed to start spring audio:', e)
    }
  }

  const stopSpringAudio = () => {
    try {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.6)
        setTimeout(() => {
          if (noiseSourceRef.current) {
            try { noiseSourceRef.current.stop() } catch {}
            noiseSourceRef.current.disconnect()
            noiseSourceRef.current = null
          }
          if (lfoSourceRef.current) {
            try { lfoSourceRef.current.stop() } catch {}
            lfoSourceRef.current.disconnect()
            lfoSourceRef.current = null
          }
          if (masterGainRef.current) {
            masterGainRef.current.disconnect()
            masterGainRef.current = null
          }
        }, 650)
      }
    } catch (e) {
      console.error('Error stopping audio:', e)
    }
    isPlayingRef.current = false
    setIsAudioRunning(false)
  }

  const toggleAudio = () => {
    if (isAudioRunning) {
      stopSpringAudio()
    } else {
      startSpringAudio()
    }
  }

  useEffect(() => {
    return () => {
      // Unmount cleanup
      try {
        if (noiseSourceRef.current) {
          try { noiseSourceRef.current.stop() } catch {}
          noiseSourceRef.current.disconnect()
        }
        if (lfoSourceRef.current) {
          try { lfoSourceRef.current.stop() } catch {}
          lfoSourceRef.current.disconnect()
        }
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close().catch(() => {})
        }
      } catch {}
    }
  }, [])

  // Calculate estimated water volume & structural weight for survey
  const poolAreaNum = parseFloat(surveyPoolArea) || 20
  const avgDepthM = 1.35
  const waterVolumeM3 = (poolAreaNum * avgDepthM).toFixed(1)
  const slateWeightTons = (poolAreaNum * 0.085).toFixed(1)
  const totalWaterWeightTons = (parseFloat(waterVolumeM3) * 1.03).toFixed(1)
  const totalLoadTons = (parseFloat(slateWeightTons) + parseFloat(totalWaterWeightTons) + 2.5).toFixed(1)

  return (
    <section className={cn('relative py-24 bg-[#0a0d0e] text-[#f4efe6] overflow-hidden border-t border-b border-[#2a3536]', className)}>
      {/* Background Volcanic Rock Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d3330] via-[#0f1717] to-[#080b0b]" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 bg-repeat"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(232, 165, 152, 0.15) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b2728] border border-[#324546] text-[#e8a598] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#e8a598] animate-pulse" />
            Kiến Trúc Thủy Liệu Trầm Tích Núi Lửa
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfbf7] tracking-tight leading-tight">
            Hồ Khoáng Núi Lửa Nước Mặn <br className="hidden sm:inline" />
            <span className="italic font-light text-[#c29b62]">Đá Phiến Dung Nham & Muối Hồng Himalaya</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a3b1af] leading-relaxed">
            Kiến tạo ốc đảo thủy trị liệu tư dinh với lòng hồ ốp thủ công đá phiến núi lửa Đắk Nông giàu khoáng vi lượng, giữ nhiệt bức xạ hồng ngoại xa 9.8µm. Kết hợp hệ thống điện phân muối khoáng hồng Himalaya tự nhiên và màng rèm nước bazan đen triệt tiêu 88% bụi mịn, thanh lọc vi khí hậu biệt thự Sài Gòn.
          </p>
        </div>

        {/* Interactive Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Water Simulation & Slate Architecture (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#141b1d] to-[#0c1112] border border-[#263738] p-6 sm:p-8 shadow-2xl">
              {/* Pool Surface Visualizer */}
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-[#06090a] border border-[#1e2a2c] flex flex-col justify-between p-6">
                {/* Simulated Slate Substrate Texture */}
                <div 
                  className="absolute inset-0 opacity-40 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(20,28,30,0.9) 0%, rgba(10,14,15,0.95) 100%), repeating-linear-gradient(45deg, #1b2829 0px, #1b2829 2px, #0e1617 2px, #0e1617 8px)`,
                  }}
                />

                {/* Animated Hydrothermal Glow & Ripple Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen"
                  animate={{
                    background: [
                      `radial-gradient(circle at 30% 40%, rgba(56, 178, 172, 0.25) 0%, transparent 60%), radial-gradient(circle at 75% 65%, rgba(232, 165, 152, 0.2) 0%, transparent 50%)`,
                      `radial-gradient(circle at 45% 55%, rgba(56, 178, 172, 0.35) 0%, transparent 65%), radial-gradient(circle at 65% 35%, rgba(232, 165, 152, 0.28) 0%, transparent 55%)`,
                      `radial-gradient(circle at 30% 40%, rgba(56, 178, 172, 0.25) 0%, transparent 60%), radial-gradient(circle at 75% 65%, rgba(232, 165, 152, 0.2) 0%, transparent 50%)`,
                    ],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Water Cascade Top Veil */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#38b2ac] animate-ping" />
                    <div>
                      <span className="text-xs font-mono tracking-wider text-[#a4c7c3] uppercase block">Trạng Thái Dòng Chảy</span>
                      <span className="text-sm font-medium text-[#f4efe6]">Rèm Nước Thác Bazan Đen Tuần Hoàn</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#8a9e9b] block">Độ Êm Vận Hành</span>
                    <span className="text-sm font-mono text-[#e8a598] font-bold">&lt; {preset.acousticDba} dBA</span>
                  </div>
                </div>

                {/* Center Core: Temperature & Far-Infrared Indicator */}
                <div className="relative z-10 text-center py-6">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-6xl sm:text-7xl font-serif text-[#fdfbf7] tracking-tight">{currentTemp.toFixed(1)}</span>
                    <span className="text-2xl font-serif text-[#e8a598]">°C</span>
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest font-mono text-[#7ea5a1]">
                    Khoáng Mặn Himalaya: {currentMineralPpm.toLocaleString()} ppm · Bức Xạ {preset.infraredWavelengthUm} µm
                  </div>
                </div>

                {/* Bottom Sound & Microclimate Bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1e2c2d]/80 bg-[#090e0f]/60 backdrop-blur-md rounded-lg px-4 py-3">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className={cn(
                        'min-h-[44px] px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border',
                        isAudioRunning
                          ? 'bg-[#38b2ac]/20 border-[#38b2ac] text-[#e6fffa] shadow-[0_0_15px_rgba(56,178,172,0.3)]'
                          : 'bg-[#152122] border-[#293c3e] text-[#a4c7c3] hover:border-[#38b2ac] hover:text-[#f4efe6]'
                      )}
                      aria-label={isAudioRunning ? 'Dừng âm thanh suối khoáng' : 'Nghe suối khoáng ngầm qua Web Audio'}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        {isAudioRunning ? (
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                      {isAudioRunning ? 'Đang Phát Tiếng Suối Ngầm' : 'Nghe Suối Khoáng Tự Nhiên'}
                    </button>
                    {isAudioRunning && (
                      <span className="text-[11px] font-mono text-[#38b2ac] animate-pulse hidden sm:inline">
                        Web Audio Pink Noise · LFO 0.12Hz
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-[#8a9e9b]">
                    Đá phiến núi lửa Đắk Nông dày <span className="text-[#f4efe6] font-mono">30mm</span>
                  </div>
                </div>
              </div>

              {/* Slate & Mineral Tech Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="p-3 rounded-xl bg-[#0e1617] border border-[#1f2d2e]">
                  <span className="text-[11px] text-[#788e8c] block uppercase tracking-wider font-mono">Magie (Mg²⁺)</span>
                  <span className="text-lg font-mono font-semibold text-[#f4efe6]">{preset.magnesiumPpm} mg/L</span>
                  <span className="text-[10px] text-[#5e7472] block mt-0.5">Giãn cơ sâu & tái tạo thần kinh</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1617] border border-[#1f2d2e]">
                  <span className="text-[11px] text-[#788e8c] block uppercase tracking-wider font-mono">Kali (K⁺)</span>
                  <span className="text-lg font-mono font-semibold text-[#f4efe6]">{preset.potassiumPpm} mg/L</span>
                  <span className="text-[10px] text-[#5e7472] block mt-0.5">Cân bằng thẩm thấu màng tế bào</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1617] border border-[#1f2d2e]">
                  <span className="text-[11px] text-[#788e8c] block uppercase tracking-wider font-mono">Natri Tự Nhiên</span>
                  <span className="text-lg font-mono font-semibold text-[#f4efe6]">{preset.sodiumPpm} mg/L</span>
                  <span className="text-[10px] text-[#5e7472] block mt-0.5">Điện phân muối hồng tinh khiết</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1617] border border-[#1f2d2e]">
                  <span className="text-[11px] text-[#788e8c] block uppercase tracking-wider font-mono">Bọt Khí Nano</span>
                  <span className="text-lg font-mono font-semibold text-[#38b2ac]">{nanoBubbleIntensity}%</span>
                  <span className="text-[10px] text-[#5e7472] block mt-0.5">&Oslash; 200nm làm sạch sâu nang lông</span>
                </div>
              </div>
            </div>

            {/* Architecture Rationale Box */}
            <div className="p-6 rounded-2xl bg-[#0f1516] border border-[#223132] text-sm text-[#9ab0ae] space-y-3">
              <h3 className="text-base font-serif text-[#fdfbf7] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#c29b62] rounded-full" />
                Đá Phiến Dung Nham Đắk Nông & Khả Năng Lưu Giữ Nhiệt Lượng
              </h3>
              <p className="leading-relaxed">
                Khác biệt hoàn toàn với gạch mosaic tráng men thông thường, đá phiến dung nham núi lửa Đắk Nông sở hữu cấu trúc tinh thể bazan lỗ rỗng vi mô (vesicular basalt). Khi tiếp xúc với nước ấm 34°C, các khoáng thể Olivin và Pyroxene giải phóng bức xạ nhiệt hồng ngoại xa ở dải sóng 8 - 12µm, thấu nhiệt vào các mao mạch cơ thể gấp 3.2 lần môi trường nước clo thông dụng.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#c29b62] pt-1">
                <span>- Chống trơn trượt tự nhiên R12</span>
                <span>- Triệt tiêu 100% mùi hóa chất tẩy rửa</span>
                <span>- Vách rèm nước giảm 3.5°C vi khí hậu lân cận</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Thermal Controls & Structural Survey (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Presets Mode Selector */}
            <div className="rounded-2xl bg-[#141b1d] border border-[#263738] p-6 shadow-xl space-y-5">
              <h3 className="text-sm uppercase tracking-wider font-mono text-[#8a9e9b]">
                Chế Độ Thủy Liệu Trị Liệu Tự Nhiên
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(THERMAL_PRESETS) as PoolThermalMode[]).map((modeKey) => {
                  const item = THERMAL_PRESETS[modeKey]
                  const isSelected = selectedMode === modeKey
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectPreset(modeKey)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#1b2628] border-[#38b2ac] shadow-[0_0_15px_rgba(56,178,172,0.15)]'
                          : 'bg-[#0e1415] border-[#1e2a2c] hover:border-[#2e4042]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fdfbf7] font-semibold' : 'text-[#cfd9d7]')}>
                          {item.title}
                        </span>
                        <span className="text-xs font-mono text-[#e8a598] font-bold">
                          {item.tempC}°C · {item.mineralPpm} ppm
                        </span>
                      </div>
                      <span className="text-xs text-[#7d9492] mt-1">{item.subtitle}</span>
                      <p className="text-xs text-[#9eb5b3] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Granular Sliders */}
              <div className="space-y-4 pt-4 border-t border-[#1e2a2c]">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#8a9e9b]">Nhiệt Độ Nước Hồ (30°C - 38°C)</span>
                    <span className="text-[#f4efe6] font-bold">{currentTemp.toFixed(1)}°C</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="38"
                    step="0.5"
                    value={currentTemp}
                    onChange={(e) => setCurrentTemp(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#1b2628] rounded-lg appearance-none cursor-pointer accent-[#38b2ac]"
                    aria-label="Điều chỉnh nhiệt độ nước hồ"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#8a9e9b]">Nồng Độ Khoáng Mặn Himalaya (ppm)</span>
                    <span className="text-[#e8a598] font-bold">{currentMineralPpm} ppm</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="4000"
                    step="100"
                    value={currentMineralPpm}
                    onChange={(e) => setCurrentMineralPpm(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#1b2628] rounded-lg appearance-none cursor-pointer accent-[#e8a598]"
                    aria-label="Điều chỉnh nồng độ khoáng mặn"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#8a9e9b]">Cường Độ Sục Bọt Khí Nano (&lt; 20 dBA)</span>
                    <span className="text-[#38b2ac] font-bold">{nanoBubbleIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={nanoBubbleIntensity}
                    onChange={(e) => setNanoBubbleIntensity(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#1b2628] rounded-lg appearance-none cursor-pointer accent-[#38b2ac]"
                    aria-label="Điều chỉnh cường độ bọt khí nano"
                  />
                </div>
              </div>

              {/* Consultation Survey CTA Button */}
              <button
                type="button"
                onClick={() => setIsSurveyOpen(true)}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#c29b62] to-[#b3884c] text-[#0d1213] font-semibold text-sm tracking-wide transition-all duration-300 hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                </svg>
                Khảo Sát Tải Trọng & May Đo Hồ Khoáng Biệt Thự
              </button>
            </div>

            {/* GuHomes Craftsmanship Guarantee */}
            <div className="p-5 rounded-2xl bg-[#101718] border border-[#202d2e] text-xs text-[#8a9e9b] space-y-2">
              <div className="flex items-center gap-2 text-[#c29b62] font-semibold uppercase tracking-wider font-mono">
                <span className="w-2 h-2 rounded-full bg-[#c29b62]" />
                Cam Kết Kỹ Thuật GuHomes
              </div>
              <p className="leading-relaxed">
                Hệ chống thấm 4 lớp đặc chủng gồm lớp lót thẩm thấu tinh thể, màng đàn hồi Polyurethane nguyên chất và 2 lớp vữa gia cường sợi thủy tinh chống ăn mòn bởi ion muối khoáng. Bảo hành kết cấu 10 năm.
              </p>
              <div className="pt-1 text-[#647c7a] font-mono">
                Hotline Kiến Trúc Thủy Trị Liệu: 0368 757 916
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structural Load & Survey Modal */}
      <AnimatePresence>
        {isSurveyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#111819] border border-[#2a3c3e] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#f4efe6] max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsSurveyOpen(false)}
                className="absolute top-5 right-5 text-[#8a9e9b] hover:text-[#f4efe6] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Đóng cửa sổ khảo sát"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#c29b62] block">
                  Bảng Tính Tải Trọng Kết Cấu & Dự Toán
                </span>
                <h3 className="text-2xl font-serif text-[#fdfbf7] mt-1">
                  Khảo Sát May Đo Hồ Khoáng Núi Lửa
                </h3>
                <p className="text-xs text-[#8a9e9b] mt-1 leading-relaxed">
                  Đánh giá độ an toàn chịu lực dầm sàn cho biệt thự, penthouse hoặc shophouse cao cấp tại TP.HCM.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#38b2ac]/20 border border-[#38b2ac] flex items-center justify-center text-[#38b2ac] text-2xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-serif text-[#fdfbf7]">Hồ Sơ Đã Được Ghi Nhận Thành Công</h4>
                  <p className="text-sm text-[#9ab0ae] max-w-md mx-auto leading-relaxed">
                    Kỹ sư trưởng kết cấu GuHomes sẽ liên hệ trực tiếp qua số {clientPhone || 'điện thoại của quý khách'} trong 24 giờ làm việc để phân tích bản vẽ kết cấu móng và gửi phương án gia cường dầm sàn.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setIsSurveyOpen(false)
                    }}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1b2628] border border-[#38b2ac] text-[#e6fffa] font-medium text-xs tracking-wider uppercase hover:bg-[#38b2ac]/20"
                  >
                    Hoàn Tất & Đóng
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setIsSubmitted(true)
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-area`} className="block text-xs font-mono text-[#8a9e9b] mb-1">
                        Diện Tích Mặt Nước (m²)
                      </label>
                      <input
                        id={`${formId}-area`}
                        type="number"
                        min="8"
                        max="120"
                        value={surveyPoolArea}
                        onChange={(e) => setSurveyPoolArea(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0c1213] border border-[#223335] text-[#f4efe6] focus:border-[#38b2ac] focus:outline-none text-sm font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-loc`} className="block text-xs font-mono text-[#8a9e9b] mb-1">
                        Vị Trí Thi Công Dự Kiến
                      </label>
                      <select
                        id={`${formId}-loc`}
                        value={surveyLocation}
                        onChange={(e) => setSurveyLocation(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0c1213] border border-[#223335] text-[#f4efe6] focus:border-[#38b2ac] focus:outline-none text-sm"
                      >
                        <option value="penthouse">Penthouse / Sân thượng cao tầng</option>
                        <option value="villa-ground">Biệt thự sân vườn tầng trệt</option>
                        <option value="mezzanine">Tầng lửng / Ban công vươn</option>
                        <option value="basement">Tầng hầm / Sanctuary ngầm</option>
                      </select>
                    </div>
                  </div>

                  {/* Real-time Load Calculation Readout */}
                  <div className="p-4 rounded-xl bg-[#0b1011] border border-[#1b2729] grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#6c8280] block">Dung Tích Nước</span>
                      <span className="text-sm font-mono font-bold text-[#f4efe6]">{waterVolumeM3} m³</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#6c8280] block">Đá Bazan & Phiến</span>
                      <span className="text-sm font-mono font-bold text-[#f4efe6]">{slateWeightTons} Tấn</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#6c8280] block">Tổng Tải Trọng</span>
                      <span className="text-sm font-mono font-bold text-[#e8a598]">{totalLoadTons} Tấn</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-water`} className="block text-xs font-mono text-[#8a9e9b] mb-1">
                      Hệ Thống Trị Liệu & Loại Nước
                    </label>
                    <select
                      id={`${formId}-water`}
                      value={surveyWaterType}
                      onChange={(e) => setSurveyWaterType(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0c1213] border border-[#223335] text-[#f4efe6] focus:border-[#38b2ac] focus:outline-none text-sm"
                    >
                      <option value="himalaya-volcanic">Muối hồng Himalaya & Bức xạ đá phiến Đắk Nông (34°C)</option>
                      <option value="onsen-mineral">Onsen khoáng nóng Nhật Bản & Vách rèm thác bazan</option>
                      <option value="cold-plunge-hot-spring">Combo Hồ Khoáng Nóng 38°C + Bể Lạnh Plunge 10°C</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-xs font-mono text-[#8a9e9b] mb-1">
                        Họ và Tên Gia Chủ *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nguyễn Tuấn Anh"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0c1213] border border-[#223335] text-[#f4efe6] focus:border-[#38b2ac] focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-phone`} className="block text-xs font-mono text-[#8a9e9b] mb-1">
                        Số Điện Thoại Liên Hệ *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="0912 xxx xxx"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0c1213] border border-[#223335] text-[#f4efe6] focus:border-[#38b2ac] focus:outline-none text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-notes`} className="block text-xs font-mono text-[#8a9e9b] mb-1">
                      Yêu Cầu Đặc Biệt Về Công Trình (Tùy chọn)
                    </label>
                    <textarea
                      id={`${formId}-notes`}
                      rows={3}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="Công trình tại khu Thảo Điền Q.2, cần phương án xử lý tải trọng sân thượng penthouse không làm nứt trần tầng dưới..."
                      className="w-full p-3 rounded-xl bg-[#0c1213] border border-[#223335] text-[#f4efe6] focus:border-[#38b2ac] focus:outline-none text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsSurveyOpen(false)}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl border border-[#223335] text-[#8a9e9b] hover:text-[#f4efe6] text-xs font-mono tracking-wider uppercase"
                    >
                      Hủy Bỏ
                    </button>
                    <button
                      type="submit"
                      className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c29b62] to-[#b3884c] text-[#0d1213] font-semibold text-xs tracking-wider uppercase hover:brightness-110"
                    >
                      Gửi Yêu Cầu Khảo Sát Kỹ Thuật
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
