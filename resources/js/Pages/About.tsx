import React from "react";
import { Link } from "@inertiajs/react";
import { Award, UserCheck, ShieldCheck, HeartPulse, CheckCircle2, ArrowRight, Quote, Sparkles, Building2, Users } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
  bio?: string;
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
  const eyebrow = settings.about_eyebrow || 'Về Chúng Tôi';
  const title = settings.about_title || 'MEDIPLUS HP MEDICAL CENTRE';
  const mainImage = settings.about_main_image || '/assets/about_banner.jpg';
  const desc1 = settings.about_desc1 || 'Tọa lạc tại vị trí đắc địa ở Hải Phòng, MediPlus HP Medical Centre tự hào là một trong những trung tâm y khoa kỹ thuật cao hàng đầu cung cấp trọn gói các dịch vụ chăm sóc sức khỏe tim mạch, nội khoa và khám chuyên sâu...';
  const desc2 = settings.about_desc2 || 'Với triết lý khám chữa bệnh chuẩn y khoa, tôn vinh sức khỏe và sự an tâm của từng cá nhân, đội ngũ Bác sĩ, chuyên gia đầu ngành tại MediPlus HP cam kết đồng hành cùng quý khách hàng trên hành trình khám phá và hoàn thiện bản sắc sức khỏe hoàn hảo nhất...';

  const doctorCount = settings.about_doctor_count_type === 'auto' ? doctors.length : 5;
  const customerBase = settings.about_customer_base || '10000';
  const customerCrm = settings.about_customer_crm || '+1';

  const founderTitle = settings.about_founder_title || 'Triết Lý Khám Chữa Bệnh Chuẩn Y Khoa & Vẻ Đẹp Độc Bản';
  const founderDesc1 = settings.about_founder_desc1 || 'Tại MediPlus HP Medical Centre, chúng tôi tin rằng mỗi người đều sở hữu một vẻ đẹp và sức khỏe độc bản riêng biệt. Sự tự tin của bạn là món quà quý giá nhất, và sứ mệnh của chúng tôi là giúp bạn giữ gìn nét riêng đó...';
  const founderDesc2 = settings.about_founder_desc2 || 'Được thành lập bởi đội ngũ bác sĩ chuyên khoa I, II, MediPlus HP đã không ngừng nâng cấp hệ thống phòng khám, chuyển giao độc quyền các công nghệ y khoa tiên tiến...';
  const founderQuote = settings.about_founder_quote || 'Chúng tôi không thay đổi diện mạo của bạn, chúng tôi tôn vinh và khôi phục những nét đẹp độc bản';
  const founderAuthor = settings.about_founder_author || 'BSCKII Đoàn Khôi';

  const storyImg1 = settings.about_story_img1 || '/assets/screening_service.png';
  const storyImg2 = settings.about_story_img2 || '/assets/telehealth_service.png';
  const storyImg3 = settings.about_story_img3 || '/assets/heart_care.png';

  return (
    <MainLayout>
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20 space-y-16">
        
        {/* Top Banner Section */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
          <img
            src={mainImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-primary/50 to-slate-950/80 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
            <span className="px-4 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
              {eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-tight max-w-4xl">
              {title}
            </h1>
            <div className="w-20 h-1 bg-amber-500 rounded-full my-1" />
          </div>
        </section>

        {/* 1. KHỐI GIỚI THIỆU CHÍNH & TRIẾT LÝ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text & Descriptions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-[#b89a67] uppercase tracking-widest block">{eyebrow}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-primary leading-snug">{title}</h2>
                <div className="w-16 h-1 bg-[#b89a67] rounded-full" />
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {desc1}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {desc2}
              </p>

              {/* Stats Box */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-primary block">{doctorCount}+</span>
                  <span className="text-xs font-bold text-slate-500 block">Bác sĩ chuyên khoa</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1">
                  <span className="text-2xl font-black text-[#b89a67] block">{customerBase}+</span>
                  <span className="text-xs font-bold text-slate-500 block">Bệnh nhân tin tưởng</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-2xl font-black text-emerald-600 block">100%</span>
                  <span className="text-xs font-bold text-slate-500 block">Chuẩn Y Khoa</span>
                </div>
              </div>
            </div>

            {/* Right Column: Main Showcase Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img 
                  src={mainImage} 
                  alt={title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">{eyebrow}</span>
                  <h3 className="text-lg font-bold mt-1">{title}</h3>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. CÂU CHUYỆN NHÀ SÁNG LẬP (FOUNDER STORY) */}
        <section className="bg-white py-16 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-extrabold text-[#b89a67] uppercase tracking-widest">FOUNDER STORY</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">{founderTitle}</h2>
              <div className="w-16 h-1 bg-[#b89a67] rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
                <p>{founderDesc1}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
                <p>{founderDesc2}</p>
              </div>
            </div>

            {/* Founder Quote */}
            {founderQuote && (
              <div className="p-8 bg-[#004b87] text-white rounded-3xl shadow-xl relative overflow-hidden flex flex-col items-center text-center gap-4 border border-blue-800">
                <Quote size={40} className="text-amber-400 opacity-80" />
                <p className="text-base sm:text-lg font-extrabold italic max-w-3xl leading-relaxed">
                  "{founderQuote}"
                </p>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">— {founderAuthor}</span>
              </div>
            )}

            {/* Trio Story Images */}
            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">BỘ BA HÌNH ẢNH HOẠT ĐỘNG & THÀNH TỰU</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-900">
                  <img src={storyImg1} alt="Hội thảo" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-900">
                  <img src={storyImg2} alt="Chứng nhận" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-900">
                  <img src={storyImg3} alt="Toàn cảnh" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. ĐỘI NGŨ BÁC SĨ CHUYÊN KHOA */}
        {doctors.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold text-[#b89a67] uppercase tracking-widest">ĐỘI NGŨ Y BÁC SĨ</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">Bác Sĩ Chuyên Khoa Giàu Kinh Nghiệm</h2>
              <div className="w-16 h-1 bg-[#b89a67] rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map(doc => (
                <div key={doc.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all text-center space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-md mx-auto">
                    <img src={doc.avatar || '/assets/doctor_khoi.png'} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-primary text-base">{doc.name}</h3>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">{doc.specialty}</p>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-full mt-2">
                      {doc.experience}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </MainLayout>
  );
}
