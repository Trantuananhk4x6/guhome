import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_17_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 17: PHÒNG THÍ NGHIỆM LÃO HÓA MỘC TỰ NHIÊN PATINA, ĐIỀU HÒA VRV VI KHÍ HẬU CHỐNG ĐỌNG SƯƠNG & CHUẨN NHÀ THÔNG MINH TĨNH LẶNG KNX]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt khen ngợi thành quả xuất sắc phi thường của Sprint 16:
- TropicalFengShuiCompass, AcousticDampeningSimulator, và VipConciergePortal đã hoàn thành 100%, vượt qua tất cả 153 routes SEO và production build Next.js với 0 lỗi (Commit 6be4879 & 5d5a557).
- Toàn bộ các hệ thống tương tác đỉnh cao đã được đưa vào vận hành chuẩn xác trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA LẬP TỨC TRIỂN KHAI SPRINT 17:
"PHÒNG THÍ NGHIỆM LÃO HÓA MỘC TỰ NHIÊN PATINA, ĐIỀU HÒA VRV VI KHÍ HẬU CHỐNG ĐỌNG SƯƠNG & CHUẨN NHÀ THÔNG MINH TĨNH LẶNG KNX"

Mục tiêu cốt lõi: Chứng minh chiều sâu trường tồn của vật liệu mộc mạc tự nhiên qua thời gian (Wabi-Sabi Patina); giải quyết dứt điểm vấn đề kỹ thuật cơ điện nhức nhối nhất của các căn hộ hạng sang Sài Gòn (chống đọng sương rỏ trần điều hòa âm trần nối ống gió VRV); và nâng tầm đẳng cấp căn hộ bằng công nghệ nhà thông minh vô hình (Invisible Smart Home KNX).

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍ NGHIỆM LÃO HÓA MỘC TỰ NHIÊN PATINA (TropicalPatinaLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/TropicalPatinaLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Quiet Luxury & Vật liệu trường tồn:
   - Sự xa xỉ thực sự không phải là bề mặt bóng loáng công nghiệp nhanh xuống cấp, mà là vẻ đẹp trầm tích của vật liệu tự nhiên (gỗ lau dầu Osmo, đồng thau mộc, da bò thuộc thảo mộc, đá vôi khoáng travertine) càng dùng lâu càng đằm thắm theo năm tháng dưới vi khí hậu nhiệt đới ẩm Sài Gòn.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Loại vật liệu biểu tượng:
     * 01. Gỗ Óc Chó Bắc Mỹ (FAS American Walnut) lau dầu hạt lanh Osmo Đức.
     * 02. Gỗ Teak Myanmar tự nhiên giàu tinh dầu silica tự kháng nước và bức xạ nắng.
     * 03. Đồng thau mộc nguyên khối (Raw Unlacquered Brass) dùng làm tay nắm phay mộc & chỉ nẹp âm.
     * 04. Da bò thuộc thảo mộc Tuscany Ý (Vegetable-Tanned Leather) dùng lót ngăn kéo & vách bọc đầu giường.
   - Thanh trượt thời gian tương tác (Timeline Slider):
     * Mới bàn giao (Ngày 0) -> Sau 1 năm -> Sau 5 năm -> Sau 15 năm -> Sau 30 năm (Giá trị truyền đời).
   - Biến thiên quang học và xúc giác mô phỏng sống động:
     * Gỗ Óc Chó chuyển từ nâu ánh tím sang tông mật ong ấm áp sâu thẳm, thớ vân nổi bật hiệu ứng 3D chiều sâu.
     * Đồng thau mộc chuyển màu Patina cổ điển trầm mặc, tự hình thành lớp oxit bảo vệ bề mặt vĩnh cửu.
     * Da bò sậm màu hổ phách, bóng mượt tự nhiên nhờ xúc giác tay người chạm (tactile warmth).
   - Bảng phân tích vi khí hậu: Chu kỳ dưỡng dầu Osmo 12–18 tháng/lần, độ cứng Janka, độ bền xuyên thế hệ.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỘ TÍNH TOÁN ĐIỀU HÒA VRV VI KHÍ HẬU CHỐNG ĐỌNG SƯƠNG (TropicalHvacAirflowSimulator.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/TropicalHvacAirflowSimulator.tsx\` và tích hợp vào \`src/app/(site)/khu-vuc/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Cơ Điện & Vi Khí Hậu:
   - Nhiệt độ ngoài trời Sài Gòn 36°C - 38°C, độ ẩm 80-85% là khắc tinh của điều hòa âm trần nối ống gió (VRV/VRF). Nếu nhà thầu làm ẩu (bảo ôn mỏng, miệng gió nhôm thường), hơi ẩm sẽ ngưng tụ (đọng sương) nhỏ giọt làm ố vàng trần thạch cao và ẩm mốc hệ tủ mộc tiền tỷ.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ tính toán Điểm Sương thực nghiệm (Dew Point Calculator):
     * Nhập: Nhiệt độ phòng (20°C - 28°C) + Độ ẩm không khí Sài Gòn (60% - 95%) -> Tính toán chính xác Nhiệt độ Điểm Sương (Tdew).
   - Mô phỏng nguy cơ đọng sương:
     * Hệ thông thường: Miệng gió nhôm dẫn nhiệt, bảo ôn PE đơn 10mm -> Đọng giọt sương sau 45 phút, rỉ nước trần thạch cao.
     * Chuẩn cơ điện GuHomes:
       - Ống gió bảo ôn đôi Aeroflex 19mm bọc kín mối nối chống cầu nhiệt.
       - Miệng gió Linear giấu viền (Trimless Slot Diffuser) đúc bằng nhựa ABS cách nhiệt chống đọng sương 100%.
       - Cảm biến độ ẩm tích hợp van tiết lưu điện tử tự động bù nhiệt 1°C khi phát hiện nguy cơ ngưng tụ.
   - Mô phỏng luồng gió đối lưu tự nhiên (Cross-ventilation) từ sông Sài Gòn giúp tiết kiệm 35% điện năng máy lạnh về đêm.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: CHUẨN MỰC NHÀ THÔNG MINH VÔ HÌNH TĨNH LẶNG KNX (SmartHomeQuietSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/sections/SmartHomeQuietSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Quiet Luxury:
   - Nhà thông minh đỉnh cao là công nghệ ẩn mình (Invisible Technology) phục vụ con người một cách êm ái, tĩnh lặng, không phô trương màn hình cảm ứng nhấp nháy hay đèn LED xanh đỏ gây ô nhiễm ánh sáng trong phòng ngủ.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Kịch bản một chạm qua công tắc phím cơ đồng thau mộc phay xước Ekinex / Basalte chuẩn châu Âu KNX:
     * 01. Bình Minh Thức Giấc (Dawn Awakening): Rèm linen 3 lớp tự động hé mở 30% đón nắng sớm sông Sài Gòn, đèn LED Warm Dim tăng dần từ 1800K lên 2700K trong 15 phút, điều hòa lấy gió tươi lọc bụi mịn PM2.5.
     * 02. Nắng Chiều Sài Gòn (Tropical Solar Shield): Cảm biến bức xạ tự động hạ rèm cản nhiệt mặt Tây, điều hòa duy trì 24.5°C êm dịu, miệng gió tự điều hướng tránh thổi vào người.
     * 03. Dạ Tiệc Thân Mật (Intimate Evening): Đèn hắt trần cove và rãnh tủ rượu Warm Dim 2200K, hệ âm thanh Hi-End đa vùng kích hoạt mức âm lượng đầm ấm.
     * 04. Tĩnh Lặng Tuyệt Đối (Night Sanctuary): Tắt toàn bộ đèn báo hiệu LED nhấp nháy, ngắt sóng vô tuyến không cần thiết, âm thanh máy lạnh dưới 22dB (êm hơn tiếng thở).
   - Bộ chọn kịch bản trực quan với mô phỏng ánh sáng và nhiệt độ thời gian thực.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (chú ý null check cho Array.find).
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-17): add TropicalPatinaLab, TropicalHvacAirflowSimulator, and SmartHomeQuietSanctuary'
5. Gửi tin nhắn báo cáo lại kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Hãy triển khai ngay bây giờ!`;

console.log('Updating master-orchestrator-state.json for Sprint 17...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-15-sprint-17-tropical-patina-hvac-smart-home',
    title: 'Phòng Thí Nghiệm Lão Hóa Mộc Tự Nhiên Patina, Điều Hòa VRV Vi Khí Hậu Chống Đọng Sương & Chuẩn Nhà Thông Minh Tĩnh Lặng KNX',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 17 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 17', TARGET_ID, SPRINT_17_DIRECTIVE],
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
