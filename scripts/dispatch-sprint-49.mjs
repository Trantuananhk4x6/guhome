import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_49_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 49: NHÀ KÍNH KIỂNG LÁ NHIỆT ĐỚI, MÂM ĐĨA THAN ĐỆM TỪ TRƯỜNG & CHẬU ĐẤT NUNG PHÙ SA]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 49:
"NHÀ KÍNH KIỂNG LÁ NHIỆT ĐỚI, MÂM ĐĨA THAN ĐỆM TỪ TRƯỜNG & CHẬU ĐẤT NUNG PHÙ SA"

Mục tiêu cốt lõi: Thiết kế nhà kính mini bảo tồn các dòng kiểng lá Aroid & dương xỉ nhiệt đới quý hiếm; chế tác bàn mâm xoay đĩa than đệm từ trường chống rung tuyệt đối phiến đá bazan 45kg; và phục hồi nghệ thuật gốm đất nung đỏ phù sa sông Đồng Nai vuốt tay truyền thống.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: NHÀ KÍNH MINI BẢO TỒN KIỂNG LÁ QUÝ HIẾM (SaigonStainedGlassTerrariumConservatory.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonStainedGlassTerrariumConservatory.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Thiên Nhiên Thu Nhỏ Giữa Không Gian Sống Tinh Tuyển:
   - Tủ nhà kính Terrarium khung đồng thau xước mờ liên kết kính siêu trong Low-Iron sưởi nhiệt chống đọng sương; hệ thống điều hòa vi khí hậu khép kín kiểm soát 24°C - 26°C và 80% - 85% RH; hệ béc phun sương siêu âm nano 2 micron; đèn LED Full-Spectrum 4000K CRI 97 giả lập chu kỳ quang hợp tự nhiên; nơi bảo tồn các dòng kiểng lá đột biến quý giá (Monstera Borsigiana Albo, Philodendron Spiritus Sancti, Dương xỉ mộc cổ đại).
2. Tính năng kỹ thuật & UI tương tác:
   - Bảng theo dõi cảm biến vi sinh thời gian thực (Nhiệt độ, Độ ẩm, Cường độ PAR µmol/m²/s, Nồng độ CO2).
   - Chuyển đổi 3 chu kỳ chiếu sáng sinh trưởng: Bình Minh Ấm Áp (2700K), Quang Hợp Trưa (5000K), Thư Giãn Ban Đêm (Ánh trăng 4000K dịu nhẹ).
   - Kính lúp soi chi tiết cấu trúc diệp lục và tế bào đột biến bạch tạng trên phiến lá.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BÀN MÂM XOAY ĐĨA THAN ĐỆM TỪ TRƯỜNG BAZAN (SaigonBespokeAudiophileTurntableVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBespokeAudiophileTurntableVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Âm Thanh Thuần Khiết Tuyệt Đối Của Đĩa Nhựa Vinyl:
   - Hệ thống mâm quay đĩa than mạ vàng 24K nâng bồng bềnh bằng lực đẩy nam châm vĩnh cửu Neodymium đối cực, loại bỏ hoàn toàn ma sát cơ học; bệ máy đúc từ phiến đá bazan đen Đắk Nông nặng 45kg triệt tiêu cộng hưởng âm trầm; tay cần Tonearm 12-inch sợi carbon dệt đa trục; đầu kim Cartridge MC Thụy Sĩ đầu kim cương Micro-Ridge; mạch tiền khuếch đại Phono Preamp bóng đèn 300B Class A thuần khiết.
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng tốc độ quay đĩa 33⅓ và 45 RPM kèm đèn Strobe nhấp nháy kiểm tra độ chính xác vòng tua.
   - Thưởng thức âm thanh mộc analog mộc mạc và tiếng nổ lách tách vinyl hoài niệm qua Web Audio API.
   - Sơ đồ cắt lớp cơ chế đệm từ trường chống rung vi mô.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ SƯU TẬP CHẬU GỐM ĐẤT NUNG ĐỎ PHÙ SA (ArtisanHandmadeTerracottaPlanterAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeTerracottaPlanterAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Gốm Thở Nuôi Dưỡng Từng Tế Bào Rễ:
   - Tác phẩm chậu gốm chế tác từ đất phù sa sông Đồng Nai giàu khoáng chất nung củi truyền thống 1.150°C; thành chậu có hàng triệu mao dẫn siêu nhỏ giúp rễ cây hô hấp đối lưu oxy tự nhiên chống thối rễ trong mùa mưa ẩm Sài Gòn; hoa văn khắc tay vân sóng nước Nam Bộ và triện gốm nung củi; dải màu biến thiên tự nhiên từ đỏ gạch đến cam cháy mộc mạc (\`GU-PLANTER-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình xoay 360° các kiểu dáng chậu gốm: Chậu Trụ Cao (Cây thế), Chậu Miệng Loe (Monstera), Chậu Bầu Tròn (Bonsai).
   - Thí nghiệm đối chiếu khả năng thoát hơi ẩm và đối lưu oxy giữa chậu đất nung vs chậu tráng men / composite.
   - Form may đo kích thước chậu và dập ấn triện gia tộc độc bản.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-49): add SaigonStainedGlassTerrariumConservatory, SaigonBespokeAudiophileTurntableVault, and ArtisanHandmadeTerracottaPlanterAtelier with 100% SEO pass'
`;

async function dispatchSprint49() {
  console.log(`[Master Orchestrator] Dispatching Sprint 49 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-47-sprint-49-terrarium-turntable-planter',
    title: 'Nhà Kính Kiểng Lá Nhiệt Đới, Mâm Đĩa Than Đệm Từ Trường & Chậu Gốm Phù Sa',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 49 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_49_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint49();
