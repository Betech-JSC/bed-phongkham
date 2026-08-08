<?php

namespace App\Http\Controllers;

use App\Models\Policy;
use Inertia\Inertia;
use Inertia\Response;

class PolicyController extends Controller
{
    /**
     * Display the specified policy page.
     */
    public function show(string $slug): Response
    {
        $policy = Policy::where('slug', $slug)->first();

        // Fallback default policy contents if database record does not exist
        if (!$policy) {
            $defaults = [
                'chinh-sach-bao-mat' => [
                    'title' => 'Chính sách bảo mật thông tin bệnh nhân',
                    'slug' => 'chinh-sach-bao-mat',
                    'content' => "<h3>1. Cam kết bảo mật</h3>\n<p>Phòng khám Chuyên khoa Nội - BSCKII Đoàn Khôi cam kết bảo vệ tuyệt đối thông tin cá nhân và hồ sơ y tế của người bệnh theo đúng Luật Khám bệnh, chữa bệnh và các quy định pháp luật hiện hành.</p>\n<h3>2. Mục đích thu thập thông tin</h3>\n<p>Thông tin của bệnh nhân (Họ tên, số điện thoại, tiền sử bệnh lý) chỉ được sử dụng cho mục đích lập hồ sơ thăm khám, theo dõi điều trị và liên hệ nhắc lịch tái khám.</p>\n<h3>3. Bảo vệ dữ liệu</h3>\n<p>Toàn bộ thông tin được lưu trữ bảo mật trên hệ thống chuyên dụng, không chia sẻ cho bất kỳ bên thứ ba nào khi chưa có sự đồng ý của bệnh nhân, trừ trường hợp cơ quan y tế có thẩm quyền yêu cầu theo quy định pháp luật.</p>",
                ],
                'dieu-khoan-dich-vu' => [
                    'title' => 'Điều khoản sử dụng dịch vụ',
                    'slug' => 'dieu-khoan-dich-vu',
                    'content' => "<h3>1. Quy định chung</h3>\n<p>Các thông tin và dịch vụ y tế được cung cấp trên website mang tính chất tham khảo và hỗ trợ đặt lịch khám trực tuyến tại Phòng khám Chuyên khoa Nội - BSCKII Đoàn Khôi.</p>\n<h3>2. Trách nhiệm người bệnh</h3>\n<p>Người bệnh vui lòng cung cấp thông tin chính xác về tình trạng sức khỏe, triệu chứng và tiền sử bệnh để bác sĩ có cơ sở chẩn đoán và đưa ra phác đồ điều trị phù hợp nhất.</p>\n<h3>3. Chỉ định chuyên môn</h3>\n<p>Mọi kết luận chẩn đoán và phác đồ điều trị được chỉ định trực tiếp bởi BSCKII Đoàn Khôi sau khi thăm khám lâm sàng và thực hiện các cận lâm sàng cần thiết.</p>",
                ],
            ];

            $policyData = $defaults[$slug] ?? [
                'title' => 'Quy định & Chính sách',
                'slug' => $slug,
                'content' => '<p>Nội dung đang được cập nhật.</p>',
            ];

            $policy = (object) $policyData;
        }

        $allPolicies = Policy::all(['id', 'title', 'slug']);
        if ($allPolicies->isEmpty()) {
            $allPolicies = collect([
                ['title' => 'Chính sách bảo mật thông tin', 'slug' => 'chinh-sach-bao-mat'],
                ['title' => 'Điều khoản sử dụng dịch vụ', 'slug' => 'dieu-khoan-dich-vu'],
            ]);
        }

        return Inertia::render('Policy/Show', [
            'policy' => $policy,
            'allPolicies' => $allPolicies,
        ]);
    }
}
