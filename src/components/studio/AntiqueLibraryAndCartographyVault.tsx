'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface AntiqueManuscript {
  id: string
  titleVi: string
  categoryVi: string
  yearVi: string
  materialVi: string
  curationNotesVi: string
  preservationSpecsVi: string
}

const MANUSCRIPTS: AntiqueManuscript[] = [
  {
    id: 'indochina-river-map',
    titleVi: 'Hải Trình Sông Sài Gòn & Lưu Vực Đông Dương',
    categoryVi: 'Bản Đồ Cổ Da Dê (Cartography Archive)',
    yearVi: 'Năm 1888 · Bản in thạch bản thủ công',
    materialVi: 'Giấy da dê Vellum & Mực son chu sa khoáng tự nhiên',
    curationNotesVi:
      'Tấm bản đồ vẽ tay chi tiết dòng uốn lượn của sông Sài Gòn qua các bến thuyền cổ Bến Nghé, ghi nhận hướng gió mùa Tây Nam và lưu lượng phù sa cổ xưa.',
    preservationSpecsVi: '48% RH · 20.5°C · 0% UV · Chiếu sáng sợi quang Fiber Optic 15 Lux',
  },
  {
    id: 'dai-nam-thuc-luc',
    titleVi: 'Mộc Bản Kiến Trúc Cung Đình & Nhà Rường Cổ',
    categoryVi: 'Bản Thảo Mộc Bản (Imperial Architecture Codex)',
    yearVi: 'Năm 1902 · Bản khắc gỗ thị',
    materialVi: 'Giấy dó lụa thủ công Bắc Ninh dập mực tàu ngâm bồ hóng thông',
    curationNotesVi:
      'Ghi chép quy cách mộng chốt xà gồ, tỷ lệ vì kèo nhà rường và nguyên tắc thông phong nhiệt đới cổ truyền Việt Nam, nguồn cảm hứng cốt lõi cho xưởng mộc GuHomes.',
    preservationSpecsVi: '46% RH · 21.0°C · Khí trơ Nitơ vi điều hòa ngăn oxy hóa giấy',
  },
  {
    id: 'saigon-flora-atlas',
    titleVi: 'Hệ Thực Vật & Gỗ Quý Bản Địa Miền Nam',
    categoryVi: 'Ấn Bản Thảo Mộc Thực Vật Học (Botanical Monograph)',
    yearVi: 'Năm 1924 · Bìa da thuộc thảo mộc dập nhũ vàng',
    materialVi: 'Giấy bông vải 100% Cotton Rag không chứa acid (Acid-Free)',
    curationNotesVi:
      'Tranh minh họa khắc màu nước về cây Sao Đen, Dầu Rái và Gõ Đỏ - những loài cây làm nên bóng mát và hồn cốt kiến trúc nhiệt đới phương Nam.',
    preservationSpecsVi: '50% RH · 21.5°C · Áp suất phòng dương +15 Pa ngăn 100% bụi mịn PM1.0',
  },
]

export function AntiqueLibraryAndCartographyVault({ className }: { className?: string } = {}) {
  const [activeManuscriptId, setActiveManuscriptId] = useState<string>('indochina-river-map')
  const [opticalLightingActive, setOpticalLightingActive] = useState<boolean>(true)
  const [positivePressureActive, setPositivePressureActive] = useState<boolean>(true)
  const [targetHumidity, setTargetHumidity] = useState<number>(48)

  const activeDoc = MANUSCRIPTS.find((m) => m.id === activeManuscriptId) ?? MANUSCRIPTS[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#0d0c0b] py-24 text-[#e6ded5] border-t border-[#251e17]', className)}>
      {/* Subtle Warm Sepia Parchment Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.05),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#483723] bg-[#1a140d] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-ping" />
            Bảo Tồn Tri Thức Gia Tộc · Antique Cartography & Rare Books Vault
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf6ee]">
            Thư Viện Sách Cổ & Bản Đồ Quý Kiểm Soát Vi Khí Hậu
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b5a798]">
            Độ ẩm nhiệt đới Sài Gòn thường xuyên vượt 80% là kẻ thù số một làm mục nát giấy da và phai mờ mực in cổ. GuHomes kiến tạo phòng thư viện bảo mật áp suất dương, duy trì vi khí hậu ổn định <span className="text-[#d4af37] font-medium">48% RH và 21°C</span>, sử dụng giá sách gỗ óc chó FAS kết cấu mộng âm dương không đinh sắt và kính Low-E cản 99.9% tia tử ngoại.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Rare Manuscript Catalogue & Inspection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#3a2d1f] bg-[#14100c]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2217] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                    Ấn Bản Quý & Bản Đồ Đông Dương Cổ
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf6ee]">
                    Bảo Tàng Tri Thức Tư Gia Độc Bản
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#241a10] px-3.5 py-1 text-xs font-mono text-[#d4af37]">
                  <span>Áp suất phòng: +15 Pa dương</span>
                </div>
              </div>

              {/* Manuscript Selector */}
              <div className="mt-6 flex flex-col gap-3">
                {MANUSCRIPTS.map((doc) => {
                  const isSelected = doc.id === activeManuscriptId
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setActiveManuscriptId(doc.id)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#d4af37] bg-[#221a11] text-white shadow-[0_0_15px_rgba(212,175,55,0.18)]'
                          : 'border-[#2b2116] bg-[#110d0a] text-[#9c8e7e] hover:border-[#423322] hover:text-[#e8ded3]'
                      )}
                    >
                      <div>
                        <span className="block text-sm font-medium font-serif text-[#fbf6ee]">
                          {doc.titleVi}
                        </span>
                        <span className="block text-xs text-[#a0907e] italic mt-0.5">
                          {doc.categoryVi} · {doc.yearVi}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#d4af37] hidden sm:inline">
                        Chiêm ngưỡng →
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Manuscript Card */}
              <div className="mt-6 rounded-xl border border-[#3b2d1d] bg-[#19130d] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#d4af37] uppercase">{activeDoc.categoryVi}</span>
                  <span className="rounded-full bg-[#271d12] px-2.5 py-0.5 text-[#e5c66b]">
                    {activeDoc.yearVi}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#fbf6ee]">
                  {activeDoc.titleVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#bcaea0]">
                  {activeDoc.curationNotesVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#291f14] text-xs">
                  <div className="rounded-lg bg-[#110d0a] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6a5b]">Chất Liệu Bản Thảo</span>
                    <span className="mt-1 block font-medium text-[#f0e7db]">{activeDoc.materialVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#110d0a] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6a5b]">Môi Trường Lưu Trữ Chuẩn</span>
                    <span className="mt-1 block font-medium text-[#d4af37]">{activeDoc.preservationSpecsVi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Climate & Fiber-Optic Lighting Engineering Console */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#3a2d1f] bg-[#14100c]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#2d2217] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37]">
                  Vi Khí Hậu Phòng Thư Viện
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf6ee]">
                  Chuẩn Lưu Trữ Bảo Tàng Louvre
                </h3>
              </div>

              {/* Target Humidity Setting */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-mono text-[#a89989]">
                  <span>Độ Ẩm Kiểm Soát Tự Động (RH):</span>
                  <span className="font-bold text-[#d4af37]">{targetHumidity}% RH (Chuẩn Không Axit)</span>
                </div>
                <input
                  type="range"
                  min="42"
                  max="55"
                  step="1"
                  value={targetHumidity}
                  onChange={(e) => setTargetHumidity(Number(e.target.value))}
                  className="mt-2 w-full h-2 rounded-lg bg-[#291f14] accent-[#d4af37] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#736354] mt-1">
                  <span>42% (Chống nấm mốc)</span>
                  <span>48% (Tối ưu giấy cổ)</span>
                  <span>55% (Giới hạn bảo quản)</span>
                </div>
              </div>

              {/* Fiber Optic Non-Thermal Lighting Toggle */}
              <div className="mt-6 rounded-xl border border-[#3b2d1d] bg-[#1a130d] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#d4af37] uppercase block">
                      Chiếu Sáng Sợi Quang Học (Fiber Optic)
                    </span>
                    <span className="text-xs text-[#b8a999]">CRI 99 · Không tỏa nhiệt · Cắt 100% tia hồng ngoại & UV</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpticalLightingActive(!opticalLightingActive)}
                    className={cn(
                      'px-3 py-1 rounded-full text-[11px] font-mono transition-all',
                      opticalLightingActive
                        ? 'bg-[#d4af37] text-[#0d0c0b] font-bold'
                        : 'border border-[#483723] text-[#7d6b59]'
                    )}
                  >
                    {opticalLightingActive ? 'Sợi Quang BẬT' : 'Sợi Quang TẮT'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#291f14] text-[11px] font-mono">
                  <div>
                    <span className="text-[#736354] block text-[10px]">NHIỆT TỎA BỀ MẶT:</span>
                    <span className="text-[#d4af37]">0.0°C (Không phát nhiệt)</span>
                  </div>
                  <div>
                    <span className="text-[#736354] block text-[10px]">CHỈ SỐ HOÀN MÀU:</span>
                    <span className="text-[#fbf6ee]">CRI 99.2 (Chuẩn bảo tàng)</span>
                  </div>
                </div>
              </div>

              {/* Positive Pressure Air Filtration System */}
              <div className="mt-4 rounded-xl border border-[#3b2d1d] bg-[#1a130d] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#d4af37] uppercase block">
                      Hệ Thống Áp Suất Dương Khử Bụi PM1.0
                    </span>
                    <span className="text-xs text-[#b8a999]">Dòng khí laminar thổi nhẹ đẩy bụi ra ngoài khi mở cửa</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPositivePressureActive(!positivePressureActive)}
                    className={cn(
                      'px-3 py-1 rounded-full text-[11px] font-mono transition-all',
                      positivePressureActive
                        ? 'bg-[#d4af37] text-[#0d0c0b] font-bold'
                        : 'border border-[#483723] text-[#7d6b59]'
                    )}
                  >
                    {positivePressureActive ? '+15 Pa BẬT' : 'Áp Suất TẮT'}
                  </button>
                </div>
              </div>

              {/* Artisan Joinery Woodwork Note */}
              <div className="mt-4 rounded-xl border border-[#2d2217] bg-[#100c09] p-3 text-xs space-y-1.5">
                <span className="font-mono text-[10px] text-[#d4af37] uppercase block">
                  Quy Cách Đóng Tủ Kệ Xưởng Mộc Thạnh Xuân:
                </span>
                <div className="flex items-center gap-2 text-[#a89989]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  <span>100% Gỗ óc chó Bắc Mỹ hạng FAS mộng âm dương không dùng đinh sắt.</span>
                </div>
                <div className="flex items-center gap-2 text-[#a89989]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  <span>Kính hộp 2 lớp chân không hút khí Argon ngăn nhiệt truyền vào tủ.</span>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="mt-6 pt-4 border-t border-[#2d2217]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#0d0c0b] hover:bg-[#e5c66b] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                >
                  <span>Khảo sát thiết kế thư viện cổ tư gia</span>
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
