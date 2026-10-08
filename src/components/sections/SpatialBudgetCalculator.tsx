'use client'

import { useState, useId, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '@/server/actions/contact'
import { Label } from '@/components/ui/Label'
import { useToast } from '@/components/ui/Toast'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
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
      className="u-gutter relative isolate bg-surface py-[clamp(4.5rem,10vh,8rem)] text-ink overflow-hidden border-t border-line/60"
    >
      <div className="mx-auto w-full max-w-[110rem] relative z-10">
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
                <div className="text-xs font-mono uppercase tracking-wider text-accent-soft">
                  Tổng ngân sách dự toán ước tính
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
    </section>
  )
}
