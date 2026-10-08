'use client'

import type { MouseEvent, ReactNode } from 'react'

import { useSocialModalStore } from '@/lib/social'
import { cn } from '@/lib/utils'

export interface SocialTriggerProps {
  label: string
  href?: string
  className?: string
  children?: ReactNode
  showInfoHint?: boolean
}

/**
 * An interactive trigger for social links.
 * Clicking directly opens the rich SocialModal containing all channel details,
 * QR code, and real information. Right-click or middle-click preserves direct URL navigation.
 */
export function SocialTrigger({
  label,
  href,
  className,
  children,
  showInfoHint = false,
}: SocialTriggerProps) {
  const { openModal } = useSocialModalStore()

  const handleClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    // If not middle click or modifier key, prevent navigation and open info modal
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
      e.preventDefault()
      openModal(label)
    }
  }

  const content = children ?? label

  return (
    <a
      href={href ?? '#'}
      onClick={handleClick}
      className={cn('inline-flex items-center gap-1.5 cursor-pointer', className)}
      title={`Bấm để xem thông tin chi tiết kênh ${label}`}
    >
      <span>{content}</span>
      {showInfoHint && (
        <span className="text-[0.6875rem] opacity-60 font-mono tracking-tighter">
          [thông tin]
        </span>
      )}
    </a>
  )
}

/**
 * Standalone button that triggers the full Social Media modal.
 */
export function OpenSocialModalButton({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  const { openModal } = useSocialModalStore()

  return (
    <button
      type="button"
      onClick={() => openModal()}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full border border-canvas/20 bg-canvas/5 px-3.5 py-1.5 text-[0.75rem] font-medium tracking-wide text-accent-soft transition-all duration-300 hover:border-accent-soft hover:bg-canvas/15 hover:text-canvas hover:shadow-xs',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-soft group-hover:bg-accent animate-pulse" />
      <span>{children ?? 'Xem thông tin kênh & mã QR'}</span>
      <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">→</span>
    </button>
  )
}
