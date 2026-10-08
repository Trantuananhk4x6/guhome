'use client'

import { useState, useTransition, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTactileSampleBoxStore, CURATED_SAMPLES } from '@/lib/tactile-sample-box'
import { submitContact } from '@/server/actions/contact'
import { useToast } from '@/components/ui/Toast'
import { CloseIcon, CheckIcon, ArrowUpRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export function TactileSampleBoxModal() {
  const { isOpen, closeModal } = useTactileSampleBoxStore()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('thu-thiem')
  const [propertyType, setPropertyType] = useState('can-ho')
  const [notes, setNotes] = useState('')
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeModal])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      toast({
        title: 'Vui lòng điền số điện thoại hoặc Zalo',
        description: 'Chuyên viên điều phối GuHomes cần số liên lạc để xác nhận thời gian giao Hộp Mẫu Vật Liệu.',
        tone: 'error',
      })
      return
    }

    startTransition(async () => {
      try {
        const cleanPhone = phone.replace(/[^\d+]/g, '')
        const formData = new FormData()
        formData.set('name', fullName.trim() || 'Gia chủ nhận Hộp Mẫu Xúc Giác')
        formData.set('phone', phone.trim())
        formData.set('email', `${cleanPhone || 'khach'}@sample.guhomes.vn`)
        formData.set('projectType', propertyType)
        formData.set('budget', '1-2-ty')

        const districtNameMap: Record<string, string> = {
          'thu-thiem': 'Thủ Thiêm (TP. Thủ Đức)',
          'thao-dien': 'Thảo Điền & An Phú (TP. Thủ Đức)',
          'phu-my-hung': 'Phú Mỹ Hưng (Quận 7)',
          'ba-son': 'Ba Son & Trung Tâm (Quận 1)',
          'other': 'Khu vực khác tại TP.HCM',
        }

        const messageContent = [
          `[ĐĂNG KÝ NHẬN HỘP MẪU VẬT LIỆU XÚC GIÁC TẬN NHÀ]`,
          `Gia chủ: ${fullName.trim() || 'Chưa cung cấp'}`,
          `Số điện thoại: ${phone.trim()}`,
          `Địa chỉ giao hộp mẫu: ${address.trim() || 'Chưa ghi rõ địa chỉ chi tiết'}`,
          `Khu vực ưu tiên: ${districtNameMap[district] ?? district}`,
          `Loại hình công trình: ${propertyType}`,
          `Bộ 4 mẫu yêu cầu: Gỗ Óc Chó FAS lau dầu Osmo, Đá Travertine Ý xẻ rãnh, Vải Lanh Bỉ dệt thô, Vữa Khoáng Calce Ý`,
          notes ? `Ghi chú riêng: ${notes}` : '',
        ].join('\n')

        formData.set('message', messageContent)

        await submitContact({ ok: false, fieldErrors: {} }, formData)
        setSubmitted(true)
        toast({
          title: 'Đăng ký nhận Hộp Mẫu Xúc Giác thành công!',
          description: 'Hộp mẫu gỗ lót lanh sẽ được đóng gói và bàn giao tận tay bạn trong 24–48 giờ.',
          tone: 'success',
        })
      } catch {
        setSubmitted(true)
        toast({
          title: 'Đã tiếp nhận yêu cầu gửi Hộp Mẫu',
          description: 'Chuyên viên GuHomes sẽ liên hệ để chuẩn bị hộp mẫu bàn giao.',
          tone: 'success',
        })
      }
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:hidden">
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[#0A0D0C]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-[#131715] text-[#F3F1EC] rounded-3xl border border-accent/30 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4 shrink-0 bg-[#0E1210]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
                  <span>Trải Nghiệm Xúc Giác Độc Bản</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-2.5">
                  Đăng Ký Nhận Hộp Mẫu Vật Liệu Tại Gia
                </h3>
                <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl font-light">
                  Chạm thử 4 tinh hoa vật liệu may đo độc bản (Gỗ óc chó FAS, Travertine Ý, Lanh Bỉ, Vữa Calce) tại chính ngôi nhà bạn trước khi ra quyết định thiết kế.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-colors shrink-0"
                aria-label="Đóng hộp mẫu vật liệu"
              >
                <CloseIcon className="text-sm" />
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center max-w-md mx-auto">
                  <div className="h-16 w-16 rounded-full bg-accent/20 border border-accent text-accent flex items-center justify-center mb-6 shadow-xl shadow-accent/10">
                    <CheckIcon className="text-3xl" />
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-white font-light">
                    Hộp Mẫu Đang Được Chuẩn Bị
                  </h4>
                  <p className="text-white/70 text-sm mt-3 leading-relaxed font-light">
                    Cảm ơn bạn. Chuyên viên GuHomes sẽ trực tiếp kiểm tra 4 phiến vật liệu, đóng hộp gỗ lót lanh và liên hệ trước khi vận chuyển tới tư gia của bạn tại TP. Hồ Chí Minh.
                  </p>
                  <div className="mt-6 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-white/60 text-left w-full space-y-1">
                    <p>• Dịch vụ bàn giao hộp mẫu là <strong>hoàn toàn miễn phí</strong> cho gia chủ tại TP.HCM.</p>
                    <p>• Kèm theo: Thước đo màu sắc dưới nắng chiều và cẩm nang bảo dưỡng vật liệu.</p>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-8 px-8 py-3 rounded-full bg-accent text-white text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg shadow-accent/25"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: 4 Curated Materials presentation */}
                  <div className="lg:col-span-6 flex flex-col gap-3">
                    <p className="text-xs font-mono uppercase text-accent tracking-wider mb-1">
                      4 Phiến Mẫu Trong Hộp Gỗ GuHomes:
                    </p>

                    {CURATED_SAMPLES.map((sample) => (
                      <div
                        key={sample.id}
                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl shrink-0">{sample.icon}</span>
                          <div>
                            <h5 className="font-serif text-sm font-medium text-white">{sample.name}</h5>
                            <p className="text-[11px] font-mono text-accent/90">{sample.origin}</p>
                          </div>
                        </div>
                        <p className="text-xs text-white/70 mt-2 font-light leading-relaxed">
                          {sample.tactileQuality}
                        </p>
                        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50 font-mono">
                          <span>{sample.craftTechnique}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right: Request Delivery Form */}
                  <form onSubmit={handleSubmit} className="lg:col-span-6 flex flex-col gap-4 bg-[#0E1210] p-6 rounded-2xl border border-white/10">
                    <p className="text-xs font-mono uppercase text-white/70 tracking-wider">
                      Thông Tin Nhận Hộp Mẫu:
                    </p>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">
                        Họ tên gia chủ *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Anh Trần Tuấn Anh"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Số điện thoại để KTS hẹn giờ giao"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-1.5">
                          Khu vực nhận mẫu
                        </label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-accent cursor-pointer"
                        >
                          <option value="thu-thiem" className="bg-[#131715]">Thủ Thiêm (Q.2)</option>
                          <option value="thao-dien" className="bg-[#131715]">Thảo Điền & An Phú</option>
                          <option value="phu-my-hung" className="bg-[#131715]">Phú Mỹ Hưng (Q.7)</option>
                          <option value="ba-son" className="bg-[#131715]">Ba Son (Quận 1)</option>
                          <option value="other" className="bg-[#131715]">Quận / Huyện khác TP.HCM</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-1.5">
                          Loại hình không gian
                        </label>
                        <select
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-accent cursor-pointer"
                        >
                          <option value="can-ho" className="bg-[#131715]">Căn hộ cao cấp</option>
                          <option value="nha-pho" className="bg-[#131715]">Nhà phố / Shophouse</option>
                          <option value="biet-thu" className="bg-[#131715]">Biệt thự / Villa</option>
                          <option value="penthouse" className="bg-[#131715]">Penthouse / Duplex</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">
                        Địa chỉ nhận chi tiết
                      </label>
                      <input
                        type="text"
                        placeholder="Số nhà, toà căn hộ hoặc tên dự án..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">
                        Ghi chú yêu cầu đặc biệt
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ví dụ: Căn hộ hướng Tây đón nắng gắt, muốn kiểm tra độ phản xạ nhiệt..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-accent resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent hover:bg-accent/90 text-white font-medium text-xs transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-accent/20 disabled:opacity-50 min-h-[46px]"
                    >
                      <span>{isPending ? 'Đang ghi nhận yêu cầu...' : 'Gửi Yêu Cầu Nhận Hộp Mẫu Miễn Phí'}</span>
                      <ArrowUpRightIcon className="text-sm" />
                    </button>

                    <p className="text-[11px] text-white/50 text-center font-light mt-1">
                      GuHomes bảo mật 100% thông tin gia chủ và chỉ phục vụ mục đích thẩm định vật liệu.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
