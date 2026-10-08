'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface MovingStep {
  number: string
  titleVi: string
  subtitleVi: string
  descriptionVi: string
  icon: string
}

const MOVING_STEPS: MovingStep[] = [
  {
    number: '01',
    titleVi: 'Khảo Sát & Lập Danh Mục Bảo Hiểm Tranh/Cổ Vật',
    subtitleVi: 'Giám Định Tình Trạng Hiện Vật Từng Chi Tiết',
    descriptionVi:
      'Chuyên gia mỹ thuật GuHomes lập hồ sơ chụp ảnh 4K từng bức tranh sơn mài, bình gốm Bát Tràng và tượng điêu khắc. Toàn bộ tài sản được bảo hiểm giá trị 100% trong suốt quá trình vận chuyển.',
    icon: '🖼️',
  },
  {
    number: '02',
    titleVi: 'Đóng Thùng Gỗ Chống Sốc May Đo Riêng',
    subtitleVi: 'Vật Liệu Chuẩn Lưu Trữ Bảo Tàng (Archival Grade)',
    descriptionVi:
      'Mỗi món đồ quý được bọc giấy lụa không axit (Acid-free paper), xốp bọt khí mật độ cao và đóng thùng gỗ thông khử trùng nhiệt chuẩn ISPM 15, chống va đập và chống ẩm tuyệt đối.',
    icon: '📦',
  },
  {
    number: '03',
    titleVi: 'Vận Chuyển Bằng Xe Đệm Khí Nén Air-Suspension',
    subtitleVi: 'Triệt Tiêu Rung Động Ổ Gà Đường Đô Thị Sài Gòn',
    descriptionVi:
      'Hệ thống giảm xóc bóng khí nén kiểm soát điện tử giúp thùng xe êm ái như phòng khách sạn, không gây bất kỳ chấn động hay nứt vỡ nào lên đồ thủy tinh, rượu vang và piano.',
    icon: '🚛',
  },
  {
    number: '04',
    titleVi: 'Sắp Đặt Phẳng Phiu Tủ Áo & Nhân Trắc Học',
    subtitleVi: 'Chuyên Gia Bàn Tay Găng Trắng (White-Glove Valet)',
    descriptionVi:
      'Từng bộ veston Savile Row, váy dạ hội và túi xách Hermes được treo xếp vào đúng ngăn tủ Walk-in Closet theo thói quen sử dụng của gia chủ, sẵn sàng để mặc ngay.',
    icon: '🧤',
  },
  {
    number: '05',
    titleVi: 'Nghi Thức Xông Trầm & Dâng Hoa Đón Gia Chủ',
    subtitleVi: 'Tẩy Uế Sinh Khí Mới · Ngày Về Nhà Là Ngày An Vui',
    descriptionVi:
      'Trước khi gia chủ mở cửa bước vào, căn nhà đã được xông tinh dầu Trầm Hương Khánh Hòa ấm áp, bình hoa tươi nở rộ trên bàn ăn và ấm trà Shan Tuyết đã sẵn sàng trên bàn trà.',
    icon: '🪔',
  },
]

export function ConciergeWhiteGloveMovingAudit({ className }: { className?: string } = {}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fromAddress: '',
    toAddress: 'Bán đảo Thủ Thiêm',
    moveInDate: '',
    valuableItems: 'Tranh sơn mài & Bộ sưu tập rượu vang',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vipCode, setVipCode] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return

    setIsSubmitting(true)
    setTimeout(() => {
      const code = `GU-WHITEGLOVE-${Math.floor(1000 + Math.random() * 9000)}-2026`
      setVipCode(code)
      setIsSubmitting(false)
      setShowModal(true)
    }, 600)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0c0a] py-24 text-[#e8e4df] border-t border-[#1e1e1b]', className)}>
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2e2a22] bg-[#161410] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Đặc Quyền Tân Gia · White-Glove Relocation Concierge
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Dịch Vụ Dọn Nhà Bạch Kim White-Glove
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Ngày về nhà mới phải là ngày an vui trọn vẹn nhất. Đội ngũ chuyên gia GuHomes mang găng tay trắng bọc bảo vệ từng tác phẩm nghệ thuật, xếp phẳng phiu từng nếp âu phục và xông trầm hương ấm cúng trước giờ gia chủ bước vào cửa.
          </p>
        </div>

        {/* 5 Steps Showcase */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MOVING_STEPS.map((step) => (
            <div
              key={step.number}
              className="group rounded-xl border border-[#262420] bg-[#131210] p-5 transition-all duration-300 hover:border-[#3d382e] hover:bg-[#161511]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#d4af37]">{step.number}</span>
                <span className="text-xl">{step.icon}</span>
              </div>
              <h4 className="mt-3 font-serif text-sm font-medium text-[#f4efe6] group-hover:text-[#d4af37] transition-colors line-clamp-2">
                {step.titleVi}
              </h4>
              <p className="mt-1 text-[11px] font-mono text-[#8e8578] line-clamp-1">{step.subtitleVi}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#a8a29e]">{step.descriptionVi}</p>
            </div>
          ))}
        </div>

        {/* Booking Form Card */}
        <div className="rounded-2xl border border-[#2d281e] bg-[#14120e] p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="border-b border-[#242017] pb-6 mb-8 text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
              Tiếp Nhận Hồ Sơ Tân Gia Trọn Gói
            </span>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
              Đăng Ký Chuyển Dọn Nhà Bạch Kim White-Glove
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#8e8578]">
              Chúng tôi chỉ nhận phục vụ tối đa 2 gia đình mỗi tuần để đảm bảo sự tỉ mỉ tuyệt đối trong từng chi tiết bàn giao.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Ví dụ: Chị Mai Phương"
                  className="w-full rounded-lg border border-[#2e261a] bg-[#181510] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5247] focus:border-[#d4af37] focus:outline-none"
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
                  className="w-full rounded-lg border border-[#2e261a] bg-[#181510] px-4 py-3 text-sm text-[#f4efe6] placeholder-[#5a5247] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Địa Chỉ Chuyển Đi (Hiện Tại)
                </label>
                <input
                  type="text"
                  value={formData.fromAddress}
                  onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
                  placeholder="Ví dụ: Biệt thự Thảo Điền, Quận 2"
                  className="w-full rounded-lg border border-[#2e261a] bg-[#181510] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Địa Chỉ Tổ Ấm Mới
                </label>
                <input
                  type="text"
                  value={formData.toAddress}
                  onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
                  placeholder="Ví dụ: Penthouse The Opera, Thủ Thiêm"
                  className="w-full rounded-lg border border-[#2e261a] bg-[#181510] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Ngày Giờ Dự Kiến Nhập Trạch
                </label>
                <input
                  type="text"
                  value={formData.moveInDate}
                  onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                  placeholder="Ví dụ: 09:00 ngày 18/10/2026"
                  className="w-full rounded-lg border border-[#2e261a] bg-[#181510] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Tài Sản Cần Đóng Thùng Chống Sốc Đặc Biệt
                </label>
                <input
                  type="text"
                  value={formData.valuableItems}
                  onChange={(e) => setFormData({ ...formData, valuableItems: e.target.value })}
                  placeholder="Ví dụ: Tranh sơn mài, đàn Grand Piano, tủ rượu vang..."
                  className="w-full rounded-lg border border-[#2e261a] bg-[#181510] px-4 py-3 text-sm text-[#f4efe6] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#d4af37] py-4 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-all hover:bg-[#e6c158] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? 'Đang Lập Kế Hoạch Vận Chuyển...' : 'Xác Nhận Đặt Dịch Vụ White-Glove Concierge'}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#706454] pt-1">
              <span>🔒 Cam kết bảo mật lịch trình di chuyển và danh tính 100%</span>
              <span>Hotline KTS Trưởng: 0368 757 916</span>
            </div>
          </form>
        </div>

        {/* Modal: Xác Nhận Dịch Vụ White-Glove */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full rounded-2xl border border-[#3d321d] bg-[#14100a] p-8 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#292013]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] text-sm">
                      ✓
                    </span>
                    <h4 className="font-serif text-xl text-[#f4efe6]">Lịch Tân Gia White-Glove</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-[#706454] hover:text-[#f4efe6] text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#a8a29e]">
                  <p>
                    Kính chào <strong className="text-[#f4efe6]">{formData.name}</strong>, đội ngũ chuyên viên Bạch Kim GuHomes đã tiếp nhận yêu cầu chuyển dọn về tổ ấm mới tại <strong className="text-[#d4af37]">{formData.toAddress}</strong>.
                  </p>
                  <div className="rounded-xl border border-[#3d301b] bg-[#1b150c] p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8272]">Mã Đặt Lịch VIP:</span>
                      <span className="font-mono text-sm font-bold text-[#d4af37]">{vipCode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8272]">Bảo Hiểm Tài Sản:</span>
                      <span className="text-xs text-emerald-400 font-medium">Bảo hiểm toàn phần 100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8e8272]">Điều Phối Trưởng:</span>
                      <span className="text-xs text-[#f4efe6]">KTS Trưởng GuHomes</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full rounded-lg bg-[#d4af37] py-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Hoàn Tất (Đã Lưu Mã Tiếp Đón)
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
