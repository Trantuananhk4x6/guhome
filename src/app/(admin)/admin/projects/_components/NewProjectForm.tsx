'use client'

/**
 * `/admin/projects/new` — the first, smallest step of a project.
 *
 * A project needs a real id before media can be attached or blocks saved, so
 * this form asks for the four fields that cannot be guessed and then hands over
 * to the editor at `/admin/projects/[id]`. Everything else — cover, summary,
 * bố cục, thư viện — is edited there.
 *
 * `createProject` is called directly inside a transition (rather than through
 * `useActionRunner`) because the redirect needs `result.data.id`, which only the
 * action's own discriminated union exposes.
 */

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition, type FormEvent } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { AdminField, AdminSelectField, type AdminSelectOption } from '@/components/admin/FormRow'
import { slugify } from '@/lib/utils'
import { createProject } from '@/server/actions/projects'
import type { PublishStatus } from '@/types/content'

export interface NewProjectCategoryOption {
  id: string
  name: string
}

export interface NewProjectFormProps {
  categories: readonly NewProjectCategoryOption[]
}

const STATUS_OPTIONS: readonly AdminSelectOption[] = [
  { value: 'draft', label: 'Bản nháp' },
  { value: 'published', label: 'Xuất bản ngay' },
]

const NO_FIELD_ERRORS: Record<string, string> = {}

export function NewProjectForm({ categories }: NewProjectFormProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [status, setStatus] = useState<PublishStatus>('draft')

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>(NO_FIELD_ERRORS)

  const effectiveSlug = slugTouched ? slug : slugify(title)
  const ready = title.trim().length >= 2

  const categoryOptions: AdminSelectOption[] = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (pending || !ready) return

    setError(null)
    setFieldErrors(NO_FIELD_ERRORS)

    startTransition(async () => {
      try {
        const result = await createProject({
          title: title.trim(),
          slug: effectiveSlug,
          categoryId,
          status,
        })

        if (!result.ok) {
          setError(result.error)
          setFieldErrors(result.fieldErrors ?? NO_FIELD_ERRORS)
          return
        }

        router.push(`/admin/projects/${result.data.id}`)
      } catch (cause) {
        console.error('[admin/projects] createProject failed', cause)
        setError('Không kết nối được máy chủ. Vui lòng thử lại.')
      }
    })
  }

  return (
    <form onSubmit={submit} className="flex max-w-2xl flex-col gap-6" noValidate>
      <AdminField
        label="Tên dự án"
        required
        autoFocus
        value={title}
        placeholder="Tĩnh Viện"
        maxLength={160}
        error={fieldErrors['title'] ?? null}
        hint="Tên tiếng Việt, 2–4 chữ, gợi hình. Có thể đổi bất cứ lúc nào."
        onChange={(event) => setTitle(event.target.value)}
      />

      <AdminField
        label="Slug"
        value={effectiveSlug}
        spellCheck={false}
        maxLength={90}
        error={fieldErrors['slug'] ?? null}
        hint={`Đường dẫn công khai: /projects/${effectiveSlug || '…'} · để trống sẽ lấy theo tên. Nếu trùng, hệ thống tự thêm hậu tố.`}
        onChange={(event) => {
          setSlugTouched(true)
          setSlug(event.target.value)
        }}
        onBlur={(event) => setSlug(slugify(event.target.value))}
      />

      <AdminSelectField
        label="Danh mục"
        value={categoryId}
        placeholder={categories.length > 0 ? 'Chưa phân loại' : 'Chưa có danh mục nào'}
        options={categoryOptions}
        error={fieldErrors['categoryId'] ?? null}
        hint="Dùng để lọc ở trang dự án công khai. Có thể chọn sau."
        onChange={(event) => setCategoryId(event.target.value)}
      />

      <AdminSelectField
        label="Trạng thái"
        value={status}
        options={STATUS_OPTIONS}
        error={fieldErrors['status'] ?? null}
        hint="Bản nháp chỉ hiện trong CMS. Thường thì dựng xong bố cục rồi mới xuất bản."
        onChange={(event) => setStatus(event.target.value === 'published' ? 'published' : 'draft')}
      />

      {error ? (
        <p
          role="alert"
          className="border-l border-accent pl-3 font-body text-[0.8125rem] leading-relaxed text-accent"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
        <button type="submit" disabled={pending || !ready} className={adminButtonClass('solid')}>
          {pending ? 'Đang tạo…' : 'Tạo dự án'}
        </button>
        <Link href="/admin/projects" className={adminButtonClass('ghost')}>
          Huỷ
        </Link>
      </div>
    </form>
  )
}
