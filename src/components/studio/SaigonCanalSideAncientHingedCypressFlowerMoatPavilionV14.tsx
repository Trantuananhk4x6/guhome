'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CanalPavilionMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function SaigonCanalSideAncientHingedCypressFlowerMoatPavilionV14() {
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

      // Solfeggio 528Hz (Tần số chuyển hóa sinh học)
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
      value: '-14.3°C',
      subtext: 'So với nhiệt độ nắng gắt bên ngoài',
      detail: 'Hào nước hoa bách thảo chu vi 146m kết hợp tán cổ thụ Tùng La Hán 600 năm tạo đệm vi khí hậu hạ nhiệt tức thì từ 38.8°C xuống 24.5°C.',
    },
    {
      label: 'Vận Tốc Gió Đối Lưu',
      value: '8.3 m/s',
      subtext: 'Lưu thông vi khí hậu mặt nước kênh',
      detail: 'Hệ cánh cửa cối gỗ Hoàng Đàn Tuyết mở xoay 270° đón trọn luồng gió mát đối lưu liên tục qua không gian thưởng trà.',
    },
    {
      label: 'Hoàng Đàn Tuyết Cực Phẩm',
      value: '590 Năm',
      subtext: 'Tuyết tinh dầu phủ trắng bề mặt',
      detail: 'Gỗ Hoàng Đàn Tuyết Lạng Sơn 590 năm tuổi chứa hàm lượng tinh dầu quý hiếm, tỏa hương thơm ấm nồng, kháng ẩm mốc và xua đuổi côn trùng.',
    },
    {
      label: 'Bonsai Tùng Cổ Thụ Nghinh Phong',
      value: '600 Năm',
      subtext: 'Dáng vươn mình đón gió trường tồn',
      detail: 'Gốc bonsai Tùng 600 năm tuổi thân vặn xoắn gân guốc, tán lá dầy đặc thanh lọc bụi mịn và che chắn gió bão cho thủy đình.',
    },
  ]

  const facets = [
    {
      title: 'Bản Lề Cối Âm Dương Hoàng Đàn Tuyết 590 Năm',
      desc: 'Tuyệt kỹ mộng gỗ truyền thống không dùng đinh kim loại, cánh cửa dày 78mm xoay êm ái 270°, đón gió đối lưu tự nhiên dọc dòng kênh.',
      specs: 'Gỗ Hoàng Đàn Tuyết Lạng Sơn · Dày 78mm · Khớp cối đồng nguyên khối',
    },
    {
      title: 'Hào Nước Hoa Bách Thảo Chu Vi 146m',
      desc: 'Mặt nước tĩnh bao bọc tứ bề thủy đình thả hoa sen bách diệp và hoa súng tuyết, lọc sạch không khí trước khi đưa vào không gian sống.',
      specs: 'Chu vi 146m · Sâu 1.25m · Hệ tuần hoàn thủy lực ngầm không tiếng ồn',
    },
    {
      title: 'Thế Bonsai Tùng Nghinh Phong Cổ Thụ',
      desc: 'Thân vươn nghiêng 45° đón gió như ý chí quân tử kiên cường, mang lại sinh khí vững chãi và năng lượng hưng vượng cho gia tộc.',
      specs: 'Tuổi thọ 600 năm · Rễ cọc bám khối đá vôi cổ sinh · Cao 3.9m',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#0b0d0c] py-28 text-[#f3f0ea]">
      {/* Background Water & Snow Cypress Aura */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-48 left-1/3 h-96 w-96 rounded-full bg-[#2f4f4f] blur-[130px]" />
        <div className="absolute -bottom-48 right-1/4 h-96 w-96 rounded-full bg-[#4a3b32] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#141816] px-4 py-1.5 text-xs font-medium tracking-widest text-[#d4af37] uppercase">
            Kiến Trúc Sinh Khí Ven Kênh Sài Gòn · Thế Hệ V14
          </span>
          <h2 className="mt-6 font-serif text-3xl font-light tracking-wide text-[#f3f0ea] sm:text-5xl lg:text-6xl">
            Thủy Đình Hoàng Đàn Tuyết 590 Năm
            <span className="block font-serif italic text-[#c5a880]">
              & Hào Bonsai Tùng Nghinh Phong 600 Năm V14
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#ada294] sm:text-lg">
            Giải pháp vi khí hậu nhiệt đới may đo độc bản từ GuHomes dành riêng cho dinh thự ven sông Sài Gòn.
            Sự kết hợp giữa bản lề cối âm dương gỗ Hoàng Đàn Tuyết Lạng Sơn 590 năm tuổi và hào nước bách thảo đối lưu,
            hạ nhiệt tức thì -14.3°C hoàn toàn thuận tự nhiên.
          </p>
        </div>

        {/* Interactive Simulation Stage */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visualizer Stage */}
          <div className="relative rounded-2xl border border-[#2a2d2a] bg-[#121514] p-8 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2a2d2a] pb-6">
              <div>
                <p className="text-xs tracking-wider text-[#828882] uppercase">Mô Phỏng Cánh Cửa Cối Hoàng Đàn</p>
                <p className="text-2xl font-light text-[#f3f0ea]">{hingeAngle}° Mở Xoay Tự Do</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  aria-label={soundscapeActive ? 'Tắt thanh âm Solfeggio' : 'Bật thanh âm Solfeggio'}
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    soundscapeActive
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                      : 'border-[#363a36] bg-[#171b19] text-[#ada294] hover:border-[#828882]'
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
                      ? 'border-[#52b788] bg-[#52b788]/20 text-[#74c69d]'
                      : 'border-[#363a36] bg-[#171b19] text-[#ada294] hover:border-[#828882]'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${moatFlowActive ? 'bg-[#74c69d] animate-pulse' : 'bg-gray-500'}`} />
                  <span>{moatFlowActive ? 'Dòng Hào: Tuần Hoàn' : 'Dòng Hào: Tĩnh'}</span>
                </button>
              </div>
            </div>

            {/* Stage Canvas Representation */}
            <div className="relative my-8 flex h-72 items-center justify-center rounded-xl bg-gradient-to-b from-[#0c0f0e] to-[#161a19] p-6 shadow-inner">
              {/* Moat Water Ripple Animation */}
              {moatFlowActive && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
                  <motion.div
                    animate={{ scale: [1, 1.35, 1.7], opacity: [0.35, 0.15, 0] }}
                    transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut' }}
                    className="absolute h-64 w-64 rounded-full border border-[#52b788]/40"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.45, 1.85], opacity: [0.3, 0.1, 0] }}
                    transition={{ repeat: Infinity, duration: 6.0, delay: 1.4, ease: 'easeInOut' }}
                    className="absolute h-80 w-80 rounded-full border border-[#74c69d]/30"
                  />
                </div>
              )}

              {/* Central Pavilion Structure with Hinged Wing */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex h-40 w-56 items-center justify-center rounded-lg border border-[#384039] bg-[#1a201c] shadow-2xl">
                  <span className="font-serif text-sm tracking-wider text-[#c5a880]">
                    Hoàng Đàn Tuyết 590 Năm
                  </span>

                  {/* Animated Hinged Leaf Wing */}
                  <motion.div
                    animate={{ rotate: hingeAngle }}
                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                    style={{ originX: 0, originY: 0.5 }}
                    className="absolute -right-3 top-1/2 h-28 w-4 -translate-y-1/2 rounded-r-md border border-[#c5a880] bg-[#4a3b32] shadow-lg"
                  >
                    <div className="absolute right-1 top-2 h-2 w-2 rounded-full bg-[#d4af37]" />
                  </motion.div>

                  {/* Wind Vector Arrows */}
                  <div className="absolute -left-12 top-1/2 flex -translate-y-1/2 items-center gap-1 text-[#74c69d]">
                    <span className="text-xs font-mono font-medium">8.3 m/s</span>
                    <svg className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#9aa49c]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
                  <span>Bản lề cối âm dương gỗ Hoàng Đàn Tuyết mở {hingeAngle}°</span>
                </div>
              </div>
            </div>

            {/* Slider to adjust Hinge Angle */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[#ada294]">
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
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#2a2d2a] accent-[#d4af37]"
              />
            </div>
          </div>

          {/* Facets Showcase */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-4">
            {facets.map((facet, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFacetIndex(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  selectedFacetIndex === idx
                    ? 'border-[#d4af37] bg-[#171b19] shadow-lg shadow-[#d4af37]/5'
                    : 'border-[#2a2d2a] bg-[#121514] hover:border-[#3d423e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#d4af37]">0{idx + 1}</span>
                  <span className="text-xs text-[#828882]">Thế Hệ V14</span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-normal text-[#f3f0ea]">{facet.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#ada294]">{facet.desc}</p>
                <div className="mt-4 border-t border-[#2a2d2a] pt-3 text-[11px] text-[#c5a880]">
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
              className="group relative rounded-2xl border border-[#2a2d2a] bg-[#121514] p-6 transition-colors hover:border-[#c5a880]"
            >
              <p className="text-xs tracking-wider text-[#828882] uppercase">{metric.label}</p>
              <p className="mt-3 font-serif text-4xl font-light text-[#f3f0ea] group-hover:text-[#d4af37]">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#c5a880]">{metric.subtext}</p>
              <p className="mt-3 text-xs leading-relaxed text-[#9aa49c]">{metric.detail}</p>
            </div>
          ))}
        </div>

        {/* Lead Architect Assurance */}
        <div className="mt-16 rounded-2xl border border-[#384039] bg-gradient-to-r from-[#141816] via-[#1c221e] to-[#141816] p-8 text-center sm:p-12">
          <p className="text-xs tracking-widest text-[#d4af37] uppercase">Quy Chuẩn Chế Tác Độc Bản GuHomes</p>
          <h3 className="mt-4 font-serif text-2xl font-light text-[#f3f0ea] sm:text-3xl">
            May Đo Riêng Cho Từng Nhịp Sóng & Hướng Nắng Dọc Kênh Sài Gòn
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#ada294]">
            Mỗi công trình thủy đình đều được khảo sát hướng gió 365 ngày bằng thiết bị chuyên dụng,
            lựa chọn thân gỗ Hoàng Đàn Tuyết đại thụ đủ tuổi tinh dầu tại xưởng Thạnh Xuân 1.200m², đảm bảo trọn vẹn
            100 năm bền bỉ trước nắng mưa nhiệt đới.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#c5a880]">
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

export default SaigonCanalSideAncientHingedCypressFlowerMoatPavilionV14
