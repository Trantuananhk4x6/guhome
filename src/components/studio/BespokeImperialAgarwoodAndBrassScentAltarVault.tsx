'use client'

import React, { useState, useRef } from 'react'

interface ScentAltarProfile {
  id: string
  name: string
  origin: string
  agarwoodAge: number
  tempCelsius: number
  burnDurationHours: number
  olfactoryNotes: string
  sensoryNarrative: string
  craftsmanshipDetail: string
}

const SCENT_PROFILES: ScentAltarProfile[] = [
  {
    id: 'tram-kien-khanh-hoa',
    name: 'Trầm Kiến Rừng Tự Nhiên Khánh Hòa',
    origin: 'Vạn Giã, Vạn Ninh, Tỉnh Khánh Hòa',
    agarwoodAge: 38,
    tempCelsius: 160,
    burnDurationHours: 12,
    olfactoryNotes: 'Nốt đầu thanh cay nhẹ, nốt giữa ngọt đậm vị mật ong rừng, nốt cuối đầm ấm hương thảo mộc cổ.',
    sensoryNarrative: 'Từng làn khói mảnh như sợi chỉ tơ lững lờ thoát ra từ khe rồng của đỉnh đồng ba chân, lan tỏa sự tĩnh tại tột cùng.',
    craftsmanshipDetail: 'Án hương gỗ Mun sọc Nam Bộ sấy ổn định 120 ngày, viền chỉ đồng thau chà xước thủ công không bóng lóa.',
  },
  {
    id: 'ky-nam-bach-phien',
    name: 'Kỳ Nam Bạch Phiến Phú Yên',
    origin: 'Rừng nguyên sinh Đồng Xuân, Phú Yên',
    agarwoodAge: 65,
    tempCelsius: 120,
    burnDurationHours: 18,
    olfactoryNotes: 'Biến chuyển năm tầng hương tinh diệu: thanh mát quả dại, bùi ngậy sữa hạnh nhân, ngọt dịu hoa sen và trầm mặc bách niên.',
    sensoryNarrative: 'Hương thơm vương giả thấu suốt tâm can, tẩy sạch mọi tạp niệm và căng thẳng của nhịp sống hiện đại.',
    craftsmanshipDetail: 'Lư đồng đỏ 92% đúc khuôn sáp thất truyền, vách dày 6mm giữ nhiệt tuyệt hảo và cộng hưởng sóng âm chuông ngân.',
  },
  {
    id: 'tram-mat-tu-tien-phuoc',
    name: 'Trầm Mắt Tử Tiên Phước Quảng Nam',
    origin: 'Vùng đồi Tiên Phước, Quảng Nam',
    agarwoodAge: 45,
    tempCelsius: 210,
    burnDurationHours: 14,
    olfactoryNotes: 'Đậm đà hương gỗ cổ thụ quyện khói quế thanh, hậu vị lắng sâu bền bỉ vương trên thớ vải tơ tằm suốt nhiều ngày.',
    sensoryNarrative: 'Khói trầm vấn vít quanh chén trà ấm nóng, đưa chủ nhân vào miền an định của tâm hồn tri kỷ.',
    craftsmanshipDetail: 'Khay tro gốm Bát Tràng men rạn tro trấu nung củi nhiệt độ 1.280°C, rải tro rơm nếp làng Chuông tinh khiết.',
  },
]

export function BespokeImperialAgarwoodAndBrassScentAltarVault({ className = '' }: { className?: string }) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('tram-kien-khanh-hoa')
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [heatLevel, setHeatLevel] = useState<number>(160)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  const currentProfile = SCENT_PROFILES.find((p) => p.id === selectedProfileId) ?? SCENT_PROFILES[0]!

  const startSingingBowlSound = () => {
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

      const strikeBronzeBell = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return
        const now = audioCtxRef.current.currentTime

        // 432 Hz Master tone with rich harmonics (Singing Bowl / Lư Đồng)
        const fundamentalFreq = 432
        const harmonics = [
          { freq: fundamentalFreq, gainVal: 0.35, decay: 4.8 },
          { freq: fundamentalFreq * 2.01, gainVal: 0.18, decay: 3.6 },
          { freq: fundamentalFreq * 2.76, gainVal: 0.12, decay: 2.8 },
          { freq: fundamentalFreq * 5.4, gainVal: 0.05, decay: 1.6 },
        ]

        harmonics.forEach(({ freq, gainVal, decay }) => {
          if (!audioCtxRef.current || !masterGainRef.current) return
          const osc = audioCtxRef.current.createOscillator()
          const oscGain = audioCtxRef.current.createGain()

          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, now)

          oscGain.gain.setValueAtTime(0.0001, now)
          oscGain.gain.linearRampToValueAtTime(gainVal, now + 0.02)
          oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay)

          osc.connect(oscGain)
          oscGain.connect(masterGainRef.current)

          osc.start(now)
          osc.stop(now + decay + 0.1)
        })
      }

      strikeBronzeBell()
      if (intervalIdRef.current) clearInterval(intervalIdRef.current)
      intervalIdRef.current = setInterval(strikeBronzeBell, 6500)

      setIsPlayingAudio(true)
    } catch {
      // AudioContext fallback
    }
  }

  const stopSingingBowlSound = () => {
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
      stopSingingBowlSound()
    } else {
      startSingingBowlSound()
    }
  }

  return (
    <section className={`w-full py-16 sm:py-24 bg-[#0F1412] text-[#F3EFEA] border-t border-[#C5A880]/20 relative overflow-hidden ${className}`}>
      {/* Visual background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#C5A880]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1C2824] blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C5A880]/20 pb-8 mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
              <span>● Nghệ Thuật Khứu Giác & Hương Đạo</span>
              <span>· Án Hương Mun Sọc & Lư Đồng Cổ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Án Hương Trầm Kiến & Lư Đồng Đúc Mộc Ba Chân
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Điểm nhấn tiếp khách tĩnh tại tại sảnh Penthouse và Biệt thự ven sông do GuHomes may đo: Gỗ Mun sọc Nam Bộ nẹp chỉ đồng thau xước mờ, đỉnh đồng đỏ đúc thủ công theo tỷ lệ vàng truyền thống, nâng niu từng phiến Trầm kiến rừng tự nhiên.
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
              aria-label={isPlayingAudio ? 'Dừng chuông ngân lư đồng' : 'Lắng nghe chuông ngân 432Hz'}
            >
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-[#0F1412] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isPlayingAudio ? 'Đang Ngân Chuông Lư Đồng' : 'Thỉnh Chuông Tĩnh Thức 432Hz'}</span>
              <span className="font-mono text-[10px]">{isPlayingAudio ? '432 Hz' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill Selection (Left Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Chọn Tuyệt Phẩm Trầm Hương Xông Đốt:
            </span>

            <div className="flex flex-col gap-3">
              {SCENT_PROFILES.map((profile) => {
                const isActive = profile.id === selectedProfileId
                return (
                  <button
                    key={profile.id}
                    onClick={() => {
                      setSelectedProfileId(profile.id)
                      setHeatLevel(profile.tempCelsius)
                    }}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C2824] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-[1.01]'
                        : 'bg-[#131A17] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isActive ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {profile.name}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#0F1412] border border-[#C5A880]/20 text-[#A8A29E]">
                        Tuổi Trầm: {profile.agarwoodAge} Năm
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {profile.olfactoryNotes}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Scent Heat Temperature Controller */}
            <div className="p-5 rounded-2xl bg-[#131A17] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Nhiệt Độ Thưởng Hương Lư Đồng:</span>
                <span className="text-[#C5A880] font-semibold">{heatLevel}°C</span>
              </div>
              <input
                type="range"
                min="100"
                max="240"
                step="10"
                value={heatLevel}
                onChange={(e) => setHeatLevel(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1C2824] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                aria-label="Điều chỉnh nhiệt độ thưởng hương"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>120°C (Thoát sương hoa)</span>
                <span>160°C (Ngọt đậm mật)</span>
                <span>210°C (Khói ấm trầm mặc)</span>
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
                    Hồ Sơ Giám Định Hương Liệu & Thủ Công Mỹ Nghệ
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#F3EFEA]">
                    {currentProfile.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Xuất Xứ: {currentProfile.origin.split(',')[0]}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Lưu Hương: {currentProfile.burnDurationHours} Giờ
                  </span>
                </div>
              </div>

              {/* Olfactory & Material Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Tuổi Tích Dầu</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentProfile.agarwoodAge} Năm</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Nhiệt Tối Ưu</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{heatLevel}°C</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Tỷ Trọng Đồng</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">8.9 g/cm³</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Thời Lượng Hương</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentProfile.burnDurationHours}h</span>
                </div>
              </div>

              {/* Craftsmanship Specs */}
              <div className="space-y-4 text-xs sm:text-sm font-light text-[#D6D3D1] leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Hương Thơm Đa Tầng:</span>
                  <span>{currentProfile.olfactoryNotes}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Chế Tác Án Hương:</span>
                  <span>{currentProfile.craftsmanshipDetail}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Xuất Xứ Rừng:</span>
                  <span>{currentProfile.origin}</span>
                </div>
              </div>

              {/* Lead Architect Quote */}
              <div className="mt-6 pt-6 border-t border-[#C5A880]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C2824] border border-[#C5A880]/40 flex items-center justify-center shrink-0 font-display text-sm text-[#C5A880]">
                  Gu
                </div>
                <div>
                  <p className="text-xs sm:text-sm italic text-[#F3EFEA]/90 font-serif leading-relaxed">
                    &ldquo;{currentProfile.sensoryNarrative}&rdquo;
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
