'use client'

/**
 * Tab 3D — which scene this project is wired to, and in what mode.
 *
 * Deliberately thin: camera waypoints, environment, exposure and the live
 * preview all live in `/admin/3d-assets`, and duplicating that editor here would
 * mean two places to keep in step. What belongs to the project is the wiring —
 * does a scene exist, what mode does it run in — so that is all this panel owns.
 */

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { CubeIcon, PlusIcon } from '@/components/admin/AdminIcons'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { MediaThumb } from '@/components/admin/MediaThumb'
import { StatusPill } from '@/components/admin/StatusPill'
import { ActionMessage, AdminPanel } from '@/components/admin/site/Fields'
import { AdminSelect, FormRow } from '@/components/admin/FormRow'
import { SCENE_MODES, SCENE_MODE_LABELS } from '@/components/admin/media/types'
import { createScene, deleteScene, updateScene, type UpdateSceneInput } from '@/server/actions/scenes'
import type { SceneConfig, SceneMode } from '@/types/content'

import type { SceneOption } from './contracts'

const MODE_CHOICES = SCENE_MODES.map((mode) => ({ value: mode, label: SCENE_MODE_LABELS[mode] }))

/** Rebuilds the whole `updateScene` payload from a config — the action takes no patch. */
function toUpdateInput(config: SceneConfig, name: string | null, mode: SceneMode): UpdateSceneInput {
  return {
    id: config.id,
    projectId: config.projectId,
    name,
    mode,
    modelMediaId: config.model?.id ?? null,
    sourceMediaId: config.sourceImage?.id ?? null,
    depthMediaId: config.depthMap?.id ?? null,
    envPreset: config.envPreset,
    envIntensity: config.envIntensity,
    exposure: config.exposure,
    fov: config.fov,
    shadows: config.shadows,
    autoExplore: config.autoExplore,
    animationSpeed: config.animationSpeed,
    scrollSensitivity: config.scrollSensitivity,
    waypoints: config.waypoints,
    settings: config.settings,
  }
}

export interface ProjectSceneProps {
  projectId: string
  projectTitle: string
  /** Scenes belonging to this project, with their full config. */
  configs: readonly SceneConfig[]
  /** Every scene in the CMS — used for labels and for the "elsewhere" count. */
  options: readonly SceneOption[]
}

export function ProjectScene({ projectId, projectTitle, configs, options }: ProjectSceneProps) {
  const router = useRouter()
  const [modes, setModes] = useState<Record<string, SceneMode>>(() =>
    Object.fromEntries(configs.map((config) => [config.id, config.mode])),
  )
  const [newMode, setNewMode] = useState<SceneMode>('DEPTH_2_5D')
  const [pendingDelete, setPendingDelete] = useState<SceneConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const labels = new Map(options.map((option) => [option.id, option]))
  const elsewhere = options.filter((option) => option.projectId !== projectId).length

  function create(): void {
    setError(null)
    setMessage(null)
    startTransition(async () => {
      const result = await createScene({ projectId, mode: newMode, name: projectTitle })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setMessage('Đã tạo cảnh. Mở 3D Assets để nạp ảnh nguồn và đặt camera.')
      router.refresh()
    })
  }

  function changeMode(config: SceneConfig, mode: SceneMode): void {
    setError(null)
    setMessage(null)
    const previous = modes[config.id] ?? config.mode
    setModes((current) => ({ ...current, [config.id]: mode }))
    startTransition(async () => {
      const option = labels.get(config.id)
      const result = await updateScene(toUpdateInput(config, option?.name ?? null, mode))
      if (!result.ok) {
        setModes((current) => ({ ...current, [config.id]: previous }))
        setError(result.error)
        return
      }
      setMessage(`Đã chuyển chế độ sang ${SCENE_MODE_LABELS[mode]}.`)
      router.refresh()
    })
  }

  function remove(config: SceneConfig): void {
    setError(null)
    setMessage(null)
    startTransition(async () => {
      const result = await deleteScene(config.id)
      if (!result.ok) {
        setError(result.error)
        return
      }
      setMessage('Đã xoá cảnh.')
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPanel
        eyebrow="Scenes"
        title="Cảnh ba chiều của dự án"
        description="Trang dự án dùng cảnh ở đây khi khối Không gian 3D để trống. Mỗi dự án thường chỉ cần một cảnh."
        actions={
          <Link href="/admin/3d-assets" className={adminButtonClass('outline')}>
            <CubeIcon className="text-sm" />
            Mở 3D Assets
          </Link>
        }
      >
        <div className="flex flex-col gap-6">
          <ActionMessage error={error} message={message} />

          {configs.length === 0 ? (
            <div className="flex flex-col items-start gap-5 border border-dashed border-line px-6 py-10">
              <div className="flex flex-col gap-2">
                <p className="u-label text-ink">Dự án chưa có cảnh nào</p>
                <p className="max-w-xl font-body text-[0.8125rem] leading-6 text-muted">
                  Tạo một cảnh trống ở đây, rồi sang 3D Assets để nạp ảnh nguồn hoặc mô hình và đặt hành trình
                  camera. Cho tới lúc đó, khối Không gian 3D sẽ không hiện trên trang.
                </p>
              </div>
              <div className="flex w-full max-w-md flex-col gap-4">
                <FormRow label="Chế độ dựng" hint="Có thể đổi lại bất cứ lúc nào.">
                  <AdminSelect
                    value={newMode}
                    options={MODE_CHOICES}
                    onChange={(event) => {
                      const next = SCENE_MODES.find((mode) => mode === event.target.value)
                      if (next) setNewMode(next)
                    }}
                  />
                </FormRow>
                <div>
                  <button
                    type="button"
                    onClick={create}
                    disabled={pending}
                    className={adminButtonClass('solid')}
                  >
                    <PlusIcon className="text-sm" />
                    {pending ? 'Đang tạo…' : 'Tạo cảnh cho dự án'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {configs.map((config) => {
                const option = labels.get(config.id)
                const poster = config.sourceImage ?? config.depthMap ?? config.model
                const mode = modes[config.id] ?? config.mode

                return (
                  <li key={config.id} className="flex flex-wrap items-start gap-5 border border-line p-4">
                    <MediaThumb media={poster} size="lg" />

                    <div className="flex min-w-[16rem] flex-1 flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-[1.25rem] font-normal leading-none text-ink">
                          {option?.label ?? 'Cảnh chưa đặt tên'}
                        </span>
                        <StatusPill tone={mode === 'NONE' ? 'muted' : 'accent'}>
                          {SCENE_MODE_LABELS[mode]}
                        </StatusPill>
                      </div>

                      <dl className="flex flex-wrap gap-x-6 gap-y-1 font-body text-[0.75rem] leading-5 text-muted">
                        {(
                          [
                            ['Ảnh nguồn', config.sourceImage ? 'có' : '—'],
                            ['Bản đồ sâu', config.depthMap ? 'có' : '—'],
                            ['Mô hình', config.model ? 'có' : '—'],
                            ['Waypoint', String(config.waypoints.length)],
                          ] satisfies [string, string][]
                        ).map(([term, value]) => (
                          <div key={term} className="flex items-baseline gap-2">
                            <dt className="u-label text-[0.5625rem]">{term}</dt>
                            <dd className="text-ink">{value}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className="max-w-xs">
                        <FormRow label="Chế độ dựng">
                          <AdminSelect
                            value={mode}
                            disabled={pending}
                            options={MODE_CHOICES}
                            onChange={(event) => {
                              const next = SCENE_MODES.find((value) => value === event.target.value)
                              if (next && next !== mode) changeMode(config, next)
                            }}
                          />
                        </FormRow>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch gap-2">
                      <Link href="/admin/3d-assets" className={adminButtonClass('outline')}>
                        Chỉnh chi tiết
                      </Link>
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => setPendingDelete(config)}
                        className={adminButtonClass('danger')}
                      >
                        Xoá cảnh
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          <p className="border-t border-line pt-5 font-body text-[0.75rem] leading-5 text-muted">
            Khối <span className="text-ink">Không gian 3D</span> trong tab Trang dự án có thể trỏ tới một cảnh
            bất kỳ — kể cả cảnh của dự án khác ({elsewhere} cảnh khác đang có trong hệ thống).
          </p>
        </div>
      </AdminPanel>

      <ConfirmDialog
        open={pendingDelete !== null}
        tone="danger"
        title="Xoá cảnh này?"
        description="Cảnh và mọi waypoint của nó sẽ bị xoá. Ảnh nguồn và mô hình vẫn còn trong thư viện media."
        confirmLabel="Xoá cảnh"
        pending={pending}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) remove(pendingDelete)
          setPendingDelete(null)
        }}
      />
    </div>
  )
}
