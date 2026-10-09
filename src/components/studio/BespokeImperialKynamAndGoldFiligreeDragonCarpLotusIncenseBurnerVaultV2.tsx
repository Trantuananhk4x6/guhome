'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IncenseVaultSpec {
  temperature: number
  kynamGrade: 'thanh-ky' | 'bach-ky' | 'hoang-ky'
  diffusingState: boolean
  fragranceRadiusMeters: number
  chimeActive: boolean
}

export function BespokeImperialKynamAndGoldFiligreeDragonCarpLotusIncenseBurnerVaultV2() {
  const [temperature, setTemperature] = useState<number>(165)
  const [kynamGrade, setKynamGrade] = useState<'thanh-ky' | 'bach-ky' | 'hoang-ky'>('bach-ky')
  const [diffusingState, setDiffusingState] = useState<boolean>(true)
  const [chimeActive, setChimeActive] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'burner' | 'kynam' | 'altar'>('burner')

  // Dual Tone Web Audio Context (528Hz & 741Hz)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playChimeResonance = (freq1 = 528, freq2 = 741) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = audioCtxRef.current || new AudioCtx()
      audioCtxRef.current = ctx

      // Primary Solfeggio Osc
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(freq1, ctx.currentTime)
      gain1.gain.setValueAtTime(0.001, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.08)
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)

      // Harmonic Solfeggio Osc
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(freq2, ctx.currentTime)
      gain2.gain.setValueAtTime(0.001, ctx.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.08)
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)

      osc1.start()
      osc2.start()
      osc1.stop(ctx.currentTime + 3.1)
      osc2.stop(ctx.currentTime + 3.3)

      setChimeActive(true)
      setTimeout(() => setChimeActive(false), 3100)
    } catch (err) {
      console.error('Audio chime error:', err)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Calculate fragrance radius
  const fragranceRadius = (15 + (temperature / 240) * 20).toFixed(1)

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0c0a] py-28 text-[#ebe7df]">
      {/* Golden Aura Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-[#c99a38] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-[#523315] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7a5f27]/40 bg-[#1a1711] px-4 py-1.5 text-xs tracking-widest text-[#d8ad4b]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8ad4b]" />
            BẢO THẤT THƯỢNG UYỂN · TRẦM KỲ HOÀNG TRIỀU & ĐỈNH LƯ KIM LONG NGƯ FILIGREE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-light tracking-wide text-[#f7f5ed] md:text-5xl"
          >
            Bảo Thất Kỳ Nam & Đỉnh Lư Kim Long Ngư Đạp Sen Vàng 24K Filigree
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#a8a396] md:text-base"
          >
            Kiệt tác ngự dụng thư phòng kết hợp Đỉnh Lư Kim Long Ngư Đạp Sen Vàng 24K Filigree "Long Ngư Hóa Long" thủ công xe sợi chỉ vàng 0.12mm,
            ruột đúc đồng đỏ nguyên khối 10mm. An vị trên Án thờ Gỗ Cẩm Lai Nam Bộ 280 năm cẩn Ngọc Phỉ Thúy Type A,
            tích hợp bộ điều nhiệt vi phân 80°C - 240°C kích hoạt hương thơm thanh tao của Trầm Kỳ Khánh Hòa độc bản GuHomes.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Visual Showcase (7 cols) */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#362e1e] bg-[#14120e]/80 p-8 backdrop-blur-md lg:col-span-7">
            {/* View Mode Selector */}
            <div className="mb-6 flex gap-2 rounded-lg bg-[#201c14] p-1 text-xs">
              <button
                onClick={() => setActiveTab('burner')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'burner' ? 'bg-[#d8ad4b] text-[#0d0c0a] font-medium' : 'text-[#8c8577] hover:text-white'
                }`}
              >
                Đỉnh Lư Kim Long Ngư
              </button>
              <button
                onClick={() => setActiveTab('kynam')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'kynam' ? 'bg-[#d8ad4b] text-[#0d0c0a] font-medium' : 'text-[#8c8577] hover:text-white'
                }`}
              >
                Trầm Kỳ Vạn Ninh
              </button>
              <button
                onClick={() => setActiveTab('altar')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeTab === 'altar' ? 'bg-[#d8ad4b] text-[#0d0c0a] font-medium' : 'text-[#8c8577] hover:text-white'
                }`}
              >
                Án Gỗ Cẩm Lai 280 Năm
              </button>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border border-[#2b2416] bg-[#0a0907]">
              <svg width="340" height="230" viewBox="0 0 340 230" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="goldFiligreeGradV2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e5c158" />
                    <stop offset="50%" stopColor="#fff2a1" />
                    <stop offset="100%" stopColor="#c29b28" />
                  </linearGradient>
                  <linearGradient id="camLaiWoodGradV2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#401d14" />
                    <stop offset="50%" stopColor="#280f0a" />
                    <stop offset="100%" stopColor="#170603" />
                  </linearGradient>
                  <linearGradient id="jadeInsertGradV2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#75c297" />
                    <stop offset="100%" stopColor="#24593b" />
                  </linearGradient>
                </defs>

                {/* Cam Lai Altar Base 280 yrs */}
                <rect x="30" y="165" width="280" height="34" rx="4" fill="url(#camLaiWoodGradV2)" stroke="#57291d" strokeWidth="1.2" />
                <line x1="35" y1="182" x2="305" y2="182" stroke="#693325" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />

                {/* Jade Filigree Inserts on Altar */}
                <rect x="55" y="172" width="28" height="12" rx="2" fill="url(#jadeInsertGradV2)" stroke="url(#goldFiligreeGradV2)" strokeWidth="0.8" />
                <rect x="257" y="172" width="28" height="12" rx="2" fill="url(#jadeInsertGradV2)" stroke="url(#goldFiligreeGradV2)" strokeWidth="0.8" />

                {/* Lotus Petals Base Plinth (Đài Sen Vàng 24K) */}
                <ellipse cx="170" cy="164" rx="60" ry="14" fill="url(#goldFiligreeGradV2)" stroke="#9c781d" strokeWidth="1" />
                <path
                  d="M 120 164 C 135 150, 150 148, 170 148 C 190 148, 205 150, 220 164 Z"
                  fill="#997017"
                  stroke="url(#goldFiligreeGradV2)"
                  strokeWidth="1.2"
                />

                {/* Red Copper Chamber (Ruột Đồng Đỏ 10mm) */}
                <ellipse cx="170" cy="146" rx="44" ry="12" fill="#5c2617" stroke="#873c27" strokeWidth="1" />

                {/* Rising Incense Vapor Waves */}
                {diffusingState && (
                  <g className="animate-pulse opacity-75">
                    <path
                      d="M 170 138 C 160 115, 178 95, 168 70 C 158 52, 174 38, 170 20"
                      fill="none"
                      stroke="#d8ad4b"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <path
                      d="M 162 136 C 152 110, 164 88, 156 65"
                      fill="none"
                      stroke="#f5d47a"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                    <path
                      d="M 178 136 C 188 110, 176 88, 184 65"
                      fill="none"
                      stroke="#f5d47a"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                  </g>
                )}

                {/* Dragon Carp Figurine (Kim Long Ngư Hóa Long trên đỉnh đài sen) */}
                {/* Carp Body Arcing Upwards */}
                <path
                  d="M 148 142 C 145 110, 162 90, 172 82 C 185 88, 195 105, 192 142 Z"
                  fill="url(#goldFiligreeGradV2)"
                  stroke="#b38a20"
                  strokeWidth="1.5"
                />
                {/* Dragon Carp Head & Horn */}
                <circle cx="172" cy="78" r="9" fill="url(#goldFiligreeGradV2)" stroke="#9c781d" strokeWidth="1" />
                <path d="M 170 70 L 176 58 L 174 72 Z" fill="#fff4ad" stroke="#b38a20" strokeWidth="0.8" />
                {/* Whisker & Dragon Teeth */}
                <path d="M 166 82 Q 155 86 150 92 M 178 82 Q 189 86 194 92" stroke="#fff4ad" strokeWidth="1" fill="none" />
                {/* Fin & Tail Scales */}
                <path d="M 148 116 Q 135 120 144 130 M 192 116 Q 205 120 196 130" stroke="url(#goldFiligreeGradV2)" strokeWidth="1.2" fill="none" />
                {/* Pearl in Mouth */}
                <circle cx="172" cy="85" r="2.5" fill="#fdfdfd" stroke="#d4af37" strokeWidth="0.8" />
              </svg>

              {/* Status Badge */}
              <div className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 text-[11px] font-mono text-[#d8ad4b] backdrop-blur-sm">
                Nhiệt Độ: {temperature}°C | Bán Kính Tỏa Hương: {fragranceRadius}m | Phẩm: {kynamGrade.toUpperCase()}
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => setDiffusingState(!diffusingState)}
                  className={`rounded border px-2.5 py-1 text-xs transition-all ${
                    diffusingState
                      ? 'border-[#d8ad4b] bg-[#d8ad4b]/20 text-[#d8ad4b]'
                      : 'border-[#555] bg-[#1a1a1a] text-[#888]'
                  }`}
                >
                  {diffusingState ? 'Khí Hương Lan Tỏa' : 'Tạm Dừng Tỏa'}
                </button>
              </div>
            </div>

            {/* Chime Solfeggio Web Audio Button */}
            <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-[#3b321e] bg-[#17140e]/70 p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#d8ad4b]/40 ${chimeActive ? 'bg-[#d8ad4b]/30 animate-pulse' : 'bg-[#221c11]'}`}>
                  <span className="text-base text-[#d8ad4b]">🔔</span>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-[#ebe4d6]">Hài Âm Hoàng Gia 528Hz & 741Hz</h4>
                  <p className="text-[11px] text-[#8a806d]">Cộng hưởng xua tan uế khí, kích hoạt năng lượng phong thủy cát tường</p>
                </div>
              </div>

              <button
                onClick={() => playChimeResonance(528, 741)}
                className={`rounded-lg border px-3.5 py-1.5 text-xs font-mono transition-all ${
                  chimeActive
                    ? 'border-[#d8ad4b] bg-[#d8ad4b]/20 text-[#f7dc8d]'
                    : 'border-[#4a3e24] bg-[#221b10] text-[#aba089] hover:border-[#d8ad4b]'
                }`}
              >
                {chimeActive ? 'Đang Ngân Âm Kép' : 'Thỉnh Chuông Trầm'}
              </button>
            </div>
          </div>

          {/* Config & Parameters (5 cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-[#302819] bg-[#14120e] p-6">
              <h3 className="mb-4 text-lg font-light text-[#f5f2e9]">Thông Số Kỹ Nghệ Bảo Thất</h3>

              {/* Temperature Slider */}
              <div className="mb-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#a09786]">Điều Nhiệt Vi Phân Không Khói Khét (80°C - 240°C)</span>
                  <span className="font-mono text-[#d8ad4b]">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="240"
                  value={temperature}
                  onChange={(e) => setTemperature(parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#2e2617] accent-[#d8ad4b]"
                />
                <p className="text-[11px] text-[#786f5f]">
                  Nhiệt độ 160°C - 180°C là ngưỡng lý tưởng để tinh dầu Kỳ Nam tơ trắng bốc hơi ngọt lịm mà không cháy khét sợi gỗ.
                </p>
              </div>

              {/* Kynam Selection */}
              <div className="mb-5 space-y-2">
                <span className="text-xs text-[#a09786]">Tuyển Chọn Phẩm Cấp Trầm Kỳ Khánh Hòa:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setKynamGrade('thanh-ky')}
                    className={`rounded-lg border p-2 text-center text-xs transition-all ${
                      kynamGrade === 'thanh-ky'
                        ? 'border-[#d8ad4b] bg-[#d8ad4b]/20 text-[#f5d985]'
                        : 'border-[#332b1b] bg-[#1a1710] text-[#7d7567]'
                    }`}
                  >
                    Thanh Kỳ (97.9%)
                  </button>
                  <button
                    onClick={() => setKynamGrade('bach-ky')}
                    className={`rounded-lg border p-2 text-center text-xs transition-all ${
                      kynamGrade === 'bach-ky'
                        ? 'border-[#d8ad4b] bg-[#d8ad4b]/20 text-[#f5d985]'
                        : 'border-[#332b1b] bg-[#1a1710] text-[#7d7567]'
                    }`}
                  >
                    Bạch Kỳ (99.6%)
                  </button>
                  <button
                    onClick={() => setKynamGrade('hoang-ky')}
                    className={`rounded-lg border p-2 text-center text-xs transition-all ${
                      kynamGrade === 'hoang-ky'
                        ? 'border-[#d8ad4b] bg-[#d8ad4b]/20 text-[#f5d985]'
                        : 'border-[#332b1b] bg-[#1a1710] text-[#7d7567]'
                    }`}
                  >
                    Hoàng Kỳ (97.2%)
                  </button>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2.5 border-t border-[#241e13] pt-4 text-xs text-[#a39c8d]">
                <div className="flex justify-between">
                  <span className="text-[#71695b]">Chất liệu Đỉnh Lư:</span>
                  <span className="font-medium text-[#d8ad4b]">Vàng 24K Filigree (0.12mm) & Đồng Đỏ 10mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71695b]">Hình tượng ngự chế:</span>
                  <span className="font-medium text-[#f5d985]">Kim Long Ngư Hóa Long đạp Đài Sen Vàng</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71695b]">Bàn án ngự phong thủy:</span>
                  <span className="font-medium text-[#c9c2b4]">Gỗ Cẩm Lai Nam Bộ 280 năm cẩn Ngọc Phỉ Thúy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71695b]">Công nghệ sấy nhiệt:</span>
                  <span className="font-medium text-[#c9c2b4]">Gia nhiệt bán dẫn vi phân đa điểm không khói</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71695b]">Số lượng chế tác:</span>
                  <span className="font-medium text-[#d8ad4b]">Độc bản duy nhất 01 bộ toàn quốc</span>
                </div>
              </div>
            </div>

            {/* Bespoke Atelier Contact */}
            <div className="rounded-2xl border border-[#3d331f] bg-[#1a160f]/60 p-5 backdrop-blur-sm">
              <h4 className="text-xs font-semibold tracking-wider text-[#d8ad4b]">GUHOMES BESPOKE ATELIER PHÒNG THỜ & THƯ VIỆN</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#b4ac9c]">
                Mỗi tuyệt phẩm Bảo Thất Kỳ Nam đều được định vị phong thủy đo đạc theo thước Lỗ Ban Cung Đình và trường khí thực tế của tư gia.
                Trần 12 công trình/năm tại xưởng Thạnh Xuân 1.200m².
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#877f70]">Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="font-mono font-medium text-[#d8ad4b] hover:underline">
                  0368 757 916
                </a>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className="text-[#877f70]">Email Độc Bản:</span>
                <span className="font-mono text-[#c5beb0]">guhomesvn@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonCarpLotusIncenseBurnerVaultV2
