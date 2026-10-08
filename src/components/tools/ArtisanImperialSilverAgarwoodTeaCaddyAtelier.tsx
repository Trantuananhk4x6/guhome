'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CaddyCapacityOption {
  id: string
  name: string
  teaCapacity: string
  dimensions: string
  silverWeightTa: string
  agarwoodLining: string
}

const CADDY_CAPACITIES: CaddyCapacityOption[] = [
  {
    id: 'tieu-hu-100g',
    name: 'Tiểu Hũ Hoàng Cung (100g Trà)',
    teaCapacity: '100g Trà Shan Tuyết Cổ Thụ',
    dimensions: 'Đường kính 9.5cm × Cao 13.5cm',
    silverWeightTa: '12 Lượng Bạc Ta 999',
    agarwoodLining: 'Lõi trầm rục dày 4.5mm'
  },
  {
    id: 'trung-hu-250g',
    name: 'Trung Hũ Ngự Dụng (250g Trà)',
    teaCapacity: '250g Trà Long Tỉnh / Trà Ô Long',
    dimensions: 'Đường kính 12.5cm × Cao 17.5cm',
    silverWeightTa: '22 Lượng Bạc Ta 999',
    agarwoodLining: 'Lõi trầm rục dày 6.0mm'
  },
  {
    id: 'dai-hu-500g',
    name: 'Đại Hũ Bảo Khố (500g Trà)',
    teaCapacity: '500g Trà Cổ Thụ Ngàn Năm',
    dimensions: 'Đường kính 16.0cm × Cao 22.5cm',
    silverWeightTa: '38 Lượng Bạc Ta 999',
    agarwoodLining: 'Lõi trầm rục dày 8.0mm'
  }
]

const CARVING_MOTIFS = [
  {
    id: 'tu-quy-binh-an',
    name: 'Tứ Quý Tùng Cúc Trúc Mai',
    style: 'Chạm lộng nổi 3D thủ công',
    meaning: 'Bốn mùa trường thọ, thanh nhã và thịnh vượng vững bền'
  },
  {
    id: 'tu-linh-chau-nguyet',
    name: 'Tứ Linh Long Lân Quy Phụng',
    style: 'Khắc tỉa chạm chìm cổ truyền',
    meaning: 'Quyền uy bảo hộ, trấn trạch và thu hút linh khí đất trời'
  },
  {
    id: 'lien-hoa-thien-tam',
    name: 'Liên Hoa Thiền Tâm',
    style: 'Gò tay cánh sen nở bung',
    meaning: 'Tâm an tĩnh lặng, ngát hương sắc tinh khôi giữa cõi đời'
  }
]

export function ArtisanImperialSilverAgarwoodTeaCaddyAtelier({ className = '' }: { className?: string }) {
  const [selectedCapacityIndex, setSelectedCapacityIndex] = useState(1) // Trung Hũ 250g
  const [selectedMotifIndex, setSelectedMotifIndex] = useState(0) // Tứ Quý
  const [isLidSealed, setIsLidSealed] = useState(true)
  const [isZoomActive, setIsZoomActive] = useState(false)
  const [sealEraText, setSealEraText] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
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

  // Âm thanh nắp hũ bạc mở chân không khẽ hiss/pop & tiếng ngân bạc ta
  const playVacuumSealAudio = (sealing: boolean) => {
    const ctx = initAudio()
    if (!ctx) return

    const now = ctx.currentTime

    // 1. Tiếng xì hút chân không (Vacuum hiss/pop)
    const bufferSize = ctx.sampleRate * 0.15
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(sealing ? 1800 : 2600, now)
    bandpass.Q.setValueAtTime(4.0, now)

    const hissGain = ctx.createGain()
    hissGain.gain.setValueAtTime(0.001, now)
    hissGain.gain.linearRampToValueAtTime(0.08, now + 0.02)
    hissGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)

    noise.connect(bandpass)
    bandpass.connect(hissGain)
    hissGain.connect(ctx.destination)
    noise.start(now)

    // 2. Tiếng ngân bạc 999 trong trẻo
    const silverOsc = ctx.createOscillator()
    const silverGain = ctx.createGain()
    silverOsc.type = 'sine'
    silverOsc.frequency.setValueAtTime(sealing ? 1650 : 2100, now + 0.04)

    silverGain.gain.setValueAtTime(0.001, now + 0.04)
    silverGain.gain.linearRampToValueAtTime(0.12, now + 0.06)
    silverGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7)

    silverOsc.connect(silverGain)
    silverGain.connect(ctx.destination)
    silverOsc.start(now + 0.04)
    silverOsc.stop(now + 0.7)
  }

  const toggleSeal = () => {
    const nextState = !isLidSealed
    setIsLidSealed(nextState)
    playVacuumSealAudio(nextState)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName.trim() || !customerPhone.trim()) return
    setSubmitted(true)
  }

  const currentCapacity = (CADDY_CAPACITIES[selectedCapacityIndex] ?? CADDY_CAPACITIES[0]) as CaddyCapacityOption
  const currentMotif = (CARVING_MOTIFS[selectedMotifIndex] ?? CARVING_MOTIFS[0]) as (typeof CARVING_MOTIFS)[number]

  return (
    <section className={cn('relative py-24 bg-[#0c0d11] text-[#f8fafc] overflow-hidden', className)}>
      {/* Background glow ánh bạc và trầm hương rục */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 25%, rgba(226, 232, 240, 0.3) 0%, rgba(180, 83, 9, 0.25) 50%, transparent 70%)'
        }}
      />

      <div className="relative mx-auto max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-slate-400/40 bg-slate-900/60 text-xs font-mono tracking-wider uppercase text-slate-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-slate-200 animate-pulse" />
            Nghi Thức Lưu Hương Trà Shan Tuyết - GuHomes Atelier
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-[#f1f5f9] leading-tight mb-6">
            Hũ Trà Bạc Ta 999 Bọc Lõi Trầm Hương Rục Khánh Hòa
          </h2>
          <p className="text-base md:text-lg text-[#94a3b8] font-light leading-relaxed">
            Chế tác độc bản từ bạc ta nguyên chất 999 gò tay thủ công dày 1.8mm. Lõi trong lót gỗ Trầm Hương
            rục tự nhiên ngàn năm Khánh Hòa tỏa hương thơm trầm ấm ngấm sâu vào từng búp trà, nắp hũ ren kép
            côn mài siêu khít chân không chống nồm ẩm 100% giữ búp trà luôn ở độ ẩm 3% hoàn hảo.
          </p>
        </div>

        {/* Grid 2 cột: Bộ tùy biến may đo & Kính soi hoa văn chạm bạc 12x */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Cột trái: Tùy biến dung tích, hoa văn & thử nghiệm nắp chân không */}
          <div className="lg:col-span-7 bg-[#13141b]/90 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <h3 className="text-xl font-serif text-[#f1f5f9]">Tùy Biến Hũ Trà Bạc Ngự Dụng</h3>
                <p className="text-xs font-mono text-[#94a3b8] mt-1">Khắc mã kiểm định: GU-AGARWOOD-CADDY-2026-X</p>
              </div>

              {/* Nút đóng mở nắp chân không */}
              <button
                type="button"
                onClick={toggleSeal}
                className={cn(
                  'px-4 py-2 rounded-lg text-xs font-mono tracking-wide transition-all border min-h-[44px]',
                  isLidSealed
                    ? 'bg-slate-800 text-slate-100 border-slate-400 shadow-[0_0_15px_rgba(226,232,240,0.25)]'
                    : 'bg-amber-950/40 text-amber-200 border-amber-500/40'
                )}
              >
                {isLidSealed ? 'NẮP KHÓA CHÂN KHÔNG 100%' : 'NẮP ĐANG MỞ (HƯƠNG TRẦM TOẢ)'}
              </button>
            </div>

            {/* Chọn dung tích hũ trà */}
            <div className="space-y-4 mb-8">
              <div className="text-xs font-mono text-slate-300 uppercase tracking-widest mb-2">
                1. Chọn Dung Tích & Trọng Lượng Bạc Ta:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CADDY_CAPACITIES.map((cap, cIdx) => {
                  const isSelected = selectedCapacityIndex === cIdx
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => {
                        setSelectedCapacityIndex(cIdx)
                        playVacuumSealAudio(true)
                      }}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all min-h-[88px]',
                        isSelected
                          ? 'border-slate-300 bg-slate-800/40 text-white shadow-[0_0_20px_rgba(226,232,240,0.15)]'
                          : 'border-white/10 bg-white/5 text-[#94a3b8] hover:border-white/30'
                      )}
                    >
                      <div className="text-sm font-medium text-[#f1f5f9]">{cap.name}</div>
                      <div className="font-mono text-xs text-amber-300 mt-2">{cap.silverWeightTa}</div>
                      <div className="text-[11px] text-[#94a3b8] mt-1">{cap.agarwoodLining}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Chọn hoa văn chạm lộng */}
            <div className="space-y-4 mb-8">
              <div className="text-xs font-mono text-slate-300 uppercase tracking-widest mb-2">
                2. Đồ Án Hoa Văn Bạc Ta 999 Gò Tay:
              </div>
              <div className="space-y-3">
                {CARVING_MOTIFS.map((motif, mIdx) => {
                  const isSelected = selectedMotifIndex === mIdx
                  return (
                    <button
                      key={motif.id}
                      type="button"
                      onClick={() => {
                        setSelectedMotifIndex(mIdx)
                        playVacuumSealAudio(false)
                      }}
                      className={cn(
                        'w-full p-4 rounded-xl border text-left transition-all min-h-[44px]',
                        isSelected
                          ? 'border-slate-300 bg-slate-800/20 text-white'
                          : 'border-white/10 bg-white/5 text-[#94a3b8] hover:border-white/20'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-serif text-[#f1f5f9]">{motif.name}</span>
                        <span className="text-xs font-mono text-amber-300">{motif.style}</span>
                      </div>
                      <div className="text-xs text-[#94a3b8] mt-1">{motif.meaning}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Khắc chữ Triện niên hiệu riêng */}
            <div className="pt-6 border-t border-white/10">
              <label htmlFor="seal-era-input" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                3. Khắc Chữ Triện Niên Hiệu Đáy Hũ Bạc (Tùy Chọn):
              </label>
              <input
                id="seal-era-input"
                type="text"
                value={sealEraText}
                onChange={e => setSealEraText(e.target.value)}
                placeholder="Ví dụ: Càn Long Niên Chế - Bính Ngọ 2026..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-[#f1f5f9] placeholder-white/30 focus:outline-none focus:border-slate-300 min-h-[44px]"
              />
              <p className="text-[11px] text-[#64748b] font-mono mt-2">
                Được khắc chìm bằng dao thép tôi và phủ lớp men bảo vệ chống oxy hóa vĩnh cửu.
              </p>
            </div>
          </div>

          {/* Cột phải: Kính soi hoa văn chạm lộng 12x & Form đặt may đo */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Kính soi cận cảnh hoa văn chạm lộng 12x */}
            <div className="bg-[#13141b]/90 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-serif text-[#f1f5f9]">Kính Soi Bạc Ta 12x</h4>
                <button
                  type="button"
                  onClick={() => setIsZoomActive(!isZoomActive)}
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono text-[#cbd5e1] hover:bg-white/10 transition-all min-h-[44px]"
                >
                  {isZoomActive ? 'Thu Nhỏ (1x)' : 'Phóng Đại 12x'}
                </button>
              </div>

              {/* Khung mô phỏng bề mặt bạc chạm hoa văn */}
              <div className="relative h-60 rounded-xl overflow-hidden border border-slate-500/40 bg-black flex items-center justify-center p-6 shadow-2xl">
                {/* Lớp vân kim loại bạc ta 999 */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-300 opacity-80"
                  animate={{ scale: isZoomActive ? 1.8 : 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Khung hiển thị chi tiết nắp mở/đóng */}
                <AnimatePresence mode="wait">
                  {isLidSealed ? (
                    <motion.div
                      key="sealed"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative z-10 text-center"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full border-2 border-slate-200 bg-slate-900/80 flex items-center justify-center mb-2 shadow-2xl">
                        <span className="text-2xl filter drop-shadow">🪷</span>
                      </div>
                      <div className="text-sm font-serif text-[#f1f5f9]">Nắp Côn Mài Chân Không Kép</div>
                      <div className="text-xs text-amber-300 mt-1 font-mono">Độ ẩm búp trà: 3.0% RH chuẩn mực</div>
                      {sealEraText.trim() && (
                        <div className="mt-2 text-xs font-mono text-slate-300">[{sealEraText}]</div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative z-10 text-center"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full border-2 border-amber-500 bg-amber-950/80 flex items-center justify-center mb-2 shadow-2xl">
                        <span className="text-2xl filter drop-shadow">🪵</span>
                      </div>
                      <div className="text-sm font-serif text-amber-200">Lõi Trầm Hương Rục Khánh Hòa</div>
                      <div className="text-xs text-[#94a3b8] mt-1">{currentCapacity.agarwoodLining}</div>
                      <div className="text-[11px] text-amber-400 mt-1 font-mono">Tỏa hương trầm ấm ngấm sâu búp trà</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Thông số kỹ thuật chế tác */}
            <div className="bg-[#13141b]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#f1f5f9] mb-4">Quy Chuẩn Chế Tác Ngự Dụng</h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Chất Liệu Thân</div>
                  <div className="text-sm font-serif text-[#f1f5f9] mt-1">Bạc Ta 999</div>
                  <div className="text-[10px] text-[#64748b]">Dày 1.8mm gò tay</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Lõi Trong</div>
                  <div className="text-sm font-serif text-amber-300 mt-1">Trầm Hương Rục</div>
                  <div className="text-[10px] text-[#64748b]">Khánh Hòa tự nhiên</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Nắp Khóa Khí</div>
                  <div className="text-sm font-serif text-[#f1f5f9] mt-1">Ren Côn Mài Kép</div>
                  <div className="text-[10px] text-[#64748b]">Chân không tuyệt đối</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Độ Ẩm Búp Trà</div>
                  <div className="text-sm font-serif text-amber-300 mt-1">3.0% Không Đổi</div>
                  <div className="text-[10px] text-[#64748b]">Kháng ẩm nồm 100%</div>
                </div>
              </div>
            </div>

            {/* Form đăng ký may đo hũ trà */}
            <div className="bg-gradient-to-br from-[#1a1c24] to-[#13141b] border border-slate-500/30 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#f1f5f9] mb-2">Đặt Chế Tác Hũ Trà Bạc Ngự Dụng</h4>
              <p className="text-xs text-[#94a3b8] mb-4">
                Mỗi năm xưởng kim hoàn GuHomes chỉ hoàn thiện 12 chiếc hũ trà bạc bọc trầm rục độc bản.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-400/50 text-center">
                  <p className="text-xs font-medium text-[#f1f5f9]">Tiếp nhận đơn chế tác thành công!</p>
                  <p className="text-[11px] text-[#cbd5e1] mt-1">
                    Nghệ nhân GuHomes sẽ liên hệ gửi bản vẽ chạm khắc trong 24 giờ. Hotline: 0368 757 916.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên trà hữu..."
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#f1f5f9] placeholder-white/40 focus:outline-none focus:border-slate-300 min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại..."
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#f1f5f9] placeholder-white/40 focus:outline-none focus:border-slate-300 min-h-[44px]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-200 hover:bg-white text-black font-semibold text-xs tracking-wide transition-all shadow-md min-h-[44px]"
                  >
                    Đăng Ký Đặt May Đo {currentCapacity.name}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Chân trang tiểu dự án */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-[#94a3b8] font-mono">
          <div>Xưởng chế tác kim hoàn và mộc GuHomes 1.200m² tại Thạnh Xuân, Q.12, TP. Hồ Chí Minh</div>
          <div className="mt-2 sm:mt-0">Hotline: 0368 757 916 - Email: guhomesvn@gmail.com</div>
        </div>
      </div>
    </section>
  )
}
