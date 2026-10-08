import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_64_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 64: PHÒNG HÒA ÂM ACCORDION & HỘP NHẠC THỤY SĨ, SÂN TRONG TÙNG LA HÁN & BÌNH HÍT TRẦM BẠC ĐỒNG XÂM]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 64:
"PHÒNG HÒA ÂM ACCORDION & HỘP NHẠC THỤY SĨ, SÂN TRONG TÙNG LA HÁN & BÌNH HÍT TRẦM BẠC ĐỒNG XÂM"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn Accordion thủ công và hộp nhạc cơ khí Reuge Thụy Sĩ vòm gỗ Óc Chó RT60 = 0.35s; kiến tạo sân trong giếng trời 14m tùng La Hán nghìn năm trên bệ đá san hô tự nhiên; và chế tác bộ bình hít bột trầm Kỳ Nam sừng kết hợp bạc 999 chạm lộng Đồng Xâm.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ACCORDION & HỘP NHẠC CƠ KHÍ (SaigonAcousticAccordionAndMusicBoxSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticAccordionAndMusicBoxSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Nhịp Thở Cơ Khí & Giai Điệu Hoài Niệm:
   - Đại thính phòng âm nhạc tôn vinh cây đàn Accordion thủ công Castelfidardo với hộp gió da cừu tự nhiên và lưỡi gà đồng phosphor; phối hợp cùng hộp nhạc cơ khí 72 nốt chế tác tại Sainte-Croix (Thụy Sĩ) ru êm tâm trí; hệ vách tán âm gỗ Óc Chó (American Walnut) vát rãnh âm học; thời gian vang RT60 = 0.35s; tủ kính vi khí hậu 50% RH & 21°C bảo vệ lớp da và keo hữu cơ truyền thống.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử các trích đoạn hoài niệm: Valse d'Amélie, Libertango, Canon in D qua Web Audio API.
   - Bộ điều khiển tương tác mô phỏng hộp gió đàn Accordion co giãn và hộp nhạc cơ khí lên dây cót.
   - Điều khiển 3 kịch bản ánh sáng dạ khúc Paris cổ điển.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: SÂN TRONG TÙNG LA HÁN & GIẾNG TRỜI 14M (SaigonSunkenBonsaiAtriumSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonSunkenBonsaiAtriumSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Cây Di Sản Trầm Tích Giữa Tâm Biệt Thự:
   - Sân trong giếng trời thông tầng 14m đón gió mát sông Sài Gòn; cây tùng La Hán (Podocarpus Macrophyllus) 150 năm tuổi thế "Trực Quân Tử" ngự trên bệ đá trầm tích tự nhiên; lớp phủ rêu nhung xanh mướt; hệ thống tưới nhỏ giọt tự động cảm biến độ ẩm đất; màng phun sương nano hạ nhiệt 5-6°C tạo vi khí hậu thung lũng mát lành; độ ồn tĩnh lặng < 18 dBA.
2. Tính năng kỹ thuật & UI tương tác:
   - Kính vi mô soi cận cảnh lớp vỏ rêu tùng phong sương và lá kim tùng xanh biếc.
   - Trình mô phỏng luồng gió đối lưu tự nhiên lưu thông qua 14m giếng trời theo hiệu ứng ống khói (Stack Effect).
   - Thưởng thức tiếng gió reo qua tán tùng và tiếng nước nhỏ giọt êm đềm qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ BÌNH HÍT TRẦM KỲ NAM BẠC CHẠM LỘNG (ArtisanPureSilverAgarwoodSnuffBottleAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanPureSilverAgarwoodSnuffBottleAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Hương Đạo Quý Phái & Nghệ Thuật Chạm Bạc Hoàng Cung:
   - Bình hít bột trầm Kỳ Nam chế tác từ sừng tự nhiên nguyên khối bọc bạc ta 999 chạm lộng hoa cúc và tùng hạc bởi nghệ nhân Đồng Xâm; muỗng xúc trầm siêu nhỏ mạ vàng 24K tiện ren kín khí; nắp đậy khảm ngọc bích Jadeite tự nhiên chống thoát hương trầm; hộp đựng gỗ Tử Đàn lót nhung gấm tơ tằm (\`GU-SNUFF-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình xoay 360° bình trầm bạc chạm lộng với ánh sáng phản quang kim hoàn.
   - Kính phóng đại 20x chiêm ngưỡng đường chạm lộng bạc mảnh 0.2mm tinh xảo.
   - Form may đo khắc tên chủ nhân và ấn triện hoàng gia đáy bình.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-64): add SaigonAcousticAccordionAndMusicBoxSanctuary, SaigonSunkenBonsaiAtriumSanctuary, and ArtisanPureSilverAgarwoodSnuffBottleAtelier with 100% SEO pass'
`;

async function dispatchSprint64() {
  console.log(\`[Master Orchestrator] Dispatching Sprint 64 to Agent \${TARGET_ID}...\`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-62-sprint-64-accordion-bonsaiatrium-snuffbottle',
    title: 'Phòng Accordion & Hộp Nhạc Thụy Sĩ, Sân Trong Tùng La Hán & Bình Hít Trầm Bạc',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 64 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_64_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(\`[Master Orchestrator] Language server send-message exited with code: \${code}\`);
  });
}

dispatchSprint64();
