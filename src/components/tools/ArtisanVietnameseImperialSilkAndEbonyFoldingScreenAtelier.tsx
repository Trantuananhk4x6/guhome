'use client'

import React, { useState } from 'react'

interface SilkEmbroideryPanel {
  id: string
  panelTitle: string
  seasonName: string
  silkColorTone: string
  embroideryMotif: string
  acousticAbsorptionNrc: number
  description: string
}

const SILK_PANELS: SilkEmbroideryPanel[] = [
  {
    id: 'spring-dong-nai',
    panelTitle: 'Nắng Sớm Sông Đồng Nai',
    seasonName: 'Mùa Xuân (Khởi Sinh)',
    silkColorTone: 'Vàng tơ óng ả & Xanh mạ non',
    embroideryMotif: 'Đôi chim bói cá đậu trên cành lộc vừng trổ hoa',
    acousticAbsorptionNrc: 0.35,
    description: 'Từng sợi tơ tằm Bảo Lộc óng mượt bắt lấy ánh bình minh, tạo cảm giác thanh khiết và tươi mới cho sảnh đón.',
  },
  {
    id: 'summer-rain-cho-lon',
    panelTitle: 'Mưa Rào Phố Cũ Chợ Lớn',
    seasonName: 'Mùa Hạ (Hưng Vượng)',
    silkColorTone: 'Xám khói ngọc bích & Bạc ánh kim',
    embroideryMotif: 'Mái ngói âm dương rêu phong soi bóng hồ sen',
    acousticAbsorptionNrc: 0.42,
    description: 'Chỉ tơ bạc phản quang dưới ánh đèn chùm, gợi nhớ những cơn mưa rào tưới mát phố thị phương Nam.',
  },
  {
    id: 'autumn-ben-nghe',
    panelTitle: 'Gió Sông Bến Nghé',
    seasonName: 'Mùa Thu (Tĩnh Tại)',
    silkColorTone: 'Nâu hổ phách & Vàng rơm cổ',
    embroideryMotif: 'Rặng dừa nước nghiêng mình đón luồng gió chướng',
    acousticAbsorptionNrc: 0.48,
    description: 'Độ rủ và độ dày sợi tơ tằm giúp triệt tiêu sóng phản xạ âm thanh, tạo khoảng lặng êm đềm cho phòng khách.',
  },
  {
    id: 'winter-moon-thu-thiem',
    panelTitle: 'Trăng Rằm Bán Đảo Thủ Thiêm',
    seasonName: 'Mùa Đông (An Yên)',
    silkColorTone: 'Lam thẫm sapphire & Chỉ vàng 24K',
    embroideryMotif: 'Vầng trăng vằng vặc trên khúc quanh sông Sài Gòn',
    acousticAbsorptionNrc: 0.45,
    description: 'Nền lụa dệt đôi cản gió lùa ban đêm, tỏa ánh sáng dịu mắt dưới dải đèn rọi tiêu điểm 2700K.',
  },
]

export function ArtisanVietnameseImperialSilkAndEbonyFoldingScreenAtelier() {
  const [selectedPanelIdx, setSelectedPanelIdx] = useState<number>(0)
  const [screenFoldAngle, setScreenFoldAngle] = useState<number>(90)

  const activePanel = SILK_PANELS[selectedPanelIdx] ?? SILK_PANELS[0]!

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.2),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Nghệ Thuật Bình Phong Ước Lệ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Bình Phong Tơ Tằm Bảo Lộc & Mun Hoa Khảm Bạc
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Khung gỗ Mun hoa ghép mộng én nạm chỉ bạc 999 thủ công. 
            Bốn cánh bình phong căng lụa tơ tằm dệt tay thêu họa tiết Tứ Thời Sài Gòn, phân chia không gian ước lệ đầy chất thơ.
          </p>
        </div>

        {/* Panel Tabs Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {SILK_PANELS.map((panel, idx) => {
            const isSelected = idx === selectedPanelIdx
            return (
              <button
                key={panel.id}
                onClick={() => setSelectedPanelIdx(idx)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-amber-600/80 shadow-lg shadow-amber-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-amber-400">CÁNH 0{idx + 1}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      NRC {panel.acousticAbsorptionNrc}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-stone-200 line-clamp-1">
                    {panel.panelTitle}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-stone-400 mt-2 block">
                  {panel.seasonName}
                </span>
              </button>
            )
          })}
        </div>

        {/* Main Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Visual Folding Screen Display */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-3 border-b border-stone-800">
              <span>LỤA TƠ TẰM THỦ CÔNG: 120 SỢI/CM</span>
              <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                NẠM CHỈ BẠC TA 999 (0.8 MM)
              </span>
            </div>

            {/* Graphic Representation of Screen Folding */}
            <div className="my-8 text-center relative py-8 px-4 rounded-xl border border-stone-800/80 bg-stone-950/80 overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
              {/* Graphic 4 screen leaves folding with CSS 3D perspective */}
              <div className="flex justify-center items-center gap-2 mb-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-36 rounded border border-amber-900/60 bg-gradient-to-b from-amber-950/70 to-stone-900 p-2 shadow-lg transition-transform duration-500 relative flex flex-col justify-between"
                    style={{
                      transform: `perspective(600px) rotateY(${i % 2 === 0 ? screenFoldAngle / 4 : -screenFoldAngle / 4}deg)`,
                    }}
                  >
                    <div className="w-full h-1 bg-amber-600/40 rounded" />
                    <span className="text-[9px] font-mono text-amber-300/80 text-center block">
                      {i + 1}
                    </span>
                    <div className="w-full h-1 bg-amber-600/40 rounded" />
                  </div>
                ))}
              </div>

              <div className="mt-4 font-serif text-lg text-stone-100 font-normal">
                {activePanel.panelTitle}
              </div>
              <div className="text-xs text-stone-400 font-mono mt-1">
                Họa tiết thêu tay: {activePanel.embroideryMotif}
              </div>
            </div>

            {/* Angle Toggle & Acoustic Metric */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-stone-400">GÓC GẬP BẢN LỀ:</span>
                {[60, 90, 120, 180].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setScreenFoldAngle(angle)}
                    className={`px-2.5 py-1 rounded text-xs font-mono min-h-[36px] ${
                      screenFoldAngle === angle
                        ? 'bg-amber-900 text-amber-200 border border-amber-600'
                        : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-emerald-400">
                Bản lề đồng xoay 360° êm ái
              </span>
            </div>
          </div>

          {/* Description & Technical Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                Sắc Độ & Thi Họa Tơ Tằm
              </span>
              <h3 className="text-xl font-serif text-stone-100 mb-2">{activePanel.seasonName}</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-4">
                {activePanel.description}
              </p>
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">TÔNG MÀU LỤA:</span>
                <span className="text-amber-300">{activePanel.silkColorTone}</span>
              </div>
            </div>

            {/* Quality Standard Badges */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Đặc Quyền Kỹ Thuật GuHomes
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">·</span>
                  <span><strong>Gỗ Mun hoa nạm bạc 999:</strong> Khung gỗ đanh thép, sợi bạc ta tán mỏng mộng chìm vĩnh viễn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">·</span>
                  <span><strong>Tơ tằm Bảo Lộc dệt đôi:</strong> Mật độ 120 sợi/cm tán xạ âm thanh, tạo sự riêng tư kín đáo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">·</span>
                  <span><strong>Đệm nỉ cừu tự nhiên:</strong> Bảo vệ tuyệt đối bề mặt sàn gỗ tự nhiên khi di chuyển bình phong.</span>
                </li>
              </ul>
            </div>

            {/* Direct Line */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-300 block">Đặt chế tác bình phong độc bản:</span>
                <span className="text-stone-400 text-[11px] font-mono">Thêu tranh theo phong thủy gia chủ</span>
              </div>
              <a
                href="tel:0368757916"
                className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-mono text-xs font-semibold transition-colors min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-mono text-stone-500">
          GUHOMES BESPOKE SCREEN ATELIER · XƯỞNG MỘC THẠNH XUÂN 1.200M2 · EMAIL: GUHOMESVN@GMAIL.COM
        </div>
      </div>
    </section>
  )
}
