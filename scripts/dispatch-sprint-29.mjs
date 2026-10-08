import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_29_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 29: HỒ BƠI VÔ CỰC ĐIỆN PHÂN NƯỚC MẶN, LÒ SƯỞI HƠI NƯỚC ĐÁ KHỐI & BẾN DU THUYỀN VEN SÔNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 28:
- SaigonBespokeTeakDeckingPavilion, BespokeAcousticHomeCinemaLab, và ArtisanHandmadeRugStudio đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống sàn gỗ Teak ngoài trời, phòng chiếu phim Dolby Atmos chuẩn THX và xưởng thảm tơ sen dệt tay đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 29:
"HỒ BƠI VÔ CỰC ĐIỆN PHÂN NƯỚC MẶN, LÒ SƯỞI HƠI NƯỚC ĐÁ KHỐI & BẾN DU THUYỀN VEN SÔNG"

Mục tiêu cốt lõi: Làm chủ kỹ nghệ hồ bơi vô cực điện phân ion đồng-bạc không clo với vách kính acrylic trong suốt cho penthouse; thiết kế lò sưởi hơi nước 3D điêu khắc đá khối Thanh Hóa không khói độc; và mở cổng quy hoạch bến du thuyền tư gia ven sông Sài Gòn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: HỒ BƠI VÔ CỰC ĐIỆN PHÂN NƯỚC MẶN (SaigonBespokeInfinityPoolLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBespokeInfinityPoolLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Làn Nước Tự Nhiên Nuôi Dưỡng Làn Da:
   - Hồ bơi penthouse & dinh thự ven sông không dùng hóa chất Clo nồng nặc gây khô tóc và cay mắt. GuHomes áp dụng công nghệ điện phân khoáng biển tự nhiên kết hợp ion đồng-bạc (Copper-Silver Ionization), giữ làn nước mềm mại, tinh khiết như suối nguồn tự nhiên.
2. Tính năng kỹ thuật & UI tương tác:
   - Vách kính Acrylic nguyên khối chịu lực dày 80mm trong suốt nhìn thẳng ra sông Sài Gòn và tòa Landmark 81.
   - Hệ thống bơm biến tần Inverter siêu êm & bơm nhiệt Heat Pump thông minh giữ ấm nước 29°C quanh năm.
   - Trình mô phỏng điện phân ion: Nồng độ Clo tự do 0.0 ppm vs Ion kháng khuẩn Cu²⁺/Ag⁺ an toàn 100%.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: LÒ SƯỞI HƠI NƯỚC NGHỆ THUẬT ĐÁ KHỐI (HandCarvedStoneFireplaceVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/HandCarvedStoneFireplaceVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Ngọn Lửa An Lành Trong Khí Hậu Nhiệt Đới:
   - Sài Gòn không cần hơi nóng bức bối của lò sưởi củi khói bụi. GuHomes chế tác lò sưởi hơi nước siêu âm 3D kết hợp đèn LED hổ phách 2200K tỏa làn khói sương mát lạnh, tạo sinh khí ấm cúng cho phòng khách mà không làm tăng nhiệt độ phòng.
2. Tính năng kỹ thuật & UI tương tác:
   - Khung bao lò sưởi đục tay 100 giờ từ đá xanh Thanh Hóa nguyên khối và đá cẩm thạch trắng Bát Tràng.
   - Khay khuếch tán vi hạt tinh dầu Trầm Hương Khánh Hòa hòa cùng làn sương mát lạnh.
   - Thử nghiệm an toàn gia đình: Chạm tay trực tiếp vào ngọn lửa hơi nước mát lạnh 100% không lo bỏng.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BẾN DU THUYỀN TƯ GIA & PHÒNG CHỜ VEN SÔNG (PrivateYachtBerthAndHelipadConcierge.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/PrivateYachtBerthAndHelipadConcierge.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Đặc Quyền Giao Thông Đường Thủy Thượng Lưu:
   - Dinh thự Thảo Điền, Ba Son và Thanh Đa sở hữu mặt tiền sông đắt giá. GuHomes thiết kế trọn gói cầu tàu nổi gỗ Teak chịu mặn, hệ thống neo tự động theo thủy triều sông Sài Gòn (biên độ triều 3.5m) và phòng chờ VIP Lounge đón tiếp riêng tư.
2. Tính năng kỹ thuật & UI tương tác:
   - Sơ đồ 3 cửa đón tiếp thượng khách: Cổng đại sảnh đường bộ -> Bến du thuyền gỗ Teak bờ sông -> Bãi đáp trực thăng mái.
   - Form tư vấn khảo sát luồng lạch & lập hồ sơ pháp lý bến thủy nội địa kèm mã tiếp đón VIP \`GU-YACHT-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-29): add SaigonBespokeInfinityPoolLab, HandCarvedStoneFireplaceVault, and PrivateYachtBerthAndHelipadConcierge with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!`;

console.log('Updating master-orchestrator-state.json for Sprint 29...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-27-sprint-29-pool-fireplace-yacht',
    title: 'Hồ Bơi Vô Cực Điện Phân Nước Mặn, Lò Sưởi Hơi Nước Đá Khối & Bến Du Thuyền Ven Sông',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 29 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 29', TARGET_ID, SPRINT_29_DIRECTIVE],
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
