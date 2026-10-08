'use client'

import React, { useState, useRef } from 'react'

interface RosewoodSanctuaryMode {
  id: string
  title: string
  timeOfDay: string
  tempReductionCelsius: number
  humidityPct: number
  waterFlowRateLpm: number
  bonsaiType: string
  bonsaiAge: number
  woodSpecies: string
  sensoryNarrative: string
  architecturalNote: string
}

const ROSEWOOD_MODES: RosewoodSanctuaryMode[] = [
  {
    id: 'dawn-rosewood-mist',
    title: 'Bình Minh Nghinh Phong & Điểm Sương Tùng La Hán',
    timeOfDay: '05:30 - 08:30',
    tempReductionCelsius: 3.1,
    humidityPct: 67,
    waterFlowRateLpm: 130,
    bonsaiType: 'Tùng La Hán Dáng Trực Huyền Bách Niên (Podocarpus)',
    bonsaiAge: 120,
    woodSpecies: 'Gỗ Cẩm Lai Nam Bộ (Dalbergia oliveri) bông chỉ đen tím > 85 năm tuổi',
    sensoryNarrative: 'Ánh nắng ban mai rọi xiên qua thớ gỗ cẩm lai ánh tím huyền hoặc, hơi nước bốc lên từ hào cá koi xua tan sương mù đô thị.',
    architecturalNote: 'Khung mộng chốt nêm kép giấu đinh sắt, mái đua vươn xa 2.0m cản nắng gắt hướng Đông Nam và đón gió sông tự nhiên.',
  },
  {
    id: 'midday-koi-sanctuary',
    title: 'Ngọ Trầm Tĩnh Lự & Thác Tràn Đá Bọt Núi Lửa',
    timeOfDay: '11:30 - 14:30',
    tempReductionCelsius: 3.7,
    humidityPct: 57,
    waterFlowRateLpm: 250,
    bonsaiType: 'Mai Chiếu Thủy Da Đen Dáng Bay Độc Bản',
    bonsaiAge: 88,
    woodSpecies: 'Gỗ Cẩm Lai sấy ổn định 120 ngày cân bằng ẩm 11% lau sáp ong',
    sensoryNarrative: 'Thác nước chảy tràn qua thềm đá bọt núi lửa xốp làm mát bay hơi tự nhiên, hạ nhiệt độ không gian thực tế tới 3.7°C.',
    architecturalNote: 'Hệ thống tuần hoàn ngầm lọc sinh học vi sinh 4 cấp, triệt tiêu vi khuẩn nitrat và duy trì độ trong vắt Secchi depth 1.9m.',
  },
  {
    id: 'dusk-rosewood-reflection',
    title: 'Hoàng Hôn Ngắm Ngư & Đèn Đá Dọi Thủy Kính',
    timeOfDay: '17:30 - 21:00',
    tempReductionCelsius: 3.3,
    humidityPct: 63,
    waterFlowRateLpm: 170,
    bonsaiType: 'Duyên Tùng Nam Bộ Trực Lắc Rễ Nổi',
    bonsaiAge: 95,
    woodSpecies: 'Gỗ Cẩm Lai Nam Bộ giác đen tuyền thớ mịn như nhung tơ',
    sensoryNarrative: 'Đèn LED âm nước 2700K chiếu ngược lớp vảy hoa văn nhung đen của cá koi Showa bơi lượn dưới chân đình, tạo cảm giác tĩnh tại tuyệt đối.',
    architecturalNote: 'Sàn đá bazan băm mặt chống trượt tuyệt đối, bệ ngồi ngắm cảnh hạ thấp 250mm tạo cảm giác hòa mình vào mặt nước tĩnh lặng.',
  },
]

export function SaigonCanalSideAncientRosewoodBonsaiWaterFeatureSanctuary({ className = '' }: { className?: string }) {
  const [selectedModeId, setSelectedModeId] = useState<string>('midday-koi-sanctuary')
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [waterFlow, setWaterFlow] = useState<number>(3)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  const currentMode = ROSEWOOD_MODES.find((m) => m.id === selectedModeId) ?? ROSEWOOD_MODES[0]!

  const startSanctuarySound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }

      if (!masterGainRef.current) {
        const master = audioCtxRef.current.createGain()
        master.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime)
        master.connect(audioCtxRef.current.destination)
        masterGainRef.current = master
      }

      const playWaterFlowSound = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return
        const now = audioCtxRef.current.currentTime

        // 1. Pink noise filtered water ripple through porous volcanic stone
        const bufferSize = Math.floor(audioCtxRef.current.sampleRate * 0.85)
        const buffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate)
        const output = buffer.getChannelData(0)
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1
          b0 = 0.99886 * b0 + white * 0.0555179
          b1 = 0.99332 * b1 + white * 0.0750759
          b2 = 0.969 * b2 + white * 0.153852
          b3 = 0.8665 * b3 + white * 0.3104856
          b4 = 0.55 * b4 + white * 0.5329522
          output[i] = (b0 + b1 + b2 + b3 + b4) * 0.075
        }

        const noiseNode = audioCtxRef.current.createBufferSource()
        noiseNode.buffer = buffer

        const filter = audioCtxRef.current.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(460 + waterFlow * 75, now)
        filter.frequency.exponentialRampToValueAtTime(170, now + 0.8)

        const rippleGain = audioCtxRef.current.createGain()
        rippleGain.gain.setValueAtTime(0.001, now)
        rippleGain.gain.linearRampToValueAtTime(0.22, now + 0.1)
        rippleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)

        noiseNode.connect(filter)
        filter.connect(rippleGain)
        rippleGain.connect(masterGainRef.current)

        noiseNode.start(now)
        noiseNode.stop(now + 0.85)

        // 2. Harmonic Solfeggio 432 Hz calm tone
        if (Math.random() > 0.45) {
          const osc = audioCtxRef.current.createOscillator()
          const oscGain = audioCtxRef.current.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(432, now + 0.15)

          oscGain.gain.setValueAtTime(0.0001, now + 0.15)
          oscGain.gain.linearRampToValueAtTime(0.035, now + 0.35)
          oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

          osc.connect(oscGain)
          oscGain.connect(masterGainRef.current)

          osc.start(now + 0.15)
          osc.stop(now + 2.1)
        }
      }

      playWaterFlowSound()
      if (intervalIdRef.current) clearInterval(intervalIdRef.current)
      intervalIdRef.current = setInterval(playWaterFlowSound, (6 - waterFlow) * 780)

      setIsPlayingAudio(true)
    } catch {
      // AudioContext fallback
    }
  }

  const stopSanctuarySound = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.3)
    }
    setIsPlayingAudio(false)
  }

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopSanctuarySound()
    } else {
      startSanctuarySound()
    }
  }

  return (
    <section className={`w-full py-16 sm:py-24 bg-[#0F1412] text-[#F3EFEA] border-t border-[#C5A880]/20 relative overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#C5A880]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1C2824] blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C5A880]/20 pb-8 mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
              <span>● Thủy Kiến Trúc Vi Khí Hậu</span>
              <span>· Cẩm Lai Bách Niên & Hào Nước Cá Koi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Thủy Đình Cẩm Lai & Hào Nước Bonsai Tĩnh Lự
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Giải pháp không gian sống vi khí hậu thích ứng tự nhiên ven sông Sài Gòn từ GuHomes: Khung gỗ Cẩm Lai Nam Bộ hơn 85 năm tuổi bông chỉ đen tím, kết hợp hào nước nuôi cá koi bách niên và thác tràn đá bọt núi lửa, giảm nhiệt độ thực tế tới 3.7°C.
            </p>
          </div>

          {/* Web Audio Controller */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAudio}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                isPlayingAudio
                  ? 'bg-[#C5A880] text-[#0F1412] shadow-lg shadow-[#C5A880]/20 font-semibold'
                  : 'bg-[#1C2824] text-[#C5A880] border border-[#C5A880]/30 hover:border-[#C5A880]'
              }`}
              aria-label={isPlayingAudio ? 'Dừng âm thanh thủy đình cẩm lai' : 'Lắng nghe suối nước thủy đình'}
            >
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-[#0F1412] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isPlayingAudio ? 'Đang Phát Thủy Âm Cẩm Lai' : 'Lắng Nghe Suối Nước & Cá Koi'}</span>
              <span className="font-mono text-[10px]">{isPlayingAudio ? '432 Hz' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill Selection (Left Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Chọn Thời Khắc Thưởng Ngoạn Thủy Đình:
            </span>

            <div className="flex flex-col gap-3">
              {ROSEWOOD_MODES.map((mode) => {
                const isActive = mode.id === selectedModeId
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedModeId(mode.id)}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C2824] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-[1.01]'
                        : 'bg-[#131A17] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isActive ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {mode.title}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#0F1412] border border-[#C5A880]/20 text-[#A8A29E]">
                        {mode.timeOfDay}
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {mode.sensoryNarrative}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Water Flow Controller */}
            <div className="p-5 rounded-2xl bg-[#131A17] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Lưu Lượng Thác Nước Ghềnh Đá:</span>
                <span className="text-[#C5A880] font-semibold">{90 + waterFlow * 40} L/phút</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={waterFlow}
                onChange={(e) => setWaterFlow(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1C2824] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                aria-label="Điều chỉnh lưu lượng thác nước"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>Róc rách 130 L/phút</span>
                <span>Thác tràn 290 L/phút</span>
              </div>
            </div>
          </div>

          {/* Detailed Spec Panel (Right Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Visual Glassmorphic Spec Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#131A17]/80 border border-[#C5A880]/30 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#C5A880]/20 mb-6">
                <div>
                  <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider block mb-1">
                    Cấu Trúc Không Gian & Sinh Thái Bản Địa
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#F3EFEA]">
                    {currentMode.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Vi Khí Hậu: -{currentMode.tempReductionCelsius}°C
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Độ Ẩm: {currentMode.humidityPct}%
                  </span>
                </div>
              </div>

              {/* Climate & Material Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Hạ Nhiệt Thụ Động</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">-{currentMode.tempReductionCelsius}°C</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Tuổi Cẩm Lai</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">&gt; 85 Năm</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Tuổi Cây Bonsai</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentMode.bonsaiAge} Năm</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Lưu Lượng Suối</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentMode.waterFlowRateLpm} L/p</span>
                </div>
              </div>

              {/* Material & Architectural Details */}
              <div className="space-y-4 text-xs sm:text-sm font-light text-[#D6D3D1] leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Chất Liệu Khung:</span>
                  <span>{currentMode.woodSpecies}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Bonsai Độc Bản:</span>
                  <span>{currentMode.bonsaiType} ({currentMode.bonsaiAge} năm tuổi)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Kỹ Thuật Kiến Trúc:</span>
                  <span>{currentMode.architecturalNote}</span>
                </div>
              </div>

              {/* Lead Architect Quote */}
              <div className="mt-6 pt-6 border-t border-[#C5A880]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C2824] border border-[#C5A880]/40 flex items-center justify-center shrink-0 font-display text-sm text-[#C5A880]">
                  Gu
                </div>
                <div>
                  <p className="text-xs sm:text-sm italic text-[#F3EFEA]/90 font-serif leading-relaxed">
                    &ldquo;{currentMode.sensoryNarrative}&rdquo;
                  </p>
                  <span className="text-[11px] font-mono text-[#A8A29E] mt-1 block">
                    KTS Trưởng GuHomes: 0368 757 916 · Email: guhomesvn@gmail.com · Xưởng may đo Thạnh Xuân 1.200m²
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
