'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type RoomArchetypeId = 'duplex-thaodien' | 'villa-chateau' | 'cinema-thuthiem'

interface FrequencyBandData {
  freq: string
  label: string
  rawRt60: number
  treatedRt60: number
  absorptionRaw: number
  absorptionTreated: number
  description: string
}

interface RoomArchetype {
  id: RoomArchetypeId
  nameVi: string
  locationVi: string
  tagVi: string
  dimensions: {
    areaM2: number
    heightM: number
    volumeM3: number
  }
  rawChallenge: string
  rawRt60Average: number
  treatedRt60Average: number
  reductionPercent: number
  guhomesSolution: string
  materials: {
    name: string
    nrc: number
    thickness: string
    layering: string
  }[]
  frequencyBands: FrequencyBandData[]
}

const ROOM_ARCHETYPES: Record<RoomArchetypeId, RoomArchetype> = {
  'duplex-thaodien': {
    id: 'duplex-thaodien',
    nameVi: 'Duplex Penthouse Thông Tầng',
    locationVi: 'Bán đảo Thảo Điền, TP. Thủ Đức',
    tagVi: 'Trần cao 6.2m · Mặt kính Panorama',
    dimensions: {
      areaM2: 120,
      heightM: 6.2,
      volumeM3: 744,
    },
    rawChallenge:
      'Hơn 140m² vách kính Low-E kịch trần kết hợp sàn đá cẩm thạch và tường thạch cao phẳng tạo ra buồng cộng hưởng âm thanh cực kỳ vang dội. Tiếng nói bị dội âm chói gắt (flutter echo), khó trò chuyện và gây mệt mỏi thính giác sau 30 phút.',
    rawRt60Average: 2.15,
    treatedRt60Average: 0.48,
    reductionPercent: 77,
    guhomesSolution:
      'Tích hợp hệ vách ốp gỗ sồi tự nhiên xẻ rãnh vi lỗ kết hợp bông khoáng Rockwool tỷ trọng 60kg/m³ giấu âm tường. Trần thạch cao tiêu âm Knauf Cleaneo đục lỗ so le và hệ rèm lanh 3 lớp cản âm phản xạ bề mặt kính.',
    materials: [
      {
        name: 'Vách gỗ sồi xẻ rãnh vi lỗ CNC (Micro-perforated)',
        nrc: 0.85,
        thickness: '25mm + 50mm khoang rỗng',
        layering: 'Veneer sồi tự nhiên + lõi MDF chống ẩm HMR + màng tiêu âm SoundTex Đức',
      },
      {
        name: 'Trần tiêu âm Knauf Cleaneo giấu xương',
        nrc: 0.8,
        thickness: '12.5mm',
        layering: 'Thạch cao tinh khiết Zeolite đục lỗ so le hấp thụ formaldehyde và triệt tiêu vang dội trần cao',
      },
      {
        name: 'Lõi sợi bông khoáng Rockwool kháng ẩm nhiệt đới',
        nrc: 0.95,
        thickness: '50mm (Tỷ trọng 60kg/m³)',
        layering: 'Sợi khoáng bazan tự nhiên bọc vải thủy tinh chống rơi bụi, chống cháy tiêu chuẩn Class A1',
      },
      {
        name: 'Rèm lanh Bỉ dệt 3 lớp cản phản xạ kính',
        nrc: 0.65,
        thickness: 'Xếp ly tỷ lệ 2.5 : 1',
        layering: 'Lớp sợi lanh thô dệt thưa bên ngoài + lớp nỉ mỏng tiêu âm trung tâm + lớp voan tản sáng',
      },
    ],
    frequencyBands: [
      {
        freq: '125 Hz',
        label: 'Trầm sâu',
        rawRt60: 2.45,
        treatedRt60: 0.62,
        absorptionRaw: 0.08,
        absorptionTreated: 0.55,
        description: 'Triệt tiêu sóng đứng góc phòng và tiếng rền ù từ loa sub hoặc hệ thống điều hòa VRV',
      },
      {
        freq: '250 Hz',
        label: 'Trầm ấm',
        rawRt60: 2.3,
        treatedRt60: 0.52,
        absorptionRaw: 0.12,
        absorptionTreated: 0.72,
        description: 'Tái tạo độ dày ấm của giọng nói nam và các nhạc cụ mộc như cello, double bass',
      },
      {
        freq: '500 Hz',
        label: 'Trung trầm',
        rawRt60: 2.18,
        treatedRt60: 0.46,
        absorptionRaw: 0.15,
        absorptionTreated: 0.88,
        description: 'Vùng âm quan trọng nhất của đối thoại thường nhật, loại bỏ cảm giác ồn ào như sảnh tiệc',
      },
      {
        freq: '1000 Hz',
        label: 'Trung cao (Voice)',
        rawRt60: 2.05,
        treatedRt60: 0.44,
        absorptionRaw: 0.18,
        absorptionTreated: 0.92,
        description: 'Giúp từng câu nói rõ ràng từng nguyên âm, không cần lên giọng khi nói chuyện trong nhà',
      },
      {
        freq: '2000 Hz',
        label: 'Chi tiết nhạc cụ',
        rawRt60: 1.95,
        treatedRt60: 0.43,
        absorptionRaw: 0.22,
        absorptionTreated: 0.9,
        description: 'Làm mượt tiếng đĩa gốm sứ va chạm, tiếng giày gót nhọn trên sàn đá và tiếng đàn piano',
      },
      {
        freq: '4000 Hz',
        label: 'Tép cao / Gió rít',
        rawRt60: 1.82,
        treatedRt60: 0.41,
        absorptionRaw: 0.25,
        absorptionTreated: 0.85,
        description: 'Hấp thụ hoàn toàn tiếng rít gió qua khe cửa ban công tầng cao và tiếng chói gắt',
      },
    ],
  },
  'villa-chateau': {
    id: 'villa-chateau',
    nameVi: 'Master Suite Biệt Thự Grand Villa',
    locationVi: 'Khu Château, Phú Mỹ Hưng, Quận 7',
    tagVi: 'Không gian nghỉ ngơi tĩnh lặng · Ngủ sâu < 28dB',
    dimensions: {
      areaM2: 75,
      heightM: 3.4,
      volumeM3: 255,
    },
    rawChallenge:
      'Cửa lùa sân vườn rộng 3 mặt bằng kính cường lực kết hợp tường phẳng sơn nước khiến âm thanh nội bộ phản hồi qua lại. Tiếng máy sấy tóc, tiếng trò chuyện nhẹ ban đêm cũng tạo ra sự xáo trộn giấc ngủ.',
    rawRt60Average: 1.65,
    treatedRt60Average: 0.42,
    reductionPercent: 74,
    guhomesSolution:
      'Vách ốp đầu giường bọc nỉ len cừu Bỉ may đo kết hợp mút âm học mật độ cao. Hệ lam trần gỗ óc chó tự nhiên tán âm và sàn gỗ tự nhiên Teak dầu lót lớp đệm cao su non 5mm tiêu âm chấn động.',
    materials: [
      {
        name: 'Vách đầu giường bọc nỉ len cừu Bỉ thủ công',
        nrc: 0.82,
        thickness: '60mm',
        layering: 'Vải len cừu tự nhiên dệt thô + bọt polyurethane tiêu âm chống cháy + ván ép bạch dương Plywood E0',
      },
      {
        name: 'Lam trần gỗ óc chó Bắc Mỹ tán âm Quadratic',
        nrc: 0.75,
        thickness: '40mm x 60mm',
        layering: 'Gỗ óc chó sấy kiln 9–11% EMC, bố trí khoảng cách phi đối xứng nhằm tán xạ sóng âm đồng đều',
      },
      {
        name: 'Lớp đệm sàn cao su non lưu hóa tiêu chấn',
        nrc: 0.6,
        thickness: '5mm',
        layering: 'Cao su lưu hóa mật độ cao lót dưới sàn gỗ Teak tự nhiên, giảm 24dB tiếng bước chân và va chạm sàn',
      },
      {
        name: 'Cửa phòng ngủ lõi đặc kết hợp gioăng âm từ tính',
        nrc: 0.78,
        thickness: '50mm',
        layering: 'Lõi đặc composite chống ồn 42dB (STC 42) + hệ ron cao su từ tính đóng êm khít kín khí',
      },
    ],
    frequencyBands: [
      {
        freq: '125 Hz',
        label: 'Trầm sâu',
        rawRt60: 1.85,
        treatedRt60: 0.55,
        absorptionRaw: 0.1,
        absorptionTreated: 0.58,
        description: 'Cách ly rung chấn từ đường giao thông ngoại khu và máy nén tủ lạnh minibar',
      },
      {
        freq: '250 Hz',
        label: 'Trầm ấm',
        rawRt60: 1.75,
        treatedRt60: 0.48,
        absorptionRaw: 0.14,
        absorptionTreated: 0.7,
        description: 'Tạo cảm giác êm ấm, bao bọc và tĩnh tâm ngay khi bước vào phòng ngủ',
      },
      {
        freq: '500 Hz',
        label: 'Trung trầm',
        rawRt60: 1.65,
        treatedRt60: 0.42,
        absorptionRaw: 0.18,
        absorptionTreated: 0.86,
        description: 'Lọc êm tiếng thì thầm đối thoại, giữ trọn sự riêng tư tuyệt đối giữa các phòng',
      },
      {
        freq: '1000 Hz',
        label: 'Trung cao (Voice)',
        rawRt60: 1.6,
        treatedRt60: 0.39,
        absorptionRaw: 0.2,
        absorptionTreated: 0.9,
        description: 'Hạ độ vang dội giúp sóng não dễ dàng chuyển sang trạng thái Alpha và Theta để ngủ sâu',
      },
      {
        freq: '2000 Hz',
        label: 'Chi tiết nhạc cụ',
        rawRt60: 1.52,
        treatedRt60: 0.38,
        absorptionRaw: 0.24,
        absorptionTreated: 0.88,
        description: 'Tiếng nhạc không lời (Acoustic/Jazz) mở nhỏ vẫn nghe trọn vẹn từng ngón bấm dây đàn',
      },
      {
        freq: '4000 Hz',
        label: 'Tép cao / Tiếng bước',
        rawRt60: 1.45,
        treatedRt60: 0.36,
        absorptionRaw: 0.28,
        absorptionTreated: 0.84,
        description: 'Triệt tiêu hoàn toàn tiếng cọt kẹt cánh tủ, tiếng vòi nước từ phòng vệ sinh master',
      },
    ],
  },
  'cinema-thuthiem': {
    id: 'cinema-thuthiem',
    nameVi: 'Audiophile & Private Cinema Room',
    locationVi: 'The River Thủ Thiêm, Quận 2',
    tagVi: 'Phòng nghe nhìn Hi-End · Chuẩn phòng thu Dolby Atmos',
    dimensions: {
      areaM2: 48,
      heightM: 3.2,
      volumeM3: 153.6,
    },
    rawChallenge:
      'Kết cấu tường bê tông đúc nguyên khối dày 200mm phản hồi gần như 99% năng lượng âm thanh. Hiện tượng giao thoa sóng đứng (standing waves) cực kỳ nghiêm trọng khiến dải bass bị rền kéo dài, nốt trầm bị nuốt hoặc tăng đột biến cục bộ.',
    rawRt60Average: 1.95,
    treatedRt60Average: 0.38,
    reductionPercent: 80,
    guhomesSolution:
      'Hệ thống bẫy âm trầm Helmholtz Bass Traps giấu tại 4 góc phòng, kết hợp các tấm tán âm gỗ Quadratic Residue Diffuser (QRD 2D) bằng gỗ phong tự nhiên. Vách ngăn đa lớp sandwich chống rung triệt tiêu hoàn toàn âm thanh lọt ra ngoài căn hộ.',
    materials: [
      {
        name: 'Bẫy âm trầm cộng hưởng góc phòng (Helmholtz Bass Trap)',
        nrc: 0.92,
        thickness: '300mm x 300mm tam giác góc',
        layering: 'Màng gỗ đàn hồi + khoang cộng hưởng tính toán theo thể tích phòng triệt tiêu tần số 40–80Hz',
      },
      {
        name: 'Tấm tán âm gỗ phong 2 chiều QRD Diffuser',
        nrc: 0.72,
        thickness: '150mm giếng tán âm sâu',
        layering: 'Gỗ phong tự nhiên xẻ rãnh theo chuỗi số nguyên tố 7, tán đều sóng phản xạ thành trường âm mở',
      },
      {
        name: 'Vách tiêu âm hỗn hợp Fabric Acoustic Panel',
        nrc: 0.9,
        thickness: '50mm',
        layering: 'Vải dệt âm học cao cấp không cản âm + bông gốm thủy tinh tỷ trọng 80kg/m³ + khung nhôm viền giấu',
      },
      {
        name: 'Cửa cách âm 2 lớp khóa áp suất đa điểm',
        nrc: 0.88,
        thickness: '65mm lõi đa tầng',
        layering: 'Thép tấm 1.5mm giảm chấn + cao su non lưu hóa + gioăng silicon kép chịu nén cao',
      },
    ],
    frequencyBands: [
      {
        freq: '125 Hz',
        label: 'Trầm sâu',
        rawRt60: 2.35,
        treatedRt60: 0.45,
        absorptionRaw: 0.09,
        absorptionTreated: 0.75,
        description: 'Tiếng bom nổ trong phim hay tiếng trống jazz dứt khoát, không kéo đuôi ù rền khó chịu',
      },
      {
        freq: '250 Hz',
        label: 'Trầm ấm',
        rawRt60: 2.15,
        treatedRt60: 0.41,
        absorptionRaw: 0.12,
        absorptionTreated: 0.82,
        description: 'Dải bass gãy gọn, kiểm soát chính xác từng nốt контрабас và giọng vocal trầm nội lực',
      },
      {
        freq: '500 Hz',
        label: 'Trung trầm',
        rawRt60: 1.95,
        treatedRt60: 0.38,
        absorptionRaw: 0.16,
        absorptionTreated: 0.94,
        description: 'Độ tuyến tính xuất sắc, lời thoại diễn viên trong phim Dolby Atmos tách bạch rõ ràng',
      },
      {
        freq: '1000 Hz',
        label: 'Trung cao (Voice)',
        rawRt60: 1.88,
        treatedRt60: 0.36,
        absorptionRaw: 0.19,
        absorptionTreated: 0.96,
        description: 'Định vị âm hình (Imaging) chính xác 3D, cảm nhận rõ ca sĩ đang đứng chính giữa sân khấu',
      },
      {
        freq: '2000 Hz',
        label: 'Chi tiết nhạc cụ',
        rawRt60: 1.75,
        treatedRt60: 0.35,
        absorptionRaw: 0.23,
        absorptionTreated: 0.93,
        description: 'Tái tạo trọn vẹn hài âm tự nhiên của violin, saxophone mà không có chút méo tiếng',
      },
      {
        freq: '4000 Hz',
        label: 'Tép cao / Hi-hats',
        rawRt60: 1.62,
        treatedRt60: 0.33,
        absorptionRaw: 0.27,
        absorptionTreated: 0.91,
        description: 'Tiếng chũm chọe (cymbal) lung linh, tan dần tự nhiên như đang nghe trực tiếp tại phòng thu',
      },
    ],
  },
}

export function AcousticDampeningSimulator({ className }: { className?: string }) {
  const [selectedRoomId, setSelectedRoomId] = useState<RoomArchetypeId>('duplex-thaodien')
  const [isTreated, setIsTreated] = useState<boolean>(true)
  const [activeBandIndex, setActiveBandIndex] = useState<number>(3) // Default 1000Hz (Voice)
  const [isPlayingPulse, setIsPlayingPulse] = useState<boolean>(false)

  const uniqueId = useId()
  const room = ROOM_ARCHETYPES[selectedRoomId] ?? ROOM_ARCHETYPES['duplex-thaodien']
  const activeBand = room.frequencyBands[activeBandIndex] ?? room.frequencyBands[0]!

  const currentRt60 = isTreated ? room.treatedRt60Average : room.rawRt60Average
  const statusColor = isTreated ? 'text-accent' : 'text-amber-500'

  const triggerImpulse = () => {
    setIsPlayingPulse(true)
    setTimeout(() => {
      setIsPlayingPulse(false)
    }, 1800)
  }

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Phòng Thí Nghiệm Âm Học Kiến Trúc · GuHomes Acoustic Lab
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Sabine RT60 Simulation
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Mô Phỏng Độ Vang Dội &amp; Tiêu Âm Kiến Trúc
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Một không gian Quiet Luxury đích thực không chỉ đẹp về thị giác, mà phải tĩnh tại về thính giác. Kiểm chứng sự khác biệt giữa căn hộ mộc thô chói gắt (RT60 &gt; 2.0 giây) và hệ hoàn thiện mộc tiêu âm GuHomes (RT60 &asymp; 0.45 giây) chuẩn phòng hòa nhạc.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={triggerImpulse}
              className={cn(
                'px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 border',
                isPlayingPulse
                  ? 'bg-accent text-canvas border-accent shadow-lg scale-95'
                  : 'bg-canvas text-ink hover:bg-surface border-line hover:border-accent'
              )}
              aria-label="Kích hoạt xung âm kiểm nghiệm"
            >
              <span className={cn('w-2 h-2 rounded-full', isPlayingPulse ? 'bg-canvas animate-ping' : 'bg-accent')} />
              <span>{isPlayingPulse ? 'Đang đo đạc dội âm...' : 'Phát xung âm thanh (Test Pulse)'}</span>
            </button>
          </div>
        </div>

        {/* Room Archetype Selector Tabs */}
        <div className="mt-8 flex flex-wrap gap-3">
          {(Object.keys(ROOM_ARCHETYPES) as RoomArchetypeId[]).map((id) => {
            const arch = ROOM_ARCHETYPES[id]
            const isSelected = selectedRoomId === id
            return (
              <button
                key={id}
                onClick={() => setSelectedRoomId(id)}
                className={cn(
                  'px-5 py-3 rounded-2xl text-left border transition-all duration-300 flex-1 min-w-[240px]',
                  isSelected
                    ? 'border-accent bg-canvas shadow-md ring-1 ring-accent/30'
                    : 'border-line bg-surface hover:bg-canvas/60 hover:border-line-dark'
                )}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={cn(isSelected ? 'text-accent font-semibold' : 'text-muted')}>
                    {arch.tagVi}
                  </span>
                  <span className="text-[11px] text-muted/60">{arch.dimensions.areaM2}m²</span>
                </div>
                <h3 className="font-serif text-base text-ink font-normal mt-1">{arch.nameVi}</h3>
                <p className="text-xs text-muted truncate mt-0.5">{arch.locationVi}</p>
              </button>
            )
          })}
        </div>

        {/* Main Acoustic Simulator Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Visualizer & Mode Switcher */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            {/* Treatment Mode Toggle Card */}
            <div className="p-6 rounded-3xl bg-canvas border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted">Trạng Thái Xử Lý Âm Học Không Gian</p>
                <h4 className="font-serif text-xl text-ink font-light mt-1">
                  {isTreated ? 'Đã ốp hệ mộc tiêu âm đa lớp GuHomes' : 'Hiện trạng mộc thô chưa xử lý âm học'}
                </h4>
              </div>

              <div className="inline-flex p-1.5 rounded-2xl bg-surface border border-line shrink-0">
                <button
                  type="button"
                  onClick={() => setIsTreated(false)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-mono transition-all',
                    !isTreated
                      ? 'bg-amber-600/10 text-amber-600 border border-amber-500/30 font-semibold shadow-sm'
                      : 'text-muted hover:text-ink'
                  )}
                >
                  Mộc thô (Reverberant)
                </button>
                <button
                  type="button"
                  onClick={() => setIsTreated(true)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-mono transition-all',
                    isTreated
                      ? 'bg-accent text-canvas font-semibold shadow-sm'
                      : 'text-muted hover:text-ink'
                  )}
                >
                  GuHomes Treated (-75%)
                </button>
              </div>
            </div>

            {/* RT60 Waveform & Decibel Decay Graph Display */}
            <div className="p-8 rounded-3xl bg-canvas border border-line relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Đồ Thị Suy Giảm Áp Suất Âm (Impulse Response Decay -60dB)</span>
                <span className={statusColor}>
                  {isTreated ? 'Tĩnh lặng chuẩn studio' : 'Vang dội kéo dài gây ồn'}
                </span>
              </div>

              {/* Graphic Visual Decay Curve */}
              <div className="mt-6 relative h-48 sm:h-56 w-full flex items-end">
                {/* Background grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="border-b border-dashed border-ink w-full" />
                  <div className="border-b border-dashed border-ink w-full" />
                  <div className="border-b border-dashed border-ink w-full" />
                  <div className="border-b border-line w-full" />
                </div>

                {/* Y-axis labels */}
                <div className="absolute -left-1 top-0 bottom-0 flex flex-col justify-between text-[9px] font-mono text-muted/60 pointer-events-none">
                  <span>0 dB (Đỉnh phát)</span>
                  <span>-20 dB</span>
                  <span>-40 dB</span>
                  <span>-60 dB (Ngưỡng tắt âm)</span>
                </div>

                {/* SVG Curve Display */}
                <svg
                  viewBox="0 0 500 200"
                  className="w-full h-full overflow-visible z-10 pl-6"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`grad-treated-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent, #B88E44)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--color-accent, #B88E44)" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id={`grad-raw-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d97706" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Raw unconditioned curve: Long decay reaching past 2.0s */}
                  <motion.path
                    d="M 0 10 Q 50 40, 120 70 T 250 110 T 380 150 T 470 195 L 470 200 L 0 200 Z"
                    fill={`url(#grad-raw-${uniqueId})`}
                    opacity={!isTreated ? 1 : 0.25}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    d="M 0 10 Q 50 40, 120 70 T 250 110 T 380 150 T 470 195"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth={!isTreated ? 3 : 1.5}
                    strokeDasharray={!isTreated ? 'none' : '4 4'}
                    opacity={!isTreated ? 1 : 0.4}
                    transition={{ duration: 0.5 }}
                  />

                  {/* GuHomes treated curve: Rapid smooth exponential decay within 0.45s */}
                  <motion.path
                    d="M 0 10 Q 30 70, 70 130 T 130 185 T 160 198 L 160 200 L 0 200 Z"
                    fill={`url(#grad-treated-${uniqueId})`}
                    opacity={isTreated ? 1 : 0.2}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    d="M 0 10 Q 30 70, 70 130 T 130 185 T 160 198"
                    fill="none"
                    stroke="var(--color-accent, #B88E44)"
                    strokeWidth={isTreated ? 3.5 : 1.5}
                    opacity={isTreated ? 1 : 0.3}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Impulse Pulse Ripple */}
                  {isPlayingPulse && (
                    <motion.circle
                      cx="0"
                      cy="10"
                      r="40"
                      fill="none"
                      stroke={isTreated ? 'var(--color-accent)' : '#d97706'}
                      strokeWidth="2"
                      initial={{ r: 5, opacity: 1 }}
                      animate={{ r: 180, opacity: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  )}
                </svg>

                {/* X-axis time markers */}
                <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[9px] font-mono text-muted/60 pt-2 border-t border-line/40">
                  <span>0.0s (Phát)</span>
                  <span>0.5s</span>
                  <span>1.0s</span>
                  <span>1.5s</span>
                  <span>2.0s</span>
                  <span>2.5s</span>
                </div>
              </div>

              {/* Metrics Badge Box */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-line/60">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Thời gian vang (RT60)</p>
                  <p className={cn('text-2xl font-serif mt-1 font-light', statusColor)}>
                    {currentRt60.toFixed(2)}s
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">
                    {isTreated ? 'Tiêu chuẩn Sabine vàng' : 'Vượt ngưỡng khó chịu (>1.5s)'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Mức độ triệt tiêu tiếng vọng</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {isTreated ? `-${room.reductionPercent}%` : '0%'}
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Tiếng vọng khó chịu</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Độ rõ tiếng nói (STI Index)</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {isTreated ? '0.78 (Xuất sắc)' : '0.41 (Kém)'}
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Speech Transmission</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Độ ồn nền tĩnh (Noise Floor)</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {isTreated ? '< 28 dBA' : '46 – 52 dBA'}
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Đo lúc 22:00 đêm</p>
                </div>
              </div>
            </div>

            {/* 6-Band Frequency Spectrum Interactive Bar Chart */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <div className="flex items-center justify-between pb-4 border-b border-line/60">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">
                  Phổ Tần Số Âm Học 6 Băng Tần (125 Hz – 4000 Hz)
                </span>
                <span className="text-[11px] font-mono text-accent">Nhấp chọn tần số để xem cơ chế</span>
              </div>

              <div className="mt-6 grid grid-cols-6 gap-2 sm:gap-3">
                {room.frequencyBands.map((band, idx) => {
                  const isSelected = activeBandIndex === idx
                  const rtVal = isTreated ? band.treatedRt60 : band.rawRt60
                  const heightPercent = Math.min(100, Math.round((rtVal / 2.6) * 100))

                  return (
                    <button
                      key={band.freq}
                      onClick={() => setActiveBandIndex(idx)}
                      className={cn(
                        'flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 group text-center',
                        isSelected
                          ? 'border-accent bg-surface ring-1 ring-accent/40 shadow-sm'
                          : 'border-line/60 bg-canvas hover:border-line-dark'
                      )}
                    >
                      <span className="text-[11px] font-mono text-muted group-hover:text-ink">{band.freq}</span>
                      <span className="text-[10px] font-mono text-muted/60">{band.label}</span>

                      {/* Bar Visualization Container */}
                      <div className="w-full h-24 bg-surface rounded-xl my-3 flex items-end p-1 relative overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ height: `${heightPercent}%` }}
                          transition={{ duration: 0.4 }}
                          className={cn(
                            'w-full rounded-lg transition-colors',
                            isTreated ? 'bg-accent' : 'bg-amber-600/70'
                          )}
                        />
                      </div>

                      <span className="text-xs font-mono font-medium text-ink">
                        {rtVal.toFixed(2)}s
                      </span>
                      <span className="text-[9px] font-mono text-muted/70 mt-0.5">
                        {isTreated ? `α=${band.absorptionTreated}` : `α=${band.absorptionRaw}`}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Band Insight Detail Box */}
              <div className="mt-6 p-4 rounded-2xl bg-surface/70 border border-line text-xs font-mono flex items-start gap-3">
                <span className="text-accent text-sm mt-0.5">◈</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-ink font-semibold">{activeBand.freq} ({activeBand.label})</span>
                    <span className="text-muted">· Hệ số hấp thụ âm α:</span>
                    <span className="text-accent font-semibold">
                      {isTreated ? activeBand.absorptionTreated : activeBand.absorptionRaw}
                    </span>
                  </div>
                  <p className="text-muted font-normal mt-1 leading-relaxed">
                    {activeBand.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Engineering & Material Specifications */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* Architectural Challenge & GuHomes Formula */}
            <div className="p-8 rounded-3xl bg-canvas border border-line flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  Thách Thức Hiện Trường Thô
                </span>
                <p className="text-sm font-light text-muted mt-3 leading-relaxed">
                  {room.rawChallenge}
                </p>

                <div className="mt-6 pt-6 border-t border-line/60">
                  <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                    Giải Pháp Âm Học May Đo GuHomes
                  </span>
                  <p className="text-sm font-light text-ink mt-3 leading-relaxed">
                    {room.guhomesSolution}
                  </p>
                </div>

                {/* Sabine Formula Note */}
                <div className="mt-6 p-4 rounded-2xl bg-surface border border-line text-xs font-mono text-muted leading-relaxed">
                  <p className="text-ink font-semibold">Công thức Sabine chuẩn mực:</p>
                  <p className="mt-1 text-accent font-mono">RT60 = 0.161 × (V / A)</p>
                  <p className="mt-1 text-[11px] text-muted">
                    Thể tích phòng: <span className="text-ink">{room.dimensions.volumeM3}m³</span> · Diện tích hấp thụ âm tương đương tăng từ{' '}
                    <span className="text-ink">{Math.round(room.dimensions.volumeM3 * 0.161 / room.rawRt60Average)} Sabins</span> lên{' '}
                    <span className="text-accent font-semibold">{Math.round(room.dimensions.volumeM3 * 0.161 / room.treatedRt60Average)} Sabins</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Acoustic Material Composition Breakdown */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <div className="flex items-center justify-between pb-4 border-b border-line/60">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">
                  Cấu Trúc 4 Lớp Vật Liệu Tiêu Âm Giấu Viền
                </span>
                <span className="text-xs font-mono text-accent">NRC up to 0.95</span>
              </div>

              <div className="mt-6 space-y-4">
                {room.materials.map((mat, i) => (
                  <div
                    key={mat.name}
                    className="p-4 rounded-2xl bg-surface border border-line/60 hover:border-accent transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-accent">Lớp 0{i + 1}</span>
                        <h5 className="font-serif text-sm font-medium text-ink mt-0.5">{mat.name}</h5>
                      </div>
                      <span className="px-2 py-1 rounded-md bg-canvas border border-line text-[11px] font-mono text-accent shrink-0">
                        NRC {mat.nrc}
                      </span>
                    </div>

                    <div className="mt-2 text-xs font-mono text-muted/80 flex items-center gap-2">
                      <span>Độ dày: {mat.thickness}</span>
                    </div>

                    <p className="text-[11px] text-muted mt-2 leading-relaxed font-light">
                      {mat.layering}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Callout */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-espresso to-[#2B231D] text-canvas relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Đo Đạc Hiện Trường Miễn Phí
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-canvas mt-2">
                Kiểm âm thực tế bằng máy đo Norsonic Na Uy
              </h4>
              <p className="text-xs text-canvas/80 mt-3 font-light leading-relaxed">
                Các chuyên gia âm học và KTS GuHomes sẽ đến trực tiếp căn hộ đo đạc biểu đồ phản xạ âm thực tế, giúp bạn chọn đúng độ dày bông khoáng và rãnh gỗ xẻ mà không làm mất diện tích thông thủy.
              </p>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
                >
                  <span>Đặt lịch đo đạc âm học căn hộ</span>
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
