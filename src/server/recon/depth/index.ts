/**
 * Depth estimation entry point — `estimateDepth(sourcePath, onProgress)`.
 * The provider comes from `serverEnv().DEPTH_PROVIDER`; callers never choose.
 */
import { serverEnv } from '@/lib/env'

import { heuristicDepthProvider } from './heuristic'
import { replicateDepthProvider } from './replicate'
import type { DepthMap, DepthProvider, DepthProviderName } from './types'

export type { DepthMap, DepthProvider, DepthProviderName } from './types'

export function depthProviderFor(name: DepthProviderName): DepthProvider {
  return name === 'replicate' ? replicateDepthProvider : heuristicDepthProvider
}

/** The provider this deployment is configured to use. */
export function activeDepthProvider(): DepthProvider {
  return depthProviderFor(serverEnv().DEPTH_PROVIDER)
}

export function estimateDepth(sourcePath: string, onProgress: (p: number) => void = () => {}): Promise<DepthMap> {
  return activeDepthProvider().estimate(sourcePath, onProgress)
}
