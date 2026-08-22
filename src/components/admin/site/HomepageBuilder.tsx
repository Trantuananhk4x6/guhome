'use client'

/**
 * `/admin/homepage` — the composition of the eight homepage sections: order,
 * on/off, and the copy each one actually reads.
 *
 * A section's `content` is opaque JSON on the way in and out; the draft below is
 * the editable projection of it (see `draftFromContent` / `mergeHomepageContent`),
 * and any key this form does not own survives a save untouched.
 */

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DragList } from '@/components/admin/DragList'
import { SaveBar } from '@/components/admin/SaveBar'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { cn, pad2 } from '@/lib/utils'
import { saveHomepage } from '@/server/actions/homepage'
import type { HomepageSection, HomepageSectionKey, MediaRef } from '@/types/content'

import {
  draftFromContent,
  homepageSectionMeta,
  mergeHomepageContent,
  STOPS_MAX,
  STOP_CAPTION_MAX,
  STOP_LABEL_MAX,
  type HomepageContentDraft,
  type StopDraft,
} from './contracts'
import { AdminPanel, StatusPill } from './Fields'
import { MediaField } from './MediaField'
import { useActionRunner, useEditorDraft } from './useEditorState'

export interface HomepageProjectOption {
  id: string
  title: string
  subtitle: string | null
}

interface SectionDraft {
  key: HomepageSectionKey
  enabled: boolean
  content: HomepageContentDraft
  /** Untouched original JSON, so unmanaged keys survive a save. */
  original: Record<string, unknown>
}

export interface HomepageBuilderProps {
  initial: HomepageSection[]
  projects: HomepageProjectOption[]
  /**
   * Assets already referenced by a section, so a saved stop shows its thumbnail
   * before anyone opens the picker. Optional: without it the rows still edit
   * fine, they just start blank until a picture is chosen again.
   */
  mediaIndex?: Record<string, MediaRef>
}

/**
 * A fresh stop. The id only ever serves as a list key, so a uuid is enough —
 * and it is generated here, in an event handler, never during a render that the
 * server also performs.
 */
function newStop(): StopDraft {
  return { id: crypto.randomUUID(), label: '', caption: '', mediaId: '' }
}

function toDrafts(sections: readonly HomepageSection[]): SectionDraft[] {
  return sections.map((section) => ({
    key: section.key,
    enabled: section.enabled,
    content: draftFromContent(section.content),
    original: section.content,
  }))
}

export function HomepageBuilder({ initial, projects, mediaIndex: initialMedia }: HomepageBuilderProps) {
  const router = useRouter()
  const draft = useEditorDraft<SectionDraft[]>(toDrafts(initial))
  const runner = useActionRunner()
  const [open, setOpen] = useState<string | null>(initial[0]?.key ?? null)
  // Grows as assets are picked, so a thumbnail survives until the page reloads.
  const [mediaIndex, setMediaIndex] = useState<Record<string, MediaRef>>(initialMedia ?? {})

  const sections = draft.value
  const enabledCount = sections.filter((section) => section.enabled).length

  const update = (key: HomepageSectionKey, patch: Partial<SectionDraft>): void => {
    draft.set((current) => current.map((section) => (section.key === key ? { ...section, ...patch } : section)))
  }

  const updateContent = (key: HomepageSectionKey, patch: Partial<HomepageContentDraft>): void => {
    draft.set((current) =>
      current.map((section) =>
        section.key === key ? { ...section, content: { ...section.content, ...patch } } : section,
      ),
    )
  }

  const updateStops = (
    key: HomepageSectionKey,
    change: (stops: readonly StopDraft[]) => StopDraft[],
  ): void => {
    draft.set((current) =>
      current.map((section) =>
        section.key === key
          ? { ...section, content: { ...section.content, stops: change(section.content.stops) } }
          : section,
      ),
    )
  }

  const chooseStopMedia = (key: HomepageSectionKey, id: string, media: MediaRef | null): void => {
    if (media) setMediaIndex((current) => ({ ...current, [media.id]: media }))
    updateStops(key, (stops) =>
      stops.map((stop) => (stop.id === id ? { ...stop, mediaId: media?.id ?? '' } : stop)),
    )
  }

  const chooseHeroMedia = (key: HomepageSectionKey, media: MediaRef | null): void => {
    if (media) setMediaIndex((current) => ({ ...current, [media.id]: media }))
    updateContent(key, { heroMediaId: media?.id ?? '' })
  }

  const handleSave = (): void => {
    const payload = {
      sections: sections.map((section, index) => {
        const meta = homepageSectionMeta(section.key)
        return {
          key: section.key,
          enabled: section.enabled,
          order: index,
          content: mergeHomepageContent(section.original, section.content, meta.fields),
        }
      }),
    }

    runner.run(() => saveHomepage(payload), {
      success: 'Đã lưu trang chủ.',
      onSuccess: () => {
        draft.commit(sections)
        router.refresh()
      },
    })
  }

  const projectOptions = [
    { value: '', label: '— Chưa chọn —' },
    ...projects.map((project) => ({ value: project.id, label: project.title })),
  ]

  return (
    <div className="flex flex-col gap-8 pb-28">
      <AdminPanel
        eyebrow="Composition"
        title="Thứ tự các khối"
        description="Kéo để đổi thứ tự. Tắt một khối là nó biến mất khỏi trang chủ nhưng nội dung vẫn được giữ."
        actions={<StatusPill tone="accent">{enabledCount}/{sections.length} đang bật</StatusPill>}
      >
        <DragList
          items={sections}
          getKey={(section) => section.key}
          onReorder={(next) => draft.set(next)}
          renderItem={(section, index) => {
            const meta = homepageSectionMeta(section.key)
            const expanded = open === section.key
            const fieldError = runner.fieldErrors[`sections.${index}.ctaHref`] ?? null

            return (
              <article
                className={cn(
                  'border bg-canvas transition-colors duration-300',
                  section.enabled ? 'border-line' : 'border-dashed border-line',
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : section.key)}
                    aria-expanded={expanded}
                    className="flex min-w-0 flex-1 items-center gap-5 text-left"
                  >
                    <span className="u-label text-accent">{pad2(index + 1)}</span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className={cn('font-display text-2xl leading-none', section.enabled ? 'text-ink' : 'text-muted')}>
                        {meta.label}
                      </span>
                      <Label>{meta.en}</Label>
                    </span>
                  </button>

                  <div className="flex items-center gap-5">
                    {!section.enabled ? <StatusPill tone="muted">Đang tắt</StatusPill> : null}
                    <label className="flex cursor-pointer items-center gap-3">
                      <span className="u-label">Bật</span>
                      <input
                        type="checkbox"
                        checked={section.enabled}
                        onChange={(event) => update(section.key, { enabled: event.target.checked })}
                        className="h-4 w-4 accent-[var(--c-accent)]"
                        aria-label={`Bật khối ${meta.label}`}
                      />
                    </label>
                    <Button
                      type="button"
                      variant="underline"
                      size="sm"
                      onClick={() => setOpen(expanded ? null : section.key)}
                    >
                      {expanded ? 'Thu gọn' : 'Sửa'}
                    </Button>
                  </div>
                </div>

                {expanded ? (
                  <div className="flex flex-col gap-7 border-t border-line px-5 py-7">
                    <p className="text-[0.8125rem] leading-relaxed text-muted">{meta.note}</p>

                    {meta.fields.includes('eyebrow') ? (
                      <Field label="Nhãn nhỏ (eyebrow)" hint="Chữ in hoa nhỏ phía trên tiêu đề — thường bằng tiếng Anh.">
                        <Input
                          value={section.content.eyebrow}
                          onChange={(event) => updateContent(section.key, { eyebrow: event.target.value })}
                        />
                      </Field>
                    ) : null}

                    {meta.fields.includes('heading') ? (
                      <Field label="Tiêu đề" hint="Xuống dòng bằng Enter để ngắt dòng đúng ý.">
                        <Textarea
                          rows={2}
                          value={section.content.heading}
                          onChange={(event) => updateContent(section.key, { heading: event.target.value })}
                        />
                      </Field>
                    ) : null}

                    {meta.fields.includes('body') ? (
                      <Field label="Đoạn mô tả">
                        <Textarea
                          rows={3}
                          value={section.content.body}
                          onChange={(event) => updateContent(section.key, { body: event.target.value })}
                        />
                      </Field>
                    ) : null}

                    {meta.fields.includes('cta') ? (
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Nhãn nút">
                          <Input
                            value={section.content.ctaLabel}
                            onChange={(event) => updateContent(section.key, { ctaLabel: event.target.value })}
                          />
                        </Field>
                        <Field
                          label="Đường dẫn nút"
                          hint="'/projects' hoặc 'https://…'"
                          error={fieldError}
                        >
                          <Input
                            value={section.content.ctaHref}
                            onChange={(event) => updateContent(section.key, { ctaHref: event.target.value })}
                            placeholder="/projects"
                          />
                        </Field>
                      </div>
                    ) : null}

                    {meta.fields.includes('heroMedia') ? (
                      <MediaField
                        label="Ảnh mở đầu"
                        chooseLabel="Chọn ảnh"
                        hint={
                          section.content.heroMediaId.length > 0 &&
                          mediaIndex[section.content.heroMediaId] === undefined
                            ? 'Ảnh đã lưu chưa tải được để xem trước — chọn lại nếu muốn đổi.'
                            : 'Bỏ trống thì màn hình mở đầu tự lấy cảnh của dự án tiêu biểu. Chọn ảnh ở đây là ảnh đó thắng.'
                        }
                        value={
                          section.content.heroMediaId.length > 0
                            ? (mediaIndex[section.content.heroMediaId] ?? null)
                            : null
                        }
                        onChange={(media) => chooseHeroMedia(section.key, media)}
                      />
                    ) : null}

                    {meta.fields.includes('featuredProject') ? (
                      <Field
                        label="Dự án dựng 3D"
                        hint="Chỉ những dự án đã đăng mới hiện ở đây."
                      >
                        <Select
                          value={section.content.featuredProjectId}
                          options={projectOptions}
                          onChange={(event) => updateContent(section.key, { featuredProjectId: event.target.value })}
                        />
                      </Field>
                    ) : null}

                    {meta.fields.includes('itemCount') ? (
                      <Field
                        label={meta.itemCountLabel ?? 'Số mục hiển thị'}
                        hint={`Để 0 nghĩa là dùng mặc định của khối (${meta.itemCountMin ?? 3}–${meta.itemCountMax ?? 9}).`}
                      >
                        <Input
                          type="number"
                          min={0}
                          max={meta.itemCountMax ?? 12}
                          value={section.content.itemCount}
                          onChange={(event) => {
                            const parsed = Number.parseInt(event.target.value, 10)
                            updateContent(section.key, { itemCount: Number.isFinite(parsed) ? parsed : 0 })
                          }}
                        />
                      </Field>
                    ) : null}

                    {meta.fields.includes('stops') ? (
                      <div className="flex flex-col gap-4 border-t border-line pt-7">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="u-label text-ink">Điểm dừng</span>
                          <span className="font-body text-[0.75rem] tabular-nums text-muted">
                            {section.content.stops.length}/{STOPS_MAX}
                          </span>
                        </div>
                        <p className="text-[0.75rem] leading-relaxed text-muted">
                          Mỗi điểm dừng là một khung cảnh khi cuộn qua khối 3D. Kéo tay nắm để đổi thứ tự.
                          Điểm dừng chưa chọn ảnh sẽ không được lưu.
                        </p>

                        <DragList
                          items={section.content.stops}
                          label={`Điểm dừng của khối ${meta.label}`}
                          getKey={(stop) => stop.id}
                          onReorder={(next) => updateStops(section.key, () => next)}
                          empty={
                            <p className="font-body text-[0.8125rem] text-muted">
                              Chưa có điểm dừng nào.
                            </p>
                          }
                          renderItem={(stop, stopIndex, context) => (
                            <div className="flex flex-col gap-5 border border-line bg-surface px-4 py-4">
                              <div className="flex items-center gap-3">
                                {context.handle}
                                <span className="u-label text-accent">{pad2(stopIndex + 1)}</span>
                                <span className="flex-1" />
                                <Button
                                  type="button"
                                  variant="underline"
                                  size="sm"
                                  onClick={() =>
                                    updateStops(section.key, (stops) =>
                                      stops.filter((item) => item.id !== stop.id),
                                    )
                                  }
                                >
                                  Xoá
                                </Button>
                              </div>

                              <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex flex-col gap-5">
                                  <Field label="Nhãn">
                                    <Input
                                      value={stop.label}
                                      maxLength={STOP_LABEL_MAX}
                                      placeholder="Phòng khách"
                                      onChange={(event) => {
                                        const label = event.target.value
                                        updateStops(section.key, (stops) =>
                                          stops.map((item) =>
                                            item.id === stop.id ? { ...item, label } : item,
                                          ),
                                        )
                                      }}
                                    />
                                  </Field>
                                  <Field label="Chú thích" hint="Không bắt buộc — một dòng mô tả ngắn.">
                                    <Input
                                      value={stop.caption}
                                      maxLength={STOP_CAPTION_MAX}
                                      placeholder="Ánh sáng chiều qua rèm vải thô"
                                      onChange={(event) => {
                                        const caption = event.target.value
                                        updateStops(section.key, (stops) =>
                                          stops.map((item) =>
                                            item.id === stop.id ? { ...item, caption } : item,
                                          ),
                                        )
                                      }}
                                    />
                                  </Field>
                                </div>

                                <MediaField
                                  label="Ảnh điểm dừng"
                                  chooseLabel="Chọn ảnh"
                                  hint={
                                    stop.mediaId.length > 0 && mediaIndex[stop.mediaId] === undefined
                                      ? 'Ảnh đã lưu chưa tải được để xem trước — chọn lại nếu muốn đổi.'
                                      : undefined
                                  }
                                  value={stop.mediaId.length > 0 ? (mediaIndex[stop.mediaId] ?? null) : null}
                                  onChange={(media) => chooseStopMedia(section.key, stop.id, media)}
                                />
                              </div>
                            </div>
                          )}
                        />

                        <div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={section.content.stops.length >= STOPS_MAX}
                            onClick={() => updateStops(section.key, (stops) => [...stops, newStop()])}
                          >
                            Thêm điểm dừng
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </article>
            )
          }}
        />
      </AdminPanel>

      <AdminPanel eyebrow="Preview" title="Kiểm tra nhanh" description="Mở trang chủ ở tab mới để đối chiếu sau khi lưu.">
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/" external variant="ghost" size="sm" withArrow>
            Xem trang chủ
          </Button>
          <p className="text-[0.75rem] text-muted">
            Trang chủ được revalidate ngay khi lưu, không cần build lại.
          </p>
        </div>
      </AdminPanel>

      <SaveBar
        dirty={draft.dirty}
        saving={runner.pending}
        error={runner.error}
        message={runner.message}
        onSave={handleSave}
        onReset={draft.reset}
        saveLabel="Lưu trang chủ"
      />
    </div>
  )
}
