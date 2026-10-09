'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV16() {
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
      value: '-14.9°C',
      subtext: 'Bốc hơi nước đa tầng hào sen & vòm Pơ Mu',
      detail: 'Hệ hào sen bách thảo 156m kết hợp tán Pơ Mu đại thụ và bonsai Mai Vàng 610 năm giúp nhiệt độ nội sảnh giảm sâu từ 38°C ngoài trời xuống ngưỡng lý tưởng 23.1°C mà không tiêu tốn điện năng lạnh cục bộ.'
    },
    {
      label: 'Lưu Lượng Gió Đối Lưu',
      value: '8.9 m/s',
      subtext: 'Áp suất âm dòng kênh & mộng cối xoay 270°',
      detail: 'Hệ mộng gỗ cối âm dương mở thoáng 270° hút trọn gió mát từ mặt nước kênh đào Sài Gòn, tạo chu trình luân chuyển khí tươi liên tục đạt 8.9 m/s, quét sạch độ ẩm bão hòa 80% RH mùa mưa phương Nam.'
    },
    {
      label: 'Gỗ Pơ Mu Cổ Thụ',
      value: '600 Năm Tuổi',
      subtext: 'Rừng Tây Bắc nguyên khối kháng ẩm tuyệt đối',
      detail: 'Gỗ Pơ Mu quý hiếm (Fokienia hodginsii) sinh trưởng trên đỉnh đèo Hoàng Liên Sơn 600 năm, giàu tinh dầu hổ phách tỏa ngát hương thơm trầm ấm vĩnh cửu, kháng mối mọt và xua tan khí ẩm nhiệt đới.'
    },
    {
      label: 'Hào Bonsai Mai Vàng',
      value: '610 Năm Tuổi',
      subtext: 'Dáng Phượng Vũ Nghinh Phong ngậm ngọc',
      detail: 'Cội Mai Vàng nguyên bản Nam Bộ 610 năm cổ kính, gốc xù xì thế Phượng Vũ uốn lượn soi bóng mặt hào hoa súng trắng, mang vượng khí trường sinh và sự hanh thông tài bảo cho gia chủ.'
    }
  ]

  const facets = [
    {
      title: 'Hệ Bản Lề Cối Mộng Gỗ Xoay 270°',
      desc: 'Cấu kiện mộng ngàm thuần mộc không dùng một chiếc đinh kim loại, bản lề cối âm dương chế tác từ lõi Pơ Mu già đanh xoay êm ái, cho phép điều tiết tầm nhìn panoramic và đón gió vi khí hậu.',
      tag: 'Mộng Gỗ Thần Kỳ'
    },
    {
      title: 'Hào Sen Bách Thảo Chu Vi 156m',
      desc: 'Hệ thống thủy sinh tuần hoàn lọc tự nhiên qua lớp đá núi lửa, cát thạch anh và bách thảo thủy sinh, giữ mặt nước trong suốt, nuôi dưỡng đàn cá Koi tuyển lựa và hoa sen bách diệp thanh tao.',
      tag: 'Thủy Sinh Vi Khí Hậu'
    },
    {
      title: 'Án Ngự Thư Phòng Gỗ Pơ Mu Nguyên Tấm',
      desc: 'Mặt bàn dài 3.6m dày 12cm từ một thân Pơ Mu 600 năm tuổi, đường vân sóng mây huyền ảo vàng óng, mài nhẵn bằng bột đá tự nhiên và vuốt sáp ong rừng bảo tồn nguyên vẹn hương thơm nguyên bản.',
      tag: 'Nội Thất May Đo Gu'
    },
    {
      title: 'Hòa Âm Solfeggio 528Hz & 432Hz',
      desc: 'Tần số rung động 528Hz (tái tạo năng lượng sinh học) phối hợp nhịp nhàng cùng 432Hz (tần số tự nhiên của đất trời), mang lại sự an tĩnh tuyệt đối cho tâm trí sau những giờ điều hành áp lực.',
      tag: 'Âm Thanh Trị Liệu'
    }
  ]

  return (
    <div className="relative w-full max-w-7xl mx-auto my-12 p-6 md:p-10 rounded-3xl bg-neutral-900/90 border border-amber-900/40 text-neutral-100 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between border-b border-amber-800/30 pb-6 mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Kiệt Tác Thủy Đình & Vi Khí Hậu Ven Sông V16
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-light text-neutral-100 tracking-tight">
            Thủy Đình Pơ Mu Tây Bắc Cổ Thụ 600 Năm
            <span className="block text-lg md:text-2xl text-amber-200/80 font-sans font-normal mt-1">
              & Hào Bonsai Mai Vàng 610 Năm Dáng Phượng Vũ V16
            </span>
          </h2>
        </div>

        {/* Audio Soundscape Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSoundscape}
            className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-full flex items-center gap-2.5 text-sm font-medium transition-all duration-300 shadow-lg ${
              soundscapeActive
                ? 'bg-amber-500 text-neutral-950 shadow-amber-500/25 ring-2 ring-amber-400/50'
                : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-amber-200/90 border border-amber-700/40'
            }`}
            aria-label={soundscapeActive ? 'Tắt hòa âm Solfeggio 528Hz & 432Hz' : 'Bật hòa âm Solfeggio 528Hz & 432Hz'}
          >
            <svg
              className={`w-5 h-5 ${soundscapeActive ? 'animate-bounce text-neutral-950' : 'text-amber-300'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
            <span>{soundscapeActive ? 'Đang Phát Solfeggio 528Hz & 432Hz' : 'Kích Hoạt Hòa Âm An Định'}</span>
          </button>
        </div>
      </div>

      {/* Metrics 4 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-neutral-800/50 border border-neutral-700/60 hover:border-amber-500/40 transition-all duration-300 group"
          >
            <div className="text-xs uppercase tracking-wider text-neutral-400 group-hover:text-amber-300 transition-colors">
              {item.label}
            </div>
            <div className="text-3xl font-serif font-light text-amber-200 mt-2">
              {item.value}
            </div>
            <div className="text-xs text-neutral-300 font-medium mt-1">
              {item.subtext}
            </div>
            <p className="text-xs text-neutral-400 mt-3 leading-relaxed border-t border-neutral-700/40 pt-2.5">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Architecture Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/60 p-6 md:p-8 rounded-2xl border border-amber-900/30 mb-10">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-amber-300 uppercase tracking-wide">
              Góc Xoay Bản Lề Cối Mộng Gỗ
            </span>
            <span className="text-xl font-mono text-amber-200 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-700/40">
              {hingeAngle}°
            </span>
          </div>

          {/* Slider with Min 44px Touch Target Height */}
          <div className="relative flex items-center h-12">
            <input
              type="range"
              min="0"
              max="270"
              step="1"
              value={hingeAngle}
              onChange={(e) => setHingeAngle(Number(e.target.value))}
              className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
              aria-label="Điều chỉnh góc xoay bản lề cối âm dương thủy đình"
            />
          </div>

          <div className="flex justify-between text-xs text-neutral-400">
            <span>0° (Đóng kín tĩnh mịch)</span>
            <span>90° (Đón gió hướng Tây Nam)</span>
            <span>180° (Mở thoáng hai bờ kênh)</span>
            <span>270° (Mở toàn cảnh 360°)</span>
          </div>

          {/* Moat Water Flow Toggle */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-neutral-200">
                Tuần Hoàn Thủy Lưu Hào Sen Bách Thảo
              </div>
              <div className="text-xs text-neutral-400">
                Lọc sinh học vi sinh & tạo bọt khí giàu oxy
              </div>
            </div>
            <button
              onClick={() => setMoatFlowActive(!moatFlowActive)}
              className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                moatFlowActive
                  ? 'bg-emerald-600 text-neutral-950 shadow-lg shadow-emerald-700/30'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
              }`}
              aria-label={moatFlowActive ? 'Dừng tuần hoàn hào sen' : 'Bật tuần hoàn hào sen'}
            >
              {moatFlowActive ? 'Đang Tuần Hoàn' : 'Tạm Dừng'}
            </button>
          </div>
        </div>

        {/* Visual Architecture Representation */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-8 bg-neutral-900/80 rounded-xl border border-neutral-800 min-h-[260px] overflow-hidden">
          {/* Animated Water Moat Ripple */}
          {moatFlowActive && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-emerald-500/20 pointer-events-none"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}

          {/* Hinged Pavilion Door Graphic */}
          <div className="relative w-48 h-48 border-2 border-dashed border-amber-600/40 rounded-full flex items-center justify-center">
            <span className="absolute text-[10px] text-neutral-400 -top-4 font-mono">Bắc (Sông Sài Gòn)</span>
            <span className="absolute text-[10px] text-neutral-400 -bottom-4 font-mono">Nam (Vườn Bonsai)</span>
            <span className="absolute text-[10px] text-neutral-400 -left-6 font-mono">Tây</span>
            <span className="absolute text-[10px] text-neutral-400 -right-6 font-mono">Đông</span>

            {/* Rotating Arm Door */}
            <motion.div
              className="w-20 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full origin-left shadow-lg shadow-amber-500/40"
              style={{
                rotate: hingeAngle
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />

            {/* Center Pivot Point */}
            <div className="w-5 h-5 rounded-full bg-amber-400 border-2 border-neutral-900 z-10 shadow-md" />
          </div>

          <div className="mt-6 text-center">
            <div className="text-xs font-mono text-amber-300">
              {hingeAngle === 0 && 'Cửa cối đóng khép: Cách âm 42dB, giữ hương Pơ Mu'}
              {hingeAngle > 0 && hingeAngle < 180 && 'Đón luồng gió kênh đào dịu nhẹ hạ nhiệt vi khí hậu'}
              {hingeAngle >= 180 && hingeAngle < 270 && 'Đối lưu chéo tối đa: Khí tươi tươi mát quét qua sảnh'}
              {hingeAngle === 270 && 'Toàn cảnh mở rộng 270°: Giao hòa trọn vẹn hào sen & bonsai'}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Architectural Facets Tab System */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-3">
          {facets.map((facet, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFacetIndex(idx)}
              className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                selectedFacetIndex === idx
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
            >
              {facet.tag}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFacetIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-6 rounded-2xl bg-neutral-950/40 border border-neutral-800/80"
          >
            <h3 className="text-lg md:text-xl font-serif text-amber-100 mb-2">
              {facets[selectedFacetIndex]?.title}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {facets[selectedFacetIndex]?.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Branding & Direct Consultation */}
      <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>GuHomes Bespoke Architecture · Xưởng May Đo Thạnh Xuân 1.200m²</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="tel:0368757916"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-medium transition-colors"
          >
            Hotline KTS Trưởng: 0368 757 916
          </a>
          <a
            href="mailto:guhomesvn@gmail.com"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            guhomesvn@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV16
