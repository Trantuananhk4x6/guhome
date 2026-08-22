'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { ContactStatusPill } from '@/components/admin/StatusPill'
import { CONTACT_STATUS_FLOW, CONTACT_STATUS_LABELS, type ContactStatus } from '@/components/admin/site/contracts'
import { setContactStatus } from '@/server/actions/contacts'

export interface ContactStatusControlProps {
  id: string
  status: ContactStatus
}

/**
 * Inline status control for the dashboard inbox preview. Only the transitions
 * the workflow allows are offered — the same rule the action enforces.
 */
export function ContactStatusControl({ id, status }: ContactStatusControlProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const nextStates = CONTACT_STATUS_FLOW[status]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ContactStatusPill status={status} />

      {nextStates.map((next) => (
        <button
          key={next}
          type="button"
          disabled={pending}
          onClick={() => {
            setError(null)
            startTransition(async () => {
              const result = await setContactStatus({ id, status: next })
              if (!result.ok) {
                setError(result.error ?? 'Không cập nhật được.')
                return
              }
              router.refresh()
            })
          }}
          className={adminButtonClass('outline', 'px-2 py-1')}
        >
          {CONTACT_STATUS_LABELS[next]}
        </button>
      ))}

      {error ? (
        <span role="alert" className="font-body text-[0.6875rem] text-accent">
          {error}
        </span>
      ) : null}
    </div>
  )
}
