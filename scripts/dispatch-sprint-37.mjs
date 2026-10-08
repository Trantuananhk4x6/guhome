import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_37_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 37: CẦU THANG XOẮN RIBBON, HẦM SIÊU XE ÁP SUẤT DƯƠNG & XƯỞNG RÈM TƠ TẰM]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 36:
- SaigonBreezeWindChimeArtisanAtelier, ArtisanBasaltColdPlungeVault, và PrivateFamilySanctuaryPanicRoom đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống chuông gió đồng cổ ngũ âm, bồn ngâm lạnh Cold Plunge đá bazan 3°C và phòng an toàn Panic Room cửa thép giấu tường đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 37:
"CẦU THANG XOẮN RIBBON, HẦM SIÊU XE ÁP SUẤT DƯƠNG & XƯỞNG RÈM TƠ TẰM"

Mục tiêu cốt lõi: Thiết kế cầu thang xoắn điêu khắc dải lụa Ribbon gỗ sồi nguyên khối không cột trụ trung tâm; chế tác hầm đỗ xe cổ và siêu xe áp suất dương 50% RH chống gỉ sét; và kiến tạo xưởng may đo rèm tơ tằm Bảo Lộc dệt tay cản nhiệt nắng Tây.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: CẦU THANG XOẮN ĐIÊU KHẮC DẢI LỤA RIBBON (ArtisanHelicalRibbonStaircaseVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanHelicalRibbonStaircaseVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Điêu Khắc Không Gian Động Của Dinh Thự:
   - Cầu thang không đơn thuần là giao thông đứng mà là tác phẩm nghệ thuật trung tâm đại sảnh. Xương thép xoắn 3D chịu lực uốn nhiệt bọc ván sồi trắng nguyên khối, tay vịn liền mạch vuốt tay 120 giờ không mối nối thô, dải đèn LED Warm Dim 2200K giấu dưới từng bậc thang tỏa ánh sáng hổ phách êm đềm.
2. Tính năng kỹ thuật & UI tương tác:
   - Thử nghiệm độ êm và triệt tiêu rung chấn kết cấu bước chân.
   - Trình duyệt góc nhìn 3D dải lụa Ribbon xoay 360°.
   - Độ chịu tải động 500 kg/bậc kiểm định an toàn nghiêm ngặt.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: HẦM TRƯNG BÀY SIÊU XE ÁP SUẤT DƯƠNG (CollectorAutomotiveCleanroomVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/CollectorAutomotiveCleanroomVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Bảo Tồn Những Cỗ Máy Biểu Tượng:
   - Những siêu xe Ferrari, Porsche cổ cần môi trường phòng sạch như bảo tàng: Áp suất dương +20 Pa ngăn bụi mịn đô thị, độ ẩm kiểm soát chính xác 50% RH chống mốc ghế da và oxy hóa mạ chrome, trần xuyên sáng Barrisol 5000K mô phỏng ánh sáng studio không bóng đổ.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình giám sát áp suất dương và độ ẩm phòng sạch.
   - Thử nghiệm độ phản xạ ánh sáng trên nước sơn siêu xe.
   - Sàn epoxy kim loại kháng hóa chất chống trượt.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: XƯỞNG MAY ĐO RÈM TƠ TẰM DỆT TAY (ArtisanBotanicalCurtainAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanBotanicalCurtainAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Lớp Vải Thở Che Chắn Khí Nóng Sài Gòn:
   - Rèm dệt tay từ sợi tơ tằm Bảo Lộc và đay tự nhiên nhuộm củ nâu truyền thống; cản 95% bức xạ nhiệt mặt trời hướng Tây, giảm nhiệt độ phòng -4.5°C; động cơ Somfy Ultra-Quiet chuyển động êm dưới 25 dBA tích hợp quản gia số (\`GU-CURTAIN-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Thử nghiệm xúc giác sợi tơ tằm dệt thô mộc vs vải polyester công nghiệp.
   - Bộ tính toán độ cản nhiệt và ánh sáng theo hướng nhà.
   - Form tư vấn may đo rèm thông tầng chiều cao tới 6m.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-37): add ArtisanHelicalRibbonStaircaseVault, CollectorAutomotiveCleanroomVault, and ArtisanBotanicalCurtainAtelier with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!
`;

console.log('Updating master-orchestrator-state.json for Sprint 37...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-35-sprint-37-ribbonstair-autocleanroom-curtain',
    title: 'Cầu Thang Xoắn Ribbon, Hầm Siêu Xe Áp Suất Dương & Xưởng Rèm Tơ Tằm',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 37 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 37', TARGET_ID, SPRINT_37_DIRECTIVE],
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
