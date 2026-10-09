'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudQuinseptuagesimalLeafStudio() {
  const [leafRotationAngle, setLeafRotationAngle] = useState<number>(75)
  const [jadeGlowIntensity, setJadeGlowIntensity] = useState<number>(91)
  const [harmonicResonanceActive, setHarmonicResonanceActive] = useState<boolean>(false)
  const [selectedAtelierAspect, setSelectedAtelierAspect] = useState<number>(0)

  // Web Audio Context & Oscillators for Solfeggio 528Hz & 1056Hz (Crown Wisdom & Clarity)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscBaseRef = useRef<OscillatorNode | null>(null)
  const oscHarmonicRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopHarmonics = () => {
    try {
      if (oscBaseRef.current) {
        oscBaseRef.current.stop()
        oscBaseRef.current.disconnect()
        oscBaseRef.current = null
      }
      if (oscHarmonicRef.current) {
        oscHarmonicRef.current.stop()
        oscHarmonicRef.current.disconnect()
        oscHarmonicRef.current = null
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

  const startHarmonics = () => {
    stopHarmonics()
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.038, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz: Transformation & Pure Vision
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      oscBaseRef.current = osc1

      // Octave 1056Hz: Deep Focus & High Awareness
      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(1056, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      oscHarmonicRef.current = osc2
    } catch {
      // Audio error catch
    }
  }

  const toggleHarmonics = () => {
    if (harmonicResonanceActive) {
      stopHarmonics()
      setHarmonicResonanceActive(false)
    } else {
      startHarmonics()
      setHarmonicResonanceActive(true)
    }
  }

  useEffect(() => {
    return () => {
      stopHarmonics()
    }
  }, [])

  const metrics: BrushRestMetric[] = [
    {
      label: '75 Cánh Sen Ngũ Phúc Lâm Môn',
      value: '75 Diệp',
      subtext: 'Ngọc Phỉ Thúy Type A Miến Điện tự nhiên',
      detail: '75 phiến cánh sen ngọc bích chạm lộng tỉ mỉ tạo hình búp sen vươn mình tinh khiết, tượng trưng cho ngũ phúc lâm môn, phú quý trường thọ.'
    },
    {
      label: 'Nẹp Vàng 24K Filigree Thủ Công',
      value: '0.11 mm',
      subtext: 'Sợi vàng ròng 99.99% bao viền tinh xảo',
      detail: 'Kỹ nghệ kéo sợi vàng siêu mảnh và hàn điểm thủ công tuyệt kỹ, gia cố từng mép cánh ngọc chống va chạm và bắt sáng lộng lẫy dưới ánh đèn thư phòng.'
    },
    {
      label: 'Bệ Hoàng Đàn Tuyết Lạng Sơn 400 Năm',
      value: '400 Năm',
      subtext: 'Cupressus torulosa phủ tuyết tinh dầu thơm ngát',
      detail: 'Chất gỗ quý hiếm phủ lớp tuyết óng ánh phát tỏa mùi thơm dịu ngọt vương giả, xua đuổi côn trùng, tôn vinh phẩm giá ngự bút thượng phẩm.'
    },
    {
      label: 'Hòa Âm Solfeggio Kép Minh Triết',
      value: '528 & 1056Hz',
      subtext: 'Thanh lọc tâm trí & khơi nguồn cảm hứng sáng tác',
      detail: 'Sóng âm cộng hưởng bát độ kích hoạt tư duy sáng tạo tĩnh tại, đưa tâm thế người thưởng lãm về trạng thái thư thái sâu lắng của phong cách Quiet Luxury.'
    }
  ]

  const atelierAspects = [
    {
      title: '75 Cánh Sen Phỉ Thúy Type A Ngũ Phúc Lâm Môn',
      category: 'Tuyệt Mỹ Ngọc Học',
      description: 'Mỗi cánh sen được cắt mài từ phiến ngọc Phỉ Thúy Type A tự nhiên thấu quang 90%, phô diễn sắc lục lý bảo ngọc thanh tao, nâng đỡ ngọn bút lông thỏ ngự chế mềm mại.'
    },
    {
      title: 'Khung Nẹp Vàng 24K Filigree Độc Bản',
      category: 'Kim Hoàn Hoàng Gia',
      description: 'Nghệ nhân GuHomes dùng sợi vàng 24K mảnh 0.11mm đan viền từng mép lá, tạo điểm nhấn kim sắc sang trọng đối lập hoàn hảo với sắc xanh ngọc bích và gỗ hoàng đàn tuyết vàng ấm.'
    },
    {
      title: 'Bệ Gỗ Hoàng Đàn Tuyết Lạng Sơn 400 Năm Thơm Ngọt',
      category: 'Mộc Nghệ Cổ Truyền',
      description: 'Được chế tác từ khối gỗ Hoàng Đàn Tuyết Lạng Sơn 400 năm tuổi nguyên khối, phát tỏa hương thơm thanh nhã tự nhiên, không sử dụng hóa chất hay hương liệu nhân tạo.'
    }
  ]

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0d10] text-[#f0ede6] overflow-hidden border-t border-[#1e2732]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#16382a]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#3d3215]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1b232e]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-[#14261c] text-[#48b87e] border border-[#265339] mb-3">
              Văn Phòng Tứ Bảo Quý Tộc · Thất Thập Ngũ Diệp Studio
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#ebe5d8] tracking-wide">
              Kê Ngự Bút Sen Thất Thập Ngũ Diệp 75 Cánh Sen Ngũ Phúc Lâm Môn Phỉ Thúy Type A Nẹp Vàng 24K Filigree Trên Bệ Gỗ Hoàng Đàn Tuyết Lạng Sơn 400 Năm
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a39c8e] max-w-2xl font-light">
              Tuyệt tác văn phòng tứ bảo từ xưởng Thạnh Xuân 1.200m² của GuHomes. Nơi hội tụ giữa vẻ thanh tao của Ngọc Phỉ Thúy Miến Điện, hương thơm vương giả của Hoàng Đàn Tuyết Lạng Sơn 400 năm và nghệ thuật kim hoàn vàng 24K Filigree đỉnh cao.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={toggleHarmonics}
              aria-label="Kích hoạt âm hưởng Solfeggio 528Hz và 1056Hz"
              className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 border ${
                harmonicResonanceActive
                  ? 'bg-[#1b3829] text-[#7ce0a8] border-[#388458] shadow-[0_0_20px_rgba(72,184,126,0.3)]'
                  : 'bg-[#12171f] text-[#9ba1a6] border-[#222a36] hover:border-[#384557]'
              }`}
            >
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${harmonicResonanceActive ? 'bg-[#48b87e] animate-pulse' : 'bg-[#6c757d]'}`} />
              {harmonicResonanceActive ? 'Hòa Âm Bát Độ 528Hz & 1056Hz (Đang Phát)' : 'Thưởng Thức Hòa Âm Bát Độ (Web Audio)'}
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
              className="p-5 rounded-xl bg-[#11161d]/80 backdrop-blur-md border border-[#202733] flex flex-col justify-between hover:border-[#3b495e] transition-all"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-[#798390] block mb-1">{m.label}</span>
                <span className="text-2xl sm:text-3xl font-serif text-[#d6c39f] font-semibold block">{m.value}</span>
                <span className="text-xs text-[#48b87e] font-medium block mt-1">{m.subtext}</span>
              </div>
              <p className="mt-3 text-xs text-[#8c949e] font-light leading-relaxed border-t border-[#18202b] pt-2.5">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Atelier Demonstration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d1218] rounded-2xl p-6 sm:p-8 border border-[#202936]">
          {/* Interactive Visual Canvas / SVG Schema */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#07090d] rounded-xl p-6 border border-[#171e28] relative overflow-hidden min-h-[380px]">
            {/* Ambient Jade Glow Halo */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="jadeGlowV75" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#48b87e" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#07090d" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="50%" cy="50%" r="140" fill="url(#jadeGlowV75)" />
              </svg>
            </div>

            {/* Architectural & Artefact Interactive Schema */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Outer Filigree Circle Rotation */}
              <div className="absolute inset-8 rounded-full border border-dashed border-[#d4af37]/40 animate-[spin_55s_linear_infinite]" />

              {/* Central Cypress Altar Base & Jade Brush Rest */}
              <div className="relative z-10 w-48 h-48 rounded-2xl bg-[#14120c] border-2 border-[#826e43] flex flex-col items-center justify-center p-3 shadow-[0_0_35px_rgba(72,184,126,0.25)]">
                <div className="text-[11px] text-[#ebd49d] font-serif font-bold text-center tracking-wider">
                  KÊ NGỰ BÚT BÚP SEN
                </div>
                <div className="text-[9px] text-[#938e83] text-center mt-0.5">
                  Thất Thập Ngũ Diệp 75 Cánh · Hoàng Đàn Tuyết 400 Năm
                </div>

                {/* 75 Jade Lotus Petals Dynamic Flower Model */}
                <div className="my-2.5 relative flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: leafRotationAngle }}
                    className="w-16 h-16 rounded-full border-2 border-[#48b87e]/70 flex items-center justify-center bg-[#132c20]/40 shadow-[0_0_20px_rgba(72,184,126,0.3)]"
                  >
                    <span className="w-3 h-3 rounded-full bg-[#7ce0a8] shadow-[0_0_15px_#7ce0a8]" />
                  </motion.div>
                </div>

                <div className="text-[10px] text-[#6ee7b7] font-mono">
                  Góc xoay cánh: {leafRotationAngle}° · Độ ngọc: {jadeGlowIntensity}%
                </div>
              </div>

              {/* Tag for 75 Petals */}
              <motion.div
                animate={{
                  y: [-2, 2, -2]
                }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute left-6 top-8 px-2.5 py-1 rounded bg-[#16271e] border border-[#2d5c41] text-[10px] text-[#9fe6be] flex items-center gap-1.5 shadow-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#48b87e]" />
                75 Cánh Ngọc Phỉ Thúy Type A Ngũ Phúc
              </motion.div>

              {/* Tag for Cypress Wood */}
              <div className="absolute right-6 bottom-8 px-2.5 py-1 rounded bg-[#1c180e] border border-[#524424] text-[10px] text-[#d6b98d] flex items-center gap-1.5">
                <span>Bệ Hoàng Đàn Tuyết Lạng Sơn 400 Năm</span>
              </div>
            </div>

            {/* Slider Controls for Leaf Rotation & Jade Glow */}
            <div className="w-full mt-6 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-[#a69f91]">
                <span>Điều Chỉnh Tương Tác Xoay 75 Cánh Sen Búp Ngọc:</span>
                <span className="font-mono text-[#ebd49d] font-bold">{leafRotationAngle}° (0° - 360°)</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={leafRotationAngle}
                onChange={(e) => setLeafRotationAngle(Number(e.target.value))}
                className="w-full h-2 bg-[#202734] rounded-lg appearance-none cursor-pointer accent-[#48b87e]"
                aria-label="Điều chỉnh tương tác xoay cánh sen búp ngọc Phỉ Thúy"
              />
            </div>
          </div>

          {/* Atelier Aspects Exploration Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-lg font-serif text-[#ebe5d8] mb-1">
              Ba Tuyệt Phẩm Của Kê Ngự Bút 75 Diệp
            </h3>

            {atelierAspects.map((aspect, aIdx) => (
              <div
                key={aIdx}
                onClick={() => setSelectedAtelierAspect(aIdx)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                  selectedAtelierAspect === aIdx
                    ? 'bg-[#151c24] border-[#48b87e] shadow-[0_0_15px_rgba(72,184,126,0.15)]'
                    : 'bg-[#0f141a] border-[#1d2633] hover:border-[#2f3d52]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#48b87e] uppercase tracking-wider">{aspect.category}</span>
                  <span className="text-[11px] text-[#717b87] font-mono">0{aIdx + 1}</span>
                </div>
                <h4 className="text-sm font-medium text-[#e2ded4] mb-1">{aspect.title}</h4>
                <p className="text-xs text-[#8c949e] font-light leading-relaxed">{aspect.description}</p>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#141b16] border border-[#2a4d36] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#48b87e]">Cam Kết Tinh Chế Thủ Công GuHomes</div>
                <div className="text-[11px] text-[#93a89a] mt-0.5">Xưởng may đo Thạnh Xuân 1.200m² · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#1e3c2b] hover:bg-[#2c583f] text-[#86efac] text-xs font-medium border border-[#3b7553] transition-colors flex items-center justify-center shrink-0"
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

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudQuinseptuagesimalLeafStudio
