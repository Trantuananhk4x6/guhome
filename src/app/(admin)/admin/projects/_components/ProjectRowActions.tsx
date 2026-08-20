'use client'

/**
 * Per-row actions on the project index: edit, view, duplicate, delete.
 *
 * The write path is the real server action every time — `duplicateProject` and
 * `deleteProject` already revalidate `/admin/projects` and the public routes, so
 * this component only has to refresh the router afterwards.
 */

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { deleteProject, duplicateProject } from '@/server/actions/projects'
import type { PublishStatus } from '@/types/content'

export interface ProjectRowActionsProps {
  id: string
  title: string
  slug: string
  status: PublishStatus
}

const LINK_CLASS =
  'u-label text-[0.5625rem] text-muted underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline disabled:pointer-events-none disabled:opacity-40'

export function ProjectRowActions({ id, title, slug, status }: ProjectRowActionsProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const duplicate = (): void => {
    setError(null)
    setMessage(null)
    startTransition(async () => {
      const result = await duplicateProject({ id })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setMessage('Đã tạo bản sao ở trạng thái nháp.')
      router.refresh()
    })
  }

  const remove = (): void => {
    setError(null)
    setMessage(null)
    startTransition(async () => {
      const result = await deleteProject({ id })
      if (!result.ok) {
        setError(result.error)
        setConfirming(false)
        return
      }
      setConfirming(false)
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Link href={`/admin/projects/${id}`} className={adminButtonClass('outline', 'px-2 py-1')}>
          Sửa
        </Link>

        {status === 'published' ? (
          <Link href={`/projects/${slug}`} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            Xem
          </Link>
        ) : null}

        <button type="button" onClick={duplicate} disabled={pending} className={LINK_CLASS}>
          Nhân bản
        </button>

        <button
          type="button"
          onClick={() => {
            setError(null)
            setMessage(null)
            setConfirming(true)
          }}
          disabled={pending}
          className={LINK_CLASS}
        >
          Xoá
        </button>
      </div>

      {error ? (
        <span role="alert" className="font-body text-[0.6875rem] leading-4 text-accent">
          {error}
        </span>
      ) : message ? (
        <span role="status" className="font-body text-[0.6875rem] leading-4 text-muted">
          {message}
        </span>
      ) : null}

      <ConfirmDialog
        open={confirming}
        tone="danger"
        title="Xoá dự án?"
        description={
          <>
            <strong className="text-ink">{title}</strong> sẽ bị xoá vĩnh viễn, cùng toàn bộ bố cục khối, liên kết
            media và cảnh 3D thuộc dự án này. Ảnh trong thư viện media vẫn được giữ nguyên. Thao tác không thể hoàn
            tác.
          </>
        }
        confirmLabel="Xoá dự án"
        pending={pending}
        onConfirm={remove}
        onCancel={() => setConfirming(false)}
      />
    </div>
  )
}
