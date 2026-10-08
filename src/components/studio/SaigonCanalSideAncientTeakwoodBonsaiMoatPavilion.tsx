'use client'

import React, { useState, useRef } from 'react'

interface MoatPavilionExperience {
  id: string
  title: string
  timeOfDay: string
  tempReductionCelsius: number
  humidityPct: number
  waterFlowRateLpm: number
  secchiDepthMeters: number
  bonsaiSpecies: string
  bonsaiAgeYears: number
  koiVariety: string
  sensoryNarrative: string
  architecturalNote: string
}

const PAVILION_EXPERIENCES: MoatPavilionExperience[] = [
  {
    id: 'dawn-awakening',
    title: 'Bình Minh Nghinh Phong & Điểm Sương Duyên Tùng',
    timeOfDay: '05:30 - 08:00',
    tempReductionCelsius: 2.8,
    humidityPct: 68,
    waterFlowRateLpm: 140,
    secchiDepthMeters: 1.8,
    bonsaiSpecies: 'Duyên Tùng Nam Bộ (Juniperus chinensis)',
    bonsaiAgeYears: 85,
    koiVariety: 'Kohaku & Taisho Sanke thuần chủng Niigata',
    sensoryNarrative: 'Ánh nắng ban mai xuyên qua tán lá tùng uốn lượn, bốc nhẹ hơi sương trên mặt nước hào trong vắt.',
    architecturalNote: 'Bệ xoay bonsai hướng Đông Nam đón quang phổ bình minh, sục khí oxy âm tường đá ong Đồng Nai hoạt động êm ái dưới 22 dBA.',
  },
  {
    id: 'midday-zen',
    title: 'Ngọ Trầm Tĩnh Lự & Bay Hơi Vi Khí Hậu',
    timeOfDay: '11:30 - 14:00',
    tempReductionCelsius: 3.8,
    humidityPct: 58,
    waterFlowRateLpm: 220,
    secchiDepthMeters: 1.9,
    bonsaiSpecies: 'Mai Chiếu Thủy Da Đen Cổ Thụ (Wrightia religiosa)',
    bonsaiAgeYears: 92,
    koiVariety: 'Showa Sanshoku & Shiro Utsuri vảy nhung đen tuyền',
    sensoryNarrative: 'Gió trưa rạch Thảo Điền lướt qua hào nước bốc hơi làm mát tự nhiên, xua tan hoàn toàn cái oi bức nhiệt đới.',
    architecturalNote: 'Khung gỗ Teak Myanmar 80 năm tuổi chứa dầu silica tự kháng co ngót, dàn mái đua 1.8m tạo bóng râm sâu ngăn bức xạ nhiệt.',
  },
  {
    id: 'dusk-koi-reflection',
    title: 'Hoàng Hôn Ngắm Ngư & Đèn Đá Dọi Thủy Kính',
    timeOfDay: '17:30 - 20:30',
    tempReductionCelsius: 3.2,
    humidityPct: 64,
    waterFlowRateLpm: 180,
    secchiDepthMeters: 1.85,
    bonsaiSpecies: 'Tùng La Hán Dáng Trực Huyền (Podocarpus macrophyllus)',
    bonsaiAgeYears: 110,
    koiVariety: 'Yamabuki Ogon vảy vàng ánh kim kim hoàn',
    sensoryNarrative: 'Đèn LED âm nước 2700K chiếu ngược lớp vảy vàng óng của đàn cá koi bơi lượn dưới chân đình, tạo cảm giác tĩnh mịch khôn cùng.',
    architecturalNote: 'Sàn đá phiến bazan băm mặt chống trượt tuyệt đối khi ẩm ướt, mộng gỗ chốt nêm giấu kín bền vững hàng trăm năm.',
  },
]

export function SaigonCanalSideAncientTeakwoodBonsaiMoatPavilion({ className = '' }: { className?: string }) {
  const [selectedExpId, setSelectedExpId] = useState<string>('midday-zen')
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [flowIntensity, setFlowIntensity] = useState<number>(3)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  const currentExp = PAVILION_EXPERIENCES.find((e) => e.id === selectedExpId) ?? PAVILION_EXPERIENCES[0]!

  const startMoatSoundscape = () => {
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
        master.gain.setValueAtTime(0.18, audioCtxRef.current.currentTime)
        master.connect(audioCtxRef.current.destination)
        masterGainRef.current = master
      }

      const playWaterRippleAndKoiTail = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return
        const now = audioCtxRef.current.currentTime

        // 1. Water ripple sound via bandpass filtered pink noise
        const bufferSize = Math.floor(audioCtxRef.current.sampleRate * 0.9)
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
          output[i] = (b0 + b1 + b2 + b3 + b4) * 0.07
        }

        const noiseSource = audioCtxRef.current.createBufferSource()
        noiseSource.buffer = buffer

        const filter = audioCtxRef.current.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(480 + flowIntensity * 60, now)
        filter.Q.setValueAtTime(2.5, now)

        const rippleGain = audioCtxRef.current.createGain()
        rippleGain.gain.setValueAtTime(0.001, now)
        rippleGain.gain.linearRampToValueAtTime(0.2, now + 0.15)
        rippleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85)

        noiseSource.connect(filter)
        filter.connect(rippleGain)
        rippleGain.connect(masterGainRef.current)

        noiseSource.start(now)
        noiseSource.stop(now + 0.9)

        // 2. Harmonic Solfeggio 528 Hz gentle tone simulating meditative resonance
        if (Math.random() > 0.4) {
          const osc = audioCtxRef.current.createOscillator()
          const oscGain = audioCtxRef.current.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(528, now + 0.2) // 528 Hz DNA repair / calm frequency

          oscGain.gain.setValueAtTime(0.0001, now + 0.2)
          oscGain.gain.linearRampToValueAtTime(0.04, now + 0.4)
          oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2)

          osc.connect(oscGain)
          oscGain.connect(masterGainRef.current)

          osc.start(now + 0.2)
          osc.stop(now + 2.3)
        }
      }

      playWaterRippleAndKoiTail()
      if (intervalIdRef.current) clearInterval(intervalIdRef.current)
      intervalIdRef.current = setInterval(playWaterRippleAndKoiTail, (6 - flowIntensity) * 750)

      setIsPlayingAudio(true)
    } catch {
      // AudioContext fallback
    }
  }

  const stopMoatSoundscape = () => {
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
      stopMoatSoundscape()
    } else {
      startMoatSoundscape()
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
              <span>· Teak Cổ Thụ & Hào Nước Koi Bách Niên</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Thủy Đình Teak Cổ Thụ & Hào Nước Bonsai Tĩnh Lự
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Giải pháp vi khí hậu thụ động độc bản từ GuHomes: Khung gỗ Teak Myanmar 80 năm tuổi kết hợp hào nước tuần hoàn bao bọc ba mặt, giảm nhiệt tự nhiên tới 3.8°C cho không gian thư thái giữa lòng đô thị nhiệt đới.
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
              aria-label={isPlayingAudio ? 'Dừng âm thanh hào nước koi' : 'Bật âm thanh hào nước koi'}
            >
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-[#0F1412] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isPlayingAudio ? 'Đang Phát Thủy Âm Hào Nước' : 'Lắng Nghe Suối Nước & Cá Koi'}</span>
              <span className="font-mono text-[10px]">{isPlayingAudio ? '528 Hz' : 'Off'}</span>
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
              {PAVILION_EXPERIENCES.map((exp) => {
                const isActive = exp.id === selectedExpId
                return (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C2824] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-[1.01]'
                        : 'bg-[#131A17] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isActive ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {exp.title}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#0F1412] border border-[#C5A880]/20 text-[#A8A29E]">
                        {exp.timeOfDay}
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {exp.sensoryNarrative}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Moat Water Flow Controller */}
            <div className="p-5 rounded-2xl bg-[#131A17] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Lưu Lượng Thác Tràn Hào Nước:</span>
                <span className="text-[#C5A880] font-semibold">{100 + flowIntensity * 40} L/phút</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={flowIntensity}
                onChange={(e) => setFlowIntensity(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1C2824] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                aria-label="Điều chỉnh lưu lượng thác tràn hào nước"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>Êm dịu 140 L/phút</span>
                <span>Tuần hoàn nhanh 300 L/phút</span>
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
                    Cấu Trúc Không Gian & Sinh Thái Hào Nước
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#F3EFEA]">
                    {currentExp.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Vi Khí Hậu: -{currentExp.tempReductionCelsius}°C
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Độ Ẩm: {currentExp.humidityPct}%
                  </span>
                </div>
              </div>

              {/* Sensor & Climate Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Hạ Nhiệt Thụ Động</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">-{currentExp.tempReductionCelsius}°C</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Độ Trong Nước</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentExp.secchiDepthMeters}m</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Tuổi Cây Bonsai</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentExp.bonsaiAgeYears} Năm</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Lưu Lượng Lọc</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentExp.waterFlowRateLpm} L/p</span>
                </div>
              </div>

              {/* Material & Botanical Details */}
              <div className="space-y-4 text-xs sm:text-sm font-light text-[#D6D3D1] leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Bonsai Độc Bản:</span>
                  <span>{currentExp.bonsaiSpecies} ({currentExp.bonsaiAgeYears} năm tuổi, uốn thế truyền thống)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Đàn Cá Koi:</span>
                  <span>{currentExp.koiVariety}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Kỹ Thuật Xây Dựng:</span>
                  <span>{currentExp.architecturalNote}</span>
                </div>
              </div>

              {/* Lead Architect Quote */}
              <div className="mt-6 pt-6 border-t border-[#C5A880]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C2824] border border-[#C5A880]/40 flex items-center justify-center shrink-0 font-display text-sm text-[#C5A880]">
                  Gu
                </div>
                <div>
                  <p className="text-xs sm:text-sm italic text-[#F3EFEA]/90 font-serif leading-relaxed">
                    &ldquo;{currentExp.sensoryNarrative}&rdquo;
                  </p>
                  <span className="text-[11px] font-mono text-[#A8A29E] mt-1 block">
                    KTS Trưởng GuHomes: 0368 757 916 · Xưởng may đo Thạnh Xuân 1.200m² · Giới hạn 12 công trình/năm
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
