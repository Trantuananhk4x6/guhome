'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV11() {
  const [hingeAngle, setHingeAngle] = useState(42) // 0 to 65 degrees
  const [isAudioHarmonics, setIsAudioHarmonics] = useState(false)
  const [selectedBonsai, setSelectedBonsai] = useState<'daBupDo' | 'locVung' | 'maiChieuThuy'>('daBupDo')
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

  // Bonsai profiles
  const bonsaiProfiles = {
    daBupDo: {
      title: 'Đa Búp Đỏ Cổ Thụ 550 Năm',
      posture: 'Thế Phụ Tử Tương Tùy - Trường Tồn Vững Chãi',
      tempReduction: '-13.0°C',
      humidityControl: '50% RH',
      windGuidance: '7.0 m/s',
      description: 'Lá bóng dày dặn lọc bụi mịn tuyệt đối, rễ khí sinh buông rủ trên hào nước hoa súng tạo cảnh sắc trầm mặc.',
    },
    locVung: {
      title: 'Lộc Vừng Hoa Đỏ Cổ Thụ 520 Năm',
      posture: 'Thế Nghinh Phong Tụ Phúc - Khai Hoa Đắc Lộc',
      tempReduction: '-12.8°C',
      humidityControl: '52% RH',
      windGuidance: '6.8 m/s',
      description: 'Dây hoa đỏ rực buông xõa bồng bềnh sát mặt nước, tỏa hương thơm dịu ngọt vào những buổi hoàng hôn Sài Gòn.',
    },
    maiChieuThuy: {
      title: 'Mai Chiếu Thủy Da Đen 535 Năm',
      posture: 'Thế Huyền Vũ Đáo Đầu - Hương Trầm Thanh Tịnh',
      tempReduction: '-12.9°C',
      humidityControl: '51% RH',
      windGuidance: '6.9 m/s',
      description: 'Cội mai thân vỏ xù xì phong trần, ngàn đóa hoa trắng li ti chiếu thẳng xuống mặt nước gương trong vắt.',
    },
  }

  const currentBonsai = bonsaiProfiles[selectedBonsai]

  return (
    <section className="relative my-16 overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-[#0C0F0A] p-6 text-[#E6E4DD] shadow-2xl backdrop-blur-md sm:p-10">
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#10B981]/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#D4AF37]/8 blur-3xl" />

      {/* Header Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
        <div>
          <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
            Độc Bản Kiến Trúc Thủy Vi Khí Hậu V11
          </span>
          <h3 className="mt-2 text-xl font-semibold tracking-wide text-[#F3EFE6] sm:text-2xl">
            Thủy Đình Long Não 540 Năm & Hào Bonsai Đa Búp Đỏ 550 Năm
          </h3>
          <p className="mt-1 text-xs text-[#A09882] sm:text-sm">
            Tác phẩm thủy tạ tinh hoa: Khung gỗ Long Não cổ thụ thơm nồng kháng khuẩn tự nhiên, hào nước sen súng bách niên và hòa âm 528Hz + 432Hz an định tâm hồn.
          </p>
        </div>

        {/* Audio Toggle Button */}
        <button
          type="button"
          onClick={toggleSoundscape}
          className={`min-h-[44px] min-w-[44px] flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
            isAudioHarmonics
              ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F3EFE6] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
              : 'border-[#2B3524] bg-[#151A12] text-[#A09882] hover:border-[#D4AF37]/50 hover:text-[#E6E4DD]'
          }`}
          aria-label="Kích hoạt âm thanh Solfeggio Thủy Đình Long Não"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          <span>{isAudioHarmonics ? 'Hòa Âm 528Hz + 432Hz: Đang Mở' : 'Mở Hòa Âm Thủy Đình (528Hz + 432Hz)'}</span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Visualization Panel (7 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#2B3524] bg-[#121610] p-6 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between text-xs text-[#A09882]">
              <span>MÔ HÌNH THỦY ĐÌNH LONG NÃO ĐỘNG HỌC 3D</span>
              <span className="font-mono text-[#D4AF37]">Khung Cổ Mộc 540 Năm</span>
            </div>

            {/* Simulated 3D Architectural Canvas */}
            <div className="relative my-6 flex h-64 items-center justify-center overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-gradient-to-b from-[#161D13] to-[#0A0D08]">
              {/* Moat Water Ripples */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#38BDF8]/20 via-transparent to-transparent animate-pulse" />
              </div>

              {/* Water Mist FX */}
              {isMistActive && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#E0F2FE]/10 to-transparent blur-sm" />
              )}

              {/* Architectural Pavilion SVG Render */}
              <svg className="h-48 w-48 text-[#D4AF37]" viewBox="0 0 200 200" fill="none">
                {/* Stone Base in Moat */}
                <path d="M40 160 L160 160 L175 180 L25 180 Z" fill="#2B3524" stroke="#D4AF37" strokeWidth="1" />
                {/* Camphor Wood Pillars */}
                <rect x="55" y="80" width="8" height="80" rx="2" fill="#78350F" />
                <rect x="96" y="80" width="8" height="80" rx="2" fill="#92400E" />
                <rect x="137" y="80" width="8" height="80" rx="2" fill="#78350F" />
                {/* Hinged Lam Louvers with Dynamic Angle */}
                <g style={{ transform: `rotate(-${hingeAngle * 0.4}deg)`, transformOrigin: '55px 90px', transition: 'transform 0.3s ease-out' }}>
                  <line x1="55" y1="90" x2="85" y2="85" stroke="#D4AF37" strokeWidth="2.5" />
                  <line x1="55" y1="110" x2="85" y2="105" stroke="#D4AF37" strokeWidth="2.5" />
                  <line x1="55" y1="130" x2="85" y2="125" stroke="#D4AF37" strokeWidth="2.5" />
                </g>
                <g style={{ transform: `rotate(${hingeAngle * 0.4}deg)`, transformOrigin: '145px 90px', transition: 'transform 0.3s ease-out' }}>
                  <line x1="145" y1="90" x2="115" y2="85" stroke="#D4AF37" strokeWidth="2.5" />
                  <line x1="145" y1="110" x2="115" y2="105" stroke="#D4AF37" strokeWidth="2.5" />
                  <line x1="145" y1="130" x2="115" y2="125" stroke="#D4AF37" strokeWidth="2.5" />
                </g>
                {/* Pavilion Roof Overhang */}
                <path d="M20 80 Q100 45 180 80 L160 70 Q100 35 40 70 Z" fill="#D4AF37" opacity="0.85" />
                {/* Bonsai Silhouette on Rotating Pedestal */}
                <g style={{ transform: `rotate(${rotationDegree * 0.2}deg)`, transformOrigin: '100px 145px' }}>
                  <circle cx="100" cy="135" r="11" fill="#15803D" opacity="0.85" />
                  <circle cx="93" cy="130" r="8" fill="#16A34A" opacity="0.9" />
                  <circle cx="107" cy="131" r="8" fill="#14532D" opacity="0.9" />
                  <path d="M100 145 L100 135" stroke="#451A03" strokeWidth="3" />
                </g>
              </svg>

              {/* Dynamic Overlay Telemetry */}
              <div className="absolute bottom-3 left-3 rounded-lg border border-[#2B3524] bg-[#0C0F0A]/80 px-2.5 py-1 text-[11px] font-mono text-[#D4AF37]">
                Góc Bản Lề: {hingeAngle}° | Hạ Nhiệt: {currentBonsai.tempReduction}
              </div>
            </div>
          </div>

          {/* Microclimate Stats Grid */}
          <div className="grid grid-cols-3 gap-3 border-t border-[#2B3524] pt-4 text-center">
            <div className="rounded-xl border border-[#2B3524] bg-[#161D13] p-2.5">
              <span className="block text-[10px] text-[#A09882]">HẠ NHIỆT VI KHÍ HẬU</span>
              <span className="text-sm font-semibold text-[#38BDF8] sm:text-base">{currentBonsai.tempReduction}</span>
            </div>
            <div className="rounded-xl border border-[#2B3524] bg-[#161D13] p-2.5">
              <span className="block text-[10px] text-[#A09882]">ĐỘ ẨM KHÔNG GIAN</span>
              <span className="text-sm font-semibold text-[#4ADE80] sm:text-base">{currentBonsai.humidityControl}</span>
            </div>
            <div className="rounded-xl border border-[#2B3524] bg-[#161D13] p-2.5">
              <span className="block text-[10px] text-[#A09882]">TỐC ĐỘ GIÓ ĐỐI LƯU</span>
              <span className="text-sm font-semibold text-[#FBBF24] sm:text-base">{currentBonsai.windGuidance}</span>
            </div>
          </div>
        </div>

        {/* Right Control & Customization Panel (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#2B3524] bg-[#121610] p-6 lg:col-span-5">
          <div className="space-y-6">
            {/* Bonsai Selector */}
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-[#A09882]">
                Chọn Cội Bonsai Phong Thủy Hào Nước
              </label>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {(['daBupDo', 'locVung', 'maiChieuThuy'] as const).map((key) => {
                  const item = bonsaiProfiles[key]
                  const isSelected = selectedBonsai === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedBonsai(key)}
                      className={`min-h-[44px] w-full text-left px-3.5 py-2.5 rounded-xl border transition-all text-xs ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F3EFE6]'
                          : 'border-[#2B3524] bg-[#161D13] text-[#A09882] hover:border-[#D4AF37]/40 hover:text-[#E6E4DD]'
                      }`}
                    >
                      <div className="font-medium text-[#F3EFE6]">{item.title}</div>
                      <div className="text-[11px] text-[#A09882]">{item.posture}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Hinge Angle Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#A09882]">
                <span>ĐIỀU CHỈNH GÓC MỞ BỨC BÀN LONG NÃO</span>
                <span className="font-mono text-[#D4AF37]">{hingeAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="65"
                value={hingeAngle}
                onChange={(e) => setHingeAngle(Number(e.target.value))}
                className="mt-2.5 w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#6B7280]">
                <span>Đóng Kín (Chắn Mưa)</span>
                <span>Mở Vừa (Đối Lưu)</span>
                <span>Mở Cực Đại (Đón Gió Sông)</span>
              </div>
            </div>

            {/* Pedestal Rotation Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#A09882]">
                <span>XOAY BỆ BONSAI ĐÓN NẮNG TỰ NHIÊN</span>
                <span className="font-mono text-[#D4AF37]">{rotationDegree}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={rotationDegree}
                onChange={(e) => setRotationDegree(Number(e.target.value))}
                className="mt-2.5 w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 space-y-3 pt-4 border-t border-[#2B3524]">
            <div className="flex items-center justify-between gap-3">
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

export default SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV11
