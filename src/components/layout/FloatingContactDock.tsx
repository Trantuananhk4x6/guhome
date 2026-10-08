'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSocialModalStore } from '@/lib/social'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { ArrowUpRightIcon, CheckIcon, CloseIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export function FloatingContactDock() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { openModal } = useSocialModalStore()
  const { openQuoteModal } = useQuickQuote()

  return (
    <aside aria-label="Thanh liên hệ nhanh" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] flex flex-col items-end gap-2.5 sm:gap-3 print:hidden">
      {/* Expanded Quick Options Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end gap-2.5"
          >
            {/* 1. Nhận báo giá nhanh */}
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false)
                openQuoteModal()
              }}
              className="group flex items-center gap-3 rounded-full border border-line bg-surface/95 px-4 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-canvas hover:shadow-xl"
            >
              <span className="font-body text-[0.8125rem] font-medium text-ink group-hover:text-accent">
                Dự toán chi phí 15 phút
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors">
                ⚡
              </span>
            </button>

            {/* 2. Chat Zalo trực tiếp KTS */}
            <a
              href="https://zalo.me/0368757916"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-3 rounded-full border border-line bg-surface/95 px-4 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#0068FF] hover:bg-canvas hover:shadow-xl"
            >
              <span className="font-body text-[0.8125rem] font-medium text-ink group-hover:text-[#0068FF]">
                Nhắn Zalo KTS Trưởng
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0068FF]/15 text-[#0068FF] group-hover:bg-[#0068FF] group-hover:text-white transition-colors text-xs font-bold">
                Zalo
              </span>
            </a>

            {/* 3. Gọi Hotline KTS */}
            <a
              href="tel:0368757916"
              className="group flex items-center gap-3 rounded-full border border-line bg-surface/95 px-4 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-canvas hover:shadow-xl"
            >
              <span className="font-body text-[0.8125rem] font-medium text-ink group-hover:text-accent">
                Gọi 0368 757 916
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors">
                📞
              </span>
            </a>

            {/* 4. Mở toàn bộ Mạng xã hội & Mã QR */}
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false)
                openModal()
              }}
              className="group flex items-center gap-3 rounded-full border border-accent/40 bg-espresso px-4 py-2.5 text-canvas shadow-lg transition-all duration-300 hover:border-accent hover:bg-ink hover:shadow-xl"
            >
              <span className="font-body text-[0.8125rem] font-medium text-accent-soft group-hover:text-canvas">
                Thông tin Mạng xã hội & QR
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-canvas text-xs">
                QR
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label={isExpanded ? 'Đóng menu kết nối' : 'Mở menu kết nối nhanh cùng GuHomes'}
        className={cn(
          'relative flex h-14 items-center gap-3 rounded-full border px-5 shadow-2xl transition-all duration-500 ease-editorial',
          isExpanded
            ? 'border-accent bg-espresso text-canvas shadow-accent/20'
            : 'border-accent/40 bg-espresso/95 text-canvas hover:border-accent hover:bg-espresso hover:scale-105 backdrop-blur-md',
        )}
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
        </span>
        <span className="font-display text-[0.9375rem] font-medium tracking-wide">
          {isExpanded ? 'Đóng' : 'Liên hệ & QR'}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas/10 text-xs font-mono">
          {isExpanded ? '✕' : '💬'}
        </span>
      </button>
    </aside>
  )
}
