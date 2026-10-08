'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type LightCycle = 'dawn' | 'noon' | 'moonlight'

interface LightCycleInfo {
  id: LightCycle
  title: string
  colorTemp: string
  parValue: string
  spectrum: string
  description: string
  glowClass: string
}

const LIGHT_CYCLES: Record<LightCycle, LightCycleInfo> = {
  dawn: {
    id: 'dawn',
    title: 'Bình Minh Thức Giấc (2700K)',
    colorTemp: '2700K Vàng Ấm',
    parValue: '85 µmol/m²/s',
    spectrum: 'Quang phổ bước sóng đỏ 660nm kích hoạt tế bào rễ',
    description: 'Ánh sáng êm dịu sưởi ấm giọt sương đêm, đánh thức khí khổng lá mở ra trao đổi dưỡng chất vi sinh.',
    glowClass: 'from-amber-400/20 via-stone-900 to-black',
  },
  noon: {
    id: 'noon',
    title: 'Quang Hợp Đỉnh Cao (5000K)',
    colorTemp: '5000K Trắng Tự Nhiên',
    parValue: '210 µmol/m²/s',
    spectrum: 'Full-Spectrum CRI 97 giả lập tán rừng mưa xích đạo',
    description: 'Thúc đẩy diệp lục tạo đường và tinh bột, duy trì sắc trắng ngọc bích của mảng đột biến lá Variegata.',
    glowClass: 'from-emerald-400/20 via-stone-900 to-black',
  },
  moonlight: {
    id: 'moonlight',
    title: 'Thư Giãn Ánh Trăng (4000K)',
    colorTemp: '4000K Ánh Trăng Dịu',
    parValue: '25 µmol/m²/s',
    spectrum: 'Phổ ánh sáng sinh học ban đêm chống suy thoái tế bào',
    description: 'Không gian tĩnh lặng cho cây nghỉ ngơi, sương nano 2 micron duy trì độ ẩm bề mặt phiến lá suốt đêm.',
    glowClass: 'from-sky-400/15 via-stone-900 to-black',
  },
}

interface PlantSpecimen {
  id: string
  commonName: string
  scientificName: string
  origin: string
  variegationType: string
  rarityLevel: string
  careRequirement: string
  chlorophyllDetail: string
}

const SPECIMENS: PlantSpecimen[] = [
  {
    id: 'monstera-albo',
    commonName: 'Monstera Deliciosa Borsigiana Albo',
    scientificName: 'Monstera deliciosa var. borsigiana',
    origin: 'Rừng nhiệt đới Trung Mỹ',
    variegationType: 'Chimerical Sectoral & Marbled White',
    rarityLevel: 'Đột biến bạch tạng tự nhiên cực hiếm',
    careRequirement: 'Độ ẩm 80% — 85% RH, giá thể vỏ thông New Zealand',
    chlorophyllDetail: 'Mảng trắng tinh khiết không có diệp lục, phụ thuộc vào vùng xanh đậm quang hợp bù trừ.',
  },
  {
    id: 'spiritus-sancti',
    commonName: 'Philodendron Spiritus Sancti',
    scientificName: 'Philodendron spiritus-sancti',
    origin: 'Espírito Santo, Brazil (Độ cao 800m)',
    variegationType: 'Lá kiếm kiếm dài 80cm rủ quý phái',
    rarityLevel: 'Báu vật thánh địa kiểng lá Aroid thế giới',
    careRequirement: 'Nhiệt độ ổn định 24°C — 26°C, không đọng nước bề mặt',
    chlorophyllDetail: 'Cấu trúc biểu bì gân lá nổi bóng láng, mao dẫn nhựa sống nuôi cuống lá dài thướt tha.',
  },
  {
    id: 'cyathea-fern',
    commonName: 'Dương Xỉ Mộc Cổ Đại Sương Mù',
    scientificName: 'Cyathea contaminans (Wall. ex Hook.)',
    origin: 'Vườn quốc gia Bạch Mã, Thừa Thiên Huế',
    variegationType: 'Tán lá kim phức 3 tầng đối xứng',
    rarityLevel: 'Hóa thạch sống từ kỷ Jura',
    careRequirement: 'Sương siêu âm nano 24/7, mùn dừa hữu cơ ủ hoai',
    chlorophyllDetail: 'Tế bào bào tử xếp hàng triệu hạt li ti mặt sau lá, sinh ra ion âm thanh lọc không khí.',
  },
]

export function SaigonStainedGlassTerrariumConservatory({ className }: { className?: string }) {
  const componentId = useId()
  const [activeCycle, setActiveCycle] = useState<LightCycle>('noon')
  const [selectedPlantId, setSelectedPlantId] = useState<string>('monstera-albo')
  const [magnification, setMagnification] = useState<number>(2) // 1x, 2x, 4x
  const [mistActive, setMistActive] = useState<boolean>(true)

  const cycle = LIGHT_CYCLES[activeCycle]
  const currentPlant = SPECIMENS.find((p) => p.id === selectedPlantId) ?? SPECIMENS[0]!

  return (
    <section
      id={`terrarium-conservatory-${componentId}`}
      aria-label="Nhà kính kiểng lá nhiệt đới Terrarium Conservatory GuHomes"
      className={cn(
        'relative w-full overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-emerald-500/30 selection:text-emerald-200',
        className
      )}
    >
      {/* Background Ambient Botanical Lighting */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-b transition-all duration-1000 opacity-25',
          cycle.glowClass
        )}
      />

      <div className="relative mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-6 border-b border-stone-800/80 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              01 / HỆ SINH THÁI THU NHỎ BIOPHILIC SANCTUARY
            </div>
            <h2 className="mt-5 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl leading-tight">
              Nhà Kính Mini Bảo Tồn Kiểng Lá Quý Hiếm &amp; Vi Khí Hậu Rừng Mưa
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-stone-400 lg:text-lg">
              Khuôn viên nhà kính thủ công khung đồng thau xước mờ liên kết kính siêu trong Low-Iron có lớp sưởi điện trở
              ngầm chống đọng sương mờ. Hệ thống kiểm soát vi khí hậu khép kín: nhiệt độ 24°C - 26°C, độ ẩm 80% - 85% RH,
              béc sương siêu âm nano 2 micron cùng đèn LED Full-Spectrum 4000K CRI 97 nuôi dưỡng những tạo tác lá quý
              hiếm giữa lòng biệt thự phố thị.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm lg:min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>VI KHÍ HẬU TERRARIUM</span>
              <span className="text-emerald-400 font-bold">KHÉP KÍN 100%</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">NHIỆT ĐỘ KHÍ</span>
                <span className="font-mono text-base font-medium text-emerald-300">25.2°C</span>
              </div>
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">ĐỘ ẨM KHÍ QUYỂN</span>
                <span className="font-mono text-base font-medium text-emerald-300">83.5% RH</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 italic">
              * Béc phun sương siêu âm nano 2 micron không làm ướt mặt sàn gỗ nội thất.
            </div>
          </div>
        </div>

        {/* Section 1: Chu Kỳ Chiếu Sáng Quang Hợp & Điều Khiển Cảm Biến */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Specimen Explorer & Magnifier (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    BẢO TỒN NGUYÊN VẸN NGUỒN GEN QUÝ
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-light text-stone-100">
                    Báu Vật Kiểng Lá &amp; Cấu Trúc Đột Biến Diệp Lục
                  </h3>
                </div>
                {/* Mist Toggle */}
                <button
                  type="button"
                  onClick={() => setMistActive(!mistActive)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-mono transition-all border min-h-[44px]',
                    mistActive
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-stone-800 bg-stone-900 text-stone-400'
                  )}
                >
                  {mistActive ? 'SƯƠNG NANO: BẬT' : 'SƯƠNG NANO: TẮT'}
                </button>
              </div>

              {/* Plant Selectors */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {SPECIMENS.map((plant) => {
                  const isSelected = plant.id === selectedPlantId
                  return (
                    <button
                      key={plant.id}
                      type="button"
                      onClick={() => setSelectedPlantId(plant.id)}
                      className={cn(
                        'flex flex-col justify-between rounded-xl p-4 text-left transition-all duration-300 border min-h-[130px]',
                        isSelected
                          ? 'border-emerald-500/70 bg-emerald-950/20 shadow-lg ring-1 ring-emerald-500/40'
                          : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                      )}
                    >
                      <div>
                        <span className="text-[11px] font-mono text-stone-500 block truncate">
                          {plant.scientificName}
                        </span>
                        <h4 className="mt-1 font-serif text-sm font-medium text-stone-200 line-clamp-2">
                          {plant.commonName}
                        </h4>
                      </div>
                      <div className="mt-3 text-[10px] font-mono text-emerald-400 border border-emerald-900/40 rounded px-1.5 py-0.5 inline-block">
                        {plant.origin.split(',')[0]}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Simulated Microscopic Leaf Structure & Magnifier */}
              <div className="relative my-8 flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950">
                {/* Terrarium Glass Frame Silhouette */}
                <div className="absolute inset-2 rounded-lg border border-amber-600/30 pointer-events-none" />

                {/* Ultrasonic Mist Overlay */}
                {mistActive && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-white/5 to-transparent backdrop-blur-[0.5px] animate-pulse" />
                )}

                {/* Leaf Visual Representation */}
                <div
                  style={{
                    transform: `scale(${magnification === 4 ? 1.6 : magnification === 2 ? 1.25 : 1})`,
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className="relative z-10 flex flex-col items-center"
                >
                  {/* Stem and Leaf Shape */}
                  <div className="relative h-36 w-32 rounded-tr-[70px] rounded-bl-[70px] rounded-tl-2xl rounded-br-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-950 shadow-2xl border border-emerald-600/40 overflow-hidden flex items-center justify-center">
                    {/* Variegation Sectoral Patch (White marble) */}
                    {selectedPlantId === 'monstera-albo' && (
                      <div className="absolute top-0 right-0 h-28 w-16 bg-gradient-to-bl from-white via-stone-100 to-emerald-100/30 opacity-90 rounded-bl-[40px]" />
                    )}

                    {/* Leaf Veins */}
                    <div className="h-full w-0.5 bg-emerald-400/40 shadow-sm" />
                    <div className="absolute left-6 h-0.5 w-12 bg-emerald-400/30 rotate-45" />
                    <div className="absolute right-6 h-0.5 w-12 bg-emerald-400/30 -rotate-45" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 mt-2">
                    SOi CẤU TRÚC: {magnification}X QUANG HỌC
                  </span>
                </div>

                {/* Magnifier Zoom Selector in corner */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg border border-stone-800 bg-stone-900/90 p-1">
                  {[1, 2, 4].map((mag) => (
                    <button
                      key={mag}
                      type="button"
                      onClick={() => setMagnification(mag)}
                      className={cn(
                        'px-2.5 py-1 text-[11px] font-mono rounded transition-colors',
                        magnification === mag
                          ? 'bg-emerald-500 text-stone-950 font-bold'
                          : 'text-stone-400 hover:text-stone-200'
                      )}
                    >
                      {mag}X
                    </button>
                  ))}
                </div>
              </div>

              {/* Plant Detail Summary Card */}
              <div className="space-y-3 rounded-xl border border-stone-800/80 bg-stone-950/70 p-5 text-xs">
                <div className="flex justify-between items-center border-b border-stone-800/60 pb-2.5">
                  <span className="font-serif text-base text-emerald-200">{currentPlant.commonName}</span>
                  <span className="font-mono text-[11px] text-amber-300">{currentPlant.rarityLevel}</span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <span className="text-stone-500 block font-mono text-[11px]">DẠNG BIẾN DỊ:</span>
                    <span className="text-stone-300">{currentPlant.variegationType}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block font-mono text-[11px]">CHẾ ĐỘ CHĂM SÓC:</span>
                    <span className="text-stone-300">{currentPlant.careRequirement}</span>
                  </div>
                </div>
                <p className="text-stone-400 font-light leading-relaxed pt-1">{currentPlant.chlorophyllDetail}</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Lighting Cycles & Environmental Sensors (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/80 p-8 lg:col-span-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  CHU KỲ CHIẾU SÁNG SINH HỌC
                </span>
                <span className="text-xs font-mono text-stone-500">CRI 97</span>
              </div>

              <h4 className="mt-4 font-serif text-xl font-light text-stone-100">
                Quang Kỳ Tự Nhiên Giả Lập Rừng Mưa Nhiệt Đới
              </h4>
              <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                Đèn LED chuyên dụng dải màu đỏ vi lượng 660nm và xanh lam 450nm tối ưu hóa tổng hợp ATP trong tế bào
                thực vật, không tạo nhiệt nóng gây cháy viền lá.
              </p>

              {/* Light Cycle Toggles */}
              <div className="mt-5 space-y-3">
                {(Object.keys(LIGHT_CYCLES) as LightCycle[]).map((cycleKey) => {
                  const lc = LIGHT_CYCLES[cycleKey]
                  const isSelected = activeCycle === cycleKey
                  return (
                    <button
                      key={lc.id}
                      type="button"
                      onClick={() => setActiveCycle(cycleKey)}
                      className={cn(
                        'w-full flex flex-col rounded-xl p-3.5 text-left transition-all border text-xs min-h-[64px]',
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/30 ring-1 ring-emerald-400/40 shadow-md'
                          : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <strong className="text-stone-200 font-serif text-sm">{lc.title}</strong>
                        <span className="font-mono text-emerald-300 text-[11px]">{lc.parValue}</span>
                      </div>
                      <span className="text-[11px] text-stone-400 mt-1">{lc.spectrum}</span>
                    </button>
                  )
                })}
              </div>

              {/* Real-time Environmental Biosensors */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/90 p-4 space-y-2.5 text-xs">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                  CẢM BIẾN VI KHÍ HẬU IOT KẾT NỐI SMART HOME
                </span>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Cường Độ Ánh Sáng PAR:</span>
                  <span className="font-mono font-medium text-amber-300">{cycle.parValue}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Nồng Độ Khí CO2:</span>
                  <span className="font-mono font-medium text-emerald-400">760 ppm (Tối ưu quang hợp)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Kính Siêu Trong Low-Iron:</span>
                  <span className="font-mono font-medium text-stone-200">Độ truyền sáng 99.2%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-400">Khung Tủ Kim Loại:</span>
                  <span className="font-mono font-medium text-amber-200">Đồng Thau Xước C36000</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-800 pt-4 text-xs font-mono text-stone-500 flex items-center justify-between">
              <span>HỆ THỐNG TỰ ĐỘNG CHÂM NƯỚC RO</span>
              <span className="text-emerald-400 font-medium">BẢO TRÌ ĐỊNH KỲ 6 THÁNG</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 lg:p-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h4 className="font-serif text-xl font-light text-stone-100">
              Đặt chế tác tủ Terrarium kiểng lá may đo theo kích thước góc phòng khách của bạn
            </h4>
            <p className="mt-1 text-xs text-stone-400 font-light">
              Kỹ sư cảnh quan GuHomes tư vấn chọn lọc mẫu cây phù hợp thói quen sinh hoạt và hướng nắng căn hộ.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-5 py-2.5 text-xs font-medium text-stone-950 transition-colors hover:bg-stone-200 min-h-[44px]"
            >
              <span>Tư vấn Terrarium riêng</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-5 py-2.5 text-xs font-medium text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100 min-h-[44px]"
            >
              <span>Xem dự toán trọn gói</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
