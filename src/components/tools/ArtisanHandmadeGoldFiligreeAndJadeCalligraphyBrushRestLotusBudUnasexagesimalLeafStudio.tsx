'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudUnasexagesimalLeafStudio() {
  const [leafAngle, setLeafAngle] = useState<number>(61)
  const [soundscapeActive, setSoundscapeActive] = useState<boolean>(false)
  const [selectedCraftIndex, setSelectedCraftIndex] = useState<number>(0)
  const [goldShimmerActive, setGoldShimmerActive] = useState<boolean>(true)

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
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz (Tần số chuyển hóa sinh học & sáng tạo)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc1Ref.current = osc1

      // Octave 1056Hz (Tần số minh triết & trực giác thư phòng)
      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(1056, ctx.currentTime)
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

  const metrics: BrushRestMetric[] = [
    {
      label: 'Cánh Sen Phỉ Thúy Type A',
      value: '61 Cánh',
      subtext: 'Lục Thập Nhất Diệp khởi đầu chu kỳ mới',
      detail: 'Mỗi cánh sen được nghệ nhân mài giũa từ Ngọc Phỉ Thúy Miến Điện Type A tự nhiên 100%, độ thấu quang cao và sắc xanh lục bảo hoàng gia.',
    },
    {
      label: 'Chỉ Vàng 24K Filigree',
      value: '0.11 mm',
      subtext: 'Nẹp viền thủ công từng cánh sen',
      detail: 'Sợi chỉ vàng ròng 99.99% được kéo siêu mảnh, uốn lượn ôm trọn từng đường gân ngọc bích, bảo vệ rìa cánh ngọc không sứt mẻ.',
    },
    {
      label: 'Bệ Đỡ Mun Sừng Khánh Hòa',
      value: '400 Năm',
      subtext: 'Đen tuyền như huyền thạch vĩnh cửu',
      detail: 'Gỗ Mun Sừng Khánh Hòa quý hiếm bậc nhất, chất gỗ nặng chìm trong nước, thớ mịn màng và mài bóng hoàn toàn bằng lá chuối mốc tự nhiên.',
    },
    {
      label: 'Tần Số Minh Triết Thư Phòng',
      value: '528 & 1056 Hz',
      subtext: 'Kích hoạt tư duy sáng tạo an định',
      detail: 'Sóng âm cộng hưởng kép hỗ trợ chủ nhân tập trung tinh thần tuyệt đối trong những giờ phút ký kết văn kiện hoặc trước tác thư pháp.',
    },
  ]

  const craftDetails = [
    {
      step: 'Bước 01 · Tuyển Chọn Ngọc Bích',
      title: 'Ngọc Phỉ Thúy Type A Tự Nhiên Không Xử Lý',
      desc: 'Tuyển lọc từ các khối ngọc thô vùng Kachin, không qua xử lý hóa chất hay nhuộm màu nhân tạo, giữ vẹn nguyên tính hàn và năng lượng an lành.',
      material: 'Ngọc Lục Bảo Phỉ Thúy Type A · Độ cứng Mohs 6.5 - 7',
    },
    {
      step: 'Bước 02 · Kéo Chỉ Vàng Filigree',
      title: 'Đan Dệt Rìa Cánh Sen Thủ Công Tinh Xảo',
      desc: 'Nghệ nhân dùng kẹp vi phẫu uốn từng sợi chỉ vàng 24K quanh sống cánh ngọc, tạo độ tương phản vương giả giữa sắc xanh ngọc và ánh kim.',
      material: 'Vàng ròng 24K · Độ dày 0.11mm · Kỹ nghệ cung đình',
    },
    {
      step: 'Bước 03 · Khảm Ghép Bệ Mun Sừng',
      title: 'Mộng Gỗ Âm Dương Mun Sừng Khánh Hòa 400 Năm',
      desc: 'Phần bệ đỡ được đục đẽo từ khối Mun Sừng hóa thạch, các mộng ngọc được cài chuẩn xác từng micromet, tạo thế đứng vững chãi vĩnh cửu.',
      material: 'Mun Sừng Khánh Hòa 400 năm · Mài bóng không hóa chất',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#0a0c0b] py-28 text-[#f2efe9]">
      {/* Background Jade Green Aura */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#1b4332] blur-[140px]" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-[#2d5a44] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#52b788]/30 bg-[#121815] px-4 py-1.5 text-xs font-medium tracking-widest text-[#52b788] uppercase">
            Tuyệt Phẩm Thư Phòng Danh Gia · GuHomes Atelier
          </span>
          <h2 className="mt-6 font-serif text-3xl font-light tracking-wide text-[#f2efe9] sm:text-5xl lg:text-6xl">
            Kê Ngự Bút Sen Lục Thập Nhất Diệp
            <span className="block font-serif italic text-[#74c69d]">
              61 Cánh Phỉ Thúy Type A Trên Bệ Mun Sừng 400 Năm
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#b4aba0] sm:text-lg">
            Khởi đầu chu kỳ phát triển mới sau cột mốc hoa giáp. 61 cánh sen Phỉ Thúy xanh ngọc thấu quang,
            nẹp viền vàng 24K Filigree tinh xảo tựa cánh sen sớm đọng sương mai trên mặt bàn Mun Sừng tĩnh mặc,
            tôn vinh phong thái điềm tĩnh và quyền uy của chủ nhân.
          </p>
        </div>

        {/* Interactive Brush Rest Simulation */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visual Stage */}
          <div className="relative rounded-2xl border border-[#27352d] bg-[#101412] p-8 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#27352d] pb-6">
              <div>
                <p className="text-xs tracking-wider text-[#738279] uppercase">Mô Phỏng Độ Xòe Cánh Sen</p>
                <p className="text-2xl font-light text-[#f2efe9]">{leafAngle} Cánh Sen Lục Thập Nhất Diệp</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  aria-label={soundscapeActive ? 'Tắt thanh âm minh triết 528Hz & 1056Hz' : 'Bật thanh âm minh triết 528Hz & 1056Hz'}
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    soundscapeActive
                      ? 'border-[#52b788] bg-[#52b788]/20 text-[#74c69d]'
                      : 'border-[#2d3a33] bg-[#141b17] text-[#b4aba0] hover:border-[#738279]'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"
                    />
                  </svg>
                  <span>{soundscapeActive ? 'Thư Phòng Minh Triết: 528Hz + 1056Hz' : 'Hòa Âm Tĩnh Lặng'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGoldShimmerActive(!goldShimmerActive)}
                  aria-label="Chuyển trạng thái ánh kim vàng Filigree"
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    goldShimmerActive
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                      : 'border-[#2d3a33] bg-[#141b17] text-[#b4aba0] hover:border-[#738279]'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${goldShimmerActive ? 'bg-[#d4af37] animate-pulse' : 'bg-gray-500'}`} />
                  <span>{goldShimmerActive ? 'Vàng 24K: Chiếu Rọi' : 'Ánh Kim Tĩnh'}</span>
                </button>
              </div>
            </div>

            {/* Stage Canvas Representation */}
            <div className="relative my-8 flex h-72 items-center justify-center rounded-xl bg-gradient-to-b from-[#080a09] to-[#141a17] p-6 shadow-inner">
              {/* Shimmer Ambient Glow */}
              {goldShimmerActive && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
                  <motion.div
                    animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
                    transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                    className="absolute h-64 w-64 rounded-full border border-dashed border-[#52b788]/20"
                  />
                  <motion.div
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                    className="absolute h-48 w-48 rounded-full bg-[#d4af37]/15 blur-2xl"
                  />
                </div>
              )}

              {/* Central Jade Brush Rest & Calligraphy Brush */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Jade Lotus Brush Rest Sculpture */}
                <div className="relative flex h-32 w-52 items-center justify-center rounded-2xl border-2 border-[#52b788]/60 bg-gradient-to-tr from-[#132a21] via-[#1b4332] to-[#0d1e17] shadow-[0_0_40px_rgba(82,183,136,0.2)]">
                  {/* Gold Filigree Ribbon */}
                  <div className="absolute inset-1 rounded-xl border border-[#d4af37]/50" />

                  {/* Lotus Leaf Fan Arc */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [28, 44, 28] }}
                        transition={{ repeat: Infinity, duration: 2.8, delay: i * 0.15, ease: 'easeInOut' }}
                        className="w-2.5 rounded-full bg-gradient-to-t from-[#2d6a4f] to-[#74c69d] shadow-sm"
                      />
                    ))}
                  </div>

                  <span className="absolute bottom-2 text-[10px] font-serif tracking-wider text-[#d4af37]">
                    Lục Thập Nhất Diệp · 61 Cánh
                  </span>
                </div>

                {/* Mun Sung Timber Base */}
                <div className="mt-2 h-7 w-60 rounded border border-[#202020] bg-[#111111] shadow-2xl flex items-center justify-center">
                  <span className="text-[10px] tracking-widest text-[#a8a8a8] uppercase">
                    Bệ Mun Sừng Khánh Hòa 400 Năm
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#8c9c93]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#74c69d]" />
                  <span>Kê bút ngự dụng · Vững chãi tuyệt đối cho ngọn bút lông thỏ</span>
                </div>
              </div>
            </div>

            {/* Slider to adjust Leaf Angle */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[#b4aba0]">
                <span>Sen Nụ E Ấp 15 Cánh</span>
                <span>Chớm Nở 35 Cánh</span>
                <span>Lục Thập Hoa Giáp 60 Cánh</span>
                <span>Khởi Điểm Mới 61 Cánh</span>
              </div>
              <input
                type="range"
                min="15"
                max="61"
                step="1"
                value={leafAngle}
                onChange={(e) => setLeafAngle(Number(e.target.value))}
                aria-label="Điều chỉnh số cánh sen Phỉ Thúy mở bung"
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#27352d] accent-[#52b788]"
              />
            </div>
          </div>

          {/* Craftsmanship Steps Showcase */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-4">
            {craftDetails.map((craft, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCraftIndex(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  selectedCraftIndex === idx
                    ? 'border-[#52b788] bg-[#16201a] shadow-lg shadow-[#52b788]/5'
                    : 'border-[#27352d] bg-[#101412] hover:border-[#3d5045]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#52b788]">{craft.step}</span>
                  <span className="text-xs text-[#738279]">Atelier</span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-normal text-[#f2efe9]">{craft.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#b4aba0]">{craft.desc}</p>
                <div className="mt-4 border-t border-[#27352d] pt-3 text-[11px] text-[#74c69d]">
                  {craft.material}
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
              className="group relative rounded-2xl border border-[#27352d] bg-[#101412] p-6 transition-colors hover:border-[#52b788]"
            >
              <p className="text-xs tracking-wider text-[#738279] uppercase">{metric.label}</p>
              <p className="mt-3 font-serif text-4xl font-light text-[#f2efe9] group-hover:text-[#52b788]">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#74c69d]">{metric.subtext}</p>
              <p className="mt-3 text-xs leading-relaxed text-[#8c9c93]">{metric.detail}</p>
            </div>
          ))}
        </div>

        {/* Lead Architect & Studio Assurance */}
        <div className="mt-16 rounded-2xl border border-[#2f4237] bg-gradient-to-r from-[#121915] via-[#1a2620] to-[#121915] p-8 text-center sm:p-12">
          <p className="text-xs tracking-widest text-[#52b788] uppercase">Chế Tác Thủ Công Thư Phòng GuHomes</p>
          <h3 className="mt-4 font-serif text-2xl font-light text-[#f2efe9] sm:text-3xl">
            Tĩnh Tại Khởi Sinh Trí Tuệ · Đỉnh Cao Văn Hóa Sống Thượng Lưu
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#b4aba0]">
            Mỗi tuyệt phẩm kê bút sen ngọc Phỉ Thúy được các nghệ nhân kim hoàn và chạm ngọc lão thành
            tỉ mỉ thực hiện trong hơn 500 giờ công tại xưởng Thạnh Xuân 1.200m², là vật phẩm phong thủy
            trấn thủ tài lộc và hanh thông cho các bậc tài hoa danh thế.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#74c69d]">
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

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudUnasexagesimalLeafStudio
