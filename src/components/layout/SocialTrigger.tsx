'use client'

import type { MouseEvent, ReactNode } from 'react'

import { useSocialModalStore, type SocialModalTab } from '@/lib/social'
import { cn } from '@/lib/utils'

export interface SocialTriggerProps {
  label: string
  href?: string
  tab?: SocialModalTab
  className?: string
  children?: ReactNode
  showInfoHint?: boolean
  hintText?: string
}

/**
 * An interactive trigger for social links.
 * Clicking directly opens the rich SocialModal containing all channel details,
 * QR code, content schedule, and showcase projects. Right-click or middle-click preserves direct URL navigation.
 */
export function SocialTrigger({
  label,
  href,
  tab = 'channel',
  className,
  children,
  showInfoHint = false,
  hintText = '[Hồ sơ & QR]',
}: SocialTriggerProps) {
  const { openModal } = useSocialModalStore()

  const handleClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    // If not middle click or modifier key, prevent navigation and open info modal
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
      e.preventDefault()
      openModal(label, tab)
    }
  }

  const content = children ?? label

  return (
    <a
      href={href ?? '#'}
      onClick={handleClick}
      className={cn('group/soc inline-flex items-center gap-1.5 cursor-pointer', className)}
      title={`Bấm để xem thông tin kênh ${label}, lịch phát sóng & mã QR`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60 transition-all duration-300 group-hover/soc:scale-125 group-hover/soc:bg-accent" />
      <span>{content}</span>
      {showInfoHint ? (
        <span className="font-mono text-[0.6875rem] tracking-tighter text-accent/80 opacity-75 transition-opacity duration-300 group-hover/soc:opacity-100">
          {hintText}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="text-[0.6875rem] opacity-45 transition-all duration-300 group-hover/soc:translate-x-0.5 group-hover/soc:-translate-y-0.5 group-hover/soc:opacity-100"
        >
          ↗
        </span>
      )}
    </a>
  )
}

/**
 * Standalone button that triggers the full Social Media modal.
 */
export function OpenSocialModalButton({
  channelId,
  tab = 'channel',
  className,
  children,
}: {
  channelId?: string
  tab?: SocialModalTab
  className?: string
  children?: ReactNode
}) {
  const { openModal } = useSocialModalStore()

  return (
    <button
      type="button"
      onClick={() => openModal(channelId, tab)}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full border border-canvas/20 bg-canvas/5 px-3.5 py-1.5 text-[0.75rem] font-medium tracking-wide text-accent-soft transition-all duration-300 hover:border-accent-soft hover:bg-canvas/15 hover:text-canvas hover:shadow-xs cursor-pointer',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-soft group-hover:bg-accent animate-pulse" />
      <span>{children ?? 'Xem thông tin kênh & mã QR'}</span>
      <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">→</span>
    </button>
  )
}
