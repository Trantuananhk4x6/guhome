import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_33_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 33: HẦM RƯỢU VÒM GẠCH BÁT TRÀNG, BẾP TEPPANYAKI NGHỆ NHÂN & PHÒNG XÔNG HƠI HINOKI ĐÁ NÚI LỬA]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 32:
- AntiqueLibraryAndCartographyVault, ArtisanHorologyGrandfatherClockVault, và ArtisanShanTuyetTeaSanctuary đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống thư viện sách cổ kiểm soát ẩm 48% RH, xưởng đồng hồ quả lắc đứng Cẩm Lai 432Hz và thánh địa trà đạo Shan Tuyết bàn lũa ngâm bùn đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 33:
"HẦM RƯỢU VÒM GẠCH BÁT TRÀNG, BẾP TEPPANYAKI NGHỆ NHÂN & PHÒNG XÔNG HƠI HINOKI ĐÁ NÚI LỬA"

Mục tiêu cốt lõi: Thiết kế hầm rượu vang vòm cuốn gạch cổ Bát Tràng mạch vôi thở tự nhiên không dùng hóa chất; chế tác bàn tiệc đầu bếp Teppanyaki mặt thép 25mm hút khói âm bàn plasma ozone; và kiến tạo phòng xông hơi gỗ Hinoki tự nhiên kết hợp đá núi lửa bazan khuếch tán tinh dầu quế bưởi bản địa.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: HẦM RƯỢU VANG VÒM GẠCH BÁT TRÀNG THỞ TỰ NHIÊN (ArtisanBatTrangBrickWineCellarVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanBatTrangBrickWineCellarVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Dưỡng Rượu Vang Trong Lòng Đất Mẹ:
   - Từ chối các hầm rượu ốp gỗ công nghiệp bí khí phát sinh formaldehyde làm biến chất rượu vang Grand Cru. GuHomes xây vòm cuốn gạch mộc Bát Tràng bằng vữa vôi vỏ sò truyền thống, nền rải sỏi sông cuội giữ ẩm tự nhiên 70-75% RH, nhiệt độ tĩnh 14°C chống rung chấn triệt để dưới 0.005 mm/s.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng vi khí hậu vòm gạch: Cân bằng nhiệt - ẩm tự nhiên không quạt ồn.
   - Thư viện rượu vang số hóa quản lý 1.200 chai bằng thẻ RFID gỗ thông.
   - Ánh sáng vàng nến 2000K không phát tia tử ngoại UV/IR làm hỏng tannin.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BÀN TIỆC TEPPANYAKI NGHỆ NHÂN & HÚT KHÓI TÀNG HÌNH (ArtisanTeppanyakiChefTableVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanTeppanyakiChefTableVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Vũ Điệu Lửa & Thép Của Đầu Bếp Gia Đình:
   - Biệt thự đẳng cấp là nơi sum vầy thưởng thức ẩm thực đỉnh cao tại chỗ. Mặt bàn nướng thép đúc không gỉ dày 25mm tôi dầu thực vật, hệ thống hút khói âm bàn giấu khe tốc độ 1.800 m³/h khử sạch mùi thức ăn và dầu mỡ bằng buồng lọc Plasma Ozone 99.4%.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ gia nhiệt 3 vùng độc lập (120°C giữ ấm - 220°C áp chảo - 300°C khò lửa).
   - Viền bàn gỗ Sồi đầm lầy Bog Oak 500 năm tuổi cách nhiệt tuyệt đối chạm tay mát rượi.
   - Trình kiểm tra hiệu suất lọc khói mùi: 100% không vương mùi ra phòng khách.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: PHÒNG XÔNG HƠI HINOKI ĐÁ NÚI LỬA TRỊ LIỆU (ArtisanHinokiVolcanicSaunaSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHinokiVolcanicSaunaSanctuary.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Tái Tạo Năng Lượng Từ Rừng Sâu:
   - Gỗ Hinoki Nagano nguyên cây không khuyết tật, tiết chất phytoncide kháng khuẩn và làm dịu hệ thần kinh khi tiếp xúc nhiệt độ 85°C.
   - Thùng xông đá núi lửa bazan đen Gia Lai tích nhiệt sâu, gáo múc nước đồng thau tưới thảo mộc vỏ bưởi tươi và hồi quế làm bừng tỉnh mọi giác quan.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình đo nhịp tim và chu kỳ xông hơi phục hồi Bio-Sauna (15 phút xông - 5 phút tắm lạnh).
   - Vách kính hộp cường lực chống đọng sương mở tầm nhìn ra vườn thiền sân trong.
   - Form tư vấn may đo phòng Wellness tư gia kèm mã tiếp đón VIP \`GU-SAUNA-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-33): add ArtisanBatTrangBrickWineCellarVault, ArtisanTeppanyakiChefTableVault, and ArtisanHinokiVolcanicSaunaSanctuary with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!
`;

console.log('Updating master-orchestrator-state.json for Sprint 33...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-31-sprint-33-winecellar-teppanyaki-sauna',
    title: 'Hầm Rượu Vòm Gạch Bát Tràng, Bếp Teppanyaki Nghệ Nhân & Phòng Xông Hơi Hinoki Đá Núi Lửa',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 33 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 33', TARGET_ID, SPRINT_33_DIRECTIVE],
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
