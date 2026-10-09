'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IncenseVaultMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV73() {
  const [temperature, setTemperature] = useState<number>(188)
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
      osc1RefSetter(osc1)

      // Solfeggio 741Hz (Intuition & Crown Purification)
      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(741, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      osc2RefSetter(osc2)
    } catch {
      // Audio error catch
    }
  }

  const osc1RefSetter = (node: OscillatorNode) => {
    osc528Ref.current = node
  }

  const osc2RefSetter = (node: OscillatorNode) => {
    osc741Ref.current = node
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
      label: 'Kỳ Nam Bạch Trầm',
      value: 'Thượng Hạng',
      subtext: 'Rừng Khánh Hòa nguyên bản',
      detail: 'Tuyển lọc lát kỳ nam ngập dầu dẻo quánh, chứa hàm lượng hợp chất thơm tự nhiên cao nhất, tỏa hương thanh tao ngàn năm.',
    },
    {
      label: 'Gỗ Hoàng Đàn Tuyết',
      value: '400 Năm',
      subtext: 'Lạng Sơn kết tuyết óng ánh',
      detail: 'Án ngự chế tác từ phôi Hoàng Đàn Tuyết Lạng Sơn 4 thế kỷ, tự thân kết tinh màng tuyết óng ánh, tỏa hương trầm ngọt ấm.',
    },
    {
      label: 'Vi Điều Nhiệt Không Khói',
      value: '80°C - 240°C',
      subtext: 'Bảo toàn sớ tinh dầu nguyên bản',
      detail: 'Công nghệ gia nhiệt vi bán dẫn cách ly không sinh khói hay muội than, bóc tách hoàn hảo từng tầng hương thanh thuần.',
    },
    {
      label: 'Vàng 24K Filigree',
      value: '99.99%',
      subtext: 'Nghệ nhân đậu kim hoàn kim hoàng',
      detail: 'Sợi vàng 24K kéo chỉ 0.12mm uốn lượn hình Kim Long Mã đạp mây ngậm ngọc bích, biểu tượng cho quyền năng và phú quý bền lâu.',
    },
  ]

  const tabs = [
    {
      name: 'Thất Tam Tiến Bảo',
      code: 'V73 ARCHETYPE',
      desc: 'Thiết kế Kim Long Mã ngậm ngọc mang ý nghĩa tiến tài tiến lộc, dẫn khí cát tường lan tỏa vào dinh thự, cân bằng từ trường vượng khí.',
    },
    {
      name: 'Án Hoàng Đàn Lạng Sơn',
      code: 'SNOW CEDAR BASE',
      desc: 'Bệ gỗ Hoàng Đàn Tuyết giữ ẩm và bảo lưu hương thơm nội sinh, chống mối mọt và biến dạng tuyệt đối qua nhiều thế hệ.',
    },
    {
      name: 'Khung Đậu Vàng 24K',
      code: 'FILIGREE EMBROIDERY',
      desc: 'Mỗi mắt lưới vàng được nghệ nhân xưởng may đo Thạnh Xuân hàn ghép thủ công dưới kính hiển vi quang học suốt 240 giờ làm việc.',
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
            Tuyệt Tác Ngự Đỉnh V73 · Thất Tam Tiến Bảo
          </div>
          <h2 className="mt-3 text-2xl font-serif tracking-tight text-[#fbf5eb] sm:text-3xl">
            Đỉnh Lư Kim Long Mã Thất Thập Tam Thế V73 & Án Gỗ Hoàng Đàn Tuyết
          </h2>
          <p className="mt-2 text-sm text-[#bda98c] max-w-2xl font-light">
            Sự dung hợp đỉnh cao giữa nghệ thuật đậu vàng Filigree 24K cung đình Huế, lõi Hoàng Đàn Tuyết Lạng Sơn 400 năm và công nghệ vi điều nhiệt xông trầm không khói độc bản GuHomes.
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
            <div className="mt-1 text-2xl font-semibold tracking-tight text-[#fbf5eb]">{m.value}</div>
            <div className="text-[11px] text-[#ab9778] mt-0.5">{m.subtext}</div>
            <div className="mt-2 text-xs text-[#cfbe9f] font-light leading-relaxed border-t border-[#291f11] pt-2">{m.detail}</div>
          </div>
        ))}
      </div>

      {/* Interactive Controls & Spatial Simulation Canvas */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#171109] p-6 rounded-2xl border border-[#2b2011]">
        {/* Left: Graphic representation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#0f0b06] rounded-xl border border-[#261d10] relative min-h-[300px] overflow-hidden">
          {/* Subtle smoke thermal aura effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            {sacredAromaActive && (
              <>
                <motion.div
                  className="absolute w-64 h-64 rounded-full border border-[#d4af37]/30"
                  animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.2, 0.5, 0.2], rotate: [0, 90, 180] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute w-80 h-80 rounded-full border border-[#e6c66e]/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1], rotate: [180, 270, 360] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
              </>
            )}
          </div>

          {/* Incense Burner SVG Iconography */}
          <div className="relative z-10 flex flex-col items-center">
            <svg className="w-64 h-64" viewBox="0 0 200 200" fill="none">
              {/* Stand / Altar Pedestal (Hoàng Đàn Tuyết) */}
              <rect x="40" y="155" width="120" height="20" rx="4" fill="#3a2812" stroke="#6d4f24" strokeWidth="2" />
              <rect x="55" y="145" width="90" height="10" rx="2" fill="#4d3518" stroke="#87622d" strokeWidth="1.5" />
              {/* Base Feet */}
              <path d="M48 175 L40 188 L58 188 Z" fill="#2d1f0e" />
              <path d="M152 175 L160 188 L142 188 Z" fill="#2d1f0e" />
              {/* Main Burner Bowl Body */}
              <path d="M60 145 C60 100, 140 100, 140 145 Z" fill="#2b2010" stroke="#dfb858" strokeWidth="2.5" />
              {/* Gold Filigree Lace Overlay */}
              <path d="M70 140 Q100 115 130 140" stroke="#f3d078" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M75 130 Q100 120 125 130" stroke="#f3d078" strokeWidth="1.5" strokeDasharray="2 2" />
              {/* Dragon Horse Finial On Lid */}
              <path d="M75 100 C75 75, 125 75, 125 100 Z" fill="#1e160a" stroke="#dfb858" strokeWidth="2" />
              <circle cx="100" cy="70" r="10" fill="#dfb858" />
              <path d="M96 66 L104 66 L100 58 Z" fill="#fae8b2" />
              {/* Thermal Ring */}
              <circle cx="100" cy="120" r="15" fill="#543714" stroke="#e6c66e" strokeWidth="1" opacity={temperature / 240} />
              <text x="100" y="123" textAnchor="middle" fill="#fae8b2" fontSize="7" fontWeight="bold">
                {temperature}°C
              </text>
            </svg>

            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-wider text-[#dfb858] font-semibold">
                Nhiệt Độ Xông Trầm Vi Phân: {temperature}°C
              </span>
              <p className="text-[11px] text-[#ab9778] mt-0.5">
                {temperature >= 180
                  ? 'Nhiệt độ tối ưu: Tinh dầu Kỳ Nam bay hơi phân tử tinh khiết, 0 khói khét'
                  : 'Nhiệt độ êm dịu: Tỏa hương nền thư thái dịu dàng suốt ngày dài'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Controls & Tabs */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#cfbe9f] font-medium">Điều Nhiệt Vi Mạch Không Khói:</span>
              <span className="text-[#dfb858] font-bold">{temperature}°C / 240°C</span>
            </div>
            <input
              type="range"
              min="80"
              max="240"
              step="2"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-[#dfb858] cursor-pointer bg-[#22190c] h-2 rounded-lg"
              aria-label="Điều chỉnh nhiệt độ xông trầm Kỳ Nam từ 80 đến 240 độ C"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#1b140b] rounded-xl border border-[#312311]">
            <div>
              <div className="text-xs font-semibold text-[#ebdcc5]">Trường Hương Thanh Khiết</div>
              <div className="text-[11px] text-[#ab9778]">Khuếch tán vi phân tử không sinh nhiệt ẩm bức bối</div>
            </div>
            <button
              onClick={() => setSacredAromaActive(!sacredAromaActive)}
              aria-label="Bật tắt trường hương thanh khiết"
              className={`min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                sacredAromaActive
                  ? 'bg-[#3d2c11] text-[#fbeec9] border-[#dfb858]'
                  : 'bg-[#1a1309] text-[#786952] border-[#2b1f0f]'
              }`}
            >
              {sacredAromaActive ? 'Đang Tỏa' : 'Tạm Dừng'}
            </button>
          </div>

          {/* Detailed Tabs */}
          <div className="space-y-2">
            <span className="text-xs text-[#cfbe9f] font-medium">Bí Quyết Chế Tác Độc Quyền GuHomes:</span>
            {tabs.map((tab, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedVaultTab(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedVaultTab === idx
                    ? 'border-[#dfb858] bg-[#22180b]'
                    : 'border-[#291e0e] bg-[#140e06] hover:border-[#423118]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#fbf5eb]">{tab.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#33240e] text-[#dfb858] font-mono">
                    {tab.code}
                  </span>
                </div>
                <p className="text-xs text-[#ab9778] font-light leading-relaxed">{tab.desc}</p>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#1b1309] border border-[#302210] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#dfb858]">Cam Kết Vận Hành GuHomes</div>
                <div className="text-[11px] text-[#ab9778] mt-0.5">Xưởng Thạnh Xuân 1.200m² may đo độc bản · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#30220d] hover:bg-[#473314] text-[#fae8b2] text-xs font-medium border border-[#5c421a] transition-colors flex items-center justify-center shrink-0"
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

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV73
