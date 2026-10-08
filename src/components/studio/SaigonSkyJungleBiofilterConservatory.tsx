'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type SkyJungleLightTime = 'dawn' | 'zenith' | 'golden-hour' | 'night-mist'

interface BiophilicTimePreset {
  id: SkyJungleLightTime
  label: string
  cctKelvin: number
  luxLevel: number
  tempOffsetC: number
  humidityPct: number
  skyGradient: string
  subtext: string
}

const TIME_PRESETS: Record<SkyJungleLightTime, BiophilicTimePreset> = {
  dawn: {
    id: 'dawn',
    label: 'Ban Mai Sương Sớm (06:00)',
    cctKelvin: 3000,
    luxLevel: 4500,
    tempOffsetC: -3.8,
    humidityPct: 78,
    skyGradient: 'from-[#1c2e26] via-[#101c17] to-[#09110e]',
    subtext: 'Ánh sáng quang phổ kích hoạt quá trình quang hợp nhẹ, giọt sương đọng trên phiến lá Monstera và dương xỉ ráng bay',
  },
  zenith: {
    id: 'zenith',
    label: 'Ánh Dương Đỉnh Triều (12:00)',
    cctKelvin: 5000,
    luxLevel: 12000,
    tempOffsetC: -4.5,
    humidityPct: 65,
    skyGradient: 'from-[#223d30] via-[#13221b] to-[#0b1410]',
    subtext: 'Đèn Full Spectrum CRI 99 chiếu sâu 7.5m nuôi dưỡng các tầng rễ cây biểu sinh và lọc sạch 99.4% khí thải độc hại',
  },
  'golden-hour': {
    id: 'golden-hour',
    label: 'Hoàng Hôn Vàng Mật (17:30)',
    cctKelvin: 2400,
    luxLevel: 2800,
    tempOffsetC: -4.0,
    humidityPct: 72,
    skyGradient: 'from-[#332a1c] via-[#1a160e] to-[#0c0b07]',
    subtext: 'Sắc vàng ấm chuyển giao nhịp sinh học circadian rhythm, tiếng róc rách của suối cuội xua tan mọi mỏi mệt phố thị',
  },
  'night-mist': {
    id: 'night-mist',
    label: 'Rừng Đêm & Màn Sương Nano (21:00)',
    cctKelvin: 2000,
    luxLevel: 450,
    tempOffsetC: -5.2,
    humidityPct: 82,
    skyGradient: 'from-[#121c17] via-[#0b110e] to-[#050807]',
    subtext: 'Hệ thống phun sương nano tĩnh âm hạ nhiệt vi khí hậu, các loài lan rừng tỏa hương thơm thảo mộc tự nhiên',
  },
}

export function SaigonSkyJungleBiofilterConservatory({ className }: { className?: string }) {
  const formId = useId()
  const [selectedTime, setSelectedTime] = useState<SkyJungleLightTime>('zenith')
  const [isAudioRunning, setIsAudioRunning] = useState<boolean>(false)
  const [fanSuctionSpeedPct, setFanSuctionSpeedPct] = useState<number>(85)

  // Realtime Environmental Sensor Readouts
  const aqiValue = 8
  const pm25Value = 2.4
  const formaldehydeMg = (0.012 * (100 / fanSuctionSpeedPct)).toFixed(3)
  const co2Ppm = 415

  // Consultation Modal & Form State
  const [isConsultOpen, setIsConsultOpen] = useState(false)
  const [wallHeightM, setWallHeightM] = useState('7.5')
  const [estateType, setEstateType] = useState('penthouse')
  const [selectedFlora, setSelectedFlora] = useState('monstera-epiphytes')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientNote, setClientNote] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Web Audio Context for Brook & Forest Birds
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const streamSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const birdIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const preset = TIME_PRESETS[selectedTime]

  // Synthesize babbling pebble stream + organic bird chirps
  const startConservatoryAudio = () => {
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

      // 4-second pink noise buffer filtered for clean natural water flowing over pebbles
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
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06
        b6 = white * 0.115926
      }

      const streamSrc = ctx.createBufferSource()
      streamSrc.buffer = buffer
      streamSrc.loop = true

      const waterFilter = ctx.createBiquadFilter()
      waterFilter.type = 'bandpass'
      waterFilter.frequency.setValueAtTime(850, ctx.currentTime)
      waterFilter.Q.setValueAtTime(1.8, ctx.currentTime)

      streamSrc.connect(waterFilter)
      waterFilter.connect(masterGain)
      streamSrc.start()
      streamSourceRef.current = streamSrc

      // Occasional tropical songbird chirp
      const triggerBirdChirp = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return
        const actx = audioCtxRef.current
        const now = actx.currentTime

        const osc = actx.createOscillator()
        const birdGain = actx.createGain()

        osc.type = 'sine'
        const baseFreq = 2600 + Math.random() * 800
        osc.frequency.setValueAtTime(baseFreq, now)
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.06)
        osc.frequency.exponentialRampToValueAtTime(baseFreq - 400, now + 0.14)

        birdGain.gain.setValueAtTime(0.001, now)
        birdGain.gain.linearRampToValueAtTime(0.08, now + 0.03)
        birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

        osc.connect(birdGain)
        birdGain.connect(masterGainRef.current)
        osc.start(now)
        osc.stop(now + 0.2)
      }

      birdIntervalRef.current = setInterval(() => {
        if (Math.random() > 0.4) {
          triggerBirdChirp()
          setTimeout(() => triggerBirdChirp(), 180)
        }
      }, 3500)

      setIsAudioRunning(true)
    } catch (e) {
      console.error('Audio init failed:', e)
    }
  }

  const stopConservatoryAudio = () => {
    if (birdIntervalRef.current) {
      clearInterval(birdIntervalRef.current)
      birdIntervalRef.current = null
    }

    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5)
      setTimeout(() => {
        if (streamSourceRef.current) {
          try { streamSourceRef.current.stop() } catch {}
          streamSourceRef.current.disconnect()
          streamSourceRef.current = null
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
      stopConservatoryAudio()
    } else {
      startConservatoryAudio()
    }
  }

  useEffect(() => {
    return () => {
      if (birdIntervalRef.current) clearInterval(birdIntervalRef.current)
      try {
        if (streamSourceRef.current) {
          try { streamSourceRef.current.stop() } catch {}
          streamSourceRef.current.disconnect()
        }
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close().catch(() => {})
        }
      } catch {}
    }
  }, [])

  return (
    <section className={cn('relative py-24 bg-[#080d0a] text-[#f2f7f3] overflow-hidden border-t border-b border-[#213529]', className)}>
      {/* Background Time-of-Day Ambient Sky Glow */}
      <div className={cn('absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] transition-all duration-1000', preset.skyGradient)} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14261d] border border-[#2b4c39] text-[#72d49e] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#72d49e] animate-pulse" />
            Vườn Thông Tầng Penthouse & Màng Lọc Biofilter
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fafffc] tracking-tight leading-tight">
            Vườn Sky Jungle Biofilter Thông Tầng <br className="hidden sm:inline" />
            <span className="italic font-light text-[#72d49e]">Kiểng Lá Nhiệt Đới & Lọc Khí Sinh Học 99.4%</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9cb5a6] leading-relaxed">
            Kiến tạo ốc đảo rừng mưa nhiệt đới giữa tầng không penthouse với thông tầng cao 7.5m. Hệ thống Biofilter hút khí cưỡng bức qua tầng rễ cây biểu sinh cộng sinh cùng vi sinh vật đất giải phóng 100% ion âm, thanh lọc triệt để Formaldehyde và bụi siêu mịn PM2.5, hạ nhiệt vi khí hậu tự nhiên đến 4.5°C.
          </p>
        </div>

        {/* Master Interactive Conservatory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 7.5m Wall Visualizer & Real-time Sensors (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#111e17] to-[#09110d] border border-[#233f2f] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Vertical Conservatory Stage */}
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-[#060a08] border border-[#1b2f23] flex flex-col justify-between p-6">
                {/* Simulated Lush Green Wall Foliage Pattern */}
                <div 
                  className="absolute inset-0 opacity-45 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, rgba(34,61,48,0.3) 0%, rgba(11,20,16,0.9) 100%), repeating-radial-gradient(circle at 50% 50%, #152b1f 0px, #152b1f 4px, #0e1e15 4px, #0e1e15 16px)`,
                  }}
                />

                {/* Animated Biofilter Air Flow Rays */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30"
                  animate={{
                    background: [
                      `radial-gradient(circle at 40% 30%, rgba(114, 212, 158, 0.25) 0%, transparent 60%)`,
                      `radial-gradient(circle at 60% 70%, rgba(114, 212, 158, 0.35) 0%, transparent 65%)`,
                      `radial-gradient(circle at 40% 30%, rgba(114, 212, 158, 0.25) 0%, transparent 60%)`,
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Top Conservatory Status Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#72d49e] animate-ping" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#a7ceb6]">
                      Biofilter Hoạt Động 100%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#7ea58e] block">Hạ Nhiệt Thụ Động</span>
                    <span className="text-sm font-mono text-[#72d49e] font-bold">{preset.tempOffsetC}°C</span>
                  </div>
                </div>

                {/* Center Realtime Bio-Metrics */}
                <div className="relative z-10 text-center py-4">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-serif text-[#fafffc] tracking-tight">{aqiValue}</span>
                    <span className="text-xl font-mono text-[#72d49e]">AQI</span>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#8eb39c] mt-1">
                    Chuẩn Không Khí Núi Cao · PM2.5: {pm25Value} µg/m³
                  </div>
                </div>

                {/* Bottom Sound & Light Trigger */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#1e3627] bg-[#09120e]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className={cn(
                        'min-h-[44px] px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border',
                        isAudioRunning
                          ? 'bg-[#72d49e]/20 border-[#72d49e] text-[#fafffc] shadow-[0_0_15px_rgba(114,212,158,0.3)]'
                          : 'bg-[#15261d] border-[#294836] text-[#a7ceb6] hover:border-[#72d49e]'
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
                      {isAudioRunning ? 'Đang Phát Tiếng Suối & Chim' : 'Nghe Tiếng Suối Cuội & Rừng'}
                    </button>
                    {isAudioRunning && (
                      <span className="text-[11px] font-mono text-[#72d49e] animate-pulse hidden sm:inline">
                        Web Audio Stream Synthesis
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-[#7ea58e]">
                    Quang phổ {preset.cctKelvin}K · {preset.luxLevel.toLocaleString()} Lux
                  </span>
                </div>
              </div>

              {/* Real-time Environmental Grid Readout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1f3627]">
                  <span className="text-[10px] text-[#719680] block uppercase tracking-wider font-mono">Formaldehyde</span>
                  <span className="text-sm font-mono font-bold text-[#72d49e]">{formaldehydeMg} mg/m³</span>
                  <span className="text-[10px] text-[#557662] block mt-0.5">Tiêu chuẩn WHO an toàn</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1f3627]">
                  <span className="text-[10px] text-[#719680] block uppercase tracking-wider font-mono">Nồng Độ CO₂</span>
                  <span className="text-sm font-mono font-bold text-[#fafffc]">{co2Ppm} ppm</span>
                  <span className="text-[10px] text-[#557662] block mt-0.5">Tương đương rừng nguyên sinh</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1f3627]">
                  <span className="text-[10px] text-[#719680] block uppercase tracking-wider font-mono">Độ Ẩm Vi Khí Hậu</span>
                  <span className="text-sm font-mono font-bold text-[#72d49e]">{preset.humidityPct}% RH</span>
                  <span className="text-[10px] text-[#557662] block mt-0.5">Lý tưởng chống khô da máy lạnh</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1f3627]">
                  <span className="text-[10px] text-[#719680] block uppercase tracking-wider font-mono">Hút Khí Cưỡng Bức</span>
                  <span className="text-sm font-mono font-bold text-[#fafffc]">{fanSuctionSpeedPct}%</span>
                  <span className="text-[10px] text-[#557662] block mt-0.5">&lt; 18 dBA không tạo tiếng ồn</span>
                </div>
              </div>
            </div>

            {/* Scientific Principle Explainer */}
            <div className="p-6 rounded-2xl bg-[#0d1712] border border-[#20392a] text-sm text-[#95b09f] space-y-3">
              <h3 className="text-base font-serif text-[#fafffc] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#72d49e] rounded-full" />
                Cơ Chế Lọc Khí Sinh Học Tầng Rễ (Rhizosphere Biofiltration)
              </h3>
              <p className="leading-relaxed">
                Khác biệt hoàn toàn với máy lọc HEPA nhân tạo dễ bão hòa màng lọc, hệ Biofilter GuHomes tuần hoàn không khí trong nhà xuyên qua hệ rễ của các loài cây biểu sinh nhiệt đới (Monstera deliciosa, Philodendron, Dương xỉ ổ rồng). Vi sinh vật cộng sinh bẻ gãy các liên kết vòng benzen hữu cơ độc hại thành chất dinh dưỡng nuôi cây, liên tục tự tái sinh không cần thay lõi lọc.
              </p>
            </div>
          </div>

          {/* Right Column: Time-of-Day Presets & Custom Consultation Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Circadian Lighting Presets */}
            <div className="rounded-2xl bg-[#111e17] border border-[#233f2f] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#7ea58e]">
                Mô Phỏng Nhịp Quang Kỳ Circadian 24 Giờ
              </h3>

              <div className="space-y-3">
                {(Object.keys(TIME_PRESETS) as SkyJungleLightTime[]).map((timeKey) => {
                  const item = TIME_PRESETS[timeKey]
                  const isSelected = selectedTime === timeKey
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedTime(timeKey)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#182d22] border-[#72d49e] shadow-[0_0_15px_rgba(114,212,158,0.18)]'
                          : 'bg-[#0b130f] border-[#1a3023] hover:border-[#2b4c39]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fafffc] font-semibold' : 'text-[#c6dec9]')}>
                          {item.label}
                        </span>
                        <span className="text-xs font-mono text-[#72d49e] font-bold">
                          {item.cctKelvin}K
                        </span>
                      </div>
                      <p className="text-xs text-[#89ab95] mt-1.5 leading-relaxed">
                        {item.subtext}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Fan Speed Slider */}
              <div className="pt-3 border-t border-[#1c3326]">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#7ea58e]">Lưu Lượng Gió Biofilter Tuần Hoàn</span>
                  <span className="text-[#72d49e] font-bold">{fanSuctionSpeedPct}% Công Suất</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={fanSuctionSpeedPct}
                  onChange={(e) => setFanSuctionSpeedPct(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#172c20] rounded-lg appearance-none cursor-pointer accent-[#72d49e]"
                  aria-label="Điều chỉnh lưu lượng gió Biofilter"
                />
              </div>

              {/* Consultation Modal Trigger Button */}
              <button
                type="button"
                onClick={() => setIsConsultOpen(true)}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#72d49e] to-[#4ea878] text-[#08120b] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
                </svg>
                May Đo Vườn Sinh Thái Cho Dinh Thự
              </button>
            </div>

            {/* GuHomes Guarantee */}
            <div className="p-4 rounded-2xl bg-[#0d1712] border border-[#20392a] text-xs text-[#7ea58e] flex items-center justify-between">
              <div>
                <span className="text-[#fafffc] font-serif block">GuHomes Biophilic Engineering</span>
                <span className="text-[11px] text-[#5a7f6a]">Bảo Dưỡng Cây Xanh Trọn Đời Cho Gia Chủ</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#72d49e] font-mono hover:underline min-h-[44px] flex items-center"
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
              className="relative w-full max-w-xl bg-[#0f1b15] border border-[#274834] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#f2f7f3] max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsConsultOpen(false)}
                className="absolute top-5 right-5 text-[#7ea58e] hover:text-[#fafffc] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Đóng cửa sổ khảo sát"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#72d49e] block">
                  Khảo Sát Kỹ Thuật Biophilic
                </span>
                <h3 className="text-2xl font-serif text-[#fafffc] mt-1">
                  Đăng Ký Tư Vấn Vườn Thông Tầng Sky Jungle
                </h3>
                <p className="text-xs text-[#8fb09c] mt-1 leading-relaxed">
                  Thiết kế tường xanh Biofilter và hệ suối cuội nước ngầm cho Penthouse, Biệt Thự Sài Gòn.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#72d49e]/20 border border-[#72d49e] flex items-center justify-center text-[#72d49e] text-2xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-serif text-[#fafffc]">Thông Tin Đã Tiếp Nhận Thành Công</h4>
                  <p className="text-sm text-[#9bb8a6] max-w-md mx-auto leading-relaxed">
                    Chuyên gia sinh thái cảnh quan GuHomes sẽ khảo sát hướng gió và độ rọi sáng thực tế của tư dinh {clientName || ''} qua số {clientPhone || ''} để đưa ra danh mục chủng loại cây trồng tối ưu.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setIsConsultOpen(false)
                    }}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#193023] border border-[#72d49e] text-[#e6fffa] font-medium text-xs tracking-wider uppercase"
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
                      <label htmlFor={`${formId}-height`} className="block text-xs font-mono text-[#7ea58e] mb-1">
                        Chiều Cao Thông Tầng (Mét)
                      </label>
                      <input
                        id={`${formId}-height`}
                        type="number"
                        min="3"
                        max="18"
                        step="0.5"
                        value={wallHeightM}
                        onChange={(e) => setWallHeightM(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#09120e] border border-[#203a2a] text-[#fafffc] text-sm font-mono focus:border-[#72d49e] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-estate`} className="block text-xs font-mono text-[#7ea58e] mb-1">
                        Loại Hình Tư Dinh
                      </label>
                      <select
                        id={`${formId}-estate`}
                        value={estateType}
                        onChange={(e) => setEstateType(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#09120e] border border-[#203a2a] text-[#fafffc] text-sm focus:border-[#72d49e] focus:outline-none"
                      >
                        <option value="penthouse">Penthouse Thông Tầng (Duplex)</option>
                        <option value="villa">Biệt Thự Đơn Lập Giếng Trời</option>
                        <option value="townhouse">Nhà Phố Kiến Trúc Sinh Thái</option>
                        <option value="commercial">Sảnh Khách Sạn / Trụ Sở Cao Cấp</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-flora`} className="block text-xs font-mono text-[#7ea58e] mb-1">
                      Bộ Sưu Tập Cây Nhiệt Đới Ưu Tiên
                    </label>
                    <select
                      id={`${formId}-flora`}
                      value={selectedFlora}
                      onChange={(e) => setSelectedFlora(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#09120e] border border-[#203a2a] text-[#fafffc] text-sm focus:border-[#72d49e] focus:outline-none"
                    >
                      <option value="monstera-epiphytes">Kiểng Lá Khổng Lồ (Monstera, Philodendron & Ráng Bay)</option>
                      <option value="orchid-moss">Phong Lan Rừng Nhiệt Đới & Thảm Rêu Tự Nhiên</option>
                      <option value="subtropical-stream">Suối Đá Cuội Kết Hợp Cây Bán Cạn Thủy Sinh</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-xs font-mono text-[#7ea58e] mb-1">
                        Họ và Tên Gia Chủ *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#09120e] border border-[#203a2a] text-[#fafffc] text-sm focus:border-[#72d49e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-phone`} className="block text-xs font-mono text-[#7ea58e] mb-1">
                        Số Điện Thoại Liên Hệ *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="0912 xxx xxx"
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#09120e] border border-[#203a2a] text-[#fafffc] text-sm font-mono focus:border-[#72d49e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-note`} className="block text-xs font-mono text-[#7ea58e] mb-1">
                      Ghi Chú Về Hướng Nắng & Đặc Điểm Công Trình
                    </label>
                    <textarea
                      id={`${formId}-note`}
                      rows={3}
                      value={clientNote}
                      onChange={(e) => setClientNote(e.target.value)}
                      placeholder="Căn hộ hướng Tây Bắc, cần hệ tưới sương tự động tuần hoàn để không bị đọng nước sàn..."
                      className="w-full p-3 rounded-xl bg-[#09120e] border border-[#203a2a] text-[#fafffc] text-sm resize-none focus:border-[#72d49e] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConsultOpen(false)}
                      className="min-h-[44px] px-5 py-2 rounded-xl border border-[#203a2a] text-[#7ea58e] hover:text-[#fafffc] text-xs font-mono uppercase"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#72d49e] to-[#4ea878] text-[#08120b] font-semibold text-xs uppercase tracking-wider hover:brightness-110"
                    >
                      Gửi Hồ Sơ Thiết Kế Sinh Thái
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
