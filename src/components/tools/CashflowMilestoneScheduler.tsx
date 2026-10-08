'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface MilestoneSpec {
  phaseNumber: number
  percentage: number
  titleVi: string
  subtitleVi: string
  timelineWeekVi: string
  prerequisiteVi: string
  deliverablesVi: string[]
  inspectionProtocolVi: string
  icon: string
}

const MILESTONES: MilestoneSpec[] = [
  {
    phaseNumber: 1,
    percentage: 15,
    titleVi: 'Đợt 1: Khởi Động Thiết Kế & Khảo Sát 3D Leica',
    subtitleVi: 'Ký Kết Hợp Đồng & Đo Đạc Hiện Trạng Thực Địa',
    timelineWeekVi: 'Tuần 01 – 02',
    prerequisiteVi: 'Ký hợp đồng dịch vụ thiết kế kiến trúc - nội thất may đo GuHomes',
    deliverablesVi: [
      'Bản đồ quét laser 3D Leica mây điểm (Point Cloud) độ chính xác 1mm',
      'Bản phân tích hướng nắng nhiệt đới, hướng gió và độ ẩm vi khí hậu',
      'Bộ Moodboard vật liệu xúc giác Quiet Luxury mẫu thật tại Studio',
    ],
    inspectionProtocolVi: 'Biên bản thống nhất mặt bằng bố trí công năng 2D có chữ ký gia chủ',
    icon: '📐',
  },
  {
    phaseNumber: 2,
    percentage: 20,
    titleVi: 'Đợt 2: Duyệt Phôi Gỗ Xưởng Mộc & Hồ Sơ Kỹ Thuật A3',
    subtitleVi: 'Hoàn Công Thiết Kế Kỹ Thuật & Khóa Mẫu Vật Liệu',
    timelineWeekVi: 'Tuần 03 – 04',
    prerequisiteVi: 'Hoàn thiện 100% phối cảnh 3D không gian và bản vẽ kỹ thuật thi công',
    deliverablesVi: [
      'Tập hồ sơ kỹ thuật thi công A3 dày 120+ trang có triện sáp KTS Trưởng',
      'Buổi trải nghiệm chọn trực tiếp phôi gỗ óc chó tại Xưởng Thạnh Xuân, Q.12',
      'Bảng tiến độ chi tiết từng ngày thi công có cam kết phạt chậm tiến độ',
    ],
    inspectionProtocolVi: 'Ký duyệt mẫu gỗ xẻ thực tế và biên bản nghiệm thu hồ sơ thiết kế A3',
    icon: '📜',
  },
  {
    phaseNumber: 3,
    percentage: 25,
    titleVi: 'Đợt 3: Cải Tạo Thô, Chống Thấm & Đi Điện Lạnh Âm',
    subtitleVi: 'Nghiệm Thu Cốt Thô, Điều Hòa VRV & Dây KNX Châu Âu',
    timelineWeekVi: 'Tuần 05 – 07',
    prerequisiteVi: 'Hoàn thành đập phá, xây tô, chống thấm 3 lớp màng xi măng dẻo',
    deliverablesVi: [
      'Nghiệm thu ngâm nước thử tải sàn vệ sinh 48 giờ không rò rỉ',
      'Ống gió điều hòa VRV bọc bảo ôn kép 25mm và thử áp lực nước 4 bar',
      'Toàn bộ mạng dây điện chống cháy ống luồn cứng và tủ điện trung tâm',
    ],
    inspectionProtocolVi: 'Biên bản nghiệm thu phần thô âm tường trước khi đóng trần thạch cao',
    icon: '🧱',
  },
  {
    phaseNumber: 4,
    percentage: 20,
    titleVi: 'Đợt 4: Nghiệm Thu Mộc Thô Tại Xưởng Thạnh Xuân',
    subtitleVi: 'Kiểm Tra Mộng Âm Dương Trước Khi Lau Dầu Osmo',
    timelineWeekVi: 'Tuần 08 – 09',
    prerequisiteVi: 'Toàn bộ đồ mộc liền tường và đồ rời đã đóng mộc xong tại xưởng',
    deliverablesVi: [
      'Gia chủ đến xưởng sờ tay kiểm tra kết cấu mộng âm dương không dùng vít sắt',
      'Đo kiểm độ ẩm gỗ đạt chuẩn 10-12% EMC bằng máy đo điện tử Wagner',
      'Phun lót dầu sáp thực vật Osmo Polyx-Oil Đức đạt độ hoàn thiện mộc mờ',
    ],
    inspectionProtocolVi: 'Biên bản nghiệm thu mộc trắng tại xưởng cho phép bọc màng đóng gói xuất xưởng',
    icon: '🪚',
  },
  {
    phaseNumber: 5,
    percentage: 15,
    titleVi: 'Đợt 5: Lắp Đặt Hoàn Thiện & Cân Chỉnh Không Gian',
    subtitleVi: 'Lắp Đặt Đồ Mộc, Hệ Rèm, Đèn Warm Dim & Vệ Sinh Sạch',
    timelineWeekVi: 'Tuần 10 – 11',
    prerequisiteVi: 'Sàn gỗ 5 tầng đã lắp xong, toàn bộ đồ mộc vận chuyển an toàn đến công trình',
    deliverablesVi: [
      'Cân chỉnh toàn bộ khe hở cánh tủ chuẩn 2.5mm đều tăm tắp',
      'Cài đặt kịch bản chiếu sáng Warm Dim và công tắc thông minh KNX',
      'Vệ sinh công nghiệp sạch bụi mịn, xông khử khuẩn tinh dầu trầm hương',
    ],
    inspectionProtocolVi: 'Biên bản nghiệm thu bàn giao kỹ thuật tĩnh trước ngày nhập trạch',
    icon: '✨',
  },
  {
    phaseNumber: 6,
    percentage: 5,
    titleVi: 'Đợt 6: Bàn Giao Hộp Mộc & Kích Hoạt Bảo Hành 10 Năm',
    subtitleVi: 'Nghi Thức Bàn Giao Tổ Ấm & Chăm Sóc Trọn Đời',
    timelineWeekVi: 'Tuần 12 (Hoàn Tất)',
    prerequisiteVi: 'Gia chủ dọn vào sinh sống 15 ngày thử nghiệm vận hành trơn tru mọi tiện ích',
    deliverablesVi: [
      'Trao tận tay Hộp Mộc Bàn Giao Gỗ Óc Chó có chìa khóa đồng và hồ sơ hoàn công',
      'Kích hoạt Thẻ VIP Thép Đen bảo hành kết cấu 10 năm và phản ứng trong 2 giờ',
      'Chương trình bảo dưỡng định kỳ miễn phí lau dầu gỗ mỗi năm một lần',
    ],
    inspectionProtocolVi: 'Biên bản thanh lý hợp đồng và quyết toán tài chính 100% minh bạch',
    icon: '👑',
  },
]

export function CashflowMilestoneScheduler({ className }: { className?: string } = {}) {
  const [totalBudgetMillion, setTotalBudgetMillion] = useState<number>(1500)
  const [selectedPhase, setSelectedPhase] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [fullName, setFullName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [isSent, setIsSent] = useState<boolean>(false)

  const currentMilestone = MILESTONES.find((m) => m.phaseNumber === selectedPhase) ?? MILESTONES[0]!
  const phaseCostMillion = Math.round((totalBudgetMillion * currentMilestone.percentage) / 100)

  const scheduleCode = `GU-CASHFLOW-2026-B${Math.round(totalBudgetMillion / 100)}`

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSent(true)
  }

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Minh Bạch Dòng Tiền · GuHomes Cashflow Protocol
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                6 Đợt Nghiệm Thu Thực Tế
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Bảng Tiến Độ Dòng Tiền &amp; 6 Giai Đoạn Nghiệm Thu
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              GuHomes cam kết không bao giờ tạm ứng vượt quá khối lượng công việc hoàn thành tại công trình. Mỗi đợt
              thanh toán gắn liền với biên bản nghiệm thu có chữ ký của KTS Trưởng và sự hài lòng tuyệt đối của gia chủ.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Nguyên tắc tài chính:</span>
            <span className="text-xs font-mono font-medium text-ink bg-canvas px-3 py-1.5 rounded-full border border-line">
              Nghiệm Thu Xong Mới Thanh Toán
            </span>
          </div>
        </div>

        {/* Budget Input & Selector Toolbar */}
        <div className="mt-8 rounded-2xl border border-line bg-canvas p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-line/60 pb-6">
            <div>
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Ngân Sách Đầu Tư Dự Kiến Của Bạn
              </span>
              <div className="text-2xl sm:text-3xl font-serif text-accent font-bold mt-1">
                {(totalBudgetMillion >= 1000
                  ? (totalBudgetMillion / 1000).toFixed(2).replace(/\.00$/, '') + ' Tỷ'
                  : totalBudgetMillion + ' Triệu')}{' '}
                <span className="text-base font-normal text-muted">VNĐ</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {[800, 1500, 2500, 4000, 6000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTotalBudgetMillion(preset)}
                  className={cn(
                    'min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono transition-all',
                    totalBudgetMillion === preset
                      ? 'bg-accent text-canvas font-bold shadow-sm'
                      : 'bg-surface hover:bg-surface-hover text-muted hover:text-ink border border-line'
                  )}
                >
                  {preset >= 1000 ? `${preset / 1000} Tỷ` : `${preset} Tr`}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range Slider */}
          <div className="mt-5">
            <div className="flex justify-between text-xs font-mono text-muted">
              <span>Trượt tinh chỉnh ngân sách:</span>
              <span className="text-ink font-semibold">{totalBudgetMillion.toLocaleString('vi-VN')} Triệu VNĐ</span>
            </div>
            <input
              type="range"
              min={500}
              max={8000}
              step={100}
              value={totalBudgetMillion}
              onChange={(e) => setTotalBudgetMillion(Number(e.target.value))}
              className="w-full mt-2 accent-amber-600"
            />
          </div>
        </div>

        {/* 6 Milestones Interactive Flow Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MILESTONES.map((item) => {
            const isSelected = selectedPhase === item.phaseNumber
            const costMil = Math.round((totalBudgetMillion * item.percentage) / 100)

            return (
              <button
                key={item.phaseNumber}
                type="button"
                onClick={() => setSelectedPhase(item.phaseNumber)}
                className={cn(
                  'group relative text-left rounded-xl p-4 border transition-all duration-300 min-h-[150px] flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-accent/5 ring-1 ring-accent/30 shadow-md'
                    : 'border-line bg-canvas hover:border-line-hover hover:bg-surface/50'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full font-bold',
                        isSelected ? 'bg-accent text-canvas' : 'bg-surface text-muted'
                      )}
                    >
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="mt-3 font-serif text-xs sm:text-sm font-medium text-ink group-hover:text-accent line-clamp-2">
                    Đợt {item.phaseNumber}: {item.titleVi.replace(/Đợt \d: /, '')}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-line/60">
                  <div className="text-xs font-mono font-bold text-accent">
                    {costMil >= 1000 ? `${(costMil / 1000).toFixed(2)} Tỷ` : `${costMil} Tr`}
                  </div>
                  <div className="text-[10px] text-muted">{item.timelineWeekVi}</div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeMilestoneIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Detailed Phase Inspection Protocol & Deliverables */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Deliverables & Inspection Checklist */}
          <div className="lg:col-span-8 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentMilestone.icon}</span>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                      Tiêu Chuẩn Nghiệm Thu {currentMilestone.timelineWeekVi}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                      {currentMilestone.titleVi}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-muted">Số tiền đợt này ({currentMilestone.percentage}%):</span>
                  <div className="text-xl font-serif text-accent font-bold">
                    {phaseCostMillion >= 1000
                      ? `${(phaseCostMillion / 1000).toFixed(2)} Tỷ VNĐ`
                      : `${phaseCostMillion} Triệu VNĐ`}
                  </div>
                </div>
              </div>

              {/* Prerequisite Box */}
              <div className="mt-6 rounded-xl border border-line bg-surface/40 p-4 text-xs leading-relaxed">
                <span className="font-mono uppercase text-muted font-semibold text-[10px]">
                  Điều Kiện Kích Hoạt Đợt Thanh Toán:
                </span>
                <p className="mt-1 text-ink font-medium">{currentMilestone.prerequisiteVi}</p>
              </div>

              {/* 3 Deliverables Checklist */}
              <div className="mt-6">
                <span className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
                  Hồ Sơ &amp; Hạng Mục Gia Chủ Cần Nghiệm Thu:
                </span>
                <div className="mt-3 space-y-2.5">
                  {currentMilestone.deliverablesVi.map((deli, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-line bg-surface/20 p-3.5 flex items-start gap-3 text-xs text-ink"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-[10px]">
                        ✓
                      </span>
                      <span className="leading-relaxed">{deli}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Protocol Note */}
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs text-ink flex items-center gap-3">
                <span className="text-xl">✍️</span>
                <div>
                  <span className="font-mono uppercase text-accent font-semibold text-[10px]">Biên Bản Pháp Lý:</span>
                  <div className="font-serif italic">{currentMilestone.inspectionProtocolVi}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line text-xs text-muted">
              Mỗi đợt nghiệm thu đều có hình ảnh chụp thực tế và video lưu trữ vào Hồ sơ hoàn công số.
            </div>
          </div>

          {/* Right Column: Cashflow Summary & Consultation Dispatch */}
          <div className="lg:col-span-4 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="border-b border-line pb-4 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">Tóm Tắt Kế Hoạch</span>
                <span className="text-xs font-mono bg-accent/10 text-accent px-2.5 py-1 rounded-full font-semibold">
                  Mã: {scheduleCode}
                </span>
              </div>

              <div className="mt-6 space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Tổng ngân sách:</span>
                  <span className="font-mono text-ink font-bold">
                    {totalBudgetMillion.toLocaleString('vi-VN')} Triệu VNĐ
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Tổng số đợt giải ngân:</span>
                  <span className="font-mono text-ink">6 Đợt (Nghiệm thu thực tế)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Thời gian toàn chu trình:</span>
                  <span className="font-mono text-accent font-bold">12 Tuần (3 Tháng)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Bảo lãnh kết cấu:</span>
                  <span className="text-ink">10 Năm trọn vẹn</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-line bg-surface/50 p-4 text-xs text-muted leading-relaxed">
                Đợt cuối cùng (5%) chỉ được thanh toán sau khi bạn đã dọn về sinh sống 15 ngày và ký nghiệm thu hài lòng
                tuyệt đối.
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full min-h-[44px] rounded-xl bg-accent px-5 py-3 text-xs font-bold text-canvas shadow-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-2"
              >
                <span>Xuất Kế Hoạch Dòng Tiền &amp; Đặt Hẹn</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </button>

              <div className="mt-3 text-center text-[11px] text-muted">
                Hồ sơ tài chính được KTS Trưởng ký duyệt trực tiếp.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cashflow Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-2xl border border-line bg-canvas p-6 sm:p-8 text-ink shadow-2xl z-10"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:text-ink"
              >
                ✕
              </button>

              {!isSent ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-accent font-semibold">
                    <span>📑</span>
                    <span>Xuất Kế Hoạch Tài Chính Minh Bạch 6 Đợt</span>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-light text-ink">
                    Nhận Bản Bóc Tách Dòng Tiền &amp; Hẹn KTS
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    GuHomes sẽ xuất file PDF bóc tách 6 đợt nghiệm thu cho mức ngân sách{' '}
                    <span className="font-bold text-ink">{totalBudgetMillion.toLocaleString('vi-VN')} Triệu VNĐ</span>{' '}
                    kèm mã theo dõi <span className="font-mono text-accent">{scheduleCode}</span>.
                  </p>

                  <form onSubmit={handleModalSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1">
                        Họ và Tên Gia Chủ
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1">
                        Số Điện Thoại Nhận Kế Hoạch (Zalo)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full min-h-[44px] rounded-xl bg-accent px-5 py-3 text-xs font-bold text-canvas hover:bg-accent-hover transition-all"
                      >
                        Gửi Bản Kế Hoạch Dòng Tiền Ngay
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-3xl text-accent">
                    ✓
                  </div>
                  <h4 className="mt-4 font-serif text-2xl font-light text-ink">Đã Tiếp Nhận Yêu Cầu</h4>
                  <p className="mt-2 text-xs sm:text-sm text-muted max-w-sm mx-auto">
                    Kế hoạch dòng tiền 6 đợt mã <span className="font-mono font-bold text-ink">{scheduleCode}</span> đã
                    được gửi tới số Zalo <span className="font-mono font-bold text-ink">{phone}</span> của quý khách{' '}
                    <span className="font-medium text-ink">{fullName}</span>.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSent(false)
                        setIsModalOpen(false)
                      }}
                      className="min-h-[44px] rounded-xl bg-accent px-6 py-2.5 text-xs font-bold text-canvas hover:bg-accent-hover transition-all"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
