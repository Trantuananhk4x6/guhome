'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { cn } from '@/lib/utils'
import { toggleFeatured } from '@/server/actions/projects'

export interface FeaturedToggleProps {
  id: string
  featured: boolean
  title: string
}

/** Optimistic-free switch: the row refreshes from the server after the write. */
export function FeaturedToggle({ id, featured, title }: FeaturedToggleProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [value, setValue] = useState(featured)
  const [error, setError] = useState<string | null>(null)

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={`Nổi bật — ${title}`}
      title={error ?? (value ? 'Đang nổi bật' : 'Chưa nổi bật')}
      disabled={pending}
      onClick={() => {
        const next = !value
        setError(null)
        setValue(next)
        startTransition(async () => {
          const result = await toggleFeatured({ id, featured: next })
          if (!result.ok) {
            setValue(!next)
            setError(result.error)
            return
          }
          router.refresh()
        })
      }}
      className={cn(
        'inline-flex h-5 w-9 items-center border p-0.5 transition-colors duration-200 disabled:opacity-50',
        value ? 'border-accent bg-accent' : 'border-line bg-canvas',
        error && 'border-accent',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'block h-3.5 w-3.5 transition-transform duration-200',
          value ? 'translate-x-4 bg-canvas' : 'translate-x-0 bg-muted',
        )}
      />
    </button>
  )
}
