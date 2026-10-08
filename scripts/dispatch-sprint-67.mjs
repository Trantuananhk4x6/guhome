import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_67_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 67: PHÒNG HÒA ÂM ĐÀN TAM THẬP LỤC GỖ HƯƠNG, HỒ BƠI BIO-NATURAL ĐÁ LAI CHÂU & KHAY TRÀ HOÀNG ĐÀN KHẢM ĐỒNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 67:
"PHÒNG HÒA ÂM ĐÀN TAM THẬP LỤC GỖ HƯƠNG, HỒ BƠI BIO-NATURAL ĐÁ LAI CHÂU & KHAY TRÀ HOÀNG ĐÀN KHẢM ĐỒNG"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn Tam Thập Lục 36 dây vòm gỗ Hương Đá tán âm parabol RT60 = 0.35s; kiến tạo hồ bơi sinh thái Bio-Natural lọc cát thạch anh 0% Clo ốp đá Slate đen Lai Châu; và chế tác khay trà may đo gỗ Hoàng Đàn Lạng Sơn khảm đồng thau nguyên tấm độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN TAM THẬP LỤC GỖ HƯƠNG (SaigonAcousticYangqinSanctuaryPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticYangqinSanctuaryPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Giọt Nước Rơi Mái Hiên - Âm Sắc Thánh Thót:
   - Thính phòng tôn vinh cây đàn Tam Thập Lục 36 dây tơ kim loại, mặt đàn gỗ Sa Mộc ủ khô tự nhiên 5 năm phối khung gỗ Hương Đá Đắk Lắk; hệ vách tán âm parabol đa tầng triệt tiêu sóng đứng; RT60 = 0.35s; tủ kính bảo quản 50.0% RH và 22.0°C; âm thanh gõ dùi tre bọc da mềm tạo nốt ngân thánh thót trong trẻo.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử hợp âm chuỗi nốt gõ Tam Thập Lục qua Web Audio API (Lý Ngựa Ô, Suối Hoa).
   - Bộ chọn 3 phong cách gõ: Gõ Đơn Nốt Tĩnh, Gõ Đảo Tay Liên Hoàn, Gõ Trầm Bổng Ngũ Cung.
   - 3 kịch bản ánh sáng rọi điểm tĩnh tại (2400K, 2700K, 3000K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: HỒ BƠI SINH THÁI BIO-NATURAL ĐÁ LAI CHÂU (SaigonBioNaturalEcoPoolSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBioNaturalEcoPoolSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Hồ Nước Núi Rừng Giữa Lòng Biệt Thự:
   - Hồ bơi sinh thái hoàn toàn không Clo sử dụng hệ lọc cát thạch anh đa tầng và màng lọc sinh học vi sinh; lòng hồ và bờ tràn ốp đá Slate đen Lai Châu bóc thô tự nhiên chống trơn trượt R11; hệ thống bơm nhiệt Inverter giữ nước ấm 31°C quanh năm; thác nước tràn bậc thang hạ nhiệt không gian lân cận 3-5°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ theo dõi chất lượng nước (TDS, độ pH, độ trong quang học NTU) thời gian thực.
   - Lắng nghe tiếng thác nước róc rách và sóng êm qua Web Audio API.
   - Form may đo khảo sát không gian sân vườn và tầng thượng cho hồ bơi sinh thái.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ KHAY TRÀ HOÀNG ĐÀN KHẢM ĐỒNG THAU (ArtisanHoangDanBrassInlayTeaTrayVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHoangDanBrassInlayTeaTrayVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Hương Mộc Quý Tộc & Nghệ Thuật Khảm Đồng Phẳng:
   - Khay trà chế tác từ gỗ Hoàng Đàn tuyết nguyên tấm Lạng Sơn chứa hàm lượng tinh dầu cao tự kết tinh tuyết trắng óng ánh; khảm tấm đồng thau phay CNC hoa văn triện cổ phẳng tuyệt đối dung sai 0.02mm; khay có rãnh thoát nước ngầm kết nối ống silicon giấu kín (\`GU-TRAY-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình xoay 360° chiêm ngưỡng vân gỗ Hoàng Đàn và lớp tuyết óng ánh dưới ánh sáng.
   - Kính hiển vi 20x soi đường ghép mộng phẳng giữa đồng thau và thớ gỗ mộc.
   - Form tư vấn may đo kích thước khay trà và khắc ấn triện riêng cho gia chủ.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-67): add SaigonAcousticYangqinSanctuaryPavilion, SaigonBioNaturalEcoPoolSanctuary, and ArtisanHoangDanBrassInlayTeaTrayVault with 100% SEO pass'
`;

async function dispatchSprint67() {
  console.log(`[Master Orchestrator] Dispatching Sprint 67 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-65-sprint-67-yangqin-ecopool-hoangdantray',
    title: 'Phòng Tam Thập Lục Gỗ Hương, Hồ Bơi Sinh Thái & Khay Trà Hoàng Đàn',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 67 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_67_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint67();
