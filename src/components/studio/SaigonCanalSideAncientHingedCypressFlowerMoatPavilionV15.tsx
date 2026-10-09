'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedCypressFlowerMoatPavilionV15() {
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

      // Solfeggio 528Hz (Tần số phục hồi sinh học)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc1Ref.current = osc1

      // Hòa âm 432Hz (Tần số tự nhiên an yên)
      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(432, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      osc2Ref.current = osc2
    } catch {
      // Audio autoplay restrictions catch
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
      value: '-14.7°C',
      subtext: 'So với nhiệt độ ven kênh',
      detail: 'Hào sen bách thảo tuần hoàn 154m kết hợp tán Tùng La Hán cổ thụ 605 năm tạo lớp vi khí hậu đối lưu liên tục.'
    },
    {
      label: 'Vận Tốc Gió Đối Lưu',
      value: '8.7 m/s',
      subtext: 'Gió Nam - Đông Nam mát lành',
      detail: 'Hệ cửa cối xoay mộng âm dương mở rộng 270 độ đón trọn khí tươi mặt nước mà không cần năng lượng điều hòa.'
    },
    {
      label: 'Hoàng Đàn Tuyết Lạng Sơn',
      value: '595 Năm',
      subtext: 'Rừng nguyên sinh đại thụ',
      detail: 'Gỗ Hoàng Đàn Tuyết kết tinh tuyết óng ánh tự nhiên, giàu tinh dầu thơm thánh khiết, kháng ẩm 80% RH vượt trội.'
    },
    {
      label: 'Bonsai Tùng La Hán',
      value: '605 Năm',
      subtext: 'Thế Trực Quân Tử kiên cường',
      detail: 'Kiệt tác Bonsai bách niên truyền đời với thân trực vững chãi, cành nhánh tầng lớp cân bằng âm dương phong thủy.'
    }
  ]

  const pavilionFacets = [
    {
      name: 'Kiến Trúc Cửa Cối Xoay Mộng Gỗ 270°',
      desc: 'Toàn bộ hệ khung gỗ Hoàng Đàn Tuyết 595 năm tuổi được liên kết bằng mộng nêm truyền thống không sử dụng đinh ốc kim loại. Cửa mở góc 270 độ đón trọn làn gió mát dọc kênh rạch Sài Gòn.',
      spec: 'Cấu kiện Hoàng Đàn Tuyết Lạng Sơn, tỷ trọng 0.85 g/cm³, lên tuyết tự nhiên'
    },
    {
      name: 'Hào Nước Sen Bách Thảo Tuần Hoàn 154m',
      desc: 'Bao bọc thủy đình là hào sen Bách Thảo với hệ vi sinh thực vật lọc nước tự nhiên, tạo dòng đối lưu làm mát thụ động liên tục 24/7 cho toàn bộ không gian thưởng trà.',
      spec: 'Lưu lượng tuần hoàn 46 m³/h, nhiệt độ bề mặt nước duy trì 22.6°C'
    },
    {
      name: 'Bonsai Tùng La Hán Trực Quân Tử 605 Năm',
      desc: 'Bệ xoay Bonsai chế tác từ đá bazan nguyên khối, hỗ trợ điều chỉnh góc đón nắng và gió hoàn hảo cho kiệt tác Tùng La Hán 605 năm tuổi dáng Trực uy nghi.',
      spec: 'Bệ xoay cơ học 360°, tải trọng 4.0 tấn, chuyển động êm ái tuyệt đối'
    }
  ]

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0D0C] py-20 md:py-32 text-[#EAE5D9]">
      {/* Background Ambience */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(68, 108, 90, 0.25) 0%, rgba(10, 13, 12, 0.95) 75%)`
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#8CB39F] mb-3">
            Kiệt Tác Kiến Trúc Vi Khí Hậu Kênh Rạch · Phiên Bản V15
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#F4F1EA] tracking-tight leading-tight">
            Thủy Đình Hoàng Đàn Tuyết Cổ Thụ 595 Năm & Hào Bonsai Tùng La Hán V15
          </h2>
          <div className="w-16 h-px bg-[#8E7958] mx-auto my-6 opacity-60" />
          <p className="text-base sm:text-lg text-[#C5BFA8] font-light leading-relaxed">
            Thiết kế dành riêng cho các tư gia ven sông Sài Gòn. Tận dụng tối đa gió kênh rạch tự nhiên, cấu trúc mộng gỗ Hoàng Đàn Tuyết 595 năm tuổi kết hợp hào sen bách thảo tuần hoàn hạ nhiệt thực tế tới -14.7°C mà không dùng năng lượng cưỡng bức.
          </p>
        </div>

        {/* Interactive Controls & Pavilion Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Visualizer Panel */}
          <div className="lg:col-span-8 bg-[#121815] rounded-2xl p-6 sm:p-8 border border-[#273830] shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#212E28]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8E7958]">Mô Phỏng Không Gian Động</span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F4F1EA]">Hệ Cửa Cối & Dòng Chảy Vi Khí Hậu</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  aria-label="Kích hoạt âm thanh Solfeggio 528Hz & 432Hz"
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                    soundscapeActive
                      ? 'bg-[#40705B] text-white border-[#569479] shadow-lg shadow-[#40705B]/30'
                      : 'bg-[#19241F] text-[#8CB39F] border-[#293B33] hover:border-[#40705B]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${soundscapeActive ? 'bg-[#98D8AA] animate-pulse' : 'bg-[#556959]'}`} />
                  {soundscapeActive ? 'Âm Thanh 528Hz + 432Hz (Đang Phát)' : 'Bật Âm Thanh Thư Giãn'}
                </button>
              </div>
            </div>

            {/* Central Graphic Simulation */}
            <div className="relative aspect-[16/10] my-8 rounded-xl bg-[#0D1411] border border-[#1E2B25] overflow-hidden flex items-center justify-center">
              {/* Moat Water Flow Waves */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="moatGradCypressV15" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#40705B" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#14211B" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <circle cx="50%" cy="50%" r="42%" fill="none" stroke="url(#moatGradCypressV15)" strokeWidth="48" strokeDasharray="6 8" />
                  <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#569479" strokeOpacity="0.25" strokeWidth="2" />
                </svg>
              </div>

              {/* Pavilion Structural Plan & Hinge Angle Motion */}
              <motion.div 
                className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-[#8E7958]/40 bg-[#16201B]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 shadow-2xl"
                animate={{ rotate: (hingeAngle - 180) / 4 }}
                transition={{ type: 'spring', stiffness: 45, damping: 15 }}
              >
                <div className="text-center">
                  <div className="text-xs uppercase tracking-widest text-[#8CB39F] mb-1">Góc Cửa Cối</div>
                  <div className="text-3xl sm:text-4xl font-serif text-[#F4F1EA] font-semibold">{hingeAngle}°</div>
                  <div className="text-[11px] text-[#8E7958] mt-1 font-mono">Gió Đón: 8.7 m/s</div>
                  <div className="text-[10px] text-[#8CB39F]/70 mt-2">Hạ nhiệt: -14.7°C</div>
                </div>
              </motion.div>

              {/* Bonsai Position Marker */}
              <div className="absolute top-6 right-8 text-right bg-[#16201B]/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#273830]">
                <div className="text-[10px] text-[#8CB39F] uppercase tracking-wider">Bonsai 605 Năm</div>
                <div className="text-xs font-serif text-[#EAE5D9]">Tùng La Hán Trực Quân Tử</div>
              </div>

              {/* Moat Temperature Tag */}
              <div className="absolute bottom-6 left-8 bg-[#16201B]/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#273830]">
                <div className="text-[10px] text-[#8CB39F] uppercase tracking-wider">Hào Sen 154m</div>
                <div className="text-xs font-mono text-[#98D8AA]">22.6°C · Tuần Hoàn Liên Tục</div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#212E28]">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="hinge-slider" className="text-xs text-[#C5BFA8] uppercase tracking-wider">
                    Góc Mở Cửa Cối Mộng Gỗ: <span className="text-[#F4F1EA] font-semibold">{hingeAngle}°</span>
                  </label>
                  <span className="text-xs text-[#8E7958] font-mono">0° - 270°</span>
                </div>
                <input
                  id="hinge-slider"
                  type="range"
                  min="0"
                  max="270"
                  step="5"
                  value={hingeAngle}
                  onChange={(e) => setHingeAngle(Number(e.target.value))}
                  className="w-full h-2 bg-[#1E2B25] rounded-lg appearance-none cursor-pointer accent-[#40705B]"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setMoatFlowActive(!moatFlowActive)}
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 border ${
                    moatFlowActive
                      ? 'bg-[#182921] text-[#98D8AA] border-[#315243]'
                      : 'bg-[#131D18] text-[#83968C] border-[#22332A]'
                  }`}
                >
                  {moatFlowActive ? 'Hào Nước: Đang Tuần Hoàn' : 'Hào Nước: Tĩnh Lặng'}
                </button>
                <button
                  type="button"
                  onClick={() => setHingeAngle(270)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs tracking-wider bg-[#19241F] text-[#8CB39F] border border-[#293B33] hover:border-[#40705B] transition-all"
                >
                  Mở Tối Đa 270°
                </button>
              </div>
            </div>
          </div>

          {/* Facets Selector Panel */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#8E7958] block mb-2">Chi Tiết Cấu Kiện Nghệ Thuật</span>
            {pavilionFacets.map((facet, idx) => (
              <div
                key={facet.name}
                onClick={() => setSelectedFacetIndex(idx)}
                className={`cursor-pointer rounded-xl p-5 border transition-all duration-300 ${
                  selectedFacetIndex === idx
                    ? 'bg-[#1A2621] border-[#40705B] shadow-lg'
                    : 'bg-[#121815]/80 border-[#202E27] hover:border-[#31473C]'
                }`}
              >
                <h4 className={`text-base font-serif font-medium mb-1 ${selectedFacetIndex === idx ? 'text-[#F4F1EA]' : 'text-[#C5BFA8]'}`}>
                  {facet.name}
                </h4>
                <p className="text-xs text-[#95A89E] leading-relaxed mb-3">
                  {facet.desc}
                </p>
                <div className="text-[11px] font-mono text-[#8E7958] bg-[#0D1411] px-2.5 py-1 rounded inline-block">
                  {facet.spec}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div 
              key={metric.label}
              className="bg-[#121815] rounded-xl p-6 border border-[#202E27] relative group hover:border-[#40705B] transition-all duration-300"
            >
              <div className="text-xs uppercase tracking-wider text-[#8E7958] mb-1">{metric.label}</div>
              <div className="text-3xl font-serif font-semibold text-[#F4F1EA] mb-1">{metric.value}</div>
              <div className="text-xs text-[#8CB39F] font-medium mb-3">{metric.subtext}</div>
              <p className="text-xs text-[#86998E] leading-relaxed border-t border-[#1C2822] pt-3">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-[#758A7E] max-w-2xl mx-auto font-light leading-relaxed">
          Mỗi cấu kiện thủy đình được thiết kế may đo độc bản bởi đội ngũ Kiến trúc sư GuHomes, kiểm định khả năng thích ứng với biên độ nhiệt và gió mùa Tây Nam - Đông Bắc của vùng đất phương Nam.
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedCypressFlowerMoatPavilionV15
