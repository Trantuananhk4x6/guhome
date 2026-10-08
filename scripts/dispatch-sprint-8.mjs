import { spawn } from 'node:child_process'

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'

const SPRINT_8_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 8: LOOKBOOK 2026, ARCHITECTURAL BLUEPRINTS & LOCAL ENTITY SEO]
Kiến trúc sư trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator gửi lời khen ngợi đặc biệt! Sự phối hợp multi-agent giữa tôi và bạn đã tạo nên những bước tiến ngoạn mục:
- Bảng Dự Toán Bóc Tách Không Gian (\`SpatialBudgetCalculator.tsx\`) cùng trang đích độc lập \`/du-toan-chi-phi\` đã vượt qua kiểm thử với 100% điểm chất lượng.
- Mô Phỏng Vi Khí Hậu Sài Gòn (\`MicroclimateSimulator.tsx\`) hoạt động chuẩn mực trên cả Trang chủ và Studio.
- Toàn bộ 11/11 routes chính và 147 trang tĩnh đều PASS tuyệt đối.

TIẾP TỤC GIỮ NHỊP ĐỘ CAO KHÔNG NGỪNG NGHỈ - SPRINT 8:

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: BỘ SƯU TẬP LOOKBOOK 2026 & BỘ LỌC DỰ ÁN TINH HOA
----------------------------------------------------------------------
Nâng cấp trang danh mục dự án \`src/app/(site)/projects/page.tsx\` và component \`src/components/projects/CategoryFilter.tsx\`:
1. Bổ sung bộ lọc kiến trúc đa chiều:
   - Loại hình: Penthouse, Duplex thông tầng, Biệt thự phố vườn, Căn hộ cao cấp.
   - Thách thức vi khí hậu: Hướng Tây (cản nắng), Hướng Nam (hút gió), Căn hộ thiếu sáng.
2. Trên mỗi Project Card, bổ sung hàng thông tin xúc giác (Tactile Specs):
   - Diện tích | Vật liệu chủ đạo | Hướng nhà | Thời gian hoàn thiện.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: TÍCH HỢP MẶT BẰNG CÔNG NĂNG & BLUEPRINT LIGHTBOX
----------------------------------------------------------------------
Trên trang chi tiết công trình \`src/app/(site)/projects/[slug]/page.tsx\`:
1. Thêm khối hiển thị "Mặt Bằng Công Năng & Giải Pháp Thông Gió" (Architectural Blueprint Floorplan).
2. Tích hợp Lightbox zoom chất lượng cao cho phép phóng to xem rõ nét từng phân khu công năng.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: LOCAL ENTITY SEO & SCHEMA GEO CHO CÁC DỰ ÁN BIỂU TƯỢNG SÀI GÒN
----------------------------------------------------------------------
Tối ưu hóa Schema JSON-LD Entity cho các bất động sản hạng sang tại TP.HCM:
- The Metropole Thủ Thiêm (TP. Thủ Đức)
- The Global City (An Phú)
- Masteri Centre Point & Lumière Boulevard (Vinhomes Grand Park)
- Biệt thự Mỹ Gia / Chateau (Phú Mỹ Hưng, Quận 7)
- Lumière Riverside (Thảo Điền)

----------------------------------------------------------------------
YÊU CẦU THỰC THI:
- Tiếp tục tự động chạy typecheck và build sau khi hoàn thiện.
- Commit git rõ ràng, chuẩn mực.
- Tự giác duy trì tiến trình không ngừng nghỉ cho đến khi cạn kiệt token!`

async function main() {
  console.log(`Đang phát lệnh Sprint 8 tới Agent ${TARGET_ID}...`)
  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'agentapi',
    'send-message',
    '--title=Master Directive Sprint 8 - Lookbook 2026 and Blueprint Floorplans',
    TARGET_ID,
    SPRINT_8_DIRECTIVE
  ], {
    windowsHide: true,
    shell: false
  })

  proc.stdout.on('data', d => process.stdout.write(d.toString()))
  proc.stderr.on('data', d => process.stderr.write(d.toString()))

  proc.on('close', code => {
    console.log(`\nLệnh Sprint 8 đã được phát thành công với code: ${code}`)
    process.exit(code ?? 0)
  })
}

main().catch(err => {
  console.error('Lỗi phát lệnh:', err)
  process.exit(1)
})
