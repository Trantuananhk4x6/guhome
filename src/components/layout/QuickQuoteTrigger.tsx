'use client'

import { useQuickQuote } from './QuickQuoteModal'
import { ArrowRightIcon } from '@/components/ui/icons'

export function QuickQuoteButton({
  label = 'Dự toán chi phí',
  className = '',
  stylePreference,
  variant = 'gold',
}: {
  label?: string
  className?: string
  stylePreference?: string
  variant?: 'gold' | 'outline' | 'underline'
}) {
  const { openQuoteModal } = useQuickQuote()

  if (variant === 'outline') {
    return (
      <button
        type="button"
        onClick={() => openQuoteModal(stylePreference)}
        className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border border-canvas/25 bg-canvas/5 text-canvas hover:border-accent hover:bg-canvas/10 text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95 ${className}`}
      >
        <span>{label}</span>
        <ArrowRightIcon className="text-xs text-accent-soft" />
      </button>
    )
  }

  if (variant === 'underline') {
    return (
      <button
        type="button"
        onClick={() => openQuoteModal(stylePreference)}
        className={`group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-accent-soft hover:text-canvas transition-colors pb-1 border-b border-accent/40 hover:border-canvas ${className}`}
      >
        <span>{label}</span>
        <ArrowRightIcon className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => openQuoteModal(stylePreference)}
      className={`relative group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-accent hover:bg-accent-soft text-espresso font-medium text-xs sm:text-sm transition-all duration-300 shadow-[0_8px_25px_rgba(197,168,128,0.25)] hover:shadow-[0_12px_30px_rgba(197,168,128,0.4)] hover:scale-[1.03] active:scale-95 ${className}`}
    >
      <span className="relative z-10">{label}</span>
      <ArrowRightIcon className="relative z-10 text-xs transition-transform duration-300 group-hover:translate-x-1" />
      {/* Subtle shine effect on hover */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </button>
  )
}
