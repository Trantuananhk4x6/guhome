'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV15() {
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
      label: 'Hạ Nhiệt Thực Tế',
      value: '-14.2°C',
      subtext: 'So với nhiệt độ nắng gắt ngoài trời',
      detail: 'Hào nước hoa bách thảo chu vi 144m kết hợp tán cổ thụ Đa Búp Đỏ 605 năm tạo đệm vi khí hậu hạ nhiệt tức thì từ 38.5°C xuống 24.3°C.',
    },
    {
      label: 'Vận Tốc Gió Đối Lưu',
      value: '8.2 m/s',
      subtext: 'Lưu thông vi khí hậu ven kênh',
      detail: 'Hệ cánh cửa cối gỗ Long Não mở xoay 270° đón trọn luồng gió mặt nước kênh Sài Gòn đối lưu liên tục qua không gian thưởng trà.',
    },
    {
      label: 'Gỗ Long Não Nguyên Khối',
      value: '595 Năm',
      subtext: 'Kháng ẩm mốc & xua muỗi tự nhiên',
      detail: 'Gỗ Long Não đại ngàn Tây Bắc chứa hàm lượng tinh dầu dồi dào, tỏa hương thơm thảo mộc ấm áp, kháng mối mọt vĩnh cửu.',
    },
    {
      label: 'Bonsai Đa Búp Đỏ Cổ Thụ',
      value: '605 Năm',
      subtext: 'Thế Ngũ Phúc Lâm Môn tụ khí',
      detail: 'Gốc bonsai Đa Búp Đỏ 605 năm tuổi rễ phụ buông rủ kiên cố như vách thành, thanh lọc bụi mịn và che chắn gió xoáy mùa giông.',
    },
  ]

  const facets = [
    {
      title: 'Bản Lề Cối Âm Dương Gỗ Long Não 595 Năm',
      desc: 'Tuyệt kỹ mộng gỗ truyền thống không một chiếc đinh kim loại, chịu tải cánh cửa nặng 380kg xoay êm ái 270°, đón gió đối lưu tự nhiên dọc dòng kênh.',
      specs: 'Gỗ Long Não Tây Bắc · Dày 75mm · Khớp cối đồng đúc thủ công',
    },
    {
      title: 'Hào Nước Hoa Bách Thảo & Sen Trắng Chu Vi 144m',
      desc: 'Dòng nước đối lưu tĩnh bao bọc tứ bề thủy đình, thả sen trắng và bách thảo ngát hương, lọc sạch không khí trước khi vào không gian sinh hoạt.',
      specs: 'Chu vi 144m · Chiều sâu 1.2m · Bơm thủy lực đối lưu ngầm tuần hoàn',
    },
    {
      title: 'Thế Cây Bonsai Đa Búp Đỏ Ngũ Phúc Lâm Môn',
      desc: 'Năm tán chính tỏa đều tựa bàn tay che chở bình an, tượng trưng cho Phú, Quý, Thọ, Khang, Ninh, đem lại sinh khí tĩnh tại cho gia tộc.',
      specs: 'Tuổi thọ 605 năm · Rễ cọc bám đá san hô tự nhiên · Cao 3.8m',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#0c0d0e] py-28 text-[#f4efe6]">
      {/* Background Water Reflection Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-48 left-1/4 h-96 w-96 rounded-full bg-[#3d4a3e] blur-[120px]" />
        <div className="absolute -bottom-48 right-1/4 h-96 w-96 rounded-full bg-[#5c4033] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#161819] px-4 py-1.5 text-xs font-medium tracking-widest text-[#d4af37] uppercase">
            Kiến Trúc Sinh Khí Ven Kênh Sài Gòn · Thế Hệ V15
          </span>
          <h2 className="mt-6 font-serif text-3xl font-light tracking-wide text-[#f4efe6] sm:text-5xl lg:text-6xl">
            Thủy Đình Long Não 595 Năm
            <span className="block font-serif italic text-[#c8a97e]">
              & Hào Bonsai Đa Búp Đỏ 605 Năm V15
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#b0a89a] sm:text-lg">
            Giải pháp vi khí hậu nhiệt đới độc bản từ GuHomes dành riêng cho dinh thự ven sông Sài Gòn.
            Sự kết hợp giữa bản lề cối âm dương gỗ Long Não cổ thụ 595 năm tuổi và hào nước bách thảo lưu chuyển,
            hạ nhiệt tức thì -14.2°C mà không tiêu tốn năng lượng điện.
          </p>
        </div>

        {/* Interactive Controls & Pavilion Simulation */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visualizer Stage */}
          <div className="relative rounded-2xl border border-[#2b2924] bg-[#141517] p-8 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2b2924] pb-6">
              <div>
                <p className="text-xs tracking-wider text-[#8c8275] uppercase">Mô Phỏng Góc Cửa Cối</p>
                <p className="text-2xl font-light text-[#f4efe6]">{hingeAngle}° Mở Xoay Tự Do</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  aria-label={soundscapeActive ? 'Tắt thanh âm Solfeggio' : 'Bật thanh âm Solfeggio'}
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    soundscapeActive
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                      : 'border-[#3a3731] bg-[#1a1b1d] text-[#b0a89a] hover:border-[#8c8275]'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                  <span>{soundscapeActive ? 'Hòa Âm 528Hz: Đang Bật' : 'Hòa Âm Tĩnh Lặng'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMoatFlowActive(!moatFlowActive)}
                  aria-label="Kích hoạt lưu chuyển hào nước"
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    moatFlowActive
                      ? 'border-[#5b8c6f] bg-[#5b8c6f]/20 text-[#7fc49c]'
                      : 'border-[#3a3731] bg-[#1a1b1d] text-[#b0a89a] hover:border-[#8c8275]'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${moatFlowActive ? 'bg-[#7fc49c] animate-pulse' : 'bg-gray-500'}`} />
                  <span>{moatFlowActive ? 'Dòng Hào: Tuần Hoàn' : 'Dòng Hào: Tĩnh'}</span>
                </button>
              </div>
            </div>

            {/* Stage Canvas Representation */}
            <div className="relative my-8 flex h-72 items-center justify-center rounded-xl bg-gradient-to-b from-[#0e0f10] to-[#181a1d] p-6 shadow-inner">
              {/* Moat Water Ripple Animation */}
              {moatFlowActive && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1.6], opacity: [0.35, 0.15, 0] }}
                    transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                    className="absolute h-64 w-64 rounded-full border border-[#5b8c6f]/40"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1.8], opacity: [0.3, 0.1, 0] }}
                    transition={{ repeat: Infinity, duration: 6.2, delay: 1.5, ease: 'easeInOut' }}
                    className="absolute h-80 w-80 rounded-full border border-[#7fc49c]/30"
                  />
                </div>
              )}

              {/* Central Pavilion Structure with Hinged Wing */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex h-40 w-56 items-center justify-center rounded-lg border border-[#3d3830] bg-[#1c1d20] shadow-2xl">
                  <span className="font-serif text-sm tracking-wider text-[#c8a97e]">
                    Trà Thất Long Não 595 Năm
                  </span>

                  {/* Animated Hinged Leaf Wing */}
                  <motion.div
                    animate={{ rotate: hingeAngle }}
                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                    style={{ originX: 0, originY: 0.5 }}
                    className="absolute -right-3 top-1/2 h-28 w-4 -translate-y-1/2 rounded-r-md border border-[#c8a97e] bg-[#5c4033] shadow-lg"
                  >
                    <div className="absolute right-1 top-2 h-2 w-2 rounded-full bg-[#d4af37]" />
                  </motion.div>

                  {/* Wind Vector Arrows */}
                  <div className="absolute -left-12 top-1/2 flex -translate-y-1/2 items-center gap-1 text-[#7fc49c]">
                    <span className="text-xs font-mono font-medium">8.2 m/s</span>
                    <svg className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#a09585]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c8a97e]" />
                  <span>Bản lề cối âm dương gỗ Long Não quay {hingeAngle}°</span>
                </div>
              </div>
            </div>

            {/* Slider to adjust Hinge Angle */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[#b0a89a]">
                <span>Góc Đóng 0° (Chắn bão)</span>
                <span>Mở Đối Lưu 90°</span>
                <span>Mở Toàn Cảnh 180°</span>
                <span>Đón Gió Tối Đa 270°</span>
              </div>
              <input
                type="range"
                min="0"
                max="270"
                step="5"
                value={hingeAngle}
                onChange={(e) => setHingeAngle(Number(e.target.value))}
                aria-label="Điều chỉnh góc mở bản lề cối âm dương"
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#2b2924] accent-[#d4af37]"
              />
            </div>
          </div>

          {/* Facets & Craftsmanship Showcase */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-4">
            {facets.map((facet, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFacetIndex(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  selectedFacetIndex === idx
                    ? 'border-[#d4af37] bg-[#1a1b1d] shadow-lg shadow-[#d4af37]/5'
                    : 'border-[#2b2924] bg-[#141517] hover:border-[#423e37]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#d4af37]">0{idx + 1}</span>
                  <span className="text-xs text-[#8c8275]">Thế Hệ V15</span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-normal text-[#f4efe6]">{facet.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#b0a89a]">{facet.desc}</p>
                <div className="mt-4 border-t border-[#2b2924] pt-3 text-[11px] text-[#c8a97e]">
                  {facet.specs}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-[#2b2924] bg-[#141517] p-6 transition-colors hover:border-[#c8a97e]"
            >
              <p className="text-xs tracking-wider text-[#8c8275] uppercase">{metric.label}</p>
              <p className="mt-3 font-serif text-4xl font-light text-[#f4efe6] group-hover:text-[#d4af37]">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#c8a97e]">{metric.subtext}</p>
              <p className="mt-3 text-xs leading-relaxed text-[#a09585]">{metric.detail}</p>
            </div>
          ))}
        </div>

        {/* Lead Architect Assurance */}
        <div className="mt-16 rounded-2xl border border-[#3d3830] bg-gradient-to-r from-[#17191b] via-[#1f1e1a] to-[#17191b] p-8 text-center sm:p-12">
          <p className="text-xs tracking-widest text-[#d4af37] uppercase">Quy Chuẩn Chế Tác Độc Bản GuHomes</p>
          <h3 className="mt-4 font-serif text-2xl font-light text-[#f4efe6] sm:text-3xl">
            May Đo Riêng Cho Từng Nhịp Sóng & Hướng Nắng Dọc Kênh Sài Gòn
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#b0a89a]">
            Mỗi công trình thủy đình đều được khảo sát hướng gió 365 ngày bằng thiết bị chuyên dụng,
            lựa chọn thân gỗ Long Não đại thụ đủ tuổi tinh dầu tại xưởng Thạnh Xuân 1.200m², đảm bảo trọn vẹn
            100 năm bền bỉ trước nắng mưa nhiệt đới.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#c8a97e]">
            <span>Hotline KTS Trưởng: 0368 757 916</span>
            <span>·</span>
            <span>Email: guhomesvn@gmail.com</span>
            <span>·</span>
            <span>Trần 12 công trình/năm</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV15
