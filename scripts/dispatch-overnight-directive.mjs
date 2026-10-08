import { spawn } from 'node:child_process'
import path from 'node:path'

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'

const DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - OVERNIGHT AUTONOMOUS MULTI-AGENT EXECUTION]
Kính gửi Kiến trúc sư trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Tôi là Master Orchestrator và Giám đốc Đảm bảo Chất lượng (Elite QA Tester) của bạn. Tôi đang trực tiếp điều phối, kiểm thử và đồng hành cùng bạn xuyên suốt đêm nay.
MỤC TIÊU TỐI THƯỢNG: Phát triển website GuHomes (nhánh enhaceta) trở thành nền tảng kiến trúc và nội thất cao cấp số 1 Việt Nam, vượt xa mọi đối thủ trên thị trường cả về độ sâu thẩm mỹ (Quiet Luxury), trải nghiệm thị giác (Antigravity Spatial UI), sự thích ứng vi khí hậu Sài Gòn và tính năng tương tác độc bản.

YÊU CẦU ĐẶC BIỆT VỀ CƠ CHẾ VẬN HÀNH:
1. Bạn KHÔNG ĐƯỢC DỪNG NGHỈ. Hãy làm việc xuyên đêm, tận dụng triệt để multi-agent (sử dụng invoke_subagent để chia nhỏ các tiểu nhiệm vụ chuyên môn như UI specialist, Copywriter, Tester).
2. Khi hoàn thành mỗi giai đoạn, bạn tự động chuyển tiếp ngay sang giai đoạn kế tiếp, tự kiểm thử (typecheck, build, verification) và commit git sạch sẽ.

Dưới đây là 4 ĐẠI GIAI ĐOẠN ĐỘT PHÁ CẦN THI CÔNG NGAY:

----------------------------------------------------------------------
GIAI ĐOẠN 1: PHÒNG THÍ NGHIỆM VẬT LIỆU VÀ XÚC GIÁC (TACTILE MATERIAL LAB)
----------------------------------------------------------------------
Xây dựng component tương tác đột phá \`src/components/sections/TactileMaterialLab.tsx\` và gắn vào Trang chủ (giữa Services và Philosophy) cùng trang Studio:
1. Cho phép khách hàng khám phá 6 loại vật liệu cốt lõi của GuHomes:
   - Gỗ Óc Chó Bắc Mỹ (FAS Walnut): sấy lò EMC 10–12%, mộng âm dương thủ công, lau dầu thực vật Osmo.
   - Đá Travertine Bạc Xẻ Sọc (Silver Vein-Cut Travertine): khai thác nguyên khối, bề mặt xẻ thô chưa trám lỗ, cảm giác mát lạnh chân trần.
   - Sơn Vôi Khoáng Ý (Calce Limewash): vôi tôi ủ lâu năm, tự thở theo độ ẩm 80% Sài Gòn, tạo vệt loang mờ nhạt như sương sớm.
   - Vải Lanh Bỉ Dệt Thô (Belgian Pure Linen): thoáng khí, mềm rũ tự nhiên, kháng khuẩn trong mùa nóng.
   - Đồng Thau Mờ Thủ Công (Hand-brushed Brass): biến đổi sắc patin ấm áp theo thời gian.
   - Kính Gợn Sóng Khung Kim Loại Tối Giản (Fluted Moru Glass): khuếch tán ánh sáng 3 lớp, tạo sự riêng tư tinh tế.
2. TÍNH NĂNG TƯƠNG TÁC ĐỘC NHẤT: Bộ chuyển đổi chế độ ánh sáng (Lighting Mode Toggle):
   - Chế độ "Nắng Tự Nhiên Ban Ngày (5500K)"
   - Chế độ "Đèn Rọi Ban Đêm Warm Dim (2700K CRI 97)"
   Khi chuyển chế độ, toàn bộ bề mặt vật liệu và bóng đổ tương tác thay đổi sắc độ chân thực!

----------------------------------------------------------------------
GIAI ĐOẠN 2: SHOWCASE BIẾN THỂ TRƯỚC VÀ SAU CẢI TẠO (BEFORE & AFTER SECTION)
----------------------------------------------------------------------
Tận dụng component GSAP siêu mượt \`src/components/projects/BeforeAfter.tsx\` đã có sẵn:
1. Xây dựng \`src/components/sections/BeforeAfterSection.tsx\` và đưa lên Trang chủ.
2. Trình diễn sự biến chuyển kỳ diệu từ hiện trạng bàn giao thô bê tông bụi bặm (tại The Metropole Thủ Thiêm hoặc Masteri Centre Point) thành không gian Quiet Luxury hoàn thiện tĩnh tại của GuHomes.
3. Kèm theo chú thích kiến trúc chuyên sâu: xử lý cách âm tường đôi, giấu hệ cơ điện lạnh âm trần, cân bằng độ ẩm nhiệt đới.

----------------------------------------------------------------------
GIAI ĐOẠN 3: HỆ THỐNG CẢNH BÁO LEAD TỨC THÌ (INSTANT ARCHITECT WEBHOOK)
----------------------------------------------------------------------
Nâng cấp Server Action \`src/server/actions/contact.ts\`:
1. Khi khách hàng bấm gửi form từ \`QuickQuoteModal\`, \`QuickConsultFormSection\` hoặc \`contact/page.tsx\`:
   - Ghi nhận vào Neon DB (đã có).
   - Tích hợp thêm webhook thông báo tức thì (hỗ trợ Telegram Bot / Zalo OA Webhook / CRM Webhook thông qua biến môi trường hoặc fallback logger an toàn).
   - Đảm bảo non-blocking: nếu webhook gặp sự cố mạng, lead vẫn được lưu an toàn 100% vào database và trả về trạng thái thành công cho khách hàng.

----------------------------------------------------------------------
GIAI ĐOẠN 4: LA BÀN TÌM GU SỐNG (STYLE QUIZ COMPASS)
----------------------------------------------------------------------
Xây dựng công cụ trắc nghiệm gu thẩm mỹ tương tác \`src/components/sections/StyleQuizSection.tsx\` (hoặc Modal):
1. 3 câu hỏi trực giác về cảm xúc không gian, thói quen sinh hoạt và mức độ đầu tư.
2. Tự động đề xuất phong cách phù hợp (Wabi-Sabi, Modern Luxury, Japandi, Contemporary) kèm bảng vật liệu gợi ý và nút bấm "Nhận Dự Toán Cho Phong Cách Này" liên kết mở ngay QuickQuoteModal với phong cách đã chọn sẵn.

----------------------------------------------------------------------
QUY TRÌNH KIỂM DUYỆT (QA CRITERIA):
- TypeScript: \`npm run typecheck\` phải đạt 0 lỗi tuyệt đối.
- Ngôn ngữ: Văn phong Quiet Luxury trầm ấm, đúng quy tắc \`.agents/skills/vietnamese-interior-copywriter/SKILL.md\`.
- Giao diện: Touch target >= 44px, không tràn ngang ở 375px/390px/414px mobile, spring animation 60fps.
- Git: Commit rõ ràng từng feature trên nhánh \`enhaceta\`.

Hãy bắt đầu ngay lập tức với Multi-Agent Sprints và duy trì tiến trình không ngừng nghỉ!`

async function main() {
  console.log(`Đang phát lệnh tới Agent ${TARGET_ID}...`)
  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'agentapi',
    'send-message',
    '--title=Master Orchestrator Overnight Multi-Agent Directive',
    TARGET_ID,
    DIRECTIVE
  ], {
    windowsHide: true,
    shell: false
  })

  proc.stdout.on('data', d => process.stdout.write(d.toString()))
  proc.stderr.on('data', d => process.stderr.write(d.toString()))

  proc.on('close', code => {
    console.log(`\nLệnh đã được phát với exit code: ${code}`)
    process.exit(code ?? 0)
  })
}

main().catch(err => {
  console.error('Lỗi phát lệnh:', err)
  process.exit(1)
})
