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
  jadeGrade: 'Ngọc Bích Phỉ Thúy Type A Myanmar tự nhiên thấu quang',
  translucency: '99.99% Thấu quang ngọc tủy thanh ngọc hoàng gia không tạp chất',
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 43 cánh tinh xảo',
  woodBase: 'Bệ Gỗ Mun Sừng Khánh Hòa Cổ Thụ 400 năm (Mộng cối âm dương kín khít)',
  inclineAngle: '15° Thoát giọt mực ngự bút thư pháp hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định Tinh Khiết)',
}

const TRIQUADRAGESIMAL_LEAF_NAMES = [
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
  'Diệp Tứ Thập (Tứ Quý Bình An Đại Cát Đại Lợi)',
  'Diệp Tứ Thập Nhất (Nhất Tâm Bất Thoái Chân Như Tối Thượng)',
  'Diệp Tứ Thập Nhị (Tứ Hải Giai Huynh Đệ Vạn Cát Tường)',
  'Diệp Tứ Thập Tam (Tam Giới Viên Dung Bất Hoại)',
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTriquadragesimalLeafStudio() {
  const [selectedLeafIndex, setSelectedLeafIndex] = useState<number>(42)
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
      } catch {
        setIsAcousticHarmonics(false)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc1056Ref.current?.stop()
            osc1056Ref.current?.disconnect()
            setIsAcousticHarmonics(false)
          }, 650)
        } catch {
          setIsAcousticHarmonics(false)
        }
      } else {
        setIsAcousticHarmonics(false)
      }
    }
  }

  return (
    <section className="relative w-full bg-[#070806] text-[#E7E3D8] py-20 px-4 sm:px-6 lg:px-12 border-b border-[#D4AF37]/25 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#059669]/10 via-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 text-xs uppercase tracking-widest text-[#6EE7B7] border border-[#10B981]/40 rounded-full mb-3 bg-[#0A1A14]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span>Văn Phòng Tứ Bảo · Nghệ Thuật Ngự Bút Hoàng Gia · GuHomes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F3EFE6] tracking-wide mb-3">
            Kê Ngự Bút Sen Tứ Thập Tam Diệp (43 Cánh Sen) Phỉ Thúy & Vàng 24K Filigree
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#ABA594] leading-relaxed">
            Tuyệt phẩm Văn Phòng Tứ Bảo được các nghệ nhân Thạnh Xuân chế tác từ Ngọc Bích Phỉ Thúy Type A, 43 cánh sen nẹp Vàng 24K Filigree đậu chỉ 0.10mm trên Bệ Gỗ Mun Sừng 400 năm tuổi.
          </p>
        </div>

        {/* Workspace Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Main Visual interactive area */}
          <div className="lg:col-span-7 bg-[#0E110E] border border-[#10B981]/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#10B981]/20">
              <span className="text-xs uppercase tracking-wider text-[#A7F3D0] font-mono">Bảo Vật Thư Phòng · Sen Tứ Thập Tam Diệp</span>
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#132A20] text-[#6EE7B7] border border-[#10B981]/40 font-mono">
                {TRIQUADRAGESIMAL_LEAF_NAMES[selectedLeafIndex]}
              </span>
            </div>

            {/* Interactive Brush Rest Stage */}
            <div className="relative h-72 sm:h-88 flex items-center justify-center bg-gradient-to-b from-[#131A15] to-[#080B09] rounded-xl border border-[#10B981]/20 overflow-hidden">
              {/* Refraction Caustics Background */}
              <div className="absolute inset-0 bg-radial from-[#34D399]/10 via-transparent to-transparent opacity-60" />

              {/* Jade Brush Rest Artifact Visual */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Ink Brush on Rest (Toggled) */}
                <AnimatePresence>
                  {brushPlaced && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, rotate: -15 }}
                      animate={{ opacity: 1, y: 0, rotate: -15 }}
                      exit={{ opacity: 0, y: -20, rotate: -15 }}
                      transition={{ duration: 0.4 }}
                      className="absolute -top-12 -left-10 z-30 pointer-events-none"
                    >
                      <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
                        {/* Brush Shaft */}
                        <line x1="10" y1="20" x2="180" y2="20" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
                        <line x1="12" y1="20" x2="40" y2="20" stroke="#D4AF37" strokeWidth="7" strokeLinecap="round" />
                        {/* Brush Tip */}
                        <path d="M180 20 C195 20 215 22 218 20 C215 18 195 20 180 20 Z" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
                      </svg>
                      <span className="text-[9px] text-[#D4AF37] font-mono tracking-wider ml-12 -mt-2 block">Ngự Bút Lông Lang Hào</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The 43-Petal Jade Lotus Rest */}
                <div className="relative w-52 sm:w-64 h-32 flex items-center justify-center">
                  {/* Lotus Mountain Peaks for Brush */}
                  <svg width="240" height="110" viewBox="0 0 240 110" fill="none" className="drop-shadow-[0_0_20px_rgba(52,211,153,0.35)]">
                    {/* Background petals */}
                    <path d="M40 85 C55 35 75 25 90 75" fill="#047857" opacity="0.6" stroke="#D4AF37" strokeWidth="1" />
                    <path d="M150 75 C165 25 185 35 200 85" fill="#047857" opacity="0.6" stroke="#D4AF37" strokeWidth="1" />
                    <path d="M90 75 C105 15 135 15 150 75" fill="#059669" opacity="0.8" stroke="#D4AF37" strokeWidth="1.2" />

                    {/* Foreground Triple Mountains Rest */}
                    <path d="M20 95 C45 60 65 50 85 95 C105 40 135 40 155 95 C175 50 195 60 220 95 Z" fill="url(#jadeGradient43)" stroke="#FEE588" strokeWidth="1.5" />

                    {/* Gold Filigree Veins */}
                    <path d="M85 95 C85 65 70 55 60 70" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="2,2" />
                    <path d="M120 95 C120 50 115 45 120 42" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3,2" />
                    <path d="M155 95 C155 65 170 55 180 70" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="2,2" />

                    <defs>
                      <linearGradient id="jadeGradient43" x1="20" y1="40" x2="220" y2="95" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#34D399" />
                        <stop offset="0.4" stopColor="#059669" />
                        <stop offset="0.8" stopColor="#065F46" />
                        <stop offset="1" stopColor="#044E39" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* 400-Year-Old Ebony (Gỗ Mun Sừng) Pedestal */}
                <div className="w-60 sm:w-72 h-9 bg-gradient-to-r from-[#171714] via-[#24241E] to-[#171714] border-t-2 border-[#D4AF37] rounded-md shadow-xl flex items-center justify-between px-3">
                  <span className="text-[10px] text-[#FBBF24] font-mono">BỆ GỖ MUN SỪNG 400 NĂM</span>
                  <span className="text-[10px] text-[#E7E3D8] font-mono">MỘNG ÂM DƯƠNG</span>
                </div>
              </div>
            </div>

            {/* Interactive Buttons */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setBrushPlaced(!brushPlaced)}
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    brushPlaced
                      ? 'bg-[#142B21] text-[#A7F3D0] border-[#10B981]'
                      : 'bg-[#181C18] text-[#D1D5DB] border-white/20 hover:border-[#10B981]'
                  }`}
                >
                  {brushPlaced ? 'Nhấc Ngự Bút Lên' : 'Hạ Ngự Bút Lên Đài Sen'}
                </button>

                <button
                  type="button"
                  onClick={toggleSound}
                  className={`min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-medium rounded-lg border transition-all flex items-center space-x-1.5 ${
                    isAcousticHarmonics
                      ? 'bg-[#2B2313] text-[#FBBF24] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-[#151915] text-[#9CA3AF] border-white/10 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M10 15l5-3-5-3v6z" />
                  </svg>
                  <span>{isAcousticHarmonics ? 'Hòa Âm 528Hz & 1056Hz (Bật)' : 'Phát 528Hz & 1056Hz'}</span>
                </button>
              </div>

              {/* Leaf Cycle Stepper */}
              <div className="flex items-center space-x-2 bg-[#121612] px-3 py-1.5 rounded-lg border border-[#10B981]/30">
                <span className="text-[11px] text-[#9CA3AF]">Cánh sen:</span>
                <button
                  type="button"
                  onClick={() => setSelectedLeafIndex((idx) => (idx > 0 ? idx - 1 : 42))}
                  className="min-h-[44px] min-w-[44px] px-2 py-1 text-xs text-[#6EE7B7] hover:bg-[#1B251F] rounded"
                  title="Cánh trước"
                >
                  ◀
                </button>
                <span className="text-xs font-mono text-[#FEE588] min-w-[28px] text-center">{selectedLeafIndex + 1}/43</span>
                <button
                  type="button"
                  onClick={() => setSelectedLeafIndex((idx) => (idx < 42 ? idx + 1 : 0))}
                  className="min-h-[44px] min-w-[44px] px-2 py-1 text-xs text-[#6EE7B7] hover:bg-[#1B251F] rounded"
                  title="Cánh sau"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Spec Sheet */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0D100D] border border-[#10B981]/30 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-serif text-[#6EE7B7] uppercase tracking-wider mb-3 pb-2 border-b border-[#10B981]/25 flex items-center justify-between">
                <span>Chỉ Số Giám Định Bảo Vật</span>
                <span className="text-[11px] text-[#A7F3D0] font-mono">GuHomes Atelier</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-start pb-2 border-b border-white/5">
                  <span className="text-[#8E9B92]">Phẩm cấp Phỉ Thúy:</span>
                  <span className="text-right text-[#A7F3D0] font-medium max-w-[200px]">{SPEC.jadeGrade}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[#8E9B92]">Độ thấu quang ngọc:</span>
                  <span className="text-[#34D399] font-mono font-bold">{SPEC.translucency}</span>
                </div>
                <div className="flex justify-between items-start pb-2 border-b border-white/5">
                  <span className="text-[#8E9B92]">Chỉ nẹp Filigree 24K:</span>
                  <span className="text-right text-[#FBBF24] font-medium max-w-[200px]">{SPEC.goldFiligree}</span>
                </div>
                <div className="flex justify-between items-start pb-2 border-b border-white/5">
                  <span className="text-[#8E9B92]">Bệ Gỗ Mun Sừng:</span>
                  <span className="text-right text-[#E5E1D5] font-medium max-w-[200px]">{SPEC.woodBase}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[#8E9B92]">Góc nghiêng thoát mực:</span>
                  <span className="text-[#60A5FA] font-mono">{SPEC.inclineAngle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8E9B92]">Tần số rung thanh tẩy:</span>
                  <span className="text-[#D4AF37] font-mono">{SPEC.acoustics}</span>
                </div>
              </div>
            </div>

            {/* Quiet Luxury Craftsmanship Note */}
            <div className="p-4 rounded-xl bg-[#090C09] border border-white/10 text-xs text-[#8E968E] leading-relaxed">
              <strong className="text-[#6EE7B7] font-serif block mb-1">Ý Niệm 43 Cánh Sen Tứ Thập Tam Diệp:</strong>
              43 cánh sen tượng trưng cho Tam Giới Viên Dung, dung dưỡng tâm thế an nhiên tự tại của bậc vương giả khi đặt bút định liệu sơn hà hoặc tạo tác di sản truyền đời.
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#0D100D] border border-[#10B981]/25 text-xs text-[#9CA3AF] gap-3">
          <div>
            <span className="text-[#6EE7B7] font-semibold">Tư Vấn Thiết Kế Văn Phòng Tứ Bảo:</span> Liên hệ trực tiếp KTS Trưởng GuHomes qua hotline <a href="tel:0368757916" className="text-[#6EE7B7] underline font-mono hover:text-[#A7F3D0]">0368 757 916</a> hoặc email <a href="mailto:guhomesvn@gmail.com" className="text-[#6EE7B7] underline hover:text-[#A7F3D0]">guhomesvn@gmail.com</a>.
          </div>
          <span className="text-[#8E968E] whitespace-nowrap">Chế tác giới hạn 12 bộ/năm</span>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTriquadragesimalLeafStudio
