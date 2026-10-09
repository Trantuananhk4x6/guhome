'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IncenseVaultMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV69() {
  const [temperature, setTemperature] = useState<number>(185)
  const [sacredAromaActive, setSacredAromaActive] = useState<boolean>(true)
  const [solfeggioActive, setSolfeggioActive] = useState<boolean>(false)
  const [selectedVaultTab, setSelectedVaultTab] = useState<number>(0)

  // Web Audio Context & Oscillators for Solfeggio 528Hz + 741Hz (Crown Chakra Purification)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc741Ref = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopAudio = () => {
    try {
      if (osc528Ref.current) {
        osc528Ref.current.stop()
        osc528Ref.current.disconnect()
        osc528Ref.current = null
      }
      if (osc741Ref.current) {
        osc741Ref.current.stop()
        osc741Ref.current.disconnect()
        osc741Ref.current = null
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

      // Solfeggio 528Hz: DNA Repair & Spiritual Transformation
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc528Ref.current = osc1

      // Solfeggio 741Hz: Intuition Awakening & Energy Cleansing
      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(741, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      osc741Ref.current = osc2
    } catch {
      // Audio error catch
    }
  }

  const toggleSolfeggio = () => {
    if (solfeggioActive) {
      stopAudio()
      setSolfeggioActive(false)
    } else {
      startAudio()
      setSolfeggioActive(true)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const metrics: IncenseVaultMetric[] = [
    {
      label: 'Vi Nhiệt Gia Nhiệt Không Khói',
      value: `${temperature}°C`,
      subtext: 'Dải nhiệt vi phân Thụy Sĩ 80°C - 240°C',
      detail: 'Kiểm soát nhiệt độ bề mặt gốm phủ vàng chính xác tới 0.1°C, giải phóng trọn vẹn tầng hương ngọt ấm của Kỳ Nam mà không sinh muội than hay khói cay.'
    },
    {
      label: 'Sợi Vàng 24K Filigree Thủ Công',
      value: '0.11 mm',
      subtext: 'Kỹ nghệ đan mây Long Mã thế thứ 69 Cửu Ngũ',
      detail: 'Từng sợi vàng ròng 99.99% được kéo sợi siêu mảnh và đan kết tinh xảo tạo hình Long Mã phi vân, nâng đỡ đóa sen ngọc bích tỏa hương vương giả.'
    },
    {
      label: 'Án Thờ Sưa Đỏ Bắc Bộ Cổ Thụ',
      value: '400 Năm',
      subtext: 'Dalbergia tonkinensis vân hoa phát hương dịu ngọt',
      detail: 'Gỗ Sưa Đỏ Bắc Bộ hoàng gia 400 năm tuổi, tỷ trọng 1.10 g/cm³, vân gỗ huyền ảo bốn mặt phát hương mộc tự nhiên, bền vững trường cửu với thời gian.'
    },
    {
      label: 'Thế Long Mã Thứ 69 Cửu Ngũ',
      value: 'Cửu Ngũ V69',
      subtext: 'Đại biểu uy quyền tối thượng & vượng khí hanh thông',
      detail: 'Thế tượng rồng ngựa đạp mây mang theo hà đồ lạc thư, bảo hộ trạch gia bình an, hội tụ tinh hoa đất trời và thăng hoa phong thái Quiet Luxury.'
    }
  ]

  const vaultTabs = [
    {
      title: 'Kỳ Nghệ Vàng 24K Filigree & Long Mã Phi Vân',
      category: 'Kim Hoàn Cung Đình',
      description: 'Nghệ nhân kim hoàn bậc thầy GuHomes mất hơn 480 giờ lao động thủ công để uốn lượn từng sợi vàng 24K mảnh 0.11mm thành hình tượng Long Mã uy dũng thế thứ 69, bao bọc đóa sen ngọc bích Phỉ Thúy Type A.'
    },
    {
      title: 'Án Thờ Gỗ Sưa Đỏ Bắc Bộ 400 Năm Tuổi',
      category: 'Mộc Nghệ Hoàng Gia',
      description: 'Gỗ Sưa Đỏ Bắc Bộ quý hiếm với thớ gỗ đỏ cam ánh tím, tom gỗ siêu mịn và khả năng phát tán hương mộc ấm áp hòa quyện cùng làn khói trầm Kỳ Nam, tạo nên không gian tâm linh thuần tịnh và đẳng cấp.'
    },
    {
      title: 'Công Nghệ Vi Điều Nhiệt Cảm Biến Kép',
      category: 'Vi Khí Hậu & Âm Hưởng',
      description: 'Hệ thống cảm biến gia nhiệt vi phân Thụy Sĩ kết hợp buồng cách nhiệt gốm sứ chân không, giữ độ ẩm cân bằng và lan tỏa tinh dầu Kỳ Nam tự nhiên, hòa nhịp cùng tần số chữa lành Solfeggio 528Hz & 741Hz.'
    }
  ]

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0b0c10] text-[#f4f2ed] overflow-hidden border-t border-[#252830]">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#cda250]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8a4b28]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#21252f]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-[#241d11] text-[#e0b865] border border-[#523e1e] mb-3">
              Bảo Vật Không Gian Sống · Tuyệt Bản V69
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f2ebe0] tracking-wide">
              Bảo Thất Đỉnh Lư Trầm Kỳ Nam & Kim Long Mã Hoa Sen Lục Thập Cửu Thế V69 Trên Án Thờ Gỗ Sưa Đỏ Bắc Bộ 400 Năm
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#aca495] max-w-2xl font-light">
              Tuyệt tác chế tác đỉnh cao từ xưởng may đo Thạnh Xuân 1.200m² của GuHomes. Sự giao thoa mẫu mực giữa vàng ròng 24K kéo sợi Filigree, ngọc phỉ thúy hoàng gia và gỗ Sưa Đỏ Bắc Bộ 400 năm trường cửu.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={toggleSolfeggio}
              aria-label="Kích hoạt âm thanh Solfeggio 528Hz và 741Hz"
              className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 border ${
                solfeggioActive
                  ? 'bg-[#3d2f16] text-[#fed179] border-[#a0772d] shadow-[0_0_20px_rgba(205,162,80,0.3)]'
                  : 'bg-[#15171d] text-[#9ba1a6] border-[#292e38] hover:border-[#424a59]'
              }`}
            >
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${solfeggioActive ? 'bg-[#e0b865] animate-pulse' : 'bg-[#6c757d]'}`} />
              {solfeggioActive ? 'Âm Tần Solfeggio 528Hz & 741Hz (Đang Kích Hoạt)' : 'Trải Nghiệm Âm Tần Solfeggio (Web Audio)'}
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
              className="p-5 rounded-xl bg-[#13161c]/80 backdrop-blur-md border border-[#262c37] flex flex-col justify-between hover:border-[#444e61] transition-all"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-[#7d8794] block mb-1">{m.label}</span>
                <span className="text-2xl sm:text-3xl font-serif text-[#e5be6b] font-semibold block">{m.value}</span>
                <span className="text-xs text-[#d4af37] font-medium block mt-1">{m.subtext}</span>
              </div>
              <p className="mt-3 text-xs text-[#8c949e] font-light leading-relaxed border-t border-[#1e232c] pt-2.5">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Incense Burner Vault Demonstration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0e1015] rounded-2xl p-6 sm:p-8 border border-[#252a35]">
          {/* Interactive Visual Canvas / SVG Schema */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#07080b] rounded-xl p-6 border border-[#1d212a] relative overflow-hidden min-h-[380px]">
            {/* Ambient Warm Lotus Glow */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="kynamAromaGlowV69" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e0b865" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#07080b" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="50%" cy="50%" r="150" fill="url(#kynamAromaGlowV69)" />
              </svg>
            </div>

            {/* Architectural & Artefact Interactive Schema */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Outer Golden Aura Ring */}
              <div className="absolute inset-6 rounded-full border border-dashed border-[#cda250]/40 animate-[spin_50s_linear_infinite]" />

              {/* Incense Fragrance Flow Particles Simulation */}
              <AnimatePresence>
                {sacredAromaActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                    className="absolute inset-16 rounded-full border border-[#e0b865]/30 bg-[#291f0c]/20 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Central Sưa Wood Altar Base & Filigree Burner */}
              <div className="relative z-10 w-48 h-48 rounded-2xl bg-[#1e140d] border-2 border-[#b07d48] flex flex-col items-center justify-center p-3 shadow-[0_0_35px_rgba(205,162,80,0.3)]">
                <div className="text-[11px] text-[#f0cb75] font-serif font-bold text-center tracking-wider">
                  ĐỈNH LƯ KIM LONG MÃ
                </div>
                <div className="text-[9px] text-[#9e968b] text-center mt-0.5">
                  Thế Thứ 69 Cửu Ngũ · Sưa Đỏ Bắc Bộ 400 Năm
                </div>

                {/* Filigree Lotus Petals Animation */}
                <div className="my-2.5 relative flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    className="w-14 h-14 rounded-full border border-[#e0b865]/60 flex items-center justify-center"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d] shadow-[0_0_12px_#fcd34d]" />
                  </motion.div>
                </div>

                <div className="text-[10px] text-[#fed179] font-mono">
                  Nhiệt độ xông: {temperature}°C
                </div>
              </div>

              {/* Kynam Essence Tag */}
              <motion.div
                animate={{
                  y: [-2, 2, -2]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute left-6 top-8 px-2.5 py-1 rounded bg-[#20180d] border border-[#5c421e] text-[10px] text-[#eed193] flex items-center gap-1.5 shadow-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                Kỳ Nam Tự Nhiên Khánh Hòa
              </motion.div>

              {/* Sua Wood Altar Tag */}
              <div className="absolute right-6 bottom-8 px-2.5 py-1 rounded bg-[#18110b] border border-[#482813] text-[10px] text-[#d69f7e] flex items-center gap-1.5">
                <span>Án Gỗ Sưa Đỏ 400 Năm</span>
              </div>
            </div>

            {/* Slider Controls for Swiss Micro-Temperature Adjustment */}
            <div className="w-full mt-6 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-[#a69f91]">
                <span>Điều Chỉnh Vi Nhiệt Gia Nhiệt Không Khói:</span>
                <span className="font-mono text-[#f0cb75] font-bold">{temperature}°C (80°C - 240°C)</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-[#232832] rounded-lg appearance-none cursor-pointer accent-[#e0b865]"
                aria-label="Điều chỉnh vi nhiệt gia nhiệt đỉnh lư trầm kỳ nam"
              />
            </div>
          </div>

          {/* Vault Tabs Exploration Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-lg font-serif text-[#f2ebe0] mb-1">
              Ba Tinh Tuyển Của Bảo Thất V69
            </h3>

            {vaultTabs.map((tab, tIdx) => (
              <div
                key={tIdx}
                onClick={() => setSelectedVaultTab(tIdx)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                  selectedVaultTab === tIdx
                    ? 'bg-[#1b1c24] border-[#e0b865] shadow-[0_0_15px_rgba(224,184,101,0.15)]'
                    : 'bg-[#111319] border-[#222732] hover:border-[#353d4e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#e0b865] uppercase tracking-wider">{tab.category}</span>
                  <span className="text-[11px] text-[#717b87] font-mono">0{tIdx + 1}</span>
                </div>
                <h4 className="text-sm font-medium text-[#e2ded4] mb-1">{tab.title}</h4>
                <p className="text-xs text-[#8c949e] font-light leading-relaxed">{tab.description}</p>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#191611] border border-[#443318] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#e0b865]">Đặc Quyền May Đo Độc Bản GuHomes</div>
                <div className="text-[11px] text-[#a49a89] mt-0.5">Xưởng may đo Thạnh Xuân 1.200m² · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#3d2f16] hover:bg-[#523e1e] text-[#fed179] text-xs font-medium border border-[#785924] transition-colors flex items-center justify-center shrink-0"
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

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV69
