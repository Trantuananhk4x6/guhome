import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_31_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 31: ĐÀI QUAN SÁT THIÊN VĂN MÁI KÍNH, XƯỞNG HƯƠNG KHÔNG GIAN & ỨNG DỤNG QUẢN GIA SỐ DINH THỰ]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 30:
- SaigonBiophilicGreenWallAtelier, ArtisanHandCastBronzeBasinVault, và MasterArchitecturalDossierArchive đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống tường đứng thủy canh sinh học, bồn tắm đá sa thạch đục tay 1.4 tấn và kho hồ sơ hoàn công bìa da A3 dập nhũ vàng 24K đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 31:
"ĐÀI QUAN SÁT THIÊN VĂN MÁI KÍNH, XƯỞNG HƯƠNG KHÔNG GIAN & ỨNG DỤNG QUẢN GIA SỐ DINH THỰ"

Mục tiêu cốt lõi: Thiết kế đài ngắm sao thiên văn mái kính cơ điện trượt mở tự động cho penthouse & dinh thự ven sông; kiến tạo hệ thống vi khuếch tán hương thơm đa tầng tích hợp ống gió điều hòa; và số hóa trải nghiệm sống với bảng điều khiển quản gia số riêng tư không lưu trữ đám mây.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: ĐÀI QUAN SÁT THIÊN VĂN MÁI KÍNH TỰ ĐỘNG (SaigonRooftopStargazingObservatory.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonRooftopStargazingObservatory.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Chiêm Ngưỡng Vũ Trụ Từ Mái Nhà Sài Gòn:
   - Penthouse tầng cao hay sân thượng dinh thự ven sông là nơi tách biệt khỏi ánh sáng đèn đường chói gắt. GuHomes thiết kế mái vòm kính cường lực Low-E 3 lớp cơ điện trượt mở êm ái, bệ kính thiên văn đá bazan triệt tiêu rung chấn và hệ thống sưởi kính chống đọng sương mù ban đêm.
2. Tính năng kỹ thuật & UI tương tác:
   - Bản đồ tinh vân tương tác theo tọa độ Sài Gòn (10.7769° N, 106.7009° E).
   - Bộ lọc ánh sáng quang phổ khử ô nhiễm sáng đô thị (Bortle Class 5 -> Class 2).
   - Trình điều khiển trượt mở mái kính êm ái dưới 22 dBA và góc quay kính viễn vọng 360°.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: XƯỞNG HƯƠNG KHÔNG GIAN VI KHUẾCH TÁN (BespokeOlfactoryFragranceAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/BespokeOlfactoryFragranceAtelier.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Kiến Trúc Khứu Giác Chạm Đến Cảm Xúc:
   - Ngôi nhà thượng lưu được nhận diện bằng mùi hương độc bản. GuHomes lắp đặt hệ thống vi khuếch tán khí lạnh Cold-Air Nebulization đưa hạt hương kích thước dưới 0.1 micron trực tiếp vào đường ống gió tươi AHU/FCU mà không làm ẩm mốc đồ gỗ.
2. Tính năng kỹ thuật & UI tương tác:
   - 3 tầng hương phối trộn thảo mộc Việt: Hương đầu Vỏ bưởi Diễn / Cam đắng, Hương giữa Trầm hương Tiên Phước / Hoa sen Đồng Tháp, Hương cuối Gỗ đàn hương & Long diên hương.
   - Trình cân chỉnh tỷ lệ nốt hương tương tác (Top - Heart - Base) và lịch trình khuếch tán theo nhịp sinh học (Sáng năng lượng - Tối thư giãn).
   - Vỏ máy hợp kim đồng thau nguyên khối gõ tay tinh xảo.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BẢNG ĐIỀU KHIỂN QUẢN GIA SỐ DINH THỰ (PrivateEstateDigitalButlerPortal.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/PrivateEstateDigitalButlerPortal.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Vận Hành Riêng Tư & An Mật Tuyệt Đối:
   - Không phụ thuộc vào các máy chủ ngoại quốc, hệ thống quản gia số GuHomes chạy trên máy chủ bảo mật Local Edge Server ngay trong hầm gia đình. Mọi dữ liệu camera, điều khiển vi khí hậu và bảo trì gỗ đều mã hóa AES-256.
2. Tính năng kỹ thuật & UI tương tác:
   - Bảng điều khiển cảm ứng: Kịch bản Tiếp Khách Thượng Lưu, Kịch bản Thưởng Trà Tối, Kịch bản Ngủ Sâu NC-25.
   - Cổng kết nối bảo hành trực tiếp 24/7 tới tổ thợ mộc Thạnh Xuân (Đặt lịch Home Wood Spa định kỳ 6 tháng).
   - Trình mô phỏng giao diện Quản gia số iPad/Smartphone kèm mã kích hoạt VIP \`GU-BUTLER-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-31): add SaigonRooftopStargazingObservatory, BespokeOlfactoryFragranceAtelier, and PrivateEstateDigitalButlerPortal with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!
`;

console.log('Updating master-orchestrator-state.json for Sprint 31...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-29-sprint-31-observatory-fragrance-butler',
    title: 'Đài Quan Sát Thiên Văn Mái Kính, Xưởng Hương Không Gian & Ứng Dụng Quản Gia Số Dinh Thự',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 31 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 31', TARGET_ID, SPRINT_31_DIRECTIVE],
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
