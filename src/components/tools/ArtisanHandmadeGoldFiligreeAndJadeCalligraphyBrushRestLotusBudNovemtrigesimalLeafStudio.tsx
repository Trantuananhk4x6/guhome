'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestSpec {
  jadeGrade: string
  translucency: string
  goldFiligree: string
  woodBase: string
  inclineAngle: string
  acoustics: string
}

const SPEC: BrushRestSpec = {
  jadeGrade: 'Ngọc Bích Phỉ Thúy Type A Myanmar tự nhiên',
  translucency: '99.99% Thấu quang ngọc tủy thanh ngọc hoàng gia',
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 39 cánh',
  woodBase: 'Bệ Gỗ Mun Sừng Khánh Hòa Cổ Thụ 400 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const NOVEMTRIGESIMAL_LEAF_NAMES = [
  'Diệp Nhất (Sơ Khai)',
  'Diệp Nhị (Cam Lộ)',
  'Diệp Tam (Thanh Lương)',
  'Diệp Tứ (Minh Triết)',
  'Diệp Ngũ (Tĩnh Lự)',
  'Diệp Lục (Vi Diệu)',
  'Diệp Thất (Viên Dung)',
  'Diệp Bát (Bảo Quang)',
  'Diệp Cửu (Diệu Hạnh)',
  'Diệp Thập (Vô Lượng)',
  'Diệp Thập Nhất (Như Ý)',
  'Diệp Thập Nhị (Viên Mãn)',
  'Diệp Thập Tam (Vô Thượng)',
  'Diệp Thập Tứ (Đại Giác)',
  'Diệp Thập Ngũ (Chân Như)',
  'Diệp Thập Lục (Bản Thể)',
  'Diệp Thập Thất (Tối Thượng Diệu Giác)',
  'Diệp Thập Bát (Viên Giác Vô Ngại)',
  'Diệp Thập Cửu (Vạn Pháp Quy Nhất)',
  'Diệp Nhị Thập (Đại Viên Cảnh Trí)',
  'Diệp Nhị Thập Nhất (Vô Lượng Thọ Quang)',
  'Diệp Nhị Thập Nhị (Diệu Trí Pháp Thân)',
  'Diệp Nhị Thập Tam (Tịch Diệt Tĩnh Thất)',
  'Diệp Nhị Thập Tứ (Viên Mãn Vô Thượng Bồ Đề)',
  'Diệp Nhị Thập Ngũ (Chân Quang Bất Hoại)',
  'Diệp Nhị Thập Lục (Đại Bát Niết Bàn Vô Lượng Thọ)',
  'Diệp Nhị Thập Thất (Vô Lượng Thọ Mạng Thường Lạc Ngã Tịnh)',
  'Diệp Nhị Thập Bát (Đại Đạo Viên Giác Vô Vi Bất Diệt)',
  'Diệp Nhị Thập Cửu (Diệu Giác Pháp Giới Vô Lượng Trang Nghiêm)',
  'Diệp Tam Thập (Viên Mãn Vô Cực Đại Định Kim Cương Bất Thoái)',
  'Diệp Tam Thập Nhất (Chân Như Viên Giác Tối Thượng Quang Minh)',
  'Diệp Tam Thập Nhị (Đại Viên Mãn Tối Thượng Chân Như Bất Thoái)',
  'Diệp Tam Thập Tam (Vô Lượng Thọ Viên Giác Vô Vi Bất Biến)',
  'Diệp Tam Thập Tứ (Đại Viên Mãn Kim Cương Vô Thượng Bồ Đề Thường Tịch)',
  'Diệp Tam Thập Ngũ (Thái Cực Viên Mãn Diệu Trí Vô Lượng Thọ)',
  'Diệp Tam Thập Lục (Lục Lục Đại Thuận Vô Thượng Viên Mãn)',
  'Diệp Tam Thập Thất (Thất Tinh Tụ Khí Bát Nhã Viên Thông)',
  'Diệp Tam Thập Bát (Bát Tiên Quá Hải Đại Lợi Trường Sinh)',
  'Diệp Tam Thập Cửu (Cửu Cửu Quy Nhất Đại Viên Giác)',
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudNovemtrigesimalLeafStudio() {
  const [selectedLeafIndex, setSelectedLeafIndex] = useState<number>(38)
  const [isAcousticHarmonics, setIsAcousticHarmonics] = useState<boolean>(false)
  const [brushPlaced, setBrushPlaced] = useState<boolean>(true)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc1056Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      try {
        osc528Ref.current?.stop()
        osc528Ref.current?.disconnect()
        osc1056Ref.current?.stop()
        osc1056Ref.current?.disconnect()
        gainRef.current?.disconnect()
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close()
        }
      } catch {
        // ignore
      }
    }
  }, [])

  const toggleSound = () => {
    if (!isAcousticHarmonics) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc1056Ref.current = osc2
        gainRef.current = gain
        setIsAcousticHarmonics(true)
      } catch (e) {
        console.error('AudioContext error:', e)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc1056Ref.current?.stop()
            osc1056Ref.current?.disconnect()
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
            }
            setIsAcousticHarmonics(false)
          }, 550)
        } catch {
          setIsAcousticHarmonics(false)
        }
      } else {
        setIsAcousticHarmonics(false)
      }
    }
  }

  return (
    <section className="relative w-full py-16 bg-stone-950 text-stone-100 overflow-hidden border-t border-b border-amber-900/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(217,119,6,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-amber-950/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Imperial Jade Calligraphy Atelier · Sprint 179
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-emerald-100 font-light tracking-wide">
              Kê Ngự Bút Sen Tam Thập Cửu Diệp 39 Cánh Phỉ Thúy Nẹp Vàng 24K Filigree
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-2xl font-light">
              Tuyệt phẩm phòng ngự thư: Búp sen 39 cánh ngọc Phỉ Thúy Type A thấu quang 99.99%, nẹp chỉ Vàng 24K Filigree 0.10mm, ngự trên bệ gỗ Mun Sừng Khánh Hòa Cổ Thụ 400 năm kết hợp hòa âm Bát Độ 528Hz & 1056Hz.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                isAcousticHarmonics
                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow-lg shadow-emerald-950/50'
                  : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:border-emerald-700/50'
              }`}
            >
              <svg className={`w-4 h-4 ${isAcousticHarmonics ? 'text-emerald-400 animate-spin' : 'text-stone-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M10 15V9l5 3-5 3z" />
              </svg>
              <span>{isAcousticHarmonics ? 'Bát Độ 528Hz & 1056Hz Đang Phát' : 'Khai Mở Bát Độ Thiền Định'}</span>
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual SVG */}
          <div className="lg:col-span-8 bg-stone-900/60 rounded-3xl border border-stone-800/80 p-6 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800/60 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Bệ Gỗ Mun Sừng Khánh Hòa 400 Năm · Mộng Nêm Không Đinh Sắt
              </span>
              <span>Đang Chiêm Ngưỡng: <strong className="text-emerald-300 font-semibold">{NOVEMTRIGESIMAL_LEAF_NAMES[selectedLeafIndex]}</strong></span>
            </div>

            {/* SVG Visual */}
            <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-stone-950 to-stone-900 rounded-2xl border border-stone-800/60 flex items-center justify-center p-6 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Wood Base (Bệ Gỗ Mun Sừng Khánh Hòa 400 Năm) */}
                <rect x="200" y="380" width="400" height="42" rx="8" fill="#1c1917" stroke="#44403c" strokeWidth="2" />
                <rect x="230" y="422" width="45" height="30" fill="#0c0a09" stroke="#44403c" strokeWidth="1.5" />
                <rect x="525" y="422" width="45" height="30" fill="#0c0a09" stroke="#44403c" strokeWidth="1.5" />
                <text x="400" y="406" fill="#fef3c7" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  Bệ Gỗ Mun Sừng Khánh Hòa Cổ Thụ 400 Năm (Mộng Cối Âm Dương)
                </text>

                {/* 39 Jade Lotus Leaves Arranged Radially */}
                <g transform="translate(400, 310)">
                  {Array.from({ length: 39 }).map((_, i) => {
                    const angle = (i * 360) / 39
                    const isSelected = i === selectedLeafIndex
                    return (
                      <g key={i} transform={`rotate(${angle}) translate(0, -75)`}>
                        <path
                          d="M 0 -35 C -15 -18, -12 18, 0 35 C 12 18, 15 -18, 0 -35 Z"
                          fill={isSelected ? "rgba(52, 211, 153, 0.95)" : "rgba(16, 185, 129, 0.45)"}
                          stroke={isSelected ? "#fbbf24" : "rgba(245, 158, 11, 0.6)"}
                          strokeWidth={isSelected ? "2.5" : "1.2"}
                        />
                        {/* Gold Filigree Vein Line */}
                        <line x1="0" y1="-28" x2="0" y2="28" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
                      </g>
                    )
                  })}

                  {/* Central Lotus Stamen / Jade Core */}
                  <circle cx="0" cy="0" r="32" fill="#047857" stroke="#fbbf24" strokeWidth="2" />
                  <circle cx="0" cy="0" r="22" fill="#065f46" stroke="#fef08a" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="10" fill="#f59e0b" />
                </g>

                {/* Imperial Calligraphy Brush Resting on Stand */}
                {brushPlaced && (
                  <motion.g
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Brush Shaft (Thân Bút Trúc Cổ Bọc Vàng) */}
                    <line x1="180" y1="210" x2="620" y2="330" stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
                    <line x1="180" y1="210" x2="620" y2="330" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
                    <line x1="280" y1="237" x2="330" y2="251" stroke="#fbbf24" strokeWidth="14" strokeLinecap="square" />

                    {/* Brush Nib (Đầu Lông Sói Ngự Thư Thoát Giọt Mực) */}
                    <path d="M 620 330 Q 660 342 670 350 Q 645 352 615 332 Z" fill="#1c1917" stroke="#44403c" strokeWidth="1" />
                    {/* Ink Drop Detail */}
                    <circle cx="674" cy="358" r="4" fill="#09090b" />
                  </motion.g>
                )}

                {/* Harmonic Resonance Ripples */}
                {isAcousticHarmonics && (
                  <motion.circle
                    cx="400"
                    cy="310"
                    r="90"
                    stroke="rgba(52,211,153,0.6)"
                    strokeWidth="1.5"
                    fill="none"
                    animate={{ scale: [1, 2.3], opacity: [0.8, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </svg>
            </div>

            {/* Interactive Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBrushPlaced(!brushPlaced)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-200 text-xs font-mono transition-colors"
                >
                  {brushPlaced ? 'Nhấc Ngự Bút (Khai Bút Thư Họa)' : 'Hạ Ngự Bút (Nghỉ Bút Tĩnh Tâm)'}
                </button>
                <button
                  onClick={() => setSelectedLeafIndex((prev) => (prev + 1) % 39)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-mono transition-colors"
                >
                  Chiêm Ngưỡng Cánh Sen Tiếp Theo ({selectedLeafIndex + 1}/39)
                </button>
              </div>

              {/* Angle Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span>Góc Thoát Mực:</span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-semibold">
                  15° Chuẩn Tuyệt Đối
                </span>
              </div>
            </div>
          </div>

          {/* Specifications Dossier */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-stone-900/70 rounded-3xl border border-stone-800/80 p-6 space-y-4">
              <h3 className="text-base font-serif text-emerald-200 flex items-center gap-2 border-b border-stone-800/80 pb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Hồ Sơ Kỹ Thuật Ngự Bút 39 Cánh
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-stone-500 block">Chất Liệu Ngọc:</span>
                  <span className="text-stone-200">{SPEC.jadeGrade}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Độ Thấu Quang Ngọc Tủy:</span>
                  <span className="text-emerald-300 font-semibold">{SPEC.translucency}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Kỹ Thuật Kim Hoàn:</span>
                  <span className="text-stone-200">{SPEC.goldFiligree}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Chất Liệu Bệ Đỡ:</span>
                  <span className="text-stone-200">{SPEC.woodBase}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Góc Nghiêng Phong Thủy:</span>
                  <span className="text-stone-200 font-serif">{SPEC.inclineAngle}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Tần Số Bát Độ Solfeggio:</span>
                  <span className="text-emerald-300 font-serif">{SPEC.acoustics}</span>
                </div>
              </div>
            </div>

            {/* GuHomes Handcraft Stamp */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-stone-900/60 to-stone-900/90 rounded-2xl border border-emerald-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-serif">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Bảo Chứng Nghệ Nhân GuHomes</span>
              </div>
              <p className="text-stone-300 text-xs font-light leading-relaxed">
                Từng cánh sen ngọc Phỉ Thúy được mài mờ vi mô và đan nẹp vàng 24K filigree bởi nghệ nhân kim hoàn bậc thầy tại xưởng Thạnh Xuân 1.200m², phục vụ giới tinh hoa yêu nghệ thuật thư pháp tĩnh tại, giới hạn 12 tác phẩm mỗi năm.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-emerald-950/60">
                <span>Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="text-emerald-300 font-serif hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudNovemtrigesimalLeafStudio;
