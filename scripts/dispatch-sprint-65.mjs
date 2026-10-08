import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_65_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 65: PHÒNG HÒA ÂM ĐÀN OUD HOÀNG ĐÀN, HỒ KHOÁNG NÚI LỬA NƯỚC MẶN & ẤM TỬ SA ĐOẠN NÊ KHẮC THƠ]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 65:
"PHÒNG HÒA ÂM ĐÀN OUD HOÀNG ĐÀN, HỒ KHOÁNG NÚI LỬA NƯỚC MẶN & ẤM TỬ SA ĐOẠN NÊ KHẮC THƠ"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn Oud & Lute vòm gỗ Hoàng Đàn tuyết và Tuyết Tùng Lebanon RT60 = 0.35s; kiến tạo hồ bơi khoáng mặn trị liệu ốp đá phiến núi lửa Đắk Nông kết hợp muối hồng Himalaya; và chế tác bộ ấm trà Tử Sa đất Đoạn Nê Hoàng Long Sơn khắc thơ cổ bản độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN OUD HOÀNG ĐÀN (SaigonAcousticOudSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticOudSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Giai Điệu Sa Mạc & Hương Gỗ Quý Tộc:
   - Thính phòng tôn vinh cây đàn Oud & Lute hoàng gia chế tác từ gỗ Hoàng Đàn Tuyết Lạng Sơn và Tuyết Tùng Lebanon thơm ngát; hệ vách tán âm hoa văn Arabesque hình học đục mộng âm dương không đinh kim loại; sàn gỗ Cẩm Lai ghép thủ công; thời gian vang RT60 = 0.35s; tủ kính vi khí hậu bảo tồn nhạc cụ 48% RH, 21.5°C chống biến dạng phím cần.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử giai điệu Maqam Ả Rập qua Web Audio API với âm sắc mộc dày dặn, rung ngân trầm ấm.
   - Trình tinh chỉnh 11 dây đàn và thế bấm nửa cung vi mô (Quarter tones).
   - 3 kịch bản ánh sáng huyền bí sa mạc nghìn lẻ một đêm (2200K, 2400K, 2800K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: HỒ KHOÁNG NÚI LỬA NƯỚC MẶN (SaigonVolcanicSlateMineralPoolPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonVolcanicSlateMineralPoolPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Thủy Liệu Trầm Tích Núi Lửa:
   - Hồ bơi nước ấm 34°C tích hợp hệ thống điện phân muối khoáng hồng Himalaya tự nhiên nuôi dưỡng tế bào da; lòng hồ ốp đá phiến dung nham núi lửa Đắk Nông giữ nhiệt bức xạ hồng ngoại xa; vách rèm nước tuần hoàn trên khối đá bazan đen tự nhiên hạ nhiệt không khí lân cận; bơm sục khí nano siêu êm < 20 dBA.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ điều chỉnh nhiệt độ nước (30°C - 38°C) và nồng độ khoáng vi lượng ion Magie, Kali, Natri.
   - Thưởng thức tiếng suối khoáng ngầm và sóng vỗ êm đềm qua Web Audio API.
   - Form may đo khảo sát kết cấu móng và tải trọng công trình biệt thự penthouse.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ ẤM TỬ SA ĐOẠN NÊ KHẮC THƠ (ArtisanDuanniZishaTeapotAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanDuanniZishaTeapotAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Vàng Son Đất Mẹ & Nghệ Thuật Đề Thơ:
   - Ấm trà Tử Sa đất Đoạn Nê (Duanni Clay) khai thác tầng sâu quặng mỏ Hoàng Long Sơn ủ 20 năm, màu vàng chuối chín thanh nhã; mao dẫn khí khổng kép giữ trọn vẹn hương trà ô long Nham Trà Vũ Di và Lão Trà Phổ Nhĩ; nghệ nhân gọt tỉa thủ công chạm khắc bài thơ "Thính Vũ Trúc Hiên" kèm dấu triện GuHomes (\`GU-ZISHA-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình xoay 360° ấm trà với ánh sáng mô phỏng độ bóng ngọc của ấm sau khi dưỡng trà 3 năm.
   - Kính hiển vi 20x soi hạt khoáng tử sa thô mộc và dòng nước rót ngắt nước dứt khoát không rớt giọt.
   - Form tư vấn may đo khắc thơ và gia huy theo yêu cầu của trà nhân.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-65): add SaigonAcousticOudSanctuarySalon, SaigonVolcanicSlateMineralPoolPavilion, and ArtisanDuanniZishaTeapotAtelier with 100% SEO pass'
`;

async function dispatchSprint65() {
  console.log(`[Master Orchestrator] Dispatching Sprint 65 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-63-sprint-65-oud-mineralpool-zisha',
    title: 'Phòng Đàn Oud Hoàng Đàn, Hồ Khoáng Núi Lửa Nước Mặn & Ấm Tử Sa Đoạn Nê',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 65 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_65_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint65();
