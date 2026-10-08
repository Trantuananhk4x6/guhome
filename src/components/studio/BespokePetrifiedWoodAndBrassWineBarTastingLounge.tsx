'use client'

import React, { useState } from 'react'

interface TastingLoungeLightingPreset {
  id: string
  name: string
  cctKelvin: number
  description: string
  winePairing: string
  crystalChillingTempC: number
}

const LIGHTING_PRESETS: TastingLoungeLightingPreset[] = [
  {
    id: 'twilight-amber',
    name: 'Hoàng Hôn Hổ Phách 2200K',
    cctKelvin: 2200,
    description: 'Ánh sáng ấm áp len qua từng thớ đá gỗ hóa thạch, làm rực lên sắc vàng óng của nhựa cây hóa ngọc hàng triệu năm.',
    winePairing: 'Single Malt Whisky & Port Wine cổ điển',
    crystalChillingTempC: -2.0,
  },
  {
    id: 'sommelier-intimate',
    name: 'Sommelier Intimate 2700K',
    cctKelvin: 2700,
    description: 'Nhiệt độ màu chuẩn mực của các hầm rượu vang Pháp cao cấp, phản ánh trung thực màu đỏ ruby của vang Bordeaux.',
    winePairing: 'Grand Cru Classé & Super Tuscan',
    crystalChillingTempC: -4.5,
  },
  {
    id: 'mineral-radiance',
    name: 'Chiêm Ngưỡng Vân Ngọc 3500K',
    cctKelvin: 3500,
    description: 'Quang phổ tự nhiên chiếu rọi độ trong suốt của tinh thể thạch anh chalcedony và opal ẩn sâu trong lòng phiến đá.',
    winePairing: 'Champagne Vintage & Vang Trắng Burgundy',
    crystalChillingTempC: -1.5,
  },
]

export function BespokePetrifiedWoodAndBrassWineBarTastingLounge() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0)
  const [isChillingActive, setIsChillingActive] = useState<boolean>(true)
  const [backlightIntensity, setBacklightIntensity] = useState<number>(70)

  const activePreset = LIGHTING_PRESETS[selectedPresetIdx] ?? LIGHTING_PRESETS[0]!

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background warm amber glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_bottom_left,rgba(180,83,9,0.25),transparent_75%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Đảo Bar Độc Bản Thưởng Rượu
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Đảo Bar Đá Gỗ Hóa Thạch Núi Lửa & Đồng Thau
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Phiến đá gỗ hóa thạch triệu năm từ Pleiku nặng 420kg kết hợp viền đồng thau đúc mộc 5mm. 
            Tích hợp khay đá bazan ướp lạnh ly pha lê Riedel ở -4.5 độ C và đèn LED hắt sáng gầm đảo bar tôn vinh sắc rượu.
          </p>
        </div>

        {/* Lighting Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {LIGHTING_PRESETS.map((preset, idx) => {
            const isSelected = idx === selectedPresetIdx
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetIdx(idx)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 min-h-[44px] flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-amber-900/60 border border-amber-600 text-amber-200 shadow-lg shadow-amber-950/50'
                    : 'bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <span className="font-mono text-xs opacity-75">0{idx + 1}</span>
                <span>{preset.name}</span>
              </button>
            )
          })}
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-6 border-b border-stone-800 pb-3">
                <span>ĐÁ GỖ HÓA THẠCH PLEIKU NGUYÊN KHỐI</span>
                <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ĐỘ CỨNG MOHS: 7.0 / 10
                </span>
              </div>

              {/* Graphic Representation of Stone Island */}
              <div
                className="relative rounded-xl border border-amber-900/40 p-6 flex flex-col items-center justify-center transition-all duration-500 min-h-[260px]"
                style={{
                  backgroundColor: `rgba(28, 25, 23, ${0.4 + backlightIntensity * 0.005})`,
                  boxShadow: `inset 0 0 60px rgba(217, 119, 6, ${backlightIntensity * 0.004})`,
                }}
              >
                <div className="text-center max-w-md">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
                    Gợi Ý Thưởng Rượu Cùng Ánh Sáng
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-stone-100 mb-3 font-normal">
                    {activePreset.winePairing}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {activePreset.description}
                  </p>
                </div>

                {/* Chilling Toggle */}
                <div className="mt-8 flex items-center gap-3">
                  <button
                    onClick={() => setIsChillingActive(!isChillingActive)}
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors min-h-[44px] border border-stone-700 flex items-center gap-2"
                  >
                    <span>KHAY ĐÁ BAZAN ƯỚP LY PHA LÊ:</span>
                    <span className={isChillingActive ? 'text-cyan-400 font-bold' : 'text-stone-400'}>
                      {isChillingActive ? `${activePreset.crystalChillingTempC}°C (ĐANG ƯỚP LẠNH)` : 'TẮT LÀM LẠNH'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Badges */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-stone-800/80 text-center">
              <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 block mb-0.5">TRỌNG LƯỢNG MẶT ĐÁ</span>
                <span className="text-lg font-mono text-amber-300 font-medium">420 KG</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 block mb-0.5">VIỀN ĐỒNG THAU MỘC</span>
                <span className="text-lg font-mono text-yellow-400 font-medium">5.0 MM</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 block mb-0.5">CHỈ SỐ HOÀN MÀU</span>
                <span className="text-lg font-mono text-emerald-300 font-medium">CRI 98</span>
              </div>
            </div>
          </div>

          {/* Interactive Controls & Joinery Specs */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Backlight Dimmer */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="island-backlight-dimmer" className="text-sm font-medium text-stone-200">ĐÈN HẮT SÁNG GẦM ĐẢO BAR</label>
                <span className="text-xs font-mono text-amber-400">{backlightIntensity}% Công suất</span>
              </div>
              <input
                id="island-backlight-dimmer"
                type="range"
                min="10"
                max="100"
                value={backlightIntensity}
                onChange={(e) => setBacklightIntensity(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-400">
                <span>Ấm cúng huyền ảo</span>
                <span>Thưởng rượu đêm</span>
                <span>Chiếu sáng nghệ thuật</span>
              </div>
            </div>

            {/* Engineering Specifications */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Đặc Quyền Kỹ Thuật Đảo Bar GuHomes
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Khung thép hộp 100x100mm giấu chân:</strong> Chịu tải 1.2 tấn, triệt tiêu rung lắc khi pha chế cocktail.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Viền đồng thau bo cạnh R25mm:</strong> Cảm giác tì tay êm ái, lớp ten đồng tự nhiên biến đổi theo thời gian.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Bồn rửa âm đá bazan nguyên khối:</strong> Tiêu âm tiếng nước xả, không bám cặn vôi nguồn nước TP.HCM.</span>
                </li>
              </ul>
            </div>

            {/* Direct Line */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-300 block">Đặt may đo đảo bar đá hóa thạch:</span>
                <span className="text-stone-400 text-[11px] font-mono">Phiến đá độc bản có chứng thư xuất xứ</span>
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
          GUHOMES BESPOKE BAR ATELIER · 14 ĐƯỜNG 41, AN KHÁNH, THỦ ĐỨC · HOTLINE: 0368 757 916
        </div>
      </div>
    </section>
  )
}
