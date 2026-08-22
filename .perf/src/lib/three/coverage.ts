/**
 * How much of a plane at `z = 0` a camera can actually see.
 *
 * The relief in `DepthScene` is a plane, and the plane has to be at least as
 * big as the region of `z = 0` inside the frustum or its rim enters frame and
 * the visitor sees straight through to the clear colour. Sizing it by
 * `tan(fov / 2) * distance` — where `distance` is measured along the camera's
 * own view axis — is only correct when that axis is the plane's normal. It is
 * not correct for `mode="orbit"`, where the visitor is invited to look at the
 * relief from the side: the frustum then meets `z = 0` in a trapezium whose far
 * edge runs away from the camera, and the on-axis formula understates its
 * extent by however much the view is raked.
 *
 * So nothing here assumes an axis. The four frustum corners are unprojected
 * through `projectionMatrixInverse`, each corner ray is intersected with the
 * plane in the plane's *own* local frame, and the answer is the bounding box of
 * the four hits. Local frame rather than world because the relief group is
 * translated and tipped a couple of degrees by the pointer parallax, and the
 * plane's rim moves with it.
 *
 * Everything is scratch-allocated at module scope: these run every frame.
 */

import { Matrix4, PerspectiveCamera, Vector3 } from 'three'

/** The four corners of the NDC cube's far face. */
const NDC_CORNERS: ReadonlyArray<readonly [number, number]> = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
]

/** Below this the corner ray runs parallel to the plane and never lands. */
const GRAZING = 1e-6

export interface CoverageExtent {
  /** Half-width of the visible region, in the plane's local units. */
  x: number
  /** Half-height, likewise. */
  y: number
  /**
   * False when at least one corner ray misses the plane entirely — the camera
   * is looking along or away from it and the visible region is a half-plane, so
   * `x` / `y` describe only the corners that did land. Callers must treat an
   * unbounded extent as "no finite plane covers this" rather than as a size.
   */
  bounded: boolean
}

export function createExtent(): CoverageExtent {
  return { x: 0, y: 0, bounded: true }
}

const rayOrigin = new Vector3()
const rayEnd = new Vector3()
const rayDir = new Vector3()

/**
 * Extent of `z = 0` visible from `camera`, in the frame `toLocal` maps world
 * space into. `toLocal` is the inverse world matrix of whatever the plane is
 * parented to, so the plane's own rim is at `±x`, `±y` around the local origin.
 *
 * Accumulates into `out` when `reset` is false, which is how the orbit envelope
 * below folds nine sampled poses into one answer.
 */
export function coverageOf(
  camera: PerspectiveCamera,
  toLocal: Matrix4,
  out: CoverageExtent,
  reset = true,
): CoverageExtent {
  if (reset) {
    out.x = 0
    out.y = 0
    out.bounded = true
  }

  rayOrigin.setFromMatrixPosition(camera.matrixWorld).applyMatrix4(toLocal)

  for (const [nx, ny] of NDC_CORNERS) {
    // NDC z = 1 is the far plane; the ray is corner − eye.
    rayEnd.set(nx, ny, 1).unproject(camera).applyMatrix4(toLocal)
    rayDir.copy(rayEnd).sub(rayOrigin)

    if (Math.abs(rayDir.z) < GRAZING) {
      out.bounded = false
      continue
    }
    const travel = -rayOrigin.z / rayDir.z
    if (!Number.isFinite(travel) || travel <= 0) {
      out.bounded = false
      continue
    }

    const hitX = Math.abs(rayOrigin.x + rayDir.x * travel)
    const hitY = Math.abs(rayOrigin.y + rayDir.y * travel)
    if (hitX > out.x) out.x = hitX
    if (hitY > out.y) out.y = hitY
  }

  return out
}

/**
 * Uniform scale a unit-height plane of the given aspect needs so that its rim
 * sits outside `extent`. The plane is centred on its parent's origin, so a half
 * extent of `x` needs a width of `2x`.
 */
export function scaleForExtent(extent: CoverageExtent, aspect: number): number {
  const safeAspect = aspect > 1e-3 ? aspect : 1e-3
  return Math.max((extent.x * 2) / safeAspect, extent.y * 2)
}

/* ------------------------------ orbit envelope ----------------------------- */

/**
 * The pose window `OrbitControls` will let the visitor reach. Sizing against
 * this rather than against the live pose is the difference between a plane that
 * is big enough *before* the first drag and one that grows during it — and a
 * plane that grows during a drag zooms the photograph as the visitor moves,
 * which is its own defect.
 */
export interface OrbitEnvelope {
  maxDistance: number
  minPolarAngle: number
  maxPolarAngle: number
  minAzimuthAngle: number
  maxAzimuthAngle: number
}

const probe = new PerspectiveCamera()
const probeOffset = new Vector3()

/** Three samples per axis: both limits and the middle. */
function spread(low: number, high: number, out: [number, number, number]): void {
  out[0] = low
  out[1] = (low + high) / 2
  out[2] = high
}

const polars: [number, number, number] = [0, 0, 0]
const azimuths: [number, number, number] = [0, 0, 0]

/**
 * Worst-case coverage over the whole orbit envelope, pivoting on `target`.
 *
 * Distance is sampled at the far limit only: the footprint of a frustum on a
 * plane grows monotonically with distance, so the far limit dominates. The two
 * angles are sampled at both limits and the middle, because obliqueness rakes
 * the trapezium out in whichever direction the camera has swung.
 */
export function envelopeCoverage(
  camera: PerspectiveCamera,
  target: Vector3,
  envelope: OrbitEnvelope,
  toLocal: Matrix4,
  out: CoverageExtent,
): CoverageExtent {
  out.x = 0
  out.y = 0
  out.bounded = true

  const radius = Number.isFinite(envelope.maxDistance) ? envelope.maxDistance : 0
  if (!(radius > 0)) {
    out.bounded = false
    return out
  }

  spread(envelope.minPolarAngle, envelope.maxPolarAngle, polars)
  spread(envelope.minAzimuthAngle, envelope.maxAzimuthAngle, azimuths)

  probe.fov = camera.fov
  probe.aspect = camera.aspect
  probe.near = camera.near
  probe.far = camera.far
  probe.zoom = camera.zoom
  probe.updateProjectionMatrix()

  for (const polar of polars) {
    if (!Number.isFinite(polar)) {
      out.bounded = false
      continue
    }
    for (const azimuth of azimuths) {
      if (!Number.isFinite(azimuth)) {
        out.bounded = false
        continue
      }
      probeOffset.setFromSphericalCoords(radius, polar, azimuth)
      probe.position.copy(target).add(probeOffset)
      probe.up.copy(camera.up)
      probe.lookAt(target)
      probe.updateMatrixWorld(true)
      coverageOf(probe, toLocal, out, false)
    }
  }

  return out
}
