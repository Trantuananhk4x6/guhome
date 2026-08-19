/**
 * The three lines of browser API that three's `GLTFExporter` needs, implemented
 * for node so a GLB can be written on the server.
 *
 * The exporter only ever touches a canvas along one path when the material maps
 * are `DataTexture`s (which is all we feed it): create a canvas, get a 2D
 * context, `putImageData`, then `convertToBlob`. It never composites, never
 * reads pixels back and never calls `drawImage` — so a real canvas
 * implementation is not needed, just an honest stand-in that hands the pixels
 * to sharp for encoding. `drawImage` throws loudly rather than silently
 * producing a blank texture, so if a future three release changes that path we
 * find out immediately.
 *
 * Globals are installed once per process and only where they are missing, so
 * this is inert in any runtime that already has them.
 */
import sharp from 'sharp'

interface PixelBuffer {
  data: Buffer
  width: number
  height: number
}

interface ImageDataLike {
  data: Uint8ClampedArray | Uint8Array
  width: number
  height: number
}

class NodeImageData implements ImageDataLike {
  readonly data: Uint8ClampedArray
  readonly width: number
  readonly height: number

  constructor(data: Uint8ClampedArray, width: number, height: number) {
    this.data = data
    this.width = width
    this.height = height
  }
}

class NodeCanvasContext {
  private readonly owner: NodeOffscreenCanvas

  constructor(owner: NodeOffscreenCanvas) {
    this.owner = owner
  }

  /** The exporter only uses transforms for flipY, which `putImageData` ignores
   *  in a real canvas too — so ignoring them here matches browser behaviour. */
  translate(): void {}
  scale(): void {}

  putImageData(image: ImageDataLike): void {
    this.owner.setPixels({
      data: Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength),
      width: image.width,
      height: image.height,
    })
  }

  drawImage(): never {
    throw new Error(
      'GLTFExporter tried to drawImage() on the node canvas shim — feed it DataTextures, not HTMLImageElements.',
    )
  }
}

class NodeOffscreenCanvas {
  width: number
  height: number
  private pixels: PixelBuffer | null = null
  private context: NodeCanvasContext | null = null

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  setPixels(pixels: PixelBuffer): void {
    this.pixels = pixels
  }

  getContext(): NodeCanvasContext {
    this.context ??= new NodeCanvasContext(this)
    return this.context
  }

  async convertToBlob(options?: { type?: string; quality?: number }): Promise<Blob> {
    const pixels = this.pixels
    if (!pixels) throw new Error('convertToBlob() called before any pixels were written')

    const type = options?.type ?? 'image/png'
    const pipeline = sharp(pixels.data, {
      raw: { width: pixels.width, height: pixels.height, channels: 4 },
    })
    const encoded =
      type === 'image/jpeg'
        ? await pipeline
            .removeAlpha()
            .jpeg({ quality: Math.round((options?.quality ?? 0.9) * 100), mozjpeg: true })
            .toBuffer()
        : await pipeline.png({ compressionLevel: 9 }).toBuffer()

    return new Blob([new Uint8Array(encoded)], { type })
  }
}

class NodeFileReader {
  result: ArrayBuffer | string | null = null
  onloadend: (() => void) | null = null
  onerror: ((error: unknown) => void) | null = null

  readAsArrayBuffer(blob: Blob): void {
    void blob
      .arrayBuffer()
      .then((buffer) => {
        this.result = buffer
        this.onloadend?.()
      })
      .catch((error: unknown) => this.onerror?.(error))
  }

  readAsDataURL(blob: Blob): void {
    void blob
      .arrayBuffer()
      .then((buffer) => {
        this.result = `data:${blob.type};base64,${Buffer.from(buffer).toString('base64')}`
        this.onloadend?.()
      })
      .catch((error: unknown) => this.onerror?.(error))
  }
}

let installed = false

/** Idempotent. Call before invoking `GLTFExporter.parseAsync`. */
export function installCanvasShim(): void {
  if (installed) return
  const globals = globalThis as unknown as Record<string, unknown>
  if (typeof globals.ImageData === 'undefined') globals.ImageData = NodeImageData
  if (typeof globals.OffscreenCanvas === 'undefined') globals.OffscreenCanvas = NodeOffscreenCanvas
  if (typeof globals.FileReader === 'undefined') globals.FileReader = NodeFileReader
  installed = true
}
