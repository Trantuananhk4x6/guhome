'use client'

import { createContext, useCallback, useContext, useState, type FormEvent, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseIcon, CheckIcon } from '@/components/ui/icons'
import { useToast } from '@/components/ui/Toast'

interface QuickQuoteContextValue {
  openQuoteModal: (initialStyle?: string) => void
  closeQuoteModal: () => void
}

const QuickQuoteContext = createContext<QuickQuoteContextValue | null>(null)

export function useQuickQuote() {
  const ctx = useContext(QuickQuoteContext)
  if (!ctx) {
    throw new Error('useQuickQuote must be used within QuickQuoteProvider')
  }
  return ctx
}

export function QuickQuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [propertyType, setPropertyType] = useState('can-ho')
  const [areaRange, setAreaRange] = useState('70-120')
  const [style, setStyle] = useState('wabi-sabi')
  const [scope, setScope] = useState('tron-goi')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const openQuoteModal = useCallback((initialStyle?: string) => {
    if (initialStyle) setStyle(initialStyle)
    setSubmitted(false)
    setIsOpen(true)
  }, [])

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      toast({ title: 'Vui lòng cung cấp số điện thoại hoặc Zalo để KTS liên hệ.', tone: 'error' })
      return
    }

    setSubmitted(true)
    toast({
      title: 'Đăng ký thành công!',
      description: 'KTS GuHomes sẽ liên hệ gửi bản dự toán chi tiết trong 15 phút.',
      tone: 'success',
    })
  }

  // Cost estimates based on area and scope
  const getEstimatedCost = () => {
    let baseMin = 180
    let baseMax = 320
    if (propertyType === 'nha-pho') {
      baseMin = 350
      baseMax = 650
    } else if (propertyType === 'biet-thu') {
      baseMin = 750
      baseMax = 1800
    } else if (propertyType === 'thuong-mai') {
      baseMin = 250
      baseMax = 500
    }

    if (areaRange === 'duoi-70') {
      baseMin = Math.round(baseMin * 0.7)
      baseMax = Math.round(baseMax * 0.75)
    } else if (areaRange === '120-200') {
      baseMin = Math.round(baseMin * 1.5)
      baseMax = Math.round(baseMax * 1.5)
    } else if (areaRange === 'tren-200') {
      baseMin = Math.round(baseMin * 2.2)
      baseMax = Math.round(baseMax * 2.4)
    }

    if (scope === 'thiet-ke-only') {
      return {
        label: 'Gói Thiết Kế Bản Vẽ 3D & Kỹ Thuật 1:5',
        range: `${Math.round(baseMin * 0.12)} - ${Math.round(baseMax * 0.14)} Triệu VNĐ`,
      }
    }

    return {
      label: 'Gói Thi Công Hoàn Thiện & Nội Thất May Đo',
      range: `${baseMin} - ${baseMax} Triệu VNĐ`,
    }
  }

  const estimate = getEstimatedCost()

  return (
    <QuickQuoteContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeQuoteModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-2xl bg-espresso text-canvas rounded-2xl border border-accent/35 shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-6 sm:p-9 z-10 overflow-hidden my-8"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Subtle top gold accent glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />

              {/* Close Button */}
              <button
                type="button"
                onClick={closeQuoteModal}
                className="absolute top-5 right-5 h-9 w-9 rounded-full border border-canvas/20 bg-canvas/10 text-canvas/75 hover:text-canvas hover:bg-canvas/20 flex items-center justify-center transition-all"
                aria-label="Đóng"
              >
                <CloseIcon className="text-base" />
              </button>

              {submitted ? (
                <div className="py-10 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-accent/20 text-accent-soft border border-accent/40 flex items-center justify-center mb-5">
                    <CheckIcon className="text-3xl" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-canvas mb-3">
                    Đã Gửi Yêu Cầu Thành Công!
                  </h3>
                  <p className="text-sm text-canvas/70 max-w-md mb-6 leading-relaxed">
                    Kiến trúc sư trưởng của <strong className="text-accent-soft">GuHomes</strong> đã tiếp nhận thông tin và đang lập bản dự toán chi tiết cùng phương án mặt bằng mẫu cho bạn.
                  </p>
                  <div className="p-4 rounded-xl bg-canvas/5 border border-canvas/10 max-w-md w-full text-left mb-6">
                    <div className="text-xs text-canvas/50 uppercase tracking-widest font-mono mb-1">
                      Kênh Hỗ Trợ Khẩn
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-canvas/80">Hotline Kỹ Thuật 24/7:</span>
                      <a href="tel:0901234567" className="text-accent-soft font-mono font-medium hover:underline">
                        090 123 4567
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeQuoteModal}
                    className="px-8 py-3 rounded-full bg-accent hover:bg-accent-soft text-espresso font-medium text-sm transition-all hover:scale-105 active:scale-95"
                  >
                    Hoàn tất & Quay lại
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Header */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent-soft text-[11px] font-mono uppercase tracking-[0.16em] mb-2">
                      <span>● Dự Toán Nhanh Trong 15 Phút</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl text-canvas">
                      Dự Toán Chi Phí & Tư Vấn Chuẩn Gu
                    </h2>
                    <p className="text-xs sm:text-sm text-canvas/65 mt-1">
                      Nhận bảng bóc tách khối lượng minh bạch, không phát sinh chi phí từ xưởng mộc GuHomes.
                    </p>
                  </div>

                  {/* Step 1: Property Type */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-canvas/75 mb-2.5">
                      1. Loại hình công trình
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'can-ho', label: 'Căn hộ chung cư' },
                        { id: 'nha-pho', label: 'Nhà phố / Liền kề' },
                        { id: 'biet-thu', label: 'Biệt thự / Duplex' },
                        { id: 'thuong-mai', label: 'Showroom / F&B' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPropertyType(item.id)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                            propertyType === item.id
                              ? 'border-accent bg-accent/20 text-canvas font-semibold shadow-[0_0_12px_rgba(197,168,128,0.25)]'
                              : 'border-canvas/15 bg-canvas/5 text-canvas/70 hover:border-canvas/30'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Area Range */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-canvas/75 mb-2.5">
                      2. Diện tích thi công
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'duoi-70', label: 'Dưới 70 m²' },
                        { id: '70-120', label: '70 – 120 m²' },
                        { id: '120-200', label: '120 – 200 m²' },
                        { id: 'tren-200', label: 'Trên 200 m²' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAreaRange(item.id)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium text-center border transition-all ${
                            areaRange === item.id
                              ? 'border-accent bg-accent/20 text-canvas font-semibold shadow-[0_0_12px_rgba(197,168,128,0.25)]'
                              : 'border-canvas/15 bg-canvas/5 text-canvas/70 hover:border-canvas/30'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Style Preference */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-canvas/75 mb-2.5">
                      3. Gu thẩm mỹ yêu thích
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'wabi-sabi', label: 'Wabi Sabi mộc mạc' },
                        { id: 'modern-luxury', label: 'Modern Luxury' },
                        { id: 'minimalist', label: 'Tối Giản Tinh Tế' },
                        { id: 'indochine', label: 'Indochine Á Đông' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setStyle(item.id)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                            style === item.id
                              ? 'border-accent bg-accent/20 text-canvas font-semibold shadow-[0_0_12px_rgba(197,168,128,0.25)]'
                              : 'border-canvas/15 bg-canvas/5 text-canvas/70 hover:border-canvas/30'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Scope */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-canvas/75 mb-2.5">
                      4. Hạng mục triển khai
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'tron-goi', label: 'Thiết kế & Thi công trọn gói' },
                        { id: 'thiet-ke-only', label: 'Chỉ thiết kế bản vẽ 3D & 1:5' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setScope(item.id)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                            scope === item.id
                              ? 'border-accent bg-accent/20 text-canvas font-semibold shadow-[0_0_12px_rgba(197,168,128,0.25)]'
                              : 'border-canvas/15 bg-canvas/5 text-canvas/70 hover:border-canvas/30'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cost preview badge */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-canvas/10 via-canvas/5 to-transparent border border-accent/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-mono text-accent-soft uppercase tracking-wider">
                        {estimate.label}
                      </div>
                      <div className="text-xl sm:text-2xl font-display font-medium text-canvas mt-0.5">
                        {estimate.range}
                      </div>
                    </div>
                    <div className="text-right sm:border-l sm:border-canvas/15 sm:pl-4 text-xs text-canvas/60">
                      *Đã bao gồm bóc tách kỹ thuật & bảo hành 24 tháng.
                    </div>
                  </div>

                  {/* Customer Contact Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs text-canvas/70 mb-1">
                        Họ tên của bạn
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Anh / Chị..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-canvas/5 border border-canvas/20 text-canvas text-sm placeholder:text-canvas/35 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-canvas/70 mb-1">
                        Số điện thoại / Zalo <span className="text-accent-soft">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-canvas/5 border border-canvas/20 text-canvas text-sm placeholder:text-canvas/35 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-canvas/15">
                    <div className="flex items-center gap-2 text-xs text-canvas/60">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>KTS sẵn sàng khảo sát tại công trình</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 rounded-full bg-accent hover:bg-accent-soft text-espresso font-medium text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_20px_rgba(197,168,128,0.3)] flex items-center justify-center gap-2"
                    >
                      <span>Nhận Báo Giá & Mặt Bằng 3D Mẫu</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </QuickQuoteContext.Provider>
  )
}
