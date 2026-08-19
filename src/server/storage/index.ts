/**
 * Storage abstraction — server only.
 *
 * Keys are extension-bearing paths relative to the media root, e.g.
 * `tinh-vien/0-1600.webp`. The local driver writes them under
 * STORAGE_LOCAL_ROOT and serves them from `/media/<key>`; the S3 driver
 * PUTs them to an S3-compatible bucket with hand-rolled SigV4 signing.
 */
import { serverEnv } from '@/lib/env'
import { createLocalDriver } from './local'
import { createS3Driver } from './s3'

export interface StorageDriver {
  put(key: string, body: Buffer, contentType: string): Promise<{ url: string }>
  delete(key: string): Promise<void>
  url(key: string): string
}

/** Public path prefix the local driver serves from. */
export const MEDIA_PUBLIC_PREFIX = '/media'

/**
 * Normalise a storage key: forward slashes, no leading slash, no `.` / `..`
 * segments. Throws on a key that would escape the media root.
 */
export function normaliseKey(key: string): string {
  const flat = key.replace(/\\/g, '/').replace(/^\/+/, '')
  const segments = flat.split('/').filter((s) => s.length > 0 && s !== '.')
  if (segments.length === 0) throw new Error('Storage key is empty')
  if (segments.some((s) => s === '..')) throw new Error(`Unsafe storage key: ${key}`)
  return segments.join('/')
}

/** Best-effort content type from a key's extension. */
export function contentTypeFor(key: string): string {
  const ext = key.slice(key.lastIndexOf('.') + 1).toLowerCase()
  switch (ext) {
    case 'webp':
      return 'image/webp'
    case 'avif':
      return 'image/avif'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'svg':
      return 'image/svg+xml'
    case 'mp4':
      return 'video/mp4'
    case 'webm':
      return 'video/webm'
    case 'glb':
      return 'model/gltf-binary'
    case 'gltf':
      return 'model/gltf+json'
    case 'hdr':
      return 'image/vnd.radiance'
    case 'ktx2':
      return 'image/ktx2'
    case 'json':
      return 'application/json'
    default:
      return 'application/octet-stream'
  }
}

let cached: { key: string; driver: StorageDriver } | null = null

/** The configured driver: local by default, S3 when STORAGE_DRIVER=s3. */
export function storage(): StorageDriver {
  const env = serverEnv()
  const cacheKey =
    env.STORAGE_DRIVER === 's3'
      ? `s3:${env.S3_ENDPOINT}:${env.S3_BUCKET}:${env.S3_PUBLIC_URL}`
      : `local:${env.STORAGE_LOCAL_ROOT}`
  if (cached && cached.key === cacheKey) return cached.driver

  const driver =
    env.STORAGE_DRIVER === 's3'
      ? createS3Driver({
          endpoint: env.S3_ENDPOINT,
          region: env.S3_REGION,
          bucket: env.S3_BUCKET,
          accessKeyId: env.S3_ACCESS_KEY_ID,
          secretAccessKey: env.S3_SECRET_ACCESS_KEY,
          publicUrl: env.S3_PUBLIC_URL,
        })
      : createLocalDriver(env.STORAGE_LOCAL_ROOT)

  cached = { key: cacheKey, driver }
  return driver
}

/** Test/CLI hook — drops the memoised driver. */
export function resetStorage(): void {
  cached = null
}

export { createLocalDriver } from './local'
export { createS3Driver, type S3Config } from './s3'
