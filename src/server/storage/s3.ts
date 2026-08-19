/**
 * S3-compatible driver (AWS S3, Cloudflare R2, MinIO, Backblaze B2…).
 *
 * No SDK: requests are plain `fetch` calls signed with AWS Signature V4,
 * implemented here with `node:crypto`. Path-style addressing is used
 * (`<endpoint>/<bucket>/<key>`) because every S3-compatible provider supports it.
 *
 * The module must load and type-check with empty credentials — configuration is
 * only validated when a request is actually made, so `storage()` can be imported
 * anywhere while STORAGE_DRIVER stays `local`.
 */
import { createHash, createHmac } from 'node:crypto'
import { normaliseKey, type StorageDriver } from './index'

export interface S3Config {
  endpoint: string
  region: string
  bucket: string
  accessKeyId: string
  secretAccessKey: string
  /** CDN / public bucket origin; falls back to `<endpoint>/<bucket>` */
  publicUrl: string
}

const ALGORITHM = 'AWS4-HMAC-SHA256'
const SERVICE = 's3'
const EMPTY_PAYLOAD_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'

function sha256Hex(data: string | Uint8Array): string {
  return createHash('sha256').update(data).digest('hex')
}

function hmac(key: Uint8Array | string, data: string): Buffer {
  return createHmac('sha256', key).update(data, 'utf8').digest()
}

/** RFC 3986 encoding; S3 canonical URIs keep `/` as a separator. */
function encodeSegment(segment: string): string {
  return encodeURIComponent(segment).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
}

function encodeKeyPath(key: string): string {
  return key
    .split('/')
    .map((segment) => encodeSegment(segment))
    .join('/')
}

/** `20260819T093000Z` and `20260819` */
function amzDates(now: Date): { amzDate: string; dateStamp: string } {
  const amzDate = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  return { amzDate, dateStamp: amzDate.slice(0, 8) }
}

function signingKey(secret: string, dateStamp: string, region: string): Buffer {
  const kDate = hmac(`AWS4${secret}`, dateStamp)
  const kRegion = hmac(kDate, region)
  const kService = hmac(kRegion, SERVICE)
  return hmac(kService, 'aws4_request')
}

export function createS3Driver(config: S3Config): StorageDriver {
  const endpoint = config.endpoint.replace(/\/+$/, '')
  const region = config.region.trim().length > 0 ? config.region.trim() : 'auto'
  const publicBase = config.publicUrl.replace(/\/+$/, '')

  function assertConfigured(): { origin: string; basePath: string } {
    const missing: string[] = []
    if (endpoint.length === 0) missing.push('S3_ENDPOINT')
    if (config.bucket.length === 0) missing.push('S3_BUCKET')
    if (config.accessKeyId.length === 0) missing.push('S3_ACCESS_KEY_ID')
    if (config.secretAccessKey.length === 0) missing.push('S3_SECRET_ACCESS_KEY')
    if (missing.length > 0) {
      throw new Error(`S3 storage is not configured — missing ${missing.join(', ')}`)
    }
    let parsed: URL
    try {
      parsed = new URL(endpoint)
    } catch {
      throw new Error(`S3_ENDPOINT is not a valid URL: ${endpoint}`)
    }
    return { origin: parsed.origin, basePath: parsed.pathname.replace(/\/+$/, '') }
  }

  /** Canonical path for a key, including the endpoint's own base path and the bucket. */
  function canonicalPath(basePath: string, key: string): string {
    return `${basePath}/${encodeSegment(config.bucket)}/${encodeKeyPath(key)}`
  }

  async function signedRequest(
    method: 'PUT' | 'DELETE',
    key: string,
    body: Uint8Array<ArrayBuffer> | null,
    contentType: string | null,
  ): Promise<Response> {
    const { origin, basePath } = assertConfigured()
    const safeKey = normaliseKey(key)
    const path = canonicalPath(basePath, safeKey)
    const host = new URL(origin).host
    const { amzDate, dateStamp } = amzDates(new Date())
    const payloadHash = body ? sha256Hex(body) : EMPTY_PAYLOAD_SHA256

    const headers: Record<string, string> = {
      host,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': amzDate,
    }
    if (contentType) headers['content-type'] = contentType

    const signedHeaderNames = Object.keys(headers).sort()
    const canonicalHeaders = signedHeaderNames.map((name) => `${name}:${headers[name]?.trim() ?? ''}\n`).join('')
    const signedHeaders = signedHeaderNames.join(';')

    const canonicalRequest = [method, path, '', canonicalHeaders, signedHeaders, payloadHash].join('\n')
    const scope = `${dateStamp}/${region}/${SERVICE}/aws4_request`
    const stringToSign = [ALGORITHM, amzDate, scope, sha256Hex(canonicalRequest)].join('\n')
    const signature = hmac(signingKey(config.secretAccessKey, dateStamp, region), stringToSign).toString('hex')

    const authorization = `${ALGORITHM} Credential=${config.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

    const response = await fetch(`${origin}${path}`, {
      method,
      headers: { ...headers, authorization },
      body,
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      throw new Error(`S3 ${method} ${safeKey} failed: ${response.status} ${response.statusText} ${detail.slice(0, 400)}`)
    }
    return response
  }

  function publicUrlFor(key: string): string {
    const safeKey = normaliseKey(key)
    if (publicBase.length > 0) return `${publicBase}/${encodeKeyPath(safeKey)}`
    if (endpoint.length === 0) return `/media/${safeKey}`
    return `${endpoint}/${encodeSegment(config.bucket)}/${encodeKeyPath(safeKey)}`
  }

  return {
    async put(key, body, contentType) {
      // Copy into a plain Uint8Array so the body is a valid BodyInit regardless
      // of how the Buffer was allocated (pooled Buffers share an ArrayBuffer).
      await signedRequest('PUT', key, Uint8Array.from(body), contentType)
      return { url: publicUrlFor(key) }
    },

    async delete(key) {
      await signedRequest('DELETE', key, null, null)
    },

    url: publicUrlFor,
  }
}
