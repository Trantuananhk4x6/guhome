'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface NoteDetail {
  id: string
  name: string
  botanical: string
  origin: string
  scentProfile: string
  persistence: string
  rarity: string
  color: string
}

interface ScentTier {
  tier: 'top' | 'heart' | 'base'
  title: string
  vietnameseTitle: string
  timeSpan: string
  purpose: string
  notes: NoteDetail[]
}

const SCENT_TIERS: ScentTier[] = [
  {
    tier: 'top',
    title: 'Top Notes',
    vietnameseTitle: 'Nốt Hương Đầu — Sắc Thái Ban Mai',
    timeSpan: 'Tỏa hương: 15 — 30 phút đầu tiên',
    purpose: 'Cảm giác khai mở tinh khôi khi bước chân qua ngưỡng cửa, đánh thức giác quan bằng vị thanh mát nhiệt đới nhẹ nhàng.',
    notes: [
      {
        id: 'cam-thanh-tra',
        name: 'Cam Hương Thanh Trà Thủy Biều',
        botanical: 'Citrus grandis var. Hue',
        origin: 'Cố đô Huế, Việt Nam',
        scentProfile: 'Thanh khiết, lấp lánh nốt tinh dầu vỏ giòn, hậu ngọt thanh lịch tựa sương mai sông Hương.',
        persistence: '25 phút',
        rarity: 'Thu hoạch duy nhất vụ rằm tháng Bảy',
        color: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
      },
      {
        id: 'hoa-buoi-dien',
        name: 'Bạch Hoa Bưởi Đầu Cành',
        botanical: 'Citrus maxima Blossom',
        origin: 'Vườn cổ Hà Nội, Việt Nam',
        scentProfile: 'Mộc mạc, thanh tao, phảng phất hương vị ngõ xưa tĩnh lặng đón gió đầu mùa.',
        persistence: '35 phút',
        rarity: 'Chưng cất lôi cuốn hơi nước 48h sau hái',
        color: 'border-yellow-200/40 bg-yellow-200/10 text-yellow-200',
      },
      {
        id: 'chanh-san-tay-nam-bo',
        name: 'Lá Chanh Sần Kaffir Thảo Dược',
        botanical: 'Citrus hystrix Folium',
        origin: 'Vùng đồi Tri Tôn, An Giang',
        scentProfile: 'Cay nồng sắc bén, ấm nồng năng lượng dương, triệt tiêu ẩm mốc vi khí hậu nhiệt đới.',
        persistence: '20 phút',
        rarity: 'Lá non thu hái trước khi mặt trời lên',
        color: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
      },
    ],
  },
  {
    tier: 'heart',
    title: 'Heart Notes',
    vietnameseTitle: 'Nốt Hương Giữa — Linh Hồn Không Gian',
    timeSpan: 'Tỏa hương: 2 — 6 giờ bền bỉ',
    purpose: 'Chiều sâu kết nối xúc cảm gia đình, biến ngôi nhà thành tổ ấm an định với hương hoa trắng và thảo mộc êm dịu.',
    notes: [
      {
        id: 'lai-sa-dec',
        name: 'Hoa Lài Đêm Sa Đéc Thửa Riêng',
        botanical: 'Jasminum sambac Grandiflorum',
        origin: 'Làng hoa Sa Đéc, Đồng Tháp',
        scentProfile: 'Nồng nàn, gợi cảm, mượt mà như lụa Hà Đông, xoa dịu áp lực tinh thần sau ngày dài phố thị.',
        persistence: '4 — 5 giờ',
        rarity: 'Hái thủ công 21:00 lúc hoa hé nụ hàm tiếu',
        color: 'border-stone-200/40 bg-stone-200/10 text-stone-200',
      },
      {
        id: 'phong-lu-da-lat',
        name: 'Phong Lữ Thảo Rừng Thông Sương',
        botanical: 'Pelargonium graveolens',
        origin: 'Cao nguyên Langbiang, Đà Lạt',
        scentProfile: 'Thảo mộc thanh mát pha lẫn hương hoa hồng kiêu kỳ, mang vi khí hậu mát lạnh vào phòng khách.',
        persistence: '4 giờ',
        rarity: 'Canh tác hữu cơ độ cao 1.500m',
        color: 'border-rose-400/40 bg-rose-400/10 text-rose-300',
      },
      {
        id: 'thao-qua-tay-bac',
        name: 'Thảo Quả Rừng Già Hoàng Liên Sơn',
        botanical: 'Lanxangia tsaoko',
        origin: 'Dãy Fansipan, Lào Cai',
        scentProfile: 'Cay ấm sang trọng, hương khói vỏ khô, tạo sự chở che và bề thế cho không gian tiếp đón khách quý.',
        persistence: '6 giờ',
        rarity: 'Quả rừng già hong khói củi sồi tự nhiên',
        color: 'border-amber-600/40 bg-amber-600/10 text-amber-200',
      },
    ],
  },
  {
    tier: 'base',
    title: 'Base Notes',
    vietnameseTitle: 'Nốt Hương Cuối — Trầm Tích Thời Gian',
    timeSpan: 'Tỏa hương: 12 — 24 giờ lưu luyến',
    purpose: 'Nền tảng sang trọng trường tồn bám vào thớ gỗ gõ đỏ, rèm len và vách đá, định hình mã hương nhận diện gia tộc.',
    notes: [
      {
        id: 'tram-huong-ha-tinh',
        name: 'Trầm Hương Kiến Rừng Trầm Tự Nhiên',
        botanical: 'Aquilaria crassna Resin',
        origin: 'Vũ Quang, Hà Tĩnh',
        scentProfile: 'Ngọt sâu lắng, huyền bí, thanh tịnh thiền định, biểu tượng đỉnh cao của triết lý phong lưu Việt.',
        persistence: '18 — 24 giờ',
        rarity: 'Khai thác bền vững trầm kiến tự nhiên loại 1',
        color: 'border-amber-700/50 bg-amber-700/15 text-amber-400',
      },
      {
        id: 'tuyet-tung-atlas',
        name: 'Tuyết Tùng Núi Cao Ủ Thùng Sồi',
        botanical: 'Cedrus atlantica Aged Wood',
        origin: 'Rừng Atlas, Ma-rốc',
        scentProfile: 'Mộc mạc, thâm trầm, khô ráo tựa thư phòng cổ bọc da thuộc lưu trữ ngàn quyển cổ thư quý hiếm.',
        persistence: '16 giờ',
        rarity: 'Chưng cất từ thân gỗ lõi trên 80 năm tuổi',
        color: 'border-amber-800/50 bg-amber-800/15 text-amber-300',
      },
      {
        id: 'xa-huong-ambrette',
        name: 'Hạt Xạ Hương Thực Vật Hoàng Hôn',
        botanical: 'Abelmoschus moschatus Seed',
        origin: 'Vườn dược liệu miền Trung',
        scentProfile: 'Ấm da thịt, bùi béo ngọt nhẹ, làm cầu nối keo sơn gắn kết hòa quyện các tầng phân tử hương.',
        persistence: '24+ giờ',
        rarity: 'Hạt giống hữu cơ chiết xuất CO2 siêu tới hạn',
        color: 'border-orange-400/40 bg-orange-400/10 text-orange-200',
      },
    ],
  },
]

interface SpatialFormula {
  id: string
  spaceName: string
  subHeading: string
  recommendedTop: string
  recommendedHeart: string
  recommendedBase: string
  ratio: { top: number; heart: number; base: number }
  diffusionTemp: string
  character: string
  architecturalVibe: string
}

const SPATIAL_FORMULAS: SpatialFormula[] = [
  {
    id: 'foyer-grand',
    spaceName: 'Sảnh Đón & Không Gian Tiền Sảnh (Grand Foyer)',
    subHeading: 'Ấn tượng vị thế & Khai mở niềm kiêu hãnh gia chủ',
    recommendedTop: 'cam-thanh-tra',
    recommendedHeart: 'thao-qua-tay-bac',
    recommendedBase: 'tram-huong-ha-tinh',
    ratio: { top: 35, heart: 40, base: 25 },
    diffusionTemp: '21°C vi hạt khuếch tán lạnh',
    character: 'Khoáng đạt, rạng rỡ, đọng lại vị quyền uy của gỗ quý và cam sương.',
    architecturalVibe: 'Đồng điệu cùng vách đá cẩm thạch Calacatta vòm giếng trời cao 7.5m.',
  },
  {
    id: 'salon-honneur',
    spaceName: 'Đại Phòng Khách & Salon Đàm Đạo (Living Grand Salon)',
    subHeading: 'Sự tao nhã tinh tế giữa những cuộc trò chuyện môn đăng hộ đối',
    recommendedTop: 'hoa-buoi-dien',
    recommendedHeart: 'lai-sa-dec',
    recommendedBase: 'tuyet-tung-atlas',
    ratio: { top: 25, heart: 50, base: 25 },
    diffusionTemp: '22°C khuếch tán sóng siêu âm nano',
    character: 'Hài hòa, quý phái, hương hoa lài đêm kết hợp mộc tuyết tùng xua tan căng thẳng.',
    architecturalVibe: 'Tương tác xúc giác hoàn hảo với sofa bọc vải dạ len Loro Piana và sàn gõ đỏ.',
  },
  {
    id: 'master-sanctuary',
    spaceName: 'Master Suite Sanctuary (Phòng Ngủ Trưởng Gia)',
    subHeading: 'Cõi tĩnh tại riêng tư vỗ về giấc ngủ sâu không mộng mị',
    recommendedTop: 'hoa-buoi-dien',
    recommendedHeart: 'phong-lu-da-lat',
    recommendedBase: 'xa-huong-ambrette',
    ratio: { top: 15, heart: 45, base: 40 },
    diffusionTemp: '19.5°C màng thẩm thấu sáp ong',
    character: 'Êm ái, ôm ấp như nhung lụa, nuôi dưỡng năng lượng nội tâm mỗi sớm mai thức giấc.',
    architecturalVibe: 'Cách âm tuyệt đối RT60 &lt; 0.28s, rèm lụa tơ tằm hai lớp cản sáng 100%.',
  },
  {
    id: 'meditation-library',
    spaceName: 'Thư Phòng Thiền Trà & Đọc Sách (Meditation Library)',
    subHeading: 'Không gian tĩnh lặng hội tụ minh triết và chiều sâu tư tưởng',
    recommendedTop: 'chanh-san-tay-nam-bo',
    recommendedHeart: 'thao-qua-tay-bac',
    recommendedBase: 'tram-huong-ha-tinh',
    ratio: { top: 20, heart: 35, base: 45 },
    diffusionTemp: '20°C lò đốt gốm điện trở MCH',
    character: 'Thâm nghiêm, trong trẻo, dẫn dắt tâm trí vào trạng thái dòng chảy tập trung tuyệt đối.',
    architecturalVibe: 'Tủ sách gỗ Mun sọc kịch trần, bàn trà gỗ lũa nguyên khối và ánh sáng rọi điểm 2400K.',
  },
]

interface EnvironmentalMetric {
  label: string
  value: string
  standard: string
  status: 'optimal' | 'warning'
  detail: string
}

const VAULT_METRICS: EnvironmentalMetric[] = [
  {
    label: 'Nhiệt Độ Buồng Bảo Quản',
    value: '18.4°C',
    standard: '18.0°C — 20.0°C',
    status: 'optimal',
    detail: 'Hệ thống chiller điều hòa độc lập biến tần biến thiên &lt; 0.2°C/h giữ ổn định este thơm.',
  },
  {
    label: 'Độ Ẩm Tương Đối (RH)',
    value: '54.2%',
    standard: '50.0% — 55.0% RH',
    status: 'optimal',
    detail: 'Máy tách ẩm rotor hấp phụ tổ ong silica gel ngăn hiện tượng thủy phân tinh dầu.',
  },
  {
    label: 'Chỉ Số Bụi Siêu Mịn',
    value: '0.0 µg/m³',
    standard: 'PM0.1 = 0',
    status: 'optimal',
    detail: 'Màng lọc y tế ULPA U15 hiệu suất 99.9995% đảm bảo không hạt bụi nào lẫn vào dịch chiết.',
  },
  {
    label: 'Áp Suất Âm Buồng Pha Chế',
    value: '-16 Pa',
    standard: '-15 Pa đến -20 Pa',
    status: 'optimal',
    detail: 'Phễu hút khí mặt bàn đá than hoạt tính 2 tầng triệt tiêu 100% mùi tạp trôi ra hành lang.',
  },
  {
    label: 'Kính Quang Học Bảo Quản',
    value: '100% UV400',
    standard: 'Cản 100% bước sóng 200-400nm',
    status: 'optimal',
    detail: 'Kính Schott Duran tráng phủ oxide sắt xanh rêu ngăn phân hủy quang hóa tinh dầu quý.',
  },
]

export function SaigonArtisanBespokeParfumVault({ className }: { className?: string }) {
  const componentId = useId()
  const [selectedTier, setSelectedTier] = useState<'top' | 'heart' | 'base'>('heart')
  const [activeNoteId, setActiveNoteId] = useState<string>('lai-sa-dec')
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('salon-honneur')
  const [customRatio, setCustomRatio] = useState<{ top: number; heart: number; base: number }>({
    top: 25,
    heart: 50,
    base: 25,
  })
  const [isExporting, setIsExporting] = useState<boolean>(false)
  const [certifiedCode, setCertifiedCode] = useState<string | null>(null)

  // Find active note info
  const allNotes = SCENT_TIERS.flatMap((t) => t.notes)
  const currentNote = allNotes.find((n) => n.id === activeNoteId) ?? allNotes[0]!

  // Find active formula
  const currentFormula = SPATIAL_FORMULAS.find((f) => f.id === selectedFormulaId) ?? SPATIAL_FORMULAS[0]!

  const handleSelectFormula = (formula: SpatialFormula) => {
    setSelectedFormulaId(formula.id)
    setCustomRatio(formula.ratio)
    setCertifiedCode(null)
  }

  const handleExportFormula = () => {
    setIsExporting(true)
    // Audio feedback safely
    try {
      if (typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(659.25, ctx.currentTime) // E5 note like a crystal chime
          osc.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.4) // E6
          gain.gain.setValueAtTime(0.08, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.6)
        }
      }
    } catch {
      // Audio autoplay policy fallback
    }

    setTimeout(() => {
      setIsExporting(false)
      const randomSuffix = Math.floor(1000 + Math.random() * 9000)
      setCertifiedCode(`GU-PARFUM-2026-${randomSuffix}`)
    }, 700)
  }

  return (
    <section
      id={`bespoke-parfum-vault-${componentId}`}
      aria-label="Xưởng điều hương Haute Parfumerie GuHomes"
      className={cn(
        'relative w-full overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200',
        className
      )}
    >
      {/* Background ambient luxury gradient and optical textures */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-amber-600/30 via-yellow-700/10 to-transparent blur-[130px]" />
        <div className="absolute -bottom-40 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-stone-800/50 via-amber-900/15 to-transparent blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-6 border-b border-stone-800/80 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              01 / XƯỞNG ĐIỀU HƯƠNG HAUTE PARFUMERIE GUHOMES
            </div>
            <h2 className="mt-5 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl leading-tight">
              Xưởng Điều Hương Không Gian &amp; Tủ Bảo Quản Ký Ức Khứu Giác Sài Gòn
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-stone-400 lg:text-lg">
              Trong ngôi nhà Quiet Luxury, mùi hương không phải thứ xịt vội từ bình áp suất công nghiệp. Đó là nghệ thuật
              điều phối vi khí hậu khứu giác: tủ 48 lọ tinh chất nguyên bản lưu giữ ở 18°C, bàn đá thạch anh hút mùi âm
              màng than hoạt tính, và công thức hương thửa riêng ôm trọn từng kỷ niệm sum vầy của chủ nhân.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm lg:min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>TIÊU CHUẨN PHÒNG LAB</span>
              <span className="text-emerald-400 font-semibold">ISO 14644 CLASS 5</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">NHIỆT ĐỘ LAB</span>
                <span className="font-mono text-base font-medium text-amber-300">18.4°C</span>
              </div>
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">ĐỘ ẨM RH</span>
                <span className="font-mono text-base font-medium text-amber-300">54.2%</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 italic">
              * Tủ kính quang học UV400 bảo vệ 100% chuỗi phân tử este tự nhiên.
            </div>
          </div>
        </div>

        {/* Section 1: Tháp Hương 3 Tầng Tương Tác (The Olfactory Pyramid) */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Pyramid Tier Selectors & Notes list (7 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-light text-stone-200">
                Tháp Hương Ba Tầng Tự Nhiên (Olfactory Pyramid)
              </h3>
              <span className="text-xs font-mono text-amber-400/80 tracking-wider">CHỌN TẦNG HƯƠNG</span>
            </div>

            {/* Tier Buttons */}
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-stone-900/90 p-1.5 border border-stone-800">
              {SCENT_TIERS.map((tier) => (
                <button
                  key={tier.tier}
                  type="button"
                  onClick={() => {
                    setSelectedTier(tier.tier)
                    const firstNote = tier.notes[0]
                    if (firstNote) setActiveNoteId(firstNote.id)
                  }}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-lg py-3 px-2 text-center transition-all duration-300 min-h-[54px]',
                    selectedTier === tier.tier
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                  )}
                >
                  <span className="text-xs font-mono uppercase tracking-wider">{tier.title}</span>
                  <span className="text-[11px] font-medium text-stone-300 hidden sm:inline">
                    {tier.tier === 'top' ? 'Nốt Đầu' : tier.tier === 'heart' ? 'Nốt Giữa' : 'Nốt Cuối'}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Tier Description Banner */}
            {(() => {
              const activeTierData = SCENT_TIERS.find((t) => t.tier === selectedTier) ?? SCENT_TIERS[0]!
              return (
                <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/60 pb-3">
                    <span className="font-serif text-lg text-amber-200">{activeTierData.vietnameseTitle}</span>
                    <span className="rounded-full bg-amber-950/60 px-3 py-1 font-mono text-xs text-amber-400 border border-amber-800/40">
                      {activeTierData.timeSpan}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-light leading-relaxed text-stone-300">{activeTierData.purpose}</p>
                </div>
              )
            })()}

            {/* Notes Cards in this tier */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(SCENT_TIERS.find((t) => t.tier === selectedTier) ?? SCENT_TIERS[0]!).notes.map((note) => {
                const isSelected = note.id === activeNoteId
                return (
                  <button
                    key={note.id}
                    type="button"
                    onClick={() => setActiveNoteId(note.id)}
                    className={cn(
                      'group flex flex-col justify-between rounded-xl p-4 text-left transition-all duration-300 border min-h-[140px]',
                      isSelected
                        ? 'border-amber-500/60 bg-amber-950/20 shadow-lg ring-1 ring-amber-500/40'
                        : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 hover:bg-stone-900'
                    )}
                  >
                    <div>
                      <span className="text-[11px] font-mono text-stone-500 block truncate">{note.botanical}</span>
                      <h4 className="mt-1 font-serif text-sm font-medium text-stone-200 group-hover:text-amber-300 transition-colors line-clamp-2">
                        {note.name}
                      </h4>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs font-mono">
                      <span className="text-stone-400">{note.persistence}</span>
                      <span className={cn('text-[10px] px-1.5 py-0.5 rounded border', note.color)}>
                        {note.origin.split(',')[0]}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Deep-dive into Active Raw Material (5 cols) */}
          <div className="flex flex-col rounded-2xl border border-stone-800/90 bg-gradient-to-b from-stone-900/90 to-stone-950 p-6 lg:col-span-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
                  HỒ SƠ NGUYÊN LIỆU THỬA RIÊNG
                </span>
              </div>
              <span className="text-xs font-mono text-stone-500">{currentNote.id.toUpperCase()}</span>
            </div>

            <div className="my-5 flex-1 space-y-5">
              <div>
                <span className="text-xs font-mono text-stone-400">Danh pháp thực vật học:</span>
                <p className="font-serif italic text-base text-amber-200">{currentNote.botanical}</p>
                <h3 className="mt-1 text-2xl font-serif font-light text-stone-100">{currentNote.name}</h3>
              </div>

              <div className="rounded-xl border border-stone-800/70 bg-stone-950/60 p-4">
                <span className="text-xs font-mono text-stone-400 block mb-1">CẢM HỨNG KHỨU GIÁC &amp; SẮC THÁI:</span>
                <p className="text-sm font-light leading-relaxed text-stone-300">{currentNote.scentProfile}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-stone-800 bg-stone-900/70 p-3">
                  <span className="text-stone-500 block font-mono text-[11px]">VÙNG THU HOÁCH</span>
                  <span className="font-medium text-stone-200 mt-1 block">{currentNote.origin}</span>
                </div>
                <div className="rounded-lg border border-stone-800 bg-stone-900/70 p-3">
                  <span className="text-stone-500 block font-mono text-[11px]">ĐỘ LƯU HƯƠNG</span>
                  <span className="font-medium text-amber-300 mt-1 block">{currentNote.persistence}</span>
                </div>
              </div>

              <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-4">
                <span className="text-xs font-mono text-amber-400 block mb-1">QUY CHUẨN THU HÁI HIẾM QUÝ:</span>
                <p className="text-xs font-light text-stone-300">{currentNote.rarity}</p>
              </div>
            </div>

            <div className="border-t border-stone-800/80 pt-4 text-xs font-mono text-stone-500 flex items-center justify-between">
              <span>BẢO QUẢN: KÍNH SCHOTT DURAN 18°C</span>
              <span className="text-amber-400/90 font-medium">HẠN DÙNG VÔ THỜI HẠN</span>
            </div>
          </div>
        </div>

        {/* Section 2: Trình Phối Trộn Mùi Hương Độc Bản Cho Từng Phòng Chức Năng */}
        <div className="mb-20 rounded-2xl border border-stone-800 bg-stone-900/60 p-8 lg:p-12 backdrop-blur-md">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between border-b border-stone-800/80 pb-6">
            <div>
              <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                CÁ NHÂN HÓA KHÔNG GIAN SỐNG
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Trình Phối Trộn Hương Độc Bản Theo Vi Khí Hậu &amp; Chức Năng Phòng
              </h3>
            </div>
            <p className="max-w-xl text-sm font-light text-stone-400">
              Chọn không gian kiến trúc để GuHomes tự động hiệu chuẩn tỷ lệ tháp hương tối ưu cho hướng nắng, diện tích
              và tần suất lưu thông khí tươi tại Sài Gòn.
            </p>
          </div>

          {/* Room Selector Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {SPATIAL_FORMULAS.map((formula) => {
              const isSelected = formula.id === selectedFormulaId
              return (
                <button
                  key={formula.id}
                  type="button"
                  onClick={() => handleSelectFormula(formula)}
                  className={cn(
                    'flex flex-col justify-between rounded-xl p-5 text-left transition-all duration-300 border min-h-[160px]',
                    isSelected
                      ? 'border-amber-500 bg-amber-950/30 ring-1 ring-amber-500/50 shadow-xl'
                      : 'border-stone-800 bg-stone-950/60 hover:border-stone-700 hover:bg-stone-900/70'
                  )}
                >
                  <div>
                    <span className="text-[11px] font-mono text-stone-500 block">KHÔNG GIAN</span>
                    <h4 className="mt-1 font-serif text-base font-normal text-stone-100 line-clamp-2">
                      {formula.spaceName.split('(')[0]}
                    </h4>
                    <p className="mt-2 text-xs font-light text-stone-400 line-clamp-2">{formula.subHeading}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-800/70 text-[11px] font-mono text-amber-400/90 flex items-center justify-between">
                    <span>TỶ LỆ {formula.ratio.top}/{formula.ratio.heart}/{formula.ratio.base}</span>
                    <span className="text-stone-400">CHỌN &rarr;</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Interactive Formula Details & Sliders */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 rounded-xl border border-stone-800/80 bg-stone-950/80 p-6 lg:p-8">
            {/* Left: Recipe details & ratio visualizer (7 cols) */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">CÔNG THỨC THỰC NGHIỆM</span>
                <h4 className="mt-1 font-serif text-xl text-stone-100">{currentFormula.spaceName}</h4>
                <p className="mt-2 text-sm text-stone-300 font-light leading-relaxed">{currentFormula.character}</p>
                <div className="mt-3 rounded-lg border border-stone-800/60 bg-stone-900/50 p-3 text-xs text-stone-400">
                  <strong className="text-amber-200 font-medium">Tương tác kiến trúc:</strong> {currentFormula.architecturalVibe}
                </div>
              </div>

              {/* Proportional Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-stone-400">
                  <span>TỶ LỆ PHÂN TỬ HƯƠNG</span>
                  <span>
                    Top: <strong className="text-amber-300">{customRatio.top}%</strong> | Heart:{' '}
                    <strong className="text-rose-300">{customRatio.heart}%</strong> | Base:{' '}
                    <strong className="text-amber-500">{customRatio.base}%</strong>
                  </span>
                </div>
                <div className="flex h-3 w-full overflow-hidden rounded-full border border-stone-700 bg-stone-900">
                  <div
                    style={{ width: `${customRatio.top}%` }}
                    className="bg-amber-400 transition-all duration-500"
                    title={`Nốt đầu: ${customRatio.top}%`}
                  />
                  <div
                    style={{ width: `${customRatio.heart}%` }}
                    className="bg-rose-400 transition-all duration-500"
                    title={`Nốt giữa: ${customRatio.heart}%`}
                  />
                  <div
                    style={{ width: `${customRatio.base}%` }}
                    className="bg-amber-600 transition-all duration-500"
                    title={`Nốt cuối: ${customRatio.base}%`}
                  />
                </div>
              </div>

              {/* Adjusting Sliders */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-2">
                <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-3">
                  <div className="flex justify-between text-xs font-mono text-stone-400 mb-1">
                    <span>Nốt Đầu (Top)</span>
                    <span className="text-amber-300">{customRatio.top}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={customRatio.top}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      const diff = val - customRatio.top
                      setCustomRatio({
                        top: val,
                        heart: Math.max(20, customRatio.heart - Math.round(diff / 2)),
                        base: Math.max(20, 100 - val - Math.max(20, customRatio.heart - Math.round(diff / 2))),
                      })
                      setCertifiedCode(null)
                    }}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-stone-700 rounded-lg appearance-none"
                  />
                </div>

                <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-3">
                  <div className="flex justify-between text-xs font-mono text-stone-400 mb-1">
                    <span>Nốt Giữa (Heart)</span>
                    <span className="text-rose-300">{customRatio.heart}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={customRatio.heart}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      const remaining = 100 - val
                      const topRatio = Math.round(remaining * (customRatio.top / (customRatio.top + customRatio.base || 1)))
                      setCustomRatio({
                        top: topRatio,
                        heart: val,
                        base: 100 - val - topRatio,
                      })
                      setCertifiedCode(null)
                    }}
                    className="w-full accent-rose-400 cursor-pointer h-1.5 bg-stone-700 rounded-lg appearance-none"
                  />
                </div>

                <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-3">
                  <div className="flex justify-between text-xs font-mono text-stone-400 mb-1">
                    <span>Nốt Cuối (Base)</span>
                    <span className="text-amber-500">{customRatio.base}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    value={customRatio.base}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      const remaining = 100 - val
                      const topRatio = Math.round(remaining * (customRatio.top / (customRatio.top + customRatio.heart || 1)))
                      setCustomRatio({
                        top: topRatio,
                        heart: 100 - val - topRatio,
                        base: val,
                      })
                      setCertifiedCode(null)
                    }}
                    className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-700 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Right: Certificate output & Action (5 cols) */}
            <div className="flex flex-col justify-between rounded-xl border border-amber-600/30 bg-gradient-to-b from-amber-950/30 via-stone-900/60 to-stone-950 p-6 lg:col-span-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                  <span className="text-xs font-mono text-amber-300">CHỨNG NHẬN CÔNG THỨC GUHOMES</span>
                  <span className="text-xs font-mono text-stone-500">HAUTE PARFUM</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-stone-800/60">
                    <span className="text-stone-400">Không Gian Thiết Kế:</span>
                    <span className="font-medium text-stone-200">{currentFormula.spaceName.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-800/60">
                    <span className="text-stone-400">Cơ Chế Khuếch Tán:</span>
                    <span className="font-medium text-amber-200">{currentFormula.diffusionTemp}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-800/60">
                    <span className="text-stone-400">Độ Bền Phân Tử:</span>
                    <span className="font-medium text-stone-200">14 — 18 giờ liên tục</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-800/60">
                    <span className="text-stone-400">Thành Phần Quý Hiếm:</span>
                    <span className="font-medium text-amber-300 truncate max-w-[180px]">
                      Trầm Hà Tĩnh, Lài Sa Đéc
                    </span>
                  </div>
                </div>

                {certifiedCode ? (
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-3.5 text-center">
                    <span className="text-[11px] font-mono text-emerald-400 block">MÃ CHỨNG THỰC CÔNG THỨC</span>
                    <span className="font-mono text-lg font-bold tracking-widest text-emerald-300 mt-1 block">
                      {certifiedCode}
                    </span>
                    <span className="text-[11px] text-stone-400 mt-1 block">
                      Công thức đã lưu vào hồ sơ bàn giao Digital Handover Vault của gia chủ.
                    </span>
                  </div>
                ) : (
                  <div className="rounded-lg border border-stone-800 bg-stone-900/60 p-3 text-center text-xs text-stone-400">
                    Nhấn nút bên dưới để mã hóa công thức và xuất chứng thư hương độc bản.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={handleExportFormula}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 px-6 py-3.5 text-sm font-medium text-stone-950 transition-all duration-300 hover:from-amber-500 hover:to-yellow-400 active:scale-[0.98] shadow-lg shadow-amber-900/20 disabled:opacity-50 min-h-[44px]"
                >
                  {isExporting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-950 border-t-transparent" />
                      <span>Đang Phối Trộn &amp; Đo Quang Phổ...</span>
                    </>
                  ) : (
                    <>
                      <span>Xuất Công Thức Mùi Hương Thửa Riêng</span>
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Bảng Chỉ Số Môi Trường Bảo Quản Haute Parfumerie Thời Gian Thực */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 lg:p-12">
          <div className="mb-8 flex flex-col gap-2 border-b border-stone-800/80 pb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                KIỂM SOÁT VI KHÍ HẬU LAB THỜI GIAN THỰC
              </span>
            </div>
            <h3 className="font-serif text-2xl font-light text-stone-100">
              Hệ Thống Vi Khí Hậu Chuẩn Phòng Sạch Cho 48 Lọ Tinh Chất Quý Hiếm
            </h3>
            <p className="text-sm font-light text-stone-400 max-w-2xl">
              Nhiệt độ Sài Gòn ngoài trời biến thiên 24°C - 38°C kèm độ ẩm 80% có thể phá hủy cấu trúc hương chỉ sau 90
              ngày. Tủ bảo quản GuHomes vận hành hệ thống vi khí hậu khép kín, giữ nguyên tinh chất qua hàng thập kỷ.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VAULT_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-950/70 p-5 transition-all hover:border-amber-500/30"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-500 uppercase">{metric.label}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mt-3 font-mono text-2xl font-medium text-amber-300">{metric.value}</div>
                  <div className="mt-1 text-xs font-mono text-stone-400">{metric.standard}</div>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800/60 text-[11px] text-stone-400 font-light leading-relaxed">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Call to Action */}
          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-xl border border-stone-800 bg-stone-950/90 p-6 sm:flex-row">
            <div>
              <h4 className="font-serif text-lg font-light text-stone-100">
                Trải nghiệm xưởng điều hương trực tiếp tại Studio GuHomes Q.12
              </h4>
              <p className="text-xs text-stone-400 font-light mt-1">
                Đặt lịch riêng cùng Chuyên gia Điều hương Không gian và KTS Trưởng GuHomes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-5 py-2.5 text-xs font-medium text-stone-950 transition-colors hover:bg-stone-200 min-h-[44px]"
              >
                <span>Đăng ký buổi điều hương VIP</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/du-toan-chi-phi"
                className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-5 py-2.5 text-xs font-medium text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100 min-h-[44px]"
              >
                <span>Dự toán lắp đặt hệ thống hương</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
