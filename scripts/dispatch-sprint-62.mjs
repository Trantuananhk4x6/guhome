import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_62_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 62: PHÒNG THÍNH ÂM ĐÀN CLAVECIN BAROQUE, VÁCH THÁC ĐÁ ONYX XUYÊN SÁNG & HỘP TRANG SỨC HOÀNG ĐÀN KHẢM ỐC]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi kiệt tác không gian đỉnh cao với Sprint 62:
"PHÒNG THÍNH ÂM ĐÀN CLAVECIN BAROQUE, VÁCH THÁC ĐÁ ONYX XUYÊN SÁNG & HỘP TRANG SỨC HOÀNG ĐÀN KHẢM ỐC"

Mục tiêu cốt lõi: Thiết kế không gian thính phòng đàn Clavecin Baroque cổ điển chuẩn âm học RT60 = 0.34s; chế tác hệ vách thác nước đá ngọc Onyx vàng mật ong xuyên sáng LED ma trận; và chế tác hộp trang sức gỗ Hoàng Đàn Lạng Sơn khảm ốc xà cừ đỏ Singapore 7 màu khóa cơ mật mã.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍNH ÂM ĐÀN CLAVECIN BAROQUE (SaigonAcousticHarpsichordSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticHarpsichordSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Hưởng Hoàng Gia Thời Phục Hưng:
   - Đại sảnh âm nhạc tôn vinh cây đàn Clavecin (Harpsichord) phục dựng 2 tầng bàn phím thủ công theo phong cách Pháp thế kỷ 18; soundboard gỗ Vân Sam Val di Fiemme trứ danh; thanh gảy lông quạ tự nhiên cho âm sắc trong trẻo, giòn giã đặc trưng thời kỳ Bach và Vivaldi; hệ vách tán âm gỗ Hồ Đào (Walnut) uốn cong parabol; thời gian vang RT60 = 0.34s; hệ thống kiểm soát vi khí hậu độ ẩm 50% RH ổn định tuyệt đối bảo vệ kết cấu gỗ cổ truyền.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử các trích đoạn Baroque trứ danh: Bach - Well-Tempered Clavier Prelude in C, Rameau - Les Sauvages qua Web Audio API.
   - Trình mô phỏng chuyển đổi giữa 2 tầng bàn phím Upper Manual (8') và Lower Manual (8' + 4' + Lute stop).
   - Điều khiển 3 kịch bản ánh sáng dạ tiệc: Nến Cung Điện Versailles, Ban Mai Sài Gòn, Dạ Khúc Hoàng Gia.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: THÁC NƯỚC VÁCH ĐÁ NGỌC ONYX XUYÊN SÁNG (SaigonTranslucentOnyxWaterfallSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonTranslucentOnyxWaterfallSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Dòng Nước Tinh Khiết Chảy Tràn Trên Ngọc Tự Nhiên:
   - Phiến đá ngọc Onyx vàng mật ong tự nhiên nguyên khối nhập khẩu từ Iran (2.8m x 1.6m x 30mm) với vân mây uốn lượn; hệ thống LED ma trận đồng nhất 2700K với CRI 98 hắt xuyên qua cấu trúc tinh thể đá ngọc; màng nước mỏng chảy tuần hoàn liên tục trên bề mặt đá tạo hiệu ứng lấp lánh như ngọc phát quang; thanh lọc bụi mịn PM2.5, bổ sung vi khí hậu mát lành giảm 3-4°C; độ ồn róc rách dịu êm < 18 dBA.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ điều chỉnh độ sáng quang phổ xuyên sáng đá ngọc (0% - 100%) và nhiệt độ màu (2200K nến ấm đến 3500K ngọc sáng).
   - Bộ chuyển đổi 3 tốc độ dòng chảy: Giọt Sương Chảy Chậm, Màn Nước Tơ Lụa, Suối Nguồn Sôi Động.
   - Thước đo chất lượng vi khí hậu không khí và tiếng nước thanh tịnh qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: HỘP TRANG SỨC GỖ HOÀNG ĐÀN KHẢM ỐC XÀ CỪ ĐỎ (ArtisanMotherOfPearlJewelryCasketAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanMotherOfPearlJewelryCasketAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Quốc Mộc Hoàng Đàn - Báu Vật Gia Bảo Trường Tồn:
   - Hộp trang sức chế tác từ gỗ Hoàng Đàn tuyết Lạng Sơn nguyên khối tỏa hương thơm trầm ấm quý phái; nghệ nhân làng nghề Chuyên Mỹ cẩn ốc xà cừ đỏ Singapore 7 màu phát quang ánh ngũ sắc với tích "Vinh Quy Bái Tổ" và "Liên Hoa Cát Tường"; bản lề và tay nắm đồng thau đúc thủ công mạ vàng 24K; cơ cấu khóa mật mã 3 bánh răng đồng cơ khí bí mật không dùng pin; nội thất lót nhung tơ tằm dệt thủ công làng Vạn Phúc (\`GU-JEWEL-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính lúp soi cận cảnh 16x chiêm ngưỡng lớp ốc xà cừ đỏ Singapore tán sắc theo góc ánh sáng.
   - Trình mô phỏng vặn vòng xoay mật mã đồng cơ khí 3 chữ số để mở khóa nắp hộp phát tiếng "click" cơ khí êm ái.
   - Form may đo cá nhân hóa: Lựa chọn tích khảm, khắc tên chủ nhân và ấn triện gia tộc mạ vàng quỳ.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-62): add SaigonAcousticHarpsichordSanctuarySalon, SaigonTranslucentOnyxWaterfallSanctuary, and ArtisanMotherOfPearlJewelryCasketAtelier with 100% SEO pass'
`;

async function dispatchSprint62() {
  console.log(`[Master Orchestrator] Dispatching Sprint 62 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-60-sprint-62-harpsichord-onyxwaterfall-jewelrycasket',
    title: 'Phòng Clavecin Baroque, Thác Đá Onyx Xuyên Sáng & Hộp Trang Sức Hoàng Đàn Khảm Ốc',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 62 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_62_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint62();
