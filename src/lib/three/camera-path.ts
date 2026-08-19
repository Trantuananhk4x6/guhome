/**
 * Camera path maths — pure, framework-free, unit-testable.
 *
 * Given `CameraWaypoint[]` and a normalised progress `t` (0..1) it returns the
 * camera pose to use for that frame. Positions and targets ride a centripetal
 * Catmull–Rom spline (no cusps, minimal overshoot around tight waypoints);
 * each segment's local parameter is eased before it is fed to the spline, so
 * the camera settles into a waypoint instead of sliding through it at constant
 * speed.
 *
 * No React, no three.js: everything is plain numbers and tuples so the module
 * can be exercised in a node test without a DOM.
 */

import type { CameraWaypoint, Vec3 } from '@/types/content'

/* --------------------------------- easing --------------------------------- */

export type EasingFn = (t: number) => number

const powerIn = (exp: number): EasingFn => (t) => Math.pow(t, exp)
const powerOut = (exp: number): EasingFn => (t) => 1 - Math.pow(1 - t, exp)
const powerInOut =
  (exp: number): EasingFn =>
  (t) =>
    t < 0.5 ? Math.pow(2 * t, exp) / 2 : 1 - Math.pow(2 - 2 * t, exp) / 2

/** GSAP-compatible exponents: power1 = quad … power4 = quint. */
const POWER_EXPONENTS: Record<string, number> = {
  power1: 2,
  quad: 2,
  power2: 3,
  cubic: 3,
  power3: 4,
  quart: 4,
  power4: 5,
  quint: 5,
}

function buildEasings(): Record<string, EasingFn> {
  const table: Record<string, EasingFn> = {
    none: (t) => t,
    linear: (t) => t,
    'sine.in': (t) => 1 - Math.cos((t * Math.PI) / 2),
    'sine.out': (t) => Math.sin((t * Math.PI) / 2),
    'sine.inOut': (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    'expo.in': (t) => (t <= 0 ? 0 : Math.pow(2, 10 * t - 10)),
    'expo.out': (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    'expo.inOut': (t) =>
      t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
    'circ.in': (t) => 1 - Math.sqrt(1 - t * t),
    'circ.out': (t) => Math.sqrt(1 - (t - 1) * (t - 1)),
    'circ.inOut': (t) =>
      t < 0.5 ? (1 - Math.sqrt(1 - 4 * t * t)) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
  }
  for (const [name, exp] of Object.entries(POWER_EXPONENTS)) {
    table[`${name}.in`] = powerIn(exp)
    table[`${name}.out`] = powerOut(exp)
    table[`${name}.inOut`] = powerInOut(exp)
    table[name] = powerOut(exp)
  }
  return table
}

export const EASINGS: Readonly<Record<string, EasingFn>> = buildEasings()

/**
 * Segment default. `power2.inOut` keeps velocity continuous across waypoints —
 * an `.out` ease on every segment would restart the dolly at full speed at each
 * waypoint, which reads as a game camera. The slow architectural settle comes
 * from the exponential damping applied per frame by `CameraPath`.
 */
export const DEFAULT_EASE = 'power2.inOut'
export const DEFAULT_FOV = 45

/** Resolves a GSAP-style ease name (`'power3.out'`) to a function. */
export function easingByName(name?: string | null): EasingFn {
  if (!name) return EASINGS[DEFAULT_EASE] ?? ((t) => t)
  const direct = EASINGS[name]
  if (direct) return direct
  const lower = EASINGS[name.toLowerCase()]
  if (lower) return lower
  return EASINGS[DEFAULT_EASE] ?? ((t) => t)
}

/* --------------------------------- helpers -------------------------------- */

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0
  return value < 0 ? 0 : value > 1 ? 1 : value
}

function isVec3(value: unknown): value is Vec3 {
  return (
    Array.isArray(value) &&
    value.length === 3 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number' &&
    typeof value[2] === 'number'
  )
}

function distance(a: Vec3, b: Vec3): number {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  const dz = a[2] - b[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

/** `2a − b`, used to synthesise phantom control points at the path ends. */
function reflect(a: Vec3, b: Vec3): Vec3 {
  return [2 * a[0] - b[0], 2 * a[1] - b[1], 2 * a[2] - b[2]]
}

/* -------------------------------- waypoints ------------------------------- */

export interface ResolvedWaypoint {
  position: Vec3
  target: Vec3
  /** Monotonically increasing, first = 0, last = 1. */
  at: number
  fov: number
  ease: string
}

export interface CameraPose {
  position: Vec3
  target: Vec3
  fov: number
}

/** Mutable pose used per frame so the render loop allocates nothing. */
export interface MutablePose {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

export function createPose(fov = DEFAULT_FOV): MutablePose {
  return { position: [0, 1.6, 6], target: [0, 1.4, 0], fov }
}

export const FALLBACK_WAYPOINT: ResolvedWaypoint = {
  position: [0, 1.6, 6],
  target: [0, 1.4, 0],
  at: 0,
  fov: DEFAULT_FOV,
  ease: DEFAULT_EASE,
}

/**
 * Fills in missing `at` values, sorts, and guarantees a strictly increasing
 * 0..1 parameterisation. Authored anchors are honoured; gaps between them are
 * distributed evenly.
 */
export function resolveWaypoints(
  waypoints: readonly CameraWaypoint[] | null | undefined,
  defaultFov: number = DEFAULT_FOV,
): ResolvedWaypoint[] {
  const usable = (waypoints ?? []).filter((wp) => isVec3(wp.position) && isVec3(wp.target))
  if (usable.length === 0) return [{ ...FALLBACK_WAYPOINT, fov: defaultFov }]

  const resolved: ResolvedWaypoint[] = usable.map((wp) => ({
    position: wp.position,
    target: wp.target,
    at: typeof wp.at === 'number' && Number.isFinite(wp.at) ? clamp01(wp.at) : Number.NaN,
    fov: typeof wp.fov === 'number' && wp.fov > 1 ? wp.fov : defaultFov,
    ease: wp.ease ?? DEFAULT_EASE,
  }))

  if (resolved.length === 1) {
    const only = resolved[0]
    if (!only) return [{ ...FALLBACK_WAYPOINT, fov: defaultFov }]
    return [{ ...only, at: 0 }]
  }

  const last = resolved.length - 1
  const first = resolved[0]
  const final = resolved[last]
  if (first && Number.isNaN(first.at)) first.at = 0
  if (final && Number.isNaN(final.at)) final.at = 1

  // Even distribution across every run of unanchored waypoints.
  let anchor = 0
  for (let i = 1; i <= last; i++) {
    const current = resolved[i]
    if (!current || Number.isNaN(current.at)) continue
    const start = resolved[anchor]
    if (!start) continue
    const span = current.at - start.at
    const steps = i - anchor
    for (let j = anchor + 1; j < i; j++) {
      const between = resolved[j]
      if (between) between.at = start.at + (span * (j - anchor)) / steps
    }
    anchor = i
  }

  // Enforce strict monotonicity — authored data is not always sane.
  const epsilon = 1e-4
  for (let i = 1; i <= last; i++) {
    const prev = resolved[i - 1]
    const current = resolved[i]
    if (!prev || !current) continue
    if (!(current.at > prev.at)) current.at = Math.min(1, prev.at + epsilon)
  }
  const head = resolved[0]
  if (head) head.at = 0
  const tail = resolved[last]
  if (tail && tail.at < 1) tail.at = 1

  return resolved
}

/* ------------------------------ catmull–rom ------------------------------- */

/**
 * Centripetal Catmull–Rom (Barry–Goldman pyramid) for one component triple.
 * `alpha` 0.5 = centripetal: no cusps, no self-intersection near tight turns.
 */
function catmullRomComponent(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t0: number,
  t1: number,
  t2: number,
  t3: number,
  t: number,
): number {
  const a1 = ((t1 - t) / (t1 - t0)) * p0 + ((t - t0) / (t1 - t0)) * p1
  const a2 = ((t2 - t) / (t2 - t1)) * p1 + ((t - t1) / (t2 - t1)) * p2
  const a3 = ((t3 - t) / (t3 - t2)) * p2 + ((t - t2) / (t3 - t2)) * p3
  const b1 = ((t2 - t) / (t2 - t0)) * a1 + ((t - t0) / (t2 - t0)) * a2
  const b2 = ((t3 - t) / (t3 - t1)) * a2 + ((t - t1) / (t3 - t1)) * a3
  return ((t2 - t) / (t2 - t1)) * b1 + ((t - t1) / (t2 - t1)) * b2
}

const ALPHA = 0.5
const MIN_KNOT_STEP = 1e-3

function knotStep(a: Vec3, b: Vec3): number {
  return Math.max(Math.pow(distance(a, b), ALPHA), MIN_KNOT_STEP)
}

/**
 * Evaluates the centripetal Catmull–Rom spline through `p1 → p2` at local
 * parameter `u` (0..1), using `p0`/`p3` as tangent neighbours.
 */
export function catmullRom(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, u: number, out: [number, number, number]): void {
  const t0 = 0
  const t1 = t0 + knotStep(p0, p1)
  const t2 = t1 + knotStep(p1, p2)
  const t3 = t2 + knotStep(p2, p3)
  const t = t1 + (t2 - t1) * u
  out[0] = catmullRomComponent(p0[0], p1[0], p2[0], p3[0], t0, t1, t2, t3, t)
  out[1] = catmullRomComponent(p0[1], p1[1], p2[1], p3[1], t0, t1, t2, t3, t)
  out[2] = catmullRomComponent(p0[2], p1[2], p2[2], p3[2], t0, t1, t2, t3, t)
}

/* ---------------------------------- path ---------------------------------- */

export interface SegmentLookup {
  index: number
  /** Local parameter within the segment, before easing. */
  u: number
}

/** Which segment `t` falls in, and how far through it. */
export function segmentAt(points: readonly ResolvedWaypoint[], t: number): SegmentLookup {
  const clamped = clamp01(t)
  const last = points.length - 1
  if (last <= 0) return { index: 0, u: 0 }
  for (let i = 0; i < last; i++) {
    const a = points[i]
    const b = points[i + 1]
    if (!a || !b) continue
    if (clamped <= b.at || i === last - 1) {
      const span = b.at - a.at
      const u = span > 0 ? (clamped - a.at) / span : 0
      return { index: i, u: clamp01(u) }
    }
  }
  return { index: last - 1, u: 1 }
}

function controlPoint(points: readonly ResolvedWaypoint[], index: number, key: 'position' | 'target'): Vec3 {
  const last = points.length - 1
  if (index < 0) {
    const a = points[0]
    const b = points[1] ?? a
    if (!a || !b) return FALLBACK_WAYPOINT[key]
    return reflect(a[key], b[key])
  }
  if (index > last) {
    const a = points[last]
    const b = points[last - 1] ?? a
    if (!a || !b) return FALLBACK_WAYPOINT[key]
    return reflect(a[key], b[key])
  }
  const point = points[index]
  return point ? point[key] : FALLBACK_WAYPOINT[key]
}

export interface CameraPath {
  readonly waypoints: ResolvedWaypoint[]
  /** Allocation-free sampling for the render loop. */
  sampleInto(t: number, out: MutablePose): void
  /** Convenience wrapper — allocates, use in tests / setup only. */
  sample(t: number): CameraPose
}

export interface CameraPathOptions {
  defaultFov?: number
}

export function createCameraPath(
  waypoints: readonly CameraWaypoint[] | null | undefined,
  options: CameraPathOptions = {},
): CameraPath {
  const defaultFov = options.defaultFov ?? DEFAULT_FOV
  const points = resolveWaypoints(waypoints, defaultFov)

  const sampleInto = (t: number, out: MutablePose): void => {
    if (points.length === 1) {
      const only = points[0] ?? FALLBACK_WAYPOINT
      out.position[0] = only.position[0]
      out.position[1] = only.position[1]
      out.position[2] = only.position[2]
      out.target[0] = only.target[0]
      out.target[1] = only.target[1]
      out.target[2] = only.target[2]
      out.fov = only.fov
      return
    }

    const { index, u } = segmentAt(points, t)
    const from = points[index] ?? FALLBACK_WAYPOINT
    const to = points[index + 1] ?? from
    // The ease belongs to the waypoint being approached — that is the one whose
    // arrival the editor is choreographing.
    const eased = easingByName(to.ease ?? from.ease)(u)

    catmullRom(
      controlPoint(points, index - 1, 'position'),
      from.position,
      to.position,
      controlPoint(points, index + 2, 'position'),
      eased,
      out.position,
    )
    catmullRom(
      controlPoint(points, index - 1, 'target'),
      from.target,
      to.target,
      controlPoint(points, index + 2, 'target'),
      eased,
      out.target,
    )
    // Field of view is interpolated linearly on the eased parameter: a spline
    // here would overshoot and produce a visible lens "breathe".
    out.fov = from.fov + (to.fov - from.fov) * eased
  }

  return {
    waypoints: points,
    sampleInto,
    sample(t: number): CameraPose {
      const pose = createPose(defaultFov)
      sampleInto(t, pose)
      return {
        position: [pose.position[0], pose.position[1], pose.position[2]],
        target: [pose.target[0], pose.target[1], pose.target[2]],
        fov: pose.fov,
      }
    },
  }
}

/** One-shot sampling helper (builds the path each call — not for render loops). */
export function samplePath(
  waypoints: readonly CameraWaypoint[] | null | undefined,
  t: number,
  defaultFov: number = DEFAULT_FOV,
): CameraPose {
  return createCameraPath(waypoints, { defaultFov }).sample(t)
}

/**
 * Frame-rate independent exponential damping — the "slow architectural dolly".
 * `lambda` is the reciprocal of the settle time constant; ~2.2 gives a dolly
 * that arrives over roughly a second without ever snapping.
 */
export function damp(current: number, goal: number, lambda: number, delta: number): number {
  if (!Number.isFinite(delta) || delta <= 0) return current
  const next = current + (goal - current) * (1 - Math.exp(-lambda * Math.min(delta, 0.1)))
  return Math.abs(goal - next) < 1e-5 ? goal : next
}

/** Ping-pong 0→1→0 over `period` seconds — used by auto-explore. */
export function pingPong(time: number, period: number): number {
  if (period <= 0) return 0
  const phase = (time % (period * 2)) / period
  return phase <= 1 ? phase : 2 - phase
}
