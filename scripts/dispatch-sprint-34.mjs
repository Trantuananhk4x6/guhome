import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_34_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 34: SÀN GỖ MỘNG CỔ THỤ, ĐẢO BẾP CALACATTA KHỐI & PHÒNG THIỀN ĐÓN BÌNH MINH SÔNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 33:
- ArtisanBatTrangBrickWineCellarVault, ArtisanTeppanyakiChefTableVault, và ArtisanHinokiVolcanicSaunaSanctuary đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống hầm rượu vòm gạch cổ Bát Tràng, bàn tiệc Teppanyaki hút khói plasma ozone và phòng xông hơi gỗ Hinoki đá núi lửa đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 34:
"SÀN GỖ MỘNG CỔ THỤ, ĐẢO BẾP CALACATTA KHỐI & PHÒNG THIỀN ĐÓN BÌNH MINH SÔNG"

Mục tiêu cốt lõi: Thiết kế sàn gỗ tự nhiên bản rộng 220mm ghép mộng âm dương sáp Osmo thở tự nhiên; chế tác đảo bếp đá cẩm thạch Calacatta Borghini 2.2 tấn bếp từ tàng hình dưới mặt đá; và kiến tạo phòng thiền yoga sàn gỗ Hinoki đón bình minh sông Sài Gòn tần số âm thanh 528Hz.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: XƯỞNG SÀN GỖ GHÉP MỘNG ÂM DƯƠNG CỔ THỤ (ArtisanLiveEdgeParquetFlooringVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanLiveEdgeParquetFlooringVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Bước Chân Êm Ái Trên Gỗ Thật:
   - Sàn gỗ công nghiệp dán keo mau phồng rộp dưới độ ẩm Sài Gòn 80%. GuHomes tuyển chọn ván gỗ Gõ Đỏ / Walnut bản rộng 220mm dày 20mm sấy chân không EMC 9.8%, ghép hèm khóa mộng âm dương không dùng đinh kim loại, phủ dầu sáp Osmo Polyx-Oil 0% VOC cho thớ gỗ thở tự nhiên và êm ái dưới bàn chân trần.
2. Tính năng kỹ thuật & UI tương tác:
   - Thử nghiệm độ giãn nở nhiệt ẩm: EMC 9.8% ổn định tuyệt đối qua mùa mưa Sài Gòn.
   - Trình duyệt 3 kiểu lát sàn di sản: Lát xương cá Chevron 45°, Lát Herringbone 90°, Lát ván thẳng ngẫu nhiên Random Plank.
   - Thử nghiệm xúc giác chân trần: Độ ấm bề mặt gỗ tự nhiên vs gạch men lạnh buốt.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: ĐẢO BẾP CALACATTA BẾP TỪ TÀNG HÌNH (MonolithicCalacattaMarbleChefIslandVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/MonolithicCalacattaMarbleChefIslandVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Điêu Khắc Đá Tự Nhiên & Ẩn Giấu Công Nghệ:
   - Phiến đá cẩm thạch Calacatta Borghini Ý nguyên khối dài 3.6m nặng 2.2 tấn được nghệ nhân xẻ mòi 45° ghép vân nước chảy liên hoàn Mitered Waterfall Edge. Toàn bộ bếp từ cảm ứng được giấu ngầm hoàn toàn dưới phiến đá, nấu nướng trực tiếp trên mặt đá mà vẫn an toàn tuyệt đối khi chạm tay.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng bếp từ tàng hình: Bật nấu sôi nước ngay trên mặt đá không vệt đen.
   - Chậu rửa âm đá nguyên khối xẻ rãnh thoát nước dốc 2% triệt tiêu đọng nước.
   - Ngăn kéo gia vị mở điện Servo-Drive chạm nhẹ tự mở êm ái.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: PHÒNG THIỀN YOGA ĐÓN BÌNH MINH SÔNG SÀI GÒN (RiversideDawnZenYogaPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/RiversideDawnZenYogaPavilion.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Khoảng Lặng Tâm Hồn Lúc Rạng Đông:
   - Sân thượng penthouse hoặc ban công villa ven sông hướng Đông Nam là nơi đón luồng sinh khí thanh khiết đầu ngày. Sàn gỗ Hinoki ấm áp, vách lam xoay 180° lọc gió sông đối lưu, chuông xoay Tây Tạng hợp kim 7 kim loại âm vang tần số chữa lành 528Hz Solfeggio.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình phát chuông xoay Tây Tạng 528Hz Solfeggio mô phỏng qua Web Audio API.
   - Đồng hồ định vị hướng nắng bình minh theo mùa tại TP.HCM.
   - Form tư vấn may đo không gian Thiền định gia đình (\`GU-ZEN-2026-X\`).

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-34): add ArtisanLiveEdgeParquetFlooringVault, MonolithicCalacattaMarbleChefIslandVault, and RiversideDawnZenYogaPavilion with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!
`;

console.log('Updating master-orchestrator-state.json for Sprint 34...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-32-sprint-34-parquet-calacatta-zenyoga',
    title: 'Sàn Gỗ Mộng Cổ Thụ, Đảo Bếp Calacatta Khối & Phòng Thiền Đón Bình Minh Sông',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 34 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 34', TARGET_ID, SPRINT_34_DIRECTIVE],
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
