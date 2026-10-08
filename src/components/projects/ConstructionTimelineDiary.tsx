'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon, PrinterIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface ConstructionMilestone {
  step: number
  dayRange: string
  title: string
  subtitle: string
  stageTag: string
  equipment: string[]
  standards: string[]
  qaMetrics: {
    label: string
    value: string
    sub: string
  }[]
  craftInsight: string
  icon: string
}

export const CONSTRUCTION_MILESTONES: ConstructionMilestone[] = [
  {
    step: 1,
    dayRange: 'Ngày 01 – 12',
    title: 'Khảo Sát Laser 3D, Đo Đạc Vi Khí Hậu & Tháo Dỡ Kết Cấu',
    subtitle: 'Nền tảng chuẩn xác trước khi đặt nét vẽ kỹ thuật đầu tiên',
    stageTag: 'Giai đoạn 01 · Khảo sát hiện trường & Thô',
    equipment: [
      'Máy quét laser 3D Leica Geosystems (đo độ nghiêng sàn & dung sai tường < 1mm)',
      'Cảm biến nhiệt bức xạ Testo (đo nhiệt độ mặt kính hướng Tây và vận tốc gió)',
      'Máy dò cốt thép & cáp ngầm dầm sàn Hilti PS 250',
    ],
    standards: [
      'Khảo sát tĩnh tải và tải trọng dầm sàn bê tông cốt thép hiện hữu.',
      'Gia cố chống nứt các vị trí đục cắt tường ngăn bằng lưới sợi thủy tinh 160g/m².',
      'Che chắn 3 lớp màng PE bảo vệ tuyệt đối khu vực hành lang và thang máy tòa nhà.',
    ],
    qaMetrics: [
      { label: 'Dung sai đo trắc đạc', value: '≤ 1.0 mm', sub: 'Máy quét 3D toàn phần' },
      { label: 'Đo bức xạ nhiệt', value: '42°C → 26°C', sub: 'Mô phỏng chênh lệch' },
      { label: 'Bảo vệ hiện trường', value: '100% 3 Lớp', sub: 'Tiêu chuẩn ban quản lý' },
    ],
    craftInsight:
      'Mười phút đứng im trong căn hộ khi cơn mưa rào chiều tháng 6 ập xuống nói được nhiều điều hơn mọi bản vẽ CAD: chỗ nào ẩm đọng, khe cửa nào gió rít và góc tường nào bị râm mát.',
    icon: '📐',
  },
  {
    step: 2,
    dayRange: 'Ngày 13 – 28',
    title: 'Hạ Tầng Cơ Điện MEP Ngầm, Điều Hòa Giấu Trần & Tiêu Âm Đa Lớp',
    subtitle: 'Hệ mạch máu ngầm bền bỉ 20 năm, triệt tiêu tiếng dội ồn đô thị',
    stageTag: 'Giai đoạn 02 · Kỹ thuật cơ điện & Tiêu âm',
    equipment: [
      'Ống đồng bọc bảo ôn đôi Aeroflex Thái Lan dày 19mm chống đọng sương',
      'Hệ cửa gió khe hẹp Linear Slot Diffuser giấu viền khung thạch cao',
      'Dây điện lõi đồng bọc chống cháy Cadivi nguyên cuộn kiểm định',
    ],
    standards: [
      'Trần thạch cao tiêu âm 2 lớp tấm Gyproc chống võng nứt và triệt tiêu tiếng vang dội < 32dB.',
      'Thử áp lực đường ống nước cấp ở 8 bar liên tục trong 48 giờ trước khi lấp hộp gen.',
      'Hệ thống thông gió hút mùi độc lập có van một chiều ngăn mùi ngược từ trục kỹ thuật tòa nhà.',
    ],
    qaMetrics: [
      { label: 'Độ ồn máy lạnh trần', value: '< 28 dB', sub: 'Êm ái cho giấc ngủ sâu' },
      { label: 'Thử áp đường nước', value: '8 Bar / 48h', sub: 'Không rò rỉ 1 giọt' },
      { label: 'Vỏ cách âm ống thoát', value: '2 Lớp Foam', sub: 'Tiêu âm dòng chảy' },
    ],
    craftInsight:
      'Điều hòa tốt nhất là điều hòa mà bạn không thấy nó ở đâu và không nghe thấy tiếng nó chạy, chỉ thấy một làn gió mát nhẹ như gió sông len lỏi qua từng kẽ tóc.',
    icon: '⚡',
  },
  {
    step: 3,
    dayRange: 'Ngày 29 – 52',
    title: 'Chế Tác Mộc Thửa Riêng Tại Xưởng Thạnh Xuân 1.200m²',
    subtitle: 'Nghệ thuật mộng ghép âm dương & thẩm thấu dầu hữu cơ Đức',
    stageTag: 'Giai đoạn 03 · Gia công mộc tại xưởng',
    equipment: [
      'Lò sấy chân không vi tính hóa kiểm soát độ ẩm gỗ đạt chuẩn EMC 10–12%',
      'Máy phay CNC 5 trục gia công mộng mang cá và rãnh trượt chính xác tuyệt đối',
      'Đục mộc thủ công thép gió Nhật Bản và máy chà nhám Festool tuần tự 8 cấp hạt',
    ],
    standards: [
      'Khớp mộng âm dương truyền thống gia cố chốt gỗ tự nhiên, triệt tiêu đinh ốc kim loại lộ mép.',
      'Phủ 3 lớp dầu Osmo CHLB Đức chiết xuất từ dầu hướng dương và sáp Carnauba, 0% VOC.',
      'Lắp dựng thử nghiệm toàn phần (Dry-fit assembly) ngay tại mặt sàn xưởng trước khi đóng gói.',
    ],
    qaMetrics: [
      { label: 'Độ ẩm gỗ đầu ra', value: '10% – 12%', sub: 'Cân bằng vi khí hậu HCM' },
      { label: 'Hàm lượng độc hại VOC', value: '0.00%', sub: 'Dầu lau hữu cơ Đức' },
      { label: 'Độ bền đóng mở ray Blum', value: '200.000 Lần', sub: 'Bảo hành kết cấu 5 năm' },
    ],
    craftInsight:
      'Gỗ có sự sống của nó. Khi được sấy đúng độ ẩm và thở bằng dầu thực vật tự nhiên, thớ gỗ óc chó sẽ không bao giờ cong vênh dù trời Sài Gòn có chuyển mùa từ mưa sang nắng gắt.',
    icon: '🪵',
  },
  {
    step: 4,
    dayRange: 'Ngày 53 – 68',
    title: 'Lắp Đặt Hoàn Thiện Hiện Trường & Căn Chỉnh Khe Ron Âm 3mm',
    subtitle: 'Đưa tuyệt tác xưởng mộc vào không gian thực với độ chính xác milimet',
    stageTag: 'Giai đoạn 04 · Lắp đặt tại công trình',
    equipment: [
      'Thước thủy điện tử Bosch GIM 60 đo độ thẳng đứng sai số < 0.5mm',
      'Máy bắn tia laser cân mực 12 tia xanh siêu nét Leica Lino L6G',
      'Súng bắn keo silicone trung tính Dow Corning chuyên dụng không mùi',
    ],
    standards: [
      'Khe giãn nở chân tường âm sàn 12mm thích ứng giãn nở tự nhiên mùa mưa nhiệt đới.',
      'Căn chỉnh bản lề âm Hafele/Blum giảm chấn với khe hở giữa 2 cánh tủ đều tăm tắp 2.5mm.',
      'Đá tự nhiên Travertine liên kết móc treo inox 304 cơ học, chống rơi vỡ tuyệt đối.',
    ],
    qaMetrics: [
      { label: 'Sai số lắp dựng tủ kịch trần', value: '≤ 0.5 mm', sub: 'Thước điện tử kiểm soát' },
      { label: 'Độ phẳng mạch gạch/đá', value: '100% Phẳng', sub: 'Ke cân bằng chuyên dụng' },
      { label: 'Bọc bảo vệ bề mặt', value: 'Màng PE 2mm', sub: 'Chống xước va đập' },
    ],
    craftInsight:
      'Một milimet ở xưởng mộc có thể sửa bằng lưỡi bào, nhưng một milimet ngoài công trường nếu cẩu thả sẽ làm hỏng cả sự liền mạch của một mảng tường ốp gỗ.',
    icon: '🔨',
  },
  {
    step: 5,
    dayRange: 'Ngày 69 – 75',
    title: 'Nghiệm Thu Ánh Sáng Warm Dim CRI 98, Vệ Sinh Tinh & Chìa Khóa Trao Tay',
    subtitle: 'Nốt lặng thiêng liêng khi căn nhà đứng yên chào đón người thân quý',
    stageTag: 'Giai đoạn 05 · Hoàn thiện mỹ học & Bàn giao',
    equipment: [
      'Máy đo quang phổ Sekonic C-800 kiểm tra độ hoàn màu CRI > 97 và UGR < 16',
      'Máy đo chất lượng không khí Formaldehyde / PM2.5 cầm tay',
      'Bộ hút bụi công nghiệp lọc HEPA 3 cấp độ vệ sinh tinh tươm',
    ],
    standards: [
      'Căn chỉnh từng góc chiếu đèn Spotlight 2700K rọi đúng tâm tác phẩm nghệ thuật và mặt bàn ăn.',
      'Bàn giao bộ Hồ Sơ Hoàn Công In Ấn A4 Dossier sang trọng, kèm sơ đồ điện nước ngầm.',
      'Kích hoạt Thẻ Bảo Hành Mộc Số Hóa 5 năm kết cấu và chương trình bảo trì định kỳ 6 tháng/lần.',
    ],
    qaMetrics: [
      { label: 'Chỉ số hoàn màu ánh sáng', value: 'CRI 98.4', sub: 'Ánh sáng tôn vinh nội thất' },
      { label: 'Nồng độ bụi PM2.5 phòng', value: '< 10 µg/m³', sub: 'Không khí thanh khiết' },
      { label: 'Thời gian bảo hành mộc', value: '05 Năm', sub: 'Bảo trì trọn đời tổ ấm' },
    ],
    craftInsight:
      'Sáng hôm bàn giao, chúng tôi luôn đến sớm tắt hết đèn trần, đợi nắng tắt hẳn rồi bật lại từng ngọn một, chỉnh độ rủ của rèm lanh cho đến khi căn phòng hoàn toàn đứng yên.',
    icon: '🔑',
  },
]

export function ConstructionTimelineDiary({ className }: { className?: string }) {
  const [activeStep, setActiveStep] = useState<number>(3) // Default to Woodshop crafting
  const currentMilestone =
    CONSTRUCTION_MILESTONES.find((m) => m.step === activeStep) ?? CONSTRUCTION_MILESTONES[0]!

  return (
    <section className={cn('relative bg-[#0A0D0C] text-[#F3F1EC] py-16 sm:py-24 overflow-hidden border-t border-white/10', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Minh Bạch Tiến Độ Thực Địa</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-3 tracking-tight">
              Nhật Ký Thi Công Kiến Trúc 75 Ngày
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[62ch] mt-3 font-light leading-relaxed">
              Mỗi căn hộ và biệt thự GuHomes nhận bàn giao đều đi qua 5 cột mốc nghiêm cẩn này. Không đốt cháy giai đoạn, không giao khoán cho thợ ngoài, và kiểm soát chất lượng chuẩn xác từng milimet.
            </p>
          </div>

          {/* Action Link: Download QA Standard */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs font-mono transition-colors"
            >
              <PrinterIcon className="text-sm" />
              <span>In Quy Chuẩn Thi Công 75 Ngày</span>
            </button>
            <a
              href="tel:0368757916"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent hover:bg-accent/90 text-white text-xs font-mono transition-all shadow-lg shadow-accent/20"
            >
              <span>Hotline KTS Công Trường: 0368 757 916</span>
              <ArrowUpRightIcon className="text-sm" />
            </a>
          </div>
        </div>

        {/* 5-Step Horizontal Interactive Timeline Bar */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CONSTRUCTION_MILESTONES.map((m) => {
            const isSelected = activeStep === m.step
            return (
              <button
                key={m.step}
                type="button"
                onClick={() => setActiveStep(m.step)}
                className={cn(
                  'p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[110px]',
                  isSelected
                    ? 'bg-accent/20 border-accent text-white shadow-xl scale-[1.02] ring-1 ring-accent'
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.07] hover:text-white',
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg">{m.icon}</span>
                  <span className={cn('text-[11px] font-mono font-semibold', isSelected ? 'text-accent' : 'text-white/40')}>
                    Bước 0{m.step}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold block text-white mt-2">
                    {m.dayRange}
                  </span>
                  <p className="text-[11px] font-serif line-clamp-1 opacity-80 mt-0.5">
                    {m.title}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Milestone Deep Inspection Card */}
        <div className="mt-10 bg-[#090C0B] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMilestone.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-wider">
                      {currentMilestone.stageTag}
                    </span>
                    <span className="text-xs font-mono text-white/50">{currentMilestone.dayRange}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl text-white font-light mt-3">
                    {currentMilestone.title}
                  </h3>
                  <p className="text-accent text-xs sm:text-sm font-mono mt-1">
                    {currentMilestone.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-3xl">
                    {currentMilestone.icon}
                  </div>
                </div>
              </div>

              {/* 3 Metric Gauges Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentMilestone.qaMetrics.map((qm, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                      {qm.label}
                    </span>
                    <p className="font-serif text-2xl sm:text-3xl text-accent font-light mt-1">
                      {qm.value}
                    </p>
                    <span className="text-[11px] text-white/60 font-mono block mt-1">
                      {qm.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical Specifications Grid: Equipment & Standards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Equipment */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <p className="text-xs font-mono uppercase text-accent tracking-wider font-semibold mb-3 flex items-center gap-2">
                    <span>🔬 Thiết Bị &amp; Công Nghệ Đo Đạc Sử Dụng:</span>
                  </p>
                  <ul className="space-y-2 text-xs text-white/80 font-light leading-relaxed">
                    {currentMilestone.equipment.map((eq, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Standards */}
                <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30">
                  <p className="text-xs font-mono uppercase text-accent tracking-wider font-semibold mb-3 flex items-center gap-2">
                    <span>✓ Quy Chuẩn Kiểm Soát Chất Lượng Bắt Buộc:</span>
                  </p>
                  <ul className="space-y-2 text-xs text-white/90 font-light leading-relaxed">
                    {currentMilestone.standards.map((st, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-accent mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[10px]">
                          ✓
                        </span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Craft Insight Quote */}
              <div className="p-5 rounded-2xl bg-[#131715] border border-white/10 flex items-start gap-4">
                <span className="text-2xl text-accent shrink-0 mt-0.5">💬</span>
                <div>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">
                    Góc Nhìn Thực Địa Của KTS Trưởng:
                  </p>
                  <p className="text-xs sm:text-sm text-white/90 italic font-light leading-relaxed">
                    &quot;{currentMilestone.craftInsight}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
