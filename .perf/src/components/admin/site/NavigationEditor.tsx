'use client'

/**
 * `/admin/navigation` — the header and footer menus, one DragList each.
 *
 * Both lists are always submitted in full; the server action reconciles by id,
 * so reordering keeps a row's uuid and only genuinely removed rows are deleted.
 */

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { DragList } from '@/components/admin/DragList'
import { SaveBar } from '@/components/admin/SaveBar'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { cn, pad2 } from '@/lib/utils'
import { saveNavigation } from '@/server/actions/navigation'

import { NAV_HREF_HINT, navHrefError, type NavDraftItem, type NavLocation } from './contracts'
import { AdminPanel, StatusPill } from './Fields'
import { useActionRunner, useEditorDraft } from './useEditorState'

export interface NavigationEditorProps {
  header: NavDraftItem[]
  footer: NavDraftItem[]
}

interface NavDraftState {
  header: NavDraftItem[]
  footer: NavDraftItem[]
}

let placeholderCounter = 0

function newItem(): NavDraftItem {
  placeholderCounter += 1
  return { id: `new-${Date.now()}-${placeholderCounter}`, label: '', href: '/', enabled: true }
}

export function NavigationEditor({ header, footer }: NavigationEditorProps) {
  const router = useRouter()
  const draft = useEditorDraft<NavDraftState>({ header, footer })
  const runner = useActionRunner()
  const [pendingDelete, setPendingDelete] = useState<{ location: NavLocation; id: string; label: string } | null>(null)

  const setList = (location: NavLocation, items: NavDraftItem[]): void => {
    draft.set((current) => ({ ...current, [location]: items }))
  }

  const patch = (location: NavLocation, id: string, changes: Partial<NavDraftItem>): void => {
    draft.set((current) => ({
      ...current,
      [location]: current[location].map((item) => (item.id === id ? { ...item, ...changes } : item)),
    }))
  }

  const remove = (location: NavLocation, id: string): void => {
    draft.set((current) => ({ ...current, [location]: current[location].filter((item) => item.id !== id) }))
  }

  const invalidCount =
    draft.value.header.filter((item) => navHrefError(item.href) !== null || item.label.trim().length === 0).length +
    draft.value.footer.filter((item) => navHrefError(item.href) !== null || item.label.trim().length === 0).length

  const handleSave = (): void => {
    runner.run(() => saveNavigation({ header: draft.value.header, footer: draft.value.footer }), {
      success: 'Đã lưu menu. Header và footer đã cập nhật.',
      onSuccess: () => {
        draft.commit(draft.value)
        router.refresh()
      },
    })
  }

  const renderList = (location: NavLocation, title: string, eyebrow: string, note: string) => {
    const items = draft.value[location]
    const enabled = items.filter((item) => item.enabled).length

    return (
      <AdminPanel
        eyebrow={eyebrow}
        title={title}
        description={note}
        actions={
          <StatusPill tone={enabled === 0 ? 'muted' : 'accent'}>
            {enabled}/{items.length} mục
          </StatusPill>
        }
      >
        <div className="flex flex-col gap-6">
          {items.length === 0 ? (
            <p className="border border-dashed border-line px-5 py-10 text-center text-[0.8125rem] text-muted">
              Chưa có mục nào. Menu sẽ dùng danh sách mặc định của site.
            </p>
          ) : (
            <DragList
              items={items}
              getKey={(item) => item.id}
              onReorder={(next) => setList(location, next)}
              renderItem={(item, index) => {
                const hrefError = navHrefError(item.href)
                const labelError = item.label.trim().length === 0 ? 'Chưa nhập nhãn.' : null
                const serverError = runner.fieldErrors[`${location}.${index}.href`] ?? null

                return (
                  <div
                    className={cn(
                      'grid items-end gap-5 border bg-canvas px-5 py-5 sm:grid-cols-[auto_minmax(0,14rem)_minmax(0,1fr)_auto_auto]',
                      item.enabled ? 'border-line' : 'border-dashed border-line',
                    )}
                  >
                    <span className="u-label pb-3 text-accent">{pad2(index + 1)}</span>

                    <Field label="Nhãn" error={labelError}>
                      <Input
                        value={item.label}
                        onChange={(event) => patch(location, item.id, { label: event.target.value })}
                        placeholder="Dự án"
                      />
                    </Field>

                    <Field label="Đường dẫn" error={serverError ?? hrefError}>
                      <Input
                        value={item.href}
                        onChange={(event) => patch(location, item.id, { href: event.target.value })}
                        placeholder="/projects"
                        spellCheck={false}
                      />
                    </Field>

                    <label className="flex cursor-pointer items-center gap-3 pb-3">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={(event) => patch(location, item.id, { enabled: event.target.checked })}
                        className="h-4 w-4 accent-[var(--c-accent)]"
                        aria-label={`Hiện mục ${item.label || 'chưa đặt tên'}`}
                      />
                      <span className="u-label">Hiện</span>
                    </label>

                    <div className="pb-2">
                      <Button
                        type="button"
                        variant="underline"
                        size="sm"
                        onClick={() =>
                          setPendingDelete({ location, id: item.id, label: item.label || 'mục chưa đặt tên' })
                        }
                      >
                        Xoá
                      </Button>
                    </div>
                  </div>
                )
              }}
            />
          )}

          <div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setList(location, [...items, newItem()])}
            >
              Thêm mục
            </Button>
          </div>
        </div>
      </AdminPanel>
    )
  }

  return (
    <div className="flex flex-col gap-8 pb-28">
      {renderList('header', 'Menu đầu trang', 'Header', NAV_HREF_HINT)}
      {renderList('footer', 'Menu chân trang', 'Footer', NAV_HREF_HINT)}

      {invalidCount > 0 ? (
        <p role="status" className="border-l border-accent pl-4 text-[0.8125rem] leading-relaxed text-accent">
          {invalidCount} mục chưa hợp lệ — kiểm tra nhãn và đường dẫn trước khi lưu.
        </p>
      ) : null}

      <SaveBar
        dirty={draft.dirty}
        saving={runner.pending}
        error={runner.error}
        message={runner.message}
        onSave={handleSave}
        onReset={draft.reset}
        saveLabel="Lưu menu"
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Xoá mục menu?"
        description={
          pendingDelete
            ? `"${pendingDelete.label}" sẽ bị gỡ khỏi menu khi bạn lưu. Thao tác chưa ảnh hưởng tới site cho đến lúc đó.`
            : ''
        }
        confirmLabel="Xoá"
        cancelLabel="Giữ lại"
        tone="danger"
        onConfirm={() => {
          if (pendingDelete) remove(pendingDelete.location, pendingDelete.id)
          setPendingDelete(null)
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}
