import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_44_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 44: THƯ VIỆN BẢN ĐỒ HÀNG HẢI CỔ, BỒN SỤC ONSEN GỖ HINOKI & VƯỜN DƯỢC LIỆU TRONG NHÀ]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 43:
- Toàn bộ hệ sinh thái thủy sinh Biotope Mê Kông, đèn chùm pha lê Baccarat và hầm ủ Single Malt Whisky đã hoàn tất 100% với 0 lỗi.

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 44:
"THƯ VIỆN BẢN ĐỒ HÀNG HẢI CỔ, BỒN SỤC ONSEN GỖ HINOKI & VƯỜN DƯỢC LIỆU TRONG NHÀ"

Mục tiêu cốt lõi: Thiết kế phòng lưu trữ và bảo tồn bản đồ hàng hải cổ cùng quả địa cầu đồng thau với công nghệ vi khí hậu 50% RH và cáp quang Fiber Optic; chế tác bồn sục Onsen nước khoáng nóng gỗ Hinoki Nhật Bản 250 năm tuổi với hệ bọt micro-bubble 41.5°C; và kiến tạo khu vườn thảo mộc dược liệu bản địa trong nhà hệ thủy canh gốm Bát Tràng.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG LƯU TRỮ BẢN ĐỒ HÀNG HẢI CỔ & QUẢ ĐỊA CẦU ĐỒNG THAU (SaigonMaritimeAntiqueMapLibraryVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonMaritimeAntiqueMapLibraryVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Giao Thoa Di Sản Đại Dương & Kỹ Nghệ Lưu Trữ Bảo Tàng:
   - Phòng trưng bày các bản đồ hàng hải Đông Dương thế kỷ 18-19 và hải đồ sông Sài Gòn. Tủ kính chuyên dụng Artglass UV99 chống 99.9% tia tử ngoại, kiểm soát độ ẩm liên tục 50% RH chống giòn ố vàng giấy cổ. Hệ chiếu sáng sợi quang Fiber Optic lạnh hoàn toàn không sinh nhiệt. Quả địa cầu thiên văn chế tác thủ công từ đồng thau C36000 với vòng quay xích đạo cơ khí chính xác.
2. Tính năng kỹ thuật & UI tương tác:
   - Kính lúp kỹ thuật số tương tác phóng to chi tiết hải đồ sông Sài Gòn xưa.
   - Bảng đồng hồ kiểm soát vi khí hậu tủ kính bảo tồn giấy cổ.
   - Thư mục 4 tấm hải đồ quý giá của các nhà thám hiểm phương Tây vẽ về xứ Đàng Trong.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỒN SỤC ONSEN THỦY LIỆU PHÁP GỖ HINOKI 250 NĂM (ArtisanHinokiHydrotherapyOnsenVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanHinokiHydrotherapyOnsenVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Tắm Khoáng Trị Liệu Thân Tâm Trong Hương Rừng Cổ Thụ:
   - Bồn tắm sục Onsen gia công từ gỗ Hinoki Kiso Nhật Bản tuổi đời hơn 250 năm không sử dụng đinh ốc, tiết tinh dầu thơm phytoncide tự nhiên xoa dịu thần kinh. Hệ thống đầu sục tạo vi bọt khí nano Micro-bubble siêu mịn massage sâu từng huyệt đạo. Bộ gia nhiệt Inverter duy trì nước khoáng nóng chính xác ở 41.5°C, lọc kép Ozone/UV-C không mùi clo. Sàn bước đá núi lửa bazan đen mài nhám R13 chống trượt.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ chọn nhiệt độ Onsen (38°C thư giãn cơ bắp, 41.5°C chuẩn Onsen truyền thống, 43°C giải độc sâu).
   - Mô phỏng bọt khí nano sủi bọt xoa dịu cơ thể.
   - Đồng hồ đo nồng độ tinh dầu gỗ Hinoki trong không khí.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: VƯỜN DƯỢC LIỆU & THẢO MỘC TƯƠI TRONG NHÀ (ArtisanIndoorMedicinalHerbGardenAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanIndoorMedicinalHerbGardenAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Thảo Dược Tự Nhiên Chữa Lành Tại Dinh Thự:
   - Hệ thống giàn treo gốm Bát Tràng tráng men mộc trồng các loại thảo mộc bản địa (hương nhu, bạc hà Nam Bộ, sả chanh, ngải cứu, hương thảo). Hệ thống tưới nhỏ giọt tự động kết hợp đèn LED bước sóng 450nm & 660nm kích hoạt tối đa hàm lượng tinh dầu dược tính. Quầy pha chế trà tươi cắt tại chỗ phục vụ gia chủ vào mỗi sớm mai (\`GU-HERB-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Bảng hướng dẫn 4 công thức pha chế trà thảo dược thanh lọc cơ thể theo mùa.
   - Trình điều khiển chu kỳ tưới dưỡng chất và quang chu kỳ đèn LED sinh học.
   - Form tư vấn kiến tạo vườn thảo dược tại logia và giếng trời penthouse.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-44): add SaigonMaritimeAntiqueMapLibraryVault, ArtisanHinokiHydrotherapyOnsenVault, and ArtisanIndoorMedicinalHerbGardenAtelier with 100% SEO pass'
----------------------------------------------------------------------
`;

async function main() {
  console.log('[MASTER-ORCHESTRATOR] Updating state and preparing Sprint 44 dispatch...');

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed to parse state file:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-42-sprint-44-map-onsen-herbgarden',
    title: 'Thư Viện Bản Đồ Hàng Hải Cổ, Bồn Sục Onsen Gỗ Hinoki & Vườn Dược Liệu Trong Nhà',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[MASTER-ORCHESTRATOR] State updated to Sprint 44.');

  const child = spawn(
    LANGUAGE_SERVER_EXE,
    ['send-agent-message', '--to', TARGET_ID, '--message', SPRINT_44_DIRECTIVE],
    { stdio: 'inherit' }
  );

  child.on('exit', (code) => {
    console.log(`[MASTER-ORCHESTRATOR] Directive Sprint 44 dispatched with exit code: ${code}`);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('[MASTER-ORCHESTRATOR] Error in dispatch-sprint-44:', err);
  process.exit(1);
});
