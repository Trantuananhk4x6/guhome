import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_46_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 46: TRẦN SAO SỢI QUANG BẦU TRỜI ĐÊM, XƯỞNG SƠN MÀI CẨN TRỨNG & TRÀ THẤT CHASHITSU CHIẾU CÓI]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng pipeline vận hành xuyên đêm với Sprint 46:
"TRẦN SAO SỢI QUANG BẦU TRỜI ĐÊM, XƯỞNG SƠN MÀI CẨN TRỨNG & TRÀ THẤT CHASHITSU CHIẾU CÓI"

Mục tiêu cốt lõi: Thiết kế trần sao sợi quang học PMMA 1.600 điểm sao tái hiện bản đồ sao trời đêm Sài Gòn kèm sao băng; bảo tồn và trưng bày nghệ thuật sơn mài truyền thống cẩn vỏ trứng và dát vàng quỳ 24K; và thiết kế không gian trà thất Chashitsu chiếu cói tự nhiên Định Yên kết hợp lò than âm sàn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: TRẦN SAO QUANG HỌC BẦU TRỜI ĐÊM SÀI GÒN (SaigonStarlightFiberOpticCeilingVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonStarlightFiberOpticCeilingVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Vòm Trời Tinh Tú Tĩnh Lặng Giữa Đô Thị:
   - Hệ thống trần sao sợi quang học PMMA cao cấp với 1.600 đầu sợi phát quang đường kính đa kích cỡ (0.5mm, 0.75mm, 1.0mm, 1.5mm) định vị chính xác theo bản đồ sao thiên văn đêm hè Sài Gòn (vĩ độ 10.7769° N); tích hợp 8 kênh mô phỏng vệt sao băng rơi ngẫu nhiên; dải Ngân Hà mềm mại phát quang ánh sáng RGBW 2700K - 6000K; tấm nền âm học sợi khoáng bọc nhung dạ hấp thụ âm RT60 < 0.28s.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ chọn bản đồ chòm sao: Chòm Sao Bắc Đẩu (Ursa Major), Chòm Thiên Hạt (Scorpio), Chòm Thợ Săn (Orion), Dải Ngân Hà (Milky Way).
   - Nút kích hoạt hiệu ứng sao băng rơi (Shooting Star Simulator) với quỹ đạo ngẫu nhiên.
   - Điều khiển cường độ sáng và tốc độ nhấp nháy (Twinkle Speed 0 - 100%).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: PHÒNG KIỆT TÁC SƠN MÀI CẨN VỎ TRỨNG & VÀNG QUỲ (SaigonArtisanLacquerwareGallerySanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonArtisanLacquerwareGallerySanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Chiều Sâu Hun Hút Của Nhựa Cây Sơn Ta:
   - Không gian bảo tồn tác phẩm sơn mài Việt Nam truyền thống với vách bình phong và bàn console mộc phủ 18 lớp sơn son then từ nhựa cây sơn ta Phú Thọ; kỹ thuật cẩn vỏ trứng vịt tạo hình hoa sen và dát lá vàng quỳ 24K Kiêu Kỵ lấp lánh ẩn hiện dưới lớp sơn mài bóng nước; hệ thống chiếu sáng hắt viền 20° UGR < 12 tôn vinh màu then thăm thẳm; tủ bảo quản kiểm soát vi khí hậu độ ẩm 65% RH.
2. Tính năng kỹ thuật & UI tương tác:
   - Sơ đồ 18 công đoạn chế tác tranh sơn mài cổ truyền (Bó hom vóc, Dát vàng quỳ, Cẩn vỏ trứng, Mài nước, Đánh bóng bằng lòng bàn tay).
   - Trình duyệt tương tác góc phản xạ ánh sáng trên nền vàng quỳ và lớp vỏ trứng.
   - Kính phóng đại 10x soi từng vết rạn tự nhiên của vỏ trứng cẩn thủ công.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: TRÀ THẤT CHASHITSU CHIẾU CÓI TỰ NHIÊN ĐỒNG THÁP (ArtisanJapaneseTatamiChashitsuTeaAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanJapaneseTatamiChashitsuTeaAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Hòa Hợp - Kính Trọng - Thanh Tịnh - Tĩnh Lặng (Wa Kei Sei Jaku):
   - Không gian thiền trà Chashitsu kết hợp văn hóa bản địa Nam Bộ với hệ chiếu Tatami dệt từ cói tự nhiên Định Yên (Đồng Tháp) sấy thảo mộc thơm mát; sàn gỗ Hinoki giật cấp 350mm tạo ranh giới thanh lọc tâm trí; lò đun gang nước sôi bằng than củi không khói âm sàn; vách trượt Shoji bọc giấy Washi mờ khuếch tán ánh sáng sân vườn êm dịu (\`GU-TATAMI-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ cấu hình mặt bằng phòng trà: 4.5 chiếu (Koma - Tối giản cổ điển), 6 chiếu (Thân mật), 8 chiếu (Đại trà thất).
   - Mô phỏng âm thanh nước reo trong ấm gang Tetsubin (tiếng gió qua rừng thông - Matsukaze) qua Web Audio API.
   - Form tư vấn may đo phòng trà thất cho biệt thự và penthouse.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-46): add SaigonStarlightFiberOpticCeilingVault, SaigonArtisanLacquerwareGallerySanctuary, and ArtisanJapaneseTatamiChashitsuTeaAtelier with 100% SEO pass'
`;

async function dispatchSprint46() {
  console.log(`[Master Orchestrator] Dispatching Sprint 46 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-44-sprint-46-starlight-lacquer-tatami',
    title: 'Trần Sao Sợi Quang Bầu Trời Đêm, Xưởng Sơn Mài Cẩn Trứng & Trà Thất Chiếu Cói',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 46 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_46_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint46();
