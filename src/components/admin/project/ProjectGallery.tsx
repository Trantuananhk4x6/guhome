'use client'

/**
 * Tab THƯ VIỆN — the media actually attached to this project.
 *
 * Unlike the fields and the blocks, this panel writes immediately: `attachMedia`
 * / `detachMedia` / `reorderMedia` are their own transactions, and the picker in
 * every block inspector reads this list first (scope `project`). Keeping it out
 * of the draft means an editor can stage photographs before deciding where they
 * go on the page.
 */

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { PlusIcon, TrashIcon } from '@/components/admin/AdminIcons'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { DragList } from '@/components/admin/DragList'
import { MediaPickerDialog } from '@/components/admin/MediaPickerDialog'
import { MediaThumb } from '@/components/admin/MediaThumb'
import { StatusPill } from '@/components/admin/StatusPill'
import { ActionMessage, AdminPanel } from '@/components/admin/site/Fields'
import { cn, pad2 } from '@/lib/utils'
import { attachMedia, detachMedia, reorderMedia } from '@/server/actions/projects'
import type { MediaRef } from '@/types/content'

export interface ProjectGalleryProps {
  projectId: string
  initial: readonly MediaRef[]
  coverMediaId: string | null
  /** Sets the cover in the *draft* — it is saved with the rest of the fields. */
  onSetCover: (mediaId: string) => void
  onResolved: (items: readonly MediaRef[]) => void
}

export function ProjectGallery({
  projectId,
  initial,
  coverMediaId,
  onSetCover,
  onResolved,
}: ProjectGalleryProps) {
  const router = useRouter()
  const [items, setItems] = useState<MediaRef[]>([...initial])
  const [picking, setPicking] = useState(false)
  const [pendingDetach, setPendingDetach] = useState<MediaRef | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const ids = items.map((item) => item.id)

  function attach(picked: readonly MediaRef[]): void {
    const fresh = picked.filter((item) => !ids.includes(item.id))
    if (fresh.length === 0) {
      setMessage('Những tệp đó đã có trong dự án.')
      return
    }
    setError(null)
    setMessage(null)
    startTransition(async () => {
      const result = await attachMedia({ projectId, mediaIds: fresh.map((item) => item.id), role: 'gallery' })
      if (!result.ok) {
        setError(result.error)
        return
      }
      onResolved(fresh)
      setItems((current) => [...current, ...fresh])
      setMessage(`Đã thêm ${fresh.length} tệp vào dự án.`)
      router.refresh()
    })
  }

  function detach(media: MediaRef): void {
    setError(null)
    setMessage(null)
    const previous = items
    setItems((current) => current.filter((item) => item.id !== media.id))
    startTransition(async () => {
      const result = await detachMedia({ projectId, mediaId: media.id })
      if (!result.ok) {
        setItems(previous)
        setError(result.error)
        return
      }
      setMessage('Đã gỡ tệp khỏi dự án. Tệp vẫn còn trong thư viện chung.')
      router.refresh()
    })
  }

  function reorder(next: MediaRef[]): void {
    setError(null)
    setMessage(null)
    const previous = items
    setItems(next)
    startTransition(async () => {
      const result = await reorderMedia({ projectId, mediaIds: next.map((item) => item.id) })
      if (!result.ok) {
        setItems(previous)
        setError(result.error)
        return
      }
      router.refresh()
    })
  }

  return (
    <AdminPanel
      eyebrow="Media"
      title="Thư viện của dự án"
      description="Những tệp gắn với dự án này. Bộ chọn ảnh trong từng khối mở đúng danh sách này trước tiên, nên gắn ảnh vào đây sẽ dựng bố cục nhanh hơn nhiều."
      actions={
        <button
          type="button"
          onClick={() => setPicking(true)}
          disabled={pending}
          className={adminButtonClass('outline')}
        >
          <PlusIcon className="text-sm" />
          Gắn tệp
        </button>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill tone="neutral">{items.length} tệp</StatusPill>
          <p className="font-body text-[0.75rem] leading-5 text-muted">
            Thay đổi ở đây được lưu ngay, không cần bấm Lưu.
          </p>
        </div>

        <ActionMessage error={error} message={message} />

        <DragList
          items={items}
          label="Thư viện dự án"
          getKey={(item) => item.id}
          disabled={pending}
          onReorder={(next) => reorder(next)}
          empty={
            <div className="border border-dashed border-line px-6 py-12 text-center">
              <p className="u-label text-ink">Chưa gắn tệp nào</p>
              <p className="mx-auto mt-2 max-w-md font-body text-[0.8125rem] leading-6 text-muted">
                Gắn ảnh từ thư viện chung để chúng xuất hiện ngay trong bộ chọn của từng khối.
              </p>
            </div>
          }
          renderItem={(item, position, context) => {
            const isCover = item.id === coverMediaId
            return (
              <div
                className={cn(
                  'flex items-center gap-3 border bg-canvas p-2',
                  isCover ? 'border-ink' : 'border-line',
                )}
              >
                {context.handle}
                <span className="u-label w-6 shrink-0 text-accent">{pad2(position + 1)}</span>
                <MediaThumb media={item} size="sm" />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate font-body text-[0.8125rem] leading-5 text-ink">
                    {item.alt ?? item.caption ?? item.url.split('/').pop() ?? item.id}
                  </span>
                  <span className="u-label text-[0.5625rem] text-muted">
                    {item.kind}
                    {item.width && item.height ? ` · ${item.width}×${item.height}` : ''}
                  </span>
                </span>

                {isCover ? (
                  <StatusPill tone="ink">Ảnh bìa</StatusPill>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSetCover(item.id)}
                    className={adminButtonClass('ghost')}
                  >
                    Đặt làm bìa
                  </button>
                )}

                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setPendingDetach(item)}
                  aria-label={`Gỡ tệp ${position + 1} khỏi dự án`}
                  className="border border-transparent p-1.5 text-muted transition-colors duration-200 hover:border-line hover:text-accent disabled:opacity-40"
                >
                  <TrashIcon className="text-sm" />
                </button>
              </div>
            )
          }}
        />
      </div>

      <MediaPickerDialog
        open={picking}
        multiple
        projectId={projectId}
        scope="library"
        selectedIds={ids}
        title="Gắn tệp vào dự án"
        description="Chọn từ thư viện chung. Tệp đã gắn được đánh dấu."
        onClose={() => setPicking(false)}
        onSelect={(picked) => {
          attach(picked)
          setPicking(false)
        }}
      />

      <ConfirmDialog
        open={pendingDetach !== null}
        tone="danger"
        title="Gỡ tệp khỏi dự án?"
        description="Tệp vẫn nằm trong thư viện chung, chỉ không còn gắn với dự án này. Các khối đang dùng tệp sẽ mất ảnh."
        confirmLabel="Gỡ khỏi dự án"
        pending={pending}
        onCancel={() => setPendingDetach(null)}
        onConfirm={() => {
          if (pendingDetach) detach(pendingDetach)
          setPendingDetach(null)
        }}
      />
    </AdminPanel>
  )
}
