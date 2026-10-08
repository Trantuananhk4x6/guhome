'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface PassportRecord {
  serialCode: string
  pieceNameVi: string
  woodSpeciesVi: string
  forestOriginVi: string
  dryingMoistureStart: number
  dryingMoistureFinal: number
  masterCraftsmanVi: string
  finishingArtisanVi: string
  handoverDate: string
  locationProjectVi: string
  handoverBoxCode: string
  maintenanceCount: number
}

const SAMPLE_PASSPORTS: Record<string, PassportRecord> = {
  'GH-CRAFT-2026-0888': {
    serialCode: 'GH-CRAFT-2026-0888',
    pieceNameVi: 'Bàn Trà Mun Sừng Khối Liền Chân Đá Vôi Navona',
    woodSpeciesVi: 'Gỗ Mun Sọc Tự Nhiên & Óc Chó Bắc Mỹ Fas',
    forestOriginVi: 'Appalachian Hardwood Forest, Bắc Mỹ (Chứng chỉ FSC Quốc Tế)',
    dryingMoistureStart: 38.4,
    dryingMoistureFinal: 9.2,
    masterCraftsmanVi: 'Thợ Cả Bùi Văn Toàn (28 năm kinh nghiệm mộng gỗ truyền thống)',
    finishingArtisanVi: 'Nghệ Nhân Nguyễn Văn Hùng (Chuyên gia đánh dầu Osmo Đức)',
    handoverDate: '15/06/2026',
    locationProjectVi: 'Penthouse The Opera Metropole, Thủ Thiêm',
    handoverBoxCode: 'BOX-WALNUT-VIP-0888',
    maintenanceCount: 2,
  },
  'GH-CRAFT-2026-0125': {
    serialCode: 'GH-CRAFT-2026-0125',
    pieceNameVi: 'Hệ Tủ Áo Walk-In Closet Gỗ Tuyết Tùng Tây Ban Nha',
    woodSpeciesVi: 'Tuyết Tùng Tây Ban Nha (Cedrela Odorata) & Mun Sọc',
    forestOriginVi: 'Rừng gỗ nguồn gốc bền vững Trung Mỹ & Gỗ óc chó Bắc Mỹ',
    dryingMoistureStart: 34.0,
    dryingMoistureFinal: 8.8,
    masterCraftsmanVi: 'Thợ Cả Trần Văn Lương (24 năm kinh nghiệm mộc nội thất)',
    finishingArtisanVi: 'Nghệ Nhân Lê Thanh Hải (Chuyên gia lau sáp vi tinh thể)',
    handoverDate: '28/08/2026',
    locationProjectVi: 'Dinh Thự Ven Sông Thảo Điền, TP. Thủ Đức',
    handoverBoxCode: 'BOX-WALNUT-VIP-0125',
    maintenanceCount: 1,
  },
}

export function ArtisanCraftsmanPassport({ className }: { className?: string } = {}) {
  const [searchInput, setSearchInput] = useState('GH-CRAFT-2026-0888')
  const [currentRecord, setCurrentRecord] = useState<PassportRecord>(SAMPLE_PASSPORTS['GH-CRAFT-2026-0888']!)
  const [isScanning, setIsScanning] = useState(false)
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)

  const handleScanSimulation = (code: string) => {
    setIsScanning(true)
    setTimeout(() => {
      const found = SAMPLE_PASSPORTS[code] || SAMPLE_PASSPORTS['GH-CRAFT-2026-0888']!
      setCurrentRecord(found)
      setIsScanning(false)
    }, 700)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    handleScanSimulation(searchInput.trim())
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0a08] py-24 text-[#e8e4df] border-t border-[#1a1916]', className)}>
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d281e] bg-[#16130e] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Minh Bạch Nguồn Gốc Thủ Công · NFC Craftsman Passport
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Hộ Chiếu Nghệ Nhân & Truy Xuất Nguồn Gốc NFC
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Mỗi món đồ mộc độc bản của GuHomes rời xưởng Thạnh Xuân đều được gắn huy hiệu đồng thau đúc mang chip NFC mã hóa. Chạm nhẹ điện thoại để mở ra toàn bộ biên niên sử: từ cánh rừng khai thác, bàn tay người thợ cả đến nhật ký sấy ẩm.
          </p>
        </div>

        {/* NFC Interactive Scanner Cockpit */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch mb-16">
          {/* Left Column: NFC Brass Badge & Tap Simulation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#2d2518] bg-[#120f09] p-6 sm:p-8 shadow-2xl">
            <div>
              {/* Brass Emblem Card */}
              <div className="relative aspect-square w-full max-w-[320px] mx-auto overflow-hidden rounded-full border-4 border-[#3d321d] bg-gradient-to-br from-[#2a2214] via-[#1a140b] to-[#0e0a05] p-6 shadow-2xl flex flex-col items-center justify-center text-center">
                {/* Metallic Circular Grooves */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'repeating-radial-gradient(circle, #d4af37 0, #d4af37 1px, transparent 2px, transparent 8px)',
                  }}
                />

                {/* NFC Icon & Pulsing Waves */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-2xl shadow-lg shadow-black/60">
                    <span className="relative">⚡</span>
                    {isScanning && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#d4af37] opacity-40" />
                    )}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#d4af37]">
                    GUHOMES · ATELIER THẠNH XUÂN
                  </span>
                  <div className="mt-2 font-mono text-xs sm:text-sm font-bold text-[#f4efe6] tracking-wider">
                    {currentRecord.serialCode}
                  </div>
                  <span className="mt-1 block text-[10px] text-[#8e8272]">CHIP NFC ENCRYPTED</span>
                </div>

                {/* Bottom Brass Hallmark */}
                <div className="absolute bottom-6 font-mono text-[10px] text-[#706454]">
                  SOLID C360 BRASS · VERIFIED
                </div>
              </div>

              {/* Tap Simulation Buttons */}
              <div className="mt-8 space-y-2">
                <span className="block text-xs font-mono uppercase tracking-wider text-[#8e8272] text-center mb-2">
                  Chạm Thử Nghiệm Tác Phẩm Mẫu (NFC Tap Simulator)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('GH-CRAFT-2026-0888')
                      handleScanSimulation('GH-CRAFT-2026-0888')
                    }}
                    className={cn(
                      'rounded-lg border p-2.5 text-center text-xs transition-all',
                      currentRecord.serialCode === 'GH-CRAFT-2026-0888'
                        ? 'border-[#d4af37] bg-[#1d170e] text-[#f4efe6]'
                        : 'border-[#292215] bg-[#141009] text-[#7a6f5e] hover:border-[#3d3320]'
                    )}
                  >
                    Bàn Trà Mun Sọc (0888)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('GH-CRAFT-2026-0125')
                      handleScanSimulation('GH-CRAFT-2026-0125')
                    }}
                    className={cn(
                      'rounded-lg border p-2.5 text-center text-xs transition-all',
                      currentRecord.serialCode === 'GH-CRAFT-2026-0125'
                        ? 'border-[#d4af37] bg-[#1d170e] text-[#f4efe6]'
                        : 'border-[#292215] bg-[#141009] text-[#7a6f5e] hover:border-[#3d3320]'
                    )}
                  >
                    Tủ Áo Tuyết Tùng (0125)
                  </button>
                </div>
              </div>
            </div>

            {/* Manual Lookup Form */}
            <form onSubmit={handleSearch} className="mt-6 border-t border-[#241c10] pt-6">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8e8272] mb-1.5">
                Hoặc Nhập Mã Sê-ri Trên Huy Hiệu Đồng
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Ví dụ: GH-CRAFT-2026-0888"
                  className="w-full rounded-lg border border-[#2d2416] bg-[#16120a] px-3.5 py-2.5 font-mono text-xs text-[#f4efe6] focus:border-[#d4af37] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isScanning}
                  className="shrink-0 rounded-lg bg-[#d4af37] px-4 py-2.5 text-xs font-semibold uppercase text-black hover:bg-[#e6c158] disabled:opacity-50"
                >
                  {isScanning ? 'Đang Đọc...' : 'Tra Cứu'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Complete Artisan Passport Dossier (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#2d2518] bg-[#120f09] p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Header Dossier */}
              <div className="border-b border-[#241c10] pb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#d4af37]/20 border border-[#d4af37]/40 px-2 py-0.5 font-mono text-[10px] text-[#d4af37]">
                      CHỨNG THƯ NGHỆ NHÂN CHÍNH HÃNG
                    </span>
                    <span className="font-mono text-xs text-emerald-400">NFC VERIFIED ✓</span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
                    {currentRecord.pieceNameVi}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-[#8e8272]">
                    Mã Định Danh: {currentRecord.serialCode}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCertificateModalOpen(true)}
                  className="rounded-lg border border-[#3d321d] bg-[#1a140b] px-3.5 py-2 text-xs font-medium text-[#d4af37] hover:bg-[#241c10] transition-colors"
                >
                  Xem Chứng Thư A3
                </button>
              </div>

              {/* Artisan Hands Section */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#292013] bg-[#16120a] p-4 text-xs">
                  <span className="block font-mono text-[10px] text-[#706454] uppercase mb-1">
                    THỢ CẢ CHỦ TRÌ MỘC
                  </span>
                  <div className="font-serif text-sm text-[#f4efe6] font-medium">
                    {currentRecord.masterCraftsmanVi}
                  </div>
                  <p className="mt-1 text-[11px] text-[#8e8272]">
                    Chịu trách nhiệm trực tiếp về độ khít mộng ngàm thủ công 0.1mm
                  </p>
                </div>

                <div className="rounded-xl border border-[#292013] bg-[#16120a] p-4 text-xs">
                  <span className="block font-mono text-[10px] text-[#706454] uppercase mb-1">
                    NGHỆ NHÂN HOÀN THIỆN BỀ MẶT
                  </span>
                  <div className="font-serif text-sm text-[#f4efe6] font-medium">
                    {currentRecord.finishingArtisanVi}
                  </div>
                  <p className="mt-1 text-[11px] text-[#8e8272]">
                    Lau bóng 4 lớp dầu hữu cơ Osmo Đức giữ trọn thớ gỗ mộc
                  </p>
                </div>
              </div>

              {/* Timber Origin & Moisture Equilibrium Chart */}
              <div className="rounded-xl border border-[#292013] bg-[#16120a] p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#8e8272]">Cánh rừng khai thác:</span>
                  <span className="text-[#f4efe6] font-medium text-right max-w-xs">{currentRecord.forestOriginVi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8e8272]">Chủng loại gỗ:</span>
                  <span className="text-[#d4af37] font-medium text-right max-w-xs">{currentRecord.woodSpeciesVi}</span>
                </div>
                <div className="border-t border-[#221a0e] pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[#8e8272]">Chu trình sấy ẩm chân không (21 Ngày):</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {currentRecord.dryingMoistureStart}% → {currentRecord.dryingMoistureFinal}% (Đạt Chuẩn)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#20180e] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 w-full" />
                  </div>
                  <span className="mt-1 block text-[10px] text-[#706454]">
                    * Gỗ đạt điểm ẩm cân bằng 9.2% — miễn nhiễm nứt toác và cong vênh dưới độ ẩm 80% Sài Gòn.
                  </span>
                </div>
              </div>

              {/* Project & Maintenance History */}
              <div className="rounded-xl border border-[#292013] bg-[#16120a] p-4 text-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] font-mono text-[#706454] uppercase">VỊ TRÍ CÔNG TRÌNH BÀN GIAO</span>
                  <span className="font-medium text-[#f4efe6]">{currentRecord.locationProjectVi}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#706454] uppercase">NGÀY BÀN GIAO</span>
                  <span className="font-mono text-[#d4af37]">{currentRecord.handoverDate}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#706454] uppercase">HOME WOOD SPA</span>
                  <span className="font-mono text-emerald-400">{currentRecord.maintenanceCount} Lần Hoàn Tất</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#241c10] flex flex-col sm:flex-row items-center gap-3">
              <a
                href="/studio"
                className="w-full sm:w-auto flex-1 rounded-lg bg-[#d4af37] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#e6c158] active:scale-[0.98]"
              >
                Ghé Thăm Xưởng Mộc Thạnh Xuân
              </a>
              <a
                href="/du-toan-chi-phi"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#3d321d] bg-[#17120a] px-4 py-3 text-xs font-medium text-[#e8e4df] transition-colors hover:border-[#524326] hover:bg-[#1d170d]"
              >
                Dự Toán May Đo Độc Bản
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-[#d4af37]" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal: Chứng Thư Nghệ Nhân Kỹ Thuật Số */}
        <AnimatePresence>
          {certificateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-lg w-full rounded-2xl border border-[#3d321d] bg-[#14100a] p-8 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#292013]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] text-sm">
                      ✓
                    </span>
                    <h4 className="font-serif text-xl text-[#f4efe6]">Hồ Sơ Hộ Chiếu Nghệ Nhân</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCertificateModalOpen(false)}
                    className="text-[#706454] hover:text-[#f4efe6] text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#a8a29e]">
                  <div className="rounded-xl border border-[#332717] bg-[#1b150c] p-4 text-center">
                    <span className="font-mono text-xs text-[#d4af37] block mb-1">MÃ CHỨNG THỰC NFC</span>
                    <div className="font-mono text-lg font-bold text-[#f4efe6] tracking-widest">
                      {currentRecord.serialCode}
                    </div>
                    <span className="text-[11px] text-[#8e8272] block mt-1">{currentRecord.pieceNameVi}</span>
                  </div>

                  <div className="space-y-2 text-xs border-y border-[#241c10] py-4">
                    <div className="flex justify-between">
                      <span className="text-[#8e8272]">Chủ trì gia công:</span>
                      <strong className="text-[#f4efe6]">{currentRecord.masterCraftsmanVi}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8e8272]">Kiểm tra độ ẩm:</span>
                      <strong className="text-emerald-400">9.2% (Delmhorst USA Certified)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8e8272]">Hộp bàn giao mộc:</span>
                      <strong className="text-[#d4af37]">{currentRecord.handoverBoxCode}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8e8272]">Cam kết bảo hành kết cấu:</span>
                      <strong className="text-[#f4efe6]">Trọn đời 30 năm</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#706454]">
                    <span>Ký duyệt: KTS Trưởng GuHomes</span>
                    <span>Xưởng Mộc Thạnh Xuân, Q.12</span>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCertificateModalOpen(false)}
                    className="w-full rounded-lg bg-[#d4af37] py-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Đóng Chứng Thư
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
