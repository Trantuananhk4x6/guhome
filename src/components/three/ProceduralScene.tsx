'use client'

import { type JSX } from 'react'
import type { MediaRef, SceneSettings } from '@/types/content'
import type { QualityProfile } from '@/lib/three/capability'
import { DepthScene } from '@/components/three/DepthScene'

export interface ProceduralSceneProps {
  image: MediaRef
  settings: SceneSettings | null | undefined
  quality: QualityProfile
}

/**
 * `PROCEDURAL_3D`, **without an exported GLB** — the runtime fallback for a room
 * the recon pipeline has not finished reconstructing.
 *
 * This used to build a room box from `roomWidth/Height/Depth` and project the
 * source photograph onto its far wall, washing faded copies of the same photo
 * across the floor, ceiling and side walls. It did not work, and it could not
 * have: the photograph already contains a room in perspective, so hanging it
 * flat on the far wall of a *second*, unrelated room puts two vanishing points
 * in one frame. The box is 6 × 3 × 8 m and the photo is a rectangle on one wall
 * of it, so the authored dolly walks the camera in past the photograph's edges
 * and fills the frame with blank white box; the washes, being the same photo
 * stretched over surfaces it was never shot for, arrived as bleached smears
 * across the floor. It read as a print pinned inside an empty room — which is a
 * far more expensive-looking mistake than simply showing the photograph.
 *
 * So it does the honest thing instead. One photograph is exactly the input
 * `DEPTH_2_5D` is built for, and that path — an unlit photograph on a shallow,
 * heavily smoothed relief, with a slow push-in — is convincing where the box was
 * not. `usesFlatRelief` in `@/lib/three/scene-settings` keeps the camera
 * framing, the lighting rig and the environment probe in agreement about it.
 *
 * Nothing is lost when the pipeline does deliver: `InteriorScene` prefers an
 * exported GLB over this component whenever one exists, and real geometry still
 * gets the full room treatment.
 */
export function ProceduralScene({ image, settings, quality }: ProceduralSceneProps): JSX.Element {
  return <DepthScene image={image} depth={null} settings={settings} quality={quality} />
}

export default ProceduralScene
