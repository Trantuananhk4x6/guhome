import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_58_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 58: PHÒNG HÒA ÂM ĐÀN ĐÁY & TAM THẬP LỤC, ĐÀI NƯỚC ĐÁ HOA CƯƠNG NGUYÊN KHỐI & LƯỢC SỪNG THỤY ỨNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo nghệ thuật cao cấp với Sprint 58:
"PHÒNG HÒA ÂM ĐÀN ĐÁY & TAM THẬP LỤC, ĐÀI NƯỚC ĐÁ HOA CƯƠNG NGUYÊN KHỐI & LƯỢC SỪNG THỤY ỨNG"

Mục tiêu cốt lõi: Thiết kế không gian thính phòng thính âm chuyên sâu đàn Đáy và đàn Tam Thập Lục cổ truyền vách gỗ Trắc tiêu âm; chế tác đài phun nước màng mỏng từ khối đá hoa cương vàng Bình Định nguyên khối 850kg; và xưởng chế tác lược chải tóc sừng trâu nước làng nghề Thụy Ứng khảm xà cừ đựng trong hộp sơn mài then.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN ĐÁY & TAM THẬP LỤC (SaigonAcousticCimbalomSalonSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticCimbalomSalonSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Điệu Tơ Đồng Dân Tộc Cổ Truyền:
   - Phòng thính phòng mang đậm bản sắc âm nhạc bác học truyền thống Việt Nam (Ca trù, Đờn ca tài tử); thùng đàn Đáy dọc dài làm từ gỗ Ngô Đồng kết hợp vách thùng gỗ Trắc; hệ nan tán âm Fermat gỗ Dầu rái tự nhiên triệt tiêu sóng đứng tần số trung cao; thời gian vang RT60 = 0.34s; bệ nghệ sĩ trải chiếu dệt tơ lụa thêu hoa văn cung đình.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử âm sắc đàn Đáy và Tam Thập Lục qua Web Audio API: Lưu Thủy Kim Tiền, Dạ Cổ Hoài Lang.
   - Sơ đồ tương tác 36 dây đàn Tam Thập Lục và kỹ thuật nhấn nhá rung ngón đàn Đáy.
   - Bộ chọn kịch bản chiếu sáng thính phòng truyền thống 2200K - 2700K.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: ĐÀI NƯỚC HOA CƯƠNG NGUYÊN KHỐI BÌNH ĐỊNH (ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Nước Tràn Màng Mỏng - Tĩnh Tại Âm Vang:
   - Khối đá hoa cương vàng phù cát Bình Định nguyên khối 850kg gia công rãnh tràn nước vi mô bằng tia nước áp lực siêu cao Waterjet; màng nước tràn mỏng đều 0.8mm không bắn giọt ra sàn gỗ xung quanh; âm thanh róc rách thanh khiết 18 dBA; lọc tuần hoàn ngầm qua lớp sỏi thạch anh và khoáng chất tự nhiên; vi khí hậu giảm nhiệt 3°C vùng lân cận.
2. Tính năng kỹ thuật & UI tương tác:
   - Điều khiển 3 chế độ dòng chảy: Màng Nước Tĩnh (Gương nước mỏng), Róc Rách Suối Ngàn, Tràn Đỉnh Thiền Tịnh.
   - Trình phát âm thanh tiếng nước tràn đá mộc qua Web Audio API.
   - Bộ đo độ rung chấn và độ tĩnh âm của bơm biến tần Inverter DC < 12 dBA.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: XƯỞNG LƯỢC SỪNG THỤY ỨNG KHẢM XÀ CỪ (ArtisanHandmadeHornAndTortoiseshellCombAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeHornAndTortoiseshellCombAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Dưỡng Tóc Hoàng Cung - Sừng Tự Nhiên Không Tĩnh Điện:
   - Chiếc lược thủ công chế tác từ sừng trâu nước già trên 15 năm làng nghề Thụy Ứng; qua 30 công đoạn luộc dầu mè, ép mộc, xẻ răng lược bằng cưa tay và mài bóng bằng lá chuối khô; không tích tĩnh điện, kích thích huyệt đạo da đầu; sống lược khảm xà cừ ốc đỏ Singapore họa tiết hoa sen; đựng trong hộp sơn mài then lót lụa tơ tằm (\`GU-HORN-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình duyệt chất sừng hoa văn vân đá tự nhiên độc bản dưới ánh sáng xuyên tâm.
   - Thử nghiệm độ tĩnh điện so với lược nhựa thông thường (0 Volt vs 15.000 Volt).
   - Form may đo khắc tên chủ nhân và lời chúc may mắn lên thân lược.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-58): add SaigonAcousticCimbalomSalonSanctuary, ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary, and ArtisanHandmadeHornAndTortoiseshellCombAtelier with 100% SEO pass'
\`;

async function dispatchSprint58() {
  console.log(\`[Master Orchestrator] Dispatching Sprint 58 to Agent \${TARGET_ID}...\`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-56-sprint-58-cimbalom-granite-horncomb',
    title: 'Phòng Đàn Đáy Tam Thập Lục, Đài Nước Hoa Cương & Lược Sừng Thụy Ứng',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 58 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_58_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(\`[Master Orchestrator] Language server send-message exited with code: \${code}\`);
  });
}

dispatchSprint58();
