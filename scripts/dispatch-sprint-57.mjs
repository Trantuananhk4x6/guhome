import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_57_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 57: ĐIỆN THÍNH PHÒNG ĐẠI PHONG CẦM PIPE ORGAN, NGHỆ THUẬT GỖ THUYỀN CỔ SÀI GÒN & TRÁP ĐẬU BẠC THẾP VÀNG ĐỊNH CÔNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo nghệ thuật cao cấp với Sprint 57:
"ĐIỆN THÍNH PHÒNG ĐẠI PHONG CẦM PIPE ORGAN, NGHỆ THUẬT GỖ THUYỀN CỔ SÀI GÒN & TRÁP ĐẬU BẠC THẾP VÀNG ĐỊNH CÔNG"

Mục tiêu cốt lõi: Thiết kế điện thính phòng thông tầng lắp đặt đại phong cầm cơ khí (Pipe Organ) 1.200 ống kim loại thiếc-chì âm trầm 16Hz; kiến tạo không gian trưng bày nghệ thuật từ gỗ thuyền cổ sông Sài Gòn chịu mặn với đinh tán đồng; và xưởng chế tác tráp đựng trang sức đậu bạc se sợi hoa cúc dây thếp vàng quỳ 24K làng nghề Định Công.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: ĐIỆN THÍNH PHÒNG ĐẠI PHONG CẦM PIPE ORGAN (SaigonAcousticPipeOrganAtriumVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticPipeOrganAtriumVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Thanh Thánh Đường Giữa Tư Gia Biệt Thự:
   - Hệ thống 1.200 ống sáo phong cầm cơ khí chế tác từ hợp kim thiếc-chì 70/30 và gỗ Thông Tuyết, dải tần siêu trầm mở rộng từ 16Hz (quãng tám 32 foot) đến 8.000Hz; vòm trần parabol cao 9.6m bằng gỗ Dổi tiêu âm khuếch tán sóng âm; thời gian vang RT60 thiền tịnh 0.55s; đệm khí nén áp suất ổn định cực êm < 12 dBA.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ tổng hợp âm thanh đại phong cầm qua Web Audio API: Bach Toccata and Fugue in D Minor (BWV 565).
   - Bộ chọn 4 dải đăng ký hơi (Stops): Principal 8', Flûte Harmonique 4', Bourdon 16', Voix Céleste 8'.
   - Mô phỏng áp suất luồng khí nén (Windchest pressure) và trực quan hóa rung động cột không khí.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: KHÔNG GIAN NGHỆ THUẬT GỖ THUYỀN CỔ SÔNG SÀI GÒN (ArtisanSaigonRiverboatWoodCraftSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanSaigonRiverboatWoodCraftSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Vết Hằn Sóng Nước Trăm Năm Ghe Bầu:
   - Tái chế và bảo tồn phiến gỗ Sao, gỗ Dầu cổ thụ tháo dỡ từ ghe bầu thương cảng Bến Nghé thế kỷ 19; bề mặt giữ nguyên vết hà biển ăn rỗ tự nhiên, đinh tán đồng đỏ đập tay tán mờ; quét 3 lớp dầu rái nguyên chất kháng ẩm nhiệt đới và mối mọt tự nhiên; phiến gỗ làm bàn trà mộc 4.2m nguyên khối vững chãi.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình duyệt vân gỗ dầu rái cổ thụ và vết muối mặn phong hóa trăm năm.
   - Thước đo tuổi thọ carbon và độ cứng thớ gỗ Brinell > 4.5 HB.
   - Trình phát âm thanh sóng nước vỗ mạn thuyền sông Sài Gòn qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: XƯỞNG TRÁP ĐẬU BẠC THẾP VÀNG ĐỊNH CÔNG (ArtisanGoldFiligreeJewelryAndCasketAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanGoldFiligreeJewelryAndCasketAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Tinh Hoa Se Sợi Bạc - Dát Vàng Cung Đình:
   - Tráp đựng nữ trang chế tác thủ công theo kỹ nghệ Đậu Bạc làng Định Công Thăng Long; từng sợi bạc ta 999 được kéo rút mảnh như sợi tóc 0.12mm, se đôi bện lại thành hoa cúc dây mây cuốn rồi hàn vảy bạc lửa đèn khò; toàn bộ bề mặt thếp vàng quỳ 24K Kiêu Kỵ lấp lánh; khóa then đồng hình phượng hoàng cài ngọc cẩm thạch tự nhiên (\`GU-FILIGREE-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính hiển vi 20x soi từng nút xoắn hoa cúc của sợi bạc se mạ vàng.
   - Bộ chọn 3 kiểu dáng tráp: Tráp Bát Giác Cúc Dây, Tráp Chữ Nhật Phượng Múa, Hộp Tròn Long Quy.
   - Form may đo khắc tên chủ nhân bằng vàng lá 24K vào lòng tráp bọc nhung the.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-57): add SaigonAcousticPipeOrganAtriumVault, ArtisanSaigonRiverboatWoodCraftSanctuary, and ArtisanGoldFiligreeJewelryAndCasketAtelier with 100% SEO pass'
\`;

async function dispatchSprint57() {
  console.log(\`[Master Orchestrator] Dispatching Sprint 57 to Agent \${TARGET_ID}...\`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-55-sprint-57-pipeorgan-boatwood-filigreecasket',
    title: 'Đại Phong Cầm Pipe Organ, Gỗ Thuyền Cổ Sài Gòn & Tráp Đậu Bạc Định Công',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 57 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_57_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(\`[Master Orchestrator] Language server send-message exited with code: \${code}\`);
  });
}

dispatchSprint57();
