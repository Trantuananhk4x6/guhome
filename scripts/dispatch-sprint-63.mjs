import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_63_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 63: VƯỜN THIỀN KARESANSUI SÀI GÒN, PHÒNG ÂM TỲ BÀ CỔ VÀNG & TRÁP TRÀ SƠN MÀI CỐT MÂY]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 63:
"VƯỜN THIỀN KARESANSUI SÀI GÒN, PHÒNG ÂM TỲ BÀ CỔ VÀNG & TRÁP TRÀ SƠN MÀI CỐT MÂY"

Mục tiêu cốt lõi: Thiết kế vườn thiền Karesansui trong nhà với đá bazan Đắk Nông nguyên khối và cát thạch anh sưởi nhiệt chống nồm ẩm; kiến tạo phòng thính âm đàn Tỳ Bà & Đàn Tranh vòm gỗ Ngô Đồng Huế âm học RT60 = 0.35s; và chế tác tráp trà sơn mài cốt mây đan Định Quán thếp vàng quỳ 24K kín khí.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: VƯỜN THIỀN KARESANSUI TRONG NHÀ SÀI GÒN (SaigonZenKaresansuiGardenSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonZenKaresansuiGardenSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Tĩnh Lặng Vô Thường Giữa Lòng Đô Thị Sôi Động:
   - Khu vườn thiền khô Karesansui phong cách Zen nhiệt đới tọa lạc tại tâm điểm dinh thự; 7 khối đá bazan Đắk Nông nguyên khối phủ rêu nhung tự nhiên biểu trưng cho các hòn đảo tâm linh; thảm cát thạch anh trắng mịn cào hình gợn sóng nước; hệ thống cáp sưởi nhiệt sàn ngầm duy trì độ ẩm < 50% ngăn chặn nấm mốc trong mùa mưa dầm Nam Bộ; đèn đá tự nhiên đục tay tỏa ánh sáng vàng 2400K êm dịu.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ công cụ tương tác cào cát thiền (4 mẫu vân sóng: Sóng Biển Lặng, Vòng Xoáy Tĩnh Tâm, Mây Nước Giao Hòa, Thẳng Hàng Định Tâm).
   - Chuyển đổi 3 thời khắc thiền định: Bình Minh Tĩnh Mịch, Trưa Tĩnh Lặng, Trăng Đêm Tịch Diệu.
   - Thưởng thức tiếng chuông xoay Tây Tạng và tiếng gió thoảng qua tre trúc qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: PHÒNG THÍNH ÂM ĐÀN TỲ BÀ & ĐÀN TRANH (SaigonAcousticTraditionalLuteSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticTraditionalLuteSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Tơ Trúc Dân Tộc Trong Không Gian Đương Đại:
   - Đại thính phòng âm nhạc cổ truyền tôn vinh đàn Tỳ Bà và đàn Tranh 19 dây; mặt đàn chế tác từ gỗ Ngô Đồng xứ Huế phơi tự nhiên 10 năm; hệ vách tán âm kép dạng nan tre và gỗ Dáng Hương uốn cong mềm mại; thời gian vang RT60 = 0.35s giúp từng tiếng gảy móng đồi mồi nảy hạt trong vắt như mưa rào mùa hạ; hệ tủ kính vi khí hậu 55% RH bảo tồn độ căng dây tơ lụa truyền thống.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử các trích đoạn kinh điển: Lưu Thủy Kim Tiền, Dạ Cổ Hoài Lang, Thập Diện Mai Phục qua Web Audio API.
   - Bảng 19 dây đàn Tranh tương tác cho phép chạm / nhấn rung phím phát nốt nhạc ngũ cung (Hò, Xự, Xang, Xê, Cống).
   - Điều khiển kịch bản chiếu sáng thính phòng: Đèn Lồng Trăng Rằm, Chiều Tà Ven Sông, Dạ Khúc Cố Đô.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: TRÁP TRÀ SƠN MÀI CỐT MÂY ĐAN ĐỊNH QUÁN (ArtisanRattanCoreLacquerTeaCaddyAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanRattanCoreLacquerTeaCaddyAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Giao Thoa Mây Đan Bản Địa & Sơn Mài Truyền Thống:
   - Tác phẩm tráp đựng trà quý chế tác từ cốt mây nước Định Quán đan tay mắt cáo siêu khít; bọc vải màn tơ tằm quét 15 lớp sơn ta Phú Thọ mài nước tỉ mỉ; bề mặt thếp vàng quỳ 24K Kiêu Kỵ vẽ tay tích "Hương Trà Vạn Dặm"; nắp kép khít khí tuyệt đối chống ẩm nhiệt đới bảo tồn trọn vẹn hương trà Shan Tuyết cổ thụ nghìn năm tuổi (\`GU-CADDY-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính soi cận cảnh 16x chiêm ngưỡng lớp cốt mây đan ẩn hiện dưới lớp sơn mài cánh gián sâu thẳm.
   - Thử nghiệm độ khít nắp tráp trà (hiệu ứng nén khí tự hạ nắp êm dịu không tiếng động).
   - Form may đo cá nhân hóa: Lựa chọn họa tiết dát vàng, khắc chữ thư pháp và gia huy chủ nhân.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-63): add SaigonZenKaresansuiGardenSanctuary, SaigonAcousticTraditionalLuteSanctuary, and ArtisanRattanCoreLacquerTeaCaddyAtelier with 100% SEO pass'
`;

async function dispatchSprint63() {
  console.log(`[Master Orchestrator] Dispatching Sprint 63 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-61-sprint-63-karesansui-lute-rattancaddy',
    title: 'Vườn Thiền Karesansui Sài Gòn, Phòng Âm Tỳ Bà Cổ & Tráp Trà Sơn Mài Cốt Mây',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 63 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_63_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint63();
