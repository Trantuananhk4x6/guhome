'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type PatinaStageId = 'stage-0' | 'stage-180' | 'stage-730' | 'stage-3650'

interface PatinaStage {
  id: PatinaStageId
  days: number
  ageLabelVi: string
  nameVi: string
  subtitleVi: string
  colorHex: string
  previewGradient: string
  tactileFeelVi: string
  descriptionVi: string
  microChemistryVi: string
  preservationNoteVi: string
}

const PATINA_STAGES: Record<PatinaStageId, PatinaStage> = {
  'stage-0': {
    id: 'stage-0',
    days: 0,
    ageLabelVi: 'Khởi Điểm (0 Ngày)',
    nameVi: 'Đồng Thau Phay Xước Mộc (Raw Machined Brass)',
    subtitleVi: 'Khối Đặc Nguyên Chất C360 · Ánh Kim Mát Lạnh',
    colorHex: '#e2ba60',
    previewGradient: 'radial-gradient(ellipse at 30% 25%, #fbe39f 0%, #d4af37 40%, #8c7320 100%)',
    tactileFeelVi: 'Mát lạnh ban đầu, các đường phay xước hairline mảnh như sợi tóc đầm chắc trong lòng bàn tay.',
    descriptionVi:
      'Vừa hoàn thiện phay CNC 5 trục tại xưởng kim hoàn Thạnh Xuân và đánh bóng satin thủ công bằng sợi cước Scotch-Brite. Chưa có bất kỳ lớp oxit nào, bề mặt phản chiếu ánh sáng tươi sáng và sắc nét.',
    microChemistryVi: 'Đồng thau nguyên chất CuZn39Pb3 chưa tiếp xúc với oxy và mồ hôi tay.',
    preservationNoteVi: 'Vệ sinh nhẹ bằng khăn cotton khô mềm, chưa cần thoa sáp ong.',
  },
  'stage-180': {
    id: 'stage-180',
    days: 180,
    ageLabelVi: 'Sau 6 Tháng (180 Ngày)',
    nameVi: 'Nâu Mật Ong Trầm Ấm (Warm Chocolate Bronze)',
    subtitleVi: 'Patina Thân Nhiệt · Lớp Dầu Tự Nhiên Lòng Bàn Tay',
    colorHex: '#a67d3d',
    previewGradient: 'radial-gradient(ellipse at 30% 25%, #d1a55f 0%, #a67d3d 40%, #5e411b 100%)',
    tactileFeelVi: 'Bóng mướt và ấm áp theo nhiệt độ cơ thể người cầm nắm hàng ngày, không còn cảm giác kim loại sắc lạnh.',
    descriptionVi:
      'Qua nửa năm sử dụng, axit béo tự nhiên từ lòng bàn tay gia chủ phản ứng dịu êm với phân tử đồng. Bề mặt chuyển sang tông vàng mật ong sẫm, tôn lên vẻ ấm cúng và sự gắn kết của người sống trong nhà.',
    microChemistryVi: 'Hình thành lớp màng Cu2O (Cuprous Oxide) siêu mỏng bảo vệ kim loại khỏi oxy hóa sâu.',
    preservationNoteVi: 'Lau nhẹ bằng dầu khoáng tự nhiên, các điểm chạm thường xuyên tự sáng bóng.',
  },
  'stage-730': {
    id: 'stage-730',
    days: 730,
    ageLabelVi: 'Sau 2 Năm (730 Ngày)',
    nameVi: 'Nâu Khói Cổ Điển (Antique Muted Patina)',
    subtitleVi: 'Tương Phản Chiều Sâu 3D · Dấu Ấn Thời Gian Tư Gia',
    colorHex: '#73512a',
    previewGradient: 'radial-gradient(ellipse at 30% 25%, #946d3e 0%, #73512a 40%, #3d2912 100%)',
    tactileFeelVi: 'Độ bám tay hoàn hảo, bề mặt có độ lì mờ velvet quý phái như món bảo vật trong bảo tàng châu Âu.',
    descriptionVi:
      'Các khe kẽ và rãnh điêu khắc chuyển sang màu nâu đen khói sâu hun hút, trong khi các gờ mép nơi tay thường chạm vẫn giữ được ánh sáng vàng ấm. Sự tương phản này tạo nên vẻ đẹp điêu khắc độc bản không một công nghệ nhân tạo nào sao chép được.',
    microChemistryVi: 'Hỗn hợp Cu2O và CuCO3 bền vững cao, trơ với độ ẩm không khí 85% của Sài Gòn.',
    preservationNoteVi: 'Thoa một lớp sáp vi tinh thể Renaissance Wax định kỳ 12 tháng/lần.',
  },
  'stage-3650': {
    id: 'stage-3650',
    days: 3650,
    ageLabelVi: 'Sau 10 Năm (3650 Ngày)',
    nameVi: 'Xanh Rêu Phong Quý Tộc (Verdigris Heritage)',
    subtitleVi: 'Vẻ Đẹp Truyền Đời Bách Niên · Tự Bảo Vệ Vĩnh Cửu',
    colorHex: '#4a6b5d',
    previewGradient: 'radial-gradient(ellipse at 30% 25%, #7aa892 0%, #4a6b5d 40%, #20362c 100%)',
    tactileFeelVi: 'Cảm giác như chạm vào bức tường đền cổ, trầm mặc và uy nghiêm, mang lại sự an tĩnh tuyệt đối cho tâm hồn.',
    descriptionVi:
      'Lớp màng gỉ đồng xanh rêu (Verdigris) xuất hiện tự nhiên trên các phụ kiện ngoài ban công đón gió sông và mưa nhiệt đới. Đây là lớp bảo vệ bất khả xâm phạm, giúp kim khí tồn tại hàng thế kỷ mà không hề bị mục nát hay ăn mòn.',
    microChemistryVi: 'Malachite [Cu2CO3(OH)2] tạo màng giáp bảo vệ vĩnh cửu chống muối biển và mưa axit.',
    preservationNoteVi: 'Được các nhà phục chế nghệ thuật GuHomes đánh giá là trạng thái hoàn mỹ nhất.',
  },
}

interface ArtisanArtifact {
  titleVi: string
  weightVi: string
  techniqueVi: string
  applicationVi: string
}

const ARTISAN_ARTIFACTS: ArtisanArtifact[] = [
  {
    titleVi: 'Tay Nắm Cửa Điêu Khắc Khối Liền Đúc Đặc',
    weightVi: '2.4 kg / Chiếc',
    techniqueVi: 'Đúc khuôn cát kết hợp phay CNC rãnh âm và vuốt tay thủ công',
    applicationVi: 'Cửa đại sảnh Penthouse & Biệt thự thông tầng',
  },
  {
    titleVi: 'Chậu Lavabo Đồng Đỏ Gò Tay Búa Lồi Lõm',
    weightVi: '7.8 kg Đồng 99.9%',
    techniqueVi: 'Nghệ nhân gõ búa thủ công 12.000 nhát tạo bề mặt vảy cá tán quang',
    applicationVi: 'Phòng vệ sinh VIP & Không gian thưởng trà',
  },
  {
    titleVi: 'Bản Lề Trục Xoay Pivot Đồng Đúc Tự Bôi Trơn',
    weightVi: 'Chịu tải 350 kg',
    techniqueVi: 'Lõi thép tôi cứng bọc vỏ đồng thau mộc dày 8mm kèm ổ bi kín',
    applicationVi: 'Hệ cửa gỗ ngoại cỡ cao 3.2m đón gió sông Sài Gòn',
  },
]

export function PatinaMetalworkArtisanLab({ className }: { className?: string } = {}) {
  const [activeStage, setActiveStage] = useState<PatinaStageId>('stage-180')
  const [sampleModalOpen, setSampleModalOpen] = useState(false)

  const current = PATINA_STAGES[activeStage]

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0a08] py-24 text-[#e8e4df] border-t border-[#1a1916]', className)}>
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${current.colorHex}20, transparent 60%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d281e] bg-[#16130e] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Nghệ Thuật Kim Khí Đồng Mộc · Living Metal Patina
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Xưởng Đồng Patina: Kim Khí Thở Cùng Năm Tháng
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Không dùng kim loại mạ điện công nghiệp bóng bẩy mau bong tróc. GuHomes chế tác đồng thau mộc nguyên khối, để lớp oxit tự nhiên từ thân nhiệt và khí hậu Sài Gòn tôi luyện nên vẻ đẹp trầm mặc truyền đời.
          </p>
        </div>

        {/* Time-lapse Slider Navigation */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(PATINA_STAGES) as PatinaStageId[]).map((stageKey) => {
            const stage = PATINA_STAGES[stageKey]
            const isActive = activeStage === stageKey
            return (
              <button
                key={stageKey}
                type="button"
                onClick={() => setActiveStage(stageKey)}
                className={cn(
                  'group relative rounded-xl border p-4 text-left transition-all duration-300 min-h-[90px]',
                  isActive
                    ? 'border-[#d4af37] bg-[#17140e] text-[#f4efe6] shadow-xl shadow-black/60'
                    : 'border-[#24211a] bg-[#110f0b] text-[#8e8578] hover:border-[#383328] hover:bg-[#14120e]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#d4af37]">{stage.ageLabelVi.split(' ')[0]} {stage.ageLabelVi.split(' ')[1]}</span>
                  <span
                    className="h-3 w-3 rounded-full border border-black/40 transition-transform duration-300"
                    style={{
                      backgroundColor: stage.colorHex,
                      transform: isActive ? 'scale(1.25)' : 'scale(1)',
                    }}
                  />
                </div>
                <h3 className="mt-2 text-xs sm:text-sm font-medium line-clamp-1 group-hover:text-[#f4efe6]">
                  {stage.nameVi.split(' ')[0]} {stage.nameVi.split(' ')[1]} {stage.nameVi.split(' ')[2] || ''}
                </h3>
                <span className="mt-0.5 block text-[11px] text-[#70685c] line-clamp-1">{stage.subtitleVi.split(' · ')[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Interactive Patina Stage Display */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch mb-16">
          {/* Visual Metal Finish Specimen (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#2b251a] bg-[#120f0a] p-6 sm:p-8 shadow-2xl">
            <div>
              {/* Specimen Frame */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#383022] shadow-2xl">
                {/* Simulated Metal Surface with Specular Shimmer */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: current.previewGradient,
                  }}
                />

                {/* Brushed Hairline Texture Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #ffffff 0px, transparent 1px, transparent 4px)',
                    backgroundSize: '100% 100%',
                  }}
                />

                {/* Aged Patina Mottling Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(0,0,0,0.6) 10%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(0,0,0,0.4) 15%, transparent 60%)',
                  }}
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#0c0a07]/80 px-2.5 py-1 font-mono text-xs text-[#d4af37] backdrop-blur-md border border-[#2b2416]">
                    {current.ageLabelVi}
                  </span>
                  <span className="rounded bg-[#0c0a07]/80 px-2.5 py-1 text-xs text-[#e8e4df] backdrop-blur-md border border-[#2b2416]">
                    Hợp Kim C360 Đồng Đặc
                  </span>
                </div>

                {/* Tactile description overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded bg-[#0c0a07]/85 p-3.5 backdrop-blur-md border border-[#262013] text-xs text-[#c4bcae]">
                  <strong className="text-[#d4af37] block mb-0.5">Cảm Nhận Xúc Giác:</strong>
                  &ldquo;{current.tactileFeelVi}&rdquo;
                </div>
              </div>

              {/* Chemical & Longevity Metrics */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#262015] bg-[#16120b] p-3 text-center">
                  <span className="block font-mono text-[10px] text-[#70685c] uppercase">PHẢN ỨNG HÓA HỌC</span>
                  <span className="mt-1 block font-mono text-xs font-bold text-[#d4af37] line-clamp-1">
                    {current.microChemistryVi.split(' ')[0]} {current.microChemistryVi.split(' ')[1] || ''}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#22c55e]">Tự tạo màng bảo vệ</span>
                </div>
                <div className="rounded-lg border border-[#262015] bg-[#16120b] p-3 text-center">
                  <span className="block font-mono text-[10px] text-[#70685c] uppercase">LỚP PHỦ BẢO VỆ</span>
                  <span className="mt-1 block font-mono text-xs font-bold text-[#f4efe6]">
                    Sáp Vi Tinh Thể
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Renaissance Wax</span>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-lg border border-[#262015] bg-[#16120b] p-3 text-center">
                  <span className="block font-mono text-[10px] text-[#70685c] uppercase">TUỔI THỌ KẾT CẤU</span>
                  <span className="mt-1 block font-mono text-xs font-bold text-[#22c55e]">
                    100+ Năm
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Không rỉ sét mục ruỗng</span>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-6 rounded-lg border border-[#2b2416] bg-[#15120a] p-4 text-xs text-[#a8a29e] leading-relaxed">
              <p className="font-serif italic text-[#d4af37] mb-1">
                &ldquo;Một ngôi nhà sang trọng không phải là ngôi nhà đóng băng ở ngày đầu tiên bàn giao. Kim khí phải già đi cùng gia đình, ghi dấu từng vết chạm của người thân yêu qua bao mùa nắng mưa.&rdquo;
              </p>
              <span className="block text-[11px] text-[#70685c] mt-2">— KTS Trưởng GuHomes</span>
            </div>
          </div>

          {/* Detailed Narrative & Scientific Dossier (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#2b251a] bg-[#120f0a] p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                  Biên Niên Sử Kim Khí · Material Aging
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
                  {current.nameVi}
                </h3>
                <p className="mt-1 text-xs text-[#8e8578]">{current.subtitleVi}</p>
              </div>

              <p className="text-sm leading-relaxed text-[#c4bcae]">
                {current.descriptionVi}
              </p>

              {/* Chemical Insight Box */}
              <div className="rounded-xl border border-[#2e2618] bg-[#16120c] p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <span className="text-sm">🔬</span>
                  <strong className="font-mono uppercase text-[11px]">Cơ Chế Hóa Học Vi Khí Hậu:</strong>
                </div>
                <p className="text-[#a8a29e] leading-relaxed">{current.microChemistryVi}</p>
                <div className="border-t border-[#262013] pt-2 text-[#70685c]">
                  <strong className="text-[#e8e4df]">Chăm sóc & bảo dưỡng:</strong> {current.preservationNoteVi}
                </div>
              </div>

              {/* Contrast Guarantee */}
              <div className="border-t border-[#221c13] pt-4 text-xs text-[#8e8578] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">✕</span>
                  <span>Tuyệt đối không dùng lớp mạ chrome/niken hóa chất mau nổ rộp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>100% đồng thau đúc đặc đầm tay và đồng đỏ nguyên chất gò tay.</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-4 border-t border-[#221c13] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setSampleModalOpen(true)}
                className="w-full sm:w-auto flex-1 rounded-lg bg-[#d4af37] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#e6c158] active:scale-[0.98]"
              >
                Gửi Hộp Phôi Đồng Patina
              </button>
              <a
                href="/studio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#383022] bg-[#17130b] px-4 py-3 text-xs font-medium text-[#e8e4df] transition-colors hover:border-[#4d402d] hover:bg-[#1a160d]"
              >
                Khám Phá Xưởng Mộc
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-[#d4af37]" />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Iconic Metal Artifacts Showcase */}
        <div>
          <h3 className="mb-6 font-serif text-xl sm:text-2xl text-[#f4efe6]">
            Tuyển Tập Tác Phẩm Kim Hoàn Đồng Đúc May Đo
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {ARTISAN_ARTIFACTS.map((art, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#262016] bg-[#13100a] p-6 transition-all hover:border-[#3d3322] hover:bg-[#16130d]"
              >
                <span className="font-mono text-xs text-[#d4af37]">0{idx + 1}</span>
                <h4 className="mt-2 font-serif text-base font-medium text-[#f4efe6]">{art.titleVi}</h4>
                <div className="mt-2 inline-block rounded bg-[#1f1910] border border-[#2d2417] px-2 py-0.5 font-mono text-[11px] text-[#d4af37]">
                  Trọng lượng: {art.weightVi}
                </div>
                <p className="mt-3 text-xs text-[#a8a29e] leading-relaxed">
                  <strong className="text-[#f4efe6]">Kỹ thuật:</strong> {art.techniqueVi}
                </p>
                <div className="mt-2 text-xs text-[#70685c]">
                  <strong className="text-[#8e8578]">Ứng dụng:</strong> {art.applicationVi}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Gửi Hộp Phôi Đồng Patina */}
        <AnimatePresence>
          {sampleModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full rounded-2xl border border-[#332918] bg-[#14110b] p-6 sm:p-8 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#261f12]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs">
                      ✓
                    </span>
                    <h4 className="font-serif text-lg text-[#f4efe6]">Hộp Phôi Mẫu Đồng Patina</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSampleModalOpen(false)}
                    className="text-[#70685c] hover:text-[#f4efe6] text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-xs text-[#a8a29e]">
                  <p>
                    GuHomes sẽ gửi hộp gỗ óc chó chứa 4 thỏi phôi đồng thau đặc nặng 0.5kg mô phỏng 4 giai đoạn lão hóa Patina (0 ngày, 180 ngày, 2 năm, 10 năm) để gia chủ cảm nhận trọng lượng và độ bóng ấm thực tế.
                  </p>
                  <div className="rounded border border-[#2b2214] bg-[#0c0a06] p-3 text-[11px] space-y-1 mt-3">
                    <p><strong className="text-[#e8e4df]">Giao tận tư gia:</strong> Trong vòng 24 giờ tại TP.HCM</p>
                    <p><strong className="text-[#e8e4df]">Hotline xưởng kim hoàn:</strong> 0368 757 916</p>
                    <p><strong className="text-[#e8e4df]">Email:</strong> guhomesvn@gmail.com</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSampleModalOpen(false)}
                    className="w-full rounded bg-[#d4af37] py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Đã Ghi Nhận Yêu Cầu (Đóng)
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
