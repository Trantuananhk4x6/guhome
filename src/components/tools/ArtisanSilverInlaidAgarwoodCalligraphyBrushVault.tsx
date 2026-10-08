'use client'

import React, { useState } from 'react'

interface CalligraphyBrushStyle {
  id: string
  title: string
  inkDensityPercent: number
  brushTipMaterial: string
  calligraphyStyle: string
  description: string
}

const BRUSH_STYLES: CalligraphyBrushStyle[] = [
  {
    id: 'wash-painting-light',
    title: 'Thủy Mặc Thanh Thoát 30%',
    inkDensityPercent: 30,
    brushTipMaterial: 'Lông sóc đuôi đỏ phối lông dê núi sấy mộc',
    calligraphyStyle: 'Vẽ tranh thủy mặc, tán sắc mây núi phương Nam',
    description: 'Nét mực loang nhẹ nhàng trên giấy xuyến chỉ, tạo chiều sâu hư ảo và chất thiền lắng đọng cho không gian thư phòng.',
  },
  {
    id: 'regular-script-medium',
    title: 'Thể Chân Đoan Nghiêm 70%',
    inkDensityPercent: 70,
    brushTipMaterial: 'Lông chồn đuôi dài nguyên sợi ngậm mực',
    calligraphyStyle: 'Khải thư & Hành thư ký tự danh gia',
    description: 'Nét bút đanh chắc, dứt khoát nhưng uyển chuyển, phản chiếu tâm tính kiên định và phong thái đĩnh đạc của gia chủ.',
  },
  {
    id: 'cursive-wild-intense',
    title: 'Cuồng Thảo Phóng Khoáng 100%',
    inkDensityPercent: 100,
    brushTipMaterial: 'Lông sói tuyết đanh thép kết hợp lụa tơ tằm',
    calligraphyStyle: 'Thảo thư phiêu dật, phóng bút tự do',
    description: 'Mực đen nhánh đượm hương trầm, từng đường cọ như rồng bay phượng múa, bứt phá mọi giới hạn khuôn mẫu.',
  },
]

export function ArtisanSilverInlaidAgarwoodCalligraphyBrushVault() {
  const [selectedStyleIdx, setSelectedStyleIdx] = useState<number>(1)
  const [agarwoodAromaPpm, setAgarwoodAromaPpm] = useState<number>(45)
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(true)

  const activeStyle = BRUSH_STYLES[selectedStyleIdx] ?? BRUSH_STYLES[0]!

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_bottom_right,rgba(217,119,6,0.25),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Nghệ Thuật Văn Phòng Tứ Bảo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Tráp Bút Nghiên Trầm Hương Nạm Chỉ Bạc 999
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Hộp tráp chế tác từ gỗ Trầm Hương tự nhiên Khánh Hòa nạm sợi bạc ta 999 thủ công mộng chìm. 
            Cất giữ bộ bút thư pháp lông sóc đuôi đỏ và nghiên mực đá Đoan Khê nguyên khối cho thư phòng thượng lưu.
          </p>
        </div>

        {/* Style Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {BRUSH_STYLES.map((style, idx) => {
            const isSelected = idx === selectedStyleIdx
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyleIdx(idx)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-amber-600/80 shadow-lg shadow-amber-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-amber-400 font-semibold">ĐỘ ĐẬM {style.inkDensityPercent}%</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      PHONG CÁCH 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-stone-200">{style.title}</h3>
                </div>
                <span className="text-[11px] text-stone-400 mt-2 block line-clamp-1">
                  {style.calligraphyStyle}
                </span>
              </button>
            )
          })}
        </div>

        {/* Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between min-h-[360px] relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-3 border-b border-stone-800 mb-6">
                <span>GỖ TRẦM HƯƠNG KHÁNH HÒA NGUYÊN KHỐI</span>
                <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  NẠM SỢI BẠC TA 999 (0.8 MM)
                </span>
              </div>

              {/* Graphic Display Box */}
              <div className="p-8 rounded-xl bg-stone-950/80 border border-amber-900/40 text-center relative flex flex-col items-center justify-center min-h-[220px]">
                <div className="relative z-10 max-w-md">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
                    Quy Chuẩn Bút Lông Thư Pháp
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-stone-100 mb-2 font-normal">
                    {activeStyle.brushTipMaterial}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {activeStyle.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Vault Lid Toggle and Inkstone Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-800/80">
              <button
                onClick={() => setIsVaultOpen(!isVaultOpen)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors min-h-[44px] border border-stone-700 flex items-center gap-2"
              >
                <span>NẮP TRÁP KHÓA MỘNG:</span>
                <span className={isVaultOpen ? 'text-amber-400 font-bold' : 'text-stone-400'}>
                  {isVaultOpen ? 'MỞ TRỌN CHIÊM NGƯỠNG' : 'ĐÓNG KÍN LƯU HƯƠNG'}
                </span>
              </button>

              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                NGHIÊN ĐÁ ĐOAN KHÊ NGUYÊN KHỐI
              </span>
            </div>
          </div>

          {/* Aroma Diffusion Slider & Details */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Aroma Diffusion Slider */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="agarwood-aroma-intensity-slider" className="text-sm font-medium text-stone-200">ĐỘ TỎA HƯƠNG TRẦM TỰ NHIÊN</label>
                <span className="text-xs font-mono text-amber-400 font-semibold">{agarwoodAromaPpm} PPM</span>
              </div>
              <input
                id="agarwood-aroma-intensity-slider"
                type="range"
                min="10"
                max="80"
                value={agarwoodAromaPpm}
                onChange={(e) => setAgarwoodAromaPpm(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400">
                <span>Thoang thoảng ban mai</span>
                <span>Chuẩn tĩnh tâm viết lách</span>
                <span>Ngào ngạt an thần</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Đặc Quyền Kỹ Thuật Độc Bản
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Gỗ Trầm tự nhiên Khánh Hòa:</strong> Tỏa hương mộc mạc vĩnh viễn, chống ẩm mốc mực tàu tự nhiên.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Nạm sợi bạc 999 mộng chìm:</strong> Nghệ nhân tán sợi bạc phẳng mịn với mặt gỗ, không gợn tay khi chạm.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Lót nhung tơ tằm nguyên chất:</strong> Giữ đầu lông bút luôn mềm mại, không gãy rụng qua năm tháng.</span>
                </li>
              </ul>
            </div>

            {/* Direct Line */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-300 block">Đặt chế tác tráp bút nghiên may đo:</span>
                <span className="text-stone-400 text-[11px] font-mono">Khắc triện gia huy gia tộc bằng laser</span>
              </div>
              <a
                href="tel:0368757916"
                className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-mono text-xs font-semibold transition-colors min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-mono text-stone-500">
          GUHOMES CALLIGRAPHY ATELIER · 14 ĐƯỜNG 41, AN KHÁNH, THỦ ĐỨC · HOTLINE: 0368 757 916
        </div>
      </div>
    </section>
  )
}
