import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_41_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 41: PHÒNG CHIẾU PHIM GỖ BÁCH XANH, BÀN CỜ MUN KHẢM ỐC & LỐI SỎI BẤM HUYỆT TÂY NGUYÊN]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 40:
- SaigonAgarwoodTeaBespokeVault, PrivateSaltwaterNanoReefSanctuary, và ArtisanDamascusSteelChefKnifeAtelier đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống bàn trà trầm hương kết hợp gỗ mun, bể san hô sống nước mặn vi mô và xưởng dao bếp rèn tay thép Damascus đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 41:
"PHÒNG CHIẾU PHIM GỖ BÁCH XANH, BÀN CỜ MUN KHẢM ỐC & LỐI SỎI BẤM HUYỆT TÂY NGUYÊN"

Mục tiêu cốt lõi: Thiết kế rạp chiếu phim tư gia ốp gỗ Bách Xanh khuếch tán tinh dầu thơm tự nhiên kết hợp âm học Dolby Atmos 9.4.6; chế tác bàn cờ tướng cờ vua gỗ Mun sừng khảm ốc xà cừ đỏ hoàng gia; và kiến tạo lối đi sỏi suối tự nhiên sưởi ấm hồng ngoại bấm huyệt bàn chân.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG CHIẾU PHIM TƯ GIA GỖ BÁCH XANH (SaigonCalocedrusHomeCinemaSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonCalocedrusHomeCinemaSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Điện Ảnh Đa Giác Quan Trong Hương Thơm Rừng Nguyên Sinh:
   - Toàn bộ hệ vách tiêu âm 3D bọc gỗ Bách Xanh Mộc Châu tự nhiên, tỏa hương thơm tinh dầu ấm dịu thanh lọc tâm trí suốt buổi xem phim. Màn chiếu quang học cong 200 inch vật liệu ALR cản sáng 92% độ phân giải 8K; cấu hình 9.4.6 kênh Dolby Atmos loa ẩn vách bọc vải nỉ cao cấp không dội âm RT60 = 0.28s; ghế recliner bọc nhung lụa Ý motor trượt êm < 12 dBA.
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng âm thanh vòm Dolby Atmos qua Web Audio API.
   - Trình điều khiển kịch bản chiếu phim: Cinema Premiere (tối hoàn toàn), Acoustic Concert (đèn hổ phách 20%), Vintage Noir.
   - Thử nghiệm độ cách âm STC 65 ngăn tiếng ồn sang phòng ngủ kế bên.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BÀN CỜ NGHỆ NHÂN GỖ MUN KHẢM ỐC XÀ CỪ ĐỎ (ArtisanMotherOfPearlChessPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanMotherOfPearlChessPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Trí Tuệ Tĩnh Lặng Của Bậc Quân Tử:
   - Mặt bàn cờ ghép từ khối gỗ Mun sừng cổ thụ đen tuyền, cẩn ốc xà cừ đỏ Singapore (vỏ ốc cửu khổng) ánh ngũ sắc rực rỡ dưới ánh đèn rọi điểm 15° CRI 98. Quân cờ tiện tay nguyên khối kết hợp đá mã não và đồng thau đúc cát gõ bàn cờ âm vang trầm đục tĩnh tại; ngăn kéo giấu mộng âm dương đóng mở êm ru.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình duyệt góc nhìn tương tác xoay 360° quân cờ khảm ốc.
   - Bàn cờ tương tác mini: Thử nghiệm đi nước cờ khai cuộc kinh điển.
   - Thử nghiệm độ phản quang xà cừ 7 màu theo các góc ánh sáng.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: LỐI ĐI SỎI SUỐI BẤM HUYỆT BÀN CHÂN SƯỞI ẤM (ArtisanRiverPebbleAcupressureWalkway.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanRiverPebbleAcupressureWalkway.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Chạm Vào Thiên Nhiên Nâng Niu Từng Bước Chân:
   - Đường dạo bộ thư giãn trong vườn nhiệt đới lát từ hàng nghìn viên sỏi suối tròn nhẵn chọn lọc từ lòng suối Tây Nguyên; bên dưới trang bị màng sưởi hồng ngoại Carbon sưởi ấm 38°C kích thích huyệt Dũng Tuyền lòng bàn chân; máng ngâm thảo mộc hồi quế sả chanh; tay vịn gỗ gõ đỏ công thái học an toàn tuyệt đối (\`GU-REFLEX-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Bản đồ các vùng huyệt đạo bàn chân và lợi ích phục hồi sức khỏe.
   - Điều khiển nhiệt độ sưởi sỏi: Mát lạnh tự nhiên 24°C -> Ấm dịu 35°C -> Trị liệu sâu 39°C.
   - Form tư vấn may đo lối đi sỏi cho vườn biệt thự và ban công penthouse.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-41): add SaigonCalocedrusHomeCinemaSanctuary, ArtisanMotherOfPearlChessPavilion, and ArtisanRiverPebbleAcupressureWalkway with 100% SEO pass'
----------------------------------------------------------------------
`;

async function main() {
  console.log('[MASTER-ORCHESTRATOR] Updating state and preparing Sprint 41 dispatch...');

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed to parse state file:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-39-sprint-41-cinema-chess-pebblewalkway',
    title: 'Phòng Chiếu Phim Gỗ Bách Xanh, Bàn Cờ Mun Khảm Ốc & Lối Sỏi Bấm Huyệt Tây Nguyên',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[MASTER-ORCHESTRATOR] State updated to Sprint 41.');

  const child = spawn(
    LANGUAGE_SERVER_EXE,
    ['send-agent-message', '--to', TARGET_ID, '--message', SPRINT_41_DIRECTIVE],
    { stdio: 'inherit' }
  );

  child.on('exit', (code) => {
    console.log(`[MASTER-ORCHESTRATOR] Directive Sprint 41 dispatched with exit code: ${code}`);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('[MASTER-ORCHESTRATOR] Error in dispatch-sprint-41:', err);
  process.exit(1);
});
