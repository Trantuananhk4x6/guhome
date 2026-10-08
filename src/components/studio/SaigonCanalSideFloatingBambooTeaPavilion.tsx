'use client'

import React, { useState, useEffect, useRef } from 'react'

interface TidalState {
  id: string
  name: string
  tideLevelMeters: number
  waveDampingRate: number
  waterCurrentSpeed: string
  coolingDeltaCelsius: number
  windSpeed: number
  description: string
  atmosphereNote: string
}

interface BambooStructureSpec {
  part: string
  material: string
  treatment: string
  benefit: string
}

const TIDAL_STATES: TidalState[] = [
  {
    id: 'slack-water',
    name: 'Nước Ròng - Trầm Lắng Ban Mai',
    tideLevelMeters: 0.8,
    waveDampingRate: 98,
    waterCurrentSpeed: '0.4 m/s',
    coolingDeltaCelsius: -4.2,
    windSpeed: 2.4,
    description: 'Mặt sông phẳng lặng như gương soi, hệ phao ngầm neo sâu giữ thế cân bằng tĩnh, sương sớm là là trên mặt sàn tre.',
    atmosphereNote: 'Thích hợp cho nghi thức thưởng trà sớm và tĩnh tọa trước bình minh.'
  },
  {
    id: 'high-tide',
    name: 'Nước Lớn - Gió Lộng Đỉnh Triều',
    tideLevelMeters: 1.4,
    waveDampingRate: 95,
    waterCurrentSpeed: '1.2 m/s',
    coolingDeltaCelsius: -4.9,
    windSpeed: 3.2,
    description: 'Triều sông Sài Gòn dâng cao mang theo làn gió mát lành, mái lá dừa nước 3 tầng hút luồng gió đối lưu xuyên qua rèm tre mộc.',
    atmosphereNote: 'Nhiệt độ vi khí hậu giảm sâu kỷ lục 4.9°C so với phố thị bê tông bên ngoài.'
  },
  {
    id: 'spring-tide',
    name: 'Triều Cường - Sóng Vỗ Nhịp Điệu',
    tideLevelMeters: 1.7,
    waveDampingRate: 92,
    waterCurrentSpeed: '1.8 m/s',
    coolingDeltaCelsius: -4.6,
    windSpeed: 4.1,
    description: 'Sóng cuộn từ ca nô và tàu bè qua lại được triệt tiêu 92% qua cấu trúc phao composite đối trọng tự cân bằng chìm sâu.',
    atmosphereNote: 'Cảm giác bồng bềnh êm ái như nôi êm ru, sóng vỗ lách tách vào cọc mộng tre.'
  }
]

const BAMBOO_SPECS: BambooStructureSpec[] = [
  {
    part: 'Cột Kèo Khung Trụ',
    material: 'Tre Luồng Thanh Hóa',
    treatment: 'Ngâm bùn hữu cơ 6 tháng sấy nhiệt khử đường',
    benefit: 'Chống mọt tuyệt đối, đàn hồi chịu lực xoắn vặn cực hạn'
  },
  {
    part: 'Mái Che 3 Tầng',
    material: 'Lá Dừa Nước Nước Mặn',
    treatment: 'Phơi sương đan kép dày 180mm',
    benefit: 'Cách nhiệt 94%, triệt tiêu tiếng lộp độp mưa nhiệt đới'
  },
  {
    part: 'Sàn Trà Thất',
    material: 'Nan Tre Cật Chà Nhám',
    treatment: 'Phủ dầu sáp ong rừng Cà Mau tự nhiên',
    benefit: 'Nhẵn bóng chân trần, ấm mùa mưa mát rượi mùa nắng'
  },
  {
    part: 'Liên Kết Kết Cấu',
    material: 'Chốt Gỗ Căm Xe & Dây Mây',
    treatment: 'Mộng giáp thủ công 100% không đinh kim loại',
    benefit: 'Không rỉ sét ăn mòn trong môi trường hơi ẩm phù sa sông'
  }
]

export function SaigonCanalSideFloatingBambooTeaPavilion() {
  const [selectedTidalIndex, setSelectedTidalIndex] = useState<number>(1)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
  const [mistCoolingActive, setMistCoolingActive] = useState<boolean>(true)
  const [customTeaCeremonyStep, setCustomTeaCeremonyStep] = useState<number>(0)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const ambientNoiseNodeRef = useRef<AudioNode | null>(null)
  const ambientGainNodeRef = useRef<GainNode | null>(null)

  const currentTide = (TIDAL_STATES[selectedTidalIndex] ?? TIDAL_STATES[0]) as TidalState

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const getAudioContext = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  const toggleRiverAmbience = () => {
    const ctx = getAudioContext()

    if (isAudioPlaying) {
      if (ambientGainNodeRef.current) {
        ambientGainNodeRef.current.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5)
      }
      setTimeout(() => {
        setIsAudioPlaying(false)
      }, 500)
    } else {
      setIsAudioPlaying(true)
      const now = ctx.currentTime

      // Create pink noise for gentle river water sloshing
      const bufferSize = ctx.sampleRate * 2
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
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05
        b6 = white * 0.115926
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      const waterFilter = ctx.createBiquadFilter()
      waterFilter.type = 'lowpass'
      waterFilter.frequency.setValueAtTime(380, now)

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.001, now)
      masterGain.gain.linearRampToValueAtTime(0.25, now + 1.0)

      // Add low thud for bamboo hull wave interaction
      const hullOsc = ctx.createOscillator()
      const hullGain = ctx.createGain()
      hullOsc.type = 'sine'
      hullOsc.frequency.setValueAtTime(45, now)
      hullGain.gain.setValueAtTime(0.12, now)

      // Slow LFO for tide wave undulation
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(0.2, now) // Every 5 seconds
      lfoGain.gain.setValueAtTime(80, now)

      lfo.connect(waterFilter.frequency)
      lfo.start(now)

      hullOsc.connect(hullGain)
      hullGain.connect(masterGain)
      hullOsc.start(now)

      whiteNoise.connect(waterFilter)
      waterFilter.connect(masterGain)
      masterGain.connect(ctx.destination)

      whiteNoise.start(now)

      ambientNoiseNodeRef.current = whiteNoise
      ambientGainNodeRef.current = masterGain
    }
  }

  const teaSteps = [
    { title: 'Tẩy Trần Khử Ẩm', desc: 'Tráng ấm gốm Bát Tràng nước sôi 98°C bốc hơi nhanh nhờ gió đối lưu.' },
    { title: 'Đánh Thức Hương Trà', desc: 'Đánh thức búp Shan Tuyết cổ thụ trên sàn tre sáp ong thơm nhẹ.' },
    { title: 'Thưởng Vị Đỉnh Triều', desc: 'Rót trà ngắm nước lớn xao xuyến chân cầu, vi khí hậu hạ 4.9°C.' }
  ]

  return (
    <section className="relative w-full bg-[#0d1412] text-[#e0e7e4] py-20 px-4 md:px-8 border-y border-[#1e2e28] overflow-hidden font-sans">
      {/* Subtle River Wave Light Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_30%_15%,#2a5040_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#48826b]/40 bg-[#14231e]/80 text-[#71b99e] text-xs uppercase tracking-widest mb-4">
            <span>Kiến Trúc Thủy Tọa Ven Sông</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#71b99e]" />
            <span>GuHomes Studio 2026</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#f2f7f5] mb-6 leading-tight">
            Thủy Đình Tre Nổi Ven Sông Sài Gòn
          </h2>
          <p className="text-[#a4b8b0] text-base md:text-lg leading-relaxed font-light">
            Không gian thưởng trà độc bản bồng bềnh trên sóng nước, liên kết hoàn toàn bằng mộng tre luồng ngâm bùn sấy nhiệt.
            Mái 3 tầng lá dừa nước đan kép đón gió đối lưu, hạ nhiệt độ không gian 4.9°C giữa trưa nhiệt đới.
          </p>
        </div>

        {/* Real-time Microclimate Telemetry Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 bg-[#121d19] p-5 rounded-2xl border border-[#1e3029]">
          <div className="border-r border-[#1e3029]/80 pr-4">
            <span className="block text-xs uppercase tracking-wider text-[#79948a] mb-1">Mức Hạ Nhiệt Vi Khí Hậu</span>
            <span className="text-xl md:text-2xl font-serif text-[#71b99e]">{currentTide.coolingDeltaCelsius}°C</span>
            <span className="block text-[11px] text-[#58736a] mt-0.5">So với nhiệt độ trung tâm TP</span>
          </div>
          <div className="border-r border-[#1e3029]/80 pr-4">
            <span className="block text-xs uppercase tracking-wider text-[#79948a] mb-1">Độ Ổn Định Phao Ngầm</span>
            <span className="text-xl md:text-2xl font-serif text-[#71b99e]">Triệt {currentTide.waveDampingRate}% Dao Động</span>
            <span className="block text-[11px] text-[#58736a] mt-0.5">Phao composite đối trọng sâu</span>
          </div>
          <div className="border-r border-[#1e3029]/80 pr-4">
            <span className="block text-xs uppercase tracking-wider text-[#79948a] mb-1">Tốc Độ Gió Sông</span>
            <span className="text-lg md:text-xl font-serif text-[#f2f7f5]">{currentTide.windSpeed} m/s</span>
            <span className="block text-[11px] text-[#58736a] mt-0.5">Lưu thông gió đối lưu tự nhiên</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#79948a] mb-1">Mực Nước Sông Hiện Tại</span>
            <span className="text-lg md:text-xl font-serif text-[#f2f7f5]">+{currentTide.tideLevelMeters}m</span>
            <span className="block text-[11px] text-[#58736a] mt-0.5">Dòng chảy {currentTide.waterCurrentSpeed}</span>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Tidal Hydraulics & Floating Simulator (7 cols) */}
          <div className="lg:col-span-7 bg-[#111c18] rounded-2xl p-6 md:p-8 border border-[#1d3028] shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1f332b]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#71b99e] font-semibold">Mô Phỏng Động Lực Học Sông Nước</span>
                <h3 className="text-xl font-serif text-[#f2f7f5] mt-1">Chu Kỳ Thủy Triều & Cân Bằng Nổi</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#172621] text-[#93aba2] border border-[#233a31]">
                100% Mộng Khóa Tre Mộc
              </span>
            </div>

            {/* Interactive River Wave Simulator Box */}
            <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#162721] to-[#0c1613] rounded-xl border-2 border-[#2b443a] p-6 flex flex-col justify-between overflow-hidden">
              {/* Floating Structure Visual Frame */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                <div 
                  className="w-48 md:w-64 py-4 px-6 rounded-2xl bg-[#1b2f27]/90 border border-[#48826b] shadow-[0_10px_30px_rgba(15,35,28,0.6)] transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(${currentTide.tideLevelMeters * -12}px) rotate(${currentTide.tideLevelMeters * 0.8}deg)`
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#71b99e] animate-pulse" />
                    <span className="text-xs font-serif uppercase tracking-wider text-[#d2e3dc]">Thủy Đình Trà Thất</span>
                  </div>
                  <span className="text-sm font-semibold text-[#f2f7f5] block">{currentTide.name.split('-')[0]}</span>
                  <span className="text-[11px] text-[#86a197] mt-1 block">Cao độ nổi: +{currentTide.tideLevelMeters}m mặt nước</span>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[#a4b8b0]">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#71b99e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Phao ngầm triệt {currentTide.waveDampingRate}% sóng ca nô
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#71b99e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Gió sông: {currentTide.windSpeed} m/s
                  </span>
                </div>
              </div>

              {/* Water Surface Wave Simulation */}
              <div className="relative w-full h-8 overflow-hidden rounded-b-lg opacity-60">
                <div className="absolute inset-0 bg-gradient-to-r from-[#214336] via-[#356150] to-[#214336] animate-pulse" />
              </div>
            </div>

            {/* Tidal State Selectors */}
            <div className="mt-6">
              <span className="block text-xs uppercase tracking-wider text-[#79948a] mb-3">
                Chọn Chu Kỳ Thủy Triều Sông Sài Gòn:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TIDAL_STATES.map((tide, idx) => (
                  <button
                    key={tide.id}
                    type="button"
                    onClick={() => setSelectedTidalIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all min-h-[44px] cursor-pointer ${
                      selectedTidalIndex === idx
                        ? 'border-[#71b99e] bg-[#1a2d25] shadow-md'
                        : 'border-[#1f332b] bg-[#13201b] hover:border-[#2e4c40]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#f2f7f5] block mb-1">{tide.name.split('-')[0]}</span>
                    <span className="text-[11px] text-[#71b99e] block font-mono">Hạ {tide.coolingDeltaCelsius}°C nhiệt</span>
                    <span className="text-[10px] text-[#79948a] block mt-1 line-clamp-1">{tide.waterCurrentSpeed}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#a4b8b0] italic mt-3 bg-[#13201b] p-3 rounded-lg border border-[#1f332b]">
                {currentTide.description} {currentTide.atmosphereNote}
              </p>
            </div>
          </div>

          {/* Right Column: Audio Ambience & Bamboo Craftsmanship (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* River Soundscape Player */}
            <div className="bg-[#111c18] rounded-2xl p-6 border border-[#1d3028] shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1f332b]">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#71b99e]">
                  Âm Thanh Sông Nước & Bìm Bịp
                </h4>
                <span className="text-[11px] text-[#79948a]">30dB Tĩnh Lặng</span>
              </div>
              <p className="text-xs text-[#a4b8b0] mb-4">
                Mô phỏng tiếng sóng vỗ nhẹ mạn tre kết hợp nhịp điệu chim bìm bịp gọi nước lớn trên rặng bần ven sông:
              </p>

              <button
                type="button"
                onClick={toggleRiverAmbience}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#48826b] to-[#71b99e] text-[#0d1412] font-semibold text-sm tracking-wide uppercase shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              >
                {isAudioPlaying ? (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                    <span>Tắt Âm Thanh Sông Nước</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Lắng Nghe Tiếng Sóng Vỗ Mạn Tre (Web Audio)</span>
                  </>
                )}
              </button>

              <div className="mt-4 pt-3 border-t border-[#1f332b] flex items-center justify-between text-xs text-[#79948a]">
                <span>Phun sương nano vi lượng:</span>
                <button
                  type="button"
                  onClick={() => setMistCoolingActive(!mistCoolingActive)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer min-h-[44px] flex items-center ${
                    mistCoolingActive
                      ? 'bg-[#71b99e]/20 text-[#71b99e] border border-[#71b99e]/50'
                      : 'bg-[#182822] text-[#657d74] border border-[#233a31]'
                  }`}
                >
                  {mistCoolingActive ? 'Đang Hoạt Động (-0.6°C)' : 'Tắt Hệ Thống'}
                </button>
              </div>
            </div>

            {/* Tea Ceremony Protocol */}
            <div className="bg-[#111c18] rounded-2xl p-6 border border-[#1d3028] shadow-xl">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#71b99e] mb-3">
                Nghi Thức Thưởng Trà Thủy Tọa
              </h4>
              <div className="flex flex-col gap-2.5">
                {teaSteps.map((step, idx) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setCustomTeaCeremonyStep(idx)}
                    className={`p-3 rounded-xl border text-left transition-all min-h-[44px] cursor-pointer ${
                      customTeaCeremonyStep === idx
                        ? 'border-[#71b99e] bg-[#1a2d25]'
                        : 'border-[#1f332b] bg-[#13201b] hover:border-[#2b443a]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-[#71b99e]">0{idx + 1}.</span>
                      <span className="text-xs font-medium text-[#f2f7f5]">{step.title}</span>
                    </div>
                    <p className="text-[11px] text-[#86a197] pl-5">{step.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Structural Bamboo Specifications Table */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif text-[#f2f7f5]">Quy Chuẩn Kỹ Thuật Kết Cấu Tre Luồng</h3>
            <span className="text-xs text-[#71b99e]">Không đinh kim loại - Kháng mối mọt 30 năm</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BAMBOO_SPECS.map((spec) => (
              <div key={spec.part} className="bg-[#111c18] p-4 rounded-xl border border-[#1d3028]">
                <span className="text-xs uppercase tracking-wider text-[#71b99e] font-semibold block mb-1">
                  {spec.part}
                </span>
                <span className="text-sm font-medium text-[#f2f7f5] block mb-1.5">{spec.material}</span>
                <p className="text-[11px] text-[#86a197] leading-relaxed mb-2">{spec.treatment}</p>
                <div className="pt-2 border-t border-[#1d3028] text-[10px] text-[#79948a] italic">
                  Ưu điểm: {spec.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Meta Bar */}
        <div className="pt-8 border-t border-[#1d3028] flex flex-col md:flex-row items-center justify-between text-xs text-[#79948a] gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#71b99e]" />
            <span>Xưởng mộc may đo & kết cấu tre 1.200m² tại Thạnh Xuân, Q.12, TP. Hồ Chí Minh</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Hotline tư vấn vi khí hậu: <strong className="text-[#f2f7f5] font-medium">0368 757 916</strong></span>
            <span>Email: <strong className="text-[#f2f7f5] font-medium">guhomesvn@gmail.com</strong></span>
            <span className="hidden lg:inline text-[#58736a]">Tối đa 12 công trình/năm</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideFloatingBambooTeaPavilion
