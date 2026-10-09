'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV40() {
  const [temperature, setTemperature] = useState(135) // 80°C to 240°C
  const [selectedKynam, setSelectedKynam] = useState<'bachKy' | 'hacKy' | 'huynhKy'>('bachKy')
  const [isAudioResonance, setIsAudioResonance] = useState(false)
  const [isIncenseActive, setIsIncenseActive] = useState(true)

  // Web Audio Context & Nodes refs for thorough cleanup
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc741Ref = useRef<OscillatorNode | null>(null)
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
      if (osc741Ref.current) {
        try {
          osc741Ref.current.stop()
          osc741Ref.current.disconnect()
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

  const toggleHarmonics = () => {
    if (!isAudioResonance) {
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
        osc2.frequency.setValueAtTime(741, ctx.currentTime) // Solfeggio 741Hz (Trực giác & Thức tỉnh)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc741Ref.current = osc2
        gainRef.current = gain
        setIsAudioResonance(true)
      } catch {
        setIsAudioResonance(false)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc741Ref.current?.stop()
            osc741Ref.current?.disconnect()
            setIsAudioResonance(false)
          }, 650)
        } catch {
          setIsAudioResonance(false)
        }
      } else {
        setIsAudioResonance(false)
      }
    }
  }

  const kynamDetails = {
    bachKy: {
      name: 'Bạch Kỳ Vạn Giã Cổ Mộc 530 Năm',
      density: '99.98% chìm nước',
      origin: 'Vạn Ninh · Khánh Hòa',
      profile: 'Ngọt thanh hương sen trắng bách diệp, mật ong rừng nguyên sinh và cỏ thơm sương sớm.',
      recommendedTemp: 135,
    },
    hacKy: {
      name: 'Hắc Kỳ Trà Bồng Hóa Thạch 630 Năm',
      density: '99.99% đặc quánh như hắc ngọc',
      origin: 'Trà Bồng · Quảng Ngãi',
      profile: 'Hương trầm tích đại ngàn nguyên sinh, nốt cay nồng quý phái và khói mỏng lưu hương 72 giờ.',
      recommendedTemp: 165,
    },
    huynhKy: {
      name: 'Huỳnh Kỳ Tiên Phước Hoàng Kim 480 Năm',
      density: '99.96% ánh vàng kim tủy',
      origin: 'Tiên Phước · Quảng Nam',
      profile: 'Vương giả quyền quý, thoang thoảng quế rừng Trường Sơn và gỗ tuyết tùng ngàn năm.',
      recommendedTemp: 148,
    },
  }

  const currentKynam = kynamDetails[selectedKynam]

  return (
    <section className="relative w-full bg-[#0A0707] text-[#EDE7E2] py-20 px-4 sm:px-6 lg:px-12 border-b border-[#D4AF37]/25 overflow-hidden">
      {/* Background warm ember glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#7A1D1D]/15 via-[#3D0A0A]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 text-xs uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/40 rounded-full mb-3 bg-[#1A0E0E]/80">
            <span>Bảo Thất Ngự Hương Hoàng Triều · Thế Hệ V40</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#FAF8F5] mb-4">
            Đỉnh Lư Kim Long Mã Đạp Sen V40 Trên Án Trắc Đỏ 400 Năm
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#C2B7AE] font-light leading-relaxed">
            Tuyệt tác ngự đỉnh vàng 24K filigree sợi 0.08mm hình tượng Kim Long Mã Đạp Sen Thập Nhị Tứ Thập Thế V40,
            ngự trên án thư gỗ Trắc Đỏ Nam Bộ cổ thụ bốn thế kỷ, kết hợp công nghệ vi điều nhiệt bảo tồn trọn vẹn vi hương Kỳ Nam.
          </p>
        </div>

        {/* Interactive Masterpiece Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Display Card */}
          <div className="lg:col-span-7 bg-[#140C0C]/90 border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#A8988D] block">Vật Liệu Án Thư</span>
                <span className="text-lg font-serif text-[#D4AF37]">Gỗ Trắc Đỏ Nam Bộ Cổ Thụ 400 Năm</span>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-[#A8988D] block">Nhiệt Vi Điều Điện Trở</span>
                <span className="text-lg font-mono text-[#F87171]">{temperature}°C / 240°C</span>
              </div>
            </div>

            {/* Incense Burner Art Showcase */}
            <div className="relative h-64 sm:h-80 w-full bg-[#0A0505] rounded-xl border border-[#3A1818] flex items-center justify-center overflow-hidden">
              {/* Incense Smoke Ambient */}
              {isIncenseActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{
                      y: [-10, -50, -90],
                      opacity: [0, 0.45, 0],
                      scale: [0.8, 1.2, 1.6],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.5,
                      ease: 'easeOut',
                    }}
                    className="w-16 h-28 bg-gradient-to-t from-[#D4AF37]/20 via-[#F87171]/10 to-transparent blur-xl rounded-full"
                  />
                </div>
              )}

              {/* Incense Burner Illustration */}
              <div className="relative z-10 w-52 sm:w-64 h-48 sm:h-56 flex flex-col items-center justify-end">
                {/* Crown Filigree Dragon Horse Finial */}
                <div className="w-12 h-10 border border-[#D4AF37] rounded-t-full bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] flex items-center justify-center text-[8px] font-mono text-[#4A2600] font-bold shadow-md">
                  V40
                </div>

                {/* Lotus Petal Burner Chamber */}
                <div className="w-36 sm:w-44 h-24 sm:h-28 bg-gradient-to-b from-[#2B1313] to-[#120707] border-2 border-[#D4AF37] rounded-3xl relative flex flex-col items-center justify-center p-2 shadow-2xl">
                  <div className="absolute inset-1 border border-[#D4AF37]/30 rounded-2xl" />
                  <span className="text-[10px] text-[#D4AF37] font-serif uppercase tracking-widest mb-1">
                    KIM LONG MÃ · ĐẠP SEN
                  </span>
                  <span className="text-[9px] font-mono text-[#FCA5A5]">
                    {temperature}°C · {currentKynam.density}
                  </span>
                </div>

                {/* Altar Pedestal Trắc Đỏ 400 Năm */}
                <div className="w-48 sm:w-56 h-8 bg-[#4A1515] border-t-2 border-[#D4AF37]/80 rounded-b-md flex items-center justify-around text-[9px] text-[#F3E5AB] font-serif shadow-xl">
                  <span>TRẮC ĐỎ NAM BỘ</span>
                  <span>400 NĂM</span>
                </div>
              </div>
            </div>

            {/* Micro Temperature Slider */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-[#D8CDC4]">
                <span>Tỏa Hương Dịu (80°C)</span>
                <span className="text-[#D4AF37] font-medium">Vi Điều Nhiệt Chuẩn Xác: {temperature}°C</span>
                <span>Thăng Hoa Tuyệt Đối (240°C)</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-[#2B1212] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                aria-label="Điều chỉnh nhiệt độ vi lượng xông Kỳ Nam"
              />
            </div>
          </div>

          {/* Kynam Selection & Technical Specification */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Kynam Selector */}
            <div className="bg-[#140C0C] border border-[#D4AF37]/25 rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-medium">Tam Phẩm Kỳ Nam Ngự Phẩm</span>
                <span className="text-xs font-mono text-[#A8988D]">Thượng Tuyển</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedKynam('bachKy')
                    setTemperature(kynamDetails.bachKy.recommendedTemp)
                  }}
                  className={`min-h-[44px] px-2 py-2 text-xs rounded-lg border transition-all ${
                    selectedKynam === 'bachKy'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FAF8F5] font-medium'
                      : 'border-[#3A1818] text-[#A8988D] hover:border-[#D4AF37]/40'
                  }`}
                >
                  Bạch Kỳ 530N
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedKynam('hacKy')
                    setTemperature(kynamDetails.hacKy.recommendedTemp)
                  }}
                  className={`min-h-[44px] px-2 py-2 text-xs rounded-lg border transition-all ${
                    selectedKynam === 'hacKy'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FAF8F5] font-medium'
                      : 'border-[#3A1818] text-[#A8988D] hover:border-[#D4AF37]/40'
                  }`}
                >
                  Hắc Kỳ 630N
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedKynam('huynhKy')
                    setTemperature(kynamDetails.huynhKy.recommendedTemp)
                  }}
                  className={`min-h-[44px] px-2 py-2 text-xs rounded-lg border transition-all ${
                    selectedKynam === 'huynhKy'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FAF8F5] font-medium'
                      : 'border-[#3A1818] text-[#A8988D] hover:border-[#D4AF37]/40'
                  }`}
                >
                  Huỳnh Kỳ 480N
                </button>
              </div>

              {/* Selected Kynam Dossier */}
              <div className="border-t border-[#3A1818] pt-3 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#A8988D]">Xuất xứ:</span>
                  <span className="text-[#FAF8F5] font-medium">{currentKynam.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A8988D]">Tỷ trọng:</span>
                  <span className="text-[#FCA5A5] font-mono">{currentKynam.density}</span>
                </div>
                <p className="text-[#C2B7AE] italic pt-1 leading-relaxed">{currentKynam.profile}</p>
              </div>
            </div>

            {/* Soundscape & Chamber Toggles */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={toggleHarmonics}
                className={`min-h-[44px] flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isAudioResonance
                    ? 'border-[#F87171] bg-[#F87171]/15 text-[#F87171] shadow-md shadow-[#F87171]/10'
                    : 'border-[#D4AF37]/40 bg-[#1A0E0E] text-[#D8CDC4] hover:border-[#D4AF37]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                <span>{isAudioResonance ? 'Hòa Âm 528Hz & 741Hz Đang Ngân' : 'Kích Hoạt Hòa Âm 528Hz & 741Hz'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsIncenseActive(!isIncenseActive)}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isIncenseActive
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                    : 'border-[#3A1818] bg-[#1A0E0E] text-[#A8988D] hover:border-[#D4AF37]/40'
                }`}
              >
                {isIncenseActive ? 'Làn Khói Trầm: BẬT' : 'Làn Khói Trầm: TẮT'}
              </button>
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#A8988D]">
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

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV40
