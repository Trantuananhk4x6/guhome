/**
 * Perspective (homography) rectification of a quad taken from the photograph.
 *
 * `unitSquareToQuad` is Heckbert's closed-form solution for the projective map
 * that sends the unit square corners (0,0) (1,0) (1,1) (0,1) onto an arbitrary
 * convex quad. Sampling the source through that map turns the trapezoid a wall
 * or floor occupies in the photo into a rectangle we can use as a texture —
 * that is what makes the room box read as a room rather than as a photo folded
 * into five pieces.
 */
import type { RawImage } from './raw'

export interface Point {
  x: number
  y: number
}

/** Source-image corners, in the order the output rectangle's TL, TR, BR, BL. */
export type Quad = readonly [Point, Point, Point, Point]

export interface Homography {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  g: number
  h: number
}

export function unitSquareToQuad(quad: Quad): Homography {
  const [p0, p1, p2, p3] = quad
  const sx = p0.x - p1.x + p2.x - p3.x
  const sy = p0.y - p1.y + p2.y - p3.y

  if (Math.abs(sx) < 1e-9 && Math.abs(sy) < 1e-9) {
    // Affine special case — the quad is a parallelogram.
    return {
      a: p1.x - p0.x,
      b: p2.x - p1.x,
      c: p0.x,
      d: p1.y - p0.y,
      e: p2.y - p1.y,
      f: p0.y,
      g: 0,
      h: 0,
    }
  }

  const dx1 = p1.x - p2.x
  const dx2 = p3.x - p2.x
  const dy1 = p1.y - p2.y
  const dy2 = p3.y - p2.y
  const den = dx1 * dy2 - dx2 * dy1
  if (Math.abs(den) < 1e-9) {
    throw new Error('Degenerate quad: cannot solve homography')
  }

  const g = (sx * dy2 - dx2 * sy) / den
  const h = (dx1 * sy - sx * dy1) / den

  return {
    a: p1.x - p0.x + g * p1.x,
    b: p3.x - p0.x + h * p3.x,
    c: p0.x,
    d: p1.y - p0.y + g * p1.y,
    e: p3.y - p0.y + h * p3.y,
    f: p0.y,
    g,
    h,
  }
}

/** Map a unit-square coordinate (u, v) to source-image pixels. */
export function mapPoint(m: Homography, u: number, v: number): Point {
  const w = m.g * u + m.h * v + 1
  const safe = Math.abs(w) < 1e-9 ? 1e-9 : w
  return { x: (m.a * u + m.b * v + m.c) / safe, y: (m.d * u + m.e * v + m.f) / safe }
}

function sampleBilinear(src: RawImage, x: number, y: number, out: Uint8Array, outIndex: number): void {
  const maxX = src.width - 1
  const maxY = src.height - 1
  const cx = x < 0 ? 0 : x > maxX ? maxX : x
  const cy = y < 0 ? 0 : y > maxY ? maxY : y
  const x0 = Math.floor(cx)
  const y0 = Math.floor(cy)
  const x1 = x0 < maxX ? x0 + 1 : x0
  const y1 = y0 < maxY ? y0 + 1 : y0
  const wx = cx - x0
  const wy = cy - y0

  const ch = src.channels
  const i00 = (y0 * src.width + x0) * ch
  const i10 = (y0 * src.width + x1) * ch
  const i01 = (y1 * src.width + x0) * ch
  const i11 = (y1 * src.width + x1) * ch

  for (let c = 0; c < 3; c++) {
    const a = src.data[i00 + c] ?? 0
    const b = src.data[i10 + c] ?? 0
    const d = src.data[i01 + c] ?? 0
    const e = src.data[i11 + c] ?? 0
    const top = a + (b - a) * wx
    const bottom = d + (e - d) * wx
    out[outIndex + c] = Math.round(top + (bottom - top) * wy)
  }
}

/**
 * Rectify `quad` (source pixels) into an `outWidth × outHeight` rgb image.
 * Output row 0 corresponds to the quad's first two corners, so the caller
 * controls exactly how the texture is oriented on its wall.
 */
export function warpQuadToRect(src: RawImage, quad: Quad, outWidth: number, outHeight: number): RawImage {
  const m = unitSquareToQuad(quad)
  const out = new Uint8Array(outWidth * outHeight * 3)

  for (let y = 0; y < outHeight; y++) {
    const v = (y + 0.5) / outHeight
    for (let x = 0; x < outWidth; x++) {
      const u = (x + 0.5) / outWidth
      const p = mapPoint(m, u, v)
      sampleBilinear(src, p.x, p.y, out, (y * outWidth + x) * 3)
    }
  }

  return { data: out, width: outWidth, height: outHeight, channels: 3 }
}

/** Straight crop-and-resample (no rectification) — used for the back wall. */
export function cropToRect(
  src: RawImage,
  rect: { x: number; y: number; width: number; height: number },
  outWidth: number,
  outHeight: number,
): RawImage {
  const quad: Quad = [
    { x: rect.x, y: rect.y },
    { x: rect.x + rect.width, y: rect.y },
    { x: rect.x + rect.width, y: rect.y + rect.height },
    { x: rect.x, y: rect.y + rect.height },
  ]
  return warpQuadToRect(src, quad, outWidth, outHeight)
}
