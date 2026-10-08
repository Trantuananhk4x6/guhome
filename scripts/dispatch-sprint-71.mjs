import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_71_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 71: PHÒNG HÒA ÂM ĐÀN BẦU BỒI ÂM, SÂN TRONG GIẾNG CỔ CHỢ QUÁN & BÌNH THUỐC HÍT SỪNG HỔ PHÁCH]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 71:
"PHÒNG HÒA ÂM ĐÀN BẦU BỒI ÂM, SÂN TRONG GIẾNG CỔ CHỢ QUÁN & BÌNH THUỐC HÍT SỪNG HỔ PHÁCH"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm Đàn Bầu (Độc Huyền Cầm) thân gỗ Ngô Đồng vòm tán âm gỗ Trắc tạo bồi âm tự nhiên RT60 = 0.32s; kiến tạo sân trong phục dựng Giếng Cổ Chợ Quán bằng đá ong xám đẽo tay lọc nước 5 tầng sỏi thạch anh hạ nhiệt vi khí hậu 4.2°C; và chế tác bình đựng thuốc hít / cao thảo dược từ sừng trâu nước hoa văn hổ phách xuyên quang nắp bọc bạc ta 999 độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN BẦU BỒI ÂM (SaigonBespokeDanBauMonochordSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBespokeDanBauMonochordSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Độc Huyền Thanh - Nốt Nhấn Bồi Âm Hồn Dân Tộc:
   - Thính phòng tôn vinh Đàn Bầu độc huyền huyền bí; thân đàn bằng gỗ Ngô Đồng già nguyên tấm; vòi đàn bằng sừng trâu nước dẻo dai uốn cong công thái học; bầu đàn bằng quả bầu khô nạm chỉ bạc; vòm trần elip tán âm gỗ Trắc triệt tiêu sóng đứng tần số 110Hz - 3.500Hz; thời gian vang RT60 = 0.32s; tủ kiểm soát vi khí hậu 50.0% RH.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình thưởng âm Đàn Bầu điệu Ru Con Nam Bộ, Câu Hò Bên Bến qua Web Audio API với kỹ thuật bồi âm (harmonics) và uốn cần rung ngân lay động tâm can.
   - Sơ đồ tương tác các điểm nút bồi âm quãng 8, quãng 5, quãng 4 trên dây sắt.
   - 3 kịch bản ánh sáng trăng soi dạ khúc (2000K, 2400K, 2800K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: SÂN TRONG GIẾNG CỔ CHỢ QUÁN GIA ĐỊNH (SaigonCanalSideAncientWellCourtyardSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonCanalSideAncientWellCourtyardSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Nguồn Nước Đầu Làng - Mát Lành Trăm Năm:
   - Sân trong phục dựng thành giếng cổ Chợ Quán bằng đá ong xám đẽo tay ghép mạch vữa vôi hàu; đáy giếng lọc 5 tầng sỏi thạch anh và than hoạt tính gáo dừa; máng xối sành men da lươn Cây Mai nung củi; bao quanh bởi vườn dương xỉ nhiệt đới và cau ta cổ thụ; nắp giếng bằng gỗ Nghiến đá ngâm dầu quế; hạ nhiệt vi khí hậu 4.2°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ đo chất lượng nước ngầm vi sinh và độ giảm nhiệt vi khí hậu theo giờ trong ngày.
   - Web Audio tiếng gàu múc nước thả xuống lòng giếng sâu và tiếng nước tràn qua miệng đá róc rách.
   - Form tư vấn kiến tạo cảnh quan giếng ngầm sinh thái cho biệt thự tư gia.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BÌNH THUỐC HÍT SỪNG HỔ PHÁCH XUYÊN QUANG (ArtisanHandmadeHornSnuffBottleVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeHornSnuffBottleVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Thảo Dược Cung Đình - Chiếc Bình Trong Suốt:
   - Chiếc bình đựng cao thảo dược / thuốc hít ngự y chế tác từ sừng trâu nước hoa văn hổ phách xuyên quang qua 35 công đoạn bào tiện tay; muỗng xúc bằng ngà hóa thạch ngâm bùn hoặc bạc ta 999; nắp cẩn ngọc cẩm thạch tự nhiên bọc viền vàng quỳ; thân bình chạm lộng thủy mặc phong cảnh Bến Nghé xưa; mã lưu trữ (\`GU-SNUFF-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính phóng đại 20x soi đường vân sừng tự nhiên tỏa sáng hổ phách dưới đèn rọi.
   - Bộ chọn 3 kiểu dáng bình: Bình Bầu Hồ Lô, Bình Dẹt Tròn Bát Quái, Bình Vuông Đứng Tứ Quý.
   - Form đặt chế tác bình cá nhân hóa khắc hoa văn gia huy dòng tộc.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-71): add SaigonBespokeDanBauMonochordSanctuary, SaigonCanalSideAncientWellCourtyardSanctuary, and ArtisanHandmadeHornSnuffBottleVault with 100% SEO pass'
`;

async function dispatchSprint71() {
  console.log(`[Master Orchestrator] Dispatching Sprint 71 to Agent ${TARGET_ID}...`);

  let state = { completedDirectives: [], currentDirectiveIndex: 0 };
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-69-sprint-71-danbau-ancientwell-hornsnuff',
    title: 'Phòng Đàn Bầu Bồi Âm, Giếng Cổ Chợ Quán & Bình Thuốc Hít Sừng Hổ Phách',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[Master Orchestrator] State updated with Sprint 71 directive.');

  const proc = spawn(
    LANGUAGE_SERVER_EXE,
    [
      '--mode=agent_to_agent',
      `--to=${TARGET_ID}`,
      `--message=${SPRINT_71_DIRECTIVE}`
    ],
    { stdio: 'inherit', shell: true }
  );

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Dispatch process closed with code ${code}`);
  });
}

dispatchSprint71().catch(console.error);
