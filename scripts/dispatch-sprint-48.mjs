import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_48_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 48: XƯỞNG ĐIỀU HƯƠNG HAUTE PARFUMERIE, GIƯỜNG NGHỈ TREO LƠ LỬNG & LƯ ĐỒNG XÔNG TRẦM ĐẠI VIỆT]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 48:
"XƯỞNG ĐIỀU HƯƠNG HAUTE PARFUMERIE, GIƯỜNG NGHỈ TREO LƠ LỬNG & LƯ ĐỒNG XÔNG TRẦM ĐẠI VIỆT"

Mục tiêu cốt lõi: Thiết kế xưởng điều chế mùi hương không gian Haute Parfumerie kiểm soát khí hậu 18°C; chế tác giường nghỉ Daybed treo lơ lửng ban công penthouse chịu tải 600kg; và đúc bộ lư xông trầm hương đồng mắt cua chạm hoa văn mây cuộn cổ truyền.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG XƯỞNG ĐIỀU HƯƠNG KHÔNG GIAN (SaigonArtisanBespokeParfumVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonArtisanBespokeParfumVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Ký Ức Khứu Giác Trong Không Gian Kiến Trúc:
   - Phòng thí nghiệm điều chế hương thơm thửa riêng với tủ bảo quản 48 lọ tinh chất tự nhiên quý hiếm (Trầm hương Hà Tĩnh, Hoa lài Sa Đéc, Cam hương Thanh Trà Huế, Tuyết tùng Atlas); tủ kính quang học lọc 100% tia cực tím giữ ổn định phân tử mùi; nhiệt độ duy trì 18°C - 20°C & 55% RH; bàn pha chế đá thạch anh trắng ghép gỗ Mun sọc có phễu hút mùi âm mặt bàn màng than hoạt tính triệt tiêu mùi tạp; dụng cụ pha chế thủy tinh thổi thủ công.
2. Tính năng kỹ thuật & UI tương tác:
   - Tháp hương thơm 3 tầng tương tác: Nốt đầu (Top Notes - Thanh mát sảng khoái), Nốt giữa (Heart Notes - Thảo mộc hoa cỏ nhiệt đới), Nốt cuối (Base Notes - Gỗ quý, trầm hương, xạ hương ấm sâu).
   - Trình phối trộn hương thơm ảo và xuất công thức hương độc bản cho từng phòng chức năng.
   - Bảng chỉ số môi trường bảo quản hương thơm thời gian thực.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: GIƯỜNG NGHỈ TREO LƠ LỬNG BAN CÔNG LOGIA (SaigonFloatingInfinityDaybedPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonFloatingInfinityDaybedPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Trôi Bồng Bềnh Giữa Tầng Mây Sài Gòn:
   - Giường nghỉ Daybed ngoài trời treo lơ lửng bằng 4 sợi cáp SS316 bọc da bò thảo mộc dập logo chìm; khung giường uốn lượn từ gỗ Teak Miến Điện 100% chịu mưa nắng không cong vênh; đệm ngồi mút QuickDry Foam thoát nước tức thì bọc vải Sunbrella dệt sợi Acrylic kháng tia UV; khay xoay 360° để trà và sách; đèn LED hắt đáy Warm Amber 2200K tạo cảm giác bay bổng không trọng lượng; tải trọng an toàn tĩnh 600kg.
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng dao động đu đưa êm dịu (Gentle Sway Physics) thư thái.
   - Chuyển đổi 3 thời khắc trong ngày: Nắng Sớm Ban Mai, Hoàng Hôn Rực Rỡ, Đêm Trăng Sông Sài Gòn.
   - Thử nghiệm độ an toàn chịu tải trọng và độ êm của đệm mút QuickDry.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ LƯ ĐỒNG XÔNG TRẦM HOA VĂN MÂY CUỘN (ArtisanBronzeIncenseBurnerAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanBronzeIncenseBurnerAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Đạo Trầm Tinh Khiết - Khói Mây Tụ Tán:
   - Tác phẩm lư xông trầm đúc từ đồng mắt cua nguyên khối theo phương pháp đúc mẫu sáp truyền thống; hoa văn mây cuộn Đại Việt thời Lê Trung Hưng chạm lộng thủ công tinh xảo; đế lót đĩa gốm men rạn Bát Tràng men tro trấu; lõi xông nhiệt gốm điện trở MCH không khói đen giúp thưởng trọn 100% nốt hương thanh ngọt của trầm kiến và kỳ nam (\`GU-INCENSE-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng khói trầm lượn sóng cuộn mây qua các khe lộng đồng.
   - Điều khiển nhiệt độ nung trầm chính xác: 140°C (Trầm nụ nhẹ) -> 170°C (Trầm miếng tự nhiên) -> 210°C (Kỳ nam hảo hạng).
   - Form may đo khắc tên gia chủ và họa tiết phong thủy riêng biệt.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-48): add SaigonArtisanBespokeParfumVault, SaigonFloatingInfinityDaybedPavilion, and ArtisanBronzeIncenseBurnerAtelier with 100% SEO pass'
`;

async function dispatchSprint48() {
  console.log(`[Master Orchestrator] Dispatching Sprint 48 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-46-sprint-48-parfum-daybed-incense',
    title: 'Xưởng Điều Hương Haute Parfumerie, Giường Nghỉ Treo & Lư Đồng Xông Trầm',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 48 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_48_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint48();
