'use client'

/**
 * Block-style editor over `RichTextDoc`.
 *
 * A document is an ordered list of nodes; each node gets its own small editor
 * and the whole list is reorderable. Nothing here is contenteditable — every
 * field is a plain control, which is what keeps the stored JSON exactly as
 * typed and the public renderer free to lay it out however it likes.
 */

import { useState } from 'react'

import { DragList } from '@/components/admin/DragList'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { cn, pad2 } from '@/lib/utils'
import type { MediaRef, RichTextNode } from '@/types/content'

import {
  RICH_TEXT_NODE_META,
  emptyRichTextNode,
  nextNodeKey,
  richTextNodeMeta,
  type KeyedNode,
  type RichTextNodeType,
} from './contracts'
import { StatusPill, ToggleRow } from './Fields'
import { MediaField, MediaListField } from './MediaField'

export interface RichTextProjectOption {
  id: string
  title: string
  slug: string
}

export interface RichTextEditorProps {
  items: KeyedNode[]
  onChange: (items: KeyedNode[]) => void
  /** Resolved media for every id referenced by the document. */
  mediaIndex: Record<string, MediaRef>
  onMediaResolved: (media: MediaRef) => void
  projects: readonly RichTextProjectOption[]
  fieldErrors?: Record<string, string>
}

export function RichTextEditor({
  items,
  onChange,
  mediaIndex,
  onMediaResolved,
  projects,
  fieldErrors,
}: RichTextEditorProps) {
  const [adding, setAdding] = useState(false)

  const replace = (key: string, node: RichTextNode): void => {
    onChange(items.map((item) => (item.key === key ? { key, node } : item)))
  }

  const remove = (key: string): void => {
    onChange(items.filter((item) => item.key !== key))
  }

  const duplicate = (key: string): void => {
    const index = items.findIndex((item) => item.key === key)
    const found = items[index]
    if (!found) return
    const copy: KeyedNode = { key: nextNodeKey(), node: structuredClone(found.node) }
    onChange([...items.slice(0, index + 1), copy, ...items.slice(index + 1)])
  }

  const append = (type: RichTextNodeType): void => {
    onChange([...items, { key: nextNodeKey(), node: emptyRichTextNode(type) }])
    setAdding(false)
  }

  const pickMedia = (media: MediaRef | null): string => {
    if (media) onMediaResolved(media)
    return media?.id ?? ''
  }

  const renderNodeEditor = (item: KeyedNode, index: number) => {
    const { key, node } = item
    const error = fieldErrors?.[`content.nodes.${index}`] ?? null

    switch (node.type) {
      case 'heading':
        return (
          <div className="grid gap-5 sm:grid-cols-[8rem_minmax(0,1fr)]">
            <Field label="Cấp">
              <Select
                value={String(node.level)}
                options={[
                  { value: '2', label: 'H2 — mục lớn' },
                  { value: '3', label: 'H3 — mục con' },
                  { value: '4', label: 'H4 — mục nhỏ' },
                ]}
                onChange={(event) => {
                  const level = Number(event.target.value)
                  if (level === 2 || level === 3 || level === 4) replace(key, { ...node, level })
                }}
              />
            </Field>
            <Field label="Nội dung tiêu đề" error={error}>
              <Input value={node.text} onChange={(event) => replace(key, { ...node, text: event.target.value })} />
            </Field>
          </div>
        )

      case 'paragraph':
        return (
          <Field label="Đoạn văn" error={error}>
            <Textarea
              rows={5}
              value={node.text}
              onChange={(event) => replace(key, { ...node, text: event.target.value })}
            />
          </Field>
        )

      case 'image':
        return (
          <div className="flex flex-col gap-6">
            <MediaField
              label="Ảnh"
              value={node.mediaId.length > 0 ? (mediaIndex[node.mediaId] ?? null) : null}
              error={error}
              onChange={(media) => replace(key, { ...node, mediaId: pickMedia(media) })}
            />
            <Field label="Chú thích" hint="Hiển thị dưới ảnh bằng kiểu nhãn nhỏ.">
              <Input
                value={node.caption ?? ''}
                onChange={(event) => {
                  const caption = event.target.value
                  replace(key, caption.length > 0 ? { ...node, caption } : { type: 'image', mediaId: node.mediaId })
                }}
              />
            </Field>
          </div>
        )

      case 'gallery':
        return (
          <MediaListField
            label="Bộ ảnh"
            hint="Kéo thêm ảnh; thứ tự chọn là thứ tự hiển thị."
            value={node.mediaIds
              .map((id) => mediaIndex[id])
              .filter((media): media is MediaRef => media !== undefined)}
            onChange={(media) => {
              for (const item of media) onMediaResolved(item)
              replace(key, { ...node, mediaIds: media.map((item) => item.id) })
            }}
          />
        )

      case 'video':
        return (
          <MediaField
            label="Video"
            kind="video"
            value={node.mediaId.length > 0 ? (mediaIndex[node.mediaId] ?? null) : null}
            error={error}
            onChange={(media) => replace(key, { ...node, mediaId: pickMedia(media) })}
          />
        )

      case 'quote':
        return (
          <div className="flex flex-col gap-6">
            <Field label="Trích dẫn" error={error}>
              <Textarea
                rows={3}
                value={node.text}
                onChange={(event) => replace(key, { ...node, text: event.target.value })}
              />
            </Field>
            <Field label="Nguồn / người nói">
              <Input
                value={node.attribution ?? ''}
                onChange={(event) => {
                  const attribution = event.target.value
                  replace(
                    key,
                    attribution.length > 0 ? { ...node, attribution } : { type: 'quote', text: node.text },
                  )
                }}
              />
            </Field>
          </div>
        )

      case 'list':
        return (
          <div className="flex flex-col gap-5">
            <ToggleRow
              label="Đánh số"
              note="Tắt để dùng dấu đầu dòng."
              checked={node.ordered}
              onChange={(ordered) => replace(key, { ...node, ordered })}
            />

            <div className="flex flex-col gap-3">
              {node.items.map((entry, itemIndex) => (
                <div key={itemIndex} className="flex items-end gap-4">
                  <span className="u-label pb-3 text-accent">{pad2(itemIndex + 1)}</span>
                  <div className="flex-1">
                    <Input
                      value={entry}
                      aria-label={`Mục ${itemIndex + 1}`}
                      onChange={(event) => {
                        const next = node.items.map((value, i) => (i === itemIndex ? event.target.value : value))
                        replace(key, { ...node, items: next })
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="underline"
                    size="sm"
                    onClick={() => replace(key, { ...node, items: node.items.filter((_, i) => i !== itemIndex) })}
                  >
                    Xoá
                  </Button>
                </div>
              ))}

              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => replace(key, { ...node, items: [...node.items, ''] })}
                >
                  Thêm mục
                </Button>
              </div>
            </div>
          </div>
        )

      case 'projectRef':
        return (
          <Field label="Dự án" hint="Chèn thẻ dẫn tới một dự án đã đăng." error={error}>
            <Select
              value={node.projectId}
              options={[
                { value: '', label: '— Chưa chọn —' },
                ...projects.map((project) => ({ value: project.id, label: project.title })),
              ]}
              onChange={(event) => replace(key, { ...node, projectId: event.target.value })}
            />
          </Field>
        )

      case 'divider':
        return (
          <div className="flex items-center gap-4 py-2">
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="u-label text-muted">Kẻ ngang</span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="u-label text-ink">Nội dung</span>
        <StatusPill tone="neutral">{items.length} khối</StatusPill>
      </div>

      {items.length === 0 ? (
        <p className="border border-dashed border-line px-5 py-12 text-center font-body text-[0.875rem] text-muted">
          Bài viết chưa có khối nào. Thêm khối đầu tiên bên dưới.
        </p>
      ) : (
        <DragList
          items={items}
          getKey={(item) => item.key}
          onReorder={onChange}
          renderItem={(item, index) => {
            const meta = richTextNodeMeta(item.node.type)
            const hasError = Boolean(fieldErrors?.[`content.nodes.${index}`])

            return (
              <article className={cn('border bg-canvas', hasError ? 'border-accent' : 'border-line')}>
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-3">
                  <div className="flex items-center gap-4">
                    <span className="u-label text-accent">{pad2(index + 1)}</span>
                    <span className="u-label text-ink">{meta.label}</span>
                    <span className="font-body text-[0.75rem] text-muted">{meta.note}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="underline" size="sm" onClick={() => duplicate(item.key)}>
                      Nhân bản
                    </Button>
                    <Button type="button" variant="underline" size="sm" onClick={() => remove(item.key)}>
                      Xoá khối
                    </Button>
                  </div>
                </header>
                <div className="px-5 py-6">{renderNodeEditor(item, index)}</div>
              </article>
            )
          }}
        />
      )}

      <div className="border border-dashed border-line px-5 py-5">
        {adding ? (
          <div className="flex flex-col gap-4">
            <span className="u-label text-ink">Chọn loại khối</span>
            <div className="flex flex-wrap gap-3">
              {RICH_TEXT_NODE_META.map((meta) => (
                <button
                  key={meta.type}
                  type="button"
                  onClick={() => append(meta.type)}
                  className="flex flex-col gap-1 border border-line px-4 py-3 text-left transition-colors hover:border-ink"
                >
                  <span className="u-label text-ink">{meta.label}</span>
                  <span className="font-body text-[0.75rem] text-muted">{meta.en}</span>
                </button>
              ))}
            </div>
            <div>
              <Button type="button" variant="underline" size="sm" onClick={() => setAdding(false)}>
                Huỷ
              </Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(true)}>
            Thêm khối
          </Button>
        )}
      </div>
    </div>
  )
}
