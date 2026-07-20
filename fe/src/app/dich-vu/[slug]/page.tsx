import { notFound } from "next/navigation";
import Link from "next/link";
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
import { allServices } from "@/data/services";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allServices.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);
  if (!service) {
    return {
      title: "Dịch vụ không tìm thấy",
    };
  }

  return {
    title: `${service.title} - MediPlus HP`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
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

      {/* Main details content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Detailed content */}
          <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-card shadow-sm flex flex-col gap-8">
            {/* Header info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                Trụ cột: {service.pillarTitle}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
                {service.title}
              </h1>
              <p className="text-sm italic font-medium text-text-light mt-2">
                &ldquo;{service.tagline}&rdquo;
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Description */}
            <div className="flex flex-col gap-4 text-sm text-text-primary leading-relaxed">
              <h3 className="text-base font-bold text-primary">Tổng quan về dịch vụ</h3>
              <p className="whitespace-pre-line text-text-light">{service.detailedDescription}</p>
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

            {/* Quality Commitment warning */}
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

          {/* Right Side: Price card, Doctor and Booking link */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Direct Booking card */}
            <div className="bg-white p-8 rounded-card shadow-sm flex flex-col gap-6">
              <div>
                <span className="text-sm text-text-light font-bold uppercase tracking-wider">Chi phí niêm yết</span>
                <div className="text-2xl font-black text-primary mt-1">{service.price.split("(")[0].trim()}</div>
                <div className="text-sm text-text-light italic mt-1 leading-snug">
                  {service.price.includes("(") ? `(${service.price.split("(")[1]}` : "Chi phí trọn gói"}
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex flex-col gap-4 text-sm text-text-primary">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-secondary" />
                  <span className="text-text-light">Thời gian khám: <strong className="text-text-primary">{service.estimatedTime}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck size={18} className="text-secondary" />
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

            {/* Hotline consultation card */}
            <div className="bg-white p-6 rounded-card shadow-sm flex flex-col gap-4">
              <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Tư vấn trực tiếp?</h4>
              <p className="text-sm text-text-light leading-relaxed">
                Nếu bạn cần trao đổi trực tiếp hoặc giải đáp các thắc mắc về gói dịch vụ, hãy liên hệ Hotline phòng khám.
              </p>
              <a
                href="tel:0384326785"
                className="flex items-center justify-center gap-2 border border-primary hover:bg-primary hover:text-white text-primary text-sm font-bold py-3 rounded-btn transition-all text-center"
              >
                <Phone size={18} className="shrink-0 animate-pulse" />
                Hotline: 038 432 6785
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
