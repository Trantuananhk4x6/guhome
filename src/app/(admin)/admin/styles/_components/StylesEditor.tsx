'use client'

/**
 * `/admin/styles` — the style taxonomy: one reorderable list plus a dialog form.
 *
 * The list is the only thing that owns order: dragging edits a local copy and
 * the SaveBar posts the whole id array to `reorderStyles`, which rewrites every
 * row in one statement. Everything else about a style is edited in the dialog
 * and saved on its own, so a half-finished form never blocks a reorder.
 */

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { Dialog } from '@/components/admin/Dialog'
import { DragList } from '@/components/admin/DragList'
import { EmptyState } from '@/components/admin/EmptyState'
import { MediaThumb } from '@/components/admin/MediaThumb'
import { SaveBar } from '@/components/admin/SaveBar'
import { adminButtonClass } from '@/components/admin/AdminShell'
import {
  AdminField,
  AdminTextareaField,
  FormGrid,
} from '@/components/admin/FormRow'
import { AdminPanel, StatusPill, ToggleRow } from '@/components/admin/site/Fields'
import { MediaField } from '@/components/admin/site/MediaField'
import { useActionRunner } from '@/components/admin/site/useEditorState'
import { Button } from '@/components/ui/Button'
import { cn, pad2, slugify } from '@/lib/utils'
import {
  createStyle,
  deleteStyle,
  reorderStyles,
  updateStyle,
  type StyleFormInput,
} from '@/server/actions/styles'
import type { MediaRef } from '@/types/content'

import { emptyStyleDraft, styleDraftErrors, toStyleDraft, type AdminStyleRow, type StyleDraft } from './contracts'

export interface StylesEditorProps {
  rows: readonly AdminStyleRow[]
}

/** The form's fields as the action takes them; `order` stays with the list. */
function toFormInput(draft: StyleDraft, order: number): StyleFormInput {
  return {
    name: draft.name.trim(),
    slug: draft.slug.trim(),
    nameEn: draft.nameEn.trim(),
    tagline: draft.tagline.trim(),
    description: draft.description.trim(),
    coverMediaId: draft.coverMediaId,
    seoTitle: draft.seoTitle.trim(),
    seoDescription: draft.seoDescription.trim(),
    order,
    enabled: draft.enabled,
  }
}

interface FormState {
  /** null while creating — the dialog is the same either way. */
  id: string | null
  order: number
  draft: StyleDraft
  cover: MediaRef | null
}

export function StylesEditor({ rows }: StylesEditorProps) {
  const router = useRouter()

  // The server list is the baseline; a refresh hands us a new array and the
  // local order has to adopt it, otherwise a saved reorder would keep showing
  // the pre-save arrangement.
  const [seen, setSeen] = useState(rows)
  const [list, setList] = useState<readonly AdminStyleRow[]>(rows)
  if (seen !== rows) {
    setSeen(rows)
    setList(rows)
  }

  const listRunner = useActionRunner()
  const formRunner = useActionRunner()

  const [form, setForm] = useState<FormState | null>(null)
  const [pendingDelete, setPendingDelete] = useState<AdminStyleRow | null>(null)

  const orderDirty = list.some((row, index) => rows[index]?.id !== row.id)

  const openCreate = (): void => {
    formRunner.clear()
    setForm({ id: null, order: list.length, draft: emptyStyleDraft(), cover: null })
  }

  const openEdit = (row: AdminStyleRow): void => {
    formRunner.clear()
    setForm({ id: row.id, order: row.order, draft: toStyleDraft(row), cover: row.cover })
  }

  const patch = (changes: Partial<StyleDraft>): void => {
    setForm((current) => (current ? { ...current, draft: { ...current.draft, ...changes } } : current))
  }

  const clientErrors = form ? styleDraftErrors(form.draft) : {}
  const formError = (key: string): string | null =>
    formRunner.fieldErrors[key] ?? clientErrors[key] ?? null

  const saveForm = (): void => {
    if (!form) return
    if (Object.keys(clientErrors).length > 0) return
    const input = toFormInput(form.draft, form.order)
    const { id } = form

    formRunner.run(() => (id ? updateStyle({ ...input, id }) : createStyle(input)), {
      success: id ? 'Đã lưu phong cách.' : 'Đã tạo phong cách.',
      onSuccess: () => {
        setForm(null)
        router.refresh()
      },
    })
  }

  const saveOrder = (): void => {
    listRunner.run(() => reorderStyles({ ids: list.map((row) => row.id) }), {
      success: 'Đã lưu thứ tự phong cách.',
      onSuccess: () => router.refresh(),
    })
  }

  const toggleEnabled = (row: AdminStyleRow, enabled: boolean): void => {
    // Optimistic: the switch has to answer at once. A failed save falls back to
    // the server list on the refresh below.
    setList((current) => current.map((item) => (item.id === row.id ? { ...item, enabled } : item)))
    listRunner.run(() => updateStyle({ ...toFormInput({ ...toStyleDraft(row), enabled }, row.order), id: row.id }), {
      success: enabled ? `Đã bật “${row.name}”.` : `Đã tắt “${row.name}”.`,
      onSuccess: () => router.refresh(),
    })
  }

  const confirmDelete = (): void => {
    const row = pendingDelete
    if (!row) return
    listRunner.run(() => deleteStyle({ id: row.id }), {
      success: `Đã xoá “${row.name}”.`,
      onSuccess: () => {
        setPendingDelete(null)
        router.refresh()
      },
    })
  }

  const enabledCount = list.filter((row) => row.enabled).length

  return (
    <div className="flex flex-col gap-8 pb-28">
      <AdminPanel
        eyebrow="Styles"
        title="Danh sách phong cách"
        description="Kéo để đổi thứ tự — đây chính là thứ tự khách nhìn thấy trên trang Phong cách. Một phong cách bị tắt vẫn giữ nguyên dự án đã gắn nhưng không hiện với khách."
        actions={
          <>
            <StatusPill tone={enabledCount === 0 ? 'muted' : 'accent'}>
              {enabledCount}/{list.length} đang bật
            </StatusPill>
            <Button type="button" variant="ghost" size="sm" onClick={openCreate}>
              Thêm phong cách
            </Button>
          </>
        }
      >
        {list.length === 0 ? (
          <EmptyState
            title="Chưa có phong cách nào"
            description="Phong cách là bộ lọc của trang dự án — Tân cổ điển, Tối giản, Đương đại… Tạo mục đầu tiên rồi gắn cho dự án ở trang Dự án."
            action={
              <Button type="button" variant="ghost" size="sm" onClick={openCreate}>
                Thêm phong cách
              </Button>
            }
          />
        ) : (
          <DragList
            items={list}
            label="Phong cách"
            getKey={(row) => row.id}
            onReorder={(next) => setList(next)}
            renderItem={(row, index) => (
              <div
                className={cn(
                  'flex flex-wrap items-center gap-x-5 gap-y-4 border bg-canvas px-5 py-4',
                  row.enabled ? 'border-line' : 'border-dashed border-line',
                )}
              >
                <span className="u-label text-accent">{pad2(index + 1)}</span>

                <MediaThumb media={row.cover} size="sm" alt="" />

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-body text-[0.875rem] leading-5 text-ink">{row.name}</span>
                  <span className="font-body text-[0.75rem] leading-5 text-muted">
                    {row.nameEn ? `${row.nameEn} · ` : ''}
                    /{row.slug} · {row.projectCount} dự án
                  </span>
                  {row.tagline ? (
                    <span className="truncate font-body text-[0.75rem] leading-5 text-muted/80">{row.tagline}</span>
                  ) : null}
                </div>

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={row.enabled}
                    onChange={(event) => toggleEnabled(row, event.target.checked)}
                    className="h-4 w-4 accent-[var(--c-accent)]"
                    aria-label={`Hiện phong cách ${row.name}`}
                  />
                  <span className="u-label">Hiện</span>
                </label>

                <div className="flex items-center gap-3">
                  <Button type="button" variant="ghost" size="sm" onClick={() => openEdit(row)}>
                    Sửa
                  </Button>
                  <Button type="button" variant="underline" size="sm" onClick={() => setPendingDelete(row)}>
                    Xoá
                  </Button>
                </div>
              </div>
            )}
          />
        )}
      </AdminPanel>

      <SaveBar
        dirty={orderDirty}
        saving={listRunner.pending}
        error={listRunner.error}
        message={listRunner.message}
        onSave={saveOrder}
        onReset={() => setList(rows)}
        saveLabel="Lưu thứ tự"
      />

      <Dialog
        open={form !== null}
        onClose={() => setForm(null)}
        title={form?.id ? 'Sửa phong cách' : 'Phong cách mới'}
        description="Tên và lời dẫn hiện trên trang Phong cách; ảnh bìa dùng cho thẻ và đầu trang."
        width="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setForm(null)}
              disabled={formRunner.pending}
              className={adminButtonClass('ghost')}
            >
              Huỷ
            </button>
            <button
              type="button"
              onClick={saveForm}
              disabled={formRunner.pending || Object.keys(clientErrors).length > 0}
              className={adminButtonClass('solid')}
            >
              {formRunner.pending ? 'Đang lưu…' : 'Lưu phong cách'}
            </button>
          </>
        }
      >
        {form ? (
          <div className="flex flex-col gap-6">
            <FormGrid>
              <AdminField
                label="Tên phong cách"
                required
                value={form.draft.name}
                maxLength={120}
                error={formError('name')}
                placeholder="Tân cổ điển"
                onChange={(event) => patch({ name: event.target.value })}
              />
              <AdminField
                label="Tên tiếng Anh"
                hint="Dòng phụ nhỏ dưới tên. Không bắt buộc."
                value={form.draft.nameEn}
                maxLength={120}
                error={formError('nameEn')}
                placeholder="Modern Classic"
                onChange={(event) => patch({ nameEn: event.target.value })}
              />
            </FormGrid>

            <AdminField
              label="Slug"
              hint="Bỏ trống để tạo từ tên. Nếu trùng, hệ thống tự thêm hậu tố."
              value={form.draft.slug}
              maxLength={90}
              spellCheck={false}
              error={formError('slug')}
              placeholder={slugify(form.draft.name) || 'tan-co-dien'}
              onChange={(event) => patch({ slug: event.target.value })}
            />

            <AdminField
              label="Lời dẫn"
              hint="Một dòng ngắn mô tả phong cách, hiện dưới tên ở trang danh sách."
              value={form.draft.tagline}
              maxLength={200}
              error={formError('tagline')}
              placeholder="Đường nét cổ điển tiết chế, vật liệu ấm."
              onChange={(event) => patch({ tagline: event.target.value })}
            />

            <AdminTextareaField
              label="Mô tả"
              hint="Một đến ba đoạn cho đầu trang phong cách."
              rows={6}
              maxLength={4000}
              value={form.draft.description}
              error={formError('description')}
              onChange={(event) => patch({ description: event.target.value })}
            />

            <MediaField
              label="Ảnh bìa"
              hint="Chọn từ thư viện media. Tỷ lệ ngang cho kết quả đẹp nhất."
              value={form.cover}
              error={formError('coverMediaId')}
              onChange={(next) =>
                setForm((current) =>
                  current
                    ? { ...current, cover: next, draft: { ...current.draft, coverMediaId: next?.id ?? null } }
                    : current,
                )
              }
            />

            <FormGrid>
              <AdminField
                label="Tiêu đề SEO"
                hint="Bỏ trống để dùng tên phong cách."
                value={form.draft.seoTitle}
                maxLength={160}
                error={formError('seoTitle')}
                onChange={(event) => patch({ seoTitle: event.target.value })}
              />
              <AdminField
                label="Mô tả SEO"
                value={form.draft.seoDescription}
                maxLength={320}
                error={formError('seoDescription')}
                onChange={(event) => patch({ seoDescription: event.target.value })}
              />
            </FormGrid>

            <ToggleRow
              label="Hiện với khách"
              note="Tắt để giữ bản nháp: phong cách vẫn gắn với dự án nhưng không xuất hiện trên site."
              checked={form.draft.enabled}
              onChange={(enabled) => patch({ enabled })}
            />

            {formRunner.error ? (
              <p role="alert" className="border-l border-accent pl-3 font-body text-[0.8125rem] leading-relaxed text-accent">
                {formRunner.error}
              </p>
            ) : null}
          </div>
        ) : null}
      </Dialog>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Xoá phong cách?"
        description={
          pendingDelete
            ? `“${pendingDelete.name}” sẽ bị xoá khỏi thư viện và gỡ khỏi ${pendingDelete.projectCount} dự án đang gắn. Dự án không bị ảnh hưởng gì khác. Thao tác này không hoàn tác được.`
            : ''
        }
        confirmLabel="Xoá"
        cancelLabel="Giữ lại"
        tone="danger"
        pending={listRunner.pending}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}
