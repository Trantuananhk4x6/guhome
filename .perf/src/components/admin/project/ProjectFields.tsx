'use client'

/**
 * Tab NỘI DUNG — the project row itself.
 *
 * Every control writes into the same `ProjectDraft` the SaveBar posts through
 * `updateProject`, so the field names here are the action's field names and a
 * `fieldErrors` key lands on the right control without translation.
 */

import { AdminPanel, TagsField, ToggleRow } from '@/components/admin/site/Fields'
import { MediaField } from '@/components/admin/site/MediaField'
import {
  AdminField,
  AdminSelectField,
  AdminTextareaField,
  FormGrid,
  FormRow,
} from '@/components/admin/FormRow'
import { slugify } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

import {
  PROJECT_STATUS_OPTIONS,
  type CategoryOption,
  type ProjectDraft,
} from './contracts'
import type { MediaIndex } from './Pickers'

export interface ProjectFieldsProps {
  value: ProjectDraft
  onChange: (patch: Partial<ProjectDraft>) => void
  categories: readonly CategoryOption[]
  media: MediaIndex
  onMediaResolved: (items: readonly MediaRef[]) => void
  fieldErrors: Readonly<Record<string, string>>
}

export function ProjectFields({
  value,
  onChange,
  categories,
  media,
  onMediaResolved,
  fieldErrors,
}: ProjectFieldsProps) {
  const error = (key: string): string | null => fieldErrors[key] ?? null
  const cover = value.coverMediaId ? (media[value.coverMediaId] ?? null) : null

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
