'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type HeatingMode = 'cooling-24' | 'gentle-35' | 'deep-39'

interface AcupressureZone {
  id: string
  name: string
  chineseName: string
  location: string
  medicalBenefit: string
  thermalStimulation: string
}

const ACUPRESSURE_ZONES: AcupressureZone[] = [
  {
    id: 'dung-tuyen',
    name: 'Huyệt Dũng Tuyền (Huyệt Vàng Bàn Chân)',
    chineseName: '湧泉穴 - Ki 1',
    location: 'Điểm lõm 1/3 trước lòng bàn chân khi co các ngón lại',
    medicalBenefit: 'Bổ thận tráng dương, dưỡng tâm an thần, hạ hỏa điều hòa huyết áp và trị dứt điểm mất ngủ kinh niên.',
    thermalStimulation: 'Nhiệt hồng ngoại 38°C - 39°C làm giãn mao mạch sâu, đưa dòng năng lượng ấm áp từ lòng đất lên khắp kinh lạc cơ thể.',
  },
  {
    id: 'thai-xung',
    name: 'Huyệt Thái Xung (Huyệt Giải Tỏa Căng Thẳng)',
    chineseName: '太衝穴 - LR 3',
    location: 'Kẽ giữa ngón chân cái và ngón thứ hai, lùi về phía mu bàn chân 2 đốt',
    medicalBenefit: 'Bình can tức phong, đào thải độc tố gan, giảm đau nửa đầu do áp lực công việc của giới tinh hoa.',
    thermalStimulation: 'Sỏi suối nhô cao tạo lực tỳ đè kết hợp hơi nước sả quế xua tan ứ trệ khí huyết.',
  },
  {
    id: 'reflex-spine',
    name: 'Vùng Phản Xạ Cột Sống & Đĩa Đệm',
    chineseName: '脊柱反射區',
    location: 'Chạy dọc theo vòm cong mép trong từ ngón cái đến gót chân',
    medicalBenefit: 'Giải phóng chèn ép rễ thần kinh thắt lưng L4-L5, tăng tính linh hoạt đốt sống cổ sau nhiều giờ làm việc.',
    thermalStimulation: 'Sỏi bazan tròn nhẵn tác động êm ái theo nhịp bước chân bồng bềnh như đi trên thảm thiên nhiên.',
  },
  {
    id: 'reflex-heart-lung',
    name: 'Vùng Phản Xạ Tuần Hoàn Tim & Phổi',
    chineseName: '心肺反射區',
    location: 'Ụ thịt dưới các khớp ngón chân 2, 3 và 4',
    medicalBenefit: 'Kích hoạt dung tích phổi, gia tăng oxy nuôi dưỡng tế bào não và thúc đẩy tuần hoàn máu ngoại vi.',
    thermalStimulation: 'Màng sưởi carbon tạo sóng hồng ngoại xa bước sóng 8-14µm cộng hưởng sinh học với cơ thể người.',
  },
]

export function ArtisanRiverPebbleAcupressureWalkway({ className }: { className?: string } = {}) {
  const [heatingMode, setHeatingMode] = useState<HeatingMode>('gentle-35')
  const [activeZoneId, setActiveZoneId] = useState<string>('dung-tuyen')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [walkwayLength, setWalkwayLength] = useState<number>(6) // 3m to 15m
  const [installationArea, setInstallationArea] = useState<string>('Vườn nhiệt đới biệt thự')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const vipPasscode = 'GU-REFLEX-2026-X'
  const activeZone = ACUPRESSURE_ZONES.find((z) => z.id === activeZoneId) ?? ACUPRESSURE_ZONES[0]!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      aria-label="Lối Đi Sỏi Suối Bấm Huyệt Bàn Chân Sưởi Ấm Hồng Ngoại"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient warm wellness lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 h-96 w-96 rounded-full bg-amber-700/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-emerald-950/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(180,83,9,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Trị Liệu Dưỡng Sinh Vi Khí Hậu
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Lối Đi Sỏi Suối Bấm Huyệt Bàn Chân Sưởi Ấm Hồng Ngoại
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Chạm vào thiên nhiên nâng niu từng bước chân an lạc. Hàng nghìn viên sỏi cuội suối tròn nhẵn chọn lọc từ lòng suối Tây Nguyên, 
            tích hợp màng sưởi hồng ngoại Carbon sưởi ấm 38°C kích thích huyệt Dũng Tuyền, máng ngâm thảo mộc hồi quế sả chanh 
            và tay vịn gỗ Gõ Đỏ Nam Phi an toàn tuyệt đối.
          </p>
        </div>

        {/* Interactive Walkway Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Interactive Foot Acupressure Map & Thermal Controller */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Bản Đồ Kinh Lạc Bàn Chân &amp; Sỏi Suối
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {activeZone.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-amber-400">
                      {heatingMode === 'cooling-24' && '24.0°C Mát Tự Nhiên'}
                      {heatingMode === 'gentle-35' && '35.0°C Ấm Dịu Thư Giãn'}
                      {heatingMode === 'deep-39' && '39.0°C Trị Liệu Sâu'}
                    </span>
                    <span>|</span>
                    <span className="font-mono text-emerald-400">FIR 8-14µm</span>
                  </div>
                </div>

                {/* Foot Graphic & Pebble Bed Simulation */}
                <div className="relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-br from-stone-950 via-stone-900 to-black p-5 flex flex-col justify-between">
                  {/* Top badges */}
                  <div className="flex items-center justify-between z-10 text-xs">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-800 px-2.5 py-1 text-amber-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Màng Sưởi Carbon Dưới Lớp Vữa Chống Rung
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Sỏi cuội Tây Nguyên 20 - 45mm
                    </span>
                  </div>

                  {/* Stylized Foot Acupressure Interactive Canvas */}
                  <div className="relative my-auto flex items-center justify-center z-10">
                    <div className="relative w-64 h-36 sm:h-40 flex items-center justify-center">
                      {/* Thermal aura background */}
                      <div className={cn(
                        'absolute inset-0 rounded-full transition-all duration-700 blur-2xl',
                        heatingMode === 'cooling-24' && 'bg-teal-950/30',
                        heatingMode === 'gentle-35' && 'bg-amber-600/20',
                        heatingMode === 'deep-39' && 'bg-rose-600/30'
                      )} />

                      {/* Foot Sole SVG Shape with 4 Clickable Acupressure Points */}
                      <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-2xl">
                        {/* Stylized Foot Outline */}
                        <path
                          d="M 25,60 C 25,30 50,20 85,25 C 130,30 170,40 180,60 C 170,80 130,90 85,95 C 50,100 25,90 25,60 Z"
                          fill="#1c1917"
                          stroke={heatingMode === 'deep-39' ? '#f43f5e' : heatingMode === 'gentle-35' ? '#f59e0b' : '#14b8a6'}
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />

                        {/* Pebble dots distributed inside sole */}
                        <circle cx="50" cy="50" r="4" fill="#78716c" opacity="0.6" />
                        <circle cx="65" cy="70" r="5" fill="#a8a29e" opacity="0.7" />
                        <circle cx="110" cy="45" r="4.5" fill="#78716c" opacity="0.6" />
                        <circle cx="130" cy="75" r="5" fill="#a8a29e" opacity="0.7" />
                        <circle cx="150" cy="55" r="4" fill="#78716c" opacity="0.6" />

                        {/* 4 Interactive Zones */}
                        {/* 1. Dung Tuyen (Center front sole) */}
                        <g
                          onClick={() => setActiveZoneId('dung-tuyen')}
                          className="cursor-pointer transition-transform hover:scale-125"
                        >
                          <circle
                            cx="75"
                            cy="60"
                            r="9"
                            fill={activeZoneId === 'dung-tuyen' ? '#f59e0b' : '#44403c'}
                            stroke="#fff"
                            strokeWidth="1.5"
                          />
                          <text x="75" y="63" fontSize="7" fill="#000" textAnchor="middle" fontWeight="bold">KI1</text>
                        </g>

                        {/* 2. Thai Xung (Toe web) */}
                        <g
                          onClick={() => setActiveZoneId('thai-xung')}
                          className="cursor-pointer transition-transform hover:scale-125"
                        >
                          <circle
                            cx="42"
                            cy="38"
                            r="8"
                            fill={activeZoneId === 'thai-xung' ? '#f59e0b' : '#44403c'}
                            stroke="#fff"
                            strokeWidth="1.5"
                          />
                          <text x="42" y="41" fontSize="7" fill="#000" textAnchor="middle" fontWeight="bold">LR3</text>
                        </g>

                        {/* 3. Reflex Spine (Inner Arch) */}
                        <g
                          onClick={() => setActiveZoneId('reflex-spine')}
                          className="cursor-pointer transition-transform hover:scale-125"
                        >
                          <circle
                            cx="95"
                            cy="85"
                            r="8"
                            fill={activeZoneId === 'reflex-spine' ? '#f59e0b' : '#44403c'}
                            stroke="#fff"
                            strokeWidth="1.5"
                          />
                          <text x="95" y="88" fontSize="7" fill="#000" textAnchor="middle" fontWeight="bold">CỘT</text>
                        </g>

                        {/* 4. Reflex Heart Lung (Ball of foot) */}
                        <g
                          onClick={() => setActiveZoneId('reflex-heart-lung')}
                          className="cursor-pointer transition-transform hover:scale-125"
                        >
                          <circle
                            cx="135"
                            cy="60"
                            r="8"
                            fill={activeZoneId === 'reflex-heart-lung' ? '#f59e0b' : '#44403c'}
                            stroke="#fff"
                            strokeWidth="1.5"
                          />
                          <text x="135" y="63" fontSize="7" fill="#000" textAnchor="middle" fontWeight="bold">TIM</text>
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Foot navigation helper note */}
                  <div className="flex items-center justify-between z-10 text-[11px] font-mono text-stone-400">
                    <span>Nhấp vào các vòng tròn KI1, LR3, CỘT, TIM trên bàn chân để xem chi tiết</span>
                    <span className="text-amber-400">{activeZone.chineseName}</span>
                  </div>
                </div>

                {/* Thermal Heating Mode Pills */}
                <div className="mt-5">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Nhiệt Độ Sưởi Hồng Ngoại Sỏi Suối:
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setHeatingMode('cooling-24')}
                      className={cn(
                        'rounded-xl border p-2.5 text-left transition-all',
                        heatingMode === 'cooling-24'
                          ? 'border-teal-500/80 bg-teal-500/10 text-stone-100 shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">24°C Tự Nhiên</div>
                      <div className="mt-0.5 text-[10px] text-teal-400">Mát lạnh lòng suối rừng</div>
                    </button>

                    <button
                      onClick={() => setHeatingMode('gentle-35')}
                      className={cn(
                        'rounded-xl border p-2.5 text-left transition-all',
                        heatingMode === 'gentle-35'
                          ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">35°C Ấm Dịu</div>
                      <div className="mt-0.5 text-[10px] text-amber-400">Thư giãn tĩnh tâm sau giờ làm</div>
                    </button>

                    <button
                      onClick={() => setHeatingMode('deep-39')}
                      className={cn(
                        'rounded-xl border p-2.5 text-left transition-all',
                        heatingMode === 'deep-39'
                          ? 'border-rose-500/80 bg-rose-500/10 text-stone-100 shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">39°C Trị Liệu Sâu</div>
                      <div className="mt-0.5 text-[10px] text-rose-400">Kích hoạt tuần hoàn &amp; ngủ ngon</div>
                    </button>
                  </div>
                </div>

                {/* Detailed Zone Description */}
                <div className="mt-5 rounded-xl border border-stone-800 bg-stone-900/50 p-4">
                  <div className="text-xs text-stone-400 leading-relaxed">
                    <span className="font-semibold text-stone-200">Vị trí huyệt đạo: </span>
                    {activeZone.location}
                  </div>
                  <div className="mt-2 text-xs text-stone-300 font-light leading-relaxed">
                    <span className="font-semibold text-amber-400">Công hiệu phục hồi: </span>
                    {activeZone.medicalBenefit}
                  </div>
                  <div className="mt-2 text-xs text-stone-400 font-light border-t border-stone-800/80 pt-2">
                    <span className="font-medium text-emerald-400">Kích thích nhiệt hồng ngoại: </span>
                    {activeZone.thermalStimulation}
                  </div>
                </div>
              </div>

              {/* Herb Footbath & Handrail Feature Highlights */}
              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-2.5">
                    <div className="text-amber-400 font-medium">Máng Ngâm Thảo Mộc Tự Nhiên</div>
                    <p className="mt-1 text-[11px] text-stone-400 font-light">
                      Nước ấm hòa quyện hoa hồi Lạng Sơn, quế Trà Bồng và tinh dầu sả chanh khử khuẩn, làm ấm lòng bàn chân.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-2.5">
                    <div className="text-amber-400 font-medium">Tay Vịn Gỗ Gõ Đỏ Nam Phi</div>
                    <p className="mt-1 text-[11px] text-stone-400 font-light">
                      Cột trụ và tay vịn bo tròn 45mm vững chãi, đảm bảo an toàn tuyệt đối cho người lớn tuổi khi bước chân trên sỏi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Custom Walkway Planning Form */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                  Thiết Kế May Đo Lối Đi Sỏi Dưỡng Sinh
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Tùy biến kích thước và không gian lắp đặt theo kiến trúc cảnh quan:
                </p>

                {submitted ? (
                  <div className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 text-center">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                      ✓
                    </div>
                    <h4 className="mt-2 text-sm font-serif text-emerald-200">
                      Hồ Sơ Thiết Kế Đã Được Tiếp Nhận
                    </h4>
                    <p className="mt-1.5 text-xs text-stone-400 font-light leading-relaxed">
                      KTS Cảnh quan GuHomes sẽ liên hệ gửi bản vẽ 3D phân bổ mật độ sỏi cuội và thông số hệ sưởi hồng ngoại cho quý khách:
                    </p>
                    <div className="mt-3 inline-block rounded bg-stone-900 border border-amber-500/40 px-3 py-1 font-mono text-xs text-amber-300 font-semibold tracking-wider">
                      MÃ ƯU ĐÃI: {vipPasscode}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                    <div>
                      <label className="text-xs text-stone-300 font-medium block">
                        Khu Vực Lắp Đặt Dự Kiến:
                      </label>
                      <select
                        value={installationArea}
                        onChange={(e) => setInstallationArea(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="Vườn nhiệt đới biệt thự">Vườn nhiệt đới biệt thự mặt đất</option>
                        <option value="Ban công Sky Villa Penthouse">Ban công Sky Villa Penthouse</option>
                        <option value="Phòng tắm Master Onsen Suite">Phòng tắm Master Onsen Suite</option>
                        <option value="Lối dạo ven hồ bơi & Pavilion">Lối dạo ven hồ bơi &amp; Pavilion</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <label htmlFor="walkway-length-range" className="text-stone-300 font-medium">Chiều Dài Lối Dạo Bộ Sỏi:</label>
                        <span className="font-mono text-amber-400 font-bold">{walkwayLength} mét</span>
                      </div>
                      <input
                        id="walkway-length-range"
                        type="range"
                        min={3}
                        max={15}
                        step={1}
                        value={walkwayLength}
                        onChange={(e) => setWalkwayLength(Number(e.target.value))}
                        className="mt-2 h-1.5 w-full appearance-none rounded-lg bg-stone-800 accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                        <span>3m (Gọn gàng)</span>
                        <span>8m (Tiêu chuẩn)</span>
                        <span>15m (Đại dinh thự)</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-stone-300 font-medium block">
                        Số Điện Thoại Nhận Khảo Sát Tận Nơi:
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
                        <span>Đặc quyền thi công:</span>
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
                ✓ 100% sỏi cuội suối tự nhiên được tuyển lựa thủ công, xử lý bo tròn cạnh sắc, đảm bảo cảm giác tỳ đè kích thích êm ái mà không gây đau rát da chân.
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-300">
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">01 / SỎI SUỐI TÂY NGUYÊN</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Chọn Lọc Khắc Khe Từng Viên</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Nguồn sỏi cuội tự nhiên hình thành qua triệu năm dưới lòng suối đại ngàn. Bề mặt trơn mịn tuyệt đối, độ cứng khoáng vật cao, giữ nhiệt lâu và kháng rêu mốc ẩm ướt nhiệt đới.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">02 / MÀNG HỒNG NGOẠI CARBON</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Sưởi Ấm An Toàn Tuyệt Đối</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Hệ thống dây nhiệt bọc carbon cách điện chuẩn IP68 chống ngập nước mùa mưa Sài Gòn. Tích hợp cảm biến nhiệt độ tự ngắt chống quá nhiệt và tiết kiệm điện năng thông minh.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">03 / KHÍ THẢO MỘC AN DƯỠNG</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Hồi Quế & Sả Chanh</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Hơi ấm bốc lên từ mặt sỏi mang theo tinh dầu thảo dược giúp làm thông thoáng đường thở, xua đuổi côn trùng và kiến tạo không gian thiền định sân vườn thanh tao.
            </p>
          </div>
        </div>

        {/* Contact and Woodshop Visit */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Trải nghiệm cảm giác bước chân trên sỏi suối mẫu tại{' '}
            <span className="font-medium text-stone-200">Vườn Mẫu GuHomes (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Đăng ký tham quan vườn mẫu</span>
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
