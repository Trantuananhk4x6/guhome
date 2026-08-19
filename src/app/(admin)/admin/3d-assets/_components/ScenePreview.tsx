'use client'

/**
 * The live preview beside the scene controls.
 *
 * `InteriorScene` is the single entry point into the 3D system and arrives
 * through `next/dynamic({ ssr: false })`, so three never touches the server
 * render. The container ref is what `readPreviewCamera()` searches for a canvas.
 */

import dynamic from 'next/dynamic'
import type { MutableRefObject, RefObject } from 'react'

import type { MediaRef, SceneConfig } from '@/types/content'

const InteriorScene = dynamic(
  () => import('@/components/three/InteriorScene').then((mod) => mod.InteriorScene),
  {
    ssr: false,
    loading: () => <PreviewSkeleton />,
  },
)

function PreviewSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-espresso">
      <span className="u-label text-canvas/50">Đang dựng cảnh…</span>
    </div>
  )
}

export interface ScenePreviewProps {
  config: SceneConfig
  mode: 'scroll' | 'orbit'
  progressRef: MutableRefObject<number>
  autoExplore: boolean
  fallbackImage: MediaRef | null
  containerRef: RefObject<HTMLDivElement | null>
  onReady?: () => void
}

export function ScenePreview({
  config,
  mode,
  progressRef,
  autoExplore,
  fallbackImage,
  containerRef,
  onReady,
}: ScenePreviewProps) {
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative aspect-16/10 w-full overflow-hidden border border-line bg-espresso"
    >
      <InteriorScene
        config={config}
        mode={mode}
        progressRef={progressRef}
        autoExplore={autoExplore}
        fallbackImage={fallbackImage}
        className="absolute inset-0 h-full w-full"
        onReady={onReady}
      />
    </div>
  )
}
