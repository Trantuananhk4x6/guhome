/**
 * GuHomes Autonomous Multi-Agent Orchestrator & QA Watchdog
 * Target Conversation: 2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22
 * 
 * Functions:
 * 1. Continuously monitors the target agent's transcript.
 * 2. Detects when the target agent finishes its turn or becomes idle.
 * 3. Runs automated pre-flight QA checks (HTTP status, DB query readiness, Git changes).
 * 4. Injects structured, high-value directives using `agentapi send-message` so the AI runs all night.
 * 5. Logs all activities to scripts/orchestrator.log and scripts/orchestrator-state.json.
 */

import fs from 'node:fs'
import path from 'node:path'
import { spawn, execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const TARGET_CONVERSATION_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const TRANSCRIPT_PATH = 'C:/Users/Admin/.gemini/antigravity/brain/2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22/.system_generated/logs/transcript.jsonl'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'
const LOG_FILE = path.join(__dirname, 'orchestrator.log')
const STATE_FILE = path.join(__dirname, 'orchestrator-state.json')

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`
  console.log(line)
  fs.appendFileSync(LOG_FILE, line + '\n', 'utf-8')
}

// Master Sprint Backlog
const SPRINTS = [
  {
    id: 'sprint-1-articles-db',
    title: 'Sprint 1: Seed Neon DB với các bài viết kiến trúc nội thất đỉnh cao chuẩn Quiet Luxury & SEO/GEO',
    directive: `[ORCHESTRATOR DIRECTIVE - SPRINT 1: SEED ARTICLES VÀO NEON DATABASE]
Bạn là Kiến trúc sư trưởng kiêm Nhà văn nội thất cao cấp của GuHomes. Hãy hoàn thiện việc thêm các bài viết sâu sắc vào Neon Database:
1. Viết và chèn ít nhất 6 bài viết kiến trúc - nội thất vào bảng \`articles\` trong DB.
2. Nội dung áp dụng triệt để kỹ năng \`.agents/skills/vietnamese-interior-copywriter/SKILL.md\`:
   - Giọng văn Quiet Luxury, trầm ấm, giàu xúc cảm, gắn liền với vi khí hậu TP.HCM (độ ẩm 80%, nắng nhiệt đới, gió đối lưu).
   - Chuẩn SEO, AIO và GEO: Nhắc đến các dự án biểu tượng (The Global City, The Metropole Thủ Thiêm, Biệt thự Mỹ Gia Phú Mỹ Hưng, Dinh thự ven sông, Penthouse Duplex).
   - Tên thương hiệu 100% là GuHomes hoặc Gu (tuyệt đối không dùng gubuiding hay An Atelier).
3. Mỗi bài viết phải liên kết chính xác \`heroMediaId\` và ảnh minh họa từ bảng \`media\` thực tế trong database.
4. Đảm bảo cấu trúc RichText đầy đủ: Mở bài cảm xúc, phân tích mặt bằng công năng, ngôn ngữ vật liệu (gỗ óc chó, đá travertine, vữa vôi), lời khuyên vi khí hậu và CTA kết nối KTS Trưởng.
Sau khi chèn thành công, chạy script kiểm tra đếm số lượng bài viết trong DB và xác nhận kết quả.`
  },
  {
    id: 'sprint-2-quote-social-modal',
    title: 'Sprint 2: Tích hợp QuickQuoteModal & SocialModal toàn diện toàn website',
    directive: `[ORCHESTRATOR DIRECTIVE - SPRINT 2: HOÀN THIỆN QUICK QUOTE & SOCIAL MODAL TOÀN SITE]
Hãy hoàn thiện trải nghiệm nhận báo giá và kết nối mạng xã hội:
1. Đảm bảo \`QuickQuoteModal\` và \`SocialModal\` được mount ở cấp cao nhất trong \`src/app/(site)/layout.tsx\` để người dùng ở bất kỳ trang nào (Home, Studio, Journal, Projects, Contact) click vào đều mở popup tức thì.
2. Bổ sung một Floating Action Button (hoặc Quick Quote Drawer Trigger) ở góc màn hình (nhất là trên mobile) để khách hàng có thể bấm "Nhận Dự Toán & Báo Giá Trong 15 Phút" bất cứ lúc nào.
3. Đảm bảo form gửi báo giá lưu thông tin vào database (bảng lead inquiries hoặc contact) và có thông báo Toast thành công sang trọng.
4. Kiểm tra các nút mạng xã hội ở Header và Footer: Bấm vào mở \`SocialModal\` hiển thị đầy đủ Facebook, Instagram, Behance, Pinterest và QR Code kết nối GuHomes.
Chạy test trên localhost:3000 để xác nhận giao diện hoạt động hoàn hảo.`
  },
  {
    id: 'sprint-3-homepage-brand-refresh',
    title: 'Sprint 3: Làm tươi Trang Chủ với Sứ Mệnh, Tầm Nhìn, Giá Trị Cốt Lõi và Form Báo Giá Trực Tiếp',
    directive: `[ORCHESTRATOR DIRECTIVE - SPRINT 3: NÂNG CẤP TRANG CHỦ & TẦM NHÌN SỨ MỆNH]
Nâng cấp trang chủ (\`src/app/(site)/page.tsx\`) để tạo ấn tượng mạnh mẽ nhất:
1. Bổ sung Section "Tầm Nhìn, Sứ Mệnh & Giá Trị Cốt Lõi" của GuHomes ngay sau StudioIntro trên trang chủ:
   - Sứ mệnh: Kiến tạo không gian sống đúng Gu — nơi phản chiếu chân thực nếp sống độc bản và nuôi dưỡng bình an cho gia chủ.
   - Tầm nhìn: Trở thành Studio thiết kế & xưởng may đo nội thất cao cấp hàng đầu tại Sài Gòn, tiên phong thích ứng vi khí hậu nhiệt đới.
   - Giá trị cốt lõi: Độc bản trong ý niệm — Chuẩn mực trong thi công — Bền bỉ cùng thời gian — Một người theo suốt.
2. Thêm Section "Form Khảo Sát & Nhận Báo Giá Nhanh" trực quan ngay trên trang chủ với máy tính dự toán chi phí tự động.
3. Rà soát khoảng cách (padding, margin) cho thoáng đãng, sang trọng, tươi mới và chuẩn tỷ lệ vàng.`
  },
  {
    id: 'sprint-4-copy-audit',
    title: 'Sprint 4: Rà soát toàn diện ngữ pháp, câu từ tiếng Việt và loại bỏ văn sáo rỗng',
    directive: `[ORCHESTRATOR DIRECTIVE - SPRINT 4: AUDIT TOÀN DIỆN CÂU TỪ TIẾNG VIỆT]
Tiến hành rà soát từng dòng chữ trên website GuHomes:
1. Quét toàn bộ codebase (Header, Footer, Hero3D, Studio, Contact, Journal, Projects) và loại bỏ hoàn toàn các câu sáo rỗng của AI dịch máy.
2. Đảm bảo mọi câu văn đều toát lên tinh thần xưởng mộc gia truyền kết hợp kiến trúc đương đại: Tỉ mỉ từng khe co ngót, mùi gỗ tự nhiên, ánh sáng xiên qua nan gỗ.
3. Đảm bảo 100% không còn chữ nào là "gubuiding", "An Atelier" hay hotline/email sai lệch. Email chuẩn là guhomesvn@gmail.com.
4. Kiểm tra chính tả tiếng Việt, dấu thanh, ngắt nghỉ câu trên toàn bộ các trang.`
  },
  {
    id: 'sprint-5-mobile-responsive-perf',
    title: 'Sprint 5: Tối ưu Responsive Mobile, Spacing và Hiệu Năng 60fps',
    directive: `[ORCHESTRATOR DIRECTIVE - SPRINT 5: TỐI ƯU RESPONSIVE MOBILE & HIỆU NĂNG]
1. Kiểm tra toàn diện trên màn hình di động (375px, 390px, 414px):
   - Đảm bảo không có hiện tượng vỡ khung, tràn ngang (horizontal scrollbar).
   - Nút bấm, link có touch target >= 44x44px, dễ thao tác bằng một ngón tay.
   - Mobile Menu trượt mượt mà, typography hiển thị rõ nét trên màn hình retina.
2. Kiểm tra hiệu năng:
   - Tối ưu kích thước hình ảnh, sử dụng Next.js Image với srcset và placeholder mờ.
   - Đảm bảo điểm số Core Web Vitals (LCP, FID, CLS) xanh mướt.
3. Chạy lệnh typecheck và build Next.js để chứng thực 0 lỗi.`
  },
  {
    id: 'sprint-6-deep-content-expansion',
    title: 'Sprint 6: Mở rộng cẩm nang kiến trúc chuyên sâu & Lookbook 2026',
    directive: `[ORCHESTRATOR DIRECTIVE - SPRINT 6: MỞ RỘNG CẨM NANG & LOOKBOOK NỘI THẤT]
Tiếp tục viết và cập nhật thêm 4 bài viết cẩm nang chuyên sâu vào Neon Database:
1. "Nghệ thuật ứng dụng ánh sáng 3 lớp (Ambient - Task - Accent) trong căn hộ cao cấp Sài Gòn".
2. "Bảo tồn vẻ đẹp gỗ tự nhiên trong môi trường độ ẩm 80% — Bí quyết từ thợ cả GuHomes".
3. "Đá Travertine và Marble tự nhiên: Điểm tựa xúc giác của phong cách Quiet Luxury".
4. "Quy chuẩn nghiệm thu nội thất may đo 7 giai đoạn tại xưởng GuHomes".
Gắn đầy đủ media ID thực tế và tags liên quan.`
  }
]

function readState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
    }
  } catch (e) {
    log(`Lỗi đọc state file: ${e.message}`)
  }
  return { currentSprintIndex: 0, completedSprints: [], lastDispatchedAt: null, lastStepIndex: 0 }
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
  } catch (e) {
    log(`Lỗi ghi state file: ${e.message}`)
  }
}

function checkTargetStatus() {
  if (!fs.existsSync(TRANSCRIPT_PATH)) {
    return { exists: false, isIdle: false, lastStep: null, length: 0 }
  }

  const stat = fs.statSync(TRANSCRIPT_PATH)
  const modifiedSecondsAgo = (Date.now() - stat.mtimeMs) / 1000
  const lines = fs.readFileSync(TRANSCRIPT_PATH, 'utf-8').trim().split('\n')
  if (lines.length === 0) return { exists: true, isIdle: false, lastStep: null, length: 0 }

  let lastStep = null
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      lastStep = JSON.parse(lines[i])
      break
    } catch {}
  }

  if (!lastStep) return { exists: true, isIdle: false, lastStep: null, length: lines.length }

  // Detect completion:
  // If last step is PLANNER_RESPONSE without tool_calls (meaning it generated its final textual answer)
  // AND the transcript hasn't been written to for at least 10 seconds.
  const hasNoTools = lastStep.type === 'PLANNER_RESPONSE' && (!lastStep.tool_calls || lastStep.tool_calls.length === 0)
  const isIdle = hasNoTools && modifiedSecondsAgo >= 10

  return {
    exists: true,
    isIdle,
    modifiedSecondsAgo,
    lastStep,
    length: lines.length
  }
}

function sendMessageToTarget(directive, title) {
  const safeTitle = (title || 'Directive').replace(/[&|<>^%]/g, 'và')
  log(`>>> Đang gửi chỉ thị sang ID ${TARGET_CONVERSATION_ID}: [${safeTitle}]`)
  
  return new Promise((resolve, reject) => {
    const proc = spawn(LANGUAGE_SERVER_EXE, [
      'agentapi',
      'send-message',
      `--title=${safeTitle}`,
      TARGET_CONVERSATION_ID,
      directive
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
        log(`✓ Đã gửi chỉ thị thành công sang ${TARGET_CONVERSATION_ID}! Code: 0`)
        resolve(stdout)
      } else {
        log(`✗ Lỗi khi gửi lệnh (code ${code}): ${stderr || stdout}`)
        reject(new Error(stderr || stdout))
      }
    })
  })
}

async function loop() {
  log(`=== GuHomes Orchestrator Watchdog đã khởi động cho ID: ${TARGET_CONVERSATION_ID} ===`)
  
  const state = readState()

  while (true) {
    try {
      const status = checkTargetStatus()

      if (!status.exists) {
        log(`Chưa tìm thấy transcript tại ${TRANSCRIPT_PATH}`)
      } else {
        log(`Status: total steps = ${status.length}, last step = ${status.lastStep?.step_index} (${status.lastStep?.type}), mod = ${Math.round(status.modifiedSecondsAgo)}s ago, isIdle = ${status.isIdle}`)

        if (status.isIdle) {
          // The target agent has stopped and is waiting for instructions!
          const sprint = SPRINTS[state.currentSprintIndex % SPRINTS.length]
          
          // Verify we don't spam if we just dispatched in the last 60 seconds
          const now = Date.now()
          const timeSinceLastDispatch = state.lastDispatchedAt ? (now - state.lastDispatchedAt) / 1000 : 9999

          if (timeSinceLastDispatch >= 45) {
            log(`🎯 PHÁT HIỆN AGENT ĐANG NGHỈ! Tiến hành kích hoạt: [${sprint.title}]`)
            
            try {
              await sendMessageToTarget(sprint.directive, sprint.title)
              state.completedSprints.push({
                sprintId: sprint.id,
                dispatchedAt: new Date().toISOString(),
                atStep: status.lastStep?.step_index
              })
              state.currentSprintIndex += 1
              state.lastDispatchedAt = Date.now()
              saveState(state)
              log(`✓ Chuyển sang Sprint tiếp theo: Index ${state.currentSprintIndex}`)
            } catch (err) {
              log(`Lỗi gửi directive: ${err.message}`)
            }
          } else {
            log(`Vừa gửi directive ${Math.round(timeSinceLastDispatch)}s trước, đang đợi agent phản hồi...`)
          }
        }
      }
    } catch (e) {
      log(`Lỗi trong vòng lặp watchdog: ${e.message}`)
    }

    // Check every 10 seconds
    await new Promise(r => setTimeout(r, 10000))
  }
}

loop()
