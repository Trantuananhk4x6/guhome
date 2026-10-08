import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_24_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 24: PHÒNG NGỦ MASTER TIÊU ÂM NC-25, XƯỞNG ĐỒNG PATINA & SỐ HÓA CÔNG TRÌNH 3D LEICA]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 23:
- ArtisanLimePlasterLab, SommelierWineCigarVault, và LeadArchitectPrivateSession đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống vữa vôi khoáng Wabi-Sabi, hầm rượu cigar vi khí hậu và cổng tiếp đón 1-1 trực tiếp với KTS Trưởng đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 24:
"PHÒNG NGỦ MASTER TIÊU ÂM NC-25, XƯỞNG ĐỒNG PATINA & SỐ HÓA CÔNG TRÌNH 3D LEICA"

Mục tiêu cốt lõi: Thiết lập tiêu chuẩn cách âm phòng ngủ siêu tĩnh mịch NC-25 cho biệt thự và penthouse; nghiên cứu kỹ thuật xử lý màu bề mặt kim khí đồng thau thủ công Patina; và xây dựng công cụ số hóa công trình 3D Point Cloud Leica trước thi công.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG NGỦ MASTER TIÊU ÂM NC-25 (AcousticSanctuaryMasterSuite.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/AcousticSanctuaryMasterSuite.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Không Gian Ngủ Siêu Tĩnh Mịch:
   - Giấc ngủ là nơi tái tạo năng lượng tối thượng. Đô thị Sài Gòn với tiếng ồn 75-80dB (giao thông, máy bay) đòi hỏi cấu trúc phòng tiêu âm chuẩn NC-25 (< 25 dBA) tương đương phòng thu âm tiêu chuẩn quốc tế.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Lớp cấu trúc tiêu âm Room-in-Room:
     * 01. Vách thạch cao tiêu âm đôi Knauf Cleaneo đục lỗ ngẫu nhiên kết hợp bông khoáng Rockwool 80kg/m³ (STC 65).
     * 02. Hệ cửa gỗ đặc 55mm bọc da tự nhiên kèm gioăng từ tính kép hạ âm drop-down seal tự động khi đóng.
     * 03. Kính hộp 3 lớp chân không giảm âm dải tần thấp (Low Frequency Rumble Damping).
     * 04. Vách ốp nỉ len tự nhiên Kvadrat NRC 0.85 triệt tiêu tiếng vang flutter echo.
   - Trình mô phỏng âm thanh tương tác: So sánh tiếng ồn ngoài phố 78dB vs Không gian GuHomes 22dB êm ái.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: XƯỞNG KIM KHÍ & NGHỆ THUẬT LÊN MÀU ĐỒNG PATINA (PatinaMetalworkArtisanLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/PatinaMetalworkArtisanLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Kim Khí Có Linh Hồn:
   - Không dùng kim loại mạ điện bóng bẩy công nghiệp mau bong tróc. GuHomes dùng đồng thau nguyên khối (Solid C360 Brass), đồng đỏ và thép đen rèn lửa, tạo màu gỉ tự nhiên bằng gan sulfur và bảo vệ bằng sáp ong Renaissance.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Sắc thái Patina thời gian:
     * Sơ sinh: Raw Machined Brass (Vàng mộc phay xước tự nhiên).
     * 6 Tháng: Warm Chocolate Bronze (Nâu mật ong ấm áp nhờ mồ hôi tay gia chủ).
     * 2 Năm: Antique Muted Patina (Nâu sẫm cổ điển có chiều sâu).
     * 10 Năm: Verdigris Heritage (Ánh rêu phong quý tộc bền vững trăm năm).
   - Bộ xoay 360° quan sát chi tiết tay nắm cửa đúc đặc 2.4kg, chậu gò tay và phụ kiện rèn thủ công.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: SỐ HÓA CÔNG TRÌNH 3D POINT CLOUD LEICA (DigitalTwinEstateAudit.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/DigitalTwinEstateAudit.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Số Hóa Trước Khi Thi Công:
   - Quét 3D laser bằng Leica BLK360 độ chính xác ±1mm tạo bản sao số (Digital Twin) để giải quyết 100% xung đột dầm cột và hệ thống cơ điện ngầm MEP trước khi sản xuất đồ gỗ tại Thạnh Xuân.
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng đám mây điểm 3D (Point Cloud) mặt bằng penthouse/biệt thự.
   - Tính năng phát hiện xung đột tự động (Clash Detection): đường ống vs trần thạch cao, độ võng sàn nhà cũ.
   - Form đăng ký khảo sát 3D miễn phí cho công trình trên 150m² kèm mã hẹn VIP \`GU-SCAN-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-24): add AcousticSanctuaryMasterSuite, PatinaMetalworkArtisanLab, and DigitalTwinEstateAudit with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!`;

console.log('Updating master-orchestrator-state.json for Sprint 24...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-22-sprint-24-acoustic-patina-leica',
    title: 'Phòng Ngủ Master Tiêu Âm NC-25, Xưởng Đồng Patina & Số Hóa Công Trình 3D Leica',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 24 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 24', TARGET_ID, SPRINT_24_DIRECTIVE],
  { stdio: ['ignore', 'pipe', 'pipe'] }
);

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => {
  stdout += data.toString();
});

child.stderr.on('data', (data) => {
  stderr += data.toString();
});

child.on('close', (code) => {
  console.log(`Command finished with exit code ${code}`);
  if (stdout) console.log('STDOUT:\n', stdout);
  if (stderr) console.error('STDERR:\n', stderr);
  process.exit(code ?? 0);
});
