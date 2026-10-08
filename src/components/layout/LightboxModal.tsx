'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@/components/ui/icons'
import { mediaUrl } from '@/lib/media'
import type { MediaRef } from '@/types/content'

export interface LightboxImage {
  url?: string
  media?: MediaRef | null
  alt?: string
  caption?: string | null
}

interface LightboxContextValue {
  openLightbox: (images: LightboxImage[], startIndex?: number, title?: string) => void
  closeLightbox: () => void
}

const LightboxContext = createContext<LightboxContextValue | null>(null)

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return ctx
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<LightboxImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [galleryTitle, setGalleryTitle] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = useCallback((imgs: LightboxImage[], startIndex = 0, title?: string) => {
    if (!imgs || imgs.length === 0) return
    setImages(imgs)
    setCurrentIndex(Math.max(0, Math.min(startIndex, imgs.length - 1)))
    setGalleryTitle(title ?? null)
    setIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
  }, [])

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeLightbox, next, prev])

  const current = images[currentIndex] || images[0]
  const resolvedUrl = current ? (current.url || (current.media ? mediaUrl(current.media, 2400) : null)) : null

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      <AnimatePresence>
        {isOpen && current && resolvedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/92 backdrop-blur-xl p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Header controls */}
            <div
              className="w-full max-w-7xl flex items-center justify-between z-10 text-canvas/90"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
                  {galleryTitle ?? 'GuHomes · Chi Tiết Công Trình'}
                </span>
                <span className="text-sm text-canvas/70 font-display mt-0.5">
                  {current.alt ?? current.caption ?? 'Góc máy chi tiết'}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-canvas/50">
                  {currentIndex + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-canvas/20 bg-canvas/10 text-canvas hover:bg-canvas/20 transition-all hover:scale-105 active:scale-95"
                  aria-label="Đóng xem ảnh"
                >
                  <CloseIcon className="text-lg" />
                </button>
              </div>
            </div>

            {/* Main Stage Image */}
            <div
              className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={resolvedUrl}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="relative h-full w-full flex items-center justify-center"
                >
                  <Image
                    src={resolvedUrl}
                    alt={current.alt ?? 'Ảnh công trình GuHomes'}
                    fill
                    sizes="100vw"
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    priority
                    unoptimized={resolvedUrl.endsWith('.svg') || resolvedUrl.startsWith('data:')}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-canvas/20 bg-black/40 text-canvas hover:bg-canvas/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
                    aria-label="Ảnh trước"
                  >
                    <ArrowLeftIcon className="text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-canvas/20 bg-black/40 text-canvas hover:bg-canvas/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
                    aria-label="Ảnh kế tiếp"
                  >
                    <ArrowRightIcon className="text-xl" />
                  </button>
                </>
              )}
            </div>

            {/* Footer Caption & Thumbnail Strip */}
            <div
              className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs text-canvas/60 max-w-xl truncate">
                {current.caption || 'Hình ảnh thực tế & 3D trích xuất từ hồ sơ thiết kế thi công GuHomes.'}
              </p>

              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto max-w-md py-1 scrollbar-none">
                  {images.slice(0, 12).map((thumb, idx) => {
                    const thumbUrl = thumb.url || (thumb.media ? mediaUrl(thumb.media, 400) : null)
                    if (!thumbUrl) return null
                    const isActive = idx === currentIndex
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative h-11 w-16 flex-shrink-0 rounded overflow-hidden border transition-all ${
                          isActive
                            ? 'border-accent-soft scale-105 shadow-[0_0_12px_rgba(197,168,128,0.5)]'
                            : 'border-canvas/20 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={thumbUrl}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                          unoptimized={thumbUrl.endsWith('.svg')}
                        />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  )
}
