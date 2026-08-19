/**
 * Device capability probing for the 3D system.
 *
 * Everything here is SSR-safe: on the server every probe returns the most
 * conservative answer (`false` / `'low'` / `[1, 1]`) so a server render never
 * commits to a WebGL path. Results are memoised — creating throwaway WebGL
 * contexts is expensive and some drivers leak them.
 */

export type DevicePerf = 'low' | 'medium' | 'high'

interface NavigatorHints extends Navigator {
  /** Chromium-only: approximate RAM in GB, capped at 8. */
  deviceMemory?: number
  connection?: { saveData?: boolean; effectiveType?: string }
}

interface GpuProbe {
  renderer: string
  maxTextureSize: number
  webgl2: boolean
}

let webglCache: boolean | null = null
let perfCache: DevicePerf | null = null
let gpuCache: GpuProbe | null = null

const SOFTWARE_RENDERERS = ['swiftshader', 'llvmpipe', 'software', 'mesa offscreen', 'microsoft basic render']
const STRONG_RENDERERS = ['apple m', 'rtx', 'radeon rx', 'geforce gtx 1', 'geforce rtx', 'arc a', 'adreno 7', 'apple a1']

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/** Probes the GPU once through a throwaway context, then releases it. */
function probeGpu(): GpuProbe | null {
  if (gpuCache) return gpuCache
  if (!isBrowser()) return null
  try {
    const canvas = document.createElement('canvas')
    const gl2 = canvas.getContext('webgl2')
    const gl: WebGLRenderingContext | WebGL2RenderingContext | null = gl2 ?? canvas.getContext('webgl')
    if (!gl) return null

    let renderer = ''
    const debug = gl.getExtension('WEBGL_debug_renderer_info') as WEBGL_debug_renderer_info | null
    if (debug) {
      const value: unknown = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)
      renderer = typeof value === 'string' ? value.toLowerCase() : ''
    }
    const sizeValue: unknown = gl.getParameter(gl.MAX_TEXTURE_SIZE)
    const maxTextureSize = typeof sizeValue === 'number' ? sizeValue : 2048

    gpuCache = { renderer, maxTextureSize, webgl2: gl2 !== null }

    const lose = gl.getExtension('WEBGL_lose_context') as WEBGL_lose_context | null
    lose?.loseContext()

    return gpuCache
  } catch {
    return null
  }
}

/** True when the browser can give us a usable WebGL context. */
export function supportsWebGL(): boolean {
  if (webglCache !== null) return webglCache
  if (!isBrowser()) return false
  const probe = probeGpu()
  webglCache = probe !== null && !SOFTWARE_RENDERERS.some((needle) => probe.renderer.includes(needle))
  return webglCache
}

/**
 * Coarse performance bucket. Deliberately pessimistic: a wrong `high` costs a
 * janky hero on a phone, a wrong `medium` costs almost nothing.
 */
export function devicePerf(): DevicePerf {
  if (perfCache !== null) return perfCache
  if (!isBrowser() || !supportsWebGL()) {
    perfCache = 'low'
    return perfCache
  }

  const nav = navigator as NavigatorHints
  const probe = probeGpu()
  let score = 0

  const cores = typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : 4
  if (cores >= 8) score += 2
  else if (cores >= 6) score += 1
  else if (cores <= 2) score -= 2

  const memory = nav.deviceMemory
  if (typeof memory === 'number') {
    if (memory >= 8) score += 2
    else if (memory >= 4) score += 1
    else score -= 2
  }

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const smallViewport = Math.min(window.innerWidth, window.innerHeight) < 700
  if (coarsePointer) score -= 1
  if (coarsePointer && smallViewport) score -= 1

  if (window.devicePixelRatio > 2.5) score -= 1
  if (nav.connection?.saveData === true) score -= 4

  if (probe) {
    if (probe.webgl2) score += 1
    if (probe.maxTextureSize < 8192) score -= 1
    if (STRONG_RENDERERS.some((needle) => probe.renderer.includes(needle))) score += 2
  }

  perfCache = score >= 5 ? 'high' : score >= 1 ? 'medium' : 'low'
  return perfCache
}

/** Clamped device pixel ratio range for `<Canvas dpr>`. */
export function recommendedDpr(): [number, number] {
  if (!isBrowser()) return [1, 1]
  const ratio = window.devicePixelRatio || 1
  switch (devicePerf()) {
    case 'high':
      return [1, Math.min(2, ratio)]
    case 'medium':
      return [1, Math.min(1.5, ratio)]
    default:
      return [1, 1]
  }
}

/** `prefers-reduced-motion: reduce` — a hard opt-out from anything animated. */
export function prefersReducedMotion(): boolean {
  if (!isBrowser()) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export interface QualityProfile {
  perf: DevicePerf
  dpr: [number, number]
  /** Shadow maps are never larger than 1024 below `high`. */
  shadowMapSize: number
  contactShadowResolution: number
  /** Segment count for the 2.5D displaced plane (per axis). */
  planeSegments: number
  postprocessing: boolean
  /** MSAA in the renderer — off when postprocessing supplies SMAA instead. */
  antialias: boolean
  envResolution: number
  /** Media derivative width to request for scene textures. */
  textureWidth: number
  maxAnisotropy: number
}

const PROFILES: Record<DevicePerf, Omit<QualityProfile, 'perf' | 'dpr'>> = {
  low: {
    shadowMapSize: 512,
    contactShadowResolution: 256,
    planeSegments: 64,
    postprocessing: false,
    antialias: false,
    envResolution: 64,
    textureWidth: 1200,
    maxAnisotropy: 1,
  },
  medium: {
    shadowMapSize: 1024,
    contactShadowResolution: 512,
    planeSegments: 144,
    postprocessing: true,
    antialias: false,
    envResolution: 128,
    textureWidth: 1600,
    maxAnisotropy: 4,
  },
  high: {
    shadowMapSize: 2048,
    contactShadowResolution: 1024,
    planeSegments: 220,
    postprocessing: true,
    antialias: false,
    envResolution: 256,
    textureWidth: 2400,
    maxAnisotropy: 8,
  },
}

export function qualityFor(perf: DevicePerf, dpr: [number, number] = [1, 1]): QualityProfile {
  return { perf, dpr, ...PROFILES[perf] }
}

/** The profile for the current device. */
export function recommendedQuality(): QualityProfile {
  return qualityFor(devicePerf(), recommendedDpr())
}

/** Test seam — drops every memoised probe. */
export function resetCapabilityCache(): void {
  webglCache = null
  perfCache = null
  gpuCache = null
}
