'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface AcousticLayer {
  number: string
  titleVi: string
  subtitleVi: string
  stcRating: string
  nrcRating: string
  detailVi: string
  icon: string
}

const ACOUSTIC_LAYERS: AcousticLayer[] = [
  {
    number: '01',
    titleVi: 'Vách Thạch Cao Tiêu Âm Đôi Knauf Cleaneo & Rockwool',
    subtitleVi: 'Cấu Trúc Khung Độc Lập Chống Cầu Âm (De-coupled Studs)',
    stcRating: 'STC 65 dB',
    nrcRating: 'NRC 0.75',
    detailVi:
      'Hệ khung xương kép độc lập không chạm nhau, nhồi bông khoáng tỷ trọng cao Rockwool 80kg/m³. Bề mặt ốp tấm Knauf Cleaneo đục lỗ ngẫu nhiên hấp thụ dải tần giọng nói và âm trầm tivi từ phòng khách lân cận.',
    icon: '🧱',
  },
  {
    number: '02',
    titleVi: 'Cửa Gỗ Đặc 55mm Bọc Da & Gioăng Từ Tính Kép',
    subtitleVi: 'Hệ Thống Hạ Âm Drop-Down Seal Tự Động Khi Đóng',
    stcRating: 'STC 44 dB',
    nrcRating: 'Kín Khí 100%',
    detailVi:
      'Cánh cửa gỗ óc chó đặc nguyên khối dày 55mm chèn lõi cao su non giảm chấn. Chân cửa trang bị thanh drop-down seal tự động ấn sát sàn khi đóng, gioăng từ tính viền quanh khung chặn đứng luồng âm rò qua khe hở.',
    icon: '🚪',
  },
  {
    number: '03',
    titleVi: 'Kính Hộp 3 Lớp Chân Không Giảm Rung Dải Tần Thấp',
    subtitleVi: 'Triệt Tiêu Tiếng Rền Xe Tải & Động Cơ Máy Bay Cất Cánh',
    stcRating: 'STC 52 dB',
    nrcRating: 'Cản Âm Trầm 98%',
    detailVi:
      'Cấu tạo kính nhiều lớp dán màng PVB âm học Acoustic Interlayer với độ dày kính không đồng nhất (8mm + 12mm Argon + 6mm + 6mm Laminated) phá vỡ hiện tượng cộng hưởng tần số thấp đặc thù của giao thông đô thị.',
    icon: '🪟',
  },
  {
    number: '04',
    titleVi: 'Vách Ốp Nỉ Len Tự Nhiên Kvadrat & Bông Tiêu Âm',
    subtitleVi: 'Triệt Tiêu Tiếng Vang Flutter Echo Trong Phòng Ngủ',
    stcRating: 'Hấp thụ tán xạ',
    nrcRating: 'NRC 0.85',
    detailVi:
      'Vải nỉ len cừu tự nhiên nhập khẩu từ Kvadrat (Đan Mạch) bọc mút xốp chống cháy. Khi gia chủ trò chuyện, âm thanh không bị dội lại từ tường bê tông, mang lại cảm giác dịu êm, ấm cúng và che chở như trong một kén tằm.',
    icon: '🛋️',
  },
]

export function AcousticSanctuaryMasterSuite({ className }: { className?: string } = {}) {
  const [selectedEnv, setSelectedEnv] = useState<'street' | 'standard' | 'guhomes'>('guhomes')
  const [consultationModalOpen, setConsultationModalOpen] = useState(false)

  const envData = {
    street: {
      db: 78,
      label: 'Mặt Phố Sài Gòn Giờ Cao Điểm',
      desc: 'Còi xe máy, động cơ xe buýt, tiếng cồn cào đường phố gây căng thẳng thần kinh liên tục.',
      color: 'text-red-400',
      bgColor: 'border-red-500/40 bg-red-950/20',
      barWidth: '95%',
      stressLevel: 'Rất Cao (Gây mất ngủ mạn tính)',
    },
    standard: {
      db: 52,
      label: 'Căn Hộ Chung Cư / Nhà Phố Thông Thường',
      desc: 'Cửa kính thường và tường đơn: vẫn nghe rõ tiếng thang máy, máy bay và bước chân tầng trên.',
      color: 'text-amber-400',
      bgColor: 'border-amber-500/40 bg-amber-950/20',
      barWidth: '65%',
      stressLevel: 'Trung Bình (Dễ giật mình giữa đêm)',
    },
    guhomes: {
      db: 22,
      label: 'Phòng Ngủ Master GuHomes Chuẩn NC-25',
      desc: 'Tĩnh lặng như một phòng thu âm tiêu chuẩn quốc tế. Chỉ còn lại nhịp thở êm dịu và tiếng lật trang sách.',
      color: 'text-emerald-400',
      bgColor: 'border-emerald-500/40 bg-emerald-950/20',
      barWidth: '25%',
      stressLevel: 'Tuyệt Đối Thư Thái (Giấc ngủ sâu REM)',
    },
  }

  const currentEnv = envData[selectedEnv]

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0c0a] py-24 text-[#e8e4df] border-t border-[#1d1d1a]', className)}>
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d2d28] bg-[#141411] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Âm Học Kiến Trúc · Sleep Sanctuary NC-25
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Phòng Ngủ Master Tiêu Âm Siêu Tĩnh Mịch NC-25
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Giấc ngủ là nơi tái tạo năng lượng tối thượng của con người. Tại một đô thị không bao giờ ngủ như Sài Gòn, GuHomes kiến tạo cấu trúc phòng ngủ Room-in-Room chuẩn NC-25 (&lt; 25 dBA), mang lại sự tĩnh lặng tuyệt đối cho tư gia.
          </p>
        </div>

        {/* Acoustic Simulator Cockpit */}
        <div className="mb-14 rounded-2xl border border-[#262622] bg-[#12120f] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#20201c] pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                Mô Phỏng Thực Tế Âm Thanh Đô Thị (Decibel Spectrum)
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f4efe6]">
                So Sánh Mức Độ Ô Nhiễm Tiếng Ồn
              </h3>
            </div>
            <div className="inline-flex rounded-lg border border-[#2b2b26] bg-[#171713] p-1">
              {[
                { id: 'street', label: 'Ngoài Phố (78dB)' },
                { id: 'standard', label: 'Phòng Thường (52dB)' },
                { id: 'guhomes', label: 'GuHomes NC-25 (22dB)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedEnv(tab.id as any)}
                  className={cn(
                    'rounded-md px-3.5 py-2 text-xs font-medium transition-all',
                    selectedEnv === tab.id
                      ? 'bg-[#d4af37] text-black font-semibold shadow'
                      : 'text-[#8e8a83] hover:text-[#f4efe6]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
            {/* Meter Card (5 cols) */}
            <div className={cn('lg:col-span-5 rounded-xl border p-6 text-center transition-all duration-500', currentEnv.bgColor)}>
              <span className="font-mono text-xs uppercase tracking-wider text-[#a8a29e]">
                MỨC ĐỘ TIẾNG ỒN ĐO ĐƯỢC
              </span>
              <div className={cn('mt-2 font-mono text-5xl sm:text-6xl font-extralight tracking-tight', currentEnv.color)}>
                {currentEnv.db} <span className="text-2xl sm:text-3xl font-normal">dBA</span>
              </div>
              <div className="mt-3 text-sm font-medium text-[#f4efe6]">{currentEnv.label}</div>
              <div className="mt-1 text-xs text-[#a8a29e]">{currentEnv.stressLevel}</div>

              {/* Animated Decibel Meter Bar */}
              <div className="mt-6 h-2 w-full rounded-full bg-[#1e1e1a] overflow-hidden">
                <div
                  className={cn('h-full transition-all duration-700', selectedEnv === 'street' ? 'bg-red-500' : selectedEnv === 'standard' ? 'bg-amber-400' : 'bg-emerald-400')}
                  style={{ width: currentEnv.barWidth }}
                />
              </div>
            </div>

            {/* Scientific Explanation (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#a8a29e] leading-relaxed">
              <p className="text-[#f4efe6] text-base font-medium">
                {currentEnv.desc}
              </p>
              <p>
                Tiêu chuẩn tiếng ồn <strong className="text-[#d4af37]">NC-25 (Noise Criterion 25)</strong> là tiêu chuẩn vàng được áp dụng tại các phòng hòa nhạc thính phòng và phòng thu âm đắt giá nhất thế giới. Ở mức 22 dBA, tiếng ồn đô thị hoàn toàn biến mất khỏi nhận thức của thính giác, đưa nhịp tim và sóng não người trở về trạng thái thả lỏng sâu.
              </p>
              <div className="rounded-lg border border-[#292924] bg-[#161612] p-4 text-xs text-[#c4beb5] flex items-center gap-3">
                <span className="text-2xl">💤</span>
                <div>
                  <strong className="text-[#f4efe6] block mb-0.5">Lợi Ích Sức Khỏe Lâu Dài:</strong>
                  Giảm 40% nồng độ hormone căng thẳng Cortisol trong máu sau 30 ngày ngủ trong không gian đạt chuẩn NC-25.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Acoustic Layers Grid */}
        <div className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6]">
              4 Lớp Cấu Trúc Tiêu Âm &quot;Room-in-Room&quot;
            </h3>
            <span className="font-mono text-xs text-[#d4af37]">Tiêu Chuẩn STC 65 dB</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ACOUSTIC_LAYERS.map((layer) => (
              <div
                key={layer.number}
                className="group relative rounded-xl border border-[#242420] bg-[#131310] p-6 transition-all duration-300 hover:border-[#383830] hover:bg-[#161612]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#d4af37]">{layer.number}</span>
                  <span className="text-2xl">{layer.icon}</span>
                </div>
                <h4 className="mt-4 font-serif text-base font-medium text-[#f4efe6] group-hover:text-[#d4af37] transition-colors line-clamp-2">
                  {layer.titleVi}
                </h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded bg-[#1f1f1a] px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-[#2e2e26]">
                    {layer.stcRating}
                  </span>
                  <span className="rounded bg-[#1f1f1a] px-2 py-0.5 font-mono text-[10px] text-[#a8a29e] border border-[#2e2e26]">
                    {layer.nrcRating}
                  </span>
                </div>
                <p className="mt-1 text-xs font-mono text-[#7a766f] line-clamp-1">{layer.subtitleVi}</p>
                <p className="mt-3 text-xs leading-relaxed text-[#a8a29e]">{layer.detailVi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-xl border border-[#2d2a22] bg-gradient-to-r from-[#171511] via-[#14120e] to-[#0f0e0c] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-lg sm:text-xl text-[#f4efe6]">
              Đo Kiểm Độ Ồn & Tư Vấn Tiêu Âm Tại Tư Gia
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-[#a8a29e]">
              Kỹ sư âm học GuHomes mang máy đo âm phổ chuyên dụng NTi Audio Thụy Sĩ đến đo kiểm thực địa phòng ngủ hiện hữu của gia đình bạn.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConsultationModalOpen(true)}
            className="w-full sm:w-auto shrink-0 rounded-lg bg-[#d4af37] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#e6c158] active:scale-[0.98]"
          >
            Đăng Ký Đo Kiểm Âm Học
          </button>
        </div>

        {/* Modal: Đăng Ký Đo Kiểm Âm Học */}
        <AnimatePresence>
          {consultationModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full rounded-2xl border border-[#332e24] bg-[#141412] p-6 sm:p-8 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#242420]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                      ✓
                    </span>
                    <h4 className="font-serif text-lg text-[#f4efe6]">Khảo Sát Âm Học Phòng Ngủ</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConsultationModalOpen(false)}
                    className="text-[#706c66] hover:text-[#f4efe6] text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-xs text-[#a8a29e]">
                  <p>
                    Quy trình đo kiểm âm học thực địa của GuHomes bao gồm:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[#c4beb5]">
                    <li>Đo mức ồn nền ban đêm (Leq 8h) và dải tần âm trầm rền (31.5Hz – 125Hz)</li>
                    <li>Đo thời gian vang âm RT60 của phòng ngủ hiện hữu</li>
                    <li>Lập báo cáo biểu đồ Noise Criterion NC và đề xuất cấu trúc vách cửa cách âm</li>
                  </ul>
                  <div className="rounded border border-[#2b271f] bg-[#0c0c0a] p-3 text-[11px] space-y-1 mt-3">
                    <p><strong className="text-[#e8e4df]">Thiết bị đo:</strong> Máy phân tích phổ NTi XL2 Thụy Sĩ</p>
                    <p><strong className="text-[#e8e4df]">Hotline KTS Trưởng:</strong> 0368 757 916</p>
                    <p><strong className="text-[#e8e4df]">Địa chỉ xưởng mộc:</strong> Thạnh Xuân, Q.12, TP.HCM</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultationModalOpen(false)}
                    className="w-full rounded bg-[#d4af37] py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Đã Xác Nhận Đăng Ký (Đóng)
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
