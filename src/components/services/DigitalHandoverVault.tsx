'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon, PrinterIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface WarrantyCertificate {
  code: string
  clientName: string
  projectTitle: string
  propertyType: string
  location: string
  area: string
  handoverDate: string
  leadArchitect: string
  masterCraftsman: string
  woodSpecies: string
  coatingType: string
  structuralWarrantyYears: number
  termiteWarrantyYears: number
  periodicChecks: {
    period: string
    date: string
    moisturePercent: string
    status: string
    technician: string
  }[]
}

const CERTIFICATES: Record<string, WarrantyCertificate> = {
  'GU-WTY-2025-0814': {
    code: 'GU-WTY-2025-0814',
    clientName: 'Anh Trần Hoàng & Chị Bích Trâm',
    projectTitle: 'Penthouse The Opera Residence',
    propertyType: 'Penthouse Panorama 2 Tầng',
    location: 'Bán Đảo Thủ Thiêm, TP. Thủ Đức, TP.HCM',
    area: '380 m²',
    handoverDate: '14/08/2025',
    leadArchitect: 'KTS. Lê Quang Huy (GuHomes Studio)',
    masterCraftsman: 'Bác Ba Thợ Cả (Xưởng Thạnh Xuân)',
    woodSpecies: 'Gỗ Óc Chó FAS Bắc Mỹ sấy chân không EMC 10.5%',
    coatingType: '3 Lớp dầu hữu cơ Osmo Polyx-Oil 3032 (CHLB Đức)',
    structuralWarrantyYears: 5,
    termiteWarrantyYears: 10,
    periodicChecks: [
      {
        period: 'Bàn giao nghiệm thu',
        date: '14/08/2025',
        moisturePercent: '10.8%',
        status: 'Chuẩn tuyệt đối EMC',
        technician: 'KTV. Nguyễn Tuấn Anh',
      },
      {
        period: 'Đo định kỳ lần 1 (Mùa Mưa)',
        date: '15/11/2025',
        moisturePercent: '11.4%',
        status: 'Ổn định, dưỡng thêm 1 lớp dầu Osmo sáp Carnauba',
        technician: 'KTV. Trần Văn Bình',
      },
      {
        period: 'Đo định kỳ lần 2 (Mùa Khô)',
        date: '15/04/2026',
        moisturePercent: '10.2%',
        status: 'Không co ngót chân chim, bản lề Blum êm tuyệt đối',
        technician: 'KTV. Nguyễn Tuấn Anh',
      },
    ],
  },
  'GU-WTY-2025-0420': {
    code: 'GU-WTY-2025-0420',
    clientName: 'Bác Phạm Quốc Hưng (Cựu Kỹ sư)',
    projectTitle: 'Biệt Thự Song Lập Château',
    propertyType: 'Biệt Thự Đơn Lập Hoa Viên',
    location: 'Khu Đô Thị Phú Mỹ Hưng, Quận 7, TP.HCM',
    area: '420 m²',
    handoverDate: '20/04/2024',
    leadArchitect: 'KTS. Trần Đăng Khoa (GuHomes Studio)',
    masterCraftsman: 'Bác Năm Mộc (Xưởng Thạnh Xuân)',
    woodSpecies: 'Gỗ Teak Miến Điện & Gỗ Sồi Trắng Châu Âu',
    coatingType: 'Dầu lanh mộc tự nhiên & vôi khoáng Calce Ý',
    structuralWarrantyYears: 5,
    termiteWarrantyYears: 10,
    periodicChecks: [
      {
        period: 'Bàn giao nghiệm thu',
        date: '20/04/2024',
        moisturePercent: '11.2%',
        status: 'Đạt chuẩn vi khí hậu Nam Sài Gòn',
        technician: 'KTV. Đỗ Minh Trí',
      },
      {
        period: 'Đo định kỳ 6 tháng',
        date: '22/10/2024',
        moisturePercent: '11.8%',
        status: 'Mộng âm dương kín khít, không ố ẩm',
        technician: 'KTV. Đỗ Minh Trí',
      },
      {
        period: 'Đo định kỳ 12 tháng',
        date: '18/04/2025',
        moisturePercent: '10.9%',
        status: 'Cánh cửa đóng mở nhẹ nhàng, phủ bóng bảo dưỡng',
        technician: 'KTV. Trần Văn Bình',
      },
    ],
  },
  'GU-WTY-2026-0280': {
    code: 'GU-WTY-2026-0280',
    clientName: 'Anh Đặng Minh Quân & Chị Mai Lan',
    projectTitle: 'Nhà Phố Ba Gian · Tấm Rèm Bê Tông',
    propertyType: 'Nhà Phố Kiến Trúc Vi Khí Hậu',
    location: 'Phường An Phú Đông, Quận 12, TP.HCM',
    area: '280 m²',
    handoverDate: '15/01/2026',
    leadArchitect: 'KTS. Lê Quang Huy (GuHomes Studio)',
    masterCraftsman: 'Bác Ba Thợ Cả (Xưởng Thạnh Xuân)',
    woodSpecies: 'Gỗ Sồi Trắng Châu Âu xử lý xà phòng tự nhiên',
    coatingType: 'Sơn vôi Calce khoáng Ý & Dầu sáp thực vật 0% VOC',
    structuralWarrantyYears: 5,
    termiteWarrantyYears: 10,
    periodicChecks: [
      {
        period: 'Bàn giao nghiệm thu',
        date: '15/01/2026',
        moisturePercent: '10.4%',
        status: 'Nghiệm thu hoàn tất 100%, không có mùi hóa chất',
        technician: 'KTV. Nguyễn Tuấn Anh',
      },
    ],
  },
}

export function DigitalHandoverVault({ className }: { className?: string }) {
  const [searchCode, setSearchCode] = useState<string>('GU-WTY-2025-0814')
  const [activeCertificate, setActiveCertificate] = useState<WarrantyCertificate | null>(
    CERTIFICATES['GU-WTY-2025-0814'] ?? null
  )
  const [hasSearched, setHasSearched] = useState<boolean>(true)

  const handleSearch = (codeToSearch?: string) => {
    const code = (codeToSearch || searchCode).trim().toUpperCase()
    setHasSearched(true)
    const found = CERTIFICATES[code]
    if (found) {
      setActiveCertificate(found)
      setSearchCode(code)
    } else {
      setActiveCertificate(null)
    }
  }

  const handlePrintCertificate = () => {
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
              <span>Hậu Mãi &amp; Bảo Chứng Bền Vững</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ink mt-3 tracking-tight">
              Cổng Tra Cứu Bảo Hành Gỗ Mộc Số Hóa
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-[64ch] mt-3 font-light leading-relaxed">
              Mỗi công trình của GuHomes không kết thúc ở ngày bàn giao chìa khóa. Chúng tôi gắn mã số bảo chứng độc bản cho từng ngôi nhà, đồng hành kiểm tra độ ẩm thớ gỗ định kỳ 6 tháng/lần miễn phí trọn đời.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line bg-surface hover:border-accent text-xs font-mono text-ink tracking-wider transition-all shadow-sm"
            >
              <PrinterIcon className="text-base text-accent" />
              <span>In Chứng Thư A4</span>
            </button>
          </div>
        </div>

        {/* Code Input & Quick Demo Codes */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-line bg-surface">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <span className="text-xs font-mono text-muted uppercase shrink-0">MÃ SỐ THẺ:</span>
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="VD: GU-WTY-2025-0814"
              className="w-full px-4 py-2.5 rounded-xl border border-line bg-canvas text-xs font-mono font-medium text-ink focus:outline-none focus:border-accent uppercase tracking-wider"
            />
            <button
              type="button"
              onClick={() => handleSearch()}
              className="px-5 py-2.5 rounded-xl bg-accent text-canvas text-xs font-mono font-semibold hover:bg-accent/90 transition-all shrink-0"
            >
              Tra Cứu
            </button>
          </div>

          {/* Quick Demo Code Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted">
            <span className="text-[11px] text-muted/70">Mã mẫu thực địa:</span>
            {['GU-WTY-2025-0814', 'GU-WTY-2025-0420', 'GU-WTY-2026-0280'].map((demoCode) => (
              <button
                key={demoCode}
                type="button"
                onClick={() => handleSearch(demoCode)}
                className={cn(
                  'px-3 py-1 rounded-full border text-[11px] transition-all',
                  searchCode === demoCode
                    ? 'border-accent bg-accent/15 text-accent font-semibold'
                    : 'border-line bg-canvas hover:border-accent'
                )}
              >
                {demoCode}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Display Card */}
        <div className="mt-8">
          {activeCertificate ? (
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-12 shadow-2xl relative overflow-hidden">
              {/* Certificate Watermark Background */}
              <div className="absolute right-6 -bottom-10 opacity-5 pointer-events-none text-[180px] font-serif select-none">
                GU
              </div>

              {/* Certificate Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-line/70 gap-4">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                    CHỨNG THƯ BẢO CHỨNG CÔNG TRÌNH GUHOMES
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl text-ink font-light mt-1">
                    {activeCertificate.projectTitle}
                  </h3>
                  <p className="text-xs font-mono text-muted mt-1">
                    {activeCertificate.location} · {activeCertificate.area}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ĐANG TRONG THỜI HẠN BẢO HÀNH</span>
                  </div>
                  <span className="text-xs font-mono text-muted mt-2">
                    Mã số định danh: <strong className="text-ink">{activeCertificate.code}</strong>
                  </span>
                </div>
              </div>

              {/* Key Warranty Specs Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-line bg-canvas">
                  <span className="font-mono text-muted block text-[10px] uppercase">Gia chủ sở hữu:</span>
                  <span className="font-medium text-ink text-sm block mt-1">{activeCertificate.clientName}</span>
                  <span className="font-mono text-muted block text-[10px] mt-2">Ngày bàn giao: {activeCertificate.handoverDate}</span>
                </div>

                <div className="p-4 rounded-2xl border border-line bg-canvas">
                  <span className="font-mono text-muted block text-[10px] uppercase">Thời hạn kết cấu mộc:</span>
                  <span className="font-medium text-accent text-sm block mt-1">{activeCertificate.structuralWarrantyYears} Năm Toàn Phần</span>
                  <span className="font-mono text-muted block text-[10px] mt-2">Chống mối mọt: {activeCertificate.termiteWarrantyYears} Năm</span>
                </div>

                <div className="p-4 rounded-2xl border border-line bg-canvas">
                  <span className="font-mono text-muted block text-[10px] uppercase">Vật liệu chính:</span>
                  <span className="font-medium text-ink text-xs block mt-1">{activeCertificate.woodSpecies}</span>
                  <span className="font-mono text-muted block text-[10px] mt-2 truncate">{activeCertificate.coatingType}</span>
                </div>

                <div className="p-4 rounded-2xl border border-line bg-canvas">
                  <span className="font-mono text-muted block text-[10px] uppercase">Nhân sự chủ trì:</span>
                  <span className="font-medium text-ink text-xs block mt-1">{activeCertificate.leadArchitect}</span>
                  <span className="font-mono text-muted block text-[10px] mt-2">{activeCertificate.masterCraftsman}</span>
                </div>
              </div>

              {/* Periodic EMC Moisture Inspection Log */}
              <div className="mt-8 pt-8 border-t border-line/70">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider">
                    Nhật Ký Đo Độ Ẩm Gỗ (EMC) Định Kỳ 6 Tháng/Lần Miễn Phí
                  </span>
                  <span className="text-[11px] font-mono text-muted">Chuẩn an toàn: 10% – 12%</span>
                </div>

                <div className="space-y-3">
                  {activeCertificate.periodicChecks.map((check, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-line bg-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/15 text-accent font-mono text-[11px] flex items-center justify-center shrink-0 font-semibold">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className="font-medium text-ink block">{check.period}</span>
                          <span className="text-[11px] text-muted font-light">{check.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 sm:self-center self-end text-[11px] font-mono">
                        <span className="px-2.5 py-1 rounded-md bg-surface border border-line text-emerald-700 font-semibold">
                          💧 Độ ẩm: {check.moisturePercent}
                        </span>
                        <span className="text-muted">{check.date}</span>
                        <span className="text-muted/70 hidden md:inline">{check.technician}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signatures & Dossier Download Action */}
              <div className="mt-10 pt-8 border-t border-line/70 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6 text-xs text-muted font-mono">
                  <div>
                    <span className="block text-[10px] text-muted/60">KTS CHỦ TRÌ:</span>
                    <span className="text-ink font-serif italic text-sm">Lê Quang Huy</span>
                  </div>
                  <div className="w-px h-8 bg-line" />
                  <div>
                    <span className="block text-[10px] text-muted/60">THỢ CẢ XƯỞNG THẠNH XUÂN:</span>
                    <span className="text-ink font-serif italic text-sm">Nguyễn Văn Ba</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handlePrintCertificate}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono font-semibold tracking-wider hover:bg-accent/90 transition-all shadow-md"
                  >
                    <PrinterIcon className="text-base" />
                    <span>Tải Hồ Sơ Hoàn Công &amp; Bản Vẽ MEP (A4)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-line bg-surface p-12 text-center">
              <span className="text-3xl block mb-2">🔍</span>
              <h3 className="font-serif text-xl text-ink font-light">Không tìm thấy mã số bảo hành này</h3>
              <p className="text-xs text-muted mt-2 max-w-[46ch] mx-auto leading-relaxed">
                Vui lòng kiểm tra lại mã số in trên Thẻ Gỗ Mộc trao tay hoặc chọn một trong các mã mẫu đại diện phía trên.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
