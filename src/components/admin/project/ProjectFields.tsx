'use client'

/**
 * Tab NỘI DUNG — the project row itself.
 *
 * Every control writes into the same `ProjectDraft` the SaveBar posts through
 * `updateProject`, so the field names here are the action's field names and a
 * `fieldErrors` key lands on the right control without translation.
 */

import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { AdminPanel, TagsField, ToggleRow } from '@/components/admin/site/Fields'
import { MediaField } from '@/components/admin/site/MediaField'
import {
  AdminCheckbox,
  AdminField,
  AdminSelectField,
  AdminTextareaField,
  FormGrid,
  FormRow,
} from '@/components/admin/FormRow'
import { slugify } from '@/lib/utils'
import { listProjectStyleOptions } from '@/server/actions/projects'
import { readProjectStyleIds } from '@/server/actions/styles'
import type { MediaRef } from '@/types/content'

import {
  MAX_PROJECT_STYLES,
  PROJECT_STATUS_OPTIONS,
  isUuid,
  normalizeStyleIds,
  type CategoryOption,
  type ProjectDraft,
  type StyleOption,
} from './contracts'
import type { MediaIndex } from './Pickers'

/** `/admin/projects/<uuid>` — the id the page is editing, when there is one. */
const PROJECT_ROUTE = /\/admin\/projects\/([^/?#]+)/

export interface ProjectFieldsProps {
  value: ProjectDraft
  onChange: (patch: Partial<ProjectDraft>) => void
  categories: readonly CategoryOption[]
  media: MediaIndex
  onMediaResolved: (items: readonly MediaRef[]) => void
  fieldErrors: Readonly<Record<string, string>>
  /** Taxonomy for the style picker. Omitted — it fetches its own. */
  styles?: readonly StyleOption[]
  /** Project being edited. Omitted — it reads the id off the route. */
  projectId?: string
}

export function ProjectFields({
  value,
  onChange,
  categories,
  media,
  onMediaResolved,
  fieldErrors,
  styles,
  projectId,
}: ProjectFieldsProps) {
  const error = (key: string): string | null => fieldErrors[key] ?? null
  const cover = value.coverMediaId ? (media[value.coverMediaId] ?? null) : null

  /* ------------------------------ style picker ------------------------------ */

  const pathname = usePathname() ?? ''
  const editingId = useMemo(() => {
    if (projectId && isUuid(projectId)) return projectId
    const match = PROJECT_ROUTE.exec(pathname)
    const candidate = match?.[1] ?? ''
    return isUuid(candidate) ? candidate : null
  }, [projectId, pathname])

  // `null` until the fallback fetch lands; a `styles` prop always wins over it.
  const [fetchedStyles, setFetchedStyles] = useState<readonly StyleOption[] | null>(null)
  const styleOptions = styles ?? fetchedStyles ?? []
  const [styleNotice, setStyleNotice] = useState<string | null>(null)
  // What the project wears *on disk*. The draft stays `undefined` until the
  // editor actually touches a checkbox, so simply opening the page never counts
  // as a change and a save never rewrites attachments nobody edited.
  const [attached, setAttached] = useState<readonly string[]>(value.styleIds ?? [])
  /**
   * `false` only while the attachments are still in flight.
   *
   * The options and the attachments arrive on two separate requests, and the
   * options usually win. Ticking a box in that gap would make the draft own a
   * selection built from an empty starting set — and `setProjectStyles` rewrites
   * the join table wholesale, so saving would silently drop every style the
   * project already wore. Cheaper to hold the boxes for a moment.
   */
  const [attachedReady, setAttachedReady] = useState(
    () => editingId === null || value.styleIds !== undefined,
  )

  useEffect(() => {
    if (styles) return
    let alive = true
    void (async () => {
      const result = await listProjectStyleOptions()
      if (!alive) return
      if (result.ok) setFetchedStyles(result.data)
      else setStyleNotice(result.error)
    })()
    return () => {
      alive = false
    }
  }, [styles])

  useEffect(() => {
    if (value.styleIds !== undefined || editingId === null) return
    let alive = true
    void (async () => {
      const result = await readProjectStyleIds(editingId)
      if (!alive) return
      if (result.ok) setAttached(result.data)
      // Released either way: a failed read must not leave the picker inert.
      setAttachedReady(true)
    })()
    return () => {
      alive = false
    }
    // Only ever runs for the first load: once the editor picks anything,
    // `value.styleIds` owns the selection and this must not overwrite it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId])

  const selectedStyles = value.styleIds ?? attached
  const styleError = error('styleIds')

  const toggleStyle = (id: string, checked: boolean): void => {
    const next = checked
      ? [...selectedStyles, id]
      : selectedStyles.filter((current) => current !== id)
    onChange({ styleIds: normalizeStyleIds(next) })
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPanel
        eyebrow="Identity"
        title="Tên và lời dẫn"
        description="Tên dự án, đường dẫn và ba mức độ dài của lời dẫn: một dòng, một đoạn, và bài mô tả đầy đủ."
      >
        <div className="flex flex-col gap-6">
          <FormGrid>
            <AdminField
              label="Tên dự án"
              required
              value={value.title}
              maxLength={160}
              error={error('title')}
              placeholder="Tĩnh Viện"
              onChange={(event) => onChange({ title: event.target.value })}
            />
            <AdminField
              label="Slug"
              hint="Bỏ trống để tạo từ tên. Nếu trùng, hệ thống tự thêm hậu tố."
              value={value.slug}
              maxLength={90}
              spellCheck={false}
              error={error('slug')}
              placeholder={slugify(value.title) || 'tinh-vien'}
              onChange={(event) => onChange({ slug: event.target.value })}
            />
          </FormGrid>

          <AdminField
            label="Dòng phụ"
            hint="Một dòng ngắn dưới tên — có thể là nhãn tiếng Anh."
            value={value.subtitle}
            maxLength={200}
            error={error('subtitle')}
            onChange={(event) => onChange({ subtitle: event.target.value })}
          />

          <AdminTextareaField
            label="Tóm tắt"
            hint="35–60 chữ, cụ thể về vật liệu, ánh sáng và tỷ lệ. Dùng cho thẻ dự án và SEO."
            rows={4}
            maxLength={1600}
            value={value.summary}
            error={error('summary')}
            onChange={(event) => onChange({ summary: event.target.value })}
          />

          <AdminTextareaField
            label="Mô tả"
            hint="Ba đến năm đoạn. Để một dòng trống giữa hai đoạn."
            rows={12}
            maxLength={24000}
            value={value.description}
            error={error('description')}
            onChange={(event) => onChange({ description: event.target.value })}
          />
        </div>
      </AdminPanel>

      <AdminPanel
        eyebrow="Cover"
        title="Ảnh bìa"
        description="Tấm ảnh đại diện dự án ở trang danh sách, trang chủ và thẻ chia sẻ. Khối Mở đầu cũng lấy ảnh này khi để trống."
      >
        <MediaField
          label="Ảnh bìa"
          hint="Chọn từ thư viện media. Tỷ lệ ngang cho kết quả đẹp nhất."
          value={cover}
          onChange={(next) => {
            if (next) onMediaResolved([next])
            onChange({ coverMediaId: next?.id ?? null })
          }}
          error={error('coverMediaId')}
        />
      </AdminPanel>

      <AdminPanel
        eyebrow="Facts"
        title="Thông số dự án"
        description="Bảng thông tin khối Thông tin dự án đọc trực tiếp từ đây."
      >
        <div className="flex flex-col gap-6">
          <FormGrid>
            <AdminSelectField
              label="Danh mục"
              value={value.categoryId}
              options={categories.map((category) => ({ value: category.id, label: category.name }))}
              placeholder="— Chưa phân loại —"
              error={error('categoryId')}
              onChange={(event) => onChange({ categoryId: event.target.value })}
            />
            <AdminField
              label="Phong cách"
              value={value.style}
              maxLength={120}
              error={error('style')}
              placeholder="Tối giản ấm"
              onChange={(event) => onChange({ style: event.target.value })}
            />
          </FormGrid>

          <FormRow
            label="Phong cách (thư viện)"
            hint={
              styleNotice ??
              `Chọn một hoặc nhiều phong cách từ trang Phong cách. Đây là bộ lọc của trang dự án — khác với ô “Phong cách” ở trên, vốn là chữ biên tập hiện trong bảng thông tin. Tối đa ${MAX_PROJECT_STYLES} mục.`
            }
            error={styleError}
            group
          >
            {styleOptions.length === 0 ? (
              <p className="border border-dashed border-line px-4 py-6 text-center font-body text-[0.8125rem] leading-6 text-muted">
                Chưa có phong cách nào đang bật. Tạo ở trang Phong cách rồi quay lại đây.
              </p>
            ) : (
              <div className="grid gap-x-6 border border-line px-4 py-3 sm:grid-cols-2">
                {styleOptions.map((option) => {
                  const checked = selectedStyles.includes(option.id)
                  return (
                    <AdminCheckbox
                      key={option.id}
                      checked={checked}
                      // A full list stays browsable; only unchecked rows lock.
                      disabled={
                        !attachedReady ||
                        (!checked && selectedStyles.length >= MAX_PROJECT_STYLES)
                      }
                      label={option.name}
                      hint={option.nameEn ?? undefined}
                      onChange={(event) => toggleStyle(option.id, event.target.checked)}
                    />
                  )
                })}
              </div>
            )}
          </FormRow>

          <FormGrid cols={3}>
            <AdminField
              label="Địa điểm"
              value={value.location}
              maxLength={160}
              error={error('location')}
              placeholder="Thảo Điền, TP.HCM"
              onChange={(event) => onChange({ location: event.target.value })}
            />
            <AdminField
              label="Diện tích"
              value={value.area}
              maxLength={80}
              error={error('area')}
              placeholder="180 m²"
              onChange={(event) => onChange({ area: event.target.value })}
            />
            <AdminField
              label="Năm"
              hint="Bốn chữ số."
              value={value.year}
              inputMode="numeric"
              maxLength={4}
              error={error('year')}
              placeholder="2024"
              onChange={(event) => onChange({ year: event.target.value.replace(/[^0-9]/g, '') })}
            />
          </FormGrid>

          <FormGrid>
            <AdminField
              label="Khách hàng"
              hint="Không bắt buộc — chỉ hiện khi có."
              value={value.client}
              maxLength={160}
              error={error('client')}
              onChange={(event) => onChange({ client: event.target.value })}
            />
            <AdminField
              label="Thời gian thực hiện"
              value={value.duration}
              maxLength={80}
              error={error('duration')}
              placeholder="9 tháng"
              onChange={(event) => onChange({ duration: event.target.value })}
            />
          </FormGrid>

          <FormRow
            label="Hạng mục"
            hint="Tối đa 24 mục. Nhấn Enter sau mỗi mục."
            error={error('services')}
            group
          >
            <TagsField
              value={value.services}
              max={24}
              placeholder="Thiết kế nội thất, thi công trọn gói…"
              onChange={(services) => onChange({ services })}
            />
          </FormRow>
        </div>
      </AdminPanel>

      <AdminPanel
        eyebrow="Workflow"
        title="Trạng thái xuất bản"
        description="Chỉ dự án ở trạng thái Đã xuất bản mới hiện với khách. Lưu trữ giữ lại nội dung nhưng gỡ khỏi mọi danh sách."
      >
        <div className="flex flex-col gap-6">
          <FormGrid>
            <AdminSelectField
              label="Trạng thái"
              required
              value={value.status}
              options={PROJECT_STATUS_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
              error={error('status')}
              onChange={(event) => {
                const next = PROJECT_STATUS_OPTIONS.find((option) => option.value === event.target.value)
                if (next) onChange({ status: next.value })
              }}
            />
            <AdminField
              label="Thứ tự"
              hint="Số nhỏ đứng trước trong danh sách dự án. 0 là mặc định."
              type="number"
              min={0}
              max={9999}
              value={String(value.order)}
              error={error('order')}
              onChange={(event) => {
                const parsed = Number.parseInt(event.target.value, 10)
                onChange({ order: Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 9999) : 0 })
              }}
            />
          </FormGrid>

          <ToggleRow
            label="Dự án nổi bật"
            note="Xuất hiện ở khối dự án chọn lọc trên trang chủ."
            checked={value.featured}
            onChange={(featured) => onChange({ featured })}
          />
        </div>
      </AdminPanel>

      <AdminPanel
        eyebrow="SEO"
        title="Thẻ tìm kiếm"
        description="Bỏ trống thì trang dùng tên dự án và phần tóm tắt."
      >
        <div className="flex flex-col gap-6">
          <AdminField
            label="Tiêu đề SEO"
            hint="Tối đa 180 ký tự."
            value={value.seoTitle}
            maxLength={180}
            error={error('seoTitle')}
            onChange={(event) => onChange({ seoTitle: event.target.value })}
          />
          <AdminTextareaField
            label="Mô tả SEO"
            hint="Một đến hai câu, tối đa 320 ký tự."
            rows={3}
            maxLength={320}
            value={value.seoDescription}
            error={error('seoDescription')}
            onChange={(event) => onChange({ seoDescription: event.target.value })}
          />
        </div>
      </AdminPanel>
    </div>
  )
}
