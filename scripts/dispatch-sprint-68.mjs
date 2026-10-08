import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_68_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 68: PHÒNG HÒA ÂM ĐÀN NHỊ GỖ MUN, VƯỜN ĐỊA LAN PHONG SƯƠNG & CHÉN TRÀ MEN MẬT ONG BÁT TRÀNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 68:
"PHÒNG HÒA ÂM ĐÀN NHỊ GỖ MUN, VƯỜN ĐỊA LAN PHONG SƯƠNG & CHÉN TRÀ MEN MẬT ONG BÁT TRÀNG"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn Nhị & đàn Hồ gỗ Mun sọc vòm tán âm rãnh hẹp RT60 = 0.34s; kiến tạo vườn địa lan rừng sương mù vi khí hậu nhiệt đới 21°C - 24°C béc phun nano 3 micron; và chế tác bộ chén trà men mật ong Bát Tràng nung củi cổ bản độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN NHỊ GỖ MUN SỌC (SaigonAcousticErhuSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticErhuSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Dây Tơ Da Trăn - Tiếng Lòng Tha Thiết:
   - Thính phòng tôn vinh đàn Nhị & đàn Hồ hai dây chế tác từ gỗ Mun sọc Khánh Hòa và da trăn gấm tự nhiên; cần đàn khảm xà cừ ngũ sắc; vĩ đàn lông đuôi ngựa thảo nguyên dẻo dai bôi nhựa thông tự nhiên; vách tán âm tiêu âm dải cao gắt 2.500Hz - 5.000Hz; thời gian vang RT60 = 0.34s; tủ kính bảo quản 52% RH & 22°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử giai điệu đàn Nhị da diết qua Web Audio API: Dạ Cổ Hoài Lang, Lưu Thủy Hành Vân.
   - Trình điều chỉnh 2 dây D4 - A4 và độ căng da trăn mặt đàn.
   - 3 kịch bản ánh sáng dạ khúc hoài niệm (2200K, 2400K, 2700K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: VƯỜN ĐỊA LAN RỪNG SƯƠNG MÙ VI KHÍ HẬU (SaigonWildOrchidMicroclimatePavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonWildOrchidMicroclimatePavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Vương Giả Phong Lan - Hương Thơm Thoát Tục:
   - Vườn địa lan và phong lan rừng quý hiếm ghép trên thân lũa Sao Đen ngâm bùn; hệ phun sương nano áp suất cao 70 bar hạt sương 3 micron hạ nhiệt môi trường xuống 21°C - 24°C và duy trì độ ẩm 80% RH như rừng sương mù cao nguyên; đèn quang phổ mặt trời Full Spectrum CRI 99 kích thích nở hoa ngát hương.
2. Tính năng kỹ thuật & UI tương tác:
   - Bảng điều khiển vi khí hậu thông minh (Nhiệt độ, Độ ẩm sương mù, Ánh sáng PAR).
   - Thưởng thức tiếng suối rừng róc rách và chim rừng hót sớm mai qua Web Audio API.
   - Form tư vấn may đo hệ thống vi khí hậu nuôi lan cho penthouse và sân thượng.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ CHÉN TRÀ MEN MẬT ONG BÁT TRÀNG (ArtisanBatTrangHoneyGlazeTeaBowlVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanBatTrangHoneyGlazeTeaBowlVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Gốm Men Hỏa Biến - Mật Ngọt Đất Phù Sa:
   - Bộ 6 chén trà gốm men mật ong hoàng liên nung củi Bát Tràng 1.280°C; men tro trấu tự nhiên tạo vệt hỏa biến óng ả màu hổ phách sâu; miệng chén vê tay mỏng nhẹ ôm trọn bờ môi; giữ nhiệt nước trà mà không làm bỏng tay người cầm; đáy chén dập ấn triện gia tộc độc bản (\`GU-TEABOWL-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình xoay 360° chén trà với các vệt hỏa biến men mật ong lấp lánh dưới ánh sáng nến.
   - Kính phóng đại 20x soi hạt bọt khí li ti trong lớp men tro trấu cổ truyền.
   - Form đặt chế tác bộ chén trà mang dấu triện dòng họ riêng biệt.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-68): add SaigonAcousticErhuSanctuarySalon, SaigonWildOrchidMicroclimatePavilion, and ArtisanBatTrangHoneyGlazeTeaBowlVault with 100% SEO pass'
`;

async function dispatchSprint68() {
  console.log(`[Master Orchestrator] Dispatching Sprint 68 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-66-sprint-68-erhu-wildorchid-honeybowl',
    title: 'Phòng Đàn Nhị Gỗ Mun, Vườn Địa Lan Phong Sương & Chén Trà Men Mật Ong',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 68 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_68_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint68();
