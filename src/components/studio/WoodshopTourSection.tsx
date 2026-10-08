'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon } from '@/components/ui/icons'

export interface WoodshopStage {
  id: number
  title: string
  subtitle: string
  tag: string
  description: string
  technicalDetail: string
  craftSecret: string
  icon: string
}

const STAGES: WoodshopStage[] = [
  {
    id: 1,
    title: 'Cân Bằng Độ Ẩm Vi Khí Hậu Sài Gòn',
    subtitle: 'Lò sấy nhiệt chân không đạt chuẩn EMC 10–12%',
    tag: 'Giai đoạn 01 · Nguyên liệu đầu vào',
    description:
      'Gỗ óc chó Bắc Mỹ (FAS) và sồi trắng nhập khẩu luôn trải qua quá trình ổn định độ ẩm trong lò sấy nhiệt chân không tại xưởng Thạnh Xuân suốt 14 ngày. Quá trình này đưa độ ẩm thớ gỗ về ngưỡng 10%–12% — chính xác bằng độ ẩm cân bằng (EMC) trung bình năm của TP. Hồ Chí Minh.',
    technicalDetail: 'Kiểm tra độ ẩm bằng máy đo cảm biến điện từ Wagner Meters tại 6 điểm trên mỗi hộp gỗ.',
    craftSecret: 'Triệt tiêu 99% hiện tượng cong vênh, vặn xoắn và nứt dăm khi thời tiết chuyển mùa từ mưa sang nắng gắt.',
    icon: '🔥',
  },
  {
    id: 2,
    title: 'Mộng Ghép Âm Dương Truyền Thống',
    subtitle: 'Khắc ghi độ bền vững qua hàng thập kỷ',
    tag: 'Giai đoạn 02 · Kết cấu chịu lực',
    description:
      'Thay vì phụ thuộc vào đinh ốc kim loại hay keo dán công nghiệp dễ bị xơ hoá dưới độ ẩm 80%, mọi khung xương tủ áo, đảo bếp và phản giường GuHomes đều được gia công liên kết mộng mang cá (Dovetail), mộng âm dương kín khít đến từng đường cưa.',
    technicalDetail: 'Mộng gỗ cắt gọt bằng máy phay CNC 5 trục kết hợp tinh chỉnh thủ công bằng đục mộc Nhật Bản.',
    craftSecret: 'Gỗ liên kết với gỗ theo nguyên lý giãn nở đồng nhất, càng qua thời gian càng siết chặt và bền bỉ.',
    icon: '🪵',
  },
  {
    id: 3,
    title: 'Bào Tay Thủ Công & Chà Nhám 8 Cấp Độ',
    subtitle: 'Đánh thức xúc giác chân thực của thớ gỗ tự nhiên',
    tag: 'Giai đoạn 03 · Xử lý bề mặt mộc',
    description:
      'Người thợ cả GuHomes dùng thước cặp và lưỡi bào thép gió vuốt êm từng mép cạnh. Quá trình chà nhám thủ công tuần tự qua 8 cấp độ hạt từ P120, P180, P240, P320, P400 đến P800, loại bỏ hoàn toàn dăm gỗ mà không làm mất đi xúc giác ấm áp mộc mạc.',
    technicalDetail: 'Bo tròn bán kính R2–R5mm tại các góc cạnh tiếp xúc tay người, tạo cảm giác thân thiện khi chạm.',
    craftSecret: 'Chà nhám theo đúng chiều dọc thớ gỗ, giữ trọn ánh xà cừ tự nhiên của vân mây gỗ óc chó.',
    icon: '✨',
  },
  {
    id: 4,
    title: 'Thẩm Thấu Dầu Hữu Cơ Osmo (CHLB Đức)',
    subtitle: '0% VOC độc hại — Để thớ gỗ thở tự nhiên',
    tag: 'Giai đoạn 04 · Hoàn thiện bảo vệ',
    description:
      'GuHomes kiên quyết từ chối sơn PU bóng công nghiệp tạo màng nhựa bịt kín gỗ. Chúng tôi dùng 100% dầu lau hữu cơ Osmo chiết xuất từ dầu hạt lanh, dầu hướng dương và sáp Carnauba nhập khẩu Đức. Dầu thẩm thấu sâu vào tế bào gỗ, chống thấm nước tuyệt đối nhưng cho phép vi khí hậu trao đổi tự nhiên.',
    technicalDetail: 'Thi công 2 lớp lót thẩm thấu sâu và 1 lớp sáp bóng mờ bảo vệ bề mặt, khô tự nhiên 24 giờ.',
    craftSecret: 'Bề mặt gỗ sờ mịn mát, tỏa hương dầu thực vật dễ chịu, an toàn tuyệt đối cho trẻ nhỏ và người lớn tuổi.',
    icon: '🌿',
  },
  {
    id: 5,
    title: 'Đo Đạc Dung Sai Laser & Đóng Gói 3 Lớp',
    subtitle: 'Nghiệm thu xưởng trước khi lên xe công trình',
    tag: 'Giai đoạn 05 · Kiểm định xuất xưởng',
    description:
      'Mỗi module tủ bếp, vách ốp được lắp dựng thử nghiệm toàn phần (Dry-fit assembly) ngay tại mặt sàn phẳng 1.200m² của xưởng. Kỹ sư trưởng dùng máy đo khoảng cách laser kiểm tra độ nghiêng và khe hở với dung sai cho phép ≤ 1.0mm trước khi bọc bảo vệ 3 lớp.',
    technicalDetail: 'Quy chuẩn đóng gói: Lớp 1 màng xốp PE 2mm chống xước, Lớp 2 bọc góc carton 5 lớp, Lớp 3 màng co màng PE.',
    craftSecret: 'Đảm bảo sản phẩm khi cập bến Penthouse hay Biệt thự đều nguyên vẹn hoàn hảo, rút ngắn thời gian lắp đặt còn 1/3.',
    icon: '🎯',
  },
]

export function WoodshopTourSection({ className }: { className?: string }) {
  const [activeStep, setActiveStep] = useState(1)
  const currentStage = STAGES.find((s) => s.id === activeStep) ?? STAGES[0]!

  return (
    <section className={cn('bg-[#0E1211] text-[#F3F1EC] py-[clamp(4.5rem,10vh,8rem)] relative overflow-hidden', className)}>
      {/* Background Architectural Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Masthead */}
        <div className="grid grid-cols-12 gap-8 items-end pb-10 border-b border-white/10">
          <div className="col-span-12 lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Xưởng Mộc May Đo Thạnh Xuân · Quận 12</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white mt-4 tracking-tight">
              1.200m² Thực Lực Xưởng Mộc Gia Truyền
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-[58ch] mt-4 font-light leading-relaxed">
              Khác biệt của GuHomes không nằm ở bản vẽ 3D trên màn hình, mà ở 18 người thợ cả với hơn 15 năm tuổi nghề, lò sấy nhiệt chân không vi khí hậu và sự chuẩn mực tới từng milimet khe co ngót.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-3 text-xs font-mono text-white/60">
            <p>QUY MÔ: <span className="text-white">1.200m² mặt sàn may đo</span></p>
            <p>NGHỆ NHÂN: <span className="text-white">18 thợ cả &gt;15 năm kinh nghiệm</span></p>
            <p>TIÊU CHUẨN GỖ: <span className="text-accent">100% FAS Bắc Mỹ · EMC 10–12%</span></p>
          </div>
        </div>

        {/* 4 Key Statistics Cards */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-[#090C0B] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-white/50">MẶT SÀN SẢN XUẤT</span>
            <p className="font-serif text-3xl sm:text-4xl text-white font-light mt-3">1.200 m²</p>
            <p className="text-xs text-white/60 mt-1">Chuyên may đo đơn chiếc từ 2016</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090C0B] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-white/50">NGHỆ NHÂN MỘC</span>
            <p className="font-serif text-3xl sm:text-4xl text-accent font-light mt-3">18 Bác Thợ</p>
            <p className="text-xs text-white/60 mt-1">Tay nghề mộng âm dương &gt;15 năm</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090C0B] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-white/50">ĐỘ ẨM GỖ EMC SÀI GÒN</span>
            <p className="font-serif text-3xl sm:text-4xl text-white font-light mt-3">10% – 12%</p>
            <p className="text-xs text-white/60 mt-1">Sấy chân không triệt tiêu cong vênh</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090C0B] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-white/50">DUNG SAI THI CÔNG</span>
            <p className="font-serif text-3xl sm:text-4xl text-accent font-light mt-3">&le; 1.0 mm</p>
            <p className="text-xs text-white/60 mt-1">Kiểm định laser trước khi xuất xưởng</p>
          </div>
        </div>

        {/* 5 Stages Interactive Showcase */}
        <div className="mt-14 grid grid-cols-12 gap-8 items-start">
          {/* Step Selector List */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
            <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">
              5 Công Đoạn Chế Tác Độc Bản:
            </p>
            {STAGES.map((s) => {
              const isActive = activeStep === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={cn(
                    'p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 flex items-start gap-4',
                    isActive
                      ? 'bg-accent/20 border-accent text-white shadow-xl scale-[1.01]'
                      : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.07] hover:border-white/20',
                  )}
                >
                  <span className="text-2xl shrink-0 mt-0.5">{s.icon}</span>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-accent">0{s.id}.</span>
                      <h4 className="font-serif text-base sm:text-lg text-white font-normal truncate">{s.title}</h4>
                    </div>
                    <p className="text-xs text-white/60 mt-1 line-clamp-1">{s.subtitle}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Detailed Stage Content Card */}
          <div className="col-span-12 lg:col-span-7 bg-[#090C0B] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">{currentStage.tag}</span>
                    <span className="text-xs font-mono text-white/40">Bước {currentStage.id} / 05</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-4">
                    {currentStage.title}
                  </h3>
                  <p className="text-accent text-sm font-mono mt-1">{currentStage.subtitle}</p>

                  <p className="text-white/80 text-sm sm:text-base mt-5 font-light leading-relaxed">
                    {currentStage.description}
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                      <p className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">Quy chuẩn kỹ thuật:</p>
                      <p className="text-xs text-white/70 mt-1.5 leading-relaxed">{currentStage.technicalDetail}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
                      <p className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">Bí quyết thợ cả GuHomes:</p>
                      <p className="text-xs text-white/90 mt-1.5 leading-relaxed font-light">{currentStage.craftSecret}</p>
                    </div>
                  </div>
                </div>

                {/* Visit Registration Banner inside card */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono text-white/50">ĐÍCH THÂN TRẢI NGHIỆM XƯỞNG MỘC</p>
                    <p className="text-xs text-white/80 mt-0.5">Mời gia chủ ghé thăm và chạm thử vật liệu thực tế</p>
                  </div>

                  <a
                    href="tel:0368757916"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shrink-0 shadow-lg shadow-accent/20"
                  >
                    <span>Đặt lịch tham quan: 0368 757 916</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
