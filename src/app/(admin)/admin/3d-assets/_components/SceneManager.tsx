'use client'

/**
 * `/admin/3d-assets` — two halves under one roof.
 *
 * SCENES: every `scenes` row with its project, mode and poster; selecting one
 * opens the editor with the live preview.
 * JOBS: the image-to-3D queue.
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { MediaThumb } from '@/components/admin/media/MediaThumb'
import { formatTimestamp } from '@/components/admin/media/format'
import {
  SCENE_MODE_LABELS,
  type ProjectOption,
  type ReconJobItem,
  type SceneListItem,
} from '@/components/admin/media/types'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { createScene } from '@/server/actions/scenes'

import { ReconJobs } from './ReconJobs'
import { SceneEditor } from './SceneEditor'

type Tab = 'scenes' | 'jobs'

export interface SceneManagerProps {
  scenes: readonly SceneListItem[]
  jobs: readonly ReconJobItem[]
  projects: readonly ProjectOption[]
}

export function SceneManager({ scenes, jobs, projects }: SceneManagerProps) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('scenes')
  const [activeId, setActiveId] = useState<string | null>(scenes[0]?.config.id ?? null)
  const [newProjectId, setNewProjectId] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const active = scenes.find((scene) => scene.config.id === activeId) ?? null
  const pendingReview = jobs.filter((job) => job.status === 'review').length

  // A project resolves to its *oldest* scene on the public site, and `fetchScenes`
  // orders by project then creation, so the first row per project is the one
  // visitors get. Anything after it is editable but invisible unless a SCENE_3D
  // block names it — the editor says so rather than letting the work vanish.
  const primaryByProject = new Map<string, string>()
  for (const scene of scenes) {
    const projectId = scene.config.projectId
    if (!projectId || primaryByProject.has(projectId)) continue
    primaryByProject.set(projectId, scene.config.id)
  }

  function addScene(): void {
    setNotice(null)
    startTransition(async () => {
      const result = await createScene({ projectId: newProjectId || null })
      if (result.ok) {
        setActiveId(result.data.id)
        router.refresh()
      } else {
        setNotice(result.error)
      }
    })
  }

  return (
    <div className="flex flex-col gap-10 pb-24">
      <header className="flex flex-col gap-6 border-b border-line pb-8">
        <span className="u-label">3D ASSETS</span>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h1 className="u-display-sm text-ink">Không gian ba chiều</h1>
          <nav className="flex items-center gap-px bg-line" aria-label="Khu vực">
            {(
              [
                { key: 'scenes' as const, label: `Cảnh (${scenes.length})` },
                { key: 'jobs' as const, label: pendingReview > 0 ? `Job · ${pendingReview} chờ duyệt` : 'Job' },
              ] satisfies { key: Tab; label: string }[]
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                aria-current={tab === item.key ? 'page' : undefined}
                className={cn(
                  'u-label px-5 py-3 transition-colors duration-500 ease-editorial',
                  tab === item.key ? 'bg-ink text-canvas' : 'bg-canvas text-muted hover:text-ink',
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {notice ? <p className="text-[0.8125rem] leading-relaxed text-accent">{notice}</p> : null}

      {tab === 'jobs' ? (
        <ReconJobs jobs={jobs} projects={projects} />
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <aside className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 border border-line p-4">
              <span className="u-label">Tạo cảnh mới</span>
              <select
                value={newProjectId}
                onChange={(event) => setNewProjectId(event.target.value)}
                aria-label="Dự án cho cảnh mới"
                className="w-full appearance-none rounded-none border-0 border-b border-line bg-transparent py-2 font-body text-[0.8125rem] text-ink focus:border-ink"
              >
                <option value="">Không gắn dự án</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              <Button size="sm" variant="ghost" loading={pending} onClick={addScene}>
                Tạo cảnh
              </Button>
            </div>

            {scenes.length === 0 ? (
              <p className="border border-line bg-surface/40 px-4 py-8 text-[0.8125rem] leading-relaxed text-muted">
                Chưa có cảnh nào.
              </p>
            ) : (
              <ul className="flex flex-col gap-px bg-line">
                {scenes.map((scene, index) => {
                  const selected = scene.config.id === activeId
                  const poster = scene.config.sourceImage ?? scene.config.depthMap ?? scene.config.model
                  return (
                    <li key={scene.config.id} className="bg-canvas">
                      <button
                        type="button"
                        onClick={() => setActiveId(scene.config.id)}
                        className={cn(
                          'flex w-full items-stretch gap-3 p-3 text-left transition-colors duration-500 ease-editorial',
                          selected ? 'bg-surface' : 'hover:bg-surface/60',
                        )}
                      >
                        <span className="relative h-14 w-20 shrink-0 overflow-hidden bg-surface-alt">
                          <MediaThumb media={poster} width={400} sizes="5rem" />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                          <span className="flex items-baseline gap-2">
                            <span className="font-mono text-[0.625rem] text-accent">
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="truncate text-[0.8125rem] text-ink">
                              {scene.projectTitle ?? scene.name ?? 'Cảnh rời'}
                            </span>
                          </span>
                          <span className="u-label text-[0.5625rem]">
                            {SCENE_MODE_LABELS[scene.config.mode]} · {formatTimestamp(scene.updatedAt)}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </aside>

          <section>
            {active ? (
              <SceneEditor
                key={active.config.id}
                scene={active}
                projects={projects}
                shadowedByPrimary={
                  active.config.projectId !== null &&
                  primaryByProject.get(active.config.projectId) !== active.config.id
                }
                onSaved={() => router.refresh()}
                onDeleted={() => {
                  setActiveId(null)
                  router.refresh()
                }}
              />
            ) : (
              <p className="border border-line bg-surface/40 px-6 py-24 text-center text-[0.875rem] text-muted">
                Chọn một cảnh bên trái, hoặc tạo cảnh mới.
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
