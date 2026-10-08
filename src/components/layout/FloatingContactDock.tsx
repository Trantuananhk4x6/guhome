'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useSocialModalStore } from '@/lib/social'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { useTactileSampleBoxStore } from '@/lib/tactile-sample-box'
import { SensorySoundscape } from '@/components/ui/SensorySoundscape'
import { PhoneIcon, BoltIcon, BoxIcon, ChatIcon, QrIcon, CloseIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 24, stiffness: 360 },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.94,
    transition: { duration: 0.15 },
  },
}

export function FloatingContactDock() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { openModal } = useSocialModalStore()
  const { openQuoteModal } = useQuickQuote()
  const { openModal: openTactileModal } = useTactileSampleBoxStore()

  return (
    <aside
      aria-label="Thanh liên hệ nhanh"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] flex flex-col items-end gap-2.5 sm:gap-3 print:hidden touch-manipulation select-none"
    >
      {/* Expanded Quick Options Menu with 60fps spring choreography */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-end gap-2.5 w-full max-w-[calc(100vw-2rem)]"
          >
            {/* 0. Bóc tách chi phí theo phòng */}
            <motion.div variants={itemVariants}>
              <Link
                href="/du-toan-chi-phi"
                onClick={() => setIsExpanded(false)}
                className="group flex min-h-[44px] items-center gap-3 rounded-full border border-line/80 bg-surface/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-accent/70 hover:bg-canvas hover:shadow-[0_12px_36px_rgba(197,168,128,0.2)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-body text-[0.8125rem] font-medium text-ink group-hover:text-accent transition-colors">
                  Bóc tách chi phí theo phòng
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors text-xs font-mono font-medium">
                  m²
                </span>
              </Link>
            </motion.div>

            {/* 1. Nhận báo giá nhanh */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false)
                  openQuoteModal()
                }}
                className="group flex min-h-[44px] items-center gap-3 rounded-full border border-accent/40 bg-surface/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-accent hover:bg-canvas hover:shadow-[0_12px_36px_rgba(197,168,128,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="font-body text-[0.8125rem] font-medium text-ink group-hover:text-accent transition-colors">
                  Dự toán chi phí 15 phút
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors text-xs">
                  <BoltIcon className="h-4 w-4" />
                </span>
              </button>
            </motion.div>

            {/* 2. Nhận Hộp Mẫu Xúc Giác Tại Nhà */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false)
                  openTactileModal()
                }}
                className="group flex min-h-[44px] items-center gap-3 rounded-full border border-accent/40 bg-surface/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-accent hover:bg-canvas hover:shadow-[0_12px_36px_rgba(197,168,128,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="font-body text-[0.8125rem] font-medium text-ink group-hover:text-accent transition-colors">
                  Nhận Hộp Mẫu Xúc Giác
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors text-xs">
                  <BoxIcon className="h-4 w-4" />
                </span>
              </button>
            </motion.div>

            {/* 3. Chat Zalo trực tiếp KTS */}
            <motion.div variants={itemVariants}>
              <a
                href="https://zalo.me/0368757916"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex min-h-[44px] items-center gap-3 rounded-full border border-line/80 bg-surface/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-[#0068FF]/70 hover:bg-canvas hover:shadow-[0_12px_36px_rgba(0,104,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-body text-[0.8125rem] font-medium text-ink group-hover:text-[#0068FF] transition-colors">
                  Nhắn Zalo KTS Trưởng
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0068FF]/15 text-[#0068FF] group-hover:bg-[#0068FF] group-hover:text-white transition-colors text-xs font-bold font-mono">
                  Zalo
                </span>
              </a>
            </motion.div>

            {/* 4. Gọi Hotline KTS */}
            <motion.div variants={itemVariants}>
              <a
                href="tel:0368757916"
                className="group flex min-h-[44px] items-center gap-3 rounded-full border border-line/80 bg-surface/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-accent hover:bg-canvas hover:shadow-[0_12px_36px_rgba(197,168,128,0.2)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-body text-[0.8125rem] font-medium text-ink group-hover:text-accent transition-colors">
                  Gọi 0368 757 916
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors text-xs">
                  <PhoneIcon className="h-4 w-4" />
                </span>
              </a>
            </motion.div>

            {/* 5. Mở toàn bộ Mạng xã hội & Mã QR */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false)
                  openModal()
                }}
                className="group flex min-h-[44px] items-center gap-3 rounded-full border border-accent/40 bg-espresso px-4 py-2.5 text-canvas shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:border-accent hover:bg-ink hover:shadow-[0_12px_36px_rgba(197,168,128,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="font-body text-[0.8125rem] font-medium text-accent-soft group-hover:text-canvas transition-colors">
                  Mạng xã hội & Mã QR
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-canvas text-xs font-mono font-bold">
                  <QrIcon className="h-4 w-4" />
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Row: Sensory Soundscape + Main Trigger */}
      <div className="flex items-center gap-2">
        <SensorySoundscape />

        {/* Main Floating Trigger Button */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={isExpanded ? 'Đóng menu kết nối' : 'Mở menu kết nối nhanh cùng GuHomes'}
          className={cn(
            'relative flex h-14 min-h-[44px] items-center gap-3 rounded-full border px-5 shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 ease-editorial shrink-0 active:scale-95 cursor-pointer ring-1',
            isExpanded
              ? 'border-accent bg-espresso text-canvas ring-accent/30 shadow-accent/20'
              : 'border-accent/40 bg-espresso/95 text-canvas hover:border-accent hover:bg-espresso hover:scale-105 backdrop-blur-md ring-accent/20',
          )}
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
          </span>
          <span className="font-display text-[0.9375rem] font-medium tracking-wide">
            {isExpanded ? 'Đóng' : 'Liên hệ & QR'}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas/10 text-xs">
            {isExpanded ? <CloseIcon className="h-3.5 w-3.5" /> : <ChatIcon className="h-3.5 w-3.5" />}
          </span>
        </button>
      </div>
    </aside>
  )
}
