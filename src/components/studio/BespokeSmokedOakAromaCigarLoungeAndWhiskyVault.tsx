'use client'

import React, { useState } from 'react'

interface StorageVaultProfile {
  id: string
  title: string
  subtitle: string
  temperatureC: number
  humidityRh: number
  lightSpectrumKelvin: number
  corkPreservationYears: number
  timberLining: string
  sensoryNotes: string
}

const VAULT_PROFILES: StorageVaultProfile[] = [
  {
    id: 'cigar-aging',
    title: 'Khoang Ủ Cigar Khí Hậu Tây Ban Nha',
    subtitle: 'Nhiệt ẩm chuẩn mực cho Cohiba Behike & Davidoff Royal Release',
    temperatureC: 18.5,
    humidityRh: 70,
    lightSpectrumKelvin: 2200,
    corkPreservationYears: 15,
    timberLining: 'Gỗ Tuyết Tùng Tây Ban Nha (Spanish Cedar) nguyên tấm',
    sensoryNotes: 'Hương gỗ đượm nồng tinh dầu tự nhiên, triệt tiêu vi khuẩn và giữ lá xì gà dẻo dai nguyên bản dưới khí hậu Sài Gòn.',
  },
  {
    id: 'grand-cru-vault',
    title: 'Hầm Vang Bordeaux & Burgundy Grand Cru',
    subtitle: 'Kệ nghiêng 15 độ giữ ẩm nút bần và bảo toàn tannin',
    temperatureC: 14.0,
    humidityRh: 72,
    lightSpectrumKelvin: 2400,
    corkPreservationYears: 25,
    timberLining: 'Gỗ Sồi Châu Âu hun khói tự nhiên sấy chân không',
    sensoryNotes: 'Không rung lắc, triệt tiêu sóng xung chấn của đô thị, môi trường vi khí hậu bóng tối tĩnh tuyệt đối.',
  },
  {
    id: 'single-malt-scotch',
    title: 'Tủ Trưng Bày Single Malt Whisky Thửa Riêng',
    subtitle: 'Đứng thẳng trang trọng bên vách đá thạch anh xuyên sáng',
    temperatureC: 16.5,
    humidityRh: 62,
    lightSpectrumKelvin: 2700,
    corkPreservationYears: 30,
    timberLining: 'Gỗ Óc Chó đen Bắc Mỹ (FAS) kết hợp Inox mạ Titanium Gold',
    sensoryNotes: 'Đá thạch anh núi Sông Bé dẫn quang ánh hổ phách quyến rũ, tôn vinh sắc thái các dòng Macallan và Yamazaki quý hiếm.',
  },
]

export function BespokeSmokedOakAromaCigarLoungeAndWhiskyVault() {
  const [activeProfileIdx, setActiveProfileIdx] = useState<number>(0)
  const [ambientLightIntensity, setAmbientLightIntensity] = useState<number>(65)
  const [isCabinetDoorAjar, setIsCabinetDoorAjar] = useState<boolean>(false)

  const activeProfile = VAULT_PROFILES[activeProfileIdx] ?? VAULT_PROFILES[0]!

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background warm amber glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_center,rgba(180,83,9,0.25),transparent_75%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Hầm Trữ Bộ Sưu Tập May Đo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Hầm Cigar Gỗ Sồi Hun Khói & Whisky Vault
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Kiến tạo không gian tĩnh lặng cho những thú vui tao nhã. Kết hợp gỗ Tuyết Tùng Tây Ban Nha tỏa hương, 
            vách thạch anh núi Sông Bé dẫn quang dịu mắt và hệ thống điều hòa ẩm 3 vùng độc lập.
          </p>
        </div>

        {/* Profile Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {VAULT_PROFILES.map((profile, idx) => {
            const isSelected = idx === activeProfileIdx
            return (
              <button
                key={profile.id}
                onClick={() => setActiveProfileIdx(idx)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 min-h-[44px] flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-amber-900/60 border border-amber-600 text-amber-200 shadow-lg shadow-amber-950/50'
                    : 'bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <span className="font-mono text-xs opacity-75">0{idx + 1}</span>
                <span>{profile.title}</span>
              </button>
            )
          })}
        </div>

        {/* Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Visual Showcase Box */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-6 border-b border-stone-800 pb-3">
                <span>TIÊU CHUẨN KHO TRỮ ĐỘC BẢN</span>
                <span className="text-amber-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  XƯỞNG MỘC THẠNH XUÂN 1.200M2
                </span>
              </div>

              {/* Graphic Representation of Cabinet Interior */}
              <div
                className="relative rounded-xl border border-amber-900/40 p-6 flex flex-col items-center justify-center transition-all duration-500 min-h-[260px]"
                style={{
                  backgroundColor: `rgba(28, 25, 23, ${0.4 + ambientLightIntensity * 0.005})`,
                  boxShadow: `inset 0 0 50px rgba(180, 83, 9, ${ambientLightIntensity * 0.004})`,
                }}
              >
                <div className="text-center max-w-md">
                  <span className="text-xs font-mono text-amber-400/90 uppercase tracking-widest block mb-2">
                    Lớp Vật Liệu Lót Khoang Trữ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-stone-100 mb-3 font-normal">
                    {activeProfile.timberLining}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {activeProfile.sensoryNotes}
                  </p>
                </div>

                {/* Cabinet Door Open/Close Toggle */}
                <div className="mt-8 flex items-center gap-3">
                  <button
                    onClick={() => setIsCabinetDoorAjar(!isCabinetDoorAjar)}
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors min-h-[44px] border border-stone-700 flex items-center gap-2"
                  >
                    <span>CỬA KHÓA NAM CHÂM NEODYMIUM:</span>
                    <span className={isCabinetDoorAjar ? 'text-amber-400' : 'text-emerald-400'}>
                      {isCabinetDoorAjar ? 'ĐANG MỞ (HÉ)' : 'ĐÓNG KÍN KHÍ'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Microclimate Sensors Bar */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-stone-800/80 text-center">
              <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 block mb-0.5">NHIỆT ĐỘ KHÍ HẬU</span>
                <span className="text-lg font-mono text-amber-300 font-medium">{activeProfile.temperatureC}°C</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 block mb-0.5">ĐỘ ẨM TƯƠNG ĐỐI</span>
                <span className="text-lg font-mono text-cyan-300 font-medium">{activeProfile.humidityRh}% RH</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] font-mono text-stone-400 block mb-0.5">TUỔI THỌ NÚT BẦN</span>
                <span className="text-lg font-mono text-emerald-300 font-medium">+{activeProfile.corkPreservationYears} Năm</span>
              </div>
            </div>
          </div>

          {/* Interactive Controls & Craftsmanship Details */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Lighting Control Box */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="ambient-light-slider" className="text-sm font-medium text-stone-200">ĐÈN THẠCH ANH XUYÊN SÁNG</label>
                <span className="text-xs font-mono text-amber-400">{ambientLightIntensity}% Công suất</span>
              </div>
              <input
                id="ambient-light-slider"
                type="range"
                min="10"
                max="100"
                value={ambientLightIntensity}
                onChange={(e) => setAmbientLightIntensity(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-400">
                <span>Dịu nhẹ (2200K)</span>
                <span>Tiêu chuẩn thưởng thức</span>
                <span>Hắt sáng rực rỡ</span>
              </div>

              <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
                <span>Quang phổ lọc sạch tia UV:</span>
                <span className="text-amber-300 font-mono font-medium">CRI 98 (Zero UV Radiation)</span>
              </div>
            </div>

            {/* Joinery & Hardware Specifications */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Quy Cách Phụ Kiện Cơ Khí Mộng Gỗ
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Ray âm Blum Movento:</strong> Tải trọng 70kg, giảm chấn thủy lực êm ái trọn đời.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Mộng ghép Finger Joint:</strong> Khóa góc gỗ Sồi hun khói hạn chế cong vênh dưới độ ẩm Sài Gòn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Kính hộp Low-E 3 lớp:</strong> Bơm khí trơ Argon cách nhiệt tuyệt đối, ngăn đọng sương bề mặt kính.</span>
                </li>
              </ul>
            </div>

            {/* Booking Callout */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs">
              <div className="text-stone-300 mb-2">
                Hầm Cigar và Tủ Rượu May Đo được thiết kế chuẩn xác theo kích thước mặt bằng và thói quen sưu tầm của từng gia chủ.
              </div>
              <div className="flex items-center justify-between text-stone-400 font-mono text-[11px]">
                <span>Tư vấn KTS Trưởng:</span>
                <a href="tel:0368757916" className="text-amber-400 hover:underline font-bold">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-mono text-stone-500">
          GUHOMES BESPOKE JOINERY · XƯỞNG MAY ĐO THẠNH XUÂN 1.200M2 · EMAIL: GUHOMESVN@GMAIL.COM
        </div>
      </div>
    </section>
  )
}
