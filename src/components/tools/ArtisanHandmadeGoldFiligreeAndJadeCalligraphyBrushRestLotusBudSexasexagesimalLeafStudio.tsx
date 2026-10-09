'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudSexasexagesimalLeafStudio() {
  const [leafAngle, setLeafAngle] = useState<number>(66)
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
      label: 'Cánh Sen Phỉ Thúy',
      value: '66 Cánh',
      subtext: 'Song Lục Đắc Lộc hoàng gia',
      detail: 'Mỗi cánh sen được gọt dũa từ Ngọc Phỉ Thúy Type A thấu quang tự nhiên, độ trong suốt đạt chuẩn băng chủng quý hiếm.'
    },
    {
      label: 'Vàng Ròng 24K Filigree',
      value: '0.11 mm',
      subtext: 'Chỉ vàng kéo tay nghệ nhân',
      detail: 'Chỉ vàng 999.9 se sợi vi mô nẹp viền quanh 66 cánh sen, tạo hiệu ứng khúc xạ ánh sáng lấp lánh khi có đèn chiếu rọi.'
    },
    {
      label: 'Bệ Gỗ Sưa Đỏ',
      value: '400 Năm',
      subtext: 'Sưa Đỏ Bắc Bộ nguyên khối',
      detail: 'Gỗ Sưa Đỏ vân mây tứ diện huyền thoại phát ánh kim lóng lánh, tỏa hương trầm dịu dàng xua tan ẩm ướt Sài Gòn.'
    },
    {
      label: 'Khí Trường Thư Phòng',
      value: '528Hz + 1056Hz',
      subtext: 'Hài âm Solfeggio minh triết',
      detail: 'Sự cộng hưởng giữa ngọc phỉ thúy và vàng ròng đem lại trường năng lượng thanh tao, định tâm cho gia chủ khi làm việc.'
    }
  ]

  const craftProcesses = [
    {
      name: 'Tuyển Chọn Ngọc Phỉ Thúy Type A (Băng Chủng)',
      desc: 'Tuyển lựa những phiến ngọc bích Miến Điện có độ ngậm lục ngọc đồng đều, không tì vết, độ thấu quang cao để ánh sáng xuyên thấu dịu mắt.',
      materialSpec: 'Độ cứng Mohs 6.5 - 7.0, khúc xạ ánh sáng 1.66, ngọc tính tự nhiên hoàn toàn'
    },
    {
      name: 'Nghệ Thuật Kéo Sợi Chỉ Vàng Filigree 0.11mm',
      desc: 'Nghệ nhân hoàng kim uốn từng sợi chỉ vàng ròng 24K bao bọc quanh gân lá sen. Từng mối hàn được gắn kết bằng kỹ thuật vi điểm bí truyền không để lại dấu tích.',
      materialSpec: 'Vàng ròng 24K (Au 99.99%), chỉ dày 0.11mm, uốn lượn nhịp nhàng'
    },
    {
      name: 'Đẽo Gọt Bệ Sưa Đỏ Mộng Cổ 400 Năm Tuổi',
      desc: 'Bệ gác bút chế tác từ lõi Sưa Đỏ Bắc Bộ cổ thụ, mài bóng thủ công bằng sáp ong tự nhiên, không sơn phủ hóa chất, tỏa hương gỗ mộc thanh sạch.',
      materialSpec: 'Sưa Đỏ Bắc Bộ 400 năm, vân tứ diện phát quang, mộng nêm truyền thống'
    }
  ]

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0D0E] py-20 md:py-32 text-[#EAE5D9]">
      {/* Background Ambience */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, rgba(44, 95, 78, 0.25) 0%, rgba(10, 13, 14, 0.95) 75%)`
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#52B788] mb-3">
            Văn Phòng Tứ Bảo Cung Đình · Atelier May Đo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#F4F1EA] tracking-tight leading-tight">
            Kê Ngự Bút Sen Lục Thập Lục Diệp Phỉ Thúy Type A Nẹp Vàng 24K Trên Bệ Sưa Đỏ 400 Năm
          </h2>
          <div className="w-16 h-px bg-[#52B788] mx-auto my-6 opacity-60" />
          <p className="text-base sm:text-lg text-[#C5BFA8] font-light leading-relaxed">
            Tuyệt tác gác bút dành cho án thư thượng lưu. 66 cánh sen Song Lục Đắc Lộc chạm ngọc Phỉ Thúy Type A nẹp chỉ Vàng 24K Filigree tinh xảo, ngự trên bệ gỗ Sưa Đỏ Bắc Bộ 400 năm tuổi vân mây ánh kim huyền ảo.
          </p>
        </div>

        {/* Interactive Controls & Atelier Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Visualizer Panel */}
          <div className="lg:col-span-8 bg-[#111718] rounded-2xl p-6 sm:p-8 border border-[#223633] shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1C2C2A]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#52B788]">Tương Tác Nghệ Thuật Thư Phòng</span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F4F1EA]">66 Cánh Sen Phỉ Thúy Thấu Quang</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  aria-label="Kích hoạt âm thanh Solfeggio 528Hz & 1056Hz"
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                    soundscapeActive
                      ? 'bg-[#2D6A4F] text-white border-[#52B788] shadow-lg shadow-[#2D6A4F]/30'
                      : 'bg-[#152220] text-[#52B788] border-[#253D38] hover:border-[#52B788]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${soundscapeActive ? 'bg-[#74C69D] animate-pulse' : 'bg-[#40916C]'}`} />
                  {soundscapeActive ? 'Chuông Ngọc 528Hz + 1056Hz (Đang Phát)' : 'Bật Chuông Định Tâm'}
                </button>
              </div>
            </div>

            {/* Central Graphic Visualizer */}
            <div className="relative aspect-[16/10] my-8 rounded-xl bg-[#0B0F10] border border-[#1D2E2B] overflow-hidden flex items-center justify-center">
              {/* Jade Halo Rings */}
              <div className="absolute inset-0 opacity-25 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#52B788" strokeWidth="1" strokeDasharray="6 6" />
                  <circle cx="50%" cy="50%" r="30%" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <circle cx="50%" cy="50%" r="18%" fill="none" stroke="#74C69D" strokeWidth="2" strokeDasharray="4 8" />
                </svg>
              </div>

              {/* Lotus Bud Centerpiece */}
              <motion.div 
                className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-[#52B788]/40 bg-[#14201E]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 shadow-2xl"
                animate={{ rotate: (leafAngle - 66) * 3 }}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
              >
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-widest text-[#52B788] mb-1">Cánh Sen Búp Ngọc</div>
                  <div className="text-3xl sm:text-4xl font-serif text-[#F4F1EA] font-semibold">{leafAngle} Cánh</div>
                  <div className="text-[11px] text-[#D4AF37] mt-1 font-mono">Nẹp Vàng 24K Filigree</div>
                  <div className="text-[10px] text-[#74C69D]/80 mt-2">Song Lục Đắc Lộc</div>
                </div>
              </motion.div>

              {/* Pedestal Tag */}
              <div className="absolute top-6 left-8 bg-[#14201E]/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#223633]">
                <div className="text-[10px] text-[#52B788] uppercase tracking-wider">Bệ Gác Bút</div>
                <div className="text-xs font-serif text-[#EAE5D9]">Sưa Đỏ Bắc Bộ 400 Năm</div>
              </div>

              {/* Light Transmission Tag */}
              <div className="absolute bottom-6 right-8 text-right bg-[#14201E]/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#223633]">
                <div className="text-[10px] text-[#52B788] uppercase tracking-wider">Thấu Quang</div>
                <div className="text-xs font-mono text-[#D4AF37]">97.2% Lục Phỉ Thúy</div>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1C2C2A]">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="leaf-slider-v66" className="text-xs text-[#C5BFA8] uppercase tracking-wider">
                    Số Cánh Mở Rộng: <span className="text-[#F4F1EA] font-semibold">{leafAngle} Cánh Sen</span>
                  </label>
                  <span className="text-xs text-[#52B788] font-mono">1 - 66</span>
                </div>
                <input
                  id="leaf-slider-v66"
                  type="range"
                  min="1"
                  max="66"
                  step="1"
                  value={leafAngle}
                  onChange={(e) => setLeafAngle(Number(e.target.value))}
                  className="w-full h-2 bg-[#1C2C2A] rounded-lg appearance-none cursor-pointer accent-[#52B788]"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setGoldShimmerActive(!goldShimmerActive)}
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 border ${
                    goldShimmerActive
                      ? 'bg-[#1E362D] text-[#74C69D] border-[#315749]'
                      : 'bg-[#13201D] text-[#7D9B91] border-[#223633]'
                  }`}
                >
                  {goldShimmerActive ? 'Ánh Kim Filigree: Bật' : 'Ánh Kim: Dịu Nhẹ'}
                </button>
                <button
                  type="button"
                  onClick={() => setLeafAngle(66)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs tracking-wider bg-[#152220] text-[#52B788] border border-[#253D38] hover:border-[#52B788] transition-all"
                >
                  Viên Mãn 66 Cánh
                </button>
              </div>
            </div>
          </div>

          {/* Craft Processes Panel */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#52B788] block mb-2">Kỹ Thuật Chế Tác Cung Đình</span>
            {craftProcesses.map((process, idx) => (
              <div
                key={process.name}
                onClick={() => setSelectedCraftIndex(idx)}
                className={`cursor-pointer rounded-xl p-5 border transition-all duration-300 ${
                  selectedCraftIndex === idx
                    ? 'bg-[#182623] border-[#52B788] shadow-lg'
                    : 'bg-[#111718]/80 border-[#1F302D] hover:border-[#2D4540]'
                }`}
              >
                <h4 className={`text-base font-serif font-medium mb-1 ${selectedCraftIndex === idx ? 'text-[#F4F1EA]' : 'text-[#C5BFA8]'}`}>
                  {process.name}
                </h4>
                <p className="text-xs text-[#9BB1AA] leading-relaxed mb-3">
                  {process.desc}
                </p>
                <div className="text-[11px] font-mono text-[#52B788] bg-[#0B0F10] px-2.5 py-1 rounded inline-block">
                  {process.materialSpec}
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
              className="bg-[#111718] rounded-xl p-6 border border-[#1F302D] relative group hover:border-[#52B788] transition-all duration-300"
            >
              <div className="text-xs uppercase tracking-wider text-[#52B788] mb-1">{metric.label}</div>
              <div className="text-3xl font-serif font-semibold text-[#F4F1EA] mb-1">{metric.value}</div>
              <div className="text-xs text-[#74C69D] font-medium mb-3">{metric.subtext}</div>
              <p className="text-xs text-[#8BA49C] leading-relaxed border-t border-[#1C2C2A] pt-3">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-[#758E85] max-w-2xl mx-auto font-light leading-relaxed">
          Tác phẩm được chế tác độc bản thủ công bởi bàn tay nghệ nhân kim hoàn hoàng gia GuHomes, bảo tồn tinh hoa mỹ nghệ Việt Nam trường tồn cùng thời gian.
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudSexasexagesimalLeafStudio
