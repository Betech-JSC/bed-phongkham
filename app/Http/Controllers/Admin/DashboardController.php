<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Appointment;
use App\Models\ServicePillar;
use App\Models\Service;
use App\Models\Article;
use App\Models\SiteSetting;
use App\Models\Author;
use App\Models\Review;
use App\Models\Banner;
use App\Models\Doctor;
use App\Models\DoctorSchedule;
use App\Models\Faq;
use App\Models\TreatmentResult;
use App\Models\Policy;
use App\Models\MediaFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $appointments = Appointment::latest()->get();
        $consultations = Appointment::where('status', 'pending')->latest()->get();
        $articles = Article::latest()->get();
        
        if (Author::count() === 0) {
            $defaultAuthors = [
                [
                    'name' => 'BSCKII Đoàn Khôi',
                    'title' => 'Trưởng Khoa Nội Tim Mạch - Giám Đốc Chuyên Môn',
                    'avatar' => '/assets/doctor_khoi.png',
                    'bio' => 'Gần 20 năm kinh nghiệm thăm khám và điều trị chuyên sâu các bệnh lý tim mạch, tăng huyết áp, suy tim và rối loạn nhịp tim tại Hải Phòng.'
                ],
                [
                    'name' => 'ThS. Bác sĩ Nguyễn Thị Minh Phương',
                    'title' => 'Chuyên gia Tầm soát & Chẩn đoán Hình ảnh Tim mạch',
                    'avatar' => '/assets/doctor_khoi.png',
                    'bio' => 'Hơn 12 năm kinh nghiệm trong lĩnh vực siêu âm tim Doppler màu 4D, Holter điện tim 24h và quản lý bệnh lý mạch máu ngoại vi.'
                ],
                [
                    'name' => 'BSCKI Lê Văn Hoàng',
                    'title' => 'Bác sĩ Chuyên khoa Nội Tổng hợp',
                    'avatar' => '/assets/doctor_khoi.png',
                    'bio' => 'Chuyên gia tư vấn chế độ dinh dưỡng, lối sống phòng ngừa đột quỵ và tầm soát biến chứng đái tháo đường ở bệnh nhân tim mạch.'
                ],
                [
                    'name' => 'Hội Đồng Cố Vấn Y Khoa MediPlus HP',
                    'title' => 'Ban Biên Tập Cẩm Nang Y Tế Chuẩn Quốc Tế',
                    'avatar' => '/assets/logo.png',
                    'bio' => 'Đội ngũ bác sĩ chuyên khoa và dược sĩ lâm sàng kiểm duyệt nội dung cẩm nang chăm sóc sức khỏe tim mạch chuẩn y khoa.'
                ]
            ];
            foreach ($defaultAuthors as $authData) {
                Author::create($authData);
            }
        }
        $authors = Author::latest()->get();

        $pillars = ServicePillar::with('services')->orderBy('order')->get();
        $services = Service::all();

        if (Review::count() === 0) {
            Review::create([
                'patient_name' => 'Bác Trần Văn Hùng (68 tuổi)',
                'service_name' => 'Tầm soát tăng huyết áp & Holter 24h',
                'rating' => 5,
                'comment' => 'Bác sĩ Khôi khám rất kỹ, giải thích nhẹ nhàng chu đáo. Máy Holter 24h nhỏ gọn không ảnh hưởng sinh hoạt.',
                'is_approved' => true,
            ]);
            Review::create([
                'patient_name' => 'Chị Lê Thị Thanh (45 tuổi)',
                'service_name' => 'Khám tim mạch tổng quát',
                'rating' => 5,
                'comment' => 'Phòng khám sạch đẹp, nhân viên lễ tân nhiệt tình. Kết quả siêu âm tim có ngay sau 15 phút.',
                'is_approved' => true,
            ]);
            Review::create([
                'patient_name' => 'Anh Nguyễn Hoàng Nam (38 tuổi)',
                'service_name' => 'Đo điện tâm đồ & Siêu âm tim Doppler',
                'rating' => 4,
                'comment' => 'Dịch vụ nhanh chóng, bác sĩ tư vấn tỉ mỉ về chế độ ăn uống cho người huyết áp cao.',
                'is_approved' => false,
            ]);
            Review::create([
                'patient_name' => 'Cô Phạm Thị Thu (56 tuổi)',
                'service_name' => 'Tư vấn phác đồ điều trị tăng huyết áp',
                'rating' => 5,
                'comment' => 'Thuốc uống rất hợp, huyết áp ổn định từ 160 xuống 120. Cảm ơn bác sĩ Khôi và phòng khám MediPlus.',
                'is_approved' => true,
            ]);
        }
        $reviews = Review::latest()->get();

        if (Banner::count() === 0) {
            Banner::create([
                'eyebrow' => 'Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi',
                'title' => 'Tầm Soát & Điều Trị Bệnh Tim Mạch Toàn Diện',
                'subtitle' => 'Chăm sóc trái tim khỏe mạnh chuẩn Y Khoa Quốc Tế',
                'subheading' => 'Ứng dụng hệ thống máy siêu âm Doppler tim hiện đại, đo Holter điện tâm đồ 24h kết hợp phác đồ điều trị cá nhân hóa.',
                'image_url' => '/assets/heart_care.png',
                'desktop_image' => '/assets/heart_care.png',
                'mobile_image' => '/assets/screening_service.png',
                'link' => '/dich-vu',
                'primary_button_text' => 'Đặt Lịch Khám Ngay',
                'primary_button_link' => '/lien-he',
                'secondary_button_text' => 'Tìm Hiểu Dịch Vụ',
                'secondary_button_link' => '/dich-vu',
                'order' => 1,
                'is_active' => true,
            ]);
            Banner::create([
                'eyebrow' => 'Giải Pháp Y Tế Thông Minh',
                'title' => 'Đo Holter Điện Tâm Đồ & Huyết Áp 24h Tại Nhà',
                'subtitle' => 'Phát hiện sớm cơn loạn nhịp tim thầm lặng và nguy cơ đột quỵ',
                'subheading' => 'Thiết bị nhỏ gọn, đeo thoải mái suốt 24-48 giờ mà không làm ảnh hưởng sinh hoạt thường ngày của bệnh nhân.',
                'image_url' => '/assets/holter_service.png',
                'desktop_image' => '/assets/holter_service.png',
                'mobile_image' => '/assets/telehealth_service.png',
                'link' => '/dich-vu/holter-dien-tim-24h-48h',
                'primary_button_text' => 'Tư Vấn Thiết Bị Holter',
                'primary_button_link' => '/lien-he',
                'secondary_button_text' => 'Xem Quy Trình Khám',
                'secondary_button_link' => '/dich-vu',
                'order' => 2,
                'is_active' => true,
            ]);
        }
        $banners = Banner::orderBy('order')->get();
        $doctors = Doctor::with('schedules')->orderBy('order')->get();
        $schedules = DoctorSchedule::with('doctor')->get();
        if (Faq::count() === 0) {
            Faq::create([
                'question' => 'QUY TRÌNH THĂM KHÁM TẠI KT BEAUTY MEDICAL CENTRE NHƯ THẾ NÀO?',
                'answer' => 'Tất cả khách hàng đến với KT Beauty đều được đón tiếp theo quy trình chuẩn y khoa. Bạn sẽ được Bác sĩ chuyên khoa trực tiếp soi da, tư vấn tình trạng và thiết lập phác đồ điều trị riêng biệt. Trung tâm cam kết tính minh bạch trong chỉ định và sử dụng các sản phẩm chính hãng.',
                'order' => 0,
                'is_active' => true,
            ]);
            Faq::create([
                'question' => 'KT BEAUTY MEDICAL CENTRE CÓ CAM KẾT HIỆU QUẢ ĐIỀU TRỊ KHÔNG?',
                'answer' => 'Chúng tôi luôn cam kết chất lượng điều trị bằng văn bản dựa trên tình trạng lâm sàng thực tế của khách hàng. Tất cả dịch vụ phẫu thuật hay điều trị công nghệ cao đều đi kèm chế độ bảo hành và chăm sóc hậu phẫu chu đáo.',
                'order' => 1,
                'is_active' => true,
            ]);
            Faq::create([
                'question' => 'CÁC CÔNG NGHỆ ĐIỀU TRỊ TẠI TRUNG TÂM CÓ ĐẠT CHUẨN Y KHOA KHÔNG?',
                'answer' => '100% máy móc và công nghệ tại KT Beauty Medical Centre đều được chứng nhận FDA (Hoa Kỳ) và CE (Châu Âu) về tính an toàn và hiệu quả, được chuyển giao chính hãng trực tiếp từ các tập đoàn y tế thẩm mỹ lớn.',
                'order' => 2,
                'is_active' => true,
            ]);
            Faq::create([
                'question' => 'CHI PHÍ CÁC DỊCH VỤ TẠI KT BEAUTY NHƯ THẾ NÀO?',
                'answer' => 'Chi phí được công khai rõ ràng trong quá trình tư vấn và không phát sinh thêm bất kỳ khoản phụ thu nào trong suốt liệu trình. Chúng tôi cũng thường xuyên có các chương trình tri ân và hỗ trợ trả góp 0% lãi suất.',
                'order' => 3,
                'is_active' => true,
            ]);
            Faq::create([
                'question' => 'TÔI CẦN LƯU Ý GÌ SAU KHI THỰC HIỆN DỊCH VỤ?',
                'answer' => 'Sau mỗi dịch vụ, điều dưỡng viên sẽ hướng dẫn chi tiết chế độ ăn uống, sinh hoạt và vệ sinh vùng điều trị. Bạn cũng sẽ nhận được cẩm nang hướng dẫn chăm sóc tại nhà và lịch hẹn tái khám định kỳ miễn phí.',
                'order' => 4,
                'is_active' => true,
            ]);
        }
        $faqs = Faq::orderBy('order')->get();
        $treatmentResults = TreatmentResult::latest()->get();
        $policies = Policy::all();
        $settings = SiteSetting::pluck('value', 'key')->all();

        if (MediaFile::count() === 0) {
            $defaultAssets = [
                ['filename' => 'BSCKII Đoàn Khôi', 'url' => '/assets/doctor_khoi.png', 'file_type' => 'image/png', 'file_size' => '475 KB'],
                ['filename' => 'Chăm Sóc Trái Tim', 'url' => '/assets/heart_care.png', 'file_type' => 'image/png', 'file_size' => '1.8 MB'],
                ['filename' => 'Tầm Soát Tim Mạch', 'url' => '/assets/screening_service.png', 'file_type' => 'image/png', 'file_size' => '663 KB'],
                ['filename' => 'Theo Dõi Huyết Áp', 'url' => '/assets/telehealth_service.png', 'file_type' => 'image/png', 'file_size' => '671 KB'],
                ['filename' => 'Holter 24h', 'url' => '/assets/holter_service.png', 'file_type' => 'image/png', 'file_size' => '624 KB'],
                ['filename' => 'Banner Đặt Lịch', 'url' => '/assets/booking_banner.jpg', 'file_type' => 'image/jpeg', 'file_size' => '807 KB'],
                ['filename' => 'Banner Giới Thiệu', 'url' => '/assets/about_banner.jpg', 'file_type' => 'image/jpeg', 'file_size' => '1.8 MB'],
                ['filename' => 'Banner Tin Tức', 'url' => '/assets/news_banner.jpg', 'file_type' => 'image/jpeg', 'file_size' => '2.0 MB'],
            ];
            foreach ($defaultAssets as $asset) {
                MediaFile::create($asset);
            }
        }
        $mediaFiles = MediaFile::latest()->get();

        $stats = [
            'total_appointments' => $appointments->count(),
            'pending_consultations' => $consultations->count(),
            'total_articles' => $articles->count(),
            'total_doctors' => $doctors->count(),
            'total_reviews' => $reviews->count(),
            'total_faqs' => $faqs->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'appointments' => $appointments,
            'consultations' => $consultations,
            'articles' => $articles,
            'authors' => $authors,
            'pillars' => $pillars,
            'services' => $services,
            'reviews' => $reviews,
            'banners' => $banners,
            'doctors' => $doctors,
            'schedules' => $schedules,
            'faqs' => $faqs,
            'treatmentResults' => $treatmentResults,
            'policies' => $policies,
            'settings' => $settings,
            'mediaFiles' => $mediaFiles,
            'stats' => $stats,
        ]);
    }

    public function storeAppointment(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|string|max:255',
            'facility' => 'nullable|string|max:255',
            'gender' => 'nullable|string',
            'address' => 'nullable|string',
            'service_slug' => 'nullable|string',
            'doctor_name' => 'nullable|string',
            'appointment_date' => 'nullable|string',
            'time_slot' => 'nullable|string',
            'notes' => 'nullable|string',
            'status' => 'required|string|in:pending,confirmed,completed,cancelled',
        ]);

        if ($validated['status'] === 'confirmed') {
            $validated['confirmed_at'] = now();
        }

        // Combine additional fields into notes if not matching table schema
        $extraNotes = [];
        if (!empty($validated['email'])) $extraNotes[] = "Email: " . $validated['email'];
        if (!empty($validated['facility'])) $extraNotes[] = "Cơ sở: " . $validated['facility'];
        if (!empty($validated['doctor_name'])) $extraNotes[] = "Bác sĩ chỉ định: " . $validated['doctor_name'];
        if (!empty($validated['appointment_date'])) $extraNotes[] = "Ngày hẹn: " . $validated['appointment_date'];
        if (!empty($validated['time_slot'])) $extraNotes[] = "Khung giờ: " . $validated['time_slot'];

        if (!empty($extraNotes)) {
            $validated['notes'] = implode(" | ", $extraNotes) . (!empty($validated['notes']) ? "\nGhi chú: " . $validated['notes'] : "");
        }

        Appointment::create([
            'patient_name' => $validated['patient_name'],
            'phone' => $validated['phone'],
            'gender' => $validated['gender'] ?? 'Nam',
            'address' => $validated['address'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'service_slug' => $validated['service_slug'] ?? null,
            'status' => $validated['status'],
            'confirmed_at' => $validated['confirmed_at'] ?? null,
        ]);

        return back()->with('success', 'Đã lưu lịch hẹn mới thành công!');
    }

    public function updateAppointmentStatus(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'patient_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|string|max:255',
            'facility' => 'nullable|string|max:255',
            'doctor_name' => 'nullable|string|max:255',
            'service_slug' => 'nullable|string|max:255',
            'status' => 'required|string|in:pending,confirmed,completed,cancelled',
            'doctor_notes' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $appointment->update(array_filter($validated, fn($v) => !is_null($v)));

        return back()->with('success', 'Đã cập nhật hồ sơ bệnh nhân CRM!');
    }

    public function deleteAppointment(Appointment $appointment)
    {
        $appointment->delete();

        return back()->with('success', 'Đã xóa dữ liệu khách hàng!');
    }

    // --- DOCTORS CRUD ---
    public function storeDoctor(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'required|string|max:255',
            'experience' => 'required|string|max:255',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string',
            'detailed_bio' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        $validated['avatar'] = !empty($validated['avatar']) ? $validated['avatar'] : '/assets/doctor_khoi.png';
        $validated['is_featured'] = $request->boolean('is_featured', true);
        $validated['bio'] = $validated['bio'] ?? '';
        $validated['detailed_bio'] = $validated['detailed_bio'] ?? '';

        Doctor::create($validated);

        return back()->with('success', 'Đã thêm hồ sơ bác sĩ mới thành công!');
    }

    public function updateDoctor(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'required|string|max:255',
            'experience' => 'required|string|max:255',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string',
            'detailed_bio' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        $validated['avatar'] = !empty($validated['avatar']) ? $validated['avatar'] : '/assets/doctor_khoi.png';
        $validated['is_featured'] = $request->boolean('is_featured', true);

        $doctor->update($validated);

        return back()->with('success', 'Đã cập nhật hồ sơ bác sĩ thành công!');
    }

    public function deleteDoctor(Doctor $doctor)
    {
        $doctor->delete();

        return back()->with('success', 'Đã xóa bác sĩ khỏi hệ thống!');
    }

    public function batchUpdateDoctors(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|in:feature,unfeature,delete',
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:doctors,id',
        ]);

        if ($validated['action'] === 'feature') {
            Doctor::whereIn('id', $validated['ids'])->update(['is_featured' => true]);
            $msg = 'Đã bật nổi bật cho ' . count($validated['ids']) . ' bác sĩ!';
        } elseif ($validated['action'] === 'unfeature') {
            Doctor::whereIn('id', $validated['ids'])->update(['is_featured' => false]);
            $msg = 'Đã tắt nổi bật cho ' . count($validated['ids']) . ' bác sĩ!';
        } elseif ($validated['action'] === 'delete') {
            Doctor::whereIn('id', $validated['ids'])->delete();
            $msg = 'Đã xóa hàng loạt ' . count($validated['ids']) . ' bác sĩ!';
        }

        return back()->with('success', $msg);
    }

    // --- TREATMENT RESULTS (KẾT QUẢ THỰC TẾ) CRUD ---
    public function storeTreatmentResult(Request $request)
    {
        $validated = $request->validate([
            'patient_title' => 'required|string|max:255',
            'before_image' => 'nullable|string',
            'after_image' => 'nullable|string',
            'diagnosis' => 'required|string',
            'outcome' => 'required|string',
            'detailed_case' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        $validated['before_image'] = !empty($validated['before_image']) ? $validated['before_image'] : '/assets/screening_service.png';
        $validated['after_image'] = !empty($validated['after_image']) ? $validated['after_image'] : '/assets/telehealth_service.png';
        $validated['is_featured'] = $request->boolean('is_featured', true);
        $validated['detailed_case'] = $validated['detailed_case'] ?? '';

        TreatmentResult::create($validated);

        return back()->with('success', 'Đã thêm ca lâm sàng thực tế mới thành công!');
    }

    public function updateTreatmentResult(Request $request, TreatmentResult $treatmentResult)
    {
        $validated = $request->validate([
            'patient_title' => 'required|string|max:255',
            'before_image' => 'nullable|string',
            'after_image' => 'nullable|string',
            'diagnosis' => 'required|string',
            'outcome' => 'required|string',
            'detailed_case' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        $validated['before_image'] = !empty($validated['before_image']) ? $validated['before_image'] : '/assets/screening_service.png';
        $validated['after_image'] = !empty($validated['after_image']) ? $validated['after_image'] : '/assets/telehealth_service.png';
        $validated['is_featured'] = $request->boolean('is_featured', true);

        $treatmentResult->update($validated);

        return back()->with('success', 'Đã cập nhật ca lâm sàng thực tế thành công!');
    }

    public function deleteTreatmentResult(TreatmentResult $treatmentResult)
    {
        $treatmentResult->delete();

        return back()->with('success', 'Đã xóa ca lâm sàng thực tế!');
    }

    public function batchUpdateTreatmentResults(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|in:feature,unfeature,delete',
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:treatment_results,id',
        ]);

        if ($validated['action'] === 'feature') {
            TreatmentResult::whereIn('id', $validated['ids'])->update(['is_featured' => true]);
            $msg = 'Đã bật nổi bật cho ' . count($validated['ids']) . ' kết quả điều trị!';
        } elseif ($validated['action'] === 'unfeature') {
            TreatmentResult::whereIn('id', $validated['ids'])->update(['is_featured' => false]);
            $msg = 'Đã tắt nổi bật cho ' . count($validated['ids']) . ' kết quả điều trị!';
        } elseif ($validated['action'] === 'delete') {
            TreatmentResult::whereIn('id', $validated['ids'])->delete();
            $msg = 'Đã xóa hàng loạt ' . count($validated['ids']) . ' kết quả điều trị!';
        }

        return back()->with('success', $msg);
    }

    // --- DOCTOR DUTY SCHEDULES (LỊCH TRỰC BÁC SĨ) ---
    public function storeSchedule(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'day_of_week' => 'required|string',
            'start_time' => 'required|string',
            'end_time' => 'required|string',
            'branch' => 'required|string',
        ]);

        $validated['shift'] = $validated['start_time'] . ' - ' . $validated['end_time'];
        $validated['room'] = $validated['branch'];

        DoctorSchedule::create($validated);

        return back()->with('success', 'Đã thêm ca trực mới cho bác sĩ!');
    }

    public function deleteSchedule($id)
    {
        $schedule = DoctorSchedule::findOrFail($id);
        $schedule->delete();

        return back()->with('success', 'Đã xóa ca trực thành công!');
    }

    // --- FAQS ---
    public function storeFaq(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        Faq::create([
            'question' => $validated['question'],
            'answer' => $validated['answer'],
            'order' => (int)($validated['order'] ?? 0),
            'is_active' => isset($validated['is_active']) ? (bool)$validated['is_active'] : true,
        ]);

        return back()->with('success', 'Đã thêm câu hỏi FAQ mới!');
    }

    public function updateFaq(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);

        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $faq->update([
            'question' => $validated['question'],
            'answer' => $validated['answer'],
            'order' => (int)($validated['order'] ?? $faq->order),
            'is_active' => isset($validated['is_active']) ? (bool)$validated['is_active'] : true,
        ]);

        return back()->with('success', 'Đã cập nhật câu hỏi FAQ thành công!');
    }

    public function toggleFaqStatus(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $faq->is_active = !$faq->is_active;
        $faq->save();

        $statusLabel = $faq->is_active ? 'bật hiển thị' : 'tạm ẩn';
        return back()->with('success', "Đã {$statusLabel} câu hỏi FAQ thành công!");
    }

    public function deleteFaq($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return back()->with('success', 'Đã xóa câu hỏi FAQ thành công!');
    }

    public function batchUpdateFaqs(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|in:show,hide,delete',
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:faqs,id',
        ]);

        $action = $validated['action'];
        $ids = $validated['ids'];

        if ($action === 'show') {
            Faq::whereIn('id', $ids)->update(['is_active' => true]);
            $msg = 'Đã bật hiển thị hàng loạt FAQ!';
        } elseif ($action === 'hide') {
            Faq::whereIn('id', $ids)->update(['is_active' => false]);
            $msg = 'Đã tạm ẩn hàng loạt FAQ!';
        } elseif ($action === 'delete') {
            Faq::whereIn('id', $ids)->delete();
            $msg = 'Đã xóa hàng loạt FAQ đã chọn!';
        }

        return back()->with('success', $msg);
    }

    // --- SETTINGS ---
    public function updateSettings(Request $request)
    {
        $settings = $request->input('settings', []);
        foreach ($settings as $key => $val) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $val]);
        }

        return back()->with('success', 'Đã cập nhật cấu hình hệ thống!');
    }

    // --- SERVICES & PILLARS CRUD ---
    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'pillar_title' => 'required|string|max:255',
            'price' => 'required|string|max:100',
            'estimated_time' => 'nullable|string|max:100',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'detailed_description' => 'nullable|string',
            'includes' => 'nullable|array',
            'candidates' => 'nullable|array',
            'image' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        $validated['slug'] = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $pillar = ServicePillar::firstOrCreate(['title' => $validated['pillar_title']]);
        $validated['service_pillar_id'] = $pillar->id;
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['tagline'] = $validated['tagline'] ?? '';
        $validated['description'] = $validated['description'] ?? '';
        $validated['detailed_description'] = $validated['detailed_description'] ?? '';
        $validated['estimated_time'] = $validated['estimated_time'] ?? '60 phút';
        $validated['includes'] = $validated['includes'] ?? [];
        $validated['candidates'] = $validated['candidates'] ?? [];
        $validated['image'] = $validated['image'] ?? '/assets/screening_service.png';

        Service::create($validated);

        return back()->with('success', 'Đã thêm gói dịch vụ y khoa mới thành công!');
    }

    public function updateService(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'pillar_title' => 'required|string|max:255',
            'price' => 'required|string|max:100',
            'estimated_time' => 'nullable|string|max:100',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'detailed_description' => 'nullable|string',
            'includes' => 'nullable|array',
            'candidates' => 'nullable|array',
            'image' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        if (!empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['slug']);
        } elseif ($service->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $pillar = ServicePillar::firstOrCreate(['title' => $validated['pillar_title']]);
        $validated['service_pillar_id'] = $pillar->id;
        $validated['is_featured'] = $request->boolean('is_featured');

        $service->update($validated);

        return back()->with('success', 'Đã cập nhật chi tiết gói dịch vụ y khoa!');
    }

    public function deleteService(Service $service)
    {
        $service->delete();

        return back()->with('success', 'Đã xóa gói dịch vụ y khoa!');
    }

    public function batchUpdateServices(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|in:feature,unfeature,delete',
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:services,id',
        ]);

        if ($validated['action'] === 'feature') {
            Service::whereIn('id', $validated['ids'])->update(['is_featured' => true]);
            $msg = 'Đã bật trạng thái Nổi bật cho ' . count($validated['ids']) . ' dịch vụ!';
        } elseif ($validated['action'] === 'unfeature') {
            Service::whereIn('id', $validated['ids'])->update(['is_featured' => false]);
            $msg = 'Đã tắt trạng thái Nổi bật cho ' . count($validated['ids']) . ' dịch vụ!';
        } elseif ($validated['action'] === 'delete') {
            Service::whereIn('id', $validated['ids'])->delete();
            $msg = 'Đã xóa hàng loạt ' . count($validated['ids']) . ' dịch vụ!';
        }

        return back()->with('success', $msg);
    }

    public function storePillar(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        ServicePillar::create($validated);

        return back()->with('success', 'Đã tạo mới nhóm trụ cột dịch vụ!');
    }

    // --- ARTICLES BLOG CRUD ---
    public function createArticle(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'read_time' => 'nullable|string|max:50',
            'image' => 'nullable|string',
            'date' => 'nullable|string',
            'is_published' => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();
        $validated['date'] = $validated['date'] ?? now()->format('d/m/Y');
        $validated['image'] = $validated['image'] ?? '/assets/screening_service.png';
        $validated['read_time'] = $validated['read_time'] ?? '5 phút đọc';
        $validated['is_published'] = $request->boolean('is_published', true);

        Article::create($validated);

        return back()->with('success', 'Đã xuất bản bài viết cẩm nang y khoa mới!');
    }

    public function updateArticle(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'read_time' => 'nullable|string|max:50',
            'image' => 'nullable|string',
            'date' => 'nullable|string',
            'is_published' => 'nullable|boolean',
        ]);

        if ($article->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        $validated['is_published'] = $request->boolean('is_published', true);

        $article->update($validated);

        return back()->with('success', 'Đã cập nhật bài viết y khoa thành công!');
    }

    public function deleteArticle(Article $article)
    {
        $article->delete();

        return back()->with('success', 'Đã xóa bài viết cẩm nang y khoa!');
    }

    public function uploadMedia(Request $request)
    {
        $request->validate([
            'files.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:10240',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:10240',
        ]);

        $uploadedFiles = [];
        $files = $request->file('files') ?? ($request->hasFile('file') ? [$request->file('file')] : []);

        try {
            foreach ($files as $file) {
                $originalName = $file->getClientOriginalName();
                $mimeType = $file->getClientMimeType() ?? 'image';
                $fileSize = number_format($file->getSize() / 1024, 1) . ' KB';

                $filename = time() . '_' . Str::random(6) . '.' . $file->getClientOriginalExtension();
                $destinationPath = public_path('uploads/media');
                
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                $file->move($destinationPath, $filename);
                $url = '/uploads/media/' . $filename;

                $media = MediaFile::create([
                    'filename' => $originalName,
                    'url' => $url,
                    'file_type' => $mimeType,
                    'file_size' => $fileSize,
                ]);

                $uploadedFiles[] = $media;
            }
        } catch (\Exception $e) {
            Log::error('Media Upload Error: ' . $e->getMessage());
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'message' => 'Lỗi tải lên tệp tin: ' . $e->getMessage()], 500);
            }
            return back()->withErrors(['error' => 'Lỗi tải lên tệp tin: ' . $e->getMessage()]);
        }

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'files' => $uploadedFiles]);
        }

        return back()->with('success', 'Đã tải lên tệp thành công!');
    }

    public function deleteMedia(MediaFile $mediaFile)
    {
        $url = ltrim($mediaFile->url, '/');
        $fullPath = public_path($url);
        if ($url && file_exists($fullPath) && is_file($fullPath)) {
            @unlink($fullPath);
        }

        $mediaFile->delete();

        return back()->with('success', 'Đã xóa tệp thành công!');
    }

    public function batchDeleteMedia(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:media_files,id',
        ]);

        $files = MediaFile::whereIn('id', $validated['ids'])->get();
        foreach ($files as $file) {
            $url = ltrim($file->url, '/');
            $fullPath = public_path($url);
            if ($url && file_exists($fullPath) && is_file($fullPath)) {
                @unlink($fullPath);
            }
            $file->delete();
        }

        return back()->with('success', 'Đã xóa hàng loạt ' . count($validated['ids']) . ' tệp thành công!');
    }

    public function batchUpdateArticles(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|in:publish,hide,delete',
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:articles,id',
        ]);

        if ($validated['action'] === 'publish') {
            Article::whereIn('id', $validated['ids'])->update(['is_published' => true]);
            $msg = 'Đã xuất bản hàng loạt ' . count($validated['ids']) . ' bài viết!';
        } elseif ($validated['action'] === 'hide') {
            Article::whereIn('id', $validated['ids'])->update(['is_published' => false]);
            $msg = 'Đã tạm ẩn hàng loạt ' . count($validated['ids']) . ' bài viết!';
        } elseif ($validated['action'] === 'delete') {
            Article::whereIn('id', $validated['ids'])->delete();
            $msg = 'Đã xóa hàng loạt ' . count($validated['ids']) . ' bài viết!';
        }

        return back()->with('success', $msg);
    }

    public function storeAuthor(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string',
            'details' => 'nullable|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);

        Author::create([
            'name' => $validated['name'],
            'title' => $validated['title'] ?? '',
            'avatar' => !empty($validated['avatar']) ? $validated['avatar'] : '/assets/doctor_khoi.png',
            'bio' => $validated['bio'] ?? '',
            'details' => $validated['details'] ?? '',
            'meta_title' => $validated['meta_title'] ?? '',
            'meta_description' => $validated['meta_description'] ?? '',
        ]);

        return back()->with('success', 'Đã thêm tác giả mới thành công!');
    }

    public function updateAuthor(Request $request, $id)
    {
        $author = Author::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string',
            'details' => 'nullable|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);

        $author->update([
            'name' => $validated['name'],
            'title' => $validated['title'] ?? '',
            'avatar' => !empty($validated['avatar']) ? $validated['avatar'] : '/assets/doctor_khoi.png',
            'bio' => $validated['bio'] ?? '',
            'details' => $validated['details'] ?? '',
            'meta_title' => $validated['meta_title'] ?? '',
            'meta_description' => $validated['meta_description'] ?? '',
        ]);

        return back()->with('success', 'Đã cập nhật thông tin tác giả thành công!');
    }

    public function deleteAuthor($id)
    {
        $author = Author::findOrFail($id);
        $author->delete();

        return back()->with('success', 'Đã xóa tác giả thành công!');
    }

    // Reviews CMS CRUD & Approval/Rejection Actions
    public function storeReview(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'service_name' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
            'is_approved' => 'boolean',
        ]);

        Review::create([
            'patient_name' => $validated['patient_name'],
            'service_name' => $validated['service_name'] ?? 'Khám tim mạch tổng quát',
            'rating' => (int)$validated['rating'],
            'comment' => $validated['comment'],
            'is_approved' => isset($validated['is_approved']) ? (bool)$validated['is_approved'] : true,
        ]);

        return back()->with('success', 'Đã thêm đánh giá bệnh nhân mới!');
    }

    public function updateReview(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'service_name' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
            'is_approved' => 'boolean',
        ]);

        $review->update([
            'patient_name' => $validated['patient_name'],
            'service_name' => $validated['service_name'] ?? 'Khám tim mạch tổng quát',
            'rating' => (int)$validated['rating'],
            'comment' => $validated['comment'],
            'is_approved' => isset($validated['is_approved']) ? (bool)$validated['is_approved'] : true,
        ]);

        return back()->with('success', 'Đã cập nhật thông tin đánh giá!');
    }

    public function toggleReviewApproval(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        if ($request->has('is_approved')) {
            $review->is_approved = (bool)$request->input('is_approved');
        } else {
            $review->is_approved = !$review->is_approved;
        }
        $review->save();

        $statusLabel = $review->is_approved ? 'phê duyệt' : 'từ chối / ẩn';
        return back()->with('success', "Đã {$statusLabel} đánh giá của {$review->patient_name}!");
    }

    public function deleteReview($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return back()->with('success', 'Đã xóa đánh giá bệnh nhân!');
    }

    public function batchUpdateReviews(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|in:approve,reject,delete',
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:reviews,id',
        ]);

        $action = $validated['action'];
        $ids = $validated['ids'];

        if ($action === 'approve') {
            Review::whereIn('id', $ids)->update(['is_approved' => true]);
            $msg = 'Đã phê duyệt hàng loạt đánh giá!';
        } elseif ($action === 'reject') {
            Review::whereIn('id', $ids)->update(['is_approved' => false]);
            $msg = 'Đã từ chối / ẩn hàng loạt đánh giá!';
        } elseif ($action === 'delete') {
            Review::whereIn('id', $ids)->delete();
            $msg = 'Đã xóa hàng loạt đánh giá đã chọn!';
        }

        return back()->with('success', $msg);
    }

    // Banners CMS CRUD & Batch Actions
    public function storeBanner(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'eyebrow' => 'nullable|string|max:255',
            'subheading' => 'nullable|string',
            'desktop_image' => 'nullable|string',
            'mobile_image' => 'nullable|string',
            'primary_button_text' => 'nullable|string|max:255',
            'primary_button_link' => 'nullable|string|max:255',
            'secondary_button_text' => 'nullable|string|max:255',
            'secondary_button_link' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $desktopImg = !empty($validated['desktop_image']) ? $validated['desktop_image'] : '/assets/heart_care.png';
        $primaryLink = !empty($validated['primary_button_link']) ? $validated['primary_button_link'] : '/lien-he';

        Banner::create([
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? '',
            'eyebrow' => $validated['eyebrow'] ?? '',
            'subheading' => $validated['subheading'] ?? '',
            'image_url' => $desktopImg,
            'desktop_image' => $desktopImg,
            'mobile_image' => $validated['mobile_image'] ?? '',
            'link' => $primaryLink,
            'primary_button_text' => $validated['primary_button_text'] ?? 'Đặt Lịch Khám Ngay',
            'primary_button_link' => $primaryLink,
            'secondary_button_text' => $validated['secondary_button_text'] ?? '',
            'secondary_button_link' => $validated['secondary_button_link'] ?? '',
            'order' => (int)($validated['order'] ?? 0),
            'is_active' => isset($validated['is_active']) ? (bool)$validated['is_active'] : true,
        ]);

        return back()->with('success', 'Đã thêm slide banner mới thành công!');
    }

    public function updateBanner(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'eyebrow' => 'nullable|string|max:255',
            'subheading' => 'nullable|string',
            'desktop_image' => 'nullable|string',
            'mobile_image' => 'nullable|string',
            'primary_button_text' => 'nullable|string|max:255',
            'primary_button_link' => 'nullable|string|max:255',
            'secondary_button_text' => 'nullable|string|max:255',
            'secondary_button_link' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $desktopImg = !empty($validated['desktop_image']) ? $validated['desktop_image'] : ($banner->desktop_image ?: $banner->image_url);
        $primaryLink = !empty($validated['primary_button_link']) ? $validated['primary_button_link'] : ($banner->primary_button_link ?: $banner->link);

        $banner->update([
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? '',
            'eyebrow' => $validated['eyebrow'] ?? '',
            'subheading' => $validated['subheading'] ?? '',
            'image_url' => $desktopImg,
            'desktop_image' => $desktopImg,
            'mobile_image' => $validated['mobile_image'] ?? '',
            'link' => $primaryLink,
            'primary_button_text' => $validated['primary_button_text'] ?? '',
            'primary_button_link' => $primaryLink,
            'secondary_button_text' => $validated['secondary_button_text'] ?? '',
            'secondary_button_link' => $validated['secondary_button_link'] ?? '',
            'order' => (int)($validated['order'] ?? 0),
            'is_active' => isset($validated['is_active']) ? (bool)$validated['is_active'] : true,
        ]);

        return back()->with('success', 'Đã cập nhật slide banner thành công!');
    }

    public function toggleBannerStatus(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);
        if ($request->has('is_active')) {
            $banner->is_active = (bool)$request->input('is_active');
        } else {
            $banner->is_active = !$banner->is_active;
        }
        $banner->save();

        $statusLabel = $banner->is_active ? 'kích hoạt' : 'tạm ẩn';
        return back()->with('success', "Đã {$statusLabel} banner thành công!");
    }

    public function deleteBanner($id)
    {
        $banner = Banner::findOrFail($id);
        $banner->delete();

        return back()->with('success', 'Đã xóa slide banner thành công!');
    }

    public function batchUpdateBanners(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|in:activate,deactivate,delete',
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:banners,id',
        ]);

        $action = $validated['action'];
        $ids = $validated['ids'];

        if ($action === 'activate') {
            Banner::whereIn('id', $ids)->update(['is_active' => true]);
            $msg = 'Đã kích hoạt hàng loạt banner!';
        } elseif ($action === 'deactivate') {
            Banner::whereIn('id', $ids)->update(['is_active' => false]);
            $msg = 'Đã tạm ẩn hàng loạt banner!';
        } elseif ($action === 'delete') {
            Banner::whereIn('id', $ids)->delete();
            $msg = 'Đã xóa hàng loạt banner đã chọn!';
        }

        return back()->with('success', $msg);
    }
}
