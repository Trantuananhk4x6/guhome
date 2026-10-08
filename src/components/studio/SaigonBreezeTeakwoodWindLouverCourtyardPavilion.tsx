'use client'

import React, { useState } from 'react'

interface LouverOrientationMode {
  angleDegrees: number
  title: string
  solarProtectionPercent: number
  breezeAirflowVelocityMs: number
  thermalDropCelsius: number
  description: string
  bestTimeOfDay: string
}

const LOUVER_MODES: LouverOrientationMode[] = [
  {
    angleDegrees: 0,
    title: 'Mở Tràn Đón Gió Sông',
    solarProtectionPercent: 15,
    breezeAirflowVelocityMs: 3.8,
    thermalDropCelsius: -1.2,
    description: 'Hệ 24 nan lam gỗ Teak mở song song 0 độ, đón trọn vẹn luồng gió đối lưu từ sông Sài Gòn vào buổi sớm ban mai.',
    bestTimeOfDay: '06:00 - 09:00 (Ban mai trong lành)',
  },
  {
    angleDegrees: 45,
    title: 'Tán Xạ Nắng Đứng Trưa',
    solarProtectionPercent: 78,
    breezeAirflowVelocityMs: 2.4,
    thermalDropCelsius: -3.5,
    description: 'Góc nghiêng 45 độ bẻ gãy tia bức xạ mặt trời trực tiếp, dẫn luồng không khí mát vào hiên nhà và giếng trời.',
    bestTimeOfDay: '11:00 - 13:30 (Đỉnh bức xạ nhiệt)',
  },
  {
    angleDegrees: 75,
    title: 'Khóa Nắng Tây Gay Gắt',
    solarProtectionPercent: 96,
    breezeAirflowVelocityMs: 1.6,
    thermalDropCelsius: -6.2,
    description: 'Lớp khiên Teak già 75 độ triệt tiêu 96% bức xạ nhiệt gay gắt hướng Tây, bảo vệ hệ vách kính và thớ gỗ nội thất.',
    bestTimeOfDay: '14:30 - 17:00 (Nắng xiên rát bỏng)',
  },
  {
    angleDegrees: 90,
    title: 'Đóng Kín Chắn Mưa Giông',
    solarProtectionPercent: 100,
    breezeAirflowVelocityMs: 0.2,
    thermalDropCelsius: -2.0,
    description: 'Các nan lam khép ngàm kín khí, khe hèm ziczac ngăn nước mưa tạt và bụi bẩn khi giông lốc nhiệt đới tràn về.',
    bestTimeOfDay: 'Mùa mưa giông chiều tháng 6 - tháng 10',
  },
]

export function SaigonBreezeTeakwoodWindLouverCourtyardPavilion() {
  const [selectedModeIdx, setSelectedModeIdx] = useState<number>(1)
  const [customAngle, setCustomAngle] = useState<number>(45)

  const activeMode = LOUVER_MODES[selectedModeIdx] ?? LOUVER_MODES[0]!

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(217,119,6,0.25),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Kiến Trúc Khí Động Học & Vi Khí Hậu
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Thảo Đình Lam Gỗ Teak Xoay Chắn Nắng Tây
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Hệ 24 nan lam Teak miệt vườn bản rộng 280mm xoay chuyển linh hoạt theo góc chiếu của mặt trời. 
            Vừa cản tới 96% bức xạ nhiệt buổi chiều, vừa gom trọn gió sông Sài Gòn làm mát toàn bộ không gian sống.
          </p>
        </div>

        {/* Louver Modes Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {LOUVER_MODES.map((mode, idx) => {
            const isSelected = idx === selectedModeIdx
            return (
              <button
                key={mode.angleDegrees}
                onClick={() => {
                  setSelectedModeIdx(idx)
                  setCustomAngle(mode.angleDegrees)
                }}
                className={`p-4 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-amber-600/80 shadow-lg shadow-amber-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-amber-400">GÓC {mode.angleDegrees}°</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      -{Math.abs(mode.thermalDropCelsius)}°C
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-stone-200">{mode.title}</h3>
                </div>
                <span className="text-[10px] font-mono text-stone-400 mt-2 block line-clamp-1">
                  {mode.bestTimeOfDay}
                </span>
              </button>
            )
          })}
        </div>

        {/* Interactive Louver Canvas & Metrics */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Louver Schematic Representation */}
            <div className="lg:col-span-6 bg-stone-950 border border-stone-800 rounded-xl p-6 flex flex-col justify-between min-h-[340px] relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span>TRỤC XOAY NAN LAM CƠ KHÍ</span>
                <span className="text-amber-400 font-semibold">GÓC ĐANG XOAY: {customAngle}°</span>
              </div>

              {/* Graphic Louver Blades */}
              <div className="my-8 flex justify-center items-center gap-4 py-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-36 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 rounded-sm shadow-md transition-transform duration-500 border border-amber-600/40"
                    style={{
                      transform: `rotate(${customAngle}deg)`,
                      transformOrigin: 'center center',
                    }}
                  />
                ))}
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">KHÍ KHẨU THỰC ĐỊA:</span>
                <span className="text-amber-300 font-medium">{activeMode.description}</span>
              </div>
            </div>

            {/* Metrics & Custom Slider */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-lg font-serif text-stone-100 mb-1">Hiệu Suất Khí Động Học & Che Nắng</h4>
                <p className="text-xs text-stone-400">
                  Mô phỏng bức xạ thực tế mặt tiền hướng Tây Nam bán đảo Thủ Thiêm và Thảo Điền.
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block mb-1">CẢN BỨC XẠ NHIỆT MẶT TRỜI</span>
                  <span className="text-2xl font-mono text-amber-300 font-light">
                    {activeMode.solarProtectionPercent}%
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-1">Giảm tải công suất điều hòa</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block mb-1">VẬN TỐC GIÓ ĐỐI LƯU SÔNG</span>
                  <span className="text-2xl font-mono text-emerald-300 font-light">
                    {activeMode.breezeAirflowVelocityMs} <span className="text-sm">m/s</span>
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-1">Lưu thông gió tự nhiên</span>
                </div>
              </div>

              {/* Free Custom Angle Slider */}
              <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label htmlFor="custom-louver-angle-slider" className="text-stone-300 font-medium">ĐIỀU CHỈNH GÓC XOAY THỦ CÔNG</label>
                  <span className="text-amber-400 font-semibold">{customAngle} Độ</span>
                </div>
                <input
                  id="custom-louver-angle-slider"
                  type="range"
                  min="0"
                  max="90"
                  step="1"
                  value={customAngle}
                  onChange={(e) => setCustomAngle(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>0° (Mở thoáng)</span>
                  <span>45° (Tán quang)</span>
                  <span>75° (Chắn nắng gắt)</span>
                  <span>90° (Đóng kín)</span>
                </div>
              </div>

              {/* Craftsmanship Note */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300 font-mono block mb-1 uppercase tracking-wider text-[11px]">
                  Tiêu Chuẩn Mộc Thạnh Xuân:
                </strong>
                Gỗ Teak già trên 30 năm tuổi chứa hàm lượng tinh dầu silica tự nhiên cao, trơ trước mưa nắng nhiệt đới, 
                không cong vênh hay nứt tét dưới ánh nắng mặt trời Sài Gòn.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Contact Line */}
        <div className="text-center text-xs font-mono text-stone-400">
          <span>TƯ VẤN THIẾT KẾ LAM CHẮN NẮNG TÂY: </span>
          <a
            href="tel:0368757916"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-4 ml-1 font-semibold"
          >
            0368 757 916
          </a>
          <span className="mx-2 text-stone-600">·</span>
          <span>KTS TRƯỞNG GUHOMES (TRẦN 12 CÔNG TRÌNH/NĂM)</span>
        </div>
      </div>
    </section>
  )
}
