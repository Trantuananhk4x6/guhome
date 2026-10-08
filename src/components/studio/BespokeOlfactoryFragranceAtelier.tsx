'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface ScentNote {
  tier: 'top' | 'heart' | 'base'
  tierVi: string
  nameVi: string
  botanicalVi: string
  originVi: string
  characterVi: string
  defaultRatio: number
}

const DEFAULT_NOTES: Record<'top' | 'heart' | 'base', ScentNote> = {
  top: {
    tier: 'top',
    tierVi: 'Tầng Hương Đầu (Top Notes)',
    nameVi: 'Vỏ Bưởi Diễn & Cam Đắng Sài Gòn',
    botanicalVi: 'Citrus maxima & Citrus aurantium',
    originVi: 'Vùng bưởi truyền thống Diễn & Tinh dầu cam chưng cất lạnh',
    characterVi: 'Mở đầu thanh khiết, đánh thức khứu giác bằng tinh dầu thanh tao, giải phóng căng thẳng ngay khi bước chân qua đại sảnh.',
    defaultRatio: 25,
  },
  heart: {
    tier: 'heart',
    tierVi: 'Tầng Hương Giữa (Heart Notes)',
    nameVi: 'Trầm Hương Tiên Phước & Hoa Sen Đồng Tháp',
    botanicalVi: 'Aquilaria crassna & Nelumbo nucifera',
    originVi: 'Gỗ trầm tích lũy 35 năm Quảng Nam & Sen hồng đầm Tháp Mười',
    characterVi: 'Trái tim của không gian sống, mang chiều sâu tĩnh tại của thiền viện và sự thanh nhã quý phái của văn hóa Việt Nam.',
    defaultRatio: 45,
  },
  base: {
    tier: 'base',
    tierVi: 'Tầng Hương Cuối (Base Notes)',
    nameVi: 'Gỗ Đàn Hương Hoàng Gia & Long Diên Hương',
    botanicalVi: 'Santalum album & Ambergris infusion',
    originVi: 'Đàn hương nguyên chất êm dịu kết hợp nốt hổ phách ấm',
    characterVi: 'Neo giữ mùi hương vương vấn trên sợi vải Kvadrat và từng thớ gỗ óc chó suốt 48 giờ mà không gây ẩm mốc hay biến màu bề mặt mộc.',
    defaultRatio: 30,
  },
}

interface CircadianSchedule {
  id: string
  titleVi: string
  timeRangeVi: string
  modeVi: string
  intensityVi: string
  ambienceVi: string
  recommendedMix: { top: number; heart: number; base: number }
}

const CIRCADIAN_MODES: CircadianSchedule[] = [
  {
    id: 'morning-vitality',
    titleVi: 'Bình Minh Thức Giấc · Vitality',
    timeRangeVi: '06:30 – 10:30',
    modeVi: 'Đánh thức năng lượng & Tinh tấn',
    intensityVi: 'Cấp độ 2 (Hạt sương 0.08 µm)',
    ambienceVi: 'Tươi mát với nốt bưởi Diễn và hoa cam trắng, kích thích serotonin tự nhiên đón ngày mới.',
    recommendedMix: { top: 50, heart: 35, base: 15 },
  },
  {
    id: 'afternoon-focus',
    titleVi: 'Buổi Trưa Tĩnh Tại · Focus Zen',
    timeRangeVi: '11:00 – 17:00',
    modeVi: 'Cân bằng vi khí hậu & Giảm áp lực',
    intensityVi: 'Cấp độ 1 (Êm dịu vi phân tử)',
    ambienceVi: 'Hương sen Đồng Tháp hòa quyện vi gió tươi AHU, giữ nhiệt độ cảm xúc ổn định suốt giờ làm việc tại gia.',
    recommendedMix: { top: 20, heart: 55, base: 25 },
  },
  {
    id: 'evening-serenity',
    titleVi: 'Hoàng Hôn Thư Giãn · Deep Serenity',
    timeRangeVi: '18:00 – 23:30',
    modeVi: 'Chuẩn bị giấc ngủ sâu & Tĩnh lặng',
    intensityVi: 'Cấp độ 1.5 (Khuếch tán ngắt quãng)',
    ambienceVi: 'Trầm hương Tiên Phước và đàn hương đầm ấm, đưa sóng não về tần số Theta chuẩn bị cho giấc ngủ dưỡng thần.',
    recommendedMix: { top: 15, heart: 35, base: 50 },
  },
]

export function BespokeOlfactoryFragranceAtelier({ className }: { className?: string } = {}) {
  const [topRatio, setTopRatio] = useState<number>(DEFAULT_NOTES.top.defaultRatio)
  const [heartRatio, setHeartRatio] = useState<number>(DEFAULT_NOTES.heart.defaultRatio)
  const [baseRatio, setBaseRatio] = useState<number>(DEFAULT_NOTES.base.defaultRatio)
  const [selectedCircadianId, setSelectedCircadianId] = useState<string>('evening-serenity')
  const [diffusionActive, setDiffusionActive] = useState<boolean>(true)

  const applyCircadianMode = (mode: CircadianSchedule) => {
    setSelectedCircadianId(mode.id)
    setTopRatio(mode.recommendedMix.top)
    setHeartRatio(mode.recommendedMix.heart)
    setBaseRatio(mode.recommendedMix.base)
  }

  const activeCircadian = CIRCADIAN_MODES.find((m) => m.id === selectedCircadianId) ?? CIRCADIAN_MODES[2]!
  const totalRatio = topRatio + heartRatio + baseRatio

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0a08] py-24 text-[#e8e0d5] border-t border-[#231b14]', className)}>
      {/* Warm Amber-Bronze Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,143,72,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4a3622] bg-[#1e150d] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#e2a868]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d98f48] animate-ping" />
            Kiến Trúc Khứu Giác Độc Bản · Bespoke Olfactory Scenting
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf7f2]">
            Xưởng Hương Không Gian Vi Khuếch Tán Khí Lạnh
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b3a393]">
            Một không gian thượng lưu đích thực bắt đầu bằng ký ức mùi hương. GuHomes tích hợp công nghệ vi khuếch tán khí lạnh 
            <span className="text-[#e2a868] font-medium"> Cold-Air Nebulization</span> đưa hạt hương kích thước dưới 0.1 micron trực tiếp vào hệ thống điều hòa trung tâm AHU/FCU, lan tỏa hương thơm tự nhiên của thảo mộc Việt mà hoàn toàn không đọng ẩm, bảo toàn 100% độ bền cho nội thất gỗ quý.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Fragrance Note Mixer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#38281b] bg-[#140e09]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2b1f15] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d98f48]">
                    Hệ Thống Phối Trộn Tinh Dầu 3 Tầng
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf7f2]">
                    Bespoke Note Ratio & Botanical Formula
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#24170d] px-3.5 py-1 text-xs font-mono text-[#e2a868]">
                  <span>Hạt vi phân: &lt; 0.1 µm Dry Vapor</span>
                </div>
              </div>

              {/* Sliders for Top, Heart, Base */}
              <div className="mt-6 space-y-6">
                {/* Top Note */}
                <div className="rounded-xl border border-[#2e2014] bg-[#1a120b] p-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#e2a868] uppercase font-bold">{DEFAULT_NOTES.top.tierVi}</span>
                    <span className="text-white font-bold">{Math.round((topRatio / totalRatio) * 100)}% Phối Tỷ</span>
                  </div>
                  <h4 className="mt-1 font-serif text-base text-[#fbf7f2]">{DEFAULT_NOTES.top.nameVi}</h4>
                  <p className="mt-1 text-xs text-[#9d8d7e] italic">{DEFAULT_NOTES.top.characterVi}</p>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={topRatio}
                    onChange={(e) => setTopRatio(Number(e.target.value))}
                    className="mt-3 w-full h-2 rounded-lg bg-[#2e2014] accent-[#d98f48] cursor-pointer"
                  />
                </div>

                {/* Heart Note */}
                <div className="rounded-xl border border-[#2e2014] bg-[#1a120b] p-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#e2a868] uppercase font-bold">{DEFAULT_NOTES.heart.tierVi}</span>
                    <span className="text-white font-bold">{Math.round((heartRatio / totalRatio) * 100)}% Phối Tỷ</span>
                  </div>
                  <h4 className="mt-1 font-serif text-base text-[#fbf7f2]">{DEFAULT_NOTES.heart.nameVi}</h4>
                  <p className="mt-1 text-xs text-[#9d8d7e] italic">{DEFAULT_NOTES.heart.characterVi}</p>
                  <input
                    type="range"
                    min="15"
                    max="70"
                    step="5"
                    value={heartRatio}
                    onChange={(e) => setHeartRatio(Number(e.target.value))}
                    className="mt-3 w-full h-2 rounded-lg bg-[#2e2014] accent-[#d98f48] cursor-pointer"
                  />
                </div>

                {/* Base Note */}
                <div className="rounded-xl border border-[#2e2014] bg-[#1a120b] p-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#e2a868] uppercase font-bold">{DEFAULT_NOTES.base.tierVi}</span>
                    <span className="text-white font-bold">{Math.round((baseRatio / totalRatio) * 100)}% Phối Tỷ</span>
                  </div>
                  <h4 className="mt-1 font-serif text-base text-[#fbf7f2]">{DEFAULT_NOTES.base.nameVi}</h4>
                  <p className="mt-1 text-xs text-[#9d8d7e] italic">{DEFAULT_NOTES.base.characterVi}</p>
                  <input
                    type="range"
                    min="10"
                    max="65"
                    step="5"
                    value={baseRatio}
                    onChange={(e) => setBaseRatio(Number(e.target.value))}
                    className="mt-3 w-full h-2 rounded-lg bg-[#2e2014] accent-[#d98f48] cursor-pointer"
                  />
                </div>
              </div>

              {/* Technical Precision Footer */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#2b1f15] text-xs font-mono">
                <div className="rounded-lg bg-[#110b07] p-3 text-center">
                  <span className="block text-[10px] text-[#827163] uppercase">Độ Ẩm Không Khí</span>
                  <span className="mt-1 block font-bold text-[#e2a868]">0.0% Thay Đổi</span>
                </div>
                <div className="rounded-lg bg-[#110b07] p-3 text-center">
                  <span className="block text-[10px] text-[#827163] uppercase">Âm Thanh Bơm Vi Khí</span>
                  <span className="mt-1 block font-bold text-[#e2a868]">&lt; 18 dBA (Vô Thanh)</span>
                </div>
                <div className="rounded-lg bg-[#110b07] p-3 text-center">
                  <span className="block text-[10px] text-[#827163] uppercase">Tuổi Thọ Gỗ Quý</span>
                  <span className="mt-1 block font-bold text-[#e2a868]">Bảo Toàn 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Circadian Rhythm Scheduler & Brass Body */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#38281b] bg-[#140e09]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#2b1f15] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d98f48]">
                    Lịch Trình Nhịp Sinh Học
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf7f2]">
                    Circadian Scent Diffusion
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDiffusionActive(!diffusionActive)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                    diffusionActive
                      ? 'bg-[#d98f48] text-[#0c0a08] font-bold shadow-[0_0_12px_rgba(217,143,72,0.3)]'
                      : 'border border-[#4a3622] bg-[#1f150d] text-[#c49a6c] hover:bg-[#281c12]'
                  )}
                >
                  {diffusionActive ? '🌿 AHU: ĐANG KHUẾCH TÁN' : '⏸ AHU: TẠM DỪNG'}
                </button>
              </div>

              {/* Mode Selectors */}
              <div className="mt-5 space-y-3">
                {CIRCADIAN_MODES.map((mode) => {
                  const isSelected = mode.id === selectedCircadianId
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => applyCircadianMode(mode)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border transition-all min-h-[58px]',
                        isSelected
                          ? 'border-[#d98f48] bg-[#22170f] text-white shadow-[0_0_12px_rgba(217,143,72,0.15)]'
                          : 'border-[#291c13] bg-[#120c08] text-[#9d8d7e] hover:border-[#3d2c1e] hover:text-[#e8e0d5]'
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-serif text-sm font-medium text-[#fbf7f2]">{mode.titleVi}</span>
                        <span className="font-mono text-[11px] text-[#e2a868]">{mode.timeRangeVi}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#9d8d7e] line-clamp-2">{mode.ambienceVi}</p>
                    </button>
                  )
                })}
              </div>

              {/* Hand-Hammered Brass Chassis Detail */}
              <div className="mt-6 rounded-xl border border-[#38281b] bg-[#1a120b] p-4 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#e2a868] uppercase block">
                  Vỏ Máy Đồng Thau Đúc Gõ Búa Nguyên Khối:
                </span>
                <p className="text-[#a8988a] leading-relaxed">
                  Thiết bị khuếch tán đặt ẩn giấu trong tủ kỹ thuật AHU hoặc trưng bày như một tác phẩm điêu khắc nghệ thuật. Vỏ hợp kim đồng thau C360 gõ tay tinh tế, bề mặt xử lý oxy hóa màu trầm cổ điển đồng điệu với chất gỗ óc chó xưởng Thạnh Xuân.
                </p>
                <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#d98f48]">
                  <span>Áp suất phun lạnh: 0.25 MPa</span>
                  <span>·</span>
                  <span>Bảo hành máy: 5 năm</span>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#2b1f15]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#d98f48] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#0c0a08] hover:bg-[#e2a868] transition-all shadow-[0_4px_20px_rgba(217,143,72,0.25)]"
                >
                  <span>Đặt lịch điều chế nốt hương dinh thự độc bản</span>
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
