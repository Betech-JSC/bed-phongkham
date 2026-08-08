import React from "react";
import { Link } from "@inertiajs/react";
import SEOHead from "@/Components/SEOHead";
import { 
  CheckCircle2, 
  Calendar, 
  Phone, 
  ArrowLeft, 
  UserCheck, 
  Clock, 
  BadgeHelp,
  ShieldAlert
} from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
  pillar_title: string;
  tagline: string;
  description: string;
  detailed_description: string;
  includes: string[];
  candidates: string[];
  price: string;
  estimated_time: string;
}

interface Props {
  service: ServiceDetail;
}

export default function ServiceShow({ service }: Props) {
  return (
    <MainLayout>
      <SEOHead 
        title={service?.title || "Chi Tiết Dịch Vụ"}
        description={service?.description || service?.tagline || "Thông tin dịch vụ khám và tầm soát tim mạch tại phòng khám BSCKII Đoàn Khôi."}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": service?.title,
          "description": service?.description,
          "procedureType": "NoninvasiveProcedure",
          "howPerformed": service?.detailed_description,
          "provider": {
            "@type": "MedicalClinic",
            "name": "Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi"
          }
        }}
      />
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
        
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/dich-vu" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-light hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Quay lại danh sách dịch vụ
          </Link>
        </div>

        {/* Main Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column */}
            <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-card shadow-sm flex flex-col gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                  Trụ cột: {service.pillar_title}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
                  {service.title}
                </h1>
                {service.tagline && (
                  <p className="text-sm italic font-medium text-text-light mt-2">
                    &ldquo;{service.tagline}&rdquo;
                  </p>
                )}
              </div>

              <hr className="border-slate-100" />

              <div className="flex flex-col gap-4 text-sm text-text-primary leading-relaxed">
                <h3 className="text-base font-bold text-primary">Tổng quan về dịch vụ</h3>
                <p className="whitespace-pre-line text-text-light">{service.detailed_description}</p>
              </div>

              {/* Includes Checklist */}
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-secondary" />
                  Hạng mục thăm khám bao gồm:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-6 rounded-2xl">
                  {service.includes.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-text-primary leading-relaxed">
                      <CheckCircle2 size={18} className="text-secondary shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidates Checklist */}
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-primary flex items-center gap-2">
                  <BadgeHelp size={20} className="text-secondary" />
                  Ai nên thực hiện dịch vụ này?
                </h3>
                <ul className="flex flex-col gap-3 pl-2">
                  {service.candidates.map((cand, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-text-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                      <span>{cand}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medical Notice */}
              <div className="flex gap-4 p-5 bg-blue-50/50 rounded-2xl">
                <ShieldAlert size={20} className="text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-sm">
                  <h4 className="font-bold text-primary">Lưu ý y tế quan trọng</h4>
                  <p className="text-text-light leading-relaxed">
                    Các chỉ định xét nghiệm và chụp hình học chuyên sâu sẽ được Bác sĩ quyết định sau khi thăm khám lâm sàng trực tiếp để đảm bảo cá nhân hóa phác đồ điều trị và tránh lãng phí chi phí cho người bệnh.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              <div className="bg-white p-8 rounded-card shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-extrabold text-primary">Đăng ký tư vấn dịch vụ</h3>
                  <p className="text-sm text-text-light mt-1 leading-relaxed">
                    Liên hệ ngay với phòng khám để được bác sĩ tư vấn chi tiết về gói khám.
                  </p>
                </div>

                <hr className="border-slate-100" />

                <div className="flex flex-col gap-4 text-sm text-text-primary">
                  <div className="flex items-center gap-3">
                    <UserCheck size={18} className="text-secondary shrink-0" />
                    <span className="text-text-light">Bác sĩ phụ trách: <strong className="text-text-primary">BSCKII Đoàn Khôi</strong></span>
                  </div>
                </div>

                <Link
                  href={`/lien-he?service=${service.slug}`}
                  className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white text-sm font-bold py-3.5 rounded-btn shadow-md transition-all hover:scale-105 text-center mt-2 cursor-pointer"
                >
                  <Calendar size={18} />
                  Đăng ký dịch vụ này
                </Link>
              </div>

              <div className="bg-white p-6 rounded-card shadow-sm flex flex-col gap-4">
                <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Tư vấn trực tiếp?</h4>
                <p className="text-sm text-text-light leading-relaxed">
                  Nếu bạn cần trao đổi trực tiếp hoặc giải đáp các thắc mắc về gói dịch vụ, hãy liên hệ Hotline phòng khám.
                </p>
                <a
                  href="tel:0585013013"
                  className="flex items-center justify-center gap-2 border border-primary hover:bg-primary hover:text-white text-primary text-sm font-bold py-3 rounded-btn transition-all text-center"
                >
                  <Phone size={18} className="shrink-0 animate-pulse" />
                  Hotline: 0585 013 013
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
