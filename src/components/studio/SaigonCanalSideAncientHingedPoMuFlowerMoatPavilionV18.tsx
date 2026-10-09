'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV18() {
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
      label: 'Gỗ Pơ Mu Mộc Châu',
      value: '620 Năm',
      subtext: 'Thớ ngọc vàng ánh kim',
      detail: 'Tuyển trích từ lõi thân pơ mu đại ngàn Tây Bắc, giàu tinh dầu tự nhiên kháng ẩm mốc và xua côn trùng vĩnh cửu.',
    },
    {
      label: 'Hạ Nhiệt Vi Khí Hậu',
      value: '-15.7°C',
      subtext: 'Đối lưu vi khí hậu tự nhiên',
      detail: 'Nước mặt hào nước bốc hơi kết hợp luồng gió sông Sài Gòn làm mát tức thì không gian pavilion.',
    },
    {
      label: 'Lưu Lượng Gió Sông',
      value: '9.7 m/s',
      subtext: 'Khí động học cánh gập',
      detail: 'Góc mở bản lề điều hướng 270° đón trọn gió ngọn Đông Nam từ nhánh sông uốn lượn.',
    },
    {
      label: 'Đỗ Quyên Cổ Thụ',
      value: '640 Năm',
      subtext: 'Cửu Long Tranh Châu',
      detail: 'Dáng thế 9 thân rồng cuộn ôm lấy bồn đá ngọc, nở hoa đỏ ruby rực rỡ soi bóng trên làn nước hào trong vắt.',
    },
  ]

  const facets = [
    {
      tag: 'Bản Lề Khớp Mộng Gỗ',
      title: 'Hệ Khớp Xoay Gỗ Pơ Mu Mộng Kép Hoàn Toàn',
      desc: 'Tuyệt đối không dùng đinh ốc kim loại hoen rỉ. Từng mộng then cài được nghệ nhân mộc Thạnh Xuân nêm chốt gỗ lim chịu lực, xoay êm ái qua hàng thế kỷ.',
    },
    {
      tag: 'Hào Nước Sinh Thái',
      title: 'Lớp Lọc Đáy Cát Thạch Anh & Than Hoạt Tính Gáo Dừa',
      desc: 'Dòng nước tuần hoàn ngầm tự nhiên, nuôi dưỡng thảm rêu nhung và đàn cá Koi Kohaku bơi lượn quanh chân cột thủy đình.',
    },
    {
      tag: 'Cộng Hưởng Âm Thanh',
      title: 'Âm Hưởng Tần Số Vàng 528Hz & 432Hz Tĩnh Tại',
      desc: 'Chuông gió gốm mộc nung củi và thanh đồng phách vàng tạo rung động sóng não thư giãn sâu bên khúc sông Sài Gòn.',
    },
  ]

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0b0d10] text-[#f4efe6] overflow-hidden border-t border-b border-[#21262d]">
      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2d5a3f] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8b6f47] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231c] border border-[#2d5a3f] text-[#52b788] text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse" />
            Kiến Trúc Ngoại Cảnh Ven Sông · Master Series V18
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-[#f4efe6] tracking-tight leading-tight">
            Thủy Đình Gỗ Pơ Mu 620 Năm &amp; Hào Cổ Thụ 640 Năm
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a7a29a] font-light leading-relaxed">
            Thiết kế ngàm bản lề gỗ Pơ Mu Mộc Châu xoay 270° ôm trọn khúc cong sông Sài Gòn. Giải pháp vi khí hậu hạ nhiệt -15.7°C tự nhiên, hòa quyện nghệ thuật cây kiểng Đỗ Quyên Cửu Long Tranh Châu 640 năm tuổi.
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
              className="p-5 rounded-2xl bg-[#11151a] border border-[#1e2530] hover:border-[#2d5a3f] transition-colors"
            >
              <div className="text-xs text-[#8c949e] uppercase font-mono tracking-wider">{m.label}</div>
              <div className="mt-2 text-2xl sm:text-3xl font-serif text-[#d4af37] font-normal">{m.value}</div>
              <div className="mt-1 text-xs text-[#52b788] font-medium">{m.subtext}</div>
              <p className="mt-2 text-[11px] text-[#717b87] font-light leading-normal">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Master Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Visual & Interactive Canvas */}
          <div className="lg:col-span-7 bg-[#101419] rounded-2xl border border-[#1e2632] p-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1b222d] mb-6">
              <div>
                <span className="text-xs font-mono text-[#52b788] uppercase tracking-wider">Mô Phỏng Cánh Gập Bản Lề</span>
                <h3 className="text-lg font-serif text-[#f2ece1] mt-0.5">Trục Xoay Bản Lề Pơ Mu Tự Động</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMoatFlowActive(!moatFlowActive)}
                  className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    moatFlowActive
                      ? 'bg-[#18291f] border-[#2d5a3f] text-[#52b788]'
                      : 'bg-[#13171d] border-[#252c38] text-[#717b87]'
                  }`}
                >
                  {moatFlowActive ? 'Dòng Hào: Chảy Đều' : 'Dòng Hào: Tĩnh Lặng'}
                </button>
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    soundscapeActive
                      ? 'bg-[#2a2214] border-[#8b6f47] text-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'bg-[#13171d] border-[#252c38] text-[#717b87]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${soundscapeActive ? 'bg-[#d4af37] animate-ping' : 'bg-[#555]'}`} />
                  {soundscapeActive ? '528Hz + 432Hz: Bật' : 'Âm Thiền: Tắt'}
                </button>
              </div>
            </div>

            {/* SVG Visual Representation of the Hinged Pavilion */}
            <div className="relative w-full aspect-[16/10] bg-[#0c0e12] rounded-xl overflow-hidden flex items-center justify-center border border-[#181e27]">
              <svg viewBox="0 0 600 380" className="w-full h-full">
                <defs>
                  <radialGradient id="waterFlowV18" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e3a2b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0b1712" stopOpacity="0.95" />
                  </radialGradient>
                  <linearGradient id="pomerWoodV18" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c89657" />
                    <stop offset="50%" stopColor="#9a6e38" />
                    <stop offset="100%" stopColor="#63451e" />
                  </linearGradient>
                  <linearGradient id="jadeLeafV18" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#52b788" />
                    <stop offset="100%" stopColor="#1e4631" />
                  </linearGradient>
                </defs>

                {/* Canal Water Background */}
                <rect x="0" y="0" width="600" height="380" fill="url(#waterFlowV18)" />

                {/* Animated Ripple Circles if Moat Flow is Active */}
                {moatFlowActive && (
                  <>
                    <circle cx="300" cy="200" r="160" fill="none" stroke="#52b788" strokeWidth="1" strokeDasharray="4 6" opacity="0.25">
                      <animate attributeName="r" values="120;220" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="300" cy="200" r="110" fill="none" stroke="#2d5a3f" strokeWidth="1.5" opacity="0.3">
                      <animate attributeName="r" values="90;180" dur="3.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0" dur="3.5s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Circular Stone Island Base */}
                <circle cx="300" cy="200" r="115" fill="#1b2028" stroke="#3b4452" strokeWidth="3" />
                <circle cx="300" cy="200" r="95" fill="#14181f" stroke="#252c38" strokeWidth="1.5" />

                {/* Bonsai Azalea Tree Trunk & Foliage */}
                <path
                  d="M 270 205 Q 260 170 280 150 Q 295 130 310 115"
                  fill="none"
                  stroke="#573b22"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="310" cy="115" r="28" fill="#e63946" opacity="0.85" />
                <circle cx="285" cy="135" r="22" fill="#d90429" opacity="0.8" />
                <circle cx="325" cy="130" r="20" fill="#ef233c" opacity="0.75" />

                {/* Pavilion Central Octagonal Core */}
                <polygon
                  points="280,180 320,180 340,200 340,220 320,240 280,240 260,220 260,200"
                  fill="url(#pomerWoodV18)"
                  stroke="#d4af37"
                  strokeWidth="2"
                />

                {/* Hinged Wing Leaves Rotating around central axis */}
                <g transform={`rotate(${hingeAngle}, 300, 200)`}>
                  <rect x="294" y="90" width="12" height="110" rx="3" fill="#dfad68" stroke="#8b6528" strokeWidth="1.5" />
                  <polygon points="280,95 320,95 300,60" fill="url(#pomerWoodV18)" stroke="#f4efe6" strokeWidth="1" />
                </g>
                <g transform={`rotate(${hingeAngle + 90}, 300, 200)`}>
                  <rect x="294" y="90" width="12" height="110" rx="3" fill="#dfad68" stroke="#8b6528" strokeWidth="1.5" />
                  <polygon points="280,95 320,95 300,60" fill="url(#pomerWoodV18)" stroke="#f4efe6" strokeWidth="1" />
                </g>
                <g transform={`rotate(${hingeAngle + 180}, 300, 200)`}>
                  <rect x="294" y="90" width="12" height="110" rx="3" fill="#dfad68" stroke="#8b6528" strokeWidth="1.5" />
                  <polygon points="280,95 320,95 300,60" fill="url(#pomerWoodV18)" stroke="#f4efe6" strokeWidth="1" />
                </g>
                <g transform={`rotate(${hingeAngle + 270}, 300, 200)`}>
                  <rect x="294" y="90" width="12" height="110" rx="3" fill="#dfad68" stroke="#8b6528" strokeWidth="1.5" />
                  <polygon points="280,95 320,95 300,60" fill="url(#pomerWoodV18)" stroke="#f4efe6" strokeWidth="1" />
                </g>

                {/* River Current Direction Arrows */}
                <path d="M 50 340 Q 200 360 400 330 T 560 350" fill="none" stroke="#52b788" strokeWidth="2" strokeDasharray="8 6" opacity="0.6" />
                <text x="70" y="330" fill="#a7f3d0" fontSize="11" fontFamily="sans-serif">
                  Dòng Nước Ven Sông Sài Gòn (Vận tốc 1.8 m/s)
                </text>
              </svg>

              {/* Status Badge in corner */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#0a0c0e]/80 border border-[#202734] backdrop-blur-md text-[11px] text-[#c5bcad] font-mono">
                Góc Bản Lề: <span className="text-[#d4af37] font-bold">{hingeAngle}°</span> · Hạ Nhiệt: <span className="text-[#52b788] font-bold">-15.7°C</span>
              </div>
            </div>

            {/* Slider Control for Hinge Angle */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between items-center text-xs text-[#a7a29a]">
                <span>Điều chỉnh góc xoay mở đón gió sông:</span>
                <span className="font-mono text-[#d4af37] font-semibold">{hingeAngle}° / 360°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hingeAngle}
                onChange={(e) => setHingeAngle(Number(e.target.value))}
                aria-label="Điều chỉnh góc mở bản lề thủy đình"
                className="w-full h-2 bg-[#1b222d] rounded-lg appearance-none cursor-pointer accent-[#52b788]"
              />
              <div className="flex justify-between text-[11px] text-[#5e6673] font-mono">
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

export default SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV18
