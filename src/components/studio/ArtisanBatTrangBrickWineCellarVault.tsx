'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface WineReserveBottle {
  id: string
  nameVi: string
  appellationVi: string
  vintageVi: string
  rfidTagVi: string
  caskAgingVi: string
  servingNotesVi: string
  storagePositionVi: string
}

const WINE_RESERVES: WineReserveBottle[] = [
  {
    id: 'chateau-margaux-2015',
    nameVi: 'Château Margaux Premier Grand Cru Classé',
    appellationVi: 'Margaux, Bordeaux, Pháp',
    vintageVi: 'Niên vụ 2015 (Vintage Xuất Sắc 99 Điểm)',
    rfidTagVi: 'RFID-MARGAUX-15-084',
    caskAgingVi: 'Ủ 24 tháng trong thùng gỗ sồi Pháp Allier nướng nhẹ',
    servingNotesVi: 'Cấu trúc tannin mượt như nhung, hương hoa violet, mâm xôi đen và gỗ tuyết tùng trầm mặc. Cần bảo quản tĩnh tại 14°C độ ẩm 72% RH để tannin tiếp tục tiến hóa.',
    storagePositionVi: 'Hộc Vòm Trung Tâm · Khay Gỗ Thông Bắc Âu Cố Định Triệt Rung',
  },
  {
    id: 'sassicaia-bolgheri-2018',
    nameVi: 'Tenuta San Guido Sassicaia Super Tuscan',
    appellationVi: 'Bolgheri Sassicaia DOC, Tuscany, Ý',
    vintageVi: 'Niên vụ 2018 (Huyền Thoại Địa Trung Hải)',
    rfidTagVi: 'RFID-SASS-18-192',
    caskAgingVi: 'Ủ 24 tháng trong thùng sồi Pháp Tronçais',
    servingNotesVi: 'Hương thơm phức hợp của anh đào dại, thảo mộc hương thảo, khoáng chất đất nung và thuốc lá Virginia ủ lâu năm.',
    storagePositionVi: 'Cánh Hữu Vòm Gạch Cổ · Vùng Tiếp Đất Triệt Rung Tuyệt Đối',
  },
  {
    id: 'opus-one-napa-2019',
    nameVi: 'Opus One Proprietary Red Wine',
    appellationVi: 'Oakville, Napa Valley, California',
    vintageVi: 'Niên vụ 2019 (Cân Bằng Hoàn Hảo)',
    rfidTagVi: 'RFID-OPUS-19-047',
    caskAgingVi: 'Ủ 19 tháng trong sồi Pháp mới 100%',
    servingNotesVi: 'Hòa quyện giữa mận đen chín mọng, cánh hoa hồng khô và socola đắng. Rượu cần bóng tối tuyệt đối để tránh quang hóa làm đục sắc rượu.',
    storagePositionVi: 'Cánh Tả Vòm Gạch · Khu Vực Ánh Sáng Vàng Nến 2000K',
  },
]

export function ArtisanBatTrangBrickWineCellarVault({ className }: { className?: string } = {}) {
  const [activeWineId, setActiveWineId] = useState<string>('chateau-margaux-2015')
  const [candleMode, setCandleMode] = useState<boolean>(true)
  const [targetHumidity, setTargetHumidity] = useState<number>(72)

  const activeBottle = WINE_RESERVES.find((b) => b.id === activeWineId) ?? WINE_RESERVES[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0908] py-24 text-[#e8ded6] border-t border-[#241712]', className)}>
      {/* Warm Terracotta & Ancient Brick Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(194,84,45,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#48281d] bg-[#1a0e0a] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#e06d44]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c2542d] animate-ping" />
            Dưỡng Rượu Vang Trong Lòng Đất Mẹ · Bat Trang Brick Wine Vault
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf6f2]">
            Hầm Rượu Vang Vòm Gạch Bát Tràng Thở Tự Nhiên
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b39e92]">
            Nói không với các vách ốp gỗ công nghiệp phát tán formaldehyde phá hủy hương vị rượu vang Grand Cru, GuHomes kiến tạo hầm rượu dưới lòng đất với <span className="text-[#e06d44] font-medium">vòm cuốn gạch nung thủ công Bát Tràng xây bằng vữa vôi vỏ sò</span>. Nền rải sỏi sông cuội giữ ẩm tự nhiên 70–75% RH, nhiệt độ tĩnh 14°C và triệt tiêu rung chấn kết cấu dưới 0.005 mm/s.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Wine Library & RFID Cellar Inventory */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#3b1e15] bg-[#140b07]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2b150d] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#e06d44]">
                    Quản Lý Bộ Sưu Tập 1.200 Chai Grand Cru
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf6f2]">
                    Thẻ RFID Gỗ Thông Định Danh Từng Vị Trí
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#24110a] px-3.5 py-1 text-xs font-mono text-[#e06d44]">
                  <span>Rung chấn: &lt; 0.005 mm/s (Siêu tĩnh)</span>
                </div>
              </div>

              {/* Wine Selectors */}
              <div className="mt-6 flex flex-col gap-3">
                {WINE_RESERVES.map((bottle) => {
                  const isSelected = bottle.id === activeWineId
                  return (
                    <button
                      key={bottle.id}
                      type="button"
                      onClick={() => setActiveWineId(bottle.id)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#e06d44] bg-[#241109] text-white shadow-[0_0_15px_rgba(224,109,68,0.18)]'
                          : 'border-[#29130b] bg-[#110704] text-[#9c8275] hover:border-[#421f12] hover:text-[#e8ded6]'
                      )}
                    >
                      <div>
                        <span className="block text-sm font-medium font-serif text-[#fbf6f2]">
                          {bottle.nameVi}
                        </span>
                        <span className="block text-xs text-[#9d7d6f] italic mt-0.5">
                          {bottle.appellationVi} · {bottle.vintageVi}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#e06d44] hidden sm:inline">
                        {bottle.rfidTagVi}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Bottle Inspection */}
              <div className="mt-6 rounded-xl border border-[#3b1e15] bg-[#190c08] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#e06d44] uppercase">{activeBottle.appellationVi}</span>
                  <span className="rounded-full bg-[#29130b] px-2.5 py-0.5 text-[#f5a182]">
                    {activeBottle.rfidTagVi}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#fbf6f2]">
                  {activeBottle.nameVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#baa497]">
                  {activeBottle.servingNotesVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#27120a] text-xs">
                  <div className="rounded-lg bg-[#110704] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#73584c]">Ủ Thùng Gỗ Sồi</span>
                    <span className="mt-1 block font-medium text-[#f0e4dc]">{activeBottle.caskAgingVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#110704] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#73584c]">Vị Trí Trong Hầm Vòm</span>
                    <span className="mt-1 block font-medium text-[#e06d44]">{activeBottle.storagePositionVi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Natural Brick Vault Microclimate & Candlelight 2000K */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#3b1e15] bg-[#140b07]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#2b150d] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#e06d44]">
                  Vi Khí Hậu Vòm Gạch Cổ Điển
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf6f2]">
                  Nhiệt Tĩnh 14°C & Ẩm Tự Nhiên
                </h3>
              </div>

              {/* Natural Humidity Slider */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-mono text-[#a89083]">
                  <span>Độ Ẩm Tự Nhiên Qua Nền Sỏi Sông:</span>
                  <span className="font-bold text-[#e06d44]">{targetHumidity}% RH (Bảo Vệ Nút Bần)</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="80"
                  step="1"
                  value={targetHumidity}
                  onChange={(e) => setTargetHumidity(Number(e.target.value))}
                  className="mt-2 w-full h-2 rounded-lg bg-[#27120a] accent-[#e06d44] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#6e5245] mt-1">
                  <span>65% (Nguy cơ khô nút bần)</span>
                  <span>72% (Tối ưu Grand Cru)</span>
                  <span>80% (Nguy cơ ẩm tem nhãn)</span>
                </div>
              </div>

              {/* Amber Candlelight Mode 2000K */}
              <div className="mt-6 rounded-xl border border-[#3b1e15] bg-[#1a0d08] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#e06d44] uppercase block">
                      Chiếu Sáng Nến Hổ Phách 2000K Triệt Quang UV
                    </span>
                    <span className="text-xs text-[#b89e90]">Bảo vệ sắc tố anthocyanin và tannin không bị oxy hóa</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCandleMode(!candleMode)}
                    className={cn(
                      'px-3 py-1 rounded-full text-[11px] font-mono transition-all',
                      candleMode
                        ? 'bg-[#e06d44] text-[#0c0908] font-bold'
                        : 'border border-[#48281d] text-[#7a5b4e]'
                    )}
                  >
                    {candleMode ? '2000K Nến BẬT' : 'Ánh Sáng Thường'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27120a] text-[11px] font-mono">
                  <div>
                    <span className="text-[#6e5245] block text-[10px]">BỨC XẠ UV & TIA HỒNG NGOẠI:</span>
                    <span className="text-[#e06d44]">0.0 µW/lumen (Cắt 100%)</span>
                  </div>
                  <div>
                    <span className="text-[#6e5245] block text-[10px]">ĐỘ ỒN ĐIỀU HÒA TĨNH:</span>
                    <span className="text-[#fbf6f2]">&lt; 15 dBA (Hoàn toàn tĩnh)</span>
                  </div>
                </div>
              </div>

              {/* Natural Shell Lime Mortar Wood & Craft Specs */}
              <div className="mt-4 rounded-xl border border-[#2b150d] bg-[#110704] p-3 text-xs space-y-1.5">
                <span className="font-mono text-[10px] text-[#e06d44] uppercase block">
                  Kỹ Thuật Xây Dựng Bản Địa GuHomes:
                </span>
                <div className="flex items-center gap-2 text-[#a89083]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e06d44]" />
                  <span>Gạch mộc Bát Tràng nung củi kết hợp vữa vôi vỏ sò thở tự nhiên.</span>
                </div>
                <div className="flex items-center gap-2 text-[#a89083]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e06d44]" />
                  <span>Lớp móng đệm cao su kỹ thuật neoprene triệt tiêu dao động địa chấn đô thị.</span>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#2b150d]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#e06d44] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#0c0908] hover:bg-[#eb8661] transition-all shadow-[0_4px_20px_rgba(224,109,68,0.25)]"
                >
                  <span>Khảo sát địa chất làm hầm rượu vòm gạch</span>
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
