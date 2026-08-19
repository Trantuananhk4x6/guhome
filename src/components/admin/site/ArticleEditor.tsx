'use client'

/**
 * `/admin/articles/[id]` — the journal editor.
 *
 * The four workflow buttons (nháp / đăng / hẹn giờ / lưu trữ) all go through
 * `saveArticle`, so a status change can never publish a stale body: whatever is
 * on screen is what gets written, and every write leaves a `revisions` row.
 */

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { SaveBar } from '@/components/admin/SaveBar'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { slugify } from '@/lib/utils'
import { deleteArticle, saveArticle } from '@/server/actions/articles'
import type { MediaRef, PublishStatus, RichTextDoc, SeoMeta } from '@/types/content'

import {
  ARTICLE_STATUS_LABELS,
  estimateReadingMinutes,
  keyNodes,
  unkeyNodes,
  type KeyedNode,
} from './contracts'
import { AdminPanel, StatusPill, TagsField, ToggleRow, type PillTone } from './Fields'
import { MediaField } from './MediaField'
import { RichTextEditor, type RichTextProjectOption } from './RichTextEditor'
import { useActionRunner, useEditorDraft } from './useEditorState'

/* ---------------------------------- types ---------------------------------- */

export interface ArticleEditorArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  status: PublishStatus
  tags: string[]
  readingMinutes: number | null
  coverMediaId: string | null
  categoryId: string | null
  /** ISO strings — `Date` does not survive the server/client boundary cleanly. */
  scheduledAt: string | null
  publishedAt: string | null
  updatedAt: string
  authorName: string | null
  content: RichTextDoc
  seo: SeoMeta | null
}

export interface ArticleEditorProps {
  article: ArticleEditorArticle
  mediaIndex: Record<string, MediaRef>
  projects: RichTextProjectOption[]
  categories: { id: string; name: string }[]
}

interface ArticleDraft {
  title: string
  slug: string
  excerpt: string
  coverMediaId: string | null
  categoryId: string | null
  tags: string[]
  readingMinutesOverride: number | null
  status: PublishStatus
  scheduledAt: string | null
  publishedAt: string | null
  seoTitle: string
  seoDescription: string
  seoOgImageId: string | null
  seoNoIndex: boolean
  nodes: KeyedNode[]
}

/* --------------------------------- helpers --------------------------------- */

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/** ISO → the local `datetime-local` value the browser expects. */
function toLocalInput(iso: string | null): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`
}

/** `datetime-local` (local time) → ISO. */
function fromLocalInput(value: string): string | null {
  if (value.length === 0) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

function formatStamp(iso: string | null): string {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const STATUS_TONE: Record<PublishStatus, PillTone> = {
  draft: 'accent',
  published: 'ink',
  archived: 'muted',
}

function toDraft(article: ArticleEditorArticle): ArticleDraft {
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt ?? '',
    coverMediaId: article.coverMediaId,
    categoryId: article.categoryId,
    tags: article.tags,
    readingMinutesOverride: null,
    status: article.status,
    scheduledAt: article.scheduledAt,
    publishedAt: article.publishedAt,
    seoTitle: article.seo?.title ?? '',
    seoDescription: article.seo?.description ?? '',
    seoOgImageId: article.seo?.ogImageId ?? null,
    seoNoIndex: article.seo?.noIndex ?? false,
    nodes: keyNodes(article.content.nodes),
  }
}

/* --------------------------------- editor ---------------------------------- */

export function ArticleEditor({ article, mediaIndex: initialIndex, projects, categories }: ArticleEditorProps) {
  const router = useRouter()
  const draft = useEditorDraft<ArticleDraft>(toDraft(article))
  const runner = useActionRunner()

  const [mediaIndex, setMediaIndex] = useState<Record<string, MediaRef>>(initialIndex)
  const [slugTouched, setSlugTouched] = useState(article.slug.length > 0)
  const [autoReadingTime, setAutoReadingTime] = useState(true)
  const [scheduling, setScheduling] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const value = draft.value
  const errors = runner.fieldErrors

  const rememberMedia = (media: MediaRef): void => {
    setMediaIndex((current) => (current[media.id] ? current : { ...current, [media.id]: media }))
  }

  const patch = (changes: Partial<ArticleDraft>): void => {
    draft.set((current) => ({ ...current, ...changes }))
  }

  const autoMinutes = useMemo(() => estimateReadingMinutes(unkeyNodes(value.nodes)), [value.nodes])
  const effectiveMinutes = autoReadingTime ? autoMinutes : (value.readingMinutesOverride ?? autoMinutes)

  const buildPayload = (status: PublishStatus, scheduledAt: string | null) => ({
    id: article.id,
    title: value.title,
    slug: value.slug,
    excerpt: value.excerpt,
    coverMediaId: value.coverMediaId,
    categoryId: value.categoryId,
    tags: value.tags,
    readingMinutesOverride: autoReadingTime ? null : value.readingMinutesOverride,
    status,
    scheduledAt,
    publishedAt: value.publishedAt,
    seo: {
      title: value.seoTitle,
      description: value.seoDescription,
      ogImageId: value.seoOgImageId ?? '',
      noIndex: value.seoNoIndex,
    },
    content: { nodes: unkeyNodes(value.nodes) },
  })

  const commitWith = (status: PublishStatus, scheduledAt: string | null, success: string): void => {
    const payload = buildPayload(status, scheduledAt)
    runner.run(() => saveArticle(payload), {
      success,
      onSuccess: () => {
        const next: ArticleDraft = { ...value, status, scheduledAt }
        draft.commit(next)
        setScheduling(false)
        router.refresh()
      },
    })
  }

  const handleTitle = (title: string): void => {
    if (slugTouched) patch({ title })
    else patch({ title, slug: slugify(title) })
  }

  return (
    <div className="flex flex-col gap-8 pb-32">
      {/* ------------------------------ workflow ------------------------------ */}
      <AdminPanel
        eyebrow="Workflow"
        title="Trạng thái"
        description="Mỗi thao tác dưới đây lưu toàn bộ nội dung đang mở và ghi một bản lưu vào lịch sử."
        actions={<StatusPill tone={STATUS_TONE[value.status]}>{ARTICLE_STATUS_LABELS[value.status]}</StatusPill>}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="button"
              variant={value.status === 'draft' ? 'solid' : 'ghost'}
              size="sm"
              disabled={runner.pending}
              onClick={() => commitWith('draft', null, 'Đã lưu bản nháp.')}
            >
              Lưu nháp
            </Button>
            <Button
              type="button"
              variant={value.status === 'published' && !value.scheduledAt ? 'solid' : 'ghost'}
              size="sm"
              disabled={runner.pending}
              onClick={() => commitWith('published', null, 'Đã đăng bài viết.')}
            >
              Đăng ngay
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={runner.pending}
              onClick={() => setScheduling((current) => !current)}
            >
              Hẹn giờ đăng
            </Button>
            <Button
              type="button"
              variant={value.status === 'archived' ? 'solid' : 'ghost'}
              size="sm"
              disabled={runner.pending}
              onClick={() => commitWith('archived', null, 'Đã đưa vào lưu trữ.')}
            >
              Lưu trữ
            </Button>

            <span className="mx-2 h-6 w-px bg-line" aria-hidden="true" />

            <Button href={`/journal/${value.slug}`} external variant="underline" size="sm" withArrow>
              Xem trước
            </Button>
          </div>

          {scheduling ? (
            <div className="flex flex-wrap items-end gap-5 border border-line px-5 py-5">
              <div className="min-w-64 flex-1">
                <Field label="Thời điểm đăng" hint="Bài sẽ ẩn khỏi trang công khai cho tới đúng thời điểm này.">
                  <Input
                    type="datetime-local"
                    value={toLocalInput(value.scheduledAt)}
                    onChange={(event) => patch({ scheduledAt: fromLocalInput(event.target.value) })}
                  />
                </Field>
              </div>
              <Button
                type="button"
                size="sm"
                disabled={runner.pending || value.scheduledAt === null}
                onClick={() => {
                  if (value.scheduledAt) commitWith('published', value.scheduledAt, 'Đã hẹn giờ đăng.')
                }}
              >
                Xác nhận hẹn giờ
              </Button>
              <Button type="button" variant="underline" size="sm" onClick={() => setScheduling(false)}>
                Huỷ
              </Button>
            </div>
          ) : null}

          <dl className="grid gap-5 border-t border-line pt-5 sm:grid-cols-4">
            <div className="flex flex-col gap-1">
              <dt className="u-label">Đã đăng</dt>
              <dd className="font-body text-[0.8125rem] text-ink">{formatStamp(value.publishedAt)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="u-label">Hẹn giờ</dt>
              <dd className="font-body text-[0.8125rem] text-ink">{formatStamp(value.scheduledAt)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="u-label">Cập nhật</dt>
              <dd className="font-body text-[0.8125rem] text-ink">{formatStamp(article.updatedAt)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="u-label">Tác giả</dt>
              <dd className="font-body text-[0.8125rem] text-ink">{article.authorName ?? '—'}</dd>
            </div>
          </dl>
        </div>
      </AdminPanel>

      {/* ------------------------------- basics ------------------------------- */}
      <AdminPanel eyebrow="Article" title="Thông tin bài viết">
        <div className="flex flex-col gap-7">
          <Field label="Tiêu đề" required error={errors['title'] ?? null}>
            <Input value={value.title} onChange={(event) => handleTitle(event.target.value)} />
          </Field>

          <div className="grid gap-7 sm:grid-cols-2">
            <Field label="Slug" hint={`/journal/${value.slug || '…'}`} error={errors['slug'] ?? null}>
              <Input
                value={value.slug}
                spellCheck={false}
                onChange={(event) => {
                  setSlugTouched(true)
                  patch({ slug: event.target.value })
                }}
                onBlur={(event) => patch({ slug: slugify(event.target.value) })}
              />
            </Field>

            <Field label="Chuyên mục">
              <Select
                value={value.categoryId ?? ''}
                options={[
                  { value: '', label: '— Không phân loại —' },
                  ...categories.map((category) => ({ value: category.id, label: category.name })),
                ]}
                onChange={(event) => patch({ categoryId: event.target.value.length > 0 ? event.target.value : null })}
              />
            </Field>
          </div>

          <Field label="Tóm tắt" hint="1–2 câu, hiển thị trên thẻ bài viết và trong kết quả tìm kiếm.">
            <Textarea rows={3} value={value.excerpt} onChange={(event) => patch({ excerpt: event.target.value })} />
          </Field>

          <MediaField
            label="Ảnh bìa"
            hint="Ảnh ngang, tối thiểu 1600px."
            value={value.coverMediaId ? (mediaIndex[value.coverMediaId] ?? null) : null}
            onChange={(media) => {
              if (media) rememberMedia(media)
              patch({ coverMediaId: media?.id ?? null })
            }}
          />

          <div className="flex flex-col gap-3">
            <span className="u-label text-ink">Thẻ</span>
            <TagsField value={value.tags} onChange={(tags) => patch({ tags })} />
          </div>

          <div className="flex flex-col gap-4 border-t border-line pt-6">
            <ToggleRow
              label="Thời gian đọc tự động"
              note={`Ước tính hiện tại: ${autoMinutes} phút (200 từ/phút).`}
              checked={autoReadingTime}
              onChange={(next) => {
                setAutoReadingTime(next)
                if (next) patch({ readingMinutesOverride: null })
                else patch({ readingMinutesOverride: autoMinutes })
              }}
            />
            {!autoReadingTime ? (
              <Field label="Thời gian đọc (phút)" error={errors['readingMinutesOverride'] ?? null}>
                <Input
                  type="number"
                  min={1}
                  max={120}
                  value={value.readingMinutesOverride ?? autoMinutes}
                  onChange={(event) => {
                    const parsed = Number.parseInt(event.target.value, 10)
                    patch({ readingMinutesOverride: Number.isFinite(parsed) ? parsed : null })
                  }}
                />
              </Field>
            ) : (
              <p className="font-body text-[0.8125rem] text-muted">
                Sẽ lưu <span className="text-ink">{effectiveMinutes} phút</span>.
              </p>
            )}
          </div>
        </div>
      </AdminPanel>

      {/* ------------------------------- content ------------------------------ */}
      <AdminPanel
        eyebrow="Content"
        title="Nội dung"
        description="Kéo để đổi thứ tự khối. Mỗi khối là một node trong tài liệu, lưu nguyên dạng JSON."
      >
        <RichTextEditor
          items={value.nodes}
          onChange={(nodes) => patch({ nodes })}
          mediaIndex={mediaIndex}
          onMediaResolved={rememberMedia}
          projects={projects}
          fieldErrors={errors}
        />
        {errors['content'] ? (
          <p role="alert" className="mt-5 border-l border-accent pl-4 text-[0.8125rem] text-accent">
            {errors['content']}
          </p>
        ) : null}
      </AdminPanel>

      {/* --------------------------------- seo -------------------------------- */}
      <AdminPanel eyebrow="SEO" title="Tìm kiếm & chia sẻ" description="Bỏ trống để dùng tiêu đề và tóm tắt của bài.">
        <div className="flex flex-col gap-7">
          <Field label="Tiêu đề SEO" error={errors['seo.title'] ?? null}>
            <Input value={value.seoTitle} onChange={(event) => patch({ seoTitle: event.target.value })} />
          </Field>

          <Field label="Mô tả SEO" hint="150–160 ký tự." error={errors['seo.description'] ?? null}>
            <Textarea
              rows={3}
              value={value.seoDescription}
              onChange={(event) => patch({ seoDescription: event.target.value })}
            />
          </Field>

          <MediaField
            label="Ảnh chia sẻ"
            hint="1200×630. Bỏ trống để dùng ảnh bìa."
            value={value.seoOgImageId ? (mediaIndex[value.seoOgImageId] ?? null) : null}
            onChange={(media) => {
              if (media) rememberMedia(media)
              patch({ seoOgImageId: media?.id ?? null })
            }}
          />

          <ToggleRow
            label="Ẩn khỏi công cụ tìm kiếm"
            note="Thêm noindex vào metadata của bài."
            checked={value.seoNoIndex}
            onChange={(seoNoIndex) => patch({ seoNoIndex })}
          />
        </div>
      </AdminPanel>

      {/* ------------------------------- danger ------------------------------- */}
      <AdminPanel
        eyebrow="Danger"
        title="Xoá bài viết"
        description="Bản lưu cuối cùng vẫn nằm trong lịch sử, nhưng bài viết sẽ biến mất khỏi site và khỏi trình quản trị."
      >
        <Button type="button" variant="ghost" size="sm" onClick={() => setConfirmDelete(true)}>
          Xoá bài viết
        </Button>
      </AdminPanel>

      <SaveBar
        dirty={draft.dirty}
        saving={runner.pending}
        error={runner.error}
        message={runner.message}
        onSave={() => commitWith(value.status, value.scheduledAt, 'Đã lưu bài viết.')}
        onReset={draft.reset}
        saveLabel="Lưu"
      />

      <ConfirmDialog
        open={confirmDelete}
        title="Xoá bài viết này?"
        description={`"${value.title}" sẽ bị xoá khỏi cơ sở dữ liệu. Không thể hoàn tác từ giao diện quản trị.`}
        confirmLabel="Xoá vĩnh viễn"
        cancelLabel="Huỷ"
        tone="danger"
        onConfirm={() => {
          setConfirmDelete(false)
          runner.run(() => deleteArticle({ id: article.id }), {
            success: 'Đã xoá bài viết.',
            onSuccess: () => router.push('/admin/articles'),
          })
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  )
}
