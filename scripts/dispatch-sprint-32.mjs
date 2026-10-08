import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_32_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 32: THƯ VIỆN SÁCH CỔ KIỂM SOÁT ĐỘ ẨM, ĐỒNG HỒ CƠ KHÍ & THÁNH ĐỊA TRÀ ĐẠO SHAN TUYẾT]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 31:
- SaigonRooftopStargazingObservatory, BespokeOlfactoryFragranceAtelier, và PrivateEstateDigitalButlerPortal đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống đài thiên văn mái kính cơ điện, xưởng hương vi khuếch tán ống gió AHU và cổng quản gia số Edge Server đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 32:
"THƯ VIỆN SÁCH CỔ KIỂM SOÁT ĐỘ ẨM, ĐỒNG HỒ CƠ KHÍ & THÁNH ĐỊA TRÀ ĐẠO SHAN TUYẾT"

Mục tiêu cốt lõi: Thiết kế phòng lưu trữ sách cổ và bản đồ quý kiểm soát độ ẩm 45-50% RH chống phân hủy sợi giấy; chế tác đồng hồ quả lắc đứng gỗ cẩm lai chuông Westminster 432Hz; và kiến tạo phòng trà đạo thưởng thức Shan Tuyết cổ thụ Hà Giang với bàn lũa nguyên khối 30 năm ngâm bùn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THƯ VIỆN BẢO TỒN SÁCH CỔ (AntiqueLibraryAndCartographyVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/AntiqueLibraryAndCartographyVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Lưu Truyền Tri Thức Gia Tộc:
   - Sài Gòn nồm ẩm 80% là kẻ thù phá hủy các ấn bản sách cổ và bản đồ da dê. GuHomes thiết kế phòng thư viện cách ẩm tuyệt đối, áp suất dương nhẹ ngăn bụi, kính Low-E cản 99.9% tia UV và giá sách gỗ óc chó FAS đóng mộng âm dương không đinh sắt.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng vi khí hậu thư viện: 48% RH & 21°C ổn định quanh năm.
   - Thư viện 3D tương tác các bản đồ cổ Đông Dương và bản thảo hiếm.
   - Hệ thống chiếu sáng không nhiệt Fiber Optic CRI 99 UGR < 10 bảo vệ mực in cổ.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: XƯỞNG CHẾ TÁC ĐỒNG HỒ CƠ QUẢ LẮC ĐỨNG (ArtisanHorologyGrandfatherClockVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanHorologyGrandfatherClockVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Nhịp Đập Thời Gian Của Dinh Thự:
   - Ngôi nhà sống động nhờ nhịp gõ cơ học tĩnh tại của con lắc đồng hồ. Nghệ nhân Thạnh Xuân tiện gọt thùng đồng hồ từ gỗ Cẩm Lai nguyên khối cao 2.4m, lắp bộ máy cơ học Tourbillon Thụy Sĩ và quả lắc đồng thau hiệu chỉnh trọng lực.
2. Tính năng kỹ thuật & UI tương tác:
   - Tần số chuông Westminster 432Hz chữa lành tâm trí, gõ nhẹ điểm khắc giờ.
   - Bộ điều chỉnh âm lượng đêm Night-Silencer cơ học tự động tắt chuông từ 22:00 đến 06:00.
   - Trình mô phỏng cơ cấu bánh răng thoát Deadbeat Escapement chuyển động mượt mà.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: THÁNH ĐỊA TRÀ ĐẠO SHAN TUYẾT & GỐM TỬ SA (ArtisanShanTuyetTeaSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanShanTuyetTeaSanctuary.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Tĩnh Lặng Giữa Dòng Chảy Đô Thị:
   - Nghi thức trà đạo đón tiếp tri kỷ: Bàn trà đục từ thân gỗ Lũa Gõ Đỏ ngâm bùn 30 năm trôi dạt sông Cửu Long; bếp từ vi gốm âm mặt đá nhám; hệ thống nước pha trà lọc 7 tầng qua đá Thạch Anh và gốm khoáng tự nhiên đạt chỉ số TDS 35-45 ppm lý tưởng.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ sưu tập 4 loại danh trà: Shan Tuyết Cổ Thụ Tây Côn Lĩnh 400 năm, Oolong Tứ Quý Mộc Châu, Trà Sen Tây Hồ ướp hoa gạo, Phổ Nhĩ Sống Thạnh Xuân ủ hầm.
   - Thử nghiệm độ trong và dư vị của dòng nước khoáng pha trà.
   - Form đăng ký nghi thức thưởng trà riêng tư cùng KTS Trưởng (\`GU-TEA-2026-X\`).

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-32): add AntiqueLibraryAndCartographyVault, ArtisanHorologyGrandfatherClockVault, and ArtisanShanTuyetTeaSanctuary with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!
`;

console.log('Updating master-orchestrator-state.json for Sprint 32...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-30-sprint-32-library-clock-teasanctuary',
    title: 'Thư Viện Sách Cổ Kiểm Soát Độ Ẩm, Đồng Hồ Cơ Khí & Thánh Địa Trà Đạo Shan Tuyết',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 32 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 32', TARGET_ID, SPRINT_32_DIRECTIVE],
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
