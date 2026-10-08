'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type OrchidSpeciesKey = 'dia-lan-kiem' | 'hoang-thao-ken' | 'tram-rung'

interface OrchidSpeciesDetail {
  id: OrchidSpeciesKey
  vietnameseName: string
  scientificName: string
  idealTempC: string
  idealHumidityPct: number
  parLightUmol: number
  fragranceProfile: string
  description: string
}

const ORCHID_SPECIES: Record<OrchidSpeciesKey, OrchidSpeciesDetail> = {
  'dia-lan-kiem': {
    id: 'dia-lan-kiem',
    vietnameseName: 'Địa Lan Kiếm Trần Mộng',
    scientificName: 'Cymbidium lowianum · Rừng Sa Pa',
    idealTempC: '20°C - 23°C',
    idealHumidityPct: 82,
    parLightUmol: 250,
    fragranceProfile: 'Hương thanh khiết tao nhã lan tỏa lúc nửa đêm',
    description: 'Vua của các loài địa lan với chùm hoa dài uốn lượn như cánh rồng bay, yêu cầu lớp sương mù siêu mịn không đọng giọt trên nụ hoa.',
  },
  'hoang-thao-ken': {
    id: 'hoang-thao-ken',
    vietnameseName: 'Hoàng Thảo Kèn Rừng Lai Châu',
    scientificName: 'Dendrobium lituiflorum · Tây Bắc',
    idealTempC: '21°C - 24°C',
    idealHumidityPct: 78,
    parLightUmol: 320,
    fragranceProfile: 'Hương thơm ngọt ngào quý phái như mật ong rừng',
    description: 'Loài lan quý hiếm bậc nhất với sắc tím biếc rực rỡ, ghép cộng sinh trên thân lũa Sao Đen ngâm bùn hơn 100 năm tuổi.',
  },
  'tram-rung': {
    id: 'tram-rung',
    vietnameseName: 'Trầm Tím Rừng Kon Tum',
    scientificName: 'Dendrobium parishii · Tây Nguyên',
    idealTempC: '22°C - 25°C',
    idealHumidityPct: 80,
    parLightUmol: 280,
    fragranceProfile: 'Hương trầm sâu lắng kết hợp vị vani ngọt thanh',
    description: 'Thân hoa mập mạp bám chặt vào vỏ cây Sao Đen, đón các đợt sương nano hạt 3 micron thẩm thấu dinh dưỡng vi thể.',
  },
}

export function SaigonWildOrchidMicroclimatePavilion({ className }: { className?: string }) {
  const formId = useId()
  const [selectedOrchid, setSelectedOrchid] = useState<OrchidSpeciesKey>('dia-lan-kiem')
  const [targetTempC, setTargetTempC] = useState<number>(22.5)
  const [mistIntensityPct, setMistIntensityPct] = useState<number>(85)
  const [parLightLevel, setParLightLevel] = useState<number>(280)
  const [isAudioRunning, setIsAudioRunning] = useState<boolean>(false)

  // Consultation Modal State
  const [isConsultOpen, setIsConsultOpen] = useState<boolean>(false)
  const [pavilionAreaM2, setPavilionAreaM2] = useState('18')
  const [estateType, setEstateType] = useState('penthouse-terrace')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientNotes, setClientNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Web Audio Refs for Forest Brook & Jungle Birds
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const brookSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const birdIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentSpecies = ORCHID_SPECIES[selectedOrchid]

  // Web Audio stream & morning birds synthesis
  const startOrchidSanctuaryAudio = () => {
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
      masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1.2)
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Subtle water trickle & fine nano mist hiss
      const bufferSize = ctx.sampleRate * 4
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05
      }

      const noiseSrc = ctx.createBufferSource()
      noiseSrc.buffer = buffer
      noiseSrc.loop = true

      const mistFilter = ctx.createBiquadFilter()
      mistFilter.type = 'highpass'
      mistFilter.frequency.setValueAtTime(3200, ctx.currentTime)

      const brookFilter = ctx.createBiquadFilter()
      brookFilter.type = 'bandpass'
      brookFilter.frequency.setValueAtTime(680, ctx.currentTime)
      brookFilter.Q.setValueAtTime(2.2, ctx.currentTime)

      noiseSrc.connect(mistFilter)
      noiseSrc.connect(brookFilter)
      mistFilter.connect(masterGain)
      brookFilter.connect(masterGain)

      noiseSrc.start()
      brookSourceRef.current = noiseSrc

      // Jungle bird whistles
      const triggerBird = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return
        const actx = audioCtxRef.current
        const now = actx.currentTime

        const osc = actx.createOscillator()
        const bGain = actx.createGain()
        osc.type = 'sine'
        const base = 2800 + Math.random() * 600
        osc.frequency.setValueAtTime(base, now)
        osc.frequency.exponentialRampToValueAtTime(base + 500, now + 0.08)
        osc.frequency.exponentialRampToValueAtTime(base - 300, now + 0.16)

        bGain.gain.setValueAtTime(0.001, now)
        bGain.gain.linearRampToValueAtTime(0.06, now + 0.02)
        bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

        osc.connect(bGain)
        bGain.connect(masterGainRef.current)
        osc.start(now)
        osc.stop(now + 0.22)
      }

      birdIntervalRef.current = setInterval(() => {
        if (Math.random() > 0.35) {
          triggerBird()
        }
      }, 3800)

      setIsAudioRunning(true)
    } catch (e) {
      console.error('Orchid audio failed:', e)
    }
  }

  const stopOrchidSanctuaryAudio = () => {
    if (birdIntervalRef.current) {
      clearInterval(birdIntervalRef.current)
      birdIntervalRef.current = null
    }

    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5)
      setTimeout(() => {
        if (brookSourceRef.current) {
          try { brookSourceRef.current.stop() } catch {}
          brookSourceRef.current.disconnect()
          brookSourceRef.current = null
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
      stopOrchidSanctuaryAudio()
    } else {
      startOrchidSanctuaryAudio()
    }
  }

  useEffect(() => {
    return () => {
      if (birdIntervalRef.current) clearInterval(birdIntervalRef.current)
      try {
        if (brookSourceRef.current) {
          try { brookSourceRef.current.stop() } catch {}
          brookSourceRef.current.disconnect()
        }
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close().catch(() => {})
        }
      } catch {}
    }
  }, [])

  return (
    <section className={cn('relative py-24 bg-[#070d0b] text-[#f2f7f5] overflow-hidden border-t border-b border-[#1b3027]', className)}>
      {/* Background Mist & Canopy Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#173a2e] via-[#0b1c16] to-[#040a08]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#122820] border border-[#234d3e] text-[#6ee7b7] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#6ee7b7] animate-pulse" />
            Vườn Lan Sương Mù & Thân Lũa Sao Đen
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fafffc] tracking-tight leading-tight">
            Vườn Địa Lan Phong Sương Vi Khí Hậu <br className="hidden sm:inline" />
            <span className="italic font-light text-[#6ee7b7]">Phun Sương Nano 3 Micron & Lũa Cổ Thụ Sao Đen</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9cb5ab] leading-relaxed">
            Kiến tạo hệ sinh thái rừng sương mù nguyên sinh trên tầng thượng hoặc giếng trời biệt thự. Từng khóm địa lan và phong lan quý hiếm được cấy ghép thủ công trên thân lũa Sao Đen ngâm bùn trăm năm. Hệ thống béc phun nano 70 bar tạo hạt sương siêu mịn 3 micron hạ nhiệt môi trường xuống 21°C - 24°C và duy trì độ ẩm 80% RH, tái hiện trọn vẹn thổ nhưỡng cao nguyên giữa lòng Sài Gòn.
          </p>
        </div>

        {/* Master Interactive Orchid Pavilion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Microclimate Stage & Sensors (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#10221c] to-[#08120e] border border-[#204437] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Virtual Stage Viewport */}
              <div className="relative h-72 sm:h-88 rounded-xl overflow-hidden bg-[#040806] border border-[#132921] flex flex-col justify-between p-6">
                {/* Atmospheric Mist Animation Overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                  animate={{
                    background: [
                      `radial-gradient(circle at 30% 30%, rgba(110, 231, 183, 0.25) 0%, transparent 60%)`,
                      `radial-gradient(circle at 70% 60%, rgba(110, 231, 183, 0.35) 0%, transparent 65%)`,
                      `radial-gradient(circle at 30% 30%, rgba(110, 231, 183, 0.25) 0%, transparent 60%)`,
                    ],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Top Status */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6ee7b7] animate-ping" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#a7edd2]">
                      Áp Suất Béc Nano 70 Bar (Hạt 3µm)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#7aa192] block">Độ Ẩm Vi Khí Hậu</span>
                    <span className="text-sm font-mono text-[#6ee7b7] font-bold">80% RH Rừng Sương</span>
                  </div>
                </div>

                {/* Center Core: Temperature Readout */}
                <div className="relative z-10 text-center py-4">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-serif text-[#fafffc] tracking-tight">{targetTempC.toFixed(1)}</span>
                    <span className="text-2xl font-serif text-[#6ee7b7]">°C</span>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#8eb8a7] mt-1">
                    Hạ Nhiệt Tự Nhiên -5.5°C So Với Ngoài Trời Sài Gòn
                  </div>
                </div>

                {/* Bottom Sound & Mist Controller */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#173329] bg-[#07130f]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className={cn(
                        'min-h-[44px] px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border',
                        isAudioRunning
                          ? 'bg-[#6ee7b7]/20 border-[#6ee7b7] text-[#fafffc] shadow-[0_0_15px_rgba(110,231,183,0.3)]'
                          : 'bg-[#10241d] border-[#22483a] text-[#a7edd2] hover:border-[#6ee7b7]'
                      )}
                      aria-label={isAudioRunning ? 'Dừng âm thanh suối rừng' : 'Nghe suối reo và chim hót'}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        {isAudioRunning ? (
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                      {isAudioRunning ? 'Đang Phát Tiếng Suối & Chim' : 'Nghe Tiếng Suối & Chim Rừng'}
                    </button>
                    {isAudioRunning && (
                      <span className="text-[11px] font-mono text-[#6ee7b7] animate-pulse hidden sm:inline">
                        Web Audio Mist Synthesis
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-[#7aa192]">
                    Quang Phổ PAR: {parLightLevel} µmol/m²/s
                  </span>
                </div>
              </div>

              {/* Technical Orchid Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-[#091612] border border-[#1b3a2f]">
                  <span className="text-[10px] text-[#719687] uppercase font-mono block">Giá Thể Cấy Ghép</span>
                  <span className="text-sm font-semibold text-[#fafffc]">Lũa Sao Đen</span>
                  <span className="text-[10px] text-[#557668] block mt-0.5">Ngâm bùn 100 năm bền bỉ</span>
                </div>
                <div className="p-3 rounded-xl bg-[#091612] border border-[#1b3a2f]">
                  <span className="text-[10px] text-[#719687] uppercase font-mono block">Kích Thước Hạt Sương</span>
                  <span className="text-sm font-mono font-bold text-[#6ee7b7]">3 Micron (µm)</span>
                  <span className="text-[10px] text-[#557668] block mt-0.5">Không làm thối rễ và đọng giọt</span>
                </div>
                <div className="p-3 rounded-xl bg-[#091612] border border-[#1b3a2f]">
                  <span className="text-[10px] text-[#719687] uppercase font-mono block">Chỉ Số Hoàn Màu</span>
                  <span className="text-sm font-mono font-bold text-[#fafffc]">CRI 99 Full PAR</span>
                  <span className="text-[10px] text-[#557668] block mt-0.5">Mô phỏng mặt trời vùng cao</span>
                </div>
                <div className="p-3 rounded-xl bg-[#091612] border border-[#1b3a2f]">
                  <span className="text-[10px] text-[#719687] uppercase font-mono block">Hệ Lọc Nước Cấp</span>
                  <span className="text-sm font-semibold text-[#6ee7b7]">Khử Khoáng RO</span>
                  <span className="text-[10px] text-[#557668] block mt-0.5">TDS &lt; 15 ppm không cặn béc</span>
                </div>
              </div>
            </div>

            {/* Botanical Engineering Rationale */}
            <div className="p-6 rounded-2xl bg-[#0a1813] border border-[#1d3d32] text-sm text-[#93aba0] space-y-3">
              <h3 className="text-base font-serif text-[#fafffc] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#6ee7b7] rounded-full" />
                Công Nghệ Phun Sương Khô Nano 3 Micron Cho Địa Lan Quý
              </h3>
              <p className="leading-relaxed">
                Các loài địa lan kiếm Sa Pa và hoàng thảo kèn Lai Châu rất mẫn cảm với khí hậu nóng ẩm của Sài Gòn. Nếu dùng béc phun sương thông thường (kích thước hạt &gt; 30 micron), giọt nước đọng trên cánh hoa sẽ gây hiện tượng úng thối nụ chỉ sau một ngày nắng gắt. Hệ thống phun sương nano GuHomes hoạt động ở áp suất 70 bar, tán mịn nước thành mây sương 3 micron bay lơ lửng, làm mát trực tiếp không khí mà không làm ướt bề mặt hoa lá.
              </p>
            </div>
          </div>

          {/* Right Column: Species Selector & Microclimate Sliders (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Species Selector */}
            <div className="rounded-2xl bg-[#10221c] border border-[#204437] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#7aa192]">
                Tuyển Chọn Các Giống Phong Lan Quý Hiếm
              </h3>

              <div className="space-y-3">
                {(Object.keys(ORCHID_SPECIES) as OrchidSpeciesKey[]).map((spKey) => {
                  const item = ORCHID_SPECIES[spKey]
                  const isSelected = selectedOrchid === spKey
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedOrchid(spKey)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#18352b] border-[#6ee7b7] shadow-[0_0_15px_rgba(110,231,183,0.18)]'
                          : 'bg-[#091511] border-[#18362b] hover:border-[#275343]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fafffc] font-semibold' : 'text-[#c6dec9]')}>
                          {item.vietnameseName}
                        </span>
                        <span className="text-xs font-mono text-[#6ee7b7] font-bold">
                          {item.idealTempC}
                        </span>
                      </div>
                      <span className="text-xs text-[#7aa192] mt-1">{item.scientificName}</span>
                      <p className="text-xs text-[#95b0a3] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Real-time Environmental Adjusters */}
              <div className="space-y-3 pt-3 border-t border-[#1a382d]">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#7aa192]">Nhiệt Độ Mục Tiêu (20°C - 26°C)</span>
                    <span className="text-[#6ee7b7] font-bold">{targetTempC.toFixed(1)}°C</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="26"
                    step="0.5"
                    value={targetTempC}
                    onChange={(e) => setTargetTempC(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#142c23] rounded-lg appearance-none cursor-pointer accent-[#6ee7b7]"
                    aria-label="Điều chỉnh nhiệt độ mục tiêu"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#7aa192]">Mật Độ Màn Sương Nano</span>
                    <span className="text-[#6ee7b7] font-bold">{mistIntensityPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={mistIntensityPct}
                    onChange={(e) => setMistIntensityPct(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#142c23] rounded-lg appearance-none cursor-pointer accent-[#6ee7b7]"
                    aria-label="Điều chỉnh mật độ sương"
                  />
                </div>
              </div>

              {/* Consultation Trigger Button */}
              <button
                type="button"
                onClick={() => setIsConsultOpen(true)}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#45b88c] text-[#07130f] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
                </svg>
                May Đo Vườn Lan Vi Khí Hậu Penthouse
              </button>
            </div>

            {/* Atelier Contact */}
            <div className="p-4 rounded-2xl bg-[#0a1813] border border-[#1d3d32] text-xs text-[#7aa192] flex items-center justify-between">
              <div>
                <span className="text-[#fafffc] font-serif block">GuHomes Biophilic Engineering</span>
                <span className="text-[11px] text-[#55786a]">Bảo Dưỡng Cây & Béc Phun Định Kỳ</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#6ee7b7] font-mono hover:underline min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <AnimatePresence>
        {isConsultOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#0e1d17] border border-[#234b3d] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#f2f7f5] max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsConsultOpen(false)}
                className="absolute top-5 right-5 text-[#7aa192] hover:text-[#fafffc] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Đóng cửa sổ khảo sát"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#6ee7b7] block">
                  Khảo Sát Khí Hậu Sinh Thái
                </span>
                <h3 className="text-2xl font-serif text-[#fafffc] mt-1">
                  Đăng Ký Tư Vấn Vườn Lan Phong Sương
                </h3>
                <p className="text-xs text-[#8eb3a3] mt-1 leading-relaxed">
                  Thiết kế nhà kính sương mù nano, lũa Sao Đen và hệ đèn Full Spectrum CRI 99.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#6ee7b7]/20 border border-[#6ee7b7] flex items-center justify-center text-[#6ee7b7] text-2xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-serif text-[#fafffc]">Đã Nhận Hồ Sơ Tư Vấn</h4>
                  <p className="text-sm text-[#95b0a3] max-w-md mx-auto leading-relaxed">
                    Kỹ sư sinh thái cảnh quan GuHomes sẽ liên hệ gia chủ {clientName || ''} qua số {clientPhone || ''} để gửi phương án bố trí hệ thống béc nano giấu kín.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setIsConsultOpen(false)
                    }}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#17362c] border border-[#6ee7b7] text-[#e6fff5] font-medium text-xs tracking-wider uppercase"
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
                      <label htmlFor={`${formId}-area`} className="block text-xs font-mono text-[#7aa192] mb-1">
                        Diện Tích Dự Kiến (m²)
                      </label>
                      <input
                        id={`${formId}-area`}
                        type="number"
                        min="8"
                        max="120"
                        value={pavilionAreaM2}
                        onChange={(e) => setPavilionAreaM2(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#091511] border border-[#1b3b2f] text-[#fafffc] text-sm font-mono focus:border-[#6ee7b7] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-estate`} className="block text-xs font-mono text-[#7aa192] mb-1">
                        Vị Trí Lắp Đặt
                      </label>
                      <select
                        id={`${formId}-estate`}
                        value={estateType}
                        onChange={(e) => setEstateType(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#091511] border border-[#1b3b2f] text-[#fafffc] text-sm focus:border-[#6ee7b7] focus:outline-none"
                      >
                        <option value="penthouse-terrace">Sân Thượng Penthouse Cao Cấp</option>
                        <option value="villa-courtyard">Sân Vườn / Giếng Trời Biệt Thự</option>
                        <option value="balcony-loggia">Ban Công Căn Hộ Hạng Sang</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-xs font-mono text-[#7aa192] mb-1">
                        Họ và Tên Gia Chủ *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nguyễn Tuấn Anh"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#091511] border border-[#1b3b2f] text-[#fafffc] text-sm focus:border-[#6ee7b7] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-phone`} className="block text-xs font-mono text-[#7aa192] mb-1">
                        Số Điện Thoại Liên Hệ *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="0912 xxx xxx"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#091511] border border-[#1b3b2f] text-[#fafffc] text-sm font-mono focus:border-[#6ee7b7] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-notes`} className="block text-xs font-mono text-[#7aa192] mb-1">
                      Yêu Cầu Về Giống Lan & Thiết Kế Thân Lũa
                    </label>
                    <textarea
                      id={`${formId}-notes`}
                      rows={3}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="Cần thân lũa Sao Đen tự nhiên thế trực, nuôi địa lan kiếm và lan hoàng thảo kèn nở vào dịp Tết..."
                      className="w-full p-3 rounded-xl bg-[#091511] border border-[#1b3b2f] text-[#fafffc] text-sm resize-none focus:border-[#6ee7b7] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConsultOpen(false)}
                      className="min-h-[44px] px-5 py-2 rounded-xl border border-[#1b3b2f] text-[#7aa192] hover:text-[#fafffc] text-xs font-mono uppercase"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#45b88c] text-[#07130f] font-semibold text-xs uppercase tracking-wider hover:brightness-110"
                    >
                      Gửi Yêu Cầu May Đo
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
