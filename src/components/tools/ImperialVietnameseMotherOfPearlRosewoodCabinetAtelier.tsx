'use client'

import React, { useState, useRef } from 'react'

interface ShellSpectrumAngle {
  angleDegrees: number
  primaryColorName: string
  colorHex: string
  iridescenceDescription: string
  lightSourceType: string
}

const SHELL_SPECTRUM_ANGLES: ShellSpectrumAngle[] = [
  {
    angleDegrees: 30,
    primaryColorName: 'Đỏ Huyết Dụ & Cam Hổ Phách',
    colorHex: '#e11d48',
    iridescenceDescription: 'Góc nghiêng 30 độ làm bừng sáng các tinh thể canxi cacbonat aragonite dạng phiến của ốc đỏ Singapore, tỏa ánh đỏ lửa quyền quý.',
    lightSourceType: 'Ánh sáng ban mai 2700K',
  },
  {
    angleDegrees: 60,
    primaryColorName: 'Xanh Ngọc Lục Bảo (Imperial Emerald)',
    colorHex: '#059669',
    iridescenceDescription: 'Góc tán xạ 60 độ chuyển dịch bước sóng ánh sáng sang dải xanh ngọc phỉ thúy, làm nổi bật đường gân lá sen và cánh hạc.',
    lightSourceType: 'Ánh sáng tự nhiên giếng trời 4000K',
  },
  {
    angleDegrees: 90,
    primaryColorName: 'Lam Thạch Sapphire & Tím Thạch Anh',
    colorHex: '#2563eb',
    iridescenceDescription: 'Góc rọi trực diện 90 độ kích hoạt tầng lân tinh sâu nhất của vỏ xà cừ, phát quang ánh lam thẫm huyền bí dưới đèn CRI 98.',
    lightSourceType: 'Đèn rọi tiêu điểm CRI 98 UGR < 16',
  },
  {
    angleDegrees: 120,
    primaryColorName: 'Vàng Hoàng Kim 24K (Champagne Shimmer)',
    colorHex: '#d97706',
    iridescenceDescription: 'Góc phản quang nghịch chiều tạo ánh kim sa lấp lánh như dát vàng ròng trên nền gỗ cẩm lai đen nhánh mộc mạc.',
    lightSourceType: 'Ánh hoàng hôn Sài Gòn 2200K',
  },
]

export function ImperialVietnameseMotherOfPearlRosewoodCabinetAtelier() {
  const [selectedAngleIdx, setSelectedAngleIdx] = useState<number>(0)
  const [zoomMagnification, setZoomMagnification] = useState<number>(1)
  const [isTappingWood, setIsTappingWood] = useState<boolean>(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  const activeSpectrum = SHELL_SPECTRUM_ANGLES[selectedAngleIdx] ?? SHELL_SPECTRUM_ANGLES[0]!

  const playRosewoodTapSound = () => {
    if (typeof window === 'undefined') return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx()
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }

      setIsTappingWood(true)

      // Cẩm lai Nam Bộ has very high density (1.05 g/cm3), producing a bell-like metallic chime
      const osc = audioContextRef.current.createOscillator()
      const gain = audioContextRef.current.createGain()
      const filter = audioContextRef.current.createBiquadFilter()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(880, audioContextRef.current.currentTime)
      osc.frequency.exponentialRampToValueAtTime(440, audioContextRef.current.currentTime + 0.15)

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, audioContextRef.current.currentTime)
      filter.Q.setValueAtTime(4.0, audioContextRef.current.currentTime)

      gain.gain.setValueAtTime(0.001, audioContextRef.current.currentTime)
      gain.gain.linearRampToValueAtTime(0.12, audioContextRef.current.currentTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.4)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioContextRef.current.destination)

      osc.start()
      osc.stop(audioContextRef.current.currentTime + 0.42)

      setTimeout(() => {
        setIsTappingWood(false)
      }, 420)
    } catch {
      setIsTappingWood(false)
    }
  }

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background soft color splash based on shell iridescence */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 transition-all duration-700 blur-3xl"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${activeSpectrum.colorHex}, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-800/50 text-rose-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Nghệ Thuật Cẩn Xà Cừ & Mộc Cổ Truyền
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Tủ Cẩm Lai Khảm Cẩn Ốc Đỏ Singapore
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Kiệt tác dung hợp giữa gỗ Cẩm Lai Nam Bộ đanh chắc như kim loại và xà cừ Ốc Đỏ quý hiếm. 
            Mỗi chi tiết cẩn 1.2mm được lọng tay thủ công, biến sắc kỳ ảo theo từng góc độ ánh sáng và nhịp bước chân của gia chủ.
          </p>
        </div>

        {/* Angle Control Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {SHELL_SPECTRUM_ANGLES.map((angle, idx) => {
            const isSelected = idx === selectedAngleIdx
            return (
              <button
                key={angle.angleDegrees}
                onClick={() => setSelectedAngleIdx(idx)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-rose-600/80 shadow-lg shadow-rose-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-stone-400">GÓC RỌI {angle.angleDegrees}°</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: angle.colorHex }}
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-stone-200 line-clamp-1">
                    {angle.primaryColorName}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-stone-500 mt-2 block">
                  {angle.lightSourceType}
                </span>
              </button>
            )
          })}
        </div>

        {/* Main Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Shell Visualizer Display */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-3 border-b border-stone-800">
              <span>QUANG PHỔ ỐC ĐỎ SINGAPORE THẬT</span>
              <span className="text-rose-400 flex items-center gap-1.5 font-semibold">
                ĐỘ DÀY CẨN: 1.2 MM NGUYÊN BẢN
              </span>
            </div>

            {/* Inlay Motif Art Box */}
            <div className="my-8 text-center relative py-8 px-4 rounded-xl border border-stone-800/80 bg-stone-950/80 overflow-hidden flex flex-col items-center justify-center">
              {/* Radial shell glow */}
              <div
                className="w-44 h-44 rounded-full absolute blur-2xl opacity-40 transition-all duration-700"
                style={{ backgroundColor: activeSpectrum.colorHex }}
              />

              <div
                className="relative z-10 transition-transform duration-300"
                style={{ transform: `scale(${zoomMagnification})` }}
              >
                {/* Handcrafted Inlay SVG Motif */}
                <svg
                  className="w-28 h-28 mx-auto drop-shadow-md transition-colors duration-500"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke={activeSpectrum.colorHex}
                  strokeWidth="1.5"
                >
                  <circle cx="50" cy="50" r="45" strokeOpacity="0.3" strokeDasharray="3 3" />
                  <path
                    d="M50 15 C35 30 35 70 50 85 C65 70 65 30 50 15 Z"
                    fill={activeSpectrum.colorHex}
                    fillOpacity="0.25"
                  />
                  <path
                    d="M15 50 C30 35 70 35 85 50 C70 65 30 65 15 50 Z"
                    fill={activeSpectrum.colorHex}
                    fillOpacity="0.2"
                  />
                  <circle cx="50" cy="50" r="10" fill={activeSpectrum.colorHex} fillOpacity="0.6" />
                </svg>

                <div className="mt-4 font-serif text-lg text-stone-100 font-normal">
                  Họa Tiết Sen Ngũ Sắc & Đuôi Cá Chép
                </div>
                <div className="text-xs text-stone-400 font-mono mt-1">
                  Độ hở mộng cẩn: &lt; 0.08 mm (Khít tuyệt đối)
                </div>
              </div>
            </div>

            {/* Interactive Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800/80">
              {/* Wood Tap Sound Trigger */}
              <button
                onClick={playRosewoodTapSound}
                disabled={isTappingWood}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors min-h-[44px] border border-stone-700 flex items-center gap-2"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isTappingWood ? 'bg-rose-400 animate-ping' : 'bg-emerald-400'
                  }`}
                />
                <span>{isTappingWood ? 'TIẾNG CHIME ĐANH THÉP' : 'GÕ THỬ ĐỘ ĐANH GỖ CẨM'}</span>
              </button>

              {/* Magnifier Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-stone-400">KÍNH LÚP SOI VÂN:</span>
                {[1, 1.25, 1.5].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setZoomMagnification(scale)}
                    className={`px-2.5 py-1 rounded text-xs font-mono min-h-[36px] ${
                      zoomMagnification === scale
                        ? 'bg-rose-900 text-rose-200 border border-rose-600'
                        : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {scale}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description & Engineering Norms */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest block mb-1">
                Hiện Tượng Tán Xạ Quang Học
              </span>
              <h3 className="text-xl font-serif text-stone-100 mb-3">{activeSpectrum.primaryColorName}</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-4">
                {activeSpectrum.iridescenceDescription}
              </p>
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">QUANG THỰC ĐỊA:</span>
                <span className="text-rose-300">{activeSpectrum.lightSourceType}</span>
              </div>
            </div>

            {/* Quality Standard Badges */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Đặc Quyền Kỹ Thuật GuHomes
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span><strong>Gỗ Cẩm Lai sấy chân không 90 ngày:</strong> Đưa độ ẩm gỗ về 10.5% EMC, triệt tiêu co ngót trước khi cẩn xà cừ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span><strong>Ốc Đỏ Singapore tuyển lựa:</strong> Chỉ dùng phần thịt vỏ dày nhất, màu sắc chuyển 7 sắc tự nhiên không nhuộm phẩm.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span><strong>Đánh bóng bột sừng thủ công:</strong> 12 lượt đánh mộc bằng lòng bàn tay nghệ nhân già xưởng Thạnh Xuân 1.200m2.</span>
                </li>
              </ul>
            </div>

            {/* Consultation Line */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-300 block">Đặt chế tác đồ cẩn xà cừ độc bản:</span>
                <span className="text-stone-400 text-[11px] font-mono">Giới hạn 12 công trình/năm</span>
              </div>
              <a
                href="tel:0368757916"
                className="px-3 py-2 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 font-mono text-xs font-semibold transition-colors min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-mono text-stone-500">
          GUHOMES HERITAGE ATELIER · 14 ĐƯỜNG 41, AN KHÁNH, THỦ ĐỨC · HOTLINE: 0368 757 916
        </div>
      </div>
    </section>
  )
}
