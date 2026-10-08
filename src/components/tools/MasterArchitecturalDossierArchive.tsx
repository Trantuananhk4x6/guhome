'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

interface DossierPage {
  pageNumber: string
  titleVi: string
  categoryVi: string
  paperSpecVi: string
  keyContentVi: string
  illustrationVi: string
}

const DOSSIER_PAGES: DossierPage[] = [
  {
    pageNumber: '01',
    titleVi: 'Bản Đồ Vi Khí Hậu & Hướng Gió Mùa Đô Thị',
    categoryVi: 'Khí Tượng & Hướng Nắng',
    paperSpecVi: 'Giấy Mỹ Thuật Arches Pháp 300gsm · Mực In Khoáng Tự Nhiên Không Phai 100 Năm',
    keyContentVi:
      'Ghi chép chính xác tọa độ góc nắng chiếu hướng Tây, biểu đồ vận tốc gió sông Sài Gòn theo mùa và các giải pháp lam xoay chắn nắng thụ động.',
    illustrationVi: 'Mặt bằng hướng nắng & vector luồng khí sông',
  },
  {
    pageNumber: '02',
    titleVi: 'Mặt Cắt 3D Giải Phẫu Sàn Âm & Khớp Mộng Gỗ',
    categoryVi: 'Kết Cấu Kiến Trúc May Đo',
    paperSpecVi: 'Bản vẽ phối cảnh Isometric đục lỗ chỉ thị mộng âm dương',
    keyContentVi:
      'Bóc tách từng khớp nối mộng đuôi én, chốt bướm gỗ mun và hệ sàn nâng cách âm STC 65 để gia chủ bảo trì chuẩn xác sau nhiều thập kỷ.',
    illustrationVi: 'Phối cảnh 3D Exploded View khớp mộc không đinh',
  },
  {
    pageNumber: '03',
    titleVi: 'Sơ Đồ MEP Âm Tường & Hệ Thống Nhà Thông Minh KNX',
    categoryVi: 'Cơ Điện & Chiếu Sáng',
    paperSpecVi: 'Lớp phim trong suốt Mylar phủ lên bản vẽ kiến trúc',
    keyContentVi:
      'Định vị đến từng milimet vị trí ống nước chịu nhiệt PPR, dây điện chống cháy và tủ điều khiển ánh sáng 2700K ẩn tường, không lo khoan trúng ống ngầm.',
    illustrationVi: 'Sơ đồ định vị MEP phân lớp màu kỹ thuật số',
  },
  {
    pageNumber: '04',
    titleVi: 'Chứng Thư Xuất Xứ Vật Liệu & Nhật Ký Thợ Cả Thạnh Xuân',
    categoryVi: 'Bảo Chứng Di Sản Tư Gia',
    paperSpecVi: 'Đóng dấu xi nóng sáp ong & dập nhũ vàng lá 24K Kiêu Kỵ',
    keyContentVi:
      'Lưu trữ mã số lô gỗ Óc Chó FSC Bắc Mỹ, chỉ số độ ẩm lò sấy 9.2%, tọa độ mỏ đá cẩm thạch và chữ ký xác nhận của Lead Architect cùng Thợ Cả chế tác.',
    illustrationVi: 'Chứng thư pháp lý vật liệu kèm dấu mộc sơn đỏ',
  },
]

export function MasterArchitecturalDossierArchive({ className }: { className?: string } = {}) {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0)
  const [includePhysicalModel, setIncludePhysicalModel] = useState<boolean>(true)

  // Booking Form State
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingCode, setBookingCode] = useState('')

  const currentPage = DOSSIER_PAGES[currentPageIndex] ?? DOSSIER_PAGES[0]!

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientPhone) return
    const randomHex = Math.floor(1000 + Math.random() * 9000)
    setBookingCode(`GU-DOSSIER-2026-${randomHex}`)
    setIsSubmitted(true)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0d10] py-24 text-[#e2e4e9] border-t border-[#1c1e24]', className)}>
      {/* Heritage Leather & Gold Leaf Warm Ambient Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3d3320] bg-[#1a160e] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-ping" />
            Sử Ký Kiến Trúc Di Sản · Master Architectural Dossier Archive A3
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf7f0]">
            Hồ Sơ Hoàn Công Khổ A3 Bìa Da &amp; Mô Hình Gỗ 1:20
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#9f998e]">
            Một ngôi nhà truyền đời xứng đáng có một cuốn sử ký riêng biệt. Ngày bàn giao chìa khóa, gia chủ được trân trọng trao tặng bộ hồ sơ hoàn công in màu khổ A3 trên giấy mỹ thuật Arches Pháp dày 300gsm đóng bìa da bò Ý dập nhũ vàng 24K — lưu giữ trọn vẹn từng đường ống ngầm và khớp mộng gỗ cho con cháu mai sau.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: A3 Interactive Page-Turner Viewer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#2b271d] bg-[#13110d]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262118] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                    Lật Giở Trang Hồ Sơ Di Sản
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf7f0]">
                    Trang {currentPage.pageNumber} / 04 · {currentPage.categoryVi}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : DOSSIER_PAGES.length - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#382f1f] bg-[#1a150e] text-xs font-mono text-[#d4af37] hover:bg-[#282014]"
                  >
                    ←
                  </button>
                  <span className="font-mono text-xs text-[#a09584]">
                    {currentPageIndex + 1} / {DOSSIER_PAGES.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPageIndex((prev) => (prev < DOSSIER_PAGES.length - 1 ? prev + 1 : 0))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#382f1f] bg-[#1a150e] text-xs font-mono text-[#d4af37] hover:bg-[#282014]"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* A3 Folio Mockup Canvas */}
              <div className="mt-6 overflow-hidden rounded-xl border-2 border-[#423521] bg-[#1c1813] relative aspect-[14/10] flex flex-col justify-between p-6 sm:p-8 shadow-2xl">
                {/* Vintage Arches Paper Background Texture */}
                <div className="absolute inset-0 bg-[#f4ece1] opacity-[0.03] pointer-events-none" />

                {/* Top Folio Header */}
                <div className="flex items-center justify-between border-b border-[#382f21] pb-3 text-xs font-mono text-[#d4af37]">
                  <span>GUHOMES ARCHITECTURAL DOSSIER · VOL. 2026</span>
                  <span>KHỔ A3 (420 x 297 mm)</span>
                </div>

                {/* Main Drawing Showcase */}
                <div className="my-auto py-4 space-y-3">
                  <span className="inline-block rounded-full bg-[#292013] border border-[#4d3d23] px-3 py-1 font-mono text-[10px] text-[#e6c86e]">
                    {currentPage.illustrationVi}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#fef9f0]">
                    {currentPage.titleVi}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#c4b9a8] leading-relaxed max-w-[52ch]">
                    {currentPage.keyContentVi}
                  </p>
                </div>

                {/* Bottom Paper Spec */}
                <div className="flex flex-wrap items-center justify-between border-t border-[#382f21] pt-3 text-[11px] font-mono text-[#8a7e6c]">
                  <span>{currentPage.paperSpecVi}</span>
                  <span className="text-[#d4af37] font-bold">Trang {currentPage.pageNumber}</span>
                </div>
              </div>

              {/* Physical Architectural Model (1:20) Showcase */}
              <div className="mt-6 rounded-xl border border-[#332a1b] bg-[#17140f] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <span className="font-mono text-xs text-[#d4af37] block">
                      Mô Hình Kiến Trúc Tỷ Lệ 1:20 Chế Tác Riêng
                    </span>
                    <span className="text-[11px] text-[#8e8270]">
                      Gỗ Óc Chó &amp; Sa Thạch đặt trong lồng kính pha lê làm vật phẩm đại sảnh
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludePhysicalModel(!includePhysicalModel)}
                  className={cn(
                    'px-3 py-1 rounded-full text-[11px] font-mono transition-all',
                    includePhysicalModel ? 'bg-[#d4af37] text-[#14110a] font-bold' : 'border border-[#382f1f] text-[#8e8270]'
                  )}
                >
                  {includePhysicalModel ? 'Đã Tích Hợp' : 'Tùy Chọn'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Handcrafted Box Specs & Registration Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#2b271d] bg-[#13110d]/90 p-6 sm:p-8 backdrop-blur-md">
              <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                Nghi Thức Bàn Giao Tổ Ấm Mới
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf7f0]">
                Đăng Ký Gia Công Hộp Sử Ký Di Sản
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#9f998e]">
                Hộp đựng hồ sơ được bọc da bò Ý cao cấp khâu tay chỉ sáp, lót gỗ Tuyết Tùng bảo quản giấy không ẩm mốc và dập nổi tên gia chủ bằng vàng lá Kiêu Kỵ.
              </p>

              {isSubmitted ? (
                <div className="mt-6 rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-400 text-xl">
                    <CheckIcon />
                  </div>
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block">
                    Đã Ghi Nhận Yêu Cầu Chế Tác Sử Ký
                  </span>
                  <h4 className="font-serif text-lg text-emerald-100">
                    Mã Tiếp Đón VIP: <span className="font-mono text-[#d4af37] font-bold">{bookingCode}</span>
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    Lead Architect GuHomes sẽ liên hệ để thu thập tên gia chủ, ngày khởi công và thông điệp gia phong để dập nhũ vàng lên bìa da A3.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#d4af37] uppercase mb-1">
                      Họ và Tên Gia Chủ / Tên Dinh Thự *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ví dụ: Dinh Thự Hoàng Lan"
                      className="w-full rounded-xl border border-[#332b1d] bg-[#0c0a07] px-4 py-3 text-xs text-white placeholder-[#5d5446] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#d4af37] uppercase mb-1">
                      Số Điện Thoại Xác Nhận Khắc Tên Bìa Da *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full rounded-xl border border-[#332b1d] bg-[#0c0a07] px-4 py-3 text-xs text-white placeholder-[#5d5446] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="rounded-xl bg-[#0c0a07] p-3 text-[11px] text-[#8e8372] space-y-1">
                    <span className="block font-mono text-[10px] text-[#d4af37] uppercase">Vật Phẩm Trao Tặng:</span>
                    <p>
                      Bao gồm 1 cuốn dossier A3 bìa da bò Ý dập nhũ vàng + 1 USB kim loại chứa bản vẽ CAD/BIM số hóa + 1 mô hình thu nhỏ 1:20 gỗ óc chó (nếu chọn).
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3.5 text-xs font-mono font-bold tracking-wider text-[#14110a] hover:bg-[#e4be4a] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
                  >
                    <span>Yêu cầu chế tác hồ sơ hoàn công di sản</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </button>
                </form>
              )}

              {/* Direct Hotline */}
              <div className="mt-6 pt-5 border-t border-[#262118] flex items-center justify-between text-xs font-mono text-[#8a7e6c]">
                <span>Tư vấn nghi thức bàn giao:</span>
                <a href="tel:0368757916" className="text-[#d4af37] font-bold hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
