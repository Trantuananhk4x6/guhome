'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IncenseVaultMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV65() {
  const [temperature, setTemperature] = useState<number>(175)
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
      label: 'Kỳ Nam Thanh Trầm',
      value: 'Thượng Hạng',
      subtext: 'Rừng nguyên sinh Khánh Hòa 90 năm tích trầm',
      detail: 'Từng thớ trầm xanh biếc ánh lục ngọc đượm tinh dầu sánh đậm, tinh hoa đất trời hội tụ gần một thế kỷ, khi gia nhiệt tỏa làn hương thơm the mát ngọt thanh sâu thẳm.'
    },
    {
      label: 'Kim Long Mã V65',
      value: 'Lục Thập Ngũ Thế',
      subtext: 'Vàng 24K Filigree & đồng mắt cua cổ triều',
      detail: 'Thế thứ 65 Long Mã phi vân chầu hoa sen ngọc bích, kết tinh kỹ nghệ kim hoàn đậu bạc nẹp vàng ròng 0.1mm của nghệ nhân kim hoàn làng cổ Định Công.'
    },
    {
      label: 'Án Thờ Mun Sừng Khánh Hòa',
      value: '400 Năm Tuổi',
      subtext: 'Diospyros mun đen tuyền tỷ trọng 1.22 g/cm³',
      detail: 'Án ngự thờ gia tiên chế tác từ phiến gỗ Mun Sừng Khánh Hòa 400 năm tuổi đen tuyền huyền ngọc, tỷ trọng 1.22 g/cm³ chìm hoàn toàn trong nước, đầm chắc vĩnh cửu.'
    },
    {
      label: 'Vi Điều Nhiệt Không Khói',
      value: '80°C - 240°C',
      subtext: 'Cảm biến điện tử Thụy Sĩ bảo toàn phân tử hương',
      detail: 'Công nghệ gia nhiệt gốm vi điện tử không sinh khói độc hại, bảo toàn trọn vẹn 100% tinh chất quý giá trong trầm kỳ nam.'
    }
  ]

  const vaultTabs = [
    {
      title: 'Bảo Thất Gỗ Mun Sừng Khánh Hòa 400 Năm',
      content: 'Chế tác theo thức cung đình truyền thống với hệ mộng thắt âm dương kín khít không kim loại. Bề mặt gỗ mun sừng được mài nhẵn bằng bột đá tự nhiên và vuốt sáp ong rừng thủ công, tạo lớp màng bảo vệ đen bóng sâu lắng như màn đêm.',
      tag: 'Mộc Thần Cung Đình'
    },
    {
      title: 'Điêu Khắc Kim Long Mã Thập Nhị Thế V65',
      content: 'Hình tượng Long Mã đạp mây chở Hà Đồ, biểu trưng cho sự hanh thông trí tuệ và sự nghiệp hưng thịnh vững bền. Từng sợi chỉ vàng 24K được nghệ nhân xe tay và uốn lượn tạo hình bông sen nâng chén đồng vi điều nhiệt.',
      tag: 'Kim Hoàn Độc Bản'
    },
    {
      title: 'Hệ Vi Điều Nhiệt & An Toàn Không Gian Kín',
      content: 'Gia nhiệt từ từ không bén lửa, tuyệt đối không tạo tro bụi hay muội than, phù hợp hoàn hảo cho các penthouse và biệt thự cao cấp sử dụng hệ thống lọc khí trung tâm AHU và kính hộp Low-E kín khít.',
      tag: 'Công Nghệ Khí Sạch'
    },
    {
      title: 'Trường Năng Lượng Solfeggio 528Hz & 741Hz',
      content: 'Sự kết hợp giữa tần số chuyển hóa 528Hz và thanh lọc 741Hz tạo nên không gian thiền định tuyệt đối, xua tan căng thẳng thương trường, mang lại giấc ngủ sâu và nguồn cảm hứng sáng tạo vô tận.',
      tag: 'Năng Lượng Tâm Linh'
    }
  ]

  return (
    <div className="relative w-full max-w-7xl mx-auto my-12 p-6 md:p-10 rounded-3xl bg-neutral-900/90 border border-amber-800/40 text-neutral-100 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between border-b border-amber-800/30 pb-6 mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Bảo Vật Phong Thủy & Không Gian Tâm Linh May Đo V65
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-light text-neutral-100 tracking-tight">
            Đỉnh Lư Kim Long Mã & Trầm Kỳ Nam V65
            <span className="block text-lg md:text-2xl text-amber-200/80 font-sans font-normal mt-1">
              Trên Án Thờ Gỗ Mun Sừng Khánh Hòa 400 Năm Đen Tuyền Huyền Ngọc
            </span>
          </h2>
        </div>

        {/* Audio Solfeggio Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSolfeggio}
            className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-full flex items-center gap-2.5 text-sm font-medium transition-all duration-300 shadow-lg ${
              solfeggioActive
                ? 'bg-amber-500 text-neutral-950 shadow-amber-500/25 ring-2 ring-amber-400/50'
                : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-amber-200/90 border border-amber-700/40'
            }`}
            aria-label={solfeggioActive ? 'Tắt hòa âm Solfeggio 528Hz & 741Hz' : 'Bật hòa âm Solfeggio 528Hz & 741Hz'}
          >
            <svg
              className={`w-5 h-5 ${solfeggioActive ? 'animate-spin text-neutral-950' : 'text-amber-300'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <span>{solfeggioActive ? 'Đang Thanh Tẩy 528Hz + 741Hz' : 'Khai Mở Năng Lượng Tâm Linh'}</span>
          </button>
        </div>
      </div>

      {/* Metrics 4 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-neutral-800/50 border border-neutral-700/60 hover:border-amber-500/40 transition-all duration-300 group"
          >
            <div className="text-xs uppercase tracking-wider text-neutral-400 group-hover:text-amber-300 transition-colors">
              {item.label}
            </div>
            <div className="text-3xl font-serif font-light text-amber-200 mt-2">
              {item.value}
            </div>
            <div className="text-xs text-neutral-300 font-medium mt-1">
              {item.subtext}
            </div>
            <p className="text-xs text-neutral-400 mt-3 leading-relaxed border-t border-neutral-700/40 pt-2.5">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Temperature & Incense Control Interactive Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/60 p-6 md:p-8 rounded-2xl border border-amber-900/30 mb-10">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-amber-300 uppercase tracking-wide">
              Nhiệt Độ Vi Điều Nhiệt Trầm Kỳ Nam
            </span>
            <span className="text-2xl font-mono text-amber-200 bg-amber-950/60 px-4 py-1 rounded-lg border border-amber-700/40">
              {temperature}°C
            </span>
          </div>

          {/* Slider with Min 44px Touch Target Height */}
          <div className="relative flex items-center h-12">
            <input
              type="range"
              min="80"
              max="240"
              step="5"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
              aria-label="Điều chỉnh nhiệt độ xông trầm kỳ nam không khói"
            />
          </div>

          <div className="flex justify-between text-xs text-neutral-400">
            <span>80°C (Dịu nhẹ thanh thoát)</span>
            <span>160°C (Đậm đà hương hoa quả)</span>
            <span>200°C (Nồng ấm ngọt sâu)</span>
            <span>240°C (Linh hương cực phẩm)</span>
          </div>

          {/* Aroma Diffusion Toggle */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-neutral-200">
                Làn Hương Vi Thể Không Khói
              </div>
              <div className="text-xs text-neutral-400">
                Khuếch tán phân tử hương trầm thuần khiết
              </div>
            </div>
            <button
              onClick={() => setSacredAromaActive(!sacredAromaActive)}
              className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                sacredAromaActive
                  ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/30'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
              }`}
              aria-label={sacredAromaActive ? 'Tắt khuếch tán trầm' : 'Bật khuếch tán trầm'}
            >
              {sacredAromaActive ? 'Đang Khuếch Tán' : 'Tạm Dừng'}
            </button>
          </div>
        </div>

        {/* Visual Incense Vault Representation */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-8 bg-neutral-900/80 rounded-xl border border-neutral-800 min-h-[260px] overflow-hidden">
          {/* Animated Sacred Aroma Wisps */}
          {sacredAromaActive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-32 h-32 rounded-full border border-amber-400/30"
                animate={{
                  scale: [1, 2.2, 3],
                  opacity: [0.6, 0.25, 0],
                  y: [0, -40, -80]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
              <motion.div
                className="w-24 h-24 rounded-full border border-emerald-400/20"
                animate={{
                  scale: [0.8, 1.8, 2.6],
                  opacity: [0.5, 0.2, 0],
                  y: [0, -30, -60]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 1
                }}
              />
            </div>
          )}

          {/* Golden Burner & Dragon Horse Silhouette Graphic */}
          <div className="relative z-10 w-44 h-44 rounded-2xl bg-gradient-to-b from-amber-700/30 via-neutral-950 to-neutral-900 border-2 border-amber-500/40 p-4 flex flex-col items-center justify-center shadow-xl">
            <div className="text-3xl text-amber-300">🐉🐎</div>
            <div className="text-xs font-serif text-amber-200 mt-2 font-medium tracking-wide">
              Kim Long Mã V65
            </div>
            <div className="text-[10px] text-neutral-400 font-mono mt-1">
              Lục Thập Ngũ Thế
            </div>
            <div className="mt-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 font-mono">
              {temperature < 120 && 'Tầng Hương 1: Táo Xanh & Hoa Lê'}
              {temperature >= 120 && temperature < 180 && 'Tầng Hương 2: Mật Ong Rừng & Gỗ Đàn Hương'}
              {temperature >= 180 && 'Tầng Hương 3: Thanh Trầm Đỉnh Cao & Long Diên Hương'}
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-neutral-400 font-light">
              Án ngự thờ gia tiên chế tác mộng gỗ tinh vi tại xưởng GuHomes Thạnh Xuân
            </span>
          </div>
        </div>
      </div>

      {/* 4 Deep Craftsmanship Tabs */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-3">
          {vaultTabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedVaultTab(idx)}
              className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                selectedVaultTab === idx
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
            >
              {tab.tag}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVaultTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-6 rounded-2xl bg-neutral-950/40 border border-neutral-800/80"
          >
            <h3 className="text-lg md:text-xl font-serif text-amber-100 mb-2">
              {vaultTabs[selectedVaultTab]?.title}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {vaultTabs[selectedVaultTab]?.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Branding & Lead Architect Direct Connect */}
      <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>GuHomes Imperial Craftsmanship · Trần 12 Công Trình/Năm</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="tel:0368757916"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-medium transition-colors"
          >
            Hotline KTS Trưởng: 0368 757 916
          </a>
          <a
            href="mailto:guhomesvn@gmail.com"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            guhomesvn@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV65
