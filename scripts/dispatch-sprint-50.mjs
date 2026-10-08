import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_50_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 50: ĐÀI QUAN SÁT THIÊN VĂN MÁI KÍNH, PHÒNG ĐÀN HẠC MẠ VÀNG & HŨ TRÀ ĐỒNG DÁT VÀNG QUỲ]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA long trọng chúc mừng cột mốc thế kỷ SPRINT 50:
"ĐÀI QUAN SÁT THIÊN VĂN MÁI KÍNH, PHÒNG ĐÀN HẠC MẠ VÀNG & HŨ TRÀ ĐỒNG DÁT VÀNG QUỲ"

Mục tiêu cốt lõi: Thiết kế đài thiên văn tư gia với mái vòm trượt kính cong 360° cách ly rung động; kiến tạo phòng thính âm đàn hạc Concert Grand Harp âm học RT60 = 0.36s; và chế tác bộ hũ trà đồng thau thủ công thếp vàng quỳ 24K kín khí 100%.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: ĐÀI QUAN SÁT THIÊN VĂN MÁI VÒM TRƯỢT TƯ GIA (SaigonAstronomyObservatoryRetractableDomeVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAstronomyObservatoryRetractableDomeVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Chạm Vào Các Vì Tinh Tú Từ Dinh Thự:
   - Mái vòm kính cong 360° đường kính 3.6m điều khiển cơ điện tử mở tự động hai cánh êm ái < 15 dBA; kính quang học lọc sáng chống sương mờ sưởi nhiệt màng nano; bệ kính viễn vọng khúc xạ đúc từ cột đá granite nguyên khối cắm sâu vào trụ dầm biệt thự triệt tiêu rung chấn; kính viễn vọng Takahashi TOA-150B định vị vi tính tự động bám theo tọa độ thiên văn; điều hòa nhiệt độ cân bằng vi khí hậu chống nhiễu động khí quyển.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ điều khiển xoay vòm 360° và mở cửa vòm quan sát.
   - Bộ giả lập góc nhìn thị kính: Chi tiết Mặt Trăng (Hố va chạm Tycho), Vành đai Sao Thổ, Tinh vân Orion M42.
   - Bản đồ các chòm sao hiển thị thời gian thực theo tọa độ Sài Gòn (10.7769° N).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: PHÒNG THÍNH ÂM ĐÀN HẠC VÒM GỖ UỐN (SaigonAcousticHarpSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticHarpSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Thanh Âm Tinh Khiết Của Thiên Thần:
   - Đại sảnh âm nhạc tôn vinh cây đàn hạc Concert Grand Harp Lyon & Healy chạm khắc thếp vàng lá 24K; hệ vách tán âm đường cong hữu cơ bằng gỗ Phong lá đỏ và sồi trắng Bắc Mỹ; không sử dụng bất kỳ chi tiết kim loại cộng hưởng nào trên tường; thời gian vang RT60 hoàn hảo 0.36s giúp từng nốt rải arpeggio ngân vang lấp lánh như giọt sương mai.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử các hợp âm rải đàn Hạc huyền ảo qua Web Audio API.
   - Mô phỏng 7 bàn đạp pedal chuyển điệu bán âm của đàn hạc hòa nhạc.
   - Điều khiển 3 kịch bản ánh sáng rọi đàn hạc: Bình Minh Ấm, Dạ Yến Hoàng Gia, Ánh Trăng Thiền Định.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ HŨ TRÀ ĐỒNG THAU THẾP VÀNG QUỲ KÍN KHÍ (ArtisanGoldLeafTeaCanisterAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanGoldLeafTeaCanisterAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Gìn Giữ Hương Trà Cổ Thụ Qua Năm Tháng:
   - Tác phẩm hũ trà thủ công gò từ đồng đỏ nguyên chất và đồng thau, nắp đậy 2 lớp tiện CNC dung sai 0.02mm khít khí hoàn toàn chống ẩm nhiệt đới; bề mặt ngoài thếp vàng quỳ 24K Kiêu Kỵ chạm khắc họa tiết Tứ Quý và sóng nước sông Sài Gòn; ruột lót gỗ Tuyết Tùng tự nhiên hấp thụ ẩm thừa giữ trọn vẹn hương trà Shan Tuyết Tà Xùa và Mộc Châu (\`GU-TEACAN-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình thử nghiệm độ kín khí nắp hũ trà (hiệu ứng nén khí trượt êm tự hít chặt).
   - Biểu đồ theo dõi độ giữ hương của trà theo thời gian 1 năm - 3 năm - 5 năm.
   - Form may đo khắc tên và ấn triện cá nhân hóa cho từng hộp trà danh gia vọng tộc.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-50): add SaigonAstronomyObservatoryRetractableDomeVault, SaigonAcousticHarpSanctuarySalon, and ArtisanGoldLeafTeaCanisterAtelier with 100% SEO pass'
`;

async function dispatchSprint50() {
  console.log(`[Master Orchestrator] Dispatching Sprint 50 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-48-sprint-50-observatory-harp-teacanister',
    title: 'Đài Thiên Văn Mái Kính, Phòng Đàn Hạc Mạ Vàng & Hũ Trà Đồng Dát Vàng',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 50 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_50_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint50();
