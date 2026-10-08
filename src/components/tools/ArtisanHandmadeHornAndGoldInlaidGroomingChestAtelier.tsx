'use client'

import React, { useState } from 'react'

interface VanityMirrorAngle {
  angleDegrees: number
  title: string
  bestApplication: string
  cctKelvin: number
  cctName: string
}

const MIRROR_ANGLES: VanityMirrorAngle[] = [
  {
    angleDegrees: 45,
    title: 'Góc Soi Cận Cảnh 45°',
    bestApplication: 'Chăm sóc da chuyên sâu và ngắm trang sức vi mô',
    cctKelvin: 4000,
    cctName: 'Ánh sáng ban ngày tự nhiên (Neutral Sunlight)',
  },
  {
    angleDegrees: 90,
    title: 'Góc Trực Diện 90°',
    bestApplication: 'Trang điểm chuẩn Studio & phối hợp trang phục dạ tiệc',
    cctKelvin: 3000,
    cctName: 'Ánh sáng hoàng hôn ấm (Warm Luxury Glamour)',
  },
  {
    angleDegrees: 135,
    title: 'Góc Toàn Cảnh 135°',
    bestApplication: 'Kiểm tra tỷ lệ cân xứng gương mặt và độ rủ của tóc',
    cctKelvin: 5000,
    cctName: 'Ánh sáng tiệc tối sang trọng (Gala High-CRI)',
  },
]

export function ArtisanHandmadeHornAndGoldInlaidGroomingChestAtelier() {
  const [selectedAngleIdx, setSelectedAngleIdx] = useState<number>(1)
  const [lightBrightness, setLightBrightness] = useState<number>(75)
  const [isLidOpen, setIsLidOpen] = useState<boolean>(true)

  const activeAngle = MIRROR_ANGLES[selectedAngleIdx] ?? MIRROR_ANGLES[0]!

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background soft glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.2),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-800/50 text-rose-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Nghệ Thuật Thủ Công Mỹ Nghệ Xa Xỉ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Tráp Gương Trang Điểm Sừng Khảm Vàng 24K
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Tuyệt tác kết hợp gỗ Mun sọc và phiến sừng trâu nước ĐBSCL ép nhiệt bóng như ngà cẩm thạch. 
            Nạm chỉ vàng 24K tinh xảo, gương quang học Bỉ tráng bạc 8 lớp cùng hệ đèn LED CRI 98 chuẩn xác từng sắc độ.
          </p>
        </div>

        {/* Angle Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {MIRROR_ANGLES.map((angle, idx) => {
            const isSelected = idx === selectedAngleIdx
            return (
              <button
                key={angle.angleDegrees}
                onClick={() => setSelectedAngleIdx(idx)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-rose-600/80 shadow-lg shadow-rose-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-rose-400 font-semibold">TƯ THẾ {angle.angleDegrees}°</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      {angle.cctKelvin}K
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-stone-200">{angle.title}</h3>
                </div>
                <span className="text-[11px] text-stone-400 mt-2 block line-clamp-1">
                  {angle.bestApplication}
                </span>
              </button>
            )
          })}
        </div>

        {/* Main Display Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between min-h-[360px] relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-3 border-b border-stone-800 mb-6">
                <span>GỖ MUN SỌC & SỪNG TRÂU ÉP NHIỆT</span>
                <span className="text-rose-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  NẠM CHỈ VÀNG 24K THỦ CÔNG
                </span>
              </div>

              {/* Graphic Vanity Mirror Display */}
              <div
                className="p-8 rounded-xl border border-stone-800 text-center relative flex flex-col items-center justify-center min-h-[220px] transition-all duration-500"
                style={{
                  backgroundColor: `rgba(24, 24, 27, ${0.5 + lightBrightness * 0.005})`,
                  boxShadow: `0 0 40px rgba(244, 63, 94, ${lightBrightness * 0.003})`,
                }}
              >
                <div className="relative z-10 max-w-md">
                  <span className="text-xs font-mono text-rose-400 uppercase tracking-widest block mb-2">
                    Quang Trực Thực Địa ({activeAngle.cctKelvin}K)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-stone-100 mb-2 font-normal">
                    {activeAngle.cctName}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {activeAngle.bestApplication}
                  </p>
                </div>
              </div>
            </div>

            {/* Lid Toggle and Mirror Quality Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-800/80">
              <button
                onClick={() => setIsLidOpen(!isLidOpen)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors min-h-[44px] border border-stone-700 flex items-center gap-2"
              >
                <span>NẮP GƯƠNG BẢN LỀ ĐỒNG:</span>
                <span className={isLidOpen ? 'text-rose-400 font-bold' : 'text-stone-400'}>
                  {isLidOpen ? 'MỞ TRỌN 180 ĐỘ' : 'ĐÓNG KÍN BẢO VỆ'}
                </span>
              </button>

              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                GƯƠNG BỈ TRÁNG BẠC 8 LỚP (CRI 98)
              </span>
            </div>
          </div>

          {/* Vanity Lighting Slider & Hardware Details */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* LED Brightness Slider */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="vanity-light-brightness-slider" className="text-sm font-medium text-stone-200">ĐỘ SÁNG ĐÈN TRANG ĐIỂM STUDIO</label>
                <span className="text-xs font-mono text-rose-400 font-semibold">{lightBrightness}%</span>
              </div>
              <input
                id="vanity-light-brightness-slider"
                type="range"
                min="20"
                max="100"
                value={lightBrightness}
                onChange={(e) => setLightBrightness(parseInt(e.target.value, 10))}
                className="w-full accent-rose-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400">
                <span>Dịu nhẹ ban đêm</span>
                <span>Chuẩn Studio ngoài trời</span>
                <span>Rực rỡ sắc nét</span>
              </div>
            </div>

            {/* Artisan Specifications */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Đặc Quyền Kỹ Thuật Độc Bản
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span><strong>Sừng trâu nước ĐBSCL:</strong> Xử lý nhiệt chân không phẳng mịn, không rạn nứt trước độ ẩm Sài Gòn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span><strong>Khay lót nhung tơ tằm:</strong> Kháng ẩm, bảo vệ đồng hồ xa xỉ và nữ trang kim cương khỏi trầy xước.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span><strong>Nạm vàng 24K thủ công:</strong> Từng cánh hoa đào được nghệ nhân tỉ mỉ khảm ngập vào thớ gỗ mun sọc.</span>
                </li>
              </ul>
            </div>

            {/* Direct Line */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-300 block">Đặt chế tác tráp gương may đo:</span>
                <span className="text-stone-400 text-[11px] font-mono">Bảo hành mộng vĩnh viễn</span>
              </div>
              <a
                href="tel:0368757916"
                className="px-3 py-2 rounded-lg bg-rose-900/70 hover:bg-rose-800 text-rose-200 font-mono text-xs font-semibold transition-colors min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-mono text-stone-500">
          GUHOMES ATELIER DE LUXE · 14 ĐƯỜNG 41, AN KHÁNH, THỦ ĐỨC · HOTLINE: 0368 757 916
        </div>
      </div>
    </section>
  )
}
