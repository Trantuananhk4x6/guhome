import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_72_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 72: PHÒNG THÍNH ÂM ĐÀN SITAR VÒM CẨM LAI, VỌNG LÂU NGÓI CỔ ÂM DƯƠNG CHỢ LỚN & LƯ ĐỐT TRẦM PHÁP LAM LIÊN HOA]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 72:
"PHÒNG THÍNH ÂM ĐÀN SITAR VÒM CẨM LAI, VỌNG LÂU NGÓI CỔ ÂM DƯƠNG CHỢ LỚN & LƯ ĐỐT TRẦM PHÁP LAM LIÊN HOA"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn Sitar & Tanpura thùng cộng hưởng quả bầu vòm gỗ Cẩm Lai tán âm RT60 = 0.33s; kiến tạo vọng lâu sân trong lợp ngói cổ âm dương Chợ Lớn men xanh lý máng xối đồng đỏ hạ nhiệt vi khí hậu 3.8°C; và chế tác lư đốt trầm hương Pháp Lam liên hoa ngũ sắc nung 850°C cẩn chỉ đồng 0.25mm độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍNH ÂM ĐÀN SITAR VÒM GỖ CẨM LAI (SaigonAcousticSitarSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticSitarSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Hưởng Raga Phương Đông:
   - Thính phòng dành riêng cho đàn Sitar 20 dây (7 dây gảy + 13 dây bồi âm sympathetic strings); thùng đàn bằng quả bầu khô Kaddu ngâm tinh dầu gỗ đàn hương; cần đàn gỗ Cẩm Lai đỏ vân mây; vòm tán âm Fermat triệt tiêu giao thoa âm sắc; thời gian vang RT60 = 0.33s; thảm dệt lông cừu Kashmir dệt tay êm ái.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe trích đoạn Raga Bhairav (Ban Mai Tĩnh Lặng) và Raga Yaman (Hoàng Hôn Ấm Áp) qua Web Audio API.
   - Sơ đồ tương tác 13 dây rung bồi âm cộng hưởng tự nhiên.
   - Điều khiển 3 kịch bản ánh sáng thiền định (2200K, 2700K, 3200K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: VỌNG LÂU SÂN TRONG NGÓI CỔ ÂM DƯƠNG CHỢ LỚN (SaigonHeritageTerracottaTileCourtyardPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonHeritageTerracottaTileCourtyardPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Vọng Lâu Mộc Mạc - Mát Lành Nắng Gắt:
   - Vọng trà sân trong lợp 4 tầng ngói cổ âm dương Chợ Lớn nung củi men xanh lý cuối thế kỷ 19; hệ cột gỗ Căm Xe tròn đẽo tay đặt trên chân tảng đá xanh Bửu Long; máng xối đồng đỏ gò tay chảy giọt ranh vào ang nước gốm Cây Mai; hạ nhiệt vi khí hậu 3.8°C; độ tĩnh âm thanh tịnh.
2. Tính năng kỹ thuật & UI tương tác:
   - Biểu đồ nhiệt vi khí hậu thời gian thực so sánh giữa ngoài trời (37.5°C) và dưới bóng ngói âm dương (29.5°C).
   - Web Audio tiếng giọt mưa ranh rơi tí tách xuống ang gốm hoa sen.
   - Form tư vấn kiến tạo vọng lâu sân trong cho biệt thự nhà vườn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: LƯ ĐỐT TRẦM HƯƠNG PHÁP LAM LIÊN HOA (ArtisanHandmadeCloisonneIncenseBurnerVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeCloisonneIncenseBurnerVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Khói Trầm Cung Đình - Đỉnh Cao Men Pháp Lam:
   - Lư đốt trầm hương hình búp hoa sen chế tác theo nghệ thuật Pháp Lam cung đình Huế thất truyền; cốt đồng đỏ dát mỏng gò tay, uốn từng sợi chỉ đồng 0.25mm tạo hoa văn cánh sen và mây cuộn, tra men thủy tinh xanh ngọc lục bảo và đỏ chu sa nung 4 lần ở 850°C mài bóng gương; chân đế tam lân mạ vàng quỳ 24K (\`GU-INCENSE-BURNER-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính lúp soi 18x đường chỉ đồng mảnh như tơ ngăn cách từng ô men màu Pháp Lam.
   - Trình mô phỏng làn khói trầm Kỳ Nam cuộn bay từ nhụy sen nắp lư qua Web Audio tiếng tĩnh tâm êm đềm.
   - Form may đo đặt đúc lư cá nhân hóa khắc niên hiệu gia tộc.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-72): add SaigonAcousticSitarSanctuarySalon, SaigonHeritageTerracottaTileCourtyardPavilion, and ArtisanHandmadeCloisonneIncenseBurnerVault with 100% SEO pass'
`;

async function dispatchSprint72() {
  console.log(`[Master Orchestrator] Dispatching Sprint 72 to Agent ${TARGET_ID}...`);

  try {
    const child = spawn(
      LANGUAGE_SERVER_EXE,
      ['client', 'send-message', '--recipient', TARGET_ID, '--message', SPRINT_72_DIRECTIVE],
      { stdio: 'inherit', shell: true }
    );

    child.on('close', (code) => {
      console.log(`[Master Orchestrator] Direct message child process exited with code ${code}`);
    });

    if (fs.existsSync(STATE_PATH)) {
      const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
      state.queuedSprints = state.queuedSprints || [];
      if (!state.queuedSprints.includes(72)) {
        state.queuedSprints.push(72);
      }
      state.lastUpdated = new Date().toISOString();
      fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
      console.log('[Master Orchestrator] Updated master-orchestrator-state.json with queued Sprint 72.');
    }
  } catch (err) {
    console.error('[Master Orchestrator] Error dispatching Sprint 72:', err);
  }
}

dispatchSprint72();
