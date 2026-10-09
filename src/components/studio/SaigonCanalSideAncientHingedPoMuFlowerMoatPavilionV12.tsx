'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV12() {
  const [hingeAngle, setHingeAngle] = useState(42) // 0 to 65 degrees
  const [isAudioHarmonics, setIsAudioHarmonics] = useState(false)
  const [selectedBonsai, setSelectedBonsai] = useState<'tungLaHan' | 'sanCoThu' | 'thongDo'>('tungLaHan')
  const [rotationDegree, setRotationDegree] = useState(145)
  const [isMistActive, setIsMistActive] = useState(true)

  // Web Audio Context & Nodes refs for thorough cleanup
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc432Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (osc528Ref.current) {
        try {
          osc528Ref.current.stop()
          osc528Ref.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (osc432Ref.current) {
        try {
          osc432Ref.current.stop()
          osc432Ref.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  const toggleSoundscape = () => {
    if (!isAudioHarmonics) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime) // Solfeggio 528Hz

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(432, ctx.currentTime) // Harmonic 432Hz

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc432Ref.current = osc2
        gainRef.current = gain
        setIsAudioHarmonics(true)
      } catch {
        setIsAudioHarmonics(false)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc432Ref.current?.stop()
            osc432Ref.current?.disconnect()
            setIsAudioHarmonics(false)
          }, 650)
        } catch {
          setIsAudioHarmonics(false)
        }
      } else {
        setIsAudioHarmonics(false)
      }
    }
  }

  const bonsaiProfiles = {
    tungLaHan: {
      name: 'Tùng La Hán Cổ Thụ 565 Năm (Thọ Bách Niên)',
      age: '565 năm tuổi',
      significance: 'Khí phách thanh cao uy vũ, trấn trạch hưng gia, xanh tươi quanh năm thích ứng nắng nhiệt đới.',
      coolingDelta: '-13.3°C',
      windVelocity: '7.3 m/s',
      ambientHumidity: '50% RH'
    },
    sanCoThu: {
      name: 'Sanh Cổ Thụ 560 Năm (Thập Toàn Bách Lộc)',
      age: '560 năm tuổi',
      significance: 'Rễ buông vững chãi tựa bàn thạch, sinh khí tràn đầy, đón trọn linh khí sông Sài Gòn.',
      coolingDelta: '-13.2°C',
      windVelocity: '7.2 m/s',
      ambientHumidity: '50% RH'
    },
    thongDo: {
      name: 'Thông Đỏ Cổ Thụ 555 Năm (Trường Thọ Vĩnh Cửu)',
      age: '555 năm tuổi',
      significance: 'Gỗ quý nghìn năm, ngát hương tinh dầu tự nhiên, thư thái an lạc gia đạo.',
      coolingDelta: '-13.1°C',
      windVelocity: '7.1 m/s',
      ambientHumidity: '50% RH'
    }
  }

  const activeBonsai = bonsaiProfiles[selectedBonsai]

  return (
    <section className="relative my-12 overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#141810] via-[#0D120A] to-[#070A05] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      {/* Decorative Traditional Border Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#D4AF37]/20 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-medium text-[#E5D5AA] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Kỹ Nghệ Thủy Đình Hoàng Gia Sài Gòn · Bản Thảo V12</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#F8F5EE] tracking-wide">
            Thủy Đình Pơ Mu Tây Bắc 555 Năm & Hào Sen Tùng La Hán 565 Năm
          </h3>
          <p className="text-xs sm:text-sm text-[#A09882] mt-1 max-w-2xl">
            Cấu trúc mộng chốt gỗ Pơ Mu Tây Bắc cổ thụ vân xoắn thơm ngát, hệ cánh cối bức bàn lật mở 180° đón gió sông 7.3 m/s, hào nước bonsai tuần hoàn lọc sinh học bazan hạ nhiệt -13.3°C, độ ẩm cân bằng 50% RH.
          </p>
        </div>

        {/* Micro-climate Live Dashboard Badge */}
        <div className="flex items-center space-x-3 bg-[#1A2215]/80 px-4 py-3 rounded-2xl border border-[#D4AF37]/20">
          <div className="text-right">
            <div className="text-[10px] text-[#A09882] uppercase tracking-wider font-mono">Hạ nhiệt vi khí hậu</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#5EEAD4]">{activeBonsai.coolingDelta}</div>
          </div>
          <div className="h-8 w-px bg-[#D4AF37]/20" />
          <div className="text-left">
            <div className="text-[10px] text-[#A09882] uppercase tracking-wider font-mono">Độ ẩm cân bằng</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#F8F5EE]">{activeBonsai.ambientHumidity}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Visual Architectural Simulation Canvas */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#182215]/60 to-[#0A0F08]/90 border border-[#D4AF37]/20 overflow-hidden min-h-[360px]">
          {/* Subtle Ambient Mist FX */}
          <AnimatePresence>
            {isMistActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.15, 0.35, 0.2] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-0 pointer-events-none bg-radial from-[#5EEAD4]/10 via-transparent to-transparent z-0"
              />
            )}
          </AnimatePresence>

          {/* Pavilion Architectural SVG Diagram */}
          <div className="relative z-10 w-full max-w-[420px] aspect-[4/3] flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="poMuGradV12" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8A5A2B" />
                  <stop offset="50%" stopColor="#B37D3E" />
                  <stop offset="100%" stopColor="#6E441E" />
                </linearGradient>
                <linearGradient id="goldHingePoMuV12" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#F3E5AB" />
                </linearGradient>
                <linearGradient id="moatWaterPoMuV12" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#115E59" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#042F2E" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Moat Water Base */}
              <ellipse cx="200" cy="245" rx="180" ry="42" fill="url(#moatWaterPoMuV12)" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="4 2" />
              
              {/* Stone Pedestal */}
              <polygon points="120,230 280,230 290,250 110,250" fill="#242D20" stroke="#D4AF37" strokeWidth="1" />

              {/* Central PoMu Pillar Structure */}
              <rect x="140" y="110" width="16" height="120" rx="3" fill="url(#poMuGradV12)" stroke="#D4AF37" strokeWidth="0.8" />
              <rect x="244" y="110" width="16" height="120" rx="3" fill="url(#poMuGradV12)" stroke="#D4AF37" strokeWidth="0.8" />
              <rect x="192" y="105" width="16" height="125" rx="3" fill="url(#poMuGradV12)" stroke="#D4AF37" strokeWidth="0.8" />

              {/* Curved Imperial Curved Roof */}
              <path
                d="M 60,115 Q 200,60 340,115 Q 310,95 200,80 Q 90,95 60,115 Z"
                fill="url(#poMuGradV12)"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <path d="M 120,85 Q 200,65 280,85" stroke="#F3E5AB" strokeWidth="1" fill="none" />

              {/* Hinged Traditional Doors */}
              <g style={{ transformOrigin: '140px 170px', transform: `rotate(${-hingeAngle * 0.4}deg)`, transition: 'transform 0.3s ease-out' }}>
                <rect x="100" y="125" width="40" height="95" rx="2" fill="#5C3B1B" stroke="#D4AF37" strokeWidth="1" />
                <line x1="108" y1="135" x2="132" y2="135" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="108" y1="150" x2="132" y2="150" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="108" y1="165" x2="132" y2="165" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="108" y1="180" x2="132" y2="180" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="108" y1="195" x2="132" y2="195" stroke="#D4AF37" strokeWidth="0.8" />
                <circle cx="106" cy="172" r="3" fill="url(#goldHingePoMuV12)" />
              </g>

              <g style={{ transformOrigin: '260px 170px', transform: `rotate(${hingeAngle * 0.4}deg)`, transition: 'transform 0.3s ease-out' }}>
                <rect x="260" y="125" width="40" height="95" rx="2" fill="#5C3B1B" stroke="#D4AF37" strokeWidth="1" />
                <line x1="268" y1="135" x2="292" y2="135" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="268" y1="150" x2="292" y2="150" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="268" y1="165" x2="292" y2="165" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="268" y1="180" x2="292" y2="180" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="268" y1="195" x2="292" y2="195" stroke="#D4AF37" strokeWidth="0.8" />
                <circle cx="294" cy="172" r="3" fill="url(#goldHingePoMuV12)" />
              </g>

              {/* Rotating Bonsai Platform on Right Side */}
              <g style={{ transformOrigin: '320px 225px', transform: `rotate(${rotationDegree * 0.1}deg)`, transition: 'transform 0.2s ease-out' }}>
                <ellipse cx="320" cy="225" rx="28" ry="10" fill="#3D2E1B" stroke="#D4AF37" strokeWidth="1" />
                <path d="M 318,220 Q 310,180 322,160 Q 326,145 316,135" stroke="#5A3D28" strokeWidth="6" fill="none" strokeLinecap="round" />
                <circle cx="314" cy="132" r="14" fill="#1E4D2B" opacity="0.9" />
                <circle cx="328" cy="142" r="12" fill="#2E6B3B" opacity="0.85" />
                <circle cx="304" cy="150" r="10" fill="#143D1F" opacity="0.9" />
              </g>

              {/* Lotus Blossoms */}
              <circle cx="160" cy="248" r="4" fill="#F472B6" />
              <circle cx="230" cy="252" r="3.5" fill="#F472B6" />
              <circle cx="190" cy="256" r="3" fill="#FB7185" />
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between w-full text-xs text-[#A09882] z-10 px-2">
            <span>Góc mở bức bàn: <strong className="text-[#D4AF37]">{hingeAngle}°</strong></span>
            <span>Hướng xoay Bonsai: <strong className="text-[#5EEAD4]">{rotationDegree}°</strong></span>
            <span>Vận tốc gió sông: <strong className="text-[#F8F5EE]">{activeBonsai.windVelocity}</strong></span>
          </div>
        </div>

        {/* Interactive Controls & Specifications Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#151C12]/90 rounded-2xl p-5 border border-[#D4AF37]/20 space-y-4">
            <h4 className="text-sm font-semibold text-[#E5D5AA] tracking-wide uppercase">
              Tùy Biến Thủy Đình & Vi Khí Hậu Ven Sông
            </h4>

            {/* Bonsai Selection Tabs */}
            <div>
              <label className="text-xs text-[#A09882] block mb-2 font-medium">Chọn Thế Bonsai Thủy Hào:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBonsai('tungLaHan')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedBonsai === 'tungLaHan'
                      ? 'bg-[#D4AF37] text-[#0A0D07] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#1C2518] text-[#D8D2C2] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Tùng La Hán 565N
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBonsai('sanCoThu')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedBonsai === 'sanCoThu'
                      ? 'bg-[#D4AF37] text-[#0A0D07] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#1C2518] text-[#D8D2C2] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Sanh Cổ Thụ 560N
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBonsai('thongDo')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedBonsai === 'thongDo'
                      ? 'bg-[#D4AF37] text-[#0A0D07] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#1C2518] text-[#D8D2C2] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Thông Đỏ 555N
                </button>
              </div>
              <p className="text-[11px] text-[#A09882] mt-2 italic leading-relaxed">
                {activeBonsai.significance}
              </p>
            </div>

            {/* Hinge Angle Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#D8D2C2] mb-1">
                <span>Góc Mở Cánh Cối Lam Chớp:</span>
                <span className="font-mono text-[#D4AF37] font-bold">{hingeAngle}° / 65°</span>
              </div>
              <input
                type="range"
                min="0"
                max="65"
                value={hingeAngle}
                onChange={(e) => setHingeAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-[#232B1E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                aria-label="Điều chỉnh góc mở cánh cối bức bàn"
              />
              <div className="flex justify-between text-[10px] text-[#716A58] mt-1">
                <span>Đóng chắn giông gió (0°)</span>
                <span>Mở tối đa đón gió sông (65°)</span>
              </div>
            </div>

            {/* Bonsai Sunlight Rotation Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#D8D2C2] mb-1">
                <span>Xoay Bệ Bonsai Đón Quang Phổ:</span>
                <span className="font-mono text-[#5EEAD4] font-bold">{rotationDegree}°</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-[#A09882]">0°</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotationDegree}
                  onChange={(e) => setRotationDegree(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#232B1E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  aria-label="Xoay hướng đón quang phổ bonsai"
                />
                <span className="text-xs text-[#A09882]">360°</span>
              </div>
            </div>

            {/* Interactive Control Toggles */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={toggleSoundscape}
                className={`min-h-[44px] flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isAudioHarmonics
                    ? 'border-[#5EEAD4] bg-[#5EEAD4]/15 text-[#5EEAD4] shadow-md shadow-[#5EEAD4]/10'
                    : 'border-[#D4AF37]/40 bg-[#151A12] text-[#D8D2C2] hover:border-[#D4AF37]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                <span>{isAudioHarmonics ? 'Hòa Âm 528Hz Đang Ngân' : 'Kích Hoạt Hòa Âm 528Hz & 432Hz'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMistActive(!isMistActive)}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isMistActive
                    ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-[#38BDF8]'
                    : 'border-[#2B3524] bg-[#151A12] text-[#A09882] hover:border-[#38BDF8]/40'
                }`}
              >
                {isMistActive ? 'Phun Sương Nano: BẬT' : 'Phun Sương Nano: TẮT'}
              </button>
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#A09882]">
              <span>Tư vấn KTS Trưởng:</span>
              <a href="tel:0368757916" className="text-[#D4AF37] hover:underline font-mono font-medium">
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV12
