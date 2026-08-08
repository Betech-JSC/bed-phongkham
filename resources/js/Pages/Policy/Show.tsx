import React from "react";
import { Link } from "@inertiajs/react";
import SEOHead from "@/Components/SEOHead";
import MainLayout from "@/Layouts/MainLayout";
import { ArrowLeft, ShieldCheck, FileText, Phone } from "lucide-react";
import { motion } from "motion/react";

interface PolicyItem {
  id?: number;
  title: string;
  slug: string;
  content: string;
}

interface Props {
  policy: PolicyItem;
  allPolicies: Array<{ id?: number; title: string; slug: string }>;
}

export default function PolicyShow({ policy, allPolicies = [] }: Props) {
  return (
    <MainLayout>
      <SEOHead 
        title={policy.title}
        description={`Thông tin ${policy.title.toLowerCase()} tại Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi.`}
      />
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
        
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-light hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Quay lại trang chủ
          </Link>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Policy Content (Left) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-8 bg-white p-6 md:p-10 rounded-card shadow-sm flex flex-col gap-6 border border-slate-100"
            >
              <div className="flex items-center gap-3 text-secondary border-b border-slate-100 pb-4">
                <ShieldCheck size={28} className="shrink-0" />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
                  {policy.title}
                </h1>
              </div>

              {/* Rich HTML Body */}
              <div 
                className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-4 font-normal"
                dangerouslySetInnerHTML={{ __html: policy.content }}
              />

              <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4 text-xs text-slate-500">
                <span>Cập nhật lần cuối: 2026</span>
                <span className="font-semibold text-primary">Phòng khám BSCKII Đoàn Khôi</span>
              </div>
            </motion.div>

            {/* Sidebar Navigation (Right) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              <div className="bg-white p-6 rounded-card shadow-sm border border-slate-100 flex flex-col gap-4">
                <h3 className="text-base font-bold text-primary flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText size={18} className="text-secondary" />
                  Danh mục chính sách
                </h3>

                <nav className="flex flex-col gap-2">
                  <Link
                    href="/chinh-sach-bao-mat"
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      policy.slug === 'chinh-sach-bao-mat'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Chính sách bảo mật
                  </Link>

                  <Link
                    href="/dieu-khoan-dich-vu"
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      policy.slug === 'dieu-khoan-dich-vu'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Điều khoản dịch vụ
                  </Link>
                </nav>
              </div>

              {/* Support Card */}
              <div className="bg-gradient-to-br from-primary to-slate-900 text-white p-6 rounded-card shadow-sm flex flex-col gap-3">
                <h4 className="font-bold text-base">Cần giải đáp thắc mắc?</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Nếu có bất kỳ câu hỏi nào về các điều khoản hoặc quy định y tế, vui lòng liên hệ trực tiếp với chúng tôi.
                </p>
                <a
                  href="tel:0585013013"
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold text-sm py-3 rounded-btn shadow-md transition-all text-center"
                >
                  <Phone size={16} />
                  Hotline: 0585 013 013
                </a>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}
