'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV18() {
  const [hingeAngle, setHingeAngle] = useState<number>(270)
  const [moatFlowActive, setMoatFlowActive] = useState<boolean>(true)
  const [soundscapeActive, setSoundscapeActive] = useState<boolean>(false)
  const [selectedFacetIndex, setSelectedFacetIndex] = useState<number>(0)

  // Web Audio Context & Nodes
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopAudio = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop()
        osc1Ref.current.disconnect()
        osc1Ref.current = null
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop()
        osc2Ref.current.disconnect()
        osc2Ref.current = null
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect()
        gainNodeRef.current = null
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
        audioCtxRef.current = null
      }
    } catch {
      // Safe cleanup catch
    }
  }

  const startAudio = () => {
    stopAudio()
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz (Transformation & Miracles)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc1Ref.current = osc1

      // Earth Resonant Harmonic 432Hz
      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(432, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      osc2Ref.current = osc2
    } catch {
      // Audio error catch
    }
  }

  const toggleSoundscape = () => {
    if (soundscapeActive) {
      stopAudio()
      setSoundscapeActive(false)
    } else {
      startAudio()
      setSoundscapeActive(true)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const metrics: CanalPavilionMetric[] = [
    {
      label: 'Hạ Nhiệt Vi Khí Hậu',
      value: '-15.4°C',
      subtext: 'So với nhiệt độ bức xạ đô thị Sài Gòn',
      detail: 'Kết hợp hào hoa bách thảo sâu 1.9m, tán cổ thụ Long Não Tây Bắc 610 năm tuổi và gió kênh rạch tự nhiên 9.4 m/s.'
    },
    {
      label: 'Cổ Mộc Long Não Tây Bắc',
      value: '610 Năm',
      subtext: 'Rừng nguyên sinh Tây Bắc đại ngàn',
      detail: 'Khung mộng gỗ Long Não cổ thụ ngậm tinh dầu thơm ấm nồng tự nhiên, tự thân xua muỗi và cân bằng ẩm 75-80% RH bền vững.'
    },
    {
      label: 'Bản Lề Mộng Gỗ Xoay',
      value: '270°',
      subtext: 'Cối âm dương mộng then liên hoàn',
      detail: 'Cơ cấu mộng xoay truyền thống không dùng đinh ốc kim loại, đón trọn luồng vi phong mát lành từ hệ thống rạch sông phương Nam.'
    },
    {
      label: 'Khế Gân Ngũ Phúc Bonsai',
      value: '625 Năm',
      subtext: 'Đại thụ Bonsai Nam Bộ dáng Ngũ Phúc',
      detail: 'Tác phẩm Bonsai Khế Gân 625 năm tuổi dáng Ngũ Phúc Lâm Môn vươn cành đón thủy khí, mang lại trường thọ và an lạc viên mãn.'
    }
  ]

  const pavilionFacets = [
    {
      title: 'Khung Vì Kèo Long Não Tây Bắc 610 Năm',
      subtitle: 'Gỗ Quý Nguyên Sinh Đại Thụ',
      desc: 'Cột cái đường kính 495mm từ gỗ Long Não Tây Bắc cổ thụ 610 năm tuổi chứa hàm lượng tinh dầu thơm nồng ấm, kháng ẩm và mang lại cảm giác khoan khoái tinh thần tuyệt đối.'
    },
    {
      title: 'Hệ Bản Lề Cối Mộng Gỗ Xoay 270°',
      subtitle: 'Cơ Học Mộc Cổ Truyền',
      desc: 'Hệ cửa bản lề cối âm dương mộc Việt ngậm then chốt xoay êm nhẹ góc 270°, nắn dòng đối lưu gió rạch tự nhiên 9.4 m/s tràn vào gian thủy đình.'
    },
    {
      title: 'Hào Hoa Bách Thảo Tuần Hoàn 1.9m',
      subtitle: 'Mặt Nước Vi Khí Hậu Sinh Thái',
      desc: 'Hào nước sâu 1.9m nuôi hoa sen bách thảo, lọc tuần hoàn qua sỏi bazan núi lửa Đắk Nông, hạ bức xạ nhiệt đô thị tới -15.4°C.'
    },
    {
      title: 'Bonsai Khế Gân 625 Năm Ngũ Phúc Lâm Môn',
      subtitle: 'Phúc Khí Nam Bộ Độc Bản',
      desc: 'Cổ thụ Khế Gân 625 năm tuổi dáng Ngũ Phúc Lâm Môn năm cành tán uy nghi, rễ uốn lượn ôm chặt tảng đá ong phong rêu bên làn nước trong vắt.'
    }
  ]

  return (
    <section className="relative w-full py-20 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden border-t border-amber-900/30">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-950 to-black pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-700/40 text-amber-300 text-xs font-serif uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Kiến Trúc Sinh Thái Thủy Cư Sài Gòn V18
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-100 tracking-wide mb-4">
            Thủy Đình Long Não Tây Bắc 610 Năm & Hào Bonsai Khế Gân Ngũ Phúc V18
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Tuyệt phẩm không gian thư giãn ven rạch nước may đo theo triết lý Quiet Luxury của GuHomes. Sự hòa quyện giữa hương gỗ Long Não Tây Bắc 610 năm tuổi, hệ bản lề mộc xoay 270° đón gió 9.4 m/s và hào hoa bách thảo hạ nhiệt vi khí hậu -15.4°C.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-stone-900/60 border border-amber-900/20 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-serif text-amber-400/80 uppercase tracking-wider block mb-1">
                  {item.label}
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-amber-200 font-medium block mb-1">
                  {item.value}
                </span>
                <span className="text-xs text-stone-300 font-light block mb-2">
                  {item.subtext}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light leading-normal border-t border-stone-800/80 pt-2">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Control Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 bg-stone-900/40 p-6 sm:p-8 rounded-3xl border border-amber-900/20 backdrop-blur-md">
          {/* Visual Display Box */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-stone-950/80 rounded-2xl border border-stone-800 relative min-h-[340px] overflow-hidden">
            {moatFlowActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-cyan-950/20 to-transparent pointer-events-none"
              />
            )}

            {/* Architectural Visual SVG */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.2)"
                  strokeWidth="6"
                  strokeDasharray={moatFlowActive ? '6 3' : 'none'}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="74"
                  fill="none"
                  stroke="rgba(217, 119, 6, 0.3)"
                  strokeWidth="2"
                />

                <rect
                  x="55"
                  y="55"
                  width="90"
                  height="90"
                  rx="6"
                  fill="rgba(41, 37, 36, 0.85)"
                  stroke="rgba(245, 158, 11, 0.5)"
                  strokeWidth="2"
                />

                <circle cx="65" cy="65" r="5" fill="#f59e0b" />
                <circle cx="135" cy="65" r="5" fill="#f59e0b" />
                <circle cx="65" cy="135" r="5" fill="#f59e0b" />
                <circle cx="135" cy="135" r="5" fill="#f59e0b" />

                <g transform={`rotate(${hingeAngle - 180}, 100, 100)`}>
                  <line
                    x1="65"
                    y1="55"
                    x2="135"
                    y2="55"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="65"
                    y1="145"
                    x2="135"
                    y2="145"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>

                <circle cx="100" cy="100" r="4" fill="#10b981" />
              </svg>
            </div>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-amber-300 border border-amber-800/40">
                Góc Mở Bản Lề: {hingeAngle}°
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-emerald-400 border border-emerald-800/40">
                Hào Hoa Bách Thảo: {moatFlowActive ? 'Tuần Hoàn 1.9m' : 'Tĩnh Tại'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-teal-300 border border-teal-800/40">
                Âm Thanh Vi Khí Hậu: {soundscapeActive ? '528Hz & 432Hz Active' : 'Chế Độ Yên Tĩnh'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <label htmlFor="hinge-range-camphor-v18" className="text-xs font-serif text-amber-400 uppercase tracking-wider block mb-2">
                Điều Khiển Bản Lề Mộng Xoay (90° đến 270°)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="hinge-range-camphor-v18"
                  type="range"
                  min="90"
                  max="270"
                  step="15"
                  value={hingeAngle}
                  onChange={(e) => setHingeAngle(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-serif text-amber-200 min-w-[48px] text-right font-semibold">
                  {hingeAngle}°
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1 font-light">
                Góc mở rộng tối đa 270° giúp đón làn gió vi khí hậu 9.4 m/s đưa hương Long Não Tây Bắc lan tỏa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setMoatFlowActive(!moatFlowActive)}
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl border border-emerald-700/50 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-200 text-xs font-serif tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${moatFlowActive ? 'bg-emerald-400 animate-ping' : 'bg-stone-600'}`} />
                {moatFlowActive ? 'Tắt Hào Nước' : 'Bật Hào Nước 1.9m'}
              </button>

              <button
                type="button"
                onClick={toggleSoundscape}
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl border border-amber-700/50 bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 text-xs font-serif tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${soundscapeActive ? 'bg-amber-400 animate-ping' : 'bg-stone-600'}`} />
                {soundscapeActive ? 'Dừng Hòa Âm 528Hz' : 'Bật Hòa Âm 528Hz'}
              </button>
            </div>

            {/* Facet Detail Selector */}
            <div>
              <span className="text-xs font-serif text-amber-400 uppercase tracking-wider block mb-2">
                Khám Phá Chi Tiết Cấu Kiện Thủy Đình V18
              </span>
              <div className="grid grid-cols-2 gap-2">
                {pavilionFacets.map((facet, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedFacetIndex(idx)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left border transition-all text-xs font-serif ${
                      selectedFacetIndex === idx
                        ? 'border-amber-500 bg-amber-950/60 text-amber-200 shadow-md shadow-amber-950/40'
                        : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                    }`}
                  >
                    <span className="font-semibold block truncate">{facet.subtitle}</span>
                    <span className="text-[10px] text-stone-300 truncate block">{facet.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Facet Card */}
        <AnimatePresence mode="wait">
          {pavilionFacets[selectedFacetIndex] && (
            <motion.div
              key={selectedFacetIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-stone-950/90 border border-amber-800/30 backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg sm:text-xl font-serif text-amber-200">
                  {pavilionFacets[selectedFacetIndex].title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-serif bg-amber-950/70 border border-amber-700/40 text-amber-300 self-start sm:self-auto">
                  {pavilionFacets[selectedFacetIndex].subtitle}
                </span>
              </div>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                {pavilionFacets[selectedFacetIndex].desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand Footnote */}
        <div className="mt-14 text-center border-t border-stone-800/60 pt-8">
          <p className="text-xs text-stone-300 font-light tracking-wider">
            Thiết kế & chế tác độc bản bởi <span className="text-amber-300 font-normal">GuHomes</span> · Xưởng may đo Thạnh Xuân 1.200m² · Giới hạn 12 công trình may đo mỗi năm.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV18
