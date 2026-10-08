import { spawn } from 'node:child_process'

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'

const SPRINT_14_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 14: BỘ TÍNH TOÁN BỨC XẠ NẮNG TÂY WESTERN SOLAR CALCULATOR, THƯ VIỆN BẢN VẼ MẶT CẮT KỸ THUẬT & CỔNG BẢO HÀNH GỖ MỘC DIGITAL VAULT]
Kiến trúc sư trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator và Elite QA chúc mừng toàn thể đội ngũ kỹ thuật! Sprint 13 đã hoàn thành ngoạn mục 100% và được hợp nhất trên nhánh enhaceta (Commit bb3d7cb & 98875e2):
- Phòng Thí Nghiệm Ánh Sáng Architectural Lighting Lab (ArchitecturalLightingLab.tsx) với mô phỏng CCT 1800K–4000K, so sánh hoàn màu CRI 98 vs CRI 80, chóa tổ ong UGR < 16 và nhịp sinh học Circadian.
- Khám Phá Mộng Gỗ May Đo Thạnh Xuân (WoodJoineryExplorer.tsx) với 4 hệ mộng truyền thống độc bản, dung sai ≤ 0.15mm, chịu tải 8.2 kN.
- Bản Tuyên Ngôn 10 Quy Chuẩn Thi Công Thép (TenEngineeringNormsSection.tsx) với bộ tiêu chuẩn công trường nghiêm ngặt.
- TypeScript 0 errors, 13/13 routes PASS 100%, 153/153 pages static & dynamic render hoàn hảo.

TIẾP TỤC ĐẨY MẠNH CHIẾN DỊCH XUYÊN ĐÊM - SPRINT 14:
"BỘ TÍNH TOÁN BỨC XẠ NẮNG TÂY WESTERN SOLAR CALCULATOR, THƯ VIỆN BẢN VẼ MẶT CẮT KỸ THUẬT & CỔNG BẢO HÀNH GỖ MỘC DIGITAL VAULT"

Mục tiêu cốt lõi: Giải quyết trực diện nỗi lo lớn nhất của gia chủ sở hữu Penthouse, Duplex và Nhà phố hướng Tây Sài Gòn; đồng thời phô diễn năng lực vẽ chi tiết cấu tạo kiến trúc (Architectural Detailing) và sự minh bạch cam kết hậu mãi trọn đời của xưởng mộc Thạnh Xuân.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: BỘ TÍNH TOÁN BỨC XẠ & TIẾT KIỆM NĂNG LƯỢNG MẶT KÍNH HƯỚNG TÂY (WesternSolarHeatCalculator.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/WesternSolarHeatCalculator.tsx\` và tích hợp vào \`src/app/(site)/khu-vuc/page.tsx\`, \`src/app/(site)/du-toan-chi-phi/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Thông số đầu vào tính toán:
   - Loại hình công trình: Căn hộ Penthouse / Duplex sông Sài Gòn | Nhà phố hướng Tây | Căn hộ chung cư tiêu chuẩn.
   - Diện tích bề mặt vách kính tiếp xúc nắng chiều Tây (15m² – 80m²).
   - Tầng cao công trình (Tầng 1–10: có bóng râm đô thị; Tầng 11–25: bức xạ trung bình; Tầng 26–45+: bức xạ cực đại gió lộng).
2. Kết quả phân tích nhiệt và kinh tế thời gian thực:
   - Nhiệt độ mặt kính ngoài trời lúc 15:00: 44°C – 48°C.
   - Nhiệt độ không gian trước xử lý: 34.5°C – 37°C (máy lạnh chạy quá tải 100%, ngột ngạt).
   - Nhiệt độ không gian sau giải pháp 3 lớp GuHomes (Lam trần xoay hướng nắng + Phim ceramic + Vôi Calce tiêu nhiệt): 26.5°C – 27°C (giảm ngay 7.5°C – 8.5°C).
   - Tiết kiệm điện năng điều hòa: Giảm 42% – 52% KWh/tháng (tiết kiệm từ 4.500.000đ – 11.500.000đ tiền điện mỗi tháng).
   - Bảo toàn độ ẩm thớ gỗ óc chó FAS và chống lão hóa nứt vỡ keo dán mép.
3. Nút kêu gọi: "Đăng Ký Khảo Sát Bức Xạ Nhiệt Miễn Phí Bằng Máy Đo Laser Testo".

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: THƯ VIỆN BẢN VẼ MẶT CẮT KỸ THUẬT CẤU TẠO (ArchitecturalDetailViewer.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/projects/ArchitecturalDetailViewer.tsx\` và tích hợp vào \`src/app/(site)/projects/page.tsx\` và \`src/app/(site)/studio/page.tsx\`:
1. 4 Bản vẽ mặt cắt cấu tạo chuẩn thi công thực địa:
   - Detail 01: "Vách kính hướng Tây + Hộp rèm âm trần + Miệng gió Linear Slot Diffuser giấu viền"
     * Cấu tạo 4 lớp: Vách bê tông cốt thép → Khung nhôm xingfa kính Low-E 2 lớp 24mm bơm khí Argon → Khe thoát gió khe hẹp triệt tiêu hơi ẩm đọng sương → Hộp rèm 2 lớp vải lanh Bỉ và voan khuếch tán sáng.
   - Detail 02: "Khe ron âm sàn Shadow Gap 12mm triệt tiêu len chân tường"
     * Cấu tạo: Nẹp nhôm Z-bar giấu âm chân tường, khe giãn nở 12mm cho phép sàn gỗ tự nhiên co ngót trong mùa mưa nhiệt đới 85% mà không đội sàn phồng rộp.
   - Detail 03: "Trần thạch cao tiêu âm 2 lớp Knauf + Khe hắt sáng Cove Light Warm Dim"
     * Cấu tạo: Khung xương chìm Vĩnh Tường Pro, 2 lớp tấm tiêu âm Knauf dán lưới thủy tinh chống nứt, hốc đèn hắt góc 35° giấu mắt LED chống chói UGR < 16.
   - Detail 04: "Khung treo inox 304 ốp đá Travertine tự nhiên tiêu nhiệt tường phòng khách"
     * Cấu tạo: Hệ chốt bát móc inox 304 không gỉ liên kết bulong nở bê tông, khe thoáng khí 30mm lưng phiến đá giúp thoát nhiệt bức xạ liên tục.
2. Tương tác UI:
   - Bộ chọn 4 bản vẽ với sơ đồ cấu tạo vector SVG sắc nét, lớp chú thích vật liệu chi tiết và dung sai kỹ thuật.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: CỔNG BẢO HÀNH GỖ MỘC & HỒ SƠ SỐ HÓA (DigitalHandoverVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/services/DigitalHandoverVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Tính năng tra cứu thẻ bảo hành & hồ sơ hoàn công:
   - Ô nhập mã số thẻ bảo hành (có sẵn 3 mã demo: \`GU-WTY-2025-0814\` [Metropole], \`GU-WTY-2025-0420\` [Château PMH], \`GU-WTY-2026-0280\` [Tấm Rèm Bê Tông]).
   - Hiển thị Chứng thư bảo hành điện tử chính thức:
     * Tên gia chủ & địa chỉ công trình.
     * KTS Trưởng chủ trì & Nghệ nhân trưởng xưởng Thạnh Xuân ký xác nhận.
     * Nhật ký đo độ ẩm gỗ định kỳ (EMC) 6 tháng/lần miễn phí trọn đời.
     * Thời hạn bảo hành: 5 năm kết cấu mộc, 10 năm chống mối mọt cong vênh.
     * Nút tải "Trọn bộ Hồ sơ Hoàn công A4 & Bản vẽ MEP ngầm (PDF)".

----------------------------------------------------------------------
YÊU CẦU KỸ THUẬT VÀ TIÊU CHUẨN QA BẮT BUỘC:
1. Đảm bảo 100% văn phong Quiet Luxury, chiều sâu xúc giác vật liệu, không sáo rỗng.
2. Kiểm tra TypeScript nghiêm ngặt: \`npx tsc --noEmit\` đạt 0 errors.
3. Kiểm thử routing tự động \`npx tsx scripts/test-routes-seo.ts\` đạt 100% PASS.
4. Kiểm thử production build \`npm run build\` đạt Exit Code 0.
5. Commit toàn bộ thay đổi với thông điệp:
   \`feat(sprint-14): add WesternSolarHeatCalculator, ArchitecturalDetailViewer, and DigitalHandoverVault\`

Hãy triển khai ngay bây giờ!`

console.log('Sending Master Orchestrator Sprint 14 Directive to companion agent:', TARGET_ID)

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 14', TARGET_ID, SPRINT_14_DIRECTIVE],
  { stdio: ['ignore', 'pipe', 'pipe'] }
)

let stdout = ''
let stderr = ''

child.stdout.on('data', (data) => {
  stdout += data.toString()
})

child.stderr.on('data', (data) => {
  stderr += data.toString()
})

child.on('close', (code) => {
  console.log(`Command finished with exit code ${code}`)
  if (stdout) console.log('STDOUT:\n', stdout)
  if (stderr) console.error('STDERR:\n', stderr)
  process.exit(code ?? 0)
})
