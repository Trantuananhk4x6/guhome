'use client'

import React, { useState } from 'react'

interface CraftMaterialLayer {
  id: string
  name: string
  origin: string
  craftTechnique: string
  sensoryTouch: string
  durabilityYears: number
}

const MATERIAL_LAYERS: CraftMaterialLayer[] = [
  {
    id: 'tortoiseshell-horn',
    name: 'Sừng Trâu Ép Quang Vân Đồi Mồi',
    origin: 'Sừng trâu nước ĐBSCL tuyển chọn, ép nhiệt chân không thủ công',
    craftTechnique: 'Mài nhẵn 12 cấp độ hạt nhám và đánh bóng bằng bột đá vôi non',
    sensoryTouch: 'Mát lịm như ngọc cẩm thạch, thấu quang hổ phách ấm áp dưới ánh nắng tự nhiên',
    durabilityYears: 150,
  },
  {
    id: 'gold-24k-inlay',
    name: 'Chỉ Vàng Ròng 24K Kiêu Kỵ',
    origin: 'Vàng ròng 99.99% dát kéo chỉ thủ công làng nghề Kiêu Kỵ Gia Lâm',
    craftTechnique: 'Đục mộng rãnh 0.4mm khảm chìm theo đồ án Rồng Thời Lý Đại Việt',
    sensoryTouch: 'Ánh kim sắc sảo, không bao giờ xỉn màu trong độ ẩm nhiệt đới 80%',
    durabilityYears: 300,
  },
  {
    id: 'rosewood-subframe',
    name: 'Khung Gỗ Trắc Đỏ Nam Bộ',
    origin: 'Lõi gỗ Trắc đỏ trăm năm thu mua từ nhà rường cổ Tây Ninh',
    craftTechnique: 'Ghép mộng én giấu đinh, gắn nam châm Neodymium hít êm ái khi hạ nắp',
    sensoryTouch: 'Đầm tay, bề mặt đanh chắc lau dầu lanh tự nhiên thơm hương mộc dịu nhẹ',
    durabilityYears: 200,
  },
  {
    id: 'imperial-silk-lining',
    name: 'Lót Nhung Tơ Tằm Nhuận Đức',
    origin: 'Tơ tằm tự nhiên Bảo Lộc dệt mật độ cao tại làng nghề Nhuận Đức Củ Chi',
    craftTechnique: 'Nhuộm màu chàm cổ truyền, đệm bông gòn hữu cơ nâng đỡ bút nghiên an toàn',
    sensoryTouch: 'Mềm mại như lông vũ, nâng niu thỏi mực tùng yên và triện ấn gia chủ',
    durabilityYears: 80,
  },
]

export function ArtisanHandmadeTortoiseshellAndGoldCalligraphyCaseAtelier({ className = '' }: { className?: string }) {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('tortoiseshell-horn')
  const [isLidClosed, setIsLidClosed] = useState<boolean>(false)
  const [zoomLevel, setZoomLevel] = useState<number>(100)

  const activeLayer = MATERIAL_LAYERS.find((l) => l.id === selectedLayerId) ?? MATERIAL_LAYERS[0]!

  return (
    <section className={`w-full py-16 sm:py-24 bg-[#0D100F] text-[#F3EFEA] border-t border-[#C5A880]/20 relative overflow-hidden ${className}`}>
      {/* Background ambient gold gradient */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#C5A880]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C5A880]/20 pb-8 mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
              <span>● Tác Phẩm Mỹ Nghệ Thư Phòng</span>
              <span>· Chế Tác Thủ Công 160 Giờ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Hộp Văn Phòng Tứ Bảo Vân Đồi Mồi & Vàng 24K
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Tráp ngự dụng văn phòng chế tác từ sừng trâu nước ĐBSCL ép quang hóa hổ phách, nạm hoa văn chỉ vàng ròng 24K rồng thời Lý và khung gỗ Trắc đỏ mộng giấu nam châm đóng mở tĩnh lặng.
            </p>
          </div>

          {/* Interactive Lid Toggle Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLidClosed((prev) => !prev)}
              className="min-h-[44px] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide bg-[#17211E] text-[#C5A880] border border-[#C5A880]/40 hover:border-[#C5A880] transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95 shadow-sm"
              aria-label={isLidClosed ? 'Mở nắp tráp thư phòng' : 'Đóng nắp hít nam châm Neodymium'}
            >
              <span className={`w-2 h-2 rounded-full ${isLidClosed ? 'bg-[#A8A29E]' : 'bg-[#C5A880] animate-pulse'}`} />
              <span>{isLidClosed ? 'Nắp Hộp Đang Đóng Kín (Khóa Từ)' : 'Nắp Hộp Mở Hé (Hiện Bút Nghiên)'}</span>
              <span className="font-mono text-[10px] text-[#A8A29E]">{isLidClosed ? 'Closed' : 'Open'}</span>
            </button>
          </div>
        </div>

        {/* Studio Showcase Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Material Layer Selector (Left Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Bóc Tách 4 Lớp Vật Liệu Quý Hiếm:
            </span>

            <div className="flex flex-col gap-3">
              {MATERIAL_LAYERS.map((layer) => {
                const isSelected = layer.id === selectedLayerId
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#18221F] border-[#C5A880] shadow-md shadow-[#C5A880]/15 scale-[1.01]'
                        : 'bg-[#121715] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isSelected ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {layer.name}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#0D100F] border border-[#C5A880]/20 text-[#C5A880]">
                        Niên hạn {layer.durabilityYears}+ năm
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {layer.origin}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Magnifier Zoom Slider */}
            <div className="p-5 rounded-2xl bg-[#121715] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Kính Lúp Soi Vân Sừng & Chỉ Vàng:</span>
                <span className="text-[#C5A880] font-semibold">{zoomLevel}% Phóng đại</span>
              </div>
              <input
                type="range"
                min="100"
                max="400"
                step="25"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#18221F] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                aria-label="Điều chỉnh độ phóng đại kính lúp soi chi tiết"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>Mắt thường (100%)</span>
                <span>Chi tiết vi mô 0.4mm (400%)</span>
              </div>
            </div>
          </div>

          {/* Detailed Craftsmanship Atelier (Right Col 7) */}
          <div className="lg:col-span-7 bg-[#121715] border border-[#C5A880]/30 rounded-3xl p-6 sm:p-8 relative">
            <div className="flex items-center justify-between border-b border-[#C5A880]/15 pb-4 mb-6">
              <span className="text-xs font-mono text-[#C5A880] uppercase tracking-widest">
                Kỹ Nghệ Chế Tác Mộc May Đo GuHomes
              </span>
              <span className="text-xs text-[#A8A29E] font-mono">Xưởng Thạnh Xuân 1.200m²</span>
            </div>

            <h3 className="text-2xl font-display text-[#F3EFEA] mb-3">
              {activeLayer.name}
            </h3>

            <div className="p-4 rounded-2xl bg-[#0D100F] border border-[#C5A880]/20 mb-6">
              <span className="text-[11px] font-mono text-[#C5A880] uppercase tracking-wider block mb-1">
                Cảm Giác Tiếp Xúc Khi Chạm Tay
              </span>
              <p className="text-sm text-[#F3EFEA] font-light leading-relaxed">
                &ldquo;{activeLayer.sensoryTouch}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#0D100F] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Nguồn Gốc Xuất Xứ Vật Liệu
                </span>
                <p className="text-xs sm:text-sm text-[#F3EFEA] font-light">
                  {activeLayer.origin}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D100F] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Kỹ Thuật Xử Lý Thủ Công
                </span>
                <p className="text-xs sm:text-sm text-[#F3EFEA] font-light">
                  {activeLayer.craftTechnique}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D100F] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Cơ Chế Khóa Nắp Nam Châm
                </span>
                <p className="text-xs sm:text-sm text-[#C5A880] font-mono font-medium">
                  {isLidClosed ? 'Hít chặt 0.8 Tesla (Êm không tiếng ồn)' : 'Mở rộng 110° dễ dàng lấy bút'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D100F] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Độ Bền & Khả Năng Lưu Truyền
                </span>
                <p className="text-xs sm:text-sm text-[#C5A880] font-mono font-medium">
                  Bảo tồn truyền đời &gt; {activeLayer.durabilityYears} năm
                </p>
              </div>
            </div>

            {/* Atelier Contact Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#18221F] border border-[#C5A880]/30 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center font-bold text-xs shrink-0">
                  KTS
                </span>
                <span className="text-[#A8A29E]">
                  Đặt may đo độc bản theo số đo thư phòng và triện ấn riêng của gia chủ.
                </span>
              </div>
              <a
                href="mailto:guhomesvn@gmail.com"
                className="min-h-[44px] px-4 py-2 rounded-full bg-[#C5A880] text-[#0D100F] font-semibold hover:bg-[#D4B68D] transition-colors whitespace-nowrap flex items-center justify-center"
              >
                guhomesvn@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
