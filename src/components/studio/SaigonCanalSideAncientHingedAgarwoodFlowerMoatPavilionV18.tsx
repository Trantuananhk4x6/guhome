'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV18() {
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
      label: 'Hạ Nhiệt Đối Lưu Vi Khí Hậu',
      value: '-15.6°C',
      subtext: 'Tuần hoàn hào sen bách thảo đa tầng & mặt nước tự nhiên',
      detail: 'Hệ thống hào sâu 1.9m kết hợp thảm thực vật thủy sinh bản địa giúp hạ nhiệt lõi không gian kiến trúc bền vững mà không cần năng lượng cưỡng bức.'
    },
    {
      label: 'Trầm Hương Khánh Hòa Cổ Thụ',
      value: '620 Năm',
      subtext: 'Aquilaria crassna tích tụ tinh dầu thơm hoàng gia',
      detail: 'Chất gỗ ngậm tinh dầu trầm đậm đặc, tỏa hương thanh tao dịu nhẹ tự nhiên khi gặp nắng ấm, kháng mối mọt và điều hòa độ ẩm 75-80% RH vùng sông nước.'
    },
    {
      label: 'Bản Lề Cối Âm Dương Cung Đình',
      value: `${hingeAngle}°`,
      subtext: 'Mộng gỗ then cài truyền thống mở rộng tối đa',
      detail: 'Cơ cấu then gỗ ngâm dầu lanh tự nhiên quay êm ái, đón trọn luồng gió mát 9.6 m/s từ kênh rạch, giải tỏa nhiệt bức xạ mặt trời hướng Tây Nam.'
    },
    {
      label: 'Bonsai Khế Gân Cổ Thụ V18',
      value: '635 Năm',
      subtext: 'Thế Phượng Vũ Cát Tường vương giả',
      detail: 'Khế gân cổ thụ truyền đời uốn lượn uyển chuyển như chim phượng múa lượn, thanh lọc bụi mịn, kích hoạt nguồn sinh khí thịnh vượng cho dinh thự.'
    }
  ]

  const facets = [
    {
      title: 'Trầm Hương Khánh Hòa 620 Năm & Mộng Khớp Cung Đình',
      tag: 'Kỹ Thuật Mộc Hoàng Gia',
      desc: 'Khung cột và vì kèo chế tác từ gỗ Trầm Hương rừng Khánh Hòa cổ thụ 620 năm tuổi. Mộng đuôi én và then cài âm dương kết nối khít khao, tự thích ứng với chu kỳ giãn nở nhiệt ẩm gió mùa phương Nam.'
    },
    {
      title: 'Hào Sen Tuần Hoàn & Đối Lưu Kênh Rạch Sài Gòn',
      tag: 'Vi Khí Hậu Tự Nhiên',
      desc: 'Nước từ hào sen Bách Diệp được dẫn lưu đối lưu tự nhiên qua gầm sàn gỗ, tạo nên màng vi khí hậu mát mẻ 24/7. Hơi nước bốc lên qua khe sàn gỗ Trầm Hương hòa quyện cùng hương thơm dịu ngọt giúp an định tâm trí.'
    },
    {
      title: 'Đại Thụ Bonsai Khế Gân Dáng Phượng Vũ Cát Tường',
      tag: 'Cảnh Quan Sinh Thái Thượng Thừa',
      desc: 'Cây thế Khế Gân 635 năm tuổi an vị trên bệ đá san hô hóa thạch tự nhiên giữa lòng hào sen. Thế đứng Phượng Vũ Cát Tường biểu trưng cho vẻ đẹp quyền quý, an khang trường thọ của trạch chủ.'
    }
  ]

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0c0f] text-[#f2efe9] overflow-hidden border-t border-[#222832]">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1f382a]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3a2c1d]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1f252f]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-[#16251d] text-[#52b788] border border-[#2d5840] mb-3">
              Kiến Trúc Sinh Thái Thủy Đình Ven Sông · Tuyệt Bản V18
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#e8e2d5] tracking-wide">
              Thủy Đình Gỗ Trầm Hương Rừng Khánh Hòa 620 Năm & Hào Bonsai Khế Gân 635 Năm Dáng Phượng Vũ Cát Tường V18
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a69f91] max-w-2xl font-light">
              Giải pháp kiến trúc vi khí hậu ven kênh rạch Sài Gòn độc bản từ GuHomes. Kết hợp mộc nghệ mộng cối cổ truyền, gỗ Trầm Hương rừng tự nhiên 620 năm thơm nồng vương giả và hào sen đối lưu giải nhiệt tự thân.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={toggleSoundscape}
              aria-label="Kích hoạt âm thanh thiền định vi khí hậu 528Hz và 432Hz"
              className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 border ${
                soundscapeActive
                  ? 'bg-[#1b382b] text-[#74c69d] border-[#40916c] shadow-[0_0_20px_rgba(82,183,136,0.3)]'
                  : 'bg-[#12161b] text-[#9ba1a6] border-[#252e38] hover:border-[#3e4c5b]'
              }`}
            >
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${soundscapeActive ? 'bg-[#52b788] animate-pulse' : 'bg-[#6c757d]'}`} />
              {soundscapeActive ? 'Âm Hưởng Vi Khí Hậu 528Hz & 432Hz (Đang Phát)' : 'Thử Âm Hưởng Thiền Định (Web Audio)'}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-5 rounded-xl bg-[#11151a]/80 backdrop-blur-md border border-[#212832] flex flex-col justify-between hover:border-[#384554] transition-all"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-[#7e8790] block mb-1">{m.label}</span>
                <span className="text-2xl sm:text-3xl font-serif text-[#d8c29d] font-semibold block">{m.value}</span>
                <span className="text-xs text-[#52b788] font-medium block mt-1">{m.subtext}</span>
              </div>
              <p className="mt-3 text-xs text-[#8c949e] font-light leading-relaxed border-t border-[#1a2129] pt-2.5">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Pavilion Demonstration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d1117] rounded-2xl p-6 sm:p-8 border border-[#232b36]">
          {/* Interactive Visual Canvas / SVG Schema */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#07090c] rounded-xl p-6 border border-[#1b222c] relative overflow-hidden min-h-[360px]">
            {/* Ambient Water Moat Ripples */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="waterFlowV18" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#52b788" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#07090c" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="50%" cy="50%" r="140" fill="url(#waterFlowV18)" />
              </svg>
            </div>

            {/* Architectural Interactive Schema */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Outer Canal Moat Boundary */}
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#2d5a3f]/60 animate-[spin_60s_linear_infinite]" />
              
              {/* Lotus Moat Ring */}
              <div className="absolute inset-10 rounded-full border border-[#40916c]/40 bg-[#14231b]/20 flex items-center justify-center">
                <span className="absolute top-2 text-[10px] text-[#52b788] tracking-widest uppercase">Hào Sen Bách Diệp Tuần Hoàn</span>
                <span className="absolute bottom-2 text-[10px] text-[#52b788] tracking-widest uppercase">-15.6°C Vi Khí Hậu</span>
              </div>

              {/* Central Agarwood Pavilion Structure */}
              <div className="relative z-10 w-44 h-44 rounded-xl bg-[#1b1510] border-2 border-[#8e6939] flex flex-col items-center justify-center p-3 shadow-[0_0_30px_rgba(142,105,57,0.25)]">
                <div className="text-[11px] text-[#d8c29d] font-serif font-bold text-center">
                  THỦY ĐÌNH TRẦM HƯƠNG
                </div>
                <div className="text-[9px] text-[#8c949e] text-center mt-0.5">
                  Khánh Hòa 620 Năm
                </div>

                {/* Hinged Doors Demonstration */}
                <div className="mt-3 w-full flex items-center justify-between px-2">
                  <motion.div
                    animate={{ rotate: -hingeAngle / 3 }}
                    className="w-12 h-1 bg-[#d8c29d] rounded-full origin-left"
                    style={{ transformOrigin: 'left center' }}
                  />
                  <div className="w-2 h-2 rounded-full bg-[#52b788] animate-ping" />
                  <motion.div
                    animate={{ rotate: hingeAngle / 3 }}
                    className="w-12 h-1 bg-[#d8c29d] rounded-full origin-right"
                    style={{ transformOrigin: 'right center' }}
                  />
                </div>

                <div className="mt-2 text-[10px] text-[#74c69d] font-mono">
                  Góc mở cối: {hingeAngle}°
                </div>
              </div>

              {/* Bonsai Tree Indicator */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute right-8 top-12 px-2.5 py-1 rounded bg-[#1e2a22] border border-[#3e684d] text-[10px] text-[#95d5b2] flex items-center gap-1.5 shadow-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
                Khế Gân 635 Năm Phượng Vũ Cát Tường
              </motion.div>

              {/* Wind Flow Vector */}
              <div className="absolute left-6 bottom-12 px-2.5 py-1 rounded bg-[#16202c] border border-[#2b3e55] text-[10px] text-[#89b4e9] flex items-center gap-1.5">
                <span>Gió Kênh Sài Gòn: 9.6 m/s</span>
              </div>
            </div>

            {/* Slider Controls for Hinged Doors */}
            <div className="w-full mt-6 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-[#a69f91]">
                <span>Điều Chỉnh Góc Mở Cối Âm Dương:</span>
                <span className="font-mono text-[#d8c29d] font-bold">{hingeAngle}° (Tối Đa 270°)</span>
              </div>
              <input
                type="range"
                min="0"
                max="270"
                step="1"
                value={hingeAngle}
                onChange={(e) => setHingeAngle(Number(e.target.value))}
                className="w-full h-2 bg-[#1f2630] rounded-lg appearance-none cursor-pointer accent-[#52b788]"
                aria-label="Điều chỉnh góc mở cối âm dương gỗ Trầm Hương"
              />
            </div>
          </div>

          {/* Facets Exploration Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-lg font-serif text-[#e8e2d5] mb-1">
              Ba Trụ Cột Kỹ Thuật Thủy Đình V18
            </h3>

            {facets.map((facet, fIdx) => (
              <div
                key={fIdx}
                onClick={() => setSelectedFacetIndex(fIdx)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                  selectedFacetIndex === fIdx
                    ? 'bg-[#161c24] border-[#52b788] shadow-[0_0_15px_rgba(82,183,136,0.15)]'
                    : 'bg-[#101318] border-[#1f2631] hover:border-[#2f3947]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#52b788] uppercase tracking-wider">{facet.tag}</span>
                  <span className="text-[11px] text-[#717b87] font-mono">0{fIdx + 1}</span>
                </div>
                <h4 className="text-sm font-medium text-[#e2ded4] mb-1">{facet.title}</h4>
                <p className="text-xs text-[#8c949e] font-light leading-relaxed">{facet.desc}</p>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#141a15] border border-[#233f2c] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#52b788]">Cam Kết Vận Hành GuHomes</div>
                <div className="text-[11px] text-[#97a599] mt-0.5">Xưởng Thạnh Xuân 1.200m² may đo độc bản · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#1f3a2b] hover:bg-[#2d5a3f] text-[#a7f3d0] text-xs font-medium border border-[#3b7252] transition-colors flex items-center justify-center shrink-0"
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

export default SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV18
