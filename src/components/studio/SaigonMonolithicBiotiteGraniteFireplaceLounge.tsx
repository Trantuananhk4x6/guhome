'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FireplaceHeatMode {
  id: string
  name: string
  targetTempC: number
  humidityReduction: string
  infraredOutput: string
  fuelType: string
  description: string
}

const HEAT_MODES: FireplaceHeatMode[] = [
  {
    id: 'zen_warmth_24c',
    name: 'Giữ Ấm Tĩnh Lặng 24°C',
    targetTempC: 24,
    humidityReduction: 'Hạ ẩm từ 85% xuống 65%',
    infraredOutput: '450W Hồng Ngoại Dịu Nhẹ',
    fuelType: 'Lõi gốm phát xạ nano carbon',
    description: 'Nhiệt lượng tỏa nhẹ nhàng qua khối đá Biotite 520kg, giữ sàn gỗ Căm Xe luôn ấm áp khô ráo.'
  },
  {
    id: 'dehumidify_monsoon_27c',
    name: 'Xua Nồm Ẩm Gió Sông 27°C',
    targetTempC: 27,
    humidityReduction: 'Hạ ẩm từ 85% xuống 52%',
    infraredOutput: '850W Đối Lưu Nhiệt Chiều Đứng',
    fuelType: 'Hệ thống sưởi gốm & đối lưu tự nhiên',
    description: 'Ống khói đối lưu 1 chiều hút trọn hơi ẩm mùa mưa Sài Gòn đẩy ra ngoài, bảo tồn đồ gỗ nội thất quý.'
  },
  {
    id: 'agarwood_radiance_30c',
    name: 'Lửa Trầm Hồng Ngoại 30°C',
    targetTempC: 30,
    humidityReduction: 'Hạ ẩm từ 85% xuống 48%',
    infraredOutput: '1200W Bức Xạ Nhiệt Đá Núi',
    fuelType: 'Củi trầm hương & than đước không khói',
    description: 'Khói trầm thanh nhẹ quyện cùng hơi ấm đá granite ngàn năm tạo nên không gian tiếp khách vương giả.'
  }
]

const MINERAL_LAYERS = [
  {
    id: 'biotite_mica',
    name: 'Mica Đen Biotite (Phiến Ánh Kim)',
    proportion: '38%',
    property: 'Kháng nhiệt 900°C, giữ nhiệt âm 6 giờ sau khi tắt lò',
    color: '#1f2937'
  },
  {
    id: 'quartz_crystal',
    name: 'Thạch Anh Tinh Thể Khói (Smoky Quartz)',
    proportion: '32%',
    property: 'Độ cứng 7 Mohs, phát tán tia hồng ngoại xa bước sóng 8-14μm',
    color: '#4b5563'
  },
  {
    id: 'plagioclase_feldspar',
    name: 'Trường Thạch Plagioclase Trắng Sữa',
    proportion: '30%',
    property: 'Liên kết mạng tinh thể rắn chắc, chống rạn nứt nhiệt tuyệt đối',
    color: '#9ca3af'
  }
]

export function SaigonMonolithicBiotiteGraniteFireplaceLounge({ className = '' }: { className?: string }) {
  const [activeModeIndex, setActiveModeIndex] = useState(1) // Chế độ Xua Nồm Ẩm 27°C
  const [isFireSoundPlaying, setIsFireSoundPlaying] = useState(false)
  const [zoomLevel15x, setZoomLevel15x] = useState(false)
  const [selectedMineral, setSelectedMineral] = useState(0)
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [livingRoomArea, setLivingRoomArea] = useState('60-100m2')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const crackleTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      stopFireSound()
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
      }
    }
  }, [])

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Âm thanh lửa nổ tí tách (crackling fire) & gió sông rào rạt
  const startFireSound = () => {
    const ctx = initAudio()
    if (!ctx) return

    setIsFireSoundPlaying(true)

    // Tạo âm trầm nền của bếp lửa (warm low rumble)
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer
    noiseSource.loop = true

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(120, ctx.currentTime)
    bandpass.Q.setValueAtTime(1.5, ctx.currentTime)

    const rumbleGain = ctx.createGain()
    rumbleGain.gain.setValueAtTime(0.08, ctx.currentTime)

    noiseSource.connect(bandpass)
    bandpass.connect(rumbleGain)
    rumbleGain.connect(ctx.destination)
    noiseSource.start()

    // Tiếng nổ lách tách ngẫu nhiên của củi trầm (crackles / pops)
    const triggerCrackle = () => {
      if (!ctx || ctx.state === 'closed') return

      const now = ctx.currentTime
      const popOsc = ctx.createOscillator()
      const popGain = ctx.createGain()

      // Tần số nổ củi cao
      popOsc.type = 'triangle'
      popOsc.frequency.setValueAtTime(800 + Math.random() * 1400, now)
      popOsc.frequency.exponentialRampToValueAtTime(150, now + 0.035)

      popGain.gain.setValueAtTime(0.18 + Math.random() * 0.15, now)
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035)

      popOsc.connect(popGain)
      popGain.connect(ctx.destination)

      popOsc.start(now)
      popOsc.stop(now + 0.04)

      const nextInterval = 250 + Math.random() * 800
      crackleTimerRef.current = setTimeout(triggerCrackle, nextInterval)
    }

    triggerCrackle()
  }

  const stopFireSound = () => {
    if (crackleTimerRef.current) {
      clearTimeout(crackleTimerRef.current)
      crackleTimerRef.current = null
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    setIsFireSoundPlaying(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName.trim() || !consultPhone.trim()) return
    setSubmitted(true)
  }

  const currentMode = (HEAT_MODES[activeModeIndex] ?? HEAT_MODES[0]) as FireplaceHeatMode
  const currentMineral = (MINERAL_LAYERS[selectedMineral] ?? MINERAL_LAYERS[0]) as (typeof MINERAL_LAYERS)[number]

  return (
    <section className={cn('relative py-24 bg-[#0a0a0c] text-[#f3f4f6] overflow-hidden', className)}>
      {/* Background glow lò sưởi đá nguyên khối */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-20"
        style={{
          background: activeModeIndex === 0
            ? 'radial-gradient(circle at 60% 40%, rgba(245, 158, 11, 0.3) 0%, transparent 65%)'
            : activeModeIndex === 1
            ? 'radial-gradient(circle at 60% 40%, rgba(220, 38, 38, 0.35) 0%, transparent 65%)'
            : 'radial-gradient(circle at 60% 40%, rgba(180, 83, 9, 0.45) 0%, transparent 65%)'
        }}
      />

      <div className="relative mx-auto max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-950/30 text-xs font-mono tracking-wider uppercase text-red-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Kiến Trúc Sưởi Ấm & Kháng Nồm Ẩm Sài Gòn
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-[#fef2f2] leading-tight mb-6">
            Sảnh Sưởi Đá Hoa Cương Biotite Bình Định Nguyên Khối 520kg
          </h2>
          <p className="text-base md:text-lg text-[#9ca3af] font-light leading-relaxed">
            Kiến tạo tâm điểm không gian phòng khách biệt thự ven sông với khối đá hoa cương đen Biotite cổ
            khai thác thủ công tại Bình Định nặng hơn nửa tấn. Tỏa nhiệt hồng ngoại xa êm ái, cơ chế đối lưu
            khí tự nhiên một chiều hút sạch ẩm nồm mùa mưa, hạ độ ẩm nền nhà từ 85% xuống 52% hoàn hảo.
          </p>
        </div>

        {/* Grid 2 cột: Bộ điều nhiệt đối lưu & Kính soi tinh thể khoáng vật */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Cột trái: Điều khiển chế độ nhiệt & Biểu đồ hạ ẩm */}
          <div className="lg:col-span-7 bg-[#111217]/90 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <h3 className="text-xl font-serif text-[#fef2f2]">Hệ Thống Tỏa Nhiệt Hồng Ngoại Khối Đá</h3>
                <p className="text-xs font-mono text-[#9ca3af] mt-1">Điều hòa vi khí hậu - Tiêu chuẩn Quiet Luxury</p>
              </div>

              {/* Nút bật tắt âm thanh lửa nổ tí tách */}
              <button
                type="button"
                onClick={() => {
                  if (isFireSoundPlaying) stopFireSound()
                  else startFireSound()
                }}
                className={cn(
                  'px-4 py-2 rounded-lg text-xs font-mono tracking-wide transition-all border min-h-[44px]',
                  isFireSoundPlaying
                    ? 'bg-red-900/60 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'bg-white/5 text-[#d1d5db] border-white/10 hover:border-white/30'
                )}
              >
                Tiếng Lửa Củi Trầm: {isFireSoundPlaying ? 'ĐANG PHÁT ♫' : 'BẬT ÂM THANH'}
              </button>
            </div>

            {/* 3 Chế độ nhiệt độ */}
            <div className="space-y-4 mb-8">
              <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">
                Chọn Chế Độ Vận Hành Lò Sưởi:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HEAT_MODES.map((mode, idx) => {
                  const isSelected = activeModeIndex === idx
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveModeIndex(idx)}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all min-h-[80px]',
                        isSelected
                          ? 'border-red-500/80 bg-red-950/40 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                          : 'border-white/10 bg-white/5 text-[#9ca3af] hover:border-white/30'
                      )}
                    >
                      <div className="text-sm font-medium text-[#fef2f2]">{mode.name}</div>
                      <div className="text-lg font-serif text-red-400 mt-2">{mode.targetTempC}°C</div>
                      <div className="text-[11px] text-[#9ca3af] mt-1">{mode.humidityReduction}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Thẻ chi tiết hiệu năng vi khí hậu đang chọn */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/10 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-red-400 uppercase">Mô Tả Hiệu Quả Kháng Ẩm:</span>
                <span className="text-xs font-mono text-[#d1d5db]">{currentMode.infraredOutput}</span>
              </div>
              <p className="text-sm text-[#e5e7eb] leading-relaxed mb-4">
                {currentMode.description}
              </p>

              {/* Thanh đo mức hạ ẩm trực quan */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-[#9ca3af]">
                  <span>Độ ẩm ngoài trời nồm ẩm (85% RH)</span>
                  <span className="text-red-400">Độ ẩm sàn nhà ({activeModeIndex === 0 ? '65%' : activeModeIndex === 1 ? '52%' : '48%'} RH)</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-400 rounded-full"
                    animate={{ width: activeModeIndex === 0 ? '65%' : activeModeIndex === 1 ? '52%' : '48%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="text-[11px] text-[#6b7280] font-mono">
                  Ống khói đối lưu tự nhiên 1 chiều hút trọn khí ẩm đẩy ra ngoài sông Sài Gòn
                </div>
              </div>
            </div>

            {/* 3 Khoáng vật cấu thành khối đá Biotite */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs font-mono text-[#d1d5db] uppercase tracking-wider mb-4">
                Cấu Trúc Tinh Thể Khối Đá Biotite 520kg:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MINERAL_LAYERS.map((mineral, mIdx) => (
                  <button
                    key={mineral.id}
                    type="button"
                    onClick={() => setSelectedMineral(mIdx)}
                    className={cn(
                      'p-3.5 rounded-xl border text-left transition-all min-h-[44px]',
                      selectedMineral === mIdx
                        ? 'border-red-400 bg-white/10 text-white'
                        : 'border-white/10 bg-white/5 text-[#9ca3af] hover:border-white/20'
                    )}
                  >
                    <div className="text-xs font-medium text-[#fef2f2]">{mineral.name}</div>
                    <div className="font-mono text-[11px] text-red-400 mt-1">Tỷ lệ: {mineral.proportion}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải: Kính lúp 15x soi vân đá & Form tư vấn */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Kính lúp 15x mô phỏng bề mặt tinh thể mica ánh kim */}
            <div className="bg-[#111217]/90 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-serif text-[#fef2f2]">Kính Lúp Quang Học 15x</h4>
                <button
                  type="button"
                  onClick={() => setZoomLevel15x(!zoomLevel15x)}
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono text-[#e5e7eb] hover:bg-white/10 transition-all min-h-[44px]"
                >
                  {zoomLevel15x ? 'Thu Nhỏ (1x)' : 'Phóng Đại 15x'}
                </button>
              </div>

              {/* Khung mô phỏng bề mặt đá hoa cương Biotite */}
              <div className="relative h-48 rounded-xl overflow-hidden border border-white/15 bg-black/60 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-40"
                  animate={{ scale: zoomLevel15x ? 2.5 : 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="relative text-center p-4 z-10"
                  animate={{ scale: zoomLevel15x ? 1.15 : 1 }}
                >
                  <div className="w-12 h-12 mx-auto rounded-full border border-red-400/50 bg-red-950/40 flex items-center justify-center text-red-300 font-mono text-xs mb-2">
                    {zoomLevel15x ? '15x' : '1x'}
                  </div>
                  <div className="text-sm font-serif text-[#fef2f2]">{currentMineral.name}</div>
                  <div className="text-xs text-[#9ca3af] mt-1 max-w-xs">{currentMineral.property}</div>
                </motion.div>
              </div>
            </div>

            {/* Thông số kỹ thuật khối đá 520kg */}
            <div className="bg-[#111217]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef2f2] mb-4">Quy Chuẩn Chế Tác Đá Độc Bản</h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Trọng Lượng</div>
                  <div className="text-base font-serif text-red-400 mt-1">520 Kilogram</div>
                  <div className="text-[10px] text-[#6b7280]">Khối đặc không chắp vá</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Xuất Xứ Mỏ</div>
                  <div className="text-base font-serif text-red-400 mt-1">Bình Định Cổ</div>
                  <div className="text-[10px] text-[#6b7280]">Khai thác thủ công</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Bề Mặt Mài</div>
                  <div className="text-xs font-serif text-[#fef2f2] mt-1">Lộ Vân Tinh Thể</div>
                  <div className="text-[10px] text-[#6b7280]">Ánh kim tựa trời sao</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Giữ Nhiệt Sau Tắt</div>
                  <div className="text-xs font-serif text-[#fef2f2] mt-1">6 Giờ Liên Tục</div>
                  <div className="text-[10px] text-[#6b7280]">Tiết kiệm năng lượng</div>
                </div>
              </div>
            </div>

            {/* Form đăng ký may đo lò sưởi đá nguyên khối */}
            <div className="bg-gradient-to-br from-[#1a1212] to-[#111217] border border-red-500/30 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef2f2] mb-2">Tư Vấn May Đo Lò Sưởi Đá Biotite</h4>
              <p className="text-xs text-[#9ca3af] mb-4">
                KTS GuHomes trực tiếp đo đạc kết cấu sàn chịu lực và hướng gió thoát khói.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-center">
                  <p className="text-xs font-medium text-[#fef2f2]">Đã tiếp nhận yêu cầu!</p>
                  <p className="text-[11px] text-[#d1d5db] mt-1">
                    Đội ngũ kỹ thuật viên sẽ liên hệ khảo sát trong 24 giờ. Hotline: 0368 757 916.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên gia chủ..."
                      value={consultName}
                      onChange={e => setConsultName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef2f2] placeholder-white/40 focus:outline-none focus:border-red-400 min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại..."
                      value={consultPhone}
                      onChange={e => setConsultPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef2f2] placeholder-white/40 focus:outline-none focus:border-red-400 min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <select
                      value={livingRoomArea}
                      onChange={e => setLivingRoomArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef2f2] focus:outline-none focus:border-red-400 min-h-[44px]"
                    >
                      <option value="40-60m2" className="bg-[#111217]">Diện tích phòng khách: 40 - 60m²</option>
                      <option value="60-100m2" className="bg-[#111217]">Diện tích phòng khách: 60 - 100m²</option>
                      <option value="100m2+" className="bg-[#111217]">Biệt thự diện tích trên 100m²</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-red-700 hover:bg-red-600 text-white font-medium text-xs tracking-wide transition-all shadow-md min-h-[44px]"
                  >
                    Yêu Cầu Khảo Sát Kết Cấu Sàn & Thoát Gió
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Chân trang tiểu dự án */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-[#9ca3af] font-mono">
          <div>Xưởng chế tác đá và mộc GuHomes 1.200m² tại Thạnh Xuân, Q.12, TP. Hồ Chí Minh</div>
          <div className="mt-2 sm:mt-0">Hotline: 0368 757 916 - Email: guhomesvn@gmail.com</div>
        </div>
      </div>
    </section>
  )
}
