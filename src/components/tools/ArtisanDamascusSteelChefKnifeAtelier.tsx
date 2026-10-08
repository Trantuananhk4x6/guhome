'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type KnifeId = 'gyuto' | 'santoku' | 'yanagiba' | 'nakiri' | 'petty'
type DamascusPattern = 'feather' | 'raindrop' | 'twist'

interface KnifeProfile {
  id: KnifeId
  name: string
  japaneseName: string
  length: string
  weight: string
  steelType: string
  bevel: string
  purpose: string
  description: string
  handleMaterial: string
}

const KNIFE_PROFILES: Record<KnifeId, KnifeProfile> = {
  gyuto: {
    id: 'gyuto',
    name: 'Dao Đầu Bếp Đa Năng Gyuto',
    japaneseName: '牛刀 - Gyuto 210mm',
    length: '210 mm (Tổng dài 355 mm)',
    weight: '185 gram (Cân bằng trọng tâm hoàn hảo)',
    steelType: '128 lớp VG-10 Core Damascus (62 HRC)',
    bevel: 'Mài vát kép 50/50 - Góc mài 15° mỗi bên',
    purpose: 'Thái cắt đa năng: Phi lê thịt đỏ, cá hồi, rau củ khối lớn',
    description: 'Vũ khí chủ lực của bếp trưởng. Độ cong lưỡi vừa phải cho phép kỹ thuật lắc dao trơn tru, lưỡi cắt lướt ngọt ngào không xé rách tế bào thực phẩm.',
    handleMaterial: 'Gỗ Mun Sừng Khánh Hòa đen bóng, khâu ngọc bích viền đồng thau nguyên khối.',
  },
  santoku: {
    id: 'santoku',
    name: 'Dao Ba Đức Tính Santoku',
    japaneseName: '三徳 - Santoku 180mm',
    length: '180 mm (Tổng dài 320 mm)',
    weight: '165 gram',
    steelType: '128 lớp VG-10 Core Damascus (62 HRC)',
    bevel: 'Mài vát kép 50/50 - Góc mài 15°',
    purpose: 'Ba công năng hoàn hảo: Thịt, Cá và Rau củ quả',
    description: 'Thiết kế cân xứng gọn nhẹ cho bữa tiệc gia đình. Mũi dao chúc nhẹ xuống tạo sự an toàn và kiểm soát tuyệt đối khi thái ấn (push-cut).',
    handleMaterial: 'Gỗ Mun Sừng quý hiếm, giác gỗ bát giác bo góc công thái học.',
  },
  yanagiba: {
    id: 'yanagiba',
    name: 'Dao Lưỡi Liễu Sashimi Yanagiba',
    japaneseName: '柳刃 - Yanagiba 270mm',
    length: '270 mm (Tổng dài 420 mm)',
    weight: '195 gram',
    steelType: '128 lớp Thép Damascus lõi Aogami Super Blue (63 HRC)',
    bevel: 'Lưỡi đơn diện Kataba 100/0 - Góc mài 12°',
    purpose: 'Cắt lát Sashimi cá ngừ O-Toro, cá hồi tơ, bò Wagyu A5',
    description: 'Lưỡi dao thon dài như lá liễu. Một đường kéo dứt khoát từ gốc tới ngọn giữ nguyên từng thớ cá bóng bẩy lấp lánh như gương soi.',
    handleMaterial: 'Mun sừng mài bóng mờ thủ công, chốt tán đinh khảm hoa đồng Mosaic.',
  },
  nakiri: {
    id: 'nakiri',
    name: 'Dao Bản Vuông Thái Rau Nakiri',
    japaneseName: '菜切り - Nakiri 165mm',
    length: '165 mm (Tổng dài 305 mm)',
    weight: '175 gram',
    steelType: '128 lớp VG-10 Damascus (61 HRC)',
    bevel: 'Mài vát đối xứng mỏng 0.2mm tại lưỡi cắt',
    purpose: 'Băm nhuyễn, thái sợi chỉ rau củ, thái hạt lựu tốc độ cao',
    description: 'Bản dao chữ nhật rộng hỗ trợ xúc chuyển nguyên liệu nhanh chóng lên chảo. Lưỡi dao chạm phẳng đều mặt thớt gỗ Teak không sót sợi xơ.',
    handleMaterial: 'Gỗ Mun ghép chỉ ngọc bích tuyết, chống trơn trượt khi tay ướt.',
  },
  petty: {
    id: 'petty',
    name: 'Dao Gọt Tỉa Tinh Vi Petty',
    japaneseName: 'ペティ - Petty 135mm',
    length: '135 mm (Tổng dài 250 mm)',
    weight: '85 gram (Siêu nhẹ linh hoạt)',
    steelType: '128 lớp Damascus Thụy Điển mác thép Damasteel (62 HRC)',
    bevel: 'Mài vát kép 14°',
    purpose: 'Gọt vỏ hoa quả tinh tế, tỉa hoa decor tiệc, lọc xương gà tơ',
    description: 'Cực kỳ khéo léo trong lòng bàn tay. Lưỡi dao thanh mảnh luồn lách qua các góc cạnh phức tạp của rau củ quả một cách nhẹ bẫng.',
    handleMaterial: 'Cán gỗ Mun mini phối đai đồng mạ vàng hồng 18K.',
  },
}

const DAMASCUS_PATTERNS: Record<DamascusPattern, { name: string; subtitle: string; visualDesc: string; forgingMethod: string }> = {
  feather: {
    name: 'Vân Lông Vũ (Feather Pattern)',
    subtitle: 'Đỉnh cao kỹ thuật rèn gấp đối xứng',
    visualDesc: 'Các lớp thép xếp lớp đối xứng qua một trục sống lưng uốn lượn như cánh chim phượng hoàng, tạo hiệu ứng phản chiếu ánh sáng ba chiều sống động.',
    forgingMethod: 'Phôi thép 128 lớp được chém đôi theo trục dọc bằng nêm nhiệt độ cao rồi ép phẳng lại để bộc lộ các vân rẽ xương cá.',
  },
  raindrop: {
    name: 'Vân Giọt Nước (Raindrop Pattern)',
    subtitle: 'Mưa rào mùa hạ trên mặt hồ tĩnh lặng',
    visualDesc: 'Hàng trăm xoáy tròn đồng tâm nhỏ li ti phân bổ ngẫu nhiên trên lưỡi dao, mang cảm giác yên bình và tự nhiên như sỏi đá đáy suối.',
    forgingMethod: 'Khoan các điểm lõm hình nón nông trên bề mặt phôi nóng rồi rèn phẳng mài lộ cấu trúc đa tầng.',
  },
  twist: {
    name: 'Vân Xoắn Mộc Lôi (Twist Pattern)',
    subtitle: 'Sức mạnh phong ba vặn xoắn 1200°C',
    visualDesc: 'Các dải thép đen và bạc bện chặt xoắn ốc như dòng thác cuồn cuộn qua khe đá đại ngàn, thể hiện sự mạnh mẽ và kiên cường.',
    forgingMethod: 'Phôi thép nung đỏ ở 1.200°C được vặn xoắn 8 vòng trên trục quay trước khi rèn định hình lưỡi dao.',
  },
}

export function ArtisanDamascusSteelChefKnifeAtelier({ className }: { className?: string } = {}) {
  const [selectedKnife, setSelectedKnife] = useState<KnifeId>('gyuto')
  const [selectedPattern, setSelectedPattern] = useState<DamascusPattern>('feather')
  const [sharpeningAngle, setSharpeningAngle] = useState<number>(15)
  const [paperCutTested, setPaperCutTested] = useState<boolean>(false)
  
  // Custom engraving inquiry form
  const [engravingText, setEngravingText] = useState<string>('Gia Tộc Nguyễn Đăng')
  const [engravingMotif, setEngravingMotif] = useState<string>('Hoa Sen Thanh Tịnh')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const vipPasscode = 'GU-KNIFE-2026-X'
  const activeKnife = KNIFE_PROFILES[selectedKnife]
  const activePattern = DAMASCUS_PATTERNS[selectedPattern]

  // Calculate sharpness score based on sharpening angle
  // 15 degrees is Japanese laser razor standard (BESS ~110-130g)
  const bessScore = Math.round(95 + Math.abs(sharpeningAngle - 15) * 18)

  const handleTestPaperCut = () => {
    setPaperCutTested(true)
    setTimeout(() => {
      setPaperCutTested(false)
    }, 3500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      aria-label="Xưởng Dao Bếp Thủ Công Thép Damascus 128 Lớp"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 h-96 w-96 rounded-full bg-amber-600/10 blur-[130px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-slate-800/40 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Tuyệt Kỹ Rèn Thép Thủ Công
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Xưởng Dao Bếp Damascus 128 Lớp Cán Gỗ Mun Sừng
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Vũ khí nghệ thuật của căn bếp vương giả. Thép rèn đập thủ công 128 lớp đạt độ cứng 62 HRC, 
            cán dao gỗ Mun sừng và khâu ngọc bích đo ni đóng giày theo lòng bàn tay gia chủ, 
            kết hợp giá treo từ tính âm tường veneer óc chó và thẻ bảo dưỡng mài bén trọn đời.
          </p>
        </div>

        {/* Interactive Blade Showcase Console */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Knife Visualizer & Interactive Specs */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      {activeKnife.japaneseName}
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {activeKnife.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-amber-400">{activeKnife.steelType.split(' ')[0]}</span>
                    <span>|</span>
                    <span className="font-semibold text-emerald-400">62 HRC</span>
                  </div>
                </div>

                {/* Damascus Blade Simulation Render Box */}
                <div className="relative mt-6 h-56 sm:h-64 w-full overflow-hidden rounded-xl border border-stone-800/90 bg-gradient-to-br from-stone-950 via-stone-900 to-black p-4 flex flex-col justify-between">
                  {/* Pattern water ripple background texture */}
                  <div className="pointer-events-none absolute inset-0 opacity-20">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="damascus-lines" width="40" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 0,10 Q 10,0 20,10 T 40,10" fill="none" stroke="#d4af37" strokeWidth="0.7" />
                          <path d="M 0,18 Q 10,8 20,18 T 40,18" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#damascus-lines)" />
                    </svg>
                  </div>

                  {/* Top info badge inside preview */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-700/80 px-2.5 py-1 text-xs text-amber-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Vân Rèn: {activePattern.name}
                    </div>
                    <span className="font-mono text-xs text-stone-400">
                      Vát Cạnh: {activeKnife.bevel}
                    </span>
                  </div>

                  {/* Stylized Blade SVG Illustration */}
                  <div className="relative z-10 my-auto flex items-center justify-center">
                    <div className="relative w-full max-w-md h-20 flex items-center">
                      {/* Wooden handle */}
                      <div className="w-1/4 h-8 rounded-l-md bg-gradient-to-r from-stone-950 via-stone-900 to-stone-800 border-y border-l border-amber-900/60 shadow-lg flex items-center justify-center relative">
                        <div className="w-2 h-8 bg-amber-500/40 absolute right-0" title="Khâu ngọc bích và đai đồng" />
                        <span className="text-[10px] font-mono text-stone-400">Mun Sừng</span>
                      </div>
                      {/* Damascus Blade */}
                      <div className="w-3/4 h-12 rounded-r-3xl bg-gradient-to-r from-stone-300 via-stone-200 to-stone-400 border border-stone-400/80 shadow-2xl relative overflow-hidden flex items-center px-4">
                        {/* Shimmer light streak */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                        {/* Custom Engraving on blade */}
                        <div className="relative z-10 font-serif text-[11px] text-stone-800/90 italic tracking-wider font-semibold">
                          {engravingText || 'GuHomes Master Edition'} • {engravingMotif}
                        </div>
                        {/* Sharp edge highlight line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-200 shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                      </div>
                    </div>
                  </div>

                  {/* Paper cut test notification */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-mono">
                      Chiều dài: {activeKnife.length} • Khối lượng: {activeKnife.weight}
                    </span>
                    {paperCutTested && (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-mono font-medium animate-bounce">
                        ✓ Cắt giấy lụa mượt mà không khựng (BESS: {bessScore}g)
                      </span>
                    )}
                  </div>
                </div>

                {/* Pattern Selector Pills */}
                <div className="mt-5">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Chọn Hoa Văn Thép 128 Lớp Rèn Thủ Công:
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(Object.keys(DAMASCUS_PATTERNS) as DamascusPattern[]).map((patternKey) => {
                      const p = DAMASCUS_PATTERNS[patternKey]
                      const isSelected = selectedPattern === patternKey
                      return (
                        <button
                          key={patternKey}
                          onClick={() => setSelectedPattern(patternKey)}
                          className={cn(
                            'rounded-xl border p-2.5 text-left transition-all',
                            isSelected
                              ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm shadow-amber-900/30'
                              : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                          )}
                        >
                          <div className="text-xs font-medium text-stone-200">{p.name.split('(')[0]}</div>
                          <div className="mt-0.5 text-[10px] text-stone-400 line-clamp-1">{p.subtitle}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Detailed Blade Description */}
                <div className="mt-5 rounded-xl border border-stone-800 bg-stone-900/50 p-4">
                  <div className="text-xs text-stone-400 leading-relaxed">
                    <span className="font-semibold text-stone-200">Công năng: </span>
                    {activeKnife.purpose}
                  </div>
                  <div className="mt-2 text-xs text-stone-300 font-light leading-relaxed">
                    {activeKnife.description}
                  </div>
                  <div className="mt-2 text-xs text-amber-300/90 font-light border-t border-stone-800/80 pt-2">
                    <span className="font-medium text-amber-400">Chuôi dao: </span>
                    {activeKnife.handleMaterial}
                  </div>
                </div>
              </div>

              {/* Angle simulator and Paper Test Trigger */}
              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <label htmlFor="sharpening-angle-range" className="text-xs uppercase tracking-wider text-stone-400 font-mono block">
                      Góc Mài Lưỡi Kép (Chuẩn Nhật 15°): <span className="font-bold text-amber-400">{sharpeningAngle}°</span>
                    </label>
                    <input
                      id="sharpening-angle-range"
                      type="range"
                      min={10}
                      max={25}
                      step={1}
                      value={sharpeningAngle}
                      onChange={(e) => setSharpeningAngle(Number(e.target.value))}
                      className="mt-2 h-1.5 w-44 sm:w-56 appearance-none rounded-lg bg-stone-800 accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleTestPaperCut}
                    className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-xs font-medium text-amber-300 hover:bg-amber-500/30 transition-colors"
                  >
                    <span>Kiểm tra Cắt Giấy Lụa (Test Cut)</span>
                    <span className="rounded bg-stone-900 px-1.5 py-0.5 font-mono text-[10px] text-amber-400">
                      {bessScore}g BESS
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 cols: 5 Knife Selection & Bespoke Laser Inscription Form */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                  Bộ 5 Kiệt Tác Dao Bếp Damascus
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Lựa chọn dáng dao để trải nghiệm công năng chuyên biệt:
                </p>

                {/* 5 Knives List */}
                <div className="mt-4 space-y-2">
                  {(Object.keys(KNIFE_PROFILES) as KnifeId[]).map((knifeId) => {
                    const knife = KNIFE_PROFILES[knifeId]
                    const isSelected = selectedKnife === knifeId
                    return (
                      <button
                        key={knifeId}
                        onClick={() => setSelectedKnife(knifeId)}
                        className={cn(
                          'w-full flex items-center justify-between rounded-xl border p-3 text-left transition-all',
                          isSelected
                            ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm'
                            : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-semibold text-stone-200 truncate">
                            {knife.name}
                          </div>
                          <div className="text-[11px] text-stone-400 truncate">
                            {knife.japaneseName} • {knife.length.split(' ')[0]}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-mono rounded bg-stone-800/90 px-1.5 py-0.5 text-amber-300">
                            {knife.weight.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Hidden Neodymium Magnetic Wall Rack Feature */}
                <div className="mt-4 rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Giá Treo Từ Tính Neodymium Âm Veneer Óc Chó
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400 font-light leading-relaxed">
                    Hệ nam châm đất hiếm N52 giấu kín sau phiến gỗ óc chó 3mm; dao tự định vị và hút dính êm ái, 
                    loại bỏ hoàn toàn trầy xước và giữ góc bén lưỡi dao vĩnh cửu.
                  </p>
                </div>
              </div>

              {/* Bespoke Inscription & Lifetime Kyoto Stone Maintenance Form */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                {submitted ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-center">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                      ✓
                    </div>
                    <h4 className="mt-2 text-sm font-serif text-emerald-200">
                      Đã Ghi Nhận Hồ Sơ Khắc Khắc Độc Bản
                    </h4>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Chuyên gia rèn thép GuHomes sẽ liên hệ gửi bản vẽ 3D laser cho quý khách và kích hoạt thẻ bảo dưỡng trọn đời:
                    </p>
                    <div className="mt-2 inline-block rounded bg-stone-900 border border-amber-500/40 px-3 py-1 font-mono text-xs text-amber-300 font-semibold tracking-wider">
                      MÃ THẺ: {vipPasscode}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="text-xs font-medium text-stone-300">
                      Đăng Ký Khắc Tên Gia Chủ & Bảo Dưỡng Trọn Đời:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-stone-400 uppercase font-mono block">
                          Tên/Ký Hiệu Khắc Laser
                        </label>
                        <input
                          type="text"
                          value={engravingText}
                          onChange={(e) => setEngravingText(e.target.value)}
                          placeholder="Ví dụ: Gia Tộc Nguyễn Đăng"
                          className="mt-1 w-full rounded-lg border border-stone-800 bg-stone-950 px-2.5 py-1.5 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-400 uppercase font-mono block">
                          Họa Tiết Phong Thủy
                        </label>
                        <select
                          value={engravingMotif}
                          onChange={(e) => setEngravingMotif(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-stone-800 bg-stone-950 px-2.5 py-1.5 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                        >
                          <option value="Hoa Sen Thanh Tịnh">Hoa Sen Thanh Tịnh</option>
                          <option value="Sóng Biển Seigaiha">Sóng Biển Seigaiha</option>
                          <option value="Rồng Phượng Vương Triều">Rồng Phượng Vương Triều</option>
                          <option value="Chữ Thọ Triện Khảm Bạc">Chữ Thọ Triện Khảm Bạc</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-stone-400 uppercase font-mono block">
                        Số Điện Thoại Nhận Bản Vẽ Thiết Kế
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        required
                        className="mt-1 w-full rounded-lg border border-stone-800 bg-stone-950 px-2.5 py-1.5 text-xs text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono text-[10px] text-amber-400/90">
                        Đặc Quyền: {vipPasscode}
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-medium text-stone-950 hover:bg-amber-400 transition-colors shadow-sm"
                      >
                        <span>Nhận Bản Vẽ & Thẻ VIP</span>
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Features of GuHomes Knife Atelier */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-300">
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">01 / RÈN ĐẬP THỦ CÔNG 128 LỚP</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Độ Cứng Hoàn Hảo 62 HRC</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Lõi thép siêu cứng VG-10 được bọc bởi 128 lớp thép carbon dẻo dai. Kỹ thuật tôi nhiệt chân không giữ lưỡi dao sắc bén gấp 5 lần thép công nghiệp thông thường.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">02 / CÔNG THÁI HỌC VƯƠNG GIẢ</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Cán Mun Sừng & Ngọc Bích</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Mỗi cán dao được gọt dũa thủ công theo kích thước đốt ngón tay gia chủ. Gỗ Mun sừng trơ với dầu mỡ, không mối mọt và càng cầm càng lên nước bóng quý giá.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-amber-400">03 / DỊCH VỤ KYOTO TRỌN ĐỜI</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Mài Bén Bằng Đá Nước Tự Nhiên</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Chuyên gia của GuHomes bảo dưỡng mài định kỳ 6 tháng/lần bằng bùn đá nước tự nhiên vùng Kyoto Nhật Bản, đưa góc vát về trạng thái sắc ngọt hoàn mỹ ban đầu.
            </p>
          </div>
        </div>

        {/* Direct Link to Consult & Woodshop Visit */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Trực tiếp trải nghiệm và cầm thử 5 mẫu dao tại{' '}
            <span className="font-medium text-stone-200">Xưởng mộc & Chế tác GuHomes (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Đặt lịch ghé xưởng chế tác</span>
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
