'use client'

/**
 * The scene editor: every control writes into one local `SceneConfig`, and the
 * live preview beside it re-renders from that same object — no save round-trip
 * between moving a slider and seeing the room change.
 *
 * Camera start / target are waypoint 0: `SceneConfig` has no separate field, and
 * duplicating them would only let the two drift apart.
 */

import { useRef, useState, useTransition } from 'react'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { deleteScene, updateScene } from '@/server/actions/scenes'
import type { CameraWaypoint, MediaRef, SceneConfig, SceneSettings, Vec3 } from '@/types/content'
import {
  ENV_PRESETS,
  SCENE_MODES,
  SCENE_MODE_LABELS,
  TONE_MAPPINGS,
  type ProjectOption,
  type SceneListItem,
} from '@/components/admin/media/types'
import { formatTimestamp } from '@/components/admin/media/format'

import { MediaPickerField } from './MediaPickerField'
import { ScenePreview } from './ScenePreview'
import { DEFAULT_WAYPOINT_EASE, WaypointEditor, normaliseWaypointEases } from './WaypointEditor'
import { readPreviewCamera } from './camera'
import { ControlGroup, NumberSlider, SelectRow, ToggleRow, Vec3Field } from './controls'

/* -------------------------------- defaults -------------------------------- */

const START_POSITION: Vec3 = [4, 1.6, 6]
const START_TARGET: Vec3 = [0, 1.2, 0]

const CAMERA_DEFAULTS = { fov: 45, animationSpeed: 1, scrollSensitivity: 1, autoExplore: true } as const
const LIGHT_DEFAULTS = { envPreset: 'apartment', envIntensity: 1, exposure: 1, shadows: true } as const
const POST_DEFAULTS: SceneSettings = { bloom: 0.15, vignette: 0.35, toneMapping: 'ACESFilmic' }
const DEPTH_DEFAULTS: SceneSettings = { displacementScale: 1, planeSegments: 160, parallaxStrength: 1 }
const ROOM_DEFAULTS: SceneSettings = { roomWidth: 6, roomHeight: 3.1, roomDepth: 8 }
const MODEL_DEFAULTS: SceneSettings = { modelScale: 1, modelPosition: [0, 0, 0], modelRotation: [0, 0, 0] }

interface Notice {
  tone: 'ok' | 'error'
  text: string
}

export interface SceneEditorProps {
  scene: SceneListItem
  projects: readonly ProjectOption[]
  /**
   * True when the project already carries an older scene. `getSceneForProject()`
   * resolves a project to its *oldest* scene, so this one reaches the public
   * site only where a SCENE_3D block names it by id.
   */
  shadowedByPrimary?: boolean
  onSaved: () => void
  onDeleted: () => void
}

export function SceneEditor({
  scene,
  projects,
  shadowedByPrimary = false,
  onSaved,
  onDeleted,
}: SceneEditorProps) {
  // Eases are coerced into the selectable set on load (the editor is remounted
  // per scene by `key`), so the dropdown can never render an empty selection and
  // a save writes back exactly what was on screen.
  const [config, setConfig] = useState<SceneConfig>(() => ({
    ...scene.config,
    waypoints: normaliseWaypointEases(scene.config.waypoints),
  }))
  const [name, setName] = useState(scene.name ?? '')
  const [previewMode, setPreviewMode] = useState<'orbit' | 'scroll'>('orbit')
  const [notice, setNotice] = useState<Notice | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<number>(0)
  const progressLabelRef = useRef<HTMLSpanElement | null>(null)

  const settings = config.settings

  function patch(changes: Partial<SceneConfig>): void {
    setConfig((current) => ({ ...current, ...changes }))
  }

  function patchSettings(changes: SceneSettings): void {
    setConfig((current) => ({ ...current, settings: { ...current.settings, ...changes } }))
  }

  /* ------------------------------ camera start ------------------------------ */

  const start: CameraWaypoint = config.waypoints[0] ?? {
    position: START_POSITION,
    target: START_TARGET,
    at: 0,
  }

  function patchStart(changes: Partial<CameraWaypoint>): void {
    const next = [...config.waypoints]
    const first = next[0] ?? { position: START_POSITION, target: START_TARGET, at: 0 }
    next[0] = { ...first, ...changes }
    patch({ waypoints: next })
  }

  async function capture(index: number | null): Promise<void> {
    const snapshot = await readPreviewCamera(containerRef.current)
    if (!snapshot) {
      setNotice({
        tone: 'error',
        text: 'Chưa đọc được camera. Đợi khung xem trước dựng xong (hoặc thiết bị không bật WebGL) rồi thử lại.',
      })
      return
    }

    const captured: CameraWaypoint = {
      position: snapshot.position,
      target: snapshot.target,
      fov: snapshot.fov ?? config.fov,
      ease: DEFAULT_WAYPOINT_EASE,
    }

    if (index === null) {
      const last = config.waypoints[config.waypoints.length - 1]
      const at = config.waypoints.length === 0 ? 0 : Math.min(1, (last?.at ?? 0) + 0.25)
      patch({ waypoints: [...config.waypoints, { ...captured, at }] })
    } else {
      patch({
        waypoints: config.waypoints.map((point, current) =>
          current === index ? { ...point, ...captured } : point,
        ),
      })
    }
    setNotice({ tone: 'ok', text: 'Đã chụp vị trí camera. Nhớ bấm Lưu.' })
  }

  /* ---------------------------------- save ---------------------------------- */

  function save(): void {
    setNotice(null)
    startTransition(async () => {
      const result = await updateScene({
        id: config.id,
        projectId: config.projectId,
        name: name.trim() || null,
        mode: config.mode,
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
      })

      if (result.ok) {
        setNotice({ tone: 'ok', text: 'Đã lưu cảnh 3D.' })
        onSaved()
      } else {
        setNotice({ tone: 'error', text: result.error })
      }
    })
  }

  function remove(): void {
    setNotice(null)
    startTransition(async () => {
      const result = await deleteScene(config.id)
      if (result.ok) onDeleted()
      else {
        setConfirming(false)
        setNotice({ tone: 'error', text: result.error })
      }
    })
  }

  /* --------------------------------- preview -------------------------------- */

  // Structural swaps remount the canvas; numeric tweaks flow through as props.
  const structureKey = [
    config.id,
    config.mode,
    config.model?.id ?? '',
    config.sourceImage?.id ?? '',
    config.depthMap?.id ?? '',
    previewMode,
  ].join('|')

  const needsSource = config.mode === 'IMAGE' || config.mode === 'DEPTH_2_5D' || config.mode === 'PROCEDURAL_3D'
  const needsDepth = config.mode === 'DEPTH_2_5D'
  const needsModel = config.mode === 'NATIVE_GLB'

  const warnings: string[] = []
  if (needsSource && !config.sourceImage) warnings.push('Chế độ này cần một ảnh nguồn.')
  if (needsDepth && !config.depthMap) warnings.push('Chưa có bản đồ độ sâu — tạo job dựng 3D ở tab Job.')
  if (needsModel && !config.model) warnings.push('Chế độ GLB cần một tệp mô hình.')
  // Only meaningful while the project select still matches what was loaded:
  // re-pointing the scene changes the answer, and the list has not caught up.
  if (shadowedByPrimary && config.projectId === scene.config.projectId) {
    warnings.push(
      'Dự án này đã có một cảnh tạo trước đó. Trang dự án chỉ dùng cảnh đầu tiên — cảnh này chỉ hiện khi được gọi đích danh trong khối SCENE_3D.',
    )
  }
  if (config.mode === 'NONE' && config.projectId) {
    warnings.push('Chế độ “Không dùng 3D” — trang dự án sẽ không hiện khối không gian nào.')
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="u-label">SCENE · {SCENE_MODE_LABELS[config.mode]}</span>
          <input
            type="text"
            value={name}
            placeholder={scene.projectTitle ?? 'Cảnh chưa đặt tên'}
            onChange={(event) => setName(event.target.value)}
            aria-label="Tên cảnh"
            className="w-full max-w-lg border-0 border-b border-line bg-transparent pb-2 font-display text-3xl leading-none text-ink focus:border-ink"
          />
          <span className="u-label text-[0.5625rem]">Cập nhật {formatTimestamp(scene.updatedAt)}</span>
        </div>

        <div className="flex items-center gap-4">
          {confirming ? (
            <>
              <Button variant="solid" tone="accent" size="sm" loading={pending} onClick={remove}>
                Xác nhận xoá
              </Button>
              <Button variant="underline" size="sm" onClick={() => setConfirming(false)}>
                Huỷ
              </Button>
            </>
          ) : (
            <Button variant="ghost" tone="accent" size="sm" onClick={() => setConfirming(true)}>
              Xoá cảnh
            </Button>
          )}
          <Button size="sm" loading={pending} onClick={save}>
            Lưu cảnh
          </Button>
        </div>
      </header>

      {notice ? (
        <p
          role="status"
          className={cn(
            'border-l-2 py-2 pl-4 text-[0.8125rem] leading-relaxed',
            notice.tone === 'ok' ? 'border-line text-muted' : 'border-accent text-accent',
          )}
        >
          {notice.text}
        </p>
      ) : null}

      <div className="grid gap-12 xl:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]">
        {/* ------------------------------ controls ----------------------------- */}
        <div className="order-2 flex flex-col xl:order-1">
          <ControlGroup title="Nguồn & chế độ" hint="Chế độ quyết định cách GuHomes dựng không gian.">
            <SelectRow
              label="Chế độ"
              value={config.mode}
              options={SCENE_MODES.map((mode) => ({ value: mode, label: SCENE_MODE_LABELS[mode] }))}
              onChange={(value) => {
                const mode = SCENE_MODES.find((item) => item === value)
                if (mode) patch({ mode })
              }}
            />
            <SelectRow
              label="Dự án"
              value={config.projectId ?? ''}
              options={[
                { value: '', label: 'Không gắn dự án' },
                ...projects.map((project) => ({ value: project.id, label: project.title })),
              ]}
              onChange={(value) => patch({ projectId: value || null })}
            />
            <MediaPickerField
              label="Ảnh nguồn"
              value={config.sourceImage}
              kinds={['image']}
              hint="Ảnh gốc dùng cho chế độ ảnh tĩnh, 2.5D và dựng phòng."
              onChange={(value: MediaRef | null) => patch({ sourceImage: value })}
            />
            <MediaPickerField
              label="Bản đồ độ sâu"
              value={config.depthMap}
              kinds={['depth', 'image']}
              hint="Kết quả của job dựng 3D ở chế độ 2.5D."
              onChange={(value: MediaRef | null) => patch({ depthMap: value })}
            />
            <MediaPickerField
              label="Mô hình GLB"
              value={config.model}
              kinds={['glb']}
              onChange={(value: MediaRef | null) => patch({ model: value })}
            />
          </ControlGroup>

          <ControlGroup
            title="Máy ảnh"
            hint="Vị trí bắt đầu chính là waypoint đầu tiên."
            onReset={() => {
              patch({ ...CAMERA_DEFAULTS })
              patchStart({ position: START_POSITION, target: START_TARGET, at: 0 })
            }}
          >
            <Vec3Field
              label="Vị trí bắt đầu"
              value={start.position}
              onChange={(value) => patchStart({ position: value })}
            />
            <Vec3Field
              label="Điểm nhìn bắt đầu"
              value={start.target}
              onChange={(value) => patchStart({ target: value })}
            />
            <NumberSlider
              label="Góc nhìn (FOV)"
              value={config.fov}
              min={10}
              max={120}
              step={1}
              suffix="°"
              onChange={(fov) => patch({ fov })}
            />
            <NumberSlider
              label="Tốc độ hoạt cảnh"
              value={config.animationSpeed}
              min={0}
              max={4}
              step={0.05}
              onChange={(animationSpeed) => patch({ animationSpeed })}
            />
            <NumberSlider
              label="Độ nhạy cuộn"
              value={config.scrollSensitivity}
              min={0}
              max={4}
              step={0.05}
              hint="Nhân với tiến trình cuộn khi camera chạy theo trang."
              onChange={(scrollSensitivity) => patch({ scrollSensitivity })}
            />
            <ToggleRow
              label="Tự khám phá"
              value={config.autoExplore}
              hint="Camera trôi chậm khi người xem đứng yên."
              onChange={(autoExplore) => patch({ autoExplore })}
            />
          </ControlGroup>

          <ControlGroup title="Ánh sáng" onReset={() => patch({ ...LIGHT_DEFAULTS })}>
            <SelectRow
              label="Môi trường"
              value={config.envPreset}
              options={ENV_PRESETS.map((preset) => ({ value: preset, label: preset }))}
              onChange={(envPreset) => patch({ envPreset })}
            />
            <NumberSlider
              label="Cường độ môi trường"
              value={config.envIntensity}
              min={0}
              max={8}
              step={0.05}
              onChange={(envIntensity) => patch({ envIntensity })}
            />
            <NumberSlider
              label="Phơi sáng"
              value={config.exposure}
              min={0}
              max={4}
              step={0.01}
              onChange={(exposure) => patch({ exposure })}
            />
            <ToggleRow label="Đổ bóng" value={config.shadows} onChange={(shadows) => patch({ shadows })} />
          </ControlGroup>

          <ControlGroup title="Hậu kỳ" onReset={() => patchSettings(POST_DEFAULTS)}>
            <NumberSlider
              label="Bloom"
              value={settings.bloom ?? 0}
              min={0}
              max={3}
              step={0.01}
              onChange={(bloom) => patchSettings({ bloom })}
            />
            <NumberSlider
              label="Vignette"
              value={settings.vignette ?? 0}
              min={0}
              max={2}
              step={0.01}
              onChange={(vignette) => patchSettings({ vignette })}
            />
            <SelectRow
              label="Tone mapping"
              value={settings.toneMapping ?? 'ACESFilmic'}
              options={TONE_MAPPINGS.map((tone) => ({ value: tone, label: tone }))}
              onChange={(value) => {
                const toneMapping = TONE_MAPPINGS.find((item) => item === value)
                if (toneMapping) patchSettings({ toneMapping })
              }}
            />
          </ControlGroup>

          {config.mode === 'DEPTH_2_5D' ? (
            <ControlGroup
              title="Chiều sâu 2.5D"
              hint="Ảnh phẳng được đẩy khối theo bản đồ độ sâu."
              onReset={() => patchSettings(DEPTH_DEFAULTS)}
            >
              <NumberSlider
                label="Biên độ đẩy khối"
                value={settings.displacementScale ?? 1}
                min={0}
                max={20}
                step={0.05}
                onChange={(displacementScale) => patchSettings({ displacementScale })}
              />
              <NumberSlider
                label="Số phân đoạn mặt phẳng"
                value={settings.planeSegments ?? 160}
                min={8}
                max={512}
                step={8}
                hint="Cao hơn thì mượt hơn nhưng nặng hơn."
                onChange={(planeSegments) => patchSettings({ planeSegments })}
              />
              <NumberSlider
                label="Độ mạnh parallax"
                value={settings.parallaxStrength ?? 1}
                min={0}
                max={5}
                step={0.05}
                onChange={(parallaxStrength) => patchSettings({ parallaxStrength })}
              />
            </ControlGroup>
          ) : null}

          {config.mode === 'PROCEDURAL_3D' ? (
            <ControlGroup title="Khối phòng" hint="Đơn vị mét." onReset={() => patchSettings(ROOM_DEFAULTS)}>
              <NumberSlider
                label="Chiều rộng"
                value={settings.roomWidth ?? 6}
                min={0.5}
                max={80}
                step={0.1}
                suffix="m"
                onChange={(roomWidth) => patchSettings({ roomWidth })}
              />
              <NumberSlider
                label="Chiều cao"
                value={settings.roomHeight ?? 3.1}
                min={0.5}
                max={40}
                step={0.1}
                suffix="m"
                onChange={(roomHeight) => patchSettings({ roomHeight })}
              />
              <NumberSlider
                label="Chiều sâu"
                value={settings.roomDepth ?? 8}
                min={0.5}
                max={80}
                step={0.1}
                suffix="m"
                onChange={(roomDepth) => patchSettings({ roomDepth })}
              />
            </ControlGroup>
          ) : null}

          {config.mode === 'NATIVE_GLB' ? (
            <ControlGroup title="Mô hình" onReset={() => patchSettings(MODEL_DEFAULTS)}>
              <NumberSlider
                label="Tỉ lệ"
                value={settings.modelScale ?? 1}
                min={0.001}
                max={100}
                step={0.01}
                onChange={(modelScale) => patchSettings({ modelScale })}
              />
              <Vec3Field
                label="Vị trí mô hình"
                value={settings.modelPosition ?? [0, 0, 0]}
                onChange={(modelPosition) => patchSettings({ modelPosition })}
              />
              <Vec3Field
                label="Xoay mô hình"
                value={settings.modelRotation ?? [0, 0, 0]}
                step={0.05}
                hint="Radian."
                onChange={(modelRotation) => patchSettings({ modelRotation })}
              />
            </ControlGroup>
          ) : null}
        </div>

        {/* ------------------------------- preview ------------------------------ */}
        <div className="order-1 flex flex-col gap-6 xl:order-2">
          <div className="xl:sticky xl:top-6 flex flex-col gap-4">
            <ScenePreview
              key={structureKey}
              config={config}
              mode={previewMode}
              progressRef={progressRef}
              autoExplore={config.autoExplore}
              fallbackImage={config.sourceImage}
              containerRef={containerRef}
            />

            <div className="flex flex-wrap items-center gap-4 border-b border-line pb-4">
              <div className="flex items-center gap-px bg-line">
                {(['orbit', 'scroll'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPreviewMode(value)}
                    className={cn(
                      'u-label px-4 py-2 transition-colors duration-500 ease-editorial',
                      previewMode === value ? 'bg-ink text-canvas' : 'bg-canvas text-muted hover:text-ink',
                    )}
                  >
                    {value === 'orbit' ? 'Xoay tự do' : 'Theo cuộn'}
                  </button>
                ))}
              </div>

              {previewMode === 'scroll' ? (
                <label className="flex flex-1 items-center gap-3">
                  <span className="u-label text-[0.5625rem]">Tiến trình</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.001}
                    defaultValue={0}
                    aria-label="Tiến trình cuộn giả lập"
                    onChange={(event) => {
                      const value = Number(event.target.value)
                      progressRef.current = value
                      if (progressLabelRef.current) {
                        progressLabelRef.current.textContent = `${Math.round(value * 100)}%`
                      }
                    }}
                    className="h-1 flex-1 cursor-ew-resize appearance-none bg-line accent-accent"
                  />
                  <span ref={progressLabelRef} className="font-mono text-[0.6875rem] text-muted tabular-nums">
                    0%
                  </span>
                </label>
              ) : (
                <p className="text-[0.75rem] leading-relaxed text-muted">
                  Kéo trong khung để xoay, cuộn để tiến lại gần — rồi chụp vị trí thành waypoint.
                </p>
              )}
            </div>

            {warnings.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {warnings.map((warning) => (
                  <li key={warning} className="text-[0.75rem] leading-relaxed text-accent">
                    {warning}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <section className="flex flex-col gap-5 border-t border-line pt-8">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="u-label text-ink">Waypoint camera</h3>
              <span className="u-label text-[0.5625rem]">{config.waypoints.length} chặng</span>
            </div>
            <WaypointEditor
              waypoints={config.waypoints}
              defaultFov={config.fov}
              onCapture={(index) => {
                void capture(index)
              }}
              onChange={(waypoints) => patch({ waypoints })}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
