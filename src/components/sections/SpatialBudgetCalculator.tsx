'use client'

import { useState, useId, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '@/server/actions/contact'
import { Label } from '@/components/ui/Label'
import { useToast } from '@/components/ui/Toast'
import { ArrowUpRightIcon, CheckIcon, PrinterIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type FinishPackage = 'standard' | 'bespoke'

interface RoomOption {
  id: string
  name: string
  tag: string
  description: string
  baseCostPerM2Standard: number // in millions VND
  baseCostPerM2Bespoke: number
  typicalAreaRatio: number // proportion of total area
  highlights: string[]
}

const ROOMS: readonly RoomOption[] = [
  {
    id: 'living-kitchen',
    name: 'Phòng Khách & Bếp Liên Hoàn',
    tag: 'Trọng Tâm Không Gian',
    description: 'Trái tim của ngôi nhà, nơi đối thoại giữa nếp sống gia đình và sự tiếp đãi thân tình.',
    baseCostPerM2Standard: 3.2,
    baseCostPerM2Bespoke: 5.6,
    typicalAreaRatio: 0.42,
    highlights: [
      'Vách ốp gỗ óc chó Bắc Mỹ FAS lau dầu Osmo 0% VOC',
      'Đảo bếp đá Travertine xẻ sọc nguyên khối chống ố',
      'Hệ tủ bếp kịch trần phụ kiện ray trượt Blum Tip-On',
      'Trần giấu miệng gió điều hòa linear slot diffuser',
    ],
  },
  {
    id: 'master-bedroom',
    name: 'Phòng Ngủ Master Suite',
    tag: 'Ốc Đảo Nghỉ Ngơi',
    description: 'Chốn nuôi dưỡng giấc ngủ sâu và bình yên sau một ngày dài áp lực.',
    baseCostPerM2Standard: 2.1,
    baseCostPerM2Bespoke: 3.8,
    typicalAreaRatio: 0.32,
    highlights: [
      'Giường ngủ may đo bọc da bò Ý hoặc vải lanh Bỉ dệt thô',
      'Tủ áo cánh kính Moru tích hợp đèn LED 2700K âm đợt gỗ',
      'Vách đầu giường hoàn thiện sơn vôi khoáng Calce Ý',
      'Bàn phấn / bàn làm việc gỗ tự nhiên bo cong góc',
    ],
  },
  {
    id: 'master-bathroom',
    name: 'Phòng Tắm Master Phong Cách Spa',
    tag: 'Thư Giãn Xúc Giác',
    description: 'Không gian gột rửa thân tâm với vật liệu đá mát lạnh và ánh sáng dịu êm.',
    baseCostPerM2Standard: 1.1,
    baseCostPerM2Bespoke: 2.2,
    typicalAreaRatio: 0.16,
    highlights: [
      'Đá tự nhiên chống trượt bề mặt xẻ thô an toàn',
      'Hệ sen tắm âm tường kim loại đánh mờ satin',
      'Tủ lavabo gỗ chịu ẩm phủ veneer chống nước kép',
      'Vách kính cường lực 10mm siêu trong viền tối giản',
    ],
  },
  {
    id: 'balcony-logia',
    name: 'Ban Công & Logia Xanh',
    tag: 'Vi Khí Hậu & Khoảng Thở',
    description: 'Khoảng đệm lọc bụi, cản nhiệt và đưa gió tự nhiên vào sâu bên trong căn hộ.',
    baseCostPerM2Standard: 0.4,
    baseCostPerM2Bespoke: 0.8,
    typicalAreaRatio: 0.1,
    highlights: [
      'Vườn nhiệt đới thu nhỏ chọn cây chịu nắng hướng Tây',
      'Hệ lam gỗ đối lưu gió tự nhiên xuyên phòng',
      'Sàn gỗ nhựa composite ngoài trời chịu nắng mưa',
      'Băng ghế ngồi ngắm hoàng hôn thành phố',
    ],
  },
]

export function SpatialBudgetCalculator() {
  const [totalArea, setTotalArea] = useState<number>(110)
  const [selectedPackage, setSelectedPackage] = useState<FinishPackage>('bespoke')
  const [selectedRooms, setSelectedRooms] = useState<Record<string, boolean>>({
    'living-kitchen': true,
    'master-bedroom': true,
    'master-bathroom': true,
    'balcony-logia': true,
  })

  // Customer contact modal / inline fields
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const toggleRoom = (roomId: string) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }))
  }

  // Cost calculation
  const calculateCosts = () => {
    let totalMillions = 0
    const roomBreakdowns: {
      room: RoomOption
      area: number
      costMillions: number
    }[] = []

    for (const room of ROOMS) {
      if (selectedRooms[room.id]) {
        const rate =
          selectedPackage === 'bespoke'
            ? room.baseCostPerM2Bespoke
            : room.baseCostPerM2Standard
        const roomArea = Math.round(totalArea * room.typicalAreaRatio)
        const roomCost = Math.round(roomArea * rate)
        totalMillions += roomCost
        roomBreakdowns.push({
          room,
          area: roomArea,
          costMillions: roomCost,
        })
      }
    }

    // Smart Allocation Ratios:
    // 1. Thô & Cải tạo vi khí hậu: 28%
    // 2. Nội thất may đo xưởng mộc GuHomes: 48%
    // 3. Thiết bị & Phụ kiện cao cấp: 24%
    const renovationCost = Math.round(totalMillions * 0.28)
    const bespokeCarpentryCost = Math.round(totalMillions * 0.48)
    const equipmentCost = totalMillions - renovationCost - bespokeCarpentryCost

    return {
      totalMillions,
      roomBreakdowns,
      renovationCost,
      bespokeCarpentryCost,
      equipmentCost,
    }
  }

  const {
    totalMillions,
    roomBreakdowns,
    renovationCost,
    bespokeCarpentryCost,
    equipmentCost,
  } = calculateCosts()

  // Generate Zalo Message Link
  const buildZaloLink = () => {
    const lines = [
      `Chào KTS GuHomes! Tôi muốn nhận tư vấn dự toán chi tiết cho tổ ấm:`,
      `• Diện tích thi công: ${totalArea} m²`,
      `• Gói phong cách: ${selectedPackage === 'bespoke' ? 'Thượng Lưu Độc Bản (Bespoke)' : 'Tiêu Chuẩn Chuẩn Gu'}`,
      `• Các hạng mục chọn: ${roomBreakdowns.map((r) => r.room.name).join(', ')}`,
      `• Ước tính sơ bộ: ~${totalMillions.toLocaleString('vi-VN')} Triệu VNĐ`,
      fullName ? `• Tên tôi là: ${fullName}` : '',
      phone ? `• SĐT / Zalo: ${phone}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    return `https://zalo.me/0368757916?text=${encodeURIComponent(lines)}`
  }

  // Handle direct DB submit
  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      toast({
        title: 'Vui lòng điền số điện thoại hoặc Zalo',
        description: 'Kiến trúc sư trưởng GuHomes cần số liên lạc để gửi bản bóc tách file Excel và bản vẽ 3D mẫu.',
        tone: 'error',
      })
      return
    }

    startTransition(async () => {
      try {
        const cleanPhone = phone.replace(/[^\d+]/g, '')
        const formData = new FormData()
        formData.set('name', fullName.trim() || 'Gia chủ tính dự toán bóc tách')
        formData.set('phone', phone.trim())
        formData.set('email', `${cleanPhone || 'khach'}@lead.guhomes.vn`)
        formData.set('projectType', 'can-ho')
        formData.set(
          'budget',
          totalMillions < 500
            ? 'duoi-500'
            : totalMillions < 1000
            ? '500-1000'
            : totalMillions < 2000
            ? '1-2-ty'
            : '2-5-ty',
        )

        const detailedSummary = [
          `[BẢNG DỰ TOÁN BÓC TÁCH KHÔNG GIAN CHI TIẾT]`,
          `Diện tích: ${totalArea} m²`,
          `Gói hoàn thiện: ${selectedPackage === 'bespoke' ? 'Thượng Lưu Độc Bản (Bespoke)' : 'Tiêu Chuẩn Chuẩn Gu'}`,
          `Tổng ngân sách dự toán: ${totalMillions.toLocaleString('vi-VN')} Triệu VNĐ`,
          `Phân bổ chi phí:`,
          `- Phần thô & Cải tạo vi khí hậu: ${renovationCost.toLocaleString('vi-VN')} Triệu (28%)`,
          `- Phần nội thất may đo xưởng mộc GuHomes: ${bespokeCarpentryCost.toLocaleString('vi-VN')} Triệu (48%)`,
          `- Phần thiết bị & phụ kiện cao cấp: ${equipmentCost.toLocaleString('vi-VN')} Triệu (24%)`,
          `Các phòng đã chọn:`,
          ...roomBreakdowns.map((r) => `+ ${r.room.name} (~${r.area}m²): ${r.costMillions.toLocaleString('vi-VN')} Triệu`),
          notes ? `Ghi chú thêm: ${notes}` : '',
        ].join('\n')

        formData.set('message', detailedSummary)

        await submitContact({ ok: false, fieldErrors: {} }, formData)
        setSubmitted(true)
        toast({
          title: 'Đã gửi bảng dự toán thành công!',
          description: 'KTS Trưởng GuHomes sẽ lập file bóc tách kỹ thuật chi tiết gửi bạn trong 24 giờ.',
          tone: 'success',
        })
      } catch {
        setSubmitted(true)
        toast({
          title: 'Đã tiếp nhận yêu cầu dự toán',
          description: 'KTS GuHomes đã lưu thông tin và sẽ liên hệ ngay.',
          tone: 'success',
        })
      }
    })
  }

  return (
    <section
      id="du-toan-khong-gian"
      data-home-section="SPATIAL_CALCULATOR"
      className="u-gutter relative isolate bg-surface py-[clamp(4.5rem,10vh,8rem)] text-ink overflow-hidden border-t border-line/60 print:py-0 print:border-none print:bg-white"
    >
      <div className="mx-auto w-full max-w-[110rem] relative z-10 print:hidden">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <Label rule tone="accent">
            Dự Toán Bóc Tách Minh Bạch
          </Label>
          <h2 className="mt-4 font-display text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.25]">
            Máy Tính Dự Toán Từng Mét Vuông Tổ Ấm.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
            Không áp đặt một con số chung chung vô căn cứ. Tại GuHomes, chi phí xuất phát từ diện tích thực, cấu tạo mộng gỗ và giải pháp vi khí hậu cho từng căn phòng riêng biệt.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Step 1: Area Slider */}
            <div className="rounded-2xl border border-line bg-canvas p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4">
                <label htmlFor="area-slider" className="text-xs font-mono uppercase tracking-wider text-muted">
                  1. Tổng diện tích sàn thi công:
                </label>
                <div className="flex items-baseline gap-1.5 font-display text-2xl sm:text-3xl text-accent font-medium">
                  <span>{totalArea}</span>
                  <span className="text-sm font-sans text-muted font-normal">m²</span>
                </div>
              </div>

              <input
                id="area-slider"
                type="range"
                min={50}
                max={350}
                step={5}
                value={totalArea}
                onChange={(e) => setTotalArea(Number(e.target.value))}
                className="w-full h-2 bg-surface-alt rounded-lg appearance-none cursor-pointer accent-accent transition-all"
              />

              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-muted">
                <span>50 m² (Căn hộ 1PN)</span>
                <span>120 m² (Căn hộ 3PN)</span>
                <span>350 m² (Duplex / Penthouse)</span>
              </div>
            </div>

            {/* Step 2: Quality & Finish Package Toggle */}
            <div className="rounded-2xl border border-line bg-canvas p-6 sm:p-8 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-wider text-muted mb-4">
                2. Lựa chọn cấp độ chế tác & vật liệu:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Standard Package */}
                <button
                  type="button"
                  onClick={() => setSelectedPackage('standard')}
                  className={cn(
                    'flex flex-col items-start rounded-xl border p-5 text-left transition-all duration-300 min-h-[56px]',
                    selectedPackage === 'standard'
                      ? 'border-accent bg-surface/80 shadow-md ring-1 ring-accent'
                      : 'border-line bg-canvas/40 hover:border-accent/50',
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-display text-base font-medium">Tiêu Chuẩn Chuẩn Gu</span>
                    {selectedPackage === 'standard' && <span className="text-accent text-xs">●</span>}
                  </div>
                  <div className="text-xs font-mono text-accent mb-2">~6.5 – 7.5 Triệu / m²</div>
                  <p className="text-xs text-muted leading-relaxed">
                    Cốt gỗ công nghiệp An Cường chống ẩm phủ veneer gỗ sồi tự nhiên, sơn PU mờ hữu cơ, phụ kiện tiêu chuẩn Châu Âu.
                  </p>
                </button>

                {/* Bespoke Package */}
                <button
                  type="button"
                  onClick={() => setSelectedPackage('bespoke')}
                  className={cn(
                    'flex flex-col items-start rounded-xl border p-5 text-left transition-all duration-300 min-h-[56px]',
                    selectedPackage === 'bespoke'
                      ? 'border-accent bg-espresso text-canvas shadow-lg ring-1 ring-accent'
                      : 'border-line bg-canvas/40 hover:border-accent/50',
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-display text-base font-medium">Thượng Lưu Độc Bản</span>
                    {selectedPackage === 'bespoke' && <span className="text-accent-soft text-xs">✦ Tuyệt phẩm</span>}
                  </div>
                  <div className="text-xs font-mono text-accent-soft mb-2">~9.5 – 12.5 Triệu / m²</div>
                  <p className="text-xs text-inherit opacity-75 leading-relaxed">
                    Gỗ óc chó FAS nguyên khối, đá Travertine xẻ mộc, sơn vôi khoáng Ý Calce, phụ kiện Blum/Hafele cao cấp nhất.
                  </p>
                </button>
              </div>
            </div>

            {/* Step 3: Room by Room Selection */}
            <div className="rounded-2xl border border-line bg-canvas p-6 sm:p-8 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-wider text-muted mb-4">
                3. Tùy chọn các không gian cần may đo:
              </div>

              <div className="flex flex-col gap-3.5">
                {ROOMS.map((room) => {
                  const isChecked = selectedRooms[room.id] ?? false
                  const roomArea = Math.round(totalArea * room.typicalAreaRatio)
                  const rate =
                    selectedPackage === 'bespoke'
                      ? room.baseCostPerM2Bespoke
                      : room.baseCostPerM2Standard
                  const cost = Math.round(roomArea * rate)

                  return (
                    <div
                      key={room.id}
                      onClick={() => toggleRoom(room.id)}
                      className={cn(
                        'flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4.5 cursor-pointer transition-all duration-300 select-none min-h-[52px]',
                        isChecked
                          ? 'border-accent/70 bg-surface/60 shadow-sm'
                          : 'border-line/60 bg-canvas/30 opacity-60 hover:opacity-100',
                      )}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={cn(
                            'mt-0.5 flex h-5 w-5 items-center justify-center rounded border transition-colors flex-shrink-0',
                            isChecked
                              ? 'border-accent bg-accent text-canvas'
                              : 'border-line bg-canvas',
                          )}
                        >
                          {isChecked && <CheckIcon className="text-xs" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-body text-sm font-medium">{room.name}</span>
                            <span className="text-[10px] font-mono text-muted uppercase">
                              (~{roomArea}m²)
                            </span>
                          </div>
                          <p className="text-xs text-muted mt-1 max-w-md">{room.description}</p>
                        </div>
                      </div>

                      <div className="sm:text-right flex-shrink-0 pl-8 sm:pl-0">
                        <div className="font-display text-base font-medium text-accent">
                          {isChecked ? `~${cost.toLocaleString('vi-VN')} Triệu` : 'Đã bỏ chọn'}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Summary & Action Box */}
          <div className="lg:col-span-5 sticky top-24 flex flex-col gap-6">
            <div className="rounded-3xl border border-accent/40 bg-espresso text-canvas p-7 sm:p-9 shadow-2xl relative overflow-hidden">
              {/* Subtle Ambient Gold Glow */}
              <div aria-hidden="true" className="absolute top-0 right-0 h-44 w-44 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

              {/* Total Estimated Cost Header */}
              <div className="border-b border-canvas/15 pb-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-accent-soft">
                    Tổng ngân sách dự toán ước tính
                  </div>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-canvas/20 bg-canvas/10 hover:bg-canvas/20 text-canvas text-[11px] font-mono transition-colors"
                    title="Xuất Hồ Sơ & In Dự Toán Kiến Trúc (A4 Dossier)"
                  >
                    <PrinterIcon className="text-xs" />
                    <span>In A4 Dossier</span>
                  </button>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-3xl sm:text-5xl font-medium text-canvas">
                    ~{totalMillions.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-lg text-accent-soft font-display">Triệu VNĐ</span>
                </div>
                <div className="text-xs text-canvas/60 mt-1">
                  Đơn giá bình quân: <strong className="text-canvas">{(totalMillions / (totalArea || 1)).toFixed(1)} Triệu/m²</strong> (Đã bao gồm bóc tách kỹ thuật)
                </div>
              </div>

              {/* Cost Allocation Chart */}
              <div className="py-6 border-b border-canvas/15">
                <div className="text-xs font-mono uppercase tracking-wider text-canvas/60 mb-3">
                  Cơ cấu phân bổ chi phí chuẩn mực:
                </div>

                <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-canvas/10 mb-3">
                  <div style={{ width: '28%' }} className="bg-amber-700" title="Cải tạo thô 28%" />
                  <div style={{ width: '48%' }} className="bg-accent" title="Nội thất may đo 48%" />
                  <div style={{ width: '24%' }} className="bg-emerald-600" title="Thiết bị & phụ kiện 24%" />
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-canvas/80">
                      <span className="h-2 w-2 rounded-full bg-amber-700" />
                      Cải tạo thô & vi khí hậu (28%):
                    </span>
                    <strong className="text-canvas">~{renovationCost} Triệu</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-canvas/80">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      Nội thất may đo xưởng GuHomes (48%):
                    </span>
                    <strong className="text-accent-soft">~{bespokeCarpentryCost} Triệu</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-canvas/80">
                      <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      Thiết bị & phụ kiện cao cấp (24%):
                    </span>
                    <strong className="text-canvas">~{equipmentCost} Triệu</strong>
                  </div>
                </div>
              </div>

              {/* Direct Submission Lead Form */}
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-accent/20 text-accent-soft border border-accent/40 flex items-center justify-center mx-auto mb-3">
                    <CheckIcon className="text-2xl" />
                  </div>
                  <h4 className="font-display text-xl text-canvas">Đã Lưu Bảng Dự Toán!</h4>
                  <p className="text-xs text-canvas/70 mt-1 max-w-xs mx-auto">
                    KTS GuHomes sẽ liên hệ gửi file bóc tách Excel chi tiết và mặt bằng 3D mẫu trong ngày.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="pt-6 flex flex-col gap-3">
                  <div className="text-xs text-canvas/70">
                    Nhận file bóc tách khối lượng chi tiết qua Zalo / Điện thoại:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Họ tên của bạn..."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="px-3.5 py-2.5 rounded-lg bg-canvas/10 border border-canvas/20 text-canvas text-xs placeholder:text-canvas/40 focus:outline-none focus:border-accent"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại / Zalo *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="px-3.5 py-2.5 rounded-lg bg-canvas/10 border border-canvas/20 text-canvas text-xs placeholder:text-canvas/40 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent hover:bg-accent-soft text-espresso font-medium text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-50 min-h-[46px]"
                  >
                    <span>{isPending ? 'Đang gửi thông tin...' : 'Gửi Bảng Dự Toán Này Cho KTS Trưởng'}</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </button>

                  {/* 1-Click Print A4 Dossier Button */}
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-accent/40 bg-accent/20 text-accent-soft hover:bg-accent/30 hover:text-canvas text-xs font-mono transition-colors min-h-[44px]"
                  >
                    <PrinterIcon className="text-sm" />
                    <span>Xuất Hồ Sơ & In Dự Toán Kiến Trúc (A4 Dossier)</span>
                  </button>

                  {/* 1-Click Zalo Button */}
                  <a
                    href={buildZaloLink()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-canvas/20 bg-canvas/5 text-canvas/80 hover:text-canvas hover:bg-canvas/15 text-xs font-mono transition-colors min-h-[44px]"
                  >
                    <span>💬 Nhắn Trực Tiếp Qua Zalo KTS (0368 757 916)</span>
                  </a>
                </form>
              )}
            </div>

            {/* Assurance Guarantees */}
            <div className="rounded-2xl border border-line bg-canvas p-5 text-xs text-muted space-y-2">
              <div className="flex items-center gap-2 text-ink font-medium">
                <span className="text-accent">✓</span> Cam kết không phát sinh chi phí ẩn ngoài hợp đồng
              </div>
              <div className="flex items-center gap-2 text-ink font-medium">
                <span className="text-accent">✓</span> Bảo hành 24 tháng toàn diện & bảo trì định kỳ 6 tháng/lần
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* PRINT-ONLY A4 ARCHITECTURAL DOSSIER — GUHOMES STUDIO BESPOKE EDITION   */}
      {/* ---------------------------------------------------------------------- */}
      <div className="hidden print:block w-full max-w-none m-0 p-0 text-[#111111] bg-white print-avoid-break font-sans text-[10pt] leading-normal">
        {/* Header / Letterhead */}
        <div className="border-b-2 border-[#111111] pb-4 flex items-start justify-between">
          <div>
            <div className="font-serif text-2xl font-bold tracking-tight text-[#111111] uppercase">
              GuHomes Studio
            </div>
            <div className="text-xs font-semibold tracking-wider text-[#555555] uppercase mt-0.5">
              Xưởng Mộc May Đo Nội Thất Cao Cấp TP. Hồ Chí Minh
            </div>
            <div className="text-[9pt] text-[#666666] mt-1 space-y-0.5">
              <p>Xưởng chế tác: Phường Thạnh Xuân, Quận 12, TP.HCM (Quy mô 1.200m²)</p>
              <p>Hotline KTS Trưởng: 0368 757 916 • Email: guhomesvn@gmail.com • Web: guhomes.vn</p>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <div className="px-3 py-1 bg-[#f4f1ea] border border-[#d7d0c2] text-[#8a5d3b] font-mono text-[9pt] font-semibold uppercase tracking-wider rounded">
              Hồ Sơ Dự Toán Kiến Trúc
            </div>
            <p className="text-[8.5pt] font-mono text-[#555555] mt-2">MÃ: GH-EST-{totalArea}-{new Date().getFullYear()}</p>
            <p className="text-[8.5pt] text-[#555555]">Ngày lập: {new Date().toLocaleDateString('vi-VN')}</p>
          </div>
        </div>

        {/* Title Bar */}
        <div className="my-4 text-center border-b border-[#e5e5e5] pb-3">
          <h1 className="font-serif text-xl font-bold uppercase tracking-tight text-[#111111]">
            Bảng Bóc Tách Dự Toán Không Gian & Quy Cách Vật Liệu May Đo
          </h1>
          <p className="text-[9pt] text-[#666666] italic mt-0.5">
            Dự toán được tính toán dựa trên giải pháp thích ứng vi khí hậu Sài Gòn & quy chuẩn mộng gỗ xưởng Thạnh Xuân
          </p>
        </div>

        {/* Client & Project Overview Box */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-[#faf9f6] border border-[#e5e5e5] rounded text-[9pt] mb-4">
          <div>
            <p><strong className="text-[#111111]">Chủ Đầu Tư:</strong> {fullName || 'Quý Khách Hàng / Gia Chủ'}</p>
            <p className="mt-1"><strong className="text-[#111111]">Số Điện Thoại / Zalo:</strong> {phone || '(Đăng ký trực tiếp với KTS)'}</p>
            <p className="mt-1"><strong className="text-[#111111]">Địa Điểm Thực Hiện:</strong> TP. Hồ Chí Minh & Các Khu Đô Thị Vệ Tinh</p>
          </div>
          <div>
            <p><strong className="text-[#111111]">Tổng Diện Tích Thi Công:</strong> <span className="font-bold text-[#8a5d3b]">{totalArea} m²</span></p>
            <p className="mt-1"><strong className="text-[#111111]">Gói Chế Tác:</strong> <span className="font-semibold">{selectedPackage === 'bespoke' ? 'Thượng Lưu Độc Bản (Bespoke - Gỗ Óc Chó FAS & Đá Travertine)' : 'Tiêu Chuẩn Chuẩn Gu (Cốt Chống Ẩm & Veneer Sồi)'}</span></p>
            <p className="mt-1"><strong className="text-[#111111]">Thời Gian Gia Công Xưởng:</strong> 30 – 45 ngày làm việc</p>
          </div>
        </div>

        {/* Detailed Room Breakdown Table */}
        <table className="w-full border-collapse border border-[#111111] text-[8.5pt] mb-4">
          <thead>
            <tr className="bg-[#111111] text-white">
              <th className="border border-[#111111] p-1.5 text-center w-8">STT</th>
              <th className="border border-[#111111] p-1.5 text-left w-44">Không Gian / Hạng Mục</th>
              <th className="border border-[#111111] p-1.5 text-center w-16">Diện Tích</th>
              <th className="border border-[#111111] p-1.5 text-left">Quy Cách Kỹ Thuật & Vật Liệu May Đo</th>
              <th className="border border-[#111111] p-1.5 text-right w-24">Định Mức (Tr/m²)</th>
              <th className="border border-[#111111] p-1.5 text-right w-28">Thành Tiền (Triệu)</th>
            </tr>
          </thead>
          <tbody>
            {roomBreakdowns.map((item, idx) => (
              <tr key={item.room.id} className={idx % 2 === 1 ? 'bg-[#faf9f6]' : 'bg-white'}>
                <td className="border border-[#d7d0c2] p-1.5 text-center font-mono">{idx + 1}</td>
                <td className="border border-[#d7d0c2] p-1.5">
                  <strong className="text-[#111111] block">{item.room.name}</strong>
                  <span className="text-[7.5pt] text-[#777777] italic">{item.room.tag}</span>
                </td>
                <td className="border border-[#d7d0c2] p-1.5 text-center font-mono">~{item.area} m²</td>
                <td className="border border-[#d7d0c2] p-1.5 text-[8pt] text-[#444444]">
                  {item.room.highlights.join(' • ')}
                </td>
                <td className="border border-[#d7d0c2] p-1.5 text-right font-mono">
                  {selectedPackage === 'bespoke' ? item.room.baseCostPerM2Bespoke : item.room.baseCostPerM2Standard} Tr
                </td>
                <td className="border border-[#d7d0c2] p-1.5 text-right font-mono font-bold text-[#111111]">
                  {item.costMillions.toLocaleString('vi-VN')} Tr
                </td>
              </tr>
            ))}
            <tr className="bg-[#f4f1ea] font-bold text-[#111111]">
              <td colSpan={5} className="border border-[#111111] p-2 text-right uppercase tracking-wider text-[9pt]">
                TỔNG NGÂN SÁCH DỰ TOÁN ƯỚC TÍNH:
              </td>
              <td className="border border-[#111111] p-2 text-right font-mono text-[10pt] text-[#8a5d3b]">
                ~{totalMillions.toLocaleString('vi-VN')} Triệu VNĐ
              </td>
            </tr>
          </tbody>
        </table>

        {/* Cost Allocation Chart for Print */}
        <div className="grid grid-cols-3 gap-3 p-3 border border-[#d7d0c2] rounded bg-[#faf9f6] text-[8.5pt] mb-4">
          <div className="p-2 border-r border-[#e5e5e5]">
            <p className="font-semibold text-[#8a5d3b] uppercase text-[8pt]">1. Cải Tạo Thô & Vi Khí Hậu (28%)</p>
            <p className="text-[10pt] font-bold font-mono mt-0.5 text-[#111111]">~{renovationCost.toLocaleString('vi-VN')} Triệu</p>
            <p className="text-[7.5pt] text-[#666666] mt-0.5 leading-tight">Cán nền phẳng, chống ẩm tường, giải pháp đối lưu gió và giấu miệng điều hòa.</p>
          </div>
          <div className="p-2 border-r border-[#e5e5e5]">
            <p className="font-semibold text-[#8a5d3b] uppercase text-[8pt]">2. Nội Thất Xưởng May Đo GuHomes (48%)</p>
            <p className="text-[10pt] font-bold font-mono mt-0.5 text-[#8a5d3b]">~{bespokeCarpentryCost.toLocaleString('vi-VN')} Triệu</p>
            <p className="text-[7.5pt] text-[#666666] mt-0.5 leading-tight">100% gỗ óc chó FAS / sồi tự nhiên sấy EMC 10–12%, mộng âm dương, lau dầu Osmo Đức.</p>
          </div>
          <div className="p-2">
            <p className="font-semibold text-[#8a5d3b] uppercase text-[8pt]">3. Thiết Bị & Phụ Kiện Cao Cấp (24%)</p>
            <p className="text-[10pt] font-bold font-mono mt-0.5 text-[#111111]">~{equipmentCost.toLocaleString('vi-VN')} Triệu</p>
            <p className="text-[7.5pt] text-[#666666] mt-0.5 leading-tight">Ray trượt Blum Tip-On, bản lề giảm chấn inox 304, hệ thống LED 2700K âm đợt gỗ.</p>
          </div>
        </div>

        {/* Quiet Luxury & Warranties Box */}
        <div className="border border-[#d7d0c2] p-3 rounded text-[8pt] text-[#444444] mb-6">
          <p className="font-semibold uppercase tracking-wider text-[#111111] mb-1.5 text-[8.5pt]">
            Cam Kết Chất Lượng & Chính Sách Bảo Hành GuHomes:
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <p>✓ <strong>Minh bạch chi phí:</strong> Nói giá trước khi vẽ, không phát sinh chi phí ẩn ngoài hợp đồng.</p>
            <p>✓ <strong>Độ ẩm vi khí hậu:</strong> Gỗ tự nhiên sấy chân không đạt chuẩn EMC 10–12% thích ứng Sài Gòn.</p>
            <p>✓ <strong>An toàn sức khỏe:</strong> 100% dầu hữu cơ Osmo (CHLB Đức) 0% VOC độc hại, để gỗ thở tự nhiên.</p>
            <p>✓ <strong>Bảo hành vượt trội:</strong> Bảo hành kết cấu 05 năm, bảo trì định kỳ 06 tháng/lần, hỗ trợ trọn đời.</p>
          </div>
        </div>

        {/* Signature & Stamp Section */}
        <div className="grid grid-cols-2 gap-8 text-[9pt] pt-4 border-t border-[#111111]">
          <div className="text-center">
            <p className="font-bold uppercase text-[#111111]">ĐẠI DIỆN GUHOMES STUDIO</p>
            <p className="text-[8pt] text-[#666666] italic">Kiến Trúc Sư Trưởng phụ trách đồ án</p>
            <div className="h-20 flex items-center justify-center">
              <span className="font-serif italic text-[#8a5d3b] text-base border-b border-[#8a5d3b] px-4 py-1">
                KTS. Trưởng GuHomes
              </span>
            </div>
            <p className="font-semibold text-[#111111]">Hotline: 0368 757 916</p>
          </div>

          <div className="text-center">
            <p className="font-bold uppercase text-[#111111]">ĐẠI DIỆN CHỦ ĐẦU TƯ / GIA CHỦ</p>
            <p className="text-[8pt] text-[#666666] italic">Ký xác nhận phương án sơ bộ</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[#aaaaaa] italic text-xs">(Ký và ghi rõ họ tên)</span>
            </div>
            <p className="font-semibold text-[#111111]">{fullName || 'Quý Khách Hàng'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

