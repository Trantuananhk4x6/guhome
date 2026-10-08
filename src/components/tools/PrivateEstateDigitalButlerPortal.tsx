'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, PhoneIcon } from '@/components/ui/icons'

interface ButlerScene {
  id: string
  nameVi: string
  subtitleVi: string
  lightingVi: string
  climateVi: string
  acousticVi: string
  fragranceVi: string
  noiseCriteriaVi: string
  descriptionVi: string
}

const BUTLER_SCENES: ButlerScene[] = [
  {
    id: 'gala-reception',
    nameVi: 'Tiếp Khách Thượng Lưu · Gala Reception',
    subtitleVi: 'Trang trọng, quý phái & nồng ấm',
    lightingVi: '2400K Chiếu sáng gián tiếp 85% · Spotlight rọi tranh sơn mài',
    climateVi: '23.0°C · Cấp gió tươi AHU 45 m³/h · Hút ẩm tự động 55% RH',
    acousticVi: 'Acoustic Jazz nhẹ nhàng qua hệ thống loa âm trần Bowers & Wilkins',
    fragranceVi: 'Hương trầm Tiên Phước kết hợp hoa sen Đồng Tháp vi phân',
    noiseCriteriaVi: 'NC-30 (Êm ái tiêu chuẩn phòng trà sang trọng)',
    descriptionVi:
      'Kích hoạt rèm lụa tự động mở đón toàn cảnh sông Sài Gòn, đèn hắt trần chuyển sắc hổ phách ấm, đón tiếp khách quý với không khí đầm ấm và tinh tế.',
  },
  {
    id: 'tea-ceremony',
    nameVi: 'Thưởng Trà Tĩnh Tại · Night Tea Zen',
    subtitleVi: 'Thanh lọc tâm trí & giao hòa thiên nhiên',
    lightingVi: '2200K Chiếu rọi điểm 5W tại bàn trà gỗ me tây nguyên tấm',
    climateVi: 'Mở hé cửa trượt đón gió sông tự nhiên 26°C · Quạt trần cánh gỗ êm dịu',
    acousticVi: 'Tiếng nước chảy róc rách từ hồ cảnh quan · Thiền âm acoustic',
    fragranceVi: 'Hương vỏ bưởi Diễn thoang thoảng làm dịu mỏi mệt sau giờ làm việc',
    noiseCriteriaVi: 'NC-20 (Tĩnh lặng nghe tiếng lá rơi)',
    descriptionVi:
      'Không gian thu nhỏ lại quanh bàn trà tĩnh lặng. Mọi nguồn sáng gắt được dập tắt, chỉ còn ngọn đèn tiêu cự 5W soi rọi làn khói trà nghi ngút.',
  },
  {
    id: 'deep-sleep-nc25',
    nameVi: 'Ngủ Sâu Phục Hồi · Deep Sleep NC-25',
    subtitleVi: 'Triệt tiêu tạp âm đô thị & dưỡng sinh ban đêm',
    lightingVi: '0 Lux · Rèm cản sáng Blackout 100% hai lớp dệt thủ công',
    climateVi: '24.5°C ổn định · Cân bằng ẩm 60% bảo vệ hệ hô hấp suốt đêm',
    acousticVi: 'Dưới 22 dBA · Triệt tiêu toàn bộ rung chấn từ đường xá',
    fragranceVi: 'Nốt gỗ đàn hương êm dịu kích hoạt giấc ngủ sóng chậm Delta',
    noiseCriteriaVi: 'NC-18 (Chuẩn cách âm phòng ngủ khách sạn 6 sao thế giới)',
    descriptionVi:
      'Toàn bộ thiết bị điện tử chuyển về chế độ vô tuyến siêu tĩnh. Cửa sổ kính Low-E 3 lớp khóa kín, rèm đóng kín hoàn toàn, kiến tạo ốc đảo ngủ sâu trọn vẹn 8 tiếng.',
  },
]

export function PrivateEstateDigitalButlerPortal({ className }: { className?: string } = {}) {
  const [activeSceneId, setActiveSceneId] = useState<string>('gala-reception')
  const [copiedCode, setCopiedCode] = useState<boolean>(false)
  const [woodSpaScheduled, setWoodSpaScheduled] = useState<boolean>(false)
  const [selectedSeason, setSelectedSeason] = useState<string>('Mùa Mưa Sài Gòn (Tháng 5 - 11)')

  const activeScene = BUTLER_SCENES.find((s) => s.id === activeSceneId) ?? BUTLER_SCENES[0]!
  const vipPasscode = 'GU-BUTLER-2026-X'

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.(vipPasscode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 3000)
  }

  const handleBookWoodSpa = (e: React.FormEvent) => {
    e.preventDefault()
    setWoodSpaScheduled(true)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#090b10] py-24 text-[#e2e8f0] border-t border-[#1a202c]', className)}>
      {/* Background Cyan/Slate Subtle Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1e3452] bg-[#0c192b] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-ping" />
            Hệ Điều Hành Tư Gia Bảo Mật · Local Edge Butler Portal
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f8fafc]">
            Ứng Dụng Quản Gia Số Dinh Thự & Local Edge Server
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#94a3b8]">
            Không phụ thuộc vào đám mây hay máy chủ ngoại quốc, hệ sinh thái quản gia thông minh của GuHomes vận hành trên máy chủ 
            <span className="text-[#38bdf8] font-medium"> Local Edge Server</span> đặt ngay tại hầm dinh thự. Dữ liệu camera, vi khí hậu và bảo trì mộc đều được mã hóa chuẩn lượng tử AES-256, trao quyền kiểm soát tuyệt đối về tay gia chủ.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive iPad Butler Interface Simulation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              {/* Device Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e293b] pb-5">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-[#f8fafc]">
                      Bảng Điều Khiển Kịch Bản Sống Thượng Lưu
                    </h3>
                    <span className="font-mono text-xs text-[#64748b]">
                      Local Node IP: 192.168.1.250 · AES-256 Offline Mode
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-[#334155] bg-[#1e293b] px-2.5 py-1 font-mono text-xs text-[#38bdf8]">
                    {vipPasscode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="rounded-md border border-[#38bdf8] bg-[#0284c7]/20 px-2.5 py-1 text-xs font-mono text-[#38bdf8] hover:bg-[#0284c7]/40 transition-colors"
                  >
                    {copiedCode ? '✓ Đã Sao Chép' : 'Sao Chép'}
                  </button>
                </div>
              </div>

              {/* Scene Switcher Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUTLER_SCENES.map((scene) => {
                  const isSelected = scene.id === activeSceneId
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => setActiveSceneId(scene.id)}
                      className={cn(
                        'flex flex-col justify-between p-3.5 rounded-xl border text-left transition-all min-h-[96px]',
                        isSelected
                          ? 'border-[#38bdf8] bg-[#1e293b] text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'border-[#1e293b] bg-[#0b1120] text-[#94a3b8] hover:border-[#334155] hover:text-[#e2e8f0]'
                      )}
                    >
                      <span className="font-serif text-sm font-medium line-clamp-1">{scene.nameVi.split(' · ')[0]}</span>
                      <span className="text-[11px] text-[#64748b] line-clamp-2">{scene.subtitleVi}</span>
                      <span className="mt-2 inline-block font-mono text-[10px] text-[#38bdf8]">
                        {scene.noiseCriteriaVi.split(' ')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Scene Detailed Parameters */}
              <div className="mt-6 rounded-xl border border-[#334155] bg-[#111827] p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-serif text-lg text-[#f8fafc]">{activeScene.nameVi}</h4>
                  <span className="font-mono text-xs text-[#38bdf8] rounded-full bg-[#1e293b] px-3 py-0.5">
                    {activeScene.noiseCriteriaVi}
                  </span>
                </div>

                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  {activeScene.descriptionVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1f2937] text-xs">
                  <div className="rounded-lg bg-[#0b1120] p-3 space-y-1">
                    <span className="block font-mono text-[10px] uppercase text-[#64748b]">Ánh Sáng Nhiệt Độ Màu</span>
                    <span className="block font-medium text-[#f1f5f9]">{activeScene.lightingVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0b1120] p-3 space-y-1">
                    <span className="block font-mono text-[10px] uppercase text-[#64748b]">Vi Khí Hậu & Độ Ẩm</span>
                    <span className="block font-medium text-[#f1f5f9]">{activeScene.climateVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0b1120] p-3 space-y-1">
                    <span className="block font-mono text-[10px] uppercase text-[#64748b]">Không Gian Âm Học</span>
                    <span className="block font-medium text-[#f1f5f9]">{activeScene.acousticVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0b1120] p-3 space-y-1">
                    <span className="block font-mono text-[10px] uppercase text-[#64748b]">Vi Khuếch Tán Mùi Hương</span>
                    <span className="block font-medium text-[#f1f5f9]">{activeScene.fragranceVi}</span>
                  </div>
                </div>
              </div>

              {/* Edge Server Security Specifications */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1e293b] text-xs font-mono text-[#64748b]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Dữ liệu lưu nội bộ 100%</span>
                </div>
                <div>Sao lưu tự động vào SSD NVMe đôi RAID-1</div>
                <div>Không cần kết nối Internet ngoại bang</div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Line to Thạnh Xuân Woodshop (Home Wood Spa 6-Month Service) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#1e293b] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                  Cổng Dịch Vụ Hậu Mãi Độc Quyền
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f8fafc]">
                  Home Wood Spa · Xưởng Mộc Thạnh Xuân
                </h3>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Nội thất gỗ óc chó Bắc Mỹ và gỗ sồi tự nhiên tại Sài Gòn chịu ảnh hưởng lớn bởi chu kỳ mùa mưa và mùa khô. GuHomes cung cấp đặc quyền bảo dưỡng tận tư gia mỗi 6 tháng một lần: lau dầu dưỡng Rubio Monocoat tự nhiên, kiểm tra độ ẩm thớ gỗ và tinh chỉnh mộng trượt.
              </p>

              {woodSpaScheduled ? (
                <div className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 text-center space-y-2">
                  <span className="inline-block text-2xl">🌿</span>
                  <h4 className="font-serif text-base text-emerald-300 font-medium">
                    Đã Gửi Yêu Cầu Bảo Dưỡng Gỗ Thành Công!
                  </h4>
                  <p className="text-xs text-emerald-200/80">
                    Đội ngũ thợ mộc trưởng xưởng Thạnh Xuân sẽ liên hệ xác nhận lịch đến tư gia trong vòng 2 giờ làm việc.
                  </p>
                  <button
                    type="button"
                    onClick={() => setWoodSpaScheduled(false)}
                    className="mt-3 text-xs font-mono text-[#38bdf8] underline"
                  >
                    Đặt lịch khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookWoodSpa} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#64748b] uppercase mb-1">
                      Kỳ Bảo Dưỡng Đề Xuất
                    </label>
                    <select
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(e.target.value)}
                      className="w-full rounded-xl border border-[#334155] bg-[#111827] px-3.5 py-2.5 text-xs text-[#f1f5f9] focus:border-[#38bdf8] focus:outline-none"
                    >
                      <option value="Mùa Mưa Sài Gòn (Tháng 5 - 11)">Mùa Mưa Sài Gòn: Chống ẩm thớ mộc & hút ẩm</option>
                      <option value="Mùa Khô Sài Gòn (Tháng 12 - 4)">Mùa Khô Sài Gòn: Thấm dầu dưỡng ẩm & chống nứt</option>
                      <option value="Kiểm Tra Toàn Diện Hàng Quý">Kiểm Tra Khẩn Cấp Mộng Gỗ & Bề Mặt Sơn Mài</option>
                    </select>
                  </div>

                  <div className="rounded-xl border border-[#1e293b] bg-[#0b1120] p-3 text-xs space-y-1.5">
                    <span className="font-mono text-[10px] text-[#38bdf8] uppercase block">
                      Hạng Mục Bảo Dưỡng Tiêu Chuẩn:
                    </span>
                    <div className="flex items-center gap-2 text-[#94a3b8]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                      <span>Đo ẩm kế thớ gỗ tại 12 điểm trọng yếu dinh thự.</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#94a3b8]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                      <span>Dưỡng sáp ong & dầu lau thực vật thuần chay không VOCs.</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#0284c7] py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-[#0369a1] transition-all shadow-[0_4px_15px_rgba(2,132,199,0.3)]"
                  >
                    Kích Hoạt Lịch Home Wood Spa 6 Tháng
                  </button>
                </form>
              )}

              {/* Direct Hotline Call */}
              <div className="mt-6 pt-4 border-t border-[#1e293b] flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#64748b] block">Hotline Trực Tiếp Thợ Mộc:</span>
                  <a href="tel:0368757916" className="font-mono text-sm font-bold text-[#f8fafc] hover:text-[#38bdf8]">
                    0368 757 916
                  </a>
                </div>
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 text-xs font-mono text-[#38bdf8] hover:underline"
                >
                  <span>Liên hệ KTS GuHomes</span>
                  <ArrowUpRightIcon className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
