'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface ArtisanBasin {
  id: string
  nameVi: string
  materialVi: string
  craftsmanshipHoursVi: string
  weightKgVi: string
  heatRetentionMinutesVi: string
  tactileSensationVi: string
  descriptionVi: string
  accentColor: string
}

const ARTISAN_BASINS: ArtisanBasin[] = [
  {
    id: 'monolithic-basalt-tub',
    nameVi: 'Bồn Tắm Đá Sa Thạch Bazan Nguyên Khối (Monolithic Basalt Tub)',
    materialVi: 'Khối đá sa thạch bazan xám tự nhiên khai thác mỏ đá ngầm Gia Lai',
    craftsmanshipHoursVi: '140 Giờ đục lòng chảo & chẻ rãnh thủ công',
    weightKgVi: '1.450 kg (Nguyên khối không ghép nối)',
    heatRetentionMinutesVi: 'Duy trì nước ấm 39°C trong 50 phút',
    tactileSensationVi: 'Bề mặt lòng bồn mài mịn đầm tay như lụa nước, gờ ngoài chẻ thô Wabi-Sabi mộc mạc',
    descriptionVi:
      'Được tạc trực tiếp từ một tảng đá tự nhiên nặng gần 3 tấn. Cấu trúc tinh thể sa thạch hấp thụ nhiệt lượng từ dòng nước nóng rồi từ từ bức xạ ngược lại, giữ cho gia chủ ngâm mình thư thái suốt gần 1 giờ đồng hồ mà nước vẫn ấm áp.',
    accentColor: '#4a5568',
  },
  {
    id: 'yen-bai-oval-marble',
    nameVi: 'Bồn Tắm Cẩm Thạch Trắng Thấu Quang (Translucent White Marble Tub)',
    materialVi: 'Đá cẩm thạch trắng Yên Bái kết tinh hạt ngọc thấu quang',
    craftsmanshipHoursVi: '110 Giờ mài nước nhẵn mờ (Honed Finish)',
    weightKgVi: '1.200 kg',
    heatRetentionMinutesVi: 'Duy trì nước ấm 39°C trong 45 phút',
    tactileSensationVi: 'Mịn màng không tì vết, ánh nến lung linh xuyên qua thành bồn dày 50mm',
    descriptionVi:
      'Từng đường cong elip được nghệ nhân vuốt tay chuẩn mực theo công thái học cơ thể người. Khi ngâm bồn với tinh dầu thảo mộc và ánh nến, thành đá cẩm thạch phát quang dịu nhẹ như một kén ngọc tĩnh tại giữa phòng tắm master.',
    accentColor: '#94a3b8',
  },
  {
    id: 'hand-hammered-bronze',
    nameVi: 'Chậu Rửa & Bồn Tắm Đồng Thau Đúc Cát (Hand-Hammered Cast Bronze)',
    materialVi: 'Hợp kim đồng thau C360 đúc khuôn cát & gõ búa tạo vảy cá cổ truyền',
    craftsmanshipHoursVi: '85 Giờ rèn gõ & ủ rêu phong tự nhiên',
    weightKgVi: '180 kg',
    heatRetentionMinutesVi: 'Dẫn nhiệt êm ái, khử khuẩn tự nhiên Oligodynamic',
    tactileSensationVi: 'Hàng nghìn vết gõ búa thủ công tạo nhịp điệu xúc giác ấm áp rền vang',
    descriptionVi:
      'Đồng thau sống mang hiệu ứng kháng khuẩn tự nhiên (Oligodynamic effect), tiêu diệt vi khuẩn trong nước chỉ sau vài phút tiếp xúc. Lớp gỉ đồng màu nâu chocolate sẫm tôn vinh vẻ đẹp trầm mặc của thời gian.',
    accentColor: '#b45309',
  },
]

export function ArtisanHandCastBronzeBasinVault({ className }: { className?: string } = {}) {
  const [activeBasinId, setActiveBasinId] = useState<string>('monolithic-basalt-tub')
  const [soakingMinutes, setSoakingMinutes] = useState<number>(30)

  const currentBasin =
    ARTISAN_BASINS.find((b) => b.id === activeBasinId) ?? ARTISAN_BASINS[0]!

  // Dynamic Thermal Degradation Model
  // Acrylic tub cools rapidly: 41C -> 33C after 30 mins
  // GuHomes Stone tub maintains heat: 41C -> 39.5C after 30 mins, 38.5C after 50 mins
  const acrylicTemp = Math.max(28, 41.5 - (soakingMinutes / 30) * 8.5).toFixed(1)
  const stoneTemp = Math.max(38, 41.5 - (soakingMinutes / 50) * 3.0).toFixed(1)

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0d10] py-24 text-[#eae6e1] border-t border-[#1e2026]', className)}>
      {/* Warm Steamy Spa Mist Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(180,83,9,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3d2f24] bg-[#1a140f] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d97706]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d97706] animate-ping" />
            Thánh Địa Tắm Khoáng Thư Giãn · Monolithic Stone &amp; Cast Bronze Vault
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf6f0]">
            Bồn Tắm Đá Sa Thạch 1.4 Tấn &amp; Chậu Đồng Đúc Cát
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a89f94]">
            Từ chối những bồn tắm composite nhẹ tênh mau nguội nước, GuHomes mang đến trải nghiệm ngâm khoáng đất mẹ nguyên bản. Từng chiếc bồn tắm được đục đẽo hơn 100 giờ từ khối sa thạch bazan hoặc cẩm thạch tự nhiên — giữ làn nước khoáng nóng 39°C bền bỉ suốt 50 phút thư giãn trọn vẹn.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 3 Sculptural Mediums */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#2b2722] bg-[#131210]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#24201b] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d97706]">
                    Bộ Sưu Tập Điêu Khắc Phòng Tắm Master
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf6f0]">
                    Đá Sa Thạch Bazan · Cẩm Thạch · Đồng Đúc C360
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#201912] px-3 py-1 text-xs font-mono text-[#fbbf24]">
                  <span>Đục tay: 100+ Giờ</span>
                </div>
              </div>

              {/* Basin Chips */}
              <div className="mt-6 flex flex-col gap-2.5">
                {ARTISAN_BASINS.map((basin) => {
                  const isSelected = basin.id === activeBasinId
                  return (
                    <button
                      key={basin.id}
                      type="button"
                      onClick={() => setActiveBasinId(basin.id)}
                      className={cn(
                        'flex items-center justify-between p-3.5 rounded-xl border text-left transition-all min-h-[56px]',
                        isSelected
                          ? 'border-[#d97706] bg-[#221810] text-white shadow-[0_0_15px_rgba(217,119,6,0.18)]'
                          : 'border-[#24201b] bg-[#0e0d0b] text-[#91877d] hover:border-[#382f27] hover:text-[#ede4db]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: basin.accentColor }}
                        />
                        <div>
                          <span className="block text-xs sm:text-sm font-medium">
                            {basin.nameVi.split(' (')[0]}
                          </span>
                          <span className="block text-[11px] text-[#786e64] line-clamp-1">
                            {basin.materialVi}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#d97706]/80 hidden sm:inline">
                        {basin.weightKgVi.split(' ')[0]} kg
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Basin Detailed Inspection */}
              <div className="mt-6 rounded-xl border border-[#382c21] bg-[#1a140f] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d97706]">
                    TRỌNG LƯỢNG {currentBasin.weightKgVi}
                  </span>
                  <span className="rounded-full bg-[#291e14] px-2.5 py-0.5 font-mono text-[10px] text-[#fbbf24]">
                    {currentBasin.craftsmanshipHoursVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#fbf6f0]">
                  {currentBasin.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#c9bfae]">
                  {currentBasin.descriptionVi}
                </p>

                {/* Tactile Experience */}
                <div className="mt-4 rounded-lg bg-[#0d0c09] p-3 border border-[#262019]">
                  <span className="block font-mono text-[10px] uppercase text-[#7a6e61]">
                    Xúc Giác Da Thịt Khi Chạm Vào (Tactile Sensation)
                  </span>
                  <p className="mt-1 text-xs text-[#dcd2c4] italic">
                    "{currentBasin.tactileSensationVi}"
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#262019]">
                  <div className="rounded-lg bg-[#110f0b] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6e61]">Nguồn Gốc Vật Liệu</span>
                    <span className="mt-1 block text-xs font-medium text-[#ede4db]">
                      {currentBasin.materialVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#110f0b] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6e61]">Khả Năng Giữ Nhiệt</span>
                    <span className="mt-1 block text-xs font-medium text-[#d97706]">
                      {currentBasin.heatRetentionMinutesVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Thermal Heat Retention Curve & Mineral Bath Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#2b2722] bg-[#131210]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#24201b] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d97706]">
                    Thử Nghiệm Giữ Nhiệt Độ Nước Khoáng
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf6f0]">
                    Bồn Đá Khối vs Bồn Nhựa Acrylic
                  </h3>
                </div>
              </div>

              {/* Time Slider */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-mono text-[#a89f94]">
                  <span>Thời Gian Ngâm Bồn:</span>
                  <span className="font-bold text-[#fbbf24]">{soakingMinutes} Phút</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={soakingMinutes}
                  onChange={(e) => setSoakingMinutes(Number(e.target.value))}
                  className="mt-2 w-full h-2 rounded-lg bg-[#24201b] accent-[#d97706] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#786e64] mt-1">
                  <span>5 Phút (Khởi Đầu 41.5°C)</span>
                  <span>50 Phút (Thư Giãn Sâu)</span>
                </div>
              </div>

              {/* Temperature Comparison Visualizer */}
              <div className="mt-6 space-y-4">
                {/* Traditional Acrylic Tub */}
                <div className="rounded-xl border border-blue-900/40 bg-blue-950/20 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-blue-300 font-medium">Bồn Tắm Nhựa Acrylic Thông Thường (Mau Nguội)</span>
                    <span className="font-mono font-bold text-blue-400 text-base">{acrylicTemp}°C</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-blue-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${(Number(acrylicTemp) / 42) * 100}%` }}
                    />
                  </div>
                  <span className="mt-1 block text-[10px] text-blue-300/80">
                    Sau 25-30 phút nước đã hạ nhiệt xuống dưới thân nhiệt, gây cảm giác lạnh lưng và nổi da gà.
                  </span>
                </div>

                {/* GuHomes Stone Monolithic Tub */}
                <div className="rounded-xl border border-[#3d2f24] bg-[#221810]/70 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#fbbf24] font-medium">
                      Bồn Tắm Đá Bazan Nguyên Khối GuHomes
                    </span>
                    <span className="font-mono font-bold text-[#f59e0b] text-xl">{stoneTemp}°C</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-[#0d0c0a] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#b45309] to-[#fbbf24] rounded-full transition-all duration-300"
                      style={{ width: `${(Number(stoneTemp) / 42) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#d97706]">
                    <span>Ấm hơn bồn thường:</span>
                    <span className="font-bold text-[#fef3c7]">
                      +{(Number(stoneTemp) - Number(acrylicTemp)).toFixed(1)}°C (Năng lượng đá mẹ bức xạ)
                    </span>
                  </div>
                </div>
              </div>

              {/* Waterfall & Aromatherapy Details */}
              <div className="mt-6 rounded-xl border border-[#2b2722] bg-[#0f0e0c] p-4 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#d97706] uppercase block">
                  Tiện Nghi Thủy Lực Đi Kèm:
                </span>
                <div className="flex items-center gap-2 text-[#b0a597]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                  <span>Vòi xả thác đá âm tường dòng chảy phẳng (Laminar Flow) không bắn nước.</span>
                </div>
                <div className="flex items-center gap-2 text-[#b0a597]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                  <span>Khay gác bồn gỗ Teak chống nước để ly rượu vang và sách đọc thư giãn.</span>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#24201b]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#d97706] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#140e08] hover:bg-[#fbbf24] transition-all shadow-[0_4px_20px_rgba(217,119,6,0.2)]"
                >
                  <span>Dự toán bồn tắm đá khối may đo cho phòng master</span>
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
