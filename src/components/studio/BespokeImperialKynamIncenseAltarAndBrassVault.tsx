'use client'

import React, { useState, useRef } from 'react'

interface KynamProfile {
  id: string
  name: string
  origin: string
  kynamAge: number
  tempCelsius: number
  longevityHours: number
  olfactoryNotes: string
  sensoryNarrative: string
  craftsmanshipDetail: string
}

const KYNAM_PROFILES: KynamProfile[] = [
  {
    id: 'bach-ky-phu-yen',
    name: 'Bạch Kỳ Nam Phú Yên Rừng Sâu',
    origin: 'Rừng nguyên sinh Đồng Xuân, Phú Yên',
    kynamAge: 85,
    tempCelsius: 110,
    longevityHours: 24,
    olfactoryNotes: 'Năm tầng hương biến ảo diệu kỳ: thanh mát quả dại, bùi ngậy sữa mật, thơm ngọt hoa sen tuyết và trầm mặc bách niên.',
    sensoryNarrative: 'Chất dầu sánh dẻo như sáp ong tự nhiên, khi gặp hơi ấm lập tức tỏa làn khói mảnh huyền ảo làm tĩnh lặng mọi không gian.',
    craftsmanshipDetail: 'Án tiếp khách gỗ Trắc đen cẩn chỉ vàng 24K mộng én giấu kín, sấy cân bằng ẩm 11% không bao giờ cong vênh.',
  },
  {
    id: 'thanh-ky-khanh-hoa',
    name: 'Thanh Kỳ Nam Khánh Hòa Hảo Hạng',
    origin: 'Dãy núi Hòn Hèo, Khánh Hòa',
    kynamAge: 70,
    tempCelsius: 140,
    longevityHours: 20,
    olfactoryNotes: 'Sắc xanh ánh ngọc thấu quang, hương the mát tột đỉnh mở đầu rồi chuyển dần sang vị ngọt thanh tao của thảo dược rừng sâu.',
    sensoryNarrative: 'Từng nốt hương len lỏi khai thông kinh lạc, đánh thức sự sắc bén của trí tuệ và xua tan mọi mỏi mệt tâm trí.',
    craftsmanshipDetail: 'Lư đồng đỏ đúc sáp 3 chân dày 7mm tỷ trọng 8.9 g/cm³, đúc theo tỷ lệ đỉnh Lê - Nguyễn giữ nhiệt hoàn hảo.',
  },
  {
    id: 'hac-ky-quang-nam',
    name: 'Hắc Kỳ Nam Tiên Phước Rừng Già',
    origin: 'Vùng cao Tiên Phước, Quảng Nam',
    kynamAge: 92,
    tempCelsius: 190,
    longevityHours: 22,
    olfactoryNotes: 'Dầu đen tuyền đặc quánh, vị ngọt hậu đậm đà của mật mía ngàn năm quyện hương gỗ cổ thụ bền bỉ suốt ngày dài.',
    sensoryNarrative: 'Hương thơm lắng đọng đưa tâm thức về trạng thái thiền định tĩnh tại, tạo trường năng lượng ấm áp cho cả gian phòng.',
    craftsmanshipDetail: 'Khay tro gốm Bát Tràng tráng men ngọc bích nung củi 1.300°C, rải tro rơm nếp làng Chuông trắng ngần để nén khuôn triện.',
  },
]

export function BespokeImperialKynamIncenseAltarAndBrassVault({ className = '' }: { className?: string }) {
  const [selectedKynamId, setSelectedKynamId] = useState<string>('bach-ky-phu-yen')
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [heatLevel, setHeatLevel] = useState<number>(110)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  const currentKynam = KYNAM_PROFILES.find((k) => k.id === selectedKynamId) ?? KYNAM_PROFILES[0]!

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

        // 528 Hz Master Solfeggio frequency with rich warm overtones
        const fundamentalFreq = 528
        const harmonics = [
          { freq: fundamentalFreq, gainVal: 0.32, decay: 5.2 },
          { freq: fundamentalFreq * 1.5, gainVal: 0.16, decay: 4.0 },
          { freq: fundamentalFreq * 2.02, gainVal: 0.1, decay: 3.2 },
          { freq: fundamentalFreq * 3.14, gainVal: 0.04, decay: 2.0 },
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
      intervalIdRef.current = setInterval(strikeBronzeBell, 7000)

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
              <span>● Nghệ Thuật Khứu Giác Hoàng Gia</span>
              <span>· Án Kỳ Nam Khảm Chỉ Vàng & Lư Đồng Đỏ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Án Kỳ Nam Khảm Chỉ Vàng 24K & Đỉnh Trầm Ba Chân
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Kiệt tác đón tiếp khách quý tại sảnh Biệt thự và Dinh thự ven sông do GuHomes may đo: Gỗ Trắc đen cẩn sợi chỉ vàng 24K hoa văn Thăng Long, kết hợp đỉnh đồng đỏ đúc thủ công dày 7mm nâng niu từng phiến Kỳ Nam rừng tự nhiên quý hiếm.
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
              aria-label={isPlayingAudio ? 'Dừng chuông ngân đỉnh đồng' : 'Lắng nghe chuông ngân Solfeggio 528Hz'}
            >
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-[#0F1412] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isPlayingAudio ? 'Đang Ngân Chuông Đỉnh Đồng' : 'Thỉnh Chuông Tĩnh Thức 528Hz'}</span>
              <span className="font-mono text-[10px]">{isPlayingAudio ? '528 Hz' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill Selection (Left Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Chọn Tuyệt Phẩm Kỳ Nam Xông Đốt:
            </span>

            <div className="flex flex-col gap-3">
              {KYNAM_PROFILES.map((kynam) => {
                const isActive = kynam.id === selectedKynamId
                return (
                  <button
                    key={kynam.id}
                    onClick={() => {
                      setSelectedKynamId(kynam.id)
                      setHeatLevel(kynam.tempCelsius)
                    }}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C2824] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-[1.01]'
                        : 'bg-[#131A17] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isActive ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {kynam.name}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#0F1412] border border-[#C5A880]/20 text-[#A8A29E]">
                        Tuổi Kỳ: {kynam.kynamAge} Năm
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {kynam.olfactoryNotes}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Scent Heat Temperature Controller */}
            <div className="p-5 rounded-2xl bg-[#131A17] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Nhiệt Độ Thưởng Kỳ Nam Lư Đồng:</span>
                <span className="text-[#C5A880] font-semibold">{heatLevel}°C</span>
              </div>
              <input
                type="range"
                min="90"
                max="220"
                step="10"
                value={heatLevel}
                onChange={(e) => setHeatLevel(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1C2824] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                aria-label="Điều chỉnh nhiệt độ thưởng hương kỳ nam"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>110°C (Thoát sương tuyết)</span>
                <span>140°C (Ngọt bùi sữa mật)</span>
                <span>190°C (Khói ấm bách niên)</span>
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
                    Hồ Sơ Giám Định Kỳ Nam & Mỹ Nghệ Cung Đình
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#F3EFEA]">
                    {currentKynam.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Xuất Xứ: {currentKynam.origin.split(',')[0]}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Lưu Hương: {currentKynam.longevityHours} Giờ
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Tuổi Tích Dầu</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentKynam.kynamAge} Năm</span>
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
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Độ Bền Hương</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentKynam.longevityHours}h</span>
                </div>
              </div>

              {/* Craftsmanship Specs */}
              <div className="space-y-4 text-xs sm:text-sm font-light text-[#D6D3D1] leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Hương Thơm Đa Tầng:</span>
                  <span>{currentKynam.olfactoryNotes}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Chế Tác Án Thờ:</span>
                  <span>{currentKynam.craftsmanshipDetail}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Địa Danh Khai Thác:</span>
                  <span>{currentKynam.origin}</span>
                </div>
              </div>

              {/* Lead Architect Quote */}
              <div className="mt-6 pt-6 border-t border-[#C5A880]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C2824] border border-[#C5A880]/40 flex items-center justify-center shrink-0 font-display text-sm text-[#C5A880]">
                  Gu
                </div>
                <div>
                  <p className="text-xs sm:text-sm italic text-[#F3EFEA]/90 font-serif leading-relaxed">
                    &ldquo;{currentKynam.sensoryNarrative}&rdquo;
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
