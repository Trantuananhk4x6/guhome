'use client'

/**
 * Camera waypoints — the path the scene camera walks as the page scrolls.
 *
 * `at` is normalised scroll progress, so the list is kept sorted by it and each
 * row can be captured straight from the live preview.
 */

import { cn } from '@/lib/utils'
import type { CameraWaypoint, Vec3 } from '@/types/content'

import { NumberSlider, SelectRow, Vec3Field } from './controls'

/**
 * Segment default — matches `DEFAULT_EASE` in `@/lib/three/camera-path`.
 * `power2.inOut` keeps velocity continuous across a waypoint; an `.out` ease on
 * every leg would restart the dolly at full speed at each stop.
 */
export const DEFAULT_WAYPOINT_EASE = 'power2.inOut'

/**
 * The only eases an editor may author. Four of them are the studio vocabulary
 * (docs/REQUIREMENTS.md item 32 — `power2.out`, `power3.out`, `power4.inOut`,
 * `expo.out`), plus the mid-path default above.
 *
 * Linear is deliberately absent: a constant-speed dolly is the one camera idiom
 * the brief rules out, and it used to sit at the top of this list as
 * "Tuyến tính". Every value here resolves in `EASINGS` (`camera-path.ts`).
 */
const EASES: readonly { value: string; label: string }[] = [
  { value: DEFAULT_WAYPOINT_EASE, label: 'Power2 in-out — mặc định, nối chặng' },
  { value: 'power2.out', label: 'Power2 out — dừng gọn' },
  { value: 'power3.out', label: 'Power3 out — giảm tốc điện ảnh' },
  { value: 'power4.inOut', label: 'Power4 in-out — đối xứng, chậm rãi' },
  { value: 'expo.out', label: 'Expo out — cập bến nhẹ' },
]

/**
 * Eases that used to be selectable, mapped onto the closest survivor so a row
 * written before the list was narrowed never renders as an empty `<select>`.
 * `none` in particular — it was the first entry in the old list — becomes the
 * default rather than staying linear.
 */
const RETIRED_EASES: Readonly<Record<string, string>> = {
  none: DEFAULT_WAYPOINT_EASE,
  linear: DEFAULT_WAYPOINT_EASE,
  'sine.inOut': DEFAULT_WAYPOINT_EASE,
  'power1.inOut': DEFAULT_WAYPOINT_EASE,
  'power3.inOut': 'power4.inOut',
  'expo.inOut': 'expo.out',
}

/** A stored ease coerced into `EASES`, so the dropdown always has a selection. */
export function normaliseEase(value: string | null | undefined): string {
  if (!value) return DEFAULT_WAYPOINT_EASE
  if (EASES.some((option) => option.value === value)) return value
  return RETIRED_EASES[value] ?? DEFAULT_WAYPOINT_EASE
}

/**
 * Applied once when the scene editor loads a config, so what the dropdown shows
 * is also what a save writes back.
 */
export function normaliseWaypointEases(waypoints: readonly CameraWaypoint[]): CameraWaypoint[] {
  return waypoints.map((point) => ({ ...point, ease: normaliseEase(point.ease) }))
}

export interface WaypointEditorProps {
  waypoints: readonly CameraWaypoint[]
  defaultFov: number
  /** `null` appends a new waypoint from the live camera. */
  onCapture: (index: number | null) => void
  onChange: (waypoints: CameraWaypoint[]) => void
}

function move(list: readonly CameraWaypoint[], from: number, to: number): CameraWaypoint[] {
  const next = [...list]
  const [item] = next.splice(from, 1)
  if (!item) return next
  next.splice(to, 0, item)
  return next
}

export function WaypointEditor({ waypoints, defaultFov, onCapture, onChange }: WaypointEditorProps) {
  function patch(index: number, changes: Partial<CameraWaypoint>): void {
    onChange(waypoints.map((point, current) => (current === index ? { ...point, ...changes } : point)))
  }

  function remove(index: number): void {
    onChange(waypoints.filter((_, current) => current !== index))
  }

  function append(): void {
    const last = waypoints[waypoints.length - 1]
    const position: Vec3 = last ? last.position : [4, 1.6, 6]
    const target: Vec3 = last ? last.target : [0, 1.2, 0]
    const at = waypoints.length === 0 ? 0 : Math.min(1, (last?.at ?? 0) + 0.25)
    onChange([...waypoints, { position, target, at, fov: defaultFov, ease: DEFAULT_WAYPOINT_EASE }])
  }

  function sort(): void {
    onChange([...waypoints].sort((a, b) => (a.at ?? 0) - (b.at ?? 0)))
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onCapture(null)}
          className="u-label border border-accent px-4 py-2 text-accent transition-colors duration-500 ease-editorial hover:bg-accent hover:text-canvas"
        >
          Chụp vị trí hiện tại
        </button>
        <button
          type="button"
          onClick={append}
          className="u-label border border-line px-4 py-2 text-ink transition-colors duration-500 ease-editorial hover:border-ink"
        >
          Thêm waypoint
        </button>
        {waypoints.length > 1 ? (
          <button
            type="button"
            onClick={sort}
            className="u-label border-b border-line pb-0.5 text-muted transition-colors duration-500 ease-editorial hover:border-ink hover:text-ink"
          >
            Sắp theo tiến trình
          </button>
        ) : null}
      </div>

      {waypoints.length === 0 ? (
        <p className="border border-line bg-surface/40 px-5 py-6 text-[0.8125rem] leading-relaxed text-muted">
          Chưa có waypoint nào. Xoay camera trong khung xem trước rồi bấm “Chụp vị trí hiện tại” — waypoint đầu tiên
          chính là vị trí camera lúc mở cảnh.
        </p>
      ) : null}

      <ol className="flex flex-col gap-px bg-line">
        {waypoints.map((point, index) => (
          <li key={index} className="flex flex-col gap-4 bg-canvas p-5">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] text-accent">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <input
                  type="text"
                  value={point.label ?? ''}
                  placeholder="Tên chặng (Lối vào, Bếp…)"
                  onChange={(event) => patch(index, { label: event.target.value })}
                  className="w-56 border-0 border-b border-line bg-transparent py-1 font-body text-[0.8125rem] text-ink focus:border-ink"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onCapture(index)}
                  className="u-label text-[0.5625rem] text-accent hover:text-ink"
                >
                  Chụp vào đây
                </button>
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => onChange(move(waypoints, index, index - 1))}
                  className={cn('u-label text-[0.5625rem] text-muted hover:text-ink', index === 0 && 'opacity-30')}
                >
                  Lên
                </button>
                <button
                  type="button"
                  disabled={index === waypoints.length - 1}
                  onClick={() => onChange(move(waypoints, index, index + 1))}
                  className={cn(
                    'u-label text-[0.5625rem] text-muted hover:text-ink',
                    index === waypoints.length - 1 && 'opacity-30',
                  )}
                >
                  Xuống
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="u-label text-[0.5625rem] text-muted hover:text-accent"
                >
                  Xoá
                </button>
              </div>
            </header>

            <div className="grid gap-4 lg:grid-cols-2">
              <Vec3Field
                label="Vị trí camera"
                value={point.position}
                onChange={(value) => patch(index, { position: value })}
              />
              <Vec3Field
                label="Điểm nhìn"
                value={point.target}
                onChange={(value) => patch(index, { target: value })}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <NumberSlider
                label="Tiến trình cuộn"
                value={point.at ?? 0}
                min={0}
                max={1}
                step={0.01}
                onChange={(value) => patch(index, { at: value })}
              />
              <NumberSlider
                label="FOV"
                value={point.fov ?? defaultFov}
                min={10}
                max={120}
                step={1}
                suffix="°"
                onChange={(value) => patch(index, { fov: value })}
              />
              <SelectRow
                label="Ease"
                value={normaliseEase(point.ease)}
                options={EASES}
                onChange={(value) => patch(index, { ease: value })}
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
