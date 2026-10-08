import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_54_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 54: PHÒNG TĨNH TÂM CỔ CẦM GỖ NGÔ ĐỒNG, PHÒNG XÔNG HƠI THẢO DƯỢC ĐÁ VIOLA & ĐỈNH ĐỒNG TAM KHÍ HOÀNG GIA]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 54:
"PHÒNG TĨNH TÂM CỔ CẦM GỖ NGÔ ĐỒNG, PHÒNG XÔNG HƠI THẢO DƯỢC ĐÁ VIOLA & ĐỈNH ĐỒNG TAM KHÍ HOÀNG GIA"

Mục tiêu cốt lõi: Thiết kế phòng tĩnh tâm Cổ Cầm 7 dây vòm gỗ Ngô Đồng đạt chuẩn độ ồn nền NC-15; kiến tạo phòng xông hơi ướt thảo dược tự nhiên vách đá Calacatta Viola nguyên khối; và đúc bộ đỉnh đồng tam khí khảm vàng bạc chạm hoa văn mây lửa Đại Việt.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG TĨNH TÂM CỔ CẦM GỖ NGÔ ĐỒNG (SaigonAcousticGuqinSanctuaryPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticGuqinSanctuaryPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Tiếng Đàn Tri Âm - Đáy Sâu Tĩnh Mịch:
   - Không gian tĩnh dưỡng âm thanh dành riêng cho nghệ thuật Cổ Cầm (Guqin) với cây đàn chế tác từ gỗ Ngô Đồng cổ ngàn năm phối gỗ Sa Mộc; dây tơ se tay truyền thống; vòm trần bọc vải thô nhuộm củ nâu triệt tiêu phản xạ âm với độ ồn nền NC-15 (&lt; 18 dBA); bàn đàn phiến đá bazan nguyên khối; tủ kính dưỡng đàn giữ độ ẩm 55% RH.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình gảy thử 7 âm sắc Cổ Cầm sâu lắng qua Web Audio API (Lưu Thủy, Dương Quan).
   - Biểu đồ âm học tĩnh lặng và đo độ ồn nền không gian.
   - 3 kịch bản ánh sáng thiền tịnh tĩnh tại.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: PHÒNG XÔNG HƠI THẢO DƯỢC ĐÁ CALACATTA VIOLA (SaigonRiversideHerbalSteamPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonRiversideHerbalSteamPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Thanh Lọc Thân Tâm Trong Hơi Thảo Mộc Rừng Sâu:
   - Phòng xông hơi ướt ốp toàn bộ đá cẩm thạch Calacatta Viola Ý nguyên khối không ron nối; nồi xông đồng đỏ nung nhiệt bằng điện trở gốm MCH bốc hơi sương mù nano 3 micron ở 46°C & 100% RH với thảo mộc tươi (ngải cứu, lá bưởi, sả chanh, bạc hà); ghế đá sưởi ấm công thái học 38°C; sen tắm xối thác nước khoáng lạnh 18°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ chọn liệu trình xông hơi 3 mùa: Hạ Nhiệt Mùa Nắng, Ấm Phổi Mùa Mưa, Phục Hồi Cơ Sau Thể Thao.
   - Mô phỏng hơi nước sương mù nano và tiếng nước sôi âm ỉ qua Web Audio API.
   - Form tư vấn kiến tạo phòng xông hơi ướt cao cấp cho penthouse và biệt thự.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ ĐỈNH ĐỒNG TAM KHÍ KHẢM VÀNG BẠC (ArtisanBronzeIncenseFurnaceVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanBronzeIncenseFurnaceVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Đỉnh Đồng Vững Chãi - Phúc Khí Trường Tồn:
   - Tác phẩm đỉnh đồng ba chân đúc từ đồng đỏ nguyên khối khảm tam khí (Vàng 9999, Bạc 925, Đồng đỏ) chạm khắc rồng chầu mặt nguyệt và hoa văn mây lửa Đại Việt thời Hậu Lê; nắp đỉnh tượng lân vờn ngọc xông khói trầm tỏa ra bốn phương; buồng đốt gốm chịu nhiệt giữ than củi không tắt suốt 6 giờ (\`GU-FURNACE-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình xoay 360° đỉnh đồng tam khí với các góc phản chiếu kim loại quý.
   - Mô phỏng làn khói trầm uốn lượn nhả khói qua miệng lân.
   - Form may đo chạm khắc minh văn gia phả và niên hiệu độc bản.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-54): add SaigonAcousticGuqinSanctuaryPavilion, SaigonRiversideHerbalSteamPavilion, and ArtisanBronzeIncenseFurnaceVault with 100% SEO pass'
`;

async function dispatchSprint54() {
  console.log(`[Master Orchestrator] Dispatching Sprint 54 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-52-sprint-54-guqin-steam-furnace',
    title: 'Phòng Cổ Cầm Gỗ Ngô Đồng, Xông Hơi Đá Viola & Đỉnh Đồng Tam Khí',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 54 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_54_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint54();
