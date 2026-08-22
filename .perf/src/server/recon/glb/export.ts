/**
 * Headless GLB export.
 *
 * Verified working in node 24 with three 0.185: `GLTFExporter.parseAsync` with
 * `binary: true`, DataTexture maps and the canvas shim in `./canvas-shim`
 * produces a spec-valid GLB (header magic, JSON chunk, BIN chunk, JPEG images
 * embedded as buffer views). three and the exporter are imported dynamically so
 * that a route handler that never runs a job never pays for them.
 *
 * Geometry is written by hand — four vertices, two triangles, explicit UVs —
 * rather than through PlaneGeometry, so each texture's top-left corner lands on
 * the corner of the wall we intend. Winding is corrected automatically so every
 * face points into the room.
 */
import type { RawImage } from '../image/raw'
import { installCanvasShim } from './canvas-shim'

export type Vec3Tuple = readonly [number, number, number]

export interface GlbFace {
  name: string
  /** World-space TL, TR, BR, BL as the texture is meant to read. */
  corners: readonly [Vec3Tuple, Vec3Tuple, Vec3Tuple, Vec3Tuple]
  /** RGBA pixels; `channels` must be 4. */
  texture: RawImage
  roughness?: number
}

export interface ExportOptions {
  sceneName?: string
  /** A point inside the volume; every face is turned to look at it. */
  faceToward?: Vec3Tuple
  maxTextureSize?: number
  jpegQuality?: number
}

function subtract(a: Vec3Tuple, b: Vec3Tuple): Vec3Tuple {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

function cross(a: Vec3Tuple, b: Vec3Tuple): Vec3Tuple {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
}

function dot(a: Vec3Tuple, b: Vec3Tuple): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

function centroid(corners: readonly Vec3Tuple[]): Vec3Tuple {
  let x = 0
  let y = 0
  let z = 0
  for (const c of corners) {
    x += c[0]
    y += c[1]
    z += c[2]
  }
  const n = Math.max(1, corners.length)
  return [x / n, y / n, z / n]
}

export async function exportFacesToGlb(faces: readonly GlbFace[], options: ExportOptions = {}): Promise<Buffer> {
  if (faces.length === 0) throw new Error('exportFacesToGlb: no faces given')
  installCanvasShim()

  const THREE = await import('three')
  const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js')

  const scene = new THREE.Scene()
  scene.name = options.sceneName ?? 'room'
  const toward = options.faceToward ?? [0, 0, 0]

  for (const face of faces) {
    if (face.texture.channels !== 4) {
      throw new Error(`exportFacesToGlb: face "${face.name}" texture must be RGBA`)
    }

    const [tl, tr, br, bl] = face.corners
    const normal = cross(subtract(tr, tl), subtract(bl, tl))
    const inward = dot(normal, subtract(toward, centroid(face.corners))) >= 0

    const positions = new Float32Array([
      tl[0], tl[1], tl[2],
      tr[0], tr[1], tr[2],
      br[0], br[1], br[2],
      bl[0], bl[1], bl[2],
    ])
    // glTF puts uv (0,0) at the top-left of the image; DataTexture is flipY:false,
    // so this is a straight, unmirrored mapping of the texture onto the quad.
    const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])
    const indices = inward ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2]

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()

    const texture = new THREE.DataTexture(
      new Uint8Array(face.texture.data),
      face.texture.width,
      face.texture.height,
      THREE.RGBAFormat,
    )
    texture.colorSpace = THREE.SRGBColorSpace
    texture.flipY = false
    texture.name = `${face.name}-map`
    texture.userData.mimeType = 'image/jpeg'
    texture.needsUpdate = true

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: face.roughness ?? 0.92,
      metalness: 0.02,
      side: THREE.FrontSide,
    })
    material.name = `${face.name}-material`

    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = face.name
    scene.add(mesh)
  }

  const exporter = new GLTFExporter()
  const result = await exporter.parseAsync(scene, {
    binary: true,
    onlyVisible: true,
    maxTextureSize: options.maxTextureSize ?? 2048,
  })

  if (!(result instanceof ArrayBuffer)) {
    throw new Error('GLTFExporter returned JSON where a binary GLB was requested')
  }
  return Buffer.from(result)
}

/** Cheap structural check so a broken export never reaches the media library. */
export function assertValidGlb(buffer: Buffer): void {
  if (buffer.length < 20) throw new Error('GLB is too short')
  if (buffer.readUInt32LE(0) !== 0x46546c67) throw new Error('GLB magic bytes are wrong')
  if (buffer.readUInt32LE(4) !== 2) throw new Error('GLB is not version 2')
  if (buffer.readUInt32LE(8) !== buffer.length) throw new Error('GLB length header does not match the payload')
  if (buffer.readUInt32LE(16) !== 0x4e4f534a) throw new Error('GLB first chunk is not JSON')
}
