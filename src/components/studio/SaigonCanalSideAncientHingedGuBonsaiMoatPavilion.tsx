'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PavilionSpec {
  doorAngle: number
  rotationAngle: number
  isMoatFlowing: boolean
  tempReduction: number
  windVelocity: number
}

export function SaigonCanalSideAncientHingedGuBonsaiMoatPavilion() {
  const [doorAngle, setDoorAngle] = useState<number>(55)
  const [rotationAngle, setRotationAngle] = useState<number>(130)
  const [isMoatFlowing, setIsMoatFlowing] = useState<boolean>(true)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'architecture' | 'microclimate' | 'bonsai'>('architecture')

  // Audio Context for 528Hz Water & Chime Resonance
  const audioCtxRef = useRef<AudioContext | null>(null)

  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = audioCtxRef.current || new AudioCtx()
        audioCtxRef.current = ctx

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(528, ctx.currentTime) // Solfeggio 528Hz

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.1)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        osc.stop(ctx.currentTime + 3.3)
        setSoundEnabled(true)
        setTimeout(() => setSoundEnabled(false), 3200)
      } catch (err) {
        console.error('Audio error:', err)
      }
    } else {
      setSoundEnabled(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Microclimate calculations
  const tempReduction = - (7.0 + (doorAngle / 90) * 1.2).toFixed(1)
  const windVelocity = (1.2 + (doorAngle / 90) * 0.8).toFixed(2)

  return (
    <section className="relative w-full overflow-hidden bg-[#090b0a] py-28 text-[#ecebe4]">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#31573e] blur-[130px]" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#9c7832] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#43644f]/40 bg-[#121814] px-4 py-1.5 text-xs tracking-widest text-[#7ec298]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7ec298]" />
            THỦY ĐÌNH VEN KÊNH SÀI GÒN · HÀO SEN BÁCH DIỆP ĐỐI LƯU
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-light tracking-wide text-[#f5f3ec] md:text-5xl"
          >
            Thủy Đình Cửa Cối Gỗ Gụ Mật Nam Bộ 295 Năm & Hào Sen Sinh Thái
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#9ea39c] md:text-base"
          >
            Công trình thủy đình biệt phủ bên triền kênh sông Sài Gòn, kiến tạo từ cột kèo Gỗ Gụ Mật Nam Bộ (Sindora siamensis) 295 năm tuổi
            được xoa dầu trẩu thủ công. Hệ 4 cánh cối mộng nêm truyền thống mở rộng đón gió Tây Nam, kết hợp hào nước sen bách diệp rộng 2.0m
            hạ nhiệt vi khí hậu tự nhiên -8.2°C, quy tụ bệ xoay Bonsai Mai Chiếu Thủy 310 năm tuổi ngự lãm độc bản GuHomes.
          </motion.p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Visual Showcase (7 cols) */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2b332d] bg-[#111613]/80 p-8 backdrop-blur-md lg:col-span-7">
            {/* View Mode Selector */}
            <div className="mb-6 flex gap-2 rounded-lg bg-[#19211c] p-1 text-xs">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'architecture' ? 'bg-[#7ec298] text-[#0a110d] font-medium' : 'text-[#8f968e] hover:text-white'
                }`}
              >
                Khung Cố Khí & Mộng Cối
              </button>
              <button
                onClick={() => setActiveTab('microclimate')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'microclimate' ? 'bg-[#7ec298] text-[#0a110d] font-medium' : 'text-[#8f968e] hover:text-white'
                }`}
              >
                Khí Hậu Hào Sen -8.2°C
              </button>
              <button
                onClick={() => setActiveTab('bonsai')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'bonsai' ? 'bg-[#7ec298] text-[#0a110d] font-medium' : 'text-[#8f968e] hover:text-white'
                }`}
              >
                Mai Chiếu Thủy 310 Năm
              </button>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border border-[#232d26] bg-[#0b0e0c]">
              <svg width="340" height="230" viewBox="0 0 340 230" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="guRoofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#47311b" />
                    <stop offset="50%" stopColor="#2b1c0e" />
                    <stop offset="100%" stopColor="#170e06" />
                  </linearGradient>
                  <linearGradient id="guTimberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#634526" />
                    <stop offset="50%" stopColor="#3d2712" />
                    <stop offset="100%" stopColor="#211306" />
                  </linearGradient>
                  <linearGradient id="guMoatWaterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#183626" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#2b593e" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#153323" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Moat Water Base */}
                <ellipse cx="170" cy="180" rx="145" ry="34" fill="url(#guMoatWaterGrad)" stroke="#3e6f51" strokeWidth="1.2" />

                {/* Water Ripples */}
                {isMoatFlowing && (
                  <g className="animate-pulse opacity-60">
                    <ellipse cx="170" cy="180" rx="120" ry="26" fill="none" stroke="#68a37f" strokeWidth="0.8" strokeDasharray="6 4" />
                    <ellipse cx="170" cy="180" rx="90" ry="18" fill="none" stroke="#7ec298" strokeWidth="0.6" strokeDasharray="4 4" />
                  </g>
                )}

                {/* Lotus Flowers in Moat */}
                <circle cx="65" cy="178" r="4.5" fill="#f09db8" />
                <circle cx="275" cy="184" r="5" fill="#f09db8" />
                <circle cx="105" cy="195" r="3.8" fill="#f5bed0" />
                <circle cx="230" cy="192" r="4.2" fill="#f5bed0" />

                {/* Stone Plinth */}
                <polygon points="90,172 250,172 260,182 80,182" fill="#323b35" stroke="#48544c" strokeWidth="1" />

                {/* Gu Wood Columns (Sindora siamensis 295 yrs) */}
                <rect x="108" y="75" width="10" height="97" rx="2" fill="url(#guTimberGrad)" stroke="#4a3118" strokeWidth="1" />
                <rect x="222" y="75" width="10" height="97" rx="2" fill="url(#guTimberGrad)" stroke="#4a3118" strokeWidth="1" />
                <rect x="138" y="80" width="8" height="92" rx="2" fill="url(#guTimberGrad)" stroke="#4a3118" strokeWidth="0.8" opacity="0.9" />
                <rect x="194" y="80" width="8" height="92" rx="2" fill="url(#guTimberGrad)" stroke="#4a3118" strokeWidth="0.8" opacity="0.9" />

                {/* Ancient Rotating Bonsai Pedestal on Plinth */}
                <g transform={`rotate(${rotationAngle}, 170, 142)`}>
                  <rect x="156" y="136" width="28" height="12" rx="3" fill="#2d1c0e" stroke="#7ec298" strokeWidth="1" />
                  <ellipse cx="170" cy="136" rx="16" ry="5" fill="#4d321d" />
                  {/* Mai Chieu Thuy Bonsai Foliage Clouds */}
                  <circle cx="162" cy="122" r="10" fill="#24452e" stroke="#376343" strokeWidth="0.8" />
                  <circle cx="178" cy="120" r="12" fill="#2c5438" stroke="#457853" strokeWidth="0.8" />
                  <circle cx="170" cy="112" r="9" fill="#346141" stroke="#4f8a60" strokeWidth="0.8" />
                  {/* White Fragrant Blossom Dots */}
                  <circle cx="160" cy="120" r="1.5" fill="#fdfdfd" />
                  <circle cx="174" cy="116" r="1.5" fill="#fdfdfd" />
                  <circle cx="182" cy="122" r="1.5" fill="#fdfdfd" />
                  <circle cx="168" cy="110" r="1.5" fill="#fdfdfd" />
                </g>

                {/* Hinged Traditional Mortise Doors (4 Cánh Cối) */}
                <g>
                  {/* Left Door swinging out */}
                  <path
                    d={`M 118 78 L ${118 - (doorAngle / 90) * 22} ${82 + (doorAngle / 90) * 4} L ${118 - (doorAngle / 90) * 22} ${168 + (doorAngle / 90) * 2} L 118 168 Z`}
                    fill="#3b2612"
                    stroke="#5e3e1e"
                    strokeWidth="1.2"
                  />
                  {/* Right Door swinging out */}
                  <path
                    d={`M 222 78 L ${222 + (doorAngle / 90) * 22} ${82 + (doorAngle / 90) * 4} L ${222 + (doorAngle / 90) * 22} ${168 + (doorAngle / 90) * 2} L 222 168 Z`}
                    fill="#3b2612"
                    stroke="#5e3e1e"
                    strokeWidth="1.2"
                  />
                </g>

                {/* Curving Ancient Curved Roof */}
                <path
                  d="M 68 76 C 110 68, 140 50, 170 42 C 200 50, 230 68, 272 76 C 255 72, 170 65, 68 76 Z"
                  fill="url(#guRoofGrad)"
                  stroke="#704b25"
                  strokeWidth="1.5"
                />
                <path
                  d="M 85 68 C 125 58, 150 44, 170 36 C 190 44, 215 58, 255 68 Z"
                  fill="#2b1a0d"
                  stroke="#573718"
                  strokeWidth="1"
                />
                {/* Roof Ridge Pinnacle */}
                <polygon points="167,36 173,36 170,22" fill="#c49b38" stroke="#e0b943" strokeWidth="0.8" />
              </svg>

              {/* Status Overlay */}
              <div className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 text-[11px] font-mono text-[#7ec298] backdrop-blur-sm">
                Nhiệt Hạ: {tempReduction}°C | Gió: {windVelocity} m/s | Cửa: {doorAngle}°
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => setIsMoatFlowing(!isMoatFlowing)}
                  className={`rounded border px-2.5 py-1 text-xs transition-all ${
                    isMoatFlowing
                      ? 'border-[#7ec298] bg-[#7ec298]/20 text-[#7ec298]'
                      : 'border-[#555] bg-[#1a1a1a] text-[#888]'
                  }`}
                >
                  {isMoatFlowing ? 'Hào Sen Đang Lưu Thông' : 'Dừng Lưu Dòng'}
                </button>
              </div>
            </div>

            {/* Solfeggio 528Hz Meditation Audio Chime */}
            <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-[#2a382f] bg-[#131b16]/70 p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#7ec298]/40 ${soundEnabled ? 'bg-[#7ec298]/30 animate-pulse' : 'bg-[#1a251f]'}`}>
                  <span className="text-base text-[#7ec298]">♪</span>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-[#dce4df]">Thanh Tịnh Cảnh Thủy Đình 528Hz</h4>
                  <p className="text-[11px] text-[#819488]">Tần số phục hồi sinh học hòa quyện vi khí hậu sông nước</p>
                </div>
              </div>

              <button
                onClick={toggleSound}
                className={`rounded-lg border px-3.5 py-1.5 text-xs font-mono transition-all ${
                  soundEnabled
                    ? 'border-[#7ec298] bg-[#7ec298]/20 text-[#a3e5bf]'
                    : 'border-[#3d4f43] bg-[#19241d] text-[#a0b0a6] hover:border-[#7ec298]'
                }`}
              >
                {soundEnabled ? 'Đang Ngân Âm 528Hz' : 'Khởi Động Âm Thanh'}
              </button>
            </div>
          </div>

          {/* Controls & Architecture Specs (5 cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-[#273229] bg-[#111613] p-6">
              <h3 className="mb-4 text-lg font-light text-[#f0f3ee]">Điều Khiển Vi Khí Hậu & Kiến Trúc</h3>

              {/* Door Angle Controller */}
              <div className="mb-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#96a39a]">Độ Mở Cửa Cối Gỗ Gụ Mật (0° - 90°)</span>
                  <span className="font-mono text-[#7ec298]">{doorAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={doorAngle}
                  onChange={(e) => setDoorAngle(parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#223126] accent-[#7ec298]"
                />
                <p className="text-[11px] text-[#6e7d73]">
                  Hệ cửa cối mộng nêm truyền thống không bản lề kim loại, tự bôi trơn bằng tinh dầu gỗ gụ mật và sáp ong tự nhiên.
                </p>
              </div>

              {/* Pedestal Rotation Controller */}
              <div className="mb-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#96a39a]">Bệ Xoay Bonsai Mai Chiếu Thủy 360°</span>
                  <span className="font-mono text-[#d6b052]">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#332b18] accent-[#d6b052]"
                />
                <p className="text-[11px] text-[#7a7465]">
                  Xoay chuyển 360 độ góc thưởng ngoạn Bonsai Mai Chiếu Thủy 310 năm dáng Phượng Vũ theo hướng ánh sáng mặt trời.
                </p>
              </div>

              {/* Technical Specifications List */}
              <div className="space-y-2.5 border-t border-[#1e2921] pt-4 text-xs text-[#a2aba4]">
                <div className="flex justify-between">
                  <span className="text-[#6c7a70]">Chất liệu khung đình:</span>
                  <span className="font-medium text-[#c5cec8]">Gỗ Gụ Mật Nam Bộ 295 năm tuổi tẩm sấy bí truyền</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6c7a70]">Vật phẩm Bonsai:</span>
                  <span className="font-medium text-[#d6b052]">Mai Chiếu Thủy Cổ Thụ 310 năm hoa trắng thơm ngát</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6c7a70]">Hào sinh thái:</span>
                  <span className="font-medium text-[#7ec298]">Hào nước sen Bách Diệp rộng 2.0m hạ nhiệt -8.2°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6c7a70]">Liên kết mộc truyền:</span>
                  <span className="font-medium text-[#c5cec8]">Mộng nêm khóa then cài âm dương 100% không đinh sắt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6c7a70]">Mái ngói cổ truyền:</span>
                  <span className="font-medium text-[#c5cec8]">Ngói âm dương men ngọc gốm nung thủ công 3 lớp</span>
                </div>
              </div>
            </div>

            {/* GuHomes Atelier Callout */}
            <div className="rounded-2xl border border-[#3b3524] bg-[#1a1711]/60 p-5 backdrop-blur-sm">
              <h4 className="text-xs font-semibold tracking-wider text-[#d6b052]">GUHOMES KIẾN TRÚC VI KHÍ HẬU & THỦ CÔNG MỘC GIA TRUYỀN</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#b4ad9c]">
                Mỗi công trình Thủy Đình đều được KTS Trưởng đo đạc vi khí hậu thực địa, tính toán hướng gió Tây Nam và thủy triều kênh rạch.
                Cam kết trần 12 công trình/năm tại xưởng Thạnh Xuân 1.200m².
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#898172]">Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="font-mono font-medium text-[#d6b052] hover:underline">
                  0368 757 916
                </a>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className="text-[#898172]">Email Độc Bản:</span>
                <span className="font-mono text-[#c5c0b2]">guhomesvn@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedGuBonsaiMoatPavilion
