'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV11() {
  const [hingeAngle, setHingeAngle] = useState(38) // 0 to 65 degrees
  const [isAudioHarmonics, setIsAudioHarmonics] = useState(false)
  const [selectedBonsai, setSelectedBonsai] = useState<'kheGan' | 'tungCoThu' | 'daBupDo'>('kheGan')
  const [rotationDegree, setRotationDegree] = useState(135)
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

  // Thermal delta calculation based on hinge angle & misting
  const coolingDegree = (10.2 + (hingeAngle / 65) * 2.6 + (isMistActive ? 0.8 : 0)).toFixed(1)
  const windVelocity = (4.2 + (hingeAngle / 65) * 2.6).toFixed(1)
  const relativeHumidity = (37 + (isMistActive ? 3 : 0)).toFixed(0)

  return (
    <section className="relative w-full bg-[#080907] text-[#EDEAE2] py-20 px-4 sm:px-6 lg:px-12 border-b border-[#D4AF37]/25 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-gradient-to-b from-[#1C2618]/30 via-[#0B1209]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Badge & Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 text-xs uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/40 rounded-full mb-3 bg-[#161A12]/80">
            <span>Kiệt Tác Thủy Đình Ven Sông Sài Gòn · Thế Hệ V11</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#F6F4EE] mb-4">
            Thủy Đình Cửa Bản Lề Gỗ Trầm Hương Rừng 530 Năm
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#BFB9A8] font-light leading-relaxed">
            Quy tụ tinh hoa gỗ Trầm Hương Rừng Cổ Thụ Khánh Hòa trên năm thế kỷ trầm tích đại ngàn thơm ngát thanh tịnh,
            kết hợp hệ hào nước sinh thái và tác phẩm Bonsai Khế Gân 540 năm ngự lãm ven rạch Sài Gòn.
          </p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Architectural Visualizer / Canvas Frame */}
          <div className="lg:col-span-7 bg-[#121610]/90 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#A09882] block">Cơ Cấu Bản Lề Gập Chữ V</span>
                <span className="text-lg font-serif text-[#D4AF37]">Góc Mở Cửa Hiện Tại: {hingeAngle}° / 65°</span>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-[#A09882] block">Hạ Nhiệt Vi Khí Hậu</span>
                <span className="text-lg font-mono text-[#5EEAD4]">-{coolingDegree}°C</span>
              </div>
            </div>

            {/* Pavilion Graphic Representation */}
            <div className="relative h-64 sm:h-80 w-full bg-[#0B0E09] rounded-xl border border-[#2B3524] flex items-center justify-center overflow-hidden">
              {/* Moat Water Ambient */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0F2417] via-[#0B1A12]/80 to-transparent opacity-85" />

              {/* Misting Particle Overlay */}
              {isMistActive && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#5EEAD4]/10 via-transparent to-transparent pointer-events-none animate-pulse" />
              )}

              {/* Pavilion Structural Frame */}
              <div className="relative z-10 w-48 sm:w-60 h-40 sm:h-52 border-t-4 border-[#D4AF37] border-x border-[#8A7635]/60 flex flex-col justify-between p-4 bg-gradient-to-b from-[#1C2417]/80 to-transparent">
                {/* Roof curved rafters */}
                <div className="w-full flex justify-between items-center text-[10px] text-[#A69C80] font-mono border-b border-[#3E4C33] pb-1">
                  <span>MÁI LƯU LY NGŨ SẮC</span>
                  <span>530 NĂM</span>
                </div>

                {/* Animated Hinged Doors */}
                <div className="flex justify-around items-end h-28">
                  {/* Left Door Leaf */}
                  <motion.div
                    animate={{ rotateY: -hingeAngle }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    style={{ transformOrigin: 'left center' }}
                    className="w-14 sm:w-16 h-24 bg-[#332214] border-2 border-[#D4AF37]/70 rounded-xs relative flex items-center justify-center shadow-lg"
                  >
                    <div className="absolute inset-1 border border-[#D4AF37]/30" />
                    <span className="text-[9px] text-[#D4AF37]/80 font-serif rotate-90">TRẦM HƯƠNG</span>
                  </motion.div>

                  {/* Right Door Leaf */}
                  <motion.div
                    animate={{ rotateY: hingeAngle }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    style={{ transformOrigin: 'right center' }}
                    className="w-14 sm:w-16 h-24 bg-[#332214] border-2 border-[#D4AF37]/70 rounded-xs relative flex items-center justify-center shadow-lg"
                  >
                    <div className="absolute inset-1 border border-[#D4AF37]/30" />
                    <span className="text-[9px] text-[#D4AF37]/80 font-serif -rotate-90">KHÁNH HÒA</span>
                  </motion.div>
                </div>

                {/* Canal Water Ripple */}
                <div className="w-full text-center text-[10px] font-mono text-[#5EEAD4]/80 tracking-wider">
                  HÀO BÁCH THẢO · GIÓ {windVelocity} m/s
                </div>
              </div>
            </div>

            {/* Slider Control for Hinge Angle */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-[#D8D2C2]">
                <span>Đóng Kín (0°)</span>
                <span className="text-[#D4AF37] font-medium">Điều Chỉnh Bản Lề Cối: {hingeAngle}°</span>
                <span>Đại Khai Nghinh Phong (65°)</span>
              </div>
              <input
                type="range"
                min="0"
                max="65"
                value={hingeAngle}
                onChange={(e) => setHingeAngle(Number(e.target.value))}
                className="w-full h-2 bg-[#232B1E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                aria-label="Điều chỉnh góc mở bản lề thủy đình"
              />
            </div>
          </div>

          {/* Environmental Telemetry & Masterpiece Details */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#121610] border border-[#D4AF37]/25 rounded-xl p-4">
                <span className="text-[11px] uppercase tracking-wider text-[#A09882] block">Vận Tốc Gió Tầng Thấp</span>
                <span className="text-xl sm:text-2xl font-serif text-[#F6F4EE]">{windVelocity} m/s</span>
                <span className="text-[10px] text-[#5EEAD4] block mt-1">Đối lưu rạch Sài Gòn</span>
              </div>
              <div className="bg-[#121610] border border-[#D4AF37]/25 rounded-xl p-4">
                <span className="text-[11px] uppercase tracking-wider text-[#A09882] block">Độ Ẩm Không Khí</span>
                <span className="text-xl sm:text-2xl font-serif text-[#F6F4EE]">{relativeHumidity}% RH</span>
                <span className="text-[10px] text-[#D4AF37] block mt-1">Cân bằng sinh thái</span>
              </div>
            </div>

            {/* Bonsai Curator Widget */}
            <div className="bg-[#121610] border border-[#D4AF37]/25 rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-medium">Bonsai Di Sản Tuyển Chọn</span>
                <span className="text-xs font-mono text-[#A09882]">Xoay 360° ({rotationDegree}°)</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setSelectedBonsai('kheGan')}
                  className={`min-h-[44px] px-2 py-2 text-xs rounded-lg border transition-all ${
                    selectedBonsai === 'kheGan'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F6F4EE] font-medium'
                      : 'border-[#2B3524] text-[#A09882] hover:border-[#D4AF37]/40'
                  }`}
                >
                  Khế Gân 540N
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBonsai('tungCoThu')}
                  className={`min-h-[44px] px-2 py-2 text-xs rounded-lg border transition-all ${
                    selectedBonsai === 'tungCoThu'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F6F4EE] font-medium'
                      : 'border-[#2B3524] text-[#A09882] hover:border-[#D4AF37]/40'
                  }`}
                >
                  Tùng Cổ Thụ 535N
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBonsai('daBupDo')}
                  className={`min-h-[44px] px-2 py-2 text-xs rounded-lg border transition-all ${
                    selectedBonsai === 'daBupDo'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F6F4EE] font-medium'
                      : 'border-[#2B3524] text-[#A09882] hover:border-[#D4AF37]/40'
                  }`}
                >
                  Đa Búp Đỏ 530N
                </button>
              </div>

              {/* Rotation Slider */}
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

export default SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV11
