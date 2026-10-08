'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type Gender = 'male' | 'female'
export type CompassDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

interface DirectionInfo {
  id: CompassDirection
  degree: number
  nameVi: string
  nameEn: string
  windSpeed: string
  solarRadiation: string
  microclimateAnalysis: string
  architecturalSolution: string
  elementVi: string
}

const DIRECTIONS_DATA: Record<CompassDirection, DirectionInfo> = {
  N: {
    id: 'N',
    degree: 0,
    nameVi: 'Chính Bắc (Khảm)',
    nameEn: 'True North',
    windSpeed: '1.8 – 2.5 m/s (Gió se lạnh Đông Bắc cuối năm)',
    solarRadiation: 'Ánh sáng khuếch tán mát mẻ quanh năm, không bị nắng chiếu xiên',
    microclimateAnalysis:
      'Góc chiếu mặt trời hướng Bắc tại vĩ độ TP.HCM luôn ở trạng thái gián tiếp. Ánh sáng tán xạ êm dịu, không gây chói mắt hay tạo đảo nhiệt cho phòng khách và phòng làm việc.',
    architecturalSolution:
      'Vách kính Panorama khổ lớn kịch trần, kết hợp rèm voan khuếch tán ánh sáng và sàn gỗ sồi xử lý xà phòng tự nhiên.',
    elementVi: 'Thủy',
  },
  NE: {
    id: 'NE',
    degree: 45,
    nameVi: 'Đông Bắc (Cấn)',
    nameEn: 'North-East',
    windSpeed: '2.2 – 3.2 m/s (Gió mùa Đông Bắc hanh khô)',
    solarRadiation: 'Đón nắng sớm dịu nhẹ từ 07:00 đến 09:30 sáng',
    microclimateAnalysis:
      'Nhận năng lượng quang phổ tươi mới đầu ngày. Vào các tháng cuối năm (tháng 11 đến tháng 2), hướng này đón các đợt gió lạnh và khô ráo từ cao áp lục địa.',
    architecturalSolution:
      'Cửa lùa góc mở rộng kết hợp lam gỗ Teak xoay 30°, đón gió đối lưu sớm và sưởi ấm tự nhiên cho phòng trà ban mai.',
    elementVi: 'Thổ',
  },
  E: {
    id: 'E',
    degree: 90,
    nameVi: 'Chính Đông (Chấn)',
    nameEn: 'True East',
    windSpeed: '2.0 – 2.8 m/s (Gió biển ban mai)',
    solarRadiation: 'Nắng sớm giàu tia hồng ngoại có lợi cho nhịp sinh học',
    microclimateAnalysis:
      'Nguồn sinh khí tự nhiên dồi dào kích thích đồng hồ sinh học. Nhiệt độ ban sáng tăng nhẹ nhưng giảm nhanh sau 11:00 trưa, để lại buổi chiều râm mát.',
    architecturalSolution:
      'Ban công xanh tích hợp bồn cây nhiệt đới (Cây Bàng Đài Loan, Cọ Sài Gòn) lọc bụi và rèm lanh dệt thưa điều tiết độ rọi sáng.',
    elementVi: 'Mộc',
  },
  SE: {
    id: 'SE',
    degree: 135,
    nameVi: 'Đông Nam (Tốn)',
    nameEn: 'South-East',
    windSpeed: '2.8 – 3.8 m/s (Gió Sông Sài Gòn & Gió Vịnh Cần Giờ)',
    solarRadiation: 'Góc nắng vàng óng êm ả, nhiệt độ bề mặt kính < 32°C',
    microclimateAnalysis:
      'Hướng "Vàng Mười" của kiến trúc nhiệt đới Sài Gòn. Đón trọn luồng gió đối lưu sông nước tươi mát quanh năm, mang độ ẩm cân bằng 65–75% tự nhiên.',
    architecturalSolution:
      'Thiết kế giếng trời hút gió và cửa lùa không ray âm sàn, giải phóng toàn bộ không gian để đón gió mát thổi xuyên suốt căn hộ.',
    elementVi: 'Mộc',
  },
  S: {
    id: 'S',
    degree: 180,
    nameVi: 'Chính Nam (Ly)',
    nameEn: 'True South',
    windSpeed: '2.5 – 3.5 m/s (Gió Nam điều hòa nhiệt tự nhiên)',
    solarRadiation: 'Mặt trời ở góc đỉnh trần, ít bị nắng rọi sâu vào lòng nhà',
    microclimateAnalysis:
      'Quang thông ổn định và thông thoáng nhất trong năm. Ánh sáng chiếu nghiêng trên trần thạch cao tạo bóng đổ mềm mại, không tích nhiệt bề mặt nội thất.',
    architecturalSolution:
      'Lam trần gỗ Óc Chó giấu viền kết hợp tường vôi Calce khoáng Ý khuếch tán ánh sáng vàng dịu cho phòng khách VIP.',
    elementVi: 'Hỏa',
  },
  SW: {
    id: 'SW',
    degree: 225,
    nameVi: 'Tây Nam (Khôn)',
    nameEn: 'South-West',
    windSpeed: '2.0 – 3.0 m/s (Gió Tây Nam mùa mưa ẩm)',
    solarRadiation: 'Bức xạ nhiệt gay gắt từ 13:00 đến 16:30 (46°C – 50°C)',
    microclimateAnalysis:
      'Chịu tác động kép: gió mùa Tây Nam mang mưa lớn kèm giông sét vào buổi chiều, xen kẽ bức xạ nhiệt nắng rát làm tăng áp lực nhiệt lên vách kính.',
    architecturalSolution:
      'Kính Low-E 2 lớp 24mm bơm khí Argon cản nhiệt, kết hợp phào rãnh âm thoát nước mưa và lớp đệm logia chống tạt nước.',
    elementVi: 'Thổ',
  },
  W: {
    id: 'W',
    degree: 270,
    nameVi: 'Chính Tây (Đoài)',
    nameEn: 'True West',
    windSpeed: '1.5 – 2.2 m/s (Gió tù đọng bức xạ mặt đường)',
    solarRadiation: 'Nhiệt độ mặt kính lên tới 48°C – 52°C lúc 15:00',
    microclimateAnalysis:
      'Thách thức khắc nghiệt nhất của căn hộ Sài Gòn. Nắng chiều xiên thẳng nung nóng bê tông và làm biến dạng thớ gỗ nếu không xử lý cách nhiệt vi khí hậu.',
    architecturalSolution:
      'Giải pháp 3 lớp GuHomes: Hệ lam trượt gỗ xoay 45° + Phim cách nhiệt Ceramic + Tường ốp đá Travertine tự nhiên có khe rỗng tản nhiệt 30mm.',
    elementVi: 'Kim',
  },
  NW: {
    id: 'NW',
    degree: 315,
    nameVi: 'Tây Bắc (Càn)',
    nameEn: 'North-West',
    windSpeed: '1.6 – 2.4 m/s (Gió khô nóng mùa hè)',
    solarRadiation: 'Bức xạ nhiệt kéo dài đến tận hoàng hôn 17:30',
    microclimateAnalysis:
      'Nắng chiều muộn tích tụ nhiệt vào dầm sàn bê tông và nhả nhiệt chậm đến tận nửa đêm, làm tăng công suất tiêu thụ điện máy lạnh 35%.',
    architecturalSolution:
      'Ống bảo ôn đôi Aeroflex 19mm, trần thạch cao tiêu âm Knauf 2 lớp dán lưới sợi thủy tinh và rèm hộp 2 lớp vải lanh Bỉ cản nhiệt tuyệt đối.',
    elementVi: 'Kim',
  },
}

// Bát Trạch Quái Số Calculator Logic
interface GuaResult {
  kuaNumber: number
  guaName: string
  element: string
  group: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh'
  favorableDirs: CompassDirection[]
  unfavorableDirs: CompassDirection[]
  favorableLabels: Record<CompassDirection, string>
}

function calculateGua(birthYear: number, gender: Gender): GuaResult {
  // Sum digits of year
  const digits = String(birthYear).split('').map(Number)
  let sum = digits.reduce((acc, d) => acc + d, 0)
  while (sum > 9) {
    sum = String(sum).split('').map(Number).reduce((acc, d) => acc + d, 0)
  }

  let kua = 0
  if (birthYear <= 1999) {
    kua = gender === 'male' ? 10 - sum : sum + 5
  } else {
    kua = gender === 'male' ? 9 - sum : sum + 6
  }

  while (kua > 9) {
    kua = String(kua).split('').map(Number).reduce((acc, d) => acc + d, 0)
  }
  if (kua <= 0) kua += 9

  // 5 converts to 2 for male, 8 for female
  if (kua === 5) {
    kua = gender === 'male' ? 2 : 8
  }

  const GUA_MAP: Record<
    number,
    {
      guaName: string
      element: string
      group: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh'
      favorable: { dir: CompassDirection; type: string }[]
      unfavorable: { dir: CompassDirection; type: string }[]
    }
  > = {
    1: {
      guaName: 'Khảm (Thủy)',
      element: 'Thủy',
      group: 'Đông Tứ Mệnh',
      favorable: [
        { dir: 'SE', type: 'Sinh Khí' },
        { dir: 'E', type: 'Thiên Y' },
        { dir: 'S', type: 'Diên Niên' },
        { dir: 'N', type: 'Phục Vị' },
      ],
      unfavorable: [
        { dir: 'W', type: 'Họa Hại' },
        { dir: 'NE', type: 'Ngũ Quỷ' },
        { dir: 'NW', type: 'Lục Sát' },
        { dir: 'SW', type: 'Tuyệt Mệnh' },
      ],
    },
    2: {
      guaName: 'Khôn (Thổ)',
      element: 'Thổ',
      group: 'Tây Tứ Mệnh',
      favorable: [
        { dir: 'NE', type: 'Sinh Khí' },
        { dir: 'W', type: 'Thiên Y' },
        { dir: 'NW', type: 'Diên Niên' },
        { dir: 'SW', type: 'Phục Vị' },
      ],
      unfavorable: [
        { dir: 'E', type: 'Họa Hại' },
        { dir: 'SE', type: 'Ngũ Quỷ' },
        { dir: 'S', type: 'Lục Sát' },
        { dir: 'N', type: 'Tuyệt Mệnh' },
      ],
    },
    3: {
      guaName: 'Chấn (Mộc)',
      element: 'Mộc',
      group: 'Đông Tứ Mệnh',
      favorable: [
        { dir: 'S', type: 'Sinh Khí' },
        { dir: 'N', type: 'Thiên Y' },
        { dir: 'SE', type: 'Diên Niên' },
        { dir: 'E', type: 'Phục Vị' },
      ],
      unfavorable: [
        { dir: 'SW', type: 'Họa Hại' },
        { dir: 'NW', type: 'Ngũ Quỷ' },
        { dir: 'NE', type: 'Lục Sát' },
        { dir: 'W', type: 'Tuyệt Mệnh' },
      ],
    },
    4: {
      guaName: 'Tốn (Mộc)',
      element: 'Mộc',
      group: 'Đông Tứ Mệnh',
      favorable: [
        { dir: 'N', type: 'Sinh Khí' },
        { dir: 'S', type: 'Thiên Y' },
        { dir: 'E', type: 'Diên Niên' },
        { dir: 'SE', type: 'Phục Vị' },
      ],
      unfavorable: [
        { dir: 'NW', type: 'Họa Hại' },
        { dir: 'SW', type: 'Ngũ Quỷ' },
        { dir: 'W', type: 'Lục Sát' },
        { dir: 'NE', type: 'Tuyệt Mệnh' },
      ],
    },
    6: {
      guaName: 'Càn (Kim)',
      element: 'Kim',
      group: 'Tây Tứ Mệnh',
      favorable: [
        { dir: 'W', type: 'Sinh Khí' },
        { dir: 'NE', type: 'Thiên Y' },
        { dir: 'SW', type: 'Diên Niên' },
        { dir: 'NW', type: 'Phục Vị' },
      ],
      unfavorable: [
        { dir: 'SE', type: 'Họa Hại' },
        { dir: 'E', type: 'Ngũ Quỷ' },
        { dir: 'N', type: 'Lục Sát' },
        { dir: 'S', type: 'Tuyệt Mệnh' },
      ],
    },
    7: {
      guaName: 'Đoài (Kim)',
      element: 'Kim',
      group: 'Tây Tứ Mệnh',
      favorable: [
        { dir: 'NW', type: 'Sinh Khí' },
        { dir: 'SW', type: 'Thiên Y' },
        { dir: 'NE', type: 'Diên Niên' },
        { dir: 'W', type: 'Phục Vị' },
      ],
      unfavorable: [
        { dir: 'N', type: 'Họa Hại' },
        { dir: 'S', type: 'Ngũ Quỷ' },
        { dir: 'SE', type: 'Lục Sát' },
        { dir: 'E', type: 'Tuyệt Mệnh' },
      ],
    },
    8: {
      guaName: 'Cấn (Thổ)',
      element: 'Thổ',
      group: 'Tây Tứ Mệnh',
      favorable: [
        { dir: 'SW', type: 'Sinh Khí' },
        { dir: 'NW', type: 'Thiên Y' },
        { dir: 'W', type: 'Diên Niên' },
        { dir: 'NE', type: 'Phục Vị' },
      ],
      unfavorable: [
        { dir: 'S', type: 'Họa Hại' },
        { dir: 'N', type: 'Ngũ Quỷ' },
        { dir: 'E', type: 'Lục Sát' },
        { dir: 'SE', type: 'Tuyệt Mệnh' },
      ],
    },
    9: {
      guaName: 'Ly (Hỏa)',
      element: 'Hỏa',
      group: 'Đông Tứ Mệnh',
      favorable: [
        { dir: 'E', type: 'Sinh Khí' },
        { dir: 'SE', type: 'Thiên Y' },
        { dir: 'N', type: 'Diên Niên' },
        { dir: 'S', type: 'Phục Vị' },
      ],
      unfavorable: [
        { dir: 'NE', type: 'Họa Hại' },
        { dir: 'W', type: 'Ngũ Quỷ' },
        { dir: 'SW', type: 'Lục Sát' },
        { dir: 'NW', type: 'Tuyệt Mệnh' },
      ],
    },
  }

  const def = GUA_MAP[kua] ?? GUA_MAP[1]!
  const favorableDirs = def.favorable.map((f) => f.dir)
  const unfavorableDirs = def.unfavorable.map((u) => u.dir)

  const favorableLabels: Record<CompassDirection, string> = {
    N: '',
    NE: '',
    E: '',
    SE: '',
    S: '',
    SW: '',
    W: '',
    NW: '',
  }
  for (const f of def.favorable) favorableLabels[f.dir] = `Cát (${f.type})`
  for (const u of def.unfavorable) favorableLabels[u.dir] = `Hung (${u.type})`

  return {
    kuaNumber: kua,
    guaName: def.guaName,
    element: def.element,
    group: def.group,
    favorableDirs,
    unfavorableDirs,
    favorableLabels,
  }
}

export function TropicalFengShuiCompass({ className }: { className?: string }) {
  const birthYearId = useId()
  const [degree, setDegree] = useState<number>(135) // Default SE Đông Nam
  const [birthYear, setBirthYear] = useState<number>(1985)
  const [gender, setGender] = useState<Gender>('male')

  // Find nearest cardinal direction
  const getNearestDirection = (deg: number): CompassDirection => {
    const normalized = (deg % 360 + 360) % 360
    if (normalized >= 337.5 || normalized < 22.5) return 'N'
    if (normalized >= 22.5 && normalized < 67.5) return 'NE'
    if (normalized >= 67.5 && normalized < 112.5) return 'E'
    if (normalized >= 112.5 && normalized < 157.5) return 'SE'
    if (normalized >= 157.5 && normalized < 202.5) return 'S'
    if (normalized >= 202.5 && normalized < 247.5) return 'SW'
    if (normalized >= 247.5 && normalized < 292.5) return 'W'
    return 'NW'
  }

  const currentDirKey = getNearestDirection(degree)
  const currentDir = DIRECTIONS_DATA[currentDirKey]
  const guaData = calculateGua(birthYear, gender)
  const isFavorable = guaData.favorableDirs.includes(currentDirKey)
  const fengShuiStatusLabel = guaData.favorableLabels[currentDirKey]

  return (
    <section className={cn('relative bg-[#0E1311] text-[#F3F1EC] py-16 sm:py-24 border-y border-white/10 overflow-hidden', className)}>
      {/* Background Subtle Ambient Aura */}
      <div className="pointer-events-none absolute -top-40 right-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-amber-600/15 via-emerald-800/10 to-transparent blur-[160px]" />

      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Khoa Học Phong Thủy Vi Khí Hậu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-3 tracking-tight">
              La Bàn Phong Thủy Vi Khí Hậu Sài Gòn
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[66ch] mt-3 font-light leading-relaxed">
              Giải mã phong thủy Bát Trạch bằng khoa học vi khí hậu nhiệt đới thực nghiệm: kết hợp hướng cát hung của gia chủ với luồng gió sông Sài Gòn, độ ẩm 78% và biểu đồ bức xạ nhiệt mặt trời lên tới 52°C.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 block text-[10px]">BẢN MỆNH GIA CHỦ</span>
              <span className="text-accent text-sm font-semibold">{guaData.guaName}</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 block text-[10px]">TRƯỜNG PHÁI BÁT TRẠCH</span>
              <span className="text-emerald-400 text-sm font-semibold">{guaData.group}</span>
            </div>
          </div>
        </div>

        {/* User Configuration Bar (Year + Gender) */}
        <div className="mt-8 p-4 sm:p-6 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4 flex items-center gap-3">
            <label htmlFor={birthYearId} className="text-xs font-mono text-white/70 uppercase shrink-0">NĂM SINH GIA CHỦ:</label>
            <input
              id={birthYearId}
              type="number"
              min="1950"
              max="2020"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value) || 1985)}
              className="w-28 px-3 py-1.5 rounded-lg border border-white/20 bg-black/40 text-sm font-mono text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-3">
            <span className="text-xs font-mono text-white/70 uppercase">GIỚI TÍNH:</span>
            <div className="inline-flex rounded-lg border border-white/20 p-1 bg-black/40">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={cn(
                  'px-4 py-1 rounded-md text-xs font-mono transition-all',
                  gender === 'male' ? 'bg-accent text-white font-medium' : 'text-white/60 hover:text-white'
                )}
              >
                Nam
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={cn(
                  'px-4 py-1 rounded-md text-xs font-mono transition-all',
                  gender === 'female' ? 'bg-accent text-white font-medium' : 'text-white/60 hover:text-white'
                )}
              >
                Nữ
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex items-center md:justify-end gap-2 text-xs font-mono">
            <span className="text-white/50">Quái số:</span>
            <span className="px-2.5 py-1 rounded-md bg-accent/20 border border-accent/40 text-accent font-semibold">
              Kua {guaData.kuaNumber} · {guaData.element}
            </span>
          </div>
        </div>

        {/* Quick Direction Selector Pills */}
        <div className="mt-6 grid grid-cols-4 sm:grid-cols-8 gap-2">
          {(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as CompassDirection[]).map((dKey) => {
            const d = DIRECTIONS_DATA[dKey]
            const isSelected = currentDirKey === dKey
            const isFav = guaData.favorableDirs.includes(dKey)

            return (
              <button
                key={dKey}
                type="button"
                onClick={() => setDegree(d.degree)}
                className={cn(
                  'py-2.5 px-2 rounded-xl border text-center transition-all',
                  isSelected
                    ? 'border-accent bg-accent/20 text-white shadow-lg ring-1 ring-accent'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white'
                )}
              >
                <span className="text-xs font-mono font-bold block">{dKey} ({d.degree}°)</span>
                <span className={cn('text-[10px] block mt-0.5 font-mono', isFav ? 'text-emerald-400' : 'text-amber-400')}>
                  {isFav ? 'Cát' : 'Hung'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Main Interactive Matrix Studio */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 360 SVG Compass Display (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[420px] rounded-3xl border border-white/15 bg-[#141A18] p-6 flex flex-col justify-between items-center overflow-hidden shadow-2xl">
              {/* Compass Ring Header */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-white/60 pb-2 border-b border-white/10">
                <span>LA BÀN 360° ĐỊA TỪ TRƯỜNG</span>
                <span className="text-accent font-semibold">{degree}°</span>
              </div>

              {/* Dynamic 360 SVG Compass Graphic */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center">
                {/* Outer Ring dial */}
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Outer circle with ticks */}
                  <circle cx="150" cy="150" r="140" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
                  <circle cx="150" cy="150" r="120" stroke="rgba(215,190,140,0.25)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

                  {/* 8 Axis lines */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <line
                      key={deg}
                      x1="150"
                      y1="150"
                      x2={150 + 130 * Math.sin((deg * Math.PI) / 180)}
                      y2={150 - 130 * Math.cos((deg * Math.PI) / 180)}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Direction Labels around circle */}
                  <text x="150" y="24" fill="#E5C17B" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">BẮC (0°)</text>
                  <text x="280" y="154" fill="#FFF" fontSize="11" textAnchor="end" fontFamily="monospace">ĐÔNG (90°)</text>
                  <text x="150" y="285" fill="#FFF" fontSize="11" textAnchor="middle" fontFamily="monospace">NAM (180°)</text>
                  <text x="20" y="154" fill="#FFF" fontSize="11" textAnchor="start" fontFamily="monospace">TÂY (270°)</text>

                  {/* Rotating Gold Compass Needle */}
                  <g
                    transform={`rotate(${degree} 150 150)`}
                    className="transition-transform duration-500 ease-out"
                  >
                    {/* North pointer (Gold tip) */}
                    <polygon points="150,35 142,150 150,145" fill="#E5C17B" />
                    <polygon points="150,35 158,150 150,145" fill="#C5A059" />

                    {/* South pointer (Dark silver) */}
                    <polygon points="150,265 142,150 150,155" fill="#555" />
                    <polygon points="150,265 158,150 150,155" fill="#333" />

                    {/* Center Pivot jewel */}
                    <circle cx="150" cy="150" r="10" fill="#1B1917" stroke="#E5C17B" strokeWidth="2" />
                    <circle cx="150" cy="150" r="4" fill="#5EEAD4" />
                  </g>
                </svg>
              </div>

              {/* Angle Slider input */}
              <div className="w-full pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-1">
                  <span>Xoay góc hướng nhà:</span>
                  <span className="text-accent font-semibold">{degree}° · {currentDir.nameVi}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={degree}
                  onChange={(e) => setDegree(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-white/20 appearance-none cursor-pointer accent-accent"
                />
              </div>
            </div>
          </div>

          {/* Right: Microclimate Science & Architectural Solution (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Direction Status Header Card */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">
                    HƯỚNG {currentDir.id} · {currentDir.nameEn}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
                    {currentDir.nameVi}
                  </h3>
                </div>

                {/* Feng Shui Verdict Pill */}
                <div className="flex flex-col sm:items-end">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold',
                      isFavorable
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                    )}
                  >
                    <span>{isFavorable ? '✓ HƯỚNG CÁT' : '⚠️ HƯỚNG CẦN HÓA GIẢI'}</span>
                    <span>· {fengShuiStatusLabel}</span>
                  </span>
                  <span className="text-[11px] font-mono text-white/50 mt-1">
                    Ngũ hành: {currentDir.elementVi} · Hạp mạng {guaData.guaName}
                  </span>
                </div>
              </div>

              {/* Real Saigon Climate Specs */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl border border-white/10 bg-black/30">
                  <span className="text-white/50 block text-[10px] uppercase">Gió Đối Lưu &amp; Tốc Độ:</span>
                  <p className="text-white font-medium mt-1 leading-relaxed">{currentDir.windSpeed}</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/10 bg-black/30">
                  <span className="text-white/50 block text-[10px] uppercase">Bức Xạ Nhiệt &amp; Ánh Sáng:</span>
                  <p className="text-accent font-medium mt-1 leading-relaxed">{currentDir.solarRadiation}</p>
                </div>
              </div>

              {/* Microclimate Scientific Analysis */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-2">
                  Phân Tích Vi Khí Hậu Sài Gòn Thực Nghiệm:
                </span>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {currentDir.microclimateAnalysis}
                </p>
              </div>

              {/* GuHomes Architectural Solution */}
              <div className="mt-6 p-5 rounded-2xl border border-accent/40 bg-accent/[0.08]">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-accent font-semibold uppercase">
                  <span>✦ Giải Pháp Kiến Trúc May Đo GuHomes:</span>
                </div>
                <p className="text-xs sm:text-sm text-white font-light leading-relaxed">
                  {currentDir.architecturalSolution}
                </p>
              </div>

              {/* CTA Consultation Button */}
              <div className="mt-6 pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent/90 transition-all shadow-md flex-1"
                >
                  <span>Khảo Sát Hướng Nhà &amp; Vi Khí Hậu Thực Địa</span>
                  <ArrowUpRightIcon className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
