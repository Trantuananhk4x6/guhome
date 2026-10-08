import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_53_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 53: PHÒNG HÒA ÂM ĐÀN TRANH GỖ HÔNG, XƯỞNG SAO CHÈ CHẢO GANG & KHUÔN TRIỆN HƯƠNG TRẦM ĐỒNG THAU]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 53:
"PHÒNG HÒA ÂM ĐÀN TRANH GỖ HÔNG, XƯỞNG SAO CHÈ CHẢO GANG & KHUÔN TRIỆN HƯƠNG TRẦM ĐỒNG THAU"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn tranh Koto & đàn Tranh 16 dây vòm gỗ Hông Paulownia tán âm Fermat; kiến tạo xưởng sao chè thủ công chảo gang đúc hút khói âm bàn màng than hoạt tính; và chế tác bộ khuôn triện in hương trầm đồng thau CNC độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN TRANH VÒM GỖ HÔNG (SaigonAcousticKotoSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticKotoSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Tiếng Tơ Lã Chã - Nốt Vang Thanh Trong:
   - Đại sảnh âm nhạc tôn vinh nghệ thuật đàn tranh truyền thống với vòm ốp gỗ Hông (Paulownia Wood) tỷ trọng xốp nhẹ đặc thù cho nhạc cụ dây gảy; hệ vách tán âm đường cong Fermat triệt tiêu hoàn toàn sóng đứng; sàn gỗ Mun sừng ghép mộng thủ công; thời gian vang RT60 = 0.35s; tủ kính trưng bày bảo quản đàn tranh cẩn xà cừ ngũ sắc kiểm soát ẩm 50% RH.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình gảy thử đàn tranh ngũ cung (Hò, Xự, Xang, Xê, Cống) qua Web Audio API.
   - Bộ điều chỉnh vị trí nhạn đàn mô phỏng độ cao cung bậc âm thanh.
   - 3 kịch bản ánh sáng rọi điểm tĩnh tại: Trăng Vàng Cố Tri, Bình Minh Trúc Viện, Dạ Yến Cung Đình.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: XƯỞNG SAO CHÈ THỦ CÔNG CHẢO GANG ĐÚC (SaigonRiversideTeaRoastingAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonRiversideTeaRoastingAtelier.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Hơi Ấm Than Hồng - Hương Cốm Trà Sớm:
   - Không gian trải nghiệm sao chè thủ công ven sông với chảo gang đúc nguyên khối dày 35mm nung nhiệt than củi bồ kết; hệ thống hút khói âm bàn công nghệ plasma và màng than hoạt tính giữ lại trọn vẹn hương trà cốm non ngào ngạt không để khói lan tỏa; bàn mộc xẻ từ gỗ Gõ Đỏ làm nơi vò chè búp tươi bằng tay nghệ nhân.
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng 4 công đoạn sao chè: Diệt Men (280°C), Vò Chè (Nhiệt độ phòng), Sao Khô Lần 1 (130°C), Đánh Mốc Lấy Hương (90°C).
   - Thanh trượt điều chỉnh nhiệt độ chảo gang và biểu đồ bốc hương tinh dầu trà.
   - Form đăng ký trải nghiệm trà đạo và đặt gói chè búp tươi độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ KHUÔN TRIỆN IN HƯƠNG TRẦM ĐỒNG THAU (ArtisanBronzeIncenseSealSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanBronzeIncenseSealSanctuary.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Trầm Ấn Tụ Khí - Dòng Chảy An Nhiên:
   - Bộ dụng cụ thưởng trầm hương theo lối nghệ thuật Trầm Ấn (Xiang Dao) với khay đồng thau nguyên khối mạ vàng cát; khuôn triện CNC hoa văn Chữ Vạn, Hoa Sen hoặc Gia Huy dòng họ; bột trầm hương tự nhiên rừng già Khánh Hòa cháy đều liên tục 45 phút tỏa khói thơm thanh khiết; trọn bộ thìa, xẻng nén tro tro trắng bằng đồng thau chạm rồng mây (\`GU-SEAL-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng quy trình tạo hình triện hương: San phẳng tro lót -> Đặt khuôn đồng -> Rải bột trầm -> Nhấc khuôn -> Châm lửa dẫn hương.
   - Trình mô phỏng vệt lửa than đỏ âm ỉ cháy chậm theo đường triện hoa văn.
   - Form tư vấn may đo khắc khuôn triện theo gia huy và chữ ký của gia chủ.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-53): add SaigonAcousticKotoSanctuarySalon, SaigonRiversideTeaRoastingAtelier, and ArtisanBronzeIncenseSealSanctuary with 100% SEO pass'
`;

async function dispatchSprint53() {
  console.log(`[Master Orchestrator] Dispatching Sprint 53 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-51-sprint-53-koto-tearoast-incenseseal',
    title: 'Phòng Đàn Tranh Gỗ Hông, Xưởng Sao Chè Chảo Gang & Khuôn Triện Hương Trầm',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 53 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_53_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint53();
