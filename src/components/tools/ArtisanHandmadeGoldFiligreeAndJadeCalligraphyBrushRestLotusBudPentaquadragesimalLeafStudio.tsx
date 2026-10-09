'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudPentaquadragesimalLeafStudio() {
  const [selectedPetal, setSelectedPetal] = useState<number>(45) // 45 leaves/petals - Cửu Ngũ Chí Tôn
  const [isAcousticHarmonics, setIsAcousticHarmonics] = useState(false)
  const [jadeTranslucency, setJadeTranslucency] = useState(99.99)
  const [brushPlaced, setBrushPlaced] = useState(true)

  // Web Audio Context & Nodes refs for thorough cleanup
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc1056Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (osc528Ref.current) {
        try {
          osc528Ref.current.stop()
          osc528Ref.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (osc1056Ref.current) {
        try {
          osc1056Ref.current.stop()
          osc1056Ref.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  const toggleAcousticHarmonics = () => {
    if (!isAcousticHarmonics) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime) // Solfeggio 528Hz

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime) // Bát độ 1056Hz

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
            <span>Văn Phòng Tứ Bảo Hoàng Triều · Cửu Ngũ Chí Tôn</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#F9F7F1] mb-4">
            Kê Ngự Bút Sen Tứ Thập Ngũ Diệp Trên Bệ Hoàng Đàn Tuyết 400 Năm
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#BFB8A7] font-light leading-relaxed">
            Tạo tác từ phiến Phỉ Thúy Type A tự nhiên thấu quang 99.99%, đan lồng 45 cánh sen tượng trưng cho Cửu Ngũ Chí Tôn bằng sợi vàng 24K filigree 0.10mm,
            ngự trên bệ gỗ Hoàng Đàn Tuyết Lạng Sơn 400 năm tuổi tỏa ngát tinh dầu thanh tịnh.
          </p>
        </div>

        {/* Studio Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Presentation */}
          <div className="lg:col-span-7 bg-[#0E130E]/90 border border-[#10B981]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#10B981]/20 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A9684] block">Quy Cách Cánh Sen</span>
                <span className="text-lg font-serif text-[#6EE7B7]">45 Cánh · Cửu Ngũ Chí Tôn</span>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-[#8A9684] block">Độ Thấu Quang Ngọc</span>
                <span className="text-lg font-mono text-[#D4AF37]">{jadeTranslucency}%</span>
              </div>
            </div>

            {/* Graphic Stage */}
            <div className="relative h-64 sm:h-80 w-full bg-[#060A06] rounded-xl border border-[#1B2B1B] flex items-center justify-center overflow-hidden">
              {/* Jade Emerald Aura */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#10B981]/15 via-transparent to-transparent pointer-events-none" />

              {/* Calligraphy Brush Rest Visual */}
              <div className="relative z-10 w-56 sm:w-68 h-44 sm:h-52 flex flex-col items-center justify-end">
                {/* Placed Brush Representation */}
                {brushPlaced && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="w-48 sm:w-60 h-3 bg-gradient-to-r from-[#2B1B0F] via-[#78350F] to-[#1C1917] rounded-full border border-[#D4AF37] shadow-lg mb-2 relative flex items-center justify-between px-2"
                  >
                    <span className="text-[8px] font-serif text-[#F3E5AB]">NGỰ BÚT LÔNG SÓI</span>
                    <span className="text-[8px] font-mono text-[#D4AF37]">NGHIÊNG 15°</span>
                  </motion.div>
                )}

                {/* Jade Lotus 45 Leaves Filigree */}
                <div className="w-40 sm:w-48 h-24 sm:h-28 bg-gradient-to-b from-[#0F382A] to-[#061A13] border-2 border-[#10B981] rounded-2xl relative flex flex-col items-center justify-center p-2 shadow-2xl">
                  <div className="absolute inset-1 border border-[#D4AF37]/50 rounded-xl" />
                  <span className="text-[10px] text-[#6EE7B7] font-serif uppercase tracking-widest text-center">
                    SEN BÚP PHỈ THÚY
                  </span>
                  <span className="text-[9px] font-mono text-[#FCD34D] mt-0.5">
                    {selectedPetal} CÁNH · VÀNG 24K FILIGREE
                  </span>
                </div>

                {/* Base Pedestal Hoàng Đàn Tuyết 400 Năm */}
                <div className="w-52 sm:w-60 h-8 bg-[#382618] border-t-2 border-[#D4AF37] rounded-b-md flex items-center justify-around text-[9px] text-[#F3E5AB] font-serif shadow-xl">
                  <span>HOÀNG ĐÀN TUYẾT LẠNG SƠN</span>
                  <span>400 NĂM</span>
                </div>
              </div>
            </div>

            {/* Translucency Slider */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-[#CBC3B0]">
                <span>Chuẩn Ngọc Type A (95%)</span>
                <span className="text-[#6EE7B7] font-medium">Thấu Quang Băng Ngọc: {jadeTranslucency}%</span>
                <span>Thấu Quang Tuyệt Đích (99.99%)</span>
              </div>
              <input
                type="range"
                min="95"
                max="99.99"
                step="0.01"
                value={jadeTranslucency}
                onChange={(e) => setJadeTranslucency(Number(e.target.value))}
                className="w-full h-2 bg-[#1B281B] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                aria-label="Điều chỉnh độ thấu quang ngọc Phỉ Thúy"
              />
            </div>
          </div>

          {/* Technical Specs & Controls */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Masterpiece Dossier */}
            <div className="bg-[#0E130E] border border-[#10B981]/25 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-[#6EE7B7] font-medium block mb-3">
                Quy Chuẩn Chế Tác Cung Đình
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#1B2B1B] pb-2">
                  <span className="text-[#8A9684]">Chất Ngọc:</span>
                  <span className="text-[#F9F7F1] font-medium">Phỉ Thúy Lão Khanh Type A Myanmar</span>
                </div>
                <div className="flex justify-between border-b border-[#1B2B1B] pb-2">
                  <span className="text-[#8A9684]">Chỉ Vàng Filigree:</span>
                  <span className="text-[#D4AF37] font-mono">Vàng 24K · Sợi kéo 0.10mm</span>
                </div>
                <div className="flex justify-between border-b border-[#1B2B1B] pb-2">
                  <span className="text-[#8A9684]">Bệ Đỡ Gỗ Quý:</span>
                  <span className="text-[#F9F7F1] font-medium">Hoàng Đàn Tuyết Lạng Sơn 400 Năm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A9684]">Góc Nghiêng Thoát Mực:</span>
                  <span className="text-[#6EE7B7] font-mono">15° Chuẩn Nghiên Học Cổ Truyền</span>
                </div>
              </div>
            </div>

            {/* Interaction Toggles */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={toggleAcousticHarmonics}
                className={`min-h-[44px] flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isAcousticHarmonics
                    ? 'border-[#6EE7B7] bg-[#6EE7B7]/15 text-[#6EE7B7] shadow-md shadow-[#6EE7B7]/10'
                    : 'border-[#10B981]/40 bg-[#0B150F] text-[#CBC3B0] hover:border-[#10B981]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                <span>{isAcousticHarmonics ? 'Hòa Âm 528Hz & 1056Hz Đang Ngân' : 'Kích Hoạt Hòa Âm 528Hz & 1056Hz'}</span>
              </button>

              <button
                type="button"
                onClick={() => setBrushPlaced(!brushPlaced)}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  brushPlaced
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                    : 'border-[#1B2B1B] bg-[#0B150F] text-[#8A9684] hover:border-[#D4AF37]/40'
                }`}
              >
                {brushPlaced ? 'Ngự Bút: Đang Kê' : 'Ngự Bút: Đang Cầm'}
              </button>
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-2 border-t border-[#10B981]/20 flex items-center justify-between text-xs text-[#8A9684]">
              <span>Tư vấn KTS Trưởng:</span>
              <a href="tel:0368757916" className="text-[#D4AF37] hover:underline font-mono font-medium">
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudPentaquadragesimalLeafStudio
