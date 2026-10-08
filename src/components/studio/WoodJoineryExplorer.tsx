'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type JoineryType = 'dovetail' | 'mortise-tenon' | 'mitered-ebony' | 'butterfly'

interface JoineryData {
  id: JoineryType
  name: string
  nameEn: string
  subtitle: string
  mechanism: string
  application: string
  tensileLoad: string
  tolerance: string
  woodSpecies: string
  craftsmanQuote: string
  svgGraphic: 'dovetail' | 'mortise' | 'mitered' | 'butterfly'
  highlights: string[]
}

const JOINERY_LIST: JoineryData[] = [
  {
    id: 'dovetail',
    name: 'Mộng Mang Cá',
    nameEn: 'Traditional Dovetail Joint',
    subtitle: 'Khóa lực đa chiều hình đuôi én — Bền bỉ hàng thế kỷ',
    mechanism:
      'Các mấu gỗ hình nêm góc 1:6 khóa chặt các cạnh ngăn kéo. Khi kéo mạnh về phía trước, chính góc vát của mang cá sẽ càng ghì chặt hai vách gỗ vào nhau mà không cần đến một chiếc đinh kim loại nào.',
    application: 'Toàn bộ hệ hộc kéo tủ quần áo âm tường, bàn phấn trang điểm gỗ óc chó FAS và tap đầu giường.',
    tensileLoad: '4.8 kN (Chịu kéo dọc thớ)',
    tolerance: '≤ 0.15 mm (Máy phay CNC 5 trục + gọt tay thép gió)',
    woodSpecies: 'Gỗ Óc Chó Bắc Mỹ & Sồi Trắng Châu Âu',
    craftsmanQuote:
      'Gỗ là sinh vật thở theo mùa nắng mưa Sài Gòn. Đinh sắt sau 10 năm sẽ rỉ và làm nứt gỗ, còn mộng mang cá khi gỗ thở ra lại càng khít khao tự nhiên.',
    svgGraphic: 'dovetail',
    highlights: [
      'Triệt tiêu 100% ốc vít kim loại lộ mặt ngoài',
      'Chống tuột đáy hộc kéo khi chứa vật nặng',
      'Được gia công nhẵn mịn 8 cấp hạt nhám Festool',
    ],
  },
  {
    id: 'mortise-tenon',
    name: 'Mộng Ngậm Âm Dương',
    nameEn: 'Through Mortise & Tenon',
    subtitle: 'Khung xương chịu tải dầm sàn — Trụ cột kết cấu bàn & giường',
    mechanism:
      'Đầu mộng dương (tenon) xuyên thấu qua lỗ mộng âm (mortise) của chân trụ, được chốt cố định bằng nêm gỗ tự nhiên vát chéo. Ứng suất trọng lực được dàn đều khắp bề mặt tiếp xúc gỗ.',
    application: 'Chân bàn ăn nguyên tấm Live Edge 8–10 chỗ, khung chịu lực giường ngủ Master suite và ghế bành thư giãn.',
    tensileLoad: '8.2 kN (Chịu uốn dầm ngang)',
    tolerance: '≤ 0.20 mm (Khớp mộng khít không khe hở)',
    woodSpecies: 'Gỗ Teak Miến Điện & Gỗ Sồi đỏ sấy chân không',
    craftsmanQuote:
      'Một chiếc bàn ăn Quiet Luxury có thể đặt cả một bình gốm nặng hay bốn người ngồi lên mép bàn mà không một tiếng cọt kẹt, đó là nhờ mộng âm dương giữ vững tâm dầm.',
    svgGraphic: 'mortise',
    highlights: [
      'Phân tán lực thẳng đứng và xoắn vặn đồng thời',
      'Nêm gỗ ép chặt cơ học, tăng độ cứng theo thời gian',
      'Kết cấu kinh điển của đồ mộc hoàng gia phương Đông và Đan Mạch',
    ],
  },
  {
    id: 'mitered-ebony',
    name: 'Mộng Vát Góc Chốt Mun',
    nameEn: 'Mitered Joint with Ebony Spline',
    subtitle: 'Nét cắt 45° tuyệt đối — Điểm nhấn gỗ mun quý hiếm',
    mechanism:
      'Hai thanh gỗ vát góc chuẩn xác 45°, phay rãnh âm ở giữa để chèn một miếng chốt khóa (spline) làm từ gỗ mun sẫm màu. Vừa gia cường gấp 3 lần lực chịu góc, vừa tạo điểm nhấn xúc giác tinh xảo.',
    application: 'Khung cánh tủ áo cánh kính khung gỗ, khung gương treo tường phòng tắm Master và phào chỉ cửa đi.',
    tensileLoad: '3.5 kN (Chống xé góc 45°)',
    tolerance: '≤ 0.10 mm (Không lộ đường cưa, sắc như lưỡi dao)',
    woodSpecies: 'Gỗ Óc Chó FAS + Chốt Gỗ Mun Sừng',
    craftsmanQuote:
      'Góc 45 độ là phép thử nghiệt ngã nhất của người thợ mộc. Chỉ cần lệch nửa sợi tóc, khi thời tiết Sài Gòn sang mùa mưa ẩm, góc cắt sẽ há miệng ngay.',
    svgGraphic: 'mitered',
    highlights: [
      'Góc tiếp giáp liền mạch như một khối gỗ nguyên',
      'Chốt gỗ mun có vân tương phản sang trọng kín đáo',
      'Chống biến dạng khi treo cánh kính nặng trên 25kg',
    ],
  },
  {
    id: 'butterfly',
    name: 'Mộng Cánh Bướm Tự Nhiên',
    nameEn: 'Butterfly / Dutchman Key',
    subtitle: 'Tôn vinh vết nứt tự nhiên — Nghệ thuật Wabi-Sabi độc bản',
    mechanism:
      'Chốt gỗ hình cánh bướm (hoặc nơ) được chạm khảm thủ công xuyên qua hai mép của một vết nứt tự nhiên trên thân gỗ cổ thụ. Cơ chế hình học ngăn vết nứt lan rộng mà không cần dùng keo dán ép phẳng giả tạo.',
    application: 'Mặt bàn trà phòng khách Penthouse, mặt bàn đảo bếp mộc, băng ghế nguyên khúc gỗ rừng trồng kiểm định.',
    tensileLoad: 'Khống chế co giãn thớ nứt 100%',
    tolerance: 'Chạm khảm thủ công bo sát từng milimet thớ nứt',
    woodSpecies: 'Chốt Gỗ Mun hoặc Gỗ Trắc đen tuyền',
    craftsmanQuote:
      'Thay vì cố giấu đi vết nứt của thân cây trăm năm, chúng tôi dùng cánh bướm gỗ mun để khóa nó lại. Đó không còn là lỗi, mà là câu chuyện của thời gian mà gia chủ muốn gìn giữ.',
    svgGraphic: 'butterfly',
    highlights: [
      'Giữ lại trọn vẹn hình hài mộc mạc của phiến gỗ Live Edge',
      'Chạm khảm phẳng lì tuyệt đối với bề mặt bàn',
      'Mỗi sản phẩm là một tác phẩm điêu khắc độc nhất vô nhị',
    ],
  },
]

const DEFAULT_JOINERY = JOINERY_LIST[0] as JoineryData

export function WoodJoineryExplorer({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState<JoineryType>('dovetail')

  const current: JoineryData = JOINERY_LIST.find((j) => j.id === selectedId) ?? DEFAULT_JOINERY

  return (
    <section className={cn('relative bg-canvas py-16 sm:py-24 border-y border-line overflow-hidden', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Xưởng Mộc Thạnh Xuân 1.200m²</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ink mt-3 tracking-tight">
              Khám Phá Kỹ Thuật Mộng Gỗ Thửa Riêng
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-[62ch] mt-3 font-light leading-relaxed">
              Tại sao đồ nội thất gỗ của GuHomes không bao giờ kêu cọt kẹt hay nứt toác qua mùa mưa ẩm Sài Gòn? Câu trả lời nằm ở 4 hệ mộng mộc truyền thống không dùng đinh sắt, được chế tác tỉ mỉ bởi các nghệ nhân 20 năm tuổi nghề.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line bg-surface hover:border-accent text-xs font-mono text-ink tracking-wider transition-all shadow-sm"
            >
              <span>Đăng ký tham quan xưởng mộc</span>
              <ArrowUpRightIcon className="text-sm text-accent" />
            </a>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {JOINERY_LIST.map((item, index) => {
            const isSelected = item.id === selectedId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  'p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden',
                  isSelected
                    ? 'border-accent bg-surface shadow-lg ring-1 ring-accent'
                    : 'border-line bg-surface/50 hover:bg-surface hover:border-line-strong'
                )}
              >
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                  <span className={isSelected ? 'text-accent font-semibold' : ''}>0{index + 1}</span>
                  <span className="text-[10px] uppercase tracking-wider">{item.woodSpecies.split('&')[0]}</span>
                </div>
                <h3 className={cn('font-serif text-base sm:text-lg font-medium transition-colors', isSelected ? 'text-accent' : 'text-ink')}>
                  {item.name}
                </h3>
                <p className="text-xs text-muted font-light mt-1 line-clamp-1">{item.nameEn}</p>
              </button>
            )
          })}
        </div>

        {/* Detailed Inspection Showcase */}
        <div className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Schematic Blueprint Vector Visualization (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[420px] rounded-2xl border border-line bg-[#1E1B18] text-[#F3F1EC] p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Blueprint Grid Lines Pattern */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Blueprint Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 text-[11px] font-mono text-white/60">
                  <span>GUHOMES WOODSHOP · SPEC #0{JOINERY_LIST.findIndex((j) => j.id === current.id) + 1}</span>
                  <span className="text-accent uppercase">{current.id}</span>
                </div>

                {/* Vector Diagram Graphic representation */}
                <div className="relative z-10 flex-1 flex items-center justify-center py-6">
                  {current.svgGraphic === 'dovetail' && (
                    <svg viewBox="0 0 200 200" className="w-52 h-52 text-accent" fill="none" stroke="currentColor">
                      <polygon points="40,30 90,30 110,90 70,90" strokeWidth="2.5" fill="rgba(197, 160, 89, 0.2)" />
                      <polygon points="110,30 160,30 140,90 100,90" strokeWidth="2.5" fill="rgba(197, 160, 89, 0.1)" />
                      <polygon points="70,90 110,90 90,170 40,170" strokeWidth="2.5" fill="rgba(197, 160, 89, 0.25)" />
                      <polygon points="100,90 140,90 160,170 110,170" strokeWidth="2.5" fill="rgba(197, 160, 89, 0.15)" />
                      {/* Locking vectors */}
                      <path d="M 60,60 L 140,60" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M 60,130 L 140,130" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="100" cy="90" r="3" fill="#FFF" />
                    </svg>
                  )}

                  {current.svgGraphic === 'mortise' && (
                    <svg viewBox="0 0 200 200" className="w-52 h-52 text-accent" fill="none" stroke="currentColor">
                      {/* Vertical post */}
                      <rect x="75" y="20" width="50" height="160" strokeWidth="2.5" fill="rgba(197, 160, 89, 0.15)" rx="4" />
                      {/* Mortise hole */}
                      <rect x="85" y="80" width="30" height="40" strokeWidth="2" strokeDasharray="4 2" stroke="#FFF" />
                      {/* Horizontal Tenon beam */}
                      <rect x="25" y="85" width="150" height="30" strokeWidth="2.5" fill="rgba(197, 160, 89, 0.3)" rx="2" />
                      {/* Locking Wedge */}
                      <polygon points="145,70 155,70 145,130 140,130" strokeWidth="2" fill="#E5C17B" />
                    </svg>
                  )}

                  {current.svgGraphic === 'mitered' && (
                    <svg viewBox="0 0 200 200" className="w-52 h-52 text-accent" fill="none" stroke="currentColor">
                      {/* 45 degree corner pieces */}
                      <polygon points="30,30 170,30 170,80 80,80 80,170 30,170" strokeWidth="2.5" fill="rgba(197, 160, 89, 0.15)" />
                      <line x1="30" y1="30" x2="80" y2="80" stroke="#FFF" strokeWidth="2.5" />
                      {/* Ebony spline insert */}
                      <polygon points="40,25 60,15 75,70 55,80" strokeWidth="1.5" fill="#111" stroke="#E5C17B" />
                      <text x="90" y="65" fill="#FFF" fontSize="10" fontFamily="monospace">GÓC 45° ± 0.1°</text>
                    </svg>
                  )}

                  {current.svgGraphic === 'butterfly' && (
                    <svg viewBox="0 0 200 200" className="w-52 h-52 text-accent" fill="none" stroke="currentColor">
                      {/* Organic wood split */}
                      <path d="M 100,20 Q 90,80 110,120 T 95,180" stroke="#555" strokeWidth="4" />
                      {/* Butterfly Key */}
                      <polygon points="60,85 100,95 60,115 140,115 100,95 140,85" strokeWidth="2.5" fill="#1A1816" stroke="#E5C17B" />
                      {/* Stress arrows */}
                      <path d="M 50,100 L 70,100" stroke="#FFF" strokeWidth="1.5" markerEnd="url(#arrow)" />
                      <path d="M 150,100 L 130,100" stroke="#FFF" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    </svg>
                  )}
                </div>

                {/* Blueprint Footer */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-white/50">
                  <span>DUNG SAI: {current.tolerance.split('(')[0]}</span>
                  <span>TẢI TRỌNG: {current.tensileLoad.split('(')[0]}</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Information & Craftsman Quote (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  {current.nameEn}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-ink font-light mt-1">
                  {current.name}
                </h3>
                <p className="text-sm sm:text-base text-accent font-medium mt-1">
                  {current.subtitle}
                </p>
              </div>

              {/* Mechanism Explanation */}
              <div className="rounded-2xl border border-line bg-canvas p-6">
                <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">
                  Nguyên lý cơ học &amp; Chịu lực:
                </span>
                <p className="text-sm font-light text-ink/90 leading-relaxed">
                  {current.mechanism}
                </p>

                {/* Bullet Highlights */}
                <ul className="mt-4 pt-4 border-t border-line/60 space-y-2">
                  {current.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-ink/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engineering Specs Table */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl border border-line bg-canvas">
                  <span className="text-muted block text-[10px] uppercase">Khả năng chịu tải:</span>
                  <span className="text-ink font-semibold mt-1 block">{current.tensileLoad}</span>
                </div>
                <div className="p-3.5 rounded-xl border border-line bg-canvas">
                  <span className="text-muted block text-[10px] uppercase">Dung sai gia công:</span>
                  <span className="text-ink font-semibold mt-1 block">{current.tolerance}</span>
                </div>
                <div className="p-3.5 rounded-xl border border-line bg-canvas">
                  <span className="text-muted block text-[10px] uppercase">Loại gỗ tuyển chọn:</span>
                  <span className="text-ink font-semibold mt-1 block truncate">{current.woodSpecies}</span>
                </div>
              </div>

              {/* Master Craftsman Insight Quote */}
              <div className="border-l-2 border-accent pl-5 py-1">
                <p className="font-serif italic text-sm text-ink/80 leading-relaxed">
                  &ldquo;{current.craftsmanQuote}&rdquo;
                </p>
                <span className="text-xs font-mono text-muted mt-2 block">
                  — Bác Ba Thợ Cả · 22 năm mộc truyền thống Xưởng Thạnh Xuân
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
