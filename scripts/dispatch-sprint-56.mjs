import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_56_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 56: PHÒNG HÒA TẤU ĐÀN HẠC GỖ THÍCH, ĐÌNH TRÀ GẠCH CỔ BẾN NGHÉ & ẤM TRÀ BẠC CHẠM LỘNG ĐỒNG XÂM]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo nghệ thuật cao cấp với Sprint 56:
"PHÒNG HÒA TẤU ĐÀN HẠC GỖ THÍCH, ĐÌNH TRÀ GẠCH CỔ BẾN NGHÉ & ẤM TRÀ BẠC CHẠM LỘNG ĐỒNG XÂM"

Mục tiêu cốt lõi: Thiết kế phòng hòa tấu đàn hạc giao hưởng (Concert Grand Harp) vòm trần elip gỗ Thích tiêu âm; kiến tạo đình trà sân vườn phục dựng từ gạch cổ Bến Nghé thế kỷ 19 với máng đồng patina xanh; và chế tác ấm trà bạc ta 999 chạm lộng tinh xảo làng nghề Đồng Xâm kèm bếp than trúc Bát Tràng khử mùi.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA TẤU ĐÀN HẠC GIAO HƯỞNG (SaigonAcousticHarpSalonSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticHarpSalonSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Thanh Huyền Ảo Của 47 Dây Đàn Hạc:
   - Phòng hòa tấu thiết kế chuyên biệt cho đàn hạc hòa nhạc Salvi / Lyon & Healy với trần vòm elip tán âm phân tán sóng đứng; vách ốp kết hợp gỗ Thích tự nhiên và lụa tơ tằm dệt tay Bảo Lộc lót bông khoáng Basaltrock; thời gian vang RT60 hoàn hảo 0.36s; bệ nâng đàn hạc kiểm soát rung động đa hướng.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng âm sắc 47 dây đàn hạc qua Web Audio API: Debussy Arabesque No. 1, Clair de Lune.
   - Sơ đồ tương tác 7 bàn đạp (Pedal) chuyển dịch cao độ thang âm của đàn hạc.
   - Bộ chọn kịch bản chiếu sáng thính phòng: Dạ Khúc Huyền Ảo 2200K, Biểu Diễn Thính Phòng 3000K.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: ĐÌNH TRÀ GẠCH CỔ BẾN NGHÉ & MÁNG ĐỒNG PATINA (SaigonHeritageAncientBrickCourtyardPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonHeritageAncientBrickCourtyardPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Gạch Cổ Trăm Năm Thở Cùng Sài Gòn:
   - Gian đình trà ngoài trời sân vườn sử dụng 100% gạch cổ phục dựng từ công trình Bến Nghé - Chợ Quán xưa; mạch vữa vôi hàu cát mịn truyền thống thoát ẩm tự nhiên; hệ máng xối đồng đỏ gò tay lên ten xanh patina tự nhiên dẫn nước mưa vào bể cá thủy sinh; nhiệt độ vi khí hậu đình trà mát hơn môi trường 3.5°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình duyệt chất cảm 3 thời kỳ gạch cổ: Gạch Đất Nung Sài Gòn 1880, Gạch Vôi Cát Thập Niên 1920, Gạch Bông Gió Men Cổ.
   - Bộ theo dõi vi khí hậu đối lưu gió và độ bốc hơi bề mặt gạch.
   - Âm thanh giọt ranh rơi từ máng xối đồng xuống sỏi suối qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: XƯỞNG ẤM TRÀ BẠC CHẠM LỘNG ĐỒNG XÂM & BẾP THAN TRÚC (ArtisanImperialSilverChasedTeapotAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanImperialSilverChasedTeapotAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Trà Đạo Hoàng Gia - Nước Nấu Ấm Bạc Mềm Mượt:
   - Ấm pha trà chế tác từ bạc ta nguyên chất 999 dát gò liền khối do nghệ nhân kim hoàn Đồng Xâm chạm lộng hoa văn rồng phượng tinh xảo; quai ấm bọc mây rừng cách nhiệt; bếp than gốm men lam Bát Tràng đốt than trúc hoạt tính không mùi không khói giúp nước trà sôi tăm lăn tăn tròn vị (\`GU-TEAPOT-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính phóng đại 16x soi từng nét chạm lộng vảy rồng trên thân ấm bạc.
   - Máy tính độ mềm và độ ngọt của nước khi ion bạc Ag+ hòa tan vi lượng.
   - Form may đo ấm bạc khắc triện gia bảo riêng biệt.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-56): add SaigonAcousticHarpSalonSanctuary, SaigonHeritageAncientBrickCourtyardPavilion, and ArtisanImperialSilverChasedTeapotAtelier with 100% SEO pass'
\`;

async function dispatchSprint56() {
  console.log(\`[Master Orchestrator] Dispatching Sprint 56 to Agent \${TARGET_ID}...\`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-54-sprint-56-harp-ancientbrick-silverteapot',
    title: 'Phòng Đàn Hạc Giao Hưởng, Đình Trà Gạch Cổ Bến Nghé & Ấm Trà Bạc Chạm Lộng',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 56 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_56_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(\`[Master Orchestrator] Language server send-message exited with code: \${code}\`);
  });
}

dispatchSprint56();
