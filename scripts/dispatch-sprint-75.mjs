import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_75_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 75: THÍNH PHÒNG TAMBOURINE VÒM PƠ-MU, VƯỜN DƯỢC LIỆU BẬC THANG VEN SÔNG & HŨ TRÀ BẠC TRẦM HƯƠNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt biểu dương kết quả xuất sắc của Sprint 74 (100% Routes PASS, 0 lỗi TypeScript, Production build thành công vượt bậc). Tiếp tục chuỗi sáng tạo tinh hoa không ngừng nghỉ, phát lệnh SPRINT 75:
"THÍNH PHÒNG TAMBOURINE VÒM PƠ-MU, VƯỜN DƯỢC LIỆU BẬC THANG VEN SÔNG & HŨ TRÀ BẠC TRẦM HƯƠNG"

Mục tiêu cốt lõi: Thiết kế thính phòng hòa âm nhạc cụ gõ Tambourine & Lục Lạc vòm gỗ Pơ-Mu Lai Châu âm học RT60 = 0.31s; kiến tạo vườn dược liệu bậc thang ven sông Sài Gòn kè đá bazan Đắk Nông hạ nhiệt vi khí hậu 4.8°C; và chế tác hũ ủ trà ngự dụng bằng bạc ta 999 bọc lõi trầm hương rục Khánh Hòa với nắp khóa chân không kép.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: THÍNH PHÒNG TAMBOURINE VÒM PƠ-MU (SaigonAcousticTambourineSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticTambourineSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Sắc Nhịp Gõ Cung Đình & Tinh Dầu Pơ-Mu Chống Ẩm:
   - Thính phòng hòa âm gõ Tambourine cổ điển và Lục Lạc tambourine 16 cặp chuông lá đồng thau dát mỏng; khung vành bằng gỗ Cẩm Lai uốn cong hơi nước; mặt trống da dê núi sấy tự nhiên căng bằng đinh tán đồng; hệ nan vòm xoắn ốc Fibonacci ốp gỗ Pơ-Mu Lai Châu tỏa hương thơm dịu nhẹ, xua đuổi côn trùng và triệt ẩm mốc tự nhiên; thời gian vang RT60 = 0.31s triệt tiêu rung chấn dải tần 200Hz - 5.000Hz; hệ tủ vi khí hậu 50% RH giữ độ căng đàn hồi của mặt da.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe trích đoạn nhịp gõ: Tarantella Napoletana (Ý), Flamenco Alegrias (Tây Ban Nha), Khúc Rước Hội Đền Hùng qua Web Audio API.
   - Bảng 3 kỹ thuật gõ tương tác: Gõ Lòng Bàn Tay (Open Palm Strike), Miết Ngón Tay Rung Chuông (Thumb Roll), Lắc Lục Lạc Rung Dồn Dập (Continuous Shake).
   - Điều khiển 3 kịch bản ánh sáng thính phòng hoàng gia (2200K, 2800K, 1900K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: VƯỜN DƯỢC LIỆU BẬC THANG VEN SÔNG (SaigonRiversideTerracedHerbalOrchardPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonRiversideTerracedHerbalOrchardPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Vườn Thuốc Nam & Cảnh Quan Vi Khí Hậu Sông Nước:
   - Vọng cảnh vườn dược liệu 3 tầng bậc thang ven bờ sông Sài Gòn; kè đá bazan Đắk Nông xếp khan tự chèn thoát nước lũ và mưa nhiệt đới cực nhanh; thảm thảo mộc ngải cứu trắng, sả chanh, bạc hà ngâm sương hấp thụ 88% bức xạ nhiệt hướng Tây gay gắt, làm mát luồng gió sông thổi vào biệt thự, hạ nhiệt độ vi khí hậu 4.8°C; giàn phun sương vi lượng nano giữ ẩm không khí vào ban trưa; lối dạo lát đá cuội suối chà nhám chống rêu.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ điều chỉnh hệ thống phun sương nano và đo mức độ hạ nhiệt không gian thời gian thực (-4.8°C).
   - Bản đồ 4 loài thảo mộc trị liệu bản địa: Tác dụng xua muỗi, thanh lọc phổi và an thần giấc ngủ.
   - Web Audio tiếng gió sông Sài Gòn xào xạc luồn qua tán lá thảo mộc hòa âm tiếng dế đêm 30dB.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: HŨ TRÀ BẠC BỌC TRẦM HƯƠNG RỤC (ArtisanImperialSilverAgarwoodTeaCaddyAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanImperialSilverAgarwoodTeaCaddyAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Nghi Thức Lưu Giữ Hương Sắc Trà Shan Tuyết Hoàng Gia:
   - Hũ đựng trà ngự dụng chế tác từ bạc ta 999 dày 1.8mm gò tay thủ công; lõi trong lót gỗ Trầm Hương rục tự nhiên ngàn năm Khánh Hòa tỏa hương thơm trầm ấm ngấm sâu vào từng búp trà; nắp hũ thiết kế ren kép côn mài siêu khít chân không chống ẩm nồm 100%; thân ngoài chạm khắc hoa văn Tứ Quý Tùng Cúc Trúc Mai hoặc Tứ Linh chầu nguyệt (\`GU-AGARWOOD-CADDY-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng kiểm tra độ kín khí chân không của nắp hũ bạc.
   - Kính soi hoa văn chạm lộng bạc ta 999 độ phóng đại 12x dưới ánh nến.
   - Form cá nhân hóa: Chọn 3 dung tích (Tiểu Hũ 100g / Trung Hũ 250g / Đại Hũ 500g) và khắc chữ Triện niên hiệu riêng của gia chủ.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (lưu ý array indexing type assertion khi noUncheckedIndexedAccess bật).
2. Typography Quiet Luxury: Tuyệt đối không dùng em-dash '—' (dùng '-'), không dùng en-dash '–' trong khoảng số.
3. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS (153/153 routes).
4. Production Build: Chạy 'npm run build' (next build --webpack) exit code 0.
5. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-75): add SaigonAcousticTambourineSanctuarySalon, SaigonRiversideTerracedHerbalOrchardPavilion, and ArtisanImperialSilverAgarwoodTeaCaddyAtelier with 100% SEO pass'
`;

async function dispatchSprint75() {
  console.log(`[Master Orchestrator] Dispatching Sprint 75 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-73-sprint-75-tambourine-herbalorchard-silveragarwoodcaddy',
    title: 'Thính Phòng Tambourine Vòm Pơ-Mu, Vườn Dược Liệu Bậc Thang Ven Sông & Hũ Trà Bạc Trầm Hương',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 75 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_75_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint75();
