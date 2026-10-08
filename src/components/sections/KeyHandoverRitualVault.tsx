'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type CompartmentId = 'brass-key' | 'as-built-dossier' | 'agarwood-osmo' | 'vip-metal-card'

interface CompartmentItem {
  id: CompartmentId
  slotNumber: string
  titleVi: string
  subtitleVi: string
  materialVi: string
  tagVi: string
  icon: string
  highlightVi: string
  narrativeVi: string
  specs: {
    origin: string
    craftsmanship: string
    securityWarranty: string
    usageRitual: string
  }
}

const COMPARTMENTS_DATA: Record<CompartmentId, CompartmentItem> = {
  'brass-key': {
    id: 'brass-key',
    slotNumber: '01',
    titleVi: 'Chìa Khóa Đồng Thau Đúc Mộc & Mã Truy Cập Kỹ Thuật Số',
    subtitleVi: 'Solid Brass Master Key · Hệ Khóa Giấu Mặt AES-256',
    materialVi: 'Đồng thau nguyên khối (Solid Raw Brass) xước tay + Chip NFC mã hóa cấp độ ngân hàng',
    tagVi: 'Biểu Tượng Chủ Quyền · Bảo Mật Tuyệt Đối',
    icon: '🔑',
    highlightVi: 'Đúc thủ công nguyên khối, chạm khắc tọa độ độc bản của gia viên',
    narrativeVi:
      'Chìa khóa chính của tư gia không làm từ hợp kim đúc công nghiệp. Mỗi chiếc chìa khóa GuHomes được nghệ nhân cơ khí chính xác phay gọt từ một thỏi đồng thau đặc, cầm đầm tay, để mộc để tự tạo lớp patina vương giả theo thời gian. Đi kèm là mã truy cập kỹ thuật số chuẩn AES-256 điều khiển hệ thống khóa giấu mặt của Đức.',
    specs: {
      origin: 'Xưởng chế tác kim hoàn & phụ kiện đồng GuHomes Thạnh Xuân',
      craftsmanship: 'Phay CNC 5 trục từ phôi đồng thau C3604, đánh bóng mờ Satin thủ công 6 lượt',
      securityWarranty: 'Mã số định danh vĩnh viễn GU-KEY-2026, bảo mật 2 lớp chống sao chép',
      usageRitual: 'Mở cửa ngày nhập trạch khai mở vượng khí gia đạo thịnh vượng',
    },
  },
  'as-built-dossier': {
    id: 'as-built-dossier',
    slotNumber: '02',
    titleVi: 'Hồ Sơ Hoàn Công Khổ A3 Đóng Bìa Vải Lanh Thô',
    subtitleVi: 'As-Built Technical Dossier · Tỉ Lệ 1:20 Chuẩn Xác',
    materialVi: 'Giấy mỹ thuật định lượng 250gsm + Bìa vải lanh Bỉ dệt thô + Niêm phong sáp son GuHomes',
    tagVi: 'Minh Bạch Kỹ Thuật · Lưu Truyền Thế Hệ',
    icon: '📜',
    highlightVi: 'Chữ ký tay KTS Trưởng & Giám Sát, sơ đồ chi tiết từng đường ống âm tường',
    narrativeVi:
      'Một công trình hoàn mỹ không chỉ nằm ở bề nổi nhìn thấy được, mà là sự an tâm tuyệt đối trong kết cấu ẩn. Tập hồ sơ hoàn công khổ A3 dày hơn 120 trang lưu trữ chính xác từng đường đi dây điện chống cháy, vị trí van nước âm tường, sơ đồ kỹ thuật trần thạch cao tiêu âm và xuất xứ từng m3 gỗ xẻ.',
    specs: {
      origin: 'Văn phòng Thiết kế Kỹ thuật GuHomes Architecture Atelier',
      craftsmanship: 'Đóng chỉ thủ công phong cách sách cổ, gáy da bò thuộc thảo mộc dập chìm',
      securityWarranty: 'Dấu sáp son niêm phong bản quyền cùng chữ ký KTS Trưởng & Kỹ sư Giám sát',
      usageRitual: 'Cơ sở dữ liệu trọn đời phục vụ công tác bảo trì định kỳ và truyền đời cho thế hệ sau',
    },
  },
  'agarwood-osmo': {
    id: 'agarwood-osmo',
    slotNumber: '03',
    titleVi: 'Hũ Trầm Hương Cổ Truyền & Dầu Dưỡng Gỗ Osmo Đức 125ml',
    subtitleVi: 'Sacred Agarwood Incense & Natural Polyx-Oil Kit',
    materialVi: 'Gốm men tro Bát Tràng tráng men mờ + Trầm miếng tự nhiên Khánh Hòa + Tinh dầu sáp Osmo 3032',
    tagVi: 'Thanh Lọc Sinh Khí · Dưỡng Thớ Gỗ Vĩnh Cửu',
    icon: '🌿',
    highlightVi: 'Khử mùi sơn hoàn thiện, tỏa hương thanh tịnh và nuôi dưỡng độ bóng mờ của gỗ tự nhiên',
    narrativeVi:
      'Nghi thức dọn vào nhà mới đòi hỏi sự thanh tịnh trong khứu giác. Hũ gốm tro mờ chứa trầm hương tự nhiên loại một từ rừng nguyên sinh Khánh Hòa được chuẩn bị để xông ấm không gian trong ngày đầu tiên. Đi kèm lọ dầu dưỡng gỗ sáp cứng Osmo Polyx-Oil 125ml nguồn gốc tự nhiên từ Đức giúp gia chủ tự tay vuốt ve và dưỡng ẩm bề mặt gỗ óc chó sau mỗi năm sử dụng.',
    specs: {
      origin: 'Gốm men tro thủ công Bát Tràng & Dầu thực vật hữu cơ Osmo sản xuất tại Đức',
      craftsmanship: 'Ủ trầm tự nhiên không tẩm hóa chất; dầu sáp cứng đạt chuẩn an toàn đồ chơi trẻ em EN 71.3',
      securityWarranty: 'Cam kết 100% nguyên liệu sinh học không phát thải VOC (Volatile Organic Compounds)',
      usageRitual: 'Đốt trầm khi gia đình sum vầy đêm rằm; thoa dầu gỗ 12 tháng/lần giữ độ ẩm thớ gỗ',
    },
  },
  'vip-metal-card': {
    id: 'vip-metal-card',
    slotNumber: '04',
    titleVi: 'Thẻ Thép Đen Khắc Kim Loại VIP Card & Cổng Bảo Hành Số',
    subtitleVi: 'PVD Matte Black Steel VIP Pass · Bảo Hành 10 Năm',
    materialVi: 'Thép không gỉ Austenitic 316L mạ PVD đen mờ + Khắc laser vi mạch phản quang',
    tagVi: 'Đặc Quyền Thượng Lưu · Phản Ứng Trong 2 Giờ',
    icon: '👑',
    highlightVi: 'Quét mã QR tra cứu toàn bộ hồ sơ kỹ thuật số và gọi khẩn cấp đội ngũ bảo trì 24/7',
    narrativeVi:
      'Tấm thẻ thép đen nặng 45 gram khắc chìm tên chủ nhân và mã định danh hợp đồng bảo hành 10 năm. Khi chạm mặt lưng thẻ vào điện thoại thông minh qua NFC hoặc quét mã QR khắc laser, gia chủ lập tức kết nối trực tiếp với Đường dây nóng Kỹ thuật viên GuHomes, cam kết phản hồi và có mặt hỗ trợ kỹ thuật tận nơi trong vòng 2 giờ tại khu vực TP.HCM.',
    specs: {
      origin: 'Chế tác từ thép y tế không gỉ SUS316L, phủ công nghệ lắng đọng hơi vật lý PVD',
      craftsmanship: 'Mép thẻ vát kim cương 45 độ, bề mặt bắn cát vi mô chống bám vân tay tột bậc',
      securityWarranty: 'Kích hoạt gói dịch vụ GuHomes White-Glove Concierge bảo hành kết cấu 10 năm',
      usageRitual: 'Tra cứu lịch sử bảo dưỡng máy lạnh VRV, lọc nước tổng và bảo trì dầu mộc định kỳ',
    },
  },
}

export function KeyHandoverRitualVault({ className }: { className?: string } = {}) {
  const [selectedId, setSelectedId] = useState<CompartmentId>('brass-key')
  const [isLidOpen, setIsLidOpen] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const selectedItem = COMPARTMENTS_DATA[selectedId] ?? COMPARTMENTS_DATA['brass-key']
  const certificateCode = 'GU-WTY-2026-8899'

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(certificateCode)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2500)
    }
  }

  return (
    <section className={cn('relative overflow-hidden bg-stone-950 py-24 text-stone-100 sm:py-32', className)}>
      {/* Background ambient light */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 -z-10 h-80 w-80 rounded-full bg-amber-900/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-300">
            <span>✨</span>
            <span>Nghi Thức Bàn Giao Thửa Riêng · GuHomes Atelier</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
            Nghi Thức Bàn Giao Hộp Mộc Hoàng Kim
          </h2>

          <p className="mt-4 text-base font-light leading-relaxed text-stone-300 sm:text-lg">
            Ngày dọn về nhà mới không chỉ là việc trao nhận chìa khóa, mà là thời khắc thiêng liêng chuyển giao một tác
            phẩm kiến trúc được ấp ủ hàng trăm ngày. Chiếc Hộp Mộc Bàn Giao chế tác từ gỗ óc chó Thạnh Xuân lưu giữ trọn
            vẹn linh hồn và cam kết phụng sự trọn đời của GuHomes.
          </p>
        </div>

        {/* The Wooden Box Visual & Interactive Compartments */}
        <div className="mt-14 rounded-2xl border border-stone-800 bg-stone-900/50 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          {/* Box Header Toolbar */}
          <div className="flex flex-col gap-4 border-b border-stone-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="font-serif text-xl font-normal text-stone-100 sm:text-2xl">
                  Hộp Mộc Bàn Giao Gỗ Óc Chó Bắc Mỹ · Khối Liền Mộng Âm Dương
                </h3>
              </div>
              <p className="mt-1 text-xs text-stone-400 sm:text-sm">
                Quy cách: Gỗ óc chó FAS xẻ thớ đồng đều · Kích thước: 420 × 320 × 140 mm · Lót nhung dạ thảo mộc
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsLidOpen(!isLidOpen)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-300 transition-all hover:bg-amber-500/20 active:scale-95"
              >
                <span>{isLidOpen ? '🔒 Đóng Nắp Khóa Chốt' : '🔓 Mở Nắp Hộp Mộc'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-stone-950 transition-all hover:bg-amber-400 active:scale-95"
              >
                <span>Xem Chứng Chỉ Hoàn Công</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Lid Closed View vs Open View */}
          <AnimatePresence mode="wait">
            {!isLidOpen ? (
              <motion.div
                key="box-closed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="mt-8 flex flex-col items-center justify-center rounded-xl border border-stone-800/80 bg-stone-950/70 p-12 text-center"
              >
                <div className="h-20 w-20 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-4xl shadow-inner">
                  🔐
                </div>
                <h4 className="mt-6 font-serif text-2xl font-normal text-stone-200">
                  Nắp Hộp Mộc Đã Được Niêm Phong Bằng Chốt Đồng Thau
                </h4>
                <p className="mt-2 max-w-md text-sm text-stone-400">
                  Mặt nắp hộp mộc dập chìm họa tiết triện thư GuHomes và tọa độ định danh căn nhà. Hãy mở nắp để khám
                  phá 4 ngăn bảo vật chế tác thủ công bên trong.
                </p>
                <button
                  type="button"
                  onClick={() => setIsLidOpen(true)}
                  className="mt-6 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-amber-500"
                >
                  Mở Khóa Nắp Hộp Khám Phá
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="box-open"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                {/* 4 Compartment Slots Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {(Object.keys(COMPARTMENTS_DATA) as CompartmentId[]).map((key) => {
                    const comp = COMPARTMENTS_DATA[key]
                    const isSelected = selectedId === key

                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => setSelectedId(key)}
                        className={cn(
                          'group relative flex min-h-[140px] flex-col justify-between rounded-xl border p-5 text-left transition-all duration-300',
                          isSelected
                            ? 'border-amber-500 bg-amber-500/[0.08] shadow-lg shadow-amber-500/10'
                            : 'border-stone-800/80 bg-stone-950/50 hover:border-stone-700 hover:bg-stone-900/60'
                        )}
                      >
                        {/* Slot Badge */}
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              'text-xs font-mono font-semibold px-2 py-0.5 rounded',
                              isSelected
                                ? 'bg-amber-400 text-stone-950 font-bold'
                                : 'bg-stone-800 text-stone-400 group-hover:text-stone-300'
                            )}
                          >
                            NGĂN {comp.slotNumber}
                          </span>
                          <span className="text-2xl">{comp.icon}</span>
                        </div>

                        {/* Title */}
                        <div className="mt-4">
                          <div className="font-serif text-sm font-medium text-stone-200 line-clamp-2 leading-snug group-hover:text-amber-200">
                            {comp.titleVi}
                          </div>
                          <div className="mt-1 text-xs text-stone-400 line-clamp-1">{comp.tagVi}</div>
                        </div>

                        {/* Active Indicator bar */}
                        {isSelected && (
                          <motion.div
                            layoutId="activeCompartmentUnderline"
                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400"
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Selected Compartment Detailed Focus Area */}
                <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/70 p-6 lg:p-8">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column: Artifact Visual & Identity */}
                    <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-amber-500/20 bg-stone-900/60 p-6 relative overflow-hidden">
                      <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-amber-500/10 blur-[60px]" />

                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-3xl">
                            {selectedItem.icon}
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                              Ngăn Số {selectedItem.slotNumber} · {selectedItem.tagVi}
                            </span>
                            <h4 className="font-serif text-lg font-normal text-stone-100 sm:text-xl">
                              {selectedItem.titleVi}
                            </h4>
                          </div>
                        </div>

                        <div className="mt-6 rounded-lg border border-stone-800 bg-stone-950/60 p-4">
                          <div className="text-xs font-medium text-stone-400">Chất liệu chế tác:</div>
                          <div className="mt-1 text-sm text-amber-200 font-serif leading-relaxed">
                            {selectedItem.materialVi}
                          </div>
                        </div>

                        <div className="mt-4 rounded-lg border border-stone-800 bg-stone-950/60 p-4">
                          <div className="text-xs font-medium text-stone-400">Điểm nhấn độc bản:</div>
                          <div className="mt-1 text-sm text-stone-200 leading-relaxed font-light">
                            {selectedItem.highlightVi}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                        <span>Định danh tài sản:</span>
                        <span className="font-mono text-amber-300 font-bold tracking-wider">
                          {selectedItem.id === 'brass-key'
                            ? 'GU-KEY-2026-SAIGON'
                            : selectedItem.id === 'as-built-dossier'
                            ? 'GU-DOSSIER-A3-120P'
                            : selectedItem.id === 'agarwood-osmo'
                            ? 'GU-OSMO-GERMANY-125'
                            : 'GU-VIP-BLACK-316L'}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Deep Narrative & Technical Specifications */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-widest text-amber-400">
                          Triết Lý Chế Tác & Ý Nghĩa Phong Thủy
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light sm:text-base">
                          {selectedItem.narrativeVi}
                        </p>

                        {/* 4 Technical Specs */}
                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div className="rounded-lg border border-stone-800/80 bg-stone-900/40 p-3.5">
                            <span className="text-[11px] uppercase tracking-wider text-stone-400">Nguồn gốc xuất xứ</span>
                            <div className="mt-1 text-xs font-normal text-stone-200">{selectedItem.specs.origin}</div>
                          </div>

                          <div className="rounded-lg border border-stone-800/80 bg-stone-900/40 p-3.5">
                            <span className="text-[11px] uppercase tracking-wider text-stone-400">Phương pháp thủ công</span>
                            <div className="mt-1 text-xs font-normal text-stone-200">
                              {selectedItem.specs.craftsmanship}
                            </div>
                          </div>

                          <div className="rounded-lg border border-stone-800/80 bg-stone-900/40 p-3.5">
                            <span className="text-[11px] uppercase tracking-wider text-stone-400">Bảo mật & Cam kết</span>
                            <div className="mt-1 text-xs font-normal text-stone-200">
                              {selectedItem.specs.securityWarranty}
                            </div>
                          </div>

                          <div className="rounded-lg border border-stone-800/80 bg-stone-900/40 p-3.5">
                            <span className="text-[11px] uppercase tracking-wider text-stone-400">Nghi thức phụng sự</span>
                            <div className="mt-1 text-xs font-normal text-stone-200">
                              {selectedItem.specs.usageRitual}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Actions for Selected Compartment */}
                      <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-stone-800">
                        {selectedItem.id === 'as-built-dossier' && (
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-stone-950 hover:bg-amber-400 active:scale-95 transition-all"
                          >
                            <span>Xem Chứng Nhận Hoàn Công Điện Tử</span>
                            <ArrowUpRightIcon className="h-3.5 w-3.5" />
                          </button>
                        )}

                        {selectedItem.id === 'vip-metal-card' && (
                          <button
                            type="button"
                            onClick={handleCopyCode}
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all"
                          >
                            <span>{isCopied ? '✓ Đã Sao Chép Mã VIP' : 'Sao Chép Mã Bảo Hành VIP'}</span>
                          </button>
                        )}

                        <a
                          href="tel:0368757916"
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-5 py-2.5 text-xs font-medium text-stone-200 hover:border-stone-600 hover:text-white transition-all"
                        >
                          <span>Hotline Concierge: 0368 757 916</span>
                        </a>

                        <span className="text-xs text-stone-400">
                          Cam kết mặt bằng thực tế: 100% đúng kích thước hoàn công.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3 Pillars of Handover Trust */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-6">
            <div className="text-amber-400 text-lg font-mono font-bold">01. BẢO MẬT TUYỆT ĐỐI</div>
            <h4 className="mt-2 font-serif text-base font-normal text-stone-200">Không Tiết Lộ Danh Tính & Bản Vẽ</h4>
            <p className="mt-2 text-xs leading-relaxed text-stone-400 font-light">
              Mọi tài liệu, hình ảnh và hệ thống kỹ thuật của gia viên được bảo vệ theo thỏa thuận bảo mật nghiêm ngặt
              (NDA). Chỉ có gia chủ nắm giữ chìa khóa mã hóa.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-6">
            <div className="text-amber-400 text-lg font-mono font-bold">02. PHẢN ỨNG TRONG 2 GIỜ</div>
            <h4 className="mt-2 font-serif text-base font-normal text-stone-200">Đội Ngũ Kỹ Thuật Viên Xưởng Thạnh Xuân</h4>
            <p className="mt-2 text-xs leading-relaxed text-stone-400 font-light">
              Bất kỳ vấn đề nào về điện nước, ray trượt tủ áo hoặc điều hòa VRV đều được đội thợ lành nghề có mặt xử lý
              trong vòng 2 giờ tại toàn bộ khu vực TP.HCM.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-6">
            <div className="text-amber-400 text-lg font-mono font-bold">03. BẢO HÀNH KẾT CẤU 10 NĂM</div>
            <h4 className="mt-2 font-serif text-base font-normal text-stone-200">Cam Kết Chất Lượng Đồ Gỗ Mộng Âm</h4>
            <p className="mt-2 text-xs leading-relaxed text-stone-400 font-light">
              Gỗ óc chó sấy chân không chuẩn 10-12% EMC được bảo hành cong vênh, co ngót và mối mọt trọn đời suốt một thập
              kỷ phụng sự gia đình bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Modal: Interactive As-Built Certificate */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl rounded-2xl border border-amber-500/40 bg-stone-900 p-6 sm:p-8 text-stone-100 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-stone-700 bg-stone-800 text-stone-400 hover:text-stone-100"
              >
                ✕
              </button>

              {/* Certificate Design Frame */}
              <div className="rounded-xl border border-amber-500/30 bg-stone-950/90 p-6 sm:p-8 text-center relative overflow-hidden">
                <div className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full bg-amber-500/10 blur-[50px]" />
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-amber-500/10 blur-[50px]" />

                <div className="text-amber-400 text-xs font-mono uppercase tracking-widest">
                  Chứng Thư Nghiệm Thu & Bảo Hành Số · GuHomes Atelier
                </div>

                <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-stone-100 font-light tracking-wide">
                  GIẤY CHỨNG NHẬN HOÀN CÔNG CÔNG TRÌNH
                </h3>

                <div className="mx-auto mt-2 h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                <p className="mt-4 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  Công trình đã được nghiệm thu toàn diện theo tiêu chuẩn vi khí hậu nhiệt đới, kết cấu mộng âm dương gỗ
                  tự nhiên và kiểm định độ an toàn chất lượng không khí VOC theo chuẩn quốc tế.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-left border-y border-stone-800 py-4 text-xs">
                  <div>
                    <span className="text-stone-400">Mã Số Định Danh:</span>
                    <div className="font-mono text-amber-300 font-bold mt-0.5">{certificateCode}</div>
                  </div>
                  <div>
                    <span className="text-stone-400">Thời Hạn Bảo Hành:</span>
                    <div className="text-stone-200 font-medium mt-0.5">10 Năm Kết Cấu (2026 – 2036)</div>
                  </div>
                  <div>
                    <span className="text-stone-400">KTS Chủ Trì:</span>
                    <div className="text-stone-200 font-medium mt-0.5">Trần Tuấn Anh (GuHomes)</div>
                  </div>
                  <div>
                    <span className="text-stone-400">Xưởng Chế Tác:</span>
                    <div className="text-stone-200 font-medium mt-0.5">Xưởng Mộc Thạnh Xuân, Q.12</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Đã ký số & đóng triện sáp điện tử</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="min-h-[44px] rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all"
                    >
                      {isCopied ? 'Đã sao chép mã!' : 'Sao chép mã'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="min-h-[44px] rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-stone-950 hover:bg-amber-400 active:scale-95 transition-all"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
