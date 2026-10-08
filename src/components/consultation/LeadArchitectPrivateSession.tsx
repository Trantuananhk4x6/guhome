'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface ConsultationStep {
  number: string
  titleVi: string
  subtitleVi: string
  descriptionVi: string
  icon: string
}

const CONSULTATION_STEPS: ConsultationStep[] = [
  {
    number: '01',
    titleVi: 'Thưởng Trà & Lắng Nghe Nếp Sống Gia Đình',
    subtitleVi: 'Không Bán Hàng Máy Móc · Thấu Cảm Gu Thẩm Mỹ',
    descriptionVi:
      'Gia chủ cùng KTS Trưởng ngồi quanh bàn trà gỗ mun mộc, thưởng ấm trà Shan Tuyết cổ thụ. Chúng tôi lắng nghe thói quen thức giấc, thói quen đọc sách, thói quen nấu nướng và những kỷ niệm bạn muốn lưu giữ trong ngôi nhà mới.',
    icon: '🍵',
  },
  {
    number: '02',
    titleVi: 'Phác Thảo Ý Tưởng Hand-Sketch Trực Tiếp',
    subtitleVi: 'Bút Vẽ Mộc & Giấy Dày Ngay Tại Bàn Trà',
    descriptionVi:
      'Thay vì các slide thuyết trình mẫu có sẵn, KTS Trưởng phác thảo tay các giải pháp phân chia luồng gió đối lưu, trục ánh sáng tự nhiên và công năng mở trực tiếp theo từng trăn trở của bạn ngay trong buổi gặp.',
    icon: '📐',
  },
  {
    number: '03',
    titleVi: 'Trải Nghiệm Hộp Mẫu Vật Liệu Xúc Giác',
    subtitleVi: 'Cảm Nhận Trực Quan Gỗ Óc Chó, Đá Vôi & Vữa Vôi',
    descriptionVi:
      'Gia chủ tận tay chạm vào thớ gỗ óc chó Bắc Mỹ sấy tự nhiên lau dầu Osmo, phiến đá Travertine Navona để mộc và các bảng mẫu vữa vôi khoáng Tadelakt, cảm nhận độ mịn, độ đầm tay và màu sắc dưới ánh sáng thực.',
    icon: '🪵',
  },
  {
    number: '04',
    titleVi: 'Bóc Tách Dòng Tiền & Kế Hoạch Bàn Giao',
    subtitleVi: 'Minh Bạch 100% Chi Phí · Không Chi Phí Ẩn',
    descriptionVi:
      'Lập bảng dự toán sơ bộ chi tiết từng mét vuông, cam kết không phát sinh chi phí ngoài hợp đồng và chốt tiến độ bàn giao chìa khóa chuẩn xác cho ngày gia đình dọn về tổ ấm.',
    icon: '📑',
  },
]

export function LeadArchitectPrivateSession({ className }: { className?: string } = {}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    propertyType: 'penthouse',
    location: 'thu-thiem',
    areaSqmMini: '180',
    moveInDate: 'Q3/2026',
    specialNotes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vipCode, setVipCode] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone) return

    setIsSubmitting(true)
    setTimeout(() => {
      const generatedCode = `GU-VIP-${Math.floor(1000 + Math.random() * 9000)}-2026`
      setVipCode(generatedCode)
      setIsSubmitting(false)
      setShowConfirmation(true)
    }, 600)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0c0a] py-24 text-[#e8e4df] border-t border-[#1e1e1b]', className)}>
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.08),rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2e2a22] bg-[#161410] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Đặc Quyền Thượng Khách · 1-on-1 Master Architect Session
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Phiên Tư Vấn Riêng Tư Cùng KTS Trưởng
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Trần 12 công trình mỗi năm là cam kết bất biến của GuHomes: Người lắng nghe bạn buổi đầu tiên cũng là người chịu trách nhiệm giám sát từng khớp mộng trên công trường cho đến ngày trao chìa khóa.
          </p>
        </div>

        {/* 4 Steps Showcase */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONSULTATION_STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-xl border border-[#242420] bg-[#131310] p-6 transition-all duration-300 hover:border-[#3d3a30] hover:bg-[#161612]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#d4af37]">{step.number}</span>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-medium text-[#f4efe6] group-hover:text-[#d4af37] transition-colors">
                {step.titleVi}
              </h3>
              <p className="mt-1 text-xs font-mono text-[#8e8a83]">{step.subtitleVi}</p>
              <p className="mt-3 text-xs leading-relaxed text-[#a8a29e]">{step.descriptionVi}</p>
            </div>
          ))}
        </div>

        {/* Consultation Form & Studio Atmosphere (2 cols) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Booking Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-[#282824] bg-[#121210] p-6 sm:p-10 shadow-2xl">
            <div className="border-b border-[#20201d] pb-6 mb-8">
              <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                Đăng Ký Buổi Gặp Riêng Tư Tại Studio Hoặc Tư Gia
              </span>
              <h3 className="mt-2 font-serif text-2xl text-[#f4efe6] font-light">
                Tiếp Đón 1-1 Với KTS Trưởng GuHomes
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#8e8a83]">
                Mỗi tuần chúng tôi chỉ nhận tối đa 3 phiên làm việc chuyên sâu để đảm bảo thời gian đào sâu giải pháp vi khí hậu cho từng gia chủ.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                    Danh Xưng & Họ Tên <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ví dụ: Anh Trần Tuấn Anh"
                    className="w-full rounded-lg border border-[#2c2c28] bg-[#171714] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5752] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                    Số Điện Thoại / Zalo VIP <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="09xx xxx xxx"
                    className="w-full rounded-lg border border-[#2c2c28] bg-[#171714] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5752] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                    Loại Hình Công Trình
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full rounded-lg border border-[#2c2c28] bg-[#171714] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none transition-colors"
                  >
                    <option value="penthouse">Penthouse / Duplex Thông Tầng</option>
                    <option value="villa">Biệt Thự Phố Vườn / Dinh Thự</option>
                    <option value="luxury-apt">Căn Hộ Hạng Sang (120m² - 250m²)</option>
                    <option value="heritage">Nhà Phố Kiến Trúc Cổ Điển Mộc</option>
                    <option value="tea-space">Không Gian Trà Đạo & Nghệ Thuật Riêng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                    Khu Vực & Tâm Điểm Dự Án
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-lg border border-[#2c2c28] bg-[#171714] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none transition-colors"
                  >
                    <option value="thu-thiem">Bán Đảo Thủ Thiêm (The Opera, Empire City...)</option>
                    <option value="thao-dien">Thảo Điền & An Phú (TP. Thủ Đức)</option>
                    <option value="phu-my-hung">Phú Mỹ Hưng & Nam Sài Gòn (Q.7, Nhà Bè)</option>
                    <option value="trung-tam">Bến Nghé & Đa Kao (Quận 1, Quận 3)</option>
                    <option value="khac">Khu Vực Khác Tại TP. Hồ Chí Minh / Vùng Ven</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                    Diện Tích Sàn Ước Tính (m²)
                  </label>
                  <input
                    type="text"
                    value={formData.areaSqmMini}
                    onChange={(e) => setFormData({ ...formData, areaSqmMini: e.target.value })}
                    placeholder="Ví dụ: 180m², 350m²"
                    className="w-full rounded-lg border border-[#2c2c28] bg-[#171714] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5752] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                    Thời Điểm Nhận Bàn Giao Nhà
                  </label>
                  <input
                    type="text"
                    value={formData.moveInDate}
                    onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                    placeholder="Ví dụ: Quý 3/2026, Đầu năm 2027"
                    className="w-full rounded-lg border border-[#2c2c28] bg-[#171714] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5752] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Trăn Trở Về Không Gian Hoặc Gu Thẩm Mỹ (Tùy chọn)
                </label>
                <textarea
                  rows={3}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="Ví dụ: Hướng nắng Tây gắt buổi chiều, muốn thiết kế phòng trà tĩnh tâm, cần hầm rượu không rung chấn..."
                  className="w-full rounded-lg border border-[#2c2c28] bg-[#171714] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5752] focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[#d4af37] py-4 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-all hover:bg-[#e6c158] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? 'Đang Tạo Hồ Sơ Tiếp Đón...' : 'Xác Nhận Đặt Lịch Tiếp Đón 1-1 Với KTS Trưởng'}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#706c66] pt-1">
                <span>🔒 Bảo mật danh tính tư gia 100%</span>
                <span>Hotline trực tiếp: 0368 757 916</span>
              </div>
            </form>
          </div>

          {/* Right Column: Studio Atmosphere & GuHomes Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Atelier Card */}
            <div className="rounded-2xl border border-[#282824] bg-[#121210] p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                Studio & Bàn Trà Tiếp Đón
              </span>
              <h4 className="mt-2 font-serif text-xl sm:text-2xl text-[#f4efe6] font-light">
                Xưởng Chế Tác Gỗ Mộc 1.200m²
              </h4>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#a8a29e]">
                Chúng tôi trân trọng kính mời gia chủ đến thăm trực tiếp xưởng gỗ Thạnh Xuân, Q.12 để tận mắt ngắm nhìn những khối gỗ óc chó đang sấy khô, những khớp mộng ngàm thủ công và các mẫu vôi vữa xoa tay trước khi đặt bút ký hợp đồng.
              </p>

              <div className="mt-6 space-y-3 border-t border-[#20201d] pt-6 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#706c66]">Địa chỉ xưởng mộc:</span>
                  <span className="text-[#e8e4df] font-medium text-right">Thạnh Xuân, Q.12, TP.HCM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#706c66]">Hotline KTS Trưởng:</span>
                  <span className="text-[#d4af37] font-mono font-medium">0368 757 916</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#706c66]">Email tiếp nhận hồ sơ:</span>
                  <span className="text-[#e8e4df] font-mono">guhomesvn@gmail.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#706c66]">Trần thi công cam kết:</span>
                  <span className="text-[#d4af37] font-medium">Tối đa 12 công trình / năm</span>
                </div>
              </div>
            </div>

            {/* Testimonial / Philosophy Card */}
            <div className="rounded-2xl border border-[#2b2923] bg-gradient-to-br from-[#171612] to-[#100f0d] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                  Lời Hứa Của Người Làm Nghề
                </span>
              </div>
              <p className="font-serif italic text-sm sm:text-base leading-relaxed text-[#c4beb5]">
                &ldquo;Ở GuHomes, chúng tôi không có phòng ban kinh doanh chạy chỉ tiêu số lượng. Người đón bạn tại bàn trà hôm nay sẽ là người chịu trách nhiệm về từng milimet khe co ngót trên sàn nhà của bạn ngày dọn về.&rdquo;
              </p>
              <div className="mt-4 border-t border-[#24221c] pt-4 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-semibold text-[#f4efe6]">KTS. Trưởng GuHomes</span>
                  <span className="text-[11px] text-[#706c66]">Chủ trì thiết kế & chế tác</span>
                </div>
                <span className="font-serif text-sm text-[#d4af37]">GuHomes · 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Xác Nhận Đặt Hẹn Thành Công */}
        <AnimatePresence>
          {showConfirmation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-lg w-full rounded-2xl border border-[#332e24] bg-[#141412] p-8 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#242420]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] text-sm">
                      ✓
                    </span>
                    <h4 className="font-serif text-xl text-[#f4efe6]">Thư Mời Tiếp Đón Riêng Tư</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    className="text-[#706c66] hover:text-[#f4efe6] text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#a8a29e]">
                  <p>
                    Trân trọng kính chào <strong className="text-[#f4efe6]">{formData.fullName}</strong>,
                  </p>
                  <p className="leading-relaxed">
                    Hồ sơ đăng ký buổi tư vấn riêng tư của quý gia chủ đã được chuyển trực tiếp đến KTS Trưởng GuHomes. Chúng tôi sẽ liên hệ qua số điện thoại <strong className="text-[#d4af37]">{formData.phone}</strong> trong vòng 4 giờ để sắp xếp lịch hẹn thưởng trà tại Studio hoặc khảo sát tư gia.
                  </p>

                  <div className="rounded-xl border border-[#332b20] bg-[#191612] p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8578]">Mã Tiếp Đón VIP:</span>
                      <span className="font-mono text-sm font-bold text-[#d4af37]">{vipCode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8578]">Công Trình Dự Kiến:</span>
                      <span className="text-xs text-[#f4efe6]">{formData.propertyType.toUpperCase()} ({formData.areaSqmMini}m²)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8578]">Khu Vực:</span>
                      <span className="text-xs text-[#f4efe6]">{formData.location.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#706c66] leading-relaxed">
                    * Mọi thông tin mặt bằng và địa chỉ công trình được bảo mật theo thỏa thuận bảo mật NDA nội bộ của GuHomes.
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    className="w-full rounded-lg bg-[#d4af37] py-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Hoàn Tất & Đóng (Đã Lưu Mã)
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
