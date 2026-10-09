'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IncenseVaultMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV72() {
  const [temperature, setTemperature] = useState<number>(186)
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

      // Solfeggio 528Hz (Transformation & DNA Harmony)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc528Ref.current = osc1

      // Solfeggio 741Hz (Awakening Intuition & Purity)
      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
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
      label: 'Kỳ Nam Khánh Hòa',
      value: 'Bạch Kỳ Tuyệt Phẩm',
      subtext: 'Mật độ tinh dầu 95%',
      detail: 'Tuyển lọc từ lõi trầm tự nhiên tích tụ trên 300 năm, hương thơm ngọt thanh thoát ly trần thế.',
    },
    {
      label: 'Kiểm Soát Nhiệt Độ',
      value: `${temperature}°C`,
      subtext: 'Dải nhiệt 80°C - 240°C',
      detail: 'Công nghệ xông gốm bán dẫn không khói, bảo lưu trọn vẹn phức hợp hương hữu cơ quý hiếm.',
    },
    {
      label: 'Vàng 24K Filigree',
      value: 'Thất Thập Nhị V72',
      subtext: '72 chi tiết Long Mã dát vàng',
      detail: 'Từng sợi vàng kéo chỉ 0.08mm uốn lượn hình Long Mã Đạp Sen, chạm khắc vi mô bởi nghệ nhân kim hoàn di sản.',
    },
    {
      label: 'Bệ Án Trắc Đỏ',
      value: '400 Năm Tuổi',
      subtext: 'Thớ mịn bóng như sừng',
      detail: 'Gỗ Trắc Đỏ Nam Bộ đại thụ vân cẩm thạch sắc sảo, chống mối mọt và biến dạng tuyệt đối qua các thời kỳ.',
    },
  ]

  const vaultTabs = [
    {
      title: 'Long Mã Thất Thập Nhị V72',
      desc: 'Hình tượng Long Mã đạp sóng nước hoa sen, 72 chi tiết vàng hóa giải điềm xấu đem lại đại hưng và cát tường cho gia tộc.',
      specs: 'Vàng ròng 24K tinh khiết · Kỹ nghệ kéo sợi Filigree thủ công 285 giờ hoàn thiện.',
    },
    {
      title: 'Buồng Xông Vi Nhiệt Gốm Zirconia',
      desc: 'Lòng đĩa đốt bọc gốm tinh thể Zirconia dẫn nhiệt đồng đều tới 0.1°C, giải phóng tinh dầu kỳ nam theo tầng hương từ thanh mát đến ngọt sâu.',
      specs: 'Cảm biến PID đa vi điểm · Không sinh khí CO2 hay tàn than đen.',
    },
    {
      title: 'Án Gỗ Trắc Đỏ 400 Năm Nam Bộ',
      desc: 'Án ngự chế tác từ khối trắc đỏ cổ thụ, vân thớ uốn lượn tựa mây nước, tạo nền tảng vững chãi cho không gian tịnh dưỡng.',
      specs: 'Mộng khóa âm dương Thạnh Xuân · Đánh bóng mờ tự nhiên bằng sáp ong rừng.',
    },
  ]

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#090b0e] text-[#f5efe6] overflow-hidden border-t border-b border-[#202735]">
      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#d4af37] rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7c5e31] rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1911] border border-[#7c622d] text-[#e6ca65] text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#e6ca65] animate-pulse" />
            Vật Phẩm Phong Thủy Thượng Hạng · Master Series V72
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-[#f5efe6] tracking-tight leading-tight">
            Đỉnh Lư Kim Long Mã &amp; Đài Sen Kỳ Nam V72
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a59e92] font-light leading-relaxed">
            Tuyệt tác phong thủy Thất Thập Nhị Thế V72 Thất Nhị Địa Sát Hóa Cát. Kết tinh vàng ròng 24K kéo sợi Filigree trên đài sen Bạch Kỳ Khánh Hòa và bệ án Trắc Đỏ 400 năm.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-5 rounded-2xl bg-[#101319] border border-[#1d232e] hover:border-[#7c622d] transition-colors"
            >
              <div className="text-xs text-[#8c949e] uppercase font-mono tracking-wider">{m.label}</div>
              <div className="mt-2 text-2xl sm:text-3xl font-serif text-[#d4af37] font-normal">{m.value}</div>
              <div className="mt-1 text-xs text-[#e6ca65] font-medium">{m.subtext}</div>
              <p className="mt-2 text-[11px] text-[#717b87] font-light leading-normal">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Master Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Visual & Interactive Canvas */}
          <div className="lg:col-span-7 bg-[#0f1217] rounded-2xl border border-[#1c222c] p-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#181d26] mb-6">
              <div>
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-wider">Vi Khí Hương Nhiệt Kỳ Nam</span>
                <h3 className="text-lg font-serif text-[#f2ece1] mt-0.5">Xông Hương Không Khói Zirconia</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSacredAromaActive(!sacredAromaActive)}
                  className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    sacredAromaActive
                      ? 'bg-[#261f14] border-[#7c622d] text-[#e6ca65]'
                      : 'bg-[#12151b] border-[#222834] text-[#717b87]'
                  }`}
                >
                  {sacredAromaActive ? 'Hương Khí: Hoạt Động' : 'Hương Khí: Chờ'}
                </button>
                <button
                  type="button"
                  onClick={toggleSolfeggio}
                  className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    solfeggioActive
                      ? 'bg-[#291f16] border-[#d4af37] text-[#fcd34d] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                      : 'bg-[#12151b] border-[#222834] text-[#717b87]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${solfeggioActive ? 'bg-[#d4af37] animate-ping' : 'bg-[#555]'}`} />
                  {solfeggioActive ? '528Hz + 741Hz: Bật' : 'Solfeggio: Tắt'}
                </button>
              </div>
            </div>

            {/* SVG Visual Representation of the Incense Burner Vault */}
            <div className="relative w-full aspect-[16/10] bg-[#090b0e] rounded-xl overflow-hidden flex items-center justify-center border border-[#161a22]">
              <svg viewBox="0 0 600 380" className="w-full h-full">
                <defs>
                  <radialGradient id="aromaGlowV72" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#9a7b2c" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#090b0e" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="goldFiligreeV72" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff3b0" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#997a15" />
                  </linearGradient>
                  <linearGradient id="tracWoodV72" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#541b12" />
                    <stop offset="50%" stopColor="#38100a" />
                    <stop offset="100%" stopColor="#1e0805" />
                  </linearGradient>
                </defs>

                {/* Trắc Đỏ Base Stand */}
                <rect x="150" y="290" width="300" height="35" rx="6" fill="url(#tracWoodV72)" stroke="#78291f" strokeWidth="1.5" />
                <rect x="180" y="325" width="240" height="15" rx="3" fill="#290b07" stroke="#4a150f" strokeWidth="1" />

                {/* Thermal Dispersion Waves if Active */}
                {sacredAromaActive && (
                  <>
                    <ellipse cx="300" cy="180" rx="90" ry="120" fill="url(#aromaGlowV72)" />
                    <path
                      d="M 290 190 Q 275 140 300 90 T 295 30"
                      fill="none"
                      stroke="#fcd34d"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.75"
                    >
                      <animate attributeName="d" values="M 290 190 Q 275 140 300 90 T 295 30; M 290 190 Q 315 140 290 90 T 305 30; M 290 190 Q 275 140 300 90 T 295 30" dur="4s" repeatCount="indefinite" />
                    </path>
                    <path
                      d="M 310 190 Q 325 130 305 80 T 315 25"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.6"
                    >
                      <animate attributeName="d" values="M 310 190 Q 325 130 305 80 T 315 25; M 310 190 Q 285 130 315 80 T 295 25; M 310 190 Q 325 130 305 80 T 315 25" dur="3.5s" repeatCount="indefinite" />
                    </path>
                  </>
                )}

                {/* Lotus Petals Chalice Body */}
                <ellipse cx="300" cy="275" rx="75" ry="18" fill="url(#goldFiligreeV72)" stroke="#fcd34d" strokeWidth="1" />
                <path
                  d="M 230 270 C 230 200, 270 190, 300 200 C 330 190, 370 200, 370 270 Z"
                  fill="url(#goldFiligreeV72)"
                  stroke="#7c622d"
                  strokeWidth="2"
                />

                {/* Dragon-Horse Golden Silhouette Crest on Top */}
                <g transform="translate(255, 110) scale(0.9)">
                  {/* Horse Body and Dragon Scales */}
                  <path
                    d="M 20 80 Q 40 40 60 50 Q 80 30 70 10 Q 50 15 45 35 Q 30 40 10 75 Z"
                    fill="url(#goldFiligreeV72)"
                    stroke="#fff3b0"
                    strokeWidth="1.5"
                  />
                  {/* Lotus Wing detail */}
                  <path
                    d="M 45 45 C 65 20, 85 30, 95 60 C 75 65, 55 55, 45 45 Z"
                    fill="#fef08a"
                    stroke="#d4af37"
                    strokeWidth="1"
                    opacity="0.9"
                  />
                </g>

                {/* Heating Chamber Indicator */}
                <circle cx="300" cy="235" r="14" fill={temperature > 150 ? '#ef4444' : '#f59e0b'} opacity="0.8">
                  <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="300" y="239" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {temperature}°
                </text>
              </svg>

              {/* Status Badge in corner */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#08090c]/85 border border-[#1f2530] backdrop-blur-md text-[11px] text-[#c7beaf] font-mono">
                Thất Thập Nhị V72 · Nhiệt Lượng: <span className="text-[#e6ca65] font-bold">{temperature}°C</span> · Tần Số: <span className="text-[#38bdf8] font-bold">528Hz + 741Hz</span>
              </div>
            </div>

            {/* Slider Control for Temperature */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between items-center text-xs text-[#a59e92]">
                <span>Nhiệt độ xông tinh dầu Kỳ Nam:</span>
                <span className="font-mono text-[#e6ca65] font-semibold">{temperature}°C / 240°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                aria-label="Điều chỉnh nhiệt độ xông trầm kỳ nam"
                className="w-full h-2 bg-[#171c24] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex justify-between text-[11px] text-[#5e6673] font-mono">
                <span>80°C Thoảng Nhẹ</span>
                <span>140°C Tinh Dầu Trầm</span>
                <span>186°C Bạch Kỳ Chuẩn</span>
                <span>240°C Ngọt Sâu Đậm</span>
              </div>
            </div>
          </div>

          {/* Facets Exploration Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-lg font-serif text-[#e8e2d5] mb-1">
              Ba Cột Trụ Đỉnh Lư Kim Long Mã V72
            </h3>

            {vaultTabs.map((tab, tIdx) => (
              <div
                key={tIdx}
                onClick={() => setSelectedVaultTab(tIdx)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                  selectedVaultTab === tIdx
                    ? 'bg-[#181510] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                    : 'bg-[#0f1217] border-[#1d232e] hover:border-[#383120]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">{tab.title}</span>
                  <span className="text-[11px] text-[#717b87] font-mono">0{tIdx + 1}</span>
                </div>
                <p className="text-xs text-[#8c949e] font-light leading-relaxed mb-2">{tab.desc}</p>
                <div className="text-[11px] text-[#cca44c] font-mono">{tab.specs}</div>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#14120e] border border-[#3b321a] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#d4af37]">Chế Tác Thủ Công Độc Bản</div>
                <div className="text-[11px] text-[#a0947e] mt-0.5">Xưởng Thạnh Xuân 1.200m² may đo độc bản · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#2a2212] hover:bg-[#3d3119] text-[#fcd34d] text-xs font-medium border border-[#6d5420] transition-colors flex items-center justify-center shrink-0"
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

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV72
