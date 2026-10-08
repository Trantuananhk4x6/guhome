import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_25_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 25: GIẾNG TRỜI KHÍ ĐỘNG HỌC ATRIUM, PHÒNG THAY ĐỒ TRẦM HƯƠNG & HỘ CHIẾU NGHỆ NHÂN NFC]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 24:
- AcousticSanctuaryMasterSuite, PatinaMetalworkArtisanLab, và DigitalTwinEstateAudit đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống phòng ngủ master tiêu âm NC-25, nghệ thuật gỉ đồng tự nhiên Patina và cổng quét số hóa 3D Leica đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 25:
"GIẾNG TRỜI KHÍ ĐỘNG HỌC ATRIUM, PHÒNG THAY ĐỒ TRẦM HƯƠNG & HỘ CHIẾU NGHỆ NHÂN NFC"

Mục tiêu cốt lõi: Làm chủ vi khí hậu đối lưu giếng trời xanh thông tầng cho biệt thự nhiệt đới; thiết lập buồng thay đồ bảo tồn thời trang cao cấp bằng gỗ tuyết tùng và hương trầm tự nhiên; và nâng tầm chế tác với hệ thống Hộ chiếu nghệ nhân truy xuất nguồn gốc bằng chip NFC trên từng món đồ độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: GIẾNG TRỜI KHÍ ĐỘNG HỌC & VƯỜN THỦY THỔ (SaigonCourtyardAtriumLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonCourtyardAtriumLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Trục Thở Sinh Thái Nhiệt Đới:
   - Khoảng giếng trời (Sky Courtyard/Atrium) là trái tim khí động học của ngôi nhà nhiệt đới. Ứng dụng hiệu ứng ống khói năng lượng mặt trời (Solar Chimney Effect) để hút gió mát từ hồ nước mặt sàn trệt và đẩy khí nóng thoát tự nhiên qua đỉnh mái mà không phụ thuộc hoàn toàn vào điều hòa.
2. Tính năng kỹ thuật & UI tương tác:
   - 3 Cấu hình giếng trời biểu tượng:
     * 01. Giếng Trời Lõi Xanh Biệt Thự Thảo Điền (Cây Lộc Vừng bóng râm + Hồ cá Koi vi sinh đá Bazan xẻ thô).
     * 02. Thông Tầng Penthouse Ba Son (Thác nước tuần hoàn tiêu âm + Vách đá rêu xanh tự điều hòa ẩm).
     * 03. Atrium Nhà Phố Hiện Đại (Hệ lam gỗ Teak tự động xoay theo góc mặt trời + Cửa chớp đối lưu đỉnh mái).
   - Mô phỏng chênh lệch nhiệt độ tương tác: Ngoài trời 36°C -> Đáy giếng trời mát lạnh 26.5°C (-9.5°C tự nhiên).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: PHÒNG THAY ĐỒ WALK-IN CLOSET TRẦM HƯƠNG (BespokeWalkInWardrobeVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/BespokeWalkInWardrobeVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/du-toan-chi-phi/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Bảo Tồn Thời Trang & Đồng Hồ Cơ Khí:
   - Khí hậu nồm ẩm Sài Gòn là kẻ thù số một của túi da Hermes, đồ lụa tơ tằm và đồng hồ cơ khí. GuHomes thiết kế phòng thay đồ Walk-In Closet với buồng kín vi khí hậu chuẩn xác 50-55% RH, tự kháng khuẩn bằng gỗ Tuyết Tùng và hương trầm tự nhiên.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Chuẩn mực kỹ thuật đỉnh cao:
     * Gỗ Mun sọc & Tuyết Tùng Tây Ban Nha tự nhiên xua đuổi ẩm mốc và côn trùng không dùng hóa chất.
     * Bộ khuếch tán vi hạt tinh dầu Trầm Hương Khánh Hòa cổ truyền tạo tầng hương an yên cho trang phục.
     * Cửa kính điện thông minh (Smart Privacy Glass) chuyển đổi trong suốt sang mờ chỉ bằng một chạm.
     * Hộc xoay đồng hồ tự động (Watch Winder) triệt tiêu từ trường và rung chấn cơ học bọc nỉ Alcantara.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: HỘ CHIẾU NGHỆ NHÂN & TRUY XUẤT NGUỒN GỐC NFC (ArtisanCraftsmanPassport.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanCraftsmanPassport.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Độc Bản & Nguồn Gốc Thủ Công:
   - Mỗi món nội thất độc bản của GuHomes rời xưởng Thạnh Xuân đều được gắn huy hiệu đồng thau đúc mang mã sê-ri riêng biệt kèm thẻ chip NFC mã hóa. Gia chủ chỉ cần chạm điện thoại để xem trọn vẹn "Hộ chiếu nghệ nhân" của tác phẩm.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình quét thẻ tương tác mô phỏng chạm điện thoại vào tác phẩm.
   - Hiển thị thông tin minh bạch 100%:
     * Danh tính người thợ cả mộc (Thợ Cả Bùi Văn Toàn - 28 năm kinh nghiệm) và thợ hoàn thiện sáp dầu Osmo.
     * Tọa độ cánh rừng Bắc Mỹ khai thác gỗ FSC bền vững, biểu đồ độ ẩm sấy chân không 21 ngày tại xưởng Thạnh Xuân.
     * Lịch sử nhật ký bảo dưỡng định kỳ và dịch vụ Home Wood Spa trọn đời.
     * Công cụ tra cứu mã sê-ri độc bản (Ví dụ: \`GH-CRAFT-2026-0888\`).

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-25): add SaigonCourtyardAtriumLab, BespokeWalkInWardrobeVault, and ArtisanCraftsmanPassport with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!`;

console.log('Updating master-orchestrator-state.json for Sprint 25...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-23-sprint-25-atrium-wardrobe-nfc',
    title: 'Giếng Trời Khí Động Học Atrium, Phòng Thay Đồ Trầm Hương & Hộ Chiếu Nghệ Nhân NFC',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 25 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 25', TARGET_ID, SPRINT_25_DIRECTIVE],
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
