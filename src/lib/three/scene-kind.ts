/**
 * Which of the three scene implementations a `SceneConfig` resolves to.
 *
 * Lives outside the components so the light shell of `InteriorScene` can ask
 * "is there anything here worth a canvas?" without importing a canvas.
 */

import type { MediaRef, SceneConfig } from '@/types/content'
import { mediaUrl } from '@/lib/media'

export type SceneKind =
  | { kind: 'model'; url: string }
  | { kind: 'depth'; image: MediaRef; depth: MediaRef | null }
  | { kind: 'room'; image: MediaRef }
  | { kind: 'none' }

export function resolveKind(config: SceneConfig): SceneKind {
  const model = config.model && config.model.kind === 'glb' ? config.model : null
  switch (config.mode) {
    case 'NATIVE_GLB':
      return model ? { kind: 'model', url: mediaUrl(model) } : { kind: 'none' }
    case 'DEPTH_2_5D':
      return config.sourceImage
        ? { kind: 'depth', image: config.sourceImage, depth: config.depthMap }
        : { kind: 'none' }
    case 'PROCEDURAL_3D':
      // The recon pipeline exports a GLB for approved procedural rooms; when it
      // exists it is always better than rebuilding the box at runtime.
      if (model) return { kind: 'model', url: mediaUrl(model) }
      return config.sourceImage ? { kind: 'room', image: config.sourceImage } : { kind: 'none' }
    default:
      return { kind: 'none' }
  }
}
