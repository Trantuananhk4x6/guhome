'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { submitContact, type ContactFormState } from '@/server/actions/contact'
import { PROJECT_TYPES, BUDGET_RANGES } from '@/app/(site)/contact/_options'
import { Label } from '@/components/ui/Label'
import { useToast } from '@/components/ui/Toast'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const INITIAL_STATE: ContactFormState = { ok: false, fieldErrors: {} }

export function QuickConsultFormSection() {
  const [state, formAction, isPending] = useActionState(submitContact, INITIAL_STATE)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (state.ok) {
      setSubmitted(true)
      toast({
        title: 'Đã gửi yêu cầu thành công!',
        description: 'Kiến trúc sư trưởng GuHomes sẽ liên hệ tư vấn phương án và gửi dự toán trong 24 giờ.',
        tone: 'success',
      })
      formRef.current?.reset()
    } else if (state.formError) {
      toast({
        title: 'Chưa thể gửi biểu mẫu',
        description: state.formError,
        tone: 'error',
      })
    }
  }, [state, toast])

  return (
    <section
      id="dang-ky-tu-van"
      data-home-section="QUICK_CONSULT"
      className="u-gutter relative isolate bg-espresso py-[clamp(4.5rem,10vh,8rem)] text-canvas overflow-hidden"
    >
      {/* Background Architectural Accent Lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 h-full w-[1px] bg-canvas/30" />
        <div className="absolute top-0 right-1/4 h-full w-[1px] bg-canvas/30" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-canvas/30" />
      </div>

      <div className="mx-auto w-full max-w-[110rem] relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Context & Guarantees */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Label rule tone="accent">
              Biểu mẫu nhận dự toán
            </Label>

            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.25] text-canvas">
              Kể cho GuHomes về ngôi nhà của bạn.
            </h2>

            <p className="font-body text-[1rem] leading-relaxed text-canvas/75">
              Chưa có bản vẽ cũng không sao. Chỉ cần vài thông tin cơ bản về diện tích và loại hình căn hộ, KTS Trưởng sẽ chủ động liên hệ phân tích mặt bằng và gửi khung dự toán minh bạch chi tiết.
            </p>

            {/* Commitments list */}
            <div className="mt-4 flex flex-col gap-3.5 border-t border-canvas/15 pt-6">
              <span className="u-label text-accent-soft">Cam kết dịch vụ:</span>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-[0.875rem] text-canvas/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-canvas">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>Báo giá tách bạch theo từng hạng mục - tuyệt đối không phát sinh chi phí ẩn</span>
                </li>
                <li className="flex items-center gap-3 text-[0.875rem] text-canvas/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-canvas">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>KTS Trưởng trực tiếp khảo sát hiện trạng và tư vấn phong cách 1-1</span>
                </li>
                <li className="flex items-center gap-3 text-[0.875rem] text-canvas/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-canvas">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>Hỗ trợ tiếp nhận hình ảnh hiện trạng và bản vẽ qua Zalo 24/7</span>
                </li>
              </ul>
            </div>

            {/* Direct Quick Contact Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <a
                href="https://zalo.me/0368757916"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#0068FF]/50 bg-canvas/10 px-5 py-2.5 text-[0.875rem] font-medium text-canvas backdrop-blur-md shadow-[0_4px_16px_rgba(0,104,255,0.15)] transition-all duration-300 hover:border-[#0068FF] hover:bg-[#0068FF]/20 hover:text-white hover:scale-[1.02] active:scale-95"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0068FF] text-[10px] font-bold text-white">Z</span>
                <span>Nhắn Zalo KTS Trưởng</span>
                <span className="text-xs text-canvas/60">↗</span>
              </a>

              <a
                href="tel:0368757916"
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-accent/40 bg-gradient-to-r from-canvas/10 via-canvas/15 to-accent/15 px-5 py-2.5 text-[0.875rem] font-medium text-canvas backdrop-blur-md shadow-[0_4px_16px_rgba(197,168,128,0.18)] transition-all duration-300 hover:border-accent hover:bg-canvas/20 hover:text-accent-soft hover:scale-[1.02] active:scale-95"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-espresso font-bold">☎</span>
                <span>Hotline: <strong className="font-mono text-accent-soft">0368 757 916</strong></span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface/10 p-5 sm:p-8 lg:p-10 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_30px_rgba(197,168,128,0.12)]">
              {/* Corner accents */}
              <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t border-l border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t border-r border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-canvas text-2xl">
                    ✓
                  </span>
                  <h3 className="mt-6 font-display text-[1.625rem] text-canvas">
                    Cảm ơn bạn đã tin tưởng GuHomes!
                  </h3>
                  <p className="mt-3 max-w-[42ch] font-body text-[0.9375rem] text-canvas/75 leading-relaxed">
                    Yêu cầu tư vấn của bạn đã được chuyển tới Kiến trúc sư trưởng. Chúng tôi sẽ phản hồi kèm phương án sơ bộ trong vòng 24 giờ làm việc.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 rounded-full border border-canvas/30 px-6 py-2.5 text-[0.875rem] text-canvas hover:border-accent hover:text-accent transition-colors"
                  >
                    Gửi thêm thông tin hoặc yêu cầu khác
                  </button>
                </div>
              ) : (
                <form ref={formRef} action={formAction} className="flex flex-col gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Họ và tên */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="quick-name" className="u-label text-canvas/70 text-xs">
                        Họ và tên *
                      </label>
                      <input
                        id="quick-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full min-h-[44px] border-b border-canvas/25 bg-transparent px-1 py-2.5 font-body text-[0.9375rem] text-canvas placeholder:text-canvas/35 focus:border-accent-soft focus:outline-hidden transition-colors"
                      />
                      {state.fieldErrors.name && (
                        <span className="text-xs text-red-400">{state.fieldErrors.name}</span>
                      )}
                    </div>

                    {/* Số điện thoại / Zalo */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="quick-phone" className="u-label text-canvas/70 text-xs">
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        id="quick-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="090x xxx xxx"
                        className="w-full min-h-[44px] border-b border-canvas/25 bg-transparent px-1 py-2.5 font-body text-[0.9375rem] text-canvas placeholder:text-canvas/35 focus:border-accent-soft focus:outline-hidden transition-colors"
                      />
                      {state.fieldErrors.phone && (
                        <span className="text-xs text-red-400">{state.fieldErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="quick-email" className="u-label text-canvas/70 text-xs">
                        Email liên hệ *
                      </label>
                      <input
                        id="quick-email"
                        name="email"
                        type="email"
                        required
                        placeholder="email@vidu.com"
                        className="w-full min-h-[44px] border-b border-canvas/25 bg-transparent px-1 py-2.5 font-body text-[0.9375rem] text-canvas placeholder:text-canvas/35 focus:border-accent-soft focus:outline-hidden transition-colors"
                      />
                      {state.fieldErrors.email && (
                        <span className="text-xs text-red-400">{state.fieldErrors.email}</span>
                      )}
                    </div>

                    {/* Loại hình công trình */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="quick-projectType" className="u-label text-canvas/70 text-xs">
                        Loại công trình *
                      </label>
                      <select
                        id="quick-projectType"
                        name="projectType"
                        required
                        defaultValue=""
                        className="w-full min-h-[44px] border-b border-canvas/25 bg-transparent px-1 py-2.5 font-body text-[0.9375rem] text-canvas focus:border-accent-soft focus:outline-hidden transition-colors [&>option]:bg-espresso [&>option]:text-canvas"
                      >
                        <option value="" disabled>Chọn loại công trình</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      {state.fieldErrors.projectType && (
                        <span className="text-xs text-red-400">{state.fieldErrors.projectType}</span>
                      )}
                    </div>
                  </div>

                  {/* Ngân sách dự kiến */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quick-budget" className="u-label text-canvas/70 text-xs">
                      Khung ngân sách dự kiến (VNĐ) *
                    </label>
                    <select
                      id="quick-budget"
                      name="budget"
                      required
                      defaultValue=""
                      className="w-full min-h-[44px] border-b border-canvas/25 bg-transparent px-1 py-2.5 font-body text-[0.9375rem] text-canvas focus:border-accent-soft focus:outline-hidden transition-colors [&>option]:bg-espresso [&>option]:text-canvas"
                    >
                      <option value="" disabled>Chọn mức ngân sách</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                    {state.fieldErrors.budget && (
                      <span className="text-xs text-red-400">{state.fieldErrors.budget}</span>
                    )}
                  </div>

                  {/* Lời nhắn / Thông tin thêm */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quick-message" className="u-label text-canvas/70 text-xs">
                      Lời nhắn (Vị trí công trình, diện tích m², hiện trạng bàn giao hoặc nhu cầu riêng)
                    </label>
                    <textarea
                      id="quick-message"
                      name="message"
                      rows={3}
                      placeholder="Ví dụ: Căn hộ 3 phòng ngủ 110m² tại Masteri Centre Point nhận bàn giao thô tháng 6/2026, muốn thiết kế theo phong cách Wabi-Sabi..."
                      className="w-full border border-canvas/20 bg-canvas/5 p-3 font-body text-[0.875rem] text-canvas placeholder:text-canvas/35 focus:border-accent-soft focus:outline-hidden transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={isPending}
                      className={cn(
                        'group inline-flex min-h-[48px] items-center justify-center gap-3 border border-accent bg-accent px-8 py-3.5 font-body text-[0.9375rem] font-semibold text-espresso transition-all duration-300 hover:border-accent-soft hover:bg-accent-soft hover:shadow-lg disabled:opacity-50 cursor-pointer active:scale-[0.98]',
                      )}
                    >
                      <span>{isPending ? 'Đang gửi thông tin...' : 'Gửi yêu cầu nhận dự toán'}</span>
                      <ArrowUpRightIcon className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>

                    <p className="text-[0.75rem] text-canvas/50">
                      Bảo mật thông tin 100% · Phản hồi trong 24 giờ
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
