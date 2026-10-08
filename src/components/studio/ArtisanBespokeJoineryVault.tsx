'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type JoineryId = 'dovetail' | 'butterfly' | 'three-way' | 'tusk-tenon'

interface JoinerySpec {
  id: JoineryId
  numberVi: string
  nameVi: string
  subtitleVi: string
  woodPairingVi: string
  tensileStrengthVi: string
  craftsmanshipHoursVi: string
  tagVi: string
  tactileHandFeelVi: string
  descriptionVi: string
  engineeringMechanismVi: string
  diagramIcon: string
}

const JOINERY_SPECS: Record<JoineryId, JoinerySpec> = {
  dovetail: {
    id: 'dovetail',
    numberVi: '01',
    nameVi: 'Mộng Đuôi Én Đan Cài (Dovetail Joint)',
    subtitleVi: 'Khóa Kháng Lực Kéo Đa Chiều · Ngăn Kéo Gỗ Óc Chó Vĩnh Cửu',
    woodPairingVi: 'Gỗ Óc Chó Bắc Mỹ (Mặt trước) + Gỗ Tuyết Tùng (Lòng ngăn kéo)',
    tensileStrengthVi: 'Chịu lực giật ngang > 450 kg',
    craftsmanshipHoursVi: '4.5 giờ gọt tay/ngăn kéo',
    tagVi: 'Kinh Điển Nghề Mộc · Ngăn Kéo Tủ',
    tactileHandFeelVi: 'Vuốt tay qua góc ngăn kéo mượt phẳng như một tấm gỗ liền khối, đường răng cưa đuôi én khít tuyệt đối không lọt một sợi tóc.',
    descriptionVi:
      'Các răng mộng đuôi én đan chéo góc 1:8 tạo khóa cơ học tự nhiên theo chiều kéo ra. Dù gia chủ kéo ngăn kéo hàng chục nghìn lần trong 50 năm, cấu trúc vẫn bền bỉ không xô lệch mà không cần bất kỳ đinh sắt kim loại nào.',
    engineeringMechanismVi: 'Khóa góc chéo hình nêm triệt tiêu phản lực khi kéo mở ngăn kéo nặng.',
    diagramIcon: '🧩',
  },
  butterfly: {
    id: 'butterfly',
    numberVi: '02',
    nameVi: 'Chốt Bướm Nẹp Nứt Tự Nhiên (Butterfly Key Inlay)',
    subtitleVi: 'Tôn Vinh Vết Nứt Gỗ Live Edge · Gỗ Mun Sừng Đen Tương Phản',
    woodPairingVi: 'Chốt Gỗ Mun Sừng Đen tuyền nẹp trên Mặt Bàn Óc Chó Liền Khối',
    tensileStrengthVi: 'Khóa co ngót lực căng > 600 kg',
    craftsmanshipHoursVi: '3.0 giờ đục tay/chốt bướm',
    tagVi: 'Wabi-Sabi Tinh Hoa · Bàn Trà & Bàn Ăn',
    tactileHandFeelVi: 'Bề mặt chốt bướm mun phẳng lỳ ngang mặt gỗ óc chó, chạm vào thấy sự chuyển đổi xúc giác đầm mịn giữa hai thớ gỗ khác biệt.',
    descriptionVi:
      'Gỗ tự nhiên nguyên tấm có những vết nứt co ngót tự nhiên theo thời tiết nhiệt đới. Thay vì trám keo hóa chất che đậy, nghệ nhân GuHomes đục tay các chốt gỗ hình cánh bướm nêm chặt, biến dấu vết tự nhiên thành điểm nhấn nghệ thuật độc bản.',
    engineeringMechanismVi: 'Hai đầu nở rộng khóa đối xứng ngăn vết nứt xé toạc theo thớ gỗ dọc.',
    diagramIcon: '🦋',
  },
  'three-way': {
    id: 'three-way',
    numberVi: '03',
    nameVi: 'Mộng Khóa Ba Chiều Cổ Truyền (Three-Way Mitred Joint)',
    subtitleVi: 'Giao Điểm 3 Trục Không Gian XYZ · Khóa Chân Bàn Liền Mạch',
    woodPairingVi: 'Gỗ Óc Chó hoặc Teak xẻ góc vát 45° ba chiều kín khít',
    tensileStrengthVi: 'Chịu tải trọng thẳng đứng > 1.200 kg',
    craftsmanshipHoursVi: '8.0 giờ phay gọt/khớp nối',
    tagVi: 'Bậc Thầy Điêu Khắc · Chân Bàn Ghế',
    tactileHandFeelVi: 'Không có gờ cạnh, các đường vát tiếp giáp mượt mà tạo ảo giác chân bàn và mặt bàn như được đúc ra từ một khối gỗ duy nhất.',
    descriptionVi:
      'Được mệnh danh là "nút thắt ma thuật" trong nghề mộc cổ truyền. Ba thanh gỗ giao nhau tại một điểm góc vuông, các mộng âm dương lồng ghép giấu kín 100% bên trong, tạo kết cấu chịu lực chấn động cực kỳ vững chãi.',
    engineeringMechanismVi: 'Khóa lẫy ngầm 3 phương vị triệt tiêu hoàn toàn rung lắc và xoắn vặn.',
    diagramIcon: '📐',
  },
  'tusk-tenon': {
    id: 'tusk-tenon',
    numberVi: '04',
    nameVi: 'Mộng Lỗ Xuyên Nêm Gỗ (Tusk Tenon Joint)',
    subtitleVi: 'Tháo Lắp Cơ Học Thông Minh · Khung Giường & Giá Sách Lớn',
    woodPairingVi: 'Dầm Gỗ Teak xuyên qua trụ mộc + Nêm gỗ Cẩm Lai chèn chặt',
    tensileStrengthVi: 'Chịu uốn võng tải trọng > 850 kg',
    craftsmanshipHoursVi: '5.5 giờ đục thủ công',
    tagVi: 'Tháo Lắp Linh Hoạt · Khung Giường Master',
    tactileHandFeelVi: 'Chiếc nêm gỗ mộc mạc nhô ra ngoài thanh lịch, có thể gõ nhẹ điều chỉnh độ căng của mộng bất cứ lúc nào.',
    descriptionVi:
      'Lấy cảm hứng từ kiến trúc nhà rường cổ Việt Nam và chùa gỗ Nhật Bản. Khung giường hay tủ sách khổ lớn có thể tháo rời hoàn toàn khi vận chuyển qua cầu thang hẹp, rồi lắp ráp lại vững chắc như núi chỉ bằng những chiếc nêm gỗ tự nhiên.',
    engineeringMechanismVi: 'Nêm côn hình vát ép sát đầu mộng, gỗ càng co ngót thì đóng nêm càng chắc.',
    diagramIcon: '🪵',
  },
}

export function ArtisanBespokeJoineryVault({ className }: { className?: string } = {}) {
  const [activeJoinery, setActiveJoinery] = useState<JoineryId>('dovetail')
  const [explosionOffset, setExplosionOffset] = useState<number>(0) // 0mm to 40mm

  const current = JOINERY_SPECS[activeJoinery]

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0c0a] py-24 text-[#e8e4df] border-t border-[#1d1d1a]', className)}>
      {/* Background ambient warmth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d281e] bg-[#16130e] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Nghệ Thuật Khớp Mộc Không Đinh Sắt · Heritage Timber Joinery
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Bảo Tàng Mộng Gỗ Cổ Truyền Thạnh Xuân
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Đồ gỗ bền vững hàng trăm năm nhờ triết lý thuận theo sự co ngót tự nhiên của thớ gỗ. Không dùng đinh sắt rỉ sét hay keo dán công nghiệp giòn gãy, nghệ nhân GuHomes liên kết không gian bằng những khớp mộng tinh xảo chịu tải trọng hàng tấn.
          </p>
        </div>

        {/* Joinery Tabs */}
        <div className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {(Object.keys(JOINERY_SPECS) as JoineryId[]).map((key) => {
            const item = JOINERY_SPECS[key]
            const isActive = activeJoinery === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveJoinery(key)
                  setExplosionOffset(0)
                }}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all duration-300 min-h-[96px]',
                  isActive
                    ? 'border-[#d4af37] bg-[#18140e] text-[#f4efe6] shadow-xl shadow-black/60'
                    : 'border-[#24211a] bg-[#110f0b] text-[#8e8578] hover:border-[#383328] hover:bg-[#14120e]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#d4af37]">{item.numberVi}</span>
                  <span className="text-xl">{item.diagramIcon}</span>
                </div>
                <h3 className="mt-2 text-xs sm:text-sm font-medium line-clamp-1 group-hover:text-[#f4efe6]">
                  {item.nameVi.split(' (')[0]}
                </h3>
                <span className="mt-0.5 block text-[11px] text-[#70685c] line-clamp-1">{item.tagVi}</span>
              </button>
            )
          })}
        </div>

        {/* Interactive 3D Exploded View Cockpit */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch mb-16">
          {/* Left Column: Visual Exploded View Simulator (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#2b251a] bg-[#120f0a] p-6 sm:p-8 shadow-2xl">
            <div>
              {/* Graphic Joint Stage */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#383022] bg-gradient-to-br from-[#1a140d] via-[#110d08] to-[#0a0704] p-6 shadow-2xl flex items-center justify-center">
                {/* Visual Interlocking Mortise & Tenon Representation */}
                <div className="relative flex items-center justify-center w-full max-w-[320px] h-[180px]">
                  {/* Part A (Mortise Block) */}
                  <motion.div
                    animate={{ x: -explosionOffset * 2.5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="relative w-32 h-32 rounded-lg border-2 border-[#8c6b32] bg-gradient-to-r from-[#3d2b14] to-[#2b1e0d] p-3 shadow-2xl flex flex-col items-center justify-center text-center text-xs font-mono text-[#d4af37]"
                  >
                    <span>MỘNG ÂM (MORTISE)</span>
                    <span className="text-[10px] text-[#a89578] mt-1">Đục tay rãnh ngàm</span>
                    <div className="absolute right-0 top-1/4 h-1/2 w-4 bg-[#140e06] rounded-l border-y border-l border-[#8c6b32]/50" />
                  </motion.div>

                  {/* Interlocking Gap Indicator */}
                  <div className="mx-2 flex flex-col items-center font-mono text-[10px] text-[#706454]">
                    <span>{explosionOffset === 0 ? 'KHÓA KHÍT 0.0mm' : `TÁCH ${explosionOffset}mm`}</span>
                    <span className="text-xs text-[#d4af37]">↔</span>
                  </div>

                  {/* Part B (Tenon Block) */}
                  <motion.div
                    animate={{ x: explosionOffset * 2.5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="relative w-32 h-32 rounded-lg border-2 border-[#d4af37] bg-gradient-to-l from-[#4d3619] to-[#3a2812] p-3 shadow-2xl flex flex-col items-center justify-center text-center text-xs font-mono text-[#f4efe6]"
                  >
                    <span>MỘNG DƯƠNG (TENON)</span>
                    <span className="text-[10px] text-[#d4af37] mt-1">{current.nameVi.split(' ')[1]}</span>
                    <div className="absolute left-0 top-1/4 h-1/2 w-4 bg-[#8c6b32] rounded-r border-y border-r border-[#d4af37]" />
                  </motion.div>
                </div>

                {/* Status Badges Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded bg-black/70 border border-[#2d2216] px-2.5 py-1 font-mono text-xs text-[#d4af37]">
                    Tải Trọng: {current.tensileStrengthVi.split('> ')[1]}
                  </span>
                  <span className="rounded bg-black/70 border border-[#2d2216] px-2.5 py-1 text-xs text-[#f4efe6]">
                    0% Đinh Sắt Kim Loại
                  </span>
                </div>

                {/* Tactile Hand Feel Overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/85 p-3 backdrop-blur-md border border-[#262013] text-xs text-[#c4bcae]">
                  <strong className="text-[#d4af37] block mb-0.5">Cảm Nhận Xúc Giác:</strong>
                  &ldquo;{current.tactileHandFeelVi}&rdquo;
                </div>
              </div>

              {/* Exploded View Slider Controls */}
              <div className="mt-6 border-t border-[#241c10] pt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#8e8578]">
                    Kéo Thanh Trượt Phân Rã Khớp Mộng (Exploded View): {explosionOffset}mm
                  </label>
                  <button
                    type="button"
                    onClick={() => setExplosionOffset(explosionOffset === 0 ? 30 : 0)}
                    className="text-xs font-mono text-[#d4af37] hover:underline"
                  >
                    {explosionOffset === 0 ? 'Phân Rã 3D' : 'Khóa Chặt Lại'}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={explosionOffset}
                  onChange={(e) => setExplosionOffset(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-[#20180f] accent-[#d4af37] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#706454] mt-1">
                  <span>Khóa Khít Tuyệt Đối (0mm)</span>
                  <span>Tách Rời Hoàn Toàn (40mm)</span>
                </div>
              </div>
            </div>

            {/* Engineering Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-[#262015] bg-[#16120b] p-3 text-center sm:p-4">
              <div>
                <span className="block font-mono text-[10px] text-[#70685c] uppercase">KHÁNG LỰC KÉO</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-emerald-400">
                  {current.tensileStrengthVi.match(/>\s*([0-9.,]+)/)?.[1] ?? '500+'} kg
                </span>
                <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Khóa ngàm vĩnh cửu</span>
              </div>
              <div className="border-x border-[#262015]">
                <span className="block font-mono text-[10px] text-[#70685c] uppercase">THỜI GIAN GỌT TAY</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#d4af37]">
                  {current.craftsmanshipHoursVi.match(/^[0-9.]+/)?.[0] ?? '4.0'} Giờ
                </span>
                <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Thợ Cả đục thủ công</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#70685c] uppercase">ĐỘ BỀN KẾT CẤU</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#f4efe6]">
                  100+ Năm
                </span>
                <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Không mục nát đinh</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Craftsmanship Deep Dive (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#2b251a] bg-[#120f0a] p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                  Di Sản Mộc Cổ Truyền · Master Joinery
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
                  {current.nameVi}
                </h3>
                <p className="mt-1 text-xs text-[#8e8578]">{current.subtitleVi}</p>
              </div>

              <p className="text-sm leading-relaxed text-[#c4bcae]">
                {current.descriptionVi}
              </p>

              {/* Engineering Insight */}
              <div className="rounded-xl border border-[#2e2618] bg-[#16120c] p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <span>📐</span>
                  <strong className="font-mono uppercase text-[11px]">Nguyên Lý Cơ Học:</strong>
                </div>
                <p className="text-[#a8a29e] leading-relaxed">{current.engineeringMechanismVi}</p>
                <div className="border-t border-[#262013] pt-2 text-[#70685c]">
                  <strong className="text-[#e8e4df]">Phối hợp gỗ:</strong> {current.woodPairingVi}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#241c10] flex flex-col sm:flex-row items-center gap-3">
              <a
                href="/studio"
                className="w-full sm:w-auto flex-1 rounded-lg bg-[#d4af37] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#e6c158] active:scale-[0.98]"
              >
                Xem Nghệ Nhân Ghép Mộng
              </a>
              <a
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#383022] bg-[#17130b] px-4 py-3 text-xs font-medium text-[#e8e4df] transition-colors hover:border-[#4d402d] hover:bg-[#1a160d]"
              >
                Xem Sản Phẩm Thực Tế
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-[#d4af37]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
