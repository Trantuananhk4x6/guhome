import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_66_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 66: PHÒNG HÒA ÂM ĐÀN KLONG PÚT TRE LỒ Ô, VƯỜN SKY JUNGLE BIOFILTER & BỘ RƯỢU CẦN KHẢM BẠC BAO LA]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 66:
"PHÒNG HÒA ÂM ĐÀN KLONG PÚT TRE LỒ Ô, VƯỜN SKY JUNGLE BIOFILTER & BỘ RƯỢU CẦN KHẢM BẠC BAO LA"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn Krông Pút & đàn Môi tre lồ ô Tây Nguyên vòm tán âm vỏ cây tự nhiên RT60 = 0.36s; kiến tạo vườn kiểng lá thông tầng Sky Jungle với hệ thống lọc khí Biofilter rễ cây; và chế tác bộ bình rượu cần mây tre đan Bao La khảm bạc 999 độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN KLONG PÚT TRE LỒ Ô (SaigonAcousticKlongPutSanctuaryPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticKlongPutSanctuaryPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Tiếng Gió Rừng Xa - Vỗ Khí Thành Thanh:
   - Thính phòng âm nhạc tôn vinh đàn Krông Pút độc bản làm từ ống tre lồ ô đại ngàn Tây Nguyên (chiều dài 60cm - 180cm); âm thanh phát ra từ lực ép luồng khí hai lòng bàn tay vỗ trước miệng ống không chạm thân tre; hệ vách tán âm ốp gỗ Sa Mộc vát góc hữu cơ; RT60 = 0.36s; tủ kính bảo quản 60% RH & 22°C chống nứt vỡ thành tre nhiệt đới.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình vỗ khí thử âm thanh Krông Pút qua Web Audio API với âm sắc trầm ấm mộc mạc như tiếng suối ngàn.
   - Trình điều chỉnh 7 ống tre mô phỏng thang âm cồng chiêng Tây Nguyên.
   - 3 kịch bản ánh sáng lửa trại đêm trăng đại ngàn (2200K, 2400K, 2800K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: VƯỜN THÔNG TẦNG SKY JUNGLE BIOFILTER (SaigonSkyJungleBiofilterConservatory.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonSkyJungleBiofilterConservatory.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Rừng Nhiệt Đới Trên Mây & Thanh Lọc Sinh Học:
   - Khu vườn kiểng lá nhiệt đới thông tầng penthouse 7.5m; hệ thống tường xanh Biofilter hút khí cưỡng bức qua tầng rễ cây biểu sinh thanh lọc 99.4% VOCs và bụi mịn PM2.5; suối nước chảy tuần hoàn qua phiến đá cuội suối tự nhiên; hệ đèn LED Full Spectrum CRI 99 giả lập ánh sáng bình minh đến hoàng hôn; làm mát thụ động hạ nhiệt 4.5°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ đo chất lượng không khí trong nhà (AQI, Formaldehyde, CO2) thời gian thực.
   - Trình lắng nghe tiếng suối reo và chim hót trong trẻo qua Web Audio API.
   - Form tư vấn may đo hệ tường sinh thái Biophilic cho dinh thự và căn hộ thông tầng.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ BÌNH RƯỢU CẦN MÂY TRE KHẢM BẠC BAO LA (ArtisanRattanSilverWineSetVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanRattanSilverWineSetVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Giao Hòa Đất Trời & Nghệ Thuật Đan Lát Cung Đình:
   - Bộ bình rượu cần gốm sành nung củi bọc mây tre đan mắt cáo nghệ nhân Bao La (Huế), viền cổ bọc bạc 999 chạm lộng hoa văn rồng mây; cần trúc siêu mảnh uốn cong bằng nhiệt; khay gỗ Gụ lau ghép mộng âm dương không đinh sắt; chứng thư may đo gia tộc độc bản (\`GU-RATTAN-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình xoay 360° quan sát từng nút đan mây tre tinh vi và đường chỉ bạc chạm lộng.
   - Kính phóng đại 20x soi chi tiết mối đan mắt cáo cổ truyền.
   - Form may đo khắc tên chủ nhân và ấn triện gia tộc.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-66): add SaigonAcousticKlongPutSanctuaryPavilion, SaigonSkyJungleBiofilterConservatory, and ArtisanRattanSilverWineSetVault with 100% SEO pass'
`;

async function dispatchSprint66() {
  console.log(`[Master Orchestrator] Dispatching Sprint 66 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-64-sprint-66-klongput-skyjungle-rattanwine',
    title: 'Phòng Đàn Klong Pút Tre Lồ Ô, Vườn Sky Jungle & Bộ Rượu Cần Mây Tre',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 66 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_66_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint66();
