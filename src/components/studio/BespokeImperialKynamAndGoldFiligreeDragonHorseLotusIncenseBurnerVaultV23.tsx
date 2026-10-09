'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KynamSpec {
  name: string
  origin: string
  resinDensity: string
  aromaProfile: string
  burnTemp: number
}

const KY_NAM_VARIETIES: KynamSpec[] = [
  {
    name: 'Bạch Kỳ Tiên Phước Cổ Mộc',
    origin: 'Đỉnh núi Tiên Phước, Quảng Nam',
    resinDensity: '99.98% chìm hoàn toàn trong nước',
    aromaProfile: 'Hương thanh khiết tuyệt đỉnh, ngọt sâu lắng đọng, hậu vị hoa linh lan & mật ngọt đại ngàn ngàn năm',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Đắk Hà Hóa Thạch',
    origin: 'Rừng nguyên sinh Đắk Hà, Kon Tum',
    resinDensity: '99.99% đặc quánh như hắc ngọc huyền bí',
    aromaProfile: 'Hương huyền diệu, đầm ấm thâm sơn & nốt trầm cổ tích ngàn năm tĩnh mịch uy nghiêm',
    burnTemp: 165,
  },
  {
    name: 'Thanh Kỳ Sa Thầy Lam Tủy',
    origin: 'Vườn quốc gia Chư Mom Ray, Sa Thầy',
    resinDensity: '99.95% thấu quang ánh lam ngọc kim tủy',
    aromaProfile: 'Hương vương giả quý phái, ngọt thanh cam thảo sơn lâm & nốt lan rừng thoang thoảng phiêu bồng',
    burnTemp: 145,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV23() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KY_NAM_VARIETIES[0]!)
  const [currentTemp, setCurrentTemp] = useState<number>(135)
  const [isIncenseActive, setIsIncenseActive] = useState<boolean>(false)
  const [isAudioHarmonics, setIsAudioHarmonics] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc741Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      try {
        osc528Ref.current?.stop()
        osc528Ref.current?.disconnect()
        osc741Ref.current?.stop()
        osc741Ref.current?.disconnect()
        gainRef.current?.disconnect()
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close()
        }
      } catch {
        // ignore on unmount
      }
    }
  }, [])

  const toggleSound = () => {
    if (!isAudioHarmonics) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        osc2.type = 'triangle'
        osc2.frequency.setValueAtTime(741, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc741Ref.current = osc2
        gainRef.current = gain
        setIsAudioHarmonics(true)
      } catch (err) {
        console.error('Audio Context Error:', err)
      }
    } else {
      try {
        if (gainRef.current && audioCtxRef.current) {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc741Ref.current?.stop()
            osc741Ref.current?.disconnect()
            gainRef.current?.disconnect()
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
            }
            setIsAudioHarmonics(false)
          }, 650)
        } else {
          setIsAudioHarmonics(false)
        }
      } catch {
        setIsAudioHarmonics(false)
      }
    }
  }

  return (
    <section className="relative w-full py-20 px-4 md:px-8 bg-gradient-to-b from-[#0c0906] via-[#150f0a] to-[#0c0906] text-amber-100/90 overflow-hidden border-t border-b border-amber-900/30">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-yellow-600/5 blur-[110px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-xs font-mono tracking-widest text-amber-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Kiệt Tác Đỉnh Lư Hoàng Gia V23 - Án Cẩm Lai Nam Bộ 400 Năm
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-amber-200 tracking-tight leading-snug">
            Đỉnh Lư Kim Long Mã Thập Nhị Tam Thế V23
          </h2>
          <p className="text-sm md:text-base text-amber-200/70 leading-relaxed font-light">
            Sự phối hợp tuyệt mỹ giữa Vàng 24K Filigree kéo sợi vi thêu 0.12mm hình Long Mã đạp hoa sen ngậm châu, bảo tháp Ngọc Bích Type A thấu quang và bệ án Gỗ Cẩm Lai Nam Bộ Cổ Thụ 400 năm kết mộng cối âm dương vững chãi vĩnh cửu.
          </p>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Display Center */}
          <div className="lg:col-span-7 bg-[#120d09]/90 border border-amber-700/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-4 mb-6">
              <span className="text-xs font-mono text-amber-400 tracking-wider">PHÒNG KHÁCH TRÀ ĐẠO HOÀNG GIA</span>
              <span className="text-xs font-mono text-amber-300/60 bg-amber-900/30 px-2.5 py-0.5 rounded border border-amber-800/40">
                GuHomes Mộng Cối Cẩm Lai 400 Năm
              </span>
            </div>

            {/* Incense Visual Artifact */}
            <div className="relative h-72 md:h-88 flex items-center justify-center bg-radial-gradient from-amber-900/30 to-transparent rounded-xl border border-amber-900/20 overflow-hidden">
              {/* Smoke simulation */}
              <AnimatePresence>
                {isIncenseActive && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{
                        opacity: [0.1, 0.65, 0.45, 0],
                        y: [-20, -110, -190],
                        scale: [0.9, 1.4, 2.1],
                        filter: ['blur(3px)', 'blur(10px)', 'blur(22px)'],
                      }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeOut' }}
                      className="w-16 h-40 bg-gradient-to-t from-amber-200/50 via-yellow-100/30 to-transparent rounded-full"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.7 }}
                      animate={{
                        opacity: [0.15, 0.55, 0.35, 0],
                        y: [-10, -100, -170],
                        scale: [0.8, 1.25, 1.9],
                        filter: ['blur(4px)', 'blur(12px)', 'blur(24px)'],
                      }}
                      transition={{ duration: 5.6, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
                      className="w-20 h-44 bg-gradient-to-t from-yellow-300/40 via-amber-200/20 to-transparent rounded-full"
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Incense Burner Silhouette Graphic */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-amber-400/60 bg-gradient-to-br from-amber-700/40 via-yellow-900/40 to-black/80 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.25)]">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-amber-300/70 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">LONG MÃ</span>
                    <span className="text-xs font-serif text-amber-100 font-bold">V23 KIM TỬ</span>
                    <span className="text-[9px] text-amber-400/80 font-mono mt-0.5">{currentTemp}°C</span>
                  </div>
                </div>
                {/* Stand */}
                <div className="w-40 md:w-48 h-5 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 rounded-t border-t border-amber-500/50 mt-1" />
                <div className="w-48 md:w-56 h-4 bg-[#23150d] rounded-b border border-amber-900/60 shadow-lg flex items-center justify-around px-4">
                  <span className="text-[8px] font-mono text-amber-500/60">GỖ CẨM LAI 400N</span>
                  <span className="text-[8px] font-mono text-amber-500/60">MỘNG CỐI ÂM DƯƠNG</span>
                </div>
              </div>

              {/* Heat Status Indicator */}
              <div className="absolute top-4 right-4 bg-black/60 px-3 py-1.5 rounded-lg border border-amber-600/30 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isIncenseActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-600'}`} />
                <span className="text-xs font-mono text-amber-300">
                  {isIncenseActive ? 'Đang Xông Trầm Điện Khí' : 'Trạng Thái Chờ Nhiệt'}
                </span>
              </div>
            </div>

            {/* Micro-Climate Control Dashboard */}
            <div className="mt-6 pt-6 border-t border-amber-900/30 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-amber-200/80 mb-2">
                  <span>VI ĐIỀU NHIỆT BẠCH KIM (80°C - 240°C)</span>
                  <span className="text-amber-400 font-bold">{currentTemp}°C</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={240}
                  step={1}
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-amber-950/60 rounded-lg cursor-pointer h-2 border border-amber-800/40"
                />
                <div className="flex justify-between text-[10px] font-mono text-amber-400/50 mt-1">
                  <span>80°C (Tiết Hương)</span>
                  <span>145°C (Kỳ Nam)</span>
                  <span>240°C (Đại Ngàn)</span>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsIncenseActive(!isIncenseActive)}
                    className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border ${
                      isIncenseActive
                        ? 'bg-amber-600 text-stone-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                        : 'bg-amber-950/60 text-amber-300 border-amber-800/50 hover:bg-amber-900/50'
                    }`}
                  >
                    {isIncenseActive ? 'DỪNG XÔNG TRẦM' : 'KÍCH HOẠT NHIỆT KHÍ'}
                  </button>

                  <button
                    onClick={toggleSound}
                    className={`min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border flex items-center justify-center gap-1.5 ${
                      isAudioHarmonics
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-black/40 text-amber-400/70 border-amber-900/40 hover:bg-amber-950/40'
                    }`}
                    title="Kích hoạt tần số Solfeggio 528Hz & 741Hz hòa âm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{isAudioHarmonics ? '528Hz + 741Hz BẬT' : 'HÒA ÂM 528Hz'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Kynam Selection and Specifications */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-serif text-amber-200 border-b border-amber-900/40 pb-2">
              Bộ Ba Tuyệt Phẩm Kỳ Nam Độc Bản
            </h3>

            <div className="space-y-3">
              {KY_NAM_VARIETIES.map((kynam) => {
                const isSelected = selectedKynam.name === kynam.name
                return (
                  <div
                    key={kynam.name}
                    onClick={() => {
                      setSelectedKynam(kynam)
                      setCurrentTemp(kynam.burnTemp)
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedKynam(kynam)
                        setCurrentTemp(kynam.burnTemp)
                      }
                    }}
                    className={`min-h-[44px] p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500/80 shadow-[0_0_20px_rgba(217,119,6,0.25)]'
                        : 'bg-[#140e0a]/60 border-amber-900/40 hover:border-amber-700/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif text-sm font-bold text-amber-200">{kynam.name}</span>
                      <span className="text-[11px] font-mono text-amber-400 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-700/30">
                        {kynam.burnTemp}°C Tối Ưu
                      </span>
                    </div>
                    <p className="text-xs text-amber-300/80 mb-1">
                      <strong className="text-amber-400/90 font-mono">Xuất xứ:</strong> {kynam.origin}
                    </p>
                    <p className="text-[11px] text-amber-200/60 leading-relaxed italic">
                      &quot;{kynam.aromaProfile}&quot;
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Artisan Commitment Card */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/30 space-y-2 mt-4 text-xs text-amber-200/70">
              <div className="font-mono text-amber-400 font-semibold uppercase text-[11px] tracking-wider">
                Quy Chuẩn Chế Tác GuHomes
              </div>
              <p>
                - Thân lư đồng cổ mạ Vàng 24K Filigree kéo sợi vi thêu 0.12mm hình tượng Long Mã cát tường.
              </p>
              <p>
                - Án gỗ Cẩm Lai Nam Bộ tuyển chọn thân lõi 400 năm, mộng cối mộng én truyền thống, không đinh ốc kim loại.
              </p>
              <p>
                - Xưởng may đo Thạnh Xuân 1.200m², giới hạn trần 12 kiệt tác/năm dưới sự giám sát trực tiếp của KTS Trưởng (Hotline: 0368 757 916).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV23
