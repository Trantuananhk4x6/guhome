'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type AgingYears = 12 | 18 | 25 | 30

interface AgingProfile {
  years: AgingYears
  colorName: string
  colorHex: string
  caskWood: string
  tastingNotes: string
  angelsShareTotal: string
  character: string
}

const AGING_PROFILES: Record<AgingYears, AgingProfile> = {
  12: {
    years: 12,
    colorName: 'Vàng Rơm Ban Mai (Bright Gold Straw)',
    colorHex: '#fcd34d',
    caskWood: 'Thùng Bourbon sồi trắng Mỹ rót lần 1 (First-Fill Ex-Bourbon)',
    tastingNotes: 'Vani tươi, vỏ chanh vàng bào mỏng, lê xanh và hoa táo thanh khiết.',
    angelsShareTotal: '~13.5% thể tích ban đầu',
    character: 'Thanh thoát, tươi trẻ, bùng nổ sức sống vi khí hậu ôn đới.',
  },
  18: {
    years: 18,
    colorName: 'Hổ Phách Sánh Mật (Deep Rich Amber)',
    colorHex: '#f59e0b',
    caskWood: 'Thùng Oloroso Sherry sồi châu Âu (European Oak Sherry Cask)',
    tastingNotes: 'Quả sung sấy dẻo, kẹo toffee bơ béo, nhục đậu khấu và vỏ cam đắng sên đường.',
    angelsShareTotal: '~19.8% thể tích ban đầu',
    character: 'Cân bằng kinh điển, ngọt đầm, hậu vị kéo dài êm như lụa.',
  },
  25: {
    years: 25,
    colorName: 'Đồng Cổ Thâm Nghiêm (Antique Burnished Copper)',
    colorHex: '#d97706',
    caskWood: 'Thùng Pedro Ximénez Butt & Sồi Mizunara Nhật Bản',
    tastingNotes: 'Sô-cô-la đen 85%, gỗ đàn hương trầm ấm, quả anh đào đen ngâm rượu và khói than bùn nhẹ.',
    angelsShareTotal: '~26.4% thể tích ban đầu',
    character: 'Quý tộc uyên thâm, lớp lang hương vị biến chuyển đa tầng ngoạn mục.',
  },
  30: {
    years: 30,
    colorName: 'Nâu Đỏ Gỗ Gụ Ruby (Dark Mahogany Ruby)',
    colorHex: '#92400e',
    caskWood: 'Thùng ủ đơn độc bản (Single Cask Puncheon 500L) trên 30 mùa đông tuyết',
    tastingNotes: 'Da thuộc cổ xưa, lá cigar Havana phơi khô, mận đen hầm gia vị quế hồi và nốt rêu ẩm rừng già.',
    angelsShareTotal: '~31.2% thể tích ban đầu (Hạt ngọc vô giá còn lại)',
    character: 'Kiệt tác thời gian đọng lại; đỉnh cao sưu tầm của bậc vương giả.',
  },
}

export function PrivateWhiskyLibraryAndCaskVault({ className }: { className?: string } = {}) {
  const [selectedYears, setSelectedYears] = useState<AgingYears>(18)
  const [caskCapacity, setCaskCapacity] = useState<number>(200) // 50L to 500L
  const [clientPhone, setClientPhone] = useState<string>('')
  const [vaultLocation, setVaultLocation] = useState<string>('Tầng hầm biệt thự')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const vipPasscode = 'GU-WHISKY-2026-X'
  const activeProfile = AGING_PROFILES[selectedYears]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      aria-label="Hầm Thư Viện Thùng Gỗ Sồi Ủ Whisky Độc Bản"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background warm amber & oak glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-amber-700/15 blur-[150px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-orange-950/25 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Hầm Lưu Trữ Độc Quyền Thượng Hạng
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Hầm Thư Viện Whisky &amp; Thùng Sồi Trắng Cổ Điển
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Nơi thời gian ngưng đọng trong từng thớ gỗ sồi. Vòm hầm ghép gỗ sồi trắng Mỹ uốn cong, 
            kiểm soát vi khí hậu hoàn hảo 16°C và 65% RH hạn chế tối đa hao hụt Angel&apos;s Share dưới 1.2%/năm, 
            quầy bar ốp đá Onyx xuyên sáng màu mật ong và khoang bảo tồn các thùng ủ Single Malt cá nhân hóa.
          </p>
        </div>

        {/* Interactive Vault Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Interactive Aging Timeline & Cask Glass Visualizer */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Thời Gian Trưởng Thành: {activeProfile.years} Năm Trong Thùng Gỗ Sồi
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      Sắc Rượu: {activeProfile.colorName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-amber-400">16.0°C</span>
                    <span>|</span>
                    <span className="font-mono text-emerald-400">65% RH</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">Angel&apos;s: &lt; 1.2%/năm</span>
                  </div>
                </div>

                {/* Aging Simulation Visualization Container */}
                <div className="relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-black p-5 flex flex-col justify-between">
                  {/* Top badges */}
                  <div className="flex items-center justify-between z-10 text-xs">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-800 px-2.5 py-1 text-amber-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      {activeProfile.caskWood}
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Hao hụt tự nhiên: {activeProfile.angelsShareTotal}
                    </span>
                  </div>

                  {/* Stylized Glass & Cask SVG Graphic */}
                  <div className="relative my-auto flex items-center justify-center gap-8 z-10">
                    {/* Oak Cask Graphic */}
                    <div className="relative w-28 h-36 rounded-2xl border-4 border-amber-900/80 bg-gradient-to-r from-stone-900 via-amber-950/70 to-stone-900 flex flex-col justify-between p-2 shadow-2xl">
                      {/* Cask Hoops */}
                      <div className="h-1.5 w-full bg-stone-600 rounded-sm" />
                      <div className="text-center font-serif text-[11px] text-amber-300 tracking-wider">
                        GUHOMES
                        <div className="text-[8px] font-mono text-stone-400">CASK #{activeProfile.years}Y</div>
                      </div>
                      <div className="h-1.5 w-full bg-stone-600 rounded-sm" />
                    </div>

                    {/* Glencairn Crystal Glass with dynamic liquid color */}
                    <div className="relative flex flex-col items-center">
                      <div className="relative w-16 h-24 flex flex-col items-center justify-end overflow-hidden">
                        {/* Glass Bowl */}
                        <div
                          style={{
                            backgroundColor: activeProfile.colorHex,
                            boxShadow: `0 0 35px ${activeProfile.colorHex}55`,
                            transition: 'all 0.8s ease-in-out',
                          }}
                          className="w-14 h-16 rounded-b-full opacity-90 border border-white/30"
                        >
                          <div className="h-2 w-full bg-white/20 rounded-full" />
                        </div>
                      </div>
                      {/* Glass Foot */}
                      <div className="w-8 h-3 rounded-b-md bg-stone-400 border border-stone-300 shadow-md" />
                    </div>
                  </div>

                  {/* Bottom bar of simulation */}
                  <div className="flex items-center justify-between z-10 text-[11px] font-mono text-stone-400">
                    <span>Đá Onyx xuyên sáng 2700K bàn bar thử nếm</span>
                    <span className="text-amber-400 font-medium">{activeProfile.character}</span>
                  </div>
                </div>

                {/* Aging Years Selector Timeline */}
                <div className="mt-5">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Chọn Niên Đại Ủ Rượu Gỗ Sồi:
                  </span>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {([12, 18, 25, 30] as AgingYears[]).map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setSelectedYears(yr)}
                        className={cn(
                          'rounded-xl border p-2.5 text-center transition-all',
                          selectedYears === yr
                            ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold shadow-sm'
                            : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                        )}
                      >
                        <div className="text-xs">{yr} Năm</div>
                        <div className="mt-0.5 text-[10px] text-stone-400">
                          {yr === 12 ? 'Ex-Bourbon' : yr === 18 ? 'Sherry Cask' : yr === 25 ? 'Mizunara' : 'Single Cask'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tasting Notes Description */}
                <div className="mt-5 rounded-xl border border-stone-800 bg-stone-900/50 p-4">
                  <div className="text-xs text-stone-300 leading-relaxed">
                    <span className="font-semibold text-amber-400">Tầng hương vị đặc trưng: </span>
                    {activeProfile.tastingNotes}
                  </div>
                  <div className="mt-2 text-xs text-stone-400 font-light border-t border-stone-800/80 pt-2">
                    <span className="font-medium text-stone-200">Gỗ ủ tuyển chọn: </span>
                    {activeProfile.caskWood}
                  </div>
                </div>
              </div>

              {/* Climate Control Stats */}
              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-2.5">
                    <div className="text-amber-400 font-medium">Vi Khí Hậu 16°C &amp; 65% RH</div>
                    <p className="mt-1 text-[11px] text-stone-400 font-light">
                      Hệ thống điều hòa chính xác biến tần và màng trao đổi ẩm bảo tồn độ ẩm ổn định quanh năm tại Sài Gòn.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-2.5">
                    <div className="text-amber-400 font-medium">Ngăn Trữ Đá Băng Tinh Khiết</div>
                    <p className="mt-1 text-[11px] text-stone-400 font-light">
                      Đá tròn 65mm đúc chậm từ nước suối đóng băng đẳng nhiệt, tan chậm gấp 3 lần không làm loãng cấu trúc rượu.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Custom Cask Commissioning Form */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                  Đặt Thùng Gỗ Sồi Ủ Riêng Dinh Thự
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Sở hữu thùng ủ mang dấu ấn gia tộc và năm sinh kỷ niệm:
                </p>

                {submitted ? (
                  <div className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 text-center">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                      ✓
                    </div>
                    <h4 className="mt-2 text-sm font-serif text-emerald-200">
                      Hồ Sơ Hầm Whisky Đã Được Đăng Ký
                    </h4>
                    <p className="mt-1.5 text-xs text-stone-400 font-light leading-relaxed">
                      Chuyên gia Sommelier &amp; KTS GuHomes sẽ liên hệ gửi bản vẽ vòm gỗ sồi và hồ sơ xuất xứ thùng ủ:
                    </p>
                    <div className="mt-3 inline-block rounded bg-stone-900 border border-amber-500/40 px-3 py-1 font-mono text-xs text-amber-300 font-semibold tracking-wider">
                      MÃ THÀNH VIÊN: {vipPasscode}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                    <div>
                      <label className="text-xs text-stone-300 font-medium block">
                        Vị Trí Thiết Kế Hầm Rượu:
                      </label>
                      <select
                        value={vaultLocation}
                        onChange={(e) => setVaultLocation(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="Tầng hầm biệt thự">Tầng hầm biệt thự độc lập</option>
                        <option value="Phòng Cigar Lounge ven sông">Phòng Cigar Lounge &amp; Thư viện</option>
                        <option value="Tủ âm tường Penthouse Duplex">Tủ âm tường Penthouse Duplex</option>
                        <option value="Hầm ngầm hầm rượu dưới hồ bơi">Hầm ngầm hầm rượu dưới hồ bơi</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <label htmlFor="cask-capacity-range" className="text-stone-300 font-medium">Dung Tích Thùng Ủ Gỗ Sồi:</label>
                        <span className="font-mono text-amber-400 font-bold">{caskCapacity} Lít</span>
                      </div>
                      <input
                        id="cask-capacity-range"
                        type="range"
                        min={50}
                        max={500}
                        step={50}
                        value={caskCapacity}
                        onChange={(e) => setCaskCapacity(Number(e.target.value))}
                        className="mt-2 h-1.5 w-full appearance-none rounded-lg bg-stone-800 accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                        <span>50L (Octave)</span>
                        <span>200L (Standard Barrel)</span>
                        <span>500L (Butt)</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-stone-300 font-medium block">
                        Số Điện Thoại Nhận Tư Vấn Chuyên Sâu:
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        required
                        className="mt-1 w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] text-amber-400/90 font-mono mb-2">
                        <span>Đặc quyền hầm ủ:</span>
                        <span>{vipPasscode}</span>
                      </div>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-xs font-medium text-stone-950 hover:bg-amber-400 transition-colors shadow-sm"
                      >
                        <span>Nhận Bản Vẽ Phối Cảnh &amp; Báo Giá Dự Toán</span>
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Quality Commitment Badge */}
              <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400 font-light leading-relaxed">
                ✓ 100% gỗ sồi trắng được sấy nhiệt theo chu kỳ tự nhiên 36 tháng tại châu Âu, ghép vòm mộng thủ công không dung môi hóa học, giữ gìn độ thuần khiết của hương vị rượu.
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-300">
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">01 / VÒM GỖ SỒI TRẮNG UỐN CONG</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Bảo Tồn Mùi Hương Cổ Điển</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Kỹ thuật uốn cong vòm gỗ sồi bằng hơi nước nóng thủ công, tạo không gian hầm rượu đầm ấm, cách nhiệt đa tầng ngăn chặn mọi biến động nhiệt độ thời tiết nhiệt đới.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">02 / ĐÁ ONYX XUYÊN SÁNG HỔ PHÁCH</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Quầy Bar Thưởng Rượu Thượng Lưu</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Phiến đá Onyx tự nhiên nhập khẩu Nam Mỹ với hệ đèn LED phát quang dịu nhẹ làm nổi bật sắc vàng óng ánh của ly Single Malt khi nâng ly cùng tri kỷ.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">03 / KHÓA BẢO MẬT &amp; CẢM BIẾN VI KHÍ HẬU</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Kiểm Soát Thông Minh Từ Xa</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Hệ thống cảm biến IoT giám sát nhiệt độ và ẩm độ 24/7 cảnh báo qua điện thoại, khóa từ tính bảo vệ an toàn tuyệt đối cho bộ sưu tập rượu quý gia đình.
            </p>
          </div>
        </div>

        {/* Studio visit link */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Trải nghiệm hầm rượu thùng gỗ sồi mẫu tại{' '}
            <span className="font-medium text-stone-200">GuHomes Wine &amp; Spirits Cellar (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Đặt lịch nếm rượu &amp; tham quan</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <span className="text-stone-700">|</span>
            <a
              href="tel:0368757916"
              className="text-xs text-stone-300 hover:text-white font-mono transition-colors"
            >
              Hotline: 0368 757 916
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
