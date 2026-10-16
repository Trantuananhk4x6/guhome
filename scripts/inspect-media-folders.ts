import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const folders = [
  'can-ho-3-ngu-150m2',
  'nha-pho-100m2-1-tret-2-lau',
  'song-cat',
  'may-trang-tang-cao',
  'nhat-ky-phan-tho',
  'ben-kia-song',
  'kham-go-soi',
  'anh-kim-van-da',
  'phong-thuy-nha-o',
  'bi-quyet-chup-anh-noi-that',
  'thiet-ke-nha-dep-kho-tin',
]

for (const f of folders) {
  const p = join(process.cwd(), 'public/media', f)
  if (!existsSync(p)) {
    console.log(`[FOLDER MISSING] public/media/${f}`)
  } else {
    const files = readdirSync(p)
    console.log(`[FOUND] ${f} (${files.length} files). Sample: ${files.slice(0, 5).join(', ')}`)
  }
}
