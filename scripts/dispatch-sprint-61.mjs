import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_61_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 61: PHÒNG HÒA ÂM THEREMIN, THÁC TINH THỂ THẠCH ANH & BỘ TRÀ PHÁP LAM HUẾ]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo nghệ thuật cao cấp với Sprint 61:
"PHÒNG HÒA ÂM THEREMIN, THÁC TINH THỂ THẠCH ANH & BỘ TRÀ PHÁP LAM HUẾ"

Mục tiêu cốt lõi: Thiết kế không gian thính phòng thính âm chuyên biệt cho nhạc cụ trường điện từ Theremin vòm gỗ Bạch Dương; kiến tạo thác nước phong thủy từ khối tinh thể thạch anh trắng tự nhiên 620kg; và phục hồi xưởng chế tác bộ ấm chén trà tráng men Pháp Lam cung đình Huế cẩn chỉ đồng nung 850°C.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM NHẠC CỤ ĐIỆN TỪ THEREMIN (SaigonAcousticThereminSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticThereminSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Thanh Huyền Bí Của Đôi Bàn Tay Không Chạm:
   - Phòng hòa âm dành riêng cho nhạc cụ sóng radio Theremin do Leon Theremin sáng chế năm 1920; ăng-ten cao độ và ăng-ten âm lượng bằng đồng thau mạ vàng; vòm trần elip cong liên tục ghép gỗ Bạch Dương (Baltic Birch) uốn lạnh hấp hơi triệt tiêu phản xạ gắt; thời gian vang RT60 = 0.30s; đệm sàn Sylomer khử rung hoàn toàn.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng âm sắc Theremin qua Web Audio API: Điều khiển cao độ Pitch (Hz) và âm lượng Volume bằng chuyển động chuột / cảm ứng.
   - Thưởng thức trích đoạn: Tchaikovsky Valse Sentimentale, Saint-Saëns The Swan.
   - Trực quan hóa sóng âm dao động Sine Wave và giao thoa điện từ trường trên màn hình.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: THÁC NƯỚC TINH THỂ THẠCH ANH NGUYÊN KHỐI (ArtisanSaigonMonolithicQuartzCrystalWaterfallVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanSaigonMonolithicQuartzCrystalWaterfallVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Năng Lượng Tinh Khiết Của Thạch Anh Tự Nhiên:
   - Khối tinh thể thạch anh trắng tự nhiên 620kg khai thác tại Đắk Nông mài bóng bề mặt giữ nguyên đỉnh tinh thể lục giác; dòng nước tinh khiết chảy tràn màng mỏng qua các chóp tinh thể phát tán ion âm thanh lọc không khí; bồn thu nước sỏi suối thạch anh hồng; độ tĩnh âm cực êm < 16 dBA; đèn LED hắt đáy quang phổ 4000K kích hoạt hiệu ứng phát quang tinh thể.
2. Tính năng kỹ thuật & UI tương tác:
   - Điều khiển 3 chế độ dòng chảy: Suối Nguồn Tinh Khiết, Màn Nước Tinh Thể, Thác Đổ Năng Lượng.
   - Bảng đo mật độ ion âm (Negative Ions: 85.000 ions/cm³) và độ dẫn điện vi mô.
   - Trình phát tiếng nước reo trong vắt qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ ẤM CHÉN TRÀ PHÁP LAM CUNG ĐÌNH HUẾ (ArtisanHandmadeCloisonneEnamelTeaSetAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeCloisonneEnamelTeaSetAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Di Sản Cung Đình - Nghệ Nghệ Pháp Lam Triều Nguyễn:
   - Bộ ấm chén trà chế tác theo kỹ thuật Pháp Lam (Cloisonné) thất truyền; cốt đồng đỏ dát mỏng gò tay, uốn từng sợi chỉ đồng tạo hoa văn mây rồng và hoa sen triều đình, tra men thủy tinh đa sắc nung 4 lần ở nhiệt độ 850°C mài phẳng bóng gương bằng đá nhám và than xoan đào (\`GU-CLOISONNE-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính phóng đại 16x soi đường chỉ đồng mảnh 0.3mm ngăn cách các mảng men màu Pháp Lam.
   - Trình duyệt 3 bảng màu men cung đình: Men Hoàng Gia (Vàng kim), Men Thanh Lam (Xanh ngọc bích), Men Hồng Hạc (Đỏ cánh sen).
   - Form may đo khắc niên hiệu và ấn triện gia tộc mạ vàng đáy ấm trà.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-61): add SaigonAcousticThereminSanctuary, ArtisanSaigonMonolithicQuartzCrystalWaterfallVault, and ArtisanHandmadeCloisonneEnamelTeaSetAtelier with 100% SEO pass'
`;

async function dispatchSprint61() {
  console.log(`[Master Orchestrator] Dispatching Sprint 61 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-59-sprint-61-theremin-quartzwaterfall-cloisonne',
    title: 'Phòng Theremin Điện Từ, Thác Tinh Thể Thạch Anh & Trà Pháp Lam Huế',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 61 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_61_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint61();
