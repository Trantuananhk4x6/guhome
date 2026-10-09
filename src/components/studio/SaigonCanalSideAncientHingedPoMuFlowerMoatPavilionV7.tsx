'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PavilionSpec {
  timberAge: string
  bonsaiAge: string
  temperatureReduction: string
  relativeHumidity: string
  airflowVelocity: string
  acousticFrequency: string
}

const SPEC: PavilionSpec = {
  timberAge: '455 năm (Gỗ Pơ Mu Cổ Thụ Tây Bắc Vân Mây Óng Ả)',
  bonsaiAge: '465 năm (Bonsai Tùng La Hán Dáng Nghinh Phong Thác Đổ)',
  temperatureReduction: '-11.3°C (Thủy nhiệt vi khí hậu ven kênh Nhiêu Lộc)',
  relativeHumidity: '42% - 46% RH (Điều ẩm tự nhiên qua hào hoa súng tím)',
  airflowVelocity: '5.3 m/s (Gió đối lưu ven sông Sài Gòn luân chuyển)',
  acousticFrequency: '528Hz & 432Hz (Thanh âm thiền trà kép Solfeggio)',
}

export function SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV7() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(345)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [activeMoatLevel, setActiveMoatLevel] = useState<'low' | 'balanced' | 'high'>('balanced')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const oscHarmonicRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop()
          oscRef.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (oscHarmonicRef.current) {
        try {
          oscHarmonicRef.current.stop()
          oscHarmonicRef.current.disconnect()
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

  const toggleAcoustic = () => {
    if (!isAudioPlaying) {
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
        osc2.frequency.setValueAtTime(432, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        oscRef.current = osc1
        oscHarmonicRef.current = osc2
        gainRef.current = gain
        setIsAudioPlaying(true)
      } catch (e) {
        console.error('Web Audio API not supported:', e)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            oscRef.current?.stop()
            oscRef.current?.disconnect()
            oscHarmonicRef.current?.stop()
            oscHarmonicRef.current?.disconnect()
            gainRef.current?.disconnect()
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
            }
            setIsAudioPlaying(false)
          }, 650)
        } catch {
          setIsAudioPlaying(false)
        }
      } else {
        setIsAudioPlaying(false)
      }
    }
  }

  return (
    <section className="relative w-full py-20 px-4 md:px-8 bg-gradient-to-b from-[#0a0f0d] via-[#101b17] to-[#0a0f0d] text-emerald-100/90 overflow-hidden border-t border-b border-emerald-900/30">
      {/* Background ethereal atmospheric effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[650px] h-[350px] bg-emerald-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-xs font-mono tracking-widest text-emerald-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Kiệt Tác Vi Khí Hậu V7 - Thủy Đình Pơ Mu Tây Bắc 455 Năm
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-emerald-100 tracking-tight leading-snug">
            Thủy Đình Pơ Mu Tây Bắc &amp; Hào Bonsai Tùng La Hán V7
          </h2>
          <p className="text-sm md:text-base text-emerald-200/70 leading-relaxed font-light">
            Không gian thiền trà nổi ngự bên kênh rạch Sài Gòn, cấu tạo từ Gỗ Pơ Mu Cổ Thụ Tây Bắc 455 năm tuổi vân mây óng ả tỏa tinh dầu thơm nhẹ tự nhiên, bao bọc bởi hào hoa súng lọc nước và cổ mộc Bonsai Tùng La Hán 465 năm dáng nghinh phong trường tồn.
          </p>
        </div>

        {/* Visualizer & Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Display */}
          <div className="lg:col-span-7 bg-[#0d1612]/90 border border-emerald-700/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4 mb-6">
              <span className="text-xs font-mono text-emerald-400 tracking-wider">HỆ THỐNG BẢN LỀ THÔNG MINH VI KHÍ HẬU V7</span>
              <span className="text-xs font-mono text-emerald-300/60 bg-emerald-900/30 px-2.5 py-0.5 rounded border border-emerald-800/40">
                GuHomes Pơ Mu 455N - Tùng La Hán 465N
              </span>
            </div>

            {/* Micro-Climate Visual Simulation */}
            <div className="relative h-72 md:h-88 flex items-center justify-center bg-radial-gradient from-emerald-900/30 to-transparent rounded-xl border border-emerald-900/20 overflow-hidden">
              {/* Moat Water Ripple Effect */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-teal-950/60 via-emerald-950/30 to-transparent pointer-events-none flex items-end justify-center pb-2">
                <motion.div
                  animate={{
                    scaleX: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-8 bg-emerald-500/10 rounded-full blur-md"
                />
              </div>

              {/* Pavilion Core Structure */}
              <motion.div
                animate={{
                  rotateY: isOpenHinged ? 0 : 15,
                  scale: isOpenHinged ? 1 : 0.96,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Roof Ridge - Cổ Diềm Mái Gỗ Pơ Mu */}
                <div className="w-52 md:w-64 h-8 bg-gradient-to-b from-amber-900 via-yellow-950 to-stone-950 rounded-t-xl border-t border-amber-400/50 flex items-center justify-center shadow-lg">
                  <span className="text-[10px] font-mono text-amber-200 tracking-widest uppercase">PƠ MU TÂY BẮC 455N</span>
                </div>

                {/* 8-Hinged Shutter Windows Simulation */}
                <div className="w-60 md:w-72 h-36 border-2 border-emerald-600/40 bg-black/40 backdrop-blur-sm rounded-b-lg p-2 grid grid-cols-4 gap-1.5 shadow-2xl relative">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotateY: isOpenHinged ? -45 : 0,
                        opacity: isOpenHinged ? 0.75 : 0.95,
                      }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="h-full bg-gradient-to-b from-amber-950/80 via-yellow-950/70 to-stone-900/90 border border-amber-500/40 rounded flex flex-col items-center justify-between p-1 cursor-pointer"
                      onClick={() => setIsOpenHinged(!isOpenHinged)}
                    >
                      <div className="w-full h-0.5 bg-yellow-400/30" />
                      <span className="text-[8px] font-mono text-amber-300/80">Cánh {i + 1}</span>
                      <div className="w-full h-0.5 bg-yellow-400/30" />
                    </motion.div>
                  ))}
                </div>

                {/* Pavilion Foundation Stilt on Water */}
                <div className="w-48 h-6 bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950 rounded-b border-b border-amber-600/40 flex items-center justify-around px-2 text-[9px] font-mono text-amber-300/70">
                  <span>MỘNG ÂM DƯƠNG</span>
                  <span>HẠ -11.3°C</span>
                  <span>GIÓ 5.3 M/S</span>
                </div>
              </motion.div>

              {/* Canal Bonsai Accents */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 bg-black/60 p-2.5 rounded-lg border border-emerald-800/40 text-[11px] font-mono">
                <span className="text-emerald-400 font-semibold">CỔ MỘC BONSAI:</span>
                <span className="text-emerald-200">Tùng La Hán {SPEC.bonsaiAge}</span>
                <span className="text-emerald-300/60 text-[10px]">Tọa độ xoay: {bonsaiRotation}°</span>
              </div>
            </div>

            {/* Interactive Control Dashboard */}
            <div className="mt-6 pt-6 border-t border-emerald-900/30 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-emerald-200/80 mb-2">
                  <span>ĐIỀU HƯỚNG TẦM NHÌN BONSAI</span>
                  <span className="text-emerald-400 font-bold">{bonsaiRotation}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={5}
                  value={bonsaiRotation}
                  onChange={(e) => setBonsaiRotation(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-emerald-950/60 rounded-lg cursor-pointer h-2 border border-emerald-800/40"
                />
                <div className="flex justify-between text-[10px] font-mono text-emerald-400/50 mt-1">
                  <span>0° Kênh Nhiêu Lộc</span>
                  <span>180° Sông Sài Gòn</span>
                  <span>360° Đón Gió Nam</span>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpenHinged(!isOpenHinged)}
                    className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border ${
                      isOpenHinged
                        ? 'bg-emerald-600 text-stone-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50 hover:bg-emerald-900/50'
                    }`}
                  >
                    {isOpenHinged ? 'KHÉP BẢN LỀ 8 CÁNH' : 'MỞ TOÀN PHẦN ĐÓN GIÓ'}
                  </button>

                  <button
                    onClick={toggleAcoustic}
                    className={`min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border flex items-center justify-center gap-1.5 ${
                      isAudioPlaying
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-black/40 text-emerald-400/70 border-emerald-900/40 hover:bg-emerald-950/40'
                    }`}
                    title="Kích hoạt tần số 528Hz & 432Hz hòa âm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{isAudioPlaying ? '528Hz BẬT' : 'HÒA ÂM 528Hz'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications & GuHomes Norms */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-serif text-emerald-200 border-b border-emerald-900/40 pb-2">
              Thông Số Vi Khí Hậu Thủy Đình V7
            </h3>

            <div className="space-y-2 bg-[#0c1410]/60 border border-emerald-900/40 rounded-xl p-4 text-xs">
              <div className="flex justify-between py-1.5 border-b border-emerald-950">
                <span className="text-emerald-400/70 font-mono">Gỗ Cổ Thụ:</span>
                <span className="text-emerald-100 font-semibold">{SPEC.timberAge}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-950">
                <span className="text-emerald-400/70 font-mono">Cổ Mộc Bonsai:</span>
                <span className="text-emerald-100 font-semibold">{SPEC.bonsaiAge}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-950">
                <span className="text-emerald-400/70 font-mono">Hạ Nhiệt Thụ Động:</span>
                <span className="text-emerald-300 font-bold font-mono">{SPEC.temperatureReduction}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-950">
                <span className="text-emerald-400/70 font-mono">Độ Ẩm Tự Nhiên:</span>
                <span className="text-emerald-100 font-mono">{SPEC.relativeHumidity}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-950">
                <span className="text-emerald-400/70 font-mono">Tốc Độ Gió Đối Lưu:</span>
                <span className="text-emerald-300 font-bold font-mono">{SPEC.airflowVelocity}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-emerald-400/70 font-mono">Tần Số Hòa Âm:</span>
                <span className="text-emerald-100 font-mono">{SPEC.acousticFrequency}</span>
              </div>
            </div>

            {/* Water Moat Level Selector */}
            <div className="p-4 bg-emerald-950/30 border border-emerald-800/30 rounded-xl space-y-2">
              <div className="text-xs font-mono text-emerald-300 font-semibold uppercase">
                Mực Nước Hào Hoa Súng Thanh Lọc Khí:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'balanced', 'high'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveMoatLevel(lvl)}
                    className={`min-h-[44px] py-2 px-3 rounded-lg text-xs font-mono border transition-all ${
                      activeMoatLevel === lvl
                        ? 'bg-emerald-600/40 border-emerald-400 text-emerald-100 font-bold'
                        : 'bg-black/30 border-emerald-900/40 text-emerald-400/60 hover:text-emerald-300'
                    }`}
                  >
                    {lvl === 'low' ? 'Thủy Triều Xuống' : lvl === 'balanced' ? 'Cân Bằng Chuẩn' : 'Thủy Triều Lên'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-emerald-300/70 pt-1 leading-relaxed">
                Mực nước hào hoa súng tương tác với dòng chảy kênh rạch Sài Gòn giúp hạ nhiệt thụ động từ 9.9°C đến 11.3°C mà hoàn toàn không cần tiêu tốn năng lượng máy lạnh.
              </p>
            </div>

            {/* Atelier Contact & Strict Limits */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-800/40 space-y-1.5 text-xs text-emerald-200/70">
              <div className="font-mono text-emerald-300 font-semibold uppercase text-[11px] tracking-wider">
                Quy Chuẩn Chế Tác GuHomes
              </div>
              <p>
                - Xưởng may đo Thạnh Xuân 1.200m² gia công ngàm mộng âm dương không đinh ốc kim loại.
              </p>
              <p>
                - Giới hạn trần 12 công trình/năm đảm bảo KTS Trưởng trực tiếp giám sát từng chi tiết tinh xảo.
              </p>
              <p className="text-emerald-400 font-mono text-[11px] pt-1">
                Hotline KTS Trưởng: 0368 757 916 - Email: guhomesvn@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV7
