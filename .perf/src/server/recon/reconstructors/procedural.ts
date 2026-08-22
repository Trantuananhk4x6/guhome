/**
 * `PROCEDURAL_3D` — a single photograph turned into a five-faced room box and
 * exported as a GLB.
 *
 * Pipeline, all of it already written elsewhere in this directory:
 *
 *   loadRgb ──► resampleRgb ──► toGrayField ──► estimatePerspective
 *                                                     │
 *                                              deriveRoomModel
 *                                                     │
 *                                                 roomFaces
 *                                                     │
 *                        warpQuadToRect (per face) ───┼──► encodeJpeg → media
 *                                                     │
 *                              toRgba ──► exportFacesToGlb → assertValidGlb → media
 *
 * Two things are worth knowing before changing anything here.
 *
 * **Scale.** The room is built in metres (floor at y = 0, back wall at
 * z = −depth/2, x = 0 on the centreline). `ModelViewer` normalises every GLB it
 * loads so the largest dimension becomes `MODEL_FRAME_SIZE`, so a metric room
 * would arrive shrunk and the metric waypoints — and `roomWidth/Depth`, which
 * `SceneCamera` uses for its distance limits — would disagree with the
 * geometry. `suggestedSettings.modelScale` undoes exactly that normalisation,
 * which puts the model back at true size in the frame the waypoints assume.
 *
 * **Texture order.** `wallTextureIds` is positional: it must follow
 * `ROOM_FACES`. The ids are collected into a map and emitted in that order
 * rather than in whatever order the faces happened to finish.
 */
import type { CameraWaypoint, ReconResult, SceneSettings } from '@/types/content'

import {
  ASSUMED_HFOV_DEG,
  ROOM_FACES,
  deriveRoomModel,
  roomFaces,
  textureSizeFor,
  type FaceGeometry,
  type RoomFace,
  type RoomModel,
} from '../geometry/room'
import { assertValidGlb, exportFacesToGlb, type GlbFace } from '../glb/export'
import { estimatePerspective } from '../image/analysis'
import { encodeJpeg, loadRgb, resampleRgb, toGrayField, toRgba, type RawImage } from '../image/raw'
import { warpQuadToRect } from '../image/warp'
import { storeReconMedia } from '../store'
import { ANALYSIS_MAX_SIDE, ReconError, TEXTURE_MAX_SIDE, reconKey, type ReconInput, type Reconstructor } from '../types'

/**
 * Working resolution for the rectification pass. The side walls occupy narrow
 * trapezoids in the frame, so sampling them from a 1024px copy would upscale
 * them into their 1024px texture; 1800 gives every face real pixels to read
 * while keeping the decoded buffer around 7 MB.
 */
const SOURCE_MAX_SIDE = 1800

/** `ModelViewer`'s default `frameSize` — see the scale note above. */
const MODEL_FRAME_SIZE = 3.6

/** Floors read better slightly glossier than plaster; everything else is matt. */
const FACE_ROUGHNESS: Record<RoomFace, number> = {
  back: 0.94,
  floor: 0.78,
  ceiling: 0.95,
  left: 0.92,
  right: 0.92,
}

const FACE_LABELS: Record<RoomFace, string> = {
  back: 'tường trong',
  floor: 'sàn',
  ceiling: 'trần',
  left: 'tường trái',
  right: 'tường phải',
}

const JPEG_QUALITY = 86
const EASE_MAIN = 'power2.inOut'
const EASE_SETTLE = 'power3.out'

const PROVIDER = 'procedural-roombox-v1'

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

function round(value: number, places = 3): number {
  const factor = 10 ** places
  return Math.round(value * factor) / factor
}

/**
 * three's `fov` is vertical; `ASSUMED_HFOV_DEG` is horizontal. Converting
 * through the source aspect is the only honest way to hand the scene the field
 * of view the room box was actually derived from.
 */
export function verticalFovFor(imageWidth: number, imageHeight: number): number {
  const halfH = Math.tan((ASSUMED_HFOV_DEG * Math.PI) / 360)
  const aspect = imageWidth / Math.max(1, imageHeight)
  const halfV = Math.atan(halfH / Math.max(0.2, aspect))
  return clamp(round((halfV * 360) / Math.PI, 2), 24, 90)
}

/** A dolly from the open front edge toward the back wall, in metres. */
export function waypointsForRoom(model: RoomModel, fov: number): CameraWaypoint[] {
  const halfDepth = model.depth / 2
  const eye = clamp(model.cameraHeight, 0.9, Math.max(1, model.height * 0.9))
  const lookZ = round(-halfDepth)

  return [
    {
      position: [round(model.cameraX), round(eye), round(halfDepth * 0.92)],
      target: [0, round(eye * 0.95), lookZ],
      at: 0,
      fov,
      ease: EASE_MAIN,
      label: 'Đứng ở cửa',
    },
    {
      position: [round(model.cameraX * 0.55), round(eye * 1.02), round(halfDepth * 0.1)],
      target: [0, round(eye * 0.92), lookZ],
      at: 0.55,
      fov: round(fov - 4, 2),
      ease: EASE_MAIN,
      label: 'Giữa phòng',
    },
    {
      position: [0, round(eye * 0.98), round(-halfDepth * 0.42)],
      target: [0, round(eye * 0.9), lookZ],
      at: 1,
      fov: round(fov - 8, 2),
      ease: EASE_SETTLE,
      label: 'Sát tường trong',
    },
  ]
}

/**
 * Rectify one face, translating the homography solver's failure mode into a
 * message the operator can act on. A quad degenerates when the vanishing point
 * lands on the frame edge, which happens on a photograph shot along a wall.
 */
function rectifyFace(source: RawImage, face: FaceGeometry, size: { width: number; height: number }): RawImage {
  try {
    return warpQuadToRect(source, face.imageQuad, size.width, size.height)
  } catch (error) {
    throw new ReconError(
      `Không bóc được ${FACE_LABELS[face.face]} từ ảnh này — phối cảnh quá phẳng để dựng hộp phòng. ` +
        'Hãy chọn một khung có chiều sâu rõ hơn, hoặc dùng chế độ Depth 2.5D.',
      'ROOM_DEGENERATE_QUAD',
      { cause: error },
    )
  }
}

/**
 * Metric room plus the `modelScale` that survives `ModelViewer`'s framing.
 * The dimensions are clamped to the ranges `updateScene`'s zod schema accepts,
 * so a room derived from a pathological photograph can still be hand-edited in
 * the scene editor instead of being rejected on save.
 */
export function settingsForRoom(model: RoomModel, textureIds: readonly string[]): SceneSettings {
  const width = round(clamp(model.width, 0.5, 80))
  const height = round(clamp(model.height, 0.5, 40))
  const depth = round(clamp(model.depth, 0.5, 80))
  const largest = Math.max(width, height, depth)
  return {
    roomWidth: width,
    roomHeight: height,
    roomDepth: depth,
    ...(textureIds.length > 0 ? { wallTextureIds: [...textureIds] } : {}),
    modelScale: round(largest / MODEL_FRAME_SIZE, 4),
  }
}

export const proceduralReconstructor: Reconstructor = {
  mode: 'PROCEDURAL_3D',

  async run({ sourcePath, jobId, onProgress }: ReconInput): Promise<ReconResult> {
    const started = Date.now()
    onProgress(0.03)

    const source = await loadRgb(sourcePath, SOURCE_MAX_SIDE)
    if (source.width < 64 || source.height < 64) {
      throw new ReconError(
        `Ảnh nguồn quá nhỏ (${source.width}×${source.height}px) để dựng phòng. Cần tối thiểu 64×64.`,
        'SOURCE_TOO_SMALL',
      )
    }
    onProgress(0.12)

    // Analyse the very pixels that will be warped — re-decoding the original
    // would risk a different crop or orientation than the rectification sees.
    const analysis = await resampleRgb(source, ANALYSIS_MAX_SIDE)
    const perspective = estimatePerspective(toGrayField(analysis))
    onProgress(0.2)

    const model = deriveRoomModel({
      imageWidth: source.width,
      imageHeight: source.height,
      perspective,
    })
    const faces = roomFaces(model, source.width, source.height)
    if (faces.length === 0) throw new ReconError('Không dựng được mặt phòng nào từ ảnh này.', 'ROOM_NO_FACES')

    /* ------------------------- rectify + store textures ---------------------- */

    const glbFaces: GlbFace[] = []
    const textureIdByFace = new Map<RoomFace, string>()

    const span = 0.52 // 0.20 → 0.72 across every face
    for (const [i, face] of faces.entries()) {
      const size = textureSizeFor(face, TEXTURE_MAX_SIDE)
      const rectified = rectifyFace(source, face, size)

      const jpeg = await encodeJpeg(rectified, JPEG_QUALITY)
      const row = await storeReconMedia({
        key: reconKey(jobId, `${face.face}.jpg`),
        body: jpeg,
        kind: 'texture',
        width: rectified.width,
        height: rectified.height,
        alt: `Vật liệu ${FACE_LABELS[face.face]} bóc từ ảnh gốc`,
        caption: `${FACE_LABELS[face.face]} — ${round(face.metricWidth, 2)}×${round(face.metricHeight, 2)}m`,
      })
      textureIdByFace.set(face.face, row.id)

      glbFaces.push({
        name: face.face,
        corners: face.corners,
        texture: toRgba(rectified),
        roughness: FACE_ROUGHNESS[face.face],
      })

      onProgress(0.2 + (span * (i + 1)) / faces.length)
    }

    /* -------------------------------- export -------------------------------- */

    const glb = await exportFacesToGlb(glbFaces, {
      sceneName: `room-${jobId}`,
      // The room centre is unambiguously inside the volume, so every face is
      // wound to look at it regardless of how flat or deep the box came out.
      faceToward: [0, model.height / 2, 0],
      maxTextureSize: TEXTURE_MAX_SIDE,
      jpegQuality: JPEG_QUALITY / 100,
    })
    assertValidGlb(glb)
    onProgress(0.86)

    const modelRow = await storeReconMedia({
      key: reconKey(jobId, 'room.glb'),
      body: glb,
      kind: 'glb',
      alt: 'Phòng dựng tự động từ một ảnh',
      caption: `Hộp phòng ${model.width}×${model.height}×${model.depth}m`,
    })
    onProgress(0.96)

    const textureIds = ROOM_FACES.map((face) => textureIdByFace.get(face)).filter(
      (id): id is string => typeof id === 'string',
    )

    return {
      modelMediaId: modelRow.id,
      textureMediaIds: textureIds,
      suggestedSettings: settingsForRoom(model, textureIds),
      suggestedWaypoints: waypointsForRoom(model, verticalFovFor(source.width, source.height)),
      metrics: {
        durationMs: Date.now() - started,
        provider: PROVIDER,
        confidence: round(clamp(model.confidence, 0, 1)),
      },
    }
  },
}
