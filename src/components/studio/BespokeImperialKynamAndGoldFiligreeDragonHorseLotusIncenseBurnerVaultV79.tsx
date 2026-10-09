'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IncenseVaultMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV79() {
  const [temperature, setTemperature] = useState<number>(202)
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

      // Solfeggio 528Hz (Harmonic Transformation)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc528Ref.current = osc1

      // Solfeggio 741Hz (Intuition & Crown Purification)
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
      value: 'Tuyệt Phẩm',
      subtext: 'Rừng Trầm Hương Khánh Hòa ngập dầu ánh lục',
      detail: 'Tuyển lọc lát kỳ nam ngập đẫm tinh dầu tự nhiên sắc lục thanh nhã dẻo quánh, mật độ phân tử thơm tinh khiết nhất, tỏa hương thanh khiết ngàn năm.',
    },
    {
      label: 'Gỗ Mun Sọc Khánh Hòa',
      value: '400 Năm',
      subtext: 'Vân sọc đen ánh lục cẩm thạch đanh thép',
      detail: 'Án ngự chế tác từ lõi Mun Sọc đại thụ 4 thế kỷ vùng Vạn Ninh - Khánh Hòa, tom gỗ đanh cứng tuyệt đối, chống ẩm mốc và mối mọt nhiệt đới vĩnh cửu.',
    },
    {
      label: 'Vi Điều Nhiệt Không Khói',
      value: '80°C - 240°C',
      subtext: 'Bảo tồn sớ tinh dầu nguyên bản',
      detail: 'Hệ thống vi bán dẫn gia nhiệt cách ly tuyệt đối, không sinh khói hay muội than, bóc tách hoàn hảo từng tầng hương thanh thuần tự nhiên.',
    },
    {
      label: 'Vàng 24K Filigree',
      value: '99.99%',
      subtext: 'Nghệ nhân đậu kim hoàn kim hoàng',
      detail: 'Sợi vàng 24K kéo chỉ 0.12mm uốn lượn hình Kim Long Mã đạp mây ngậm ngọc bích, biểu tượng cho uy quyền và cửu trùng thiên đỉnh cao chí tôn.',
    },
  ]

  const tabs = [
    {
      name: 'Thất Cửu Cửu Trùng',
      code: 'V79 ARCHETYPE',
      desc: 'Thiết kế Kim Long Mã thế cửu trùng thiên vươn mây ngậm ngọc bích, biểu tượng cho đỉnh cao quyền quý và phúc lộc viên mãn bất tận.',
    },
    {
      name: 'Án Mun Sọc Khánh Hòa',
      code: 'MUN SOC PEDESTAL',
      desc: 'Lõi mun sọc 400 năm đanh quánh giữ thăng bằng tuyệt đối cho lư ngự, bề mặt lau sáp ong tự nhiên phô diễn từng đường vân sọc đen ánh lục kỳ vĩ.',
    },
    {
      name: 'Khung Đậu Vàng 24K',
      code: 'FILIGREE EMBROIDERY',
      desc: 'Mỗi mắt lưới vàng được nghệ nhân xưởng may đo Thạnh Xuân 1.200m² hàn ghép thủ công dưới kính hiển vi quang học suốt hơn 280 giờ làm việc.',
    },
  ]

  return (
    <section className="relative my-14 overflow-hidden rounded-3xl border border-[#3d3220] bg-[#141009] p-6 text-[#ebdcc5] shadow-2xl md:p-10">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#8a6828]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#d4af37]/15 blur-3xl" />

      {/* Header section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#2d2417] pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6d5523] bg-[#221a0c] px-3.5 py-1 text-xs font-medium text-[#dfb858]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e6c66e] animate-pulse" />
            Tuyệt Tác Ngự Đỉnh V79 · Thất Cửu Cửu Trùng Thiên
          </div>
          <h2 className="mt-3 text-2xl font-serif tracking-tight text-[#fbf5eb] sm:text-3xl">
            Đỉnh Lư Kim Long Mã Thất Thập Cửu Thế V79 & Án Gỗ Mun Sọc Khánh Hòa
          </h2>
          <p className="mt-2 text-sm text-[#bda98c] max-w-2xl font-light">
            Sự dung hợp đỉnh cao giữa nghệ thuật đậu vàng Filigree 24K cung đình Huế, lõi Mun Sọc Khánh Hòa 400 năm và công nghệ vi điều nhiệt xông trầm không khói độc bản GuHomes.
          </p>
        </div>

        {/* Audio switch button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSolfeggio}
            aria-label="Kích hoạt âm thanh tần số vi mô Solfeggio 528Hz & 741Hz"
            className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-2 ${
              solfeggioActive
                ? 'border-[#dfb858] bg-[#33250e] text-[#fbeec9] shadow-lg shadow-[#8a6828]/40'
                : 'border-[#4a391c] bg-[#1a140b] text-[#ab9778] hover:text-[#ebdcc5]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <span>{solfeggioActive ? 'Vi Âm Solfeggio: 528Hz & 741Hz (Đang Bật)' : 'Bật Vi Âm Thiền Trầm 528Hz'}</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metrics */}
      <div className="relative z-10 grid grid-cols-2 gap-4 my-8 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#332616] bg-[#1a140c]/80 p-4 backdrop-blur transition-colors hover:border-[#574121]"
          >
            <div className="text-xs font-medium text-[#dfb858]">{m.label}</div>
            <div className="mt-1 text-xl font-serif font-bold text-[#faf3e3]">{m.value}</div>
            <div className="text-xs text-[#a69274] mt-0.5">{m.subtext}</div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#8a765e]">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* Interactive Control Panel & Visual Stage */}
      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        {/* Visual Stage */}
        <div className="relative lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl border border-[#382b18] bg-gradient-to-b from-[#1b150d] via-[#120d07] to-[#0d0905]">
          {/* Subtle incense glow smoke simulation */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {sacredAromaActive && (
              <motion.div
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-t from-[#d4af37]/20 via-[#c99a3e]/10 to-transparent blur-2xl pointer-events-none"
              />
            )}

            {/* Dragon-Horse Lotus Incense Burner Silhouette SVG */}
            <svg className="w-56 h-56 md:w-72 md:h-72 text-[#dfb858]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
              {/* Pedestal Base - Mun Soc Pedestal */}
              <path d="M40 170 L160 170 L150 185 L50 185 Z" fill="#2d2212" stroke="#5c4520" strokeWidth="2" />
              <path d="M48 162 L152 162 L148 170 L52 170 Z" fill="#3a2d1a" stroke="#87672d" strokeWidth="1.5" />

              {/* Main Lotus Pod Vessel */}
              <ellipse cx="100" cy="130" rx="42" ry="24" fill="#241a0d" stroke="#d4af37" strokeWidth="2" />
              
              {/* Filigree Lotus Petals */}
              <path d="M100 130 C85 105, 60 115, 62 135" stroke="#f0d38d" strokeWidth="1.5" fill="none" strokeDasharray="2 1" />
              <path d="M100 130 C115 105, 140 115, 138 135" stroke="#f0d38d" strokeWidth="1.5" fill="none" strokeDasharray="2 1" />
              <path d="M100 130 C90 98, 80 110, 78 132" stroke="#e0ba63" strokeWidth="1.5" fill="none" />
              <path d="M100 130 C110 98, 120 110, 122 132" stroke="#e0ba63" strokeWidth="1.5" fill="none" />
              <path d="M100 130 C95 90, 105 90, 100 130" stroke="#fadc96" strokeWidth="2" fill="none" />

              {/* Dragon-Horse (Long Ma) Lid Finial */}
              <path d="M96 95 C90 85, 94 75, 100 70 C106 75, 110 85, 104 95 Z" fill="#dfb858" stroke="#fcf2d4" strokeWidth="1.5" />
              <path d="M100 70 C98 62, 102 55, 105 52 C104 60, 108 63, 100 70" fill="#edd69a" stroke="#fcf2d4" strokeWidth="1" />
              {/* Pearl in Mouth */}
              <circle cx="106" cy="56" r="3" fill="#a4f0d8" stroke="#ffffff" strokeWidth="1" />

              {/* Rising Vapor stream when active */}
              {sacredAromaActive && (
                <motion.g
                  initial={{ opacity: 0.2, y: 0 }}
                  animate={{ opacity: [0.2, 0.8, 0], y: [-5, -28] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                >
                  <path d="M100 48 Q94 36 100 24 T100 8" stroke="#fbeec9" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M104 50 Q110 38 103 26 T105 10" stroke="#dfb858" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
                </motion.g>
              )}
            </svg>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs uppercase tracking-widest text-[#a89270]">Trạng Thái Gia Nhiệt Vi Mạch</span>
            <div className="text-sm font-medium text-[#f1dec0] mt-1">
              {sacredAromaActive ? `Đang Bóc Tách Sớ Tinh Dầu Tại ${temperature}°C · Tuyệt Đối Không Khói` : 'Chế Độ Nghỉ Dưỡng Nhiệt'}
            </div>
          </div>
        </div>

        {/* Interactive Controls & Tab Details */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Tabs header */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-[#1c150b] border border-[#382a17]">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVaultTab(idx)}
                aria-label={tab.name}
                className={`min-h-[44px] flex-1 py-2 px-2.5 rounded-xl text-xs font-medium transition-all ${
                  selectedVaultTab === idx
                    ? 'bg-[#3b2a12] text-[#f7e4b5] shadow-md border border-[#785b24]'
                    : 'text-[#9c896d] hover:text-[#d4c3a5]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVaultTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl border border-[#382b19] bg-[#1a140d]"
            >
              <div className="text-[10px] font-mono tracking-wider text-[#d4af37] uppercase">
                {tabs[selectedVaultTab]?.code}
              </div>
              <h3 className="text-base font-serif font-bold text-[#faf0dc] mt-1">
                {tabs[selectedVaultTab]?.name}
              </h3>
              <p className="text-xs leading-relaxed text-[#b5a082] mt-2 font-light">
                {tabs[selectedVaultTab]?.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Temperature Slider & Controls */}
          <div className="p-5 rounded-2xl border border-[#382b19] bg-[#1a140d] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#ddcbb1]">Điều Nhiệt Bán Dẫn Lư Ngự</span>
              <span className="text-sm font-mono font-bold text-[#e6c66e]">{temperature}°C</span>
            </div>

            <input
              type="range"
              min={80}
              max={240}
              step={1}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              aria-label="Thanh trượt điều chỉnh nhiệt độ bóc tách tinh dầu kỳ nam"
              className="w-full accent-[#d4af37] bg-[#2a1e0f] h-2 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-[#7d6b52] font-mono">
              <span>80°C (Ngủ Hương)</span>
              <span>180°C - 200°C (Vi Diệu)</span>
              <span>240°C (Tối Đa)</span>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#291e10]">
              <span className="text-xs text-[#a69274]">Kích Hoạt Xông Trầm</span>
              <button
                onClick={() => setSacredAromaActive(!sacredAromaActive)}
                aria-label="Kích hoạt hoặc ngắt chế độ xông trầm"
                className={`min-h-[44px] min-w-[80px] px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  sacredAromaActive
                    ? 'border-[#8f6d2b] bg-[#3a280d] text-[#faecc8]'
                    : 'border-[#3d2e19] bg-[#140e06] text-[#7a6850]'
                }`}
              >
                {sacredAromaActive ? 'Đang Tỏa Hương' : 'Tạm Dừng'}
              </button>
            </div>
          </div>

          {/* GuHomes Atelier Masterpiece guarantee */}
          <div className="p-4 rounded-2xl border border-[#332410] bg-[#120d06] flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#8a6828] bg-[#26190a] flex items-center justify-center text-[#dfb858]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-[11px] leading-snug text-[#9e8b70]">
              Tác phẩm chế tác thủ công độc bản tại xưởng may đo Thạnh Xuân 1.200m², phân bổ tối đa 12 tư gia mỗi năm, bảo chứng phong thái Quiet Luxury truyền đời.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV79
