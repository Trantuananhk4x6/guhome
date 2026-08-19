/**
 * Loader configuration + disposal utilities.
 *
 * Decoder binaries are served from `/draco/` and `/basis/` (copy them from
 * `node_modules/three/examples/jsm/libs/{draco,basis}` into `public/`), so no
 * request ever leaves the origin.
 *
 * `GLTFLoader` / `DRACOLoader` / `KTX2Loader` come from `three-stdlib` — the
 * same build drei loads internally, which is what makes the loader instances
 * we hand to `useGLTF(..., extendLoader)` type- and identity-compatible.
 */

import { useGLTF, useTexture } from '@react-three/drei'
import { Material, Mesh, Object3D, Texture, type BufferGeometry, type WebGLRenderer } from 'three'
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

/* -------------------------------- preloading ------------------------------- */

export function preloadGltf(url: string | null | undefined): void {
  if (!url) return
  useGLTF.preload(url, DRACO_DECODER_PATH, true)
}

export function preloadTextures(urls: readonly (string | null | undefined)[]): void {
  const usable = urls.filter((url): url is string => typeof url === 'string' && url.length > 0)
  if (usable.length > 0) useTexture.preload(usable)
}

/* -------------------------------- disposal -------------------------------- */

export function disposeTexture(texture: Texture | null | undefined): void {
  texture?.dispose()
}

/** Disposes every `Texture`-valued property hanging off a material. */
function disposeMaterialTextures(material: Material): void {
  const record = material as unknown as Record<string, unknown>
  for (const value of Object.values(record)) {
    if (value instanceof Texture) value.dispose()
  }
}

export function disposeMaterial(material: Material | Material[] | null | undefined, withTextures = true): void {
  if (!material) return
  const list = Array.isArray(material) ? material : [material]
  for (const item of list) {
    if (withTextures) disposeMaterialTextures(item)
    item.dispose()
  }
}

export function disposeGeometry(geometry: BufferGeometry | null | undefined): void {
  geometry?.dispose()
}

export interface DisposeOptions {
  /** Off when the textures are shared with a loader cache. */
  textures?: boolean
  materials?: boolean
  geometries?: boolean
}

/** Walks a subtree and frees the GPU resources it owns. */
export function disposeObject3D(root: Object3D | null | undefined, options: DisposeOptions = {}): void {
  if (!root) return
  const { textures = true, materials = true, geometries = true } = options
  root.traverse((child: Object3D) => {
    if (!(child instanceof Mesh)) return
    if (geometries) disposeGeometry(child.geometry)
    if (materials) disposeMaterial(child.material, textures)
  })
}

/**
 * Drops a GLB from drei's suspense cache and disposes its object graph.
 * Only call this when nothing else on the page renders that URL.
 */
export function releaseGltf(url: string | null | undefined): void {
  if (!url) return
  useGLTF.clear(url)
}

/**
 * Drops textures from drei's suspense cache, then disposes them. Cache first —
 * disposing a texture that is still cached would hand a dead GPU handle to the
 * next consumer.
 */
export function releaseTextures(
  urls: readonly (string | null | undefined)[],
  textures: readonly (Texture | null | undefined)[] = [],
): void {
  const usable = urls.filter((url): url is string => typeof url === 'string' && url.length > 0)
  if (usable.length > 0) useTexture.clear(usable)
  for (const texture of textures) disposeTexture(texture)
}

/** Frees the shared decoder pools. Call on full teardown, not per scene. */
export function disposeDecoders(): void {
  dracoSingleton?.dispose()
  dracoSingleton = null
}

export function isMesh(object: Object3D): object is Mesh {
  return object instanceof Mesh
}
