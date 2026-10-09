'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedNgocAmFlowerMoatPavilionV18() {
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
      label: 'Gỗ Ngọc Am Hà Giang',
      value: '625 Năm',
      subtext: 'Lên tuyết trắng tự nhiên',
      detail: 'Tuyển lọc từ lũa gốc Ngọc Am đại ngàn Hoàng Su Phì, đẫm tinh dầu tự nhiên xua tan chướng khí và tỏa hương quý phái.',
    },
    {
      label: 'Hạ Nhiệt Vi Khí Hậu',
      value: '-15.8°C',
      subtext: 'Đối lưu vi khí hậu tự nhiên',
      detail: 'Hơi nước mặt hào sinh thái cuốn theo gió sông Sài Gòn làm dịu mát tức thì không gian pavilion.',
    },
    {
      label: 'Lưu Lượng Gió Sông',
      value: '9.8 m/s',
      subtext: 'Khí động học cánh gập',
      detail: 'Góc mở bản lề điều hướng 270° đón trọn luồng gió ngọn Đông Nam từ nhánh sông uốn lượn.',
    },
    {
      label: 'Mai Vàng Cổ Thụ',
      value: '645 Năm',
      subtext: 'Ngũ Phúc Đồng Triều',
      detail: 'Dáng thế 5 nhánh uốn lượn sum suê, hoa vàng 5 cánh đại cát đại lợi soi bóng trên làn nước hào trong vắt.',
    },
  ]

  const facets = [
    {
      tag: 'Bản Lề Khớp Mộng Gỗ',
      title: 'Hệ Khớp Xoay Gỗ Ngọc Am Mộng Kép Hoàn Toàn',
      desc: 'Tuyệt đối không dùng kim loại hoen rỉ. Từng then mộng được nghệ nhân mộc Thạnh Xuân nêm chốt gỗ mun chịu lực, xoay êm ái qua hàng thế kỷ.',
    },
    {
      tag: 'Hào Nước Sinh Thái',
      title: 'Lớp Lọc Đáy Cát Thạch Anh & Sỏi Bazan Núi Lửa',
      desc: 'Dòng nước ngầm đối lưu tuần hoàn, nuôi dưỡng thảm rêu xanh ngọc và đàn cá Koi Kohaku bơi lượn quanh chân cột thủy đình.',
    },
    {
      tag: 'Cộng Hưởng Âm Thanh',
      title: 'Âm Hưởng Tần Số Vàng 528Hz & 432Hz Tĩnh Tại',
      desc: 'Tiếng chuông gốm mộc nung củi và phách đồng ngân vang tạo rung động sóng não thư giãn sâu bên khúc sông Sài Gòn.',
    },
  ]

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0d0e] text-[#f4efe6] overflow-hidden border-t border-b border-[#1f282b]">
      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#255243] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8a723e] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14231f] border border-[#255243] text-[#48b590] text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#48b590] animate-pulse" />
            Kiến Trúc Ngoại Cảnh Ven Sông · Master Series V18
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-[#f4efe6] tracking-tight leading-tight">
            Thủy Đình Gỗ Ngọc Am 625 Năm &amp; Hào Cổ Thụ 645 Năm
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a3a59a] font-light leading-relaxed">
            Thiết kế ngàm bản lề gỗ Ngọc Am Hà Giang xoay 270° ôm trọn khúc cong sông Sài Gòn. Giải pháp vi khí hậu hạ nhiệt -15.8°C tự nhiên, hòa quyện nghệ thuật cây kiểng Mai Vàng Ngũ Phúc Đồng Triều 645 năm tuổi.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-5 rounded-2xl bg-[#101618] border border-[#1b2528] hover:border-[#255243] transition-colors"
            >
              <div className="text-xs text-[#889596] uppercase font-mono tracking-wider">{m.label}</div>
              <div className="mt-2 text-2xl sm:text-3xl font-serif text-[#d4af37] font-normal">{m.value}</div>
              <div className="mt-1 text-xs text-[#48b590] font-medium">{m.subtext}</div>
              <p className="mt-2 text-[11px] text-[#6d7c7e] font-light leading-normal">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Master Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Visual & Interactive Canvas */}
          <div className="lg:col-span-7 bg-[#0e1416] rounded-2xl border border-[#192427] p-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#172023] mb-6">
              <div>
                <span className="text-xs font-mono text-[#48b590] uppercase tracking-wider">Mô Phỏng Cánh Gập Bản Lề</span>
                <h3 className="text-lg font-serif text-[#f2ece1] mt-0.5">Trục Xoay Bản Lề Ngọc Am Tự Động</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMoatFlowActive(!moatFlowActive)}
                  className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    moatFlowActive
                      ? 'bg-[#152721] border-[#255243] text-[#48b590]'
                      : 'bg-[#111719] border-[#202c30] text-[#6e7d7f]'
                  }`}
                >
                  {moatFlowActive ? 'Dòng Hào: Chảy Đều' : 'Dòng Hào: Tĩnh Lặng'}
                </button>
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    soundscapeActive
                      ? 'bg-[#292212] border-[#8a723e] text-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'bg-[#111719] border-[#202c30] text-[#6e7d7f]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${soundscapeActive ? 'bg-[#d4af37] animate-ping' : 'bg-[#555]'}`} />
                  {soundscapeActive ? '528Hz + 432Hz: Bật' : 'Âm Thiền: Tắt'}
                </button>
              </div>
            </div>

            {/* SVG Visual Representation of the Hinged Pavilion */}
            <div className="relative w-full aspect-[16/10] bg-[#090d0e] rounded-xl overflow-hidden flex items-center justify-center border border-[#162124]">
              <svg viewBox="0 0 600 380" className="w-full h-full">
                <defs>
                  <radialGradient id="waterFlowV18NgocAm" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1a3b31" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#081410" stopOpacity="0.95" />
                  </radialGradient>
                  <linearGradient id="ngocAmWoodV18" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d19c5b" />
                    <stop offset="50%" stopColor="#a07137" />
                    <stop offset="100%" stopColor="#69451c" />
                  </linearGradient>
                </defs>

                {/* Canal Water Background */}
                <rect x="0" y="0" width="600" height="380" fill="url(#waterFlowV18NgocAm)" />

                {/* Animated Ripple Circles if Moat Flow is Active */}
                {moatFlowActive && (
                  <>
                    <circle cx="300" cy="200" r="160" fill="none" stroke="#48b590" strokeWidth="1" strokeDasharray="4 6" opacity="0.25">
                      <animate attributeName="r" values="120;220" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="300" cy="200" r="110" fill="none" stroke="#255243" strokeWidth="1.5" opacity="0.3">
                      <animate attributeName="r" values="90;180" dur="3.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0" dur="3.5s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Circular Stone Island Base */}
                <circle cx="300" cy="200" r="115" fill="#182022" stroke="#334246" strokeWidth="3" />
                <circle cx="300" cy="200" r="95" fill="#11181a" stroke="#222f33" strokeWidth="1.5" />

                {/* Bonsai Golden Apricot Tree Trunk & Blossoms */}
                <path
                  d="M 270 205 Q 260 170 280 150 Q 295 130 310 115"
                  fill="none"
                  stroke="#5a3d21"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="310" cy="115" r="28" fill="#ffd166" opacity="0.85" />
                <circle cx="285" cy="135" r="22" fill="#ffb703" opacity="0.8" />
                <circle cx="325" cy="130" r="20" fill="#fb8500" opacity="0.75" />

                {/* Pavilion Central Octagonal Core */}
                <polygon
                  points="280,180 320,180 340,200 340,220 320,240 280,240 260,220 260,200"
                  fill="url(#ngocAmWoodV18)"
                  stroke="#d4af37"
                  strokeWidth="2"
                />

                {/* Hinged Wing Leaves Rotating around central axis */}
                <g transform={`rotate(${hingeAngle}, 300, 200)`}>
                  <rect x="294" y="90" width="12" height="110" rx="3" fill="#e2a862" stroke="#8a5e20" strokeWidth="1.5" />
                  <polygon points="280,95 320,95 300,60" fill="url(#ngocAmWoodV18)" stroke="#f4efe6" strokeWidth="1" />
                </g>
                <g transform={`rotate(${hingeAngle + 90}, 300, 200)`}>
                  <rect x="294" y="90" width="12" height="110" rx="3" fill="#e2a862" stroke="#8a5e20" strokeWidth="1.5" />
                  <polygon points="280,95 320,95 300,60" fill="url(#ngocAmWoodV18)" stroke="#f4efe6" strokeWidth="1" />
                </g>
                <g transform={`rotate(${hingeAngle + 180}, 300, 200)`}>
                  <rect x="294" y="90" width="12" height="110" rx="3" fill="#e2a862" stroke="#8a5e20" strokeWidth="1.5" />
                  <polygon points="280,95 320,95 300,60" fill="url(#ngocAmWoodV18)" stroke="#f4efe6" strokeWidth="1" />
                </g>
                <g transform={`rotate(${hingeAngle + 270}, 300, 200)`}>
                  <rect x="294" y="90" width="12" height="110" rx="3" fill="#e2a862" stroke="#8a5e20" strokeWidth="1.5" />
                  <polygon points="280,95 320,95 300,60" fill="url(#ngocAmWoodV18)" stroke="#f4efe6" strokeWidth="1" />
                </g>

                {/* River Current Direction Arrows */}
                <path d="M 50 340 Q 200 360 400 330 T 560 350" fill="none" stroke="#48b590" strokeWidth="2" strokeDasharray="8 6" opacity="0.6" />
                <text x="70" y="330" fill="#a7f3d0" fontSize="11" fontFamily="sans-serif">
                  Dòng Nước Ven Sông Sài Gòn (Vận tốc 1.9 m/s)
                </text>
              </svg>

              {/* Status Badge in corner */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#080c0d]/80 border border-[#1b272a] backdrop-blur-md text-[11px] text-[#c0c5af] font-mono">
                Góc Bản Lề: <span className="text-[#d4af37] font-bold">{hingeAngle}°</span> · Hạ Nhiệt: <span className="text-[#48b590] font-bold">-15.8°C</span>
              </div>
            </div>

            {/* Slider Control for Hinge Angle */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between items-center text-xs text-[#a3a59a]">
                <span>Điều chỉnh góc xoay mở đón gió sông:</span>
                <span className="font-mono text-[#d4af37] font-semibold">{hingeAngle}° / 360°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hingeAngle}
                onChange={(e) => setHingeAngle(Number(e.target.value))}
                aria-label="Điều chỉnh góc mở bản lề thủy đình ngọc am"
                className="w-full h-2 bg-[#172225] rounded-lg appearance-none cursor-pointer accent-[#48b590]"
              />
              <div className="flex justify-between text-[11px] text-[#5b6a6d] font-mono">
                <span>0° Đóng Kín Chắn Bão</span>
                <span>135° Bán Mở Đón Gió</span>
                <span>270° Toàn Mở View Sông</span>
                <span>360° Tuần Hoàn Tối Đa</span>
              </div>
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
                    ? 'bg-[#131d20] border-[#48b590] shadow-[0_0_15px_rgba(72,181,144,0.15)]'
                    : 'bg-[#0e1416] border-[#1a2528] hover:border-[#28383c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#48b590] uppercase tracking-wider">{facet.tag}</span>
                  <span className="text-[11px] text-[#717b87] font-mono">0{fIdx + 1}</span>
                </div>
                <h4 className="text-sm font-medium text-[#e2ded4] mb-1">{facet.title}</h4>
                <p className="text-xs text-[#889596] font-light leading-relaxed">{facet.desc}</p>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#121c18] border border-[#203c31] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#48b590]">Cam Kết Vận Hành GuHomes</div>
                <div className="text-[11px] text-[#93a296] mt-0.5">Xưởng Thạnh Xuân 1.200m² may đo độc bản · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#1b352b] hover:bg-[#274f40] text-[#a7f3d0] text-xs font-medium border border-[#346a55] transition-colors flex items-center justify-center shrink-0"
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

export default SaigonCanalSideAncientHingedNgocAmFlowerMoatPavilionV18
