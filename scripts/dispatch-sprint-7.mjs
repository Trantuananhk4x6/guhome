import { spawn } from 'node:child_process'

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'

const SPRINT_7_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 7: SPATIAL BUDGET CALCULATOR & SAIGON CLIMATE SIMULATOR]
Kiến trúc sư trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Chúc mừng bạn đã xuất sắc vượt qua các giai đoạn trước với chất lượng 10/10. Hệ thống đang vận hành hoàn hảo với 0 lỗi build (147/147 static pages prerendered).
Tuy nhiên, cuộc đua biến GuHomes thành NỀN TẢNG KIẾN TRÚC & NỘI THẤT SỐ 1 VIỆT NAM không dừng lại. Hãy tiếp tục tăng tốc NGAY LẬP TỨC xuyên đêm với SPRINT 7!

YÊU CẦU: Hãy sử dụng \`invoke_subagent\` để chia sẻ công việc cho các subagent chuyên trách chạy song song:

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: BẢNG DỰ TOÁN BÓC TÁCH KHÔNG GIAN CHI TIẾT (SPATIAL BUDGET CALCULATOR)
----------------------------------------------------------------------
Nâng cấp hoặc xây dựng component \`src/components/sections/SpatialBudgetCalculator.tsx\` (và tích hợp vào QuickQuoteModal hoặc trang riêng /du-toan-chi-phi):
1. Không chỉ tính diện tích tổng, mà cho phép gia chủ chọn bóc tách chi tiết từng phòng:
   - Phòng Khách & Bếp (Vách ốp gỗ óc chó tự nhiên, đảo bếp đá Travertine nguyên khối, hệ tủ bếp kịch trần phụ kiện Blum/Hafele).
   - Phòng Ngủ Master (Giường may đo bọc da bò Ý/vải lanh Bỉ, tủ áo cánh kính Moru tích hợp đèn LED 2700K âm tủ, vách đầu giường vữa vôi Calce).
   - Phòng Tắm Master (Đá tự nhiên chống trượt, vòi sen âm tường mạ đồng xước, bồn tắm độc lập).
   - Ban Công & Logia Xanh (Vườn nhiệt đới thu nhỏ, hệ lam gỗ thông gió tự nhiên, sàn gỗ composite chịu nước).
2. Hiển thị bảng phân bổ tỷ trọng thông minh:
   - Phần thô & cải tạo vi khí hậu (cách âm, chống thấm, xử lý tường vôi).
   - Phần nội thất may đo xưởng mộc GuHomes (gỗ tự nhiên FAS, sơn phủ hữu cơ).
   - Phần thiết bị & phụ kiện cao cấp.
3. Cho phép khách hàng 1-click gửi toàn bộ bảng bóc tách này sang Zalo KTS Trưởng hoặc gửi form lưu vào database.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: MÔ PHỎNG GIẢI PHÁP VI KHÍ HẬU SÀI GÒN (SAIGON CLIMATE SIMULATOR)
----------------------------------------------------------------------
Xây dựng widget tương tác trực quan \`src/components/sections/MicroclimateSimulator.tsx\` và gắn vào trang \`/studio\` hoặc trang chủ:
1. Bộ chọn hướng nhà:
   - Hướng Tây / Tây Nam (Nắng xế chiều gay gắt, hấp thụ nhiệt cao) -> Giải pháp GuHomes: Hệ lam gỗ xoay, kính Low-E cản nhiệt, tường vữa vôi làm mát.
   - Hướng Nam / Đông Nam (Đón gió sông Sài Gòn, độ ẩm cao 80%) -> Giải pháp GuHomes: Thông gió đối lưu xuyên phòng, khe co ngót gỗ 4mm, dầu lau thẩm thấu chống mốc.
   - Hướng Đông (Nắng sớm trong lành, cần tối ưu ánh sáng tự nhiên).
2. Tương tác trực quan: Người dùng chuyển đổi qua lại giữa Mùa Mưa và Mùa Khô, hiển thị thông số chênh lệch nhiệt độ thực tế (-3°C so với ngoài trời) và độ ẩm cân bằng lý tưởng 55-65%.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: AUDIT GIAO DIỆN & TỐI ƯU HÓA DI ĐỘNG (MOBILE FLUIDITY & ZERO JANK)
----------------------------------------------------------------------
1. Kiểm tra trên viewport 375px (iPhone SE) và 390px (iPhone 14/15/16):
   - Đảm bảo toàn bộ thanh trượt, nút bấm, modal đều có touch targets >= 44px.
   - Đảm bảo không bị giật lag (sử dụng will-change: transform hợp lý, không animate layout properties).
2. Chạy \`npm run typecheck\` và \`npm run build\` để chứng thực toàn bộ 100% sạch lỗi.
3. Commit git chuẩn mực trên nhánh \`enhaceta\`.

Hãy triệu tập các subagent và triển khai ngay lập tức không ngừng nghỉ!`

async function main() {
  console.log(`Đang phát lệnh Sprint 7 tới Agent ${TARGET_ID}...`)
  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'agentapi',
    'send-message',
    '--title=Master Directive Sprint 7 - Spatial Budget & Climate Simulator',
    TARGET_ID,
    SPRINT_7_DIRECTIVE
  ], {
    windowsHide: true,
    shell: false
  })

  proc.stdout.on('data', d => process.stdout.write(d.toString()))
  proc.stderr.on('data', d => process.stderr.write(d.toString()))

  proc.on('close', code => {
    console.log(`\nLệnh Sprint 7 đã được phát thành công với code: ${code}`)
    process.exit(code ?? 0)
  })
}

main().catch(err => {
  console.error('Lỗi phát lệnh:', err)
  process.exit(1)
})
