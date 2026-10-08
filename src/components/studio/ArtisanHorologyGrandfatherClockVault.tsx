'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface ClockChimeMelody {
  id: string
  nameVi: string
  frequencyVi: string
  originVi: string
  acousticCharacterVi: string
  strikeIntervalVi: string
}

const CHIME_MELODIES: ClockChimeMelody[] = [
  {
    id: 'westminster-432hz',
    nameVi: 'Chuông Cổ Điển Westminster 432Hz',
    frequencyVi: '432 Hz Tần Số Solfeggio Chữa Lành Tâm Trí',
    originVi: 'Gia công từ 8 ống chuông hợp kim chuông đồng thau C90300 Thụy Sĩ',
    acousticCharacterVi: 'Âm thanh tròn đầy, trầm ấm, ngân vang tự nhiên trong không gian trần cao mà không gây chói tai hay giật mình.',
    strikeIntervalVi: 'Điểm chuông mỗi 15 phút (1/4 nhịp) & gõ đếm giờ chẵn',
  },
  {
    id: 'whittington-chime',
    nameVi: 'Khúc Giao Hưởng Whittington',
    frequencyVi: 'Giai Điệu 8 Chuông Luân Phiên',
    originVi: 'Giai điệu hoàng gia Anh thế kỷ 14 kết hợp công nghệ điều chỉnh âm học',
    acousticCharacterVi: 'Tiết tấu nhịp nhàng, thanh thoát mang lại sinh khí trang trọng cho đại sảnh và phòng khách lớn.',
    strikeIntervalVi: 'Điểm chuông mỗi 30 phút & ngân vang đầu giờ',
  },
  {
    id: 'st-michael-chime',
    nameVi: 'Thanh Âm Tĩnh Lặng St. Michael',
    frequencyVi: 'Hòa Âm Êm Dịu Giảm Stress',
    originVi: 'Hệ thống búa gõ bọc nỉ tự nhiên từ xưởng thủ công Basel',
    acousticCharacterVi: 'Độ vang dịu nhẹ, chuyển tiếp êm ái giữa các nốt nhạc, phù hợp thư phòng và không gian thưởng trà.',
    strikeIntervalVi: 'Điểm chuông mỗi 60 phút khi sang giờ mới',
  },
]

export function ArtisanHorologyGrandfatherClockVault({ className }: { className?: string } = {}) {
  const [activeMelodyId, setActiveMelodyId] = useState<string>('westminster-432hz')
  const [nightSilencerActive, setNightSilencerActive] = useState<boolean>(true)
  const [pendulumBeating, setPendulumBeating] = useState<boolean>(true)
  const [woodFinish, setWoodFinish] = useState<'cam-lai' | 'oc-cho-fAS'>('cam-lai')

  const currentMelody = CHIME_MELODIES.find((m) => m.id === activeMelodyId) ?? CHIME_MELODIES[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0908] py-24 text-[#eae1d8] border-t border-[#231814]', className)}>
      {/* Deep Rosewood & Antique Brass Warm Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(199,122,66,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#482c20] bg-[#1a100b] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d98246]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d98246] animate-ping" />
            Nghệ Thuật Đồng Hồ Cơ Học Tư Gia · Haute Horology Grandfather Clock
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf6f2]">
            Đồng Hồ Cây Cơ Khí Quả Lắc Gỗ Cẩm Lai Cao 2.4m
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b59f91]">
            Một ngôi nhà có linh hồn khi không gian mang nhịp đập êm ả của thời gian cơ học. Nghệ nhân mộc Thạnh Xuân chế tác thùng đồng hồ từ <span className="text-[#d98246] font-medium">Gỗ Cẩm Lai Tây Nguyên nguyên khối cao 2.4m</span>, tích hợp cỗ máy cơ học Deadbeat Escapement Thụy Sĩ và quả lắc đồng thau hiệu chỉnh trọng lực, ngân vang khúc chuông Westminster tần số chuẩn 432Hz chữa lành.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Escapement Simulation & Horology Mechanics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#3b2216] bg-[#140b07]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d1910] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d98246]">
                    Bộ Máy Cơ Học Swiss Deadbeat Escapement
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf6f2]">
                    Nhịp Đập Cơ Học Chuẩn 3.600 Vòng/Giờ (1Hz)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPendulumBeating(!pendulumBeating)}
                  className={cn(
                    'px-3.5 py-1 rounded-full text-xs font-mono transition-all',
                    pendulumBeating
                      ? 'bg-[#d98246] text-[#0c0908] font-bold shadow-[0_0_12px_rgba(217,130,70,0.3)]'
                      : 'border border-[#482c20] bg-[#1a100b] text-[#9c7865]'
                  )}
                >
                  {pendulumBeating ? '⏱ Con Lắc: ĐANG GÕ' : '⏸ Con Lắc: TẠM DỪNG'}
                </button>
              </div>

              {/* Escapement Visual Metaphor Box */}
              <div className="mt-6 rounded-xl border border-[#3b2216] bg-[#1a0e08] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d98246]">
                    Gia Cấu Con Lắc Bù Nhiệt (Temperature-Compensated Invar Pendulum)
                  </span>
                  <span className="font-mono text-xs text-[#a88a78]">
                    Sai số: &lt; 0.2s / tuần
                  </span>
                </div>

                {/* Pendulum Swing Animated Visual Track */}
                <div className="relative h-16 w-full rounded-lg bg-[#0e0704] border border-[#2b160d] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-y-0 w-0.5 bg-[#422214]" />
                  <div
                    className={cn(
                      'h-10 w-10 rounded-full border-2 border-[#d98246] bg-[#2d160c] flex items-center justify-center font-mono text-[10px] text-[#fbf6f2] shadow-[0_0_15px_rgba(217,130,70,0.4)] transition-all duration-700 ease-in-out',
                      pendulumBeating ? 'translate-x-12 animate-pulse' : 'translate-x-0 opacity-50'
                    )}
                  >
                    1s
                  </div>
                </div>

                <p className="text-xs text-[#b09787] leading-relaxed italic">
                  Thanh con lắc đúc hợp kim Invar không co giãn theo nhiệt độ mùa khô - mùa mưa Sài Gòn, quả lắc đồng thau nặng 6.5kg duy trì động lượng đều đặn hàng trăm năm.
                </p>

                {/* Wood Casing Selection */}
                <div className="pt-3 border-t border-[#2d1910] space-y-2">
                  <span className="font-mono text-[11px] text-[#d98246] uppercase block">
                    Vật Liệu Vỏ Thùng Chế Tác:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWoodFinish('cam-lai')}
                      className={cn(
                        'p-3 rounded-lg border text-left text-xs transition-all',
                        woodFinish === 'cam-lai'
                          ? 'border-[#d98246] bg-[#26140b] text-[#fbf6f2]'
                          : 'border-[#2d1910] bg-[#110804] text-[#8e7465]'
                      )}
                    >
                      <span className="font-bold block text-sm">Gỗ Cẩm Lai Tây Nguyên</span>
                      <span className="text-[11px] block mt-0.5">Vân chỉ đen huyền ảo, tỷ trọng cao triệt tạp âm</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWoodFinish('oc-cho-fAS')}
                      className={cn(
                        'p-3 rounded-lg border text-left text-xs transition-all',
                        woodFinish === 'oc-cho-fAS'
                          ? 'border-[#d98246] bg-[#26140b] text-[#fbf6f2]'
                          : 'border-[#2d1910] bg-[#110804] text-[#8e7465]'
                      )}
                    >
                      <span className="font-bold block text-sm">Gỗ Óc Chó FAS Bắc Mỹ</span>
                      <span className="text-[11px] block mt-0.5">Sắc nâu socola mộc mạc, hoàn thiện dầu lau hữu cơ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Technical Precision Specs */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#2d1910] text-xs font-mono">
                <div className="rounded-lg bg-[#110804] p-3 text-center">
                  <span className="block text-[10px] text-[#7a5f50] uppercase">Chiều Cao Tổng Thể</span>
                  <span className="mt-1 block font-bold text-[#d98246]">2.400 mm</span>
                </div>
                <div className="rounded-lg bg-[#110804] p-3 text-center">
                  <span className="block text-[10px] text-[#7a5f50] uppercase">Bộ Trữ Cót (Power Reserve)</span>
                  <span className="mt-1 block font-bold text-[#d98246]">8 Ngày (8-Day Cable)</span>
                </div>
                <div className="rounded-lg bg-[#110804] p-3 text-center">
                  <span className="block text-[10px] text-[#7a5f50] uppercase">Bảo Hành Cơ Khí</span>
                  <span className="mt-1 block font-bold text-[#d98246]">Trọn Đời Dinh Thự</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 432Hz Westminster Chime & Mechanical Night Silencer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#3b2216] bg-[#140b07]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#2d1910] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d98246]">
                  Hệ Ống Chuông Đồng Thau Hòa Âm
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf6f2]">
                  Westminster Chimes 432Hz
                </h3>
              </div>

              {/* Chime Selector */}
              <div className="mt-5 space-y-3">
                {CHIME_MELODIES.map((melody) => {
                  const isSelected = melody.id === activeMelodyId
                  return (
                    <button
                      key={melody.id}
                      type="button"
                      onClick={() => setActiveMelodyId(melody.id)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border transition-all min-h-[60px]',
                        isSelected
                          ? 'border-[#d98246] bg-[#24130a] text-white shadow-[0_0_12px_rgba(217,130,70,0.18)]'
                          : 'border-[#2d1910] bg-[#110804] text-[#9c7f6e] hover:border-[#44281a] hover:text-[#eae1d8]'
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-serif text-sm font-medium text-[#fbf6f2]">{melody.nameVi}</span>
                        <span className="font-mono text-[10px] text-[#d98246]">{melody.frequencyVi.split(' ')[0]}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#a08473] line-clamp-2">{melody.acousticCharacterVi}</p>
                    </button>
                  )
                })}
              </div>

              {/* Mechanical Night Silencer */}
              <div className="mt-6 rounded-xl border border-[#3b2216] bg-[#1a0e08] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#d98246] uppercase block">
                      Bộ Cơ Khí Tự Động Tắt Chuông Ban Đêm (Night-Silencer)
                    </span>
                    <span className="text-xs text-[#b89e8f]">Ngắt búa gõ tự động từ 22:00 đến 06:00 sáng</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNightSilencerActive(!nightSilencerActive)}
                    className={cn(
                      'px-3 py-1 rounded-full text-[11px] font-mono transition-all',
                      nightSilencerActive
                        ? 'bg-[#d98246] text-[#0c0908] font-bold'
                        : 'border border-[#482c20] text-[#7a5f50]'
                    )}
                  >
                    {nightSilencerActive ? 'Chế Độ Đêm BẬT' : 'Chế Độ Đêm TẮT'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2d1910] text-[11px] font-mono">
                  <div>
                    <span className="text-[#7a5f50] block text-[10px]">GIỜ IM LẶNG:</span>
                    <span className="text-[#d98246]">22:00 – 06:00 (Vô thanh)</span>
                  </div>
                  <div>
                    <span className="text-[#7a5f50] block text-[10px]">CƠ CHẾ NGẮT:</span>
                    <span className="text-[#fbf6f2]">Cơ học thuần túy (Không dùng điện)</span>
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="mt-6 pt-4 border-t border-[#2d1910]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#d98246] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#0c0908] hover:bg-[#e6945c] transition-all shadow-[0_4px_20px_rgba(217,130,70,0.25)]"
                >
                  <span>Đặt chế tác đồng hồ cây độc bản theo tên gia tộc</span>
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
