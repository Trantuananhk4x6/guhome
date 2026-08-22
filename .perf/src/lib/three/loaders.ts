/**
 * Texture preloading and GPU-resource disposal.
 *
 * The GLB half of this module — `GLTFLoader`, `DRACOLoader`, `KTX2Loader` and
 * drei's `useGLTF`, ~151 KB together — now lives in `gltf.ts`. It used to sit
 * here, which meant `DepthScene` importing one disposal helper dragged the
 * entire glTF pipeline into the chunk of every 2.5D scene on the site.
 */

import { useTexture } from '@react-three/drei'
import { Material, Mesh, Object3D, Texture, type BufferGeometry } from 'three'

/* -------------------------------- preloading ------------------------------- */

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

export function isMesh(object: Object3D): object is Mesh {
  return object instanceof Mesh
}
