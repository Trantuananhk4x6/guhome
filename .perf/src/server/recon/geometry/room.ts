/**
 * Single-image room box — the geometry half of PROCEDURAL_3D.
 *
 * The model is the classic "tour into the picture" one-point perspective box
 * (Horry, Anjyo & Arai, 1997), reduced to what a studio photograph reliably
 * supports:
 *
 *   • the camera is level, so the vanishing point sits at eye height;
 *   • a rectangle around the vanishing point is the back wall;
 *   • the four trapezoids between that rectangle and the frame border are the
 *     visible parts of the floor, ceiling and side walls.
 *
 * Two priors turn that into metres, because a single photograph carries no
 * scale: a 65° horizontal field of view (≈ 28 mm on full frame, what interiors
 * are shot on) and a 2.8 m ceiling. Everything else — camera height, room
 * width, room depth — is then *derived* rather than guessed:
 *
 *   f      = (imageWidth / 2) / tan(hfov / 2)                      [px]
 *   eye    = roomHeight · (rectBottom − vanishingY) / rectHeight   [m]
 *   dBack  = eye · f / (rectBottom − vanishingY)                   [m]
 *   width  = rectWidth · dBack / f                                 [m]
 *   depth  = dBack − eye · f / (imageHeight − vanishingY)          [m]
 *
 * `depth` is the distance from the back wall to where the bottom edge of the
 * photograph meets the floor — i.e. the box is exactly the volume the photo can
 * texture, which is why the camera path starts at its front edge instead of at
 * the photographer's real standpoint.
 */
import type { PerspectiveEstimate } from '../image/analysis'
import type { Point, Quad } from '../image/warp'

/** Horizontal field of view assumed for the source photograph. */
export const ASSUMED_HFOV_DEG = 65
/** Ceiling height assumed for a Vietnamese apartment / townhouse interior. */
export const ASSUMED_ROOM_HEIGHT = 2.8
/** Back-wall rectangle size as a fraction of the frame. */
const BACK_WALL_SCALE = 0.44
/** The rectangle must leave at least this much frame on every side. */
const MIN_MARGIN = 0.07
const MIN_DEPTH = 1.8
const MAX_DEPTH = 12
const MIN_EYE = 0.9
const MAX_EYE = 2.3

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface RoomModel {
  /** Metres. */
  width: number
  height: number
  depth: number
  cameraHeight: number
  /** Lateral offset of the photographer from the room centreline, metres. */
  cameraX: number
  /** Back wall in source-image pixels. */
  backWall: Rect
  vanishing: Point
  /** Focal length implied by ASSUMED_HFOV_DEG, in source pixels. */
  focalPx: number
  distanceToBackWall: number
  distanceToNearFloor: number
  confidence: number
}

export type RoomFace = 'back' | 'floor' | 'ceiling' | 'left' | 'right'

/** The five faces in the order their texture ids are stored in SceneSettings. */
export const ROOM_FACES: readonly RoomFace[] = ['back', 'floor', 'ceiling', 'left', 'right']

export interface FaceGeometry {
  face: RoomFace
  /** Source-image quad, ordered as the texture's TL, TR, BR, BL. */
  imageQuad: Quad
  /** World-space corners in the same order. */
  corners: readonly [Vec3Tuple, Vec3Tuple, Vec3Tuple, Vec3Tuple]
  /** Metres — used to pick a texture resolution with the right aspect. */
  metricWidth: number
  metricHeight: number
}

export type Vec3Tuple = readonly [number, number, number]

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

export function deriveRoomModel(args: {
  imageWidth: number
  imageHeight: number
  perspective: PerspectiveEstimate
}): RoomModel {
  const { imageWidth: iw, imageHeight: ih, perspective } = args

  const focalPx = iw / 2 / Math.tan((ASSUMED_HFOV_DEG * Math.PI) / 360)
  const vanishing: Point = { x: perspective.x * iw, y: perspective.y * ih }

  /* -------------------- back-wall rectangle in image space ----------------- */

  // Start at the nominal size, shrink until it fits inside the safety margins.
  let scale = BACK_WALL_SCALE
  const maxScale = 1 - 2 * MIN_MARGIN
  scale = Math.min(scale, maxScale)

  const eyeRatio = 1.5 / ASSUMED_ROOM_HEIGHT // where the horizon sits inside the wall
  let rect: Rect = { x: 0, y: 0, width: 0, height: 0 }

  for (let attempt = 0; attempt < 6; attempt++) {
    const rw = scale * iw
    const rh = scale * ih
    const bottom = vanishing.y + eyeRatio * rh
    const top = bottom - rh
    const left = vanishing.x - rw / 2
    rect = { x: left, y: top, width: rw, height: rh }

    const minX = MIN_MARGIN * iw
    const maxX = iw - MIN_MARGIN * iw - rw
    const minY = MIN_MARGIN * ih
    const maxY = ih - MIN_MARGIN * ih - rh
    if (maxX >= minX && maxY >= minY) {
      rect.x = clamp(rect.x, minX, maxX)
      rect.y = clamp(rect.y, minY, maxY)
      break
    }
    scale *= 0.85
  }

  const rectBottom = rect.y + rect.height
  // Clamping may have moved the wall off the horizon; recover the camera height
  // that the final placement actually implies instead of pretending it is 1.5 m.
  const horizonOffset = Math.max(rect.height * 0.08, rectBottom - vanishing.y)
  const cameraHeight = clamp((ASSUMED_ROOM_HEIGHT * horizonOffset) / rect.height, MIN_EYE, MAX_EYE)

  /* ------------------------------ metric room ------------------------------ */

  const distanceToBackWall = (cameraHeight * focalPx) / horizonOffset
  const width = (rect.width * distanceToBackWall) / focalPx
  const height = (rect.height * distanceToBackWall) / focalPx

  const bottomEdgeOffset = Math.max(1, ih - vanishing.y)
  const distanceToNearFloor = (cameraHeight * focalPx) / bottomEdgeOffset
  const depth = clamp(distanceToBackWall - distanceToNearFloor, MIN_DEPTH, MAX_DEPTH)

  const cameraX = ((vanishing.x - (rect.x + rect.width / 2)) * distanceToBackWall) / focalPx

  return {
    width: Number(width.toFixed(3)),
    height: Number(height.toFixed(3)),
    depth: Number(depth.toFixed(3)),
    cameraHeight: Number(cameraHeight.toFixed(3)),
    cameraX: Number(clamp(cameraX, -width / 3, width / 3).toFixed(3)),
    backWall: rect,
    vanishing,
    focalPx,
    distanceToBackWall,
    distanceToNearFloor,
    confidence: perspective.confidence,
  }
}

/**
 * The five faces, each with the source quad to rectify and the world corners to
 * map it onto. World frame: floor at y = 0, back wall at z = −depth/2, the open
 * front edge at z = +depth/2, x = 0 on the room centreline.
 */
export function roomFaces(model: RoomModel, imageWidth: number, imageHeight: number): FaceGeometry[] {
  const { backWall: r, width: W, height: H, depth: D } = model

  const rTL: Point = { x: r.x, y: r.y }
  const rTR: Point = { x: r.x + r.width, y: r.y }
  const rBR: Point = { x: r.x + r.width, y: r.y + r.height }
  const rBL: Point = { x: r.x, y: r.y + r.height }

  const iTL: Point = { x: 0, y: 0 }
  const iTR: Point = { x: imageWidth, y: 0 }
  const iBR: Point = { x: imageWidth, y: imageHeight }
  const iBL: Point = { x: 0, y: imageHeight }

  const hw = W / 2
  const hd = D / 2

  return [
    {
      face: 'back',
      imageQuad: [rTL, rTR, rBR, rBL],
      corners: [
        [-hw, H, -hd],
        [hw, H, -hd],
        [hw, 0, -hd],
        [-hw, 0, -hd],
      ],
      metricWidth: W,
      metricHeight: H,
    },
    {
      face: 'floor',
      // Far edge first: the texture's top row sits against the back wall.
      imageQuad: [rBL, rBR, iBR, iBL],
      corners: [
        [-hw, 0, -hd],
        [hw, 0, -hd],
        [hw, 0, hd],
        [-hw, 0, hd],
      ],
      metricWidth: W,
      metricHeight: D,
    },
    {
      face: 'ceiling',
      imageQuad: [rTL, rTR, iTR, iTL],
      corners: [
        [-hw, H, -hd],
        [hw, H, -hd],
        [hw, H, hd],
        [-hw, H, hd],
      ],
      metricWidth: W,
      metricHeight: D,
    },
    {
      face: 'left',
      // Top-far, top-near, bottom-near, bottom-far — reads left to right as
      // seen from inside the room.
      imageQuad: [rTL, iTL, iBL, rBL],
      corners: [
        [-hw, H, -hd],
        [-hw, H, hd],
        [-hw, 0, hd],
        [-hw, 0, -hd],
      ],
      metricWidth: D,
      metricHeight: H,
    },
    {
      face: 'right',
      imageQuad: [iTR, rTR, rBR, iBR],
      corners: [
        [hw, H, hd],
        [hw, H, -hd],
        [hw, 0, -hd],
        [hw, 0, hd],
      ],
      metricWidth: D,
      metricHeight: H,
    },
  ]
}

/** Texture pixel size for a face, longest side capped at `maxSide`. */
export function textureSizeFor(face: FaceGeometry, maxSide: number): { width: number; height: number } {
  const aspect = face.metricWidth / Math.max(0.01, face.metricHeight)
  const width = aspect >= 1 ? maxSide : Math.round(maxSide * aspect)
  const height = aspect >= 1 ? Math.round(maxSide / aspect) : maxSide
  return { width: Math.max(64, width), height: Math.max(64, height) }
}
