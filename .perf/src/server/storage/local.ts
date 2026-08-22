/**
 * Local filesystem driver — writes derivatives under STORAGE_LOCAL_ROOT
 * (default `./public/media`) and serves them from `/media/<key>`.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { MEDIA_PUBLIC_PREFIX, normaliseKey, type StorageDriver } from './index'

function isEnoent(error: unknown): boolean {
  return typeof error === 'object' && error !== null && (error as { code?: string }).code === 'ENOENT'
}

export function createLocalDriver(root: string, publicPrefix: string = MEDIA_PUBLIC_PREFIX): StorageDriver {
  const absoluteRoot = path.resolve(process.cwd(), root)
  const prefix = publicPrefix.replace(/\/+$/, '')

  function absolutePath(key: string): string {
    const safeKey = normaliseKey(key)
    const target = path.resolve(absoluteRoot, safeKey)
    const guard = absoluteRoot.endsWith(path.sep) ? absoluteRoot : absoluteRoot + path.sep
    if (!target.startsWith(guard)) throw new Error(`Storage key escapes media root: ${key}`)
    return target
  }

  function publicUrl(key: string): string {
    return `${prefix}/${normaliseKey(key)}`
  }

  return {
    async put(key, body) {
      const target = absolutePath(key)
      await mkdir(path.dirname(target), { recursive: true })
      await writeFile(target, body)
      return { url: publicUrl(key) }
    },

    async delete(key) {
      try {
        await rm(absolutePath(key), { force: true })
      } catch (error) {
        if (!isEnoent(error)) throw error
      }
    },

    url: publicUrl,
  }
}
