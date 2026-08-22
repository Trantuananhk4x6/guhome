/**
 * Minimal 16-bit greyscale PNG encoder.
 *
 * sharp cannot take a 16-bit raw buffer as input (raw input is uint8 only), and
 * an 8-bit depth map bands visibly once it drives a displacement map, so the
 * encoder is written out by hand: IHDR + one deflated IDAT + IEND, colour type
 * 0, bit depth 16, `Up` row filtering (depth maps are smooth vertically, so Up
 * roughly halves the file).
 *
 * Note for consumers: browsers decode 16-bit PNGs down to 8 bits per channel,
 * so the extra precision is not visible in WebGL — it is there so a later pass
 * (re-meshing, normal generation, a different exporter) can read the map back
 * without the quantisation this pipeline would otherwise bake in.
 */
import { deflateSync } from 'node:zlib'

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buffer: Buffer): number {
  let c = 0xffffffff
  for (let i = 0; i < buffer.length; i++) {
    c = (CRC_TABLE[(c ^ (buffer[i] ?? 0)) & 0xff] ?? 0) ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type: string, data: Buffer): Buffer {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)
  const typed = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(typed), 0)
  return Buffer.concat([length, typed, crc])
}

export function encodeGray16Png(pixels: Uint16Array, width: number, height: number): Buffer {
  if (pixels.length !== width * height) {
    throw new Error(`encodeGray16Png: expected ${width * height} samples, received ${pixels.length}`)
  }

  const rowBytes = width * 2
  const raw = Buffer.alloc((rowBytes + 1) * height)
  const previous = Buffer.alloc(rowBytes)
  const current = Buffer.alloc(rowBytes)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = pixels[y * width + x] ?? 0
      current[x * 2] = (value >> 8) & 0xff
      current[x * 2 + 1] = value & 0xff
    }
    const offset = y * (rowBytes + 1)
    // Filter 0 (None) on the first row, 2 (Up) afterwards.
    raw[offset] = y === 0 ? 0 : 2
    for (let i = 0; i < rowBytes; i++) {
      const value = current[i] ?? 0
      raw[offset + 1 + i] = y === 0 ? value : (value - (previous[i] ?? 0)) & 0xff
    }
    current.copy(previous)
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr.writeUInt8(16, 8) // bit depth
  ihdr.writeUInt8(0, 9) // colour type: greyscale
  ihdr.writeUInt8(0, 10) // compression
  ihdr.writeUInt8(0, 11) // filter
  ihdr.writeUInt8(0, 12) // interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}
