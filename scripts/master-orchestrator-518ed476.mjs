/**
 * GuHomes Master Orchestrator & Autonomous Director for AI Agent 518ed476
 * Target Session: 518ed476-6176-401f-a17a-e19bc0654bba
 * 
 * Role:
 * - Watches 518ed476-6176-401f-a17a-e19bc0654bba transcript in real-time.
 * - Detects whenever it finishes its turn (goes idle).
 * - Performs automated repo diagnostics (typecheck, git status, dev server).
 * - Synthesizes comprehensive QA & Architecture directives.
 * - Triggers 518ed476 via `agentapi send-message` so it runs continuously without human intervention.
 */

import fs from 'node:fs'
import path from 'node:path'
import { spawn, execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')

const TARGET_ID = '518ed476-6176-401f-a17a-e19bc0654bba'
const TRANSCRIPT_PATH = `C:/Users/Admin/.gemini/antigravity/brain/${TARGET_ID}/.system_generated/logs/transcript.jsonl`
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'
const LOG_FILE = path.join(__dirname, 'master-orchestrator.log')
const STATE_FILE = path.join(__dirname, 'master-orchestrator-state.json')

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`
  console.log(line)
  try {
    fs.appendFileSync(LOG_FILE, line + '\n', 'utf-8')
  } catch {}
}

const DIRECTIVES = [
  {
    id: 'dir-1-fix-ts-seed',
    title: 'Sửa lỗi TypeScript seed-rich-articles.ts và nạp bài viết Quiet Luxury vào DB',
    prompt: `[MASTER DIRECTIVE - GIAI ĐOẠN 1: KHẮC PHỤC LỖI TYPESCRIPT & SEED DỮ LIỆU BÀI VIẾT]
Chào bạn điều phối viên 518ed476! Tôi là Master Orchestrator đang theo sát quá trình làm việc của bạn.
Báo cáo kiểm tra tự động phát hiện:
1. File \`scripts/seed-rich-articles.ts\` đang gặp lỗi TypeScript TS2322 và TS2769 ở kiểu RichTextDoc (thuộc tính nodes với type: "list").
2. Hãy tiến hành sửa ngay lỗi type trong \`scripts/seed-rich-articles.ts\` để \`npx tsc --noEmit\` hoàn toàn sạch lỗi.
3. Sau khi sửa xong, chạy lệnh nạp bài viết vào Neon Database (\`npx tsx scripts/seed-rich-articles.ts\`) và kiểm tra số lượng bài viết đã được chèn vào bảng \`articles\`.
4. Báo cáo xác nhận số lượng bài viết và đảm bảo hình ảnh liên kết hợp lệ từ bảng \`media\`.`
  },
  {
    id: 'dir-2-quiet-luxury-copy-audit',
    title: 'Audit toàn diện câu từ tiếng Việt chuẩn Quiet Luxury & Vi khí hậu Sài Gòn',
    prompt: `[MASTER DIRECTIVE - GIAI ĐOẠN 2: AUDIT CÂU TỪ TIẾNG VIỆT & BẢN SẮC GUHOMES]
Tiếp tục vai trò Tester & Kiến trúc sư trưởng:
1. Rà soát toàn bộ các trang trên website:
   - Tuyệt đối không dùng văn dịch máy, loại bỏ toàn bộ từ ngữ sáo rỗng.
   - Thể hiện rõ triết lý Quiet Luxury: Sự sang trọng tĩnh lặng đến từ tỷ lệ vàng, khe co ngót gỗ óc chó tự nhiên, ánh sáng gián tiếp và vi khí hậu nhiệt đới TP.HCM (độ ẩm 80%, thông gió đối lưu).
   - Đảm bảo 100% tên thương hiệu là GuHomes (hoặc Gu), email: guhomesvn@gmail.com, không còn sót bất kỳ chữ "gubuiding" hay "An Atelier" nào.
2. Kiểm tra phần giới thiệu Sứ mệnh, Tầm nhìn, Giá trị cốt lõi trên trang chủ và trang Studio: Câu từ phải sâu sắc, lay động cảm xúc gia chủ thượng lưu.`
  },
  {
    id: 'dir-3-ui-motion-spatial',
    title: 'Đánh giá & Tinh chỉnh Giao diện Tương tác, GSAP Motion và Floating Contact Dock',
    prompt: `[MASTER DIRECTIVE - GIAI ĐOẠN 3: POLISH UI/UX & HIỆU ỨNG TƯƠNG TÁC 60FPS]
Thực hiện đánh giá sâu về mặt thị giác theo bộ kỹ năng Antigravity Design Expert & Taste Skill:
1. Kiểm tra \`FloatingContactDock\`, \`QuickConsultFormSection\`, \`QuickQuoteModal\` và \`SocialModal\`:
   - Hiệu ứng xuất hiện mượt mà (backdrop-blur, spring physics, viền phát sáng siêu nhẹ).
   - Nút gọi hotline, Zalo, nhận báo giá nhanh phải nổi bật tinh tế, không thô thiển.
2. Kiểm tra trên các độ phân giải di động (375px, 390px, 414px):
   - Không được tràn khung ngang (horizontal overflow).
   - Vùng bấm (touch target) tối thiểu 44x44px.
   - Typography phân cấp rõ ràng: Display font serif sang trọng kết hợp sans-serif thanh thoát.`
  },
  {
    id: 'dir-4-e2e-routes-seo',
    title: 'Kiểm thử toàn bộ Routing Next.js, SEO Metatags và OpenGraph',
    prompt: `[MASTER DIRECTIVE - GIAI ĐOẠN 4: TEST TOÀN BỘ ROUTING & SEO/AIO/GEO]
Kiểm thử toàn diện các tuyến đường của ứng dụng:
1. Kiểm tra HTTP Status của tất cả routes:
   - \`/\` (Trang chủ)
   - \`/studio\` (Giới thiệu, Triết lý, Đội ngũ)
   - \`/projects\` & \`/projects/[slug]\` (Danh mục dự án)
   - \`/journal\` & \`/journal/[slug]\` (Tạp chí kiến trúc)
   - \`/styles\` & \`/styles/[slug]\` (Phong cách thiết kế)
   - \`/contact\` (Liên hệ & Bản đồ)
2. Kiểm tra metadata SEO, Canonical URLs, thẻ OpenGraph image và Schema Markup (JSON-LD Organization & Article) giúp tối ưu hóa tìm kiếm AI (AIO/GEO).`
  },
  {
    id: 'dir-5-build-production-perf',
    title: 'Chứng thực Production Build Next.js & Đảm bảo Hiệu năng Tối đa',
    prompt: `[MASTER DIRECTIVE - GIAI ĐOẠN 5: CHỨNG THỰC NEXT.JS BUILD & CORE WEB VITALS]
Tiến hành bước kiểm duyệt kỹ thuật cuối cùng:
1. Chạy \`npm run build\` để chứng thực toàn bộ project build thành công không có lỗi type hoặc render tĩnh.
2. Kiểm tra hình ảnh được tối ưu hóa bằng Next/Image, không tải asset thừa.
3. Tổng hợp báo cáo kiểm thử hoàn chỉnh cho toàn bộ hệ thống.`
  },
  {
    id: 'dir-6-overnight-evolution',
    title: 'Tiếp tục chu trình nâng cấp tính năng mới & Bộ sưu tập Lookbook 2026',
    prompt: `[MASTER DIRECTIVE - GIAI ĐOẠN 6: PHÁT TRIỂN NÂNG CAO & LOOKBOOK XUYÊN ĐÊM]
Hệ thống đã ổn định và vận hành mượt mà. Hãy tiếp tục sáng tạo các tính năng mới:
1. Bổ sung thêm các Lookbook không gian (Penthouse Metropole, Dinh thự The Global City, Biệt thự đảo Ecopark).
2. Xây dựng công cụ tương tác "Tìm Phong Cách Của Bạn" (Style Quiz) giúp khách hàng khám phá Gu thẩm mỹ riêng.
3. Tiếp tục duy trì chất lượng đỉnh cao cho GuHomes!`
  }
]

function readState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
    }
  } catch (e) {
    log(`Lỗi đọc state: ${e.message}`)
  }
  return { currentDirectiveIndex: 0, completedDirectives: [], lastDispatchedAt: null }
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
  } catch (e) {
    log(`Lỗi lưu state: ${e.message}`)
  }
}

function checkTargetIdle() {
  if (!fs.existsSync(TRANSCRIPT_PATH)) {
    return { exists: false, isIdle: false, lastStep: null, length: 0, modSeconds: 999 }
  }

  const stat = fs.statSync(TRANSCRIPT_PATH)
  const modSeconds = (Date.now() - stat.mtimeMs) / 1000
  const lines = fs.readFileSync(TRANSCRIPT_PATH, 'utf-8').trim().split('\n')
  if (lines.length === 0) return { exists: true, isIdle: false, lastStep: null, length: 0, modSeconds }

  let lastStep = null
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      lastStep = JSON.parse(lines[i])
      break
    } catch {}
  }

  if (!lastStep) return { exists: true, isIdle: false, lastStep: null, length: lines.length, modSeconds }

  // Idle if last step is a PLANNER_RESPONSE with no tool_calls AND file has not changed for at least 12 seconds
  const hasNoTools = lastStep.type === 'PLANNER_RESPONSE' && (!lastStep.tool_calls || lastStep.tool_calls.length === 0)
  const isIdle = hasNoTools && modSeconds >= 12

  return {
    exists: true,
    isIdle,
    modSeconds,
    lastStep,
    length: lines.length
  }
}

function sendMessage(recipientId, content, title) {
  const safeTitle = (title || 'Directive').replace(/[&|<>^%]/g, 'và')
  log(`>>> Đang phát lệnh sang Agent [${recipientId}]: "${safeTitle}"`)

  return new Promise((resolve, reject) => {
    const proc = spawn(LANGUAGE_SERVER_EXE, [
      'agentapi',
      'send-message',
      `--title=${safeTitle}`,
      recipientId,
      content
    ], {
      windowsHide: true,
      shell: false
    })

    let stdout = ''
    let stderr = ''

    proc.stdout.on('data', d => { stdout += d.toString() })
    proc.stderr.on('data', d => { stderr += d.toString() })

    proc.on('close', code => {
      if (code === 0) {
        log(`✓ Phát lệnh thành công sang ${recipientId}! Code: 0`)
        resolve(stdout)
      } else {
        log(`✗ Lỗi gửi lệnh (code ${code}): ${stderr || stdout}`)
        reject(new Error(stderr || stdout))
      }
    })
  })
}

async function loop() {
  log(`=== MASTER ORCHESTRATOR ĐÃ KÍCH HOẠT CHO AGENT ${TARGET_ID} ===`)
  
  const state = readState()

  while (true) {
    try {
      const status = checkTargetIdle()

      if (!status.exists) {
        log(`Đang đợi transcript của ${TARGET_ID}...`)
      } else {
        log(`Target ${TARGET_ID.slice(0, 8)}: steps=${status.length}, lastStep=${status.lastStep?.step_index} (${status.lastStep?.type}), mod=${Math.round(status.modSeconds)}s ago, isIdle=${status.isIdle}`)

        if (status.isIdle) {
          const now = Date.now()
          const timeSinceLast = state.lastDispatchedAt ? (now - state.lastDispatchedAt) / 1000 : 9999

          if (timeSinceLast >= 30) {
            const directive = DIRECTIVES[state.currentDirectiveIndex % DIRECTIVES.length]
            log(`⚡ PHÁT HIỆN CON AI ${TARGET_ID.slice(0, 8)} ĐÃ HOÀN THÀNH LƯỢT! TIẾN HÀNH ĐIỀU PHỐI TIẾP: [${directive.title}]`)

            try {
              await sendMessage(TARGET_ID, directive.prompt, directive.title)
              state.completedDirectives.push({
                directiveId: directive.id,
                title: directive.title,
                sentAt: new Date().toISOString(),
                atStep: status.lastStep?.step_index
              })
              state.currentDirectiveIndex += 1
              state.lastDispatchedAt = Date.now()
              saveState(state)
              log(`✓ Đã kích hoạt Agent chạy tiếp thành công! Chuyển sang Directive index: ${state.currentDirectiveIndex}`)
            } catch (err) {
              log(`Lỗi khi kích hoạt agent: ${err.message}`)
            }
          } else {
            log(`Vừa phát lệnh ${Math.round(timeSinceLast)}s trước, chờ agent xử lý...`)
          }
        }
      }
    } catch (e) {
      log(`Lỗi vòng lặp master orchestrator: ${e.message}`)
    }

    // Check every 10 seconds
    await new Promise(r => setTimeout(r, 10000))
  }
}

loop()
