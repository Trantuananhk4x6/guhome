'use client'

/**
 * The media library's details drawer: preview, technical facts, editorial
 * fields, "dùng làm ảnh bìa" for a chosen project, and deletion.
 *
 * Mounted with `key={item.id}` by the library so every field resets when the
 * selection changes — no effect-driven syncing.
 */

import { useState, useTransition } from 'react'

import { mediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'
import { deleteMedia, setProjectCover, updateMedia } from '@/server/actions/media'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { CloseIcon } from '@/components/ui/icons'

import { MediaThumb } from './MediaThumb'
import { fileNameOf, formatBytes, formatDimensions, formatTimestamp, shortFolder } from './format'
import { MEDIA_KIND_LABELS, type MediaItem, type ProjectOption } from './types'

export interface MediaDetailsProps {
  item: MediaItem
  projects: readonly ProjectOption[]
  onClose: () => void
  onSaved: (item: MediaItem) => void
  onDeleted: (id: string) => void
}

interface Notice {
  tone: 'ok' | 'error'
  text: string
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line py-3">
      <span className="u-label shrink-0">{label}</span>
      <span
        className={cn(
          'text-right text-[0.8125rem] leading-relaxed text-ink',
          mono && 'font-mono text-[0.6875rem] break-all text-muted',
        )}
      >
        {value}
      </span>
    </div>
  )
}

export function MediaDetails({ item, projects, onClose, onSaved, onDeleted }: MediaDetailsProps) {
  const [alt, setAlt] = useState(item.alt ?? '')
  const [caption, setCaption] = useState(item.caption ?? '')
  const [projectId, setProjectId] = useState('')
  const [notice, setNotice] = useState<Notice | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()

  const isImage = item.kind === 'image' || item.kind === 'depth' || item.kind === 'texture'
  const dirty = (item.alt ?? '') !== alt || (item.caption ?? '') !== caption

  function save(): void {
    setNotice(null)
    startTransition(async () => {
      const result = await updateMedia({ id: item.id, alt, caption })
      if (result.ok) {
        onSaved({ ...item, alt: alt.trim() || null, caption: caption.trim() || null })
        setNotice({ tone: 'ok', text: 'Đã lưu.' })
      } else {
        setNotice({ tone: 'error', text: result.error })
      }
    })
  }

  function applyCover(): void {
    if (!projectId) return
    setNotice(null)
    startTransition(async () => {
      const result = await setProjectCover({ projectId, mediaId: item.id })
      setNotice(
        result.ok
          ? { tone: 'ok', text: 'Đã đặt làm ảnh bìa dự án.' }
          : { tone: 'error', text: result.error },
      )
    })
  }

  function remove(): void {
    setNotice(null)
    startTransition(async () => {
      const result = await deleteMedia(item.id)
      if (result.ok) onDeleted(item.id)
      else {
        setConfirming(false)
        setNotice({ tone: 'error', text: result.error })
      }
    })
  }

  return (
    <div className="flex h-full flex-col bg-canvas">
      <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-5">
        <div className="flex flex-col gap-1">
          <span className="u-label">{MEDIA_KIND_LABELS[item.kind]}</span>
          <p className="font-display text-2xl leading-none text-ink">{fileNameOf(item.storageKey)}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng bảng chi tiết"
          className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors duration-500 ease-editorial hover:border-ink"
        >
          <CloseIcon className="text-base" />
        </button>
      </header>

      {/* `data-lenis-prevent`: Lenis owns the wheel on every route, admin
          included, and calls `preventDefault()` on it. This drawer is not a
          modal — nothing stops Lenis while it is open — so without the attribute
          the metadata below the preview is unreachable by wheel. */}
      <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto">
        <div className="relative aspect-4/3 w-full border-b border-line bg-surface-alt">
          {item.kind === 'video' ? (
            <video
              controls
              preload="metadata"
              src={item.url}
              className="h-full w-full object-contain"
              aria-label={item.alt ?? 'Video'}
            />
          ) : (
            <MediaThumb media={item} width={1200} sizes="30rem" fit="contain" />
          )}
        </div>

        <div className="px-6 py-6">
          <Row label="Kích thước" value={formatDimensions(item.width, item.height)} />
          <Row label="Dung lượng" value={formatBytes(item.bytes)} />
          <Row label="Định dạng" value={item.mime ?? '—'} />
          <Row label="Thư mục" value={shortFolder(item.folder)} />
          <Row label="Storage key" value={item.storageKey} mono />
          <Row label="Đã tải lên" value={formatTimestamp(item.createdAt)} />

          <a
            href={mediaUrl(item, 2400)}
            target="_blank"
            rel="noreferrer noopener"
            className="u-label mt-4 inline-flex border-b border-line pb-1 text-ink transition-colors duration-500 ease-editorial hover:border-ink"
          >
            Mở tệp gốc
          </a>
        </div>

        <div className="flex flex-col gap-6 border-t border-line px-6 py-6">
          <Field label="Alt — mô tả cho trình đọc màn hình" hint="Bắt buộc với mọi ảnh xuất hiện trên trang.">
            <Textarea
              rows={2}
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
              placeholder="Phòng khách nhìn ra ban công, nắng chiều xiên qua rèm vải thô."
            />
          </Field>

          <Field label="Chú thích" hint="Hiển thị dưới ảnh trong bài viết và trang dự án.">
            <Textarea
              rows={2}
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="Gỗ óc chó, đá travertine, ánh sáng 3000K."
            />
          </Field>

          <div className="flex items-center gap-4">
            <Button onClick={save} disabled={!dirty || pending} loading={pending && dirty} size="sm">
              Lưu thay đổi
            </Button>
            {dirty ? <span className="u-label text-accent">Chưa lưu</span> : null}
          </div>
        </div>

        {isImage ? (
          <div className="flex flex-col gap-4 border-t border-line px-6 py-6">
            <span className="u-label">Dùng làm ảnh bìa</span>
            <Select
              aria-label="Chọn dự án"
              placeholder="Chọn dự án…"
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
              options={projects.map((project) => ({
                value: project.id,
                label: `${project.title}${project.status === 'published' ? '' : ' — nháp'}`,
              }))}
            />
            <Button variant="ghost" size="sm" onClick={applyCover} disabled={!projectId || pending}>
              Dùng làm ảnh bìa
            </Button>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-line px-6 py-6">
          <span className="u-label">Vùng nguy hiểm</span>
          <p className="text-[0.8125rem] leading-relaxed text-muted">
            Xoá tệp sẽ gỡ mọi phiên bản đã dựng khỏi kho lưu trữ. Tệp đang được dùng ở đâu đó sẽ bị từ chối.
          </p>
          {confirming ? (
            <div className="flex items-center gap-3">
              <Button variant="solid" tone="accent" size="sm" onClick={remove} loading={pending}>
                Xác nhận xoá
              </Button>
              <Button variant="underline" size="sm" onClick={() => setConfirming(false)}>
                Huỷ
              </Button>
            </div>
          ) : (
            <Button variant="ghost" tone="accent" size="sm" onClick={() => setConfirming(true)}>
              Xoá tệp
            </Button>
          )}
        </div>
      </div>

      {notice ? (
        <p
          role="status"
          className={cn(
            'border-t border-line px-6 py-4 text-[0.8125rem] leading-relaxed',
            notice.tone === 'ok' ? 'text-muted' : 'text-accent',
          )}
        >
          {notice.text}
        </p>
      ) : null}
    </div>
  )
}
