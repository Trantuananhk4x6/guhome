/**
 * Password hashing — scrypt via `node:crypto`. Server-only module: never import
 * this from a client component.
 *
 * Encoded form (self-describing, so the cost can be raised later without
 * invalidating existing hashes):
 *
 *     scrypt$<N>$<salt-base64>$<hash-base64>
 */

import { randomBytes, randomUUID, scrypt, timingSafeEqual, type ScryptOptions } from 'node:crypto'

/** CPU/memory cost. 16384 ≈ 16 MB with r=8 — comfortable for a login form. */
const SCRYPT_COST = 16_384
const SCRYPT_BLOCK_SIZE = 8
const SCRYPT_PARALLELISM = 1
const SALT_BYTES = 16
const KEY_BYTES = 64
/** Node's default maxmem (32 MB) is too tight once N grows; give scrypt room. */
const MAX_MEM = 128 * 1024 * 1024

const PREFIX = 'scrypt'

/** Bounds accepted when reading a stored hash — guards against absurd work factors. */
const MIN_COST = 1_024
const MAX_COST = 1_048_576

function derive(password: string, salt: Buffer, keyLength: number, cost: number): Promise<Buffer> {
  const options: ScryptOptions = {
    N: cost,
    r: SCRYPT_BLOCK_SIZE,
    p: SCRYPT_PARALLELISM,
    maxmem: MAX_MEM,
  }
  // NOTE: the password is passed through verbatim (UTF-8, no NFKC normalisation)
  // because scripts/seed.ts writes hashes with a bare `scryptSync(pw, salt, 64)`.
  // Normalising here would make seeded non-ASCII passwords unverifiable.
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, keyLength, options, (error, derivedKey) => {
      if (error) reject(error)
      else resolve(derivedKey)
    })
  })
}

/** Hash a plaintext password. The salt and cost are embedded in the result. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES)
  const key = await derive(password, salt, KEY_BYTES, SCRYPT_COST)
  return [PREFIX, String(SCRYPT_COST), salt.toString('base64'), key.toString('base64')].join('$')
}

/**
 * Constant-time verification of a plaintext password against a stored hash.
 * Never throws — a malformed or unknown hash format simply fails.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const parts = hash.split('$')
    if (parts.length !== 4) return false

    const [scheme, costRaw, saltRaw, keyRaw] = parts
    if (scheme !== PREFIX) return false
    if (costRaw === undefined || saltRaw === undefined || keyRaw === undefined) return false

    const cost = Number.parseInt(costRaw, 10)
    if (!Number.isInteger(cost) || cost < MIN_COST || cost > MAX_COST) return false
    // scrypt requires N to be a power of two.
    if ((cost & (cost - 1)) !== 0) return false

    const salt = Buffer.from(saltRaw, 'base64')
    const expected = Buffer.from(keyRaw, 'base64')
    if (salt.length === 0 || expected.length === 0) return false

    const actual = await derive(password, salt, expected.length, cost)
    if (actual.length !== expected.length) return false

    return timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

let decoyHash: Promise<string> | null = null

/**
 * Burn the same amount of CPU as a real verification, then fail.
 *
 * Called when no user matches the submitted email so that "unknown account" and
 * "wrong password" take indistinguishable time — otherwise the login form leaks
 * which addresses are registered.
 */
export async function verifyPasswordDecoy(password: string): Promise<false> {
  decoyHash ??= hashPassword(randomUUID())
  await verifyPassword(password, await decoyHash)
  return false
}
