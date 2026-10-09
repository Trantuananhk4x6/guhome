'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PavilionSpec {
  timberAge: string
  bonsaiAge: string
  temperatureReduction: string
  relativeHumidity: string
  airflowVelocity: string
  acousticFrequency: string
}

const SPEC: PavilionSpec = {
  timberAge: '510 năm (Gỗ Trầm Hương Rừng Cổ Thụ Khánh Hòa Tinh Dầu Ngào Ngạt Tự Nhiên)',
  bonsaiAge: '520 năm (Bonsai Khế Gân Cổ Thụ Dáng Trực Quân Tử Nghinh Phong Bách Niên)',
  temperatureReduction: '-12.4°C (Thủy nhiệt vi khí hậu ven rạch Sài Gòn luân chuyển tầng thấp)',
  relativeHumidity: '39% - 43% RH (Điều ẩm tự nhiên qua hào hoa súng tím biếc ngũ sắc)',
  airflowVelocity: '6.4 m/s (Gió đối lưu ven sông Sài Gòn tuần hoàn qua hệ cửa bức bàn gập)',
  acousticFrequency: '528Hz & 432Hz (Thanh âm thiền trà kép Solfeggio hòa âm tĩnh tại)',
}

export function SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV10() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(360)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [activeMoatLevel, setActiveMoatLevel] = useState<'low' | 'balanced' | 'high'>('balanced')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const oscHarmonicRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop()
          oscRef.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (oscHarmonicRef.current) {
        try {
          oscHarmonicRef.current.stop()
          oscHarmonicRef.current.disconnect()
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

  const toggleAcoustic = () => {
    if (!isAudioPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(432, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        oscRef.current = osc1
        oscHarmonicRef.current = osc2
        gainRef.current = gain
        setIsAudioPlaying(true)
      } catch {
        setIsAudioPlaying(false)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8)
          setTimeout(() => {
            if (oscRef.current) {
              oscRef.current.stop()
              oscRef.current.disconnect()
            }
            if (oscHarmonicRef.current) {
              oscHarmonicRef.current.stop()
              oscHarmonicRef.current.disconnect()
            }
            setIsAudioPlaying(false)
          }, 850)
        } catch {
          setIsAudioPlaying(false)
        }
      } else {
        setIsAudioPlaying(false)
      }
    }
  }

  return (
    <section className="relative w-full bg-[#080806] text-[#E8E4DA] py-20 px-4 sm:px-6 lg:px-12 border-y border-[#D4AF37]/20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-gradient-to-br from-[#D4AF37]/15 via-transparent to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/40 rounded-full mb-3">
            Kiệt Tác Thủy Đình & Hào Nước Bách Thảo V10 · GuHomes
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F4F1EA] tracking-wide mb-4">
            Thủy Đình Trầm Hương 510 Năm & Hào Bonsai Khế Gân Cổ Thụ 520 Năm
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#B0AA9B] leading-relaxed">
            Hạ giải nhiệt tự nhiên -12.4°C ven rạch Sài Gòn, giao thoa hương thơm Trầm Hương rừng Khánh Hòa cùng thanh âm thiền trà 528Hz & 432Hz. Thiết kế độc bản giới hạn 12 công trình/năm bởi GuHomes.
          </p>
        </div>

        {/* Interactive Controls & Pavilion Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Visual Presentation Area */}
          <div className="lg:col-span-7 bg-[#11110C] border border-[#D4AF37]/25 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D4AF37]/20">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-[#A09885]">Vi Khí Hậu Ven Rạch Sài Gòn</span>
              </div>
              <span className="text-xs text-[#D4AF37] font-mono">Tỷ lệ Lỗ Ban: 42.9cm (Tài Đức)</span>
            </div>

            {/* Pavilion Graphic Scene */}
            <div className="relative h-72 sm:h-84 flex items-center justify-center bg-gradient-to-b from-[#181812] to-[#0A0A06] rounded-xl overflow-hidden border border-[#D4AF37]/15">
              {/* Simulated Canal Moat Water */}
              <motion.div
                animate={{
                  y: activeMoatLevel === 'high' ? [0, -3, 0] : activeMoatLevel === 'low' ? [0, 2, 0] : [0, -1.5, 0],
                  opacity: [0.65, 0.85, 0.65],
                }}
                transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0C2A20]/70 via-[#103D30]/40 to-transparent"
              />

              {/* Water Lily Lotus Pads */}
              <div className="absolute bottom-4 left-6 flex space-x-3 opacity-70">
                <span className="w-6 h-3 rounded-full bg-[#1B4D3E] border border-[#2EE59D]/40 inline-block transform -rotate-12" />
                <span className="w-8 h-4 rounded-full bg-[#1B4D3E] border border-[#2EE59D]/40 inline-block transform rotate-6" />
                <span className="w-5 h-2.5 rounded-full bg-[#1B4D3E] border border-[#2EE59D]/40 inline-block" />
              </div>
              <div className="absolute bottom-5 right-8 flex space-x-2 opacity-65">
                <span className="w-7 h-3 rounded-full bg-[#1B4D3E] border border-[#2EE59D]/30 inline-block transform rotate-12" />
                <span className="w-5 h-2.5 rounded-full bg-[#1B4D3E] border border-[#2EE59D]/30 inline-block transform -rotate-6" />
              </div>

              {/* Pavilion Structural Arch */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Traditional Eaves Curve */}
                <div className="relative w-56 sm:w-68 h-10 border-b-2 border-[#D4AF37] flex items-end justify-center">
                  <div className="absolute -top-3 w-64 sm:w-76 h-6 border-t-2 border-[#D4AF37]/60 rounded-[50%]" />
                  <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase mb-1">Mái Ngói Âm Dương Rêu Phong</span>
                </div>

                {/* Agarwood Timber Posts and Hinged Windows */}
                <div className="w-48 sm:w-60 h-32 sm:h-36 border-x-4 border-[#6E432A] relative flex justify-between px-2 pt-2 bg-[#211B14]/40 backdrop-blur-sm">
                  {/* Hinged Panels Left & Right */}
                  <motion.div
                    animate={{ rotateY: isOpenHinged ? 65 : 0 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    className="w-16 sm:w-20 h-full border border-[#D4AF37]/50 bg-[#342416]/80 flex flex-col justify-around p-1 shadow-lg"
                  >
                    <div className="w-full h-1/4 border-b border-[#D4AF37]/30 flex items-center justify-center text-[9px] text-[#A69B88]">Trầm Hương</div>
                    <div className="w-full h-1/4 border-b border-[#D4AF37]/30" />
                    <div className="w-full h-1/4" />
                  </motion.div>

                  {/* Center Tea Space & 520-Year-Old Carambola Bonsai */}
                  <div className="flex-1 flex flex-col items-center justify-end pb-2">
                    <motion.div
                      animate={{ rotate: bonsaiRotation }}
                      transition={{ duration: 0.6 }}
                      className="cursor-pointer group flex flex-col items-center"
                      onClick={() => setBonsaiRotation(r => r + 45)}
                      title="Chạm để xoay thế cây Bonsai Khế Gân Cổ Thụ"
                    >
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#34D399] transition-transform duration-300 group-hover:scale-110">
                        {/* Bonsai Trunk */}
                        <path d="M24 42 C24 35 22 28 25 21 C28 16 31 14 33 11" stroke="#8B5A2B" strokeWidth="4" strokeLinecap="round" />
                        <path d="M24 28 C19 25 15 25 12 23" stroke="#8B5A2B" strokeWidth="3" strokeLinecap="round" />
                        {/* Foliage Clouds */}
                        <circle cx="33" cy="11" r="8" fill="#047857" opacity="0.9" />
                        <circle cx="28" cy="7" r="6" fill="#10B981" opacity="0.85" />
                        <circle cx="12" cy="22" r="7" fill="#065F46" opacity="0.9" />
                        <circle cx="15" cy="17" r="5" fill="#34D399" opacity="0.75" />
                        <circle cx="23" cy="15" r="6" fill="#059669" opacity="0.85" />
                        {/* Golden Fruit Accents */}
                        <circle cx="31" cy="14" r="2" fill="#FBBF24" />
                        <circle cx="26" cy="10" r="1.5" fill="#FBBF24" />
                        <circle cx="14" cy="25" r="2" fill="#FBBF24" />
                        {/* Ceramic Pot */}
                        <rect x="16" y="40" width="16" height="5" rx="1.5" fill="#B45309" stroke="#D4AF37" strokeWidth="1" />
                      </svg>
                      <span className="text-[9px] text-[#D4AF37] font-mono mt-0.5">Khế Gân 520Y</span>
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{ rotateY: isOpenHinged ? -65 : 0 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    className="w-16 sm:w-20 h-full border border-[#D4AF37]/50 bg-[#342416]/80 flex flex-col justify-around p-1 shadow-lg"
                  >
                    <div className="w-full h-1/4 border-b border-[#D4AF37]/30 flex items-center justify-center text-[9px] text-[#A69B88]">Bức Bàn</div>
                    <div className="w-full h-1/4 border-b border-[#D4AF37]/30" />
                    <div className="w-full h-1/4" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Interactive Switch Controls */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpenHinged(!isOpenHinged)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 text-xs font-medium rounded-lg border border-[#D4AF37]/40 bg-[#1A1812] hover:bg-[#252218] text-[#E8E4DA] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  {isOpenHinged ? 'Đóng Cửa Bức Bàn' : 'Mở Cửa Bức Bàn (Gấp Gọn)'}
                </button>
                <button
                  type="button"
                  onClick={() => setBonsaiRotation(r => r + 45)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 text-xs font-medium rounded-lg border border-[#34D399]/40 bg-[#0E1F18] hover:bg-[#152E24] text-[#A7F3D0] transition-colors focus:outline-none focus:ring-1 focus:ring-[#34D399]"
                >
                  Xoay Hướng Bonsai ({bonsaiRotation % 360}°)
                </button>
              </div>

              {/* Water Flow Depth Selector */}
              <div className="flex items-center space-x-1.5 bg-[#171610] p-1 rounded-lg border border-[#D4AF37]/20">
                <span className="text-[11px] text-[#8C8472] px-2">Mực nước hào:</span>
                {(['low', 'balanced', 'high'] as const).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setActiveMoatLevel(level)}
                    className={`min-h-[44px] min-w-[44px] px-3 py-1.5 text-xs rounded transition-all capitalize ${
                      activeMoatLevel === level
                        ? 'bg-[#D4AF37] text-[#0A0A06] font-semibold shadow'
                        : 'text-[#B0AA9B] hover:text-[#F4F1EA]'
                    }`}
                  >
                    {level === 'low' ? 'Tĩnh Lặng' : level === 'balanced' ? 'Lưu Thông' : 'Triều Cường'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Environmental Micro-climate Metrics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#12110D] border border-[#D4AF37]/25 rounded-2xl p-5 shadow-lg">
              <h3 className="text-base font-serif text-[#D4AF37] uppercase tracking-wide mb-3 pb-2 border-b border-[#D4AF37]/20 flex items-center justify-between">
                <span>Thông Số Vi Khí Hậu Ven Sông</span>
                <span className="text-xs font-mono font-normal text-[#9B9382]">GuHomes Engineering</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-start pb-2 border-b border-white/5">
                  <span className="text-[#8E8674]">Trầm Hương cổ thụ:</span>
                  <span className="text-right text-[#E8E4DA] font-medium max-w-[200px]">{SPEC.timberAge}</span>
                </div>
                <div className="flex justify-between items-start pb-2 border-b border-white/5">
                  <span className="text-[#8E8674]">Bonsai Khế Gân:</span>
                  <span className="text-right text-[#34D399] font-medium max-w-[200px]">{SPEC.bonsaiAge}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[#8E8674]">Hạ nhiệt thủy vi sinh:</span>
                  <span className="text-[#60A5FA] font-mono font-semibold">{SPEC.temperatureReduction}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[#8E8674]">Ẩm độ không khí:</span>
                  <span className="text-[#FBBF24] font-mono">{SPEC.relativeHumidity}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[#8E8674]">Vận tốc gió đối lưu:</span>
                  <span className="text-[#A78BFA] font-mono">{SPEC.airflowVelocity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8E8674]">Tần số thanh âm:</span>
                  <span className="text-[#D4AF37] font-mono">{SPEC.acousticFrequency}</span>
                </div>
              </div>

              {/* Acoustic Frequency Audio Button */}
              <div className="mt-5 pt-3 border-t border-[#D4AF37]/20">
                <button
                  type="button"
                  onClick={toggleAcoustic}
                  className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border flex items-center justify-center space-x-2 text-xs font-medium transition-all ${
                    isAudioPlaying
                      ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F5DF88] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                      : 'border-[#D4AF37]/35 bg-[#191710] hover:bg-[#232016] text-[#E0D9C8]'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>{isAudioPlaying ? 'Dừng Hòa Âm Thiền Trà 528Hz & 432Hz' : 'Phát Hòa Âm Thiền Trà 528Hz & 432Hz'}</span>
                </button>
              </div>
            </div>

            {/* Quiet Luxury Craftsmanship Note */}
            <div className="p-4 rounded-xl bg-[#0D0D09] border border-white/10 text-xs text-[#8E8777] leading-relaxed">
              <strong className="text-[#D4AF37] font-serif block mb-1">Quy Chuẩn Xưởng Thạnh Xuân 1.200m²:</strong>
              Mỗi thức mộng ngàm gỗ Trầm Hương 510 năm tuổi được gia công kín khít bằng tay, không dùng một chiếc đinh kim loại nào, lưu hương vương giả tự nhiên xua tan muộn phiền nơi tổ ấm.
            </div>
          </div>
        </div>

        {/* Footer Contact Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#11110C] border border-[#D4AF37]/20 text-xs text-[#9E9785] gap-3">
          <div>
            <span className="text-[#D4AF37] font-semibold">Tư Vấn Thiết Kế Thủy Đình Biệt Thự:</span> Liên hệ trực tiếp KTS Trưởng GuHomes qua hotline <a href="tel:0368757916" className="text-[#E8E4DA] underline hover:text-[#D4AF37] font-mono">0368 757 916</a> hoặc email <a href="mailto:guhomesvn@gmail.com" className="text-[#E8E4DA] underline hover:text-[#D4AF37]">guhomesvn@gmail.com</a>.
          </div>
          <span className="text-[#A49D8B] whitespace-nowrap">Định mức nghiêm ngặt 12 công trình/năm</span>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV10
