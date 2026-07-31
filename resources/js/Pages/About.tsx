import React from "react";
import { Link, Head } from "@inertiajs/react";
import { 
  Award, 
  BookOpen, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Stethoscope,
  Search,
  RefreshCw,
  Home,
  Target,
  Activity,
  Cpu,
  Users,
  Smartphone,
  HeartPulse,
  HeartHandshake,
  MonitorCheck
} from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
  bio?: string;
  detailed_bio?: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface Props {
  settings?: Record<string, string>;
  doctors?: Doctor[];
  faqs?: Faq[];
}

export default function About({ settings = {}, doctors = [], faqs = [] }: Props) {
  const missionStandards = [
    {
      step: "01",
      title: "Phát hiện sớm bệnh lý",
      desc: "Khám chuyên khoa, xét nghiệm, ECG, Holter, siêu âm kết hợp phân tích AI giúp phát hiện yếu tố nguy cơ tim mạch ở giai đoạn sớm nhất."
    },
    {
      step: "02",
      title: "Theo dõi & Điều trị liên tục",
      desc: "Đội ngũ bác sĩ chuyên môn giỏi, áp dụng quy trình chuẩn y khoa, minh bạch phác đồ và đồng hành kiểm soát bệnh lâu dài."
    },
    {
      step: "03",
      title: "Quản lý sức khỏe ngoài bệnh viện",
      desc: "Chăm sóc sức khỏe tim mạch chủ động tại gia đình và cộng đồng, giảm thiểu nguy cơ biến chứng và tái nhập viện."
    },
    {
      step: "04",
      title: "Kết nối chuyên gia tuyến Trung ương",
      desc: "Hợp tác trực tiếp với các chuyên gia đầu ngành từ Viện Tim mạch Quốc gia, BV 108, BV Tim Hà Nội, Vinmec Times City."
    },
    {
      step: "05",
      title: "Ứng dụng trí tuệ nhân tạo (AI) & Số hóa",
      desc: "Đưa trí tuệ nhân tạo và dữ liệu số vào phân tích chỉ số, hỗ trợ chẩn đoán chính xác tuyệt đối và tối ưu lộ trình điều trị."
    }
  ];

  const commitments = [
    { title: "Phát hiện sớm bệnh tim mạch", desc: "Tầm soát & phân tích dữ liệu chuyên sâu với AI" },
    { title: "Điều trị đúng – Đáng tin cậy", desc: "Quy trình chuẩn y khoa & minh bạch phác đồ" },
    { title: "Kết nối tuyến Trung ương", desc: "Tham vấn trực tiếp chuyên gia từ viện lớn" },
    { title: "Phối hợp điều trị liên tục", desc: "Liền mạch giữa phòng khám & bệnh viện tuyến trên" },
    { title: "Theo dõi lâu dài tại địa phương", desc: "Kiểm soát nguy cơ tái phát & theo dõi định kỳ" },
    { title: "Tận tâm – An toàn – Bảo mật", desc: "Đặt lợi ích & sự an toàn người bệnh lên hàng đầu" }
  ];

  const facilities = [
    {
      title: "Holter điện tâm đồ 24h - 48h (ECG)",
      desc: "Thiết bị đeo ngực thế hệ mới nhỏ gọn, không thấm nước, ghi lại từng nhịp đập của tim suốt ngày đêm để phát hiện rối loạn nhịp âm thầm và thiếu máu cơ tim."
    },
    {
      title: "Holter huyết áp theo dõi 24h (ABPM)",
      desc: "Theo dõi sự biến thiên huyết áp liên tục trong 24 giờ, giúp chẩn đoán chính xác tăng huyết áp áo choàng trắng, tăng huyết áp ẩn dấu và tăng huyết áp thai kỳ."
    },
    {
      title: "Siêu âm tim Doppler màu chuyên sâu",
      desc: "Hệ thống siêu âm hiện đại giúp dựng hình ảnh cấu trúc van tim, đánh giá chính xác lực bóp phân xuất tống máu (EF) và vận động vùng cơ tim."
    },
    {
      title: "Máy điện tim & Phân tích chẩn đoán AI",
      desc: "Hệ thống ECG thế hệ mới kết hợp phần mềm AI phân tích sóng tim, hỗ trợ phát hiện sớm nguy cơ rung nhĩ, nhồi máu cơ tim và đột quỵ."
    },
    {
      title: "Siêu âm & Thiết bị thăm khám cộng đồng",
      desc: "Trang thiết bị y tế xách tay hiện đại phục vụ khám, điện tim và tầm soát tận nơi cho người cao tuổi, người khó khăn trong di chuyển."
    },
    {
      title: "Hệ thống số hóa dữ liệu bệnh án & Từ xa",
      desc: "Lưu trữ hồ sơ điện tử, kết nối trực tiếp với chuyên gia tuyến Trung ương và hỗ trợ theo dõi chỉ số tim mạch từ xa qua ứng dụng."
    }
  ];

  return (
    <MainLayout>
      <Head title="Giới thiệu về Bác sĩ & Phòng Khám" />
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
        
        {/* Page Header */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
          <img
            src={settings.about_main_image || "/assets/about_banner.jpg"}
            alt="Giới thiệu banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-slate-950/50 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-white bg-white/20 px-6 py-2 rounded-full border border-white/30 shadow-sm backdrop-blur-xs">
              Phòng khám Chuyên khoa Nội - BSCK. II Đoàn Khôi
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              TRUNG TÂM TIM MẠCH SỐ & QUẢN LÝ TIM MẠCH CỘNG ĐỒNG
            </h1>
          </div>
        </section>

        {/* Doctor Bio Section (ĐỘI NGŨ CHUYÊN GIA - GIỮ NGUYÊN) */}
        <section className="bg-white overflow-hidden py-16 md:py-20 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10">
              
              {/* Top Header */}
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Giới thiệu đội ngũ</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  ĐỘI NGŨ CHUYÊN GIA
                </h2>
                <div className="w-16 h-1 bg-secondary rounded-full mt-1" />
              </div>

              {/* Main Doctor Profile Container (BỎ BORDER CARD) */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start py-2">
                
                {/* Doctor Image & Quick Info (BỎ TEXT DƯỚI ẢNH BÁC SĨ, PHỐNG TO ẢNH BÁC SĨ) */}
                <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
                  <div className="relative w-full aspect-[3/4] max-w-[320px] rounded-2xl overflow-hidden shadow-xs bg-slate-100">
                    <img
                      src={doctors[0]?.avatar || "/assets/doctor_khoi.png"}
                      alt={doctors[0]?.name || "BSCKII. Đoàn Văn Khôi"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Doctor Detailed Bio Content */}
                <div className="flex-1 flex flex-col gap-6 text-sm text-text-primary leading-relaxed">
                  
                  {/* Name Header */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-primary">
                      {doctors[0]?.name || "BSCKII. Đoàn Văn Khôi"}
                    </h3>
                    <p className="text-sm font-bold text-secondary uppercase tracking-wider mt-1">
                      {doctors[0]?.specialty || "Bác sĩ Nội khoa – Chuyên sâu Tim mạch"}
                    </p>
                  </div>

                  {doctors[0]?.detailed_bio ? (
                    <div 
                      className="space-y-4"
                      dangerouslySetInnerHTML={{ __html: doctors[0].detailed_bio }}
                    />
                  ) : (
                    <>
                      {/* Paragraph 1 */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        BSCKII Đoàn Khôi được đào tạo bài bản, chuyên sâu tại Đại học Y Hà Nội, có gần 20 năm kinh nghiệm trong lĩnh vực Nội khoa – Tim mạch. Bác sĩ từng đảm nhiệm các vị trí lãnh đạo khoa, phòng tại Bệnh viện Đa khoa tỉnh Hải Dương và Sở Y tế Hải Dương, có nhiều năm trực tiếp khám, điều trị và quản lý người bệnh tim mạch.
                      </p>

                      {/* Paragraph 2 */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        Thế mạnh chuyên môn là khám, điều trị và quản lý tăng huyết áp, rối loạn nhịp tim, rung nhĩ, bệnh mạch vành, suy tim, rối loạn lipid máu và các bệnh tim mạch mạn tính, giúp rất nhiều người bệnh phát hiện sớm, kiểm soát bệnh hiệu quả và giảm nguy các bệnh tim mạch, nhồi máu cơ tim, đột quỵ.
                      </p>

                      {/* Paragraph 3 */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        Bác sĩ trực tiếp thực hiện siêu âm tim, điện tâm đồ, Holter điện tim và Holter huyết áp và các kỹ thuật chẩn đoán bệnh lý tim mạch khác. Điểm khác biệt trong phương châm điều trị của bác sĩ là xây dựng mô hình chăm sóc tim mạch hiện đại với phát hiện sớm – theo dõi liên tục – kết nối chuyên gia tim mạch tuyến Trung ương – quản lý sức khỏe lâu dài, mang đến giải pháp chăm sóc tim mạch toàn diện ngay tại địa phương.
                      </p>

                      {/* Quote */}
                      <div className="border-l-4 border-secondary bg-slate-50 p-4 rounded-r-xl italic text-primary font-medium text-sm sm:text-base my-1">
                        &ldquo;Không chỉ điều trị bệnh tim mạch, bác sĩ đồng hành cùng người bệnh để bảo vệ sức khỏe trái tim lâu dài.&rdquo;
                      </div>
                    </>
                  )}

                </div>

              </div>

              {/* Sub-sections: Cooperation & Working Motto Grid */}
              <div className="flex flex-col gap-10 pt-6 border-t border-slate-100">
                
                {/* Hospital Cooperation (HỢP TÁC CHUYÊN GIA TỪ) */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                    <Building2 size={18} className="text-secondary" />
                    HỢP TÁC CHUYÊN GIA TỪ
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
                    {[
                      { name: "Viện Tim mạch Việt Nam", logo: "/assets/logo_vien_tim.png" },
                      { name: "BV Trung ương Quân đội 108", logo: "/assets/logo_bv_108.png" },
                      { name: "Bệnh viện Tim Hà Nội", logo: "/assets/logo_bv_tim_hn.png" },
                      { name: "Bệnh viện Vinmec Times City", logo: "/assets/logo_vinmec.png" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center gap-3 group">
                        <div className="h-16 w-full flex items-center justify-center p-1">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <span className="text-sm font-bold text-primary leading-snug">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Working Motto (PHƯƠNG CHÂM LÀM VIỆC - HÌNH BÊN PHẢI TO RA CÂN ĐỐI LAYOUT) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-100">
                  <div className="md:col-span-6 flex flex-col gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                      <Stethoscope size={20} className="text-secondary" />
                      PHƯƠNG CHÂM LÀM VIỆC
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-primary italic leading-relaxed bg-slate-50 p-5 rounded-2xl border-l-4 border-secondary shadow-2xs">
                      &ldquo;Phát hiện sớm – Theo dõi liên tục<br/>Can thiệp kịp thời – Đồng hành lâu dài.&rdquo;
                    </p>
                  </div>

                  <div className="md:col-span-6 w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-xs bg-slate-100">
                    <img
                      src="/assets/heart_ultrasound.png"
                      alt="Hình ảnh siêu âm tim bác sĩ thực hiện"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SECTION MỚI: SỨ MỆNH & TẦM NHÌN (HƠN CẢ KHÁM BỆNH - ĐỊNH VỊ HUB TIM MẠCH - TONE SÁNG Y TẾ) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-teal-50/30 to-blue-50/20 border-y border-slate-200/70 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-14">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                SỨ MỆNH & TẦM NHÌN DÀI HẠN
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mt-1" />
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 font-medium">
                Xây dựng hệ sinh thái chăm sóc sức khỏe tim mạch chuẩn y khoa, chủ động và toàn diện ngay tại địa phương.
              </p>
            </div>

            {/* Sứ mệnh - 5 Tiêu chuẩn cốt lõi Grid */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <HeartHandshake className="text-secondary shrink-0" size={24} />
                <h3 className="text-xl font-bold text-primary tracking-tight">
                  SỨ MỆNH: 5 Tiêu Chuẩn Cốt Lõi
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {missionStandards.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white border border-slate-200/80 hover:border-secondary/60 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-secondary font-mono">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-primary leading-snug group-hover:text-secondary-dark transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tầm nhìn dài hạn Banner - HUB TIM MẠCH CỘNG ĐỒNG KHU VỰC (MÀU BRAND XANH PRIMARY, BỎ ICON) */}
            <div className="bg-gradient-to-r from-primary via-primary-dark to-primary text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between shadow-xl border border-primary/20">
              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-secondary bg-white px-4 py-1.5 rounded-full shadow-2xs">
                    Mục tiêu dài hạn
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  TRỞ THÀNH &ldquo;HUB TIM MẠCH CỘNG ĐỒNG KHU VỰC&rdquo;
                </h3>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-light">
                  Trung tâm điều phối chủ chốt kết nối người dân, bác sĩ chuyên gia tuyến Trung ương và các chương trình chăm sóc sức khỏe tim mạch toàn diện – Mang y tế chất lượng cao đến gần hơn với cộng đồng.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-btn shadow-md transition-all hover:scale-103"
                >
                  <HeartPulse size={18} />
                  Đồng hành cùng chúng tôi
                </Link>
              </div>
            </div>

            {/* 6 Cam kết cốt lõi - LAYOUT TRÁI PHẢI */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
              {/* Bên trái: Hình ảnh bác sĩ chăm sóc bệnh nhân */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-sm bg-slate-100 min-h-[380px] h-full">
                <img
                  src="/assets/doctor_caring_patient.png"
                  alt="Bác sĩ thăm khám bệnh nhân"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bên phải: Tiêu đề to + Danh sách cam kết xếp chung (Không icon, spacing thu nhỏ) */}
              <div className="lg:col-span-7 flex flex-col justify-center gap-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight pb-1 border-b-2 border-secondary/30">
                  CAM KẾT DỊCH VỤ CỦA CHÚNG TÔI
                </h3>

                <div className="flex flex-col gap-3">
                  {commitments.map((c, i) => (
                    <div key={i} className="flex flex-col gap-0.5 border-b border-slate-100 pb-2.5 last:border-b-0 last:pb-0">
                      <h4 className="text-sm sm:text-base font-bold text-primary">{c.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Facilities & Equipment Section (UPDATE & THÊM THÔNG TIN MỚI) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-secondary">Trang thiết bị y tế</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              CƠ SỞ VẬT CHẤT & THIẾT BỊ HIỆN ĐẠI
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-text-light mt-2">
              Phòng khám được đầu tư đồng bộ với các công nghệ chẩn đoán tim mạch tiên tiến, kết hợp dữ liệu số và AI hỗ trợ chẩn đoán chính xác tuyệt đối.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((item, idx) => (
              <div key={idx} className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-text-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </MainLayout>
  );
}

