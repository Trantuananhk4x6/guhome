/**
 * GLB loading: decoder configuration, preloading and cache release.
 *
 * Split out of `loaders.ts` because of what it costs. `GLTFLoader`,
 * `DRACOLoader`, `KTX2Loader` and drei's `useGLTF` come to ~151 KB of
 * JavaScript and they are only ever needed by `ModelViewer` — but `loaders.ts`
 * also holds the texture-disposal helpers `DepthScene` uses, so a single
 * module put the whole GLB pipeline in front of every 2.5D relief scene on the
 * site. Nothing in the catalogue is `NATIVE_GLB` today; every scene was paying
 * for a loader it never called.
 *
 * Decoder binaries are served from `/draco/` and `/basis/` (copy them from
 * `node_modules/three/examples/jsm/libs/{draco,basis}` into `public/`), so no
 * request ever leaves the origin.
 *
 * `GLTFLoader` / `DRACOLoader` / `KTX2Loader` come from `three-stdlib` — the
 * same build drei loads internally, which is what makes the loader instances
 * we hand to `useGLTF(..., extendLoader)` type- and identity-compatible.
 */

import { useGLTF } from '@react-three/drei'
import type { WebGLRenderer } from 'three'
import { DRACOLoader, GLTFLoader, KTX2Loader } from 'three-stdlib'

export const DRACO_DECODER_PATH = '/draco/'
export const KTX2_TRANSCODER_PATH = '/basis/'

let dracoSingleton: DRACOLoader | null = null
const ktx2ByRenderer = new WeakMap<WebGLRenderer, KTX2Loader>()

/** Shared Draco decoder — the worker pool is expensive, build it once. */
export function dracoLoader(): DRACOLoader {
  if (!dracoSingleton) {
    dracoSingleton = new DRACOLoader()
    dracoSingleton.setDecoderPath(DRACO_DECODER_PATH)
    // No `decoderConfig`: the loader then prefers the wasm decoder
    // (`draco_wasm_wrapper.js` + `draco_decoder.wasm`), which is both smaller
    // over the wire and several times faster than the js fallback.
    dracoSingleton.setWorkerLimit(2)
  }
  return dracoSingleton
}

/** Basis/KTX2 transcoder, memoised per renderer (it needs the GPU features). */
export function ktx2Loader(renderer: WebGLRenderer): KTX2Loader {
  const existing = ktx2ByRenderer.get(renderer)
  if (existing) return existing
  const loader = new KTX2Loader()
  loader.setTranscoderPath(KTX2_TRANSCODER_PATH)
  loader.detectSupport(renderer)
  ktx2ByRenderer.set(renderer, loader)
  return loader
}

/** Attaches Draco (+ KTX2 when a renderer is available) to a GLTFLoader. */
export function configureGltfLoader(loader: GLTFLoader, renderer?: WebGLRenderer | null): GLTFLoader {
  loader.setDRACOLoader(dracoLoader())
  if (renderer) loader.setKTX2Loader(ktx2Loader(renderer))
  return loader
}

export function createGltfLoader(renderer?: WebGLRenderer | null): GLTFLoader {
  return configureGltfLoader(new GLTFLoader(), renderer)
}

/** `extendLoader` callback for drei's `useGLTF`. */
export function gltfExtender(renderer?: WebGLRenderer | null): (loader: GLTFLoader) => void {
  return (loader) => {
    configureGltfLoader(loader, renderer)
  }
}

/** Point drei's internal Draco decoder at our self-hosted binaries. */
export function configureDreiLoaders(): void {
  useGLTF.setDecoderPath(DRACO_DECODER_PATH)
}

configureDreiLoaders()

export function preloadGltf(url: string | null | undefined): void {
  if (!url) return
  useGLTF.preload(url, DRACO_DECODER_PATH, true)
}

/**
 * Drops a GLB from drei's suspense cache and disposes its object graph.
 * Only call this when nothing else on the page renders that URL.
 */
export function releaseGltf(url: string | null | undefined): void {
  if (!url) return
  useGLTF.clear(url)
}

/** Frees the shared decoder pools. Call on full teardown, not per scene. */
export function disposeDecoders(): void {
  dracoSingleton?.dispose()
  dracoSingleton = null
}
