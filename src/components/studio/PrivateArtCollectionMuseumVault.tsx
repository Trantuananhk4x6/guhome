'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface MasterpieceArt {
  id: string
  titleVi: string
  artistVi: string
  mediumVi: string
  yearVi: string
  framingTypeVi: string
  climateStandardVi: string
  descriptionVi: string
}

const MASTERPIECES: MasterpieceArt[] = [
  {
    id: 'son-mai-thanh-xuan',
    titleVi: 'Huyền Thoại Phù Sa Sông Sài Gòn',
    artistVi: 'Nghệ Nhân Sơn Mài Bát Tràng x GuHomes Thạnh Xuân',
    mediumVi: 'Sơn mài 18 lớp cẩn vỏ trứng, thếp vàng quỳ 24K và bột bạc',
    yearVi: 'Năm 2024 · Độc Bản',
    framingTypeVi: 'Khung gỗ Óc Chó FAS phay âm · Kính bảo tàng quang học Artglass AR 99',
    climateStandardVi: '50% RH · 21.0°C · 0 Lux UV (Cắt tuyệt đối tia hồng ngoại)',
    descriptionVi:
      'Tác phẩm tái hiện dòng chảy lịch sử phương Nam. Mặt kính quang học chống phản xạ với độ phản chiếu dưới 0.5% giúp người xem chiêm ngưỡng trực diện từng vảy vàng 24K chìm sâu dưới lớp then mài nước mà không bị lóa bởi ánh sáng đèn phòng.',
  },
  {
    id: 'son-dau-co-dien',
    titleVi: 'Tĩnh Vật Hoa Mộc Lan & Trà Thất',
    artistVi: 'Bộ Sưu Tập Tư Gia Khách Hàng Thủ Thiêm',
    mediumVi: 'Sơn dầu trên vải toan lanh Bỉ cổ điển',
    yearVi: 'Năm 1932 · Sưu Tập Đấu Giá Quốc Tế',
    framingTypeVi: 'Khung dát vàng cổ điển chế tác thủ công nước Pháp',
    climateStandardVi: '48% RH · 20.5°C · Đèn rọi Framing Projector chuẩn 2700K',
    descriptionVi:
      'Màu sơn dầu gần 100 năm tuổi đòi hỏi sự chăm sóc ngặt nghèo. Đèn chiếu định hình Framing Projector cắt luồng sáng chính xác theo viền tranh, biến tác phẩm thành nguồn phát sáng tự thân lung linh trong màn đêm.',
  },
  {
    id: 'thuy-mac-phuong-nam',
    titleVi: 'Rặng Dừa Nước & Cánh Buồm Bến Nghé',
    artistVi: 'Họa Sĩ Danh Tiếng Đông Dương',
    mediumVi: 'Mực tàu & phẩm khoáng trên lụa tơ tằm cổ',
    yearVi: 'Năm 1954 · Bản gốc duy nhất',
    framingTypeVi: 'Khung hộp nổi Shadowbox đệm lụa tơ sen Đồng Tháp',
    climateStandardVi: '49% RH · 21.5°C · Áp suất dương kháng bụi PM1.0',
    descriptionVi:
      'Chất liệu lụa tơ tằm cổ cực kỳ nhạy cảm với độ ẩm. Buồng kính quang học hút chân không nhẹ giữ cho sợi lụa luôn phẳng phiu, không nấm mốc và bảo toàn sắc nâu mực tàu nguyên bản qua nhiều thập kỷ.',
  },
]

export function PrivateArtCollectionMuseumVault({ className }: { className?: string } = {}) {
  const [activeArtId, setActiveArtId] = useState<string>('son-mai-thanh-xuan')
  const [glassAntiReflective, setGlassAntiReflective] = useState<boolean>(true)
  const [framingBeamFitted, setFramingBeamFitted] = useState<boolean>(true)

  const activeArt = MASTERPIECES.find((a) => a.id === activeArtId) ?? MASTERPIECES[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0a0d] py-24 text-[#e4e1db] border-t border-[#1e1c24]', className)}>
      {/* Museum Spot Dim Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3e3422] bg-[#18140c] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-ping" />
            Không Gian Bảo Tàng Nghệ Thuật Tư Gia · Private Museum Art Vault
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#faf7f2]">
            Phòng Tranh Bảo Tàng Kính Quang Học Chống Phản Xạ
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a398]">
            Những kiệt tác hội họa gia truyền cần không gian nâng niu chuẩn bảo tàng Hermitage: <span className="text-[#d4af37] font-medium">Kính quang học Artglass chống phản xạ độ trong suốt 99.5%</span>, hệ thống ray Inox 316 chịu tải 250kg âm trần, đèn chiếu Framing Projector cắt tia sáng vừa khít khuôn tranh và hệ thống điều hòa vi khí hậu giữ ẩm 50% RH ổn định tuyệt đối.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Masterpiece Collection Viewer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#2b2733] bg-[#121117]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#221f29] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                    Bộ Sưu Tập Mỹ Thuật Di Sản Gia Tộc
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#faf7f2]">
                    Kiệt Tác Sơn Mài & Lụa Cổ Điển
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#201c10] px-3.5 py-1 text-xs font-mono text-[#d4af37]">
                  <span>Ray Inox 316: Tải 250kg âm trần</span>
                </div>
              </div>

              {/* Artwork Selectors */}
              <div className="mt-6 flex flex-col gap-3">
                {MASTERPIECES.map((art) => {
                  const isSelected = art.id === activeArtId
                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setActiveArtId(art.id)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#d4af37] bg-[#221d12] text-white shadow-[0_0_15px_rgba(212,175,55,0.18)]'
                          : 'border-[#221f29] bg-[#0c0c10] text-[#938e9c] hover:border-[#383344] hover:text-[#e4e1db]'
                      )}
                    >
                      <div>
                        <span className="block text-sm font-medium font-serif text-[#faf7f2]">
                          {art.titleVi}
                        </span>
                        <span className="block text-xs text-[#9d978b] italic mt-0.5">
                          {art.artistVi} · {art.yearVi}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#d4af37] hidden sm:inline">
                        Chiêm ngưỡng →
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Art Detail Card */}
              <div className="mt-6 rounded-xl border border-[#302a1c] bg-[#181510] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#d4af37] uppercase">{activeArt.yearVi}</span>
                  <span className="rounded-full bg-[#241f14] px-2.5 py-0.5 text-[#e5c66b]">
                    {activeArt.climateStandardVi.split(' · ')[0]}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#faf7f2]">
                  {activeArt.titleVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#b5b0a4]">
                  {activeArt.descriptionVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#292418] text-xs">
                  <div className="rounded-lg bg-[#0e0d11] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#736e65]">Chất Liệu & Khung</span>
                    <span className="mt-1 block font-medium text-[#f0ede6]">{activeArt.framingTypeVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0e0d11] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#736e65]">Chuẩn Bảo Tồn Vi Khí Hậu</span>
                    <span className="mt-1 block font-medium text-[#d4af37]">{activeArt.climateStandardVi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Optical Glass Anti-Reflection & Framing Projector Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#2b2733] bg-[#121117]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#221f29] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                  Công Nghệ Chiếu Sáng & Kính Quang Học
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#faf7f2]">
                  Chuẩn Bảo Tàng Louvre & Hermitage
                </h3>
              </div>

              {/* Anti-Reflective Glass Toggle */}
              <div className="mt-5 rounded-xl border border-[#2b2733] bg-[#16141c] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#d4af37] uppercase block">
                      Kính Bảo Tàng Quang Học Artglass AR 99
                    </span>
                    <span className="text-xs text-[#a09b90]">Phủ lớp nano vô hình triệt tiêu bóng phản chiếu</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGlassAntiReflective(!glassAntiReflective)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                      glassAntiReflective
                        ? 'bg-[#d4af37] text-[#0a0a0d] font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                        : 'border border-[#3e3422] bg-[#1a1710] text-[#736e65]'
                    )}
                  >
                    {glassAntiReflective ? 'Kính AR: BẬT (&lt;0.5%)' : 'Kính Thường (8%)'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#221f29] text-[11px] font-mono">
                  <div>
                    <span className="text-[#736e65] block text-[10px]">ĐỘ TRONG SUỐT:</span>
                    <span className="text-[#d4af37]">
                      {glassAntiReflective ? '99.5% (Như không có kính)' : '91.0% (Bị cản sáng)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#736e65] block text-[10px]">ĐỘ LÓA BÓNG ĐÈN:</span>
                    <span className="text-[#faf7f2]">
                      {glassAntiReflective ? '&lt; 0.5% (Không phản quang)' : '8.0% (Lóa gương)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Framing Projector Beam Shaper */}
              <div className="mt-4 rounded-xl border border-[#2b2733] bg-[#16141c] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#d4af37] uppercase block">
                      Đèn Framing Projector Cắt Tia Chuẩn Xác
                    </span>
                    <span className="text-xs text-[#a09b90]">4 lá chắn cắt luồng sáng đúng theo chu vi khung</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFramingBeamFitted(!framingBeamFitted)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                      framingBeamFitted
                        ? 'bg-[#d4af37] text-[#0a0a0d] font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                        : 'border border-[#3e3422] bg-[#1a1710] text-[#736e65]'
                    )}
                  >
                    {framingBeamFitted ? 'Tia Cắt Khít Tranh' : 'Đèn Rọi Lan Ra Tường'}
                  </button>
                </div>

                <p className="text-xs text-[#8c867b] leading-relaxed italic">
                  Đèn ERCO Framing Projector CRI 98 nhiệt độ màu 2700K tạo hiệu ứng bức tranh tự phát sáng huyền ảo trong bóng tối mà không hề làm sáng tường nền.
                </p>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#221f29]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#0a0a0d] hover:bg-[#ebc75b] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                >
                  <span>Khảo sát thiết kế phòng trưng bày tranh tư gia</span>
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
