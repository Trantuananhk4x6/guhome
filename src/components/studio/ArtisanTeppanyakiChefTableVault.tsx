'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface TeppanHeatZone {
  id: string
  nameVi: string
  tempVi: string
  purposeVi: string
  culinaryUseVi: string
  powerWattsVi: string
}

const HEAT_ZONES: TeppanHeatZone[] = [
  {
    id: 'warming-zone',
    nameVi: 'Vùng 1: Giữ Ấm & Nghỉ Thịt (Warming Zone)',
    tempVi: '120°C Ổn Định',
    purposeVi: 'Nghỉ thịt bò Wagyu A5 sau khi áp chảo để nước ngọt phân bổ đều về lõi',
    culinaryUseVi: 'Giữ ấm đĩa sứ, rau củ nướng bơ tỏi và sốt vang đỏ mà không làm khô cứng bề mặt.',
    powerWattsVi: '1.200 W (Công nghệ cảm ứng đáy kép)',
  },
  {
    id: 'searing-zone',
    nameVi: 'Vùng 2: Áp Chảo Se Mặt Vàng Giòn (Searing Zone)',
    tempVi: '220°C Phản Ứng Maillard',
    purposeVi: 'Tạo lớp vỏ caramen hóa thơm lừng khóa trọn dịch ngọt bên trong hải sản và bít tết',
    culinaryUseVi: 'Áp chảo tôm hùm Nha Trang, sò điệp Hokkaido và thăn ngoại Wagyu thái hạt lựu.',
    powerWattsVi: '3.500 W (Thép đúc 25mm giữ nhiệt cực đầm)',
  },
  {
    id: 'flambe-zone',
    nameVi: 'Vùng 3: Khò Lửa & Biểu Diễn Flambé (Ultra Searing)',
    tempVi: '300°C Vũ Điệu Ngọn Lửa',
    purposeVi: 'Đốt rượu Cognac bốc cháy ngoạn mục trước mắt thực khách mà khói hút sạch ngay lập tức',
    culinaryUseVi: 'Nướng gan ngỗng béo Foie Gras, tráng miệng chuối đốt rượu Grand Marnier.',
    powerWattsVi: '4.800 W (Gia nhiệt tức thì trong 3 giây)',
  },
]

export function ArtisanTeppanyakiChefTableVault({ className }: { className?: string } = {}) {
  const [activeZoneId, setActiveZoneId] = useState<string>('searing-zone')
  const [plasmaExtractionActive, setPlasmaExtractionActive] = useState<boolean>(true)
  const [selectedPlateThickness] = useState<number>(25)

  const activeZone = HEAT_ZONES.find((z) => z.id === activeZoneId) ?? HEAT_ZONES[1]!

  return (
    <section className={cn('relative overflow-hidden bg-[#090b0e] py-24 text-[#e2e8f0] border-t border-[#1a2332]', className)}>
      {/* Cool Slate & Steel Indigo Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.05),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1e3a5f] bg-[#0c1e33] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-ping" />
            Nghệ Thuật Ẩm Thực Tại Gia · Artisan Teppanyaki Chef Table
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f8fafc]">
            Bàn Tiệc Teppanyaki Mặt Thép 25mm Hút Khói Tàng Hình
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#94a3b8]">
            Thưởng thức nghệ thuật ẩm thực của đầu bếp riêng ngay tại trung tâm dinh thự mà không vương mùi ra phòng khách. GuHomes kiến tạo bàn Teppanyaki nguyên khối với <span className="text-[#38bdf8] font-medium">mặt thép đúc nguyên tấm dày 25mm</span> kết hợp viền gỗ Sồi đầm lầy Bog Oak 500 năm tuổi cách nhiệt tuyệt đối và hệ thống hút khói âm bàn giấu khe buồng lọc Plasma Ozone 99.4%.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 3 Independent Heat Zones & Bog Oak Rim */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e293b] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                    Hệ Thống 3 Vùng Gia Nhiệt Độc Lập
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f8fafc]">
                    Mặt Thép Đúc Dày {selectedPlateThickness}mm Tôi Dầu Thực Vật
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#082f49] px-3.5 py-1 text-xs font-mono text-[#38bdf8]">
                  <span>Viền Bog Oak: 26°C Chạm Tay Mát Rượi</span>
                </div>
              </div>

              {/* Heat Zone Selectors */}
              <div className="mt-6 flex flex-col gap-3">
                {HEAT_ZONES.map((zone) => {
                  const isSelected = zone.id === activeZoneId
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setActiveZoneId(zone.id)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#38bdf8] bg-[#0c233c] text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'border-[#1e293b] bg-[#0b1322] text-[#94a3b8] hover:border-[#334155] hover:text-[#e2e8f0]'
                      )}
                    >
                      <div>
                        <span className="block text-sm font-medium font-serif text-[#f8fafc]">
                          {zone.nameVi}
                        </span>
                        <span className="block text-xs text-[#64748b] italic mt-0.5">
                          {zone.tempVi} · {zone.powerWattsVi}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#38bdf8] hidden sm:inline">
                        Kích hoạt →
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Zone Detail Card */}
              <div className="mt-6 rounded-xl border border-[#334155] bg-[#111c30] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#38bdf8] uppercase">{activeZone.tempVi}</span>
                  <span className="rounded-full bg-[#1e293b] px-2.5 py-0.5 text-[#7dd3fc]">
                    {activeZone.powerWattsVi}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#f8fafc]">
                  {activeZone.nameVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#94a3b8]">
                  {activeZone.purposeVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1e293b] text-xs">
                  <div className="rounded-lg bg-[#0b1322] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#64748b]">Ứng Dụng Món Ăn</span>
                    <span className="mt-1 block font-medium text-[#f1f5f9]">{activeZone.culinaryUseVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0b1322] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#64748b]">Vật Liệu Cốt Lõi</span>
                    <span className="mt-1 block font-medium text-[#38bdf8]">Thép hợp kim SUS420J2 tôi nhiệt cao tần</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 1.800 m³/h Downdraft Plasma Ozone Air Purification */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#1e293b] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                  Công Nghệ Hút Khói Âm Bàn Giấu Khe
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f8fafc]">
                  Lọc Plasma Ozone 99.4% Khử Mùi
                </h3>
              </div>

              {/* Extraction Switch */}
              <div className="mt-5 rounded-xl border border-[#1e293b] bg-[#111c30] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#38bdf8] uppercase block">
                      Tốc Độ Quạt Hút Âm Sàn (Downdraft Airflow)
                    </span>
                    <span className="text-xs text-[#94a3b8]">1.800 m³/h hút khói ngay mép bàn nướng</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPlasmaExtractionActive(!plasmaExtractionActive)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                      plasmaExtractionActive
                        ? 'bg-[#38bdf8] text-[#090b0e] font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                        : 'border border-[#334155] bg-[#1e293b] text-[#64748b]'
                    )}
                  >
                    {plasmaExtractionActive ? '⚡ HÚT: 1.800 m³/h' : '⏸ QUẠT: TẠM DỪNG'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e293b] text-[11px] font-mono">
                  <div>
                    <span className="text-[#64748b] block text-[10px]">MÙI THỨC ĂN KHUẾCH TÁN:</span>
                    <span className="text-[#38bdf8]">
                      {plasmaExtractionActive ? '0.0% (Khử sạch tại bàn)' : 'Nguy cơ bay vào rèm lụa'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block text-[10px]">ĐỘ ỒN ĐỘNG CƠ EC:</span>
                    <span className="text-[#f8fafc]">
                      {plasmaExtractionActive ? '&lt; 42 dBA (Êm dịu nói chuyện)' : '0 dBA'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bog Oak Thermal Insulation Specification */}
              <div className="mt-4 rounded-xl border border-[#1e293b] bg-[#0b1322] p-4 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#38bdf8] uppercase block">
                  Gỗ Sồi Đầm Lầy Bog Oak 500 Năm Tuổi:
                </span>
                <p className="text-[#94a3b8] leading-relaxed">
                  Viền ngoài bàn ăn bao quanh mặt thép được đóng từ gỗ Bog Oak cổ đại hóa thạch tự nhiên ngâm dưới lòng đầm lầy châu Âu. Cấu trúc tế bào gỗ đặc khít ngăn truyền nhiệt 100%, bảo vệ an toàn tuyệt đối cho thực khách khi tì tay thưởng rượu.
                </p>
                <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#38bdf8]">
                  <span>Nhiệt độ mặt thép: 300°C</span>
                  <span>→</span>
                  <span>Nhiệt độ viền gỗ: 26°C mát</span>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#1e293b]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#38bdf8] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#090b0e] hover:bg-[#7dd3fc] transition-all shadow-[0_4px_20px_rgba(56,189,248,0.25)]"
                >
                  <span>Dự toán lắp đặt bàn Teppanyaki tại tư gia</span>
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
