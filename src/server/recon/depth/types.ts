/**
 * Depth estimation provider contract.
 *
 * Convention (matches MiDaS / Depth-Anything, so a hosted model is a drop-in):
 * the map is **inverse depth** — white (65535) is the nearest surface, black is
 * the farthest. That is also what a three.js `displacementMap` wants: bright
 * pixels push geometry toward the camera.
 */
import type { FieldStats } from '../image/filters'
import type { Field } from '../image/raw'

export type DepthProviderName = 'heuristic' | 'replicate'

export interface DepthMap {
  /** 16-bit greyscale PNG bytes, ready to hand to `storage().put`. */
  png: Buffer
  width: number
  height: number
  provider: DepthProviderName
  /** Human-readable model label recorded in `ReconResult.metrics.provider`. */
  model: string
  /** 0..1, honest about how much the estimate can be trusted. */
  confidence: number
  stats: FieldStats
  /** The normalised field at analysis resolution — settings are derived from it. */
  field: Field
}

export interface DepthProvider {
  name: DepthProviderName
  estimate(sourcePath: string, onProgress: (p: number) => void): Promise<DepthMap>
}
