'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedHuynhFlowerMoatPavilionV18() {
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

      // Solfeggio 528Hz (Transformation & Harmonization)
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
      label: 'Gỗ Huỳnh Đàn Cổ Thụ',
      value: '635 Năm',
      subtext: 'Hương trầm xạ vân ngân hà',
      detail: 'Khai thác từ phôi Huỳnh Đàn cổ thụ 6 thế kỷ, đẫm tinh dầu thơm trầm xạ tự nhiên, kháng tuyệt đối nồm ẩm và ngâm nước mặn vùng rạch Sài Gòn.',
    },
    {
      label: 'Hạ Nhiệt Vi Khí Hậu',
      value: '-16.0°C',
      subtext: 'Đối lưu vi khí hậu tự nhiên',
      detail: 'Hơi nước mát từ hào hoa súng lọc qua lớp ngàm mộng mở 270°, xua tan nhiệt ẩm nhiệt đới bức bối mà không lệ thuộc vào điều hòa cơ khí.',
    },
    {
      label: 'Lưu Lượng Gió Sông',
      value: '10.0 m/s',
      subtext: 'Khí động học cánh gập xoay',
      detail: 'Bản lề gỗ âm dương xoay 270° gom trọn ngọn gió Nam sông Sài Gòn và luồng đối lưu thủy sinh từ rạch tự nhiên uốn quanh khuôn viên.',
    },
    {
      label: 'Lộc Vừng Cổ Thụ',
      value: '655 Năm',
      subtext: 'Dáng thế Tam Dương Khai Thái',
      detail: 'Lộc Vừng cổ bonsai 655 năm nở chuỗi hoa đỏ rực rỡ buông rủ ven hào nước trong lành, biểu tượng cho may mắn, phúc lộc và thịnh vượng vĩnh cửu.',
    },
  ]

  const facets = [
    {
      title: 'Mộng Gỗ Huỳnh Đàn Xoay 270°',
      tag: 'CƠ HỌC CỔ TRUYỀN',
      desc: 'Hệ chốt mộng gỗ sồi lồng lõi đồng phốt-pho cho phép hệ vách gỗ Huỳnh Đàn bung mở 270°, mở rộng tầm mắt đón trọn mặt gương nước và vườn thiền.',
    },
    {
      title: 'Hào Thủy Sinh Lọc Vi Khí Hậu',
      tag: 'SINH THÁI TỰ NHIÊN',
      desc: 'Hào nước sâu 1.2m nuôi dưỡng hệ thực vật thủy sinh bản địa, điều hòa nhiệt độ vi mô và tạo bức tường âm thanh nước chảy róc rách thanh tịnh.',
    },
    {
      title: 'Lộc Vừng Tam Dương Khai Thái',
      tag: 'BONSAI ĐỘC BẢN',
      desc: '3 nhánh thân cổ thụ vươn mình soi bóng nước như ba vị thần thái bình hội tụ, tích tụ năng lượng an lành và phúc thọ trường tồn cho gia chủ.',
    },
  ]

  return (
    <section className="relative my-14 overflow-hidden rounded-3xl border border-[#2b3a32] bg-[#0c1410] p-6 text-[#dce7e1] shadow-2xl md:p-10">
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1b4332]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#2d6a4f]/20 blur-3xl" />

      {/* Header Badge & Title */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#1f2f26] pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3b5d49] bg-[#14231b] px-3.5 py-1 text-xs font-medium text-[#74c69d]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#52b788] animate-pulse" />
            Kiến Trúc Thủy Đình Ven Sông · Tuyệt Tác V18
          </div>
          <h2 className="mt-3 text-2xl font-serif tracking-tight text-[#f1f7f4] sm:text-3xl">
            Thủy Đình Gỗ Huỳnh Đàn Cổ Thụ 635 Năm & Hào Bonsai Lộc Vừng 655 Năm
          </h2>
          <p className="mt-2 text-sm text-[#95a89e] max-w-2xl font-light">
            Giải pháp vi khí hậu sông nước Sài Gòn độc quyền bởi GuHomes: Khớp mộng gỗ xoay 270°, hào hoa thủy sinh thanh lọc nhiệt ẩm, hạ nhiệt tức thì -16.0°C.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSoundscape}
            aria-label="Kích hoạt âm thanh tần số vi mô Solfeggio 528Hz & 432Hz"
            className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-2 ${
              soundscapeActive
                ? 'border-[#52b788] bg-[#1f3f2f] text-[#b7e4c7] shadow-lg shadow-[#1b4332]/50'
                : 'border-[#2d4738] bg-[#132219] text-[#8fa79a] hover:text-[#dce7e1]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span>{soundscapeActive ? 'Âm Vi Khí Hậu: 528Hz & 432Hz (Đang Bật)' : 'Bật Vi Âm Thủy Đình 528Hz'}</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metrics */}
      <div className="relative z-10 grid grid-cols-2 gap-4 my-8 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#22352b] bg-[#111e17]/80 p-4 backdrop-blur transition-colors hover:border-[#385947]"
          >
            <div className="text-xs font-medium text-[#74c69d]">{m.label}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-[#f1f7f4]">{m.value}</div>
            <div className="text-[11px] text-[#8fa79a] mt-0.5">{m.subtext}</div>
            <div className="mt-2 text-xs text-[#b7c9c0] font-light leading-relaxed border-t border-[#1d2d24] pt-2">{m.detail}</div>
          </div>
        ))}
      </div>

      {/* Interactive Controls & Spatial Simulation Canvas */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0e1713] p-6 rounded-2xl border border-[#203228]">
        {/* Left: Graphic representation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#09100d] rounded-xl border border-[#1b2b22] relative min-h-[300px] overflow-hidden">
          {/* Animated Water Ripple Moat */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            {moatFlowActive && (
              <>
                <motion.div
                  className="absolute w-72 h-72 rounded-full border border-[#40916c]"
                  animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute w-96 h-96 rounded-full border border-[#52b788]/40"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
              </>
            )}
          </div>

          {/* Pavilion Architectural SVG Diagram */}
          <div className="relative z-10 flex flex-col items-center">
            <svg className="w-64 h-64" viewBox="0 0 200 200" fill="none">
              {/* Moat Water Ring */}
              <circle cx="100" cy="100" r="85" stroke="#1f4e3b" strokeWidth="6" strokeDasharray="6 4" opacity="0.8" />
              {/* Foundation Columns */}
              <circle cx="60" cy="60" r="6" fill="#74c69d" />
              <circle cx="140" cy="60" r="6" fill="#74c69d" />
              <circle cx="60" cy="140" r="6" fill="#74c69d" />
              <circle cx="140" cy="140" r="6" fill="#74c69d" />
              {/* Floor Deck Platform */}
              <rect x="52" y="52" width="96" height="96" rx="6" stroke="#52b788" strokeWidth="2.5" fill="#14261d" fillOpacity="0.85" />
              
              {/* Rotating Hinged Louvers Wall System */}
              <g transform={`rotate(${hingeAngle - 180} 100 100)`}>
                <line x1="100" y1="52" x2="100" y2="28" stroke="#95d5b2" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="28" r="4" fill="#d8f3dc" />
                <line x1="52" y1="100" x2="28" y2="100" stroke="#95d5b2" strokeWidth="4" strokeLinecap="round" />
                <circle cx="28" cy="100" r="4" fill="#d8f3dc" />
                <line x1="148" y1="100" x2="172" y2="100" stroke="#95d5b2" strokeWidth="4" strokeLinecap="round" />
                <circle cx="172" cy="100" r="4" fill="#d8f3dc" />
              </g>

              {/* Central Bonsai & Water Stream Indicator */}
              <circle cx="100" cy="100" r="16" fill="#2d6a4f" stroke="#74c69d" strokeWidth="1.5" />
              <text x="100" y="104" textAnchor="middle" fill="#d8f3dc" fontSize="7" fontWeight="bold">HUỲNH ĐÀN</text>
            </svg>

            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-wider text-[#74c69d] font-semibold">
                Góc Mở Khớp Mộng: {hingeAngle}°
              </span>
              <p className="text-[11px] text-[#8fa79a] mt-0.5">
                {hingeAngle >= 250
                  ? 'Bản lề mở tối đa: Đón trọn 10.0 m/s gió ngọn Đông Nam & hạ -16.0°C'
                  : 'Bản lề khép vi mô: Tụ khí thiền định tĩnh lặng tuyệt đối'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Controls & Interactive Facet Selector */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#a7c1b4] font-medium">Điều Khiển Góc Mở Cánh Gập:</span>
              <span className="text-[#52b788] font-bold">{hingeAngle}° / 270°</span>
            </div>
            <input
              type="range"
              min="180"
              max="270"
              step="5"
              value={hingeAngle}
              onChange={(e) => setHingeAngle(Number(e.target.value))}
              className="w-full accent-[#52b788] cursor-pointer bg-[#182b21] h-2 rounded-lg"
              aria-label="Điều chỉnh góc mở mộng gỗ Huỳnh Đàn 180 đến 270 độ"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#14231b] rounded-xl border border-[#233a2e]">
            <div>
              <div className="text-xs font-semibold text-[#dce7e1]">Dòng Chảy Tuần Hoàn Hào Nước</div>
              <div className="text-[11px] text-[#8fa79a]">Dòng nước ngầm lọc vi sinh qua rễ thủy sinh</div>
            </div>
            <button
              onClick={() => setMoatFlowActive(!moatFlowActive)}
              aria-label="Bật tắt dòng chảy tuần hoàn hào nước"
              className={`min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                moatFlowActive
                  ? 'bg-[#2d6a4f] text-[#d8f3dc] border-[#52b788]'
                  : 'bg-[#182a20] text-[#71877b] border-[#294235]'
              }`}
            >
              {moatFlowActive ? 'Đang Chảy' : 'Dừng Lại'}
            </button>
          </div>

          {/* Facets Selector */}
          <div className="space-y-2">
            <span className="text-xs text-[#a7c1b4] font-medium">Chi Tiết Kỹ Nghệ Độc Bản:</span>
            {facets.map((facet, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFacetIndex(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedFacetIndex === idx
                    ? 'border-[#52b788] bg-[#172c21]'
                    : 'border-[#1e3327] bg-[#101b15] hover:border-[#2e4d3b]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#f1f7f4]">{facet.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#203a2c] text-[#74c69d] font-mono">
                    {facet.tag}
                  </span>
                </div>
                <p className="text-xs text-[#8fa79a] font-light leading-relaxed">{facet.desc}</p>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#122018] border border-[#203a2c] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#52b788]">Cam Kết Vận Hành GuHomes</div>
                <div className="text-[11px] text-[#8fa79a] mt-0.5">Xưởng Thạnh Xuân 1.200m² may đo độc bản · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#1f3f2f] hover:bg-[#2d5c45] text-[#b7e4c7] text-xs font-medium border border-[#3b7356] transition-colors flex items-center justify-center shrink-0"
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

export default SaigonCanalSideAncientHingedHuynhFlowerMoatPavilionV18
