import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_70_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 70: PHÒNG HÒA TẤU ĐÀN T'RƯNG ỐNG NỨA, VỌNG TRÀ HỒ SEN ĐỒNG THÁP & TRÁP TRẦU CAU HOÀNG GIA BẠC GÒ CHẠM LỘNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 70:
"PHÒNG HÒA TẤU ĐÀN T'RƯNG ỐNG NỨA, VỌNG TRÀ HỒ SEN ĐỒNG THÁP & TRÁP TRẦU CAU HOÀNG GIA BẠC GÒ CHẠM LỘNG"

Mục tiêu cốt lõi: Thiết kế phòng hòa tấu đàn T'rưng & Klông-pút ống nứa già ngâm bùn vòm trần nan tre uốn nhiệt tiêu âm RT60 = 0.31s; kiến tạo vọng trà nổi giữa hồ sen Đồng Tháp Mười sàn gỗ Kiền Kiền và rãnh đá ong hạ nhiệt vi khí hậu 4.5°C; và chế tác bộ tráp đựng trầu cau hoàng gia bạc ta 999 gò chạm lộng kết hợp khay sơn mài cẩn xà cừ độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA TẤU ĐÀN T'RƯNG ỐNG NỨA (SaigonBespokeBambooMarimbaAcousticSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBespokeBambooMarimbaAcousticSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Thanh Rừng Đại Ngàn Giữa Tư Gia:
   - Thính phòng tôn vinh đàn T'rưng và Klông-pút chế tác từ ống nứa già ngâm bùn sấy khô gõ phát âm vang trong trẻo tựa suối nguồn; khung đàn bằng gỗ Căm Xe già đục thủ công thếp bạc; vòm trần bán cầu nan tre uốn nhiệt tiêu âm RT60 = 0.31s triệt tiêu rung chấn dải tần 500Hz - 2.500Hz; tủ điều ẩm vi khí hậu 50% RH giữ cao độ phím đàn.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình thưởng âm đàn T'rưng (Âm vang Tây Nguyên, Điệu múa Suối Reo) qua Web Audio API với âm sắc gõ mộc ấm áp và tiếng vang ống nứa.
   - Trình điều chỉnh cao độ 16 ống nứa theo thang âm ngũ cung Tây Nguyên.
   - 3 kịch bản ánh sáng đại ngàn hoàng hôn (2200K, 2600K, 3200K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: VỌNG TRÀ HỒ SEN ĐỒNG THÁP MƯỜI (SaigonBespokeLotusLeafPondTeaPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBespokeLotusLeafPondTeaPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Hương Sen Tinh Khiết - Thủy Mộc Hòa Ca:
   - Vọng trà nổi giữa hồ sen Bách Diệp, sàn gỗ Kiền Kiền ngâm nước không mối mọt; rầm đá ong xám Đồng Nai chìm dưới làn nước tuần hoàn sinh học; mái lợp ngói âm dương đất sét nung thủ công vuốt cong nhẹ đón gió sông Sài Gòn; rèm trúc đan tay cản 85% bức xạ mặt trời hướng Tây; hạ nhiệt vi khí hậu 4.5°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ tính toán hiệu quả giải nhiệt bốc hơi mặt nước và diện tích tán sen chắn nắng.
   - Web Audio tiếng nước vỗ mạn sàn gỗ nổi và tiếng cá quẫy đuôi trong hồ sen.
   - Form tư vấn may đo vọng trà hồ nước sinh thái cho biệt thự sinh thái ven sông.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ TRÁP TRẦU CAU HOÀNG GIA BẠC GÒ CHẠM LỘNG (ArtisanSilverChasedArecaNutCasketAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanSilverChasedArecaNutCasketAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Lễ Nghi Đại Việt - Miếng Trầu Khởi Đầu Câu Chuyện:
   - Bộ tráp trầu hoàng gia chế tác từ bạc ta 999 gò chạm lộng họa tiết Tứ Linh mây nước; bình vôi gốm men rạn Bát Tràng bịt bạc; dao bổ cau thép rèn thủ công chuôi sừng trâu nạm chỉ vàng; khay sơn mài son then cẩn xà cừ đỏ Đại Việt; mã kiểm định kim hoàn (\`GU-BETEL-CASKET-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính phóng đại 20x soi nét chạm lộng hoa văn rồng phượng trên lá bạc nguyên chất.
   - Bộ chọn 3 phong cách khay sơn mài: Men Son Cổ Điển, Men Then Trầm Tĩnh, Men Cánh Gián Dát Vàng.
   - Form đặt chế tác tráp trầu truyền thống đính kèm hộp quà tặng gia bảo.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-70): add SaigonBespokeBambooMarimbaAcousticSanctuary, SaigonBespokeLotusLeafPondTeaPavilion, and ArtisanSilverChasedArecaNutCasketAtelier with 100% SEO pass'
`;

async function dispatchSprint70() {
  console.log(`[Master Orchestrator] Dispatching Sprint 70 to Agent ${TARGET_ID}...`);

  let state = { completedDirectives: [], currentDirectiveIndex: 0 };
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-68-sprint-70-marimba-lotuspond-betelcasket',
    title: 'Phòng Đàn T\'rưng Ống Nứa, Vọng Trà Hồ Sen & Tráp Trầu Cau Bạc Chạm Lộng',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[Master Orchestrator] State updated with Sprint 70 directive.');

  const proc = spawn(
    LANGUAGE_SERVER_EXE,
    [
      '--mode=agent_to_agent',
      `--to=${TARGET_ID}`,
      `--message=${SPRINT_70_DIRECTIVE}`
    ],
    { stdio: 'inherit', shell: true }
  );

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Dispatch process closed with code ${code}`);
  });
}

dispatchSprint70().catch(console.error);
