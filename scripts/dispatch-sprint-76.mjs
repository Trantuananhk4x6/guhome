import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_76_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 76: THÍNH PHÒNG TRỐNG CAJON VÒM TRẮC, THỦY ĐÌNH TRE NỔI VEN SÔNG & TẨU THUỐC MUN NẠM VÀNG 24K]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt biểu dương kết quả xuất sắc của Sprint 75 (100% Routes PASS, 0 lỗi TypeScript, Production build thành công vượt bậc). Tiếp tục chuỗi sáng tạo tinh hoa không ngừng nghỉ, phát lệnh SPRINT 76:
"THÍNH PHÒNG TRỐNG CAJON VÒM TRẮC, THỦY ĐÌNH TRE NỔI VEN SÔNG & TẨU THUỐC MUN NẠM VÀNG 24K"

Mục tiêu cốt lõi: Thiết kế thính phòng hòa âm trống thùng Cajon vòm gỗ Trắc đỏ đen Nam Bộ âm học RT60 = 0.31s; kiến tạo thủy đình trà thất nổi liên hoàn tre luồng hạ nhiệt vi khí hậu 4.9°C đón gió sông Sài Gòn; và chế tác tẩu thuốc ngự dụng gỗ Mun sừng Khánh Hòa nạm chỉ vàng 24K nghệ thuật Damascene.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: THÍNH PHÒNG TRỐNG CAJON VÒM TRẮC (SaigonAcousticCajonSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticCajonSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Sắc Nhịp Thùng Mộc Bản & Gỗ Trắc Nam Bộ:
   - Thính phòng hòa âm trống thùng Cajon thủ công cao cấp; khung thùng từ gỗ Trắc đỏ đen Nam Bộ già đanh ngàn năm tuổi; mặt gõ tapa gỗ Bạch Dương Phần Lan 3mm uốn căng với độ nảy âm tuyệt hảo; hệ thống 4 dây snare guitar bên trong có thể tinh chỉnh độ rè kim loại sắc sảo; nan vòm elip tán âm tiêu biến sóng đứng dải tần 100Hz - 4.000Hz; thời gian vang RT60 = 0.31s; hệ tủ vi khí hậu 50% RH giữ phẳng mặt gỗ mộc không cong vênh.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe trích đoạn nhịp gõ: Bossa Nova Hoàng Hôn, Rumba Flamenco, Biến Tấu Lý Ngựa Ô Nam Bộ qua Web Audio API.
   - Bảng 3 kỹ thuật gõ tương tác: Bass Strike (âm trầm 80Hz nẩy sâu), Slap Strike (âm đanh sắc sảo 2.8kHz mép trên), Touch Strike (âm chạm nhẹ nhàng 1.2kHz).
   - Điều khiển 3 kịch bản ánh sáng thính phòng dạ tiệc (2400K, 2900K, 1900K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: THỦY ĐÌNH TRE NỔI VEN SÔNG (SaigonCanalSideFloatingBambooTeaPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonCanalSideFloatingBambooTeaPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Trà Thất Nổi Trên Nước & Vi Khí Hậu Sông Sài Gòn:
   - Thủy đình trà thất nổi độc bản kết cấu từ thân tre luồng Thanh Hóa ngâm bùn sấy nhiệt liên kết mộng tre chốt gỗ hoàn toàn không dùng đinh kim loại; hệ phao composite chìm ngầm ổn định triệt tiêu 95% dao động dập dềnh của sóng ca nô; mái lợp 3 tầng lá dừa nước nước mặn đan kép cách nhiệt 94%, đón trọn làn gió đối lưu sông Sài Gòn hạ nhiệt độ vi khí hậu 4.9°C; sàn tre ghép nan chà nhám nhẵn bóng phủ dầu sáp ong tự nhiên.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng trạng thái bồng bềnh thủy lực theo chu kỳ thủy triều sông Sài Gòn (Nước ròng / Nước lớn / Triều cường).
   - Bộ theo dõi nhiệt độ vi khí hậu: Hạ 4.9°C nhiệt độ không gian, tốc độ gió sông 3.2 m/s.
   - Web Audio tiếng sóng nước vỗ mạn tre êm ái hòa cùng tiếng chim bìm bịp gọi nước lớn 30dB.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: TẨU THUỐC MUN NẠM VÀNG 24K (ArtisanGoldDamasceneEbonyTobaccoPipeAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanGoldDamasceneEbonyTobaccoPipeAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Nghệ Thuật Ngự Dụng Quý Tộc & Khảm Chỉ Vàng Damascene:
   - Tẩu thuốc quý chế tác từ gỗ Mun sừng Khánh Hòa khai thác lõi đặc chìm dưới nước; nghệ nhân dùng dao khắc rãnh siêu vi 0.2mm nạm thủ công sợi chỉ vàng ròng 24K tạo họa tiết mây nước và hoa sen cổ; vòng ring bọc bạc ta 999 khắc triện niên hiệu gia chủ; lòng bõ tẩu ốp lớp đá bọt núi lửa bazan Tây Nguyên kháng nhiệt 600°C giữ trọn vị thảo mộc thuần khiết (\`GU-DAMASCENE-PIPE-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính soi cận cảnh hoa văn sợi vàng 24K dưới ánh sáng quang học xoay 360 độ.
   - Thử nghiệm độ cách nhiệt của bõ tẩu Mun sừng và buồng ủ khói nguội.
   - Form cá nhân hóa: Chọn 3 dáng tẩu kinh điển (Billiard / Dublin / Rhodesian) và khắc chữ Triện niên hiệu riêng.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (lưu ý array indexing type assertion khi noUncheckedIndexedAccess bật).
2. Typography Quiet Luxury: Tuyệt đối không dùng em-dash '—' (dùng '-'), không dùng en-dash '–' trong khoảng số.
3. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS (153/153 routes).
4. Production Build: Chạy 'npm run build' (next build --webpack) exit code 0.
5. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-76): add SaigonAcousticCajonSanctuarySalon, SaigonCanalSideFloatingBambooTeaPavilion, and ArtisanGoldDamasceneEbonyTobaccoPipeAtelier with 100% SEO pass'
`;

async function dispatchSprint76() {
  console.log(`[Master Orchestrator] Dispatching Sprint 76 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-74-sprint-76-cajon-floatingbamboo-damascenepipe',
    title: 'Thính Phòng Trống Cajon Vòm Trắc, Thủy Đình Tre Nổi Ven Sông & Tẩu Thuốc Mun Nạm Vàng 24K',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 76 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_76_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint76();
