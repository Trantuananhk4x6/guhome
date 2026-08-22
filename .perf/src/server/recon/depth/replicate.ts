/**
 * Hosted depth estimation through Replicate.
 *
 * Active only when `DEPTH_PROVIDER=replicate` **and** `REPLICATE_API_TOKEN` is
 * set; with no token it fails immediately with a message the operator can act
 * on rather than half-running.
 *
 * Model selection, in order:
 *   REPLICATE_DEPTH_VERSION  → POST /v1/predictions          { version, input }
 *   REPLICATE_DEPTH_MODEL    → POST /v1/models/<model>/predictions   (latest version)
 *   default                  → DEFAULT_MODEL below
 *
 * A third escape hatch, `REPLICATE_DEPTH_INVERT=1`, flips the returned map
 * before it is normalised. Depth Anything and MiDaS already publish inverse
 * depth (white = near), which is our convention, but a model that returns
 * *metric* depth has it the other way round and every scene built from it would
 * push the far wall at the camera. Set it once per model, not per job.
 *
 * All three are read straight from `process.env` rather than `serverEnv()`
 * because `src/lib/env.ts` is owned by another area and only declares
 * DEPTH_PROVIDER / REPLICATE_API_TOKEN. They are optional in every deployment.
 *
 * The response is re-normalised through the same tail as the heuristic map, so
 * both providers publish the identical convention: white = near, 16-bit PNG.
 */
import { serverEnv } from '@/lib/env'

import { loadGrayField } from '../image/raw'
import { DEPTH_MAX_SIDE, ReconError } from '../types'
import { finaliseDepth } from './common'
import type { DepthMap, DepthProvider } from './types'

/** Depth Anything V2 — inverse depth, white = near, matching our convention. */
const DEFAULT_MODEL = 'chenxwh/depth-anything-v2'
const API_ROOT = 'https://api.replicate.com/v1'
const POLL_INTERVAL_MS = 1_500
const TOTAL_BUDGET_MS = 180_000
/** The source is downscaled before upload — hosted depth models run at ≤ 1024 anyway. */
const UPLOAD_MAX_SIDE = 1024

interface Prediction {
  id?: string
  status?: string
  error?: unknown
  output?: unknown
  urls?: { get?: string; cancel?: string }
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

async function readError(response: Response): Promise<string> {
  const text = await response.text().catch(() => '')
  return text.length > 400 ? `${text.slice(0, 400)}…` : text
}

function firstOutputUrl(output: unknown): string | null {
  if (typeof output === 'string') return output
  if (Array.isArray(output)) {
    for (const item of output) {
      if (typeof item === 'string' && item.length > 0) return item
    }
    return null
  }
  if (output !== null && typeof output === 'object') {
    const record = output as Record<string, unknown>
    for (const key of ['depth', 'grey_depth', 'image', 'output', 'url']) {
      const value = record[key]
      if (typeof value === 'string' && value.length > 0) return value
      if (Array.isArray(value)) {
        const nested = firstOutputUrl(value)
        if (nested) return nested
      }
    }
  }
  return null
}

async function toDataUri(sourcePath: string): Promise<string> {
  const sharp = (await import('sharp')).default
  const jpeg = await sharp(sourcePath)
    .rotate()
    .resize({ width: UPLOAD_MAX_SIDE, height: UPLOAD_MAX_SIDE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88 })
    .toBuffer()
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const replicateDepthProvider: DepthProvider = {
  name: 'replicate',

  async estimate(sourcePath: string, onProgress: (p: number) => void): Promise<DepthMap> {
    const token = serverEnv().REPLICATE_API_TOKEN.trim()
    if (token.length === 0) {
      throw new ReconError(
        'DEPTH_PROVIDER=replicate nhưng REPLICATE_API_TOKEN chưa được đặt. ' +
          'Thêm token vào .env.local hoặc đổi DEPTH_PROVIDER=heuristic.',
        'REPLICATE_NO_TOKEN',
      )
    }

    const version = (process.env.REPLICATE_DEPTH_VERSION ?? '').trim()
    const model = (process.env.REPLICATE_DEPTH_MODEL ?? DEFAULT_MODEL).trim()
    const label = version.length > 0 ? `replicate:${version.slice(0, 12)}` : `replicate:${model}`

    onProgress(0.05)
    const image = await toDataUri(sourcePath)
    onProgress(0.15)

    const endpoint = version.length > 0 ? `${API_ROOT}/predictions` : `${API_ROOT}/models/${model}/predictions`
    const body = version.length > 0 ? { version, input: { image } } : { input: { image } }

    const created = await fetch(endpoint, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(body),
    })

    if (!created.ok) {
      throw new ReconError(
        `Replicate từ chối yêu cầu (${created.status}): ${await readError(created)}`,
        'REPLICATE_REQUEST_FAILED',
      )
    }

    let prediction = (await created.json()) as Prediction
    const pollUrl = prediction.urls?.get ?? (prediction.id ? `${API_ROOT}/predictions/${prediction.id}` : null)
    if (!pollUrl) {
      throw new ReconError('Replicate không trả về đường dẫn theo dõi dự đoán.', 'REPLICATE_BAD_RESPONSE')
    }

    const deadline = Date.now() + TOTAL_BUDGET_MS
    while (prediction.status !== 'succeeded' && prediction.status !== 'failed' && prediction.status !== 'canceled') {
      if (Date.now() > deadline) {
        throw new ReconError(
          `Replicate vượt quá ngân sách ${Math.round(TOTAL_BUDGET_MS / 1000)} giây.`,
          'REPLICATE_TIMEOUT',
        )
      }
      await sleep(POLL_INTERVAL_MS)
      const polled = await fetch(pollUrl, { headers: authHeaders(token) })
      if (!polled.ok) {
        throw new ReconError(
          `Không đọc được trạng thái dự đoán (${polled.status}): ${await readError(polled)}`,
          'REPLICATE_POLL_FAILED',
        )
      }
      prediction = (await polled.json()) as Prediction
      // 0.15 → 0.70 while the model runs; the exact fraction is unknowable.
      const elapsed = 1 - Math.max(0, deadline - Date.now()) / TOTAL_BUDGET_MS
      onProgress(0.15 + Math.min(0.55, elapsed * 4))
    }

    if (prediction.status !== 'succeeded') {
      const detail = typeof prediction.error === 'string' ? prediction.error : prediction.status
      throw new ReconError(`Mô hình độ sâu thất bại: ${detail ?? 'không rõ'}`, 'REPLICATE_FAILED')
    }

    const outputUrl = firstOutputUrl(prediction.output)
    if (!outputUrl) {
      throw new ReconError('Replicate trả về kết quả không đọc được (không có ảnh độ sâu).', 'REPLICATE_NO_OUTPUT')
    }

    onProgress(0.75)
    const downloaded = outputUrl.startsWith('data:')
      ? Buffer.from(outputUrl.slice(outputUrl.indexOf(',') + 1), 'base64')
      : await downloadImage(outputUrl)

    const field = await loadGrayField(downloaded, DEPTH_MAX_SIDE)
    if ((process.env.REPLICATE_DEPTH_INVERT ?? '') === '1') {
      for (let i = 0; i < field.data.length; i++) field.data[i] = 1 - (field.data[i] ?? 0)
    }
    onProgress(0.9)

    return finaliseDepth(field, {
      provider: 'replicate',
      model: label,
      maxSide: DEPTH_MAX_SIDE,
      confidence: 0.85,
      median: false,
    })
  },
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new ReconError(`Không tải được ảnh độ sâu (${response.status}).`, 'REPLICATE_DOWNLOAD_FAILED')
  }
  return Buffer.from(await response.arrayBuffer())
}
