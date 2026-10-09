'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedChukrasiaFlowerMoatPavilionV20() {
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
      label: 'Lát Hoa Thượng Ngàn',
      value: '655 Năm',
      subtext: 'Lõi đại thụ vân mây lửa cuộn xoáy',
      detail: 'Tuyển lọc lõi gỗ Lát Hoa (Chukrasia tabularis) Tây Bắc 655 năm tuổi, mật độ tom gỗ đanh quánh, kháng kiềm mặn triều cường sông Sài Gòn vĩnh cửu.',
    },
    {
      label: 'Khớp Mộng Xoay 270°',
      value: 'Bản Lề Gỗ Ẩn',
      subtext: 'Chốt mộng sồi bọc đồng beryllium',
      detail: 'Kỹ nghệ ngàm mộng âm dương không dùng đinh kim loại lộ thiên, xoay linh hoạt từ 0° khép kín chắn giông đến 270° mở toang kết nối hào nước cảnh quan.',
    },
    {
      label: 'Hạ Nhiệt Vi Khí Hậu',
      value: '-16.4°C',
      subtext: 'Bốc hơi tự nhiên từ hào sen súng',
      detail: 'Làn gió ẩm từ rạch nước đối lưu qua hệ nan mộng gỗ Lát Hoa giúp không gian thủy đình luôn duy trì sự mát dịu tự nhiên quanh năm.',
    },
    {
      label: 'Gió Đối Lưu Đông Nam',
      value: '10.4 m/s',
      subtext: 'Nan khí động học định hướng luồng khí',
      detail: 'Góc nghiêng khí động học dẫn trọn luồng gió lành từ hệ thống sông Sài Gòn len lỏi vào từng góc tĩnh tại của tư gia thượng lưu.',
    },
  ]

  const facets = [
    {
      title: 'Bản Lề Mộng Gỗ Xoay 270°',
      code: '270° ARTICULATED CHUKRASIA JOINERY',
      desc: 'Cánh lam gỗ Lát Hoa dày 68mm xoay mượt mà 270°, tạo nên sự biến ảo kỳ diệu giữa không gian đóng kín bảo mật và mở rộng chan hòa cùng thiên nhiên ven rạch.',
    },
    {
      title: 'Hào Nước Sen Súng Vi Khí Hậu',
      code: 'LOTUS CANAL MOAT MICROCLIMATE',
      desc: 'Hào nước chảy tuần hoàn bao quanh thủy đình, thảm thực vật sen súng bản địa lọc bụi mịn và điều hòa độ ẩm tự nhiên cho toàn bộ tư gia ven rạch.',
    },
    {
      title: 'Bonsai Đa Lông Cổ Thụ 675 Năm',
      code: '675-YEAR TRUONG XUAN BAT LAO FICUS BONSAI',
      desc: 'Thế cây Trường Xuân Bất Lão tàng phong tụ khí, bộ rễ buông vững chãi tựa tường thành, hộ trì sinh khí và sự trường thọ thịnh vượng muôn đời.',
    },
  ]

  return (
    <section className="relative my-14 overflow-hidden rounded-3xl border border-[#3b3023] bg-[#120e0a] p-6 text-[#ebdcc5] shadow-2xl md:p-10">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#8c5e28]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#3a6b5c]/15 blur-3xl" />

      {/* Header section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#2b2218] pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6b4e23] bg-[#22180c] px-3.5 py-1 text-xs font-medium text-[#e2b662]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f3c87a] animate-pulse" />
            Kiến Trúc Thủy Đình V20 · Lát Hoa Cổ Thụ & Bonsai Đa Lông 675 Năm
          </div>
          <h2 className="mt-3 text-2xl font-serif tracking-tight text-[#fbf5eb] sm:text-3xl">
            Thủy Đình Gỗ Lát Hoa 655 Năm & Hào Bonsai Đa Lông Trường Xuân Bất Lão
          </h2>
          <p className="mt-2 text-sm text-[#baa588] max-w-2xl font-light">
            Tuyệt phẩm thủy đình ven rạch kênh Sài Gòn với ngàm mộng gỗ Lát Hoa xoay 270°, hạ nhiệt vi khí hậu -16.4°C và cây Bonsai Đa Lông 675 năm Trường Xuân Bất Lão.
          </p>
        </div>

        {/* Audio switch button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSoundscape}
            aria-label="Kích hoạt âm thanh tần số vi mô Solfeggio 528Hz & 432Hz"
            className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-2 ${
              soundscapeActive
                ? 'border-[#e2b662] bg-[#33220e] text-[#fbeec9] shadow-lg shadow-[#8c5e28]/40'
                : 'border-[#4a361c] bg-[#1a1209] text-[#ab9475] hover:text-[#ebdcc5]'
            }`}
          >
            <svg className="w-4 h-4 text-[#e2b662]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span>{soundscapeActive ? 'Vi Âm Sông Sài Gòn (528Hz & 432Hz)' : 'Bật Vi Âm Thủy Đình 528Hz'}</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metrics */}
      <div className="relative z-10 grid grid-cols-2 gap-4 my-8 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#332516] bg-[#1a130b]/80 p-4 backdrop-blur transition-colors hover:border-[#593e1f]"
          >
            <div className="text-xs font-medium text-[#e2b662]">{m.label}</div>
            <div className="mt-1 text-xl font-serif font-bold text-[#faf3e3]">{m.value}</div>
            <div className="text-xs text-[#a69171] mt-0.5">{m.subtext}</div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#8a7458]">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* Interactive Control Panel & Visual Stage */}
      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        {/* Visual Stage */}
        <div className="relative lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl border border-[#382817] bg-gradient-to-b from-[#1b130b] via-[#120d07] to-[#0a0704]">
          {/* Subtle canal moat flow simulation */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {moatFlowActive && (
              <motion.div
                initial={{ opacity: 0.2, scale: 0.9 }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-t from-[#3a6b5c]/25 via-[#8c5e28]/15 to-transparent blur-2xl pointer-events-none"
              />
            )}

            {/* SVG Diagram of Hinged Chukrasia Wood Pavilion */}
            <svg className="w-56 h-56 md:w-72 md:h-72 text-[#e2b662]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
              {/* Canal Water Moat */}
              <ellipse cx="100" cy="165" rx="85" ry="24" fill="#0d1f1c" stroke="#255246" strokeWidth="1.5" />
              <path d="M40 162 C70 168, 130 160, 160 165" stroke="#3d8270" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M55 170 C85 175, 115 168, 145 172" stroke="#255246" strokeWidth="1" />

              {/* Pavilion Foundation Stilt Structure */}
              <rect x="75" y="130" width="50" height="30" rx="3" fill="#2d1e11" stroke="#5c3f20" strokeWidth="1.5" />
              <line x1="82" y1="130" x2="82" y2="160" stroke="#7d582d" strokeWidth="2.5" />
              <line x1="118" y1="130" x2="118" y2="160" stroke="#7d582d" strokeWidth="2.5" />

              {/* Curved Roof Overhang - Chukrasia Wood */}
              <path d="M45 75 Q100 50 155 75 L145 85 Q100 66 55 85 Z" fill="#3b2512" stroke="#e2b662" strokeWidth="1.8" />
              <path d="M60 85 L60 130 M140 85 L140 130" stroke="#a1763c" strokeWidth="2" />

              {/* Hinged Louver Doors (Articulated at 270 degrees) */}
              <motion.g
                animate={{ rotate: (hingeAngle - 270) * 0.4 }}
                style={{ originX: '70px', originY: '105px' }}
              >
                <rect x="70" y="88" width="28" height="42" rx="2" fill="#24170b" stroke="#f0c87d" strokeWidth="1.5" strokeDasharray="3 1" />
                <line x1="70" y1="98" x2="98" y2="98" stroke="#a1763c" strokeWidth="1" />
                <line x1="70" y1="108" x2="98" y2="108" stroke="#a1763c" strokeWidth="1" />
                <line x1="70" y1="118" x2="98" y2="118" stroke="#a1763c" strokeWidth="1" />
              </motion.g>

              {/* Right Louver Panel */}
              <motion.g
                animate={{ rotate: -(hingeAngle - 270) * 0.4 }}
                style={{ originX: '130px', originY: '105px' }}
              >
                <rect x="102" y="88" width="28" height="42" rx="2" fill="#24170b" stroke="#f0c87d" strokeWidth="1.5" strokeDasharray="3 1" />
                <line x1="102" y1="98" x2="130" y2="98" stroke="#a1763c" strokeWidth="1" />
                <line x1="102" y1="108" x2="130" y2="108" stroke="#a1763c" strokeWidth="1" />
                <line x1="102" y1="118" x2="130" y2="118" stroke="#a1763c" strokeWidth="1" />
              </motion.g>

              {/* Bonsai Da Long Silhouette - Truong Xuan Bat Lao */}
              <path d="M145 130 Q152 118 156 122 Q162 112 168 126" stroke="#40916c" strokeWidth="2.5" fill="none" />
              <circle cx="152" cy="116" r="4" fill="#52b788" />
              <circle cx="162" cy="112" r="5" fill="#40916c" />
              <circle cx="168" cy="122" r="4" fill="#2d6a4f" />
            </svg>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs uppercase tracking-widest text-[#a68e6e]">Góc Mở Khớp Mộng Gỗ Lát Hoa</span>
            <div className="text-sm font-medium text-[#faecc8] mt-1">
              Đang Mở {hingeAngle}° · Hạ Nhiệt Vi Khí Hậu -16.4°C · Gió 10.4 m/s
            </div>
          </div>
        </div>

        {/* Interactive Controls & Facets */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Tabs header */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-[#1c140a] border border-[#382613]">
            {facets.map((facet, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFacetIndex(idx)}
                aria-label={facet.title}
                className={`min-h-[44px] flex-1 py-2 px-2.5 rounded-xl text-xs font-medium transition-all ${
                  selectedFacetIndex === idx
                    ? 'bg-[#3b2711] text-[#fbeec9] shadow-md border border-[#785322]'
                    : 'text-[#9c866b] hover:text-[#d6c4a4]'
                }`}
              >
                {facet.title}
              </button>
            ))}
          </div>

          {/* Facet content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFacetIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl border border-[#382715] bg-[#1a1209]"
            >
              <div className="text-[10px] font-mono tracking-wider text-[#e2b662] uppercase">
                {facets[selectedFacetIndex]?.code}
              </div>
              <h3 className="text-base font-serif font-bold text-[#faf0dc] mt-1">
                {facets[selectedFacetIndex]?.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#b59f7f] mt-2 font-light">
                {facets[selectedFacetIndex]?.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Hinge Slider & Controls */}
          <div className="p-5 rounded-2xl border border-[#382715] bg-[#1a1209] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#ddcbb1]">Điều Khiển Khớp Mộng Gỗ Xoay</span>
              <span className="text-sm font-mono font-bold text-[#e2b662]">{hingeAngle}°</span>
            </div>

            <input
              type="range"
              min={0}
              max={270}
              step={1}
              value={hingeAngle}
              onChange={(e) => setHingeAngle(Number(e.target.value))}
              aria-label="Thanh trượt điều chỉnh góc xoay bản lề mộng gỗ Lát Hoa"
              className="w-full accent-[#e2b662] bg-[#291b0c] h-2 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-[#7d674c] font-mono">
              <span>0° (Chắn Giông)</span>
              <span>135° (Đón Gió)</span>
              <span>270° (Mở Toang Toàn Cảnh)</span>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#291b0d]">
              <span className="text-xs text-[#a69171]">Dòng Chảy Hào Nước</span>
              <button
                onClick={() => setMoatFlowActive(!moatFlowActive)}
                aria-label="Kích hoạt hoặc tạm dừng dòng chảy hào nước vi khí hậu"
                className={`min-h-[44px] min-w-[80px] px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  moatFlowActive
                    ? 'border-[#8f6424] bg-[#3a250b] text-[#faecc8]'
                    : 'border-[#3d2b15] bg-[#140d05] text-[#7a644b]'
                }`}
              >
                {moatFlowActive ? 'Đang Tuần Hoàn' : 'Tạm Dừng'}
              </button>
            </div>
          </div>

          {/* GuHomes Atelier Craftsmanship Guarantee */}
          <div className="p-4 rounded-2xl border border-[#33220e] bg-[#120c05] flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#8c5e28] bg-[#261608] flex items-center justify-center text-[#e2b662]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-[11px] leading-snug text-[#9e876a]">
              Được nghiên cứu và tạo tác thủ công tại xưởng may đo Thạnh Xuân 1.200m², giới hạn 12 công trình mỗi năm, gìn giữ trọn vẹn hồn cốt kiến trúc nhiệt đới Sài Gòn.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedChukrasiaFlowerMoatPavilionV20
