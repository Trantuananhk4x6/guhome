import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import type { PublishStatus, ReconStatus } from '@/types/content'

export type StatusPillTone = 'neutral' | 'ink' | 'accent' | 'accentSolid' | 'muted'

const TONES: Record<StatusPillTone, string> = {
  neutral: 'border-line text-muted',
  ink: 'border-ink bg-ink text-canvas',
  accent: 'border-accent text-accent',
  accentSolid: 'border-accent bg-accent text-canvas',
  muted: 'border-line bg-surface-alt text-muted',
}

export interface StatusPillProps {
  tone?: StatusPillTone
  /** Small square mark before the label. */
  dot?: boolean
  className?: string
  children: ReactNode
}

/** Square, hairline status marker. 10px uppercase — never a rounded badge. */
export function StatusPill({ tone = 'neutral', dot = false, className, children }: StatusPillProps) {
  return (
    <span
      className={cn(
        'u-label inline-flex items-center gap-1.5 border px-2 py-1 text-[0.5625rem] leading-none',
        TONES[tone],
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="h-1 w-1 bg-current" /> : null}
      {children}
    </span>
  )
}

/* ------------------------------ typed shortcuts ----------------------------- */

const PUBLISH_STATUS: Record<PublishStatus, { label: string; tone: StatusPillTone }> = {
  published: { label: 'Đã xuất bản', tone: 'ink' },
  draft: { label: 'Nháp', tone: 'neutral' },
  archived: { label: 'Lưu trữ', tone: 'muted' },
}

export function PublishStatusPill({ status, className }: { status: PublishStatus; className?: string }) {
  const entry = PUBLISH_STATUS[status]
  return (
    <StatusPill tone={entry.tone} className={className}>
      {entry.label}
    </StatusPill>
  )
}

export function publishStatusLabel(status: PublishStatus): string {
  return PUBLISH_STATUS[status].label
}

const RECON_STATUS: Record<ReconStatus, { label: string; tone: StatusPillTone }> = {
  queued: { label: 'Chờ xử lý', tone: 'neutral' },
  running: { label: 'Đang chạy', tone: 'accent' },
  review: { label: 'Chờ duyệt', tone: 'accent' },
  approved: { label: 'Đã duyệt', tone: 'ink' },
  failed: { label: 'Lỗi', tone: 'accentSolid' },
}

export function ReconStatusPill({ status, className }: { status: ReconStatus; className?: string }) {
  const entry = RECON_STATUS[status]
  return (
    <StatusPill tone={entry.tone} className={className}>
      {entry.label}
    </StatusPill>
  )
}

export type ContactStatus = 'new' | 'contacted' | 'archived'

const CONTACT_STATUS: Record<ContactStatus, { label: string; tone: StatusPillTone }> = {
  new: { label: 'Mới', tone: 'accent' },
  contacted: { label: 'Đã liên hệ', tone: 'ink' },
  archived: { label: 'Lưu trữ', tone: 'muted' },
}

export function ContactStatusPill({ status, className }: { status: ContactStatus; className?: string }) {
  const entry = CONTACT_STATUS[status]
  return (
    <StatusPill tone={entry.tone} className={className}>
      {entry.label}
    </StatusPill>
  )
}

export function contactStatusLabel(status: ContactStatus): string {
  return CONTACT_STATUS[status].label
}
