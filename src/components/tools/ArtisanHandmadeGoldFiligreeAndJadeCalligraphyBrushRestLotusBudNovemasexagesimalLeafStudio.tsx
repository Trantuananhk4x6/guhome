'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudNovemasexagesimalLeafStudio() {
  const [leafRotationAngle, setLeafRotationAngle] = useState<number>(69)
  const [jadeGlowIntensity, setJadeGlowIntensity] = useState<number>(85)
  const [harmonicResonanceActive, setHarmonicResonanceActive] = useState<boolean>(false)
  const [selectedAtelierAspect, setSelectedAtelierAspect] = useState<number>(0)

  // Web Audio Context & Oscillators for Solfeggio 528Hz & 1056Hz (Crown Wisdom & Clarity)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscBaseRef = useRef<OscillatorNode | null>(null)
  const oscHarmonicRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopHarmonics = () => {
    try {
      if (oscBaseRef.current) {
        oscBaseRef.current.stop()
        oscBaseRef.current.disconnect()
        oscBaseRef.current = null
      }
      if (oscHarmonicRef.current) {
        oscHarmonicRef.current.stop()
        oscHarmonicRef.current.disconnect()
        oscHarmonicRef.current = null
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

  const startHarmonics = () => {
    stopHarmonics()
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.038, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz: Transformation & Pure Vision
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      oscBaseRef.current = osc1

      // Octave 1056Hz: Deep Focus & High Awareness
      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(1056, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      oscHarmonicRef.current = osc2
    } catch {
      // Audio error catch
    }
  }

  const toggleHarmonics = () => {
    if (harmonicResonanceActive) {
      stopHarmonics()
      setHarmonicResonanceActive(false)
    } else {
      startHarmonics()
      setHarmonicResonanceActive(true)
    }
  }

  useEffect(() => {
    return () => {
      stopHarmonics()
    }
  }, [])

  const metrics: BrushRestMetric[] = [
    {
      label: 'Cánh Sen Phỉ Thúy Type A',
      value: '69 Cánh Sen',
      subtext: 'Lục Thập Cửu Diệp âm dương giao hòa',
      detail: 'Từng cánh sen được chạm khắc thủ công từ phôi ngọc Phỉ Thúy Miến Điện Type A (Imperial Emerald Jadeite) độ trong băng chủng ngọc tủy, không qua xử lý hóa chất hay nhiệt.'
    },
    {
      label: 'Chỉ Vàng 24K Filigree',
      value: '0.11 mm',
      subtext: 'Kỹ nghệ đậu bạc nẹp vàng ròng Định Công',
      detail: 'Nghệ nhân kim hoàn kéo sợi vàng 24K siêu mảnh 0.11mm, uốn lượn viền quanh từng đường gân cánh sen, tạo hiệu ứng phát sáng lấp lánh như sương mai đọng trên cánh hoa ngọc.'
    },
    {
      label: 'Bệ Hoàng Đàn Tuyết Lạng Sơn',
      value: '400 Năm Tuổi',
      subtext: 'Cupressus torulosa lên tuyết óng ánh thơm ngát',
      detail: 'Khối gỗ Hoàng Đàn Tuyết Lạng Sơn 400 năm tuổi đại thụ kết tinh màng tuyết trắng óng ánh tự nhiên, giàu tinh dầu thơm thánh khiết, triệt tiêu rung động cơ học trên bàn trà.'
    },
    {
      label: 'Cộng Hưởng Solfeggio',
      value: '528Hz & 1056Hz',
      subtext: 'Khai thông minh triết thư phòng chủ nhân',
      detail: 'Tần số rung động 528Hz phối hợp cùng bát độ cao 1056Hz giúp thanh lọc tâm trí, kích hoạt tư duy chiến lược và sự tĩnh tại sâu sắc cho không gian thư phòng tinh hoa.'
    }
  ]

  const atelierAspects = [
    {
      title: 'Kỹ Nghệ Điêu Khắc Ngọc Sen Lục Thập Cửu Diệp 69 Cánh',
      content: 'Số 69 tượng trưng cho thái cực âm dương giao hòa tương sinh, 69 cánh sen mở so le theo 4 tầng ôm trọn cán ngự bút lông sói tự nhiên, tạo điểm tỳ cân bằng tuyệt đối.',
      tag: 'Điêu Khắc Ngọc Thần'
    },
    {
      title: 'Bệ Hoàng Đàn Tuyết Lạng Sơn 400 Năm Chống Rung Vi Thể',
      content: 'Khối hoàng đàn tuyết chứa lượng tinh dầu đậm đặc kết tinh thành sợi tuyết li ti, hấp thụ hoàn toàn rung động vi mô từ mặt sàn, giữ cho ngọn bút lông luôn tĩnh tại.',
      tag: 'Vật Liệu Cung Đình'
    },
    {
      title: 'Viền Vàng 24K Filigree Kỹ Nghệ Đậu Bạc Cổ',
      content: 'Chỉ vàng ròng được xe đôi và cán vân xoắn ốc li ti, hàn mộng vẩy bạc kín khít dưới kính lúp độ phóng đại 40X, bảo tồn bí quyết kim hoàn truyền thống ngàn năm.',
      tag: 'Kim Hoàn Đỉnh Cao'
    },
    {
      title: 'Giao Hòa Vi Khí Hậu & Năng Lượng Thư Phòng',
      content: 'Ngọc phỉ thấu quang mát lạnh tự nhiên kết hợp gỗ hoàng đàn thơm ấm tạo nên sự cân bằng âm dương hoàn hảo, điều hòa nhiệt vi môi trường trên bàn làm việc của chủ nhân.',
      tag: 'Vi Khí Hậu Bàn Trà'
    }
  ]

  return (
    <div className="relative w-full max-w-7xl mx-auto my-12 p-6 md:p-10 rounded-3xl bg-neutral-900/90 border border-emerald-900/40 text-neutral-100 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between border-b border-emerald-800/30 pb-6 mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Tuyệt Tác Thư Phòng & Kê Ngự Bút Kim Hoàn Độc Bản
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-light text-neutral-100 tracking-tight">
            Kê Ngự Bút Sen Lục Thập Cửu Diệp 69 Cánh
            <span className="block text-lg md:text-2xl text-emerald-200/80 font-sans font-normal mt-1">
              Phỉ Thúy Type A Nẹp Vàng 24K Filigree Trên Bệ Hoàng Đàn Tuyết Lạng Sơn 400 Năm
            </span>
          </h2>
        </div>

        {/* Audio Harmonics Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleHarmonics}
            className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-full flex items-center gap-2.5 text-sm font-medium transition-all duration-300 shadow-lg ${
              harmonicResonanceActive
                ? 'bg-emerald-500 text-neutral-950 shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-emerald-200/90 border border-emerald-700/40'
            }`}
            aria-label={harmonicResonanceActive ? 'Tắt cộng hưởng 528Hz & 1056Hz' : 'Bật cộng hưởng 528Hz & 1056Hz'}
          >
            <svg
              className={`w-5 h-5 ${harmonicResonanceActive ? 'animate-pulse text-neutral-950' : 'text-emerald-300'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <span>{harmonicResonanceActive ? 'Đang Khơi Thông 528Hz & 1056Hz' : 'Cộng Hưởng Minh Triết Thư Phòng'}</span>
          </button>
        </div>
      </div>

      {/* Metrics 4 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-neutral-800/50 border border-neutral-700/60 hover:border-emerald-500/40 transition-all duration-300 group"
          >
            <div className="text-xs uppercase tracking-wider text-neutral-400 group-hover:text-emerald-300 transition-colors">
              {item.label}
            </div>
            <div className="text-3xl font-serif font-light text-emerald-200 mt-2">
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

      {/* Interactive Leaf Angle & Jade Luminescence Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/60 p-6 md:p-8 rounded-2xl border border-emerald-900/30 mb-10">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-300 uppercase tracking-wide">
              Độ Mở Cánh Sen Ngọc Lục Thập Cửu Diệp
            </span>
            <span className="text-2xl font-mono text-emerald-200 bg-emerald-950/60 px-4 py-1 rounded-lg border border-emerald-700/40">
              {leafRotationAngle}°
            </span>
          </div>

          {/* Slider with Min 44px Touch Target Height */}
          <div className="relative flex items-center h-12">
            <input
              type="range"
              min="30"
              max="90"
              step="1"
              value={leafRotationAngle}
              onChange={(e) => setLeafRotationAngle(Number(e.target.value))}
              className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              aria-label="Điều chỉnh góc xòe 69 cánh sen phỉ thúy"
            />
          </div>

          <div className="flex justify-between text-xs text-neutral-400">
            <span>30° (Búp sen e ấp thanh khiết)</span>
            <span>69° (Khai phóng Thái Cực tương sinh)</span>
            <span>90° (Mãn khai bung tỏa tài vận)</span>
          </div>

          {/* Jade Glow Slider */}
          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
                Quang Thông Phỉ Thúy Thấu Băng
              </span>
              <span className="text-xs font-mono text-emerald-300">{jadeGlowIntensity}%</span>
            </div>
            <div className="relative flex items-center h-12">
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={jadeGlowIntensity}
                onChange={(e) => setJadeGlowIntensity(Number(e.target.value))}
                className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                aria-label="Điều chỉnh độ thấu quang ngọc phỉ thúy"
              />
            </div>
          </div>
        </div>

        {/* Visual Jade Lotus & Brush Rest Representation */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-8 bg-neutral-900/80 rounded-xl border border-neutral-800 min-h-[260px] overflow-hidden">
          {/* Animated Jade Halo Glow */}
          <div
            className="absolute w-56 h-56 rounded-full blur-2xl pointer-events-none transition-all duration-500"
            style={{
              backgroundColor: `rgba(16, 185, 129, ${jadeGlowIntensity / 250})`
            }}
          />

          {/* Lotus Jade Art Graphic */}
          <div className="relative z-10 w-48 h-48 rounded-full border-2 border-emerald-500/40 p-4 flex flex-col items-center justify-center bg-neutral-950/70 shadow-2xl">
            {/* Dynamic Lotus Petal Fan Representation */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-14 rounded-full border border-amber-400/80 bg-gradient-to-t from-emerald-700/80 to-emerald-400/90 origin-bottom shadow-md"
                  style={{
                    rotate: i * 45 + (leafRotationAngle - 69) * 0.4
                  }}
                  animate={{
                    scale: [1, 1.03, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              ))}
              <div className="absolute w-7 h-7 rounded-full bg-amber-400 border border-amber-200 z-20 shadow-inner" />
            </div>

            <div className="text-xs font-serif text-emerald-200 mt-2 font-medium tracking-wide">
              69 Cánh Sen Thái Cực
            </div>
            <div className="text-[10px] text-amber-300 font-mono mt-0.5">
              Nẹp Vàng 24K Filigree 0.11mm
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-neutral-400 font-light">
              Bệ Hoàng Đàn Tuyết Lạng Sơn 400 năm tuổi lên tuyết óng ánh triệt tiêu rung chấn
            </span>
          </div>
        </div>
      </div>

      {/* 4 Atelier Craftsmanship Tabs */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-3">
          {atelierAspects.map((aspect, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAtelierAspect(idx)}
              className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                selectedAtelierAspect === idx
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/50'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
            >
              {aspect.tag}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAtelierAspect}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-6 rounded-2xl bg-neutral-950/40 border border-neutral-800/80"
          >
            <h3 className="text-lg md:text-xl font-serif text-emerald-100 mb-2">
              {atelierAspects[selectedAtelierAspect]?.title}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {atelierAspects[selectedAtelierAspect]?.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Branding & Direct Consultation */}
      <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>GuHomes Master Craftsmanship · Đồ Gỗ Mỹ Nghệ Cung Đình & Thư Phòng</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="tel:0368757916"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
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

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudNovemasexagesimalLeafStudio
