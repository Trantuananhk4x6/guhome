'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type TeapotPatinaStage = 'raw' | 'one-year' | 'three-year-jade'
export type TeapotViewAngle = 0 | 90 | 180 | 270 | 360

interface PatinaStageInfo {
  id: TeapotPatinaStage
  title: string
  subtitle: string
  lustreLevel: string
  teaBrewCount: string
  tactileFeel: string
  colorTone: string
  glowOpacity: number
  description: string
}

const PATINA_STAGES: Record<TeapotPatinaStage, PatinaStageInfo> = {
  raw: {
    id: 'raw',
    title: 'Nguyên Bản Mộc Mạc',
    subtitle: 'Mới Khai Thang · Cốt Đất Thô Lì Tự Nhiên',
    lustreLevel: 'Matte Lì 15%',
    teaBrewCount: '0 - 50 Tuần Trà',
    tactileFeel: 'Hơi nhám ráp nhẹ như da quả lê vàng, lộ rõ tinh thể thạch anh và hạt cát thô',
    colorTone: '#c99e58',
    glowOpacity: 0.1,
    description: 'Ấm mới nung ra lò từ đất quặng Đoạn Nê Hoàng Long Sơn ủ 20 năm. Các hạt khoáng tử sa còn thô ráp, bề mặt háo nước và sẵn sàng hấp thu tinh dầu trà.',
  },
  'one-year': {
    id: 'one-year',
    title: 'Nhuận Sắc Một Năm',
    subtitle: 'Nhuận Ôn · Lớp Bọc Trà Thẩm Thấu',
    lustreLevel: 'Bán Bóng Lụa 55%',
    teaBrewCount: '300+ Tuần Trà Nham Trà',
    tactileFeel: 'Mịn màng như lụa tơ tằm, sờ vào cảm nhận được sự ấm áp tròn trịa',
    colorTone: '#d9a74e',
    glowOpacity: 0.35,
    description: 'Sau 1 năm dưỡng trà Nham Trà Đại Hồng Bào, chất dầu trà thẩm thấu đều vào hệ thống mao dẫn khí khổng kép, màu vàng chuối chín ánh lên sắc ấm dịu dàng.',
  },
  'three-year-jade': {
    id: 'three-year-jade',
    title: 'Ánh Ngọc Dương Chi Ba Năm',
    subtitle: 'Bao Tương Ôn Nhuận · Ngọc Hóa Tử Sa',
    lustreLevel: 'Bóng Ngọc Thạch 92%',
    teaBrewCount: '1.000+ Tuần Trà Lão Phổ Nhĩ',
    tactileFeel: 'Trơn mịn như ngọc mỡ cừu (Dương Chi Bạch Ngọc), nước dội vào lập tức trôi tuột',
    colorTone: '#e3b259',
    glowOpacity: 0.65,
    description: 'Đỉnh cao của nghệ thuật dưỡng ấm: Lớp bao tương (patina) tự nhiên phủ kín bề mặt như lớp men ngọc trong suốt. Cầm ấm trên tay cảm giác đằm sâu, toát hương trà cổ thụ ngát bay.',
  },
}

export function ArtisanDuanniZishaTeapotAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [patinaStage, setPatinaStage] = useState<TeapotPatinaStage>('three-year-jade')
  const [rotationAngle, setRotationAngle] = useState<number>(45)
  const [isMicroscopeActive, setIsMicroscopeActive] = useState<boolean>(false)
  const [isPouringWater, setIsPouringWater] = useState<boolean>(false)
  const [pourResultCutoff, setPourResultCutoff] = useState<boolean>(false)

  // Customization Form State
  const [teaCapacity, setTeaCapacity] = useState('180')
  const [engravedPoem, setEngravedPoem] = useState('thinh-vu')
  const [customSealName, setCustomSealName] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [orderSent, setOrderSent] = useState(false)

  // Web Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null)

  function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Sound: Ceramic zisha lid touch & water spout cutoff
  const playZishaAcoustic = (type: 'lid' | 'pour' | 'cutoff') => {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    if (type === 'lid') {
      // Crisp metallic ceramic chime characteristic of high-iron duanni clay
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(3200, now)
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.18)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.35)
    } else if (type === 'pour') {
      // Water pouring resonance
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.linearRampToValueAtTime(580, now + 0.8)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.85)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.85)
    } else if (type === 'cutoff') {
      // Crisp clean water snap cutoff
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1850, now)
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.1)
    }
  }

  // Trigger Spout Demonstration
  const testWaterStream = () => {
    if (isPouringWater) return
    setIsPouringWater(true)
    setPourResultCutoff(false)
    playZishaAcoustic('pour')

    setTimeout(() => {
      setIsPouringWater(false)
      setPourResultCutoff(true)
      playZishaAcoustic('cutoff')
      setTimeout(() => setPourResultCutoff(false), 2400)
    }, 1200)
  }

  const currentInfo = PATINA_STAGES[patinaStage]

  return (
    <section className={cn('relative py-24 bg-[#0d0f0c] text-[#f7f4ea] overflow-hidden border-t border-b border-[#282d24]', className)}>
      {/* Background Subtle Tea Mist & Clay Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a2d1d] via-[#12160f] to-[#0a0d09]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e2318] border border-[#37402c] text-[#d4a359] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d4a359] animate-pulse" />
            Nghệ Thuật Trà Đạo Tử Sa Đoạn Nê
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fcf9f2] tracking-tight leading-tight">
            Ấm Tử Sa Đoạn Nê Hoàng Long Sơn <br className="hidden sm:inline" />
            <span className="italic font-light text-[#d4a359]">Khắc Thơ Cổ Bản & Dấu Triện GuHomes</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a9b59e] leading-relaxed">
            Được chế tác từ quặng Đoạn Nê nguyên khoáng ủ ẩm 20 năm tại Nghi Hưng, chiếc ấm sở hữu kết cấu mao dẫn khí khổng kép giữ trọn vẹn từng tầng hương vi tế của Nham Trà Vũ Di và Lão Trà Phổ Nhĩ. Nghệ nhân khắc thủ công bài thơ "Thính Vũ Trúc Hiên" cùng dấu triện bảo chứng <span className="font-mono text-[#d4a359]">GU-ZISHA-2026-X</span>.
          </p>
        </div>

        {/* Master Interactive Atelier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 360° Teapot Viewer & 20x Mineral Microscope (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#151a12] to-[#0e120c] border border-[#2b3524] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Virtual Stage Viewport */}
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-[#090c08] border border-[#212a1c] flex flex-col justify-between p-6">
                {/* Simulated Ambient Lighting & Ceramic Patina Lustre */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
                  animate={{
                    opacity: [currentInfo.glowOpacity, currentInfo.glowOpacity + 0.15, currentInfo.glowOpacity],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: `radial-gradient(circle at 45% 35%, rgba(227, 178, 89, ${currentInfo.glowOpacity}) 0%, transparent 65%)`,
                  }}
                />

                {/* Top Atelier Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tracking-widest text-[#a8b79b] uppercase">Góc Nhìn 3D</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1f2818] text-[#d4a359] border border-[#344429]">
                      {rotationAngle}°
                    </span>
                  </div>

                  {/* Microscope Mode Switch */}
                  <button
                    type="button"
                    onClick={() => setIsMicroscopeActive(!isMicroscopeActive)}
                    className={cn(
                      'min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 border',
                      isMicroscopeActive
                        ? 'bg-[#d4a359]/20 border-[#d4a359] text-[#fff6e0]'
                        : 'bg-[#181f14] border-[#293621] text-[#9db08f] hover:border-[#d4a359]'
                    )}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    {isMicroscopeActive ? 'Tắt Kính Hiển Vi' : 'Kính Hiển Vi 20x Soi Khoáng'}
                  </button>
                </div>

                {/* Center Teapot Visual Representation */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  {isMicroscopeActive ? (
                    /* 20x Microscope Zoom View */
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative w-56 h-56 rounded-full border-2 border-[#d4a359] overflow-hidden bg-[#1b1e15] shadow-[0_0_30px_rgba(212,163,89,0.3)] flex items-center justify-center p-4 text-center"
                    >
                      <div 
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage: `radial-gradient(circle at 20% 30%, #e3b259 2px, transparent 2px), radial-gradient(circle at 70% 80%, #7d6537 3px, transparent 3px), radial-gradient(circle at 40% 70%, #fff 1px, transparent 1px)`,
                          backgroundSize: '18px 18px',
                        }}
                      />
                      <div className="relative z-10 text-xs text-[#f4eedb] space-y-1">
                        <div className="font-mono text-[#d4a359] font-bold text-sm tracking-wider">PHÓNG ĐẠI 20X</div>
                        <p className="text-[11px] text-[#cfdec0] leading-tight">
                          Hạt thạch anh vi lượng & Khí khổng kép (Double Pores) thông khí không thấm nước.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    /* Normal 3D Rotation Teapot Silhouette */
                    <motion.div
                      style={{ rotate: rotationAngle }}
                      className="relative w-48 h-36 flex items-center justify-center cursor-grab active:cursor-grabbing"
                    >
                      {/* Teapot Vector Silhouette Graphic */}
                      <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-[0_15px_20px_rgba(0,0,0,0.7)]">
                        {/* Spout */}
                        <path
                          d="M 50 80 C 25 75 10 50 20 40 C 24 36 32 45 45 65 Z"
                          fill={currentInfo.colorTone}
                          stroke="#725526"
                          strokeWidth="2"
                        />
                        {/* Body */}
                        <path
                          d="M 45 70 C 45 125 155 125 155 70 C 155 50 140 45 100 45 C 60 45 45 50 45 70 Z"
                          fill={currentInfo.colorTone}
                          stroke="#725526"
                          strokeWidth="2.5"
                        />
                        {/* Lid */}
                        <ellipse
                          cx="100"
                          cy="45"
                          rx="36"
                          ry="10"
                          fill={currentInfo.colorTone}
                          stroke="#725526"
                          strokeWidth="2"
                        />
                        {/* Knob */}
                        <circle
                          cx="100"
                          cy="32"
                          r="7"
                          fill={currentInfo.colorTone}
                          stroke="#725526"
                          strokeWidth="2"
                        />
                        {/* Handle */}
                        <path
                          d="M 155 55 C 190 55 185 110 150 105 C 155 98 170 95 168 65 C 166 58 158 57 155 55 Z"
                          fill={currentInfo.colorTone}
                          stroke="#725526"
                          strokeWidth="2"
                        />
                        {/* Engraved Poem in Chinese Script Simulation */}
                        <text
                          x="95"
                          y="85"
                          textAnchor="middle"
                          fill="#4f3815"
                          fontSize="9"
                          fontFamily="serif"
                          fontStyle="italic"
                          letterSpacing="2"
                        >
                          聽雨竹軒
                        </text>
                        {/* GuHomes Seal Stamp */}
                        <rect
                          x="92"
                          y="92"
                          width="14"
                          height="14"
                          fill="#a83232"
                          rx="1"
                        />
                        <text
                          x="99"
                          y="102"
                          textAnchor="middle"
                          fill="#fff"
                          fontSize="6"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          GU
                        </text>
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Bottom Control Bar: Water Pouring & Lid Acoustic Test */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#20291a] bg-[#0c100a]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => playZishaAcoustic('lid')}
                      className="min-h-[44px] px-3.5 py-1.5 rounded-lg bg-[#1a2215] border border-[#2e3b25] text-[#d4a359] text-xs font-mono hover:bg-[#25311e] transition-colors"
                      title="Gõ nắp ấm nghe tiếng thanh như chuông kim loại đặc trưng của Đoạn Nê giàu khoáng"
                    >
                      Âm Gõ Tử Sa
                    </button>

                    <button
                      type="button"
                      onClick={testWaterStream}
                      disabled={isPouringWater}
                      className={cn(
                        'min-h-[44px] px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 border flex items-center gap-2',
                        isPouringWater
                          ? 'bg-[#d4a359]/20 border-[#d4a359] text-[#fff]'
                          : 'bg-[#1e2719] border-[#334227] text-[#c9dcbb] hover:border-[#d4a359]'
                      )}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2c-5.33 6.67-8 10.67-8 14 0 4.42 3.58 8 8 8s8-3.58 8-8c0-3.33-2.67-7.33-8-14zm0 18c-3.31 0-6-2.69-6-6 0-2.31 1.9-5.46 6-10.22 4.1 4.76 6 7.91 6 10.22 0 3.31-2.69 6-6 6z" />
                      </svg>
                      {isPouringWater ? 'Đang Rót Nước...' : 'Thử Dòng Rót Dứt Khoát'}
                    </button>
                  </div>

                  {pourResultCutoff && (
                    <span className="text-xs font-mono text-[#78d672] animate-bounce">
                      ✓ Ngắt Nước Chuẩn Tuyệt Đối (Không Rớt Giọt)
                    </span>
                  )}
                </div>
              </div>

              {/* 360 Degree Rotation Slider */}
              <div className="pt-4">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#8e9e80]">Xoay 360° Khám Phá Mọi Góc Ấm</span>
                  <span className="text-[#d4a359] font-bold">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#1b2216] rounded-lg appearance-none cursor-pointer accent-[#d4a359]"
                  aria-label="Xoay góc ấm tử sa 360 độ"
                />
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-[#11160e] border border-[#232d1d]">
                  <span className="text-[10px] text-[#7d8f6f] block uppercase tracking-wider font-mono">Quặng Khoáng</span>
                  <span className="text-sm font-semibold text-[#f7f4ea]">Đoạn Nê Vàng</span>
                  <span className="text-[10px] text-[#5d6f51] block mt-0.5">Mỏ Hoàng Long Sơn 20 năm</span>
                </div>
                <div className="p-3 rounded-xl bg-[#11160e] border border-[#232d1d]">
                  <span className="text-[10px] text-[#7d8f6f] block uppercase tracking-wider font-mono">Độ Thấu Khí</span>
                  <span className="text-sm font-semibold text-[#d4a359]">Khí Khổng Kép</span>
                  <span className="text-[10px] text-[#5d6f51] block mt-0.5">Dưỡng hương trà 7 ngày</span>
                </div>
                <div className="p-3 rounded-xl bg-[#11160e] border border-[#232d1d]">
                  <span className="text-[10px] text-[#7d8f6f] block uppercase tracking-wider font-mono">Nhiệt Độ Nung</span>
                  <span className="text-sm font-semibold text-[#f7f4ea]">1.180°C</span>
                  <span className="text-[10px] text-[#5d6f51] block mt-0.5">Lò củi Long Diêu cổ</span>
                </div>
                <div className="p-3 rounded-xl bg-[#11160e] border border-[#232d1d]">
                  <span className="text-[10px] text-[#7d8f6f] block uppercase tracking-wider font-mono">Mã Khắc Triện</span>
                  <span className="text-xs font-mono font-bold text-[#c29b62]">GU-ZISHA-2026</span>
                  <span className="text-[10px] text-[#5d6f51] block mt-0.5">Độc bản có giấy chứng nhận</span>
                </div>
              </div>
            </div>

            {/* Rationale on Tea Compatibility */}
            <div className="p-6 rounded-2xl bg-[#12160f] border border-[#26311f] text-sm text-[#9fad92] space-y-3">
              <h3 className="text-base font-serif text-[#fcf9f2] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#d4a359] rounded-full" />
                Sự Tương Thích Hoàn Hảo Với Nham Trà Vũ Di & Lão Trà Phổ Nhĩ
              </h3>
              <p className="leading-relaxed">
                Đất Đoạn Nê sở hữu hàm lượng thạch anh vi thể cao và độ rỗng thể tích lớn hơn các dòng Tử Nê hay Chu Nê. Nhờ đó, ấm hạ nhiệt nhẹ nhàng nhưng giữ hơi cực lâu, triệt tiêu vị chát gắt ban đầu của lá trà ô long lên men nặng, tôn vinh trọn vẹn hậu vị ngọt sâu (hồi cam) và hương khoáng Nham Vận (Yan Yun) đặc trưng của dãy núi Vũ Di.
              </p>
            </div>
          </div>

          {/* Right Column: Patina Simulator & Custom Engraving Atelier (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Patina Age Progression Selector */}
            <div className="rounded-2xl bg-[#151a12] border border-[#2b3524] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#8e9e80]">
                Tiến Trình Dưỡng Ấm & Độ Bóng Ngọc (Patina Lustre)
              </h3>

              <div className="space-y-3">
                {(Object.keys(PATINA_STAGES) as TeapotPatinaStage[]).map((stageKey) => {
                  const stage = PATINA_STAGES[stageKey]
                  const isSelected = patinaStage === stageKey
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setPatinaStage(stageKey)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#1f2719] border-[#d4a359] shadow-[0_0_15px_rgba(212,163,89,0.15)]'
                          : 'bg-[#10140d] border-[#222b1c] hover:border-[#344229]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fcf9f2] font-semibold' : 'text-[#cfdec0]')}>
                          {stage.title}
                        </span>
                        <span className="text-xs font-mono text-[#d4a359] font-bold">
                          {stage.lustreLevel}
                        </span>
                      </div>
                      <span className="text-xs text-[#809470] mt-1">{stage.subtitle}</span>
                      <p className="text-xs text-[#a0b093] mt-2 line-clamp-2 leading-relaxed">
                        {stage.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bespoke Customization & Engraving Order Form */}
            <div className="rounded-2xl bg-[#151a12] border border-[#2b3524] p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-wider font-mono text-[#8e9e80]">
                  May Đo Khắc Thơ & Triện Gia Huy
                </h3>
                <span className="text-xs font-mono text-[#d4a359]">Nghệ Nhân Khắc Chữ Khảo Cổ</span>
              </div>

              {orderSent ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#d4a359]/20 border border-[#d4a359] flex items-center justify-center text-[#d4a359] text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg text-[#fcf9f2]">Bản Vẽ Khắc Đã Được Tiếp Nhận</h4>
                  <p className="text-xs text-[#9fad92] leading-relaxed">
                    Nghệ nhân gọt tỉa ấm GuHomes sẽ phác thảo bản rập triện cho quý trà nhân {clientName || ''} và liên hệ qua số {clientPhone || ''} trước khi bắt đầu hạ dao nung ấm.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOrderSent(false)}
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-[#1c2317] border border-[#37462a] text-[#d4a359] text-xs font-mono uppercase"
                  >
                    Tạo Yêu Cầu Khắc Mới
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`${formId}-capacity`} className="block text-xs font-mono text-[#8e9e80] mb-1">
                        Dung Tích Ấm (ml)
                      </label>
                      <select
                        id={`${formId}-capacity`}
                        value={teaCapacity}
                        onChange={(e) => setTeaCapacity(e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c100a] border border-[#232c1c] text-[#f7f4ea] text-xs font-mono focus:border-[#d4a359] focus:outline-none"
                      >
                        <option value="120">120ml (Đơn Ẩm · 1 Người)</option>
                        <option value="180">180ml (Đối Ẩm · 2 Người)</option>
                        <option value="240">240ml (Tam Ẩm · 3-4 Người)</option>
                        <option value="320">320ml (Quần Ẩm · Trà Đạo Tiệc)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-poem`} className="block text-xs font-mono text-[#8e9e80] mb-1">
                        Bài Thơ Khắc Thân Ấm
                      </label>
                      <select
                        id={`${formId}-poem`}
                        value={engravedPoem}
                        onChange={(e) => setEngravedPoem(e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c100a] border border-[#232c1c] text-[#f7f4ea] text-xs focus:border-[#d4a359] focus:outline-none"
                      >
                        <option value="thinh-vu">Thính Vũ Trúc Hiên (Nghe Mưa Rơi)</option>
                        <option value="han-thuyen">Hàn Thuyên Trà Thoại (Tri Ân)</option>
                        <option value="tinh-tam">Tĩnh Tâm Dưỡng Tính</option>
                        <option value="custom">Tự Đề Thơ Cổ Theo Yêu Cầu</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-seal`} className="block text-xs font-mono text-[#8e9e80] mb-1">
                      Chữ Triện Khắc Đáy Ấm (Dòng Họ / Tên Trà Nhân)
                    </label>
                    <input
                      id={`${formId}-seal`}
                      type="text"
                      value={customSealName}
                      onChange={(e) => setCustomSealName(e.target.value)}
                      placeholder="Ví dụ: Trần Gia Trà Viện, An Cư Lạc Nghiệp..."
                      className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c100a] border border-[#232c1c] text-[#f7f4ea] text-xs focus:border-[#d4a359] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-xs font-mono text-[#8e9e80] mb-1">
                        Tên Trà Nhân *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nguyễn Tuấn Anh"
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c100a] border border-[#232c1c] text-[#f7f4ea] text-xs focus:border-[#d4a359] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-phone`} className="block text-xs font-mono text-[#8e9e80] mb-1">
                        Số Điện Thoại *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="0912 xxx xxx"
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c100a] border border-[#232c1c] text-[#f7f4ea] text-xs font-mono focus:border-[#d4a359] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#b8863b] text-[#12160f] font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:brightness-110 shadow-lg mt-2"
                  >
                    Đặt May Đo Độc Bản & Phác Thảo Triện
                  </button>
                </form>
              )}
            </div>

            {/* Atelier Contact & Trust Badge */}
            <div className="p-4 rounded-2xl bg-[#12170f] border border-[#232c1c] text-xs text-[#8e9e80] flex items-center justify-between">
              <div>
                <span className="text-[#fcf9f2] font-serif block">GuHomes Atelier Trà Đạo</span>
                <span className="text-[11px] text-[#6d7e60]">Xưởng Mộc & Chế Tác Thạnh Xuân Q.12</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#d4a359] font-mono hover:underline min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
