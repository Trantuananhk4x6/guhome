'use client'

/**
 * The upload queue behind the media library's drop zone and file input.
 *
 * Files are posted one at a time to `POST /api/upload` through XHR — `fetch()`
 * gives no upload progress, and a 200MB walkthrough video needs a progress bar.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

import type { MediaKind } from '@/types/content'

import { MEDIA_KINDS, type MediaItem, type UploadResponse } from './types'

export type UploadState = 'queued' | 'uploading' | 'done' | 'error'

export interface UploadTask {
  id: string
  name: string
  size: number
  state: UploadState
  /** 0..1 */
  progress: number
  error: string | null
}

export interface UseUploadsOptions {
  folder?: string | null
  kind?: MediaKind | null
  onUploaded?: (item: MediaItem) => void
  onSettled?: () => void
}

/* ------------------------------ response parsing --------------------------- */

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function nullableString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function nullableNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function asKind(value: unknown): MediaKind {
  const match = MEDIA_KINDS.find((kind) => kind === value)
  return match ?? 'image'
}

function reviveMedia(record: Record<string, unknown>): MediaItem {
  const created = record.createdAt
  const createdAt =
    typeof created === 'string' || typeof created === 'number' ? new Date(created) : new Date()
  return {
    id: asString(record.id),
    kind: asKind(record.kind),
    url: asString(record.url),
    width: nullableNumber(record.width),
    height: nullableNumber(record.height),
    alt: nullableString(record.alt),
    caption: nullableString(record.caption),
    blurDataURL: nullableString(record.blurDataURL),
    storageKey: asString(record.storageKey),
    folder: nullableString(record.folder),
    mime: nullableString(record.mime),
    bytes: nullableNumber(record.bytes),
    createdAt: Number.isNaN(createdAt.getTime()) ? new Date() : createdAt,
  }
}

function parseResponse(status: number, text: string): UploadResponse {
  let payload: unknown = null
  try {
    payload = JSON.parse(text) as unknown
  } catch {
    payload = null
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>
    const message = typeof record.error === 'string' ? record.error : null
    if (status >= 200 && status < 300 && record.ok === true) {
      const item = record.media
      if (item && typeof item === 'object') {
        return { ok: true, media: reviveMedia(item as Record<string, unknown>) }
      }
      return { ok: true }
    }
    return { ok: false, error: message ?? `Tải lên thất bại (${status}).` }
  }

  return { ok: false, error: `Tải lên thất bại (${status}).` }
}

function postFile(
  file: File,
  folder: string | null,
  kind: MediaKind | null,
  onProgress: (fraction: number) => void,
): Promise<UploadResponse> {
  return new Promise((resolve) => {
    const form = new FormData()
    form.append('file', file)
    if (folder) form.append('folder', folder)
    if (kind) form.append('kind', kind)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/upload')
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && event.total > 0) onProgress(event.loaded / event.total)
    })
    xhr.addEventListener('load', () => resolve(parseResponse(xhr.status, xhr.responseText)))
    xhr.addEventListener('error', () => resolve({ ok: false, error: 'Mất kết nối khi tải lên.' }))
    xhr.addEventListener('abort', () => resolve({ ok: false, error: 'Đã huỷ tải lên.' }))
    xhr.send(form)
  })
}

/* ---------------------------------- hook ---------------------------------- */

export interface Uploads {
  tasks: UploadTask[]
  busy: boolean
  upload: (files: readonly File[]) => void
  dismiss: (id: string) => void
  clearFinished: () => void
}

export function useUploads(options: UseUploadsOptions = {}): Uploads {
  const [tasks, setTasks] = useState<UploadTask[]>([])
  const [busy, setBusy] = useState(false)
  const latest = useRef(options)

  useEffect(() => {
    latest.current = options
  })

  const patch = useCallback((id: string, changes: Partial<UploadTask>): void => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...changes } : task)))
  }, [])

  const upload = useCallback(
    (files: readonly File[]): void => {
      if (files.length === 0) return

      const queued: UploadTask[] = files.map((file, index) => ({
        id: `${Date.now().toString(36)}-${index}-${file.name}`,
        name: file.name,
        size: file.size,
        state: 'queued',
        progress: 0,
        error: null,
      }))
      setTasks((current) => [...queued, ...current])
      setBusy(true)

      void (async () => {
        for (let index = 0; index < files.length; index++) {
          const file = files[index]
          const task = queued[index]
          if (!file || !task) continue

          patch(task.id, { state: 'uploading', progress: 0 })
          const result = await postFile(
            file,
            latest.current.folder ?? null,
            latest.current.kind ?? null,
            (fraction) => patch(task.id, { progress: fraction }),
          )

          if (result.ok) {
            patch(task.id, { state: 'done', progress: 1, error: null })
            if (result.media) latest.current.onUploaded?.(result.media)
          } else {
            patch(task.id, { state: 'error', error: result.error ?? 'Tải lên thất bại.' })
          }
        }
        setBusy(false)
        latest.current.onSettled?.()
      })()
    },
    [patch],
  )

  const dismiss = useCallback((id: string): void => {
    setTasks((current) => current.filter((task) => task.id !== id))
  }, [])

  const clearFinished = useCallback((): void => {
    setTasks((current) => current.filter((task) => task.state === 'queued' || task.state === 'uploading'))
  }, [])

  return { tasks, busy, upload, dismiss, clearFinished }
}
