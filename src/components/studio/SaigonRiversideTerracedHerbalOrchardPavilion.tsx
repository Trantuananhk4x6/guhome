'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MedicinalHerb {
  id: string
  name: string
  scientificName: string
  therapeuticUse: string
  coolingEffect: string
  scentProfile: string
  icon: string
}

const NATIVE_HERBS: MedicinalHerb[] = [
  {
    id: 'ngai_cuu',
    name: 'Ngải Cứu Trắng Mộc Châu',
    scientificName: 'Artemisia vulgaris',
    therapeuticUse: 'Khử hàn, ấm kinh lạc, an thần cho giấc ngủ sâu, xua muỗi tự nhiên',
    coolingEffect: 'Tán lá nhung bạc phản xạ 85% bức xạ mặt trời gay gắt',
    scentProfile: 'Hương thơm nồng nàn cay nhẹ của tinh dầu thujone',
    icon: '🌿'
  },
  {
    id: 'sa_chanh',
    name: 'Sả Chanh Đất Đỏ Tây Nguyên',
    scientificName: 'Cymbopogon citratus',
    therapeuticUse: 'Kháng khuẩn đường hô hấp, thanh lọc không khí, xua đuổi côn trùng',
    coolingEffect: 'Tạo hàng rào sinh học cản gió nóng hướng Tây',
    scentProfile: 'Sắc thái sảng khoái mát lành của citral và geraniol',
    icon: '🌾'
  },
  {
    id: 'bac_ha',
    name: 'Bạc Hà Ngâm Sương Nam Bộ',
    scientificName: 'Mentha arvensis',
    therapeuticUse: 'Thông mũi mát họng, giải nhiệt độc mùa hè, sảng khoái tinh thần',
    coolingEffect: 'Bốc hơi tinh dầu menthol tạo cảm giác mát lạnh tức thì',
    scentProfile: 'Hương bạc hà the mát thanh lọc không gian sống',
    icon: '🍃'
  },
  {
    id: 'huong_nhu',
    name: 'Hương Nhu Tía Ven Sông',
    scientificName: 'Ocimum tenuiflorum',
    therapeuticUse: 'Trị cảm mạo nhiệt đới, dưỡng tóc và kích hoạt tuần hoàn mao mạch',
    coolingEffect: 'Thảm lá tía hấp thụ nhiệt lượng nền đá bazan',
    scentProfile: 'Hương thơm nồng ấm quý phái của eugenol tự nhiên',
    icon: '🌱'
  }
]

export function SaigonRiversideTerracedHerbalOrchardPavilion({ className = '' }: { className?: string }) {
  const [selectedHerbIndex, setSelectedHerbIndex] = useState(0)
  const [isNanoMistActive, setIsNanoMistActive] = useState(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [gardenArea, setGardenArea] = useState('50-100m2')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const cricketTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      stopBreezeAudio()
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

  // Âm thanh tiếng gió sông Sài Gòn & tiếng dế đêm 30dB
  const startBreezeAudio = () => {
    const ctx = initAudio()
    if (!ctx) return

    setIsAudioPlaying(true)

    // Âm nền tiếng gió sông luồn qua tán lá (pink noise qua filter chậm)
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer
    noiseSource.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(450, ctx.currentTime)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.05, ctx.currentTime)

    noiseSource.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noiseSource.start()

    // Tiếng dế đêm êm ả ngắt quãng
    const triggerCricket = () => {
      if (!ctx || ctx.state === 'closed') return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const cGain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(4600, now)

      cGain.gain.setValueAtTime(0.0001, now)
      cGain.gain.linearRampToValueAtTime(0.018, now + 0.04)
      cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

      osc.connect(cGain)
      cGain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.13)

      const nextTick = 1200 + Math.random() * 2000
      cricketTimerRef.current = setTimeout(triggerCricket, nextTick)
    }

    triggerCricket()
  }

  const stopBreezeAudio = () => {
    if (cricketTimerRef.current) {
      clearTimeout(cricketTimerRef.current)
      cricketTimerRef.current = null
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    setIsAudioPlaying(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName.trim() || !consultPhone.trim()) return
    setSubmitted(true)
  }

  const currentHerb = (NATIVE_HERBS[selectedHerbIndex] ?? NATIVE_HERBS[0]) as MedicinalHerb

  return (
    <section className={cn('relative py-24 bg-[#0a110e] text-[#f0fdf4] overflow-hidden', className)}>
      {/* Background radial gradient sắc xanh thảo mộc ngải cứu */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-25"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(34, 197, 94, 0.35) 0%, transparent 70%)'
        }}
      />

      <div className="relative mx-auto max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-xs font-mono tracking-wider uppercase text-emerald-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Vườn Thuốc Nam & Cảnh Quan Vi Khí Hậu Sông Nước
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-[#ecfdf5] leading-tight mb-6">
            Vườn Dược Liệu Bậc Thang Kè Đá Bazan Ven Sông Sài Gòn
          </h2>
          <p className="text-base md:text-lg text-[#94a3b8] font-light leading-relaxed">
            Kiến tạo cảnh quan trị liệu 3 tầng bậc thang kè đá bazan Đắk Nông tự chèn thoát nước mưa nhiệt đới.
            Thảm thảo mộc bản địa ngải cứu, sả chanh, bạc hà ngâm sương hấp thụ 88% bức xạ nhiệt, kết hợp
            giàn phun sương vi lượng nano hạ nhiệt độ vi khí hậu 4.8°C đón trọn làn gió trong lành từ sông.
          </p>
        </div>

        {/* Grid 2 cột: Bản đồ 4 loài thảo mộc & Hệ thống phun sương hạ nhiệt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Cột trái: Bộ 4 thảo mộc bản địa & Trình mô phỏng phun sương */}
          <div className="lg:col-span-7 bg-[#0f1a14]/90 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <h3 className="text-xl font-serif text-[#ecfdf5]">Bản Đồ Dược Liệu Trị Liệu Bản Địa</h3>
                <p className="text-xs font-mono text-[#94a3b8] mt-1">3 Tầng bậc thang đón gió sông - Giảm nhiệt 4.8°C</p>
              </div>

              {/* Nút bật tắt âm thanh gió sông & dế đêm */}
              <button
                type="button"
                onClick={() => {
                  if (isAudioPlaying) stopBreezeAudio()
                  else startBreezeAudio()
                }}
                className={cn(
                  'px-4 py-2 rounded-lg text-xs font-mono tracking-wide transition-all border min-h-[44px]',
                  isAudioPlaying
                    ? 'bg-emerald-900/60 text-emerald-200 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-white/5 text-[#cbd5e1] border-white/10 hover:border-emerald-500/40'
                )}
              >
                Gió Sông & Dế Đêm 30dB: {isAudioPlaying ? 'ĐANG PHÁT ♫' : 'BẬT ÂM THANH'}
              </button>
            </div>

            {/* Chọn 4 loài thảo mộc */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {NATIVE_HERBS.map((herb, hIdx) => {
                const isSelected = selectedHerbIndex === hIdx
                return (
                  <button
                    key={herb.id}
                    type="button"
                    onClick={() => setSelectedHerbIndex(hIdx)}
                    className={cn(
                      'p-4 rounded-xl border text-left transition-all min-h-[80px]',
                      isSelected
                        ? 'border-emerald-400 bg-emerald-950/40 text-white shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                        : 'border-white/10 bg-white/5 text-[#94a3b8] hover:border-white/30'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{herb.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-[#ecfdf5]">{herb.name}</div>
                        <div className="text-[11px] font-mono text-emerald-400 italic">{herb.scientificName}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Chi tiết loài thảo mộc đang chọn */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-emerald-400 uppercase">Công Dụng Dược Liệu:</span>
                <span className="text-xs font-mono text-[#cbd5e1]">{currentHerb.scentProfile}</span>
              </div>
              <p className="text-sm text-[#e2e8f0] leading-relaxed mb-4">
                {currentHerb.therapeuticUse}
              </p>
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300">
                <span className="font-mono font-medium">Tác động vi khí hậu: </span>
                <span>{currentHerb.coolingEffect}</span>
              </div>
            </div>

            {/* Điều khiển hệ thống phun sương nano */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
              <div>
                <div className="font-mono text-[#ecfdf5] font-medium">Giàn Phun Sương Nano Vi Lượng</div>
                <div className="text-[#94a3b8] mt-0.5">Giữ ẩm thảo mộc và hạ nhiệt luồng gió sông ban trưa</div>
              </div>
              <button
                type="button"
                onClick={() => setIsNanoMistActive(!isNanoMistActive)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg border font-mono transition-all min-h-[36px]',
                  isNanoMistActive
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-white/10 text-[#94a3b8] border-white/20'
                )}
              >
                {isNanoMistActive ? 'ĐANG PHUN SƯƠNG (-4.8°C)' : 'TẮT PHUN SƯƠNG'}
              </button>
            </div>
          </div>

          {/* Cột phải: Chỉ số vi khí hậu & Form tư vấn */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bộ đo vi khí hậu thời gian thực */}
            <div className="bg-[#0f1a14]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#ecfdf5] mb-4">Hiệu Suất Làm Mát Vi Khí Hậu</h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Hạ Nhiệt Độ Sân</div>
                  <div className="text-xl font-serif text-emerald-400 mt-1">
                    {isNanoMistActive ? '-4.8°C' : '-2.4°C'}
                  </div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">Thảm thảo mộc cản nhiệt</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Hấp Thụ Bức Xạ</div>
                  <div className="text-xl font-serif text-emerald-400 mt-1">88%</div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">Triệt tiêu nắng gắt Tây</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Kè Đá Bazan</div>
                  <div className="text-sm font-serif text-[#ecfdf5] mt-1">Đắk Nông Xếp Khan</div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">Tự chèn thoát nước mưa</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Độ Ẩm Gió Sông</div>
                  <div className="text-sm font-serif text-[#ecfdf5] mt-1">58% - 65% RH</div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">Mát lành tự nhiên</div>
                </div>
              </div>
            </div>

            {/* Thông số kết cấu 3 tầng bậc thang */}
            <div className="bg-[#0f1a14]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#ecfdf5] mb-4">Cấu Trúc 3 Tầng Kè Đá Bazan</h4>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/10">
                  <span className="text-[#94a3b8]">Tầng 1 (Sát Mép Nước)</span>
                  <span className="text-emerald-300">Cỏ vetiver & Hương nhu cản xói lở</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/10">
                  <span className="text-[#94a3b8]">Tầng 2 (Lối Đi Dạo)</span>
                  <span className="text-emerald-300">Đá cuội suối chà nhám chống rêu</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/10">
                  <span className="text-[#94a3b8]">Tầng 3 (Sân Thưởng Trà)</span>
                  <span className="text-emerald-300">Vọng lâu ngải cứu & sả chanh ngát hương</span>
                </div>
              </div>
            </div>

            {/* Form đăng ký may đo cảnh quan vườn dược liệu */}
            <div className="bg-gradient-to-br from-[#12281b] to-[#0f1a14] border border-emerald-500/30 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#ecfdf5] mb-2">Tư Vấn Vườn Dược Liệu Ven Sông</h4>
              <p className="text-xs text-[#94a3b8] mb-4">
                KTS Cảnh Quan GuHomes trực tiếp khảo sát hướng nắng và kiểm tra độ ổn định bờ kè sông.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-400/50 text-center">
                  <p className="text-xs font-medium text-[#ecfdf5]">Đã tiếp nhận yêu cầu!</p>
                  <p className="text-[11px] text-[#cbd5e1] mt-1">
                    KTS GuHomes sẽ liên hệ gửi phương án trong 24 giờ. Hotline: 0368 757 916.
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#ecfdf5] placeholder-white/40 focus:outline-none focus:border-emerald-400 min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại liên hệ..."
                      value={consultPhone}
                      onChange={e => setConsultPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#ecfdf5] placeholder-white/40 focus:outline-none focus:border-emerald-400 min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <select
                      value={gardenArea}
                      onChange={e => setGardenArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#ecfdf5] focus:outline-none focus:border-emerald-400 min-h-[44px]"
                    >
                      <option value="30-50m2" className="bg-[#0f1a14]">Diện tích vườn: 30 - 50m²</option>
                      <option value="50-100m2" className="bg-[#0f1a14]">Diện tích vườn: 50 - 100m²</option>
                      <option value="100m2+" className="bg-[#0f1a14]">Biệt thự sân vườn trên 100m²</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs tracking-wide transition-all shadow-md min-h-[44px]"
                  >
                    Yêu Cầu Khảo Sát Kè Đá & Vi Khí Hậu
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Chân trang tiểu dự án */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-[#94a3b8] font-mono">
          <div>Xưởng chế tác đá và cảnh quan GuHomes 1.200m² tại Thạnh Xuân, Q.12, TP. Hồ Chí Minh</div>
          <div className="mt-2 sm:mt-0">Hotline: 0368 757 916 - Email: guhomesvn@gmail.com</div>
        </div>
      </div>
    </section>
  )
}
