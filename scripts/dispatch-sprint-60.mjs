import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_60_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 60: PHÒNG HÒA ÂM ĐÀN KÍNH PHA LÊ, BÀN TRÀ GỖ HÓA THẠCH & CHUÔNG XOAY THẤT BẢO 528HZ]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo nghệ thuật cao cấp với Sprint 60:
"PHÒNG HÒA ÂM ĐÀN KÍNH PHA LÊ, BÀN TRÀ GỖ HÓA THẠCH & CHUÔNG XOAY THẤT BẢO 528HZ"

Mục tiêu cốt lõi: Thiết kế không gian thính phòng thính âm chuyên sâu đàn kính pha lê xoay (Glass Armonica) huyền ảo vòm gỗ Dâu rừng; chế tác bàn trà độc bản từ phiến gỗ hóa thạch hóa ngọc triệu năm Đắk Lắk 380kg; và xưởng đúc chuông xoay thất bảo 7 kim loại quý phát tần số chữa lành 528Hz.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN KÍNH PHA LÊ GLASS ARMONICA (SaigonAcousticGlassArmonicaSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticGlassArmonicaSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Thanh Ma Mị Thuần Khiết Của Pha Lê:
   - Hệ thống 37 bát đĩa pha lê thạch anh kích thước giảm dần xếp đồng trục xoay êm trên trục thép không gỉ, làm ướt bằng nước khoáng tinh khiết; âm thanh thanh thoát vi diệu rung động màng nhĩ như tiếng hát thiên thần; vòm trần cong parabol làm bằng gỗ Dâu rừng sấy chậm triệt tiêu âm chói tần số cao; RT60 tiêu chuẩn 0.29s.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng âm thanh Glass Armonica qua Web Audio API: Mozart Adagio for Glass Harmonica (K. 356).
   - Bảng chuyển dịch thang âm 3 quãng tám từ F3 đến F6.
   - Hiệu ứng ánh sáng khúc xạ lăng kính pha lê 7 sắc cầu vồng trên nền bóng tối.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BÀN TRÀ ĐÁ GỖ HÓA THẠCH ĐẮK LẮK (ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Triệu Năm Chuyển Hóa Gỗ Thành Ngọc:
   - Phiến thân cây gỗ cổ đại chôn vùi dưới lớp tro bụi núi lửa Tây Nguyên hàng triệu năm trước đã hóa thạch ngọc bích chalcedony nặng 380kg; bề mặt mài bóng thủ công giữ nguyên thớ gỗ hóa đá và vòng sinh trưởng vân mây; khay trà âm mặt đá phiến xẻ rãnh thoát nước ngầm; tiểu cảnh rêu ẩm phun sương sáp ong tự nhiên.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình duyệt vân gỗ hóa ngọc 360° dưới ánh đèn rọi xuyên tâm 3000K CRI 98.
   - Đồng hồ đo tuổi địa chất và tỷ trọng đá canxit > 2.65 g/cm³.
   - Âm thanh nước nhỏ giọt ngấm qua khe đá hóa thạch qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: XƯỞNG CHUÔNG XOAY THẤT BẢO TẦN SỐ 528HZ (ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Tần Số Chữa Lành Tế Bào - Chuông Thất Bảo:
   - Chuông xoay và chiêng đồng đúc từ hợp kim 7 kim loại quý (Vàng, Bạc, Đồng đỏ, Sắt, Thiếc, Chì, Kẽm) gò tay hàng vạn nhát búa bởi nghệ nhân thiền môn; dao động sóng âm chuẩn 528Hz (Love Frequency - Tần số tái tạo tế bào); chày gỗ bọc dạ da cừu xoay vành chuông kích hoạt sóng não Theta thư giãn sâu (\`GU-SINGINGBOWL-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ phát sóng âm chuông xoay 528Hz ngân vang liên tục qua Web Audio API.
   - Máy phân tích dao động sóng hài âm sắc (Harmonic Resonance Spectrum).
   - Form may đo chuông khắc mật ngữ phong thủy riêng biệt cho gia chủ.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-60): add SaigonAcousticGlassArmonicaSanctuary, ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary, and ArtisanHandmadeBronzeChauGongAndSingingBowlAtelier with 100% SEO pass'
`;

async function dispatchSprint60() {
  console.log(`[Master Orchestrator] Dispatching Sprint 60 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-58-sprint-60-glassarmonica-petrifiedwood-singingbowl',
    title: 'Đàn Kính Pha Lê, Bàn Trà Gỗ Hóa Thạch & Chuông Xoay 528Hz',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 60 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_60_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint60();
