'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon, CloseIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface ComparisonPillar {
  number: string
  title: string
  guHomesSpec: {
    heading: string
    details: string
    badge: string
  }
  marketStandard: {
    heading: string
    details: string
    danger: string
  }
  whyItMatters: string
}

export const COMPARISON_PILLARS: ComparisonPillar[] = [
  {
    number: '01',
    title: 'Cơ Sở Sản Xuất & Xưởng Mộc',
    guHomesSpec: {
      heading: 'Sở hữu trực tiếp Xưởng Mộc 1.200m² tại Thạnh Xuân, Q.12 từ năm 2016',
      details: 'Đội ngũ hơn 30 nghệ nhân mộc truyền thống gắn bó lâu năm, kiểm soát 100% từ khâu phôi gỗ đến lắp đặt hoàn thiện.',
      badge: 'Chính chủ không qua trung gian',
    },
    marketStandard: {
      heading: 'Thuê khoán xưởng gia công ngoài hoặc thầu phụ trung gian',
      details: 'Công ty thiết kế chỉ vẽ 3D rồi bán thầu lại cho xưởng tự phát; KTS không thể kiểm soát chất lượng mộc thực địa.',
      danger: 'Bị đội giá 20-30% hoặc thầu phụ tráo đổi vật tư kém phẩm chất.',
    },
    whyItMatters: 'Khách hàng có thể trực tiếp ghé xưởng xem mộc thô trước khi sơn phủ, an tâm tuyệt đối về chất lượng.',
  },
  {
    number: '02',
    title: 'Quy Trình Kiểm Soát Độ Ẩm Gỗ (EMC)',
    guHomesSpec: {
      heading: 'Lò sấy chân không đạt chuẩn EMC 10%-12% cân bằng vi khí hậu TP.HCM',
      details: 'Đo kiểm độ ẩm từng thanh gỗ bằng máy sóng điện từ Wagner Meters Orion 950 trước khi tiến hành cắt mộng.',
      badge: 'Chuẩn EMC 10-12% Nhiệt Đới',
    },
    marketStandard: {
      heading: 'Dùng gỗ phơi khô tự nhiên hoặc sấy qua loa độ ẩm 18%-22%',
      details: 'Gỗ còn chứa nhiều nước bên trong thớ, thi công nhanh để lấy tiền ứng mà không quan tâm độ co rút vật liệu.',
      danger: 'Sau 6 tháng chạy điều hòa liên tục, gỗ bị rút nước co ngót, nứt toác mặt bàn và kẹt cánh tủ.',
    },
    whyItMatters: 'Khí hậu Sài Gòn dao động giữa độ ẩm 90% mùa mưa và 40°C mùa khô, gỗ không sấy đúng độ ẩm chắc chắn sẽ hư hỏng.',
  },
  {
    number: '03',
    title: 'Kỹ Thuật Liên Kết Kết Cấu Mộc',
    guHomesSpec: {
      heading: '100% Khớp mộng âm dương, mộng mang cá & chốt gỗ mun quý',
      details: 'Gia công CNC 5 trục kết hợp gọt giũa thủ công từng mm; triệt tiêu hoàn toàn việc dùng đinh sắt lộ mép ngoài.',
      badge: 'Mộng Âm Dương Truyền Thống',
    },
    marketStandard: {
      heading: 'Bắn đinh chỉ sắt, bắt vít tự khoan & dán keo 502 nhanh ẩu',
      details: 'Tiết kiệm thời gian nhân công bằng cách bắn đinh rồi bả matit che đậy; liên kết phụ thuộc vào keo dán công nghiệp giòn gãy.',
      danger: 'Đinh sắt gặp hơi ẩm nồm sẽ rỉ sét làm ố đen thớ gỗ; mép dán bong rộp sau vài năm.',
    },
    whyItMatters: 'Mộng gỗ chịu lực bằng chính cấu trúc thớ gỗ đan cài vào nhau, bền vững hàng chục năm không một tiếng kêu cọt kẹt.',
  },
  {
    number: '04',
    title: 'Hóa Chất & Dầu Lau Bề Mặt',
    guHomesSpec: {
      heading: '100% Dầu hữu cơ Osmo (CHLB Đức) chiết xuất hạt lanh & sáp Carnauba, 0% VOC',
      details: 'Bề mặt gỗ mộc được thở tự nhiên, giữ trọn vẹn mùi hương gỗ và an toàn tuyệt đối cho trẻ sơ sinh hay người nhạy cảm.',
      badge: '0% VOC · Chuẩn EN 71.3 Châu Âu',
    },
    marketStandard: {
      heading: 'Sơn PU công nghiệp pha dung môi xăng thơm nồng nặc',
      details: 'Tạo lớp màng nhựa bóng bẩy bịt kín lỗ thở của gỗ; phát tán khí độc Formaldehyde và benzen kéo dài cả năm trời.',
      danger: 'Gây đau đầu, cay mắt, kích ứng đường hô hấp cho gia chủ ngay khi bước chân vào nhà.',
    },
    whyItMatters: 'Ngôi nhà là nơi tái tạo sức khỏe; không thể đánh đổi sự an lành của gia đình bằng lớp sơn nhựa độc hại rẻ tiền.',
  },
  {
    number: '05',
    title: 'Hạ Tầng Cơ Điện MEP & Tiêu Âm',
    guHomesSpec: {
      heading: 'Bảo ôn đôi Aeroflex 19mm, miệng gió giấu viền, trần Knauf 2 lớp dán lưới sợi thủy tinh',
      details: 'Thử áp lực nước 8 bar trong 48h, triệt tiêu tiếng ồn điều hòa dưới 28dB, khe rãnh co ngót âm chân tường 12mm.',
      badge: 'Kỹ Thuật MEP Khắt Khe',
    },
    marketStandard: {
      heading: 'Bảo ôn đơn mỏng 9mm, miệng gió nhôm lộ vít, trần 1 lớp bả bột thường',
      details: 'Cắt giảm chi phí vật tư ngầm để hạ giá thành đấu thầu; thi công ẩu vì nghĩ gia chủ không nhìn thấy trong trần thạch cao.',
      danger: 'Đọng sương rỉ nước làm mốc vàng trần nhà; trần bị nứt đường chỉ sau một mùa mưa.',
    },
    whyItMatters: 'Hệ cơ điện ngầm quyết định 70% sự an tâm khi sinh hoạt; một vết ố rỉ nước có thể phá hủy toàn bộ hệ tủ gỗ đắt tiền.',
  },
  {
    number: '06',
    title: 'Chính Sách Bảo Chứng & Hậu Mãi',
    guHomesSpec: {
      heading: 'Bảo hành 5 năm kết cấu mộc, đo kiểm độ ẩm định kỳ 6 tháng/lần miễn phí trọn đời',
      details: 'Cấp Thẻ Bảo Hành Số Hóa GU-WTY định danh, cam kết kỹ thuật viên có mặt xử lý trong vòng 24 giờ tại TP.HCM.',
      badge: 'Đo Ẩm 6 Tháng Định Kỳ Trọn Đời',
    },
    marketStandard: {
      heading: 'Bảo hành miệng 12 tháng, sau bàn giao tìm cách né tránh',
      details: 'Khi công trình có sự cố cong vênh thường đổ lỗi do thời tiết hoặc gia chủ sử dụng điều hòa sai cách để từ chối trách nhiệm.',
      danger: 'Gia chủ phải tự bỏ tiền túi thuê thợ ngoài sửa chữa chắp vá sau khi hết hạn 1 năm.',
    },
    whyItMatters: 'Đồ mộc tự nhiên cần sự chăm sóc kiên trì; GuHomes cam kết đồng hành cùng gia chủ suốt vòng đời của ngôi nhà.',
  },
]

export function ContractorComparisonMatrix({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<number>(0)

  return (
    <section className={cn('relative bg-canvas py-16 sm:py-24 border-y border-line overflow-hidden', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Minh Bạch Năng Lực Thực Địa</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ink mt-3 tracking-tight">
              Bảng Đối Chiếu Năng Lực Thi Công Thực Tế
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-[64ch] mt-3 font-light leading-relaxed">
              Thị trường nội thất Sài Gòn tràn ngập các báo giá giá rẻ bằng cách cắt giảm vật tư ngầm và dùng hóa chất độc hại. Dưới đây là 6 khác biệt cốt tử giữa chuẩn may đo Quiet Luxury GuHomes và nhà thầu phổ thông.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-canvas hover:bg-accent/90 text-xs font-mono tracking-wider transition-all shadow-md font-semibold"
            >
              <span>Xem Bóc Tách Dự Toán Minh Bạch</span>
              <ArrowUpRightIcon className="text-sm" />
            </a>
          </div>
        </div>

        {/* Matrix Comparison List */}
        <div className="mt-10 space-y-6">
          {COMPARISON_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.number}
              className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-lg hover:border-accent/60 transition-all duration-300"
            >
              <div className="flex items-center gap-4 pb-4 border-b border-line/60">
                <span className="font-mono text-xl text-accent font-semibold">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-medium text-ink">
                  {pillar.title}
                </h3>
              </div>

              {/* Side-by-Side Comparison Grid */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left: GuHomes Standards (7 cols) - Emphasized */}
                <div className="lg:col-span-7 rounded-2xl border border-accent/40 bg-accent/[0.04] p-6 flex flex-col justify-between shadow-inner">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-accent/20">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-accent text-canvas flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                        <span className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                          Tiêu Chuẩn May Đo GuHomes
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-accent/20 text-accent font-medium">
                        {pillar.guHomesSpec.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-semibold text-ink mt-4">
                      {pillar.guHomesSpec.heading}
                    </h4>
                    <p className="text-xs text-ink/80 font-light mt-2 leading-relaxed">
                      {pillar.guHomesSpec.details}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-accent/20 flex items-center gap-2 text-[11px] font-mono text-accent">
                    <span>✦ Giá trị gia chủ nhận được:</span>
                    <span className="text-ink/90 font-sans font-normal">{pillar.whyItMatters}</span>
                  </div>
                </div>

                {/* Right: Market Common Shortcuts (5 cols) - Warning */}
                <div className="lg:col-span-5 rounded-2xl border border-line bg-canvas/60 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-line">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-600 flex items-center justify-center text-xs font-bold">
                          ✗
                        </span>
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">
                          Nhà Thầu Thị Trường Phổ Thông
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-red-600 font-semibold">
                        Rủi ro cao
                      </span>
                    </div>

                    <h4 className="font-serif text-sm font-medium text-ink/80 mt-4">
                      {pillar.marketStandard.heading}
                    </h4>
                    <p className="text-xs text-muted font-light mt-2 leading-relaxed">
                      {pillar.marketStandard.details}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line/60">
                    <span className="text-[10px] font-mono text-red-700 uppercase block mb-0.5">
                      Hậu quả thực tế:
                    </span>
                    <p className="text-[11px] text-red-800 font-light leading-relaxed">
                      {pillar.marketStandard.danger}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-espresso to-[#2B231D] text-canvas p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-[66ch]">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Tham Quan &amp; Kiểm Định Trực Tiếp
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-canvas mt-2">
                Bạn Có Thể Ghé Thăm Xưởng Mộc Thạnh Xuân 1.200m² Bất Cứ Lúc Nào
              </h3>
              <p className="text-xs sm:text-sm text-canvas/80 mt-2 font-light leading-relaxed">
                Chúng tôi luôn khuyến khích gia chủ xuống tận xưởng mộc kiểm tra mộng gỗ thô trước khi phun dầu, ngửi mùi dầu Osmo tự nhiên để tự mình cảm nhận sự khác biệt.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-canvas text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent/90 transition-all shadow-md"
              >
                <span>Đăng Ký Ghé Thăm Xưởng Mộc</span>
                <ArrowUpRightIcon className="text-sm" />
              </a>
              <a
                href="tel:0368757916"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-canvas/30 text-canvas text-xs font-mono tracking-wider hover:bg-canvas/10 transition-colors"
              >
                <span>Hotline: 0368 757 916</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
