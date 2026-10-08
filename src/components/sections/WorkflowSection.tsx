'use client'

import { Label } from '@/components/ui/Label'
import { QuickQuoteButton } from '@/components/layout/QuickQuoteTrigger'

interface WorkflowStep {
  number: string
  title: string
  subtitle: string
  description: string
  deliverables: string[]
  highlight: string
}

const STEPS: WorkflowStep[] = [
  {
    number: '01',
    title: 'Khảo Sát Hiện Trạng & Định Hình "Gu"',
    subtitle: 'Lắng nghe trước khi đặt nét vẽ đầu tiên',
    description:
      'Chúng tôi không khảo sát qua loa. Buổi đầu tiên kéo dài từ 2 đến 3 giờ để đo cao độ nền, hướng nắng trưa hè, kiểm tra áp lực nước và tìm hiểu nhịp sinh hoạt của từng thành viên trong gia đình.',
    deliverables: ['Biên bản đo vẽ hiện trạng', 'Bản định hướng phong cách (Concept Mood)', 'Báo giá sơ bộ minh bạch'],
    highlight: '2-3 Giờ Khảo sát chuyên sâu',
  },
  {
    number: '02',
    title: 'Mặt Bằng 2D & Bảng Moodboard Vật Liệu',
    subtitle: 'Tối ưu công năng & sờ tận tay vật liệu thật',
    description:
      'Mặt bằng giao thông được tính toán để căn nhà thông gió tự nhiên. Khách hàng được trực tiếp trải nghiệm các mẫu gỗ óc chó, đá Travertine, vải lanh và nẹp đồng thau ngay tại studio.',
    deliverables: ['Mặt bằng bố trí công năng tỉ lệ 1:50', 'Bảng mẫu vật liệu thực tế (Physical Moodboard)', 'Sơ đồ luồng di chuyển'],
    highlight: 'Trải nghiệm mẫu vật liệu thật',
  },
  {
    number: '03',
    title: 'Phối Cảnh 3D Sống Động & Không Gian VR 360',
    subtitle: 'Thấy trước ngôi nhà tương lai như đang bước vào',
    description:
      'Mỗi góc phòng được render với ánh sáng theo từng khung giờ trong ngày: nắng sớm 8h, nắng xế chiều 17h và kịch bản đèn ấm cúng ban đêm. Không còn nỗi lo "bản vẽ một đằng, thực tế một nẻo".',
    deliverables: ['Bộ ảnh phối cảnh 3D độ phân giải 4K', 'Link trải nghiệm thực tế ảo VR 360', 'Bản vẽ chi tiết vật liệu hoàn thiện'],
    highlight: 'Góc máy 4K & VR 360',
  },
  {
    number: '04',
    title: 'Sản Xuất Tại Xưởng & Thi Công Lắp Đặt',
    subtitle: 'Xưởng mộc trực tiếp 1.000m² tại TP.HCM',
    description:
      'Khi studio giữ cả thiết kế và thi công, người đọc bản vẽ chính là người cầm cưa. Gỗ được cho làm quen độ ẩm công trình 7 ngày trước khi xẻ ván, đảm bảo không cong vênh hay nứt mộng suốt mùa mưa.',
    deliverables: ['Hồ sơ thi công chi tiết tỉ lệ 1:5', 'Nhật ký thi công gửi qua nhóm Zalo 2 ngày/lần', 'Giám sát độc lập tại hiện trường'],
    highlight: 'Tiết kiệm 20-30% chi phí trung gian',
  },
  {
    number: '05',
    title: 'Nghiệm Thu Bàn Giao & Bảo Hành 24 Tháng',
    subtitle: 'Cam kết chuẩn 1:1 & đồng hành dài lâu',
    description:
      'Bàn giao chìa khóa kèm bộ hồ sơ hoàn công kỹ thuật và sổ bảo hành 24 tháng, bảo trì định kỳ trọn đời. Bất cứ vấn đề phát sinh nào đều được đội ngũ kỹ thuật xử lý trong vòng 24 giờ làm việc.',
    deliverables: ['Biên bản nghiệm thu từng chi tiết', 'Sổ bảo hành công trình 24 tháng', 'Vệ sinh công nghiệp sạch tinh tươm'],
    highlight: 'Xử lý kỹ thuật trong 24h',
  },
]

export function WorkflowSection() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas text-ink py-20 lg:py-32 border-t border-line">
      <div className="u-gutter">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12 border-b border-line">
          <div className="max-w-2xl">
            <Label rule>Quy Trình Chuẩn Mực</Label>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mt-4 leading-tight">
              Từ Bản Vẽ Tỉ Lệ 1:5 Đến Chìa Khóa Trao Tay
            </h2>
            <p className="u-body-lg text-ink/75 mt-4">
              Chúng tôi kiểm soát chặt chẽ cả hai đầu: bản vẽ kiến trúc và xưởng mộc sản xuất. Không có khâu trung gian, không phát sinh chi phí vô lý và đảm bảo ngôi nhà hoàn thiện giống 99% bản phối cảnh.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <QuickQuoteButton label="Đăng ký tư vấn quy trình" variant="gold" />
          </div>
        </div>

        {/* 5 Steps Grid (Antigravity Asymmetric Stack) */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => {
            const isLast = idx === STEPS.length - 1
            return (
              <div
                key={step.number}
                className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-line bg-surface/80 backdrop-blur-md transition-all duration-500 hover:border-accent hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] hover:-translate-y-1 ${
                  isLast ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-surface to-accent/10 border-accent/30' : ''
                }`}
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="font-display text-4xl sm:text-5xl text-accent/80 font-bold tracking-tighter">
                    {step.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-[11px] font-mono text-accent-soft uppercase tracking-wider">
                    {step.highlight}
                  </span>
                </div>

                {/* Step Content */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-ink mb-2">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono uppercase tracking-wider text-ink/50 mb-3">
                    {step.subtitle}
                  </div>
                  <p className="text-sm text-ink/75 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-5 border-t border-line/60">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50 block mb-2">
                    Bàn Giao Giai Đoạn:
                  </span>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-ink/85">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Marketing Trust Badges Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-espresso text-canvas border border-accent/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_16px_40px_rgba(0,0,0,0.15)]">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-center md:text-left">
            <div>
              <div className="font-display text-2xl sm:text-3xl text-accent font-semibold">1.000 m²</div>
              <div className="text-xs text-canvas/60 mt-0.5">Xưởng mộc trực tiếp tại TP.HCM</div>
            </div>
            <div className="h-8 w-px bg-canvas/20 hidden sm:block" />
            <div>
              <div className="font-display text-2xl sm:text-3xl text-accent font-semibold">1:1</div>
              <div className="text-xs text-canvas/60 mt-0.5">Tỉ lệ thi công chuẩn so với 3D</div>
            </div>
            <div className="h-8 w-px bg-canvas/20 hidden sm:block" />
            <div>
              <div className="font-display text-2xl sm:text-3xl text-accent font-semibold">24 Tháng</div>
              <div className="text-xs text-canvas/60 mt-0.5">Bảo hành & Bảo trì trọn đời</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <QuickQuoteButton label="Nhận tư vấn quy trình ngay" variant="gold" />
          </div>
        </div>
      </div>
    </section>
  )
}
