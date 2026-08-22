'use client'

import { Suspense, lazy, useMemo, type JSX } from 'react'
import type { SceneConfig } from '@/types/content'
import type { QualityProfile } from '@/lib/three/capability'
import { resolveSceneSettings, usesFlatRelief } from '@/lib/three/scene-settings'

/**
 * The lighting rig, and drei's `Environment` with it.
 *
 * `Environment` is not a small import: it carries RGBELoader, EXRLoader and the
 * gainmap decoder so that an HDRI *could* be loaded. A flat relief is drawn
 * unlit and never renders one — and `DEPTH_2_5D` is every scene in the
 * catalogue — so the whole rig hangs off a `lazy()` that the flat branch below
 * never reaches. Nothing about what renders changes; the scenes that are lit by
 * image-based lighting still get exactly the rig they had, one tick later,
 * behind a Suspense that renders nothing while it arrives.
 */
const SceneEnvironmentRig = lazy(() => import('@/components/three/SceneEnvironmentRig'))

export interface SceneEnvironmentProps {
  config: SceneConfig
  quality: QualityProfile
}

/**
 * Image-based lighting for the scene, or — for a relief — just its background.
 */
export function SceneEnvironment({ config, quality }: SceneEnvironmentProps): JSX.Element {
  const settings = useMemo(() => resolveSceneSettings(config.settings), [config.settings])

  // A relief is drawn unlit, so image-based lighting would light nothing while
  // still costing a cube render on every mount. Only the background — which is
  // what shows through wherever the plane does not reach — is kept.
  if (usesFlatRelief(config)) {
    return settings.background ? <color attach="background" args={[settings.background]} /> : <></>
  }

  return (
    <>
      {settings.background && <color attach="background" args={[settings.background]} />}
      <Suspense fallback={null}>
        <SceneEnvironmentRig config={config} quality={quality} />
      </Suspense>
    </>
  )
}

export default SceneEnvironment
