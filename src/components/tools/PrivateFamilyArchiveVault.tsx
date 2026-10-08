'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

interface VaultCompartment {
  id: string
  titleVi: string
  specVi: string
  capacityVi: string
  tactileLiningVi: string
  descriptionVi: string
}

const VAULT_COMPARTMENTS: VaultCompartment[] = [
  {
    id: 'deeds-heritage',
    titleVi: 'Hộc Sổ Đỏ Bất Động Sản & Gia Phả Dòng Họ',
    specVi: 'Kích thước chuẩn A4+ mở phẳng 180° không gập gãy',
    capacityVi: 'Chứa tối đa 40 bộ tài liệu pháp lý & sổ đỏ',
    tactileLiningVi: 'Lót Da Bò Ý Thuộc Thảo Mộc (Vegetable-Tanned Buttero Leather)',
    descriptionVi:
      'Được thiết kế góc mở phẳng tuyệt đối, ngăn tình trạng cong mép hay gập nếp các trang sổ hồng bất động sản và bản gia phả chép tay gia tộc qua nhiều thế hệ.',
  },
  {
    id: 'horology-gems',
    titleVi: 'Khay Đồng Hồ Cơ Sưu Tầm & Trang Sức Gia Bảo',
    specVi: '4 Hộc xoay tự động (Watch Winder) + Khay chia nhẫn kim cương',
    capacityVi: '12 Đồng hồ cơ cao cấp + Bộ ngọc bích gia truyền',
    tactileLiningVi: 'Nhung Alcantara Kháng Từ Tính Chống Xước Tuyệt Đối',
    descriptionVi:
      'Lớp lót Alcantara kháng từ trường triệt tiêu tĩnh điện, bảo vệ bộ máy cơ khí phức tạp của đồng hồ Patek Philippe, Audemars Piguet hoặc Rolex khỏi nhiễm từ môi trường đô thị.',
  },
  {
    id: 'digital-vault',
    titleVi: 'Ngăn Lưu Trữ Ổ Cứng SSD & Khóa Private Key Tiền Số',
    specVi: 'Lồng Faraday Triệt Tiêu Sóng Điện Từ & Tia X',
    capacityVi: '4 Ổ cứng SSD chống sốc + Thẻ kim loại Seed Phrase Ledger',
    tactileLiningVi: 'Vật liệu cách ly điện từ bọc đồng Berili C17200',
    descriptionVi:
      'Lá chắn Faraday bảo vệ toàn bộ dữ liệu số kỷ niệm gia đình, video 4K tư liệu và tài sản số khỏi xung điện từ EMP hay sự can thiệp từ xa bên ngoài.',
  },
  {
    id: 'letters-cedar',
    titleVi: 'Ngăn Thư Kỷ Niệm & Kỷ Vật Gỗ Tuyết Tùng Bắc Mỹ',
    specVi: 'Khoang hút ẩm tự nhiên 50–55% RH không dùng điện',
    capacityVi: 'Hơn 200 lá thư tay, ảnh tư liệu & nhật ký đời người',
    tactileLiningVi: 'Gỗ Tuyết Tùng Đỏ Tây Bắc Mỹ (Western Red Cedar)',
    descriptionVi:
      'Gỗ tuyết tùng tiết ra tinh dầu thơm tự nhiên xua đuổi côn trùng, cân bằng ẩm vi khí hậu vĩnh cửu giúp giấy dó, ảnh đen trắng bách niên không bao giờ ẩm mốc hay ố vàng.',
  },
]

export function PrivateFamilyArchiveVault({ className }: { className?: string } = {}) {
  const [isSecretPanelOpen, setIsSecretPanelOpen] = useState<boolean>(false)
  const [activeCompartmentId, setActiveCompartmentId] = useState<string>('deeds-heritage')

  // Booking Form State
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [estateType, setEstateType] = useState('penthouse')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingCode, setBookingCode] = useState('')

  const activeCompartment =
    VAULT_COMPARTMENTS.find((c) => c.id === activeCompartmentId) ?? VAULT_COMPARTMENTS[0]!

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientPhone) return
    const randomHex = Math.floor(1000 + Math.random() * 9000)
    setBookingCode(`GU-VAULT-2026-${randomHex}`)
    setIsSubmitted(true)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0d10] py-24 text-[#e2e4e9] border-t border-[#1a1c23]', className)}>
      {/* Background Security Grid lines subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(79,110,138,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2b3345] bg-[#121622] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#82aaff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#82aaff] animate-ping" />
            Bảo Mật Tư Gia Quiet Luxury · Private Family Archive Vault
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f0f3f8]">
            Két Kỷ Vật Gia Đình Chống Cháy 1000°C Ẩn Sau Vách Gỗ
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#949eaf]">
            Nơi cất giữ trang sức gia bảo, sổ hồng bất động sản, gia phả trăm năm và kho lưu trữ số của dòng tộc. Hoàn toàn giấu kín sau vách ốp gỗ óc chó với cơ chế trượt mộng âm tĩnh lặng, bọc sợi gốm ceramic cách nhiệt chuẩn bảo an quốc tế UL 72 Class 350.
          </p>
        </div>

        {/* Core Interactive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Concealed Panel Simulation & Thermal Test */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Concealed Wall Simulator */}
            <div className="rounded-2xl border border-[#212633] bg-[#11141c]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#212633] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#82aaff]">
                    Mô Phỏng Cơ Chế Giấu Kín (Hidden Architectural Panel)
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f0f3f8]">
                    {isSecretPanelOpen ? 'Vách Gỗ Đã Trượt Mở · Hé Lộ Kho Két' : 'Vách Gỗ Óc Chó Liền Khối Đang Đóng'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSecretPanelOpen(!isSecretPanelOpen)}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                    isSecretPanelOpen
                      ? 'bg-[#82aaff] text-[#0c0d10] font-bold shadow-[0_0_15px_rgba(130,170,255,0.3)]'
                      : 'border border-[#38435d] bg-[#181d2a] text-[#82aaff] hover:bg-[#20283b]'
                  )}
                >
                  {isSecretPanelOpen ? '🔒 Chạm Để Đóng Vách Gỗ' : '✨ Chạm Cảm Biến Mở Vách Ẩn'}
                </button>
              </div>

              {/* Visual Panel Interactive Canvas */}
              <div className="mt-6 overflow-hidden rounded-xl border border-[#2b3345] bg-[#090b0e] relative aspect-[16/9] flex items-center justify-center">
                {/* Background when opened: The Heavy Steel Vault Body */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#161a24] to-[#0c0e14] p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-[#242b3a] pb-3 text-xs font-mono text-[#82aaff]">
                    <span>KHO KÉT THÉP ĐÚC MONOLITHIC</span>
                    <span>CHUẨN CHỊU NHIỆT UL 72 CLASS 350</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-4">
                    {VAULT_COMPARTMENTS.map((c) => (
                      <div
                        key={c.id}
                        className={cn(
                          'p-2.5 rounded-lg border text-[11px] transition-all cursor-pointer',
                          activeCompartmentId === c.id
                            ? 'border-[#82aaff] bg-[#1a2233] text-white'
                            : 'border-[#242b3a] bg-[#121622] text-[#8e99ac] hover:text-white'
                        )}
                        onClick={() => setActiveCompartmentId(c.id)}
                      >
                        <span className="font-mono text-[9px] text-[#82aaff] block mb-1">
                          {c.id === 'deeds-heritage' ? '📄 SỔ ĐỎ' : c.id === 'horology-gems' ? '⏱ ĐỒNG HỒ' : c.id === 'digital-vault' ? '💾 DỮ LIỆU' : '📜 KỶ VẬT'}
                        </span>
                        <span className="font-medium line-clamp-1">{c.titleVi.split(' & ')[0]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6c788d]">
                    <span>Bọc sợi gốm Ceramic Aerogel 100mm</span>
                    <span>Cửa dày 120mm · Chốt khóa 4 chiều 38mm</span>
                  </div>
                </div>

                {/* Sliding Architectural Wood Veneer Panel */}
                <div
                  className={cn(
                    'absolute inset-0 bg-[#2b1f16] border-r-2 border-[#4a3628] transition-transform duration-700 ease-in-out flex flex-col items-center justify-center p-6 text-center shadow-2xl',
                    isSecretPanelOpen ? '-translate-x-[92%]' : 'translate-x-0'
                  )}
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #2b1f16 0px, #33251a 120px, #261b13 240px)',
                  }}
                >
                  {!isSecretPanelOpen && (
                    <div className="space-y-3 max-w-[34ch] backdrop-blur-[2px] p-4 rounded-xl bg-black/20 border border-white/5">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#4a3628]/40 border border-[#7a5941]/40 text-amber-200">
                        🔒
                      </div>
                      <span className="font-serif text-base text-[#f5ebd7] block">
                        Vách Gỗ Trang Trí Óc Chó Liền Mạch
                      </span>
                      <p className="text-xs text-[#c2b4a3] leading-relaxed">
                        Mặt vách phẳng lỳ 100% không để lộ ổ khóa hay bản lề. Chỉ mở khi chạm đúng điểm cảm ứng điện dung chìm bên dưới thớ gỗ tự nhiên.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Compartment Detail */}
              <div className="mt-6 rounded-xl border border-[#262e40] bg-[#141a27] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#82aaff]">
                    CHI TIẾT PHÂN KHU LƯU TRỮ
                  </span>
                  <span className="rounded-full bg-[#1c2438] px-2.5 py-0.5 font-mono text-[10px] text-[#82aaff]">
                    {activeCompartment.capacityVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f0f3f8]">
                  {activeCompartment.titleVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#a5b0c2]">
                  {activeCompartment.descriptionVi}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#222a3c]">
                  <div className="rounded-lg bg-[#0e121a] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#606e87]">Quy Cách Kỹ Thuật</span>
                    <span className="mt-1 block text-xs font-medium text-[#d0d7e4]">
                      {activeCompartment.specVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#0e121a] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#606e87]">Vật Liệu Lót Xúc Giác</span>
                    <span className="mt-1 block text-xs font-medium text-[#82aaff]">
                      {activeCompartment.tactileLiningVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fire Resistance UL 72 Class 350 Scientific Metrics */}
            <div className="rounded-2xl border border-[#212633] bg-[#11141c]/90 p-6 sm:p-8 backdrop-blur-md">
              <span className="font-mono text-xs uppercase tracking-wider text-[#82aaff]">
                Thử Nghiệm Chịu Lửa Tiêu Chuẩn UL 72 Class 350 (4 Giờ)
              </span>
              <h4 className="mt-1 font-serif text-lg sm:text-xl text-[#f0f3f8]">
                Bảo Vệ Giấy Tờ &amp; Dữ Liệu Dưới Ngọn Lửa 1000°C
              </h4>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-4">
                  <span className="block font-mono text-xs text-red-400">NHIỆT ĐỘ HỎA HOẠN NGOÀI</span>
                  <span className="mt-1 font-mono text-2xl font-bold text-red-500">1.000°C</span>
                  <span className="mt-1 block text-xs text-red-300/80">
                    Ngọn lửa cường độ cao duy trì trong suốt 240 phút liên tục.
                  </span>
                </div>
                <div className="rounded-xl border border-[#2b4566] bg-[#122338]/60 p-4">
                  <span className="block font-mono text-xs text-[#82aaff]">NHIỆT ĐỘ TRONG LÒNG KÉT</span>
                  <span className="mt-1 font-mono text-2xl font-bold text-[#b4d0ff]">&lt; 45°C</span>
                  <span className="mt-1 block text-xs text-[#9eb6dc]">
                    Giấy không ố vàng, mực không phai, ổ cứng SSD bảo toàn 100% byte dữ liệu.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential VIP Consultation Booking */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#2b3345] bg-[#141824]/95 p-6 sm:p-8 backdrop-blur-md">
              <span className="font-mono text-xs uppercase tracking-wider text-[#82aaff]">
                Dịch Vụ Khảo Sát Kín Tuyệt Mật
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f0f3f8]">
                Tư Vấn Tích Hợp Két Bảo Mật Tư Gia
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#949eaf]">
                Hệ thống két giấu vách được thực hiện theo quy trình bảo mật cấp cao: chỉ Lead Architect và Đội cơ khí mộc tinh hoa Thạnh Xuân trực tiếp thi công. Không chia sẻ bản vẽ ra ngoài.
              </p>

              {isSubmitted ? (
                <div className="mt-6 rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-400 text-xl">
                    <CheckIcon />
                  </div>
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block">
                    Đăng Ký Khảo Sát Tuyệt Mật Thành Công
                  </span>
                  <h4 className="font-serif text-lg text-emerald-100">
                    Mã Tiếp Đón VIP: <span className="font-mono text-[#82aaff] font-bold">{bookingCode}</span>
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    KTS Trưởng GuHomes sẽ liên hệ trực tiếp qua kênh riêng tư trong vòng 4 giờ làm việc để hẹn buổi khảo sát thực địa kín tại tư gia của bạn.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#82aaff] uppercase mb-1">
                      Họ và Tên Gia Chủ *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ví dụ: Anh Hoàng Nam"
                      className="w-full rounded-xl border border-[#2c3547] bg-[#0c0e14] px-4 py-3 text-xs text-white placeholder-[#546077] focus:border-[#82aaff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#82aaff] uppercase mb-1">
                      Số Điện Thoại / Kênh Liên Lạc Riêng *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full rounded-xl border border-[#2c3547] bg-[#0c0e14] px-4 py-3 text-xs text-white placeholder-[#546077] focus:border-[#82aaff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#82aaff] uppercase mb-1">
                      Loại Hình Bất Động Sản
                    </label>
                    <select
                      value={estateType}
                      onChange={(e) => setEstateType(e.target.value)}
                      className="w-full rounded-xl border border-[#2c3547] bg-[#0c0e14] px-4 py-3 text-xs text-white focus:border-[#82aaff] focus:outline-none"
                    >
                      <option value="penthouse">Penthouse / Sky Villa (Thủ Thiêm, Ba Son)</option>
                      <option value="villa">Biệt Thự Đơn Lập (Thảo Điền, Phú Mỹ Hưng)</option>
                      <option value="townhouse">Nhà Phố Kiến Trúc Riêng</option>
                      <option value="other">Tư Gia Cao Cấp Khác</option>
                    </select>
                  </div>

                  <div className="rounded-xl bg-[#0e121a] p-3 text-[11px] text-[#7887a0] space-y-1">
                    <span className="block font-mono text-[10px] text-[#82aaff] uppercase">Cam kết bảo mật:</span>
                    <p>
                      Mọi thông tin về vị trí và giải pháp giấu két đều được ký thỏa thuận bảo mật NDA trước khi thi công.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#82aaff] py-3.5 text-xs font-mono font-bold tracking-wider text-[#0c0d10] hover:bg-[#a1c2ff] transition-all shadow-[0_4px_20px_rgba(130,170,255,0.25)]"
                  >
                    <span>Yêu cầu khảo sát vị trí két giấu kín</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </button>
                </form>
              )}

              {/* Direct Hotline Consultation */}
              <div className="mt-6 pt-5 border-t border-[#262e40] flex items-center justify-between text-xs font-mono text-[#8e99ac]">
                <span>Tư vấn trực tiếp Lead Architect:</span>
                <a href="tel:0368757916" className="text-[#82aaff] font-bold hover:underline">
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
