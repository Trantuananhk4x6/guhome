'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface ClashCase {
  id: string
  titleVi: string
  traditionalIssueVi: string
  leicaSolutionVi: string
  toleranceMm: string
  savingsMillionVnd: string
}

const CLASH_CASES: ClashCase[] = [
  {
    id: 'mep-beam',
    titleVi: 'Xung Đột Ống Gió HVAC & Dầm Bê Tông Cốt Thép',
    traditionalIssueVi: 'Đo tay không phát hiện dầm phụ bị giấu sau trần thô, khi lắp đặt ống gió bị cấn, buộc phải đục phá dầm bê tông hoặc hạ trần mất chiều cao thông thủy.',
    leicaSolutionVi: 'Quét 3D toàn bộ cao độ đáy dầm và vị trí thép chủ. Phối hợp mô hình BIM Revit định tuyến ống gió uốn lượn chính xác từng milimet, giữ trọn vẹn chiều cao trần 3.1m.',
    toleranceMm: '± 1.0 mm',
    savingsMillionVnd: '45 Triệu VNĐ',
  },
  {
    id: 'floor-deflection',
    titleVi: 'Bù Trừ Độ Võng Sàn Bê Tông Căn Hộ Cũ',
    traditionalIssueVi: 'Sàn căn hộ bàn giao thường võng giữa nhịp từ 8 - 25mm. Thợ lát gỗ không bù cốt nền dẫn đến sàn gỗ bị bập bênh, kêu cót két và đọng nước.',
    leicaSolutionVi: 'Xuất bản đồ địa hình cao độ sàn nhiệt 3D (Floor Elevation Heatmap). Đổ vữa tự san phẳng polymer bù chuẩn xác các điểm trũng trước khi lắp sàn gỗ óc chó.',
    toleranceMm: '± 0.5 mm',
    savingsMillionVnd: '32 Triệu VNĐ',
  },
  {
    id: 'wall-square',
    titleVi: 'Sai Lệch Góc Vuông Ke Tường & Tủ Âm Vách (Millwork)',
    traditionalIssueVi: 'Góc tường thợ nề trát lệch 88° hoặc 92° (không vuông 90°). Tủ áo, tủ bếp đóng sẵn đem đến lắp bị hở khe 20mm xấu xí hoặc không nhét vừa hốc tường.',
    leicaSolutionVi: 'Chuyển dữ liệu quét góc tường trực tiếp vào máy cắt gỗ CNC 5 trục tại xưởng Thạnh Xuân. Hông tủ được vát theo độ nghiêng thực tế của tường, khít 100% không cần nẹp chắp vá.',
    toleranceMm: '± 0.8 mm',
    savingsMillionVnd: '60 Triệu VNĐ',
  },
]

export function DigitalTwinEstateAudit({ className }: { className?: string } = {}) {
  const [activeClash, setActiveClash] = useState<string>('mep-beam')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectLocation: 'thu-thiem',
    areaSqm: '180',
    preferredDate: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scanCode, setScanCode] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const currentClash = CLASH_CASES.find((c) => c.id === activeClash) ?? CLASH_CASES[0]!

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return

    setIsSubmitting(true)
    setTimeout(() => {
      const code = `GU-SCAN-${Math.floor(1000 + Math.random() * 9000)}-2026`
      setScanCode(code)
      setIsSubmitting(false)
      setShowModal(true)
    }, 600)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0c0a] py-24 text-[#e8e4df] border-t border-[#1d1d1a]', className)}>
      {/* Background Subtle Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, #242420 1px, transparent 1px), linear-gradient(to bottom, #242420 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2b2b26] bg-[#141411] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Công Nghệ Số Hóa Không Gian · Leica 3D Digital Twin
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Số Hóa Bản Sao Không Gian 3D Trước Thi Công
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Đo đạc 100 lần, cắt 1 lần. GuHomes quét Laser 3D LiDAR bằng máy Leica BLK360 Thụy Sĩ ghi lại hàng chục triệu điểm không gian với độ chính xác ±1mm, triệt tiêu 100% xung đột cơ điện và sai số trước khi xưởng mộc bấm nút cắt gỗ.
          </p>
        </div>

        {/* Live Point Cloud & Clash Detection Cockpit */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch mb-16">
          {/* Left Column: 3D Point Cloud Simulator Visual (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#262622] bg-[#12120f] p-6 sm:p-8 shadow-2xl">
            <div>
              {/* Point Cloud Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#33332c] bg-gradient-to-b from-[#090b10] to-[#040507] p-4 shadow-2xl">
                {/* Simulated Point Cloud Dots Grid */}
                <div
                  className="absolute inset-0 opacity-40 mix-blend-screen"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #38bdf8 1px, transparent 1px), radial-gradient(circle at 20% 30%, #4ade80 1px, transparent 1px), radial-gradient(circle at 80% 70%, #facc15 1px, transparent 1px)',
                    backgroundSize: '16px 16px, 32px 32px, 24px 24px',
                  }}
                />

                {/* Laser Scan Sweep Line */}
                <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 animate-pulse top-1/3" />

                {/* Coordinate HUD Indicators */}
                <div className="absolute top-4 left-4 flex flex-col gap-1 font-mono text-[10px] text-cyan-400 bg-black/60 p-2.5 rounded border border-cyan-500/30 backdrop-blur-sm">
                  <span>SENSOR: LEICA BLK360 G2</span>
                  <span>POINTS: 42,850,210 PTS</span>
                  <span>ACCURACY: ± 0.8 MM / 10M</span>
                  <span>STATUS: SCAN COMPLETED</span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="rounded bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 font-mono text-xs text-cyan-300">
                    Bản Sao Số (Digital Twin)
                  </span>
                </div>

                {/* Floor deflection Heatmap Indicator */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/80 p-3 backdrop-blur-md border border-[#2b2b26] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[#f4efe6] font-medium">Bản Đồ Cốt Sàn Laser:</span>
                  </div>
                  <span className="font-mono text-emerald-400">Độ võng tối đa: 4.2mm (Đã bù tự san phẳng)</span>
                </div>
              </div>

              {/* Clash Selection Tabs */}
              <div className="mt-6">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8e8a83] mb-2">
                  3 Tình Huống Xung Đột Được Hóa Giải Bằng 3D LiDAR
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {CLASH_CASES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveClash(item.id)}
                      className={cn(
                        'rounded-lg border p-3 text-left transition-all min-h-[64px]',
                        activeClash === item.id
                          ? 'border-[#d4af37] bg-[#1a1813] text-[#f4efe6]'
                          : 'border-[#242420] bg-[#131310] text-[#7a766f] hover:border-[#383832]'
                      )}
                    >
                      <div className="font-mono text-xs font-semibold text-[#d4af37]">{item.toleranceMm}</div>
                      <div className="text-xs font-medium text-[#e8e4df] line-clamp-1 mt-0.5">{item.titleVi.split(' ')[0]} {item.titleVi.split(' ')[1]} {item.titleVi.split(' ')[2] || ''}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Metric comparison bar */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-[#242420] bg-[#151511] p-3 text-center sm:p-4">
              <div>
                <span className="block font-mono text-[10px] text-[#706c66] uppercase">SAI SỐ ĐO ĐẠC</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-cyan-400">
                  ± 1.0 mm
                </span>
                <span className="mt-0.5 block text-[10px] text-[#22c55e]">Chuẩn xác tuyệt đối</span>
              </div>
              <div className="border-x border-[#242420]">
                <span className="block font-mono text-[10px] text-[#706c66] uppercase">XUNG ĐỘT TRÊN CÔNG TRƯỜNG</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-emerald-400">
                  0 Lần
                </span>
                <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Không đục phá dầm</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#706c66] uppercase">TIẾT KIỆM CHI PHÍ LỖI</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#d4af37]">
                  {currentClash.savingsMillionVnd}
                </span>
                <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Giảm lãng phí vật tư</span>
              </div>
            </div>
          </div>

          {/* Right Column: Case Deep Dive & Clash Resolution (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#262622] bg-[#12120f] p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                  Phát Hiện Xung Đột · Clash Detection
                </span>
                <h3 className="mt-1 font-serif text-2xl text-[#f4efe6] font-light">
                  {currentClash.titleVi}
                </h3>
              </div>

              {/* Problem vs Solution Comparison Box */}
              <div className="space-y-4">
                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
                  <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-semibold uppercase mb-1.5">
                    <span>✕</span>
                    <span>Phương Pháp Thước Dây Thủ Công (Rủi ro):</span>
                  </div>
                  <p className="text-xs text-[#c4b5b5] leading-relaxed">
                    {currentClash.traditionalIssueVi}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1.5">
                    <span>✓</span>
                    <span>Giải Pháp Bản Sao Số Leica 3D GuHomes:</span>
                  </div>
                  <p className="text-xs text-[#c4ded3] leading-relaxed">
                    {currentClash.leicaSolutionVi}
                  </p>
                </div>
              </div>

              {/* Technology Workflow */}
              <div className="border-t border-[#20201c] pt-4 text-xs text-[#8e8a83] space-y-2">
                <div className="flex items-center justify-between">
                  <span>Thiết bị phần cứng:</span>
                  <span className="text-[#f4efe6] font-mono">Leica BLK360 G2 (Thụy Sĩ)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phần mềm phân tích:</span>
                  <span className="text-[#f4efe6] font-mono">Autodesk Revit BIM & Navisworks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Liên kết xưởng mộc:</span>
                  <span className="text-[#d4af37] font-medium">Xuất mã G-code trực tiếp cho máy CNC</span>
                </div>
              </div>
            </div>

            {/* Register form trigger */}
            <div className="mt-8 pt-4 border-t border-[#20201c]">
              <div className="text-xs text-[#a8a29e] mb-3">
                * Đặc quyền khảo sát số hóa 3D miễn phí cho công trình từ 120m² tại TP.HCM.
              </div>
              <a
                href="#register-scan"
                onClick={() => {
                  const el = document.getElementById('booking-scan-box')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="block w-full rounded-lg bg-[#d4af37] py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#e6c158]"
              >
                Đăng Ký Khảo Sát 3D Laser Tư Gia
              </a>
            </div>
          </div>
        </div>

        {/* Booking Form Card */}
        <div id="booking-scan-box" className="rounded-2xl border border-[#2b2b26] bg-[#141411] p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="border-b border-[#242420] pb-6 mb-8 text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
              Dịch Vụ Khảo Sát Số Hóa Thực Địa
            </span>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
              Đặt Lịch Đội Kỹ Sư Đo Quét Leica 3D Tận Nhà
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#8e8a83]">
              Sau 2 giờ quét laser tại căn hộ hoặc biệt thự của bạn, GuHomes bàn giao toàn bộ mô hình không gian 3D và báo cáo chênh lệch cao độ cốt sàn.
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Họ Tên Gia Chủ <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Anh Nguyễn Hoàng"
                  className="w-full rounded-lg border border-[#2e2e28] bg-[#181814] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5752] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Số Điện Thoại <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09xx xxx xxx"
                  className="w-full rounded-lg border border-[#2e2e28] bg-[#181814] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5752] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Khu Vực Công Trình
                </label>
                <select
                  value={formData.projectLocation}
                  onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                  className="w-full rounded-lg border border-[#2e2e28] bg-[#181814] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none"
                >
                  <option value="thu-thiem">Thủ Thiêm (Q.2)</option>
                  <option value="thao-dien">Thảo Điền / An Phú</option>
                  <option value="phu-my-hung">Phú Mỹ Hưng (Q.7)</option>
                  <option value="trung-tam">Quận 1 / Quận 3</option>
                  <option value="khac">Khu vực khác tại TP.HCM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Diện Tích Sàn (m²)
                </label>
                <input
                  type="text"
                  value={formData.areaSqm}
                  onChange={(e) => setFormData({ ...formData, areaSqm: e.target.value })}
                  placeholder="Ví dụ: 150m², 300m²"
                  className="w-full rounded-lg border border-[#2e2e28] bg-[#181814] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Ngày Mong Muốn Khảo Sát
                </label>
                <input
                  type="text"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  placeholder="Ví dụ: Thứ 7 tuần này"
                  className="w-full rounded-lg border border-[#2e2e28] bg-[#181814] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#d4af37] py-4 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-all hover:bg-[#e6c158] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? 'Đang Lập Lịch Khảo Sát...' : 'Xác Nhận Đặt Lịch Quét Laser 3D Leica'}
              </button>
            </div>
          </form>
        </div>

        {/* Modal Xác Nhận Lịch Quét 3D */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full rounded-2xl border border-[#332e24] bg-[#141412] p-8 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#242420]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                      ✓
                    </span>
                    <h4 className="font-serif text-xl text-[#f4efe6]">Lịch Khảo Sát Đã Tạo</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-[#706c66] hover:text-[#f4efe6] text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#a8a29e]">
                  <p>
                    Chào <strong className="text-[#f4efe6]">{formData.name}</strong>, đội kỹ sư số hóa hiện trường GuHomes đã tiếp nhận yêu cầu khảo sát căn hộ {formData.areaSqm}m² tại khu vực <strong className="text-[#d4af37]">{formData.projectLocation.toUpperCase()}</strong>.
                  </p>
                  <div className="rounded-xl border border-cyan-500/30 bg-[#0d1217] p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8578]">Mã Khảo Sát VIP:</span>
                      <span className="font-mono text-sm font-bold text-cyan-400">{scanCode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8578]">Thiết Bị Sử Dụng:</span>
                      <span className="text-xs text-[#f4efe6]">Leica BLK360 G2 Laser LiDAR</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8578]">Hotline Kỹ Sư Trưởng:</span>
                      <span className="text-xs text-[#d4af37] font-mono">0368 757 916</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full rounded-lg bg-[#d4af37] py-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Hoàn Tất (Đã Lưu Mã)
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
