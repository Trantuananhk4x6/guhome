'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface TeaVariety {
  id: string
  nameVi: string
  terroirVi: string
  ageVi: string
  brewingTempVi: string
  tastingNotesVi: string
  steepingVesselVi: string
}

const TEA_VARIETIES: TeaVariety[] = [
  {
    id: 'shan-tuyet-tay-con-linh',
    nameVi: 'Shan Tuyết Cổ Thụ Tây Côn Lĩnh',
    terroirVi: 'Đỉnh núi Tây Côn Lĩnh, Hà Giang · Độ cao 2.200m quanh năm mây phủ',
    ageVi: 'Cổ thụ trên 400 năm tuổi',
    brewingTempVi: '88°C – 92°C (Nước sôi hạ nhiệt 2 phút)',
    tastingNotesVi: 'Nước trà vàng óng ánh như mật ong rừng, tiền vị chát dịu thanh tao, hậu vị ngọt sâu lưu luyến khoang họng suốt 30 phút.',
    steepingVesselVi: 'Ấm Tử Sa Nghi Hưng chu sa đỏ đất nung nhiệt cao',
  },
  {
    id: 'oolong-tu-quy-moc-chau',
    nameVi: 'Oolong Tứ Quý Mộc Châu',
    terroirVi: 'Cao nguyên Mộc Châu mờ sương · Biên độ nhiệt ngày đêm 15°C',
    ageVi: 'Vườn chè hữu cơ chọn lọc',
    brewingTempVi: '92°C – 95°C',
    tastingNotesVi: 'Hương hoa mộc và hoa lan tự nhiên, chất nước sánh mịn, vị thanh khiết làm sảng khoái tinh thần buổi trưa hè.',
    steepingVesselVi: 'Ấm Tử Sa Tử Nê dáng Thạch Biều thanh nhã',
  },
  {
    id: 'sen-tay-ho-bach-diep',
    nameVi: 'Trà Sen Bách Diệp Tây Hồ',
    terroirVi: 'Đầm sen Quảng An, Hồ Tây, Hà Nội · Thu hái trước 5:00 sáng',
    ageVi: 'Trà cổ thụ ủ gạo sen 7 lần',
    brewingTempVi: '85°C – 88°C',
    tastingNotesVi: 'Hương sen tinh khiết thanh thoát bao bọc từng búp chè, đưa người thưởng trà trở về không gian tĩnh lặng của cung đình xưa.',
    steepingVesselVi: 'Chén Khải sứ trắng Bát Tràng thấu quang',
  },
  {
    id: 'pho-nhi-thanh-xuan-vault',
    nameVi: 'Phổ Nhĩ Sống Ủ Hầm Thạnh Xuân',
    terroirVi: 'Lên men vi sinh trong hầm gỗ GuHomes · Độ ẩm 65% RH chuẩn',
    ageVi: 'Bánh trà ép chặt ủ 12 năm',
    brewingTempVi: '98°C – 100°C (Sôi sủi tăm)',
    tastingNotesVi: 'Màu nước đỏ cánh gián trầm mặc, hương gỗ mục và quả khô chín mọng, ấm tỳ vị và nuôi dưỡng nội khí.',
    steepingVesselVi: 'Ấm Tử Sa Đoạn Nê da gốm mộc xốp thở khí',
  },
]

export function ArtisanShanTuyetTeaSanctuary({ className }: { className?: string } = {}) {
  const [activeTeaId, setActiveTeaId] = useState<string>('shan-tuyet-tay-con-linh')
  const [waterTds, setWaterTds] = useState<number>(38)
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false)
  const [guestPhone, setGuestPhone] = useState<string>('')
  const [guestName, setGuestName] = useState<string>('')

  const activeTea = TEA_VARIETIES.find((t) => t.id === activeTeaId) ?? TEA_VARIETIES[0]!
  const vipPasscode = 'GU-TEA-2026-X'

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestPhone) return
    setBookingConfirmed(true)
  }

  // Water evaluation based on TDS
  let tdsEvaluationVi = '35 – 45 ppm: Mức lý tưởng nhất để mở bung toàn bộ hương trà và hậu vị ngọt sâu.'
  let tdsQualityColor = 'text-emerald-400'
  if (waterTds < 30) {
    tdsEvaluationVi = 'Dưới 30 ppm: Nước quá tinh khiết (nước cất), trà có thể bị nhạt và thiếu độ đầm.'
    tdsQualityColor = 'text-amber-400'
  } else if (waterTds > 65) {
    tdsEvaluationVi = 'Trên 65 ppm: Khoáng chất hòa tan cao, nước cứng làm trà đục và vị chát gắt.'
    tdsQualityColor = 'text-rose-400'
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0c09] py-24 text-[#e2e7df] border-t border-[#1a2318]', className)}>
      {/* Subtle Celadon & Moss Green Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(74,124,89,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d4732] bg-[#111f15] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#6ee7b7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-ping" />
            Nghi Thức Trà Đạo Tri Kỷ · Shan Tuyet Tea Sanctuary
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f3f7f2]">
            Thánh Địa Trà Đạo Shan Tuyết & Gốm Tử Sa
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#9cb09e]">
            Một góc thưởng trà thiền vị được tác tạo từ <span className="text-[#6ee7b7] font-medium">Bàn trà lũa Gõ Đỏ ngâm bùn 30 năm</span> vớt từ lòng sông Cửu Long, bếp từ vi gốm âm phẳng mặt đá và nguồn nước pha trà lọc khoáng 7 tầng qua đá Thạch Anh đạt chuẩn TDS 35–45 ppm lý tưởng.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Tea Varieties Collection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#233527] bg-[#101712]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1c2c20] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#6ee7b7]">
                    Bộ Sưu Tập 4 Danh Trà Thượng Hạng
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f3f7f2]">
                    Bản Sắc Trà Đạo Việt Nam & Tử Sa Nghi Hưng
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#16241b] px-3 py-1 text-xs font-mono text-[#a7f3d0]">
                  <span>Mã VIP: {vipPasscode}</span>
                </div>
              </div>

              {/* Tea Selectors */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEA_VARIETIES.map((tea) => {
                  const isSelected = tea.id === activeTeaId
                  return (
                    <button
                      key={tea.id}
                      type="button"
                      onClick={() => setActiveTeaId(tea.id)}
                      className={cn(
                        'flex flex-col justify-between p-4 rounded-xl border text-left transition-all min-h-[96px]',
                        isSelected
                          ? 'border-[#34d399] bg-[#16281e] text-white shadow-[0_0_15px_rgba(52,211,153,0.18)]'
                          : 'border-[#1e2e22] bg-[#0c130e] text-[#8ea391] hover:border-[#2e4734] hover:text-[#e2e7df]'
                      )}
                    >
                      <span className="font-serif text-sm font-medium text-[#f3f7f2] line-clamp-1">
                        {tea.nameVi}
                      </span>
                      <span className="text-[11px] text-[#6b856e] italic mt-1 line-clamp-2">
                        {tea.ageVi}
                      </span>
                      <span className="font-mono text-[10px] text-[#34d399] mt-2">
                        Nhiệt độ pha: {tea.brewingTempVi.split(' ')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Tea Inspection */}
              <div className="mt-6 rounded-xl border border-[#283e2d] bg-[#131f16] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6ee7b7] uppercase">{activeTea.ageVi}</span>
                  <span className="rounded-full bg-[#1d3023] px-2.5 py-0.5 text-[#a7f3d0]">
                    {activeTea.brewingTempVi}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#f3f7f2]">
                  {activeTea.nameVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#b4c9b6]">
                  {activeTea.tastingNotesVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1e3022] text-xs">
                  <div className="rounded-lg bg-[#0d140f] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#6b856e]">Vùng Thổ Nhưỡng (Terroir)</span>
                    <span className="mt-1 block font-medium text-[#e2ece0]">{activeTea.terroirVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0d140f] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#6b856e]">Dụng Cụ Pha Trà Phù Hợp</span>
                    <span className="mt-1 block font-medium text-[#6ee7b7]">{activeTea.steepingVesselVi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 7-Stage Water TDS Simulator & Private Tea Ritual Booking */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#233527] bg-[#101712]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#1c2c20] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#6ee7b7]">
                  Chất Lượng Nước Khoáng Pha Trà
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f3f7f2]">
                  Hệ Thống Lọc 7 Tầng Đá Thạch Anh
                </h3>
              </div>

              {/* Water TDS Slider */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-mono text-[#9cb09e]">
                  <span>Chỉ Số Khoáng Hòa Tan (TDS):</span>
                  <span className="font-bold text-[#34d399]">{waterTds} ppm</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="1"
                  value={waterTds}
                  onChange={(e) => setWaterTds(Number(e.target.value))}
                  className="mt-2 w-full h-2 rounded-lg bg-[#1e3022] accent-[#34d399] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#607763] mt-1">
                  <span>15 ppm (Nước cất)</span>
                  <span>38 ppm (Tối ưu)</span>
                  <span>100 ppm (Nước máy cứng)</span>
                </div>
                <p className={cn('mt-2 text-xs font-mono', tdsQualityColor)}>
                  {tdsEvaluationVi}
                </p>
              </div>

              {/* Driftwood Table & Flush-mount Induction Details */}
              <div className="mt-5 rounded-xl border border-[#283e2d] bg-[#142017] p-4 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#6ee7b7] uppercase block">
                  Đặc Quyền Thiết Kế GuHomes:
                </span>
                <div className="flex items-center gap-2 text-[#9cb09e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
                  <span>Bàn trà lũa Gõ Đỏ 30 năm ngâm bùn, thớ gỗ đanh cứng không nứt nẻ.</span>
                </div>
                <div className="flex items-center gap-2 text-[#9cb09e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
                  <span>Bếp từ vi gốm âm mặt đá nhám flush-mount, công suất đun sôi êm không tiếng quạt.</span>
                </div>
              </div>

              {/* Private Tea Tasting Ritual Booking Form */}
              <div className="mt-6 pt-4 border-t border-[#1c2c20]">
                {bookingConfirmed ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 text-center space-y-2">
                    <span className="inline-block text-2xl">🍵</span>
                    <h4 className="font-serif text-base text-emerald-300 font-medium">
                      Đã Ghi Nhận Lịch Thưởng Trà Riêng Tư!
                    </h4>
                    <p className="text-xs text-emerald-200/80">
                      KTS Trưởng GuHomes sẽ liên hệ để chuẩn bị danh trà và đón tiếp Quý khách tại xưởng mộc Thạnh Xuân hoặc tư gia.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(false)}
                      className="mt-3 text-xs font-mono text-[#6ee7b7] underline"
                    >
                      Đăng ký lịch khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-3">
                    <span className="font-mono text-xs text-[#6ee7b7] uppercase block">
                      Đăng Ký Nghi Thức Thưởng Trà Cùng KTS Trưởng:
                    </span>
                    <div>
                      <input
                        type="text"
                        placeholder="Họ và tên của Quý khách"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full rounded-xl border border-[#233527] bg-[#0c130e] px-3.5 py-2.5 text-xs text-[#f3f7f2] placeholder-[#556957] focus:border-[#34d399] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Số điện thoại liên hệ *"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#233527] bg-[#0c130e] px-3.5 py-2.5 text-xs text-[#f3f7f2] placeholder-[#556957] focus:border-[#34d399] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#059669] py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-[#047857] transition-all shadow-[0_4px_15px_rgba(5,150,105,0.3)]"
                    >
                      Xác Nhận Lịch Thưởng Trà Tri Kỷ ({vipPasscode})
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
