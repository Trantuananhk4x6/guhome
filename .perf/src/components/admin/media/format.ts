/** Small formatters shared by the media library and the 3D asset manager. */

const UNITS = ['B', 'KB', 'MB', 'GB'] as const

export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes)) return '—'
  if (bytes < 1024) return `${bytes} B`
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024
    unit += 1
  }
  const label = UNITS[unit] ?? 'B'
  return `${value >= 10 ? Math.round(value) : value.toFixed(1)} ${label}`
}

export function formatDimensions(width: number | null, height: number | null): string {
  if (!width || !height) return '—'
  return `${width} × ${height}`
}

/** `2.4s`, `1m 12s`, `—` — job durations. */
export function formatDuration(ms: number | null): string {
  if (ms === null || !Number.isFinite(ms) || ms < 0) return '—'
  if (ms < 1000) return `${Math.round(ms)}ms`
  const seconds = ms / 1000
  if (seconds < 60) return `${seconds.toFixed(1)}s`
  const minutes = Math.floor(seconds / 60)
  return `${minutes}m ${Math.round(seconds - minutes * 60)}s`
}

/** Short, stable clock for admin tables — 24h, no locale surprises. */
export function formatTimestamp(value: Date | string | null): string {
  if (!value) return '—'
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return '—'
  const pad = (n: number): string => n.toString().padStart(2, '0')
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

/** The last path segment of a storage key — what an editor recognises as "the file". */
export function fileNameOf(storageKey: string): string {
  const parts = storageKey.split('/')
  return parts[parts.length - 1] ?? storageKey
}

/** Trim a long folder path down to its last two segments. */
export function shortFolder(folder: string | null): string {
  if (!folder) return 'Chưa phân loại'
  const parts = folder.replace(/\\/g, '/').split('/').filter(Boolean)
  return parts.slice(-2).join(' / ') || folder
}

export function percent(value: number): string {
  return `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%`
}
