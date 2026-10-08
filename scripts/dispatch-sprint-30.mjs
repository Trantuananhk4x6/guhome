import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_30_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 30: VƯỜN TƯỜNG ĐỨNG THỦY CANH, BỒN TẮM ĐÁ KHỐI & HỒ SƠ HOÀN CÔNG BÌA DA A3]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 29:
- SaigonBespokeInfinityPoolLab, HandCarvedStoneFireplaceVault, và PrivateYachtBerthAndHelipadConcierge đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống hồ bơi vô cực điện phân khoáng biển, lò sưởi hơi nước đá khối và bến du thuyền ven sông đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 30:
"VƯỜN TƯỜNG ĐỨNG THỦY CANH, BỒN TẮM ĐÁ KHỐI & HỒ SƠ HOÀN CÔNG BÌA DA A3"

Mục tiêu cốt lõi: Thiết lập vườn tường đứng sinh học lọc bụi mịn PM2.5 cho đại sảnh thông tầng; chế tác bồn tắm đá sa thạch đục tay nguyên khối nặng 1.4 tấn giữ ấm khoáng nóng 50 phút; và nâng tầm lễ bàn giao với hồ sơ hoàn công A3 bìa da dập nhũ vàng 24K kèm mô hình 1:20 gỗ óc chó.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: VƯỜN TƯỜNG ĐỨNG THỦY CANH SINH HỌC (SaigonBiophilicGreenWallAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBiophilicGreenWallAtelier.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Lá Phổi Xanh Giữa Đô Thị Nắng Gắt:
   - Sài Gòn ô nhiễm khói xe và bụi mịn đòi hỏi một bộ lọc sinh học tự nhiên khổng lồ ngay trong phòng khách. GuHomes ứng dụng mảng tường xanh thủy canh cao 6m với các loài thực vật nhiệt đới bản địa (Lan Ý, Ráng Ổ Phụng, Trầu Bà Thanh Xuân) hấp thụ khí độc VOCs và làm dịu nhiệt độ tường 4.2°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Hệ thống tưới nhỏ giọt ngầm tuần hoàn vi sinh không dùng đất, chống muỗi và vi khuẩn nấm mốc 100%.
   - Trình mô phỏng chỉ số chất lượng không khí: AQI ngoài phố 165 (Đỏ) -> AQI nội thất GuHomes 18 (Xanh ngọc).
   - Tự động cung cấp độ ẩm sinh thái tự nhiên 62% RH cho căn nhà điều hòa kín.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: XƯỞNG BỒN TẮM ĐÁ NGUYÊN KHỐI & CHẬU ĐỒNG ĐÚC (ArtisanHandCastBronzeBasinVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanHandCastBronzeBasinVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Thánh Địa Phục Hồi Thân - Tâm - Trí:
   - Từ chối bồn tắm nhựa acrylic mỏng manh nhân tạo mau nguội nước. Nghệ nhân đục tay bồn tắm đá sa thạch xám nguyên khối 1.4 tấn và chậu rửa đúc đồng thau cát thủ công, giữ nhiệt độ nước khoáng ấm lâu hơn 50 phút và phát ra tần số năng lượng đất mẹ tĩnh tại.
2. Tính năng kỹ thuật & UI tương tác:
   - Thử nghiệm độ giữ nhiệt: Bồn tắm acrylic thường nguội sau 15 phút vs Bồn đá GuHomes duy trì 39°C suốt 50 phút.
   - Bộ sưu tập 3 mẫu điêu khắc: Đá Sa Thạch Bazan chẻ rãnh, Cẩm Thạch Trắng Vân Mây, Bồn Đồng Thau Gõ Búa Rêu Phong.
   - Vòi nước thác chảy tự nhiên không văng bắn kèm tinh dầu muối khoáng thảo mộc.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: KHO LƯU TRỮ HỒ SƠ HOÀN CÔNG A3 BÌA DA (MasterArchitecturalDossierArchive.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/MasterArchitecturalDossierArchive.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Sử Ký Kiến Trúc Cho Ngôi Nhà:
   - Ngày dọn vào tổ ấm mới, gia chủ được trao một bộ hồ sơ hoàn công in màu khổ A3 trên giấy mỹ thuật Arches Pháp dày 300gsm đóng bìa da bò Ý dập nhũ vàng 24K, lưu trữ từng vị trí đường ống ngầm và chi tiết khớp mộng gỗ của ngôi nhà cho các thế hệ con cháu.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình duyệt lật giở hồ sơ A3 kỹ thuật số từng trang vẽ tay phối cảnh mặt cắt 3D.
   - Mô hình kiến trúc tỷ lệ 1:20 chế tác từ gỗ óc chó và đá vôi đặt trong lồng kính pha lê làm vật phẩm phong thủy đại sảnh.
   - Form đăng ký gia công Hộp Hồ Sơ Hoàn Công Di Sản kèm mã tiếp đón VIP \`GU-DOSSIER-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-30): add SaigonBiophilicGreenWallAtelier, ArtisanHandCastBronzeBasinVault, and MasterArchitecturalDossierArchive with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!"
`;

console.log('Updating master-orchestrator-state.json for Sprint 30...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-28-sprint-30-greenwall-stonebasin-dossier',
    title: 'Vườn Tường Đứng Thủy Canh, Bồn Tắm Đá Khối & Hồ Sơ Hoàn Công Bìa Da A3',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 30 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 30', TARGET_ID, SPRINT_30_DIRECTIVE],
  { stdio: ['ignore', 'pipe', 'pipe'] }
);

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => {
  stdout += data.toString();
});

child.stderr.on('data', (data) => {
  stderr += data.toString();
});

child.on('close', (code) => {
  console.log(`Command finished with exit code ${code}`);
  if (stdout) console.log('STDOUT:\n', stdout);
  if (stderr) console.error('STDERR:\n', stderr);
  process.exit(code ?? 0);
});
