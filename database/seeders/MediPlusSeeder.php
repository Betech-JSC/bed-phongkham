<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServicePillar;
use App\Models\Service;
use App\Models\Article;
use App\Models\SiteSetting;
use App\Models\Appointment;
use App\Models\PatientVital;
use App\Models\Author;
use App\Models\Review;
use App\Models\Banner;
use App\Models\Doctor;
use App\Models\DoctorSchedule;
use App\Models\Faq;
use App\Models\TreatmentResult;
use App\Models\Policy;
use App\Models\MediaFile;

class MediPlusSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Site Settings
        $settings = [
            'clinic_name' => 'Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi',
            'hotline_1' => '038 432 6785',
            'hotline_1_clean' => '0384326785',
            'hotline_2' => '0328 699 799',
            'hotline_2_clean' => '0328699799',
            'zalo_link' => 'https://zalo.me/0384326785',
            'email' => 'doankhoiclinic@gmail.com',
            'address' => '348 Nguyễn Lương Bằng, Lê Thanh Nghị, Hải Phòng',
            'working_hours' => 'Sáng: 07:30 – 11:30 | Chiều: 13:30 – 18:30 (Thứ 2 - Chủ Nhật)',
            'hero_banner' => '/assets/heart_care.png',
            'tagline' => 'Trái tim bình an – Muôn vàn hạnh phúc',
        ];

        foreach ($settings as $key => $val) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $val]);
        }

        // 2. Pillars & Services
        $pillar1 = ServicePillar::firstOrCreate(
            ['title' => 'Trụ cột I: Tầm soát & Phát hiện sớm'],
            [
                'tagline' => 'Phòng ngừa biến chứng',
                'description' => 'Phát hiện sớm bệnh tim mạch và các yếu tố nguy cơ trước khi có biến chứng lâm sàng xảy ra.',
                'icon_name' => 'Search',
                'order' => 1,
            ]
        );

        $servicesP1 = [
            [
                'slug' => 'kham-tim-mach-tong-quat',
                'title' => 'Khám tim mạch tổng quát',
                'pillar_title' => 'Tầm soát & Phát hiện sớm',
                'tagline' => 'Đánh giá sức khỏe trái tim toàn diện',
                'description' => 'Khám lâm sàng toàn diện kết hợp đo đạc các chỉ số sinh hóa cơ bản và hình ảnh học tim mạch.',
                'detailed_description' => "Gói khám tim mạch tổng quát tại MediPlus HP cung cấp giải pháp tầm soát toàn diện nhất cho hệ tuần hoàn của bạn.",
                'includes' => ['Khám chuyên khoa Tim mạch', 'Đo ECG 12 đầu cần', 'Siêu âm tim Doppler màu', 'Xét nghiệm mỡ máu'],
                'candidates' => ['Người từ 35 tuổi trở lên', 'Người chưa khám bao giờ', 'Bệnh nhân có bệnh nền'],
                'price' => '500.000 VNĐ - 1.200.000 VNĐ',
                'estimated_time' => '60 - 90 phút',
                'is_featured' => true,
            ],
            [
                'slug' => 'tam-soat-tang-huyet-ap',
                'title' => 'Tầm soát tăng huyết áp',
                'pillar_title' => 'Tầm soát & Phát hiện sớm',
                'tagline' => 'Phát hiện sớm kẻ giết người thầm lặng',
                'description' => 'Đánh giá chi tiết các chỉ số huyết áp để xác định tình trạng huyết áp dao động hoặc tăng huyết áp ẩn giấu.',
                'detailed_description' => "Tăng huyết áp được mệnh danh là kẻ giết người thầm lặng vì hầu như không có triệu chứng rõ ràng.",
                'includes' => ['Khám lâm sàng tim mạch', 'Đo huyết áp chuẩn', 'Đo ECG 12 kênh'],
                'candidates' => ['Người có huyết áp dao động', 'Người trên 40 tuổi'],
                'price' => '350.000 VNĐ',
                'estimated_time' => '45 phút',
                'is_featured' => false,
            ]
        ];

        foreach ($servicesP1 as $srv) {
            Service::updateOrCreate(['slug' => $srv['slug']], array_merge($srv, ['service_pillar_id' => $pillar1->id]));
        }

        // 3. Authors
        Author::firstOrCreate(
            ['name' => 'BSCKII Đoàn Khôi'],
            [
                'title' => 'Chuyên khoa II Tim mạch - Trưởng phòng khám',
                'avatar' => '/assets/doctor.png',
                'bio' => 'Hơn 25 năm kinh nghiệm chẩn đoán và điều trị bệnh lý tim mạch, huyết áp tại Hải Phòng.'
            ]
        );
        Author::firstOrCreate(
            ['name' => 'ThS.BS Nguyễn Văn An'],
            [
                'title' => 'Chuyên gia Siêu âm Tim & Mạch máu',
                'avatar' => '/assets/doctor.png',
                'bio' => 'Chuyên gia siêu âm tim Doppler màu và chẩn đoán xơ vữa động mạch.'
            ]
        );

        // 4. Reviews / Patient Testimonials
        Review::firstOrCreate(
            ['patient_name' => 'Bác Trần Văn Hùng (68 tuổi)'],
            [
                'service_name' => 'Tầm soát tăng huyết áp & Holter 24h',
                'rating' => 5,
                'comment' => 'Bác sĩ Khôi khám rất kỹ, giải thích nhẹ nhàng chu đáo. Máy Holter 24h nhỏ gọn không ảnh hưởng sinh hoạt.',
                'is_approved' => true
            ]
        );
        Review::firstOrCreate(
            ['patient_name' => 'Chị Lê Thị Thanh (45 tuổi)'],
            [
                'service_name' => 'Khám tim mạch tổng quát',
                'rating' => 5,
                'comment' => 'Phòng khám sạch đẹp, nhân viên lễ tân nhiệt tình. Kết quả siêu âm tim có ngay sau 15 phút.',
                'is_approved' => true
            ]
        );

        // 5. Banners
        Banner::firstOrCreate(
            ['title' => 'Tầm Soát Tim Mạch Toàn Diện Hải Phòng'],
            [
                'subtitle' => 'Chăm sóc trái tim khỏe mạnh cùng BSCKII Đoàn Khôi',
                'image_url' => '/assets/heart_care.png',
                'link' => '/dich-vu',
                'order' => 1,
                'is_active' => true
            ]
        );

        // 6. Doctors & Schedule
        $doc = Doctor::firstOrCreate(
            ['name' => 'BSCKII Đoàn Khôi'],
            [
                'specialty' => 'Chuyên khoa II Nội Tim mạch',
                'experience' => '25+ Năm kinh nghiệm',
                'avatar' => '/assets/doctor.png',
                'bio' => 'Trưởng khoa Tim mạch uy tín tại Hải Phòng, chuyên môn cao về Tăng huyết áp và Suy tim.',
                'order' => 1
            ]
        );

        DoctorSchedule::firstOrCreate(
            ['doctor_id' => $doc->id, 'day_of_week' => 'Thứ 2 - Thứ 7'],
            [
                'shift' => 'Sáng 07:30 – 11:30 | Chiều 13:30 – 18:30',
                'room' => 'Phòng khám số 1'
            ]
        );

        // 7. FAQs
        Faq::firstOrCreate(
            ['question' => 'Phòng khám có nhận đặt lịch hẹn trước không?'],
            [
                'answer' => 'Có, bệnh nhân có thể đặt lịch hẹn trực tuyến qua website hoặc gọi hotline 038 432 6785 để không phải chờ đợi.',
                'category' => 'Đặt lịch khám',
                'order' => 1
            ]
        );

        // 8. Treatment Results
        TreatmentResult::firstOrCreate(
            ['patient_title' => 'Bệnh nhân Bùi Văn T. (62t) - Kiểm soát huyết áp thành công'],
            [
                'before_image' => '/assets/screening_service.png',
                'after_image' => '/assets/holter_service.png',
                'diagnosis' => 'Tăng huyết áp độ 2 dao động kèm xơ vữa động mạch cảnh nhẹ.',
                'outcome' => 'Sau 3 tháng dùng phác đồ phối hợp liều thấp và Holter theo dõi, huyết áp duy trì 125/80 mmHg ổn định.'
            ]
        );

        // 9. Policies
        Policy::firstOrCreate(
            ['slug' => 'chinh-sach-bao-mat'],
            [
                'title' => 'Chính sách bảo mật thông tin bệnh nhân',
                'content' => 'MediPlus HP cam kết bảo mật tuyệt đối toàn bộ hồ sơ bệnh án và thông tin cá nhân của bệnh nhân theo đúng quy định pháp luật y tế.'
            ]
        );

        // 10. Media Files
        MediaFile::firstOrCreate(
            ['filename' => 'heart_care.png'],
            [
                'url' => '/assets/heart_care.png',
                'file_type' => 'image',
                'file_size' => 1024500
            ]
        );

        // 11. Initial Appointments & Consultation Leads
        Appointment::firstOrCreate(
            ['phone' => '0912345678'],
            [
                'patient_name' => 'Nguyễn Văn Hải',
                'gender' => 'Nam',
                'address' => 'Quận Ngô Quyền, Hải Phòng',
                'notes' => 'Hay bị tăng huyết áp ban đêm, nhức đầu vùng gáy.',
                'doctor_notes' => 'Đã gọi tư vấn, hẹn tái khám đo Holter huyết áp 24h.',
                'service_slug' => 'tam-soat-tang-huyet-ap',
                'status' => 'confirmed',
                'confirmed_at' => now(),
            ]
        );

        Appointment::firstOrCreate(
            ['phone' => '0988776655'],
            [
                'patient_name' => 'Trần Thị Mai',
                'gender' => 'Nữ',
                'address' => 'Huyện An Dương, Hải Phòng',
                'notes' => 'Tư vấn gói khám tim mạch tổng quát cho người cao tuổi (72 tuổi).',
                'status' => 'pending',
            ]
        );

        // 12. Articles (6 Rich Medical Articles)
        $articlesList = [
            [
                'slug' => '5-dau-hieu-canh-bao-tang-huyet-ap-am-thang',
                'title' => '5 Dấu hiệu cảnh báo tăng huyết áp ẩn giấu ít người chú ý',
                'category' => 'Tăng huyết áp',
                'excerpt' => 'Tăng huyết áp được mệnh danh là "kẻ giết người thầm lặng". Nhận biết sớm các triệu chứng thoáng qua như hoa mắt, nặng đầu vùng gáy để phòng ngừa đột quỵ.',
                'content' => '<p>Tăng huyết áp xảy ra khi áp lực máu lên thành động mạch cao hơn mức bình thường. Nhiều người chỉ phát hiện bệnh khi đã xuất hiện biến chứng nguy hiểm như nhồi máu cơ tim hay tai biến mạch máu não.</p><h4>Các dấu hiệu cần lưu ý:</h4><ul><li>Đau nhức đầu vùng chẩm gáy vào sáng sớm.</li><li>Hoa mắt, chóng mặt khi thay đổi tư thế đột ngột.</li><li>Hồi hộp, đánh trống ngực hoặc tức nhẹ ngực trái.</li><li>Mất ngủ kéo dài, ngủ không sâu giấc.</li><li>Chảy máu cam đột ngột không rõ nguyên nhân.</li></ul><p>Khi có các triệu chứng trên, bạn nên đo huyết áp ngay và đến cơ sở y tế chuyên khoa tim mạch để được chẩn đoán chuẩn xác.</p>',
                'image' => '/assets/screening_service.png',
                'author' => 'BSCKII Đoàn Khôi',
                'read_time' => '5 phút đọc',
                'date' => '15/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'huong-dan-do-huyet-ap-tai-nha-chuan-xac',
                'title' => 'Hướng dẫn đọc chỉ số đo huyết áp tại nhà chính xác theo chuẩn Bộ Y Tế',
                'category' => 'Kiến thức Y khoa',
                'excerpt' => 'Tự đo huyết áp tại nhà giúp bác sĩ theo dõi được biến động huyết áp thực tế. Tìm hiểu quy trình đo đúng cách và thời điểm đo tốt nhất trong ngày.',
                'content' => '<p>Đo huyết áp tại nhà đúng kỹ thuật đóng vai trò 50% trong thành công của phác đồ điều trị tăng huyết áp.</p><h4>Quy tắc vàng khi đo huyết áp:</h4><ol><li>Nghỉ ngơi thả lỏng ít nhất 5-10 phút trước khi đo.</li><li>Không uống cà phê, trà đậm hoặc hút thuốc lá trước khi đo 30 phút.</li><li>Tựa lưng vào ghế, đặt tay ngang tầm tim.</li><li>Đo 2 lần liên tiếp cách nhau 1-2 phút và lấy giá trị trung bình.</li></ol>',
                'image' => '/assets/telehealth_service.png',
                'author' => 'BSCKII Đoàn Khôi',
                'read_time' => '4 phút đọc',
                'date' => '18/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'holter-huyet-ap-24-gio-la-gi',
                'title' => 'Holter huyết áp 24 giờ là gì và khi nào bệnh nhân tim mạch cần thực hiện?',
                'category' => 'Chẩn đoán hình ảnh',
                'excerpt' => 'Phương pháp theo dõi huyết áp liên tục 24h giúp phát hiện hiện tượng "Tăng huyết áp áo korotkoff (áo bàng trắng)" và tăng huyết áp ẩn giấu ban đêm.',
                'content' => '<p>Holter huyết áp là thiết bị đo huyết áp tự động đeo trên người trong vòng 24 giờ, giúp ghi lại biểu đồ huyết áp cả lúc làm việc lẫn khi ngủ đêm.</p><p>Kỹ thuật này cực kỳ quan trọng đối với các bệnh nhân nghi ngờ huyết áp áo bàng trắng hoặc huyết áp tăng vọt vào rạng sáng.</p>',
                'image' => '/assets/holter_service.png',
                'author' => 'ThS.BS Nguyễn Văn An',
                'read_time' => '6 phút đọc',
                'date' => '19/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'che-do-an-dash-cho-nguoi-benh-cao-huyet-ap',
                'title' => 'Chế độ ăn DASH cho người bệnh cao huyết áp: Thực đơn khoa học giảm áp lực mạch máu',
                'category' => 'Dinh dưỡng & Lối sống',
                'excerpt' => 'DASH (Dietary Approaches to Stop Hypertension) là chế độ ăn uống được chứng minh lâm sàng giúp hạ huyết áp tự nhiên mà không cần tăng liều thuốc.',
                'content' => '<p>Chế độ ăn DASH chú trọng thực phẩm giàu kali, canxi, magie và chất xơ, đồng thời cắt giảm muối natri xuống dưới 2.000 mg/ngày.</p><h4>Thực phẩm khuyến khích:</h4><ul><li>Rau xanh đậm (rau bina, cải kale).</li><li>Trái cây tươi (chuối, táo, cam).</li><li>Hạt ngũ cốc nguyên cám và cá biển giàu Omega-3.</li></ul>',
                'image' => '/assets/heart_care.png',
                'author' => 'BSCKII Đoàn Khôi',
                'read_time' => '7 phút đọc',
                'date' => '20/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'dau-nguc-trai-khi-nao-can-di-kham-ngay',
                'title' => 'Đau ngực trái khi nào cần đi khám tim mạch và xử trí cấp cứu ngay lập tức?',
                'category' => 'Cấp cứu tim mạch',
                'excerpt' => 'Phân biệt đau ngực do cơ xương khớp và đau thắt ngực do thiếu máu cơ tim / nhồi máu cơ tim. Đừng bỏ qua giờ vàng cấp cứu.',
                'content' => '<p>Đau thắt ngực là triệu chứng điển hình của bệnh lý mạch vành. Đau thường có cảm giác như bị đá nặng đè lên ngực, lan ra vai trái hoặc hàm dưới.</p>',
                'image' => '/assets/screening_service.png',
                'author' => 'BSCKII Đoàn Khôi',
                'read_time' => '5 phút đọc',
                'date' => '21/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'nhung-luu-y-khi-dung-thuoc-huyet-ap',
                'title' => 'Những lưu ý quan trọng khi sử dụng thuốc huyết áp hàng ngày bạn tuyệt đối không được quên',
                'category' => 'Dược phẩm & Điều trị',
                'excerpt' => 'Tuyệt đối không tự ý dừng thuốc khi thấy huyết áp trở về bình thường. Tìm hiểu lý do vì sao phải uống thuốc huyết áp đều đặn đúng giờ.',
                'content' => '<p>Thuốc điều trị tăng huyết áp giúp duy trì áp lực máu ổn định. Dừng thuốc đột ngột có thể gây ra hiện tượng huyết áp bật nảy (rebound hypertension) dẫn đến đột quỵ.</p>',
                'image' => '/assets/telehealth_service.png',
                'author' => 'ThS.BS Nguyễn Văn An',
                'read_time' => '5 phút đọc',
                'date' => '21/07/2026',
                'is_published' => true,
            ],
        ];

        foreach ($articlesList as $art) {
            Article::updateOrCreate(['slug' => $art['slug']], $art);
        }
    }
}
