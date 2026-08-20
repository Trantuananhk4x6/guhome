'use client'

/**
 * The left half of the page builder: the project page as a stack of blocks.
 *
 * Rows carry a thumbnail and a one-line summary rather than a type name, so the
 * list reads like the page it produces. Reordering is `DragList` (pointer drag
 * *and* ArrowUp/ArrowDown on the handle), and every row action — hide, nhân bản,
 * xoá — sits on the row itself so the inspector never has to be opened first.
 */

import { useState } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import {
  DuplicateIcon,
  EyeIcon,
  EyeOffIcon,
  LayersIcon,
  PlusIcon,
  TrashIcon,
} from '@/components/admin/AdminIcons'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { Dialog } from '@/components/admin/Dialog'
import { DragList } from '@/components/admin/DragList'
import { MediaThumb } from '@/components/admin/MediaThumb'
import { StatusPill } from '@/components/admin/StatusPill'
import { cn, pad2 } from '@/lib/utils'
import type { ProjectBlockType } from '@/types/content'

import {
  BLOCK_META,
  blockIsBlank,
  blockMeta,
  blockSummary,
  blockThumbIds,
  type BlockDraft,
  type BlockPreviewContext,
} from './contracts'

/* ------------------------------- add-block picker --------------------------- */

interface AddBlockDialogProps {
  open: boolean
  onClose: () => void
  onPick: (type: ProjectBlockType) => void
}

function AddBlockDialog({ open, onClose, onPick }: AddBlockDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Thêm khối"
      description="Mỗi khối là một đoạn của trang dự án. Có thể đổi thứ tự bất cứ lúc nào."
      width="lg"
    >
      <ul className="grid gap-px bg-line sm:grid-cols-2">
        {BLOCK_META.map((meta) => (
          <li key={meta.type} className="bg-canvas">
            <button
              type="button"
              onClick={() => {
                onPick(meta.type)
                onClose()
              }}
              className="flex h-full w-full flex-col gap-2 p-4 text-left transition-colors duration-200 hover:bg-surface"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-[1.125rem] font-normal leading-none text-ink">{meta.label}</span>
                <span className="u-label shrink-0 text-[0.5625rem] text-accent">{meta.en}</span>
              </span>
              <span className="font-body text-[0.75rem] leading-5 text-muted">{meta.note}</span>
            </button>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}

/* ---------------------------------- canvas ---------------------------------- */

export interface BlockCanvasProps {
  blocks: readonly BlockDraft[]
  selectedKey: string | null
  preview: BlockPreviewContext
  /** Keyed by array index, straight from `saveBlocks`' `fieldErrors`. */
  blockErrors: Readonly<Record<number, string>>
  onSelect: (key: string) => void
  onReorder: (next: BlockDraft[]) => void
  onToggle: (key: string) => void
  onDuplicate: (key: string) => void
  onDelete: (key: string) => void
  onAdd: (type: ProjectBlockType) => void
  onSeedDefault: () => void
}

export function BlockCanvas({
  blocks,
  selectedKey,
  preview,
  blockErrors,
  onSelect,
  onReorder,
  onToggle,
  onDuplicate,
  onDelete,
  onAdd,
  onSeedDefault,
}: BlockCanvasProps) {
  const [adding, setAdding] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<BlockDraft | null>(null)

  const enabled = blocks.filter((block) => block.enabled).length

  return (
    <section className="flex min-w-0 flex-col border border-line bg-canvas">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <LayersIcon className="text-base text-muted" />
          <span className="u-label text-ink">Bố cục trang</span>
          <StatusPill tone="neutral">
            {enabled}/{blocks.length} khối hiện
          </StatusPill>
        </div>
        <button type="button" onClick={() => setAdding(true)} className={adminButtonClass('outline')}>
          <PlusIcon className="text-sm" />
          Thêm khối
        </button>
      </header>

      <div className="px-5 py-5">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center gap-4 border border-dashed border-line px-6 py-14 text-center">
            <p className="u-label text-ink">Trang chưa có khối nào</p>
            <p className="max-w-md font-body text-[0.8125rem] leading-6 text-muted">
              Trang công khai đang tự dựng một bố cục mặc định. Dựng sẵn bố cục đó ở đây để sửa từng khối,
              hoặc bắt đầu từ một khối trống.
            </p>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
              <button type="button" onClick={onSeedDefault} className={adminButtonClass('solid')}>
                Dựng bố cục mặc định
              </button>
              <button type="button" onClick={() => setAdding(true)} className={adminButtonClass('outline')}>
                Thêm khối đầu tiên
              </button>
            </div>
          </div>
        ) : (
          <DragList
            items={blocks}
            label="Các khối của trang dự án"
            getKey={(block) => block.key}
            onReorder={(next) => onReorder(next)}
            renderItem={(block, position, context) => {
              const meta = blockMeta(block.type)
              const selected = block.key === selectedKey
              const blank = blockIsBlank(block, preview)
              const error = blockErrors[position]
              const thumbs = blockThumbIds(block, preview)

              return (
                <article
                  className={cn(
                    'flex items-stretch gap-3 border bg-canvas transition-colors duration-200',
                    selected ? 'border-ink' : 'border-line hover:border-muted',
                    !block.enabled && 'border-dashed',
                    error && 'border-accent',
                  )}
                >
                  <div className="flex flex-col items-center justify-start gap-1 border-r border-line px-1.5 py-3">
                    {context.handle}
                    <span className="u-label text-[0.5625rem] text-accent">{pad2(position + 1)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelect(block.key)}
                    aria-current={selected ? 'true' : undefined}
                    className="flex min-w-0 flex-1 items-center gap-4 py-3 pr-2 text-left"
                  >
                    {thumbs.length > 0 ? (
                      <span className="flex shrink-0 items-center gap-1">
                        {thumbs.map((id, thumbIndex) => (
                          <MediaThumb
                            key={`${id}-${thumbIndex}`}
                            media={preview.media[id] ?? null}
                            size="xs"
                            className={cn(!block.enabled && 'opacity-50')}
                          />
                        ))}
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex h-8 w-12 shrink-0 items-center justify-center border text-[0.5rem]',
                          meta.band ? 'border-accent/40 text-accent' : 'border-line text-muted',
                        )}
                      >
                        {meta.en.slice(0, 4).toUpperCase()}
                      </span>
                    )}

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span
                          className={cn(
                            'font-display text-[1.0625rem] font-normal leading-none',
                            block.enabled ? 'text-ink' : 'text-muted',
                          )}
                        >
                          {meta.label}
                        </span>
                        <span className="u-label text-[0.5625rem] text-muted">{meta.en}</span>
                        {!block.enabled ? <StatusPill tone="muted">Ẩn</StatusPill> : null}
                        {block.enabled && blank ? <StatusPill tone="accent">Chưa đủ dữ liệu</StatusPill> : null}
                      </span>
                      <span className="truncate font-body text-[0.75rem] leading-5 text-muted">
                        {error ?? blockSummary(block, preview)}
                      </span>
                    </span>
                  </button>

                  <div className="flex shrink-0 items-center gap-0.5 border-l border-line px-1.5">
                    <button
                      type="button"
                      onClick={() => onToggle(block.key)}
                      aria-label={block.enabled ? `Ẩn khối ${meta.label}` : `Hiện khối ${meta.label}`}
                      title={block.enabled ? 'Ẩn khối' : 'Hiện khối'}
                      className="border border-transparent p-1.5 text-muted transition-colors duration-200 hover:border-line hover:text-ink"
                    >
                      {block.enabled ? <EyeIcon className="text-sm" /> : <EyeOffIcon className="text-sm" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDuplicate(block.key)}
                      aria-label={`Nhân bản khối ${meta.label}`}
                      title="Nhân bản"
                      className="border border-transparent p-1.5 text-muted transition-colors duration-200 hover:border-line hover:text-ink"
                    >
                      <DuplicateIcon className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(block)}
                      aria-label={`Xoá khối ${meta.label}`}
                      title="Xoá khối"
                      className="border border-transparent p-1.5 text-muted transition-colors duration-200 hover:border-line hover:text-accent"
                    >
                      <TrashIcon className="text-sm" />
                    </button>
                  </div>
                </article>
              )
            }}
          />
        )}
      </div>

      {blocks.length > 0 ? (
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
          <p className="font-body text-[0.75rem] leading-5 text-muted">
            Thứ tự ở đây là thứ tự trên trang. Khối đang ẩn vẫn được lưu.
          </p>
          <button type="button" onClick={() => setAdding(true)} className={adminButtonClass('ghost')}>
            <PlusIcon className="text-sm" />
            Thêm khối
          </button>
        </footer>
      ) : null}

      <AddBlockDialog open={adding} onClose={() => setAdding(false)} onPick={onAdd} />

      <ConfirmDialog
        open={pendingDelete !== null}
        tone="danger"
        title="Xoá khối này?"
        description={
          pendingDelete
            ? `Khối “${blockMeta(pendingDelete.type).label}” sẽ biến mất khỏi bố cục. Thay đổi chỉ có hiệu lực sau khi bạn lưu.`
            : undefined
        }
        confirmLabel="Xoá khối"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) onDelete(pendingDelete.key)
          setPendingDelete(null)
        }}
      />
    </section>
  )
}
