import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { config } from 'dotenv'

config({ path: join(process.cwd(), '.env.local') })

interface AuditReport {
  brokenImagePaths: { file: string; line: number; path: string }[]
  missingMediaFiles: { id: string; url: string; expectedPath: string }[]
  fontClassIssues: { file: string; line: number; className: string; reason: string }[]
  audioLeakIssues: { file: string; line: number; issue: string }[]
  duplicateComponentIssues: { file: string; issue: string }[]
  formHandlingIssues: { file: string; line: number; issue: string }[]
}

const report: AuditReport = {
  brokenImagePaths: [],
  missingMediaFiles: [],
  fontClassIssues: [],
  audioLeakIssues: [],
  duplicateComponentIssues: [],
  formHandlingIssues: [],
}

function getAllFiles(dir: string, ext: string[]): string[] {
  let results: string[] = []
  try {
    const list = readdirSync(dir)
    for (const file of list) {
      const fullPath = join(dir, file)
      const stat = statSync(fullPath)
      if (stat && stat.isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules') {
          results = results.concat(getAllFiles(fullPath, ext))
        }
      } else {
        if (ext.some((e) => file.endsWith(e))) {
          results.push(fullPath)
        }
      }
    }
  } catch (err) {
    console.error(`Error reading ${dir}:`, err)
  }
  return results
}

async function runAudit() {
  console.log('=== KHỞI ĐỘNG AUDIT TOÀN DIỆN: ẢNH, FONT, LOGIC ===\n')

  const publicDir = join(process.cwd(), 'public')
  const srcFiles = getAllFiles(join(process.cwd(), 'src'), ['.tsx', '.ts', '.css'])

  console.log(`Đã quét ${srcFiles.length} file mã nguồn trong src/`)

  // 1. Quét tham chiếu ảnh tĩnh
  const staticPathRegex = /['"`](\/(?:media|brand|basis|images)\/[^'"`\s\?]+)['"`]/g
  for (const file of srcFiles) {
    const content = readFileSync(file, 'utf-8')
    const lines = content.split('\n')

    lines.forEach((line, idx) => {
      // Bỏ qua dòng comment
      const trimmed = line.trim()
      if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
        return
      }

      let match
      while ((match = staticPathRegex.exec(line)) !== null) {
        const rawPath = match[1]
        // Bỏ qua URL dynamic, placeholder hoặc generic docs
        if (rawPath && !rawPath.includes('${') && !rawPath.includes('<') && !rawPath.includes('…')) {
          const cleanPath = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath
          const fullOnDisk = join(publicDir, cleanPath)
          
          if (cleanPath.includes('.')) {
            // Có đuôi mở rộng, phải tồn tại trực tiếp
            if (!existsSync(fullOnDisk)) {
              report.brokenImagePaths.push({
                file: file.replace(process.cwd(), ''),
                line: idx + 1,
                path: rawPath,
              })
            }
          } else {
            // Là derivative base, kiểm tra ít nhất 1 file derivative tồn tại
            const lastSlash = fullOnDisk.lastIndexOf('\\')
            const dir = fullOnDisk.slice(0, lastSlash)
            const prefix = fullOnDisk.slice(lastSlash + 1)
            const hasDerivative = existsSync(dir) && readdirSync(dir).some((f) => f.startsWith(`${prefix}-`) || f.startsWith(`${prefix}.`))
            if (!hasDerivative) {
              report.brokenImagePaths.push({
                file: file.replace(process.cwd(), ''),
                line: idx + 1,
                path: rawPath,
              })
            }
          }
        }
      }

      // 2. Quét Font classes trong JSX / CSS
      // Tailwind v4 @theme đã định nghĩa: font-display, font-body, font-mono, font-serif, font-sans.
      // Chỉ kiểm tra các class không hợp lệ xuất hiện trong thuộc tính className hoặc class
      if (line.includes('class') || line.includes('cn(')) {
        const fontClassRegex = /\bfont-(playfair|lora|cormorant|be-vietnam-pro|roboto|helvetica)\b/g
        let fontMatch
        while ((fontMatch = fontClassRegex.exec(line)) !== null) {
          const className = fontMatch[0]
          report.fontClassIssues.push({
            file: file.replace(process.cwd(), ''),
            line: idx + 1,
            className,
            reason: `Lớp ${className} không khớp với design tokens @theme trong globals.css`,
          })
        }
      }

      // 3. Quét AudioContext leak & autoplay issue
      if (line.includes('new AudioContext') || line.includes('new (window.AudioContext')) {
        // Kiểm tra xem có cơ chế close() giải phóng tài nguyên trong component không
        if (!content.includes('.close()') && !content.includes('close()')) {
          report.audioLeakIssues.push({
            file: file.replace(process.cwd(), ''),
            line: idx + 1,
            issue: 'Tạo AudioContext mà không thấy cơ chế close() giải phóng tài nguyên',
          })
        }
      }

      // 4. Quét Form Handling bugs
      if (line.includes('await submitContact(')) {
        // Kiểm tra xem kết quả có được lưu vào biến và kiểm tra .ok không
        const nextLines = lines.slice(idx, idx + 5).join(' ')
        if (!nextLines.includes('.ok') && !line.includes('const res =') && !line.includes('const result =')) {
          report.formHandlingIssues.push({
            file: file.replace(process.cwd(), ''),
            line: idx + 1,
            issue: 'Gọi submitContact nhưng không kiểm tra res.ok trước khi hiển thị thông báo thành công',
          })
        }
      }
    })

    // 5. Quét component trùng lặp trên cùng 1 trang
    if (file.includes('src\\app\\(site)') || file.includes('src/app/(site)')) {
      const hasBespokeQuiz = content.includes('<BespokeInteriorStyleQuiz')
      const hasStyleQuiz = content.includes('<StyleQuizSection')
      if (hasBespokeQuiz && hasStyleQuiz) {
        report.duplicateComponentIssues.push({
          file: file.replace(process.cwd(), ''),
          issue: 'Trang mount cả 2 component Style Quiz trùng lặp: <BespokeInteriorStyleQuiz /> và <StyleQuizSection />',
        })
      }
    }
  }

  // 6. Kiểm tra Media trong CSDL
  try {
    const { db } = await import('../src/server/db/index')
    const schema = await import('../src/server/db/schema')

    const allMedia = await db
      .select({
        id: schema.media.id,
        url: schema.media.url,
      })
      .from(schema.media)

    console.log(`Đang kiểm tra ${allMedia.length} bản ghi media trong CSDL...`)

    for (const m of allMedia) {
      const cleanUrl = m.url.trim()
      let relPath = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl
      if (!relPath.startsWith('media/')) {
        relPath = `media/${relPath}`
      }

      const fullOnDisk = join(publicDir, relPath)
      if (cleanUrl.includes('.')) {
        if (!existsSync(fullOnDisk)) {
          report.missingMediaFiles.push({
            id: m.id,
            url: m.url,
            expectedPath: fullOnDisk,
          })
        }
      } else {
        const lastSlash = fullOnDisk.lastIndexOf('\\')
        const dir = fullOnDisk.slice(0, lastSlash)
        const prefix = fullOnDisk.slice(lastSlash + 1)
        const hasDerivative = existsSync(dir) && readdirSync(dir).some((f) => f.startsWith(`${prefix}-`) || f.startsWith(`${prefix}.`))
        if (!hasDerivative) {
          report.missingMediaFiles.push({
            id: m.id,
            url: m.url,
            expectedPath: `${fullOnDisk}-*.webp`,
          })
        }
      }
    }
  } catch (dbErr) {
    console.warn('Không thể kết nối CSDL để kiểm tra bảng media:', dbErr)
  }

  // In kết quả
  console.log('\n======================================================')
  console.log('                 BÁO CÁO KẾT QUẢ AUDIT')
  console.log('======================================================')

  console.log(`\n1. LỖI ĐƯỜNG DẪN ẢNH TĨNH: ${report.brokenImagePaths.length} lỗi`)
  report.brokenImagePaths.slice(0, 10).forEach((err) => {
    console.log(`   - [${err.file}:${err.line}] Path: ${err.path}`)
  })
  if (report.brokenImagePaths.length > 10) {
    console.log(`   ... và ${report.brokenImagePaths.length - 10} lỗi khác`)
  }

  console.log(`\n2. LỖI FILE MEDIA DB KHÔNG TỒN TẠI TRÊN ĐĨA: ${report.missingMediaFiles.length} lỗi`)
  report.missingMediaFiles.slice(0, 10).forEach((err) => {
    console.log(`   - [ID: ${err.id}] URL: ${err.url} -> Không tìm thấy trên đĩa: ${err.expectedPath}`)
  })
  if (report.missingMediaFiles.length > 10) {
    console.log(`   ... và ${report.missingMediaFiles.length - 10} lỗi khác`)
  }

  console.log(`\n3. LỖI FONT CLASSES KHÔNG HỢP LỆ VỚI TAILWIND V4: ${report.fontClassIssues.length} lỗi`)
  report.fontClassIssues.slice(0, 15).forEach((err) => {
    console.log(`   - [${err.file}:${err.line}] Class: ${err.className} (${err.reason})`)
  })
  if (report.fontClassIssues.length > 15) {
    console.log(`   ... và ${report.fontClassIssues.length - 15} lỗi khác`)
  }

  console.log(`\n4. LỖI FORM HANDLING / SUBMIT CONTACT: ${report.formHandlingIssues.length} lỗi`)
  report.formHandlingIssues.forEach((err) => {
    console.log(`   - [${err.file}:${err.line}] ${err.issue}`)
  })

  console.log(`\n5. LỖI TRÙNG LẶP COMPONENT TRÊN TRANG: ${report.duplicateComponentIssues.length} lỗi`)
  report.duplicateComponentIssues.forEach((err) => {
    console.log(`   - [${err.file}] ${err.issue}`)
  })

  console.log(`\n6. CẢNH BÁO WEBAUDIO LEAK / AUTOPLAY: ${report.audioLeakIssues.length} lỗi`)
  report.audioLeakIssues.slice(0, 10).forEach((err) => {
    console.log(`   - [${err.file}:${err.line}] ${err.issue}`)
  })

  console.log('\n======================================================')
  process.exit(0)
}

runAudit().catch((e) => {
  console.error(e)
  process.exit(1)
})
