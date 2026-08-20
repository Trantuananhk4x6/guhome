'use client'

/**
 * `/admin/projects/[id]` — the project editor.
 *
 * Four tabs over one draft: the project row (NỘI DUNG), the page composition
 * (TRANG DỰ ÁN), the attached media (THƯ VIỆN) and the 3D wiring (3D). The first
 * two are staged locally and written by the single SaveBar at the bottom —
 * `updateProject` for the row, `saveBlocks` for the composition — so an editor
 * can rearrange a whole page and still walk away from it. The last two write
 * immediately, because attaching a photograph or creating a scene is a fact
 * about the library, not a draft of the page.
 */

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { ChevronRightIcon, DuplicateIcon, TrashIcon } from '@/components/admin/AdminIcons'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { SaveBar } from '@/components/admin/SaveBar'
import { PublishStatusPill, StatusPill } from '@/components/admin/StatusPill'
import { formatTimestamp } from '@/components/admin/media/format'
import { AdminPanel } from '@/components/admin/site/Fields'
import { useActionRunner, useEditorDraft } from '@/components/admin/site/useEditorState'
import { cn } from '@/lib/utils'
import {
  deleteProject,
  duplicateProject,
  saveBlocks,
  updateProject,
} from '@/server/actions/projects'
import type { MediaRef, ProjectBlock, ProjectBlockType, SceneConfig } from '@/types/content'

import { BlockCanvas } from './BlockCanvas'
import { BlockInspector, InspectorPlaceholder, type InspectorContext } from './BlockInspector'
import { ProjectFields } from './ProjectFields'
import { ProjectGallery } from './ProjectGallery'
import { ProjectScene } from './ProjectScene'
import {
  createBlock,
  defaultBlockDrafts,
  duplicateBlock,
  toBlockDrafts,
  toBlockPayload,
  toProjectDraft,
  type BlockDraft,
  type BlockPreviewContext,
  type CategoryOption,
  type MaterialOption,
  type ProjectDraft,
  type ProjectEditorSnapshot,
  type SceneOption,
  type SiblingProjectOption,
} from './contracts'

/* ---------------------------------- tabs ----------------------------------- */

type TabKey = 'content' | 'page' | 'media' | 'scene'

interface TabMeta {
  key: TabKey
  label: string
  en: string
}

const TABS: readonly TabMeta[] = [
  { key: 'content', label: 'Nội dung', en: 'Content' },
  { key: 'page', label: 'Trang dự án', en: 'Page' },
  { key: 'media', label: 'Thư viện', en: 'Media' },
  { key: 'scene', label: '3D', en: 'Scene' },
]

/* ---------------------------------- props ---------------------------------- */

export interface ProjectEditorProps {
  snapshot: ProjectEditorSnapshot
  blocks: readonly ProjectBlock[]
  mediaIndex: Readonly<Record<string, MediaRef>>
  gallery: readonly MediaRef[]
  categories: readonly CategoryOption[]
  materials: readonly MaterialOption[]
  siblings: readonly SiblingProjectOption[]
  scenes: readonly SceneOption[]
  /** Full configs for the scenes attached to this project. */
  sceneConfigs: readonly SceneConfig[]
}

/* --------------------------------- helpers --------------------------------- */

/** Splits `saveBlocks`' `blocks.<index>` keys out of the shared field errors. */
function blockErrorsOf(fieldErrors: Readonly<Record<string, string>>): Record<number, string> {
  const out: Record<number, string> = {}
  for (const [key, message] of Object.entries(fieldErrors)) {
    const match = /^blocks\.(\d+)/.exec(key)
    if (!match?.[1]) continue
    const index = Number.parseInt(match[1], 10)
    if (Number.isInteger(index)) out[index] = message
  }
  return out
}

/* --------------------------------- editor ---------------------------------- */

export function ProjectEditor({
  snapshot,
  blocks: initialBlocks,
  mediaIndex,
  gallery,
  categories,
  materials,
  siblings,
  scenes,
  sceneConfigs,
}: ProjectEditorProps) {
  const router = useRouter()

  const fields = useEditorDraft<ProjectDraft>(toProjectDraft(snapshot))
  const blocks = useEditorDraft<BlockDraft[]>(toBlockDrafts(initialBlocks))
  const runner = useActionRunner()

  const [tab, setTab] = useState<TabKey>('content')
  const [selectedKey, setSelectedKey] = useState<string | null>(blocks.value[0]?.key ?? null)
  const [media, setMedia] = useState<Record<string, MediaRef>>({ ...mediaIndex })
  const [slug, setSlug] = useState(snapshot.slug)
  const [leaveTo, setLeaveTo] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [dangerError, setDangerError] = useState<string | null>(null)
  const [dangerPending, startDanger] = useTransition()

  const savedSlug = useRef<string | null>(null)
  const dirty = fields.dirty || blocks.dirty

  /* ------------------------------ unsaved guard ----------------------------- */

  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (event: BeforeUnloadEvent): void => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  /**
   * `beforeunload` only covers real page loads. Client-side navigation — the
   * sidebar, any `next/link` on the screen — is caught here instead: a plain
   * left click on an internal link is turned into the same confirm dialog.
   */
  useEffect(() => {
    if (!dirty) return
    const onClick = (event: MouseEvent): void => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || href === window.location.pathname) return
      event.preventDefault()
      setLeaveTo(href)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [dirty])

  const leave = useCallback(
    (href: string): void => {
      if (dirty) {
        setLeaveTo(href)
        return
      }
      router.push(href)
    },
    [dirty, router],
  )

  /* -------------------------------- media index ------------------------------ */

  const mergeMedia = useCallback((items: readonly MediaRef[]): void => {
    setMedia((current) => {
      let changed = false
      const next = { ...current }
      for (const item of items) {
        if (next[item.id]) continue
        next[item.id] = item
        changed = true
      }
      return changed ? next : current
    })
  }, [])

  /* ---------------------------------- blocks -------------------------------- */

  const list = blocks.value
  const selectedIndex = list.findIndex((block) => block.key === selectedKey)
  const selected = selectedIndex >= 0 ? list[selectedIndex] : undefined

  const replaceBlock = useCallback(
    (next: BlockDraft): void => {
      blocks.set((current) => current.map((block) => (block.key === next.key ? next : block)))
    },
    [blocks],
  )

  const toggleBlock = useCallback(
    (key: string): void => {
      blocks.set((current) =>
        current.map((block) => (block.key === key ? { ...block, enabled: !block.enabled } : block)),
      )
    },
    [blocks],
  )

  /** Inserts `block` right after `index`, or at the end when there is no anchor. */
  const insertAfter = useCallback(
    (index: number, block: BlockDraft): void => {
      blocks.set(index < 0 ? [...list, block] : [...list.slice(0, index + 1), block, ...list.slice(index + 1)])
      setSelectedKey(block.key)
    },
    [blocks, list],
  )

  const copyBlock = useCallback(
    (key: string): void => {
      const index = list.findIndex((block) => block.key === key)
      const source = index >= 0 ? list[index] : undefined
      if (!source) return
      insertAfter(index, duplicateBlock(source))
    },
    [insertAfter, list],
  )

  const removeBlock = useCallback(
    (key: string): void => {
      const index = list.findIndex((block) => block.key === key)
      if (index < 0) return
      const next = list.filter((block) => block.key !== key)
      blocks.set(next)
      setSelectedKey(next[Math.min(index, next.length - 1)]?.key ?? null)
    },
    [blocks, list],
  )

  const addBlock = useCallback(
    (type: ProjectBlockType): void => {
      insertAfter(
        list.findIndex((entry) => entry.key === selectedKey),
        createBlock(type),
      )
    },
    [insertAfter, list, selectedKey],
  )

  const seedDefault = useCallback((): void => {
    const seeded = defaultBlockDrafts({
      coverMediaId: fields.value.coverMediaId,
      description: fields.value.description,
      galleryIds: gallery.map((item) => item.id),
      sceneId: sceneConfigs[0]?.id ?? null,
    })
    blocks.set(seeded)
    setSelectedKey(seeded[0]?.key ?? null)
  }, [blocks, fields.value.coverMediaId, fields.value.description, gallery, sceneConfigs])

  /* -------------------------------- contexts -------------------------------- */

  const projectSceneName = useMemo(() => {
    const first = sceneConfigs[0]
    if (!first) return null
    return scenes.find((scene) => scene.id === first.id)?.label ?? 'Cảnh của dự án'
  }, [sceneConfigs, scenes])

  const preview: BlockPreviewContext = useMemo(
    () => ({
      media,
      materialNames: Object.fromEntries(materials.map((material) => [material.id, material.name])),
      projectTitles: Object.fromEntries(siblings.map((project) => [project.id, project.title])),
      sceneNames: Object.fromEntries(scenes.map((scene) => [scene.id, scene.label])),
      projectCoverId: fields.value.coverMediaId,
      projectSceneName,
    }),
    [media, materials, siblings, scenes, fields.value.coverMediaId, projectSceneName],
  )

  const inspectorCtx: InspectorContext = useMemo(
    () => ({
      projectId: snapshot.id,
      media,
      onMediaResolved: mergeMedia,
      materials,
      projects: siblings,
      scenes,
      projectCoverName: fields.value.coverMediaId
        ? (media[fields.value.coverMediaId]?.alt ?? 'ảnh bìa hiện tại')
        : null,
      projectSceneName,
    }),
    [snapshot.id, media, mergeMedia, materials, siblings, scenes, fields.value.coverMediaId, projectSceneName],
  )

  const blockErrors = useMemo(() => blockErrorsOf(runner.fieldErrors), [runner.fieldErrors])

  /* ----------------------------------- save --------------------------------- */

  const save = useCallback(
    (andView = false): void => {
      savedSlug.current = null
      const draft = fields.value
      const composition = blocks.value
      const fieldsDirty = fields.dirty
      const blocksDirty = blocks.dirty

      // Nothing staged: never write a revision just because the button was hit.
      if (!fieldsDirty && !blocksDirty) {
        if (andView) window.open(`/projects/${slug}`, '_blank', 'noopener,noreferrer')
        return
      }

      runner.run(
        async () => {
          if (fieldsDirty) {
            const result = await updateProject({ id: snapshot.id, ...draft })
            if (!result.ok) return result
            savedSlug.current = result.data.slug
          }
          if (blocksDirty) {
            const result = await saveBlocks({
              projectId: snapshot.id,
              blocks: toBlockPayload(composition),
            })
            if (!result.ok) return result
          }
          return { ok: true }
        },
        {
          success: 'Đã lưu dự án.',
          onSuccess: () => {
            const nextSlug = savedSlug.current
            if (nextSlug) setSlug(nextSlug)
            fields.commit(nextSlug ? { ...draft, slug: nextSlug } : draft)
            blocks.commit(composition)
            router.refresh()
            if (andView) {
              window.open(`/projects/${nextSlug ?? slug}`, '_blank', 'noopener,noreferrer')
            }
          },
        },
      )
    },
    [blocks, fields, router, runner, slug, snapshot.id],
  )

  /* --------------------------------- danger --------------------------------- */

  function duplicate(): void {
    setDangerError(null)
    startDanger(async () => {
      const result = await duplicateProject({ id: snapshot.id })
      if (!result.ok) {
        setDangerError(result.error)
        return
      }
      router.push(`/admin/projects/${result.data.id}`)
    })
  }

  function destroy(): void {
    setDangerError(null)
    startDanger(async () => {
      const result = await deleteProject({ id: snapshot.id })
      if (!result.ok) {
        setDangerError(result.error)
        return
      }
      router.push('/admin/projects')
    })
  }

  /* ---------------------------------- render -------------------------------- */

  return (
    <div className="flex flex-col gap-8">
      {/* meta strip */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={() => leave('/admin/projects')}
            className="u-label inline-flex items-center gap-2 text-muted transition-colors duration-200 hover:text-ink"
          >
            Dự án
            <ChevronRightIcon className="text-sm" />
          </button>
          <PublishStatusPill status={fields.value.status} />
          {fields.value.featured ? <StatusPill tone="accent">Nổi bật</StatusPill> : null}
          <span className="font-body text-[0.75rem] leading-5 text-muted">/projects/{slug}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="u-label text-[0.5625rem] text-muted">
            Sửa lần cuối {formatTimestamp(snapshot.updatedAt)}
          </span>
          <span className="u-label text-[0.5625rem] text-muted">{snapshot.viewCount} lượt xem</span>
          <Link
            href={`/projects/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className={adminButtonClass('outline')}
          >
            Xem trang công khai
          </Link>
        </div>
      </div>

      {/* tabs */}
      <nav aria-label="Khu vực chỉnh sửa" className="flex flex-wrap items-center gap-px bg-line">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            aria-current={tab === item.key ? 'page' : undefined}
            className={cn(
              'u-label flex items-baseline gap-2 px-5 py-3 transition-colors duration-300 ease-editorial',
              tab === item.key ? 'bg-ink text-canvas' : 'bg-canvas text-muted hover:text-ink',
            )}
          >
            {item.label}
            <span className={cn('text-[0.5625rem]', tab === item.key ? 'text-canvas/50' : 'text-muted/60')}>
              {item.en}
            </span>
          </button>
        ))}
        <span className="ml-auto hidden items-center gap-3 bg-canvas px-4 py-3 sm:flex">
          <span className="u-label text-[0.5625rem] text-muted">{list.length} khối</span>
        </span>
      </nav>

      {/* panes */}
      {tab === 'content' ? (
        <div className="flex flex-col gap-8 pb-4">
          <ProjectFields
            value={fields.value}
            onChange={(patch) => fields.set((current) => ({ ...current, ...patch }))}
            categories={categories}
            media={media}
            onMediaResolved={mergeMedia}
            fieldErrors={runner.fieldErrors}
          />

          <AdminPanel
            eyebrow="Danger"
            title="Nhân bản & xoá"
            description="Nhân bản tạo một bản nháp mới với đầy đủ khối và media. Xoá là vĩnh viễn."
          >
            <div className="flex flex-col gap-4">
              {dangerError ? (
                <p role="alert" className="border-l border-accent pl-3 font-body text-[0.8125rem] text-accent">
                  {dangerError}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={duplicate}
                  disabled={dangerPending}
                  className={adminButtonClass('outline')}
                >
                  <DuplicateIcon className="text-sm" />
                  Nhân bản dự án
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  disabled={dangerPending}
                  className={adminButtonClass('danger')}
                >
                  <TrashIcon className="text-sm" />
                  Xoá dự án
                </button>
              </div>
            </div>
          </AdminPanel>
        </div>
      ) : null}

      {tab === 'page' ? (
        <div className="grid gap-6 pb-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-start">
          <BlockCanvas
            blocks={list}
            selectedKey={selectedKey}
            preview={preview}
            blockErrors={blockErrors}
            onSelect={setSelectedKey}
            onReorder={(next) => blocks.set(next)}
            onToggle={toggleBlock}
            onDuplicate={copyBlock}
            onDelete={removeBlock}
            onAdd={addBlock}
            onSeedDefault={seedDefault}
          />

          <aside className="lg:sticky lg:top-[4.5rem]">
            <div className="max-h-[calc(100dvh-11rem)] overflow-y-auto border border-line bg-canvas">
              {selected ? (
                <BlockInspector
                  key={selected.key}
                  block={selected}
                  position={selectedIndex}
                  total={list.length}
                  onChange={replaceBlock}
                  ctx={inspectorCtx}
                  error={blockErrors[selectedIndex] ?? null}
                />
              ) : (
                <InspectorPlaceholder onAdd={() => addBlock('TEXT')} />
              )}
            </div>
          </aside>
        </div>
      ) : null}

      {tab === 'media' ? (
        <div className="pb-4">
          <ProjectGallery
            projectId={snapshot.id}
            initial={gallery}
            coverMediaId={fields.value.coverMediaId}
            onResolved={mergeMedia}
            onSetCover={(mediaId) => fields.set((current) => ({ ...current, coverMediaId: mediaId }))}
          />
        </div>
      ) : null}

      {tab === 'scene' ? (
        <div className="pb-4">
          <ProjectScene
            projectId={snapshot.id}
            projectTitle={fields.value.title}
            configs={sceneConfigs}
            options={scenes}
          />
        </div>
      ) : null}

      <SaveBar
        dirty={dirty}
        saving={runner.pending}
        error={runner.error}
        message={runner.message}
        onSave={() => save(false)}
        onReset={() => {
          fields.reset()
          blocks.reset()
          runner.clear()
        }}
        onSaveAndView={() => save(true)}
        saveLabel="Lưu dự án"
      >
        <span className="u-label text-[0.5625rem] text-muted">
          {[fields.dirty ? 'Nội dung' : null, blocks.dirty ? 'Bố cục' : null, `${list.length} khối`]
            .filter((part): part is string => part !== null)
            .join(' · ')}
        </span>
      </SaveBar>

      <ConfirmDialog
        open={leaveTo !== null}
        title="Rời khỏi trang khi chưa lưu?"
        description="Những thay đổi ở tab Nội dung và Trang dự án sẽ mất. Media và cảnh 3D đã được lưu sẵn."
        confirmLabel="Rời đi"
        cancelLabel="Ở lại"
        tone="danger"
        onCancel={() => setLeaveTo(null)}
        onConfirm={() => {
          const href = leaveTo
          setLeaveTo(null)
          if (href) router.push(href)
        }}
      />

      <ConfirmDialog
        open={confirmDelete}
        tone="danger"
        title="Xoá dự án này?"
        description={`“${snapshot.title}” cùng mọi khối và liên kết media sẽ bị xoá vĩnh viễn. Ảnh vẫn còn trong thư viện chung.`}
        confirmLabel="Xoá vĩnh viễn"
        pending={dangerPending}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          setConfirmDelete(false)
          destroy()
        }}
      />
    </div>
  )
}
