'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestSpec {
  translucency: number
  magnification: number
  isBrushPlaced: boolean
  goldPurity: string
  jadeGrade: string
  woodBase: string
  lengthMm: number
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudFishLeafStudio() {
  const [translucency, setTranslucency] = useState<number>(98.8)
  const [magnification, setMagnification] = useState<number>(1.0)
  const [isBrushPlaced, setIsBrushPlaced] = useState<boolean>(true)
  const [soundFrequency, setSoundFrequency] = useState<528 | 1056>(528)
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false)
  const [activeView, setActiveView] = useState<'details' | 'materials' | 'craftsmanship'>('details')

  // Web Audio Context for Jade Resonance
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playJadeChime = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = audioCtxRef.current || new AudioCtx()
      audioCtxRef.current = ctx

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 2.9)

      setAudioPlaying(true)
      setTimeout(() => setAudioPlaying(false), 2800)
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

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0b0d] py-28 text-[#eae8e0]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-[#3b7858] blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-[#d4af37] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3e7255]/40 bg-[#131715] px-4 py-1.5 text-xs tracking-widest text-[#72ba91]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#72ba91]" />
            THƯ PHÒNG THƯỢNG HẠNG · BẢO VẬT KÊ NGỰ BÚT BÚP SEN & KIM NGƯ THÚY DIỆP
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-light tracking-wide text-[#f5f3ec] md:text-5xl"
          >
            Kê Ngự Bút Búp Sen & Kim Ngư Thúy Diệp Sen Nẹp Vàng 24K Filigree
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#a19e94] md:text-base"
          >
            Tuyệt phẩm văn phòng tứ bảo điêu khắc thủ công nguyên khối từ Ngọc Bích Phỉ Thúy Type A Myanmar thấu quang 98.8%,
            chạm khắc búp sen ngậm sương phong nhã nâng đỡ thân bút, phiến thúy diệp uốn lượn kèm tượng cá chép vượt vũ môn kim ngư lượn sóng.
            Viền nẹp vàng ròng 24K Filigree xe chỉ sợi 0.08mm đậu bạc mạ vàng, an vị trên bệ đỡ Gỗ Mun Sừng Khánh Hòa 280 năm tuổi độc bản GuHomes.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Visual Showcase (7 cols) */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2b2d29] bg-[#111316]/80 p-8 backdrop-blur-md lg:col-span-7">
            {/* View Mode Selector */}
            <div className="mb-6 flex gap-2 rounded-lg bg-[#1b1c21] p-1 text-xs">
              <button
                onClick={() => setActiveView('details')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeView === 'details' ? 'bg-[#72ba91] text-[#0a0b0d] font-medium' : 'text-[#a19e94] hover:text-white'
                }`}
              >
                Chi Tiết Cấu Trúc
              </button>
              <button
                onClick={() => setActiveView('materials')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeView === 'materials' ? 'bg-[#72ba91] text-[#0a0b0d] font-medium' : 'text-[#a19e94] hover:text-white'
                }`}
              >
                Chất Liệu Ngọc & Vàng
              </button>
              <button
                onClick={() => setActiveView('craftsmanship')}
                className={`rounded-md px-3 py-1.5 transition-all ${
                  activeView === 'craftsmanship' ? 'bg-[#72ba91] text-[#0a0b0d] font-medium' : 'text-[#a19e94] hover:text-white'
                }`}
              >
                Nghệ Thuật Filigree
              </button>
            </div>

            {/* Interactive SVG Canvas */}
            <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border border-[#242729] bg-[#08090b]">
              <motion.div
                animate={{ scale: magnification }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative flex flex-col items-center justify-center"
              >
                <svg width="340" height="200" viewBox="0 0 340 200" className="drop-shadow-2xl">
                  <defs>
                    <linearGradient id="jadeFishLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8de6b3" stopOpacity={translucency / 100} />
                      <stop offset="50%" stopColor="#419568" stopOpacity={(translucency / 100) * 0.95} />
                      <stop offset="100%" stopColor="#1b5639" stopOpacity={(translucency / 100) * 0.9} />
                    </linearGradient>
                    <linearGradient id="goldFiligreeFishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e5c158" />
                      <stop offset="50%" stopColor="#fff2a1" />
                      <stop offset="100%" stopColor="#c29b28" />
                    </linearGradient>
                    <linearGradient id="ebonyWoodBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2e2b26" />
                      <stop offset="50%" stopColor="#1a1815" />
                      <stop offset="100%" stopColor="#0d0c0a" />
                    </linearGradient>
                  </defs>

                  {/* Wood Base: Ebony Wood 280 years */}
                  <rect x="25" y="152" width="290" height="28" rx="6" fill="url(#ebonyWoodBaseGrad)" stroke="#454037" strokeWidth="1.5" />
                  <line x1="30" y1="165" x2="310" y2="165" stroke="#524d42" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />

                  {/* Lotus Leaf Base (Thúy Diệp Uốn Lượn) */}
                  <path
                    d="M 45 152 C 70 134, 120 140, 170 146 C 220 152, 270 136, 295 152 Z"
                    fill="url(#jadeFishLeafGrad)"
                    stroke="#419568"
                    strokeWidth="1.5"
                  />
                  {/* Gold Leaf Filigree Veins */}
                  <path
                    d="M 60 147 Q 110 141 170 146 Q 230 142 280 148"
                    fill="none"
                    stroke="url(#goldFiligreeFishGrad)"
                    strokeWidth="1.2"
                  />

                  {/* Lotus Bud Rest 1 (Left Crest) */}
                  <path
                    d="M 75 145 C 72 108, 95 88, 105 116 C 115 88, 138 108, 135 145 Z"
                    fill="url(#jadeFishLeafGrad)"
                    stroke="url(#goldFiligreeFishGrad)"
                    strokeWidth="1.8"
                  />

                  {/* Golden Fish (Kim Ngư vươn mình sóng nước) */}
                  <path
                    d="M 145 137 C 145 113, 160 106, 170 110 C 178 114, 185 103, 192 116 C 188 126, 178 133, 168 134 C 158 135, 150 140, 145 137 Z"
                    fill="url(#goldFiligreeFishGrad)"
                    stroke="#b38b1f"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 188 110 Q 200 104 205 112 Q 198 120 190 118"
                    fill="url(#goldFiligreeFishGrad)"
                    stroke="#8c6a12"
                    strokeWidth="0.8"
                  />
                  <circle cx="152" cy="118" r="1.5" fill="#18191a" />

                  {/* Lotus Bud Rest 2 (Right Crest) */}
                  <path
                    d="M 205 145 C 202 103, 228 83, 240 113 C 252 83, 278 103, 275 145 Z"
                    fill="url(#jadeFishLeafGrad)"
                    stroke="url(#goldFiligreeFishGrad)"
                    strokeWidth="1.8"
                  />

                  {/* Bud Petals Veins */}
                  <path
                    d="M 105 116 Q 105 100 105 90 M 240 113 Q 240 96 240 86"
                    stroke="url(#goldFiligreeFishGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* Placed Brush Animation */}
                  {isBrushPlaced && (
                    <g className="transition-all duration-300">
                      <rect x="20" y="84" width="300" height="9" rx="4.5" fill="#4d3324" stroke="#2a1b12" strokeWidth="1" />
                      <rect x="270" y="83" width="20" height="11" rx="2" fill="url(#goldFiligreeFishGrad)" />
                      <path d="M 290 83 C 310 86, 328 88, 335 88.5 C 328 89, 310 91, 290 94 Z" fill="#eae5d6" stroke="#ccc4b0" strokeWidth="0.8" />
                      <circle cx="27" cy="88.5" r="3.5" fill="none" stroke="url(#goldFiligreeFishGrad)" strokeWidth="1.5" />
                    </g>
                  )}
                </svg>
              </motion.div>

              {/* Status Badge */}
              <div className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 text-[11px] font-mono text-[#72ba91] backdrop-blur-sm">
                Độ Thấu Quang: {translucency.toFixed(1)}% | Zoom: {magnification.toFixed(1)}x
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                  className={`rounded border px-2.5 py-1 text-xs transition-all ${
                    isBrushPlaced
                      ? 'border-[#72ba91] bg-[#72ba91]/20 text-[#72ba91]'
                      : 'border-[#555] bg-[#1a1a1a] text-[#888]'
                  }`}
                >
                  {isBrushPlaced ? 'Bút Đang An Vị' : 'Đã Nhấc Bút'}
                </button>
              </div>
            </div>

            {/* Sound Resonator */}
            <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-[#29332e] bg-[#131816]/70 p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#72ba91]/40 ${audioPlaying ? 'bg-[#72ba91]/30 animate-pulse' : 'bg-[#17221c]'}`}>
                  <span className="text-base text-[#72ba91]">♫</span>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-[#d7ddd9]">Thanh Âm Phỉ Thúy & Kim Cương Thừa</h4>
                  <p className="text-[11px] text-[#7a8a80]">Tần số vi chấn thanh lọc tâm thức khi phóng bút</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSoundFrequency(528)
                    playJadeChime(528)
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                    soundFrequency === 528
                      ? 'border-[#72ba91] bg-[#72ba91]/20 text-[#a1e3be]'
                      : 'border-[#333] bg-[#1a1d1b] text-[#888]'
                  }`}
                >
                  528Hz (Tần Số Tái Tạo)
                </button>
                <button
                  onClick={() => {
                    setSoundFrequency(1056)
                    playJadeChime(1056)
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                    soundFrequency === 1056
                      ? 'border-[#e0b943] bg-[#e0b943]/20 text-[#f5d77a]'
                      : 'border-[#333] bg-[#1a1d1b] text-[#888]'
                  }`}
                >
                  1056Hz (Hài Âm Bát Nhã)
                </button>
              </div>
            </div>
          </div>

          {/* Configuration & Parameters (5 cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-[#272a28] bg-[#111314] p-6">
              <h3 className="mb-4 text-lg font-light text-[#eeeae3]">Thông Số Ngự Dụng Thủ Công</h3>

              {/* Translucency Controller */}
              <div className="mb-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#949c97]">Độ Thấu Quang Thể Thủy Tinh (Water Species)</span>
                  <span className="font-mono text-[#72ba91]">{translucency}%</span>
                </div>
                <input
                  type="range"
                  min="85.0"
                  max="99.5"
                  step="0.1"
                  value={translucency}
                  onChange={(e) => setTranslucency(parseFloat(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#25302a] accent-[#72ba91]"
                />
                <p className="text-[11px] text-[#6b766f]">
                  Chuẩn mực Ngọc Phỉ Thúy Type A tự nhiên không qua xử lý hóa chất, tinh khiết đạt thấu quang thượng phẩm.
                </p>
              </div>

              {/* Zoom Controller */}
              <div className="mb-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#949c97]">Kính Lúp Soi Sợi Vàng Filigree 0.08mm</span>
                  <span className="font-mono text-[#e5c158]">{magnification}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="1.6"
                  step="0.05"
                  value={magnification}
                  onChange={(e) => setMagnification(parseFloat(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#393322] accent-[#e5c158]"
                />
                <p className="text-[11px] text-[#777163]">
                  Phóng đại cấu trúc xe sợi vàng ròng 24K thủ công tinh vi nẹp chặt mép lá và búp hoa sen.
                </p>
              </div>

              {/* Technical Specifications List */}
              <div className="space-y-2.5 border-t border-[#1e2120] pt-4 text-xs text-[#a1a8a4]">
                <div className="flex justify-between">
                  <span className="text-[#6b756f]">Phẩm cấp Ngọc:</span>
                  <span className="font-medium text-[#bec7c1]">Type A Myanmar Phỉ Thúy Thủy Chủng</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b756f]">Tượng linh vật:</span>
                  <span className="font-medium text-[#e5c158]">Kim Ngư Du Thủy (Cá chép vượt vũ môn nẹp vàng 24K)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b756f]">Kim loại quý:</span>
                  <span className="font-medium text-[#e5c158]">Vàng ròng 24K Filigree (Sợi se đôi 0.08mm)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b756f]">Bệ đế mộc:</span>
                  <span className="font-medium text-[#bec7c1]">Gỗ Mun Sừng Khánh Hòa 280 năm tuổi tẩm sấy bí truyền</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b756f]">Kích thước ngự dụng:</span>
                  <span className="font-medium text-[#bec7c1]">Dài 270mm x Rộng 70mm x Cao 100mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b756f]">Số lượng chế tác:</span>
                  <span className="font-medium text-[#bec7c1]">Độc bản 01 bộ duy nhất mỗi niên độ</span>
                </div>
              </div>
            </div>

            {/* Atelier Direct Contact Box */}
            <div className="rounded-2xl border border-[#393422] bg-[#181611]/60 p-5 backdrop-blur-sm">
              <h4 className="text-xs font-semibold tracking-wider text-[#e5c158]">GUHOMES BESPOKE ATELIER THƯ VIỆN & THƯ PHÒNG</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#b2ac9c]">
                Mỗi tuyệt tác văn phòng tứ bảo đều được chế tác riêng theo phong thủy bản mệnh gia chủ và kích thước bàn đại tự.
                Trần giới hạn 12 tuyệt phẩm ngự dụng/năm tại xưởng may đo Thạnh Xuân 1.200m².
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#867f70]">Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="font-mono font-medium text-[#e5c158] hover:underline">
                  0368 757 916
                </a>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className="text-[#867f70]">Email Độc Bản:</span>
                <span className="font-mono text-[#c3beb2]">guhomesvn@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudFishLeafStudio
