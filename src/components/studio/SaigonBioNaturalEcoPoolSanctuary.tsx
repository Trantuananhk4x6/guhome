'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type EcoPoolSeason = 'tropical-rain' | 'sunlit-dry' | 'cool-breeze'

interface SeasonPreset {
  id: EcoPoolSeason
  title: string
  waterTempC: number
  filtrationMode: string
  ambientCoolingC: number
  turnoverHours: number
  description: string
}

const SEASON_PRESETS: Record<EcoPoolSeason, SeasonPreset> = {
  'tropical-rain': {
    id: 'tropical-rain',
    title: 'Mùa Mưa Nhiệt Đới',
    waterTempC: 31.0,
    filtrationMode: 'Lọc Cát Thạch Anh + Khử Trùng Sinh Học UV',
    ambientCoolingC: 3.5,
    turnoverHours: 3.2,
    description: 'Hệ thống tự động cân bằng pH sau các cơn mưa rào lớn Sài Gòn, màng lọc vi sinh chuyển hóa dưỡng chất hữu cơ thành nước suối trong vắt.',
  },
  'sunlit-dry': {
    id: 'sunlit-dry',
    title: 'Mùa Khô Nắng Gắt',
    waterTempC: 29.5,
    filtrationMode: 'Bơm Nhiệt Inverter + Rèm Thác Bậc Thang',
    ambientCoolingC: 4.8,
    turnoverHours: 2.8,
    description: 'Thác nước bậc thang đá Slate đen Lai Châu phát tán hơi sương làm mát tự nhiên khuôn viên sân vườn, chống bay hơi nước bằng lớp nền khoáng tự nhiên.',
  },
  'cool-breeze': {
    id: 'cool-breeze',
    title: 'Gió Mát Chiều Tà',
    waterTempC: 32.0,
    filtrationMode: 'Tuần Hoàn Êm Ái Ngầm & Bù Khoáng Tự Nhiên',
    ambientCoolingC: 3.0,
    turnoverHours: 4.0,
    description: 'Nước ấm 32°C duy trì nhiệt độ dễ chịu cho người lớn tuổi và trẻ nhỏ bơi lội ban đêm, hoàn toàn không cay mắt và không khô tóc.',
  },
}

export function SaigonBioNaturalEcoPoolSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [season, setSeason] = useState<EcoPoolSeason>('sunlit-dry')
  const [isAudioRunning, setIsAudioRunning] = useState<boolean>(false)
  const [waterFlowRateLpm, setWaterFlowRateLpm] = useState<number>(140)

  // Real-time Water Quality Sensors
  const tdsPpm = 115
  const phLevel = 7.35
  const turbidityNtu = 0.18
  const chlorinePct = 0

  // Survey Modal State
  const [isSurveyOpen, setIsSurveyOpen] = useState<boolean>(false)
  const [poolAreaM2, setPoolAreaM2] = useState('32')
  const [installZone, setInstallZone] = useState('ground-garden')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientNote, setClientNote] = useState('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Web Audio Context for Waterfall & Gentle Waves
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null)

  const preset = SEASON_PRESETS[season]

  // Natural waterfall sound synthesis
  const startWaterfallAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioClass()
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }

      const ctx = audioCtxRef.current
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime)
      masterGain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 1.0)
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Pink noise filtered through tiered cascade resonance
      const bufferSize = ctx.sampleRate * 4
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.07
        b6 = white * 0.115926
      }

      const noiseSrc = ctx.createBufferSource()
      noiseSrc.buffer = buffer
      noiseSrc.loop = true

      // Cascade lowpass filter simulating water falling onto slate stone
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.setValueAtTime(750, ctx.currentTime)
      lp.Q.setValueAtTime(2.0, ctx.currentTime)

      // Subterranean resonance bandpass
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.setValueAtTime(280, ctx.currentTime)
      bp.Q.setValueAtTime(3.0, ctx.currentTime)

      noiseSrc.connect(lp)
      noiseSrc.connect(bp)
      lp.connect(masterGain)
      bp.connect(masterGain)

      noiseSrc.start()
      noiseSourceRef.current = noiseSrc
      setIsAudioRunning(true)
    } catch (e) {
      console.error('Audio waterfall init failed:', e)
    }
  }

  const stopWaterfallAudio = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5)
      setTimeout(() => {
        if (noiseSourceRef.current) {
          try { noiseSourceRef.current.stop() } catch {}
          noiseSourceRef.current.disconnect()
          noiseSourceRef.current = null
        }
        if (masterGainRef.current) {
          masterGainRef.current.disconnect()
          masterGainRef.current = null
        }
      }, 550)
    }
    setIsAudioRunning(false)
  }

  const toggleAudio = () => {
    if (isAudioRunning) {
      stopWaterfallAudio()
    } else {
      startWaterfallAudio()
    }
  }

  useEffect(() => {
    return () => {
      try {
        if (noiseSourceRef.current) {
          try { noiseSourceRef.current.stop() } catch {}
          noiseSourceRef.current.disconnect()
        }
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close().catch(() => {})
        }
      } catch {}
    }
  }, [])

  return (
    <section className={cn('relative py-24 bg-[#080d0d] text-[#f2f7f7] overflow-hidden border-t border-b border-[#1b2b2b]', className)}>
      {/* Background Volcanic & Slate Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#132c2c] via-[#091717] to-[#040808]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#112424] border border-[#214343] text-[#5ec2c2] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#5ec2c2] animate-pulse" />
            Hồ Bơi Sinh Thái 0% Hóa Chất Clo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#faffff] tracking-tight leading-tight">
            Hồ Bơi Sinh Thái Bio-Natural Đá Lai Châu <br className="hidden sm:inline" />
            <span className="italic font-light text-[#5ec2c2]">Lọc Cát Thạch Anh & Thác Nước Hạ Nhiệt 4.8°C</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#95b0b0] leading-relaxed">
            Kiến tạo dòng suối tự nhiên giữa biệt thự tư dinh. Hoàn toàn không sử dụng hóa chất Clo hay muối ăn mòn, hồ vận hành bằng hệ lọc cát thạch anh đa tầng và màng lọc sinh học vi sinh. Lòng hồ ốp thủ công đá Slate đen Lai Châu bóc thô tự nhiên chống trơn trượt R11, tích hợp thác nước bậc thang hạ nhiệt 4.8°C cho không gian sân vườn Sài Gòn.
          </p>
        </div>

        {/* Master Interactive Pool Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Pool Simulation & Eco Metrics (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#0f1d1d] to-[#081010] border border-[#1d3838] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Slate Pool Viewport */}
              <div className="relative h-72 sm:h-88 rounded-xl overflow-hidden bg-[#040707] border border-[#132424] flex flex-col justify-between p-6">
                {/* Natural Slate Texture Simulation */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(15,29,29,0.9) 0%, rgba(4,7,7,0.95) 100%), repeating-linear-gradient(45deg, #112222 0px, #112222 2px, #081111 2px, #081111 10px)`,
                  }}
                />

                {/* Animated Hydro-Flow Ripples */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-35"
                  animate={{
                    background: [
                      `radial-gradient(circle at 35% 45%, rgba(94, 194, 194, 0.25) 0%, transparent 60%)`,
                      `radial-gradient(circle at 65% 55%, rgba(94, 194, 194, 0.35) 0%, transparent 65%)`,
                      `radial-gradient(circle at 35% 45%, rgba(94, 194, 194, 0.25) 0%, transparent 60%)`,
                    ],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Top Status */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5ec2c2] animate-ping" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#9edede]">
                      Nước Tinh Khiết Chuẩn Uống Trực Tiếp
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#6f9191] block">Nhiệt Độ Nước Ấm</span>
                    <span className="text-sm font-mono text-[#5ec2c2] font-bold">{preset.waterTempC}°C Inverter</span>
                  </div>
                </div>

                {/* Center Core: 0% Chlorine Indicator */}
                <div className="relative z-10 text-center py-4">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-serif text-[#faffff] tracking-tight">{chlorinePct}%</span>
                    <span className="text-xl font-mono text-[#5ec2c2]">HÓA CHẤT CLO</span>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#7fa3a3] mt-1">
                    Độ Trong Suốt NTU: {turbidityNtu} · Độ pH Chuẩn Mực: {phLevel}
                  </div>
                </div>

                {/* Bottom Sound & Flow Controller */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#162a2a] bg-[#060c0c]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className={cn(
                        'min-h-[44px] px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border',
                        isAudioRunning
                          ? 'bg-[#5ec2c2]/20 border-[#5ec2c2] text-[#faffff] shadow-[0_0_15px_rgba(94,194,194,0.3)]'
                          : 'bg-[#102020] border-[#203c3c] text-[#9edede] hover:border-[#5ec2c2]'
                      )}
                      aria-label={isAudioRunning ? 'Dừng âm thanh thác nước' : 'Nghe tiếng thác nước tràn đá Slate'}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        {isAudioRunning ? (
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                      {isAudioRunning ? 'Đang Phát Tiếng Thác Đá' : 'Nghe Tiếng Thác Nước Tự Nhiên'}
                    </button>
                    {isAudioRunning && (
                      <span className="text-[11px] font-mono text-[#5ec2c2] animate-pulse hidden sm:inline">
                        Web Audio Stream Synthesis
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-[#6f9191]">
                    Hạ Nhiệt Sân Vườn: -{preset.ambientCoolingC}°C
                  </span>
                </div>
              </div>

              {/* Water Quality Sensors Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-[#091212] border border-[#193030]">
                  <span className="text-[10px] text-[#698a8a] uppercase font-mono block">Chất Rắn Hòa Tan</span>
                  <span className="text-sm font-mono font-bold text-[#faffff]">{tdsPpm} ppm</span>
                  <span className="text-[10px] text-[#4d6c6c] block mt-0.5">Tương đương nước suối Lavie</span>
                </div>
                <div className="p-3 rounded-xl bg-[#091212] border border-[#193030]">
                  <span className="text-[10px] text-[#698a8a] uppercase font-mono block">Độ pH Tự Nhiên</span>
                  <span className="text-sm font-mono font-bold text-[#5ec2c2]">{phLevel} pH</span>
                  <span className="text-[10px] text-[#4d6c6c] block mt-0.5">Cân bằng hoàn hảo cho da</span>
                </div>
                <div className="p-3 rounded-xl bg-[#091212] border border-[#193030]">
                  <span className="text-[10px] text-[#698a8a] uppercase font-mono block">Đá Ốp Lòng Hồ</span>
                  <span className="text-sm font-semibold text-[#faffff]">Slate Đen Lai Châu</span>
                  <span className="text-[10px] text-[#4d6c6c] block mt-0.5">Bóc thô chống trơn R11</span>
                </div>
                <div className="p-3 rounded-xl bg-[#091212] border border-[#193030]">
                  <span className="text-[10px] text-[#698a8a] uppercase font-mono block">Chu Kỳ Tuần Hoàn</span>
                  <span className="text-sm font-mono font-bold text-[#5ec2c2]">{preset.turnoverHours} Giờ/Lượt</span>
                  <span className="text-[10px] text-[#4d6c6c] block mt-0.5">Bơm biến tần êm ái &lt; 20 dBA</span>
                </div>
              </div>
            </div>

            {/* Engineering Rationale */}
            <div className="p-6 rounded-2xl bg-[#0b1616] border border-[#1b3434] text-sm text-[#8aa8a8] space-y-3">
              <h3 className="text-base font-serif text-[#faffff] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#5ec2c2] rounded-full" />
                Đá Slate Đen Lai Châu & Hệ Thống Lọc Sinh Thái Tự Nhiên
              </h3>
              <p className="leading-relaxed">
                Đá Slate đen Lai Châu bóc thô tự nhiên chứa hàm lượng thạch anh và mica cao, không bị ăn mòn hay phai màu qua hàng chục năm. Bề mặt bóc tách thớ vân ghồ ghề tự nhiên đạt tiêu chuẩn chống trơn trượt R11 chuẩn Đức, an toàn tuyệt đối khi bước chân trần. Hệ lọc cát thạch anh kết hợp màng vi sinh lọc sạch 100% rêu tảo mà không cần dùng đến một giọt hóa chất diệt khuẩn.
              </p>
            </div>
          </div>

          {/* Right Column: Season Mode & Consultation Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Seasonal Water Presets */}
            <div className="rounded-2xl bg-[#0f1d1d] border border-[#1d3838] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#6f9191]">
                Kịch Bản Vi Khí Hậu Sài Gòn
              </h3>

              <div className="space-y-3">
                {(Object.keys(SEASON_PRESETS) as EcoPoolSeason[]).map((key) => {
                  const item = SEASON_PRESETS[key]
                  const isSelected = season === key
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSeason(key)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#152a2a] border-[#5ec2c2] shadow-[0_0_15px_rgba(94,194,194,0.18)]'
                          : 'bg-[#091212] border-[#182e2e] hover:border-[#284a4a]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#faffff] font-semibold' : 'text-[#c2dede]')}>
                          {item.title}
                        </span>
                        <span className="text-xs font-mono text-[#5ec2c2] font-bold">
                          {item.waterTempC}°C
                        </span>
                      </div>
                      <span className="text-xs text-[#7fa3a3] mt-1">{item.filtrationMode}</span>
                      <p className="text-xs text-[#95b0b0] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Water Flow Slider */}
              <div className="pt-3 border-t border-[#172c2c]">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#6f9191]">Lưu Lượng Thác Nước Bậc Thang</span>
                  <span className="text-[#5ec2c2] font-bold">{waterFlowRateLpm} Lít/Phút</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="240"
                  step="10"
                  value={waterFlowRateLpm}
                  onChange={(e) => setWaterFlowRateLpm(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#122424] rounded-lg appearance-none cursor-pointer accent-[#5ec2c2]"
                  aria-label="Điều chỉnh lưu lượng nước thác"
                />
              </div>

              {/* Consultation Trigger Button */}
              <button
                type="button"
                onClick={() => setIsSurveyOpen(true)}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#5ec2c2] to-[#3a9696] text-[#061111] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                </svg>
                Khảo Sát Mặt Bằng & May Đo Hồ Sinh Thái
              </button>
            </div>

            {/* Atelier Contact */}
            <div className="p-4 rounded-2xl bg-[#0b1616] border border-[#1b3434] text-xs text-[#6f9191] flex items-center justify-between">
              <div>
                <span className="text-[#faffff] font-serif block">GuHomes Natural Pool Division</span>
                <span className="text-[11px] text-[#4d6c6c]">Bảo Hành Chống Thấm 10 Năm</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#5ec2c2] font-mono hover:underline min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Modal */}
      <AnimatePresence>
        {isSurveyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#0d1a1a] border border-[#224242] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#f2f7f7] max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsSurveyOpen(false)}
                className="absolute top-5 right-5 text-[#6f9191] hover:text-[#faffff] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Đóng cửa sổ khảo sát"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#5ec2c2] block">
                  Khảo Sát May Đo Tư Dinh
                </span>
                <h3 className="text-2xl font-serif text-[#faffff] mt-1">
                  Khảo Sát Hồ Bơi Sinh Thái Bio-Natural
                </h3>
                <p className="text-xs text-[#8aa8a8] mt-1 leading-relaxed">
                  Thiết kế thác nước tràn đá Slate đen Lai Châu và công nghệ lọc cát thạch anh 0% Clo.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#5ec2c2]/20 border border-[#5ec2c2] flex items-center justify-center text-[#5ec2c2] text-2xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-serif text-[#faffff]">Đã Tiếp Nhận Hồ Sơ Khảo Sát</h4>
                  <p className="text-sm text-[#95b0b0] max-w-md mx-auto leading-relaxed">
                    Kỹ sư trưởng thủy lực GuHomes sẽ liên hệ gia chủ {clientName || ''} qua số {clientPhone || ''} để gửi sơ đồ bố trí hệ lọc sinh học và phối cảnh 3D.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setIsSurveyOpen(false)
                    }}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#152a2a] border border-[#5ec2c2] text-[#e6ffff] font-medium text-xs tracking-wider uppercase"
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
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-area`} className="block text-xs font-mono text-[#6f9191] mb-1">
                        Diện Tích Mặt Nước (m²)
                      </label>
                      <input
                        id={`${formId}-area`}
                        type="number"
                        min="12"
                        max="250"
                        value={poolAreaM2}
                        onChange={(e) => setPoolAreaM2(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#081212] border border-[#193232] text-[#faffff] text-sm font-mono focus:border-[#5ec2c2] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-zone`} className="block text-xs font-mono text-[#6f9191] mb-1">
                        Vị Trí Xây Dựng
                      </label>
                      <select
                        id={`${formId}-zone`}
                        value={installZone}
                        onChange={(e) => setInstallZone(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#081212] border border-[#193232] text-[#faffff] text-sm focus:border-[#5ec2c2] focus:outline-none"
                      >
                        <option value="ground-garden">Sân Vườn Tầng Trệt Biệt Thự</option>
                        <option value="penthouse-deck">Sân Thượng Penthouse Cao Cấp</option>
                        <option value="indoor-atrium">Giếng Trời / Sân Trong Nhà Phố</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-xs font-mono text-[#6f9191] mb-1">
                        Họ và Tên Gia Chủ *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nguyễn Tuấn Anh"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#081212] border border-[#193232] text-[#faffff] text-sm focus:border-[#5ec2c2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-phone`} className="block text-xs font-mono text-[#6f9191] mb-1">
                        Số Điện Thoại Liên Hệ *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="0912 xxx xxx"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#081212] border border-[#193232] text-[#faffff] text-sm font-mono focus:border-[#5ec2c2] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-note`} className="block text-xs font-mono text-[#6f9191] mb-1">
                      Yêu Cầu Thiết Kế Đặc Biệt
                    </label>
                    <textarea
                      id={`${formId}-note`}
                      rows={3}
                      value={clientNote}
                      onChange={(e) => setClientNote(e.target.value)}
                      placeholder="Cần kết hợp thác nước róc rách ngăn bụi từ mặt đường, hồ nước ấm cho trẻ nhỏ bơi hằng ngày..."
                      className="w-full p-3 rounded-xl bg-[#081212] border border-[#193232] text-[#faffff] text-sm resize-none focus:border-[#5ec2c2] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsSurveyOpen(false)}
                      className="min-h-[44px] px-5 py-2 rounded-xl border border-[#193232] text-[#6f9191] hover:text-[#faffff] text-xs font-mono uppercase"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5ec2c2] to-[#3a9696] text-[#061111] font-semibold text-xs uppercase tracking-wider hover:brightness-110"
                    >
                      Gửi Yêu Cầu Khảo Sát
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
