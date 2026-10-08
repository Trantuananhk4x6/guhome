'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon, PrinterIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type EngineeringCategory = 'all' | 'structural' | 'mep-acoustics' | 'finishing-lighting'

export interface EngineeringNorm {
  id: string
  number: string
  title: string
  shortTitle: string
  category: 'structural' | 'mep-acoustics' | 'finishing-lighting'
  categoryLabel: string
  standardSpec: string
  toolOrMethod: string
  failureRiskAvoided: string
  guHomesCommitment: string
  tolerance: string
}

export const ENGINEERING_NORMS: EngineeringNorm[] = [
  {
    id: 'norm-01',
    number: '01',
    title: 'Trắc Địa Laser 3D Toàn Phần Dung Sai ≤ 1.0mm',
    shortTitle: 'Khảo Sát Laser 3D',
    category: 'structural',
    categoryLabel: 'Kết Cấu & Thô',
    standardSpec: 'Quét toàn bộ không gian bằng máy quét Laser 3D Leica Geosystems trước khi lập bản vẽ Shopdrawing.',
    toolOrMethod: 'Máy Leica BLK360 + cảm biến độ phẳng sàn kỹ thuật số Bosch GRL 600.',
    failureRiskAvoided: 'Triệt tiêu hoàn toàn rủi ro vách tường bị vặn vỏ đỗ, sàn dốc không đều làm kẹt cánh cửa lùa âm.',
    guHomesCommitment: 'Nếu dung sai hiện trường lệch > 1.5mm so với bản vẽ duyệt, GuHomes chịu trách nhiệm căn chỉnh lại kết cấu miễn phí.',
    tolerance: '≤ 1.0 mm trên 10m chiều dài',
  },
  {
    id: 'norm-02',
    number: '02',
    title: 'Gỗ Sấy Chân Không Đạt Chuẩn EMC 10–12% Vi Khí Hậu Sài Gòn',
    shortTitle: 'Độ Ẩm Gỗ Chuẩn EMC',
    category: 'structural',
    categoryLabel: 'Kết Cấu & Thô',
    standardSpec: 'Toàn bộ gỗ óc chó, gỗ sồi nhập khẩu được sấy buồng chân không vi tính hóa liên tục 21 ngày đạt độ ẩm cân bằng 10%–12%.',
    toolOrMethod: 'Lò sấy chân không áp suất âm + Máy đo độ ẩm tiếp xúc Wagner Meters Orion 950.',
    failureRiskAvoided: 'Loại bỏ hiện tượng cong vênh, vặn xoắn và nứt toác bề mặt gỗ khi chuyển giao giữa mùa mưa ẩm 90% và mùa nắng khô 40°C.',
    guHomesCommitment: 'Kiểm tra độ ẩm từng thanh phôi trước khi xẻ mộc; từ chối 100% phôi gỗ ẩm > 13%.',
    tolerance: 'EMC 10% – 12% ổn định',
  },
  {
    id: 'norm-03',
    number: '03',
    title: '100% Khớp Mộng Âm Dương Truyền Thống Xưởng Thạnh Xuân',
    shortTitle: 'Mộng Âm Dương Không Đinh Sắt',
    category: 'structural',
    categoryLabel: 'Kết Cấu & Thô',
    standardSpec: 'Liên kết hồi tủ, dầm bàn ăn, khung giường hoàn toàn bằng khớp mộng âm dương, mộng mang cá và chốt gỗ tự nhiên.',
    toolOrMethod: 'Máy phay CNC 5 trục + Bào mộc tay thép gió thủ công của nghệ nhân cả.',
    failureRiskAvoided: 'Tránh việc rỉ sét đinh sắt làm ố đen thớ gỗ và lỏng lẻo mối ghép sau 3–5 năm sử dụng.',
    guHomesCommitment: 'Bảo hành kết cấu mộng mộc 5 năm, định kỳ 6 tháng kiểm tra độ khít khao.',
    tolerance: 'Khe ghép mộng ≤ 0.15 mm',
  },
  {
    id: 'norm-04',
    number: '04',
    title: 'Ống Bảo Ôn Đôi Aeroflex Thái Lan Dày 19mm Chống Đọng Sương',
    shortTitle: 'Bảo Ôn Đôi Điều Hòa',
    category: 'mep-acoustics',
    categoryLabel: 'Cơ Điện & Âm Học',
    standardSpec: 'Hệ thống ống đồng điều hòa âm trần bọc bảo ôn đôi cao su lưu hóa kín khít, mối nối dán keo chuyên dụng và bọc băng bạc.',
    toolOrMethod: 'Ống bọc cao su lưu hóa Aeroflex Class 1 dày 19mm chống cháy lan.',
    failureRiskAvoided: 'Chấm dứt thảm họa ngưng tụ hơi nước nhỏ giọt làm ố vàng, mục nát trần thạch cao và ẩm mốc tủ gỗ âm trần.',
    guHomesCommitment: 'Kiểm tra nhiệt độ bề mặt ống bằng camera nhiệt hồng ngoại Fluke trước khi đóng trần.',
    tolerance: 'Độ dày cách nhiệt chuẩn 19mm',
  },
  {
    id: 'norm-05',
    number: '05',
    title: 'Cửa Gió Khe Hẹp Linear Slot Diffuser Giấu Viền Âm Trần',
    shortTitle: 'Miệng Gió Giấu Viền',
    category: 'mep-acoustics',
    categoryLabel: 'Cơ Điện & Âm Học',
    standardSpec: 'Cửa cấp và hồi gió điều hòa dạng rãnh khe dài không viền nhôm lộ mép (Trimless Linear Slot Diffuser), sơn tĩnh điện tiệp màu trần.',
    toolOrMethod: 'Khung nhôm định hình ép đùn chuyên dụng sơn nhám mờ tiệp màu sơn vôi Calce.',
    failureRiskAvoided: 'Loại bỏ mặt gió lưới nhôm thô kệch phá hỏng không gian Quiet Luxury tối giản.',
    guHomesCommitment: 'Vận tốc gió tại miệng thổi được tính toán dưới 1.8 m/s, không tạo tiếng rít gió khó chịu.',
    tolerance: 'Độ ồn luồng gió < 28 dB',
  },
  {
    id: 'norm-06',
    number: '06',
    title: 'Trần Thạch Cao Tiêu Âm Knauf 2 Lớp Dán Lưới Sợi Thủy Tinh Chống Nứt',
    shortTitle: 'Trần Tiêu Âm Chống Nứt',
    category: 'mep-acoustics',
    categoryLabel: 'Cơ Điện & Âm Học',
    standardSpec: 'Trần thạch cao tiêu âm gồm 2 lớp tấm Gyproc/Knauf so le mối nối, toàn bộ giáp mí dán lưới sợi thủy tinh 160g/m² phủ bột bả đàn hồi.',
    toolOrMethod: 'Khung xương Vĩnh Tường Pro cự ly 400x800mm gia cố ty ren chống rung.',
    failureRiskAvoided: 'Chống võng nứt đường chỉ trần thạch cao khi tòa nhà cao tầng rung lắc nhẹ hoặc chênh lệch nhiệt độ ngày đêm.',
    guHomesCommitment: 'Bảo hành chống nứt mối trần thạch cao 3 năm toàn phần.',
    tolerance: 'Hệ số tiêu âm NRC ≥ 0.65',
  },
  {
    id: 'norm-07',
    number: '07',
    title: 'Vật Liệu Xúc Giác Thuần Khiết 0% VOC - Dầu Osmo CHLB Đức',
    shortTitle: 'Dầu Osmo & Vôi Calce 0% VOC',
    category: 'finishing-lighting',
    categoryLabel: 'Hoàn Thiện & Ánh Sáng',
    standardSpec: 'Mọi bề mặt gỗ hoàn thiện bằng dầu lau Osmo chiết xuất từ dầu đậu nành, hướng dương và sáp ong; tường sơn vôi khoáng tự nhiên Calce Ý.',
    toolOrMethod: 'Thi công quét cọ mộc 3 lớp, chà nhám mịn xen kẽ giữa các lớp.',
    failureRiskAvoided: 'Không tồn đọng mùi sơn PU hóa chất hắc nồng gây đau đầu, dị ứng đường hô hấp cho trẻ nhỏ và gia chủ.',
    guHomesCommitment: 'Không gian bàn giao thơm nhẹ mùi gỗ tự nhiên mộc mạc, gia chủ có thể dọn vào ở ngay ngày hôm sau.',
    tolerance: 'VOC = 0.00% (Chứng chỉ EN 71.3)',
  },
  {
    id: 'norm-08',
    number: '08',
    title: 'Ánh Sáng Warm Dim Chip Bridgelux CRI ≥ 97, Chống Chói UGR < 16',
    shortTitle: 'Ánh Sáng Warm Dim CRI 98',
    category: 'finishing-lighting',
    categoryLabel: 'Hoàn Thiện & Ánh Sáng',
    standardSpec: 'Hệ thống đèn Spotlight âm trần sử dụng chip LED Bridgelux Pro với phổ màu đầy đủ (Full-spectrum), chóa tổ ong sâu giấu nguồn sáng góc 45°.',
    toolOrMethod: 'Đo kiểm bằng máy quang phổ Sekonic C-800 chuyên dụng ngành điện ảnh.',
    failureRiskAvoided: 'Loại bỏ tình trạng ánh sáng xanh gây mỏi mắt, lóa chói và biến dạng màu sắc của đá travertine hay gỗ tự nhiên.',
    guHomesCommitment: 'Chỉ số R9 (sắc tố đỏ tự nhiên) luôn đạt trên 90, mang lại làn da hồng hào khỏe mạnh dưới ánh đèn.',
    tolerance: 'CRI ≥ 97, UGR < 16',
  },
  {
    id: 'norm-09',
    number: '09',
    title: 'Khe Ron Co Ngót Âm Chân Tường 12mm Thích Ứng Giãn Nở Sài Gòn',
    shortTitle: 'Len Chân Tường Âm 12mm',
    category: 'finishing-lighting',
    categoryLabel: 'Hoàn Thiện & Ánh Sáng',
    standardSpec: 'Len chân tường làm âm phẳng mặt vách (Shadow Gap 12mm) tạo rãnh thoát ẩm và khoảng hở co giãn tự nhiên cho sàn gỗ tự nhiên.',
    toolOrMethod: 'Nẹp nhôm định hình âm tường Z-profile mạ anodized chống oxi hóa.',
    failureRiskAvoided: 'Triệt tiêu hiện tượng phồng rộp sàn gỗ đội tung góc tường vào những đợt triều cường và nồm ẩm kéo dài.',
    guHomesCommitment: 'Đảm bảo vẻ đẹp thanh thoát, đồ nội thất có thể kê sát tường mà không bị cấn phào nổi lỗi thời.',
    tolerance: 'Khe rãnh đều tăm tắp 12.0 mm',
  },
  {
    id: 'norm-10',
    number: '10',
    title: 'Thẻ Bảo Hành Số Hóa 5 Năm & Đo Độ Ẩm Miễn Phí Định Kỳ Trọn Đời',
    shortTitle: 'Bảo Hành Số Hóa & Đo Ẩm 6 Tháng',
    category: 'finishing-lighting',
    categoryLabel: 'Hoàn Thiện & Ánh Sáng',
    standardSpec: 'Mỗi công trình được cấp Thẻ Bảo Hành Gỗ Mộc Số Hóa định danh (GU-WTY-XXXX). Kỹ thuật viên GuHomes chủ động ghé thăm đo độ ẩm và dưỡng dầu gỗ miễn phí mỗi 6 tháng.',
    toolOrMethod: 'Hồ sơ điện tử tra cứu QR Code + Dụng cụ bảo dưỡng dầu hữu cơ chuyên dụng.',
    failureRiskAvoided: 'Tránh việc gia chủ bị bỏ rơi sau bàn giao, gỗ bị khô nứt do dùng hóa chất tẩy rửa công nghiệp sai cách.',
    guHomesCommitment: 'Cam kết có mặt trong vòng 24 giờ kể từ khi nhận phản hồi của gia chủ tại bất kỳ quận nào của TP.HCM.',
    tolerance: 'Phản hồi trong 24 giờ',
  },
]

export function TenEngineeringNormsSection({ className }: { className?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<EngineeringCategory>('all')
  const [expandedId, setExpandedId] = useState<string | null>('norm-01')

  const filteredNorms = ENGINEERING_NORMS.filter((norm) => {
    if (selectedCategory === 'all') return true
    return norm.category === selectedCategory
  })

  const handlePrintDossier = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <section className={cn('relative bg-canvas py-16 sm:py-24 border-y border-line overflow-hidden', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Engineering Manifesto</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ink mt-3 tracking-tight">
              10 Quy Chuẩn Thi Công Không Thỏa Hiệp
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-[64ch] mt-3 font-light leading-relaxed">
              Vẻ đẹp Quiet Luxury chỉ có thể đứng vững trên nền móng của kỷ luật kỹ thuật khắt khe. Dưới đây là 10 tiêu chuẩn công trường bắt buộc mà GuHomes áp dụng cho từng mét vuông căn hộ và biệt thự tại TP.HCM.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePrintDossier}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line bg-surface hover:border-accent text-xs font-mono text-ink tracking-wider transition-all shadow-sm"
            >
              <PrinterIcon className="text-base text-accent" />
              <span>In Bản Quy Chuẩn A4</span>
            </button>
            <a
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-canvas hover:bg-accent/90 text-xs font-mono tracking-wider transition-all shadow-md font-semibold"
            >
              <span>Xem Bóc Tách Dự Toán</span>
              <ArrowUpRightIcon className="text-sm" />
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            { id: 'all', label: 'Tất Cả 10 Quy Chuẩn' },
            { id: 'structural', label: 'Kết Cấu & Mộc Thô (01–03)' },
            { id: 'mep-acoustics', label: 'Cơ Điện MEP & Âm Học (04–06)' },
            { id: 'finishing-lighting', label: 'Hoàn Thiện & Ánh Sáng (07–10)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id as EngineeringCategory)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-mono transition-all',
                selectedCategory === tab.id
                  ? 'bg-ink text-canvas font-semibold shadow-sm'
                  : 'bg-surface border border-line text-muted hover:text-ink hover:border-line-strong'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Norms Interactive Accordion List */}
        <div className="mt-8 space-y-4">
          {filteredNorms.map((norm) => {
            const isExpanded = expandedId === norm.id

            return (
              <div
                key={norm.id}
                className={cn(
                  'rounded-2xl border transition-all duration-300 bg-surface overflow-hidden',
                  isExpanded ? 'border-accent shadow-xl ring-1 ring-accent/30' : 'border-line hover:border-line-strong'
                )}
              >
                {/* Clickable Header Bar */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : norm.id)}
                  className="w-full p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-mono text-xl sm:text-2xl font-light text-accent shrink-0">
                      {norm.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-canvas border border-line text-muted">
                          {norm.categoryLabel}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 font-medium">
                          Dung sai: {norm.tolerance}
                        </span>
                      </div>
                      <h3 className="font-serif text-base sm:text-xl font-medium text-ink">
                        {norm.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center shrink-0">
                    <span className="text-xs font-mono text-muted hidden md:inline-block">
                      {isExpanded ? 'Thu gọn chi tiết' : 'Xem thông số kỹ thuật'}
                    </span>
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs transition-transform duration-300',
                        isExpanded ? 'rotate-180 bg-accent text-white border-accent' : 'text-muted'
                      )}
                    >
                      ↓
                    </div>
                  </div>
                </button>

                {/* Expanded Detailed Specs Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-line/60 bg-canvas/40 px-5 py-6 sm:px-8 sm:py-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Standard Spec */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-muted uppercase block">
                            Quy chuẩn kỹ thuật:
                          </span>
                          <p className="text-xs font-light text-ink leading-relaxed">
                            {norm.standardSpec}
                          </p>
                        </div>

                        {/* Tool & Method */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-muted uppercase block">
                            Thiết bị &amp; Công nghệ đo:
                          </span>
                          <p className="text-xs font-light text-ink leading-relaxed">
                            {norm.toolOrMethod}
                          </p>
                        </div>

                        {/* Failure Risk Avoided */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-amber-700 uppercase block">
                            Triệt tiêu rủi ro:
                          </span>
                          <p className="text-xs font-light text-ink leading-relaxed">
                            {norm.failureRiskAvoided}
                          </p>
                        </div>

                        {/* GuHomes Commitment */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-accent uppercase block">
                            Cam kết bảo chứng GuHomes:
                          </span>
                          <p className="text-xs font-medium text-ink leading-relaxed">
                            {norm.guHomesCommitment}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Footer Guarantee Card */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-espresso to-[#2B231D] text-canvas p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-[62ch]">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Bảo Chứng Công Trình May Đo
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-canvas mt-2">
                Không Chỉ Thiết Kế Trên Bản Vẽ, Chúng Tôi Trực Tiếp Chịu Trách Nhiệm Từng Chi Tiết Mộc
              </h3>
              <p className="text-xs sm:text-sm text-canvas/80 mt-2 font-light leading-relaxed">
                Mỗi công trình hoàn thiện là danh dự nghề nghiệp của toàn thể đội ngũ KTS và thợ mộc xưởng Thạnh Xuân.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-canvas text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent/90 transition-all shadow-md"
              >
                <span>Hẹn Gặp KTS Trưởng</span>
                <ArrowUpRightIcon className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
