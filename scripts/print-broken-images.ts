import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const publicDir = join(process.cwd(), 'public')

function getAllFiles(dir: string, ext: string[]): string[] {
  let results: string[] = []
  const list = readdirSync(dir)
  for (const file of list) {
    const fullPath = join(dir, file)
    const stat = statSync(fullPath)
    if (stat && stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        results = results.concat(getAllFiles(fullPath, ext))
      }
    } else if (ext.some((e) => file.endsWith(e))) {
      results.push(fullPath)
    }
  }
  return results
}

const staticPathRegex = /['"`](\/(?:media|brand|basis|images)\/[^'"`\s\?]+)['"`]/g
const srcFiles = getAllFiles(join(process.cwd(), 'src'), ['.tsx', '.ts', '.css'])

console.log('=== DANH SÁCH 16 ĐƯỜNG DẪN ẢNH BỊ LỖI TRONG MÃ NGUỒN ===\n')

for (const file of srcFiles) {
  const content = readFileSync(file, 'utf-8')
  content.split('\n').forEach((line, idx) => {
    let match
    while ((match = staticPathRegex.exec(line)) !== null) {
      const rawPath = match[1]
      if (rawPath && !rawPath.includes('${')) {
        const cleanPath = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath
        const fullOnDisk = join(publicDir, cleanPath)
        if (cleanPath.includes('.')) {
          if (!existsSync(fullOnDisk)) {
            console.log(`${file.replace(process.cwd(), '')}:${idx + 1} -> ${rawPath}`)
          }
        } else {
          if (
            !existsSync(`${fullOnDisk}-1600.webp`) &&
            !existsSync(`${fullOnDisk}-800.webp`) &&
            !existsSync(`${fullOnDisk}.webp`)
          ) {
            console.log(`${file.replace(process.cwd(), '')}:${idx + 1} (base) -> ${rawPath}`)
          }
        }
      }
    }
  })
}
