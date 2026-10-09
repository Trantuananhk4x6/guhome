'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV16() {
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
      value: '-14.6°C',
      subtext: 'So với nhiệt độ kênh rạch',
      detail: 'Hào hoa sen bách thảo tuần hoàn 152m kết hợp tán Đa Búp Đỏ cổ thụ 610 năm tạo lớp đệm vi khí hậu đối lưu liên tục.'
    },
    {
      label: 'Vận Tốc Gió Đối Lưu',
      value: '8.6 m/s',
      subtext: 'Gió Nam - Đông Nam tự nhiên',
      detail: 'Hệ cửa cối xoay mộng âm dương mở rộng 270 độ hút trọn khí mát lành trên mặt nước không cần điều hòa.'
    },
    {
      label: 'Độ Bền Gỗ Long Não',
      value: '600 Năm',
      subtext: 'Rừng già Tây Bắc thượng hạng',
      detail: 'Gỗ Long Não đại ngàn giàu tinh dầu chống nấm mốc, kháng ẩm 80% RH tuyệt hảo giữa lòng Sài Gòn.'
    },
    {
      label: 'Bonsai Đa Búp Đỏ',
      value: '610 Năm',
      subtext: 'Thế Ngũ Phúc Lâm Môn bách đại',
      detail: 'Tác phẩm Bonsai bách niên truyền đời với 5 tán vươn đón sinh khí phong thủy, cân bằng ngũ hành thịnh vượng.'
    }
  ]

  const pavilionFacets = [
    {
      name: 'Kiến Trúc Cửa Cối Xoay Mộng Gỗ 270°',
      desc: 'Toàn bộ khung cửa gỗ Long Não 600 năm tuổi được liên kết bằng mộng nêm truyền thống không sử dụng đinh ốc kim loại. Cửa mở góc 270 độ đón trọn làn gió mát thổi dọc kênh rạch Sài Gòn.',
      spec: 'Cấu kiện Long Não Tây Bắc, tỷ trọng 0.72 g/cm³, tinh dầu thanh lọc tự nhiên'
    },
    {
      name: 'Hào Nước Sen Bách Thảo Tuần Hoàn 152m',
      desc: 'Bao bọc thủy đình là hào sen Bách Thảo với hệ vi sinh thực vật lọc nước tự nhiên, tạo dòng đối lưu làm mát thụ động liên tục 24/7 cho toàn bộ không gian thưởng trà.',
      spec: 'Lưu lượng tuần hoàn 45 m³/h, nhiệt độ bề mặt nước duy trì 22.8°C'
    },
    {
      name: 'Bonsai Đa Búp Đỏ Ngũ Phúc Lâm Môn 610 Năm',
      desc: 'Bệ xoay Bonsai chế tác từ đá bazan nguyên khối, hỗ trợ điều chỉnh góc đón nắng và gió hoàn hảo cho kiệt tác Đa Búp Đỏ 610 năm tuổi dáng Ngũ Phúc trường tồn.',
      spec: 'Bệ xoay cơ học 360°, tải trọng 3.8 tấn, chuyển động êm ái tuyệt đối'
    }
  ]

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0D0B] py-20 md:py-32 text-[#EAE5D9]">
      {/* Background Ambience */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(76, 110, 85, 0.25) 0%, rgba(10, 13, 11, 0.95) 75%)`
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#A3B899] mb-3">
            Kiệt Tác Kiến Trúc Vi Khí Hậu Kênh Rạch · Phiên Bản V16
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#F4F1EA] tracking-tight leading-tight">
            Thủy Đình Gỗ Long Não Cổ Thụ 600 Năm & Hào Bonsai Đa Búp Đỏ Ngũ Phúc V16
          </h2>
          <div className="w-16 h-px bg-[#8E7958] mx-auto my-6 opacity-60" />
          <p className="text-base sm:text-lg text-[#C5BFA8] font-light leading-relaxed">
            Thiết kế dành riêng cho các tư gia ven sông Sài Gòn. Tận dụng tối đa gió kênh rạch tự nhiên, cấu trúc mộng gỗ Long Não 600 năm tuổi kết hợp hào nước sen bách thảo hạ nhiệt thực tế tới -14.6°C mà không dùng năng lượng cưỡng bức.
          </p>
        </div>

        {/* Interactive Controls & Pavilion Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Visualizer Panel */}
          <div className="lg:col-span-8 bg-[#121713] rounded-2xl p-6 sm:p-8 border border-[#2B352C] shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#252E26]">
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
                      ? 'bg-[#4C6E55] text-white border-[#659170] shadow-lg shadow-[#4C6E55]/30'
                      : 'bg-[#1C241E] text-[#A3B899] border-[#2E3C31] hover:border-[#4C6E55]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${soundscapeActive ? 'bg-[#98D8AA] animate-pulse' : 'bg-[#556959]'}`} />
                  {soundscapeActive ? 'Âm Thanh 528Hz + 432Hz (Đang Phát)' : 'Bật Âm Thanh Thư Giãn'}
                </button>
              </div>
            </div>

            {/* Central Graphic Simulation */}
            <div className="relative aspect-[16/10] my-8 rounded-xl bg-[#0E1310] border border-[#232C24] overflow-hidden flex items-center justify-center">
              {/* Moat Water Flow Waves */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="moatGradV16" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4C6E55" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1A241C" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <circle cx="50%" cy="50%" r="42%" fill="none" stroke="url(#moatGradV16)" strokeWidth="48" strokeDasharray="6 8" />
                  <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#659170" strokeOpacity="0.25" strokeWidth="2" />
                </svg>
              </div>

              {/* Pavilion Structural Plan & Hinge Angle Motion */}
              <motion.div 
                className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-[#8E7958]/40 bg-[#161D18]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 shadow-2xl"
                animate={{ rotate: (hingeAngle - 180) / 4 }}
                transition={{ type: 'spring', stiffness: 45, damping: 15 }}
              >
                <div className="text-center">
                  <div className="text-xs uppercase tracking-widest text-[#A3B899] mb-1">Góc Cửa Cối</div>
                  <div className="text-3xl sm:text-4xl font-serif text-[#F4F1EA] font-semibold">{hingeAngle}°</div>
                  <div className="text-[11px] text-[#8E7958] mt-1 font-mono">Gió Đón: 8.6 m/s</div>
                  <div className="text-[10px] text-[#A3B899]/70 mt-2">Hạ nhiệt: -14.6°C</div>
                </div>
              </motion.div>

              {/* Bonsai Position Marker */}
              <div className="absolute top-6 right-8 text-right bg-[#161D18]/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#2B352C]">
                <div className="text-[10px] text-[#A3B899] uppercase tracking-wider">Bonsai 610 Năm</div>
                <div className="text-xs font-serif text-[#EAE5D9]">Đa Búp Đỏ Ngũ Phúc</div>
              </div>

              {/* Moat Temperature Tag */}
              <div className="absolute bottom-6 left-8 bg-[#161D18]/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#2B352C]">
                <div className="text-[10px] text-[#A3B899] uppercase tracking-wider">Hào Sen 152m</div>
                <div className="text-xs font-mono text-[#98D8AA]">22.8°C · Lưu Thông 24/7</div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#252E26]">
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
                  className="w-full h-2 bg-[#232C24] rounded-lg appearance-none cursor-pointer accent-[#4C6E55]"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setMoatFlowActive(!moatFlowActive)}
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 border ${
                    moatFlowActive
                      ? 'bg-[#1D2B20] text-[#98D8AA] border-[#37523C]'
                      : 'bg-[#161D18] text-[#8A968C] border-[#2B352C]'
                  }`}
                >
                  {moatFlowActive ? 'Hào Nước: Đang Tuần Hoàn' : 'Hào Nước: Tĩnh Lặng'}
                </button>
                <button
                  type="button"
                  onClick={() => setHingeAngle(270)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs tracking-wider bg-[#1C241E] text-[#A3B899] border border-[#2E3C31] hover:border-[#4C6E55] transition-all"
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
                    ? 'bg-[#18201A] border-[#4C6E55] shadow-lg'
                    : 'bg-[#121713]/80 border-[#232C24] hover:border-[#384639]'
                }`}
              >
                <h4 className={`text-base font-serif font-medium mb-1 ${selectedFacetIndex === idx ? 'text-[#F4F1EA]' : 'text-[#C5BFA8]'}`}>
                  {facet.name}
                </h4>
                <p className="text-xs text-[#9DA79C] leading-relaxed mb-3">
                  {facet.desc}
                </p>
                <div className="text-[11px] font-mono text-[#8E7958] bg-[#0E1310] px-2.5 py-1 rounded inline-block">
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
              className="bg-[#121713] rounded-xl p-6 border border-[#232C24] relative group hover:border-[#4C6E55] transition-all duration-300"
            >
              <div className="text-xs uppercase tracking-wider text-[#8E7958] mb-1">{metric.label}</div>
              <div className="text-3xl font-serif font-semibold text-[#F4F1EA] mb-1">{metric.value}</div>
              <div className="text-xs text-[#A3B899] font-medium mb-3">{metric.subtext}</div>
              <p className="text-xs text-[#8A968C] leading-relaxed border-t border-[#1F2720] pt-3">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-[#7C887E] max-w-2xl mx-auto font-light leading-relaxed">
          Mỗi cấu kiện thủy đình được thiết kế may đo độc bản bởi đội ngũ Kiến trúc sư GuHomes, kiểm định khả năng thích ứng với biên độ nhiệt và gió mùa Tây Nam - Đông Bắc của vùng đất phương Nam.
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV16
