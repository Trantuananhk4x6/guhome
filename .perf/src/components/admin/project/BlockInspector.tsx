'use client'

/**
 * The right-hand inspector of the page builder: the real payload of the block
 * currently selected on the canvas.
 *
 * One editor per `ProjectBlockType` — thirteen of them, no "not implemented"
 * branch. Each receives its block already narrowed by the switch at the bottom,
 * so `block.data` is the exact variant from `@/types/content` and every control
 * writes a correctly typed value back.
 */

import Link from 'next/link'
import type { ReactNode } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import {
  AdminCheckbox,
  AdminField,
  AdminSelectField,
  AdminTextareaField,
  FormGrid,
} from '@/components/admin/FormRow'
import { StatusPill } from '@/components/admin/StatusPill'
import { SCENE_MODE_LABELS } from '@/components/admin/media/types'
import type { MediaRef, ProjectBlockType } from '@/types/content'

import {
  ALIGN_OPTIONS,
  COLUMN_OPTIONS,
  IMAGE_WIDTH_OPTIONS,
  REVEAL_OPTIONS,
  SCENE_HEIGHT_OPTIONS,
  TEXT_WIDTH_OPTIONS,
  blockMeta,
  isUuid,
  parseColumns,
  parseReveal,
  type BlockDataOf,
  type BlockDraft,
  type BlockDraftOf,
  type MaterialOption,
  type SceneOption,
  type SiblingProjectOption,
} from './contracts'
import { MediaSlot, MediaSlotList, OptionPickList, type MediaIndex } from './Pickers'

/* --------------------------------- context --------------------------------- */

export interface InspectorContext {
  projectId: string
  media: MediaIndex
  onMediaResolved: (items: readonly MediaRef[]) => void
  materials: readonly MaterialOption[]
  projects: readonly SiblingProjectOption[]
  scenes: readonly SceneOption[]
  /** Fallback copy so HERO / SCENE_3D can say what happens when left empty. */
  projectCoverName: string | null
  projectSceneName: string | null
}

interface EditorProps<T extends ProjectBlockType> {
  block: BlockDraftOf<T>
  onChange: (next: BlockDraft) => void
  ctx: InspectorContext
}

function pickOne<T extends string>(value: string, allowed: readonly T[], fallback: T): T {
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 border-t border-line pt-6 first:border-t-0 first:pt-0">
      <span className="u-label text-muted">{title}</span>
      {children}
    </div>
  )
}

/* ---------------------------------- HERO ----------------------------------- */

function HeroEditor({ block, onChange, ctx }: EditorProps<'HERO'>) {
  const set = (data: Partial<BlockDataOf<'HERO'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Ảnh">
        <MediaSlot
          label="Ảnh mở đầu"
          hint={
            ctx.projectCoverName
              ? `Bỏ trống thì dùng ảnh bìa dự án (${ctx.projectCoverName}).`
              : 'Bỏ trống thì dùng ảnh bìa dự án — dự án này chưa có ảnh bìa.'
          }
          value={block.data.mediaId}
          index={ctx.media}
          projectId={ctx.projectId}
          onResolved={ctx.onMediaResolved}
          onChange={(mediaId) => set({ mediaId })}
        />
      </Section>
      <Section title="Chữ trên ảnh">
        <AdminField
          label="Nhãn nhỏ"
          hint="Chữ in hoa phía trên tiêu đề — thường bằng tiếng Anh."
          value={block.data.eyebrow ?? ''}
          maxLength={120}
          onChange={(event) => set({ eyebrow: event.target.value })}
        />
        <AdminField
          label="Tiêu đề"
          hint="Bỏ trống để dùng tên dự án."
          value={block.data.title ?? ''}
          maxLength={200}
          onChange={(event) => set({ title: event.target.value })}
        />
        <AdminCheckbox
          label="Tràn viền"
          hint="Ảnh chiếm trọn chiều ngang màn hình."
          checked={block.data.fullBleed ?? true}
          onChange={(event) => set({ fullBleed: event.target.checked })}
        />
      </Section>
    </>
  )
}

/* --------------------------------- SCENE_3D --------------------------------- */

function SceneEditor({ block, onChange, ctx }: EditorProps<'SCENE_3D'>) {
  const set = (data: Partial<BlockDataOf<'SCENE_3D'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  const options = ctx.scenes.map((scene) => ({
    value: scene.id,
    label:
      scene.projectId === ctx.projectId
        ? `${scene.label} · ${SCENE_MODE_LABELS[scene.mode]}`
        : `${scene.label} — ${scene.projectTitle ?? 'không gắn dự án'} · ${SCENE_MODE_LABELS[scene.mode]}`,
  }))

  return (
    <>
      <Section title="Cảnh">
        <AdminSelectField
          label="Cảnh 3D"
          hint={
            ctx.projectSceneName
              ? `Bỏ trống thì dùng cảnh đang gắn với dự án (${ctx.projectSceneName}).`
              : 'Dự án chưa có cảnh nào — chọn một cảnh ở đây, hoặc tạo cảnh ở tab 3D.'
          }
          value={block.data.sceneId ?? ''}
          options={options}
          placeholder="— Dùng cảnh của dự án —"
          onChange={(event) => set({ sceneId: event.target.value || null })}
        />
        <p className="font-body text-[0.75rem] leading-5 text-muted">
          Thông số camera, ánh sáng và waypoint được chỉnh ở{' '}
          <Link href="/admin/3d-assets" className="border-b border-accent text-accent">
            3D Assets
          </Link>
          .
        </p>
      </Section>
      <Section title="Khung hiển thị">
        <FormGrid>
          <AdminSelectField
            label="Chiều cao"
            value={block.data.height ?? 'tall'}
            options={SCENE_HEIGHT_OPTIONS}
            onChange={(event) =>
              set({ height: pickOne(event.target.value, ['tall', 'screen'] as const, 'tall') })
            }
          />
          <AdminField
            label="Nhãn gợi ý"
            hint="Chữ nhỏ mời khách tương tác."
            value={block.data.label ?? ''}
            maxLength={120}
            onChange={(event) => set({ label: event.target.value })}
          />
        </FormGrid>
      </Section>
    </>
  )
}

/* ---------------------------------- IMAGE ---------------------------------- */

function ImageEditor({ block, onChange, ctx }: EditorProps<'IMAGE'>) {
  const set = (data: Partial<BlockDataOf<'IMAGE'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Ảnh">
        <MediaSlot
          label="Tấm ảnh"
          value={block.data.mediaId}
          index={ctx.media}
          projectId={ctx.projectId}
          onResolved={ctx.onMediaResolved}
          onChange={(mediaId) => set({ mediaId })}
        />
        <AdminField
          label="Chú thích"
          hint="Hiện dưới ảnh ở cỡ chữ nhãn."
          value={block.data.caption ?? ''}
          maxLength={240}
          onChange={(event) => set({ caption: event.target.value })}
        />
      </Section>
      <Section title="Trình bày">
        <FormGrid>
          <AdminSelectField
            label="Bề rộng"
            value={block.data.width ?? 'wide'}
            options={IMAGE_WIDTH_OPTIONS}
            onChange={(event) =>
              set({ width: pickOne(event.target.value, ['full', 'wide', 'narrow'] as const, 'wide') })
            }
          />
          <AdminSelectField
            label="Kiểu xuất hiện"
            value={block.data.reveal ?? 'revealClip'}
            options={REVEAL_OPTIONS}
            onChange={(event) => set({ reveal: parseReveal(event.target.value) })}
          />
        </FormGrid>
      </Section>
    </>
  )
}

/* --------------------------------- GALLERY --------------------------------- */

function GalleryEditor({ block, onChange, ctx }: EditorProps<'GALLERY'>) {
  const set = (data: Partial<BlockDataOf<'GALLERY'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Ảnh">
        <MediaSlotList
          label="Bộ ảnh"
          hint="Kéo tay cầm để đổi thứ tự — hoặc dùng phím mũi tên khi tay cầm đang được chọn."
          value={block.data.mediaIds}
          index={ctx.media}
          projectId={ctx.projectId}
          onResolved={ctx.onMediaResolved}
          onChange={(mediaIds) => set({ mediaIds })}
        />
      </Section>
      <Section title="Trình bày">
        <FormGrid>
          <AdminSelectField
            label="Số cột"
            value={String(block.data.columns ?? 2)}
            options={COLUMN_OPTIONS}
            onChange={(event) => set({ columns: parseColumns(event.target.value, 2) })}
          />
          <AdminField
            label="Chú thích chung"
            value={block.data.caption ?? ''}
            maxLength={240}
            onChange={(event) => set({ caption: event.target.value })}
          />
        </FormGrid>
      </Section>
    </>
  )
}

/* --------------------------------- MASONRY --------------------------------- */

function MasonryEditor({ block, onChange, ctx }: EditorProps<'MASONRY'>) {
  const set = (data: Partial<BlockDataOf<'MASONRY'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Ảnh">
        <MediaSlotList
          label="Bộ ảnh so le"
          hint="Hợp nhất khi trộn ảnh dọc và ảnh ngang."
          value={block.data.mediaIds}
          index={ctx.media}
          projectId={ctx.projectId}
          onResolved={ctx.onMediaResolved}
          onChange={(mediaIds) => set({ mediaIds })}
        />
      </Section>
      <Section title="Trình bày">
        <AdminSelectField
          label="Số cột"
          value={String(block.data.columns ?? 3)}
          options={COLUMN_OPTIONS}
          onChange={(event) => set({ columns: parseColumns(event.target.value, 3) })}
        />
      </Section>
    </>
  )
}

/* ---------------------------------- VIDEO ---------------------------------- */

function VideoEditor({ block, onChange, ctx }: EditorProps<'VIDEO'>) {
  const set = (data: Partial<BlockDataOf<'VIDEO'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  // `poster` is either a media id or a bare URL. Split the two so neither
  // control ever fights the other for the same value while the editor types.
  const poster = block.data.poster ?? null
  const posterIsMedia = poster !== null && isUuid(poster)

  return (
    <>
      <Section title="Tệp video">
        <MediaSlot
          label="Video"
          kind="video"
          value={block.data.mediaId}
          index={ctx.media}
          projectId={ctx.projectId}
          onResolved={ctx.onMediaResolved}
          onChange={(mediaId) => set({ mediaId })}
          emptyLabel="Chưa chọn video."
          dialogTitle="Chọn video"
        />
        <AdminField
          label="Chú thích"
          value={block.data.caption ?? ''}
          maxLength={240}
          onChange={(event) => set({ caption: event.target.value })}
        />
        <AdminCheckbox
          label="Phát lặp"
          hint="Video nền thường để lặp và tắt tiếng."
          checked={block.data.loop ?? true}
          onChange={(event) => set({ loop: event.target.checked })}
        />
      </Section>
      <Section title="Ảnh chờ">
        <MediaSlot
          label="Ảnh chờ từ thư viện"
          hint="Khung hình hiện trước khi video chạy."
          value={posterIsMedia ? poster : null}
          index={ctx.media}
          projectId={ctx.projectId}
          onResolved={ctx.onMediaResolved}
          onChange={(mediaId) => set({ poster: mediaId })}
          emptyLabel={poster ? 'Đang dùng đường dẫn bên dưới.' : 'Chưa chọn ảnh chờ.'}
        />
        <AdminField
          label="Hoặc đường dẫn ảnh chờ"
          hint="Bắt đầu bằng “/” hoặc “https://”. Điền vào đây sẽ thay cho tệp ở trên."
          value={posterIsMedia ? '' : (poster ?? '')}
          maxLength={300}
          placeholder="/media/…"
          onChange={(event) => {
            const next = event.target.value.trim()
            set({ poster: next.length > 0 ? next : null })
          }}
        />
      </Section>
    </>
  )
}

/* ----------------------------------- TEXT ---------------------------------- */

function TextEditor({ block, onChange }: EditorProps<'TEXT'>) {
  const set = (data: Partial<BlockDataOf<'TEXT'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Nội dung">
        <AdminField
          label="Tiêu đề phụ"
          value={block.data.heading ?? ''}
          maxLength={200}
          onChange={(event) => set({ heading: event.target.value })}
        />
        <AdminTextareaField
          label="Đoạn văn"
          hint="Để một dòng trống giữa hai đoạn."
          rows={12}
          maxLength={12000}
          value={block.data.body}
          onChange={(event) => set({ body: event.target.value })}
        />
      </Section>
      <Section title="Trình bày">
        <FormGrid>
          <AdminSelectField
            label="Canh chữ"
            value={block.data.align ?? 'left'}
            options={ALIGN_OPTIONS}
            onChange={(event) =>
              set({ align: pickOne(event.target.value, ['left', 'center'] as const, 'left') })
            }
          />
          <AdminSelectField
            label="Bề rộng cột chữ"
            value={block.data.width ?? 'narrow'}
            options={TEXT_WIDTH_OPTIONS}
            onChange={(event) =>
              set({ width: pickOne(event.target.value, ['narrow', 'wide'] as const, 'narrow') })
            }
          />
        </FormGrid>
      </Section>
    </>
  )
}

/* ---------------------------------- QUOTE ---------------------------------- */

function QuoteEditor({ block, onChange }: EditorProps<'QUOTE'>) {
  const set = (data: Partial<BlockDataOf<'QUOTE'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <Section title="Câu trích">
      <AdminTextareaField
        label="Nội dung trích"
        hint="Một đến ba câu. Dấu ngoặc kép do trang tự thêm."
        rows={5}
        maxLength={1200}
        value={block.data.quote}
        onChange={(event) => set({ quote: event.target.value })}
      />
      <AdminField
        label="Người nói"
        hint="Tên và vai trò, ví dụ “Chủ nhà, Thảo Điền”."
        value={block.data.attribution ?? ''}
        maxLength={160}
        onChange={(event) => set({ attribution: event.target.value })}
      />
    </Section>
  )
}

/* -------------------------------- MATERIALS -------------------------------- */

function MaterialsEditor({ block, onChange, ctx }: EditorProps<'MATERIALS'>) {
  const set = (data: Partial<BlockDataOf<'MATERIALS'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Tiêu đề">
        <AdminField
          label="Tiêu đề bảng vật liệu"
          value={block.data.heading ?? ''}
          maxLength={200}
          placeholder="Bảng vật liệu"
          onChange={(event) => set({ heading: event.target.value })}
        />
      </Section>
      <Section title="Vật liệu">
        <OptionPickList
          label="Danh sách vật liệu"
          hint="Lấy từ thư viện vật liệu chung; thứ tự ở đây là thứ tự hiển thị."
          value={block.data.materialIds}
          max={24}
          options={ctx.materials.map((material) => ({
            value: material.id,
            label: material.name,
            note: material.enabled ? undefined : 'đang tắt',
          }))}
          onChange={(materialIds) => set({ materialIds })}
          addLabel="Thêm vật liệu"
          emptyLabel="Chưa chọn vật liệu nào — khối này sẽ không hiện."
          noOptionsLabel="Thư viện vật liệu đang trống."
        />
      </Section>
    </>
  )
}

/* ------------------------------- BEFORE_AFTER ------------------------------- */

function BeforeAfterEditor({ block, onChange, ctx }: EditorProps<'BEFORE_AFTER'>) {
  const set = (data: Partial<BlockDataOf<'BEFORE_AFTER'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Cặp ảnh">
        <MediaSlot
          label="Ảnh trước"
          value={block.data.beforeMediaId}
          index={ctx.media}
          projectId={ctx.projectId}
          onResolved={ctx.onMediaResolved}
          onChange={(beforeMediaId) => set({ beforeMediaId })}
        />
        <MediaSlot
          label="Ảnh sau"
          hint="Nên cùng khung hình và cùng tiêu cự với ảnh trước."
          value={block.data.afterMediaId}
          index={ctx.media}
          projectId={ctx.projectId}
          onResolved={ctx.onMediaResolved}
          onChange={(afterMediaId) => set({ afterMediaId })}
        />
      </Section>
      <Section title="Nhãn">
        <AdminField
          label="Nhãn khối"
          value={block.data.label ?? ''}
          maxLength={160}
          placeholder="Trước & sau"
          onChange={(event) => set({ label: event.target.value })}
        />
      </Section>
    </>
  )
}

/* ------------------------------- PROJECT_INFO ------------------------------- */

function ProjectInfoEditor({ block, onChange }: EditorProps<'PROJECT_INFO'>) {
  const set = (data: Partial<BlockDataOf<'PROJECT_INFO'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <Section title="Bảng thông số">
      <p className="font-body text-[0.8125rem] leading-6 text-muted">
        Khối này đọc thẳng các trường ở tab <span className="text-ink">Nội dung</span> — địa điểm, diện tích,
        năm, phong cách, khách hàng, thời gian. Sửa ở đó, không sửa ở đây.
      </p>
      <AdminCheckbox
        label="Kèm danh sách hạng mục dịch vụ"
        hint="Các mục trong trường “Hạng mục”."
        checked={block.data.showServices ?? true}
        onChange={(event) => set({ showServices: event.target.checked })}
      />
      <AdminTextareaField
        label="Ghi chú thêm"
        hint="Một câu ngắn dưới bảng, ví dụ nguồn ảnh hoặc đơn vị thi công."
        rows={3}
        maxLength={400}
        value={block.data.note ?? ''}
        onChange={(event) => set({ note: event.target.value })}
      />
    </Section>
  )
}

/* --------------------------------- RELATED --------------------------------- */

const STATUS_NOTE: Record<SiblingProjectOption['status'], string | undefined> = {
  published: undefined,
  draft: 'nháp',
  archived: 'lưu trữ',
}

function RelatedEditor({ block, onChange, ctx }: EditorProps<'RELATED'>) {
  const set = (data: Partial<BlockDataOf<'RELATED'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Tiêu đề">
        <AdminField
          label="Tiêu đề khối"
          value={block.data.heading ?? ''}
          maxLength={200}
          placeholder="Dự án khác"
          onChange={(event) => set({ heading: event.target.value })}
        />
      </Section>
      <Section title="Dự án">
        <OptionPickList
          label="Dự án hiển thị"
          hint="Bỏ trống thì trang tự chọn ba dự án cùng danh mục. Dự án chưa xuất bản sẽ không hiện với khách."
          value={block.data.projectIds}
          max={12}
          options={ctx.projects.map((project) => ({
            value: project.id,
            label: project.title,
            note: STATUS_NOTE[project.status],
          }))}
          onChange={(projectIds) => set({ projectIds })}
          addLabel="Thêm dự án"
          emptyLabel="Đang để hệ thống tự chọn."
          noOptionsLabel="Chưa có dự án nào khác."
        />
      </Section>
    </>
  )
}

/* ----------------------------------- CTA ----------------------------------- */

function CtaEditor({ block, onChange }: EditorProps<'CTA'>) {
  const set = (data: Partial<BlockDataOf<'CTA'>>): void =>
    onChange({ ...block, data: { ...block.data, ...data } })

  return (
    <>
      <Section title="Nội dung">
        <AdminField
          label="Tiêu đề"
          value={block.data.heading ?? ''}
          maxLength={200}
          placeholder="Bắt đầu không gian của bạn"
          onChange={(event) => set({ heading: event.target.value })}
        />
        <AdminTextareaField
          label="Đoạn mời"
          rows={3}
          maxLength={600}
          value={block.data.body ?? ''}
          onChange={(event) => set({ body: event.target.value })}
        />
      </Section>
      <Section title="Nút">
        <FormGrid>
          <AdminField
            label="Nhãn nút"
            value={block.data.buttonLabel ?? ''}
            maxLength={80}
            placeholder="Liên hệ studio"
            onChange={(event) => set({ buttonLabel: event.target.value })}
          />
          <AdminField
            label="Đường dẫn"
            hint="“/contact” hoặc một địa chỉ đầy đủ."
            value={block.data.href ?? ''}
            maxLength={300}
            placeholder="/contact"
            onChange={(event) => set({ href: event.target.value })}
          />
        </FormGrid>
      </Section>
    </>
  )
}

/* -------------------------------- the switch -------------------------------- */

export interface BlockInspectorProps {
  block: BlockDraft
  position: number
  total: number
  onChange: (next: BlockDraft) => void
  ctx: InspectorContext
  /** Message from `saveBlocks` for this block index. */
  error?: string | null
}

function body(block: BlockDraft, onChange: (next: BlockDraft) => void, ctx: InspectorContext): ReactNode {
  switch (block.type) {
    case 'HERO':
      return <HeroEditor block={block} onChange={onChange} ctx={ctx} />
    case 'SCENE_3D':
      return <SceneEditor block={block} onChange={onChange} ctx={ctx} />
    case 'IMAGE':
      return <ImageEditor block={block} onChange={onChange} ctx={ctx} />
    case 'GALLERY':
      return <GalleryEditor block={block} onChange={onChange} ctx={ctx} />
    case 'MASONRY':
      return <MasonryEditor block={block} onChange={onChange} ctx={ctx} />
    case 'VIDEO':
      return <VideoEditor block={block} onChange={onChange} ctx={ctx} />
    case 'TEXT':
      return <TextEditor block={block} onChange={onChange} ctx={ctx} />
    case 'QUOTE':
      return <QuoteEditor block={block} onChange={onChange} ctx={ctx} />
    case 'MATERIALS':
      return <MaterialsEditor block={block} onChange={onChange} ctx={ctx} />
    case 'BEFORE_AFTER':
      return <BeforeAfterEditor block={block} onChange={onChange} ctx={ctx} />
    case 'PROJECT_INFO':
      return <ProjectInfoEditor block={block} onChange={onChange} ctx={ctx} />
    case 'RELATED':
      return <RelatedEditor block={block} onChange={onChange} ctx={ctx} />
    case 'CTA':
      return <CtaEditor block={block} onChange={onChange} ctx={ctx} />
  }
}

export function BlockInspector({ block, position, total, onChange, ctx, error }: BlockInspectorProps) {
  const meta = blockMeta(block.type)

  return (
    <div className="flex flex-col">
      <header className="flex flex-col gap-3 border-b border-line px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="u-label text-accent">
              {meta.en} · khối {position + 1}/{total}
            </span>
            <h2 className="mt-2 font-display text-[1.5rem] font-normal leading-none text-ink">{meta.label}</h2>
          </div>
          {block.enabled ? null : <StatusPill tone="muted">Đang ẩn</StatusPill>}
        </div>
        <p className="font-body text-[0.75rem] leading-5 text-muted">{meta.note}</p>
        {error ? (
          <p role="alert" className="border-l border-accent pl-3 font-body text-[0.75rem] leading-5 text-accent">
            {error}
          </p>
        ) : null}
      </header>

      <div className="flex flex-col gap-6 px-5 py-6">{body(block, onChange, ctx)}</div>
    </div>
  )
}

/* ------------------------------- empty state ------------------------------- */

export function InspectorPlaceholder({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-start gap-4 px-5 py-8">
      <span className="u-label text-muted">Inspector</span>
      <p className="font-body text-[0.8125rem] leading-6 text-muted">
        Chọn một khối bên trái để sửa nội dung của nó. Mỗi khối là một đoạn của trang dự án — thứ tự ở đây
        chính là thứ tự khách nhìn thấy.
      </p>
      <button type="button" onClick={onAdd} className={adminButtonClass('outline')}>
        Thêm khối chữ
      </button>
    </div>
  )
}
