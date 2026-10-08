'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TeaTraySizeOption {
  id: string
  name: string
  dimensions: string
  teaSetCapacity: string
  bestFor: string
  weightKg: string
}

const TRAY_SIZES: TeaTraySizeOption[] = [
  {
    id: 'don-tra',
    name: 'Khay Đơn Trà (Độc Ẩm)',
    dimensions: '36cm × 24cm × 3.5cm',
    teaSetCapacity: '1 ấm tử sa + 1 chén tống + 2 chén quân',
    bestFor: 'Bàn trà phòng đọc sách hoặc thư phòng tĩnh tâm',
    weightKg: '1.4 kg'
  },
  {
    id: 'doi-am',
    name: 'Khay Đối Ẩm (Song Ẩm Tri Kỷ)',
    dimensions: '48cm × 30cm × 4.0cm',
    teaSetCapacity: '1 ấm tử sa + 1 chén tống + 4 chén quân + 1 khay tráng',
    bestFor: 'Bàn trà ban công vọng cảnh sông hoặc phòng khách',
    weightKg: '2.2 kg'
  },
  {
    id: 'quan-anh',
    name: 'Khay Quần Anh (Đại Trà Đoàn Viên)',
    dimensions: '62cm × 38cm × 4.5cm',
    teaSetCapacity: '2 ấm tử sa + 2 chén tống + 8 chén quân + hũ trà gỗ mun',
    bestFor: 'Sảnh tiệc trà gia tộc hoặc biệt phủ tiếp khách quý',
    weightKg: '3.6 kg'
  }
]

const GOLD_LEAF_PATTERNS = [
  {
    id: 'song-long',
    name: 'Song Long Chầu Nguyệt Thếp Vàng 24K',
    meaning: 'Quyền uy tối thượng, năng lượng thịnh vượng bảo hộ gia đạo vững bền',
    goldLeafThickness: '0.0001 mm Vàng Quỳ Kiêu Kỵ'
  },
  {
    id: 'lien-hoa-an-nhien',
    name: 'Liên Hoa Mây Cuộn Ngũ Phúc Thếp Vàng',
    meaning: 'Thanh tịnh như hoa sen nổi trên mặt nước gương sơn then huyền bí',
    goldLeafThickness: '0.0001 mm Vàng Quỳ Kiêu Kỵ'
  },
  {
    id: 'truc-quan-tu',
    name: 'Trúc Lâm Thất Hiền Thếp Bạc & Vàng Quỳ',
    meaning: 'Khí tiết thanh cao, tiết tháo quân tử giữa dòng thời gian',
    goldLeafThickness: '0.0001 mm Vàng Quỳ Kiêu Kỵ'
  }
]

export function ArtisanGoldLeafLacquerTeaTrayAtelier({ className = '' }: { className?: string }) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1) // Đối ẩm
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0) // Song Long
  const [familyCrestText, setFamilyCrestText] = useState('')
  const [isMirrorTestActive, setIsMirrorTestActive] = useState(true)
  const [isHeatTestActive, setIsHeatTestActive] = useState(false)
  const [zoomGoldLeaf, setZoomGoldLeaf] = useState(false)
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

  // Âm thanh chén gốm tử sa chạm nhẹ mặt khay sơn mài nano gốm
  const playTeaCupChime = () => {
    const ctx = initAudio()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Tần số thanh thoát của chén tử sa nung củi cao tần
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1480, now)
    osc.frequency.exponentialRampToValueAtTime(1475, now + 0.8)

    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.9)
  }

  const handleTestHeat = () => {
    setIsHeatTestActive(true)
    playTeaCupChime()
    setTimeout(() => {
      setIsHeatTestActive(false)
    }, 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName.trim() || !customerPhone.trim()) return
    setSubmitted(true)
  }

  const currentSize = (TRAY_SIZES[selectedSizeIndex] ?? TRAY_SIZES[0]) as TeaTraySizeOption
  const currentPattern = (GOLD_LEAF_PATTERNS[selectedPatternIndex] ?? GOLD_LEAF_PATTERNS[0]) as (typeof GOLD_LEAF_PATTERNS)[number]

  return (
    <section className={cn('relative py-24 bg-[#0d0e12] text-[#f9fafb] overflow-hidden', className)}>
      {/* Background radial glow sắc vàng quỳ 24K */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(234, 179, 8, 0.25) 0%, transparent 60%)'
        }}
      />

      <div className="relative mx-auto max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-950/30 text-xs font-mono tracking-wider uppercase text-yellow-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Nghệ Thuật Sơn Then & Dát Vàng Cung Đình
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-[#fef9c3] leading-tight mb-6">
            Khay Trà Sơn Mài Then Cốt Mít Già Thếp Vàng Quỳ 24K Kiêu Kỵ
          </h2>
          <p className="text-base md:text-lg text-[#9ca3af] font-light leading-relaxed">
            Chế tác độc bản từ lõi gỗ Mít ta ngâm bùn 3 năm chống co ngót nứt nẻ, trải qua 18 lượt sơn then
            nhựa cây sơn Phú Thọ mài nước đến độ đen bóng sâu như gương nước mùa thu. Viền khay thếp vàng
            quỳ 24K thủ công, phủ lớp nano gốm vô cơ chịu nhiệt sôi 100°C kháng nước chè đậm màu vĩnh cửu.
          </p>
        </div>

        {/* Grid 2 cột: Bộ cá nhân hóa khay trà & Kính soi tráng gương 18 lớp */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Cột trái: Bộ tùy biến kích thước, hoa văn thếp vàng & Thử nhiệt 100°C */}
          <div className="lg:col-span-7 bg-[#13151b]/90 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <h3 className="text-xl font-serif text-[#fef9c3]">Tùy Biến May Đo Khay Trà Hoàng Gia</h3>
                <p className="text-xs font-mono text-[#9ca3af] mt-1">Đánh số định danh: GU-TEATRAY-2026-X</p>
              </div>

              {/* Nút kiểm thử nước sôi 100°C */}
              <button
                type="button"
                onClick={handleTestHeat}
                disabled={isHeatTestActive}
                className={cn(
                  'px-4 py-2 rounded-lg text-xs font-mono tracking-wide transition-all border min-h-[44px]',
                  isHeatTestActive
                    ? 'bg-yellow-900/60 text-yellow-200 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                    : 'bg-white/5 text-[#d1d5db] border-white/10 hover:border-yellow-500/50'
                )}
              >
                {isHeatTestActive ? 'ĐANG RÓT NƯỚC SÔI 100°C...' : 'Thử Nghiệm Chịu Nhiệt 100°C'}
              </button>
            </div>

            {/* Chọn kích thước khay trà */}
            <div className="space-y-4 mb-8">
              <div className="text-xs font-mono text-yellow-400 uppercase tracking-widest mb-2">
                1. Kích Thước Bàn Trà May Đo:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TRAY_SIZES.map((size, sIdx) => {
                  const isSelected = selectedSizeIndex === sIdx
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => {
                        setSelectedSizeIndex(sIdx)
                        playTeaCupChime()
                      }}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all min-h-[88px]',
                        isSelected
                          ? 'border-yellow-400/80 bg-yellow-950/30 text-white shadow-[0_0_20px_rgba(250,204,21,0.2)]'
                          : 'border-white/10 bg-white/5 text-[#9ca3af] hover:border-white/30'
                      )}
                    >
                      <div className="text-sm font-medium text-[#fef9c3]">{size.name}</div>
                      <div className="font-mono text-xs text-yellow-300 mt-2">{size.dimensions}</div>
                      <div className="text-[11px] text-[#9ca3af] mt-1">{size.teaSetCapacity}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Chọn đồ án hoa văn dát vàng quỳ */}
            <div className="space-y-4 mb-8">
              <div className="text-xs font-mono text-yellow-400 uppercase tracking-widest mb-2">
                2. Đồ Án Hoa Văn Thếp Vàng Quỳ 24K:
              </div>
              <div className="space-y-3">
                {GOLD_LEAF_PATTERNS.map((pattern, pIdx) => {
                  const isSelected = selectedPatternIndex === pIdx
                  return (
                    <button
                      key={pattern.id}
                      type="button"
                      onClick={() => {
                        setSelectedPatternIndex(pIdx)
                        playTeaCupChime()
                      }}
                      className={cn(
                        'w-full p-4 rounded-xl border text-left transition-all min-h-[44px]',
                        isSelected
                          ? 'border-yellow-400 bg-yellow-950/20 text-white'
                          : 'border-white/10 bg-white/5 text-[#9ca3af] hover:border-white/20'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-serif text-[#fef9c3]">{pattern.name}</span>
                        <span className="text-xs font-mono text-yellow-400">{pattern.goldLeafThickness}</span>
                      </div>
                      <div className="text-xs text-[#9ca3af] mt-1">{pattern.meaning}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Nhập gia huy dòng tộc khắc chìm dát vàng */}
            <div className="pt-6 border-t border-white/10">
              <label htmlFor="family-crest-input" className="block text-xs font-mono text-yellow-400 uppercase tracking-wider mb-2">
                3. Niên Hiệu Hoặc Gia Huy Khắc Chìm Đáy Khay (Tùy Chọn):
              </label>
              <input
                id="family-crest-input"
                type="text"
                value={familyCrestText}
                onChange={e => setFamilyCrestText(e.target.value)}
                placeholder="Ví dụ: Nguyễn Tộc Chi Bảo - Bính Ngọ 2026..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-[#fef9c3] placeholder-white/30 focus:outline-none focus:border-yellow-400 min-h-[44px]"
              />
              <p className="text-[11px] text-[#6b7280] font-mono mt-2">
                Khắc chìm bằng mũi dao kim cương và thếp vàng quỳ 24K thủ công vĩnh viễn không phai màu.
              </p>
            </div>
          </div>

          {/* Cột phải: Khung mô phỏng tráng gương sơn then & Form đăng ký */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mô phỏng bề mặt sơn then tráng gương phản chiếu chén trà */}
            <div className="bg-[#13151b]/90 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-serif text-[#fef9c3]">Mặt Gương Sơn Then 18 Lớp</h4>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMirrorTestActive(!isMirrorTestActive)}
                    className="px-2.5 py-1 rounded border border-white/20 text-xs font-mono text-[#d1d5db] hover:bg-white/10 min-h-[36px]"
                  >
                    {isMirrorTestActive ? 'Ẩn Bóng' : 'Phản Chiếu'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomGoldLeaf(!zoomGoldLeaf)}
                    className="px-2.5 py-1 rounded border border-yellow-500/40 text-xs font-mono text-yellow-300 hover:bg-yellow-950/40 min-h-[36px]"
                  >
                    {zoomGoldLeaf ? 'Thu Nhỏ' : 'Soi Quỳ Vàng'}
                  </button>
                </div>
              </div>

              {/* Bề mặt đen tuyền tráng gương */}
              <div className="relative h-56 rounded-xl overflow-hidden border border-yellow-500/30 bg-black flex items-center justify-center shadow-inner">
                {/* Lớp phản quang tráng gương */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0a0a0c] to-[#1a1813] opacity-95" />
                
                {/* Viền thếp vàng quỳ 24K */}
                <div className="absolute inset-3 border-2 border-yellow-500/70 rounded-lg pointer-events-none" />

                {/* Mô phỏng chén trà tử sa và bóng phản chiếu */}
                {isMirrorTestActive && (
                  <motion.div
                    className="relative text-center z-10"
                    animate={{ scale: zoomGoldLeaf ? 1.3 : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-16 h-10 mx-auto rounded-b-full bg-[#78350f] border border-amber-900/60 shadow-[0_10px_25px_rgba(0,0,0,0.8)] relative">
                      {/* Làn khói trà */}
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/30 blur-xs rounded-full animate-bounce" />
                    </div>
                    {/* Bóng phản chiếu gương nước */}
                    <div className="w-14 h-6 mx-auto rounded-t-full bg-[#78350f]/20 blur-[1px] transform -scale-y-100 mt-1" />
                    
                    <div className="text-xs font-mono text-yellow-400 mt-3">
                      {familyCrestText.trim() ? `[${familyCrestText}]` : currentPattern.name}
                    </div>
                  </motion.div>
                )}

                {/* Hiệu ứng nước sôi 100°C lan tỏa */}
                {isHeatTestActive && (
                  <motion.div
                    className="absolute inset-0 bg-yellow-500/10 border-2 border-yellow-400 flex items-center justify-center z-20 backdrop-blur-[1px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center bg-black/80 px-4 py-2 rounded-xl border border-yellow-400/50">
                      <span className="text-yellow-400 font-mono text-xs">Nano Gốm 100°C Chịu Nhiệt Tuyệt Đối</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Thông số kỹ thuật chế tác */}
            <div className="bg-[#13151b]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef9c3] mb-4">Quy Chuẩn Chế Tác Cung Đình</h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Cốt Gỗ</div>
                  <div className="text-sm font-serif text-yellow-300 mt-1">Gỗ Mít Rừng</div>
                  <div className="text-[10px] text-[#6b7280]">Ngâm bùn 3 năm</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Lớp Sơn Mài</div>
                  <div className="text-sm font-serif text-yellow-300 mt-1">18 Lớp Sơn Then</div>
                  <div className="text-[10px] text-[#6b7280]">Mài nước đá gan gà</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Chất Liệu Thếp</div>
                  <div className="text-sm font-serif text-yellow-300 mt-1">Vàng Quỳ 24K</div>
                  <div className="text-[10px] text-[#6b7280]">Làng nghề Kiêu Kỵ</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Kháng Nhiệt</div>
                  <div className="text-sm font-serif text-yellow-300 mt-1">100°C Nước Sôi</div>
                  <div className="text-[10px] text-[#6b7280]">Lớp nano gốm bảo vệ</div>
                </div>
              </div>
            </div>

            {/* Form đăng ký may đo khay trà */}
            <div className="bg-gradient-to-br from-[#1a170d] to-[#13151b] border border-yellow-500/30 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef9c3] mb-2">Đặt Chế Tác Khay Trà Hoàng Gia</h4>
              <p className="text-xs text-[#9ca3af] mb-4">
                Mỗi năm xưởng mộc GuHomes chỉ hoàn thiện tối đa 12 bộ khay trà dát vàng thủ công.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-yellow-950/40 border border-yellow-500/50 text-center">
                  <p className="text-xs font-medium text-[#fef9c3]">Tiếp nhận đơn chế tác thành công!</p>
                  <p className="text-[11px] text-[#d1d5db] mt-1">
                    Nghệ nhân GuHomes sẽ liên hệ gửi bản vẽ đồ án trong 24 giờ. Hotline: 0368 757 916.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên quý trà hữu..."
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef9c3] placeholder-white/40 focus:outline-none focus:border-yellow-400 min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại..."
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef9c3] placeholder-white/40 focus:outline-none focus:border-yellow-400 min-h-[44px]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-black font-semibold text-xs tracking-wide transition-all shadow-md min-h-[44px]"
                  >
                    Đăng Ký Đặt May Đo Khay Trà {currentSize.name}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Chân trang tiểu dự án */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-[#9ca3af] font-mono">
          <div>Xưởng chế tác sơn mài & mộc GuHomes 1.200m² tại Thạnh Xuân, Q.12, TP. Hồ Chí Minh</div>
          <div className="mt-2 sm:mt-0">Hotline: 0368 757 916 - Email: guhomesvn@gmail.com</div>
        </div>
      </div>
    </section>
  )
}
