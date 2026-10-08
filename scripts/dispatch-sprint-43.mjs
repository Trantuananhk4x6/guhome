import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_43_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 43: THỦY SINH BIOTOPE MÊ KÔNG NGUYÊN SINH, ĐÈN CHÙM PHA LÊ THÔNG TẦNG & HẦM Ủ WHISKY THÙNG SỒI]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 42:
- Toàn bộ các hệ sinh thái giếng trời Cần Giờ, đồng hồ nước Clepsydra và tủ tourbillon đã vận hành hoàn hảo với 100% SEO pass và 0 lỗi.

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 43:
"THỦY SINH BIOTOPE MÊ KÔNG NGUYÊN SINH, ĐÈN CHÙM PHA LÊ THÔNG TẦNG & HẦM Ủ WHISKY THÙNG SỒI"

Mục tiêu cốt lõi: Tái hiện hệ sinh thái Biotope thủy sinh dòng sông Mê Kông nguyên bản với lũa sao đen cổ thụ và nước tĩnh lọc ngầm; kiến tạo kiệt tác đèn chùm pha lê thủ công thông tầng 7.2m cơ cấu nâng hạ tự động; và xây dựng hầm thư viện lưu trữ thùng gỗ sồi ủ Single Malt Whisky kiểm soát chuẩn khí hậu 16°C & 65% RH.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: HỆ SINH THÁI THỦY SINH BIOTOPE MÊ KÔNG (SaigonMekongBiotopeAquariumVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonMekongBiotopeAquariumVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Dòng Sông Nam Bộ Chảy Giữa Lòng Biệt Thự:
   - Hồ kính siêu trong Low-Iron 19mm dài 4m tái hiện lát cắt lòng sông Mê Kông: rễ lũa sao đen ngập nước hàng thế kỷ, thảm thực vật thủy sinh bản địa, cát phù sa cổ tự nhiên phân tầng sinh học. Hệ tuần hoàn dòng chảy chậm êm dịu, âm thanh lọc ngầm dưới 15 dBA kết hợp đèn mô phỏng chu kỳ bình minh, nắng trưa nhiệt đới và hoàng hôn sông nước.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình điều khiển chu kỳ quang phổ và dòng chảy nước 4 thời điểm trong ngày.
   - Thước đo chỉ số thủy hóa sinh học: pH 6.8, TDS 110 ppm, Oxy hòa tan 8.2 mg/L.
   - Bản đồ hệ sinh vật bản địa lưu vực sông Nam Bộ.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: KIỆT TÁC ĐÈN CHÙM PHA LÊ THÔNG TẦNG TỰ ĐỘNG (ArtisanBaccaratCrystalChandelierAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanBaccaratCrystalChandelierAtelier.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Vũ Điệu Ánh Sáng Tinh Khiết & Cơ Khí Chính Xác:
   - Hệ đèn chùm thông tầng 7.2m thả từ giếng trời trung tâm với 1.200 viên pha lê quang học cắt giác kim cương khúc xạ ánh sáng 7 màu rực rỡ. Khung titan siêu nhẹ chịu lực gió và chống rung lắc. Hệ thống tời điện âm trần vi điều khiển hỗ trợ nâng hạ nhẹ nhàng để vệ sinh và bảo trì mà không cần giàn giáo. Nguồn LED Warm Dimming 1800K - 2700K êm ái cho đôi mắt gia chủ.
2. Tính năng kỹ thuật & UI tương tác:
   - Điều khiển kịch bản chiếu sáng: Dạ tiệc Gala (100%), Tiệc tối Tĩnh lặng (40%), Ánh nến Tự nhiên (15%).
   - Mô phỏng cơ cấu tời nâng hạ an toàn với cảm biến chống kẹt tải.
   - Bộ tính toán quang thông và độ chói chuẩn bảo tàng (Lux/Lumen calculator).

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: HẦM THƯ VIỆN THÙNG GỖ SỒI Ủ WHISKY ĐỘC BẢN (PrivateWhiskyLibraryAndCaskVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/PrivateWhiskyLibraryAndCaskVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Thời Gian Đọng Lại Trong Vân Gỗ Sồi:
   - Vòm hầm ghép từ gỗ sồi trắng Mỹ uốn cong truyền thống, bảo tồn khí hậu hoàn hảo 16°C và độ ẩm 65% RH giúp hạn chế thất thoát rượu qua gỗ ("Angel's share" < 1.2%/năm). Quầy bar ốp đá Onyx xuyên sáng màu hổ phách, tủ bảo quản các chai Single Malt số lượng giới hạn và ngăn trữ đá viên tròn thủ công đúc từ nước nguồn tinh khiết (\`GU-WHISKY-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Giả lập quá trình lão hóa rượu và tương tác hương gỗ qua biểu đồ thời gian.
   - Bảng điều khiển vi khí hậu buồng ủ (nhiệt độ, ẩm độ, luân chuyển khí).
   - Form đăng ký thiết kế không gian thưởng rượu và đặt thùng ủ cá nhân hóa.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-43): add SaigonMekongBiotopeAquariumVault, ArtisanBaccaratCrystalChandelierAtelier, and PrivateWhiskyLibraryAndCaskVault with 100% SEO pass'
----------------------------------------------------------------------
`;

async function main() {
  console.log('[MASTER-ORCHESTRATOR] Updating state and preparing Sprint 43 dispatch...');

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed to parse state file:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-41-sprint-43-mekong-chandelier-whisky',
    title: 'Thủy Sinh Biotope Mê Kông, Đèn Chùm Pha Lê Thông Tầng & Hầm Ủ Whisky Thùng Sồi',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[MASTER-ORCHESTRATOR] State updated to Sprint 43.');

  const child = spawn(
    LANGUAGE_SERVER_EXE,
    ['send-agent-message', '--to', TARGET_ID, '--message', SPRINT_43_DIRECTIVE],
    { stdio: 'inherit' }
  );

  child.on('exit', (code) => {
    console.log(`[MASTER-ORCHESTRATOR] Directive Sprint 43 dispatched with exit code: ${code}`);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('[MASTER-ORCHESTRATOR] Error in dispatch-sprint-43:', err);
  process.exit(1);
});
