'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV12() {
  const [hingeAngle, setHingeAngle] = useState(40) // 0 to 65 degrees
  const [isAudioHarmonics, setIsAudioHarmonics] = useState(false)
  const [selectedBonsai, setSelectedBonsai] = useState<'kheGan' | 'tungCoThu' | 'daBupDo'>('kheGan')
  const [rotationDegree, setRotationDegree] = useState(140)
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
    kheGan: {
      name: 'Khế Gân Cổ Thụ 560 Năm (Cửu Phụng Triều Dương)',
      age: '560 năm tuổi',
      significance: 'Gân guốc cổ kính, hoa quả kết tụ tinh hoa trời đất, an định gia phong viên mãn.',
      coolingDelta: '-13.2°C',
      windVelocity: '7.2 m/s',
      ambientHumidity: '50% RH'
    },
    tungCoThu: {
      name: 'Tùng Cổ Thụ 555 Năm (Tùng Bách Trường Xuân)',
      age: '555 năm tuổi',
      significance: 'Khí tiết hiên ngang trước gió sương sông nước, trường tồn ngàn năm.',
      coolingDelta: '-13.1°C',
      windVelocity: '7.1 m/s',
      ambientHumidity: '50% RH'
    },
    daBupDo: {
      name: 'Đa Búp Đỏ Cổ Thụ 550 Năm (Phụ Tử Tương Tùy)',
      age: '550 năm tuổi',
      significance: 'Che chở bình an, kết nối các thế hệ, sinh sôi trường vượng.',
      coolingDelta: '-13.0°C',
      windVelocity: '7.0 m/s',
      ambientHumidity: '50% RH'
    }
  }

  const activeBonsai = bonsaiProfiles[selectedBonsai]

  return (
    <section className="relative my-12 overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#131710] via-[#0E120B] to-[#080B06] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      {/* Decorative Traditional Border Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#D4AF37]/20 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-medium text-[#E5D5AA] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Kỹ Nghệ Thủy Đình Hoàng Gia Sài Gòn · Thế Hệ V12</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#F8F5EE] tracking-wide">
            Thủy Đình Trầm Hương Rừng Tự Nhiên 550 Năm & Hào Sen Khế Gân 560 Năm
          </h3>
          <p className="text-xs sm:text-sm text-[#A09882] mt-1 max-w-2xl">
            Cấu trúc mộng chốt gỗ Trầm Hương Rừng tự nhiên Khánh Hòa cổ thụ, hệ 4 cánh cối lam chớp mở 180° đón gió sông Sài Gòn 7.2 m/s, hào nước bonsai tuần hoàn lọc sinh học bazan giảm nhiệt -13.2°C.
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
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#182014]/60 to-[#0A0E08]/90 border border-[#D4AF37]/20 overflow-hidden min-h-[360px]">
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
                <linearGradient id="agarwoodGradV12" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A1B0E" />
                  <stop offset="50%" stopColor="#4A3525" />
                  <stop offset="100%" stopColor="#1E130A" />
                </linearGradient>
                <linearGradient id="goldHingeV12" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#F3E5AB" />
                </linearGradient>
                <linearGradient id="moatWaterV12" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#134E4A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#042F2E" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Moat Water Base */}
              <ellipse cx="200" cy="245" rx="180" ry="42" fill="url(#moatWaterV12)" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="4 2" />
              
              {/* Stone Pedestal */}
              <polygon points="120,230 280,230 290,250 110,250" fill="#262E22" stroke="#D4AF37" strokeWidth="1" />

              {/* Central Agarwood Pillar Structure */}
              <rect x="140" y="110" width="16" height="120" rx="3" fill="url(#agarwoodGradV12)" stroke="#D4AF37" strokeWidth="0.8" />
              <rect x="244" y="110" width="16" height="120" rx="3" fill="url(#agarwoodGradV12)" stroke="#D4AF37" strokeWidth="0.8" />
              <rect x="192" y="105" width="16" height="125" rx="3" fill="url(#agarwoodGradV12)" stroke="#D4AF37" strokeWidth="0.8" />

              {/* Curved Imperial Curved Roof */}
              <path
                d="M 60,115 Q 200,60 340,115 Q 310,95 200,80 Q 90,95 60,115 Z"
                fill="url(#agarwoodGradV12)"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <path d="M 120,85 Q 200,65 280,85" stroke="#F3E5AB" strokeWidth="1" fill="none" />

              {/* Hinged Traditional Doors (Rotated based on slider) */}
              <g style={{ transformOrigin: '140px 170px', transform: `rotate(${-hingeAngle * 0.4}deg)`, transition: 'transform 0.3s ease-out' }}>
                <rect x="100" y="125" width="40" height="95" rx="2" fill="#3D2B1F" stroke="#D4AF37" strokeWidth="1" />
                <line x1="108" y1="135" x2="132" y2="135" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="108" y1="150" x2="132" y2="150" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="108" y1="165" x2="132" y2="165" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="108" y1="180" x2="132" y2="180" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="108" y1="195" x2="132" y2="195" stroke="#D4AF37" strokeWidth="0.8" />
                <circle cx="106" cy="172" r="3" fill="url(#goldHingeV12)" />
              </g>

              <g style={{ transformOrigin: '260px 170px', transform: `rotate(${hingeAngle * 0.4}deg)`, transition: 'transform 0.3s ease-out' }}>
                <rect x="260" y="125" width="40" height="95" rx="2" fill="#3D2B1F" stroke="#D4AF37" strokeWidth="1" />
                <line x1="268" y1="135" x2="292" y2="135" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="268" y1="150" x2="292" y2="150" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="268" y1="165" x2="292" y2="165" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="268" y1="180" x2="292" y2="180" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="268" y1="195" x2="292" y2="195" stroke="#D4AF37" strokeWidth="0.8" />
                <circle cx="294" cy="172" r="3" fill="url(#goldHingeV12)" />
              </g>

              {/* Rotating Bonsai Platform on Right Side of Moat */}
              <g style={{ transformOrigin: '320px 225px', transform: `rotate(${rotationDegree * 0.1}deg)`, transition: 'transform 0.2s ease-out' }}>
                <ellipse cx="320" cy="225" rx="28" ry="10" fill="#3F301D" stroke="#D4AF37" strokeWidth="1" />
                {/* Bonsai Trunk & Foliage */}
                <path d="M 318,220 Q 312,185 324,165 Q 328,150 318,140" stroke="#5A3D28" strokeWidth="6" fill="none" strokeLinecap="round" />
                <circle cx="316" cy="138" r="14" fill="#2D5A27" opacity="0.9" />
                <circle cx="330" cy="148" r="12" fill="#3A6B35" opacity="0.85" />
                <circle cx="306" cy="155" r="10" fill="#1E431B" opacity="0.9" />
              </g>

              {/* Water Ripples & Lotus Blooms */}
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
                  onClick={() => setSelectedBonsai('kheGan')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedBonsai === 'kheGan'
                      ? 'bg-[#D4AF37] text-[#0A0D07] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#1C2518] text-[#D8D2C2] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Khế Gân 560N
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBonsai('tungCoThu')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedBonsai === 'tungCoThu'
                      ? 'bg-[#D4AF37] text-[#0A0D07] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#1C2518] text-[#D8D2C2] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Tùng 555N
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBonsai('daBupDo')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedBonsai === 'daBupDo'
                      ? 'bg-[#D4AF37] text-[#0A0D07] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#1C2518] text-[#D8D2C2] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Đa Búp Đỏ 550N
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

export default SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV12
