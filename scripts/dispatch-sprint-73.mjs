import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_73_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 73: PHÒNG THÍNH ÂM DÂY KHẢY BALALAIKA VÒM VÂN SAM, SẢNH SƯỞI ĐÁ HOA CƯƠNG BIOTITE NGUYÊN KHỐI & KHAY TRÀ SƠN MÀI THẾP VÀNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 73:
"PHÒNG THÍNH ÂM DÂY KHẢY BALALAIKA VÒM VÂN SAM, SẢNH SƯỞI ĐÁ HOA CƯƠNG BIOTITE NGUYÊN KHỐI & KHAY TRÀ SƠN MÀI THẾP VÀNG"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn tam giác Balalaika & Domra vòm gỗ Vân Sam tự nhiên âm học RT60 = 0.32s; kiến tạo sảnh sưởi đá hoa cương đen Biotite Bình Định nguyên khối 520kg tỏa nhiệt hồng ngoại xa êm ái xua tan nồm ẩm; và chế tác khay trà sơn mài then cốt gỗ Mít già thếp vàng quỳ 24K Kiêu Kỵ chịu nhiệt 100°C hoàn hảo.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍNH ÂM DÂY KHẢY BALALAIKA VÒM VÂN SAM (SaigonAcousticBalalaikaSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticBalalaikaSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Sắc Dây Khảy Tam Giác Tinh Tế:
   - Đại thính phòng thính âm đàn Balalaika Prima 3 dây tam giác truyền thống cùng đàn Domra 4 dây cần dài; mặt soundboard gỗ Vân Sam Val di Fiemme chọn lọc; lưng đàn 7 múi ghép từ gỗ Phong Nga uốn nhiệt; hệ nan vòm tán âm parabol Fermat; thời gian vang RT60 = 0.32s; hệ tủ vi khí hậu 50% RH ngăn ngừa rạn nứt keo cá tầm tự nhiên.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe trích đoạn dân ca kinh điển: Kalinka, Korobeiniki, Ánh Trăng Sáng qua Web Audio API.
   - Bảng 3 dây đàn Balalaika tương tác cho phép vuốt dây phát chuỗi bồi âm tremolo sống động.
   - Điều khiển 3 kịch bản ánh sáng thính phòng hoàng hôn tuyết trắng ấm cúng.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: SẢNH SƯỞI ĐÁ HOA CƯƠNG BIOTITE NGUYÊN KHỐI (SaigonMonolithicBiotiteGraniteFireplaceLounge.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonMonolithicBiotiteGraniteFireplaceLounge.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Đá Núi Ngàn Năm Sưởi Ấm Không Gian Sống:
   - Lò sưởi nghệ thuật tạo tác từ khối đá granite đen Biotite khai thác thủ công tại mỏ đá cổ Bình Định nặng 520kg; bề mặt mài lộ tinh thể mica ánh kim lấp lánh như bầu trời đêm đầy sao; lõi đốt củi trầm hoặc hệ thống sưởi gốm phát nhiệt tia hồng ngoại xa an toàn; ống khói đối lưu tự nhiên 1 chiều hút trọn ẩm nồm đẩy ra ngoài sông; hạ ẩm sàn từ 85% xuống 52%.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ điều chỉnh nhiệt lượng tỏa ra từ lò sưởi và hiển thị biểu đồ đối lưu nhiệt độ phòng khách.
   - Web Audio tiếng lửa nổ tí tách từ củi thông kết hợp tiếng gió sông rào rạt.
   - Khám phá lát cắt khoáng vật Biotite dưới kính lúp quang học 15x.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: KHAY TRÀ SƠN MÀI THEN CỐT MÍT THẾP VÀNG 24K (ArtisanGoldLeafLacquerTeaTrayAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanGoldLeafLacquerTeaTrayAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Nghi Thức Dâng Trà & Tinh Thần Nghệ Nhân Đất Thăng Long:
   - Tác phẩm khay trà cung đình chế tác từ cốt lõi gỗ Mít rừng Tây Nguyên ngâm bùn 3 năm triệt tiêu biến dạng; phủ 18 lớp sơn then Phú Thọ mài nước đến độ đen bóng sâu như gương nước mùa thu; viền khay thếp vàng quỳ 24K Kiêu Kỵ vẽ họa tiết "Song Long Chầu Nguyệt"; lòng khay phủ nano gốm vô cơ chịu nhiệt sôi 100°C kháng nước trà tuyệt đối (\`GU-TEATRAY-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Thử nghiệm độ bóng tráng gương của sơn then phản chiếu chén trà tử sa.
   - Kính soi cận cảnh hoa văn rồng cuộn dát vàng quỳ thủ công.
   - Form cá nhân hóa: Lựa chọn khắc gia huy chìm và chọn kích thước khay trà (Đơn Trà / Đối Ẩm / Quần Anh).

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-73): add SaigonAcousticBalalaikaSanctuarySalon, SaigonMonolithicBiotiteGraniteFireplaceLounge, and ArtisanGoldLeafLacquerTeaTrayAtelier with 100% SEO pass'
\`;

async function dispatchSprint73() {
  console.log(\`[Master Orchestrator] Dispatching Sprint 73 to Agent \${TARGET_ID}...\`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-71-sprint-73-balalaika-biotitefireplace-teatray',
    title: 'Phòng Balalaika Vòm Vân Sam, Sảnh Sưởi Đá Biotite & Khay Trà Sơn Mài Thếp Vàng',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 73 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_73_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(\`[Master Orchestrator] Language server send-message exited with code: \${code}\`);
  });
}

dispatchSprint73();
