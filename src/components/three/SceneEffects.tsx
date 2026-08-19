'use client'

import { Bloom, EffectComposer, SMAA, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useMemo, type JSX } from 'react'
import type { SceneSettings } from '@/types/content'
import type { QualityProfile } from '@/lib/three/capability'
import { resolveSceneSettings } from '@/lib/three/scene-settings'

export interface SceneEffectsProps {
  settings: SceneSettings | null | undefined
  quality: QualityProfile
  enabled?: boolean
  /** Edge antialiasing; skip it if the renderer already runs MSAA. */
  smaa?: boolean
}

/**
 * Post: a breath of bloom on the highlights, a vignette that pulls the eye to
 * the centre, SMAA to keep architectural edges clean. Everything here is
 * optional and everything is off on low-performance devices — a stutter costs
 * more than a glow is worth.
 */
export function SceneEffects({ settings, quality, enabled = true, smaa = true }: SceneEffectsProps): JSX.Element | null {
  const resolved = useMemo(() => resolveSceneSettings(settings), [settings])

  if (!enabled || !quality.postprocessing || quality.perf === 'low') return null

  const useBloom = resolved.bloom > 0.001
  const useVignette = resolved.vignette > 0.001
  const useSmaa = smaa && !quality.antialias && quality.perf === 'high'
  if (!useBloom && !useVignette && !useSmaa) return null

  return (
    <EffectComposer multisampling={0} enableNormalPass={false} resolutionScale={1}>
      <>
        {useSmaa && <SMAA />}
        {useBloom && (
          <Bloom
            intensity={resolved.bloom}
            luminanceThreshold={0.86}
            luminanceSmoothing={0.28}
            radius={0.72}
            mipmapBlur
          />
        )}
        {useVignette && <Vignette offset={0.32} darkness={resolved.vignette} blendFunction={BlendFunction.NORMAL} />}
      </>
    </EffectComposer>
  )
}

export default SceneEffects
