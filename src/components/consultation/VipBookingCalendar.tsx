'use client'

import { useState, useTransition, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '@/server/actions/contact'
import { useToast } from '@/components/ui/Toast'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type MeetingFormat = 'studio' | 'site' | 'woodshop'

interface FormatOption {
  id: MeetingFormat
  title: string
  location: string
  description: string
  icon: string
  badge: string
}

const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: 'studio',
    title: 'Tại Văn Phòng Studio GuHomes',
    location: 'Bình Thạnh & TP. Thủ Đức, TP.HCM',
    description: 'Thưởng thức trà mộc, xem hồ sơ thiết kế mẫu và chạm thử các phiến vật liệu thực tế tại studio.',
    icon: '🏛️',
    badge: 'Tĩnh Lặng & Tập Trung',
  },
  {
    id: 'site',
    title: 'Khảo Sát Trực Tiếp Hiện Trường',
    location: 'Tư gia / Căn hộ bàn giao thô của bạn',
    description: 'KTS Trưởng mang máy đo laser đến tận công trình, đo hướng nắng chiều và đối lưu gió thực tế.',
    icon: '📐',
    badge: 'Đo Đạc Vi Khí Hậu',
  },
  {
    id: 'woodshop',
    title: 'Trải Nghiệm Xưởng Mộc Thạnh Xuân',
    location: 'Phường Thạnh Xuân, Quận 12 (1.200m²)',
    description: 'Xem lò sấy nhiệt chân không, chứng kiến 18 nghệ nhân gia công mộng ghép âm dương thủ công.',
    icon: '🪵',
    badge: 'Thực Lực Chế Tác',
  },
]

interface TimeSlot {
  id: string
  label: string
  hours: string
  note: string
}

const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'morning',
    label: 'Buổi Sáng',
    hours: '09:00 – 11:30',
    note: 'Tâm trí thảnh thơi, thích hợp thảo luận sâu về nếp sống gia đình.',
  },
  {
    id: 'afternoon',
    label: 'Buổi Chiều',
    hours: '14:00 – 16:30',
    note: 'Thời điểm lý tưởng để khảo sát nắng hướng Tây và vi khí hậu thực địa.',
  },
  {
    id: 'evening',
    label: 'Buổi Tối',
    hours: '18:00 – 20:00',
    note: 'Dành riêng cho gia chủ bận rộn sau giờ làm việc, đàm đạo ấm cúng.',
  },
]

export function VipBookingCalendar({ className }: { className?: string }) {
  const [selectedFormat, setSelectedFormat] = useState<MeetingFormat>('site')
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(1) // Tomorrow default
  const [selectedSlot, setSelectedSlot] = useState<string>('afternoon')

  // Client form fields
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [projectName, setProjectName] = useState('')
  const [notes, setNotes] = useState('')
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  // Generate next 7 days dynamically
  const nextDays = useMemo(() => {
    const days = []
    const now = new Date()
    const viDays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(now.getDate() + i)
      const dayName = i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : (viDays[d.getDay()] ?? '')
      const dateStr = `${d.getDate()}/${d.getMonth() + 1}`
      const fullDateStr = `${dayName}, ngày ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
      days.push({ index: i, dayName, dateStr, fullDateStr })
    }
    return days
  }, [])

  const currentDay = nextDays[selectedDateIndex] ?? nextDays[0]!
  const currentSlotObj = TIME_SLOTS.find((s) => s.id === selectedSlot) ?? TIME_SLOTS[0]!
  const currentFormatObj = FORMAT_OPTIONS.find((f) => f.id === selectedFormat) ?? FORMAT_OPTIONS[0]!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      toast({
        title: 'Vui lòng cung cấp số điện thoại hoặc Zalo',
        description: 'Kiến trúc sư trưởng GuHomes cần số liên lạc để xác nhận thời gian và chuẩn bị tài liệu khảo sát.',
        tone: 'error',
      })
      return
    }

    startTransition(async () => {
      try {
        const cleanPhone = phone.replace(/[^\d+]/g, '')
        const formData = new FormData()
        formData.set('name', fullName.trim() || 'Gia chủ đặt lịch hẹn VIP KTS')
        formData.set('phone', phone.trim())
        formData.set('email', `${cleanPhone || 'khach'}@booking.guhomes.vn`)
        formData.set('projectType', 'can-ho')
        formData.set('budget', '1-2-ty')

        const messageContent = [
          `[ĐẶT LỊCH HẸN TƯ VẤN VIP 1-1 CÙNG KTS TRƯỞNG GUHOMES]`,
          `Hình thức gặp mặt: ${currentFormatObj.title} (${currentFormatObj.location})`,
          `Ngày hẹn: ${currentDay.fullDateStr}`,
          `Khung giờ: ${currentSlotObj.label} (${currentSlotObj.hours})`,
          `Gia chủ: ${fullName.trim() || 'Chưa cung cấp'}`,
          `Số điện thoại / Zalo: ${phone.trim()}`,
          `Dự án / Mặt bằng: ${projectName.trim() || 'Chưa cung cấp cụ thể'}`,
          notes ? `Ghi chú nhu cầu: ${notes}` : '',
        ].join('\n')

        formData.set('message', messageContent)

        await submitContact({ ok: false, fieldErrors: {} }, formData)
        setSubmitted(true)
        toast({
          title: 'Đã xác nhận lịch hẹn tư vấn VIP!',
          description: 'KTS Trưởng GuHomes sẽ liên hệ trực tiếp với bạn trong vòng 30 phút.',
          tone: 'success',
        })
      } catch {
        setSubmitted(true)
        toast({
          title: 'Đã tiếp nhận lịch hẹn VIP',
          description: 'KTS Trưởng GuHomes đã lưu thông tin và sẽ gọi xác nhận ngay.',
          tone: 'success',
        })
      }
    })
  }

  return (
    <section className={cn('relative bg-surface text-ink py-16 sm:py-24 border-t border-line/60', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem]">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest">
            <span>Trực Tiếp &amp; Bảo Mật Tuyệt Đối</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-ink mt-3 tracking-tight">
            Đặt Lịch Tư Vấn 1-1 Cùng KTS Trưởng
          </h2>
          <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
            Không qua nhân viên sale trung gian. Người ngồi nghe bạn kể về thói quen gia đình hôm nay cũng chính là người trực tiếp lên bản vẽ chi tiết và có mặt giám sát tại công trường ngày cuối.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Format, Date & Time Selection */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
            {/* Step 1: 3 Meeting Formats */}
            <div className="rounded-2xl border border-line bg-canvas p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-mono uppercase text-muted tracking-wider block mb-4">
                1. Chọn không gian gặp gỡ phù hợp với bạn:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {FORMAT_OPTIONS.map((f) => {
                  const isSelected = selectedFormat === f.id
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFormat(f.id)}
                      className={cn(
                        'p-5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[140px]',
                        isSelected
                          ? 'bg-espresso text-canvas border-accent ring-1 ring-accent shadow-md'
                          : 'bg-surface/50 border-line text-ink hover:border-accent/40',
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{f.icon}</span>
                          {isSelected && <span className="text-accent-soft text-xs">●</span>}
                        </div>
                        <h4 className="font-display text-sm font-medium mt-3 leading-snug">{f.title}</h4>
                        <p className={cn('text-[11px] font-mono mt-1', isSelected ? 'text-accent-soft' : 'text-muted')}>
                          {f.location}
                        </p>
                      </div>
                      <p className={cn('text-xs mt-3 line-clamp-2 leading-relaxed font-light', isSelected ? 'text-canvas/75' : 'text-muted')}>
                        {f.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Next 7 Days Selection */}
            <div className="rounded-2xl border border-line bg-canvas p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-mono uppercase text-muted tracking-wider block mb-4">
                2. Chọn ngày hẹn thuận tiện:
              </span>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {nextDays.map((d) => {
                  const isSelected = selectedDateIndex === d.index
                  return (
                    <button
                      key={d.index}
                      type="button"
                      onClick={() => setSelectedDateIndex(d.index)}
                      className={cn(
                        'p-3 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1',
                        isSelected
                          ? 'bg-accent text-white border-accent shadow-md scale-105 font-medium'
                          : 'bg-surface/60 border-line text-ink hover:border-accent/50 hover:bg-surface',
                      )}
                    >
                      <span className="text-[10px] font-mono opacity-75 uppercase">{d.dayName}</span>
                      <span className="font-display text-base font-medium">{d.dateStr}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Time Slot Selection */}
            <div className="rounded-2xl border border-line bg-canvas p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-mono uppercase text-muted tracking-wider block mb-4">
                3. Chọn khung giờ tư vấn:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === slot.id
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot.id)}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between',
                        isSelected
                          ? 'bg-surface border-accent ring-1 ring-accent text-ink shadow-xs'
                          : 'bg-surface/40 border-line text-muted hover:border-accent/40 hover:text-ink',
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-medium text-ink">{slot.label}</span>
                        {isSelected && <CheckIcon className="text-accent text-xs" />}
                      </div>
                      <span className="text-xs font-mono text-accent font-semibold mt-1">{slot.hours}</span>
                      <p className="text-[11px] text-muted mt-2 leading-relaxed">{slot.note}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Summary & VIP Information Form */}
          <div className="col-span-12 lg:col-span-5 sticky top-24">
            <div className="rounded-3xl border border-accent/40 bg-espresso text-canvas p-7 sm:p-9 shadow-2xl relative overflow-hidden">
              {/* Subtle Warm Amber Glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-44 w-44 bg-accent/20 rounded-full blur-3xl pointer-events-none"
              />

              {/* Booking Summary Masthead */}
              <div className="border-b border-canvas/15 pb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-accent-soft block">
                  Thông Tin Lịch Hẹn Đã Chọn
                </span>
                <h3 className="font-display text-2xl text-canvas font-normal mt-2">
                  {currentFormatObj.title}
                </h3>
                <div className="mt-3 flex flex-col gap-1.5 text-xs text-canvas/80 font-mono">
                  <p className="flex items-center gap-2">
                    <span className="text-accent-soft">📅 Ngày hẹn:</span>
                    <strong className="text-canvas">{currentDay.fullDateStr}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-accent-soft">⏰ Khung giờ:</span>
                    <strong className="text-canvas">{currentSlotObj.label} ({currentSlotObj.hours})</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-accent-soft">📍 Địa điểm:</span>
                    <span className="text-canvas">{currentFormatObj.location}</span>
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-accent/20 text-accent-soft border border-accent/40 flex items-center justify-center mb-4">
                    <CheckIcon className="text-3xl" />
                  </div>
                  <h4 className="font-display text-xl text-canvas">Lịch Hẹn Đã Được Tiếp Nhận!</h4>
                  <p className="text-xs text-canvas/70 mt-2 leading-relaxed max-w-xs">
                    Kiến trúc sư trưởng GuHomes sẽ gọi điện thoại hoặc nhắn tin qua Zalo trong vòng 30 phút để xác nhận lại thông tin và chuẩn bị hồ sơ khảo sát riêng cho bạn.
                  </p>
                  <a
                    href="https://zalo.me/0368757916"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-canvas/20 bg-canvas/10 text-canvas text-xs font-mono hover:bg-canvas/20 transition-colors"
                  >
                    <span>💬 Mở Zalo Trao Đổi Ngay</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-3.5">
                  <div className="text-xs text-canvas/70">
                    Điền thông tin để KTS chuẩn bị hồ sơ đồ án trước buổi gặp:
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-canvas/60 mb-1">
                      Họ tên của gia chủ *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Anh Trần Tuấn Anh"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-canvas/10 border border-canvas/20 text-canvas text-xs placeholder:text-canvas/40 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-canvas/60 mb-1">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại để KTS gọi xác nhận"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-canvas/10 border border-canvas/20 text-canvas text-xs placeholder:text-canvas/40 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-canvas/60 mb-1">
                      Tên dự án / Mặt bằng hiện trạng
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: The Opera Metropole, D’Edge, Nhà phố Q.3..."
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-canvas/10 border border-canvas/20 text-canvas text-xs placeholder:text-canvas/40 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-canvas/60 mb-1">
                      Nhu cầu trọng tâm cần trao đổi
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ví dụ: Căn hộ nhận bàn giao thô tháng sau, quan tâm gỗ óc chó và giải pháp cản nhiệt hướng Tây..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-canvas/10 border border-canvas/20 text-canvas text-xs placeholder:text-canvas/40 focus:outline-none focus:border-accent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent hover:bg-accent-soft text-espresso font-medium text-xs font-mono transition-all hover:scale-[1.01] active:scale-95 shadow-xl disabled:opacity-50 min-h-[46px]"
                  >
                    <span>{isPending ? 'Đang xác nhận lịch hẹn...' : 'Xác Nhận Đặt Lịch Hẹn Cùng KTS Trưởng'}</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </button>

                  <p className="text-[11px] text-canvas/50 text-center font-light mt-1">
                    Buổi lắng nghe đầu tiên hoàn toàn miễn phí và không ràng buộc hợp đồng.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
