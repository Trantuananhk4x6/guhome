import { spawn } from 'node:child_process'

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'

const SPRINT_9_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 9: 360° SPATIAL VIRTUAL TOUR, SENSORY SOUNDSCAPE & SAIGON DISTRICT REAL ESTATE HUBS]
Kiến trúc sư trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator nồng nhiệt chúc mừng bạn! Sprint 8 vừa được hoàn thành xuất sắc với:
- 11 files tối ưu hoá, commit 85093d3 trên nhánh enhaceta.
- Bộ lọc đa chiều Lookbook 2026 & Vi khí hậu tích hợp nhịp nhàng.
- Bản vẽ công năng tương tác Blueprint Section & Lightbox mượt mà tuyệt đối.
- Local Entity SEO Schema với toạ độ vệ tinh chính xác từng phân khu TP.HCM.
- 100% routes và 148 static & dynamic pages pass tuyệt đối!

TIẾP TỤC ĐẠT ĐỈNH CAO MỚI XUYÊN ĐÊM - SPRINT 9: "ĐÁNH THỨC TOÀN BỘ GIÁC QUAN & VỊ THẾ BẤT ĐỘNG SẢN SÀI GÒN"

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: TRẢI NGHIỆM VIRTUAL TOUR 360° KHÔNG GIAN BẢN ĐỒNG (SPATIAL PANORAMA VIEWER)
----------------------------------------------------------------------
Xây dựng component \`src/components/projects/SpatialPanoramaViewer.tsx\` và tích hợp vào trang chi tiết công trình \`src/app/(site)/projects/[slug]/page.tsx\`:
1. Giao diện xem panorama 360° tương tác:
   - Cho phép người xem xoay góc nhìn 360 độ (chuột kéo thả / chạm vuốt trên mobile) bằng CSS 3D hoặc HTML5 Canvas.
   - Hỗ trợ chế độ Fullscreen, điều khiển thu phóng (Zoom In/Out) và tự động xoay chậm nhẹ nhàng (Auto-orbit 0.5rpm).
2. Các điểm chạm xúc giác không gian (Spatial Tactile Hotspots):
   - Đặt các chấm tròn phát xung nhẹ (pulse marker) trên các chi tiết nội thất tiêu biểu (đảo bếp Travertine, sofa da thuộc thảo mộc, hệ lam gỗ xoay chống nắng, hệ đèn rãnh âm trần 2700K).
   - Khi gia chủ nhấp vào hotspot, hiển thị popover thông tin chi tiết về chất liệu và kỹ thuật may đo của xưởng GuHomes.
3. Nút kích hoạt tinh tế:
   - Đặt nút "Trải nghiệm không gian 360°" (360° Spatial Tour) tại hero hoặc dải tác vụ của trang chi tiết dự án.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỘ PHÁT ÂM THANH XÚC GIÁC NỘI THẤT (QUIET LUXURY SENSORY SOUNDSCAPE)
----------------------------------------------------------------------
Xây dựng component \`src/components/ui/SensorySoundscape.tsx\` và tích hợp vào thanh điều hướng / dock nổi toàn site:
1. Triết lý trải nghiệm: Quiet Luxury không chỉ nhìn bằng mắt mà còn cảm nhận bằng thính giác.
2. 3 Không gian âm học đặc trưng:
   - "Tiếng Mộc May Đo": Tiếng bào gỗ, đục gỗ thủ công nhịp nhàng trầm ấm tại xưởng Thạnh Xuân.
   - "Mưa Nhiệt Đới Thảo Điền": Tiếng mưa rơi tí tách trên rặng chuối cảnh và ban công xanh.
   - "Gió Đối Lưu Sông Sài Gòn": Tiếng gió sông luồn qua hệ lam thông gió đối lưu êm đềm.
3. Kỹ thuật chế tác âm thanh thuần Web Audio API:
   - Tạo âm thanh môi trường thư thái bằng các bộ lọc tần số (BiquadFilter, Pink/Brown Noise Generator, Resonance Filter) hoàn toàn KHÔNG CẦN file MP3 nặng nề, tải ngay tức thì 0ms, không tốn băng thông mạng.
   - Có nút bật/tắt (Mute / Unmute), thanh điều chỉnh âm lượng nhỏ dịu nhẹ (volume 20%), tự động dừng khi chuyển tab (VisibilityChange).

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: CỔNG THÔNG TIN BẤT ĐỘNG SẢN & KIẾN TRÚC THEO KHU VỰC SÀI GÒN (/khu-vuc)
----------------------------------------------------------------------
Xây dựng trang danh mục khu vực \`src/app/(site)/khu-vuc/page.tsx\` và trang chi tiết \`src/app/(site)/khu-vuc/[slug]/page.tsx\`:
1. 4 Trung tâm bất động sản hạng sang:
   - \`/khu-vuc/thu-thiem\`: Bán đảo Thủ Thiêm (The Metropole, Empire City, The River) - Thách thức phản xạ nhiệt mặt nước & giải pháp cản bức xạ kính low-e.
   - \`/khu-vuc/thao-dien\`: Bán đảo Thảo Điền (D'Edge, Holm Villas, Q2) - Thách thức độ ẩm sông 85% & giải pháp gỗ teak chống ẩm xưởng mộc.
   - \`/khu-vuc/phu-my-hung\`: Nam Sài Gòn (Chateau, Midtown, Biệt thự cảnh quan) - Thách thức hướng đón gió Nam & giải pháp giếng trời đối lưu.
   - \`/khu-vuc/ba-son\`: Trung tâm Quận 1 ven sông (Grand Marina Saigon) - Thách thức tiếng ồn đô thị & tường vôi Calce tiêu âm.
2. Tích hợp danh sách công trình thực tế của GuHomes thuộc từng khu vực, bảng thông số vi khí hậu đặc thù, toạ độ GPS vệ tinh và Schema SEO địa phương hoàn chỉnh (\`LocalBusiness\`, \`Place\`, \`FAQPage\`).

----------------------------------------------------------------------
ĐIỀU PHỐI MULTI-AGENT & QUY CHUẨN THỰC THI:
----------------------------------------------------------------------
- Tiếp tục tận dụng hoặc triệu hồi subagent chuyên môn (ví dụ \`spatial_ux_engineer\`, \`local_seo_architect\`) để song song hoá công việc.
- Chạy \`npx tsc --noEmit\` đảm bảo 0 lỗi.
- Chạy kiểm thử tự động \`npx tsx scripts/test-routes-seo.ts\` (cập nhật danh sách kiểm tra thêm \`/khu-vuc\`).
- Biên dịch sản xuất \`npm run build\` đạt mã thoát 0.
- Commit git rõ ràng, chuẩn mực trên nhánh \`enhaceta\`.
- Sau khi xong, tự động kiểm tra chỉ thị tiếp theo từ Master Orchestrator, giữ guồng máy làm việc không ngừng nghỉ!`

async function main() {
  console.log(`Đang phát lệnh Sprint 9 tới Agent ${TARGET_ID}...`)
  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'agentapi',
    'send-message',
    '--title=Master Directive Sprint 9 - 360 Virtual Tour, Sensory Soundscape and Saigon District Hubs',
    TARGET_ID,
    SPRINT_9_DIRECTIVE
  ], {
    windowsHide: true,
    shell: false
  })

  proc.stdout.on('data', (d) => process.stdout.write(d.toString()))
  proc.stderr.on('data', (d) => process.stderr.write(d.toString()))

  proc.on('close', (code) => {
    console.log(`\nLệnh Sprint 9 đã được gửi thành công tới Agent ${TARGET_ID} (exit code: ${code})`)
  })
}

main().catch(console.error)
