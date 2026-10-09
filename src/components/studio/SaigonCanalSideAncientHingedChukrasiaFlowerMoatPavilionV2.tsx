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

export function SaigonCanalSideAncientHingedChukrasiaFlowerMoatPavilionV2() {
  const [doorAngle, setDoorAngle] = useState<number>(60)
  const [rotationAngle, setRotationAngle] = useState<number>(145)
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
  const tempReduction = - (7.1 + (doorAngle / 90) * 1.2).toFixed(1)
  const windVelocity = (1.25 + (doorAngle / 90) * 0.8).toFixed(2)

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0c0a] py-28 text-[#ecebe2]">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#2f553c] blur-[130px]" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#99742f] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#41624c]/40 bg-[#111713] px-4 py-1.5 text-xs tracking-widest text-[#7ec298]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7ec298]" />
            THỦY ĐÌNH VEN KÊNH SÀI GÒN · HÀO SEN BÁCH DIỆP ĐỐI LƯU V2
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-light tracking-wide text-[#f5f3ec] md:text-5xl"
          >
            Thủy Đình Cửa Cối Gỗ Lát Hoa Tây Bắc 275 Năm & Hào Sen Sinh Thái
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#9ea39a] md:text-base"
          >
            Công trình thủy đình biệt phủ bên triền kênh sông Sài Gòn, kiến tạo từ cột kèo Gỗ Lát Hoa Tây Bắc (Chukrasia tabularis) 275 năm tuổi
            vân hoa cuộn sóng ánh kim óng ả. Hệ 4 cánh cối mộng nêm truyền thống mở rộng đón gió Tây Nam, kết hợp hào nước sen bách diệp rộng 2.05m
            hạ nhiệt vi khí hậu tự nhiên -8.3°C, quy tụ bệ xoay Bonsai Duyên Tùng 315 năm tuổi ngự lãm độc bản GuHomes.
          </motion.p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Visual Showcase (7 cols) */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2a322c] bg-[#111512]/80 p-8 backdrop-blur-md lg:col-span-7">
            {/* View Mode Selector */}
            <div className="mb-6 flex gap-2 rounded-lg bg-[#18201a] p-1 text-xs">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'architecture' ? 'bg-[#7ec298] text-[#09100c] font-medium' : 'text-[#8e958d] hover:text-white'
                }`}
              >
                Khung Cố Khí & Mộng Cối
              </button>
              <button
                onClick={() => setActiveTab('microclimate')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'microclimate' ? 'bg-[#7ec298] text-[#09100c] font-medium' : 'text-[#8e958d] hover:text-white'
                }`}
              >
                Khí Hậu Hào Sen -8.3°C
              </button>
              <button
                onClick={() => setActiveTab('bonsai')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'bonsai' ? 'bg-[#7ec298] text-[#09100c] font-medium' : 'text-[#8e958d] hover:text-white'
                }`}
              >
                Duyên Tùng Thác Đổ 315 Năm
              </button>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border border-[#222c25] bg-[#0a0d0b]">
              <svg width="340" height="230" viewBox="0 0 340 230" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="chukrasiaRoofGradV2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4a331c" />
                    <stop offset="50%" stopColor="#2e1d0e" />
                    <stop offset="100%" stopColor="#180e06" />
                  </linearGradient>
                  <linearGradient id="chukrasiaTimberGradV2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#694a28" />
                    <stop offset="50%" stopColor="#422b13" />
                    <stop offset="100%" stopColor="#241506" />
                  </linearGradient>
                  <linearGradient id="chukrasiaMoatWaterGradV2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#173424" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#2a573c" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#143121" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Moat Water Base */}
                <ellipse cx="170" cy="180" rx="146" ry="35" fill="url(#chukrasiaMoatWaterGradV2)" stroke="#3c6d4f" strokeWidth="1.2" />

                {/* Water Ripples */}
                {isMoatFlowing && (
                  <g className="animate-pulse opacity-60">
                    <ellipse cx="170" cy="180" rx="122" ry="27" fill="none" stroke="#66a17d" strokeWidth="0.8" strokeDasharray="6 4" />
                    <ellipse cx="170" cy="180" rx="92" ry="19" fill="none" stroke="#7ec298" strokeWidth="0.6" strokeDasharray="4 4" />
                  </g>
                )}

                {/* Lotus Flowers in Moat */}
                <circle cx="64" cy="177" r="4.5" fill="#f09db8" />
                <circle cx="276" cy="183" r="5" fill="#f09db8" />
                <circle cx="104" cy="194" r="3.8" fill="#f5bed0" />
                <circle cx="232" cy="191" r="4.2" fill="#f5bed0" />

                {/* Stone Plinth */}
                <polygon points="90,172 250,172 260,182 80,182" fill="#313934" stroke="#46524a" strokeWidth="1" />

                {/* Chukrasia Columns (Chukrasia tabularis 275 yrs) */}
                <rect x="108" y="75" width="10" height="97" rx="2" fill="url(#chukrasiaTimberGradV2)" stroke="#4a3118" strokeWidth="1" />
                <rect x="222" y="75" width="10" height="97" rx="2" fill="url(#chukrasiaTimberGradV2)" stroke="#4a3118" strokeWidth="1" />
                <rect x="138" y="80" width="8" height="92" rx="2" fill="url(#chukrasiaTimberGradV2)" stroke="#4a3118" strokeWidth="0.8" opacity="0.9" />
                <rect x="194" y="80" width="8" height="92" rx="2" fill="url(#chukrasiaTimberGradV2)" stroke="#4a3118" strokeWidth="0.8" opacity="0.9" />

                {/* Ancient Rotating Bonsai Pedestal on Plinth */}
                <g transform={`rotate(${rotationAngle}, 170, 142)`}>
                  <rect x="156" y="136" width="28" height="12" rx="3" fill="#2d1c0e" stroke="#7ec298" strokeWidth="1" />
                  <ellipse cx="170" cy="136" rx="16" ry="5" fill="#4d321d" />
                  {/* Duyen Tung Bonsai Foliage Clouds */}
                  <circle cx="160" cy="120" r="11" fill="#21422b" stroke="#356140" strokeWidth="0.8" />
                  <circle cx="180" cy="118" r="13" fill="#2a5136" stroke="#427650" strokeWidth="0.8" />
                  <circle cx="172" cy="110" r="9" fill="#325e3f" stroke="#4c875d" strokeWidth="0.8" />
                  {/* Cascading Branch */}
                  <path d="M 170 125 Q 192 135 198 145" stroke="#4a3118" strokeWidth="2" fill="none" />
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
                  fill="url(#chukrasiaRoofGradV2)"
                  stroke="#724c26"
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
            <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-[#28362d] bg-[#121a15]/70 p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#7ec298]/40 ${soundEnabled ? 'bg-[#7ec298]/30 animate-pulse' : 'bg-[#19241e]'}`}>
                  <span className="text-base text-[#7ec298]">♪</span>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-[#dbe3de]">Thanh Tịnh Cảnh Thủy Đình 528Hz</h4>
                  <p className="text-[11px] text-[#7f9286]">Tần số phục hồi sinh học hòa quyện vi khí hậu sông nước</p>
                </div>
              </div>

              <button
                onClick={toggleSound}
                className={`rounded-lg border px-3.5 py-1.5 text-xs font-mono transition-all ${
                  soundEnabled
                    ? 'border-[#7ec298] bg-[#7ec298]/20 text-[#a3e5bf]'
                    : 'border-[#3c4e42] bg-[#18231c] text-[#9fb0a5] hover:border-[#7ec298]'
                }`}
              >
                {soundEnabled ? 'Đang Ngân Âm 528Hz' : 'Khởi Động Âm Thanh'}
              </button>
            </div>
          </div>

          {/* Controls & Architecture Specs (5 cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-[#253027] bg-[#101512] p-6">
              <h3 className="mb-4 text-lg font-light text-[#eef2ec]">Điều Khiển Vi Khí Hậu & Kiến Trúc</h3>

              {/* Door Angle Controller */}
              <div className="mb-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#95a298]">Độ Mở Cửa Cối Gỗ Lát Hoa (0° - 90°)</span>
                  <span className="font-mono text-[#7ec298]">{doorAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={doorAngle}
                  onChange={(e) => setDoorAngle(parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#202f24] accent-[#7ec298]"
                />
                <p className="text-[11px] text-[#6c7b71]">
                  Hệ cửa cối mộng nêm truyền thống không bản lề kim loại, tự bôi trơn bằng tinh dầu gỗ lát hoa và sáp ong tự nhiên.
                </p>
              </div>

              {/* Pedestal Rotation Controller */}
              <div className="mb-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#95a298]">Bệ Xoay Bonsai Duyên Tùng 360°</span>
                  <span className="font-mono text-[#d6b052]">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#312916] accent-[#d6b052]"
                />
                <p className="text-[11px] text-[#787263]">
                  Xoay chuyển 360 độ góc thưởng ngoạn Bonsai Duyên Tùng 315 năm dáng Thác Đổ theo hướng ánh sáng mặt trời.
                </p>
              </div>

              {/* Technical Specifications List */}
              <div className="space-y-2.5 border-t border-[#1d2720] pt-4 text-xs text-[#a0a9a2]">
                <div className="flex justify-between">
                  <span className="text-[#6a786e]">Chất liệu khung đình:</span>
                  <span className="font-medium text-[#c3ccc6]">Gỗ Lát Hoa Tây Bắc 275 năm tuổi tẩm sấy bí truyền</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a786e]">Vật phẩm Bonsai:</span>
                  <span className="font-medium text-[#d6b052]">Duyên Tùng Thác Đổ 315 năm cổ thụ độc bản</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a786e]">Hào sinh thái:</span>
                  <span className="font-medium text-[#7ec298]">Hào nước sen Bách Diệp rộng 2.05m hạ nhiệt -8.3°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a786e]">Liên kết mộc truyền:</span>
                  <span className="font-medium text-[#c3ccc6]">Mộng nêm khóa then cài âm dương 100% không đinh sắt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a786e]">Mái ngói cổ truyền:</span>
                  <span className="font-medium text-[#c3ccc6]">Ngói âm dương men ngọc gốm nung thủ công 3 lớp</span>
                </div>
              </div>
            </div>

            {/* GuHomes Atelier Callout */}
            <div className="rounded-2xl border border-[#393322] bg-[#181510]/60 p-5 backdrop-blur-sm">
              <h4 className="text-xs font-semibold tracking-wider text-[#d6b052]">GUHOMES KIẾN TRÚC VI KHÍ HẬU & THỦ CÔNG MỘC GIA TRUYỀN</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#b2ab9a]">
                Mỗi công trình Thủy Đình đều được KTS Trưởng đo đạc vi khí hậu thực địa, tính toán hướng gió Tây Nam và thủy triều kênh rạch.
                Cam kết trần 12 công trình/năm tại xưởng Thạnh Xuân 1.200m².
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#877f70]">Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="font-mono font-medium text-[#d6b052] hover:underline">
                  0368 757 916
                </a>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className="text-[#877f70]">Email Độc Bản:</span>
                <span className="font-mono text-[#c3bea0]">guhomesvn@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedChukrasiaFlowerMoatPavilionV2
