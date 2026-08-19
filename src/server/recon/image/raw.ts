/**
 * Raw pixel access for the reconstruction pipeline.
 *
 * Everything downstream works on plain typed arrays: sharp is used only to
 * decode, resize and re-encode. EXIF orientation is always applied (`.rotate()`)
 * so the depth map and the extracted textures line up with the derivatives the
 * media pipeline publishes.
 */
import sharp from 'sharp'

import { ReconError } from '../types'

export interface RawImage {
  data: Uint8Array
  width: number
  height: number
  /** 1 = grey, 3 = rgb, 4 = rgba */
  channels: number
}

/** A single-channel float field, row-major, `data.length === width * height`. */
export interface Field {
  data: Float32Array
  width: number
  height: number
}

export interface SourceMeta {
  width: number
  height: number
  format: string
}

/** Anything sharp can decode: a path on disk or an already-downloaded buffer. */
export type ImageSource = string | Buffer

export async function readSourceMeta(path: ImageSource): Promise<SourceMeta> {
  const meta = await sharp(path).rotate().metadata()
  const width = meta.width ?? 0
  const height = meta.height ?? 0
  if (width <= 0 || height <= 0) {
    throw new ReconError(`Không đọc được kích thước ảnh nguồn: ${path}`, 'BAD_SOURCE')
  }
  return { width, height, format: meta.format ?? 'unknown' }
}

/** Longest-side fit that never enlarges; returns the decoded pixels plus real dims. */
export async function loadRgb(path: ImageSource, maxSide: number): Promise<RawImage> {
  const { data, info } = await sharp(path)
    .rotate()
    .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  if (info.channels !== 3) {
    // A greyscale source decodes to 1 channel; expand so callers can assume rgb.
    return expandToRgb(new Uint8Array(data.buffer, data.byteOffset, data.byteLength), info.width, info.height, info.channels)
  }
  return {
    data: new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
    width: info.width,
    height: info.height,
    channels: 3,
  }
}

function expandToRgb(data: Uint8Array, width: number, height: number, channels: number): RawImage {
  const out = new Uint8Array(width * height * 3)
  for (let i = 0; i < width * height; i++) {
    const base = i * channels
    const r = data[base] ?? 0
    const g = channels > 1 ? (data[base + 1] ?? r) : r
    const b = channels > 2 ? (data[base + 2] ?? r) : r
    out[i * 3] = r
    out[i * 3 + 1] = g
    out[i * 3 + 2] = b
  }
  return { data: out, width, height, channels: 3 }
}

/** Luminance field in 0..1, resized to fit `maxSide`. */
export async function loadGrayField(path: ImageSource, maxSide: number): Promise<Field> {
  const { data, info } = await sharp(path)
    .rotate()
    .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const width = info.width
  const height = info.height
  const channels = info.channels
  const out = new Float32Array(width * height)
  for (let i = 0; i < out.length; i++) {
    out[i] = (data[i * channels] ?? 0) / 255
  }
  return { data: out, width, height }
}

/** Rec. 709 luminance of an rgb raw image, in 0..1. */
export function toGrayField(image: RawImage): Field {
  const { data, width, height, channels } = image
  const out = new Float32Array(width * height)
  for (let i = 0; i < out.length; i++) {
    const base = i * channels
    const r = data[base] ?? 0
    const g = data[base + 1] ?? r
    const b = data[base + 2] ?? r
    out[i] = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  }
  return { data: out, width, height }
}

export function encodeJpeg(image: RawImage, quality = 82): Promise<Buffer> {
  return sharp(Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength), {
    raw: { width: image.width, height: image.height, channels: image.channels === 4 ? 4 : 3 },
  })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer()
}

/** Downscale an rgb raw image to fit `maxSide` (used before baking into a GLB). */
export async function resampleRgb(image: RawImage, maxSide: number): Promise<RawImage> {
  if (image.width <= maxSide && image.height <= maxSide) return image
  const { data, info } = await sharp(
    Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength),
    { raw: { width: image.width, height: image.height, channels: 3 } },
  )
    .resize({ width: maxSide, height: maxSide, fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  return {
    data: new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
    width: info.width,
    height: info.height,
    channels: 3,
  }
}

/** rgb -> rgba, for three's `DataTexture` (which only exports as RGBAFormat). */
export function toRgba(image: RawImage): RawImage {
  if (image.channels === 4) return image
  const count = image.width * image.height
  const out = new Uint8Array(count * 4)
  for (let i = 0; i < count; i++) {
    const base = i * image.channels
    out[i * 4] = image.data[base] ?? 0
    out[i * 4 + 1] = image.data[base + 1] ?? 0
    out[i * 4 + 2] = image.data[base + 2] ?? 0
    out[i * 4 + 3] = 255
  }
  return { data: out, width: image.width, height: image.height, channels: 4 }
}
