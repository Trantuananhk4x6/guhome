'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChestSizeOption {
  id: string
  name: string
  dimensions: string
  compartments: string
  recommendedFor: string
  basePriceVND: string
}

const CHEST_SIZES: ChestSizeOption[] = [
  {
    id: 'size_khue_cac',
    name: 'Bản Khuê Các (Tiểu Tráp)',
    dimensions: '22cm x 16cm x 12cm',
    compartments: '2 tầng, 6 ngăn nhung lụa, khay nhẫn đôi',
    recommendedFor: 'Trang sức nhẫn kim cương, hoa tai ngọc trai, đồng hồ thanh lịch',
    basePriceVND: '45.000.000 đ'
  },
  {
    id: 'size_hoang_gia',
    name: 'Bản Hoàng Gia (Trung Tráp)',
    dimensions: '32cm x 22cm x 18cm',
    compartments: '3 tầng lụa mây tía, ngăn kéo bí mật ngầm, khay kiềng cổ',
    recommendedFor: 'Bộ sưu tập ngọc phỉ thúy, vòng vàng rồng phượng, chuỗi tràng hạt',
    basePriceVND: '78.000.000 đ'
  },
  {
    id: 'size_dai_trieu',
    name: 'Bản Đại Triều (Đại Tráp Cung Đình)',
    dimensions: '45cm x 30cm x 24cm',
    compartments: '4 tầng cơ quan mở trượt, khay đựng ấn chương, khóa số cơ khí ngầm',
    recommendedFor: 'Bảo vật gia truyền dòng họ, ngọc tỷ, vương miện và gia tài truyền đời',
    basePriceVND: '135.000.000 đ'
  }
]

const LIGHTING_INSPECTION_ANGLES = [
  { id: 'dawn', name: 'Nắng Sớm Ban Mai', hue: 'text-amber-200', desc: 'Ánh sáng tán xạ 4500K làm bật ánh xanh ngọc lục bảo của ốc đỏ Singapore' },
  { id: 'sunset', name: 'Hoàng Hôn Sông Nước', hue: 'text-rose-300', desc: 'Ánh ấm 2700K kích hoạt sắc đỏ lửa ruby và vàng ánh kim trên cánh mai' },
  { id: 'moon', name: 'Trăng Đêm Tĩnh Lặng', hue: 'text-sky-200', desc: 'Quang phổ 5500K chiếu rọi độ bóng tráng gương của phiến sừng luộc dầu hồi' }
]

export function ArtisanHornMotherOfPearlJewelryChestAtelier({ className = '' }: { className?: string }) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(1) // Default Hoàng Gia
  const [activeAngleIndex, setActiveAngleIndex] = useState<number>(0)
  const [isLidOpen, setIsLidOpen] = useState<boolean>(false)
  const [ownerName, setOwnerName] = useState<string>('')
  const [inlayPattern, setInlayPattern] = useState<'truc_mai' | 'sen_hac' | 'song_long'>('truc_mai')
  const [customInquirySubmitted, setCustomInquirySubmitted] = useState<boolean>(false)

  const currentSize = (CHEST_SIZES[selectedSizeIndex] ?? CHEST_SIZES[0]) as ChestSizeOption
  const currentAngle = (LIGHTING_INSPECTION_ANGLES[activeAngleIndex] ?? LIGHTING_INSPECTION_ANGLES[0]) as (typeof LIGHTING_INSPECTION_ANGLES)[0]

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault()
    setCustomInquirySubmitted(true)
    setTimeout(() => {
      setCustomInquirySubmitted(false)
    }, 4500)
  }

  return (
    <section className={cn("relative w-full py-16 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden font-sans", className)}>
      {/* Background ánh xà cừ ngũ sắc */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-600/30 via-rose-500/20 to-teal-500/20" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Tiêu đề Quiet Luxury */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-300 text-xs tracking-widest uppercase mb-4">
            <span>GuHomes Haute Horlogerie & Precious Vault</span>
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span>Nghệ Thuật Ngự Dụng Cung Đình</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-100 tracking-tight leading-snug">
            Tráp Trang Sức Sừng Trâu Cẩn Xà Cừ Tam Khôi
          </h2>
          <p className="mt-3 text-stone-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Phiến sừng trâu nước luộc trong tinh dầu hồi quế uốn phẳng, cẩn ốc đỏ Singapore Tam Khôi óng ánh ngũ sắc. Lòng tráp bọc lụa tơ tằm Vạn Phúc dệt hoa văn mây tía và bản lề bạc đúc tay nguyên khối.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Cột trái: Kính Soi Cận Cảnh Xà Cừ & Mô Phỏng Đóng Mở Nắp (7 cột) */}
          <div className="lg:col-span-7 bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg text-amber-200">Kính Soi Hoa Văn & Cơ Cấu Bản Lề Bạc</h3>
                <p className="text-xs text-stone-400">Kiểm tra độ khúc xạ ngũ sắc của xà cừ dưới 3 góc chiếu sáng</p>
              </div>

              {/* Nút đóng mở nắp tráp */}
              <button
                onClick={() => setIsLidOpen(!isLidOpen)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300',
                  isLidOpen
                    ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                )}
              >
                {isLidOpen ? 'Đóng Nắp Tráp' : 'Mở Nắp Tráp (Lộ Lụa Mây Tía)'}
              </button>
            </div>

            {/* Khung mô phỏng trực quan nắp tráp sừng và lòng tráp */}
            <div className="relative h-64 sm:h-72 w-full rounded-xl border border-stone-800 bg-stone-950 overflow-hidden flex flex-col justify-between p-5 shadow-inner">
              {/* Ánh sáng phản chiếu quang học theo góc chọn */}
              <div 
                className={cn(
                  'absolute inset-0 pointer-events-none opacity-30 transition-all duration-700 bg-gradient-to-tr',
                  activeAngleIndex === 0 ? 'from-amber-500/20 via-teal-500/20 to-transparent' :
                  activeAngleIndex === 1 ? 'from-rose-500/30 via-amber-600/20 to-transparent' :
                  'from-sky-500/30 via-indigo-500/20 to-transparent'
                )}
              />

              {/* Tag định danh tác phẩm */}
              <div className="relative z-10 flex justify-between items-start text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300">
                  {currentSize.dimensions}
                </span>
                <span className="px-2.5 py-1 rounded bg-stone-900/80 border border-stone-700 text-stone-300">
                  Mã VIP: GU-JEWELRY-CHEST-2026-X
                </span>
              </div>

              {/* Khu vực mô phỏng nắp hoặc lòng tráp */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <AnimatePresence mode="wait">
                  {!isLidOpen ? (
                    <motion.div
                      key="closed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center"
                    >
                      <div className="w-48 sm:w-60 h-24 sm:h-28 mx-auto rounded-lg bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-amber-500/40 p-3 shadow-2xl flex flex-col justify-center items-center relative overflow-hidden">
                        <div className="absolute top-1 left-2 text-[10px] text-stone-500 font-serif">Sừng Trâu Luộc Dầu Hồi</div>
                        <div className="text-amber-200 font-serif text-sm tracking-wide mb-1">
                          {inlayPattern === 'truc_mai' ? 'Tứ Quý Trúc Mai Bình An' :
                           inlayPattern === 'sen_hac' ? 'Liên Hoa Tiên Hạc Cát Tường' : 'Song Long Chầu Nguyệt Cung Đình'}
                        </div>
                        <div className="text-[11px] text-stone-400 font-light">Ốc Đỏ Singapore Tam Khôi Xuyên Quang</div>
                        <div className="w-12 h-0.5 bg-amber-500/50 mt-2" />
                      </div>
                      <div className="text-xs text-stone-400 mt-2 font-light">Nắp đang đóng kín với ổ khóa ngầm đồng thau chạm hoa mai</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="opened"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center"
                    >
                      <div className="w-48 sm:w-60 h-24 sm:h-28 mx-auto rounded-lg bg-gradient-to-r from-purple-950 via-fuchsia-950 to-purple-900 border border-purple-500/40 p-3 shadow-2xl flex flex-col justify-center items-center">
                        <div className="text-purple-200 font-serif text-sm tracking-wide mb-1">Lụa Tơ Tằm Vạn Phúc Mây Tía</div>
                        <div className="text-[11px] text-purple-300/80 font-light">3 Tầng Ngăn Trượt Giảm Chấn Bạc 999</div>
                        <div className="text-[10px] text-purple-400/60 mt-1">Chống trầy xước ngọc ngà, giữ độ ẩm vàng 55% RH</div>
                      </div>
                      <div className="text-xs text-stone-400 mt-2 font-light">Lòng tráp đang mở - Sẵn sàng lưu trữ bảo vật gia truyền</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Thông số góc chiếu sáng */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/80 pt-2">
                <span className={currentAngle.hue}>{currentAngle.name}</span>
                <span>{currentSize.compartments}</span>
              </div>
            </div>

            {/* Chọn 3 góc chiếu sáng kiểm định xà cừ */}
            <div className="mt-4 flex gap-2">
              {LIGHTING_INSPECTION_ANGLES.map((angle, idx) => (
                <button
                  key={angle.id}
                  onClick={() => setActiveAngleIndex(idx)}
                  className={cn(
                    'flex-1 p-2 rounded-lg text-xs font-medium border text-center transition-all',
                    idx === activeAngleIndex
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-300'
                  )}
                >
                  {angle.name}
                </button>
              ))}
            </div>

            <p className="mt-3 text-xs text-stone-400 font-light leading-relaxed">
              {currentAngle.desc}
            </p>
          </div>

          {/* Cột phải: Chọn Kích Cỡ & Form Cá Nhân Hóa (5 cột) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Lựa chọn kích thước tráp */}
            <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="font-serif text-base text-amber-200 mb-1">3 Kích Cỡ Ngự Tuyển</h3>
              <p className="text-xs text-stone-400 mb-4">Gia công theo thước Lỗ Ban tài lộc và tỷ lệ vàng</p>

              <div className="space-y-2.5">
                {CHEST_SIZES.map((size, idx) => {
                  const isSelected = idx === selectedSizeIndex
                  return (
                    <div
                      key={size.id}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={cn(
                        'p-3.5 rounded-xl border cursor-pointer transition-all duration-300',
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500/70 shadow-md'
                          : 'bg-stone-950/50 border-stone-800/80 hover:border-stone-700'
                      )}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-serif text-sm text-stone-200 font-medium">{size.name}</span>
                        <span className="font-mono text-xs text-amber-400 font-medium">{size.basePriceVND}</span>
                      </div>
                      <div className="text-[11px] text-stone-400 font-light">{size.dimensions} • {size.recommendedFor}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Đặt Hàng & Khắc Gia Huy Riêng */}
            <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="font-serif text-base text-amber-200 mb-1">Cá Nhân Hóa Độc Bản</h3>
              <p className="text-xs text-stone-400 mb-4">Cẩn chỉ bạc gia huy hoặc họ tên chủ nhân vào lòng nắp</p>

              <form onSubmit={handleSubmitInquiry} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">Hoa văn xà cừ ngự tuyển:</label>
                  <select
                    value={inlayPattern}
                    onChange={(e) => setInlayPattern(e.target.value as 'truc_mai' | 'sen_hac' | 'song_long')}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="truc_mai">Tứ Quý Trúc Mai Bình An</option>
                    <option value="sen_hac">Liên Hoa Tiên Hạc Cát Tường</option>
                    <option value="song_long">Song Long Chầu Nguyệt Cung Đình</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">Gia huy / Tên chủ nhân cẩn chỉ bạc:</label>
                  <input
                    type="text"
                    placeholder="VD: Trương Gia Phúc Đức hoặc T.A."
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={customInquirySubmitted}
                  className="w-full py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-stone-100 text-xs font-medium tracking-wide transition-all shadow-md"
                >
                  {customInquirySubmitted ? 'Đã Tiếp Nhận Yêu Cầu Giám Tuyển!' : 'Đăng Ký Đặt Tác Phẩm Nghệ Nhân'}
                </button>
              </form>

              {customInquirySubmitted && (
                <div className="mt-3 p-2 bg-emerald-950/60 border border-emerald-500/40 rounded text-center text-xs text-emerald-300">
                  Nghệ nhân cả xưởng Thạnh Xuân sẽ liên hệ tư vấn mẫu cẩn xà cừ trong vòng 24 giờ.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chân Trang Bảo Chứng */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-mono gap-4">
          <div>Xưởng Thêu & Khảm Cung Đình Thạnh Xuân 1.200m² - Trần 12 công trình/năm</div>
          <div className="flex gap-4">
            <a href="tel:0368757916" className="text-amber-400/80 hover:underline">Hotline: 0368 757 916</a>
            <a href="mailto:guhomesvn@gmail.com" className="text-amber-400/80 hover:underline">guhomesvn@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  )
}
